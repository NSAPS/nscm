////////////////////////////////////////////////////////////
// ���α׷�ID : md_04090_routeMultiDrop_list.js
// ���α׷��� : Route���� ��������
// ������  : ���ؼ�
// �������� : 2008-07-31 �����
//
//���� job file : job_sinc_70_masterData_00.xml
//
//���� query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-07-31  ���ؼ�     md_04090_routeMultiDrop_list.js ����
//
//
////////////////////////////////////////////////////////////

// Ŭ���� �������� �ε���
var clickedDateIdx = null;

// ��¥ �˻� POP BTN mouseOver
function overBtn( objBtn ) {
	
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// ��¥ �˻� POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
}

// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}
// combo box �� View Mode �� ��ȯ
function setViewMode1(objBox) {
	
	// �������� ���� ���
	if( objBox.name == "transDateTmp" ) {
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
	objTd.onclick = function() { setEditMode1(this); };

}

// combo box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";	
	objTd.childNodes(1).focus();
}

// input box �� Edit Mode �� ��ȯ
function setEditMode1( objTd ) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	
	// �������� �˻� ��
	if( objTd.childNodes(0).id == "divValidStart" || objTd.childNodes(0).id == "divValidEnd") {
		objTd.childNodes(0).style.display = "block";
		objTd.childNodes(1).style.display = "none";
		var strDate = "<input type=\"text\" name=\"transDateTmp\" size=\"10\" maxlength=\"10\" onDblClick=\"this.select(); \" "
			+ "class=\"normal\" onBlur=\"chkDate2(this,'10'); \" onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode1(this); \" "
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


/**
 * �Է¹��� �� �ִ� ���� ���͸��Ѵ�.
 * ex : <input type="text" ..... onkeypress="filterKey('[0-9]')"> ; ���ڸ� Ű�Է��� ������ text filed
 * ex : <input type="text" ..... onkeypress="filterKey('[0-9a-zA-Z]')"> ; ����,���ڸ� Ű�Է��� ������ text filed
 * @param filter : ���͸��� ����ǥ���� ex) '[0-9]':0~9�� ���� ���, '[a-zA-Z]':���ĺ��� ���
 * @browser IE6, NS7
 */
function filterKey(filter) {
  if(filter){
      var sKey = String.fromCharCode(event.keyCode);
      var re = new RegExp(filter);
      if(!re.test(sKey)) event.returnValue=false;
  }
} 

// Route Seq �ߺ� check
function checkRouteSeq(objTd) {
	
	var tableLen = left_tbody.rows.length;
	
	var strVal = objTd.value;
	
	if(tableLen == 1){
		
	}else{
		for( var i = 0 ; i < tableLen ; ++i ) {
			if( document.frm.route_seq[i] != objTd 
			&& document.frm.route_seq[i].value == objTd.value 
			&& objTd.value != "" ) {
				alert("�̹� ���� ������ �����մϴ�. �ٸ� ���� �Է����ֽʽÿ�.");
				objTd.value = "";
				strVal = "";
				objTd.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
				objTd.parentNode.childNodes(0).style.display = "block";
				objTd.style.display = "none";
				return;
			}
		}
	}
	objTd.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objTd.parentNode.childNodes(0).style.display = "block";
	objTd.style.display = "none";
	
}


// row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRow( objBtn ) {
	
	var tmp_tgt_loc = document.frm.tgt_loc_sel.options[document.frm.tgt_loc_sel.selectedIndex].text;
	
	if(tmp_tgt_loc == "����"){
		alert("���� ��ȸ�� �ϼž� �Է��� �����մϴ�.");
		return;		
	}
	
	if( objBtn.tagName == "TD"  ) {
		var insertRowIndex = 0;
		var oRowLeft = left_tbody.insertRow(insertRowIndex);
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	else {
		var insertRowIndex = objBtn.parentNode.parentNode.rowIndex;
		insertRowIndex = insertRowIndex + 1;
		var oRowLeft = left_tbody.insertRow(insertRowIndex);
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	
	// ���� �߰��ϴ� row �� row index ����
	var rowNo = oRowLeft.rowIndex;
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22;
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // �߰�/����
	var oCell2 = oRowLeft.insertCell(); // �����
	var oCell3 = oRowLeft.insertCell(); // ROUTE ID
	
	var oCell4 = oRowMain.insertCell(); // ��1�԰���
	var oCell5 = oRowMain.insertCell(); // ��2�԰���
	var oCell6 = oRowMain.insertCell(); // ��3�԰���
	var oCell7 = oRowMain.insertCell(); // �����������
	var oCell8 = oRowMain.insertCell(); // ������������
	var oCell9 = oRowMain.insertCell(); // ����
	
	//oCell2.onclick = function() { setEditMode(this); }; // �����
	oCell3.onclick = function() { setEditMode1(this); }; // ROUTE ID
	
	oCell4.onclick = function() { setEditMode(this); }; // ��1�԰���
	oCell5.onclick = function() { setEditMode(this); }; // ��2�԰���
	oCell6.onclick = function() { setEditMode(this); }; // ��3�԰���
	oCell7.onclick = function() { setEditMode1(this); }; // �����������
	oCell8.onclick = function() { setEditMode1(this); }; // ������������
	oCell9.onclick = function() { setEditMode(this); }; // ����
	
	oCell0.align = "center"; oCell0.width = "30px";  // ��ȣ
	oCell1.align = "center"; oCell1.width = "40px";  // �߰�/����
	oCell2.align = "center"; oCell2.width = "80px"; // �����
	oCell3.align = "center"; oCell3.width = "40px";  // ROUTE ID
	
	oCell4.align = "left";   oCell4.width = "90px"; // ��1�԰���
	oCell5.align = "left";   oCell5.width = "90px"; // ��2�԰���
	oCell6.align = "left";   oCell6.width = "90px"; // ��3�԰���
	oCell7.align = "center"; oCell7.width = "95px"; // �����������
	oCell8.align = "center"; oCell8.width = "95px"; // ������������
	oCell9.align = "left";   oCell9.width = "150px"; oCell9.className = "right"; // ����
	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// �߰�/����
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// �����
	oCell2.innerHTML = "<a id=\"divCdcId\">&nbsp;" + tmp_tgt_loc + "</a>";
	// ����
	oCell3.innerHTML = "<a id=\"divRouteSeq\"></a><input " 
						+ "type=\"text\" name=\"route_seq\" class=\"normal\" value=\"\" size=\"2\" maxlength=\"2\" "
						+ "onFocusOut=\"checkRouteSeq(this); \" onkeypress=\"filterKey('[0-9]')\" onKeyDown=\"moveNextBox(this); \" ondblClick=\"this.select(); \" "
						+ "style=\"width:100%; text-align:center; display:none; \">";
	// ��1�԰���
	oCell4.innerHTML = "<a id=\"divDcId1\"></a>" + selStrDcId1;
	// ��2�԰���
	oCell5.innerHTML = "<a id=\"divDcId2\"></a>" + selStrDcId2;
	// ��3�԰���
	oCell6.innerHTML = "<a id=\"divDcId3\"></a>" + selStrDcId3;
	// �����������
	oCell7.innerHTML = "<a id=\"divValidStart\"></a><input type=\"hidden\" name=\"start_dttm\" value=\"\">";
	// ������������
	oCell8.innerHTML = "<a id=\"divValidEnd\"></a><input type=\"hidden\" name=\"end_dttm\" value=\"\">";
	
	// ����
	oCell9.innerHTML = "<a id=\"divReason\"></a><input type=\"text\" name=\"reason\" class=\"normal\" value=\"\" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \" ondblClick=\"this.select(); \" "
						+ "style=\"width:100%; text-align:left; display:none; \">";
	
	document.recalc();
	setRowNo();
	
}

// ��ȣ setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	areaTot.innerHTML = tableLen;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
		}
		else {
			divRowNo.innerHTML = "1";
		}
	}
	
}

// row ���� 
// parameter : button object
function delRow( objBtn ) { 
	
	var delRowIdx = objBtn.parentNode.parentNode.rowIndex;
	var tableLen = objBtn.parentNode.parentNode.parentNode.rows.length;
	
	if( tableLen > 0 ) // ��� ROW�� ���� �ǵ��� 0���� ������.
	{
		delRowDo( delRowIdx );
		if(tableLen != 1)
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
		else{
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

var arrData = new Array(7); 
// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.route_seq[tableLen-1] ) {
		arrData[0] = document.frm.route_seq[tableLen-1].value;
		arrData[1] = document.frm.dc_id_1[tableLen-1].value;
		arrData[2] = document.frm.dc_id_2[tableLen-1].value;
		arrData[3] = document.frm.dc_id_3[tableLen-1].value;
		arrData[4] = document.frm.start_dttm[tableLen-1].value;
		arrData[5] = document.frm.end_dttm[tableLen-1].value;
		arrData[6] = document.frm.reason[tableLen-1].value;
	}
	else {
		arrData[0] = document.frm.route_seq.value;
		arrData[1] = document.frm.dc_id_1.value;
		arrData[2] = document.frm.dc_id_2.value;
		arrData[3] = document.frm.dc_id_3.value;
		arrData[4] = document.frm.start_dttm.value;
		arrData[5] = document.frm.end_dttm.value;
		arrData[6] = document.frm.reason.value;
	}
	
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.route_seq[tableLen-1] ) {
		document.frm.route_seq[tableLen-1].value 	= arrData[0]; // ����
		document.frm.dc_id_1[tableLen-1].value 		= arrData[1]; // ��1�԰���
		document.frm.dc_id_2[tableLen-1].value      = arrData[2]; // ��2�԰���
		document.frm.dc_id_3[tableLen-1].value 		= arrData[3]; // ��3�԰���
		document.frm.start_dttm[tableLen-1].value 	= arrData[4]; // �����������
		document.frm.end_dttm[tableLen-1].value 	= arrData[5]; // ������������
		document.frm.reason[tableLen-1].value 	    = arrData[6]; // ����
		
		setViewMode(document.frm.route_seq[tableLen-1]); 	// ����
		setViewMode1(document.frm.dc_id_1[tableLen-1]); 	// ��1�԰���
		setViewMode1(document.frm.dc_id_2[tableLen-1]);     // ��2�԰���
		setViewMode1(document.frm.dc_id_3[tableLen-1]); 	// ��3�԰���
		setViewMode1(document.frm.start_dttm[tableLen-1]); 	// �����������
		setViewMode1(document.frm.end_dttm[tableLen-1]);     // ������������
		setViewMode(document.frm.reason[tableLen-1]);       // ����
	}
	else {
		document.frm.route_seq.value 	= arrData[0]; // ����
		document.frm.dc_id_1.value 		= arrData[1]; // ��1�԰���
		document.frm.dc_id_2.value      = arrData[2]; // ��2�԰���
		document.frm.dc_id_3.value 		= arrData[3]; // ��3�԰���
		document.frm.start_dttm.value 	= arrData[4]; // �����������
		document.frm.end_dttm.value 	= arrData[5]; // ������������
		document.frm.reason.value 	    = arrData[6]; // ����
		
		setViewMode(document.frm.route_seq); 	// ����
		setViewMode1(document.frm.dc_id_1); 	// ��1�԰���
		setViewMode1(document.frm.dc_id_2);     // ��2�԰���
		setViewMode1(document.frm.dc_id_3); 	// ��3�԰���
		setViewMode1(document.frm.start_dttm); 	// �����������
		setViewMode1(document.frm.end_dttm);     // ������������
		setViewMode(document.frm.reason);       // ����
	}
	
}

// �� ���� ��������
var objTdG;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode1( objTdG );
	
}

// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = left_tbody.rows.length;
	// �����������, ������������ ���� ���
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) { // main_tbody.rows[...].cells error �ΰ��, ����Ұ�
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}else{
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	var objId = objBox.parentNode.id;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// ���� --> ��1�԰���
		if( objName == "route_seq" ) {
			objTdG = main_tbody.rows[rowIdx].cells[0];
		}
		// ��1�԰��� --> ��2�԰���
		else if( objName == "dc_id_1" ) {
			objTdG = main_tbody.rows[rowIdx].cells[1];
		}
		// ��2�԰��� --> ��3�԰���
		else if( objName == "dc_id_2" ) {
			objTdG = main_tbody.rows[rowIdx].cells[2];
		}
		// ��2�԰��� --> �����������
		else if( objName == "dc_id_3" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// ����������� --> ������������
		else if( objName == "transDateTmp" && objId == "divValidStart") {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// ������������ --> ����
		else if( objName == "transDateTmp" && objId == "divValidEnd") {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// ���� --> ������ ����
		else if( objName == "reason" ) {
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

// ���� ��ư Ŭ��
function GoSave(service) {
	
	var tableLen = left_tbody.rows.length;
	
	if(tableLen == 1){
		if( document.frm.route_seq.value == "" || document.frm.route_seq.value == null ) {
			alert("������ �Է��� �ֽʽÿ�.");
			return;
		}		
	}else{
		for( var i=0 ; i < tableLen ; i++ ) {
			if( document.frm.route_seq[i].value == "" || document.frm.route_seq[i].value == null ) {
				alert("������ �Է��� �ֽʽÿ�.");
				return;
			}	
		}	
	}
	
	
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
	
	var tgt_loc_sel = document.frm.tgt_loc_sel.value;
	
	// ������� �������� ���� ���
	if( tgt_loc_sel == "" ) {
		alert("������� ������ �ֽʽÿ�.");
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
		setViewMode1(obj);
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
