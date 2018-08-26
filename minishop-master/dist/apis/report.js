import request from './request'
import config from '../config/index.js'
import { assign } from '../utils/index.js'

export const errorReport = (e) => {
  let data = {
    content: format(e)
  }
  if ('development' !== 'production') {
    console.log(data.content)
  }
  assign(data, config.systemInfo)
  return request({
    url: config.urls.errorReport,
    method: 'POST',
    data
  })
}

function format (e) {
  if (e instanceof Error) {
    e = e.stack
    return e.split(/\n/gi)
      .slice(0, 9)
      .join('\n')
      .replace(/\?[^:]+/gi, '')
  }
  return e
}
