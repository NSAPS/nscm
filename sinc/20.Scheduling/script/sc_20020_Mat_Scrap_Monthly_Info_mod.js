// ����ȭ������ �̵�
function moveBack() {
	
	var service		= "sc_20020_Mat_Scrap_Monthly_Info";

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();

	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();	

}

// ����
GoSave = function() {

	var service		= "sc_20020_Mat_Scrap_Monthly_save_comp";
	var rowNo = main_tbody.rows.length;

	if(rowNo == 1){ // �ѰǸ� �����Ұ��...

		if(document.frm.old_disuse_reason.value != document.frm.in_disuse_reason.value ||
			document.frm.old_disuse_dept.value != document.frm.in_disuse_dept.value ||
			document.frm.old_disuse_comment.value != document.frm.in_disuse_comment.value ) {
			
			document.frm.save_flag.value = 'Y';
		}
	}
	else {

		for(var i = 0 ; i < rowNo ; i++){
			if(document.frm.old_disuse_reason[i].value != document.frm.in_disuse_reason[i].value ||
				document.frm.old_disuse_dept[i].value != document.frm.in_disuse_dept[i].value ||
				document.frm.old_disuse_comment[i].value != document.frm.in_disuse_comment[i].value ) {
				
				document.frm.save_flag[i].value = 'Y';
			}
		}
	}


	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();

	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();	
	
};

