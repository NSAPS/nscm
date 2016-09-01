function displayLineChart(item_code, site_code, dc_code, title) {
	document.frm.title.value = title;	
	var paramKeys = 'item_code!%!site_code!%!dc_code';
	var paramCodes = item_code+'!%!'+site_code+'!%!'+dc_code;
	var columns = 'SALES_MONTH!%!SALES_QTY!%!FITTED_QTY!%!UP_VALUE!%!DN_VALUE';
	
	nongshim.getData(paramKeys, paramCodes, 'fc_02030_removeOutlier_chart', columns, "!%!", "/%/", setLineData);
}

function setLineData(data) {
	var rows = data.split('/%/');
	var project = document.frm.project.value;
	var title = document.frm.title.value;
	var cat1 = '판매실적';
	var cat2 = '적합값';
	var cat3 = '상한값';
	var cat4 = '하한값';
	
	var vals1 = '';
	var vals2 = '';
	var vals3 = '';
	var vals4 = '';
	var xLabels = '';
	
	var max = 0;
	for(var i = 0; i < rows.length; i++) { 
		var cols = rows[i].split('!%!');
		
		if( i+1 == rows.length) {
			break;
		} 
		for(var n = 1; n < rows.length; n++) {
			max = max < Number(cols[n]) ? Number(cols[n]) : max;
		}
		
		if ( i == 0 ) {
			xLabels = xLabels + cols[0];
			vals1 = vals1 + cols[1];
			vals2 = vals2 + cols[2];
			vals3 = vals3 + cols[3];
			vals4 = vals4 + cols[4];
			
		} else {
			xLabels = xLabels + ',' + cols[0];
			vals1 = vals1 + ',' + cols[1];
			vals2 = vals2 + ',' + cols[2];
			vals3 = vals3 + ',' + cols[3];
			vals4 = vals4 + ',' + cols[4];
		}
		
	}
	paintLine(project, title, cat1, cat2, cat3, cat4, vals1, vals2, vals3, vals4, xLabels, max);
}

function paintLine(project, title, cat1, cat2, cat3, cat4, vals1, vals2, vals3, vals4, xLabels, max) {
	
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "250", "9", "#FFFFFF");                 
    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 10;}");
    so.addVariable("bg_colour","#FFFFFF");
     so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY좌표 내 백그라운드 색깔
	so.addVariable("y_legend","Zionex,12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");
    so.addVariable("line_dot","2,#CC3399," + cat1 + ",10,5");
    so.addVariable("line_dot_2","2,#468024," + cat2 + ",10,5");
    so.addVariable("line_dot_3","2,#0000FF," + cat3 + ",10,5");
    so.addVariable("line_dot_4","2,#FF9900," + cat4 + ",10,5");   
    so.addVariable("values",vals1);
    so.addVariable("values_2",vals2);
    so.addVariable("values_3",vals3);
    so.addVariable("values_4",vals4);
   // so.addVariable("links",links);
    so.addVariable("x_labels",xLabels);
	so.addVariable("x_label_style","9,#000000,2");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(max));
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );
    so.write(parent.document.getElementById('my_chart'));
    
    parent.document.getElementById('chartArea').style.display = 'block';
    parent.document.getElementById('searchArea').style.display = 'none';    
}

// 클릭한 라인 인덱스
var clickedLineIdx = null;
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
var popImgIdx = null;

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";		
	objTd.childNodes(1).style.display = "block";
	
	
	if( objTd.childNodes(1).tagName.toUpperCase() == "SELECT") { // 공장셀인 경우                              
		objTd.childNodes(1).focus();
	}
	else if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "INPUT"){
		objTd.childNodes(1).childNodes(0).select();
	}
	else {//if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "SELECT" ) {// 라인 셀인 경우	
		objTd.childNodes(1).childNodes(0).focus();
	}	
		
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
	
	var strVal;
	var objTd;
			
	if(objBox.tagName.toUpperCase() == "INPUT"){//품목코드
		strVal = objBox.value;
		objTd = objBox.parentNode.parentNode;		
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		}
		objBox = objBox.parentNode;
	}	
	else if( objBox.tagName.toUpperCase() == "SELECT"){//공장
		strVal = objBox.options[objBox.selectedIndex].text;	
		objTd = objBox.parentNode;
	}
	else{
		strVal = objBox.childNodes(0).value + " <br>&nbsp;";		
		strVal += objBox.childNodes(0).options[objBox.childNodes(0).selectedIndex].text;
		objTd = objBox.parentNode;
	}
	
		
	if( objBox.parentNode.align.toUpperCase() == "CENTER" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal;
	}
	else if( objBox.parentNode.align.toUpperCase() == "RIGHT" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;";
	}
	else {
		objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	}
	
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";
	
}



// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	} 
	else { 
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows.style.backgroundColor = "#ffffff";
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	}
	
}

// 테이블 라인 클릭시 클릭한 라인 표시
function clickLine(objTd) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( rowIdx == clickedLineIdx ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
			clickedLineIdx = null;
		}
		else {
			refreshFrame();
			left_tbody.rows[rowIdx].style.backgroundColor = "#ccccff";
			main_tbody.rows[rowIdx].style.backgroundColor = "#ccccff";
			if( left_tbody.rows[clickedLineIdx] ) {
				left_tbody.rows[clickedLineIdx].style.backgroundColor = "#ffffff";
				main_tbody.rows[clickedLineIdx].style.backgroundColor = "#ffffff";
			}
			clickedLineIdx = rowIdx;
		}
	} 
	else {
		if( rowIdx == clickedLineIdx ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			main_tbody.rows.style.backgroundColor = "#ffffff";
			clickedLineIdx = null;
		}
		else {
			refreshFrame();
			left_tbody.rows.style.backgroundColor = "#ccccff";
			main_tbody.rows.style.backgroundColor = "#ccccff";
			clickedLineIdx = rowIdx;
		}
	}
	
}



// 번호 setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	var clickedFlag = false; // 체크한 라인이 있는지 여부
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
			// 체크가 되어있는 라인이면 clickedLineIdx 설정
			if( left_tbody.rows[i].style.backgroundColor == "#ccccff" ) {
				clickedLineIdx = i;
				clickedFlag = true;
			}
		}
		else {
			divRowNo.innerHTML = "1";
			// 체크가 되어있는 라인이면 clickedLineIdx 설정
			if( left_tbody.rows[i].style.backgroundColor == "#ccccff" ) {
				clickedLineIdx = 1;
				clickedFlag = true;
			}
		}
	}
	
	// 체크되어 있는 라인이 없으면 clickedLineIdx = null
	if( !clickedFlag ) {
		clickedLineIdx = null;
	}
	
}

// 이상요인 찾기
GoSearch = function(service) {
	
	if( (document.frm.selected_start.value == null || document.frm.selected_start.value == "")
	    || (document.frm.selected_end.value == null || document.frm.selected_end.value == "")
	    || (document.frm.limit_std.value == null || document.frm.limit_std.value == "") ){
		alert("조건 항목을 모두 입력 하십시오.");
		return;
	}	
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	 
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// 셀 저장 전역변수
var objTdG;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// HTML Grid 화면 resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
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
	var leftDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) - 17; 
	var mainDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) ; 
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
		leftDiplayHeightValue += Number(search_h); 
		mainDiplayHeightValue += Number(search_h); 
	} 
	
	var tableWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 39;
	var displayWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 20;
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	if( leftDiplayHeightValue < 1 ) 
		leftDiplayHeightValue = 1; 
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
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px"; 
	tbMain.width = tableWidthValue + "px"; 
	topLine.style.width = topLineWidthValue + "px"; 
	mainDisplay.style.width = displayWidthValue + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
} 

function checkAll(obj){
	//alert(obj.value);
	var tabLen = left_tbody.rows.length;
	//alert(tabLen);
	if(obj.value == "N"){
		for( i = 0; i < tabLen; i++){			
			document.frm.check_modify[i].checked = true;
			document.frm.check_modify[i].value = "Y";	
			document.frm.checkModify[i].value = "Y";		
		}
		obj.value = "Y";	
	}
	else{
		for( i = 0; i < tabLen; i++){
			document.frm.check_modify[i].checked = false;
			document.frm.check_modify[i].value = "N";
			document.frm.checkModify[i].value = "N";
		}
		obj.value = "N";		
	}
}

function checkEvent(obj){
	
	var idx = obj.parentNode.parentNode.rowIndex;
	
	if(obj.value == "N"){
		obj.checked = true;
		obj.value = "Y";
		document.frm.checkModify[idx].value = "Y";
	}
	else{
		obj.checked = false;
		obj.value = "N";
		document.frm.checkModify[idx].value = "N";
	}
	
}
