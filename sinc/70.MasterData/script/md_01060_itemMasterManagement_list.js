// 더블 클릭 : 상세정보(하단 iframe)
function onclickfunc(row, col, data) {
		
	var urlStr = "service.do?_moon_service=md_01070_itemMasterDetail_list";
	//alert(data);
	var list = data.split("!%!");
	urlStr += "&item_id=" + list[0]; // 아이템 코드
	urlStr += "&item_name=" + list[1]; // 아이템 코드

//alert(list[0]);	
	
		
	gridDetailInfo.location.href = urlStr;
		
}


GoEdit = function(service) {
			
	var item_type_pre = document.frm.item_type.value;
	var serch_word_pre = document.frm.serch_word.value;	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	var urlStr = "service.do?_moon_service=md_01060_itemMasterManagement_mod";

	
	urlStr += "&item_type=" + item_type_pre +"&serch_word=" + serch_word_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	//urlStr += "&item_type_pre=" + item_type_pre +"&serch_word_pre=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	//urlStr += "&item_type=" + item_type_pre +"&serch_word_pre=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	//urlStr += "&_moon_pagenumber=1&_moon_perpage=100"
	location.href = urlStr;
	
};