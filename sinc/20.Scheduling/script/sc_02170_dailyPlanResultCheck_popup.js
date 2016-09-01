
// opener update 용 
function onclickfunc( row, col, data ) { 

	//계획 구분!%!실행 일!%!계획 명!%!공장 명
	opener.document.frm.run_date.value = data.split("!%!")[1];
	
	this.close(); 

} 