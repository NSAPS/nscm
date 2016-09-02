////////////////////////////////////////////////////////////
// 프로그램ID : rp_02010_orderCrossDocking_list.js
// 프로그램명 : C/D(긴급) 주문량 조회
// 개발자  : 허준성
// 개발일자 : 2008-08-11 월요일
//
//관련 job file : job_sinc_40_replenishmentPlanning_00.xml
//
//관련 query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-11  허준성     rp_02010_orderCrossDocking_list.js 개발
//
//
////////////////////////////////////////////////////////////

// version - seq 분리
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

function gubunChange(){
	
	// 제품 구분 : 긴급품목
    if(document.frm.checked_multi[1].checked){
    	document.frm.check_value.value = "urgency";
		document.frm.trans_date.readOnly = true;
		document.frm.btnS.disabled = true;
	
		// 현재 버전의 날짜로 수송 날짜를 셋팅
		var tmp = document.frm.version.value;
		var plan_date = tmp.substring(0,4)+"-"+tmp.substring(4,6)+"-"+tmp.substring(6,8);
		document.frm.trans_date.value = plan_date;
    }else{ // 제품 구분 : C/D 품목
    	document.frm.check_value.value = "cd";
		document.frm.trans_date.readOnly = false;
		document.frm.btnS.disabled = false;
	}
}

// 저장 버튼 클릭
function GoSearch(service) {

	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}