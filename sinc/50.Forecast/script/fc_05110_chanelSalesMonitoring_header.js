/**
 @path    /sinc/50.Forecast/script/fc_05110_chanelSalesMonitoring_header.js
 @Creator    김규철  
 @version    1.0
 @date        2008-11-26 
 @description : 1차개발 완료
*/ 

// 기간 : 시작일 변경 --> 종료일 동적으로 변경 
function sumDate( strDate ){
	 
	if(chkDate(strDate,"10") == 0) return;
	if(strDate == null){
		var temp = new Date();
		temp.setDate(temp.getDate() + 31);
	} 
	else{	
		var sdate = strDate.value.split("-");
		var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
		temp.setDate(temp.getDate() + 31);		
	}
	
	var year = temp.getYear();
	var month = temp.getMonth() + 1;
	if(month < 10 ) month = "0" + month;
	var date = temp.getDate();
	if(date < 10) date = "0" + date;
	var edate = year+ "-" + month+ "-" + date;
	//alert(edate);											
	document.frm.edate.value = edate;
}
  
searchIFrameData = function(periodGB) {	  
 
 	periodGB = "fc_05110_chanelSalesMonitoring_tailer"; 		
 	
    childViewWait(); 

	document.frm._moon_service.value = periodGB;  
	document.frm.action = "service.do";
	document.frm.target = "iframe01";
	document.frm.submit();
}; 

// 조회시 waiting 이미지 보여주기
function childViewWait() { 
	
	if( iframe01.document.all.waitArea ) {
		if( iframe01.waitArea.style.display.toUpperCase() == "NONE" ) {  
			iframe01.gridArea.style.display = "none";
			iframe01.waitArea.style.display = "block";
		}
		else { 
			iframe01.gridArea.style.display = "block";
			iframe01.waitArea.style.display = "none";
		}   
	} 
}      

//품종 name 조회
function getCustNm(obj) {
	var custId = obj.value;
	var custName = null; 
	  
	for (var j = 0; j < obj.options.length; j++) {
		if ( obj.options[j].selected == true) {
		  custName = obj.options[j].text;
		  custName = custName + "계";
		} 
	}	 
	  
	document.frm.custName.value = custName;		 
}	