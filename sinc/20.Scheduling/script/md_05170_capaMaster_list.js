////////////////////////////////////////////////////////////
// 프로그램ID : md_05170_capaMaster_list.js
// 프로그램명 : Capacity 기준정보 (조회)
// 개발자  : 허준성
// 개발일자 : 2008-11-25 화요일
//
//관련 job file : job_sinc_20_scheduling_04.xml
//
//관련 query file : query_sinc_20_scheduling_04.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-11-25  허준성     md_05170_capaMaster_list.js 개발
//
//
////////////////////////////////////////////////////////////

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee";
		main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		
		document.frm.v_item_id[rowIdx].style.backgroundColor = "#eeeeee"; 
		document.frm.v_item_name[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.line_name[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.proc_name[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.erp_std_time[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.conv_qty[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.qty_uom[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.std_time[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.qty[rowIdx].style.backgroundColor = "#eeeeee";
	} 
	else {
		left_tbody.rows.style.backgroundColor = "#eeeeee";  
		main_tbody.rows.style.backgroundColor = "#eeeeee"; 
		
		document.frm.v_item_id[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.v_item_name[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.line_name[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.proc_name[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.erp_std_time[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.conv_qty[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.qty_uom[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.std_time[rowIdx].style.backgroundColor = "#eeeeee";
		document.frm.qty[rowIdx].style.backgroundColor = "#eeeeee";
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		
		document.frm.v_item_id[rowIdx].style.backgroundColor = "#ffffff"; 
		document.frm.v_item_name[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.line_name[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.proc_name[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.erp_std_time[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.conv_qty[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.qty_uom[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.std_time[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.qty[rowIdx].style.backgroundColor = "#ffffff";
	} 
	else { 
		left_tbody.rows.style.backgroundColor = "#ffffff";
		main_tbody.rows.style.backgroundColor = "#ffffff";
		
		document.frm.v_item_id[rowIdx].style.backgroundColor = "#ffffff"; 
		document.frm.v_item_name[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.line_name[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.proc_name[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.erp_std_time[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.conv_qty[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.qty_uom[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.std_time[rowIdx].style.backgroundColor = "#ffffff";
		document.frm.qty[rowIdx].style.backgroundColor = "#ffffff";
	}
	
}

// 검색
function GoSearch(service) {
	
	// 공장
	var plant = document.frm.selected_plant.value;
	if( plant == "" || plant == null ) {
		alert("공장을 선택하세요.");
		return;
	}
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1";
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// 저장
function GoSave( service ) {
	
	viewWait();
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// enter check 용 
function enterCheck(frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			// 자기화면 갱신
			getItemNameSearch(document.frm.item_id, frm_name);
			//GoSearch(frm_name);
		}
	} 
	
}

// 제품 검색 popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}

// 제품 입력창에 입력한 값과 일치하는 제품 검사 후, 일치하는 제품이 있으면 제품 코드, 제품 명 표시
function getItemNameSearch(objBox, service) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else {
				document.frm.item_name.value = "";
			}
			GoSearch(service);
		}
	});
	
}

// 제품 입력창에 입력한 값과 일치하는 제품 검사 후, 일치하는 제품이 있으면 제품 코드, 제품 명 표시
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
				document.frm.item_name.value = arrList[0][1];
			}
			else {
				document.frm.item_name.value = "";
			}
		}
	});
	
}

function setFormatQty(obj){
	if(obj.value == ""){
		
	}
	else{
		var qty = strToNum(obj.value);
		obj.value = numberFormat(qty);
	}
}