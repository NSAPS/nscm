
// 대분류 선택시 품명 리스트 채움
/*function doChangeTy1(obj){
	
	var selectedTy1 = document.frm.selected_ty1.value;
		
	scheduling.getItemList("selected_ty1", selectedTy1, "month_combo_item_list", { 
		callback:function(arrList){
			// 일치하는 결과 없음
			if( (arrList.length == 0) && (document.frm.selected_item_pre.value == null)) {
				alert("일치하는 결과 아이템 리스트가  없습니다.");
			}
			else {
				var item_id = document.frm.selected_item_pre.value;
				var div_item = "<select name=\"selected_item\" style=\"width:350px; \" >";
				div_item += "<option value=\"\">전체</option>";
				for( i = 0; i < arrList.length; i++){
					div_item += "<option value=\"" + arrList[i][0] + "\" ";
						if( arrList[i][0] == item_id)
							div_item += " selected ";
					div_item += ">" + arrList[i][1] + "</option>";					
				}
				div_item += "</select>";
				divItem.innerHTML = div_item;
			}
		}
	});	
}*/

// 코드 검색 POPUP
// type_input : sales_cat1 select box name
// id_input : id input box name
// name_input : name input box name
// w_size : widths of popup window
// h_size : heights of popup window
//
// 쿼리에서 id_input 을 조건으로 어떤 SQL 을 적용시킬 지를 결정
// 제품검색 : id_input = item_id
function openCodeSearchPop( type_input, id_input, name_input, w_size, h_size ) {

	// 영업품종 분류1 
	var sales_cat1 = document.getElementById(type_input).value;
	
	// popup 창의 input box 표시 data : search code 
	var code_input = document.getElementById(id_input).value;
	
	// popup 창의 넓이, 높이를 지정하지 않은 경우, default 사이즈 설정
	if( !(w_size) ) {
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup_for_monthly&_moon_perpage=200&_moon_pagenumber=1"; 
	service_url += "&code_input=" + code_input + "&id_input=" + id_input + "&name_input=" + name_input; 
	
	if( sales_cat1 != null && sales_cat1 != ""){
		service_url += "&sales_cat1=" + sales_cat1;
	}
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width="
						+ w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus();
	
}

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