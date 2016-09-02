
// input box 를 Edit Mode 로 변환
// onClick
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
	
}

// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRow( objBtn ) {
	
	if( objBtn.tagName == "TD"  ) {
		var insertRowIndex = 0;
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	else {
		var insertRowIndex = objBtn.parentNode.parentNode.rowIndex;
		insertRowIndex = insertRowIndex + 1;
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	
	oRowMain.onmouseover = function() { bgOver2(this); }; 
	oRowMain.onmouseout  = function() { bgOut2(this); }; 
	oRowMain.height = 22;
	
	var oCell0 = oRowMain.insertCell(); // 번호
	var oCell1 = oRowMain.insertCell(); // 추가/삭제
	var oCell2 = oRowMain.insertCell(); // 계획주기
	var oCell3 = oRowMain.insertCell(); // 계획부문
	var oCell4 = oRowMain.insertCell(); // 확정구간일수
	var oCell5 = oRowMain.insertCell(); // 버켓단위1
	var oCell6 = oRowMain.insertCell(); // 버켓단위1 구간
	var oCell7 = oRowMain.insertCell(); // 버켓단위2
	var oCell8 = oRowMain.insertCell(); // 버켓단위2 구간
	var oCell9 = oRowMain.insertCell(); // 롤링단위
	
	oCell2.onclick = function() { setEditMode(this); }; // 계획주기
	oCell3.onclick = function() { setEditMode(this); }; // 계획부문
	oCell4.onclick = function() { setEditMode(this); }; // 확정구간일수
	oCell5.onclick = function() { setEditMode(this); }; // 버켓단위1
	oCell6.onclick = function() { setEditMode(this); }; // 버켓단위1 구간
	oCell7.onclick = function() { setEditMode(this); }; // 버켓단위2
	oCell8.onclick = function() { setEditMode(this); }; // 버켓단위2 구간
	oCell9.onclick = function() { setEditMode(this); }; // 롤링단위
	
	oCell0.align = "center"; oCell0.width = "5%" ; // 번호
	oCell1.align = "center"; oCell1.width = "6%" ; // 추가/삭제
	oCell2.align = "center"; oCell2.width = "8%" ; // 계획주기
	oCell3.align = "center"; oCell3.width = "19%"; // 계획부문
	oCell4.align = "center"; oCell4.width = "8%" ; // 확정구간일수
	oCell5.align = "center"; oCell5.width = "12%"; // 버켓단위1
	oCell6.align = "center"; oCell6.width = "9%" ; // 버켓단위1 구간
	oCell7.align = "center"; oCell7.width = "12%"; // 버켓단위2
	oCell8.align = "center"; oCell8.width = "9%" ; // 버켓단위2 구간
	oCell9.align = "center"; oCell9.width = "12%"; oCell9.className = "right"; // 롤링단위
	
	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// 추가/삭제
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// 계획주기
	oCell2.innerHTML = "<a id=\"divPeriodType\"></a>" + selStrPeriodType;
	// 계획부문
	oCell3.innerHTML = "<a id=\"selStrCatId\"></a>" + selStrCatId;
	// 확정구간일수
	oCell4.innerHTML = "<a id=\"divTimeFence\"></a><input type=\"text\" name=\"time_fence\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 버켓단위1
	oCell5.innerHTML = "<a id=\"divBckt1Uom\"></a><select name=\"bckt1_uom\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">" + selStrBcktUom;
	// 버켓단위1 구간
	oCell6.innerHTML = "<a id=\"divBckt1Horzn\"></a><input type=\"text\" name=\"bckt1_horzn\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 버켓단위2
	oCell7.innerHTML = "<a id=\"divBckt2Uom\"></a><select name=\"bckt2_uom\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">" + selStrBcktUom;
	// 버켓단위2 구간
	oCell8.innerHTML = "<a id=\"divBckt2Horzn\"></a><input type=\"text\" name=\"bckt2_horzn\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 버켓단위1
	oCell9.innerHTML = "<a id=\"divRollingUom\"></a><select name=\"rolling_uom\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">" + selStrBcktUom;
	
	document.recalc();
	setRowNo();
	
}

// 번호 setting
function setRowNo() {
	
	var tableLen = main_tbody.rows.length;
	areaTot.innerHTML = tableLen;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
		}
		else {
			divRowNo.innerHTML = "1";
		}
	}
	
}

// row 삭제 
// parameter : button object
function delRow( objBtn ) { 
	
	var delRowIdx = objBtn.parentNode.parentNode.rowIndex;
	var tableLen = objBtn.parentNode.parentNode.parentNode.rows.length;
	
	if( tableLen > 1 )
	{
		delRowDo( delRowIdx );
		rowFormed();
	}
	setRowNo();
	
}

// 실제 row 삭제 함수
// parameter : 삭제할 rowIndex
function delRowDo( rowIdx ) { 
	
	main_tbody.deleteRow(rowIdx);
	
}

// 라인 삭제를 하면 버튼의 스타일이 잘 안먹는다. 따라서, 최 하단 라인을 지웠다 재생성한다.
// 이렇게 하면 버튼의 스타일이 잘 먹는다.
// 최 하단 라인 데이터 기억 & 삭제 & 생성 & 채움
function rowFormed() {
	
	memLastRow();
	var tableLen = main_tbody.rows.length;
	delRowDo( tableLen - 1 );
	
	tableLen = main_tbody.rows.length;
	//if( document.frm.btnAddRow[0] ) {
	if( tableLen > 1 ) {
		var objBtn = document.frm.btnAddRow[tableLen-1];
	}
	else if( tableLen == 1 ) {
		if( document.frm.btnAddRow[0] ){
			var objBtn = document.frm.btnAddRow[0];
		}
		else {
			var objBtn = document.frm.btnAddRow;
		}
	}
	else {
		var objBtn = areaAdd;
	}
	
	//addRow(left_tbody.rows.length);
	addRow(objBtn);
	setLastRow();
	
}

var arrData = new Array(8);
// 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = main_tbody.rows.length;
	if( document.frm.bckt1_horzn[tableLen-1] ) {
		arrData[0] 	= document.frm.period_type[tableLen-1].value; // 계획주기
		arrData[1] 	= document.frm.cat_id[tableLen-1].value; 	  // 계획부문
		arrData[2] 	= document.frm.time_fence[tableLen-1].value;  // 확정구간일수
		arrData[3] 	= document.frm.bckt1_uom[tableLen-1].value;   // 버켓단위1
		arrData[4] 	= document.frm.bckt1_horzn[tableLen-1].value; // 버켓단위1 구간
		arrData[5] 	= document.frm.bckt2_uom[tableLen-1].value;   // 버켓단위2
		arrData[6] 	= document.frm.bckt2_horzn[tableLen-1].value; // 버켓단위2 구간
		arrData[7] 	= document.frm.rolling_uom[tableLen-1].value; // 롤링단위
	}
	else {
		arrData[0] 	= document.frm.period_type.value; // 계획주기
		arrData[1] 	= document.frm.cat_id.value; 	  // 계획부문
		arrData[2] 	= document.frm.time_fence.value;  // 확정구간일수
		arrData[3] 	= document.frm.bckt1_uom.value;   // 버켓단위1
		arrData[4] 	= document.frm.bckt1_horzn.value; // 버켓단위1 구간
		arrData[5] 	= document.frm.bckt2_uom.value;   // 버켓단위2
		arrData[6] 	= document.frm.bckt2_horzn.value; // 버켓단위2 구간
		arrData[7] 	= document.frm.rolling_uom.value; // 롤링단위
	}
	
}

// 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = main_tbody.rows.length;
	if( document.frm.bckt1_horzn[tableLen-1] ) {
		document.frm.period_type[tableLen-1].value 	= arrData[0]; // 계획주기
		document.frm.cat_id[tableLen-1].value 		= arrData[1]; // 계획부문
		document.frm.time_fence[tableLen-1].value 	= arrData[2]; // 확정구간일수
		document.frm.bckt1_uom[tableLen-1].value 	= arrData[3]; // 버켓단위1
		document.frm.bckt1_horzn[tableLen-1].value 	= arrData[4]; // 버켓단위1 구간
		document.frm.bckt2_uom[tableLen-1].value 	= arrData[5]; // 버켓단위1
		document.frm.bckt2_horzn[tableLen-1].value 	= arrData[6]; // 버켓단위1 구간
		document.frm.rolling_uom[tableLen-1].value 	= arrData[7]; // 롤링단위
		
		setViewMode(document.frm.period_type[tableLen-1]); 	// 계획주기
		setViewMode(document.frm.cat_id[tableLen-1]); 		// 계획부문
		divTimeFence[tableLen-1].innerHTML 	= arrData[2]; 	// 확정구간일수
		divBckt1Uom[tableLen-1].innerHTML 	= arrData[3]; 	// 버켓단위1
		divBckt1Horzn[tableLen-1].innerHTML = arrData[4]; 	// 버켓단위1 구간
		divBckt2Uom[tableLen-1].innerHTML 	= arrData[5]; 	// 버켓단위2
		divBckt2Horzn[tableLen-1].innerHTML = arrData[6]; 	// 버켓단위2 구간
		divRollingUom[tableLen-1].innerHTML = arrData[7]; 	// 롤링단위
	}
	else {
		document.frm.period_type.value 	= arrData[0]; // 계획주기
		document.frm.cat_id.value 		= arrData[1]; // 계획부문
		document.frm.time_fence.value 	= arrData[2]; // 확정구간일수
		document.frm.bckt1_uom.value 	= arrData[3]; // 버켓단위1
		document.frm.bckt1_horzn.value 	= arrData[4]; // 버켓단위1 구간
		document.frm.bckt2_uom.value 	= arrData[5]; // 버켓단위1
		document.frm.bckt2_horzn.value 	= arrData[6]; // 버켓단위1 구간
		document.frm.rolling_uom.value 	= arrData[7]; // 롤링단위
		
		setViewMode(document.frm.period_type); 	// 계획주기
		setViewMode(document.frm.cat_id); 		// 계획부문
		divTimeFence.innerHTML 	= arrData[2]; 	// 확정구간일수
		divBckt1Uom.innerHTML 	= arrData[3]; 	// 버켓단위1
		divBckt1Horzn.innerHTML = arrData[4]; 	// 버켓단위1 구간
		divBckt2Uom.innerHTML 	= arrData[5]; 	// 버켓단위2
		divBckt2Horzn.innerHTML = arrData[6]; 	// 버켓단위2 구간
		divRollingUom.innerHTML = arrData[7]; 	// 롤링단위
	}
	
}

// 셀 저장 전역변수
var objTdG;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// 계획주기 --> 계획부문
		if( objName == "period_type" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// 계획부문 --> 확정구간일수
		else if( objName == "cat_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// 확정구간일수 --> 버켓단위1
		else if( objName == "time_fence" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// 버켓단위1 --> 버켓단위1 구간
		else if( objName == "bckt1_uom" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// 버켓단위1 구간 --> 버켓단위2
		else if( objName == "bckt1_horzn" ) {
			objTdG = main_tbody.rows[rowIdx].cells[7];
		}
		// 버켓단위2 --> 버켓단위2 구간
		else if( objName == "bckt2_uom" ) {
			objTdG = main_tbody.rows[rowIdx].cells[8];
		}
		// 버켓단위2 구간 --> 롤링단위
		else if( objName == "bckt2_horzn" ) {
			objTdG = main_tbody.rows[rowIdx].cells[9];
		}
		// 롤링단위 --> 다음줄 계획주기
		else if( objName == "rolling_uom" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				objTdG = main_tbody.rows[0].cells[2];
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				objTdG = main_tbody.rows[rowIdx+1].cells[2];
			}
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

// 저장 버튼 클릭
function GoSave(service) {
	
	var tableLen = main_tbody.rows.length;
	
	for( var i=0 ; i < tableLen ; i++ ) {
		// 테이블에 여러 라인이 존재
		if( document.frm.bckt1_horzn[i] ) {
			// 계획주기를 입력한 경우만 체크 : 계획주기를 입력하지 않으면, INSERT 문을 실행하지 않음
			if( document.frm.period_type[i].value != "" && document.frm.period_type[i].value != null ) {
				// 계획부문을 입력하지 않은 경우
				if( document.frm.cat_id[i].value == "" || document.frm.cat_id[i].value == null ) {
					alert("계획부문을 입력해야 합니다.");
					return;
				}
			}
		}
		// 테이블에 한 라인만 존재
		else {
			// 계획주기를 입력한 경우만 체크 : 계획주기를 입력하지 않으면, INSERT 문을 실행하지 않음
			if( document.frm.period_type.value != "" && document.frm.period_type.value != null ) {
				// 계획부문을 입력하지 않은 경우
				if( document.frm.cat_id.value == "" || document.frm.cat_id.value == null ) {
					alert("계획부문을 입력해야 합니다.");
					return;
				}
			}
		}
	}
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}
