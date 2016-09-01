
// 더블 클릭 : 수정화면으로 이동
function onclickfunc(row, col, data) {
	

	var plant_pre = document.frm.plant.value;
	var item_type_pre = document.frm.item_type.value;
	var serch_word_pre = document.frm.serch_word.value;	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	var urlStr = "service.do?_moon_service=md_01060_itemMasterDetail_mod";
	
	urlStr += "&plant_pre=" + plant_pre + "&item_type_pre=" + item_type_pre +"&serch_word_pre=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	//urlStr += "&item_type_pre=" + item_type_pre +"&serch_word_pre=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
	
}
