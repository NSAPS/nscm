// 제품 검색 POPUP
function openDCAllocationItemPopup( obj ) { 	
	
	var	in_work_date = delDateDelimiter(document.frm.in_work_date.value); 	//작업일자		
	var	in_date_term = "3"; 					//조회기간	
	var	in_term_cnt	 = "0"; 												//조회일자	

	if( in_work_date == "" || in_work_date == null ) {
		alert("작업일자를 입력하십시요!");
		document.frm.in_work_date.focus();
		return;
	} 

	var service_url = "service.do?_moon_service=ip_02030_dcAllocationItem_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_work_date=" + in_work_date +"&in_date_term=" + in_date_term+"&in_term_cnt=" + in_term_cnt;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Item_Search", pop_win_style);
	newWin.focus();

}

// 배정 특별입력(주출고장 없는 곳)
function openAllocETC_popup() { 	

	var	in_work_date = delDateDelimiter(document.frm.in_work_date.value); 	//작업일자		
	var	in_alloc_item = document.frm.in_alloc_item.value; 	//품목		
	var	in_alloc_item_name = document.frm.in_alloc_item_name.value; 	//품목명		

	if( in_work_date == "" || in_work_date == null ) {
		alert("작업일자를 입력하십시요!");
		document.frm.in_work_date.focus();
		return;
	} 
	if( in_alloc_item == "" || in_alloc_item == null ) {
		alert("품목을 입력하십시요!");
		document.frm.in_alloc_item.focus();
		return;
	} 
	var window_left = Number(screen.width -document.body.clientHeight)/2;
	var window_top = Number(screen.height -document.body.clientWidth)/2;

	var service_url = "service.do?_moon_service=ip_02040_SalesAllocation_etc_ADD_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_work_date=" + in_work_date +"&in_alloc_item=" + in_alloc_item +"&in_alloc_item_name=" + in_alloc_item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=100, " +
						"top="+ window_top + ", left="+window_left;
	var newWin = window.open(service_url, "ip_02040_SalesAllocation_etc_ADD_popup", pop_win_style);
	newWin.focus();
	
}

// 조회 시 waiting 이미지 보여주기
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}

	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.in_alloc_item_name.value = arrList[0][1];
				document.frm.item_name.value = arrList[0][1];
				document.frm.in_alloc_reason_comment.value = "";
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
}

// enter check 용 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// 자기화면 갱신
	//		GoSearch();
		}
	} 
}

// 조회
GoSearch = function() {

	// 조회시 WAITING 이미지 보여주기
	viewWait();

	document.frm._moon_service.value = "ip_02040_SalesAllocation_list"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();	
	
};

// 조회
GoEdit = function() {

	var in_work_date = document.frm.in_work_date.value;
	var in_alloc_item = document.frm.in_alloc_item.value;
	var in_alloc_item_name = document.frm.in_alloc_item_name.value;

	var urlStr = "service.do?_moon_service=ip_02040_SalesAllocation_mod";
	urlStr += "&in_work_date=" + in_work_date + "&in_alloc_item=" + in_alloc_item + "&item_name=" + in_alloc_item_name;

	// 조회시 WAITING 이미지 보여주기
	viewWait();

	location.href = urlStr;
	
};

// 조회 시 waiting 이미지 보여주기
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			gridArea2.style.display = "none";
			waitArea.style.display = "block";
			waitArea2.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			gridArea2.style.display = "block";
			waitArea.style.display = "none";
			waitArea2.style.display = "none";
		}
	}
	
}

// Grid 화면 resizing 
// tab_h : tab height ( 실제 tab 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 tab 높이가 커짐 ) 
// table_h : table height ( 실제 table 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 table 높이가 커짐 ) 
function setGridAutoResize2( tab_h, table_h ){
	
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
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
	} 
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tabPage2.style.height = tabHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	document.grid2.height = tableHeightValue + "px"; 
	
} 
