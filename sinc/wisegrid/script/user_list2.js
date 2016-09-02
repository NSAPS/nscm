
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
//	
//	GridObj.SetGroupMerge("SELECTED,USER_ID"); 
	
	//GridObj.AddSummaryBar('SUMMARY1', 'COLUMN1의 소계', 'USER_ID', 'sum', 'C17,C18'); 
	//GridObj.AddSummaryBar('SUMMARY2', 'COLUMN2의 소계', 'C02', 'sum', 'C17,C18'); 
	
	//GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|0|0'); 
	//GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '0|0|255'); 
	
	//GridObj.SetSummaryBarFont('SUMMARY1', '굴림', '10', true, false, false, false); 
	//GridObj.SetSummaryBarFont('SUMMARY2', '굴림', '10', true, false, false, false); 

	//getdatetime();
	
	// 화면 로드시 데이터 표시
	//doQuery();
}

function setHeader(GridObj) {		
	//계정!%!사용자명!%!그룹명!%!이메일!%!전화번호
	GridObj.AddHeader("SELECTED",   "선택",      "t_checkbox",	2,		30,    	true);
	GridObj.AddHeader("USER_ID", 	"계정",		"t_text", 		50, 	100, 	true);
	GridObj.AddHeader("USER_NAME", 	"사용자명",	"t_text", 		50, 	100, 	true);
	GridObj.AddHeader("GROUP_NAME", "그룹명",		"t_text", 		50, 	100, 	true);
	GridObj.AddHeader("EMAIL", 		"이메일",		"t_text", 		50, 	200, 	true);
	GridObj.AddHeader("PHON", 		"전화번호",	"t_text", 		50, 	200, 	true);

	
	
	
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

	GridObj.SetColHDCheckBoxValue("SELECTED", true);

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
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.user_list";
	//alert(Project_name);
	//WiseGrid? ??? ??? Param? ????.
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("_board_search_condition", document.frm._board_search_condition.value );
	GridObj.SetParam("_board_search_value", document.frm._board_search_value.value);
	 
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
			document.all.message.style.display="none";
			//textarea?? ???.
			document.frm.confirm.value =null;
			
			GridObj.SetGroupMerge("SELECTED,USER_ID"); 
		} else	{ 
			var error_msg = GridObj.GetMessage(); // ???? ??? ?????? false?? ?????? ????.
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		if(GridObj.GetStatus() == "true") {// ???? ??? ????? ????.
			//???? insert_data ??? ????? ????.
			var insert_data = GridObj.GetParam("insert_data");				
			//fieldset? ??? ??.
			document.all.message.style.display="";
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
			document.all.message.style.display="";
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
			document.all.message.style.display="";
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