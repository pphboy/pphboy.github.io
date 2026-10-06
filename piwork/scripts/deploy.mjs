import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, lstatSync, mkdtempSync, readdirSync, realpathSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const protectedNames = new Set(['.git', 'piwork', 'CNAME', '.nojekyll'])

function git(cwd, args, trim = true) {
  const output = execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 16 * 1024 * 1024
  })
  return trim ? output.trim() : output
}

function localIdentity(key, fallback) {
  try {
    return git(process.cwd(), ['config', '--get', key]) || fallback
  } catch {
    return fallback
  }
}

function contains(parent, child) {
  const path = relative(parent, child)
  return path === '' || (path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path))
}

function synchronize(scope, source, checkout) {
  if (scope === 'piwork') {
    const target = join(checkout, 'piwork')
    rmSync(target, { recursive: true, force: true })
    cpSync(source, target, { recursive: true })
    return
  }

  for (const name of readdirSync(checkout)) {
    if (!protectedNames.has(name)) rmSync(join(checkout, name), { recursive: true, force: true })
  }
  for (const name of readdirSync(source)) {
    if (!protectedNames.has(name)) cpSync(join(source, name), join(checkout, name), { recursive: true })
  }
}

export function deploy({ scope, source, repository, branch = 'gh-pages', checkout, message }) {
  if (!['piwork', 'blog'].includes(scope) || branch !== 'gh-pages') {
    throw new Error('Choose piwork or blog scope on the gh-pages branch.')
  }
  if (!source || !existsSync(join(source, 'index.html')) || !lstatSync(join(source, 'index.html')).isFile()) {
    throw new Error('Build the site first: the source must contain index.html.')
  }
  source = realpathSync(source)
  let temporary

  try {
    if (checkout) {
      checkout = realpathSync(checkout)
      if (contains(checkout, source) || contains(source, checkout)) {
        throw new Error('Build output and Pages checkout must be separate directories.')
      }
      if (git(checkout, ['rev-parse', '--show-toplevel']) !== checkout) {
        throw new Error('The Pages checkout must be a separate Git repository.')
      }
      if (git(checkout, ['status', '--porcelain'])) throw new Error('The Pages checkout must be clean.')
      if (git(checkout, ['branch', '--show-current']) !== branch) {
        throw new Error('The Pages checkout must be on gh-pages.')
      }
    } else {
      repository ||= git(dirname(fileURLToPath(import.meta.url)), ['remote', 'get-url', 'origin'])
      temporary = mkdtempSync(join(tmpdir(), 'piwork-pages-'))
      checkout = join(temporary, 'pages')
      git(temporary, ['clone', '--quiet', '--depth=1', '--single-branch', '--branch', branch, '--', repository, checkout])
    }

    git(checkout, ['config', 'user.name', localIdentity('user.name', 'github-actions[bot]')])
    git(checkout, ['config', 'user.email', localIdentity('user.email', '41898282+github-actions[bot]@users.noreply.github.com')])

    for (let attempt = 1; attempt <= 3; attempt++) {
      // Reapply our owned files to the newest branch on every attempt.
      git(checkout, ['fetch', '--quiet', 'origin', branch])
      git(checkout, ['reset', '--hard', 'FETCH_HEAD'])
      synchronize(scope, source, checkout)
      git(checkout, ['add', '--all'])
      const changes = git(checkout, ['diff', '--cached', '--name-only', '--no-renames', '-z'], false).split('\0').filter(Boolean)
      for (const path of changes) {
        const allowed = scope === 'piwork'
          ? path.startsWith('piwork/')
          : !protectedNames.has(path.split('/')[0])
        if (!allowed) throw new Error(`Deployment would change a protected path: ${path}`)
      }
      if (!changes.length) {
        console.log(`No ${scope} changes to publish.`)
        return git(checkout, ['rev-parse', 'HEAD'])
      }

      git(checkout, ['commit', '--quiet', '-m', message || `Update ${scope} website`])
      try {
        git(checkout, ['push', 'origin', `HEAD:refs/heads/${branch}`])
        const commit = git(checkout, ['rev-parse', 'HEAD'])
        console.log(`Published ${scope}: ${commit} (${changes.length} files).`)
        return commit
      } catch (error) {
        if (attempt === 3) throw new Error('Pages push failed after three attempts. No force push was used.', { cause: error })
        console.log('Pages push did not succeed; retrying against the latest branch.')
      }
    }
  } finally {
    if (temporary) rmSync(temporary, { recursive: true, force: true })
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [scope, source, option, checkout] = process.argv.slice(2)
  if (!scope || !source || (option && option !== '--checkout') || (option && !checkout) || process.argv.length > 6) {
    console.error('Usage: node deploy.mjs <piwork|blog> <build-dir> [--checkout <gh-pages-dir>]')
    process.exitCode = 1
  } else {
    try {
      deploy({ scope, source: resolve(source), checkout: checkout && resolve(checkout) })
    } catch (error) {
      console.error(error.message)
      process.exitCode = 1
    }
  }
}
