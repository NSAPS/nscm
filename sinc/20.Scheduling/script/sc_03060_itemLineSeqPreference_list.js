
// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	//objTd.childNodes(1).select();
	objTd.childNodes(1).focus();
		
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	var objTd = objBox.parentNode;
		
	if( strVal != "" && strVal != null ) {
		// 숫자 체크
		if( checkNum(objBox, "BLANK_INT_UP") == false ) {
			objSetting(objBox, "", "숫자만 입력하여 주세요.");
			setEditMode( objTd );
			return;
		}
	}
	
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// 번호 setting
function setRowNo() {
	
	var tableLen = main_tbody.rows.length;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
		}
		else {
			divRowNo.innerHTML = "1";
		}
	}
	
}

// 
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// 저장
/*function GoSave( service ) {
	
	var sDate = document.frm.stored_duty_date.value;
	var eDate = document.frm.duty_date_to.value;
	
	if(sDate == null || sDate == "" || eDate == null || eDate == "" || sDate > eDate){
		alert("근무 일자 기간을 잘못 입력하였습니다.");
		return;
	}
			
	var tableLen = main_tbody.rows.length;
	var i = 0;
	var cnt = 0;
	while(i < tableLen){
		var checkNum = 0;
		var shift1 = document.frm.shift_1[i].value;
		var shift3 = document.frm.shift_3[i].value;
		var shift5 = document.frm.shift_5[i].value;
		if(document.frm.work_type[i].value == null || document.frm.work_type[i].value == ""){
			checkNum++;
		}
		if(shift1 == null || shift1 == ""){
			checkNum++;
			
		}
		if(shift3 == null || shift3 == ""){
			checkNum++;
		}
		if(shift5 == null || shift5 == ""){
			checkNum++;			
		}
		
		if(checkNum != 0 && checkNum != 4){
			alert( (i+1) + "번 행의 항목을 모두 선택 하십시오.");
			return;
		}
		else{
			cnt++;
		}
		
		if((shift1 != null && shift1 != "" && shift3 != null && shift3 != "" && shift5 != null && shift5 != "" )
			&&(shift1 == shift3 || shift1 == shift5 || shift3 == shift5)){
				alert((i+1) + "번 행에 중복된 값이 있습니다.");
				return;
		}
			
		i++;
	}
	if(cnt == 0){
		alert("한 건 이상의 자료를 입력 해야합니다.");
		return;
	}
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}*/

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		
		if( objName == "priority" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = main_tbody.rows[0].cells[8];
				}
				else {
					objTdG = main_tbody.rows.cells[8];
				}
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[8];
				}
				else {
					objTdG = main_tbody.rows.cells[8];
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

