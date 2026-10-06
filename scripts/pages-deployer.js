'use strict';

const deploy = require('../piwork/scripts/hexo-deployer.cjs');

// Keep both `pnpm run deploy` and `hexo deploy` on the same preserving publisher.
hexo.extend.deployer.register('git-preserve-piwork', async function (args) {
  return deploy({
    scope: 'blog',
    source: hexo.public_dir,
    repository: args.repo,
    branch: args.branch,
    message: 'Update blog'
  });
});
