/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
const server = 'http://localhost:8881';
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
};
