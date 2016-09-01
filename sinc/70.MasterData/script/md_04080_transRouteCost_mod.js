////////////////////////////////////////////////////////////
// ���α׷�ID : md_04080_transRouteCost_mod.js
// ���α׷��� : ����Route �������� (����)
// ������  : ���ؼ�
// �������� : 2008-07-28 ������
//
//���� job file : job_sinc_70_masterData_00.xml
//
//���� query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-07-28  ���ؼ�     md_04080_transRouteCost_mod.js ����
//
//
////////////////////////////////////////////////////////////

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

	if( main_tbody.rows[obj.rowIndex] ) { 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
	} 
	else { 
		main_tbody.rows.style.backgroundColor = "#eeeeee"; 
	}
	
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ
function bgOut( obj ) {
	
	if( main_tbody.rows[obj.rowIndex] ) { 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else { 
		main_tbody.rows.style.backgroundColor = "#ffffff"; 
	}
	
}

// ����ȭ������ �̵�
function moveBack() {
	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_04080_transRouteCost_list";
	urlStr += "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
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
		
	var strVal = numberFormat(objBox.value);
	objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// �� ���� ��������
var objTdG;

// chkDupCd() ���� setTimeout �� ����Ǵ� �Լ�
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// ����
function GoSave( service ) {
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		
		// �� ��ۺ� --> �Ʒ� ��ۺ�
		if( objName == "trans_cost" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = main_tbody.rows[0].cells[2];
				}
				else {
					objTdG = main_tbody.rows.cells[2];
				}
			}
			// �������� ù��° input box �� �̵�
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[2];
				}
				else {
					objTdG = main_tbody.rows.cells[2];
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

// HTML Grid ȭ�� resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var mainWidthValue = mainDisplay.style.width.split("px")[0]; 
	var topLineHeightValue = topLine.style.height.split("px")[0]; 
	
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
	//if( search_menu.style.display == "none" ) 
	//{ 
	//	tabHeightValue += Number(search_h); 
	//	tableHeightValue += Number(search_h); 
	//	leftDiplayHeightValue += Number(search_h); 
	//	mainDiplayHeightValue += Number(search_h); 
	//} 
	
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
	//leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	//tbMain1.style.height = tableHeightValue + "px"; 
	//rightDisplay.style.height = leftDiplayHeightValue + "px";
	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px"; 
	//tbMain.width = tableWidthValue + "px"; 
	//topLeft.style.width = topLineWidthValue + "px"; 
	//leftDisplay.style.width = displayWidthValue + "px";
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px"; //�ϴ� ȭ�� ���̺��� ��ġ�� �����ϱ� ���� �κ�.
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}
