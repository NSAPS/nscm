// input box �� ����Ʈ
function setEditMode1( obj ) {
	//obj.childNodes(0).style.display = "block";
	obj.childNodes(0).select();
}

// input box �� View Mode �� ��ȯ
function setViewMode_( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// input box �� View Mode �� ��ȯ
function setViewMode2( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"BOX"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// �� ���� ��������
var objTdG;

// Ŭ���� �������� �ε���
var clickedDateIdx = null;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

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



GoSave = function(service) {
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	
	// �������� ���� ���
	if( objTd.childNodes(0).id == "divStartDate" || objTd.childNodes(0).id == "divEndDate") {
		objTd.childNodes(0).style.display = "block";
		objTd.childNodes(1).style.display = "none";
		var strDate = "<input type=\"text\" name=\"saveDateTmp\" size=\"10\" maxlength=\"10\" onDblClick=\"this.select(); \" "
			+ "class=\"normal\" onBlur=\"chkDate2(this,'10'); \" onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
			+ "style=\"text-align:center; width:70px; \" ><img src=\"sinc/template/basic/skin/nongshim/images/common/icon_cal.gif\" "
			+ "id=\"btnDate\" align=\"absmiddle\" border=\"0\" style=\"cursor:pointer; \" "
			+ "onMouseOver=\"overBtn(this); \" onMouseOut=\"outBtn(this); \">";
		objTd.childNodes(0).innerHTML = strDate;
		document.frm.saveDateTmp.value = objTd.childNodes(1).value;
		document.frm.saveDateTmp.focus();
		Calendar.setup({
			inputField  : "saveDateTmp", // id of the input field
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

// combo box �� View Mode �� ��ȯ
function setViewMode(objBox) {
	
	// �������� ���� ���
	if( objBox.name == "saveDateTmp" ) {
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


//
function doChange(obj, Idx){

	var Idx 			= Idx; //ù°����1_12  ��°���� 13~24
//alert("Idx="+Idx);	

	var prdt_lt 		= "";//���긮��Ÿ��
	var inpt_lt			= "";//�԰���Ÿ��
	var safety_parm 	= "";//�������
	var std_dev 		= "";//ǥ������
	var safety_stoc		= "";//�������
	var camp_stoc 		= "";//�ӽþ������
	var save_stoc 		= "";//�������
	var opti_save_lvl	= "";//����������

	prdt_lt 		= Number(document.frm.prdt_lt[Idx].value);
	inpt_lt 		= Number(document.frm.inpt_lt[Idx].value);
	sqrt 			= Math.sqrt(prdt_lt+inpt_lt);
	safety_parm 	= Number(document.frm.safety_parm[Idx].value);
	std_dev 		= Number(document.frm.std_dev[Idx].value);
	safety_stoc 	= Number(document.frm.safety_stoc[Idx].value);
	camp_stoc 		= Number(document.frm.camp_stoc[Idx].value);
	save_stoc 		= Number(document.frm.save_stoc[Idx].value);
	opti_save_lvl 	= Number(document.frm.opti_save_lvl[Idx].value);




	safety_stoc		= safety_parm*(sqrt*std_dev);
	opti_save_lvl	= safety_stoc+camp_stoc+save_stoc;
	
	document.frm.safety_stoc[Idx].value		= parseInt(safety_stoc);
	document.frm.opti_save_lvl[Idx].value	= parseInt(opti_save_lvl);
	
	setViewMode1( document.frm.safety_stoc[Idx]);
	setViewMode1( document.frm.opti_save_lvl[Idx]);

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

//	iframe�� 	search_h   �� ����~~~!!
//	var search_h = document.frm.search_h.value; 
//	if( search_menu.style.display == "none" ) 
//	{ 
//		tabHeightValue += Number(search_h); 
//		tableHeightValue += Number(search_h); 
//		leftDiplayHeightValue += Number(search_h); 
//		mainDiplayHeightValue += Number(search_h); 
//	}
	
	var tableWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 37;
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
	
	//tabPage1.style.height = tabHeightValue + "px"; 
	tbMain.style.height = tableHeightValue + "px"; 
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	tbMain.width = tableWidthValue + "px"; 
	topLine.style.width = topLineWidthValue + "px"; 
	mainDisplay.style.width = displayWidthValue + "px"; 
	
}

// HTML Grid �� X��ǥ ���� 
function scrollX() {
	document.all.topLine.scrollLeft = document.all.mainDisplay.scrollLeft;
}

// HTML Grid �� Y��ǥ ���� 
function scrollY() {
	document.all.leftDisplay.scrollTop = document.all.mainDisplay.scrollTop;
}

// HTML Grid �� ��ũ�� ����
function header_onscroll() {
	if(headerDiv){
		if (dataDiv.scrollLeft != document.frm.text1.value) {
			document.frm.text1.value = dataDiv.scrollLeft;
			headerDiv.scrollLeft = dataDiv.scrollLeft;
			return;
		}
	}

	if(leftDiv){
		if (dataDiv.scrollHeight != document.frm.text2.value) {
		    document.frm.text2.value = dataDiv.scrollTop;
			leftDiv.scrollTop = dataDiv.scrollTop;
			return;
		}
	}
} 

function	ResetDate(obj, Idx, lastIdx){

		for(Idx ; Idx<lastIdx ; Idx++) {
			var r_date = "";

			document.frm.start_date[Idx].value		= r_date;
			document.frm.end_date[Idx].value		= r_date;
			document.frm.save_stoc[Idx].value		= 0;
				
			divStartDate[Idx].innerHTML = r_date;			
			divEndDate[Idx].innerHTML = r_date;	
			doChange( document.frm.save_stoc[Idx], Idx);//�Ҵ簡����	
					
		}
}

function	SetFlag(obj, Idx){
	var item_name	= document.frm.item_name[Idx].value
	var dc_name		= document.frm.dc_name.value

	if(obj.checked){
		if(confirm("["+item_name+"]��ũ�ν���ŷ��  �����ϰڽ��ϱ�?") == 1 ) {
			if(document.frm.safe_stoc_flag[Idx]){
				document.frm.safe_stoc_flag[Idx].value = "01";
				document.frm.safety_parm[Idx].value		= 0;
				doChange( document.frm.safety_parm[Idx], Idx);//�Ҵ簡����	
			}
			else{
				document.frm.safe_stoc_flag.value = "01";
				document.frm.safety_parm.value		= 0;
				doChange( document.frm.safety_parm, Idx);//�Ҵ簡����	
			}
		}
		else{
			if(document.frm.safe_stoc_flag[Idx]){
				document.frm.safe_stoc_chk[Idx].checked=true;
			}
			else{
				document.frm.safe_stoc_chk.checked=true;
			}		
		}
	}
	else{
		if(confirm("["+item_name+"]�� ũ�ν���ŷ��  �����ϰڽ��ϱ�?") == 1 ) {
			if(document.frm.safe_stoc_flag[Idx]){
				document.frm.safe_stoc_flag[Idx].value = "00";
				document.frm.safety_parm[Idx].value		= 2.3;
				doChange( document.frm.safety_parm[Idx], Idx);//�Ҵ簡����	
			}
			else{
				document.frm.safe_stoc_flag.value = "00";
				document.frm.safety_parm.value		= 2.3;
				doChange( document.frm.safety_parm, Idx);//�Ҵ簡����	
			}
		}
		else{
			if(document.frm.safe_stoc_flag[Idx]){
				document.frm.safe_stoc_chk[Idx].checked=true;
			}
			else{
				document.frm.safe_stoc_chk.checked=true;
			}		
		}
	}
}
