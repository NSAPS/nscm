
// 메모 저장
GoMemoRegister = function(service) {
	
		var contents = document.frm._memo.value;
		
		if(contents == null || contents == ''){
			alert("내용이 없습니다.");
			document.frm._memo.focus();
			return;
		}
		
		// 메모의 특수문자를 converting
		// [ --> &#91;
		// ] --> &#93;
		// $ --> &#36;
		// ' --> &#39;
		// " --> &#34;
		// { --> &#123;
		// } --> &#125;
		document.frm._memo.value = convSpclChar(contents);
		
		// service_id 저장
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
		
};

// 메모 삭제
MemoDelete = function(memo_seq) {
	
		var service = "moon_board_memo_del";	
		
		// service_id 저장
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._memo_seq.value = memo_seq; 
		document.frm._moon_service.value = service; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	
};

// 수정화면 이동
GoEdit = function(service) {
	
		document.frm._moon_service.value = service; 
		document.frm._board_type.value = "modify";
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	
};

// 답글 등록 화면 이동
GoReply = function(service) {
	
		document.frm._moon_service.value = service; 
		document.frm._board_type.value = "reply";
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	
};

// 게시물 삭제
GoDelete = function(service) {
	
		if(!confirm("삭제 하시겠습니까?")){
			retrun;	
		}
				
		// service_id 저장
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit();
	
};

// 첨부파일 다운로드
GoDownload = function(service, re_step, seq) {
			
		// service_id 저장
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
		
		document.frm._moon_service.value = service; 
		document.frm.action = "service.do";
		document.frm.target = "_float";
		document.frm._re_step.value = re_step;
		document.frm._file_seq.value = seq;
		document.frm.submit();
	
};

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
		contents_td.height = divHeightValue - 145 + "px"; 
	
} 
