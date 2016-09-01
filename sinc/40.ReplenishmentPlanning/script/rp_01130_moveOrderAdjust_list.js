// combo box 를 Edit Mode 로 변환
function setEditMode1( objTd ) {
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();	
}

// combo box 를 View Mode 로 변환
function setViewMode1(objBox) {

 	var	strVal1 = objBox.options[objBox.selectedIndex].value;
 	var	strVal = objBox.options[objBox.selectedIndex].text;

	objBox.parentNode.childNodes(0).innerHTML = strVal;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal1+"&nbsp;" + strVal2;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";

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
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
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


// 클릭한 라인 인덱스
var clickedLineIdx = null;

// 화면 전체 row의 색깔을 지정함.
var lineColor = new Array();
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
var popImgIdx = null;

// input box 를 Edit Mode 로 변환
// onClick
function setEditMode( objTd ) {
	
	var rowIdx		= objTd.parentNode.rowIndex;
	var transDate	= null;


	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	// 제품코드 검색 셀인경우
	if( objTd.childNodes(0).id == "divItemId" ) {
		objTd.childNodes(1).childNodes(0).select();
	}
	// 수송일자 검색 셀
	else if( objTd.childNodes(0).id == "divTransDate" ) {
		objTd.childNodes(0).style.display = "block";
		objTd.childNodes(1).style.display = "none";
		var strDate = "<input type=\"text\" name=\"transDateTmp\" size=\"10\" maxlength=\"10\" onDblClick=\"this.select(); \" "
			+ "class=\"normal\" onBlur=\"chkDate2(this, '10'); \" onKeyDown=\"moveNextBox(this); \" "
			+ "onFocusOut=\"setViewMode(this); \" "
			+ "style=\"text-align:center; width:70px; \" ><img src=\"sinc/template/basic/skin/nongshim/images/common/icon_cal.gif\" "
			+ "id=\"btnDate\" align=\"absmiddle\" border=\"0\" style=\"cursor:pointer; \" "
			+ "onMouseOver=\"overBtn(this); \" onMouseOut=\"outBtn(this);>\"; "
		objTd.childNodes(0).innerHTML = strDate;
		document.frm.transDateTmp.value = objTd.childNodes(1).value;
		//document.frm.transDateTmp.focus();
		document.frm.transDateTmp.select();
		Calendar.setup({
			inputField  : "transDateTmp", // id of the input field
			ifFormat    : "%Y-%m-%d",     // format of the input field 
			button      : "btnDate",      // trigger for the calendar (button ID)
			align       : "Tl",           // alignment (defaults to "Bl")
			singleClick : true
		});
	}
	else {
		objTd.childNodes(1).select();
		//objTd.childNodes(1).focus();
	}
	
	objTd.onclick = "";
		
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

// 날짜 검색 POP BTN mouseOver
function overBtn( objBtn ) {
	
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// 날짜 검색 POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
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
	
	// 기본재고상차BOX, 추가재고상차BOX, 생산상차BOX 입력창인 경우, 숫자 체크 & 천단위 구분자 표시
	if( objBox.name == "base_stk_box" || objBox.name == "base_stk_plt" ) {
		if( strVal != "" && strVal != null ) {
			// 숫자 체크
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "숫자만 입력하여 주세요.");
				setEditMode( objTd );
				return;
			}
			// 형식이 맞는 경우 천단위 구분자 표시
			else {
				strVal = objBox.value;
				objBox.value = numberFormat( strVal );
				strVal = objBox.value;
			}
		}
		
		// BOX 인 경우 누적상차집계 계산
		if( objBox.name == "base_stk_box" ) {
			// PLT 수량 계산
			calPltQty(objBox);
		}
		
		// PLT 인 경우 누적상차집계 계산
		if( objBox.name == "base_stk_plt"  ) {
			// Box 수량 계산
			calBoxQty(objBox);
		}
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

// PLT 수량 계산
function calPltQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "base_stk_box" ) { // 기본재고상차
			var pltBox = document.frm.base_stk_plt[rowIdx];
			var pltDiv = divBasePlt[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "base_stk_box" ) { // 기본재고상차
			var pltBox = document.frm.base_stk_plt;
			var pltDiv = divBasePlt;
		}
		else {
			return;
		}
	}
	
	// PALET 당 BOX 수량이 없는 경우 1 로 계산
	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
		var boxPerPalet = 1;
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
	
	pltBox.value = delComma(pltStr);
	pltDiv.innerHTML = fixedPoint(pltStr, 2) + "&nbsp;";
	
}

// Box 수량 계산
function calBoxQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "base_stk_plt" ) { // 기본재고상차
			var boxPlt = document.frm.base_stk_box[rowIdx];
			var boxDiv = divBaseBox[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "base_stk_plt" ) { // 기본재고상차
			var boxPlt = document.frm.base_stk_box;
			var boxDiv = divBaseBox;
		}
		else {
			return;
		}
	}
	
	// PALET 당 BOX 수량이 없는 경우 1 로 계산
	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
		var boxPerPalet = 1;
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
		var boxQty = Math.round(pltQty * boxPerPalet);
		var boxStr = numberFormat(boxQty.toString());
	}
	
	boxPlt.value = delComma(boxStr);
	boxDiv.innerHTML = boxStr + "&nbsp;";
	
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#d0b8f1" &&
			left_tbody.rows[rowIdx].style.backgroundColor != "#8de88d" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#d0b8f1" &&
			left_tbody.rows[rowIdx].style.backgroundColor != "#8de88d" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	}
	
}


// src_loc(출고장), item_id(제품 코드) 로부터 box_per_palet 찾기
// obj 는 select box 또는 input box
function getBoxPerPalet( obj ) {
	
	// 출고장 입력창에서 발생한 event 인지, 제품코드 입력창에서 발생한 event 인지 구분
	if( obj.name == "src_loc" ) {
		var rowIdx = obj.parentNode.parentNode.rowIndex;
	}
	else if ( obj.name == "item_id" ) {
		var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		return;
	}
	
	// 출고장, 제품코드 데이터
	if( document.frm.item_id[rowIdx] ) {
		var dc_id = document.frm.src_loc[rowIdx].value;
		var item_id = document.frm.item_id[rowIdx].value;
		var objBoxPerPalet = document.frm.box_per_palet[rowIdx];
	}
	else {
		var dc_id = document.frm.src_loc.value;
		var item_id = document.frm.item_id.value;
		var objBoxPerPalet = document.frm.box_per_palet;
	}
	
	
	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
		callback:function(boxPerPalet){
			if( boxPerPalet == null || boxPerPalet == "" ) {
				objBoxPerPalet.value = 1;
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
	
	tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}

// 저장 버튼 클릭
function GoSave(service) {
	
	var plan_type 	= document.frm.plan_type.value;

	if( plan_type == null || plan_type == "" ) {
		alert("수송유형 을 선택하십시오.");
		return;
	}	

	if(confirm("수송전표를 저장하시겠습니까?") == 1 ) {
		// service_id 저장
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();				
	}
	else{
		return ;
	}
	
}

// 날짜 형식을 체크하는 함수, return value : 1-맞는 형식, 0-잘못된 형식
function chkDate2(obj) {
	
	var separator = "-"; 
	
	var str = obj.value.trim();
	
	if( str == "" || str == null ){
		obj.value = str;
		setViewMode(obj);
		return ;
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



// 검색
function GoSearch(service) {

	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1";
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}


// num 수만큼 행 추가
function addRows( num ) {
	
	for( var i=0; i<num ; ++i ) {
		addRow();
	}
}
