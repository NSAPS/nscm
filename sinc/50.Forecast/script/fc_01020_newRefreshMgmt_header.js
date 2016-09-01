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
	if(!confirm("미 적용된 리스트를 적용 하시겠습니까?")){
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
		alert('조회 탭(Tab)에서는 등록 기능을 지원하지 않습니다.');
		return;
	}	
	if (document.frm.save_type.value == 'DELETE') {
		alert('저장방식을 UPDATE 또는 INSERT로 선택하여 주십시요.');
		return;
	}	
	
	if (document.frm.save_realign_type.value == '') {
		alert('유형을 선택하여 주십시요.');
		return;
	}
	if (document.frm.save_item_code.value == '') {
		alert('품목코드를 기입하여 주십시요.');
		return;
	}	
	if (document.frm.save_target_item_code.value == '') {
		alert('대상 품목코드를 기입하여 주십시요.');
		return;
	}
	if (document.frm.save_start.value == '') {
		alert('실적적용 시작일을 기입하여 주십시요.');
		return;
	}	
	if (document.frm.save_end.value == '') {
		alert('실적적용 완료일을 기입하여 주십시요.');
		return;
	}
	if (document.frm.save_realign_rate.value == '') {
		alert('실적비율을 기입하여 주십시요.');
		return;
	}	
	if (document.frm.save_cannibalization.value == '') {
		alert('시장잠식 비율을 기입하여 주십시요.');
		return;
	}		
	checkDuplication('fc_01020_newRefreshMgmt_is_it');	
}

deleteData = function(service) {
	var tabPageDisplayStyle = document.getElementById('tabPage2').style.display;
	if (tabPageDisplayStyle == 'none') {
		alert('조회 탭(Tab)에서는 등록 기능을 지원하지 않습니다.');
		return;
	}	
	if (document.frm.save_type.value != 'DELETE') {
		alert('저장방식을 DELETE로 선택하여 주십시요.');
		return;
	}
	
	if (document.frm.save_realign_type.value == '') {
		alert('유형을 선택하여 주십시요.');
		return;
	}
	if (document.frm.save_item_code.value == '') {
		alert('품목코드를 기입하여 주십시요.');
		return;
	}	
	if (document.frm.save_target_item_code.value == '') {
		alert('대상 품목코드를 기입하여 주십시요.');
		return;
	}
	if (document.frm.save_start.value == '') {
		alert('실적적용 시작일을 기입하여 주십시요.');
		return;
	}	
	if (document.frm.save_end.value == '') {
		alert('실적적용 완료일을 기입하여 주십시요.');
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
		alert('실적 적용일의 시작일 표기가 잘못되었습니다.\n반드시 8자리(YYYYMMDD)로 기입하시기 바랍니다. 예) 20080801');
		document.frm.save_start.focus();
		return;
	}	
	if (save_end.length < 8) {
		alert('실적 적용일의 완료일 표기가 잘못되었습니다.\n반드시 8자리(YYYYMMDD)로 기입하시기 바랍니다. 예) 20080801');
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
			alert('해당 데이터의 품목에 대한 대상품목 정보가 이미 존재하므로 등록 할 수 없습니다.');
			return;
		}
		service = "fc_01020_newRefreshMgmt_save_action";
		
	} else if(save_type == 'UPDATE') {
		if(isIt == 'N') {
			alert('해당 데이터의 품목에 대한 대상품목 정보가 존재하지 않으므로 수정 할 수 없습니다.');
			return;
		}
		service = "fc_01020_newRefreshMgmt_save_action";
		
	} else if(save_type == 'DELETE') {
		if(isIt == 'N') {
			alert('해당 데이터의 정보가 존재하지 않으므로 삭제 할 수 없습니다.');
			return;
		}		
		service = "fc_01020_newRefreshMgmt_delete_action";		
	}
	
	if(!confirm(save_type + " 하시겠습니까?")){
		return;
	}
		
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.target = "iframe";
	document.frm.submit();
}

openPopupWindow = function(popup_type, realign_type, param_type){
	// popup 창의 input box 표시 data : search code
	
	var realign_type = realign_type.value;
	if (param_type == '') {
		if (realign_type == null || realign_type == '') {
			alert('유형을 선택한 후, 클릭하십시요.');
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