GoSave = function(service) {
	//iframe 저장
	gridDetailInfo.GoSave("md_01070_itemMasterDetail_mod_save_comp");

	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// 더블 클릭 : 상세정보(하단 iframe)
function iframeSearch(obj, idx) {

	if(document.frm.item_id[idx]){
		var item_id 	= document.frm.item_id[idx].value;
		var item_name 	= document.frm.item_name[idx].value;
	
	
		var urlStr = "service.do?_moon_service=md_01070_itemMasterDetail_mod";
		urlStr += "&item_id=" + document.frm.item_id[idx].value;
		urlStr += "&item_name=" + document.frm.item_name[idx].value;
	
		gridDetailInfo.location.href = urlStr;
		}
		else if(document.frm.item_id){
			var item_id 	= document.frm.item_id.value;
			var item_name 	= document.frm.item_name.value;
		
		
			var urlStr = "service.do?_moon_service=md_01070_itemMasterDetail_mod";
			urlStr += "&item_id=" + document.frm.item_id.value;
			urlStr += "&item_name=" + document.frm.item_name.value;
		
			gridDetailInfo.location.href = urlStr;
			
		}
	}

// 이전화면으로 이동
function moveBack() {
	
	var item_type_pre = document.frm.item_type_pre.value;
	var serch_word_pre = document.frm.serch_word_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	
	var urlStr = "service.do?_moon_service=md_01060_itemMasterManagement_list";
	urlStr += "&item_type=" + item_type_pre +"&serch_word=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
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
	//objTd.childNodes(0).style.display = "none";
	//objTd.childNodes(1).style.display = "block";
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

	// -되는 table_h 의 값을 maxHeightValue 의 70%로 고정
	//var table_h	= parseInt(maxHeightValue*0.75); 

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
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 37;
	var displayWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 20;
	//iframe의 높이 설정 
	//var gridDetailInfo = parseInt((maxHeightValue-mainDiplayHeightValue)-185);  
	var gridDetailInfo = parseInt((maxHeightValue-mainDiplayHeightValue)-185);  
	
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
	//iframe의 높이 설정
	tbBottom.style.height = gridDetailInfo + "px"; 
	
}



// 더블 클릭 : 상세정보(하단 iframe)
function chk_item_hist(obj, idx) {


    var item_id;
    var item_name;
    var hist_flag;
	var old_item_id;
	var old_item_name;
	var user_id = document.frm._user_id.value;
	var idx = idx;

//alert(user_id);
	if(document.frm.item_id[idx]){
		item_id 	= document.frm.item_id[idx].value;
		item_name 	= document.frm.item_name[idx].value;
		hist_flag 	= document.frm.hist_flag[idx].value;
		

		
///////////////////////////////////
		if(hist_flag == "X" ){
			if(confirm(item_id+":"+item_name+" 은 품목이력이 연결되어 있지 않습니다.\n품목 이력을 생성하시겠습니다?") == 1 ) {
				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
			}
		}else{

			commonUtil.getCodeInfo("item_id", item_id, "md_01060_get_old_item_id", 
			{ 
				callback:function(arrList)
				{
					if( arrList.length == 1 )
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					else
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					
			if(confirm(item_id+"["+item_name+"] 은 "+old_item_id+"["+old_item_name+"] 품목이력이 연결되어있습니다.\n품목 이력을 다시 생성하시겠습니다?") == 1 ) {

				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
				
			}

				}
			});//commonUtil.getCodeInfo end
			
		}
/////////////////////////////////// 		
		
	}else { // 결과 값이 하나일때
	
	
		item_id 	= document.frm.item_id.value;
		item_name 	= document.frm.item_name.value;
		hist_flag 	= document.frm.hist_flag.value;
///////////////////////////////////
		if(hist_flag == "X" ){
			if(confirm(item_id+":"+item_name+" 은 품목이력이 연결되어 있지 않습니다.\n품목 이력을 생성하시겠습니다?") == 1 ) {
				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
			}
		}else{

			commonUtil.getCodeInfo("item_id", item_id, "md_01060_get_old_item_id", 
			{ 
				callback:function(arrList)
				{
					if( arrList.length == 1 )
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					else
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					
			if(confirm(item_id+"["+item_name+"] 은 "+old_item_id+"["+old_item_name+"] 품목이력이 연결되어있습니다.\n품목 이력을 다시 생성하시겠습니다?") == 1 ) {

				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
				
			}

				}
			});//commonUtil.getCodeInfo end
			
		}
/////////////////////////////////// 		
		

	}

}
