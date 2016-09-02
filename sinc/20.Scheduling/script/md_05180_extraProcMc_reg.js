////////////////////////////////////////////////////////////
// 프로그램ID : md_05180_extraProcMc_reg.js
// 프로그램명 : 설비정보 관리 (등록)
// 개발자  : 허준성
// 개발일자 : 2008-12-01 월요일
//
//관련 job file : job_sinc_20_scheduling_04.xml
//
//관련 query file : query_sinc_20_scheduling_04.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-12-01  허준성     md_05180_extraProcMc_reg.js 개발
//
//
////////////////////////////////////////////////////////////

// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
var popImgIdx = null;


// 이전화면으로 이동
function moveBack() {
	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	var selected_plant = document.frm.selected_plant.value;
	
	var urlStr = "service.do?_moon_service=md_05180_extraProcMc_list";
	urlStr += "&selected_plant=" + selected_plant;
	urlStr += "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
}

// popup 조회 이미지 mouseOver
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup 조회 이미지 mouseOut
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
function outImg( objImg ) {
	
	popImgIdx = null;
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
	document.frm.item_id.select();
	
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

/**
 * 입력받을 수 있는 값을 필터링한다.
 * ex : <input type="text" ..... onkeypress="filterKey('[0-9]')"> ; 숫자만 키입력이 가능한 text filed
 * ex : <input type="text" ..... onkeypress="filterKey('[0-9a-zA-Z]')"> ; 영문,숫자만 키입력이 가능한 text filed
 * @param filter : 필터링할 정규표현식 ex) '[0-9]':0~9의 값만 허용, '[a-zA-Z]':알파벳만 허용
 * @browser IE6, NS7
 */
function filterKey(filter) {
  if(filter){
      var sKey = String.fromCharCode(event.keyCode);
      var re = new RegExp(filter);
      if(!re.test(sKey)) event.returnValue=false;
  }
} 

// 코드 그룹 중복 체크
function checkDup() {
	
	var plant = document.frm.selected_plant.value; //공장 코드
	var item_id = document.frm.item_id.value; //제품 코드
	var checkKey = plant+"!%!"+item_id;
	
	if( plant == "" || plant == null ) {
		alert("공장을 선택하세요.");
		return;
	}
	else if( item_id == "" || item_id == null ) {
		alert("제품코드를 입력하세요.");
		return;
	}
	else {
		commonUtil.checkKeyValue(checkKey, "item_id_dup_check_in_item_capa", checkDupDo);
	}
	
}

// 코드 그룹 중복 체크 결과
function checkDupDo(checkResult) {

	if( Number(checkResult) > 0 ) {
		alert("이미 등록되어 있습니다. 다른 제품코드를 입력해 주십시요. ");
		document.frm.v_item_id.value = "";
		document.frm.v_item_name.value = "";
		document.frm.checkDupFlag.value = "";
		return;
	}
	else {
		alert("등록 가능한 제품코드 입니다.");
		// checkDupFlag 에 cd_grp 값 넣음
		// checkDupFlag == cd_grp 로 중복체크 여부 확인
		document.frm.v_item_id.value = document.frm.item_id.value;
		document.frm.v_item_name.value = document.frm.item_name.value;
		document.frm.checkDupFlag.value = document.frm.item_id.value;
	}
	
}

// 저장
function GoSave( service ) {
			
	if(document.frm.selected_plant.value == "" || document.frm.selected_plant.value == null){
		alert("공장을 선택하세요!");
		return;
	}
	
	if(document.frm.item_id.value == "" || document.frm.item_id.value == null){
		alert("제품코드를 입력하세요!");
		return;
	}
	
	if(document.frm.v_line_id.value == "" || document.frm.v_line_id.value == null){
		alert("라인을 선택하세요!");
		return;
	}
	
	if(document.frm.v_proc_id.value == "" || document.frm.v_proc_id.value == null){
		alert("작업장을 선택하세요!");
		return;
	}
	
	if(document.frm.mc_kind.value == "" || document.frm.mc_kind.value == null){
		alert("MC KIND를 선택하세요!");
		return;
	}
	
	if(document.frm.mc_qty.value == "" || document.frm.mc_qty.value == null){
		alert("MC QTY를 입력하세요!");
		return;
	}
	
	if(!confirm("저장하시겠습니까?"))
		return;
		
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// 사용자 직접 입력값으로부터 제품정보 조회
// 제품 코드, 제품 명 둘 중 하나라도 일치하는 데이터 검색
function getItemInfo( obj ) {
	
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	
	if( document.frm.item_id[rowIdx] ) {
		var dc_id = document.frm.src_loc[rowIdx].value;
		var objItemId = document.frm.item_id[rowIdx];
		var objItemName = document.frm.item_name[rowIdx];
		var objDivItemId = divItemId[rowIdx];
		var objDivItemName = divItemName[rowIdx];
		var objBoxPerPalet = document.frm.box_per_palet[rowIdx];
	}
	else {
		var dc_id = document.frm.src_loc.value;
		var objItemId = document.frm.item_id;
		var objItemName = document.frm.item_name;
		var objDivItemId = divItemId;
		var objDivItemName = divItemName;
		var objBoxPerPalet = document.frm.box_per_palet;
	}
	
	var input_value = objItemId.value.trim();
	objItemId.value = input_value;
	
	// 출고장 또는 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( dc_id == "" || dc_id == null ) {
		alert("출고장을 먼저 선택하세요.");
		objItemId.value = "";
		objDivItemId.innerHTML = "";
		objItemName.value = "";
		objDivItemName.innerHTML = "";
		objBoxPerPalet.value = "";
		return;
	}
	
	// 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( input_value == null || input_value == "" ) {
		objItemId.value = "";
		objDivItemId.innerHTML = "";
		objItemName.value = "";
		objDivItemName.innerHTML = "";
		objBoxPerPalet.value = "";
		return;
	}
	
	replenishPlan.getItemInfo(dc_id, input_value, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// 일치하는 결과 없음
			if( arrList.length == 0 ) {
				objItemId.value = "";
				objDivItemId.innerHTML = "";
				objItemName.value = "";
				objDivItemName.innerHTML = "";
				objBoxPerPalet.value = "";
				openItemSearchPop(objItemId);
			}
			// 일치하는 결과 1개
			else if( arrList.length == 1 ) {
				objItemId.value = arrList[0][0];
				objDivItemId.innerHTML = arrList[0][0];
				objItemName.value = arrList[0][1];
				objDivItemName.innerHTML = "&nbsp;" + arrList[0][1];
				objBoxPerPalet.value = arrList[0][2];
			}
			else {
				openItemSearchPop(objItemId);
				objItemId.value = "";
				objDivItemId.innerHTML = "";
				objItemName.value = "";
				objDivItemName.innerHTML = "";
				objBoxPerPalet.value = "";
			}
		}
	});
	
}

// input box 를 Edit Mode 로 변환
// onClick
function setEditMode( objTd ) {
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}	
	
	objTd.childNodes(0).style.display = "none";		
	objTd.childNodes(1).style.display = "block";
		
	if( objTd.childNodes(1).tagName.toUpperCase() == "SELECT") { // 공장, 라인, 작업장 반영 여부 셀 
					                      
		objTd.childNodes(1).focus();
	}
	else if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "INPUT"){ // 제품 코드 셀
		objTd.childNodes(1).childNodes(0).select(); // focus()이면, item search popup 창이 부모창 뒤에 위치함.
	}
	else {// 공장, 라인, 작업장 셀		
		objTd.childNodes(1).childNodes(0).focus();
	}			
		
}

// input box 를 View Mode 로 변환
// onFocusOut
function setViewMode( objBox ) {
	
	// 제품코드 검색 셀인경우
	if( objBox.name == "item_id" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		}
	}
	// select box 인 경우, value 가 아니라 TEXT 를 표시해 줘야 함
	else if( objBox.tagName.toUpperCase() == "SELECT" ) {
		if( objBox.value == "" || objBox.value == null ) {
			var strVal = objBox.value;
		}
		else {
			var strVal = objBox.options[objBox.selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	// 라인, 작업장 select box 인 경우, value 가 아니라 TEXT 를 표시해 줘야 함
	else if( objBox.tagName.toUpperCase() == "A" ) {
		if( objBox.childNodes(0).value == "" || objBox.childNodes(0).value == null ) {
			var strVal = objBox.childNodes(0).value;
		}
		else {
			var strVal = objBox.childNodes(0).options[objBox.childNodes(0).selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	else {
		var strVal = objBox.value;
		var objTd = objBox.parentNode;
	}
	
	if( objTd.align.toUpperCase() == "CENTER" ) {
		objTd.childNodes(0).innerHTML = strVal;
	}
	else if( objTd.align.toUpperCase() == "RIGHT" ) {
		objTd.childNodes(0).innerHTML = strVal + "&nbsp;";
	}
	else {
		objTd.childNodes(0).innerHTML = "&nbsp;" + strVal;
	}
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";
	//objTd.onclick = function() { setEditMode(this); };
	
}
