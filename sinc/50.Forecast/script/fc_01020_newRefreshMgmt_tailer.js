function displayDetail( row, col, data ) {
	var columns = data.split('!%!');
	parent.document.frm.hidden_save_realign_type.value = columns[0];
	parent.document.frm.save_realign_type.value = columns[0];
	parent.document.frm.save_item_code.value = columns[2];
	parent.document.frm.save_item_name.value = columns[3];
	parent.document.frm.save_target_item_code.value = columns[4];
	parent.document.frm.save_target_item_name.value = columns[5];
	parent.document.frm.save_realign_rate.value = columns[6];
	parent.document.frm.save_start.value = columns[7];
	parent.document.frm.save_end.value = columns[8];
	parent.document.frm.save_cannibalization.value = columns[9];
	parent.document.frm.save_etc.value = columns[10];
	parent.document.frm.save_apply.value = columns[11];
	parent.document.frm.save_type.value = 'UPDATE';
	
	parent.document.frm.save_realign_type.disabled = true;
	parent.document.frm.save_item_code.readOnly = true;
	parent.document.frm.save_item_code.style.background = '#CCCCCC';
	parent.document.frm.save_target_item_code.readOnly = true;
	parent.document.frm.save_target_item_code.style.background = '#CCCCCC';
	parent.document.frm.save_start.readOnly = false;
	parent.document.frm.save_start.style.background = '#FFFFFF';
	parent.document.frm.save_end.readOnly = false;
	parent.document.frm.save_end.style.background = '#FFFFFF';
	parent.document.frm.searchBt2.disabled = true;
	parent.document.frm.searchBt3.disabled = true;
	
	document.frm.selected_item_cd.value = columns[2];

	searchIFrame1Data('fc_01020_newRefreshMgmt_detailer');	
}

searchIFrame1Data = function(service) {
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "iframe1";
	document.frm.submit();
	
};