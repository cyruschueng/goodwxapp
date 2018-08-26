// import '@/assets/js/sockjs.min.js'
// import '@/assets/js/stomp.min.js'
import state from '@/store/index'

let baseUrl = 'http://192.168.1.212/restful'

const HOST_NAME = process.env.HOST_NAME
if (HOST_NAME !== undefined) {
  baseUrl = HOST_NAME
}

baseUrl = 'http://192.168.1.135/restful'

export default {
  init () {
    let url = baseUrl + '/ws?token=' + state.state.globalData.token

    let socket = new window.SockJS(url)
    let stopmClient = window.Stomp.over(socket)

    stopmClient.connect({}, (res) => {
      console.log(res)
      let username = res.headers['user-name']
      stopmClient.subscribe(baseUrl + '/restful/user/' + username + '/queue/notice/', (frame) => {
        console.log('frame')
        console.log(frame)
      })
    })
  }
}
