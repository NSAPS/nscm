//## ÇÁ·Î±×·¥ID		: ip_03070_Ex_Order_Cur.js
//## ÇÁ·Î±×·¥¸í		: Á¤±â¹ßÁÖ°èÈ¹(¿ä¾à)
//## º¯°æÀÚ			: ÀÌ°­¿í
//## °³¹ßÀÏÀÚ			: 2016-08-22
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
var job_id = 'ip_03070_Ex_Order_Cur';

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
	
	
	GridObj.AddHeader("SELECTED"		,""   				,"t_checkbox"	,2			,0  	,true); //0
	GridObj.AddHeader("SALES_CAT03"	    ,"Ç°Á¾"				,"t_text" 	   	,100	    ,70     ,false); //0 
 	GridObj.AddHeader("ITEM_ID"	    	,"Á¦Ç°ÄÚµå"			,"t_text" 	   	,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"Á¦Ç°¸í"	        	,"t_text" 	   	,100	    ,240    ,false); //0 	
 	GridObj.AddHeader("LEADTIME"		,"¸®µåÅ¸ÀÓ"			,"t_text"  		,100		,60    	,false); //0 	
 	GridObj.AddHeader("PRE_MONTH_SELL"	,"Àü¿ù\nÆÇ¸Å·®"	    ,"t_number"  	,100.3		,70    	,false); //0
 
 	GridObj.AddHeader("M_0"				,"M"	    		,"t_number"  	,100.3		,70    	,true); //0 	
 	GridObj.AddHeader("M_1"				,"M+1"	    		,"t_number"  	,100.3		,70    	,true); //0
 	GridObj.AddHeader("M_2"				,"M+2"	    		,"t_number"  	,100.3		,70    	,true); //0
 	GridObj.AddHeader("M_3"				,"M+3"	    		,"t_number"  	,100.3		,70    	,true); //0 	
 	GridObj.AddHeader("EXPT_QTY"		,"ÃÑ ÆÇ¸Å\n¿¹»ó¼ö·®"	,"t_number"  	,100.3		,70    	,true); //0 	
 	GridObj.AddHeader("SAFE_QTY"		,"¾ÈÀüÀç°í"	    	,"t_number"  	,100.3		,70    ,true); //0
 	GridObj.AddHeader("EVENT_QTY"	   	,"Event¹°·®"			,"t_number"  	,100.3		,70    ,true); //0
 	GridObj.AddHeader("TOTAL_NEED"		,"ÃÑ °ø±Þ\nÇÊ¿ä·®"	    ,"t_number"  	,100.3		,70    ,false); //0
 	GridObj.AddHeader("AVL_MONTH"	   	,"ÆÇ¸Å°¡´É\n¿ù¼ö"		,"t_number"  	,100.3		,70    ,false); //0
 	
 	GridObj.AddHeader("BASE_STOCK"	   	,"¿ùÃÊ\n±âÃÊÀç°í"		,"t_number"  	,100.3		,70    ,false); //0	
	GridObj.AddHeader("RECEIPT_EXPT"	,"¼öÀÔ¿¹Á¤·®"			,"t_number"  	,100.3		,70    ,false); //0

	GridObj.AddHeader("TOTAL_QTY"		,"ÃÑ °ø±Þ\n°¡´É·®"		,"t_number"  	,100.3		,70   ,false); //0
	GridObj.AddHeader("PRO_MONTH"		,"°ø±Þ°¡´É\n¿ù¼ö"		,"t_number"  	,100.3		,70   ,false); //0
 	GridObj.AddHeader("NEED_QTY"		,"ÇÊ¿ä ¹ßÁÖ·®"			,"t_number"  	,100.3		,70   ,false); //0
 	GridObj.AddHeader("ORDER_QTY"		,"ÃÖÁ¾ ¹ßÁÖ·®"			,"t_number"  	,100.3		,70   ,true); //0
 	
	GridObj.AddGroup	("SALES_ACT",	"¿ùº°ÆÇ¸Å ¿¹»ó·®");
 	GridObj.AppendHeader("SALES_ACT", 	"M_0"); 	
 	GridObj.AppendHeader("SALES_ACT", 	"M_1");
 	GridObj.AppendHeader("SALES_ACT", 	"M_2");
 	GridObj.AppendHeader("SALES_ACT", 	"M_3");
 	
 
	
	GridObj.BoundHeader();	

	GridObj.SetColFix('ITEM_NAME'); 	
	
	GridObj.SetColCellAlign('ITEM_ID',  		'center');	
	GridObj.SetColCellAlign('LEADTIME',  		'center');
	
	GridObj.SetNumberFormat("AVL_MONTH",   			"###,###.#");
	GridObj.SetNumberFormat("PRO_MONTH",   			"###,###.#");
	
	GridObj.SetNumberFormat("PRE_MONTH_SELL",       "###,###.#");	
	GridObj.SetNumberFormat("M_0",       			"###,###.#");	
	GridObj.SetNumberFormat("M_1",       			"###,###.#");
	GridObj.SetNumberFormat("M_2",       			"###,###.#");
	GridObj.SetNumberFormat("M_3",       			"###,###.#");
	GridObj.SetNumberFormat("EXPT_QTY",				"###,###.#");
	GridObj.SetNumberFormat("SAFE_QTY",     		"###,###.#");
	GridObj.SetNumberFormat("TOTAL_NEED",   		"###,###.#");
	
	GridObj.SetNumberFormat("EVENT_QTY",    		"###,###.#");
	GridObj.SetNumberFormat("BASE_STOCK",   		"###,###.#");	
	GridObj.SetNumberFormat("RECEIPT_EXPT", 		"###,###.#");
	GridObj.SetNumberFormat("TOTAL_QTY",    		"###,###.#");
	GridObj.SetNumberFormat("NEED_QTY",     		"###,###.#");
	GridObj.SetNumberFormat("ORDER_QTY",    		"###,###.#");
    
    GridObj.SetColCellBgColor('M_0',	'255|255|200');
    GridObj.SetColCellBgColor('M_1',	'255|255|200');
    GridObj.SetColCellBgColor('M_2',	'255|255|200');
    GridObj.SetColCellBgColor('M_3',	'255|255|200');
    GridObj.SetColCellBgColor('SAFE_QTY',	'255|255|200');
    GridObj.SetColCellBgColor('EVENT_QTY',	'255|255|200');
    GridObj.SetColCellBgColor('ORDER_QTY',	'255|255|200');
  
	
	
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
        	
        	//GridSetQty();
        	
        	GridSetFontColor();
        	GridSetMerge();        
        	 
         
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save"){
    	
    	doQuery();
    	
		
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
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() 
{
   var cnfm_date	    = document.frm.cnfm_date.value;
   cnfm_date 			= cnfm_date.replace(/-/g,"");
   var search_type	    = document.frm.search_type.value;		//ºê·£µå À¯Çü
   var sales_cat05		= document.frm.sales_cat05.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
 
   //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
   GridObj.SetParam("mode",           			"search");
   GridObj.SetParam("cnfm_date",   				cnfm_date);
   GridObj.SetParam("search_type",   			search_type);
   GridObj.SetParam("sales_cat05",   			sales_cat05);

   GridObj.DoQuery(servlet_url);       
}


function GoSave(service) {
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	doSave();	
	
};

      
// ÀúÀå
function doSave() { 
 	
	var GridObj 	= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var version		= document.frm.cnfm_date.value.replace(/-/g,"");
	version = version.substr(0,6);
   
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	GridObj.SetParam("version", version);
	
	var rowcount 	= GridObj.GetRowCount();	
	
	for(var i =0; i < rowcount ; i++){
		
		GridObj.SetCellValue("SELECTED",i,1);		

	}	
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.	
	GridObj.DoQuery(servlet_url, "SELECTED");	
 	
 	return;
}    


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ´õºí Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellDblClick(strColumnKey, nRow) {


}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  
	
	
	/* ¿ùº°ÆÇ¸Å ¿¹»ó·® ¼öÁ¤ ½Ã ÃÑÆÇ¸Å ¿¹»ó¼ö·® */
	var	new_val = Number(nNewValue);
	var old_val = Number(nOldValue);
	
	
	
	/*ÃÑ ÆÇ¸Å ¿¹»ó¼ö·® °è»ê */
	var	result  =	Number(GridObj.GetCellValue('M_0',nRow))  + Number(GridObj.GetCellValue('M_1',nRow)) + 
					Number(GridObj.GetCellValue('M_2',nRow)) + Number(GridObj.GetCellValue('M_3',nRow)) ;				

	GridObj.SetCellValue('EXPT_QTY',nRow, result);	
	
	/*ÃÑ °ø±Þ ÇÊ¿ä·® °è»ê */
	var	total  =	Number(GridObj.GetCellValue('EXPT_QTY',nRow))  + Number(GridObj.GetCellValue('SAFE_QTY',nRow)) + Number(GridObj.GetCellValue('EVENT_QTY',nRow));
	
	GridObj.SetCellValue('TOTAL_NEED',nRow, total);	
	
	/*ÆÇ¸Å°¡´É ¿ù¼ö °è»ê */	
	var pre_month_sell 	= Number(GridObj.GetCellValue('PRE_MONTH_SELL',nRow));
	var month 			= Math.round((Number(GridObj.GetCellValue('TOTAL_NEED',nRow))/pre_month_sell)*10)/10;	
	
	GridObj.SetCellValue('AVL_MONTH',nRow, month);		
	
}

//function GridSetQty(){
//	
//	var rowcount = GridObj.GetRowCount();
//	var a = 0;
//	var b = 0;
//	var c = 0;
//	var d = 0;
//	
//	var avl_month = 0;
//	
//	for(var i =0; i < rowcount; i++){
//		
//		a = GridObj.GetCellValue('M_REMAIN',i);
//		b = GridObj.GetCellValue('M_1',i);
//		c = GridObj.GetCellValue('M_2',i);
//		d = GridObj.GetCellValue('M_3',i);
//		f = GridObj.GetCellValue('M_4',i);
//		e = GridObj.GetCellValue('SAFE_QTY',i);
//		
//		var qty 	= Number(a) + Number(b) + Number(c) + Number(d) + Number(f);
//		var mon		= qty /5 ;
//		
//		if (mon === 0) mon = 1;
//		var stock	= Number(GridObj.GetCellValue('RECEIPT_EXPT',i)) 	+ Number(GridObj.GetCellValue('RECEIPT_EXPT2',i)) + Number(GridObj.GetCellValue('RECEIPT_EXPT5',i)) +
//				      Number(GridObj.GetCellValue('RECEIPT_EXPT3',i))	+ Number(GridObj.GetCellValue('RECEIPT_EXPT4',i)) + Number(GridObj.GetCellValue('BASE_STOCK',i));
//		
//		if(i%2 !== 0){
//			
//			 GridObj.SetCellValue('TOTAL_NEED',i,qty);
//			 GridObj.SetCellValue('TOTAL_QTY',i,stock);
//			 
//			 var need = GridObj.GetCellValue('TOTAL_QTY',i) - GridObj.GetCellValue('TOTAL_NEED',i);
//			 if (need > 0) need = 0;
//			 GridObj.SetCellValue('NEED_QTY',i, need );
//			 GridObj.SetCellValue('AVL_MONTH',i,GridObj.GetCellValue('TOTAL_NEED',i)/mon);
//		}
//		
//		
//		
//	}
//}

function GridSetFontColor(){
	
	var rowcount = GridObj.GetRowCount();
	for (var i =0; i <rowcount; i++){
		
		var need_qty = GridObj.GetCellValue('NEED_QTY',i);	
		if( need_qty < 0){
			 GridObj.SetCellFgColor('NEED_QTY', i , '255|54|54');			 
			
		}
	}
}


function GridSetMerge(){	
	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME,LEADTIME');
    GridObj.AddSummaryBar('SUMMARY1', 'Ç°Á¾º° °è', 'SALES_CAT03', 'sum', 'PRE_MONTH_SELL,M_0,M_1,M_2,M_3,EXPT_QTY,SAFE_QTY,EVENT_QTY,TOTAL_NEED,AVL_MONTH,'
    +'BASE_STOCK,RECEIPT_EXPT,TOTAL_QTY,PRO_MONTH,NEED_QTY,ORDER_QTY');
    
    GridObj.AddSummaryBar('SUMMARY2', 'ÀüÃ¼ °è'	, 'summaryall', 'sum', 'PRE_MONTH_SELL,M_0,M_1,M_2,M_3,EXPT_QTY,SAFE_QTY,EVENT_QTY,TOTAL_NEED,AVL_MONTH,'
    +'BASE_STOCK,RECEIPT_EXPT,TOTAL_QTY,PRO_MONTH,NEED_QTY,ORDER_QTY');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 
 	
 	var mergecount = GridObj.GetMergeCount('SALES_CAT03');
 	
 	for ( var i =0; i < mergecount; i++){
 		/*ÆÇ¸Å°¡´É ¿ù¼ö */
 		var total_need 		= GridObj.GetSummaryBarValue('SUMMARY1','TOTAL_NEED',i).replace(/,/g,""); 		
 		var pre_month_sell 	= GridObj.GetSummaryBarValue('SUMMARY1','PRE_MONTH_SELL',i).replace(/,/g,"") 		
 		var result			= Math.round((total_need/pre_month_sell)*10)/10;
 		
 		GridObj.SetSummaryBarValue('SUMMARY1','AVL_MONTH',i, result); 	
 		
 		/*°ø±Þ°¡´É ¿ù¼ö */
 		var total_qty 		= GridObj.GetSummaryBarValue('SUMMARY1','TOTAL_QTY',i).replace(/,/g,""); 		
 		
 		var result2			= Math.round((total_qty/pre_month_sell)*10)/10;
 		
 		GridObj.SetSummaryBarValue('SUMMARY1','PRO_MONTH',i, result2); 
 			
 	}
 	
 	
   	

}

function changeValue(obj){
	
	var sales_cat05 = obj.value;
	var search_type = document.frm.search_type.options;
	
	commonUtil.getSelQeury( "sales_cat05", sales_cat05, "ip_01130_import_md_PlanAnalysis_list_combo",{
	callback:function(result){
			
			//¿É¼Ç Áö¿ì±â ÇöÀç select option °¹¼ö¸¸Å­
			for(var i = search_type.length-1 ; i >=1 ; i--){
		
		   		search_type.options[i] =null;
		  	}
			
			//¿É¼Ç Ã¤¿ì±â result °¹¼ö¸¸Å­¸¸
			for(var i=0; i<result.length ; i++) {
	 
	   		search_type.options[i+1] = new Option(result[i][1],result[i][0]);
	  		}
		
		}		
	});
	
}

