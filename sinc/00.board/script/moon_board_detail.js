
// �޸� ����
GoMemoRegister = function(service) {
	
		var contents = document.frm._memo.value;
		
		if(contents == null || contents == ''){
			alert("������ �����ϴ�.");
			document.frm._memo.focus();
			return;
		}
		
		// �޸��� Ư�����ڸ� converting
		// [ --> &#91;
		// ] --> &#93;
		// $ --> &#36;
		// ' --> &#39;
		// " --> &#34;
		// { --> &#123;
		// } --> &#125;
		document.frm._memo.value = convSpclChar(contents);
		
		// service_id ����
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
		
};

// �޸� ����
MemoDelete = function(memo_seq) {
	
		var service = "moon_board_memo_del";	
		
		// service_id ����
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._memo_seq.value = memo_seq; 
		document.frm._moon_service.value = service; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	
};

// ����ȭ�� �̵�
GoEdit = function(service) {
	
		document.frm._moon_service.value = service; 
		document.frm._board_type.value = "modify";
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	
};

// ��� ��� ȭ�� �̵�
GoReply = function(service) {
	
		document.frm._moon_service.value = service; 
		document.frm._board_type.value = "reply";
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	
};

// �Խù� ����
GoDelete = function(service) {
	
		if(!confirm("���� �Ͻðڽ��ϱ�?")){
			retrun;	
		}
				
		// service_id ����
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	
};

// ÷������ �ٿ�ε�
GoDownload = function(service, re_step, seq) {
			
		// service_id ����
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service; 
		document.frm.action = "service.do";
		document.frm.target = "_float";
		document.frm._re_step.value = re_step;
		document.frm._file_seq.value = seq;
		document.frm.submit();
	
};

// Tab ȭ�� resizing 
// tab_h : tab height ( ���� tab �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� tab ���̰� Ŀ�� ) 
function setTabAutoResize2( tab_h, div_h ){
		
		var maxWidthValue;
		var maxHeightValue;
		
		if (document.layers) {
			//Nescape
			maxWidthValue = window.innerWidth;
			maxHeightValue = window.innerHeight;
		}
		if (document.all) {
			//explore
			maxWidthValue = document.body.clientWidth;
			maxHeightValue = document.body.clientHeight;
		} 
		
		var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
		var divHeightValue = Number(maxHeightValue) - Number(div_h) ; 
		//
		var search_h = document.frm.search_h.value; 
		if( search_menu.style.display == "none" ) 
		{ 
			tabHeightValue += Number(search_h); 
			divHeightValue += Number(search_h); 
		} 
		
		// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
		// ==> ȭ���� ���̻� ��ҵ��� ���� 
		if( tabHeightValue < 1 ) 
			tabHeightValue = 1; 
		if( divHeightValue < 1 ) 
			divHeightValue = 1; 
		
		tabPage1.style.height = tabHeightValue + "px"; 
		divID.style.height = divHeightValue + "px"; 
		contents_td.height = divHeightValue - 145 + "px"; 
	
} 
