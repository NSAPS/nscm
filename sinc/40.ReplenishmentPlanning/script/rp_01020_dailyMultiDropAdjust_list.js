////////////////////////////////////////////////////////////
// ���α׷�ID : rp_01020_dailyMultiDropAdjust_list.js
// ���α׷��� : Route ���� ��ȸ �� ���� (���� ��� ���� ����)
// ������  : ���ؼ�
// �������� : 2008-08-19 ȭ����
//
//���� job file : job_sinc_40_replenishmentPlanning.xml
//
//���� query file : query_sinc_40_replenishmentPlanning.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-19  ���ؼ�     rp_01020_dailyMultiDropAdjust_list.js ����
//
//
////////////////////////////////////////////////////////////

// Ŭ���� ���� �ε���
var clickedLineIdx = null;
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var popImgIdx = null;

// Ŭ���� �������� �ε���
var clickedDateIdx = null;

// input box �� Edit Mode �� ��ȯ
// onClick
function setEditMode( objTd ) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	// ��ǰ�ڵ� �˻� ���ΰ��
	if( objTd.childNodes(0).id == "divItemId" ) {
		objTd.childNodes(1).childNodes(0).focus();
	}else {
		//objTd.childNodes(1).select();
		objTd.childNodes(1).focus();
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
	if( objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box" ) {
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
		// PLT ���� ���
		calPltQty(objBox);
		// �⺻������BOX �� ��� ������������ ���
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
		else if( objBox.name == "add_stk_box" ) { // �߰�������
			var pltBox = document.frm.add_stk_plt[rowIdx];
			var pltDiv = divAddPlt[rowIdx];
		}
		else if( objBox.name == "prod_box" ) { // �������
			var pltBox = document.frm.prod_plt[rowIdx];
			var pltDiv = divProdPlt[rowIdx];
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
		else if( objBox.name == "add_stk_box" ) { // �߰�������
			var pltBox = document.frm.add_stk_plt;
			var pltDiv = divAddPlt;
		}
		else if( objBox.name == "prod_box" ) { // �������
			var pltBox = document.frm.prod_plt;
			var pltDiv = divProdPlt;
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
		var pltQty = boxQty / boxPerPalet;
		var pltStr = numberFormat(pltQty.toString());
	}
	
	pltBox.value = delComma(pltStr);
	pltDiv.innerHTML = fixedPoint(pltStr, 2) + "&nbsp;";
	
}

// �����, ��������, RTE������ ���濡 ���� Row�� ������ �����ϴ� function
function setBgColors(){
	var tableLen = left_tbody.rows.length;
	var preTgtLoc = null;
	var preTruckSeq = null;
	var preRteSeq = null;
	var check_color = 0;
	
	for( var i = 0 ; i < tableLen ; i++ ) {
		if( document.frm.cum_box[i] ) {
			
			// �����, ���������� ���� ���
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
			// �����, ���������� �ٸ� ���.
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

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#d0b8f1" ) {
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
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#d0b8f1" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	}
	
}


// ������������ ���
function calCum() {
	
	var tableLen = left_tbody.rows.length;
	var preTgtLoc = null;
	var preTruckSeq = null;
	var preRteSeq = null;
	var cumBox = 0;
	var cumPlt = 0;

	for( var i = 0 ; i < tableLen ; i++ ) {
		if( document.frm.cum_box[i] ) {
			
			// �����, ���������� ���� ������ ���� ����
			if( document.frm.tgt_loc[i].value == preTgtLoc && document.frm.truck_seq[i].value == preTruckSeq 
			    && document.frm.rte_seq[i].value == preRteSeq) {
				
				cumBox += strToNum(document.frm.base_stk_box[i].value);
				cumBox += strToNum(document.frm.add_stk_box[i].value);
				cumBox += strToNum(document.frm.prod_box[i].value);
				cumPlt += strToNum(document.frm.base_stk_plt[i].value);
				cumPlt += strToNum(document.frm.add_stk_plt[i].value);
				cumPlt += strToNum(document.frm.prod_plt[i].value);
			}
			// �����, ���������� �ٸ��� ���� �ʱ�ȭ
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
			// PALET �� BOX ������ ���� ��� 1 �� ���
			if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
				var boxPerPalet = 1;
			}
			else {
				var boxPerPalet = Number(delComma(boxPerPaletStr));
			}
			
			// BOX �Է�â�� ��� �ִ� ���
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


// row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRow( objBtn ) {
	
	var tmp_routeid = document.frm.route_id.value;
	
	if(tmp_routeid == "" || tmp_routeid == null){
		alert("���� ROUTE ID�� �����Ͻ� �� ��ȸ�� Ŭ���� �ֽʽÿ�!");
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
	var oCell1 = oRowLeft.insertCell(); // ����
	var oCell2 = oRowLeft.insertCell(); // �԰���
	var oCell3 = oRowLeft.insertCell(); // ��������
	var oCell4 = oRowLeft.insertCell(); // RTE����	
	var oCell5  = oRowLeft.insertCell(); // ��ǰ�ڵ�
	var oCell6  = oRowLeft.insertCell(); // ��ǰ��
	
	var oCell7  = oRowMain.insertCell(); // ������������ PLT
	var oCell8  = oRowMain.insertCell(); // ������������ BOX
	var oCell9  = oRowMain.insertCell(); // �⺻������ PLT
	var oCell10 = oRowMain.insertCell(); // �⺻������ BOX
	var oCell11 = oRowMain.insertCell(); // �߰������� PLT
	var oCell12 = oRowMain.insertCell(); // �߰������� BOX
	var oCell13 = oRowMain.insertCell(); // ������� PLT
	var oCell14 = oRowMain.insertCell(); // ������� BOX
	
	
	oCell2.onclick = function() { setEditMode(this); }; // �԰���
	oCell3.onclick = function() { setEditMode(this); }; // ��������
	oCell4.onclick = function() { setEditMode(this); }; // RTE����	
	oCell5.onclick  = function() { setEditMode(this); }; // ��ǰ�ڵ�
	
	oCell10.onclick  = function() { setEditMode(this); }; // �⺻������ BOX
	oCell12.onclick = function() { setEditMode(this); }; // �߰������� BOX
	oCell14.onclick = function() { setEditMode(this); }; // ������� BOX
	
	oCell0.align = "center"; oCell0.width = "30px" ;  // ��ȣ
	oCell1.align = "center"; oCell1.width = "40px" ;  // ����
	oCell2.align = "left";   oCell2.width = "140px" ; // �԰���
	oCell3.align = "center"; oCell3.width = "40px" ;  // ��������
	oCell4.align = "center"; oCell4.width = "40px";   // RTE����	
	oCell5.align  = "center"; oCell5.width  = "110px";  // ��ǰ�ڵ�
	oCell6.align  = "left";   oCell6.width  = "170px"; // ��ǰ��
	
	oCell7.align  = "right";  oCell7.width  = "80px" ; // ������������ PLT
	oCell8.align  = "right";  oCell8.width  = "80px" ; // ������������ BOX
	oCell9.align  = "right";  oCell9.width  = "80px" ; // �⺻������ PLT
	oCell10.align = "right";  oCell10.width = "80px" ; // �⺻������ BOX
	oCell11.align = "right";  oCell11.width = "80px" ; // �߰������� PLT
	oCell12.align = "right";  oCell12.width = "80px" ; // �߰������� BOX
	oCell13.align = "right";  oCell13.width = "80px" ; // ������� PLT
	oCell14.align = "right";  oCell14.width = "80px" ; oCell14.className = "right";// ������� BOX
	
	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// ����
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// �԰���
	oCell2.innerHTML = "<a id=\"divTgtLoc\"></a>" + selStrTgtLoc;
	// ��������
	oCell3.innerHTML = "<a id=\"divTruckSeq\"></a><input " 
						+ "type=\"text\" name=\"truck_seq\" class=\"normal\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); calCum();\" size=\"2\" maxlength=\"2\" "
						+ "style=\"width:100%; display:none; text-align:center; \" onDblClick=\"this.select(); \"> ";
	// RTE����
	oCell4.innerHTML = "<a id=\"divRteSeq\"></a><input " 
						+ "type=\"text\" name=\"rte_seq\" class=\"normal\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); calCum();\" size=\"3\" maxlength=\"3\" "
						+ "style=\"width:100%; display:none; text-align:center; \" onDblClick=\"this.select(); \">";
	
	// ��ǰ�ڵ�
	oCell5.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemInput\" style=\"display:none; \"><input type=\"text\" "
						+ "name=\"item_id\" class=\"normal\" size=\"100\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); calCum();\" "
						+ "onChange=\"getBoxPerPalet(this); getItemInfo(this); \" "
						+ "style=\"width:79px; padding-left:5px; \"><img name=\"imgItemId\" tabindex=\"-1\" "
						+ "src=\"sinc/template/basic/skin/nongshim/images/common/icon_search.gif\" align=\"absmiddle\" "
						+ "border=\"0\" onClick=\"openItemSearchPop(this); \" style=\"cursor:pointer; \" "
						+ "onMouseOver=\"overImg(this); \" onMouseOut=\"outImg(this); \"></a>";
	// ��ǰ��
	oCell6.innerHTML = "<a id=\"divItemName\"></a><input type=\"hidden\" name=\"item_name\" >";
	
	// ������������ PLT
	oCell7.innerHTML = "<a id=\"divCumPlt\"></a><input type=\"hidden\" name=\"cum_plt\">";
	// ������������ BOX
	oCell8.innerHTML = "<a id=\"divCumBox\"></a><input type=\"hidden\" name=\"cum_box\">";
	// �⺻������ PLT
	oCell9.innerHTML = "<a id=\"divBasePlt\"></a><input type=\"hidden\" name=\"base_stk_plt\">";
	// �⺻������ BOX
	oCell10.innerHTML = "<a id=\"divBaseBox\"></a><input type=\"text\" name=\"base_stk_box\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:right; \">";
	// �߰������� PLT
	oCell11.innerHTML = "<a id=\"divAddPlt\"></a><input type=\"hidden\" name=\"add_stk_plt\">";
	// �߰������� BOX
	oCell12.innerHTML = "<a id=\"divAddBox\"></a><input type=\"text\" name=\"add_stk_box\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:right; \">";
	// ������� PLT
	oCell13.innerHTML = "<a id=\"divProdPlt\"></a><input type=\"hidden\" name=\"prod_plt\">";
	// ������� BOX
	oCell14.innerHTML = "<a id=\"divProdBox\"></a><input type=\"text\" name=\"prod_box\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:right; \">";
	
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
			if( left_tbody.rows[i].style.backgroundColor == "#d0b8f1" ) {
				clickedLineIdx = i;
				clickedFlag = true;
			}
		}
		else {
			divRowNo.innerHTML = "1";
			// üũ�� �Ǿ��ִ� �����̸� clickedLineIdx ����
			if( left_tbody.rows[0].style.backgroundColor == "#d0b8f1" ) {
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
	
	if( tableLen > 0 )
	{
		delRowDo( delRowIdx );
		if(tableLen != 1)
			rowFormed();
	}
	setRowNo();
	calCum();
	
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
// �� �ϴ� ���� ������ ���
function memLastRow() {
	var tableLen = left_tbody.rows.length;

	if( document.frm.truck_seq[tableLen-1]) {
		arrData[0] 	= document.frm.tgt_loc[tableLen-1].value;      // �԰���
		if(document.frm.truck_seq[tableLen-1])
			arrData[1] 	= document.frm.truck_seq[tableLen-1].value;    // ��������
		else
			arrData[1] 	= document.frm.truck_seq.value;    // ��������
		if(document.frm.rte_seq[tableLen-1])
			arrData[2] 	= document.frm.rte_seq[tableLen-1].value;      // RTE����
		else
			arrData[2] 	= document.frm.rte_seq.value;      // RTE����
		if(document.frm.item_id[tableLen-1])
			arrData[3] 	= document.frm.item_id[tableLen-1].value;      // ��ǰ�ڵ�
		else
			arrData[3] 	= document.frm.item_id.value;      // ��ǰ�ڵ�
		if(document.frm.item_name[tableLen-1])
			arrData[4] 	= document.frm.item_name[tableLen-1].value;    // ��ǰ��
		else
			arrData[4] 	= document.frm.item_name.value;    // ��ǰ��
		arrData[5] 	= document.frm.base_stk_plt[tableLen-1].value; // �⺻������ PLT
		arrData[6] 	= document.frm.base_stk_box[tableLen-1].value; // �⺻������ BOX
		arrData[7] 	= document.frm.add_stk_plt[tableLen-1].value;  // �߰������� PLT
		arrData[8] 	= document.frm.add_stk_box[tableLen-1].value;  // �߰������� BOX
		arrData[9]  = document.frm.prod_plt[tableLen-1].value;     // ������� PLT
		arrData[10] = document.frm.prod_box[tableLen-1].value;     // ������� BOX
		arrData[11] = document.frm.cum_plt[tableLen-1].value;      // ������������ PLT
		arrData[12] = document.frm.cum_box[tableLen-1].value;      // ������������ BOX
		arrData[13] = left_tbody.rows[tableLen-1].style.backgroundColor; // üũ color
	}
	else {
		arrData[0] 	= document.frm.tgt_loc.value;      // �԰���
		arrData[1] 	= document.frm.truck_seq.value;    // ��������
		arrData[2] 	= document.frm.rte_seq.value;      // RTE����
		arrData[3] 	= document.frm.item_id.value;      // ��ǰ�ڵ�
		arrData[4] 	= document.frm.item_name.value;    // ��ǰ��
		arrData[5] 	= document.frm.base_stk_plt.value; // �⺻������ PLT
		arrData[6] 	= document.frm.base_stk_box.value; // �⺻������ BOX
		arrData[7] 	= document.frm.add_stk_plt.value;  // �߰������� PLT
		arrData[8] 	= document.frm.add_stk_box.value;  // �߰������� BOX
		arrData[9]  = document.frm.prod_plt.value;     // ������� PLT
		arrData[10] = document.frm.prod_box.value;     // ������� BOX
		arrData[11] = document.frm.cum_plt.value;      // ������������ PLT
		arrData[12] = document.frm.cum_box.value;      // ������������ BOX
		arrData[13] = left_tbody.rows[0].style.backgroundColor; // üũ color
	}
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.truck_seq[tableLen-1]) {
		document.frm.tgt_loc[tableLen-1].value 	    = arrData[0];  // �԰���
		if(document.frm.truck_seq[tableLen-1])
			document.frm.truck_seq[tableLen-1].value 	= arrData[1];  // ��������
		else
			document.frm.truck_seq.value 	= arrData[1];  // ��������
		if(document.frm.rte_seq[tableLen-1])
			document.frm.rte_seq[tableLen-1].value 		= arrData[2];  // RTE����
		else
			document.frm.rte_seq.value 		= arrData[2];  // RTE����
		if(document.frm.item_id[tableLen-1])
			document.frm.item_id[tableLen-1].value 		= arrData[3];  // ��ǰ�ڵ�
		else
			document.frm.item_id.value 		= arrData[3];  // ��ǰ�ڵ�
		if(document.frm.item_name[tableLen-1])
			document.frm.item_name[tableLen-1].value 	= arrData[4];  // ��ǰ��
		else
			document.frm.item_name.value 	= arrData[4];  // ��ǰ��
		document.frm.base_stk_plt[tableLen-1].value = arrData[5];  // �⺻������ PLT
		document.frm.base_stk_box[tableLen-1].value = arrData[6];  // �⺻������ BOX
		document.frm.add_stk_plt[tableLen-1].value 	= arrData[7];  // �߰������� PLT
		document.frm.add_stk_box[tableLen-1].value 	= arrData[8];  // �߰������� BOX
		document.frm.prod_plt[tableLen-1].value 	= arrData[9];  // ������� PLT
		document.frm.prod_box[tableLen-1].value 	= arrData[10]; // ������� BOX
		document.frm.cum_plt[tableLen-1].value 		= arrData[11]; // ������������ PLT
		document.frm.cum_box[tableLen-1].value 		= arrData[12]; // ������������ BOX
		left_tbody.rows[tableLen-1].style.backgroundColor = arrData[13]; // üũ color
		main_tbody.rows[tableLen-1].style.backgroundColor = arrData[13]; // üũ color
		
		setViewMode(document.frm.tgt_loc[tableLen-1]);
		if(divTruckSeq[tableLen-1]){
			divTruckSeq[tableLen-1].innerHTML 	= arrData[1]; // ��������
			divRteSeq[tableLen-1].innerHTML 	= arrData[2]; // RTE����
			divItemId[tableLen-1].innerHTML 	= arrData[3]; // ��ǰ�ڵ�
			divItemName[tableLen-1].innerHTML 	= "&nbsp;" + arrData[4]; // ��ǰ��
			divBasePlt[tableLen-1].innerHTML 	= fixedPoint(arrData[5], 2) + "&nbsp;";  // �⺻������ PLT
			divBaseBox[tableLen-1].innerHTML 	= arrData[6] + "&nbsp;";  				 // �⺻������ BOX
			divAddPlt[tableLen-1].innerHTML 	= fixedPoint(arrData[7], 2) + "&nbsp;";  // �߰������� PLT
			divAddBox[tableLen-1].innerHTML 	= arrData[8] + "&nbsp;";  				 // �߰������� BOX
			divProdPlt[tableLen-1].innerHTML 	= fixedPoint(arrData[9], 2) + "&nbsp;"; // ������� PLT
			divProdBox[tableLen-1].innerHTML 	= arrData[10] + "&nbsp;"; 				 // ������� BOX
			divCumPlt[tableLen-1].innerHTML 	= fixedPoint(arrData[11], 2) + "&nbsp;"; // ������������ PLT
			divCumBox[tableLen-1].innerHTML 	= arrData[12] + "&nbsp;"; 				 // ������������ BOX
		}
		else{
			divTruckSeq.innerHTML 	= arrData[1]; // ��������
			divRteSeq.innerHTML 	= arrData[2]; // RTE����
			divItemId.innerHTML 	= arrData[3]; // ��ǰ�ڵ�
			divItemName.innerHTML 	= "&nbsp;" + arrData[4]; // ��ǰ��
			divBasePlt.innerHTML 	= fixedPoint(arrData[5], 2) + "&nbsp;";  // �⺻������ PLT
			divBaseBox.innerHTML 	= arrData[6] + "&nbsp;";  				 // �⺻������ BOX
			divAddPlt.innerHTML 	= fixedPoint(arrData[7], 2) + "&nbsp;";  // �߰������� PLT
			divAddBox.innerHTML 	= arrData[8] + "&nbsp;";  				 // �߰������� BOX
			divProdPlt.innerHTML 	= fixedPoint(arrData[9], 2) + "&nbsp;"; // ������� PLT
			divProdBox.innerHTML 	= arrData[10] + "&nbsp;"; 				 // ������� BOX
			divCumPlt.innerHTML 	= fixedPoint(arrData[11], 2) + "&nbsp;"; // ������������ PLT
			divCumBox.innerHTML 	= arrData[12] + "&nbsp;"; 				 // ������������ BOX			
		}
	}
	else {
		document.frm.tgt_loc.value 	    = arrData[0];  // �԰���
		document.frm.truck_seq.value 	= arrData[1];  // ��������
		document.frm.rte_seq.value 		= arrData[2];  // RTE����
		document.frm.item_id.value 		= arrData[3];  // ��ǰ�ڵ�
		document.frm.item_name.value 	= arrData[4];  // ��ǰ��
		document.frm.base_stk_plt.value = arrData[5];  // �⺻������ PLT
		document.frm.base_stk_box.value = arrData[6];  // �⺻������ BOX
		document.frm.add_stk_plt.value 	= arrData[7];  // �߰������� PLT
		document.frm.add_stk_box.value 	= arrData[8];  // �߰������� BOX
		document.frm.prod_plt.value 	= arrData[9];  // ������� PLT
		document.frm.prod_box.value 	= arrData[10]; // ������� BOX
		document.frm.cum_plt.value 		= arrData[11]; // ������������ PLT
		document.frm.cum_box.value 		= arrData[12]; // ������������ BOX
		left_tbody.rows[0].style.backgroundColor = arrData[13]; // üũ color
		main_tbody.rows[0].style.backgroundColor = arrData[13]; // üũ color
		
		divTgtLoc.innerHTML 	= arrData[0]; // �԰���
		setViewMode(document.frm.tgt_loc);
		divTruckSeq.innerHTML 	= arrData[1]; // ��������
		divRteSeq.innerHTML 	= arrData[2]; // RTE����
		//divSrcLoc.innerHTML 	= arrData[2]; // �����
		//setViewMode(document.frm.src_loc); 	  // �����
		divItemId.innerHTML 	= arrData[3]; // ��ǰ�ڵ�
		divItemName.innerHTML 	= "&nbsp;" + arrData[4]; // ��ǰ��
		divBasePlt.innerHTML 	= fixedPoint(arrData[5], 2) + "&nbsp;";  // �⺻������ PLT
		divBaseBox.innerHTML 	= arrData[6] + "&nbsp;";  				 // �⺻������ BOX
		divAddPlt.innerHTML 	= fixedPoint(arrData[7], 2) + "&nbsp;";  // �߰������� PLT
		divAddBox.innerHTML 	= arrData[8] + "&nbsp;";  				 // �߰������� BOX
		divProdPlt.innerHTML 	= fixedPoint(arrData[9], 2) + "&nbsp;"; // ������� PLT
		divProdBox.innerHTML 	= arrData[10] + "&nbsp;"; 				 // ������� BOX
		divCumPlt.innerHTML 	= fixedPoint(arrData[11], 2) + "&nbsp;"; // ������������ PLT
		divCumBox.innerHTML 	= arrData[12] + "&nbsp;"; 				 // ������������ BOX
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
		// �԰��� --> ��������
		if( objName == "tgt_loc" ) {
			objTdG = left_tbody.rows[rowIdx].cells[3];
		}
		// �������� --> RTE����
		else if( objName == "truck_seq" ) {
			objTdG = left_tbody.rows[rowIdx].cells[4];
		}
		// RTE���� --> ��ǰ�ڵ�
		else if( objName == "rte_seq" ) {
			objTdG = left_tbody.rows[rowIdx].cells[5];
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
		// ������� BOX --> ������ �԰���
		else if( objName == "prod_box" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[2];
			}
			// �������� ù��° �� �̵�
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[2];
			}
		}
		// �� ���� box ���� ���� ����
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
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

// src_log, route_seq �и�
function setRouteId( route_id ) {
	
	var routeArr = route_id.split("!%!");
	if( routeArr.length == 2 ) {
		document.frm.src_loc.value = routeArr[0].trim();
		document.frm.loc_seq.value = routeArr[1].trim();
	}
	
}

// ��ǰ �˻� POPUP
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
		alert("�԰��带 ���� �����ϼ���.");
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
		var dc_id = document.frm.src_loc.value;
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

// ����� ���� �Է°����κ��� ��ǰ���� ��ȸ
// ��ǰ �ڵ�, ��ǰ �� �� �� �ϳ��� ��ġ�ϴ� ������ �˻�
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
	
	// ����� �Ǵ� ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
	if( dc_id == "" || dc_id == null ) {
		alert("ROUTE ID�� ���� �����ϼ���.");
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
	
	replenishPlan.getItemInfo(dc_id, input_value, "rp_05010_dailyTransportPlanSalesInfo_search_item_id", { 
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
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}

// Save ��ư�� ��������, ����Ǵ� ����Ÿ�� PK���� �Է��ߴ��� üũ
function checkSavePkData(){
	var tableLen = left_tbody.rows.length;
	var f = document.frm;
	
	if(tableLen == 0){
		alert("�Է��� ����Ÿ�� �������� �ʽ��ϴ�.");
		return true;
	}else if(tableLen == 1){
		if( f.tgt_loc.value == null || f.tgt_loc.value == "" ){
			alert("�԰����� �Է��� �ֽʽÿ�");
			return true;
		}else if(f.truck_seq.value == null || f.truck_seq.value == "" ){
			alert("���������� �Է��� �ֽʽÿ�");
			return true;
		}else if(f.item_id.value == null || f.item_id.value == "" ){
			alert("��ǰ�ڵ带 �Է��� �ֽʽÿ�");
			return true;
		} 		
		
	}else{
		for( var i = 0 ; i < tableLen ; ++i ) {
			if( f.tgt_loc[i].value == null || f.tgt_loc[i].value == "" ){
				alert("�԰����� �Է��� �ֽʽÿ�");
				return true;
			}else if(f.truck_seq[i].value == null || f.truck_seq[i].value == "" ){
				alert("���������� �Է��� �ֽʽÿ�");
				return true;
			}else if(f.item_id[i].value == null || f.item_id[i].value == "" ){
				alert("��ǰ�ڵ带 �Է��� �ֽʽÿ�");
				return true;
			} 		 
		}
	}	
}

// ���� ��ư Ŭ��
function GoSave(service) {
	
	var src_loc = document.frm.src_loc.value;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	// ROUTE ID�� �������� ���� ���
	if( src_loc == null || src_loc == "" ) {
		alert("ROUTE ID�� ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	// ����, ������ �������� ���� ���
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("������ ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	
	if( checkSavePkData() ) // Save ��ư�� ��������, ����Ǵ� ����Ÿ�� PK���� �Է��ߴ��� üũ
		return;
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// ��ȸ ��ư Ŭ��
function GoSearch(service) {
	
	var route_id = document.frm.route_id.value;
	
	// ROUTE_ID�� �������� ���� ���
	if( route_id == "" ) {
		alert("ROUTE ID�� ������ �ֽʽÿ�.");
		return;
	}
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
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
