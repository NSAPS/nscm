
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
	
	if(objBox.name == "priority"){	
		if( strVal != "" && strVal != null ) {
			// ���� üũ
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
				setEditMode( objTd );
				return;
			}
		}
	}
	if( objBox.name == "use_flag"){
		if( strVal == "Y"){
			strVal = "YES";
		}
		else if( strVal == "N"){
			strVal = "NO";
		}
		else{
			strVal = "";
		}
	}
	
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
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
		// �켱���� --> ��뿩��
		if( objName == "priority" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[8];
			}
			else {
				objTdG = main_tbody.rows.cells[8];
			}
		}
		else if( objName == "use_flag" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = main_tbody.rows[0].cells[7];
				}
				else {
					objTdG = main_tbody.rows.cells[7];
				}
			}
			// �������� ù��° input box �� �̵�
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[7];
				}
				else {
					objTdG = main_tbody.rows.cells[7];
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
	
	// ��ǰ�� ���ο� ���ؼ� �켱������ ��� �Է��ߴ����� üũ
	
	var itemId = document.frm.dp_item_id[0].value;
	var isNull = 0;
	var isNotNull = 0;
	var itemCnt = 0;
	var cntSum = 0;
	var prioritySum = 0;
	
	for( i = 0 ; i < tabLen ; i++ ){
		if( itemId == document.frm.dp_item_id[i].value){ // ���� ��ǰ�� ��
			if( document.frm.priority[i].value == null || document.frm.priority[i].value == "" ){				
				isNull++;
			}
			else{
				isNotNull++;
				prioritySum += Number(document.frm.priority[i].value);
			}
			
			cntSum += ++itemCnt;					
		}
		else{ // �ٸ� ��ǰ���� ����� ��
			// ���� ��ǰ üũ
			if( isNull > 0 && isNotNull > 0 ){ 
				alert("�켱������ �Է����� ���� ������ �ֽ��ϴ�. �� ��ǰ�� ���� ��� ������ �켱������ �Է� �Ͻʽÿ�(" + i + ").");
				return;
			}
			else{ // �켱������ ��� �Է��ϰų� ��� �Է����� ���� ��� ���� �ʱ�ȭ
				isNull = 0;
				isNotNull = 0;
			}
			//alert("cntSum:" + cntSum + "   prioritySum:" + prioritySum + "  index:" + i);
//			if( (prioritySum > 0) && (cntSum != prioritySum) ){// �켱���� ���������� �����ϴ��� üũ
//				alert("�켱������ �߸� �Է� �Ͽ����ϴ�. ���������� �Է� �Ͻʽÿ�. (ex:1,2,3...)");
//				return;
//			}
			prioritySum = 0;
			cntSum = 0;
			itemCnt = 0;
			
			itemId = document.frm.dp_item_id[i].value; //���ο� ��ǰ ���̵� �Է�
			
			if( document.frm.priority[i].value == null || document.frm.priority[i].value == "" ){
				isNull++;
			}
			else{
				isNotNull++;
				prioritySum += Number(document.frm.priority[i].value);
			}
			cntSum += ++itemCnt;			
		}
	}
	
	if( isNull > 0 && isNotNull > 0 ){ 
		alert("�켱������ �Է����� ���� ������ �ֽ��ϴ�. �� ��ǰ�� ���� ��� ������ �켱������ �Է� �Ͻʽÿ�.");
		return;
	}
	else{ // �켱������ ��� �Է��ϰų� ��� �Է����� ���� ��� ���� �ʱ�ȭ
		isNull = 0;
		isNotNull = 0;
	}
	//alert("cntSum:" + cntSum + "   prioritySum:" + prioritySum);
//	if( (prioritySum > 0) && (cntSum != prioritySum) ){// �켱���� ���������� �����ϴ��� üũ
//		alert("�켱������ �߸� �Է� �Ͽ����ϴ�. ���������� �Է� �Ͻʽÿ�. (ex:1,2,3...)");
//		return;
//	}
	
			
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// ���� ��ǰ�� ���� ��å �ϰ� ����
function changePolicy(obj){
	
	var flag = obj.value;
	var rowIdx = obj.parentNode.parentNode.rowIndex;
	var tabLen = main_tbody.rows.length;
	var itemId = document.frm.dp_item_id[rowIdx].value;
	
	for( i = 0 ; i < tabLen ; i++){
		if( itemId == document.frm.dp_item_id[i].value ){
			document.frm.policy[i].value = flag;
			setViewMode(document.frm.policy[i]);
		}
	}	
}

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