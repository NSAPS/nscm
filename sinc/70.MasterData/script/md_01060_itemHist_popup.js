// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.old_item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.old_item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
			document.frm.old_item_name.value = "";
//			openItemSearchPop(input, 400, 400);
			}
			else {
//alert(33);
				return;
			}
		}
	});
	
}

// ��ǰ �˻� popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup â�� input box ǥ�� data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}


function setClearText(objBox, gubn)
{
	var tableLen = 0;
	
	if( main_tbody.rows.length )
	{
		tableLen = main_tbody.rows.length;
	}
	
	if(gubn == "NEW")
	{
		document.frm.n_item_id.value = "";
		document.frm.n_item_name.value = "";
		document.frm.new_item_id.value = "";
		document.frm.new_start_date.value = "";
	}
	
	if(tableLen == 0)
	{
		addRow();
	}
	else
	{
		for(var i=0; i<tableLen; i++)
		{
			main_tbody.deleteRow( i );
		}
		addRow();
	}
}

// ����
function CreateItemHist(){
	
	var new_item_id = document.frm.new_item_id.value;
	var old_item_id = document.frm.old_item_id.value;
	var hidden_item_id = document.frm.hidden_item_id.value;
	var user_id = document.frm.user_id.value;
	var idx = document.frm.idx.value;
	
	if( old_item_id == "" || old_item_id == null) {
		alert("��ǰ�� ��ȣ�� �Է��Ͻʽÿ�!");
		document.frm.old_item_id.select();
		return;
	}
	
	var in_paramKey = "new_item_id!%!old_item_id!%!hidden_item_id!%!user_id";
	var in_paramCode = new_item_id+"!%!"+old_item_id+"!%!"+hidden_item_id+"!%!"+user_id;
	
///////////////////////////////////////////
	commonUtil.executeQuery(in_paramKey, in_paramCode, "md_01060_create_item_hist", {
		callback:function(result){
			if(result == "SUCCESS"){
			alert("ǰ���̷� ���ῡ �����Ͽ����ϴ�");
			popUpClose(idx);
			}
			else{
			alert("ǰ���̷� ���ῡ ���� �Ͽ����ϴ� .");
			popUpClose(idx);
			}
		}
	});	
//////////////////////////////////////////	
}


function popUpClose(idx){
	
	//��ǰŸ��!%!��ǰ �ڵ�!%!��ǰ ��
	//var rowIdx = Number(document.frm.rowIdx.value);

	//��ǰŸ��!%!��ǰ �ڵ�!%!��ǰ ��
	var rowIdx = Number(document.frm.idx.value);
	var GridObj = opener.document.WiseGrid;
	
	GridObj.SetCellValue("ITEM_HIST", rowIdx, "0");
	this.close();	
	

	
	/* 
	if( opener.document.frm.hist_flag[idx] ) {
		opener.document.frm.hist_flag[idx].value = "O";
		opener.setViewMode(opener.document.frm.hist_flag[idx]);	
		this.close();	
		
	}
	else {
		opener.document.frm.hist_flag.value = "O";
		opener.setViewMode(opener.document.frm.hist_flag);	
		this.close();	
		
	}	
	*/
	
}

function test(){

	
}

