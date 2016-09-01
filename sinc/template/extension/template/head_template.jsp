<%@ page contentType="text/html;charset=MS949" %>
<%@include file ="/sinc/template/extension/skin/skin.jsp" %>
<%
	String project = request.getContextPath();
%>
<html>
<head>
	<TITLE></TITLE>
<style>
td {  font-family: <%=font_family%>; font-size: <%=font_size%>pt; color: #FFFFFF}
</style>
<script>
      function GoLogout(){
      	
      	parent.window.close();
      }
</script>
</head>

<body bgcolor="<%=body_bgcolor%>">
<table height="100%" cellSpacing=0 cellPadding=0 width="100%" border=0>
	<tr>
	    <td><img height=2 src="<%=project%>/sinc/template/extension/images/common/left_top.gif" width=2></td>
	    <td width="100%" background="<%=project%>/sinc/template/extension/images/common/top_top.gif"></td>
	    <td><img height=2 src="<%=project%>/sinc/template/extension/images/common/top_right.gif" width=3></td>
	</tr>
	<tr bgColor=#ffffff>
		<td background="<%=project%>/sinc/template/extension/images/common/left_border.gif" height="100%"></td>
    	<td align=middle>
      		<table cellspacing="0" cellPadding="0" width="100%" border="0" bgcolor="<%=head_bgcolor%>" height="100%">
	        	<tr>
                	<td align=left width="15%">
                		<table width="100%" height="100%">
                			<tr>
                				<td height="100%">
                					<img src="<%=project%>/sinc/template/extension/images/common/zionex_logo.gif" align="absmiddle">
                				</td>
                			</tr>
                		</table>
                	</td>
                	<td align=left width="8%">
                	<a href="service.do?_moon_service=default_main">
                	&nbsp; Home</a> </td>
                	
                	<td align=left width="8%">
                		<a href= "javascript:GoLogout()"><font color="white">Log-out</font></a>
                	</td>
                	<td align=left width="8%">&nbsp; Help</td>
                	<td align=right width="66%">Zionex &nbsp;&nbsp;</td>
				</tr>
			</table>
		</td>
		<td background="<%=project%>/sinc/template/extension/images/common/right_border.gif" height="100%"></td>
	</tr>
	<tr>
	    <td><img height=3 src="<%=project%>/sinc/template/extension/images/common/left_bottom.gif" width=2></td>
	    <td width="100%" background="<%=project%>/sinc/template/moon/extension/images/common/bottom_bottom.gif"></td>
	    <td><img height=3 src="<%=project%>/sinc/template/extension/images/common/bottom_right.gif" width=3></td>
	</tr>
</table>
</body>
</html>
