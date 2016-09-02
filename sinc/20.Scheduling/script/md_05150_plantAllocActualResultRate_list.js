
// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	
	objTd.childNodes(0).style.display = "none";
	objTd.childNodes(1).style.display = "block";
	//objTd.childNodes(1).select();
	objTd.childNodes(1).focus();
		
}

// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
		
	var strVal = objBox.value;
	var objTd = objBox.parentNode;
	
	if(objBox.name == "rate"){	
		if( strVal != "" && strVal != null ) {
			// 숫자 체크
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "숫자만 입력하여 주세요.");
				setEditMode( objTd );
				return;
			}
		}
	}
		
	objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;";
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}

// 번호 setting
function setRowNo() {
	
	var tableLen = main_tbody.rows.length;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
		}
		else {
			divRowNo.innerHTML = "1";
		}
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
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13"){ 
		// 배분율 --> 다음줄
		if( objName == "rate" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = main_tbody.rows[0].cells[6];
				}
				else {
					objTdG = main_tbody.rows.cells[6];
				}
			}
			// 다음줄의 첫번째 input box 로 이동
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[6];
				}
				else {
					objTdG = main_tbody.rows.cells[6];
				}
			}
		}		
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}

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

// 저장
GoSave = function(service) {
	
	var tabLen = main_tbody.rows.length;
	
	// 배분율 합계 체크: 한 제품의 공장별 배분율의 합은 100이 되어야 함. 아님 0 또는 null
	if( tabLen == 1){ // 라인이 하나일때
		var rate = document.frm.rate.value;
		if( rate != 0 && rate != 100 ){
			alert("배분율을 잘못 입력하였습니다. 한 제품의 공장별 배분율의 합은 100(%)이 되어야 합니다.");
			return;
		}
	}
	else{		
		var itemId = document.frm.dp_item_id[0].value; // 처음 아이템 아이디로 초기화
		var itemCnt = 0;
		var cntSum = 0;
		var rateSum = 0; //배분율 합계
		
		for( i = 0 ; i < tabLen ; i++ ){
			if( itemId == document.frm.dp_item_id[i].value){ // 동일 제품일 때
				if( document.frm.rate[i].value != null && document.frm.rate[i].value != "" ){				
					rateSum += Number(document.frm.rate[i].value);
				}			
			}
			else{ // 다른 제품으로 변경될 때
				// 이전 제품 체크
				if( rateSum != 0 && rateSum != 100 ){ 
					alert("배분율을 잘못 입력하였습니다. 한 제품의 공장별 배분율의 합은 100(%)이 되어야 합니다("+ i + ").");
					return;
				}
							
				rateSum = 0; // 다음 제품을 위해 0 초기화
							
				itemId = document.frm.dp_item_id[i].value; //새로운 제품 아이디 입력
				
				if( document.frm.rate[i].value != null && document.frm.rate[i].value != "" ){
					rateSum += Number(document.frm.rate[i].value);
				}
						
			}
		}
		
		if( rateSum != 0 && rateSum != 100 ){ // 마지막 아이템 체크
			alert("배분율을 잘못 입력하였습니다. 한 제품의 공장별 배분율의 합은 100(%)이 되어야 합니다.");
			return;
		}
	}		
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// 동일 제품에 대해 사용여부 일괄 변경
function changeUseFlag(obj){
	
	var flag = obj.value;
	var rowIdx = obj.parentNode.parentNode.rowIndex;
	var tabLen = main_tbody.rows.length;
	var itemId = document.frm.dp_item_id[rowIdx].value;
	
	for( i = 0 ; i < tabLen ; i++){
		if( itemId == document.frm.dp_item_id[i].value ){
			document.frm.use_flag[i].value = flag;
			setViewMode(document.frm.use_flag[i]);
		}
	}	
}

// 동일 아이템 background color 지정
function setItemGroupColor(){
	
	var tabLen = main_tbody.rows.length;
	
	if( tabLen == 1) return; // 한 라인이면 적용 안함.
	
	var itemId = document.frm.dp_item_id[0].value; // 처음 아이템 아이디로 초기화
	var color1 = "#d0d0d0";
		
	for( i = 0 ; i < tabLen ; i++ ){
		if( itemId == document.frm.dp_item_id[i].value){ // 동일 제품일 때
			main_tr[i].style.backgroundColor = color1;
		}
		else{
			if( color1 == "#d0d0d0"){
				color1 = "#ffffff";
			}
			else{
				color1 = "#d0d0d0";
			}
			
			itemId = document.frm.dp_item_id[i].value; // 새로운 아이템 아이디로 초기화
			
			main_tr[i].style.backgroundColor = color1;
		}
	}
}

var orgColor;
// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환
// left_tbody 가 없는 테이블
function bgOver2( obj ) { 
		
	if( main_tbody.rows[obj.rowIndex] ) 
	{ 
		orgColor = main_tbody.rows[obj.rowIndex].style.backgroundColor;
		main_tbody.rows[obj.rowIndex].style.backgroundColor = "#eeeeee";
	} 
	else 
	{ 
		orgColor = main_tbody.rows.style.backgroundColor;
		main_tbody.rows.style.backgroundColor = "#eeeeee";
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환
// left_tbody 가 없는 테이블
function bgOut2( obj ) {
	
	if( main_tbody.rows[obj.rowIndex] ) 
	{ 
		main_tbody.rows[obj.rowIndex].style.backgroundColor = orgColor;
		//main_tbody.rows[obj.rowIndex].style.backgroundColor = "#ffffff";
	} 
	else 
	{ 
		main_tbody.rows.style.backgroundColor = orgColor;
		//main_tbody.rows.style.backgroundColor = "#ffffff";
	}
	
}
