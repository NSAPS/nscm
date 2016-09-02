
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
	if(objBox.name == "input_due_date"){	
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
		if( objName == "input_plant_id" ) {
			objTdG = main_tbody.rows[rowIdx].cells[4];
		}		
		// �������� --> ������ �۾���
		else if( objName == "input_due_date" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				objTdG = main_tbody.rows[0].cells[3];
				//main_tbody.rows[0].cells[3].focus();
			}
			// �������� ù��° input box �� �̵�
			else {
				objTdG = main_tbody.rows[rowIdx+1].cells[3];
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
				
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
	opener.GoSearch("sc_10030_dailyPlantAllocationPlanAnalysis_list");
	
	this.focus();
	
};
/*function GoSave(service) {
	
	var tableLen = main_tbody.rows.length;
	
	for( var i=0 ; i < tableLen ; i++ ) {
		// ���̺� ���� ������ ����
		if( document.frm.bckt1_horzn[i] ) {
			// ��ȹ�ֱ⸦ �Է��� ��츸 üũ : ��ȹ�ֱ⸦ �Է����� ������, INSERT ���� �������� ����
			if( document.frm.period_type[i].value != "" && document.frm.period_type[i].value != null ) {
				// ��ȹ�ι��� �Է����� ���� ���
				if( document.frm.cat_id[i].value == "" || document.frm.cat_id[i].value == null ) {
					alert("��ȹ�ι��� �Է��ؾ� �մϴ�.");
					return;
				}
			}
		}
		// ���̺� �� ���θ� ����
		else {
			// ��ȹ�ֱ⸦ �Է��� ��츸 üũ : ��ȹ�ֱ⸦ �Է����� ������, INSERT ���� �������� ����
			if( document.frm.period_type.value != "" && document.frm.period_type.value != null ) {
				// ��ȹ�ι��� �Է����� ���� ���
				if( document.frm.cat_id.value == "" || document.frm.cat_id.value == null ) {
					alert("��ȹ�ι��� �Է��ؾ� �մϴ�.");
					return;
				}
			}
		}
	}
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}*/

// üũ �ڽ� ��ü ����/����
function checkAll(obj){
	//alert(obj.value);
	var tabLen = main_tbody.rows.length;
	//alert(tabLen);
	if(obj.value == "N"){
		if( tabLen == 1){
			document.frm.check_modify.checked = true;
			document.frm.check_modify.value = "Y";	
			document.frm.checkModify.value = "Y";
		}
		else{
			for( i = 0; i < tabLen; i++){			
				document.frm.check_modify[i].checked = true;
				document.frm.check_modify[i].value = "Y";	
				document.frm.checkModify[i].value = "Y";		
			}
		}
		
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
		}
		else
			document.frm.checkModify.value = "Y";
	}
	else{
		obj.checked = false;
		obj.value = "N";
		if(document.frm.checkModify[idx])
			document.frm.checkModify[idx].value = "N";
		else
			document.frm.checkModify.value = "N";
	}
}

// ������ �ϰ� ����( üũ�ڽ� ���õ� row��)
function prodDatesBatch(){
	
	var sDate = document.frm.selected_date.value;
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // üũ �ڽ��� ���õ� row�� ����
				divDueDate[i].innerHTML = sDate;
				document.frm.input_due_date[i].value = sDate;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divDueDate.innerHTML = sDate;
				document.frm.input_due_date.value = sDate;						
			}
		}
	}
}

// ���� �ϰ� ����( üũ�ڽ� ���õ� row��)
function procBatch(){
	
	var sPlantId = document.frm.selected_plant.value; //�۾��� �ڵ�
	var sPlantName = document.frm.selected_plant.options[document.frm.selected_plant.selectedIndex].text; // �۾��� ��
	
	var tabLength = main_tbody.rows.length;
	//alert(tabLength);
	
	for( i = 0; i < tabLength; i++ ){
		if( document.frm.check_modify[i] ){
			if(	document.frm.check_modify[i].value == "Y" ){ // üũ �ڽ��� ���õ� row�� ����
				divPlant[i].innerHTML = "&nbsp;" + sPlantName;
				document.frm.input_plant_id[i].value = sPlantId;						
			}
		}
		else{
			if(	document.frm.check_modify.value == "Y" ){
				divPlant.innerHTML = "&nbsp;" + sPlantName;
				document.frm.input_plant_id.value = sPlantId;						
			}
		}
	}
}
