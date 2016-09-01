
// 화면명을 클릭하면 해당 화면으로 이동
function moveWin( service ) {
	
	var service_url = "service.do?_moon_service=";
	service_url += service;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1";
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, "
						+ "width=750, height=500, top=0, left=200";
	var newWin = window.open(service_url, "VIEW_MD", pop_win_style);
	newWin.focus();
	
}
