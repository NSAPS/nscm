
// check JOB 
function clickCheck( objCheck, rowIdx ) {
	
	if( objCheck.checked == true ) {
		document.frm.job_id[rowIdx].value = objCheck.value;
		left_tr[rowIdx-1].style.backgroundColor = "#D0B8F1"; 
		main_tr[rowIdx-1].style.backgroundColor = "#D0B8F1";
	} 
	else { 
		document.frm.job_id[rowIdx].value = "";
		left_tr[rowIdx-1].style.backgroundColor = "#ffffff"; 
		main_tr[rowIdx-1].style.backgroundColor = "#ffffff";
	}
	
}

// check All 
function clickAll( checked ) {
	
	var objCheck = null; 
	for( var i = 1; i < document.frm.check_box.length; ++i ) { 
		objCheck = document.frm.check_box[i]; 
		objCheck.checked = checked; 
		clickCheck(objCheck, i); 
	} 
	
} 

// 그룹 변경 시 화면을 refresh 하여 해당 그룹에 맞는 메뉴 보여주기 
function changeGroup( service, objGroup, group_id ) { 
	
	document.frm.group_change.value = "Y"; 
	if( objGroup.value == "" ) 
		objGroup.value = group_id; 
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit(); 
	
} 

// html 로 그린 그리드의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) { 
	
	if( document.frm.check_box[obj.rowIndex+1].checked == true ) {
		left_tr[obj.rowIndex].style.backgroundColor = "#D0B8F1"; 
		main_tr[obj.rowIndex].style.backgroundColor = "#D0B8F1"; 
		//main_tr[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#D0B8F1";
	} 
	else {
		left_tr[obj.rowIndex].style.backgroundColor = "#ffffff"; 
		main_tr[obj.rowIndex].style.backgroundColor = "#ffffff"; 
		//main_tr[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	}
	
} 
