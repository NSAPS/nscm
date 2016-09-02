////////////////////////////////////////////////////////////
// ���α׷�ID : rp_01110_returningProduct_list.js
// ���α׷��� : ��ǰ ���� ��ȹ ��ȸ
// ������  : ���ؼ�
// �������� : 2008-08-14 �����
//
//���� job file : job_sinc_40_replenishmentPlanning_00.xml
//
//���� query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-14  ���ؼ�     rp_01110_returningProduct_list.js ����
//
//
////////////////////////////////////////////////////////////

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

function allCheck(){
	
	if(document.frm.tgt_loc.value == "" || document.frm.tgt_loc.value == null) {
		alert("�԰����� ���� �����ϼ���!")
	}
	var tableLen = left_tbody.rows.length;
	if(document.frm.all_check_flag.checked){
		for(var i = 0; i < tableLen; i++){
			if(document.frm.check_flag[i]) {
				if(document.frm.tgt_loc.value != document.frm.rdc_id[i].value ) { // �԰����� ���� check ����!
					document.frm.check_flag[i].checked = true;
				}
			}
			else {
				if(document.frm.tgt_loc.value != document.frm.rdc_id.value ) { // �԰����� ���� check ����!
					document.frm.check_flag.checked = true;
				}
			}
		}
	}
	else{
		for(var i = 0; i < tableLen; i++){
			if(document.frm.check_flag[i])
				document.frm.check_flag[i].checked = false;
			else
				document.frm.check_flag.checked = false;
		}
	}
}

// ���� ��ư Ŭ��
function GoSave(service) {
	
	var src_loc = document.frm.src_loc_sel.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var trans_date = document.frm.trans_date.value;
	var truck_num = document.frm.truck_num.value;
	var status_flag = document.frm.status_flag.value;
	
	// ��ǰ ���� ��ȹ ��ȸ�϶�, ��ȹ���� ��ư�� �������
	if(status_flag == "first"){
		alert("��ǰ ���� ��ȹ [��ȸ] ȭ�鿡���� ��ȹ������ ���� �ʽ��ϴ�! \n���� ��ǰ ���� ��ȹ [����] ���� Ŭ���� �ֽʽÿ�!");
		return;
	}
	
	// ������� �������� ���� ���
//	if( src_loc == "" ) {
//		alert("������� ������ �ֽʽÿ�.");
//		return;
//	}
	
	// �԰����� �������� ���� ���
	if( tgt_loc == "" ) {
		alert("�԰����� ������ �ֽʽÿ�.");
		return;
	}
	
	// ���������� �Է����� ���� ���
	if( trans_date == "" ) {
		alert("�������ڸ� �Է��� �ֽʽÿ�.");
		return;
	}
	
	// ������ȣ�� �������� ���� ���
	if( truck_num == "" ) {
		alert("������ȣ�� �Է��� �ֽʽÿ�.");
		return;
	}
	
	var tableLen = left_tbody.rows.length;
	
	if(tableLen == 0){
		alert("���۰�ȹ�� ������ ����Ÿ�� �������� �ʽ��ϴ�!");
		return;
	}else if(tableLen == 1){
		if(document.frm.check_flag.checked){
			if(confirm("������ ���۰�ȹ�� �����Ͻðڽ��ϱ�?")==0){
				return;		// ���
			}	
		}else{
			alert("���õ� ����� �����ϴ�!");
			return;	
		}		
	}else{
		var checkflag = 0;
		for(i=0; i< tableLen; i++){
			// ��� check�� ���� �ִ��� Ȯ��.
			if(document.frm.check_flag[i].checked){
				checkflag++;	
			}
		}
		if(checkflag > 0){ // ���õ� ��� �ִ� ���..
			if(confirm("������ ���۰�ȹ�� �����Ͻðڽ��ϱ�?")==0){
				return;		// ���
			}	
		}else{ // ���õ� ��� �ϳ��� ���� ���..
			alert("���õ� ����� �����ϴ�!");
			return;	
		}
	}	
	
	// ==============================================  //
	// 1. BRAND_NO�� ������� ������Ű��� ���� ���� �κ�. 	
	// 2. IF_TRANS_PLAN�� QTY�� �־��� CAL_QTY ��� (box_qty * unitQty + eaQty)
	if(tableLen == 1){ // �˻��� ROW ���� 1�� �϶�.
		if(document.frm.check_flag.checked){
			document.frm.check_value.value = "1";
			var unitQty = Number(document.frm.unit_qty.value);
			var boxQty  = Number(document.frm.box_qty.value);
			var eaQty  = Number(document.frm.ea_qty.value);
			document.frm.cal_qty.value = ( boxQty * unitQty )+ eaQty;	
		}else{
			document.frm.check_value.value = "";	
		}		
	}else{
		var index = 1;  // BRAND_NO�� ������� ������Ű�� ���ؼ�, CHECK�� ����� ���� �������� ������ ������. 
		for(i = 0; i < tableLen; i++){
			if(document.frm.check_flag[i].checked){
				document.frm.check_value[i].value = index; 
				var unitQty = Number(document.frm.unit_qty[i].value);
				var boxQty  = Number(document.frm.box_qty[i].value);
				var eaQty  = Number(document.frm.ea_qty[i].value);
				document.frm.cal_qty[i].value = ( boxQty * unitQty )+ eaQty;
				index++;	// üũ�Ǿ� �ִ� �͸� INDEX�� �������Ѽ� ���� �Է�
			}else{
				document.frm.check_value[i].value = "";	
			}			
		}
	}
	// ==============================================  //	
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}


// �Ⱓ : ������ ���� --> ������ �������� ����
function sumDate(days){
	
	var temp = new Date();
	temp.setDate(temp.getDate() + days);
	
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var date = temp.getDate();
	if(date < 10) date = "0" + date;
	var edate = year+ "-" + month+ "-" + date;
	//alert(edate);											
	return edate;
}

// ���� ������ �����ϰ� �������� ���� ��¥�� ������ ��, ������ ���� ��¥�� 2�ְ� �ǵ��� setting(ȭ�� �ε�� �ѹ���)
function setDate(){
	if(document.frm.trans_start.value != ""){}
	else{
		document.frm.trans_start.value = sumDate(-7);
	}
	if(document.frm.trans_end.value != ""){}
	else{
		document.frm.trans_end.value = sumDate(6);
	}
}

// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// combo box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}
	
	var tableLen = left_tbody.rows.length;
	var insertRowIndex = objTd.parentNode.rowIndex;
	if(tableLen == 1){
		if(document.frm.check_flag.checked){
			objTd.childNodes(0).style.display = "none";
			objTd.childNodes(1).style.display = "block";
			objTd.childNodes(1).focus();
		}	
	}else{
		if(document.frm.check_flag[insertRowIndex].checked){
			objTd.childNodes(0).style.display = "none";
			objTd.childNodes(1).style.display = "block";
			objTd.childNodes(1).focus();
		}
	}
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

// �� ���� ��������
var objTdG;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = left_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// ���ڽ� --> ����
		if( objName == "box_qty" ) {
			objTdG = left_tbody.rows[rowIdx].cells[4];
		}	
		// ���� --> ������ ���ڽ�
		else if( objName == "ea_qty" ) {
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

// EA_QTY�� UNIT_QTY ���� ū �������� ������ ���, BOX_QTY ����
function setCalQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var form = document.frm;
	
	if( document.frm.unit_qty[rowIdx] ) {
		var unitQty = Number(form.unit_qty[rowIdx].value);
		var boxQty  = Number(form.box_qty[rowIdx].value);
		var eaQty  = Number(form.ea_qty[rowIdx].value);
		
		// �������� �� box�� �������� ���� ���..
		// box ������ ������Ű��, ea ������ ������. 
		if(eaQty >= unitQty){
			boxQty = boxQty + Math.floor(eaQty/unitQty);
			eaQty = Number(eaQty%unitQty);
			form.box_qty[rowIdx].value = boxQty;
			form.ea_qty[rowIdx].value = eaQty;
			divBoxQty[rowIdx].innerHTML = "&nbsp;"+boxQty;
			divEaQty[rowIdx].innerHTML = "&nbsp;"+eaQty;
		}
	}
	else {
		var unitQty = Number(form.unit_qty.value);
		var boxQty  = Number(form.box_qty.value);
		var eaQty  = Number(form.ea_qty.value);
		
		// �������� �� box�� �������� ���� ���..
		// box ������ ������Ű��, ea ������ ������. 
		if(eaQty >= unitQty){
			boxQty = Number(boxQty) + Math.floor(eaQty/unitQty);
			eaQty = Number(eaQty%unitQty);
			form.box_qty.value = boxQty;
			form.ea_qty.value = eaQty;
			divBoxQty.innerHTML = "&nbsp;"+boxQty;
			divEaQty.innerHTML = "&nbsp;"+eaQty;
		}
	}
}

// ������ tab�� Ŭ���ϸ� �߻��ϴ� event -> �̰����� ȭ��� ��� �Ѵ�.
WebFXTabPage.prototype.show = function () {
	var el = this.tab;
	var s = el.className + " selected";
	s = s.replace(/ +/g, " ");
	el.className = s;
	
	this.element.style.display = "block";
	
	var tabId = this.element.id;
	if(tabId == "tabPage1"){
		document.frm.status_flag.value = "first";
	}else if(tabId == "tabPage2"){
		document.frm.status_flag.value = "";
	}
};



// Grid ȭ�� resizing 
// tab_h : tab height ( ���� tab �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� tab ���̰� Ŀ�� ) 
// table_h : table height ( ���� table �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� table ���̰� Ŀ�� ) 
function setGridAutoResize( tab_h, table_h ){
	
	// TABPAGE1
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
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
	} 
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	
	// TABPAGE2
	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
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
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
		leftDiplayHeightValue += Number(search_h); 
		mainDiplayHeightValue += Number(search_h); 
	} 
	
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
	
	tabPage2.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	//mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	tabPage2.style.width = tabWidthValue + "px";
	//tbMain.width = tableWidthValue + "px"; 
	//topLine.style.width = topLineWidthValue + "px"; 
	//mainDisplay.style.width = displayWidthValue + "px";
	
}