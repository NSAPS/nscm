////////////////////////////////////////////////////////////
// ���α׷�ID : md_05180_extraProcMc_reg.js
// ���α׷��� : �������� ���� (���)
// ������  : ���ؼ�
// �������� : 2008-12-01 ������
//
//���� job file : job_sinc_20_scheduling_04.xml
//
//���� query file : query_sinc_20_scheduling_04.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-12-01  ���ؼ�     md_05180_extraProcMc_reg.js ����
//
//
////////////////////////////////////////////////////////////

// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var popImgIdx = null;


// ����ȭ������ �̵�
function moveBack() {
	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	var selected_plant = document.frm.selected_plant.value;
	
	var urlStr = "service.do?_moon_service=md_05180_extraProcMc_list";
	urlStr += "&selected_plant=" + selected_plant;
	urlStr += "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
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
	document.frm.item_id.select();
	
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
			
	if(document.frm.selected_plant.value == "" || document.frm.selected_plant.value == null){
		alert("������ �����ϼ���!");
		return;
	}
	
	if(document.frm.item_id.value == "" || document.frm.item_id.value == null){
		alert("��ǰ�ڵ带 �Է��ϼ���!");
		return;
	}
	
	if(document.frm.v_line_id.value == "" || document.frm.v_line_id.value == null){
		alert("������ �����ϼ���!");
		return;
	}
	
	if(document.frm.v_proc_id.value == "" || document.frm.v_proc_id.value == null){
		alert("�۾����� �����ϼ���!");
		return;
	}
	
	if(document.frm.mc_kind.value == "" || document.frm.mc_kind.value == null){
		alert("MC KIND�� �����ϼ���!");
		return;
	}
	
	if(document.frm.mc_qty.value == "" || document.frm.mc_qty.value == null){
		alert("MC QTY�� �Է��ϼ���!");
		return;
	}
	
	if(!confirm("�����Ͻðڽ��ϱ�?"))
		return;
		
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// ����� ���� �Է°����κ��� ��ǰ���� ��ȸ
// ��ǰ �ڵ�, ��ǰ �� �� �� �ϳ��� ��ġ�ϴ� ������ �˻�
function getItemInfo( obj ) {
	
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
	
	if( document.frm.item_id[rowIdx] ) {
		var dc_id = document.frm.src_loc[rowIdx].value;
		var objItemId = document.frm.item_id[rowIdx];
		var objItemName = document.frm.item_name[rowIdx];
		var objDivItemId = divItemId[rowIdx];
		var objDivItemName = divItemName[rowIdx];
		var objBoxPerPalet = document.frm.box_per_palet[rowIdx];
	}
	else {
		var dc_id = document.frm.src_loc.value;
		var objItemId = document.frm.item_id;
		var objItemName = document.frm.item_name;
		var objDivItemId = divItemId;
		var objDivItemName = divItemName;
		var objBoxPerPalet = document.frm.box_per_palet;
	}
	
	var input_value = objItemId.value.trim();
	objItemId.value = input_value;
	
	// ����� �Ǵ� ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
	if( dc_id == "" || dc_id == null ) {
		alert("������� ���� �����ϼ���.");
		objItemId.value = "";
		objDivItemId.innerHTML = "";
		objItemName.value = "";
		objDivItemName.innerHTML = "";
		objBoxPerPalet.value = "";
		return;
	}
	
	// ��ǰ�ڵ� �����Ͱ� ���� ��� �Լ��� ����������
	if( input_value == null || input_value == "" ) {
		objItemId.value = "";
		objDivItemId.innerHTML = "";
		objItemName.value = "";
		objDivItemName.innerHTML = "";
		objBoxPerPalet.value = "";
		return;
	}
	
	replenishPlan.getItemInfo(dc_id, input_value, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��� ����
			if( arrList.length == 0 ) {
				objItemId.value = "";
				objDivItemId.innerHTML = "";
				objItemName.value = "";
				objDivItemName.innerHTML = "";
				objBoxPerPalet.value = "";
				openItemSearchPop(objItemId);
			}
			// ��ġ�ϴ� ��� 1��
			else if( arrList.length == 1 ) {
				objItemId.value = arrList[0][0];
				objDivItemId.innerHTML = arrList[0][0];
				objItemName.value = arrList[0][1];
				objDivItemName.innerHTML = "&nbsp;" + arrList[0][1];
				objBoxPerPalet.value = arrList[0][2];
			}
			else {
				openItemSearchPop(objItemId);
				objItemId.value = "";
				objDivItemId.innerHTML = "";
				objItemName.value = "";
				objDivItemName.innerHTML = "";
				objBoxPerPalet.value = "";
			}
		}
	});
	
}

// input box �� Edit Mode �� ��ȯ
// onClick
function setEditMode( objTd ) {
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}	
	
	objTd.childNodes(0).style.display = "none";		
	objTd.childNodes(1).style.display = "block";
		
	if( objTd.childNodes(1).tagName.toUpperCase() == "SELECT") { // ����, ����, �۾��� �ݿ� ���� �� 
					                      
		objTd.childNodes(1).focus();
	}
	else if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "INPUT"){ // ��ǰ �ڵ� ��
		objTd.childNodes(1).childNodes(0).select(); // focus()�̸�, item search popup â�� �θ�â �ڿ� ��ġ��.
	}
	else {// ����, ����, �۾��� ��		
		objTd.childNodes(1).childNodes(0).focus();
	}			
		
}

// input box �� View Mode �� ��ȯ
// onFocusOut
function setViewMode( objBox ) {
	
	// ��ǰ�ڵ� �˻� ���ΰ��
	if( objBox.name == "item_id" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		}
	}
	// select box �� ���, value �� �ƴ϶� TEXT �� ǥ���� ��� ��
	else if( objBox.tagName.toUpperCase() == "SELECT" ) {
		if( objBox.value == "" || objBox.value == null ) {
			var strVal = objBox.value;
		}
		else {
			var strVal = objBox.options[objBox.selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	// ����, �۾��� select box �� ���, value �� �ƴ϶� TEXT �� ǥ���� ��� ��
	else if( objBox.tagName.toUpperCase() == "A" ) {
		if( objBox.childNodes(0).value == "" || objBox.childNodes(0).value == null ) {
			var strVal = objBox.childNodes(0).value;
		}
		else {
			var strVal = objBox.childNodes(0).options[objBox.childNodes(0).selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	else {
		var strVal = objBox.value;
		var objTd = objBox.parentNode;
	}
	
	if( objTd.align.toUpperCase() == "CENTER" ) {
		objTd.childNodes(0).innerHTML = strVal;
	}
	else if( objTd.align.toUpperCase() == "RIGHT" ) {
		objTd.childNodes(0).innerHTML = strVal + "&nbsp;";
	}
	else {
		objTd.childNodes(0).innerHTML = "&nbsp;" + strVal;
	}
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";
	//objTd.onclick = function() { setEditMode(this); };
	
}
