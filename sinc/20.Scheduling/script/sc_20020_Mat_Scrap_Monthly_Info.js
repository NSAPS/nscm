/*
// 제품 검색 POPUP
function openItemSearchPop( obj ) { 
		
	var service_url = "service.do?_moon_service=item_search_popup_for_order";
	service_url += "&_moon_perpage=100&_moon_pagenumber=1";
	
	if(document.frm.selected_item.value != "" && document.frm.selected_item.value != null ){		
		service_url += "&code_input=" + document.frm.selected_item.value;
	}
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "item_Search", pop_win_style);
	newWin.focus();
	
}*/

function	createMonthlyScrapData(){

	if(confirm("선택한 기간의 데이터를 생성 또는 갱신하겠습니까?") == 1 ) {

		document.frm.save_flag.value = 'Y';

		// 조회시 WAITING 이미지 보여주기
		viewWait();
		document.frm._moon_service.value = "sc_20020_SP_IP_MAT_SCRAP_MONTHLY_comp"; 
		document.frm._moon_pagenumber.value = "1"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}

}

// 수정화면으로 이동
GoEdit = function() {

	var service		= "sc_20020_Mat_Scrap_Monthly_Info_mod";

	// 조회시 WAITING 이미지 보여주기
	viewWait();

	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();	
	
};