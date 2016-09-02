//조회시 날짜를 YYYY-MM-DD ->  YYYYMMDD로 변환
GoSearch = function(service) {
	
	var	temp_in_cnfm_date = document.frm.in_cnfm_date.value;
	document.frm.in_cnfm_date.value = delDateDelimiter(document.frm.in_cnfm_date.value);

	
	viewWait();// 조회시 WAITING 이미지 보여주기
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	//doChange1(this, 0, 0);

	document.frm.in_cnfm_date.value = temp_in_cnfm_date;
	
};