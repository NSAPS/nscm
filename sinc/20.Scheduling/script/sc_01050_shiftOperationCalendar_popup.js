
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
	
	if(chkTime(objBox) == -1 && (strVal != null && strVal != "")) return; //입력형식 체크

	objBox.parentNode.childNodes(0).innerHTML = strVal;
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
// 셀 저장 전역변수
var objTdG;
// 
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// 저장
function GoSave( service ) {

	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER 
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		// 일요일 조 착수 -> 일요일 조 완료
		if( objName == "shift_1_sun_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				//alert("!!");
				objTdG = main_tbody.rows[rowIdx].cells[1];
			}
			else {
				objTdG = main_tbody.rows.cells[1];
			}
		}
		// 일요일 조 완료 -> 일요일 주 착수
		else if( objName == "shift_1_sun_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// 일요일 주 착수 -> 일요일 주 완료
		else if( objName == "shift_3_sun_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = main_tbody.rows.cells[3];
			}
		}	
		// 일요일 주 완료 -> 일요일 야 착수
		else if( objName == "shift_3_sun_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else {
				objTdG = main_tbody.rows.cells[4];
			}
		}
		// 일요일 야 착수 -> 일요일 야 완료
		else if( objName == "shift_5_sun_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[5];
			}
			else {
				objTdG = main_tbody.rows.cells[5];
			}
		}
		// 일요일 야 완료 -> 월요일 조 착수
		else if( objName == "shift_5_sun_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[6];
			}
			else {
				objTdG = main_tbody.rows.cells[6];
			}
		}
		// 월요일 조 착수 -> 월요일 조 완료
		else if( objName == "shift_1_mon_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[7];
			}
			else {
				objTdG = main_tbody.rows.cells[7];
			}
		}
		// 월요일 조 완료 -> 월요일 주 착수
		else if( objName == "shift_1_mon_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[8];
			}
			else {
				objTdG = main_tbody.rows.cells[8];
			}
		}
		// 월요일 주 착수 -> 월요일 주 완료
		else if( objName == "shift_3_mon_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[9];
			}
			else {
				objTdG = main_tbody.rows.cells[9];
			}
		}
		// 월요일 주 완료 -> 월요일 야 착수
		else if( objName == "shift_3_mon_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[10];
			}
			else {
				objTdG = main_tbody.rows.cells[10];
			}
		}
		// 월요일 야 착수 -> 월요일 야 완료
		else if( objName == "shift_5_mon_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[11];
			}
			else {
				objTdG = main_tbody.rows.cells[11];
			}
		}
		// 월요일 야 완료 -> 화요일 조 착수
		else if( objName == "shift_5_mon_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[12];
			}
			else {
				objTdG = main_tbody.rows.cells[12];
			}
		}
		// 화요일 조 착수 -> 화요일 조 완료
		else if( objName == "shift_1_tue_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[13];
			}
			else {
				objTdG = main_tbody.rows.cells[13];
			}
		}
		// 화요일 조 완료 -> 화요일 주 착수
		else if( objName == "shift_1_tue_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[14];
			}
			else {
				objTdG = main_tbody.rows.cells[14];
			}
		}
		// 화요일 주 착수 -> 화요일 주 완료
		else if( objName == "shift_3_tue_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[15];
			}
			else {
				objTdG = main_tbody.rows.cells[15];
			}
		}
		// 화요일 주 완료 -> 화요일 야 착수
		else if( objName == "shift_3_tue_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[16];
			}
			else {
				objTdG = main_tbody.rows.cells[16];
			}
		}
		// 화요일 야 착수 -> 화요일 야 완료
		else if( objName == "shift_5_tue_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[17];
			}
			else {
				objTdG = main_tbody.rows.cells[17];
			}
		}
		// 화요일 야 완료 -> 수요일 조 착수
		else if( objName == "shift_5_tue_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[18];
			}
			else {
				objTdG = main_tbody.rows.cells[18];
			}
		}
		// 수요일 조 착수 -> 수요일 조 완료
		else if( objName == "shift_1_wed_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[19];
			}
			else {
				objTdG = main_tbody.rows.cells[19];
			}
		}
		// 수요일 조 완료 -> 수요일 주 착수
		else if( objName == "shift_1_wed_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[20];
			}
			else {
				objTdG = main_tbody.rows.cells[20];
			}
		}
		// 수요일 주 착수 --> 수요일 주 완료
		else if( objName == "shift_3_wed_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[21];
			}
			else {
				objTdG = main_tbody.rows.cells[21];
			}
		}
		// 수요일 주 완료 --> 수요일 야 착수
		else if( objName == "shift_3_wed_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[22];
			}
			else {
				objTdG = main_tbody.rows.cells[22];
			}
		}
		// 수요일 야 착수 --> 수요일 야 완료
		else if( objName == "shift_5_wed_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[23];
			}
			else {
				objTdG = main_tbody.rows.cells[23];
			}
		}
		// 수요일 야 완료 --> 목요일 조 착수
		else if( objName == "shift_5_wed_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[24];
			}
			else {
				objTdG = main_tbody.rows.cells[24];
			}
		}
		// 목요일 조 착수 --> 목요일 조 완료
		else if( objName == "shift_1_thu_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[25];
			}
			else {
				objTdG = main_tbody.rows.cells[25];
			}
		}
		// 목요일 조 완료 --> 목요일 주 착수
		else if( objName == "shift_1_thu_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[26];
			}
			else {
				objTdG = main_tbody.rows.cells[26];
			}
		}
		// 목요일 주 착수 --> 목요일 주 완료
		else if( objName == "shift_3_thu_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[27];
			}
			else {
				objTdG = main_tbody.rows.cells[27];
			}
		}
		// 목요일 주 완료 --> 목요일 야 착수
		else if( objName == "shift_3_thu_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[28];
			}
			else {
				objTdG = main_tbody.rows.cells[28];
			}
		}
		// 목요일 야 착수 --> 목요일 야 완료
		else if( objName == "shift_5_thu_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[29];
			}
			else {
				objTdG = main_tbody.rows.cells[29];
			}
		}
		// 목요일 야 완료 --> 금요일 조 착수
		else if( objName == "shift_5_thu_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[30];
			}
			else {
				objTdG = main_tbody.rows.cells[30];
			}
		}
		// 금요일 조 착수 --> 금요일 조 완료
		else if( objName == "shift_1_fri_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[31];
			}
			else {
				objTdG = main_tbody.rows.cells[31];
			}
		}
		// 금요일 조 완료 --> 금요일 주 착수
		else if( objName == "shift_1_fri_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[32];
			}
			else {
				objTdG = main_tbody.rows.cells[32];
			}
		}
		// 금요일 주 착수 --> 금요일 주 완료
		else if( objName == "shift_3_fri_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[33];
			}
			else {
				objTdG = main_tbody.rows.cells[33];
			}
		}
		// 금요일 주 완료 --> 금요일 야 착수
		else if( objName == "shift_3_fri_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[34];
			}
			else {
				objTdG = main_tbody.rows.cells[34];
			}
		}
		// 금요일 야 착수 --> 금요일 야 완료
		else if( objName == "shift_5_fri_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[35];
			}
			else {
				objTdG = main_tbody.rows.cells[35];
			}
		}
		// 금요일 야 완료 --> 토요일 조 착수
		else if( objName == "shift_5_fri_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[36];
			}
			else {
				objTdG = main_tbody.rows.cells[36];
			}
		}
		// 토요일 조 착수 --> 토요일 조 완료
		else if( objName == "shift_1_sat_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[37];
			}
			else {
				objTdG = main_tbody.rows.cells[37];
			}
		}
		// 토요일 조 완료 --> 토요일 주 착수
		else if( objName == "shift_1_sat_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[38];
			}
			else {
				objTdG = main_tbody.rows.cells[38];
			}
		}
		// 토요일 주 착수 --> 토요일 주 완료
		else if( objName == "shift_3_sat_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[39];
			}
			else {
				objTdG = main_tbody.rows.cells[39];
			}
		}
		// 토요일 주 완료 --> 토요일 야 착수
		else if( objName == "shift_3_sat_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[40];
			}
			else {
				objTdG = main_tbody.rows.cells[40];
			}
		}
		// 토요일 야 착수 --> 토요일 야 완료
		else if( objName == "shift_5_sat_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[41];
			}
			else {
				objTdG = main_tbody.rows.cells[41];
			}
		}
		// 토요일 야 완료 --> 다음줄
		else if( objName == "shift_5_sat_end" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = main_tbody.rows[0].cells[0];
				}
				else {
					objTdG = main_tbody.rows.cells[0];
				}
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[0];
				}
				else {
					objTdG = main_tbody.rows.cells[0];
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

// 체크 박스 전체 선택/해제
function checkAll(obj){
	//alert(obj.value);
	var tabLen = main_tbody.rows.length;
	//alert(tabLen); 
	if(obj.value == "N"){
		if( tabLen == 1){
			document.frm.check_modify.checked = true;
			document.frm.check_modify.value = "Y";	
			document.frm.checkModify.value = "Y";
		}
		else{
			for( i = 0; i < tabLen; i++){			
				document.frm.check_modify[i].checked = true;
				document.frm.check_modify[i].value = "Y";	
				document.frm.checkModify[i].value = "Y";	
			}
		}
		obj.value = "Y";	
	}
	else{
		if( tabLen == 1){
			document.frm.check_modify.checked = false;
			document.frm.check_modify.value = "N";
			document.frm.checkModify.value = "N";			
		}
		else{
			for( i = 0; i < tabLen; i++){
				document.frm.check_modify[i].checked = false;
				document.frm.check_modify[i].value = "N";
				document.frm.checkModify[i].value = "N";				
			}			
		}		
		obj.value = "N";	
			
	}
};

// 체크 박스 선택/해제
function checkEvent(obj){
	
	var idx = obj.parentNode.parentNode.rowIndex;
	
	if(obj.value == "N"){
		obj.checked = true;
		obj.value = "Y";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "Y";			
		}
		else{
			document.frm.checkModify.value = "Y";			
		}
	}
	else{
		obj.checked = false;
		obj.value = "N";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "N";			
		}
		else{
			document.frm.checkModify.value = "N";			
		}
	}
};

// 선택한 요일, shift, start/end 시간 일괄 적용
function shiftChangeTimeBatch(){
	
	if(chkTime(document.frm.input_time) < 0) return; // 입력 시간 체크
	
	var tabLen = main_tbody.rows.length; // 라인 수
	
	/* 요일 : 일(0), 월(6), 화(12), 수(18), 목(24), 금(30), 토(36)
	   shift : 조(0), 주(2), 야(4)
	   착수/완료 : 착수(0), 완료(1) 
	    
	   요일 + shift + 착수/완료 = 변경할 인덱스
	*/
	var day = Number(document.frm.selected_duty_day.value); // 요일
	var shift = Number(document.frm.selected_shift.value); // 조/주/야
	var stat = Number(document.frm.selected_start_end.value); // 착수/완료
	var inputTime = document.frm.input_time.value; // 입력 시간 
	var idx = day + shift + stat; // 인덱스
		
	if(tabLen == 1 && document.frm.checkModify.value == "Y"){ // 라인이 한줄이고 체크 박스가 체크된 상태
				
		var objShiftTime = main_tbody.rows(0).childNodes(idx).childNodes(1); // 선택 조건의 객체(input box)를 얻어 옴.
		if(objShiftTime.value == null || objShiftTime.value == "") return; // 값이 없으면 return
		//alert(objShiftTime.name);
		objShiftTime.value = inputTime; // value에 입력시간 입력
		setViewMode(objShiftTime); // <a> 태그의 display 값도 변경하기 위해 setViewMode()함수 호출
	}
	else{
		for(i = 0; i < tabLen; i++){
			if(document.frm.checkModify[i]){
				if(document.frm.checkModify[i].value == "Y"){ // 체크 박스가 선택된 라인만 적용
					
					var objShiftTime = main_tbody.rows(i).childNodes(idx).childNodes(1); // 선택 조건의 객체(input box)를 얻어 옴.
					if(objShiftTime.value == null || objShiftTime.value == "") continue; // 값이 없으면 return
					
					objShiftTime.value = inputTime; // value에 입력시간 입력
					setViewMode(objShiftTime); // <a> 태그의 display 값도 변경하기 위해 setViewMode()함수 호출
				}
			}
		}
	}
};

// 입력 시간 형식 체크
function chkTime(obj){
	
	if(obj.value == null || obj.value == "" ) return -1;
	
	//var val = Number(obj.value);
	var val = obj.value;
	
	if( val.length != 6){ // 자리수 체크
		alert("잘못된 형식 입니다.\nex) 060000 또는 231020 ");
		obj.value = "";
		obj.focus();
		return -1;
	}
	if( val < "000000" || val > "235959" ){ // 시간 체크
		alert("잘못된 형식 입니다.\nex) 060000 또는 231020 ");
		obj.value = "";
		obj.focus();
		return -1;
	}
	
};
