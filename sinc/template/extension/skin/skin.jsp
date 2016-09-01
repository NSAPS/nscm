<%--@ page pageEncoding="MS949" --%>
<%@ page pageEncoding="euc-kr" %>

<%
	String moon_skin = (String)session.getAttribute("_moon_skin");
	
	// ±âº» °ª basic
	String body_bgcolor = "#d4d0c8";
	int font_size = 9;
	int font_size_up = font_size + 1;
	int font_size_dw = font_size - 1;
	String font_family = "µ¸¿ò,µ¸¿òÃ¼,»õ±¼¸²,±¼¸²,±¼¸²Ã¼,Helvetica,Verdana";
	
	//## Main TemplateÀÇ Skin
	//##GRADIENT##
	String gradient_start = "#172C65";
	String gradient_middle = "#A0CBEE";
	String gradient_end = "#d4d0c8";
	
	//##TOOLBAR&SEARCH##
	String toolbar_bgcolor = "#edebe6";
	String search_bgcolor = "#edebe6";
	String main_bgcolor = "#FFFFFF";
	String open_close = "#bcbab8";
	
	//## Head TemplateÀÇ Skin
	String head_bgcolor = "#006699";
	
	//## Left Body TemplateÀÇ Skin
	String left_bgcolor = "#FFFFFF";
	
	//## Toolbar Button ÀÇ Skin
	String toolbar_btn_bgcolor = "#edebe6";
	String toolbar_btn2_bgcolor = "#9AACC3";
	
	if(moon_skin != null && moon_skin.equals("green")){
		//## °øÅë TemplateÀÇ Skin
		body_bgcolor = "#D7E4D9";
		font_size = 9;
		font_size_up = font_size + 1;
		font_size_dw = font_size - 1;
		font_family = "µ¸¿ò,µ¸¿òÃ¼,»õ±¼¸²,±¼¸²,±¼¸²Ã¼,Helvetica,Verdana";
		
		//## Main TemplateÀÇ Skin
		//##GRADIENT##
		gradient_start = "#2D402F";
		gradient_middle = "#66846A";
		gradient_end = "#D7E4D9";
		
		//##TOOLBAR&SEARCH##
		toolbar_bgcolor = "#CAD7CC";
		search_bgcolor = "#E8EFE9";
		main_bgcolor = "#FFFFFF";
		open_close = "#A8B8AA";
		
		//## Head TemplateÀÇ Skin
		head_bgcolor = "#263829";
		
		//## Left Body TemplateÀÇ Skin
		left_bgcolor = "#FDFDFE";
		
		//## Toolbar Button ÀÇ Skin
		toolbar_btn_bgcolor = "#CAD7CC";
		toolbar_btn2_bgcolor = "#8EAA9A";
		
	}else if(moon_skin != null && moon_skin.equals("violet")){
		// °øÅë TemplateÀÇ Skin
		body_bgcolor = "#B9B8C4";
		font_size = 9;
		font_size_up = font_size + 1;
		font_size_dw = font_size - 1;
		font_family = "µ¸¿ò,µ¸¿òÃ¼,»õ±¼¸²,±¼¸²,±¼¸²Ã¼,Helvetica,Verdana";
		
		//## Main TemplateÀÇ Skin
		//	##GRADIENT##
		gradient_start = "#303451";
		gradient_middle = "#4B3171";
		gradient_end = "#B9B8C4";
		
		//	##TOOLBAR&SEARCH##
		toolbar_bgcolor = "#DFDFE7";
		search_bgcolor = "#F4F3F8";
		main_bgcolor = "#FFFFFF";
		open_close = "#A39FBA";
		
		//## Head TemplateÀÇ Skin
		head_bgcolor = "#3B2F53";
		
		//## Left Body TemplateÀÇ Skin
		left_bgcolor = "#FDFDFE";
		
		//## Toolbar Button ÀÇ Skin
		toolbar_btn_bgcolor = "#DFDFE7";
		toolbar_btn2_bgcolor = "#A8A6C3";		
	}
%>

<%@ taglib uri="http://jakarta.apache.org/taglibs/veltag-1.0" prefix="vel" %>
<vel:velocity>
#set($body_bgcolor = "#B9B8C4")			
#set($font_size = 9)
#set($font_size_up = $font_size + 1)
#set($font_size_dw = $font_size - 1)
#set($font_family = "µ¸¿ò,µ¸¿òÃ¼,»õ±¼¸²,±¼¸²,±¼¸²Ã¼,Helvetica,Verdana")

#set($gradient_start = "#303451")
#set($gradient_middle = "#4B3171")
#set($gradient_end = "#B9B8C4")
#set($toolbar_bgcolor = "#DFDFE7")
#set($search_bgcolor = "#F4F3F8")
#set($main_bgcolor = "#FFFFFF")
#set($open_close = "#A39FBA")

#set($head_bgcolor = "#3B2F53")

#set($left_bgcolor = "#FDFDFE")

#set($toolbar_btn_bgcolor = "#DFDFE7")
#set($toolbar_btn2_bgcolor = "#A8A6C3")
</vel:velocity>
