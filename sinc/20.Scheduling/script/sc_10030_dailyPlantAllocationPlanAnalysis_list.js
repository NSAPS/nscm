// 기간 : 시작일 변경 --> 종료일 동적으로 변경
function sumDate( strDate ){
	
	if(chkDate(strDate,"10") == 0) return;
	if(strDate == null){
		var temp = new Date();
		temp.setDate(temp.getDate() + 20);
	}
	else{	
		var sdate = strDate.value.split("-");
		var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
		temp.setDate(temp.getDate() + 20);		
	}
	
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var date = temp.getDate();
	if(date < 10) date = "0" + date;
	var edate = year+ "-" + month+ "-" + date;
	//alert(edate);											
	document.frm.edate.value = edate;
}

// 더블 클릭 : POPUP
function onclickfunc( row, col, data ) {
	
	var service_url = "service.do?_moon_service=sc_10030_dailyPlantAllocationPlanAnalysis_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	if( col >2 && col < 5) {
		//alert(document.frm.selected_plant.options[document.frm.selected_plant.selectedIndex].text);
		
		//var selected_plant = document.frm.selected_plant.value;
		var version = document.frm.version.value;	
		var item_id = data.split("!%!")[2];	
		var sdate = document.frm.sdate.value;	
		
		if( document.frm.selected_plant.value )
			service_url += "&plant_id=" + document.frm.selected_plant.value;
	}	
	else if( col > 8 ){
		var version = document.frm.version.value;	
		var item_id = data.split("!%!")[2];	
		var sdate = document.frm.sdate.value;	
		var due_date = sumDate2(sdate, col-9);
		var plant_id = data.split("!%!")[5];
		
		service_url += "&due_date=" + due_date + "&plant_id=" + plant_id;
	}
	else{
		return;
	}
	service_url += "&version=" + version + "&item_id=" + item_id + "&sdate=" + sdate;
	
	
		
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=500, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PLANT_ALLOC_ANALYSIS_POPUP", pop_win_style); 
	newWin.focus();
	
}

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