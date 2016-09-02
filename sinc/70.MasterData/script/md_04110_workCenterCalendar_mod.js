
// 이전화면으로 이동
function moveBack() {
	
	var sel_plant = document.frm.sel_plant.value;
	var sel_line = document.frm.sel_line.value;
	var sel_cycle_type = document.frm.sel_cycle_type.value;
	var sel_cal_grp = document.frm.sel_cal_grp.value;

	var urlStr = "service.do?_moon_service=md_04110_workCenterCalendar_list";
	urlStr += "&sel_plant=" + sel_plant + "&sel_line=" + sel_line + "&sel_cycle_type=" + sel_cycle_type+ "&sel_cal_grp=" + sel_cal_grp;

	location.href = urlStr;

}

// 삭제 check박스 체크시에 idu_flag를 'D'로 셋팅해서 실제 저장시 삭제되도록 한다.
function doChangeDel(obj) {
	var rowIdx = obj.parentNode.parentNode.rowIndex;

	if(obj.checked){
		if(document.frm.idu_flag[rowIdx])
			document.frm.idu_flag[rowIdx].value = "D";
		else
			document.frm.idu_flag.value = "D";
	}
	else{
		if(document.frm.idu_flag[rowIdx])
			document.frm.idu_flag[rowIdx].value = "U";
		else
			document.frm.idu_flag.value = "U";
	}
	
}

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).select();
		
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// combo box 를 Edit Mode 로 변환
function setEditMode1( objTd ) {
	setCalAllViewMode();	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();

}

// combo box 를 View Mode 로 변환
function setViewMode1(objBox, gubn) {

 	var	strVal1 = objBox.options[objBox.selectedIndex].value;
 	var	strVal2 = objBox.options[objBox.selectedIndex].text;

	if (gubn == 0) 
		objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal1+"&nbsp;" + strVal2;
	else
		objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal2;
		
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";

}

// 날짜선택부분 onChange
function setCalonChange(objBox) {

	var rowIdx = objBox.parentNode.rowIndex;
	var objyyyymmdd = objBox.childNodes(1).childNodes(1);
	var objhour		= objBox.childNodes(1).childNodes(5);
	var objmin		= objBox.childNodes(1).childNodes(7);

	if(objyyyymmdd[rowIdx]){
	 	var strYYYYMMDD = objyyyymmdd[rowIdx].value;
	 	var strHour = objhour[rowIdx].value;
	 	var strMin = objmin[rowIdx].value;
	}
	else{
	 	var strYYYYMMDD = objyyyymmdd.value;
	 	var	strHour = objhour.value;
	 	var strMin = objmin.value;
	}

	objBox.childNodes(0).innerHTML = strYYYYMMDD+"&nbsp;" + strHour+":"+strMin+":00";
	objBox.childNodes(0).style.display = "block";
	objBox.childNodes(1).style.display = "none";
	
}


function setCalAllViewMode(){
	// 날짜 object는 다른 object가 edit mode가 되어야 view mode로 전환됨.
	var rowCnt = left_tbody.rows.length;
	for(i=0 ; i < rowCnt ; i++){
		if(rowCnt > 1){
				setCalonChange(td_strt_dttm[i]);
				setCalonChange(td_end_dttm[i]);
		}
		else{
				setCalonChange(td_strt_dttm);
				setCalonChange(td_end_dttm);
		}
	}
}

// 코드 String 체크
// 영문 & _ (underscore) 만 허용, 영문은 대문자로 변환
function chkCodeStr( objBox ) {
	
	var output = new String;
	var tmp; 
	
	var str = objBox.value.toUpperCase();
	var strSize = str.length;
	
	for (i = 0; i < strSize; i++) 
	{ 
		var charStr = str.charCodeAt(i);
		if( ( 48 <= charStr && charStr <= 57 ) // 0 ~ 9 
				|| ( 65 <= charStr && charStr <= 90 ) // A ~ Z
				|| ( 97 <= charStr && charStr <= 122 ) // a ~ z 
				|| ( charStr == 95 ) ) // _ (underscore)
		{ 
			output += String.fromCharCode( charStr ); 
		} 
		else 
		{ 
			// no action
			// alert("영문, 숫자, Underscore 이외의 문자는 입력할 수 없습니다."); return false; 
		} 
	} 
		
	objBox.value = output;
	
}


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
	var oCell2 = oRowLeft.insertCell(); // Line 명
	var oCell3 = oRowLeft.insertCell(); // 작업장 명
	var oCell4 = oRowMain.insertCell(); // 시작일시
	var oCell5 = oRowMain.insertCell(); // 종료일시
	var oCell6 = oRowMain.insertCell(); // 반복주기
	var oCell7 = oRowMain.insertCell(); // TYPE
	var oCell8 = oRowMain.insertCell(); // 칼렌다구분
	var oCell9 = oRowMain.insertCell(); // 비고
	var oCell10 = oRowMain.insertCell(); // 적용여부
	

	oCell3.id = "proc"; // Workcenter id	
	oCell4.id = "td_strt_dttm"; 
	oCell5.id = "td_end_dttm"; 	

	oCell2.ondblclick = function() { setEditMode1(this); }; // Line
	oCell3.ondblclick = function() { setEditMode1(this); }; // Workcenter	
	oCell4.ondblclick = function() { setEditMode1(this); }; // 시작일시
	oCell5.ondblclick = function() { setEditMode1(this); }; // 종료일시
	oCell6.ondblclick = function() { setEditMode1(this); }; // 반복주기
	oCell7.ondblclick = function() { setEditMode1(this); }; // TYPE
	oCell8.ondblclick = function() { setEditMode1(this); }; // 칼렌다구분
	oCell9.ondblclick = function() { setEditMode(this); }; // 비고
	oCell10.ondblclick = function() { setEditMode1(this); }; // 적용여부
	
	oCell0.align = "center"; oCell0.width = "30px"; // 번호
	oCell1.align = "center"; oCell1.width = "30px"; // 삭제
	oCell2.align = "left"; oCell2.width = "150px";  // Line 명
	oCell3.align = "left"; oCell3.width = "200px";  // 작업장 명
	oCell4.align = "center"; oCell4.width = "200px";  // 시작일시
	oCell5.align = "center"; oCell5.width = "200px";  // 종료일시
	oCell6.align = "center"; oCell6.width = "90px";  // 반복주기
	oCell7.align = "center"; oCell7.width = "90px";  // TYPE
	oCell8.align = "center"; oCell8.width = "100px";  // 칼렌다구분
	oCell9.align = "left"; oCell9.width = "300px";  // 비고
	oCell10.align = "center"; oCell10.width = "60px";  // 적용여부
	
	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a><input type=\"hidden\" name=\"idu_flag\" value=\"I\">"; 
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// 삭제
	oCell1.innerHTML = "<input name=\"check_del\" type=\"checkbox\" class=\"normal\" onClick=\"doChangeDel(this);\" >";
	// Line 명

	line_combo(oCell2);
	// 작업장 명 
	oCell3.innerHTML = "<a id=\"divIn_Proc\">&nbsp;*&nbsp;전체</a><select \n" +
					   "name=\"in_proc\" onChange=\"chkDupProc(this);\" onFocusOut=\"setViewMode1(this,0); \" \n" +
					   "style=\"width:100%; padding-left:5px; display:none;\" >\n" +
					   "<option  value=\"*\" selected >전체</option></select>\n" +
					   "<input type=\"hidden\" name=\"old_proc\" value=\"*\">";
	// 시작일시
	strt_dttm_obj(oCell4, rowNo+1);
	// 종료일시
	end_dttm_obj(oCell5, rowNo+1);
	// 반복주기
	cycle_type_combo(oCell6);
	// TYPE
	cal_type_combo(oCell7);
	// 칼렌다구분
	cal_grp_combo(oCell8);
	// 비고
	oCell9.innerHTML = "<a id=\"divIn_description\"></a><input type=\"text\" name=\"in_description\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// 적용여부
	use_flag_combo(oCell10);
	
	document.recalc();
	setRowNo();
	
}

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

// num 수만큼 행 추가
function addRows( num ) {
	
	for( var i=0; i<num ; ++i ) {
		addRow();
	}
}

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

// 중복 체크
function chkDupProc( obj ) {
	
	if( obj.value == null || obj.value == "" ) {
		return;
	}
	var rowIdx = obj.parentNode.parentNode.rowIndex;
 	var	strPlant 	= document.frm.sel_plant.value;
	var	strLine 	= document.frm.in_line[rowIdx].value;
 	var	strProc 	= obj.value;
	var tableLen = left_tbody.rows.length;
	
	var cntEq = 0; // 중복 counting
	for( var i=0 ; i < tableLen ; i++ ) {
		if( document.frm.in_line[i] ) {
			if( document.frm.in_line[i].value == strLine && document.frm.in_proc[i].value == strProc ) {
				cntEq++;
			}
		}
	}
	if( cntEq > 1 ) {
		alert("중복된 달력값이 존재합니다.");
		setEditMode1(obj.parentNode);
		return;
	}
}

// 저장 실행 전에 key 중복을 체크하고 해당항목을 focus한다.
function chkKeyDup() {
	var tableLen = left_tbody.rows.length;
	if (tableLen == 1) return; // 중복조사 필요없다.
	// 초기 Line, workcenter id
 	var	strLine 	= "";
 	var	strProc 	= "";
 	var	strStart_dttm 	= "";
 	var cntEq = 0;
		
	var cntEq = 0; // 중복 counting
	for( var j=0 ; j < tableLen ; j++) {
	 	strLine 	= document.frm.in_line[j].value;
	 	strProc 	= document.frm.in_proc[j].value;
	 	strStart_dttm 	= document.frm.new_strt_dttm[j].value;

		for( var i=0 ; i < tableLen ; i++ ) {
			if( document.frm.in_line[i].value == strLine && document.frm.in_proc[i].value == strProc 
			    && document.frm.new_strt_dttm[i].value == strStart_dttm ) {
				cntEq++;
				if( cntEq > 1 ) {
					alert(i+1+"행에 중복된 달력값이 존재합니다. 정정후 저장하세요!");
					setEditMode1(document.frm.in_line[i].parentNode);
					return true;
				}
				
			}
		}
		cntEq = 0;
	}
	return false;
}

// 정장 전에 변경된 시작,종료일시 반영을 위해 달력,시,분 object에서 hidden 변수로 copy 한다
function copyDTTM(){
	var tableLen = left_tbody.rows.length;
 	var	strsYYYYMMDD 	= "";
 	var	strsHOUR 	= "";
 	var	strsMIN 	= "";
 	var	streYYYYMMDD 	= "";
 	var	streHOUR 	= "";
 	var	streMIN 	= "";

	if(tableLen > 1){
		for( var i=0 ; i < tableLen ; i++){

		 	strsYYYYMMDD 	= document.getElementsByName( "in_strt_dttm"+(i+1))[0].value;
		 	strsHOUR 		= document.frm.strt_hour[i].value;
		 	strsMIN 		= document.frm.strt_min[i].value;
		 	streYYYYMMDD 	= document.getElementsByName( "in_end_dttm"+(i+1))[0].value;
		 	streHOUR 		= document.frm.end_hour[i].value;
		 	streMIN 		= document.frm.end_min[i].value;
		 	
		 	document.frm.new_strt_dttm[i].value = strsYYYYMMDD+"&nbsp;" + strsHOUR+":"+strsMIN+":00";
		 	document.frm.new_end_dttm[i].value = streYYYYMMDD+"&nbsp;" + streHOUR+":"+streMIN+":00";
		}
	}
	else{
		 	strsYYYYMMDD 	= document.getElementsByName( "in_strt_dttm1")[0].value;
		 	strsHOUR 		= document.frm.strt_hour.value;
		 	strsMIN 		= document.frm.strt_min.value;
		 	streYYYYMMDD 	= document.getElementsByName( "in_end_dttm1")[0].value;
		 	streHOUR 		= document.frm.end_hour.value;
		 	streMIN 		= document.frm.end_min.value;

		 	document.frm.new_strt_dttm.value = strsYYYYMMDD+"&nbsp;" + strsHOUR+":"+strsMIN+":00";
		 	document.frm.new_end_dttm.value = streYYYYMMDD+"&nbsp;" + streHOUR+":"+streMIN+":00";
	}	
	
} 

// 저장
function GoSave( service ) {

	var tableLen = left_tbody.rows.length;
	// 코드 등록 counting : 하나도 등록하지 않은 경우 저장하지 않음
	if( tableLen == 0 ) {
		alert("항목을 하나 이상 입력해야 합니다.");
		return;
	}
	// 정장 전에 변경된 시작,종료일시 반영을 위해 달력,시,분 object에서 hidden 변수로 copy 한다
	copyDTTM();
	
	for( var i = 0; i < tableLen ; i++ ) {
		if( tableLen > 1 ) {
			if( document.getElementsByName( "in_strt_dttm"+(i+1))[0].value == null || document.getElementsByName( "in_strt_dttm"+(i+1))[0].value == "" ) {
				alert("휴무 시작일시를 입력하십시요!");
				setEditMode1(document.getElementsByName( "in_strt_dttm"+(i+1))[0].parentNode.parentNode);
				return;
			}
			 
			if( document.getElementsByName( "in_end_dttm"+(i+1))[0].value == null || document.getElementsByName( "in_end_dttm"+(i+1))[0].value == "" ) {
				alert("휴무 종료일시를 입력하십시요!");
				setEditMode1(document.getElementsByName( "in_end_dttm"+(i+1))[0].parentNode.parentNode);
				return;
			}
			// 종료날짜가 시작날짜보다 크지 않은지 확인
			if(delDateDelimiter(document.getElementsByName( "in_end_dttm"+(i+1))[0].value)
			     -delDateDelimiter(document.getElementsByName( "in_strt_dttm"+(i+1))[0].value)<0) {
				alert(i+"열의 종료일자가 시작일자보다 빠릅니다!");
				setEditMode1(document.getElementsByName( "in_strt_dttm"+(i+1))[0].parentNode.parentNode);
				return;
			}
			
			
		}
		else {
			if( document.getElementsByName( "in_strt_dttm1")[0].value == null || document.getElementsByName( "in_strt_dttm1")[0].value == "" ) {
				alert("휴무 시작일시를 입력하십시요!");
				setEditMode1(document.getElementsByName( "in_strt_dttm")[0].parentNode.parentNode);
				return;
			}
			 
			if( document.getElementsByName( "in_end_dttm1")[0].value == null || document.getElementsByName( "in_end_dttm1")[0].value == "" ) {
				alert("휴무 종료일시를 입력하십시요!");
				setEditMode(document.getElementsByName( "in_end_dttm")[0].parentNode.parentNode);
				return;
			}
			// 종료날짜가 시작날짜보다 크지 않은지 확인
			if(delDateDelimiter(document.getElementsByName( "in_end_dttm1")[0].value)
			     -delDateDelimiter(document.getElementsByName( "in_strt_dttm1")[0].value)<0) {
				alert(i+"열의 종료일자가 시작일자보다 빠릅니다!");
				setEditMode1(document.getElementsByName( "in_strt_dttm")[0].parentNode.parentNode);
				return;
			}

		}
	}

	
	// 수정/신규 항목중에 중복항목이 있는지 점검
	if(chkKeyDup()) return;

	viewWait();

	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();

}

