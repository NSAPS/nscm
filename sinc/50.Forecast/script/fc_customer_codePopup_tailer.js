function addCheckedItem(row, col, data) {	
	//부모 function() 호출   
    parent.addItem(row, col, data); 	
}  


 
// opener update 용 
function fillOpenWindow( row, col, data ) { 
        
	//거래처코드!%!거래처명
	
	/*
	var id_input = document.frm.id_input.value;
	var name_input = document.frm.name_input.value;
	*/
	  
	//opener.document.getElementById(customer_id).value = data.split("!%!")[0];
	//opener.document.getElementById(customer_name).value = data.split("!%!")[1];
	 
	//window.reload(); 
	//this.close(); 

} 

// 처음 클릭 시 내용 지우는 함수
function firstClick(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.code_input.value = ""; 
		document.frm.first_condition.value = "N"; 
	}
	
}

// 처음 클릭 시 내용 지우는 함수
function firstChange(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.first_condition.value = "N"; 
	}
	
} 
