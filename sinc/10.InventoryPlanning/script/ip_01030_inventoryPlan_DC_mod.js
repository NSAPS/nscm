// ���� Ŭ�� : ������(�ϴ� iframe)
function onclickfunc(obj, idx) {
	var dc_id 		= document.frm.dc_id[idx].value;
	var dc_name 	= document.frm.dc_name[idx].value;
	var search_item = document.frm.search_item.value;
	
	var urlStr = "service.do?_moon_service=ip_01030_inventoryPlan_DC_sub_mod";
	urlStr += "&dc_id=" + document.frm.dc_id[idx].value;
	urlStr += "&dc_name=" + document.frm.dc_name[idx].value; 
	urlStr += "&search_item=" + document.frm.search_item.value; 
	urlStr += "&_moon_pagenumber=1&_moon_perpage=-1"   // ����Ʈ ��ü  

	gridDetailInfo.location.href = urlStr; 
}

//iframe�� GoSave �Լ� ȣ��
GoSave = function(service) {

	gridDetailInfo.GoSave("ip_01030_inventoryPlan_DC_sub_save_comp");
};


GoSearch = function(service) {
	
	var search_type	= document.frm.search_type.value;
	var cdc_flag	= "";
	var cdc_flag	= "";

	if( search_type == "CDC"   ) {
		document.frm.cdc_flag.value = "Y";
	}
	if( search_type == "RDC"  ) {
		document.frm.rdc_flag.value = "Y";
	} 
	viewWait();// ��ȸ�� WAITING �̹��� �����ֱ�

	var service = "ip_01030_inventoryPlan_DC_mod";

	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm._moon_perpage.value = "500"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// HTML Grid ȭ�� resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
	var topLineHeightValue = topLine.style.height.split("px")[0]; 
	
	var maxWidthValue;
	var maxHeightValue;

	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 

	// -�Ǵ� table_h �� ���� maxHeightValue �� 70%�� ����
	var table_h	= parseInt(maxHeightValue*0.75); 

	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	var leftDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) - 17;
	var mainDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) ;

	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
		leftDiplayHeightValue += Number(search_h); 
		mainDiplayHeightValue += Number(search_h); 
	}
	
	var tableWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 37;
	var displayWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 20;
	//iframe�� ���� ���� 
	var gridDetailInfo = parseInt((maxHeightValue-mainDiplayHeightValue)-185);  
//	var gridDetailInfo = parseInt((maxHeightValue-mainDiplayHeightValue)-300);  
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1;  
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	if( leftDiplayHeightValue < 1 ) 
		leftDiplayHeightValue = 1; 
	if( mainDiplayHeightValue < 1 ) 
		mainDiplayHeightValue = 1; 
	
	if( tableWidthValue < 1 ) 
		tableWidthValue = 1; 
	if( topLineWidthValue < 1 )  
		topLineWidthValue = 1; 
	if( displayWidthValue < 1 ) 
		displayWidthValue = 1; 
	
	//tabPage1.style.height = tabHeightValue + "px"; 
	tbMain.style.height = tableHeightValue + "px"; 
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	tbMain.width = tableWidthValue + "px"; 
	topLine.style.width = topLineWidthValue + "px"; 
	mainDisplay.style.width = displayWidthValue + "px"; 
	//iframe�� ���� ����
	tbBottom.style.height = gridDetailInfo + "px"; 
	
}