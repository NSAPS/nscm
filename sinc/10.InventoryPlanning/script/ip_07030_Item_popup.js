 
// opener update �� 
function fillOpenWindow( row, col, data ) {

	// opener�� ǰ�񺯼��� in_item_id�� ȣ���ϸ� name�� ���� return
	if(opener.document.frm.in_item_id) {
	// ǰ���ڵ�!%!ǰ���!%!�Ǹ���!%!����/����
		opener.document.frm.in_item_id.value = data.split("!%!")[0];
		opener.document.frm.in_item_name.value = data.split("!%!")[1];
	}
	// opener�� ǰ�񺯼��� item_id�� ȣ���ϸ� ǰ�� code�� return
	else{
		opener.document.frm.item_id.value = data.split("!%!")[0];
		opener.doChange3(opener.document.frm.item_id);
		
	}
	// ��ȸ���� COMBO ����

	this.close(); 

} 

GoSearch = function(service) {

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();

	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

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


