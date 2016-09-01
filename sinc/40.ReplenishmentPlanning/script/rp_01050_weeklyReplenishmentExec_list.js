////////////////////////////////////////////////////////////
// 프로그램ID : rp_01050_weeklyReplenishmentExec_list.js
// 프로그램명 : 주간계획 생성
// 개발자  : 허준성
// 개발일자 : 2008-08-08 금요일(베이징 올림픽 개막일)
//
//관련 job file : job_sinc_40_replenishmentPlanning_00.xml
//
//관련 query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-08  허준성     rp_01050_weeklyReplenishmentExec_list.js 개발
//
//
////////////////////////////////////////////////////////////

// 기간 : 시작일 변경 --> 종료일 동적으로 변경
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

// 계획구간의 to_date의 값을 default로 from_date의 6일 뒤 값을 갖도록 처리(값이 없으면 default로 넘어감)
function setDate(){
	if(document.frm.to_date.value != ""){}
	else{
		document.frm.to_date.value = sumDate(document.frm.from_date);
	}
}

// version - seq 분리
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

// 확정 버튼을 클릭했을때 호출되는 FUNCTION
function GoSearch(service) {
	
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
