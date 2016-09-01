function addItem(row, col, data) {	
    
  
    //거래처코드!%!거래처명   
	opener.document.getElementById("customer_id").value = data.split("!%!")[0];
	opener.document.getElementById("customer_name").value = data.split("!%!")[1];
	  
	//window.reload(); 
	window.close();  		
}  