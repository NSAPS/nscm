displayDeleteTarget = function(row, col, data) {	
	var dataSplits = data.split("!%!");
	parent.document.frm.del_code.value = dataSplits[2];
	parent.document.frm.del_oper_type.value = dataSplits[1];	
};

