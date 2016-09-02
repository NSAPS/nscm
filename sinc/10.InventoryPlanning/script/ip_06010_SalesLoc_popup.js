 
// opener update 용 
function fillOpenWindow( row, col, data ) {

	// 영업지점코드!%!영업지점명!%!영업지점GRAD
	opener.document.frm.in_sales_loc.value = data.split("!%!")[0];
	opener.document.frm.in_sales_loc_name.value = data.split("!%!")[1];
	opener.document.frm.in_dept_grad_code.value = data.split("!%!")[2];
	// 조회단위 COMBO 갱신
	opener.sel_type_Change()	

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


