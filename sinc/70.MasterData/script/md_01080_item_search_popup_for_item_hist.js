
// opener update 용 
function fillOpenWindow( row, col, data ) {

	var tableLen = opener.main_tbody.rows.length;
	var startDate = opener.document.frm.item_hist_start.value;
	var newGubn = document.frm.new_gubn.value;
	
	if(newGubn == "MOD" )
	{
		opener.document.frm.new_item_id.value = data.split("!%!")[0];
		opener.document.frm.new_start_date.value = startDate;
		
		opener.document.frm.item_id.value = data.split("!%!")[0];
		opener.document.frm.item_name.value = data.split("!%!")[1];
		
		if(tableLen > 1)
		{
			opener.document.frm.old_item_id[tableLen-1].value		=	data.split("!%!")[0];
			opener.divOldItemID[tableLen-1].innerHTML					=	"&nbsp;" +data.split("!%!")[0];
			opener.document.frm.old_item_name[tableLen-1].value	=	data.split("!%!")[1];
			opener.divOldItemName[tableLen-1].innerHTML				=	"&nbsp;" +data.split("!%!")[1];
			opener.document.frm.start_date[tableLen-1].value			=	startDate;
			opener.divStartDate[tableLen-1].innerHTML					=	"&nbsp;" +startDate;
		}
		else
		{
			opener.document.frm.old_item_id.value		=	data.split("!%!")[0];
			opener.divOldItemID.innerHTML					=	"&nbsp;" +data.split("!%!")[0];
			opener.document.frm.old_item_name.value	=	data.split("!%!")[1];
			opener.divOldItemName.innerHTML				=	"&nbsp;" +data.split("!%!")[1];
			opener.document.frm.start_date.value			=	startDate;
			opener.divStartDate.innerHTML					=	"&nbsp;" +startDate;
		}
	}
	else if(newGubn == "NEW" )
	{
		opener.document.frm.new_item_id.value = data.split("!%!")[0];
		opener.document.frm.new_start_date.value = startDate;
		
		opener.document.frm.n_item_id.value = data.split("!%!")[0];
		opener.document.frm.n_item_name.value = data.split("!%!")[1];		
	}

	this.close(); 
} 

// 처음 클릭 시 내용 지우는 함수
function firstClick(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.code_input.value = ""; 
		document.frm.first_condition.value = "N"; 
	}
	
}

// 처음 클릭 시 내용 지우는 함수
function firstChange(){
	
	if( document.frm.first_condition.value != "N" ){ 
		document.frm.first_condition.value = "N"; 
	}
	
} 
