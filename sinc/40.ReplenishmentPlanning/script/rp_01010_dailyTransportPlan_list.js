////////////////////////////////////////////////////////////
// ���α׷�ID : rp_01010_dailyTransportPlan_list.js
// ���α׷��� : ���۰�ȹ��ȸ �� ����
// ������  : ���ؼ�
// �������� : 2008-11-25 ȭ����
//
//���� job file : job_sinc_40_replenishmentPlanning.xml
//
//���� query file : query_sinc_40_replenishmentPlanning.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-11-25  ���ؼ�     rp_01010_dailyTransportPlan_list.js ����
//
//
////////////////////////////////////////////////////////////

/*********************************************************
 ********************** ���� ����  ************************
 *********************************************************/

// Ŭ���� ���� �ε���
var clickedLineIdx = null;
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var popImgIdx = null;

// Ŭ���� �������� �ε���
var clickedDateIdx = null;

/*********************************************************/

// Ctrl Ű�� keydown �������� üũ�ϴ� flag
var ctrlKeyDownCheck = false;

// CTRL  Ű�� �������� ȣ��
function setCtlKeyDown(e){
	if (!e) e = window.event;
	
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = true;
	}
}

// CTRL Ű, F2 Ű�� �����ٰ� �������� ȣ��
function setCrlKeyUp(e){
	if (!e) e = window.event;
	
	// F2 Ű
	if(e.keyCode == "113"){
		clickLine(document.frm.btnSearchRow, 1);
	}
	
	// ctrl Ű
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = false;
	}
}

// ȭ�鿡�� CTRL Ű�� �������¿��� ����Ű�� �������� �� �̵��� �����ϰ� �ϴ� function
function moveUpDown(objBox){
	
	// ctrl Ű�� keydown ���°� �ƴ� ��쿡�� return 
	if(!ctrlKeyDownCheck)
		return;
	
	var tableLen = left_tbody.rows.length;
	// ��ǰ�ڵ� ���� ���
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	
	// Row�� 2�� �̻� �ִ� ���..
	if(document.frm.base_stk_plt[rowIdx]){
		// ����Ű ��(��) : 38, ��(�Ʒ�) : 40, ��(����) : 37, ��(������) : 39
		// 1. �� : 38
		if( event.keyCode == "38" ) {
			
			if(objName == "base_stk_plt"){	// �⺻������ PLT
				if( rowIdx == 0 ) 		document.frm.base_stk_plt[tableLen-2].focus();
				else 					document.frm.base_stk_plt[rowIdx-1].focus();
			}
			else if(objName == "base_stk_box"){ // �⺻������ BOX
				if( rowIdx == 0 )		document.frm.base_stk_box[tableLen-2].focus();
				else 					document.frm.base_stk_box[rowIdx-1].focus();
			}
			else if(objName == "add_stk_plt"){ // �߰������� PLT
				if( rowIdx == 0 )		document.frm.add_stk_plt[tableLen-2].focus();
				else 					document.frm.add_stk_plt[rowIdx-1].focus();
			}
			else if(objName == "add_stk_box"){ // �߰������� BOX
				if( rowIdx == 0 )		document.frm.add_stk_box[tableLen-2].focus();
				else 					document.frm.add_stk_box[rowIdx-1].focus();
			}
			else if(objName == "prod_plt"){ // ���������� PLT
				if( rowIdx == 0 )		document.frm.prod_plt[tableLen-2].focus();
				else					document.frm.prod_plt[rowIdx-1].focus();
			}
			else if(objName == "prod_box"){ // ���������� BOX
				if( rowIdx == 0 )		document.frm.prod_box[tableLen-2].focus();
				else					document.frm.prod_box[rowIdx-1].focus();
			}
		}
		// 2. �Ʒ� : 40
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
		// 3. ���� : 37
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
		// 4. ������ : 39
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
	// Row�� �Ѱ��� ���..
	else{
		// 3. ���� : 37
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
		// 4. ������ : 39
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

// input box �� Edit Mode �� ��ȯ
// onClick
function setEditMode( objTd ) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	var transDate = null;
	
	// �Ϲ� Text �ڽ��� ��쿡�� �Ʒ��� ���� ����.
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
	
	// ��ǰ�ڵ� �˻� ���ΰ��
	if( objTd.childNodes(0).id == "divItemId" ) {
		objTd.childNodes(1).childNodes(0).focus();
	}
	// �������� �˻� ��
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

// input box �� View Mode �� ��ȯ
// onFocusOut
function setViewMode( objBox ) {
	
	// ��ǰ�ڵ� �˻� ���ΰ��
	//if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
	if( objBox.name == "item_id" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		}
	}
	// �������� ���� ���
	else if( objBox.name == "transDateTmp" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == clickedDateIdx ) {
			return;
		}
		// ������ ���� ����
		var trans_date_temp = objTd.childNodes(1).value;
		// ����� ���� ����
		objTd.childNodes(1).value = strVal;
		
		if(trans_date_temp != strVal){
			calPKCum(objTd.parentNode.rowIndex);
		}
		
	}
	// select box �� ���, value �� �ƴ϶� TEXT �� ǥ���� ��� ��
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


// �⺻������, �߰�������, ��������� PLT, BOX���� �����Ǿ����� ȣ���.
function onChangeCheck(objBox){
	
	
	var strVal = objBox.value;
	
	// �⺻������BOX, �߰�������BOX, �������BOX �Է�â�� ���, ���� üũ & õ���� ������ ǥ��
	if( objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box" ||
	    objBox.name == "base_stk_plt" || objBox.name == "add_stk_plt" || objBox.name == "prod_plt") {
		if( strVal != "" && strVal != null ) {
			// ���� üũ
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
				return;
			}
			// ������ �´� ��� õ���� ������ ǥ��
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
			// BOX �ΰ��.
			if(objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box")
				objBox.value = "0";
			else
				objBox.value = "0.00"
		}
		
		// BOX �� ��� ������������ ���
		if( objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box" ) {
			// PLT ���� ���
			calPltQty(objBox);
			// ���� ���
			calPltBoxCum(objBox);
		}
		
		// PLT �� ��� ������������ ���
		if( objBox.name == "base_stk_plt" || objBox.name == "add_stk_plt" || objBox.name == "prod_plt" ) {
			// Box ���� ���
			calBoxQty(objBox);
			// ���� ���
			calPltBoxCum(objBox);
		}
	}
}

// ���������� click�� ���� �ӽ�����
var temp_clicked_box_value = 0;
var temp_clicked_plt_value = 0;

// ���� Ŭ���� PLT�� BOX���� �ӽ÷� �����ϱ� ���ؼ� ȣ��Ǵ� function
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

// popup ��ȸ �̹��� mouseOver
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup ��ȸ �̹��� mouseOut
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function outImg( objImg ) {
	
	popImgIdx = null;
	
}

// ��¥ �˻� POP BTN mouseOver
function overBtn( objBtn ) {
	
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// ��¥ �˻� POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
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

// PLT ���� ���
function calPltQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "base_stk_box" ) { // �⺻������
			var pltBox = document.frm.base_stk_plt[rowIdx];
		}
		else if( objBox.name == "add_stk_box" ) { // �߰�������
			var pltBox = document.frm.add_stk_plt[rowIdx];
		}
		else if( objBox.name == "prod_box" ) { // �������
			var pltBox = document.frm.prod_plt[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "base_stk_box" ) { // �⺻������
			var pltBox = document.frm.base_stk_plt;
		}
		else if( objBox.name == "add_stk_box" ) { // �߰�������
			var pltBox = document.frm.add_stk_plt;
		}
		else if( objBox.name == "prod_box" ) { // �������
			var pltBox = document.frm.prod_plt;
		}
		else {
			return;
		}
	}
	
	// PALET �� BOX ������ ���� ��� 100 ���� ���
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

// Box ���� ���
function calBoxQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "base_stk_plt" ) { // �⺻������
			var boxPlt = document.frm.base_stk_box[rowIdx];
		}
		else if( objBox.name == "add_stk_plt" ) { // �߰�������
			var boxPlt = document.frm.add_stk_box[rowIdx];
		}
		else if( objBox.name == "prod_plt" ) { // �������
			var boxPlt = document.frm.prod_box[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "base_stk_plt" ) { // �⺻������
			var boxPlt = document.frm.base_stk_box;
		}
		else if( objBox.name == "add_stk_plt" ) { // �߰�������
			var boxPlt = document.frm.add_stk_box;
		}
		else if( objBox.name == "prod_plt" ) { // �������
			var boxPlt = document.frm.prod_box;
		}
		else {
			return;
		}
	}
	
	// PALET �� BOX ������ ���� ��� 100 ���� ���
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
		var boxQty = Math.round(pltQty * boxPerPalet*100)/100;
		var boxStr = numberFormat(boxQty.toString());
	}
	
	boxPlt.value = delComma(boxStr);
	
}

/*********************************************************/


/**************************************************************************************************
 **************************************** ������������ ��� �Լ�  *************************************
 **************************************************************************************************/

// ������ Row�� ��������, ��������, ������� ���� Row�鸸 ������������ ��� (���ϸ� ���̱� ���ؼ�.)
// BOX, PLT�� ������ ��� ȣ��..
function calPltBoxCum(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var tableLen = left_tbody.rows.length;
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var end_flag = false;
	
	// ������ Row�� �� ������ ���..
	if(rowIdx == 0){
		if(document.frm.base_stk_box[0]){
			cumBox += strToNum(document.frm.base_stk_box[0].value);
			cumBox += strToNum(document.frm.add_stk_box[0].value);
			cumBox += strToNum(document.frm.prod_box[0].value);
			cumPlt += strToNum(document.frm.base_stk_plt[0].value);
			cumPlt += strToNum(document.frm.add_stk_plt[0].value);
			cumPlt += strToNum(document.frm.prod_plt[0].value);
			
			// ���� ���
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
			
			// ���� ���
			document.frm.cum_box.value = numberFormat(cumBox.toString());
			cumPlt = Math.round(cumPlt*1000000)/1000000;
			document.frm.cum_plt.value = fixedPoint(cumPlt.toString(), 2);
		}	
		cumBox = 0; cumPlt = 0;
	}
	
	// Row�� �� ������ �ƴϸ�, ������ Row �ٷ� ���� �������� cumBox�� cumPlt�� setting ��
	// ������ Row ���� �ٷ� �� Row�� ���������� ������ ���ϱ� ���ؼ�.
	if(rowIdx != 0 
		&& document.frm.trans_date[rowIdx].value == document.frm.trans_date[rowIdx-1].value
		&& document.frm.src_loc[rowIdx].value == document.frm.src_loc[rowIdx-1].value 
		&& document.frm.truck_seq[rowIdx].value == document.frm.truck_seq[rowIdx-1].value){
		cumBox = strToNum(document.frm.cum_box[rowIdx-1].value);
		cumPlt = strToNum(document.frm.cum_plt[rowIdx-1].value);
	}
	
	// Row ���� 1�̻��� ���.
	if(tableLen > 2){
		// ���õ� Row�� ��������, �����, ���� ��ȣ�� �ӽ� ������.
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
			
		// ������ Row�� �ش��ϴ� ������ �������� ����.
		for( var i = rowIdx ; i < tableLen-1 ; i++ ) {
			if( document.frm.base_stk_box[i] ) {

				// �����, ���������� ���� ������ ���� ����
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
				// PALET �� BOX ������ ���� ��� 1 �� ���
				if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
					var boxPerPalet = 100;
				}
				else {
					var boxPerPalet = Number(delComma(boxPerPaletStr));
				}
				
				// BOX �Է�â�� ��� �ִ� ���
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
	
	// Total ���ϴ� �κ�..
	var totalCumPlt  = 0;
	var totalCumBox  = 0;
	
	
	// �հ�Row �̿��� ��� Row�� ������ ���, �հ踦 ���� ���� ��� ���� ����.
	if(tableLen <= 1){
			document.frm.tot_base_plt.value  =  fixedPoint(totalCumPlt.toString(), 2);
			document.frm.tot_base_box.value  =  totalCumBox;
			document.frm.tot_add_plt.value   =  fixedPoint(totalCumPlt.toString(), 2);
			document.frm.tot_add_box.value   =  totalCumBox;
			document.frm.tot_prod_plt.value  =  fixedPoint(totalCumPlt.toString(), 2);
			document.frm.tot_prod_box.value  =  totalCumBox;
	}
	// �հ� Row �̿ܿ� 1���� Row�� �����ϴ� ���.
	else if(tableLen == 2){
		// ���� �迭�����ΰ��..
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
	// Row ���� 1�̻��� ���.
	else{
		totalCumPlt	= strToNum(document.frm.tot_cum_plt.value);
		totalCumBox	= strToNum(document.frm.tot_cum_box.value);
		
		// �⺻�������� ������ ���.
		if(objBox.name == "base_stk_plt" || objBox.name == "base_stk_box" ) {
			var calPlt = strToNum(document.frm.base_stk_plt[rowIdx].value) - strToNum(temp_clicked_plt_value);	// ������ ������ �������� ����
			var calBox = strToNum(document.frm.base_stk_box[rowIdx].value) - strToNum(temp_clicked_box_value);	// ������ ������ �������� ����
			var calPltStr = strToNum(document.frm.tot_base_plt.value) + calPlt;
			document.frm.tot_base_plt.value = fixedPoint(calPltStr.toString(), 2);
			document.frm.tot_base_box.value = strToNum(document.frm.tot_base_box.value) + calBox;
			
			totalCumPlt	+= calPlt;
			totalCumBox += calBox;
		}
		// �߰��������� ������ ���.
		else if(objBox.name == "add_stk_plt" || objBox.name == "add_stk_box" ){
			var calPlt = strToNum(document.frm.add_stk_plt[rowIdx].value) - strToNum(temp_clicked_plt_value);	// ������ ������ �������� ����
			var calBox = strToNum(document.frm.add_stk_box[rowIdx].value) - strToNum(temp_clicked_box_value);	// ������ ������ �������� ����
			var calPltStr = strToNum(document.frm.tot_add_plt.value) + calPlt;
			document.frm.tot_add_plt.value = fixedPoint(calPltStr.toString(), 2);
			document.frm.tot_add_box.value = strToNum(document.frm.tot_add_box.value) + calBox;
			
			totalCumPlt	+= calPlt;
			totalCumBox += calBox;
		}
		// ��������� ������ ���.
		else if(objBox.name == "prod_plt" || objBox.name == "prod_box" ){
			var calPlt = strToNum(document.frm.prod_plt[rowIdx].value) - strToNum(temp_clicked_plt_value);	// ������ ������ �������� ����
			var calBox = strToNum(document.frm.prod_box[rowIdx].value) - strToNum(temp_clicked_box_value);	// ������ ������ �������� ����
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


// ���� ��ư�� Ŭ���Ͽ�����, �������� ������ ���ϴ� function
function caldelCum(rowIdex) {
	
	var rowIdx = rowIdex;
	var tableLen = left_tbody.rows.length;
	
	// �հ�Row �̿ܿ� Row�� �������� �ʴ� ���, �հ��� ��� ���� 0���� ����.
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
		// ������ Row�� ���ٰ� ���� ���..
		if(rowIdx != 0 
			&& document.frm.trans_date[rowIdx].value == document.frm.trans_date[rowIdx-1].value
			&& document.frm.src_loc[rowIdx].value == document.frm.src_loc[rowIdx-1].value 
			&& document.frm.truck_seq[rowIdx].value == document.frm.truck_seq[rowIdx-1].value){
			cumBox = strToNum(document.frm.cum_box[rowIdx-1].value);
			cumPlt = strToNum(document.frm.cum_plt[rowIdx-1].value);
		}
		
		// Row ���� 1�̻��� ���.
		if(tableLen > 1){
			// ���õ� Row�� ��������, �����, ���� ��ȣ�� �ӽ� ������.
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
	
					// �����, ���������� ���� ������ ���� ����
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
					// PALET �� BOX ������ ���� ��� 1 �� ���
					if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
						var boxPerPalet = 100;
					}
					else {
						var boxPerPalet = Number(delComma(boxPerPaletStr));
					}
					
					// BOX �Է�â�� ��� �ִ� ���
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
	
	// Total ���ϴ� �κ�..
	var totalCumPlt  = 0;
	var totalCumBox  = 0;
	
	
	// �հ�Row �̿��� ��� Row�� ������ ���, �հ踦 ���� ���� ��� ���� ����.
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
	// Row ���� 1�̻��� ���.
	else{
		totalCumPlt	= strToNum(document.frm.tot_cum_plt.value);
		totalCumBox	= strToNum(document.frm.tot_cum_box.value);
		
		// �⺻�������� ������ ���
		var calBasePltStr = strToNum(document.frm.tot_base_plt.value) - strToNum(old_base_plt);
		document.frm.tot_base_plt.value = fixedPoint(calBasePltStr.toString(), 2);
		document.frm.tot_base_box.value = strToNum(document.frm.tot_base_box.value) - strToNum(old_base_box);
			
		totalCumPlt	-= strToNum(old_base_plt);
		totalCumBox -= strToNum(old_base_box);
		
		// �߰��������� ������ ���
		var calAddPltStr = strToNum(document.frm.tot_add_plt.value) - strToNum(old_add_plt);
		document.frm.tot_add_plt.value = fixedPoint(calAddPltStr.toString(), 2);
		document.frm.tot_add_box.value = strToNum(document.frm.tot_add_box.value) - strToNum(old_add_box);
			
		totalCumPlt	-= strToNum(old_add_plt);
		totalCumBox -= strToNum(old_add_box);
		
		// ��������� ������ ���
		var calPltStr = strToNum(document.frm.tot_prod_plt.value) - strToNum(old_prod_plt);
		document.frm.tot_prod_plt.value = fixedPoint(calPltStr.toString(), 2);
		document.frm.tot_prod_box.value = strToNum(document.frm.tot_prod_box.value) - strToNum(old_prod_box);
		
		totalCumPlt	-= strToNum(old_prod_plt);
		totalCumBox -= strToNum(old_prod_box);
		
		// ���������� ������ ���
		document.frm.tot_cum_plt.value = fixedPoint(totalCumPlt.toString(),2);
		document.frm.tot_cum_box.value = numberFormat(totalCumBox.toString());
	}
}

//  ��������, �԰���, ���� ���� ����� ��, �Ʒ� �ٿ� ���� ������������ ���
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
		
		if(rowIdx == 0){ // ����� Row�� �� �� ���ΰ��..
			// 1. ����� Row�� �Ʒ� Row�� PK�� ���� ���..
			if(document.frm.routeClass[rowIdx+1].value 	== c_route_class
				&& document.frm.trans_date[rowIdx+1].value == c_trans_date
				&& document.frm.src_loc[rowIdx+1].value 	== c_src_loc 
				&& document.frm.truck_seq[rowIdx+1].value 	== c_truck_seq )	{
				
				for( var i = 0 ; i < tableLen-1 ; i++ ) {
					if( document.frm.cum_box[i] ) {
						// �����, ���������� ���� ������ ���� ����
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
			// ����� Row�� �Ʒ� Row�� PK�� �ٸ� ���..
			else{
				// ������ ���� cumBox ���� ����
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
						// �����, ���������� ���� ������ ���� ����
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
		// 2. ����� Row�� ������ ���ΰ��
		else if(rowIdx == tableLen-2){ // ����� Row�� ������ ���ΰ��
			// ����� Row�� �ٷ� ���� Row�� PK�� ���� ���..
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
			// ����� Row�� �ٷ� ���� Row�� PK�� �ٸ� ���..
			else{
				// ������ ���� cumBox ���� ����
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
		// 3. �߰��� Row�� ������ ���..
		else{
			cumBox = 0; cumPlt = 0;
			// ����� Row�� �ٷ� ���� Row�� PK�� ���� ���..
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
			// ����� Row�� �ٷ� ���� Row�� PK�� �ٸ� ���..
			else{
				// ������ ���� cumBox ���� ����
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
			// ����� Row�� �Ʒ� Row�� PK�� ���� ���..
			if(document.frm.routeClass[rowIdx+1].value 	== c_route_class
				&& document.frm.trans_date[rowIdx+1].value == c_trans_date
				&& document.frm.src_loc[rowIdx+1].value 	== c_src_loc 
				&& document.frm.truck_seq[rowIdx+1].value 	== c_truck_seq )	{
				
				cumBox = strToNum(document.frm.cum_box[rowIdx].value);
				cumPlt = strToNum(document.frm.cum_plt[rowIdx].value);
				
				for( var i = rowIdx+1 ; i < tableLen-1 ; i++ ) {
					if( document.frm.cum_box[i] ) {
						// �����, ���������� ���� ������ ���� ����
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
			// ����� Row�� �Ʒ� Row�� PK�� �ٸ� ���..
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
						// �����, ���������� ���� ������ ���� ����
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
	// ���� ���� ���� �޼ҵ� ȣ��.
	setLastPltColor();
}

// 3. ��� Row�� ������ �ٽ� ���ϴ� �޼ҵ�
function allCalCum() {
	var tableLen = left_tbody.rows.length;
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var check_color = 0;

	// Row ���� 2�̻��� ���.
	if(tableLen >= 2){
		
		for( var i = 0 ; i < tableLen-1 ; i++ ) {
			if( document.frm.cum_box[i] ) {
				
				//alert(preTransDate+" "+preSrcLoc+" "+preTruckSeq);
				// �����, ���������� ���� ������ ���� ����
				if( document.frm.trans_date[i].value == preTransDate
					&& document.frm.src_loc[i].value == preSrcLoc 
					&& document.frm.truck_seq[i].value == preTruckSeq ) {
					
					/************** ���� ��� �κ� ***************/
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
					/************** ���� ��� �κ� ***************/
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

// ������ �� ������ �������� ���� �Ķ������� �����ϴ� function
function setLastPltColor(){
	var tableLen = left_tbody.rows.length;
	var lastPltRow = 0;
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	
	if(tableLen <= 1){
		return;
	}
	if(tableLen == 2){ // �հ���̰ų�, Row�� �Ѱ��϶��� ���� ����
		if(document.frm.cum_plt[0]){
			document.frm.cum_plt[0].style.color = "RED";
			document.frm.cum_box[0].style.color = "RED";
		}else{
			document.frm.cum_plt.style.color = "RED";
			document.frm.cum_box.style.color = "RED";
		}
		return;
	}
	// Row ���� 2�̻��� ���.
	if(tableLen > 2){
		
		for( var i = 0 ; i < tableLen-1 ; i++ ) {
			if( document.frm.cum_box[i] ) {
				if(i == tableLen-2){
					document.frm.cum_plt[i].style.color = "RED";
					document.frm.cum_box[i].style.color = "RED";
				}else{
					// �����, ���������� ���� ������ ���� ����
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

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
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

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ 
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

/* Old Version -> ���߿� ȭ�� ����� ������ �̹������� �����ؾ���.(�̺�Ʈ�� �����ؾ���.)
// ���̺� ���� Ŭ���� Ŭ���� ���� ǥ��
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

// ���̺� ���� Ŭ���� Ŭ���� ���� ǥ��
function clickLine(objTd, flag) {
	
	if(flag == 1){	// ��ȸ ��ư�� Ŭ���� ���..
		if(clickedLineIdx == "" || clickedLineIdx == null){
			if(clickedLineIdx != 0){
				alert("���� ��ȸ�� Row�� �����Ͽ� �ֽʽÿ�.");
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
			// ó�� ������� ���õǾ� ���� ���� ��쿡�� �Ʒ��� ���� ó��. 
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
	}else if(flag == 2){ //��ȣ�� Ŭ���� ���..
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

// iframe ���� refresh
function refreshFrame() {
	
	// �Ǹ��������� refresh
	gridBLeft.GoSearch("rp_01010_dailyTransportPlanSalesInfo_list");
	
	// ���忹������� refresh
	gridBRight.GoSearch("rp_01010_dailyTransportPlanStockInfo_list");
	
}

// iframe ���� refresh
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

	// ���忹������� refresh
	gridBRight.GoSearch("rp_01010_dailyTransportPlanStockInfo_list");
	
}


/**************************************************************************************************
 **************************************** ADD ROW �Լ�(���� �߰�)************************************
 **************************************************************************************************/

// row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRow( objBtn ) {
	
	// ������ �����Ͽ� �����͸� ��ȸ�� ���°� �ƴϸ�, row �߰� �Ұ�
	if( document.frm.version.value == "" || document.frm.version.value == null ) {
		alert("������ �����Ͽ� �����͸� ��ȸ�� ��, ������ �߰��� �����մϴ�.");
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
	// index�� �������� Row�� �߰��ϴ� method ȣ��
	
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
		memCheckRow(insertRowIndex-1);		// Row �߰��� ���� Row�� ���� �״�� �־� �ֱ� ���ؼ�.
		setParentValueRow(insertRowIndex, '', '');
	}
	
	// ���� �߰��Ǵ� Row�� ���� ������ Row �ΰ��, �� ���� �� ������ �ٽ� �����.
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

// check �ڽ��� ��� row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRowByIndex(rowIndex) {
	
	var oRowLeft = left_tbody.insertRow(rowIndex);
	var oRowMain = main_tbody.insertRow(rowIndex);
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout  = function() { bgOut(this); }; 
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout  = function() { bgOut(this); }; 
	oRowMain.height = 22;
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����
	var oCell2 = oRowLeft.insertCell(); // ����
	var oCell3 = oRowLeft.insertCell(); // RTE ����
	var oCell4 = oRowLeft.insertCell(); // ��������
	var oCell5 = oRowLeft.insertCell(); // �����
	var oCell6 = oRowLeft.insertCell(); // ��������
	var oCell7  = oRowLeft.insertCell(); // ��ǰ�ڵ�
	var oCell8  = oRowLeft.insertCell(); // ��ǰ��
	
	var oCell9  = oRowMain.insertCell(); // ������������ PLT 
	var oCell10 = oRowMain.insertCell(); // ������������ BOX 
	var oCell11 = oRowMain.insertCell(); // �⺻������ PLT
	var oCell12 = oRowMain.insertCell(); // �⺻������ BOX
	var oCell13 = oRowMain.insertCell(); // �߰������� PLT
	var oCell14 = oRowMain.insertCell(); // �߰������� BOX
	var oCell15 = oRowMain.insertCell(); // ������� PLT
	var oCell16 = oRowMain.insertCell(); // ������� BOX
	
	oCell4.onclick = function() { setEditMode(this); }; // ��������
	oCell5.onclick = function() { setEditMode(this); }; // �����
	oCell7.onclick  = function() { setEditMode(this); }; // ��ǰ�ڵ�
	
	oCell8.style.borderRight  = "solid"; // ��ǰ��
	oCell10.style.borderRight = "solid"; // ������������ BOX 
	oCell12.style.borderRight = "solid"; // �⺻������ BOX
	oCell14.style.borderRight = "solid"; // �߰������� BOX
	
	oCell0.align = "center"; oCell0.width = "30px" ; // ��ȣ
	oCell1.align = "center"; oCell1.width = "40px" ; // ����
	oCell2.align = "center"; oCell2.width = "40px" ; // ����
	oCell3.align = "center"; oCell3.width = "30px" ; // RTE ����
	oCell4.align = "center"; oCell4.width = "95px" ; // ��������
	oCell5.align = "left";   oCell5.width = "90px"; // �����
	oCell6.align = "center"; oCell6.width = "50px" ; // ��������	
	oCell7.align  = "center"; oCell7.width  = "100px"; // ��ǰ�ڵ�
	oCell8.align  = "left";   oCell8.width  = "150px"; // ��ǰ��
	
	oCell9.align  = "right";  oCell9.width  = "50px" ; // ������������ PLT 
	oCell10.align  = "right"; oCell10.width = "50px" ; // ������������ BOX 
	oCell11.align = "right";  oCell11.width = "50px" ; // �⺻������ PLT
	oCell12.align = "right";  oCell12.width = "50px" ; // �⺻������ BOX
	oCell13.align = "right";  oCell13.width = "50px" ; // �߰������� PLT
	oCell14.align = "right";  oCell14.width = "50px" ; // �߰������� BOX
	oCell15.align = "right";  oCell15.width = "50px" ; // ������� PLT
	oCell16.align = "right";  oCell16.width = "50px" ; oCell16.className = "right"; // ������� BOX
	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	oCell0.onclick = function() { clickLine(this,2); };
	// ����
	oCell1.innerHTML = "<input type=\"checkbox\" name=\"check_flag\" value=\"\" class=\"normal\" "
						+ "style=\"text-align:center; border-width:0; \" onKeyDown=\"moveNextBox(this); \"></input>";
	// ����
	oCell2.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this);  \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"is_calCum\" type=\"hidden\" value=\"N\"> "
						+ "<input name=\"hidden_color\" type=\"hidden\" value=\"N\">";
	// RTE ����
	oCell3.innerHTML = "<a id=\"divRteClass\"></a><input type=\"hidden\" name=\"routeClass\">"
	                    + "<input type=\"hidden\" name=\"old_date\">";
	// ��������
	oCell4.innerHTML = "<a id=\"divTransDate\"></a><input type=\"hidden\" name=\"trans_date\" value=\"\">";
	// �����
	oCell5.innerHTML = "<a id=\"divSrcLoc\"></a><select name=\"src_loc\" style=\"width:90px; display:none; \" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "onChange=\"getBoxPerPalet(this); calPKCum(this.parentNode.parentNode.rowIndex);\">"
						+ document.frm.src_loc_sel_str.value + "</select>";
	// ��������
	oCell6.innerHTML = "<input type=\"text\" name=\"truck_seq\" class=\"normal\" size=\"40\" "
						+ "onKeyDown=\"moveNextBox(this); \" onDblClick=\"this.select(); \""
						+ "onChange=\"calPKCum(this.parentNode.parentNode.rowIndex);\" "
						+ "style=\"width:100%; text-align:center; \">";
	
	// ��ǰ�ڵ�
	oCell7.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemInput\" style=\"display:none; \"><input type=\"text\" "
						+ "name=\"item_id\" class=\"normal\" size=\"100\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "onChange=\"getBoxPerPalet(this); getItemInfo(this); \" "
						+ "style=\"width:65px; padding-left:5px; \"><img name=\"imgItemId\" tabindex=\"-1\" "
						+ "src=\"sinc/template/basic/skin/nongshim/images/common/icon_search.gif\" align=\"absmiddle\" "
						+ "border=\"0\" onClick=\"openItemSearchPop(this); \" style=\"cursor:pointer; \" "
						+ "onMouseOver=\"overImg(this); \" onMouseOut=\"outImg(this); \"></a>";
	// ��ǰ��
	oCell8.innerHTML = "<a id=\"divItemName\"></a><input type=\"hidden\" name=\"item_name\">";
	// ������������ PLT
	oCell9.innerHTML = "<input type=\"text\" name=\"cum_plt\" class=\"normal\" value=\"0.00\" " 
						+ "style=\"border-width:0px; text-align:right; width:45px;\" readonly>";
	// ������������ BOX
	oCell10.innerHTML = "<input type=\"text\" name=\"cum_box\" class=\"normal\" value=\"0\" " 
						+ "style=\"border-width:0px; text-align:right; width:45px;\" readonly>";
	// �⺻������ PLT
	oCell11.innerHTML = "<input type=\"text\" name=\"base_stk_plt\" class=\"normal\" size=\"20\" value=\"0.00\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
					    + "onChange=\"onChangeCheck(this);\" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// �⺻������ BOX
	oCell12.innerHTML = "<input type=\"text\" name=\"base_stk_box\" class=\"normal\" size=\"20\" value=\"0\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this); \" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// �߰������� PLT
	oCell13.innerHTML = "<input type=\"text\" name=\"add_stk_plt\" class=\"normal\" size=\"20\" value=\"0.00\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this);\" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// �߰������� BOX
	oCell14.innerHTML = "<input type=\"text\" name=\"add_stk_box\" class=\"normal\" size=\"20\" value=\"0\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this); \" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// ������� PLT
	oCell15.innerHTML = "<input type=\"text\" name=\"prod_plt\" class=\"normal\" size=\"20\" value=\"0.00\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this);\" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	// ������� BOX
	oCell16.innerHTML = "<input type=\"text\" name=\"prod_box\" class=\"normal\" size=\"20\" value=\"0\" "
						+ "onKeyDown=\"moveNextBox(this); \" onKeyUp=\"moveUpDown(this);\" onDblClick=\"this.select(); \" "
						+ "onChange=\"onChangeCheck(this);\" onfocusin=\"onClickCheck(this);\" "
						+ "style=\"width:100%; padding-right:5px; text-align:right; \">";
	
	
	document.recalc();
	setRowNo();
	
}

/**************************************************************************************************/

// ��ȣ setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	areaTot.innerHTML = tableLen-1;
	
	var clickedFlag = false; // üũ�� ������ �ִ��� ����
	
	for( var i = 0 ; i < tableLen-1 ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
			// üũ�� �Ǿ��ִ� �����̸� clickedLineIdx ����
			if( left_tbody.rows[i].style.backgroundColor == "#8de88d" ) {
				clickedLineIdx = i;
				clickedFlag = true;
			}
		}
		else {
			divRowNo.innerHTML = "1";
			// üũ�� �Ǿ��ִ� �����̸� clickedLineIdx ����
			if( left_tbody.rows[0].style.backgroundColor == "#8de88d" ) {
				clickedLineIdx = 1;
				clickedFlag = true;
			}
		}
		if(tableLen == 1){
			divRowNo.innerHTML = "0";
		}
	}
	
	// üũ�Ǿ� �ִ� ������ ������ clickedLineIdx = null
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

// row ���� 
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
		// �����Ǵ� Row�� Check �Ǿ� �ִ� ���¸� Check �� ��� Row�� ����
		if(document.frm.check_flag[delRowIdx].checked){
			
			old_base_plt = document.frm.base_stk_plt[delRowIdx].value;
			old_base_box = document.frm.base_stk_box[delRowIdx].value;
			old_add_plt = document.frm.add_stk_plt[delRowIdx].value;
			old_add_box = document.frm.add_stk_box[delRowIdx].value;
			old_prod_plt = document.frm.prod_plt[delRowIdx].value;
			old_prod_box = document.frm.prod_box[delRowIdx].value;
			
			delRowDo( delRowIdx );  			// ���� ������ Row ����
			
			caldelCum(delRowIdx);
			tableLen --;						// �̹� Row �ϳ��� ���� �Ǿ����Ƿ�, ��ü Row�� ���� 1 ���� ��Ų��.
			
			//alert("start");
			// ������ Row�� ������ Check�� ��� Row ����
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
						// �� ������ Row�� ������ �� ���� Row�� �����Ƿ� ���� ����� ���ص���.
						
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
					// �� ������ Row�� ������ �� ���� Row�� �����Ƿ� ���� ����� ���ص���.
					
					caldelCum(0);
					i--;
					tableLen--;
					
				}
			}
		}
		// �����Ǵ� Row�� Check�Ǿ� ���� �ʴ� ���, �ڱ� �ڽŸ� ������.
		else{
			old_base_plt = document.frm.base_stk_plt[delRowIdx].value;
			old_base_box = document.frm.base_stk_box[delRowIdx].value;
			old_add_plt = document.frm.add_stk_plt[delRowIdx].value;
			old_add_box = document.frm.add_stk_box[delRowIdx].value;
			old_prod_plt = document.frm.prod_plt[delRowIdx].value;
			old_prod_box = document.frm.prod_box[delRowIdx].value;
					
			delRowDo( delRowIdx );
			// �� ������ Row�� ������ �� ���� Row�� �����Ƿ� ���� ����� ���ص���.
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

// ���� row ���� �Լ�
// parameter : ������ rowIndex
function delRowDo( rowIdx ) { 
	
	left_tbody.deleteRow(rowIdx); 
	main_tbody.deleteRow(rowIdx);
	
}

// ���� ������ �ϸ� ��ư�� ��Ÿ���� �� �ȸԴ´�. ����, �� �ϴ� ������ ������ ������Ѵ�.
// �̷��� �ϸ� ��ư�� ��Ÿ���� �� �Դ´�.
// �� �ϴ� ���� ������ ��� & ���� & ���� & ä��
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
 ************************************ �� Row�� ���� memory �ϴ� �Լ� *********************************
 **************************************************************************************************/

var arrCheckData = new Array(18); 
// 1. ���õ�  ���� ������ ���
function memCheckRow(indexNum) {
	
	//var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[indexNum] ) {
	
		arrCheckData[0] 	= document.frm.routeClass[indexNum].value;   // RTE ����
		arrCheckData[1] 	= document.frm.trans_date[indexNum].value;   // ��������
		arrCheckData[2] 	= document.frm.src_loc[indexNum].value;      // �����
		arrCheckData[3] 	= document.frm.truck_seq[indexNum].value;    // ��������
		arrCheckData[4] 	= document.frm.item_id[indexNum].value;      // ��ǰ�ڵ�
		arrCheckData[5] 	= document.frm.item_name[indexNum].value;    // ��ǰ��
		arrCheckData[6] 	= document.frm.base_stk_plt[indexNum].value; // �⺻������ PLT
		arrCheckData[7] 	= document.frm.base_stk_box[indexNum].value; // �⺻������ BOX
		arrCheckData[8] 	= document.frm.add_stk_plt[indexNum].value;  // �߰������� PLT
		arrCheckData[9] 	= document.frm.add_stk_box[indexNum].value;  // �߰������� BOX
		arrCheckData[10] = document.frm.prod_plt[indexNum].value;     // ������� PLT
		arrCheckData[11] = document.frm.prod_box[indexNum].value;     // ������� BOX
		arrCheckData[12] = document.frm.cum_plt[indexNum].value;      // ������������ PLT
		arrCheckData[13] = document.frm.cum_box[indexNum].value;      // ������������ BOX
		arrCheckData[14] = left_tbody.rows[indexNum].style.backgroundColor; // üũ color
		arrCheckData[15] = document.frm.old_date[indexNum].value; // ���� ��¥
		arrCheckData[16] = document.frm.hidden_color[indexNum].value; // ���� ����
		arrCheckData[17] = document.frm.box_per_palet[indexNum].value; // box_per_palet
	}
}

var arrData = new Array(18); 
// 2. �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[tableLen-2] ) {
		arrData[0] 	= document.frm.routeClass[tableLen-2].value;   // RTE ����
		arrData[1] 	= document.frm.trans_date[tableLen-2].value;   // ��������
		arrData[2] 	= document.frm.src_loc[tableLen-2].value;      // �����
		arrData[3] 	= document.frm.truck_seq[tableLen-2].value;    // ��������
		arrData[4] 	= document.frm.item_id[tableLen-2].value;      // ��ǰ�ڵ�
		arrData[5] 	= document.frm.item_name[tableLen-2].value;    // ��ǰ��
		arrData[6] 	= document.frm.base_stk_plt[tableLen-2].value; // �⺻������ PLT
		arrData[7] 	= document.frm.base_stk_box[tableLen-2].value; // �⺻������ BOX
		arrData[8] 	= document.frm.add_stk_plt[tableLen-2].value;  // �߰������� PLT
		arrData[9] 	= document.frm.add_stk_box[tableLen-2].value;  // �߰������� BOX
		arrData[10] = document.frm.prod_plt[tableLen-2].value;     // ������� PLT
		arrData[11] = document.frm.prod_box[tableLen-2].value;     // ������� BOX
		arrData[12] = document.frm.cum_plt[tableLen-2].value;      // ������������ PLT
		arrData[13] = document.frm.cum_box[tableLen-2].value;      // ������������ BOX
		arrData[14] = left_tbody.rows[tableLen-2].style.backgroundColor; // üũ color
		arrData[15] = document.frm.old_date[tableLen-2].value; // ���� ��¥
		arrData[16] = document.frm.hidden_color[tableLen-2].value; // ���� ����
		arrData[17] = document.frm.box_per_palet[tableLen-2].value; // box_per_palet
	}
	else {
		arrData[0] 	= document.frm.routeClass.value;   // RTE ����
		arrData[1] 	= document.frm.trans_date.value;   // ��������
		arrData[2] 	= document.frm.src_loc.value;      // �����
		arrData[3] 	= document.frm.truck_seq.value;    // ��������
		arrData[4] 	= document.frm.item_id.value;      // ��ǰ�ڵ�
		arrData[5] 	= document.frm.item_name.value;    // ��ǰ��
		arrData[6] 	= document.frm.base_stk_plt.value; // �⺻������ PLT
		arrData[7] 	= document.frm.base_stk_box.value; // �⺻������ BOX
		arrData[8] 	= document.frm.add_stk_plt.value;  // �߰������� PLT
		arrData[9] 	= document.frm.add_stk_box.value;  // �߰������� BOX
		arrData[10] = document.frm.prod_plt.value;     // ������� PLT
		arrData[11] = document.frm.prod_box.value;     // ������� BOX
		arrData[12] = document.frm.cum_plt.value;      // ������������ PLT
		arrData[13] = document.frm.cum_box.value;      // ������������ BOX
		arrData[14] = left_tbody.rows[0].style.backgroundColor; // üũ color
		arrData[15] = document.frm.old_date.value; // ���� ��¥
		arrData[16] = document.frm.hidden_color.value; // ���� ��¥
		arrData[17] = document.frm.box_per_palet.value; // box_per_palet
	}
	
}

/**************************************************************************************************/



/**************************************************************************************************
 ************************************ memory�� ����Ÿ�� ���� �ϴ� �Լ� ********************************
 **************************************************************************************************/

// 1.  Check�� Row�鿡 ���� ������ �Ҷ�, �� Row�� ������ ä��
function setCheckValueRow(indexNum) {
	
	//var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[indexNum] ) {
		document.frm.routeClass[indexNum].value 	= arrCheckData[0];  // RTE ����
		document.frm.trans_date[indexNum].value 	= arrCheckData[1];  // ��������
		document.frm.src_loc[indexNum].value 		= arrCheckData[2];  // �����
		document.frm.truck_seq[indexNum].value 		= arrCheckData[3];  // ��������
		document.frm.item_id[indexNum].value 		= arrCheckData[4];  // ��ǰ�ڵ�
		document.frm.item_name[indexNum].value 		= arrCheckData[5];  // ��ǰ��
		document.frm.base_stk_plt[indexNum].value 	= arrCheckData[6];  // �⺻������ PLT
		document.frm.base_stk_box[indexNum].value 	= arrCheckData[7];  // �⺻������ BOX
		document.frm.add_stk_plt[indexNum].value 	= arrCheckData[8];  // �߰������� PLT
		document.frm.add_stk_box[indexNum].value 	= arrCheckData[9];  // �߰������� BOX
		document.frm.prod_plt[indexNum].value 		= arrCheckData[10]; // ������� PLT
		document.frm.prod_box[indexNum].value 		= arrCheckData[11]; // ������� BOX
		document.frm.cum_plt[indexNum].value 		= fixedPoint(arrCheckData[12].toString(),2); // ������������ PLT
		document.frm.cum_box[indexNum].value 		= numberFormat(arrCheckData[13].toString()); // ������������ BOX
		document.frm.old_date[indexNum].value 	= arrCheckData[15]; // ���� ��¥
		document.frm.hidden_color[indexNum].value 	= arrCheckData[16]; // ���� ����
		document.frm.box_per_palet[indexNum].value 	= arrCheckData[17]; // box_per_palet
		
		divRteClass[indexNum].innerHTML 	= arrCheckData[0]; // RTE ����
		divTransDate[indexNum].innerHTML 	= arrCheckData[1]; // ��������
		setViewMode(document.frm.src_loc[indexNum]); 	  // �����
		divItemId[indexNum].innerHTML 	= arrCheckData[4]; // ��ǰ�ڵ�
		divItemName[indexNum].innerHTML 	= "&nbsp;" + arrCheckData[5]; // ��ǰ��
	}
}

// 2. �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[tableLen-2] ) {
		document.frm.routeClass[tableLen-2].value 	= arrData[0];  // RTE ����
		document.frm.trans_date[tableLen-2].value 	= arrData[1];  // ��������
		document.frm.src_loc[tableLen-2].value 		= arrData[2];  // �����
		document.frm.truck_seq[tableLen-2].value 	= arrData[3];  // ��������
		document.frm.item_id[tableLen-2].value 		= arrData[4];  // ��ǰ�ڵ�
		document.frm.item_name[tableLen-2].value 	= arrData[5];  // ��ǰ��
		document.frm.base_stk_plt[tableLen-2].value = arrData[6];  // �⺻������ PLT
		document.frm.base_stk_box[tableLen-2].value = arrData[7];  // �⺻������ BOX
		document.frm.add_stk_plt[tableLen-2].value 	= arrData[8];  // �߰������� PLT
		document.frm.add_stk_box[tableLen-2].value 	= arrData[9];  // �߰������� BOX
		document.frm.prod_plt[tableLen-2].value 	= arrData[10]; // ������� PLT
		document.frm.prod_box[tableLen-2].value 	= arrData[11]; // ������� BOX
		document.frm.cum_plt[tableLen-2].value 		= fixedPoint(arrData[12].toString(),2); // ������������ PLT
		document.frm.cum_box[tableLen-2].value 		= numberFormat(arrData[13].toString()); // ������������ BOX
		document.frm.old_date[tableLen-2].value 	= arrData[15]; // ���� ��¥
		document.frm.hidden_color[tableLen-2].value 	= arrData[16]; // ���� ��¥
		document.frm.box_per_palet[tableLen-2].value 	= arrData[17]; // box_per_palet
		
		divRteClass[tableLen-2].innerHTML 	= arrData[0]; // RTE ����
		divTransDate[tableLen-2].innerHTML 	= arrData[1]; // ��������
		setViewMode(document.frm.src_loc[tableLen-2]); 	  // �����
		divItemId[tableLen-2].innerHTML 	= arrData[4]; // ��ǰ�ڵ�
		divItemName[tableLen-2].innerHTML 	= "&nbsp;" + arrData[5]; // ��ǰ��
	}
	else {
		document.frm.routeClass.value 	= arrData[0];  // RTE ����
		document.frm.trans_date.value 	= arrData[1];  // ��������
		document.frm.src_loc.value 		= arrData[2];  // �����
		document.frm.truck_seq.value 	= arrData[3];  // ��������
		document.frm.item_id.value 		= arrData[4];  // ��ǰ�ڵ�
		document.frm.item_name.value 	= arrData[5];  // ��ǰ��
		document.frm.base_stk_plt.value = arrData[6];  // �⺻������ PLT
		document.frm.base_stk_box.value = arrData[7];  // �⺻������ BOX
		document.frm.add_stk_plt.value 	= arrData[8];  // �߰������� PLT
		document.frm.add_stk_box.value 	= arrData[9];  // �߰������� BOX
		document.frm.prod_plt.value 	= arrData[10]; // ������� PLT
		document.frm.prod_box.value 	= arrData[11]; // ������� BOX
		document.frm.cum_plt.value 		= fixedPoint(arrData[12].toString,2); // ������������ PLT
		document.frm.cum_box.value 		= numberFormat(arrData[13].toString()); // ������������ BOX
		document.frm.old_date.value 		= arrData[15]; // ���� ��¥
		document.frm.hidden_color.value 		= arrData[16]; // ���� ��¥
		document.frm.box_per_palet.value 	= arrData[17]; // box_per_palet
		
		divRteClass.innerHTML 	= arrData[0]; // RTE ����
		divTransDate.innerHTML 	= arrData[1]; // ��������
		setViewMode(document.frm.src_loc); 	  // �����
		divItemId.innerHTML 	= arrData[4]; // ��ǰ�ڵ�
		divItemName.innerHTML 	= "&nbsp;" + arrData[5]; // ��ǰ��
	}
	
}

// 3. ��� ���� IFRAME(Child Page)���� ���ο� ROW�� ���� ���� insert �Ҷ�
// Row�� ���� �������ִ� function 
function setParentValueRow(indexNum, item_id, item_name) {
	
	//var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[indexNum] ) {
		document.frm.routeClass[indexNum].value 	= arrCheckData[0];  // RTE ����
		document.frm.trans_date[indexNum].value 	= arrCheckData[1];  // ��������
		document.frm.src_loc[indexNum].value 		= arrCheckData[2];  // �����
		document.frm.truck_seq[indexNum].value 		= arrCheckData[3];  // ��������
		document.frm.item_id[indexNum].value 		= item_id;		    // ��ǰ�ڵ�
		document.frm.item_name[indexNum].value 		= item_name;        // ��ǰ��
		document.frm.base_stk_plt[indexNum].value 	= "0.00";           // �⺻������ PLT
		document.frm.base_stk_box[indexNum].value 	= "0";  			// �⺻������ BOX
		document.frm.add_stk_plt[indexNum].value 	= "0.00"  			// �߰������� PLT
		document.frm.add_stk_box[indexNum].value 	= "0";  			// �߰������� BOX
		document.frm.prod_plt[indexNum].value 		= "0.00"; 			// ������� PLT
		document.frm.prod_box[indexNum].value 		= "0"; 				// ������� BOX
		document.frm.cum_plt[indexNum].value 		= "0.00"; 			// ������������ PLT
		document.frm.cum_box[indexNum].value 		= "0"; 				// ������������ BOX
		
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
		
		
		//left_tbody.rows[indexNum].style.backgroundColor = line_color; // üũ color
		//main_tbody.rows[indexNum].style.backgroundColor = line_color; // üũ color
		document.frm.old_date[indexNum].value 	= arrCheckData[15]; // ���� ��¥
		document.frm.hidden_color[indexNum].value 	= arrCheckData[16]; // ���� ��¥
		//document.frm.check_flag[indexNum].value  = arrCheckData[18]; // check_flag
		
		getBoxPerPalet( document.frm.src_loc[indexNum] ); // box_per_palet
		//alert(document.frm.box_per_palet[indexNum].value);
		//document.frm.box_per_palet[indexNum].value 	= arrData[17]; // box_per_palet
		
		divRteClass[indexNum].innerHTML 	= arrCheckData[0]; // RTE ����
		divTransDate[indexNum].innerHTML 	= arrCheckData[1]; // ��������
		//divSrcLoc[indexNum].innerHTML 	= arrCheckData[2]; // �����
		setViewMode(document.frm.src_loc[indexNum]); 	  // �����
		//divTruckSeq[indexNum].innerHTML 	= arrCheckData[3]; // ��������
		divItemId[indexNum].innerHTML 	= item_id; // ��ǰ�ڵ�
		divItemName[indexNum].innerHTML 	= "&nbsp;" + item_name; // ��ǰ��
	}
}


/**************************************************************************************************/



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
		// �������� --> �����
		
		//if( objName == "trans_date" ) {
		if( objName == "transDateTmp" ) {
			objTdG = left_tbody.rows[rowIdx].cells[5];
		}
		// ����� --> ��������
		else if( objName == "src_loc" ) {
			
			objTdG = left_tbody.rows[rowIdx].cells[6];
		}
		// �������� --> ��ǰ�ڵ�
		else if( objName == "truck_seq" ) {
			objTdG = left_tbody.rows[rowIdx].cells[7];
		}
		// ��ǰ�ڵ� --> �⺻������ PLT
		else if( objName == "item_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[2];
		}	
		// �⺻������ PLT --> �⺻������ BOX
		else if( objName == "base_stk_plt" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// �⺻������ BOX --> �߰������� PLT
		else if( objName == "base_stk_box" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// �߰������� PLT --> �߰������� BOX
		else if( objName == "add_stk_plt" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// �߰������� BOX --> ������� PLT
		else if( objName == "add_stk_box" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// ������� PLT --> ������� BOX
		else if( objName == "prod_plt" ) {
			objTdG = main_tbody.rows[rowIdx].cells[7];
		}
		// ������� BOX --> ������ RTE ����
		else if( objName == "prod_box" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+2 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[4];
			}
			// �������� ù��° input box �� �̵�
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[4];
			}
		}
		// �� ���� box ���� ���� ����
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

// ��ǰ �˻� POPUP
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
		alert("������� ���� �����ϼ���.");
		return;
	}
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans&code_input=" + code_input + "&rowIdx=" + rowIdx;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1" + "&tgt_loc=" + tgt_loc + "&src_loc=" + src_loc;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
}

// src_loc(�����), item_id(��ǰ �ڵ�) �κ��� box_per_palet ã��
// obj �� select box �Ǵ� input box
function getBoxPerPalet( obj ) {
	
	// ����� �Է�â���� �߻��� event ����, ��ǰ�ڵ� �Է�â���� �߻��� event ���� ����
	if( obj.name == "src_loc" ) {
		var rowIdx = obj.parentNode.parentNode.rowIndex;
	}
	else if ( obj.name == "item_id" ) {
		var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		return;
	}
	
	// �����, ��ǰ�ڵ� ������
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

// ����� ���� �Է°����κ��� ��ǰ���� ��ȸ
// ��ǰ �ڵ�, ��ǰ �� �� �� �ϳ��� ��ġ�ϴ� ������ �˻�
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
	
	// ����� �Ǵ� ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
	if( dc_id == "" || dc_id == null ) {
		alert("������� ���� �����ϼ���.");
		objItemId.value = "";
		objDivItemId.innerHTML = "";
		objItemName.value = "";
		objDivItemName.innerHTML = "";
		objBoxPerPalet.value = "";
		return;
	}
	
	// ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
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
			// ��ġ�ϴ� ��� ����
			if( arrList.length == 0 ) {
				objItemId.value = "";
				objDivItemId.innerHTML = "";
				objItemName.value = "";
				objDivItemName.innerHTML = "";
				objBoxPerPalet.value = "";
				openItemSearchPop(objItemId);
			}
			// ��ġ�ϴ� ��� 1��
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
	
	tdBLeft.width = (Number(maxWidthValue) - 350).toString() + "px";
	document.all.gridBLeft.width = (Number(maxWidthValue) - 350).toString() + "px";
	
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
	var sort_type = document.frm.sort_type.value;
	
	if( versions == "" || versions == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	if( document.frm.tgt_loc_sel.value == "" || document.frm.tgt_loc_sel.value == null ) {
		alert("�԰����� �����ϼ���.");
		return;
	}
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	document.frm.tgt_loc.value 		= document.frm.tgt_loc_sel.value;
	document.frm.plan_type.value 	= document.frm.plan_type_sel.value;
	
	
	
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
	
	var tgt_loc = document.frm.tgt_loc.value;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	// �԰����� �������� ���� ���
	if( tgt_loc == null || tgt_loc == "" ) {
		alert("�԰����� ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	// ����, ������ �������� ���� ���
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("������ ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	
	// ====================================================================== //
	// 1���� PLT ���� �������� 12�ڽ��� �ȵɶ��� CONFIRM���� �����Ұ� ���� Ȯ���ϴ� ����
	var tableLen = left_tbody.rows.length;
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var plt_qty = 0;
	var check_plt_flag = false;
	
	if(tableLen == 1){ // Total Row�� �����ϴ� ���..
		if(!confirm("�����Ͻðڽ��ϱ�?"))
			return;
	}
	// Row ���� 1�� ���.
    if(tableLen == 2){
		if(document.frm.trans_date[0]){
			if(document.frm.trans_date[0].value == "" 
				|| document.frm.src_loc[0].value == ""
				|| document.frm.truck_seq[0].value == ""
				|| document.frm.item_id.value[0] == ""){
				alert("��������, �����, ������ȣ, ��ǰ�ڵ带 ��Ȯ�� �Է��Ͽ� �ֽʽÿ�.");
				return;
			}
			plt_qty = document.frm.cum_plt[0].value;
		}
		else{
			if(document.frm.trans_date.value == "" 
				|| document.frm.src_loc.value == ""
				|| document.frm.truck_seq.value == ""
				|| document.frm.item_id.value == ""){
				alert("��������, �����, ������ȣ, ��ǰ�ڵ带 ��Ȯ�� �Է��Ͽ� �ֽʽÿ�.");
				return;
			}
			plt_qty = document.frm.cum_plt.value;
		}
		
		if(plt_qty < 12){ // 12PLT �̸��� ������ �����ϴ� ���..
			if(!confirm("12PLT �̸��� ������ �����մϴ�. �����Ͻðڽ��ϱ�?"))
				return;
		}else{ // ��� 12PLT �̻��� ���.
			if(!confirm("�����Ͻðڽ��ϱ�?"))
				return;
		}			
	}
	// Row ���� 2�̻��� ���.
	else if(tableLen > 2){		
		for( var i = 0 ; i < tableLen-1 ; i++ ) {
			if( document.frm.cum_box[i] ) {
				if(document.frm.trans_date[i].value == "" 
					|| document.frm.src_loc[i].value == ""
					|| document.frm.truck_seq[i].value == ""
					|| document.frm.item_id[i].value == ""){
					alert("��������, �����, ������ȣ, ��ǰ�ڵ带 ��Ȯ�� �Է��Ͽ� �ֽʽÿ�.");
					return;
				}
				if(i == 0){
					preTransDate = document.frm.trans_date[0].value;
					preSrcLoc = document.frm.src_loc[0].value;
					preTruckSeq = document.frm.truck_seq[0].value;
				}
				//alert(preTransDate+" "+preSrcLoc+" "+preTruckSeq);
				// �����, ���������� ���� ������ ���� ����
				if( document.frm.trans_date[i].value == preTransDate
					&& document.frm.src_loc[i].value == preSrcLoc 
					&& document.frm.truck_seq[i].value == preTruckSeq ) {
		
					cumPlt += strToNum(document.frm.base_stk_plt[i].value);
					cumPlt += strToNum(document.frm.add_stk_plt[i].value);
					cumPlt += strToNum(document.frm.prod_plt[i].value);
					
				}else{
					
					if(cumPlt < 12)	// ������ ����� ���, ���� ������ �� PLT�� 12PLT �̸��� ���..
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
		
		// 12PLT�� �ȵǴ� ���..
		if(check_plt_flag){
			if(!confirm("12PLT �̸��� ������ �����մϴ�. �����Ͻðڽ��ϱ�?"))
				return;
		}
		else{		
			// ��� 12PLT �̻��� ���.
			if(!confirm("�����Ͻðڽ��ϱ�?"))
				return;
		}
	}
	// ====================================================================== //
	
	//alert("Ȯ��"); //Ȯ���Ұ�
	//return;
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}


// �� ��  ��ư�� Ŭ���� ��� ȣ��
// ���õ� Row�߿� ���� ���� ������ PK�� ���õ�.
function doSumTrucks(){
	
	//document.body.oncontextmenu = "return false";
	
	var tableLen = left_tbody.rows.length;
	var firstRow = true;   
	var firstRowNum = 0;   //click�� Row �ؿ� ��������� Row�� �߰��ϱ� ���� index�� �����ϴ� ����
	var routeClass = null; //RTE ����
	var trans_date = null; //��������
	var src_loc	   = null; //�����
	var truck_seq  = null; //���� ����
	var count_checked = 0; //Check �Ǿ� �ִ� Row�� ���� ����.
	
	
	if(clickedLineIdx == null || clickedLineIdx == "") {
		if(clickedLineIdx != 0){
			alert("���� ���Ͻô� ��ȣ�� Ŭ���Ͽ� �ֽʽÿ�.");
		return;
		}
	}
	
	if(tableLen <= 2){ // �հ���̰ų�, Row�� �Ѱ��϶��� ���� ����
		return;
	}
	for(var i = 0; i < tableLen-1; i++){
		if( document.frm.check_flag[i] ) {
			if( document.frm.check_flag[i].checked) {
				
				// ���� ���õ� Row��  Check Box�� ���� Check �Ǿ� �ִ� ��� ����
				if(i == clickedLineIdx){
					document.frm.check_flag[i].checked = false;
					continue;
				}
					
				count_checked ++;	// ���� Check �Ǿ� �ִ� Row�� ���� ����.
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
				
				memCheckRow(i); 			// ���õ� Row�� �ӽ�����
				//alert("a"+i);
				delRowDo(i);				// ���� �� ����
				
				// �����Ϸ��� �� ���� ���� Row��  �ִ� ���..
				if(i < clickedLineIdx){
					addRowByIndex(firstRowNum-1);	// ������ ��Row�� �߰�
					setCheckValueRow(firstRowNum-1);	// �ӽ������ �� setting
					i--;				
				}
				// �����Ϸ��� �� ���� �ؿ� Row��  �ִ� ���..
				else{		
					addRowByIndex(firstRowNum);	// ������ ��Row�� �߰�		
					setCheckValueRow(firstRowNum);	// �ӽ������ �� setting
					firstRowNum++;	
				}// ������ ������.		
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
	
	// ������ �̷������ Row�� ù��° ���� �˾� ���� ���ؼ�
	// ������ �̷�� ���� ���õ� Row ���� �ߺ��Ǵ� ����Ÿ�� �ִ� ���,
	// ������ ���� �ֱ� ���ؼ�.
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
	
	// PK�� ���� ��� SUM
	// ���� ������ �κ�.
	for(var i = start_line; i <= end_line; i++){
		if( document.frm.base_stk_plt[i] ) { // ���� ������ ��츸 ó����.
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
		alert("���� �����Ϸ��� Row�� �����Ͽ� �ֽʽÿ�!");
	} 
	allCalCum();
	setLastPltColor();
	
}

/********************************************************************************************/
// divTotalPlt �κ� (���ο� divâ ó��)
/********************************************************************************************/

var checkZIndex = true;
var checkMouseDown = false;
var dragobject = null;
var tx;
var ty;

// ���õ� ȭ�� ��ü�߿� parentNode�� �������� ã�Ƴ��� ����.
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

// Mouse ���� Ű�� �������.
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

// Mouse ���� Ű�� �����.
function move_mouseup() {
	dragobject = null;
	checkMouseDown = false;
}

// Mouse ���� Ű�� �������¿��� ������ ���..
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

// Total Plt ����
function closeTotalPlt() {
	if( divTotalPlt.style.display == "BLOCK" 
		|| divTotalPlt.style.display == "block" ) {
		divTotalPlt.style.display = "none";
	} 
}

// Total Plt ����
function openTotalPlt() {
	
	var tableLen = left_tbody.rows.length;
	var pltTableLen = plt_tbody.rows.length;
	var v_trans_date = null;
	var v_src_loc = null;
	var v_src_name = null;
	var v_truck_seq = 0;
	var v_cum_plt = 0;
	var insertRow = 0;
	
	// Row�� �������� �ʴ� ���.
	if(tableLen == 1){
		alert("���� PLT�� ����� ����Ÿ�� �������� �ʽ��ϴ�.");
		return;
	}
	// Row���� 1���� ���..
	else if(tableLen == 2){
		
		// ������ Row�� ������.(���ο� �������� �־��ֱ� ���ؼ�.)
		for(var j = 0; j< pltTableLen; j++){
			plt_tbody.deleteRow(j);
			j--;
			pltTableLen--;
		}

		if(document.frm.trans_date[0]){
			// �ʼ� �Է°��� �Է����� ���� ���, ���� ���� ���� ���� ����.
			if(document.frm.trans_date[0].value == "" || document.frm.trans_date[0].value == null
			|| document.frm.src_loc[0].value == "" || document.frm.src_loc[0].value == null
			|| document.frm.truck_seq[0].value == "" || document.frm.truck_seq[0].value == null){
				alert("��������, �����, ������ȣ�� ��Ȯ�� �Է��Ͻ� �� �ٽ� Ŭ���� �ֽʽÿ�.");
				return;
			}
			v_trans_date = document.frm.trans_date[0].value;
			v_src_loc    = document.frm.src_loc[0].value;
			v_src_name   = document.frm.src_loc[0].options[document.frm.src_loc[0].selectedIndex].text;
			v_truck_seq  = document.frm.truck_seq[0].value;
			v_cum_plt    = document.frm.cum_plt[0].value;
		}
		else{
			// �ʼ� �Է°��� �Է����� ���� ���, ���� ���� ���� ���� ����.
			if(document.frm.trans_date.value == "" || document.frm.trans_date.value == null
			|| document.frm.src_loc.value == "" || document.frm.src_loc.value == null
			|| document.frm.truck_seq.value == "" || document.frm.truck_seq.value == null){
				alert("��������, �����, ������ȣ�� ��Ȯ�� �Է��Ͻ� �� �ٽ� Ŭ���� �ֽʽÿ�.");
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
				
		var oCell0 = oRowPlt.insertCell(); // ��������
		var oCell1 = oRowPlt.insertCell(); // �����
		var oCell2 = oRowPlt.insertCell(); // ������ȣ
		var oCell3 = oRowPlt.insertCell(); // PLT
		
		oCell0.align = "center"; oCell0.width = "29%" ; // ��������
		oCell1.align = "center"; oCell1.width = "25%" ; // �����
		oCell2.align = "center"; oCell2.width = "25%" ; // ������ȣ
		oCell3.align = "right";  oCell3.width = "21%" ; // PLT 
		oCell3.className = "right"; // ������� BOX
		
		// ��ȣ
		//oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
		//oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
		
		// ��������
		oCell0.innerHTML = "<input type=\"text\" name=\"v_trans_date\" value="+v_trans_date+" " 
						+ "style=\"border : 0px; text-align:center; width:100%; \" readonly> ";
		// �����
		oCell1.innerHTML = "<a>"+v_src_name+"</a>" 
						+ "<input type=\"hidden\" name=\"v_src_loc\" value="+v_src_loc+"> ";
		// ������ȣ
		oCell2.innerHTML = "<input type=\"text\" name=\"v_truck_seq\" value="+v_truck_seq+" " 
						+ "style=\"border : 0px; text-align:center; width:100% \" readonly> ";
		// PLT
		oCell3.innerHTML = "<input type=\"text\" name=\"v_cum_plt\" value="+v_cum_plt+" " 
						+ "style=\"border : 0px; text-align:right; width:100% \" readonly> ";
		document.recalc();
	}
	else{	
		// ���� ���� Row ����
		for(var j = 0; j< pltTableLen; j++){
			plt_tbody.deleteRow(j);
			j--;
			pltTableLen--;
		}
		// ��ü Row�� �ϳ��� �о� �����鼭 ���� �ʴ� ���� div�� �߰���.
		for(var i = 0; i< tableLen-1; i++){
			if(i == tableLen-2){
				// �ʼ� �Է°��� �Է����� ���� ���, ���� ���� ���� ���� ����.
				if(document.frm.trans_date[i].value == "" || document.frm.trans_date[i].value == null
				|| document.frm.src_loc[i].value == "" || document.frm.src_loc[i].value == null
				|| document.frm.truck_seq[i].value == "" || document.frm.truck_seq[i].value == null){
					alert("��������, �����, ������ȣ�� ��Ȯ�� �Է��Ͻ� �� �ٽ� Ŭ���� �ֽʽÿ�.");
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
						
				var oCell0 = oRowPlt.insertCell(); // ��������
				var oCell1 = oRowPlt.insertCell(); // �����
				var oCell2 = oRowPlt.insertCell(); // ������ȣ
				var oCell3 = oRowPlt.insertCell(); // PLT
				
				oCell0.align = "center"; oCell0.width = "29%" ; // ��������
				oCell1.align = "center"; oCell1.width = "25%" ; // �����
				oCell2.align = "center"; oCell2.width = "25%" ; // ������ȣ
				oCell3.align = "right";  oCell3.width = "21%" ; // PLT 
				oCell3.className = "right"; // ������� BOX
				
				// ��ȣ
				//oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
				//oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
				
				// ��������
				oCell0.innerHTML = "<input type=\"text\" name=\"v_trans_date\" value="+v_trans_date+" " 
								+ "style=\"border : 0px; text-align:center; width:100%; \" readonly> ";
				// �����
				oCell1.innerHTML = "<a>"+v_src_name+"</a>" 
								+ "<input type=\"hidden\" name=\"v_src_loc\" value="+v_src_loc+"> ";
				// ������ȣ
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
						
						// �ʼ� �Է°��� �Է����� ���� ���, ���� ���� ���� ���� ����.
						if(document.frm.trans_date[i].value == "" || document.frm.trans_date[i].value == null
						|| document.frm.src_loc[i].value == "" || document.frm.src_loc[i].value == null
						|| document.frm.truck_seq[i].value == "" || document.frm.truck_seq[i].value == null){
							alert("��������, �����, ������ȣ�� ��Ȯ�� �Է��Ͻ� �� �ٽ� Ŭ���� �ֽʽÿ�.");
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
								
						var oCell0 = oRowPlt.insertCell(); // ��������
						var oCell1 = oRowPlt.insertCell(); // �����
						var oCell2 = oRowPlt.insertCell(); // ������ȣ
						var oCell3 = oRowPlt.insertCell(); // PLT
						
						oCell0.align = "center"; oCell0.width = "29%" ; // ��������
						oCell1.align = "center"; oCell1.width = "25%" ; // �����
						oCell2.align = "center"; oCell2.width = "25%" ; // ������ȣ
						oCell3.align = "right";  oCell3.width = "21%" ; // PLT 
						oCell3.className = "right"; // ������� BOX
						
						if(strToNum(v_cum_plt) >= 14)
							oCell3.style.color = "red";
						// ��ȣ
						//oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
						//oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
						
						// ��������
						oCell0.innerHTML = "<input type=\"text\" name=\"v_trans_date\" value="+v_trans_date+" " 
										+ "style=\"border : 0px; text-align:center; width:100%; \" readonly> ";
						// �����
						oCell1.innerHTML = "<a>"+v_src_name+"</a>" 
										+ "<input type=\"hidden\" name=\"v_src_loc\" value="+v_src_loc+"> ";
						// ������ȣ
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
	
	if(pltTransLen > 1){ // Row ���� 1�� �̻��� ��쿡�� �ߺ��Ǵ� ���� �ִ��� üũ
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
	
	// div�� display�� block���� ����
	if( divTotalPlt.style.display == "NONE" 
		|| divTotalPlt.style.display == "none" ) {
		divTotalPlt.style.display = "block";
	} 
}

function allCheckFlag(){
	var tableLen = left_tbody.rows.length;
	
	if(document.frm.all_check_flag.checked){	// check �Ǿ� �ִ� ���.
		for(var i = 0; i < tableLen-1; i++){
			if( document.frm.check_flag[i] ) 
				document.frm.check_flag[i].checked = true;	
			else
				document.frm.check_flag.checked = true;
		}
	}
	else{	// check�� ������ ���.
		for(var i = 0; i < tableLen-1; i++){
			if( document.frm.check_flag[i] ) 
				document.frm.check_flag[i].checked = false;
			else
				document.frm.check_flag.checked = false;
		}
	}
	
}


// �ش� �÷��׿����� �������� ���� ����
function doCheckFlag(obj){
	
	
	if(obj.name == "sort_type_chk" ){ 
		if(obj.checked){
				document.frm.sort_type.value = "Y";// �Ͱ��� �������� ��ȸ
		}else{
				document.frm.sort_type.value = "N";//���� �������� ��ȸ
		}
	}
}
