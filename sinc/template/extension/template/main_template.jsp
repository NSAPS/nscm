<%@ page contentType="text/html;charset=MS949" %>
<%@ page import="org.apache.velocity.app.Velocity" %>
<%@include file ="/sinc/template/extension/skin/skin.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ page import="java.util.*"%>
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
	String moon_refresh_detect = (String)request.getAttribute("moon_refresh_detect");
	if(moon_refresh_detect == null || moon_refresh_detect.equals("")){
		moon_refresh_detect = "";
	}
%>
<body oncontextmenu="return <%=moon_refresh_detect%>" bgcolor="<%=body_bgcolor%>" leftmargin="5" rightmargin="10" topmargin="2">

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
						<%=request.getAttribute("_moon_navigation") %></td>
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
				<tr>
					<td height="*" valign="top">
						<%
							String main_path = (String)session.getAttribute("_moon_path") + "/" + (String)request.getAttribute("_moon_target") + ".vm";
							if(Velocity.templateExists(main_path) == true){
					    	%>
					    		<jsp:include page="<%=main_path%>" />
					    	<%        
					        	}else{
					        		String main_path_jsp = (String)session.getAttribute("_moon_path") + "/" + (String)request.getAttribute("_moon_target") + ".jsp";					        		
					    	%>
					    		<c:set var="include_url" value="${sessionScope._moon_path}/${requestScope._moon_target}.jsp"/>
							<c:import url="${include_url}" />
						<%	}%>
					</td>
				</tr>
			</table>
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

</body>
</html>