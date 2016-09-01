/**
 @path    /sinc/50.Forecast/script/fc_05070_salesMonitoring_header.js
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

//checkBox 
function changeCheckBox(obj){
	 
	 document.frm.periodGB1.checked=false;
	 document.frm.periodGB2.checked=false;
	 document.frm.periodGB3.checked=false;
	 event.srcElement.checked=true;        //event.srcElement는 이벤트가 발생한 객체입니다.

	 check= event.srcElement.name;
	  	 	 
	 if(check=="periodGB1"){
	   //alert("월_클릭");
	   document.frm.periodGB1.value = "M";
	   document.frm.periodGB2.value = "";
	   document.frm.periodGB3.value = "";
	   
	   document.frm.periodGB.value = "M"; //기간구분(월)

	   document.getElementById("changGubun1").style.display = "";
	   document.getElementById("changGubun2").style.display = "none";
  
	 }else if(check=="periodGB2"){
	 	//alert("주_클릭");
	   document.frm.periodGB1.value = "";
	   document.frm.periodGB2.value = "W";
	   document.frm.periodGB3.value = ""; 

	   document.frm.periodGB.value = "W"; //기간구분(주)
	   
	   document.getElementById("changGubun1").style.display = "none";
	   document.getElementById("changGubun2").style.display = "";
	   
	 }else if(check=="periodGB3"){
	   //alert("일_클릭");
	   document.frm.periodGB1.value = "";
	   document.frm.periodGB2.value = "";
	   document.frm.periodGB3.value = "D";  
 
 	   document.frm.periodGB.value = "D"; //기간구분(일)
 
	   document.getElementById("changGubun1").style.display = "none";
	   document.getElementById("changGubun2").style.display = "";

	 }  
  }   
  
//checkBox2 품종구분   
function checkBoxGB1Change(obj){
	 
	 document.frm.item_GB1.checked=false;
	 document.frm.item_GB2.checked=false;
	 document.frm.item_GB3.checked=false;
	 document.frm.item_GB4.checked=false;
	 
	 event.srcElement.checked=true;        //event.srcElement는 이벤트가 발생한 객체입니다.

	 check= event.srcElement.name;
	  	 	 
	 if(check=="item_GB1"){
	   //alert("품종(대)");
	   document.frm.item_GB1.value = "1";
	   document.frm.item_GB2.value = "";
	   document.frm.item_GB3.value = ""; 
	   document.frm.item_GB4.value = "";  
	  
	 }else if(check=="item_GB2"){
	   //alert("품종(중)");
	   document.frm.item_GB1.value = "" ;
	   document.frm.item_GB2.value = "2";
	   document.frm.item_GB3.value = "" ; 
	   document.frm.item_GB4.value = "" ;  
	   
	 }else if(check=="item_GB3"){
	   //alert("품종(소)");
	   document.frm.item_GB1.value = "" ;
	   document.frm.item_GB2.value = "";
	   document.frm.item_GB3.value = "3" ; 
	   document.frm.item_GB4.value = "" ;  

	 }else{ 
	   //alert("품목");
	   document.frm.item_GB1.value = "" ;
	   document.frm.item_GB2.value = "" ;
	   document.frm.item_GB3.value = "" ; 
	   document.frm.item_GB4.value = "4" ;  
	 } 

}

//checkBox3 조직구분   
function checkBoxGB2Change(obj){
	 
	 document.frm.org_GB1.checked=false;
	 document.frm.org_GB2.checked=false;
	 document.frm.org_GB3.checked=false;
	 
	 event.srcElement.checked=true;        //event.srcElement는 이벤트가 발생한 객체입니다.

	 check= event.srcElement.name;
	  	 	 
	 if(check=="org_GB1"){

	   document.frm.org_GB1.value = "1";
	   document.frm.org_GB2.value = "";
	   document.frm.org_GB3.value = ""; 
	  
	 }else if(check=="org_GB2"){

	   document.frm.org_GB1.value = "";
	   document.frm.org_GB2.value = "2";
	   document.frm.org_GB3.value = ""; 
	   
	 }else{ 

	   document.frm.org_GB1.value = "";
	   document.frm.org_GB2.value = "";
	   document.frm.org_GB3.value = "3";    
	 } 
  }   
  
searchIFrameData = function(periodGB) {	

 	if(periodGB == "D"){  
 		periodGB = "fc_05080_salesMonitoring_tailer"; 		
 	}else{
 		periodGB = "fc_05070_salesMonitoring_tailer"; 		
 	}
 	 
	// WAITING 이미지 보여주기
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
