
// opener update �� 
function onclickfunc( row, col, data ) { 

	//��ȹ ����!%!���� ��!%!��ȹ ��!%!���� ��
	opener.document.frm.run_date.value = data.split("!%!")[1];
	
	this.close(); 

} 