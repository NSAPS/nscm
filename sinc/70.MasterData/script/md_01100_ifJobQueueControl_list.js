//전역변수 선언
var objTdG;



// 수행시각(시간) 또는 수행시각(분) 에서 수행시각(시간) 또는 수행시각(분)을 수정하기 위해 수행시각 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
var runTimeNameFlag = null;
var runTimeIdxFlag = null;

// 수행시각 FLAG 설정
function setRunTimeFlag(objBox) {
	
	runTimeNameFlag = objBox.name;
	runTimeIdxFlag = objBox.parentNode.parentNode.parentNode.rowIndex;
	
}

// 수행시각 FLAG 해제
function unsetRunTimeFlag(objBox) {
	
	runTimeNameFlag = null;
	runTimeIdxFlag = null;
	
}

// focusing 할 수행시각 combo 표시 FLAG
var runTimeComboFlag = null;



// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {	
	
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}	

	objTd.childNodes(0).style.display = "none";	
	objTd.childNodes(1).style.display = "block";
	
	// 수행시각 셀인경우
	if( objTd.childNodes(1).tagName.toUpperCase() == "A" ) {
		if( runTimeComboFlag == "run_time_h" ) {
			objTd.childNodes(1).childNodes(0).focus();
		}
		else if( runTimeComboFlag == "run_time_m" ) {
			objTd.childNodes(1).childNodes(1).focus();
		}
		else {
			objTd.childNodes(1).childNodes(0).focus();
		}
		runTimeComboFlag = null;
	}
	else {
		objTd.childNodes(1).focus();
	}
	
	
	
		
}


// input box 를 View Mode 로 변환
function setViewMode( objBox ) {	
	
	// 수행시각 셀인 경우
	if( objBox.name == "run_time_h" ) {
		if( runTimeNameFlag == "run_time_m" && runTimeIdxFlag == objBox.parentNode.parentNode.parentNode.rowIndex ) {
			return;
		}
		else {
			var strVal = objBox.parentNode.childNodes(0).value + ":" + objBox.parentNode.childNodes(1).value;
			var objTd = objBox.parentNode.parentNode;
		}
	}
	else if( objBox.name == "run_time_m" ) {
		if( runTimeNameFlag == "run_time_h" && runTimeIdxFlag == objBox.parentNode.parentNode.parentNode.rowIndex ) {
			return;
		}
		else {
			var strVal = objBox.parentNode.childNodes(0).value + ":" + objBox.parentNode.childNodes(1).value;
			var objTd = objBox.parentNode.parentNode;
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

	
	
	
}



// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ){ 
		// s_status --> r_cycle	
			
		if( objName == "s_status" ) {	
					
				objTdG = main_tbody.rows[rowIdx].cells[1];
				//alert(rowIdx);
		}
		// r_cycle --> 수행시간		
		else if( objName == "r_cycle" ) {			
				objTdG = main_tbody.rows[rowIdx].cells[2];
		}
	
		// 수행시각(시간) --> 수행시각(분)
		else if( objName == "run_time_h" ) {
			runTimeComboFlag = "run_time_m";
			objTdG = main_tbody.rows[rowIdx].cells[2];
			setTimeout(setEditModeTime, 1);
			if( event.keyCode == "13"||event.keyCode == "9" ) {
				
					document.frm.run_time_m[rowIdx].focus();
				
				
			}
			return;
		}
				
		// 수행시각(분) --> 다음줄 코드
		else if( objName == "run_time_m" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
					objTdG = main_tbody.rows[0].cells[0];
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[0];
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

// setTimeout 에 실행되는 함수
function setEditModeTime() {
	
	setEditMode( objTdG );
		
}





/*숫자 input box 에 문자 check 
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
*/

/* row 추가
// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
//function addRow( insertRowIndex ) {
function addRow() {
	
	var oRowLeft = left_tbody.insertRow(); 
	var oRowMain = main_tbody.insertRow(); 
	
	// 새로 추가하는 row 의 row index 설정
	var rowNo = oRowLeft.rowIndex;
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22; 
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 삭제
	var oCell2 = oRowLeft.insertCell(); // 보유창고구분
	var oCell3 = oRowLeft.insertCell(); // CDC1
	var oCell4 = oRowMain.insertCell(); // CDC2
	var oCell5 = oRowMain.insertCell(); // CDC3
	var oCell6 = oRowMain.insertCell(); // CAPA1
	var oCell7 = oRowMain.insertCell(); // CAPA2
	var oCell8 = oRowMain.insertCell(); // CAPA3
	
	oCell2.onclick = function() { setEditMode(this); }; // 보유창고구분
	oCell3.onclick = function() { setEditMode(this); }; // CDC1
	oCell4.onclick = function() { setEditMode(this); }; // CDC2
	oCell5.onclick = function() { setEditMode(this); }; // CDC3
	oCell6.onclick = function() { setEditMode(this); }; // CAPA1
	oCell7.onclick = function() { setEditMode(this); }; // CAPA2
	oCell8.onclick = function() { setEditMode(this); }; // CAPA3
	
	oCell0.align = "center"; oCell0.width = "30px"; // 번호
	oCell1.align = "center"; oCell1.width = "30px"; // 삭제
	oCell2.align = "left"; oCell2.width = "140px";  // 보유창고구분
	oCell3.align = "left"; oCell3.width = "200px";  // CDC1
	oCell4.align = "left"; oCell4.width = "300px";  // CDC2
	oCell5.align = "left"; oCell5.width = "100px";  // CDC3
	oCell6.align = "left"; oCell6.width = "100px";  // CAPA1
	oCell7.align = "left"; oCell7.width = "100px";  // CAPA2
	oCell8.align = "left"; oCell8.width = "100px"; oCell8.className = "right"; // CAPA3
	
	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>"; 
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// 삭제
	oCell1.innerHTML = "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:20px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// 보유창고구분
	oCell2.innerHTML = "<a id=\"div_sl_cat\"></a><input type=\"text\" name=\"sl_cat\" class=\"normal\" size=\"20\" "
						+ "onChange=\"chkCodeStr(this); \" onBlur=\"chkDup_sl_cat(this); \" onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none; ime-mode:disabled; \" onFocusOut=\"setViewMode(this); \">"; 
	// CDC1
	oCell3.innerHTML = "<a id=\"div_cdc1\"></a><input type=\"text\" name=\"cdc1\" class=\"normal\" size=\"40\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">"; 
	// CDC2
	oCell4.innerHTML = "<a id=\"div_cdc2\"></a><input type=\"text\" name=\"cdc2\" class=\"normal\" size=\"100\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CDC3
	oCell5.innerHTML = "<a id=\"div_cdc3\"></a><input type=\"text\" name=\"cdc3\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAPA1
	oCell6.innerHTML = "<a id=\"div_capa1\"></a><input type=\"text\" name=\"capa1\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAPA2
	oCell7.innerHTML = "<a id=\"div_capa2\"></a><input type=\"text\" name=\"capa2\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAPA3
	oCell8.innerHTML = "<a id=\"div_capa3\"></a><input type=\"text\" name=\"capa3\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	
	
	document.recalc();
	setRowNo();	
}
*/


/*
// 번호 setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
		}
		else {
			divRowNo.innerHTML = "1";
		}
	}
	
}
*/



/*
// num 수만큼 행 추가
function addRows( num ) {
	
	for( var i=0; i<num ; ++i ) {
		addRow();
	}
}
*/

/*row 삭제 
// row 삭제 
// parameter : button object
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	
	if( tableLen > 1 )
	{
		delRowDo( delRowIdx );
		rowFormed();
	}
	setRowNo();	
}
*/


/*row 삭제 함수
//실제 row 삭제 함수
// parameter : 삭제할 rowIndex
function delRowDo( rowIdx ) { 
	
	left_tbody.deleteRow(rowIdx); 
	main_tbody.deleteRow(rowIdx);
	
}
*/


/*라인 삭제를 하면 버튼의 스타일이 잘 안먹는다. 따라서, 최 하단 라인을 지웠다 재생성한다.
// 라인 삭제를 하면 버튼의 스타일이 잘 안먹는다. 따라서, 최 하단 라인을 지웠다 재생성한다.
// 이렇게 하면 버튼의 스타일이 잘 먹는다.
// 최 하단 라인 데이터 기억 & 삭제 & 생성 & 채움
function rowFormed() {
	
	memLastRow();
	var tableLen = left_tbody.rows.length;
	delRowDo( tableLen - 1 );
	addRow();
	setLastRow();
	
} 

var arrData = new Array(8); 
// 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.sl_cat[tableLen-1] ) {
		arrData[0] = document.frm.sl_cat[tableLen-1].value;
		arrData[1] = document.frm.cdc1[tableLen-1].value;
		arrData[2] = document.frm.cdc2[tableLen-1].value;
		arrData[3] = document.frm.cdc3[tableLen-1].value;
		arrData[4] = document.frm.capa1[tableLen-1].value;
		arrData[5] = document.frm.capa2[tableLen-1].value;
		arrData[6] = document.frm.capa3[tableLen-1].value;
	}
	else {
		arrData[0] = document.frm.sl_cat.value;
		arrData[1] = document.frm.cdc1.value;
		arrData[2] = document.frm.cdc2.value;
		arrData[3] = document.frm.cdc3.value;
		arrData[4] = document.frm.capa1.value;
		arrData[5] = document.frm.capa2.value;
		arrData[6] = document.frm.capa3.value;
	}
	
}
*/



/* 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.sl_cat[tableLen-1] ) {
		document.frm.sl_cat[tableLen-1].value = arrData[0];
		document.frm.cdc1[tableLen-1].value = arrData[1];
		document.frm.cdc2[tableLen-1].value = arrData[2];
		document.frm.cdc3[tableLen-1].value = arrData[3];
		document.frm.capa1[tableLen-1].value = arrData[4];
		document.frm.capa2[tableLen-1].value = arrData[5];
		document.frm.capa3[tableLen-1].value = arrData[6];
		div_sl_cat[tableLen-1].innerHTML = "&nbsp;" + arrData[0];
		div_cdc1[tableLen-1].innerHTML = "&nbsp;" + arrData[1];
		div_cdc2[tableLen-1].innerHTML = "&nbsp;" + arrData[2];
		div_cdc3[tableLen-1].innerHTML = "&nbsp;" + arrData[3];
		div_capa1[tableLen-1].innerHTML = "&nbsp;" + arrData[4];
		div_capa2[tableLen-1].innerHTML = "&nbsp;" + arrData[5];
		div_capa3[tableLen-1].innerHTML = "&nbsp;" + arrData[6];
	}
	else {
		document.frm.sl_cat.value = arrData[0];
		document.frm.cdc1.value = arrData[1];
		document.frm.cdc2.value = arrData[2];
		document.frm.cdc3.value = arrData[3];
		document.frm.capa1.value = arrData[4];
		document.frm.capa2.value = arrData[5];
		document.frm.capa3.value = arrData[6];
		div_sl_cat.innerHTML = "&nbsp;" + arrData[0];
		div_cdc1.innerHTML = "&nbsp;" + arrData[1];
		div_cdc2.innerHTML = "&nbsp;" + arrData[2];
		div_cdc3.innerHTML = "&nbsp;" + arrData[3];
		div_capa1.innerHTML = "&nbsp;" + arrData[4];
		div_capa2.innerHTML = "&nbsp;" + arrData[5];
		div_capa3.innerHTML = "&nbsp;" + arrData[6];
	}
	
}
*/

/*코드 중복 체크
//코드 중복 체크
function chkDup_sl_cat( obj ) {
	
	if( obj.value == null || obj.value == "" ) {
		return;
	}
	
	var tableLen = left_tbody.rows.length;
	var cntEq = 0; // 중복 counting
	for( var i=0 ; i < tableLen ; i++ ) {
		if( document.frm.sl_cat[i] ) {
			if( document.frm.sl_cat[i].value == obj.value ) {
				cntEq++;
			}
		}
	}
	if( cntEq > 1 ) {
		alert("중복된 코드 입니다.");
		objTdG = obj.parentNode;
		setTimeout(setEditModeTime, 1);
	}	
}
*/


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
//

/* 삭제
function GoDelete(service) {
	
	if(!confirm("삭제 하시겠습니까?")){
		return;
	}
	
	document.frm.dc_loc.value = "";
			
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}
*/




 
