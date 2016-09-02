
// opener update 용 
function fillOpenWindow( row, col, data ) {

	//제품타입!%!제품 코드!%!제품 명
	var rowIdx = Number(document.frm.rowIdx.value);
	if( opener.document.frm.item_id[rowIdx] ) {
		opener.document.frm.item_id[rowIdx].value = data.split("!%!")[1];
		opener.document.frm.item_name[rowIdx].value = data.split("!%!")[2];
		if( opener.divItemName[rowIdx] ) {
			opener.divItemId[rowIdx].innerHTML = data.split("!%!")[1];
			opener.divItemName[rowIdx].innerHTML = "&nbsp;" + data.split("!%!")[2];
		}
		if( opener.document.frm.box_per_palet[rowIdx] ) {
			opener.document.frm.box_per_palet[rowIdx].value = data.split("!%!")[3];
		}
	}
	else {
		opener.document.frm.item_id.value = data.split("!%!")[1];
		opener.document.frm.item_name.value = data.split("!%!")[2];
		if( opener.divItemName ) {
			opener.divItemId.innerHTML = data.split("!%!")[1];
			opener.divItemName.innerHTML = "&nbsp;" + data.split("!%!")[2];
		}
		if( opener.document.frm.box_per_palet ) {
			opener.document.frm.box_per_palet.value = data.split("!%!")[3];
		}
	}
	
	this.close(); 

} 

// 처음 클릭 시 내용 지우는 함수
function firstClick(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.code_input.value = ""; 
		document.frm.first_condition.value = "N"; 
	}
	
}

// 처음 클릭 시 내용 지우는 함수
function firstChange(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.first_condition.value = "N"; 
	}
	
} 
