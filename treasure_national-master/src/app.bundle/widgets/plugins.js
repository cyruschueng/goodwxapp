/**
 * Created by GUQIANG on 2017/10/18.
 */
require("/widgets/Circle.xml",function( render){
    var View = com.appengine.view.View;
    var TextView = com.appengine.view.TextView;
    var ImageView = com.appengine.view.ImageView;
    var TapGestureDetector  = com.appengine.gesture.TapGestureDetector;
    window.viewfactory = {
        normalPanoMarker: function (marker) {
            return View.parse({
                width: "wrap",
                height: "20dp",
                layout: "horizontal",
                background: "#70000000",
                clipToBounds: "true",
                borderCorner: "10dp",
                panoHeading: marker.heading,
                panoPitch: marker.pitch,
                children: [{
                    type: "TextView",
                    text: marker.panoName,
                    width: "wrap",
                    height: "wrap",
                    fontColor: "#ffffff",
                    fontSize: "14dp",
                    contentGravity: "center",
                    gravity: "center",
                    marginLeft: "5dp",
                    marginRight: "5dp",
                }]
            });
        },
        normalUrlMarker: function (marker) {

            var typeOfUrl = "";
            var markerName = "";
            var imageSrc = "";
            if(marker.urlName.indexOf("_video") > -1){
                markerName  = marker.urlName.replace("_video","");
                typeOfUrl = "video";
            }
            if(marker.urlName.indexOf("_audio") > -1){
                markerName  = marker.urlName.replace("_audio","");
                typeOfUrl = "audio";
            }
            if(typeOfUrl=="video"){
                imageSrc = "/images/video_url.png";
            }
            if(typeOfUrl=="audio"){
                imageSrc = "/images/audio_url.png";
            }

            return View.parse({
                width: "wrap",
                height: "20dp",
                layout: "horizontal",
                background: "#70000000",
                clipToBounds: "true",
                borderCorner: "10dp",
                panoHeading: marker.heading,
                panoPitch: marker.pitch,
                children: [
                    {
                    type:"ImageView",
                    marginLeft:"10dp",
                    src:imageSrc,
                    height:"20dp",
                    width:"wrap",
                },
                    {
                    type: "TextView",
                    text:markerName,
                    width: "wrap",
                    gravity:"centerVertical",
                    height: "wrap",
                    fontColor: "#ffffff",
                    fontSize: "14dp",
                    contentGravity: "center",
                    marginLeft: "5dp",
                    marginRight: "5dp",
                }]
            });
        },
    };

    //gifView
    View.extend("com.appengine.view.Plugins_gifs",{
        init:function(){
            View.prototype.init.apply(this,arguments);
            this.runInterval = null;
            this.runTime     = 800;
            this.curRunIndex = 0;
            this.setWidth("wrap");
            this.setHeight("wrap");
        },
        dispatchLayout:function(){
            View.prototype.dispatchLayout.apply(this,arguments);
        },
        setGifs:function(v){
            if(!v) return;
            this.gifsArr = {
                gifs:[]
            };
            var _gif = v.split("---");
            for(var i in _gif){
                var cur    = _gif[i];
                var curGif = cur.split(":");
                var name   = curGif[0],
                    src    = curGif[1] || curGif[0];
                this.gifsArr.gifs.push(name);
                this.gifsArr[name] = src;
            }
            this._createGif();
        },
        _createGif:function(){
            this.clearViews();
            if(!this.gifsArr.gifs || !this.gifsArr.gifs.length) return;
            for(var i = 0 ,len = this.gifsArr.gifs.length; i<len; i++){
                var name = this.gifsArr.gifs[i];
                var cell = View.parse({
                    type:"ImageView",
                    gifName:name,
                    src:this.gifsArr[name],
                    width:"wrap",
                    height:"wrap",
                    alpha:i == 0?1:0
                });
                this.addView(cell);
            }
        },
        setGifsWidth:function(v){
            this.setWidth(v);
            for(var i = 0 ,len = this.subViews.length; i<len; i++){
                var img = this.subViews[i];
                img.setWidth(v);
            }
        },
        setStaticGif:function(name){
            if(!this.gifsArr || !this.gifsArr.gifs.length)  return;
            if(!name) name = this.gifsArr.gifs[0];
            var set = false;
            for(var i = 0, len = this.subViews.length;i<len;i++){
                var cur = this.subViews[i];
                if(cur.gifName == name){
                    set = true;
                    cur.setAlpha(1);
                }else{
                    cur.setAlpha(0);
                }
            }
            if(!set) this.subViews[0].setAlpha(1);
        },
        startRun:function(){
            if(!this.gifsArr.gifs || this.gifsArr.gifs.length<=1 ) return;
            if(this.runInterval) return;
            var run = function(){
                self.curRunIndex++;
                if(self.curRunIndex >= self.gifsArr.gifs.length) self.curRunIndex = 0;
                var name = self.gifsArr.gifs[self.curRunIndex];
                self.setStaticGif(name);
            };
            var self = this;
            run();
            self.runInterval = setInterval(run, self.runTime);
        },
        endRun:function(){
            var self = this;
            if(!self.runInterval) return;
            clearInterval(self.runInterval);
            self.runInterval = null;
            self.setStaticGif(self.gifsArr.gifs[0]);
            self.curRunIndex = 0;
        }
    });
    //简介音频
    View.extend("com.appengine.view.Plugins_audio",{
        //组件必备方法
        init:function(){
            View.prototype.init.apply(this,arguments);
            this.v_iconBox   = null;
            this.v_audioName = null;
            this.v_time      = null;
            this.audio       = this._createAudio();
            this.audioInterval    = null;
            this.audioCount  = 2;
            this._createView();
            this.setHeight("wrap");
            this._bindEvent();
            this.audioTypeEx = function(){};
        },
        _createAudio:function(){
            var audio = document.createElement("audio");
            audio.setAttribute("preload","auto");
            return document.createElement("audio");
        },
        _createView:function(){
            var self = this;
            var cell = View.parse({
                type:"View",
                height:"40dp",
                background:"#000000",
                children:[{
                    width:"match",//top
                    background:"#000000",
                    height:"1dp",
                    anchorX:0.5,
                    anchorY:0,
                    scaleY:0.5
                },{
                    width:"match",//bottom
                    gravity:"bottom",
                    background:"#000000",
                    height:"1dp",
                    anchorX:0.5,
                    anchorY:1,
                    scaleY:0.5
                },{
                    height:"match",//lefft
                    gravity:"left",
                    background:"#000000",
                    width:"1dp",
                    anchorX:0,
                    anchorY:0.5,
                    scaleX:0.5
                },{
                    height:"match",//lefft
                    gravity:"right",
                    background:"#000000",
                    width:"1dp",
                    anchorX:1,
                    anchorY:0.5,
                    scaleX:0.5
                },{
                    type:"View",
                    id:"audioBox",
                    layout:"horizontal",
                    height:"wrap",
                    width:"wrap",
                    gravity:"left|center",
                    children:[{
                        height:"20dp",
                        width:"wrap",
                        marginLeft:"10dp",
                        children:[{
                            type:"ImageView",
                            width:"wrap",
                            height:"20dp",
                            id:"board",
                            visible:"false",
                            gravity:"vertical|center",
                            src:"/images/goBoard.png",
                        },{
                            type:"ImageView",
                            width:"wrap",
                            height:"20dp",
                            id:"pause",
                            gravity:"vertical|center",
                            src:"/images/pause.png",
                        }],
                    },
                        {
                            type:"View",
                            height:"2dp",
                            id:"process",
                            marginLeft:"12dp",
                            gravity:"vertical|center",
                            alpha:"0.4",
                            background:"#ffffff",
                        },
                        {
                            type:"View",
                            height:"5dp",
                            width:"5dp",
                            borderCorner:"5dp",
                            clipToBounds:"true",
                            anchorX:"0.5",
                            anchorY:"0.5",
                            id:"circle",
                            gravity:"vertical|center",
                            alpha:"0.4",
                            background:"#ffffff",
                        },]
                },{
                    type:"View",
                    height:"wrap",
                    width:"100dp",
                    layout:"horizontal",
                    gravity:"right|center",
                    children:[
                        {
                            width:"40dp",
                            children:[{
                                id:"audioAniBox",
                                gravity:"vertical|center",
                                type:"Plugins_gifs",
                                gifs:"1:/images/sound3_@2x.png---2:/images/sound1_@2x.png---3:/images/sound2_@2x.png",
                                gravity:"center",
                                gifsWidth:"20dp"
                            }]
                        },
                        {
                        type:"TextView",
                        id:"audioDuration",
                        text:"",
                        width:"wrap",
                        height:"wrap",
                        fontColor:"#555555",
                        fontSize:"14dp",
                        marginRight:"16dp",
                        }
                    ]

                }]
            });
            self.addView(cell);
            self.v_iconBox   = cell.$("audioAniBox");
            self.v_time      = cell.$("audioDuration");
            self.v_process = cell.$("process");
            self.v_circle = cell.$("circle");
            self.v_board = cell.$("board");
            self.v_pause = cell.$("pause");
        },

        _bindEvent:function(){
            var self = this;
            var tapGestureDetector = new TapGestureDetector();
            tapGestureDetector.callback = function (event) {
                self.audioToggle();
            };
            self.addGestureDetector(tapGestureDetector);

            var load = false;
            window.addEventListener("touchstart",function(){
                if(!load){
                    self.audio.play();
                    self.audio.pause();
                    load = true;
                }
            })
            self.audio.addEventListener("canplay",function(){
                var text = self._getStandardTime(self.audio.duration);
                self.v_time.setText(text);
            })
            self.audio.addEventListener("play",function(){
                self.v_iconBox.startRun();
                if(!self.v_time.getText()){
                    var text = self._getStandardTime(self.audio.duration);
                    self.v_time.setText(text);
                }
                self.beforePlayCallback && self.beforePlayCallback();
            });
            self.audio.addEventListener("pause",function(){
                self.v_iconBox.endRun();
                self.pauseCallback && self.pauseCallback();
            })
            self.audio.addEventListener("end",function(){
                self.v_iconBox.endRun();
                self.pauseCallback && self.pauseCallback();
            })
            self.audio.addEventListener("timeupdate",function(){
                self.v_process.setWidth(self.audio.currentTime*1/self.audio.duration*1*(self.frame.width-150)+"dp");
                self.v_time.setText(self._getStandardTime(self.audio.duration).replace("00:",""));
            })
        },
        _audioPlay:function(){
            var self = this;
            self.audio.play();
        },
        _audioPause:function(){
            var self = this;
            self.audio.pause();
        },
        audioIsPaused:function(){
            return this.audio.paused;
        },
        audioPlay:function(){
            this._audioPlay();
        },
        audioPause:function(){
            this._audioPause();
        },
        _getStandardTime:function(_second){
            if(!_second || _second<0) return "";
            _second = parseInt(_second);
            var hour = 0,
                minu = 0,
                second = 0;
            hour = parseInt(_second / 3600) || hour;
            minu = parseInt((_second - hour * 3600)/60);
            var getTwo = function(val){
                if(!val) return "00";
                val +="";
                if(val.length == 1){
                    return "0"+val;
                }
                return val;
            };
            second = _second%60;
            return getTwo(hour)+":"+getTwo(minu)+":"+getTwo(second);
        },
        setAudio:function(o){
            if(!o || !o.src) return;
            var self = this;
            var audio = self.audio;
            var src = o.src;
            var name = o.name||"";


            self.beforePlayCallback = o.beforePlayCallback|| null;
            self.pauseCallback = o.pauseCallback|| null;

            if(!self.audioIsPaused()){
                self._audioPause();
            }
            self.v_time.setText("");
            self.audioSrc = src;
            audio.setAttribute("src",src);
            audio.load();
        },
        audioToggle:function(){
            var self = this;
            var isPaused = self.audio.paused;
            if(isPaused){
                self.v_board.setVisible(false);
                self.v_pause.setVisible(true);
                self._audioPlay();
            }else{
                self.v_board.setVisible(true);
                self.v_pause.setVisible(false);
                self._audioPause();
            }
        }
        //内部方法
    });
});