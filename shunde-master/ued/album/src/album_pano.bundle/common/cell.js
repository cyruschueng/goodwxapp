require(function(){
	var View = com.appengine.view.View;
    var TextView = com.appengine.view.TextView;
    var ImageView = com.appengine.view.ImageView;
    
	var cells = {
            markerCell: function(attr) {
                return View.parse({
                    layout: "horizontal",
                    width: "wrap",
                    height: "wrap",
                    padding: "3bp 7dp 3dp 5dp",
                    background: "#000000",
                    alpha: "0.6",
                    borderCorner: "14dp",
                    clipToBounds: "true",
                    anchorX : "0.5",
                    anchorY : "0.5",
                    panoHeading: attr.heading,
                    panoPitch: attr.pitch,
                    children:[
                        {
                            src: attr.imgSrc,
                            type: "ImageView",
                            width: "25dp",
                            height: "20dp",
                            paddingRight: "3dp",
                            gravity: "left|center"
                        },
                        {
                            type: "TextView",
                            text: attr.text,
                            width: "wrap",
                            fontSize: "14dp",
                            fontColor: "#ffffff",
                            gravity: "center",
                            marginBottom: "-2dp",
                            contentGravity: "center"
                        }
                    ]
                })
            },
            albumListCell: function(name) {
                return View.parse({
                    width: "wrap",
                    marginRight: "5dp",
                    borderCorner: "2dp",
                    clipToBounds: "true",
                    children: [
                        {
                            id: "active",
                            background: "#32A0FC",
                            visible: "false"
                        },
                        {
                           type: "TextView",
                            text: name,
                            width: "wrap",
                            padding: "5dp",
                            fontColor: "#ffffff",
                            fontSize: "14dp",
                            gravity: "center" 
                        }                        
                    ]
                })
            },
            panoListCell: function() {
                return View.parse({
                    // width:"144dp",
                    width:"144dp",
                    height:"84dp",
                    marginRight:"8dp",
                    translateY: "0",
                    children: [
                        {
                            id: "active",
                            background: "#32A0FC",
                            visible: "false",
                            alpha: "0.5"
                        },
                        {
                            type:"ImageView",
                            id:"img",
                            width:"140dp",
                            height:"80dp",
                            src:"/common/images/defaultThumb.jpg",
                            gravity: "center"
                        },
                        {
                            type:"ImageView",
                            width:"140dp",
                            height:"50dp",
                            margin: "2dp",
                            src:"/album/images/bg_img.png",
                            gravity:"center|bottom"
                        },
                        {
                            type: "TextView",
                            id: "text",
                            alpha: "0",
                            margin: "5dp",
                            height: "wrap",
                            width: "140dp",
                            fontSize: "14dp",
                            fontColor: "#ffffff",
                            gravity: "center|bottom",
                            contentGravity: "center",
                            maxLine: "1"
                        }
                    ]
                })
            },
            timeCell: function(src){
                return View.parse({
                    height: "wrap",
                    width: "wrap",
                    children : [
                        {
                            type: "ImageView",
                            src: src,
                            width: "36dp",
                            height: "36dp",
                            margin: "25dp"
  
                        }
                    ]
                });
            }
        };
    return cells;
})