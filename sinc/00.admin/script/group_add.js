
GoSave = function(service) {		
		
		var group_id_insert = document.frm.group_id_insert.value;
		if( group_id_insert == null || group_id_insert == "" ){
			alert("�׷� �ڵ带 �Է��� �ֽʽÿ�.");
			document.frm.group_id_insert.focus();
			return;
		}
		
		var group_name_insert = document.frm.group_name_insert.value;
		if( group_name_insert == null || group_name_insert == "" ){
			alert("�׷� ���� �Է��� �ֽʽÿ�.");
			document.frm.group_name_insert.focus();
			return;
		}
		
		// �׷� �ڵ� �ߺ� üũ �� ����
		commonUtil.checkKeyValue(group_id_insert, "group_id_dup_check_in_reg_group", { 
			callback:function(checkResult){
				if( Number(checkResult) > 0 ) {
					alert("�Է��Ͻ� �׷� �ڵ�� �̹� ��ϵ� �����Ͱ� �ֽ��ϴ�.");
					document.frm.group_id_insert.select();
					return;
				}
				else {
					// service_id ����
					frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
					
					document.frm._moon_service.value = service;
					document.frm.action = "service.do";
					document.frm.target = "_self";
					document.frm.submit();
				}
			}
		});
	
}

// �޴� ��ü ����/����	
function clickMenuAll(objChk) {
		
		var len = document.frm.check_menu.length;
		for( var i = 0 ; i < len ; i++ ) {
			document.frm.check_menu[i].checked = objChk.checked;
		}
		
}

// �޴� ���� üũ�ڽ� �׵θ� ����
function delBorderCheck() {
	
	var len = document.frm.check_menu.length;
	if( len == 1 ) {
		document.frm.check_menu.style.border = "0px";
	}
	else {
		for( var i=0 ; i < len ; ++i ) {
			document.frm.check_menu[i].style.border = "0px";
		}
	}
	
}
