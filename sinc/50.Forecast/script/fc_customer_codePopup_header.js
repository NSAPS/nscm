function addItem(row, col, data) {	
    
  
    //�ŷ�ó�ڵ�!%!�ŷ�ó��   
	opener.document.getElementById("customer_id").value = data.split("!%!")[0];
	opener.document.getElementById("customer_name").value = data.split("!%!")[1];
	  
	//window.reload(); 
	window.close();  		
}  