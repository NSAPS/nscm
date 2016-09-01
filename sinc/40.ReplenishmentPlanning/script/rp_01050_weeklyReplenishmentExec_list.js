////////////////////////////////////////////////////////////
// ���α׷�ID : rp_01050_weeklyReplenishmentExec_list.js
// ���α׷��� : �ְ���ȹ ����
// ������  : ���ؼ�
// �������� : 2008-08-08 �ݿ���(����¡ �ø��� ������)
//
//���� job file : job_sinc_40_replenishmentPlanning_00.xml
//
//���� query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-08  ���ؼ�     rp_01050_weeklyReplenishmentExec_list.js ����
//
//
////////////////////////////////////////////////////////////

// �Ⱓ : ������ ���� --> ������ �������� ����
function sumDate( strDate ){
	
	if(chkDate(strDate,"10") == 0) return;
	if(strDate == null){
		var temp = new Date();
		temp.setDate(temp.getDate() + 6);
	}
	else{	
		var sdate = strDate.value.split("-");
		var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
		temp.setDate(temp.getDate() + 6);		
	}
	
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var date = temp.getDate();
	if(date < 10) date = "0" + date;
	var edate = year+ "-" + month+ "-" + date;
	//alert(edate);											
	return edate;
}

// ��ȹ������ to_date�� ���� default�� from_date�� 6�� �� ���� ������ ó��(���� ������ default�� �Ѿ)
function setDate(){
	if(document.frm.to_date.value != ""){}
	else{
		document.frm.to_date.value = sumDate(document.frm.from_date);
	}
}

// version - seq �и�
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

// Ȯ�� ��ư�� Ŭ�������� ȣ��Ǵ� FUNCTION
function GoSearch(service) {
	
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}
