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
//	if( objBox.name == "work_type"){
//		if( objBox.options[objBox.selectedIndex].text == "����" ){
//			objBox.parentNode.childNodes(0).innerHTML = " ";
//		}
//		else{
//			objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + objBox.options[objBox.selectedIndex].text;
//		}
//	}
//	else{
//		objBox.parentNode.childNodes(0).innerHTML = strVal;
//	}
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
	
	viewWait();

//	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

GoSearch = function(service) {
	
	if(service == "sc_01050_shiftOperationCalendar_list_change_comp"){
		if(document.frm.selected_line.value == null || document.frm.selected_line.value == ""){
			alert("������ �������� �ʾҽ��ϴ�. ������ ������ �ֽʽÿ�.");
			return;
		}
		
		if(!confirm("���� �Ͻðڽ��ϱ�?")){
		return;
	}
	}
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

function SaveApplyWorkDiaryNext() {
	
	var selected_plant = document.frm.selected_plant.value;
	var duty_date = document.frm.duty_date.value;

	var selected_plant_text = document.frm.selected_plant.options[document.frm.selected_plant.selectedIndex].text // �����׸� text

	if(selected_plant == "" || selected_plant == null) {
		alert("�۾��� ������ �������ֽʽÿ�!");
		return;
	}
	if(duty_date == "" || duty_date == null) {
		alert("�۾���¥�� �Է����ֽʽÿ�!");
		return;
	}
//alert(selected_plant+"!%!"+duty_date+" "+selected_plant_text);
	
	if(confirm("���� "+selected_plant_text +"�� ���Į���ٸ� ���� ���ķ� �����Ͻðڽ��ϱ�?") == 1 ){
		viewWait();
		commonUtil.executeQuery("selected_plant!%!duty_date", selected_plant+"!%!"+duty_date, "sc_01050_SP_PS_WORK_DIARY_PLANT", {
			callback:function(result){
				if(result == "SUCCESS"){
					
				}
				else{
					alert("���Į������ ���ֹݿ��� ������ �ֽ��ϴ�. �����ڿ��� ��ȭ���ֽʽÿ�.");
					return;
				}
				gridArea.style.display = "block";
				waitArea.style.display = "none";
			}
		});
	}
	
}

// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER 
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		// �Ͽ��� �� -> �Ͽ��� ��
		if( objName == "shift_1_sun" ) {
			if( main_tbody.rows[rowIdx] ) {
				//alert("!!");
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// �Ͽ��� �� -> �Ͽ��� ��
		else if( objName == "shift_3_sun" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else {
				objTdG = main_tbody.rows.cells[4];
			}
		}
		// �Ͽ��� �� -> ������ ��
		else if( objName == "shift_5_sun" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[6];
			}
			else {
				objTdG = main_tbody.rows.cells[6];
			}
		}	
		// ������ �� -> ������ ��
		else if( objName == "shift_1_mon" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[8];
			}
			else {
				objTdG = main_tbody.rows.cells[8];
			}
		}
		// ������ �� -> ������ ��
		else if( objName == "shift_3_mon" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[10];
			}
			else {
				objTdG = main_tbody.rows.cells[10];
			}
		}
		// ������ �� -> ȭ���� ��
		else if( objName == "shift_5_mon" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[12];
			}
			else {
				objTdG = main_tbody.rows.cells[12];
			}
		}
		// ȭ���� �� -> ȭ���� ��
		else if( objName == "shift_1_tue" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[14];
			}
			else {
				objTdG = main_tbody.rows.cells[14];
			}
		}
		// ȭ���� �� -> ȭ���� ��
		else if( objName == "shift_3_tue" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[16];
			}
			else {
				objTdG = main_tbody.rows.cells[16];
			}
		}
		// ȭ���� �� -> ������ ��
		else if( objName == "shift_5_tue" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[18];
			}
			else {
				objTdG = main_tbody.rows.cells[18];
			}
		}
		// ������ �� -> ������ ��
		else if( objName == "shift_1_wed" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[20];
			}
			else {
				objTdG = main_tbody.rows.cells[20];
			}
		}
		// ������ �� -> ������ ��
		else if( objName == "shift_3_wed" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[22];
			}
			else {
				objTdG = main_tbody.rows.cells[22];
			}
		}
		// ������ �� -> ����� ��
		else if( objName == "shift_5_wed" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[24];
			}
			else {
				objTdG = main_tbody.rows.cells[24];
			}
		}
		// ����� �� -> ����� ��
		else if( objName == "shift_1_thu" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[26];
			}
			else {
				objTdG = main_tbody.rows.cells[26];
			}
		}
		// ����� �� -> ����� ��
		else if( objName == "shift_3_thu" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[28];
			}
			else {
				objTdG = main_tbody.rows.cells[28];
			}
		}
		// ����� �� -> �ݿ��� ��
		else if( objName == "shift_5_thu" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[30];
			}
			else {
				objTdG = main_tbody.rows.cells[30];
			}
		}
		// �ݿ��� �� -> �ݿ��� ��
		else if( objName == "shift_1_fri" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[32];
			}
			else {
				objTdG = main_tbody.rows.cells[32];
			}
		}
		// �ݿ��� �� -> �ݿ��� ��
		else if( objName == "shift_3_fri" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[34];
			}
			else {
				objTdG = main_tbody.rows.cells[34];
			}
		}
		// �ݿ��� �� -> ����� ��
		else if( objName == "shift_5_fri" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[36];
			}
			else {
				objTdG = main_tbody.rows.cells[36];
			}
		}
		// ����� �� -> ����� ��
		else if( objName == "shift_1_sat" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[38];
			}
			else {
				objTdG = main_tbody.rows.cells[38];
			}
		}
		// ����� �� -> ����� ��
		else if( objName == "shift_3_sat" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[40];
			}
			else {
				objTdG = main_tbody.rows.cells[40];
			}
		}
		// ����� �� --> ������ �ڵ�
		else if( objName == "shift_5_sat" ) {
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

// ���� => ����, ���� => ����
function changeStatus(obj){
	if(obj.value == "����"){
		obj.value = "����";
		obj.parentNode.previousSibling.style.backgroundColor = "#d0d0d0"
		obj.style.color = "#ff0000";
	}
	else{
		obj.value = "����";
		obj.parentNode.previousSibling.style.backgroundColor = "#ffffff"
		obj.style.color = "#000000";
	}
	
	var checkFlag = obj.parentNode.childNodes(1);
	//alert(checkFlag.value);
	// check_flag ���� ���� ���� ����
	// 0 : ���� ���� ����.
	// 1 : �ٹ����� ����.
	// 2 : ����/���� ������ ����.
	// 3 : �ٹ���, ����/���� ���� �Ѵ� ����.
	if(checkFlag.value == "0"){
		checkFlag.value = "2";
	}
	else if(checkFlag.value == "1"){
		checkFlag.value = "3";
	}
	else if(checkFlag.value == "2"){
		checkFlag.value = "0";
	}
	else if(checkFlag.value == "3"){
		checkFlag.value = "1";
	}
	//alert(checkFlag.value);
	//alert(checkFlag.name + "," + checkFlag.value);
	/*if(obj.name == "change_sun_sihft1"){
		if(document.frm.sun_shift1_check_flag.value == "N"){
			document.frm.sun_shift1_check_flag.value = "Y";
		}
		else{
			document.frm.sun_shift1_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_sun_sihft3"){
		if(document.frm.sun_shift3_check_flag.value == "N"){
			document.frm.sun_shift3_check_flag.value = "Y";
		}
		else{
			document.frm.sun_shift3_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_sun_sihft5"){
		if(document.frm.sun_shift5_check_flag.value == "N"){
			document.frm.sun_shift5_check_flag.value = "Y";
		}
		else{
			document.frm.sun_shift5_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_mon_sihft1"){
		if(document.frm.mon_shift1_check_flag.value == "N"){
			document.frm.mon_shift1_check_flag.value = "Y";
		}
		else{
			document.frm.mon_shift1_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_mon_sihft3"){
		if(document.frm.mon_shift3_check_flag.value == "N"){
			document.frm.mon_shift3_check_flag.value = "Y";
		}
		else{
			document.frm.mon_shift3_check_flag.value = "N";
		}
	}
	else if(obj.name == "change_mon_sihft5"){
		if(document.frm.mon_shift5_check_flag.value == "N"){
			document.frm.mon_shift5_check_flag.value = "Y";
		}
		else{
			document.frm.mon_shift5_check_flag.value = "N";
		}
	}
	*/
};

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

// ������ �Ⱓ�� shift�� �ϰ�����
function shiftChangeBatch(){
	
	var tabLen = main_tbody.rows.length;
	
	/* ����, �� ���� : ��(0), ��(6), ȭ(12), ��(18), ��(24), ��(30), ��(36)
	   ��(1), ��(3), ��(5)
	   ����(O), ����(N) */
	var dayFrom = document.frm.selected_duty_day_from.value; // ���� ����
	var dayTo = document.frm.selected_duty_day_to.value; // �� ����
	var shift = document.frm.selected_shift.value; // ��/��/��
	var stat = document.frm.selected_o_n.value; // ����/����
	var cnt = 6;
	var startCnt = Number(dayFrom);
	if(shift == "ALL") {
		cnt = 2;
		startCnt += 1;
		shift = "0";
	}
	
	if(tabLen == 1 && document.frm.checkModify.value == "Y"){		
		
		for(j = startCnt; j < (Number(dayTo)+6); j += cnt){
			var objShiftTeam = main_tbody.rows(0).childNodes(j + Number(shift) - 1).childNodes(1)
			if(objShiftTeam.value == null || objShiftTeam.value == "") continue;
			var objButton = main_tbody.rows(0).childNodes(j + Number(shift)).childNodes(0);// ��ư
			if(stat == "O" && objButton.value == "����"){
				objButton.value = "����";
				changeStatus(objButton);
			}
			else if(stat == "N" && objButton.value == "����"){
				objButton.value = "����";
				changeStatus(objButton);
			}
		}
		return;		
	}
	for(i = 0; i < tabLen; i++){
		if(document.frm.checkModify[i].value == "Y"){
			for(j = startCnt; j < (Number(dayTo)+6); j += cnt){
				var objShiftTeam = main_tbody.rows(i).childNodes(j + Number(shift) - 1).childNodes(1)
				if(objShiftTeam.value == null || objShiftTeam.value == "") continue;
				var objButton = main_tbody.rows(i).childNodes(j + Number(shift)).childNodes(0);// ��ư
				if(stat == "O" && objButton.value == "����"){
					objButton.value = "����";
					changeStatus(objButton);
				}
				else if(stat == "N" && objButton.value == "����"){
					objButton.value = "����";
					changeStatus(objButton);
				}
			}
		}
	}
};

// �ٹ��� ����� check_flag ����
function changeShiftSelect(obj){ 
	if(obj.nextSibling.value == null || obj.nextSibling.value == ""){// �ٹ��� ������ ������ �Լ� ���� ����
		obj.options(0).selected = true; // ����� select box �����·� ����
		return;
	}
	var objCheck = obj.parentNode.nextSibling.childNodes(1); // check_falg
	
	// check_flag ���� ���� ���� ����
	// 0 : ���� ���� ����.
	// 1 : �ٹ����� ����.
	// 2 : ����/���� ������ ����.
	// 3 : �ٹ���, ����/���� ���� �Ѵ� ����.
	if(objCheck.value == "0" || objCheck.value == "1"){
		objCheck.value = "1";
	}
	else if(objCheck.value == "2" || objCheck.value == "3"){
		objCheck.value = "3";
	}
	//alert(objCheck.value);
}

function aaa() {
	
	var plant_id = document.frm.stored_plant.value;
	var team_id = document.frm.stored_team.value;
	var line_id = document.frm.stored_line.value;
	var duty_date = document.frm.stored_duty_date.value;
	
	//alert(plant_id + "," + team_id + "," + line_id + "," + duty_date);
	
	var service_url = "service.do?_moon_service=sc_01050_shiftOperationCalendar_popup&_moon_perpage=200&_moon_pagenumber=1";
	service_url += "&selected_plant=" + plant_id + "&selected_won=" + team_id + "&selected_line=" + line_id + "&duty_date=" + duty_date;
		
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=800, height=500, top=0, left=0";
	var newWin = window.open(service_url, "SHIFT_OPER_CAL_POPUP", pop_win_style); 
	newWin.focus();
}
