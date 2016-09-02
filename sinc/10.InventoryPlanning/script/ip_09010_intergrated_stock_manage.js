//## ÇÁ·Î±×·¥ID       : ip_09010_intergrated_stock_manage.js
//## ÇÁ·Î±×·¥¸í      	 : ÅëÇÕÀç°í°ü¸®
//## º¯°æÀÚ           : ÀÌ°­¿í
//## °³¹ßÀÏÀÚ        	 : 2016-08-08 
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_08.xml
//## °ü·Ã query file : query_sinc_ip_09010_intergrated_stock_manage.xml.xml
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
var job_id = 'ip_09010_intergrated_stock_manage';

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

	GridObj.AddHeader("CNFM_DATE"	,"ÀÏÀÚ"			,"t_text" 	   	   ,100	    ,100     ,false); //0   
 	GridObj.AddHeader("CUR_STOCK"	,"±Ý³âÀç°í"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK"	,"Àü³âÀç°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO"	,"±Ý³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO"	,"Àü³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK2"	,"±Ý³âÀç°í"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK2"	,"Àü³âÀç°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO2"	,"±Ý³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO2"	,"Àü³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK3"	,"±Ý³âÀç°í"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK3"	,"Àü³âÀç°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO3"	,"±Ý³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO3"	,"Àü³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK4"	,"±Ý³âÀç°í"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK4"	,"Àü³âÀç°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO4"	,"±Ý³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO4"	,"Àü³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK5"	,"±Ý³âÀç°í"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK5"	,"Àü³âÀç°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO5"	,"±Ý³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO5"	,"Àü³âÃâ°í"	    ,"t_number"  	   ,100		,80    ,false); //0
	
	GridObj.AddGroup	("GUBN",    "¸é/½º³¼");			
	GridObj.AppendHeader("GUBN", 	"CUR_STOCK");
	GridObj.AppendHeader("GUBN", 	"LAST_STOCK");
	GridObj.AppendHeader("GUBN", 	"CUR_CHGO");
	GridObj.AppendHeader("GUBN",   	"LAST_CHGO");
	
	GridObj.AddGroup	("GUBN2",   "¸ÅÀÔ»óÇ°");			
	GridObj.AppendHeader("GUBN2", 	"CUR_STOCK2");
	GridObj.AppendHeader("GUBN2", 	"LAST_STOCK2");
	GridObj.AppendHeader("GUBN2", 	"CUR_CHGO2");
	GridObj.AppendHeader("GUBN2",   "LAST_CHGO2");
	
	GridObj.AddGroup	("GUBN3",   "¼öÀÔ»óÇ°");			
	GridObj.AppendHeader("GUBN3", 	"CUR_STOCK3");
	GridObj.AppendHeader("GUBN3", 	"LAST_STOCK3");
	GridObj.AppendHeader("GUBN3", 	"CUR_CHGO3");
	GridObj.AppendHeader("GUBN3",   "LAST_CHGO3");
	
	GridObj.AddGroup	("GUBN4",   "±âÅ¸");			
	GridObj.AppendHeader("GUBN4", 	"CUR_STOCK4");
	GridObj.AppendHeader("GUBN4", 	"LAST_STOCK4");
	GridObj.AppendHeader("GUBN4", 	"CUR_CHGO4");
	GridObj.AppendHeader("GUBN4",   "LAST_CHGO4");
	
	GridObj.AddGroup	("GUBN5",   "°è");			
	GridObj.AppendHeader("GUBN5", 	"CUR_STOCK5");
	GridObj.AppendHeader("GUBN5", 	"LAST_STOCK5");
	GridObj.AppendHeader("GUBN5", 	"CUR_CHGO5");
	GridObj.AppendHeader("GUBN5",   "LAST_CHGO5");
	
	GridObj.BoundHeader();	

	GridObj.SetColFix('CNFM_DATE'); 
	
	GridObj.SetColCellAlign('CNFM_DATE',        'center');
	
   	GridObj.SetNumberFormat("CUR_STOCK",       	"###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO",       	"###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK2",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK2",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO2",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO2",       "###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK3",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK3",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO3",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO3",       "###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK4",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK4",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO4",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO4",       "###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK5",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK5",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO5",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO5",       "###,###.#");
   
 
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
   var start_date	    = document.frm.start_date.value;
   var end_date	        = document.frm.end_date.value;
   //start_date 			= start_date.replace(/-/g,"");
   //end_date 			= end_date.replace(/-/g,"");
 
   var user_id			= document.frm._user_id.value;
   var selected_type	= document.frm.selected_type.value; 
	
       	
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("end_date",       	end_date);
   GridObj.SetParam("user_id",     		user_id);  
   GridObj.SetParam("selected_type", 	selected_type); 
  	
   GridObj.DoQuery(servlet_url);       
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {

}

function GridSetMerge(){	
	
	GridObj.AddSummaryBar('SUMMARY', 'Æò±Õ', 'summaryall', 'sum', 'CUR_STOCK,LAST_STOCK,CUR_CHGO,LAST_CHGO,CUR_STOCK2,LAST_STOCK2,CUR_CHGO2,LAST_CHGO2,' +
	      	 			'CUR_STOCK3,LAST_STOCK3,CUR_CHGO3,LAST_CHGO3,CUR_STOCK4,LAST_STOCK4,CUR_CHGO4,LAST_CHGO4,CUR_STOCK5,LAST_STOCK5,CUR_CHGO5,LAST_CHGO5');
	
	var rowcount = GridObj.GetRowCount();
	var cnt_cur_chgo 	= 0;
	var cnt_last_chgo	= 0;
	for (var i=0; i<rowcount; i++){
		if(GridObj.GetCellValue('CUR_CHGO',i) == '0') cnt_cur_chgo += Number(1) ;
		if(GridObj.GetCellValue('LAST_CHGO',i) == '0') cnt_last_chgo += Number(1) ;
	}	
	
	var result 	= rowcount - cnt_cur_chgo ;
	var result2	= rowcount - cnt_last_chgo;
	
    	        
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK5');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK5');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO5');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO5');   	

   	
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK2',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK2',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO2',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO2',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK3',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK3',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO3',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO3',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK4',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK4',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO4',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO4',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK5',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK5',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO5',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO5',0).replace(/,/g,"")/result2));

	GridObj.SetSummaryBarColor('SUMMARY', '0|153|0', color_tot);
}
