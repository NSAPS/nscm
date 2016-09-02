
// ��ǰ �˻� popup
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

// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
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

// input box �� Edit Mode �� ��ȯ
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

// input box �� View Mode �� ��ȯ
// onFocusOut
function setViewMode( objBox ) {
	
	
	// select box �� ���, value �� �ƴ϶� TEXT �� ǥ���� ��� ��
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

// PLT, BOX���� �����Ǿ����� ȣ���.
function onChangeCheck(objBox, flag){
	var strVal = objBox.value;
	
	setChangeCheckFlag(objBox);
	
	// �⺻������BOX, �߰�������BOX, �������BOX �Է�â�� ���, ���� üũ & õ���� ������ ǥ��
	if( objBox.name == "plt_qty" || objBox.name == "box_qty") {
		if( strVal != "" && strVal != null ) {
			// ���� üũ
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
				return;
			}
			// ������ �´� ��� õ���� ������ ǥ��
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
			// BOX �ΰ��.
			if(objBox.name == "box_qty")
				objBox.value = "0";
			else
				objBox.value = "0.00"
		}
		
		// BOX �� ���
		if( objBox.name == "box_qty" ) {
			// PLT ���� ���
			calPltQty(objBox);
		}
		
		// PLT �� ���
		if( objBox.name == "plt_qty" ) {
			// Box ���� ���
			calBoxQty(objBox);
		}
	}
}

// ��������̳� PLT, BOX, �ּҼ��۴����� �����Ͽ�����, 
// �����Ǿ��ٴ� Flag�� ����� ���� Function
// ������ Flag�� ���ؼ�, DML�۾��� ���� ������ �Ǵ�.
function setChangeCheckFlag(objBox){
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	
	// �������, PLT, BOX �� ������ ���.
	if( objBox.name == "src_loc" || objBox.name == "plt_qty" || objBox.name == "box_qty"){
		
		if(document.frm.plan_update_flag[rowIdx])
			document.frm.plan_update_flag[rowIdx].value = "Y";
		else
			document.frm.plan_update_flag.value = "Y";
	}
	// �ּҼ��۴����� ������ ���.
	else if(objBox.name == "min_trans_qty"){
		
		if(document.frm.unit_update_flag[rowIdx])
			document.frm.unit_update_flag[rowIdx].value = "Y";
		else
			document.frm.unit_update_flag.value = "Y";
	}
	// ������� ����� ���.
	else if(objBox.name == "safe_qty"){
		if(document.frm.safe_update_flag[rowIdx])
			document.frm.safe_update_flag[rowIdx].value = "Y";
		else
			document.frm.safe_update_flag.value = "Y";
	}
}


/*********************************************************/

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
 ******************** PLT, BOX ���   *********************
 *********************************************************/

// BOX ������ ����� ���, PLT ������ �ڵ����� ��� �ϱ� ���� function
function calPltQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "box_qty" ) { // �⺻������
			var pltBox = document.frm.plt_qty[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "box_qty" ) { // �⺻������
			var pltBox = document.frm.plt_qty;
		}
		else {
			return;
		}
	}
	
	// PALET �� BOX ������ ���� ��� 1 �� ���
	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
		var boxPerPalet = 100;
	}
	else {
		var boxPerPalet = Number(delComma(boxPerPaletStr));
	}
	
	// BOX �Է�â�� ��� �ִ� ���
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

// PLT ������ ����� ��� BOX ������ �ڵ����� ����ϱ� ���� function
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
		if( objBox.name == "plt_qty" ) { // �⺻������
			var boxPlt = document.frm.box_qty;
		}
		else {
			return;
		}
	}
	
	// PALET �� BOX ������ ���� ��� 1 �� ���
	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
		var boxPerPalet = 100;
	}
	else {
		var boxPerPalet = Number(delComma(boxPerPaletStr));
	}
	
	// BOX �Է�â�� ��� �ִ� ���
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

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	left_tbody.rows[rowIdx].style.backgroundColor = "#aaaaaa"; 
	main_tbody.rows[rowIdx].style.backgroundColor = "#aaaaaa"; 
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
	main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
}

// �� ���� ��������
var objTdG;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = left_tbody.rows.length;
	// ��ǰ�ڵ� ���� ���
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
		// BOX --> �������
		else if( objName == "box_qty" ) {
			
			objTdG = main_tbody.rows[rowIdx].cells[14];
		}
		// ������� --> �ּҼ��۴���
		//else if( objName == "src_loc" ) {
		//	objTdG = left_tbody.rows[rowIdx].cells[14];
		//}
		// �ּҼ��۴��� --> ������ PLT
		else if( objName == "min_trans_qty" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[11];
			}
			// �������� ù��° input box �� �̵�
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[11];
			}
		}
		// �� ���� box ���� ���� ����
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

// src_loc(�����), item_id(��ǰ �ڵ�) �κ��� box_per_palet ã��
// obj �� select box �Ǵ� input box
function getBoxPerPalet( obj ) {
	
	// ����� �Է�â���� �߻��� event ����, ��ǰ�ڵ� �Է�â���� �߻��� event ���� ����
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
	
	// �����, ��ǰ�ڵ� ������
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
	
	// ������� �������� �ʰ� ���� �����Ϸ��� �� ���..
	if(dc_id == null || dc_id == ""){
		box_qty.value = "0";
		plt_qty.value = "0.00";
		alert("PLT, BOX���� �����ϱ� ���� ������� ���� �����Ͽ� �ֽʽÿ�.");
		setEditMode( src_loc.parentNode );
		src_loc.focus();
		return;
	}
	
	// ����� �Ǵ� ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
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
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 39;
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
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}

// ��¥ ������ üũ�ϴ� �Լ�, return value : 1-�´� ����, 0-�߸��� ����
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
	
	if ( input.length == 0 ) return 1; // ������ skip
	
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

// version - seq �и�
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

// �˻�
function GoSearch(service) {
	
	// ����, �԰���, ���۱��� �˻� ������ setting
	var versions = document.frm.plan_version.value;
	if( versions == "" || versions == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	if( document.frm.trans_start.value == "" || document.frm.trans_start.value == null ) {
		alert("�������ڸ� �Է��Ͽ� �ֽʽÿ�.");
		return;
	}
	
	if( document.frm.item_id.value == "" || document.frm.item_id.value == null ) {
		alert("��ǰ�ڵ带 �Է��Ͽ� �ֽʽÿ�.");
		return;
	}
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1";
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// ���� ��ư Ŭ��
function GoSave(service) {
	
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var trans_date = document.frm.trans_start.value;
	var item_id = document.frm.item_id.value;
	// ����, ������ �������� ���� ���
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("������ ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	
	if( trans_date == null || trans_date == ""){
		alert("�������ڸ� ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("��ǰ �ڵ带 ���� �Է��ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	
	
	// �ٽ� Ȯ��
	if(!confirm("�����Ͻðڽ��ϱ�?"))
		return;
		
	viewWait();
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}


// ������� ��ȹ�ݿ� ��ư Ŭ����.
function GoCreate(service) {
	
	var trans_date = document.frm.trans_start.value;
	var item_id = document.frm.item_id.value;

	if( trans_date == null || trans_date == ""){
		alert("�������ڸ� ���� �����ϰ� �����͸� ��ȸ �ϼž� ��ȹ�� �ݿ��� �����մϴ�.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("��ǰ �ڵ带 ���� �Է��ϰ� �����͸� ��ȸ �ϼž� ��ȹ�� �ݿ��� �����մϴ�.");
		return;
	}
	
	
	// �ٽ� Ȯ��
	if(!confirm("��ȹ�� �ݿ��Ͻðڽ��ϱ�?"))
		return;
	
	viewWait();
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// enter check �� 
function enterCheck(frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			// �ڱ�ȭ�� ����
			getItemNameSearch(document.frm.item_id, frm_name);
			//GoSearch(frm_name);
		}
	} 
	
}

// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemNameSearch(objBox, service) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
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

// �÷� ���� ���
// �ǸŴ��� : 60(tdSaleCum)
// �����ǸŰ�ȹ : 60(tdTodaySalesPlan)
// �Ǹ��ֹ� : 60(tdTodaySale)
// 1������Ǹ� : 60(tdWeek1Sale)
// 3������Ǹ� : 60(tdWeek3Sale)
// ������� : 60(tdTodayStock)
// �԰��� : 60(tdTransInQty)
// ����� : 60(tdTransOutQty)
// ����ϼ� : 60(tdStockDay)
// �����ǸŰ�ȹ : 60(tdTomorrowSale)
// �����ֹ� : 60(tdTomorrowOrder)
// ������� : 60(tdExpectStock)
// ����䱸�� : 60(tdRepQty)
function changeDisplay(obj){
	
	var tabLen = left_tbody.rows.length;	
	
	if(tabLen == 1) return;
	
	if( obj.width == 5 ){// ��ħ
	
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
	else{ // ����
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
