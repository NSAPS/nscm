
// 중복체크	
function check(){
	var menu_id_insert = document.frm.menu_id_insert.value;
	//alert(menu_id_insert);
	if(menu_id_insert == null || menu_id_insert == ""){
		alert("메뉴ID를 입력해 주십시오.");
		document.frm.menu_id_insert.focus();
		return;
	}

//	DuplicateCheck.duplicateCheck(menu_id_insert, "menu_id_check", {
//		callback:function(checkResult){
//			if( Number(checkResult) > 0) {
//				alert("입력하신 메뉴ID는 이미 등록된 데이터 입니다.");
//				document.frm.menu_id_insert.select();				
//				return;
//			}
//			else
//				alert("등록 가능한 데이터 입니다.");
//		}
//	});	
	commonUtil.checkKeyValue(menu_id_insert, "menu_id_check", checkMenuId);
}

function checkMenuId(checkResult){
	if( Number(checkResult) > 0) {
		alert("입력하신 메뉴ID는 이미 등록된 데이터 입니다.");
		document.frm.menu_id_insert.select();
		dCheckResult = 1;		
		return;
	}
	else {
		dCheckResult = 2;
		alert("등록 가능한 데이터 입니다.");
	}
}

GoSave = function(service){
	if(dCheckResult == 0){
		document.frm.menu_id_insert.select();
		alert("중복체크를 하지 않았습니다. 중복체크를 해주십시오");
		return;
	}		
	
	if(dCheckResult == 1){
		alert("입력하신 메뉴ID는 이미 등록된 데이터 입니다.");
		return;
	}	
		
	if(dCheckResult == 2){
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}	
}