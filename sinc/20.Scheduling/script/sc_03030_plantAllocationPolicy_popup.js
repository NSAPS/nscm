
// 클릭한 라인 인덱스
var clickedLineIdx = null;

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
		
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	// 배분율, 최소 분배량 입력창인 경우, 숫자 체크
	if( objBox.name == "alloc_rate" || objBox.name == "min_qty" ) {
		if( strVal != "" && strVal != null ) {
			// 숫자 체크
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "숫자만 입력하여 주세요.");
				setEditMode( objBox.parentNode );
				return;
			}			
		}		
	}
	
	if( objBox.parentNode.align.toUpperCase() == "CENTER" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal;
	}
	else if( objBox.parentNode.align.toUpperCase() == "RIGHT" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;";
	}
	else {
		objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	}
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
		
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

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	} 
	else { 
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			left_tbody.rows.style.backgroundColor = "#ffffff";
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	}
	
}

// 저장
function GoSave( service ) {
	
	var tableLen = left_tbody.rows.length;
		
	// 배분율의 합계가 100인지 체크
	var rateTot = 0;
	var i = 0;
	while( i < tableLen ) {
		if( document.frm.alloc_rate[0].value ) {
			if( document.frm.alloc_rate[i].value == null || document.frm.alloc_rate[i].value == "" ) {
				alert("배분율을 모두 입력해야 합니다.");
				return;
			}
			else {
				rateTot += Number(document.frm.alloc_rate[i].value);
				i++;
			}
		}
		else {
			if( document.frm.alloc_rate.value == null || document.frm.alloc_rate.value == "" ) {
				alert("배분율을 모두 입력해야 합니다.");
				return;
			}
			else {
				rateTot += Number(document.frm.alloc_rate.value);
			}
		}
	}
	if( rateTot != 100 ) {
		alert("배분율이 100이 넘거나 부족합니다.");
		if( left_tbody.rows[0] ) {
			objTdG = left_tbody.rows[0].cells[1];
		}
		else {
			objTdG = left_tbody.rows.cells[1];
		}
		setTimeout(setEditModeTime, 1);
		return;
	}
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
	opener.GoSearch("sc_03030_plantAllocationPolicy_list");
	
	this.focus();
}

// 셀 저장 전역변수
var objTdG;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = left_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// 배분율 --> 최소할당배분율
		if( objName == "alloc_rate" ) {
			if( left_tbody.rows[rowIdx] ) {
				objTdG = left_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = left_tbody.rows.cells[2];
			}
		}
		// 
		else if( objName == "min_qty" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				if( left_tbody.rows[0] ) {
					objTdG = left_tbody.rows[0].cells[1];
				}
				else {
					objTdG = left_tbody.rows.cells[1];
				}
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				if( left_tbody.rows[rowIdx] ) {
					objTdG = left_tbody.rows[rowIdx+1].cells[1];
				}
				else {
					objTdG = left_tbody.rows.cells[1];
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
	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px"; 
	tbMain.width = tableWidthValue + "px"; 
	topLine.style.width = topLineWidthValue + "px"; 
	mainDisplay.style.width = displayWidthValue + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
} 