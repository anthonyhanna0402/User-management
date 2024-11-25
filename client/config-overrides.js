const {overrideDevServer} = require('customize-cra');

const devServerConfig = () => config => {
  return {
    ...config,
    allowedHosts:'all'
  };
};

module.exports = {
  devServer:overrideDevServer(devServerConfig()),
}