function displayOption() {
	document.getElementById('chartArea').style.display = 'none';
    document.getElementById('searchArea').style.display = 'block';   
}

updateData = function(service) {
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}	
	iframe.document.frm._moon_service.value = service; 
	iframe.document.frm.action = "service.do";	
	iframe.document.frm.target = "_self";
	iframe.document.frm.submit();
};