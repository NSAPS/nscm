
// ����ȭ������ �̵�
function moveBack() {
	
	var cd_grp_pre = document.frm.cd_grp_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_01030_codeMasterManagement_list";
	urlStr += "&cd_grp=" + cd_grp_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
}

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
		
}

// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
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
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22; 
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����
	var oCell2 = oRowLeft.insertCell(); // �ڵ�
	var oCell3 = oRowLeft.insertCell(); // �ڵ� ��
	var oCell4 = oRowMain.insertCell(); // ����
	var oCell5 = oRowMain.insertCell(); // CAT01
	var oCell6 = oRowMain.insertCell(); // CAT02
	var oCell7 = oRowMain.insertCell(); // CAT03
	var oCell8 = oRowMain.insertCell(); // CAT04
	var oCell9 = oRowMain.insertCell(); // CAT05
	
	oCell2.onclick = function() { setEditMode(this); }; // �ڵ�
	oCell3.onclick = function() { setEditMode(this); }; // �ڵ� ��
	oCell4.onclick = function() { setEditMode(this); }; // ����
	oCell5.onclick = function() { setEditMode(this); }; // CAT01
	oCell6.onclick = function() { setEditMode(this); }; // CAT02
	oCell7.onclick = function() { setEditMode(this); }; // CAT03
	oCell8.onclick = function() { setEditMode(this); }; // CAT04
	oCell9.onclick = function() { setEditMode(this); }; // CAT05
	
	oCell0.align = "center"; oCell0.width = "30px"; // ��ȣ
	oCell1.align = "center"; oCell1.width = "30px"; // ����
	oCell2.align = "left"; oCell2.width = "140px";  // �ڵ�
	oCell3.align = "left"; oCell3.width = "200px";  // �ڵ� ��
	oCell4.align = "left"; oCell4.width = "300px";  // ����
	oCell5.align = "left"; oCell5.width = "100px";  // CAT01
	oCell6.align = "left"; oCell6.width = "100px";  // CAT02
	oCell7.align = "left"; oCell7.width = "100px";  // CAT03
	oCell8.align = "left"; oCell8.width = "100px";  // CAT04
	oCell9.align = "left"; oCell9.width = "100px"; oCell9.className = "right"; // CAT05
	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>"; 
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// ����
	oCell1.innerHTML = "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:20px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";
	// �ڵ�
	oCell2.innerHTML = "<a id=\"divCd\"></a><input type=\"text\" name=\"cd\" class=\"normal\" size=\"20\" "
						+ "onChange=\"chkCodeStr(this); \" onBlur=\"chkDupCd(this); \" onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none; ime-mode:disabled; \" "
						+ "onFocusOut=\"setViewMode(this); \" onDblClick=\"this.select(); \">"; 
	// �ڵ� ��
	oCell3.innerHTML = "<a id=\"divCdName\"></a><input type=\"text\" name=\"cd_name\" class=\"normal\" size=\"40\" "
						+ "onKeyDown=\"moveNextBox(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">"; 
	// ����
	oCell4.innerHTML = "<a id=\"divDescr\"></a><input type=\"text\" name=\"descr\" class=\"normal\" size=\"100\" "
						+ "onKeyDown=\"moveNextBox(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAT01
	oCell5.innerHTML = "<a id=\"divCat01\"></a><input type=\"text\" name=\"cat01\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAT02
	oCell6.innerHTML = "<a id=\"divCat02\"></a><input type=\"text\" name=\"cat02\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAT03
	oCell7.innerHTML = "<a id=\"divCat03\"></a><input type=\"text\" name=\"cat03\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAT04
	oCell8.innerHTML = "<a id=\"divCat04\"></a><input type=\"text\" name=\"cat04\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// CAT05
	oCell9.innerHTML = "<a id=\"divCat05\"></a><input type=\"text\" name=\"cat05\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" onDblClick=\"this.select(); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	
	document.recalc();
	setRowNo();
	
}

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
// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.cd[tableLen-1] ) {
		arrData[0] = document.frm.cd[tableLen-1].value;
		arrData[1] = document.frm.cd_name[tableLen-1].value;
		arrData[2] = document.frm.descr[tableLen-1].value;
		arrData[3] = document.frm.cat01[tableLen-1].value;
		arrData[4] = document.frm.cat02[tableLen-1].value;
		arrData[5] = document.frm.cat03[tableLen-1].value;
		arrData[6] = document.frm.cat04[tableLen-1].value;
		arrData[7] = document.frm.cat05[tableLen-1].value;
	}
	else {
		arrData[0] = document.frm.cd.value;
		arrData[1] = document.frm.cd_name.value;
		arrData[2] = document.frm.descr.value;
		arrData[3] = document.frm.cat01.value;
		arrData[4] = document.frm.cat02.value;
		arrData[5] = document.frm.cat03.value;
		arrData[6] = document.frm.cat04.value;
		arrData[7] = document.frm.cat05.value;
	}
	
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	if( document.frm.cd[tableLen-1] ) {
		document.frm.cd[tableLen-1].value = arrData[0];
		document.frm.cd_name[tableLen-1].value = arrData[1];
		document.frm.descr[tableLen-1].value = arrData[2];
		document.frm.cat01[tableLen-1].value = arrData[3];
		document.frm.cat02[tableLen-1].value = arrData[4];
		document.frm.cat03[tableLen-1].value = arrData[5];
		document.frm.cat04[tableLen-1].value = arrData[6];
		document.frm.cat05[tableLen-1].value = arrData[7];
		divCd[tableLen-1].innerHTML = "&nbsp;" + arrData[0];
		divCdName[tableLen-1].innerHTML = "&nbsp;" + arrData[1];
		divDescr[tableLen-1].innerHTML = "&nbsp;" + arrData[2];
		divCat01[tableLen-1].innerHTML = "&nbsp;" + arrData[3];
		divCat02[tableLen-1].innerHTML = "&nbsp;" + arrData[4];
		divCat03[tableLen-1].innerHTML = "&nbsp;" + arrData[5];
		divCat04[tableLen-1].innerHTML = "&nbsp;" + arrData[6];
		divCat05[tableLen-1].innerHTML = "&nbsp;" + arrData[7];
	}
	else {
		document.frm.cd.value = arrData[0];
		document.frm.cd_name.value = arrData[1];
		document.frm.descr.value = arrData[2];
		document.frm.cat01.value = arrData[3];
		document.frm.cat02.value = arrData[4];
		document.frm.cat03.value = arrData[5];
		document.frm.cat04.value = arrData[6];
		document.frm.cat05.value = arrData[7];
		divCd.innerHTML = "&nbsp;" + arrData[0];
		divCdName.innerHTML = "&nbsp;" + arrData[1];
		divDescr.innerHTML = "&nbsp;" + arrData[2];
		divCat01.innerHTML = "&nbsp;" + arrData[3];
		divCat02.innerHTML = "&nbsp;" + arrData[4];
		divCat03.innerHTML = "&nbsp;" + arrData[5];
		divCat04.innerHTML = "&nbsp;" + arrData[6];
		divCat05.innerHTML = "&nbsp;" + arrData[7];
	}
	
}

var objTdG;
// �ڵ� �ߺ� üũ
function chkDupCd( obj ) {
	
	if( obj.value == null || obj.value == "" ) {
		return;
	}
	
	var tableLen = left_tbody.rows.length;
	var cntEq = 0; // �ߺ� counting
	for( var i=0 ; i < tableLen ; i++ ) {
		if( document.frm.cd[i] ) {
			if( document.frm.cd[i].value == obj.value ) {
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

// chkDupCd() ���� setTimeout �� ����Ǵ� �Լ�
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// ����
function GoSave( service ) {
	
	var tableLen = left_tbody.rows.length;
	
	// �ڵ� ��� counting : �ϳ��� ������� ���� ��� �������� ����
	var cdCnt = 0;
	var i = 0;
	while( i < tableLen && cdCnt == 0 ) {
		if( document.frm.cd[i] ) {
			if( document.frm.cd[i].value == null || document.frm.cd[i].value == "" ) {
				i++;
			}
			else {
				cdCnt++;
			}
		}
		else {
			if( document.frm.cd.value == null || document.frm.cd.value == "" ) {
				i++;
			}
			else {
				cdCnt++;
			}
		}
	}
	if( cdCnt < 1 ) {
		alert("�ڵ带 �ϳ� �̻� �Է��ؾ� �մϴ�.");
		if( left_tbody.rows[0] ) {
			objTdG = left_tbody.rows[0].cells[2];
		}
		else {
			objTdG = left_tbody.rows.cells[2];
		}
		setTimeout(setEditModeTime, 1);
		return;
	}
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = left_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		// �ڵ� --> �ڵ� ��
		if( objName == "cd" ) {
			if( left_tbody.rows[rowIdx] ) {
				objTdG = left_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = left_tbody.rows.cells[3];
			}
		}
		// �ڵ� �� --> ����
		else if( objName == "cd_name" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[0];
			}
			else {
				objTdG = main_tbody.rows.cells[0];
			}
		}
		// ���� --> CAT01
		else if( objName == "descr" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[1];
			}
			else {
				objTdG = main_tbody.rows.cells[1];
			}
		}
		// CAT01 --> CAT02
		else if( objName == "cat01" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// CAT02 --> CAT03
		else if( objName == "cat02" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = main_tbody.rows.cells[3];
			}
		}
		// CAT03 --> CAT04
		else if( objName == "cat03" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else {
				objTdG = main_tbody.rows.cells[4];
			}
		}
		// CAT04 --> CAT05
		else if( objName == "cat04" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[5];
			}
			else {
				objTdG = main_tbody.rows.cells[5];
			}
		}
		// CAT05 --> ������ �ڵ�
		else if( objName == "cat05" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = left_tbody.rows[0].cells[2];
				}
				else {
					objTdG = left_tbody.rows.cells[2];
				}
			}
			// �������� ù��° input box �� �̵�
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = left_tbody.rows[rowIdx+1].cells[2];
				}
				else {
					objTdG = left_tbody.rows.cells[2];
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

// ����
function GoDelete(service) {
	
	if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
	
	document.frm.cd_grp.value = "";
			
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}
