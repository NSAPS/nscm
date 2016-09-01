function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}

// ���� ��ư Ŭ��
function GoCreate(service) {
	
	// ==============================================  //	
	var run_date = document.frm.run_date.value;
	if(run_date == "" || run_date == null){
		alert("���ڸ� �����Ͽ� �ֽʽÿ�.");
		return;
	}
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// ��ȸ ��ư Ŭ��
function GoSearch(service) {
	
	// ==============================================  //	
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}