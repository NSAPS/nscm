/**
 @path    /sinc/50.Forecast/script/fc_05010_deflectionAnalysis_header.js
 @Creator    ���ö
 @version    1.0
 @date        2008-11-26 
 @description : 1������ �Ϸ�
*/
 
// ��ȸ�Ⱓ : ������ ���� --> ������ �������� ����
function sumDate( strDate ){
 	 
	if(chkDate(strDate,"10") == 0) return;
	if(strDate == null){
		var temp = new Date(); 
		temp.setDate(temp.getDate() + 180);
	} 
	else{	
		var sdate = strDate.value.split("-");
		var temp = new Date(sdate[0], sdate[1]-1, sdate[2]);
		temp.setDate(temp.getDate() + 180);		
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


//selecBox(��������)
function changeSelectBox(obj){
		 
	if(obj.value == 40){		 
	 document.getElementById("sales_org").disabled = false;		
	}else{
	 document.getElementById("sales_org").value = "";		
	 document.getElementById("sales_org").disabled = true;		
	}  
}  

//checkBox1(����1 �Ⱓ����) 
function changeCheckBox(obj){
	 
	 document.frm.periodGB1.checked=false;
	 document.frm.periodGB2.checked=false;
	 document.frm.periodGB3.checked=false;
	 event.srcElement.checked=true;        //event.srcElement�� �̺�Ʈ�� �߻��� ��ü�Դϴ�.

	 check= event.srcElement.name;
	  	 	 
	 if(check=="periodGB2"){
	 	//alert("��_Ŭ��");
	   document.frm.periodGB1.value = "";
	   document.frm.periodGB2.value = "W";
	   document.frm.periodGB3.value = "";	   
	   
	   document.frm.periodGB.value = "W"; //�Ⱓ����(��)
	   	   
	   document.getElementById("changGubun1").style.display = "";
	   document.getElementById("changGubun2").style.display = "none";

	 }else if(check=="periodGB3"){
	 	//alert("��/��Ŭ��");
	   document.frm.periodGB1.value = "";
	   document.frm.periodGB2.value = "";
	   document.frm.periodGB3.value = "D";	   

	   document.frm.periodGB.value = "D"; //�Ⱓ����(��/��)

	   document.getElementById("changGubun1").style.display = "";
	   document.getElementById("changGubun2").style.display = "none";	 	

	 }else {
	   //alert("��_Ŭ��");
	   document.frm.periodGB1.value = "M";
	   document.frm.periodGB2.value = "";
	   document.frm.periodGB3.value = "";

	   document.frm.periodGB.value = "M"; //�Ⱓ����(��)

	   document.getElementById("changGubun1").style.display = "none";
	   document.getElementById("changGubun2").style.display = "";
	 }
  }   
  
//checkBox(����3 ����) 
function checkBoxChange(obj){ 
 
	 document.frm.diff_check1.checked=false;
	 document.frm.diff_check2.checked=false;
	 document.frm.diff_check3.checked=false;
	 event.srcElement.checked=true;        //event.srcElement�� �̺�Ʈ�� �߻��� ��ü�Դϴ�.

	 check= event.srcElement.name;
	  	 	 
	 if(check=="diff_check1"){
	   document.frm.diff_check1.value = "4";
	   document.frm.diff_check2.value = "";
	   document.frm.diff_check3.value = "";
	 }else if(check=="diff_check2"){
	   document.frm.diff_check1.value = "";
	   document.frm.diff_check2.value = "4";
	   document.frm.diff_check3.value = ""; 
	 }else{
	   document.frm.diff_check1.value = "";
	   document.frm.diff_check2.value = "";
	   document.frm.diff_check3.value = "4"; 
	 } 
  }   

//��ȸ��ư   
searchIFrameData = function(periodGB) {	

 	 if(periodGB == "W"){ 
 		periodGB = "fc_05040_deflectionAnalysisWeekly_tailer"; 		
 	}else if(periodGB == "D"){
 		periodGB = "fc_05030_deflectionAnalysisDaily_tailer"; 				
 	}else{
 		periodGB = "fc_05020_deflectionAnalysisMonthly_tailer"; 		
 	}  
 	
	// WAITING �̹��� �����ֱ�
	childViewWait();	   
        
	document.frm._moon_service.value = periodGB; 
	document.frm.action = "service.do";
	document.frm.target = "iframe01";
	document.frm.submit();  
}; 
   

// ��ȸ�� waiting �̹��� �����ֱ�
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

function goExcel( periodGB ){
	alert("���� ");
    
    /*
 	if(periodGB == "W"){ 
 		periodGB = "fc_05040_deflectionAnalysisWeekly_tailer"; 		
 	}else if(periodGB == "D"){
 		periodGB = "fc_05030_deflectionAnalysisDaily_tailer"; 				
 	}else{
 		periodGB = "fc_05020_deflectionAnalysisMonthly_tailer"; 		
 	}  
    */
    	
	// WAITING �̹��� �����ֱ�
	//childViewWait();	    
         
	periodGB = "fc_05020_deflectionAnalysisMonthly_excel"; 		

	document.frm._moon_service.value = periodGB; 
	document.frm.action = "service.do";
	//document.frm.target = "iframe01";
	document.frm.submit();  

}  