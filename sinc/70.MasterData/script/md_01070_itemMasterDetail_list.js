
// 더블 클릭 : 수정화면으로 이동
function onclickfunc(row, col, data) {
	

	var plant_pre = document.frm.plant.value;
	var item_type_pre = document.frm.item_type.value;
	var serch_word_pre = document.frm.serch_word.value;	
	var perpage_pre = document.frm.perpage_pre.value;
	var pagenumber_pre = document.frm.pagenumber_pre.value;
	var urlStr = "service.do?_moon_service=md_01070_itemMasterDetail_mod";
	
	urlStr += "&plant_pre=" + plant_pre + "&item_type_pre=" + item_type_pre +"&serch_word_pre=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	//urlStr += "&item_type_pre=" + item_type_pre +"&serch_word_pre=" + serch_word_pre + "&perpage_pre=" + perpage_pre + "&pagenumber_pre=" + pagenumber_pre;
	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;
	
}

// IFRAME Grid 화면 resizing
// grid_h : grid height ( 실제 grid 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 grid 높이가 커짐 ) 
function setGridAutoResizeIframe( grid_h ){

	var maxWidthValue;
	var maxHeightValue;
	
	
	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 
	
	var gridHeightValue = Number(maxHeightValue) - Number(grid_h) ;

//alert("maxWidthValue="+maxWidthValue);	
//alert("maxHeightValue="+maxHeightValue);	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( gridHeightValue < 1 ) 
		gridHeightValue = 1;
	
	document.grid.height = gridHeightValue + "px"; 
	
}
