// �Ⱓ : ������ ���� --> ������ �������� ����
function sumDate( strDate ){
	
	if(chkDate(strDate,"7") == 0) return;
	var sdate = strDate.value.split("-");
	var temp = new Date(sdate[0], sdate[1]-1);
	temp.setMonth(temp.getMonth() + 5);
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var edate = year+ "-" + month;
	//alert(edate);											
	document.frm.end_month.value = edate;
}

// ��ȸ ��ư Ŭ��
function GoSearch(service) {
	
	var version = document.frm.selected_version.value;
	
	// �ش� ������ ���� ��� 
	if( version == "" ) {
		alert("��ȹ������ �����Ͽ� �ֽʽÿ�.");
		return;
	}
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}