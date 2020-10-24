module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Verbasizer';
      args[0].minify && (args[0].minify.removeComments = false);
      return args;
    });
  },
  pwa: {
    name: 'Verbasizer'
  }
};
