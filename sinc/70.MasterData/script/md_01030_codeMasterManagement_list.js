
// 더블 클릭 : 수정화면으로 이동
function onclickfunc(row, col, data) {
	
	var cd_grp_pre = document.frm.cd_grp_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	if( data.split("!%!")[0] == "0000" && col != 1 ) {
		document.frm.cd_grp.value = data.split("!%!")[1];
		GoSearch(document.frm._moon_service.value);
	}
	else {
		var urlStr = "service.do?_moon_service=md_01030_codeMasterManagement_mod&cd_grp=";
		urlStr += data.split("!%!")[0];
		urlStr += "&cd_grp_pre=" + cd_grp_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
		urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
		location.href = urlStr;
	}
	
}
