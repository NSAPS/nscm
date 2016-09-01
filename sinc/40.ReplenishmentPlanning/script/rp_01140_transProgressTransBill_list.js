//## Щ煎斜極ID      : rp_01140_transProgressTransBill_list.js
//## Щ煎斜極貲      : 熱歎 瞪ル滌 熱歎霞ч 鼻��
//## 偃嫦濠          : ъ遽撩
//## 偃嫦橾濠        : 2008-09-08 錯蹂橾
//##
//## 婦溼 job file   : job_sinc_40_replenishmentPlanning_00.xml
//## 婦溼 query file : query_sinc_40_replenishmentPlanning_00.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2010-10-26  辦謙敕      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'rp_01140_transProgressTransBill_list';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2;

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
   
function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader2(GridObj2);  	//п渦儅撩 
	setDefault2();        	//�飛� 晦獄 撲薑 
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
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.strCellFontName = '蜈擎 堅蛐'; 
    //GridObj.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 
    
    //GridObj.bRowSelectorVisible = true   
         
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj2.bRowSelectorIndex   = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj2.nHDLineSize         = 18; //Header Size
    //GridObj2.strHDClickAction  = "sortsingle";
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines = 2;        
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    GridObj2.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	//GridObj2.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	//GridObj2.strCellFontName = '蜈擎 堅蛐'; 

}
	// status bar visible 鼻鷓夥 撲薑 
    
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
//    GridObj4.strSelectedCellFgColor = '180|82|205';
//    GridObj4.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	//GridObj4.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
//	GridObj4.nCellFontSize = 9;					// Font Size 9
//}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
//	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,60  ,false);
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0   
	
	//GridObj.SetColHide("CRUD", true); 
	GridObj.AddHeader("TRANS_DATE"		,"熱歎橾濠"		    ,"t_text"	    ,20		  ,80    ,false); //0   
 	GridObj.AddHeader("SRC_LOC_ID"	    ,"SRC_LOC_ID"		,"t_text" 	    ,100	   ,0    ,false); //0   
 	GridObj.AddHeader("SRC_LOC"	        ,"轎堅濰貲"		    ,"t_text" 	    ,100	  ,65    ,false); //0   
 	GridObj.AddHeader("TGT_LOC_ID"		,"TGT_LOC_ID"	    ,"t_text" 	    ,100	   ,0    ,false); //0
 	GridObj.AddHeader("TGT_LOC"		    ,"殮堅濰貲"	        ,"t_text" 	    ,100	  ,80    ,false); //0
 	GridObj.AddHeader("TRUCK_SEQ"		,"離榆廓��"	        ,"t_number" 	,100	  ,65    ,false); //0
 	GridObj.AddHeader("BRAND_NO"		,"瞪ル廓��"		    ,"t_text"	    ,100	  ,75    ,false); //0
 	GridObj.AddHeader("PLT_QTY"		    ,"PLT熱榆"		    ,"t_number" 	,100.3	  ,65    ,false); //0    
 	GridObj.AddHeader("BOX_QTY"			,"BOX熱榆"		    ,"t_number" 	,100.3	  ,65    ,false); //0
 	GridObj.AddHeader("PLAN_TYPE"		,"熱歎"		        ,"t_text" 	    ,100	   ,0    ,false); //0
	GridObj.AddHeader("PLAN_TYPE_NAME"	,"熱歎嶸⑽"	        ,"t_text" 	    ,100	 ,100    ,false); //0 	   
 	GridObj.AddHeader("MADE_TIME"		,"嫦ч衛除"		    ,"t_text" 	    ,160	  ,90    ,false); //0
 	GridObj.AddHeader("CHGO_TIME"		,"轎堅衛除"		    ,"t_text" 	    ,160	  ,90    ,false); //0
 	GridObj.AddHeader("IPGO_TIME"		,"殮堅衛除"		    ,"t_text" 	    ,160	  ,90    ,false); //0
 	GridObj.AddHeader("LOAD_TIME"		,"鼻離衛除"		    ,"t_text" 	    ,160	  ,65    ,false); //0
 	GridObj.AddHeader("TRANS_TIME"		,"熱歎衛除"		    ,"t_text" 	    ,160	  ,65    ,false); //0
 	GridObj.AddHeader("TOT_TIME"		,"識模蹂衛除"		    ,"t_text" 	    ,160	  ,75    ,false); //0
 	GridObj.AddHeader("TRANS_STATE"		,"葆馬掘碟"		    ,"t_text" 	    ,160	  ,70    ,false); //0
 	GridObj.AddHeader("MICHGO"		    ,"嘐轎堅熱榆"		    ,"t_number"     ,100.3	  ,70    ,false); //0

	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

//    GridObj.SetColCellAlign('DEFAULT_GUBN','center'); 
    GridObj.SetColCellAlign('TRANS_DATE','center');
    GridObj.SetColCellAlign('SRC_LOC','center'); 
    GridObj.SetColCellAlign('TGT_LOC','center');
    GridObj.SetColCellAlign('TRUCK_SEQ','center');
    GridObj.SetColCellAlign('BRAND_NO','center');
    GridObj.SetColCellAlign('PLT_QTY','right'); 
    GridObj.SetColCellAlign('BOX_QTY','right');
    GridObj.SetColCellAlign('PLAN_TYPE_NAME','center');
    GridObj.SetColCellAlign('MADE_TIME','center');
    GridObj.SetColCellAlign('CHGO_TIME','center');
    GridObj.SetColCellAlign('IPGO_TIME','center');
    GridObj.SetColCellAlign('LOAD_TIME','center');
    GridObj.SetColCellAlign('TRANS_TIME','center');
    GridObj.SetColCellAlign('TOT_TIME','center');
    GridObj.SetColCellAlign('TRANS_STATE','center');
    GridObj.SetColCellAlign('MICHGO','right');
    
    GridObj.SetNumberFormat("PLT_QTY", "##,##0.#");
    GridObj.SetNumberFormat("BOX_QTY", "##,##0.#");
    GridObj.SetNumberFormat("MICHGO",  "##,##0.#");
    
//    GridObj.SetColCellAlign('ALLOC_FLAG','center'); 
//	  GridObj.SetColFix('ITEM_NAME');

	//GridObj.SetColCellBgColor('SEL_DMD',color_edit_col);//晦遽營堅
    //GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
	//GridObj.SetColHDBgColor('TOT_STOCK','253|228|229');
    //GridObj.bCellFontBold = true; 
	
	//GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	//Hidden 鏽歲
	//GridObj.SetColHide("CRUD",true);

}




function setHeader2(GridObj2) { // 撮睡薑爾

  	GridObj2.AddHeader("PROD_CODE"		,"薯ヶ囀萄"    ,"t_text"   	,100	 ,100    ,false); //0 
  	GridObj2.AddHeader("PROD_NAME"	    ,"薯ヶ貲"      ,"t_text" 	 	,100	 ,180    ,false); //0  
  	GridObj2.AddHeader("TP_BOX"	        ,"PLT熱榆"     ,"t_number" 	,100.3	  ,70    ,false); //0   
  	GridObj2.AddHeader("TP_PLT"	        ,"BOX熱榆"     ,"t_number" 	,100.3	  ,70    ,false); //0
  	GridObj2.AddHeader("TA_BOX"	        ,"PLT熱榆"     ,"t_number" 	,100.3	  ,70    ,false); //0   
  	GridObj2.AddHeader("TA_PLT"	        ,"BOX熱榆"     ,"t_number" 	,100.3	  ,70    ,false); //0
   	GridObj2.AddHeader("TRANS_STATE"	,"葆馬掘碟"     ,"t_text" 	,100     ,100    ,false); //0
  	GridObj2.AddHeader("MICHGO"	        ,"嘐轎堅碟榆"   ,"t_number"  	,100.3	 ,100    ,false); //0

	/* 檜醞 п渦 蹺陛 */
	GridObj2.AddGroup("HD1"	,"熱歎啗��");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj2.AppendHeader("HD1", "TP_PLT");
	GridObj2.AppendHeader("HD1", "TP_BOX");
	GridObj2.AddGroup("HD2"	,"熱歎褒瞳");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj2.AppendHeader("HD2", "TA_PLT");
	GridObj2.AppendHeader("HD2", "TA_BOX");
	 	    
	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('PROD_CODE','center'); 
    GridObj2.SetColCellAlign('PROD_NAME',  'left');
    GridObj2.SetColCellAlign('TP_PLT',    'right');
    GridObj2.SetColCellAlign('TP_BOX',	  'right');
    GridObj2.SetColCellAlign('TA_PLT',	  'right');
    GridObj2.SetColCellAlign('TA_BOX',	  'right');
    GridObj2.SetColCellAlign('TRANS_STATE','center');
    GridObj2.SetColCellAlign('MICHGO',	  'right');
   
    GridObj2.SetNumberFormat("TP_PLT", "##,##0.#");
    GridObj2.SetNumberFormat("TP_BOX", "##,##0.#");
    GridObj2.SetNumberFormat("TA_PLT", "##,##0.#");
    GridObj2.SetNumberFormat("TA_BOX", "##,##0.#");
    GridObj2.SetNumberFormat("MICHGO", "##,##0.#");

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
		  	GridObj.AddSummaryBar('SUMMARY', '瞪羹м啗', 'summaryall', 'sum', 'PLT_QTY,BOX_QTY,MICHGO');
		  	GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 

        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			GridObj2.SetGroupMerge(	'PROD_CODE,PROD_NAME');
		  	GridObj2.AddSummaryBar('SUMMARY', '瞪羹м啗', 'summaryall', 'sum', 'TP_PLT,TP_BOX,TA_PLT,TA_BOX,MICHGO');
		  	GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
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
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow){     
	doQuery2(nRow);		
}        
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var trans_start	        = document.all.trans_start.value;
       var trans_end	        = document.all.trans_end.value;   
       
       var search_item	    	= document.all.search_item.value;
       
       //var item_id				= document.all.item_id.value;
       var selected_src_loc	    = document.all.selected_src_loc.value;
       var selected_tgt_loc	    = document.all.selected_tgt_loc.value;
       var selected_plan_type	= document.all.selected_plan_type.value;
       var servlet_url          = Project_name+"/servlet/com.wisegrid.admin."+job_id;       
//       var sort_flag	= document.all.sort_flag.value;  
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("trans_start",        		  trans_start);
       GridObj.SetParam("trans_end",          		    trans_end);
       
       
       GridObj.SetParam("search_item", 				   search_item);
       
       //GridObj.SetParam("item_id",						  item_id);
	   GridObj.SetParam("selected_src_loc",   	selected_src_loc);
	   GridObj.SetParam("selected_tgt_loc",   	selected_tgt_loc);
	   GridObj.SetParam("selected_plan_type", selected_plan_type);
	   GridObj.DoQuery(servlet_url);       
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2(nRow) { //撮睡薑爾

       var trans_date	    = GridObj.GetCellValue("TRANS_DATE", nRow);
       var src_loc	        = GridObj.GetCellValue("SRC_LOC_ID", nRow);
       var tgt_loc	        = GridObj.GetCellValue("TGT_LOC_ID", nRow);
       var truck_seq	    = GridObj.GetCellValue("TRUCK_SEQ",  nRow);
       var brand_no	        = GridObj.GetCellValue("BRAND_NO",  nRow);
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("trans_date", trans_date);
	GridObj2.SetParam("src_loc", 	src_loc);
	GridObj2.SetParam("tgt_loc", 	tgt_loc);
	GridObj2.SetParam("truck_seq",  truck_seq);
	GridObj2.SetParam("brand_no", 	brand_no);
	GridObj2.DoQuery(servlet_url);
}
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