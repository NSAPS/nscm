

// 이전화면으로 이동
function moveBack() {
	
	var plant_pre = document.frm.plant_pre.value;
	var item_type_pre = document.frm.item_type_pre.value;
	var serch_word_pre = document.frm.serch_word_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_01060_itemMasterDetail_list";
	urlStr += "&plant_pre" + plant_pre +  "&item_type_pre=" + item_type_pre +"&serch_word_pre=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	location.href = urlStr;
}

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).select();
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// combo box 를 Edit Mode 로 변환
function setEditMode1( objTd ) {
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();	
}

// combo box 를 View Mode 로 변환
function setViewMode1(objBox) {

 	//var	strVal1 = objBox.options[objBox.selectedIndex].value;
 	var	strVal = objBox.options[objBox.selectedIndex].text;

	objBox.parentNode.childNodes(0).innerHTML = strVal;
	//objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal1+"&nbsp;" + strVal2;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";

}



// chkDupCd() 에서 setTimeout 에 실행되는 함수
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}


