
GoRegister = function(service) {
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();			
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoSave = function(service) {
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoEdit = function(service) {
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();			
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoDelete = function(service) {
	
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
			
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoSearch = function(service) {
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoExcel = function(service) {
			
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_float";
	document.frm.submit();
	
};

GoPrint = function() {
	alert("�μ�");
};

GoList = function(service, perpage) {
	
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	//document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoReply = function(service) {
			
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

searchIFrameData = function(service) {
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "iframe";
	document.frm.submit();
};

searchData = function(service) {
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
};

forwardRegisterForm = function(service) {
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.target = "iframe";
	document.frm.submit();
};

updateData = function(service) {
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.submit();
};

deleteData = function(service) {
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.submit();
}

// For popup action
searchPopupData = function(service) {
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "iframe";
	document.frm.submit();
};

forwardRegisterPopup = function(service) {	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.target = "iframe";
	document.frm.submit();
	
	parent.iframe.popupClose();  //tailer vm�� javascript function	
	parent.searchData(parent.frm._moon_service.value);  //header vm�� javascript function
};

updatePopupData = function(service) {
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.submit();
	
	parent.iframe.popupClose();  //tailer vm�� javascript function	
	parent.searchIFrameData(parent.frm._moon_service.value);  //header vm�� javascript function
};

deletePopupData = function(service) {
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.submit();
	
	parent.iframe.popupClose();  //tailer vm�� javascript function	
	parent.searchIFrameData(parent.frm._moon_service.value);  //header vm�� javascript function
}
