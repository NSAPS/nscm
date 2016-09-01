// 조회 시 waiting 이미지 보여주기
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

// 조회
GoSearch = function(service) {

	// 조회시 WAITING 이미지 보여주기
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


// 각각의 tab을 클릭하면 발생하는 event -> 이곳에서 화면단 제어를 한다.
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

// Grid 화면 resizing 
// tab_h : tab height ( 실제 tab 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 tab 높이가 커짐 ) 
// table_h : table height ( 실제 table 의 높이가 아니라 window 높이에서 빼낼 값임, 따라서 이 수가 적을수록 실제 table 높이가 커짐 ) 
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
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
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