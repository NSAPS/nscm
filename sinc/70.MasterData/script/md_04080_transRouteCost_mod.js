////////////////////////////////////////////////////////////
// 프로그램ID : md_04080_transRouteCost_mod.js
// 프로그램명 : 수송Route 기준정보 (수정)
// 개발자  : 허준성
// 개발일자 : 2008-07-28 월요일
//
//관련 job file : job_sinc_70_masterData_00.xml
//
//관련 query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-07-28  허준성     md_04080_transRouteCost_mod.js 개발
//
//
////////////////////////////////////////////////////////////

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

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 

	if( main_tbody.rows[obj.rowIndex] ) { 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
	} 
	else { 
		main_tbody.rows.style.backgroundColor = "#eeeeee"; 
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환
function bgOut( obj ) {
	
	if( main_tbody.rows[obj.rowIndex] ) { 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else { 
		main_tbody.rows.style.backgroundColor = "#ffffff"; 
	}
	
}

// 이전화면으로 이동
function moveBack() {
	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_04080_transRouteCost_list";
	urlStr += "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
}

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
		
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	var strVal = numberFormat(objBox.value);
	objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// 셀 저장 전역변수
var objTdG;

// chkDupCd() 에서 setTimeout 에 실행되는 함수
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// 저장
function GoSave( service ) {
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		
		// 위 운송비 --> 아래 운송비
		if( objName == "trans_cost" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = main_tbody.rows[0].cells[2];
				}
				else {
					objTdG = main_tbody.rows.cells[2];
				}
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[2];
				}
				else {
					objTdG = main_tbody.rows.cells[2];
				}
			}
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

// HTML Grid 화면 resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var mainWidthValue = mainDisplay.style.width.split("px")[0]; 
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
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	var leftDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) - 17; 
	var mainDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) ; 
	
	var search_h = document.frm.search_h.value; 
	//if( search_menu.style.display == "none" ) 
	//{ 
	//	tabHeightValue += Number(search_h); 
	//	tableHeightValue += Number(search_h); 
	//	leftDiplayHeightValue += Number(search_h); 
	//	mainDiplayHeightValue += Number(search_h); 
	//} 
	
	var tableWidthValue = Number(maxWidthValue) - Number(mainWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(mainWidthValue) - 39;
	var displayWidthValue = Number(maxWidthValue) - Number(mainWidthValue) - 20;
	
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
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tbMain.style.height = tableHeightValue + "px"; 
	//leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	//tbMain1.style.height = tableHeightValue + "px"; 
	//rightDisplay.style.height = leftDiplayHeightValue + "px";
	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px"; 
	//tbMain.width = tableWidthValue + "px"; 
	//topLeft.style.width = topLineWidthValue + "px"; 
	//leftDisplay.style.width = displayWidthValue + "px";
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px"; //하단 화면 테이블의 위치를 지정하기 위한 부분.
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}
