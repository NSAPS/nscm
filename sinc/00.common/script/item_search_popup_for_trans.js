
// opener update �� 
function fillOpenWindow( row, col, data ) {

	//��ǰŸ��!%!��ǰ �ڵ�!%!��ǰ ��
	var rowIdx = Number(document.frm.rowIdx.value);
	if( opener.document.frm.item_id[rowIdx] ) {
		opener.document.frm.item_id[rowIdx].value = data.split("!%!")[1];
		opener.document.frm.item_name[rowIdx].value = data.split("!%!")[2];
		if( opener.divItemName[rowIdx] ) {
			opener.divItemId[rowIdx].innerHTML = data.split("!%!")[1];
			opener.divItemName[rowIdx].innerHTML = "&nbsp;" + data.split("!%!")[2];
		}
		if( opener.document.frm.box_per_palet[rowIdx] ) {
			opener.document.frm.box_per_palet[rowIdx].value = data.split("!%!")[3];
		}
	}
	else {
		opener.document.frm.item_id.value = data.split("!%!")[1];
		opener.document.frm.item_name.value = data.split("!%!")[2];
		if( opener.divItemName ) {
			opener.divItemId.innerHTML = data.split("!%!")[1];
			opener.divItemName.innerHTML = "&nbsp;" + data.split("!%!")[2];
		}
		if( opener.document.frm.box_per_palet ) {
			opener.document.frm.box_per_palet.value = data.split("!%!")[3];
		}
	}
	
	this.close(); 

} 

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstClick(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.code_input.value = ""; 
		document.frm.first_condition.value = "N"; 
	}
	
}

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstChange(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.first_condition.value = "N"; 
	}
	
} 
