//############################################################
//## ���α׷�ID : sc_11020_dailyProductionPlanAnalysisNewItem_reg
//## ���α׷��� : �ϰ������ȹ �м�(�籸��) - ��� ȭ��(POPUP)
//## ������  : ���米
//## �������� : 2008-11-27 �����
//##
//##���� job file : job_sinc_20_scheduling_00.xml
//##
//##���� query file : query_sinc_20_scheduling_00.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2008-11-27  ���米          sc_11020_dailyProductionPlanAnalysisNewItem_reg.js ����
//##
//##
//############################################################

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
	oRowLeft.height = 24;  //�� ����
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 24; //�� ����
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����		
	var oCell2 = oRowLeft.insertCell(); // ����	
	var oCell3 = oRowLeft.insertCell(); // �۾���
	var oCell4 = oRowLeft.insertCell(); // ��ǰ
	
	var oCell5 = oRowMain.insertCell(); // ��������
	var oCell6 = oRowMain.insertCell(); // shift
//	var oCell7 = oRowMain.insertCell(); // �����Ͻ� date
//	var oCell8 = oRowMain.insertCell(); // �����Ͻ� time
//	var oCell9 = oRowMain.insertCell(); // �����Ͻ� date
//	var oCell10 = oRowMain.insertCell(); // �����Ͻ� time
	var oCell11 = oRowMain.insertCell(); // ����
	var oCell12 = oRowMain.insertCell(); // ������ȣ
	var oCell13 = oRowMain.insertCell(); // ���� �׸� ��ȣ
	
//	oCell5.onclick = function() { alert("1");
//		/*Calendar.setup({
//			inputField  : "input_prod_dates", // id of the input field
//			ifFormat    : "%Y-%m-%d",     // format of the input field 
//			button      : "startBtn",      // trigger for the calendar (button ID)
//			align       : "Tl",           // alignment (defaults to "Bl")
//			singleClick : true
//		}); */};
			
	oCell0.align = "center"; oCell0.width = document.frm.top_left1.value; // ��ȣ
	oCell1.align = "center"; oCell1.width = document.frm.top_left2.value; // ����	
	oCell2.align = "center"; oCell2.width = document.frm.top_left3.value; // ����
	oCell3.align = "center"; oCell3.width = document.frm.top_left4.value; // �۾���
	oCell4.align = "center"; oCell4.width = document.frm.top_left5.value; // ��ǰ
	
	oCell5.align = "center"; 	oCell5.width = document.frm.top_line1.value;  // ��������
	oCell6.align = "center"; 	oCell6.width = document.frm.top_line2.value;  // shift
//	oCell7.align = "center"; 	oCell7.width = document.frm.s_date.value;  // �����Ͻ� date
//	oCell8.align = "center"; 	oCell8.width = document.frm.s_time.value;  // �����Ͻ� time
//	oCell9.align = "center"; 	oCell9.width = document.frm.e_date.value;  // �����Ͻ�	 date
//	oCell10.align = "center"; 	oCell10.width = document.frm.e_time.value;  // �����Ͻ� time
	oCell11.align = "right"; 	oCell11.width = document.frm.top_line5.value; // ����
	oCell12.align = "center"; 	oCell12.width = document.frm.top_line6.value; // ������ȣ
	oCell13.align = "center"; 	oCell13.width = document.frm.top_line7.value; // ���� �׸� ��ȣ
		
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	
	
	// ����
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";	
	
	// ����
	oCell2.innerHTML = "<select " 
					    + "name=\"input_plant_id\" onKeyDown=\"moveNextBox(this);\" tabindex=\"1\" "
					    + "onChange=\"doChangeProc(this); \" style=\"width:100%; padding-left:5px; \"> "					   
        			    + document.frm.plant_loc_sel_str.value + "</select> "
        			    + "<input type=\"hidden\" name=\"input_version\" value=\"\">";						
						
	// �۾���	
	oCell3.innerHTML = "<a id=\"divProcSelect\" style=\"width:100%; \" ><select "
						+ "name=\"input_proc_id\" onKeyDown=\"moveNextBox(this); \" style=\"width:100%; padding-left:5px; \" tabindex=\"2\" > "												
						+ "style=\"width:100%; padding-left:5px; \"> "						
            			+ "<option value=\"\">����</option>"
            			+ "</select></a>";
	
	// ��ǰ
	oCell4.innerHTML = "<a id=\"divItem\"><select "
						+ "name=\"input_item_id\" onKeyDown=\"moveNextBox(this); \" style=\"width:100%; padding-left:5px; \" tabindex=\"3\" > "
						+ "<option value=\"\">����</option> "
						+ "</select></a>";
	
	// ��������	
	oCell5.innerHTML = "<input type=\"text\" name=\"input_prod_dates\" class=\"normal\" value=\"\" "
						+ "onChange=\"chkDate(this,'8'); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"4\" >";
	
	// shift
	oCell6.innerHTML = "<select name=\"input_shift_type\" style=\"width:100%; \" tabindex=\"4\" > "
						+ "<option value=\"1\" >��</option> "
						+ "<option value=\"3\" >��</option> "
						+ "<option value=\"5\" >��</option> "
						+ "</select>";
	// �����Ͻ� date
//	oCell7.innerHTML = "<input type=\"text\" name=\"input_start_date\" class=\"normal\" value=\"\" "
//						+ "onChange=\"dateFormatCheck(this); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"5\" >";
	// �����Ͻ� time
//	oCell8.innerHTML = "<input type=\"text\" name=\"input_start_time\" class=\"normal\" value=\"\" "
//						+ "onChange=\"timeFormatCheck(this); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"6\" >";
	
	// �����Ͻ� date
//	oCell9.innerHTML = "<input type=\"text\" name=\"input_end_date\" class=\"normal\" value=\"\" " 
//					    + "onChange=\"dateFormatCheck(this); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"7\" >";	
					    
	// �����Ͻ� time
//	oCell10.innerHTML = "<input type=\"text\" name=\"input_end_time\" class=\"normal\" value=\"\" " 
//					    + "onChange=\"timeFormatCheck(this); \" style=\"width:100%; border:0px; text-align:center; \" tabindex=\"8\" >";					    
    
    // ����
    oCell11.innerHTML = "<input type=\"text\" name=\"input_shift_qty\" class=\"normal\ value=\"\" " 
					    + "onChange=\"checkNum(this,'BLANK_INT_UP'); \" style=\"width:100%; border:0px; text-align:right; padding-right:5px; \" tabindex=\"9\" >";					    
    
    // ������ȣ
    oCell12.innerHTML = "<input type=\"text\" name=\"input_ord_no\" class=\"normal\" value=\"\" " 
					    + "style=\"width:100%; border:0px; text-align:center; \" tabindex=\"10\" >";					    
    
    // ���� �׸� ��ȣ
    oCell13.innerHTML = "<input type=\"text\" name=\"input_ord_item_no\" class=\"normal\" value=\"\" " 
					    + "style=\"width:100%; border:0px; text-align:center; \" tabindex=\"11\" >";					    
           			    
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
	var tableLen = left_tbody.rows.length;
	delRowDo( tableLen - 1 );
	//alert(left_tbody.rows.length);
	addRow(left_tbody.rows.length);
	setLastRow();
		
} 

var arrData = new Array(13);
// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	 
	// value�� ����
	if(document.frm.input_plant_id[tableLen-1] && (tableLen-1) > 0)
		arrData[0] 	= document.frm.input_plant_id[tableLen-1].value; // ����			
	else
		arrData[0] 	= document.frm.input_plant_id.value; // ����
	
	if( document.frm.input_proc_id[tableLen-1] && (tableLen-1) > 0)
		arrData[1] 	= document.frm.input_proc_id[tableLen-1].value; // �۾���	
	else
		arrData[1] 	= document.frm.input_proc_id.value; // �۾���
		
	if(document.frm.input_item_id[tableLen-1] && (tableLen-1) > 0)
		arrData[2] 	= document.frm.input_item_id[tableLen-1].value; // ��ǰ
	else
		arrData[2] 	= document.frm.input_item_id.value; // ��ǰ
		
	if(document.frm.input_prod_dates[tableLen-1] && (tableLen-1) > 0)
		arrData[3] 	= document.frm.input_prod_dates[tableLen-1].value; // ��������
	else
		arrData[3] 	= document.frm.input_prod_dates.value; // ��������
	
	if(document.frm.input_shift_type[tableLen-1] && (tableLen-1) > 0)
		arrData[4] 	= document.frm.input_shift_type[tableLen-1].value; // SHIFT
	else
		arrData[4] 	= document.frm.input_shift_type.value; // SHIFT
		
//	if(document.frm.input_start_date[tableLen-1] && (tableLen-1) > 0)
//		arrData[5] 	= document.frm.input_start_date[tableLen-1].value; // �����Ͻ� DATE
//	else
//		arrData[5] 	= document.frm.input_start_date.value; // �����Ͻ� DATE
//		
//	if(document.frm.input_start_time[tableLen-1] && (tableLen-1) > 0)
//		arrData[6] 	= document.frm.input_start_time[tableLen-1].value; // �����Ͻ� TIME
//	else
//		arrData[6] 	= document.frm.input_start_time.value; // �����Ͻ� TIME
//		
//	if(document.frm.input_end_date[tableLen-1] && (tableLen-1) > 0)
//		arrData[7]	= document.frm.input_end_date[tableLen-1].value; // �����Ͻ� DATE
//	else
//		arrData[7]	= document.frm.input_end_date.value; //�����Ͻ� DATE
//		
//	if(document.frm.input_end_time[tableLen-1] && (tableLen-1) > 0)
//		arrData[8]	= document.frm.input_end_time[tableLen-1].value; // �����Ͻ� TIME
//	else
//		arrData[8]	= document.frm.input_end_time.value; //�����Ͻ� TIME
		
	if(document.frm.input_shift_qty[tableLen-1] && (tableLen-1) > 0)
		arrData[9]	= document.frm.input_shift_qty[tableLen-1].value; // ����
	else
		arrData[9]	= document.frm.input_shift_qty.value; // ����
		
	if(document.frm.input_ord_no[tableLen-1] && (tableLen-1) > 0)
		arrData[10]	= document.frm.input_ord_no[tableLen-1].value; // ������ȣ
	else
		arrData[10]	= document.frm.input_ord_no.value; //������ȣ
		
	if(document.frm.input_ord_item_no[tableLen-1] && (tableLen-1) > 0)
		arrData[11]	= document.frm.input_ord_item_no[tableLen-1].value; // ���� �׸� ��ȣ
	else
		arrData[11]	= document.frm.input_ord_item_no.value; //���� �׸� ��ȣ
	
	if(left_tbody.rows[tableLen-1] && (tableLen-1) > 0)
		arrData[12]  = left_tbody.rows[tableLen-1].style.backgroundColor; // üũ color
	else
		arrData[12]  = left_tbody.style.backgroundColor; // üũ color
	
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
	//alert(arrData[0]);
	// value�� ä��		
	if(document.frm.input_plant_id[tableLen-1].options){ // ����
		for( i = 0 ; i < document.frm.input_plant_id[tableLen-1].options.length ; i++){
			if(document.frm.input_plant_id[tableLen-1].options[i].value == arrData[0])
				document.frm.input_plant_id[tableLen-1].options[i].selected = true;
		}
		doChangeProc(document.frm.input_plant_id[tableLen-1]); //�۾��� select �±� ����
	}
	else{									// ����
		for( i = 0 ; i < document.frm.input_plant_id.options.length ; i++){
			if(document.frm.input_plant_id.options[i].value == arrData[0])
				document.frm.input_plant_id.options[i].selected = true;
		}
		doChangeProc(document.frm.input_plant_id); //�۾��� select �±� ����
	}
	
	if(document.frm.input_proc_id[tableLen-1].options){ // �۾���
		for( i = 0 ; i < document.frm.input_proc_id[tableLen-1].options.length ; i++){
			if(document.frm.input_proc_id[tableLen-1].options[i].value == arrData[1])
				document.frm.input_proc_id[tableLen-1].options[i].selected = true;
		}
		document.frm.stored_item.value = arrData[2];
		doChangeItemList(document.frm.input_proc_id[tableLen-1]); //��ǰ select �±� ����
	}
	else{									// �۾���
		for( i = 0 ; i < document.frm.input_proc_id.options.length ; i++){
			if(document.frm.input_proc_id.options[i].value == arrData[1])
				document.frm.input_proc_id.options[i].selected = true;
		}
		document.frm.stored_item.value = arrData[2];
		doChangeItemList(document.frm.input_proc_id); //��ǰ select �±� ����
	}
	
//	if(document.frm.input_item_id[tableLen-1].options){ // ��ǰ
//		for( i = 0 ; i < document.frm.input_item_id[tableLen-1].options.length ; i++){
//			if(document.frm.input_item_id[tableLen-1].options[i].value == arrData[2])
//				document.frm.input_item_id[tableLen-1].options[i].selected = true;
//		}
//	}
//	else{									// ��ǰ
//		for( i = 0 ; i < document.frm.input_item_id.options.length ; i++){
//			if(document.frm.input_item_id.options[i].value == arrData[2])
//				document.frm.input_item_id.options[i].selected = true;
//		}
//	}
	
	if(document.frm.input_prod_dates[tableLen-1])
		document.frm.input_prod_dates[tableLen-1].value	= arrData[3]; // ��������
	else
		document.frm.input_prod_dates.value	= arrData[3]; // ��������
	
	if(document.frm.input_shift_type[tableLen-1].options){ // shift
		for( i = 0 ; i < document.frm.input_shift_type[tableLen-1].options.length ; i++){
			if(document.frm.input_shift_type[tableLen-1].options[i].value == arrData[4])
				document.frm.input_shift_type[tableLen-1].options[i].selected = true;
		}
	}
	else{									// shift
		for( i = 0 ; i < document.frm.input_shift_type.options.length ; i++){
			if(document.frm.input_shift_type.options[i].value == arrData[4])
				document.frm.input_shift_type.options[i].selected = true;
		}
	}
			
//	if(document.frm.input_start_date[tableLen-1])		
//		document.frm.input_start_date[tableLen-1].value	= arrData[5]; // �����Ͻ� date
//	else
//		document.frm.input_start_date.value	= arrData[5]; // �����Ͻ� date
//			
//	if(document.frm.input_start_time[tableLen-1])
//		document.frm.input_start_time[tableLen-1].value = arrData[6]; // �����Ͻ� time
//	else	
//		document.frm.input_start_time.value = arrData[6]; // �����Ͻ� time
//		
//	if(document.frm.input_end_date[tableLen-1])
//		document.frm.input_end_date[tableLen-1].value = arrData[7]; // �����Ͻ� date
//	else	
//		document.frm.input_end_date.value = arrData[7]; // �����Ͻ� date
//		
//	if(document.frm.input_end_time[tableLen-1])
//		document.frm.input_end_time[tableLen-1].value = arrData[8]; // �����Ͻ� time
//	else
//		document.frm.input_end_time.value = arrData[8]; // �����Ͻ� time
		
	if(document.frm.input_shift_qty[tableLen-1])
		document.frm.input_shift_qty[tableLen-1].value = arrData[9]; // ����
	else	
		document.frm.input_shift_qty.value = arrData[9]; // ����
		
	if(document.frm.input_ord_no[tableLen-1])
		document.frm.input_ord_no[tableLen-1].value = arrData[10]; // ������ȣ
	else	
		document.frm.input_ord_no.value = arrData[10]; // ������ȣ
		
	if(document.frm.input_ord_item_no[tableLen-1])
		document.frm.input_ord_item_no[tableLen-1].value = arrData[11]; // �����׸��ȣ
	else	
		document.frm.input_ord_item_no.value = arrData[11]; // �����׸��ȣ
			
	if(left_tbody.rows[tableLen-1])
		left_tbody.rows[tableLen-1].style.backgroundColor = arrData[12]; // üũ color
	else
		left_tbody.style.backgroundColor = arrData[12]; // üũ color
	if(main_tbody.rows[tableLen-1])
		main_tbody.rows[tableLen-1].style.backgroundColor = arrData[12]; // üũ color
	else
		main_tbody.style.backgroundColor = arrData[12]; // üũ color
		
	document.recalc();
	
}

// ����
//function GoSave( service ) {
//	
//	var plantId = document.frm.selected_plant.value;
//	//������ �������� ���� ���
//	if( plantId == null || plantId == ""){
//		alert("������ ���� �����ϰ� ������ ��ȸ ��, ������ �����մϴ�.");
//		return;
//	}
//	var tableLen = left_tbody.rows.length;
//	var cnt = 0;	
//	
//	for( i = 0; i < tableLen; i++ ) { 		
//		//if( document.frm.plant_id == null){	break; }
//		//if( document.frm.plant_id[i]) {	
//		if( document.frm.item_id[i]) {	
//										
//			if( (document.frm.plant_id[i].value != null && document.frm.plant_id[i].value != "")
//				&& (document.frm.line_id[i].value != null && document.frm.line_id[i].value != "")
//				&& (document.frm.proc_id[i].value != null && document.frm.proc_id[i].value != "")
//				&& (document.frm.item_id[i].value != null && document.frm.item_id[i].value != "")				
//				&& (document.frm.excl_proc_id[i].value != null && document.frm.excl_proc_id[i].value != "")) {
//				cnt++;								
//				//alert("plant:"+document.frm.plant_id[i].value+" line:"+document.frm.line_id[i].value+" proc:"+document.frm.proc_id[i].value+" excl_proc:"+document.frm.excl_proc_id[i].value);
//			}		
//		}
//		else {					
//			if( (document.frm.plant_id.value != null && document.frm.plant_id.value != "")
//				&& (document.frm.line_id.value != null && document.frm.line_id.value != "")
//				&& (document.frm.proc_id.value != null && document.frm.proc_id.value != "")	
//				&& (document.frm.item_id.value != null && document.frm.item_id.value != "")			
//				&& (document.frm.excl_proc_id.value != null && document.frm.excl_proc_id.value != "")) {
//				cnt++;				
//				
//			}		
//		}
//		
//	}
//	// ������ ���ٵ� ���ﶧ
////	if(tableLen == 1 && cnt == 0){
////		cnt = 1;
////	}
//	//alert("cnt:" + cnt + ", tableLen:" + tableLen);
//	if( (cnt < 1) || (tableLen != cnt) ) {
//		alert("������ �����Ͱ� ���ų�, �������� ���� �׸��� �ֽ��ϴ�.");
//		return;
//	}
//	
//	// service_id ����
//	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
//	
//	document.frm._moon_service.value = service;
//	document.frm.action = "service.do";
//	document.frm.target = "_self";
//	document.frm.submit();
//	
//}

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

//replaceAll
function replaceAll(str,re,transChar){
	var len = str.length;
	
	for(j = 0; j < len; j++){
		str = str.replace(re,transChar);
	}
	
	return str;
};

// ��¥ üũ
function dateFormatCheck(obj){
	
	if( obj.value != "" && obj.value != null ) {
		// ��¥ üũ
		if( chkDate(obj, 8) == 0 ) {				
			obj.focus();
			return;
		}
	}	
}

// �ð� üũ
function timeFormatCheck(obj){
	
	if(obj.value != "" && obj.value != null ){
		if( obj.value.length != 6 ){
			alert("�ð��� 6�ڸ� �Դϴ�.(�Է����� 060000:HHMISS)");
			return;
		}
	}
}

// ���� ��ư Ŭ��
GoSave = function(service) {
	
	var tabLength = left_tbody.rows.length;
	
	// �Է� �� üũ
	if(tabLength > 1){
		for( i = 0; i < tabLength; i++ ){
			if( document.frm.input_plant_id[i].value == "" || document.frm.input_proc_id[i].value == "" 
				|| document.frm.input_item_id[i].value == "" || document.frm.input_prod_dates[i].value == "" 
//				|| document.frm.input_start_date[i].value == "" || document.frm.input_start_time[i].value == ""
//				|| document.frm.input_end_date[i].value == "" || document.frm.input_end_time[i].value == "" 
				|| document.frm.input_shift_qty[i].value == "" ){
				alert("�ʼ� �Է� ���� �Է� ���� �ʾҽ��ϴ�.");
				return;
			}
		}
	}
	else{
		if( document.frm.input_plant_id.value == "" || document.frm.input_proc_id.value == "" 
			|| document.frm.input_item_id.value == "" || document.frm.input_prod_dates.value == "" 
//			|| document.frm.input_start_date.value == "" || document.frm.input_start_time.value == ""
//			|| document.frm.input_end_date.value == "" || document.frm.input_end_time.value == "" 
			|| document.frm.input_shift_qty.value == "" ){
			alert("�ʼ� �Է� ���� �Է� ���� �ʾҽ��ϴ�.");
			return;
		}
	}
	
	var param = "plant_id!%!proc_id!%!input_prod_dates!%!input_shift_type";
	var value = ""; 
	if(tabLength == 1){
		value += document.frm.input_plant_id.value + "!%!" + document.frm.input_proc_id.value + "!%!";
		value += document.frm.input_prod_dates.value + "!%!" + document.frm.input_shift_type.value;
	}
	else{
		value += document.frm.input_plant_id[tabLength-1].value + "!%!" + document.frm.input_proc_id[tabLength-1].value + "!%!";
		value += document.frm.input_prod_dates[tabLength-1].value + "!%!" + document.frm.input_shift_type[tabLength-1].value;
	}
	commonUtil.getCodeInfo(param, value , "work_diary_check", { 
		callback:function(arrList){
			if( arrList.length < 1){	
				alert("�ش� SHIFT�� �� � Ķ������ �ٹ��� ���� ���� �ʽ��ϴ�.")
				return;
			}	
			else{
				var param = "plant_id!%!version!%!seq!%!item_id!%!input_proc_id!%!input_prod_dates!%!input_shift_type!%!input_ord_no!%!input_ord_item_no!%!cat_id";
				var value = ""; 
				if(tabLength == 1){
					value += document.frm.input_plant_id.value + "!%!" + document.frm.input_version.value + "!%!"
							+ document.frm.input_seq.value + "!%!" + document.frm.input_item_id.value + "!%!"
							+ document.frm.input_proc_id.value + "!%!" + document.frm.input_prod_dates.value + "!%!" 
							+ document.frm.input_shift_type.value + "!%!" + document.frm.input_ord_no.value + "!%!" 
							+ document.frm.input_ord_item_no.value + "!%!" + document.frm.input_cat_id.value;	
				}
				else{
					value += document.frm.input_plant_id[tabLength-1].value + "!%!" + document.frm.input_version[tabLength-1].value + "!%!"
							+ document.frm.input_seq.value + "!%!" + document.frm.input_item_id[tabLength-1].value + "!%!"
							+ document.frm.input_proc_id[tabLength-1].value + "!%!" + document.frm.input_prod_dates[tabLength-1].value + "!%!" 
							+ document.frm.input_shift_type[tabLength-1].value + "!%!" + document.frm.input_ord_no[tabLength-1].value + "!%!" 
							+ document.frm.input_ord_item_no[tabLength-1].value + "!%!" + document.frm.input_cat_id.value;	
				}	
									
				
				// �̵��� shift�� ������ �ִ��� üũ. ������ �޽��� ǥ��
				commonUtil.getCodeInfo(param, value , "move_target_check", { 
					callback:function(arrList){
						if( arrList.length > 0){	
							alert("��� �� SHIFT�� �̹� ��ȹ�� ���� �մϴ�.");
							return;											
						}
						else{
							frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;				
							document.frm._moon_service.value = service;
							document.frm.action = "service.do";
							document.frm.target = "_self"; 
							document.frm.submit();				
							opener.GoSearch("sc_11020_dailyProductionPlanAnalysisNew_list");
						}			
					}
				});	
					
			}				
		}
	});
	//alert("!!");
	
	this.focus();
		
};


// �۾��� ���� �� ��ǰ ����Ʈ ä��
function doChangeItemList(obj){
	
	var idx = obj.parentNode.parentNode.parentNode.rowIndex;
	var tableLen = left_tbody.rows.length;
	if(document.frm.input_plant_id[idx] && tableLen > 1)
		var plant_id = document.frm.input_plant_id[idx].value;
	else
		var plant_id = document.frm.input_plant_id.value;
	var proc_id = obj.value;
	
	var param = "plant_id!%!selected_proc";
	var value = plant_id + "!%!" + proc_id;
	
	commonUtil.getCodeInfo( param, value , "input_plant_proc_of_item_list", { 
		callback:function(arrList){
			if( arrList.length > 0){
				if(document.frm.stored_item)
					var item_id = document.frm.stored_item.value;
				else
					var item_id = "";
				
				var div_item = "<select name=\"input_item_id\" class=\"normal\" style=\"width:100% \">";
				div_item += "<option value=\"\">����</option>";
				for( i = 0 ; i < arrList.length; i++){
					div_item += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == item_id)
							div_item += " selected ";
					div_item += ">" + arrList[i][1] + "</option>";	
				}
				div_item += "</select>";
				if(divItem[idx] && tableLen > 1)
					divItem[idx].innerHTML = div_item;
				else
					divItem.innerHTML = div_item;
			}
			else{
				alert("��ġ�ϴ� ��ǰ�� �����ϴ�.");
				return;
			}			
		}
	});
}