// ��ȸ �� waiting �̹��� �����ֱ�
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	if( document.all.waitArea2 ) {
		if( waitArea2.style.display.toUpperCase() == "NONE" ) {
			gridArea2.style.display = "none";
			waitArea2.style.display = "block";
		}
		else {
			gridArea2.style.display = "block";
			waitArea2.style.display = "none";
		}
	}	
}



// ������ tab�� Ŭ���ϸ� �߻��ϴ� event -> �̰����� ȭ��� ��� �Ѵ�.
WebFXTabPage.prototype.show = function () {
	var el = this.tab;
	var s = el.className + " selected";
	s = s.replace(/ +/g, " ");
	el.className = s;

	this.element.style.display = "block";
//gridArea2.style.display = "block";	

};	

//��ȸ�� ��¥�� YYYY-MM-DD ->  YYYYMMDD�� ��ȯ
GoSearch = function(service) {
	
	//var dc_flag = document.frm.dc_flag.value
	
	//alert(dc_flag);
	
	viewWait();// ��ȸ�� WAITING �̹��� �����ֱ�
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();

	
};


// Grid ȭ�� resizing 
// tab_h : tab height ( ���� tab �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� tab ���̰� Ŀ�� ) 
// table_h : table height ( ���� table �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� table ���̰� Ŀ�� ) 
function setGridAutoResize( tab_h, table_h ){
	
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
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
	} 
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tabPage2.style.height = tabHeightValue + "px"; 

	document.grid.height = tableHeightValue + "px"; 
	document.grid2.height = tableHeightValue + "px"; 
	
} 