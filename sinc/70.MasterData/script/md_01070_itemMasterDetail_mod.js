

// 이전화면으로 이동
function moveBack() {
	
	var plant_pre = document.frm.plant_pre.value;
	var item_type_pre = document.frm.item_type_pre.value;
	var serch_word_pre = document.frm.serch_word_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_01070_itemMasterDetail_list";
	urlStr += "&plant_pre" + plant_pre +  "&item_type_pre=" + item_type_pre +"&serch_word_pre=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	location.href = urlStr;
}

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	//objTd.childNodes(0).style.display = "none";
	//objTd.childNodes(1).style.display = "block";
	objTd.childNodes(0).select();
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


// HTML Grid 화면 resizing
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

//	iframe은 	search_h   가 없다~~~!!
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
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
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

//alert("mainDiplayHeightValue="+mainDiplayHeightValue);
//alert("leftDiplayHeightValue="+leftDiplayHeightValue);
	
}

// HTML Grid 의 X좌표 정의 
function scrollX() {
	document.all.topLine.scrollLeft = document.all.mainDisplay.scrollLeft;
}

// HTML Grid 의 Y좌표 정의 
function scrollY() {
	document.all.leftDisplay.scrollTop = document.all.mainDisplay.scrollTop;
}

// HTML Grid 의 스크롤 제어
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




