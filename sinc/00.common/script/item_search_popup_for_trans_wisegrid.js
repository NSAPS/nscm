
// opener update �� 
function fillOpenWindow( row, col, data ) {
	
	//��ǰŸ��!%!��ǰ �ڵ�!%!��ǰ ��
	var rowIdx = Number(document.frm.rowIdx.value);
	var GridObj = opener.document.WiseGrid;
	
	var OpenWindow = document.frm.OpenWindow.value;
	
	
	if( OpenWindow == "md_01060_itemMasterManagement_list_new" ) {
		GridObj.SetCellValue("REFE_ITEM1", rowIdx, data.split("!%!")[1]);
		GridObj.SetCellValue("REFE_ITEM1_NAME", rowIdx, data.split("!%!")[2]);
	}else{
		GridObj.SetCellValue("ITEM_ID", rowIdx, data.split("!%!")[1]);
		GridObj.SetCellValue("ITEM_NAME", rowIdx, data.split("!%!")[2]);
		GridObj.SetCellValue("BOX_PER_PALET", rowIdx, data.split("!%!")[3]);
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
