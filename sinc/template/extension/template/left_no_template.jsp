<%@ page contentType="text/html;charset=MS949" %>
<%@include file ="/sinc/template/extension/skin/skin.jsp" %>
<html>
<head>
<script language="javascript">
	function FrameResize(temp) {	
		var type = temp;		
		top.left_home.cols = "230,*";
		if(type == "menu"){			
			location.href="service.do?_moon_service=main_menu&_moon_menu=true&_user_id=<%=session.getAttribute("_user_id")%>";
		} else if(type == "bom"){			
			location.href="<%=request.getContextPath()%>/sinc/template/extension/template/left_template2.jsp?_user_id=<%=session.getAttribute("_user_id")%>";
		}
	}
</script>

</head>

<body leftmargin="0" rightmargin="0">
	<table width="1" height="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>		
			<td onClick="FrameResize('<%=request.getParameter("_type")%>')">
				<font size="1" color="555555">¢º</font>
			</td>
		</tr>
	</table>
</body>
</html>
