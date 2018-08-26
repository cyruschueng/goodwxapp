/*drawRate(7,3.5,3.5,3.2,135,45,"canvas1",80);
drawRate(7,3.5,3.5,3.2,135,45,"canvas2",60);
drawRate(7,3.5,3.5,3.2,135,45,"canvas3",40);
drawRate(7,3.5,3.5,3.2,135,45,"canvas4",20);*/
function  drawRate(x,y,radius,innerRadius,startAngle,endAngle,canvasId,process){
    fontHeight=16;
    x=x*fontHeight;
    y=y*fontHeight;
    radius=radius*fontHeight;
    innerRadius=innerRadius*fontHeight;



    var canvas = document.getElementById(canvasId);  
    var context = canvas.getContext('2d');  

    var deg = Math.PI/180;
    var percent= process / 100;
    var endDeg=0;
    if(percent < 5/6){
        endDeg = 135*deg + 270*percent*deg;
    }else{
        console.info(12);
        endDeg = 135*deg + 270*percent*deg -360*deg;
    }

    //进度条已经进行的部分
    context.beginPath();
    context.arc(x,y,radius,startAngle*deg, endDeg);
    context.fillStyle="#00c3b5";
    context.lineTo(x,y);
    context.fill();
    context.closePath();  

    console.info(endDeg);
    //进度条底部
    context.beginPath();
    context.arc(x,y,radius,endDeg, endAngle*deg);
    context.fillStyle="#bff0ec";
    context.lineTo(x,y);
    context.fill();
    context.closePath();  


    //进度条内环
    context.beginPath();
    context.arc(x,y,innerRadius,0, 360*deg);
    context.fillStyle="#FFF";
    context.lineTo(x,y);
    context.fill();
    context.closePath();  

    /*//进度条百分比
    context.beginPath();
    context.font= "3rem";   
    context.fillStyle = "#00c3b5";  
    context.textAlign = "center";    
    context.textBaseline = 'middle';    
    context.moveTo(x, y);    
    context.fillText(process + '%', x, y);
    context.closePath();  */
}
    