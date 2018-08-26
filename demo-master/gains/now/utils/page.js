var page = {
  // 确定导航tab页，是否show nav
  showNav: path => {
    switch (path) {
      case '/':
        return false
       case '/b':
        return false
      default:
        return true
    }
  },

}

export default page
