// ����ȭ������ �̵�
function moveBack() {
	var urlStr = "service.do?_moon_service=ip_01020_inventoryPlan_item_mod";
	location.href = urlStr;
}

// input box �� Edit Mode �� ��ȯ
function setEditMode1( obj ) {

	//obj.childNodes(0).style.display = "block";
	obj.childNodes(0).select();
}

// input box �� View Mode �� ��ȯ
function setViewMode1( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// input box �� View Mode �� ��ȯ
function setViewMode2( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"BOX"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// �� ���� ��������
var objTdG;

// Ŭ���� �������� �ε���
var clickedDateIdx = null;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// ��¥ �˻� POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
}

// ��¥ �˻� POP BTN mouseOut
function outBtn( objBtn ) {  
	clickedDateIdx = null;
}

function setEndDate( objDate ){
	var tableLen = objDate.parentNode.parentNode.parentNode.rowIndex;
	alert(tableLen);
	alert(objDate.value)
}



function	SetFlag(obj, Idx){
	var item_id		= document.frm.sel_item_id[Idx].value
	var item_name	= document.frm.sel_item_name[Idx].value
	
	if(obj.checked){
		ResetDate();
		document.frm.tgt_item_id.value = item_id;
		document.frm.tgt_item_name.value = item_name;
		document.frm.reg_chk[Idx].checked=true;
		document.frm.cre_rate.value = 100;
	}
	else{
		document.frm.tgt_item_id.value = "";
		document.frm.tgt_item_name.value = "";
		document.frm.reg_chk.checked=true;
		document.frm.cre_rate.value = 100;
	}
}

function	ResetDate(){
	var Idx		= 0;	
	var lastIdx = left_tbody.rows.length;

	for(Idx ; Idx<lastIdx ; Idx++) {
		if(document.frm.reg_chk[Idx]){
			document.frm.reg_chk[Idx].checked=false;
		}
		else{
			document.frm.reg_chk.checked=false;
		}			
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
			else if( arrList.length > 1){							
			document.frm.item_name.value = "";
//			openItemSearchPop(input, 400, 400);
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

// ���� ��ư Ŭ��
function GoSave(service) {
	
	var item_id 		= document.frm.item_id.value;		//�ű�ǰ��
	var item_name 		= document.frm.item_name.value;		//�ű�ǰ��
	var tgt_item_id		= document.frm.tgt_item_id.value;	//���ǰ��
	var tgt_item_name	= document.frm.tgt_item_name.value;	//���ǰ��
	var cre_rate 		= document.frm.cre_rate.value;		//ī�Ǻ���

	if( item_id == null || item_id == "" ) {
		alert("�ű�ǰ���� �����Ͻʽÿ�.");
		return;
	}
		
	if( tgt_item_id == null || tgt_item_id == "" ) {
		alert("���ǰ���� �����Ͻʽÿ�.");
		return;
	}
		
	if( cre_rate == null || cre_rate == "" ) {
		alert("���������� �Է��Ͻʽÿ�.");
		return;
	}


	if(confirm("["+item_name+"]�� ������� "+"["+tgt_item_name+"] ��"+"["+cre_rate+"%]������ �����Ͻðڽ��ϱ�?") == 1 ) {


		// WAITING �̹��� �����ֱ�
		viewWait();
		// service_id ����
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();				
	}
	else{
		return ;
	}
	
}
