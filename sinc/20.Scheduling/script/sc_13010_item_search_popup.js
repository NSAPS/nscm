
// opener update �� 
function fillOpenWindow( row, col, data ) {
	//��ǰŸ��!%!��ǰ �ڵ�!%!��ǰ ��
	var rowIdx = Number(document.frm.rowIdx.value);	if( opener.document.frm.item_id[rowIdx] ) {		opener.document.frm.item_id[rowIdx].value = data.split("!%!")[1];		opener.document.frm.item_name[rowIdx].value = data.split("!%!")[2];		opener.document.frm.spec[rowIdx].value = data.split("!%!")[3];		if( opener.divItemName[rowIdx] ) {			opener.divItemName[rowIdx].innerHTML = "&nbsp;" + data.split("!%!")[2];		}	}	else {		opener.document.frm.item_id.value = data.split("!%!")[1];		opener.document.frm.item_name.value = data.split("!%!")[2];		opener.document.frm.spec.value = data.split("!%!")[3];		/////////			if( opener.divItemName ) {			opener.divItemName.innerHTML = "&nbsp;" + data.split("!%!")[2];
		}	}	this.close();	window.opener.getProdVer(); } 

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstClick(){
	if( document.frm.first_condition.value != "N" ){ 		document.frm.code_input.value = ""; 		document.frm.first_condition.value = "N"; 	}
}

// ó�� Ŭ�� �� ���� ����� �Լ�
function firstChange(){	if( document.frm.first_condition.value != "N" ){ 		document.frm.first_condition.value = "N"; 	}} 
