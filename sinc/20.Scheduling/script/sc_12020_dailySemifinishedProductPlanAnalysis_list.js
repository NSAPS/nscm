// ���� Ŭ�� : POPUP
function onclickfunc( row, col, data ) {
	
	var service_url = "service.do?_moon_service=sc_12020_dailySemifinishedProductPlanAnalysis_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	if( col > 5 && col < 9 ){ 
		//alert(document.frm.selected_plant.options[document.frm.selected_plant.selectedIndex].text);
		//DS.PLNAT_ID, HR.PLANT_NAME, HR.TEAM_NAME, HR.PROC_ID, HR.PROC_NAME, DS.ITEM_ID, IM.ITEM_NAME, IM.SPEC, IM.QTY, DS.LINE_ID
		var plant_id = data.split("!%!")[0];
		var line_id = data.split("!%!")[9];
		var proc_id = data.split("!%!")[3];
		var item_id = data.split("!%!")[5];
		var version = document.frm.version.value;
		var seq = document.frm.seq.value;
		var sdate = document.frm.sdate.value;	
	}	
	else if( col > 11){
		var plant_id = data.split("!%!")[0];
		var line_id = data.split("!%!")[9];
		var proc_id = data.split("!%!")[3];
		var item_id = data.split("!%!")[5];
		var version = document.frm.version.value;
		var seq = document.frm.seq.value;
		var sdate = document.frm.sdate.value;	
		
		var prodDates = sumDate2(document.frm.sdate.value, (col -12)/3);	 
	
		service_url += "&prod_dates=" + prodDates;
	
		var shiftType
		if( (col - 11) > 0){
			var temp = (col - 11) % 3;		
			if( temp == 1) shiftType = 1; //��
			else if( temp == 2) shiftType = 3; //��
			else shiftType = 5; //��
			
			service_url += "&shift_type=" + shiftType;
		}
	}
	else{
		return;
	}
	service_url += "&plant_id=" + plant_id + "&line_id=" + line_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&seq=" + seq + "&sdate=" + sdate;
		
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=500, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_SEMI_ANALYSIS_POPUP", pop_win_style); 
	newWin.focus();
	
}

// �Ⱓ : ������ ���� --> ������ �������� ����
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

// ���� Ŭ���� ���� �´� prod_date ���
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

// version - seq �и�
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}