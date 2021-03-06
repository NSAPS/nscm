//## Щ煎斜極ID      : ip_01110_Baeksansu_Stock_Trace.js
//## Щ煎斜極貲      : 寥骯熱 營堅蹺瞳 褻��
//## 滲唳濠濠        : 檜鬼遵
//## 偃嫦橾濠        : 2015-01-07 
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2014-01-07	檜鬼遵		褐敘
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01110_Baeksansu_Stock_Trace';

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

	//GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);  	
	//GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	
		GridObj.AddHeader("CNFM_DATE"	,"橾濠"		   ,"t_text" 	   ,100	    ,65     ,false); //0
		GridObj.AddHeader("GUBN"		,"掘碟"		   ,"t_text" 	   ,100	    ,0      ,false); //0
		GridObj.AddHeader("ITEM_ID"  	,"ヶ跡囀萄"	   ,"t_text"       ,100		,70     ,false); //0
		GridObj.AddHeader("ITEM_NAME"   ,"ヶ跡貲"	   ,"t_text"       ,100		,140    ,false); //0
		
		//檜紫寥ж(翱滲) ж嬪斜瑜
		GridObj.AddHeader("STOCK_00"	,"晦蟾營堅"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_00"     ,"儅骯榆"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_IN" 	,"頂熱轎堅" 	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_00" 	,"渠溼轎堅" 	   ,"t_number"     ,100.3   ,65     ,false); //0
		//渠溼 ж嬪斜瑜
		GridObj.AddHeader("STOCK_01"	,"晦蟾營堅"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_01"     ,"殮堅榆"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_01" 	,"轎堅榆"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//ゎ鷗睡舒
		GridObj.AddHeader("STOCK_02"	,"晦蟾營堅"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_02"     ,"殮堅榆"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_02" 	,"轎堅榆"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//睡骯睡舒
		GridObj.AddHeader("STOCK_03"	,"晦蟾營堅"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_03"     ,"殮堅榆"	   ,"t_number"     ,100.3   ,65    ,false); //0
		GridObj.AddHeader("ISSUE_03" 	,"轎堅榆"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//堯褕
		GridObj.AddHeader("STOCK_04"	,"晦蟾營堅"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_04"     ,"殮堅榆"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_04" 	,"っ衙榆"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//м啗
		GridObj.AddHeader("STOCK_05"	,"晦蟾營堅"	   ,"t_number"	   ,100.3	,0     ,false); //0
		GridObj.AddHeader("PROD_05"     ,"殮堅榆"	   ,"t_number"     ,100.3   ,0     ,false); //0
		GridObj.AddHeader("ISSUE_05" 	,"殮堅榆"	   ,"t_number"     ,100.3   ,0     ,false); //0
		
		
		
			/* 檜醞 п渦 蹺陛 */
		GridObj.AddGroup	("HD0",     "檜紫寥ж(翱滲)");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		GridObj.AppendHeader("HD0", 	"STOCK_00");
		GridObj.AppendHeader("HD0",     "PROD_00");
		GridObj.AppendHeader("HD0",     "ISSUE_IN");
		GridObj.AppendHeader("HD0",     "ISSUE_00");		
		
		GridObj.AddGroup	("HD1",     "渠溼");			
		GridObj.AppendHeader("HD1", 	"STOCK_01");
		GridObj.AppendHeader("HD1",     "PROD_01");
		GridObj.AppendHeader("HD1",     "ISSUE_01");
		
		GridObj.AddGroup	("HD2",     "ゎ鷗");			
		GridObj.AppendHeader("HD2", 	"STOCK_02");
		GridObj.AppendHeader("HD2",     "PROD_02");
		GridObj.AppendHeader("HD2",     "ISSUE_02");
		
		GridObj.AddGroup	("HD3",     "睡骯");			
		GridObj.AppendHeader("HD3", 	"STOCK_03");
		GridObj.AppendHeader("HD3",     "PROD_03");
		GridObj.AppendHeader("HD3",     "ISSUE_03");
		
		GridObj.AddGroup	("HD4",     "堯褕");			
		GridObj.AppendHeader("HD4", 	"STOCK_04");
		GridObj.AppendHeader("HD4",     "PROD_04");
		GridObj.AppendHeader("HD4",     "ISSUE_04");
		
		GridObj.AddGroup	("HD5",     "м啗");			
		GridObj.AppendHeader("HD5", 	"STOCK_05");
		GridObj.AppendHeader("HD5",     "PROD_05");
		GridObj.AppendHeader("HD5",     "ISSUE_05");
	
		GridObj.BoundHeader();	
		
		GridObj.SetColCellAlign('CNFM_DATE',     'center');
		GridObj.SetColCellAlign('GUBN',     	 'center');
		GridObj.SetColCellAlign('ITEM_ID',    	 'left');
		GridObj.SetColCellAlign('ITEM_NAME',     'left');
		
		GridObj.SetColCellAlign('STOCK_00',     'right');
		GridObj.SetColCellAlign('PROD_00',      'right');
		GridObj.SetColCellAlign('ISSUE_IN',     'right');
		GridObj.SetColCellAlign('ISSUE_00',     'right');
		GridObj.SetColCellAlign('STOCK_01',     'right');
		GridObj.SetColCellAlign('PROD_01',      'right');
		GridObj.SetColCellAlign('ISSUE_01',     'right');
		GridObj.SetColCellAlign('STOCK_02',     'right');
		GridObj.SetColCellAlign('PROD_02',      'right');
		GridObj.SetColCellAlign('ISSUE_02',     'right');
		GridObj.SetColCellAlign('STOCK_03',     'right');
		GridObj.SetColCellAlign('PROD_03',      'right');
		GridObj.SetColCellAlign('ISSUE_03',     'right');
		GridObj.SetColCellAlign('STOCK_04',     'right');
		GridObj.SetColCellAlign('PROD_04',      'right');
		GridObj.SetColCellAlign('ISSUE_04',     'right');
		GridObj.SetColCellAlign('STOCK_05',     'right');
		GridObj.SetColCellAlign('PROD_05',      'right');
		GridObj.SetColCellAlign('ISSUE_05',     'right');
		
		GridObj.SetNumberFormat("STOCK_00",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_00",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_IN",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_00",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_01",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_01",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_01",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_02",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_02",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_02",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_03",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_03",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_03",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_04",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_04",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_04",    	"###,###.#");
		GridObj.SetNumberFormat("STOCK_05",    	"###,###.#");
		GridObj.SetNumberFormat("PROD_05",    	"###,###.#");
		GridObj.SetNumberFormat("ISSUE_05",    	"###,###.#");
		
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() {
	
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';

	 if(mode == "search") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj.GetStatus() == "true") 
            {    
            	    
            GridObj.SetGroupMerge('CNFM_DATE'); 
            //GridObj.AddSummaryBar('SUMMARY', '模啗', 'CNFM_DATE', 'sum', 'STOCK_00,PROD_00,ISSUE_IN,ISSUE_00,STOCK_01,PROD_01,ISSUE_01');     
    		GridObj.AddSummaryBar('SUMMARY_ALL', 'м啗', 'summaryall', 'sum', 'PROD_00,ISSUE_IN,ISSUE_00,PROD_01,ISSUE_01,PROD_02,ISSUE_02,'+
    		'PROD_03,ISSUE_03,PROD_04,ISSUE_04,PROD_05,ISSUE_05');
    		//GridObj.SetSummaryBarColor('SUMMARY','0|153|0', color_tot); 
         	GridObj.SetSummaryBarColor('SUMMARY_ALL','0|153|0', color_tot); 
         	
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
  function GoSearch(service){
  	
//    var insel_prty	    = document.all.insel_prty.value;
//    var in_item_id	    = document.all.in_item_id.value;
//    var in_item_name	= document.all.in_item_name.value;
//    var sel_gubn 	    = document.frm.sel_gubn.value;
    
//	GridObj = document.WiseGrid;
//	GridObj.ClearGrid();
//	setHeader(GridObj);    
	
    doQuery();
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
 
   
// 等檜攪 盪濰
function GoSave  (service) {

//   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//    
//	GridObj.SetParam("mode", "save");
//	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id
//
//	GridObj.DoQuery(servlet_url, "CRUD");
//	GridObj.DoQuery(servlet_url, "CRUD");
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	// user_id
	
//	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {

       var start_date	    = document.all.start_date.value.replace(/-/g,"");   
       var end_date	        = document.all.end_date.value.replace(/-/g,"");  
       var search_item	    = document.all.search_item.value;
      
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",            		"search");
       GridObj.SetParam("start_date",     		start_date);
       GridObj.SetParam("end_date",      		end_date);
        GridObj.SetParam("search_item",      	search_item);

	   GridObj.DoQuery(servlet_url);       
   }


function GridCellClick(){ //偃羹陛 橈棻朝 螃盟 п唸 掘僥(Service.do)
	
}

