////////////////////////////////////////////////////////////
// 프로그램ID : rp_01010_dailyTransportPlan_list.js
// 프로그램명 : 수송계획조회 및 조정
// 개발자  : 허준성
// 개발일자 : 2008-11-25 화요일
//
//관련 job file : job_sinc_40_replenishmentPlanning.xml
//
//관련 query file : query_sinc_40_replenishmentPlanning.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-11-25  허준성     rp_01010_dailyTransportPlan_list.js 개발
//
//
////////////////////////////////////////////////////////////

/*********************************************************
 ********************** 공통 변수  ************************
 *********************************************************/

// 클릭한 라인 인덱스
var clickedLineIdx = null;
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
var popImgIdx = null;

// 클릭한 수송일자 인덱스
var clickedDateIdx = null;

/*********************************************************/

// Ctrl 키가 keydown 상태인지 체크하는 flag
var ctrlKeyDownCheck = false;

// CTRL  키를 눌렀을때 호출
function setCtlKeyDown(e){
	if (!e) e = window.event;
	
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = true;
	}
}

// CTRL 키, F2 키를 눌렀다가 놓았을때 호출
function setCrlKeyUp(e){
	if (!e) e = window.event;
	
	// F2 키
	if(e.keyCode == "113"){
		clickLine(document.frm.btnSearchRow, 1);
	}
	
	// ctrl 키
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = false;
	}
}

// 화면에서 CTRL 키를 누른상태에서 방향키를 눌렀을때 셀 이동이 가능하게 하는 function
function moveUpDown(objBox){
	
	// ctrl 키가 keydown 상태가 아닌 경우에는 return 
	if(!ctrlKeyDownCheck)
		return;
	
	var tableLen = left_tbody.rows.length;
	// 제품코드 셀인 경우
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	
	// Row가 2개 이상 있는 경우..
	if(document.frm.base_stk_plt[rowIdx]){
		// 방향키 ↑(위) : 38, ↓(아래) : 40, ←(왼쪽) : 37, →(오른쪽) : 39
		// 1. 위 : 38
		if( event.keyCode == "38" ) {
			
			if(objName == "base_stk_plt"){	// 기본재고상차 PLT
				if( rowIdx == 0 ) 		document.frm.base_stk_plt[tableLen-2].focus();
				else 					document.frm.base_stk_plt[rowIdx-1].focus();
			}
			else if(objName == "base_stk_box"){ // 기본재고상차 BOX
				if( rowIdx == 0 )		document.frm.base_stk_box[tableLen-2].focus();
				else 					document.frm.base_stk_box[rowIdx-1].focus();
			}
			else if(objName == "add_stk_plt"){ // 추가재고상차 PLT
				if( rowIdx == 0 )		document.frm.add_stk_plt[tableLen-2].focus();
				else 					document.frm.add_stk_plt[rowIdx-1].focus();
			}
			else if(objName == "add_stk_box"){ // 추가재고상차 BOX
				if( rowIdx == 0 )		document.frm.add_stk_box[tableLen-2].focus();
				else 					document.frm.add_stk_box[rowIdx-1].focus();
			}
			else if(objName == "prod_plt"){ // 생산재고상차 PLT
				if( rowIdx == 0 )		document.frm.prod_plt[tableLen-2].focus();
				else					document.frm.prod_plt[rowIdx-1].focus();
			}
			else if(objName == "prod_box"){ // 생산재고상차 BOX
				if( rowIdx == 0 )		document.frm.prod_box[tableLen-2].focus();
				else					document.frm.prod_box[rowIdx-1].focus();
			}
		}
		// 2. 아래 : 40
		else if( event.keyCode == "40" ) {
			
			if(objName == "base_stk_plt"){
				if( rowIdx == tableLen - 2 ) 	document.frm.base_stk_plt[0].focus();
				else 							document.frm.base_stk_plt[rowIdx+1].focus();
			}
			else if(objName == "base_stk_box"){
				if( rowIdx == tableLen - 2 )	document.frm.base_stk_box[0].focus();
				else 							document.frm.base_stk_box[rowIdx+1].focus();
			}
			else if(objName == "add_stk_plt"){
				if( rowIdx == tableLen - 2 )	document.frm.add_stk_plt[0].focus();
				else 							document.frm.add_stk_plt[rowIdx+1].focus();
			}
			else if(objName == "add_stk_box"){
				if( rowIdx == tableLen - 2 )	document.frm.add_stk_box[0].focus();
				else 							document.frm.add_stk_box[rowIdx+1].focus();
			}
			else if(objName == "prod_plt"){
				if( rowIdx == tableLen - 2 )	document.frm.prod_plt[0].focus();
				else							document.frm.prod_plt[rowIdx+1].focus();
			}
			else if(objName == "prod_box"){
				if( rowIdx == tableLen - 2 )	document.frm.prod_box[0].focus();
				else							document.frm.prod_box[rowIdx+1].focus();
			}
		}
		// 3. 왼쪽 : 37
		else if( event.keyCode == "37" ) {
			
			if(objName == "base_stk_plt")
				document.frm.prod_box[rowIdx].focus();
			else if(objName == "base_stk_box")
				document.frm.base_stk_plt[rowIdx].focus();
			else if(objName == "add_stk_plt")
				document.frm.base_stk_box[rowIdx].focus();
			else if(objName == "add_stk_box")
				document.frm.add_stk_plt[rowIdx].focus();
			else if(objName == "prod_plt")
				document.frm.add_stk_box[rowIdx].focus();
			else if(objName == "prod_box")
				document.frm.prod_plt[rowIdx].focus();
		}
		// 4. 오른쪽 : 39
		else if( event.keyCode == "39" ) {
			
			if(objName == "base_stk_plt")
				document.frm.base_stk_box[rowIdx].focus();
			else if(objName == "base_stk_box")
				document.frm.add_stk_plt[rowIdx].focus();
			else if(objName == "add_stk_plt")
				document.frm.add_stk_box[rowIdx].focus();
			else if(objName == "add_stk_box")
				document.frm.prod_plt[rowIdx].focus();
			else if(objName == "prod_plt")
				document.frm.prod_box[rowIdx].focus();
			else if(objName == "prod_box")
				document.frm.base_stk_plt[rowIdx].focus();
		}
	}
	// Row가 한개인 경우..
	else{
		// 3. 왼쪽 : 37
		if( event.keyCode == "37" ) {
			
			if(objName == "base_stk_plt")
				document.frm.prod_box.focus();
			else if(objName == "base_stk_box")
				document.frm.base_stk_plt.focus();
			else if(objName == "add_stk_plt")
				document.frm.base_stk_box.focus();
			else if(objName == "add_stk_box")
				document.frm.add_stk_plt.focus();
			else if(objName == "prod_plt")
				document.frm.add_stk_box.focus();
			else if(objName == "prod_box")
				document.frm.prod_plt.focus();
		}
		// 4. 오른쪽 : 39
		else if( event.keyCode == "39" ) {
			
			if(objName == "base_stk_plt")
				document.frm.base_stk_box.focus();
			else if(objName == "base_stk_box")
				document.frm.add_stk_plt.focus();
			else if(objName == "add_stk_plt")
				document.frm.add_stk_box.focus();
			else if(objName == "add_stk_box")
				document.frm.prod_plt.focus();
			else if(objName == "prod_plt")
				document.frm.prod_box.focus();
			else if(objName == "prod_box")
				document.frm.base_stk_plt.focus();
		}
	}
}

/*********************************************************
 ****************** Edit, View Mode  *********************
 *********************************************************/

// input box 를 Edit Mode 로 변환
// onClick
function setEditMode( objTd ) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	var transDate = null;
	
	// 일반 Text 박스인 경우에는 아래와 같이 설정.
	if(objTd.childNodes(0).name == 'truck_seq' 
		|| objTd.childNodes(0).name == 'base_stk_plt'
		|| objTd.childNodes(0).name == 'base_stk_box'
		|| objTd.childNodes(0).name == 'add_stk_plt'
		|| objTd.childNodes(0).name == 'add_stk_box'
		|| objTd.childNodes(0).name == 'prod_plt'
		|| objTd.childNodes(0).name == 'prod_box'){
		
		objTd.childNodes(0).focus();
		return;
	}
	if(document.frm.trans_date[rowIdx]){
		transDate = document.frm.trans_date[rowIdx];	
	}else{
		transDate = document.frm.trans_date;
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	// 제품코드 검색 셀인경우
	if( objTd.childNodes(0).id == "divItemId" ) {
		objTd.childNodes(1).childNodes(0).focus();
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
			+ "onMouseOver=\"overBtn(this); \" onMouseOut=\"outBtn(this); \">";
		objTd.childNodes(0).innerHTML = strDate;
		document.frm.transDateTmp.value = objTd.childNodes(1).value;
		document.frm.transDateTmp.focus();
		Calendar.setup({
			inputField  : "transDateTmp", // id of the input field
			ifFormat    : "%Y-%m-%d",     // format of the input field 
			button      : "btnDate",      // trigger for the calendar (button ID)
			align       : "Tl",           // alignment (defaults to "Bl")
			singleClick : true
		});
	}
	else {
		//objTd.childNodes(1).select();
		objTd.childNodes(1).focus();
	}
	
	objTd.onclick = "";
		
}

// input box 를 View Mode 로 변환
// onFocusOut
function setViewMode( objBox ) {
	
	// 제품코드 검색 셀인경우
	//if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
	if( objBox.name == "item_id" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		}
	}
	// 수송일자 셀인 경우
	else if( objBox.name == "transDateTmp" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == clickedDateIdx ) {
			return;
		}
		// 기존의 수송 일자
		var trans_date_temp = objTd.childNodes(1).value;
		// 변경된 수송 일자
		objTd.childNodes(1).value = strVal;
		
		if(trans_date_temp != strVal){
			calPKCum(objTd.parentNode.rowIndex);
		}
		
	}
	// select box 인 경우, value 가 아니라 TEXT 를 표시해 줘야 함
	else if( objBox.tagName.toUpperCase() == "SELECT" ) {
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

var change_check_flag = false;


// 기본재고상차, 추가재고상차, 생산상차의 PLT, BOX값이 수정되었을때 호출됨.
function onChangeCheck(objBox){
	
	
	var strVal = objBox.value;
	
	// 기본재고상차BOX, 추가재고상차BOX, 생산상차BOX 입력창인 경우, 숫자 체크 & 천단위 구분자 표시
	if( objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box" ||
	    objBox.name == "base_stk_plt" || objBox.name == "add_stk_plt" || objBox.name == "prod_plt") {
		if( strVal != "" && strVal != null ) {
			// 숫자 체크
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "숫자만 입력하여 주세요.");
				return;
			}
			// 형식이 맞는 경우 천단위 구분자 표시
			else {
				strVal = objBox.value;
				if(objBox.name == "base_stk_plt" || objBox.name == "add_stk_plt" || objBox.name == "prod_plt")
					objBox.value = fixedPoint(strVal,2);
				else
					objBox.value = strVal;
				strVal = objBox.value;
			}
		}
		else {
			// BOX 인경우.
			if(objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box")
				objBox.value = "0";
			else
				objBox.value = "0.00"
		}
		
		// BOX 인 경우 누적상차집계 계산
		if( objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box" ) {
			// PLT 수량 계산
			calPltQty(objBox);
			// 누적 계산
			calPltBoxCum(objBox);
		}
		
		// PLT 인 경우 누적상차집계 계산
		if( objBox.name == "base_stk_plt" || objBox.name == "add_stk_plt" || objBox.name == "prod_plt" ) {
			// Box 수량 계산
			calBoxQty(objBox);
			// 누적 계산
			calPltBoxCum(objBox);
		}
	}
}

// 마지막으로 click한 값을 임시저장
var temp_clicked_box_value = 0;
var temp_clicked_plt_value = 0;

// 현재 클릭된 PLT나 BOX값을 임시로 저장하기 위해서 호출되는 function
function onClickCheck(objBox){
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if(objBox.name == "base_stk_box" || objBox.name == "base_stk_plt"){
		if(document.frm.base_stk_box[rowIdx]){
			temp_clicked_box_value = strToNum(document.frm.base_stk_box[rowIdx].value);
			temp_clicked_plt_value = strToNum(document.frm.base_stk_plt[rowIdx].value);
		}else{
			temp_clicked_box_value = strToNum(document.frm.base_stk_box.value);
			temp_clicked_plt_value = strToNum(document.frm.base_stk_plt.value);
		}
	}
	else if(objBox.name == "add_stk_box" || objBox.name == "add_stk_plt"){
		if(document.frm.add_stk_box[rowIdx]){
			temp_clicked_box_value = strToNum(document.frm.add_stk_box[rowIdx].value);
			temp_clicked_plt_value = strToNum(document.frm.add_stk_plt[rowIdx].value);
		}else{
			temp_clicked_box_value = strToNum(document.frm.add_stk_box.value);
			temp_clicked_plt_value = strToNum(document.frm.add_stk_plt.value);
		}
	} 
	else if(objBox.name == "prod_box" || objBox.name == "prod_plt"){
		if(document.frm.prod_box[rowIdx]){
			temp_clicked_box_value = strToNum(document.frm.prod_box[rowIdx].value);
			temp_clicked_plt_value = strToNum(document.frm.prod_plt[rowIdx].value);
		}else{
			temp_clicked_box_value = strToNum(document.frm.prod_box.value);
			temp_clicked_plt_value = strToNum(document.frm.prod_plt.value);
		}
	} 
	else{
		temp_clicked_box_value = 0;
		temp_clicked_plt_value = 0;
	}
}


/*********************************************************/

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

// PLT 수량 계산
function calPltQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "base_stk_box" ) { // 기본재고상차
			var pltBox = document.frm.base_stk_plt[rowIdx];
		}
		else if( objBox.name == "add_stk_box" ) { // 추가재고상차
			var pltBox = document.frm.add_stk_plt[rowIdx];
		}
		else if( objBox.name == "prod_box" ) { // 생산상차
			var pltBox = document.frm.prod_plt[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "base_stk_box" ) { // 기본재고상차
			var pltBox = document.frm.base_stk_plt;
		}
		else if( objBox.name == "add_stk_box" ) { // 추가재고상차
			var pltBox = document.frm.add_stk_plt;
		}
		else if( objBox.name == "prod_box" ) { // 생산상차
			var pltBox = document.frm.prod_plt;
		}
		else {
			return;
		}
	}
	
	// PALET 당 BOX 수량이 없는 경우 100 으로 계산
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

// Box 수량 계산
function calBoxQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "base_stk_plt" ) { // 기본재고상차
			var boxPlt = document.frm.base_stk_box[rowIdx];
		}
		else if( objBox.name == "add_stk_plt" ) { // 추가재고상차
			var boxPlt = document.frm.add_stk_box[rowIdx];
		}
		else if( objBox.name == "prod_plt" ) { // 생산상차
			var boxPlt = document.frm.prod_box[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "base_stk_plt" ) { // 기본재고상차
			var boxPlt = document.frm.base_stk_box;
		}
		else if( objBox.name == "add_stk_plt" ) { // 추가재고상차
			var boxPlt = document.frm.add_stk_box;
		}
		else if( objBox.name == "prod_plt" ) { // 생산상차
			var boxPlt = document.frm.prod_box;
		}
		else {
			return;
		}
	}
	
	// PALET 당 BOX 수량이 없는 경우 100 으로 계산
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
		var boxQty = Math.round(pltQty * boxPerPalet*100)/100;
		var boxStr = numberFormat(boxQty.toString());
	}
	
	boxPlt.value = delComma(boxStr);
	
}

/*********************************************************/


/**************************************************************************************************
 **************************************** 누적상차집계 계산 함수  *************************************
 **************************************************************************************************/

// 수정된 Row의 차량순번, 수송일자, 출고장이 같은 Row들만 누적상차집계 계산 (부하를 줄이기 위해서.)
// BOX, PLT가 수정된 경우 호출..
function calPltBoxCum(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var tableLen = left_tbody.rows.length;
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var end_flag = false;
	
	// 수정된 Row가 맨 윗줄인 경우..
	if(rowIdx == 0){
		if(document.frm.base_stk_box[0]){
			cumBox += strToNum(document.frm.base_stk_box[0].value);
			cumBox += strToNum(document.frm.add_stk_box[0].value);
			cumBox += strToNum(document.frm.prod_box[0].value);
			cumPlt += strToNum(document.frm.base_stk_plt[0].value);
			cumPlt += strToNum(document.frm.add_stk_plt[0].value);
			cumPlt += strToNum(document.frm.prod_plt[0].value);
			
			// 누적 계산
			document.frm.cum_box[0].value = numberFormat(cumBox.toString());
			cumPlt = Math.round(cumPlt*1000000)/1000000;
			document.frm.cum_plt[0].value = fixedPoint(cumPlt.toString(), 2);
		}
		else{
			cumBox += strToNum(document.frm.base_stk_box.value);
			cumBox += strToNum(document.frm.add_stk_box.value);
			cumBox += strToNum(document.frm.prod_box.value);
			cumPlt += strToNum(document.frm.base_stk_plt.value);
			cumPlt += strToNum(document.frm.add_stk_plt.value);
			cumPlt += strToNum(document.frm.prod_plt.value);
			
			// 누적 계산
			document.frm.cum_box.value = numberFormat(cumBox.toString());
			cumPlt = Math.round(cumPlt*1000000)/1000000;
			document.frm.cum_plt.value = fixedPoint(cumPlt.toString(), 2);
		}	
		cumBox = 0; cumPlt = 0;
	}
	
	// Row가 맨 윗줄이 아니면, 수정된 Row 바로 위의 누적값을 cumBox와 cumPlt에 setting 함
	// 수정된 Row 부터 바로 윗 Row의 누적값으로 누적을 구하기 위해서.
	if(rowIdx != 0 
		&& document.frm.trans_date[rowIdx].value == document.frm.trans_date[rowIdx-1].value
		&& document.frm.src_loc[rowIdx].value == document.frm.src_loc[rowIdx-1].value 
		&& document.frm.truck_seq[rowIdx].value == document.frm.truck_seq[rowIdx-1].value){
		cumBox = strToNum(document.frm.cum_box[rowIdx-1].value);
		cumPlt = strToNum(document.frm.cum_plt[rowIdx-1].value);
	}
	
	// Row 수가 1이상인 경우.
	if(tableLen > 2){
		// 선택된 Row의 수송일자, 출고장, 차량 번호를 임시 저장함.
		if(document.frm.trans_date[rowIdx]){
			preTransDate = document.frm.trans_date[rowIdx].value;
			preSrcLoc    = document.frm.src_loc[rowIdx].value;
			preTruckSeq  = document.frm.truck_seq[rowIdx].value;
		}
		else{
			preTransDate = document.frm.trans_date.value;
			preSrcLoc    = document.frm.src_loc.value;
			preTruckSeq  = document.frm.truck_seq.value;
		}
			
		// 수정된 Row에 해당하는 차량의 누적값을 구함.
		for( var i = rowIdx ; i < tableLen-1 ; i++ ) {
			if( document.frm.base_stk_box[i] ) {

				// 출고장, 차량순번이 같은 데이터 누적 집계
				if( document.frm.trans_date[i].value == preTransDate
					&& document.frm.src_loc[i].value == preSrcLoc 
					&& document.frm.truck_seq[i].value == preTruckSeq ) {
					
					
					cumBox += strToNum(document.frm.base_stk_box[i].value);
					cumBox += strToNum(document.frm.add_stk_box[i].value);
					cumBox += strToNum(document.frm.prod_box[i].value);
					cumPlt += strToNum(document.frm.base_stk_plt[i].value);
					cumPlt += strToNum(document.frm.add_stk_plt[i].value);
					cumPlt += strToNum(document.frm.prod_plt[i].value);
					
					document.frm.cum_box[i].value = numberFormat(cumBox.toString());
					cumPlt = Math.round(cumPlt*1000000)/1000000;
					document.frm.cum_plt[i].value = fixedPoint(cumPlt.toString(), 2);
					
					end_flag = true;
				}else{
					if(end_flag)
						break;
				}
			}
			else {
				cumBox = strToNum(document.frm.base_stk_box.value);
				cumBox = strToNum(document.frm.add_stk_box.value);
				cumBox = strToNum(document.frm.prod_box.value);
				cumPlt = strToNum(document.frm.base_stk_plt.value);
				cumPlt = strToNum(document.frm.add_stk_plt.value);
				cumPlt = strToNum(document.frm.prod_plt.value);
				document.frm.cum_box.value = numberFormat(cumBox.toString());
				document.frm.cum_plt.value = fixedPoint(cumPlt.toString(), 2);
				
				var boxPerPaletStr = document.frm.box_per_palet.value;
				// PALET 당 BOX 수량이 없는 경우 1 로 계산
				if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
					var boxPerPalet = 100;
				}
				else {
					var boxPerPalet = Number(delComma(boxPerPaletStr));
				}
				
				// BOX 입력창이 비어 있는 경우
				if( cumBox == null || cumBox == "" ) {
					var pltStr = "";
				}
				else {
					var boxQty = Number(delComma(cumBox));
					var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;
					var pltStr = numberFormat(pltQty.toString());
				}
				
				document.frm.cum_plt.value = fixedPoint(pltStr, 2);
			}
		}	
	}
	
	// Total 구하는 부분..
	var totalCumPlt  = 0;
	var totalCumBox  = 0;
	
	
	// 합계Row 이외의 모든 Row가 삭제된 경우, 합계를 수량 값을 모두 없애 버림.
	if(tableLen <= 1){
			document.frm.tot_base_plt.value  =  fixedPoint(totalCumPlt.toString(), 2);
			document.frm.tot_base_box.value  =  totalCumBox;
			document.frm.tot_add_plt.value   =  fixedPoint(totalCumPlt.toString(), 2);
			document.frm.tot_add_box.value   =  totalCumBox;
			document.frm.tot_prod_plt.value  =  fixedPoint(totalCumPlt.toString(), 2);
			document.frm.tot_prod_box.value  =  totalCumBox;
	}
	// 합계 Row 이외에 1개의 Row만 존재하는 경우.
	else if(tableLen == 2){
		// 현재 배열상태인경우..
		if(document.frm.base_stk_plt[0]){
			var basePlt = strToNum(document.frm.base_stk_plt[0].value);
			var baseBox = strToNum(document.frm.base_stk_box[0].value);
			var addPlt  = strToNum(document.frm.add_stk_plt[0].value);
			var addBox  = strToNum(document.frm.add_stk_box[0].value);
			var prodPlt = strToNum(document.frm.prod_plt[0].value);
			var prodBox = strToNum(document.frm.prod_box[0].value);
			document.frm.tot_base_plt.value  =  fixedPoint(basePlt.toString(), 2);
			document.frm.tot_base_box.value  =  baseBox;
			document.frm.tot_add_plt.value   =  fixedPoint(addPlt.toString(), 2);
			document.frm.tot_add_box.value   =  addBox;
			document.frm.tot_prod_plt.value  =  fixedPoint(prodPlt.toString(), 2);
			document.frm.tot_prod_box.value  =  prodBox;
			
			var totalPlt = strToNum(basePlt)+strToNum(addPlt)+strToNum(prodPlt);
			totalPlt = Math.round(totalPlt*100)/100;
			var totalBox = strToNum(baseBox)+strToNum(addBox)+strToNum(prodBox);
			document.frm.tot_cum_plt.value   =  fixedPoint(totalPlt.toString(),2);
			document.frm.tot_cum_box.value   =  numberFormat(totalBox.toString());
		}
		else{
			var basePlt = strToNum(document.frm.base_stk_plt.value);
			var baseBox = strToNum(document.frm.base_stk_box.value);
			var addPlt  = strToNum(document.frm.add_stk_plt.value);
			var addBox  = strToNum(document.frm.add_stk_box.value);
			var prodPlt = strToNum(document.frm.prod_plt.value);
			var prodBox = strToNum(document.frm.prod_box.value);
			//alert(basePlt+" "+baseBox+" "+addPlt+" "+addBox+" "+prodPlt+" "+prodBox);
			document.frm.tot_base_plt.value  =  fixedPoint(basePlt.toString(), 2);
			document.frm.tot_base_box.value  =  baseBox;
			document.frm.tot_add_plt.value   =  fixedPoint(addPlt.toString(), 2);
			document.frm.tot_add_box.value   =  addBox;
			document.frm.tot_prod_plt.value  =  fixedPoint(prodPlt.toString(), 2);
			document.frm.tot_prod_box.value  =  prodBox;
			
			var totalPlt = strToNum(basePlt)+strToNum(addPlt)+strToNum(prodPlt);
			totalPlt = Math.round(totalPlt*100)/100;
			var totalBox = strToNum(baseBox)+strToNum(addBox)+strToNum(prodBox);
			document.frm.tot_cum_plt.value   =  fixedPoint(totalPlt.toString(),2);
			document.frm.tot_cum_box.value   =  numberFormat(totalBox.toString());
		}
	}
	// Row 수가 1이상인 경우.
	else{
		totalCumPlt	= strToNum(document.frm.tot_cum_plt.value);
		totalCumBox	= strToNum(document.frm.tot_cum_box.value);
		
		// 기본재고상차가 수정된 경우.
		if(objBox.name == "base_stk_plt" || objBox.name == "base_stk_box" ) {
			var calPlt = strToNum(document.frm.base_stk_plt[rowIdx].value) - strToNum(temp_clicked_plt_value);	// 수정된 값에서 기존값을 뺀값
			var calBox = strToNum(document.frm.base_stk_box[rowIdx].value) - strToNum(temp_clicked_box_value);	// 수정된 값에서 기존값을 뺀값
			var calPltStr = strToNum(document.frm.tot_base_plt.value) + calPlt;
			document.frm.tot_base_plt.value = fixedPoint(calPltStr.toString(), 2);
			document.frm.tot_base_box.value = strToNum(document.frm.tot_base_box.value) + calBox;
			
			totalCumPlt	+= calPlt;
			totalCumBox += calBox;
		}
		// 추가재고상차가 수정된 경우.
		else if(objBox.name == "add_stk_plt" || objBox.name == "add_stk_box" ){
			var calPlt = strToNum(document.frm.add_stk_plt[rowIdx].value) - strToNum(temp_clicked_plt_value);	// 수정된 값에서 기존값을 뺀값
			var calBox = strToNum(document.frm.add_stk_box[rowIdx].value) - strToNum(temp_clicked_box_value);	// 수정된 값에서 기존값을 뺀값
			var calPltStr = strToNum(document.frm.tot_add_plt.value) + calPlt;
			document.frm.tot_add_plt.value = fixedPoint(calPltStr.toString(), 2);
			document.frm.tot_add_box.value = strToNum(document.frm.tot_add_box.value) + calBox;
			
			totalCumPlt	+= calPlt;
			totalCumBox += calBox;
		}
		// 생산상차가 수정된 경우.
		else if(objBox.name == "prod_plt" || objBox.name == "prod_box" ){
			var calPlt = strToNum(document.frm.prod_plt[rowIdx].value) - strToNum(temp_clicked_plt_value);	// 수정된 값에서 기존값을 뺀값
			var calBox = strToNum(document.frm.prod_box[rowIdx].value) - strToNum(temp_clicked_box_value);	// 수정된 값에서 기존값을 뺀값
			var calPltStr = strToNum(document.frm.tot_prod_plt.value) + calPlt;
			document.frm.tot_prod_plt.value = fixedPoint(calPltStr.toString(), 2);
			document.frm.tot_prod_box.value = strToNum(document.frm.tot_prod_box.value) + calBox;
			
			totalCumPlt	+= calPlt;
			totalCumBox += calBox;
		}
		else{
			
		}
		document.frm.tot_cum_plt.value = fixedPoint(totalCumPlt.toString(),2);
		document.frm.tot_cum_box.value = numberFormat(totalCumBox.toString());
	}
}


// 삭제 버튼을 클릭하였을때, 누적값과 총합을 구하는 function
function caldelCum(rowIdex) {
	
	var rowIdx = rowIdex;
	var tableLen = left_tbody.rows.length;
	
	// 합계Row 이외에 Row가 존재하지 않는 경우, 합계의 모든 값을 0으로 셋팅.
	if(rowIdex == "n/a"){
		document.frm.tot_base_plt.value  =  fixedPoint(rowIdx.toString(), 2);
		document.frm.tot_base_box.value  =  0;
		document.frm.tot_add_plt.value   =  fixedPoint(rowIdx.toString(), 2);
		document.frm.tot_add_box.value   =  0;
		document.frm.tot_prod_plt.value  =  fixedPoint(rowIdx.toString(), 2);
		document.frm.tot_prod_box.value  =  0;
		document.frm.tot_cum_plt.value   =  fixedPoint(rowIdx.toString(),2);
		document.frm.tot_cum_box.value   =  0;
		return;
	}

	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var end_flag = false;
	
	if(rowIdx == tableLen-1){
		
	}
	else{
		// 수정된 Row의 윗줄과 같은 경우..
		if(rowIdx != 0 
			&& document.frm.trans_date[rowIdx].value == document.frm.trans_date[rowIdx-1].value
			&& document.frm.src_loc[rowIdx].value == document.frm.src_loc[rowIdx-1].value 
			&& document.frm.truck_seq[rowIdx].value == document.frm.truck_seq[rowIdx-1].value){
			cumBox = strToNum(document.frm.cum_box[rowIdx-1].value);
			cumPlt = strToNum(document.frm.cum_plt[rowIdx-1].value);
		}
		
		// Row 수가 1이상인 경우.
		if(tableLen > 1){
			// 선택된 Row의 수송일자, 출고장, 차량 번호를 임시 저장함.
			if(document.frm.trans_date[rowIdx]){
				preTransDate = document.frm.trans_date[rowIdx].value;
				preSrcLoc    = document.frm.src_loc[rowIdx].value;
				preTruckSeq  = document.frm.truck_seq[rowIdx].value;
			}
			else{
				preTransDate = document.frm.trans_date.value;
				preSrcLoc    = document.frm.src_loc.value;
				preTruckSeq  = document.frm.truck_seq.value;
			}
				
		
			for( var i = rowIdx ; i < tableLen-1 ; i++ ) {
				if( document.frm.trans_date[i] ) {
	
					// 출고장, 차량순번이 같은 데이터 누적 집계
					if( document.frm.trans_date[i].value == preTransDate
						&& document.frm.src_loc[i].value == preSrcLoc 
						&& document.frm.truck_seq[i].value == preTruckSeq ) {
						
						
						cumBox += strToNum(document.frm.base_stk_box[i].value);
						cumBox += strToNum(document.frm.add_stk_box[i].value);
						cumBox += strToNum(document.frm.prod_box[i].value);
						cumPlt += strToNum(document.frm.base_stk_plt[i].value);
						cumPlt += strToNum(document.frm.add_stk_plt[i].value);
						cumPlt += strToNum(document.frm.prod_plt[i].value);
						
						document.frm.cum_box[i].value = numberFormat(cumBox.toString());
						cumPlt = Math.round(cumPlt*1000000)/1000000;
						document.frm.cum_plt[i].value = fixedPoint(cumPlt.toString(), 2);
						
						end_flag = true;
					}else{
						if(end_flag)
							break;
					}
				}
				else {
					if(document.frm.base_stk_box[i]){
						cumBox = strToNum(document.frm.base_stk_box[i].value);
						cumBox += strToNum(document.frm.add_stk_box[i].value);
						cumBox += strToNum(document.frm.prod_box[i].value);
						cumPlt = strToNum(document.frm.base_stk_plt[i].value);
						cumPlt += strToNum(document.frm.add_stk_plt[i].value);
						cumPlt += strToNum(document.frm.prod_plt[i].value);
					}else{
						cumBox = strToNum(document.frm.base_stk_box.value);
						cumBox += strToNum(document.frm.add_stk_box.value);
						cumBox += strToNum(document.frm.prod_box.value);
						cumPlt = strToNum(document.frm.base_stk_plt.value);
						cumPlt += strToNum(document.frm.add_stk_plt.value);
						cumPlt += strToNum(document.frm.prod_plt.value);
					}
						
					document.frm.cum_box.value = numberFormat(cumBox.toString());
					cumPlt = Math.round(cumPlt*1000000)/1000000;
					document.frm.cum_plt.value = fixedPoint(cumPlt.toString(), 2);
					
					
					var boxPerPaletStr = document.frm.box_per_palet.value;
					// PALET 당 BOX 수량이 없는 경우 1 로 계산
					if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
						var boxPerPalet = 100;
					}
					else {
						var boxPerPalet = Number(delComma(boxPerPaletStr));
					}
					
					// BOX 입력창이 비어 있는 경우
					if( cumBox == null || cumBox == "" ) {
						var pltStr = "";
					}
					else {
						var boxQty = Number(delComma(cumBox));
						var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;
						var pltStr = numberFormat(pltQty.toString());
					}
					
					document.frm.cum_plt.value = fixedPoint(pltStr, 2);
				}
			}	
		}
	}
	
	// Total 구하는 부분..
	var totalCumPlt  = 0;
	var totalCumBox  = 0;
	
	
	// 합계Row 이외의 모든 Row가 삭제된 경우, 합계를 수량 값을 모두 없애 버림.
	if(tableLen <= 1){
		document.frm.tot_base_plt.value  =  fixedPoint(totalCumPlt.toString(), 2);
		document.frm.tot_base_box.value  =  totalCumBox;
		document.frm.tot_add_plt.value   =  fixedPoint(totalCumPlt.toString(), 2);
		document.frm.tot_add_box.value   =  totalCumBox;
		document.frm.tot_prod_plt.value  =  fixedPoint(totalCumPlt.toString(), 2);
		document.frm.tot_prod_box.value  =  totalCumBox;
		document.frm.tot_cum_plt.value   =  fixedPoint(totalCumPlt.toString(),2);
		document.frm.tot_cum_box.value   =  totalCumBox;
	}
	// Row 수가 1이상인 경우.
	else{
		totalCumPlt	= strToNum(document.frm.tot_cum_plt.value);
		totalCumBox	= strToNum(document.frm.tot_cum_box.value);
		
		// 기본재고상차의 총합을 계산
		var calBasePltStr = strToNum(document.frm.tot_base_plt.value) - strToNum(old_base_plt);
		document.frm.tot_base_plt.value = fixedPoint(calBasePltStr.toString(), 2);
		document.frm.tot_base_box.value = strToNum(document.frm.tot_base_box.value) - strToNum(old_base_box);
			
		totalCumPlt	-= strToNum(old_base_plt);
		totalCumBox -= strToNum(old_base_box);
		
		// 추가재고상차의 총합을 계산
		var calAddPltStr = strToNum(document.frm.tot_add_plt.value) - strToNum(old_add_plt);
		document.frm.tot_add_plt.value = fixedPoint(calAddPltStr.toString(), 2);
		document.frm.tot_add_box.value = strToNum(document.frm.tot_add_box.value) - strToNum(old_add_box);
			
		totalCumPlt	-= strToNum(old_add_plt);
		totalCumBox -= strToNum(old_add_box);
		
		// 생산상차의 총합을 계산
		var calPltStr = strToNum(document.frm.tot_prod_plt.value) - strToNum(old_prod_plt);
		document.frm.tot_prod_plt.value = fixedPoint(calPltStr.toString(), 2);
		document.frm.tot_prod_box.value = strToNum(document.frm.tot_prod_box.value) - strToNum(old_prod_box);
		
		totalCumPlt	-= strToNum(old_prod_plt);
		totalCumBox -= strToNum(old_prod_box);
		
		// 누적재고상차 총합을 계산
		document.frm.tot_cum_plt.value = fixedPoint(totalCumPlt.toString(),2);
		document.frm.tot_cum_box.value = numberFormat(totalCumBox.toString());
	}
}

//  수송일자, 입고장, 차량 순번 변경시 위, 아래 줄에 대한 누적상차집계 계산
function calPKCum(rowIndex) {
	
	var rowIdx = rowIndex;
	
	var tableLen = left_tbody.rows.length;
	var beforeTransDate = null;
	var beforeSrcLoc = null;
	var beforeTruckSeq = null;
	var afterTransDate = null;
	var afterSrcLoc = null;
	var afterTruckSeq = null;
	var cumBox = 0;			var cumPlt = 0;
	var firstCumBox = 0;	var firstCumPlt = 0;
	var c_route_class = null;
	var c_trans_date = null;
	var c_src_loc = null;
	var c_truck_seq = null;

	if(tableLen > 2){
		if(document.frm.routeClass[rowIdx]){
			c_route_class =  document.frm.routeClass[rowIdx].value;
			c_trans_date  =  document.frm.trans_date[rowIdx].value;
			c_src_loc     =  document.frm.src_loc[rowIdx].value;
			c_truck_seq   =  document.frm.truck_seq[rowIdx].value;
		}else{
			c_route_class =  document.frm.routeClass.value;
			c_trans_date  =  document.frm.trans_date.value;
			c_src_loc     =  document.frm.src_loc.value;
			c_truck_seq   =  document.frm.truck_seq.value;
		}
		//alert(c_route_class+" "+c_trans_date+" "+c_src_loc+" "+c_truck_seq);
		
		if(rowIdx == 0){ // 변경된 Row가 맨 윗 줄인경우..
			// 1. 변경된 Row와 아래 Row의 PK가 같은 경우..
			if(document.frm.routeClass[rowIdx+1].value 	== c_route_class
				&& document.frm.trans_date[rowIdx+1].value == c_trans_date
				&& document.frm.src_loc[rowIdx+1].value 	== c_src_loc 
				&& document.frm.truck_seq[rowIdx+1].value 	== c_truck_seq )	{
				
				for( var i = 0 ; i < tableLen-1 ; i++ ) {
					if( document.frm.cum_box[i] ) {
						// 출고장, 차량순번이 같은 데이터 누적 집계
						if( document.frm.routeClass[i].value 	== c_route_class
							&& document.frm.trans_date[i].value == c_trans_date
							&& document.frm.src_loc[i].value 	== c_src_loc 
							&& document.frm.truck_seq[i].value 	== c_truck_seq ) {
							cumBox += strToNum(document.frm.base_stk_box[i].value);
							cumBox += strToNum(document.frm.add_stk_box[i].value);
							cumBox += strToNum(document.frm.prod_box[i].value);
							cumPlt += strToNum(document.frm.base_stk_plt[i].value);
							cumPlt += strToNum(document.frm.add_stk_plt[i].value);
							cumPlt += strToNum(document.frm.prod_plt[i].value);
							
							document.frm.cum_box[i].value = numberFormat(cumBox);
							cumPlt = Math.round(cumPlt*1000000)/1000000;
							document.frm.cum_plt[i].value = fixedPoint(cumPlt.toString(), 2);
						}else{
							break;
						}			
					}			
				}
			}
			// 변경된 Row와 아래 Row의 PK가 다른 경우..
			else{
				// 맨위에 줄의 cumBox 값을 수정
				firstCumBox	+= strToNum(document.frm.base_stk_box[0].value);
				firstCumBox += strToNum(document.frm.add_stk_box[0].value);
				firstCumBox += strToNum(document.frm.prod_box[0].value);
				firstCumPlt += strToNum(document.frm.base_stk_plt[0].value);
				firstCumPlt += strToNum(document.frm.add_stk_plt[0].value);
				firstCumPlt += strToNum(document.frm.prod_plt[0].value);
				
				document.frm.cum_box[0].value = numberFormat(firstCumBox.toString());
				document.frm.cum_plt[0].value = fixedPoint(firstCumPlt.toString(), 2);
				
				if(document.frm.routeClass[1]){
					c_route_class =  document.frm.routeClass[1].value;
					c_trans_date  =  document.frm.trans_date[1].value;
					c_src_loc     =  document.frm.src_loc[1].value;
					c_truck_seq   =  document.frm.truck_seq[1].value;
				}else{
					c_route_class =  document.frm.routeClass.value;
					c_trans_date  =  document.frm.trans_date.value;
					c_src_loc     =  document.frm.src_loc.value;
					c_truck_seq   =  document.frm.truck_seq.value;
				}
				
				for( var i = 1 ; i < tableLen-1 ; i++ ) {
					if( document.frm.cum_box[i] ) {
						// 출고장, 차량순번이 같은 데이터 누적 집계
						if( document.frm.routeClass[i].value 	== c_route_class
							&& document.frm.trans_date[i].value == c_trans_date
							&& document.frm.src_loc[i].value 	== c_src_loc 
							&& document.frm.truck_seq[i].value 	== c_truck_seq ) {
							cumBox += strToNum(document.frm.base_stk_box[i].value);
							cumBox += strToNum(document.frm.add_stk_box[i].value);
							cumBox += strToNum(document.frm.prod_box[i].value);
							cumPlt += strToNum(document.frm.base_stk_plt[i].value);
							cumPlt += strToNum(document.frm.add_stk_plt[i].value);
							cumPlt += strToNum(document.frm.prod_plt[i].value);
							
							document.frm.cum_box[i].value = numberFormat(cumBox);
							cumPlt = Math.round(cumPlt*1000000)/1000000;
							document.frm.cum_plt[i].value = fixedPoint(cumPlt.toString(), 2);
						}else{
							break;
						}			
					}			
				}
			}
		}
		// 2. 변경된 Row가 마지막 줄인경우
		else if(rowIdx == tableLen-2){ // 변경된 Row가 마지막 줄인경우
			// 변경된 Row와 바로 위의 Row의 PK가 같은 경우..
			if(document.frm.routeClass[rowIdx-1].value 	== c_route_class
				&& document.frm.trans_date[rowIdx-1].value == c_trans_date
				&& document.frm.src_loc[rowIdx-1].value 	== c_src_loc 
				&& document.frm.truck_seq[rowIdx-1].value 	== c_truck_seq )	{
				
				cumBox = strToNum(document.frm.cum_box[rowIdx-1].value);
				cumPlt = strToNum(document.frm.cum_plt[rowIdx-1].value);
				cumBox += strToNum(document.frm.base_stk_box[rowIdx].value);
				cumBox += strToNum(document.frm.add_stk_box[rowIdx].value);
				cumBox += strToNum(document.frm.prod_box[rowIdx].value);
				cumPlt += strToNum(document.frm.base_stk_plt[rowIdx].value);
				cumPlt += strToNum(document.frm.add_stk_plt[rowIdx].value);
				cumPlt += strToNum(document.frm.prod_plt[rowIdx].value);
				
				document.frm.cum_box[rowIdx].value = numberFormat(cumBox);
				cumPlt = Math.round(cumPlt*1000000)/1000000;
				document.frm.cum_plt[rowIdx].value = fixedPoint(cumPlt.toString(), 2);
					
			}
			// 변경된 Row와 바로 위의 Row의 PK가 다른 경우..
			else{
				// 맨위에 줄의 cumBox 값을 수정
				cumBox += strToNum(document.frm.base_stk_box[rowIdx].value);
				cumBox += strToNum(document.frm.add_stk_box[rowIdx].value);
				cumBox += strToNum(document.frm.prod_box[rowIdx].value);
				cumPlt += strToNum(document.frm.base_stk_plt[rowIdx].value);
				cumPlt += strToNum(document.frm.add_stk_plt[rowIdx].value);
				cumPlt += strToNum(document.frm.prod_plt[rowIdx].value);
				
				document.frm.cum_box[rowIdx].value = numberFormat(cumBox);
				cumPlt = Math.round(cumPlt*1000000)/1000000;
				document.frm.cum_plt[rowIdx].value = fixedPoint(cumPlt.toString(), 2);
			}
		}
		// 3. 중간에 Row가 수정된 경우..
		else{
			cumBox = 0; cumPlt = 0;
			// 변경된 Row와 바로 위의 Row의 PK가 같은 경우..
			if(document.frm.routeClass[rowIdx-1].value 	== c_route_class
				&& document.frm.trans_date[rowIdx-1].value == c_trans_date
				&& document.frm.src_loc[rowIdx-1].value 	== c_src_loc 
				&& document.frm.truck_seq[rowIdx-1].value 	== c_truck_seq )	{
				
				cumBox = strToNum(document.frm.cum_box[rowIdx-1].value);
				cumPlt = strToNum(document.frm.cum_plt[rowIdx-1].value);
				cumBox += strToNum(document.frm.base_stk_box[rowIdx].value);
				cumBox += strToNum(document.frm.add_stk_box[rowIdx].value);
				cumBox += strToNum(document.frm.prod_box[rowIdx].value);
				cumPlt += strToNum(document.frm.base_stk_plt[rowIdx].value);
				cumPlt += strToNum(document.frm.add_stk_plt[rowIdx].value);
				cumPlt += strToNum(document.frm.prod_plt[rowIdx].value);
				
				document.frm.cum_box[rowIdx].value = numberFormat(cumBox);
				cumPlt = Math.round(cumPlt*1000000)/1000000;
				document.frm.cum_plt[rowIdx].value = fixedPoint(cumPlt.toString(), 2);
			}
			// 변경된 Row와 바로 위의 Row의 PK가 다른 경우..
			else{
				// 맨위에 줄의 cumBox 값을 수정
				cumBox += strToNum(document.frm.base_stk_box[rowIdx].value);
				cumBox += strToNum(document.frm.add_stk_box[rowIdx].value);
				cumBox += strToNum(document.frm.prod_box[rowIdx].value);
				cumPlt += strToNum(document.frm.base_stk_plt[rowIdx].value);
				cumPlt += strToNum(document.frm.add_stk_plt[rowIdx].value);
				cumPlt += strToNum(document.frm.prod_plt[rowIdx].value);
				
				document.frm.cum_box[rowIdx].value = numberFormat(cumBox);
				cumPlt = Math.round(cumPlt*1000000)/1000000;
				document.frm.cum_plt[rowIdx].value = fixedPoint(cumPlt.toString(), 2);
			}
			
			cumBox = 0; cumPlt = 0;
			// 변경된 Row와 아래 Row의 PK가 같은 경우..
			if(document.frm.routeClass[rowIdx+1].value 	== c_route_class
				&& document.frm.trans_date[rowIdx+1].value == c_trans_date
				&& document.frm.src_loc[rowIdx+1].value 	== c_src_loc 
				&& document.frm.truck_seq[rowIdx+1].value 	== c_truck_seq )	{
				
				cumBox = strToNum(document.frm.cum_box[rowIdx].value);
				cumPlt = strToNum(document.frm.cum_plt[rowIdx].value);
				
				for( var i = rowIdx+1 ; i < tableLen-1 ; i++ ) {
					if( document.frm.cum_box[i] ) {
						// 출고장, 차량순번이 같은 데이터 누적 집계
						if( document.frm.routeClass[i].value 	== c_route_class
							&& document.frm.trans_date[i].value == c_trans_date
							&& document.frm.src_loc[i].value 	== c_src_loc 
							&& document.frm.truck_seq[i].value 	== c_truck_seq ) {
							cumBox += strToNum(document.frm.base_stk_box[i].value);
							cumBox += strToNum(document.frm.add_stk_box[i].value);
							cumBox += strToNum(document.frm.prod_box[i].value);
							cumPlt += strToNum(document.frm.base_stk_plt[i].value);
							cumPlt += strToNum(document.frm.add_stk_plt[i].value);
							cumPlt += strToNum(document.frm.prod_plt[i].value);
							
							document.frm.cum_box[i].value = numberFormat(cumBox);
							cumPlt = Math.round(cumPlt*1000000)/1000000;
							document.frm.cum_plt[i].value = fixedPoint(cumPlt.toString(), 2);
						}else{
							break;
						}			
					}			
				}
			}
			// 변경된 Row와 아래 Row의 PK가 다른 경우..
			else{
				
				cumBox = 0;
				cumPlt = 0;
				
				if(document.frm.routeClass[rowIdx+1]){
					c_route_class =  document.frm.routeClass[rowIdx+1].value;
					c_trans_date  =  document.frm.trans_date[rowIdx+1].value;
					c_src_loc     =  document.frm.src_loc[rowIdx+1].value;
					c_truck_seq   =  document.frm.truck_seq[rowIdx+1].value;
				}else{
					c_route_class =  document.frm.routeClass.value;
					c_trans_date  =  document.frm.trans_date.value;
					c_src_loc     =  document.frm.src_loc.value;
					c_truck_seq   =  document.frm.truck_seq.value;
				}
				
				for( var i = rowIdx+1 ; i < tableLen-1 ; i++ ) {
					if( document.frm.cum_box[i] ) {
						// 출고장, 차량순번이 같은 데이터 누적 집계
						if( document.frm.routeClass[i].value 	== c_route_class
							&& document.frm.trans_date[i].value == c_trans_date
							&& document.frm.src_loc[i].value 	== c_src_loc 
							&& document.frm.truck_seq[i].value 	== c_truck_seq ) {
							cumBox += strToNum(document.frm.base_stk_box[i].value);
							cumBox += strToNum(document.frm.add_stk_box[i].value);
							cumBox += strToNum(document.frm.prod_box[i].value);
							cumPlt += strToNum(document.frm.base_stk_plt[i].value);
							cumPlt += strToNum(document.frm.add_stk_plt[i].value);
							cumPlt += strToNum(document.frm.prod_plt[i].value);
							
							document.frm.cum_box[i].value = numberFormat(cumBox);
							cumPlt = Math.round(cumPlt*1000000)/1000000;
							document.frm.cum_plt[i].value = fixedPoint(cumPlt.toString(), 2);
						}else{
							break;
						}			
					}			
				}
			}
		}
	}
	// 차량 구분 색깔 메소드 호출.
	setLastPltColor();
}

// 3. 모든 Row의 누적을 다시 구하는 메소드
function allCalCum() {
	var tableLen = left_tbody.rows.length;
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var check_color = 0;

	// Row 수가 2이상인 경우.
	if(tableLen >= 2){
		
		for( var i = 0 ; i < tableLen-1 ; i++ ) {
			if( document.frm.cum_box[i] ) {
				
				//alert(preTransDate+" "+preSrcLoc+" "+preTruckSeq);
				// 출고장, 차량순번이 같은 데이터 누적 집계
				if( document.frm.trans_date[i].value == preTransDate
					&& document.frm.src_loc[i].value == preSrcLoc 
					&& document.frm.truck_seq[i].value == preTruckSeq ) {
					
					/************** 누적 계산 부분 ***************/
					cumBox += strToNum(document.frm.base_stk_box[i].value);
					cumBox += strToNum(document.frm.add_stk_box[i].value);
					cumBox += strToNum(document.frm.prod_box[i].value);
					cumPlt += strToNum(document.frm.base_stk_plt[i].value);
					cumPlt += strToNum(document.frm.add_stk_plt[i].value);
					cumPlt += strToNum(document.frm.prod_plt[i].value);
					
					document.frm.cum_box[i].value = numberFormat(cumBox.toString());
					cumPlt = Math.round(cumPlt*1000000)/1000000;
					document.frm.cum_plt[i].value = fixedPoint(cumPlt.toString(),2);
					
				}else{
					/************** 누적 계산 부분 ***************/
					cumBox = strToNum(document.frm.base_stk_box[i].value);
					cumBox += strToNum(document.frm.add_stk_box[i].value);
					cumBox += strToNum(document.frm.prod_box[i].value);
					cumPlt = strToNum(document.frm.base_stk_plt[i].value);
					cumPlt += strToNum(document.frm.add_stk_plt[i].value);
					cumPlt += strToNum(document.frm.prod_plt[i].value);
					
					document.frm.cum_box[i].value = numberFormat(cumBox.toString());
					cumPlt = Math.round(cumPlt*1000000)/1000000;
					document.frm.cum_plt[i].value = fixedPoint(cumPlt.toString(),2);
				}
				if(i == clickedLineIdx){
					left_tbody.rows[i].style.backgroundColor = "#8de88d";
					main_tbody.rows[i].style.backgroundColor = "#8de88d";
				}
				preTransDate = document.frm.trans_date[i].value;
				preSrcLoc = document.frm.src_loc[i].value;
				preTruckSeq = document.frm.truck_seq[i].value;
			}
		}	
	}
}

/**************************************************************************************************/

// 한차의 맨 마지막 누적값을 색을 파란색으로 변경하는 function
function setLastPltColor(){
	var tableLen = left_tbody.rows.length;
	var lastPltRow = 0;
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	
	if(tableLen <= 1){
		return;
	}
	if(tableLen == 2){ // 합계뿐이거나, Row가 한개일때는 합차 무시
		if(document.frm.cum_plt[0]){
			document.frm.cum_plt[0].style.color = "RED";
			document.frm.cum_box[0].style.color = "RED";
		}else{
			document.frm.cum_plt.style.color = "RED";
			document.frm.cum_box.style.color = "RED";
		}
		return;
	}
	// Row 수가 2이상인 경우.
	if(tableLen > 2){
		
		for( var i = 0 ; i < tableLen-1 ; i++ ) {
			if( document.frm.cum_box[i] ) {
				if(i == tableLen-2){
					document.frm.cum_plt[i].style.color = "RED";
					document.frm.cum_box[i].style.color = "RED";
				}else{
					// 출고장, 차량순번이 같은 데이터 누적 집계
					if( document.frm.trans_date[i].value == document.frm.trans_date[i+1].value
						&& document.frm.src_loc[i].value == document.frm.src_loc[i+1].value 
						&& document.frm.truck_seq[i].value == document.frm.truck_seq[i+1].value ) {
						
						if(document.frm.cum_plt[i].style.color == "red"){
							document.frm.cum_plt[i].style.color = "BLACK";
							document.frm.cum_box[i].style.color = "BLACK";
							
							divRowNo[i].parentNode.style.borderBottom	= "1 solid #e6dee6";
							document.frm.check_flag[i].parentNode.style.borderBottom   = "1 solid #e6dee6";
							document.frm.btnAddRow[i].parentNode.style.borderBottom    = "1 solid #e6dee6";
							document.frm.routeClass[i].parentNode.style.borderBottom   = "1 solid #e6dee6";
							document.frm.trans_date[i].parentNode.style.borderBottom   = "1 solid #e6dee6";
							document.frm.src_loc[i].parentNode.style.borderBottom      = "1 solid #e6dee6";
							document.frm.truck_seq[i].parentNode.style.borderBottom    = "1 solid #e6dee6";
							document.frm.item_id[i].parentNode.parentNode.style.borderBottom      = "1 solid #e6dee6";
							document.frm.item_name[i].parentNode.style.borderBottom    = "1 solid #e6dee6";					
							document.frm.cum_plt[i].parentNode.style.borderBottom      = "1 solid #e6dee6";
							document.frm.cum_box[i].parentNode.style.borderBottom      = "1 solid #e6dee6";
							document.frm.base_stk_plt[i].parentNode.style.borderBottom = "1 solid #e6dee6";
							document.frm.base_stk_box[i].parentNode.style.borderBottom = "1 solid #e6dee6";
							document.frm.add_stk_plt[i].parentNode.style.borderBottom  = "1 solid #e6dee6";
							document.frm.add_stk_box[i].parentNode.style.borderBottom  = "1 solid #e6dee6";
							document.frm.prod_plt[i].parentNode.style.borderBottom     = "1 solid #e6dee6";
							document.frm.prod_box[i].parentNode.style.borderBottom     = "1 solid #e6dee6";	
						}
					}else{
						//alert(preTransDate+" "+preSrcLoc+" "+preTruckSeq);
						document.frm.cum_plt[i].style.color = "RED";
						document.frm.cum_box[i].style.color = "RED";
						
						//left_tbody.rows[i].style.borderBottom = "thick solid blue";
						
						divRowNo[i].parentNode.style.borderBottom	= "2 solid #9e83d0";
						document.frm.check_flag[i].parentNode.style.borderBottom   = "2 solid #9e83d0";
						document.frm.btnAddRow[i].parentNode.style.borderBottom    = "2 solid #9e83d0";
						document.frm.routeClass[i].parentNode.style.borderBottom   = "2 solid #9e83d0";
						document.frm.trans_date[i].parentNode.style.borderBottom   = "2 solid #9e83d0";
						document.frm.src_loc[i].parentNode.style.borderBottom      = "2 solid #9e83d0";
						document.frm.truck_seq[i].parentNode.style.borderBottom    = "2 solid #9e83d0";
						document.frm.item_id[i].parentNode.parentNode.style.borderBottom      = "2 solid #9e83d0";
						document.frm.item_name[i].parentNode.style.borderBottom    = "2 solid #9e83d0";					
						document.frm.cum_plt[i].parentNode.style.borderBottom      = "2 solid #9e83d0";
						document.frm.cum_box[i].parentNode.style.borderBottom      = "2 solid #9e83d0";
						document.frm.base_stk_plt[i].parentNode.style.borderBottom = "2 solid #9e83d0";
						document.frm.base_stk_box[i].parentNode.style.borderBottom = "2 solid #9e83d0";
						document.frm.add_stk_plt[i].parentNode.style.borderBottom  = "2 solid #9e83d0";
						document.frm.add_stk_box[i].parentNode.style.borderBottom  = "2 solid #9e83d0";
						document.frm.prod_plt[i].parentNode.style.borderBottom     = "2 solid #9e83d0";
						document.frm.prod_box[i].parentNode.style.borderBottom     = "2 solid #9e83d0";
						
					} // end if
				} // end if
			} // end for
		}	
	}
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#d0b8f1" &&
			left_tbody.rows[rowIdx].style.backgroundColor != "#8de88d" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#aaaaaa"; 
		//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		main_tbody.rows[rowIdx].style.backgroundColor = "#aaaaaa"; 
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

/* Old Version -> 나중에 화면 제대로 나오면 이버전으로 복구해야함.(이벤트도 수정해야함.)
// 테이블 라인 클릭시 클릭한 라인 표시
function clickLine(objTd) {
	
	
	var rowIdx = objTd.parentNode.rowIndex;
	if( document.frm.trans_date[rowIdx] ) {
		
		if( rowIdx == clickedLineIdx ) {
			left_tbody.rows[rowIdx].style.backgroundColor = lineColor[rowIdx];
			main_tbody.rows[rowIdx].style.backgroundColor = lineColor[rowIdx];
			clickedLineIdx = null;
		}
		else {
			gridBLeft.document.frm.version.value 	= document.frm.version.value;
			gridBLeft.document.frm.seq.value 		= document.frm.seq.value;
			gridBLeft.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
			gridBLeft.document.frm.plan_type.value 	= document.frm.plan_type.value;
			gridBLeft.document.frm.trans_date.value = document.frm.trans_date[rowIdx].value;
			gridBLeft.document.frm.item_id.value 	= document.frm.item_id[rowIdx].value;
			gridBRight.document.frm.version.value 	= document.frm.version.value;
			gridBRight.document.frm.seq.value 		= document.frm.seq.value;
			gridBRight.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
			gridBRight.document.frm.plan_type.value = document.frm.plan_type.value;
			gridBRight.document.frm.trans_date.value = document.frm.trans_date[rowIdx].value;
			gridBRight.document.frm.src_loc.value 	= document.frm.src_loc[rowIdx].value;
			gridBRight.document.frm.item_id.value 	= document.frm.item_id[rowIdx].value;
			refreshFrame();
			if( clickedLineIdx != null ) {
				left_tbody.rows[clickedLineIdx].style.backgroundColor = lineColor[clickedLineIdx];
				main_tbody.rows[clickedLineIdx].style.backgroundColor = lineColor[clickedLineIdx];
			}			
			left_tbody.rows[rowIdx].style.backgroundColor = "#8de88d";
			main_tbody.rows[rowIdx].style.backgroundColor = "#8de88d";
			
			clickedLineIdx = rowIdx;
		}
	} 
	else {
		if( rowIdx == clickedLineIdx ) {

			left_tbody.rows[0].style.backgroundColor = lineColor[clickedLineIdx];
			main_tbody.rows[0].style.backgroundColor = lineColor[clickedLineIdx];
			clickedLineIdx = null;
		}
		else {
			gridBLeft.document.frm.version.value 	= document.frm.version.value;
			gridBLeft.document.frm.seq.value 		= document.frm.seq.value;
			gridBLeft.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
			gridBLeft.document.frm.plan_type.value 	= document.frm.plan_type.value;
			gridBLeft.document.frm.trans_date.value = document.frm.trans_date.value;
			gridBLeft.document.frm.item_id.value 	= document.frm.item_id.value;
			gridBRight.document.frm.version.value 	= document.frm.version.value;
			gridBRight.document.frm.seq.value 		= document.frm.seq.value;
			gridBRight.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
			gridBRight.document.frm.plan_type.value = document.frm.plan_type.value;
			gridBRight.document.frm.trans_date.value = document.frm.trans_date.value;
			gridBRight.document.frm.item_id.value 	= document.frm.item_id.value;
			refreshFrame();
			left_tbody.rows[0].style.backgroundColor = "#8de88d";
			main_tbody.rows[0].style.backgroundColor = "#8de88d";
			clickedLineIdx = rowIdx;
		}
	}
}*/

// 테이블 라인 클릭시 클릭한 라인 표시
function clickLine(objTd, flag) {
	
	if(flag == 1){	// 조회 버튼을 클릭한 경우..
		if(clickedLineIdx == "" || clickedLineIdx == null){
			if(clickedLineIdx != 0){
				alert("먼저 조회할 Row를 선택하여 주십시요.");
				return;
			}
		}
		var rowIdx = objTd.parentNode.rowIndex;
		if( document.frm.trans_date[clickedLineIdx] ) {
			
			gridBLeft.document.frm.version.value 	= document.frm.version.value;
			gridBLeft.document.frm.seq.value 		= document.frm.seq.value;
			gridBLeft.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
			gridBLeft.document.frm.plan_type.value 	= document.frm.plan_type.value;
			gridBLeft.document.frm.trans_date.value = document.frm.trans_date[clickedLineIdx].value;
			gridBLeft.document.frm.item_id.value 	= document.frm.item_id[clickedLineIdx].value;
			gridBLeft.document.frm.sale_yyyy.value 		= document.frm.sale_yyyy.value;
			gridBLeft.document.frm.sale_version.value 	= document.frm.sale_version.value;
			gridBLeft.document.frm.sale_seq.value 		= document.frm.sale_seq.value;
			gridBLeft.document.frm.nfos_if_dttm.value 	= document.frm.nfos_if_dttm.value;
			gridBRight.document.frm.version.value 	= document.frm.version.value;
			gridBRight.document.frm.seq.value 		= document.frm.seq.value;
			gridBRight.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
			gridBRight.document.frm.plan_type.value = document.frm.plan_type.value;
			gridBRight.document.frm.trans_date.value = document.frm.trans_date[clickedLineIdx].value;
			// 처음 출고장이 선택되어 있지 않은 경우에만 아래와 같이 처리. 
			if(document.frm.src_loc_sel.value == null || document.frm.src_loc_sel.value == ""){
				document.frm.src_loc_sel.value = document.frm.src_loc[clickedLineIdx].value;
			}
			gridBRight.document.frm.src_loc.value 	= document.frm.src_loc_sel.value;
			gridBRight.document.frm.item_id.value 	= document.frm.item_id[clickedLineIdx].value;
			refreshFrame();
		} 
		else {
			gridBLeft.document.frm.version.value 	= document.frm.version.value;
			gridBLeft.document.frm.seq.value 		= document.frm.seq.value;
			gridBLeft.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
			gridBLeft.document.frm.plan_type.value 	= document.frm.plan_type.value;
			gridBLeft.document.frm.trans_date.value = document.frm.trans_date.value;
			gridBLeft.document.frm.item_id.value 	= document.frm.item_id.value;
			gridBLeft.document.frm.sale_yyyy.value 		= document.frm.sale_yyyy.value;
			gridBLeft.document.frm.sale_version.value 	= document.frm.sale_version.value;
			gridBLeft.document.frm.sale_seq.value 		= document.frm.sale_seq.value;
			gridBLeft.document.frm.nfos_if_dttm.value 	= document.frm.nfos_if_dttm.value;
			gridBRight.document.frm.version.value 	= document.frm.version.value;
			gridBRight.document.frm.seq.value 		= document.frm.seq.value;
			gridBRight.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
			gridBRight.document.frm.plan_type.value = document.frm.plan_type.value;
			gridBRight.document.frm.trans_date.value = document.frm.trans_date.value;
			if(document.frm.src_loc_sel.value == null || document.frm.src_loc_sel.value == ""){
				document.frm.src_loc_sel.value = document.frm.src_loc.value;
			}
			gridBRight.document.frm.src_loc.value 	= document.frm.src_loc_sel.value;
			gridBRight.document.frm.item_id.value 	= document.frm.item_id.value;
			
			refreshFrame();
		}
	}else if(flag == 2){ //번호를 클릭한 경우..
		var rowIdx = objTd.parentNode.rowIndex;
		if( document.frm.trans_date[rowIdx] ) {
			
			if( rowIdx == clickedLineIdx ) {
				left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
				main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
				clickedLineIdx = null;
			}
			else {
				/*gridBLeft.document.frm.version.value 	= document.frm.version.value;
				gridBLeft.document.frm.seq.value 		= document.frm.seq.value;
				gridBLeft.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
				gridBLeft.document.frm.plan_type.value 	= document.frm.plan_type.value;
				gridBLeft.document.frm.trans_date.value = document.frm.trans_date[rowIdx].value;
				gridBLeft.document.frm.item_id.value 	= document.frm.item_id[rowIdx].value;
				gridBRight.document.frm.version.value 	= document.frm.version.value;
				gridBRight.document.frm.seq.value 		= document.frm.seq.value;
				gridBRight.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
				gridBRight.document.frm.plan_type.value = document.frm.plan_type.value;
				gridBRight.document.frm.trans_date.value = document.frm.trans_date[rowIdx].value;
				gridBRight.document.frm.src_loc.value 	= document.frm.src_loc[rowIdx].value;
				gridBRight.document.frm.item_id.value 	= document.frm.item_id[rowIdx].value;
				refreshFrame();*/
				if( clickedLineIdx != null ) {
					left_tbody.rows[clickedLineIdx].style.backgroundColor = "#ffffff";
					main_tbody.rows[clickedLineIdx].style.backgroundColor = "#ffffff";
				}			
				left_tbody.rows[rowIdx].style.backgroundColor = "#8de88d";
				main_tbody.rows[rowIdx].style.backgroundColor = "#8de88d";
				
				clickedLineIdx = rowIdx;
			}
		} 
		else {
			if( rowIdx == clickedLineIdx ) {
	
				left_tbody.rows[0].style.backgroundColor = "#ffffff";
				main_tbody.rows[0].style.backgroundColor = "#ffffff";
				clickedLineIdx = null;
			}
			else {
				/*gridBLeft.document.frm.version.value 	= document.frm.version.value;
				gridBLeft.document.frm.seq.value 		= document.frm.seq.value;
				gridBLeft.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
				gridBLeft.document.frm.plan_type.value 	= document.frm.plan_type.value;
				gridBLeft.document.frm.trans_date.value = document.frm.trans_date.value;
				gridBLeft.document.frm.item_id.value 	= document.frm.item_id.value;
				gridBRight.document.frm.version.value 	= document.frm.version.value;
				gridBRight.document.frm.seq.value 		= document.frm.seq.value;
				gridBRight.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
				gridBRight.document.frm.plan_type.value = document.frm.plan_type.value;
				gridBRight.document.frm.trans_date.value = document.frm.trans_date.value;
				gridBRight.document.frm.item_id.value 	= document.frm.item_id.value;
				refreshFrame();*/
				left_tbody.rows[0].style.backgroundColor = "#8de88d";
				main_tbody.rows[0].style.backgroundColor = "#8de88d";
				clickedLineIdx = rowIdx;
			}
		}
	}
	
}

// iframe 영역 refresh
function refreshFrame() {
	
	// 판매정보영역 refresh
	gridBLeft.GoSearch("rp_01010_dailyTransportPlanSalesInfo_list");
	
	// 공장예상재고영역 refresh
	gridBRight.GoSearch("rp_01010_dailyTransportPlanStockInfo_list");
	
}

// iframe 영역 refresh
function refreshStockFrame() {
	
	if( document.frm.trans_date[clickedLineIdx] ) {
		
		gridBRight.document.frm.version.value 	= document.frm.version.value;
		gridBRight.document.frm.seq.value 		= document.frm.seq.value;
		gridBRight.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
		gridBRight.document.frm.plan_type.value = document.frm.plan_type.value;
		gridBRight.document.frm.trans_date.value = document.frm.trans_date[clickedLineIdx].value;
		gridBRight.document.frm.src_loc.value 	= document.frm.src_loc_sel.value;
		gridBRight.document.frm.item_id.value 	= document.frm.item_id[clickedLineIdx].value;
	} 
	else {
		gridBRight.document.frm.version.value 	= document.frm.version.value;
		gridBRight.document.frm.seq.value 		= document.frm.seq.value;
		gridBRight.document.frm.tgt_loc.value 	= document.frm.tgt_loc.value;
		gridBRight.document.frm.plan_type.value = document.frm.plan_type.value;
		gridBRight.document.frm.trans_date.value = document.frm.trans_date.value;
		gridBRight.document.frm.src_loc.value 	= document.frm.src_loc_sel.value;
		gridBRight.document.frm.item_id.value 	= document.frm.item_id.value;
	}

	// 공장예상재고영역 refresh
	gridBRight.GoSearch("rp_01010_dailyTransportPlanStockInfo_list");
	
}


/**************************************************************************************************
 **************************************** ADD ROW 함수(한줄 추가)************************************
 **************************************************************************************************/

// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRow( objBtn ) {
	
	// 버전을 선택하여 데이터를 조회한 상태가 아니면, row 추가 불가
	if( document.frm.version.value == "" || document.frm.version.value == null ) {
		alert("버전을 선택하여 데이터를 조회한 후, 데이터 추가가 가능합니다.");
		return;
	}
	
	//if( objBtn.parentNode ) {
	if( objBtn.parentNode.tagName == "TD"  ) {
		var insertRowIndex = objBtn.parentNode.parentNode.rowIndex;
		insertRowIndex = insertRowIndex + 1;
	}
	else {
		var insertRowIndex = 0;
	}
	
	// ====================================== //
	// index를 바탕으로 Row를 추가하는 method 호출
	
	addRowByIndex(insertRowIndex);
			
	// ====================================== //
	var line_color = null;
	if(document.frm.hidden_color[insertRowIndex-1]){
		if(document.frm.hidden_color[insertRowIndex-1].value == "N" ||
			document.frm.hidden_color[insertRowIndex-1].value == null)
			line_color = "#ffffff";
		else
			line_color = "#d0b8f1";
	}
	else{
		if(document.frm.hidden_color.value == "N" ||
			document.frm.hidden_color.value == null)
			line_color = "#ffffff";
		else
			line_color = "#d0b8f1";
	}	
	
	if( objBtn.parentNode.tagName == "TD"  ) {
		memCheckRow(insertRowIndex-1);		// Row 추가시 위에 Row의 값을 그대로 넣어 주기 위해서.
		setParentValueRow(insertRowIndex, '', '');
	}
	
	// 현재 추가되는 Row로 차의 마지막 Row 인경우, 차 구분 및 누적을 다시 계산함.
	if(document.frm.cum_box[insertRowIndex-1]){
		if(document.frm.cum_box[insertRowIndex-1].style.color == "red"){
			allCalCum();
			setLastPltColor();
		}
	}else{
		if(document.frm.cum_box.style.color == "red"){
			allCalCum();
			setLastPltColor();
		}
	}
}

// check 박스인 경우 row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRowByIndex(rowIndex) {
	
	var oRowLeft = left_tbody.insertRow(rowIndex);
	var oRowMain = main_tbody.insertRow(rowIndex);
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout  = function() { bgOut(this); }; 
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout  = function() { bgOut(this); }; 
	oRowMain.height = 22;
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 선택
	var oCell2 = oRowLeft.insertCell(); // 삭제
	var oCell3 = oRowLeft.insertCell(); // RTE 구분
	var oCell4 = oRowLeft.insertCell(); // 수송일자
	var oCell5 = oRowLeft.insertCell(); // 출고장
	var oCell6 = oRowLeft.insertCell(); // 차량순번
	var oCell7  = oRowLeft.insertCell(); // 제품코드
	var oCell8  = oRowLeft.insertCell(); // 제품명
	
	var oCell9  = oRowMain.insertCell(); // 누적상차집계 PLT 
	var oCell10 = oRowMain.insertCell(); // 누적상차집계 BOX 
	var oCell11 = oRowMain.insertCell(); // 기본재고상차 PLT
	var oCell12 = oRowMain.insertCell(); // 기본재고상차 BOX
	var oCell13 = oRowMain.insertCell(); // 추가재고상차 PLT
	var oCell14 = oRowMain.insertCell(); // 추가재고상차 BOX
	var oCell15 = oRowMain.insertCell(); // 생산상차 PLT
	var oCell16 = oRowMain.insertCell(); // 생산상차 BOX
	
	oCell4.onclick = function() { setEditMode(this); }; // 수송일자
	oCell5.onclick = function() { setEditMode(this); }; // 출고장
	oCell7.onclick  = function() { setEditMode(this); }; // 제품코드
	
	oCell8.style.borderRight  = "solid"; // 제품명
	oCell10.style.borderRight = "solid"; // 누적상차집계 BOX 
	oCell12.style.borderRight = "solid"; // 기본재고상차 BOX
	oCell14.style.borderRight = "solid"; // 추가재고상차 BOX
	
	oCell0.align = "center"; oCell0.width = "30px" ; // 번호
	oCell1.align = "center"; oCell1.width = "40px" ; // 선택
	oCell2.align = "center"; oCell2.width = "40px" ; // 삭제
	oCell3.align = "center"; oCell3.width = "30px" ; // RTE 구분
	oCell4.align = "center"; oCell4.width = "95px" ; // 수송일자
	oCell5.align = "left";   oCell5.width = "90px"; // 출고장
	oCell6.align = "center"; oCell6.width = "50px" ; // 차량순번	
	oCell7.align  = "center"; oCell7.width  = "100px"; // 제품코드
	oCell8.align  = "left";   oCell8.width  = "150px"; // 제품명
	
	oCell9.align  = "right";  oCell9.width  = "50px" ; // 누적상차집계 PLT 
	oCell10.align  = "right"; oCell10.width = "50px" ; // 누적상차집계 BOX 
	oCell11.align = "right";  oCell11.width = "50px" ; // 기본재고상차 PLT
	oCell12.align = "right";  oCell12.width = "50px" ; // 기본재고상차 BOX
	oCell13.align = "right";  oCell13.width = "50px" ; // 추가재고상차 PLT
	oCell14.align = "right";  oCell14.width = "50px" ; // 추가재고상차 BOX
	oCell15.align = "right";  oCell15.width = "50px" ; // 생산상차 PLT
	oCell16.align = "right";  oCell16.width = "50px" ; oCell16.className = "right"; // 생산상차 BOX
	
	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	oCell0.onclick = function() { clickLine(this,2); };
	// 선택
	oCell1.innerHTML = "<input type=\"checkbox\" name=\"check_flag\" value=\"\" class=\"normal\" "
						+ "style=\"text-align:center; border-width:0; \" onKeyDown=\"moveNextBox(this); \"></input>";
	// 삭제
	oCell2.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this);  \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"is_calCum\" type=\"hidden\" value=\"N\"> "
						+ "<input name=\"hidden_color\" type=\"hidden\" value=\"N\">";
	// RTE 구분
	oCell3.innerHTML = "<a id=\"divRteClass\"></a><input type=\"hidden\" name=\"routeClass\">"
	                    + "<input type=\"hidden\" name=\"old_date\">";
	// 수송일자
	oCell4.innerHTML = "<a id=\"divTransDate\"></a><input type=\"hidden\" name=\"trans_date\" value=\"\">";
	// 출고장
	oCell5.innerHTML = "<a id=\"divSrcLoc\"></a><select name=\"src_loc\" style=\"width:90px; display:none; \" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "onChange=\"getBoxPerPalet(this); calPKCum(this.parentNode.parentNode.rowIndex);\">"
						+ document.frm.src_loc_sel_str.value + "</select>";
	// 차량순번
	oCell6.innerHTML = "<input type=\"text\" name=\"truck_seq\" class=\"normal\" size=\"40\" "
						+ "onKeyDown=\"moveNextBox(this); \" onDblClick=\"this.select(); \""
						+ "onChange=\"calPKCum(this.parentNode.parentNode.rowIndex);\" "
						+ "style=\"width:100%; text-align:center; \">";
	
	// 제품코드
	oCell7.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemInput\" style=\"display:none; \"><input type=\"text\" "
						+ "name=\"item_id\" class=\"normal\" size=\"100\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "onChange=\"getBoxPerPalet(this); getItemInfo(this); \" "
						+ "style=\"width:65px; padding-left:5px; \"><img name=\"imgItemId\" tabindex=\"-1\" "
						+ "src=\"sinc/template/basic/skin/nongshim/images/common/icon_search.gif\" align=\"absmiddle\" "
						+ "border=\"0\" onClick=\"openItemSearchPop(this); \" style=\"cursor:pointer; \" "
						+ "onMouseOver=\"overImg(this); \" onMouseOut=\"outImg(this); \"></a>";
	// 제품명
	oCell8.innerHTML = "<a id=\"divItemName\"></a><input type=\"hidden\" name=\"item_name\">";
	// 누적상차집계 PLT
	oCell9.innerHTML = "<input type=\"text\" name=\"cum_plt\" class=\"normal\" value=\"0.00\" " 
						+ "style=\"border-width:0px; text-align:right; width:45px;\" readonly>";
	// 누적상차집계 BOX
	oCell10.innerHTML = "<input type=\"text\" name=\"cum_box\" class=\"normal\" value=\"0\" " 
						+ "style=\"border-width:0px; text-align:right; width:45px;\" readonly>";
	// 기본재고상차 PLT
	oCell11.innerHTML = "<input type=\"text\" name=\"base_stk_plt\" class=\"normal\" size=\"20\" value=\"0.00\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
					    + "onChange=\"onChangeCheck(this);\" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// 기본재고상차 BOX
	oCell12.innerHTML = "<input type=\"text\" name=\"base_stk_box\" class=\"normal\" size=\"20\" value=\"0\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this); \" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// 추가재고상차 PLT
	oCell13.innerHTML = "<input type=\"text\" name=\"add_stk_plt\" class=\"normal\" size=\"20\" value=\"0.00\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this);\" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// 추가재고상차 BOX
	oCell14.innerHTML = "<input type=\"text\" name=\"add_stk_box\" class=\"normal\" size=\"20\" value=\"0\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this); \" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// 생산상차 PLT
	oCell15.innerHTML = "<input type=\"text\" name=\"prod_plt\" class=\"normal\" size=\"20\" value=\"0.00\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this);\" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// 생산상차 BOX
	oCell16.innerHTML = "<input type=\"text\" name=\"prod_box\" class=\"normal\" size=\"20\" value=\"0\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this);\" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	
	
	document.recalc();
	setRowNo();
	
}

/**************************************************************************************************/

// 번호 setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	areaTot.innerHTML = tableLen-1;
	
	var clickedFlag = false; // 체크한 라인이 있는지 여부
	
	for( var i = 0 ; i < tableLen-1 ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
			// 체크가 되어있는 라인이면 clickedLineIdx 설정
			if( left_tbody.rows[i].style.backgroundColor == "#8de88d" ) {
				clickedLineIdx = i;
				clickedFlag = true;
			}
		}
		else {
			divRowNo.innerHTML = "1";
			// 체크가 되어있는 라인이면 clickedLineIdx 설정
			if( left_tbody.rows[0].style.backgroundColor == "#8de88d" ) {
				clickedLineIdx = 1;
				clickedFlag = true;
			}
		}
		if(tableLen == 1){
			divRowNo.innerHTML = "0";
		}
	}
	
	// 체크되어 있는 라인이 없으면 clickedLineIdx = null
	if( !clickedFlag ) {
		clickedLineIdx = null;
	}
	
}


var old_base_plt = 0;
var old_base_box = 0;
var old_add_plt = 0;
var old_add_box = 0;
var old_prod_plt = 0;
var old_prod_box = 0;

// row 삭제 
// parameter : button object
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	var preTransDate = null;
	var preSrcLoc    = null;
    var preTruckSeq  = null;
	
	
	if(tableLen == 2){
		delRowDo( delRowIdx );
		var delCum = 0;
		document.frm.tot_base_plt.value  =  fixedPoint(delCum.toString(), 2);
		document.frm.tot_base_box.value  =  delCum;
		document.frm.tot_add_plt.value   =  fixedPoint(delCum.toString(), 2);
		document.frm.tot_add_box.value   =  delCum;
		document.frm.tot_prod_plt.value  =  fixedPoint(delCum.toString(), 2);
		document.frm.tot_prod_box.value  =  delCum;
		document.frm.tot_cum_plt.value   =  fixedPoint(delCum.toString(),2);
		document.frm.tot_cum_box.value   =  delCum;
	}
	else if( tableLen > 2 )
	{		
		// 삭제되는 Row가 Check 되어 있는 상태면 Check 된 모든 Row를 삭제
		if(document.frm.check_flag[delRowIdx].checked){
			
			old_base_plt = document.frm.base_stk_plt[delRowIdx].value;
			old_base_box = document.frm.base_stk_box[delRowIdx].value;
			old_add_plt = document.frm.add_stk_plt[delRowIdx].value;
			old_add_box = document.frm.add_stk_box[delRowIdx].value;
			old_prod_plt = document.frm.prod_plt[delRowIdx].value;
			old_prod_box = document.frm.prod_box[delRowIdx].value;
			
			delRowDo( delRowIdx );  			// 먼저 선택한 Row 삭제
			
			caldelCum(delRowIdx);
			tableLen --;						// 이미 Row 하나가 삭제 되었으므로, 전체 Row의 수를 1 감소 시킨다.
			
			//alert("start");
			// 선택한 Row를 제외한 Check된 모든 Row 삭제
			for(var i = 0; i< tableLen - 1; i++){
				if(document.frm.check_flag[i]){
					if(document.frm.check_flag[i].checked ){
						old_base_plt = document.frm.base_stk_plt[i].value;
						old_base_box = document.frm.base_stk_box[i].value;
						old_add_plt = document.frm.add_stk_plt[i].value;
						old_add_box = document.frm.add_stk_box[i].value;
						old_prod_plt = document.frm.prod_plt[i].value;
						old_prod_box = document.frm.prod_box[i].value;
						
						delRowDo( i );
						// 맨 마지막 Row를 삭제한 후 다음 Row가 없으므로 누적 계산을 안해도됨.
						
						if(tableLen == 2){
							caldelCum('n/a');
						}
						else{
							if(document.frm.check_flag[i])
								caldelCum(i);
							else
								caldelCum(0);
						}
						i--;
						tableLen--;
					}
				}
				else{
					old_base_plt = document.frm.base_stk_plt.value;
					old_base_box = document.frm.base_stk_box.value;
					old_add_plt = document.frm.add_stk_plt.value;
					old_add_box = document.frm.add_stk_box.value;
					old_prod_plt = document.frm.prod_plt.value;
					old_prod_box = document.frm.prod_box.value;
					
					delRowDo( i );
					// 맨 마지막 Row를 삭제한 후 다음 Row가 없으므로 누적 계산을 안해도됨.
					
					caldelCum(0);
					i--;
					tableLen--;
					
				}
			}
		}
		// 삭제되는 Row가 Check되어 있지 않는 경우, 자기 자신만 삭제됨.
		else{
			old_base_plt = document.frm.base_stk_plt[delRowIdx].value;
			old_base_box = document.frm.base_stk_box[delRowIdx].value;
			old_add_plt = document.frm.add_stk_plt[delRowIdx].value;
			old_add_box = document.frm.add_stk_box[delRowIdx].value;
			old_prod_plt = document.frm.prod_plt[delRowIdx].value;
			old_prod_box = document.frm.prod_box[delRowIdx].value;
					
			delRowDo( delRowIdx );
			// 맨 마지막 Row를 삭제한 후 다음 Row가 없으므로 누적 계산을 안해도됨.
			tableLen--;
			if(tableLen == 1){
				caldelCum('n/a');
			}
			else{
				if(document.frm.check_flag[delRowIdx])
					caldelCum(delRowIdx);
				else
					caldelCum(0);
			}
		}
		if(tableLen  > 2)
			rowFormed();
	}
	setRowNo();
	setLastPltColor();
}

// 실제 row 삭제 함수
// parameter : 삭제할 rowIndex
function delRowDo( rowIdx ) { 
	
	left_tbody.deleteRow(rowIdx); 
	main_tbody.deleteRow(rowIdx);
	
}

// 라인 삭제를 하면 버튼의 스타일이 잘 안먹는다. 따라서, 최 하단 라인을 지웠다 재생성한다.
// 이렇게 하면 버튼의 스타일이 잘 먹는다.
// 최 하단 라인 데이터 기억 & 삭제 & 생성 & 채움
function rowFormed() {
	
	memLastRow();
	var tableLen = left_tbody.rows.length;
	delRowDo( tableLen - 2 );
	
	tableLen = left_tbody.rows.length;
	//if( document.frm.btnAddRow[0] ) {
	if( tableLen > 2 ) {
		var objBtn = document.frm.btnAddRow[tableLen-2];
	}
	else if( tableLen == 2 ) {
		if( document.frm.btnAddRow[0] ) {
			var objBtn = document.frm.btnAddRow[0];
		}
		else {
			var objBtn = document.frm.btnAddRow;
		}
	}
	else {
		var objBtn = areaAdd;
	}
	
	//addRow(left_tbody.rows.length);
	addRow(objBtn);
	
	setLastRow();
	
} 

/**************************************************************************************************
 ************************************ 한 Row의 값을 memory 하는 함수 *********************************
 **************************************************************************************************/

var arrCheckData = new Array(18); 
// 1. 선택된  라인 데이터 기억
function memCheckRow(indexNum) {
	
	//var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[indexNum] ) {
	
		arrCheckData[0] 	= document.frm.routeClass[indexNum].value;   // RTE 구분
		arrCheckData[1] 	= document.frm.trans_date[indexNum].value;   // 수송일자
		arrCheckData[2] 	= document.frm.src_loc[indexNum].value;      // 출고장
		arrCheckData[3] 	= document.frm.truck_seq[indexNum].value;    // 차량순번
		arrCheckData[4] 	= document.frm.item_id[indexNum].value;      // 제품코드
		arrCheckData[5] 	= document.frm.item_name[indexNum].value;    // 제품명
		arrCheckData[6] 	= document.frm.base_stk_plt[indexNum].value; // 기본재고상차 PLT
		arrCheckData[7] 	= document.frm.base_stk_box[indexNum].value; // 기본재고상차 BOX
		arrCheckData[8] 	= document.frm.add_stk_plt[indexNum].value;  // 추가재고상차 PLT
		arrCheckData[9] 	= document.frm.add_stk_box[indexNum].value;  // 추가재고상차 BOX
		arrCheckData[10] = document.frm.prod_plt[indexNum].value;     // 생산상차 PLT
		arrCheckData[11] = document.frm.prod_box[indexNum].value;     // 생산상차 BOX
		arrCheckData[12] = document.frm.cum_plt[indexNum].value;      // 누적상차집계 PLT
		arrCheckData[13] = document.frm.cum_box[indexNum].value;      // 누적상차집계 BOX
		arrCheckData[14] = left_tbody.rows[indexNum].style.backgroundColor; // 체크 color
		arrCheckData[15] = document.frm.old_date[indexNum].value; // 기존 날짜
		arrCheckData[16] = document.frm.hidden_color[indexNum].value; // 기존 색깔
		arrCheckData[17] = document.frm.box_per_palet[indexNum].value; // box_per_palet
	}
}

var arrData = new Array(18); 
// 2. 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[tableLen-2] ) {
		arrData[0] 	= document.frm.routeClass[tableLen-2].value;   // RTE 구분
		arrData[1] 	= document.frm.trans_date[tableLen-2].value;   // 수송일자
		arrData[2] 	= document.frm.src_loc[tableLen-2].value;      // 출고장
		arrData[3] 	= document.frm.truck_seq[tableLen-2].value;    // 차량순번
		arrData[4] 	= document.frm.item_id[tableLen-2].value;      // 제품코드
		arrData[5] 	= document.frm.item_name[tableLen-2].value;    // 제품명
		arrData[6] 	= document.frm.base_stk_plt[tableLen-2].value; // 기본재고상차 PLT
		arrData[7] 	= document.frm.base_stk_box[tableLen-2].value; // 기본재고상차 BOX
		arrData[8] 	= document.frm.add_stk_plt[tableLen-2].value;  // 추가재고상차 PLT
		arrData[9] 	= document.frm.add_stk_box[tableLen-2].value;  // 추가재고상차 BOX
		arrData[10] = document.frm.prod_plt[tableLen-2].value;     // 생산상차 PLT
		arrData[11] = document.frm.prod_box[tableLen-2].value;     // 생산상차 BOX
		arrData[12] = document.frm.cum_plt[tableLen-2].value;      // 누적상차집계 PLT
		arrData[13] = document.frm.cum_box[tableLen-2].value;      // 누적상차집계 BOX
		arrData[14] = left_tbody.rows[tableLen-2].style.backgroundColor; // 체크 color
		arrData[15] = document.frm.old_date[tableLen-2].value; // 기존 날짜
		arrData[16] = document.frm.hidden_color[tableLen-2].value; // 기존 색깔
		arrData[17] = document.frm.box_per_palet[tableLen-2].value; // box_per_palet
	}
	else {
		arrData[0] 	= document.frm.routeClass.value;   // RTE 구분
		arrData[1] 	= document.frm.trans_date.value;   // 수송일자
		arrData[2] 	= document.frm.src_loc.value;      // 출고장
		arrData[3] 	= document.frm.truck_seq.value;    // 차량순번
		arrData[4] 	= document.frm.item_id.value;      // 제품코드
		arrData[5] 	= document.frm.item_name.value;    // 제품명
		arrData[6] 	= document.frm.base_stk_plt.value; // 기본재고상차 PLT
		arrData[7] 	= document.frm.base_stk_box.value; // 기본재고상차 BOX
		arrData[8] 	= document.frm.add_stk_plt.value;  // 추가재고상차 PLT
		arrData[9] 	= document.frm.add_stk_box.value;  // 추가재고상차 BOX
		arrData[10] = document.frm.prod_plt.value;     // 생산상차 PLT
		arrData[11] = document.frm.prod_box.value;     // 생산상차 BOX
		arrData[12] = document.frm.cum_plt.value;      // 누적상차집계 PLT
		arrData[13] = document.frm.cum_box.value;      // 누적상차집계 BOX
		arrData[14] = left_tbody.rows[0].style.backgroundColor; // 체크 color
		arrData[15] = document.frm.old_date.value; // 기존 날짜
		arrData[16] = document.frm.hidden_color.value; // 기존 날짜
		arrData[17] = document.frm.box_per_palet.value; // box_per_palet
	}
	
}

/**************************************************************************************************/



/**************************************************************************************************
 ************************************ memory된 데이타를 셋팅 하는 함수 ********************************
 **************************************************************************************************/

// 1.  Check된 Row들에 대한 합차를 할때, 각 Row의 데이터 채움
function setCheckValueRow(indexNum) {
	
	//var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[indexNum] ) {
		document.frm.routeClass[indexNum].value 	= arrCheckData[0];  // RTE 구분
		document.frm.trans_date[indexNum].value 	= arrCheckData[1];  // 수송일자
		document.frm.src_loc[indexNum].value 		= arrCheckData[2];  // 출고장
		document.frm.truck_seq[indexNum].value 		= arrCheckData[3];  // 차량순번
		document.frm.item_id[indexNum].value 		= arrCheckData[4];  // 제품코드
		document.frm.item_name[indexNum].value 		= arrCheckData[5];  // 제품명
		document.frm.base_stk_plt[indexNum].value 	= arrCheckData[6];  // 기본재고상차 PLT
		document.frm.base_stk_box[indexNum].value 	= arrCheckData[7];  // 기본재고상차 BOX
		document.frm.add_stk_plt[indexNum].value 	= arrCheckData[8];  // 추가재고상차 PLT
		document.frm.add_stk_box[indexNum].value 	= arrCheckData[9];  // 추가재고상차 BOX
		document.frm.prod_plt[indexNum].value 		= arrCheckData[10]; // 생산상차 PLT
		document.frm.prod_box[indexNum].value 		= arrCheckData[11]; // 생산상차 BOX
		document.frm.cum_plt[indexNum].value 		= fixedPoint(arrCheckData[12].toString(),2); // 누적상차집계 PLT
		document.frm.cum_box[indexNum].value 		= numberFormat(arrCheckData[13].toString()); // 누적상차집계 BOX
		document.frm.old_date[indexNum].value 	= arrCheckData[15]; // 기존 날짜
		document.frm.hidden_color[indexNum].value 	= arrCheckData[16]; // 기존 색깔
		document.frm.box_per_palet[indexNum].value 	= arrCheckData[17]; // box_per_palet
		
		divRteClass[indexNum].innerHTML 	= arrCheckData[0]; // RTE 구분
		divTransDate[indexNum].innerHTML 	= arrCheckData[1]; // 수송일자
		setViewMode(document.frm.src_loc[indexNum]); 	  // 출고장
		divItemId[indexNum].innerHTML 	= arrCheckData[4]; // 제품코드
		divItemName[indexNum].innerHTML 	= "&nbsp;" + arrCheckData[5]; // 제품명
	}
}

// 2. 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[tableLen-2] ) {
		document.frm.routeClass[tableLen-2].value 	= arrData[0];  // RTE 구분
		document.frm.trans_date[tableLen-2].value 	= arrData[1];  // 수송일자
		document.frm.src_loc[tableLen-2].value 		= arrData[2];  // 출고장
		document.frm.truck_seq[tableLen-2].value 	= arrData[3];  // 차량순번
		document.frm.item_id[tableLen-2].value 		= arrData[4];  // 제품코드
		document.frm.item_name[tableLen-2].value 	= arrData[5];  // 제품명
		document.frm.base_stk_plt[tableLen-2].value = arrData[6];  // 기본재고상차 PLT
		document.frm.base_stk_box[tableLen-2].value = arrData[7];  // 기본재고상차 BOX
		document.frm.add_stk_plt[tableLen-2].value 	= arrData[8];  // 추가재고상차 PLT
		document.frm.add_stk_box[tableLen-2].value 	= arrData[9];  // 추가재고상차 BOX
		document.frm.prod_plt[tableLen-2].value 	= arrData[10]; // 생산상차 PLT
		document.frm.prod_box[tableLen-2].value 	= arrData[11]; // 생산상차 BOX
		document.frm.cum_plt[tableLen-2].value 		= fixedPoint(arrData[12].toString(),2); // 누적상차집계 PLT
		document.frm.cum_box[tableLen-2].value 		= numberFormat(arrData[13].toString()); // 누적상차집계 BOX
		document.frm.old_date[tableLen-2].value 	= arrData[15]; // 기존 날짜
		document.frm.hidden_color[tableLen-2].value 	= arrData[16]; // 기존 날짜
		document.frm.box_per_palet[tableLen-2].value 	= arrData[17]; // box_per_palet
		
		divRteClass[tableLen-2].innerHTML 	= arrData[0]; // RTE 구분
		divTransDate[tableLen-2].innerHTML 	= arrData[1]; // 수송일자
		setViewMode(document.frm.src_loc[tableLen-2]); 	  // 출고장
		divItemId[tableLen-2].innerHTML 	= arrData[4]; // 제품코드
		divItemName[tableLen-2].innerHTML 	= "&nbsp;" + arrData[5]; // 제품명
	}
	else {
		document.frm.routeClass.value 	= arrData[0];  // RTE 구분
		document.frm.trans_date.value 	= arrData[1];  // 수송일자
		document.frm.src_loc.value 		= arrData[2];  // 출고장
		document.frm.truck_seq.value 	= arrData[3];  // 차량순번
		document.frm.item_id.value 		= arrData[4];  // 제품코드
		document.frm.item_name.value 	= arrData[5];  // 제품명
		document.frm.base_stk_plt.value = arrData[6];  // 기본재고상차 PLT
		document.frm.base_stk_box.value = arrData[7];  // 기본재고상차 BOX
		document.frm.add_stk_plt.value 	= arrData[8];  // 추가재고상차 PLT
		document.frm.add_stk_box.value 	= arrData[9];  // 추가재고상차 BOX
		document.frm.prod_plt.value 	= arrData[10]; // 생산상차 PLT
		document.frm.prod_box.value 	= arrData[11]; // 생산상차 BOX
		document.frm.cum_plt.value 		= fixedPoint(arrData[12].toString,2); // 누적상차집계 PLT
		document.frm.cum_box.value 		= numberFormat(arrData[13].toString()); // 누적상차집계 BOX
		document.frm.old_date.value 		= arrData[15]; // 기존 날짜
		document.frm.hidden_color.value 		= arrData[16]; // 기존 날짜
		document.frm.box_per_palet.value 	= arrData[17]; // box_per_palet
		
		divRteClass.innerHTML 	= arrData[0]; // RTE 구분
		divTransDate.innerHTML 	= arrData[1]; // 수송일자
		setViewMode(document.frm.src_loc); 	  // 출고장
		divItemId.innerHTML 	= arrData[4]; // 제품코드
		divItemName.innerHTML 	= "&nbsp;" + arrData[5]; // 제품명
	}
	
}

// 3. 재고 정보 IFRAME(Child Page)에서 새로운 ROW의 값을 새로 insert 할때
// Row의 값을 셋팅해주는 function 
function setParentValueRow(indexNum, item_id, item_name) {
	
	//var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[indexNum] ) {
		document.frm.routeClass[indexNum].value 	= arrCheckData[0];  // RTE 구분
		document.frm.trans_date[indexNum].value 	= arrCheckData[1];  // 수송일자
		document.frm.src_loc[indexNum].value 		= arrCheckData[2];  // 출고장
		document.frm.truck_seq[indexNum].value 		= arrCheckData[3];  // 차량순번
		document.frm.item_id[indexNum].value 		= item_id;		    // 제품코드
		document.frm.item_name[indexNum].value 		= item_name;        // 제품명
		document.frm.base_stk_plt[indexNum].value 	= "0.00";           // 기본재고상차 PLT
		document.frm.base_stk_box[indexNum].value 	= "0";  			// 기본재고상차 BOX
		document.frm.add_stk_plt[indexNum].value 	= "0.00"  			// 추가재고상차 PLT
		document.frm.add_stk_box[indexNum].value 	= "0";  			// 추가재고상차 BOX
		document.frm.prod_plt[indexNum].value 		= "0.00"; 			// 생산상차 PLT
		document.frm.prod_box[indexNum].value 		= "0"; 				// 생산상차 BOX
		document.frm.cum_plt[indexNum].value 		= "0.00"; 			// 누적상차집계 PLT
		document.frm.cum_box[indexNum].value 		= "0"; 				// 누적상차집계 BOX
		
		var line_color = null;
		if(document.frm.hidden_color[indexNum-1]){
			if(document.frm.hidden_color[indexNum-1].value == "N" ||
				document.frm.hidden_color[indexNum-1].value == null)
				line_color = "#ffffff";
			else
				line_color = "#d0b8f1";	
		}
		else{
			if(document.frm.hidden_color.value == "N" ||
				document.frm.hidden_color.value == null)
				line_color = "#ffffff";
			else
				line_color = "#d0b8f1";
		}
		
		
		//left_tbody.rows[indexNum].style.backgroundColor = line_color; // 체크 color
		//main_tbody.rows[indexNum].style.backgroundColor = line_color; // 체크 color
		document.frm.old_date[indexNum].value 	= arrCheckData[15]; // 기존 날짜
		document.frm.hidden_color[indexNum].value 	= arrCheckData[16]; // 기존 날짜
		//document.frm.check_flag[indexNum].value  = arrCheckData[18]; // check_flag
		
		getBoxPerPalet( document.frm.src_loc[indexNum] ); // box_per_palet
		//alert(document.frm.box_per_palet[indexNum].value);
		//document.frm.box_per_palet[indexNum].value 	= arrData[17]; // box_per_palet
		
		divRteClass[indexNum].innerHTML 	= arrCheckData[0]; // RTE 구분
		divTransDate[indexNum].innerHTML 	= arrCheckData[1]; // 수송일자
		//divSrcLoc[indexNum].innerHTML 	= arrCheckData[2]; // 출고장
		setViewMode(document.frm.src_loc[indexNum]); 	  // 출고장
		//divTruckSeq[indexNum].innerHTML 	= arrCheckData[3]; // 차량순번
		divItemId[indexNum].innerHTML 	= item_id; // 제품코드
		divItemName[indexNum].innerHTML 	= "&nbsp;" + item_name; // 제품명
	}
}


/**************************************************************************************************/



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
		// 수송일자 --> 출고장
		
		//if( objName == "trans_date" ) {
		if( objName == "transDateTmp" ) {
			objTdG = left_tbody.rows[rowIdx].cells[5];
		}
		// 출고장 --> 차량순번
		else if( objName == "src_loc" ) {
			
			objTdG = left_tbody.rows[rowIdx].cells[6];
		}
		// 차량순번 --> 제품코드
		else if( objName == "truck_seq" ) {
			objTdG = left_tbody.rows[rowIdx].cells[7];
		}
		// 제품코드 --> 기본재고상차 PLT
		else if( objName == "item_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[2];
		}	
		// 기본재고상차 PLT --> 기본재고상차 BOX
		else if( objName == "base_stk_plt" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// 기본재고상차 BOX --> 추가재고상차 PLT
		else if( objName == "base_stk_box" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// 추가재고상차 PLT --> 추가재고상차 BOX
		else if( objName == "add_stk_plt" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// 추가재고상차 BOX --> 생산상차 PLT
		else if( objName == "add_stk_box" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// 생산상차 PLT --> 생산상차 BOX
		else if( objName == "prod_plt" ) {
			objTdG = main_tbody.rows[rowIdx].cells[7];
		}
		// 생산상차 BOX --> 다음줄 RTE 구분
		else if( objName == "prod_box" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+2 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[4];
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[4];
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
	
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	var tgt_loc = document.frm.tgt_loc.value;
	if( document.frm.item_id[0] ) {
		var code_input = document.frm.item_id[rowIdx].value.trim();
		document.frm.item_id[rowIdx].value = code_input;
		var src_loc = document.frm.src_loc[rowIdx].value;
		document.frm.item_id[rowIdx].select();
	}
	else {
		var code_input = document.frm.item_id.value.trim();
		document.frm.item_id.value = code_input;
		var src_loc = document.frm.src_loc.value;
		document.frm.item_id.select();
	}
	
	if( src_loc == "" || src_loc == null ) {
		alert("출고장을 먼저 선택하세요.");
		return;
	}
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans&code_input=" + code_input + "&rowIdx=" + rowIdx;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1" + "&tgt_loc=" + tgt_loc + "&src_loc=" + src_loc;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
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

// 사용자 직접 입력값으로부터 제품정보 조회
// 제품 코드, 제품 명 둘 중 하나라도 일치하는 데이터 검색
function getItemInfo( obj ) {
	
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	
	if( document.frm.item_id[rowIdx] ) {
		var dc_id = document.frm.src_loc[rowIdx].value;
		var objItemId = document.frm.item_id[rowIdx];
		var objItemName = document.frm.item_name[rowIdx];
		var objDivItemId = divItemId[rowIdx];
		var objDivItemName = divItemName[rowIdx];
		var objBoxPerPalet = document.frm.box_per_palet[rowIdx];
	}
	else {
		var dc_id = document.frm.src_loc.value;
		var objItemId = document.frm.item_id;
		var objItemName = document.frm.item_name;
		var objDivItemId = divItemId;
		var objDivItemName = divItemName;
		var objBoxPerPalet = document.frm.box_per_palet;
	}
	
	var input_value = objItemId.value.trim();
	objItemId.value = input_value;
	
	// 출고장 또는 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( dc_id == "" || dc_id == null ) {
		alert("출고장을 먼저 선택하세요.");
		objItemId.value = "";
		objDivItemId.innerHTML = "";
		objItemName.value = "";
		objDivItemName.innerHTML = "";
		objBoxPerPalet.value = "";
		return;
	}
	
	// 제품코드 데이터가 없는 경우 함수를 빠져나간다
	if( input_value == null || input_value == "" ) {
		objItemId.value = "";
		objDivItemId.innerHTML = "";
		objItemName.value = "";
		objDivItemName.innerHTML = "";
		objBoxPerPalet.value = "";
		return;
	}
	
	replenishPlan.getItemInfo(dc_id, input_value, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// 일치하는 결과 없음
			if( arrList.length == 0 ) {
				objItemId.value = "";
				objDivItemId.innerHTML = "";
				objItemName.value = "";
				objDivItemName.innerHTML = "";
				objBoxPerPalet.value = "";
				openItemSearchPop(objItemId);
			}
			// 일치하는 결과 1개
			else if( arrList.length == 1 ) {
				objItemId.value = arrList[0][0];
				objDivItemId.innerHTML = arrList[0][0];
				objItemName.value = arrList[0][1];
				objDivItemName.innerHTML = "&nbsp;" + arrList[0][1];
				objBoxPerPalet.value = arrList[0][2];
			}
			else {
				openItemSearchPop(objItemId);
				objItemId.value = "";
				objDivItemId.innerHTML = "";
				objItemName.value = "";
				objDivItemName.innerHTML = "";
				objBoxPerPalet.value = "";
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
	
	tdBLeft.width = (Number(maxWidthValue) - 350).toString() + "px";
	document.all.gridBLeft.width = (Number(maxWidthValue) - 350).toString() + "px";
	
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
	var sort_type = document.frm.sort_type.value;
	
	if( versions == "" || versions == null ) {
		alert("버전을 선택하세요.");
		return;
	}
	if( document.frm.tgt_loc_sel.value == "" || document.frm.tgt_loc_sel.value == null ) {
		alert("입고장을 선택하세요.");
		return;
	}
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	document.frm.tgt_loc.value 		= document.frm.tgt_loc_sel.value;
	document.frm.plan_type.value 	= document.frm.plan_type_sel.value;
	
	
	
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
	
	var tgt_loc = document.frm.tgt_loc.value;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	// 입고장을 선택하지 않은 경우
	if( tgt_loc == null || tgt_loc == "" ) {
		alert("입고장을 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	// 버전, 차수를 선택하지 않은 경우
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("버전을 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	
	// ====================================================================== //
	// 1차당 PLT 누적 최종값이 12박스가 안될때는 CONFIRM으로 저장할것 인지 확인하는 로직
	var tableLen = left_tbody.rows.length;
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var plt_qty = 0;
	var check_plt_flag = false;
	
	if(tableLen == 1){ // Total Row만 존재하는 경우..
		if(!confirm("저장하시겠습니까?"))
			return;
	}
	// Row 수가 1인 경우.
    if(tableLen == 2){
		if(document.frm.trans_date[0]){
			if(document.frm.trans_date[0].value == "" 
				|| document.frm.src_loc[0].value == ""
				|| document.frm.truck_seq[0].value == ""
				|| document.frm.item_id.value[0] == ""){
				alert("수송일자, 출고장, 차량번호, 제품코드를 정확히 입력하여 주십시요.");
				return;
			}
			plt_qty = document.frm.cum_plt[0].value;
		}
		else{
			if(document.frm.trans_date.value == "" 
				|| document.frm.src_loc.value == ""
				|| document.frm.truck_seq.value == ""
				|| document.frm.item_id.value == ""){
				alert("수송일자, 출고장, 차량번호, 제품코드를 정확히 입력하여 주십시요.");
				return;
			}
			plt_qty = document.frm.cum_plt.value;
		}
		
		if(plt_qty < 12){ // 12PLT 미만인 차량이 존재하는 경우..
			if(!confirm("12PLT 미만인 차량이 존재합니다. 저장하시겠습니까?"))
				return;
		}else{ // 모두 12PLT 이상인 경우.
			if(!confirm("저장하시겠습니까?"))
				return;
		}			
	}
	// Row 수가 2이상인 경우.
	else if(tableLen > 2){		
		for( var i = 0 ; i < tableLen-1 ; i++ ) {
			if( document.frm.cum_box[i] ) {
				if(document.frm.trans_date[i].value == "" 
					|| document.frm.src_loc[i].value == ""
					|| document.frm.truck_seq[i].value == ""
					|| document.frm.item_id[i].value == ""){
					alert("수송일자, 출고장, 차량번호, 제품코드를 정확히 입력하여 주십시요.");
					return;
				}
				if(i == 0){
					preTransDate = document.frm.trans_date[0].value;
					preSrcLoc = document.frm.src_loc[0].value;
					preTruckSeq = document.frm.truck_seq[0].value;
				}
				//alert(preTransDate+" "+preSrcLoc+" "+preTruckSeq);
				// 출고장, 차량순번이 같은 데이터 누적 집계
				if( document.frm.trans_date[i].value == preTransDate
					&& document.frm.src_loc[i].value == preSrcLoc 
					&& document.frm.truck_seq[i].value == preTruckSeq ) {
		
					cumPlt += strToNum(document.frm.base_stk_plt[i].value);
					cumPlt += strToNum(document.frm.add_stk_plt[i].value);
					cumPlt += strToNum(document.frm.prod_plt[i].value);
					
				}else{
					
					if(cumPlt < 12)	// 차량이 변경된 경우, 현재 차량의 총 PLT가 12PLT 미만인 경우..
						check_plt_flag = true;
					
					cumPlt = strToNum(document.frm.base_stk_plt[i].value);
					cumPlt += strToNum(document.frm.add_stk_plt[i].value);
					cumPlt += strToNum(document.frm.prod_plt[i].value);
					
					preTransDate = document.frm.trans_date[i].value;
					preSrcLoc = document.frm.src_loc[i].value;
					preTruckSeq = document.frm.truck_seq[i].value;
				}
			}
		}	
		
		// 12PLT가 안되는 경우..
		if(check_plt_flag){
			if(!confirm("12PLT 미만인 차량이 존재합니다. 저장하시겠습니까?"))
				return;
		}
		else{		
			// 모두 12PLT 이상인 경우.
			if(!confirm("저장하시겠습니까?"))
				return;
		}
	}
	// ====================================================================== //
	
	//alert("확인"); //확인할것
	//return;
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}


// 합 차  버튼을 클릭한 경우 호출
// 선택된 Row중에 제일 위의 값으로 PK가 셋팅됨.
function doSumTrucks(){
	
	//document.body.oncontextmenu = "return false";
	
	var tableLen = left_tbody.rows.length;
	var firstRow = true;   
	var firstRowNum = 0;   //click한 Row 밑에 계속적으로 Row를 추가하기 위한 index를 저장하는 변수
	var routeClass = null; //RTE 구분
	var trans_date = null; //수송일자
	var src_loc	   = null; //출고장
	var truck_seq  = null; //차량 순번
	var count_checked = 0; //Check 되어 있는 Row의 수를 구함.
	
	
	if(clickedLineIdx == null || clickedLineIdx == "") {
		if(clickedLineIdx != 0){
			alert("먼저 원하시는 번호를 클릭하여 주십시요.");
		return;
		}
	}
	
	if(tableLen <= 2){ // 합계뿐이거나, Row가 한개일때는 합차 무시
		return;
	}
	for(var i = 0; i < tableLen-1; i++){
		if( document.frm.check_flag[i] ) {
			if( document.frm.check_flag[i].checked) {
				
				// 현재 선택된 Row가  Check Box도 같이 Check 되어 있는 경우 무시
				if(i == clickedLineIdx){
					document.frm.check_flag[i].checked = false;
					continue;
				}
					
				count_checked ++;	// 현재 Check 되어 있는 Row의 수를 구함.
				if(firstRow){
					routeClass  = document.frm.routeClass[clickedLineIdx].value;
					trans_date  = document.frm.trans_date[clickedLineIdx].value;
					src_loc     = document.frm.src_loc[clickedLineIdx].value;
					truck_seq   = document.frm.truck_seq[clickedLineIdx].value;
					firstRowNum = clickedLineIdx+1;
					firstRow = false;
				}
				document.frm.routeClass[i].value = routeClass;
				document.frm.trans_date[i].value = trans_date;
				document.frm.src_loc[i].value    = src_loc;
				document.frm.truck_seq[i].value  = truck_seq;
				divRteClass[i].innerHTML = routeClass;
				divTransDate[i].innerHTML = trans_date;
				setViewMode(document.frm.src_loc[i]);
				
				memCheckRow(i); 			// 선택된 Row를 임시저장
				//alert("a"+i);
				delRowDo(i);				// 전의 값 삭제
				
				// 합차하려는 차 보다 위에 Row가  있는 경우..
				if(i < clickedLineIdx){
					addRowByIndex(firstRowNum-1);	// 상위에 한Row를 추가
					setCheckValueRow(firstRowNum-1);	// 임시저장된 값 setting
					i--;				
				}
				// 합차하려는 차 보다 밑에 Row가  있는 경우..
				else{		
					addRowByIndex(firstRowNum);	// 상위에 한Row를 추가		
					setCheckValueRow(firstRowNum);	// 임시저장된 값 setting
					firstRowNum++;	
				}// 합차가 끝났음.		
			}
		}
	}
	
	var click_line = clickedLineIdx; 
	var line_flag = true;
	var start_line = 0; 
	var end_line = 0;
	var basePlt = 0;    
	var baseQty = 0;
	var addPlt  = 0;
	var addQty  = 0;
	var prodPlt = 0;
	var prodQty = 0;
	
	// 합차가 이루어지는 Row의 첫번째 줄을 알아 내기 위해서
	// 합차가 이루어 질때 선택된 Row 위에 중복되는 데이타가 있는 경우,
	// 수량을 더해 주기 위해서.
	for(var i = 0; i< tableLen-1; i++){
		if( document.frm.trans_date[i].value == document.frm.trans_date[click_line].value
		&& document.frm.src_loc[i].value == document.frm.src_loc[click_line].value 
		&& document.frm.truck_seq[i].value == document.frm.truck_seq[click_line].value ) {
			if(line_flag){
				start_line = i;
				line_flag = false;
			}
			end_line = i;
		}
	}
	
	// PK가 같은 경우 SUM
	// 가장 난해한 부분.
	for(var i = start_line; i <= end_line; i++){
		if( document.frm.base_stk_plt[i] ) { // 같은 차량인 경우만 처리함.
			if(document.frm.trans_date[i].value == document.frm.trans_date[start_line].value
				&& document.frm.src_loc[i].value == document.frm.src_loc[start_line].value 
				&& document.frm.truck_seq[i].value == document.frm.truck_seq[start_line].value  ) {
				basePlt = strToNum(document.frm.base_stk_plt[i].value);
				baseQty = strToNum(document.frm.base_stk_box[i].value);
				addPlt  = strToNum(document.frm.add_stk_plt[i].value);
				addQty  = strToNum(document.frm.add_stk_box[i].value);
				prodPlt = strToNum(document.frm.prod_plt[i].value);
				prodQty = strToNum(document.frm.prod_box[i].value);
				
				for(var j = i+1; j <= end_line; j++){
					if( i != j 
					&& document.frm.trans_date[i].value == document.frm.trans_date[j].value
					&& document.frm.src_loc[i].value == document.frm.src_loc[j].value 
					&& document.frm.truck_seq[i].value == document.frm.truck_seq[j].value 
					&& document.frm.item_id[i].value  ==  document.frm.item_id[j].value) {

						baseQty += strToNum(document.frm.base_stk_box[j].value);
						addQty  += strToNum(document.frm.add_stk_box[j].value);
						prodQty += strToNum(document.frm.prod_box[j].value);
						basePlt += strToNum(document.frm.base_stk_plt[j].value);
						addPlt  += strToNum(document.frm.add_stk_plt[j].value);
						prodPlt += strToNum(document.frm.prod_plt[j].value);
						
						//alert(baseQty+" "+basePlt+" "+addQty+" "+addPlt);
						delRowDo(j);
						j--;			
						end_line--;
					}
				}
				document.frm.base_stk_plt[i].value = fixedPoint(basePlt.toString(),2);
				document.frm.base_stk_box[i].value = baseQty;
				document.frm.add_stk_plt[i].value = fixedPoint(addPlt.toString(),2);
				document.frm.add_stk_box[i].value = addQty;
				document.frm.prod_plt[i].value = fixedPoint(prodPlt.toString(),2);
				document.frm.prod_box[i].value = prodQty ;
				var basePStr  =  fixedPoint(numberFormat(basePlt.toString()),2); 
				var baseQStr  =  numberFormat(baseQty.toString());
				var addPStr   =  fixedPoint(numberFormat(addPlt.toString()),2);
				var addQStr   =  numberFormat(addQty.toString());
				var prodPStr  =  fixedPoint(numberFormat(prodPlt.toString()),2);
				var prodQStr  =  numberFormat(prodQty.toString());
			}
		}
	}
	
		
	rowFormed();
	clickedLineIdx = click_line;
	//setBgColors();
	if(count_checked == 0){
		alert("먼저 합차하려는 Row를 선택하여 주십시요!");
	} 
	allCalCum();
	setLastPltColor();
	
}

/********************************************************************************************/
// divTotalPlt 부분 (새로운 div창 처리)
/********************************************************************************************/

var checkZIndex = true;
var checkMouseDown = false;
var dragobject = null;
var tx;
var ty;

// 선택된 화면 객체중에 parentNode가 무엇인지 찾아내는 로직.
function getReal(el) {
	temp = el;

	while ((temp != null) && (temp.tagName != "BODY")) {
		if (temp.id == "totalPltHeader"){
			el = temp.parentElement;
			return el;
		}
		temp = temp.parentElement;
	}
	return el;
}

// Mouse 왼쪽 키를 누른경우.
function move_mousedown() {
	var el = getReal(window.event.srcElement)
	if (el.id == "divTotalPlt") {
		dragobject = el;
		checkMouseDown = true;

		ty = window.event.clientY - getTopPos(dragobject);
		tx = window.event.clientX - getLeftPos(dragobject);

		window.event.returnValue = false;
		window.event.cancelBubble = true;
		//dragobject.filters.alpha.opacity=77;
	}
	//alert(ty+" "+tx);
}

// Mouse 왼쪽 키를 땐경우.
function move_mouseup() {
	dragobject = null;
	checkMouseDown = false;
}

// Mouse 왼쪽 키를 누른상태에서 움직인 경우..
function move_mousemove() {
	if(checkMouseDown){
		if (dragobject) {
			if (window.event.clientX >= 0 && window.event.clientY >= 0) {
				dragobject.style.left = window.event.clientX - tx + "px";
				dragobject.style.top = window.event.clientY - ty + "px";
				//alert(dragobject.style.left);
				//dragobject.filters.alpha.opacity=77;
			}
			window.event.returnValue = false;
		}
	}
}

function getLeftPos(el) {
	return el.style.pixelLeft;
}

function getTopPos(el) {
	return el.style.pixelTop;
}

// Total Plt 열기
function closeTotalPlt() {
	if( divTotalPlt.style.display == "BLOCK" 
		|| divTotalPlt.style.display == "block" ) {
		divTotalPlt.style.display = "none";
	} 
}

// Total Plt 열기
function openTotalPlt() {
	
	var tableLen = left_tbody.rows.length;
	var pltTableLen = plt_tbody.rows.length;
	var v_trans_date = null;
	var v_src_loc = null;
	var v_src_name = null;
	var v_truck_seq = 0;
	var v_cum_plt = 0;
	var insertRow = 0;
	
	// Row가 존재하지 않는 경우.
	if(tableLen == 1){
		alert("누적 PLT를 계산할 데이타가 존재하지 않습니다.");
		return;
	}
	// Row수가 1개인 경우..
	else if(tableLen == 2){
		
		// 기존의 Row를 삭제함.(새로운 누적값을 넣어주기 위해서.)
		for(var j = 0; j< pltTableLen; j++){
			plt_tbody.deleteRow(j);
			j--;
			pltTableLen--;
		}

		if(document.frm.trans_date[0]){
			// 필수 입력값을 입력하지 않은 경우, 누적 값을 보여 주지 않음.
			if(document.frm.trans_date[0].value == "" || document.frm.trans_date[0].value == null
			|| document.frm.src_loc[0].value == "" || document.frm.src_loc[0].value == null
			|| document.frm.truck_seq[0].value == "" || document.frm.truck_seq[0].value == null){
				alert("수송일자, 출고장, 차량번호를 정확히 입력하신 후 다시 클릭해 주십시요.");
				return;
			}
			v_trans_date = document.frm.trans_date[0].value;
			v_src_loc    = document.frm.src_loc[0].value;
			v_src_name   = document.frm.src_loc[0].options[document.frm.src_loc[0].selectedIndex].text;
			v_truck_seq  = document.frm.truck_seq[0].value;
			v_cum_plt    = document.frm.cum_plt[0].value;
		}
		else{
			// 필수 입력값을 입력하지 않은 경우, 누적 값을 보여 주지 않음.
			if(document.frm.trans_date.value == "" || document.frm.trans_date.value == null
			|| document.frm.src_loc.value == "" || document.frm.src_loc.value == null
			|| document.frm.truck_seq.value == "" || document.frm.truck_seq.value == null){
				alert("수송일자, 출고장, 차량번호를 정확히 입력하신 후 다시 클릭해 주십시요.");
				return;
			}
			v_trans_date = document.frm.trans_date.value;
			v_src_loc    = document.frm.src_loc.value;
			v_src_name   = document.frm.src_loc.options[document.frm.src_loc.selectedIndex].text;
			v_truck_seq  = document.frm.truck_seq.value;
			v_cum_plt    = document.frm.cum_plt.value;
		}
		
		var oRowPlt = plt_tbody.insertRow(insertRow);
		insertRow ++;
		oRowPlt.height = 22; 
				
		var oCell0 = oRowPlt.insertCell(); // 수송일자
		var oCell1 = oRowPlt.insertCell(); // 출고장
		var oCell2 = oRowPlt.insertCell(); // 차량번호
		var oCell3 = oRowPlt.insertCell(); // PLT
		
		oCell0.align = "center"; oCell0.width = "29%" ; // 수송일자
		oCell1.align = "center"; oCell1.width = "25%" ; // 출고장
		oCell2.align = "center"; oCell2.width = "25%" ; // 차량번호
		oCell3.align = "right";  oCell3.width = "21%" ; // PLT 
		oCell3.className = "right"; // 생산상차 BOX
		
		// 번호
		//oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
		//oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
		
		// 수송일자
		oCell0.innerHTML = "<input type=\"text\" name=\"v_trans_date\" value="+v_trans_date+" " 
						+ "style=\"border : 0px; text-align:center; width:100%; \" readonly> ";
		// 출고장
		oCell1.innerHTML = "<a>"+v_src_name+"</a>" 
						+ "<input type=\"hidden\" name=\"v_src_loc\" value="+v_src_loc+"> ";
		// 차량번호
		oCell2.innerHTML = "<input type=\"text\" name=\"v_truck_seq\" value="+v_truck_seq+" " 
						+ "style=\"border : 0px; text-align:center; width:100% \" readonly> ";
		// PLT
		oCell3.innerHTML = "<input type=\"text\" name=\"v_cum_plt\" value="+v_cum_plt+" " 
						+ "style=\"border : 0px; text-align:right; width:100% \" readonly> ";
		document.recalc();
	}
	else{	
		// 먼저 기존 Row 삭제
		for(var j = 0; j< pltTableLen; j++){
			plt_tbody.deleteRow(j);
			j--;
			pltTableLen--;
		}
		// 전체 Row를 하나씩 읽어 내리면서 같지 않는 값을 div에 추가함.
		for(var i = 0; i< tableLen-1; i++){
			if(i == tableLen-2){
				// 필수 입력값을 입력하지 않은 경우, 누적 값을 보여 주지 않음.
				if(document.frm.trans_date[i].value == "" || document.frm.trans_date[i].value == null
				|| document.frm.src_loc[i].value == "" || document.frm.src_loc[i].value == null
				|| document.frm.truck_seq[i].value == "" || document.frm.truck_seq[i].value == null){
					alert("수송일자, 출고장, 차량번호를 정확히 입력하신 후 다시 클릭해 주십시요.");
					return;
				}
				v_trans_date = document.frm.trans_date[i].value;
				v_src_loc    = document.frm.src_loc[i].value;
				v_src_name   = document.frm.src_loc[i].options[document.frm.src_loc[i].selectedIndex].text;
				v_truck_seq  = document.frm.truck_seq[i].value;
				v_cum_plt    = document.frm.cum_plt[i].value;
				
				var oRowPlt = plt_tbody.insertRow(insertRow);
				insertRow ++;
				oRowPlt.height = 22; 
						
				var oCell0 = oRowPlt.insertCell(); // 수송일자
				var oCell1 = oRowPlt.insertCell(); // 출고장
				var oCell2 = oRowPlt.insertCell(); // 차량번호
				var oCell3 = oRowPlt.insertCell(); // PLT
				
				oCell0.align = "center"; oCell0.width = "29%" ; // 수송일자
				oCell1.align = "center"; oCell1.width = "25%" ; // 출고장
				oCell2.align = "center"; oCell2.width = "25%" ; // 차량번호
				oCell3.align = "right";  oCell3.width = "21%" ; // PLT 
				oCell3.className = "right"; // 생산상차 BOX
				
				// 번호
				//oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
				//oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
				
				// 수송일자
				oCell0.innerHTML = "<input type=\"text\" name=\"v_trans_date\" value="+v_trans_date+" " 
								+ "style=\"border : 0px; text-align:center; width:100%; \" readonly> ";
				// 출고장
				oCell1.innerHTML = "<a>"+v_src_name+"</a>" 
								+ "<input type=\"hidden\" name=\"v_src_loc\" value="+v_src_loc+"> ";
				// 차량번호
				oCell2.innerHTML = "<input type=\"text\" name=\"v_truck_seq\" value="+v_truck_seq+" " 
								+ "style=\"border : 0px; text-align:center; width:100% \" readonly> ";
				// PLT
				oCell3.innerHTML = "<input type=\"text\" name=\"v_cum_plt\" value="+v_cum_plt+" " 
								+ "style=\"border : 0px; text-align:right; width:100% \" readonly> ";
				document.recalc();
			}
			else{
				if(document.frm.trans_date[i]){
					if( document.frm.trans_date[i].value != document.frm.trans_date[i+1].value
						|| document.frm.src_loc[i].value != document.frm.src_loc[i+1].value 
						|| document.frm.truck_seq[i].value != document.frm.truck_seq[i+1].value ) {
						
						// 필수 입력값을 입력하지 않은 경우, 누적 값을 보여 주지 않음.
						if(document.frm.trans_date[i].value == "" || document.frm.trans_date[i].value == null
						|| document.frm.src_loc[i].value == "" || document.frm.src_loc[i].value == null
						|| document.frm.truck_seq[i].value == "" || document.frm.truck_seq[i].value == null){
							alert("수송일자, 출고장, 차량번호를 정확히 입력하신 후 다시 클릭해 주십시요.");
							return;
						}
						v_trans_date = document.frm.trans_date[i].value;
						v_src_loc    = document.frm.src_loc[i].value;
						v_src_name   = document.frm.src_loc[i].options[document.frm.src_loc[i].selectedIndex].text;
						v_truck_seq  = document.frm.truck_seq[i].value;
						v_cum_plt    = document.frm.cum_plt[i].value;
						
						var oRowPlt = plt_tbody.insertRow(insertRow);
						insertRow ++;
						oRowPlt.height = 22; 
								
						var oCell0 = oRowPlt.insertCell(); // 수송일자
						var oCell1 = oRowPlt.insertCell(); // 출고장
						var oCell2 = oRowPlt.insertCell(); // 차량번호
						var oCell3 = oRowPlt.insertCell(); // PLT
						
						oCell0.align = "center"; oCell0.width = "29%" ; // 수송일자
						oCell1.align = "center"; oCell1.width = "25%" ; // 출고장
						oCell2.align = "center"; oCell2.width = "25%" ; // 차량번호
						oCell3.align = "right";  oCell3.width = "21%" ; // PLT 
						oCell3.className = "right"; // 생산상차 BOX
						
						if(strToNum(v_cum_plt) >= 14)
							oCell3.style.color = "red";
						// 번호
						//oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
						//oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
						
						// 수송일자
						oCell0.innerHTML = "<input type=\"text\" name=\"v_trans_date\" value="+v_trans_date+" " 
										+ "style=\"border : 0px; text-align:center; width:100%; \" readonly> ";
						// 출고장
						oCell1.innerHTML = "<a>"+v_src_name+"</a>" 
										+ "<input type=\"hidden\" name=\"v_src_loc\" value="+v_src_loc+"> ";
						// 차량번호
						oCell2.innerHTML = "<input type=\"text\" name=\"v_truck_seq\" value="+v_truck_seq+" " 
										+ "style=\"border : 0px; text-align:center; width:100% \" readonly> ";
						// PLT
						oCell3.innerHTML = "<input type=\"text\" name=\"v_cum_plt\" value="+v_cum_plt+" " 
										+ "style=\"border : 0px; text-align:right; width:100% \" readonly> ";
						document.recalc();
					}// end if
				}// end if
			}// end if
		}// end for
		
	}// end if
	
	var pltTransLen = plt_tbody.rows.length;
	
	if(pltTransLen > 1){ // Row 수가 1개 이상일 경우에만 중복되는 것이 있는지 체크
		for(var i = 0; i < pltTransLen; i++){
			for(var j = i + 1; j < pltTransLen; j++){
				if(document.frm.v_trans_date[j]){
					if(document.frm.v_trans_date[i].value == document.frm.v_trans_date[j].value
					&& document.frm.v_src_loc[i].value == document.frm.v_src_loc[j].value
					&& document.frm.v_truck_seq[i].value == document.frm.v_truck_seq[j].value){
						var cum_plt_tmp = strToNum(document.frm.v_cum_plt[i].value) + strToNum(document.frm.v_cum_plt[j].value);
						cum_plt_tmp = Math.round(numberFormat(cum_plt_tmp.toString(),2)*100)/100;
						document.frm.v_cum_plt[i].value = cum_plt_tmp;
					
						plt_tbody.deleteRow(j);
						j--;
						pltTransLen--;
					}
				}
			}
			if(strToNum(document.frm.v_cum_plt[i].value) < 12)
				document.frm.v_cum_plt[i].style.color = "red";
		}
	}
	else{
		if(document.frm.v_cum_plt[0]){
			if(strToNum(document.frm.v_cum_plt[0].value) < 12)
				document.frm.v_cum_plt[0].style.color = "red";
		}
		else{
			if(strToNum(document.frm.v_cum_plt.value) < 12)
				document.frm.v_cum_plt.style.color = "red";
		}
	}
	
	// div의 display를 block으로 변경
	if( divTotalPlt.style.display == "NONE" 
		|| divTotalPlt.style.display == "none" ) {
		divTotalPlt.style.display = "block";
	} 
}

function allCheckFlag(){
	var tableLen = left_tbody.rows.length;
	
	if(document.frm.all_check_flag.checked){	// check 되어 있는 경우.
		for(var i = 0; i < tableLen-1; i++){
			if( document.frm.check_flag[i] ) 
				document.frm.check_flag[i].checked = true;	
			else
				document.frm.check_flag.checked = true;
		}
	}
	else{	// check가 해제된 경우.
		for(var i = 0; i < tableLen-1; i++){
			if( document.frm.check_flag[i] ) 
				document.frm.check_flag[i].checked = false;
			else
				document.frm.check_flag.checked = false;
		}
	}
	
}


// 해당 플레그에대한 기준으로 쿼리 정렬
function doCheckFlag(obj){
	
	
	if(obj.name == "sort_type_chk" ){ 
		if(obj.checked){
				document.frm.sort_type.value = "Y";// 촐고장 기준으로 조회
		}else{
				document.frm.sort_type.value = "N";//일자 기준으로 조회
		}
	}
}
