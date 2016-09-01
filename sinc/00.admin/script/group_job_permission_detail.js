
// check JOB 
function clickCheck( objCheck, rowIdx )
{ 
		
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
function clickAll( checked ) 
{ 
		
		var objCheck = null; 
		for( var i = 1; i < document.frm.check_box.length; ++i ) 
		{ 
			objCheck = document.frm.check_box[i]; 
			objCheck.checked = checked; 
			clickCheck(objCheck, i); 
		} 
		
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
