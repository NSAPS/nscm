
GoSave = function(service) {		
	
	var user_id_insert = document.frm.user_id_insert.value;
	if(user_id_insert == null || user_id_insert == ''){
		alert("사용자 계정을 입력해 주십시오.");
		document.frm.user_id_insert.focus();
		return;
	}
	
	var user_name_insert = document.frm.user_name_insert.value;
	if(user_name_insert == null || user_name_insert == ''){
		alert("사용자 명을 입력해 주십시오.");
		document.frm.user_name_insert.focus();
		return;
	}
	
	var user_pwd_insert = document.frm.user_pwd_insert.value;
	if(user_pwd_insert == null || user_pwd_insert == ''){
		alert("로그인 비밀번호를 입력해 주십시오.");
		document.frm.user_pwd_insert.focus();
		return;
	}
	
	var group_id = document.frm.group_id_insert.value;
	if( group_id == -1 ){
		alert("해당 그룹을 지정해 주십시오.");
		document.frm.group_id_insert.focus();
		return;
	}
	
	// 사용자 계정 중복 체크 후 저장
	commonUtil.checkKeyValue(user_id_insert, "user_id_dup_check_in_reg_user", { 
		callback:function(checkResult){
			if( Number(checkResult) > 0 ) {
				alert("입력하신 계정으로 이미 등록된 데이터가 있습니다.");
				document.frm.user_id_insert.select();
				return;
			}
			else {
				// service_id 저장
				frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
				
				document.frm._moon_service.value = service;
				document.frm.action = "service.do";
				document.frm.target = "_self";
				document.frm.submit();
			}
		}
	});
	
}

// 그룹 변경 시 화면을 refresh 하여 해당 그룹에 맞는 메뉴 보여주기 
function changeGroup( service, objGroup ) { 
	
	if( objGroup.value == "-1" ) { 
		alert("해당 그룹을 지정해 주십시오."); 
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

// 메뉴 전체 선택/해제	
function clickMenuAll(objChk) {
	
	var len = document.frm.check_menu.length;
	for( var i = 0 ; i < len ; i++ ) {
		document.frm.check_menu[i].checked = objChk.checked;
	}
	
}

// 메뉴 선택 체크박스 테두리 제거
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
