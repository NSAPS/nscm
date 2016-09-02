// 기간 : 시작일 변경 --> 종료일 동적으로 변경
function sumDate( strDate ){
	
	if(chkDate(strDate,"7") == 0) return;
	var sdate = strDate.value.split("-");
	var temp = new Date(sdate[0], sdate[1]-1);
	temp.setMonth(temp.getMonth() + 5);
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var edate = year+ "-" + month;
	//alert(edate);											
	document.frm.end_month.value = edate;
}

// version - seq 분리
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

// 조회 버튼 클릭
function GoSearch(service) {
	
	var plant = document.frm.selected_plant.value;
	var version = document.frm.selected_version.value;
	
	// 공장을 선택하지 않은 경우
	if( plant == "" ) {
		alert("공장을 선택해 주십시요.");
		return;
	}
	
	// 해당 버전이 없는 경우 
	if( version == "" ) {
		alert("해당 공장의 계획버전이 존재하지 않습니다.");
		return;
	}
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

