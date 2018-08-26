<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="getclient.aspx.cs" Inherits="SfSoft.web.reg.emc.getclient" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>神尔科技</title>

    <script language="JScript" event="OnCompleted(hResult,pErrorObject, pAsyncContext)"
        for="foo">
        var objComputerID=parent.document.getElementById("txtComputerID");
        if (form1.ComputerID.value=="") {
       form1.txtMACAddr.value= unescape(MACAddr);
       objComputerID.value=form1.txtMACAddr.value；
       }
       else {
       
       objComputerID.value=form1.ComputerID.value;
        
       }
    </script>

    <script language="JScript" event="OnObjectReady(objObject,objAsyncContext)" for="foo">
   if (form1.ComputerID.value=="") {
    if(objObject.MACAddress != null && objObject.MACAddress != "undefined") {
    MACAddr = objObject.MACAddress;
    }
    }
    </script>

</head>
<body>
    <object id="locator" classid="CLSID:76A64158-CB41-11D1-8B02-00600806D9B6" viewastext>
    </object>
    <object id="foo" classid="CLSID:75718C9A-F029-11d1-A1AC-00C04FB6C223">
    </object>

    <script language="JScript">
        try {
            
   var service = locator.ConnectServer();
   var MACAddr="";
   service.Security_.ImpersonationLevel=3;
   service.InstancesOfAsync(foo, 'Win32_NetworkAdapterConfiguration');
   }
   catch (err) {
   
   }
    </script>

    <form id="form1" runat="server">
    <input type ="hidden"  value="" name="txtMACAddr">
    <input  type ="hidden"  name="ComputerID" value="">
    <div>
    </div>
    </form>
    <object id="IDocx" codebase="../IDocx.cab#version=2,0,0,1" classid="clsid:DC9CD8CC-CBF1-4F8F-91D7-62DABBA9077B">
        <param name="_Version" value="65536">
        <param name="_ExtentX" value="2646">
        <param name="_ExtentY" value="1323">
        <param name="_StockProps" value="0">
    </object>

    <script language="vbscript">
on error resume next
 
 pid=trim(IDocx.getcomputerid())
 pid=replace(pid,"-","")
cpid=pid
if pid<>"" then
   if RegExpTest(pid)="Y" then
      cpid=""
   end if
end if

  Function RegExpTest(strng)
  Dim regEx, Match, Matches      ' 建立变量。
  Set regEx = New RegExp         ' 建立正则表达式。
  regEx.Pattern = "\W"         ' 设置模式。
  regEx.IgnoreCase = True         ' 设置是否区分字符大小写。
  regEx.Global = True         ' 设置全局可用性。
  Set Matches = regEx.Execute(strng)   ' 执行搜索。
  RetStr="N"
  For Each Match in Matches      ' 遍历匹配集合。
 
      aa=trim(Match.FirstIndex)
      if aa >=0 then
         RetStr="Y"
         exit for
      end if
  Next
  
  RegExpTest = RetStr
End Function


 form1.ComputerID.value=cpid
    </script>
    
<script>

    function getPID() {
        alert(form1.ComputerID.value + "--" + form1.txtMACAddr.value);

    }

</script>
</body>


</html>
