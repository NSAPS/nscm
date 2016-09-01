<%@ page contentType="text/html;charset=MS949" %>
<%@ page import="java.util.*"%>
<%					
	session.setAttribute("_moon_navigation", request.getAttribute("_moon_navigation"));
	session.setAttribute("_moon_title",  request.getAttribute("_moon_title"));
	session.setAttribute("_moon_service", request.getAttribute("_moon_service"));
	session.setAttribute("_moon_target", request.getAttribute("_moon_target"));
	session.setAttribute("_user_id", request.getAttribute("_user_id"));
	session.setAttribute("_user_name", request.getAttribute("_user_name"));
	session.setAttribute("_user_email", request.getAttribute("_user_email"));
	session.setAttribute("_user_group_seq", request.getAttribute("_user_group_seq"));
	session.setAttribute("_moon_path", request.getAttribute("_moon_path"));
    
	session.setAttribute("_company_code", request.getAttribute("_company_code"));
	session.setAttribute("_employeeNo", request.getAttribute("_employeeNo"));    
%>

<html>
<script>
//if($!{login.size()}==0) {
//	window.close();
//}
<%
	if(request.getAttribute("login") == null || ((ArrayList)request.getAttribute("login")).size() == 0){
%>
	window.close();
<%	
	}
%>
</script>
<frameset border=0 frameSpacing=0 rows=50,* frameBorder=0>
	<frame marginWidth=5 marginHeight=5 src="<%=request.getContextPath()%>/sinc/template/extension/template/head_template.jsp" noResize scrolling=no>
	<frameset name="left_home" frameBorder="0" cols=230,* >
		<%=request.getAttribute("_user_name"))%>
		<frame name="leftFrame" marginWidth="5" marginHeight="5" src="service.do?_moon_service=main_menu&_moon_menu=true&_user_id=<%=request.getAttribute("_user_id")%>" scrolling="no">
		<frame name="mainFrame" marginWidth="5" marginHeight="5" src="service.do?_moon_service=problem_summary" noResize scrolling="no">
	</frameset>
</frameset>
</html>