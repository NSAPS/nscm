function addCheckedItem(row, col, data) {	
	//�θ� function() ȣ��   
    parent.addItem(row, col, data); 	
}  


 
// opener update �� 
function fillOpenWindow( row, col, data ) { 
        
	//�ŷ�ó�ڵ�!%!�ŷ�ó��
	
	/*
	var id_input = document.frm.id_input.value;
	var name_input = document.frm.name_input.value;
	*/
	  
	//opener.document.getElementById(customer_id).value = data.split("!%!")[0];
	//opener.document.getElementById(customer_name).value = data.split("!%!")[1];
	 
	//window.reload(); 
	//this.close(); 

} 

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstClick(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.code_input.value = ""; 
		document.frm.first_condition.value = "N"; 
	}
	
}

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstChange(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.first_condition.value = "N"; 
	}
	
} 
