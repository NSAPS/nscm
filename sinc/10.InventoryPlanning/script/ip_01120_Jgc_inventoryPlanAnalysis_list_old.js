//조회시 날짜를 YYYY-MM-DD ->  YYYYMMDD로 변환
GoSearch = function(service) {
	
	//var	temp_in_cnfm_date = document.frm.in_cnfm_date.value;
	document.frm.start_date.value = delDateDelimiter(document.frm.start_date.value);
	
	var item_type				  = document.frm.item_type.value;
	var	search_type 			  = document.frm.search_type.value; 	//	조회유형
	var	search_item 			  = document.frm.search_item.value; 	//품목명	
	//var in_act_type				  = document.frm.in_act_type.value;
	


	
	viewWait();// 조회시 WAITING 이미지 보여주기
	document.frm._moon_service.value 	= service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action 				= "service.do";
	document.frm.target 				= "_self";
	document.frm.submit();
	//doChange1(this, 0, 0);

	//document.frm.in_cnfm_date.value = temp_in_cnfm_date;
	
};

function excelDownload(){
	
	var service 		= "ip_01120_Jgc_inventoryPlanAnalysis_list_excelDown";
	var start_date 		= document.frm.start_date.value.replace(/-/g,"");
	
	
	var item_type		= document.frm.item_type.value;
	var	search_type 	= document.frm.search_type.value;
	var	search_item 	= document.frm.search_item.value;
	//var in_act_type		= document.frm.in_act_type.value;
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service
								+"&start_date="+start_date								
								+"&item_type="+item_type
								+"&search_type="+search_type
								+"&search_item="+search_item;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

function excelUpload(){
	
	var service 		= "ip_01120_Jgc_inventoryPlanAnalysis_list_excelUp";
	var start_date 		= document.frm.start_date.value.replace(/-/g,"");
	
	
	var item_type		= document.frm.item_type.value;
	var	search_type 	= document.frm.search_type.value;
	var	search_item 	= document.frm.search_item.value;
	//var in_act_type		= document.frm.in_act_type.value;
	
	//if( document.frm.plant_list.value == "" ){
	//	alert("공장과 버전을 먼저 선택 해야 합니다.");
	//	return;
	//}
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service
								+"&start_date="+start_date								
								+"&item_type="+item_type
								+"&search_type="+search_type
								+"&search_item="+search_item;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

function SummaryReport(){
	
	var start_date 		= document.frm.start_date.value.replace(/-/g,"");

	
	
	var service_url = "service.do?_moon_service=ip_01120_Jgc_inventoryPlanAnalysis_summaryReport";
	service_url += "&_moon_perpage=-1&amp;_moon_pagenumber=1";
	service_url += "&start_date=" + start_date; 
	var pop_win_style = "titlebar=yes, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=690, top=100, left=200";	
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();	
}

function SummaryReport2(){
	
	var start_date 		= document.frm.start_date.value.replace(/-/g,"");
	var gubn			= '1';	
	
	var service_url = "service.do?_moon_service=ip_01120_Jgc_inventoryPlanAnalysis_summaryReport_new";
	service_url += "&_moon_perpage=-1&amp;_moon_pagenumber=1";
	service_url += "&start_date=" + start_date + "&gubn=" + gubn; 
	var pop_win_style = "titlebar=yes, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=895, height=640, top=100, left=200";	
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();	
}


function RegisterItem(){
	
	var service_url = "service.do?_moon_service=ip_01120_Jgc_inventoryPlanAnalysis_list_reg";
	service_url +="&_moon_perpage=-1&_moon_pagenumber=1";
	//service_url += "&start_date=" + start_date; 
	var pop_win_style = "titlebar=yes, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=400, top=200, left=200";	
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();	
}

