
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
	
	// 시작일시 셀인 경우 자리수 체크
	if( objBox.name == "input_start_dttm" ){
		if( objBox.value.length != 14){ 
			alert(" 자리 수가 맞지 않습니다.");
			return;
		}
	}
	
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
	if(objBox.name == "input_prod_date"){	
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
		if( objName == "input_start_dttm_date" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// 생산일자 --> shift
//		else if( objName == "input_prod_date" ) { 
//			objTdG = main_tbody.rows[rowIdx].cells[5];
//		}		
		// shift --> 다음줄 작업장
		else if( objName == "input_start_dttm_time" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				objTdG = main_tbody.rows[0].cells[5];
				//main_tbody.rows[0].cells[3].focus();
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				objTdG = main_tbody.rows[rowIdx+1].cells[5];
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
	
	transferChar();
				
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
	opener.GoSearch("sc_11020_dailyProductionPlanAnalysis_list");
		
	this.focus();
		
};

// 체크 박스 전체 선택/해제
function checkAll(obj){
	//alert(obj.value);
	var tabLen = main_tbody.rows.length;
	//alert(tabLen); 
	document.frm.qty_tot.value = 0;
	if(obj.value == "N"){
		if( tabLen == 1){
			document.frm.check_modify.checked = true;
			document.frm.check_modify.value = "Y";	
			document.frm.checkModify.value = "Y";
			var qty = Number(document.frm.qty.value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot + qty;	
			document.frm.qty_tot.value = sum;
			//qtyTot.innerHTML = sum;			
		}
		else{
			for( i = 0; i < tabLen; i++){			
				document.frm.check_modify[i].checked = true;
				document.frm.check_modify[i].value = "Y";	
				document.frm.checkModify[i].value = "Y";	
				var qty = Number(document.frm.qty[i].value);
				//alert(qty);
				var tot = Number(document.frm.qty_tot.value);
				//alert(tot);	
				var sum = tot + qty;	
				document.frm.qty_tot.value = sum;
				
			}
		}
		qtyTot.innerHTML = numberFormat(sum);
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
		document.frm.qty_tot.value = 0;
		qtyTot.innerHTML = 0;	
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
			var qty = Number(document.frm.qty[idx].value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot + qty;	
			document.frm.qty_tot.value = sum;
			qtyTot.innerHTML = numberFormat(sum);
		}
		else{
			document.frm.checkModify.value = "Y";
			var qty = Number(document.frm.qty.value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot + qty;	
			document.frm.qty_tot.value = sum;
			qtyTot.innerHTML = numberFormat(sum);
		}
	}
	else{
		obj.checked = false;
		obj.value = "N";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "N";
			var qty = Number(document.frm.qty[idx].value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot - qty;	
			document.frm.qty_tot.value = sum;
			qtyTot.innerHTML = numberFormat(sum);
		}
		else{
			document.frm.checkModify.value = "N";
			var qty = Number(document.frm.qty.value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot - qty;	
			document.frm.qty_tot.value = sum;
			qtyTot.innerHTML = numberFormat(sum);
		}
	}
}


// 생산일자 일괄 적용( 체크박스 선택된 row만)
function prodDatesBatch(){
	
	var sDate = document.frm.selected_date.value;
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // 체크 박스가 선택된 row만 적용
				divProdDate[i].innerHTML = sDate;
				document.frm.input_prod_date[i].value = sDate;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divProdDate.innerHTML = sDate;
				document.frm.input_prod_date.value = sDate;						
			}
		}
	}
}

// 작업장 일괄 적용( 체크박스 선택된 row만)
function procBatch(){
	
	var sProcId = document.frm.selected_proc.value; //작업장 코드
	var sProcName = document.frm.selected_proc.options[document.frm.selected_proc.selectedIndex].text; // 작업장 명
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // 체크 박스가 선택된 row만 적용
				divProc[i].innerHTML = "&nbsp;" + sProcName;
				document.frm.input_proc_id[i].value = sProcId;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divProc.innerHTML = "&nbsp;" + sProcName;
				document.frm.input_proc_id.value = sProcId;						
			}
		}
	}
}

// SHIFT 일괄 적용( 체크박스 선택된 row만)
function shiftBatch(){
	
	var sShiftId = document.frm.selected_shift.value; //shift 코드
	var sShiftName = document.frm.selected_shift.options[document.frm.selected_shift.selectedIndex].text; // shift 명
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // 체크 박스가 선택된 row만 적용
				divShift[i].innerHTML = sShiftName + "&nbsp;";
				document.frm.input_shift_type[i].value = sShiftId;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divShift.innerHTML = sShiftName + "&nbsp;";
				document.frm.input_shift_type.value = sShiftId;						
			}
		}
	}
}

// 문자열의 [,]를〔,〕로 변경
function transferChar(){
	
	var tabLength = main_tbody.rows.length;
	
	for( i = 0; i < tabLength; i++ ){  
		
		if( document.frm.input_wo_id[i] ){
			var woId = document.frm.input_wo_id[i].value;
			woId = replaceAll(woId,"[","〔");
			woId = replaceAll(woId,"]","〕");
			if(document.frm.input_wo_id[i])
				document.frm.input_wo_id[i].value = woId;
			else
				document.frm.input_wo_id.value = woId;			
		} 
		else{
			if( document.frm.input_wo_id ){
				var woId = document.frm.input_wo_id.value;
				woId = replaceAll(woId,"[","〔");
				woId = replaceAll(woId,"]","〕");
				document.frm.input_wo_id.value = woId;				
			}
		}		
	}
}; 

//replaceAll
function replaceAll(str,re,transChar){
	var len = str.length;
	
	for(j = 0; j < len; j++){
		str = str.replace(re,transChar);
	}
	
	return str;
};

