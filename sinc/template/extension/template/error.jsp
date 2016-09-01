<%@ page contentType="text/html;charset=UTF-8" %>
<%request.setCharacterEncoding("UTF-8");%>
<%--@ page contentType="text/html; charset=euc-kr" --%>
<%@ page import="org.apache.velocity.app.Velocity" %>
<%@include file ="/sinc/template/extension/skin/skin.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ page import="java.util.*"%>
<%@ page import="java.lang.String"%>
<%@ page import="java.lang.Exception"%>
<%@ page import="java.lang.StackTraceElement"%>
<%@ page import="com.zionex.t3sinc.common.*"%>
<%
	String project = request.getContextPath();
%>
<html>
<head>
<style> 
.cap1 {filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=<%=gradient_start%>, EndColorStr=<%=gradient_middle%>)';font-family: <%=font_family%>; font-size: <%=font_size_up%>pt; color:#FFFFFF; border:0 solid #000000;height:22px;} 
.cap2 {filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=<%=gradient_middle%>, EndColorStr=<%=gradient_end%>)';font-family: <%=font_family%>; font-size: <%=font_size_up%>pt; color:#FFFFFF; border:0 solid #000000;height:22px;} 
.button1_1 {
	filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#FFFFFF, EndColorStr=<%=toolbar_btn2_bgcolor%>)';
	font-family: <%=font_family%>;   font-size: <%=font_size_dw%>pt; 
	border:1px solid;  border-color:ButtonHighlight ButtonShadow ButtonShadow ButtonHighlight; 
	height:18px;} 	
.button1_2 {
	filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#FFFFFF, EndColorStr=<%=gradient_start%>)';
	font-family: <%=font_family%>; 	font-size: <%=font_size_dw%>pt; 
	border:1px solid; border-color: ButtonHighlight ButtonShadow ButtonShadow ButtonHighlight; 
	height:18px;
} 	
.button2_1{
	font-size: <%=font_size%>pt;
	border: 1px solid;
	border-color:	ButtonHighlight ButtonShadow
				ButtonShadow ButtonHighlight;
	background: <%=toolbar_btn_bgcolor%>;
}
.button2_2{
	font-size: <%=font_size%>pt;
	border: 1px solid;
	border-color:	#000000 #000000
				#000000 #000000;
	background: <%=toolbar_btn2_bgcolor%>;		
}
.button2_3{
	color: gray;
	font-size: <%=font_size%>pt;
	border: 1px solid;
	border-color:	#787878 #C7C7C7
				#C7C7C7 #787878;
	background: <%=toolbar_btn_bgcolor%>;
}
</style> 

<link type="text/css" rel="stylesheet" href="<%=project%>/sinc/template/extension/skin/<%=session.getAttribute("_moon_skin")%>/skin.css" />
<link type="text/css" rel="stylesheet" href="<%=project%>/sinc/template/extension/script/grid/styles/classic/grid.css" />
<link type="text/css" rel="stylesheet" href="<%=project%>/sinc/template/basic/skin/style.css" />

<script type="text/javascript" src="<%=project%>/sinc/template/extension/script/tabpane.js"></script>
<script type="text/javascript" src="<%=project%>/sinc/template/extension/script/sortabletable.js"></script>
<script type="text/javascript" src="<%=project%>/sinc/template/extension/script/sortTable.js"></script>
<script type="text/javascript" src="<%=project%>/sinc/template/extension/script/util.js"></script>
<script type="text/javascript" src="<%=project%>/sinc/template/extension/script/action.js"></script>
<script type="text/javascript" src="<%=project%><%=session.getAttribute("_moon_path")%>/script/<%=request.getAttribute("_moon_target")%>.js"></script>
<script type="text/javascript" src="<%=project%>/sinc/template/extension/script/grid/lib/grid.js"></script>

<!-- calendar stylesheet -->
<!--<link rel="stylesheet" type="text/css" media="all" href="/basic/script/jscalendar/calendar-system.css" title="win2k-cold-1" />-->
<link rel="stylesheet" type="text/css" media="all" href="<%=project%>/sinc/template/extension/skin/<%=session.getAttribute("_moon_skin")%>/calendar.css" title="calendar" />

<!-- main calendar program -->
<script type="text/javascript" src="<%=project%>/sinc/template/extension/script/jscalendar/calendar.js"></script>

<!-- language for the calendar -->
<script type="text/javascript" src="<%=project%>/sinc/template/extension/script/jscalendar/lang/calendar-ko.js"></script>

<!-- the following script defines the Calendar.setup helper function, which makes  adding a calendar a matter of 1 or 2 lines of code. -->
<script type="text/javascript" src="<%=project%>/sinc/template/extension/script/jscalendar/calendar-setup.js"></script>

</head>
<%
	//String moon_refresh_detect = (String)request.getAttribute("moon_refresh_detect");
	//if(moon_refresh_detect == null || moon_refresh_detect.equals("")){
	//	moon_refresh_detect = "";
	//}

	//<<--KSY 2005.01.11
	Exception err_obj = (Exception) session.getAttribute("_moon_exception");
	String err_msg = (String) session.getAttribute("_moon_exception_message");
	String err_detail = (String) session.getAttribute("_moon_exception_detail");
	String service = (String) request.getAttribute("_moon_service");
	String skin = (String) session.getAttribute("_moon_skin");
	
	// 2008.06.09 by KIM TAE JONG
	// Error 로그를 위해 추가한 부분
	// request_type 이 insert 인 경우 화면상의 parameter 들을 당 화면에서 받을수가 없음
	// 따라서, service_id 를 저장하는 session parameter 를 지정하고
	// insert job 실행 전, service_id 를 위 parameter 에 저장한 후
	// 본 화면에서 이 parameter 값을 읽는다
	String user_id = (String) session.getAttribute("_user_id");
	String user_service = (String) session.getAttribute("_user_service");
	String user_ip = (String) request.getRemoteAddr();
	ConnectionLogs cLogs = new ConnectionLogs();
	
	// service_id 가 null 또는 공백이면 user_service 로 대체
	if( service == null ) {
		cLogs.insertLogsErr(user_id, user_service, user_ip, err_msg, err_detail);
	}
	else if( service.equals("") ) {
		cLogs.insertLogsErr(user_id, user_service, user_ip, err_msg, err_detail);
	}
	else {
		cLogs.insertLogsErr(user_id, service, user_ip, err_msg, err_detail);
	}
	// -->>

%>

<script languagu="javascript">
	if("<%=skin%>" == "" || "<%=skin%>" == "null" || "<%=skin%>" == "NULL" || "<%=skin%>" == null){
		alert("SESSION 이 끊어졌습니다. 창을 닫고 다시 로그인하세요.");
		top.window.close();
	}
	else if("<%=err_msg%>" == "FAIL to pass a PERMISSION CHECK"){
		alert("요청하신 작업에 권한이 없습니다.\n자세한 사항은 관리자에게 문의하시기 바랍니다.");
		window.history.go(-1);
	}
</script>

<body bgcolor="<%=body_bgcolor%>" leftmargin="5" rightmargin="10" topmargin="2">

<table height="100%" cellspacing=0 cellpadding=0 width="100%" border="0">
  	<tr>
		<td><img height=2 src="<%=project%>/sinc/template/extension/images/common/left_top.gif" width=2></td>
		<td width="100%" background="<%=project%>/sinc/template/extension/images/common/top_top.gif"></td>
		<td><img height=2 src="<%=project%>/sinc/template/extension/images/common/top_right.gif" width=3></td>
	</tr>
  	<tr>
		<td><img height=22 src="<%=project%>/sinc/template/extension/images/common/left_border.gif" width=2></td>
		<td>
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
				<tr>
					<td class="cap1" width="60%">
						&nbsp;<img src="<%=project%>/sinc/template/extension/images/common/home.gif" align="absmiddle">&nbsp;
						<%= " Error at " + service%></td>
					<td class="cap2" width="20%">&nbsp;</td>
					<td bgcolor="<%=body_bgcolor%>" width="20%">&nbsp;</td>
				</tr>
			</table>
		</td>
		<td><img height=22 src="<%=project%>/sinc/template/extension/images/common/right_border.gif" width=3></td>
	</tr>
  	<tr>
		<td width=2 background="<%=project%>/sinc/template/extension/images/common/left_border.gif" height=1></td>
		<td width="100%" background="<%=project%>/sinc/template/extension/images/common/grey.gif"></td>
		<td width=3 background="<%=project%>/sinc/template/extension/images/common/right_border.gif" height=1></td>
	</tr>
  	<tr>
		<td background="<%=project%>/sinc/template/extension/images/common/left_border.gif" height="100%"></td>

		<td valign=top align=middle bgcolor="<%=main_bgcolor%>">
			<form method="post" name="frm">
			<table border="0" width="100%" height="100%" cellpading="0" cellspacing="0">
				<!-- <<KSY 2005.01.11 -->
				<tr>
					<td height="*" valign="middle" align="center">
					 <img src="sinc/template/basic/images/common/error.jpg">
					</td>
				</tr>
				<!-- KSY 2005.01.11>> -->
				
			</table>
			<iframe id="frameMsg" style="display:none; "></iframe>
			</form>
        </td>
		<td width=3 background="<%=project%>/sinc/template/extension/images/common/right_border.gif" height="100%"></td>
	</tr>
  	<tr>
		<td><img height=3 src="<%=project%>/sinc/template/extension/images/common/left_bottom.gif" width=2></td>
		<td width="100%" background="<%=project%>/sinc/template/extension/images/common/bottom_bottom.gif"></td>
		<td><img height=3 src="<%=project%>/sinc/template/extension/images/common/bottom_right.gif" width=3></td>
	</tr>
</table>

				<!-- <<KSY 2005.01.11 -->
				 ----------------------------------------------------------------- <br>
				ERROR DETAIL. <br>
				[<%=err_detail%>] <br>
				 ----------------------------------------------------------------- <br>

				<%    StackTraceElement[] ste = err_obj.getStackTrace();
					for( int i=0; i< ste.length ; i++)
					{
				%>					
					 <font size="1">
					  <%= ste[i] %> <br>
					 </font>
				<%
					}
				%>
				 ----------------------------------------------------------------- <br>
				<!-- KSY 2005.01.11>> -->
</body>
</html>