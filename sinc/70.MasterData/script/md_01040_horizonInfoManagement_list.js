
// input box �� Edit Mode �� ��ȯ
// onClick
function setEditMode( objTd ) {
	
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
	
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
	
	// Ȯ�������ϼ�, ���ϴ���1 ����, ���ϴ���1 ���� �Է�â�� ���, ���� üũ
	if( objBox.name == "time_fence" || objBox.name == "bckt1_horzn" || objBox.name == "bckt2_horzn" ) {
		if( strVal != "" && strVal != null ) {
			// ���� üũ, BLANK_INT : DEFAULT ����, �Ҽ��� �Ұ�
			if( checkNum(objBox, "BLANK_INT") == false ) {
				setEditMode( objTd );
				return;
			}
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
	
}

// row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRow( objBtn ) {
	
	if( objBtn.tagName == "TD"  ) {
		var insertRowIndex = 0;
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	else {
		var insertRowIndex = objBtn.parentNode.parentNode.rowIndex;
		insertRowIndex = insertRowIndex + 1;
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	
	oRowMain.onmouseover = function() { bgOver2(this); }; 
	oRowMain.onmouseout  = function() { bgOut2(this); }; 
	oRowMain.height = 22;
	
	var oCell0 = oRowMain.insertCell(); // ��ȣ
	var oCell1 = oRowMain.insertCell(); // �߰�/����
	var oCell2 = oRowMain.insertCell(); // ��ȹ�ֱ�
	var oCell3 = oRowMain.insertCell(); // ��ȹ�ι�
	var oCell4 = oRowMain.insertCell(); // Ȯ�������ϼ�
	var oCell5 = oRowMain.insertCell(); // ���ϴ���1
	var oCell6 = oRowMain.insertCell(); // ���ϴ���1 ����
	var oCell7 = oRowMain.insertCell(); // ���ϴ���2
	var oCell8 = oRowMain.insertCell(); // ���ϴ���2 ����
	var oCell9 = oRowMain.insertCell(); // �Ѹ�����
	
	oCell2.onclick = function() { setEditMode(this); }; // ��ȹ�ֱ�
	oCell3.onclick = function() { setEditMode(this); }; // ��ȹ�ι�
	oCell4.onclick = function() { setEditMode(this); }; // Ȯ�������ϼ�
	oCell5.onclick = function() { setEditMode(this); }; // ���ϴ���1
	oCell6.onclick = function() { setEditMode(this); }; // ���ϴ���1 ����
	oCell7.onclick = function() { setEditMode(this); }; // ���ϴ���2
	oCell8.onclick = function() { setEditMode(this); }; // ���ϴ���2 ����
	oCell9.onclick = function() { setEditMode(this); }; // �Ѹ�����
	
	oCell0.align = "center"; oCell0.width = "5%" ; // ��ȣ
	oCell1.align = "center"; oCell1.width = "6%" ; // �߰�/����
	oCell2.align = "center"; oCell2.width = "8%" ; // ��ȹ�ֱ�
	oCell3.align = "center"; oCell3.width = "19%"; // ��ȹ�ι�
	oCell4.align = "center"; oCell4.width = "8%" ; // Ȯ�������ϼ�
	oCell5.align = "center"; oCell5.width = "12%"; // ���ϴ���1
	oCell6.align = "center"; oCell6.width = "9%" ; // ���ϴ���1 ����
	oCell7.align = "center"; oCell7.width = "12%"; // ���ϴ���2
	oCell8.align = "center"; oCell8.width = "9%" ; // ���ϴ���2 ����
	oCell9.align = "center"; oCell9.width = "12%"; oCell9.className = "right"; // �Ѹ�����
	
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
	// ��ȹ�ֱ�
	oCell2.innerHTML = "<a id=\"divPeriodType\"></a>" + selStrPeriodType;
	// ��ȹ�ι�
	oCell3.innerHTML = "<a id=\"selStrCatId\"></a>" + selStrCatId;
	// Ȯ�������ϼ�
	oCell4.innerHTML = "<a id=\"divTimeFence\"></a><input type=\"text\" name=\"time_fence\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// ���ϴ���1
	oCell5.innerHTML = "<a id=\"divBckt1Uom\"></a><select name=\"bckt1_uom\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">" + selStrBcktUom;
	// ���ϴ���1 ����
	oCell6.innerHTML = "<a id=\"divBckt1Horzn\"></a><input type=\"text\" name=\"bckt1_horzn\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// ���ϴ���2
	oCell7.innerHTML = "<a id=\"divBckt2Uom\"></a><select name=\"bckt2_uom\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">" + selStrBcktUom;
	// ���ϴ���2 ����
	oCell8.innerHTML = "<a id=\"divBckt2Horzn\"></a><input type=\"text\" name=\"bckt2_horzn\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// ���ϴ���1
	oCell9.innerHTML = "<a id=\"divRollingUom\"></a><select name=\"rolling_uom\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">" + selStrBcktUom;
	
	document.recalc();
	setRowNo();
	
}

// ��ȣ setting
function setRowNo() {
	
	var tableLen = main_tbody.rows.length;
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
	
	main_tbody.deleteRow(rowIdx);
	
}

// ���� ������ �ϸ� ��ư�� ��Ÿ���� �� �ȸԴ´�. ����, �� �ϴ� ������ ������ ������Ѵ�.
// �̷��� �ϸ� ��ư�� ��Ÿ���� �� �Դ´�.
// �� �ϴ� ���� ������ ��� & ���� & ���� & ä��
function rowFormed() {
	
	memLastRow();
	var tableLen = main_tbody.rows.length;
	delRowDo( tableLen - 1 );
	
	tableLen = main_tbody.rows.length;
	//if( document.frm.btnAddRow[0] ) {
	if( tableLen > 1 ) {
		var objBtn = document.frm.btnAddRow[tableLen-1];
	}
	else if( tableLen == 1 ) {
		if( document.frm.btnAddRow[0] ){
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

var arrData = new Array(8);
// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = main_tbody.rows.length;
	if( document.frm.bckt1_horzn[tableLen-1] ) {
		arrData[0] 	= document.frm.period_type[tableLen-1].value; // ��ȹ�ֱ�
		arrData[1] 	= document.frm.cat_id[tableLen-1].value; 	  // ��ȹ�ι�
		arrData[2] 	= document.frm.time_fence[tableLen-1].value;  // Ȯ�������ϼ�
		arrData[3] 	= document.frm.bckt1_uom[tableLen-1].value;   // ���ϴ���1
		arrData[4] 	= document.frm.bckt1_horzn[tableLen-1].value; // ���ϴ���1 ����
		arrData[5] 	= document.frm.bckt2_uom[tableLen-1].value;   // ���ϴ���2
		arrData[6] 	= document.frm.bckt2_horzn[tableLen-1].value; // ���ϴ���2 ����
		arrData[7] 	= document.frm.rolling_uom[tableLen-1].value; // �Ѹ�����
	}
	else {
		arrData[0] 	= document.frm.period_type.value; // ��ȹ�ֱ�
		arrData[1] 	= document.frm.cat_id.value; 	  // ��ȹ�ι�
		arrData[2] 	= document.frm.time_fence.value;  // Ȯ�������ϼ�
		arrData[3] 	= document.frm.bckt1_uom.value;   // ���ϴ���1
		arrData[4] 	= document.frm.bckt1_horzn.value; // ���ϴ���1 ����
		arrData[5] 	= document.frm.bckt2_uom.value;   // ���ϴ���2
		arrData[6] 	= document.frm.bckt2_horzn.value; // ���ϴ���2 ����
		arrData[7] 	= document.frm.rolling_uom.value; // �Ѹ�����
	}
	
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = main_tbody.rows.length;
	if( document.frm.bckt1_horzn[tableLen-1] ) {
		document.frm.period_type[tableLen-1].value 	= arrData[0]; // ��ȹ�ֱ�
		document.frm.cat_id[tableLen-1].value 		= arrData[1]; // ��ȹ�ι�
		document.frm.time_fence[tableLen-1].value 	= arrData[2]; // Ȯ�������ϼ�
		document.frm.bckt1_uom[tableLen-1].value 	= arrData[3]; // ���ϴ���1
		document.frm.bckt1_horzn[tableLen-1].value 	= arrData[4]; // ���ϴ���1 ����
		document.frm.bckt2_uom[tableLen-1].value 	= arrData[5]; // ���ϴ���1
		document.frm.bckt2_horzn[tableLen-1].value 	= arrData[6]; // ���ϴ���1 ����
		document.frm.rolling_uom[tableLen-1].value 	= arrData[7]; // �Ѹ�����
		
		setViewMode(document.frm.period_type[tableLen-1]); 	// ��ȹ�ֱ�
		setViewMode(document.frm.cat_id[tableLen-1]); 		// ��ȹ�ι�
		divTimeFence[tableLen-1].innerHTML 	= arrData[2]; 	// Ȯ�������ϼ�
		divBckt1Uom[tableLen-1].innerHTML 	= arrData[3]; 	// ���ϴ���1
		divBckt1Horzn[tableLen-1].innerHTML = arrData[4]; 	// ���ϴ���1 ����
		divBckt2Uom[tableLen-1].innerHTML 	= arrData[5]; 	// ���ϴ���2
		divBckt2Horzn[tableLen-1].innerHTML = arrData[6]; 	// ���ϴ���2 ����
		divRollingUom[tableLen-1].innerHTML = arrData[7]; 	// �Ѹ�����
	}
	else {
		document.frm.period_type.value 	= arrData[0]; // ��ȹ�ֱ�
		document.frm.cat_id.value 		= arrData[1]; // ��ȹ�ι�
		document.frm.time_fence.value 	= arrData[2]; // Ȯ�������ϼ�
		document.frm.bckt1_uom.value 	= arrData[3]; // ���ϴ���1
		document.frm.bckt1_horzn.value 	= arrData[4]; // ���ϴ���1 ����
		document.frm.bckt2_uom.value 	= arrData[5]; // ���ϴ���1
		document.frm.bckt2_horzn.value 	= arrData[6]; // ���ϴ���1 ����
		document.frm.rolling_uom.value 	= arrData[7]; // �Ѹ�����
		
		setViewMode(document.frm.period_type); 	// ��ȹ�ֱ�
		setViewMode(document.frm.cat_id); 		// ��ȹ�ι�
		divTimeFence.innerHTML 	= arrData[2]; 	// Ȯ�������ϼ�
		divBckt1Uom.innerHTML 	= arrData[3]; 	// ���ϴ���1
		divBckt1Horzn.innerHTML = arrData[4]; 	// ���ϴ���1 ����
		divBckt2Uom.innerHTML 	= arrData[5]; 	// ���ϴ���2
		divBckt2Horzn.innerHTML = arrData[6]; 	// ���ϴ���2 ����
		divRollingUom.innerHTML = arrData[7]; 	// �Ѹ�����
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
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// ��ȹ�ֱ� --> ��ȹ�ι�
		if( objName == "period_type" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// ��ȹ�ι� --> Ȯ�������ϼ�
		else if( objName == "cat_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// Ȯ�������ϼ� --> ���ϴ���1
		else if( objName == "time_fence" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// ���ϴ���1 --> ���ϴ���1 ����
		else if( objName == "bckt1_uom" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// ���ϴ���1 ���� --> ���ϴ���2
		else if( objName == "bckt1_horzn" ) {
			objTdG = main_tbody.rows[rowIdx].cells[7];
		}
		// ���ϴ���2 --> ���ϴ���2 ����
		else if( objName == "bckt2_uom" ) {
			objTdG = main_tbody.rows[rowIdx].cells[8];
		}
		// ���ϴ���2 ���� --> �Ѹ�����
		else if( objName == "bckt2_horzn" ) {
			objTdG = main_tbody.rows[rowIdx].cells[9];
		}
		// �Ѹ����� --> ������ ��ȹ�ֱ�
		else if( objName == "rolling_uom" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				objTdG = main_tbody.rows[0].cells[2];
			}
			// �������� ù��° input box �� �̵�
			else {
				objTdG = main_tbody.rows[rowIdx+1].cells[2];
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
	
	var tableLen = main_tbody.rows.length;
	
	for( var i=0 ; i < tableLen ; i++ ) {
		// ���̺� ���� ������ ����
		if( document.frm.bckt1_horzn[i] ) {
			// ��ȹ�ֱ⸦ �Է��� ��츸 üũ : ��ȹ�ֱ⸦ �Է����� ������, INSERT ���� �������� ����
			if( document.frm.period_type[i].value != "" && document.frm.period_type[i].value != null ) {
				// ��ȹ�ι��� �Է����� ���� ���
				if( document.frm.cat_id[i].value == "" || document.frm.cat_id[i].value == null ) {
					alert("��ȹ�ι��� �Է��ؾ� �մϴ�.");
					return;
				}
			}
		}
		// ���̺� �� ���θ� ����
		else {
			// ��ȹ�ֱ⸦ �Է��� ��츸 üũ : ��ȹ�ֱ⸦ �Է����� ������, INSERT ���� �������� ����
			if( document.frm.period_type.value != "" && document.frm.period_type.value != null ) {
				// ��ȹ�ι��� �Է����� ���� ���
				if( document.frm.cat_id.value == "" || document.frm.cat_id.value == null ) {
					alert("��ȹ�ι��� �Է��ؾ� �մϴ�.");
					return;
				}
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
