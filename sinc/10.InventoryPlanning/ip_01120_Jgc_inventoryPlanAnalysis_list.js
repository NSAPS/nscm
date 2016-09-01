//조회시 날짜를 YYYY-MM-DD ->  YYYYMMDD로 변환
GoSearch = function(service) {
	
	//var	temp_in_cnfm_date = document.frm.in_cnfm_date.value;
	document.frm.start_date.value = delDateDelimiter(document.frm.start_date.value);
	
	var item_type				  = document.frm.item_type.value;
	var	search_type 			  = document.frm.search_type.value; 	//	조회유형
	var	search_item 			  = document.frm.search_item.value; 	//품목명	
	//var in_act_type				  = document.frm.in_act_type.value;

	if( search_type == "" || search_type == null ) {
		alert("조회유형을 선택하십시요!");
		document.frm.search_type.select();
		return;
	}
	
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


