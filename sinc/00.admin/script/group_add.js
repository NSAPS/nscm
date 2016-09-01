
GoSave = function(service) {		
		
		var group_id_insert = document.frm.group_id_insert.value;
		if( group_id_insert == null || group_id_insert == "" ){
			alert("그룹 코드를 입력해 주십시오.");
			document.frm.group_id_insert.focus();
			return;
		}
		
		var group_name_insert = document.frm.group_name_insert.value;
		if( group_name_insert == null || group_name_insert == "" ){
			alert("그룹 명을 입력해 주십시오.");
			document.frm.group_name_insert.focus();
			return;
		}
		
		// 그룹 코드 중복 체크 후 저장
		commonUtil.checkKeyValue(group_id_insert, "group_id_dup_check_in_reg_group", { 
			callback:function(checkResult){
				if( Number(checkResult) > 0 ) {
					alert("입력하신 그룹 코드로 이미 등록된 데이터가 있습니다.");
					document.frm.group_id_insert.select();
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
