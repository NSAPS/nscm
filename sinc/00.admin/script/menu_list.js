
// Grid Double Click & function calling
function onclickfunc(row, col, data) {
	
	var menu_id_delete = data.split("!%!")[0];
	
	// 삭제 여부 묻기
	if( confirm(" " + menu_id_delete + " 를 메뉴 리스트에서 삭제하겠습니까?\n\n삭제하면 모든 사용자에 대한 " + menu_id_delete + " 가 삭제됩니다.") ) {
		document.frm.menu_id_delete.value = menu_id_delete;
		GoDelete("menu_delete");
	}
	else {
		document.frm.menu_id_delete.value = "";
	}
	
}
