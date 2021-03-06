//## Щ煎斜極ID      : ip_01120_Jgc_inventoryPlanAnalysis_list.js
//## Щ煎斜極貲       :  濰晦羹�� ヶ跡碟戮
//## 滲唳濠            : 檜鬼遵
//## 偃嫦橾濠        :  2015-09-22 
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01120_Jgc_inventoryPlanAnalysis_list';

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
	//GridObj.bHDMoving = true;		// 鏽歲 ④渦 嬪纂 檜翕

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

	
	GridObj.AddHeader("DIVISION"	       ,"掘碟"	    	,"t_text"      ,100	    ,0     ,false); //0	
 	GridObj.AddHeader("SALES_CAT03"	       ,"濠營斜瑜"	    ,"t_text"      ,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ヶ跡囀萄"		,"t_text" 	   ,100	    ,65     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ヶ跡貲"	        ,"t_text" 	   ,100	    ,220    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"敘問"	    	,"t_text"  	   ,100		,90     ,false); //0
 	
 	GridObj.AddHeader("JGC_STOCK"	       ,"濰晦羹�苒n嫦儅營堅"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("USE_PLAN"	       ,"渡錯\n籀葬啗��"		,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("SALES_PRE"	       ,"瞪橾啗"	    		,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"橾啗"       		,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_CUM"	       ,"援啗"       		,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("MONTH_RATE"	       ,"渡錯模霞徽"       	,"t_text"      ,100		,70     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       ,"識援啗"	    		,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("REMAIN_STOCK"	   ,"濰晦羹�苒n濤罹營堅"	,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("REMAIN_PRICE"	   ,"濰晦羹�苒n濤罹旎擋"	,"t_number"    ,100.3	,100     ,false); //0
    GridObj.AddHeader("REMAIN_DAY"	   	   ,"濤罹橾熱"			,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("EXPIRY_VERSION"     ,"嶸鱔晦и\n虜晦橾"		,"t_text"      ,100		,80     ,false); //0
    GridObj.AddHeader("PROD_TERM"     	   ,"嶸鱔晦и\n唳婁橾熱"	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("TERM_PER"  		   ,"嶸鱔晦и\n唳婁徽"		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("DUE_DATE"  		   ,"籀葬晦и"			,"t_text"      ,100		,150     ,false); //0
    GridObj.AddHeader("STOCK_USE_PER"	   ,"營堅\n模霞徽"        ,"t_text"      ,100		,60     ,false); //0
 	GridObj.AddHeader("REGISTER_AGO"	   ,"蛔煙\n唳婁橾"        ,"t_number"    ,100.3	,60     ,false); //0
 	
 	GridObj.AddHeader("EXPECT_QTY"	       ,"30%\n唳婁蕨鼻熱榆"  ,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("EXPECT_QTY2"	       ,"50%\n唳婁蕨鼻熱榆"  ,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("EXPECT_QTY3"	       ,"80%\n唳婁蕨鼻熱榆"  ,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("EXPECT_QTY4"	       ,"100%\n唳婁蕨鼻熱榆" ,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("TERM_VAL"  		   ,"嶸鱔晦и"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"  		   ,"營堅橾熱"			,"t_number"    ,100.3	,70     ,false); //0
 	
 	GridObj.AddHeader("SALES_MEAN_3WEEK"    ,"3輿ゎ敕"			,"t_number"     ,100.3	,70     ,false); //0
 	GridObj.AddHeader("REGISTER_DAY"       ,"ヶ跡\n蛔煙橾"		,"t_text"      ,100		,70     ,false); //0
 	
  
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 
	
	
    GridObj.SetColCellAlign('SALES_CAT03',        	'left'); 
    GridObj.SetColCellAlign('EXPIRY_VERSION',     	'center'); 	
    GridObj.SetColCellAlign('TERM_PER',     		'right'); 
    GridObj.SetColCellAlign('STOCK_USE_PER',     	'right'); 
    GridObj.SetColCellAlign('MONTH_RATE',     		'right'); 
    GridObj.SetColCellAlign('REGISTER_DAY',     	'center'); 
    GridObj.SetNumberFormat("JGC_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("SALES_PRE",       "###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",       "###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",       "###,###.#");
    GridObj.SetNumberFormat("REMAIN_STOCK",    "###,###.#");
    GridObj.SetNumberFormat("PROD_TERM",       "###,###.#");
    GridObj.SetNumberFormat("REGISTER_AGO",    "###,###.#");
    GridObj.SetNumberFormat("EXPECT_QTY",      "###,###.#");
    GridObj.SetNumberFormat("EXPECT_QTY2",     "###,###.#");
    GridObj.SetNumberFormat("EXPECT_QTY3",     "###,###.#");
    GridObj.SetNumberFormat("EXPECT_QTY4",     "###,###.#");
	GridObj.SetNumberFormat("USE_PLAN",        "###,###.#");
	GridObj.SetNumberFormat("REMAIN_PRICE",     "###,###.#");
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
            	
            	
            	GridSetMerge();
            	GridModify();
             
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
function GoSave(service) {
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	doSave();	
	
};

function doSave() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var start_date		= document.frm.start_date.value.replace(/-/g,"");;
	var search_type		= document.frm.search_type.value;
	var search_item		= document.frm.search_item.value;

    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("start_date",						start_date);
	GridObj.SetParam("search_type",						search_type);
	GridObj.SetParam("search_item",						search_item);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}




/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");
	   var user_id			= document.all._user_id.value;     
       var search_type	    = document.all.search_type.value;       
       var search_item	    = document.all.search_item.value;     	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
      
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);    
	   GridObj.SetParam("search_type", search_type);	   
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("user_id", 			user_id);
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

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}		


/*Sort 滲熱 摹樹 */

	var flag_item_id = '1';	
	var flag_item_name = '1';
	var flag_jgc_stock = '1';	
	var flag_sales_pre = '1';
	var flag_sales_cur = '1';	
	var flag_sales_sum = '1';
	
	var flag_remain_stock = '1';
	var flag_remain_day = '1';
	var flag_expiry_version ='1';
	var flag_prod_term = '1';	
	var flag_term_per = '1';
	var flag_due_date = '1';
	var flag_stock_use_per = '1';
	var flag_register_ago = '1';
	var flag_expect_qty = '1';
	var flag_expect_qty2 = '1';
	var flag_expect_qty3 = '1';
	var flag_expect_qty4 = '1';
	
	var flag_term_val = '1';
	var flag_stock_day = '1';
	var flag_sales_mean_3week = '1';
	var flag_register_day = '1';



function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('JGC_STOCK'		,true);
	GridObj.SetColCellSortEnable('STOCK_DAY'		,true);
	GridObj.SetColCellSortEnable('PROD_TERM'		,true);
	GridObj.SetColCellSortEnable('TERM_VAL'			,true);
	GridObj.SetColCellSortEnable('TERM_PER'			,true);
	GridObj.SetColCellSortEnable('SALES_PRE'		,true);
	GridObj.SetColCellSortEnable('SALES_CUR'		,true);
	
	GridObj.SetColCellSortEnable('SALES_SUM'		,true);
	GridObj.SetColCellSortEnable('REMAIN_STOCK'		,true);
	GridObj.SetColCellSortEnable('REMAIN_DAY'		,true);
	GridObj.SetColCellSortEnable('EXPIRY_VERSION'	,true);
	GridObj.SetColCellSortEnable('DUE_DATE'			,true);
	GridObj.SetColCellSortEnable('STOCK_USE_PER'	,true);
	GridObj.SetColCellSortEnable('REGISTER_AGO'		,true);
	GridObj.SetColCellSortEnable('EXPECT_QTY'		,true);
	GridObj.SetColCellSortEnable('EXPECT_QTY2'		,true);
	
	GridObj.SetColCellSortEnable('EXPECT_QTY3'		,true);
	GridObj.SetColCellSortEnable('EXPECT_QTY4'		,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_3WEEK'	,true);
	GridObj.SetColCellSortEnable('REGISTER_DAY'		,true);
	
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
	if(strColumnKey == 'JGC_STOCK') {
		
		if(flag_jgc_stock =='1'){
		
			GridObj.SetColCellSort('JGC_STOCK','descending');
			flag_jgc_stock++;
		}
		else if(flag_jgc_stock =='2'){
			
			GridObj.SetColCellSort('JGC_STOCK','asceding');
			
			flag_jgc_stock--;	
			
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
	if(strColumnKey == 'REMAIN_STOCK') {
		
		if(flag_remain_stock =='1'){
		
			GridObj.SetColCellSort('REMAIN_STOCK','descending');
			flag_remain_stock++;
		}
		else if(flag_remain_stock =='2'){
			
			GridObj.SetColCellSort('REMAIN_STOCK','asceding');
			
			flag_remain_stock--;	
			
		}
	}
	if(strColumnKey == 'REMAIN_DAY') {
		
		if(flag_remain_day =='1'){
		
			GridObj.SetColCellSort('REMAIN_DAY','descending');
			flag_remain_day++;
		}
		else if(flag_remain_day =='2'){
			
			GridObj.SetColCellSort('REMAIN_DAY','asceding');
			
			flag_remain_day--;	
			
		}
	}
	if(strColumnKey == 'EXPIRY_VERSION') {
		
		if(flag_expiry_version =='1'){
		
			GridObj.SetColCellSort('EXPIRY_VERSION','descending');
			flag_expiry_version++;
		}
		else if(flag_expiry_version =='2'){
			
			GridObj.SetColCellSort('EXPIRY_VERSION','asceding');
			
			flag_expiry_version--;	
			
		}
	}
	if(strColumnKey == 'DUE_DATE') {
		
		if(flag_due_date =='1'){
		
			GridObj.SetColCellSort('DUE_DATE','descending');
			flag_due_date++;
		}
		else if(flag_due_date =='2'){
			
			GridObj.SetColCellSort('DUE_DATE','asceding');
			
			flag_due_date--;	
			
		}
	}
	if(strColumnKey == 'STOCK_USE_PER') {
		
		if(flag_stock_use_per =='1'){
		
			GridObj.SetColCellSort('STOCK_USE_PER','descending');
			flag_stock_use_per++;
		}
		else if(flag_stock_use_per =='2'){
			
			GridObj.SetColCellSort('STOCK_USE_PER','asceding');
			
			flag_stock_use_per--;	
			
		}
	}
	if(strColumnKey == 'REGISTER_AGO') {
		
		if(flag_register_ago =='1'){
		
			GridObj.SetColCellSort('REGISTER_AGO','descending');
			flag_register_ago++;
		}
		else if(flag_register_ago =='2'){
			
			GridObj.SetColCellSort('REGISTER_AGO','asceding');
			
			flag_register_ago--;	
			
		}
	}
	if(strColumnKey == 'EXPECT_QTY') {
		
		if(flag_expect_qty =='1'){
		
			GridObj.SetColCellSort('EXPECT_QTY','descending');
			flag_expect_qty++;
		}
		else if(flag_expect_qty =='2'){
			
			GridObj.SetColCellSort('EXPECT_QTY','asceding');
			
			flag_expect_qty--;	
			
		}
	}
	if(strColumnKey == 'EXPECT_QTY2') {
		
		if(flag_expect_qty2 =='1'){
		
			GridObj.SetColCellSort('EXPECT_QTY2','descending');
			flag_expect_qty2++;
		}
		else if(flag_expect_qty2 =='2'){
			
			GridObj.SetColCellSort('EXPECT_QTY2','asceding');
			
			flag_expect_qty2--;	
			
		}
	}
	if(strColumnKey == 'EXPECT_QTY3') {
		
		if(flag_expect_qty3 =='1'){
		
			GridObj.SetColCellSort('EXPECT_QTY3','descending');
			flag_expect_qty3++;
		}
		else if(flag_expect_qty3 =='2'){
			
			GridObj.SetColCellSort('EXPECT_QTY3','asceding');
			
			flag_expect_qty3--;	
			
		}
	}
	if(strColumnKey == 'EXPECT_QTY4') {
		
		if(flag_expect_qty4 =='1'){
		
			GridObj.SetColCellSort('EXPECT_QTY4','descending');
			flag_expect_qty4++;
		}
		else if(flag_expect_qty4 =='2'){
			
			GridObj.SetColCellSort('EXPECT_QTY4','asceding');
			
			flag_expect_qty4--;	
			
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
	if(strColumnKey == 'REGISTER_DAY') {
		
		if(flag_register_day =='1'){
		
			GridObj.SetColCellSort('REGISTER_DAY','descending');
			flag_register_day++;
		}
		else if(flag_register_day =='2'){
			
			GridObj.SetColCellSort('REGISTER_DAY','asceding');
			
			flag_register_day--;	
			
		}
	}
	
		GridSetMerge();
		
}

function GridSetMerge(){
	
				
		GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME,SPEC');
      	GridObj.AddSummaryBar('SUMMARY1', '模啗', 'SALES_CAT03', 'sum', 'JGC_STOCK,USE_PLAN,STOCK_DAY,PROD_TERM,TERM_VAL,SALES_PRE,SALES_CUR,SALES_CUM,MONTH_RATE,SALES_SUM,REMAIN_STOCK,REMAIN_PRICE,' +
      			'REMAIN_DAY,EXPIRY_VERSION,DUE_DATE,STOCK_USE_PER,REGISTER_AGO,EXPECT_QTY,EXPECT_QTY2,EXPECT_QTY3,EXPECT_QTY4,SALES_MEAN_3WEEK,REGISTER_DAY'); 
   

	      	 	
  	 	GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'JGC_STOCK,USE_PLAN,STOCK_DAY,PROD_TERM,TERM_VAL,SALES_PRE,SALES_CUR,SALES_CUM,MONTH_RATE,SALES_SUM,REMAIN_STOCK,REMAIN_PRICE,' +
		'REMAIN_DAY,EXPIRY_VERSION,DUE_DATE,STOCK_USE_PER,REGISTER_AGO,EXPECT_QTY,EXPECT_QTY2,EXPECT_QTY3,EXPECT_QTY4,SALES_MEAN_3WEEK,REGISTER_DAY'); 
		
		var rowcount = GridObj.GetMergeCount('SALES_CAT03');   //模啗 檣策蝶 掘ж晦
         	    for (var i=0; i<rowcount; i++){
         	    	
         	   	 	var use_plan 		 = GridObj.GetSummaryBarValue('SUMMARY1','USE_PLAN',i,true).replace(/,/g,"");         	   	 	
         	    	var sales_cum 		 = GridObj.GetSummaryBarValue('SUMMARY1','SALES_CUM',i,true).replace(/,/g,"");
         	    	var stock 		 	 = GridObj.GetSummaryBarValue('SUMMARY1','JGC_STOCK',i,true).replace(/,/g,"");         	   	 	
         	    	var sales_sum 		 = GridObj.GetSummaryBarValue('SUMMARY1','SALES_SUM',i,true).replace(/,/g,"");		
         	    	
         	    	
         	    	/* 餌辨濠 雖薑 啗骯衝 蹺陛 - 營堅模霞徽,渡錯模霞徽 */
         	    	GridObj.SetSummaryBarValue('SUMMARY1','STOCK_USE_PER',i, Math.round((sales_sum/stock)*1000)/10 + '%' );
        			GridObj.SetSummaryBarValue('SUMMARY1','MONTH_RATE',i, 	 Math.round((sales_cum/use_plan)*1000)/10 + '%' );
         	    	
          	    }
  		
  		var use_plan_2 		 	 = GridObj.GetSummaryBarValue('SUMMARY2','USE_PLAN',i,true).replace(/,/g,"");
  		var sales_cum_2 		 = GridObj.GetSummaryBarValue('SUMMARY2','SALES_CUM',i,true).replace(/,/g,"");
    	var stock_2 		 	 = GridObj.GetSummaryBarValue('SUMMARY2','JGC_STOCK',i,true).replace(/,/g,"");         	   	 	
    	var sales_sum_2 		 = GridObj.GetSummaryBarValue('SUMMARY2','SALES_SUM',i,true).replace(/,/g,""); 
    	
    	GridObj.SetSummaryBarValue('SUMMARY2','STOCK_USE_PER',i, Math.round((sales_sum_2/stock_2)*1000)/10 + '%' );
        GridObj.SetSummaryBarValue('SUMMARY2','MONTH_RATE',i, 	 Math.round((sales_cum_2/use_plan_2)*1000)/10 + '%' );
   	        
    	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//喬儀

}



function GridModify(){
	
	
	 var rowcount = GridObj.GetMergeCount('ITEM_ID'); 
	 for(var i=0; i < rowcount; i++){
	 	
	 	var idx_s		= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
	 	var idx_e		= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,true);
	 	
	 	var remain_stock = GridObj.GetCellValue('REMAIN_STOCK',idx_s);
	 	if (remain_stock > 0){
	 		
	 		for(var j =idx_s; j < idx_e; j++ ){
	 			
	 			GridObj.SetCellValue('SALES_PRE',j+1,0);
	 			GridObj.SetCellValue('SALES_CUR',j+1,0);
	 			GridObj.SetCellValue('SALES_CUM',j+1,0);
	 			GridObj.SetCellValue('SALES_SUM',j+1,0);
	 			GridObj.SetCellValue('MONTH_RATE',j+1,0+'%');
	 			GridObj.SetCellValue('REMAIN_STOCK',j+1,GridObj.GetCellValue('JGC_STOCK',j+1));
	 		}
	 		
	 		
	 	}
	 	else{
	 			for(var j =idx_s; j < idx_e; j++ ){
	 			
	 			GridObj.SetCellValue('SALES_PRE',j+1,0);
	 			GridObj.SetCellValue('SALES_CUR',j+1,0);
	 			GridObj.SetCellValue('SALES_CUM',j+1,0);
	 			GridObj.SetCellValue('SALES_SUM',j+1,0);
	 			GridObj.SetCellValue('MONTH_RATE',j+1,0+'%');
	 			GridObj.SetCellValue('REMAIN_STOCK',j+1,GridObj.GetCellValue('JGC_STOCK',j+1));
	 			}
	 		
	 	}
	 	
	 	
	 }
	
}

function ExcelExport(){
	
	GridObj.ClearGroupMerge();
	GridObj.ExcelExport('','',true,false,true);
	
}

function ExcelImport(){
	
	GridObj.ExcelImport('','importall','all',true,true);
	GridSetMerge();
	doSave();
}






function RegisterItem(){
	
	var service_url = "service.do?_moon_service=ip_01120_Jgc_inventoryPlanAnalysis_list_reg";
	service_url +="&_moon_perpage=-1&_moon_pagenumber=1";
	//service_url += "&start_date=" + start_date; 
	var pop_win_style = "titlebar=yes, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=400, top=200, left=200";	
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();	
}

function SummaryReport2(){
	
	var start_date 		= document.frm.start_date.value.replace(/-/g,"");
	var gubn			= '1';
	
	var service_url = "service.do?_moon_service=ip_01120_Jgc_inventoryPlanAnalysis_summaryReport_new";
	service_url += "&_moon_perpage=-1&amp;_moon_pagenumber=1";
	service_url += "&start_date=" + start_date+ "&gubn=" + gubn; 
	var pop_win_style = "titlebar=yes, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=895, height=640, top=100, left=200";	
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();	
}
