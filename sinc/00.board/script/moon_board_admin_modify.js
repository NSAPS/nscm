
// ����
GoSave = function(service) {
	
	if(document.frm.data_flag.checked == false){
		document.frm.data_flag.value="0";
		document.frm.data_flag.click();
	}
	if(document.frm.memo_flag.checked == false){
		document.frm.memo_flag.value="0";
		document.frm.memo_flag.click();
	}
	
	// �׷����� ���� ����
	if( document.frm.secu_flag.length ) {
		for(var i=0; i<document.frm.secu_flag.length; i++){
			if(!document.frm.secu_flag[i].checked){
				document.frm.secu_flag[i].click();
				document.frm.secu_flag[i].value="0";
			}
			else {
				document.frm.secu_flag[i].value="1";
			}
		}
	}
	else {
		if(!document.frm.secu_flag.checked){
			document.frm.secu_flag.click();
			document.frm.secu_flag.value="0";
		}
		else {
			document.frm.secu_flag.value="1";
		}
	}
			
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// ��ü ����, ���� 
function CheckAll( boxName, boxAttr ) 
{ 
	
	var boxObj = eval("document.frm."+boxName); 
	
	// �׷� ����Ʈ�� �� �� �̻��� ���
	if( boxObj.length ){
		for( var i=0; i<boxObj.length; ++i ) 
		{ 
			eval("document.frm."+boxName+"["+i.toString()+"]").checked = boxAttr; 
		}
	}
	// �׷� ����Ʈ�� �� ���� ���
	else {
		eval("document.frm."+boxName).checked = boxAttr;
	}
	
}