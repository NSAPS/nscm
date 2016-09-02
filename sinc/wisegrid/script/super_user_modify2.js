
function GoSave(service) {
		
		var user_pwd_insert = document.frm.user_pwd_insert.value;
		if(user_pwd_insert == null || user_pwd_insert == ''){
			alert("로그인 비밀번호를 입력해 주십시오.");
			document.frm.user_pwd_insert.focus();
			return;
		}
		
		var group_id = document.frm.group_id.value;
		if( group_id == "-1" ){
			alert("해당 그룹을 지정해 주십시오.");
			document.frm.group_id.focus();
			return;
		}
		
		// service_id 저장
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
		
}

// 그룹 변경 시 화면을 refresh 하여 해당 그룹에 맞는 메뉴 보여주기 
function changeGroup( service, objGroup, group_id ) { 
		
		document.frm.group_change.value = "Y"; 
		if( objGroup.value == "" ) 
			objGroup.value = group_id; 
		
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

// 비밀번호 변경 Popup 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openChangePw() {

		if( !(w_size) ) { 
			var w_size = 400; 
			var h_size = 230; 
		} 
		
		var user_seq = document.frm.user_seq.value;
		
		var service_url = "service.do?_moon_service=password_change_popup&user_seq=" + user_seq;
		service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
		
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
		var newWin = window.open(service_url, "PW_Change", pop_win_style); 
		newWin.focus();
		
}

// Password 초기화
function initPwd() {
		
		if( !confirm("비밀번호를 초기화합니다.(init00)") ){
			return;
		}
		GoSave("super_user_update_init_pwd");
		
}
