//��ȸ�� ��¥�� YYYY-MM-DD ->  YYYYMMDD�� ��ȯ
GoSearch = function(service) {
	
	//var	temp_in_cnfm_date = document.frm.in_cnfm_date.value;
	document.frm.start_date.value = delDateDelimiter(document.frm.start_date.value);
	
	var item_type				  = document.frm.item_type.value;
	var	search_type 			  = document.frm.search_type.value; 	//	��ȸ����
	var	search_item 			  = document.frm.search_item.value; 	//ǰ���	
	//var in_act_type				  = document.frm.in_act_type.value;

	if( search_type == "" || search_type == null ) {
		alert("��ȸ������ �����Ͻʽÿ�!");
		document.frm.search_type.select();
		return;
	}
	
	viewWait();// ��ȸ�� WAITING �̹��� �����ֱ�
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
	//	alert("����� ������ ���� ���� �ؾ� �մϴ�.");
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


