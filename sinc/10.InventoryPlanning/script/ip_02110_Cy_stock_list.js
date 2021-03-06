//## Щ煎斜極ID      	: ip_02110_Cy_stock_list.js
//## Щ煎斜極貲       	:  熱轎 薯ヶ ヶ跡滌 營堅蹺檜
//## 滲唳濠            	: 	檜鬼遵
//## 偃嫦橾濠        	:  2015-10-16 
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_08.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_08.xml
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
var job_id = 'ip_02110_Cy_stock_list';

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

	
	GridObj.AddHeader("ROWNUM"	   		   ,"牖憮"  			,"t_number"    ,100.3	,40     ,false); //0
 	GridObj.AddHeader("SALES_CAT03"	       ,"濠營斜瑜"	    ,"t_text"      ,100	    ,60     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ヶ跡囀萄"		,"t_text" 	   ,100	    ,60     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ヶ跡貲"	        ,"t_text" 	   ,100	    ,260    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"敘問"	    	,"t_text"  	   ,100		,80     ,false); //0 	
 	
 	GridObj.AddHeader("BASE_STOCK"	       ,"晦蟾營堅"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("BASE_STOCK2"	       ,"晦蟾營堅"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("CY_STOCK"	       ,"CY營堅"	    		,"t_number"    ,100.3	,70     ,false); //0  	
 	GridObj.AddHeader("MI_ORDER"	       ,"CY嘐轎營堅"	    	,"t_number"    ,100.3	,0     ,false); //0
 	GridObj.AddHeader("DONGU_STOCK"	       ,"翕辦磁о"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("DONGU_STOCK_NEW"	   ,"翕辦褐о"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("DSJ_STOCK"	       ,"DSJ"				,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("PS_STOCK"	       ,"睡骯薯ヶ"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("GITA_STOCK"	       ,"晦顫"				,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"橾啗"       		,"t_number"    ,100.3	,70      ,false); //0
    GridObj.AddHeader("SALES_SUM"	       ,"援啗"	    		,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("STOCK_EXPT"	       ,"蕨鼻營堅"       		,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("WEEK_STOCK"	       ,"輿蟾\n晦蟾營堅"     	,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("PRE_CHGO"	       ,"摹轎堅榆"     		,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("MI_CHGO"	       	   ,"瞪輿\n嘐轎堅榆"     	,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("CHGO_PLAN"	       ,"W\n轎堅啗�僩�"	    ,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("BK_ORDER"	       ,"W\n睡韁等檜攪"	    ,"t_number"    ,100.3	,0     ,false); //0
    GridObj.AddHeader("PROD_PLAN"	       ,"W\n儅骯啗��"	    	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("AVL_STOCK"	       ,"W+1\n陛辨營堅"	    ,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("CHGO_PLAN2"	       ,"W+1\n轎堅啗�僩�"	    ,"t_number"    ,100.3	,70     ,false); //0
     GridObj.AddHeader("BK2_ORDER"	       ,"W+1\n睡韁等檜攪"	    ,"t_number"    ,100.3	,0     ,false); //0
    GridObj.AddHeader("PROD_PLAN2"	       ,"W+1\n儅骯啗��"	    ,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("AVL_STOCK2"	       ,"W+2\n陛辨營堅"	    ,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("CHGO_PLAN3"	       ,"W+2\n轎堅啗�僩�"	    ,"t_number"    ,100.3	,0     ,false); //0
    
    GridObj.AddHeader("RECEIPT_EXPT"	   ,"旎橾\n儅骯啗��"	    ,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("RECEIPT_EXPT_SUM"   ,"儅骯援啗"	    	,"t_number"    ,100.3	,70     ,false); //0
    
    GridObj.AddHeader("M_1"   ,"M-1っ衙榆"	    	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("M_2"   ,"M-2っ衙榆"	    	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("M_3"   ,"M-3っ衙榆"	    	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("M_4"   ,"M-4っ衙榆"	    	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("M_5"   ,"M-5っ衙榆"	    	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("M_6"   ,"M-6っ衙榆"	    	,"t_number"    ,100.3	,70     ,false); //0
    
    GridObj.AddHeader("TERM_VAL"   	,"嶸鱔晦и"	    		,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("DAY"   		,"嶸鱔晦и\n唳婁橾熱"	    ,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("PROD_TERM"   ,"嶸鱔晦и\n唳婁徽"	    ,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("MTO_MTS"   	,"樓撩"	    ,"t_text"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("EX_NATION"   ,"措陛"	    ,"t_text"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("GYR"   		,"GYR"	    ,"t_text"    ,100.3	,0     ,false); //0
 	
  
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 	
	GridObj.SetColCellAlign('ROWNUM',        	  'center');
//	GridObj.SetColHDBgColor('STOCK_EXPT',  			'225|255|54');
    GridObj.SetColCellAlign('SALES_CAT03',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('SPEC',               'left');
    GridObj.SetColCellAlign('MTO_MTS',            'center');
    GridObj.SetColCellAlign('EX_NATION',          'center');
    GridObj.SetColCellAlign('GYR',          	  'center');
    
    GridObj.SetNumberFormat("BASE_STOCK",      	"###,###.#");  
    GridObj.SetNumberFormat("DSJ_STOCK",      	"###,###.#");  
    GridObj.SetNumberFormat("DONGU_STOCK",      "###,###.#");  
    GridObj.SetNumberFormat("DONGU_STOCK_NEW",  "###,###.#");
    GridObj.SetNumberFormat("PS_STOCK",      	"###,###.#");  
    GridObj.SetNumberFormat("GITA_STOCK",      	"###,###.#");  
    GridObj.SetNumberFormat("SALES_CUR",       	"###,###.#");
    GridObj.SetNumberFormat("SALES_SUM",       	"###,###.#");
    GridObj.SetNumberFormat("STOCK_EXPT",       "###,###.#");
    GridObj.SetNumberFormat("CHGO_PLAN",       	"###,###.#");
    GridObj.SetNumberFormat("PROD_PLAN",       	"###,###.#");
    GridObj.SetNumberFormat("AVL_STOCK",       	"###,###.#");
    GridObj.SetNumberFormat("CHGO_PLAN2",       "###,###.#");
    GridObj.SetNumberFormat("PROD_PLAN2",       "###,###.#");
    GridObj.SetNumberFormat("AVL_STOCK2",       "###,###.#");
    GridObj.SetNumberFormat("CHGO_PLAN3",       "###,###.#");
    GridObj.SetNumberFormat("WEEK_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("MI_ORDER",      	"###,###.#"); 
    GridObj.SetNumberFormat("BK_ORDER",       	"###,###.#");
    GridObj.SetNumberFormat("BK2_ORDER",       	"###,###.#");
    GridObj.SetNumberFormat("CY_STOCK",       	"###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT",     "###,###.#");
    GridObj.SetNumberFormat("RECEIPT_EXPT_SUM", "###,###.#");
    GridObj.SetNumberFormat("PRE_CHGO",      	"###,###.#");  
    GridObj.SetNumberFormat("MI_CHGO",      	"###,###.#");  
    GridObj.SetNumberFormat("M_1", "###,###.#");
    GridObj.SetNumberFormat("M_2", "###,###.#");
    GridObj.SetNumberFormat("M_3", "###,###.#");
    GridObj.SetNumberFormat("M_4", "###,###.#");
    GridObj.SetNumberFormat("M_5", "###,###.#");
    GridObj.SetNumberFormat("M_6", "###,###.#");
    

	
	GridObj.SetColHDBgColor('BASE_STOCK',	'253|228|229');
	GridObj.SetColCellBgColor('CHGO_PLAN',	'178|235|244');
	GridObj.SetColCellBgColor('CHGO_PLAN2',	'178|235|244');
	GridObj.SetColCellBgColor('CHGO_PLAN3',	'178|235|244');
	GridObj.SetColHide("BASE_STOCK2", 	true);
	GridObj.SetColHide("DONGU_STOCK", 	true);
	GridObj.SetColHide("DONGU_STOCK_NEW", 	true);
	GridObj.SetColHide("DSJ_STOCK", 	true);
	GridObj.SetColHide("PS_STOCK", 		true);
    GridObj.SetColHide("GITA_STOCK", 	true);
    
    GridObj.SetColCellBgColor('ROWNUM','255|255|200');

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
        	GridGYR();
         
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
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  function doQuery() 
   {
       var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");      
   
   var user_id			= document.all._user_id.value; 	   
   var search_type		= document.all.search_type.value;		//賊蝶頃
   var mto_gubn			= document.all.mto_gubn.value;			//MTO/MTS
   var nation_gubn		= document.all.nation_gubn.value;		//措陛
   var prod_term		= document.all.prod_term.value;	  
 
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
  
   //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   GridObj.SetParam("mode",           "search");
   GridObj.SetParam("start_date",   start_date);        
   GridObj.SetParam("mto_gubn",		mto_gubn);	
   GridObj.SetParam("nation_gubn",	nation_gubn); 
   GridObj.SetParam("search_type",	search_type); 
   GridObj.SetParam("prod_term", prod_term);	  
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

function GridCellDblClick(strColumnKey, nRow){	
		
	
		var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
		var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
		var export_flag = '1';
		var cnfm_date	= document.frm.start_date.value;

		var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_hawa_new";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&export_flag=" + export_flag;  
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}		
/*Sort 滲熱 摹樹 */
	var flag_item_id 			= '1';	
	var flag_item_name 			= '1';	
	var flag_sales_cur 			= '1';
	var flag_sales_sum 			= '1';
	var flag_stock_expt 		= '1';
	var flag_prod_plan 			= '1';
	var flag_alv_stock 			= '1';
	var flag_cy_stock 			= '1';
	var flag_receipt_expt 		= '1';
	var flag_receipt_expt_sum 	= '1';
	var flag_m_1				= '1';
	var flag_m_2				= '1';
	var flag_m_3				= '1';
	var flag_m_4				= '1';
	var flag_m_5				= '1';
	var flag_m_6				= '1';
	var flag_term_val			= '1';
	var flag_day				= '1';
	var flag_PROD_TERM			= '1';
	var flag_MTO_MTS			= '1';
	var flag_EX_NATION			= '1';
	var base_stock_idx = 0 ;

function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('SALES_CUR'		,true);
	GridObj.SetColCellSortEnable('SALES_SUM'		,true);
	GridObj.SetColCellSortEnable('STOCK_EXPT'		,true);
	GridObj.SetColCellSortEnable('PROD_PLAN'		,true);
	GridObj.SetColCellSortEnable('AVL_STOCK'		,true);
	GridObj.SetColCellSortEnable('CY_STOCK'			,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT'		,true);
	GridObj.SetColCellSortEnable('RECEIPT_EXPT_SUM'	,true);
	GridObj.SetColCellSortEnable('M_1'				,true);
	GridObj.SetColCellSortEnable('M_2'				,true);
	GridObj.SetColCellSortEnable('M_3'				,true);
	GridObj.SetColCellSortEnable('M_4'				,true);
	GridObj.SetColCellSortEnable('M_5'				,true);
	GridObj.SetColCellSortEnable('M_6'				,true);
	GridObj.SetColCellSortEnable('TERM_VAL'			,true);
	GridObj.SetColCellSortEnable('DAY'				,true);
	GridObj.SetColCellSortEnable('PROD_TERM'		,true);
	GridObj.SetColCellSortEnable('MTO_MTS'			,true);
	GridObj.SetColCellSortEnable('EX_NATION'		,true);
	
	GridObj.ClearGroupMerge();
	
	/* 晦蟾營堅 */
	if(strColumnKey == "BASE_STOCK"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {			
			if(base_stock_idx == 0) {
				
				if(i==0) GridObj.SetColHDText("BASE_STOCK",GridObj.GetColHDText("DONGU_STOCK"));
				GridObj.SetCellValue('BASE_STOCK',i,GridObj.GetCellValue("DONGU_STOCK", i));
				
			}else if (base_stock_idx == 1){
				
				if(i==0) GridObj.SetColHDText("BASE_STOCK",GridObj.GetColHDText("DONGU_STOCK_NEW"));
				GridObj.SetCellValue('BASE_STOCK',i,GridObj.GetCellValue("DONGU_STOCK_NEW", i));
			}else if (base_stock_idx == 2){
				
				if(i==0) GridObj.SetColHDText("BASE_STOCK",GridObj.GetColHDText("DSJ_STOCK"));
				GridObj.SetCellValue('BASE_STOCK',i,GridObj.GetCellValue("DSJ_STOCK", i));
			}else if (base_stock_idx == 3){
				
				if(i==0) GridObj.SetColHDText("BASE_STOCK",GridObj.GetColHDText("PS_STOCK"));
				GridObj.SetCellValue('BASE_STOCK',i,GridObj.GetCellValue("PS_STOCK", i));
			}else if (base_stock_idx == 4){
				
				if(i==0) GridObj.SetColHDText("BASE_STOCK",GridObj.GetColHDText("GITA_STOCK"));
				GridObj.SetCellValue('BASE_STOCK',i,GridObj.GetCellValue("GITA_STOCK", i));
			}	
			else if (base_stock_idx == 5){
				
				if(i==0) GridObj.SetColHDText("BASE_STOCK",GridObj.GetColHDText("BASE_STOCK2"));
				GridObj.SetCellValue('BASE_STOCK',i,GridObj.GetCellValue("BASE_STOCK2", i));
			}				
							
		}
		base_stock_idx++;
		if(base_stock_idx == 6)	base_stock_idx = 0;
		
	}else{
		
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
		if(strColumnKey == 'PROD_PLAN') {
			
			if(flag_prod_plan =='1'){
			
				GridObj.SetColCellSort('PROD_PLAN','descending');
				flag_prod_plan++;
			}
			else if(flag_prod_plan =='2'){
				
				GridObj.SetColCellSort('PROD_PLAN','asceding');
				
				flag_prod_plan--;	
				
			}
		}	
		if(strColumnKey == 'AVL_STOCK') {
			
			if(flag_alv_stock =='1'){
			
				GridObj.SetColCellSort('AVL_STOCK','descending');
				flag_alv_stock++;
			}
			else if(flag_alv_stock =='2'){
				
				GridObj.SetColCellSort('AVL_STOCK','asceding');
				
				flag_alv_stock--;	
				
			}
		}	
		if(strColumnKey == 'CY_STOCK') {
			
			if(flag_item_name =='1'){
			
				GridObj.SetColCellSort('CY_STOCK','descending');
				flag_item_name++;
			}
			else if(flag_item_name =='2'){
				
				GridObj.SetColCellSort('CY_STOCK','asceding');
				
				flag_item_name--;	
				
			}
		}	
		if(strColumnKey == 'RECEIPT_EXPT') {
			
			if(flag_cy_stock =='1'){
			
				GridObj.SetColCellSort('RECEIPT_EXPT','descending');
				flag_cy_stock++;
			}
			else if(flag_cy_stock =='2'){
				
				GridObj.SetColCellSort('RECEIPT_EXPT','asceding');
				
				flag_cy_stock--;	
				
			}
		}	
		if(strColumnKey == 'RECEIPT_EXPT_SUM') {
			
			if(flag_receipt_expt =='1'){
			
				GridObj.SetColCellSort('RECEIPT_EXPT_SUM','descending');
				flag_receipt_expt++;
			}
			else if(flag_receipt_expt =='2'){
				
				GridObj.SetColCellSort('RECEIPT_EXPT_SUM','asceding');
				
				flag_receipt_expt--;	
				
			}
		}	
		if(strColumnKey == 'M_1') {
			
			if(flag_m_1 =='1'){
			
				GridObj.SetColCellSort('M_1','descending');
				flag_m_1++;
			}
			else if(flag_m_1 =='2'){
				
				GridObj.SetColCellSort('M_1','asceding');
				
				flag_m_1--;	
				
			}
		}	
		if(strColumnKey == 'M_2') {
			
			if(flag_m_2 =='1'){
			
				GridObj.SetColCellSort('M_2','descending');
				flag_m_2++;
			}
			else if(flag_m_2 =='2'){
				
				GridObj.SetColCellSort('M_2','asceding');
				
				flag_m_2--;	
				
			}
		}	
		if(strColumnKey == 'M_3') {
			
			if(flag_m_3 =='1'){
			
				GridObj.SetColCellSort('M_3','descending');
				flag_m_3++;
			}
			else if(flag_m_3 =='2'){
				
				GridObj.SetColCellSort('M_3','asceding');
				
				flag_m_3--;	
				
			}
		}	
		if(strColumnKey == 'M_4') {
			
			if(flag_m_4 =='1'){
			
				GridObj.SetColCellSort('M_4','descending');
				flag_m_4++;
			}
			else if(flag_m_4 =='2'){
				
				GridObj.SetColCellSort('M_4','asceding');
				
				flag_m_4--;	
				
			}
		}	
		if(strColumnKey == 'M_5') {
			
			if(flag_m_5 =='1'){
			
				GridObj.SetColCellSort('M_5','descending');
				flag_m_5++;
			}
			else if(flag_m_5 =='2'){
				
				GridObj.SetColCellSort('M_5','asceding');
				
				flag_m_5--;	
				
			}
		}	
		if(strColumnKey == 'M_6') {
			
			if(flag_m_6 =='1'){
			
				GridObj.SetColCellSort('M_6','descending');
				flag_m_6++;
			}
			else if(flag_m_6 =='2'){
				
				GridObj.SetColCellSort('M_6','asceding');
				
				flag_m_6--;	
				
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
		if(strColumnKey == 'DAY') {
			
			if(flag_day =='1'){
			
				GridObj.SetColCellSort('DAY','descending');
				flag_day++;
			}
			else if(flag_day =='2'){
				
				GridObj.SetColCellSort('DAY','asceding');
				
				flag_day--;	
				
			}
		}	
		if(strColumnKey == 'PROD_TERM') {
			
			if(flag_PROD_TERM =='1'){
			
				GridObj.SetColCellSort('PROD_TERM','descending');
				flag_PROD_TERM++;
			}
			else if(flag_PROD_TERM =='2'){
				
				GridObj.SetColCellSort('PROD_TERM','asceding');
				
				flag_PROD_TERM--;	
				
			}
		}	
		if(strColumnKey == 'MTO_MTS') {
			
			if(flag_MTO_MTS =='1'){
			
				GridObj.SetColCellSort('MTO_MTS','descending');
				flag_MTO_MTS++;
			}
			else if(flag_MTO_MTS =='2'){
				
				GridObj.SetColCellSort('MTO_MTS','asceding');
				
				flag_MTO_MTS--;	
				
			}
		}	
		if(strColumnKey == 'EX_NATION') {
			
			if(flag_EX_NATION =='1'){
			
				GridObj.SetColCellSort('EX_NATION','descending');
				flag_EX_NATION++;
			}
			else if(flag_EX_NATION =='2'){
				
				GridObj.SetColCellSort('EX_NATION','asceding');
				
				flag_EX_NATION--;	
				
			}
		}	
		
	}
	
	GridSetMerge();
		
}

function GridGYR(){
	
	var rowcount = GridObj.GetRowCount();
	
	for (var i =0; i < rowcount; i ++){
		
		var gyr 		= GridObj.GetCellValue('GYR',i);
		var prod_term 	= GridObj.GetCellValue('PROD_TERM',i);
		
		
		if (gyr == "R") GridObj.SetRowBgColor(i,'255|240|240');
		if (gyr == "Y") {
			
			 GridObj.SetRowBgColor(i,'255|255|144');
			 
		}
		if (prod_term == "20") {
		
			 GridObj.SetRowBgColor(i,'255|255|144');
			 
		}
		
	}
}

function GridSetMerge(){	
				
		GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME,SPEC');
      	GridObj.AddSummaryBar('SUMMARY1', '模啗', 'SALES_CAT03', 'sum', 'BASE_STOCK,DONGU_STOCK,DONGU_STOCK_NEW,DSJ_STOCK,PS_STOCK,GITA_STOCK,SALES_CUR,SALES_SUM,STOCK_EXPT,PRE_CHGO,MI_CHGO,WEEK_STOCK,CHGO_PLAN,' +
      			'BK_ORDER,PROD_PLAN,AVL_STOCK,CHGO_PLAN2,BK2_ORDER,PROD_PLAN2,AVL_STOCK2,CHGO_PLAN3,CY_STOCK,MI_ORDER,RECEIPT_EXPT,RECEIPT_EXPT_SUM,M_1,M_2,M_3,M_4,M_5,M_6'); 
     	 	
	   	GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'BASE_STOCK,DONGU_STOCK,DONGU_STOCK_NEW,DSJ_STOCK,PS_STOCK,GITA_STOCK,SALES_CUR,SALES_SUM,STOCK_EXPT,PRE_CHGO,MI_CHGO,WEEK_STOCK,CHGO_PLAN,' +
      			'BK_ORDER,PROD_PLAN,AVL_STOCK,CHGO_PLAN2,BK2_ORDER,PROD_PLAN2,AVL_STOCK2,CHGO_PLAN3,CY_STOCK,MI_ORDER,RECEIPT_EXPT,RECEIPT_EXPT_SUM,M_1,M_2,M_3,M_4,M_5,M_6'); 
        
    	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//喬儀

}


