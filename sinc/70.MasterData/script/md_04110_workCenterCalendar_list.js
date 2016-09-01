
// 더블 클릭 : 수정화면으로 이동
function onclickfunc(row, col, data) {
	
//	GoSearch("md_04110_workCenterCalendar_mod");
	var sel_plant = document.frm.sel_plant.value;
	var sel_line = data.split("!%!")[0];
	var sel_cycle_type = document.frm.sel_cycle_type.value;
	var sel_cal_grp = document.frm.sel_cal_grp.value;

	var urlStr = "service.do?_moon_service=md_04110_workCenterCalendar_mod";
	urlStr += "&sel_plant=" + sel_plant + "&sel_line=" + sel_line + "&sel_cycle_type=" + sel_cycle_type+ "&sel_cal_grp=" + sel_cal_grp;

	location.href = urlStr;
}

