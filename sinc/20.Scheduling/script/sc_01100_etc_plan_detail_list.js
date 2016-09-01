 // 클릭한 라인 인덱스   
var clickedLineIdx = null; 
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
var popImgIdx = null;

// HTML Grid 의 X좌표 정의 
function etc_scrollX() {
	  
	document.all.topLine.scrollLeft = document.all.mainDisplay.scrollLeft;
	//alert("scrollleftsave" + scrollleftsave);
} 

// HTML Grid 의 Y좌표 정의  
function etc_scrollY() {   
	document.all.leftDisplay.scrollTop = document.all.mainDisplay.scrollTop;
}  

// 차주 생산필요량 변경전 값 저장
function saveValues(obj){
	
	oldProdQty = strToNum(obj.value); // 차주 생산필요량

}  
 
// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	 
	objTd.childNodes(0).style.display = "none";		
	objTd.childNodes(1).style.display = "block";

	if( objTd.childNodes(1).tagName.toUpperCase() == "SELECT") { //생산위치 경우                              
		objTd.childNodes(1).focus();
	}
	else if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "INPUT"){
		objTd.childNodes(1).childNodes(0).select();
	} 
	else {//if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "SELECT" ) {// 라인 셀인 경우	
			objTd.childNodes(1).childNodes(0).focus();
	}		     	
}  
 
// input box 를 View Mode 로 변환
function setViewMode( objBox ) {
 
	var strVal;
	var objTd;
	
	if(objBox.tagName.toUpperCase() == "INPUT"){//품목코드
		strVal = objBox.value;
		objTd = objBox.parentNode.parentNode;		
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		}
		objBox = objBox.parentNode;
	}	
	else if( objBox.tagName.toUpperCase() == "SELECT"){//공장
		strVal = objBox.options[objBox.selectedIndex].text;	
		objTd = objBox.parentNode;
	}
	else{ 
		strVal = objBox.childNodes(0).value + " <br>&nbsp;";		
		strVal += objBox.childNodes(0).options[objBox.childNodes(0).selectedIndex].text;
		objTd = objBox.parentNode;
	}	
		
	if( objBox.parentNode.align.toUpperCase() == "CENTER" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal;
	}
	else if( objBox.parentNode.align.toUpperCase() == "RIGHT" ) {
		objBox.parentNode.childNodes(0).innerHTML = strVal + "&nbsp;";
	}
	else {
		objBox.parentNode.childNodes(0).innerHTML = "&nbsp;" + strVal;
	}
	
	objTd.childNodes(0).style.display = "block";
	objTd.childNodes(1).style.display = "none";
} 

// TAB key 로 다음 항목 이동
function moveNextBox( objBox ) {
	
	var tableLen = left_tbody.rows.length;
	var objName = objBox.name;
	if(objName == "plant_id"){
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	else{
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	
	
	// TAB or ENTER
	if( event.keyCode == "9" || event.keyCode == "13" ) {
		// 공장 --> 원가
		if( objName == "plant_id" ) {
			if( left_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[0];				
			}
			else {
				objTdG = main_tbody.rows.cells[0];				
			}
		}
		// 원가 --> 전체라인
		else if( objName == "line_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[1];								
			}
			else {
				objTdG = main_tbody.rows.cells[1];
			}
		}
		// 전체라인 --> 운영라인
		else if( objName == "total_line" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// 운영라인 --> 중요라인
		else if( objName == "itype" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = main_tbody.rows.cells[3];
			}
		} 
		// 중요라인 --> 계획반영우선순위 
		else if( objName == "sch_plant_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else { 
				objTdG = main_tbody.rows.cells[4];
			}  
		}
		// 계획반영우선순위 --> 라인제약제외여부
		else if( objName == "etc_qty" ) {
			// 마지막줄 --> 첫줄로 이동
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = left_tbody.rows[0].cells[2];
				}
				else {
					objTdG = left_tbody.rows.cells[2];
				}
			}
			// 다음줄의 첫번째 input box 로 이동
			else { 
				if( main_tbody.rows[rowIdx] ) {
					objTdG = left_tbody.rows[rowIdx+1].cells[2];
				}
				else {
					objTdG = left_tbody.rows.cells[2];
				}
			}
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
} 
	 
// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 

	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#8de88d"; 
			main_tbody.rows[rowIdx].style.backgroundColor = "#8de88d";  
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#8de88d";  
			main_tbody.rows.style.backgroundColor = "#8de88d"; 
		}
	}	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	   
 	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		}
	} 
	else { 
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			main_tbody.rows.style.backgroundColor = "#ffffff";
		}
	}
 }   
  
//POPUP조회 
function goEtcMainDtl( obj ) {
	  
	var service_url = "service.do?_moon_service=sc_01100_etc_plan_popup&_moon_perpage=200&_moon_pagenumber=1";
	
    var tableLen = left_tbody.rows.length;
    var sdate = null;
    var c_version = null;
    var c_seq = null;
    var c_item_id = null;
    
    
    if(tableLen < 2){ 
    	
	    sdate       = document.frm.sdate.value;             //2. 선택한 구성품(item_id)
	    c_version   = document.frm.c_version.value;         //2. 선택한 구성품(item_id)
	    c_seq       = document.frm.c_seq.value;             //2. 선택한 구성품(item_id)
	    c_item_id   = document.frm.c_item_id.value;         //2. 선택한 구성품(item_id)    	    	
    }else if(tableLen >= 2){
	    var curRowIndex = obj.parentNode.rowIndex;                       //1. 현재의 rowIndex          
	    sdate       = document.frm.sdate.value;                      //2. 선택한 구성품(item_id)
	    c_version   = document.frm.c_version[curRowIndex].value;         //2. 선택한 구성품(item_id)
	    c_seq       = document.frm.c_seq[curRowIndex].value;             //2. 선택한 구성품(item_id)
	    c_item_id   = document.frm.c_item_id[curRowIndex].value;         //2. 선택한 구성품(item_id)    	
    }
 	 
	//alert("set_sdate=c_version=" + "[" + c_version + "]" + "c_seq" + "["+ c_seq + "]" + "c_item_id=="+ "[" + c_item_id + "]");
	 
	service_url += "&set_sdate=" + sdate + "&set_c_version=" + c_version + "&set_c_seq=" + c_seq + "&set_c_item_id=" + c_item_id;
		                          
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1020, height=450, top=0, left=0";
	var newWin = window.open(service_url, "ETC_PLAN_POPUP", pop_win_style); 
	newWin.focus(); 
	  
} 

function changeItem(p_item_id) {
   //alert("_p_item_id==>" + p_item_id);   
   document.frm.set_p_item_id.value = p_item_id;  
 }   

 // 저장 
function GoSave( service ) { 

    var tableLen = left_tbody.rows.length;
    
    if(tableLen == 0){
		alert("저장할 데이터가 없습니다. 재 조회하세요.");
		return; 
    }      
    
    if(tableLen < 2){ 

		if(document.frm.c_flag.value != "1"){
			if((document.frm.c_plantId_w1.value == null && document.frm.c_plantId_w1.value !=="")
			||(document.frm.c_plantId_w2.value == null && document.frm.c_plantId_w2.value !==""))
			{ 
				alert("생산위치를 선택하세요");
				return;
		    }	  
			if((document.frm.c_locId_w1.value == null && document.frm.c_locId_w1.value !=="")
			||(document.frm.c_locId_w2.value == null && document.frm.c_locId_w2.value !==""))
			{   
				alert("LOC 위치를 선택하세요");
				return; 
		    }	 
	    
		}     	
    }else if(tableLen >= 2){
	 	for( i = 0; i < tableLen; i++ ) {										
				if(document.frm.c_flag[i].value != "1"){
					if((document.frm.c_plantId_w1[i].value == null && document.frm.c_plantId_w1[i].value !=="")
					||(document.frm.c_plantId_w2[i].value == null && document.frm.c_plantId_w2[i].value !==""))
					{ 
						alert("생산위치를 선택하세요");
						return;
				    }	  
					if((document.frm.c_locId_w1[i].value == null && document.frm.c_locId_w1[i].value !=="")
					||(document.frm.c_locId_w2[i].value == null && document.frm.c_locId_w2[i].value !==""))
					{   
						alert("LOC 위치를 선택하세요");
						return;
				    }	 
				    
				} 
		}     	
    }
 
	// service_id 저장   
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do"; 
	document.frm.target = "iframe01";
	ViewWaitForSave();
	document.frm.submit();    
 } 
 
      
//생산계획 수량 조정시 자동 sum (차주)      
function calculate(obj){
	
	var strVal;
	var objTd; 
     	                           	   	   
	if(!checkNum(obj,'BLANK_INT')) return; // 숫자 체크
	
	if(obj.tagName.toUpperCase() == "INPUT"){     //if [1] start 
    
	    strVal = obj.value;
		objTd  = obj.parentNode;	
            
        //생산계획계(W0)
        var w1_sum = 0;
  	    var tableLen = left_tbody.rows.length;
        
        if(strVal != "" && strVal != null){       //if [1-1] start
        
	        if(tableLen < 2){                     //if [1-1-1] start
	        	
		        w1_sum = Number(delComma(document.frm.c_w1_MondayQ.value));           //W1 월
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_TuedayQ.value));  //W1 화
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_WeddayQ.value));  //W1 수
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_ThudayQ.value));  //W1 목
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_FridayQ.value));  //W1 금
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_SatdayQ.value));  //W1 토
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_SundayQ.value));  //W1 일
		                
		        //생산계획계_W1       
		        divC_sch_plan_w1Q.innerHTML = w1_sum;
	         	document.frm.c_sch_plan_w1Q.value = w1_sum;
		       
		        //생산계획계_W2      
			 	var c_sch_plan_w2Q = Number(delComma(document.frm.c_sch_plan_w2Q.value));
		
		        //사용계획_W1
		        var c_do_plan_w1Q = Number(delComma(document.frm.c_do_plan_w1Q.value));
		
		        //사용계획 W2
		        var c_do_plan_w2Q = Number(delComma(document.frm.c_do_plan_w2Q.value));
			 		 	 
		        //예상재고_W0
		        var c_estInv_w0Q = Number(delComma(document.frm.c_estInv_w0Q.value));
		        
			 	//예상재고_W1 
			 	divC_estInv_w1Q.innerHTML = c_estInv_w0Q + w1_sum - c_do_plan_w1Q; 
	         	document.frm.c_estInv_w1Q.value = c_estInv_w0Q + w1_sum - c_do_plan_w1Q;
		
			    var c_estInv_w1Q = Number(delComma(document.frm.c_estInv_w1Q.value)); 
			     
			 	//예상재고_W2  
			 	divC_estInv_w2Q.innerHTML = c_estInv_w1Q + c_sch_plan_w2Q - c_do_plan_w2Q; 
	         	document.frm.c_estInv_w2Q.value = c_estInv_w1Q + c_sch_plan_w2Q - c_do_plan_w2Q;
				           
		 		/*** 2. 생산필요량 ***/
				var c_do_plan_w2Q  = Number(delComma(document.frm.c_do_plan_w2Q.value));   //사용계획_w2   
				var c_estInv_w1Q_pa = Number(delComma(document.frm.c_estInv_w1Q.value));   //예상재고_w1   
					
				var c_pa_plan_w2 =  c_do_plan_w2Q - c_estInv_w1Q_pa;			
				divC_pa_plan_w2.innerHTML = c_pa_plan_w2; 
	         	document.frm.c_pa_plan_w2.value = c_pa_plan_w2;
	        } //if [1-1] end
	        else if(tableLen >= 2){ 
		        //1. 현재의 rowIndex
		        var curRowIndex = obj.parentNode.parentNode.rowIndex; 
		                 
		        w1_sum = Number(delComma(document.frm.c_w1_MondayQ[curRowIndex].value));           //W1 월
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_TuedayQ[curRowIndex].value));  //W1 화
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_WeddayQ[curRowIndex].value));  //W1 수
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_ThudayQ[curRowIndex].value));  //W1 목
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_FridayQ[curRowIndex].value));  //W1 금
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_SatdayQ[curRowIndex].value));  //W1 토
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_SundayQ[curRowIndex].value));  //W1 일
		                
		        //생산계획계_W1       
		        divC_sch_plan_w1Q[curRowIndex].innerHTML = w1_sum;
	         	document.frm.c_sch_plan_w1Q[curRowIndex].value = w1_sum;
	
		        //생산계획계_W2      
			 	var c_sch_plan_w2Q = Number(delComma(document.frm.c_sch_plan_w2Q[curRowIndex].value));
		
		        //사용계획_W1	
		        var c_do_plan_w1Q = Number(delComma(document.frm.c_do_plan_w1Q[curRowIndex].value));
		        
		        //사용계획 W2
		        var c_do_plan_w2Q = Number(delComma(document.frm.c_do_plan_w2Q[curRowIndex].value));
			 		 	 
		        //예상재고_W0
		        var c_estInv_w0Q = Number(delComma(document.frm.c_estInv_w0Q[curRowIndex].value));
		        
			    var c_estInv_w2Q = Number(delComma(document.frm.c_estInv_w1Q[curRowIndex].value)); 
			     			           
		 		/*** 2. 생산필요량 ***/
				var c_do_plan_w2Q  = Number(delComma(document.frm.c_do_plan_w2Q[curRowIndex].value));   //사용계획_w2   
				var c_estInv_w1Q_pa = Number(delComma(document.frm.c_estInv_w1Q[curRowIndex].value));   //예상재고_w1   
					
				var c_pa_plan_w2 =  c_do_plan_w2Q - c_estInv_w1Q_pa;			
				divC_pa_plan_w2[curRowIndex].innerHTML = c_pa_plan_w2; 
	         	document.frm.c_pa_plan_w2[curRowIndex].value = c_pa_plan_w2;
	
			 	//예상재고_W1 
			 	divC_estInv_w1Q[curRowIndex].innerHTML = c_estInv_w0Q + w1_sum - c_do_plan_w1Q; 
	         	document.frm.c_estInv_w1Q[curRowIndex].value = c_estInv_w0Q + w1_sum - c_do_plan_w1Q;
		        
		        //예상재고_W1
		        var c_estInv_w1Q = Number(delComma(document.frm.c_estInv_w1Q[curRowIndex].value));
	 	         
			 	//예상재고_W2 
			 	divC_estInv_w2Q[curRowIndex].innerHTML = c_estInv_w1Q + c_sch_plan_w2Q - c_do_plan_w2Q; 
			    document.frm.c_estInv_w2Q[curRowIndex].value = c_estInv_w1Q + c_sch_plan_w2Q - c_do_plan_w2Q;  
	
	        }//else if [1-1-2] end
        }else{
        	obj.value = "0"; 
        }//if [1-1] end
 	}//if [1] end   	    
} 
  
//생산계획 수량 조정시 자동 sum (차차주)
function calculate2(obj){
	var strVal;
	var objTd; 
     	                           	   	   
	if(!checkNum(obj,'BLANK_INT')) return; // 숫자 체크
	
	if(obj.tagName.toUpperCase() == "INPUT"){ //유통가공품수량 
		strVal = obj.value;
		objTd  = obj.parentNode;	
		           
        //생산계획계(W2)
        var w2_sum = 0;
  	    var tableLen = left_tbody.rows.length;

        if(strVal != "" && strVal != null){       //if [1-1] start
	
	        if(tableLen < 2){
	        	
		        //2. 
		        w2_sum = Number(delComma(document.frm.c_w2_MondayQ.value));           //W2 월
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_TuedayQ.value));  //W2 화
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_WeddayQ.value));  //W2 수
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_ThudayQ.value));  //W2 목
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_FridayQ.value));  //W2 금
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_SatdayQ.value));  //W2 토
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_SundayQ.value));  //W2 일
		        
		        //사용계획 W2
		        var c_do_plan_w2Q = Number(delComma(document.frm.c_do_plan_w2Q.value));
		
		        //생산계획계_W2        
		        divC_sch_plan_w2Q.innerHTML = w2_sum;
	         	document.frm.c_sch_plan_w1Q.value = w2_sum;		
		
		        //예상재고_W1 
		        var c_estInv_w1Q = Number(delComma(document.frm.c_estInv_w1Q.value));
		        
			 	//예상재고_W2
			 	divC_estInv_w2Q[curRowIndex].innerHTML = c_estInv_w1Q + w2_sum - c_do_plan_w2Q;
			    document.frm.c_estInv_w2Q.value = c_estInv_w1Q + w2_sum - c_do_plan_w2Q;  
	   
			}else if(tableLen >= 2){
		        //1. 현재의 rowIndex 
		        var curRowIndex = obj.parentNode.parentNode.rowIndex;          
		        //2. 
		        w2_sum = Number(delComma(document.frm.c_w2_MondayQ[curRowIndex].value));           //W2 월
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_TuedayQ[curRowIndex].value));  //W2 화
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_WeddayQ[curRowIndex].value));  //W2 수
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_ThudayQ[curRowIndex].value));  //W2 목
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_FridayQ[curRowIndex].value));  //W2 금
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_SatdayQ[curRowIndex].value));  //W2 토
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_SundayQ[curRowIndex].value));  //W2 일
		        
		        //사용계획 W2
		        var c_do_plan_w2Q = Number(delComma(document.frm.c_do_plan_w2Q[curRowIndex].value));
		
		        //생산계획계(W2)        
		        divC_sch_plan_w2Q[curRowIndex].innerHTML = w2_sum;
	         	document.frm.c_sch_plan_w2Q[curRowIndex].value = w2_sum;		
		
		        //예상재고_W1 
		        var c_estInv_w1Q = Number(delComma(document.frm.c_estInv_w1Q[curRowIndex].value));
			 	
			 	//예상재고_W2		 	 
			 	divC_estInv_w2Q[curRowIndex].innerHTML = c_estInv_w1Q + w2_sum - c_do_plan_w2Q;
			    document.frm.c_estInv_w2Q[curRowIndex].value = c_estInv_w1Q + w2_sum - c_do_plan_w2Q;     			
			}//if [1-1-1] end                 
	 	}//if [1-1] end 
	}else{
        	obj.value = "0"; 		
	}//if [1] end      	       
}      
 
// 조회시 waiting 이미지 보여주기
function ViewWaitForSave() {  
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {  
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else { 
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}   
	} 
	 
} 

// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRow( objBtn ) {

	var insertRowIndex = 0;
	if( objBtn.parentNode ) {
		insertRowIndex = objBtn.parentNode.rowIndex;
		insertRowIndex = insertRowIndex + 1;
		var oRowLeft = left_tbody.insertRow(insertRowIndex);
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	else {
		//alert("addRow else");
		var oRowLeft = left_tbody.insertRow();
		var oRowMain = main_tbody.insertRow();
	}
	
	var c_item_id = document.frm.c_item_id[insertRowIndex-1].value;
	var p_item_id = document.frm.c_p_item_id[insertRowIndex-1].value;
	var c_item_name = document.frm.c_item_name[insertRowIndex-1].value;
	var c_item_spec = document.frm.c_item_spec[insertRowIndex-1].value;
    //-----------------------------------------------------------------
	var c_base_stock = document.frm.c_base_stock[insertRowIndex-1].value;
	var c_sch_plan_w0Q = document.frm.c_sch_plan_w0Q[insertRowIndex-1].value;
	var c_do_plan_w0Q = document.frm.c_do_plan_w0Q[insertRowIndex-1].value;
	var c_estInv_w0Q = document.frm.c_estInv_w0Q[insertRowIndex-1].value;
    //-----------------------------------------------------------------
	var c_pa_plan_w1 = document.frm.c_pa_plan_w1[insertRowIndex-1].value;
	var c_sch_plan_w1Q = document.frm.c_sch_plan_w1Q[insertRowIndex-1].value;
    	       
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout  = function() { bgOut(this); }; 
	oRowLeft.height = 30;  
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout  = function() { bgOut(this); }; 
	oRowMain.height = 30; 
	
   
   	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // c_item_id		
	var oCell2 = oRowLeft.insertCell(); // p_item_id	
	var oCell3 = oRowLeft.insertCell(); // c_item_name	
    var oCell4 = oRowLeft.insertCell(); // c_item_spec	
    //------------------------------------------------
	var oCell5 = oRowLeft.insertCell(); // c_base_stock		
	var oCell6 = oRowLeft.insertCell(); // c_sch_plan_w0Q	
	var oCell7 = oRowLeft.insertCell(); // c_do_plan_w0Q	
    var oCell8 = oRowLeft.insertCell(); // c_estInv_w0Q	
    //------------------------------------------------
	var oCell9 = oRowLeft.insertCell(); // c_pa_plan_w1		
	var oCell10 = oRowLeft.insertCell(); // c_sch_plan_w1Q	

	oCell0.align = "center"; oCell0.width = "30px";   // 번호
	oCell1.align = "center"; oCell1.width = "70px";   // c_item_id		
	oCell2.align = "center"; oCell2.width = "70px";   // p_item_id	 
	oCell3.align = "center"; oCell3.width = "70px";   // c_item_name	 
	oCell4.align = "center"; oCell4.width = "70px";   // c_item_spec	 

	oCell5.align = "center"; oCell5.width = "70px";   // c_base_stock		
	oCell6.align = "center"; oCell6.width = "70px";   // c_sch_plan_w0Q	 
	oCell7.align = "center"; oCell7.width = "70px";   // c_do_plan_w0Q	 
	oCell8.align = "center"; oCell8.width = "70px";   // c_estInv_w0Q	 
	oCell9.align = "center"; oCell9.width = "70px";   // c_pa_plan_w1		
	oCell10.align = "center"; oCell10.width = "70px"; // c_sch_plan_w1Q	
	    				  
	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	oCell0.onclick = function() { clickLine(this); };
	
	// c_item_id
	oCell1.innerHTML = "<a id=\"divC_c_item_id\"> " + c_item_id + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_item_id\" value=\" " 
	                   + c_item_id 	+ "\" >";
	
	// c_item_id
	oCell2.innerHTML = "<a id=\"divC_p_item_id\"> " + p_item_id + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_p_item_id\" value=\" " 
	                   + p_item_id 	+ "\" >";

	// c_item_name
	oCell3.innerHTML = "<a id=\"divC_item_name\"> " + c_item_name + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_item_name\" value=\" " 
	                   + c_item_name 	+ "\" >";
	// c_item_spec
	oCell4.innerHTML = "<a id=\"divC_item_spec\"> " + c_item_spec + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_item_spec\" value=\" " 
	                   + c_item_spec 	+ "\" >";
    //--------------------------------------------------------------------------
	// c_base_stock
	oCell5.innerHTML = "<a id=\"divC_base_stock\"> " + c_base_stock + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_base_stock\" value=\" " 
	                   + c_base_stock 	+ "\" >";
	// c_sch_plan_w0Q
	oCell6.innerHTML = "<a id=\"divC_sch_plan_w0Q\"> " + c_sch_plan_w0Q + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_sch_plan_w0Q\" value=\" " 
	                   + c_sch_plan_w0Q 	+ "\" >";
	// c_do_plan_w0Q
	oCell7.innerHTML = "<a id=\"divC_do_plan_w0Q\"> " + c_do_plan_w0Q + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_do_plan_w0Q\" value=\" " 
	                   + c_do_plan_w0Q 	+ "\" >";
	// c_estInv_w0Q
	oCell8.innerHTML = "<a id=\"divC_estInv_w0Q\"> " + c_estInv_w0Q + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_estInv_w0Q\" value=\" " 
	                   + c_estInv_w0Q 	+ "\" >";
	// c_pa_plan_w1
	oCell9.innerHTML = "<a id=\"divC_pa_plan_w1\"> " + c_pa_plan_w1 + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_pa_plan_w1\" value=\" " 
	                   + c_pa_plan_w1 	+ "\" ><input type=\"hidden\" name=\"p_pa_plan_w1\" value=\" " 
	                   + "\" >";
	// c_sch_plan_w1Q
	oCell10.innerHTML = "<a id=\"divC_sch_plan_w1Q\"> " + c_sch_plan_w1Q + "</a>" 
	                   + "<input type=\"hidden\" name=\"c_sch_plan_w1Q\" value=\" " 
	                   + c_sch_plan_w1Q 	+ "\" >";
         	
}


 //생산위치를 동적으로 알려줌.
 function doChangeGridPlant(obj){
   	   	 
   	var objName = obj.name;   	
   	   	 
 	//html의  각<td>의 rowIndex   
	var rowIdx   = obj.parentNode.parentNode.parentNode.rowIndex;	      	
	var tableLen = left_tbody.rows.length;
	var c_item_id = null;
	var c_plantId_w = null;
	    
	if(rowIdx == 0 && tableLen < 2){  
		if(document.frm.c_item_id[rowIdx]){
			c_item_id = document.frm.c_item_id.options[document.frm.c_item_id.selectedIndex].value;

			if(objName == "c_plantId_w2")
				c_plantId_w = document.frm.c_plantId_w2.options[document.frm.c_plantId_w2.selectedIndex].value;
			else	
				c_plantId_w = document.frm.c_plantId_w1.options[document.frm.c_plantId_w1.selectedIndex].value;
		}
		else{					
			c_item_id = document.frm.c_item_id.value;
			
			if(objName == "c_plantId_w2")
				c_plantId_w = document.frm.c_plantId_w2.value;
			else
				c_plantId_w = document.frm.c_plantId_w1.value;	
		}
	}	 
	else if(document.frm.c_item_id[rowIdx]){
		   c_item_id = document.frm.c_item_id[rowIdx].value;		   
		   
		   if(objName == "c_plantId_w2")
		   		c_plantId_w = document.frm.c_plantId_w2[rowIdx].value;		   
		   else
		   		c_plantId_w = document.frm.c_plantId_w1[rowIdx].value;		   		   
	}
	else{
		   c_item_id = document.frm.c_item_id.value;
		   
		   if(objName == "c_plantId_w2")
		   		c_plantId_w = document.frm.c_plantId_w2.value;
		   else
		  		c_plantId_w = document.frm.c_plantId_w1.value;		   
	}
          
	//생산위치      
	scheduling.getProcInfo2("curItemId", c_item_id, "curPlantId" , c_plantId_w,  "grid_plant_list", { 
		callback:function(arrList){
					 
			// 일치하는 결과 없음
			if( arrList.length == 0 ) { 
				alert("기준정보(ITEM_CAPA)에 정의된 생산공장이 아닙니다.");
			}
			else { 
				var plant_id = obj.value;  
				
				if(objName == "c_plantId_w2"){  
					var divC_plantId_w2 = "<select name=\"c_plantId_w2\" style=\"width:100%; padding-left:5px \" ";
					    divC_plantId_w2 += "onFocusOut=\"doChangeGridPlant(this); \" >";
					
					for( i = 0; i < arrList.length; i++){  			 		 
						divC_plantId_w2 += "<option value=\"" + arrList[i][0] + "\" ";
							if( arrList[i][0] == plant_id)  
								divC_plantId_w2 += " selected ";
						divC_plantId_w2 += ">" + arrList[i][1] + "</option>";												
					}      
					divC_plantId_w2 += "</select>";
					    
					if(divC_plantId_w2Sel[rowIdx])
						divC_plantId_w2Sel[rowIdx].innerHTML = divC_plantId_w2;
					else
						divC_plantId_w2Sel.innerHTML = divC_plantId_w2;
				}else{ 
					var divC_plantId_w1 = "<select name=\"c_plantId_w1\" style=\"width:100%; padding-left:5px \" ";
					    divC_plantId_w1 += "onFocusOut=\"doChangeGridPlant(this); \" >";
					
					for( i = 0; i < arrList.length; i++){  			 		 
						divC_plantId_w1 += "<option value=\"" + arrList[i][0] + "\" ";
							if( arrList[i][0] == plant_id)  
								divC_plantId_w1 += " selected ";
						divC_plantId_w1 += ">" + arrList[i][1] + "</option>";												
					}      
					divC_plantId_w1 += "</select>";
					    
					if(divC_plantId_w2Sel[rowIdx])
						divC_plantId_w2Sel[rowIdx].innerHTML = divC_plantId_w1;
					else
						divC_plantId_w2Sel.innerHTML = divC_plantId_w1;					
				}
			}	   
		}  
	});	  	   
} 