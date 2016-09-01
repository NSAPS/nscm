//############################################################
//## 프로그램ID : sc_11020_dailyProductionPlanAnalysisNew_list
//## 프로그램명 : 일간생산계획 분석(재구성)
//## 개발자  : 정재교
//## 개발일자 : 2008-11-27 목요일
//##
//##관련 job file : job_sinc_20_scheduling_00.xml
//##
//##관련 query file : query_sinc_20_scheduling_00.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2008-11-27  정재교           sc_11020_dailyProductionPlanAnalysisNew_list.js 개발
//##
//##
//############################################################
//// 더블 클릭 : POPUP
//function onclickfunc( row, col, data ) {
//	//alert(col);
//	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysis_popup&_moon_perpage=200&_moon_pagenumber=1";
//	
//	if( col > 6 && col < 9){
//		//alert(document.frm.selected_plant.options[document.frm.selected_plant.selectedIndex].text);
//		
//		var plant_id = document.frm.selected_plant.value;
//		//var line_id = data.split("!%!")[9];
//		var proc_id = data.split("!%!")[4];
//		var item_id = data.split("!%!")[6];
//		var version = data.split("!%!")[11];
//		var seq = data.split("!%!")[12];
//		var sdate = document.frm.sdate.value;	
//	}
//	else if( col > 14 ){
//		var plant_id = document.frm.selected_plant.value;
//		//var line_id = data.split("!%!")[7];
//		var proc_id = data.split("!%!")[4];
//		var item_id = data.split("!%!")[6];
//		var version = data.split("!%!")[11];
//		var seq = data.split("!%!")[12];
//		var sdate = document.frm.sdate.value;	
//		
//		var prodDates = sumDate2(document.frm.sdate.value, (col -15)/3);	 
//	
//		service_url += "&prod_dates=" + prodDates;
//	
//		var shiftType
//		if( (col - 14) > 0){
//			var temp = (col - 14) % 3;		
//			if( temp == 1) shiftType = 1; //조
//			else if( temp == 2) shiftType = 3; //주
//			else shiftType = 5; //야
//			
//			service_url += "&shift_type=" + shiftType;
//		}
//	}
//	else{
//		return;
//	} 
//	 
////	var service_url_info = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisInfo_popup&_moon_perpage=200&_moon_pagenumber=1";
////	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=940, height=500, top=0, left=700";
////	var newWin = window.open(service_url_info, "SC_DAILY_PROD_ANALYSIS_INFO_POPUP", pop_win_style); 
//	
//	//service_url += "&plant_id=" + plant_id + "&line_id=" + line_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&seq=" + seq + "&sdate=" + sdate;
//	service_url += "&plant_id=" + plant_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&seq=" + seq + "&sdate=" + sdate;
//		
//	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1000, height=800, top=0, left=0";
//	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_POPUP", pop_win_style); 
//	newWin.focus(); 
//	 
//}
//
//// 기간 : 시작일 변경 --> 종료일 동적으로 변경
//function sumDate( strDate ){
//	
//	if(chkDate(strDate,"10") == 0) return;
//	var sdate = strDate.value.split("-");
//	var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
//	temp.setDate(temp.getDate() + 20);
//	var year = temp.getYear();
//	var month = temp.getMonth() + 1;
//	if(month < 10 ) month = "0" + month;
//	var date = temp.getDate();
//	if(date < 10) date = "0" + date;
//	var edate = year+ "-" + month+ "-" + date;
//	//alert(edate);											
//	document.frm.edate.value = edate;
//}
//
//// 더블 클릭한 열에 맞는 prod_date 계산
//function sumDate2( strDate, date ){
//	
//	var sdate = strDate.split("-");
//	var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
//	temp.setDate(temp.getDate() + Number(date));
//	//alert(temp);
//	var year = temp.getYear();
//	var month = temp.getMonth() + 1;
//	if(month < 10 ) month = "0" + month;
//	else month = month + "";
//	var date = temp.getDate();
//	if(date < 10) date = "0" + date;
//	else date = date + "";
//	//alert(year + ", " + month+", " + date);
//	var edate = year + month + date + "";
//	//alert(edate);											
//	return edate;
//}

// version - seq 분리
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

// 공장 & 버전 선택 
function selectPlantAndVersionPopUp() {
			
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNewSelectPlantAndVersion_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=610, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_SELECT_PLANT_AND_VERSION_POPUP", pop_win_style); 
	newWin.focus();
};

// 변경전 값
var oldQty;

// 변경전 값 저장
function saveValues(obj){
	
	if(event.altKey) {//alt+click 이벤트 시 등록 popup 창 실행
		altAndMouseLeftButtonClickfunc(obj);
	}
	
	if(event.ctrlKey) {
		capaInfoProcByHour(obj);
	}
	
	oldQty = strToNum(obj.value); // 수량

}

// 수량 변경시 합계 변경 및 수정 플래그 변경
function changeShiftSelect(obj){
	
	if(!checkNum(obj,'BLANK_INT')) return; // 숫자 체크
	
	var qty = obj.value; //변경된 값
	var itemTot = strToNum(obj.parentNode.parentNode.lastChild.childNodes(1).value); //제품별 합계
	
	var shiftName = obj.name; // input box name 
	var shiftTot = strToNum(document.getElementById(shiftName + "_tot").innerHTML.replace("&nbsp;",""));// shift별 합계
	var totTotal = strToNum(document.getElementById("divTotal_tot").innerHTML.replace("&nbsp;",""));// 합계의 총 합계
	
	var diff = qty - oldQty; // 차이
	
	itemTot = itemTot + diff; // 제품별 합계 변경
	shiftTot = shiftTot + diff; // shift별 합계 변경
	totTotal = totTotal + diff; // 총 합계 변경 
	
		
	// 천단위 구분자
	obj.value = numberFormat(qty);
	
	// 변경된 합계 입력
	// 제품별 합계
	obj.parentNode.parentNode.lastChild.childNodes(1).value = numberFormat(itemTot);
	obj.parentNode.parentNode.lastChild.childNodes(0).innerHTML = numberFormat(itemTot) + "&nbsp;";
	// shift별 합계
	document.getElementById(shiftName + "_tot").innerHTML = numberFormat(shiftTot) + "&nbsp;";
	// 합계의 총 합계
	document.getElementById("divTotal_tot").innerHTML = numberFormat(totTotal) + "&nbsp;";
	
	//수정 플래그 체크
	obj.nextSibling.value = "Y";
	//alert(obj.nextSibling.value);
	
}

// 수정 POPUP(더블클릭)
function doubleClickfunc( obj ) {
	//alert(col);
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNew_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	var idx = obj.parentNode.parentNode.rowIndex;
	//alert(idx);
	var version = document.frm.version[idx].value;
	var plant_id = document.frm.plant_id[idx].value;
	var proc_id = document.frm.proc_id[idx].value;
	var item_id = document.frm.item_id[idx].value;
	var prodDates = obj.parentNode.childNodes(2).value;
	var shiftType = obj.parentNode.childNodes(3).value;	
	var plant_version = document.frm.plant_version.value;
	var ord_no = document.frm.ord_no[idx].value;
	var cat_id = document.frm.cat_id.value;
			
	service_url += "&plant_id=" + plant_id + "&proc_id=" + proc_id + "&item_id=" + item_id + "&version=" + version + "&prod_dates=" + prodDates + "&shift_type=" + shiftType;
	service_url += "&plant_version=" + plant_version + "&ord_no=" + ord_no + "&cat_id=" + cat_id;
		
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1080, height=550, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_POPUP", pop_win_style); 
	newWin.focus();
}

// 등록 POPUP(alt+마우스 왼쪽 버튼 클릭)
function altAndMouseLeftButtonClickfunc( obj ) {
	
	var flag = "";
	
	if( obj.value != "" ) flag = "M";
	
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNew_reg&_moon_perpage=200&_moon_pagenumber=1";
	
	var idx = obj.parentNode.parentNode.rowIndex;
	//alert(idx);
	var plant_id = document.frm.plant_id[idx].value;//공장 코드
	var version = document.frm.version[idx].value;// 계획 버전
	var seq = document.frm.seq[idx].value;// SEQ
	var prod_dates = obj.parentNode.childNodes(2).value;// 생산일자
	var shift_type = obj.parentNode.childNodes(3).value;// 조주야
	var item_id = document.frm.item_id[idx].value;// 제품 코드
	var proc_id = document.frm.proc_id[idx].value;// 작업장(포장단)
	var plant_version = document.frm.plant_version.value;// 선택된 공장 코드와 계획 버전
	var ord_no = document.frm.ord_no[idx].value;// 오더번호(수출)
	var ord_item_no = document.frm.ord_item_no[idx].value;// 오더 항목 번호
			
	service_url += "&plant_id=" + plant_id + "&version=" + version + "&seq=" + seq + "&prod_dates=" + prod_dates;
	service_url += "&shift_type=" + shift_type + "&item_id=" + item_id + "&proc_id=" + proc_id; 
    service_url += "&plant_version=" + plant_version + "&date_form=YYYY MM/DD(DY)" + "&ord_no=" + ord_no + "&ord_item_no=" + ord_item_no;
    service_url += "&flag=" + flag;
     
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1130, height=300, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_REG", pop_win_style); 
	newWin.focus();
}

// 등록
GoRegister = function(service) {
			
	var service_url = "service.do?_moon_service=" + service + "&_moon_perpage=200&_moon_pagenumber=1";

	var plant_list = document.frm.plant_list.value;
	var version_list = document.frm.version_list.value;
	var plant_version = document.frm.plant_version.value;
	
	service_url += "&plant_list=" +plant_list + "&version_list=" + version_list + "&date_form=YYYY-MM-DD";
	service_url += "&plant_version=" + plant_version;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1280, height=300, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_ITEM_REG_POPUP", pop_win_style); 
	newWin.focus();
};

// 주차별 물량 검증 화면
function faSchQtyChkPopUp(){
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNewFaSchQtyChk_popup&_moon_perpage=200&_moon_pagenumber=1";
		  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1015, height=250, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_FA_SCH_QTT_CHK_POPUP", pop_win_style); 
	newWin.focus();
}

function excelDownloadPopUp(){
	
	if( document.frm.plant_list.value == "" ){
		alert("공장과 버전을 먼저 선택 해야 합니다.");
		return;
	}
	
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNewExcelDown_popup&_moon_perpage=200&_moon_pagenumber=1";
	
	var checkedWeekly;
	if(document.frm.checked_weekly[0].checked){
		checkedWeekly = document.frm.checked_weekly[0].value;
	}
	else if(document.frm.checked_weekly[1].checked){
		checkedWeekly = document.frm.checked_weekly[1].value;
	}
	else{
		checkedWeekly = document.frm.checked_weekly[2].value;
	}
	var lineGgrp = document.frm.line_grp.value;
	var plantVersion = document.frm.plant_version.value;
	var domain = document.frm.domain.value;
	
	
	service_url += "&checked_weekly=" + checkedWeekly + "&line_grp=" + lineGgrp + "&plant_version=" + plantVersion;
	service_url += "&domain=" + domain;
		  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1015, height=250, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_EXCEL_DOWN_POPUP", pop_win_style); 
	newWin.focus();
}

// 검증
function faVsPsPopUp(){
	
	if( document.frm.plant_list.value == "" ){
		alert("공장과 버전을 먼저 선택 해야 합니다.");
		return;
	}
	
	var service_url = "service.do?_moon_service=sc_11020_dailyProductionPlanAnalysisNewFaVsPs_popup&_moon_perpage=200&_moon_pagenumber=1";

	var plant_list = document.frm.plant_list.value;
	var plant_version = document.frm.plant_version.value;
	var checked_weekly;
	if(document.frm.checked_weekly[0].checked){
		checked_weekly = document.frm.checked_weekly[0].value;
	}
	else if(document.frm.checked_weekly[1].checked){
		checked_weekly = document.frm.checked_weekly[1].value;
	}
	else{
		checked_weekly = document.frm.checked_weekly[2].value;
	}
	
	service_url += "&plant_list=" +plant_list + "&plant_version=" + plant_version + "&checked_weekly=" + checked_weekly;
	  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=800, height=800, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_FA_VS_PS_POPUP", pop_win_style); 
	newWin.focus();

}

// 조회
GoSearch = function(service) {
	if( document.frm.plant_version.value == null || document.frm.plant_version.value == "" ){
		alert("먼저 선택 버튼을 클릭하여 공장과 버전을 선택해야 합니다.");
		return;
	}
	
	if( document.frm.line_grp.value == "" || document.frm.line_grp_all.value == "Y" ){
		var param = "plant_version";
		var value = document.frm.plant_version.value;
		commonUtil.getCodeList(param, value , "prod_line_grp_check", { 
			callback:function(arrList){
				if( arrList.length == 1 && arrList[0] != null){	
					//alert(arrList[0]);
					alert( "라인 그룹에서 " + arrList[0] + "이 존재하지 않습니다.\n조회 결과에서 " + arrList[0] + "이 표시 되지 않습니다.\n" + 
							arrList[0] + "을 라인 그룹에 추가 하시기 바랍니다.(CODE_MST.CD_GRP = 'LINE_GRP')" );					
				}
				else if( arrList.length > 1){
					var str = "";
					for( i = 0 ; i < arrList.length ; i++ ){
						if( i == 1) str += arrList[i];
						else str += ", " + arrList[i];
					}
					alert( "라인 그룹에서 " + str + "이 존재하지 않습니다.\n조회 결과에서 " + str + "이 표시 되지 않습니다.\n" + 
							str + "을 라인 그룹에 추가 하시기 바랍니다.(CODE_MST.CD_GRP = 'LINE_GRP')" );	
				}
			}
		});
	}
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	document.frm._moon_service.value = service; 
	//document.form1._moon_perpage.value = perpage; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// 컬럼 숨김 기능
// 공장 : 75(tdPlant)
// 원가부문 : 70(tdTeam)
// 작업장 : 160(tdProc)
// 제품 코드 : 60(tdItemId)
// 제품 명 : 260(tdItemName)
// 규격 : 85(tdSpec)
// TO남 : 30(tdToMan)
// TO여 : 30(tdToWoman)
// 구분 : 20(tdOS)
// 오더번호 : 70(tdOrdNo)
// 오더항목번호 : 50(tdOrdItemNo)
// PO 조 : 35(tdShift1PO)
// PO 주 : 35(tdShift3PO)
// PO 야 : 35(tdShift5PO)
function changeDisplay(obj){
	
	var tabLen = left_tbody.rows.length;	
	
	if( obj.width == 5 ){// 펼침
		alert
		var leftDisplayWidth = Number(leftDisplay.clientWidth);
		var topLeftWidth = Number(topLeft.clientWidth);
		
		var tdWidth;
		
		if( obj.id == "tdPlant") tdWidth = 75;
		else if( obj.id == "tdTeam" ) tdWidth = 70;
		else if( obj.id == "tdProc" ) tdWidth = 160;
		else if( obj.id == "tdItemId" ) tdWidth = 60;
		else if( obj.id == "tdItemName" ) tdWidth = 260;
		else if( obj.id == "tdSpec" ) tdWidth = 85;
		else if( obj.id == "tdToMan" ) tdWidth = 30;
		else if( obj.id == "tdToWoman" ) tdWidth = 30;
		else if( obj.id == "tdOS" ) tdWidth = 20;
		else if( obj.id == "tdOrdNo" ) tdWidth = 70;
		else if( obj.id == "tdOrdItemNo" ) tdWidth = 50;
		else if( obj.id == "tdShift1Po" ) tdWidth = 35;
		else if( obj.id == "tdShift3Po" ) tdWidth = 35;
		else if( obj.id == "tdShift5Po" ) tdWidth = 35;
		
		leftDisplay.style.width = leftDisplayWidth + tdWidth - 5;
		topLeft.style.width = topLeftWidth + tdWidth - 5;
		
		var id = obj.id
		var td = document.getElementsByName(id);
		for( i = 0; i < (tabLen + 1); i++ ){
			//tdPlant[i].style.display = "none";
			td[i].width = tdWidth;
		}
		
		if( obj.id == "tdPlant") document.frm.f01.value = "N";
		else if( obj.id == "tdTeam" ) document.frm.f02.value = "N";
		else if( obj.id == "tdProc" ) document.frm.f03.value = "N";
		else if( obj.id == "tdItemId" ) document.frm.f04.value = "N";
		else if( obj.id == "tdItemName" ) document.frm.f05.value = "N";
		else if( obj.id == "tdSpec" ) document.frm.f06.value = "N";
		else if( obj.id == "tdToWoman" ) document.frm.f07.value = "N";
		else if( obj.id == "tdOS" ) document.frm.f08.value = "N";
		else if( obj.id == "tdOrdNo" ) document.frm.f09.value = "N";
		else if( obj.id == "tdOrdItemNo" ) document.frm.f10.value = "N";
		else if( obj.id == "tdShift1Po" ) document.frm.f11.value = "N";
		else if( obj.id == "tdShift3Po" ) document.frm.f12.value = "N";
		else if( obj.id == "tdShift5Po" ) document.frm.f13.value = "N";
		
	}
	else{ // 숨김
		var tdWidth = Number(obj.width);
		
		var leftDisplayWidth = Number(leftDisplay.style.width.replace("px",""));
		var topLeftWidth = Number(topLeft.style.width.replace("px",""));
		
		leftDisplay.style.width = leftDisplayWidth - tdWidth + 5;
		topLeft.style.width = topLeftWidth - tdWidth + 5;
		
		var id = obj.id
		var td = document.getElementsByName(id);
		for( i = 0; i < (tabLen + 1); i++ ){
			td[i].width = 5;
		}
		
		if( obj.id == "tdPlant") document.frm.f01.value = "Y";
		else if( obj.id == "tdTeam" ) document.frm.f02.value = "Y";
		else if( obj.id == "tdProc" ) document.frm.f03.value = "Y";
		else if( obj.id == "tdItemId" ) document.frm.f04.value = "Y";
		else if( obj.id == "tdItemName" ) document.frm.f05.value = "Y";
		else if( obj.id == "tdSpec" ) document.frm.f06.value = "Y";
		else if( obj.id == "tdToWoman" ) document.frm.f07.value = "Y";
		else if( obj.id == "tdOS" ) document.frm.f08.value = "Y";
		else if( obj.id == "tdOrdNo" ) document.frm.f09.value = "Y";
		else if( obj.id == "tdOrdItemNo" ) document.frm.f10.value = "Y";
		else if( obj.id == "tdShift1Po" ) document.frm.f11.value = "Y";
		else if( obj.id == "tdShift3Po" ) document.frm.f12.value = "Y";
		else if( obj.id == "tdShift5Po" ) document.frm.f13.value = "Y";
	}
	
	setHtmlGridAutoResize('112', '167');
}

// 방향키 이동
function moveFocus(obj){
	
	if(event.keyCode == 37){//left
		if(obj.parentNode.previousSibling){
			obj.parentNode.previousSibling.childNodes(0).focus();
		}
		else{
			return;
		}		
	}
	else if(event.keyCode == 38){// up
		var cellIdx = Number(obj.parentNode.cellIndex);
		var rowIdx = Number(obj.parentNode.parentNode.rowIndex);
		
		if(rowIdx == 0){
			return
		}
		else{
			main_tr[rowIdx-1].childNodes(cellIdx).childNodes(0).focus();
		}
	}
	else if(event.keyCode == 39){// right
		if(obj.parentNode.nextSibling){
			obj.parentNode.nextSibling.childNodes(0).focus();
		}
		else{
			return;
		}
	}
	else if(event.keyCode == 40){// down
		var cellIdx = Number(obj.parentNode.cellIndex);
		var rowIdx = Number(obj.parentNode.parentNode.rowIndex);
		
		if(main_tr[rowIdx+1].childNodes(cellIdx).childNodes(0)){
			main_tr[rowIdx+1].childNodes(cellIdx).childNodes(0).focus();
		}
		else{
			return;
		}
//		if(obj.parentNode.previousSibling.childNodes(0)){
//			obj.parentNode.previousSibling.childNodes(0).focus();
//		}
//		else{
//			return;
//		}
	}
		
}

function setFeildWidth(){
	
	if( document.frm.f01.value == "Y" ){
		var obj = document.getElementById("tdPlant");
		changeDisplay(obj);
	}
	
	if( document.frm.f02.value == "Y" ){
		var obj = document.getElementById("tdTeam");
		changeDisplay(obj);
	}
	
	if( document.frm.f03.value == "Y" ){
		var obj = document.getElementById("tdProc");
		changeDisplay(obj);
	}
	
	if( document.frm.f04.value == "Y" ){
		var obj = document.getElementById("tdItemId");
		changeDisplay(obj);
	}
	
	if( document.frm.f05.value == "Y" ){
		var obj = document.getElementById("tdItemName");
		changeDisplay(obj);
	}
	
	if( document.frm.f06.value == "Y" ){
		var obj = document.getElementById("tdSpec");
		changeDisplay(obj);
	}
	
	if( document.frm.f07.value == "Y" ){
		var obj = document.getElementById("tdToWoman");
		changeDisplay(obj);
	}
	
	if( document.frm.f08.value == "Y" ){
		var obj = document.getElementById("tdOS");
		changeDisplay(obj);
	}
	
	if( document.frm.f09.value == "Y" ){
		var obj = document.getElementById("tdOrdNo");
		changeDisplay(obj);
	}
	
	if( document.frm.f10.value == "Y" ){
		var obj = document.getElementById("tdOrdItemNo");
		changeDisplay(obj);
	}
}

// 물량에 대한 시간 정보(capa)
function capaInfoQtyPerHour(obj){
	
	if(obj.value == "") return;// 수량이 없으면 실행 안함.
	if(obj.title != "" && obj.nextSibling.value == "N") return; // title 값이 있고, 수량이 변경 되지 않으면 실행 안함.
	
	var idx = obj.parentNode.parentNode.rowIndex;
	var param = "shift_qty!%!plant_id!%!proc_id!%!item_id";
	var value = obj.value + "!%!" + document.frm.plant_id[idx].value + "!%!"
				+ document.frm.proc_id[idx].value + "!%!" + document.frm.item_id[idx].value;
	
	// 물량의 시간 정보(capa)
	commonUtil.getCodeList(param, value , "capa_info_qty_per_hour", { 
		callback:function(arrList){
			if( arrList.length > 0 && arrList[0] != null){	
				//alert(arrList[0]);
				obj.title = arrList[0];
			}
			else{
				return;
			}			
		}
	});
}

function capaInfoProcByHour(obj){
	
	var tabLen = left_tbody.rows.length;
	var idx = obj.parentNode.parentNode.rowIndex;
	var col = obj.parentNode.cellIndex;
	
	if( tabLen < 2 ) return;
	
	var itemList = "";
	var itemQtyList = "";
	var plant_id = document.frm.plant_id[idx].value;
	var proc_id = document.frm.proc_id[idx].value;
	
	for( i = 0 ; i < tabLen-1 ; i++ ){
		if( document.frm.plant_id[i].value == plant_id && document.frm.proc_id[i].value == proc_id ){
			var qty = main_tbody.childNodes(i).childNodes(col).childNodes(0).value.replace(",","");
			
			if(itemList.length < 1){
				itemList += document.frm.item_id[i].value;				
				//itemQtyList += document.frm.item_id[i].value + "','" + qty;
				itemQtyList += "SELECT '" + document.frm.item_id[i].value + "' ITEM_ID, '" + qty + "' QTY FROM DUAL"; 
			}
			else{
				itemList += "','" + document.frm.item_id[i].value;		
				//itemQtyList += "','" + document.frm.item_id[i].value + "','" + qty;	
				itemQtyList += " UNION ALL SELECT '" + document.frm.item_id[i].value + "' ITEM_ID, '" + qty + "' QTY FROM DUAL"; 
			}			
		}
	}	
	
	var param = "plant_id!%!proc_id!%!item_list!%!item_qty_list";
	var value = plant_id + "!%!" + proc_id + "!%!" + itemList + "!%!" + itemQtyList;
	// 작업장별, shift별 물량의 시간 정보(capa)
	commonUtil.getCodeList(param, value , "capa_info_proc_by_hour", { 
		callback:function(arrList){
			if( arrList.length > 0 && arrList[0] != null){	
				alert("    " + arrList[0]);
			}
			else{
				return;
			}			
		}
	});
	//alert(itemList);
	//alert(itemQtyList);
}

function excelDownload(){
	
	var service = "sc_11020_dailyProductionPlanAnalysisNew_list_excelDown";
	var checked_weekly = document.frm.checked_weekly.value;
	var plant_version = document.frm.plant_version.value;
	var line_grp	= document.frm.line_grp.value;
	var domain		= document.frm.domain.value;
	
	if( document.frm.plant_list.value == "" ){
		alert("공장과 버전을 먼저 선택 해야 합니다.");
		return;
	}
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service
								+"&checked_weekly="+checked_weekly
								+"&plant_version="+plant_version
								+"&line_grp="+line_grp
								+"&domain="+domain;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

function excelUpload(){
	
	var service = "sc_11020_dailyProductionPlanAnalysisNew_list_excelUp";
	var checked_weekly = document.frm.checked_weekly.value;
	var plant_version = document.frm.plant_version.value;
	var line_grp	= document.frm.line_grp.value;
	var domain		= document.frm.domain.value;
	
	//if( document.frm.plant_list.value == "" ){
	//	alert("공장과 버전을 먼저 선택 해야 합니다.");
	//	return;
	//}
	
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service
								+"&checked_weekly="+checked_weekly
								+"&plant_version="+plant_version
								+"&line_grp="+line_grp
								+"&domain="+domain;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	if( left_tbody.rows[obj.rowIndex] ) 
	{ 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#d0b8f1"; 
		//left_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#d0b8f1"; 
		//main_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
	} 
	else 
	{ 
		left_tbody.rows.style.backgroundColor = "#d0b8f1"; 
		//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		main_tbody.rows.style.backgroundColor = "#d0b8f1"; 
		//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환
function bgOut( obj ) {
	
	if( left_tbody.rows[obj.rowIndex] ) 
	{ 
		left_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
		//left_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff"; 
		//main_tbody.rows[obj.rowIndex].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	} 
	else 
	{ 
		left_tbody.rows.style.backgroundColor = "#ffffff"; 
		//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows.style.backgroundColor = "#ffffff";
		//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	}
	
}