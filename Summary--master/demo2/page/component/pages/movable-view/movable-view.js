let app = getApp()

Page(Object.assign(app.page, {
  data: {
    outOfBounds:true,
    inertia:true,
    friction:2,
    damping:20,
    direction: "all",
    target:{x:30,y:30}
  },
  onLoad(){
  }
}))