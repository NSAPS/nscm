
// Grid Double Click & function calling
function onclickfunc(row, col, data) {
	
	var menu_id_delete = data.split("!%!")[0];
	
	// ���� ���� ����
	if( confirm(" " + menu_id_delete + " �� �޴� ����Ʈ���� �����ϰڽ��ϱ�?\n\n�����ϸ� ��� ����ڿ� ���� " + menu_id_delete + " �� �����˴ϴ�.") ) {
		document.frm.menu_id_delete.value = menu_id_delete;
		GoDelete("menu_delete");
	}
	else {
		document.frm.menu_id_delete.value = "";
	}
	
}
