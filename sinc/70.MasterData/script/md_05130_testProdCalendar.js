// 클릭한 수송일자 인덱스
var clickedDateIdx = null;

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

// combo box 를 View Mode 로 변환
function setViewMode(objBox) {
	
	// 수송일자 셀인 경우
	if( objBox.name == "transDateTmp" ) {
		var strVal = objBox.value;
		var objTd = objBox.parentNode.parentNode;
		if( objBox.parentNode.parentNode.parentNode.rowIndex == clickedDateIdx ) {
			return;
		}
		objTd.childNodes(1).value = strVal;
		
		// start_date를 선택하면 자동으로 end_date에 셋팅되도록 설정하는 부분.
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
	// select box 인 경우, value 가 아니라 TEXT 를 표시해 줘야 함
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

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	var rowIdx = objTd.parentNode.rowIndex;
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	
	
	// 수송일자 검색 셀
	if( objTd.childNodes(0).id == "divStartDate" || objTd.childNodes(0).id == "divEndDate") {
		objTd.childNodes(0).style.display = "block";
		objTd.childNodes(1).style.display = "none";
		var strDate = "<input type=\"text\" name=\"transDateTmp\" size=\"10\" maxlength=\"10\" onDblClick=\"this.select(); \" "
			+ "class=\"normal\" onBlur=\"chkDate2(this,'10'); \" onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" "
			+ "style=\"text-align:center; width:70px; \" ><img src=\"sinc/template/basic/skin/nongshim/images/common/icon_cal.gif\" "
			+ "id=\"btnDate\" align=\"absmiddle\" border=\"0\" style=\"cursor:pointer; \" "
			+ "onMouseOver=\"overBtn(this); \" onMouseOut=\"outBtn(this); \">";
		objTd.childNodes(0).innerHTML = strDate;
		document.frm.transDateTmp.value = objTd.childNodes(1).value;
		document.frm.transDateTmp.focus();
		Calendar.setup({
			inputField  : "transDateTmp", // id of the input field
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
	// 적용시작일자, 적용종료일자 셀인 경우
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) { // main_tbody.rows[...].cells error 인경우, 사용할것
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}else{
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	var objId = objBox.parentNode.id;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
	
		// START_DATE --> START_TIME
		if( objName == "transDateTmp" && objId == "divStartDate") {
			objTdG = main_tbody.rows[rowIdx].cells[8];
		}
		// START_TIME --> END_DATE
		else if( objName == "start_time" ) {
			objTdG = main_tbody.rows[rowIdx].cells[9];
		}
		// END_DATE --> END_TIME
		else if( objName == "transDateTmp" && objId == "divEndDate") {
			objTdG = main_tbody.rows[rowIdx].cells[10];
		}
		// END_TIME --> 다음줄 START_DATE
		else if( objName == "end_time" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				objTdG = main_tbody.rows[0].cells[7];
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				objTdG = main_tbody.rows[rowIdx+1].cells[7];
			}
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

// 저장 버튼 클릭
function GoSave(service) {
	
	var tableLen = left_tbody.rows.length;
	
	if(tableLen == 1){
		if( document.frm.check_flag.checked ) {
			document.frm.check_flag.value = "Y";
			document.frm.check_value.value = "Y";
		}else{
			document.frm.check_flag.value = "N";
			document.frm.check_value.value = "N";
		}		
	}else{
		for( var i=0 ; i < tableLen ; i++ ) {
			if( document.frm.check_flag[i].checked ) {
				document.frm.check_flag[i].value = "Y";
				document.frm.check_value[i].value = "Y";
			}else{
				document.frm.check_flag[i].value = "N";
				document.frm.check_value[i].value = "N";
			}			
		}	
	}
	
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();

	var rowNo = main_tbody.rows.length;
	var old_req_no = "0000";
	var old_ReqName = "아무개";
	var req_no;
	var message;
	var req_hp_no;	// 받을 번호				
	var con_hp_no; //보내는 번호 
	
	// SMS보내는 조건
	// 1. 생산오더가 없고 AND 신규확인체크를 한 경우
	// 2. 요청번호가 동일한 경우는 한번만 보낸다.
	// 3. 받을번호가 '0000000000'이면 보내지 않는다
	if(rowNo == 1) { // 확인저장 건수가 한건만 존재할경우...
		if((document.frm.prod_no.value == "" || document.frm.prod_no.value == null) && 
			(document.frm.old_check_value.value == "N" && document.frm.check_value.value == "Y") &&
			(document.frm.req_hp_no.value != "0000000000")){ 

		message			= "☆현장실험확인☆"+"SCM에서 요청번호["+document.frm.req_no.value + "]에 대해 확인하였습니다.";
		req_hp_no 		= document.frm.req_hp_no.value;					
		con_hp_no 		= document.frm.con_hp_no.value;
	
		smsCaller.sendSMS(req_hp_no, con_hp_no, message, "SOT", ""); 
		}
		else if(document.frm.req_hp_no.value == "0000000000"){
			alert(document.frm.WbsName.value + "의 " + document.frm.ReqName.value + "은 핸드폰 번호가 없어 SMS전송이 안됩니다!");
		}
	}
	else {
		
		for(var i = 0 ; i < rowNo ; i++){
	
			if((document.frm.prod_no[i].value == "" || document.frm.prod_no[i].value == null) &&
			   (document.frm.old_check_value[i].value == "N" && document.frm.check_value[i].value == "Y")) {
				req_no	= document.frm.req_no[i].value;

				if(req_no != old_req_no && document.frm.req_hp_no[i].value != "0000000000") { 
					
					message			= "☆현장실험확인☆"+"SCM에서 요청번호["+ req_no + "]에 대해 확인하였습니다.";
					req_hp_no 		= document.frm.req_hp_no[i].value;					
					con_hp_no 		= document.frm.con_hp_no[i].value;

					smsCaller.sendSMS(req_hp_no, con_hp_no, message, "SOT", "");
					
					old_req_no		= req_no; 
				}
				else if(old_ReqName != document.frm.ReqName[i].value && document.frm.req_hp_no[i].value == "0000000000"){
					alert(document.frm.WbsName[i].value + "의 " + document.frm.ReqName[i].value + "은 핸드폰 번호가 없어 SMS전송이 안됩니다!");
					old_ReqName = document.frm.ReqName[i].value;
				}
			}

		}
	}
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}

// 조회 버튼 클릭
function GoSearch(service) {
	
	var selected_plant = document.frm.selected_plant.value;
	
	// 공장을 선택하지 않은 경우
	if( selected_plant == "" ) {
		alert("공장을 선택해 주십시요.");
		return;
	}
	
	// 조회시 WAITING 이미지 보여주기
	viewWait();

	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
		
}

// 날짜 형식을 체크하는 함수, return value : 1-맞는 형식, 0-잘못된 형식
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
	
	if ( input.length == 0 ) return 1; // 공백은 skip
	
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

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#cccccc" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
	}
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#cccccc" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
	}
}

function checkCancelFlag(){
	var tableLen = left_tbody.rows.length;
	if(tableLen == 1){
		if( document.frm.cancel_flag.checked ) {
			document.frm.start_date.parentNode.onclick = "";
			document.frm.start_time.parentNode.onclick = "";
			document.frm.end_date.parentNode.onclick = "";
			document.frm.end_time.parentNode.onclick = "";
			document.frm.check_flag.disabled = "true";
			left_tbody.rows.style.backgroundColor = "#cccccc";
			main_tbody.rows.style.backgroundColor = "#cccccc"; 
		}	
	}else{
		for( var i=0 ; i < tableLen ; i++ ) {
			if( document.frm.cancel_flag[i].checked ) {
				document.frm.start_date[i].parentNode.onclick = "";
				document.frm.start_time[i].parentNode.onclick = "";
				document.frm.end_date[i].parentNode.onclick = "";
				document.frm.end_time[i].parentNode.onclick = "";
				document.frm.check_flag[i].disabled = "true";
				left_tbody.rows[i].style.backgroundColor = "#cccccc";
				main_tbody.rows[i].style.backgroundColor = "#cccccc"; 
			}		
		}	
	}
}
