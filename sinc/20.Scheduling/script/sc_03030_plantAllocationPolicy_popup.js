
// Ŭ���� ���� �ε���
var clickedLineIdx = null;

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
		
}

// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	// �����, �ּ� �й跮 �Է�â�� ���, ���� üũ
	if( objBox.name == "alloc_rate" || objBox.name == "min_qty" ) {
		if( strVal != "" && strVal != null ) {
			// ���� üũ
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
				setEditMode( objBox.parentNode );
				return;
			}			
		}		
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
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
		
}

// ���� input box �� ���� check 
// parameter : obj - inbox object , type - default value �Ǵ� �Ҽ��� check ���� ���� type ���� 
// type - BLANK : ����ڰ� �߸��� ���� �Է����� �� default value �� �������� ��ȯ, �Ҽ��� ���
//        ZERO : ����ڰ� �߸��� ���� �Է����� �� default value �� 0 ���� ��ȯ, �Ҽ��� ��� 
//        BLANK_INT : ����ڰ� �߸��� ���� �Է����� �� default value �� �������� ��ȯ, �Ҽ����� error ó��( only integer ) 
//        ZERO_INT : ����ڰ� �߸��� ���� �Է����� �� default value �� 0 ���� ��ȯ, �Ҽ����� error ó��( only integer ) 
//        BLANK_INT_UP : ����ڰ� �߸��� ���� �Է����� �� default value �� �������� ��ȯ, ���� & �Ҽ����� error ó��( only plus integer ) 
//        ZERO_INT_UP : ����ڰ� �߸��� ���� �Է����� �� default value �� 0 ���� ��ȯ, ���� & �Ҽ����� error ó��( only plus integer ) 
//        ** type parameter �� ������ ZERO(default=0, �Ҽ��� ���) �� ���� 
function checkNum(obj, type) {

	var i, ch;
	var pointCheck = 0;
	var defaultVal = "0"; 
	var alertMsg = "���ڸ� �Է��Ͽ� �ּ���.";
	var checkType = "POINT"; 
	
	// default value �� ���� 
	if( type == "BLANK" || type == "BLANK_INT" || type == "BLANK_INT_UP" ) 
		defaultVal = ""; 
	
	// �Ҽ��� ������� ���� 
	if( type == "BLANK_INT" || type == "ZERO_INT" || type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
	{ 
		if( type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
			alertMsg = "�ڿ����� �Է��Ͽ� �ּ���."; 
		else 
			alertMsg = "������ �Է��Ͽ� �ּ���."; 
		checkType = "INT"; 
		pointCheck = 1; 
	} 
	
	var checkValue = delComma(obj.value).trim();

	if( defaultVal == "0" && ( checkValue == null || checkValue == "" ) )
	{
		//objSetting(obj, defaultVal, alertMsg);
		return false;
	}
	
	for (i=0; i < checkValue.length; i++) {
		
		ch = checkValue.charAt(i);
		
		// invalid value 
		if(ch==" ")
		{ 
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
		
		// valid value
		else if ( ( ch >= 0 && ch <= 9 ) ) 
		{ }
		
		// point check 
		else if ( ch == '.' ) 
		{
			pointCheck += 1;
			// invalid value 
			if ( pointCheck > 1 )
			{
				//objSetting(obj, defaultVal, alertMsg); 
				return false;
			} 
		} 
		
		// valid value : minus sign 
		else if ( i == 0 && ch == '-' && type != "BLANK_INT_UP" && type != "ZERO_INT_UP" ) 
		{ } 
		
		// invalid value 
		else 
		{
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
	}
	
	obj.value = checkValue; 
	return true;
	
}

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
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
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	} 
	else { 
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			left_tbody.rows.style.backgroundColor = "#ffffff";
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	}
	
}

// ����
function GoSave( service ) {
	
	var tableLen = left_tbody.rows.length;
		
	// ������� �հ谡 100���� üũ
	var rateTot = 0;
	var i = 0;
	while( i < tableLen ) {
		if( document.frm.alloc_rate[0].value ) {
			if( document.frm.alloc_rate[i].value == null || document.frm.alloc_rate[i].value == "" ) {
				alert("������� ��� �Է��ؾ� �մϴ�.");
				return;
			}
			else {
				rateTot += Number(document.frm.alloc_rate[i].value);
				i++;
			}
		}
		else {
			if( document.frm.alloc_rate.value == null || document.frm.alloc_rate.value == "" ) {
				alert("������� ��� �Է��ؾ� �մϴ�.");
				return;
			}
			else {
				rateTot += Number(document.frm.alloc_rate.value);
			}
		}
	}
	if( rateTot != 100 ) {
		alert("������� 100�� �Ѱų� �����մϴ�.");
		if( left_tbody.rows[0] ) {
			objTdG = left_tbody.rows[0].cells[1];
		}
		else {
			objTdG = left_tbody.rows.cells[1];
		}
		setTimeout(setEditModeTime, 1);
		return;
	}
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
	opener.GoSearch("sc_03030_plantAllocationPolicy_list");
	
	this.focus();
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
		// ����� --> �ּ��Ҵ�����
		if( objName == "alloc_rate" ) {
			if( left_tbody.rows[rowIdx] ) {
				objTdG = left_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = left_tbody.rows.cells[2];
			}
		}
		// 
		else if( objName == "min_qty" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				if( left_tbody.rows[0] ) {
					objTdG = left_tbody.rows[0].cells[1];
				}
				else {
					objTdG = left_tbody.rows.cells[1];
				}
			}
			// �������� ù��° input box �� �̵�
			else {
				if( left_tbody.rows[rowIdx] ) {
					objTdG = left_tbody.rows[rowIdx+1].cells[1];
				}
				else {
					objTdG = left_tbody.rows.cells[1];
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

// HTML Grid ȭ�� resizing
function setHtmlGridAutoResize( tab_h, table_h ){
	
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
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tbMain.style.height = tableHeightValue + "px"; 
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	//tabPage1.style.width = tabWidthValue + "px"; 
	tbMain.width = tableWidthValue + "px"; 
	topLine.style.width = topLineWidthValue + "px"; 
	mainDisplay.style.width = displayWidthValue + "px";
	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
	
} 