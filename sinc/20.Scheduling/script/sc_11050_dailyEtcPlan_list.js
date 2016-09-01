// 더블 클릭 : 상세정보(하단 iframe)
function onclickfunc(row, col, data) {
		
	var urlStr = "service.do?_moon_service=sc_11050_dailyEtcPlanReferenceInfo_list";
	//alert(data);
	var list = data.split("!%!");
	urlStr += "&plant_id=" + list[4]; // 공장 코드
	urlStr += "&item_id=" + list[1]; // 아이템 코드
	urlStr += "&dc_id=" + list[5]; // DC_ID
	urlStr += "&tot=" + list[6]; // 합계	
	
	var sdate = document.frm.stored_sdate.value;	
	
	urlStr += "&sdate=" + sdate;
		
	gridDetailInfo.location.href = urlStr;
		
}

// 기간 : 시작일 변경 --> 종료일 동적으로 변경
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


