////////////////////////////////////////////////////////////
// 프로그램ID : md_04030_transRoute_list.js
// 프로그램명 : 수송 Route 자동생성
// 개발자  : 허준성
// 개발일자 : 2008-07-31 목요일
//
//관련 job file : job_sinc_70_masterData_00.xml
//
//관련 query file : query_sinc_70_masterData_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-07-31  허준성     md_04030_transRoute_list.js 개발
//
//
////////////////////////////////////////////////////////////

// enter check 용 
function enterCheck(frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			// 자기화면 갱신
			getItemNameSearch(document.frm.item_id, frm_name);
			//GoSearch(frm_name);
		}
	} 
	
}


// 제품 입력창에 입력한 값과 일치하는 제품 검사 후, 일치하는 제품이 있으면 제품 코드, 제품 명 표시
function getItemNameSearch(objBox, service) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else {
				document.frm.item_name.value = "";
				return;
			}
			GoSearch(service);
		}
	});
	
}


// 제품 입력창에 입력한 값과 일치하는 제품 검사 후, 일치하는 제품이 있으면 제품 코드, 제품 명 표시
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
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

// 제품 검색 popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}

function GoCreate(service) {
	
	if(!confirm("수송 Route를 자동 생성하시겠습니까?"))
			return;
			
	commonUtil.getCodeInfo("", "", "md_04030_transRoute_list_check_integrity", { 
		callback:function(arrList){
			// 일치하는 CODE 없음
			if( arrList.length == 1 ) {
				if(arrList[0][0] == "Y") { // 무결성 OK!
					viewWait();
					
					// service_id 저장
					frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
					document.frm._moon_service.value = service; 
					//document.form1._moon_perpage.value = perpage; 
					document.frm._moon_pagenumber.value = "1"; 
					document.frm.action = "service.do";
					document.frm.target = "_self";
					document.frm.submit();				
				}
				else {

					alert("수송Route 무결성에 문제가 있습니다! \n 다음 팝업화면에서 품목을 확인하시고 다시 수행하십시요!");
					// 수송Route 무결성 문제 list pop-up
					var service_url = "service.do?_moon_service=md_04030_transRoute_integrity_check_popup";
					service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
					var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=520, height=350, top=0, left=0";
					var newWin = window.open(service_url, "transRoute_integrity_check", pop_win_style);
					newWin.focus();					
				}
			}
			else {
				alert("수송Route 무결성 체크에 문제가 있습니다. \n 시스템관리자에게 문의하세요.");
			}
		}
	});
	
}

function GoSearch(service) {
	
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}


