function GoSearch(service) {
	// 조회시 WAITING 이미지 보여주기
	//var service = rp_01015_transportPlanRegistration_list_dev;
	//alert(service);
	viewWait();
	document.frm._moon_service.value = service;
	//document.form1._moon_perpage.value = perpage;
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};
function mass_plan_reg(){	
	var urlStr = "service.do?_moon_service=rp_01015_mass_trans_plan_reg";
	//urlStr += "&cd_grp=" + cd_grp_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
}

// 더블 클릭 : 수송계획 수정 화면
function onclickfunc(row, col, data) {
		
	var urlStr = "service.do?_moon_service=rp_01015_transportPlanRegistration_mod";
	//alert(data);
	var list = data.split("!%!");
	
	var brand_no = list[13];
	
	if( brand_no == "" || brand_no == null ) {  
	}else{
		alert("확정된 전표는 수정이 불가능 합니다.");
		return;		
	}
		
	var version	= document.frm.version.value;
	var seq		= document.frm.seq.value;
	
	urlStr += "&version=" 	+ version; // 아이템 코드
	urlStr += "&seq=" 	+ seq; // 아이템 코드

	urlStr += "&plan_type=" 	+ list[0]; // 플랜타입
	urlStr += "&trans_date=" 	+ list[2]; // 수송일자
	urlStr += "&truck_seq=" 	+ list[7]; // 차량순번
	urlStr += "&src_loc=" 		+ list[3]; // 출고장
	urlStr += "&tgt_loc=" 		+ list[5]; // 입고장


	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
		
}


// 이전화면으로 이동
function moveBack() {
	
	//var cd_grp_pre = document.frm.cd_grp_pre.value;

	
	var urlStr = "service.do?_moon_service=rp_01015_transportPlanRegistration_list_dev";
	//urlStr += "&cd_grp=" + cd_grp_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
	
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
	
}//부산제품 전용 버튼
function makeBrand2(service){						var version 	= document.frm.version.value;		var seq 		= document.frm.seq.value;		var trans_start = document.frm.trans_start.value;	var trans_end 	= document.frm.trans_end.value;			 document.frm.run_seq.value = '2';	var user_id 	= document.frm._user_id.value;	var src_loc 	= document.frm.src_loc_sel.value;	// 입고장을 선택하지 않은 경우	if( version == null || version == "" || seq == null || seq == "" ) {		alert("버전을 먼저 선택하고 데이터 조회 후, 발행이 가능합니다.");		return;	}	// 버전, 차수를 선택하지 않은 경우	if( trans_start == null || trans_start == "" || trans_end == null || trans_end == "" ) {		alert("수송일자를 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");		return;	}		if(checkConfirm())		return;	// WAITING 이미지 보여주기	viewWait();		// service_id 저장	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;		document.frm._moon_service.value = service;	document.frm.action = "service.do";	document.frm.target = "_self";	document.frm.submit();	}

// 전표 발행
function makeBrand(service) {		commonUtil.getSelQeury( "user_id", document.frm._user_id.value, "rp_01015_transportPlanRegistration_list_dev_deptcode",{	callback:function(result){				if ( result == "5015" || document.frm._user_id.value == "ou4484189"){									var version 	= document.frm.version.value;	var seq 		= document.frm.seq.value;	var trans_start = document.frm.trans_start.value;	var trans_end 	= document.frm.trans_end.value;		document.frm.run_seq.value = '1';		var user_id 	= document.frm._user_id.value;	var src_loc 	= document.frm.src_loc_sel.value;	// 입고장을 선택하지 않은 경우	if( version == null || version == "" || seq == null || seq == "" ) {		alert("버전을 먼저 선택하고 데이터 조회 후, 발행이 가능합니다.");		return;	}	// 버전, 차수를 선택하지 않은 경우	if( trans_start == null || trans_start == "" || trans_end == null || trans_end == "" ) {		alert("수송일자를 먼저 선택하고 데이터 조회 후, 저장이 가능합니다.");		return;	}		if(checkConfirm())		return;			// WAITING 이미지 보여주기	viewWait();		// service_id 저장	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;		document.frm._moon_service.value = service;	document.frm.action = "service.do";	document.frm.target = "_self";	document.frm.submit();																						}else{					alert("해당 권한은 SCM팀만 가능합니다.");					return;			}		}	})		
	
	
}
