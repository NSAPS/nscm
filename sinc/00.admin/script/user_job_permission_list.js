
// ���� ���� Ŭ��
function onclickfunc(row, col, data) {
		
		var user_id = document.frm._user_id.value;
		var adminFlag = document.frm.adminFlag.value;
		// ����!%!���!%!����ڸ�!%!�׷��!%!�̸���!%!��ȭ��ȣ
		if( data.split("!%!")[0] == user_id || adminFlag == "Y" ) {
			var perpage = document.frm._moon_perpage.value;
			var pagenumber = document.frm._moon_pagenumber.value;
			var urlStr = "service.do?_moon_service=user_job_permission_detail&user_id=";
			urlStr += data.split("!%!")[0];
			urlStr += "&_moon_perpage=" + perpage + "&_moon_pagenumber=" + pagenumber;
			location.href = urlStr;
		}
		
}

// ���� �ϰ� ���� ��ư Ŭ��
function exeBatch() {
	
	var msg = "";
	msg += "=========================================================================\n";
	msg += " * ����\n";
	msg += "=========================================================================\n";
	msg += "1. �ݵ�� �׷캰 �޴��� ���� ������ ��Ȯ�� �ϰ� �� �� �����ؾ� �մϴ�.\n";
	msg += "2. �׷캰 �޴��� ���� ������ \n";
	msg += "    �ݵ�� �׷� �޴��� ���� �����ϰ�, �� ���� ������ �����ؾ� �մϴ�. \n";
	msg += "=========================================================================\n";
	msg += "\n ��� �����Ͻðڽ��ϱ�?";
	if( !confirm(msg) ) {
		return;
	}
	else {
		GoSave("execute_permission_batch");
	}
	
}
