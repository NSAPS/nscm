
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
		//objTd.childNodes(1).childNodes(0).focus();
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
	oRowLeft.height = 30;  
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 30; 
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 삭제		
	var oCell2 = oRowLeft.insertCell(); // 공장
	
	var oCell3 = oRowMain.insertCell(); // 라인
	var oCell4 = oRowMain.insertCell(); // 포장기
	var oCell5 = oRowMain.insertCell(); // 품목코드
	var oCell6 = oRowMain.insertCell(); // 품목이름
	var oCell7 = oRowMain.insertCell(); // 규격
	var oCell8 = oRowMain.insertCell(); // 동시가동 불가호기	
	var oCell9 = oRowMain.insertCell(); // 작업특징
	
	oCell2.onclick = function() { setEditMode(this); }; // 공장
	oCell3.onclick = function() { setEditMode(this); }; // 라인
	oCell4.onclick = function() { setEditMode(this); }; // 포장기
	oCell5.onclick = function() { setEditMode(this); }; // 품목코드	
	//oCell6.onclick = function() { setEditMode(this); }; // 품목이름
	//oCell7.onclick = function() { setEditMode(this); }; // 규격
	oCell8.onclick = function() { setEditMode(this); }; // 동시가동 불가호기
	oCell9.onclick = function() { setEditMode(this); }; // 작업특징
		
	oCell0.align = "center"; oCell0.width = "30px"; // 번호
	oCell1.align = "center"; oCell1.width = "40px"; // 삭제	
	oCell2.align = "center"; oCell2.width = "100px"; // 공장
	
	oCell3.align = "left"; oCell3.width = "185px";  // 라인
	oCell4.align = "left"; oCell4.width = "220px";  // 포장기
	oCell5.align = "center"; oCell5.width = "100px";  // 품목코드
	oCell6.align = "left"; oCell6.width = "140px";  // 품목이름
	oCell7.align = "center"; oCell7.width = "120px";  // 규격	
	oCell8.align = "left"; oCell8.width = "220px";  // 동시가동 불가호기
	oCell9.align = "center"; oCell9.width = "100px"; // 작업특징
		
	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	oCell0.onclick = function() { clickLine(this); };
	// 삭제
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";	
	
	// 공장
	oCell2.innerHTML = "<a id=\"divPlant\"></a><select " 
					    + "name=\"plant_id\" onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this);\" tabindex=\"1\" "
					    + "onChange=\"doChangeGridPlant(this); \" style=\"width:100%; padding-left:5px; display:none;\"> "					   
        			    + document.frm.plant_loc_sel_str.value + "</select>";						
						
	// 라인
	oCell3.innerHTML = "<a id=\"divLine\">\</a><a id=\"divLineSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \" ><select "
						+ "name=\"line_id\" onChange=\"doChangeGridProc(this); \" onKeyDown=\"moveNextBox(this); \" tabindex=\"2\" "												
						+ "style=\"width:100%; padding-left:5px; \">"						
            			//+ document.frm.line_loc_sel_str.value 
            			+ "<option value=\"\"></option> "
            			+ "</select></a>";
	
	// 포장기
	oCell4.innerHTML = "<a id=\"divProc\"></a><a id=\"divProcSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \"><select "
						+ "name=\"proc_id\" onKeyDown=\"moveNextBox(this); \" tabindex=\"3\" "
						+ "style=\"width:100%; padding-left:5px; \"> "
						+ "<option value=\"\"></option> "
						+ "</select></a>";
	
	// 품목코드
	oCell5.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemIdSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"item_id\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"4\" "
						+ "style=\"width:73PX; padding-right:5px; text-align:cneter; \" > "
						+ "<img name=\"imgItemId\" tabindex=\"-1\" "
        				+ "src=\"sinc/template/basic/skin/nongshim/images/common/icon_search.gif\" align=\"absmiddle\" "
        				+ "border=\"0\" onClick=\"openItemSearchPop(this); \" style=\"cursor:pointer;\" "
        				+ "onMouseOver=\"overImg(this); \" onMouseOut=\"outImg(this); \"/></a> ";
	// 품목이름
	oCell6.innerHTML = "<a id=\"divItemName\"></a><input "
						+ "type=\"text\" name=\"item_name\" class=\"normal\" size=\"20\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:left; \" "
						+ "onChange=\"checkNum(this, 'BLANK'); fixedPoint(this.value, 1); \">";
	// 규격
	oCell7.innerHTML = "<a id=\"divItemSpec\"></a><input "
						+ "type=\"text\" name=\"item_spec\" class=\"normal\" size=\"20\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:center; \" "
						+ "onChange=\"checkNum(this, 'BLANK'); fixedPoint(this.value, 1); \">";
	// 동시가동 불가호기
	oCell8.innerHTML = "<a id=\"divExclProc\"></a><a id=\"divExclProcSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \"><select "
						+ "name=\"excl_proc_id\" onKeyDown=\"moveNextBox(this); \" tabindex=\"5\" "
						+ "style=\"width:100%; padding-left:5px; \"> "
						+ "<option value=\"\"></option> "	
						+ "</select></a>";
	
	// 작업특징
	oCell9.innerHTML = "<a id=\"divMcType\"></a><select " 
					    + "name=\"mc_type\" onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this);\" tabindex=\"6\" "
					    + "style=\"width:100%; padding-left:5px; display:none;\"> "					   
        			    + document.frm.mc_type_loc_sel_str.value + "</select>";	
        			    
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
	//alert("arrDate : " + arrData + ", " + "arrDisplayData : " + arrDisplayData);
	//alert("arrDisplayData : " + arrDisplayData);
	var tableLen = left_tbody.rows.length;
	//alert(tableLen);
	delRowDo( tableLen - 1 );
	addRow(left_tbody.rows.length);
	setLastRow();
		
} 

var arrData = new Array(9);
var arrDisplayData = new Array(9); 
var lineList;
var procList;
var exclProcList;
// 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	// div 문자열 저장

	if(divPlant[tableLen-1])
		arrDisplayData[0] 	= divPlant[tableLen-1].innerHTML; // 공장	
	else
		arrDisplayData[0] 	= divPlant.innerHTML; // 공장
		
	if(divLine[tableLen-1]){
		arrDisplayData[1] 	= divLine[tableLen-1].innerHTML; // 라인	
		lineList			= divLineSelect[tableLen-1].innerHTML // line select box list
	}
	else{
		arrDisplayData[1] 	= divLine.innerHTML; // 라인	
		lineList			= divLineSelect.innerHTML // line select box list
	}
	
	if(divProc[tableLen-1]){
		arrDisplayData[2] 	= divProc[tableLen-1].innerHTML; // 포장기		
		procList			= divProcSelect[tableLen-1].innerHTML; // proc select box list
	}
	else{
		arrDisplayData[2] 	= divProc.innerHTML; // 포장기		
		procList			= divProcSelect.innerHTML; // proc select box list
	}
		
	if(divItemId[tableLen-1])
		arrDisplayData[3] 	= divItemId[tableLen-1].innerHTML; // 품목코드
	else
		arrDisplayData[3] 	= divItemId.innerHTML; // 품목코드
		
	if(divItemName[tableLen-1])	
		arrDisplayData[4] 	= divItemName[tableLen-1].innerHTML; // 품목이름
	else
		arrDisplayData[4] 	= divItemName.innerHTML; // 품목이름
		
	if(divItemSpec[tableLen-1])
		arrDisplayData[5] 	= divItemSpec[tableLen-1].innerHTML; // 규격		
	else
		arrDisplayData[5] 	= divItemSpec.innerHTML; // 규격		
		
	if(divExclProc[tableLen-1]){
		arrDisplayData[6] 	= divExclProc[tableLen-1].innerHTML; // 동시가동 불가호기
		exclProcList		= divExclProcSelect[tableLen-1].innerHTML; // exclProc select box list
	}
	else{
		arrDisplayData[6] 	= divExclProc.innerHTML; // 동시가동 불가호기		
		exclProcList		= divExclProcSelect.innerHTML; // exclProc select box list
	}
	
	if(divMcType[tableLen-1]){
		arrDisplayData[7]	= divMcType[tableLen-1].innerHTML; // 작업특징		
	}
	else{
		arrDisplayData[7]	= divMcType.innerHTML; // 작업특징
	}
	
	if(left_tbody.rows[tableLen-1])
		arrDisplayData[8]   = left_tbody.rows[tableLen-1].style.backgroundColor; // 체크
	else
		arrDisplayData[8]  = left_tbody.style.backgroundColor; // 체크 color

	 
	// value값 저장
	if(document.frm.plant_id[tableLen-1])
		arrData[0] 	= document.frm.plant_id[tableLen-1].value; // 공장		
	else
		arrData[0] 	= document.frm.plant_id.value; // 공장	
	
	if( document.frm.line_id[tableLen-1])
		arrData[1] 	= document.frm.line_id[tableLen-1].value; // 라인
	else
		arrData[1] 	= document.frm.line_id.value; // 라인	
		
	if(document.frm.proc_id[tableLen-1])
		arrData[2] 	= document.frm.proc_id[tableLen-1].value; // 포장기	
	else
		arrData[2] 	= document.frm.proc_id.value; // 포장기
		
	if(document.frm.item_id[tableLen-1])
		arrData[3] 	= document.frm.item_id[tableLen-1].value; // 품목코드
	else
		arrData[3] 	= document.frm.item_id.value; // 품목코드
	
	if(document.frm.item_name[tableLen-1])
		arrData[4] 	= document.frm.item_name[tableLen-1].value; // 품목이름
	else
		arrData[4] 	= document.frm.item_name.value; // 품목이름
		
	if(document.frm.item_spec[tableLen-1])
		arrData[5] 	= document.frm.item_spec[tableLen-1].value; // 규격		
	else
		arrData[5] 	= document.frm.item_spec.value; // 규격		
		
	if(document.frm.excl_proc_id[tableLen-1])
		arrData[6] 	= document.frm.excl_proc_id[tableLen-1].value; // 동시가동 불가호기
	else
		arrData[6] 	= document.frm.excl_proc_id.value; // 동시가동 불가호기
		
	if(document.frm.mc_type[tableLen-1])
		arrData[7]	= document.frm.mc_type[tableLen-1].value; // 작업특징
	else
		arrData[7]	= document.frm.mc_type.value; // 작업특징
	
	if(left_tbody.rows[tableLen-1])
		arrData[8]  = left_tbody.rows[tableLen-1].style.backgroundColor; // 체크 color
	else
		arrData[8]  = left_tbody.style.backgroundColor; // 체크 color
	
	//alert(plant.value+","+line.value+","+proc.value+","+exclProc.value+","+arrData);
}

// 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	
	// value값 채움		
	if(document.frm.plant_id[tableLen-1].options){ // 공장
		for( i = 0 ; i < document.frm.plant_id[tableLen-1].options.length ; i++){
			if(document.frm.plant_id[tableLen-1].options[i].value == arrData[0])
				document.frm.plant_id[tableLen-1].options[i].selected = true;
		}
	}
	else{									// 공장
		for( i = 0 ; i < document.frm.plant_id.options.length ; i++){
			if(document.frm.plant_id.options[i].value == arrData[0])
				document.frm.plant_id.options[i].selected = true;
		}
	}
	if(document.frm.line_id[tableLen-1])
		document.frm.line_id[tableLen-1].value		= arrData[1]; // 라인
	else
		document.frm.line_id.value		= arrData[1]; // 라인		
		
	if(document.frm.proc_id[tableLen-1])		
		document.frm.proc_id[tableLen-1].value		= arrData[2]; // 포장기		
	else
		document.frm.proc_id.value		= arrData[2]; // 포장기
			
	if(document.frm.item_id[tableLen-1])
		document.frm.item_id[tableLen-1].value		= arrData[3]; // 품목코드
	else	
		document.frm.item_id.value		= arrData[3]; // 품목코드
		
	if(document.frm.item_name[tableLen-1])
		document.frm.item_name[tableLen-1].value 	= arrData[4]; // 품목이름
	else	
		document.frm.item_name.value 	= arrData[4]; // 품목이름
		
	if(document.frm.item_spec[tableLen-1])
		document.frm.item_spec[tableLen-1].value 	= arrData[5]; // 규격
	else
		document.frm.item_spec.value 	= arrData[5]; // 규격
		
	if(document.frm.excl_proc_id[tableLen-1])
		document.frm.excl_proc_id[tableLen-1].value = arrData[6]; // 동시가동 불가호기	
	else	
		document.frm.excl_proc_id.value = arrData[6]; // 동시가동 불가호기 
		
	if(document.frm.mc_type[tableLen-1].options ){ // 작업특징
		for( i = 0 ; i < document.frm.mc_type[tableLen-1].options.length ; i++){
			if(document.frm.mc_type[tableLen-1].options[i].value == arrData[7])
				document.frm.mc_type[tableLen-1].options[i].selected = true;
		}
	}
	else{									// 작업특징
		for( i = 0 ; i < document.frm.mc_type.options.length ; i++){
			if(document.frm.mc_type.options[i].value == arrData[7])
				document.frm.mc_type.options[i].selected = true;
		}
	}
		
	if(left_tbody.rows[tableLen-1])
		left_tbody.rows[tableLen-1].style.backgroundColor		= arrData[8]; // 체크 color
	else
		left_tbody.style.backgroundColor		= arrData[8]; // 체크 color
	if(main_tbody.rows[tableLen-1])
		main_tbody.rows[tableLen-1].style.backgroundColor		= arrData[8]; // 체크 color
	else
		main_tbody.style.backgroundColor		= arrData[8]; // 체크 color
	
	// div 채움
	if(divPlant[tableLen-1])
		divPlant[tableLen-1].innerHTML = arrDisplayData[0]; // 공장
	else
		divPlant.innerHTML = arrDisplayData[0]; // 공장
	
	if(divLine[tableLen-1]){	
		divLine[tableLen-1].innerHTML = arrDisplayData[1]; // 라인
		divLineSelect[tableLen-1].innerHTML = lineList;		
	}
	else{
		divLine.innerHTML = arrDisplayData[1]; // 라인
		divLineSelect.innerHTML = lineList;	
	}
	
	if(divProc[tableLen-1]){	
		divProc[tableLen-1].innerHTML = arrDisplayData[2]; // 포장기
		divProcSelect[tableLen-1].innerHTML = procList;
	}
	else{
		divProc.innerHTML = arrDisplayData[2]; // 포장기	
		divProcSelect.innerHTML = procList;
	}
	
	if(divItemId[tableLen-1])
		divItemId[tableLen-1].innerHTML = arrDisplayData[3]; // 품목코드
	else
		divItemId.innerHTML = arrDisplayData[3]; // 품목코드
	
	if(divItemName[tableLen-1])	
		divItemName[tableLen-1].innerHTML = arrDisplayData[4]; // 품목이름
	else
		divItemName.innerHTML = arrDisplayData[4]; // 품목이름	
	
	if(divItemSpec[tableLen-1])
		divItemSpec[tableLen-1].innerHTML = arrDisplayData[5]; // 규격
	else
		divItemSpec.innerHTML = arrDisplayData[5]; // 규격	
	
	if(divExclProc[tableLen-1]){
		divExclProc[tableLen-1].innerHTML = arrDisplayData[6]; // 동시가동 불가호기
		divExclProcSelect[tableLen-1].innerHTML = exclProcList;
	}
	else{	
		divExclProc.innerHTML = arrDisplayData[6]; // 동시가동 불가호기	
		divExclProcSelect.innerHTML = exclProcList;
	}
	
	if(divMcType[tableLen-1])
		divMcType[tableLen-1].innerHTML = arrDisplayData[7]; // 공장
	else
		divMcType.innerHTML = arrDisplayData[7]; // 공장
		
	document.recalc();
	
}

// 저장
function GoSave( service ) {
	
	var plantId = document.frm.selected_plant.value;
	//공장을 선택하지 않은 경우
	if( plantId == null || plantId == ""){
		alert("공장을 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	var tableLen = left_tbody.rows.length;
	var cnt = 0;	
	
	for( i = 0; i < tableLen; i++ ) { 		
		//if( document.frm.plant_id == null){	break; }
		//if( document.frm.plant_id[i]) {	
		if( document.frm.item_id[i]) {	
										
			if( (document.frm.plant_id[i].value != null && document.frm.plant_id[i].value != "")
				&& (document.frm.line_id[i].value != null && document.frm.line_id[i].value != "")
				&& (document.frm.proc_id[i].value != null && document.frm.proc_id[i].value != "")
				&& (document.frm.item_id[i].value != null && document.frm.item_id[i].value != "")				
				&& (document.frm.excl_proc_id[i].value != null && document.frm.excl_proc_id[i].value != "")) {
				cnt++;								
				//alert("plant:"+document.frm.plant_id[i].value+" line:"+document.frm.line_id[i].value+" proc:"+document.frm.proc_id[i].value+" excl_proc:"+document.frm.excl_proc_id[i].value);
			}		
		}
		else {					
			if( (document.frm.plant_id.value != null && document.frm.plant_id.value != "")
				&& (document.frm.line_id.value != null && document.frm.line_id.value != "")
				&& (document.frm.proc_id.value != null && document.frm.proc_id.value != "")	
				&& (document.frm.item_id.value != null && document.frm.item_id.value != "")			
				&& (document.frm.excl_proc_id.value != null && document.frm.excl_proc_id.value != "")) {
				cnt++;				
				
			}		
		}
		
	}
	// 마지막 한줄도 지울때
//	if(tableLen == 1 && cnt == 0){
//		cnt = 1;
//	}
	//alert("cnt:" + cnt + ", tableLen:" + tableLen);
	if( (cnt < 1) || (tableLen != cnt) ) {
		alert("저장할 데이터가 없거나, 선택하지 않은 항목이 있습니다.");
		return;
	}
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

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

// 제품 검색 POPUP
function openItemSearchPop( obj ) { 	
	
	if(obj.name.toUpperCase() != "SEARCH_ITEM_ID"){
		document.frm.search_item_popup_flag.value = "INPUT";
		var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
		var plant_id;
		var item_id;
		var proc_id;	
		if(document.frm.plant_id[rowIdx] && document.frm.item_id[rowIdx] ){
			plant_id = document.frm.plant_id[rowIdx].value; //공장코드	
			item_id = document.frm.item_id[rowIdx].value; //품목코드
			proc_id = document.frm.proc_id[rowIdx].value; //포장기
		}
		else{		
			plant_id = document.frm.plant_id.value; //공장코드		
			item_id = document.frm.item_id.value; //품목코드
			proc_id = document.frm.proc_id.value; //포장기
		}
		
		if( plant_id == "" || plant_id == null ) {
			alert("공장을 먼저 선택하십시오.");
			return;
		} 
		
		var service_url = "service.do?_moon_service=item_search_popup_for_simul";
		service_url += "&_moon_perpage=200&_moon_pagenumber=1";
		service_url += "&selected_plant=" + plant_id + "&selected_item_id=" + item_id + "&proc_id=" + proc_id + "&rowIdx=" + rowIdx;
	}
	else{
		document.frm.search_item_popup_flag.value = "SEARCH";
		var plant_id = document.frm.selected_plant.value;
		var item_id;
		if(document.frm.search_item_id.value){
			item_id = document.frm.search_item_id.value;
		}
		var line_id;
		if(document.frm.selected_line.value){
			line_id = document.frm.selected_line.value;
		}
		
		var service_url = "service.do?_moon_service=item_search_popup_for_simul";
		service_url += "&_moon_perpage=200&_moon_pagenumber=1";
		service_url += "&selected_plant=" + plant_id;
		if(line_id != null && line_id != ""){
			service_url += "&line_id=" + line_id;
		}		
		if(item_id != null && line_id != ""){
			service_url += "&selected_item_id=" + item_id;
		}
	}
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Item_Search", pop_win_style);
	newWin.focus();
	
}

// popup 조회 이미지 mouseOver
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup 조회 이미지 mouseOut
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
function outImg( objImg ) {
	
	popImgIdx = null;
	
}

// 라인(grid) 선택시 포장기, 동시가동 불가호기 리스트 채움
function doChangeGridProc(obj){
	
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;	
	var tableLen = left_tbody.rows.length;
	var line_id = obj.value;
	
	if(rowIdx == 0 && tableLen < 2){
		if(document.frm.plant_id[rowIdx]){
			//alert(rowIdx + ", " + left_tbody.rows.length);
			var plant_id = document.frm.plant_id.options[document.frm.plant_id.selectedIndex].value;
		}
		else{					
			var plant_id = document.frm.plant_id.value;
		}
	}	
	else if(document.frm.plant_id[rowIdx]){
		var plant_id = document.frm.plant_id[rowIdx].value;
	}
	else{
		var plant_id = document.frm.plant_id.value;
	}
	
	if(line_id == "" || line_id == null){
		alert("라인을 선택하십시오.");
		return;
	}
	//포장기
	scheduling.getProcInfo2("plant_id", plant_id, "line_id", line_id, "sim_oper_combo_proc_list", { 
		callback:function(arrList){
			// 일치하는 결과 없음
			if( arrList.length == 0 ) {
				alert("일치하는 결과 포장기 리스트가  없습니다.");
			}
			else {
				var proc_id = document.frm.proc_id.value;
				var div_proc = "<select name=\"proc_id\" style=\"width:100%; padding-left:5px \" ";
				div_proc += "onKeyDown=\"moveNextBox(this); \" >";
				for( i = 0; i < arrList.length; i++){
					div_proc += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == proc_id)
							div_proc += " selected ";
					div_proc += ">" + arrList[i][1] + "</option>";					
				}
				div_proc += "</select>";
				if(divProcSelect[rowIdx])
					divProcSelect[rowIdx].innerHTML = div_proc;
				else
					divProcSelect.innerHTML = div_proc;
			}
		}
	});	
	//동시가동 불가호기
	scheduling.getProcInfo1("selected_plant", plant_id, "sim_oper_combo_excl_proc_list", { 
		callback:function(arrList){
			// 일치하는 결과 없음
			if( arrList.length == 0 ) {
				alert("일치하는 결과 동시가동 불가호기 리스트가  없습니다.");
			}
			else {
				var proc_id = document.frm.excl_proc_id.value;
				var div_excl_proc = "<select name=\"excl_proc_id\" style=\"width:100%; padding-left:5px \" ";
				div_excl_proc += "onKeyDown=\"moveNextBox(this); \" >";
				for( i = 0; i < arrList.length; i++){
					div_excl_proc += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == proc_id)
							div_excl_proc += " selected ";
					div_excl_proc += ">" + arrList[i][1] + "</option>";					
				}
				div_excl_proc += "</select>";
				if(divExclProcSelect[rowIdx])
					divExclProcSelect[rowIdx].innerHTML = div_excl_proc;
				else
					divExclProcSelect.innerHTML = div_excl_proc;
			}
		}
	});	
}


function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.search_item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.search_item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.search_item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}
