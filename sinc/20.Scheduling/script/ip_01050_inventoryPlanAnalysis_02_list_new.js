//## Щ煎斜極ID      : ip_01050_inventoryPlanAnalysis_02_list_new.js
//## Щ煎斜極貲      : ヶ跡滌 營堅 蹺檜 碟戮(褐敘)
//## 滲唳濠濠        : 辦謙敕
//## 偃嫦橾濠        : 2011-11-23 �倍靺�
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-11-23  辦謙敕      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01050_inventoryPlanAnalysis_02_list_new';

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
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
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
	//GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	//GridObj.SetColHide("CRUD", true); 
 	GridObj.AddHeader("SALES_CAT02"	       ,"濠營斜瑜2"	    ,"t_text"      ,100	    ,75     ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"濠營斜瑜3"		,"t_text"	   ,100	    ,110     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ヶ跡囀萄"		,"t_text" 	   ,100	    ,65     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ヶ跡貲"	        ,"t_text" 	   ,100	    ,220    ,false); //0
 	GridObj.AddHeader("BASE_STOCK"	       ,"晦蟾營堅"	    ,"t_number"    ,100.3	,55     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"	       ,"營堅橾熱"       ,"t_number"    ,100.3	,55     ,false); //0
 	GridObj.AddHeader("SALES_PRE"	       ,"瞪橾っ衙"	    ,"t_number"    ,100.3	,55     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"渡橾っ衙"       ,"t_number" 	   ,100.3	,55     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       ,"っ衙援啗"	    ,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("STOCK_EXPT"	       ,"櫛橾蕨鼻營堅"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT"       ,"儅骯/衙殮啗��"	,"t_number"    ,100.3   ,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM"   ,"儅骯/衙殮援啗"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("SALES_MEAN_1WEEK"   ,"1輿ゎ敕っ衙"	    ,"t_number"    ,100.3	,75     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"   ,"3輿ゎ敕っ衙"	    ,"t_number"    ,100.3   ,75     ,false) //0
 	GridObj.AddHeader("WEEK_DEV_1_3"       ,"1/3輿ゎ敕ら離"	,"t_number"    ,100.3   ,65     ,false); //0
 	GridObj.AddHeader("DEV_PER"            ,"ら離綠徽"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("PRE_MONTH_SELL"     ,"瞪錯褒瞳"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SALES_PLAN"         ,"っ衙啗��"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SALES_PLAN_SUM"     ,"っ衙啗�僑庚�"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SAFETY_STOCK"       ,"寰瞪營堅"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("GOALS_BOX"          ,"っ衙跡ル"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("GOALS_BOX_RATE"     ,"っ衙跡ル殖撩睦"	,"t_text"      ,100.3   ,55     ,false); //0
 
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('SALES_CAT02',        'left');
    GridObj.SetColCellAlign('SALES_CAT03',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('BASE_STOCK',        'right');
    GridObj.SetColCellAlign('STOCK_DAY',         'right'); 
    GridObj.SetColCellAlign('SALES_PRE',         'right');
    GridObj.SetColCellAlign('SALES_CUR',         'right');
    GridObj.SetColCellAlign('SALES_SUM',         'right');
    GridObj.SetColCellAlign('STOCK_EXPT',        'right');
    GridObj.SetColCellAlign('RECEIPT_EXPT',      'right');
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM',  'right');
    GridObj.SetColCellAlign('SALES_MEAN_1WEEK',  'right');
    GridObj.SetColCellAlign('SALES_MEAN_3WEEK',  'right');
    GridObj.SetColCellAlign('WEEK_DEV_1_3',      'right');
    GridObj.SetColCellAlign('DEV_PER',           'right');
    GridObj.SetColCellAlign('PRE_MONTH_SELL',    'right');
    GridObj.SetColCellAlign('SALES_PLAN',        'right');
    GridObj.SetColCellAlign('SALES_PLAN_SUM',    'right');
    GridObj.SetColCellAlign('SAFETY_STOCK',      'right');
    GridObj.SetColCellAlign('GOALS_BOX',         'right');
    GridObj.SetColCellAlign('GOALS_BOX_RATE',    'right');
    
    GridObj.SetNumberFormat("BASE_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("SALES_PRE",        "###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",        "###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",        "###,###.#");
    GridObj.SetNumberFormat("STOCK_EXPT",       "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT",     "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM", "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_1WEEK", "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_3WEEK", "###,###.#");
    GridObj.SetNumberFormat("WEEK_DEV_1_3",     "###,###.#");
    GridObj.SetNumberFormat("DEV_PER",          "###,###.#");
    GridObj.SetNumberFormat("PRE_MONTH_SELL",   "###,###.#");
    GridObj.SetNumberFormat("SALES_PLAN",       "###,###.#");
    GridObj.SetNumberFormat("SALES_PLAN_SUM",   "###,###.#");
    GridObj.SetNumberFormat("SAFETY_STOCK",     "###,###.#");
    GridObj.SetNumberFormat("GOALS_BOX",        "###,###.#");
	
	//GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	//Hidden 鏽歲
	//GridObj.SetColHide("CRUD",true);

}
	// 鏽歲 堅薑

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridEndQuery() 
    {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj.GetStatus() == "true") 
            {                           
//              GridObj.SetGroupMerge('SALES_CAT02,SALES_CAT03');
//      	  	GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'BASE_STOCK,SALES_PRE,SALES_CUR,SALES_SUM,STOCK_EXPT,RECEIPT_EXPT,RECEIPT_EXPT_SUM,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,WEEK_DEV_1_3,PRE_MONTH_SELL,SALES_PLAN,SALES_PLAN_SUM,SAFETY_STOCK,GOALS_BOX');
//              GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);

                GridObj.AddSummaryBar('SUMMARY1', '瞪羹м啗', 'summaryall', 'sum', 'BASE_STOCK,SALES_PRE,SALES_CUR,SALES_SUM,STOCK_EXPT,RECEIPT_EXPT,RECEIPT_EXPT_SUM,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,WEEK_DEV_1_3,PRE_MONTH_SELL,SALES_PLAN,SALES_PLAN_SUM,SAFETY_STOCK,GOALS_BOX');
         	    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot); 
                     
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

   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

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
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
        start_date = start_date.replace(/-/g,"");
        end_date = end_date.replace(/-/g,"");
      // alert(end_date);
     //  return;

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var in_act_type	    = document.all.in_act_type.value;   
       var search_item	    = document.all.search_item.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type",     item_type);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("in_act_type", in_act_type);
	   GridObj.SetParam("search_item", search_item);
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
