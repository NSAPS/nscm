////////////////////////////////////////////////////////////
// 프로그램ID : md_05180_extraProcMc_list.js
// 프로그램명 : 설비정보 관리 (조회)
// 개발자  : 허준성
// 개발일자 : 2008-11-27 목요일
//
//관련 job file : job_sinc_20_scheduling_04.xml
//
//관련 query file : query_sinc_20_scheduling_04.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-11-27  허준성     md_05180_extraProcMc_list.js 개발
//
//
////////////////////////////////////////////////////////////

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {	
	
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}	

	objTd.childNodes(0).style.display = "none";	
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
		
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	if( objBox.tagName.toUpperCase() == "SELECT" ) {
		if( objBox.value == "" || objBox.value == null ) {
			var strVal = objBox.value;
		}
		else {
			var strVal = objBox.options[objBox.selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	else {
		var strVal = objBox.value;
		var objTd = objBox.parentNode;
	}
	
	if( objTd.align.toUpperCase() == "CENTER" ) {
		objTd.childNodes(0).innerHTML = strVal;
	}
	else if( objTd.align.toUpperCase() == "RIGHT" ) {
		objTd.childNodes(0).innerHTML = strVal + "&nbsp;";
	}
	else {
		objTd.childNodes(0).innerHTML = "&nbsp;" + strVal;
	}
	
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";	
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee";
		main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		
		if(document.frm.v_item_id[rowIdx]){
			document.frm.v_item_id[rowIdx].style.backgroundColor = "#eeeeee"; 
			document.frm.v_item_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.item_type[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.line_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.proc_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.mc_qty[rowIdx].style.backgroundColor = "#eeeeee";
		}
		else{
			document.frm.v_item_id.style.backgroundColor = "#eeeeee"; 
			document.frm.v_item_name.style.backgroundColor = "#eeeeee";
			document.frm.item_type.style.backgroundColor = "#eeeeee";
			document.frm.line_name.style.backgroundColor = "#eeeeee";
			document.frm.proc_name.style.backgroundColor = "#eeeeee";
			document.frm.mc_qty.style.backgroundColor = "#eeeeee";
		}
	} 
	else {
		left_tbody.rows.style.backgroundColor = "#eeeeee";  
		main_tbody.rows.style.backgroundColor = "#eeeeee"; 
		
		if(document.frm.v_item_id[rowIdx]){
			document.frm.v_item_id[rowIdx].style.backgroundColor = "#eeeeee"; 
			document.frm.v_item_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.item_type[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.line_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.proc_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.mc_qty[rowIdx].style.backgroundColor = "#eeeeee";
		}
		else{
			document.frm.v_item_id.style.backgroundColor = "#eeeeee"; 
			document.frm.v_item_name.style.backgroundColor = "#eeeeee";
			document.frm.item_type.style.backgroundColor = "#eeeeee";
			document.frm.line_name.style.backgroundColor = "#eeeeee";
			document.frm.proc_name.style.backgroundColor = "#eeeeee";
			document.frm.mc_qty.style.backgroundColor = "#eeeeee";
		}
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		
		if(document.frm.v_item_id[rowIdx]){
			document.frm.v_item_id[rowIdx].style.backgroundColor = "#ffffff"; 
			document.frm.v_item_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.item_type[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.line_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.proc_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.mc_qty[rowIdx].style.backgroundColor = "#ffffff";
		}
		else{
			document.frm.v_item_id.style.backgroundColor = "#ffffff"; 
			document.frm.v_item_name.style.backgroundColor = "#ffffff";
			document.frm.item_type.style.backgroundColor = "#ffffff";
			document.frm.line_name.style.backgroundColor = "#ffffff";
			document.frm.proc_name.style.backgroundColor = "#ffffff";
			document.frm.mc_qty.style.backgroundColor = "#ffffff";
		}
	} 
	else { 
		left_tbody.rows.style.backgroundColor = "#ffffff";
		main_tbody.rows.style.backgroundColor = "#ffffff";
		
		if(document.frm.v_item_id[rowIdx]){
			document.frm.v_item_id[rowIdx].style.backgroundColor = "#ffffff"; 
			document.frm.v_item_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.item_type[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.line_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.proc_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.mc_qty[rowIdx].style.backgroundColor = "#ffffff";
		}
		else{
			document.frm.v_item_id.style.backgroundColor = "#ffffff"; 
			document.frm.v_item_name.style.backgroundColor = "#ffffff";
			document.frm.item_type.style.backgroundColor = "#ffffff";
			document.frm.line_name.style.backgroundColor = "#ffffff";
			document.frm.proc_name.style.backgroundColor = "#ffffff";
			document.frm.mc_qty.style.backgroundColor = "#ffffff";
		}
	}
	
}

// 검색
function GoSearch(service) {
	
	// 공장
	var plant = document.frm.selected_plant.value;
	if( plant == "" || plant == null ) {
		alert("공장을 선택하세요.");
		return;
	}
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1";
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// 저장
function GoSave( service ) {
	
	if(!confirm("저장하시겠습니까?"))
		return;
		
	var plant = document.frm.selected_plant.value;
	
	if(plant == "" || plant == null){
		alert("공장을 선택하고 조회 하신 후 저장 버튼을 클릭하세요.");
		return;
	}
	
	viewWait();
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// enter check 용 
function enterCheck(frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			// 자기화면 갱신
			getItemNameSearch(document.frm.item_id, frm_name);
			//GoSearch(frm_name);
		}
	} 
	
}

// 제품 검색 popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}

// 제품 입력창에 입력한 값과 일치하는 제품 검사 후, 일치하는 제품이 있으면 제품 코드, 제품 명 표시
function getItemNameSearch(objBox, service) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else {
				document.frm.item_name.value = "";
			}
			GoSearch(service);
		}
	});
	
}

// 제품 입력창에 입력한 값과 일치하는 제품 검사 후, 일치하는 제품이 있으면 제품 코드, 제품 명 표시
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else {
				document.frm.item_name.value = "";
			}
		}
	});
	
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
	oRowLeft.height = 22;  
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22; 
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 삭제		
	var oCell2 = oRowLeft.insertCell(); // 제품코드	
	var oCell3 = oRowLeft.insertCell(); // 제품명
	var oCell4 = oRowLeft.insertCell(); // 제품타입
	
	var oCell5 = oRowMain.insertCell(); // 라인
	var oCell6 = oRowMain.insertCell(); // 작업장
	var oCell7 = oRowMain.insertCell(); // MC_KIND
	var oCell8 = oRowMain.insertCell(); // MC_QTY
		
	oCell7.onclick = function() { setEditMode(this); }; // MC_KIND
	
	oCell0.align = "center"; oCell0.width = "30px";  // 번호
	oCell1.align = "center"; oCell1.width = "30px";  // 삭제	
	oCell2.width = "80px";  // 제품코드	
	oCell3.width = "230px"; // 제품명
	oCell4.width = "60px";  // 제품타입

	oCell5.width = "100px";  // 라인
	oCell6.width = "180px";  // 작업장
	oCell7.width = "130px";  // MC_KIND
	oCell8.width = "60px";   // MC_QTY
		
	// 번호 
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	
	// 삭제
	oCell1.innerHTML = "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";	
	// 품목코드
	oCell2.innerHTML = "<input type=\"text\" name=\"v_item_id\" class=\"normal\" " 
						+ "style=\"height:100%; width:100%; border:0px; text-align:center;\" readonly > "
						+ "<input type=\"hidden\" name=\"plant_id\" >";

	// 품목명
	oCell3.innerHTML = "<input type=\"text\" name=\"v_item_name\" class=\"normal\" "
						+ "style=\"height:100%; width:100%; border:0px; padding-left:5px; text-align:left;\" readonly > ";
	// 품목타입
	oCell4.innerHTML = "<input type=\"text\" name=\"item_type\" class=\"normal\" " 
						+ "style=\"height:100%; width:100%; border:0px; padding-left:5px; text-align:left;\" readonly > ";
	// 라인
	oCell5.innerHTML = "<input type=\"text\" name=\"line_name\" class=\"normal\" " 
						+ "style=\"height:100%; width:100%; border:0px; padding-left:5px; text-align:left;\" readonly > "
						+ "<input type=\"hidden\" name=\"line_id\" >";						
	// 작업장
	oCell6.innerHTML = "<input type=\"text\" name=\"proc_name\" class=\"normal\" " 
						+ "style=\"height:100%; width:100%; border:0px; padding-left:5px; text-align:left;\" readonly > "
						+ "<input type=\"hidden\" name=\"proc_id\" >";
	
	// MC_KIND
	oCell7.innerHTML = "<a id=\"divMcKind\"></a>" + selStrMcKind;
	// MC_QTY
	oCell8.innerHTML = "<input type=\"text\" name=\"mc_qty\" class=\"normal\" size=\"10\" "
						+ "style=\"height:100%; width:100%; padding-right:5px; text-align:right;\" >";
		
	document.recalc();
	setRowNo();
	
}

// 번호 setting
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
	if( tableLen > 1 )
	{
		delRowDo( delRowIdx ); 
		rowFormed(); //<--1
	}
	else{
		delRowDo( delRowIdx );
		//addRow(left_tbody.rows.length);
		rowFormed();
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
	var tableLen = left_tbody.rows.length;
	if(tableLen == 0) return;
	memLastRow();
	delRowDo( tableLen - 1 );
	addRow(left_tbody.rows.length);
	setLastRow();
		
} 

var arrData = new Array(10);

// 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	// div 문자열 저장
	
	if(document.frm.plant_id[tableLen-1]){ 
		arrData[0] 	= document.frm.plant_id[tableLen-1].value;    //공장코드
		arrData[1] 	= document.frm.v_item_id[tableLen-1].value;   //제품코드
		arrData[2] 	= document.frm.v_item_name[tableLen-1].value; //제품명
		arrData[3] 	= document.frm.item_type[tableLen-1].value;   //제품타입
		arrData[4] 	= document.frm.line_id[tableLen-1].value;     //라인코드
		arrData[5] 	= document.frm.line_name[tableLen-1].value;   //라인명
		arrData[6] 	= document.frm.proc_id[tableLen-1].value;     //작업장코드
		arrData[7] 	= document.frm.proc_name[tableLen-1].value;   //작업장명
		arrData[8] 	= document.frm.mc_kind[tableLen-1].value;     //MC_KIND
		arrData[9] 	= document.frm.mc_qty[tableLen-1].value;      //MC_QTY
	}
	else{
		arrData[0] 	= document.frm.plant_id.value;    //공장코드
		arrData[1] 	= document.frm.v_item_id.value;   //제품코드
		arrData[2] 	= document.frm.v_item_name.value; //제품명
		arrData[3] 	= document.frm.item_type.value;   //제품타입
		arrData[4] 	= document.frm.line_id.value;     //라인코드
		arrData[5] 	= document.frm.line_name.value;   //라인명
		arrData[6] 	= document.frm.proc_id.value;     //작업장코드
		arrData[7] 	= document.frm.proc_name.value;   //작업장명
		arrData[8] 	= document.frm.mc_kind.value;     //MC_KIND
		arrData[9] 	= document.frm.mc_qty.value;      //MC_QTY
	}
}

// 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;

	if(document.frm.plant_id[tableLen-1]){ 
		document.frm.plant_id[tableLen-1].value    =  arrData[0]; //공장코드
		document.frm.v_item_id[tableLen-1].value   =  arrData[1]; //제품코드
		document.frm.v_item_name[tableLen-1].value =  arrData[2]; //제품명
		document.frm.item_type[tableLen-1].value   =  arrData[3]; //제품타입
		document.frm.line_id[tableLen-1].value     =  arrData[4]; //라인코드
		document.frm.line_name[tableLen-1].value   =  arrData[5]; //라인명
		document.frm.proc_id[tableLen-1].value     =  arrData[6]; //작업장코드
		document.frm.proc_name[tableLen-1].value   =  arrData[7]; //작업장명
		document.frm.mc_kind[tableLen-1].value     =  arrData[8]; //MC_KIND
		setViewMode(document.frm.mc_kind[tableLen-1]);
		document.frm.mc_qty[tableLen-1].value      =  arrData[9]; //MC_QTY
	}
	else{
		document.frm.plant_id.value    =  arrData[0]; //공장코드
		document.frm.v_item_id.value   =  arrData[1]; //제품코드
		document.frm.v_item_name.value =  arrData[2]; //제품명
		document.frm.item_type.value   =  arrData[3]; //제품타입
		document.frm.line_id.value     =  arrData[4]; //라인코드
		document.frm.line_name.value   =  arrData[5]; //라인명
		document.frm.proc_id.value     =  arrData[6]; //작업장코드
		document.frm.proc_name.value   =  arrData[7]; //작업장명
		document.frm.mc_kind.value     =  arrData[8]; //MC_KIND
		setViewMode(document.frm.mc_kind);
		document.frm.mc_qty.value      =  arrData[9]; //MC_QTY
	}
	
}

