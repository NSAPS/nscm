setCalendarFactor =  function(obj) {
	var is_holiday = "";	
	var idx = Number(obj.parentNode.rowIndex);
	if(idx > 0){
		idx = idx / 2;
	}
	if (obj.style.color == "black") {	
		if(!confirm("���Ϸ� ���� �Ͻðڽ��ϱ�?")){
			return;
		}
		
		obj.style.color = "red";
		obj.style.background = "#FFF0F5";
		is_holiday = "Y";
		
		var hCnt = Number(document.frm.holidayCnt[idx].value)+1;
		document.frm.holidayCnt[idx].value = hCnt;
		
		obj.parentNode.childNodes(8).innerHTML = "���� : " + hCnt + " ��";
		
	} else {
		if(!confirm("���Ϸ� ���� �Ͻðڽ��ϱ�?")){
			return;
		}	
		
		obj.style.color = "black";
		obj.style.background = "#FFFFCC";
		is_holiday = "";
		
		var hCnt = Number(document.frm.holidayCnt[idx].value)-1;
		document.frm.holidayCnt[idx].value = hCnt;
		
		obj.parentNode.childNodes(8).innerHTML = "���� : " + hCnt + " ��";
	}
	
	var selected_date = obj.value;
	
	updateCalendar(is_holiday, selected_date);
}

updateCalendar = function(is_holiday, selected_date) {
	var paramKeys = "is_holiday!%!selected_date";
	var paramCodes = is_holiday+"!%!"+selected_date;	
	
	commonUtil.executeQuery(paramKeys, paramCodes, "md_05160_calendarHoliday_update", success);
}

success = function(data) {
	if (data == "SUCCESS") {
		alert("����Ǿ����ϴ�.");
	}
}

setColor = function(obj) {
	if (Number(obj.value) < 1) {
		obj.style.color = "red";
	} else if (Number(obj.value) == 1) {
		obj.style.color = "black";
	} else {
		obj.style.color = "blue";
	}
}

// HTML Grid ȭ�� resizing 2
// Ʋ������ ����ȵ� HTML Grid ȭ��
function setHtmlGridAutoResize2( tab_h, table_h ){
	
	var topLineHeightValue = topLine.style.height.split("px")[0]; 
	
	var maxWidthValue;
	var maxHeightValue;
	
	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	var mainDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) ; 
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
		mainDiplayHeightValue += Number(search_h); 
	} 
	
	var tabWidthValue = Number(maxWidthValue) - 15;
	var tableWidthValue = Number(maxWidthValue) - 20;
	var topLineWidthValue = Number(maxWidthValue) - 20;
	var displayWidthValue = Number(maxWidthValue) - 20;
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	if( mainDiplayHeightValue < 1 ) 
		mainDiplayHeightValue = 1;
	
	if( tableWidthValue < 1 ) 
		tableWidthValue = 1; 
	if( topLineWidthValue < 1 ) 
		topLineWidthValue = 1; 
	if( displayWidthValue < 1 ) 
		displayWidthValue = 1;
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tbMain.style.height = tableHeightValue + "px"; 
	mainDisplay.style.height = mainDiplayHeightValue + "px";
	
	tabPage1.style.width = tabWidthValue + "px";
	tbMain.width = tableWidthValue + "px"; 
	topLine.style.width = topLineWidthValue + "px"; 
	mainDisplay.style.width = displayWidthValue + "px";
	
}