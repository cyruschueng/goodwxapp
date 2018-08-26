module("appengine_view.js",function () {
    var Object = com.appengine.core.Object;

    com.appengine.device = {};

    Object.extend("com.appengine.device.Device", {
    });

    window.device = new com.appengine.device.Device();
})