
// opener update �� 
function fillOpenWindow( row, col, data ) {

	//��ǰŸ��!%!��ǰ �ڵ�!%!��ǰ ��
	var rowIdx = Number(document.frm.rowIdx.value);
	
	opener.document.frm.selected_item.value = data.split("!%!")[1];		
	
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
