//## Щ煎斜極ID      : sc_01110_realStockReg_list_new.js
//## Щ煎斜極貲      : 濠營 營堅 蛔煙 塽 褻薑
//## 滲唳濠濠        : 辦謙敕
//## 偃嫦橾濠        : 2011-11-01 �倍靺�
//##
//## 婦溼 job file   : job_sinc_20_scheduling_03.xml
//## 婦溼 query file : query_sinc_20_scheduling_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-11-01  辦謙敕      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_01110_realStockReg_list_new';

var GridObj ; 													// WiseGrid 偌羹
var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀 
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue  = window.innerWidth;
            maxHeightValue = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue  = document.body.clientWidth;
            maxHeightValue = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
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

        document.WiseGrid.height = tableHeightValue + "px"; 
        //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
 
        
    }  

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 							弛
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.			弛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader(GridObj);  	//п渦儅撩 
	setDefault();        	//�飛� 晦獄 撲薑 
}   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
    
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
      
       
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	//GridObj.SetColHide("CRUD", true); 
 	GridObj.AddHeader("PLANT_ID"	  ,"奢濰廓��"	         ,"t_text"     ,100	    ,0    ,false); //0
	GridObj.AddHeader("PLANT_NAME"	  ,"奢濰"		     ,"t_text"	   ,100	    ,100  ,false); //0
 	GridObj.AddHeader("ITEM_ID"	      ,"濠營囀萄"		     ,"t_text" 	   ,100	    ,90   ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	  ,"濠營貲"	         ,"t_text" 	   ,100	    ,210  ,false); //0
 	GridObj.AddHeader("SPEC"		  ,"敘問"	         ,"t_text" 	   ,100	    ,110  ,false); //0
 	GridObj.AddHeader("ERP_QTY"		  ,"ERP  營堅(EA)"    ,"t_number"   ,100.3	,90   ,false); //0
 	GridObj.AddHeader("REAL_QTY"	  ,"褒營堅 熱榆(EA)"	 ,"t_number"   ,100.3	,110   ,true); //0
 	GridObj.AddHeader("BASE_UOM"	  ,"BASE_UOM"        ,"t_text" 	   ,100	    ,0    ,false); //0
    GridObj.AddHeader("CONV_QTY"	  ,"�粉� 欽嬪"	     ,"t_number"   ,100	    ,70    ,true); //0
 	GridObj.AddHeader("CONV_UOM"	  ,"CONV_UOM"	     ,"t_text"     ,100.3   ,0    ,false); //0
 	GridObj.AddHeader("ITYPE"	      ,"濠營掘碟"	         ,"t_text" 	   ,100	    ,0    ,false); //0
 	GridObj.AddHeader("MOD_FLAG"	  ,"ヶ跡掘碟"	         ,"t_text" 	   ,100	    ,0    ,false); //0
    GridObj.AddHeader("BOX_QTY"	      ,"�粉� 熱榆(BOX)"	 ,"t_number"   ,100.3   ,110   ,true) //0
 	GridObj.AddHeader("SAFETY_STOCK"  ,"寰瞪 營堅(EA)"	 ,"t_number"   ,100.3   ,100   ,true); //0

	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('PLANT_NAME','center');
    GridObj.SetColCellAlign('ITEM_ID','left'); 
    GridObj.SetColCellAlign('ITEM_NAME','left');
    GridObj.SetColCellAlign('SPEC','left');
    GridObj.SetColCellAlign('ERP_QTY','right');
    GridObj.SetColCellAlign('REAL_QTY','right'); 
    GridObj.SetColCellAlign('CONV_UOM','right');
    GridObj.SetColCellAlign('CONV_QTY','right');
    GridObj.SetColCellAlign('BOX_QTY','right');
    GridObj.SetColCellAlign('SAFETY_STOCK','right');

    
    GridObj.SetNumberFormat("ERP_QTY",      "###,###.#");
    GridObj.SetNumberFormat("REAL_QTY",     "###,###.#");
    GridObj.SetNumberFormat("CONV_QTY",     "###,###.#");
    GridObj.SetNumberFormat("BOX_QTY",      "###,###.#");
    GridObj.SetNumberFormat("SAFETY_STOCK", "###,###.#");

	
	GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	//Hidden 鏽歲
	GridObj.SetColHide("CRUD",true);

}
	// 鏽歲 堅薑

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery(){
	
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';
    
    //alert("endMode="+endMode);  
    if(endMode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {            
		  	GridObj.AddSummaryBar('SUMMARY', '瞪羹м啗', 'summaryall', 'sum', 'ERP_QTY,REAL_QTY,BOX_QTY');
		  	GridObj.SetSummaryBarColor('SUMMARY', '0|153|0', color_tot); 
				for(var i=0;i<GridObj.GetRowCount();i++) { 
						GridObj.SetCellBgColor('REAL_QTY', i, color_edit_col);
						GridObj.SetCellBgColor('CONV_QTY', i, color_edit_col);
						GridObj.SetCellBgColor('BOX_QTY', i, color_edit_col);
						GridObj.SetCellBgColor('SAFETY_STOCK', i, color_edit_col);
				}    
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {
	
}	
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
    doQuery();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
 
   
// 等檜攪 盪濰
function GoSave  (service) {

    var in_cnfm_date	    = document.all.in_cnfm_date.value;
    var sel_plant	        = document.all.sel_plant.value;   
    var sel_halb_type	    = document.all.sel_halb_type.value;
   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
    GridObj.SetParam("in_cnfm_date",  in_cnfm_date);
    GridObj.SetParam("sel_plant",     sel_plant);
	GridObj.SetParam("sel_halb_type", sel_halb_type);
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

	if(sel_plant == 'SUM'){
	   alert("奢濰滌煎 褻�裙� 濛機ж褊衛蹂.");
	   return;
	}
	GridObj.DoQuery(servlet_url, "CRUD");
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	// user_id
	
//	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var in_cnfm_date	        = document.all.in_cnfm_date.value;
       var sel_plant	        = document.all.sel_plant.value;   
       var sel_halb_type	    = document.all.sel_halb_type.value;
       var servlet_url          = Project_name+"/servlet/com.wisegrid.admin."+job_id;       
  
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_cnfm_date",  in_cnfm_date);
       GridObj.SetParam("sel_plant",     sel_plant);
	   GridObj.SetParam("sel_halb_type", sel_halb_type);
	   GridObj.DoQuery(servlet_url);       
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/



	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )

// 撚 盪濰 瞪羲滲熱
var objTdG;


// 陳瞼 匐儀 POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// 陳瞼 匐儀 POP BTN mouseOut
function outBtn( objBtn ) {
	clickedDateIdx = null;

	
}
//--------------------------------------   main_template 縑 薑曖脹 Event ---------------------------------------------------//
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/

//
function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	var sel_plant	        = document.all.sel_plant.value;
	
	/* 1 */
	if(sel_plant == 'SUM'){
	   alert("奢濰滌煎 褻�裙� 濛機ж褊衛蹂.");
	   GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	   return;
	}
	if(strColumnKey == 'REAL_QTY'){
		cal_box_qty(nRow, strColumnKey)
	}else if(strColumnKey == 'CONV_QTY'){
		cal_ea_qty(nRow, strColumnKey)
	}else if(strColumnKey == 'BOX_QTY'){
		cal_box_qty(nRow, strColumnKey)
	}
		
 	
}

/* EA熱榆擊 嫡嬴憮 BOX 熱榆戲煎 �粉�*/
function cal_box_qty(nRow, strColumnKey) {


	var real_qty = 0; //500
	var conv_qty = 0 ;
	var box_qty	 = 0;
	
		real_qty	= Number(GridObj.GetCellValue("REAL_QTY", nRow));
		conv_qty	= Number(GridObj.GetCellValue("CONV_QTY", nRow));
		box_qty	    = Number(GridObj.GetCellValue("BOX_QTY",  nRow));
		
	if( conv_qty == null || conv_qty == "" || conv_qty == "0" ) {
		var conv_qty = 1;
	}

	box_qty = Math.round(real_qty / conv_qty);
	GridObj.SetCellValue("BOX_QTY", nRow,  box_qty);
			
}

/* BOX熱榆擊 嫡嬴憮  EA熱榆戲煎 �粉�*/
function cal_ea_qty(nRow, strColumnKey) {

	var real_qty = 0; //500
	var conv_qty = 0 ;
	var box_qty	 = 0;
		real_qty	= Number(GridObj.GetCellValue("REAL_QTY", nRow));
		conv_qty	= Number(GridObj.GetCellValue("CONV_QTY", nRow));
		box_qty	    = Number(GridObj.GetCellValue("BOX_QTY",  nRow));
		
	if( conv_qty == null || conv_qty == "" || conv_qty == "0" ) {
		var conv_qty = 1;
	}

	real_qty = Math.round(conv_qty * box_qty);
	GridObj.SetCellValue("REAL_QTY", nRow,  real_qty);	
}