
// opener update �� 
function fillOpenWindow( row, col, data ) {

	//�ڵ�!%!�ڵ� ��
	var id_input = document.frm.id_input.value;
	var name_input = document.frm.name_input.value;
	opener.document.getElementById(id_input).value = data.split("!%!")[0];
	opener.document.getElementById(name_input).value = data.split("!%!")[1];
	
	this.close(); 

} 

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstClick(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.code_input.value = ""; 
		document.frm.first_condition.value = "N"; 
	}
	
}

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstChange(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.first_condition.value = "N"; 
	}
	
} 
