//�������� ����
var objTdG;



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



// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ){ 
		// s_status --> r_cycle	
			
		if( objName == "s_status" ) {	
					
				objTdG = main_tbody.rows[rowIdx].cells[1];
				//alert(rowIdx);
		}
		// r_cycle --> ����ð�		
		else if( objName == "r_cycle" ) {			
				objTdG = main_tbody.rows[rowIdx].cells[2];
		}
	
		// ����ð�(�ð�) --> ����ð�(��)
		else if( objName == "run_time_h" ) {
			runTimeComboFlag = "run_time_m";
			objTdG = main_tbody.rows[rowIdx].cells[2];
			setTimeout(setEditModeTime, 1);
			if( event.keyCode == "13"||event.keyCode == "9" ) {
				
					document.frm.run_time_m[rowIdx].focus();
				
				
			}
			return;
		}
				
		// ����ð�(��) --> ������ �ڵ�
		else if( objName == "run_time_m" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
					objTdG = main_tbody.rows[0].cells[0];
			}
			// �������� ù��° input box �� �̵�
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[0];
				}
			}
		}
		// �� ���� box ���� ���� ����
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);		 
	}	
}

// setTimeout �� ����Ǵ� �Լ�
function setEditModeTime() {
	
	setEditMode( objTdG );
		
}





/*���� input box �� ���� check 
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
*/

/* row �߰�
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
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22; 
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����
	var oCell2 = oRowLeft.insertCell(); // ����â����
	var oCell3 = oRowLeft.insertCell(); // CDC1
	var oCell4 = oRowMain.insertCell(); // CDC2
	var oCell5 = oRowMain.insertCell(); // CDC3
	var oCell6 = oRowMain.insertCell(); // CAPA1
	var oCell7 = oRowMain.insertCell(); // CAPA2
	var oCell8 = oRowMain.insertCell(); // CAPA3
	
	oCell2.onclick = function() { setEditMode(this); }; // ����â����
	oCell3.onclick = function() { setEditMode(this); }; // CDC1
	oCell4.onclick = function() { setEditMode(this); }; // CDC2
	oCell5.onclick = function() { setEditMode(this); }; // CDC3
	oCell6.onclick = function() { setEditMode(this); }; // CAPA1
	oCell7.onclick = function() { setEditMode(this); }; // CAPA2
	oCell8.onclick = function() { setEditMode(this); }; // CAPA3
	
	oCell0.align = "center"; oCell0.width = "30px"; // ��ȣ
	oCell1.align = "center"; oCell1.width = "30px"; // ����
	oCell2.align = "left"; oCell2.width = "140px";  // ����â����
	oCell3.align = "left"; oCell3.width = "200px";  // CDC1
	oCell4.align = "left"; oCell4.width = "300px";  // CDC2
	oCell5.align = "left"; oCell5.width = "100px";  // CDC3
	oCell6.align = "left"; oCell6.width = "100px";  // CAPA1
	oCell7.align = "left"; oCell7.width = "100px";  // CAPA2
	oCell8.align = "left"; oCell8.width = "100px"; oCell8.className = "right"; // CAPA3
	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>"; 
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// ����
	oCell1.innerHTML = "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:20px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// ����â����
	oCell2.innerHTML = "<a id=\"div_sl_cat\"></a><input type=\"text\" name=\"sl_cat\" class=\"normal\" size=\"20\" "
						+ "onChange=\"chkCodeStr(this); \" onBlur=\"chkDup_sl_cat(this); \" onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none; ime-mode:disabled; \" onFocusOut=\"setViewMode(this); \">"; 
	// CDC1
	oCell3.innerHTML = "<a id=\"div_cdc1\"></a><input type=\"text\" name=\"cdc1\" class=\"normal\" size=\"40\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">"; 
	// CDC2
	oCell4.innerHTML = "<a id=\"div_cdc2\"></a><input type=\"text\" name=\"cdc2\" class=\"normal\" size=\"100\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CDC3
	oCell5.innerHTML = "<a id=\"div_cdc3\"></a><input type=\"text\" name=\"cdc3\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAPA1
	oCell6.innerHTML = "<a id=\"div_capa1\"></a><input type=\"text\" name=\"capa1\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAPA2
	oCell7.innerHTML = "<a id=\"div_capa2\"></a><input type=\"text\" name=\"capa2\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAPA3
	oCell8.innerHTML = "<a id=\"div_capa3\"></a><input type=\"text\" name=\"capa3\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	
	
	document.recalc();
	setRowNo();	
}
*/


/*
// ��ȣ setting
function setRowNo() {
	
	var tableLen = left_tbody.rows.length;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
		}
		else {
			divRowNo.innerHTML = "1";
		}
	}
	
}
*/



/*
// num ����ŭ �� �߰�
function addRows( num ) {
	
	for( var i=0; i<num ; ++i ) {
		addRow();
	}
}
*/

/*row ���� 
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
*/


/*row ���� �Լ�
//���� row ���� �Լ�
// parameter : ������ rowIndex
function delRowDo( rowIdx ) { 
	
	left_tbody.deleteRow(rowIdx); 
	main_tbody.deleteRow(rowIdx);
	
}
*/


/*���� ������ �ϸ� ��ư�� ��Ÿ���� �� �ȸԴ´�. ����, �� �ϴ� ������ ������ ������Ѵ�.
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
// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.sl_cat[tableLen-1] ) {
		arrData[0] = document.frm.sl_cat[tableLen-1].value;
		arrData[1] = document.frm.cdc1[tableLen-1].value;
		arrData[2] = document.frm.cdc2[tableLen-1].value;
		arrData[3] = document.frm.cdc3[tableLen-1].value;
		arrData[4] = document.frm.capa1[tableLen-1].value;
		arrData[5] = document.frm.capa2[tableLen-1].value;
		arrData[6] = document.frm.capa3[tableLen-1].value;
	}
	else {
		arrData[0] = document.frm.sl_cat.value;
		arrData[1] = document.frm.cdc1.value;
		arrData[2] = document.frm.cdc2.value;
		arrData[3] = document.frm.cdc3.value;
		arrData[4] = document.frm.capa1.value;
		arrData[5] = document.frm.capa2.value;
		arrData[6] = document.frm.capa3.value;
	}
	
}
*/



/* �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.sl_cat[tableLen-1] ) {
		document.frm.sl_cat[tableLen-1].value = arrData[0];
		document.frm.cdc1[tableLen-1].value = arrData[1];
		document.frm.cdc2[tableLen-1].value = arrData[2];
		document.frm.cdc3[tableLen-1].value = arrData[3];
		document.frm.capa1[tableLen-1].value = arrData[4];
		document.frm.capa2[tableLen-1].value = arrData[5];
		document.frm.capa3[tableLen-1].value = arrData[6];
		div_sl_cat[tableLen-1].innerHTML = "&nbsp;" + arrData[0];
		div_cdc1[tableLen-1].innerHTML = "&nbsp;" + arrData[1];
		div_cdc2[tableLen-1].innerHTML = "&nbsp;" + arrData[2];
		div_cdc3[tableLen-1].innerHTML = "&nbsp;" + arrData[3];
		div_capa1[tableLen-1].innerHTML = "&nbsp;" + arrData[4];
		div_capa2[tableLen-1].innerHTML = "&nbsp;" + arrData[5];
		div_capa3[tableLen-1].innerHTML = "&nbsp;" + arrData[6];
	}
	else {
		document.frm.sl_cat.value = arrData[0];
		document.frm.cdc1.value = arrData[1];
		document.frm.cdc2.value = arrData[2];
		document.frm.cdc3.value = arrData[3];
		document.frm.capa1.value = arrData[4];
		document.frm.capa2.value = arrData[5];
		document.frm.capa3.value = arrData[6];
		div_sl_cat.innerHTML = "&nbsp;" + arrData[0];
		div_cdc1.innerHTML = "&nbsp;" + arrData[1];
		div_cdc2.innerHTML = "&nbsp;" + arrData[2];
		div_cdc3.innerHTML = "&nbsp;" + arrData[3];
		div_capa1.innerHTML = "&nbsp;" + arrData[4];
		div_capa2.innerHTML = "&nbsp;" + arrData[5];
		div_capa3.innerHTML = "&nbsp;" + arrData[6];
	}
	
}
*/

/*�ڵ� �ߺ� üũ
//�ڵ� �ߺ� üũ
function chkDup_sl_cat( obj ) {
	
	if( obj.value == null || obj.value == "" ) {
		return;
	}
	
	var tableLen = left_tbody.rows.length;
	var cntEq = 0; // �ߺ� counting
	for( var i=0 ; i < tableLen ; i++ ) {
		if( document.frm.sl_cat[i] ) {
			if( document.frm.sl_cat[i].value == obj.value ) {
				cntEq++;
			}
		}
	}
	if( cntEq > 1 ) {
		alert("�ߺ��� �ڵ� �Դϴ�.");
		objTdG = obj.parentNode;
		setTimeout(setEditModeTime, 1);
	}	
}
*/


// ����
function GoSave( service ) {
	
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}
//

/* ����
function GoDelete(service) {
	
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
	
	document.frm.dc_loc.value = "";
			
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}
*/




 
