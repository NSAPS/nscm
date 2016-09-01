 
// opener update 용 
function fillOpenWindow( row, col, data ) {

	//제품타입!%!제품 코드!%!제품 명
	opener.document.frm.in_alloc_item.value = data.split("!%!")[0];
	opener.document.frm.in_alloc_item_name.value = data.split("!%!")[1];
	// item_name을 표시하는 object가 disable이므로 화면 reload시 없어진다. 그래서 따로 하나 저장해둔다
	opener.document.frm.item_name.value = data.split("!%!")[1];
	// 품목이 바뀌었으므로 COMMENT는 삭제한다.
	opener.document.frm.in_alloc_reason_comment.value = "";
	this.close(); 

} 

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


