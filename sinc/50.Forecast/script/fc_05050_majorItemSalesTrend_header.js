/**
 @path    /sinc/50.Forecast/script/fc_05050_majorItemSalesTrend_header.js
 @Creator    김규철 
 @version    1.0
 @date        2008-11-26 
 @description : 1차개발 완료
*/ 

//selecBox
function changeSelectBox(obj){
		
	if(obj.value == 30){
	 document.getElementById("sales_org").disabled = false;		
	}else{
	 document.getElementById("sales_org").disabled = true;		
	}  
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
  
//checkRadio (거래처/본부 구분)   
function changeCheckRadio(obj){
	 
	 document.frm.checked_site1.checked=false;
	 document.frm.checked_site2.checked=false;
  
	 event.srcElement.checked=true;        //event.srcElement는 이벤트가 발생한 객체입니다.
	 check= event.srcElement.name;
	  	 
	 if(check=="checked_site1"){
	   document.getElementById("changGubunSite1").style.display = "";
	   document.getElementById("changGubunSite2").style.display = "none";

	   document.frm.checked_site1.value   = "Y";
	   document.frm.checked_site2.value   = "";
	    		
       document.frm.selected_gr_type1.value     = "";   //본부를 초기화
  
 	     
	 }else if(check=="checked_site2"){
	   document.getElementById("changGubunSite1").style.display = "none";
	   document.getElementById("changGubunSite2").style.display = "";	    

	   document.frm.checked_site1.value   = "";
	   document.frm.checked_site2.value   = "Y";
      
       document.frm.customer_id.value     = "";   //거래처id를 초기화
       document.frm.customer_name.value     = ""; //거래처명을 초기화
       
	 }   
  }     
  // 기간 : 시작일 변경 --> 종료일 동적으로 변경
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

// N개 코드 검색 및 선택  POPUP
function fc_openCodeSearchMultiPop( id_input, name_input, w_size, h_size ) {
 
	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(id_input).value;
	
	// popup 창의 넓이, 높이를 지정하지 않은 경우, default 사이즈 설정
	if( !(w_size) ) {
		var w_size = 600; 
		var h_size = 600; 
	}   
	      
	var service_url = "service.do?_moon_service=fc_item_mCodePopup_header&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&code_input=" + code_input + "&id_input=" + id_input + "&name_input=" + name_input; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width="
						+ w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus();
	
}
 
//품목을 멀티로 선택가능한 조회
function return_Value(valuelist, textlist) { 
 
 var objForm = document.frm;    
 
 var itemId_arr = valuelist.split(",");
 var itemNm_arr = textlist.split(",");
 
 var firstItemId = ""; 
 var firstItemNm = "";
 var itemId      = "";
 
 var itemIDSize = itemId_arr.length;
   
	 if(itemIDSize == 1){
	 	 firstItemNm = itemNm_arr[0]; 	 
		 firstItemId = itemId_arr[0]; 	
	 }else{
	 	 firstItemNm = itemNm_arr[0] + "..."; 	 
		 firstItemId = itemId_arr[0] + "...";
	 }  
 
	 if(itemIDSize == 1){
	 	itemId = firstItemId; 	
	 }
  
	 if(itemIDSize > 1){
	
		 for (i = 0; i < itemIDSize; ++i)
		    {			 	   
		  	 if(i < itemIDSize){
		           
		           if(i == 0){	
		           	itemId = "'" + itemId_arr[0] + "',"; 		   
		           } 
		           
		           if(i > 0)
		           {  
		           	itemId = itemId + "'" + itemId_arr[i] + "'"; 
		           	
			           	if(i < itemIDSize-1){
							itemId = itemId + ","; 
			           	}    
		           	} 
		      }					   
		   }//for    
	}//if end  
            
    //선택된 item_id가 1EA인 경우
    if(itemIDSize == 1){ 
    	objForm.item_id.value       = firstItemId;   
	    objForm.item_name.value     = firstItemNm;  
	    objForm.item_query.value    = "";  
    }else{
    	objForm.item_id.value       = firstItemId;   
	    objForm.item_name.value     = firstItemNm;      	     	
	    objForm.item_query.value    = itemId;  
    }     
   
}//fun end   
  

//거래처 및 본부조회 팝업 
openPopupWindow = function(popup_type){
	// popup 창의 input box 표시 data : search code
	
	var customer_id = document.frm.customer_id.value;
	
	var w_size = 450;
	var h_size = 500; 
  
	var service_url = "service.do?_moon_service=fc_customer_codePopup_header&popup_type="+popup_type+"&customer_id="+customer_id+"&_moon_perpage=100&_moon_pagenumber=1";
	var newWin = window.open(service_url, "Code_Search", "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0");
	newWin.focus();
}


searchIFrameData = function(periodGB) {	

 	if(periodGB == "D"){ 
 		periodGB = "fc_05060_majorItemSalesTrend_tailer"; 		
 	}else{
 		periodGB = "fc_05050_majorItemSalesTrend_tailer"; 		
 	}
 	 
	// WAITING 이미지 보여주기
	childViewWait();	 
	 	  	 
	document.frm._moon_service.value = periodGB; 
	document.frm.action = "service.do";
	document.frm.target = "iframe01";
	document.frm.submit();
};


function getMartNm(obj) {
	var martId = obj.value;
	var martName = null; 
	  
	for (var j = 0; j < obj.options.length; j++) {
		if ( obj.options[j].selected == true) {
		  martName = obj.options[j].text;
		}
	}	 
	   
	document.frm.martName.value = martName;		
}	

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
