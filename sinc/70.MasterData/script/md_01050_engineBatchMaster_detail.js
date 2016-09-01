
// ����ȭ������ �̵�
function moveBack() {
	
	var period_type_pre = document.frm.period_type_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_01050_engineBatchMaster_list";
	urlStr += "&period_type_sel=" + period_type_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
}

// ��ȹ�ι� ���ÿ� ���� CAT_ID, SUB_CAT ����
function setCatSub( objBox ) {
	
	document.frm.cat_id.value  = objBox.value.split("!%!")[0];
	document.frm.sub_cat.value = objBox.value.split("!%!")[1];
	
}

// input box �� Edit Mode �� ��ȯ
// onClick
function setEditMode( objTd ) {
	
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	// ����ð� ���ΰ��
	if( objTd.childNodes(1).tagName.toUpperCase() == "A" ) {
		if( runTimeComboFlag == "run_time_h" ) {
			objTd.childNodes(1).childNodes(0).focus();
		}
		else if( runTimeComboFlag == "run_time_m" ) {
			objTd.childNodes(1).childNodes(1).focus();
		}
		else {
			objTd.childNodes(1).childNodes(0).focus();
		}
		runTimeComboFlag = null;
	}
	else {
		objTd.childNodes(1).focus();
	}
	
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
	
	// ���� �Է�â�� ���, ���� üũ
	if( objBox.name == "seq" ) {
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
	var oCell2 = oRowMain.insertCell(); // JOB Ÿ��
	var oCell3 = oRowMain.insertCell(); // ����
	var oCell4 = oRowMain.insertCell(); // SP ID
	var oCell5 = oRowMain.insertCell(); // ����
	var oCell6 = oRowMain.insertCell(); // ���࿩��
	
	oCell2.onclick = function() { setEditMode(this); }; // JOB Ÿ��
	oCell3.onclick = function() { setEditMode(this); }; // ����
	oCell4.onclick = function() { setEditMode(this); }; // SP ID
	oCell5.onclick = function() { setEditMode(this); }; // ����
	oCell6.onclick = function() { setEditMode(this); }; // ���࿩��
	
	oCell0.align = "center"; oCell0.width = "5%" ; // ��ȣ
	oCell1.align = "center"; oCell1.width = "6%" ; // �߰�/����
	oCell2.align = "center"; oCell2.width = "13%"; // JOB Ÿ��
	oCell3.align = "center"; oCell3.width = "8%" ; // ����
	oCell4.align = "left";   oCell4.width = "30%"; // SP ID
	oCell5.align = "left";   oCell5.width = "30%"; // ����
	oCell6.align = "center"; oCell6.width = "8%" ; oCell6.className = "right"; // ���࿩��
	
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
	// JOB Ÿ��
	oCell2.innerHTML = "<a id=\"divJobType\"></a>" + selStrJobType;
	// ����
	oCell3.innerHTML = "<a id=\"divSeq\"></a><input type=\"text\" name=\"seq\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// SP ID
	oCell4.innerHTML = "<a id=\"divSpId\"></a><input type=\"text\" name=\"sp_id\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:left; padding-left:5px; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// ����
	oCell5.innerHTML = "<a id=\"divDescr\"></a><input type=\"text\" name=\"descr\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:left; padding-left:5px; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// ���࿩��
	oCell6.innerHTML = "<a id=\"divExecFlag\"></a><select name=\"exec_flag\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">"
						+ "<option value=\"Y\">YES</option><option value=\"N\">NO</option>"
						+ "</select>";
	
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

var arrData = new Array(5);
// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = main_tbody.rows.length;
	if( document.frm.sp_id[tableLen-1] ) {
		arrData[0] 	= document.frm.job_type[tableLen-1].value; 	// JOB_TYPE
		arrData[1] 	= document.frm.seq[tableLen-1].value; 		// ����
		arrData[2] 	= document.frm.sp_id[tableLen-1].value; 	// SP ID
		arrData[3] 	= document.frm.descr[tableLen-1].value; 	// ����
		arrData[4] 	= document.frm.exec_flag[tableLen-1].value; // ���࿩��
	}
	else {
		arrData[0] 	= document.frm.job_type.value; 	// JOB_TYPE
		arrData[1] 	= document.frm.seq.value; 		// ����
		arrData[2] 	= document.frm.sp_id.value; 	// SP ID
		arrData[3] 	= document.frm.descr.value; 	// ����
		arrData[4] 	= document.frm.exec_flag.value; // ���࿩��
	}
	
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = main_tbody.rows.length;
	if( document.frm.sp_id[tableLen-1] ) {
		document.frm.job_type[tableLen-1].value 	= arrData[0]; // JOB_TYPE
		document.frm.seq[tableLen-1].value 			= arrData[1]; // ����
		document.frm.sp_id[tableLen-1].value 		= arrData[2]; // SP ID
		document.frm.descr[tableLen-1].value 		= arrData[3]; // ����
		document.frm.exec_flag[tableLen-1].value 	= arrData[4]; // ���࿩��
		
		divJobType[tableLen-1].innerHTML 	= arrData[0]; 			 // JOB_TYPE
		divSeq[tableLen-1].innerHTML 		= arrData[1]; 			 // ����
		divSpId[tableLen-1].innerHTML 		= "&nbsp;" + arrData[2]; // SP ID
		divDescr[tableLen-1].innerHTML 		= "&nbsp;" + arrData[3]; // ����
		setViewMode(document.frm.exec_flag[tableLen-1]); 			 // ���࿩��
	}
	else {
		document.frm.job_type.value 	= arrData[0]; // JOB_TYPE
		document.frm.seq.value 			= arrData[1]; // ����
		document.frm.sp_id.value 		= arrData[2]; // SP ID
		document.frm.descr.value 		= arrData[3]; // ����
		document.frm.exec_flag.value 	= arrData[4]; // ���࿩��
		
		divJobType.innerHTML 	= arrData[0]; 			 // JOB_TYPE
		divSeq.innerHTML 		= arrData[1]; 			 // ����
		divSpId.innerHTML 		= "&nbsp;" + arrData[2]; // SP ID
		divDescr.innerHTML 		= "&nbsp;" + arrData[3]; // ����
		setViewMode(document.frm.exec_flag); 			 // ���࿩��
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
		// JOB TYPE --> ����
		if( objName == "job_type" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// ���� --> SP ID
		else if( objName == "seq" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// SP ID --> ����
		else if( objName == "sp_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// ���� --> ���࿩��
		else if( objName == "descr" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// ���࿩�� --> ������ JOB TYPE
		else if( objName == "exec_flag" ) {
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
		if( document.frm.sp_id[i] ) {
			if( document.frm.job_type[i].value != "" && document.frm.job_type[i].value != null ) {
				// ������ �Է����� ���� ���
				if( document.frm.seq[i].value == "" || document.frm.seq[i].value == null ) {
					alert("������ �Է��ؾ� �մϴ�.");
					return;
				}
				// SP ID �� �Է����� ���� ���
				if( document.frm.sp_id[i].value == "" || document.frm.sp_id[i].value == null ) {
					alert("SP ID �� �Է��ؾ� �մϴ�.");
					return;
				}
			}
		}
		else {
			if( document.frm.job_type.value != "" && document.frm.job_type.value != null ) {
				// ������ �Է����� ���� ���
				if( document.frm.seq.value == "" || document.frm.seq.value == null ) {
					alert("������ �Է��ؾ� �մϴ�.");
					return;
				}
				// SP ID �� �Է����� ���� ���
				if( document.frm.sp_id.value == "" || document.frm.sp_id.value == null ) {
					alert("SP ID �� �Է��ؾ� �մϴ�.");
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
