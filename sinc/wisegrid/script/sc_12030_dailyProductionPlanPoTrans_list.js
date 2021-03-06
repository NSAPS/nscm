//############################################################
//## Щ煎斜極ID 	: sc_12030_dailyProductionPlanPoTrans_list.vm
//## Щ煎斜極貲 	: 橾除儅骯啗�� 滲唳(PO嫦ч)
//## 偃嫦濠  	: 薑營掖
//## 偃嫦橾濠 	: 2009-03-19 跡蹂橾
//##
//## 婦溼 job file 	 : job_sc_12030_dailyProductionPlanPoTrans_list.xml
//##
//## 婦溼 query file : query_sc_12030_dailyProductionPlanPoTrans_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-03-19  薑營掖     sc_12030_dailyProductionPlanPoTrans_list.js 偃嫦
//##
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
var mode;													// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";						// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_12030_dailyProductionPlanPoTrans_list';	// job id(憮綰葩 貲, WiseGrid Header key)
var GridObj ; 												// WiseGrid 偌羹

/******************************************          Action Function         **********************************************/
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service) {
	mode = "search";
	doQuery();
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛盪濰
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave() {
	mode = "save";
	doSave();	
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛瞪歎
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoTrans() {
	mode = "trans";
	
	commonUtil.getCodeList("job_id", job_id , "init_trans_status_check",getTransStatus); 
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛瞪歎 鼻鷓高 羹觼.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function getTransStatus(result)
   {
        var len = document.frm.selected_plant.length;
        var str = "";
        var cnt = 0;
        for( i = 0 ; i < len ; i++){
            if( document.frm.selected_plant[i].checked == true ){
                if( cnt > 0 ) str += "','";
                str += document.frm.selected_plant[i].value;		
                cnt++;	
            }
        }		

        if( cnt == 0 ){
            alert("摹鷗脹 奢濰檜 橈蝗棲棻!!");
            return;
        }    
        
        if(result=='Y') //鼻鷓高'Y'=瞪歎陛棟, 'N'=瞪歎碳陛棟
        {
            if(confirm("瞪歎擊 霞ч ж衛啊蝗棲梱?"))
            {
                doTrans();
            } else {
                alert('瞪歎 鏃模');
            }
        } else {
            alert('瞪歎 霞ч 醞殮棲棻.');
        }
   }



/*******************************************   WiseGrid 蟾晦�� 塽 撲薑  *****************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 蟾晦��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); 	// 晦獄 property 撲薑
	setDefault();  			// 蹺陛 property 撲薑
	setHeader();   			// Header 撲薑
			
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛Property 撲薑
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault(){
	
	GridObj.bUserContextMenu = true;				//餌辨濠 鐘臢蝶お 詭景曖 餌辨 罹睡蒂 唸薑и棻. 
	GridObj.bHDMoving = false;                  	//餌辨濠陛 ④渦蒂 萄楚斜п憮 鏽歲嬪纂蒂 檜翕й熱 橈棻.
	GridObj.bHDSwapping = false;                	//④渦曖 鏽歲嬪纂檜翕 巍爾幗が擊 綠�側瘓� и棻.
	GridObj.bRowSelectorVisible = false;        	//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.strRowBorderStyle = "none";         	//煎辦曖 纔舒葬縑 嬴鼠匙紫 釭顫釭雖 彊朝棻.
	GridObj.nRowSpacing = 0;                    	//RowSpacing高擊 薑и棻. 
	GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj.strActiveRowBgColor = "180|238|180";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	//GridObj.strSelectedCellBgColor = '238|0|238'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	
	// Header Font Setting
	GridObj.nHDFontSize = 9;				  	// Font Size
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size
	
	// Grid ч 堪檜
    GridObj.nRowHeight    = 20;
    
    GridObj.strSelectedCellFgColor = '180|82|205'; //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
   
    /* Context Menu 餌辨濠 MENU 蹺陛 */
        
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader() 
{        
    commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
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
	
	GridObj.AddGroup("SHIFT_QTY", "滲唳");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("SHIFT_QTY", "FROM_QTY");
	GridObj.AppendHeader("SHIFT_QTY", "TO_QTY");
	GridObj.AppendHeader("SHIFT_QTY", "MADE_TYPE");
	
	GridObj.AddGroup("REASON_MSG", "爾薑");			
	GridObj.AppendHeader("REASON_MSG", "REASON01");
	GridObj.AppendHeader("REASON_MSG", "REASON02");
	
	GridObj.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
	
	GridObj.SetNumberFormat("FROM_QTY", "###,###,###"); // 璋濠 ⑽衝
	GridObj.SetNumberFormat("TO_QTY"  , "###,###,###");
	
	GridObj.nHDLines = 2; 
	GridObj.nHDLineSize  = 15;

	           
}

/***********************************************   WiseGrid 鱔褐  **********************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", mode);
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("摹鷗脹 奢濰檜 橈蝗棲棻!!");
		return;
	}
	GridObj.SetParam("plant_id", str);

	//輿離
	var sdate = document.frm.start_date.value;
	var edate = document.frm.end_date.value;
	if( sdate == "" || edate == "" ){
		alert( "輿離 摹鷗檜 澀跤 腎歷蝗棲棻!!");
		return;
	}
	GridObj.SetParam("sdate", sdate);
	GridObj.SetParam("edate", edate);
	
	//掘碟
	var checked_po_type;
	if( document.frm.checked_po_type[0].checked == true ){
		checked_po_type = document.frm.checked_po_type[0].value;
	}else if( document.frm.checked_po_type[1].checked == true ){
		checked_po_type = document.frm.checked_po_type[1].value;
	}else if( document.frm.checked_po_type[2].checked == true ){
		checked_po_type = document.frm.checked_po_type[2].value;
	}
	
	
	GridObj.SetParam("checked_po_type",checked_po_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛盪濰
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doSave() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", mode);
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("摹鷗脹 奢濰檜 橈蝗棲棻!!");
		return;
	}
	GridObj.SetParam("plant_id", str);

	//輿離
	var sdate = document.frm.start_date.value;
	var edate = document.frm.end_date.value;
	if( sdate == "" || edate == "" ){
		alert( "輿離 摹鷗檜 澀跤 腎歷蝗棲棻!!");
		return;
	}
	GridObj.SetParam("sdate", sdate);
	GridObj.SetParam("edate", edate);
	
	//掘碟
	var checked_po_type;
	if( document.frm.checked_po_type[0].checked == true ){
		checked_po_type = document.frm.checked_po_type[0].value;
	}else if( document.frm.checked_po_type[1].checked == true ){
		checked_po_type = document.frm.checked_po_type[1].value;
	}else if( document.frm.checked_po_type[2].checked == true ){
		checked_po_type = document.frm.checked_po_type[2].value;
	}
	GridObj.SetParam("checked_po_type",checked_po_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛瞪歎
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doTrans() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", mode);
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("摹鷗脹 奢濰檜 橈蝗棲棻!!");
		return;
	}
	GridObj.SetParam("plant_id", str);

	//輿離
	var sdate = document.frm.start_date.value;
	var edate = document.frm.end_date.value;
	if( sdate == "" || edate == "" ){
		alert( "輿離 摹鷗檜 澀跤 腎歷蝗棲棻!!");
		return;
	}
	GridObj.SetParam("sdate", sdate);
	GridObj.SetParam("edate", edate);
	
	//掘碟
	var checked_po_type;
	
	checked_po_type = document.frm.checked_po_type[1].value; //瞪歎唸婁
	
	GridObj.SetParam("checked_po_type",checked_po_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
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
    var checked_po_type ='';
    
	setGrid(GridObj); //WiseGrid 撲薑
			
	//
	var mode = GridObj.GetParam("mode");

	if(mode == "search") { //褻��
		if(GridObj.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
		
		
    	if( document.frm.checked_po_type[0].checked == true ){
    		checked_po_type = document.frm.checked_po_type[0].value;
    	}else if( document.frm.checked_po_type[1].checked == true ){
    		checked_po_type = document.frm.checked_po_type[1].value;
    	}else if( document.frm.checked_po_type[2].checked == true ){
    		checked_po_type = document.frm.checked_po_type[2].value;
    	}		
		
		if(checked_po_type=='03')
		{
		    GridObj.SetColHide('REASON01', true) 
		    GridObj.SetColHide('REASON02', true) 
		    GridObj.SetColHide('MADE_BY' , true)
		} else {
		    GridObj.SetColHide('REASON01', false) 
		    GridObj.SetColHide('REASON02', false) 
		    GridObj.SetColHide('MADE_BY' , false) 
	    }
	    GridObj.SetColHide('TRANS_MSG' , true) 
	    
	} else if(mode == "insert") {
		
	} else if(mode == "update") {
		
	} else if(mode == "delete") {
		
	}else if(mode == "save") {
		if(GridObj.GetStatus() == "true") {// 
			//GoSearch("");
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(mode == "trans"){ //瞪歎
		if(GridObj.GetStatus() == "true") {// 
			//document.frm.checked_po_type[1].checked = true;
			document.frm.btnSelect.disabled = true;
		} else {
			var error_msg = GridObj.GetMessage();// 
//			alert(error_msg);			
		}
	}
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 撲薑
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setGrid(){
	
	// 鏽歲 斜瑜
	GridObj.SetGroupMerge('PLANT_NAME,PROC_NAME,ITEM_NAME'); 
	
	// 鏽歲 堅薑
	//GridObj.SetColFix('C14');
	
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
	//GridObj.SetColCellBgColor('C36','160|160|160');//м啗
    
    // 葆雖虞 滲唳и Row煎 檜翕
    //GridObj.MoveRow(rowIndex);
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
		
//	if( strMenuKey == "MENU_CELL" ){// CELL 贗葛衛 詭景
//		
//		if( strMenuItemKey == "MENU01" ){		// ROW 蹺陛
//			
//		}
//		else if( strMenuItemKey == "MENU02" ){	// ROW 餉薯
//
//		}
//		else {
//			alert("襄營 ж雖 彊擎 詭景殮棲棻.");
//		}		
//	}

};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Change Combo Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){

};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeCell(strColumnKey, nRow) {

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Click Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow){

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
  弛輿離 摹鷗 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/	
function checkedWeekly(obj){

	obj.checked;
	
	if( obj.value == "01" ){
		document.frm.btnSelect.disabled = false;
	}
	else{
		document.frm.btnSelect.disabled = true;
	}

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛⑷營 陳瞼(yyyymmdd) 蹺轎  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
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

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛Check Box 奢濰 : 瞪羹 Click  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function checkSelectedPlantAll(obj){
	
	var len = document.frm.selected_plant.length;
	if( obj.checked == true ){
		//alert(document.frm.selected_plant.length);		
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = true;
		}
	}
	else{
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = false;
		}
	}
	
};	
