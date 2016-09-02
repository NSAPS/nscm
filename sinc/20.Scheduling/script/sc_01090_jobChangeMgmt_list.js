// 더블 클릭 : 수정화면으로 이동
function onclickfunc(row, col, data) {
	
	
	//if( col < 7 ){
	//	return;
	//}
	
	var cd_grp_pre = document.frm.cd_grp_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;	
	var plant_name = document.frm.plant_name.value;	
	var jc_type = document.frm.jc_type.value;
	var select_line = document.frm.select_line.value;
	var select_proc = document.frm.select_proc.value;	
	
	var urlStr = "service.do?_moon_service=sc_01090_jobChangeMgmt_mod";
	
	var list = data.split("!%!");
	
	var jc_id = list[0];
	var line_id = list[2];	
	var proc_id = list[4];
	var efficiency = list[11];

	// 가동율이 jc time 테이블에 데이터 없을때 "" 삽입	
	if ( efficiency ) {
	}
	else {		
		efficiency="";		
	}
	

	urlStr += "&cd_grp_pre=" + cd_grp_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	urlStr += "&jc_id=" + jc_id + "&line_id=" + line_id + "&proc_id=" + proc_id;
	urlStr += "&plant_name=" + plant_name + "&jc_type=" + jc_type + "&select_line=" + select_line + "&select_proc=" + select_proc;
	urlStr += "&efficiency=" + efficiency;
	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
	
}



