 
// opener update �� 
function fillOpenWindow( row, col, data ) {

	// ���������ڵ�!%!����������!%!��������GRAD
	opener.document.frm.in_sales_loc.value = data.split("!%!")[0];
	opener.document.frm.in_sales_loc_name.value = data.split("!%!")[1];
	opener.document.frm.in_dept_grad_code.value = data.split("!%!")[2];
	// ��ȸ���� COMBO ����
	opener.sel_type_Change()	

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


