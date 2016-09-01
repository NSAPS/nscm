////////////////////////////////////////////////////////////
// ���α׷�ID : rp_02060_transPlanAnaly_list.js
// ���α׷��� : ���۰�ȹ����
// ������  : ���ؼ�
// �������� : 2008-10-05 �Ͽ���
//
//���� job file : job_sinc_40_replenishmentPlanning_00.xml
//
//���� query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-10-05  ���ؼ�     rp_02060_transPlanAnaly_list.js ����
//
//
////////////////////////////////////////////////////////////

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

// Trans Plan version - seq �и�
function setTransVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.trans_version.value = verArr[0].trim();
		document.frm.trans_seq.value = verArr[1].trim();
	}
	
}

// Prod Plan version - seq �и�
function setProdVersions( versions ) {
	if( versions == null || versions == "") return;
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.prod_version.value = verArr[0].trim();
		document.frm.prod_seq.value = verArr[1].trim();
	}
}	

// Sales Plan version - seq �и�
function setSalesVersions( versions ) {
	if( versions == null || versions == "") return;
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.sales_yyyy.value = verArr[0].trim();
		document.frm.sales_version.value = verArr[1].trim();
	}
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
				return;
			}
		}
	});
	
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
				return;
			}
			GoSearch(service);
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


