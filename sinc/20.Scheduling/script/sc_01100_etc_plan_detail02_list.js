 // Ŭ���� ���� �ε���   
var clickedLineIdx = null; 
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
var popImgIdx = null;

// HTML Grid �� X��ǥ ���� 
function etc_scrollX() {
	  
	document.all.topLine.scrollLeft = document.all.mainDisplay.scrollLeft;
	//alert("scrollleftsave" + scrollleftsave);
} 

// HTML Grid �� Y��ǥ ����  
function etc_scrollY() {   
	document.all.leftDisplay.scrollTop = document.all.mainDisplay.scrollTop;
}  

// ���� �����ʿ䷮ ������ �� ����
function saveValues(obj){
	
	oldProdQty = strToNum(obj.value); // ���� �����ʿ䷮

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
  
//POPUP��ȸ 
function goEtcMainDtl( obj ) {
	  
	alert("���밡�� ����ǰ�� ��ȸ�ϼ���.");
	return;   
} 

function changeItem(p_item_id) {
   //alert("_p_item_id==>" + p_item_id);   
   document.frm.set_p_item_id.value = p_item_id;  
 }   

//�����ȹ ���� ������ �ڵ� sum (����)      
function calculate(obj){
	
	var strVal;
	var objTd; 
     	                           	   	   
	if(!checkNum(obj,'BLANK_INT')) return; // ���� üũ
	
	if(obj.tagName.toUpperCase() == "INPUT"){     //if [1] start 
    
	    strVal = obj.value;
		objTd  = obj.parentNode;	
            
        //�����ȹ��(W0)
        var w1_sum = 0;
  	    var tableLen = left_tbody.rows.length;
        
        if(strVal != "" && strVal != null){       //if [1-1] start
        
	        if(tableLen < 2){                     //if [1-1-1] start
	        	
		        w1_sum = Number(delComma(document.frm.c_w1_MondayQ.value));           //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_TuedayQ.value));  //W1 ȭ
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_WeddayQ.value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_ThudayQ.value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_FridayQ.value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_SatdayQ.value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_SundayQ.value));  //W1 ��
		                
		        //�����ȹ��_W1       
		        divC_sch_plan_w1Q.innerHTML = w1_sum;
	         	document.frm.c_sch_plan_w1Q.value = w1_sum;
		       
		        //�����ȹ��_W2      
			 	var c_sch_plan_w2Q = Number(delComma(document.frm.c_sch_plan_w2Q.value));
		
		        //����ȹ_W1
		        var c_do_plan_w1Q = Number(delComma(document.frm.c_do_plan_w1Q.value));
		
		        //����ȹ W2
		        var c_do_plan_w2Q = Number(delComma(document.frm.c_do_plan_w2Q.value));
			 		 	 
		        //�������_W0
		        var c_estInv_w0Q = Number(delComma(document.frm.c_estInv_w0Q.value));
		        
			 	//�������_W1 
			 	divC_estInv_w1Q.innerHTML = c_estInv_w0Q + w1_sum - c_do_plan_w1Q; 
	         	document.frm.c_estInv_w1Q.value = c_estInv_w0Q + w1_sum - c_do_plan_w1Q;
		
			    var c_estInv_w1Q = Number(delComma(document.frm.c_estInv_w1Q.value)); 
			     
			 	//�������_W2  
			 	divC_estInv_w2Q.innerHTML = c_estInv_w1Q + c_sch_plan_w2Q - c_do_plan_w2Q; 
	         	document.frm.c_estInv_w2Q.value = c_estInv_w1Q + c_sch_plan_w2Q - c_do_plan_w2Q;
				           
		 		/*** 2. �����ʿ䷮ ***/
				var c_do_plan_w2Q  = Number(delComma(document.frm.c_do_plan_w2Q.value));   //����ȹ_w2   
				var c_estInv_w1Q_pa = Number(delComma(document.frm.c_estInv_w1Q.value));   //�������_w1   
					
				var c_pa_plan_w2 =  c_do_plan_w2Q - c_estInv_w1Q_pa;			
				divC_pa_plan_w2.innerHTML = c_pa_plan_w2; 
	         	document.frm.c_pa_plan_w2.value = c_pa_plan_w2;
	        } //if [1-1] end
	        else if(tableLen >= 2){ 
		        //1. ������ rowIndex
		        var curRowIndex = obj.parentNode.parentNode.rowIndex; 
		                 
		        w1_sum = Number(delComma(document.frm.c_w1_MondayQ[curRowIndex].value));           //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_TuedayQ[curRowIndex].value));  //W1 ȭ
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_WeddayQ[curRowIndex].value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_ThudayQ[curRowIndex].value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_FridayQ[curRowIndex].value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_SatdayQ[curRowIndex].value));  //W1 ��
		        w1_sum = w1_sum + Number(delComma(document.frm.c_w1_SundayQ[curRowIndex].value));  //W1 ��
		                
		        //�����ȹ��_W1       
		        divC_sch_plan_w1Q[curRowIndex].innerHTML = w1_sum;
	         	document.frm.c_sch_plan_w1Q[curRowIndex].value = w1_sum;
	
		        //�����ȹ��_W2      
			 	var c_sch_plan_w2Q = Number(delComma(document.frm.c_sch_plan_w2Q[curRowIndex].value));
		
		        //����ȹ_W1	
		        var c_do_plan_w1Q = Number(delComma(document.frm.c_do_plan_w1Q[curRowIndex].value));
		        
		        //����ȹ W2
		        var c_do_plan_w2Q = Number(delComma(document.frm.c_do_plan_w2Q[curRowIndex].value));
			 		 	 
		        //�������_W0
		        var c_estInv_w0Q = Number(delComma(document.frm.c_estInv_w0Q[curRowIndex].value));
		        
			    var c_estInv_w2Q = Number(delComma(document.frm.c_estInv_w1Q[curRowIndex].value)); 
			     			           
		 		/*** 2. �����ʿ䷮ ***/
				var c_do_plan_w2Q  = Number(delComma(document.frm.c_do_plan_w2Q[curRowIndex].value));   //����ȹ_w2   
				var c_estInv_w1Q_pa = Number(delComma(document.frm.c_estInv_w1Q[curRowIndex].value));   //�������_w1   
					
				var c_pa_plan_w2 =  c_do_plan_w2Q - c_estInv_w1Q_pa;			
				divC_pa_plan_w2[curRowIndex].innerHTML = c_pa_plan_w2; 
	         	document.frm.c_pa_plan_w2[curRowIndex].value = c_pa_plan_w2;
	
			 	//�������_W1 
			 	divC_estInv_w1Q[curRowIndex].innerHTML = c_estInv_w0Q + w1_sum - c_do_plan_w1Q; 
	         	document.frm.c_estInv_w1Q[curRowIndex].value = c_estInv_w0Q + w1_sum - c_do_plan_w1Q;
		        
		        //�������_W1
		        var c_estInv_w1Q = Number(delComma(document.frm.c_estInv_w1Q[curRowIndex].value));
	 	         
			 	//�������_W2 
			 	divC_estInv_w2Q[curRowIndex].innerHTML = c_estInv_w1Q + c_sch_plan_w2Q - c_do_plan_w2Q; 
			    document.frm.c_estInv_w2Q[curRowIndex].value = c_estInv_w1Q + c_sch_plan_w2Q - c_do_plan_w2Q;  
	
	        }//else if [1-1-2] end
        }else{
        	obj.value = "0"; 
        }//if [1-1] end
 	}//if [1] end   	    
} 
  
//�����ȹ ���� ������ �ڵ� sum (������)
function calculate2(obj){
	var strVal;
	var objTd; 
     	                           	   	   
	if(!checkNum(obj,'BLANK_INT')) return; // ���� üũ
	
	if(obj.tagName.toUpperCase() == "INPUT"){ //���밡��ǰ���� 
		strVal = obj.value;
		objTd  = obj.parentNode;	
		           
        //�����ȹ��(W2)
        var w2_sum = 0;
  	    var tableLen = left_tbody.rows.length;

        if(strVal != "" && strVal != null){       //if [1-1] start
	
	        if(tableLen < 2){
	        	
		        //2. 
		        w2_sum = Number(delComma(document.frm.c_w2_MondayQ.value));           //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_TuedayQ.value));  //W2 ȭ
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_WeddayQ.value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_ThudayQ.value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_FridayQ.value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_SatdayQ.value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_SundayQ.value));  //W2 ��
		        
		        //����ȹ W2
		        var c_do_plan_w2Q = Number(delComma(document.frm.c_do_plan_w2Q.value));
		
		        //�����ȹ��_W2        
		        divC_sch_plan_w2Q.innerHTML = w2_sum;
	         	document.frm.c_sch_plan_w1Q.value = w2_sum;		
		
		        //�������_W1 
		        var c_estInv_w1Q = Number(delComma(document.frm.c_estInv_w1Q.value));
		        
			 	//�������_W2
			 	divC_estInv_w2Q[curRowIndex].innerHTML = c_estInv_w1Q + w2_sum - c_do_plan_w2Q;
			    document.frm.c_estInv_w2Q.value = c_estInv_w1Q + w2_sum - c_do_plan_w2Q;  
	   
			}else if(tableLen >= 2){
		        //1. ������ rowIndex 
		        var curRowIndex = obj.parentNode.parentNode.rowIndex;          
		        //2. 
		        w2_sum = Number(delComma(document.frm.c_w2_MondayQ[curRowIndex].value));           //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_TuedayQ[curRowIndex].value));  //W2 ȭ
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_WeddayQ[curRowIndex].value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_ThudayQ[curRowIndex].value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_FridayQ[curRowIndex].value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_SatdayQ[curRowIndex].value));  //W2 ��
		        w2_sum = w2_sum + Number(delComma(document.frm.c_w2_SundayQ[curRowIndex].value));  //W2 ��
		        
		        //����ȹ W2
		        var c_do_plan_w2Q = Number(delComma(document.frm.c_do_plan_w2Q[curRowIndex].value));
		
		        //�����ȹ��(W2)        
		        divC_sch_plan_w2Q[curRowIndex].innerHTML = w2_sum;
	         	document.frm.c_sch_plan_w2Q[curRowIndex].value = w2_sum;		
		
		        //�������_W1 
		        var c_estInv_w1Q = Number(delComma(document.frm.c_estInv_w1Q[curRowIndex].value));
			 	
			 	//�������_W2		 	 
			 	divC_estInv_w2Q[curRowIndex].innerHTML = c_estInv_w1Q + w2_sum - c_do_plan_w2Q;
			    document.frm.c_estInv_w2Q[curRowIndex].value = c_estInv_w1Q + w2_sum - c_do_plan_w2Q;     			
			}//if [1-1-1] end                 
	 	}//if [1-1] end 
	}else{
        	obj.value = "0"; 		
	}//if [1] end      	       
}       