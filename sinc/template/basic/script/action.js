
GoRegister = function(service) {
	// 조회시 WAITING 이미지 보여주기
	viewWait();			
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoSave = function(service) {
	// 조회시 WAITING 이미지 보여주기
	viewWait();	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoEdit = function(service) {
	// 조회시 WAITING 이미지 보여주기
	viewWait();			
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoDelete = function(service) {
	
	if(!confirm("삭제 하시겠습니까?")){
		return;
	}
			
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

GoSearch = function(service) {
	
	// 조회시 WAITING 이미지 보여주기
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
	alert("인쇄");
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
			
	// service_id 저장
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
	if(!confirm("저장 하시겠습니까?")){
		return;
	}
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.submit();
};

deleteData = function(service) {
	if(!confirm("삭제 하시겠습니까?")){
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
	
	parent.iframe.popupClose();  //tailer vm의 javascript function	
	parent.searchData(parent.frm._moon_service.value);  //header vm의 javascript function
};

updatePopupData = function(service) {
	if(!confirm("저장 하시겠습니까?")){
		return;
	}
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.submit();
	
	parent.iframe.popupClose();  //tailer vm의 javascript function	
	parent.searchIFrameData(parent.frm._moon_service.value);  //header vm의 javascript function
};

deletePopupData = function(service) {
	if(!confirm("삭제 하시겠습니까?")){
		return;
	}
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";	
	document.frm.submit();
	
	parent.iframe.popupClose();  //tailer vm의 javascript function	
	parent.searchIFrameData(parent.frm._moon_service.value);  //header vm의 javascript function
}
