////////////////////////////////////////////////////////////
// 프로그램ID : md_04080_transRouteCost_reg.js
// 프로그램명 : 수송Route 기준정보 (등록)
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
// 1.0        2008-07-28  허준성     md_04080_transRouteCost_reg.js 개발
//
//
////////////////////////////////////////////////////////////

// 이전화면으로 이동
function moveBack() {
	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_04080_transRouteCost_list";
	urlStr += "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
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

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
		
}

// input box 를 View Mode 로 변환
// onFocusOut
function setViewMode( objBox ) {
	
	// select box 인 경우, value 가 아니라 TEXT 를 표시해 줘야 함
	if( objBox.tagName.toUpperCase() == "SELECT" ) {
		if( objBox.value == "" || objBox.value == null ) {
			var strVal = objBox.value;
		}
		else {
			var strVal = objBox.options[objBox.selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	else {
		var strVal = objBox.value;
		var objTd = objBox.parentNode;
	}
	
	// 기본재고상차BOX, 추가재고상차BOX, 생산상차BOX 입력창인 경우, 숫자 체크 & 천단위 구분자 표시
	if( objBox.name == "pallet_cost" ) {
		if( strVal != "" && strVal != null ) {
			// 숫자 체크
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "숫자만 입력하여 주세요.");
				setEditMode( objTd );
				return;
			}
			// 형식이 맞는 경우 천단위 구분자 표시
			else {
				strVal = objBox.value;
				objBox.value = numberFormat( strVal );
				strVal = objBox.value;
			}
		}
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
	objTd.onclick = function() { setEditMode(this); };
	
}


// 코드 그룹 중복 체크
function checkDup() {
	
	var tgt_loc = document.frm.tgt_loc.value; //입고장 코드
	var src_loc = document.frm.src_loc.value; //출고장 코드
	var checkKey = src_loc+"!%!"+tgt_loc;
	
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("입고장을 선택하세요.");
		return;
	}
	else if( src_loc == "" || src_loc == null ) {
		alert("출고장을 선택하세요.");
		return;
	}
	else {
		commonUtil.checkKeyValue(checkKey, "loc_dup_check_in_dc_dtl_trans_cost", checkDupDo);
	}
	
}

// 코드 그룹 중복 체크 결과
function checkDupDo(checkResult) {
	
	if( Number(checkResult) > 0 ) {
		alert("이미 등록되어 있습니다. 다른 출고장, 입고장을 선택하여 주십시요.");
		return;
	}
	else {
		alert("등록 가능한 입고장 출고장 입니다.");
		// checkDupFlag 에 cd_grp 값 넣음
		// checkDupFlag == cd_grp 로 중복체크 여부 확인
		document.frm.checkDupFlag.value = document.frm.tgt_loc.value;
	}
	
}

var objTdG;

// chkDupCd() 에서 setTimeout 에 실행되는 함수
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// 저장
function GoSave( service ) {
	
	// 입고장 입력 체크
	if( document.frm.tgt_loc.value == "" || document.frm.tgt_loc.value == null ) {
		alert("입고장을 선택하세요.");
		return;
	}
	
	// 출고장 입력 체크
	if( document.frm.src_loc.value == "" || document.frm.src_loc.value == null ) {
		alert("출고장을 선택하세요.");
		return;
	}
	
	// 코드 그룹 중복 체크 여부 확인
	if( document.frm.checkDupFlag.value != document.frm.tgt_loc.value ) {
		alert("중복 체크를 해 주십시요.");
		return;
	}
	
	if( document.frm.pallet_cost.value == "" || document.frm.pallet_cost.value == null ) {
		alert("운송비를 입력하세요.");
		return;
	}
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// 숫자 input box 에 문자 check 
// parameter : obj - inbox object , type - default value 또는 소수점 check 유뮤 등의 type 정의 
// type - BLANK : 사용자가 잘못된 값을 입력했을 때 default value 를 공백으로 반환, 소수점 허용
//        ZERO : 사용자가 잘못된 값을 입력했을 때 default value 를 0 으로 반환, 소수점 허용 
//        BLANK_INT : 사용자가 잘못된 값을 입력했을 때 default value 를 공백으로 반환, 소수점은 error 처리( only integer ) 
//        ZERO_INT : 사용자가 잘못된 값을 입력했을 때 default value 를 0 으로 반환, 소수점은 error 처리( only integer ) 
//        BLANK_INT_UP : 사용자가 잘못된 값을 입력했을 때 default value 를 공백으로 반환, 음수 & 소수점은 error 처리( only plus integer ) 
//        ZERO_INT_UP : 사용자가 잘못된 값을 입력했을 때 default value 를 0 으로 반환, 음수 & 소수점은 error 처리( only plus integer ) 
//        ** type parameter 가 없으면 ZERO(default=0, 소숫점 허용) 와 같음 
function checkNum(obj, type) {

	var i, ch;
	var pointCheck = 0;
	var defaultVal = "0"; 
	var alertMsg = "숫자만 입력하여 주세요.";
	var checkType = "POINT"; 
	
	// default value 는 공백 
	if( type == "BLANK" || type == "BLANK_INT" || type == "BLANK_INT_UP" ) 
		defaultVal = ""; 
	
	// 소수점 허용하지 않음 
	if( type == "BLANK_INT" || type == "ZERO_INT" || type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
	{ 
		if( type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
			alertMsg = "자연수만 입력하여 주세요."; 
		else 
			alertMsg = "정수만 입력하여 주세요."; 
		checkType = "INT"; 
		pointCheck = 1; 
	} 
	
	var checkValue = delComma(obj.value).trim();

	if( defaultVal == "0" && ( checkValue == null || checkValue == "" ) )
	{
		//objSetting(obj, defaultVal, alertMsg);
		return false;
	}
	
	for (i=0; i < checkValue.length; i++) {
		
		ch = checkValue.charAt(i);
		
		// invalid value 
		if(ch==" ")
		{ 
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
		
		// valid value
		else if ( ( ch >= 0 && ch <= 9 ) ) 
		{ }
		
		// point check 
		else if ( ch == '.' ) 
		{
			pointCheck += 1;
			// invalid value 
			if ( pointCheck > 1 )
			{
				//objSetting(obj, defaultVal, alertMsg); 
				return false;
			} 
		} 
		
		// valid value : minus sign 
		else if ( i == 0 && ch == '-' && type != "BLANK_INT_UP" && type != "ZERO_INT_UP" ) 
		{ } 
		
		// invalid value 
		else 
		{
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
	}
	
	obj.value = checkValue; 
	return true;
	
}


// HTML Grid 화면 resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
	var topLineHeightValue = topLeft.style.height.split("px")[0]; 
	
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
	
	var tabWidthValue = Number(maxWidthValue) - 15;
	var tableWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 39;
	var displayWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 20;
	
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
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	//mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px";
	//tbMain.width = tableWidthValue + "px"; 
	//topLine.style.width = topLineWidthValue + "px"; 
	//mainDisplay.style.width = displayWidthValue + "px";
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}
