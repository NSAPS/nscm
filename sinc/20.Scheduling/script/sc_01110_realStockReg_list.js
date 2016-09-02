// input box �� Edit Mode �� ��ȯ
function setEditMode( obj ) {

	//obj.childNodes(0).style.display = "block";
	obj.childNodes(0).select();
	
	
}

// ȭ�鿡�� CTRL Ű�� �������¿��� ����Ű�� �������� �� �̵��� �����ϰ� �ϴ� function
function moveUpDown(objBox){
	
	// ctrl Ű�� keydown ���°� �ƴ� ��쿡�� return 
	//if(!ctrlKeyDownCheck)
	//	return;
	
	var tableLen = left_tbody.rows.length;
	// ��ǰ�ڵ� ���� ���
	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
	}
	else {
		var rowIdx = objBox.parentNode.parentNode.rowIndex;
	}
	var objName = objBox.name;
	
	
	// Row�� 2�� �̻� �ִ� ���..
	if(document.frm.real_qty[rowIdx]){
		// ����Ű ��(��) : 38, ��(�Ʒ�) : 40, ��(����) : 37, ��(������) : 39
		// 1. �� : 38
		if( event.keyCode == "38" ) {
			
			if(objName == "real_qty"){	// �⺻������ PLT
				if( rowIdx == 0 ) 		document.frm.real_qty[tableLen-1].select();
				else 					document.frm.real_qty[rowIdx-1].select();
			}
			else if(objName == "box_qty"){ // �⺻������ BOX
				if( rowIdx == 0 )		document.frm.box_qty[tableLen-1].select();
				else 					document.frm.box_qty[rowIdx-1].select();
			}
			else if(objName == "conv_qty"){ // �⺻������ BOX
				if( rowIdx == 0 )		document.frm.conv_qty[tableLen-1].select();
				else 					document.frm.conv_qty[rowIdx-1].select();
			}
			else if(objName == "safety_stock"){ // �⺻������ BOX
				if( rowIdx == 0 )		document.frm.safety_stock[tableLen-1].select();
				else 					document.frm.safety_stock[rowIdx-1].select();
			}
		}
		// 2. �Ʒ� : 40
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

// �⺻������, �߰�������, ��������� PLT, BOX���� �����Ǿ����� ȣ���.
function onChangeCheck(objBox){
	
	
	var strVal = objBox.value;
	
	// �⺻������BOX, �߰�������BOX, �������BOX �Է�â�� ���, ���� üũ & õ���� ������ ǥ��
	if( objBox.name == "real_qty" || objBox.name == "box_qty" ) {
		if( strVal != "" && strVal != null ) {
			// ���� üũ
			if( checkNum(objBox, "BLANK") == false ) {
				objSetting(objBox, "", "���ڸ� �Է��Ͽ� �ּ���.");
				return;
			}
			// ������ �´� ��� õ���� ������ ǥ��
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
			// BOX �ΰ��.
			if(objBox.name == "real_qty" )
				objBox.value = "0";
			else
				objBox.value = "0"
		}
		
		// BOX �� ��� ������������ ���
		if( objBox.name == "base_stk_box" || objBox.name == "add_stk_box" || objBox.name == "prod_box" ) {
			// PLT ���� ���
			calPltQty(objBox);
			// ���� ���
			calPltBoxCum(objBox);
		}
		
		// PLT �� ��� ������������ ���
		if( objBox.name == "base_stk_plt" || objBox.name == "add_stk_plt" || objBox.name == "prod_plt" ) {
			// Box ���� ���
			calBoxQty(objBox);
			// ���� ���
			calPltBoxCum(objBox);
		}
	}
}

/*********************************************************
 ******************** EA, BOX ���   *********************
 *********************************************************/


// Box ���� ���
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
	
	// PALET �� BOX ������ ���� ��� 100 ���� ���
	if( conv_qty == null || conv_qty == "" || conv_qty == "0" ) {
		var conv_qty = 1;
	}
	//alert(real_qty);

		var boxQty = Math.round(real_qty /conv_qty);
		//var boxStr = numberFormat(boxQty.toString());
	
	document.frm.box_qty[rowIdx].value = boxQty;
	//boxPlt.value = delComma(boxStr);
	
}


// Box ���� ���
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
	
	// PALET �� BOX ������ ���� ��� 100 ���� ���
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