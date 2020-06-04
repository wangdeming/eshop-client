'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  HOST: '"localhost"', // can be overwritten by process.env.HOST
  PORT: '"80"', // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  API_HOST: '"/platform/api/"',
})
