
// Ŭ���� ���� �ε���   
var clickedLineIdx = null;
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var popImgIdx = null;


//�߿������ ���� �� �����ι� ���� �� �������� ��ȯ  
function setLine_EditMode( objTd ) {  
    
	if( objTd.parentNode ){   
		var i = objTd.parentNode.rowIndex;	//������ row index
			if( (document.frm.plant_id[i].value == null && document.frm.plant_id[i].value == "")
				&& (document.frm.line_id[i].value == null && document.frm.line_id[i].value == ""))
			{
				alert("����  �� �����ι��� ���� ������ �ּ���. ");			
			}else{      
				//alert("childNodes===>" +  objTd.childNodes(0).childNodes(1).tagName.toUpperCase());   //<BR>
				alert("childNodes===>" +  objTd.childNodes(1).childNodes(1).tagName.toUpperCase());
				objTd.childNodes(1).childNodes(1).focus();    			   	 	
			}       	        
	}  

}

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	 
	objTd.childNodes(0).style.display = "none";		
	objTd.childNodes(1).style.display = "block";

	if( objTd.childNodes(1).tagName.toUpperCase() == "SELECT") { // ���弿�� ���                              
		objTd.childNodes(1).focus();
	}
	else if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "INPUT"){
		objTd.childNodes(1).childNodes(0).select();
	} 
	else {//if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "SELECT" ) {// ���� ���� ���	
			//alert("childNodes===>" +  objTd.childNodes(1).childNodes(0).tagName.toUpperCase());		
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
			main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			main_tbody.rows.style.backgroundColor = "#eeeeee"; 
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
			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		}
	} 
	else { 
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			main_tbody.rows.style.backgroundColor = "#ffffff";
		}
	}	
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
	oRowLeft.height = 30;  
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 30; 
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����		

	var oCell2 = oRowLeft.insertCell(); // ����	
	var oCell3 = oRowMain.insertCell(); // �����ι�
	var oCell4 = oRowMain.insertCell(); // ��ü����
	var oCell5 = oRowMain.insertCell(); // �����
	var oCell6 = oRowMain.insertCell(); // �߿����
	var oCell7 = oRowMain.insertCell(); // ��ȹ�ݿ��켱����
	var oCell8 = oRowMain.insertCell(); // �����������ܿ���	
	
	oCell2.onclick = function() { setEditMode(this); }; // ����
	oCell3.onclick = function() { setEditMode(this); }; // �����ι�
	oCell4.onclick = function() { setEditMode(this); }; // ��ü����
	oCell5.onclick = function() { setEditMode(this); }; // �����	
	oCell6.onclick = function() { setEditMode(this); }; // �߿����
	oCell7.onclick = function() { setEditMode(this); }; // �켱����
	oCell8.onclick = function() { setEditMode(this); }; // ���ܿ���
	  	
	oCell0.align = "center"; oCell0.width = "30px";  // ��ȣ
	oCell1.align = "center"; oCell1.width = "40px";  // ����	
	
	oCell2.align = "center"; oCell2.width = "100px";    // ����	 
	oCell3.align = "center"; oCell3.width   = "50px";   // �����ι�
	oCell4.align = "center"; oCell4.width   = "50px";   // ��ü����
	oCell5.align = "center"; oCell5.width = "50px";     // �����	
	oCell6.align = "center"; oCell6.width   = "50px";   // �߿����
	oCell7.align = "center"; oCell7.width = "80px";     // �켱����	
	oCell8.align = "center"; oCell8.width = "800px";    // ���ܿ���
				  
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
						
	// �����ι�
	oCell3.innerHTML = "<a id=\"divLine\">\</a><a id=\"divLineSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \" ><select "
						+ "name=\"line_id\" onChange=\" doChangeGridCost(this);\" onKeyDown=\"moveNextBox(this); \" tabindex=\"2\" "												
						+ "style=\"width:100%; padding-left:5px; \">"						
            			+ "<option value=\"\"></option> "
            			+ "</select></a>";
	
	// ��ü����
	oCell4.innerHTML = "";  
	
	// �����
	oCell5.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemIdSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"op_line\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"4\" "
						+ "style=\"width:73PX; padding-right:5px; text-align:cneter; \" > "
						+ "</a> ";
 
	// �߿���� 
	oCell6.innerHTML = "<a id=\"divIPLine\"></a><a id=\"divIPLineSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \"><select "
						+ "name=\"exec_line\"  onKeyDown=\"moveNextBox(this); \" tabindex=\"5\" "
						+ "onChange=\" \" style=\"width:100%; padding-left:5px; \"> "
						+ "<option value=\"\"></option> "	
						+ "</select></a>"; 
	  
	// ��ȹ�ݿ��켱����  
	oCell7.innerHTML = "<a id=\"divPrioritySpec\"></a><a id=\"divPrioritySelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"priority\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"6\" "
						+ "style=\"width:100%; padding-right:5px; text-align:cneter; \" > "
						+ "</a> ";
        			    
	// ���� ���ܿ��� 
	oCell8.innerHTML = "<a id=\"divBnFlagSpec\"></a><a id=\"divBnFlagSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"bn_flag\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"7\" "
						+ "style=\"width:100%; padding-right:5px; text-align:cneter; \" > "
						+ "</a> ";
   	 
	//document.recalc();
	setRowNo();  
	
}


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
	
	//������ row�� plant_id
	var curPlant_id     = document.frm.plant_id[delRowIdx].value;
	var curLine_id      = document.frm.line_id[delRowIdx].value;
	var curExecLine     = document.frm.exec_line[delRowIdx].value;
    var cnt = 0;
    
    if(curExecLine == "ALL"){
		for(var i = 0; i < tableLen ; ++i){			
			if(curPlant_id == document.frm.plant_id[i].value && curLine_id == document.frm.line_id[i].value){
				var exec_line = document.frm.exec_line[i].value;
				 				
				if(exec_line != "ALL")
				cnt++; 
			} 
		} 		 
		 
		if(cnt < 1){
			if( tableLen > 1 )
			{
				delRowDo( delRowIdx ); 
				rowFormed(); //<--1
			}
			else{
				delRowDo( delRowIdx );
				addRow(left_tbody.rows.length);
			}  
		}else{ 
			alert("���� �߿������ �����Ƿ�  ���� �Ͻ� �� �����ϴ� ");
		}  
    }else{
		if( tableLen > 1 )
		{
			delRowDo( delRowIdx ); 
			rowFormed(); //<--1
		}
		else{
			delRowDo( delRowIdx );
			addRow(left_tbody.rows.length);
		}    	
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
		arrDisplayData[1] 	= divLine[tableLen-1].innerHTML; // �����ι�	
		lineList			= divLineSelect[tableLen-1].innerHTML // line select box list
	}
	else{
		arrDisplayData[1] 	= divLine.innerHTML; // �����ι�
		lineList			= divLineSelect.innerHTML // line select box list
	}
	
	if(divProc[tableLen-1]){
		arrDisplayData[2] 	= divProc[tableLen-1].innerHTML; // ��ü����		
		procList			= divProcSelect[tableLen-1].innerHTML; //
	}
	else{
		arrDisplayData[2] 	= divProc.innerHTML; // ��ü����		
		procList			= divProcSelect.innerHTML; // 
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
		arrData[1] 	= document.frm.line_id[tableLen-1].value; // �����ι�
	else
		arrData[1] 	= document.frm.line_id.value; // �����ι�	
		
	if(document.frm.total_line[tableLen-1])
		arrData[2] 	= document.frm.total_line[tableLen-1].value; // ��ü����	
	else
		arrData[2] 	= document.frm.total_line.value; // ��ü����
		
	if(document.frm.op_line[tableLen-1])
		arrData[3] 	= document.frm.op_line[tableLen-1].value; // �����
	else
		arrData[3] 	= document.frm.op_line.value; // �����
			
	if(document.frm.priority[tableLen-1])
		arrData[4] 	= document.frm.priority[tableLen-1].value; // �԰�		
	else
		arrData[4] 	= document.frm.priority.value; // �԰�		
		
	if(document.frm.bn_flag[tableLen-1])
		arrData[5] 	= document.frm.bn_flag[tableLen-1].value; // ���ð��� �Ұ�ȣ��
	else
		arrData[5] 	= document.frm.bn_flag.value; // ���ð��� �Ұ�ȣ��
		
	//alert(plant.value+","+line.value+","+proc.value+","+exclProc.value+","+arrData);
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
		
	// value�� ä��		
	if(document.frm.plant_id[tableLen-1]){ // ����
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
		
	if(document.frm.total_line[tableLen-1])		
		document.frm.total_line[tableLen-1].value		= arrData[2]; // ��ü����		
	else
		document.frm.total_line.value		= arrData[2]; // ��ü����
			
	if(document.frm.op_line[tableLen-1])
		document.frm.op_line[tableLen-1].value		= arrData[3]; // �����
	else	
		document.frm.op_line.value		= arrData[3]; // �����
		
	if(document.frm.priority[tableLen-1])
		document.frm.priority[tableLen-1].value 	= arrData[4]; // �԰�
	else
		document.frm.priority.value 	= arrData[4]; // �԰�
		
	if(document.frm.bn_flag[tableLen-1])
		document.frm.bn_flag[tableLen-1].value = arrData[5]; // ���ð��� �Ұ�ȣ��	
	else	
		document.frm.bn_flag.value = arrData[5]; // ���ð��� �Ұ�ȣ��
				
	// div ä��
	if(divPlant[tableLen-1])
		divPlant[tableLen-1].innerHTML = arrDisplayData[0]; // ����
	else
		divPlant.innerHTML = arrDisplayData[0]; // ����
	
	if(divLine[tableLen-1]){	
		divLine[tableLen-1].innerHTML = arrDisplayData[1]; // �����ι�
		divLineSelect[tableLen-1].innerHTML = lineList;		
	}
	else{
		divLine.innerHTML = arrDisplayData[1]; // �����ι�
		divLineSelect.innerHTML = lineList;	
	}
	
	if(divProc[tableLen-1]){	
		divProc[tableLen-1].innerHTML = arrDisplayData[2]; // ��ü����
		divProcSelect[tableLen-1].innerHTML = procList;
	}
	else{
		divProc.innerHTML = arrDisplayData[2]; // ��ü����	
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
  
	var tableLen = left_tbody.rows.length;
	var cnt = 0;	
  	
  	var all_tmp  = "";  //��ü
  	var part_tmp = "";  //���� 
  	var tot_tmp  = "";  //�ߺ�Ű check
  	
  	for(var k = 0; k < tableLen; k++){ 
  		var exec_line = document.frm.exec_line[k].value;  
  		
  		//�߿������ "ALL"�� �͵�  
  		if(exec_line == "ALL"){   			 
  			all_tmp  += document.frm.plant_id[k].value + "-" + document.frm.line_id[k].value + ",";
  		}else{  
  			part_tmp += document.frm.plant_id[k].value + "-" + document.frm.line_id[k].value + ","; 
  		}
  		
  		//�ߺ�Ű check
  		tot_tmp  += document.frm.plant_id[k].value + "-" + document.frm.line_id[k].value + "-" + exec_line + ",";
  		          	
  	}   
  	
  	var all_tmp_arr = null;
  	    all_tmp_arr = all_tmp.split(",");

  	var part_tmp_arr = null;
  	    part_tmp_arr = part_tmp.split(",");
  	
  	
  	//�ߺ�Ű check
  	var tot_tmp_arr = null;
        tot_tmp_arr = tot_tmp.split(",");
          	
  	var all_len  = all_tmp_arr.length-1;
  	var part_len = part_tmp_arr.length-1;
  	var tot_len = tot_tmp_arr.length-1;
  	 
  	var part_cnt = 0;  
  	
  	for(var j=0; j<part_tmp_arr.length-1; j++){	 	 
  		for(var m=0; m<all_tmp_arr.length-1; m++){
			if(part_tmp_arr[j] == all_tmp_arr[m]){
				part_cnt++; 
 			}
  		} 
  	}  
    
    //�ߺ�Ű CHECK  	
 	for(var n=0; n<tot_len; n++){	 	 
		var tempA = tot_tmp_arr[n];	    	     
		for(x=n+1; x<tot_len; x++) 	
			{	 
				var tempB = tot_tmp_arr[x];
			     			    
			    if(tempA == tempB){
				    //alert("tempA===>" + tempA + "tempB====>" + tempB);	    
				    alert("�����Ϸ��� ���� �ߺ��Ǿ� �ֽ��ϴ�.");
				    return;
				}     
			} 
  	}    

  	//�߿���ο� ���������� ���� �߰� �����ÿ��� ���� �ȵ�.
  	if(part_len != part_cnt){		
  		alert("�߿���ο� ALL�� ���� �߰��ϼ���");
  		return;
  	} 
 
 	for( i = 0; i < tableLen; i++ ) {
		if( document.frm.exec_line[i]) {											
			if( (document.frm.plant_id[i].value != null && document.frm.plant_id[i].value != "")
				&& (document.frm.line_id[i].value != null && document.frm.line_id[i].value != "")
				&& (document.frm.exec_line[i].value != null && document.frm.exec_line[i].value != "")) 
				{
				cnt++;								
				//alert("plant:"+document.frm.plant_id[i].value+" line:"+document.frm.line_id[i].value+" proc:"+document.frm.total_line[i].value+" excl_proc:"+document.frm.bn_flag[i].value);
			}		
		}
		else {					
			if( (document.frm.plant_id.value != null && document.frm.plant_id.value != "")
				&& (document.frm.line_id.value != null && document.frm.line_id.value != "")
				&& (document.frm.exec_line.value != null && document.frm.exec_line.value != ""))
				 {
				cnt++;		  
			}		
		}		    
	}
	   	
	// ������ ���ٵ� ���ﶧ
//	if(tableLen == 1 && cnt == 0){
//		cnt = 1;
//	}
	//alert("cnt:" + cnt + ", tableLen:" + tableLen);
	/*
	if( (cnt < 1) || (tableLen != cnt) ) {   
		alert("������ �����Ͱ� ���ų�, �������� ���� �׸��� �ֽ��ϴ�.");
		return;
	}
	*/
	     
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
		// ���� --> ��ü����
		else if( objName == "line_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[1];								
			}
			else {
				objTdG = main_tbody.rows.cells[1];
			}
		}
		// ��ü���� --> �����
		else if( objName == "total_line" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// ����� --> �߿����
		else if( objName == "op_line" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = main_tbody.rows.cells[3];
			}
		}
		// �߿���� --> ��ȹ�ݿ��켱���� 
		else if( objName == "priority" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else {
				objTdG = main_tbody.rows.cells[4];
			}  
		}
		// ��ȹ�ݿ��켱���� --> �����������ܿ���
		else if( objName == "bn_flag" ) {
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


function doChangeGridCost(obj){
 
 	document.frm.changeEventFlag.value = "Y";
  
	if(!obj || !obj.value) return;
		
	//html��  ��<td>�� rowIndex
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex; 
	var tableLen = left_tbody.rows.length;
	var cost_id = obj.value;
    
		if(rowIdx == 0 && tableLen < 2){
    		if(document.frm.plant_id[rowIdx]){
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
    	
    	if(cost_id == "" || cost_id == null){
    		return;
    	}
	 
	//�߿����  
	scheduling.getProcInfo2("plant_id", plant_id, "cost_id", cost_id, "grid_execLine_list", { 
		callback:function(arrList){
					 
			// ��ġ�ϴ� ��� ����
			if( arrList.length == 0 ) {
				alert("��ġ�ϴ� ��� ����Ʈ��  �����ϴ�.");
			}
			else {
				var exec_line = document.frm.exec_line.value; 
				
				var divIPLine = "<select name=\"exec_line\" style=\"width:100%; padding-left:5px \" ";
				divIPLine += "onKeyDown=\"moveNextBox(this); \" >";
				
				for( i = 0; i < arrList.length; i++){  					 
					divIPLine += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == exec_line) 
							divIPLine += " selected ";
                        
							divIPLine += ">" + arrList[i][1] + "</option>";												
				}      
				divIPLine += "</select>";
				  
				if(divIPLineSelect[rowIdx])
					divIPLineSelect[rowIdx].innerHTML = divIPLine;
				else
					divIPLineSelect.innerHTML = divIPLine;
			}
						  
		}
	});	  	   

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

 

  
