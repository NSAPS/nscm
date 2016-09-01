
function GoSearch(service) {
	doQuery();
}

function init() {
	var GridObj = document.WiseGrid;
	setHeader(GridObj);
	setProperty(GridObj);
	//GridObj.strBgImage = "../../WiseGrid/images/icompia_logo_white.gif";
	//GridObj.strBgImage = "/scm/WiseGrid/images/icompia_logo_white.gif";
	GridObj.bUserContextMenu = true;
	
//	//사용자가 헤더를 드래그해서 컬럼위치를 이동할수 없다.
//	GridObj.bHDMoving = false;
//	
//	//헤더의 컬럼위치이동 콤보버튼을 비활성화 한다.
//	GridObj.bHDSwapping = false;
//	
//	//로우 셀렉터를 WiseGrid에서 숨긴다,. 
//	GridObj.bRowSelectorVisible = false;
//	
//	//로우의 테두리에 아무것도 나타나지 않는다.  
//	GridObj.strRowBorderStyle = "none";
//	
//	//RowSpacing값을 정한다. 
//	GridObj.nRowSpacing = 0;
//	
//	//클릭한 컬럼의 셀을 선택가능하게 한다.
//	GridObj.strHDClickAction = "select";
//	
//	//선택된 행의 배경색상을 설정한다.
//	GridObj.strActiveRowBgColor = "default"; 
	
	 

	//getdatetime();
	
	// 화면 로드시 데이터 표시
	//doQuery();
}

function setting(){
	var GridObj = document.WiseGrid;
	// TEST
	GridObj.bHDMoving = false;
 	GridObj.bHDSwapping = false;
 	GridObj.bRowSelectorVisible = false;
 	GridObj.strRowBorderStyle = "none";
 	GridObj.nRowSpacing = 0;
 	GridObj.strHDClickAction = "select";
 	
	GridObj.SetGroupMerge("C01,C02"); 
	
	GridObj.AddSummaryBar('SUMMARY1', 'COLUMN1의 소계', 'C01', 'sum', 'C17,C18'); 
	GridObj.AddSummaryBar('SUMMARY2', 'COLUMN2의 소계', 'C02', 'sum', 'C17,C18'); 
	
	GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|0|0'); 
	GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '0|0|255'); 
	
	GridObj.SetSummaryBarFont('SUMMARY1', '굴림', '10', true, false, false, false); 
	GridObj.SetSummaryBarFont('SUMMARY2', '굴림', '10', true, false, false, false); 

	
}

function setHeader(GridObj) {		
	//##번호##설비유형##제품코드##제품 명##3주평균 접근율##1주평균 접근율##안전재고##기초재고##금주생산계획
	//##금주판매계획##금주판매계획 대비 실적##1주평균 판매대비##예상재고(차주초)##차주계획대비재고일수
	//##차주실적대비재고일수##차주 생산계획##차주 보충요구량##차주 생산필요량##차주 요구/생산 차이
	//##판매계획가감량(1주평균)##판매계획가감량(3주평균)##차주 판매계획##차주판매계획 대비 실적
	//##차주 예상재고##차차주계획대비재고일수##차차주계획대비재고일수##차차주 보충요구량 
	//##차차주 생산필요량##차차주 판매계획##차차주 판매계획 대비 실적##차차주 예상재고##차차차주실적대비재고일수
	GridObj.AddHeader("C01",   "번호",      "t_text",	10,		30,    	true);
	GridObj.AddHeader("C02",   "설비유형",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C03",   "제품코드",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C04",   "제품 명",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C05",   "3주평균 접근율",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C06",   "1주평균 접근율",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C07",   "안전재고",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C08",   "기초재고",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C09",   "금주생산계획",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C10",   "금주판매계획",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C11",   "금주판매계획 대비 실적",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C12",   "1주평균 판매대비",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C13",   "예상재고(차주초)",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C14",   "차주계획대비재고일수",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C15",   "차주실적대비재고일수",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C16",   "차주 생산계획",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C17",   "차주 보충요구량",      "t_number",	50,		100,    	true);
	GridObj.AddHeader("C18",   "차주 생산필요량",      "t_number",	50,		100,    	true);
	GridObj.AddHeader("C19",   "차주 요구/생산 차이",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C20",   "판매계획가감량(1주평균)",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C21",   "판매계획가감량(3주평균)",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C22",   "차주 판매계획",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C23",   "차주판매계획 대비 실적",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C24",   "차주 예상재고",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C25",   "차차주계획대비재고일수",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C26",   "차차주계획대비재고일수",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C27",   "차차주 보충요구량",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C28",   "차차주 생산필요량",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C29",   "차차주 판매계획",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C30",   "차차주 판매계획 대비 실적",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C31",   "차차주 예상재고",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C32",   "차차차주실적대비재고일수",      "t_text",	50,		100,    	true);
	
	
	//계정!%!사용자명!%!그룹명!%!이메일!%!전화번호
	/*
	GridObj.AddHeader("SELECTED",   "선택",      "t_checkbox",	2,		30,    	true);
	GridObj.AddHeader("USER_ID", 	"계정",		"t_text", 		50, 	100, 	true);
	GridObj.AddHeader("USER_NAME", 	"사용자명",	"t_text", 		50, 	100, 	true);
	GridObj.AddHeader("GROUP_NAME", "그룹명",		"t_text", 		50, 	100, 	true);
	GridObj.AddHeader("EMAIL", 		"이메일",		"t_text", 		50, 	200, 	true);
	GridObj.AddHeader("PHON", 		"전화번호",	"t_text", 		50, 	200, 	true);
	*/
	/*
	GridObj.AddHeader("ITEM_FLAG", 		"????",		"t_combo", 		10, 	90,		true);	
	GridObj.AddHeader("VENDOR_NAME", 	"????",		"t_text", 		50, 	80,		true);
	GridObj.AddHeader("ITEM_CODE", 		"????",		"t_imagetext", 	20, 	100,	false);
	GridObj.AddHeader("ITEM_NAME", 		"???", 		"t_text", 		500, 	150,	true);	
	GridObj.AddHeader("SPECIFICATION", 	"??", 			"t_text", 		2000, 	200,	true);	
	GridObj.AddHeader("UNIT", 			"??",			"t_combo",		10, 	50,		true);
	GridObj.AddHeader("PRICE", 			"???", 		"t_number", 	22.3, 	80,		true);	
	GridObj.AddHeader("STOCK",			"???", 		"t_number", 	22,		60,		true);
	GridObj.AddHeader("ADD_DATE",		"???", 		"t_date", 		8,		85,		true);	
	GridObj.AddHeader("CHANGE_DATE",	"???", 		"t_date", 		8,		85,		true);	
	GridObj.AddHeader("SEQ_NO",			"SEQ_NO", 		"t_text", 		8,		85,		true);
	*/
	
	//AddHeader? ??? ? ??? ???? ?????
	GridObj.BoundHeader();	

	//GridObj.SetColHDCheckBoxValue("SELECTED", true);

	// ??? ???? ??? ??? ??? ??
	//GridObj.SetScrollTip("USER_NAME");
	
	//t_checkbox ??? ??? ??? ??????.
	//GridObj.SetColHDCheckBoxVisible("SELECTED", true);
	
	/*
	//?? ??? ???.
	GridObj.SetColHide("SEQ_NO", true);
	 
	//t_combo ??? ??? Combo List ? ????. 
	GridObj.AddComboListValue("ITEM_FLAG", "????", "CPU"); 
	GridObj.AddComboListValue("ITEM_FLAG", "???", "MEM"); 
	GridObj.AddComboListValue("ITEM_FLAG", "????", "MAB"); 
	GridObj.AddComboListValue("ITEM_FLAG", "?????", "VID"); 
	GridObj.AddComboListValue("ITEM_FLAG", "???", "MOR");
	GridObj.AddComboListValue("ITEM_FLAG", "?????", "HDD");
	GridObj.AddComboListValue("ITEM_FLAG", "CDROM", "CDR");
	GridObj.AddComboListValue("ITEM_FLAG", "???", "KEY");
	GridObj.AddComboListValue("ITEM_FLAG", "???", "MOU");

	GridObj.AddComboListValue("UNIT", "EA", "EA");

	//??????? ??? URL? ????
	GridObj.AddImageList("ITEM_CODE", "../../images/bt_search.gif");

	//?? ???? ????.
	GridObj.SetColCellFgColor("ITEM_CODE", "0|0|255");	
	
	//t_number ??? ??? ??????  ????.
	GridObj.SetNumberFormat("PRICE", "#,##0.00"); 
	GridObj.SetNumberFormat("STOCK", "#,##0"); 

	//t_date ??? ??? ??????  ????.
	GridObj.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
	GridObj.SetDateFormat("CHANGE_DATE", "yyyy/MM/dd");
 	*/
 	
	//??? Export?? ??? ??? ????. 
	//GridObj.SetExcelHeader("????", 20, 15, "center");

	//??? Export?? ??? Footer? ????.
 	//GridObj.SetExcelFooter("Copyright 2007 iCOMPIA CORP.", 15, 10, "right");
}

/* ?? */
function doQuery() {
	var GridObj = document.WiseGrid;
	
	//GridObj.SetCellValue( "USER_ID", 0, "admin2");
	//return;
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.PlantAllocSys";
	//alert(Project_name);
	//WiseGrid? ??? ??? Param? ????.
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("start_date", document.frm.sdate.value );
	if(document.frm.checked_domain[0].checked == true)
		GridObj.SetParam("domain", document.frm.checked_domain[0].value);
	else if(document.frm.checked_domain[1].checked == true)
		GridObj.SetParam("domain", document.frm.checked_domain[1].value);
	else if(document.frm.checked_domain[2].checked == true)
		GridObj.SetParam("domain", document.frm.checked_domain[2].value);
	else if(document.frm.checked_domain[3].checked == true)
		GridObj.SetParam("domain", document.frm.checked_domain[3].value);
		
	//checked_pa_pr
	if(document.frm.checked_pa_pr[0].checked == true)
		GridObj.SetParam("kind", document.frm.checked_pa_pr[0].value);
	else if(document.frm.checked_pa_pr[1].checked == true)
		GridObj.SetParam("kind", document.frm.checked_pa_pr[1].value);
	
	GridObj.SetParam("version", document.frm.plant_alloc_version.value);	
	

	//WiseGrid? ??? ???? ???? ????.
	GridObj.DoQuery(servlet_url);
}

/* ?? */
function doInsert() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.user_list";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "insert");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
}

/* ?? */
function doUpdata() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.sample.basic_example_select";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "update");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
}

/* ?? */
function doDelete() {
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/wisegrid.sample.basic_example_select";

	if(!chkSelected()) {
		alert("??? ?? ????.");
		return;	
	}

	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "delete");

	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
}

/* ??? ?????? ????. */
function chkSelected() {
	var GridObj = document.WiseGrid;
	chkCount = 0;

	for(i = 0; i < GridObj.GetRowCount(); i++) { //??? ???? ???? ????. 

		if(GridObj.GetCellValue("SELECTED", i) == "1") //??? ?? ?? ????. 
			chkCount = chkCount + 1;
	}
	
	if(chkCount == 0) {
		return false;	
	}
	return true;
}

/* ? ?? */
function doLineInsert() {
	var GridObj = document.WiseGrid;
	
	//???? ??? ?? ? ??? ????. 
	GridObj.AddRow();
	
	//??? ? SELECTED? Active? ??? ???? ?? ???.
	GridObj.SetCellValue("SELECTED",GridObj.GetActiveRowIndex(), "1");

	//ITEM_CODE ?? ??? ????? Active? ??? ???? ???? ????. 
	GridObj.SetCellImage('ITEM_CODE', GridObj.GetActiveRowIndex(), 0);

	//??? ?? ? ITEM_CODE? Active? ??? ???? ??? ???? ??.
	GridObj.SetCellActivation("ITEM_CODE", GridObj.GetActiveRowIndex(), "edit");
}

/* EXCEL ???? */
function excelDown() {
	var GridObj = document.WiseGrid;
	//???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
	GridObj.ExcelExport("", "", true, true);
}

/* WiseGrid? ?? ??? ?????? ????. */
function GridChangeCell(strColumnKey, nRow) {
	var GridObj = document.WiseGrid;
	if(strColumnKey != "SELECTED") {
		//??? ? SELECTED ?? ??? ??? ?? ???. 
		GridObj.SetCellValue("SELECTED", nRow, "1");
	}
}

/* ???? ??? ????? ???? ????. */
function GridEndQuery() {
	var GridObj = document.WiseGrid;
	//???? mode? ??? ????? ????.
	var mode = GridObj.GetParam("mode");

	if(mode == "search") {
		if(GridObj.GetStatus() == "true") { // ???? ??? ????? ????.
			//fieldset? ??? ?? ??.
			//document.all.message.style.display="none";
			//textarea?? ???.
			//document.frm.confirm.value =null;
			
			GridObj.SetGroupMerge("C01,C02"); 
	
			GridObj.AddSummaryBar('SUMMARY1', 'COLUMN1의 소계', 'C01', 'sum', 'C17,C18'); 
			GridObj.AddSummaryBar('SUMMARY2', 'COLUMN2의 소계', 'C02', 'sum', 'C17,C18'); 
			
			GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|0|0'); 
			GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '0|0|255'); 
			
			GridObj.SetSummaryBarFont('SUMMARY1', '굴림', '10', true, false, false, false); 
			GridObj.SetSummaryBarFont('SUMMARY2', '굴림', '10', true, false, false, false);
			
		} else	{ 
			var error_msg = GridObj.GetMessage(); // ???? ??? ?????? false?? ?????? ????.
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		if(GridObj.GetStatus() == "true") {// ???? ??? ????? ????.
			//???? insert_data ??? ????? ????.
			var insert_data = GridObj.GetParam("insert_data");				
			//fieldset? ??? ??.
			//document.all.message.style.display="";
			//textarea? ???? ??? insert_data? ??? ????? ???.
			document.frm.confirm.value = insert_data;
		} else	{
			var error_msg = GridObj.GetMessage(); // ???? ??? ?????? false?? ?????? ????.
			alert(error_msg);			
		}
	} else if(mode == "update") {
		if(GridObj.GetStatus() == "true") {// ???? ??? ????? ????.
			//???? update_data ??? ????? ????.
			var update_data = GridObj.GetParam("update_data");		
			//fieldset? ??? ??.
			//document.all.message.style.display="";
			//textarea? ???? ??? update_data ??? ????? ???.
			document.frm.confirm.value = update_data;
		} else	{
			var error_msg = GridObj.GetMessage();// ???? ??? ?????? false?? ?????? ????.
			alert(error_msg);			
		}
	} else if(mode == "delete") {
		if(GridObj.GetStatus() == "true") {// ???? ??? ????? ????.
			//???? delete_data ??? ????? ????.
			var delete_data = GridObj.GetParam("delete_data");			
			//fieldset? ??? ??.
			//document.all.message.style.display="";
			//textarea? ???? ??? delete_data ??? ????? ???.
			document.frm.confirm.value = delete_data;
			for( i = 0 ; i < document.WiseGrid.GetRowCount(); i ++) {				
				if(document.WiseGrid.GetCellValue('SELECTED',i) == 1) {					
					document.WiseGrid.DeleteRow(i);
					i--;					
				}
			}
		} else {
			var error_msg = GridObj.GetMessage();// ???? ??? ?????? false?? ?????? ????.
			alert(error_msg);			
		}
	}
}

function getdatetime() {
	var today = new Date();
	var year = today.getYear();
	var month = today.getMonth() + 1;
	var day = today.getDate();
	
	if(month < 10)
		month = "0" + month;
		
	if(day < 10)
		day = "0" + day;

	document.frm.to_date.value = year + "" + month + "" + day;
}


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
	
	// 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
	// ==> 화면이 더이상 축소되지 않음 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	//document.grid.height = tableHeightValue + "px"; 
	
} 

function GridCellClick(strColumnKey, nRow){
}