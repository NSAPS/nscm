// �������� ����
var objTdG;

// ����ȭ������ �̵�
function moveBack() {
	
	var cd_grp_pre = document.frm.cd_grp_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;	
	var plant_name = document.frm.plant_name.value;
	var jc_type = document.frm.jc_type.value;
	var select_line = document.frm.select_line.value;
	var select_proc = document.frm.select_proc.value;	
	
	var urlStr = "service.do?_moon_service=sc_01090_jobChangeMgmt_list";
	urlStr += "&plant_name=" + plant_name + "&jc_type=" + jc_type + "&select_line=" + select_line + "&select_proc=" + select_proc;
	urlStr += cd_grp_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	
	location.href = urlStr;
	
}



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
	
	
	if( strVal != "" && strVal != null ) {
		// ���� üũ
		if( checkNum(objBox, "BLANK") == false ) {
			//objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
			//setEditMode( objTd );
			return;
		}
		// ������ �´� ��� õ���� ������ ǥ��
		else {
			strVal = objBox.value;
			objBox.value = numberFormat( strVal );
			strVal = objBox.value;
		}
	}
	
		
	
	// input box �� View Mode �� ��ȯ
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}



// TAB key �� ���� �׸� �̵�
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ){ 
				
				
		// effic --> ������ �ڵ�
		if( objName == "jc_time" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
					objTdG = main_tbody.rows[0].cells[5];
			}
			// �������� input box �� �̵�
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[5];
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

// setTimeout �� ����Ǵ� �Լ�
function setEditModeTime() {
	
	setEditMode( objTdG );
		
}


// ��ȸ���� sleect �ڽ� '������'�� ���õǸ� jc time �����
function del() {
	
	var efficiency = document.frm.jc_name.value;
	var tableLen = main_tbody.rows.length;
	var ef = document.frm.eff_mod;
	
	if (efficiency == "EFFICIENCY") {
	
		for (var i=0; i < tableLen; i++) {
		
		 	document.frm.jc_time[i].value = "";
		 	jct[i].innerHTML = "";
		 	
		}
				
		document.frm.eff_mod.focus();
	}	
}





//��ȸ������ �������� �Է½� jcŸ���� '������'������ üũ
function chen(objBox) {
		
	var efficiency = document.frm.jc_name.value;	
	
	if (efficiency != "EFFICIENCY") {
		
		alert("JC Ÿ���� '������'�� �ƴմϴ�.");		
		document.frm.eff_mod.value = "";	
		
	}	
}




// ��ȸ������ ������ ���� üũ �Լ�
function setViewMode_2( objBox ) {	
	
	var strVal = objBox.value;
	
	if( strVal != "" && strVal != null ) {
		// ���� üũ
		if( checkNum(objBox, "BLANK") == false ) {
			//objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
			//setEditMode( objTd );
			return;
		}
		// ������ �´� ��� õ���� ������ ǥ��
		else {
			strVal = objBox.value;
			objBox.value = numberFormat( strVal );
			strVal = objBox.value;
		}
	}	

}


