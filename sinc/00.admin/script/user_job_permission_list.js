
// 변경 더블 클릭
function onclickfunc(row, col, data) {
		
		var user_id = document.frm._user_id.value;
		var adminFlag = document.frm.adminFlag.value;
		// 계정!%!사번!%!사용자명!%!그룹명!%!이메일!%!전화번호
		if( data.split("!%!")[0] == user_id || adminFlag == "Y" ) {
			var perpage = document.frm._moon_perpage.value;
			var pagenumber = document.frm._moon_pagenumber.value;
			var urlStr = "service.do?_moon_service=user_job_permission_detail&user_id=";
			urlStr += data.split("!%!")[0];
			urlStr += "&_moon_perpage=" + perpage + "&_moon_pagenumber=" + pagenumber;
			location.href = urlStr;
		}
		
}

// 권한 일괄 적용 버튼 클릭
function exeBatch() {
	
	var msg = "";
	msg += "=========================================================================\n";
	msg += " * 주의\n";
	msg += "=========================================================================\n";
	msg += "1. 반드시 그룹별 메뉴와 권한 설정을 정확히 하고 난 후 실행해야 합니다.\n";
	msg += "2. 그룹별 메뉴와 권한 설정은 \n";
	msg += "    반드시 그룹 메뉴를 먼저 설정하고, 그 다음 권한을 설정해야 합니다. \n";
	msg += "=========================================================================\n";
	msg += "\n 계속 진행하시겠습니까?";
	if( !confirm(msg) ) {
		return;
	}
	else {
		GoSave("execute_permission_batch");
	}
	
}
