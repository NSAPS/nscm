
GoSave = function(service) {		
	
	var user_id_insert = document.frm.user_id_insert.value;
	if(user_id_insert == null || user_id_insert == ''){
		alert("����� ������ �Է��� �ֽʽÿ�.");
		document.frm.user_id_insert.focus();
		return;
	}
	
	var user_name_insert = document.frm.user_name_insert.value;
	if(user_name_insert == null || user_name_insert == ''){
		alert("����� ���� �Է��� �ֽʽÿ�.");
		document.frm.user_name_insert.focus();
		return;
	}
	
	var user_pwd_insert = document.frm.user_pwd_insert.value;
	if(user_pwd_insert == null || user_pwd_insert == ''){
		alert("�α��� ��й�ȣ�� �Է��� �ֽʽÿ�.");
		document.frm.user_pwd_insert.focus();
		return;
	}
	
	var group_id = document.frm.group_id_insert.value;
	if( group_id == -1 ){
		alert("�ش� �׷��� ������ �ֽʽÿ�.");
		document.frm.group_id_insert.focus();
		return;
	}
	
	// ����� ���� �ߺ� üũ �� ����
	commonUtil.checkKeyValue(user_id_insert, "user_id_dup_check_in_reg_user", { 
		callback:function(checkResult){
			if( Number(checkResult) > 0 ) {
				alert("�Է��Ͻ� �������� �̹� ��ϵ� �����Ͱ� �ֽ��ϴ�.");
				document.frm.user_id_insert.select();
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

// �׷� ���� �� ȭ���� refresh �Ͽ� �ش� �׷쿡 �´� �޴� �����ֱ� 
function changeGroup( service, objGroup ) { 
	
	if( objGroup.value == "-1" ) { 
		alert("�ش� �׷��� ������ �ֽʽÿ�."); 
		document.frm.group_id_insert.focus();
		return; 
	} 
	document.frm.group_change.value = "Y"; 
	document.frm.group_id.value = objGroup.value; 
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit(); 
	
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
