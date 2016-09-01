// 더블 클릭 : POPUP
function onclickfunc( row, col, data ) {
	//alert(col);
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysis_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	if( col > 6 && col < 9){
		//alert(document.frm.selected_plant.options[document.frm.selected_plant.selectedIndex].text);
		
		var plant_id = document.frm.selected_plant.value;
		//var line_id = data.split("!%!")[9];
		var proc_id = data.split("!%!")[4];
		var item_id = data.split("!%!")[6];
		var version = data.split("!%!")[11];
		var seq = data.split("!%!")[12];
		var sdate = document.frm.sdate.value;	
	}
	else if( col > 14 ){
		var plant_id = document.frm.selected_plant.value;
		//var line_id = data.split("!%!")[7];
		var proc_id = data.split("!%!")[4];
		var item_id = data.split("!%!")[6];
		var version = data.split("!%!")[11];
		var seq = data.split("!%!")[12];
		var sdate = document.frm.sdate.value;	
		
		var prodDates = sumDate2(document.frm.sdate.value, (col -15)/3);	 
	
		service_url += "&prod_dates=" + prodDates;
	
		var shiftType
		if( (col - 14) > 0){
			var temp = (col - 14) % 3;		
			if( temp == 1) shiftType = 1; //조
			else if( temp == 2) shiftType = 3; //주
			else shiftType = 5; //야
			
			service_url += "&shift_type=" + shiftType;
		}
	}
	else{
		return;
	} 
	 
//	var service_url_info = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisInfo_popup&_moon_perpage=200&_moon_pagenumber=1";
//	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=940, height=500, top=0, left=700";
//	var newWin = window.open(service_url_info, "SC_DAILY_PROD_ANALYSIS_INFO_POPUP", pop_win_style); 
	
	//service_url += "&plant_id=" + plant_id + "&line_id=" + line_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&seq=" + seq + "&sdate=" + sdate;
	service_url += "&plant_id=" + plant_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&seq=" + seq + "&sdate=" + sdate;
		
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1000, height=800, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_POPUP", pop_win_style); 
	newWin.focus(); 
	 
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

// 더블 클릭한 열에 맞는 prod_date 계산
function sumDate2( strDate, date ){
	
	var sdate = strDate.split("-");
	var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
	temp.setDate(temp.getDate() + Number(date));
	//alert(temp);
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	else month = month + "";
	var date = temp.getDate();
	if(date < 10) date = "0" + date;
	else date = date + "";
	//alert(year + ", " + month+", " + date);
	var edate = year + month + date + "";
	//alert(edate);											
	return edate;
}

// version - seq 분리
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}
