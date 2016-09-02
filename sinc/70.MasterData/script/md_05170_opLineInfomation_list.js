
// 클릭한 라인 인덱스   
var clickedLineIdx = null;
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
var popImgIdx = null;


//중요라인을 공장 및 원가부문 선택 후 편집모드로 변환  
function setLine_EditMode( objTd ) {  
    
	if( objTd.parentNode ){   
		var i = objTd.parentNode.rowIndex;	//현재의 row index
			if( (document.frm.plant_id[i].value == null && document.frm.plant_id[i].value == "")
				&& (document.frm.line_id[i].value == null && document.frm.line_id[i].value == ""))
			{
				alert("공장  및 원가부문을 먼저 선택해 주세요. ");			
			}else{      
				//alert("childNodes===>" +  objTd.childNodes(0).childNodes(1).tagName.toUpperCase());   //<BR>
				alert("childNodes===>" +  objTd.childNodes(1).childNodes(1).tagName.toUpperCase());
				objTd.childNodes(1).childNodes(1).focus();    			   	 	
			}       	        
	}  

}

// input box 를 Edit Mode 로 변환
function setEditMode( objTd ) {
	 
	objTd.childNodes(0).style.display = "none";		
	objTd.childNodes(1).style.display = "block";

	if( objTd.childNodes(1).tagName.toUpperCase() == "SELECT") { // 공장셀인 경우                              
		objTd.childNodes(1).focus();
	}
	else if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "INPUT"){
		objTd.childNodes(1).childNodes(0).select();
	} 
	else {//if( objTd.childNodes(1).childNodes(0).tagName.toUpperCase() == "SELECT" ) {// 라인 셀인 경우	
			//alert("childNodes===>" +  objTd.childNodes(1).childNodes(0).tagName.toUpperCase());		
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

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
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

// row 추가 
// insertRow() 에서 parameter 로 insertRow index 를 지정할 수 있다
// index 값의 바로 아래줄에 새로운 row 가 생성된다.
// (0 을 주면 제일 윗줄에 새로운 row 가 생성)
// 현재 rows.length 이상의 값을 주면 error
function addRow( objBtn ) {
	
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
	
	var oCell0 = oRowLeft.insertCell(); // 번호
	var oCell1 = oRowLeft.insertCell(); // 삭제		

	var oCell2 = oRowLeft.insertCell(); // 공장	
	var oCell3 = oRowMain.insertCell(); // 원가부문
	var oCell4 = oRowMain.insertCell(); // 전체라인
	var oCell5 = oRowMain.insertCell(); // 운영라인
	var oCell6 = oRowMain.insertCell(); // 중요라인
	var oCell7 = oRowMain.insertCell(); // 계획반영우선순위
	var oCell8 = oRowMain.insertCell(); // 라인제약제외여부	
	
	oCell2.onclick = function() { setEditMode(this); }; // 공장
	oCell3.onclick = function() { setEditMode(this); }; // 원가부문
	oCell4.onclick = function() { setEditMode(this); }; // 전체라인
	oCell5.onclick = function() { setEditMode(this); }; // 운영라인	
	oCell6.onclick = function() { setEditMode(this); }; // 중요라인
	oCell7.onclick = function() { setEditMode(this); }; // 우선순위
	oCell8.onclick = function() { setEditMode(this); }; // 제외여부
	  	
	oCell0.align = "center"; oCell0.width = "30px";  // 번호
	oCell1.align = "center"; oCell1.width = "40px";  // 삭제	
	
	oCell2.align = "center"; oCell2.width = "100px";    // 공장	 
	oCell3.align = "center"; oCell3.width   = "50px";   // 원가부문
	oCell4.align = "center"; oCell4.width   = "50px";   // 전체라인
	oCell5.align = "center"; oCell5.width = "50px";     // 운영라인	
	oCell6.align = "center"; oCell6.width   = "50px";   // 중요라인
	oCell7.align = "center"; oCell7.width = "80px";     // 우선순위	
	oCell8.align = "center"; oCell8.width = "800px";    // 제외여부
				  
	// 번호
	oCell0.innerHTML = "<a id=\"divRowNo\"></a>";
	oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
	oCell0.onclick = function() { clickLine(this); };
	// 삭제
	oCell1.innerHTML = "<input name=\"btnAddRow\" type=\"button\" value=\"O\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"addRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">"
						+ "<input name=\"btnDelRow\" type=\"button\" value=\"X\" "
						+ "style=\"width:17px; text-align:center; font-weight:bold; \" onClick=\"delRow(this); \" class=\"button1_1\" " 
						+ "onmouseover=\"this.className='button1_2'\" onmouseout=\"this.className='button1_1'\">";	
	
	// 공장
	oCell2.innerHTML = "<a id=\"divPlant\"></a><select " 
					    + "name=\"plant_id\" onFocusOut=\"setViewMode(this); \" onKeyDown=\"moveNextBox(this);\" tabindex=\"1\" "
					    + "onChange=\"doChangeGridPlant(this); \" style=\"width:100%; padding-left:5px; display:none;\"> "					   
        			    + document.frm.plant_loc_sel_str.value + "</select>";						
						
	// 원가부문
	oCell3.innerHTML = "<a id=\"divLine\">\</a><a id=\"divLineSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \" ><select "
						+ "name=\"line_id\" onChange=\" doChangeGridCost(this);\" onKeyDown=\"moveNextBox(this); \" tabindex=\"2\" "												
						+ "style=\"width:100%; padding-left:5px; \">"						
            			+ "<option value=\"\"></option> "
            			+ "</select></a>";
	
	// 전체라인
	oCell4.innerHTML = "";  
	
	// 운영라인
	oCell5.innerHTML = "<a id=\"divItemId\"></a><a id=\"divItemIdSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"op_line\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"4\" "
						+ "style=\"width:73PX; padding-right:5px; text-align:cneter; \" > "
						+ "</a> ";
 
	// 중요라인 
	oCell6.innerHTML = "<a id=\"divIPLine\"></a><a id=\"divIPLineSelect\" "
						+ "style=\"width:100%; display:none;\" onFocusOut=\"setViewMode(this); \"><select "
						+ "name=\"exec_line\"  onKeyDown=\"moveNextBox(this); \" tabindex=\"5\" "
						+ "onChange=\" \" style=\"width:100%; padding-left:5px; \"> "
						+ "<option value=\"\"></option> "	
						+ "</select></a>"; 
	  
	// 계획반영우선순위  
	oCell7.innerHTML = "<a id=\"divPrioritySpec\"></a><a id=\"divPrioritySelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"priority\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"6\" "
						+ "style=\"width:100%; padding-right:5px; text-align:cneter; \" > "
						+ "</a> ";
        			    
	// 라인 제외여부 
	oCell8.innerHTML = "<a id=\"divBnFlagSpec\"></a><a id=\"divBnFlagSelect\" "
						+ "style=\"width:100%; display:none;\" ><input "
						+ "type=\"text\" name=\"bn_flag\" class=\"normal\" size=\"100\" value=\"\" "
						+ "onKeyDown=\"moveNextBox(this); \" onFocusOut=\"setViewMode(this); \" tabindex=\"7\" "
						+ "style=\"width:100%; padding-right:5px; text-align:cneter; \" > "
						+ "</a> ";
   	 
	//document.recalc();
	setRowNo();  
	
}


function setRowNo() {
	
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
	
}

// row 삭제 
// parameter : button object
function delRow( obj ) { 
	
	var delRowIdx = obj.parentNode.parentNode.rowIndex;
	var tableLen = obj.parentNode.parentNode.parentNode.rows.length;
	
	//삭제할 row의 plant_id
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
			alert("하위 중요라인이 있으므로  삭제 하실 수 없습니다 ");
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

// 실제 row 삭제 함수
// parameter : 삭제할 rowIndex
function delRowDo( rowIdx ) { 
	//alert(left_tbody.rows.length + ", " + main_tbody.rows.length);
	left_tbody.deleteRow(rowIdx); 
	main_tbody.deleteRow(rowIdx);
	
}

// 라인 삭제를 하면 버튼의 스타일이 잘 안먹는다. 따라서, 최 하단 라인을 지웠다 재생성한다.
// 이렇게 하면 버튼의 스타일이 잘 먹는다.
// 최 하단 라인 데이터 기억 & 삭제 & 생성 & 채움
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

var arrData = new Array(9);
var arrDisplayData = new Array(9); 
var lineList;
var procList;
var exclProcList;
// 최 하단 라인 데이터 기억
function memLastRow() {
	
	var tableLen = left_tbody.rows.length;
	// div 문자열 저장

	if(divPlant[tableLen-1])
		arrDisplayData[0] 	= divPlant[tableLen-1].innerHTML; // 공장	
	else
		arrDisplayData[0] 	= divPlant.innerHTML; // 공장
		
	if(divLine[tableLen-1]){
		arrDisplayData[1] 	= divLine[tableLen-1].innerHTML; // 원가부문	
		lineList			= divLineSelect[tableLen-1].innerHTML // line select box list
	}
	else{
		arrDisplayData[1] 	= divLine.innerHTML; // 원가부문
		lineList			= divLineSelect.innerHTML // line select box list
	}
	
	if(divProc[tableLen-1]){
		arrDisplayData[2] 	= divProc[tableLen-1].innerHTML; // 전체라인		
		procList			= divProcSelect[tableLen-1].innerHTML; //
	}
	else{
		arrDisplayData[2] 	= divProc.innerHTML; // 전체라인		
		procList			= divProcSelect.innerHTML; // 
	}
		
	if(divItemId[tableLen-1])
		arrDisplayData[3] 	= divItemId[tableLen-1].innerHTML; // 품목코드
	else
		arrDisplayData[3] 	= divItemId.innerHTML; // 품목코드
		
	if(divItemName[tableLen-1])	
		arrDisplayData[4] 	= divItemName[tableLen-1].innerHTML; // 품목이름
	else
		arrDisplayData[4] 	= divItemName.innerHTML; // 품목이름
		
	if(divItemSpec[tableLen-1])
		arrDisplayData[5] 	= divItemSpec[tableLen-1].innerHTML; // 규격		
	else
		arrDisplayData[5] 	= divItemSpec.innerHTML; // 규격		
		
	if(divExclProc[tableLen-1]){
		arrDisplayData[6] 	= divExclProc[tableLen-1].innerHTML; // 동시가동 불가호기
		exclProcList		= divExclProcSelect[tableLen-1].innerHTML; // exclProc select box list
	}
	else{
		arrDisplayData[6] 	= divExclProc.innerHTML; // 동시가동 불가호기		
		exclProcList		= divExclProcSelect.innerHTML; // exclProc select box list
	}
	
	if(divMcType[tableLen-1]){
		arrDisplayData[7]	= divMcType[tableLen-1].innerHTML; // 작업특징		
	}
	else{
		arrDisplayData[7]	= divMcType.innerHTML; // 작업특징
	}
	
	if(left_tbody.rows[tableLen-1])
		arrDisplayData[8]   = left_tbody.rows[tableLen-1].style.backgroundColor; // 체크
	else
		arrDisplayData[8]  = left_tbody.style.backgroundColor; // 체크 color

	 
	// value값 저장
	if(document.frm.plant_id[tableLen-1])
		arrData[0] 	= document.frm.plant_id[tableLen-1].value; // 공장		
	else
		arrData[0] 	= document.frm.plant_id.value; // 공장	
	
	if( document.frm.line_id[tableLen-1])
		arrData[1] 	= document.frm.line_id[tableLen-1].value; // 원가부문
	else
		arrData[1] 	= document.frm.line_id.value; // 원가부문	
		
	if(document.frm.total_line[tableLen-1])
		arrData[2] 	= document.frm.total_line[tableLen-1].value; // 전체라인	
	else
		arrData[2] 	= document.frm.total_line.value; // 전체라인
		
	if(document.frm.op_line[tableLen-1])
		arrData[3] 	= document.frm.op_line[tableLen-1].value; // 운영라인
	else
		arrData[3] 	= document.frm.op_line.value; // 운영라인
			
	if(document.frm.priority[tableLen-1])
		arrData[4] 	= document.frm.priority[tableLen-1].value; // 규격		
	else
		arrData[4] 	= document.frm.priority.value; // 규격		
		
	if(document.frm.bn_flag[tableLen-1])
		arrData[5] 	= document.frm.bn_flag[tableLen-1].value; // 동시가동 불가호기
	else
		arrData[5] 	= document.frm.bn_flag.value; // 동시가동 불가호기
		
	//alert(plant.value+","+line.value+","+proc.value+","+exclProc.value+","+arrData);
}

// 최 하단 라인 데이터 채움
function setLastRow() {
	
	var tableLen = left_tbody.rows.length;
		
	// value값 채움		
	if(document.frm.plant_id[tableLen-1]){ // 공장
		for( i = 0 ; i < document.frm.plant_id[tableLen-1].options.length ; i++){
			if(document.frm.plant_id[tableLen-1].options[i].value == arrData[0])
				document.frm.plant_id[tableLen-1].options[i].selected = true;
		}
	}
	else{									// 공장
		for( i = 0 ; i < document.frm.plant_id.options.length ; i++){
			if(document.frm.plant_id.options[i].value == arrData[0])
				document.frm.plant_id.options[i].selected = true;
		}
	}
	if(document.frm.line_id[tableLen-1])
		document.frm.line_id[tableLen-1].value		= arrData[1]; // 라인
	else
		document.frm.line_id.value		= arrData[1]; // 라인		
		
	if(document.frm.total_line[tableLen-1])		
		document.frm.total_line[tableLen-1].value		= arrData[2]; // 전체라인		
	else
		document.frm.total_line.value		= arrData[2]; // 전체라인
			
	if(document.frm.op_line[tableLen-1])
		document.frm.op_line[tableLen-1].value		= arrData[3]; // 운영라인
	else	
		document.frm.op_line.value		= arrData[3]; // 운영라인
		
	if(document.frm.priority[tableLen-1])
		document.frm.priority[tableLen-1].value 	= arrData[4]; // 규격
	else
		document.frm.priority.value 	= arrData[4]; // 규격
		
	if(document.frm.bn_flag[tableLen-1])
		document.frm.bn_flag[tableLen-1].value = arrData[5]; // 동시가동 불가호기	
	else	
		document.frm.bn_flag.value = arrData[5]; // 동시가동 불가호기
				
	// div 채움
	if(divPlant[tableLen-1])
		divPlant[tableLen-1].innerHTML = arrDisplayData[0]; // 공장
	else
		divPlant.innerHTML = arrDisplayData[0]; // 공장
	
	if(divLine[tableLen-1]){	
		divLine[tableLen-1].innerHTML = arrDisplayData[1]; // 원가부문
		divLineSelect[tableLen-1].innerHTML = lineList;		
	}
	else{
		divLine.innerHTML = arrDisplayData[1]; // 원가부문
		divLineSelect.innerHTML = lineList;	
	}
	
	if(divProc[tableLen-1]){	
		divProc[tableLen-1].innerHTML = arrDisplayData[2]; // 전체라인
		divProcSelect[tableLen-1].innerHTML = procList;
	}
	else{
		divProc.innerHTML = arrDisplayData[2]; // 전체라인	
		divProcSelect.innerHTML = procList;
	}
	 
	if(divItemId[tableLen-1])
		divItemId[tableLen-1].innerHTML = arrDisplayData[3]; // 품목코드
	else
		divItemId.innerHTML = arrDisplayData[3]; // 품목코드
	
	if(divItemName[tableLen-1])	
		divItemName[tableLen-1].innerHTML = arrDisplayData[4]; // 품목이름
	else
		divItemName.innerHTML = arrDisplayData[4]; // 품목이름	
	
	if(divItemSpec[tableLen-1])
		divItemSpec[tableLen-1].innerHTML = arrDisplayData[5]; // 규격
	else
		divItemSpec.innerHTML = arrDisplayData[5]; // 규격	
	
	if(divExclProc[tableLen-1]){
		divExclProc[tableLen-1].innerHTML = arrDisplayData[6]; // 동시가동 불가호기
		divExclProcSelect[tableLen-1].innerHTML = exclProcList;
	}
	else{	
		divExclProc.innerHTML = arrDisplayData[6]; // 동시가동 불가호기	
		divExclProcSelect.innerHTML = exclProcList;
	}
	
	if(divMcType[tableLen-1])
		divMcType[tableLen-1].innerHTML = arrDisplayData[7]; // 공장
	else
		divMcType.innerHTML = arrDisplayData[7]; // 공장
		
	document.recalc();
	
}

// 저장
function GoSave( service ) { 
  
	var tableLen = left_tbody.rows.length;
	var cnt = 0;	
  	
  	var all_tmp  = "";  //전체
  	var part_tmp = "";  //하위 
  	var tot_tmp  = "";  //중복키 check
  	
  	for(var k = 0; k < tableLen; k++){ 
  		var exec_line = document.frm.exec_line[k].value;  
  		
  		//중요라인이 "ALL"인 것들  
  		if(exec_line == "ALL"){   			 
  			all_tmp  += document.frm.plant_id[k].value + "-" + document.frm.line_id[k].value + ",";
  		}else{  
  			part_tmp += document.frm.plant_id[k].value + "-" + document.frm.line_id[k].value + ","; 
  		}
  		
  		//중복키 check
  		tot_tmp  += document.frm.plant_id[k].value + "-" + document.frm.line_id[k].value + "-" + exec_line + ",";
  		          	
  	}   
  	
  	var all_tmp_arr = null;
  	    all_tmp_arr = all_tmp.split(",");

  	var part_tmp_arr = null;
  	    part_tmp_arr = part_tmp.split(",");
  	
  	
  	//중복키 check
  	var tot_tmp_arr = null;
        tot_tmp_arr = tot_tmp.split(",");
          	
  	var all_len  = all_tmp_arr.length-1;
  	var part_len = part_tmp_arr.length-1;
  	var tot_len = tot_tmp_arr.length-1;
  	 
  	var part_cnt = 0;  
  	
  	for(var j=0; j<part_tmp_arr.length-1; j++){	 	 
  		for(var m=0; m<all_tmp_arr.length-1; m++){
			if(part_tmp_arr[j] == all_tmp_arr[m]){
				part_cnt++; 
 			}
  		} 
  	}  
    
    //중복키 CHECK  	
 	for(var n=0; n<tot_len; n++){	 	 
		var tempA = tot_tmp_arr[n];	    	     
		for(x=n+1; x<tot_len; x++) 	
			{	 
				var tempB = tot_tmp_arr[x];
			     			    
			    if(tempA == tempB){
				    //alert("tempA===>" + tempA + "tempB====>" + tempB);	    
				    alert("저장하려는 값이 중복되어 있습니다.");
				    return;
				}     
			} 
  	}    

  	//중요라인에 하위레벨이 없이 추가 수정시에는 저장 안됨.
  	if(part_len != part_cnt){		
  		alert("중요라인에 ALL을 먼저 추가하세요");
  		return;
  	} 
 
 	for( i = 0; i < tableLen; i++ ) {
		if( document.frm.exec_line[i]) {											
			if( (document.frm.plant_id[i].value != null && document.frm.plant_id[i].value != "")
				&& (document.frm.line_id[i].value != null && document.frm.line_id[i].value != "")
				&& (document.frm.exec_line[i].value != null && document.frm.exec_line[i].value != "")) 
				{
				cnt++;								
				//alert("plant:"+document.frm.plant_id[i].value+" line:"+document.frm.line_id[i].value+" proc:"+document.frm.total_line[i].value+" excl_proc:"+document.frm.bn_flag[i].value);
			}		
		}
		else {					
			if( (document.frm.plant_id.value != null && document.frm.plant_id.value != "")
				&& (document.frm.line_id.value != null && document.frm.line_id.value != "")
				&& (document.frm.exec_line.value != null && document.frm.exec_line.value != ""))
				 {
				cnt++;		  
			}		
		}		    
	}
	   	
	// 마지막 한줄도 지울때
//	if(tableLen == 1 && cnt == 0){
//		cnt = 1;
//	}
	//alert("cnt:" + cnt + ", tableLen:" + tableLen);
	/*
	if( (cnt < 1) || (tableLen != cnt) ) {   
		alert("저장할 데이터가 없거나, 선택하지 않은 항목이 있습니다.");
		return;
	}
	*/
	     
	// service_id 저장  
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit(); 
 } 

// 셀 저장 전역변수
var objTdG;

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	 
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
		else if( objName == "op_line" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[3];
			}
			else {
				objTdG = main_tbody.rows.cells[3];
			}
		}
		// 중요라인 --> 계획반영우선순위 
		else if( objName == "priority" ) {
			if( main_tbody.rows[rowIdx] ) {
				objTdG = main_tbody.rows[rowIdx].cells[4];
			}
			else {
				objTdG = main_tbody.rows.cells[4];
			}  
		}
		// 계획반영우선순위 --> 라인제약제외여부
		else if( objName == "bn_flag" ) {
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


function doChangeGridCost(obj){
 
 	document.frm.changeEventFlag.value = "Y";
  
	if(!obj || !obj.value) return;
		
	//html의  각<td>의 rowIndex
	var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex; 
	var tableLen = left_tbody.rows.length;
	var cost_id = obj.value;
    
		if(rowIdx == 0 && tableLen < 2){
    		if(document.frm.plant_id[rowIdx]){
    			var plant_id = document.frm.plant_id.options[document.frm.plant_id.selectedIndex].value;
    		}
    		else{					
    			var plant_id = document.frm.plant_id.value;
    		}
    	}	
		else if(document.frm.plant_id[rowIdx]){
    		var plant_id = document.frm.plant_id[rowIdx].value;		   
		}
    	else{
    		var plant_id = document.frm.plant_id.value;
    	}
    	
    	if(cost_id == "" || cost_id == null){
    		return;
    	}
	 
	//중요라인  
	scheduling.getProcInfo2("plant_id", plant_id, "cost_id", cost_id, "grid_execLine_list", { 
		callback:function(arrList){
					 
			// 일치하는 결과 없음
			if( arrList.length == 0 ) {
				alert("일치하는 결과 리스트가  없습니다.");
			}
			else {
				var exec_line = document.frm.exec_line.value; 
				
				var divIPLine = "<select name=\"exec_line\" style=\"width:100%; padding-left:5px \" ";
				divIPLine += "onKeyDown=\"moveNextBox(this); \" >";
				
				for( i = 0; i < arrList.length; i++){  					 
					divIPLine += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == exec_line) 
							divIPLine += " selected ";
                        
							divIPLine += ">" + arrList[i][1] + "</option>";												
				}      
				divIPLine += "</select>";
				  
				if(divIPLineSelect[rowIdx])
					divIPLineSelect[rowIdx].innerHTML = divIPLine;
				else
					divIPLineSelect.innerHTML = divIPLine;
			}
						  
		}
	});	  	   

} 
	
	
// popup 조회 이미지 mouseOver
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup 조회 이미지 mouseOut
// popup 을 띄우기 위해 제품 코드 영역을 벗어난 경우 viewMode 변환 방지를 위한 flag 설정
function outImg( objImg ) {
	
	popImgIdx = null;
	
} 

 

  
