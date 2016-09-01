////////////////////////////////////////////////////////////
// 프로그램ID : md_04100_crossDockMst_list.js
// 프로그램명 : 중계수송거점설정
// 개발자  : 허준성
// 개발일자 : 2008-09-18 목요일
//
//관련 job file : job_sinc_70_masterData_00.xml
//
//관련 query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-09-18  허준성     md_04100_crossDockMst_list.js 개발
//
//
////////////////////////////////////////////////////////////

function compLoc(objBox){
	if(document.frm.src_loc_sel.value == document.frm.tgt_loc_sel.value){
		alert("중계수송거점과 입고장은 동일한 값을 선택할 수 없습니다.");
		if(objBox.name == "src_loc_sel"){
			document.frm.src_loc_sel.value = "";
		}else{
			document.frm.tgt_loc_sel.value = "";
		}
		return;
	}
}
function allCheck(){
	var rightLen = right_tbody.rows.length;
	
	if( document.frm.all_check_flag.checked ){
		if(rightLen == 0){
			document.frm.all_check_flag.checked = false;
			return;
		}
		else if(rightLen == 1){
			// 오른쪽 : 적용중인 품목 Row 수가 1인경우
			if( document.frm.right_check_flag[0] && document.frm.right_check_flag[0].checked ) {
				document.frm.right_check_flag[0].checked = true;
			}
			else if( document.frm.right_check_flag.checked ) {
				document.frm.right_check_flag.checked = true;
			}		
		}
		else{
			for( var i=0 ; i < rightLen ; i++ ) {
				document.frm.right_check_flag[i].checked = true;			
			}	
		}
	}
	else{
		if(rightLen == 0){
			return;
		}
		else if(rightLen == 1){
			// 오른쪽 : 적용중인 품목 Row 수가 1인경우
			if( document.frm.right_check_flag[0] && document.frm.right_check_flag[0].checked ) {
				document.frm.right_check_flag[0].checked = false;
			}
			else if( document.frm.right_check_flag.checked ) {
				document.frm.right_check_flag.checked = false;
			}		
		}
		else{
			for( var i=0 ; i < rightLen ; i++ ) {
				document.frm.right_check_flag[i].checked = false;		
			}	
		}
	}
}


// 추가 버튼을 누른경우..
// 왼쪽 그리드에 선택된 Row를 추가하고, 오른쪽 그리드에 선택된 Row를 삭제하는 function
function addItem(){
	var rightLen = right_tbody.rows.length;
	var checked_flag = 0;
	
	// 1. 왼쪽 그리드에 선택된 Row를 추가하는 부분.
	if(rightLen == 0){
		alert("추가할 데이타가 존재하지 않습니다. 먼저 조회를 해 주십시요!");
		return;
	}else if(rightLen == 1){
		// 오른쪽 : 적용할 품목 Row 수가 1인경우
		if(document.frm.right_check_flag[0] && document.frm.right_check_flag[0].checked){
			addLeftRow(0);
			checked_flag ++;
		}else if( document.frm.right_check_flag.checked ) {
			addLeftRow(0);
			checked_flag ++;
		}		
	}else{
		for( var i=0 ; i < rightLen ; i++ ) {
			if( document.frm.right_check_flag[i].checked ) {
				addLeftRow(i);
				checked_flag ++;
			}			
		}	
	}
	
	if(checked_flag == 0){
		alert("추가할 품목을 선택하여 주십시요!");
		return;
	}
	
	// 2. 왼쪽 그리드의 Total Row 수를 구해서, areaLeftTot에 반영
	var leftTableLen = left_tbody.rows.length;
	areaLeftTot.innerHTML = leftTableLen;
	
	// 3. 오른쪽 그리드에 선택된 Row를 삭제하는 부분.
	if(rightLen == 1){
		// 오른쪽 : 적용할 품목 Row 수가 1인경우
		if(document.frm.right_check_flag[0] && document.frm.right_check_flag[0].checked){
			delRightRow(0);
		}else if( document.frm.right_check_flag.checked ) {
			delRightRow(0);
		}else{
			
		}		
	}else{
		for( var i=0 ; i < rightLen ; i++ ) {
			if( document.frm.right_check_flag[i] && document.frm.right_check_flag[i].checked ) {
				delRightRow(i);
				i--;
				
				if(right_tbody.rows.length == 0)
					break;
			}	
		}	
	}
	
	// 4. 오른쪽 그리드의 Total Row 수를 구해서, areaRightTot에 반영
	var rightTableLen = right_tbody.rows.length;
	areaRightTot.innerHTML = rightTableLen;
	
	document.frm.all_check_flag.checked = false;
}


// 제외 버튼을 누른경우..
// 오른쪽 그리드에 선택된 Row를 추가하고, 왼쪽 그리드에 선택된 Row를 삭제하는 function
function delItem(){
	var leftLen = left_tbody.rows.length;
	var checked_flag = 0;
	
	// 1. 오른쪽 그리드에 선택된 Row를 추가하는 부분.
	if(leftLen == 0){
		alert("제외할 데이타가 존재하지 않습니다. 먼저 조회를 해 주십시요!");
		return;
	}else if(leftLen == 1){
		// 왼쪽 : 적용중인 품목 Row 수가 1인경우
		if( document.frm.left_check_flag[0] && document.frm.left_check_flag[0].checked ) {
			addRightRow(0);
			checked_flag ++;
		}else if( document.frm.left_check_flag.checked ) {
			addRightRow(0);
			checked_flag ++;
		}		
	}else{
		for( var i=0 ; i < leftLen ; i++ ) {
			if( document.frm.left_check_flag[i].checked ) {
				addRightRow(i);
				checked_flag ++;
			}			
		}	
	}
	
	if(checked_flag == 0){
		alert("제외할 품목을 선택하여 주십시요!");
		return;
	}
	
	// 2. 오른쪽 그리드의 Total Row 수를 구해서, areaRightTot에 반영
	var rightTableLen = right_tbody.rows.length;
	areaRightTot.innerHTML = rightTableLen;
	
	// 3. 왼쪽 그리드에 선택된 Row를 삭제하는 부분.
	if(leftLen == 1){
		// 왼쪽 : 적용중인 품목 Row 수가 1인경우
		if( document.frm.left_check_flag[0] && document.frm.left_check_flag[0].checked ) {
			delLeftRow(0);
		}else if( document.frm.left_check_flag.checked ) {
			delLeftRow(0);
		}		
	}else{
		for( var i=0 ; i < leftLen ; i++ ) {
			if( document.frm.left_check_flag[i] && document.frm.left_check_flag[i].checked ) {
				delLeftRow(i);
				i--;
				
				if(left_tbody.rows.length == 0)
					break;
			}		
		}	
	}
	
	// 4. 왼쪽 그리드의 Total Row 수를 구해서, areaLeftTot에 반영
	var leftTableLen = left_tbody.rows.length;
	areaLeftTot.innerHTML = leftTableLen;
}

// 왼쪽 그리드 row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addLeftRow( rowIndex ) {
	
	var leftLen = left_tbody.rows.length;
	
	if(document.frm.rightCdName[rowIndex]){
		var cd_name = document.frm.rightCdName[rowIndex].value;
		var item_id = document.frm.rightItemId[rowIndex].value;
		var item_name = document.frm.rightItemName[rowIndex].value;
	}else{
		var cd_name = document.frm.rightCdName.value;
		var item_id = document.frm.rightItemId.value;
		var item_name = document.frm.rightItemName.value;
	}
	
	var oRowLeft = left_tbody.insertRow(leftLen);
	
	
	// 새로 추가하는 row 의 row index 설정
	var rowNo = oRowLeft.rowIndex;
	
	oRowLeft.onmouseover = function() { bgLeftOver(this); }; 
	oRowLeft.onmouseout = function() { bgLeftOut(this); }; 
	oRowLeft.height = 22; 
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 품종중분류
	var oCell2 = oRowLeft.insertCell(); // 품목코드
	var oCell3 = oRowLeft.insertCell(); // 품목명	
	var oCell4 = oRowLeft.insertCell(); // 선택
	
	oCell0.align = "center";   oCell0.width = "10%";  // 번호
	oCell1.align = "center";   oCell1.width = "22%";  // 품종중분류
	oCell2.align = "center";   oCell2.width = "20%"; // 품목코드
	oCell3.align = "left";     oCell3.width = "37%";  // 품목명	
	oCell4.align = "center";   oCell4.width = "11%"; // 선택
	
	// 번호
	oCell0.innerHTML = "<a id=\"divLeftRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// 품종중분류
	oCell1.innerHTML = "<a id=\"divLeftCdName\">"+ cd_name +"</a> "
	                   + "<input type=\"hidden\" name=\"leftCdName\" value=\"" + cd_name + "\">";
	// 품목코드
	oCell2.innerHTML = "<a id=\"divLeftItemId\">" + item_id + "</a>"
					   + "<input type=\"hidden\" name=\"leftItemId\" value=\"" + item_id + "\">";
	// 품목명
	oCell3.innerHTML = "<a id=\"divLeftItemName\">&nbsp;" + item_name + "</a>"
					   + "<input type=\"hidden\" name=\"leftItemName\" value=\"" + item_name + "\">";
	// 선택
	oCell4.innerHTML = "<input type=\"checkbox\" name=\"left_check_flag\" class=\"normal\" "
					   + "style=\"text-align:center; border-width:0; \"></input>";
	
	document.recalc();
	setLeftRowNo();
	
}


// 오른쪽 그리드 row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRightRow( rowIndex ) {
	
	var rightLen = right_tbody.rows.length;
	
	if(document.frm.leftCdName[rowIndex]){
		var cd_name = document.frm.leftCdName[rowIndex].value;
		var item_id = document.frm.leftItemId[rowIndex].value;
		var item_name = document.frm.leftItemName[rowIndex].value;
	}else{
		var cd_name = document.frm.leftCdName.value;
		var item_id = document.frm.leftItemId.value;
		var item_name = document.frm.leftItemName.value;
	}
	
	var oRowRight = right_tbody.insertRow(rightLen);
	
	
	// 새로 추가하는 row 의 row index 설정
	var rowNo = oRowRight.rowIndex;
	
	oRowRight.onmouseover = function() { bgRightOver(this); }; 
	oRowRight.onmouseout = function() { bgRightOut(this); }; 
	oRowRight.height = 22; 
	
	var oCell0 = oRowRight.insertCell(); // 번호
	var oCell1 = oRowRight.insertCell(); // 품종중분류
	var oCell2 = oRowRight.insertCell(); // 품목코드
	var oCell3 = oRowRight.insertCell(); // 품목명	
	var oCell4 = oRowRight.insertCell(); // 선택
	
	oCell0.align = "center";   oCell0.width = "10%";  // 번호
	oCell1.align = "center";   oCell1.width = "22%";  // 품종중분류
	oCell2.align = "center";   oCell2.width = "20%"; // 품목코드
	oCell3.align = "left";     oCell3.width = "37%";  // 품목명	
	oCell4.align = "center";   oCell4.width = "11%"; // 선택
	
	// 번호
	oCell0.innerHTML = "<a id=\"divRightRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// 품종중분류
	oCell1.innerHTML = "<a id=\"divRightCdName\">"+ cd_name +"</a> "
	                   + "<input type=\"hidden\" name=\"rightCdName\" value=\"" + cd_name + "\">";
	// 품목코드
	oCell2.innerHTML = "<a id=\"divRightItemId\">" + item_id + "</a>"
					   + "<input type=\"hidden\" name=\"rightItemId\" value=\"" + item_id + "\">";
	// 품목명
	oCell3.innerHTML = "<a id=\"divRightItemName\">&nbsp;" + item_name + "</a>"
					   + "<input type=\"hidden\" name=\"rightItemName\" value=\"" + item_name + "\">";
	// 선택
	oCell4.innerHTML = "<input type=\"checkbox\" name=\"right_check_flag\" class=\"normal\" "
					   + "style=\"text-align:center; border-width:0; \"></input>";
	
	document.recalc();
	setRightRowNo();
	
}

// 번호 setting
function setLeftRowNo() {
	
	var tableLen = left_tbody.rows.length;
	//areaLeftTot.innerHTML = tableLen;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divLeftRowNo[0] ) {
			divLeftRowNo[i].innerHTML = i+1;
		}
		else {
			divLeftRowNo.innerHTML = "1";
		}
	}
	
}

// 번호 setting
function setRightRowNo() {
	
	var tableLen = right_tbody.rows.length;
	//areaRightTot.innerHTML = tableLen;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRightRowNo[0] ) {
			divRightRowNo[i].innerHTML = i+1;
		}
		else {
			divRightRowNo.innerHTML = "1";
		}
	}
	
}

// 왼쪽 row 삭제 
// parameter : button object
function delLeftRow( rowIndex ) { 
	
	left_tbody.deleteRow(rowIndex);
	setLeftRowNo();
	
}

// 오른쪽 row 삭제 
// parameter : button object
function delRightRow( rowIndex ) { 
	
	right_tbody.deleteRow(rowIndex);
	setRightRowNo();
	
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgLeftOver( obj ) {
	if( left_tbody.rows[obj.rowIndex] ) { 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
	} 
	else{ 
		left_tbody.rows.style.backgroundColor = "#eeeeee"; 
	}	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환
function bgLeftOut( obj ) {
	if( left_tbody.rows[obj.rowIndex] ) { 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else { 
		left_tbody.rows.style.backgroundColor = "#ffffff"; 
	}	
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgRightOver( obj ) {
	if( right_tbody.rows[obj.rowIndex] ) { 
		right_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
	} 
	else{
		right_tbody.rows.style.backgroundColor = "#eeeeee";
	} 
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환
function bgRightOut( obj ) {
	if( right_tbody.rows[obj.rowIndex] ) { 
		right_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else { 
		right_tbody.rows.style.backgroundColor = "#ffffff"; 
	}
}

// 저장 버튼 클릭
function GoSave(service) {	
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// 조회 버튼 클릭
function GoSearch(service) {
	
	var src_loc_sel = document.frm.src_loc_sel.value;
	var tgt_loc_sel = document.frm.tgt_loc_sel.value;
	
	// 중계수송거점을 선택하지 않은 경우
	if( src_loc_sel == "" ) {
		alert("중계수송거점을 선택해 주십시요.");
		return;
	}
	
	// 입고장을 선택하지 않은 경우
	if( tgt_loc_sel == "" ) {
		alert("입고장을 선택해 주십시요.");
		return;
	}
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// HTML Grid 화면 resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
	var topLineHeightValue = topRight.style.height.split("px")[0]; 
	
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
	tbMain1.style.height = tableHeightValue + "px"; 
	rightDisplay.style.height = leftDiplayHeightValue + "px";
	//mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px"; 
	//tbMain.width = tableWidthValue + "px"; 
	//topLeft.style.width = topLineWidthValue + "px"; 
	//leftDisplay.style.width = displayWidthValue + "px";
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px"; //하단 화면 테이블의 위치를 지정하기 위한 부분.
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}