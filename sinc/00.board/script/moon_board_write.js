
GoSave = function(service) {
		
		var subject = document.frm._board_subject.value;
		
		if(subject == null || subject == ''){
			alert("제목을 입력해주십시요.");
			document.frm._board_subject.focus();
			return;
		}
		
		if(document.frm.text_check.checked){
			document.frm._board_contents.value = TextEditor.document.body.innerHTML;
			if( !document.frm._board_contents.value ){
				alert( "내용을 입력해주세요!^^");
				TextEditor.document.body.focus();
				return;
			}
		}else{
			document.frm._board_contents.value = document.frm.html_body.value;
			if( !document.frm._board_contents.value ){
				alert( "내용을 입력해주세요!^^");
				document.frm.html_body.focus();
				return;
			}
		}
		
		// 게시판 최대 허용 길이 초과 체크 
		if( document.frm._board_contents.value.length > 40000 ) { 
			alert("입력하신 내용의 길이가 허용 용량을 초과하였습니다."); 
			return; 
		} 
		else {
			splitContents(document.frm._board_contents.value); 
		}
		
		// 제목의 특수문자를 converting
		// [ --> &#91;
		// ] --> &#93;
		// $ --> &#36;
		// ' --> &#39;
		// " --> &#34;
		// { --> &#123;
		// } --> &#125;
		document.frm._board_subject.value = convSpclChar(subject);
		
		// service_id 저장
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.encoding = "multipart/form-data";
		document.frm.submit();
		
};

// 1000 바이트 이상의 내용을 저장하기 위해
// 1000 바이트 씩으로 자른다 
function splitContents(contents) { 
		
		// 내용에서 특수문자를 converting
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

// Tab 화면 resizing 
// tab_h : tab height ( 실제 tab 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 tab 높이가 커짐 ) 
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
		
		// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
		// ==> 화면이 더이상 축소되지 않음 
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
