// input box 를 Edit Mode 로 변환
function setEditMode( obj ) {

	//obj.childNodes(0).style.display = "block";
	obj.childNodes(0).select();
	
	
}

// 화면에서 CTRL 키를 누른상태에서 방향키를 눌렀을때 셀 이동이 가능하게 하는 function
function moveUpDown(objBox){
	
	// ctrl 키가 keydown 상태가 아닌 경우에는 return 
	//if(!ctrlKeyDownCheck)
	//	return;
	
	var tableLen = left_tbody.rows.length;
	// 제품코드 셀인 경우
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	
	// Row가 2개 이상 있는 경우..
	if(document.frm.real_qty[rowIdx]){
		// 방향키 ↑(위) : 38, ↓(아래) : 40, ←(왼쪽) : 37, →(오른쪽) : 39
		// 1. 위 : 38
		if( event.keyCode == "38" ) {
			
			if(objName == "real_qty"){	// 기본재고상차 PLT
				if( rowIdx == 0 ) 		document.frm.real_qty[tableLen-1].select();
				else 					document.frm.real_qty[rowIdx-1].select();
			}
			else if(objName == "box_qty"){ // 기본재고상차 BOX
				if( rowIdx == 0 )		document.frm.box_qty[tableLen-1].select();
				else 					document.frm.box_qty[rowIdx-1].select();
			}
			else if(objName == "conv_qty"){ // 기본재고상차 BOX
				if( rowIdx == 0 )		document.frm.conv_qty[tableLen-1].select();
				else 					document.frm.conv_qty[rowIdx-1].select();
			}
			else if(objName == "safety_stock"){ // 기본재고상차 BOX
				if( rowIdx == 0 )		document.frm.safety_stock[tableLen-1].select();
				else 					document.frm.safety_stock[rowIdx-1].select();
			}
		}
		// 2. 아래 : 40
		else if( event.keyCode == "40" ) {
			
			if(objName == "real_qty"){
				if( rowIdx == tableLen - 1 ) 	document.frm.real_qty[0].select();
				else 							document.frm.real_qty[rowIdx+1].select();
			}
			else if(objName == "box_qty"){
				if( rowIdx == tableLen - 1 )	document.frm.box_qty[0].select();
				else 							document.frm.box_qty[rowIdx+1].select();
			}
			else if(objName == "conv_qty"){
				if( rowIdx == tableLen - 1 )	document.frm.conv_qty[0].select();
				else 							document.frm.conv_qty[rowIdx+1].select();
			}
			else if(objName == "safety_stock"){
				if( rowIdx == tableLen - 1 )	document.frm.safety_stock[0].select();
				else 							document.frm.safety_stock[rowIdx+1].select();
			}
		}
	}
}

// 기본재고상차, 추가재고상차, 생산상차의 PLT, BOX값이 수정되었을때 호출됨.
function onChangeCheck(objBox){
	
	
	var strVal = objBox.value;
	
	// 기본재고상차BOX, 추가재고상차BOX, 생산상차BOX 입력창인 경우, 숫자 체크 & 천단위 구분자 표시
	if( objBox.name == "real_qty" || objBox.name == "box_qty" ) {
		if( strVal != "" && strVal != null ) {
			// 숫자 체크
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "숫자만 입력하여 주세요.");
				return;
			}
			// 형식이 맞는 경우 천단위 구분자 표시
			else {
				strVal = objBox.value;
				if(objBox.name == "real_qty" || objBox.name == "box_qty")
					objBox.value = fixedPoint(strVal);
				else
					objBox.value = strVal;
				strVal = objBox.value;
			}
		}
		else {
			// BOX 인경우.
			if(objBox.name == "real_qty" )
				objBox.value = "0";
			else
				objBox.value = "0"
		}
		
		// BOX 인 경우 누적상차집계 계산
		if( objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box" ) {
			// PLT 수량 계산
			calPltQty(objBox);
			// 누적 계산
			calPltBoxCum(objBox);
		}
		
		// PLT 인 경우 누적상차집계 계산
		if( objBox.name == "base_stk_plt" || objBox.name == "add_stk_plt" || objBox.name == "prod_plt" ) {
			// Box 수량 계산
			calBoxQty(objBox);
			// 누적 계산
			calPltBoxCum(objBox);
		}
	}
}

/*********************************************************
 ******************** EA, BOX 계산   *********************
 *********************************************************/


// Box 수량 계산
function calBoxQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.real_qty[rowIdx] ) {
		var conv_qty = document.frm.conv_qty[rowIdx].value;
		var real_qty = document.frm.real_qty[rowIdx].value;
	}
	else {
		var conv_qty = document.frm.conv_qty.value;
		var real_qty = document.frm.real_qty.value;
	}
	
	// PALET 당 BOX 수량이 없는 경우 100 으로 계산
	if( conv_qty == null || conv_qty == "" || conv_qty == "0" ) {
		var conv_qty = 1;
	}
	//alert(real_qty);

		var boxQty = Math.round(real_qty /conv_qty);
		//var boxStr = numberFormat(boxQty.toString());
	
	document.frm.box_qty[rowIdx].value = boxQty;
	//boxPlt.value = delComma(boxStr);
	
}


// Box 수량 계산
function calEaQty(objBox) {
	
	var rowIdx = objBox.parentNode.parentNode.rowIndex;
	if( document.frm.box_qty[rowIdx] ) {
		var conv_qty = document.frm.conv_qty[rowIdx].value;
		var box_qty = document.frm.box_qty[rowIdx].value;
	}
	else {
		var conv_qty = document.frm.conv_qty.value;
		var box_qty = document.frm.box_qty.value;
	}
	
	// PALET 당 BOX 수량이 없는 경우 100 으로 계산
	if( conv_qty == null || conv_qty == "" || conv_qty == "0" ) {
		var conv_qty = 1;
	}
	//alert(box_qty);
	//alert(conv_qty);


	var ea_qty = document.frm.real_qty[rowIdx].value;

	ea_qty = Math.round(box_qty * conv_qty);
	//alert(ea_qty);
	//var boxStr = numberFormat(boxQty.toString());
	document.frm.real_qty[rowIdx].value = ea_qty;
	//boxPlt.value = delComma(boxStr);
	
}