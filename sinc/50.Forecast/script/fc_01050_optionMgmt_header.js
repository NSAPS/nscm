updateData = function(service) {
	if (Number(iframe.document.frm.isChecked.value) < 1) {
		alert("���õ� ���� �������� �ʽ��ϴ�.");		
		return;
	}
	
	if(!confirm('����� ����� ���� �մϴ�.')){
		return;
	}
	iframe.document.frm._moon_service.value = service; 
	iframe.document.frm.action = "service.do"; 
	iframe.document.frm.target = "_self";
	iframe.document.frm.submit();
	
	searchIFrameData('fc_01050_optionMgmt_tailer');
};
