const path = require('path')
const version = require('./package.json').version
const VConsolePlugin = require('vconsole-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')

const {
  VUE_APP_TITLE,
  DEVSERVERPORT,
  NODE_ENV,
  VCONSOLE,
} = process.env

const PORT = process.env.PORT || '8080'
const HOST = process.env.HOST || 'alpha.webapp.skysrt.com'
// const BACKEND = process.env.BACKEND || 'beta-fw.coocaa.com'
// const baseUrl = ENV === 'production' ? '//img2.coocaa.com/ui/mall-gateway/' : `http://${HOST}:${PORT}`
const baseUrl = NODE_ENV === 'production' ? '/dist/' : `http://${HOST}:${PORT}`
// const baseUrl = '/'

console.log('VCONSOLE: ' + VCONSOLE)
console.log(__dirname)
const resolve = dir => path.join(__dirname, dir)
const DEV = NODE_ENV === 'development'
const PROD = NODE_ENV === 'production'

module.exports = {
  // publicPath: !DEV ? './' : '/xhb/exchange/',
  publicPath: !DEV ? '/mobile-activity/exchangeshop/' : '/xhb/exchange/',
  devServer: {
    public: `${HOST}:${PORT}`,
    port: PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/gw': {
        // target: 'https://mb2-cc.skysrt.com/mobile-activity/',
        target: 'http://beta.webapp.skysrt.com/',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      // '/membership': {
      //   target: '/gw',
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/api': ''
      //   // }
      // }
    }
  },
  configureWebpack: {
    name: VUE_APP_TITLE,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve('src/styles/_variables.scss'),
        resolve('src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.plugin('__VERSION__')
      .use(new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(version)
      }))
      .end()

    if (!DEV) {
      config.plugin('loadshReplace')
        .use(new LodashWebpackPlugin())
        .end()
    }
    config.plugin('VConsolePlugin')
      .use(new VConsolePlugin({
        filter: [],
        enable: DEV && VCONSOLE === 'yes'
      }))
      .end()

    config.plugin('ProvidePlugin')
      .use(new webpack.ProvidePlugin({
        _: 'lodash'
      }))
      .end()

  }
}