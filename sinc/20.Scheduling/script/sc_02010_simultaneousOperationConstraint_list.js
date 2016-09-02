
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
		//objTd.childNodes(1).childNodes(0).focus();
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



// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	}
	
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	} 
	else { 
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows.style.backgroundColor = "#ffffff";
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	}
	
}

// ���̺� ���� Ŭ���� Ŭ���� ���� ǥ��
//function clickLine(objTd) {
//	
//	var rowIdx = objTd.parentNode.rowIndex;
//	if( left_tbody.rows[rowIdx] ) {
//		if( rowIdx == clickedLineIdx ) {
//			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
//			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
//			clickedLineIdx = null;
//		}
//		else {
//			refreshFrame();
//			left_tbody.rows[rowIdx].style.backgroundColor = "#ccccff";
//			main_tbody.rows[rowIdx].style.backgroundColor = "#ccccff";
//			if( left_tbody.rows[clickedLineIdx] ) {
//				left_tbody.rows[clickedLineIdx].style.backgroundColor = "#ffffff";
//				main_tbody.rows[clickedLineIdx].style.backgroundColor = "#ffffff";
//			}
//			clickedLineIdx = rowIdx;
//		}
//	} 
//	else {
//		if( rowIdx == clickedLineIdx ) {
//			left_tbody.rows.style.backgroundColor = "#ffffff";
//			main_tbody.rows.style.backgroundColor = "#ffffff";
//			clickedLineIdx = null;
//		}
//		else {
//			refreshFrame();
//			left_tbody.rows.style.backgroundColor = "#ccccff";
//			main_tbody.rows.style.backgroundColor = "#ccccff";
//			clickedLineIdx = rowIdx;
//		}
//	}
//	
//}

// row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRow( objBtn ) {
	
	if( objBtn.parentNode ) {
		var insertRowIndex = objBtn.parentNode.parentNode.rowIndex;
		insertRowIndex = insertRowIndex + 1;
		var oRowLeft = left_tbody.insertRow(insertRowIndex);
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	else {
		//alert("addRow else");
		var oRowLeft = left_tbody.insertRow();
		var oRowMain = main_tbody.insertRow();
	}
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 30;  
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 30; 
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����		
	var oCell2 = oRowLeft.insertCell(); // ����
	
	var oCell3 = oRowMain.insertCell(); // ����
	var oCell4 = oRowMain.insertCell(); // �����
	var oCell5 = oRowMain.insertCell(); // ǰ���ڵ�
	var oCell6 = oRowMain.insertCell(); // ǰ���̸�
	var oCell7 = oRowMain.insertCell(); // �԰�
	var oCell8 = oRowMain.insertCell(); // ���ð��� �Ұ�ȣ��	
	var oCell9 = oRowMain.insertCell(); // �۾�Ư¡
	
	oCell2.onclick = function() { setEditMode(this); }; // ����
	oCell3.onclick = function() { setEditMode(this); }; // ����
	oCell4.onclick = function() { setEditMode(this); }; // �����
	oCell5.onclick = function() { setEditMode(this); }; // ǰ���ڵ�	
	//oCell6.onclick = function() { setEditMode(this); }; // ǰ���̸�
	//oCell7.onclick = function() { setEditMode(this); }; // �԰�
	oCell8.onclick = function() { setEditMode(this); }; // ���ð��� �Ұ�ȣ��
	oCell9.onclick = function() { setEditMode(this); }; // �۾�Ư¡
		
	oCell0.align = "center"; oCell0.width = "30px"; // ��ȣ
	oCell1.align = "center"; oCell1.width = "40px"; // ����	
	oCell2.align = "center"; oCell2.width = "100px"; // ����
	
	oCell3.align = "left"; oCell3.width = "185px";  // ����
	oCell4.align = "left"; oCell4.width = "220px";  // �����
	oCell5.align = "center"; oCell5.width = "100px";  // ǰ���ڵ�
	oCell6.align = "left"; oCell6.width = "140px";  // ǰ���̸�
	oCell7.align = "center"; oCell7.width = "120px";  // �԰�	
	oCell8.align = "left"; oCell8.width = "220px";  // ���ð��� �Ұ�ȣ��
	oCell9.align = "center"; oCell9.width = "100px"; // �۾�Ư¡
		
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	oCell0.onclick = function() { clickLine(this); };
	// ����
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";	
	
	// ����
	oCell2.innerHTML = "<a id=\"divPlant\"></a><select " 
					    + "name=\"plant_id\" onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this);\" tabindex=\"1\" "
					    + "onChange=\"doChangeGridPlant(this); \" style=\"width:100%; padding-left:5px; display:none;\"> "					   
        			    + document.frm.plant_loc_sel_str.value + "</select>";						
						
	// ����
	oCell3.innerHTML = "<a id=\"divLine\">\</a><a id=\"divLineSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \" ><select "
						+ "name=\"line_id\" onChange=\"doChangeGridProc(this); \" onKeyDown=\"moveNextBox(this); \" tabindex=\"2\" "												
						+ "style=\"width:100%; padding-left:5px; \">"						
            			//+ document.frm.line_loc_sel_str.value 
            			+ "<option value=\"\"></option> "
            			+ "</select></a>";
	
	// �����
	oCell4.innerHTML = "<a id=\"divProc\"></a><a id=\"divProcSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \"><select "
						+ "name=\"proc_id\" onKeyDown=\"moveNextBox(this); \" tabindex=\"3\" "
						+ "style=\"width:100%; padding-left:5px; \"> "
						+ "<option value=\"\"></option> "
						+ "</select></a>";
	
	// ǰ���ڵ�
	oCell5.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemIdSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"item_id\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"4\" "
						+ "style=\"width:73PX; padding-right:5px; text-align:cneter; \" > "
						+ "<img name=\"imgItemId\" tabindex=\"-1\" "
        				+ "src=\"sinc/template/basic/skin/nongshim/images/common/icon_search.gif\" align=\"absmiddle\" "
        				+ "border=\"0\" onClick=\"openItemSearchPop(this); \" style=\"cursor:pointer;\" "
        				+ "onMouseOver=\"overImg(this); \" onMouseOut=\"outImg(this); \"/></a> ";
	// ǰ���̸�
	oCell6.innerHTML = "<a id=\"divItemName\"></a><input "
						+ "type=\"text\" name=\"item_name\" class=\"normal\" size=\"20\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:left; \" "
						+ "onChange=\"checkNum(this, 'BLANK'); fixedPoint(this.value, 1); \">";
	// �԰�
	oCell7.innerHTML = "<a id=\"divItemSpec\"></a><input "
						+ "type=\"text\" name=\"item_spec\" class=\"normal\" size=\"20\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" "
						+ "style=\"width:100%; padding-right:5px; display:none; text-align:center; \" "
						+ "onChange=\"checkNum(this, 'BLANK'); fixedPoint(this.value, 1); \">";
	// ���ð��� �Ұ�ȣ��
	oCell8.innerHTML = "<a id=\"divExclProc\"></a><a id=\"divExclProcSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \"><select "
						+ "name=\"excl_proc_id\" onKeyDown=\"moveNextBox(this); \" tabindex=\"5\" "
						+ "style=\"width:100%; padding-left:5px; \"> "
						+ "<option value=\"\"></option> "	
						+ "</select></a>";
	
	// �۾�Ư¡
	oCell9.innerHTML = "<a id=\"divMcType\"></a><select " 
					    + "name=\"mc_type\" onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this);\" tabindex=\"6\" "
					    + "style=\"width:100%; padding-left:5px; display:none;\"> "					   
        			    + document.frm.mc_type_loc_sel_str.value + "</select>";	
        			    
	document.recalc();
	setRowNo();
	
}

// ��ȣ setting
//function setRowNo() {
//	
//	var tableLen = left_tbody.rows.length;
//	var clickedFlag = false; // üũ�� ������ �ִ��� ����
//	
//	for( var i = 0 ; i < tableLen ; ++i ) {
//		if( divRowNo[0] ) {
//			divRowNo[i].innerHTML = i+1;
//			// üũ�� �Ǿ��ִ� �����̸� clickedLineIdx ����
//			if( left_tbody.rows[i].style.backgroundColor == "#ccccff" ) {
//				clickedLineIdx = i;
//				clickedFlag = true;
//			}
//		}
//		else {
//			divRowNo.innerHTML = "1";
//			// üũ�� �Ǿ��ִ� �����̸� clickedLineIdx ����
//			if( left_tbody.rows[i].style.backgroundColor == "#ccccff" ) {
//				clickedLineIdx = 1;
//				clickedFlag = true;
//			}
//		}
//	}
//	
//	// üũ�Ǿ� �ִ� ������ ������ clickedLineIdx = null
//	if( !clickedFlag ) {
//		clickedLineIdx = null;
//	}
//	
//}
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
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	//alert("rowIdx : " + delRowIdx + ", tableLen : " + tableLen);
	if( tableLen > 1 )
	{
		delRowDo( delRowIdx ); 
		rowFormed(); //<--1
	}
	else{
		delRowDo( delRowIdx );
		addRow(left_tbody.rows.length);
	}
	setRowNo();
	
	
}

// ���� row ���� �Լ�
// parameter : ������ rowIndex
function delRowDo( rowIdx ) { 
	//alert(left_tbody.rows.length + ", " + main_tbody.rows.length);
	left_tbody.deleteRow(rowIdx); 
	main_tbody.deleteRow(rowIdx);
	
}

// ���� ������ �ϸ� ��ư�� ��Ÿ���� �� �ȸԴ´�. ����, �� �ϴ� ������ ������ ������Ѵ�.
// �̷��� �ϸ� ��ư�� ��Ÿ���� �� �Դ´�.
// �� �ϴ� ���� ������ ��� & ���� & ���� & ä��
function rowFormed() {
	
	memLastRow();//<--2
	//alert("arrDate : " + arrData + ", " + "arrDisplayData : " + arrDisplayData);
	//alert("arrDisplayData : " + arrDisplayData);
	var tableLen = left_tbody.rows.length;
	//alert(tableLen);
	delRowDo( tableLen - 1 );
	addRow(left_tbody.rows.length);
	setLastRow();
		
} 

var arrData = new Array(9);
var arrDisplayData = new Array(9); 
var lineList;
var procList;
var exclProcList;
// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	// div ���ڿ� ����

	if(divPlant[tableLen-1])
		arrDisplayData[0] 	= divPlant[tableLen-1].innerHTML; // ����	
	else
		arrDisplayData[0] 	= divPlant.innerHTML; // ����
		
	if(divLine[tableLen-1]){
		arrDisplayData[1] 	= divLine[tableLen-1].innerHTML; // ����	
		lineList			= divLineSelect[tableLen-1].innerHTML // line select box list
	}
	else{
		arrDisplayData[1] 	= divLine.innerHTML; // ����	
		lineList			= divLineSelect.innerHTML // line select box list
	}
	
	if(divProc[tableLen-1]){
		arrDisplayData[2] 	= divProc[tableLen-1].innerHTML; // �����		
		procList			= divProcSelect[tableLen-1].innerHTML; // proc select box list
	}
	else{
		arrDisplayData[2] 	= divProc.innerHTML; // �����		
		procList			= divProcSelect.innerHTML; // proc select box list
	}
		
	if(divItemId[tableLen-1])
		arrDisplayData[3] 	= divItemId[tableLen-1].innerHTML; // ǰ���ڵ�
	else
		arrDisplayData[3] 	= divItemId.innerHTML; // ǰ���ڵ�
		
	if(divItemName[tableLen-1])	
		arrDisplayData[4] 	= divItemName[tableLen-1].innerHTML; // ǰ���̸�
	else
		arrDisplayData[4] 	= divItemName.innerHTML; // ǰ���̸�
		
	if(divItemSpec[tableLen-1])
		arrDisplayData[5] 	= divItemSpec[tableLen-1].innerHTML; // �԰�		
	else
		arrDisplayData[5] 	= divItemSpec.innerHTML; // �԰�		
		
	if(divExclProc[tableLen-1]){
		arrDisplayData[6] 	= divExclProc[tableLen-1].innerHTML; // ���ð��� �Ұ�ȣ��
		exclProcList		= divExclProcSelect[tableLen-1].innerHTML; // exclProc select box list
	}
	else{
		arrDisplayData[6] 	= divExclProc.innerHTML; // ���ð��� �Ұ�ȣ��		
		exclProcList		= divExclProcSelect.innerHTML; // exclProc select box list
	}
	
	if(divMcType[tableLen-1]){
		arrDisplayData[7]	= divMcType[tableLen-1].innerHTML; // �۾�Ư¡		
	}
	else{
		arrDisplayData[7]	= divMcType.innerHTML; // �۾�Ư¡
	}
	
	if(left_tbody.rows[tableLen-1])
		arrDisplayData[8]   = left_tbody.rows[tableLen-1].style.backgroundColor; // üũ
	else
		arrDisplayData[8]  = left_tbody.style.backgroundColor; // üũ color

	 
	// value�� ����
	if(document.frm.plant_id[tableLen-1])
		arrData[0] 	= document.frm.plant_id[tableLen-1].value; // ����		
	else
		arrData[0] 	= document.frm.plant_id.value; // ����	
	
	if( document.frm.line_id[tableLen-1])
		arrData[1] 	= document.frm.line_id[tableLen-1].value; // ����
	else
		arrData[1] 	= document.frm.line_id.value; // ����	
		
	if(document.frm.proc_id[tableLen-1])
		arrData[2] 	= document.frm.proc_id[tableLen-1].value; // �����	
	else
		arrData[2] 	= document.frm.proc_id.value; // �����
		
	if(document.frm.item_id[tableLen-1])
		arrData[3] 	= document.frm.item_id[tableLen-1].value; // ǰ���ڵ�
	else
		arrData[3] 	= document.frm.item_id.value; // ǰ���ڵ�
	
	if(document.frm.item_name[tableLen-1])
		arrData[4] 	= document.frm.item_name[tableLen-1].value; // ǰ���̸�
	else
		arrData[4] 	= document.frm.item_name.value; // ǰ���̸�
		
	if(document.frm.item_spec[tableLen-1])
		arrData[5] 	= document.frm.item_spec[tableLen-1].value; // �԰�		
	else
		arrData[5] 	= document.frm.item_spec.value; // �԰�		
		
	if(document.frm.excl_proc_id[tableLen-1])
		arrData[6] 	= document.frm.excl_proc_id[tableLen-1].value; // ���ð��� �Ұ�ȣ��
	else
		arrData[6] 	= document.frm.excl_proc_id.value; // ���ð��� �Ұ�ȣ��
		
	if(document.frm.mc_type[tableLen-1])
		arrData[7]	= document.frm.mc_type[tableLen-1].value; // �۾�Ư¡
	else
		arrData[7]	= document.frm.mc_type.value; // �۾�Ư¡
	
	if(left_tbody.rows[tableLen-1])
		arrData[8]  = left_tbody.rows[tableLen-1].style.backgroundColor; // üũ color
	else
		arrData[8]  = left_tbody.style.backgroundColor; // üũ color
	
	//alert(plant.value+","+line.value+","+proc.value+","+exclProc.value+","+arrData);
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	
	// value�� ä��		
	if(document.frm.plant_id[tableLen-1].options){ // ����
		for( i = 0 ; i < document.frm.plant_id[tableLen-1].options.length ; i++){
			if(document.frm.plant_id[tableLen-1].options[i].value == arrData[0])
				document.frm.plant_id[tableLen-1].options[i].selected = true;
		}
	}
	else{									// ����
		for( i = 0 ; i < document.frm.plant_id.options.length ; i++){
			if(document.frm.plant_id.options[i].value == arrData[0])
				document.frm.plant_id.options[i].selected = true;
		}
	}
	if(document.frm.line_id[tableLen-1])
		document.frm.line_id[tableLen-1].value		= arrData[1]; // ����
	else
		document.frm.line_id.value		= arrData[1]; // ����		
		
	if(document.frm.proc_id[tableLen-1])		
		document.frm.proc_id[tableLen-1].value		= arrData[2]; // �����		
	else
		document.frm.proc_id.value		= arrData[2]; // �����
			
	if(document.frm.item_id[tableLen-1])
		document.frm.item_id[tableLen-1].value		= arrData[3]; // ǰ���ڵ�
	else	
		document.frm.item_id.value		= arrData[3]; // ǰ���ڵ�
		
	if(document.frm.item_name[tableLen-1])
		document.frm.item_name[tableLen-1].value 	= arrData[4]; // ǰ���̸�
	else	
		document.frm.item_name.value 	= arrData[4]; // ǰ���̸�
		
	if(document.frm.item_spec[tableLen-1])
		document.frm.item_spec[tableLen-1].value 	= arrData[5]; // �԰�
	else
		document.frm.item_spec.value 	= arrData[5]; // �԰�
		
	if(document.frm.excl_proc_id[tableLen-1])
		document.frm.excl_proc_id[tableLen-1].value = arrData[6]; // ���ð��� �Ұ�ȣ��	
	else	
		document.frm.excl_proc_id.value = arrData[6]; // ���ð��� �Ұ�ȣ�� 
		
	if(document.frm.mc_type[tableLen-1].options ){ // �۾�Ư¡
		for( i = 0 ; i < document.frm.mc_type[tableLen-1].options.length ; i++){
			if(document.frm.mc_type[tableLen-1].options[i].value == arrData[7])
				document.frm.mc_type[tableLen-1].options[i].selected = true;
		}
	}
	else{									// �۾�Ư¡
		for( i = 0 ; i < document.frm.mc_type.options.length ; i++){
			if(document.frm.mc_type.options[i].value == arrData[7])
				document.frm.mc_type.options[i].selected = true;
		}
	}
		
	if(left_tbody.rows[tableLen-1])
		left_tbody.rows[tableLen-1].style.backgroundColor		= arrData[8]; // üũ color
	else
		left_tbody.style.backgroundColor		= arrData[8]; // üũ color
	if(main_tbody.rows[tableLen-1])
		main_tbody.rows[tableLen-1].style.backgroundColor		= arrData[8]; // üũ color
	else
		main_tbody.style.backgroundColor		= arrData[8]; // üũ color
	
	// div ä��
	if(divPlant[tableLen-1])
		divPlant[tableLen-1].innerHTML = arrDisplayData[0]; // ����
	else
		divPlant.innerHTML = arrDisplayData[0]; // ����
	
	if(divLine[tableLen-1]){	
		divLine[tableLen-1].innerHTML = arrDisplayData[1]; // ����
		divLineSelect[tableLen-1].innerHTML = lineList;		
	}
	else{
		divLine.innerHTML = arrDisplayData[1]; // ����
		divLineSelect.innerHTML = lineList;	
	}
	
	if(divProc[tableLen-1]){	
		divProc[tableLen-1].innerHTML = arrDisplayData[2]; // �����
		divProcSelect[tableLen-1].innerHTML = procList;
	}
	else{
		divProc.innerHTML = arrDisplayData[2]; // �����	
		divProcSelect.innerHTML = procList;
	}
	
	if(divItemId[tableLen-1])
		divItemId[tableLen-1].innerHTML = arrDisplayData[3]; // ǰ���ڵ�
	else
		divItemId.innerHTML = arrDisplayData[3]; // ǰ���ڵ�
	
	if(divItemName[tableLen-1])	
		divItemName[tableLen-1].innerHTML = arrDisplayData[4]; // ǰ���̸�
	else
		divItemName.innerHTML = arrDisplayData[4]; // ǰ���̸�	
	
	if(divItemSpec[tableLen-1])
		divItemSpec[tableLen-1].innerHTML = arrDisplayData[5]; // �԰�
	else
		divItemSpec.innerHTML = arrDisplayData[5]; // �԰�	
	
	if(divExclProc[tableLen-1]){
		divExclProc[tableLen-1].innerHTML = arrDisplayData[6]; // ���ð��� �Ұ�ȣ��
		divExclProcSelect[tableLen-1].innerHTML = exclProcList;
	}
	else{	
		divExclProc.innerHTML = arrDisplayData[6]; // ���ð��� �Ұ�ȣ��	
		divExclProcSelect.innerHTML = exclProcList;
	}
	
	if(divMcType[tableLen-1])
		divMcType[tableLen-1].innerHTML = arrDisplayData[7]; // ����
	else
		divMcType.innerHTML = arrDisplayData[7]; // ����
		
	document.recalc();
	
}

// ����
function GoSave( service ) {
	
	var plantId = document.frm.selected_plant.value;
	//������ �������� ���� ���
	if( plantId == null || plantId == ""){
		alert("������ ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
		return;
	}
	var tableLen = left_tbody.rows.length;
	var cnt = 0;	
	
	for( i = 0; i < tableLen; i++ ) { 		
		//if( document.frm.plant_id == null){	break; }
		//if( document.frm.plant_id[i]) {	
		if( document.frm.item_id[i]) {	
										
			if( (document.frm.plant_id[i].value != null && document.frm.plant_id[i].value != "")
				&& (document.frm.line_id[i].value != null && document.frm.line_id[i].value != "")
				&& (document.frm.proc_id[i].value != null && document.frm.proc_id[i].value != "")
				&& (document.frm.item_id[i].value != null && document.frm.item_id[i].value != "")				
				&& (document.frm.excl_proc_id[i].value != null && document.frm.excl_proc_id[i].value != "")) {
				cnt++;								
				//alert("plant:"+document.frm.plant_id[i].value+" line:"+document.frm.line_id[i].value+" proc:"+document.frm.proc_id[i].value+" excl_proc:"+document.frm.excl_proc_id[i].value);
			}		
		}
		else {					
			if( (document.frm.plant_id.value != null && document.frm.plant_id.value != "")
				&& (document.frm.line_id.value != null && document.frm.line_id.value != "")
				&& (document.frm.proc_id.value != null && document.frm.proc_id.value != "")	
				&& (document.frm.item_id.value != null && document.frm.item_id.value != "")			
				&& (document.frm.excl_proc_id.value != null && document.frm.excl_proc_id.value != "")) {
				cnt++;				
				
			}		
		}
		
	}
	// ������ ���ٵ� ���ﶧ
//	if(tableLen == 1 && cnt == 0){
//		cnt = 1;
//	}
	//alert("cnt:" + cnt + ", tableLen:" + tableLen);
	if( (cnt < 1) || (tableLen != cnt) ) {
		alert("������ �����Ͱ� ���ų�, �������� ���� �׸��� �ֽ��ϴ�.");
		return;
	}
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
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
	var objName = objBox.name;
	if(objName == "plant_id"){
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	else{
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// ���� --> ����
		if( objName == "plant_id" ) {
			if( left_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[0];				
			}
			else {
				objTdG = main_tbody.rows.cells[0];				
			}
		}
		// ���� --> �����
		else if( objName == "line_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[1];								
			}
			else {
				objTdG = main_tbody.rows.cells[1];
			}
		}
		// ����� --> ǰ���ڵ�
		else if( objName == "proc_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// ǰ���ڵ� --> ���ð��� �Ұ�ȣ��
		else if( objName == "item_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[5];
			}
			else {
				objTdG = main_tbody.rows.cells[5];
			}
		}
		// ���ð��� �Ұ�ȣ�� --> �۾�Ư¡
		else if( objName == "excl_proc_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[6];
			}
			else {
				objTdG = main_tbody.rows.cells[6];
			}
		}
		// �۾�Ư¡ --> ������ ����
		else if( objName == "mc_type" ) {
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

// ��ǰ �˻� POPUP
function openItemSearchPop( obj ) { 	
	
	if(obj.name.toUpperCase() != "SEARCH_ITEM_ID"){
		document.frm.search_item_popup_flag.value = "INPUT";
		var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
		var plant_id;
		var item_id;
		var proc_id;	
		if(document.frm.plant_id[rowIdx] && document.frm.item_id[rowIdx] ){
			plant_id = document.frm.plant_id[rowIdx].value; //�����ڵ�	
			item_id = document.frm.item_id[rowIdx].value; //ǰ���ڵ�
			proc_id = document.frm.proc_id[rowIdx].value; //�����
		}
		else{		
			plant_id = document.frm.plant_id.value; //�����ڵ�		
			item_id = document.frm.item_id.value; //ǰ���ڵ�
			proc_id = document.frm.proc_id.value; //�����
		}
		
		if( plant_id == "" || plant_id == null ) {
			alert("������ ���� �����Ͻʽÿ�.");
			return;
		} 
		
		var service_url = "service.do?_moon_service=item_search_popup_for_simul";
		service_url += "&_moon_perpage=200&_moon_pagenumber=1";
		service_url += "&selected_plant=" + plant_id + "&selected_item_id=" + item_id + "&proc_id=" + proc_id + "&rowIdx=" + rowIdx;
	}
	else{
		document.frm.search_item_popup_flag.value = "SEARCH";
		var plant_id = document.frm.selected_plant.value;
		var item_id;
		if(document.frm.search_item_id.value){
			item_id = document.frm.search_item_id.value;
		}
		var line_id;
		if(document.frm.selected_line.value){
			line_id = document.frm.selected_line.value;
		}
		
		var service_url = "service.do?_moon_service=item_search_popup_for_simul";
		service_url += "&_moon_perpage=200&_moon_pagenumber=1";
		service_url += "&selected_plant=" + plant_id;
		if(line_id != null && line_id != ""){
			service_url += "&line_id=" + line_id;
		}		
		if(item_id != null && line_id != ""){
			service_url += "&selected_item_id=" + item_id;
		}
	}
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

// ����(grid) ���ý� �����, ���ð��� �Ұ�ȣ�� ����Ʈ ä��
function doChangeGridProc(obj){
	
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;	
	var tableLen = left_tbody.rows.length;
	var line_id = obj.value;
	
	if(rowIdx == 0 && tableLen < 2){
		if(document.frm.plant_id[rowIdx]){
			//alert(rowIdx + ", " + left_tbody.rows.length);
			var plant_id = document.frm.plant_id.options[document.frm.plant_id.selectedIndex].value;
		}
		else{					
			var plant_id = document.frm.plant_id.value;
		}
	}	
	else if(document.frm.plant_id[rowIdx]){
		var plant_id = document.frm.plant_id[rowIdx].value;
	}
	else{
		var plant_id = document.frm.plant_id.value;
	}
	
	if(line_id == "" || line_id == null){
		alert("������ �����Ͻʽÿ�.");
		return;
	}
	//�����
	scheduling.getProcInfo2("plant_id", plant_id, "line_id", line_id, "sim_oper_combo_proc_list", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��� ����
			if( arrList.length == 0 ) {
				alert("��ġ�ϴ� ��� ����� ����Ʈ��  �����ϴ�.");
			}
			else {
				var proc_id = document.frm.proc_id.value;
				var div_proc = "<select name=\"proc_id\" style=\"width:100%; padding-left:5px \" ";
				div_proc += "onKeyDown=\"moveNextBox(this); \" >";
				for( i = 0; i < arrList.length; i++){
					div_proc += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == proc_id)
							div_proc += " selected ";
					div_proc += ">" + arrList[i][1] + "</option>";					
				}
				div_proc += "</select>";
				if(divProcSelect[rowIdx])
					divProcSelect[rowIdx].innerHTML = div_proc;
				else
					divProcSelect.innerHTML = div_proc;
			}
		}
	});	
	//���ð��� �Ұ�ȣ��
	scheduling.getProcInfo1("selected_plant", plant_id, "sim_oper_combo_excl_proc_list", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��� ����
			if( arrList.length == 0 ) {
				alert("��ġ�ϴ� ��� ���ð��� �Ұ�ȣ�� ����Ʈ��  �����ϴ�.");
			}
			else {
				var proc_id = document.frm.excl_proc_id.value;
				var div_excl_proc = "<select name=\"excl_proc_id\" style=\"width:100%; padding-left:5px \" ";
				div_excl_proc += "onKeyDown=\"moveNextBox(this); \" >";
				for( i = 0; i < arrList.length; i++){
					div_excl_proc += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == proc_id)
							div_excl_proc += " selected ";
					div_excl_proc += ">" + arrList[i][1] + "</option>";					
				}
				div_excl_proc += "</select>";
				if(divExclProcSelect[rowIdx])
					divExclProcSelect[rowIdx].innerHTML = div_excl_proc;
				else
					divExclProcSelect.innerHTML = div_excl_proc;
			}
		}
	});	
}


function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.search_item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.search_item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.search_item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}
