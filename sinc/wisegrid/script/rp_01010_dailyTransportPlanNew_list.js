//############################################################
//## Щ煎斜極ID 	: rp_01010_dailyTransportPlanNew_list.js
//## Щ煎斜極貲 	: 熱歎啗�� 褻�� 塽 褻薑
//## 偃嫦濠  	: 薑營掖
//## 偃嫦橾濠 	: 2009-04-07 �倍靺�
//##
//## 婦溼 job file 	 : job_rp_01010_dailyTransportPlanNew_list.xml
//##
//## 婦溼 query file : query_rp_01010_dailyTransportPlanNew_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-04-07  薑營掖     rp_01010_dailyTransportPlanNew_list.js 偃嫦
//## 1.1		2009-05-22  陴錠辨	   mult 摹鷗�� check, п薯 晦棟蹺陛
//## 2.0		2013-09-04  陴錠辨	   碳в蹂и 模蝶 薯剪 - 檜瞪模蝶朝 憮幗縑 20130904幗蟒縑 氈擠.
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'rp_01010_dailyTransportPlanNew_list';				// job id(憮綰葩 貲, WiseGrid Header key)
var job_id2 = 'rp_01120_outOrderAdjust_list02';
var job_id3 = 'rp_01010_dailyTransportPlanNewSalesInfo_list';
var job_id4 = 'rp_01010_dailyTransportPlanNewStockInfo_list';
var job_id5 = 'rp_01010_dailyTransportBookingInfo_list';

var GridObj ; 													// WiseGrid 偌羹
var GridObj2;
var GridObj3;
var GridObj4;
var GridObj5;

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

var oldRow = "";						//м離 渠鼻 摹鷗 Row Index 盪濰
var oldColor = "";
var oldRowData = "";

var delRowList = "";					// 餉薯 鏃模蒂 ж晦嬪п 餉薯脹 跡煙 盪濰 滲熱

var saved = true;						// 盪濰 罹睡 

var rFirst = 0;							// 盪濰, м離 蛔曖 濛機�� �飛� 嬪纂蒂 嶸雖ж晦 嬪и Row Index 盪濰 滲熱
var rEnd = 0;

/******************************************          Action Function         **********************************************/
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service) {
	
	// 幗瞪, 殮堅濰, 熱歎掘碟 匐儀 等檜攪 setting
	var versions = document.frm.plan_version.value;
	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	
	if( versions == "" || versions == null ) {
		alert("幗瞪擊 摹鷗ж撮蹂.");
		return;
	}
	if( document.frm.tgt_loc_sel.value == "" || document.frm.tgt_loc_sel.value == null ) {
		alert("殮堅濰擊 摹鷗ж撮蹂.");
		return;
	}
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	document.frm.tgt_loc.value 		= document.frm.tgt_loc_sel.value;
	document.frm.plan_type.value 	= document.frm.plan_type_sel.value;	

	rFirst = 0;
	oldRow = 0;
	doQuery();
	doQuery5();	
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearchInfo() {

	// 幗瞪, 殮堅濰, 熱歎掘碟 匐儀 等檜攪 setting
	var versions = document.frm.plan_version.value;
	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	var search_type = document.frm.search_type.value;
	
	if( versions == "" || versions == null ) {
		alert("幗瞪擊 摹鷗ж撮蹂.");
		return;
	}
	if( document.frm.tgt_loc.value == "" || document.frm.tgt_loc.value == null ) {
		alert("殮堅濰擊 摹鷗ж撮蹂.");
		return;
	}
		
	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value 	= verArr[0].trim();
		document.frm.seq.value 		= verArr[1].trim();
	}
	
	if(GridObj.GetActiveRowIndex() == -1) {
		alert("試盪 褻�裔� Row蒂 摹鷗п 輿褊衛螃.");
		return;
	}
	
	if( GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex()) == "" ){
		//alert(GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex()));;
		alert("摹鷗и Row縑 薯ヶ檜 摹鷗腎雖 彊懊蝗棲棻. 薯ヶ擊 試盪 摹鷗п 輿褊衛螃.");
		return;
	}
	
	//alert(GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex()));
	doQuery2();
	doQuery3();
	doQuery4('1');
	
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛盪濰
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave(service) {
	
	// 幗瞪, 殮堅濰, 熱歎掘碟 匐儀 等檜攪 setting
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	
	if( version == "" || version == null ) {
		alert("幗瞪擊 摹鷗ж撮蹂.");
		return;
	}
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("殮堅濰擊 摹鷗ж撮蹂.");
		return;
	}
	// ====================================================================== //
	// 1離渡 PLT 援瞳 譆謙高檜 12夢蝶陛 寰腆陽朝 CONFIRM戲煎 盪濰й匙 檣雖 �挫恉炴� 煎霜
	var tableLen = GridObj.GetRowCount();
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var plt_qty = 0;
	var check_plt_flag = false;
	
	if(document.frm.tgt_loc.value != document.frm.tgt_loc_sel.value){
		alert("濛機й 殮堅濰檜 滲唳腎歷蝗棲棻. 棻衛褻�� �� 濛機ж撮蹂!");
		return;
	}

	if(tableLen == 1){ // Total Row虜 襄營ж朝 唳辦..
		if(!confirm("盪濰ж衛啊蝗棲梱?"))
			return;
	}
		
	for( var i = 0 ; i < tableLen-1 ; i++ ) {
		if(GridObj.GetCellHiddenValue("CUM_PLT", i) == "CUM"){
			if( GridObj.GetCellValue("CUM_PLT", i) < 12 ){
				check_plt_flag = true;
			}
		}
	}	
	
	// 12PLT陛 寰腎朝 唳辦..
	if(check_plt_flag){
		if(!confirm("12PLT 嘐虜檣 離榆檜 襄營м棲棻. 盪濰ж衛啊蝗棲梱?"))
			return;
	}
	else{		
		// 賅舒 12PLT 檜鼻檣 唳辦.
		if(!confirm("盪濰ж衛啊蝗棲梱?"))
			return;
	}

	// ====================================================================== //
	
	doSave(version, seq, tgt_loc, plan_type);	
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛м離 幗が 贗葛衛.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSumTruck(service) {
	
	doSumTruck();		
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛偃滌 熱歎啗�� 檜婦
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSaveEtc() {

	if( !saved ){
		
		alert("試盪 盪濰擊 ж堅 檜婦擊 ж褊衛螃.");
		return;
	}
	
	// 幗瞪, 殮堅濰, 熱歎掘碟 匐儀 等檜攪 setting
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	
	if( version == "" || version == null ) {
		alert("幗瞪擊 摹鷗ж撮蹂.");
		return;
	}
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("殮堅濰擊 摹鷗ж撮蹂.");
		return;
	}
		
	// ====================================================================== //
	// 1離渡 PLT 援瞳 譆謙高檜 12夢蝶陛 寰腆陽朝 CONFIRM戲煎 盪濰й匙 檣雖 �挫恉炴� 煎霜
	var tableLen = GridObj.GetRowCount();
	var preTransDate = null;
	var preSrcLoc = null;
	var preTruckSeq = null;
	var cumBox = 0;
	var cumPlt = 0;
	var plt_qty = 0;
	var check_plt_flag = false;
	
	if(tableLen == 1){ // Total Row虜 襄營ж朝 唳辦..
		if(!confirm("盪濰ж衛啊蝗棲梱?"))
			return;
	}
		
	for( var i = 0 ; i < tableLen-1 ; i++ ) {
		if(GridObj.GetCellHiddenValue("CUM_PLT", i) == "CUM"){
			if( GridObj.GetCellValue("CUM_PLT", i) < 12 ){
				check_plt_flag = true;
			}
		}
	}	
	
	// 12PLT陛 寰腎朝 唳辦..
	if(check_plt_flag){
		if(!confirm("12PLT 嘐虜檣 離榆檜 襄營м棲棻. 盪濰ж衛啊蝗棲梱?"))
			return;
	}
	else{		
		// 賅舒 12PLT 檜鼻檣 唳辦.
		if(!confirm("盪濰ж衛啊蝗棲梱?"))
			return;
	}

	// ====================================================================== //
	
	doSaveEtc(tgt_loc, plan_type);	
};

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
	setDefault2(GridObj2);  			// 蹺陛 property 撲薑
	setHeader2();   			// Header 撲薑
			
}

function init3() {
	
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3); 	// 晦獄 property 撲薑
	setDefault2(GridObj3);  			// 蹺陛 property 撲薑
	setHeader3();   			// Header 撲薑
			
}

function init4() {
	
	GridObj4 = document.WiseGrid4;
	
	setProperty(GridObj4); 	// 晦獄 property 撲薑
	setDefault2(GridObj4);  			// 蹺陛 property 撲薑
	setHeader4();   			// Header 撲薑			
}

function init5() {
	
	GridObj5 = document.WiseGrid5;
	setProperty(GridObj5); 	// 晦獄 property 撲薑
	setDefault2(GridObj5);  			// 蹺陛 property 撲薑

	GridObj5.bUserContextMenu 	= true;					//餌辨濠 鐘臢蝶お 詭景曖 餌辨 罹睡蒂 唸薑и棻. 
	GridObj5.bHDMoving 		 	= false;                //餌辨濠陛 ④渦蒂 萄楚斜п憮 鏽歲嬪纂蒂 檜翕й熱 橈棻.
	GridObj5.bHDSwapping 	 	= false;                //④渦曖 鏽歲嬪纂檜翕 巍爾幗が擊 綠�側瘓� и棻.
	GridObj5.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj5.bRowSelectorIndex   = false;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻. 
	
	GridObj5.strRowBorderStyle   = "none";         	//煎辦曖 纔舒葬縑 嬴鼠匙紫 釭顫釭雖 彊朝棻.
	//GridObj.strGridBorderStyle = 'smalldots';
	
	GridObj5.nRowSpacing = 0;                    	//RowSpacing高擊 薑и棻. 
	GridObj5.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj5.bStatusbarVisible = true;				// status bar visible
    
	setHeader5();   			// Header 撲薑	
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛Property 撲薑
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault(GridObj){ 
	
	GridObj.bUserContextMenu = true;				//餌辨濠 鐘臢蝶お 詭景曖 餌辨 罹睡蒂 唸薑и棻. 
	GridObj.bHDMoving = false;                  	//餌辨濠陛 ④渦蒂 萄楚斜п憮 鏽歲嬪纂蒂 檜翕й熱 橈棻.
	GridObj.bHDSwapping = false;                	//④渦曖 鏽歲嬪纂檜翕 巍爾幗が擊 綠�側瘓� и棻.
	GridObj.bRowSelectorVisible = false;        	//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻. 
	GridObj.strRowBorderStyle = "none";         	//煎辦曖 纔舒葬縑 嬴鼠匙紫 釭顫釭雖 彊朝棻.
	GridObj.nRowSpacing = 0;                    	//RowSpacing高擊 薑и棻. 
	GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	//GridObj.strSelectedCellBgColor = '238|0|238'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	
	// Header Font Setting
	GridObj.nHDFontSize = 9;				  	// Font Size
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size
	
	//Hearder 堪檜
	GridObj.nHDLineSize   = 15; //15
	
	// Grid ч 堪檜
    GridObj.nRowHeight    = 20; 
    
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj.strSelectedCellFgColor = '180|82|205'; 
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2; 
    
    //餌辨濠陛 鏽歲曖 餌檜鍔蒂 滲唳ж朝 翕濛擊 撲薑и棻.     
    GridObj.strHDSizing = 'none'; 	//[ none | free | sync ] 
    
    //餌辨濠陛 煎辦曖 餌檜鍔蒂 滲唳ж朝 翕濛擊 撲薑и棻. 
    GridObj.strRowSizing = 'fixed';  //[ fixed | free | sychronized | autofree | autofixed ]

	GridObj.strMouseWheelAction='default'; // page 欽嬪 scroll ->晦獄擎 'default'     
    
}
 
function setDefault2(GridObj){ 
	GridObj.bStatusbarVisible = false; 				//Statusbar蒂 WiseGrid縑憮 獗望 熱 氈棻. 	

	// Hearder 堪檜 
	GridObj.nHDLineSize   = 22; //24
	
	GridObj.strHDClickAction = 'sortsingle'; 		//贗葛и 鏽歲曖 賅萇 撚擊 薑溺и棻. 

    //餌辨濠陛 鏽歲曖 餌檜鍔蒂 滲唳ж朝 翕濛擊 撲薑и棻.     
    GridObj.strHDSizing = 'free'; 	//[ none | free | sync ] 
	
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

function setHeader3() 
{        
    commonUtil.getCodeList("job_id", job_id3 , "gird_header_list",defaultHeader3); 
}

function setHeader4() 
{        
    commonUtil.getCodeList("job_id", job_id4 , "gird_header_list",defaultHeader4); 
}

function setHeader5() 
{        
    defaultHeader5();		
    //commonUtil.getCodeList("job_id", job_id5 , "gird_header_list",defaultHeader5); 
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
	
	GridObj.AddGroup("CUM_TOT", "援瞳鼻離餵啗");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("CUM_TOT", "CUM_PLT");
	GridObj.AppendHeader("CUM_TOT", "CUM_BOX");
		
	GridObj.AddGroup("BASE_STK", "晦獄營堅鼻離");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("BASE_STK", "BASE_STK_PLT");
	GridObj.AppendHeader("BASE_STK", "BASE_STK_BOX");
	
	GridObj.AddGroup("ADD_STK", "蹺陛營堅鼻");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("ADD_STK", "ADD_STK_PLT");
	GridObj.AppendHeader("ADD_STK", "ADD_STK_BOX");
	
	GridObj.AddGroup("PROD", "儅骯鼻離");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("PROD", "PROD_PLT");
	GridObj.AppendHeader("PROD", "PROD_BOX");
	
	GridObj.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
	
	GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	
	GridObj.SetColHide("CRUD", true); 
	GridObj.SetColHide("BOX_PER_PALET", true);
	GridObj.SetColHide("PLAN_TYPE", true);
	
	GridObj.SetNumberFormat("TRUCK_SEQ", "##"); // 璋濠 ⑽衝
	GridObj.SetNumberFormat("CUM_PLT"  , "##0.00");
	GridObj.SetNumberFormat("CUM_BOX"  , "###,##0");
	GridObj.SetNumberFormat("BASE_STK_PLT"  , "##0.00");
	GridObj.SetNumberFormat("BASE_STK_BOX"  , "###,##0");
	GridObj.SetNumberFormat("ADD_STK_PLT"  , "##0.00");
	GridObj.SetNumberFormat("ADD_STK_BOX"  , "###,##0");
	GridObj.SetNumberFormat("PROD_PLT"  , "##0.00");
	GridObj.SetNumberFormat("PROD_BOX"  , "###,##0");	  
	
	GridObj.SetDateFormat("TRANS_DATE", "yyyy-MM-dd");         
	
	GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
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

function defaultHeader3(result)
{
	var arrHeader = '';
	
	
	
	for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj3.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}

	GridObj3.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
		
	GridObj3.SetNumberFormat('BS_STOCK'     , "###,###,###"); // 璋濠 ⑽衝
	GridObj3.SetNumberFormat('D00_SLP'      , "###,###,###");
	GridObj3.SetNumberFormat('D00_STK'		, "###,###,###");
	GridObj3.SetNumberFormat('D01_STK'   	, "###,###,###");
	GridObj3.SetNumberFormat('ITP_QTY'		, "###,###,###");
	GridObj3.SetNumberFormat('TP_QTY'       , "###,###,###");
	GridObj3.SetNumberFormat('NUM_STK'      , "###,###,###");
	GridObj3.SetNumberFormat('MON_SLP'      , "###,###,###");
	GridObj3.SetNumberFormat('MON_SLR'   	, "###,###,###");
	GridObj3.SetNumberFormat('AVG_SLR'  	, "###,###,###");
	GridObj3.SetNumberFormat('SAFETY_STOCK' , "###,###,###");
        
}

function defaultHeader4(result)
{
	var arrHeader = '';
	
  	GridObj4.AddHeader("ITEM_NAME"			,"薯ヶ貲"      	,"t_text" 	,100		,160  ,false); //0   
  	GridObj4.AddHeader("STOCK_DAY"			,"營堅橾熱"    	,"t_number" ,100.3		,55  ,false); //0   
  	GridObj4.AddHeader("SALES_MEAN_3WEEK"	,"3輿ゎ敕" 		,"t_number" ,100.3		,55  ,false); //0   
  	GridObj4.AddHeader("STOCK_QTY"			,"奢濰濤榆"      	,"t_number" ,100.3		,55  ,false); //0    奢濰濤榆
  	GridObj4.AddHeader("TRQTY_EX"			,"櫛橾轎堅"      	,"t_number" ,100.3		,55  ,false); //0   

	GridObj4.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
		
	GridObj4.SetNumberFormat("STOCK_DAY", "##0.0"); // 璋濠 ⑽衝
	GridObj4.SetNumberFormat("STOCK_QTY", "###,###,##0");
	GridObj4.SetNumberFormat("TRQTY_EX", "###,###,##0");
        
}

function defaultHeader5(result)
{
	var arrHeader = '';
	
  	GridObj5.AddHeader("ITEM_CODE"			,"薯ヶ囀萄"      	,"t_text" 	,100		,65  ,false); //0   
  	GridObj5.AddHeader("ITEM_NAME"			,"薯ヶ貲"      	,"t_text" 	,100		,180  ,false); //0   
  	GridObj5.AddHeader("STOCK_QTY"			,"營堅"      	,"t_number" ,100.3		,55  ,false); //0   
  	GridObj5.AddHeader("ORDER_DATE"			,"鼻離橾濠"    	,"t_text" ,100.3		,70  ,false); //0   
  	GridObj5.AddHeader("ETD_DATE"			,"摹瞳橾濠"    	,"t_text" ,100.3		,70  ,false); //0   
  	GridObj5.AddHeader("ORDER_QTY"			,"輿僥熱榆"      	,"t_number" ,100.3		,55  ,false); //0   

	GridObj5.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 

	GridObj5.SetColCellAlign('ORDER_DATE', 'center');
	GridObj5.SetColCellAlign('ITEM_CODE', 'center');
	GridObj5.SetColCellAlign('ETD_DATE', 'center');
	GridObj5.SetColCellAlign('ETD_DATE', 'center');
		
	GridObj5.SetNumberFormat("ORDER_QTY", "###,###,##0");
        
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
		
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var plan_type = document.frm.plan_type.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	
	GridObj.SetParam("version", version);
	GridObj.SetParam("seq", seq);
	GridObj.SetParam("tgt_loc", tgt_loc);
	GridObj.SetParam("plan_type", plan_type);
	GridObj.SetParam("trans_start", trans_start);
	GridObj.SetParam("trans_end", trans_end);
	GridObj.SetParam("sort_type", sort_type);
	GridObj.SetParam("sort_stock_day", sort_stock_day);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj.SetParam("query_id", job_id);
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url);
}

function doQuery2() {//儅骯啗��
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id2;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj2.SetParam("mode", "search");
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	var item_id = GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex() );
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
	GridObj2.SetParam("query_id", "rp_01010_dailyTransportPlanNewSchPlan_pop");
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj2.DoQuery(servlet_url);
}

function doQuery3() {//殮堅濰 っ衙薑爾
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj3.SetParam("mode", "search3");
	
	var item_id = GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex() );
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var sale_yyyy = document.frm.sale_yyyy.value;
	var sale_version = document.frm.sale_version.value;
	var sale_seq = document.frm.sale_seq.value;
	
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("version", version);
	GridObj3.SetParam("seq", seq);
	GridObj3.SetParam("tgt_loc", tgt_loc);
	GridObj3.SetParam("sale_yyyy", sale_yyyy);
	GridObj3.SetParam("sale_version", sale_version);
	GridObj3.SetParam("sale_seq", sale_seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", job_id3);
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj3.DoQuery(servlet_url);
}

function doQuery4(flag) {//轎堅濰 營堅薑爾
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj4.SetParam("mode", "search4");
	
	var item_id = GridObj.GetCellValue("ITEM_ID", GridObj.GetActiveRowIndex() );
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var src_loc;

	var search_type = document.frm.search_type.value; //ж欽 斜葬萄 3廓 褻�� 嶸⑽
	GridObj4.SetParam("search_type", search_type);

	src_loc = document.frm.src_loc_sel.value;
	var tgt_loc = document.frm.tgt_loc.value;
	//alert("src_loc : " + src_loc + ", tgt_loc : " + tgt_loc);
	
	GridObj4.SetParam("item_id", item_id);
	GridObj4.SetParam("version", version);
	GridObj4.SetParam("seq", seq);
	GridObj4.SetParam("src_loc", src_loc);
	GridObj4.SetParam("tgt_loc", tgt_loc);
	
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj4.SetParam("query_id", job_id4);
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj4.DoQuery(servlet_url);
}

function doQuery5() {//熱轎 濛機濰 鼻離薑爾
	
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj5.SetParam("mode", "search5");
	
	var version = document.frm.version.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var trans_start = document.frm.trans_start.value;
	
	GridObj5.SetParam("version", version);
	GridObj5.SetParam("tgt_loc", tgt_loc);
	GridObj5.SetParam("trans_start", trans_start);

	// query_id
	GridObj5.SetParam("query_id", job_id5);
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj5.DoQuery(servlet_url);
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛盪濰
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doSave(version, seq, tgt_loc, plan_type) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", "save");
	
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄
	GridObj.SetParam("version",version);
	GridObj.SetParam("seq",seq);
	GridObj.SetParam("tgt_loc",tgt_loc);
	GridObj.SetParam("plan_type",plan_type);
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛偃滌 熱歎啗�� 檜婦
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doSaveEtc(tgt_loc, plan_type) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", "saveEtc");
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	GridObj.SetParam("version","20000000.01.01");
	GridObj.SetParam("seq","1");
	GridObj.SetParam("tgt_loc",tgt_loc);
	GridObj.SetParam("plan_type",plan_type);
	
	var version2 = document.frm.version.value;
	var seq2 = document.frm.seq.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	
	GridObj.SetParam("version2", version2);
	GridObj.SetParam("seq2", seq2);
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "SELECTED");
 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛м離
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doSumTruck() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", "sumTruck");
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	// 摹鷗脹 塭檣曖 
	// 熱歎橾濠, 轎堅濰, 離榆牖廓
	if( oldRow != 0 && oldRow == "" ){
		alert(" 試盪 м離 渠鼻擊 摹鷗 ж褊衛螃.");
		return;
	}
	
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var trans_date = GridObj.GetCellValue("TRANS_DATE", oldRow);
	var src_loc = GridObj.GetCellHiddenValue("SRC_LOC", oldRow);
	var truck_seq = GridObj.GetCellValue("TRUCK_SEQ", oldRow);
	//var item_id = GridObj.GetCellValue("ITEM_ID", oldRow);
	var user_id = document.frm._user_id.value;
	//alert("м離瞪"+tgt_loc);
	
	GridObj.SetParam("version", version);
	GridObj.SetParam("seq", seq);
	GridObj.SetParam("tgt_loc", tgt_loc);
	GridObj.SetParam("trans_date",trans_date);
	GridObj.SetParam("src_loc",src_loc);
	GridObj.SetParam("truck_seq",truck_seq);
	GridObj.SetParam("user_id",user_id);
		
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛м離 啗骯 �� 棻衛 褻��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuerySumTruck(){
	
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", "searchSumTruck");
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄

	var sort_type = document.frm.sort_type.value;
	var sort_stock_day = document.frm.sort_stock_day.value;
	var user_id = document.frm._user_id.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var version = document.frm.version.value;
	
	GridObj.SetParam("sort_type", sort_type);
	GridObj.SetParam("sort_stock_day", sort_stock_day);
	GridObj.SetParam("user_id", user_id);
	GridObj.SetParam("tgt_loc", tgt_loc);
	GridObj.SetParam("version", version);
	
	//alert("м離��"+tgt_loc);
		
	// query_id
	GridObj.SetParam("query_id", "do_sum_truck");
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url);	
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
	var endMode = GridObj.GetParam("mode");

	if(endMode == "search") { //褻��
		if(GridObj.GetStatus() == "true") { // 
			var paramKey = "tgt_loc";
			var paramCode = document.frm.tgt_loc.value;
			var queryId = "rp_01010_dailyTransportPlan_list_capa";
			commonUtil.getCodeList(paramKey, paramCode, queryId,{
				callback:function(result){
								
					if(result.length > 0){
						document.frm.max_capa.value = numberFormat(result);
					}			
				}
			}); 
			
			var version = document.frm.version.value;
			var seq = document.frm.seq.value;
			var tgt_loc = document.frm.tgt_loc.value;
			var plan_type = document.frm.plan_type.value;
			
			paramKey = "version!%!seq!%!tgt_loc!%!plan_type";
			paramCode = version + "!%!" + seq + "!%!"
							+ tgt_loc + "!%!" + plan_type;
			queryId = "rp_01010_dailyTransportPlan_list_stock";
			commonUtil.getCodeList(paramKey, paramCode, queryId,{
				callback:function(result){
								
					if(result.length > 0){
						document.frm.estimate_stock.value = numberFormat(result);
					}			
				}
			}); 	
			
			    
			// 葆雖虞 滲唳и Row煎 檜翕
			if( (rFirst > -1) && (rFirst < GridObj.GetRowCount())){
				//GridObj.MoveRow(rFirst);
				GridObj.SetRowScroll(rFirst);
			}			
			
			// 廓�� set
			setNo();
			
			// 餉薯脹 葬蝶お 蟾晦��
			delRowList = "";
			
			saved = true;
					
			GridObj.focus();
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(endMode == "insert") {
		
	} else if(endMode == "update") {
		
	} else if(endMode == "delete") {
		
	}else if(endMode == "save") {
		if(GridObj.GetStatus() == "true") {// 
			doQuery();	
			GridObj.focus();		
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(endMode == "sumTruck"){ //
		if(GridObj.GetStatus() == "true") {// 
			doQuerySumTruck();
			GridObj.focus();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(endMode == "searchSumTruck"){ //
		if(GridObj.GetStatus() == "true") {// 
//			alert(GridObj.GetCellHiddenValue("CRUD", 0));
//			alert(GridObj.GetCellHiddenValue("CRUD", 1));
//			alert(GridObj.GetCellHiddenValue("CRUD", 2));
			var rowCnt = GridObj.GetRowCount();
			for ( i = 0 ; i < rowCnt ; i++ ){
				var str = GridObj.GetCellHiddenValue("RTE", i);
				if( str == 'DE' ){
					//alert("!!");
					GridObj.DeleteRow(i);
					GridObj.SetRowHide(i, true); 
				}
				else if( str == 'AD' ){
					GridObj.SetCellValue("CRUD", i, "AD");
				}
				else if( str == 'UP' ){
					GridObj.SetCellValue("CRUD", i, "UP");
				}
			}
			
			// 葆雖虞 滲唳и Row煎 檜翕
			//GridObj.MoveRow(rFirst);
			if( (rFirst > -1) && (rFirst < GridObj.GetRowCount()) )
				GridObj.SetRowScroll(rFirst); 
			
			for( i = 0 ; i < GridObj.GetRowCount() ; i++ ){
				if( oldRowData == GridObj.GetCellValue("TRANS_DATE", i) + GridObj.GetCellHiddenValue("SRC_LOC", i) + 
									GridObj.GetCellValue("TRUCK_SEQ", i) + GridObj.GetCellValue("ITEM_ID", i)){
					oldColor = GridObj.GetCellInfo( 'bgcolor', 'NO', i );
					
					// 摹鷗и 煎辦 寡唳儀 撮た
					//GridObj.SetRowBgColor( i, color_select_row );
					
					// м離 渠鼻戲煎 摹鷗脹 Row select
					GridObj.MoveRow(i);
					
					GridObj.SetCellFocus('BASE_STK_PLT', i, false);
					
					oldRow = i;
					break;
				}
			}			
			
			// 餉薯脹 葬蝶お 蟾晦��
			delRowList = "";
			
			saved = false;
			
			GridObj.focus();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
		
		// 廓�� set
		setNo();

	}else if(endMode == "saveEtc") {
		if(GridObj.GetStatus() == "true") {// 
			doQuery();
			GridObj.focus();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}

	}else if(endMode == "Regen100" || endMode == "Regen200" || endMode == "Regen300"){
		if(GridObj.GetStatus() == "true") {// 
		alert("濠翕 鼻離褻м檜 諫猿 腎歷蝗棲棻 褻�裙� 濛機擊 衛濛п輿衛晦 夥奧棲棻.");
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
	var mode = GridObj2.GetParam("mode");

	if(mode == "search") { //褻��
		if(GridObj2.GetStatus() == "true") { // 
			var src_loc = GridObj.GetCellHiddenValue("SRC_LOC", GridObj.GetActiveRowIndex());	
			var rowCnt = GridObj2.GetRowCount();
			for( i = 0 ; i < rowCnt ; i++ ){
				if( GridObj2.GetCellHiddenValue("PLANT_NAME", i) == src_loc ){
					GridObj2.MoveRow(i);
					GridObj2.SetRowScroll(i);
				}
			}		
		} else	{ 
			var error_msg = GridObj2.GetMessage(); // 
			alert(error_msg);			
		}
	} 
}

function GridEndQuery3() {
		
	// wiseGrid縑憮 檜鼻詭撮雖 �挫怷�!
	if(GridObj3.GetStatus() != "true") {
		var error_msg_extra = GridObj3.GetMessage();// ?
		//alert("(GridObj3)檜 詭撮雖蒂 爾賊 �挫庛瑆撙� 殘雖 葆衛堅!!! 陴錠辨 傳朝 掏辨雙縑啪 瞪�倆� 輿撮蹂!\n" + error_msg_extra);	
		return;
	}

	setGrid3(GridObj3); //WiseGrid 撲薑
			
	//
	var mode = GridObj3.GetParam("mode");

	if(mode == "search3") { //褻��
		if(GridObj3.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj3.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		
	} else if(mode == "update") {
		
	} else if(mode == "delete") {
		
	}
}

function GridEndQuery4() {
		
	// wiseGrid縑憮 檜鼻詭撮雖 �挫怷�!
	if(GridObj4.GetStatus() != "true") {
		var error_msg_extra = GridObj4.GetMessage();// ?
		//alert("(GridObj4)檜 詭撮雖蒂 爾賊 �挫庛瑆撙� 殘雖 葆衛堅!!! 陴錠辨 傳朝 掏辨雙縑啪 瞪�倆� 輿撮蹂!\n" + error_msg_extra);	
		return;
	}

	setGrid4(GridObj4); //WiseGrid 撲薑
			
	//
	var mode = GridObj4.GetParam("mode");

	if(mode == "search4") { //褻��
		if(GridObj4.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj4.GetMessage(); // 
			alert(error_msg);			
		}
	} else if(mode == "insert") {
		
	} else if(mode == "update") {
		
	} else if(mode == "delete") {
		
	}else if(mode == "save") {
		
	}
}

function GridEndQuery5() {
		
	// wiseGrid縑憮 檜鼻詭撮雖 �挫怷�!
	if(GridObj5.GetStatus() != "true") {
		var error_msg_extra = GridObj5.GetMessage();// ?
		//alert("(GridObj5)檜 詭撮雖蒂 爾賊 �挫庛瑆撙� 殘雖 葆衛堅!!! 陴錠辨 傳朝 掏辨雙縑啪 瞪�倆� 輿撮蹂!\n" + error_msg_extra);	
		return;
	}

//	setGrid5(GridObj5); //WiseGrid 撲薑
			
	//
	var mode = GridObj5.GetParam("mode");

	if(mode == "search5") { //褻��
		if(GridObj5.GetStatus() == "true") { // 
			
			GridObj5.SetGroupMerge(	'ITEM_CODE,ITEM_NAME,STOCK_QTY');
			GridObj5.AddSummaryBar('SUMMARY', '模啗', 'ITEM_NAME', 'custom', 'STOCK_QTY,ORDER_QTY'); 
			GridObj5.SetSummaryBarFunction('SUMMARY', 'max', 'STOCK_QTY');
			GridObj5.SetSummaryBarFunction('SUMMARY', 'sum', 'ORDER_QTY');
			GridObj5.SetSummaryBarColor('SUMMARY', '0|0|0', '212|212|212'); 
			 						
		} else	{ 
			var error_msg = GridObj5.GetMessage(); // 
			alert(error_msg);			
		}
		
	}
		
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 撲薑
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setGrid(){
	
	// 鏽歲 寡唳儀
	GridObj.SetColCellBgColor('SP01',color_sp);//掘碟摹
	GridObj.SetColCellBgColor('SP02',color_sp);
	GridObj.SetColCellBgColor('SP03',color_sp);
	GridObj.SetColCellBgColor('SP04',color_sp);
	
	// 鏽歲 掘碟摹 ら餵 寰腎啪 虞擠.
	GridObj.SetColCellActivation('SP01','disable'); 
	GridObj.SetColCellActivation('SP02','disable');
	GridObj.SetColCellActivation('SP03','disable');
	GridObj.SetColCellActivation('SP04','disable');
	
    // 轎堅濰 掘碟儀
    setSrcLocBgColor();

	var rowLeng = GridObj.GetRowCount();
	if(rowLeng == 0){
		return;
	}
    
    // м啗 寡唳儀 塽 ら餵 寰腎啪 虞擠.
    var rowCnt = GridObj.GetRowCount();
    var str = GridObj.GetCellValue("SRC_LOC", rowCnt-1);
    if( str == "" ){
    	GridObj.SetRowBgColor(rowCnt-1, color_tot); // row 寡唳儀
    	GridObj.SetCellFontBold('SRC_LOC', rowCnt-1, 'true'); // font 掃晦  
    	//GridObj.SetRowFgColor(rowCnt-1, color_tot);
    	for( i = 0 ; i < GridObj.GetColCount() ; i++ ){
    		GridObj.SetCellActivation(GridObj.GetColHDKey(i), rowCnt-1, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻. 
    		
    	}    	
    }

}

function setGrid2(){
	
	// м啗
	GridObj2.AddSummaryBar('SUMMARY1', '瞪羹м啗', 'summaryall', 'sum', 'AVAIL,TRANS,STOCK,D01,D02SH1,D02SH3,D02SH5,D03SH1,D03SH3,D03SH5,D04SH1,D04SH3,D04SH5,D05SH1,D05SH3,D05SH5,D06SH1,D06SH3,D06SH5,D07SH1,D07SH3,D07SH5'); 
	GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '223|223|223'); 
			
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

function setGrid3(){
	
	// row 寡唳儀
	GridObj3.SetRowBgColor(0, '223|223|223');
	
}

function setGrid4(){
	
	// row 寡唳儀
    var rowCnt = GridObj4.GetRowCount();
	
	if(rowCnt > 0 ){
	GridObj4.SetRowBgColor(0, '223|223|223');
	GridObj4.SetColCellSortEnable('STOCK_QTY',true);
	}
	
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
			// 轎堅濰 掘碟 寡唳儀 棻衛 雖薑
			setSrcLocBgColor();		
			// 援瞳 啗骯 棻衛 л.
			calAllCum();
			// 廓�� set
			setNo();
		}
		else if( strMenuItemKey == "MENU02" ){	// ROW 餉薯
			if(confirm("餉薯 ж衛啊蝗棲梱?") == true){
				if(GridObj.GetCellValue("NO", nRow) != ""){
					GridObj.DeleteRow(nRow);
					GridObj.SetRowHide(nRow, true); 
					//GridObj.DeleteRow(nRow, false); 		
				}else{
					GridObj.DeleteRow(nRow);
				}
				// 援瞳 啗骯 棻衛 л.
				calAllCum();
				// 廓�� set
				setNo()
			}
		}
		else if( strMenuItemKey == "MENU03" ){	// 餉薯 鏃模

		}
		else {
			alert("襄營 ж雖 彊擎 詭景殮棲棻.");
		}		
	}

};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛餉薯 鏃模 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function unDo(){
	
	if( delRowList == "" ){
		alert("餉薯脹 ч檜 橈蝗棲棻.");
		return;
	}
	var list = delRowList.split("!%!");
	//alert(list[list.length-1]); 
	var idx = list[list.length-1];
	GridObj.SetRowHide(idx, false);
	GridObj.SetCellValue("CRUD", idx, "");
	GridObj.SetCellHiddenValue("CRUD", idx, "");
	GridObj.SetCellValue("SELECTED", idx, "0" );
	var idx = delRowList.lastIndexOf("!%!");
	delRowList = delRowList.substr(0,idx);
	//alert(delRowList);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ч 蹺陛/餉薯 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function rowInsDel(obj){
	var str = obj.value;
	var nRow = GridObj.GetActiveRowIndex();
	
	if( str == "蹺陛" ){		// ROW 蹺陛
		if( nRow == "" || nRow == null) nRow = 0;
		insertRow( nRow );	
		// 轎堅濰 掘碟 寡唳儀 棻衛 雖薑
		setSrcLocBgColor();		
		// 援瞳 啗骯 棻衛 л.
		calAllCum();
		// 廓�� set
		setNo();
	}
	else if( str == "餉薯" ){	// ROW 餉薯
		
//		if( nRow != 0 && (nRow == "" || nRow == null) ) {
//			alert("餉薯й ч擊 摹鷗п 輿褊衛螃.");
//			return;
//		}
		if(confirm("餉薯 ж衛啊蝗棲梱?") == true){
			for( i = 0 ; i < GridObj.GetRowCount() ; i++ ){
				if( GridObj.GetCellValue("SELECTED", i) == "1" ){
					if(GridObj.GetCellValue("NO", i) != ""){
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
						//GridObj.DeleteRow(nRow, false); 		
					}else{
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
					}
					
					if( delRowList == "" ){// 餉薯 葬蝶お縑 Row Index 蹺陛
						delRowList += "" + i;
					}else{
						delRowList += "!%!" + i;
					}					
				}
			}
			// 轎堅濰 掘碟 寡唳儀 棻衛 雖薑
			setSrcLocBgColor();	
			// 援瞳 啗骯 棻衛 л.
			calAllCum();
			// 廓�� set
			setNo()
		}
	}
	
	saved = false;

};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ч 詩じ摹鷗 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function rowInsSel(obj){
	
	var sel_data = GridObj.GetSelectedCells(); // 摹鷗и 睡碟曖 key諦 row蒂 陛螳螞棻
	var i=0;
	var rowNo;
	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 渦檜鼻 等檜攪 橈棻
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//п渡 row縑 check蒂 и棻
			GridObj.SetCellValue("SELECTED", rowNo, "1");
		}
		i++;
	}
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ч 詩じ摹鷗 鏃模 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function rowInsDeSel(obj){
	
	var sel_data = GridObj.GetSelectedCells(); // 摹鷗и 睡碟曖 key諦 row蒂 陛螳螞棻
	var i=0;
	var rowNo;
	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 渦檜鼻 等檜攪 橈棻
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//п渡 row縑 check蒂 и棻
			GridObj.SetCellValue("SELECTED", rowNo, "0");
		}
		i++;
	}
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Change Combo Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	// 轎堅濰 掘碟 寡唳儀 棻衛 雖薑
	setSrcLocBgColor();
	
	getBoxPerPalet( nRow ); // 轎堅濰橾唳辦 box_per_palet 蹺轎

	// 援瞳 啗骯 棻衛 л.
	calAllCum();
	
	saved = false;
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid4 Duble Click Event - 4廓 斜葬萄 薯ヶ貲 贗葛衛 鼻離 褻м�飛橦� 褐敘 蹺陛 
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClickHandler4(strColumnKey, nRow){
	var idx = GridObj.GetActiveRowIndex(); // 摹鷗脹 Row曖 檣策蝶
	
	insertRow( idx ); // 摹鷗脹 Row 壽縑 億煎遴 Row 蹺陛
	
	GridObj.SetCellValue("ITEM_ID", idx+1, GridObj4.GetCellHiddenValue("ITEM_NAME", nRow));
	GridObj.SetCellValue("ITEM_NAME", idx+1, GridObj4.GetCellValue("ITEM_NAME", nRow));

	cnt = idx+1;
	var pltSum = Number(GridObj.GetCellValue("CUM_PLT", idx));
	var boxSum = Number(GridObj.GetCellValue("CUM_BOX", idx));
	do{
		pltSum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
		boxSum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
		GridObj.SetCellValue("CUM_PLT", cnt, pltSum);
		GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxSum));
	}
	while((GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < GridObj.GetRowCount()));
	
	// 轎堅濰 掘碟 寡唳儀 棻衛 雖薑
	setSrcLocBgColor();
	
	// 援瞳 啗骯 棻衛 л.
	calAllCum();
	// 廓�� set
	setNo()
	
	getBoxPerPalet( idx+1 );
};
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid4  Click Event  п渡 ヶ跡 褻��  - 纔蝶お searchinfo
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function Grid4CellDblClickSearch(strColumnKey, nRow){
//alert(strColumnKey);

	if(strColumnKey == "ITEM_NAME" ){
		GridCellDblClickHandler4(strColumnKey, nRow);
		return
	}else{
		
	}	
	var item_id = GridObj4.GetCellHiddenValue("ITEM_NAME", nRow)
	
	doQuery10(item_id);
	doQuery11(item_id);
};

function doQuery10(item_id) {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id2;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj2.SetParam("mode", "search");
	
	var item_id ;
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
	GridObj2.SetParam("query_id", "rp_01010_dailyTransportPlanNewSchPlan_pop");
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj2.DoQuery(servlet_url);
}

function doQuery11(item_id) {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj3.SetParam("mode", "search3");
	
	var item_id ;
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var sale_yyyy = document.frm.sale_yyyy.value;
	var sale_version = document.frm.sale_version.value;
	var sale_seq = document.frm.sale_seq.value;
	
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("version", version);
	GridObj3.SetParam("seq", seq);
	GridObj3.SetParam("tgt_loc", tgt_loc);
	GridObj3.SetParam("sale_yyyy", sale_yyyy);
	GridObj3.SetParam("sale_version", sale_version);
	GridObj3.SetParam("sale_seq", sale_seq);
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj3.SetParam("query_id", job_id3);
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj3.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Row Scroll Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
	rEnd = nEndVisibleRowIndex;
}

//--------------------------------------   main_template 縑 薑曖脹 Event ---------------------------------------------------//
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	// 晦獄營堅鼻離, 蹺陛營堅鼻離, 儅骯鼻離 PLT 塽 BOX 熱榆 滲唳衛
	// м啗 塽 援瞳 啗骯 塽 PLT, BOX 熱榆 滲唳
	if(strColumnKey.lastIndexOf("PLT") >= 0 || strColumnKey.lastIndexOf("BOX") >= 0){
		
		var col_name = "";
		if( strColumnKey.lastIndexOf("PLT") >= 0 ) {
			changePLT( strColumnKey, nRow, nOldValue, nNewValue ); // м啗 塽 援瞳м啗 啗骯 PLT
			calBoxQty( strColumnKey, nRow );					 // BOX 熱榆 熱薑
		} // м啗 塽 援瞳м啗 啗骯 PLT
		else {
			changeBOX( strColumnKey, nRow, nOldValue, nNewValue ); // м啗 塽 援瞳м啗 啗骯 BOX
			calPltQty( strColumnKey, nRow );					 // BOX 熱榆 熱薑
		}
		
		saved = false;
	}
	
	// 熱歎橾濠, 離榆牖廓 滲唳衛 
	// 轎堅濰 掘碟 寡唳儀 棻衛 雖薑 塽 援瞳 高 啗骯	
	if( strColumnKey == "TRANS_DATE" || strColumnKey == "TRUCK_SEQ"){
		
		// 轎堅濰 掘碟 寡唳儀 棻衛 雖薑
		setSrcLocBgColor();
		
		// 援瞳 鼻離 餵啗 棻衛 啗骯
		// 滲唳и  斜瑜(熱歎橾濠, 轎堅濰, 離榆牖廓) 滲唳 ��
		// 棻擠 斜瑜(熱歎橾濠, 轎堅濰, 離榆牖廓) 紫 滲唳и棻.
		var next_nRow = calCum(nRow); // 滲唳脹 熱歎橾濠, 轎堅濰, 離榆牖廓縑 п渡ж朝 援瞳高 啗骯
		
		calCum(next_nRow);            // 滲唳脹 熱歎橾濠, 轎堅濰, 離榆牖廓曖 棻擠 熱歎橾濠, 轎堅濰, 離榆牖廓縑 п渡ж朝 援瞳高 啗骯
		
		if( strColumnKey == "TRANS_DATE" ) {
			getBoxPerPalet( nRow ); // 轎堅濰橾唳辦 box_per_palet 蹺轎
			GridObj.SetCellHiddenValue("TRANS_DATE", nRow, nOldValue); // 晦襄 熱歎橾濠 盪濰
		}
		
		calAllCum(); // 援瞳 啗骯 棻衛л
		// 廓�� set
		setNo();
		
		saved = false;
	}
	
	// 薯ヶ 囀萄 滲唳衛 
	if( strColumnKey == "ITEM_ID" ){
		
		// box_per_palet 蹺轎
		getBoxPerPalet( nRow );
		
		// 薯ヶ 貲 set
		getItemInfo( nRow, nNewValue );
		
		saved = false;
	}
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛餌辨濠 霜蕾 殮溘高戲煎睡攪 薯ヶ薑爾 褻��
  弛薯ヶ 囀萄, 薯ヶ 貲 萃 醞 ж釭塭紫 橾纂ж朝 等檜攪 匐儀 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function getItemInfo( nRow, nNewValue ) {
	
	var dc_id = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	var ItemId = nNewValue;
	
	// 轎堅濰 傳朝 薯ヶ囀萄 等檜攪陛 橈朝 唳辦 л熱蒂 緒螳釭除棻
	if( dc_id == "" || dc_id == null ) {
		alert("轎堅濰擊 試盪 摹鷗ж撮蹂.");
		return;
	}
	
	// 薯ヶ囀萄 等檜攪陛 橈朝 唳辦 л熱蒂 緒螳釭除棻
	if( ItemId == null || ItemId == "" ) {
		openItemSearchPop("ITEM_ID", nRow);
		return;
	}
	
	replenishPlan.getItemInfo(dc_id, ItemId, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// 橾纂ж朝 唸婁 橈擠
			if( arrList.length == 0 ) {
				openItemSearchPop("ITEM_ID", nRow);
			}
			// 橾纂ж朝 唸婁 1偃
			else if( arrList.length == 1 ) {
				GridObj.SetCellValue("ITEM_ID", nRow, arrList[0][0]);
				GridObj.SetCellValue("ITEM_NAME", nRow, arrList[0][1]);
				GridObj.SetCellValue("BOX_PER_PALET", nRow, arrList[0][2]);

			}
			else {
				openItemSearchPop("ITEM_ID", nRow);
			}
		}
	});
	
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Click Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/

function GridCellClick(strColumnKey, nRow){

	if( strColumnKey == "NO" ){
		GoSearchInfo();
	}	
	
	oldRowData = GridObj.GetCellValue("TRANS_DATE", nRow) + GridObj.GetCellHiddenValue("SRC_LOC", nRow)
					+ GridObj.GetCellValue("TRUCK_SEQ", nRow) + GridObj.GetCellValue("ITEM_ID", nRow);
	oldRow = nRow;
	
	// 籀擠 轎堅濰檜 摹鷗腎橫 氈雖 彊擎 唳辦縑虜 嬴楚諦 偽檜 籀葬. 
	if(document.frm.src_loc_sel.value == null || document.frm.src_loc_sel.value == ""){
		document.frm.src_loc_sel.value = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	}
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Duble Click Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClickHandler(strColumnKey, nRow){

	var findrow = GridObj5.FindArea(GridObj.GetCellValue("ITEM_ID", nRow),'ITEM_CODE',0,'ITEM_CODE',GridObj5.GetrowCount()-1);
	findrow = findrow.split(",")[1];
	GridObj5.MoveRow(findrow); 
	GridObj5.SetCellFocus('ITEM_CODE', findrow, false);

	GridObj.SetCellFocus('ITEM_ID', nRow, false);
	// 薯ヶ 囀萄 鏽歲檜賊 薯ヶ 匐儀 で機 褒ч
//	if( strColumnKey == "ITEM_ID" ){
//		openItemSearchPop( strColumnKey, nRow );
//	}
	
};

/*********************************************   晦顫 Function   **********************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛殮堅濰 select box 儅撩 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doChangeVersion(){
	var version = document.frm.version.value;
	var seq = document.frm.seq.value;
	var tgt_loc = document.frm.tgt_loc.value;
	
	var paramKey = "version!%!seq";
	var paramCode = version + "!%!" + seq;
	var queryId = "trans_dc_id_and_short_name_list_new";
	
	commonUtil.getSelQeury(paramKey, paramCode, queryId,{
		callback:function(result){
						
			if(result.length > 0){
				var divTgt = "<select name=\"tgt_loc_sel\" style=\"width:160px; \" >";
				divTgt += "<option value=\"\">摹鷗</option>"
				
				for( i = 0 ; i < result.length; i++ ){
					divTgt += "<option value=\"" + result[i][0] + "\" ";
					if( result[i][2] == "Y" ){// и廓 檜鼻 盪濰脹 殮堅濰 喻塢儀戲煎 ル衛
						divTgt += "style=\"background-color:#ffffaa; \" ";
					}
					
					if( tgt_loc == result[i][0]){
						divTgt += "selected>";
					}else{
						divTgt += ">";
					}
					
					divTgt += result[i][1] + "</option>";
				}				
                																
                divTgt += "</select>"
                
                divTgtLoc.innerHTML = divTgt;
				
			}else{
				alert("殮堅濰 葬蝶お蒂 陛螳螃雖 跤ц蝗棲棻.");
			}			
		}
	});
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛廓�� Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setNo(){
	var rowCnt = GridObj.GetRowCount()-1;
	var cnt = 1;
	var truck_seq = GridObj.GetCellValue("TRUCK_SEQ", 0);
	for( i = 0 ; i < rowCnt ; i++ ){
		
		if( !GridObj.IsRowHide(i) ){// 獗啖霞 Row陛 嬴棲賊 廓�� 衙梯
			GridObj.SetCellValue("NO", i, cnt++);
		}
		var temp = GridObj.GetCellValue("TRUCK_SEQ", i+1);
		if( truck_seq != temp ){// 離榆 牖廓檜 夥莎唳辦
			cnt = 1; //廓�� 蟾晦��
			truck_seq = temp; // 離榆 牖廓 滲唳
		}
	}
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛援瞳 啗骯 瞪羹 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function calAllCum(){
	var rowCnt = GridObj.GetRowCount();
	var cnt = 0;
	var pltCum = 0;
	var boxCum = 0;	
	
	do{
		if( GridObj.GetCellValue("CRUD", cnt) != 'DE' ){
			pltCum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
			boxCum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
			GridObj.SetCellValue("CUM_PLT", cnt, pltCum);
			GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxCum));
			
			if(GridObj.GetCellHiddenValue("CUM_PLT", cnt) == "CUM"){
				// 援瞳 高 盪濰 滲熱 蟾晦��
				pltCum = 0;
				boxCum = 0;
			}
		}
		cnt++;
	}
	while(cnt < rowCnt);
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛轎堅濰 掘碟 寡唳儀 set Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setSrcLocBgColor(){
	// 轎堅濰 掘碟儀
	var rowLeng = GridObj.GetRowCount();
	if(rowLeng == 0){
		return;
	}
	
	var str = GridObj.GetCellValue("TRANS_DATE", 0)
				  + GridObj.GetCellHiddenValue("SRC_LOC", 0)
				  + GridObj.GetCellValue("TRUCK_SEQ", 0);
	
	var colBg = colBg01; //塭檣 掘碟 儀
	
	// 轎堅濰滌 援瞳 м啗 flag 塽 旋濠儀 蟾晦��
	for( i = 0 ; i < rowLeng ; i++ ){
		GridObj.SetCellFgColor('CUM_PLT', i, '0|0|0'); 
		GridObj.SetCellFgColor('CUM_BOX', i, '0|0|0');
		GridObj.SetCellHiddenValue("CUM_PLT", i, "");
		GridObj.SetCellHiddenValue("CUM_BOX", i, "");
	}
	
	var preIdx = 0;
	for( i = 0 ; i < rowLeng ; i++ ){
		if(GridObj.GetCellHiddenValue("RTE", i) == 'DE' || GridObj.GetCellValue("CRUD", i) == 'DE'){ 
			continue; 
		}else{
			//濛機濰滌 掘碟(row寡唳儀)
			if( str != GridObj.GetCellValue("TRANS_DATE", i) + GridObj.GetCellHiddenValue("SRC_LOC", i) + GridObj.GetCellValue("TRUCK_SEQ", i) ){		
				GridObj.SetCellFgColor('CUM_PLT', preIdx, '255|10|10'); // 援瞳鼻離 餵啗 轎堅濰滌 葆雖虞 塭檣 旋濠儀 雖薑
				GridObj.SetCellFgColor('CUM_BOX', preIdx, '255|10|10');
				
				GridObj.SetCellHiddenValue("CUM_PLT", preIdx, "CUM"); // 援瞳 м啗 啗骯衛 餌辨ж晦 嬪и flag 撢た
				GridObj.SetCellHiddenValue("CUM_BOX", preIdx, "CUM");
					
				str = GridObj.GetCellValue("TRANS_DATE", i) + GridObj.GetCellHiddenValue("SRC_LOC", i) + GridObj.GetCellValue("TRUCK_SEQ", i);
				if(colBg == colBg01) {
					colBg = colBg02;				
				}
				else {
					colBg = colBg01;				
				}
			}
	
			for( j = 0; j < GridObj.GetColCount(); j++){
				// 鏽歲掘碟摹
				if(GridObj.GetColHDKey(j).substr(0,2) == "SP"){
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, color_sp); 
				}						
				// 塭檣 掘碟 寡唳儀
				else{
					GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colBg); 
				}			
			}
			//GridObj.SetRowBgColor(i, colBg); // row 寡唳儀 雖薑				
			
	//		if( i == rowLeng-1 ){// 斜瑜 滌 葆雖虞 Row蒂 餉薯 ц擊 唳辦 援瞳 м啗 旋濠儀檜 雖薑 寰腎橫憮...
	//			var idx = rowLeng-2;
	//			//var flag = true;
	//			while(1){
	//				if(GridObj.GetCellValue("CRUD", idx) != "DE"){
	//					GridObj.SetCellFgColor('CUM_PLT', idx, '255|10|10'); // 援瞳鼻離 餵啗 轎堅濰滌 葆雖虞 塭檣 旋濠儀 雖薑
	//					GridObj.SetCellFgColor('CUM_BOX', idx, '255|10|10');
	//					
	//					GridObj.SetCellHiddenValue("CUM_PLT", idx, "CUM"); // 援瞳 м啗 啗骯衛 餌辨ж晦 嬪и flag 撢た
	//					GridObj.SetCellHiddenValue("CUM_BOX", idx, "CUM");
	//					break;
	//				}
	//				idx--;
	//			}
	//		}
			preIdx = i;
		}
	}
	
	var str = GridObj.GetCellValue("SRC_LOC", rowLeng-1);
    if( str == "" ){
    	GridObj.SetRowBgColor(rowLeng-1, color_tot); // row 寡唳儀
    	GridObj.SetCellFontBold('SRC_LOC', rowLeng-1, 'true'); // font 掃晦  
    	//GridObj.SetRowFgColor(rowCnt-1, color_tot);
    	for( i = 0 ; i < GridObj.GetColCount() ; i++ ){
    		GridObj.SetCellActivation(GridObj.GetColHDKey(i), rowLeng-1, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻. 
    		
    	}    	
    }
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛援瞳 鼻離 餵啗 援瞳高 啗骯 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function calCum(nRow){
	// 援瞳 鼻離 餵啗 啗骯
	var cnt = nRow;
	var pltCum = 0;
	var boxCum = 0;
	do{
		pltCum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) 
				  + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt))
				  + Number(GridObj.GetCellValue("PROD_PLT", cnt));
				  
		boxCum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) 
				  + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt))
				  + Number(GridObj.GetCellValue("PROD_BOX", cnt));
				  
		GridObj.SetCellValue("CUM_PLT", cnt, pltCum);
		GridObj.SetCellValue("CUM_BOX", cnt, boxCum);
	}while((GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < GridObj.GetRowCount()));
	
	return cnt; // 葆雖虞 援瞳 啗骯脹 棻擠 row 檣策蝶 葬欐
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛PLT 熱榆 滲唳 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function changePLT(strColumnKey, nRow, nOldValue, nNewValue){
	
	var col_name = "CUM_PLT"; // м啗 塽 援瞳м啗 啗骯 PLT
	
	var diff = nNewValue - nOldValue;
	
	var rowCnt = GridObj.GetRowCount();
	
	// 援瞳 鼻離 餵啗 м啗
	var cum_plt = Number(GridObj.GetCellValue(col_name, rowCnt-1));
	GridObj.SetCellValue(col_name, rowCnt-1, cum_plt + diff);
	
	// 滲唳脹 鏽歲 м啗
	var tot = Number(GridObj.GetCellValue(strColumnKey, rowCnt-1));
	GridObj.SetCellValue(strColumnKey, rowCnt-1, Math.round(tot + diff));
	
	// 援瞳 鼻離 餵啗 啗骯
	var cnt = nRow;
	do{
		GridObj.SetCellValue(col_name, cnt, Number(GridObj.GetCellValue(col_name, cnt)) + diff);
	}
	while((GridObj.GetCellHiddenValue(col_name, cnt++) != "CUM") && (cnt < rowCnt));	

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛BOX 熱榆 滲唳 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function changeBOX(strColumnKey, nRow, nOldValue, nNewValue){
	
	var col_name = "CUM_BOX"; // м啗 塽 援瞳м啗 啗骯 PLT
	
	var diff = nNewValue - nOldValue;
	//alert(diff);	
	var rowCnt = GridObj.GetRowCount();
	
	// 援瞳 鼻離 餵啗 м啗
	var cum_plt = Number(GridObj.GetCellValue(col_name, rowCnt-1));
	GridObj.SetCellValue(col_name, rowCnt-1, cum_plt + diff);
	
	// 滲唳脹 鏽歲 м啗
	var tot = Number(GridObj.GetCellValue(strColumnKey, rowCnt-1));
	GridObj.SetCellValue(strColumnKey, rowCnt-1, tot + diff);
	
	// 援瞳 鼻離 餵啗 啗骯
	var cnt = nRow;
	do{
		GridObj.SetCellValue(col_name, cnt, Number(GridObj.GetCellValue(col_name, cnt)) + diff);
	}
	while((GridObj.GetCellHiddenValue(col_name, cnt++) != "CUM") && (cnt < rowCnt));

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛Box 熱榆 啗骯  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function calBoxQty( strColumnKey, nRow ) {
	
	var col_name = strColumnKey.replace("PLT","");
	var nOldValue = GridObj.GetCellValue(col_name + "BOX", nRow);
	
	var boxPerPalet = GridObj.GetCellValue("BOX_PER_PALET", nRow);
	
	// PALET 渡 BOX 熱榆檜 橈朝 唳辦 100 戲煎 啗骯
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var pltQty = Number(GridObj.GetCellValue(strColumnKey, nRow));
	var boxQty = Math.round(pltQty * boxPerPalet*100)/100;
	boxQty = Math.round(boxQty);
	GridObj.SetCellValue(col_name + "BOX", nRow, boxQty);
	
	// 援瞳 鼻離 餵啗 塽 м啗 啗骯
	changeBOX(col_name+"BOX", nRow, nOldValue, boxQty);
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛PLT 熱榆 啗骯  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function calPltQty( strColumnKey, nRow ) {
	var col_name = strColumnKey.replace("BOX","");
	var nOldValue = GridObj.GetCellValue(col_name + "PLT", nRow);
	
	var boxPerPalet = GridObj.GetCellValue("BOX_PER_PALET", nRow);
	
	// PALET 渡 BOX 熱榆檜 橈朝 唳辦 100 戲煎 啗骯
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var boxQty = Number(GridObj.GetCellValue(strColumnKey, nRow));
	var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;
	GridObj.SetCellValue(col_name + "PLT", nRow, pltQty);
	
	// 援瞳 鼻離 餵啗 塽 м啗 啗骯
	changePLT(col_name+"PLT", nRow, nOldValue, pltQty);
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛box_per_palet 蹺轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function getBoxPerPalet( nRow ) {
	
	// 轎堅濰, 薯ヶ囀萄 蹺轎
	var dc_id = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	var item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	
	
	// 轎堅濰 傳朝 薯ヶ囀萄 等檜攪陛 橈朝 唳辦 л熱蒂 緒螳釭除棻
	if( dc_id == null || dc_id == "" || item_id == null || item_id == "" ) {
		return;
	}
	
	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
		callback:function(boxPerPalet){
			if( boxPerPalet == null || boxPerPalet == "" ) {
				GridObj.SetCellValue("BOX_PER_PALET", nRow, 100);
			}
			else {
				GridObj.SetCellValue("BOX_PER_PALET", nRow, boxPerPalet);
			}
		}
	});	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Insert Row Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	//alert("rowCnt : " + rowCnt + " , nRow : " + nRow);//1,0
	if( (rowCnt > 1) && (rowCnt-1 == nRow) ){ // 葆濠虞 塭檣橾 唳辦 
		GridObj.InsertRow(-1);
	}else if(rowCnt <= 1){// 
		GridObj.InsertRow(0);
		nRow = -1;
	}
	else{
		GridObj.InsertRow(nRow+1);
	}
	
	// 晦獄 等檜攪 撢た
	if(nRow == -1){
		GridObj.SetCellValue("RTE", 0, "");
		GridObj.SetCellValue("TRANS_DATE", 0, "");
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", 0, "");
		GridObj.SetCellValue("TRUCK_SEQ", 0, "");
		GridObj.SetCellValue("PLAN_TYPE", 0, "");	
	}else{
		GridObj.SetCellValue("RTE", nRow+1, GridObj.GetCellValue("RTE", nRow));
		GridObj.SetCellValue("TRANS_DATE", nRow+1, GridObj.GetCellValue("TRANS_DATE", nRow));
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", nRow+1, GridObj.GetCellHiddenValue("SRC_LOC", nRow));
		GridObj.SetCellValue("TRUCK_SEQ", nRow+1, GridObj.GetCellValue("TRUCK_SEQ", nRow));
		GridObj.SetCellValue("PLAN_TYPE", nRow+1, GridObj.GetCellValue("PLAN_TYPE", nRow));
	}
	
	var	cnt = nRow+1;
	if( nRow == -1 ) nRow = 0;
	var pltSum = Number(GridObj.GetCellValue("CUM_PLT", nRow));
	var boxSum = Number(GridObj.GetCellValue("CUM_BOX", nRow));
	do{
		pltSum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
		boxSum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
		GridObj.SetCellValue("CUM_PLT", cnt, pltSum);
		GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxSum));
	}
	while( (GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < rowCnt));
};

// Total Plt 殘晦
function closeTotalPlt() {
	if( divTotalPlt.style.display == "BLOCK" 
		|| divTotalPlt.style.display == "block" ) {
		divTotalPlt.style.display = "none";
	} 
	
	// wisegrid 棻衛 爾檜啪 л.
	document.WiseGrid.style.display = "block";
	document.WiseGrid2.style.display = "block";
	document.WiseGrid3.style.display = "block";
	document.WiseGrid4.style.display = "block";
}

// Total Plt 翮晦
function openTotalPlt() {

	// wisegrid 寰 爾檜啪 л.
	document.WiseGrid.style.display = "none";
	document.WiseGrid2.style.display = "none";
	document.WiseGrid3.style.display = "none";
	document.WiseGrid4.style.display = "none";
	
	var tableLen = GridObj.GetRowCount();
	var pltTableLen = plt_tbody.rows.length;
	var v_trans_date = null;
	var v_src_loc = null;
	var v_src_name = null;
	var v_truck_seq = 0;
	var v_cum_plt = 0;
	var insertRow = 0;
	
	// Row陛 襄營ж雖 彊朝 唳辦.
	if(tableLen == 1){
		alert("援瞳 PLT蒂 啗骯й 等檜顫陛 襄營ж雖 彊蝗棲棻.");
		return;
	}	
	else{	
		// 試盪 晦襄 Row 餉薯
		for(var j = 0; j< pltTableLen; j++){
			plt_tbody.deleteRow(j);
			j--;
			pltTableLen--;
		}
		// 瞪羹 Row蒂 ж釭噶 檗橫 頂葬賊憮 偽雖 彊朝 高擊 div縑 蹺陛л.
		for(var i = 0; i< tableLen-1; i++){
			if( GridObj.GetCellHiddenValue("CUM_PLT", i) == "CUM"){
				// в熱 殮溘高擊 殮溘ж雖 彊擎 唳辦, 援瞳 高擊 爾罹 輿雖 彊擠.
				if(GridObj.GetCellValue("TRANS_DATE", i) == "" || GridObj.GetCellValue("TRANS_DATE", i) == null
				|| GridObj.GetCellValue("SRC_LOC", i) == "" || GridObj.GetCellValue("SRC_LOC", i) == null
				|| GridObj.GetCellValue("TRUCK_SEQ", i) == "" || GridObj.GetCellValue("TRUCK_SEQ", i) == null){
					alert("熱歎橾濠, 轎堅濰, 離榆廓�ㄧ� 薑�旅� 殮溘ж褐 �� 棻衛 贗葛п 輿褊衛蹂.");
					return;
				}
				v_trans_date = GridObj.GetCellValue("TRANS_DATE", i);
				v_src_loc    = GridObj.GetCellHiddenValue("SRC_LOC", i);
				v_src_name   = GridObj.GetCellValue("SRC_LOC", i);
				v_truck_seq  = GridObj.GetCellValue("TRUCK_SEQ", i);
				v_cum_plt    = GridObj.GetCellValue("CUM_PLT", i);
				
				var oRowPlt = plt_tbody.insertRow(insertRow);
				insertRow ++;
				oRowPlt.height = 22; 
						
				var oCell0 = oRowPlt.insertCell(); // 熱歎橾濠
				var oCell1 = oRowPlt.insertCell(); // 轎堅濰
				var oCell2 = oRowPlt.insertCell(); // 離榆廓��
				var oCell3 = oRowPlt.insertCell(); // PLT
				
				oCell0.align = "center"; oCell0.width = "29%" ; // 熱歎橾濠
				oCell1.align = "center"; oCell1.width = "25%" ; // 轎堅濰
				oCell2.align = "center"; oCell2.width = "25%" ; // 離榆廓��
				oCell3.align = "right";  oCell3.width = "21%" ; // PLT 
				oCell3.className = "right"; // 儅骯鼻離 BOX
				
				// 廓��
				//oCell0.innerHTML = "<a id=\"divRowNo\"></a> <input type=\"hidden\" name=\"box_per_palet\">";
				//oCell0.style.backgroundColor = document.frm.searchBgcolor.value;
				
				// 熱歎橾濠
				oCell0.innerHTML = "<input type=\"text\" name=\"v_trans_date\" value="+v_trans_date+" " 
								+ "style=\"border : 0px; text-align:center; width:100%; \" readonly> ";
				// 轎堅濰
				oCell1.innerHTML = "<a>"+v_src_name+"</a>" 
								+ "<input type=\"hidden\" name=\"v_src_loc\" value="+v_src_loc+"> ";
				// 離榆廓��
				oCell2.innerHTML = "<input type=\"text\" name=\"v_truck_seq\" value="+v_truck_seq+" " 
								+ "style=\"border : 0px; text-align:center; width:100% \" readonly> ";
				// PLT
				oCell3.innerHTML = "<input type=\"text\" name=\"v_cum_plt\" value="+v_cum_plt+" " 
								+ "style=\"border : 0px; text-align:right; width:100% \" readonly> ";
				document.recalc();
			}				
		}// end for
		
	}// end if
	
	var pltTransLen = plt_tbody.rows.length;
	
	if(pltTransLen > 1){ // Row 熱陛 1偃 檜鼻橾 唳辦縑虜 醞犒腎朝 匙檜 氈朝雖 羹觼
		for(var i = 0; i < pltTransLen; i++){
			for(var j = i + 1; j < pltTransLen; j++){
				if(document.frm.v_trans_date[j]){
					if(document.frm.v_trans_date[i].value == document.frm.v_trans_date[j].value
					&& document.frm.v_src_loc[i].value == document.frm.v_src_loc[j].value
					&& document.frm.v_truck_seq[i].value == document.frm.v_truck_seq[j].value){
						var cum_plt_tmp = strToNum(document.frm.v_cum_plt[i].value) + strToNum(document.frm.v_cum_plt[j].value);
						cum_plt_tmp = Math.round(numberFormat(cum_plt_tmp.toString(),2)*100)/100;
						document.frm.v_cum_plt[i].value = cum_plt_tmp;
					
						plt_tbody.deleteRow(j);
						j--;
						pltTransLen--;
					}
				}
			}
			if(strToNum(document.frm.v_cum_plt[i].value) < 12)
				document.frm.v_cum_plt[i].style.color = "red";
		}
	}
	else{
		if(document.frm.v_cum_plt[0]){
			if(strToNum(document.frm.v_cum_plt[0].value) < 12)
				document.frm.v_cum_plt[0].style.color = "red";
		}
		else{
			if(strToNum(document.frm.v_cum_plt.value) < 12)
				document.frm.v_cum_plt.style.color = "red";
		}
	}
	
	// div曖 display蒂 block戲煎 滲唳
	if( divTotalPlt.style.display == "NONE" 
		|| divTotalPlt.style.display == "none" ) {
		divTotalPlt.style.display = "block";
	} 
}

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
	document.WiseGrid5.height = tableHeightValue + "px"; 
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛薯ヶ 匐儀 POPUP  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function openItemSearchPop( strColumnKey, nRow ) { 
	
	var rowIdx = nRow
	var tgt_loc = document.frm.tgt_loc.value;
	var code_input = GridObj.GetCellValue("ITEM_ID", nRow);
	var src_loc = GridObj.GetCellHiddenValue("SRC_LOC", nRow);
	
	if( src_loc == "" || src_loc == null ) {
		alert("轎堅濰擊 試盪 摹鷗ж撮蹂.");
		return;
	}
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans_wisegrid&code_input=" + code_input + "&rowIdx=" + rowIdx;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1" + "&tgt_loc=" + tgt_loc + "&src_loc=" + src_loc;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
}


//------------------------------------------------- 晦襄曖 л熱 ------------------------------------------------------//

// Ctrl 酈陛 keydown 鼻鷓檣雖 羹觼ж朝 flag
var ctrlKeyDownCheck = false;

// CTRL  酈蒂 揚毓擊陽 ��轎
function setCtlKeyDown(e){
	if (!e) e = window.event;
	
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = true;
	}
}

// CTRL 酈, F2 酈蒂 揚毓棻陛 場懊擊陽 ��轎
function setCrlKeyUp(e){
	if (!e) e = window.event;
	
	// F2 酈
	if(e.keyCode == "113"){
		//clickLine(document.frm.btnSearchRow, 1);
		//GoSearchInfo();
		//rowInsDel(document.frm.btnInsertRow); // Row蹺陛 
		//alert("!!");
	}
	
	// ctrl 酈 
	if(e.keyCode == "17"){
		ctrlKeyDownCheck = false;
	}
}


// version - seq 碟葬
function setVersions( versions ) {

	var verArr = versions.split("!%!");
	if( verArr.length == 2 ) {
		document.frm.version.value = verArr[0].trim();
		document.frm.seq.value = verArr[1].trim();
	}
	
}

/********************************************************************************************/
// divTotalPlt 睡碟 (億煎遴 div璽 籀葬)
/********************************************************************************************/

var checkMouseDown = false;
var dragobject = null;
var tx;
var ty;

// 摹鷗脹 �飛� 偌羹醞縑 parentNode陛 鼠歙檣雖 瓊嬴頂朝 煎霜.
function getReal(el) {
	temp = el;

	while ((temp != null) && (temp.tagName != "BODY")) {
		if (temp.id == "totalPltHeader"){
			el = temp.parentElement;
			return el;
		}
		temp = temp.parentElement;
	}
	return el;
}

// Mouse 豭薹 酈蒂 援艇唳辦.
function move_mousedown() {
	var el = getReal(window.event.srcElement)
	if (el.id == "divTotalPlt") {
		dragobject = el;
		checkMouseDown = true;

		ty = window.event.clientY - getTopPos(dragobject);
		tx = window.event.clientX - getLeftPos(dragobject);

		window.event.returnValue = false;
		window.event.cancelBubble = true;
		//dragobject.filters.alpha.opacity=77;
	}
	//alert(ty+" "+tx);
}

// Mouse 豭薹 酈蒂 隆唳辦.
function move_mouseup() {
	dragobject = null;
	checkMouseDown = false;
}

// Mouse 豭薹 酈蒂 援艇鼻鷓縑憮 遺霜檣 唳辦..
function move_mousemove() {
	if(checkMouseDown){
		if (dragobject) {
			if (window.event.clientX >= 0 && window.event.clientY >= 0) {
				dragobject.style.left = window.event.clientX - tx + "px";
				dragobject.style.top = window.event.clientY - ty + "px";
				//alert(dragobject.style.left);
				//dragobject.filters.alpha.opacity=77;
			}
			window.event.returnValue = false;
		}
	}
}

function getLeftPos(el) {
	return el.style.pixelLeft;
}

function getTopPos(el) {
	return el.style.pixelTop;
}

// п渡 Ы溯斜縑渠и 晦遽戲煎 蘭葬 薑溺
function doCheckFlag(obj){
	
	if(obj.name == "sort_type_chk" ){ 
		if(obj.checked){
				document.frm.sort_type.value = "Y";// 襖堅濰 晦遽戲煎 褻��
		}else{
				document.frm.sort_type.value = "N";//橾濠 晦遽戲煎 褻��
		}
	}
	if(obj.name == "sort_stock_day_chk" ){ 
		if(obj.checked){
				document.frm.sort_stock_day.value = "Y";// 營堅橾熱晦遽戲煎 薑滄
		}else{
				document.frm.sort_stock_day.value = "N";// 嬴檜蠱 嬴檜蛤 牖戲煎 薑溺
		}
	}
	if(obj.name == "search_type_chk" ){ // 奢晝 в蹂 ヶ跡 褻��
		if(obj.checked){
				document.frm.search_type.value = "Y";
		}else{
				document.frm.search_type.value = "N";
		}
	}

}


//忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
//弛熱歎啗�� 錳犒 :
//| 欽牖�� 熱歎啗�� 縛霞熱ч �� 寥機腎橫 氈湍 trans_plan_sync 纔檜綰曖 等檜攪蒂 TRANS_PLAN擊 雖遴�醴� 犒餌и棻. 2013.09.04 陴錠辨 
//戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoRepairPlan() {

	// 幗瞪, 殮堅濰, 熱歎掘碟 匐儀 等檜攪 setting
	var version = document.frm.version.value;
	var tgt_loc = document.frm.tgt_loc.value;
	var seq = document.frm.seq.value;
	var plan_type = document.frm.plan_type.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end = document.frm.trans_end.value;
	var user_id = document.frm._user_id.value;
	

	if( version == "" || version == null ) {
		alert("幗瞪擊 摹鷗ж撮蹂.");
		return;
	}
	if( tgt_loc == "" || tgt_loc == null ) {
		alert("殮堅濰擊 摹鷗�� 褻�虜� п輿褊衛蹂..");
		return;
	}

	var tgt_name;
	var sync_flag;
	var in_paramKey = "version!%!tgt_loc";
	var in_paramCode = version+"!%!"+tgt_loc;

	var in_paramKey_1 = "version!%!tgt_loc!%!seq!%!plan_type!%!trans_start!%!trans_end!%!user_id";
	var in_paramCode_1 = version+"!%!"+tgt_loc+"!%!"+seq+"!%!"+plan_type+"!%!"+trans_start+"!%!"+trans_end+"!%!"+user_id;

		commonUtil.getCodeInfo(in_paramKey,in_paramCode,"Repair_Plan_Chk", 
		{ 
			callback:function(arrList)
			{
				if( arrList.length == 1 )
				{
					tgt_name = arrList[0][0];
					sync_flag = arrList[0][1];
				}
				else
				{
					tgt_name = arrList[0][0];
					sync_flag = arrList[0][1];
				}
							
				if(sync_flag == "N"){
					if(!confirm(tgt_name+"曖 熱歎啗�嘛� 翕晦�� 腎雖 彊懊蝗棲棻. 熱歎啗�嘛� 錳犒 ж衛啊蝗棲梱??")){
						return;
					}
				}else{ //sync_flag == "N"陛 嬴棍熱陛 橈棻!!!!!!! 夥紱朝 睡碟檜 襄營ж雖 彊擠. 2013.09.04 陴錠辨 
					if(!confirm(tgt_name+"曖 熱歎啗�嘛� 錳犒 ж衛啊蝗棲梱??")){
						return;
					}
				}
				//////////////////////////////////////////////////////////
				commonUtil.executeQuery(in_paramKey, in_paramCode, "Repair_Trans_Plan_1",{
					callback:function(result){
						if(result == "SUCCESS"){
						}
						else{
							alert("啗�� 錳犒擊 褒ぬ ж艘蝗棲棻 .");
							return;
						}
						commonUtil.executeQuery(in_paramKey, in_paramCode, "Repair_Trans_Plan_2", {
							callback:function(result){
								if(result == "SUCCESS"){
								}
								else{
									alert("啗�� 錳犒擊 褒ぬ ж艘蝗棲棻 .");
									return;
								}
								/*  TRANS_PLAN_TEMP蒂 餌辨ж雖 彊晦 陽僥縑 嬴楚 Repair_Trans_Plan_3蒂 褒чж朝 匙擎 曖嘐橈棻 2013.09.04 陴錠辨
								commonUtil.executeQuery(in_paramKey_1, in_paramCode_1, "Repair_Trans_Plan_3", {
									callback:function(result){
										if(result == "SUCCESS"){
										alert(tgt_name+"曖 啗�� 錳犒擊 撩奢ж艘蝗棲棻. 褻�� 幗が擊 援琿�� 濛機擊 п輿衛晦 夥奧棲棻");
										}
										else{
										alert("啗�� 錳犒擊 褒ぬ ж艘蝗棲棻 .");
										return;
										}
									}
								});*/
								
							}
						});
					}
				});
				//////////////////////////////////////////////////////////
			}


		});//commonUtil.getCodeInfo end

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛濠翕 鼻離 褻м
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoTransPlanRegen(obj) {
	var objname		= obj.name;
	// 幗瞪, 殮堅濰, 熱歎掘碟 匐儀 等檜攪 setting
	var version		= document.frm.version.value;
	var seq			= document.frm.seq.value;
	var trans_start	= document.frm.trans_start.value;
	var trans_end	= document.frm.trans_end.value;

	if( version == "" || version == null ) {
		alert("幗瞪擊 摹鷗ж撮蹂.");
		return;
	}

	if(!confirm(version+"幗瞪曖 濠翕 鼻離 褻м擊 褒衛м棲棻 . 鼻離 濛機擊 褒衛  ж衛啊蝗棲梱??")){
		return;
	}
	
	doTransPlanRegen(version, seq, trans_start, trans_end, objname);	
};


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛濠翕 鼻離 褻м 褒ч
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doTransPlanRegen(version, seq, trans_start, trans_end, objname) {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	if(objname == "btnTransRegen100"){
		GridObj.SetParam("mode", "Regen100");
	}else if(objname == "btnTransRegen200"){
		GridObj.SetParam("mode", "Regen200");
	}else if(objname == "btnTransRegen300"){
		GridObj.SetParam("mode", "Regen300");
	}
		
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄
	GridObj.SetParam("version",version);
	GridObj.SetParam("seq","1");
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	var version2	= document.frm.version.value;
	var seq2		= document.frm.seq.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end	= document.frm.trans_end.value;
	
	GridObj.SetParam("version2", version2);
	GridObj.SetParam("seq2", seq2);
	GridObj.SetParam("trans_start",trans_start);
	GridObj.SetParam("trans_end",trans_end);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.doQuery(servlet_url);
 
}

