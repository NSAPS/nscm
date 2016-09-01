
GoRegister = function(service) {
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
};

GoSave = function(service) {		
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
};

GoEdit = function(service) {
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
};

GoDelete = function(service) {
	
	if(!confirm("»èÁ¦ ÇÏ½Ã°Ú½À´Ï±î?")){
		return;
	}
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
};

GoSearch = function(service) {
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
};

GoExcel = function() {
	alert("¿¢¼¿");
};

GoPrint = function() {
	alert("ÀÎ¼â");
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
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
};
