
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
	
	// 생산일자 날짜 체크
	if(objBox.name == "input_due_date"){	
		if( strVal != "" && strVal != null ) {
			// 날짜 체크
			if( chkDate(objBox, 10) == 0 ) {				
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
		// 작업장 --> 생산일자
		if( objName == "input_plant_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}		
		// 생산일자 --> 다음줄 작업장
		else if( objName == "input_due_date" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				objTdG = main_tbody.rows[0].cells[3];
				//main_tbody.rows[0].cells[3].focus();
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				objTdG = main_tbody.rows[rowIdx+1].cells[3];
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
GoSave = function(service) {
				
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
	opener.GoSearch("sc_10030_dailyPlantAllocationPlanAnalysis_list");
	
	this.focus();
	
};
/*function GoSave(service) {
	
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
	
}*/

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
}

// 체크 박스 선택/해제
function checkEvent(obj){
	
	var idx = obj.parentNode.parentNode.rowIndex;
	
	if(obj.value == "N"){
		obj.checked = true;
		obj.value = "Y";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "Y";
		}
		else
			document.frm.checkModify.value = "Y";
	}
	else{
		obj.checked = false;
		obj.value = "N";
		if(document.frm.checkModify[idx])
			document.frm.checkModify[idx].value = "N";
		else
			document.frm.checkModify.value = "N";
	}
}

// 납기일 일괄 적용( 체크박스 선택된 row만)
function prodDatesBatch(){
	
	var sDate = document.frm.selected_date.value;
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // 체크 박스가 선택된 row만 적용
				divDueDate[i].innerHTML = sDate;
				document.frm.input_due_date[i].value = sDate;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divDueDate.innerHTML = sDate;
				document.frm.input_due_date.value = sDate;						
			}
		}
	}
}

// 공장 일괄 적용( 체크박스 선택된 row만)
function procBatch(){
	
	var sPlantId = document.frm.selected_plant.value; //작업장 코드
	var sPlantName = document.frm.selected_plant.options[document.frm.selected_plant.selectedIndex].text; // 작업장 명
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // 체크 박스가 선택된 row만 적용
				divPlant[i].innerHTML = "&nbsp;" + sPlantName;
				document.frm.input_plant_id[i].value = sPlantId;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divPlant.innerHTML = "&nbsp;" + sPlantName;
				document.frm.input_plant_id.value = sPlantId;						
			}
		}
	}
}
