/*
// 제품 검색 POPUP
function openItemSearchPop( obj ) { 
		
	var service_url = "service.do?_moon_service=item_search_popup_for_order";
	service_url += "&_moon_perpage=100&_moon_pagenumber=1";
	
	if(document.frm.selected_item.value != "" && document.frm.selected_item.value != null ){		
		service_url += "&code_input=" + document.frm.selected_item.value;
	}
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "item_Search", pop_win_style);
	newWin.focus();
	
}*/

function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 일치하는 제품 없음
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}