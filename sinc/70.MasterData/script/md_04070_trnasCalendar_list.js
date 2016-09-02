////////////////////////////////////////////////////////////
// ���α׷�ID : md_04070_trnasCalendar_list.js
// ���α׷��� : ���� Calendar����
// ������  : �̵���
// �������� : 2008-07-28 ������
//
//���� job file : job_sinc_70_masterData_00.xml
//
//���� query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-07-28  �̵���     md_04070_trnasCalendar_list.js ����
//
//
////////////////////////////////////////////////////////////

//�������� ����
var objTdG;


// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {	
	
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}	

	objTd.childNodes(0).style.display = "none";	
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
		
}


// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {	
	
	var strVal = objBox.value;
	var objName = objBox.name;
	

	
	
	// select box �� ���, value �� �ƴ϶� TEXT �� ǥ���� ��� ��
	if( objBox.tagName.toUpperCase() == "SELECT" ) {
		if( objBox.value == "" || objBox.value == null ) {
			strVal = objBox.value;
		}
		else {
			strVal = objBox.options[objBox.selectedIndex].text;
		}
		var objTd = objBox.parentNode;
	}
	else {
		strVal = objBox.value;
		var objTd = objBox.parentNode;
	}
	
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";	

	
	// input box �� View Mode �� ��ȯ
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";

	
/*
 	// Ȯ�������ϼ�, ���ϴ���1 ����, ���ϴ���1 ���� �Է�â�� ���, ���� üũ
	if( objBox.name == "time_fence" || objBox.name == "bckt1_horzn" || objBox.name == "bckt2_horzn" ) {
		if( strVal != "" && strVal != null ) {
			// ���� üũ, BLANK_INT : DEFAULT ����, �Ҽ��� �Ұ�
			if( checkNum(objBox, "BLANK_INT") == false ) {
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
*/
	
}



// setTimeout �� ����Ǵ� �Լ�
function setEditModeTime() {
	
	setEditMode( objTdG );
		
}

