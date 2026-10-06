// Load outside Hexo's vm.Script context, which has no dynamic import callback.
module.exports = async function (options) {
  const { deploy } = await import('./deploy.mjs');
  return deploy(options);
};
