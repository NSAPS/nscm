// 제품 입력창에 입력한 값과 일치하는 제품 검사 후, 일치하는 제품이 있으면 제품 코드, 제품 명 표시
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.old_item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
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

// 제품 검색 popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup 창의 input box 표시 data : search code 
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

// 저장
function CreateItemHist(){
	
	var new_item_id = document.frm.new_item_id.value;
	var old_item_id = document.frm.old_item_id.value;
	var hidden_item_id = document.frm.hidden_item_id.value;
	var user_id = document.frm.user_id.value;
	var idx = document.frm.idx.value;
	
	if( old_item_id == "" || old_item_id == null) {
		alert("구품목 번호를 입력하십시오!");
		document.frm.old_item_id.select();
		return;
	}
	
	var in_paramKey = "new_item_id!%!old_item_id!%!hidden_item_id!%!user_id";
	var in_paramCode = new_item_id+"!%!"+old_item_id+"!%!"+hidden_item_id+"!%!"+user_id;
	
///////////////////////////////////////////
	commonUtil.executeQuery(in_paramKey, in_paramCode, "md_01060_create_item_hist", {
		callback:function(result){
			if(result == "SUCCESS"){
			alert("품목이력 연결에 성공하였습니다");
			popUpClose(idx);
			}
			else{
			alert("품목이력 연결에 실패 하였습니다 .");
			popUpClose(idx);
			}
		}
	});	
//////////////////////////////////////////	
}


function popUpClose(idx){
	
	//제품타입!%!제품 코드!%!제품 명
	//var rowIdx = Number(document.frm.rowIdx.value);

	//제품타입!%!제품 코드!%!제품 명
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

