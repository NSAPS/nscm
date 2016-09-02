// 이전화면으로 이동
function moveBack() {
	var urlStr = "service.do?_moon_service=ip_01020_inventoryPlan_item_mod";
	location.href = urlStr;
}

// input box 를 Edit Mode 로 변환
function setEditMode1( obj ) {

	//obj.childNodes(0).style.display = "block";
	obj.childNodes(0).select();
}

// input box 를 View Mode 로 변환
function setViewMode1( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// input box 를 View Mode 로 변환
function setViewMode2( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"BOX"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// 셀 저장 전역변수
var objTdG;

// 클릭한 비축일자 인덱스
var clickedDateIdx = null;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// 날짜 검색 POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
}

// 날짜 검색 POP BTN mouseOut
function outBtn( objBtn ) {  
	clickedDateIdx = null;
}

function setEndDate( objDate ){
	var tableLen = objDate.parentNode.parentNode.parentNode.rowIndex;
	alert(tableLen);
	alert(objDate.value)
}



function	SetFlag(obj, Idx){
	var item_id		= document.frm.sel_item_id[Idx].value
	var item_name	= document.frm.sel_item_name[Idx].value
	
	if(obj.checked){
		ResetDate();
		document.frm.tgt_item_id.value = item_id;
		document.frm.tgt_item_name.value = item_name;
		document.frm.reg_chk[Idx].checked=true;
		document.frm.cre_rate.value = 100;
	}
	else{
		document.frm.tgt_item_id.value = "";
		document.frm.tgt_item_name.value = "";
		document.frm.reg_chk.checked=true;
		document.frm.cre_rate.value = 100;
	}
}

function	ResetDate(){
	var Idx		= 0;	
	var lastIdx = left_tbody.rows.length;

	for(Idx ; Idx<lastIdx ; Idx++) {
		if(document.frm.reg_chk[Idx]){
			document.frm.reg_chk[Idx].checked=false;
		}
		else{
			document.frm.reg_chk.checked=false;
		}			
	}
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
//			openItemSearchPop(input, 400, 400);
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

// 저장 버튼 클릭
function GoSave(service) {
	
	var item_id 		= document.frm.item_id.value;		//신규품목
	var item_name 		= document.frm.item_name.value;		//신규품목
	var tgt_item_id		= document.frm.tgt_item_id.value;	//대상품목
	var tgt_item_name	= document.frm.tgt_item_name.value;	//대상품목
	var cre_rate 		= document.frm.cre_rate.value;		//카피비율

	if( item_id == null || item_id == "" ) {
		alert("신규품목을 선택하십시오.");
		return;
	}
		
	if( tgt_item_id == null || tgt_item_id == "" ) {
		alert("대상품목을 선택하십시오.");
		return;
	}
		
	if( cre_rate == null || cre_rate == "" ) {
		alert("생성비율을 입력하십시요.");
		return;
	}


	if(confirm("["+item_name+"]의 안전재고를 "+"["+tgt_item_name+"] 의"+"["+cre_rate+"%]비율로 생성하시겠습니까?") == 1 ) {


		// WAITING 이미지 보여주기
		viewWait();
		// service_id 저장
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();				
	}
	else{
		return ;
	}
	
}
