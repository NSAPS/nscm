////////////////////////////////////////////////////////////
// ���α׷�ID : rp_01060_monthlyReplenishment_list.js
// ���α׷��� : ������ȹ ��ȸ
// ������  : ���ؼ�
// �������� : 2008-08-13 ������
//
//���� job file : job_sinc_40_replenishmentPlanning_00.xml
//
//���� query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-13  ���ؼ�     rp_01060_monthlyReplenishment_list.js ����
//
//
////////////////////////////////////////////////////////////

// version - seq �и�
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}