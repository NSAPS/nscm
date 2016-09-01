// 기간 : 시작일 변경 --> 종료일 동적으로 변경
/*function sumDate( strDate ){
	
	if(chkDate(strDate,"10") == 0) return;
	if(strDate == null){
		var temp = new Date();
		temp.setDate(temp.getDate() + 12);
	}
	else{	
		var sdate = strDate.value.split("-");
		var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
		temp.setDate(temp.getDate() + 12);		
	}
	
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var date = temp.getDate();
	if(date < 10) date = "0" + date;
	var edate = year+ "-" + month+ "-" + date;
	//alert(edate);											
	document.frm.edate.value = edate;
}*/
function sumDate( strDate ){
	
	if(chkDate(strDate,"10") == 0) return;
	if(strDate == null){
		var temp = new Date();
		temp.setDate(temp.getDate() + 20);
	}
	else{	
		var sdate = strDate.value.split("-");
		var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
		temp.setDate(temp.getDate() + 20);		
	}
	
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var date = temp.getDate();
	if(date < 10) date = "0" + date;
	var edate = year+ "-" + month+ "-" + date;
	//alert(edate);											
	document.frm.edateD.value = edate;
}

function sumMonth( strDate ){
	
	if(chkDate(strDate,"7") == 0) return;
	if(strDate == null ){
		var temp = new Date();
		temp.setDate(temp.getDate() + 155);
	}
	else{	
		var sdate = strDate.value.split("-");
		var temp = new Date(sdate[0], sdate[1]-1);
		temp.setDate(temp.getDate() + 155);		
	}
	
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
		
	var edate = year+ "-" + month;
	//alert(edate);											
	document.frm.edateM.value = edate;
}

function doChangeDisplayDate(obj){
	if( obj.value == "MONTHLY" ){
		monthly.style.display = "block";
		daily.style.display = "none";
	}
	else{
		monthly.style.display = "none";
		daily.style.display = "block";
	} 
}