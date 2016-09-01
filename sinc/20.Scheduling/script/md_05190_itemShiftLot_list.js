////////////////////////////////////////////////////////////
// ���α׷�ID : md_05190_itemShiftLot_list.js
// ���α׷��� : �ּһ��귮 �������� (��ȸ)
// ������  : ���ؼ�
// �������� : 2008-11-26 ������
//
//���� job file : job_sinc_20_scheduling_04.xml
//
//���� query file : query_sinc_20_scheduling_04.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-11-26  ���ؼ�     md_05190_itemShiftLot_list.js ����
//
//
////////////////////////////////////////////////////////////


// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee";
		main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		
		if(document.frm.v_item_id[rowIdx]){
			document.frm.v_item_id[rowIdx].style.backgroundColor = "#eeeeee"; 
			document.frm.v_item_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.base_val[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.uom[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.cd_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.first_qty[rowIdx].style.backgroundColor = "#eeeeee";
		}
		else{
			document.frm.v_item_id.style.backgroundColor = "#eeeeee"; 
			document.frm.v_item_name.style.backgroundColor = "#eeeeee";
			document.frm.base_val.style.backgroundColor = "#eeeeee";
			document.frm.uom.style.backgroundColor = "#eeeeee";
			document.frm.cd_name.style.backgroundColor = "#eeeeee";
			document.frm.first_qty.style.backgroundColor = "#eeeeee";
		}
	} 
	else {
		left_tbody.rows.style.backgroundColor = "#eeeeee";  
		main_tbody.rows.style.backgroundColor = "#eeeeee"; 
		
		if(document.frm.v_item_id[rowIdx]){
			document.frm.v_item_id[rowIdx].style.backgroundColor = "#eeeeee"; 
			document.frm.v_item_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.base_val[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.uom[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.cd_name[rowIdx].style.backgroundColor = "#eeeeee";
			document.frm.first_qty[rowIdx].style.backgroundColor = "#eeeeee";
		}
		else{
			document.frm.v_item_id.style.backgroundColor = "#eeeeee"; 
			document.frm.v_item_name.style.backgroundColor = "#eeeeee";
			document.frm.base_val.style.backgroundColor = "#eeeeee";
			document.frm.uom.style.backgroundColor = "#eeeeee";
			document.frm.cd_name.style.backgroundColor = "#eeeeee";
			document.frm.first_qty.style.backgroundColor = "#eeeeee";
		}
	}
	
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		
		if(document.frm.v_item_id[rowIdx]){
			document.frm.v_item_id[rowIdx].style.backgroundColor = "#ffffff"; 
			document.frm.v_item_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.base_val[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.uom[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.cd_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.first_qty[rowIdx].style.backgroundColor = "#ffffff";
		}
		else{
			document.frm.v_item_id.style.backgroundColor = "#ffffff"; 
			document.frm.v_item_name.style.backgroundColor = "#ffffff";
			document.frm.base_val.style.backgroundColor = "#ffffff";
			document.frm.uom.style.backgroundColor = "#ffffff";
			document.frm.cd_name.style.backgroundColor = "#ffffff";
			document.frm.first_qty.style.backgroundColor = "#ffffff";
		}
	} 
	else { 
		left_tbody.rows.style.backgroundColor = "#ffffff";
		main_tbody.rows.style.backgroundColor = "#ffffff";
		
		if(document.frm.v_item_id[rowIdx]){
			document.frm.v_item_id[rowIdx].style.backgroundColor = "#ffffff"; 
			document.frm.v_item_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.base_val[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.uom[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.cd_name[rowIdx].style.backgroundColor = "#ffffff";
			document.frm.first_qty[rowIdx].style.backgroundColor = "#ffffff";
		}
		else{
			document.frm.v_item_id.style.backgroundColor = "#ffffff"; 
			document.frm.v_item_name.style.backgroundColor = "#ffffff";
			document.frm.base_val.style.backgroundColor = "#ffffff";
			document.frm.uom.style.backgroundColor = "#ffffff";
			document.frm.cd_name.style.backgroundColor = "#ffffff";
			document.frm.first_qty.style.backgroundColor = "#ffffff";
		}
	}
	
}

// �˻�
function GoSearch(service) {
	
	// ����
	var plant = document.frm.selected_plant.value;
	if( plant == "" || plant == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1";
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// ����
function GoSave( service ) {
	
	var plant = document.frm.selected_plant.value;
	
	if(plant == "" || plant == null){
		alert("������ �����ϰ� ��ȸ �Ͻ� �� ���� ��ư�� Ŭ���ϼ���.");
		return;
	}
	
	viewWait();
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// enter check �� 
function enterCheck(frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			// �ڱ�ȭ�� ����
			getItemNameSearch(document.frm.item_id, frm_name);
			//GoSearch(frm_name);
		}
	} 
	
}

// ��ǰ �˻� popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup â�� input box ǥ�� data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}

// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemNameSearch(objBox, service) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else {
				document.frm.item_name.value = "";
			}
			GoSearch(service);
		}
	});
	
}

// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else {
				document.frm.item_name.value = "";
			}
		}
	});
	
}

function setUom(obj){
	if(obj.value == ""){
		obj.parentNode.nextSibling.childNodes(0).value = "";
	}
	else{
		obj.parentNode.nextSibling.childNodes(0).value = "SHIFT";
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
	oRowLeft.height = 22;  
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 22; 
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����		
	var oCell2 = oRowLeft.insertCell(); // ��ǰ�ڵ�	
	var oCell3 = oRowLeft.insertCell(); // ��ǰ��
	
	var oCell4 = oRowMain.insertCell(); // ��������
	var oCell5 = oRowMain.insertCell(); // UOM
	var oCell6 = oRowMain.insertCell(); // ����
	var oCell7 = oRowMain.insertCell(); // ���ʺ��ҹ���
		
	oCell0.align = "center"; oCell0.width = "30px";  // ��ȣ
	oCell1.align = "center"; oCell1.width = "30px";  // ����	
	oCell2.width = "80px";  // ��ǰ�ڵ�	
	oCell3.width = "250px"; // ��ǰ��

	oCell4.width = "60px";  // ��������
	oCell5.width = "50px";  // UOM
	oCell6.width = "60px";  // ����	
	oCell7.width = "60px";  // ���ʺ��ҹ���
		
	// ��ȣ 
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>"
						+"<input type=\"hidden\" name=\"plant_id\" > "            								
            			+"<input type=\"hidden\" name=\"plant_name\" > ";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	
	// ����
	oCell1.innerHTML = "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";	
	// ǰ���ڵ�
	oCell2.innerHTML = "<input type=\"text\" name=\"v_item_id\" class=\"normal\" " 
						+ "style=\"height:100%; width:100%; border:0px; text-align:center;\" readonly > ";

	// ǰ���
	oCell3.innerHTML = "<input type=\"text\" name=\"v_item_name\" class=\"normal\" "
						+ "style=\"height:100%; width:100%; border:0px; padding-left:5px; text-align:left;\" readonly > ";
	// ��������
	oCell4.innerHTML = "<input type=\"text\" name=\"base_val\" class=\"normal\" onChange=\"setUom(this);\" "
						+ "style=\"height:100%; width:100%; padding-right:5px; text-align:right;\" >	";
	// UOM
	oCell5.innerHTML = "<input type=\"text\" name=\"uom\" class=\"normal\" " 
						+ "style=\"height:100%; width:100%; border:0px; text-align:center;\" readonly  >";						

	// ����
	oCell6.innerHTML = "<input type=\"text\" name=\"cd_name\" class=\"normal\" " 
						+ "style=\"height:100%; width:100%; border:0px; text-align:center;\" readonly  >";
	
	// ���ʺ��ҹ���
	oCell7.innerHTML = "<input type=\"text\" name=\"first_qty\" class=\"normal\" "
						+ "style=\"height:100%; width:100%; padding-right:5px; text-align:right;\" >";
		
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
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	if( tableLen > 1 )
	{
		delRowDo( delRowIdx ); 
		rowFormed(); //<--1
	}
	else{
		delRowDo( delRowIdx );
		//addRow(left_tbody.rows.length);
		rowFormed();
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
	var tableLen = left_tbody.rows.length;
	if(tableLen == 0) return;
	memLastRow();
	delRowDo( tableLen - 1 );
	addRow(left_tbody.rows.length);
	setLastRow();
		
} 

var arrData = new Array(8);

// �� �ϴ� ���� ������ ���
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	// div ���ڿ� ����
	
	if(document.frm.plant_id[tableLen-1]){ 
		arrData[0] 	= document.frm.plant_id[tableLen-1].value;   //�����ڵ�
		arrData[1] 	= document.frm.plant_name[tableLen-1].value; //�����
		arrData[2] 	= document.frm.v_item_id[tableLen-1].value;    //��ǰ�ڵ�
		arrData[3] 	= document.frm.v_item_name[tableLen-1].value;  //��ǰ��
		arrData[4] 	= document.frm.base_val[tableLen-1].value;   //��������
		arrData[5] 	= document.frm.uom[tableLen-1].value;        //UOM
		arrData[6] 	= document.frm.cd_name[tableLen-1].value;    //����
		arrData[7] 	= document.frm.first_qty[tableLen-1].value;  //���ʺ��ҹ���
	}
	else{
		arrData[0] 	= document.frm.plant_id.value;   //�����ڵ�
		arrData[1] 	= document.frm.plant_name.value; //�����
		arrData[2] 	= document.frm.v_item_id.value;    //��ǰ�ڵ�
		arrData[3] 	= document.frm.v_item_name.value;  //��ǰ��
		arrData[4] 	= document.frm.base_val.value;   //��������
		arrData[5] 	= document.frm.uom.value;        //UOM
		arrData[6] 	= document.frm.cd_name.value;    //����
		arrData[7] 	= document.frm.first_qty.value;  //���ʺ��ҹ���
	}
}

// �� �ϴ� ���� ������ ä��
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;

	if(document.frm.plant_id[tableLen-1]){ 
		document.frm.plant_id[tableLen-1].value = arrData[0]; 	//�����ڵ�
		document.frm.plant_name[tableLen-1].value = arrData[1]; //�����
		document.frm.v_item_id[tableLen-1].value = arrData[2];    //��ǰ�ڵ�
		document.frm.v_item_name[tableLen-1].value = arrData[3];  //��ǰ��
		document.frm.base_val[tableLen-1].value = arrData[4];   //��������
		document.frm.uom[tableLen-1].value = arrData[5];        //UOM
		document.frm.cd_name[tableLen-1].value = arrData[6];    //����
		document.frm.first_qty[tableLen-1].value = arrData[7];  //���ʺ��ҹ���
	}
	else{
		document.frm.plant_id.value = arrData[0]; 	//�����ڵ�
		document.frm.plant_name.value = arrData[1]; //�����
		document.frm.v_item_id.value = arrData[2];    //��ǰ�ڵ�
		document.frm.v_item_name.value = arrData[3];  //��ǰ��
		document.frm.base_val.value = arrData[4];   //��������
		document.frm.uom.value = arrData[5];        //UOM
		document.frm.cd_name.value = arrData[6];    //����
		document.frm.first_qty.value = arrData[7];  //���ʺ��ҹ���
	}
	
}

