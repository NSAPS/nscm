// 조회 시 waiting 이미지 보여주기
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			gridArea2.style.display = "none";
			gridArea3.style.display = "none";
			gridArea4.style.display = "none";
			waitArea.style.display = "block";
			waitArea2.style.display = "block";
			waitArea3.style.display = "block";
			waitArea4.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			gridArea2.style.display = "block";
			gridArea3.style.display = "block";
			gridArea4.style.display = "block";
			waitArea.style.display = "none";
			waitArea2.style.display = "none";
			waitArea3.style.display = "none";
			waitArea4.style.display = "none";
		}
	}
	
}

// 조회
GoSearch = function(service) {

	// 조회시 WAITING 이미지 보여주기
	viewWait();

	document.frm._moon_service.value = "ip_05020_WMS_CloseInfo_list"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};


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
	else if(tabId == "tabPage3"){
		document.frm.sel_dw.value = "DW3";
	}
	else{
		document.frm.sel_dw.value = "DW4";
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
	tabPage3.style.height = tabHeightValue + "px"; 
	tabPage4.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	document.grid2.height = tableHeightValue + "px"; 
	document.grid3.height = tableHeightValue + "px"; 
	document.grid4.height = tableHeightValue + "px"; 
	
} 


function onclickfunc(row, col, data) {
		
		var itype		= document.frm.item_type.value;
		var search_type	= document.frm.search_type.value;
		var cnfm_date 	= data.split("!%!")[0];
		var col_flag  	= col;
		
		if(col_flag == '4'){
			
		var service_url = "service.do?_moon_service=ip_05040_WMS_CloseInfo_Scm_list_pop2";
		service_url += "&cnfm_date=" + cnfm_date + "&col_flag=" + col_flag + "&itype=" + itype + "&search_type=" + search_type ; 					
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1095, height=540, top=200, left=200";					
		var newWin = window.open(service_url, "", pop_win_style);		
		newWin.focus();	
		
		}
		
		if(col_flag == '5' || col_flag == '6' || col_flag == '7' || col_flag == '8' || col_flag == '9' || col_flag == '10' ){
			
		var service_url = "service.do?_moon_service=ip_05040_WMS_CloseInfo_Scm_list_pop";
		service_url += "&cnfm_date=" + cnfm_date + "&col_flag=" + col_flag + "&itype=" + itype + "&search_type=" + search_type; 					
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1095, height=540, top=200, left=200";					
		var newWin = window.open(service_url, "", pop_win_style);		
		newWin.focus();	
		
		}		
		
}
