// opener update ¿ë
function fillOpenWindow( row, col, data ) {	
	var code_00 = data.split("!%!")[0];
	var code_01 = data.split("!%!")[1];
	
	if (parent.document.frm.popup_type.value == 'ITEM1') {
		parent.opener.document.frm.item_code.value	= code_00;
		parent.opener.document.frm.item_name.value = code_01;
			
	} else if (parent.document.frm.popup_type.value == 'ITEM2') {
		parent.opener.document.frm.item_code.value	= code_00;
		parent.opener.document.frm.item_name.value = code_01; 
			
	} else if (parent.document.frm.popup_type.value == 'ITEM2_SAVE') {
		parent.opener.document.frm.save_item_code.value	= code_00;
		parent.opener.document.frm.save_item_name.value = code_01;
			
	} else if (parent.document.frm.popup_type.value == 'ITEM2_SAVE_TARGET') {
		parent.opener.document.frm.save_target_item_code.value	= code_00;
		parent.opener.document.frm.save_target_item_name.value = code_01;
			
	} else if (parent.document.frm.popup_type.value == 'SITE1') {
		parent.opener.document.frm.site_code.value	= code_00;
		parent.opener.document.frm.sales_name.value = code_01;
		
	} else if (parent.document.frm.popup_type.value == 'DC1') {
		parent.opener.document.frm.dc_code.value = code_00;
		parent.opener.document.frm.dc_name.value = code_01;
	}
	parent.close();
}

// enter check ¿ë
function enterCheck() {
	if(event.keyCode =='13'){		
		document.frm._moon_service.value = "fc_common_codePopup_tailer";
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}
}