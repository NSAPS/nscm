
// Ŭ���� ���� �ε���   
var clickedLineIdx = null; 
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var popImgIdx = null;

// version - seq �и�
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
}

//��ȸ
searchIFrameData = function(flag) {	

    var version   = document.frm.version.value;  
    var seq   = document.frm.seq.value;   
      
	if(version == "" || seq == ""){
	    alert("��ȹ������ �����ϼ���.");
	    return;
	}         
     
	//1. ���밡�� ����ǰ   
	if(flag == "etc_dtl"){		  
		// WAITING �̹��� �����ֱ�
		childViewWait();
		
		document.frm._moon_service.value = "sc_01100_etc_plan_detail_list"; 
		document.frm.action = "service.do";
		document.frm.target = "iframe01";
		document.frm.submit(); 			 
	//2. ���밡��ǰ    	
	}else{  
		
		// WAITING �̹��� �����ֱ�
		parentViewWait();
		
		document.frm._moon_service.value = "sc_01100_etc_plan_list"; 
		document.frm.action = "service.do";
		document.frm.target = "_self";
		document.frm.submit(); 		
	}  
};
  
//��ǰ��(click)�� ��ǰ�� ����  
function sortByIframe(obj){  

/*
    var curRowIndex      = obj.parentNode.rowIndex;                         //1. ������ rowIndex         
    var p_item_id       = document.frm.p_item_id[curRowIndex].value;        //2. ������ ����ǰ(item_id)
      
    var p_sch_w0Q       = document.frm.p_sch_w0Q[curRowIndex].value;        //6. W0 �����ʿ䷮     
    var p_sch_plan_w1Q  = document.frm.p_sch_plan_w1Q[curRowIndex].value;   //7. W1 �����ȹ�� 
    var p_sch_plan_w2Q  = document.frm.p_sch_plan_w2Q[curRowIndex].value;   //8. W2 �����ȹ�� 
    
    var p_w1_locId      = document.frm.p_w1_locId[curRowIndex].value;       //9. W1 ������ġ
    var p_w2_locId      = document.frm.p_w2_locId[curRowIndex].value;       //10.W2 ������ġ
     
    var p_w1_MondayQ    = document.frm.p_w1_MondayQ[curRowIndex].value;     //11.W1 ��qty
    var p_w1_TuedayQ    = document.frm.p_w1_TuedayQ[curRowIndex].value;     //12.W1 ȭqty
    var p_w1_WeddayQ    = document.frm.p_w1_WeddayQ[curRowIndex].value;     //13.W1 ��qty
    var p_w1_ThudayQ    = document.frm.p_w1_ThudayQ[curRowIndex].value;     //14.W1 ��qty
    var p_w1_FridayQ    = document.frm.p_w1_FridayQ[curRowIndex].value;     //15.W1 ��qty
    var p_w1_SatdayQ    = document.frm.p_w1_SatdayQ[curRowIndex].value;     //16.W1 ��qty
    var p_w1_SundayQ    = document.frm.p_w1_SundayQ[curRowIndex].value;     //17.W1 ��qty
    
    var p_w2_MondayQ    = document.frm.p_w2_MondayQ[curRowIndex].value;     //18.W2 ��qty
    var p_w2_TuedayQ    = document.frm.p_w2_TuedayQ[curRowIndex].value;     //19.W2 ȭqty
    var p_w2_WeddayQ    = document.frm.p_w2_WeddayQ[curRowIndex].value;     //20.W2 ��qty
    var p_w2_ThudayQ    = document.frm.p_w2_ThudayQ[curRowIndex].value;     //21.W2 ��qty
    var p_w2_FridayQ    = document.frm.p_w2_FridayQ[curRowIndex].value;     //22.W2 ��qty
    var p_w2_SatdayQ    = document.frm.p_w2_SatdayQ[curRowIndex].value;     //23.W2 ��qty
    var p_w2_SundayQ    = document.frm.p_w2_SundayQ[curRowIndex].value;     //24.W2 ��qty
        
    var param       = "set_p_item_id=" + p_item_id + "&set_p_sch_w0Q=" + p_sch_w0Q + "&set_p_sch_plan_w1Q=" + p_sch_plan_w1Q + "&set_p_sch_plan_w2Q="  + p_sch_plan_w2Q                        
                    + "&set_p_w1_locId=" + p_w1_locId + "&set_p_w2_locId=" + p_w2_locId 
                    + "&set_p_w1_MondayQ=" + p_w1_MondayQ + "&set_p_w1_TuedayQ=" + p_w1_TuedayQ + "&set_p_w1_WeddayQ=" + p_w1_WeddayQ + "&set_p_w1_ThudayQ=" + p_w1_ThudayQ 
                    + "&set_p_w1_FridayQ=" + p_w1_FridayQ + "&set_p_w1_SatdayQ=" + p_w1_SatdayQ + "&set_p_w1_SundayQ=" + p_w1_SundayQ 
                    + "&set_p_w2_MondayQ=" + p_w2_MondayQ + "&set_p_w2_TuedayQ=" + p_w2_TuedayQ + "&set_p_w2_WeddayQ=" + p_w2_WeddayQ + "&set_p_w1_ThudayQ=" + p_w1_ThudayQ 
                    + "&set_p_w2_FridayQ=" + p_w2_FridayQ + "&set_p_w2_SatdayQ=" + p_w2_SatdayQ + "&set_p_w2_SundayQ=" + p_w2_SundayQ;
    
	//iframe01.changeItem(p_item_id);       
		               	                                           
	document.frm._moon_service.value = "sc_01100_etc_plan_detail_list";
	document.frm.action = "service.do" + "?" + param;    
	document.frm.target = "iframe01"; 
	document.frm.submit();  
    */
          
	//1. �ӽ����幮���� �ֽ�. (iframe�� ������ ���� �Ҵ� 
	// iframe01.document.frm._p_item_id.value = _p_item_id;   
    //2. �ӽ����幮���� �־�. (iframe�� script fun�� ȣ��  
    //iframe01.changeItem(_p_item_id);      
}

//��ǰ�� Ŭ���� ���� ��ǰ�� �� ����Ʈ �����ֱ�
function goEtcDtl(obj){   

    var tableLen = left_tbody.rows.length;
    var checked_etc   = document.frm.checked_etc.value;         //2. ������ ����ǰ(item_id)

	if(checked_etc == "etc_dtl"){     
    	alert("���� ���밡��ǰ��  ��ȸ�ϼ���.");
    	return;   
	}
	
	var p_item_id = null;
	var p_sch_plan_w0Q = null;
	var p_sch_w1Q = null;
	var p_sch_plan_w1Q = null;
	var p_sch_w2Q = null;
	var p_sch_plan_w2Q = null;
	 	    
	if(tableLen < 2){  
	     p_item_id        = document.frm.p_item_id.value;         //3. ������ ����ǰ(item_id)
	     p_sch_plan_w0Q   = document.frm.p_sch_plan_w0Q.value;    //4. ������ ����ǰ(�����ȹ��_W0)
	     p_sch_w1Q        = document.frm.p_sch_w1Q.value;         //5. ������ ����ǰ(�����ʿ䷮_W1)
	     p_sch_plan_w1Q   = document.frm.p_sch_plan_w1Q.value;    //6. ������ ����ǰ(�����ȹ��_W1)
	     p_sch_w2Q        = document.frm.p_sch_w2Q.value;         //7. ������ ����ǰ(�����ʿ䷮_W2)
	     p_sch_plan_w2Q   = document.frm.p_sch_plan_w2Q.value;    //8. ������ ����ǰ(�����ȹ��_W2)
		
	}else if(tableLen >= 2){
	    var curRowIndex = obj.parentNode.rowIndex;              //1. ������ rowIndex         
	     p_item_id        = document.frm.p_item_id[curRowIndex].value;         //3. ������ ����ǰ(item_id)
	     p_sch_plan_w0Q   = document.frm.p_sch_plan_w0Q[curRowIndex].value;    //4. ������ ����ǰ(�����ȹ��_W0)
	     p_sch_w1Q        = document.frm.p_sch_w1Q[curRowIndex].value;         //5. ������ ����ǰ(�����ʿ䷮_W1)
	     p_sch_plan_w1Q   = document.frm.p_sch_plan_w1Q[curRowIndex].value;    //6. ������ ����ǰ(�����ȹ��_W1)
	     p_sch_w2Q        = document.frm.p_sch_w2Q[curRowIndex].value;         //7. ������ ����ǰ(�����ʿ䷮_W2)
	     p_sch_plan_w2Q   = document.frm.p_sch_plan_w2Q[curRowIndex].value;    //8. ������ ����ǰ(�����ȹ��_W2)
	}
    
    var param       = "set_p_item_id="       + p_item_id
                    + "&set_p_sch_plan_w0Q=" + p_sch_plan_w0Q
                    + "&set_p_sch_w1Q="      + p_sch_w1Q
                    + "&set_p_sch_plan_w1Q=" + p_sch_plan_w1Q
                    + "&set_p_sch_w2Q="      + p_sch_w2Q
                    + "&set_p_sch_plan_w2Q=" + p_sch_plan_w2Q;  
                     
	document.frm._moon_service.value = "sc_01100_etc_plan_detail02_list";
	document.frm.action = "service.do" + "?" + param;     
	document.frm.target = "iframe01"; 
	document.frm.submit();    	   
 } 

// input box �� Edit Mode �� ��ȯ
function setEditMode( objTd ) {
	  	  
	objTd.childNodes(0).style.display = "none";		
	objTd.childNodes(1).style.display = "block";

	if( objTd.childNodes(1).tagName.toUpperCase() == "SELECT") { //������ġ ���                              
		objTd.childNodes(1).focus();
	}
	else if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "INPUT"){
		objTd.childNodes(1).childNodes(0).select();
	} 
	else {//if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "SELECT" ) {// ���� ���� ���	
	
		objTd.childNodes(1).childNodes(0).focus();
  	}  		     	
}  
  
// input box �� View Mode �� ��ȯ
function setViewMode( objBox ) {
 
	var strVal;
	var objTd;
	
	if(objBox.tagName.toUpperCase() == "INPUT"){//ǰ���ڵ�
		strVal = objBox.value;
		objTd = objBox.parentNode.parentNode;		
		if( objBox.parentNode.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		}
		objBox = objBox.parentNode;
	}	
	else if( objBox.tagName.toUpperCase() == "SELECT"){//����
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

// ���� �����ʿ䷮ ������ ��
var oldProdQty;

// ���� �����ʿ䷮ ������ �� ����
function saveValues(obj){
	
	oldProdQty = strToNum(obj.value); // ���� �����ʿ䷮

}  

//���밡��ǰ ���� ������ �ڵ����  
function calculate(obj){

	var strVal;
	var objTd; 
     	                           	   	    
	if(!checkNum(obj,'BLANK_INT')) return; // ���� üũ
	
	if(obj.tagName.toUpperCase() == "INPUT"){ //���밡��ǰ���� 
		strVal = obj.value;
		objTd  = obj.parentNode;	
		   
		if( obj.parentNode.parentNode.rowIndex == popImgIdx ) {
			return; 
		}   
        
 	    var tableLen = left_tbody.rows.length;

        if(strVal != "" && strVal != null){       //if [1-1] start
                 
	        //�����ȹ��(W0)
	        var w1_sum = 0;
	        
	        if(tableLen < 2){
		        w1_sum = Number(delComma(document.frm.p_w1_MondayQ.value));           //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_TuedayQ.value));  //W1 ȭ
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_WeddayQ.value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_ThudayQ.value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_FridayQ.value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_SatdayQ.value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_SundayQ.value));  //W1 ��
	
		        //�����ȹ��_W1       
		        divP_sch_plan_w1Q.innerHTML = w1_sum;
	         	document.frm.p_sch_plan_w1Q.value = w1_sum;
	         	
		        //�����ȹ��_W2      
			 	var p_sch_plan_w2Q = Number(delComma(document.frm.p_sch_plan_w2Q.value));
		
		        //�ǸŰ�ȹ_W1
		        var p_nf_sal_w1Q = Number(delComma(document.frm.p_nf_sal_w1Q.value));
		        
		        //�ǸŰ�ȹ W2
		        var p_nf_sal_w2Q = Number(delComma(document.frm.p_nf_sal_w2Q.value));
			 		 	 
		        //�������_W0
		        var p_estInv_w0Q = Number(delComma(document.frm.p_estInv_w0Q.value));
			
	
			 	//�������_W1 
			 	divP_estInv_w1Q.innerHTML = p_estInv_w0Q + w1_sum - p_nf_sal_w1Q; 
	         	document.frm.p_estInv_w1Q.value = p_estInv_w0Q + w1_sum - p_nf_sal_w1Q;
		
			    var p_estInv_w1Q = Number(delComma(document.frm.p_estInv_w1Q.value)); 
			     
			 	//�������_W2  
			 	divP_estInv_w2Q.innerHTML = p_estInv_w1Q + p_sch_plan_w2Q - p_nf_sal_w2Q; 
	         	document.frm.p_estInv_w2Q.value = p_estInv_w1Q + p_sch_plan_w2Q - p_nf_sal_w2Q;
			     	        
	        }else if(tableLen >= 2){
		 
		        //1. ������ rowIndex
		        var curRowIndex = obj.parentNode.parentNode.rowIndex;          
		 
	 	        w1_sum = Number(delComma(document.frm.p_w1_MondayQ[curRowIndex].value));           //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_TuedayQ[curRowIndex].value));  //W1 ȭ
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_WeddayQ[curRowIndex].value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_ThudayQ[curRowIndex].value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_FridayQ[curRowIndex].value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_SatdayQ[curRowIndex].value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.p_w1_SundayQ[curRowIndex].value));  //W1 ��        	
	
		        //�����ȹ��_W1       
		        divP_sch_plan_w1Q[curRowIndex].innerHTML = w1_sum;
	         	document.frm.p_sch_plan_w1Q[curRowIndex].value = w1_sum;
	
		        //�����ȹ��_W2      
			 	var p_sch_plan_w2Q = Number(delComma(document.frm.p_sch_plan_w2Q[curRowIndex].value));
		
		        //�ǸŰ�ȹ_W1
		        var p_nf_sal_w1Q = Number(delComma(document.frm.p_nf_sal_w1Q[curRowIndex].value));
		        //�ǸŰ�ȹ W2
		        var p_nf_sal_w2Q = Number(delComma(document.frm.p_nf_sal_w2Q[curRowIndex].value));
			 		 	 
		        //�������_W0
		        var p_estInv_w0Q = Number(delComma(document.frm.p_estInv_w0Q[curRowIndex].value));
	
			 	//�������_W1 
			 	divP_estInv_w1Q[curRowIndex].innerHTML = p_estInv_w0Q + w1_sum - p_nf_sal_w1Q; 
	         	document.frm.p_estInv_w1Q[curRowIndex].value = p_estInv_w0Q + w1_sum - p_nf_sal_w1Q;
		        
		        //�������_W1
		        var p_estInv_w1Q = Number(delComma(document.frm.p_estInv_w0Q[curRowIndex].value));
	 	          
			 	//�������_W2 
			 	divP_estInv_w2Q[curRowIndex].innerHTML = p_estInv_w1Q + p_sch_plan_w2Q - p_nf_sal_w2Q; 
			    document.frm.p_estInv_w2Q[curRowIndex].value = p_estInv_w1Q + p_sch_plan_w2Q - p_nf_sal_w2Q;  
	  
		    }//if [1-1-1]        	
        }else{
        	obj.value = "0"; 
        }//if [1-1]       
 	} //if[1]  	   
} 
 
//���밡��ǰ ���� ������ �ڵ����  
function calculate2(obj){
	  
	var strVal;
	var objTd; 
     	                           	   	   
	if(!checkNum(obj,'BLANK_INT')) return; // ���� üũ
	
	if(obj.tagName.toUpperCase() == "INPUT"){ //���밡��ǰ���� 
		strVal = obj.value;
		objTd  = obj.parentNode;	
		   
		if( obj.parentNode.parentNode.rowIndex == popImgIdx ) {
			return;
		} 
        
        var tableLen = left_tbody.rows.length;

        if(strVal != "" && strVal != null){       //if [1-1] start
                 
	        //�����ȹ��(W2)
	        var w2_sum = 0;
	
			if(tableLen < 2){
		        w2_sum = Number(delComma(document.frm.p_w2_MondayQ.value));           //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_TuedayQ.value));  //W2 ȭ
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_WeddayQ.value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_ThudayQ.value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_FridayQ.value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_SatdayQ.value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_SundayQ.value));  //W2 ��
		         
		        //�ǸŰ�ȹ W2
		        var p_nf_sal_w2Q = Number(delComma(document.frm.p_nf_sal_w2Q.value));
		
		        //�����ȹ��_W1       
		        divP_sch_plan_w2Q.innerHTML = w2_sum;
	         	document.frm.p_sch_plan_w2Q.value = w2_sum;
		          
		        var p_sch_plan_w2Q = Number(delComma(document.frm.p_sch_plan_w2Q.value)); 
		        
		        //�������_W1
		        var p_estInv_w1Q = Number(delComma(document.frm.p_estInv_w1Q.value));
	 	          
			 	//�������_W2 
			 	divP_estInv_w2Q.innerHTML = p_estInv_w1Q + p_sch_plan_w2Q - p_nf_sal_w2Q; 
			    document.frm.p_estInv_w2Q.value = p_estInv_w1Q + p_sch_plan_w2Q - p_nf_sal_w2Q;  
		       
			}else if(tableLen >= 2){
	
		        //������ rowIndex
	        	var curRowIndex = obj.parentNode.parentNode.rowIndex;          
				
		        w2_sum = Number(delComma(document.frm.p_w2_MondayQ[curRowIndex].value));           //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_TuedayQ[curRowIndex].value));  //W2 ȭ
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_WeddayQ[curRowIndex].value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_ThudayQ[curRowIndex].value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_FridayQ[curRowIndex].value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_SatdayQ[curRowIndex].value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.p_w2_SundayQ[curRowIndex].value));  //W2 ��
		         
		        //�ǸŰ�ȹ W2
		        var p_nf_sal_w2Q = Number(delComma(document.frm.p_nf_sal_w2Q[curRowIndex].value));
		
		        //�����ȹ��_W2       
		        divP_sch_plan_w2Q[curRowIndex].innerHTML = w2_sum;
	         	document.frm.p_sch_plan_w2Q[curRowIndex].value = w2_sum; 	 
				 
		        //�������_W1 
		        var p_estInv_w1Q = Number(delComma(document.frm.p_estInv_w1Q[curRowIndex].value));
	
			 	//�������_W2  
			 	divP_estInv_w2Q[curRowIndex].innerHTML = p_estInv_w1Q + w2_sum - p_nf_sal_w2Q; 
			    document.frm.p_estInv_w2Q[curRowIndex].value = p_estInv_w1Q + w2_sum - p_nf_sal_w2Q;  
			} //if [1-1-1] 
        }else{
        	obj.value = "0";
        } //if[1-1]
 	}   	     
} 

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			main_tbody.rows.style.backgroundColor = "#eeeeee"; 
		}
	}
}

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ 
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

// row �߰� 
// insertRow() ���� parameter �� insertRow index �� ������ �� �ִ�
// index ���� �ٷ� �Ʒ��ٿ� ���ο� row �� �����ȴ�.
// (0 �� �ָ� ���� ���ٿ� ���ο� row �� ����)
// ���� rows.length �̻��� ���� �ָ� error
function addRow( objBtn ) {
	
	/*
	if( objBtn.parentNode ) {
		var insertRowIndex = objBtn.parentNode.parentNode.rowIndex;
		insertRowIndex = insertRowIndex + 1;
		var oRowLeft = left_tbody.insertRow(insertRowIndex);
		var oRowMain = main_tbody.insertRow(insertRowIndex);
	}
	else {
		//alert("addRow else");
		var oRowLeft = left_tbody.insertRow();
		var oRowMain = main_tbody.insertRow();
	}
	
	oRowLeft.onmouseover = function() { bgOver(this); }; 
	oRowLeft.onmouseout = function() { bgOut(this); }; 
	oRowLeft.height = 30;  
	
	oRowMain.onmouseover = function() { bgOver(this); }; 
	oRowMain.onmouseout = function() { bgOut(this); }; 
	oRowMain.height = 30; 
	
	var oCell0 = oRowLeft.insertCell(); // ��ȣ
	var oCell1 = oRowLeft.insertCell(); // ����		

	var oCell2 = oRowLeft.insertCell(); // ����	
	var oCell3 = oRowMain.insertCell(); // �����ι�
	var oCell4 = oRowMain.insertCell(); // ��ü����
	var oCell5 = oRowMain.insertCell(); // �����
	var oCell6 = oRowMain.insertCell(); // �߿����
	var oCell7 = oRowMain.insertCell(); // ��ȹ�ݿ��켱����
	var oCell8 = oRowMain.insertCell(); // �����������ܿ���	
	
	oCell2.onclick = function() { setEditMode(this); }; // ����
	oCell3.onclick = function() { setEditMode(this); }; // �����ι�
	oCell4.onclick = function() { setEditMode(this); }; // ��ü����
	oCell5.onclick = function() { setEditMode(this); }; // �����	
	oCell6.onclick = function() { setEditMode(this); }; // �߿����
	oCell7.onclick = function() { setEditMode(this); }; // �켱����
	oCell8.onclick = function() { setEditMode(this); }; // ���ܿ���
	  	
	oCell0.align = "center"; oCell0.width = "30px";  // ��ȣ
	oCell1.align = "center"; oCell1.width = "40px";  // ����	
	
	oCell2.align = "center"; oCell2.width = "100px";    // ����	 
	oCell3.align = "center"; oCell3.width   = "50px";   // �����ι�
	oCell4.align = "center"; oCell4.width   = "50px";   // ��ü����
	oCell5.align = "center"; oCell5.width = "50px";     // �����	
	oCell6.align = "center"; oCell6.width   = "50px";   // �߿����
	oCell7.align = "center"; oCell7.width = "80px";     // �켱����	
	oCell8.align = "center"; oCell8.width = "800px";    // ���ܿ���
				  
	// ��ȣ
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	oCell0.onclick = function() { clickLine(this); };
	// ����
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";	
	
	// ����
	oCell2.innerHTML = "<a id=\"divPlant\"></a><select " 
					    + "name=\"plant_id\" onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this);\" tabindex=\"1\" "
					    + "onChange=\"doChangeGridPlant(this); \" style=\"width:100%; padding-left:5px; display:none;\"> "					   
        			    + document.frm.plant_loc_sel_str.value + "</select>";						
						
	// �����ι�
	oCell3.innerHTML = "<a id=\"divLine\">\</a><a id=\"divLineSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \" ><select "
						+ "name=\"line_id\" onChange=\" doChangeGridCost(this);\" onKeyDown=\"moveNextBox(this); \" tabindex=\"2\" "												
						+ "style=\"width:100%; padding-left:5px; \">"						
            			+ "<option value=\"\"></option> "
            			+ "</select></a>";
	
	// ��ü����
	oCell4.innerHTML = "";  
	
	// �����
	oCell5.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemIdSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"itype\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"4\" "
						+ "style=\"width:73PX; padding-right:5px; text-align:cneter; \" > "
						+ "</a> ";
 
	// �߿���� 
	oCell6.innerHTML = "<a id=\"divIPLine\"></a><a id=\"divIPLineSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \"><select "
						+ "name=\"exec_line\"  onKeyDown=\"moveNextBox(this); \" tabindex=\"5\" "
						+ "onChange=\" \" style=\"width:100%; padding-left:5px; \"> "
						+ "<option value=\"\"></option> "	
						+ "</select></a>"; 
	  
	// ��ȹ�ݿ��켱����  
	oCell7.innerHTML = "<a id=\"divsch_plant_idSpec\"></a><a id=\"divsch_plant_idSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"sch_plant_id\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"6\" "
						+ "style=\"width:100%; padding-right:5px; text-align:cneter; \" > "
						+ "</a> ";
        			    
	// ���� ���ܿ��� 
	oCell8.innerHTML = "<a id=\"divBnFlagSpec\"></a><a id=\"divBnFlagSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"etc_qty\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"7\" "
						+ "style=\"width:100%; padding-right:5px; text-align:cneter; \" > "
						+ "</a> ";
   	 
	//document.recalc();
	setRowNo();  
	*/
	
}


function setRowNo() {
	
	/*
	var tableLen = left_tbody.rows.length;
	areaTot.innerHTML = tableLen;
	
	for( var i = 0 ; i < tableLen ; ++i ) {
		if( divRowNo[0] ) {
			divRowNo[i].innerHTML = i+1;
		}
		else {
			divRowNo.innerHTML = "1";
		}
	}
	*/
	
	
}

// row ���� 
// parameter : button object
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	
	//������ row�� plant_id
	var curPlant_id     = document.frm.plant_id[delRowIdx].value;
	var curLine_id      = document.frm.line_id[delRowIdx].value;
	var curExecLine     = document.frm.exec_line[delRowIdx].value;
    var cnt = 0;
    
    if(curExecLine == "ALL"){
		for(var i = 0; i < tableLen ; ++i){			
			if(curPlant_id == document.frm.plant_id[i].value && curLine_id == document.frm.line_id[i].value){
				var exec_line = document.frm.exec_line[i].value;
				 				
				if(exec_line != "ALL")
				cnt++; 
			} 
		} 		 
		 
		if(cnt < 1){
			if( tableLen > 1 )
			{
				delRowDo( delRowIdx ); 
				rowFormed(); //<--1
			}
			else{
				delRowDo( delRowIdx );
				addRow(left_tbody.rows.length);
			}  
		}else{ 
			alert("���� �߿������ �����Ƿ�  ���� �Ͻ� �� �����ϴ� ");
		}  
    }else{
		if( tableLen > 1 )
		{
			delRowDo( delRowIdx ); 
			rowFormed(); //<--1
		}
		else{
			delRowDo( delRowIdx );
			addRow(left_tbody.rows.length);
		}    	
    } 
    	
	setRowNo();
}

// ���� row ���� �Լ�
// parameter : ������ rowIndex
function delRowDo( rowIdx ) { 
	//alert(left_tbody.rows.length + ", " + main_tbody.rows.length);
	left_tbody.deleteRow(rowIdx); 
	main_tbody.deleteRow(rowIdx);
	
}

// ���� ������ �ϸ� ��ư�� ��Ÿ���� �� �ȸԴ´�. ����, �� �ϴ� ������ ������ ������Ѵ�.
// �̷��� �ϸ� ��ư�� ��Ÿ���� �� �Դ´�.
// �� �ϴ� ���� ������ ��� & ���� & ���� & ä��
function rowFormed() {
	
	memLastRow();//<--2
	//alert("arrDate : " + arrData + ", " + "arrDisplayData : " + arrDisplayData);
	//alert("arrDisplayData : " + arrDisplayData);
	var tableLen = left_tbody.rows.length;
	//alert(tableLen);
	delRowDo( tableLen - 1 );
	addRow(left_tbody.rows.length);
	setLastRow();  
		
} 

//checkRadio (���밡��ǰ/����ǰ ����)   
function changeCheckRadio(obj){
	  
	 document.frm.checked_p.checked=false;
	 document.frm.checked_c.checked=false;
  
	 event.srcElement.checked=true;        //event.srcElement�� �̺�Ʈ�� �߻��� ��ü�Դϴ�.
	 check= event.srcElement.name;
	  	 
	 if(check=="checked_p"){
	   document.frm.checked_p.value   = "Y";
	   document.frm.checked_c.value   = ""; 	
	   document.frm.checked_etc.value = "etc_mst"; 		        
	 }else {
	   document.frm.checked_p.value   = "";
	   document.frm.checked_c.value   = "Y"; 	            
	   document.frm.checked_etc.value = "etc_dtl"; 		        
	 }          
  }     
  
// ����
function GoSave( service ) { 
    
    //1. iframe�� �����͸� �����Ҷ�, 
    //iframe01.GoSave("sc_01100_etc_plan_detail_list_save_comp"); 
          	     
    //var set_p_item_id = iframe01.document.frm.c_item_id.value;
    //alert("set_p_item_id===>" + set_p_item_id); 
    
    var tableLen = left_tbody.rows.length;
     
    if(tableLen == 0){
    	alert("������ �����Ͱ� �����ϴ�. �� ��ȸ�ϼ���.");
    	return;
    }   

    var checked_etc = document.frm.checked_etc.value;
    
 	for( i = 0; i < tableLen; i++ ) {										  
         
 		if((document.frm.p_locId_w1[i].value == null || document.frm.p_locId_w1[i].value =="")
			||(document.frm.p_locId_w2[i].value == null || document.frm.p_locId_w2[i].value ==""))
		{ 
			alert("������ġ�� �����ϼ���");
			return;
	    }
	} 
    
    //1. ���밡�� ����ǰ�� checked     
    if(checked_etc == "etc_dtl"){
    	iframe01.GoSave("sc_01100_etc_plan_detail_list_save_comp"); 
    }else if(checked_etc == "etc_mst"){
 
       
		// service_id ����   		
		frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;	
		document.frm._moon_service.value = service;
		document.frm.action = "service.do";
		document.frm.target = "_self";

		parentViewWait(); 
		 
		document.frm.submit();      			
    }
}    

// �� ���� ��������
var objTdG;

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode( objTdG );
	 
}

// TAB key �� ���� �׸� �̵�
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
		// ���� --> ����
		if( objName == "plant_id" ) {
			if( left_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[0];				
			}
			else {
				objTdG = main_tbody.rows.cells[0];				
			}
		}
		// ���� --> ��ü����
		else if( objName == "line_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[1];								
			}
			else {
				objTdG = main_tbody.rows.cells[1];
			}
		}
		// ��ü���� --> �����
		else if( objName == "total_line" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[2];
			}
			else {
				objTdG = main_tbody.rows.cells[2];
			}
		}
		// ����� --> �߿����
		else if( objName == "itype" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = main_tbody.rows.cells[3];
			}
		} 
		// �߿���� --> ��ȹ�ݿ��켱���� 
		else if( objName == "sch_plant_id" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else { 
				objTdG = main_tbody.rows.cells[4];
			}  
		}
		// ��ȹ�ݿ��켱���� --> �����������ܿ���
		else if( objName == "etc_qty" ) {
			// �������� --> ù�ٷ� �̵�
			if( rowIdx+1 == tableLen ) {
				if( main_tbody.rows[0] ) {
					objTdG = left_tbody.rows[0].cells[2];
				}
				else {
					objTdG = left_tbody.rows.cells[2];
				}
			}
			// �������� ù��° input box �� �̵�
			else { 
				if( main_tbody.rows[rowIdx] ) {
					objTdG = left_tbody.rows[rowIdx+1].cells[2];
				}
				else {
					objTdG = left_tbody.rows.cells[2];
				}
			}
		}
		// �� ���� box ���� ���� ����
		else {
			return;
		}
		setTimeout(setEditModeTime, 1);
	}
	
}  
	
// popup ��ȸ �̹��� mouseOver
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup ��ȸ �̹��� mouseOut
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function outImg( objImg ) {
	  
	popImgIdx = null;
	
} 


// ��ȸ�� waiting �̹��� �����ֱ�
function parentViewWait() { 
	
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
   

//excelDownload
function excelDownloadPopUp(){

    var version     = document.frm.version.value;  
    var seq         = document.frm.seq.value;
    var sdate       = document.frm.sdate.value;
    var checked_etc = document.frm.checked_etc.value;  
        
    if(checked_etc == "etc_mst"){
		document.frm._moon_service.value = "sc_01100_etc_plan_excel"; 
		document.frm.version.value 	   = version; 
		document.frm.seq.value     	   = seq; 
		document.frm.sdate.value       = sdate; 
		document.frm.checked_etc.value = checked_etc; 
	       
		document.frm.action = "service.do";   
		document.frm.target = "_self";  
		//parentViewWait();
		document.frm.submit(); 	     	
    }else{
		document.frm._moon_service.value = "sc_01100_etc_plan_detail_excel"; 
		document.frm.version.value 	   = version; 
		document.frm.seq.value     	   = seq; 
		document.frm.sdate.value       = sdate; 
		document.frm.checked_etc.value = checked_etc; 
	     
		document.frm.action = "service.do";   
		document.frm.target = "_self";  
		//childViewWait();   	
		document.frm.submit(); 	     	 
    }      
 }  
 
 //������ġ�� �������� �˷���.
 function doChangeGridLoc(obj){
   	   	 
   	var objName = obj.name;   	
   	   	 
 	//html��  ��<td>�� rowIndex   
	var rowIdx   = obj.parentNode.parentNode.parentNode.rowIndex;	      	
	var tableLen = left_tbody.rows.length;
	var p_item_id = null;
	var p_locId_w = null;  					//������ġ1, ������ġ2
	    
	if(rowIdx == 0 && tableLen < 2){ 
		if(document.frm.p_item_id[rowIdx]){
			p_item_id = document.frm.p_item_id.options[document.frm.p_item_id.selectedIndex].value;
			
			if(objName == "p_locId_w2")
				p_locId_w = document.frm.p_locId_w2.options[document.frm.p_locId_w2.selectedIndex].value;
			else	
				p_locId_w = document.frm.p_locId_w1.options[document.frm.p_locId_w1.selectedIndex].value;
		}
		else{					
			p_item_id = document.frm.p_item_id.value;
			
			if(objName == "p_locId_w2")
				p_locId_w = document.frm.p_locId_w2.value;
			else
				p_locId_w = document.frm.p_locId_w1.value;	
		}
	}	
	else if(document.frm.p_item_id[rowIdx]){
		   p_item_id = document.frm.p_item_id[rowIdx].value;		   
		   
		   if(objName == "p_locId_w2")
		   	p_locId_w = document.frm.p_locId_w2[rowIdx].value;		   
		   else
		   	p_locId_w = document.frm.p_locId_w1[rowIdx].value;		   		   
	}
	else{
		   p_item_id = document.frm.p_item_id.value;
		   
		   if(objName == "p_locId_w2")
		   p_locId_w = document.frm.p_locId_w2.value;
		   else
		   p_locId_w = document.frm.p_locId_w1.value;		   
	}
          
	//������ġ     
	scheduling.getProcInfo2("curItemId", p_item_id, "curLocId", p_locId_w,  "grid_p_loc_list", { 
		callback:function(arrList){
					 
			// ��ġ�ϴ� ��� ����
			if( arrList.length == 0 ) {
				alert("��������(CODE_MST)�� ���ǵ� ������ġ�� �ƴմϴ�.");
			}
			else { 
				var loc_id = obj.value;  
				
				if(objName == "p_locId_w2"){  
					var divP_locId_w2 = "<select name=\"p_locId_w2\" style=\"width:100%; padding-left:5px \" ";
					    divP_locId_w2 += "onFocusOut=\"doChangeGridLoc(this); \" >";
					
					for( i = 0; i < arrList.length; i++){  			 		 
						divP_locId_w2 += "<option value=\"" + arrList[i][0] + "\" ";
							if( arrList[i][0] == p_locId_w)  
								divP_locId_w2 += " selected ";
						divP_locId_w2 += ">" + arrList[i][1] + "</option>";												
					}      
					divP_locId_w2 += "</select>";
					    
					if(divP_locId_w2Sel[rowIdx])
						divP_locId_w2Sel[rowIdx].innerHTML = divP_locId_w2;
					else
						divP_locId_w2Sel.innerHTML = divP_locId_w2;
				}else{
					var divP_locId_w1 = "<select name=\"p_locId_w1\" style=\"width:100%; padding-left:5px \" ";
					    divP_locId_w1 += "onFocusOut=\"doChangeGridLoc(this); \" >";
					
					for( i = 0; i < arrList.length; i++){  			 		 
						divP_locId_w1 += "<option value=\"" + arrList[i][0] + "\" ";
							if( arrList[i][0] == p_locId_w)  
								divP_locId_w1 += " selected ";
						divP_locId_w1 += ">" + arrList[i][1] + "</option>";												
					}      
					divP_locId_w1 += "</select>";
					    
					if(divP_locId_w1Sel[rowIdx])
						divP_locId_w1Sel[rowIdx].innerHTML = divP_locId_w1;
					else
						divP_locId_w1Sel.innerHTML = divP_locId_w1;					
				}
			}	   
		}  
	});	  	   
} 