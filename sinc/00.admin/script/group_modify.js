
// �޴� ��ü ����/����	
function clickMenuAll(objChk) {
		
		var len = document.frm.check_menu.length;
		for( var i = 0 ; i < len ; i++ ) {
			document.frm.check_menu[i].checked = objChk.checked;
		}
		
}

// �޴� ���� üũ�ڽ� �׵θ� ����
function delBorderCheck() {
	
	var len = document.frm.check_menu.length;
	if( len == 1 ) {
		document.frm.check_menu.style.border = "0px";
	}
	else {
		for( var i=0 ; i < len ; ++i ) {
			document.frm.check_menu[i].style.border = "0px";
		}
	}
	
}
