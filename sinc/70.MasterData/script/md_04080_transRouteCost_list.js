////////////////////////////////////////////////////////////
// 프로그램ID : md_04080_transRouteCost_list.js
// 프로그램명 : 수송Route 기준정보 (조회)
// 개발자  : 이동주
// 개발일자 : 2008-07-28 월요일
//
//관련 job file : job_sinc_70_masterData_00.xml
//
//관련 query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-07-28  이동주     md_04080_transRouteCost_list.js 개발
//
//
////////////////////////////////////////////////////////////

// 더블 클릭 : 상세정보(하단 iframe)
function onclickfunc(row, col, data) {
	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_04080_transRouteCost_mod&tgt_loc_sel=";
	urlStr += data.split("!%!")[0];
	urlStr += "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
		
}