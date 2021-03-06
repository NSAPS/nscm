//## Щ煎斜極ID      : ip_01120_Jgc_inventoryPlanAnalysis_summaryReport_new.js
//## Щ煎斜極貲      : 濰晦羹�� 蕨鼻 ヶ跡 蹂擒 溯んお(褐敘)
//## 偃嫦濠          : 檜鬼遵
//## 偃嫦橾濠        : 2015-01-30 �倍靺�
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-01-30	檜鬼遵		CREATE
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01120_Jgc_inventoryPlanAnalysis_summaryReport_new2';

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
	doQuery();
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

	
	GridObj.AddHeader("DIVISION"	       ,"ぜ掘碟"	    			,"t_text"      ,100	    ,100    ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"濠營斜瑜"				,"t_text"	   ,100	    ,90     ,false); //0
 	GridObj.AddHeader("STOCK"	           ,"濰晦羹�苒n嫦儅營堅"		,"t_number"    ,100.3	,80     ,false); //0   
 	GridObj.AddHeader("SALES_PRE"	       ,"瞪橾啗"	       			,"t_number"    ,100.3	,80   	,false); //0
 	GridObj.AddHeader("ISSUE"	    	   ,"橾啗"	    			,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("SELL_BOX_CUM"	   ,"援啗"	    			,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("REMAIN_STOCK"	   ,"濰晦羹�苒n濤罹營堅" 	 	,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("SELL_RATE"  		   ,"營堅模霞徽"				,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("EXPECT_STOCK"  	   ,"嶸鱔晦и\n唳婁蕨鼻熱榆"	,"t_number"    ,100.3	,90     ,false); //0
 	

	GridObj.BoundHeader();	

	GridObj.SetColCellAlign('DIVISION',       'center'); //蹺陛 : 2014-05-14
    GridObj.SetColCellAlign('SALES_CAT03',    'left');
    GridObj.SetColCellAlign('STOCK',       	  'right'); 
    GridObj.SetColCellAlign('SALES_PRE',      'right');
    GridObj.SetColCellAlign('ISSUE',          'right');
    GridObj.SetColCellAlign('SELL_BOX_CUM',   'right');
    GridObj.SetColCellAlign('REMAIN_STOCK',   'right');
    GridObj.SetColCellAlign('SELL_RATE',      'right');
    GridObj.SetColCellAlign('EXPECT_STOCK',   'right');
  
    GridObj.SetNumberFormat("STOCK",       		"###,###.#");
	GridObj.SetNumberFormat("SALES_PRE",    	"###,###.#");
	GridObj.SetNumberFormat("ISSUE",       		"###,###.#");
	GridObj.SetNumberFormat("SELL_BOX_CUM",     "###,###.#");
	GridObj.SetNumberFormat("REMAIN_STOCK",     "###,###.#");
	GridObj.SetNumberFormat("EXPECT_STOCK",     "###,###.#");
	


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
            	
            		GridSetMerge();
             
            } else    
            { 
            	;
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

   function doQuery(){
   		
   		var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
   	
  		
  	    var start_date = document.frm.start_date.value.replace(/-/g,"");  	    
  	    var gubn		= document.frm.gubn.value;
  	   
  	  
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("gubn",   gubn);
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


function GridSetMerge(){
		
		var rowCount = GridObj.GetRowCount();		
		if (rowCount == 0) return;
				
		GridObj.SetGroupMerge('DIVISION');
        GridObj.AddSummaryBar('SUMMARY1', '模啗', 'DIVISION', 'custom', 'STOCK,SALES_PRE,ISSUE,SELL_BOX_CUM,REMAIN_STOCK,SELL_RATE,EXPECT_STOCK'); 
         	   
         	   /* custom 模啗縑 渠п 陝 鏽歲滌煎 雖薑 - SUMMARY1 */
         	   
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','STOCK');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SALES_PRE');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','ISSUE');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SELL_BOX_CUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','REMAIN_STOCK');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','EXPECT_STOCK');
         	   
         	    
         	    //GridObj.SetSummaryBarFunction('SUMMARY1','average','SELL_RATE');   
         	    //GridObj.SetSummaryBarFunction('SUMMARY1','average','TERM_VAL');   
         	    
         	    var rowcount = GridObj.GetMergeCount('DIVISION');   //模啗 檣策蝶 掘ж晦
         	    for (var i=0; i<rowcount; i++){
         	    	
         	   	var SELL_BOX_CUM 		 = GridObj.GetSummaryBarValue('SUMMARY1','SELL_BOX_CUM',i,true).replace(/,/g,"");
         	    var STOCK = GridObj.GetSummaryBarValue('SUMMARY1','STOCK',i,true).replace(/,/g,"");         	    	
         	    	
         	    	/* 餌辨濠 雖薑 啗骯衝 蹺陛 - 營堅模霞徽 = 援啗/嫦儅營堅 */
         	    	GridObj.SetSummaryBarValue('SUMMARY1','SELL_RATE',i, Math.round((SELL_BOX_CUM/STOCK)*1000)/10 );
         	    	
          	    }
         	     
         	  	      	 	
	      	 	/* custom 模啗縑 渠п 陝 鏽歲滌煎 雖薑 - SUMMARY3 */
	      	 	
	      	 	GridObj.AddSummaryBar('SUMMARY3', 'м啗', 'summaryall','custom','STOCK,SALES_PRE,ISSUE,SELL_BOX_CUM,REMAIN_STOCK,SELL_RATE,EXPECT_STOCK');
    	        
    	        GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK');
    	        GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_PRE');
    	        GridObj.SetSummaryBarFunction('SUMMARY3','sum','ISSUE');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SELL_BOX_CUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','REMAIN_STOCK');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','EXPECT_STOCK');
         	
         	   	var SELL_BOX_CUM 		 = GridObj.GetSummaryBarValue('SUMMARY3','SELL_BOX_CUM',i,true).replace(/,/g,"");
         	    var STOCK = GridObj.GetSummaryBarValue('SUMMARY3','STOCK',i,true).replace(/,/g,"");
        	    	
        	   
         	    GridObj.SetSummaryBarValue('SUMMARY3','SELL_RATE',i, Math.round((SELL_BOX_CUM/STOCK)*1000)/10 );
    	        
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
				GridObj.SetSummaryBarColor('SUMMARY3', '0|153|0', '152|251|152');
				 
}

