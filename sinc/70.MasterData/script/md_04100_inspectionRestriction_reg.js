
// ����ȭ������ �̵�
function moveBack() {
	var plant_pre = document.frm.plant_pre.value;
	var item_type_pre = document.frm.item_type_pre.value;
	var serch_word_pre = document.frm.serch_word_pre.value;	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	var urlStr = "service.do?_moon_service=md_04100_inspectionRestriction_list";

	
	urlStr += "&plant=" + plant_pre + "&item_type=" + item_type_pre +"&serch_word=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
}

// Ŭ���� ���� �ε���
var clickedLineIdx = null;
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var popImgIdx = null;

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";		
	objTd.childNodes(1).style.display = "block";
	
	
	if( objTd.childNodes(1).tagName.toUpperCase() == "SELECT") { // ���弿�� ���                              
		objTd.childNodes(1).focus();
	}
	else if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "INPUT"){
		objTd.childNodes(1).childNodes(0).select();
	}
	else {//if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "SELECT" ) {// ���� ���� ���	
		objTd.childNodes(1).childNodes(0).focus();
	}	
		
}

// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
	
	var strVal;
	var objTd;
			
	if(objBox.tagName.toUpperCase() == "INPUT"){//ǰ���ڵ�
		strVal = objBox.value;
		objTd = objBox.parentNode.parentNode;		
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		}
		objBox = objBox.parentNode;
	}	
	else if( objBox.tagName.toUpperCase() == "SELECT"){//����
		strVal = objBox.options[objBox.selectedIndex].text;	
		objTd = objBox.parentNode;
	}
	else{
		strVal = objBox.childNodes(0).value + " <br>&nbsp;";		
		strVal += objBox.childNodes(0).options[objBox.childNodes(0).selectedIndex].text;
		objTd = objBox.parentNode;
	}
	
		
	if( objBox.parentNode.align.toUpperCase() == "CENTER" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal;
	}
	else if( objBox.parentNode.align.toUpperCase() == "RIGHT" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;";
	}
	else {
		objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	}
	
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";
	
}


// input box �� Edit Mode �� ��ȯ
function setEditMode1( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).select();
		
}

// input box �� View Mode �� ��ȯ
function setViewMode1( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// �ڵ� String üũ
// ���� & _ (underscore) �� ���, ������ �빮�ڷ� ��ȯ
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

// row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
//function addRow( insertRowIndex ) { 
function addRow() {

	var oRowLeft = left_tbody.insertRow(); 
	var oRowMain = main_tbody.insertRow(); 
	
	// ���� �߰��ϴ� row �� row index ����
	var rowNo = oRowLeft.rowIndex;

	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 30; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 30; 
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����
	var oCell2 = oRowLeft.insertCell(); // ǰ���ȣ
	var oCell3 = oRowLeft.insertCell(); // ǰ���
	var oCell4 = oRowMain.insertCell(); // �˻�����
	var oCell5 = oRowMain.insertCell(); // �˻����
	var oCell6 = oRowMain.insertCell(); // �˻�ҿ��ϼ�
	var oCell7 = oRowMain.insertCell(); // �˻��û���ɿ���
	var oCell8 = oRowMain.insertCell(); // ��������
	
	oCell2.ondblclick = function() { setEditMode(this); }; // ǰ���ڵ�
	//oCell3.ondblclick = function() { setEditMode(this); }; // ǰ���
	oCell4.ondblclick = function() { setEditMode(this); }; // �˻�����
	oCell5.ondblclick = function() { setEditMode(this); }; // �˻����
	oCell6.ondblclick = function() { setEditMode1(this); }; // �˻�ҿ��ϼ�
	oCell7.ondblclick = function() { setEditMode(this); }; // �˻��û���ɿ���
	oCell8.ondblclick = function() { setEditMode(this); }; // ��������

	
	oCell0.align = "center"; oCell0.width = "30px"; // ��ȣ
	oCell1.align = "center"; oCell1.width = "60px"; // ����
	oCell2.align = "center"; oCell2.width = "100px";  // ǰ���ȣ
	oCell3.align = "left"; oCell3.width = "250px";  // ǰ���
	oCell4.align = "center"; oCell4.width = "150px";  // �˻�����
	oCell5.align = "center"; oCell5.width = "100px";  // �˻����
	oCell6.align = "center"; oCell6.width = "100px";  // �˻�ҿ��ϼ�
	oCell7.align = "center"; oCell7.width = "100px";  // �˻��û���ɿ���
	oCell8.align = "center"; oCell8.width = "100px";  // ��������
	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>"; 
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// ����
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" class=\"button1_1\"\n"
						+	"style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \"\n"
						+	"onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">\n"
						+"<input name=\"btnDelRow\" type=\"button\" value=\"X\" class=\"button1_1\"\n"
						+	"style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \"\n"
						+	"onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">\n";


	// ǰ���ڵ�
	oCell2.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemIdSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"item_id\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
						+ "style=\"width:60PX; padding-right:5px; text-align:cneter; \" > "
						+ "<img name=\"imgItemId\" tabindex=\"-1\" "
        				+ "src=\"sinc/template/basic/skin/nongshim/images/common/icon_search.gif\" align=\"absmiddle\" "
        				+ "border=\"0\" onClick=\"openItemSearchPop(this); \" style=\"cursor:pointer;\" "
        				+ "onMouseOver=\"overImg(this); \" onMouseOut=\"outImg(this); \"/></a> ";
	// ǰ���̸�
	oCell3.innerHTML = "<a id=\"divItemName\"></a><input "
						+ "type=\"text\" name=\"item_name\" class=\"normal\" size=\"20\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:left; \" "
						+ "onChange=\"checkNum(this, 'BLANK'); fixedPoint(this.value, 1); \">";
	
	// �˻�����
	ins_type_combo(oCell4)

	// �˻����
	ins_loc_combo(oCell5)
	
	// �˻�ҿ��ϼ�
	oCell6.innerHTML = "<a id=\"div03\"></a><input type=\"text\" name=\"INS_DAYS\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode1(this); \">";
	// �˻��û���ɿ���
	ins_days_combo(oCell7)

	// ��������
	ins_market_combo(oCell8)
	
	document.recalc();
	setRowNo();
}

// ��ȣ setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	var clickedFlag = false; // üũ�� ������ �ִ��� ����
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
			// üũ�� �Ǿ��ִ� �����̸� clickedLineIdx ����
			if( left_tbody.rows[i].style.backgroundColor == "#ccccff" ) {
				clickedLineIdx = i;
				clickedFlag = true;
			}
		}
		else {
			divRowNo.innerHTML = "1";
			// üũ�� �Ǿ��ִ� �����̸� clickedLineIdx ����
			if( left_tbody.rows[i].style.backgroundColor == "#ccccff" ) {
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

// num ����ŭ �� �߰�
function addRows( num ) {
	
	for( var i=0; i<num ; ++i ) {
		addRow();
	}
}

// row ���� 
// parameter : button object
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	
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
	addRow();
	setLastRow();
	
} 
var arrData = new Array(8);
var arrDisplayData = new Array(8); 
// �� �ϴ� ���� ������ ���
function memLastRow() {
	var tableLen = left_tbody.rows.length;
	if( document.frm.item_id[tableLen-1] && tableLen > 1) {
		arrDisplayData[0] = divItemId[tableLen-1].innerHTML;
		arrDisplayData[1] = divItemName[tableLen-1].innerHTML;
		arrDisplayData[2] = div01[tableLen-1].innerHTML;
		arrDisplayData[3] = div02[tableLen-1].innerHTML;
		arrDisplayData[4] = div03[tableLen-1].innerHTML;
		arrDisplayData[5] = div04[tableLen-1].innerHTML;
		arrDisplayData[6] = div05[tableLen-1].innerHTML;
		arrDisplayData[7]  = left_tbody.rows[tableLen-1].style.backgroundColor; // üũ
	}
	else {
		if(divItemId[0]){
			arrDisplayData[0] = divItemId.innerHTML;
			arrDisplayData[1] = divItemName.innerHTML;
			arrDisplayData[2] = div01.innerHTML;
			arrDisplayData[3] = div02.innerHTML;
			arrDisplayData[4] = div03.innerHTML;
			arrDisplayData[5] = div04.innerHTML;
			arrDisplayData[6] = div05.innerHTML;		}
		else{
			arrDisplayData[0] = divItemId.innerHTML;
			arrDisplayData[1] = divItemName.innerHTML;
			arrDisplayData[2] = div01.innerHTML;
			arrDisplayData[3] = div02.innerHTML;
			arrDisplayData[4] = div03.innerHTML;
			arrDisplayData[5] = div04.innerHTML;
			arrDisplayData[6] = div05.innerHTML;		}
	}


	if( document.frm.item_id[tableLen-1] && tableLen > 1) {
		arrData[0] = document.frm.item_id[tableLen-1].value;
		arrData[1] = document.frm.item_name[tableLen-1].value;
		arrData[2] = document.frm.INS_CAT[tableLen-1].value;
		arrData[3] = document.frm.INS_LOC[tableLen-1].value;
		arrData[4] = document.frm.INS_DAYS[tableLen-1].value;
		arrData[5] = document.frm.INS_AVAIL_DWEEK[tableLen-1].value;
		arrData[6] = document.frm.MARKET_LOC[tableLen-1].value;
		arrData[7]  = left_tbody.rows[tableLen-1].style.backgroundColor; // üũ color
	}
	else {
		arrData[0] = document.frm.item_id.value;

		arrData[1] = document.frm.item_name.value;
		arrData[2] = document.frm.INS_CAT.value;
		arrData[3] = document.frm.INS_LOC.value;
		arrData[4] = document.frm.INS_DAYS.value;
		arrData[5] = document.frm.INS_AVAIL_DWEEK.value;
		arrData[6] = document.frm.MARKET_LOC.value;
	}
}
// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.item_id[tableLen-1] && tableLen > 1) {
		document.frm.item_id[tableLen-1].value = arrData[0];
		document.frm.item_name[tableLen-1].value = arrData[1];
		document.frm.INS_CAT[tableLen-1].options[0].value = arrData[2];
		document.frm.INS_CAT[tableLen-1].options[0].selected;	
		document.frm.INS_LOC[tableLen-1].options[0].value = arrData[3];
		document.frm.INS_LOC[tableLen-1].options[0].selected;	
		document.frm.INS_DAYS[tableLen-1].value = arrData[4];
		document.frm.INS_AVAIL_DWEEK[tableLen-1].options[0].value = arrData[5];
		document.frm.INS_AVAIL_DWEEK[tableLen-1].options[0].selected;	
		document.frm.MARKET_LOC[tableLen-1].options[0].value = arrData[6];
		document.frm.MARKET_LOC[tableLen-1].options[0].selected;	

		divItemId[tableLen-1].innerHTML 	= "&nbsp;" + arrDisplayData[0];
		divItemName[tableLen-1].innerHTML 	= "&nbsp;" + arrDisplayData[1];
		div01[tableLen-1].innerHTML 		= "&nbsp;" + arrDisplayData[2];
		div02[tableLen-1].innerHTML 		= "&nbsp;" + arrDisplayData[3];
		div03[tableLen-1].innerHTML 		= "&nbsp;" + arrDisplayData[4];
		div04[tableLen-1].innerHTML 		= "&nbsp;" + arrDisplayData[5];
		div05[tableLen-1].innerHTML 		= "&nbsp;" + arrDisplayData[6];
	}
	else {
		if(document.frm.item_id[0]){
			document.frm.item_id.value		= arrData[0]; // 
			document.frm.item_name[0].value	= arrData[1]; // 		
			document.frm.INS_CAT[0].value		= arrData[2]; // 		
			document.frm.INS_LOC[0].value		= arrData[3]; // 
			document.frm.INS_DAYS.value 	= arrData[4]; // 
			document.frm.INS_AVAIL_DWEEK[0].value 	= arrData[5]; // 
			document.frm.MARKET_LOC[0].value = arrData[6]; //  		
		}
		else{
			document.frm.item_id.value		= arrData[0]; // 
			document.frm.item_name.value	= arrData[1]; // 		
			document.frm.INS_CAT.value		= arrData[2]; // 		
			document.frm.INS_LOC.value		= arrData[3]; // 
			document.frm.INS_DAYS.value 	= arrData[4]; // 
			document.frm.INS_AVAIL_DWEEK.value 	= arrData[5]; // 
			document.frm.MARKET_LOC.value = arrData[6]; //  		
		}

		divItemId.innerHTML = "&nbsp;" + arrDisplayData[0];
		divItemName.innerHTML = "&nbsp;" + arrDisplayData[1];
		div01.innerHTML = "&nbsp;" + arrDisplayData[2];
		div02.innerHTML = "&nbsp;" + arrDisplayData[3];
		div03.innerHTML = "&nbsp;" + arrDisplayData[4];
		div04.innerHTML = "&nbsp;" + arrDisplayData[5];
		div05.innerHTML = "&nbsp;" + arrDisplayData[6];
	}
	
}


// ��ǰ �˻� POPUP
function openItemSearchPop( obj ) { 	
	
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	var item_id;
	if(document.frm.plant[rowIdx] && document.frm.item_id[rowIdx] ){
		plant = document.frm.plant[rowIdx].value; //�����ڵ�	
		item_id = document.frm.item_id[rowIdx].value; //ǰ���ڵ�
	}
	else{		
		plant = document.frm.plant.value; //�����ڵ�		
		item_id = document.frm.item_id.value; //ǰ���ڵ�
	}
	
	if( plant == "" || plant == null ) {
		alert("������ ���� �����Ͻʽÿ�.");
		return;
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup";
	service_url += "&_moon_perpage=200&_moon_pagenumber=1";
	service_url += "&selected_item_id=" + item_id + "&rowIdx=" + rowIdx;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Item_Search", pop_win_style);
	newWin.focus();
	
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


// chkDupCd() ���� setTimeout �� ����Ǵ� �Լ�
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// ����
/*function GoSave( service ) {
	
	var tableLen = left_tbody.rows.length;
	
	// �ڵ� ��� counting : �ϳ��� ������� ���� ��� �������� ����
	var cdCnt = 0;
	var i = 0;
	while( i < tableLen && cdCnt == 0 ) {
		if( document.frm.in_line[i] ) {
			if( document.frm.in_line[i].value == null || document.frm.in_line[i].value == "" ) {
				i++;
			}
			else {
				cdCnt++;
			}
		}
		else {
			if( document.frm.in_line.value == null || document.frm.in_line.value == "" ) {
				i++;
			}
			else {
				cdCnt++;
			}
		}
	}
	if( cdCnt < 1 ) {
		alert("�׸��� �ϳ� �̻� �Է��ؾ� �մϴ�.");
		if( left_tbody.rows[0] ) {
			objTdG = left_tbody.rows[0].cells[2];
		}
		else {
			objTdG = left_tbody.rows.cells[2];
		}
		setTimeout(setEditModeTime, 1);
		return;
	}
	for( i = 0; i < tableLen ; i++ ) {
		if( document.frm.in_line[i] ) {
			if( document.frm.in_line[i].value == null || document.frm.in_line[i].value == "" 
				|| document.frm.in_proc[i].value == null || document.frm.in_proc[i].value == "" 
				|| document.frm.in_start_dttm[i].value == null || document.frm.in_start_dttm[i].value == "" ) {
				alert("����,�۾���,�����Ͻô� �ݵ�� �Է��ؾ� �մϴ�!");
				return;
			}
		}
		else {
			if( document.frm.in_line.value == null || document.frm.in_line.value == "" 
				|| document.frm.in_proc.value == null || document.frm.in_proc.value == "" 
				|| document.frm.in_start_dttm.value == null || document.frm.in_start_dttm.value == "" ) {
				alert("����,�۾���,�����Ͻô� �ݵ�� �Է��ؾ� �մϴ�!");
				return;
			}
		}
	}

	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();

}
*/	
