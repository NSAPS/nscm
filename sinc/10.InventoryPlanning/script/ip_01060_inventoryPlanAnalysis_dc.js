//��ȸ�� ��¥�� YYYY-MM-DD ->  YYYYMMDD�� ��ȯ
GoSearch = function(service) {
	
	var	temp_in_cnfm_date = document.frm.in_cnfm_date.value;
	document.frm.in_cnfm_date.value = delDateDelimiter(document.frm.in_cnfm_date.value);

	
	viewWait();// ��ȸ�� WAITING �̹��� �����ֱ�
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	//doChange1(this, 0, 0);

	document.frm.in_cnfm_date.value = temp_in_cnfm_date;
	
};