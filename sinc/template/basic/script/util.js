
// Single Quotation Mark �߰�
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

// Single Quotation Mark & Percent Sign �߰�
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

// ���� ����/��ħ
function OpenClose(id_num){			
	if(id_num.style.display == 'none'){
		id_num.style.display = 'block';
	}else{
		id_num.style.display = 'none';
	}
}

// ������ �̵�
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

// ������ �̵�2
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

// ��â����(��ũ�ѹ� �ʿ�� scrollbar : yes <--> no)
function OpenWin(url,winName,top,left,width,height,scrollbar)
{
	var newWin = window.open(url,winName,"toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=" + scrollbar + ",resizable=yes,copyhistory=no,top=" + top + ",left=" + left + ",width=" + width + ",height=" + height);
	newWin.focus();
}

// Service Name ���� ��â����
function OpenWin2(service,width,height)
{
	var newWin = window.open('about:blank',service,"toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=auto,resizable=yes,copyhistory=no,,width=" + width + ",height=" + height);
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = service;
	document.frm.submit();
}


/* ********************************************* */
/* ���⼭���� ���� �߰��� ���� 2007.07.26 by TJ ***** */
/* ********************************************* */

// ���� ����
String.prototype.trim = function(){
	// Use a regular expression to replace leading and trailing 
	// spaces with the empty string
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

// enter check �� 
function enterCheck(frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			// �ڱ�ȭ�� ����
			GoSearch(frm_name);
		}
	} 
	
}

// enter �Է½� tab ���� ��ȯ  
function enterToTapCheck(){
	
	if(event.keyCode =='13'){
		event.keyCode = '9'; 
	} 
	
}

// �Է¹��ڷκ��� Ư������ üũ
function pressedStrCheck(){
	
	var objEv = event.srcElement;
	var chkStr = objEv.value + String.fromCharCode(event.keyCode); 
	var strPattern = /[!#$*?\\']/;
	
	if(strPattern.test(chkStr)){
		alert("�Է� �����Ϳ� Ư������\(\'!\', \'#\', \'$\', \'*\', \'?\', \'\\', \'\'\'\)�� ���ԵǾ� �ֽ��ϴ�.");
		event.keyCode = null; 
		return false;
	}
	
}

// ���� input box �� ���� check 
// parameter : obj - inbox object , type - default value �Ǵ� �Ҽ��� check ���� ���� type ���� 
// type - BLANK : ����ڰ� �߸��� ���� �Է����� �� default value �� �������� ��ȯ, �Ҽ��� ���
//        ZERO : ����ڰ� �߸��� ���� �Է����� �� default value �� 0 ���� ��ȯ, �Ҽ��� ��� 
//        BLANK_INT : ����ڰ� �߸��� ���� �Է����� �� default value �� �������� ��ȯ, �Ҽ����� error ó��( only integer ) 
//        ZERO_INT : ����ڰ� �߸��� ���� �Է����� �� default value �� 0 ���� ��ȯ, �Ҽ����� error ó��( only integer ) 
//        BLANK_INT_UP : ����ڰ� �߸��� ���� �Է����� �� default value �� �������� ��ȯ, ���� & �Ҽ����� error ó��( only plus integer ) 
//        ZERO_INT_UP : ����ڰ� �߸��� ���� �Է����� �� default value �� 0 ���� ��ȯ, ���� & �Ҽ����� error ó��( only plus integer ) 
//        ** type parameter �� ������ ZERO(default=0, �Ҽ��� ���) �� ���� 
function checkNum(obj, type) {

	var i, ch;
	var pointCheck = 0;
	var defaultVal = "0"; 
	var alertMsg = "���ڸ� �Է��Ͽ� �ּ���.";
	var checkType = "POINT"; 
	
	// default value �� ���� 
	if( type == "BLANK" || type == "BLANK_INT" || type == "BLANK_INT_UP" ) 
		defaultVal = ""; 
	
	// �Ҽ��� ������� ���� 
	if( type == "BLANK_INT" || type == "ZERO_INT" || type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
	{ 
		if( type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
			alertMsg = "�ڿ����� �Է��Ͽ� �ּ���."; 
		else 
			alertMsg = "������ �Է��Ͽ� �ּ���."; 
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

// checkNum �Լ����� �߸��� ���� ���� ��� default value Setting 
function objSetting( obj, setVal, alertMsg ) { 
	
	alert(alertMsg); 
	obj.value = setVal;
	obj.select(); 
	
} 

// ��¥ ������ üũ�ϴ� �Լ�, return value : 1-�´� ����, 0-�߸��� ���� 
// parameter : obj = input box object, dateSize = date type size 
// dateSize = 4 : yyyy 
// dateSize = 6 : yyyyMM, dateSize = 7 : yyyy-MM 
// dateSize = 8 : yyyyMMdd, dateSize = 10 : yyyy-MM-dd 
// ������ skip
function chkDate(obj, dateSize) {
	
	var separator = "-"; 
	if( Number(dateSize) == 7 || Number(dateSize) == 10 ) 
		createDateDelimiter(obj, separator); 
	
	var input = obj.value.trim(); 
	
	if ( input.length == 0 ) return 1; // ������ skip
	
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

// chkDate() �Լ����� alert â ���� �Լ�
// alert â�� ������ �ٸ� ��� - ���� ��ũ��Ʈ ���Ͽ� ������
function alertChkDate(input, format) {
	
	alert( input + " ��(��) �ùٸ� ��¥ ������ �ƴմϴ�.\n( �Է����� : " + format + " )" ); 
	
} 

// date �˻� �� ������ �ڵ� ���� 
// ����ڰ� delimiter �� �Է����� �ʾƵ� �ڵ����� delimiter �� �����ϱ� ���� 
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

// õ���� ������(comma) ǥ�� 
// string �� �Ķ���ͷ� ���� 
function numberFormat( numstr ) {

	// ���ڸ� ���� �޸� ǥ�� 
	var numstr = numFormatIn(numstr); 
	
	// �Ҽ��� ������ �޸� ���� 
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

// õ���� ������(comma) ǥ�� 
// object �� �Ķ���ͷ� ���� 
function numberFormatObj( strObj ) {

	// ���ڸ� ���� �޸� ǥ�� 
	var numstr = numFormatIn(strObj.value); 
	
	// �Ҽ��� ������ �޸� ���� 
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

// õ���� ������(comma) ǥ�� 
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

// ���� �˻� �� õ���� ������(comma) ���� 
function delComma(numstr){
	
	var tmpstr = String(numstr); 
	var re = /,/g;
	tmpstr = tmpstr.replace(re, ''); 
	return tmpstr; 
	
} 

// õ���� ������(comma) ����� number �� ġȯ
function strToNum(numstr) {
	
	return Number(delComma(numstr));
	
}

// �Ҽ��� ����
function fixedPoint(str, num) {
	
	var splitData = str.split(".");  // "." ���� ������.
	
	if( str == "" || str == null ) {
		return str;
	}
	else if (splitData.length == 1){  //.�� ������
		var zeroStr = ".";
		for( var i = 0 ; i < num ; ++i ) {
			zeroStr += "0";
		}
		str += zeroStr;
	} 
	else if (splitData.length == 2){     //. �� �������� 
		var split1 = splitData[1].length;
		if( split1 <= num ) {
			var zeroStr = "";
			for( var i = 0 ; i < (num - split1) ; ++i ) {
				zeroStr += "0";
			}
			str += zeroStr;
		}
		else {  //�Ҽ��� �ڰ� ���� �̻��̸�
			str =(Math.round(str*Math.pow(10, num)))/Math.pow(10, num); //�Ҽ��� ���� �����ڸ����� �ݿø�
		}
	} 
	else {    //    ���� .�� �Ѱ� �̻��ΰ��,,
		alert("����� �Է����ּ���.");
	}
	
	return str;
	
}

// Grid ȭ�� resizing 
// tab_h : tab height ( ���� tab �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� tab ���̰� Ŀ�� ) 
// table_h : table height ( ���� table �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� table ���̰� Ŀ�� ) 
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	
} 

// Tab ȭ�� resizing 
// tab_h : tab height ( ���� tab �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� tab ���̰� Ŀ�� ) 
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	
} 

// Tab ȭ�� resizing 
// tab_h : tab height ( ���� tab �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� tab ���̰� Ŀ�� ) 
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( divHeightValue < 1 ) 
		divHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	divID.style.height = divHeightValue + "px"; 
	
} 

// HTML Grid ȭ�� resizing
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
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

// HTML Grid ȭ�� resizing 2
// Ʋ������ ����ȵ� HTML Grid ȭ��
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
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

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
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

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ
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

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ
// left_tbody �� ���� ���̺�
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

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ
// left_tbody �� ���� ���̺�
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

// HTML Grid �� X��ǥ ���� 
function scrollX() {
	document.all.topLine.scrollLeft = document.all.mainDisplay.scrollLeft;
}

// HTML Grid �� Y��ǥ ���� 
function scrollY() {
	document.all.leftDisplay.scrollTop = document.all.mainDisplay.scrollTop;
}

// HTML Grid �� ��ũ�� ����
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

// JOB ����
function execJob( frm_name ){ 

	document.frm._moon_service.value = frm_name; 
	document.frm._moon_pagenumber.value = "1";
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
} 

// Ư������ �Է� üũ
function strCheck(){
	
	var objEv = event.srcElement;
	var strPattern = /[!#$*?\\']/;
	
	if(strPattern.test(objEv.value)){
		alert("�Է� �����Ϳ� Ư������\(\'!\', \'#\', \'$\', \'*\', \'?\', \'\\', \'\'\'\)�� ���ԵǾ� �ֽ��ϴ�.");
		objEv.select();
		return false;
	}
	
}

// Ư������ ������
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

// % ����  
function delPercent(str){ 
	
	var tmpstr = String(str); 
	var re = /%/g;
	tmpstr = tmpstr.replace(re, ''); 
	return tmpstr; 
	
} 

// ��¥ ������ ���� ( - or / )
function delDateDelimiter( strDate ) {
	
	var re = /-/g;
	strDate = strDate.replace(re, ''); 
	re = /\//g;
	strDate = strDate.replace(re, ''); 
	return strDate;
	
}

/* ***************************************************************** */
/* ���⼭���� Code Search Popup ȭ��� ������ �Լ� 2007.04.30 by TJ ***** */
/* ***************************************************************** */

// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup â�� input box ǥ�� data : search code 
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

	// popup â�� input box ǥ�� data : search code 
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

	// popup â�� input box ǥ�� data : search code 
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

// FILE Upload Ȯ���� Check 
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
		alert("���ϸ� : " + file + "\n\n���ε��� ������" 
				+ (extArray.join("  ")) + "�� �����մϴ�."
				+ "\n���������� Ȯ���غ��ñ� �ٶ��ϴ�."); 
		if( seq == 1 ) 
			file01.innerHTML = "<input type=\"file\" name=\"_board_file\" size=\"50\" class=\"normal\" onChange=\"extChk(this, 1); \">"; 
		else if( seq == 2 ) 
			file02.innerHTML = "<input type=\"file\" name=\"_board_file\" size=\"50\" class=\"normal\" onChange=\"extChk(this, 2); \">"; 
		else if( seq == 3 ) 
			file03.innerHTML = "<input type=\"file\" name=\"_board_file\" size=\"50\" class=\"normal\" onChange=\"extChk(this, 3); \">"; 
	} 
	
} 

// �α��� üũ
function logCheck(chk) { 
	if( chk == null || chk == "" ){ 
		alert("�������� ������ �ƴմϴ�. �α��� �� �̿��Ͻñ� �ٶ��ϴ�."); 
		//top.window.close(); 
		top.window.location.href = "http://www.samsung.net"; 
	}
}

// ��¥ ���� formatting
// str : ��ȯ�ҹ���
// fLen : ��ȯ�� ����
// ch : ��ȯ����
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

// ���� ����
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

// ���� �ݱ�
// õõ�� ������� �ϱ�
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
			// calendar ���̾ display �ǰ� �ִ� �� Ȯ��
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

// ���� ���� �� Ŭ�� �� ���� �ݱ�
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

// ��ȸ �� waiting �̹��� �����ֱ�
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

// �ڵ� String üũ
// ����, ���� & _ (underscore) �� ���, ������ �빮�ڷ� ��ȯ
// �߸��Էµ� ���� ������ ���� ��Ʈ���� ��ȯ
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
			// alert("����, ����, Underscore �̿��� ���ڴ� �Է��� �� �����ϴ�."); return false; 
		} 
	} 
		
	objBox.value = output;
	
}

// IFRAME Grid ȭ�� resizing
// grid_h : grid height ( ���� grid �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� grid ���̰� Ŀ�� ) 
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( gridHeightValue < 1 ) 
		gridHeightValue = 1;
	
	document.grid.height = gridHeightValue + "px"; 
	
}

// �ڵ� �˻� POPUP
// id_input : id input box name
// name_input : name input box name
// w_size : widths of popup window
// h_size : heights of popup window
//
// �������� id_input �� �������� � SQL �� �����ų ���� ����
// ��ǰ�˻� : id_input = item_id
function openCodeSearchPop( id_input, name_input, w_size, h_size ) {

	// popup â�� input box ǥ�� data : search code 
	var code_input = document.getElementById(id_input).value;
	
	// popup â�� ����, ���̸� �������� ���� ���, default ������ ����
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
 * �� ���̺� �÷��� �ึ�� ���� ��� ������ �� �ִ�.
 ����-����������-����������-��-����������-������
 ��    |A(0)|B(0)��C(0)��D(0)��
 ��KL01��������-��������-��������-��-��������
 ��    |A(1)��B(1)��C(1)��D(1)��
 ������-����-����������-������-��������-��������
 ��    ��A(2)��B(2)��C(2)��D(2)��
 ��KL02������-������-������-��������-��������
 ��    ��A(3)��B(3)��C(3)��D(3)��
 ������-������-��������-��������-����������-����
 |KL03��A(4)��B(4)��C(4)��D(4)��
 ������-����-����������-��������-��������-������
*********************************************************************************/

function mergeTableSingleColumnRows() {
	var args        = mergeTableSingleColumnRows.arguments;
	var rowspanCnt  = 1;								// rowspan ��
	var oTable      = args[0];							// ���� Table Object, default=ù��° ���̺�
	var oRow;											// ���� Row Object
	var oCell;											// ���� �� Object
	var iPreFallRow;									// ������ ��ġ�ߴ� Row Index
	var iCell 	    = args[1] == null ? 0 : args[1];	// ���� �� Index, default=0
	var preFallValue;									// ������ ��ġ�ߴ� ��
	var currentValue;									// ���� ��
	var isFirstFall = false								// ó�� ��ġ���� ����

	try {
		for (var i = 0; i < oTable.rows.length; i++) {					// �ش� ���̺� �� ��ŭ Loop
			for (var j = 0; j < oTable.rows[i].cells.length; j++) {		// �ش� ���̺� �� ��ŭ Loop
				if (iCell != -1 && iCell != j) {						// ���� �� Index�� ���� �� Index�� �������� ������,,
					continue;
				}

				currentValue = oTable.rows[i].cells[j].outerText;
				if (preFallValue != currentValue) {						// ���� �� index�� �ؽ�Ʈ����  ���簪�� �������� ������,,
					rowspanCnt = 1;
                    preFallValue = currentValue;
                    isFirstFall = false;

					break;
				}
				if (!isFirstFall) {										// ó�� ��ġ�ÿ��� ����
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
	var rowspanCnt  = 1;								// rowspan ��
	var oTable      = args[0];							// ���� Table Object, default=ù��° ���̺�
	var oRow;											// ���� Row Object
	var oCell;											// ���� �� Object
	var iPreFallRow;									// ������ ��ġ�ߴ� Row Index
	var iCell 	    = args[1] == null ? 0 : args[1];	// ���� �� Index, default=0
	var preFallValue;									// ������ ��ġ�ߴ� ��
	var currentValue;									// ���� ��
	var isFirstFall = false								// ó�� ��ġ���� ����

	try {
		for (var k = 0; k < iCell; k++) {
			for (var i = 0; i < oTable.rows.length; i++) {				// �ش� ���̺� �� ��ŭ Loop
				currentValue = oTable.rows[i].cells[k].outerText;

				if (preFallValue != currentValue) {						// ���� �� index�� �ؽ�Ʈ����  ���簪�� �������� ������,,
					rowspanCnt = 1;
                    preFallValue = currentValue;
                    isFirstFall = false;

					continue;
				}

				if (!isFirstFall) {										// ó�� ��ġ�ÿ��� ����
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
	var rowspanCnt  = 1;								// rowspan ��
	var oTable      = args[0];							// ���� Table Object, default=ù��° ���̺�
	var oRow;											// ���� Row Object
	var oCell;											// ���� �� Object
	var iPreFallRow;									// ������ ��ġ�ߴ� Row Index
	var iCell 	    = args[1] == null ? 0 : args[1];	// ���� �� Index, default=0
	var iFix 	    = args[2] == null ? 0 : args[2];	// �������� ���� ������ �Ǵ� ���� ��(����Ʈ ��ȣ), default=0
	var preFallValue;									// ������ ��ġ�ߴ� ��
	var currentValue;									// ���� ��
	var isFirstFall = false								// ó�� ��ġ���� ����

	try {
		var matrix = new Array();						// �� ��� ���� ���� rowspan ���� ���� ���� �迭
		for (var k = 0; k < iCell; k++) {
			matrix[k] = new Array();

			if(k < iFix) { continue; }
			for (var i = 0; i < oTable.rows.length; i++) {				// �ش� ���̺� �� ��ŭ Loop
				currentValue = oTable.rows[i].cells[k].outerText;

				if (preFallValue != currentValue) {						// ���� �� index�� �ؽ�Ʈ����  ���簪�� �������� ������,,
					preFallValue = currentValue;
					rowspanCnt = 1;
                    matrix[k][i] = rowspanCnt;
                    isFirstFall = false;

					continue;
				}

				if (!isFirstFall) {										// ó�� ��ġ�ÿ��� ����
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
