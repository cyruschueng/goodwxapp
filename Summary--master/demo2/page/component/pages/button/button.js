var pageObject = {
  data: {
  },
  onTap(e){
    console.log(e)
  },
  onGetUserinfo(e){
    console.log(e.detail)
  }
}

let app = getApp()
Page(Object.assign(app.page,pageObject))