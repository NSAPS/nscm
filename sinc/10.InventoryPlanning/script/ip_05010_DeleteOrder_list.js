// ��ȸ �� waiting �̹��� �����ֱ�
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			gridArea2.style.display = "none";
			waitArea.style.display = "block";
			waitArea2.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			gridArea2.style.display = "block";
			waitArea.style.display = "none";
			waitArea2.style.display = "none";
		}
	}
	
}

// ��ȸ
GoSearch = function(service) {

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	document.frm._moon_service.value = "ip_05010_DeleteOrder_list"; 
	//document.form1._moon_perpage.value = perpage; 
	//	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

function doChange(obj){
	
	var insel = obj.value;
	var in_div;
	
	if(insel != '00') {
		commonUtil.getCodeInfo("insel_gubn",insel,"ip_05010_Sales_Loc_combo", { 
		callback:function(arrList){
			in_div = "<select name=\"insel_code\" OnChange=\"\">";
			for(var i=0 ; i < arrList.length ; i++){
				in_div +=	"<option value="+arrList[i][0]+">"+arrList[i][1]+"</option>";
			}	
			in_div += "</select>";
			divSalesLoc.innerHTML = in_div;
		}
		});
	}
}


// ������ tab�� Ŭ���ϸ� �߻��ϴ� event -> �̰����� ȭ��� ��� �Ѵ�.
WebFXTabPage.prototype.show = function () {
	var el = this.tab;
	var s = el.className + " selected";
	s = s.replace(/ +/g, " ");
	el.className = s;
	
	this.element.style.display = "block";
	
	var tabId = this.element.id;
	if(tabId == "tabPage1"){
		document.frm.sel_dw.value = "DW1";
	}else if(tabId == "tabPage2"){
		document.frm.sel_dw.value = "DW2";
	}
};	

// Grid ȭ�� resizing 
// tab_h : tab height ( ���� tab �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� tab ���̰� Ŀ�� ) 
// table_h : table height ( ���� table �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� table ���̰� Ŀ�� ) 
function setGridAutoResize2( tab_h, table_h ){
	
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
//	tabPage3.style.height = tabHeightValue + "px"; 
//	tabPage4.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	document.grid2.height = tableHeightValue + "px"; 
//	document.grid3.height = tableHeightValue + "px"; 
//	document.grid4.height = tableHeightValue + "px"; 
	
} 