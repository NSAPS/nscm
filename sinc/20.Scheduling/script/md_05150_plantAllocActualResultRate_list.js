
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
	var objTd = objBox.parentNode;
	
	if(objBox.name == "rate"){	
		if( strVal != "" && strVal != null ) {
			// ���� üũ
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
				setEditMode( objTd );
				return;
			}
		}
	}
		
	objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;";
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
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		// ����� --> ������
		if( objName == "rate" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = main_tbody.rows[0].cells[6];
				}
				else {
					objTdG = main_tbody.rows.cells[6];
				}
			}
			// �������� ù��° input box �� �̵�
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[6];
				}
				else {
					objTdG = main_tbody.rows.cells[6];
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
			}
			else {
				return;
			}
		}
	});
	
}

// ����
GoSave = function(service) {
	
	var tabLen = main_tbody.rows.length;
	
	// ����� �հ� üũ: �� ��ǰ�� ���庰 ������� ���� 100�� �Ǿ�� ��. �ƴ� 0 �Ǵ� null
	if( tabLen == 1){ // ������ �ϳ��϶�
		var rate = document.frm.rate.value;
		if( rate != 0 && rate != 100 ){
			alert("������� �߸� �Է��Ͽ����ϴ�. �� ��ǰ�� ���庰 ������� ���� 100(%)�� �Ǿ�� �մϴ�.");
			return;
		}
	}
	else{		
		var itemId = document.frm.dp_item_id[0].value; // ó�� ������ ���̵�� �ʱ�ȭ
		var itemCnt = 0;
		var cntSum = 0;
		var rateSum = 0; //����� �հ�
		
		for( i = 0 ; i < tabLen ; i++ ){
			if( itemId == document.frm.dp_item_id[i].value){ // ���� ��ǰ�� ��
				if( document.frm.rate[i].value != null && document.frm.rate[i].value != "" ){				
					rateSum += Number(document.frm.rate[i].value);
				}			
			}
			else{ // �ٸ� ��ǰ���� ����� ��
				// ���� ��ǰ üũ
				if( rateSum != 0 && rateSum != 100 ){ 
					alert("������� �߸� �Է��Ͽ����ϴ�. �� ��ǰ�� ���庰 ������� ���� 100(%)�� �Ǿ�� �մϴ�("+ i + ").");
					return;
				}
							
				rateSum = 0; // ���� ��ǰ�� ���� 0 �ʱ�ȭ
							
				itemId = document.frm.dp_item_id[i].value; //���ο� ��ǰ ���̵� �Է�
				
				if( document.frm.rate[i].value != null && document.frm.rate[i].value != "" ){
					rateSum += Number(document.frm.rate[i].value);
				}
						
			}
		}
		
		if( rateSum != 0 && rateSum != 100 ){ // ������ ������ üũ
			alert("������� �߸� �Է��Ͽ����ϴ�. �� ��ǰ�� ���庰 ������� ���� 100(%)�� �Ǿ�� �մϴ�.");
			return;
		}
	}		
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// ���� ��ǰ�� ���� ��뿩�� �ϰ� ����
function changeUseFlag(obj){
	
	var flag = obj.value;
	var rowIdx = obj.parentNode.parentNode.rowIndex;
	var tabLen = main_tbody.rows.length;
	var itemId = document.frm.dp_item_id[rowIdx].value;
	
	for( i = 0 ; i < tabLen ; i++){
		if( itemId == document.frm.dp_item_id[i].value ){
			document.frm.use_flag[i].value = flag;
			setViewMode(document.frm.use_flag[i]);
		}
	}	
}

// ���� ������ background color ����
function setItemGroupColor(){
	
	var tabLen = main_tbody.rows.length;
	
	if( tabLen == 1) return; // �� �����̸� ���� ����.
	
	var itemId = document.frm.dp_item_id[0].value; // ó�� ������ ���̵�� �ʱ�ȭ
	var color1 = "#d0d0d0";
		
	for( i = 0 ; i < tabLen ; i++ ){
		if( itemId == document.frm.dp_item_id[i].value){ // ���� ��ǰ�� ��
			main_tr[i].style.backgroundColor = color1;
		}
		else{
			if( color1 == "#d0d0d0"){
				color1 = "#ffffff";
			}
			else{
				color1 = "#d0d0d0";
			}
			
			itemId = document.frm.dp_item_id[i].value; // ���ο� ������ ���̵�� �ʱ�ȭ
			
			main_tr[i].style.backgroundColor = color1;
		}
	}
}

var orgColor;
// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ
// left_tbody �� ���� ���̺�
function bgOver2( obj ) { 
		
	if( main_tbody.rows[obj.rowIndex] ) 
	{ 
		orgColor = main_tbody.rows[obj.rowIndex].style.backgroundColor;
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee";
	} 
	else 
	{ 
		orgColor = main_tbody.rows.style.backgroundColor;
		main_tbody.rows.style.backgroundColor = "#eeeeee";
	}
	
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ
// left_tbody �� ���� ���̺�
function bgOut2( obj ) {
	
	if( main_tbody.rows[obj.rowIndex] ) 
	{ 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = orgColor;
		//main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff";
	} 
	else 
	{ 
		main_tbody.rows.style.backgroundColor = orgColor;
		//main_tbody.rows.style.backgroundColor = "#ffffff";
	}
	
}
