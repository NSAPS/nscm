// Ŭ���� �������� �ε���
var clickedDateIdx = null;

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

// combo box �� View Mode �� ��ȯ
function setViewMode(objBox) {
	
	// �������� ���� ���
	if( objBox.name == "transDateTmp" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == clickedDateIdx ) {
			return;
		}
		objTd.childNodes(1).value = strVal;
		
		// start_date�� �����ϸ� �ڵ����� end_date�� ���õǵ��� �����ϴ� �κ�.
		var tableRow = objBox.parentNode.parentNode.parentNode.rowIndex;
		if(objTd.childNodes(1).name == "start_date"){
			if(document.frm.start_date[tableRow]){
				var m_date = document.frm.start_date[tableRow].value;
				document.frm.end_date[tableRow].value = m_date;
				divEndDate[tableRow].innerHTML = m_date;
			}
			else{
				var s_date = document.frm.start_date.value;
				document.frm.end_date.value = s_date;
				divEndDate.innerHTML = s_date;
			}
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
	objTd.onclick = function() { setEditMode(this); };

}

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	
	// �������� �˻� ��
	if( objTd.childNodes(0).id == "divStartDate" || objTd.childNodes(0).id == "divEndDate") {
		objTd.childNodes(0).style.display = "block";
		objTd.childNodes(1).style.display = "none";
		var strDate = "<input type=\"text\" name=\"transDateTmp\" size=\"10\" maxlength=\"10\" onDblClick=\"this.select(); \" "
			+ "class=\"normal\" onBlur=\"chkDate2(this,'10'); \" onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
			+ "style=\"text-align:center; width:70px; \" ><img src=\"sinc/template/basic/skin/nongshim/images/common/icon_cal.gif\" "
			+ "id=\"btnDate\" align=\"absmiddle\" border=\"0\" style=\"cursor:pointer; \" "
			+ "onMouseOver=\"overBtn(this); \" onMouseOut=\"outBtn(this); \">";
		objTd.childNodes(0).innerHTML = strDate;
		document.frm.transDateTmp.value = objTd.childNodes(1).value;
		document.frm.transDateTmp.focus();
		Calendar.setup({
			inputField  : "transDateTmp", // id of the input field
			ifFormat    : "%Y-%m-%d",     // format of the input field 
			button      : "btnDate",      // trigger for the calendar (button ID)
			align       : "Tl",           // alignment (defaults to "Bl")
			singleClick : true
		});
	}
	else {
		//objTd.childNodes(1).select();
		objTd.childNodes(1).focus();
	}
	
	objTd.onclick = "";

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
	// �����������, ������������ ���� ���
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) { // main_tbody.rows[...].cells error �ΰ��, ����Ұ�
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}else{
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	var objId = objBox.parentNode.id;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
	
		// START_DATE --> START_TIME
		if( objName == "transDateTmp" && objId == "divStartDate") {
			objTdG = main_tbody.rows[rowIdx].cells[8];
		}
		// START_TIME --> END_DATE
		else if( objName == "start_time" ) {
			objTdG = main_tbody.rows[rowIdx].cells[9];
		}
		// END_DATE --> END_TIME
		else if( objName == "transDateTmp" && objId == "divEndDate") {
			objTdG = main_tbody.rows[rowIdx].cells[10];
		}
		// END_TIME --> ������ START_DATE
		else if( objName == "end_time" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				objTdG = main_tbody.rows[0].cells[7];
			}
			// �������� ù��° input box �� �̵�
			else {
				objTdG = main_tbody.rows[rowIdx+1].cells[7];
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
function GoSave(service) {
	
	var tableLen = left_tbody.rows.length;
	
	if(tableLen == 1){
		if( document.frm.check_flag.checked ) {
			document.frm.check_flag.value = "Y";
			document.frm.check_value.value = "Y";
		}else{
			document.frm.check_flag.value = "N";
			document.frm.check_value.value = "N";
		}		
	}else{
		for( var i=0 ; i < tableLen ; i++ ) {
			if( document.frm.check_flag[i].checked ) {
				document.frm.check_flag[i].value = "Y";
				document.frm.check_value[i].value = "Y";
			}else{
				document.frm.check_flag[i].value = "N";
				document.frm.check_value[i].value = "N";
			}			
		}	
	}
	
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();

	var rowNo = main_tbody.rows.length;
	var old_req_no = "0000";
	var old_ReqName = "�ƹ���";
	var req_no;
	var message;
	var req_hp_no;	// ���� ��ȣ				
	var con_hp_no; //������ ��ȣ 
	
	// SMS������ ����
	// 1. ��������� ���� AND �ű�Ȯ��üũ�� �� ���
	// 2. ��û��ȣ�� ������ ���� �ѹ��� ������.
	// 3. ������ȣ�� '0000000000'�̸� ������ �ʴ´�
	if(rowNo == 1) { // Ȯ������ �Ǽ��� �ѰǸ� �����Ұ��...
		if((document.frm.prod_no.value == "" || document.frm.prod_no.value == null) && 
			(document.frm.old_check_value.value == "N" && document.frm.check_value.value == "Y") &&
			(document.frm.req_hp_no.value != "0000000000")){ 

		message			= "���������Ȯ�Ρ�"+"SCM���� ��û��ȣ["+document.frm.req_no.value + "]�� ���� Ȯ���Ͽ����ϴ�.";
		req_hp_no 		= document.frm.req_hp_no.value;					
		con_hp_no 		= document.frm.con_hp_no.value;
	
		smsCaller.sendSMS(req_hp_no, con_hp_no, message, "SOT", ""); 
		}
		else if(document.frm.req_hp_no.value == "0000000000"){
			alert(document.frm.WbsName.value + "�� " + document.frm.ReqName.value + "�� �ڵ��� ��ȣ�� ���� SMS������ �ȵ˴ϴ�!");
		}
	}
	else {
		
		for(var i = 0 ; i < rowNo ; i++){
	
			if((document.frm.prod_no[i].value == "" || document.frm.prod_no[i].value == null) &&
			   (document.frm.old_check_value[i].value == "N" && document.frm.check_value[i].value == "Y")) {
				req_no	= document.frm.req_no[i].value;

				if(req_no != old_req_no && document.frm.req_hp_no[i].value != "0000000000") { 
					
					message			= "���������Ȯ�Ρ�"+"SCM���� ��û��ȣ["+ req_no + "]�� ���� Ȯ���Ͽ����ϴ�.";
					req_hp_no 		= document.frm.req_hp_no[i].value;					
					con_hp_no 		= document.frm.con_hp_no[i].value;

					smsCaller.sendSMS(req_hp_no, con_hp_no, message, "SOT", "");
					
					old_req_no		= req_no; 
				}
				else if(old_ReqName != document.frm.ReqName[i].value && document.frm.req_hp_no[i].value == "0000000000"){
					alert(document.frm.WbsName[i].value + "�� " + document.frm.ReqName[i].value + "�� �ڵ��� ��ȣ�� ���� SMS������ �ȵ˴ϴ�!");
					old_ReqName = document.frm.ReqName[i].value;
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
	
}

// ��ȸ ��ư Ŭ��
function GoSearch(service) {
	
	var selected_plant = document.frm.selected_plant.value;
	
	// ������ �������� ���� ���
	if( selected_plant == "" ) {
		alert("������ ������ �ֽʽÿ�.");
		return;
	}
	
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();

	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
		
}

// ��¥ ������ üũ�ϴ� �Լ�, return value : 1-�´� ����, 0-�߸��� ����
function chkDate2(obj) {
	
	var separator = "-"; 
	
	var str = obj.value.trim();
	
	if( str == "" || str == null ){
		obj.value = str;
		setViewMode(obj);
		return 1;
	}
	
	str = str.replace(/\//g, '').replace(/-/g, '');
	obj.value = str.substr(0, 4) + separator + str.substr(4, 2) + separator + str.substr(6, 2);
	
	var input = obj.value.trim(); 
	
	if ( input.length == 0 ) return 1; // ������ skip
	
	var dateType = "yyyy-MM-dd"; 
	var inputYear = input.substr(0,4); 
	var inputMonth = input.substr(5,2) - 1; 
	var inputDate = input.substr(8,2); 
	
	if( (input.substr(4,1) != "-" && input.substr(4,1) != "/") || (input.substr(7,1) != "-" && input.substr(7,1) != "/") ) 
	{ 
		separator = "invalid"; 
	}
	
	var resultDate = new Date(inputYear, inputMonth, inputDate); 
	if ( resultDate.getFullYear() != inputYear || resultDate.getMonth() != inputMonth || resultDate.getDate() != inputDate || input.length != 10 || separator == "invalid" ) 
	{ 
		obj.value = ""; 
		//obj.select(); 
		alertChkDate(input, dateType); 
		setEditMode( obj.parentNode );
		return 0; 
	} 
	else 
	{ 
		//setViewMode(obj);
		return 1; 
	} 
	
}

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#cccccc" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
	}
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#cccccc" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
	}
}

function checkCancelFlag(){
	var tableLen = left_tbody.rows.length;
	if(tableLen == 1){
		if( document.frm.cancel_flag.checked ) {
			document.frm.start_date.parentNode.onclick = "";
			document.frm.start_time.parentNode.onclick = "";
			document.frm.end_date.parentNode.onclick = "";
			document.frm.end_time.parentNode.onclick = "";
			document.frm.check_flag.disabled = "true";
			left_tbody.rows.style.backgroundColor = "#cccccc";
			main_tbody.rows.style.backgroundColor = "#cccccc"; 
		}	
	}else{
		for( var i=0 ; i < tableLen ; i++ ) {
			if( document.frm.cancel_flag[i].checked ) {
				document.frm.start_date[i].parentNode.onclick = "";
				document.frm.start_time[i].parentNode.onclick = "";
				document.frm.end_date[i].parentNode.onclick = "";
				document.frm.end_time[i].parentNode.onclick = "";
				document.frm.check_flag[i].disabled = "true";
				left_tbody.rows[i].style.backgroundColor = "#cccccc";
				main_tbody.rows[i].style.backgroundColor = "#cccccc"; 
			}		
		}	
	}
}
