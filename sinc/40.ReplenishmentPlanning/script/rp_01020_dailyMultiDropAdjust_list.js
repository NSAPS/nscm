////////////////////////////////////////////////////////////
// 프로그램ID : rp_01020_dailyMultiDropAdjust_list.js
// 프로그램명 : Route 수송 조회 및 조정 (현재 사용 하지 않음)
// 개발자  : 허준성
// 개발일자 : 2008-08-19 화요일
//
//관련 job file : job_sinc_40_replenishmentPlanning.xml
//
//관련 query file : query_sinc_40_replenishmentPlanning.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-19  허준성     rp_01020_dailyMultiDropAdjust_list.js 개발
//
//
////////////////////////////////////////////////////////////

// 클릭한 라인 인덱스
var clickedLineIdx = null;
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
var popImgIdx = null;

// 클릭한 수송일자 인덱스
var clickedDateIdx = null;

// input box 를 Edit Mode 로 변환
// onClick
function setEditMode( objTd ) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	// 제품코드 검색 셀인경우
	if( objTd.childNodes(0).id == "divItemId" ) {
		objTd.childNodes(1).childNodes(0).focus();
	}else {
		//objTd.childNodes(1).select();
		objTd.childNodes(1).focus();
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
	
	// 제품코드 검색 셀인경우
	//if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
	if( objBox.name == "item_id" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
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
	
	// 기본재고상차BOX, 추가재고상차BOX, 생산상차BOX 입력창인 경우, 숫자 체크 & 천단위 구분자 표시
	if( objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box" ) {
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
		// PLT 수량 계산
		calPltQty(objBox);
		// 기본재고상차BOX 인 경우 누적상차집계 계산
		if( objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box") {
			calCum();
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
		else if( objBox.name == "add_stk_box" ) { // 추가재고상차
			var pltBox = document.frm.add_stk_plt[rowIdx];
			var pltDiv = divAddPlt[rowIdx];
		}
		else if( objBox.name == "prod_box" ) { // 생산상차
			var pltBox = document.frm.prod_plt[rowIdx];
			var pltDiv = divProdPlt[rowIdx];
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
		else if( objBox.name == "add_stk_box" ) { // 추가재고상차
			var pltBox = document.frm.add_stk_plt;
			var pltDiv = divAddPlt;
		}
		else if( objBox.name == "prod_box" ) { // 생산상차
			var pltBox = document.frm.prod_plt;
			var pltDiv = divProdPlt;
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
		var pltQty = boxQty / boxPerPalet;
		var pltStr = numberFormat(pltQty.toString());
	}
	
	pltBox.value = delComma(pltStr);
	pltDiv.innerHTML = fixedPoint(pltStr, 2) + "&nbsp;";
	
}

// 출고장, 차량순번, RTE순번이 변경에 따라 Row의 색깔을 변경하는 function
function setBgColors(){
	var tableLen = left_tbody.rows.length;
	var preTgtLoc = null;
	var preTruckSeq = null;
	var preRteSeq = null;
	var check_color = 0;
	
	for( var i = 0 ; i < tableLen ; i++ ) {
		if( document.frm.cum_box[i] ) {
			
			// 출고장, 차량순번이 같은 경우
			if( document.frm.tgt_loc[i].value == preTgtLoc && document.frm.truck_seq[i].value == preTruckSeq 
			    && document.frm.rte_seq[i].value == preRteSeq) {
				
				if(check_color > 1 && check_color%2 == 0) {
					left_tbody.rows[i].style.backgroundColor = "#d0b8f1"; 
					main_tbody.rows[i].style.backgroundColor = "#d0b8f1"; 
				}else{
					left_tbody.rows[i].style.backgroundColor = "#ffffff"; 
					main_tbody.rows[i].style.backgroundColor = "#ffffff";
				}
				
			}
			// 출고장, 차량순번이 다른 경우.
			else {
				++check_color;
				if(check_color > 1 && check_color%2 == 0) {
					left_tbody.rows[i].style.backgroundColor = "#d0b8f1"; 
					main_tbody.rows[i].style.backgroundColor = "#d0b8f1"; 
				}else{
					left_tbody.rows[i].style.backgroundColor = "#ffffff"; 
					main_tbody.rows[i].style.backgroundColor = "#ffffff";
				}
			}
			
			preTgtLoc = document.frm.tgt_loc[i].value;
			preTruckSeq = document.frm.truck_seq[i].value;
			preRteSeq = document.frm.rte_seq[i].value;
		}
	}
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#d0b8f1" ) {
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
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#d0b8f1" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	}
	
}


// 누적상차집계 계산
function calCum() {
	
	var tableLen = left_tbody.rows.length;
	var preTgtLoc = null;
	var preTruckSeq = null;
	var preRteSeq = null;
	var cumBox = 0;
	var cumPlt = 0;

	for( var i = 0 ; i < tableLen ; i++ ) {
		if( document.frm.cum_box[i] ) {
			
			// 출고장, 차량순번이 같은 데이터 누적 집계
			if( document.frm.tgt_loc[i].value == preTgtLoc && document.frm.truck_seq[i].value == preTruckSeq 
			    && document.frm.rte_seq[i].value == preRteSeq) {
				
				cumBox += strToNum(document.frm.base_stk_box[i].value);
				cumBox += strToNum(document.frm.add_stk_box[i].value);
				cumBox += strToNum(document.frm.prod_box[i].value);
				cumPlt += strToNum(document.frm.base_stk_plt[i].value);
				cumPlt += strToNum(document.frm.add_stk_plt[i].value);
				cumPlt += strToNum(document.frm.prod_plt[i].value);
			}
			// 출고장, 차량순번이 다르면 누적 초기화
			else {
				cumBox =  strToNum(document.frm.base_stk_box[i].value);
				cumBox += strToNum(document.frm.add_stk_box[i].value);
				cumBox += strToNum(document.frm.prod_box[i].value);
				cumPlt =  strToNum(document.frm.base_stk_plt[i].value);
				cumPlt += strToNum(document.frm.add_stk_plt[i].value);
				cumPlt += strToNum(document.frm.prod_plt[i].value);
			}
			document.frm.cum_box[i].value = cumBox;
			divCumBox[i].innerHTML = numberFormat(cumBox.toString()) + "&nbsp;";
			document.frm.cum_plt[i].value = cumPlt;
			divCumPlt[i].innerHTML = fixedPoint(numberFormat(cumPlt.toString()), 2) + "&nbsp;";
			
			var boxPerPaletStr = document.frm.box_per_palet[i].value;
			// PALET 당 BOX 수량이 없는 경우 1 로 계산
			if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
				var boxPerPalet = 1;
			}
			else {
				var boxPerPalet = Number(delComma(boxPerPaletStr));
			}
			
			// BOX 입력창이 비어 있는 경우
			if( cumBox == null || cumBox == "" ) {
				divCumPlt[i].innerHTML = "&nbsp;";
			}
			
			preTgtLoc = document.frm.tgt_loc[i].value;
			preTruckSeq = document.frm.truck_seq[i].value;
			preRteSeq = document.frm.rte_seq[i].value;
		}
		else {
			cumBox = strToNum(document.frm.base_stk_box.value);
			cumBox += strToNum(document.frm.add_stk_box.value);
			cumBox += strToNum(document.frm.prod_box.value);
			document.frm.cum_box.value = cumBox;
			divCumBox.innerHTML = numberFormat(cumBox.toString()) + "&nbsp;";
			
			cumPlt = strToNum(document.frm.base_stk_plt.value);
			cumPlt += strToNum(document.frm.add_stk_plt.value);
			cumPlt += strToNum(document.frm.prod_plt.value);
			
			document.frm.cum_plt.value = cumPlt;
			divCumPlt.innerHTML = fixedPoint(numberFormat(cumPlt.toString()), 2) + "&nbsp;";
		}
	}
	
}


// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRow( objBtn ) {
	
	var tmp_routeid = document.frm.route_id.value;
	
	if(tmp_routeid == "" || tmp_routeid == null){
		alert("먼저 ROUTE ID를 선택하신 후 조회를 클릭해 주십시요!");
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
	var oRowLeft = left_tbody.insertRow(insertRowIndex);
	var oRowMain = main_tbody.insertRow(insertRowIndex);
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout  = function() { bgOut(this); }; 
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout  = function() { bgOut(this); }; 
	oRowMain.height = 22;
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 삭제
	var oCell2 = oRowLeft.insertCell(); // 입고장
	var oCell3 = oRowLeft.insertCell(); // 차량순번
	var oCell4 = oRowLeft.insertCell(); // RTE순번	
	var oCell5  = oRowLeft.insertCell(); // 제품코드
	var oCell6  = oRowLeft.insertCell(); // 제품명
	
	var oCell7  = oRowMain.insertCell(); // 누적상차집계 PLT
	var oCell8  = oRowMain.insertCell(); // 누적상차집계 BOX
	var oCell9  = oRowMain.insertCell(); // 기본재고상차 PLT
	var oCell10 = oRowMain.insertCell(); // 기본재고상차 BOX
	var oCell11 = oRowMain.insertCell(); // 추가재고상차 PLT
	var oCell12 = oRowMain.insertCell(); // 추가재고상차 BOX
	var oCell13 = oRowMain.insertCell(); // 생산상차 PLT
	var oCell14 = oRowMain.insertCell(); // 생산상차 BOX
	
	
	oCell2.onclick = function() { setEditMode(this); }; // 입고장
	oCell3.onclick = function() { setEditMode(this); }; // 차량순번
	oCell4.onclick = function() { setEditMode(this); }; // RTE순번	
	oCell5.onclick  = function() { setEditMode(this); }; // 제품코드
	
	oCell10.onclick  = function() { setEditMode(this); }; // 기본재고상차 BOX
	oCell12.onclick = function() { setEditMode(this); }; // 추가재고상차 BOX
	oCell14.onclick = function() { setEditMode(this); }; // 생산상차 BOX
	
	oCell0.align = "center"; oCell0.width = "30px" ;  // 번호
	oCell1.align = "center"; oCell1.width = "40px" ;  // 삭제
	oCell2.align = "left";   oCell2.width = "140px" ; // 입고장
	oCell3.align = "center"; oCell3.width = "40px" ;  // 차량순번
	oCell4.align = "center"; oCell4.width = "40px";   // RTE순번	
	oCell5.align  = "center"; oCell5.width  = "110px";  // 제품코드
	oCell6.align  = "left";   oCell6.width  = "170px"; // 제품명
	
	oCell7.align  = "right";  oCell7.width  = "80px" ; // 누적상차집계 PLT
	oCell8.align  = "right";  oCell8.width  = "80px" ; // 누적상차집계 BOX
	oCell9.align  = "right";  oCell9.width  = "80px" ; // 기본재고상차 PLT
	oCell10.align = "right";  oCell10.width = "80px" ; // 기본재고상차 BOX
	oCell11.align = "right";  oCell11.width = "80px" ; // 추가재고상차 PLT
	oCell12.align = "right";  oCell12.width = "80px" ; // 추가재고상차 BOX
	oCell13.align = "right";  oCell13.width = "80px" ; // 생산상차 PLT
	oCell14.align = "right";  oCell14.width = "80px" ; oCell14.className = "right";// 생산상차 BOX
	
	
	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// 삭제
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// 입고장
	oCell2.innerHTML = "<a id=\"divTgtLoc\"></a>" + selStrTgtLoc;
	// 차량순번
	oCell3.innerHTML = "<a id=\"divTruckSeq\"></a><input " 
						+ "type=\"text\" name=\"truck_seq\" class=\"normal\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); calCum();\" size=\"2\" maxlength=\"2\" "
						+ "style=\"width:100%; display:none; text-align:center; \" onDblClick=\"this.select(); \"> ";
	// RTE순번
	oCell4.innerHTML = "<a id=\"divRteSeq\"></a><input " 
						+ "type=\"text\" name=\"rte_seq\" class=\"normal\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); calCum();\" size=\"3\" maxlength=\"3\" "
						+ "style=\"width:100%; display:none; text-align:center; \" onDblClick=\"this.select(); \">";
	
	// 제품코드
	oCell5.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemInput\" style=\"display:none; \"><input type=\"text\" "
						+ "name=\"item_id\" class=\"normal\" size=\"100\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); calCum();\" "
						+ "onChange=\"getBoxPerPalet(this); getItemInfo(this); \" "
						+ "style=\"width:79px; padding-left:5px; \"><img name=\"imgItemId\" tabindex=\"-1\" "
						+ "src=\"sinc/template/basic/skin/nongshim/images/common/icon_search.gif\" align=\"absmiddle\" "
						+ "border=\"0\" onClick=\"openItemSearchPop(this); \" style=\"cursor:pointer; \" "
						+ "onMouseOver=\"overImg(this); \" onMouseOut=\"outImg(this); \"></a>";
	// 제품명
	oCell6.innerHTML = "<a id=\"divItemName\"></a><input type=\"hidden\" name=\"item_name\" >";
	
	// 누적상차집계 PLT
	oCell7.innerHTML = "<a id=\"divCumPlt\"></a><input type=\"hidden\" name=\"cum_plt\">";
	// 누적상차집계 BOX
	oCell8.innerHTML = "<a id=\"divCumBox\"></a><input type=\"hidden\" name=\"cum_box\">";
	// 기본재고상차 PLT
	oCell9.innerHTML = "<a id=\"divBasePlt\"></a><input type=\"hidden\" name=\"base_stk_plt\">";
	// 기본재고상차 BOX
	oCell10.innerHTML = "<a id=\"divBaseBox\"></a><input type=\"text\" name=\"base_stk_box\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:right; \">";
	// 추가재고상차 PLT
	oCell11.innerHTML = "<a id=\"divAddPlt\"></a><input type=\"hidden\" name=\"add_stk_plt\">";
	// 추가재고상차 BOX
	oCell12.innerHTML = "<a id=\"divAddBox\"></a><input type=\"text\" name=\"add_stk_box\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:right; \">";
	// 생산상차 PLT
	oCell13.innerHTML = "<a id=\"divProdPlt\"></a><input type=\"hidden\" name=\"prod_plt\">";
	// 생산상차 BOX
	oCell14.innerHTML = "<a id=\"divProdBox\"></a><input type=\"text\" name=\"prod_box\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:right; \">";
	
	document.recalc();
	setRowNo();
	
}

// 번호 setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	areaTot.innerHTML = tableLen;
	
	var clickedFlag = false; // 체크한 라인이 있는지 여부
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
			// 체크가 되어있는 라인이면 clickedLineIdx 설정
			if( left_tbody.rows[i].style.backgroundColor == "#d0b8f1" ) {
				clickedLineIdx = i;
				clickedFlag = true;
			}
		}
		else {
			divRowNo.innerHTML = "1";
			// 체크가 되어있는 라인이면 clickedLineIdx 설정
			if( left_tbody.rows[0].style.backgroundColor == "#d0b8f1" ) {
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

// row 삭제 
// parameter : button object
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	
	if( tableLen > 0 )
	{
		delRowDo( delRowIdx );
		if(tableLen != 1)
			rowFormed();
	}
	setRowNo();
	calCum();
	
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
	var objBtn = "";
	delRowDo( tableLen - 1 );
	
	tableLen = left_tbody.rows.length;
	//if( document.frm.btnAddRow[0] ) {
	if( tableLen > 1 ) {
		objBtn = document.frm.btnAddRow[tableLen-1];
	}else if( tableLen == 1 ) {
		if( document.frm.btnAddRow[0] ) {
			var objBtn = document.frm.btnAddRow[0];
		}
		else{
			var objBtn = document.frm.btnAddRow;
		}
	}else {
		objBtn = areaAdd;
	}
	//addRow(left_tbody.rows.length);
	
	addRow(objBtn);
	setLastRow();
} 

var arrData = new Array(14); 
// 최 하단 라인 데이터 기억
function memLastRow() {
	var tableLen = left_tbody.rows.length;

	if( document.frm.truck_seq[tableLen-1]) {
		arrData[0] 	= document.frm.tgt_loc[tableLen-1].value;      // 입고장
		if(document.frm.truck_seq[tableLen-1])
			arrData[1] 	= document.frm.truck_seq[tableLen-1].value;    // 차량순번
		else
			arrData[1] 	= document.frm.truck_seq.value;    // 차량순번
		if(document.frm.rte_seq[tableLen-1])
			arrData[2] 	= document.frm.rte_seq[tableLen-1].value;      // RTE순번
		else
			arrData[2] 	= document.frm.rte_seq.value;      // RTE순번
		if(document.frm.item_id[tableLen-1])
			arrData[3] 	= document.frm.item_id[tableLen-1].value;      // 제품코드
		else
			arrData[3] 	= document.frm.item_id.value;      // 제품코드
		if(document.frm.item_name[tableLen-1])
			arrData[4] 	= document.frm.item_name[tableLen-1].value;    // 제품명
		else
			arrData[4] 	= document.frm.item_name.value;    // 제품명
		arrData[5] 	= document.frm.base_stk_plt[tableLen-1].value; // 기본재고상차 PLT
		arrData[6] 	= document.frm.base_stk_box[tableLen-1].value; // 기본재고상차 BOX
		arrData[7] 	= document.frm.add_stk_plt[tableLen-1].value;  // 추가재고상차 PLT
		arrData[8] 	= document.frm.add_stk_box[tableLen-1].value;  // 추가재고상차 BOX
		arrData[9]  = document.frm.prod_plt[tableLen-1].value;     // 생산상차 PLT
		arrData[10] = document.frm.prod_box[tableLen-1].value;     // 생산상차 BOX
		arrData[11] = document.frm.cum_plt[tableLen-1].value;      // 누적상차집계 PLT
		arrData[12] = document.frm.cum_box[tableLen-1].value;      // 누적상차집계 BOX
		arrData[13] = left_tbody.rows[tableLen-1].style.backgroundColor; // 체크 color
	}
	else {
		arrData[0] 	= document.frm.tgt_loc.value;      // 입고장
		arrData[1] 	= document.frm.truck_seq.value;    // 차량순번
		arrData[2] 	= document.frm.rte_seq.value;      // RTE순번
		arrData[3] 	= document.frm.item_id.value;      // 제품코드
		arrData[4] 	= document.frm.item_name.value;    // 제품명
		arrData[5] 	= document.frm.base_stk_plt.value; // 기본재고상차 PLT
		arrData[6] 	= document.frm.base_stk_box.value; // 기본재고상차 BOX
		arrData[7] 	= document.frm.add_stk_plt.value;  // 추가재고상차 PLT
		arrData[8] 	= document.frm.add_stk_box.value;  // 추가재고상차 BOX
		arrData[9]  = document.frm.prod_plt.value;     // 생산상차 PLT
		arrData[10] = document.frm.prod_box.value;     // 생산상차 BOX
		arrData[11] = document.frm.cum_plt.value;      // 누적상차집계 PLT
		arrData[12] = document.frm.cum_box.value;      // 누적상차집계 BOX
		arrData[13] = left_tbody.rows[0].style.backgroundColor; // 체크 color
	}
}

// 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.truck_seq[tableLen-1]) {
		document.frm.tgt_loc[tableLen-1].value 	    = arrData[0];  // 입고장
		if(document.frm.truck_seq[tableLen-1])
			document.frm.truck_seq[tableLen-1].value 	= arrData[1];  // 차량순번
		else
			document.frm.truck_seq.value 	= arrData[1];  // 차량순번
		if(document.frm.rte_seq[tableLen-1])
			document.frm.rte_seq[tableLen-1].value 		= arrData[2];  // RTE순번
		else
			document.frm.rte_seq.value 		= arrData[2];  // RTE순번
		if(document.frm.item_id[tableLen-1])
			document.frm.item_id[tableLen-1].value 		= arrData[3];  // 제품코드
		else
			document.frm.item_id.value 		= arrData[3];  // 제품코드
		if(document.frm.item_name[tableLen-1])
			document.frm.item_name[tableLen-1].value 	= arrData[4];  // 제품명
		else
			document.frm.item_name.value 	= arrData[4];  // 제품명
		document.frm.base_stk_plt[tableLen-1].value = arrData[5];  // 기본재고상차 PLT
		document.frm.base_stk_box[tableLen-1].value = arrData[6];  // 기본재고상차 BOX
		document.frm.add_stk_plt[tableLen-1].value 	= arrData[7];  // 추가재고상차 PLT
		document.frm.add_stk_box[tableLen-1].value 	= arrData[8];  // 추가재고상차 BOX
		document.frm.prod_plt[tableLen-1].value 	= arrData[9];  // 생산상차 PLT
		document.frm.prod_box[tableLen-1].value 	= arrData[10]; // 생산상차 BOX
		document.frm.cum_plt[tableLen-1].value 		= arrData[11]; // 누적상차집계 PLT
		document.frm.cum_box[tableLen-1].value 		= arrData[12]; // 누적상차집계 BOX
		left_tbody.rows[tableLen-1].style.backgroundColor = arrData[13]; // 체크 color
		main_tbody.rows[tableLen-1].style.backgroundColor = arrData[13]; // 체크 color
		
		setViewMode(document.frm.tgt_loc[tableLen-1]);
		if(divTruckSeq[tableLen-1]){
			divTruckSeq[tableLen-1].innerHTML 	= arrData[1]; // 차량순번
			divRteSeq[tableLen-1].innerHTML 	= arrData[2]; // RTE순번
			divItemId[tableLen-1].innerHTML 	= arrData[3]; // 제품코드
			divItemName[tableLen-1].innerHTML 	= "&nbsp;" + arrData[4]; // 제품명
			divBasePlt[tableLen-1].innerHTML 	= fixedPoint(arrData[5], 2) + "&nbsp;";  // 기본재고상차 PLT
			divBaseBox[tableLen-1].innerHTML 	= arrData[6] + "&nbsp;";  				 // 기본재고상차 BOX
			divAddPlt[tableLen-1].innerHTML 	= fixedPoint(arrData[7], 2) + "&nbsp;";  // 추가재고상차 PLT
			divAddBox[tableLen-1].innerHTML 	= arrData[8] + "&nbsp;";  				 // 추가재고상차 BOX
			divProdPlt[tableLen-1].innerHTML 	= fixedPoint(arrData[9], 2) + "&nbsp;"; // 생산상차 PLT
			divProdBox[tableLen-1].innerHTML 	= arrData[10] + "&nbsp;"; 				 // 생산상차 BOX
			divCumPlt[tableLen-1].innerHTML 	= fixedPoint(arrData[11], 2) + "&nbsp;"; // 누적상차집계 PLT
			divCumBox[tableLen-1].innerHTML 	= arrData[12] + "&nbsp;"; 				 // 누적상차집계 BOX
		}
		else{
			divTruckSeq.innerHTML 	= arrData[1]; // 차량순번
			divRteSeq.innerHTML 	= arrData[2]; // RTE순번
			divItemId.innerHTML 	= arrData[3]; // 제품코드
			divItemName.innerHTML 	= "&nbsp;" + arrData[4]; // 제품명
			divBasePlt.innerHTML 	= fixedPoint(arrData[5], 2) + "&nbsp;";  // 기본재고상차 PLT
			divBaseBox.innerHTML 	= arrData[6] + "&nbsp;";  				 // 기본재고상차 BOX
			divAddPlt.innerHTML 	= fixedPoint(arrData[7], 2) + "&nbsp;";  // 추가재고상차 PLT
			divAddBox.innerHTML 	= arrData[8] + "&nbsp;";  				 // 추가재고상차 BOX
			divProdPlt.innerHTML 	= fixedPoint(arrData[9], 2) + "&nbsp;"; // 생산상차 PLT
			divProdBox.innerHTML 	= arrData[10] + "&nbsp;"; 				 // 생산상차 BOX
			divCumPlt.innerHTML 	= fixedPoint(arrData[11], 2) + "&nbsp;"; // 누적상차집계 PLT
			divCumBox.innerHTML 	= arrData[12] + "&nbsp;"; 				 // 누적상차집계 BOX			
		}
	}
	else {
		document.frm.tgt_loc.value 	    = arrData[0];  // 입고장
		document.frm.truck_seq.value 	= arrData[1];  // 차량순번
		document.frm.rte_seq.value 		= arrData[2];  // RTE순번
		document.frm.item_id.value 		= arrData[3];  // 제품코드
		document.frm.item_name.value 	= arrData[4];  // 제품명
		document.frm.base_stk_plt.value = arrData[5];  // 기본재고상차 PLT
		document.frm.base_stk_box.value = arrData[6];  // 기본재고상차 BOX
		document.frm.add_stk_plt.value 	= arrData[7];  // 추가재고상차 PLT
		document.frm.add_stk_box.value 	= arrData[8];  // 추가재고상차 BOX
		document.frm.prod_plt.value 	= arrData[9];  // 생산상차 PLT
		document.frm.prod_box.value 	= arrData[10]; // 생산상차 BOX
		document.frm.cum_plt.value 		= arrData[11]; // 누적상차집계 PLT
		document.frm.cum_box.value 		= arrData[12]; // 누적상차집계 BOX
		left_tbody.rows[0].style.backgroundColor = arrData[13]; // 체크 color
		main_tbody.rows[0].style.backgroundColor = arrData[13]; // 체크 color
		
		divTgtLoc.innerHTML 	= arrData[0]; // 입고장
		setViewMode(document.frm.tgt_loc);
		divTruckSeq.innerHTML 	= arrData[1]; // 차량순번
		divRteSeq.innerHTML 	= arrData[2]; // RTE순번
		//divSrcLoc.innerHTML 	= arrData[2]; // 출고장
		//setViewMode(document.frm.src_loc); 	  // 출고장
		divItemId.innerHTML 	= arrData[3]; // 제품코드
		divItemName.innerHTML 	= "&nbsp;" + arrData[4]; // 제품명
		divBasePlt.innerHTML 	= fixedPoint(arrData[5], 2) + "&nbsp;";  // 기본재고상차 PLT
		divBaseBox.innerHTML 	= arrData[6] + "&nbsp;";  				 // 기본재고상차 BOX
		divAddPlt.innerHTML 	= fixedPoint(arrData[7], 2) + "&nbsp;";  // 추가재고상차 PLT
		divAddBox.innerHTML 	= arrData[8] + "&nbsp;";  				 // 추가재고상차 BOX
		divProdPlt.innerHTML 	= fixedPoint(arrData[9], 2) + "&nbsp;"; // 생산상차 PLT
		divProdBox.innerHTML 	= arrData[10] + "&nbsp;"; 				 // 생산상차 BOX
		divCumPlt.innerHTML 	= fixedPoint(arrData[11], 2) + "&nbsp;"; // 누적상차집계 PLT
		divCumBox.innerHTML 	= arrData[12] + "&nbsp;"; 				 // 누적상차집계 BOX
	}
	
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
		// 입고장 --> 차량순번
		if( objName == "tgt_loc" ) {
			objTdG = left_tbody.rows[rowIdx].cells[3];
		}
		// 차량순번 --> RTE순번
		else if( objName == "truck_seq" ) {
			objTdG = left_tbody.rows[rowIdx].cells[4];
		}
		// RTE순번 --> 제품코드
		else if( objName == "rte_seq" ) {
			objTdG = left_tbody.rows[rowIdx].cells[5];
		}
		// 제품코드 --> 기본재고상차 BOX
		else if( objName == "item_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// 기본재고상차 BOX --> 추가재고상차 BOX
		else if( objName == "base_stk_box" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// 추가재고상차 BOX --> 생산상차 BOX
		else if( objName == "add_stk_box" ) {
			objTdG = main_tbody.rows[rowIdx].cells[7];
		}
		// 생산상차 BOX --> 다음줄 입고장
		else if( objName == "prod_box" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[2];
			}
			// 다음줄의 첫번째 로 이동
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[2];
			}
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
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

// src_log, route_seq 분리
function setRouteId( route_id ) {
	
	var routeArr = route_id.split("!%!");
	if( routeArr.length == 2 ) {
		document.frm.src_loc.value = routeArr[0].trim();
		document.frm.loc_seq.value = routeArr[1].trim();
	}
	
}

// 제품 검색 POPUP
function openItemSearchPop( obj ) { 
	
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	var src_loc = document.frm.src_loc.value;
	if( document.frm.item_id[0] ) {
		var code_input = document.frm.item_id[rowIdx].value.trim();
		document.frm.item_id[rowIdx].value = code_input;
		var tgt_loc = document.frm.tgt_loc[rowIdx].value;
		document.frm.item_id[rowIdx].select();
	}
	else {
		var code_input = document.frm.item_id.value.trim();
		document.frm.item_id.value = code_input;
		var tgt_loc = document.frm.tgt_loc.value;
		document.frm.item_id.select();
	}
	
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("입고장를 먼저 선택하세요.");
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
		var dc_id = document.frm.src_loc.value;
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
	
	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_05010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
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

// 사용자 직접 입력값으로부터 제품정보 조회
// 제품 코드, 제품 명 둘 중 하나라도 일치하는 데이터 검색
function getItemInfo( obj ) {
	
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	
	if( document.frm.item_id[rowIdx] ) {
		var dc_id = document.frm.src_loc.value;
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
		alert("ROUTE ID를 먼저 선택하세요.");
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
	
	replenishPlan.getItemInfo(dc_id, input_value, "rp_05010_dailyTransportPlanSalesInfo_search_item_id", { 
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
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}

// Save 버튼을 눌렀을때, 저장되는 데이타가 PK값을 입력했는지 체크
function checkSavePkData(){
	var tableLen = left_tbody.rows.length;
	var f = document.frm;
	
	if(tableLen == 0){
		alert("입력할 데이타가 존재하지 않습니다.");
		return true;
	}else if(tableLen == 1){
		if( f.tgt_loc.value == null || f.tgt_loc.value == "" ){
			alert("입고장을 입력해 주십시요");
			return true;
		}else if(f.truck_seq.value == null || f.truck_seq.value == "" ){
			alert("차량순번을 입력해 주십시요");
			return true;
		}else if(f.item_id.value == null || f.item_id.value == "" ){
			alert("제품코드를 입력해 주십시요");
			return true;
		} 		
		
	}else{
		for( var i = 0 ; i < tableLen ; ++i ) {
			if( f.tgt_loc[i].value == null || f.tgt_loc[i].value == "" ){
				alert("입고장을 입력해 주십시요");
				return true;
			}else if(f.truck_seq[i].value == null || f.truck_seq[i].value == "" ){
				alert("차량순번을 입력해 주십시요");
				return true;
			}else if(f.item_id[i].value == null || f.item_id[i].value == "" ){
				alert("제품코드를 입력해 주십시요");
				return true;
			} 		 
		}
	}	
}

// 저장 버튼 클릭
function GoSave(service) {
	
	var src_loc = document.frm.src_loc.value;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	// ROUTE ID를 선택하지 않은 경우
	if( src_loc == null || src_loc == "" ) {
		alert("ROUTE ID를 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	// 버전, 차수를 선택하지 않은 경우
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("버전을 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");
		return;
	}
	
	if( checkSavePkData() ) // Save 버튼을 눌렀을때, 저장되는 데이타가 PK값을 입력했는지 체크
		return;
	
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
	
	var route_id = document.frm.route_id.value;
	
	// ROUTE_ID를 선택하지 않은 경우
	if( route_id == "" ) {
		alert("ROUTE ID를 선택해 주십시요.");
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
