/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
const server = 'http://10.247.99.224:8881';
export default {
  dev: {
    '/api/': {
      target: server,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  test: {
    '/api/': {
      target: server,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: server,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  proxyUrl: (needProxy,url) => {
    if(!needProxy){
      return url;
    }
    const host = url.substring(7, url.indexOf(':9101'));
    const path = url.substring(url.indexOf(':9101')+5);
    return `${server}/proxy`.concat(path)
      .concat(path.indexOf('?') !== -1 ? '&':'?')
      .concat("host=").concat(host);
  },
};
