
// 변경 더블 클릭
function onclickfunc(row, col, data) {
	
	var user_id = document.frm._user_id.value;
	var adminFlag = document.frm.adminFlag.value;
	// 계정!%!사번!%!사용자명!%!그룹명!%!이메일!%!전화번호
	if( data.split("!%!")[0] == user_id || adminFlag == "Y" ) {
		var perpage = document.frm._moon_perpage.value;
		var pagenumber = document.frm._moon_pagenumber.value;
		var urlStr = "service.do?_moon_service=user_detail&user_id=";
		urlStr += data.split("!%!")[0];
		urlStr += "&_moon_perpage=" + perpage + "&_moon_pagenumber=" + pagenumber;
		location.href = urlStr;
	}
	
}
