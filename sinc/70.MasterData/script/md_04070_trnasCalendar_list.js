////////////////////////////////////////////////////////////
// 프로그램ID : md_04070_trnasCalendar_list.js
// 프로그램명 : 물류 Calendar정보
// 개발자  : 이동주
// 개발일자 : 2008-07-28 월요일
//
//관련 job file : job_sinc_70_masterData_00.xml
//
//관련 query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-07-28  이동주     md_04070_trnasCalendar_list.js 개발
//
//
////////////////////////////////////////////////////////////

//전역변수 선언
var objTdG;


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
function setViewMode( objBox ) {	
	
	var strVal = objBox.value;
	var objName = objBox.name;
	

	
	
	// select box 인 경우, value 가 아니라 TEXT 를 표시해 줘야 함
	if( objBox.tagName.toUpperCase() == "SELECT" ) {
		if( objBox.value == "" || objBox.value == null ) {
			strVal = objBox.value;
		}
		else {
			strVal = objBox.options[objBox.selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	else {
		strVal = objBox.value;
		var objTd = objBox.parentNode;
	}
	
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";	

	
	// input box 를 View Mode 로 변환
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";

	
/*
 	// 확정구간일수, 버켓단위1 구간, 버켓단위1 구간 입력창인 경우, 숫자 체크
	if( objBox.name == "time_fence" || objBox.name == "bckt1_horzn" || objBox.name == "bckt2_horzn" ) {
		if( strVal != "" && strVal != null ) {
			// 숫자 체크, BLANK_INT : DEFAULT 공백, 소수점 불가
			if( checkNum(objBox, "BLANK_INT") == false ) {
				setEditMode( objTd );
				return;
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
*/
	
}



// setTimeout 에 실행되는 함수
function setEditModeTime() {
	
	setEditMode( objTdG );
		
}

