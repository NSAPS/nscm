
// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	//objTd.childNodes(1).select();
	objTd.childNodes(1).focus();
		
}

// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
	
	var strVal = objBox.value;
	
	if(chkTime(objBox) == -1 && (strVal != null && strVal != "")) return; //�Է����� üũ

	objBox.parentNode.childNodes(0).innerHTML = strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// ��ȣ setting
function setRowNo() {
	
	var tableLen = main_tbody.rows.length;
	
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
// 
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// ����
function GoSave( service ) {

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
		// �Ͽ��� �� ���� -> �Ͽ��� �� �Ϸ�
		if( objName == "shift_1_sun_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				//alert("!!");
				objTdG = main_tbody.rows[rowIdx].cells[1];
			}
			else {
				objTdG = main_tbody.rows.cells[1];
			}
		}
		// �Ͽ��� �� �Ϸ� -> �Ͽ��� �� ����
		else if( objName == "shift_1_sun_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// �Ͽ��� �� ���� -> �Ͽ��� �� �Ϸ�
		else if( objName == "shift_3_sun_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = main_tbody.rows.cells[3];
			}
		}	
		// �Ͽ��� �� �Ϸ� -> �Ͽ��� �� ����
		else if( objName == "shift_3_sun_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else {
				objTdG = main_tbody.rows.cells[4];
			}
		}
		// �Ͽ��� �� ���� -> �Ͽ��� �� �Ϸ�
		else if( objName == "shift_5_sun_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[5];
			}
			else {
				objTdG = main_tbody.rows.cells[5];
			}
		}
		// �Ͽ��� �� �Ϸ� -> ������ �� ����
		else if( objName == "shift_5_sun_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[6];
			}
			else {
				objTdG = main_tbody.rows.cells[6];
			}
		}
		// ������ �� ���� -> ������ �� �Ϸ�
		else if( objName == "shift_1_mon_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[7];
			}
			else {
				objTdG = main_tbody.rows.cells[7];
			}
		}
		// ������ �� �Ϸ� -> ������ �� ����
		else if( objName == "shift_1_mon_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[8];
			}
			else {
				objTdG = main_tbody.rows.cells[8];
			}
		}
		// ������ �� ���� -> ������ �� �Ϸ�
		else if( objName == "shift_3_mon_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[9];
			}
			else {
				objTdG = main_tbody.rows.cells[9];
			}
		}
		// ������ �� �Ϸ� -> ������ �� ����
		else if( objName == "shift_3_mon_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[10];
			}
			else {
				objTdG = main_tbody.rows.cells[10];
			}
		}
		// ������ �� ���� -> ������ �� �Ϸ�
		else if( objName == "shift_5_mon_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[11];
			}
			else {
				objTdG = main_tbody.rows.cells[11];
			}
		}
		// ������ �� �Ϸ� -> ȭ���� �� ����
		else if( objName == "shift_5_mon_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[12];
			}
			else {
				objTdG = main_tbody.rows.cells[12];
			}
		}
		// ȭ���� �� ���� -> ȭ���� �� �Ϸ�
		else if( objName == "shift_1_tue_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[13];
			}
			else {
				objTdG = main_tbody.rows.cells[13];
			}
		}
		// ȭ���� �� �Ϸ� -> ȭ���� �� ����
		else if( objName == "shift_1_tue_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[14];
			}
			else {
				objTdG = main_tbody.rows.cells[14];
			}
		}
		// ȭ���� �� ���� -> ȭ���� �� �Ϸ�
		else if( objName == "shift_3_tue_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[15];
			}
			else {
				objTdG = main_tbody.rows.cells[15];
			}
		}
		// ȭ���� �� �Ϸ� -> ȭ���� �� ����
		else if( objName == "shift_3_tue_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[16];
			}
			else {
				objTdG = main_tbody.rows.cells[16];
			}
		}
		// ȭ���� �� ���� -> ȭ���� �� �Ϸ�
		else if( objName == "shift_5_tue_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[17];
			}
			else {
				objTdG = main_tbody.rows.cells[17];
			}
		}
		// ȭ���� �� �Ϸ� -> ������ �� ����
		else if( objName == "shift_5_tue_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[18];
			}
			else {
				objTdG = main_tbody.rows.cells[18];
			}
		}
		// ������ �� ���� -> ������ �� �Ϸ�
		else if( objName == "shift_1_wed_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[19];
			}
			else {
				objTdG = main_tbody.rows.cells[19];
			}
		}
		// ������ �� �Ϸ� -> ������ �� ����
		else if( objName == "shift_1_wed_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[20];
			}
			else {
				objTdG = main_tbody.rows.cells[20];
			}
		}
		// ������ �� ���� --> ������ �� �Ϸ�
		else if( objName == "shift_3_wed_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[21];
			}
			else {
				objTdG = main_tbody.rows.cells[21];
			}
		}
		// ������ �� �Ϸ� --> ������ �� ����
		else if( objName == "shift_3_wed_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[22];
			}
			else {
				objTdG = main_tbody.rows.cells[22];
			}
		}
		// ������ �� ���� --> ������ �� �Ϸ�
		else if( objName == "shift_5_wed_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[23];
			}
			else {
				objTdG = main_tbody.rows.cells[23];
			}
		}
		// ������ �� �Ϸ� --> ����� �� ����
		else if( objName == "shift_5_wed_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[24];
			}
			else {
				objTdG = main_tbody.rows.cells[24];
			}
		}
		// ����� �� ���� --> ����� �� �Ϸ�
		else if( objName == "shift_1_thu_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[25];
			}
			else {
				objTdG = main_tbody.rows.cells[25];
			}
		}
		// ����� �� �Ϸ� --> ����� �� ����
		else if( objName == "shift_1_thu_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[26];
			}
			else {
				objTdG = main_tbody.rows.cells[26];
			}
		}
		// ����� �� ���� --> ����� �� �Ϸ�
		else if( objName == "shift_3_thu_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[27];
			}
			else {
				objTdG = main_tbody.rows.cells[27];
			}
		}
		// ����� �� �Ϸ� --> ����� �� ����
		else if( objName == "shift_3_thu_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[28];
			}
			else {
				objTdG = main_tbody.rows.cells[28];
			}
		}
		// ����� �� ���� --> ����� �� �Ϸ�
		else if( objName == "shift_5_thu_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[29];
			}
			else {
				objTdG = main_tbody.rows.cells[29];
			}
		}
		// ����� �� �Ϸ� --> �ݿ��� �� ����
		else if( objName == "shift_5_thu_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[30];
			}
			else {
				objTdG = main_tbody.rows.cells[30];
			}
		}
		// �ݿ��� �� ���� --> �ݿ��� �� �Ϸ�
		else if( objName == "shift_1_fri_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[31];
			}
			else {
				objTdG = main_tbody.rows.cells[31];
			}
		}
		// �ݿ��� �� �Ϸ� --> �ݿ��� �� ����
		else if( objName == "shift_1_fri_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[32];
			}
			else {
				objTdG = main_tbody.rows.cells[32];
			}
		}
		// �ݿ��� �� ���� --> �ݿ��� �� �Ϸ�
		else if( objName == "shift_3_fri_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[33];
			}
			else {
				objTdG = main_tbody.rows.cells[33];
			}
		}
		// �ݿ��� �� �Ϸ� --> �ݿ��� �� ����
		else if( objName == "shift_3_fri_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[34];
			}
			else {
				objTdG = main_tbody.rows.cells[34];
			}
		}
		// �ݿ��� �� ���� --> �ݿ��� �� �Ϸ�
		else if( objName == "shift_5_fri_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[35];
			}
			else {
				objTdG = main_tbody.rows.cells[35];
			}
		}
		// �ݿ��� �� �Ϸ� --> ����� �� ����
		else if( objName == "shift_5_fri_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[36];
			}
			else {
				objTdG = main_tbody.rows.cells[36];
			}
		}
		// ����� �� ���� --> ����� �� �Ϸ�
		else if( objName == "shift_1_sat_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[37];
			}
			else {
				objTdG = main_tbody.rows.cells[37];
			}
		}
		// ����� �� �Ϸ� --> ����� �� ����
		else if( objName == "shift_1_sat_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[38];
			}
			else {
				objTdG = main_tbody.rows.cells[38];
			}
		}
		// ����� �� ���� --> ����� �� �Ϸ�
		else if( objName == "shift_3_sat_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[39];
			}
			else {
				objTdG = main_tbody.rows.cells[39];
			}
		}
		// ����� �� �Ϸ� --> ����� �� ����
		else if( objName == "shift_3_sat_end" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[40];
			}
			else {
				objTdG = main_tbody.rows.cells[40];
			}
		}
		// ����� �� ���� --> ����� �� �Ϸ�
		else if( objName == "shift_5_sat_start" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[41];
			}
			else {
				objTdG = main_tbody.rows.cells[41];
			}
		}
		// ����� �� �Ϸ� --> ������
		else if( objName == "shift_5_sat_end" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = main_tbody.rows[0].cells[0];
				}
				else {
					objTdG = main_tbody.rows.cells[0];
				}
			}
			// �������� ù��° input box �� �̵�
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[0];
				}
				else {
					objTdG = main_tbody.rows.cells[0];
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
};

// üũ �ڽ� ����/����
function checkEvent(obj){
	
	var idx = obj.parentNode.parentNode.rowIndex;
	
	if(obj.value == "N"){
		obj.checked = true;
		obj.value = "Y";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "Y";			
		}
		else{
			document.frm.checkModify.value = "Y";			
		}
	}
	else{
		obj.checked = false;
		obj.value = "N";
		if(document.frm.checkModify[idx]){
			document.frm.checkModify[idx].value = "N";			
		}
		else{
			document.frm.checkModify.value = "N";			
		}
	}
};

// ������ ����, shift, start/end �ð� �ϰ� ����
function shiftChangeTimeBatch(){
	
	if(chkTime(document.frm.input_time) < 0) return; // �Է� �ð� üũ
	
	var tabLen = main_tbody.rows.length; // ���� ��
	
	/* ���� : ��(0), ��(6), ȭ(12), ��(18), ��(24), ��(30), ��(36)
	   shift : ��(0), ��(2), ��(4)
	   ����/�Ϸ� : ����(0), �Ϸ�(1) 
	    
	   ���� + shift + ����/�Ϸ� = ������ �ε���
	*/
	var day = Number(document.frm.selected_duty_day.value); // ����
	var shift = Number(document.frm.selected_shift.value); // ��/��/��
	var stat = Number(document.frm.selected_start_end.value); // ����/�Ϸ�
	var inputTime = document.frm.input_time.value; // �Է� �ð� 
	var idx = day + shift + stat; // �ε���
		
	if(tabLen == 1 && document.frm.checkModify.value == "Y"){ // ������ �����̰� üũ �ڽ��� üũ�� ����
				
		var objShiftTime = main_tbody.rows(0).childNodes(idx).childNodes(1); // ���� ������ ��ü(input box)�� ��� ��.
		if(objShiftTime.value == null || objShiftTime.value == "") return; // ���� ������ return
		//alert(objShiftTime.name);
		objShiftTime.value = inputTime; // value�� �Է½ð� �Է�
		setViewMode(objShiftTime); // <a> �±��� display ���� �����ϱ� ���� setViewMode()�Լ� ȣ��
	}
	else{
		for(i = 0; i < tabLen; i++){
			if(document.frm.checkModify[i]){
				if(document.frm.checkModify[i].value == "Y"){ // üũ �ڽ��� ���õ� ���θ� ����
					
					var objShiftTime = main_tbody.rows(i).childNodes(idx).childNodes(1); // ���� ������ ��ü(input box)�� ��� ��.
					if(objShiftTime.value == null || objShiftTime.value == "") continue; // ���� ������ return
					
					objShiftTime.value = inputTime; // value�� �Է½ð� �Է�
					setViewMode(objShiftTime); // <a> �±��� display ���� �����ϱ� ���� setViewMode()�Լ� ȣ��
				}
			}
		}
	}
};

// �Է� �ð� ���� üũ
function chkTime(obj){
	
	if(obj.value == null || obj.value == "" ) return -1;
	
	//var val = Number(obj.value);
	var val = obj.value;
	
	if( val.length != 6){ // �ڸ��� üũ
		alert("�߸��� ���� �Դϴ�.\nex) 060000 �Ǵ� 231020 ");
		obj.value = "";
		obj.focus();
		return -1;
	}
	if( val < "000000" || val > "235959" ){ // �ð� üũ
		alert("�߸��� ���� �Դϴ�.\nex) 060000 �Ǵ� 231020 ");
		obj.value = "";
		obj.focus();
		return -1;
	}
	
};
