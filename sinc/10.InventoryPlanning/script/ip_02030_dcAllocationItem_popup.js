 
// opener update �� 
function fillOpenWindow( row, col, data ) {

	//��ǰŸ��!%!��ǰ �ڵ�!%!��ǰ ��
	opener.document.frm.in_alloc_item.value = data.split("!%!")[0];
	opener.document.frm.in_alloc_item_name.value = data.split("!%!")[1];
	// item_name�� ǥ���ϴ� object�� disable�̹Ƿ� ȭ�� reload�� ��������. �׷��� ���� �ϳ� �����صд�
	opener.document.frm.item_name.value = data.split("!%!")[1];
	// ǰ���� �ٲ�����Ƿ� COMMENT�� �����Ѵ�.
	opener.document.frm.in_alloc_reason_comment.value = "";
	this.close(); 

} 

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstClick(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.selected_item_id.value = ""; 
		document.frm.first_condition.value = "N"; 
	}
	
}

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstChange(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.first_condition.value = "N"; 
	}
	
} 


