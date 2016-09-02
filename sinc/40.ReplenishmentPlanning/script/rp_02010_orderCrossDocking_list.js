////////////////////////////////////////////////////////////
// ���α׷�ID : rp_02010_orderCrossDocking_list.js
// ���α׷��� : C/D(���) �ֹ��� ��ȸ
// ������  : ���ؼ�
// �������� : 2008-08-11 ������
//
//���� job file : job_sinc_40_replenishmentPlanning_00.xml
//
//���� query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-11  ���ؼ�     rp_02010_orderCrossDocking_list.js ����
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

function gubunChange(){
	
	// ��ǰ ���� : ���ǰ��
    if(document.frm.checked_multi[1].checked){
    	document.frm.check_value.value = "urgency";
		document.frm.trans_date.readOnly = true;
		document.frm.btnS.disabled = true;
	
		// ���� ������ ��¥�� ���� ��¥�� ����
		var tmp = document.frm.version.value;
		var plan_date = tmp.substring(0,4)+"-"+tmp.substring(4,6)+"-"+tmp.substring(6,8);
		document.frm.trans_date.value = plan_date;
    }else{ // ��ǰ ���� : C/D ǰ��
    	document.frm.check_value.value = "cd";
		document.frm.trans_date.readOnly = false;
		document.frm.btnS.disabled = false;
	}
}

// ���� ��ư Ŭ��
function GoSearch(service) {

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}