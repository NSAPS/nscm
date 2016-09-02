
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
// onClick
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
// onFocusOut
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
	
	// 순번, 계획구간 시작, 계획구간 종료, 스케줄 시작 입력창인 경우, 숫자 체크
	if( objBox.name == "seq" || objBox.name == "horst_idx" || objBox.name == "horen_idx" || objBox.name == "plnst_idx" ) {
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

// 공장선택에 따른 SUB_CAT 설정
function setSubCat( objBox ) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.sub_cat[rowIdx] ) {
		var objCatId = document.frm.cat_id[rowIdx];
		var objSubCat = document.frm.sub_cat[rowIdx];
		var objPlantId = document.frm.plant_id[rowIdx];
	}
	else {
		var objCatId = document.frm.cat_id;
		var objSubCat = document.frm.sub_cat;
		var objPlantId = document.frm.plant_id;
	}
	
	if( objBox.value == "" || objBox.value == null ) {
		objSubCat.value = objCatId.value;
		objPlantId.value = "";
	}
	else {
		objSubCat.value = objBox.value.split("!%!")[0];
		objPlantId.value = objBox.value.split("!%!")[1];
	}
	
}

// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRow( objBtn ) {
	
	if( objBtn.tagName == "TD"  ) {
		var insertRowIndex = 0;
		var oRowLeft = left_tbody.insertRow(insertRowIndex);
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	else {
		var insertRowIndex = objBtn.parentNode.parentNode.rowIndex;
		insertRowIndex = insertRowIndex + 1;
		var oRowLeft = left_tbody.insertRow(insertRowIndex);
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22;
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 추가/삭제
	var oCell2 = oRowLeft.insertCell(); // 계획주기
	var oCell3 = oRowLeft.insertCell(); // 계획부문
	var oCell4 = oRowLeft.insertCell(); // 공장
	
	var oCell5 = oRowMain.insertCell(); // 순번
	var oCell6 = oRowMain.insertCell(); // 자동수행 여부
	var oCell7 = oRowMain.insertCell(); // 수행주기
	var oCell8 = oRowMain.insertCell(); // 수행시각
	var oCell9 = oRowMain.insertCell(); // 엔진 IP
	var oCell10 = oRowMain.insertCell(); // 엔진 정보
	var oCell11 = oRowMain.insertCell(); // 계획구간 시작
	var oCell12 = oRowMain.insertCell(); // 계획구간 종료
	var oCell13 = oRowMain.insertCell(); // 스케줄 시작
	
	oCell2.onclick = function() { setEditMode(this); }; // 계획주기
	oCell3.onclick = function() { setEditMode(this); }; // 계획부문
	oCell3.ondblclick = function() { moveDetail(this); }; // 계획부문 더블클릭으로 상세화면 이동 함수 정의
	oCell4.onclick = function() { setEditMode(this); }; // 공장
	
	oCell5.onclick  = function() { setEditMode(this); }; // 순번
	oCell6.onclick  = function() { setEditMode(this); }; // 자동수행 여부
	oCell7.onclick  = function() { setEditMode(this); }; // 수행주기
	oCell8.onclick  = function() { setEditMode(this); }; // 수행시각
	oCell9.onclick  = function() { setEditMode(this); }; // 엔진 IP
	oCell10.onclick = function() { setEditMode(this); }; // 엔진 정보
	oCell11.onclick = function() { setEditMode(this); }; // 계획구간 시작
	oCell12.onclick = function() { setEditMode(this); }; // 계획구간 종료
	oCell13.onclick = function() { setEditMode(this); }; // 스케줄 시작
	
	oCell0.align = "center"; oCell0.width = "30px";  // 번호
	oCell1.align = "center"; oCell1.width = "40px";  // 추가/삭제
	oCell2.align = "center"; oCell2.width = "60px";  // 계획주기
	oCell3.align = "center"; oCell3.width = "130px"; // 계획부문
	oCell4.align = "center"; oCell4.width = "110px"; // 공장
	
	oCell5.align  = "center"; oCell5.width  = "40px";  // 순번
	oCell6.align  = "center"; oCell6.width  = "60px";  // 자동수행 여부
	oCell7.align  = "center"; oCell7.width  = "60px";  // 수행주기
	oCell8.align  = "center"; oCell8.width  = "80px";  // 수행시각
	oCell9.align  = "left";   oCell9.width  = "130px"; // 엔진 IP
	oCell10.align = "left";   oCell10.width = "130px"; // 엔진 정보
	oCell11.align = "center"; oCell11.width = "60px";  // 계획구간 시작
	oCell12.align = "center"; oCell12.width = "60px";  // 계획구간 종료
	oCell13.align = "center"; oCell13.width = "60px"; oCell13.className = "right"; // 스케줄 시작
	
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
	oCell3.innerHTML = "<a id=\"divCatId\"></a>" + selStrCatId;
	// 공장
	oCell4.innerHTML = "<a id=\"divPlantId\"></a>" + selStrPlantId
						+ " <input type=\"hidden\" name=\"sub_cat\" > <input type=\"hidden\" name=\"plant_id\" >";
	// 순번
	oCell5.innerHTML = "<a id=\"divSeq\"></a><input type=\"text\" name=\"seq\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 자동수행 여부
	oCell6.innerHTML = "<a id=\"divAutoFlag\"></a><select name=\"auto_flag\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">"
						+ "<option value=\"Y\">YES</option><option value=\"N\">NO</option>"
						+ "</select>";
	// 수행주기
	oCell7.innerHTML = "<a id=\"divRunCycle\"></a>" + selStrRunCycle;
	// 수행시각
	var selStrHour = "";
	for( var i=0 ; i < 24 ; i++ ){
		if( i < 10 ) {
			selStrHour += "<option value=\"0" + i.toString() + "\">0" + i.toString() + "</option>";
		}
		else {
			selStrHour += "<option value=\"" + i.toString() + "\">" + i.toString() + "</option>";
		}
	}
	var selStrMin = "";
	for( var i=0 ; i < 60 ; i++ ){
		if( i < 10 ) {
			selStrMin += "<option value=\"0" + i.toString() + "\">0" + i.toString() + "</option>";
		}
		else {
			selStrMin += "<option value=\"" + i.toString() + "\">" + i.toString() + "</option>";
		}
	}
	oCell8.innerHTML = "<a id=\"divRunTime\"></a><a id=\"divRunTimeSel\" style=\"display:none; \" >"
						+ "<select name=\"run_time_h\" style=\"width:49%; \" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" onMouseOver=\"setRunTimeFlag(this); \" onMouseOut=\"unsetRunTimeFlag(this); \" >" 
						+ selStrHour + "</select>"
						+ "<select name=\"run_time_m\" style=\"width:49%; \" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" onMouseOver=\"setRunTimeFlag(this); \" onMouseOut=\"unsetRunTimeFlag(this); \" >"
						+ selStrMin + "</select></a>";
	// 엔진 IP
	oCell9.innerHTML = "<a id=\"divEngnIp\"></a><input type=\"text\" name=\"engn_ip\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:left; padding-left:5px; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 엔진 정보
	oCell10.innerHTML = "<a id=\"divPdbUser\"></a><input type=\"text\" name=\"pdb_user\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:left; padding-left:5px; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 계획구간 시작
	oCell11.innerHTML = "<a id=\"divHorstIdx\"></a><input type=\"text\" name=\"horst_idx\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 계획구간 종료
	oCell12.innerHTML = "<a id=\"divHorenIdx\"></a><input type=\"text\" name=\"horen_idx\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 스케줄 시작
	oCell13.innerHTML = "<a id=\"divPlnstIdx\"></a><input type=\"text\" name=\"plnst_idx\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	
	document.recalc();
	setRowNo();
	
}

// 번호 setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
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
	
	left_tbody.deleteRow(rowIdx); 
	main_tbody.deleteRow(rowIdx);
	
}

// 라인 삭제를 하면 버튼의 스타일이 잘 안먹는다. 따라서, 최 하단 라인을 지웠다 재생성한다.
// 이렇게 하면 버튼의 스타일이 잘 먹는다.
// 최 하단 라인 데이터 기억 & 삭제 & 생성 & 채움
function rowFormed() {
	
	memLastRow();
	var tableLen = left_tbody.rows.length;
	delRowDo( tableLen - 1 );
	
	tableLen = left_tbody.rows.length;
	//if( document.frm.btnAddRow[0] ) {
	if( tableLen > 1 ) {
		var objBtn = document.frm.btnAddRow[tableLen-1];
	}
	else if( tableLen == 1 ) {
		if( document.frm.btnAddRow[0] ) {
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

var arrData = new Array(17); 
// 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.sub_cat[tableLen-1] ) {
		arrData[0] 	= document.frm.period_type[tableLen-1].value; 	// 계획주기
		arrData[1] 	= document.frm.cat_id[tableLen-1].value; 		// 계획부문
		arrData[2] 	= document.frm.plant_id_sel[tableLen-1].value; 	// 공장선택 combo
		arrData[3] 	= document.frm.sub_cat[tableLen-1].value; 		// SUB_CAT
		arrData[4] 	= document.frm.plant_id[tableLen-1].value; 		// 공장
		arrData[5] 	= document.frm.seq[tableLen-1].value; 			// 순번
		arrData[6] 	= document.frm.auto_flag[tableLen-1].value; 	// 자동수행 여부
		arrData[7] 	= document.frm.run_cycle[tableLen-1].value; 	// 수행주기
		arrData[8] 	= document.frm.run_time_h[tableLen-1].value; 	// 수행시각(시간)
		arrData[9] 	= document.frm.run_time_m[tableLen-1].value; 	// 수행시각(분)
		arrData[10] = document.frm.engn_ip[tableLen-1].value; 		// 엔진 IP
		arrData[11] = document.frm.pdb_user[tableLen-1].value; 		// 엔진 정보
		arrData[12] = document.frm.horst_idx[tableLen-1].value; 	// 계획구간 시작
		arrData[13] = document.frm.horen_idx[tableLen-1].value; 	// 계획구간 종료
		arrData[14] = document.frm.plnst_idx[tableLen-1].value; 	// 스케줄 종료
	}
	else {
		arrData[0] 	= document.frm.period_type.value; 	// 계획주기
		arrData[1] 	= document.frm.cat_id.value; 		// 계획부문
		arrData[2] 	= document.frm.plant_id_sel.value; 	// 공장선택 combo
		arrData[3] 	= document.frm.sub_cat.value; 		// SUB_CAT
		arrData[4] 	= document.frm.plant_id.value; 		// 공장
		arrData[5] 	= document.frm.seq.value; 			// 순번
		arrData[6] 	= document.frm.auto_flag.value; 	// 자동수행 여부
		arrData[7] 	= document.frm.run_cycle.value; 	// 수행주기
		arrData[8] 	= document.frm.run_time_h.value; 	// 수행시각(시간)
		arrData[9] 	= document.frm.run_time_m.value; 	// 수행시각(분)
		arrData[10] = document.frm.engn_ip.value; 		// 엔진 IP
		arrData[11] = document.frm.pdb_user.value; 		// 엔진 정보
		arrData[12] = document.frm.horst_idx.value; 	// 계획구간 시작
		arrData[13] = document.frm.horen_idx.value; 	// 계획구간 종료
		arrData[14] = document.frm.plnst_idx.value; 	// 스케줄 시작
	}
	
}

// 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.sub_cat[tableLen-1] ) {
		document.frm.period_type[tableLen-1].value 	= arrData[0]; // 계획주기
		document.frm.cat_id[tableLen-1].value 		= arrData[1]; // 계획부문
		document.frm.plant_id_sel[tableLen-1].value = arrData[2]; // 공장선택 combo
		document.frm.sub_cat[tableLen-1].value 		= arrData[3]; // SUB_CAT
		document.frm.plant_id[tableLen-1].value 	= arrData[4]; // 공장
		document.frm.seq[tableLen-1].value 			= arrData[5]; // 순번
		document.frm.auto_flag[tableLen-1].value 	= arrData[6]; // 자동수행 여부
		document.frm.run_cycle[tableLen-1].value 	= arrData[7]; // 수행주기
		document.frm.run_time_h[tableLen-1].value 	= arrData[8]; // 수행시각(시간)
		document.frm.run_time_m[tableLen-1].value 	= arrData[9]; // 수행시각(분)
		document.frm.engn_ip[tableLen-1].value 		= arrData[10]; // 엔진 IP
		document.frm.pdb_user[tableLen-1].value 	= arrData[11]; // 엔진 정보
		document.frm.horst_idx[tableLen-1].value 	= arrData[12]; // 계획구간 시작
		document.frm.horen_idx[tableLen-1].value 	= arrData[13]; // 계획구간 종료
		document.frm.plnst_idx[tableLen-1].value 	= arrData[14]; // 스케줄 시작
		
		setViewMode(document.frm.period_type[tableLen-1]); 	// 계획주기
		setViewMode(document.frm.cat_id[tableLen-1]); 		// 계획부문
		setViewMode(document.frm.plant_id_sel[tableLen-1]); // 공장
		divSeq[tableLen-1].innerHTML 		= arrData[5]; 	// 순번
		setViewMode(document.frm.auto_flag[tableLen-1]); 	// 자동수행 여부
		setViewMode(document.frm.run_cycle[tableLen-1]); 	// 수행주기
		divRunTime[tableLen-1].innerHTML 	= arrData[8] + ":" + arrData[9]; // 수행시각
		divEngnIp[tableLen-1].innerHTML 	= "&nbsp;" + arrData[10]; 		 // 엔진 IP
		divPdbUser[tableLen-1].innerHTML 	= "&nbsp;" + arrData[11]; 		 // 엔진 정보
		divHorstIdx[tableLen-1].innerHTML 	= arrData[12]; // 계획구간 시작
		divHorenIdx[tableLen-1].innerHTML 	= arrData[13]; // 계획구간 종료
		divPlnstIdx[tableLen-1].innerHTML 	= arrData[14]; // 스케줄 시작
	}
	else {
		document.frm.period_type.value 	= arrData[0]; // 계획주기
		document.frm.cat_id.value 		= arrData[1]; // 계획부문
		document.frm.plant_id_sel.value = arrData[2]; // 공장선택 combo
		document.frm.sub_cat.value 		= arrData[3]; // SUB_CAT
		document.frm.plant_id.value 	= arrData[4]; // 공장
		document.frm.seq.value 			= arrData[5]; // 순번
		document.frm.auto_flag.value 	= arrData[6]; // 자동수행 여부
		document.frm.run_cycle.value 	= arrData[7]; // 수행주기
		document.frm.run_time_h.value 	= arrData[8]; // 수행시각(시간)
		document.frm.run_time_m.value 	= arrData[9]; // 수행시각(분)
		document.frm.engn_ip.value 		= arrData[10]; // 엔진 IP
		document.frm.pdb_user.value 	= arrData[11]; // 엔진 정보
		document.frm.horst_idx.value 	= arrData[12]; // 계획구간 시작
		document.frm.horen_idx.value 	= arrData[13]; // 계획구간 종료
		document.frm.plnst_idx.value 	= arrData[14]; // 스케줄 시작
		
		setViewMode(document.frm.period_type); 	// 계획주기
		setViewMode(document.frm.cat_id); 		// 계획부문
		setViewMode(document.frm.plant_id_sel); // 공장
		divSeq.innerHTML 		= arrData[5]; 	// 순번
		setViewMode(document.frm.auto_flag); 	// 자동수행 여부
		setViewMode(document.frm.run_cycle); 	// 수행주기
		divRunTime.innerHTML 	= arrData[8] + ":" + arrData[9]; // 수행시각
		divEngnIp.innerHTML 	= "&nbsp;" + arrData[10]; 		 // 엔진 IP
		divPdbUser.innerHTML 	= "&nbsp;" + arrData[11]; 		 // 엔진 정보
		divHorstIdx.innerHTML 	= arrData[12]; // 계획구간 시작
		divHorenIdx.innerHTML 	= arrData[13]; // 계획구간 종료
		divPlnstIdx.innerHTML 	= arrData[14]; // 스케줄 시작
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
	
	var tableLen = left_tbody.rows.length;
	// 수행시각 셀인 경우
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// 계획주기 --> 계획부문
		if( objName == "period_type" ) {
			objTdG = left_tbody.rows[rowIdx].cells[3];
		}
		// 계획부문 --> 공장
		else if( objName == "cat_id" ) {
			objTdG = left_tbody.rows[rowIdx].cells[4];
		}
		// 공장 --> 순번
		else if( objName == "plant_id_sel" ) {
			objTdG = main_tbody.rows[rowIdx].cells[0];
		}
		// 순번 --> 자동수행여부
		else if( objName == "seq" ) {
			objTdG = main_tbody.rows[rowIdx].cells[1];
		}
		// 자동수행여부 --> 수행주기
		else if( objName == "auto_flag" ) {
			objTdG = main_tbody.rows[rowIdx].cells[2];
		}
		// 수행주기 --> 수행시각(시간)
		else if( objName == "run_cycle" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// 수행시각(시간) --> 수행시각(분)
		else if( objName == "run_time_h" ) {
			runTimeComboFlag = "run_time_m";
			objTdG = main_tbody.rows[rowIdx].cells[3];
			setTimeout(setEditModeTime, 1);
			if( event.keyCode == "13" ) {
				if( document.frm.sub_cat[rowIdx] ) {
					document.frm.run_time_m[rowIdx].focus();
				}
				else {
					document.frm.run_time_m.focus();
				}
			}
			return;
		}
		// 수행시각(분) --> 엔진 IP
		else if( objName == "run_time_m" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// 엔진 IP --> 엔진정보
		else if( objName == "engn_ip" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// 엔진정보 --> 계획구간시작
		else if( objName == "pdb_user" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// 계획구간시작 --> 계획구간종료
		else if( objName == "horst_idx" ) {
			objTdG = main_tbody.rows[rowIdx].cells[7];
		}
		// 계획구간종료 --> 스케줄시작
		else if( objName == "horen_idx" ) {
			objTdG = main_tbody.rows[rowIdx].cells[8];
		}
		// 스케줄시작 --> 다음줄 계획주기
		else if( objName == "plnst_idx" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[2];
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[2];
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
	
	var tableLen = left_tbody.rows.length;
	
	for( var i=0 ; i < tableLen ; i++ ) {
		if( document.frm.sub_cat[i] ) {
			if( document.frm.period_type[i].value != "" && document.frm.period_type[i].value != null ) {
				// 계획부문을 선택하지 않은 경우
				if( document.frm.cat_id[i].value == "" || document.frm.cat_id[i].value == null ) {
					alert("계획부문을 선택해야 합니다.");
					return;
				}
				// 공장을 선택하지 않은 경우
				if( document.frm.plant_id_sel[i].value == "" || document.frm.plant_id_sel[i].value == null ) {
					// SUB_CAT 설정
					setSubCat(document.frm.plant_id_sel[i]);
					// SUB_CAT 을 설정해도 sub_cat value 가 없는 경우
					if( document.frm.sub_cat[i].value == "" || document.frm.sub_cat[i].value == null ) {
						alert("공장을 선택해야 합니다.");
						return;
					}
				}
			}
		}
		else {
			if( document.frm.period_type.value != "" && document.frm.period_type.value != null ) {
				// 계획부문을 선택하지 않은 경우
				if( document.frm.cat_id.value == "" || document.frm.cat_id.value == null ) {
					alert("계획부문을 선택해야 합니다.");
					return;
				}
				// 공장을 선택하지 않은 경우
				if( document.frm.plant_id_sel.value == "" || document.frm.plant_id_sel.value == null ) {
					// SUB_CAT 설정
					setSubCat(document.frm.plant_id_sel);
					// SUB_CAT 을 설정해도 sub_cat value 가 없는 경우
					if( document.frm.sub_cat.value == "" || document.frm.sub_cat.value == null ) {
						alert("공장을 선택해야 합니다.");
						return;
					}
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

// 상세 화면 이동
function moveDetail(objTd) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	
	if( document.frm.sub_cat[rowIdx] ) {
		setSubCat(document.frm.plant_id_sel[rowIdx]); // SUB_CAT 설정
		var period_type = document.frm.period_type[rowIdx].value;
		var cat_id 		= document.frm.cat_id[rowIdx].value;
		var sub_cat 	= document.frm.sub_cat[rowIdx].value;
	}
	else {
		setSubCat(document.frm.plant_id_sel); // SUB_CAT 설정
		var period_type = document.frm.period_type.value;
		var cat_id 		= document.frm.cat_id.value;
		var sub_cat 	= document.frm.sub_cat.value;
	}
	
	var period_type_pre = document.frm.period_type_pre.value;
	var perpage_pre 	= document.frm.perpage_pre.value;
	var pagenumber_pre 	= document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_01050_engineBatchMaster_detail";
	urlStr += "&period_type=" + period_type + "&cat_id=" + cat_id + "&sub_cat=" + sub_cat;
	urlStr += "&period_type_pre=" + period_type_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
	
}
