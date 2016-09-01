////////////////////////////////////////////////////////////
// ���α׷�ID : md_04100_crossDockMst_list.js
// ���α׷��� : �߰���۰�������
// ������  : ���ؼ�
// �������� : 2008-09-18 �����
//
//���� job file : job_sinc_70_masterData_00.xml
//
//���� query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-09-18  ���ؼ�     md_04100_crossDockMst_list.js ����
//
//
////////////////////////////////////////////////////////////

function compLoc(objBox){
	if(document.frm.src_loc_sel.value == document.frm.tgt_loc_sel.value){
		alert("�߰���۰����� �԰����� ������ ���� ������ �� �����ϴ�.");
		if(objBox.name == "src_loc_sel"){
			document.frm.src_loc_sel.value = "";
		}else{
			document.frm.tgt_loc_sel.value = "";
		}
		return;
	}
}
function allCheck(){
	var rightLen = right_tbody.rows.length;
	
	if( document.frm.all_check_flag.checked ){
		if(rightLen == 0){
			document.frm.all_check_flag.checked = false;
			return;
		}
		else if(rightLen == 1){
			// ������ : �������� ǰ�� Row ���� 1�ΰ��
			if( document.frm.right_check_flag[0] && document.frm.right_check_flag[0].checked ) {
				document.frm.right_check_flag[0].checked = true;
			}
			else if( document.frm.right_check_flag.checked ) {
				document.frm.right_check_flag.checked = true;
			}		
		}
		else{
			for( var i=0 ; i < rightLen ; i++ ) {
				document.frm.right_check_flag[i].checked = true;			
			}	
		}
	}
	else{
		if(rightLen == 0){
			return;
		}
		else if(rightLen == 1){
			// ������ : �������� ǰ�� Row ���� 1�ΰ��
			if( document.frm.right_check_flag[0] && document.frm.right_check_flag[0].checked ) {
				document.frm.right_check_flag[0].checked = false;
			}
			else if( document.frm.right_check_flag.checked ) {
				document.frm.right_check_flag.checked = false;
			}		
		}
		else{
			for( var i=0 ; i < rightLen ; i++ ) {
				document.frm.right_check_flag[i].checked = false;		
			}	
		}
	}
}


// �߰� ��ư�� �������..
// ���� �׸��忡 ���õ� Row�� �߰��ϰ�, ������ �׸��忡 ���õ� Row�� �����ϴ� function
function addItem(){
	var rightLen = right_tbody.rows.length;
	var checked_flag = 0;
	
	// 1. ���� �׸��忡 ���õ� Row�� �߰��ϴ� �κ�.
	if(rightLen == 0){
		alert("�߰��� ����Ÿ�� �������� �ʽ��ϴ�. ���� ��ȸ�� �� �ֽʽÿ�!");
		return;
	}else if(rightLen == 1){
		// ������ : ������ ǰ�� Row ���� 1�ΰ��
		if(document.frm.right_check_flag[0] && document.frm.right_check_flag[0].checked){
			addLeftRow(0);
			checked_flag ++;
		}else if( document.frm.right_check_flag.checked ) {
			addLeftRow(0);
			checked_flag ++;
		}		
	}else{
		for( var i=0 ; i < rightLen ; i++ ) {
			if( document.frm.right_check_flag[i].checked ) {
				addLeftRow(i);
				checked_flag ++;
			}			
		}	
	}
	
	if(checked_flag == 0){
		alert("�߰��� ǰ���� �����Ͽ� �ֽʽÿ�!");
		return;
	}
	
	// 2. ���� �׸����� Total Row ���� ���ؼ�, areaLeftTot�� �ݿ�
	var leftTableLen = left_tbody.rows.length;
	areaLeftTot.innerHTML = leftTableLen;
	
	// 3. ������ �׸��忡 ���õ� Row�� �����ϴ� �κ�.
	if(rightLen == 1){
		// ������ : ������ ǰ�� Row ���� 1�ΰ��
		if(document.frm.right_check_flag[0] && document.frm.right_check_flag[0].checked){
			delRightRow(0);
		}else if( document.frm.right_check_flag.checked ) {
			delRightRow(0);
		}else{
			
		}		
	}else{
		for( var i=0 ; i < rightLen ; i++ ) {
			if( document.frm.right_check_flag[i] && document.frm.right_check_flag[i].checked ) {
				delRightRow(i);
				i--;
				
				if(right_tbody.rows.length == 0)
					break;
			}	
		}	
	}
	
	// 4. ������ �׸����� Total Row ���� ���ؼ�, areaRightTot�� �ݿ�
	var rightTableLen = right_tbody.rows.length;
	areaRightTot.innerHTML = rightTableLen;
	
	document.frm.all_check_flag.checked = false;
}


// ���� ��ư�� �������..
// ������ �׸��忡 ���õ� Row�� �߰��ϰ�, ���� �׸��忡 ���õ� Row�� �����ϴ� function
function delItem(){
	var leftLen = left_tbody.rows.length;
	var checked_flag = 0;
	
	// 1. ������ �׸��忡 ���õ� Row�� �߰��ϴ� �κ�.
	if(leftLen == 0){
		alert("������ ����Ÿ�� �������� �ʽ��ϴ�. ���� ��ȸ�� �� �ֽʽÿ�!");
		return;
	}else if(leftLen == 1){
		// ���� : �������� ǰ�� Row ���� 1�ΰ��
		if( document.frm.left_check_flag[0] && document.frm.left_check_flag[0].checked ) {
			addRightRow(0);
			checked_flag ++;
		}else if( document.frm.left_check_flag.checked ) {
			addRightRow(0);
			checked_flag ++;
		}		
	}else{
		for( var i=0 ; i < leftLen ; i++ ) {
			if( document.frm.left_check_flag[i].checked ) {
				addRightRow(i);
				checked_flag ++;
			}			
		}	
	}
	
	if(checked_flag == 0){
		alert("������ ǰ���� �����Ͽ� �ֽʽÿ�!");
		return;
	}
	
	// 2. ������ �׸����� Total Row ���� ���ؼ�, areaRightTot�� �ݿ�
	var rightTableLen = right_tbody.rows.length;
	areaRightTot.innerHTML = rightTableLen;
	
	// 3. ���� �׸��忡 ���õ� Row�� �����ϴ� �κ�.
	if(leftLen == 1){
		// ���� : �������� ǰ�� Row ���� 1�ΰ��
		if( document.frm.left_check_flag[0] && document.frm.left_check_flag[0].checked ) {
			delLeftRow(0);
		}else if( document.frm.left_check_flag.checked ) {
			delLeftRow(0);
		}		
	}else{
		for( var i=0 ; i < leftLen ; i++ ) {
			if( document.frm.left_check_flag[i] && document.frm.left_check_flag[i].checked ) {
				delLeftRow(i);
				i--;
				
				if(left_tbody.rows.length == 0)
					break;
			}		
		}	
	}
	
	// 4. ���� �׸����� Total Row ���� ���ؼ�, areaLeftTot�� �ݿ�
	var leftTableLen = left_tbody.rows.length;
	areaLeftTot.innerHTML = leftTableLen;
}

// ���� �׸��� row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addLeftRow( rowIndex ) {
	
	var leftLen = left_tbody.rows.length;
	
	if(document.frm.rightCdName[rowIndex]){
		var cd_name = document.frm.rightCdName[rowIndex].value;
		var item_id = document.frm.rightItemId[rowIndex].value;
		var item_name = document.frm.rightItemName[rowIndex].value;
	}else{
		var cd_name = document.frm.rightCdName.value;
		var item_id = document.frm.rightItemId.value;
		var item_name = document.frm.rightItemName.value;
	}
	
	var oRowLeft = left_tbody.insertRow(leftLen);
	
	
	// ���� �߰��ϴ� row �� row index ����
	var rowNo = oRowLeft.rowIndex;
	
	oRowLeft.onmouseover = function() { bgLeftOver(this); }; 
	oRowLeft.onmouseout = function() { bgLeftOut(this); }; 
	oRowLeft.height = 22; 
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ǰ���ߺз�
	var oCell2 = oRowLeft.insertCell(); // ǰ���ڵ�
	var oCell3 = oRowLeft.insertCell(); // ǰ���	
	var oCell4 = oRowLeft.insertCell(); // ����
	
	oCell0.align = "center";   oCell0.width = "10%";  // ��ȣ
	oCell1.align = "center";   oCell1.width = "22%";  // ǰ���ߺз�
	oCell2.align = "center";   oCell2.width = "20%"; // ǰ���ڵ�
	oCell3.align = "left";     oCell3.width = "37%";  // ǰ���	
	oCell4.align = "center";   oCell4.width = "11%"; // ����
	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divLeftRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// ǰ���ߺз�
	oCell1.innerHTML = "<a id=\"divLeftCdName\">"+ cd_name +"</a> "
	                   + "<input type=\"hidden\" name=\"leftCdName\" value=\"" + cd_name + "\">";
	// ǰ���ڵ�
	oCell2.innerHTML = "<a id=\"divLeftItemId\">" + item_id + "</a>"
					   + "<input type=\"hidden\" name=\"leftItemId\" value=\"" + item_id + "\">";
	// ǰ���
	oCell3.innerHTML = "<a id=\"divLeftItemName\">&nbsp;" + item_name + "</a>"
					   + "<input type=\"hidden\" name=\"leftItemName\" value=\"" + item_name + "\">";
	// ����
	oCell4.innerHTML = "<input type=\"checkbox\" name=\"left_check_flag\" class=\"normal\" "
					   + "style=\"text-align:center; border-width:0; \"></input>";
	
	document.recalc();
	setLeftRowNo();
	
}


// ������ �׸��� row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRightRow( rowIndex ) {
	
	var rightLen = right_tbody.rows.length;
	
	if(document.frm.leftCdName[rowIndex]){
		var cd_name = document.frm.leftCdName[rowIndex].value;
		var item_id = document.frm.leftItemId[rowIndex].value;
		var item_name = document.frm.leftItemName[rowIndex].value;
	}else{
		var cd_name = document.frm.leftCdName.value;
		var item_id = document.frm.leftItemId.value;
		var item_name = document.frm.leftItemName.value;
	}
	
	var oRowRight = right_tbody.insertRow(rightLen);
	
	
	// ���� �߰��ϴ� row �� row index ����
	var rowNo = oRowRight.rowIndex;
	
	oRowRight.onmouseover = function() { bgRightOver(this); }; 
	oRowRight.onmouseout = function() { bgRightOut(this); }; 
	oRowRight.height = 22; 
	
	var oCell0 = oRowRight.insertCell(); // ��ȣ
	var oCell1 = oRowRight.insertCell(); // ǰ���ߺз�
	var oCell2 = oRowRight.insertCell(); // ǰ���ڵ�
	var oCell3 = oRowRight.insertCell(); // ǰ���	
	var oCell4 = oRowRight.insertCell(); // ����
	
	oCell0.align = "center";   oCell0.width = "10%";  // ��ȣ
	oCell1.align = "center";   oCell1.width = "22%";  // ǰ���ߺз�
	oCell2.align = "center";   oCell2.width = "20%"; // ǰ���ڵ�
	oCell3.align = "left";     oCell3.width = "37%";  // ǰ���	
	oCell4.align = "center";   oCell4.width = "11%"; // ����
	
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRightRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	// ǰ���ߺз�
	oCell1.innerHTML = "<a id=\"divRightCdName\">"+ cd_name +"</a> "
	                   + "<input type=\"hidden\" name=\"rightCdName\" value=\"" + cd_name + "\">";
	// ǰ���ڵ�
	oCell2.innerHTML = "<a id=\"divRightItemId\">" + item_id + "</a>"
					   + "<input type=\"hidden\" name=\"rightItemId\" value=\"" + item_id + "\">";
	// ǰ���
	oCell3.innerHTML = "<a id=\"divRightItemName\">&nbsp;" + item_name + "</a>"
					   + "<input type=\"hidden\" name=\"rightItemName\" value=\"" + item_name + "\">";
	// ����
	oCell4.innerHTML = "<input type=\"checkbox\" name=\"right_check_flag\" class=\"normal\" "
					   + "style=\"text-align:center; border-width:0; \"></input>";
	
	document.recalc();
	setRightRowNo();
	
}

// ��ȣ setting
function setLeftRowNo() {
	
	var tableLen = left_tbody.rows.length;
	//areaLeftTot.innerHTML = tableLen;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divLeftRowNo[0] ) {
			divLeftRowNo[i].innerHTML = i+1;
		}
		else {
			divLeftRowNo.innerHTML = "1";
		}
	}
	
}

// ��ȣ setting
function setRightRowNo() {
	
	var tableLen = right_tbody.rows.length;
	//areaRightTot.innerHTML = tableLen;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRightRowNo[0] ) {
			divRightRowNo[i].innerHTML = i+1;
		}
		else {
			divRightRowNo.innerHTML = "1";
		}
	}
	
}

// ���� row ���� 
// parameter : button object
function delLeftRow( rowIndex ) { 
	
	left_tbody.deleteRow(rowIndex);
	setLeftRowNo();
	
}

// ������ row ���� 
// parameter : button object
function delRightRow( rowIndex ) { 
	
	right_tbody.deleteRow(rowIndex);
	setRightRowNo();
	
}

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgLeftOver( obj ) {
	if( left_tbody.rows[obj.rowIndex] ) { 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
	} 
	else{ 
		left_tbody.rows.style.backgroundColor = "#eeeeee"; 
	}	
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ
function bgLeftOut( obj ) {
	if( left_tbody.rows[obj.rowIndex] ) { 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else { 
		left_tbody.rows.style.backgroundColor = "#ffffff"; 
	}	
}

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgRightOver( obj ) {
	if( right_tbody.rows[obj.rowIndex] ) { 
		right_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
	} 
	else{
		right_tbody.rows.style.backgroundColor = "#eeeeee";
	} 
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ
function bgRightOut( obj ) {
	if( right_tbody.rows[obj.rowIndex] ) { 
		right_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else { 
		right_tbody.rows.style.backgroundColor = "#ffffff"; 
	}
}

// ���� ��ư Ŭ��
function GoSave(service) {	
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// ��ȸ ��ư Ŭ��
function GoSearch(service) {
	
	var src_loc_sel = document.frm.src_loc_sel.value;
	var tgt_loc_sel = document.frm.tgt_loc_sel.value;
	
	// �߰���۰����� �������� ���� ���
	if( src_loc_sel == "" ) {
		alert("�߰���۰����� ������ �ֽʽÿ�.");
		return;
	}
	
	// �԰����� �������� ���� ���
	if( tgt_loc_sel == "" ) {
		alert("�԰����� ������ �ֽʽÿ�.");
		return;
	}
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// HTML Grid ȭ�� resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
	var topLineHeightValue = topRight.style.height.split("px")[0]; 
	
	var maxWidthValue;
	var maxHeightValue;
	
	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	var leftDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) - 17; 
	var mainDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) ; 
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
		leftDiplayHeightValue += Number(search_h); 
		mainDiplayHeightValue += Number(search_h); 
	} 
	
	var tableWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 39;
	var displayWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 20;
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	if( leftDiplayHeightValue < 1 ) 
		leftDiplayHeightValue = 1; 
	if( mainDiplayHeightValue < 1 ) 
		mainDiplayHeightValue = 1; 
	
	if( tableWidthValue < 1 ) 
		tableWidthValue = 1; 
	if( topLineWidthValue < 1 ) 
		topLineWidthValue = 1; 
	if( displayWidthValue < 1 ) 
		displayWidthValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tbMain.style.height = tableHeightValue + "px"; 
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	tbMain1.style.height = tableHeightValue + "px"; 
	rightDisplay.style.height = leftDiplayHeightValue + "px";
	//mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px"; 
	//tbMain.width = tableWidthValue + "px"; 
	//topLeft.style.width = topLineWidthValue + "px"; 
	//leftDisplay.style.width = displayWidthValue + "px";
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px"; //�ϴ� ȭ�� ���̺��� ��ġ�� �����ϱ� ���� �κ�.
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}