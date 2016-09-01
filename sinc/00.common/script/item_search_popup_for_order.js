
// opener update 용 
function fillOpenWindow( row, col, data ) {

	//제품타입!%!제품 코드!%!제품 명
	var rowIdx = Number(document.frm.rowIdx.value);
	
	opener.document.frm.selected_item.value = data.split("!%!")[1];		
	
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
