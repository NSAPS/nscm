
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var popImgIdx = null;

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
		
	objTd.childNodes(0).style.display = "none";		
	objTd.childNodes(1).style.display = "block";
		
	if( objTd.childNodes(1).tagName.toUpperCase() == "SELECT") { // ����, ����, �۾��� �ݿ� ���� �� 
					                      
		objTd.childNodes(1).focus();
	}
	else if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "INPUT"){ // ��ǰ �ڵ� ��
		objTd.childNodes(1).childNodes(0).select(); // focus()�̸�, item search popup â�� �θ�â �ڿ� ��ġ��.
	}
	else {// ����, ����, �۾��� ��		
		objTd.childNodes(1).childNodes(0).focus();
	}			
}

// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
	
	document.frm.set_edit_flag.value = "false"; //
	
	var strVal;
	var objTd;
			
	if(objBox.tagName.toUpperCase() == "INPUT"){//
		strVal = objBox.value;
		objTd = objBox.parentNode.parentNode;		
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		}
		objBox = objBox.parentNode;
	}	
	else if( objBox.tagName.toUpperCase() == "SELECT"){//
		strVal = objBox.options[objBox.selectedIndex].text;	
		objTd = objBox.parentNode;
	}
	else{
		if(objBox.childNodes(0).value == null || objBox.childNodes(0).value == ""){
			objTd = objBox.parentNode;
			objTd.childNodes(0).style.display = "block";
			objTd.childNodes(1).style.display = "none";
			return;
		}
		strVal = objBox.childNodes(0).value + " <br>&nbsp;";		
		strVal += objBox.childNodes(0).options[objBox.childNodes(0).selectedIndex].text;
		objTd = objBox.parentNode;
	}
	
		
	if( objBox.parentNode.align.toUpperCase() == "CENTER" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal;
	}
	else if( objBox.parentNode.align.toUpperCase() == "RIGHT" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;";
	}
	else {
		objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	}
	
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";
	
}



// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	}
	
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	} 
	else { 
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows.style.backgroundColor = "#ffffff";
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	}
	
}


// �� ���� ��������
var objTdG;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}



// ��ǰ �˻� POPUP
function openItemSearchPop( obj ) { 	
	
	if(obj.name == "imgItemId"){ // ��ǰ �ڵ� ���� ��ǰ�˻� popup
		document.frm.search_item_popup_flag.value = "INPUT";
		var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
		if(document.frm.item_id[rowIdx] ){
			var item_id = document.frm.item_id[rowIdx].value; //ǰ���ڵ�
		}
		else{		
			var item_id = document.frm.item_id.value; //ǰ���ڵ�
		}
				
		var service_url = "service.do?_moon_service=item_search_popup_for_notuse_proc";
		service_url += "&_moon_perpage=200&_moon_pagenumber=1";
		service_url += "&search_item_id=" + item_id + "&rowIdx=" + rowIdx;
	}
	else{ // ��ȸ ������ ��ǰ�˻� popup
		document.frm.search_item_popup_flag.value = "SEARCH";
		var service_url = "service.do?_moon_service=item_search_popup_for_notuse_proc";
		service_url += "&_moon_perpage=200&_moon_pagenumber=1";
		service_url += "&search_item_id=" + obj.value; 
	}
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Item_Search", pop_win_style);
	newWin.focus();
	
}

// popup ��ȸ �̹��� mouseOver
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup ��ȸ �̹��� mouseOut
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function outImg( objImg ) {
	
	popImgIdx = null;
	
}

// ��ȸ���� ��ǰ �ڵ� �Է½� ��ǰ�� ������.
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.search_item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.search_item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.search_item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}





