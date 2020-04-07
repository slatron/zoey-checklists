module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/zoey-checklists/'
    : '/',

  lintOnSave: false
}
