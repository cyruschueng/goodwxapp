<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="grouptree.aspx.cs"   Inherits="SfSoft.web.emc.sm.s1._Default" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
 
 
        <asp:Panel ID="Panel1" runat="server" Height="424px" Width="175px" ScrollBars="Auto">
            <div id="DeptTree" class="TreeMenu"></div>
        </asp:Panel>
        <script language="jscript">
            var tree = document.getElementById("DeptTree");
            var root = document.createElement("li");
            root.id = "li_00";
            root.innerHTML="神尔科技有限公司";
            var img = document.createElement("img");
             img.className = "s";
             img.src = "/emc/sm/s1/css/s.gif";   
            root.className = "Opened1"; 
            //root.appendChild(img);
            tree.appendChild( root );
            ExpandSubDept( "00","1" );
            function ExpandSubDept( DeptID, flag )
            {
            
              if (flag=="1") {
                var liFather = document.getElementById( "li_" + DeptID );
                if( liFather.getElementsByTagName("li").length > 0)
                {
                    ChangeStatus( DeptID );
                    return;
                }
                liFather.className = "Opened";
               }
                
                SwitchNode( DeptID, true );
                
                //仅获取当前节点的子Nodes
                SfSoft.web.emc.sm.s1._Default.GetSubDept( DeptID, GetSubDept_callback );
               
            }            
            function SwitchNode( DeptID, show )
            {
                var li_father = document.getElementById("li_" + DeptID);
                if( show )
                {
                    var ul = document.createElement("ul");
                    ul.id = "ul_note_" + DeptID;
                    
                    var note = document.createElement("li");
                    note.className = "Child";              
                    
                    var img = document.createElement("img");
                    img.className = "s";
                    img.src = "/emc/sm/s1/css/s.gif";                    
                    
                    var a = document.createElement("a");
                    a.href = "javascript:void(0);";
                    a.innerHTML = "请销等...";
                    
                    note.appendChild(img);
                    note.appendChild(a);
                    ul.appendChild(note);
                    li_father.appendChild(ul);                                        
                }   
                else
                {
                    var ul = document.getElementById("ul_note_" + DeptID );
                    if( ul )
                    {
                        li_father.removeChild(ul);
                    }
                }             
            }
            function GetSubDept_callback( response )
            {
          
               var dt = response.value.Tables[0];
               if( dt.Rows.length > 0 )
               {
                    var iDeptID = dt.Rows[0].ParentID;               
               }                                
               var li_father = document.getElementById("li_" + iDeptID );
               var ul = document.createElement("ul");
               for( var i = 0; i < dt.Rows.length; i++ )
               {
                    if( dt.Rows[i].IsChild == 1 )
                    {
                        var li = document.createElement("li");
                        li.className = "Child";
                        li.id = "li_" + dt.Rows[i].DeptID;
                        var img = document.createElement("img");
                        img.id = dt.Rows[i].DeptID;
                        img.className = "s";
                        img.src = "/emc/sm/s1/css/s.gif";
  
                        var a = document.createElement("a");
                        a.href = "javascript:OpenDocument('" + dt.Rows[i].DeptID + "');";
                        a.innerHTML = dt.Rows[i].DeptName;                                          
                    }
                    else
                    {
                        var li = document.createElement("li");
                        li.className = "Closed";
                        li.id = "li_" + dt.Rows[i].DeptID;
                        var img = document.createElement("img");
                        img.id = dt.Rows[i].DeptID;
                        img.className = "s";
                        img.src = "/emc/sm/s1/css/s.gif";
                        img.onclick = function(){ ExpandSubDept( this.id , "1"); };
                        img.alt = "展开/收缩";
                        var a = document.createElement("a");
                        a.href = "javascript:OpenDocument('" + dt.Rows[i].DeptID + "');";
                        a.innerHTML = dt.Rows[i].DeptName;                                         
                    }
                    li.appendChild(img);
                    li.appendChild(a);
                    ul.appendChild(li);
               }
               li_father.appendChild(ul);
               SwitchNode( iDeptID, false );
            }          
            
            //单击叶节点时, 异步从服务端获取单个节点的数据.
            function OpenDocument( DeptID )
            {                
                //SfSoft.web.emc.sm.s1._Default.GetNameByDeptID( DeptID, GetNameByDeptID_callback );
 
                 var hfdeptid = parent.document.getElementById("DeptID");
                 hfdeptid.value=DeptID;
                parent.mainbody.location="update.aspx?Mode=update&DeptID="+DeptID;
            }
            
            function GetNameByDeptID_callback( response )
            {
                alert( response.value );
            }
            
            function ChangeStatus( DeptID )
            {
                var li_father = document.getElementById("li_" + DeptID );
                if( li_father.className == "Closed" )
                {
                    li_father.className = "Opened";
                }
                else
                {
                    li_father.className = "Closed";
                }
           }              
        </script>          
 
</asp:Content>
