 
// opener update �� 
function fillOpenWindow( row, col, data ) {
	
	if(opener.document.frm.search_item_popup_flag.value.toUpperCase() == "INPUT"){
	
		//��ǰŸ��!%!��ǰ �ڵ�!%!��ǰ ��
		var rowIdx = Number(document.frm.rowIdx.value);
		if( opener.document.frm.item_id[rowIdx] ) {
			opener.document.frm.item_id[rowIdx].value = data.split("!%!")[0];
			opener.document.frm.item_name[rowIdx].value = data.split("!%!")[1];
			opener.document.frm.item_spec[rowIdx].value = data.split("!%!")[2];
//			if(opener.divItemId[rowIdx]){
//				opener.divItemId[rowIdx].innerHTML = data.split("!%!")[0];
//			}
			if( opener.divItemName[rowIdx] ) {
				opener.divItemName[rowIdx].innerHTML = "&nbsp;" + data.split("!%!")[1];
			}
			if( opener.divItemSpec[rowIdx] ) {
				opener.divItemSpec[rowIdx].innerHTML = "&nbsp;" + data.split("!%!")[2];
			}		
		}
		else {
			opener.document.frm.item_id.value = data.split("!%!")[0];
			opener.document.frm.item_name.value = data.split("!%!")[1];
			opener.document.frm.item_spec.value = data.split("!%!")[2];
//			if(opener.divItemId){
//				opener.divItemId.innerHTML = data.split("!%!")[0];
//			}
			if( opener.divItemName ) {
				opener.divItemName.innerHTML = "&nbsp;" + data.split("!%!")[1];
			}
			if( opener.divItemSpec ) {
				opener.divItemSpec.innerHTML = "&nbsp;" + data.split("!%!")[2];
			}
		}
	}
	else{
	
		//�ڵ�!%!�ڵ� ��
		//var id_input = document.frm.id_input.value;
		//var name_input = document.frm.name_input.value;
		opener.document.getElementById("search_item_id").value = data.split("!%!")[0];
		opener.document.getElementById("search_item_name").value = data.split("!%!")[1];
	}
	this.close(); 

} 

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstClick(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.selected_item_id.value = ""; 
		document.frm.first_condition.value = "N"; 
	}
	
}

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstChange(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.first_condition.value = "N"; 
	}
	
} 


