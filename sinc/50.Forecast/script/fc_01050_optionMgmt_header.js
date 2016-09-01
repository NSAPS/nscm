updateData = function(service) {
	if (Number(iframe.document.frm.isChecked.value) < 1) {
		alert("선택된 행이 존재하지 않습니다.");		
		return;
	}
	
	if(!confirm('변경된 행들을 저장 합니다.')){
		return;
	}
	iframe.document.frm._moon_service.value = service; 
	iframe.document.frm.action = "service.do"; 
	iframe.document.frm.target = "_self";
	iframe.document.frm.submit();
	
	searchIFrameData('fc_01050_optionMgmt_tailer');
};
