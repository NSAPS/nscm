// ���� Ŭ�� : ������(�ϴ� iframe)
function onclickfunc(row, col, data) {
		
	var urlStr = "service.do?_moon_service=sc_11050_dailyEtcPlanReferenceInfo_list";
	//alert(data);
	var list = data.split("!%!");
	urlStr += "&plant_id=" + list[4]; // ���� �ڵ�
	urlStr += "&item_id=" + list[1]; // ������ �ڵ�
	urlStr += "&dc_id=" + list[5]; // DC_ID
	urlStr += "&tot=" + list[6]; // �հ�	
	
	var sdate = document.frm.stored_sdate.value;	
	
	urlStr += "&sdate=" + sdate;
		
	gridDetailInfo.location.href = urlStr;
		
}

// �Ⱓ : ������ ���� --> ������ �������� ����
function sumDate( strDate ){
	
	if(chkDate(strDate,"10") == 0) return;
	var sdate = strDate.value.split("-");
	var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
	temp.setDate(temp.getDate() + 20);
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var date = temp.getDate();
	if(date < 10) date = "0" + date;
	var edate = year+ "-" + month+ "-" + date;
	//alert(edate);											
	document.frm.edate.value = edate;
}


