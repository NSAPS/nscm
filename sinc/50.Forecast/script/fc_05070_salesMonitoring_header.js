/**
 @path    /sinc/50.Forecast/script/fc_05070_salesMonitoring_header.js
 @Creator    ���ö  
 @version    1.0
 @date        2008-11-26 
 @description : 1������ �Ϸ�
*/ 

// �Ⱓ : ������ ���� --> ������ �������� ���� 
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
	 event.srcElement.checked=true;        //event.srcElement�� �̺�Ʈ�� �߻��� ��ü�Դϴ�.

	 check= event.srcElement.name;
	  	 	 
	 if(check=="periodGB1"){
	   //alert("��_Ŭ��");
	   document.frm.periodGB1.value = "M";
	   document.frm.periodGB2.value = "";
	   document.frm.periodGB3.value = "";
	   
	   document.frm.periodGB.value = "M"; //�Ⱓ����(��)

	   document.getElementById("changGubun1").style.display = "";
	   document.getElementById("changGubun2").style.display = "none";
  
	 }else if(check=="periodGB2"){
	 	//alert("��_Ŭ��");
	   document.frm.periodGB1.value = "";
	   document.frm.periodGB2.value = "W";
	   document.frm.periodGB3.value = ""; 

	   document.frm.periodGB.value = "W"; //�Ⱓ����(��)
	   
	   document.getElementById("changGubun1").style.display = "none";
	   document.getElementById("changGubun2").style.display = "";
	   
	 }else if(check=="periodGB3"){
	   //alert("��_Ŭ��");
	   document.frm.periodGB1.value = "";
	   document.frm.periodGB2.value = "";
	   document.frm.periodGB3.value = "D";  
 
 	   document.frm.periodGB.value = "D"; //�Ⱓ����(��)
 
	   document.getElementById("changGubun1").style.display = "none";
	   document.getElementById("changGubun2").style.display = "";

	 }  
  }   
  
//checkBox2 ǰ������   
function checkBoxGB1Change(obj){
	 
	 document.frm.item_GB1.checked=false;
	 document.frm.item_GB2.checked=false;
	 document.frm.item_GB3.checked=false;
	 document.frm.item_GB4.checked=false;
	 
	 event.srcElement.checked=true;        //event.srcElement�� �̺�Ʈ�� �߻��� ��ü�Դϴ�.

	 check= event.srcElement.name;
	  	 	 
	 if(check=="item_GB1"){
	   //alert("ǰ��(��)");
	   document.frm.item_GB1.value = "1";
	   document.frm.item_GB2.value = "";
	   document.frm.item_GB3.value = ""; 
	   document.frm.item_GB4.value = "";  
	  
	 }else if(check=="item_GB2"){
	   //alert("ǰ��(��)");
	   document.frm.item_GB1.value = "" ;
	   document.frm.item_GB2.value = "2";
	   document.frm.item_GB3.value = "" ; 
	   document.frm.item_GB4.value = "" ;  
	   
	 }else if(check=="item_GB3"){
	   //alert("ǰ��(��)");
	   document.frm.item_GB1.value = "" ;
	   document.frm.item_GB2.value = "";
	   document.frm.item_GB3.value = "3" ; 
	   document.frm.item_GB4.value = "" ;  

	 }else{ 
	   //alert("ǰ��");
	   document.frm.item_GB1.value = "" ;
	   document.frm.item_GB2.value = "" ;
	   document.frm.item_GB3.value = "" ; 
	   document.frm.item_GB4.value = "4" ;  
	 } 

}

//checkBox3 ��������   
function checkBoxGB2Change(obj){
	 
	 document.frm.org_GB1.checked=false;
	 document.frm.org_GB2.checked=false;
	 document.frm.org_GB3.checked=false;
	 
	 event.srcElement.checked=true;        //event.srcElement�� �̺�Ʈ�� �߻��� ��ü�Դϴ�.

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
