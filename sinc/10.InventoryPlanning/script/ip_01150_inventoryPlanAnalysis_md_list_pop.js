//## Щ煎斜極ID      : ip_01150_inventoryPlanAnalysis_md_list_pop.js
//## Щ煎斜極貲      : 衙殮鼻ヶ 營堅婦葬(で機)
//## 滲唳濠濠        : 檜鬼遵
//## 偃嫦橾濠        : 2015-06-26
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_07.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-06-26  檜鬼遵      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01150_inventoryPlanAnalysis_md_list_pop';

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
 	GridObj.AddHeader("PROD_TERM"  		   ,"殮堅\n唳婁橾熱"			,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"	       ,"營堅橾熱"       ,"t_number"    ,100.3	,60     ,false); //0
   	GridObj.AddHeader("SALES_PRE"	       ,"瞪橾啗"	    	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"橾啗"       	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_SUM"	       ,"渡錯援啗"	    ,"t_number"    ,100.3	,60     	,false); //0 
 	GridObj.AddHeader("PRE_MONTH_SELL"	   ,"瞪錯啗"	    	,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("STOCK_EXPT"	       ,"蕨鼻營堅"		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("OUT_STOCK"	       ,"衙殮籀\n營堅"	,"t_number"    ,100.3	,60     ,false); //0  
   	GridObj.AddHeader("SALES_MEAN_1WEEK"   ,"1輿ゎ敕"		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"   ,"3輿ゎ敕"		,"t_number"    ,100.3   ,70     ,false) //0 	
 	
    GridObj.AddHeader("SALES_SUM_PY"       ,"瞪喇翕錯"	,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SUB_PY_MON"    	   ,"瞪喇翕錯\n渠綠"	,"t_number"    ,100.3   ,60     ,false); //0   
 	GridObj.AddHeader("THIS_YEAR_SUM"      ,"旎喇援啗"	   		,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("LAST_YEAR_SUM"      ,"瞪喇援啗"		,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("SUB_PY_YEAR"    	   ,"瞪喇援啗\n渠綠"	,"t_number"    ,100.3   ,60     ,false); //0
 	GridObj.AddHeader("RECEIPT_EXPT"   	   ,"衙殮蕨薑\nM"	,"t_number"    ,100.3	,0     ,false); //0 
 	GridObj.AddHeader("RECEIPT_EXPT_SUM"   ,"渡錯衙殮\n援啗"		,"t_number"    ,100.3	,70     ,false); //0 
 	GridObj.AddHeader("RECEIPT_EXPT_PRE"   ,"瞪錯衙殮"		,"t_number"    ,100.3	,70     ,false); //0 
 	
 	
 	GridObj.AddHeader("STOCK_HIDDEN"  	   ,"唳婁橾熱�鰽�"			,"t_text"    	,100	,0     ,false); //0
 	GridObj.AddHeader("TERM_HIDDEN"  	   ,"嶸鱔晦и�鰽�"			,"t_text"    	,100	,0     ,false); //0
 	GridObj.AddHeader("TERM_VAL"  		   ,"嶸鱔晦и"				,"t_number"    	,100.3	,70     ,false); //0
 	GridObj.AddHeader("TERM_PER"  		   ,"嶸鱔晦и\n唳婁徽"		,"t_text"    	,100	,70     ,false); //0  	
 	GridObj.AddHeader("NWGT_PER_BUOM"  	   ,"晦蟾營堅\n醞榆(t)"			,"t_number"     ,100.3	,80     ,false); //0
 	GridObj.AddHeader("MON_IN_CUM_BUOM"    ,"渡錯衙殮\n援啗醞榆(t)"		,"t_number"     ,100.3	,80     ,false); //0 	
 	GridObj.AddHeader("YEAR_IN_CUM"  	   ,"旎喇衙殮\n援啗"					,"t_number"     ,100.3	,80     ,false); //0
 	GridObj.AddHeader("YEAR_IN_CUM_BUOM"   ,"旎喇衙殮\n援啗醞榆(t)"		,"t_number"     ,100.3	,80     ,false); //0
 	GridObj.AddHeader("MON_SALE_CUM"  	   ,"渡錯っ衙\n援啗醞榆(t)"		,"t_number"     ,100.3	,80     ,false); //0
 	GridObj.AddHeader("YEAR_SALE_CUM_BUOM" ,"旎喇っ衙\n援啗醞榆(t)"		,"t_number"     ,100.3	,80     ,false); //0
 
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	
	
	GridObj.SetColHide("YEAR_IN_CUM", 	true);

	GridObj.SetColFix('SPEC'); 
	
	GridObj.SetColCellAlign('SALES_CAT05',        'left');
	GridObj.SetColCellAlign('SALES_CAT03',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('SPEC',               'left');
    GridObj.SetColCellAlign('BASE_STOCK',        'right');
    GridObj.SetColCellAlign('OUT_STOCK',         'right');
    GridObj.SetColCellAlign('STOCK_DAY',         'right'); 

    GridObj.SetColCellAlign('SALES_PRE',         'right');
    GridObj.SetColCellAlign('PROD_TERM',         'right'); 
    GridObj.SetColCellAlign('TERM_VAL',        	 'right');
    GridObj.SetColCellAlign('TERM_PER',          'right'); //嶸鱔晦и 唳婁徽
    GridObj.SetColCellAlign('SALES_CUR',         'right'); //援啗
    GridObj.SetColCellAlign('STOCK_EXPT',        'right'); //蕨鼻營堅
    GridObj.SetColCellAlign('PRE_MONTH_SELL',    'right'); //瞪錯啗 
    GridObj.SetColCellAlign('RECEIPT_EXPT_SUM',  'right'); //
    GridObj.SetColCellAlign('RECEIPT_EXPT',  	 'right'); //
    GridObj.SetColCellAlign('RECEIPT_EXPT_PRE',  'right'); //

    GridObj.SetColCellAlign('SALES_MEAN_1WEEK',  'right');
    GridObj.SetColCellAlign('SALES_MEAN_3WEEK',  'right');

    GridObj.SetColCellAlign('SALES_SUM_PY',      'right');  //蹺陛 : 2014-05-02 瞪喇翕錯 援啗
    GridObj.SetColCellAlign('THIS_YEAR_SUM',     'right'); //蹺陛 : 2014-04-30 喇援啗
    GridObj.SetColCellAlign('LAST_YEAR_SUM',  	 'right'); //蹺陛 : 2014-04-30 瞪喇援啗
    GridObj.SetColCellAlign('SUB_PY_MON',   	 'right'); //瞪喇翕錯 渠綠
    GridObj.SetColCellAlign('SUB_PY_YEAR',    	 'right'); //瞪喇援啗 渠綠

    GridObj.SetColCellAlign('NWGT_PER_BUOM', 	 'right');
    GridObj.SetColCellAlign('MON_IN_CUM_BUOM', 	 'right');
    GridObj.SetColCellAlign('YEAR_IN_CUM', 	 	 'right');
    GridObj.SetColCellAlign('YEAR_IN_CUM_BUOM',  'right');
    GridObj.SetColCellAlign('MON_SALE_CUM', 	 'right');
    GridObj.SetColCellAlign('YEAR_SALE_CUM_BUOM','right');
  	
    
    GridObj.SetNumberFormat("YEAR_IN_CUM_BUOM",     "###,###.#");
    GridObj.SetNumberFormat("BASE_STOCK",       	"###,###.#"); 
    GridObj.SetNumberFormat("OUT_STOCK",       		"###,###.#");   
    GridObj.SetNumberFormat("STOCK_DAY",        	"###,###.#");    

    GridObj.SetNumberFormat("SALES_PRE",        	"###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",        	"###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",        	"###,###.#");

    GridObj.SetNumberFormat("PROD_TERM",       		"###,###.#");
    GridObj.SetNumberFormat("TERM_VAL",       		"###,###.#");

    GridObj.SetNumberFormat("STOCK_EXPT",       	"###,###.#");
 
    GridObj.SetNumberFormat("SALES_SUM_PY",     	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_PRE", 	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT", 		"###,###.#");

    GridObj.SetNumberFormat("SALES_MEAN_1WEEK", 	"###,###.#");
    GridObj.SetNumberFormat("SALES_MEAN_3WEEK", 	"###,###.#");

    GridObj.SetNumberFormat("PRE_MONTH_SELL",   	"###,###.#");
    GridObj.SetNumberFormat("THIS_YEAR_SUM",    	"###,###.#");
    GridObj.SetNumberFormat("LAST_YEAR_SUM",    	"###,###.#");
    GridObj.SetNumberFormat("SUB_PY_MON",   		"###,###.#");
    GridObj.SetNumberFormat("SUB_PY_YEAR",   		"###,###.#");
    
    GridObj.SetNumberFormat("NWGT_PER_BUOM",   		"###,##0.##");
    GridObj.SetNumberFormat("MON_IN_CUM_BUOM",   	"###,##0.##");
    GridObj.SetNumberFormat("YEAR_IN_CUM_BUOM",   	"###,##0.##");
    GridObj.SetNumberFormat("MON_SALE_CUM",   		"###,##0.##");
    GridObj.SetNumberFormat("YEAR_SALE_CUM_BUOM",   "###,##0.##");
   
    
    
	doQuery();
	
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
   	   var item_id			= document.all.item_id.value;
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
      
 		
       
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
       GridObj.SetParam("item_id",       item_id);
       	   
	   	   
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

	
