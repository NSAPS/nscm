
// ���� Ŭ�� : ����ȭ������ �̵�
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

// IFRAME Grid ȭ�� resizing
// grid_h : grid height ( ���� grid �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� grid ���̰� Ŀ�� ) 
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
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( gridHeightValue < 1 ) 
		gridHeightValue = 1;
	
	document.grid.height = gridHeightValue + "px"; 
	
}
