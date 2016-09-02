
// 변경 더블 클릭
function onclickfunc(row, col, data) {
		
		// 그룹 코드!%!그룹 명
		document.frm.group_id.value = data.split("!%!")[0];
		GoSearch("group_detail");
		
}
