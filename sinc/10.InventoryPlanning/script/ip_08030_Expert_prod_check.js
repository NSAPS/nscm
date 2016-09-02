//## ÇÁ·Î±×·¥ID		: ip_08030_Expert_prod_check.js
//## ÇÁ·Î±×·¥¸í		: »ý»ê°èÈ¹ °ËÁõ
//## º¯°æÀÚ			: ÀÌ°­¿í
//## °³¹ßÀÏÀÚ			: 2016-03-25
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_08.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_08.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_08030_Expert_prod_check';

var GridObj ; 									// WiseGrid °´Ã¼
var color_tot 		 = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';			//¶óÀÎ ¼±ÅÃ ¹è°æ»ö 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
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

	GridObj.bRowSelectorIndex = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.

    GridObj.nHDLineSize         = 10; //Header Size
    //GridObj.bHDMoving = true;		// ÄÃ·³ Çì´õ À§Ä¡ ÀÌµ¿
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;   
   
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; 	//Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj.strActiveRowBgColor    = "232|245|213";     //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj.strHDClickAction 	   = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj.strMouseWheelAction	   = 'page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;		
       
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {        
	
	GridObj.AddHeader("ROWNUM"	   		,"¼ø¼­"  			,"t_number"     ,100.3		,40     ,false); //0   
	GridObj.AddHeader("SALES_CAT03"		,"Ç°Á¾"				,"t_text" 	    ,100	    ,100     ,false); //0	
 	GridObj.AddHeader("ITEM_ID"	    	,"Á¦Ç°ÄÚµå"			,"t_text" 	   	,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"Á¦Ç°¸í"	        	,"t_text" 	   	,100	    ,220    ,false); //0 
 	GridObj.AddHeader("MTO_MTS"			,"±¸ºÐ"	        	,"t_text" 	   	,100	    ,70    ,false); //0 
 	GridObj.AddHeader("AVL_STOCK"		,"Â÷ÁÖ °¡¿ëÀç°í"	    ,"t_number"  	,100.3		,100    ,false); //0	
 	GridObj.AddHeader("ORDER_BOX"		,"ÁÖ¹®·®"	    		,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("SAFE_QTY"		,"¾ÈÀüÀç°í"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("NEED_QTY"		,"»ý»êÇÊ¿ä·®"	    	,"t_number"  	,100.3		,80    ,false); //0  	
 	GridObj.AddHeader("PLAN_QTY"		,"Â÷ÁÖ »ý»ê°èÈ¹\nÈ®Á¤·®"	,"t_number"  	,100.3		,100    ,true); //0
 	GridObj.AddHeader("TOT_PLAN"		,"»ý»ê°èÈ¹·®"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TOT_PROD"		,"»ý»ê½ÇÀû"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TOT_GAP"			,"Â÷ÀÌ·®"				,"t_number"  	,100.3		,80    ,false); //0	
 	GridObj.AddHeader("MON_PLAN"		,"»ý»ê°èÈ¹·®"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("MON_PROD"		,"»ý»ê½ÇÀû"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("MON_GAP"			,"Â÷ÀÌ·®"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TUE_PLAN"		,"»ý»ê°èÈ¹·®"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TUE_PROD"		,"»ý»ê½ÇÀû"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TUE_GAP"			,"Â÷ÀÌ·®"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("WED_PLAN"		,"»ý»ê°èÈ¹·®"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("WED_PROD"		,"»ý»ê½ÇÀû"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("WED_GAP"			,"Â÷ÀÌ·®"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("THR_PLAN"		,"»ý»ê°èÈ¹·®"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("THR_PROD"		,"»ý»ê½ÇÀû"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("THR_GAP"			,"Â÷ÀÌ·®"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("FRI_PLAN"		,"»ý»ê°èÈ¹·®"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("FRI_PROD"		,"»ý»ê½ÇÀû"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("FRI_GAP"			,"Â÷ÀÌ·®"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("SAT_PLAN"		,"»ý»ê°èÈ¹·®"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("SAT_PROD"		,"»ý»ê½ÇÀû"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("SAT_GAP"			,"Â÷ÀÌ·®"				,"t_number"  	,100.3		,80    ,false); //0
 
	
	GridObj.AddGroup	("MON",		"¿ù¿äÀÏ");
 	GridObj.AppendHeader("MON", 	"MON_PLAN");
 	GridObj.AppendHeader("MON", 	"MON_PROD");
	GridObj.AppendHeader("MON", 	"MON_GAP");
	GridObj.AddGroup	("TUE",		"È­¿äÀÏ");
 	GridObj.AppendHeader("TUE", 	"TUE_PLAN");
 	GridObj.AppendHeader("TUE", 	"TUE_PROD");
	GridObj.AppendHeader("TUE", 	"TUE_GAP");
	GridObj.AddGroup	("WED",		"¼ö¿äÀÏ");
 	GridObj.AppendHeader("WED", 	"WED_PLAN");
 	GridObj.AppendHeader("WED", 	"WED_PROD");
	GridObj.AppendHeader("WED", 	"WED_GAP");
	GridObj.AddGroup	("THR",		"¸ñ¿äÀÏ");
 	GridObj.AppendHeader("THR", 	"THR_PLAN");
 	GridObj.AppendHeader("THR", 	"THR_PROD");
	GridObj.AppendHeader("THR", 	"THR_GAP");
	GridObj.AddGroup	("FRI",		"±Ý¿äÀÏ");
 	GridObj.AppendHeader("FRI", 	"FRI_PLAN");
 	GridObj.AppendHeader("FRI", 	"FRI_PROD");
	GridObj.AppendHeader("FRI", 	"FRI_GAP");
	GridObj.AddGroup	("SAT",		"Åä¿äÀÏ");
 	GridObj.AppendHeader("SAT", 	"SAT_PLAN");
 	GridObj.AppendHeader("SAT", 	"SAT_PROD");
	GridObj.AppendHeader("SAT", 	"SAT_GAP");
	GridObj.AddGroup	("TOT",		"°è");
 	GridObj.AppendHeader("TOT", 	"TOT_PLAN");
 	GridObj.AppendHeader("TOT", 	"TOT_PROD");
	GridObj.AppendHeader("TOT", 	"TOT_GAP");
	
	GridObj.BoundHeader();	

	GridObj.SetColFix('MTO_MTS'); 	
	
	GridObj.SetColCellAlign('SALES_CAT03',  	'left'); 
	GridObj.SetColCellAlign('ITEM_ID',  		'center');
	GridObj.SetColCellAlign('MTO_MTS',        	 'center');
	GridObj.SetColCellAlign('ROWNUM',        	 'center');
	GridObj.SetColCellBgColor('ROWNUM','255|255|200');
	GridObj.SetNumberFormat("ORDER_BOX",       		"###,###.#");
    GridObj.SetNumberFormat("AVL_STOCK",       		"###,###.#");
    GridObj.SetNumberFormat("SAFE_QTY",     		"###,###.#");
    GridObj.SetNumberFormat("NEED_QTY",     		"###,###.#");
    GridObj.SetNumberFormat("MON_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("MON_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("MON_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("TUE_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("TUE_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("TUE_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("WED_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("WED_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("WED_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("THR_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("THR_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("THR_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("FRI_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("FRI_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("FRI_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("SAT_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("SAT_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("SAT_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("TOT_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("TOT_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("TOT_GAP",     			"###,###.#");
 	GridObj.SetNumberFormat("PLAN_QTY",     		"###,###.#");
}
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() 
{
	
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';
      
    if(endMode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
    {
        if(GridObj.GetStatus() == "true") 
        {        
        	
        	var row = GridObj.GetRowCount();            	
        	if (row == 0) return;
        	
        	GridSetColor();
        	GridSetMerge();        
        	
         
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
function GoSearch(service) 
{
    doQuery();
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇÏºÎ ±×¸®µå Á¶È¸ WD1 ´õºíÅ¬¸¯
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave(service) {	

	doSave();	
	
};

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() 
{
   var cnfm_date	    = document.frm.cnfm_date.value;
   cnfm_date 			= cnfm_date.replace(/-/g,"");
   var mto_gubn	    	= document.frm.mto_gubn.value;
   var domain			= document.frm.domain.value;    
   var search_item		= document.frm.search_item.value;	
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;

   //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("cnfm_date",   		cnfm_date);
   GridObj.SetParam("mto_gubn",   		mto_gubn);
   GridObj.SetParam("domain",   		domain);	
   GridObj.SetParam("search_item",		search_item);	
   GridObj.DoQuery(servlet_url);       
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ´õºí Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellDblClick(strColumnKey, nRow) {
	
	var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
	var cnfm_date	= document.frm.cnfm_date.value;
	cnfm_date 			= cnfm_date.replace(/-/g,"");
	
	if(strColumnKey == 'ITEM_NAME'){		
		
		var service_url = "service.do?_moon_service=ip_08020_Expert_Order_list_pop";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date ;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=1135, height=440, top=50, left=200";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
	}

}

function GridSetColor(){
	
	var rowcount = GridObj.GetRowCount();
	for (var i =0; i <rowcount; i++){
		
		var plan_qty = GridObj.GetCellValue('PLAN_QTY',i);
		var tot_plan = GridObj.GetCellValue('TOT_PLAN',i);
		if( plan_qty !== tot_plan) GridObj.SetCellBgColor('ITEM_ID', i , '255|54|54');
	
		var mon_qty	 = GridObj.GetCellValue('MON_GAP',i);
		var tue_qty	 = GridObj.GetCellValue('TUE_GAP',i);
		var wed_qty	 = GridObj.GetCellValue('WED_GAP',i);
		var thr_qty	 = GridObj.GetCellValue('THR_GAP',i);
		var fri_qty	 = GridObj.GetCellValue('FRI_GAP',i);
		var sat_qty	 = GridObj.GetCellValue('SAT_GAP',i);
		var tot_qty	 = GridObj.GetCellValue('TOT_GAP',i);
		
		if( mon_qty < 0) GridObj.SetCellFgColor('MON_GAP', i , '255|54|54');
		if( tue_qty < 0) GridObj.SetCellFgColor('TUE_GAP', i , '255|54|54');
		if( wed_qty < 0) GridObj.SetCellFgColor('WED_GAP', i , '255|54|54');
		if( thr_qty < 0) GridObj.SetCellFgColor('THR_GAP', i , '255|54|54');
		if( fri_qty < 0) GridObj.SetCellFgColor('FRI_GAP', i , '255|54|54');
		if( sat_qty < 0) GridObj.SetCellFgColor('SAT_GAP', i , '255|54|54');
		if( tot_qty < 0){
			 GridObj.SetCellFgColor('TOT_GAP', i , '255|54|54');
			 
			
		}
	}
}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME');
    GridObj.AddSummaryBar('SUMMARY1', 'Ç°Á¾º° °è', 'SALES_CAT03', 'sum', 'ORDER_BOX,AVL_STOCK,SAFE_QTY,NEED_QTY,PLAN_QTY,MON_PLAN,MON_PROD,MON_GAP,TUE_PLAN,TUE_PROD,TUE_GAP,'
    +'WED_PLAN,WED_PROD,WED_GAP,THR_PLAN,THR_PROD,THR_GAP,FRI_PLAN,FRI_PROD,FRI_GAP,SAT_PLAN,SAT_PROD,SAT_GAP,TOT_PLAN,TOT_PROD,TOT_GAP');
    GridObj.AddSummaryBar('SUMMARY2', 'ÀüÃ¼ °è'	, 'summaryall', 'sum', 'ORDER_BOX,AVL_STOCK,SAFE_QTY,NEED_QTY,PLAN_QTY,MON_PLAN,MON_PROD,MON_GAP,TUE_PLAN,TUE_PROD,TUE_GAP,'
    +'WED_PLAN,WED_PROD,WED_GAP,THR_PLAN,THR_PROD,THR_GAP,FRI_PLAN,FRI_PROD,FRI_GAP,SAT_PLAN,SAT_PROD,SAT_GAP,TOT_PLAN,TOT_PROD,TOT_GAP');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 


}


