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
//	if( objBox.name == "work_type"){
//		if( objBox.options[objBox.selectedIndex].text == "선택" ){
//			objBox.parentNode.childNodes(0).innerHTML = " ";
//		}
//		else{
//			objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + objBox.options[objBox.selectedIndex].text;
//		}
//	}
//	else{
//		objBox.parentNode.childNodes(0).innerHTML = strVal;
//	}
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
	
	viewWait();

//	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

GoSearch = function(service) {
	
	if(service == "sc_01050_shiftOperationCalendar_list_change_comp"){
		if(document.frm.selected_line.value == null || document.frm.selected_line.value == ""){
			alert("라인을 선택하지 않았습니다. 라인을 선택해 주십시오.");
			return;
		}
		
		if(!confirm("변경 하시겠습니까?")){
		return;
	}
	}
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

function SaveApplyWorkDiaryNext() {
	
	var selected_plant = document.frm.selected_plant.value;
	var duty_date = document.frm.duty_date.value;

	var selected_plant_text = document.frm.selected_plant.options[document.frm.selected_plant.selectedIndex].text // 선택항목 text

	if(selected_plant == "" || selected_plant == null) {
		alert("작업할 공장을 선택해주십시요!");
		return;
	}
	if(duty_date == "" || duty_date == null) {
		alert("작업날짜를 입력해주십시요!");
		return;
	}
//alert(selected_plant+"!%!"+duty_date+" "+selected_plant_text);
	
	if(confirm("현재 "+selected_plant_text +"의 조운영칼렌다를 차주 이후로 적용하시겠습니까?") == 1 ){
		viewWait();
		commonUtil.executeQuery("selected_plant!%!duty_date", selected_plant+"!%!"+duty_date, "sc_01050_SP_PS_WORK_DIARY_PLANT", {
			callback:function(result){
				if(result == "SUCCESS"){
					
				}
				else{
					alert("조운영칼렌다의 차주반영에 문제가 있습니다. 관리자에게 전화해주십시오.");
					return;
				}
				gridArea.style.display = "block";
				waitArea.style.display = "none";
			}
		});
	}
	
}

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER 
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		// 일요일 조 -> 일요일 주
		if( objName == "shift_1_sun" ) {
			if( main_tbody.rows[rowIdx] ) {
				//alert("!!");
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// 일요일 주 -> 일요일 야
		else if( objName == "shift_3_sun" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else {
				objTdG = main_tbody.rows.cells[4];
			}
		}
		// 일요일 야 -> 월요일 조
		else if( objName == "shift_5_sun" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[6];
			}
			else {
				objTdG = main_tbody.rows.cells[6];
			}
		}	
		// 월요일 조 -> 월요일 주
		else if( objName == "shift_1_mon" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[8];
			}
			else {
				objTdG = main_tbody.rows.cells[8];
			}
		}
		// 월요일 주 -> 월요일 야
		else if( objName == "shift_3_mon" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[10];
			}
			else {
				objTdG = main_tbody.rows.cells[10];
			}
		}
		// 월요일 야 -> 화요일 조
		else if( objName == "shift_5_mon" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[12];
			}
			else {
				objTdG = main_tbody.rows.cells[12];
			}
		}
		// 화요일 조 -> 화요일 주
		else if( objName == "shift_1_tue" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[14];
			}
			else {
				objTdG = main_tbody.rows.cells[14];
			}
		}
		// 화요일 주 -> 화요일 야
		else if( objName == "shift_3_tue" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[16];
			}
			else {
				objTdG = main_tbody.rows.cells[16];
			}
		}
		// 화요일 야 -> 수요일 조
		else if( objName == "shift_5_tue" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[18];
			}
			else {
				objTdG = main_tbody.rows.cells[18];
			}
		}
		// 수요일 조 -> 수요일 주
		else if( objName == "shift_1_wed" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[20];
			}
			else {
				objTdG = main_tbody.rows.cells[20];
			}
		}
		// 수요일 주 -> 수요일 야
		else if( objName == "shift_3_wed" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[22];
			}
			else {
				objTdG = main_tbody.rows.cells[22];
			}
		}
		// 수요일 야 -> 목요일 조
		else if( objName == "shift_5_wed" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[24];
			}
			else {
				objTdG = main_tbody.rows.cells[24];
			}
		}
		// 목요일 조 -> 목요일 주
		else if( objName == "shift_1_thu" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[26];
			}
			else {
				objTdG = main_tbody.rows.cells[26];
			}
		}
		// 목요일 주 -> 목요일 야
		else if( objName == "shift_3_thu" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[28];
			}
			else {
				objTdG = main_tbody.rows.cells[28];
			}
		}
		// 목요일 야 -> 금요일 조
		else if( objName == "shift_5_thu" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[30];
			}
			else {
				objTdG = main_tbody.rows.cells[30];
			}
		}
		// 금요일 조 -> 금요일 주
		else if( objName == "shift_1_fri" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[32];
			}
			else {
				objTdG = main_tbody.rows.cells[32];
			}
		}
		// 금요일 주 -> 금요일 야
		else if( objName == "shift_3_fri" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[34];
			}
			else {
				objTdG = main_tbody.rows.cells[34];
			}
		}
		// 금요일 야 -> 토요일 조
		else if( objName == "shift_5_fri" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[36];
			}
			else {
				objTdG = main_tbody.rows.cells[36];
			}
		}
		// 토요일 조 -> 토요일 주
		else if( objName == "shift_1_sat" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[38];
			}
			else {
				objTdG = main_tbody.rows.cells[38];
			}
		}
		// 토요일 주 -> 토요일 야
		else if( objName == "shift_3_sat" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[40];
			}
			else {
				objTdG = main_tbody.rows.cells[40];
			}
		}
		// 토요일 야 --> 다음줄 코드
		else if( objName == "shift_5_sat" ) {
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

// 정상 => 연장, 연장 => 정상
function changeStatus(obj){
	if(obj.value == "정상"){
		obj.value = "연장";
		obj.parentNode.previousSibling.style.backgroundColor = "#d0d0d0"
		obj.style.color = "#ff0000";
	}
	else{
		obj.value = "정상";
		obj.parentNode.previousSibling.style.backgroundColor = "#ffffff"
		obj.style.color = "#000000";
	}
	
	var checkFlag = obj.parentNode.childNodes(1);
	//alert(checkFlag.value);
	// check_flag 값에 따른 변경 사항
	// 0 : 변경 사항 없음.
	// 1 : 근무조만 변경.
	// 2 : 연장/정상 정보만 변경.
	// 3 : 근무조, 연장/정상 정보 둘다 변경.
	if(checkFlag.value == "0"){
		checkFlag.value = "2";
	}
	else if(checkFlag.value == "1"){
		checkFlag.value = "3";
	}
	else if(checkFlag.value == "2"){
		checkFlag.value = "0";
	}
	else if(checkFlag.value == "3"){
		checkFlag.value = "1";
	}
	//alert(checkFlag.value);
	//alert(checkFlag.name + "," + checkFlag.value);
	/*if(obj.name == "change_sun_sihft1"){
		if(document.frm.sun_shift1_check_flag.value == "N"){
			document.frm.sun_shift1_check_flag.value = "Y";
		}
		else{
			document.frm.sun_shift1_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_sun_sihft3"){
		if(document.frm.sun_shift3_check_flag.value == "N"){
			document.frm.sun_shift3_check_flag.value = "Y";
		}
		else{
			document.frm.sun_shift3_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_sun_sihft5"){
		if(document.frm.sun_shift5_check_flag.value == "N"){
			document.frm.sun_shift5_check_flag.value = "Y";
		}
		else{
			document.frm.sun_shift5_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_mon_sihft1"){
		if(document.frm.mon_shift1_check_flag.value == "N"){
			document.frm.mon_shift1_check_flag.value = "Y";
		}
		else{
			document.frm.mon_shift1_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_mon_sihft3"){
		if(document.frm.mon_shift3_check_flag.value == "N"){
			document.frm.mon_shift3_check_flag.value = "Y";
		}
		else{
			document.frm.mon_shift3_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_mon_sihft5"){
		if(document.frm.mon_shift5_check_flag.value == "N"){
			document.frm.mon_shift5_check_flag.value = "Y";
		}
		else{
			document.frm.mon_shift5_check_flag.value = "N";
		}
	}
	*/
};

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

// 선택한 기간에 shift를 일괄적용
function shiftChangeBatch(){
	
	var tabLen = main_tbody.rows.length;
	
	/* 시작, 끝 요일 : 일(0), 월(6), 화(12), 수(18), 목(24), 금(30), 토(36)
	   조(1), 주(3), 야(5)
	   연장(O), 정상(N) */
	var dayFrom = document.frm.selected_duty_day_from.value; // 시작 요일
	var dayTo = document.frm.selected_duty_day_to.value; // 끝 요일
	var shift = document.frm.selected_shift.value; // 조/주/야
	var stat = document.frm.selected_o_n.value; // 연장/정상
	var cnt = 6;
	var startCnt = Number(dayFrom);
	if(shift == "ALL") {
		cnt = 2;
		startCnt += 1;
		shift = "0";
	}
	
	if(tabLen == 1 && document.frm.checkModify.value == "Y"){		
		
		for(j = startCnt; j < (Number(dayTo)+6); j += cnt){
			var objShiftTeam = main_tbody.rows(0).childNodes(j + Number(shift) - 1).childNodes(1)
			if(objShiftTeam.value == null || objShiftTeam.value == "") continue;
			var objButton = main_tbody.rows(0).childNodes(j + Number(shift)).childNodes(0);// 버튼
			if(stat == "O" && objButton.value == "정상"){
				objButton.value = "정상";
				changeStatus(objButton);
			}
			else if(stat == "N" && objButton.value == "연장"){
				objButton.value = "연장";
				changeStatus(objButton);
			}
		}
		return;		
	}
	for(i = 0; i < tabLen; i++){
		if(document.frm.checkModify[i].value == "Y"){
			for(j = startCnt; j < (Number(dayTo)+6); j += cnt){
				var objShiftTeam = main_tbody.rows(i).childNodes(j + Number(shift) - 1).childNodes(1)
				if(objShiftTeam.value == null || objShiftTeam.value == "") continue;
				var objButton = main_tbody.rows(i).childNodes(j + Number(shift)).childNodes(0);// 버튼
				if(stat == "O" && objButton.value == "정상"){
					objButton.value = "정상";
					changeStatus(objButton);
				}
				else if(stat == "N" && objButton.value == "연장"){
					objButton.value = "연장";
					changeStatus(objButton);
				}
			}
		}
	}
};

// 근무조 변경시 check_flag 변경
function changeShiftSelect(obj){ 
	if(obj.nextSibling.value == null || obj.nextSibling.value == ""){// 근무조 정보가 없을시 함수 실행 안함
		obj.options(0).selected = true; // 변경된 select box 원상태로 변경
		return;
	}
	var objCheck = obj.parentNode.nextSibling.childNodes(1); // check_falg
	
	// check_flag 값에 따른 변경 사항
	// 0 : 변경 사항 없음.
	// 1 : 근무조만 변경.
	// 2 : 연장/정상 정보만 변경.
	// 3 : 근무조, 연장/정상 정보 둘다 변경.
	if(objCheck.value == "0" || objCheck.value == "1"){
		objCheck.value = "1";
	}
	else if(objCheck.value == "2" || objCheck.value == "3"){
		objCheck.value = "3";
	}
	//alert(objCheck.value);
}

function aaa() {
	
	var plant_id = document.frm.stored_plant.value;
	var team_id = document.frm.stored_team.value;
	var line_id = document.frm.stored_line.value;
	var duty_date = document.frm.stored_duty_date.value;
	
	//alert(plant_id + "," + team_id + "," + line_id + "," + duty_date);
	
	var service_url = "service.do?_moon_service=sc_01050_shiftOperationCalendar_popup&_moon_perpage=200&_moon_pagenumber=1";
	service_url += "&selected_plant=" + plant_id + "&selected_won=" + team_id + "&selected_line=" + line_id + "&duty_date=" + duty_date;
		
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=800, height=500, top=0, left=0";
	var newWin = window.open(service_url, "SHIFT_OPER_CAL_POPUP", pop_win_style); 
	newWin.focus();
}
