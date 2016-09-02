////////////////////////////////////////////////////////////
// ���α׷�ID : md_04010_dcMaster_list.js
// ���α׷��� : DC ��������
// ������  : �̵���
// �������� : 2008-11-25 ȭ����
//
//���� job file : job_sinc_70_masterData_00.xml
//
//���� query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-11-25  �̵���     md_04010_dcMaster_list.js ����
//
//
////////////////////////////////////////////////////////////

//�������� ����
var objTdG;


// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {	
	
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}	

	objTd.childNodes(0).style.display = "none";	
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
		
}


// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {	
	
	var strVal = objBox.value;
	var objName = objBox.name;
	
	if ( objName != "cdc_flag" &&  objName != "rdc_flag" &&  objName != "sl_cat" && 
		 objName != "cdc1"     &&  objName != "cdc2"     &&  objName != "cdc3") {
		if( strVal != "" && strVal != null ) {
			// ���� üũ
			if( checkNum(objBox, "BLANK") == false ) {
				//objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
				//setEditMode( objTd );
				return;
			}
			// ������ �´� ��� õ���� ������ ǥ��
			else {
				strVal = objBox.value;
				objBox.value = numberFormat( strVal );
				strVal = objBox.value;
			}
		}
	}
	
	
	
	// select box �� ���, value �� �ƴ϶� TEXT �� ǥ���� ��� ��
	if( objBox.tagName.toUpperCase() == "SELECT" ) {
		if( objBox.value == "" || objBox.value == null ) {
			strVal = objBox.value;
		}
		else {
			strVal = objBox.options[objBox.selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	else {
		strVal = objBox.value;
		var objTd = objBox.parentNode;
	}
	
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";	

	
	// input box �� View Mode �� ��ȯ
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";

	
/*
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
*/
	
}


// �߰����1,2,3 �� ���� �ߺ��Ǵ°��� �����ϱ����� �Լ�
function alt(sBox) {
	
	var tableLen = main_tbody.rows.length;
	var c = sBox.value;
	var cName = sBox.name;	
	var rowIdx = sBox.parentNode.parentNode.rowIndex;
	
	if (tableLen == 1) { // ���� �������� �Ѱ��� row�� ������ ����
		
		var cd1 = document.frm.cdc1.value;	
		var cd2 = document.frm.cdc2.value;
		var cd3 = document.frm.cdc3.value;
				
		//alert(c+cName);
		//alert(cd1+"-"+cd2+"-"+cd3);
				
		if (c && cName == "cdc1" ) {
			if (c == cd2 || c == cd3){
				alert("�߰���� ���� �ߺ��Դϴ�.");	
				document.frm.cdc1.value = "";
				return;
			}
		}
		if (c && cName == "cdc2" ) {
			if (c == cd1 || c == cd3){
				alert("�߰���� ���� �ߺ��Դϴ�.");	
				document.frm.cdc2.value = "";
				return;
			}
		}
		if (c && cName == "cdc3" ) {
			if (c == cd1 || c == cd2){
				alert("�߰���� ���� �ߺ��Դϴ�.");	
				document.frm.cdc3.value = "";
				return;
			}
		}		
	}
	
	else { // ������ ��ü�̰� row�� all�϶� ����
			
			var cd1 = document.frm.cdc1[rowIdx].value;	
			var cd2 = document.frm.cdc2[rowIdx].value;
			var cd3 = document.frm.cdc3[rowIdx].value;
						
			//alert(c+cName);
			//alert(cd1+"-"+cd2+"-"+cd3);	
					
			if (c && cName == "cdc1" ) {
				if (c == cd2 || c == cd3){
					alert("�߰���� ���� �ߺ��Դϴ�.");	
					document.frm.cdc1[rowIdx].value = "";
					return;
				}
			}
			if (c && cName == "cdc2" ) {
				if (c == cd1 || c == cd3){
					alert("�߰���� ���� �ߺ��Դϴ�.");	
					document.frm.cdc2[rowIdx].value = "";
					return;
				}
			}
			if (c && cName == "cdc3" ) {
				if (c == cd1 || c == cd2){
					alert("�߰���� ���� �ߺ��Դϴ�.");	
					document.frm.cdc3[rowIdx].value = "";
					return;
				}
			}			

	}//else

	
}



// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ){ 
		// cdc_flag --> rdc_flag		
		if( objName == "cdc_flag" ) {			
				objTdG = left_tbody.rows[rowIdx].cells[5];
		}
		// rdc_flag --> sl_cat		
		else if( objName == "rdc_flag" ) {			
				objTdG = main_tbody.rows[rowIdx].cells[0];
		}
		// sl_cat --> cdc1		
		else if( objName == "sl_cat" ) {			
				objTdG = main_tbody.rows[rowIdx].cells[1];
		}		
		// cdc1 --> cdc2
		else if( objName == "cdc1" ) {		
				objTdG = main_tbody.rows[rowIdx].cells[2];
		}
		// cdc2 --> cdc3
		else if( objName == "cdc2" ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
		}
		// cdc3 --> capa1
		else if( objName == "cdc3" ) {			
				objTdG = main_tbody.rows[rowIdx].cells[4];	
		}
		// capa1 --> capa2
		else if( objName == "capa1" ) {
				objTdG = main_tbody.rows[rowIdx].cells[5];			
		}
		// capa2 --> capa3
		else if( objName == "capa2" ) {
				objTdG = main_tbody.rows[rowIdx].cells[6];			
		}
		// capa3 --> ������ �ڵ�
		else if( objName == "capa3" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
					objTdG = left_tbody.rows[0].cells[4];
			}
			// �������� ù��° input box �� �̵�
			else {
				if( left_tbody.rows[rowIdx] ) {
					objTdG = left_tbody.rows[rowIdx+1].cells[4];
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




 
