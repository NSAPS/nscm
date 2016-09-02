//## Щ煎斜極ID      : ip_01140_inventoryPlanAnalysis_md_list_pop.js
//## Щ煎斜極貲      : 熱殮鼻ヶ  營堅 蹺檜 碟戮(で機)
//## 滲唳濠濠        : 檜鬼遵
//## 偃嫦橾濠        : 2015-04-23
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_07.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-04-23  檜鬼遵      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01140_inventoryPlanAnalysis_md_list_pop';

var GridObj ; 													// WiseGrid 偌羹
var color_tot 		 = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';			//塭檣 摹鷗 寡唳儀 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue   = window.innerWidth;
            maxHeightValue  = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue   += Number(search_h); 
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
	GridObj.strActiveRowBgColor    = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction 	   = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("SALES_CAT05"	       ,"渠碟盟"			,"t_text"	   ,100	    ,0     ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"模碟盟"			,"t_text"	   ,100	    ,0     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ヶ跡囀萄"		,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ヶ跡貲"	        ,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"敘問"	    	,"t_text"  	   ,100		,90     ,false); //0
 		
 	GridObj.AddHeader("BASE_STOCK"	       ,"晦蟾營堅"	    ,"t_number"    ,100.3	,60     ,false); //0 
 	GridObj.AddHeader("OUT_STOCK"	       ,"餌諼營堅"	    ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("PROD_TERM"  		   ,"鱔婦\n唳婁橾熱"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"	       ,"營堅橾熱"       ,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_PRE"	       ,"瞪橾啗"	    	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"橾啗"       	,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       ,"渡錯援啗"	    ,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("STOCK_EXPT"	       ,"蕨鼻營堅"		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_MEAN_1WEEK"   ,"1偃錯\n輿ゎ敕"	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"   ,"3偃錯\n輿ゎ敕"	,"t_number"    ,100.3   ,70     ,false) //0
    GridObj.AddHeader("PRE_MONTH_SELL"	   ,"瞪錯啗"	    	,"t_number"    ,100.3	,60     ,false); //0
 	
 	
 	
 	
 	
  	GridObj.AddHeader("SALES_SUM_PY"       ,"瞪喇翕錯"	    ,"t_number"    ,100.3   ,60     ,false); //0    
    GridObj.AddHeader("SUB_PY_MON"    	   ,"瞪喇翕錯\n渠綠"	,"t_number"    ,100.3   ,60     ,false); //0
    GridObj.AddHeader("THIS_YEAR_SUM"      ,"旎喇援啗"	    ,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("LAST_YEAR_SUM"      ,"瞪喇援啗"		,"t_number"    ,100.3   ,60     ,false); //0 	
 	GridObj.AddHeader("SUB_PY_YEAR"    	   ,"瞪喇援啗\n渠綠"	,"t_number"    ,100.3   ,60     ,false); //0
 	
 	GridObj.AddHeader("RECEIPT_EXPT_SUM"   ,"熱殮蕨薑\nM"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_1" ,"熱殮蕨薑\nM+1"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_2" ,"熱殮蕨薑\nM+2"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT_SUM_3" ,"熱殮蕨薑\nM+3"	,"t_number"    ,100.3	,70     ,false); //0
 	
    
 	GridObj.AddHeader("STOCK_HIDDEN"  	   ,"唳婁橾熱�鰽�"		,"t_text"    	,100.3	 ,0     ,false); //0
 	GridObj.AddHeader("TERM_HIDDEN"  	   ,"嶸鱔晦и�鰽�"		,"t_text"    	,100.3	 ,0     ,false); //0
 	GridObj.AddHeader("TERM_VAL"  		   ,"嶸鱔晦и"			,"t_number"    	,100.3	 ,70    ,false); //0
 	GridObj.AddHeader("TERM_PER"  		   ,"嶸鱔晦и\n唳婁徽"	,"t_number"    	,100.3	 ,70    ,false); //0
 	GridObj.AddHeader("WEEK_DEV_1_3"       ,"1/3偃錯ゎ敕\nら離"	,"t_number"    	,100.3   ,0     ,false); //0
 	GridObj.AddHeader("DEV_PER"            ,"ら離綠徽"	    	,"t_number"    	,100.3   ,0     ,false); //0
 		
 	
 	GridObj.AddHeader("BASE_STOCK_PALLET"  ,"晦蟾營堅\n(PALLET)"	,"t_number"      ,100.3		,75     ,false); //0
 	GridObj.AddHeader("STOCK_EXPT_PALLET"  ,"蕨鼻營堅\n(PALLET)"	,"t_number"      ,100.3		,75     ,false); //0
 
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 
	
	GridObj.SetColCellAlign('SALES_CAT05',        'left');
	GridObj.SetColCellAlign('SALES_CAT03',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('SPEC',               'left');
    GridObj.SetColCellAlign('BASE_STOCK',        'right');
    GridObj.SetColCellAlign('STOCK_DAY',         'right'); 
    GridObj.SetColCellAlign('SALES_PRE',         'right');
    GridObj.SetColCellAlign('PROD_TERM',         'right'); 
    GridObj.SetColCellAlign('TERM_VAL',        	 'right');
    GridObj.SetColCellAlign('TERM_PER',          'right'); //嶸鱔晦и 唳婁徽
    GridObj.SetColCellAlign('SALES_CUR',         'right'); //援啗
    GridObj.SetColCellAlign('STOCK_EXPT',        'right'); //蕨鼻營堅
    GridObj.SetColCellAlign('PRE_MONTH_SELL',    'right'); //瞪錯啗
    //GridObj.SetColCellAlign('SALES_SUM',         'right');
    //GridObj.SetColCellAlign('RECEIPT_EXPT',      'right'); //儅骯 啗��
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM',  'right'); //儅骯 援瞳
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM_1',  'right'); //儅骯 援瞳
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM_2',  'right'); //儅骯 援瞳
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM_3',  'right'); //儅骯 援瞳
    GridObj.SetColCellAlign('SALES_MEAN_1WEEK',  'right');
    GridObj.SetColCellAlign('SALES_MEAN_3WEEK',  'right');
    GridObj.SetColCellAlign('WEEK_DEV_1_3',      'right');
    GridObj.SetColCellAlign('DEV_PER',           'right'); //ら離綠徽
    GridObj.SetColCellAlign('SALES_SUM_PY',      'right');  //蹺陛 : 2014-05-02 瞪喇翕錯 援啗
    GridObj.SetColCellAlign('THIS_YEAR_SUM',     'right'); //蹺陛 : 2014-04-30 喇援啗
    GridObj.SetColCellAlign('LAST_YEAR_SUM',  	 'right'); //蹺陛 : 2014-04-30 瞪喇援啗
    GridObj.SetColCellAlign('SUB_PY_MON',   	 'right'); //瞪喇翕錯 渠綠
    GridObj.SetColCellAlign('SUB_PY_YEAR',    	 'right'); //瞪喇援啗 渠綠
    GridObj.SetColCellAlign('BASE_STOCK_PALLET', 'right');
    GridObj.SetColCellAlign('STOCK_EXPT_PALLET', 'right');
  	
    
    GridObj.SetNumberFormat("BASE_STOCK",       "###,###.#");   
    GridObj.SetNumberFormat("OUT_STOCK",        "###,###.#");  
    GridObj.SetNumberFormat("STOCK_DAY",        "###,###.#");
    GridObj.SetNumberFormat("SALES_PRE",        "###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",        "###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",        "###,###.#");
    //GridObj.SetNumberFormat("STOCK_HIDDEN",     "###,###.#");
    GridObj.SetNumberFormat("PROD_TERM",        "###,###.#");
    GridObj.SetNumberFormat("TERM_VAL",       	"###,###.#");
    GridObj.SetNumberFormat("TERM_PER",         "###,##0.#");
    GridObj.SetNumberFormat("STOCK_EXPT",       "###,###.#");
    //GridObj.SetNumberFormat("RECEIPT_EXPT",     "###,###.#");
    GridObj.SetNumberFormat("SALES_SUM_PY",     "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM", "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_1", "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_2", "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM_3", "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_1WEEK", "###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_3WEEK", "###,###.#");
    GridObj.SetNumberFormat("WEEK_DEV_1_3",     "###,###.#");
    GridObj.SetNumberFormat("DEV_PER",          "###,###.#");
    GridObj.SetNumberFormat("PRE_MONTH_SELL",   "###,###.#");
    GridObj.SetNumberFormat("THIS_YEAR_SUM",    "###,###.#");
    GridObj.SetNumberFormat("LAST_YEAR_SUM",    "###,###.#");
    GridObj.SetNumberFormat("SUB_PY_MON",   	"###,###.#");
    GridObj.SetNumberFormat("SUB_PY_YEAR",   	"###,###.#");
    GridObj.SetNumberFormat("BASE_STOCK_PALLET","###,###.#");
    GridObj.SetNumberFormat("STOCK_EXPT_PALLET","###,###.#");
    
   
	doQuery();
	//GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	//Hidden 鏽歲
	//GridObj.SetColHide("CRUD",true);

}
	

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
            	
            	
            	var row = GridObj.GetRowCount();            	
            	if (row == 0) return;
            	
            	//GridSetMerge();
             
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
    	
    	
    
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
	function GoSave(service) {	
	
	};


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
   		
       var cnfm_date	= document.frm.cnfm_date.value;
       var item_id		= document.frm.item_id.value;
       cnfm_date 		= cnfm_date.replace(/-/g,"");
       var gubn			= document.frm.gubn.value;
         	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("cnfm_date",   cnfm_date);
       GridObj.SetParam("item_id",       item_id);	   
	   GridObj.SetParam("gubn",       		gubn);
	   GridObj.DoQuery(servlet_url);       
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

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
	function GridCellClick(strColumnKey, nRow) {
	
	}		

//	function GridCellDblClick(strColumnKey, nRow){	
//		
//		var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
//		var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
//		var cnfm_date	= document.frm.end_date.value;
//		
//		
//		if( strColumnKey == 'STOCK_EXPT'){
//			
//			var service_url = "service.do?_moon_service=ip_01140_inventoryPlanAnalysis_md_list_pop";
//			service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date;  
//			var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
//			var newWin = window.open(service_url, "", pop_win_style);
//			newWin.focus();		
//			
//		}	
//
//	}

/*Sort 滲熱 摹樹 */

	var flag_item_id = '1';	
	var flag_item_name = '1';
	var flag_base_stock = '1';
	var flag_stock_day = '1';
	var flag_prod_term = '1';
	var flag_term_val = '1';
	var flag_term_per = '1';
	var flag_sales_pre = '1';
	var flag_sales_cur = '1';
	
	var flag_sales_sum = '1';
	var flag_stock_expt = '1';
	var flag_pre_month_sell = '1';
	//var flag_receipt_expt = '1';
	var flag_receipt_expt_sum = '1';
	var flag_receipt_expt_sum_1 = '1';
	var flag_receipt_expt_sum_2 = '1';
	var flag_receipt_expt_sum_3 = '1';
	var flag_sales_mean_1week = '1';
	var flag_sales_mean_3week = '1';
	var flag_week_dev_1_3 = '1';
	var flag_dev_per = '1';
	var flag_sales_sum_py = '1';
	
	var flag_this_year_sum = '1';
	var flag_last_year_sum = '1';
	var flag_sum_py_mon = '1';
	var flag_sum_py_year = '1';
	var flag_base_stock_pallet = '1';
	var flag_stock_expt_pallet = '1';

	function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('BASE_STOCK'		,true);
	GridObj.SetColCellSortEnable('STOCK_DAY'		,true);
	GridObj.SetColCellSortEnable('PROD_TERM'		,true);
	GridObj.SetColCellSortEnable('TERM_VAL'			,true);
	GridObj.SetColCellSortEnable('TERM_PER'			,true);
	GridObj.SetColCellSortEnable('SALES_PRE'		,true);
	GridObj.SetColCellSortEnable('SALES_CUR'		,true);
	
	GridObj.SetColCellSortEnable('SALES_SUM'		,true);
	GridObj.SetColCellSortEnable('STOCK_EXPT'		,true);
	GridObj.SetColCellSortEnable('PRE_MONTH_SELL'	,true);
	//GridObj.SetColCellSortEnable('RECEIPT_EXPT'		,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM_1'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM_2'	,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM_3'	,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_1WEEK'	,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_3WEEK'	,true);
	GridObj.SetColCellSortEnable('WEEK_DEV_1_3'		,true);
	GridObj.SetColCellSortEnable('DEV_PER'			,true);
	
	GridObj.SetColCellSortEnable('SALES_SUM_PY'		,true);
	GridObj.SetColCellSortEnable('THIS_YEAR_SUM'	,true);
	GridObj.SetColCellSortEnable('LAST_YEAR_SUM'	,true);
	GridObj.SetColCellSortEnable('SUB_PY_MON'		,true);
	GridObj.SetColCellSortEnable('SUB_PY_YEAR'		,true);
	GridObj.SetColCellSortEnable('BASE_STOCK_PALLET',true);
	GridObj.SetColCellSortEnable('STOCK_EXPT_PALLET',true);
	
	GridObj.ClearGroupMerge();
	
	if(strColumnKey == 'ITEM_ID') {
		
		if(flag_item_id =='1'){
			
			GridObj.SetColCellSort('ITEM_ID','descending');
		
			flag_item_id++;
		}
		else if(flag_item_id =='2'){
			
			GridObj.SetColCellSort('ITEM_ID','asceding');
		
			flag_item_id--;
		}
	}
	if(strColumnKey == 'ITEM_NAME') {
		
		if(flag_item_name =='1'){
		
			GridObj.SetColCellSort('ITEM_NAME','descending');
			flag_item_name++;
		}
		else if(flag_item_name =='2'){
			
			GridObj.SetColCellSort('ITEM_NAME','asceding');
			
			flag_item_name--;	
			
		}
	}
	if(strColumnKey == 'BASE_STOCK') {
		
		if(flag_base_stock =='1'){
		
			GridObj.SetColCellSort('BASE_STOCK','descending');
			flag_base_stock++;
		}
		else if(flag_base_stock =='2'){
			
			GridObj.SetColCellSort('BASE_STOCK','asceding');
			
			flag_base_stock--;	
			
		}
	}
	if(strColumnKey == 'STOCK_DAY') {
		
		if(flag_stock_day =='1'){
		
			GridObj.SetColCellSort('STOCK_DAY','descending');
			flag_stock_day++;
		}
		else if(flag_stock_day =='2'){
			
			GridObj.SetColCellSort('STOCK_DAY','asceding');
			
			flag_stock_day--;	
			
		}
	}
	if(strColumnKey == 'PROD_TERM') {
		
		if(flag_prod_term =='1'){
		
			GridObj.SetColCellSort('PROD_TERM','descending');
			flag_prod_term++;
		}
		else if(flag_prod_term =='2'){
			
			GridObj.SetColCellSort('PROD_TERM','asceding');
			
			flag_prod_term--;	
			
		}
	}
	if(strColumnKey == 'TERM_VAL') {
		
		if(flag_term_val =='1'){
		
			GridObj.SetColCellSort('TERM_VAL','descending');
			flag_term_val++;
		}
		else if(flag_term_val =='2'){
			
			GridObj.SetColCellSort('TERM_VAL','asceding');
			
			flag_term_val--;	
			
		}
	}
	if(strColumnKey == 'TERM_PER') {
		
		if(flag_term_per =='1'){
		
			GridObj.SetColCellSort('TERM_PER','descending');
			flag_term_per++;
		}
		else if(flag_term_per =='2'){
			
			GridObj.SetColCellSort('TERM_PER','asceding');
			
			flag_term_per--;	
			
		}
	}
	if(strColumnKey == 'SALES_PRE') {
		
		if(flag_sales_pre =='1'){
		
			GridObj.SetColCellSort('SALES_PRE','descending');
			flag_sales_pre++;
		}
		else if(flag_sales_pre =='2'){
			
			GridObj.SetColCellSort('SALES_PRE','asceding');
			
			flag_sales_pre--;	
			
		}
	}
	if(strColumnKey == 'SALES_CUR') {
		
		if(flag_sales_cur =='1'){
		
			GridObj.SetColCellSort('SALES_CUR','descending');
			flag_sales_cur++;
		}
		else if(flag_sales_cur =='2'){
			
			GridObj.SetColCellSort('SALES_CUR','asceding');
			
			flag_sales_cur--;	
			
		}
	}
	if(strColumnKey == 'SALES_SUM') {
		
		if(flag_sales_sum =='1'){
		
			GridObj.SetColCellSort('SALES_SUM','descending');
			flag_sales_sum++;
		}
		else if(flag_sales_sum =='2'){
			
			GridObj.SetColCellSort('SALES_SUM','asceding');
			
			flag_sales_sum--;	
			
		}
	}
	if(strColumnKey == 'STOCK_EXPT') {
		
		if(flag_stock_expt =='1'){
		
			GridObj.SetColCellSort('STOCK_EXPT','descending');
			flag_stock_expt++;
		}
		else if(flag_stock_expt =='2'){
			
			GridObj.SetColCellSort('STOCK_EXPT','asceding');
			
			flag_stock_expt--;	
			
		}
	}
	if(strColumnKey == 'PRE_MONTH_SELL') {
		
		if(flag_pre_month_sell =='1'){
		
			GridObj.SetColCellSort('PRE_MONTH_SELL','descending');
			flag_pre_month_sell++;
		}
		else if(flag_pre_month_sell =='2'){
			
			GridObj.SetColCellSort('PRE_MONTH_SELL','asceding');
			
			flag_pre_month_sell--;	
			
		}
	}

	if(strColumnKey == 'RECEIPT_EXPT_SUM') {
		
		if(flag_receipt_expt_sum =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM','descending');
			flag_receipt_expt_sum++;
		}
		else if(flag_receipt_expt_sum =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM','asceding');
			
			flag_receipt_expt_sum--;	
			
		}
	}
	
	if(strColumnKey == 'RECEIPT_EXPT_SUM_1') {
		
		if(flag_receipt_expt_sum_1 =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_1','descending');
			flag_receipt_expt_sum_1++;
		}
		else if(flag_receipt_expt_sum_1 =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_1','asceding');
			
			flag_receipt_expt_sum_1--;	
			
		}
	}
	
	if(strColumnKey == 'RECEIPT_EXPT_SUM_2') {
		
		if(flag_receipt_expt_sum_2 =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_2','descending');
			flag_receipt_expt_sum_2++;
		}
		else if(flag_receipt_expt_sum_2 =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_2','asceding');
			
			flag_receipt_expt_sum_2--;	
			
		}
	}
	
	if(strColumnKey == 'RECEIPT_EXPT_SUM_3') {
		
		if(flag_receipt_expt_sum_3 =='1'){
		
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_3','descending');
			flag_receipt_expt_sum_3++;
		}
		else if(flag_receipt_expt_sum_3 =='2'){
			
			GridObj.SetColCellSort('RECEIPT_EXPT_SUM_3','asceding');
			
			flag_receipt_expt_sum_3--;	
			
		}
	}
	
	if(strColumnKey == 'SALES_MEAN_1WEEK') {
		
		if(flag_sales_mean_1week =='1'){
		
			GridObj.SetColCellSort('SALES_MEAN_1WEEK','descending');
			flag_sales_mean_1week++;
		}
		else if(flag_sales_cur =='2'){
			
			GridObj.SetColCellSort('SALES_MEAN_1WEEK','asceding');
			
			flag_sales_mean_1week--;	
			
		}
	}
	if(strColumnKey == 'SALES_MEAN_3WEEK') {
		
		if(flag_sales_mean_3week =='1'){
		
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','descending');
			flag_sales_mean_3week++;
		}
		else if(flag_sales_mean_3week =='2'){
			
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','asceding');
			
			flag_sales_mean_3week--;	
			
		}
	}
	if(strColumnKey == 'WEEK_DEV_1_3') {
		
		if(flag_dev_per =='1'){
		
			GridObj.SetColCellSort('WEEK_DEV_1_3','descending');
			flag_week_dev_1_3++;
		}
		else if(flag_dev_per =='2'){
			
			GridObj.SetColCellSort('WEEK_DEV_1_3','asceding');
			
			flag_week_dev_1_3--;	
			
		}
	}
	if(strColumnKey == 'DEV_PER') {
		
		if(flag_dev_per =='1'){
		
			GridObj.SetColCellSort('DEV_PER','descending');
			flag_dev_per++;
		}
		else if(flag_dev_per =='2'){
			
			GridObj.SetColCellSort('DEV_PER','asceding');
			
			flag_dev_per--;	
			
		}
	}
	if(strColumnKey == 'SALES_SUM_PY') {
		
		if(flag_sales_sum_py =='1'){
		
			GridObj.SetColCellSort('SALES_SUM_PY','descending');
			flag_sales_sum_py++;
		}
		else if(flag_sales_sum_py =='2'){
			
			GridObj.SetColCellSort('SALES_SUM_PY','asceding');
			
			flag_sales_sum_py--;	
			
		}
	}
	if(strColumnKey == 'THIS_YEAR_SUM') {
		
		if(flag_this_year_sum =='1'){
		
			GridObj.SetColCellSort('THIS_YEAR_SUM','descending');
			flag_this_year_sum++;
		}
		else if(flag_this_year_sum =='2'){
			
			GridObj.SetColCellSort('THIS_YEAR_SUM','asceding');
			
			flag_this_year_sum--;	
			
		}
	}
	if(strColumnKey == 'LAST_YEAR_SUM') {
		
		if(flag_last_year_sum =='1'){
		
			GridObj.SetColCellSort('LAST_YEAR_SUM','descending');
			flag_last_year_sum++;
		}
		else if(flag_last_year_sum =='2'){
			
			GridObj.SetColCellSort('LAST_YEAR_SUM','asceding');
			
			flag_last_year_sum--;	
			
		}
	}
	if(strColumnKey == 'SUB_PY_MON') {
		
		if(flag_sum_py_mon =='1'){
		
			GridObj.SetColCellSort('SUB_PY_MON','descending');
			flag_sum_py_mon++;
		}
		else if(flag_sum_py_mon =='2'){
			
			GridObj.SetColCellSort('SUB_PY_MON','asceding');
			
			flag_sum_py_mon--;	
			
		}
	}
	if(strColumnKey == 'SUB_PY_YEAR') {
		
		if(flag_sum_py_year =='1'){
		
			GridObj.SetColCellSort('SUB_PY_YEAR','descending');
			flag_sum_py_year++;
		}
		else if(flag_sum_py_year =='2'){
			
			GridObj.SetColCellSort('SUB_PY_YEAR','asceding');
			
			flag_sum_py_year--;	
			
		}
	}
	
	if(strColumnKey == 'BASE_STOCK_PALLET') {
		
		if(flag_base_stock_pallet =='1'){
		
			GridObj.SetColCellSort('BASE_STOCK_PALLET','descending');
			flag_base_stock_pallet++;
		}
		else if(flag_base_stock_pallet =='2'){
			
			GridObj.SetColCellSort('BASE_STOCK_PALLET','asceding');
			
			flag_base_stock_pallet--;	
			
		}
	}
	if(strColumnKey == 'STOCK_EXPT_PALLET') {
		
		if(flag_stock_expt_pallet =='1'){
		
			GridObj.SetColCellSort('STOCK_EXPT_PALLET','descending');
			flag_stock_expt_pallet++;
		}
		else if(flag_stock_expt_pallet =='2'){
			
			GridObj.SetColCellSort('STOCK_EXPT_PALLET','asceding');
			
			flag_stock_expt_pallet--;	
			
		}
	}
	
		GridSetMerge();
		
}

	function GridSetMerge(){	
}

