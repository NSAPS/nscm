
// ����ȭ������ �̵�
function moveBack() {
	
	var sel_plant = document.frm.sel_plant.value;
	var sel_line = document.frm.sel_line.value;
	var sel_cycle_type = document.frm.sel_cycle_type.value;
	var sel_cal_grp = document.frm.sel_cal_grp.value;

	var urlStr = "service.do?_moon_service=md_04110_workCenterCalendar_list";
	urlStr += "&sel_plant=" + sel_plant + "&sel_line=" + sel_line + "&sel_cycle_type=" + sel_cycle_type+ "&sel_cal_grp=" + sel_cal_grp;

	location.href = urlStr;

}

// ���� check�ڽ� üũ�ÿ� idu_flag�� 'D'�� �����ؼ� ���� ����� �����ǵ��� �Ѵ�.
function doChangeDel(obj) {
	var rowIdx = obj.parentNode.parentNode.rowIndex;

	if(obj.checked){
		if(document.frm.idu_flag[rowIdx])
			document.frm.idu_flag[rowIdx].value = "D";
		else
			document.frm.idu_flag.value = "D";
	}
	else{
		if(document.frm.idu_flag[rowIdx])
			document.frm.idu_flag[rowIdx].value = "U";
		else
			document.frm.idu_flag.value = "U";
	}
	
}

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).select();
		
}

// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// combo box �� Edit Mode �� ��ȯ
function setEditMode1( objTd ) {
	setCalAllViewMode();	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();

}

// combo box �� View Mode �� ��ȯ
function setViewMode1(objBox, gubn) {

 	var	strVal1 = objBox.options[objBox.selectedIndex].value;
 	var	strVal2 = objBox.options[objBox.selectedIndex].text;

	if (gubn == 0) 
		objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal1+"&nbsp;" + strVal2;
	else
		objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal2;
		
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";

}

// ��¥���úκ� onChange
function setCalonChange(objBox) {

	var rowIdx = objBox.parentNode.rowIndex;
	var objyyyymmdd = objBox.childNodes(1).childNodes(1);
	var objhour		= objBox.childNodes(1).childNodes(5);
	var objmin		= objBox.childNodes(1).childNodes(7);

	if(objyyyymmdd[rowIdx]){
	 	var strYYYYMMDD = objyyyymmdd[rowIdx].value;
	 	var strHour = objhour[rowIdx].value;
	 	var strMin = objmin[rowIdx].value;
	}
	else{
	 	var strYYYYMMDD = objyyyymmdd.value;
	 	var	strHour = objhour.value;
	 	var strMin = objmin.value;
	}

	objBox.childNodes(0).innerHTML = strYYYYMMDD+"&nbsp;" + strHour+":"+strMin+":00";
	objBox.childNodes(0).style.display = "block";
	objBox.childNodes(1).style.display = "none";
	
}


function setCalAllViewMode(){
	// ��¥ object�� �ٸ� object�� edit mode�� �Ǿ�� view mode�� ��ȯ��.
	var rowCnt = left_tbody.rows.length;
	for(i=0 ; i < rowCnt ; i++){
		if(rowCnt > 1){
				setCalonChange(td_strt_dttm[i]);
				setCalonChange(td_end_dttm[i]);
		}
		else{
				setCalonChange(td_strt_dttm);
				setCalonChange(td_end_dttm);
		}
	}
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
	oRowLeft.height = 22; 
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22; 
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����
	var oCell2 = oRowLeft.insertCell(); // Line ��
	var oCell3 = oRowLeft.insertCell(); // �۾��� ��
	var oCell4 = oRowMain.insertCell(); // �����Ͻ�
	var oCell5 = oRowMain.insertCell(); // �����Ͻ�
	var oCell6 = oRowMain.insertCell(); // �ݺ��ֱ�
	var oCell7 = oRowMain.insertCell(); // TYPE
	var oCell8 = oRowMain.insertCell(); // Į���ٱ���
	var oCell9 = oRowMain.insertCell(); // ���
	var oCell10 = oRowMain.insertCell(); // ���뿩��
	

	oCell3.id = "proc"; // Workcenter id	
	oCell4.id = "td_strt_dttm"; 
	oCell5.id = "td_end_dttm"; 	

	oCell2.ondblclick = function() { setEditMode1(this); }; // Line
	oCell3.ondblclick = function() { setEditMode1(this); }; // Workcenter	
	oCell4.ondblclick = function() { setEditMode1(this); }; // �����Ͻ�
	oCell5.ondblclick = function() { setEditMode1(this); }; // �����Ͻ�
	oCell6.ondblclick = function() { setEditMode1(this); }; // �ݺ��ֱ�
	oCell7.ondblclick = function() { setEditMode1(this); }; // TYPE
	oCell8.ondblclick = function() { setEditMode1(this); }; // Į���ٱ���
	oCell9.ondblclick = function() { setEditMode(this); }; // ���
	oCell10.ondblclick = function() { setEditMode1(this); }; // ���뿩��
	
	oCell0.align = "center"; oCell0.width = "30px"; // ��ȣ
	oCell1.align = "center"; oCell1.width = "30px"; // ����
	oCell2.align = "left"; oCell2.width = "150px";  // Line ��
	oCell3.align = "left"; oCell3.width = "200px";  // �۾��� ��
	oCell4.align = "center"; oCell4.width = "200px";  // �����Ͻ�
	oCell5.align = "center"; oCell5.width = "200px";  // �����Ͻ�
	oCell6.align = "center"; oCell6.width = "90px";  // �ݺ��ֱ�
	oCell7.align = "center"; oCell7.width = "90px";  // TYPE
	oCell8.align = "center"; oCell8.width = "100px";  // Į���ٱ���
	oCell9.align = "left"; oCell9.width = "300px";  // ���
	oCell10.align = "center"; oCell10.width = "60px";  // ���뿩��
	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a><input type=\"hidden\" name=\"idu_flag\" value=\"I\">"; 
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// ����
	oCell1.innerHTML = "<input name=\"check_del\" type=\"checkbox\" class=\"normal\" onClick=\"doChangeDel(this);\" >";
	// Line ��

	line_combo(oCell2);
	// �۾��� �� 
	oCell3.innerHTML = "<a id=\"divIn_Proc\">&nbsp;*&nbsp;��ü</a><select \n" +
					   "name=\"in_proc\" onChange=\"chkDupProc(this);\" onFocusOut=\"setViewMode1(this,0); \" \n" +
					   "style=\"width:100%; padding-left:5px; display:none;\" >\n" +
					   "<option  value=\"*\" selected >��ü</option></select>\n" +
					   "<input type=\"hidden\" name=\"old_proc\" value=\"*\">";
	// �����Ͻ�
	strt_dttm_obj(oCell4, rowNo+1);
	// �����Ͻ�
	end_dttm_obj(oCell5, rowNo+1);
	// �ݺ��ֱ�
	cycle_type_combo(oCell6);
	// TYPE
	cal_type_combo(oCell7);
	// Į���ٱ���
	cal_grp_combo(oCell8);
	// ���
	oCell9.innerHTML = "<a id=\"divIn_description\"></a><input type=\"text\" name=\"in_description\" class=\"normal\" size=\"20\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-left:5px; display:none;\" onFocusOut=\"setViewMode(this); \">";
	// ���뿩��
	use_flag_combo(oCell10);
	
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

// �ߺ� üũ
function chkDupProc( obj ) {
	
	if( obj.value == null || obj.value == "" ) {
		return;
	}
	var rowIdx = obj.parentNode.parentNode.rowIndex;
 	var	strPlant 	= document.frm.sel_plant.value;
	var	strLine 	= document.frm.in_line[rowIdx].value;
 	var	strProc 	= obj.value;
	var tableLen = left_tbody.rows.length;
	
	var cntEq = 0; // �ߺ� counting
	for( var i=0 ; i < tableLen ; i++ ) {
		if( document.frm.in_line[i] ) {
			if( document.frm.in_line[i].value == strLine && document.frm.in_proc[i].value == strProc ) {
				cntEq++;
			}
		}
	}
	if( cntEq > 1 ) {
		alert("�ߺ��� �޷°��� �����մϴ�.");
		setEditMode1(obj.parentNode);
		return;
	}
}

// ���� ���� ���� key �ߺ��� üũ�ϰ� �ش��׸��� focus�Ѵ�.
function chkKeyDup() {
	var tableLen = left_tbody.rows.length;
	if (tableLen == 1) return; // �ߺ����� �ʿ����.
	// �ʱ� Line, workcenter id
 	var	strLine 	= "";
 	var	strProc 	= "";
 	var	strStart_dttm 	= "";
 	var cntEq = 0;
		
	var cntEq = 0; // �ߺ� counting
	for( var j=0 ; j < tableLen ; j++) {
	 	strLine 	= document.frm.in_line[j].value;
	 	strProc 	= document.frm.in_proc[j].value;
	 	strStart_dttm 	= document.frm.new_strt_dttm[j].value;

		for( var i=0 ; i < tableLen ; i++ ) {
			if( document.frm.in_line[i].value == strLine && document.frm.in_proc[i].value == strProc 
			    && document.frm.new_strt_dttm[i].value == strStart_dttm ) {
				cntEq++;
				if( cntEq > 1 ) {
					alert(i+1+"�࿡ �ߺ��� �޷°��� �����մϴ�. ������ �����ϼ���!");
					setEditMode1(document.frm.in_line[i].parentNode);
					return true;
				}
				
			}
		}
		cntEq = 0;
	}
	return false;
}

// ���� ���� ����� ����,�����Ͻ� �ݿ��� ���� �޷�,��,�� object���� hidden ������ copy �Ѵ�
function copyDTTM(){
	var tableLen = left_tbody.rows.length;
 	var	strsYYYYMMDD 	= "";
 	var	strsHOUR 	= "";
 	var	strsMIN 	= "";
 	var	streYYYYMMDD 	= "";
 	var	streHOUR 	= "";
 	var	streMIN 	= "";

	if(tableLen > 1){
		for( var i=0 ; i < tableLen ; i++){

		 	strsYYYYMMDD 	= document.getElementsByName( "in_strt_dttm"+(i+1))[0].value;
		 	strsHOUR 		= document.frm.strt_hour[i].value;
		 	strsMIN 		= document.frm.strt_min[i].value;
		 	streYYYYMMDD 	= document.getElementsByName( "in_end_dttm"+(i+1))[0].value;
		 	streHOUR 		= document.frm.end_hour[i].value;
		 	streMIN 		= document.frm.end_min[i].value;
		 	
		 	document.frm.new_strt_dttm[i].value = strsYYYYMMDD+"&nbsp;" + strsHOUR+":"+strsMIN+":00";
		 	document.frm.new_end_dttm[i].value = streYYYYMMDD+"&nbsp;" + streHOUR+":"+streMIN+":00";
		}
	}
	else{
		 	strsYYYYMMDD 	= document.getElementsByName( "in_strt_dttm1")[0].value;
		 	strsHOUR 		= document.frm.strt_hour.value;
		 	strsMIN 		= document.frm.strt_min.value;
		 	streYYYYMMDD 	= document.getElementsByName( "in_end_dttm1")[0].value;
		 	streHOUR 		= document.frm.end_hour.value;
		 	streMIN 		= document.frm.end_min.value;

		 	document.frm.new_strt_dttm.value = strsYYYYMMDD+"&nbsp;" + strsHOUR+":"+strsMIN+":00";
		 	document.frm.new_end_dttm.value = streYYYYMMDD+"&nbsp;" + streHOUR+":"+streMIN+":00";
	}	
	
} 

// ����
function GoSave( service ) {

	var tableLen = left_tbody.rows.length;
	// �ڵ� ��� counting : �ϳ��� ������� ���� ��� �������� ����
	if( tableLen == 0 ) {
		alert("�׸��� �ϳ� �̻� �Է��ؾ� �մϴ�.");
		return;
	}
	// ���� ���� ����� ����,�����Ͻ� �ݿ��� ���� �޷�,��,�� object���� hidden ������ copy �Ѵ�
	copyDTTM();
	
	for( var i = 0; i < tableLen ; i++ ) {
		if( tableLen > 1 ) {
			if( document.getElementsByName( "in_strt_dttm"+(i+1))[0].value == null || document.getElementsByName( "in_strt_dttm"+(i+1))[0].value == "" ) {
				alert("�޹� �����Ͻø� �Է��Ͻʽÿ�!");
				setEditMode1(document.getElementsByName( "in_strt_dttm"+(i+1))[0].parentNode.parentNode);
				return;
			}
			 
			if( document.getElementsByName( "in_end_dttm"+(i+1))[0].value == null || document.getElementsByName( "in_end_dttm"+(i+1))[0].value == "" ) {
				alert("�޹� �����Ͻø� �Է��Ͻʽÿ�!");
				setEditMode1(document.getElementsByName( "in_end_dttm"+(i+1))[0].parentNode.parentNode);
				return;
			}
			// ���ᳯ¥�� ���۳�¥���� ũ�� ������ Ȯ��
			if(delDateDelimiter(document.getElementsByName( "in_end_dttm"+(i+1))[0].value)
			     -delDateDelimiter(document.getElementsByName( "in_strt_dttm"+(i+1))[0].value)<0) {
				alert(i+"���� �������ڰ� �������ں��� �����ϴ�!");
				setEditMode1(document.getElementsByName( "in_strt_dttm"+(i+1))[0].parentNode.parentNode);
				return;
			}
			
			
		}
		else {
			if( document.getElementsByName( "in_strt_dttm1")[0].value == null || document.getElementsByName( "in_strt_dttm1")[0].value == "" ) {
				alert("�޹� �����Ͻø� �Է��Ͻʽÿ�!");
				setEditMode1(document.getElementsByName( "in_strt_dttm")[0].parentNode.parentNode);
				return;
			}
			 
			if( document.getElementsByName( "in_end_dttm1")[0].value == null || document.getElementsByName( "in_end_dttm1")[0].value == "" ) {
				alert("�޹� �����Ͻø� �Է��Ͻʽÿ�!");
				setEditMode(document.getElementsByName( "in_end_dttm")[0].parentNode.parentNode);
				return;
			}
			// ���ᳯ¥�� ���۳�¥���� ũ�� ������ Ȯ��
			if(delDateDelimiter(document.getElementsByName( "in_end_dttm1")[0].value)
			     -delDateDelimiter(document.getElementsByName( "in_strt_dttm1")[0].value)<0) {
				alert(i+"���� �������ڰ� �������ں��� �����ϴ�!");
				setEditMode1(document.getElementsByName( "in_strt_dttm")[0].parentNode.parentNode);
				return;
			}

		}
	}

	
	// ����/�ű� �׸��߿� �ߺ��׸��� �ִ��� ����
	if(chkKeyDup()) return;

	viewWait();

	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();

}

