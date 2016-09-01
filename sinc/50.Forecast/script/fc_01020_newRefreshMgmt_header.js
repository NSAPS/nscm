setTargetItemCode = function(obj) {
	var item_type = obj.value; 
	if (item_type == 'END') {
		document.frm.save_target_item_code.value = '000000000';
		document.frm.save_target_item_code.readOnly = true;
	} else {
		document.frm.save_target_item_code.value = '';
		document.frm.save_target_item_code.readOnly = false;
	}
}

applyRealign = function() {
	if(!confirm("�� ����� ����Ʈ�� ���� �Ͻðڽ��ϱ�?")){
		return;
	}
	
	document.frm._moon_service.value = 'fc_01020_newRefreshMgmt_apply_action'; 
	document.frm.action = "service.do";	
	document.frm.target = "iframe";
	document.frm.submit();
}

updateData = function(service) {
	var tabPageDisplayStyle = document.getElementById('tabPage2').style.display;
	if (tabPageDisplayStyle == 'none') {
		alert('��ȸ ��(Tab)������ ��� ����� �������� �ʽ��ϴ�.');
		return;
	}	
	if (document.frm.save_type.value == 'DELETE') {
		alert('�������� UPDATE �Ǵ� INSERT�� �����Ͽ� �ֽʽÿ�.');
		return;
	}	
	
	if (document.frm.save_realign_type.value == '') {
		alert('������ �����Ͽ� �ֽʽÿ�.');
		return;
	}
	if (document.frm.save_item_code.value == '') {
		alert('ǰ���ڵ带 �����Ͽ� �ֽʽÿ�.');
		return;
	}	
	if (document.frm.save_target_item_code.value == '') {
		alert('��� ǰ���ڵ带 �����Ͽ� �ֽʽÿ�.');
		return;
	}
	if (document.frm.save_start.value == '') {
		alert('�������� �������� �����Ͽ� �ֽʽÿ�.');
		return;
	}	
	if (document.frm.save_end.value == '') {
		alert('�������� �Ϸ����� �����Ͽ� �ֽʽÿ�.');
		return;
	}
	if (document.frm.save_realign_rate.value == '') {
		alert('���������� �����Ͽ� �ֽʽÿ�.');
		return;
	}	
	if (document.frm.save_cannibalization.value == '') {
		alert('������� ������ �����Ͽ� �ֽʽÿ�.');
		return;
	}		
	checkDuplication('fc_01020_newRefreshMgmt_is_it');	
}

deleteData = function(service) {
	var tabPageDisplayStyle = document.getElementById('tabPage2').style.display;
	if (tabPageDisplayStyle == 'none') {
		alert('��ȸ ��(Tab)������ ��� ����� �������� �ʽ��ϴ�.');
		return;
	}	
	if (document.frm.save_type.value != 'DELETE') {
		alert('�������� DELETE�� �����Ͽ� �ֽʽÿ�.');
		return;
	}
	
	if (document.frm.save_realign_type.value == '') {
		alert('������ �����Ͽ� �ֽʽÿ�.');
		return;
	}
	if (document.frm.save_item_code.value == '') {
		alert('ǰ���ڵ带 �����Ͽ� �ֽʽÿ�.');
		return;
	}	
	if (document.frm.save_target_item_code.value == '') {
		alert('��� ǰ���ڵ带 �����Ͽ� �ֽʽÿ�.');
		return;
	}
	if (document.frm.save_start.value == '') {
		alert('�������� �������� �����Ͽ� �ֽʽÿ�.');
		return;
	}	
	if (document.frm.save_end.value == '') {
		alert('�������� �Ϸ����� �����Ͽ� �ֽʽÿ�.');
		return;
	}
	checkDuplication('fc_01020_newRefreshMgmt_is_it2');	
}

checkDuplication = function(queryId) { 
	var save_realign_type = document.frm.save_realign_type.value;
	var save_item_code = document.frm.save_item_code.value;
	var save_target_item_code = document.frm.save_target_item_code.value;
	var save_start = document.frm.save_start.value;
	var save_end = document.frm.save_end.value;
	
	if (save_start.length < 8) {
		alert('���� �������� ������ ǥ�Ⱑ �߸��Ǿ����ϴ�.\n�ݵ�� 8�ڸ�(YYYYMMDD)�� �����Ͻñ� �ٶ��ϴ�. ��) 20080801');
		document.frm.save_start.focus();
		return;
	}	
	if (save_end.length < 8) {
		alert('���� �������� �Ϸ��� ǥ�Ⱑ �߸��Ǿ����ϴ�.\n�ݵ�� 8�ڸ�(YYYYMMDD)�� �����Ͻñ� �ٶ��ϴ�. ��) 20080801');
		document.frm.save_end.select();
		return;
	}
	
	var paramKeys = 'save_realign_type!%!save_item_code!%!save_target_item_code!%!save_start!%!save_end';
	var paramCodes = save_realign_type+'!%!'+save_item_code+'!%!'+save_target_item_code+'!%!'+save_start+'!%!'+save_end;
	var columns = 'ISIT';
	
	nongshim.getData(paramKeys, paramCodes, queryId, columns, "!%!", "/%/", actionRealignItem);
}

actionRealignItem = function(data) {
	var service = '';
	var isIt = data.split("/%/")[0];
	var save_type = document.frm.save_type.value;
	if (save_type == 'INSERT') {
		if(isIt == 'Y') {
			alert('�ش� �������� ǰ�� ���� ���ǰ�� ������ �̹� �����ϹǷ� ��� �� �� �����ϴ�.');
			return;
		}
		service = "fc_01020_newRefreshMgmt_save_action";
		
	} else if(save_type == 'UPDATE') {
		if(isIt == 'N') {
			alert('�ش� �������� ǰ�� ���� ���ǰ�� ������ �������� �����Ƿ� ���� �� �� �����ϴ�.');
			return;
		}
		service = "fc_01020_newRefreshMgmt_save_action";
		
	} else if(save_type == 'DELETE') {
		if(isIt == 'N') {
			alert('�ش� �������� ������ �������� �����Ƿ� ���� �� �� �����ϴ�.');
			return;
		}		
		service = "fc_01020_newRefreshMgmt_delete_action";		
	}
	
	if(!confirm(save_type + " �Ͻðڽ��ϱ�?")){
		return;
	}
		
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.target = "iframe";
	document.frm.submit();
}

openPopupWindow = function(popup_type, realign_type, param_type){
	// popup â�� input box ǥ�� data : search code
	
	var realign_type = realign_type.value;
	if (param_type == '') {
		if (realign_type == null || realign_type == '') {
			alert('������ ������ ��, Ŭ���Ͻʽÿ�.');
			return false;
		}
	} else {
		realign_type = '';
	}	
	
	var w_size = 450;
	var h_size = 500;

	var service_url = "service.do?_moon_service=fc_common_codePopup_header&popup_type="+popup_type+"&realign_type="+realign_type+"&_moon_perpage=100&_moon_pagenumber=1";
	var newWin = window.open(service_url, "Code_Search", "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0");
	newWin.focus();
}

changeGuiStatus = function(obj) {
	if (obj.value == 'INSERT') {
		document.frm.save_realign_type.disabled = false;
		document.frm.save_item_code.readOnly = false;
		document.frm.save_item_code.style.background = '#FFFFFF';
		document.frm.save_target_item_code.readOnly = false;
		document.frm.save_target_item_code.style.background = '#FFFFFF';
		document.frm.save_start.readOnly = false;
		document.frm.save_start.style.background = '#FFFFFF';
		document.frm.save_end.readOnly = false;
		document.frm.save_end.style.background = '#FFFFFF';
		document.frm.searchBt2.disabled = false;
		document.frm.searchBt3.disabled = false;
		
	} else if (obj.value == 'UPDATE') {
		document.frm.save_realign_type.disabled = true;
		document.frm.save_item_code.readOnly = true;
		document.frm.save_item_code.style.background = '#CCCCCC';
		document.frm.save_target_item_code.readOnly = true;
		document.frm.save_target_item_code.style.background = '#CCCCCC';
		document.frm.save_start.readOnly = false;
		document.frm.save_start.style.background = '#FFFFFF';
		document.frm.save_end.readOnly = false;
		document.frm.save_end.style.background = '#FFFFFF';
		document.frm.searchBt2.disabled = true;
		document.frm.searchBt3.disabled = true;
		
	} else {
		document.frm.save_realign_type.disabled = true;
		document.frm.save_item_code.readOnly = true;		
		document.frm.save_item_code.style.background = '#CCCCCC';
		document.frm.save_target_item_code.readOnly = true;
		document.frm.save_target_item_code.style.background = '#CCCCCC';
		document.frm.save_start.readOnly = true;
		document.frm.save_start.style.background = '#CCCCCC';
		document.frm.save_end.readOnly = true;
		document.frm.save_end.style.background = '#CCCCCC';
		document.frm.searchBt2.disabled = true;
		document.frm.searchBt3.disabled = true;
	}
	
}