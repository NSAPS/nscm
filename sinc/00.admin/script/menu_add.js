
// �ߺ�üũ	
function check(){
	var menu_id_insert = document.frm.menu_id_insert.value;
	//alert(menu_id_insert);
	if(menu_id_insert == null || menu_id_insert == ""){
		alert("�޴�ID�� �Է��� �ֽʽÿ�.");
		document.frm.menu_id_insert.focus();
		return;
	}

//	DuplicateCheck.duplicateCheck(menu_id_insert, "menu_id_check", {
//		callback:function(checkResult){
//			if( Number(checkResult) > 0) {
//				alert("�Է��Ͻ� �޴�ID�� �̹� ��ϵ� ������ �Դϴ�.");
//				document.frm.menu_id_insert.select();				
//				return;
//			}
//			else
//				alert("��� ������ ������ �Դϴ�.");
//		}
//	});	
	commonUtil.checkKeyValue(menu_id_insert, "menu_id_check", checkMenuId);
}

function checkMenuId(checkResult){
	if( Number(checkResult) > 0) {
		alert("�Է��Ͻ� �޴�ID�� �̹� ��ϵ� ������ �Դϴ�.");
		document.frm.menu_id_insert.select();
		dCheckResult = 1;		
		return;
	}
	else {
		dCheckResult = 2;
		alert("��� ������ ������ �Դϴ�.");
	}
}

GoSave = function(service){
	if(dCheckResult == 0){
		document.frm.menu_id_insert.select();
		alert("�ߺ�üũ�� ���� �ʾҽ��ϴ�. �ߺ�üũ�� ���ֽʽÿ�");
		return;
	}		
	
	if(dCheckResult == 1){
		alert("�Է��Ͻ� �޴�ID�� �̹� ��ϵ� ������ �Դϴ�.");
		return;
	}	
		
	if(dCheckResult == 2){
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	}	
}