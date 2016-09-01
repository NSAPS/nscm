//############################################################
//## 프로그램ID : sc_11020_dailyProductionPlanAnalysisNewItem_reg
//## 프로그램명 : 일간생산계획 분석(재구성) - 등록 화면(POPUP)
//## 개발자  : 정재교
//## 개발일자 : 2008-11-27 목요일
//##
//##관련 job file : job_sinc_20_scheduling_00.xml
//##
//##관련 query file : query_sinc_20_scheduling_00.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2008-11-27  정재교          sc_11020_dailyProductionPlanAnalysisNewItem_reg.js 개발
//##
//##
//############################################################

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
//function clickLine(objTd) {
//	
//	var rowIdx = objTd.parentNode.rowIndex;
//	if( left_tbody.rows[rowIdx] ) {
//		if( rowIdx == clickedLineIdx ) {
//			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
//			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
//			clickedLineIdx = null;
//		}
//		else {
//			refreshFrame();
//			left_tbody.rows[rowIdx].style.backgroundColor = "#ccccff";
//			main_tbody.rows[rowIdx].style.backgroundColor = "#ccccff";
//			if( left_tbody.rows[clickedLineIdx] ) {
//				left_tbody.rows[clickedLineIdx].style.backgroundColor = "#ffffff";
//				main_tbody.rows[clickedLineIdx].style.backgroundColor = "#ffffff";
//			}
//			clickedLineIdx = rowIdx;
//		}
//	} 
//	else {
//		if( rowIdx == clickedLineIdx ) {
//			left_tbody.rows.style.backgroundColor = "#ffffff";
//			main_tbody.rows.style.backgroundColor = "#ffffff";
//			clickedLineIdx = null;
//		}
//		else {
//			refreshFrame();
//			left_tbody.rows.style.backgroundColor = "#ccccff";
//			main_tbody.rows.style.backgroundColor = "#ccccff";
//			clickedLineIdx = rowIdx;
//		}
//	}
//	
//}


// 클릭한 수송일자 인덱스
var clickedDateIdx = null;

// 날짜 검색 POP BTN mouseOver
function overBtn( objBtn ) {
	
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// 날짜 검색 POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
}

// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRow( objBtn ) {
	
	if( objBtn.parentNode ) {
		var insertRowIndex = objBtn.parentNode.parentNode.rowIndex;
		insertRowIndex = insertRowIndex + 1;
		var oRowLeft = left_tbody.insertRow(insertRowIndex);
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	else {
		//alert("addRow else");
		var oRowLeft = left_tbody.insertRow();
		var oRowMain = main_tbody.insertRow();
	}
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 24;  //행 높이
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 24; //행 높이
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 삭제		
	var oCell2 = oRowLeft.insertCell(); // 공장	
	var oCell3 = oRowLeft.insertCell(); // 작업장
	var oCell4 = oRowLeft.insertCell(); // 제품
	
	var oCell5 = oRowMain.insertCell(); // 생산일자
	var oCell6 = oRowMain.insertCell(); // shift
//	var oCell7 = oRowMain.insertCell(); // 시작일시 date
//	var oCell8 = oRowMain.insertCell(); // 시작일시 time
//	var oCell9 = oRowMain.insertCell(); // 종료일시 date
//	var oCell10 = oRowMain.insertCell(); // 종료일시 time
	var oCell11 = oRowMain.insertCell(); // 수량
	var oCell12 = oRowMain.insertCell(); // 오더번호
	var oCell13 = oRowMain.insertCell(); // 오더 항목 번호
	
//	oCell5.onclick = function() { alert("1");
//		/*Calendar.setup({
//			inputField  : "input_prod_dates", // id of the input field
//			ifFormat    : "%Y-%m-%d",     // format of the input field 
//			button      : "startBtn",      // trigger for the calendar (button ID)
//			align       : "Tl",           // alignment (defaults to "Bl")
//			singleClick : true
//		}); */};
			
	oCell0.align = "center"; oCell0.width = document.frm.top_left1.value; // 번호
	oCell1.align = "center"; oCell1.width = document.frm.top_left2.value; // 삭제	
	oCell2.align = "center"; oCell2.width = document.frm.top_left3.value; // 공장
	oCell3.align = "center"; oCell3.width = document.frm.top_left4.value; // 작업장
	oCell4.align = "center"; oCell4.width = document.frm.top_left5.value; // 제품
	
	oCell5.align = "center"; 	oCell5.width = document.frm.top_line1.value;  // 생산일자
	oCell6.align = "center"; 	oCell6.width = document.frm.top_line2.value;  // shift
//	oCell7.align = "center"; 	oCell7.width = document.frm.s_date.value;  // 시작일시 date
//	oCell8.align = "center"; 	oCell8.width = document.frm.s_time.value;  // 시작일시 time
//	oCell9.align = "center"; 	oCell9.width = document.frm.e_date.value;  // 종료일시	 date
//	oCell10.align = "center"; 	oCell10.width = document.frm.e_time.value;  // 종료일시 time
	oCell11.align = "right"; 	oCell11.width = document.frm.top_line5.value; // 수량
	oCell12.align = "center"; 	oCell12.width = document.frm.top_line6.value; // 오더번호
	oCell13.align = "center"; 	oCell13.width = document.frm.top_line7.value; // 오더 항목 번호
		
	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	
	
	// 삭제
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";	
	
	// 공장
	oCell2.innerHTML = "<select " 
					    + "name=\"input_plant_id\" onKeyDown=\"moveNextBox(this);\" tabindex=\"1\" "
					    + "onChange=\"doChangeProc(this); \" style=\"width:100%; padding-left:5px; \"> "					   
        			    + document.frm.plant_loc_sel_str.value + "</select> "
        			    + "<input type=\"hidden\" name=\"input_version\" value=\"\">";						
						
	// 작업장	
	oCell3.innerHTML = "<a id=\"divProcSelect\" style=\"width:100%; \" ><select "
						+ "name=\"input_proc_id\" onKeyDown=\"moveNextBox(this); \" style=\"width:100%; padding-left:5px; \" tabindex=\"2\" > "												
						+ "style=\"width:100%; padding-left:5px; \"> "						
            			+ "<option value=\"\">선택</option>"
            			+ "</select></a>";
	
	// 제품
	oCell4.innerHTML = "<a id=\"divItem\"><select "
						+ "name=\"input_item_id\" onKeyDown=\"moveNextBox(this); \" style=\"width:100%; padding-left:5px; \" tabindex=\"3\" > "
						+ "<option value=\"\">선택</option> "
						+ "</select></a>";
	
	// 생산일자	
	oCell5.innerHTML = "<input type=\"text\" name=\"input_prod_dates\" class=\"normal\" value=\"\" "
						+ "onChange=\"chkDate(this,'8'); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"4\" >";
	
	// shift
	oCell6.innerHTML = "<select name=\"input_shift_type\" style=\"width:100%; \" tabindex=\"4\" > "
						+ "<option value=\"1\" >조</option> "
						+ "<option value=\"3\" >주</option> "
						+ "<option value=\"5\" >야</option> "
						+ "</select>";
	// 시작일시 date
//	oCell7.innerHTML = "<input type=\"text\" name=\"input_start_date\" class=\"normal\" value=\"\" "
//						+ "onChange=\"dateFormatCheck(this); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"5\" >";
	// 시작일시 time
//	oCell8.innerHTML = "<input type=\"text\" name=\"input_start_time\" class=\"normal\" value=\"\" "
//						+ "onChange=\"timeFormatCheck(this); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"6\" >";
	
	// 종료일시 date
//	oCell9.innerHTML = "<input type=\"text\" name=\"input_end_date\" class=\"normal\" value=\"\" " 
//					    + "onChange=\"dateFormatCheck(this); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"7\" >";	
					    
	// 종료일시 time
//	oCell10.innerHTML = "<input type=\"text\" name=\"input_end_time\" class=\"normal\" value=\"\" " 
//					    + "onChange=\"timeFormatCheck(this); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"8\" >";					    
    
    // 수량
    oCell11.innerHTML = "<input type=\"text\" name=\"input_shift_qty\" class=\"normal\ value=\"\" " 
					    + "onChange=\"checkNum(this,'BLANK_INT_UP'); \" style=\"width:100%; border:0px; text-align:right; padding-right:5px; \" tabindex=\"9\" >";					    
    
    // 오더번호
    oCell12.innerHTML = "<input type=\"text\" name=\"input_ord_no\" class=\"normal\" value=\"\" " 
					    + "style=\"width:100%; border:0px; text-align:center; \" tabindex=\"10\" >";					    
    
    // 오더 항목 번호
    oCell13.innerHTML = "<input type=\"text\" name=\"input_ord_item_no\" class=\"normal\" value=\"\" " 
					    + "style=\"width:100%; border:0px; text-align:center; \" tabindex=\"11\" >";					    
           			    
	document.recalc();
	setRowNo();
	
}

// 번호 setting
//function setRowNo() {
//	
//	var tableLen = left_tbody.rows.length;
//	var clickedFlag = false; // 체크한 라인이 있는지 여부
//	
//	for( var i = 0 ; i < tableLen ; ++i ) {
//		if( divRowNo[0] ) {
//			divRowNo[i].innerHTML = i+1;
//			// 체크가 되어있는 라인이면 clickedLineIdx 설정
//			if( left_tbody.rows[i].style.backgroundColor == "#ccccff" ) {
//				clickedLineIdx = i;
//				clickedFlag = true;
//			}
//		}
//		else {
//			divRowNo.innerHTML = "1";
//			// 체크가 되어있는 라인이면 clickedLineIdx 설정
//			if( left_tbody.rows[i].style.backgroundColor == "#ccccff" ) {
//				clickedLineIdx = 1;
//				clickedFlag = true;
//			}
//		}
//	}
//	
//	// 체크되어 있는 라인이 없으면 clickedLineIdx = null
//	if( !clickedFlag ) {
//		clickedLineIdx = null;
//	}
//	
//}
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	areaTot.innerHTML = tableLen;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
		}
		else {
			divRowNo.innerHTML = "1";
		}
	}
	
}

// row 삭제 
// parameter : button object
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	//alert("rowIdx : " + delRowIdx + ", tableLen : " + tableLen);
	if( tableLen > 1 )
	{
		delRowDo( delRowIdx ); 
		rowFormed(); //<--1
	}
	else{
		delRowDo( delRowIdx );
		addRow(left_tbody.rows.length);
	}
	setRowNo();
	
	
}

// 실제 row 삭제 함수
// parameter : 삭제할 rowIndex
function delRowDo( rowIdx ) { 
	//alert(left_tbody.rows.length + ", " + main_tbody.rows.length);
	left_tbody.deleteRow(rowIdx); 
	main_tbody.deleteRow(rowIdx);
	
}

// 라인 삭제를 하면 버튼의 스타일이 잘 안먹는다. 따라서, 최 하단 라인을 지웠다 재생성한다.
// 이렇게 하면 버튼의 스타일이 잘 먹는다.
// 최 하단 라인 데이터 기억 & 삭제 & 생성 & 채움
function rowFormed() {
	
	memLastRow();//<--2
	var tableLen = left_tbody.rows.length;
	delRowDo( tableLen - 1 );
	//alert(left_tbody.rows.length);
	addRow(left_tbody.rows.length);
	setLastRow();
		
} 

var arrData = new Array(13);
// 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	 
	// value값 저장
	if(document.frm.input_plant_id[tableLen-1] && (tableLen-1) > 0)
		arrData[0] 	= document.frm.input_plant_id[tableLen-1].value; // 공장			
	else
		arrData[0] 	= document.frm.input_plant_id.value; // 공장
	
	if( document.frm.input_proc_id[tableLen-1] && (tableLen-1) > 0)
		arrData[1] 	= document.frm.input_proc_id[tableLen-1].value; // 작업장	
	else
		arrData[1] 	= document.frm.input_proc_id.value; // 작업장
		
	if(document.frm.input_item_id[tableLen-1] && (tableLen-1) > 0)
		arrData[2] 	= document.frm.input_item_id[tableLen-1].value; // 제품
	else
		arrData[2] 	= document.frm.input_item_id.value; // 제품
		
	if(document.frm.input_prod_dates[tableLen-1] && (tableLen-1) > 0)
		arrData[3] 	= document.frm.input_prod_dates[tableLen-1].value; // 생산일자
	else
		arrData[3] 	= document.frm.input_prod_dates.value; // 생산일자
	
	if(document.frm.input_shift_type[tableLen-1] && (tableLen-1) > 0)
		arrData[4] 	= document.frm.input_shift_type[tableLen-1].value; // SHIFT
	else
		arrData[4] 	= document.frm.input_shift_type.value; // SHIFT
		
//	if(document.frm.input_start_date[tableLen-1] && (tableLen-1) > 0)
//		arrData[5] 	= document.frm.input_start_date[tableLen-1].value; // 시작일시 DATE
//	else
//		arrData[5] 	= document.frm.input_start_date.value; // 시작일시 DATE
//		
//	if(document.frm.input_start_time[tableLen-1] && (tableLen-1) > 0)
//		arrData[6] 	= document.frm.input_start_time[tableLen-1].value; // 시작일시 TIME
//	else
//		arrData[6] 	= document.frm.input_start_time.value; // 시작일시 TIME
//		
//	if(document.frm.input_end_date[tableLen-1] && (tableLen-1) > 0)
//		arrData[7]	= document.frm.input_end_date[tableLen-1].value; // 종료일시 DATE
//	else
//		arrData[7]	= document.frm.input_end_date.value; //종료일시 DATE
//		
//	if(document.frm.input_end_time[tableLen-1] && (tableLen-1) > 0)
//		arrData[8]	= document.frm.input_end_time[tableLen-1].value; // 종료일시 TIME
//	else
//		arrData[8]	= document.frm.input_end_time.value; //종료일시 TIME
		
	if(document.frm.input_shift_qty[tableLen-1] && (tableLen-1) > 0)
		arrData[9]	= document.frm.input_shift_qty[tableLen-1].value; // 수량
	else
		arrData[9]	= document.frm.input_shift_qty.value; // 수량
		
	if(document.frm.input_ord_no[tableLen-1] && (tableLen-1) > 0)
		arrData[10]	= document.frm.input_ord_no[tableLen-1].value; // 오더번호
	else
		arrData[10]	= document.frm.input_ord_no.value; //오더번호
		
	if(document.frm.input_ord_item_no[tableLen-1] && (tableLen-1) > 0)
		arrData[11]	= document.frm.input_ord_item_no[tableLen-1].value; // 오더 항목 번호
	else
		arrData[11]	= document.frm.input_ord_item_no.value; //오더 항목 번호
	
	if(left_tbody.rows[tableLen-1] && (tableLen-1) > 0)
		arrData[12]  = left_tbody.rows[tableLen-1].style.backgroundColor; // 체크 color
	else
		arrData[12]  = left_tbody.style.backgroundColor; // 체크 color
	
}

// 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	//alert(arrData[0]);
	// value값 채움		
	if(document.frm.input_plant_id[tableLen-1].options){ // 공장
		for( i = 0 ; i < document.frm.input_plant_id[tableLen-1].options.length ; i++){
			if(document.frm.input_plant_id[tableLen-1].options[i].value == arrData[0])
				document.frm.input_plant_id[tableLen-1].options[i].selected = true;
		}
		doChangeProc(document.frm.input_plant_id[tableLen-1]); //작업장 select 태그 생성
	}
	else{									// 공장
		for( i = 0 ; i < document.frm.input_plant_id.options.length ; i++){
			if(document.frm.input_plant_id.options[i].value == arrData[0])
				document.frm.input_plant_id.options[i].selected = true;
		}
		doChangeProc(document.frm.input_plant_id); //작업장 select 태그 생성
	}
	
	if(document.frm.input_proc_id[tableLen-1].options){ // 작업장
		for( i = 0 ; i < document.frm.input_proc_id[tableLen-1].options.length ; i++){
			if(document.frm.input_proc_id[tableLen-1].options[i].value == arrData[1])
				document.frm.input_proc_id[tableLen-1].options[i].selected = true;
		}
		document.frm.stored_item.value = arrData[2];
		doChangeItemList(document.frm.input_proc_id[tableLen-1]); //제품 select 태그 생성
	}
	else{									// 작업장
		for( i = 0 ; i < document.frm.input_proc_id.options.length ; i++){
			if(document.frm.input_proc_id.options[i].value == arrData[1])
				document.frm.input_proc_id.options[i].selected = true;
		}
		document.frm.stored_item.value = arrData[2];
		doChangeItemList(document.frm.input_proc_id); //제품 select 태그 생성
	}
	
//	if(document.frm.input_item_id[tableLen-1].options){ // 제품
//		for( i = 0 ; i < document.frm.input_item_id[tableLen-1].options.length ; i++){
//			if(document.frm.input_item_id[tableLen-1].options[i].value == arrData[2])
//				document.frm.input_item_id[tableLen-1].options[i].selected = true;
//		}
//	}
//	else{									// 제품
//		for( i = 0 ; i < document.frm.input_item_id.options.length ; i++){
//			if(document.frm.input_item_id.options[i].value == arrData[2])
//				document.frm.input_item_id.options[i].selected = true;
//		}
//	}
	
	if(document.frm.input_prod_dates[tableLen-1])
		document.frm.input_prod_dates[tableLen-1].value	= arrData[3]; // 생산일자
	else
		document.frm.input_prod_dates.value	= arrData[3]; // 생산일자
	
	if(document.frm.input_shift_type[tableLen-1].options){ // shift
		for( i = 0 ; i < document.frm.input_shift_type[tableLen-1].options.length ; i++){
			if(document.frm.input_shift_type[tableLen-1].options[i].value == arrData[4])
				document.frm.input_shift_type[tableLen-1].options[i].selected = true;
		}
	}
	else{									// shift
		for( i = 0 ; i < document.frm.input_shift_type.options.length ; i++){
			if(document.frm.input_shift_type.options[i].value == arrData[4])
				document.frm.input_shift_type.options[i].selected = true;
		}
	}
			
//	if(document.frm.input_start_date[tableLen-1])		
//		document.frm.input_start_date[tableLen-1].value	= arrData[5]; // 시작일시 date
//	else
//		document.frm.input_start_date.value	= arrData[5]; // 시작일시 date
//			
//	if(document.frm.input_start_time[tableLen-1])
//		document.frm.input_start_time[tableLen-1].value = arrData[6]; // 시작일시 time
//	else	
//		document.frm.input_start_time.value = arrData[6]; // 시작일시 time
//		
//	if(document.frm.input_end_date[tableLen-1])
//		document.frm.input_end_date[tableLen-1].value = arrData[7]; // 종료일시 date
//	else	
//		document.frm.input_end_date.value = arrData[7]; // 종료일시 date
//		
//	if(document.frm.input_end_time[tableLen-1])
//		document.frm.input_end_time[tableLen-1].value = arrData[8]; // 종료일시 time
//	else
//		document.frm.input_end_time.value = arrData[8]; // 종료일시 time
		
	if(document.frm.input_shift_qty[tableLen-1])
		document.frm.input_shift_qty[tableLen-1].value = arrData[9]; // 수량
	else	
		document.frm.input_shift_qty.value = arrData[9]; // 수량
		
	if(document.frm.input_ord_no[tableLen-1])
		document.frm.input_ord_no[tableLen-1].value = arrData[10]; // 오더번호
	else	
		document.frm.input_ord_no.value = arrData[10]; // 오더번호
		
	if(document.frm.input_ord_item_no[tableLen-1])
		document.frm.input_ord_item_no[tableLen-1].value = arrData[11]; // 오더항목번호
	else	
		document.frm.input_ord_item_no.value = arrData[11]; // 오더항목번호
			
	if(left_tbody.rows[tableLen-1])
		left_tbody.rows[tableLen-1].style.backgroundColor = arrData[12]; // 체크 color
	else
		left_tbody.style.backgroundColor = arrData[12]; // 체크 color
	if(main_tbody.rows[tableLen-1])
		main_tbody.rows[tableLen-1].style.backgroundColor = arrData[12]; // 체크 color
	else
		main_tbody.style.backgroundColor = arrData[12]; // 체크 color
		
	document.recalc();
	
}

// 저장
//function GoSave( service ) {
//	
//	var plantId = document.frm.selected_plant.value;
//	//공장을 선택하지 않은 경우
//	if( plantId == null || plantId == ""){
//		alert("공장을 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
//		return;
//	}
//	var tableLen = left_tbody.rows.length;
//	var cnt = 0;	
//	
//	for( i = 0; i < tableLen; i++ ) { 		
//		//if( document.frm.plant_id == null){	break; }
//		//if( document.frm.plant_id[i]) {	
//		if( document.frm.item_id[i]) {	
//										
//			if( (document.frm.plant_id[i].value != null && document.frm.plant_id[i].value != "")
//				&& (document.frm.line_id[i].value != null && document.frm.line_id[i].value != "")
//				&& (document.frm.proc_id[i].value != null && document.frm.proc_id[i].value != "")
//				&& (document.frm.item_id[i].value != null && document.frm.item_id[i].value != "")				
//				&& (document.frm.excl_proc_id[i].value != null && document.frm.excl_proc_id[i].value != "")) {
//				cnt++;								
//				//alert("plant:"+document.frm.plant_id[i].value+" line:"+document.frm.line_id[i].value+" proc:"+document.frm.proc_id[i].value+" excl_proc:"+document.frm.excl_proc_id[i].value);
//			}		
//		}
//		else {					
//			if( (document.frm.plant_id.value != null && document.frm.plant_id.value != "")
//				&& (document.frm.line_id.value != null && document.frm.line_id.value != "")
//				&& (document.frm.proc_id.value != null && document.frm.proc_id.value != "")	
//				&& (document.frm.item_id.value != null && document.frm.item_id.value != "")			
//				&& (document.frm.excl_proc_id.value != null && document.frm.excl_proc_id.value != "")) {
//				cnt++;				
//				
//			}		
//		}
//		
//	}
//	// 마지막 한줄도 지울때
////	if(tableLen == 1 && cnt == 0){
////		cnt = 1;
////	}
//	//alert("cnt:" + cnt + ", tableLen:" + tableLen);
//	if( (cnt < 1) || (tableLen != cnt) ) {
//		alert("저장할 데이터가 없거나, 선택하지 않은 항목이 있습니다.");
//		return;
//	}
//	
//	// service_id 저장
//	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
//	
//	document.frm._moon_service.value = service;
//	document.frm.action = "service.do";
//	document.frm.target = "_self";
//	document.frm.submit();
//	
//}

// 셀 저장 전역변수
var objTdG;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = left_tbody.rows.length;
	var objName = objBox.name;
	if(objName == "plant_id"){
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	else{
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// 공장 --> 라인
		if( objName == "plant_id" ) {
			if( left_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[0];				
			}
			else {
				objTdG = main_tbody.rows.cells[0];				
			}
		}
		// 라인 --> 포장기
		else if( objName == "line_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[1];								
			}
			else {
				objTdG = main_tbody.rows.cells[1];
			}
		}
		// 포장기 --> 품목코드
		else if( objName == "proc_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// 품목코드 --> 동시가동 불가호기
		else if( objName == "item_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[5];
			}
			else {
				objTdG = main_tbody.rows.cells[5];
			}
		}
		// 동시가동 불가호기 --> 작업특징
		else if( objName == "excl_proc_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[6];
			}
			else {
				objTdG = main_tbody.rows.cells[6];
			}
		}
		// 작업특징 --> 다음줄 공장
		else if( objName == "mc_type" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = left_tbody.rows[0].cells[2];
				}
				else {
					objTdG = left_tbody.rows.cells[2];
				}
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = left_tbody.rows[rowIdx+1].cells[2];
				}
				else {
					objTdG = left_tbody.rows.cells[2];
				}
			}
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

//replaceAll
function replaceAll(str,re,transChar){
	var len = str.length;
	
	for(j = 0; j < len; j++){
		str = str.replace(re,transChar);
	}
	
	return str;
};

// 날짜 체크
function dateFormatCheck(obj){
	
	if( obj.value != "" && obj.value != null ) {
		// 날짜 체크
		if( chkDate(obj, 8) == 0 ) {				
			obj.focus();
			return;
		}
	}	
}

// 시간 체크
function timeFormatCheck(obj){
	
	if(obj.value != "" && obj.value != null ){
		if( obj.value.length != 6 ){
			alert("시간은 6자리 입니다.(입력형식 060000:HHMISS)");
			return;
		}
	}
}

// 저장 버튼 클릭
GoSave = function(service) {
	
	var tabLength = left_tbody.rows.length;
	
	// 입력 값 체크
	if(tabLength > 1){
		for( i = 0; i < tabLength; i++ ){
			if( document.frm.input_plant_id[i].value == "" || document.frm.input_proc_id[i].value == "" 
				|| document.frm.input_item_id[i].value == "" || document.frm.input_prod_dates[i].value == "" 
//				|| document.frm.input_start_date[i].value == "" || document.frm.input_start_time[i].value == ""
//				|| document.frm.input_end_date[i].value == "" || document.frm.input_end_time[i].value == "" 
				|| document.frm.input_shift_qty[i].value == "" ){
				alert("필수 입력 값이 입력 되지 않았습니다.");
				return;
			}
		}
	}
	else{
		if( document.frm.input_plant_id.value == "" || document.frm.input_proc_id.value == "" 
			|| document.frm.input_item_id.value == "" || document.frm.input_prod_dates.value == "" 
//			|| document.frm.input_start_date.value == "" || document.frm.input_start_time.value == ""
//			|| document.frm.input_end_date.value == "" || document.frm.input_end_time.value == "" 
			|| document.frm.input_shift_qty.value == "" ){
			alert("필수 입력 값이 입력 되지 않았습니다.");
			return;
		}
	}
	
	var param = "plant_id!%!proc_id!%!input_prod_dates!%!input_shift_type";
	var value = ""; 
	if(tabLength == 1){
		value += document.frm.input_plant_id.value + "!%!" + document.frm.input_proc_id.value + "!%!";
		value += document.frm.input_prod_dates.value + "!%!" + document.frm.input_shift_type.value;
	}
	else{
		value += document.frm.input_plant_id[tabLength-1].value + "!%!" + document.frm.input_proc_id[tabLength-1].value + "!%!";
		value += document.frm.input_prod_dates[tabLength-1].value + "!%!" + document.frm.input_shift_type[tabLength-1].value;
	}
	commonUtil.getCodeInfo(param, value , "work_diary_check", { 
		callback:function(arrList){
			if( arrList.length < 1){	
				alert("해당 SHIFT는 조 운영 캘린더의 근무조 편성에 맞지 않습니다.")
				return;
			}	
			else{
				var param = "plant_id!%!version!%!seq!%!item_id!%!input_proc_id!%!input_prod_dates!%!input_shift_type!%!input_ord_no!%!input_ord_item_no!%!cat_id";
				var value = ""; 
				if(tabLength == 1){
					value += document.frm.input_plant_id.value + "!%!" + document.frm.input_version.value + "!%!"
							+ document.frm.input_seq.value + "!%!" + document.frm.input_item_id.value + "!%!"
							+ document.frm.input_proc_id.value + "!%!" + document.frm.input_prod_dates.value + "!%!" 
							+ document.frm.input_shift_type.value + "!%!" + document.frm.input_ord_no.value + "!%!" 
							+ document.frm.input_ord_item_no.value + "!%!" + document.frm.input_cat_id.value;	
				}
				else{
					value += document.frm.input_plant_id[tabLength-1].value + "!%!" + document.frm.input_version[tabLength-1].value + "!%!"
							+ document.frm.input_seq.value + "!%!" + document.frm.input_item_id[tabLength-1].value + "!%!"
							+ document.frm.input_proc_id[tabLength-1].value + "!%!" + document.frm.input_prod_dates[tabLength-1].value + "!%!" 
							+ document.frm.input_shift_type[tabLength-1].value + "!%!" + document.frm.input_ord_no[tabLength-1].value + "!%!" 
							+ document.frm.input_ord_item_no[tabLength-1].value + "!%!" + document.frm.input_cat_id.value;	
				}	
									
				
				// 이동할 shift에 수량이 있는지 체크. 있으면 메시지 표시
				commonUtil.getCodeInfo(param, value , "move_target_check", { 
					callback:function(arrList){
						if( arrList.length > 0){	
							alert("등록 할 SHIFT에 이미 계획이 존재 합니다.");
							return;											
						}
						else{
							frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;				
							document.frm._moon_service.value = service;
							document.frm.action = "service.do";
							document.frm.target = "_self"; 
							document.frm.submit();				
							opener.GoSearch("sc_11020_dailyProductionPlanAnalysisNew_list");
						}			
					}
				});	
					
			}				
		}
	});
	//alert("!!");
	
	this.focus();
		
};


// 작업장 선택 시 제품 리스트 채움
function doChangeItemList(obj){
	
	var idx = obj.parentNode.parentNode.parentNode.rowIndex;
	var tableLen = left_tbody.rows.length;
	if(document.frm.input_plant_id[idx] && tableLen > 1)
		var plant_id = document.frm.input_plant_id[idx].value;
	else
		var plant_id = document.frm.input_plant_id.value;
	var proc_id = obj.value;
	
	var param = "plant_id!%!selected_proc";
	var value = plant_id + "!%!" + proc_id;
	
	commonUtil.getCodeInfo( param, value , "input_plant_proc_of_item_list", { 
		callback:function(arrList){
			if( arrList.length > 0){
				if(document.frm.stored_item)
					var item_id = document.frm.stored_item.value;
				else
					var item_id = "";
				
				var div_item = "<select name=\"input_item_id\" class=\"normal\" style=\"width:100% \">";
				div_item += "<option value=\"\">선택</option>";
				for( i = 0 ; i < arrList.length; i++){
					div_item += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == item_id)
							div_item += " selected ";
					div_item += ">" + arrList[i][1] + "</option>";	
				}
				div_item += "</select>";
				if(divItem[idx] && tableLen > 1)
					divItem[idx].innerHTML = div_item;
				else
					divItem.innerHTML = div_item;
			}
			else{
				alert("일치하는 제품이 없습니다.");
				return;
			}			
		}
	});
}