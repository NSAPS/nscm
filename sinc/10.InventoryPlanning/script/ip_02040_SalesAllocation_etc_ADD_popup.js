// 저장
GoSave = function() {

	var in_work_date = document.frm.in_work_date.value;
	var in_alloc_item = document.frm.in_alloc_item.value;
	var in_dc_id = document.frm.in_dc_id.value;
	var in_sales_loc = document.frm.in_sales_loc.value;
	var in_alloc_qty = document.frm.in_alloc_qty.value;
	var user_id = "SCM";//document.frm.user_id.value;

	commonUtil.executeQuery("in_work_date!%!in_alloc_item!%!in_dc_id!%!in_alloc_item!%!in_sales_loc!%!in_alloc_qty!%!user_id", 
		in_work_date+"!%!" + in_alloc_item +"!%!" + in_dc_id+"!%!" + in_alloc_item+"!%!" + in_sales_loc+"!%!" + in_alloc_qty+"!%!" + user_id, "ip_02040_save_ETC_Alloc2", success);

//	var urlStr = "service.do?_moon_service=ip_02040_SalesAllocation_etc_ADD_popup_save";
//	urlStr += "&in_work_date=" + in_work_date + "&in_alloc_item=" + in_alloc_item + "&in_dc_id=" + in_dc_id +
//			"&in_sales_loc=" + in_sales_loc + "&in_alloc_qty=" + in_alloc_qty + "&user_id=" + user_id;
//	location.href = urlStr;
//	this.close(); 
	
};

success = function(data) {
	if (data == "SUCCESS") {
		GoSearch();
//		alert("저장되었습니다.");
	}
}


GoSearch = function() {

	var in_work_date = document.frm.in_work_date.value;
	var in_alloc_item = document.frm.in_alloc_item.value;
	var in_dc_id = document.frm.in_dc_id.value;
	var in_sales_loc = document.frm.in_sales_loc.value;
	
	commonUtil.getSelQeury( "in_work_date!%!in_alloc_item!%!in_dc_id!%!in_sales_loc"
		, in_work_date+"!%!"+in_alloc_item+"!%!"+in_dc_id+"!%!"+in_sales_loc, "ip_02040_Select_ETC_Alloc",{
		callback:function(result){
			document.frm.modi_box.value = result[0];
		}
	});   
}

function checkForNumber2(obj) {
	var key = event.keyCode;	
	// 추가할당에서는 마이너스 일과할당이 가능하도록 마이너스 부호를 허락한다.
	if(!(key==8||key==9||key==13||key==46||key==144||key==45|| // 45는 마이너스
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}

	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {
	}
}