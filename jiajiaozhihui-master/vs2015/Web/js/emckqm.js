
 
 
function StTimeChange() {
 
CountDh() ;

}
function EtTimeChange() {

 CountDh() ;
 
}
function CountDh() {
   var stDate = ObjStDate.value;
   var enDate = ObjEtDate.value;
   var stTime = ObjStTime.value;
   var enTime = ObjEtTime.value;

   var TotalHours = SumLeaveHour(stDate,enDate,stTime,enTime,wd1,wd2,ht);
   TotalHours=Math.round(TotalHours * 10) / 10;
   var thours=TotalHours;
   var totalDays=0;
   if(TotalHours>=dh) {
      totalDays = parseInt((TotalHours/dh));
      thours= TotalHours-totalDays*dh;
      thours=Math.round(thours * 10) / 10;
   }
   ObjTotalHours.value=thours;
   ObjTotalDays.value=totalDays;
}



 function   SumLeaveHour(stDate,enDate,stTime,enTime,wd1,wd2,ht)//計算請假工時 有周未的计算  
  {   //ht 中午休息时间 wd1周几休息,wd2
        var   st,en,hours   =   0;   
        var   tmp   =   stDate.split("-");   
        var   tmp2   =   stTime.replace(":",",");   
        var   tmp3   =   stTime.split(":");
        var   tmp4   =   enTime.split(":");
        
        //注意月份，需設置為   0   -   11   的整數   
        eval("st   =new   Date("+tmp[0]+","+(tmp[1]-1)+","+tmp[2]+","+tmp2+");");     
        tmp   =   enDate.split("-");   
        tmp2   =   enTime.replace(":",",");   
        eval("en   =new   Date("+tmp[0]+","+(tmp[1]-1)+","+tmp[2]+","+tmp2+");");   
        tmp   =   1000*60*60*24;   //一天的毫秒數   
        var   days   =   Math.round((en.getTime()   -   st.getTime())/tmp);   
        tmp=1000*60*60;//一個小時的毫秒數   
        if(days>0)   //不在同一天   
        {   
              var   st2   =   new   Date(st.getFullYear(),st.getMonth(),st.getDate(),tmp4[0],tmp4[1]);   
              var   en2   =   new   Date(en.getFullYear(),en.getMonth(),en.getDate(),tmp3[0],tmp3[1]);   
              if(st.getDay()!=wd1   &&   st.getDay()!=wd2)   //避開雙休日   
              {   
                 hours   =   (st2.getTime()   -   st.getTime())/tmp;   //第一天的請假工時   
                 if(st.getHours()<13)   
                   {   
                     hours   -=   ht;   
                   }   
              }   
              if(en.getDay()!=wd1   &&   en.getDay()!=wd2)   
              {   
                  hours   +=   (en.getTime()   -   en2.getTime())/tmp   ;//最後一天的請假工時   
                  if(en.getHours()>13)   
                    {   
                     hours   -=   ht;   
                    }   
              }   
              tmp2   =   0;   
              for(var   i   =1;i<days;i++)   
              {   
                st2.setTime(st.getTime()+tmp*24*i);       
                if(st2.getDay()!=wd1   &&   st2.getDay()!=wd2)   
                {   
                       tmp2   ++;   //從第一天到最後一天之間有多少個工作日   
                 }   
              }   
              hours   +=   tmp2*dh;   
        }   
        else   if(days   ==   0)   //在同一天   
        {   
              hours   =   (en.getTime()/tmp)-(st.getTime()/tmp);   
              if(st.getHours()<13   &&   en.getHours()>13)   
              {   
                    hours   -=   ht;   //除掉中午休息時間   
              }   
        }   
        if(hours<0)
          {
           hours=0;
           }   
        return   hours;   
  }


  