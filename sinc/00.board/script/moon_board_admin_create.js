
GoSave = function(service) {	
	
	// �Խ��� ID �Է� üũ
	var board_id = document.frm.board_id.value;
	if(board_id == null || board_id == ''){
		alert("�Խ��� ID �� �Է��ϼ���.");
		document.frm.board_id.focus();
		return;
	}
	// �Խ��� ���� �Է� üũ
	var table_explain = document.frm.table_explain.value;
	if(table_explain == null || table_explain == ''){
		alert("�Խ��� ������ �Է��ϼ���.");
		document.frm.table_explain.focus();
		return;
	}
	// �Խ��� TITLE �Է� üũ
	var title = document.frm.title.value;
	if(title == null || title == ''){
		alert("TITLE �� �Է��ϼ���.");
		document.frm.title.focus();
		return;
	}
	
	// ����÷�� ���� ����
	if(document.frm.data_flag.checked == false){
		document.frm.data_flag.click();
		document.frm.data_flag.value="0";
	}
	// ��� ��� ���� ����
	if(document.frm.memo_flag.checked == false){
		document.frm.memo_flag.click();
		document.frm.memo_flag.value="0";
	}
	
	// �׷��� �ִ��� üũ
	if( document.frm.secu_flag ) {
		// �׷����� ���� ����
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
	
	// �Խ��� ID �ߺ� üũ �� ����
	commonUtil.getCodeList("board_id", board_id, "moon_board_admin_create_check", { 
		callback:function(arryList){
			if( arryList.length == 0 ) {
				// service_id ����
				frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
				
				document.frm._moon_service.value = service; 
				document.frm.action = "service.do";
				document.frm.target = "_self";
				document.frm.submit();
			}
			else {
				alert("�Է��� �Խ��� ID �� �̹� �����մϴ�.");
				document.frm.board_id.select();
				return false;
			}
		}
	});

}

// ��ü ����, ���� 
function CheckAll( boxName, boxAttr ) 
{ 
	
	var boxObj = eval("document.frm."+boxName); 
	
	// �׷��� �ִ��� üũ
	if( boxObj ) {
		// �׷� ����Ʈ�� �� �� �̻��� ���
		if( boxObj.length ){
			for( var i=0; i<boxObj.length; ++i ) 
			{ 
				eval("document.frm."+boxName+"["+i.toString()+"]").checked = boxAttr; 
			}
		}
		// �׷� ����Ʈ�� �� ���� ���
		else {
			eval("document.frm."+boxName).checked = boxAttr;
		}
	}
	
}
