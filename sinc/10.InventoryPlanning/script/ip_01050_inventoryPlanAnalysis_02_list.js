//조회시 날짜를 YYYY-MM-DD ->  YYYYMMDD로 변환
GoSearch = function(service) {
	
	//var	temp_in_cnfm_date = document.frm.in_cnfm_date.value;
	document.frm.start_date.value = delDateDelimiter(document.frm.start_date.value);
	document.frm.end_date.value   = delDateDelimiter(document.frm.end_date.value);
	var	search_type 			  = document.frm.search_type.value; 	//	조회유형
	var	search_item 			  = document.frm.search_item.value; 	//품목명	

	if( search_type == "" || search_type == null || search_type == 00 ) {
		alert("조회유형을 선택하십시요!");
		document.frm.search_type.select();
		return;
	}
	
	viewWait();// 조회시 WAITING 이미지 보여주기
	document.frm._moon_service.value 	= service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action 				= "service.do";
	document.frm.target 				= "_self";
	document.frm.submit();
	//doChange1(this, 0, 0);

	//document.frm.in_cnfm_date.value = temp_in_cnfm_date;
	
};
// 더블 클릭 : 상세 팝업  //
function onclickfunc(row, col, data) {
		
		var item_id		= data.split("!%!")[2];
		var	item_name	= data.split("!%!")[3];
		var week_flag	= '31week';
		var item_type	= document.all.item_type.value;
		var search_type = document.all.search_type.value;
		
	commonUtil.getSelQeury( "item_id", item_id, "ip_01050_Inventory_plan_analysis_check_item_type",{
		callback:function(result){
			
		if(col == '19'){ // (1/3주 평균 편차)->(예상재고) 수정 2014-05-20 이강욱
		
	
				if(result == "FERT"){					
					
					if(search_type == "O1020" || search_type =="O10" || search_type =="O20"){
						var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_hawa_new";
						service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;  
						//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
						var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
						//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
						var newWin = window.open(service_url, "", pop_win_style);
						newWin.focus();	
					}else{
						var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_new";
						service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;  
						//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
						var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
						//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
						var newWin = window.open(service_url, "", pop_win_style);
						newWin.focus();
					}
					
				}else {
			
					var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_hawa_new";
					service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;  
					//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
					var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
					//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
					var newWin = window.open(service_url, "", pop_win_style);
					newWin.focus();	
				
				}
			}  
			
		}
	});
	
}




