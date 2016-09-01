////////////////////////////////////////////////////////////
// 프로그램ID : md_04090_routeMultiDrop_list.js
// 프로그램명 : Route수송 기준정보
// 개발자  : 허준성
// 개발일자 : 2008-07-31 목요일
//
//관련 job file : job_sinc_70_masterData_00.xml
//
//관련 query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-07-31  허준성     md_04090_routeMultiDrop_list.js 개발
//
//
////////////////////////////////////////////////////////////

// 클릭한 수송일자 인덱스
var clickedDateIdx = null;

// 날짜 검색 POP BTN mouseOver
function overBtn( objBtn ) {
	
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// 날짜 검색 POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}
// combo box 를 View Mode 로 변환
function setViewMode1(objBox) {
	
	// 수송일자 셀인 경우
	if( objBox.name == "transDateTmp" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == clickedDateIdx ) {
			return;
		}
		objTd.childNodes(1).value = strVal;
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
	objTd.onclick = function() { setEditMode1(this); };

}

// combo box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";	
	objTd.childNodes(1).focus();
}

// input box 를 Edit Mode 로 변환
function setEditMode1( objTd ) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	
	// 수송일자 검색 셀
	if( objTd.childNodes(0).id == "divValidStart" || objTd.childNodes(0).id == "divValidEnd") {
		objTd.childNodes(0).style.display = "block";
		objTd.childNodes(1).style.display = "none";
		var strDate = "<input type=\"text\" name=\"transDateTmp\" size=\"10\" maxlength=\"10\" onDblClick=\"this.select(); \" "
			+ "class=\"normal\" onBlur=\"chkDate2(this,'10'); \" onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode1(this); \" "
			+ "style=\"text-align:center; width:70px; \" ><img src=\"sinc/template/basic/skin/nongshim/images/common/icon_cal.gif\" "
			+ "id=\"btnDate\" align=\"absmiddle\" border=\"0\" style=\"cursor:pointer; \" "
			+ "onMouseOver=\"overBtn(this); \" onMouseOut=\"outBtn(this); \">";
		objTd.childNodes(0).innerHTML = strDate;
		document.frm.transDateTmp.value = objTd.childNodes(1).value;
		document.frm.transDateTmp.focus();
		Calendar.setup({
			inputField  : "transDateTmp", // id of the input field
			ifFormat    : "%Y-%m-%d",     // format of the input field 
			button      : "btnDate",      // trigger for the calendar (button ID)
			align       : "Tl",           // alignment (defaults to "Bl")
			singleClick : true
		});
	}
	else {
		//objTd.childNodes(1).select();
		objTd.childNodes(1).focus();
	}
	
	objTd.onclick = "";

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

// Route Seq 중복 check
function checkRouteSeq(objTd) {
	
	var tableLen = left_tbody.rows.length;
	
	var strVal = objTd.value;
	
	if(tableLen == 1){
		
	}else{
		for( var i = 0 ; i < tableLen ; ++i ) {
			if( document.frm.route_seq[i] != objTd 
			&& document.frm.route_seq[i].value == objTd.value 
			&& objTd.value != "" ) {
				alert("이미 같은 순번이 존재합니다. 다른 값을 입력해주십시요.");
				objTd.value = "";
				strVal = "";
				objTd.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
				objTd.parentNode.childNodes(0).style.display = "block";
				objTd.style.display = "none";
				return;
			}
		}
	}
	objTd.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objTd.parentNode.childNodes(0).style.display = "block";
	objTd.style.display = "none";
	
}


// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRow( objBtn ) {
	
	var tmp_tgt_loc = document.frm.tgt_loc_sel.options[document.frm.tgt_loc_sel.selectedIndex].text;
	
	if(tmp_tgt_loc == "선택"){
		alert("먼저 조회을 하셔야 입력이 가능합니다.");
		return;		
	}
	
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
	
	// 새로 추가하는 row 의 row index 설정
	var rowNo = oRowLeft.rowIndex;
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22;
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 추가/삭제
	var oCell2 = oRowLeft.insertCell(); // 출고장
	var oCell3 = oRowLeft.insertCell(); // ROUTE ID
	
	var oCell4 = oRowMain.insertCell(); // 제1입고장
	var oCell5 = oRowMain.insertCell(); // 제2입고장
	var oCell6 = oRowMain.insertCell(); // 제3입고장
	var oCell7 = oRowMain.insertCell(); // 적용시작일자
	var oCell8 = oRowMain.insertCell(); // 적용종료일자
	var oCell9 = oRowMain.insertCell(); // 사유
	
	//oCell2.onclick = function() { setEditMode(this); }; // 출고장
	oCell3.onclick = function() { setEditMode1(this); }; // ROUTE ID
	
	oCell4.onclick = function() { setEditMode(this); }; // 제1입고장
	oCell5.onclick = function() { setEditMode(this); }; // 제2입고장
	oCell6.onclick = function() { setEditMode(this); }; // 제3입고장
	oCell7.onclick = function() { setEditMode1(this); }; // 적용시작일자
	oCell8.onclick = function() { setEditMode1(this); }; // 적용종료일자
	oCell9.onclick = function() { setEditMode(this); }; // 사유
	
	oCell0.align = "center"; oCell0.width = "30px";  // 번호
	oCell1.align = "center"; oCell1.width = "40px";  // 추가/삭제
	oCell2.align = "center"; oCell2.width = "80px"; // 출고장
	oCell3.align = "center"; oCell3.width = "40px";  // ROUTE ID
	
	oCell4.align = "left";   oCell4.width = "90px"; // 제1입고장
	oCell5.align = "left";   oCell5.width = "90px"; // 제2입고장
	oCell6.align = "left";   oCell6.width = "90px"; // 제3입고장
	oCell7.align = "center"; oCell7.width = "95px"; // 적용시작일자
	oCell8.align = "center"; oCell8.width = "95px"; // 적용종료일자
	oCell9.align = "left";   oCell9.width = "150px"; oCell9.className = "right"; // 사유
	
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
	// 출고장
	oCell2.innerHTML = "<a id=\"divCdcId\">&nbsp;" + tmp_tgt_loc + "</a>";
	// 순번
	oCell3.innerHTML = "<a id=\"divRouteSeq\"></a><input " 
						+ "type=\"text\" name=\"route_seq\" class=\"normal\" value=\"\" size=\"2\" maxlength=\"2\" "
						+ "onFocusOut=\"checkRouteSeq(this); \" onkeypress=\"filterKey('[0-9]')\" onKeyDown=\"moveNextBox(this); \" ondblClick=\"this.select(); \" "
						+ "style=\"width:100%; text-align:center; display:none; \">";
	// 제1입고장
	oCell4.innerHTML = "<a id=\"divDcId1\"></a>" + selStrDcId1;
	// 제2입고장
	oCell5.innerHTML = "<a id=\"divDcId2\"></a>" + selStrDcId2;
	// 제3입고장
	oCell6.innerHTML = "<a id=\"divDcId3\"></a>" + selStrDcId3;
	// 적용시작일자
	oCell7.innerHTML = "<a id=\"divValidStart\"></a><input type=\"hidden\" name=\"start_dttm\" value=\"\">";
	// 적용종료일자
	oCell8.innerHTML = "<a id=\"divValidEnd\"></a><input type=\"hidden\" name=\"end_dttm\" value=\"\">";
	
	// 사유
	oCell9.innerHTML = "<a id=\"divReason\"></a><input type=\"text\" name=\"reason\" class=\"normal\" value=\"\" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \" ondblClick=\"this.select(); \" "
						+ "style=\"width:100%; text-align:left; display:none; \">";
	
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
	
	if( tableLen > 0 ) // 모든 ROW가 삭제 되도록 0으로 수정함.
	{
		delRowDo( delRowIdx );
		if(tableLen != 1)
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
		else{
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

var arrData = new Array(7); 
// 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.route_seq[tableLen-1] ) {
		arrData[0] = document.frm.route_seq[tableLen-1].value;
		arrData[1] = document.frm.dc_id_1[tableLen-1].value;
		arrData[2] = document.frm.dc_id_2[tableLen-1].value;
		arrData[3] = document.frm.dc_id_3[tableLen-1].value;
		arrData[4] = document.frm.start_dttm[tableLen-1].value;
		arrData[5] = document.frm.end_dttm[tableLen-1].value;
		arrData[6] = document.frm.reason[tableLen-1].value;
	}
	else {
		arrData[0] = document.frm.route_seq.value;
		arrData[1] = document.frm.dc_id_1.value;
		arrData[2] = document.frm.dc_id_2.value;
		arrData[3] = document.frm.dc_id_3.value;
		arrData[4] = document.frm.start_dttm.value;
		arrData[5] = document.frm.end_dttm.value;
		arrData[6] = document.frm.reason.value;
	}
	
}

// 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.route_seq[tableLen-1] ) {
		document.frm.route_seq[tableLen-1].value 	= arrData[0]; // 순번
		document.frm.dc_id_1[tableLen-1].value 		= arrData[1]; // 제1입고장
		document.frm.dc_id_2[tableLen-1].value      = arrData[2]; // 제2입고장
		document.frm.dc_id_3[tableLen-1].value 		= arrData[3]; // 제3입고장
		document.frm.start_dttm[tableLen-1].value 	= arrData[4]; // 적용시작일자
		document.frm.end_dttm[tableLen-1].value 	= arrData[5]; // 적용종료일자
		document.frm.reason[tableLen-1].value 	    = arrData[6]; // 사유
		
		setViewMode(document.frm.route_seq[tableLen-1]); 	// 순번
		setViewMode1(document.frm.dc_id_1[tableLen-1]); 	// 제1입고장
		setViewMode1(document.frm.dc_id_2[tableLen-1]);     // 제2입고장
		setViewMode1(document.frm.dc_id_3[tableLen-1]); 	// 제3입고장
		setViewMode1(document.frm.start_dttm[tableLen-1]); 	// 적용시작일자
		setViewMode1(document.frm.end_dttm[tableLen-1]);     // 적용종료일자
		setViewMode(document.frm.reason[tableLen-1]);       // 사유
	}
	else {
		document.frm.route_seq.value 	= arrData[0]; // 순번
		document.frm.dc_id_1.value 		= arrData[1]; // 제1입고장
		document.frm.dc_id_2.value      = arrData[2]; // 제2입고장
		document.frm.dc_id_3.value 		= arrData[3]; // 제3입고장
		document.frm.start_dttm.value 	= arrData[4]; // 적용시작일자
		document.frm.end_dttm.value 	= arrData[5]; // 적용종료일자
		document.frm.reason.value 	    = arrData[6]; // 사유
		
		setViewMode(document.frm.route_seq); 	// 순번
		setViewMode1(document.frm.dc_id_1); 	// 제1입고장
		setViewMode1(document.frm.dc_id_2);     // 제2입고장
		setViewMode1(document.frm.dc_id_3); 	// 제3입고장
		setViewMode1(document.frm.start_dttm); 	// 적용시작일자
		setViewMode1(document.frm.end_dttm);     // 적용종료일자
		setViewMode(document.frm.reason);       // 사유
	}
	
}

// 셀 저장 전역변수
var objTdG;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode1( objTdG );
	
}

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = left_tbody.rows.length;
	// 적용시작일자, 적용종료일자 셀인 경우
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) { // main_tbody.rows[...].cells error 인경우, 사용할것
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}else{
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	var objId = objBox.parentNode.id;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// 순번 --> 제1입고장
		if( objName == "route_seq" ) {
			objTdG = main_tbody.rows[rowIdx].cells[0];
		}
		// 제1입고장 --> 제2입고장
		else if( objName == "dc_id_1" ) {
			objTdG = main_tbody.rows[rowIdx].cells[1];
		}
		// 제2입고장 --> 제3입고장
		else if( objName == "dc_id_2" ) {
			objTdG = main_tbody.rows[rowIdx].cells[2];
		}
		// 제2입고장 --> 적용시작일자
		else if( objName == "dc_id_3" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// 적용시작일자 --> 적용종료일자
		else if( objName == "transDateTmp" && objId == "divValidStart") {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// 적용종료일자 --> 사유
		else if( objName == "transDateTmp" && objId == "divValidEnd") {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// 사유 --> 다음줄 순번
		else if( objName == "reason" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[3];
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[3];
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
	
	if(tableLen == 1){
		if( document.frm.route_seq.value == "" || document.frm.route_seq.value == null ) {
			alert("순번을 입력해 주십시요.");
			return;
		}		
	}else{
		for( var i=0 ; i < tableLen ; i++ ) {
			if( document.frm.route_seq[i].value == "" || document.frm.route_seq[i].value == null ) {
				alert("순번을 입력해 주십시요.");
				return;
			}	
		}	
	}
	
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// 조회 버튼 클릭
function GoSearch(service) {
	
	var tgt_loc_sel = document.frm.tgt_loc_sel.value;
	
	// 출고장을 선택하지 않은 경우
	if( tgt_loc_sel == "" ) {
		alert("출고장을 선택해 주십시요.");
	}
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// 날짜 형식을 체크하는 함수, return value : 1-맞는 형식, 0-잘못된 형식
function chkDate2(obj) {
	
	var separator = "-"; 
	
	var str = obj.value.trim();
	
	if( str == "" || str == null ){
		obj.value = str;
		setViewMode1(obj);
		return 1;
	}
	
	str = str.replace(/\//g, '').replace(/-/g, '');
	obj.value = str.substr(0, 4) + separator + str.substr(4, 2) + separator + str.substr(6, 2);
	
	var input = obj.value.trim(); 
	
	if ( input.length == 0 ) return 1; // 공백은 skip
	
	var dateType = "yyyy-MM-dd"; 
	var inputYear = input.substr(0,4); 
	var inputMonth = input.substr(5,2) - 1; 
	var inputDate = input.substr(8,2); 
	
	if( (input.substr(4,1) != "-" && input.substr(4,1) != "/") || (input.substr(7,1) != "-" && input.substr(7,1) != "/") ) 
	{ 
		separator = "invalid"; 
	}
	
	var resultDate = new Date(inputYear, inputMonth, inputDate); 
	if ( resultDate.getFullYear() != inputYear || resultDate.getMonth() != inputMonth || resultDate.getDate() != inputDate || input.length != 10 || separator == "invalid" ) 
	{ 
		obj.value = ""; 
		//obj.select(); 
		alertChkDate(input, dateType); 
		setEditMode( obj.parentNode );
		return 0; 
	} 
	else 
	{ 
		//setViewMode(obj);
		return 1; 
	} 
	
}
