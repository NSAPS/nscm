
// opener update 용 
function fillOpenWindow( row, col, data ) {

	//코드!%!코드 명
	var id_input = document.frm.id_input.value;
	var name_input = document.frm.name_input.value;
	opener.document.getElementById(id_input).value = data.split("!%!")[0];
	opener.document.getElementById(name_input).value = data.split("!%!")[1];
	
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
