GoDelete = function(service) {
	
		var check_check = 0;
		if( document.frm._board_admin_del.length ) 
		{ 
			for(var i=0; i<document.frm._board_admin_del.length; i++){
				if(document.frm._board_admin_del[i].checked){
					check_check = check_check + 1;
				}		
			} 
		} 
		else 
		{ 
			if( document.frm._board_admin_del.checked ) 
				check_check = check_check + 1;
		} 
		
		if(check_check == 0 ){
			alert("�ϳ� �̻� üũ�ؾ� �մϴ�.");
			return;	
		}
			
		if(!confirm("���� �Ͻðڽ��ϱ�?")){
			return;
		}
	
		for(var i=0; i<document.frm._board_admin_del.length; i++){
			if(!document.frm._board_admin_del[i].checked){
				document.frm._board_admin_del[i].removeNode(true);	
			}
		}
			
		// service_id ����
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
		
}
