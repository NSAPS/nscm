
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
				var itemid = objBox.value;
				openCodeSearchPop('item_id', 'item_name', '400', '300');
				return;
			}
		}
	});
	
}
/*********************************************************
 ****************** Edit, View Mode  *********************
 *********************************************************/

// input box 를 Edit Mode 로 변환
// onClick
function setEditMode( objTd ) {
	
	if(objTd.childNodes(0).name == "plt_qty" 
		|| objTd.childNodes(0).name == "box_qty"
		|| objTd.childNodes(0).name == "min_trans_qty"){
		
		objTd.childNodes(0).focus();
		return;
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();

	
	objTd.onclick = "";
		
}

// input box 를 View Mode 로 변환
// onFocusOut
function setViewMode( objBox ) {
	
	
	// select box 인 경우, value 가 아니라 TEXT 를 표시해 줘야 함
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
	
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";
	objTd.onclick = function() { setEditMode(this); };
	
}

// PLT, BOX값이 수정되었을때 호출됨.
function onChangeCheck(objBox, flag){
	var strVal = objBox.value;
	
	setChangeCheckFlag(objBox);
	
	// 기본재고상차BOX, 추가재고상차BOX, 생산상차BOX 입력창인 경우, 숫자 체크 & 천단위 구분자 표시
	if( objBox.name == "plt_qty" || objBox.name == "box_qty") {
		if( strVal != "" && strVal != null ) {
			// 숫자 체크
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "숫자만 입력하여 주세요.");
				return;
			}
			// 형식이 맞는 경우 천단위 구분자 표시
			else {
				strVal = objBox.value;
				if(objBox.name == "plt_qty")
					objBox.value = fixedPoint(strVal,2);
				else
					objBox.value = strVal;
				strVal = objBox.value;
			}
		}
		else {
			// BOX 인경우.
			if(objBox.name == "box_qty")
				objBox.value = "0";
			else
				objBox.value = "0.00"
		}
		
		// BOX 인 경우
		if( objBox.name == "box_qty" ) {
			// PLT 수량 계산
			calPltQty(objBox);
		}
		
		// PLT 인 경우
		if( objBox.name == "plt_qty" ) {
			// Box 수량 계산
			calBoxQty(objBox);
		}
	}
}

// 출고사업장이나 PLT, BOX, 최소수송단위를 수정하였을때, 
// 수정되었다는 Flag를 남기기 위한 Function
// 수정된 Flag를 통해서, DML작업을 실행 유무를 판단.
function setChangeCheckFlag(objBox){
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	
	// 출고사업장, PLT, BOX 가 수정된 경우.
	if( objBox.name == "src_loc" || objBox.name == "plt_qty" || objBox.name == "box_qty"){
		
		if(document.frm.plan_update_flag[rowIdx])
			document.frm.plan_update_flag[rowIdx].value = "Y";
		else
			document.frm.plan_update_flag.value = "Y";
	}
	// 최소수송단위가 수정된 경우.
	else if(objBox.name == "min_trans_qty"){
		
		if(document.frm.unit_update_flag[rowIdx])
			document.frm.unit_update_flag[rowIdx].value = "Y";
		else
			document.frm.unit_update_flag.value = "Y";
	}
	// 안전재고가 변경된 경우.
	else if(objBox.name == "safe_qty"){
		if(document.frm.safe_update_flag[rowIdx])
			document.frm.safe_update_flag[rowIdx].value = "Y";
		else
			document.frm.safe_update_flag.value = "Y";
	}
}


/*********************************************************/

// 숫자 input box 에 문자 check 
// parameter : obj - inbox object , type - default value 또는 소수점 check 유뮤 등의 type 정의 
// type - BLANK : 사용자가 잘못된 값을 입력했을 때 default value 를 공백으로 반환, 소수점 허용
//        ZERO : 사용자가 잘못된 값을 입력했을 때 default value 를 0 으로 반환, 소수점 허용 
//        BLANK_INT : 사용자가 잘못된 값을 입력했을 때 default value 를 공백으로 반환, 소수점은 error 처리( only integer ) 
//        ZERO_INT : 사용자가 잘못된 값을 입력했을 때 default value 를 0 으로 반환, 소수점은 error 처리( only integer ) 
//        BLANK_INT_UP : 사용자가 잘못된 값을 입력했을 때 default value 를 공백으로 반환, 음수 & 소수점은 error 처리( only plus integer ) 
//        ZERO_INT_UP : 사용자가 잘못된 값을 입력했을 때 default value 를 0 으로 반환, 음수 & 소수점은 error 처리( only plus integer ) 
//        ** type parameter 가 없으면 ZERO(default=0, 소숫점 허용) 와 같음 
function checkNum(obj, type) {

	var i, ch;
	var pointCheck = 0;
	var defaultVal = "0"; 
	var alertMsg = "숫자만 입력하여 주세요.";
	var checkType = "POINT"; 
	
	// default value 는 공백 
	if( type == "BLANK" || type == "BLANK_INT" || type == "BLANK_INT_UP" ) 
		defaultVal = ""; 
	
	// 소수점 허용하지 않음 
	if( type == "BLANK_INT" || type == "ZERO_INT" || type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
	{ 
		if( type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
			alertMsg = "자연수만 입력하여 주세요."; 
		else 
			alertMsg = "정수만 입력하여 주세요."; 
		checkType = "INT"; 
		pointCheck = 1; 
	} 
	
	var checkValue = delComma(obj.value).trim();

	if( defaultVal == "0" && ( checkValue == null || checkValue == "" ) )
	{
		//objSetting(obj, defaultVal, alertMsg);
		return false;
	}
	
	for (i=0; i < checkValue.length; i++) {
		
		ch = checkValue.charAt(i);
		
		// invalid value 
		if(ch==" ")
		{ 
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
		
		// valid value
		else if ( ( ch >= 0 && ch <= 9 ) ) 
		{ }
		
		// point check 
		else if ( ch == '.' ) 
		{
			pointCheck += 1;
			// invalid value 
			if ( pointCheck > 1 )
			{
				//objSetting(obj, defaultVal, alertMsg); 
				return false;
			} 
		} 
		
		// valid value : minus sign 
		else if ( i == 0 && ch == '-' && type != "BLANK_INT_UP" && type != "ZERO_INT_UP" ) 
		{ } 
		
		// invalid value 
		else 
		{
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
	}
	
	obj.value = checkValue; 
	return true;
	
}


/*********************************************************
 ******************** PLT, BOX 계산   *********************
 *********************************************************/

// BOX 수량이 변경된 경우, PLT 수량을 자동으로 계산 하기 위한 function
function calPltQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "box_qty" ) { // 기본재고상차
			var pltBox = document.frm.plt_qty[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "box_qty" ) { // 기본재고상차
			var pltBox = document.frm.plt_qty;
		}
		else {
			return;
		}
	}
	
	// PALET 당 BOX 수량이 없는 경우 1 로 계산
	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
		var boxPerPalet = 100;
	}
	else {
		var boxPerPalet = Number(delComma(boxPerPaletStr));
	}
	
	// BOX 입력창이 비어 있는 경우
	if( objBox.value == null || objBox.value == "" ) {
		var pltStr = "";
	}
	else {
		var boxQty = Number(delComma(objBox.value));
		var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;
		var pltStr = numberFormat(pltQty.toString());
	}
	
	pltBox.value = delComma(fixedPoint(pltStr,2));
	
}

// PLT 수량이 변경된 경우 BOX 수량을 자동으로 계산하기 위한 function
function calBoxQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "plt_qty" ) { 
			var boxPlt = document.frm.box_qty[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "plt_qty" ) { // 기본재고상차
			var boxPlt = document.frm.box_qty;
		}
		else {
			return;
		}
	}
	
	// PALET 당 BOX 수량이 없는 경우 1 로 계산
	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
		var boxPerPalet = 100;
	}
	else {
		var boxPerPalet = Number(delComma(boxPerPaletStr));
	}
	
	// BOX 입력창이 비어 있는 경우
	if( objBox.value == null || objBox.value == "" ) {
		var boxStr = "";
	}
	else {
		var pltQty = Number(delComma(objBox.value));
		var boxQty = Math.round(Math.round(pltQty * boxPerPalet*100)/100,0);
		var boxStr = numberFormat(boxQty.toString());
	}
	
	boxPlt.value = boxStr;
	
}

/*********************************************************/

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	left_tbody.rows[rowIdx].style.backgroundColor = "#aaaaaa"; 
	main_tbody.rows[rowIdx].style.backgroundColor = "#aaaaaa"; 
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
	main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
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
	// 제품코드 셀인 경우
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// PLT --> BOX
		if( objName == "plt_qty" ) {
			objTdG = main_tbody.rows[rowIdx].cells[12];
		}
		// BOX --> 출고사업장
		else if( objName == "box_qty" ) {
			
			objTdG = main_tbody.rows[rowIdx].cells[14];
		}
		// 출고사업장 --> 최소수송단위
		//else if( objName == "src_loc" ) {
		//	objTdG = left_tbody.rows[rowIdx].cells[14];
		//}
		// 최소수송단위 --> 다음줄 PLT
		else if( objName == "min_trans_qty" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[11];
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[11];
			}
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

// src_loc(출고장), item_id(제품 코드) 로부터 box_per_palet 찾기
// obj 는 select box 또는 input box
function getBoxPerPalet( obj ) {
	
	// 출고장 입력창에서 발생한 event 인지, 제품코드 입력창에서 발생한 event 인지 구분
	if(obj.name == "box_qty"){
		var rowIdx = obj.parentNode.parentNode.rowIndex;
	}
	else if(obj.name == "plt_qty"){
		var rowIdx = obj.parentNode.parentNode.rowIndex;
	}
	else if( obj.name == "src_loc" ) {
		var rowIdx = obj.parentNode.parentNode.rowIndex;
	}
	else if ( obj.name == "item_id" ) {
		var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		return;
	}
	
	// 출고장, 제품코드 데이터
	if( document.frm.src_loc[rowIdx]) {
		var dc_id = document.frm.src_loc[rowIdx].value;
		var src_loc = document.frm.src_loc[rowIdx];
		var item_id = document.frm.item_id.value;
		var objBoxPerPalet = document.frm.box_per_palet[rowIdx];
		var box_qty = document.frm.box_qty[rowIdx];
		var plt_qty = document.frm.plt_qty[rowIdx];
	}
	else {
		var dc_id = document.frm.src_loc.value;
		var src_loc = document.frm.src_loc;
		var item_id = document.frm.item_id.value;
		var objBoxPerPalet = document.frm.box_per_palet;
		var box_qty = document.frm.box_qty;
		var plt_qty = document.frm.plt_qty;
	}
	
	// 출고장을 선택하지 않고 값을 수정하려고 한 경우..
	if(dc_id == null || dc_id == ""){
		box_qty.value = "0";
		plt_qty.value = "0.00";
		alert("PLT, BOX값을 수정하기 전에 출고장을 먼저 선택하여 주십시요.");
		setEditMode( src_loc.parentNode );
		src_loc.focus();
		return;
	}
	
	// 출고장 또는 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( dc_id == null || dc_id == "" || item_id == null || item_id == "" ) {
		return;
	}
	
	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
		callback:function(boxPerPalet){
			if( boxPerPalet == null || boxPerPalet == "" ) {
				objBoxPerPalet.value = 100;
			}
			else {
				objBoxPerPalet.value = boxPerPalet;
			}
		}
	});
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
	
	var tabWidthValue = Number(maxWidthValue) - 15;
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
	
	tabPage1.style.width = tabWidthValue + "px";
	tbMain.width = tableWidthValue + "px"; 
	topLine.style.width = topLineWidthValue + "px"; 
	mainDisplay.style.width = displayWidthValue + "px";
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}

// 날짜 형식을 체크하는 함수, return value : 1-맞는 형식, 0-잘못된 형식
function chkDate2(obj) {
	
	var separator = "-"; 
	
	var str = obj.value.trim();
	
	if( str == "" || str == null ){
		obj.value = str;
		setViewMode(obj);
		return 1;
	}
	
	str = str.replace(/\//g, '').replace(/-/g, '');
	obj.value = str.substr(0, 4) + separator + str.substr(4, 2) + separator + str.substr(6, 2);
	
	var input = obj.value.trim(); 
	
	if ( input.length == 0 ) return 1; // 공백은 skip
	
	var dateType = "yyyy-MM-dd"; 
	var inputYear = input.substr(0,4); 
	var inputMonth = input.substr(5,2) - 1; 
	var inputDate = input.substr(8,2); 
	
	if( (input.substr(4,1) != "-" && input.substr(4,1) != "/") || (input.substr(7,1) != "-" && input.substr(7,1) != "/") ) 
	{ 
		separator = "invalid"; 
	}
	
	var resultDate = new Date(inputYear, inputMonth, inputDate); 
	if ( resultDate.getFullYear() != inputYear || resultDate.getMonth() != inputMonth || resultDate.getDate() != inputDate || input.length != 10 || separator == "invalid" ) 
	{ 
		obj.value = ""; 
		//obj.select(); 
		alertChkDate(input, dateType); 
		setEditMode( obj.parentNode );
		return 0; 
	} 
	else 
	{ 
		//setViewMode(obj);
		return 1; 
	} 
	
}

// version - seq 분리
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

// 검색
function GoSearch(service) {
	
	// 버전, 입고장, 수송구분 검색 데이터 setting
	var versions = document.frm.plan_version.value;
	if( versions == "" || versions == null ) {
		alert("버전을 선택하세요.");
		return;
	}
	if( document.frm.trans_start.value == "" || document.frm.trans_start.value == null ) {
		alert("수송일자를 입력하여 주십시요.");
		return;
	}
	
	if( document.frm.item_id.value == "" || document.frm.item_id.value == null ) {
		alert("제품코드를 입력하여 주십시요.");
		return;
	}
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1";
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// 저장 버튼 클릭
function GoSave(service) {
	
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var trans_date = document.frm.trans_start.value;
	var item_id = document.frm.item_id.value;
	// 버전, 차수를 선택하지 않은 경우
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("버전을 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	
	if( trans_date == null || trans_date == ""){
		alert("수송일자를 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("제품 코드를 먼저 입력하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	
	
	// 다시 확인
	if(!confirm("저장하시겠습니까?"))
		return;
		
	viewWait();
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}


// 차기버전 계획반영 버튼 클릭시.
function GoCreate(service) {
	
	var trans_date = document.frm.trans_start.value;
	var item_id = document.frm.item_id.value;

	if( trans_date == null || trans_date == ""){
		alert("수송일자를 먼저 선택하고 데이터를 조회 하셔야 계획에 반영이 가능합니다.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("제품 코드를 먼저 입력하고 데이터를 조회 하셔야 계획에 반영이 가능합니다.");
		return;
	}
	
	
	// 다시 확인
	if(!confirm("계획에 반영하시겠습니까?"))
		return;
	
	viewWait();
	
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
				var itemid = objBox.value;
				openCodeSearchPop('item_id', 'item_name', '400', '300');
				return;
			}
			GoSearch(service);
		}
	});
	
}

// 컬럼 숨김 기능
// 판매누계 : 60(tdSaleCum)
// 당일판매계획 : 60(tdTodaySalesPlan)
// 판매주문 : 60(tdTodaySale)
// 1주평균판매 : 60(tdWeek1Sale)
// 3주평균판매 : 60(tdWeek3Sale)
// 당일재고 : 60(tdTodayStock)
// 입고예정 : 60(tdTransInQty)
// 출고예정 : 60(tdTransOutQty)
// 재고일수 : 60(tdStockDay)
// 익일판매계획 : 60(tdTomorrowSale)
// 익일주문 : 60(tdTomorrowOrder)
// 예상재고 : 60(tdExpectStock)
// 보충요구량 : 60(tdRepQty)
function changeDisplay(obj){
	
	var tabLen = left_tbody.rows.length;	
	
	if(tabLen == 1) return;
	
	if( obj.width == 5 ){// 펼침
	
		var mainTableWidth = Number(mainTable.width);
		var topTableWidth = Number(topTable.width);
		
		var tdWidth;
		
		if( obj.id == "tdSaleCum") tdWidth = 60;
		else if( obj.id == "tdTodaySalesPlan" ) tdWidth = 60;
		else if( obj.id == "tdTodaySale" ) tdWidth = 60;
		else if( obj.id == "tdWeek1Sale" ) tdWidth = 60;
		else if( obj.id == "tdWeek3Sale" ) tdWidth = 60;
		else if( obj.id == "tdTodayStock" ) tdWidth = 60;
		else if( obj.id == "tdTransInQty" ) tdWidth = 60;
		else if( obj.id == "tdTransOutQty" ) tdWidth = 60;
		else if( obj.id == "tdStockDay" ) tdWidth = 60;
		else if( obj.id == "tdStockTerm" ) tdWidth = 60;
		else if( obj.id == "tdTomorrowSale" ) tdWidth = 60;
		else if( obj.id == "tdTomorrowOrder" ) tdWidth = 60;
		else if( obj.id == "tdExpectStock" ) tdWidth = 60;
		else if( obj.id == "tdRepQty" ) tdWidth = 60;
		
		mainTable.width = mainTableWidth + tdWidth - 5;
		topTable.width = topTableWidth + tdWidth - 5;
		
		var id = obj.id
		var td = document.getElementsByName(id);
		for( i = 0; i < (tabLen + 1); i++ ){
			//tdPlant[i].style.display = "none";
			td[i].width = tdWidth;
		}
		
	}
	else{ // 숨김
		var tdWidth = Number(obj.width);
		
		var mainTableWidth = Number(mainTable.width);
		var topTableWidth = Number(topTable.width);
		
		mainTable.width = mainTableWidth - tdWidth + 5;
		topTable.width = topTableWidth - tdWidth + 5;
		
		var id = obj.id
		var td = document.getElementsByName(id);
		for( i = 0; i < (tabLen + 1); i++ ){
			td[i].width = 5;
		}
	}
	
	setHtmlGridAutoResize('150', '273');
}
