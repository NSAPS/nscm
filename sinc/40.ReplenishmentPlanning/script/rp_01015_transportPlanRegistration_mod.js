
// ����ȭ������ �̵�
function moveBack() {
	
	var urlStr = "service.do?_moon_service=rp_01015_transportPlanRegistration_list_dev";
	location.href = urlStr;
}



// Ŭ���� ���� �ε���
var clickedLineIdx = null;

// ȭ�� ��ü row�� ������ ������.
var lineColor = new Array();
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var popImgIdx = null;

// Ŭ���� �������� �ε���
var clickedDateIdx = null;

// input box �� Edit Mode �� ��ȯ
// onClick
function setEditMode( objTd ) {
	
	var rowIdx		= objTd.parentNode.rowIndex;
	var transDate	= null;
	var brand_no;
	
	if(document.frm.item_id[rowIdx]){
		transDate	= document.frm.item_id[rowIdx];
		brand_no	= document.frm.brand_no[rowIdx].value;
	}else{
		transDate	= document.frm.item_id.value;
		brand_no	= document.frm.brand_no.value;
	}

	if( brand_no == "" || brand_no == null ) {  

	}else{
		alert("Ȯ���� ��ǥ�� ������ �Ұ��� �մϴ�.");
		return;		
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	// ��ǰ�ڵ� �˻� ���ΰ��
	if( objTd.childNodes(0).id == "divItemId" ) {
		objTd.childNodes(1).childNodes(0).select();
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
		objTd.childNodes(1).value = strVal;
		
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
	
	// �⺻������BOX, �߰�������BOX, �������BOX �Է�â�� ���, ���� üũ & õ���� ������ ǥ��
	if( objBox.name == "base_stk_box" || objBox.name == "base_stk_plt" ) {
		if( strVal != "" && strVal != null ) {
			// ���� üũ
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
				setEditMode( objTd );
				return;
			}
			// ������ �´� ��� õ���� ������ ǥ��
			else {
				strVal = objBox.value;
				objBox.value = numberFormat( strVal );
				strVal = objBox.value;
			}
		}
		
		// BOX �� ��� ������������ ���
		if( objBox.name == "base_stk_box" ) {
			// PLT ���� ���
			calPltQty(objBox);
		}
		
		// PLT �� ��� ������������ ���
		if( objBox.name == "base_stk_plt"  ) {
			// Box ���� ���
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

// PLT ���� ���
function calPltQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "base_stk_box" ) { // �⺻������
			var pltBox = document.frm.base_stk_plt[rowIdx];
			var pltDiv = divBasePlt[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "base_stk_box" ) { // �⺻������
			var pltBox = document.frm.base_stk_plt;
			var pltDiv = divBasePlt;
		}
		else {
			return;
		}
	}
	
	// PALET �� BOX ������ ���� ��� 1 �� ���
	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
		var boxPerPalet = 1;
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
	
	pltBox.value = delComma(pltStr);
	pltDiv.innerHTML = fixedPoint(pltStr, 2) + "&nbsp;";
	
}

// Box ���� ���
function calBoxQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_per_palet[rowIdx] ) {
		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
		if( objBox.name == "base_stk_plt" ) { // �⺻������
			var boxPlt = document.frm.base_stk_box[rowIdx];
			var boxDiv = divBaseBox[rowIdx];
		}
		else {
			return;
		}
	}
	else {
		var boxPerPaletStr = document.frm.box_per_palet.value;
		if( objBox.name == "base_stk_plt" ) { // �⺻������
			var boxPlt = document.frm.base_stk_box;
			var boxDiv = divBaseBox;
		}
		else {
			return;
		}
	}
	
	// PALET �� BOX ������ ���� ��� 1 �� ���
	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
		var boxPerPalet = 1;
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
		var boxQty = Math.round(pltQty * boxPerPalet);
		var boxStr = numberFormat(boxQty.toString());
	}
	
	boxPlt.value = delComma(boxStr);
	boxDiv.innerHTML = boxStr + "&nbsp;";
	
}

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
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


// row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRow( objBtn ) {

		var tgt_loc	= document.frm.tgt_loc.value;
		var src_loc	= document.frm.src_loc.value;
		var plan_type	= document.frm.plan_type.value;

	
	// �԰����� �������� ���� ���
	if( tgt_loc == null || tgt_loc == "" ) {
		alert("�԰����� �����Ͻʽÿ�.");
		return;
	}
	// ����, ������ �������� ���� ��� 
	if( src_loc == null || src_loc == "" ) {
		alert("������� �����Ͻʽÿ�.");
		return;
	}

	// ����, ������ �������� ���� ���
	if( plan_type == null || plan_type == "" ) {
		alert("���������� �����Ͻʽÿ�.");
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
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // �߰�����
	var oCell2  = oRowLeft.insertCell(); // ��ǰ�ڵ�
	var oCell3  = oRowLeft.insertCell(); // ��ǰ��
	
	var oCell4 = oRowMain.insertCell(); // �⺻������ PLT
	var oCell5 = oRowMain.insertCell(); // �⺻������ BOX 
	var oCell6 = oRowMain.insertCell(); // �⺻������ EA 
	var oCell7 = oRowMain.insertCell(); // ��ǥ��ȣ

	
	oCell2.onclick = function() { setEditMode(this); }; // ��ǰ�ڵ�
	
	oCell4.onclick  = function() { setEditMode(this); }; // �⺻������ PLT
	oCell5.onclick  = function() { setEditMode(this); }; // �⺻������ BOX
	oCell6.onclick  = function() { setEditMode(this); }; // �⺻������ EA

	
	oCell0.align = "center"; 	oCell0.width = "30px" ; // ��ȣ
	oCell1.align = "center"; 	oCell1.width = "40px" ; // �߰�����
	oCell2.align = "center"; 	oCell2.width = "110px"; // ��ǰ�ڵ�
	oCell3.align = "left";   	oCell3.width = "150px"; // ��ǰ��
	

	oCell4.align = "right";  	oCell4.width = "80px" ; // �⺻������ PLT
	oCell5.align = "right";  	oCell5.width = "80px" ; // �⺻������ BOX
	oCell6.align = "right";  	oCell6.width = "80px" ; // �⺻������ EA
	oCell7.align = "right";  	oCell7.width = "110px" ; // ��ǥ��ȣ

	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\"><input type=\"hidden\" name=\"mod_flag\">";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	oCell0.onclick = function() { clickLine(this); };
	// ����
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// ��ǰ��
	//oCell4.innerHTML = "<a id=\"divItemName\"></a><input type=\"hidden\" name=\"item_name\">";
						
	// ��������
	//oCell3.innerHTML = "<a id=\"divTransDate\"></a><input type=\"text\" name=\"trans_date\" class=\"normal\" size=\"10\" "
	//					+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" onBlur=\"chkDate(this); \" "
	//					+ "style=\"width:100%; display:none; text-align:center; \" onDblClick=\"this.select(); \">";
	//oCell2.innerHTML = "<a id=\"divTransDate\"></a><input type=\"hidden\" name=\"trans_date\" value=\"\">";
	//��������
	//oCell3.innerHTML = "<a id=\"divTruckSeq\"></a><input type=\"text\" name=\"truck_seq\" value=\"\">";
	// ��ǰ�ڵ�
	oCell2.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemInput\" style=\"display:none; \"><input type=\"text\" "
						+ "name=\"item_id\" class=\"normal\" size=\"100\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "onChange=\"getBoxPerPalet(this); getItemInfo(this); \" "
						+ "style=\"width:79px; padding-left:5px; \"><img name=\"imgItemId\" tabindex=\"-1\" "
						+ "src=\"sinc/template/basic/skin/nongshim/images/common/icon_search.gif\" align=\"absmiddle\" "
						+ "border=\"0\" onClick=\"openItemSearchPop(this); \" style=\"cursor:pointer; \" "
						+ "onMouseOver=\"overImg(this); \" onMouseOut=\"outImg(this); \"></a>";
	// ��ǰ��
	oCell3.innerHTML = "<a id=\"divItemName\"></a><input type=\"hidden\" name=\"item_name\">";
	// �⺻������ PLT
	oCell4.innerHTML = "<a id=\"divBasePlt\"></a><input type=\"text\" name=\"base_stk_plt\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:right; \">";
	// �⺻������ BOX
	oCell5.innerHTML = "<a id=\"divBaseBox\"></a><input type=\"text\" name=\"base_stk_box\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:right; \">";
	// �⺻������ EA
	oCell6.innerHTML = "<a id=\"divBaseEa\"></a><input type=\"text\" name=\"base_stk_ea\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:right; \">";
	// ��ǥ��ȣ
	oCell7.innerHTML = "<a id=\"divBrandNo\"></a><input type=\"hidden\" name=\"brand_no\">";
	
	document.recalc();
	setRowNo();
	
}

// ��ȣ setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	areaTot.innerHTML = tableLen;
	
	var clickedFlag = false; // üũ�� ������ �ִ��� ����
	
	for( var i = 0 ; i < tableLen ; ++i ) {
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
	}
	
	// üũ�Ǿ� �ִ� ������ ������ clickedLineIdx = null
	if( !clickedFlag ) {
		clickedLineIdx = null;
	}
	
}

// row ���� 
// parameter : button object
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	
	var brand_no;
	
	if(document.frm.trans_date[delRowIdx]){
		brand_no	= document.frm.brand_no[delRowIdx].value;
	}else{
		brand_no	= document.frm.brand_no.value;
	}

	if( brand_no == "" || brand_no == null ) {  

	}else{
		alert("Ȯ���� ��ǥ�� ���� �Ҽ� �����ϴ�.");
		return;		
	}
	
	if( tableLen > 1 )
	{
		delRowDo( delRowIdx );
		rowFormed();
	}
	setRowNo();
	
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
	delRowDo( tableLen - 1 );
	
	tableLen = left_tbody.rows.length;
	//if( document.frm.btnAddRow[0] ) {
	if( tableLen > 1 ) {
		var objBtn = document.frm.btnAddRow[tableLen-1];
	}
	else if( tableLen == 1 ) {
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


var arrData = new Array(16); 
// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[tableLen-1] ) {
		arrData[0] 	= document.frm.trans_date[tableLen-1].value;   // ��������
		arrData[1] 	= document.frm.item_id[tableLen-1].value;      // ��ǰ�ڵ�
		arrData[2] 	= document.frm.item_name[tableLen-1].value;    // ��ǰ��
		arrData[3] 	= document.frm.base_stk_plt[tableLen-1].value; // �⺻������ PLT
		arrData[4] 	= document.frm.base_stk_box[tableLen-1].value; // �⺻������ BOX
		arrData[5] 	= document.frm.base_stk_ea[tableLen-1].value; // �⺻������ EA
		arrData[6] 	= document.frm.brand_no[tableLen-1].value; // ��ǥ��ȣ
	}
	else {
		arrData[0] 	= document.frm.trans_date.value;   // ��������
		arrData[1] 	= document.frm.item_id.value;      // ��ǰ�ڵ�
		arrData[2] 	= document.frm.item_name.value;    // ��ǰ��
		arrData[3] 	= document.frm.base_stk_plt.value; // �⺻������ PLT
		arrData[4] 	= document.frm.base_stk_box.value; // �⺻������ BOX
		arrData[5] 	= document.frm.base_stk_ea.value; // �⺻������EA
		arrData[6] 	= document.frm.brand_no.value; // ��ǥ��ȣ
	}
	
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.routeClass[tableLen-1] ) {
		document.frm.trans_date[tableLen-1].value 	= arrData[0];  // ��������
		document.frm.item_id[tableLen-1].value 		= arrData[1];  // ��ǰ�ڵ�
		document.frm.item_name[tableLen-1].value 	= arrData[2];  // ��ǰ��
		document.frm.base_stk_plt[tableLen-1].value = arrData[3];  // �⺻������ PLT
		document.frm.base_stk_box[tableLen-1].value = arrData[4];  // �⺻������ BOX
		document.frm.base_stk_ea[tableLen-1].value	= arrData[5];  // �⺻������ EA
		document.frm.brand_no[tableLen-1].value		= arrData[6]; // ��ǥ��ȣ
		
		divTransDate[tableLen-1].innerHTML 	= arrData[0]; // ��������
		divItemId[tableLen-1].innerHTML 	= arrData[1]; // ��ǰ�ڵ�
		divItemName[tableLen-1].innerHTML 	= "&nbsp;" + arrData[2]; // ��ǰ��
		divBasePlt[tableLen-1].innerHTML 	= fixedPoint(arrData[3], 2) + "&nbsp;";  // �⺻������ PLT
		divBaseBox[tableLen-1].innerHTML 	= arrData[4] + "&nbsp;";  				 // �⺻������ BOX
		divBaseEa[tableLen-1].innerHTML 	= arrData[5] + "&nbsp;";  				 // �⺻������ EA
		divBrandNo[tableLen-1].innerHTML 	= arrData[6] + "&nbsp;";  				 // ��ǥ��ȣ

	}
	else {
		document.frm.trans_date.value 	= arrData[0];  // ��������
		document.frm.item_id.value 		= arrData[1];  // ��ǰ�ڵ�
		document.frm.item_name.value 	= arrData[2];  // ��ǰ��
		document.frm.base_stk_plt.value = arrData[3];  // �⺻������ PLT
		document.frm.base_stk_box.value = arrData[4];  // �⺻������ BOX
		document.frm.base_stk_ea.value = arrData[5];  // �⺻������ EA
		document.frm.brand_no.value 	= arrData[6];  // ��ǥ��ȣ
		
		divTransDate.innerHTML 	= arrData[0]; // ��������
		divItemId.innerHTML 	= arrData[1]; // ��ǰ�ڵ�
		divItemName.innerHTML 	= "&nbsp;" + arrData[2]; // ��ǰ��
		divBasePlt.innerHTML 	= fixedPoint(arrData[3], 2) + "&nbsp;";  // �⺻������ PLT
		divBaseBox.innerHTML 	= arrData[4] + "&nbsp;";  				 // �⺻������ BOX
		divBaseEa.innerHTML 	= arrData[5] + "&nbsp;";  				 // �⺻������ EA
		divBrandNo.innerHTML 	= arrData[6] + "&nbsp;";  				 // ��ǥ��ȣ
	}
	
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
		
		//if( objName == "trans_date" ) {
		if( objName == "transDateTmp" ) {
			objTdG = left_tbody.rows[rowIdx].cells[4];
		}
		// ����� --> ��������
		else if( objName == "src_loc" ) {
			objTdG = left_tbody.rows[rowIdx].cells[5];
		}
		// �������� --> ��ǰ�ڵ�
		else if( objName == "truck_seq" ) {
			objTdG = left_tbody.rows[rowIdx].cells[6];
		}
		// ��ǰ�ڵ� --> �⺻������ BOX
		else if( objName == "item_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// �⺻������ BOX --> �߰������� BOX
		else if( objName == "base_stk_box" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// �߰������� BOX --> ������� BOX
		else if( objName == "add_stk_box" ) {
			objTdG = main_tbody.rows[rowIdx].cells[7];
		}
		// ������� BOX --> ������ RTE ����
		else if( objName == "prod_box" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[3];
			}
			// �������� ù��° input box �� �̵�
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[3];
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

// �����ȹ ��ȸ POPUP
function openSchPlanPop( obj ) {
	
	if( obj.tagName.toUpperCase() == "INPUT" ) {
		var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	}
	else if( obj.tagName.toUpperCase() == "TD" ) {
		var rowIdx = obj.parentNode.rowIndex;
	}
	else {
		return;
	}
	
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	if( document.frm.item_id[0] ) {
		var trans_date = document.frm.trans_date[rowIdx].value;
		var src_loc = document.frm.src_loc[rowIdx].value;
		var item_id = document.frm.item_id[rowIdx].value;
		//clickLine(tdRowNo[rowIdx]); ������ ���� ǥ���ϴ� �Լ� ���� �� ����
	}
	else {
		var trans_date = document.frm.trans_date.value;
		var src_loc = document.frm.src_loc.value;
		var item_id = document.frm.item_id.value;
		//clickLine(tdRowNo); ������ ���� ǥ���ϴ� �Լ� ���� �� ����
	}
	
	var service_url = "service.do?_moon_service=rp_01010_dailyTransportPlanSchPlan_pop&_moon_perpage=200&_moon_pagenumber=1";
	service_url += "&version=" + version + "&seq=" + seq + "&tgt_loc=" + tgt_loc + "&plan_type=" + plan_type;
	service_url += "&trans_date=" + trans_date + "&src_loc=" + src_loc + "&item_id=" + item_id;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=400, top=0, left=0";
	var newWin = window.open(service_url, "SCH_POP", pop_win_style);
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
				objBoxPerPalet.value = 1;
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
	
	tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}

// ���� ��ư Ŭ��
function GoSave(service) {
	
	var tgt_loc 	= document.frm.tgt_loc.value;
	var version 	= document.frm.version.value;
	var seq 		= document.frm.seq.value;
	var plan_type 	= document.frm.plan_type.value;
	var _user_id 	= document.frm._user_id.value;

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

	// ����, ������ �������� ���� ���
	if( plan_type == null || plan_type == "" ) {
		alert("�������� �� �����Ͻʽÿ�.");
		return;
	}


	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();				

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
	if( document.frm.src_loc.value == "" || document.frm.src_loc.value == null ) {
		alert("������� �����ϼ���.");
		return;
	}
	if( document.frm.tgt_loc.value == "" || document.frm.tgt_loc.value == null ) {
		alert("�԰����� �����ϼ���.");
		return;
	}
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	document.frm.tgt_loc.value 		= document.frm.tgt_loc.value;
	document.frm.src_loc.value 		= document.frm.src_loc.value;
	document.frm.plan_type.value 	= document.frm.plan_type.value;
	
	
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1";
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

//'$!{version}', '$!{seq}', '$!{trans_start}', '$!{trans_end}', '$!{src_loc}', '$!{tgt_loc}', '$!{truck_seq}')

// ��ǥ �߻�
function makeBrand(service) {
	var version 	= document.frm.version.value;
	var seq 		= document.frm.seq.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end 	= document.frm.trans_end.value;
	var src_loc 	= document.frm.src_loc.value;
	var tgt_loc 	= document.frm.tgt_loc.value;

	
	// �԰����� �������� ���� ���
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("������ ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	// ����, ������ �������� ���� ���
	if( trans_start == null || trans_start == "" || trans_end == null || trans_end == "" ) {
		alert("�������ڸ� ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	
//	if(checkConfirm())
//		return;
	
	// WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}
// num ����ŭ �� �߰�
function addRows( num ) {
	
	for( var i=0; i<num ; ++i ) {
		addRow();
	}
}
