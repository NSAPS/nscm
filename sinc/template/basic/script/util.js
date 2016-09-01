
// Single Quotation Mark 추가
function addQuote(data_str, data_type){	
	var newData = "";
    	if(data_str != null && data_type != null){
    		var check_string = data_type.substring(0, 3).toLowerCase();
    		if(check_string == 'var' || check_string == 'dat' || check_string == 'cha'){
    			newData = "'"+data_str+"'";
    		}else{
    			newData = data_str;
    		}
    	}	
    	return newData;
}

// Single Quotation Mark & Percent Sign 추가
function addQuotePercent(data_str, data_type){
	var newData = "";
    	if(data_str != null && data_type != null){    		
    		var check_string = data_type.substring(0, 3).toLowerCase();
    		if(check_string == 'var' || check_string == 'dat' || check_string == 'cha'){
    			newData = "'%"+data_str+"%'";
    		}else{
    			newData = "%"+data_str+"%";
    		}
    	}
    	return newData;	
}

// 영역 숨김/펼침
function OpenClose(id_num){			
	if(id_num.style.display == 'none'){
		id_num.style.display = 'block';
	}else{
		id_num.style.display = 'none';
	}
}

// 페이지 이동
function GoPaging(service, perpage, pagenumber){
	//alert(service);
	//alert(perpage);
	//alert(pagenumber);
	document.frm._moon_service.value = service; 
	document.frm._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = pagenumber; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

// 페이지 이동2
function GoPagingOption(service, perpage, pagenumber) {
	//alert(service);
	//alert(perpage);
	//alert(pagenumber);
	document.frm._moon_service.value = service; 
	document.frm._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = pagenumber; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

// 새창열기(스크롤바 필요시 scrollbar : yes <--> no)
function OpenWin(url,winName,top,left,width,height,scrollbar)
{
	var newWin = window.open(url,winName,"toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=" + scrollbar + ",resizable=yes,copyhistory=no,top=" + top + ",left=" + left + ",width=" + width + ",height=" + height);
	newWin.focus();
}

// Service Name 으로 새창열기
function OpenWin2(service,width,height)
{
	var newWin = window.open('about:blank',service,"toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=auto,resizable=yes,copyhistory=no,,width=" + width + ",height=" + height);
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = service;
	document.frm.submit();
}


/* ********************************************* */
/* 여기서부터 새로 추가한 내용 2007.07.26 by TJ ***** */
/* ********************************************* */

// 공백 제거
String.prototype.trim = function(){
	// Use a regular expression to replace leading and trailing 
	// spaces with the empty string
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

// enter check 용 
function enterCheck(frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			// 자기화면 갱신
			GoSearch(frm_name);
		}
	} 
	
}

// enter 입력시 tab 으로 변환  
function enterToTapCheck(){
	
	if(event.keyCode =='13'){
		event.keyCode = '9'; 
	} 
	
}

// 입력문자로부터 특수문자 체크
function pressedStrCheck(){
	
	var objEv = event.srcElement;
	var chkStr = objEv.value + String.fromCharCode(event.keyCode); 
	var strPattern = /[!#$*?\\']/;
	
	if(strPattern.test(chkStr)){
		alert("입력 데이터에 특수문자\(\'!\', \'#\', \'$\', \'*\', \'?\', \'\\', \'\'\'\)가 포함되어 있습니다.");
		event.keyCode = null; 
		return false;
	}
	
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
		objSetting(obj, defaultVal, alertMsg); 
		return false;
	}
	
	for (i=0; i < checkValue.length; i++) {
		
		ch = checkValue.charAt(i);
		
		// invalid value 
		if(ch==" ")
		{ 
			objSetting(obj, defaultVal, alertMsg); 
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
				objSetting(obj, defaultVal, alertMsg); 
				return false;
			} 
		} 
		
		// valid value : minus sign 
		else if ( i == 0 && ch == '-' && type != "BLANK_INT_UP" && type != "ZERO_INT_UP" ) 
		{ } 
		
		// invalid value 
		else 
		{
			objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
	}
	
	obj.value = checkValue; 
	return true;
	
}

// checkNum 함수에서 잘못된 값을 받은 경우 default value Setting 
function objSetting( obj, setVal, alertMsg ) { 
	
	alert(alertMsg); 
	obj.value = setVal;
	obj.select(); 
	
} 

// 날짜 형식을 체크하는 함수, return value : 1-맞는 형식, 0-잘못된 형식 
// parameter : obj = input box object, dateSize = date type size 
// dateSize = 4 : yyyy 
// dateSize = 6 : yyyyMM, dateSize = 7 : yyyy-MM 
// dateSize = 8 : yyyyMMdd, dateSize = 10 : yyyy-MM-dd 
// 공백은 skip
function chkDate(obj, dateSize) {
	
	var separator = "-"; 
	if( Number(dateSize) == 7 || Number(dateSize) == 10 ) 
		createDateDelimiter(obj, separator); 
	
	var input = obj.value.trim(); 
	
	if ( input.length == 0 ) return 1; // 공백은 skip
	
	if( Number(dateSize) == 4 ) 
	{ 
		var dateType = "yyyy"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = "01"; 
		var inputDate = "01"; 
	} 
	else if( Number(dateSize) == 6 ) 
	{ 
		var dateType = "yyyyMM"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = input.substr(4,2) - 1; 
		var inputDate = "01"; 
	} 
	else if( Number(dateSize) == 7 ) 
	{ 
		var dateType = "yyyy-MM"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = input.substr(5,2) - 1; 
		var inputDate = "01"; 
		if( input.substr(4,1) != "-" && input.substr(4,1) != "/" ) 
		{ 
			separator = "invalid"; 
		} 
	} 
	else if( Number(dateSize) == 8 ) 
	{ 
		var dateType = "yyyyMMdd"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = input.substr(4,2) - 1; 
		var inputDate = input.substr(6,2); 
	} 
	else if( Number(dateSize) == 10 ) 
	{ 
		var dateType = "yyyy-MM-dd"; 
		var inputYear = input.substr(0,4); 
		var inputMonth = input.substr(5,2) - 1; 
		var inputDate = input.substr(8,2); 
		if( (input.substr(4,1) != "-" && input.substr(4,1) != "/") || (input.substr(7,1) != "-" && input.substr(7,1) != "/") ) 
		{ 
			separator = "invalid"; 
		} 
	} 
	
	var resultDate = new Date(inputYear, inputMonth, inputDate); 
	if ( resultDate.getFullYear() != inputYear || resultDate.getMonth() != inputMonth || resultDate.getDate() != inputDate || input.length != Number(dateSize) || separator == "invalid" ) 
	{ 
		obj.value = ""; 
		obj.select(); 
		alertChkDate(input, dateType); 
		return 0; 
	} 
	else 
	{ 
		return 1; 
	} 
	
}

// chkDate() 함수에서 alert 창 띄우는 함수
// alert 창의 내용이 다른 경우 - 로컬 스크립트 파일에 재정의
function alertChkDate(input, format) {
	
	alert( input + " 은(는) 올바른 날짜 형식이 아닙니다.\n( 입력형식 : " + format + " )" ); 
	
} 

// date 검사 전 구분자 자동 생성 
// 사용자가 delimiter 를 입력하지 않아도 자동으로 delimiter 를 생성하기 위해 
function createDateDelimiter( obj, delimiter ) { 
	
	var str = obj.value.trim(); 
	str = str.replace(/\//g, '').replace(/-/g, ''); 
	var returnVal = str; 
	if( str.length > 4 ) 
	{ 
		returnVal = str.substr(0, 4) + delimiter + str.substr(4, 2); 
	} 
	if( str.length > 6 ) 
	{ 
		returnVal = returnVal + delimiter + str.substr(6, 2); 
	} 
	
	obj.value = returnVal; 
	return returnVal; 
	
} 

// enter check after date check
function enterCheckDate(frm_name, obj, dateSize){

	if( event.keyCode == '13' ){ 
		if( chkDate(obj, dateSize) == 1 )
		{ 
			enterCheck(frm_name);
		} 
		else 
		{ 
			event.keyCode = '9'; 
		} 
	}

} 

// 천단위 구분자(comma) 표시 
// string 을 파라미터로 받음 
function numberFormat( numstr ) {

	// 세자리 마다 콤마 표시 
	var numstr = numFormatIn(numstr); 
	
	// 소수점 이후의 콤마 삭제 
	var cur = "front"; 
	var numstr_0 = ""; 
	var numstr_1 = ""; 
	for (i=0; i < numstr.length; i++) {
		if( numstr.charAt(i) == "." )  
			cur = "back"; 
		if( cur == "front" ) 
			numstr_0 += numstr.charAt(i); 
		else 
		{ 
			if( numstr.charAt(i) != "," )  
				numstr_1 += numstr.charAt(i); 
		} 
	} 
	if( numstr_1 ==  "" ) 
		return numstr_0; 
	else 
		return numstr_0 + numstr_1; 
	
} 

// 천단위 구분자(comma) 표시 
// object 를 파라미터로 받음 
function numberFormatObj( strObj ) {

	// 세자리 마다 콤마 표시 
	var numstr = numFormatIn(strObj.value); 
	
	// 소수점 이후의 콤마 삭제 
	var cur = "front"; 
	var numstr_0 = ""; 
	var numstr_1 = ""; 
	for (i=0; i < numstr.length; i++) {
		if( numstr.charAt(i) == "." )  
			cur = "back"; 
		if( cur == "front" ) 
			numstr_0 += numstr.charAt(i); 
		else 
		{ 
			if( numstr.charAt(i) != "," )  
				numstr_1 += numstr.charAt(i); 
		} 
	} 
	if( numstr_1 ==  "" ) 
		strObj.value = numstr_0; 
	else 
		strObj.value = numstr_0 + numstr_1; 
	
	return true; 
	
} 

// 천단위 구분자(comma) 표시 
function numFormatIn( numstr ) { 
	
	var numstr = Number(delComma(String(numstr))).toString(); 
	var re0 = /(\d+)(\d{3})($|\..*)/;
	if (re0.test(numstr))
	{
		return numstr.replace(
			re0,
			function(str,p1,p2,p3) { return numberFormat(p1) + "," + p2 + p3; }
		);
	} 
	else {
		return numstr;
	} 
	
} 

// 숫자 검사 전 천단위 구분자(comma) 삭제 
function delComma(numstr){
	
	var tmpstr = String(numstr); 
	var re = /,/g;
	tmpstr = tmpstr.replace(re, ''); 
	return tmpstr; 
	
} 

// 천단위 구분자(comma) 지우고 number 로 치환
function strToNum(numstr) {
	
	return Number(delComma(numstr));
	
}

// 소수점 고정
function fixedPoint(str, num) {
	
	var splitData = str.split(".");  // "." 으로 나눈다.
	
	if( str == "" || str == null ) {
		return str;
	}
	else if (splitData.length == 1){  //.이 없으면
		var zeroStr = ".";
		for( var i = 0 ; i < num ; ++i ) {
			zeroStr += "0";
		}
		str += zeroStr;
	} 
	else if (splitData.length == 2){     //. 이 있을때는 
		var split1 = splitData[1].length;
		if( split1 <= num ) {
			var zeroStr = "";
			for( var i = 0 ; i < (num - split1) ; ++i ) {
				zeroStr += "0";
			}
			str += zeroStr;
		}
		else {  //소수점 뒤가 기준 이상이면
			str =(Math.round(str*Math.pow(10, num)))/Math.pow(10, num); //소수점 기준 다음자리에서 반올림
		}
	} 
	else {    //    예외 .이 한개 이상인경우,,
		alert("제대로 입력해주세요.");
	}
	
	return str;
	
}

// Grid 화면 resizing 
// tab_h : tab height ( 실제 tab 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 tab 높이가 커짐 ) 
// table_h : table height ( 실제 table 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 table 높이가 커짐 ) 
function setGridAutoResize( tab_h, table_h ){
	
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
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
	} 
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	
} 

// Tab 화면 resizing 
// tab_h : tab height ( 실제 tab 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 tab 높이가 커짐 ) 
function setTabAutoResize( tab_h ){
	
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
	//
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
	} 
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	
} 

// Tab 화면 resizing 
// tab_h : tab height ( 실제 tab 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 tab 높이가 커짐 ) 
function setTabAutoResize2( tab_h, div_h ){
	
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
	var divHeightValue = Number(maxHeightValue) - Number(div_h) ; 
	//
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		divHeightValue += Number(search_h); 
	} 
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( divHeightValue < 1 ) 
		divHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	divID.style.height = divHeightValue + "px"; 
	
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
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 37;
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
	var topLineWidthValue = Number(maxWidthValue) - 37;
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

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	if( left_tbody.rows[obj.rowIndex] ) 
	{ 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
		//left_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
		//main_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
	} 
	else 
	{ 
		left_tbody.rows.style.backgroundColor = "#eeeeee"; 
		//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		main_tbody.rows.style.backgroundColor = "#eeeeee"; 
		//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환
function bgOut( obj ) {
	
	if( left_tbody.rows[obj.rowIndex] ) 
	{ 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
		//left_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
		//main_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	} 
	else 
	{ 
		left_tbody.rows.style.backgroundColor = "#ffffff"; 
		//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows.style.backgroundColor = "#ffffff";
		//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	}
	
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환
// left_tbody 가 없는 테이블
function bgOver2( obj ) { 
	
	if( main_tbody.rows[obj.rowIndex] ) 
	{ 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee";
	} 
	else 
	{ 
		main_tbody.rows.style.backgroundColor = "#eeeeee";
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환
// left_tbody 가 없는 테이블
function bgOut2( obj ) {
	
	if( main_tbody.rows[obj.rowIndex] ) 
	{ 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff";
	} 
	else 
	{ 
		main_tbody.rows.style.backgroundColor = "#ffffff";
	}
	
}

// HTML Grid 의 X좌표 정의 
function scrollX() {
	document.all.topLine.scrollLeft = document.all.mainDisplay.scrollLeft;
}

// HTML Grid 의 Y좌표 정의 
function scrollY() {
	document.all.leftDisplay.scrollTop = document.all.mainDisplay.scrollTop;
}

// HTML Grid 의 스크롤 제어
function header_onscroll() {
	if(headerDiv){
		if (dataDiv.scrollLeft != document.frm.text1.value) {
			document.frm.text1.value = dataDiv.scrollLeft;
			headerDiv.scrollLeft = dataDiv.scrollLeft;
			return;
		}
	}

	if(leftDiv){
		if (dataDiv.scrollHeight != document.frm.text2.value) {
		    document.frm.text2.value = dataDiv.scrollTop;
			leftDiv.scrollTop = dataDiv.scrollTop;
			return;
		}
	}
} 

// JOB 실행
function execJob( frm_name ){ 

	document.frm._moon_service.value = frm_name; 
	document.frm._moon_pagenumber.value = "1";
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
} 

// 특수문자 입력 체크
function strCheck(){
	
	var objEv = event.srcElement;
	var strPattern = /[!#$*?\\']/;
	
	if(strPattern.test(objEv.value)){
		alert("입력 데이터에 특수문자\(\'!\', \'#\', \'$\', \'*\', \'?\', \'\\', \'\'\'\)가 포함되어 있습니다.");
		objEv.select();
		return false;
	}
	
}

// 특수문자 컨버팅
// [ --> &#91;
// ] --> &#93;
// $ --> &#36;
// ' --> &#39;
// " --> &#34;
// { --> &#123;
// } --> &#125;
function convSpclChar( str ) {
	
	var re = /[\[]/g;
	str = str.replace(re, '&#91;');
	var re = /[\]]/g;
	str = str.replace(re, '&#93;');
	var re = /[$]/g;
	str = str.replace(re, '&#36;');
	var re = /[\']/g;
	str = str.replace(re, '&#39;');
	var re = /["]/g;
	str = str.replace(re, '&#34;');
	var re = /[{]/g;
	str = str.replace(re, '&#123;');
	var re = /[}]/g;
	str = str.replace(re, '&#125;');
	
	return str;
	
}

// % 삭제  
function delPercent(str){ 
	
	var tmpstr = String(str); 
	var re = /%/g;
	tmpstr = tmpstr.replace(re, ''); 
	return tmpstr; 
	
} 

// 날짜 구분자 제거 ( - or / )
function delDateDelimiter( strDate ) {
	
	var re = /-/g;
	strDate = strDate.replace(re, ''); 
	re = /\//g;
	strDate = strDate.replace(re, ''); 
	return strDate;
	
}

/* ***************************************************************** */
/* 여기서부터 Code Search Popup 화면과 관련한 함수 2007.04.30 by TJ ***** */
/* ***************************************************************** */

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

// create pop-up : search customer
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openCustSearchPop( code_input, w_size, h_size ) { 

	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=customer_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
} 

// create pop-up 
// select_code : seach type, code_input : code input(search value) input-box name 
// code_id : code id input-box name, code_name : code name input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openSearchPopPaging( select_code, code_input, code_id, code_name, w_size, h_size ) { 

	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	if( select_code.match("items") == "items" ) { 
		var itemType = document.frm.itemType.value; 
	} 
	else { 
		var itemType = ""; 
	} 
	
	var service_url = "service.do?_moon_service=co_code_search_popup_paging&select_code=" + select_code + "&code_input=" + code_input; 
	service_url += "&itemType=" + itemType + "&code_id=" + code_id + "&code_name=" + code_name + "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}

// FILE Upload 확장자 Check 
function extChk(objFile, seq) {
	
	var file = objFile.value; 
	extArray = new Array(".gif", ".jpg", ".bmp", ".gul", ".ppt", ".xls");
	allowSubmit = false;
	
	if ( !file ) return;
	
	while ( file.indexOf("\\") != -1 )
		file = file.slice(objFile.value.indexOf("\\") + 1);
	
	ext = file.slice(file.indexOf(".")).toLowerCase();
	
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) { allowSubmit = true; break; }
	}
	
	if ( !allowSubmit ) { 
		alert("파일명 : " + file + "\n\n업로드할 파일은" 
				+ (extArray.join("  ")) + "만 가능합니다."
				+ "\n파일형식을 확인해보시기 바랍니다."); 
		if( seq == 1 ) 
			file01.innerHTML = "<input type=\"file\" name=\"_board_file\" size=\"50\" class=\"normal\" onChange=\"extChk(this, 1); \">"; 
		else if( seq == 2 ) 
			file02.innerHTML = "<input type=\"file\" name=\"_board_file\" size=\"50\" class=\"normal\" onChange=\"extChk(this, 2); \">"; 
		else if( seq == 3 ) 
			file03.innerHTML = "<input type=\"file\" name=\"_board_file\" size=\"50\" class=\"normal\" onChange=\"extChk(this, 3); \">"; 
	} 
	
} 

// 로그인 체크
function logCheck(chk) { 
	if( chk == null || chk == "" ){ 
		alert("정상적인 접근이 아닙니다. 로그인 후 이용하시기 바랍니다."); 
		//top.window.close(); 
		top.window.location.href = "http://www.samsung.net"; 
	}
}

// 날짜 형식 formatting
// str : 변환할문자
// fLen : 변환할 길이
// ch : 변환문자
function dateFormatting(str, fLen, ch) {
	
	var diff = Number(fLen) - str.length;
	var preStr = "";
	if( diff > 0 ){
		for( var i=0 ; i < diff ; ++i ) {
			str = ch + str;
		}
	}
	return str;
	
}

// 도움말 열기
function displayHelp() {
	
	divHelp.style.width = Number(document.body.clientWidth) - 15;
	if( divHelp.style.display == "BLOCK" || divHelp.style.display == "block" ) {
		//divHelp.style.display = "none";
		hDynamicHeight = document.getElementById("divHelp").clientHeight;
		divHelp.style.overflow = "hidden";
		zoomOut();
	} else {
		divHelp.style.overflow = "";
		divHelp.style.display = "block";
		if( document.grid )
			document.grid.style.display = "none";
		
		if( document.WiseGrid ) {
			document.WiseGrid.style.display = "none";
		}
		
		if( document.WiseGrid2 ) {
			document.WiseGrid2.style.display = "none";
		}
	}
	
}

// 도움말 닫기
// 천천히 사라지게 하기
function zoomOut() {
	
	if( hDynamicHeight > 6 ) {
		hDynamicHeight -= 5;
		divHelp.style.height = hDynamicHeight;
		setTimeout("zoomOut()", 1);
	}
	else {
		hDynamicHeight = 0;
		divHelp.style.display = "none";
		if( document.grid ) {
			// calendar 레이어가 display 되고 있는 지 확인
			if( calendar ) {
				if( calendar.element.style.display == "block" ) {
					document.grid.style.display = "none";
				}
				else {
					document.grid.style.display = "block";
				}
			}
			else {
				document.grid.style.display = "block";
			}
		}
		
		if( document.WiseGrid){
			document.WiseGrid.style.display = "block";
		}
		
		if( document.WiseGrid2){
			document.WiseGrid2.style.display = "block";
		}
	}
	
}

// 도움말 영역 외 클릭 시 도움말 닫기
function hideHelp() {
	
	var objEv = event.srcElement;
	var repeatCnt = 0;
	var condition = true;
	
	if( objEv.tagName ) {
		while( objEv.tagName.toUpperCase() != "DIV" && repeatCnt < 6 ) {
			if( objEv.parentNode && objEv.parentNode.tagName ) {
				objEv = objEv.parentNode;
				repeatCnt++;
			}
			else {
				repeatCnt = 6;
			}
		}
		
		if( objEv.id != "divHelp" ) {
	    	divHelp.style.width = Number(document.body.clientWidth) - 15;
	    	if( divHelp.style.display == "BLOCK" || divHelp.style.display == "block" ) {
	    		//divHelp.style.display = "none";
	    		hDynamicHeight = document.getElementById("divHelp").clientHeight;
	    		divHelp.style.overflow = "hidden";
	    		zoomOut();
	    	}
		}
	}
	
}

// 조회 시 waiting 이미지 보여주기
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}

// 코드 String 체크
// 영문, 숫자 & _ (underscore) 만 허용, 영문은 대문자로 변환
// 잘못입력된 값을 제외한 허용된 스트링을 반환
function chkCodeStr( objBox ) {
	
	var output = new String;
	var tmp; 
	
	var str = objBox.value.toUpperCase();
	var strSize = str.length;
	
	for (i = 0; i < strSize; i++) 
	{ 
		var charStr = str.charCodeAt(i);
		if( ( 48 <= charStr && charStr <= 57 ) // 0 ~ 9 
				|| ( 65 <= charStr && charStr <= 90 ) // A ~ Z
				|| ( 97 <= charStr && charStr <= 122 ) // a ~ z 
				|| ( charStr == 95 ) ) // _ (underscore)
		{ 
			output += String.fromCharCode( charStr ); 
		} 
		else 
		{ 
			// no action
			// alert("영문, 숫자, Underscore 이외의 문자는 입력할 수 없습니다."); return false; 
		} 
	} 
		
	objBox.value = output;
	
}

// IFRAME Grid 화면 resizing
// grid_h : grid height ( 실제 grid 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 grid 높이가 커짐 ) 
function setGridAutoResizeIframe( grid_h ){
	
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
	
	var gridHeightValue = Number(maxHeightValue) - Number(grid_h) ;
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( gridHeightValue < 1 ) 
		gridHeightValue = 1;
	
	document.grid.height = gridHeightValue + "px"; 
	
}

// 코드 검색 POPUP
// id_input : id input box name
// name_input : name input box name
// w_size : widths of popup window
// h_size : heights of popup window
//
// 쿼리에서 id_input 을 조건으로 어떤 SQL 을 적용시킬 지를 결정
// 제품검색 : id_input = item_id
function openCodeSearchPop( id_input, name_input, w_size, h_size ) {

	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(id_input).value;
	
	// popup 창의 넓이, 높이를 지정하지 않은 경우, default 사이즈 설정
	if( !(w_size) ) {
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=code_search_popup&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&code_input=" + code_input + "&id_input=" + id_input + "&name_input=" + name_input; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width="
						+ w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus();
	
}

/********************************************************************************
 * 각 테이블 컬럼이 행마다 같은 경우 병합할 수 있다.
 ┌─-──┬──-─┬───-┬-───┬─-──┐
 │    |A(0)|B(0)│C(0)│D(0)│
 │KL01├───-┼───-┼───-┼-───┤
 │    |A(1)│B(1)│C(1)│D(1)│
 ├──-─┼-───┼─-──┼-───┼-───┤
 │    │A(2)│B(2)│C(2)│D(2)│
 │KL02├──-─┼─-──┼-───┼-───┤
 │    │A(3)│B(3)│C(3)│D(3)│
 ├──-─┼─-──┼─-──┼─-──┼──-─┤
 |KL03│A(4)│B(4)│C(4)│D(4)│
 └──-─┴-───┴─-──┴─-──┴─-──┘
*********************************************************************************/

function mergeTableSingleColumnRows() {
	var args        = mergeTableSingleColumnRows.arguments;
	var rowspanCnt  = 1;								// rowspan 값
	var oTable      = args[0];							// 비교할 Table Object, default=첫번째 테이블
	var oRow;											// 현재 Row Object
	var oCell;											// 현재 열 Object
	var iPreFallRow;									// 이전에 일치했던 Row Index
	var iCell 	    = args[1] == null ? 0 : args[1];	// 비교할 열 Index, default=0
	var preFallValue;									// 이전에 일치했던 값
	var currentValue;									// 현재 값
	var isFirstFall = false								// 처음 일치인지 여부

	try {
		for (var i = 0; i < oTable.rows.length; i++) {					// 해당 테이블 행 만큼 Loop
			for (var j = 0; j < oTable.rows[i].cells.length; j++) {		// 해당 테이블 열 만큼 Loop
				if (iCell != -1 && iCell != j) {						// 비교할 열 Index와 현재 열 Index가 동일하지 않으면,,
					continue;
				}

				currentValue = oTable.rows[i].cells[j].outerText;
				if (preFallValue != currentValue) {						// 이전 열 index의 텍스트값과  현재값이 동일하지 않으면,,
					rowspanCnt = 1;
                    preFallValue = currentValue;
                    isFirstFall = false;

					break;
				}
				if (!isFirstFall) {										// 처음 일치시에만 적용
					iPreFallRow = i - 1;
					isFirstFall = true;
				}

				rowspanCnt++;
				oTable.rows[iPreFallRow].cells[j].rowSpan = rowspanCnt;
				//oTable.rows[i].deleteCell(j);
				oTable.rows[i].cells[j].style.display = 'none';

				break;
			}
		}
	} catch(e) {
    	alert(e.description);
    }
}

function mergeDefaultTableRows() {
	var args        = mergeDefaultTableRows.arguments;
	var rowspanCnt  = 1;								// rowspan 값
	var oTable      = args[0];							// 비교할 Table Object, default=첫번째 테이블
	var oRow;											// 현재 Row Object
	var oCell;											// 현재 열 Object
	var iPreFallRow;									// 이전에 일치했던 Row Index
	var iCell 	    = args[1] == null ? 0 : args[1];	// 비교할 열 Index, default=0
	var preFallValue;									// 이전에 일치했던 값
	var currentValue;									// 현재 값
	var isFirstFall = false								// 처음 일치인지 여부

	try {
		for (var k = 0; k < iCell; k++) {
			for (var i = 0; i < oTable.rows.length; i++) {				// 해당 테이블 행 만큼 Loop
				currentValue = oTable.rows[i].cells[k].outerText;

				if (preFallValue != currentValue) {						// 이전 열 index의 텍스트값과  현재값이 동일하지 않으면,,
					rowspanCnt = 1;
                    preFallValue = currentValue;
                    isFirstFall = false;

					continue;
				}

				if (!isFirstFall) {										// 처음 일치시에만 적용
					iPreFallRow = i - 1;
					isFirstFall = true;
				}
				rowspanCnt++;

				oTable.rows[iPreFallRow].cells[k].rowSpan = rowspanCnt;
				oTable.rows[i].cells[k].style.display = 'none';
			}
		}
	} catch(e) {
    	alert(e.description);
    }
}

function mergeInheritanceTableRows() {
	var args        = mergeInheritanceTableRows.arguments;
	var rowspanCnt  = 1;								// rowspan 값
	var oTable      = args[0];							// 비교할 Table Object, default=첫번째 테이블
	var oRow;											// 현재 Row Object
	var oCell;											// 현재 열 Object
	var iPreFallRow;									// 이전에 일치했던 Row Index
	var iCell 	    = args[1] == null ? 0 : args[1];	// 비교할 열 Index, default=0
	var iFix 	    = args[2] == null ? 0 : args[2];	// 병합하지 않을 기준이 되는 고정 열(리스트 번호), default=0
	var preFallValue;									// 이전에 일치했던 값
	var currentValue;									// 현재 값
	var isFirstFall = false								// 처음 일치인지 여부

	try {
		var matrix = new Array();						// 각 행과 열에 대한 rowspan 값을 갖기 위한 배열
		for (var k = 0; k < iCell; k++) {
			matrix[k] = new Array();

			if(k < iFix) { continue; }
			for (var i = 0; i < oTable.rows.length; i++) {				// 해당 테이블 행 만큼 Loop
				currentValue = oTable.rows[i].cells[k].outerText;

				if (preFallValue != currentValue) {						// 이전 열 index의 텍스트값과  현재값이 동일하지 않으면,,
					preFallValue = currentValue;
					rowspanCnt = 1;
                    matrix[k][i] = rowspanCnt;
                    isFirstFall = false;

					continue;
				}

				if (!isFirstFall) {										// 처음 일치시에만 적용
					iPreFallRow = i - 1;
					isFirstFall = true;
				}
				rowspanCnt++;

				if ( matrix[k-1][i] < rowspanCnt ) {
                    preFallValue = currentValue;
                    rowspanCnt = 1;
                    matrix[k][i] = rowspanCnt;
                    isFirstFall = false;

					continue;
				}

				matrix[k][i] = rowspanCnt;
				oTable.rows[iPreFallRow].cells[k].rowSpan = rowspanCnt;
				oTable.rows[i].cells[k].style.display = 'none';
			}
		}

	} catch(e) {
    	alert(e.description);
    }
}
