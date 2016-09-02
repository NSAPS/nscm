
// input box �� Edit Mode �� ��ȯ
// onClick
function setEditMode( objTd ) {
	
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
	
}

// input box �� View Mode �� ��ȯ
// onFocusOut
function setViewMode( objBox ) {
	
	// �����Ͻ� ���� ��� �ڸ��� üũ
	if( objBox.name == "input_start_dttm" ){
		if( objBox.value.length != 14){ 
			alert(" �ڸ� ���� ���� �ʽ��ϴ�.");
			return;
		}
	}
	
	// select box �� ���, value �� �ƴ϶� TEXT �� ǥ���� ��� ��
	if( objBox.tagName.toUpperCase() == "SELECT" ) {
		if( objBox.value == "" || objBox.value == null ) {
			var strVal = objBox.value;
		}
		else {
			var strVal = objBox.options[objBox.selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	else {
		var strVal = objBox.value;
		var objTd = objBox.parentNode;
	}
	
	// �������� ��¥ üũ
	if(objBox.name == "input_prod_date"){	
		if( strVal != "" && strVal != null ) {
			// ��¥ üũ
			if( chkDate(objBox, 10) == 0 ) {				
				setEditMode( objTd );
				return;
			}
		}
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
	
}



// ��ȣ setting
function setRowNo() {
	
	var tableLen = main_tbody.rows.length;
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


// �� ���� ��������
var objTdG;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// �۾��� --> ��������
		if( objName == "input_start_dttm_date" ) {
			objTdG = main_tbody.rows[rowIdx].cells[6];
		}
		// �������� --> shift
//		else if( objName == "input_prod_date" ) { 
//			objTdG = main_tbody.rows[rowIdx].cells[5];
//		}		
		// shift --> ������ �۾���
		else if( objName == "input_start_dttm_time" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				objTdG = main_tbody.rows[0].cells[5];
				//main_tbody.rows[0].cells[3].focus();
			}
			// �������� ù��° input box �� �̵�
			else {
				objTdG = main_tbody.rows[rowIdx+1].cells[5];
			}
		}
		// �� ���� box ���� ���� ����
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

// ���� ��ư Ŭ��
GoSave = function(service) {
	
	transferChar();
				
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
	opener.GoSearch("sc_11020_dailyProductionPlanAnalysis_list");
		
	this.focus();
		
};

// üũ �ڽ� ��ü ����/����
function checkAll(obj){
	//alert(obj.value);
	var tabLen = main_tbody.rows.length;
	//alert(tabLen); 
	document.frm.qty_tot.value = 0;
	if(obj.value == "N"){
		if( tabLen == 1){
			document.frm.check_modify.checked = true;
			document.frm.check_modify.value = "Y";	
			document.frm.checkModify.value = "Y";
			var qty = Number(document.frm.qty.value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot + qty;	
			document.frm.qty_tot.value = sum;
			//qtyTot.innerHTML = sum;			
		}
		else{
			for( i = 0; i < tabLen; i++){			
				document.frm.check_modify[i].checked = true;
				document.frm.check_modify[i].value = "Y";	
				document.frm.checkModify[i].value = "Y";	
				var qty = Number(document.frm.qty[i].value);
				//alert(qty);
				var tot = Number(document.frm.qty_tot.value);
				//alert(tot);	
				var sum = tot + qty;	
				document.frm.qty_tot.value = sum;
				
			}
		}
		qtyTot.innerHTML = numberFormat(sum);
		obj.value = "Y";	
	}
	else{
		if( tabLen == 1){
			document.frm.check_modify.checked = false;
			document.frm.check_modify.value = "N";
			document.frm.checkModify.value = "N";			
		}
		else{
			for( i = 0; i < tabLen; i++){
				document.frm.check_modify[i].checked = false;
				document.frm.check_modify[i].value = "N";
				document.frm.checkModify[i].value = "N";				
			}			
		}		
		obj.value = "N";	
		document.frm.qty_tot.value = 0;
		qtyTot.innerHTML = 0;	
	}
}

// üũ �ڽ� ����/����
function checkEvent(obj){
	
	var idx = obj.parentNode.parentNode.rowIndex;
	
	if(obj.value == "N"){
		obj.checked = true;
		obj.value = "Y";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "Y";
			var qty = Number(document.frm.qty[idx].value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot + qty;	
			document.frm.qty_tot.value = sum;
			qtyTot.innerHTML = numberFormat(sum);
		}
		else{
			document.frm.checkModify.value = "Y";
			var qty = Number(document.frm.qty.value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot + qty;	
			document.frm.qty_tot.value = sum;
			qtyTot.innerHTML = numberFormat(sum);
		}
	}
	else{
		obj.checked = false;
		obj.value = "N";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "N";
			var qty = Number(document.frm.qty[idx].value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot - qty;	
			document.frm.qty_tot.value = sum;
			qtyTot.innerHTML = numberFormat(sum);
		}
		else{
			document.frm.checkModify.value = "N";
			var qty = Number(document.frm.qty.value);
			//alert(qty);
			var tot = Number(document.frm.qty_tot.value);
			//alert(tot);	
			var sum = tot - qty;	
			document.frm.qty_tot.value = sum;
			qtyTot.innerHTML = numberFormat(sum);
		}
	}
}


// �������� �ϰ� ����( üũ�ڽ� ���õ� row��)
function prodDatesBatch(){
	
	var sDate = document.frm.selected_date.value;
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // üũ �ڽ��� ���õ� row�� ����
				divProdDate[i].innerHTML = sDate;
				document.frm.input_prod_date[i].value = sDate;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divProdDate.innerHTML = sDate;
				document.frm.input_prod_date.value = sDate;						
			}
		}
	}
}

// �۾��� �ϰ� ����( üũ�ڽ� ���õ� row��)
function procBatch(){
	
	var sProcId = document.frm.selected_proc.value; //�۾��� �ڵ�
	var sProcName = document.frm.selected_proc.options[document.frm.selected_proc.selectedIndex].text; // �۾��� ��
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // üũ �ڽ��� ���õ� row�� ����
				divProc[i].innerHTML = "&nbsp;" + sProcName;
				document.frm.input_proc_id[i].value = sProcId;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divProc.innerHTML = "&nbsp;" + sProcName;
				document.frm.input_proc_id.value = sProcId;						
			}
		}
	}
}

// SHIFT �ϰ� ����( üũ�ڽ� ���õ� row��)
function shiftBatch(){
	
	var sShiftId = document.frm.selected_shift.value; //shift �ڵ�
	var sShiftName = document.frm.selected_shift.options[document.frm.selected_shift.selectedIndex].text; // shift ��
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // üũ �ڽ��� ���õ� row�� ����
				divShift[i].innerHTML = sShiftName + "&nbsp;";
				document.frm.input_shift_type[i].value = sShiftId;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divShift.innerHTML = sShiftName + "&nbsp;";
				document.frm.input_shift_type.value = sShiftId;						
			}
		}
	}
}

// ���ڿ��� [,]����,���� ����
function transferChar(){
	
	var tabLength = main_tbody.rows.length;
	
	for( i = 0; i < tabLength; i++ ){  
		
		if( document.frm.input_wo_id[i] ){
			var woId = document.frm.input_wo_id[i].value;
			woId = replaceAll(woId,"[","��");
			woId = replaceAll(woId,"]","��");
			if(document.frm.input_wo_id[i])
				document.frm.input_wo_id[i].value = woId;
			else
				document.frm.input_wo_id.value = woId;			
		} 
		else{
			if( document.frm.input_wo_id ){
				var woId = document.frm.input_wo_id.value;
				woId = replaceAll(woId,"[","��");
				woId = replaceAll(woId,"]","��");
				document.frm.input_wo_id.value = woId;				
			}
		}		
	}
}; 

//replaceAll
function replaceAll(str,re,transChar){
	var len = str.length;
	
	for(j = 0; j < len; j++){
		str = str.replace(re,transChar);
	}
	
	return str;
};

