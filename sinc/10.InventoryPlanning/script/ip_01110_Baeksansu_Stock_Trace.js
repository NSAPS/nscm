//## ÇÁ·Î±×·¥ID      : ip_01110_Baeksansu_Stock_Trace.js
//## ÇÁ·Î±×·¥¸í      : ¹é»ê¼ö Àç°íÃßÀû Á¶È¸
//## º¯°æÀÚÀÚ        : ÀÌ°­¿í
//## °³¹ßÀÏÀÚ        : 2015-01-07 
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_04.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2014-01-07	ÀÌ°­¿í		½Å±Ô
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_01110_Baeksansu_Stock_Trace';

var GridObj ; 													// WiseGrid °´Ã¼
var color_tot = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö 
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
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
        
        // È­¸é size Ãà¼Ò ½Ã È­¸éÀÌ ³Ê¹« ÀÛ¾Æ ±×¸®µå Å©±â°¡ À½¼ö°¡ µÇ¸é ¿¡·¯°¡ ³ª¹Ç·Î ±× °æ¿ì ¹«Á¶°Ç 1·Î ¼¼ÆÃ 
        // ==> È­¸éÀÌ ´õÀÌ»ó Ãà¼ÒµÇÁö ¾ÊÀ½ 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1;
          
        //tabPage1.style.height = tabHeightValue + "px"; 

        document.WiseGrid.height = tableHeightValue + "px"; 
        //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
    }  

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid ¿ÀºêÁ§Æ®°¡ »ý¼ºµÇ°í ÃÊ±âÈ­µÈ ÈÄ ¹ß»ýÇÏ´Â 							¦¢
  ¦¢JavaScript EventÀÎ Initialize()¸¦ ¹Þ¾Æ ±×¸®µåÀÇ Çì´õ¸¦ ¼ÂÆÃÇÑ´Ù.			¦¢
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	setHeader(GridObj);  	//ÇØ´õ»ý¼º 
	setDefault();        	//È­¸é ±âº» ¼³Á¤ 
}   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
    GridObj.nHDLineSize         = 10; //Header Size
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;   
   
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj.strHDClickAction = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {        

	//GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);  	
	//GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	
		GridObj.AddHeader("CNFM_DATE"	,"ÀÏÀÚ"		   ,"t_text" 	   ,100	    ,65     ,false); //0
		GridObj.AddHeader("GUBN"		,"±¸ºÐ"		   ,"t_text" 	   ,100	    ,0      ,false); //0
		GridObj.AddHeader("ITEM_ID"  	,"Ç°¸ñÄÚµå"	   ,"t_text"       ,100		,70     ,false); //0
		GridObj.AddHeader("ITEM_NAME"   ,"Ç°¸ñ¸í"	   ,"t_text"       ,100		,140    ,false); //0
		
		//ÀÌµµ¹éÇÏ(¿¬º¯) ÇÏÀ§±×·ì
		GridObj.AddHeader("STOCK_00"	,"±âÃÊÀç°í"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_00"     ,"»ý»ê·®"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_IN" 	,"³»¼öÃâ°í" 	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_00" 	,"´ë·ÃÃâ°í" 	   ,"t_number"     ,100.3   ,65     ,false); //0
		//´ë·Ã ÇÏÀ§±×·ì
		GridObj.AddHeader("STOCK_01"	,"±âÃÊÀç°í"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_01"     ,"ÀÔ°í·®"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_01" 	,"Ãâ°í·®"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//ÆòÅÃºÎµÎ
		GridObj.AddHeader("STOCK_02"	,"±âÃÊÀç°í"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_02"     ,"ÀÔ°í·®"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_02" 	,"Ãâ°í·®"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//ºÎ»êºÎµÎ
		GridObj.AddHeader("STOCK_03"	,"±âÃÊÀç°í"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_03"     ,"ÀÔ°í·®"	   ,"t_number"     ,100.3   ,65    ,false); //0
		GridObj.AddHeader("ISSUE_03" 	,"Ãâ°í·®"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//³ó½É
		GridObj.AddHeader("STOCK_04"	,"±âÃÊÀç°í"	   ,"t_number"	   ,100.3	,65     ,false); //0
		GridObj.AddHeader("PROD_04"     ,"ÀÔ°í·®"	   ,"t_number"     ,100.3   ,65     ,false); //0
		GridObj.AddHeader("ISSUE_04" 	,"ÆÇ¸Å·®"	   ,"t_number"     ,100.3   ,65     ,false); //0
		//ÇÕ°è
		GridObj.AddHeader("STOCK_05"	,"±âÃÊÀç°í"	   ,"t_number"	   ,100.3	,0     ,false); //0
		GridObj.AddHeader("PROD_05"     ,"ÀÔ°í·®"	   ,"t_number"     ,100.3   ,0     ,false); //0
		GridObj.AddHeader("ISSUE_05" 	,"ÀÔ°í·®"	   ,"t_number"     ,100.3   ,0     ,false); //0
		
		
		
			/* ÀÌÁß ÇØ´õ Ãß°¡ */
		GridObj.AddGroup	("HD0",     "ÀÌµµ¹éÇÏ(¿¬º¯)");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
		GridObj.AppendHeader("HD0", 	"STOCK_00");
		GridObj.AppendHeader("HD0",     "PROD_00");
		GridObj.AppendHeader("HD0",     "ISSUE_IN");
		GridObj.AppendHeader("HD0",     "ISSUE_00");		
		
		GridObj.AddGroup	("HD1",     "´ë·Ã");			
		GridObj.AppendHeader("HD1", 	"STOCK_01");
		GridObj.AppendHeader("HD1",     "PROD_01");
		GridObj.AppendHeader("HD1",     "ISSUE_01");
		
		GridObj.AddGroup	("HD2",     "ÆòÅÃ");			
		GridObj.AppendHeader("HD2", 	"STOCK_02");
		GridObj.AppendHeader("HD2",     "PROD_02");
		GridObj.AppendHeader("HD2",     "ISSUE_02");
		
		GridObj.AddGroup	("HD3",     "ºÎ»ê");			
		GridObj.AppendHeader("HD3", 	"STOCK_03");
		GridObj.AppendHeader("HD3",     "PROD_03");
		GridObj.AppendHeader("HD3",     "ISSUE_03");
		
		GridObj.AddGroup	("HD4",     "³ó½É");			
		GridObj.AppendHeader("HD4", 	"STOCK_04");
		GridObj.AppendHeader("HD4",     "PROD_04");
		GridObj.AppendHeader("HD4",     "ISSUE_04");
		
		GridObj.AddGroup	("HD5",     "ÇÕ°è");			
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
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() {
	
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';

	 if(mode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
        {
            if(GridObj.GetStatus() == "true") 
            {    
            	    
            GridObj.SetGroupMerge('CNFM_DATE'); 
            //GridObj.AddSummaryBar('SUMMARY', '¼Ò°è', 'CNFM_DATE', 'sum', 'STOCK_00,PROD_00,ISSUE_IN,ISSUE_00,STOCK_01,PROD_01,ISSUE_01');     
    		GridObj.AddSummaryBar('SUMMARY_ALL', 'ÇÕ°è', 'summaryall', 'sum', 'PROD_00,ISSUE_IN,ISSUE_00,PROD_01,ISSUE_01,PROD_02,ISSUE_02,'+
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


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
               
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
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
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇÏºÎ ±×¸®µå Á¶È¸ WD1 ´õºíÅ¬¸¯
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
 
   
// µ¥ÀÌÅÍ ÀúÀå
function GoSave  (service) {

//   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//    
//	GridObj.SetParam("mode", "save");
//	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id
//
//	GridObj.DoQuery(servlet_url, "CRUD");
//	GridObj.DoQuery(servlet_url, "CRUD");
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	// user_id
	
//	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.

}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {

       var start_date	    = document.all.start_date.value.replace(/-/g,"");   
       var end_date	        = document.all.end_date.value.replace(/-/g,"");  
       var search_item	    = document.all.search_item.value;
      
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",            		"search");
       GridObj.SetParam("start_date",     		start_date);
       GridObj.SetParam("end_date",      		end_date);
        GridObj.SetParam("search_item",      	search_item);

	   GridObj.DoQuery(servlet_url);       
   }


function GridCellClick(){ //°³Ã¼°¡ ¾ø´Ù´Â ¿À·ù ÇØ°á ±¸¹®(Service.do)
	
}

