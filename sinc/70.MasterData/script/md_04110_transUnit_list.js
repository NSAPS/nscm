////////////////////////////////////////////////////////////
// ���α׷�ID : md_04110_transUnit_list.js
// ���α׷��� : �԰�DC�� ���۴�������
// ������  : ���ؼ�
// �������� : 2008-10-06 ������
//
//���� job file : job_sinc_70_masterData_03.xml
//
//���� query file : query_sinc_70_masterData_03.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-10-06  ���ؼ�     md_04110_transUnit_list.js ����
//
//
////////////////////////////////////////////////////////////

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
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
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

function GoSearch(service) {
	
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

/**
 * �Է¹��� �� �ִ� ���� ���͸��Ѵ�.
 * ex : <input type="text" ..... onkeypress="filterKey('[0-9]')"> ; ���ڸ� Ű�Է��� ������ text filed
 * ex : <input type="text" ..... onkeypress="filterKey('[0-9a-zA-Z]')"> ; ����,���ڸ� Ű�Է��� ������ text filed
 * @param filter : ���͸��� ����ǥ���� ex) '[0-9]':0~9�� ���� ���, '[a-zA-Z]':���ĺ��� ���
 * @browser IE6, NS7
 */
function filterKey(filter) {
  if(filter){
      var sKey = String.fromCharCode(event.keyCode);
      var re = new RegExp(filter);
      if(!re.test(sKey)) event.returnValue=false;
  }
} 

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 

	if( left_tbody.rows[obj.rowIndex] ) { 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
	} 
	else { 
		left_tbody.rows.style.backgroundColor = "#eeeeee"; 
	}
	
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ
function bgOut( obj ) {
	
	if( left_tbody.rows[obj.rowIndex] ) { 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else { 
		left_tbody.rows.style.backgroundColor = "#ffffff"; 
	}
	
}

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	//objTd.childNodes(1).focus();
	objTd.childNodes(1).select();
		
}

// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
	var strVal = objBox.value;
	
	if(objBox.name == "box_qty"){
		strVal = numberFormat(objBox.value);
		objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;&nbsp;&nbsp;";
	}
	else{
		objBox.parentNode.childNodes(0).innerHTML = strVal;
	}
		
	//objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;&nbsp;&nbsp;";
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

function setBoxQty(objBox){
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	
	if(objBox.checked){
		var boxPerPalet = document.frm.box_per_palet[rowIdx].value;
		document.frm.box_qty[rowIdx].value = boxPerPalet;
		divBoxQty[rowIdx].innerHTML = boxPerPalet + "&nbsp;&nbsp;&nbsp;";
	}else{
		var boxQty = document.frm.old_box_qty[rowIdx].value;
		document.frm.box_qty[rowIdx].value = boxQty;
		divBoxQty[rowIdx].innerHTML = boxQty + "&nbsp;&nbsp;&nbsp;";
	}
	/*
	var qlt_flag = objBox.value;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	
	if(qlt_flag == "1"){
		var boxPerPalet = document.frm.box_per_palet[rowIdx].value;
		document.frm.box_qty[rowIdx].value = boxPerPalet;
		divBoxQty[rowIdx].innerHTML = boxPerPalet + "&nbsp;&nbsp;&nbsp;";
	}else{
		var boxQty = document.frm.old_box_qty[rowIdx].value;
		document.frm.box_qty[rowIdx].value = boxQty;
		divBoxQty[rowIdx].innerHTML = boxQty + "&nbsp;&nbsp;&nbsp;";
	}*/
}

// HTML Grid ȭ�� resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var mainWidthValue = leftDisplay.style.width.split("px")[0]; 
	var topLineHeightValue = topLeft.style.height.split("px")[0]; 
	
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
	
	var tableWidthValue = Number(maxWidthValue) - Number(mainWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(mainWidthValue) - 39;
	var displayWidthValue = Number(maxWidthValue) - Number(mainWidthValue) - 20;
	
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
	//tbMain1.style.height = tableHeightValue + "px"; 
	//rightDisplay.style.height = leftDiplayHeightValue + "px";
	//mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px"; 
	//tbMain.width = tableWidthValue + "px"; 
	//topLeft.style.width = topLineWidthValue + "px"; 
	//leftDisplay.style.width = displayWidthValue + "px";
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px"; //�ϴ� ȭ�� ���̺��� ��ġ�� �����ϱ� ���� �κ�.
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
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
	// �����������, ������������ ���� ���
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) { // main_tbody.rows[...].cells error �ΰ��, ����Ұ�
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}else{
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// plt_flag --> box_qty
		if( objName == "plt_flag" ) {
			objTdG = left_tbody.rows[rowIdx].cells[4];
		}
		// box_qty --> ������ plt_flag
		else if( objName == "box_qty" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[3];
			}
			// �������� ù��° input box �� �̵�
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[3];
			}
		}
		// �� ���� box ���� ���� ����
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

