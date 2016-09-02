////////////////////////////////////////////////////////////
// 프로그램ID : rp_01110_returningProduct_list.js
// 프로그램명 : 반품 수송 계획 조회
// 개발자  : 허준성
// 개발일자 : 2008-08-14 목요일
//
//관련 job file : job_sinc_40_replenishmentPlanning_00.xml
//
//관련 query file : query_sinc_40_replenishmentPlanning_00.xml
//
// REVISIONS
// VER        DATE        AUTHOR    DESCRIPTION
// ---------  ----------  --------  ------------------------------------
// 1.0        2008-08-14  허준성     rp_01110_returningProduct_list.js 개발
//
//
////////////////////////////////////////////////////////////

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 

	if( left_tbody.rows[obj.rowIndex] ) { 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee"; 
	} 
	else { 
		left_tbody.rows.style.backgroundColor = "#eeeeee"; 
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환
function bgOut( obj ) {
	
	if( left_tbody.rows[obj.rowIndex] ) { 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
	} 
	else { 
		left_tbody.rows.style.backgroundColor = "#ffffff"; 
	}
	
}

function allCheck(){
	
	if(document.frm.tgt_loc.value == "" || document.frm.tgt_loc.value == null) {
		alert("입고장을 먼저 선택하세요!")
	}
	var tableLen = left_tbody.rows.length;
	if(document.frm.all_check_flag.checked){
		for(var i = 0; i < tableLen; i++){
			if(document.frm.check_flag[i]) {
				if(document.frm.tgt_loc.value != document.frm.rdc_id[i].value ) { // 입고장의 경우는 check 제외!
					document.frm.check_flag[i].checked = true;
				}
			}
			else {
				if(document.frm.tgt_loc.value != document.frm.rdc_id.value ) { // 입고장의 경우는 check 제외!
					document.frm.check_flag.checked = true;
				}
			}
		}
	}
	else{
		for(var i = 0; i < tableLen; i++){
			if(document.frm.check_flag[i])
				document.frm.check_flag[i].checked = false;
			else
				document.frm.check_flag.checked = false;
		}
	}
}

// 저장 버튼 클릭
function GoSave(service) {
	
	var src_loc = document.frm.src_loc_sel.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var trans_date = document.frm.trans_date.value;
	var truck_num = document.frm.truck_num.value;
	var status_flag = document.frm.status_flag.value;
	
	// 반품 수송 계획 조회일때, 계획생성 버튼을 누른경우
	if(status_flag == "first"){
		alert("반품 수송 계획 [조회] 화면에서는 계획생성이 되지 않습니다! \n먼저 반품 수송 계획 [생성] 탭을 클릭해 주십시요!");
		return;
	}
	
	// 출고장을 선택하지 않은 경우
//	if( src_loc == "" ) {
//		alert("출고장을 선택해 주십시요.");
//		return;
//	}
	
	// 입고장을 선택하지 않은 경우
	if( tgt_loc == "" ) {
		alert("입고장을 선택해 주십시요.");
		return;
	}
	
	// 수송일자을 입력하지 않은 경우
	if( trans_date == "" ) {
		alert("수송일자를 입력해 주십시요.");
		return;
	}
	
	// 차량번호을 선택하지 않은 경우
	if( truck_num == "" ) {
		alert("차량번호을 입력해 주십시요.");
		return;
	}
	
	var tableLen = left_tbody.rows.length;
	
	if(tableLen == 0){
		alert("수송계획을 생성할 데이타가 존재하지 않습니다!");
		return;
	}else if(tableLen == 1){
		if(document.frm.check_flag.checked){
			if(confirm("정말로 수송계획을 생성하시겠습니까?")==0){
				return;		// 취소
			}	
		}else{
			alert("선택된 출고값이 없습니다!");
			return;	
		}		
	}else{
		var checkflag = 0;
		for(i=0; i< tableLen; i++){
			// 출고가 check된 값이 있는지 확인.
			if(document.frm.check_flag[i].checked){
				checkflag++;	
			}
		}
		if(checkflag > 0){ // 선택된 출고가 있는 경우..
			if(confirm("정말로 수송계획을 생성하시겠습니까?")==0){
				return;		// 취소
			}	
		}else{ // 선택된 출고가 하나도 없는 경우..
			alert("선택된 출고값이 없습니다!");
			return;	
		}
	}	
	
	// ==============================================  //
	// 1. BRAND_NO를 순서대로 증가시키기기 위한 로직 부분. 	
	// 2. IF_TRANS_PLAN의 QTY에 넣어줄 CAL_QTY 계산 (box_qty * unitQty + eaQty)
	if(tableLen == 1){ // 검색된 ROW 수가 1개 일때.
		if(document.frm.check_flag.checked){
			document.frm.check_value.value = "1";
			var unitQty = Number(document.frm.unit_qty.value);
			var boxQty  = Number(document.frm.box_qty.value);
			var eaQty  = Number(document.frm.ea_qty.value);
			document.frm.cal_qty.value = ( boxQty * unitQty )+ eaQty;	
		}else{
			document.frm.check_value.value = "";	
		}		
	}else{
		var index = 1;  // BRAND_NO를 순서대로 증가시키기 위해서, CHECK된 출고의 값을 순차적인 값으로 셋팅함. 
		for(i = 0; i < tableLen; i++){
			if(document.frm.check_flag[i].checked){
				document.frm.check_value[i].value = index; 
				var unitQty = Number(document.frm.unit_qty[i].value);
				var boxQty  = Number(document.frm.box_qty[i].value);
				var eaQty  = Number(document.frm.ea_qty[i].value);
				document.frm.cal_qty[i].value = ( boxQty * unitQty )+ eaQty;
				index++;	// 체크되어 있는 것만 INDEX를 증가시켜서 값을 입력
			}else{
				document.frm.check_value[i].value = "";	
			}			
		}
	}
	// ==============================================  //	
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}


// 기간 : 시작일 변경 --> 종료일 동적으로 변경
function sumDate(days){
	
	var temp = new Date();
	temp.setDate(temp.getDate() + days);
	
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var date = temp.getDate();
	if(date < 10) date = "0" + date;
	var edate = year+ "-" + month+ "-" + date;
	//alert(edate);											
	return edate;
}

// 수송 일자의 시작일과 종료일을 현재 날짜의 일주일 전, 일주일 후의 날짜로 2주가 되도록 setting(화면 로드시 한번만)
function setDate(){
	if(document.frm.trans_start.value != ""){}
	else{
		document.frm.trans_start.value = sumDate(-7);
	}
	if(document.frm.trans_end.value != ""){}
	else{
		document.frm.trans_end.value = sumDate(6);
	}
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// combo box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}
	
	var tableLen = left_tbody.rows.length;
	var insertRowIndex = objTd.parentNode.rowIndex;
	if(tableLen == 1){
		if(document.frm.check_flag.checked){
			objTd.childNodes(0).style.display = "none";
			objTd.childNodes(1).style.display = "block";
			objTd.childNodes(1).focus();
		}	
	}else{
		if(document.frm.check_flag[insertRowIndex].checked){
			objTd.childNodes(0).style.display = "none";
			objTd.childNodes(1).style.display = "block";
			objTd.childNodes(1).focus();
		}
	}
}


/**
 * 입력받을 수 있는 값을 필터링한다.
 * ex : <input type="text" ..... onkeypress="filterKey('[0-9]')"> ; 숫자만 키입력이 가능한 text filed
 * ex : <input type="text" ..... onkeypress="filterKey('[0-9a-zA-Z]')"> ; 영문,숫자만 키입력이 가능한 text filed
 * @param filter : 필터링할 정규표현식 ex) '[0-9]':0~9의 값만 허용, '[a-zA-Z]':알파벳만 허용
 * @browser IE6, NS7
 */
function filterKey(filter) {
  if(filter){
      var sKey = String.fromCharCode(event.keyCode);
      var re = new RegExp(filter);
      if(!re.test(sKey)) event.returnValue=false;
  }
} 

// 셀 저장 전역변수
var objTdG;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = left_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// 출고박스 --> 출고봉
		if( objName == "box_qty" ) {
			objTdG = left_tbody.rows[rowIdx].cells[4];
		}	
		// 출고봉 --> 다음줄 출고박스
		else if( objName == "ea_qty" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				objTdG = left_tbody.rows[0].cells[3];
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				objTdG = left_tbody.rows[rowIdx+1].cells[3];
			}
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

// EA_QTY가 UNIT_QTY 보다 큰 수량으로 수정된 경우, BOX_QTY 수정
function setCalQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var form = document.frm;
	
	if( document.frm.unit_qty[rowIdx] ) {
		var unitQty = Number(form.unit_qty[rowIdx].value);
		var boxQty  = Number(form.box_qty[rowIdx].value);
		var eaQty  = Number(form.ea_qty[rowIdx].value);
		
		// 봉수량이 한 box의 봉수량을 넘은 경우..
		// box 수량을 증가시키고, ea 수량을 변경함. 
		if(eaQty >= unitQty){
			boxQty = boxQty + Math.floor(eaQty/unitQty);
			eaQty = Number(eaQty%unitQty);
			form.box_qty[rowIdx].value = boxQty;
			form.ea_qty[rowIdx].value = eaQty;
			divBoxQty[rowIdx].innerHTML = "&nbsp;"+boxQty;
			divEaQty[rowIdx].innerHTML = "&nbsp;"+eaQty;
		}
	}
	else {
		var unitQty = Number(form.unit_qty.value);
		var boxQty  = Number(form.box_qty.value);
		var eaQty  = Number(form.ea_qty.value);
		
		// 봉수량이 한 box의 봉수량을 넘은 경우..
		// box 수량을 증가시키고, ea 수량을 변경함. 
		if(eaQty >= unitQty){
			boxQty = Number(boxQty) + Math.floor(eaQty/unitQty);
			eaQty = Number(eaQty%unitQty);
			form.box_qty.value = boxQty;
			form.ea_qty.value = eaQty;
			divBoxQty.innerHTML = "&nbsp;"+boxQty;
			divEaQty.innerHTML = "&nbsp;"+eaQty;
		}
	}
}

// 각각의 tab을 클릭하면 발생하는 event -> 이곳에서 화면단 제어를 한다.
WebFXTabPage.prototype.show = function () {
	var el = this.tab;
	var s = el.className + " selected";
	s = s.replace(/ +/g, " ");
	el.className = s;
	
	this.element.style.display = "block";
	
	var tabId = this.element.id;
	if(tabId == "tabPage1"){
		document.frm.status_flag.value = "first";
	}else if(tabId == "tabPage2"){
		document.frm.status_flag.value = "";
	}
};



// Grid 화면 resizing 
// tab_h : tab height ( 실제 tab 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 tab 높이가 커짐 ) 
// table_h : table height ( 실제 table 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 table 높이가 커짐 ) 
function setGridAutoResize( tab_h, table_h ){
	
	// TABPAGE1
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
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
	} 
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	
	// TABPAGE2
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
	
	var tabWidthValue = Number(maxWidthValue) - 15;
	var tableWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 1;
	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 39;
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
	
	tabPage2.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
	//mainDisplay.style.height = mainDiplayHeightValue + "px"; 
	
	tabPage2.style.width = tabWidthValue + "px";
	//tbMain.width = tableWidthValue + "px"; 
	//topLine.style.width = topLineWidthValue + "px"; 
	//mainDisplay.style.width = displayWidthValue + "px";
	
}