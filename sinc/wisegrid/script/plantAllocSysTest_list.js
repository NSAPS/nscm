
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
	
//	//����ڰ� ����� �巡���ؼ� �÷���ġ�� �̵��Ҽ� ����.
//	GridObj.bHDMoving = false;
//	
//	//����� �÷���ġ�̵� �޺���ư�� ��Ȱ��ȭ �Ѵ�.
//	GridObj.bHDSwapping = false;
//	
//	//�ο� �����͸� WiseGrid���� �����,. 
//	GridObj.bRowSelectorVisible = false;
//	
//	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.  
//	GridObj.strRowBorderStyle = "none";
//	
//	//RowSpacing���� ���Ѵ�. 
//	GridObj.nRowSpacing = 0;
//	
//	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
//	GridObj.strHDClickAction = "select";
//	
//	//���õ� ���� �������� �����Ѵ�.
//	GridObj.strActiveRowBgColor = "default"; 
	
	 

	//getdatetime();
	
	// ȭ�� �ε�� ������ ǥ��
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
	
	GridObj.AddSummaryBar('SUMMARY1', 'COLUMN1�� �Ұ�', 'C01', 'sum', 'C17,C18'); 
	GridObj.AddSummaryBar('SUMMARY2', 'COLUMN2�� �Ұ�', 'C02', 'sum', 'C17,C18'); 
	
	GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|0|0'); 
	GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '0|0|255'); 
	
	GridObj.SetSummaryBarFont('SUMMARY1', '����', '10', true, false, false, false); 
	GridObj.SetSummaryBarFont('SUMMARY2', '����', '10', true, false, false, false); 

	
}

function setHeader(GridObj) {		
	//##��ȣ##��������##��ǰ�ڵ�##��ǰ ��##3����� ������##1����� ������##�������##�������##���ֻ����ȹ
	//##�����ǸŰ�ȹ##�����ǸŰ�ȹ ��� ����##1����� �ǸŴ��##�������(������)##���ְ�ȹ�������ϼ�
	//##���ֽ����������ϼ�##���� �����ȹ##���� ����䱸��##���� �����ʿ䷮##���� �䱸/���� ����
	//##�ǸŰ�ȹ������(1�����)##�ǸŰ�ȹ������(3�����)##���� �ǸŰ�ȹ##�����ǸŰ�ȹ ��� ����
	//##���� �������##�����ְ�ȹ�������ϼ�##�����ְ�ȹ�������ϼ�##������ ����䱸�� 
	//##������ �����ʿ䷮##������ �ǸŰ�ȹ##������ �ǸŰ�ȹ ��� ����##������ �������##�������ֽ����������ϼ�
	GridObj.AddHeader("C01",   "��ȣ",      "t_text",	10,		30,    	true);
	GridObj.AddHeader("C02",   "��������",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C03",   "��ǰ�ڵ�",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C04",   "��ǰ ��",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C05",   "3����� ������",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C06",   "1����� ������",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C07",   "�������",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C08",   "�������",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C09",   "���ֻ����ȹ",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C10",   "�����ǸŰ�ȹ",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C11",   "�����ǸŰ�ȹ ��� ����",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C12",   "1����� �ǸŴ��",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C13",   "�������(������)",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C14",   "���ְ�ȹ�������ϼ�",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C15",   "���ֽ����������ϼ�",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C16",   "���� �����ȹ",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C17",   "���� ����䱸��",      "t_number",	50,		100,    	true);
	GridObj.AddHeader("C18",   "���� �����ʿ䷮",      "t_number",	50,		100,    	true);
	GridObj.AddHeader("C19",   "���� �䱸/���� ����",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C20",   "�ǸŰ�ȹ������(1�����)",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C21",   "�ǸŰ�ȹ������(3�����)",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C22",   "���� �ǸŰ�ȹ",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C23",   "�����ǸŰ�ȹ ��� ����",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C24",   "���� �������",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C25",   "�����ְ�ȹ�������ϼ�",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C26",   "�����ְ�ȹ�������ϼ�",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C27",   "������ ����䱸��",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C28",   "������ �����ʿ䷮",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C29",   "������ �ǸŰ�ȹ",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C30",   "������ �ǸŰ�ȹ ��� ����",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C31",   "������ �������",      "t_text",	50,		100,    	true);
	GridObj.AddHeader("C32",   "�������ֽ����������ϼ�",      "t_text",	50,		100,    	true);
	
	
	//����!%!����ڸ�!%!�׷��!%!�̸���!%!��ȭ��ȣ
	/*
	GridObj.AddHeader("SELECTED",   "����",      "t_checkbox",	2,		30,    	true);
	GridObj.AddHeader("USER_ID", 	"����",		"t_text", 		50, 	100, 	true);
	GridObj.AddHeader("USER_NAME", 	"����ڸ�",	"t_text", 		50, 	100, 	true);
	GridObj.AddHeader("GROUP_NAME", "�׷��",		"t_text", 		50, 	100, 	true);
	GridObj.AddHeader("EMAIL", 		"�̸���",		"t_text", 		50, 	200, 	true);
	GridObj.AddHeader("PHON", 		"��ȭ��ȣ",	"t_text", 		50, 	200, 	true);
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
	
			GridObj.AddSummaryBar('SUMMARY1', 'COLUMN1�� �Ұ�', 'C01', 'sum', 'C17,C18'); 
			GridObj.AddSummaryBar('SUMMARY2', 'COLUMN2�� �Ұ�', 'C02', 'sum', 'C17,C18'); 
			
			GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|0|0'); 
			GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '0|0|255'); 
			
			GridObj.SetSummaryBarFont('SUMMARY1', '����', '10', true, false, false, false); 
			GridObj.SetSummaryBarFont('SUMMARY2', '����', '10', true, false, false, false);
			
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
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