//############################################################
//## Щ煎斜極ID 	: rp_01120_outOderAdjust_list.js
//## Щ煎斜極貲 	: 轎堅僭榆 褻�� 塽 褻薑
//## 偃嫦濠  	: 薑營掖
//## 偃嫦橾濠 	: 2009-04-01 跡蹂橾
//##
//## 婦溼 job file 	 : 
//##
//## 婦溼 query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-04-01  薑營掖     rp_01120_outOderAdjust_list.js 偃嫦
//##
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;													// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";						// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'rp_01120_outOrderAdjust_list';				// job id(憮綰葩 貲, WiseGrid Header key)
var job_id2 = 'rp_01120_outOrderAdjust_list02';
var GridObj ; 												// WiseGrid 偌羹
var GridObj2;

var color_tot = '224|224|224';
var color_edit_col = '255|253|208';

var oldRow = 0;

var rFirst = 0;

/******************************************          Action Function         **********************************************/
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service) {
	
	var versions_seq = document.frm.plan_version.value;
	if( versions_seq == "" || versions_seq == null ) {
		alert("幗瞪擊 摹鷗ж撮蹂.");
		return;
	}
	if( document.frm.trans_start.value == "" || document.frm.trans_start.value == null ) {
		alert("熱歎橾濠蒂 殮溘ж罹 輿褊衛蹂.");
		return;
	}
	
	if( document.frm.item_id.value == "" || document.frm.item_id.value == null ) {
		alert("薯ヶ囀萄蒂 殮溘ж罹 輿褊衛蹂.");
		return;
	}
	
	var verArr = versions_seq.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	
	rFirst = 0;
	doQuery();
	doQuery2();
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛盪濰
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave() {
	
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var trans_date = document.frm.trans_start.value;
	var item_id = document.frm.item_id.value;
	// 幗瞪, 離熱蒂 摹鷗ж雖 彊擎 唳辦
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("幗瞪擊 試盪 摹鷗ж堅 等檜攪 褻�� ��, 盪濰檜 陛棟м棲棻.");
		return;
	}
	
	if( trans_date == null || trans_date == ""){
		alert("熱歎橾濠蒂 試盪 摹鷗ж堅 等檜攪 褻�� ��, 盪濰檜 陛棟м棲棻.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("薯ヶ 囀萄蒂 試盪 殮溘ж堅 等檜攪 褻�� ��, 盪濰檜 陛棟м棲棻.");
		return;
	}
	
	
	// 棻衛 �挫�
	if(!confirm("盪濰ж衛啊蝗棲梱?"))
		return;
	
	doSave(version, seq, trans_date, item_id);	
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛離晦幗瞪 啗�凳暆� 幗が 贗葛衛.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoCreate(service) {
	
	var trans_date = document.frm.trans_start.value;
	var item_id = document.frm.item_id.value;

	if( trans_date == null || trans_date == ""){
		alert("熱歎橾濠蒂 試盪 摹鷗ж堅 等檜攪蒂 褻�� ж敷撿 啗�嘀� 奩艙檜 陛棟м棲棻.");
		return;
	}
	
	if( item_id == null || item_id == ""){
		alert("薯ヶ 囀萄蒂 試盪 殮溘ж堅 等檜攪蒂 褻�� ж敷撿 啗�嘀� 奩艙檜 陛棟м棲棻.");
		return;
	}
	
	
	// 棻衛 �挫�
	if(!confirm("啗�嘀� 奩艙ж衛啊蝗棲梱?"))
		return;
	
	doCreate(trans_date, item_id);		
}

/*******************************************   WiseGrid 蟾晦�� 塽 撲薑  *****************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 蟾晦��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); 	// 晦獄 property 撲薑
	setDefault(GridObj);  			// 蹺陛 property 撲薑
	setHeader();   			// Header 撲薑
			
}

function init2() {
	
	GridObj2 = document.WiseGrid2;
	
	setProperty(GridObj2); 	// 晦獄 property 撲薑
	setDefault(GridObj2);  			// 蹺陛 property 撲薑
	setHeader2();   			// Header 撲薑
			
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛Property 撲薑
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault(GridObj){
	
	GridObj.bUserContextMenu = true;				//餌辨濠 鐘臢蝶お 詭景曖 餌辨 罹睡蒂 唸薑и棻. 
	GridObj.bHDMoving = false;                  	//餌辨濠陛 ④渦蒂 萄楚斜п憮 鏽歲嬪纂蒂 檜翕й熱 橈棻.
	GridObj.bHDSwapping = false;                	//④渦曖 鏽歲嬪纂檜翕 巍爾幗が擊 綠�側瘓� и棻.
	GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻. 
	GridObj.strRowBorderStyle = "none";         	//煎辦曖 纔舒葬縑 嬴鼠匙紫 釭顫釭雖 彊朝棻.
	GridObj.nRowSpacing = 0;                    	//RowSpacing高擊 薑и棻. 
	GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	//GridObj.strSelectedCellBgColor = '238|0|238'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	
	// Header Font Setting
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	
	// Cell Font Setting
	GridObj.nCellFontSize = 8.5;					// Font Size 9
	
	//Hearder 堪檜
	GridObj.nHDLineSize   = 15;   //12
	
	// Grid ч 堪檜
    GridObj.nRowHeight    = 23;    //22
    
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj.strSelectedCellFgColor = '180|82|205'; 
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2; 
    
   
    /* Context Menu 餌辨濠 MENU 蹺陛 */
    GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row 蹺陛");   
 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader() 
{        
    commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
}

function setHeader2() 
{        
    commonUtil.getCodeList("job_id", job_id2 , "gird_header_list",defaultHeader2); 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function defaultHeader(result)
{
	var arrHeader = '';
	
	for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	
	GridObj.AddGroup("TRANS_PLAN", "滲唳");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("TRANS_PLAN", "TRANS_PLAN_PLT");
	GridObj.AppendHeader("TRANS_PLAN", "TRANS_PLAN_QTY");
	
	GridObj.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
	
	GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");
	
	GridObj.SetColHide("CRUD", true); 
	GridObj.SetColHide("BOX_PER_PLT", true);
	GridObj.SetColHide("OLD_SAFE_QTY", true);
	GridObj.SetColHide("OLD_BOX_QTY", true);
	GridObj.SetColHide("OLD_SRC_LOC", true);
	GridObj.SetColHide("SAFE_UPDATE_FLAG", true);
	GridObj.SetColHide("PLAN_UPDATE_FLAG", true);
	GridObj.SetColHide("UNIT_UPDATE_FLAG", true);
	
	GridObj.SetNumberFormat("TRANS_PLAN_PLT", "###,##0.00"); // 璋濠 ⑽衝
	GridObj.SetNumberFormat("TRANS_PLAN_QTY"  , "###,##0.0");
	GridObj.SetNumberFormat("SAFETY_STOCK"  , "###,###,###");
	GridObj.SetNumberFormat("MIN_PICK_QTY"  , "###,###,###");

	GridObj.SetNumberFormat("MON_QTY"  , "###,###,###");
	GridObj.SetNumberFormat("BEFORE_SALE_QTY"  , "###,###,###");
	GridObj.SetNumberFormat("SALE_CUM_QTY"  , "###,###,###");
	GridObj.SetNumberFormat("TODAY_SALE_PLAN"  , "###,###,###");
	GridObj.SetNumberFormat("ORD_QTY"  , "###,###,###");
	GridObj.SetNumberFormat("WEEK1_QTY"  , "###,###,###");
	GridObj.SetNumberFormat("WEEK3_QTY"  , "###,###,###");
	GridObj.SetNumberFormat("TODAY_STOCK"  , "###,###,###");
	GridObj.SetNumberFormat("IN_TRANS_QTY"  , "###,###,###");
	GridObj.SetNumberFormat("OUT_TRANS_QTY"  , "###,###,###");
	GridObj.SetNumberFormat("STOCK_DAY"  , "###,###,###");
	GridObj.SetNumberFormat("STOCK_TERM"  , "###,###,###");
	GridObj.SetNumberFormat("SALE_QTY2"  , "###,###,###");
	GridObj.SetNumberFormat("ORD_QTY2"  , "###,###,###");
	GridObj.SetNumberFormat("STOCK_QTY1"  , "###,###,###");
	GridObj.SetNumberFormat("REP_QTY"  , "###,###,###");
	GridObj.SetNumberFormat("STOCK_QTY2"  , "###,###,###");
	

	           
}

function defaultHeader2(result)
{
	var arrHeader = '';
	
	for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	
	commonUtil.getSelQeury( "", "", "dailyTransportPlanSchPlan_dateList",{
		callback:function(result){
						
			if(result.length > 0){
				for( i = 0 ; i < result[0].length ; i++ ){
					if( i == 0 ){
						GridObj2.AddGroup("HEADER_DATE" + i, result[0][i]);
						GridObj2.AppendHeader("HEADER_DATE" + i, "D01");
					}
					else{
			    		GridObj2.AddGroup("HEADER_DATE" + i, result[0][i]);			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
						GridObj2.AppendHeader("HEADER_DATE" + i, "D0" + (i+1) + "SH1");
						GridObj2.AppendHeader("HEADER_DATE" + i, "D0" + (i+1) + "SH3");
						GridObj2.AppendHeader("HEADER_DATE" + i, "D0" + (i+1) + "SH5");
					}
				}
			}
			
			GridObj2.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
			GridObj2.SetColHide("ITEM", true);
			GridObj2.SetColFix('PLANT_NAME');
		}
	});           
}

/***********************************************   WiseGrid 鱔褐  **********************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", "search");
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄
	
	var item_id = document.frm.item_id.value;
	var trans_start = document.frm.trans_start.value;
	var version = document.frm.version.value;
	var sales_yyyy = document.frm.sales_yyyy.value;
	var sales_version = document.frm.sales_version.value;
	var seq = document.frm.seq.value;
	
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("trans_start", trans_start);
	GridObj.SetParam("version", version);
	GridObj.SetParam("sales_yyyy", sales_yyyy);
	GridObj.SetParam("sales_version", sales_version);
	GridObj.SetParam("seq", seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj.SetParam("query_id", "rp_01120_outOrderAdjustNew_list");
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url);
}

function doQuery2() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id2;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj2.SetParam("mode", "search");
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄

	var item_id = document.frm.item_id.value;
	var trans_start = document.frm.trans_start.value;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("trans_start", trans_start);
	GridObj2.SetParam("version", version);
	GridObj2.SetParam("seq", seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01010_dailyTransportPlanSchPlan_pop");
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj2.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛盪濰
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doSave(version, seq, trans_date, item_id) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", "save");
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	GridObj.SetParam("version",version);
	GridObj.SetParam("seq",seq);
	GridObj.SetParam("trans_date",trans_date);
	GridObj.SetParam("item_id",item_id);
	
	var stock_type = "";
	if(document.frm.stock_type[0].checked == true) stock_type = "base";
	else stock_type = "prod";
	GridObj.SetParam("stock_type", stock_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛離晦幗瞪 啗�凳暆�
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doCreate(trans_date, item_id) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", "create");
	
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄
	GridObj.SetParam("version",version);
	GridObj.SetParam("seq",seq);
	GridObj.SetParam("trans_date",trans_date);
	GridObj.SetParam("item_id",item_id);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}

/* INSERT */
function doInsert() {

}

/* UPDATE */
function doUpdata() {

}

/* DELET */
function doDelete() {

}

/* CHECK SELECTED */
function chkSelected() {

}

/* LINE INSERT */
function doLineInsert() {

}

/* EXCEL DWON */
function excelDown() {

}

/*******************************************   WiseGrid 鱔褐 ��  撲薑  ******************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛	WiseGrid 鱔褐 �� Grid 撲薑 塽 褒ч Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() {
		
	// wiseGrid縑憮 檜鼻詭撮雖 �挫怷�!
	if(GridObj.GetStatus() != "true") {
		var error_msg_extra = GridObj.GetMessage();// ?
		//alert("(GridObj)檜 詭撮雖蒂 爾賊 �挫庛瑆撙� 殘雖 葆衛堅!!! 陴錠辨 傳朝 掏辨雙縑啪 瞪�倆� 輿撮蹂!\n" + error_msg_extra);	
		return;
	}

	setGrid(GridObj); //WiseGrid 撲薑
			
	//
	var end_mode = GridObj.GetParam("mode");

	if(end_mode == "search") { //褻��
		if(GridObj.GetStatus() == "true") { // 
			// 葆雖虞 滲唳и Row煎 檜翕
			if( rFirst < GridObj.GetRowCount()){
				//GridObj.MoveRow(rFirst);
				GridObj.SetRowScroll(rFirst);
			}			
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(end_mode == "insert") {
		
	} else if(end_mode == "update") {
		
	} else if(end_mode == "delete") {
		
	}else if(end_mode == "save") {
		if(GridObj.GetStatus() == "true") {// 
			doQuery();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(end_mode == "create"){ //離晦幗瞪 啗�凳暆�
		if(GridObj.GetStatus() == "true") {// 
			
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}
}

function GridEndQuery2() {
		
	// wiseGrid縑憮 檜鼻詭撮雖 �挫怷�!
	if(GridObj2.GetStatus() != "true") {
		var error_msg_extra = GridObj2.GetMessage();// ?
		//alert("(GridObj2)檜 詭撮雖蒂 爾賊 �挫庛瑆撙� 殘雖 葆衛堅!!! 陴錠辨 傳朝 掏辨雙縑啪 瞪�倆� 輿撮蹂!\n" + error_msg_extra);	
		return;
	}

	setGrid2(GridObj2); //WiseGrid 撲薑
			
	//
	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search") { //褻��
		if(GridObj2.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj2.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(end_mode == "insert") {
		
	} else if(end_mode == "update") {
		
	} else if(end_mode == "delete") {
		
	}else if(end_mode == "save") {
		if(GridObj2.GetStatus() == "true") {// 
			//GoSearch("");
		} else {
			var error_msg = GridObj2.GetMessage();// 
			alert(error_msg);			
		}
	}else if(end_mode == "trans"){ //瞪歎
		if(GridObj2.GetStatus() == "true") {// 
			document.frm.checked_po_type[1].checked = true;
		} else {
			var error_msg = GridObj2.GetMessage();// 
			alert(error_msg);			
		}
	}
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 撲薑
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setGrid(){
	
	// 鏽歲 堅薑
	GridObj.SetColFix('DC_NAME');

	// 鏽歲 斜瑜
	GridObj.SetGroupMerge('DC_NAME,MON_QTY,BEFORE_SALE_QTY,SALE_CUM_QTY,TODAY_SALE_PLAN,ORD_QTY,WEEK1_QTY,WEEK3_QTY,TODAY_STOCK,IN_TRANS_QTY,OUT_TRANS_QTY,STOCK_DAY,STOCK_TERM,SALE_QTY2,ORD_QTY2,STOCK_QTY1,REP_QTY,STOCK_QTY2'); 
	
	// ら餵 罹睡 撲薑
	//GridObj.SetColCellActivation('SP01','disable');
	
	//鏽歲 旋濠儀
	//GridObj.SetCellFgColor('C38', i, '255|10|10');
	
	// 撚 寡唳
	//GridObj.SetCellBgColor('C02', 1, '10|10|255');
	
	// Get Hidden Value 
	//GridObj.GetCellHiddenValue('ITEM_NAME',0) 
	
	// м啗
	//GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36'); 
	//GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
			
	// 鏽歲 寡唳儀
	GridObj.SetColCellBgColor('SAFETY_STOCK',color_edit_col);//寰瞪營堅
	GridObj.SetColCellBgColor('TRANS_PLAN_PLT',color_edit_col);//PLT
	GridObj.SetColCellBgColor('TRANS_PLAN_QTY',color_edit_col);//BOX
	GridObj.SetColCellBgColor('MIN_PICK_QTY',color_edit_col);//譆模熱歎欽嬪
    
    // 葆雖虞 滲唳и Row煎 檜翕
    //GridObj.MoveRow(rowIndex);
    
    var rowCnt = GridObj.GetRowCount();
    for ( i = 0 ; i < rowCnt ; i++ ){
    	var dc_name = GridObj.GetCellValue("DC_NAME", i);
	    if( dc_name == "瞪羹 м啗" || dc_name == "CDC м啗" || dc_name == "RDC м啗" ){
	    	GridObj.SetRowBgColor(i, color_tot); // row 寡唳儀
	    	GridObj.SetCellFontBold('DC_NAME', i, 'true'); // font 掃晦  
	    	GridObj.SetCellActivation('SAFETY_STOCK', i, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻. 
	    	GridObj.SetCellActivation('TRANS_PLAN_PLT', i, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻. 
	    	GridObj.SetCellActivation('TRANS_PLAN_QTY', i, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻. 
	    	GridObj.SetCellActivation('SRC_LOC', i, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻. 
	    	GridObj.SetCellActivation('MIN_PICK_QTY', i, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻. 
	    }
    }
    
//    if( GridObj.GetRowCount() > 0 ){
//    	GridObj.MoveRow(oldRow);
//    }
    
}

function setGrid2(){
	
	// 鏽歲 斜瑜
	//GridObj.SetGroupMerge('PLANT_NAME,PROC_NAME'); 
	
	// 鏽歲 堅薑
	//GridObj2.SetColFix('PLANT_NAME');
	
	// ら餵 罹睡 撲薑
	//GridObj.SetColCellActivation('SP01','disable');
	
	//鏽歲 旋濠儀
	//GridObj.SetCellFgColor('C38', i, '255|10|10');
	
	// 撚 寡唳
	//GridObj.SetCellBgColor('C02', 1, '10|10|255');
	
	// Get Hidden Value 
	//GridObj.GetCellHiddenValue('ITEM_NAME',0) 
	
	// м啗
	GridObj2.AddSummaryBar('SUMMARY1', '瞪羹м啗', 'summaryall', 'sum', 'AVAIL,TRANS,STOCK,D01,D02SH1,D02SH3,D02SH5,D03SH1,D03SH3,D03SH5,D04SH1,D04SH3,D04SH5,D05SH1,D05SH3,D05SH5,D06SH1,D06SH3,D06SH5,D07SH1,D07SH3,D07SH5'); 
	GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '223|223|223'); 

			
	// 鏽歲 寡唳儀
	//GridObj.SetColCellBgColor('SAFETY_STOCK',color_edit_col);//寰瞪營堅
	
    
    // 葆雖虞 滲唳и Row煎 檜翕
    //GridObj.MoveRow(rowIndex);
    
	GridObj2.SetNumberFormat("AVAIL", "###,###,###"); // 璋濠 ⑽衝
	GridObj2.SetNumberFormat("TRANS", "###,###,###"); // 璋濠 ⑽衝
	GridObj2.SetNumberFormat("STOCK", "###,###,###"); // 璋濠 ⑽衝
	GridObj2.SetNumberFormat("D01", "###,###,###"); // 璋濠 ⑽衝
	GridObj2.SetNumberFormat("D02SH1", "###,###,###");
	GridObj2.SetNumberFormat("D02SH3", "###,###,###");
	GridObj2.SetNumberFormat("D02SH5", "###,###,###");
	GridObj2.SetNumberFormat("D03SH1", "###,###,###");
	GridObj2.SetNumberFormat("D03SH3", "###,###,###");
	GridObj2.SetNumberFormat("D03SH5", "###,###,###");
	GridObj2.SetNumberFormat("D04SH1", "###,###,###");
	GridObj2.SetNumberFormat("D04SH3", "###,###,###");
	GridObj2.SetNumberFormat("D04SH5", "###,###,###");
	GridObj2.SetNumberFormat("D05SH1", "###,###,###");
	GridObj2.SetNumberFormat("D05SH3", "###,###,###");
	GridObj2.SetNumberFormat("D05SH5", "###,###,###");
	GridObj2.SetNumberFormat("D06SH1", "###,###,###");
	GridObj2.SetNumberFormat("D06SH3", "###,###,###");
	GridObj2.SetNumberFormat("D06SH5", "###,###,###");
	GridObj2.SetNumberFormat("D07SH1", "###,###,###");
	GridObj2.SetNumberFormat("D07SH3", "###,###,###");
	GridObj2.SetNumberFormat("D07SH5", "###,###,###");
    
}

/*********************************************   WiseGrid Event   *********************************************************/ 
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Mouse Over Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridMouseOverHandler(strType, strColumnKey, nRow){ 

};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid User Context Menu Click Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
		
	if( strMenuKey == "MENU_CELL" ){// CELL 贗葛衛 詭景
		
		if( strMenuItemKey == "MENU01" ){		// ROW 蹺陛
		
			insertRow( nRow );	
			
		}
		else {
			alert("襄營 ж雖 彊擎 詭景殮棲棻.");
		}		
	}

};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Change Combo Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	oldRow = nRow;
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Scroll Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
};

//--------------------------------------   main_template 縑 薑曖脹 Event ---------------------------------------------------//
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeCell(strColumnKey, nRow) {
//	setChangeCheckFlag(objBox);
	if( strColumnKey == "TRANS_PLAN_PLT" || strColumnKey == "TRANS_PLAN_QTY" ){
		// BOX 檣 唳辦
		if( strColumnKey == "TRANS_PLAN_QTY" ) {
			// PLT 熱榆 啗骯
			var boxQty = Number(GridObj.GetCellValue("TRANS_PLAN_QTY", nRow));
			var boxPerPalet = Number(GridObj.GetCellValue("BOX_PER_PLT", nRow));
			var resultQty = Math.round(boxQty*100 / boxPerPalet)/100;
			GridObj.SetCellValue("TRANS_PLAN_PLT", nRow, resultQty	);

		}
		// PLT 檣 唳辦
		if( strColumnKey == "TRANS_PLAN_PLT" ) {
			// Box 熱榆 啗骯
			var pltQty = Number(GridObj.GetCellValue("TRANS_PLAN_PLT", nRow));
			var boxPerPalet = Number(GridObj.GetCellValue("BOX_PER_PLT", nRow));
			var resultQty = Math.round(Math.round(pltQty * boxPerPalet*100)/100,0);
			GridObj.SetCellValue("TRANS_PLAN_QTY", nRow, resultQty	);
		}
		
		// 滲唳 Ы楚斜
		GridObj.SetCellValue("PLAN_UPDATE_FLAG", nRow, "Y");
		
		oldRow = nRow;
	}
	else if( strColumnKey == "SAFETY_STOCK" ){
		// 滲唳 Ы楚斜
		GridObj.SetCellValue("SAFE_UPDATE_FLAG", nRow, "Y");
		
		oldRow = nRow;
	}
	else if( strColumnKey == "MIN_PICK_QTY" ){
		// 滲唳 Ы楚斜
		GridObj.SetCellValue("UNIT_UPDATE_FLAG", nRow, "Y");
		
		oldRow = nRow;
	}

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Click Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow){
	var dc_name = GridObj.GetCellValue("DC_NAME", nRow);
	if( (strColumnKey == "TRANS_PLAN_PLT" || strColumnKey == "TRANS_PLAN_QTY")
		&& ( dc_name != "瞪羹 м啗" && dc_name != "CDC м啗" && dc_name != "RDC м啗" ) ){

		// 轎堅濰擊 摹鷗ж雖 彊堅 高擊 熱薑ж溥堅 и 唳辦..
		var dc_id = GridObj.GetCellValue("SRC_LOC", nRow);
		if( dc_id == "" || dc_id == null){
			alert("PLT, BOX高擊 熱薑ж晦 瞪縑 轎堅濰擊 試盪 摹鷗ж罹 輿褊衛蹂.");
			GridObj.SetCellFocus('SRC_LOC', nRow, true) 
			return;
		}

		// 轎堅濰 傳朝 薯ヶ囀萄 等檜攪陛 橈朝 唳辦 л熱蒂 緒螳釭除棻
		var item_id = document.frm.item_id.value;
		if( item_id == null || item_id == "" ){
			return
		}		
		
		replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet_new", { 
		//replenishPlan.getBoxPerPalet(DC_SHORT_NAME, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
			callback:function(boxPerPalet){
				if( boxPerPalet == null || boxPerPalet == "" ) {
					GridObj.SetCellValue("BOX_PER_PLT", nRow, '100');
				}
				else {
					GridObj.SetCellValue("BOX_PER_PLT", nRow, boxPerPalet);
				}
			}
		});	
	}
}

/*********************************************   晦顫 Function   **********************************************************/
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setWiseGridAutoResize( tab_h, table_h ){
	
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
	
	// �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
	// ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	//tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Insert Row Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	
	if( rowCnt-1 == nRow ){ // 葆濠虞 塭檣橾 唳辦 
		GridObj.InsertRow(-1);
	}else{
		GridObj.InsertRow(nRow+1);
	}
	
	// 晦獄 等檜攪 撢た
	GridObj.SetCellValue("DC_NAME"			, nRow+1, GridObj.GetCellValue("DC_NAME"	     , nRow));
	//GridObj.SetCellHiddenValue("DC_NAME"	, nRow+1, GridObj.GetCellHiddenValue("DC_NAME", nRow));
	GridObj.SetCellHiddenValue("DC_NAME"	, nRow+1, GridObj.GetCellHiddenValue("DC_NAME", nRow));
	GridObj.SetCellValue("MON_QTY"			, nRow+1, GridObj.GetCellValue("MON_QTY"          , nRow));
	GridObj.SetCellValue("BEFORE_SALE_QTY"	, nRow+1, GridObj.GetCellValue("BEFORE_SALE_QTY"  , nRow));
	GridObj.SetCellValue("SALE_CUM_QTY"		, nRow+1, GridObj.GetCellValue("SALE_CUM_QTY"	  , nRow));
	GridObj.SetCellValue("TODAY_SALE_PLAN"  , nRow+1, GridObj.GetCellValue("TODAY_SALE_PLAN"  , nRow));
	GridObj.SetCellValue("ORD_QTY"		    , nRow+1, GridObj.GetCellValue("ORD_QTY"		  , nRow));
	GridObj.SetCellValue("WEEK1_QTY"		, nRow+1, GridObj.GetCellValue("WEEK1_QTY"		  , nRow));
	GridObj.SetCellValue("WEEK3_QTY"		, nRow+1, GridObj.GetCellValue("WEEK3_QTY"		  , nRow));
	GridObj.SetCellValue("TODAY_STOCK"	    , nRow+1, GridObj.GetCellValue("TODAY_STOCK"	  , nRow));
	GridObj.SetCellValue("IN_TRANS_QTY"	    , nRow+1, GridObj.GetCellValue("IN_TRANS_QTY"	  , nRow));
	GridObj.SetCellValue("OUT_TRANS_QTY"	, nRow+1, GridObj.GetCellValue("OUT_TRANS_QTY"	  , nRow));
	GridObj.SetCellValue("STOCK_DAY"		, nRow+1, GridObj.GetCellValue("STOCK_DAY"		  , nRow));
	GridObj.SetCellValue("STOCK_TERM"	    , nRow+1, GridObj.GetCellValue("STOCK_TERM"	      , nRow));
	GridObj.SetCellValue("SAFETY_STOCK"	    , nRow+1, GridObj.GetCellValue("SAFETY_STOCK"	  , nRow));
	GridObj.SetCellValue("SALE_QTY2"		, nRow+1, GridObj.GetCellValue("SALE_QTY2"		  , nRow));
	GridObj.SetCellValue("ORD_QTY2"		    , nRow+1, GridObj.GetCellValue("ORD_QTY2"		  , nRow));
	GridObj.SetCellValue("STOCK_QTY1"	    , nRow+1, GridObj.GetCellValue("STOCK_QTY1"	      , nRow));
	GridObj.SetCellValue("REP_QTY"		    , nRow+1, GridObj.GetCellValue("REP_QTY"		  , nRow));
	//GridObj.SetCellValue("TRANS_PLAN_PLT"   , nRow+1, GridObj.GetCellValue("TRANS_PLAN_PLT"   , nRow));
	//GridObj.SetCellValue("TRANS_PLAN_QTY"   , nRow+1, GridObj.GetCellValue("TRANS_PLAN_QTY"   , nRow));
	GridObj.SetComboSelectedHiddenValue("SRC_LOC"	, nRow+1, GridObj.GetCellHiddenValue("SRC_LOC"	, nRow));
	GridObj.SetCellValue("STOCK_QTY2"	    , nRow+1, GridObj.GetCellValue("STOCK_QTY2"	      , nRow));
	GridObj.SetCellValue("MIN_PICK_QTY"	    , nRow+1, GridObj.GetCellValue("MIN_PICK_QTY"	  , nRow));
	GridObj.SetCellValue("BOX_PER_PLT"	    , nRow+1, GridObj.GetCellValue("BOX_PER_PLT"	  , nRow));
	GridObj.SetCellValue("OLD_SAFE_QTY"	    , nRow+1, GridObj.GetCellValue("OLD_SAFE_QTY"	  , nRow));
	GridObj.SetCellValue("OLD_BOX_QTY"	    , nRow+1, GridObj.GetCellValue("OLD_BOX_QTY"	  , nRow));
	//GridObj.SetCellValue("OLD_SRC_LOC"	    , nRow+1, GridObj.GetCellValue("OLD_SRC_LOC"	  , nRow));
	GridObj.SetCellValue("SAFE_UPDATE_FLAG" , nRow+1, GridObj.GetCellValue("SAFE_UPDATE_FLAG" , nRow));
	GridObj.SetCellValue("PLAN_UPDATE_FLAG" , nRow+1, GridObj.GetCellValue("PLAN_UPDATE_FLAG" , nRow));
	GridObj.SetCellValue("UNIT_UPDATE_FLAG" , nRow+1, GridObj.GetCellValue("UNIT_UPDATE_FLAG" , nRow));

};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛轎堅餌機濰檜釭 PLT, BOX, 譆模熱歎欽嬪蒂 熱薑ж艘擊陽, 
  弛熱薑腎歷棻朝 Flag蒂 陴晦晦 嬪и Function
  弛熱薑脹 Flag蒂 鱔п憮, DML濛機擊 褒ч 嶸鼠蒂 っ欽.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/	
//function setChangeCheckFlag(strColumnKey, nRow /*objBox*/){
//	//var rowIdx = objBox.parentNode.parentNode.rowIndex;
//	// => nRow
//	
//	// 轎堅餌機濰, PLT, BOX 陛 熱薑脹 唳辦.
//	if( strColumnKey == "SRC_LOC" || strColumnKey == "TRANS_PLAN_PLT" || strColumnKey == "TRANS_PLAN_QTY"){
//		
//		if(document.frm.plan_update_flag[rowIdx])
//			document.frm.plan_update_flag[rowIdx].value = "Y";
//		else
//			document.frm.plan_update_flag.value = "Y";
//	}
//	// 譆模熱歎欽嬪陛 熱薑脹 唳辦.
//	else if(objBox.name == "min_trans_qty"){
//		
//		if(document.frm.unit_update_flag[rowIdx])
//			document.frm.unit_update_flag[rowIdx].value = "Y";
//		else
//			document.frm.unit_update_flag.value = "Y";
//	}
//	// 寰瞪營堅陛 滲唳脹 唳辦.
//	else if(objBox.name == "safe_qty"){
//		if(document.frm.safe_update_flag[rowIdx])
//			document.frm.safe_update_flag[rowIdx].value = "Y";
//		else
//			document.frm.safe_update_flag.value = "Y";
//	}
//}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛⑷營 陳瞼(yyyymmdd) 蹺轎  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
//function getdatetime() {
//	var today = new Date();
//	var year = today.getYear();
//	var month = today.getMonth() + 1;
//	var day = today.getDate();
//	
//	if(month < 10)
//		month = "0" + month;
//		
//	if(day < 10)
//		day = "0" + day;
//
//	document.frm.to_date.value = year + "" + month + "" + day;
//}

//------------------------------------------------- 晦襄曖 л熱 ------------------------------------------------------//

// 薯ヶ 匐儀 popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup 璽曖 input box ル衛 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}

// 薯ヶ 殮溘璽縑 殮溘и 高婁 橾纂ж朝 薯ヶ 匐餌 ��, 橾纂ж朝 薯ヶ檜 氈戲賊 薯ヶ 囀萄, 薯ヶ 貲 ル衛
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 橾纂ж朝 薯ヶ 橈擠
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else {
				document.frm.item_name.value = "";
				var itemid = objBox.value;
				openCodeSearchPop('item_id', 'item_name', '400', '300');
				return;
			}
		}
	});
	
}
/*********************************************************
 ****************** Edit, View Mode  *********************
 *********************************************************/

// input box 蒂 Edit Mode 煎 滲��
// onClick
//function setEditMode( objTd ) {
//	
//	if(objTd.childNodes(0).name == "plt_qty" 
//		|| objTd.childNodes(0).name == "box_qty"
//		|| objTd.childNodes(0).name == "min_trans_qty"){
//		
//		objTd.childNodes(0).focus();
//		return;
//	}
//	
//	objTd.childNodes(0).style.display = "none";
//	objTd.childNodes(1).style.display = "block";
//	objTd.childNodes(1).focus();
//
//	
//	objTd.onclick = "";
//		
//}

// input box 蒂 View Mode 煎 滲��
// onFocusOut
//function setViewMode( objBox ) {
//	
//	
//	// select box 檣 唳辦, value 陛 嬴棲塭 TEXT 蒂 ル衛п 醜撿 л
//	if( objBox.tagName.toUpperCase() == "SELECT" ) {
//		if( objBox.value == "" || objBox.value == null ) {
//			var strVal = objBox.value;
//		}
//		else {
//			var strVal = objBox.options[objBox.selectedIndex].text;
//		}
//		var objTd = objBox.parentNode;
//	}
//	else {
//		var strVal = objBox.value;
//		var objTd = objBox.parentNode;
//	}
//	
//	if( objTd.align.toUpperCase() == "CENTER" ) {
//		objTd.childNodes(0).innerHTML = strVal;
//	}
//	else if( objTd.align.toUpperCase() == "RIGHT" ) {
//		objTd.childNodes(0).innerHTML = strVal + "&nbsp;";
//	}
//	else {
//		objTd.childNodes(0).innerHTML = "&nbsp;" + strVal;
//	}
//	
//	objTd.childNodes(0).style.display = "block";
//	objTd.childNodes(1).style.display = "none";
//	objTd.onclick = function() { setEditMode(this); };
//	
//}

// PLT, BOX高檜 熱薑腎歷擊陽 ��轎脾.
//function onChangeCheck(objBox, flag){
//	var strVal = objBox.value;
//	
//	setChangeCheckFlag(objBox);
//	
//	// 晦獄營堅鼻離BOX, 蹺陛營堅鼻離BOX, 儅骯鼻離BOX 殮溘璽檣 唳辦, 璋濠 羹觼 & 繭欽嬪 掘碟濠 ル衛
//	if( objBox.name == "plt_qty" || objBox.name == "box_qty") {
//		if( strVal != "" && strVal != null ) {
//			// 璋濠 羹觼
//			if( checkNum(objBox, "BLANK") == false ) {
//				objSetting(objBox, "", "璋濠虜 殮溘ж罹 輿撮蹂.");
//				return;
//			}
//			// ⑽衝檜 蜃朝 唳辦 繭欽嬪 掘碟濠 ル衛
//			else {
//				strVal = objBox.value;
//				if(objBox.name == "plt_qty")
//					objBox.value = fixedPoint(strVal,2);
//				else
//					objBox.value = strVal;
//				strVal = objBox.value;
//			}
//		}
//		else {
//			// BOX 檣唳辦.
//			if(objBox.name == "box_qty")
//				objBox.value = "0";
//			else
//				objBox.value = "0.00"
//		}
//		
//		// BOX 檣 唳辦
//		if( objBox.name == "box_qty" ) {
//			// PLT 熱榆 啗骯
//			calPltQty(objBox);
//		}
//		
//		// PLT 檣 唳辦
//		if( objBox.name == "plt_qty" ) {
//			// Box 熱榆 啗骯
//			calBoxQty(objBox);
//		}
//	}
//}

//// 轎堅餌機濰檜釭 PLT, BOX, 譆模熱歎欽嬪蒂 熱薑ж艘擊陽, 
//// 熱薑腎歷棻朝 Flag蒂 陴晦晦 嬪и Function
//// 熱薑脹 Flag蒂 鱔п憮, DML濛機擊 褒ч 嶸鼠蒂 っ欽.
//function setChangeCheckFlag(objBox){
//	var rowIdx = objBox.parentNode.parentNode.rowIndex;
//	
//	// 轎堅餌機濰, PLT, BOX 陛 熱薑脹 唳辦.
//	if( objBox.name == "src_loc" || objBox.name == "plt_qty" || objBox.name == "box_qty"){
//		
//		if(document.frm.plan_update_flag[rowIdx])
//			document.frm.plan_update_flag[rowIdx].value = "Y";
//		else
//			document.frm.plan_update_flag.value = "Y";
//	}
//	// 譆模熱歎欽嬪陛 熱薑脹 唳辦.
//	else if(objBox.name == "min_trans_qty"){
//		
//		if(document.frm.unit_update_flag[rowIdx])
//			document.frm.unit_update_flag[rowIdx].value = "Y";
//		else
//			document.frm.unit_update_flag.value = "Y";
//	}
//	// 寰瞪營堅陛 滲唳脹 唳辦.
//	else if(objBox.name == "safe_qty"){
//		if(document.frm.safe_update_flag[rowIdx])
//			document.frm.safe_update_flag[rowIdx].value = "Y";
//		else
//			document.frm.safe_update_flag.value = "Y";
//	}
//}


/*********************************************************/

// 璋濠 input box 縑 僥濠 check 
// parameter : obj - inbox object , type - default value 傳朝 模熱薄 check 嶸嗽 蛔曖 type 薑曖 
// type - BLANK : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 奢寥戲煎 奩��, 模熱薄 ъ辨
//        ZERO : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 0 戲煎 奩��, 模熱薄 ъ辨 
//        BLANK_INT : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 奢寥戲煎 奩��, 模熱薄擎 error 籀葬( only integer ) 
//        ZERO_INT : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 0 戲煎 奩��, 模熱薄擎 error 籀葬( only integer ) 
//        BLANK_INT_UP : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 奢寥戲煎 奩��, 擠熱 & 模熱薄擎 error 籀葬( only plus integer ) 
//        ZERO_INT_UP : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 0 戲煎 奩��, 擠熱 & 模熱薄擎 error 籀葬( only plus integer ) 
//        ** type parameter 陛 橈戲賊 ZERO(default=0, 模璋薄 ъ辨) 諦 偽擠 
//function checkNum(obj, type) {
//
//	var i, ch;
//	var pointCheck = 0;
//	var defaultVal = "0"; 
//	var alertMsg = "璋濠虜 殮溘ж罹 輿撮蹂.";
//	var checkType = "POINT"; 
//	
//	// default value 朝 奢寥 
//	if( type == "BLANK" || type == "BLANK_INT" || type == "BLANK_INT_UP" ) 
//		defaultVal = ""; 
//	
//	// 模熱薄 ъ辨ж雖 彊擠 
//	if( type == "BLANK_INT" || type == "ZERO_INT" || type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
//	{ 
//		if( type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
//			alertMsg = "濠翱熱虜 殮溘ж罹 輿撮蹂."; 
//		else 
//			alertMsg = "薑熱虜 殮溘ж罹 輿撮蹂."; 
//		checkType = "INT"; 
//		pointCheck = 1; 
//	} 
//	
//	var checkValue = delComma(obj.value).trim();
//
//	if( defaultVal == "0" && ( checkValue == null || checkValue == "" ) )
//	{
//		//objSetting(obj, defaultVal, alertMsg);
//		return false;
//	}
//	
//	for (i=0; i < checkValue.length; i++) {
//		
//		ch = checkValue.charAt(i);
//		
//		// invalid value 
//		if(ch==" ")
//		{ 
//			//objSetting(obj, defaultVal, alertMsg); 
//			return false;
//		}
//		
//		// valid value
//		else if ( ( ch >= 0 && ch <= 9 ) ) 
//		{ }
//		
//		// point check 
//		else if ( ch == '.' ) 
//		{
//			pointCheck += 1;
//			// invalid value 
//			if ( pointCheck > 1 )
//			{
//				//objSetting(obj, defaultVal, alertMsg); 
//				return false;
//			} 
//		} 
//		
//		// valid value : minus sign 
//		else if ( i == 0 && ch == '-' && type != "BLANK_INT_UP" && type != "ZERO_INT_UP" ) 
//		{ } 
//		
//		// invalid value 
//		else 
//		{
//			//objSetting(obj, defaultVal, alertMsg); 
//			return false;
//		}
//	}
//	
//	obj.value = checkValue; 
//	return true;
//	
//}


/*********************************************************
 ******************** PLT, BOX 啗骯   *********************
 *********************************************************/

// BOX 熱榆檜 滲唳脹 唳辦, PLT 熱榆擊 濠翕戲煎 啗骯 ж晦 嬪и function
//function calPltQty(objBox) {
//	
//	var rowIdx = objBox.parentNode.parentNode.rowIndex;
//	if( document.frm.box_per_palet[rowIdx] ) {
//		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
//		if( objBox.name == "box_qty" ) { // 晦獄營堅鼻離
//			var pltBox = document.frm.plt_qty[rowIdx];
//		}
//		else {
//			return;
//		}
//	}
//	else {
//		var boxPerPaletStr = document.frm.box_per_palet.value;
//		if( objBox.name == "box_qty" ) { // 晦獄營堅鼻離
//			var pltBox = document.frm.plt_qty;
//		}
//		else {
//			return;
//		}
//	}
//	
//	// PALET 渡 BOX 熱榆檜 橈朝 唳辦 1 煎 啗骯
//	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
//		var boxPerPalet = 100;
//	}
//	else {
//		var boxPerPalet = Number(delComma(boxPerPaletStr));
//	}
//	
//	// BOX 殮溘璽檜 綠橫 氈朝 唳辦
//	if( objBox.value == null || objBox.value == "" ) {
//		var pltStr = "";
//	}
//	else {
//		var boxQty = Number(delComma(objBox.value));
//		var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;
//		var pltStr = numberFormat(pltQty.toString());
//	}
//	
//	pltBox.value = delComma(fixedPoint(pltStr,2));
//	
//}

// PLT 熱榆檜 滲唳脹 唳辦 BOX 熱榆擊 濠翕戲煎 啗骯ж晦 嬪и function
//function calBoxQty(objBox) {
//	
//	var rowIdx = objBox.parentNode.parentNode.rowIndex;
//	if( document.frm.box_per_palet[rowIdx] ) {
//		var boxPerPaletStr = document.frm.box_per_palet[rowIdx].value;
//		if( objBox.name == "plt_qty" ) { 
//			var boxPlt = document.frm.box_qty[rowIdx];
//		}
//		else {
//			return;
//		}
//	}
//	else {
//		var boxPerPaletStr = document.frm.box_per_palet.value;
//		if( objBox.name == "plt_qty" ) { // 晦獄營堅鼻離
//			var boxPlt = document.frm.box_qty;
//		}
//		else {
//			return;
//		}
//	}
//	
//	// PALET 渡 BOX 熱榆檜 橈朝 唳辦 1 煎 啗骯
//	if( boxPerPaletStr == null || boxPerPaletStr == "" ) {
//		var boxPerPalet = 100;
//	}
//	else {
//		var boxPerPalet = Number(delComma(boxPerPaletStr));
//	}
//	
//	// BOX 殮溘璽檜 綠橫 氈朝 唳辦
//	if( objBox.value == null || objBox.value == "" ) {
//		var boxStr = "";
//	}
//	else {
//		var pltQty = Number(delComma(objBox.value));
//		var boxQty = Math.round(Math.round(pltQty * boxPerPalet*100)/100,0);
//		var boxStr = numberFormat(boxQty.toString());
//	}
//	
//	boxPlt.value = boxStr;
//	
//}

/*********************************************************/

// HTML Grid 曖
// onMouseOver event 縑 評艇 寡唳儀 滲�� 
//function bgOver( obj ) { 
//	
//	var rowIdx = obj.rowIndex;
//	left_tbody.rows[rowIdx].style.backgroundColor = "#aaaaaa"; 
//	main_tbody.rows[rowIdx].style.backgroundColor = "#aaaaaa"; 
//}

// HTML Grid 曖 
// onMouseOut event 縑 評艇 寡唳儀 滲�� 
//function bgOut( obj ) {
//	
//	var rowIdx = obj.rowIndex;
//	left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff";
//	main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
//}

// 撚 盪濰 瞪羲滲熱
//var objTdG;

// setTimeout 縑憮 ��轎ж罹 衛除 雖翱 �� setEditMode() 褒ч
//function setEditModeTime() {
//	
//	setEditMode( objTdG );
//	
//}

// TAB key 煎 棻擠 о跡 檜翕
//function moveNextBox( objBox ) {
//	
//	var tableLen = left_tbody.rows.length;
//	// 薯ヶ囀萄 撚檣 唳辦
//	if( objBox.parentNode.tagName.toUpperCase() == "A" ) {
//		var rowIdx = objBox.parentNode.parentNode.parentNode.rowIndex;
//	}
//	else {
//		var rowIdx = objBox.parentNode.parentNode.rowIndex;
//	}
//	var objName = objBox.name;
//	
//	// TAB or ENTER
//	if( event.keyCode == "9" || event.keyCode == "13" ) {
//		// PLT --> BOX
//		if( objName == "plt_qty" ) {
//			objTdG = main_tbody.rows[rowIdx].cells[12];
//		}
//		// BOX --> 轎堅餌機濰
//		else if( objName == "box_qty" ) {
//			
//			objTdG = main_tbody.rows[rowIdx].cells[14];
//		}
//		// 轎堅餌機濰 --> 譆模熱歎欽嬪
//		//else if( objName == "src_loc" ) {
//		//	objTdG = left_tbody.rows[rowIdx].cells[14];
//		//}
//		// 譆模熱歎欽嬪 --> 棻擠還 PLT
//		else if( objName == "min_trans_qty" ) {
//			// 葆雖虞還 --> 羅還煎 檜翕
//			if( rowIdx+1 == tableLen ) {
//				objTdG = left_tbody.rows[0].cells[11];
//			}
//			// 棻擠還曖 羅廓簞 input box 煎 檜翕
//			else {
//				objTdG = left_tbody.rows[rowIdx+1].cells[11];
//			}
//		}
//		// 斜 諼曖 box 縑摹 翕濛 橈擠
//		else {
//			return;
//		}
//		setTimeout(setEditModeTime, 1);
//	}
//	
//}

// src_loc(轎堅濰), item_id(薯ヶ 囀萄) 煎睡攪 box_per_palet 瓊晦
// obj 朝 select box 傳朝 input box
//function getBoxPerPalet( obj ) {
//	
//	// 轎堅濰 殮溘璽縑憮 嫦儅и event 檣雖, 薯ヶ囀萄 殮溘璽縑憮 嫦儅и event 檣雖 掘碟
//	if(obj.name == "box_qty"){
//		var rowIdx = obj.parentNode.parentNode.rowIndex;
//	}
//	else if(obj.name == "plt_qty"){
//		var rowIdx = obj.parentNode.parentNode.rowIndex;
//	}
//	else if( obj.name == "src_loc" ) {
//		var rowIdx = obj.parentNode.parentNode.rowIndex;
//	}
//	else if ( obj.name == "item_id" ) {
//		var rowIdx = obj.parentNode.parentNode.parentNode.rowIndex;
//	}
//	else {
//		return;
//	}
//	
//	// 轎堅濰, 薯ヶ囀萄 等檜攪
//	if( document.frm.src_loc[rowIdx]) {
//		var dc_id = document.frm.src_loc[rowIdx].value;
//		var src_loc = document.frm.src_loc[rowIdx];
//		var item_id = document.frm.item_id.value;
//		var objBoxPerPalet = document.frm.box_per_palet[rowIdx];
//		var box_qty = document.frm.box_qty[rowIdx];
//		var plt_qty = document.frm.plt_qty[rowIdx];
//	}
//	else {
//		var dc_id = document.frm.src_loc.value;
//		var src_loc = document.frm.src_loc;
//		var item_id = document.frm.item_id.value;
//		var objBoxPerPalet = document.frm.box_per_palet;
//		var box_qty = document.frm.box_qty;
//		var plt_qty = document.frm.plt_qty;
//	}
//	
//	// 轎堅濰擊 摹鷗ж雖 彊堅 高擊 熱薑ж溥堅 и 唳辦..
//	if(dc_id == null || dc_id == ""){
//		box_qty.value = "0";
//		plt_qty.value = "0.00";
//		alert("PLT, BOX高擊 熱薑ж晦 瞪縑 轎堅濰擊 試盪 摹鷗ж罹 輿褊衛蹂.");
//		setEditMode( src_loc.parentNode );
//		src_loc.focus();
//		return;
//	}
//	
//	// 轎堅濰 傳朝 薯ヶ囀萄 等檜攪陛 橈朝 唳辦 л熱蒂 緒螳釭除棻
//	if( dc_id == null || dc_id == "" || item_id == null || item_id == "" ) {
//		return;
//	}
//	
//	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
//		callback:function(boxPerPalet){
//			if( boxPerPalet == null || boxPerPalet == "" ) {
//				objBoxPerPalet.value = 100;
//			}
//			else {
//				objBoxPerPalet.value = boxPerPalet;
//			}
//		}
//	});
//}

// HTML Grid �飛� resizing
//function setHtmlGridAutoResize( tab_h, table_h ){
//	
//	var leftWidthValue = leftDisplay.style.width.split("px")[0]; 
//	var topLineHeightValue = topLine.style.height.split("px")[0]; 
//	
//	var maxWidthValue;
//	var maxHeightValue;
//	
//	if (document.layers) {
//		//Nescape
//		maxWidthValue = window.innerWidth;
//		maxHeightValue = window.innerHeight;
//	}
//	if (document.all) {
//		//explore
//		maxWidthValue = document.body.clientWidth;
//		maxHeightValue = document.body.clientHeight;
//	} 
//	
//	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
//	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
//	var leftDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) - 17; 
//	var mainDiplayHeightValue = Number(maxHeightValue) - Number(table_h) - Number(topLineHeightValue) ; 
//	
//	var search_h = document.frm.search_h.value; 
//	if( search_menu.style.display == "none" ) 
//	{ 
//		tabHeightValue += Number(search_h); 
//		tableHeightValue += Number(search_h); 
//		leftDiplayHeightValue += Number(search_h); 
//		mainDiplayHeightValue += Number(search_h); 
//	} 
//	
//	var tabWidthValue = Number(maxWidthValue) - 15;
//	var tableWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 1;
//	var topLineWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 39;
//	var displayWidthValue = Number(maxWidthValue) - Number(leftWidthValue) - 20;
//	
//	// �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
//	// ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
//	if( tabHeightValue < 1 ) 
//		tabHeightValue = 1; 
//	if( tableHeightValue < 1 ) 
//		tableHeightValue = 1; 
//	if( leftDiplayHeightValue < 1 ) 
//		leftDiplayHeightValue = 1; 
//	if( mainDiplayHeightValue < 1 ) 
//		mainDiplayHeightValue = 1; 
//	
//	if( tableWidthValue < 1 ) 
//		tableWidthValue = 1; 
//	if( topLineWidthValue < 1 ) 
//		topLineWidthValue = 1; 
//	if( displayWidthValue < 1 ) 
//		displayWidthValue = 1; 
//	
//	tabPage1.style.height = tabHeightValue + "px"; 
//	tbMain.style.height = tableHeightValue + "px"; 
//	leftDisplay.style.height = leftDiplayHeightValue + "px"; 
//	mainDisplay.style.height = mainDiplayHeightValue + "px"; 
//	
//	tabPage1.style.width = tabWidthValue + "px";
//	tbMain.width = tableWidthValue + "px"; 
//	topLine.style.width = topLineWidthValue + "px"; 
//	mainDisplay.style.width = displayWidthValue + "px";
//	
//	//tdBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
//	//document.all.gridBLeft.width = (Number(maxWidthValue) - 280).toString() + "px";
//	
//}

// 陳瞼 ⑽衝擊 羹觼ж朝 л熱, return value : 1-蜃朝 ⑽衝, 0-澀跤脹 ⑽衝
//function chkDate2(obj) {
//	
//	var separator = "-"; 
//	
//	var str = obj.value.trim();
//	
//	if( str == "" || str == null ){
//		obj.value = str;
//		setViewMode(obj);
//		return 1;
//	}
//	
//	str = str.replace(/\//g, '').replace(/-/g, '');
//	obj.value = str.substr(0, 4) + separator + str.substr(4, 2) + separator + str.substr(6, 2);
//	
//	var input = obj.value.trim(); 
//	
//	if ( input.length == 0 ) return 1; // 奢寥擎 skip
//	
//	var dateType = "yyyy-MM-dd"; 
//	var inputYear = input.substr(0,4); 
//	var inputMonth = input.substr(5,2) - 1; 
//	var inputDate = input.substr(8,2); 
//	
//	if( (input.substr(4,1) != "-" && input.substr(4,1) != "/") || (input.substr(7,1) != "-" && input.substr(7,1) != "/") ) 
//	{ 
//		separator = "invalid"; 
//	}
//	
//	var resultDate = new Date(inputYear, inputMonth, inputDate); 
//	if ( resultDate.getFullYear() != inputYear || resultDate.getMonth() != inputMonth || resultDate.getDate() != inputDate || input.length != 10 || separator == "invalid" ) 
//	{ 
//		obj.value = ""; 
//		//obj.select(); 
//		alertChkDate(input, dateType); 
//		setEditMode( obj.parentNode );
//		return 0; 
//	} 
//	else 
//	{ 
//		//setViewMode(obj);
//		return 1; 
//	} 
//	
//}

// version - seq 碟葬
function setVersions( versions ) {
	
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

// 匐儀
//function GoSearch(service) {
//	
//	// 幗瞪, 殮堅濰, 熱歎掘碟 匐儀 等檜攪 setting
//	var versions = document.frm.plan_version.value;
//	if( versions == "" || versions == null ) {
//		alert("幗瞪擊 摹鷗ж撮蹂.");
//		return;
//	}
//	if( document.frm.trans_start.value == "" || document.frm.trans_start.value == null ) {
//		alert("熱歎橾濠蒂 殮溘ж罹 輿褊衛蹂.");
//		return;
//	}
//	
//	if( document.frm.item_id.value == "" || document.frm.item_id.value == null ) {
//		alert("薯ヶ囀萄蒂 殮溘ж罹 輿褊衛蹂.");
//		return;
//	}
//	
//	var verArr = versions.split("!%!");
//	if( verArr.length == 2 ) {
//		document.frm.version.value 	= verArr[0].trim();
//		document.frm.seq.value 		= verArr[1].trim();
//	}
//	
//	// 褻�蜇� WAITING 檜嘐雖 爾罹輿晦
//	viewWait();
//	document.frm._moon_service.value = service; 
//	document.frm._moon_pagenumber.value = "1";
//	document.frm.action = "service.do";
//	document.frm.target = "_self";
//	document.frm.submit();
//	
//}

// 盪濰 幗が 贗葛
//function GoSave_old(service) {
//	
//	var version = document.frm.version.value;
//	var seq = document.frm.seq.value;
//	var trans_date = document.frm.trans_start.value;
//	var item_id = document.frm.item_id.value;
//	// 幗瞪, 離熱蒂 摹鷗ж雖 彊擎 唳辦
//	if( version == null || version == "" || seq == null || seq == "" ) {
//		alert("幗瞪擊 試盪 摹鷗ж堅 等檜攪 褻�� ��, 盪濰檜 陛棟м棲棻.");
//		return;
//	}
//	
//	if( trans_date == null || trans_date == ""){
//		alert("熱歎橾濠蒂 試盪 摹鷗ж堅 等檜攪 褻�� ��, 盪濰檜 陛棟м棲棻.");
//		return;
//	}
//	
//	if( item_id == null || item_id == ""){
//		alert("薯ヶ 囀萄蒂 試盪 殮溘ж堅 等檜攪 褻�� ��, 盪濰檜 陛棟м棲棻.");
//		return;
//	}
//	
//	
//	// 棻衛 �挫�
//	if(!confirm("盪濰ж衛啊蝗棲梱?"))
//		return;
//		
//	viewWait();
//	
//	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
//	
//	document.frm._moon_service.value = service;
//	document.frm.action = "service.do";
//	document.frm.target = "_self";
//	document.frm.submit();
//	
//}


// 離晦幗瞪 啗�凳暆� 幗が 贗葛衛.
//function GoCreate(service) {
//	
//	var trans_date = document.frm.trans_start.value;
//	var item_id = document.frm.item_id.value;
//
//	if( trans_date == null || trans_date == ""){
//		alert("熱歎橾濠蒂 試盪 摹鷗ж堅 等檜攪蒂 褻�� ж敷撿 啗�嘀� 奩艙檜 陛棟м棲棻.");
//		return;
//	}
//	
//	if( item_id == null || item_id == ""){
//		alert("薯ヶ 囀萄蒂 試盪 殮溘ж堅 等檜攪蒂 褻�� ж敷撿 啗�嘀� 奩艙檜 陛棟м棲棻.");
//		return;
//	}
//	
//	
//	// 棻衛 �挫�
//	if(!confirm("啗�嘀� 奩艙ж衛啊蝗棲梱?"))
//		return;
//	
//	viewWait();
//	
//	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
//	
//	document.frm._moon_service.value = service;
//	document.frm.action = "service.do";
//	document.frm.target = "_self";
//	document.frm.submit();
//	
//}

// enter check 辨 
function enterCheck(frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			// 濠晦�飛� 偵褐
			getItemNameSearch(document.frm.item_id, frm_name);
			//GoSearch(frm_name);
		}
	} 
	
}

// 薯ヶ 殮溘璽縑 殮溘и 高婁 橾纂ж朝 薯ヶ 匐餌 ��, 橾纂ж朝 薯ヶ檜 氈戲賊 薯ヶ 囀萄, 薯ヶ 貲 ル衛
function getItemNameSearch(objBox, service) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 橾纂ж朝 薯ヶ 橈擠
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else {
				document.frm.item_name.value = "";
				var itemid = objBox.value;
				openCodeSearchPop('item_id', 'item_name', '400', '300');
				return;
			}
			GoSearch(service);
		}
	});
	
}

