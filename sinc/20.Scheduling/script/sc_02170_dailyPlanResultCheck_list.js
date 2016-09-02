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

// 더블 클릭 : 상세정보(하단 iframe)
function onclickfunc(row, col, data) {
	
	if( col < 3 || col > 4) return;
	
	var urlStr = "service.do?_moon_service=sc_02170_dailyPlanResultCheckDetail_list";
	
	var itemId = data.split("!%!")[2];	
	var runDate = document.frm.run_date.value; 
	
	urlStr += "&item_id=" + itemId + "&run_date=" + runDate;		
	
	gridDetailInfo.location.href = urlStr;
		
}

// RUN DATE POPUP 
function openRunDatePop( w_size, h_size ) { 
	
	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=sc_02170_dailyPlanResultCheck_popup"; 
		
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Run_Date_Search", pop_win_style); 
	newWin.focus(); 
	
}