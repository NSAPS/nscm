setCalendarFactor =  function(obj) {
	var is_holiday = "";	
	var idx = Number(obj.parentNode.rowIndex);
	if(idx > 0){
		idx = idx / 2;
	}
	if (obj.style.color == "black") {	
		if(!confirm("휴일로 변경 하시겠습니까?")){
			return;
		}
		
		obj.style.color = "red";
		obj.style.background = "#FFF0F5";
		is_holiday = "Y";
		
		var hCnt = Number(document.frm.holidayCnt[idx].value)+1;
		document.frm.holidayCnt[idx].value = hCnt;
		
		obj.parentNode.childNodes(8).innerHTML = "휴일 : " + hCnt + " 일";
		
	} else {
		if(!confirm("평일로 변경 하시겠습니까?")){
			return;
		}	
		
		obj.style.color = "black";
		obj.style.background = "#FFFFCC";
		is_holiday = "";
		
		var hCnt = Number(document.frm.holidayCnt[idx].value)-1;
		document.frm.holidayCnt[idx].value = hCnt;
		
		obj.parentNode.childNodes(8).innerHTML = "휴일 : " + hCnt + " 일";
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
		alert("변경되었습니다.");
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

// HTML Grid 화면 resizing 2
// 틀고정이 적용안된 HTML Grid 화면
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
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
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