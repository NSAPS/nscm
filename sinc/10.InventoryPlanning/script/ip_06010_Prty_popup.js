 
// opener update 용 
function fillOpenWindow( row, col, data ) {

	// 품목코드!%!품목명!%!판매중!%!생산/매입
	opener.document.frm.in_item_id.value = data.split("!%!")[0];
	opener.document.frm.in_item_name.value = data.split("!%!")[1];
	// 조회단위 COMBO 갱신

	this.close(); 

} 

GoSearch = function(service) {

	// 조회시 WAITING 이미지 보여주기
	viewWait();

	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// 처음 클릭 시 내용 지우는 함수
function firstClick(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.selected_item_id.value = ""; 
		document.frm.first_condition.value = "N"; 
	}
	
}

// 처음 클릭 시 내용 지우는 함수
function firstChange(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.first_condition.value = "N"; 
	}
	
} 


