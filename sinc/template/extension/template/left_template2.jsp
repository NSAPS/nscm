<%@ page contentType="text/html;charset=MS949" %>
<%@include file ="/sinc/template/extension/skin/skin.jsp" %>
<html>
<HEAD>
<style>
.cap1 {filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=<%=gradient_start%>, EndColorStr=<%=gradient_middle%>)';font-family: <%=font_family%>; font-size: <%=font_size_up%>pt; color:#FFFFFF; border:0 solid #000000;height:22px;} 
.cap2 {filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=<%=gradient_middle%>, EndColorStr=<%=gradient_end%>)';font-family: <%=font_family%>; font-size: <%=font_size_up%>pt; color:#FFFFFF; border:0 solid #000000;height:22px;} 
a:link {font-family: <%=font_family%>;  font-size:<%=font_size%>pt ;color:#111111; text-decoration: none;}
a:visited {font-family: <%=font_family%>; font-size:<%=font_size%>pt; color:#111111; text-decoration: none;  }
a:hover {font-family: <%=font_family%>; font-size:<%=font_size%>pt; color:#EEEEEE; text-decoration: none;  }

</style>

<link type="text/css" rel="stylesheet" href="/extension/skin/<%=session.getAttribute("_moon_skin") %>/skin.css" />
<script src="/basic/script/xtree.js"></script>
<script language="javascript">
	function FrameResize() {
		top.left_home.cols = "10,*";
		location.href="/extension/template/left_no_template.jsp?_type=bom";
	}
</script>
</HEAD>

<body bgcolor="<%=body_bgcolor%>" leftmargin="10" rightmargin="0" topmargin="2">

<table height="95%" cellspacing=0 cellpadding=0 width="100%" border="0">
	<tr>
		<td width="%">


<table height="100%" cellSpacing=0 cellPadding=0 width="100%" border=0>
	<tr>
		<td width="100%" height="90%">
  			<table height="100%" cellSpacing=0 cellPadding=0 width="100%" border=0>
    			<tr>
		          	<td><img height=2 src="/basic/images/common/left_top.gif" width=2></td>
		          	<td width="100%" background=/basic/images/common/top_top.gif></td>
		          	<td><img height=2 src="/basic/images/common/top_right.gif" width=3></td>
				</tr>
		       	<tr>
		          	<td><img height=22 src="/basic/images/common/left_border.gif" width=2></td>
		          	<td>
		          		<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td class="cap1" width="40%">
									&nbsp;<img src="/basic/images/common/site_map.gif" align="absmiddle">&nbsp; 전체메뉴
								</td>
								<td class="cap2" width="30%">&nbsp;</td>
								<td bgcolor="<%=body_bgcolor%>" width="30%" align="right">
									<a href="#" onClick="tree.expandAll();">▼</a>
									<a href="#" onClick="tree.collapseAll();">▲</a> &nbsp; 
								</td>
							</tr>
						</table>
		          	</td>
		          	<td><img height=22 src="/basic/images/common/right_border.gif" width=3></td>
		        </tr>
    			<tr>
			      	<td><img height=1 src="/basic/images/common/left_border.gif" width=2></td>
			       <td width="100%" background=/basic/images/common/grey.gif></td>
			       <td><img height=1 src="/basic/images/common/right_border.gif" width=3></td>
				</tr>
    			<tr bgcolor="<%=left_bgcolor%>">
		          	<td background=/basic/images/common/left_border.gif height="100%"></td>
		          	<td vAlign=top align=left>
		            		<table cellSpacing=1 cellPadding=0 border=0>
		              		<tr>
				                	<td>&nbsp;</td>
				                	<td>
		                  				<div style="width: 100%; height: 100%; overflow: auto;" >
											<script language="javascript">
												<%=request.getAttribute("_moon_menus") %>
											</script>
					          			</div>
            						</td>
            					</tr>
            				</table>
            			</td>
      				<td width=3 background=/basic/images/common/right_border.gif height="100%"></td>
      			</tr>
    			<tr>
		          	<td><img height=3 src="/basic/images/common/left_bottom.gif" width=2></td>
		          	<td width="100%" background=/basic/images/common/bottom_bottom.gif></td>
		          	<td><img height=3 src="/basic/images/common/bottom_right.gif" width=3></td>
		       	</tr>
			</table>
		</td>
    </tr>
</table>

		</td>
		<td width="1" onClick="javascript:FrameResize()" valign="middle">
			<font size="2" color="555555"></font>
		</td>
	</tr>
</table>
<!--
<table >
	<tr><td><a href="service.do?_moon_service=main_menu&_moon_menu=true&_user_id=<%=session.getAttribute("_user_id")%>"a>menu</td><td>bom</a></td></tr>
</table>
-->
</body>
</html>
