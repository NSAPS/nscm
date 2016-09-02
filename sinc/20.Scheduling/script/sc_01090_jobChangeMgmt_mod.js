// 전역변수 선언
var objTdG;

// 이전화면으로 이동
function moveBack() {
	
	var cd_grp_pre = document.frm.cd_grp_pre.value;
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;	
	var plant_name = document.frm.plant_name.value;
	var jc_type = document.frm.jc_type.value;
	var select_line = document.frm.select_line.value;
	var select_proc = document.frm.select_proc.value;	
	
	var urlStr = "service.do?_moon_service=sc_01090_jobChangeMgmt_list";
	urlStr += "&plant_name=" + plant_name + "&jc_type=" + jc_type + "&select_line=" + select_line + "&select_proc=" + select_proc;
	urlStr += cd_grp_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	
	location.href = urlStr;
	
}



// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {	
	
	if( objTd.childNodes(0).style.display == "none" && objTd.childNodes(1).style.display == "block" ) {
		return;
	}	

	objTd.childNodes(0).style.display = "none";	
	objTd.childNodes(1).style.display = "block";
	objTd.childNodes(1).focus();
		
}



// input box 를 View Mode 로 변환
function setViewMode( objBox ) {	
	
	var strVal = objBox.value;	
	
	
	if( strVal != "" && strVal != null ) {
		// 숫자 체크
		if( checkNum(objBox, "BLANK") == false ) {
			//objSetting(objBox, "", "숫자만 입력하여 주세요.");
			//setEditMode( objTd );
			return;
		}
		// 형식이 맞는 경우 천단위 구분자 표시
		else {
			strVal = objBox.value;
			objBox.value = numberFormat( strVal );
			strVal = objBox.value;
		}
	}
	
		
	
	// input box 를 View Mode 로 변환
	objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	objBox.parentNode.childNodes(0).style.display = "block";
	objBox.style.display = "none";
	
}



// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = main_tbody.rows.length;
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	var objName = objBox.name;
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ){ 
				
				
		// effic --> 다음줄 코드
		if( objName == "jc_time" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
					objTdG = main_tbody.rows[0].cells[5];
			}
			// 다음줄의 input box 로 이동
			else {
				if( main_tbody.rows[rowIdx] ) {
					objTdG = main_tbody.rows[rowIdx+1].cells[5];
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

// setTimeout 에 실행되는 함수
function setEditModeTime() {
	
	setEditMode( objTdG );
		
}


// 조회영역 sleect 박스 '가동률'로 선택되면 jc time 지우기
function del() {
	
	var efficiency = document.frm.jc_name.value;
	var tableLen = main_tbody.rows.length;
	var ef = document.frm.eff_mod;
	
	if (efficiency == "EFFICIENCY") {
	
		for (var i=0; i < tableLen; i++) {
		
		 	document.frm.jc_time[i].value = "";
		 	jct[i].innerHTML = "";
		 	
		}
				
		document.frm.eff_mod.focus();
	}	
}





//조회영역의 가동율을 입력시 jc타입이 '가동율'인지를 체크
function chen(objBox) {
		
	var efficiency = document.frm.jc_name.value;	
	
	if (efficiency != "EFFICIENCY") {
		
		alert("JC 타입이 '가동률'이 아닙니다.");		
		document.frm.eff_mod.value = "";	
		
	}	
}




// 조회영역의 가동율 숫자 체크 함수
function setViewMode_2( objBox ) {	
	
	var strVal = objBox.value;
	
	if( strVal != "" && strVal != null ) {
		// 숫자 체크
		if( checkNum(objBox, "BLANK") == false ) {
			//objSetting(objBox, "", "숫자만 입력하여 주세요.");
			//setEditMode( objTd );
			return;
		}
		// 형식이 맞는 경우 천단위 구분자 표시
		else {
			strVal = objBox.value;
			objBox.value = numberFormat( strVal );
			strVal = objBox.value;
		}
	}	

}


