////////////////////////////////////////////////////////////
// ���α׷�ID : md_04080_transRouteCost_list.js
// ���α׷��� : ����Route �������� (��ȸ)
// ������  : �̵���
// �������� : 2008-07-28 ������
//
//���� job file : job_sinc_70_masterData_00.xml
//
//���� query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-07-28  �̵���     md_04080_transRouteCost_list.js ����
//
//
////////////////////////////////////////////////////////////

// ���� Ŭ�� : ������(�ϴ� iframe)
function onclickfunc(row, col, data) {
	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_04080_transRouteCost_mod&tgt_loc_sel=";
	urlStr += data.split("!%!")[0];
	urlStr += "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
		
}