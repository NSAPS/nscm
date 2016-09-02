
GoSave = function(service) {	
	
	// 게시판 ID 입력 체크
	var board_id = document.frm.board_id.value;
	if(board_id == null || board_id == ''){
		alert("게시판 ID 를 입력하세요.");
		document.frm.board_id.focus();
		return;
	}
	// 게시판 설명 입력 체크
	var table_explain = document.frm.table_explain.value;
	if(table_explain == null || table_explain == ''){
		alert("게시판 설명을 입력하세요.");
		document.frm.table_explain.focus();
		return;
	}
	// 게시판 TITLE 입력 체크
	var title = document.frm.title.value;
	if(title == null || title == ''){
		alert("TITLE 을 입력하세요.");
		document.frm.title.focus();
		return;
	}
	
	// 파일첨부 여부 설정
	if(document.frm.data_flag.checked == false){
		document.frm.data_flag.click();
		document.frm.data_flag.value="0";
	}
	// 댓글 허용 여부 설정
	if(document.frm.memo_flag.checked == false){
		document.frm.memo_flag.click();
		document.frm.memo_flag.value="0";
	}
	
	// 그룹이 있는지 체크
	if( document.frm.secu_flag ) {
		// 그룹접근 권한 설정
		if( document.frm.secu_flag.length ) {
			for(var i=0; i<document.frm.secu_flag.length; i++){
				if(!document.frm.secu_flag[i].checked){
					document.frm.secu_flag[i].click();
					document.frm.secu_flag[i].value="0";
				}
			}
		}
		else {
			if(!document.frm.secu_flag.checked){
				document.frm.secu_flag.click();
				document.frm.secu_flag.value="0";
			}
		}
	}
	
	// 게시판 ID 중복 체크 후 저장
	commonUtil.getCodeList("board_id", board_id, "moon_board_admin_create_check", { 
		callback:function(arryList){
			if( arryList.length == 0 ) {
				// service_id 저장
				frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
				
				document.frm._moon_service.value = service; 
				document.frm.action = "service.do";
				document.frm.target = "_self";
				document.frm.submit();
			}
			else {
				alert("입력한 게시판 ID 가 이미 존재합니다.");
				document.frm.board_id.select();
				return false;
			}
		}
	});

}

// 전체 선택, 해제 
function CheckAll( boxName, boxAttr ) 
{ 
	
	var boxObj = eval("document.frm."+boxName); 
	
	// 그룹이 있는지 체크
	if( boxObj ) {
		// 그룹 리스트가 두 건 이상인 경우
		if( boxObj.length ){
			for( var i=0; i<boxObj.length; ++i ) 
			{ 
				eval("document.frm."+boxName+"["+i.toString()+"]").checked = boxAttr; 
			}
		}
		// 그룹 리스트가 한 건인 경우
		else {
			eval("document.frm."+boxName).checked = boxAttr;
		}
	}
	
}
