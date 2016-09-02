
GoSave = function(service) {
		
		var subject = document.frm._board_subject.value;
		
		if(subject == null || subject == ''){
			alert("������ �Է����ֽʽÿ�.");
			document.frm._board_subject.focus();
			return;
		}
		
		if(document.frm.text_check.checked){
			document.frm._board_contents.value = TextEditor.document.body.innerHTML;
			if( !document.frm._board_contents.value ){
				alert( "������ �Է����ּ���!^^");
				TextEditor.document.body.focus();
				return;
			}
		}else{
			document.frm._board_contents.value = document.frm.html_body.value;
			if( !document.frm._board_contents.value ){
				alert( "������ �Է����ּ���!^^");
				document.frm.html_body.focus();
				return;
			}
		}
		
		// �Խ��� �ִ� ��� ���� �ʰ� üũ 
		if( document.frm._board_contents.value.length > 40000 ) { 
			alert("�Է��Ͻ� ������ ���̰� ��� �뷮�� �ʰ��Ͽ����ϴ�."); 
			return; 
		} 
		else {
			splitContents(document.frm._board_contents.value); 
		}
		
		// ������ Ư�����ڸ� converting
		// [ --> &#91;
		// ] --> &#93;
		// $ --> &#36;
		// ' --> &#39;
		// " --> &#34;
		// { --> &#123;
		// } --> &#125;
		document.frm._board_subject.value = convSpclChar(subject);
		
		// service_id ����
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.encoding = "multipart/form-data";
		document.frm.submit();
		
};

// 1000 ����Ʈ �̻��� ������ �����ϱ� ����
// 1000 ����Ʈ ������ �ڸ��� 
function splitContents(contents) { 
		
		// ���뿡�� Ư�����ڸ� converting
		// [ --> &#91;
		// ] --> &#93;
		// $ --> &#36;
		// ' --> &#39;
		// " --> &#34;
		// { --> &#123;
		// } --> &#125;
		contents = convSpclChar(contents);
		
		maxLength = contents.length;
		document.frm._board_contents.value = contents.slice(0, 1000); 
		for( var i = 1; i < 40; ++i ) 
		{
			if( i*1000 < maxLength ) 
				document.frm.contents_array[i-1].value = contents.slice(i*1000, (i+1)*1000); 
		} 
		
} 

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
		//alert(divHeightValue);
		//alert(document.getElementById('TextEditor').height); 
		document.getElementById('TextEditor').height = divHeightValue-100 + "px"; 
		document.getElementById('html_layer_td').height = divHeightValue-100 + "px"; 
		document.getElementById('pre_content').height = divHeightValue-100 + "px"; 
	
}
