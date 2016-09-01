displayDeleteTarget = function(row, col, data) {	
	var dataSplits = data.split("!%!");
	parent.document.frm.del_code.value = dataSplits[4];
	parent.document.frm.del_oper_type.value = dataSplits[0];
	parent.document.frm.attr01.value = dataSplits[1];
	parent.document.frm.attr02.value = dataSplits[2];
};