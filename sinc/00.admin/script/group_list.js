
// ���� ���� Ŭ��
function onclickfunc(row, col, data) {
		
		// �׷� �ڵ�!%!�׷� ��
		document.frm.group_id.value = data.split("!%!")[0];
		GoSearch("group_detail");
		
}
