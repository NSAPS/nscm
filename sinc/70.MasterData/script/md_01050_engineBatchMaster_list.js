
// ����ð�(�ð�) �Ǵ� ����ð�(��) ���� ����ð�(�ð�) �Ǵ� ����ð�(��)�� �����ϱ� ���� ����ð� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var runTimeNameFlag = null;
var runTimeIdxFlag = null;

// ����ð� FLAG ����
function setRunTimeFlag(objBox) {
	
	runTimeNameFlag = objBox.name;
	runTimeIdxFlag = objBox.parentNode.parentNode.parentNode.rowIndex;
	
}

// ����ð� FLAG ����
function unsetRunTimeFlag(objBox) {
	
	runTimeNameFlag = null;
	runTimeIdxFlag = null;
	
}

// focusing �� ����ð� combo ǥ�� FLAG
var runTimeComboFlag = null;

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
	
	// ����ð� ���� ���
	if( objBox.name == "run_time_h" ) {
		if( runTimeNameFlag == "run_time_m" && runTimeIdxFlag == objBox.parentNode.parentNode.parentNode.rowIndex ) {
			return;
		}
		else {
			var strVal = objBox.parentNode.childNodes(0).value + ":" + objBox.parentNode.childNodes(1).value;
			var objTd = objBox.parentNode.parentNode;
		}
	}
	else if( objBox.name == "run_time_m" ) {
		if( runTimeNameFlag == "run_time_h" && runTimeIdxFlag == objBox.parentNode.parentNode.parentNode.rowIndex ) {
			return;
		}
		else {
			var strVal = objBox.parentNode.childNodes(0).value + ":" + objBox.parentNode.childNodes(1).value;
			var objTd = objBox.parentNode.parentNode;
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
	
	// ����, ��ȹ���� ����, ��ȹ���� ����, ������ ���� �Է�â�� ���, ���� üũ
	if( objBox.name == "seq" || objBox.name == "horst_idx" || objBox.name == "horen_idx" || objBox.name == "plnst_idx" ) {
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

// ���弱�ÿ� ���� SUB_CAT ����
function setSubCat( objBox ) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.sub_cat[rowIdx] ) {
		var objCatId = document.frm.cat_id[rowIdx];
		var objSubCat = document.frm.sub_cat[rowIdx];
		var objPlantId = document.frm.plant_id[rowIdx];
	}
	else {
		var objCatId = document.frm.cat_id;
		var objSubCat = document.frm.sub_cat;
		var objPlantId = document.frm.plant_id;
	}
	
	if( objBox.value == "" || objBox.value == null ) {
		objSubCat.value = objCatId.value;
		objPlantId.value = "";
	}
	else {
		objSubCat.value = objBox.value.split("!%!")[0];
		objPlantId.value = objBox.value.split("!%!")[1];
	}
	
}

// row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRow( objBtn ) {
	
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
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22;
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // �߰�/����
	var oCell2 = oRowLeft.insertCell(); // ��ȹ�ֱ�
	var oCell3 = oRowLeft.insertCell(); // ��ȹ�ι�
	var oCell4 = oRowLeft.insertCell(); // ����
	
	var oCell5 = oRowMain.insertCell(); // ����
	var oCell6 = oRowMain.insertCell(); // �ڵ����� ����
	var oCell7 = oRowMain.insertCell(); // �����ֱ�
	var oCell8 = oRowMain.insertCell(); // ����ð�
	var oCell9 = oRowMain.insertCell(); // ���� IP
	var oCell10 = oRowMain.insertCell(); // ���� ����
	var oCell11 = oRowMain.insertCell(); // ��ȹ���� ����
	var oCell12 = oRowMain.insertCell(); // ��ȹ���� ����
	var oCell13 = oRowMain.insertCell(); // ������ ����
	
	oCell2.onclick = function() { setEditMode(this); }; // ��ȹ�ֱ�
	oCell3.onclick = function() { setEditMode(this); }; // ��ȹ�ι�
	oCell3.ondblclick = function() { moveDetail(this); }; // ��ȹ�ι� ����Ŭ������ ��ȭ�� �̵� �Լ� ����
	oCell4.onclick = function() { setEditMode(this); }; // ����
	
	oCell5.onclick  = function() { setEditMode(this); }; // ����
	oCell6.onclick  = function() { setEditMode(this); }; // �ڵ����� ����
	oCell7.onclick  = function() { setEditMode(this); }; // �����ֱ�
	oCell8.onclick  = function() { setEditMode(this); }; // ����ð�
	oCell9.onclick  = function() { setEditMode(this); }; // ���� IP
	oCell10.onclick = function() { setEditMode(this); }; // ���� ����
	oCell11.onclick = function() { setEditMode(this); }; // ��ȹ���� ����
	oCell12.onclick = function() { setEditMode(this); }; // ��ȹ���� ����
	oCell13.onclick = function() { setEditMode(this); }; // ������ ����
	
	oCell0.align = "center"; oCell0.width = "30px";  // ��ȣ
	oCell1.align = "center"; oCell1.width = "40px";  // �߰�/����
	oCell2.align = "center"; oCell2.width = "60px";  // ��ȹ�ֱ�
	oCell3.align = "center"; oCell3.width = "130px"; // ��ȹ�ι�
	oCell4.align = "center"; oCell4.width = "110px"; // ����
	
	oCell5.align  = "center"; oCell5.width  = "40px";  // ����
	oCell6.align  = "center"; oCell6.width  = "60px";  // �ڵ����� ����
	oCell7.align  = "center"; oCell7.width  = "60px";  // �����ֱ�
	oCell8.align  = "center"; oCell8.width  = "80px";  // ����ð�
	oCell9.align  = "left";   oCell9.width  = "130px"; // ���� IP
	oCell10.align = "left";   oCell10.width = "130px"; // ���� ����
	oCell11.align = "center"; oCell11.width = "60px";  // ��ȹ���� ����
	oCell12.align = "center"; oCell12.width = "60px";  // ��ȹ���� ����
	oCell13.align = "center"; oCell13.width = "60px"; oCell13.className = "right"; // ������ ����
	
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
	oCell3.innerHTML = "<a id=\"divCatId\"></a>" + selStrCatId;
	// ����
	oCell4.innerHTML = "<a id=\"divPlantId\"></a>" + selStrPlantId
						+ " <input type=\"hidden\" name=\"sub_cat\" > <input type=\"hidden\" name=\"plant_id\" >";
	// ����
	oCell5.innerHTML = "<a id=\"divSeq\"></a><input type=\"text\" name=\"seq\" class=\"normal\" onFocusOut=\"setViewMode(this); \" "
						+ "onKeyDown=\"moveNextBox(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// �ڵ����� ����
	oCell6.innerHTML = "<a id=\"divAutoFlag\"></a><select name=\"auto_flag\" style=\"width:100%; display:none; \" "
						+ "onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this); \">"
						+ "<option value=\"Y\">YES</option><option value=\"N\">NO</option>"
						+ "</select>";
	// �����ֱ�
	oCell7.innerHTML = "<a id=\"divRunCycle\"></a>" + selStrRunCycle;
	// ����ð�
	var selStrHour = "";
	for( var i=0 ; i < 24 ; i++ ){
		if( i < 10 ) {
			selStrHour += "<option value=\"0" + i.toString() + "\">0" + i.toString() + "</option>";
		}
		else {
			selStrHour += "<option value=\"" + i.toString() + "\">" + i.toString() + "</option>";
		}
	}
	var selStrMin = "";
	for( var i=0 ; i < 60 ; i++ ){
		if( i < 10 ) {
			selStrMin += "<option value=\"0" + i.toString() + "\">0" + i.toString() + "</option>";
		}
		else {
			selStrMin += "<option value=\"" + i.toString() + "\">" + i.toString() + "</option>";
		}
	}
	oCell8.innerHTML = "<a id=\"divRunTime\"></a><a id=\"divRunTimeSel\" style=\"display:none; \" >"
						+ "<select name=\"run_time_h\" style=\"width:49%; \" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" onMouseOver=\"setRunTimeFlag(this); \" onMouseOut=\"unsetRunTimeFlag(this); \" >" 
						+ selStrHour + "</select>"
						+ "<select name=\"run_time_m\" style=\"width:49%; \" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" onMouseOver=\"setRunTimeFlag(this); \" onMouseOut=\"unsetRunTimeFlag(this); \" >"
						+ selStrMin + "</select></a>";
	// ���� IP
	oCell9.innerHTML = "<a id=\"divEngnIp\"></a><input type=\"text\" name=\"engn_ip\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:left; padding-left:5px; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// ���� ����
	oCell10.innerHTML = "<a id=\"divPdbUser\"></a><input type=\"text\" name=\"pdb_user\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:left; padding-left:5px; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// ��ȹ���� ����
	oCell11.innerHTML = "<a id=\"divHorstIdx\"></a><input type=\"text\" name=\"horst_idx\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// ��ȹ���� ����
	oCell12.innerHTML = "<a id=\"divHorenIdx\"></a><input type=\"text\" name=\"horen_idx\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	// ������ ����
	oCell13.innerHTML = "<a id=\"divPlnstIdx\"></a><input type=\"text\" name=\"plnst_idx\" class=\"normal\" onKeyDown=\"moveNextBox(this); \" "
						+ "onFocusOut=\"setViewMode(this); \" style=\"width:100%; text-align:center; display:none; \" "
						+ "onDblClick=\"this.select(); \">";
	
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

var arrData = new Array(17); 
// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.sub_cat[tableLen-1] ) {
		arrData[0] 	= document.frm.period_type[tableLen-1].value; 	// ��ȹ�ֱ�
		arrData[1] 	= document.frm.cat_id[tableLen-1].value; 		// ��ȹ�ι�
		arrData[2] 	= document.frm.plant_id_sel[tableLen-1].value; 	// ���弱�� combo
		arrData[3] 	= document.frm.sub_cat[tableLen-1].value; 		// SUB_CAT
		arrData[4] 	= document.frm.plant_id[tableLen-1].value; 		// ����
		arrData[5] 	= document.frm.seq[tableLen-1].value; 			// ����
		arrData[6] 	= document.frm.auto_flag[tableLen-1].value; 	// �ڵ����� ����
		arrData[7] 	= document.frm.run_cycle[tableLen-1].value; 	// �����ֱ�
		arrData[8] 	= document.frm.run_time_h[tableLen-1].value; 	// ����ð�(�ð�)
		arrData[9] 	= document.frm.run_time_m[tableLen-1].value; 	// ����ð�(��)
		arrData[10] = document.frm.engn_ip[tableLen-1].value; 		// ���� IP
		arrData[11] = document.frm.pdb_user[tableLen-1].value; 		// ���� ����
		arrData[12] = document.frm.horst_idx[tableLen-1].value; 	// ��ȹ���� ����
		arrData[13] = document.frm.horen_idx[tableLen-1].value; 	// ��ȹ���� ����
		arrData[14] = document.frm.plnst_idx[tableLen-1].value; 	// ������ ����
	}
	else {
		arrData[0] 	= document.frm.period_type.value; 	// ��ȹ�ֱ�
		arrData[1] 	= document.frm.cat_id.value; 		// ��ȹ�ι�
		arrData[2] 	= document.frm.plant_id_sel.value; 	// ���弱�� combo
		arrData[3] 	= document.frm.sub_cat.value; 		// SUB_CAT
		arrData[4] 	= document.frm.plant_id.value; 		// ����
		arrData[5] 	= document.frm.seq.value; 			// ����
		arrData[6] 	= document.frm.auto_flag.value; 	// �ڵ����� ����
		arrData[7] 	= document.frm.run_cycle.value; 	// �����ֱ�
		arrData[8] 	= document.frm.run_time_h.value; 	// ����ð�(�ð�)
		arrData[9] 	= document.frm.run_time_m.value; 	// ����ð�(��)
		arrData[10] = document.frm.engn_ip.value; 		// ���� IP
		arrData[11] = document.frm.pdb_user.value; 		// ���� ����
		arrData[12] = document.frm.horst_idx.value; 	// ��ȹ���� ����
		arrData[13] = document.frm.horen_idx.value; 	// ��ȹ���� ����
		arrData[14] = document.frm.plnst_idx.value; 	// ������ ����
	}
	
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.sub_cat[tableLen-1] ) {
		document.frm.period_type[tableLen-1].value 	= arrData[0]; // ��ȹ�ֱ�
		document.frm.cat_id[tableLen-1].value 		= arrData[1]; // ��ȹ�ι�
		document.frm.plant_id_sel[tableLen-1].value = arrData[2]; // ���弱�� combo
		document.frm.sub_cat[tableLen-1].value 		= arrData[3]; // SUB_CAT
		document.frm.plant_id[tableLen-1].value 	= arrData[4]; // ����
		document.frm.seq[tableLen-1].value 			= arrData[5]; // ����
		document.frm.auto_flag[tableLen-1].value 	= arrData[6]; // �ڵ����� ����
		document.frm.run_cycle[tableLen-1].value 	= arrData[7]; // �����ֱ�
		document.frm.run_time_h[tableLen-1].value 	= arrData[8]; // ����ð�(�ð�)
		document.frm.run_time_m[tableLen-1].value 	= arrData[9]; // ����ð�(��)
		document.frm.engn_ip[tableLen-1].value 		= arrData[10]; // ���� IP
		document.frm.pdb_user[tableLen-1].value 	= arrData[11]; // ���� ����
		document.frm.horst_idx[tableLen-1].value 	= arrData[12]; // ��ȹ���� ����
		document.frm.horen_idx[tableLen-1].value 	= arrData[13]; // ��ȹ���� ����
		document.frm.plnst_idx[tableLen-1].value 	= arrData[14]; // ������ ����
		
		setViewMode(document.frm.period_type[tableLen-1]); 	// ��ȹ�ֱ�
		setViewMode(document.frm.cat_id[tableLen-1]); 		// ��ȹ�ι�
		setViewMode(document.frm.plant_id_sel[tableLen-1]); // ����
		divSeq[tableLen-1].innerHTML 		= arrData[5]; 	// ����
		setViewMode(document.frm.auto_flag[tableLen-1]); 	// �ڵ����� ����
		setViewMode(document.frm.run_cycle[tableLen-1]); 	// �����ֱ�
		divRunTime[tableLen-1].innerHTML 	= arrData[8] + ":" + arrData[9]; // ����ð�
		divEngnIp[tableLen-1].innerHTML 	= "&nbsp;" + arrData[10]; 		 // ���� IP
		divPdbUser[tableLen-1].innerHTML 	= "&nbsp;" + arrData[11]; 		 // ���� ����
		divHorstIdx[tableLen-1].innerHTML 	= arrData[12]; // ��ȹ���� ����
		divHorenIdx[tableLen-1].innerHTML 	= arrData[13]; // ��ȹ���� ����
		divPlnstIdx[tableLen-1].innerHTML 	= arrData[14]; // ������ ����
	}
	else {
		document.frm.period_type.value 	= arrData[0]; // ��ȹ�ֱ�
		document.frm.cat_id.value 		= arrData[1]; // ��ȹ�ι�
		document.frm.plant_id_sel.value = arrData[2]; // ���弱�� combo
		document.frm.sub_cat.value 		= arrData[3]; // SUB_CAT
		document.frm.plant_id.value 	= arrData[4]; // ����
		document.frm.seq.value 			= arrData[5]; // ����
		document.frm.auto_flag.value 	= arrData[6]; // �ڵ����� ����
		document.frm.run_cycle.value 	= arrData[7]; // �����ֱ�
		document.frm.run_time_h.value 	= arrData[8]; // ����ð�(�ð�)
		document.frm.run_time_m.value 	= arrData[9]; // ����ð�(��)
		document.frm.engn_ip.value 		= arrData[10]; // ���� IP
		document.frm.pdb_user.value 	= arrData[11]; // ���� ����
		document.frm.horst_idx.value 	= arrData[12]; // ��ȹ���� ����
		document.frm.horen_idx.value 	= arrData[13]; // ��ȹ���� ����
		document.frm.plnst_idx.value 	= arrData[14]; // ������ ����
		
		setViewMode(document.frm.period_type); 	// ��ȹ�ֱ�
		setViewMode(document.frm.cat_id); 		// ��ȹ�ι�
		setViewMode(document.frm.plant_id_sel); // ����
		divSeq.innerHTML 		= arrData[5]; 	// ����
		setViewMode(document.frm.auto_flag); 	// �ڵ����� ����
		setViewMode(document.frm.run_cycle); 	// �����ֱ�
		divRunTime.innerHTML 	= arrData[8] + ":" + arrData[9]; // ����ð�
		divEngnIp.innerHTML 	= "&nbsp;" + arrData[10]; 		 // ���� IP
		divPdbUser.innerHTML 	= "&nbsp;" + arrData[11]; 		 // ���� ����
		divHorstIdx.innerHTML 	= arrData[12]; // ��ȹ���� ����
		divHorenIdx.innerHTML 	= arrData[13]; // ��ȹ���� ����
		divPlnstIdx.innerHTML 	= arrData[14]; // ������ ����
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
	// ����ð� ���� ���
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// ��ȹ�ֱ� --> ��ȹ�ι�
		if( objName == "period_type" ) {
			objTdG = left_tbody.rows[rowIdx].cells[3];
		}
		// ��ȹ�ι� --> ����
		else if( objName == "cat_id" ) {
			objTdG = left_tbody.rows[rowIdx].cells[4];
		}
		// ���� --> ����
		else if( objName == "plant_id_sel" ) {
			objTdG = main_tbody.rows[rowIdx].cells[0];
		}
		// ���� --> �ڵ����࿩��
		else if( objName == "seq" ) {
			objTdG = main_tbody.rows[rowIdx].cells[1];
		}
		// �ڵ����࿩�� --> �����ֱ�
		else if( objName == "auto_flag" ) {
			objTdG = main_tbody.rows[rowIdx].cells[2];
		}
		// �����ֱ� --> ����ð�(�ð�)
		else if( objName == "run_cycle" ) {
			objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// ����ð�(�ð�) --> ����ð�(��)
		else if( objName == "run_time_h" ) {
			runTimeComboFlag = "run_time_m";
			objTdG = main_tbody.rows[rowIdx].cells[3];
			setTimeout(setEditModeTime, 1);
			if( event.keyCode == "13" ) {
				if( document.frm.sub_cat[rowIdx] ) {
					document.frm.run_time_m[rowIdx].focus();
				}
				else {
					document.frm.run_time_m.focus();
				}
			}
			return;
		}
		// ����ð�(��) --> ���� IP
		else if( objName == "run_time_m" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}
		// ���� IP --> ��������
		else if( objName == "engn_ip" ) {
			objTdG = main_tbody.rows[rowIdx].cells[5];
		}
		// �������� --> ��ȹ��������
		else if( objName == "pdb_user" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// ��ȹ�������� --> ��ȹ��������
		else if( objName == "horst_idx" ) {
			objTdG = main_tbody.rows[rowIdx].cells[7];
		}
		// ��ȹ�������� --> �����ٽ���
		else if( objName == "horen_idx" ) {
			objTdG = main_tbody.rows[rowIdx].cells[8];
		}
		// �����ٽ��� --> ������ ��ȹ�ֱ�
		else if( objName == "plnst_idx" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[2];
			}
			// �������� ù��° input box �� �̵�
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

// ���� ��ư Ŭ��
function GoSave(service) {
	
	var tableLen = left_tbody.rows.length;
	
	for( var i=0 ; i < tableLen ; i++ ) {
		if( document.frm.sub_cat[i] ) {
			if( document.frm.period_type[i].value != "" && document.frm.period_type[i].value != null ) {
				// ��ȹ�ι��� �������� ���� ���
				if( document.frm.cat_id[i].value == "" || document.frm.cat_id[i].value == null ) {
					alert("��ȹ�ι��� �����ؾ� �մϴ�.");
					return;
				}
				// ������ �������� ���� ���
				if( document.frm.plant_id_sel[i].value == "" || document.frm.plant_id_sel[i].value == null ) {
					// SUB_CAT ����
					setSubCat(document.frm.plant_id_sel[i]);
					// SUB_CAT �� �����ص� sub_cat value �� ���� ���
					if( document.frm.sub_cat[i].value == "" || document.frm.sub_cat[i].value == null ) {
						alert("������ �����ؾ� �մϴ�.");
						return;
					}
				}
			}
		}
		else {
			if( document.frm.period_type.value != "" && document.frm.period_type.value != null ) {
				// ��ȹ�ι��� �������� ���� ���
				if( document.frm.cat_id.value == "" || document.frm.cat_id.value == null ) {
					alert("��ȹ�ι��� �����ؾ� �մϴ�.");
					return;
				}
				// ������ �������� ���� ���
				if( document.frm.plant_id_sel.value == "" || document.frm.plant_id_sel.value == null ) {
					// SUB_CAT ����
					setSubCat(document.frm.plant_id_sel);
					// SUB_CAT �� �����ص� sub_cat value �� ���� ���
					if( document.frm.sub_cat.value == "" || document.frm.sub_cat.value == null ) {
						alert("������ �����ؾ� �մϴ�.");
						return;
					}
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

// �� ȭ�� �̵�
function moveDetail(objTd) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	
	if( document.frm.sub_cat[rowIdx] ) {
		setSubCat(document.frm.plant_id_sel[rowIdx]); // SUB_CAT ����
		var period_type = document.frm.period_type[rowIdx].value;
		var cat_id 		= document.frm.cat_id[rowIdx].value;
		var sub_cat 	= document.frm.sub_cat[rowIdx].value;
	}
	else {
		setSubCat(document.frm.plant_id_sel); // SUB_CAT ����
		var period_type = document.frm.period_type.value;
		var cat_id 		= document.frm.cat_id.value;
		var sub_cat 	= document.frm.sub_cat.value;
	}
	
	var period_type_pre = document.frm.period_type_pre.value;
	var perpage_pre 	= document.frm.perpage_pre.value;
	var pagenumber_pre 	= document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_01050_engineBatchMaster_detail";
	urlStr += "&period_type=" + period_type + "&cat_id=" + cat_id + "&sub_cat=" + sub_cat;
	urlStr += "&period_type_pre=" + period_type_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
	
}
