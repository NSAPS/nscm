
// 이전화면으로 이동
function moveBack() {
	
	var period_type_pre = document.frm.period_type_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_01050_engineBatchMaster_list";
	urlStr += "&period_type_sel=" + period_type_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
}

// 계획부문 선택에 따른 CAT_ID, SUB_CAT 설정
function setCatSub( objBox ) {
	
	document.frm.cat_id.value  = objBox.value.split("!%!")[0];
	document.frm.sub_cat.value = objBox.value.split("!%!")[1];
	
}

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
	
	// 순번 입력창인 경우, 숫자 체크
	if( objBox.name == "seq" ) {
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
	var oCell2 = oRowMain.insertCell(); // JOB 타입
	var oCell3 = oRowMain.insertCell(); // 순번
	var oCell4 = oRowMain.insertCell(); // SP ID
	var oCell5 = oRowMain.insertCell(); // 설명
	var oCell6 = oRowMain.insertCell(); // 수행여부
	
	oCell2.onclick = function() { setEditMode(this); }; // JOB 타입
	oCell3.onclick = function() { setEditMode(this); }; // 순번
	oCell4.onclick = function() { setEditMode(this); }; // SP ID
	oCell5.onclick = function() { setEditMode(this); }; // 설명
	oCell6.onclick = function() { setEditMode(this); }; // 수행여부
	
	oCell0.align = "center"; oCell0.width = "5%" ; // 번호
	oCell1.align = "center"; oCell1.width = "6%" ; // 추가/삭제
	oCell2.align = "center"; oCell2.width = "13%"; // JOB 타입
	oCell3.align = "center"; oCell3.width = "8%" ; // 순번
	oCell4.align = "left";   oCell4.width = "30%"; // SP ID
	oCell5.align = "left";   oCell5.width = "30%"; // 설명
	oCell6.align = "center"; oCell6.width = "8%" ; oCell6.className = "right"; // 수행여부
	
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
	// JOB 타입
	oCell2.innerHTML = "<a id=\"divJobType\"></a>" + selStrJobType;
	// 순번
	oCell3.innerHTML = "<a id=\"divSeq\"></a><input type=\"text\" name=\"seq\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// SP ID
	oCell4.innerHTML = "<a id=\"divSpId\"></a><input type=\"text\" name=\"sp_id\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:left; padding-left:5px; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 설명
	oCell5.innerHTML = "<a id=\"divDescr\"></a><input type=\"text\" name=\"descr\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:left; padding-left:5px; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// 수행여부
	oCell6.innerHTML = "<a id=\"divExecFlag\"></a><select name=\"exec_flag\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">"
						+ "<option value=\"Y\">YES</option><option value=\"N\">NO</option>"
						+ "</select>";
	
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

var arrData = new Array(5);
// 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = main_tbody.rows.length;
	if( document.frm.sp_id[tableLen-1] ) {
		arrData[0] 	= document.frm.job_type[tableLen-1].value; 	// JOB_TYPE
		arrData[1] 	= document.frm.seq[tableLen-1].value; 		// 순번
		arrData[2] 	= document.frm.sp_id[tableLen-1].value; 	// SP ID
		arrData[3] 	= document.frm.descr[tableLen-1].value; 	// 설명
		arrData[4] 	= document.frm.exec_flag[tableLen-1].value; // 수행여부
	}
	else {
		arrData[0] 	= document.frm.job_type.value; 	// JOB_TYPE
		arrData[1] 	= document.frm.seq.value; 		// 순번
		arrData[2] 	= document.frm.sp_id.value; 	// SP ID
		arrData[3] 	= document.frm.descr.value; 	// 설명
		arrData[4] 	= document.frm.exec_flag.value; // 수행여부
	}
	
}

// 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = main_tbody.rows.length;
	if( document.frm.sp_id[tableLen-1] ) {
		document.frm.job_type[tableLen-1].value 	= arrData[0]; // JOB_TYPE
		document.frm.seq[tableLen-1].value 			= arrData[1]; // 순번
		document.frm.sp_id[tableLen-1].value 		= arrData[2]; // SP ID
		document.frm.descr[tableLen-1].value 		= arrData[3]; // 설명
		document.frm.exec_flag[tableLen-1].value 	= arrData[4]; // 수행여부
		
		divJobType[tableLen-1].innerHTML 	= arrData[0]; 			 // JOB_TYPE
		divSeq[tableLen-1].innerHTML 		= arrData[1]; 			 // 순번
		divSpId[tableLen-1].innerHTML 		= "&nbsp;" + arrData[2]; // SP ID
		divDescr[tableLen-1].innerHTML 		= "&nbsp;" + arrData[3]; // 설명
		setViewMode(document.frm.exec_flag[tableLen-1]); 			 // 수행여부
	}
	else {
		document.frm.job_type.value 	= arrData[0]; // JOB_TYPE
		document.frm.seq.value 			= arrData[1]; // 순번
		document.frm.sp_id.value 		= arrData[2]; // SP ID
		document.frm.descr.value 		= arrData[3]; // 설명
		document.frm.exec_flag.value 	= arrData[4]; // 수행여부
		
		divJobType.innerHTML 	= arrData[0]; 			 // JOB_TYPE
		divSeq.innerHTML 		= arrData[1]; 			 // 순번
		divSpId.innerHTML 		= "&nbsp;" + arrData[2]; // SP ID
		divDescr.innerHTML 		= "&nbsp;" + arrData[3]; // 설명
		setViewMode(document.frm.exec_flag); 			 // 수행여부
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
		// JOB TYPE --> 순번
		if( objName == "job_type" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// 순번 --> SP ID
		else if( objName == "seq" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// SP ID --> 설명
		else if( objName == "sp_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// 설명 --> 수행여부
		else if( objName == "descr" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// 수행여부 --> 다음줄 JOB TYPE
		else if( objName == "exec_flag" ) {
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
		if( document.frm.sp_id[i] ) {
			if( document.frm.job_type[i].value != "" && document.frm.job_type[i].value != null ) {
				// 순번을 입력하지 않은 경우
				if( document.frm.seq[i].value == "" || document.frm.seq[i].value == null ) {
					alert("순번을 입력해야 합니다.");
					return;
				}
				// SP ID 를 입력하지 않은 경우
				if( document.frm.sp_id[i].value == "" || document.frm.sp_id[i].value == null ) {
					alert("SP ID 를 입력해야 합니다.");
					return;
				}
			}
		}
		else {
			if( document.frm.job_type.value != "" && document.frm.job_type.value != null ) {
				// 순번을 입력하지 않은 경우
				if( document.frm.seq.value == "" || document.frm.seq.value == null ) {
					alert("순번을 입력해야 합니다.");
					return;
				}
				// SP ID 를 입력하지 않은 경우
				if( document.frm.sp_id.value == "" || document.frm.sp_id.value == null ) {
					alert("SP ID 를 입력해야 합니다.");
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
