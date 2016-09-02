////////////////////////////////////////////////////////////
// ���α׷�ID : md_05190_itemShiftLot_reg.js
// ���α׷��� : �ּһ��귮 �������� (���)
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
// 1.0        2008-11-26  ���ؼ�     md_05190_itemShiftLot_reg.js ����
//
//
////////////////////////////////////////////////////////////

// ����ȭ������ �̵�
function moveBack() {
	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	var selected_plant = document.frm.selected_plant.value;
	
	var urlStr = "service.do?_moon_service=md_05190_itemShiftLot_list";
	urlStr += "&selected_plant=" + selected_plant;
	urlStr += "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
}

function setUom(obj){
	if(obj.value == ""){
		obj.parentNode.nextSibling.childNodes(0).value = "";
	}
	else{
		obj.parentNode.nextSibling.childNodes(0).value = "SHIFT";
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

// �ڵ� �׷� �ߺ� üũ
function checkDup() {
	
	var plant = document.frm.selected_plant.value; //���� �ڵ�
	var item_id = document.frm.item_id.value; //��ǰ �ڵ�
	var checkKey = plant+"!%!"+item_id;
	
	if( plant == "" || plant == null ) {
		alert("������ �����ϼ���.");
		return;
	}
	else if( item_id == "" || item_id == null ) {
		alert("��ǰ�ڵ带 �Է��ϼ���.");
		return;
	}
	else {
		commonUtil.checkKeyValue(checkKey, "item_id_dup_check_in_item_capa", checkDupDo);
	}
	
}

// �ڵ� �׷� �ߺ� üũ ���
function checkDupDo(checkResult) {

	if( Number(checkResult) > 0 ) {
		alert("�̹� ��ϵǾ� �ֽ��ϴ�. �ٸ� ��ǰ�ڵ带 �Է��� �ֽʽÿ�. ");
		document.frm.v_item_id.value = "";
		document.frm.v_item_name.value = "";
		document.frm.checkDupFlag.value = "";
		return;
	}
	else {
		alert("��� ������ ��ǰ�ڵ� �Դϴ�.");
		// checkDupFlag �� cd_grp �� ����
		// checkDupFlag == cd_grp �� �ߺ�üũ ���� Ȯ��
		document.frm.v_item_id.value = document.frm.item_id.value;
		document.frm.v_item_name.value = document.frm.item_name.value;
		document.frm.checkDupFlag.value = document.frm.item_id.value;
	}
	
}

// ����
function GoSave( service ) {
	
	// �ڵ� �׷� �ߺ� üũ ���� Ȯ��
	if( document.frm.checkDupFlag.value != document.frm.item_id.value ) {
		alert("��ǰ�ڵ带 �Է��� �� �ߺ� üũ�� �� �ֽʽÿ�.");
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

// HTML Grid ȭ�� resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
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
	
	var tabWidthValue = Number(maxWidthValue) - 15;
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
	//mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px";
	//tbMain.width = tableWidthValue + "px"; 
	//topLine.style.width = topLineWidthValue + "px"; 
	//mainDisplay.style.width = displayWidthValue + "px";
	
	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
}
