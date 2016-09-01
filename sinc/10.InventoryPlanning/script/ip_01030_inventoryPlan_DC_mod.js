// 더블 클릭 : 상세정보(하단 iframe)
function onclickfunc(obj, idx) {
	var dc_id 		= document.frm.dc_id[idx].value;
	var dc_name 	= document.frm.dc_name[idx].value;
	var search_item = document.frm.search_item.value;
	
	var urlStr = "service.do?_moon_service=ip_01030_inventoryPlan_DC_sub_mod";
	urlStr += "&dc_id=" + document.frm.dc_id[idx].value;
	urlStr += "&dc_name=" + document.frm.dc_name[idx].value; 
	urlStr += "&search_item=" + document.frm.search_item.value; 
	urlStr += "&_moon_pagenumber=1&_moon_perpage=-1"   // 리스트 전체  

	gridDetailInfo.location.href = urlStr; 
}

//iframe의 GoSave 함수 호출
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
	viewWait();// 조회시 WAITING 이미지 보여주기

	var service = "ip_01030_inventoryPlan_DC_mod";

	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm._moon_perpage.value = "500"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// HTML Grid 화면 resizing
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

	// -되는 table_h 의 값을 maxHeightValue 의 70%로 고정
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
	//iframe의 높이 설정 
	var gridDetailInfo = parseInt((maxHeightValue-mainDiplayHeightValue)-185);  
//	var gridDetailInfo = parseInt((maxHeightValue-mainDiplayHeightValue)-300);  
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
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
	//iframe의 높이 설정
	tbBottom.style.height = gridDetailInfo + "px"; 
	
}