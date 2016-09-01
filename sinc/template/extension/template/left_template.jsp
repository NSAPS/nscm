<%@ page contentType="text/html;charset=MS949" %>   
<%@include file ="/sinc/template/extension/skin/skin.jsp" %>
<%
	String project = request.getContextPath();
%>
<html>
<HEAD>
<style>
.cap1 {filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=<%=gradient_start%>, EndColorStr=<%=gradient_middle%>)';font-family: <%=font_family%>; font-size: <%=font_size_up%>pt; color:#FFFFFF; border:0 solid #000000;height:22px;} 
.cap2 {filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=<%=gradient_middle%>, EndColorStr=<%=gradient_end%>)';font-family: <%=font_family%>; font-size: <%=font_size_up%>pt; color:#FFFFFF; border:0 solid #000000;height:22px;} 
a:link {font-family: <%=font_family%>;  font-size:<%=font_size%>pt ;color:#111111; text-decoration: none;}
a:visited {font-family: <%=font_family%>; font-size:<%=font_size%>pt; color:#111111; text-decoration: none;  }
a:hover {font-family: <%=font_family%>; font-size:<%=font_size%>pt; color:#EEEEEE; text-decoration: none;  }
</style>

<link type="text/css" rel="stylesheet" href="<%=project%>/sinc/template/extension/skin/<%=session.getAttribute("_moon_skin") %>/skin.css" />
<script src="<%=project%>/sinc/template/extension/script/xtree.js"></script>
</HEAD>

<body bgcolor="<%=body_bgcolor%>" leftmargin="10" rightmargin="0" topmargin="2"
			## 메뉴부분 스크롤바 색상
			style="scrollbar-face-color:#FFFFFF;scrollbar-highlight-color: #777777;
					scrollbar-3dlight-color: #FFFFFF;scrollbar-shadow-color: #777777;
					scrollbar-darkshadow-color: #FFFFFF;scrollbar-track-color: #FFFFFF;
					scrollbar-arrow-color: #777777;" >

<table height="100%" cellspacing=0 cellpadding=0 width="100%" border="0">
	<tr>
		<td width="%">


<table height="100%" cellSpacing=0 cellPadding=0 width="100%" border=0>
	<tr>
		<td width="100%" height="90%">
  			<table height="100%" cellSpacing=0 cellPadding=0 width="100%" border=0>
    			<tr>
		          	<td><img height=2 src="<%=project%>/sinc/template/extension/images/common/left_top.gif" width=2></td>
		          	<td width="100%" background=<%=project%>/sinc/template/extension/images/common/top_top.gif></td>
		          	<td><img height=2 src="<%=project%>/sinc/template/extension/images/common/top_right.gif" width=3></td>
				</tr>
		       	<tr>
		          	<td><img height=22 src="<%=project%>/sinc/template/extension/images/common/left_border.gif" width=2></td>
		          	<td>
		          		<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td class="cap1" width="40%">
								&nbsp;<img src="<%=project%>/sinc/template/extension/images/common/site_map.gif" align="absmiddle">&nbsp; Menu
							</td>
							<td class="cap2" width="30%">&nbsp;</td>
							<td bgcolor="<%=body_bgcolor%>" width="30%" align="right">
								<a href="#" onClick="tree.expandAll();"><img src="<%=project%>/sinc/template/extension/images/menuicon/down.gif" align="absmiddle" border="0"/></a>
								<a href="#" onClick="tree.collapseAll();"><img src="<%=project%>/sinc/template/extension/images/menuicon/up.gif" align="absmiddle" border="0"/></a> &nbsp;								
							</td>
						</tr>
					</table>
		          	</td>
		          	<td><img height=22 src="<%=project%>/sinc/template/extension/images/common/right_border.gif" width=3></td>
		        </tr>
    			<tr>
			      	<td><img height=1 src="<%=project%>/sinc/template/extension/images/common/left_border.gif" width=2></td>
			       <td width="100%" background="<%=project%>/sinc/template/extension/images/common/grey.gif"></td>
			       <td><img height=1 src="<%=project%>/sinc/template/extension/images/common/right_border.gif" width=3></td>
				</tr>
    			<tr bgcolor="<%=left_bgcolor%>">
		          	<td background="<%=project%>/sinc/template/extension/images/common/left_border.gif" height="100%"></td>
		          	<td vAlign=top align=left> 
		          	
		          		<div id="menu_div_id" style="width: 222px; height:617px; overflow:auto; ">
		            		<table cellSpacing=1 cellPadding=0 border=0>
		              			<tr>
				                	<td>&nbsp;</td>
				                	<td>
										<script language="javascript">
											<%=request.getAttribute("_moon_menus") %>
										</script>
            						</td>
            					</tr>
            				</table>
            			</div>
            		
            		</td>
      				<td width=3 background="<%=project%>/sinc/template/extension/images/common/right_border.gif" height="100%"></td>
      			</tr>
    			<tr>
		          	<td><img height=3 src="<%=project%>/sinc/template/extension/images/common/left_bottom.gif" width=2></td>
		          	<td width="100%" background="<%=project%>/sinc/template/extension/images/common/bottom_bottom.gif"></td>
		          	<td><img height=3 src="<%=project%>/sinc/template/extension/images/common/bottom_right.gif" width=3></td>
		       	</tr>
			</table>
		</td>
    </tr>
</table>

		</td>
	</tr>
</table>
<!--
<table >
	<tr><td>menu</td><td><a href="/extension/template/left_template2.jsp?_user_id=<%=request.getAttribute("_user_id")%>">bom</a></td></tr>
</table>      
-->

<script>

	setLeftAutoResize();
	function window.onresize() { setLeftAutoResize(); } 
	
	// left resize 
	function setLeftAutoResize( ){
			
			var maxWidthValue;
			var maxHeightValue;
			
			// default 230 * 650 
			if (document.layers) {
				//Nescape
				maxWidthValue = window.innerWidth;
				maxHeightValue = window.innerHeight;
			}
			if (document.all) {
				//explore
				maxWidthValue = document.body.clientWidth;
				maxHeightValue = document.body.clientHeight;
			} 
			//alert(maxWidthValue + "___" + maxHeightValue); return;
			var menuWidthValue = Number(maxWidthValue) - 8; 
			var menuHeightValue = Number(maxHeightValue) - 33 ; 
			// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
			// ==> 화면이 더이상 축소되지 않음 
			if( menuWidthValue < 1 ) 
				menuWidthValue = 1; 
			if( menuHeightValue < 1 ) 
				menuHeightValue = 1; 
			
			menu_div_id.style.width = menuWidthValue + "px"; 
			menu_div_id.style.height = menuHeightValue + "px"; 
		
	} 
	
</script> 

</body>
</html>
