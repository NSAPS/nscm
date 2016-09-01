//## ÇÁ·Î±×·¥ID      : ip_01120_Jgc_inventoryPlanAnalysis_list.js
//## ÇÁ·Î±×·¥¸í       :  Àå±âÃ¼È­ Ç°¸ñºÐ¼®
//## º¯°æÀÚ            : ÀÌ°­¿í
//## °³¹ßÀÏÀÚ        :  2015-09-22 
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_03.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_01120_Jgc_inventoryPlanAnalysis_list';

var GridObj ; 													// WiseGrid °´Ã¼
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

	//GridObj.bRowSelectorVisible = false;        		//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.
	//GridObj.bHDMoving = true;		// ÄÃ·³ Çì´õ À§Ä¡ ÀÌµ¿

    GridObj.nHDLineSize         = 10; //Header Size
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;   
    
    
    
   
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj.strActiveRowBgColor    = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj.strHDClickAction 	   = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {        

	
	GridObj.AddHeader("DIVISION"	       ,"±¸ºÐ"	    	,"t_text"      ,100	    ,0     ,false); //0	
 	GridObj.AddHeader("SALES_CAT03"	       ,"ÀÚÀç±×·ì"	    ,"t_text"      ,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"Ç°¸ñÄÚµå"		,"t_text" 	   ,100	    ,65     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"Ç°¸ñ¸í"	        ,"t_text" 	   ,100	    ,220    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"±Ô°Ý"	    	,"t_text"  	   ,100		,90     ,false); //0
 	
 	GridObj.AddHeader("JGC_STOCK"	       ,"Àå±âÃ¼È­\n¹ß»ýÀç°í"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("SALES_PRE"	       ,"ÀüÀÏ°è"	    		,"t_number"    ,100.3	,60     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"ÀÏ°è"       		,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       ,"´©°è"	    		,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("REMAIN_STOCK"	   ,"Àå±âÃ¼È­\nÀÜ¿©Àç°í"	,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("REMAIN_DAY"	   	   ,"ÀÜ¿©ÀÏ¼ö"			,"t_number"    ,100.3	,60     ,false); //0
    GridObj.AddHeader("EXPIRY_VERSION"     ,"À¯Åë±âÇÑ\n¸¸±âÀÏ"	,"t_text"      ,100		,80     ,false); //0
    GridObj.AddHeader("PROD_TERM"     	   ,"À¯Åë±âÇÑ\n°æ°úÀÏ¼ö"	,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("TERM_PER"  		   ,"À¯Åë±âÇÑ\n°æ°úÀ²"	,"t_number"      ,100.3		,70     ,false); //0
    GridObj.AddHeader("DUE_DATE"  		   ,"Ã³¸®±âÇÑ"			,"t_text"      ,100		,150     ,false); //0
    GridObj.AddHeader("STOCK_USE_PER"	   ,"Àç°í\n¼ÒÁøÀ²"       ,"t_text"      ,100		,60     ,false); //0
 	GridObj.AddHeader("REGISTER_AGO"	   ,"µî·Ï\n°æ°úÀÏ"       ,"t_number"    ,100.3	,60     ,false); //0
 	
 	GridObj.AddHeader("EXPECT_QTY"	       ,"30%\n°æ°ú¿¹»ó¼ö·®"  ,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("EXPECT_QTY2"	       ,"50%\n°æ°ú¿¹»ó¼ö·®"  ,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("EXPECT_QTY3"	       ,"80%\n°æ°ú¿¹»ó¼ö·®"  ,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("EXPECT_QTY4"	       ,"100%\n°æ°ú¿¹»ó¼ö·®" ,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("TERM_VAL"  		   ,"À¯Åë±âÇÑ"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"  		   ,"Àç°íÀÏ¼ö"			,"t_number"    ,100.3	,70     ,false); //0
 	
 	GridObj.AddHeader("SALES_MEAN_3WEEK"    ,"3ÁÖÆò±Õ"			,"t_number"     ,100.3	,70     ,false); //0
 	GridObj.AddHeader("REGISTER_DAY"       ,"Ç°¸ñ\nµî·ÏÀÏ"		,"t_text"      ,100		,70     ,false); //0
 	
  
	/* ÀúÀåÀ» À§ÇÑ È÷µç °ª */

	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 
	
	
    GridObj.SetColCellAlign('SALES_CAT03',        	'left'); 
    GridObj.SetColCellAlign('EXPIRY_VERSION',     	'center'); 	
    GridObj.SetColCellAlign('TERM_PER',     		'right'); 
    GridObj.SetColCellAlign('STOCK_USE_PER',     	'right'); 
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
            	GridModify();
             
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
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	
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

    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode",						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("start_date",						start_date);
	GridObj.SetParam("search_type",						search_type);
	GridObj.SetParam("search_item",						search_item);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}




/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");
	   var user_id			= document.all._user_id.value;     
       var search_type	    = document.all.search_type.value;       
       var search_item	    = document.all.search_item.value;     	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
      
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);    
	   GridObj.SetParam("search_type", search_type);	   
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("user_id", 			user_id);
	   GridObj.DoQuery(servlet_url);       
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 2 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )

// ¼¿ ÀúÀå Àü¿ªº¯¼ö
var objTdG;


// ³¯Â¥ °Ë»ö POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;	
}

// ³¯Â¥ °Ë»ö POP BTN mouseOut
function outBtn( objBtn ) {
	clickedDateIdx = null;	
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {

}		


/*Sort º¯¼ö ¼±¾ð */

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
      	GridObj.AddSummaryBar('SUMMARY1', '¼Ò°è', 'SALES_CAT03', 'sum', 'JGC_STOCK,STOCK_DAY,PROD_TERM,TERM_VAL,SALES_PRE,SALES_CUR,SALES_SUM,REMAIN_STOCK,' +
      			'REMAIN_DAY,EXPIRY_VERSION,DUE_DATE,STOCK_USE_PER,REGISTER_AGO,EXPECT_QTY,EXPECT_QTY2,EXPECT_QTY3,EXPECT_QTY4,SALES_MEAN_3WEEK,REGISTER_DAY'); 
   

	      	 	
	      	 	GridObj.AddSummaryBar('SUMMARY2', 'ÇÕ°è', 'summaryall', 'sum', 'JGC_STOCK,STOCK_DAY,PROD_TERM,TERM_VAL,SALES_PRE,SALES_CUR,SALES_SUM,REMAIN_STOCK,' +
      			'REMAIN_DAY,EXPIRY_VERSION,DUE_DATE,STOCK_USE_PER,REGISTER_AGO,EXPECT_QTY,EXPECT_QTY2,EXPECT_QTY3,EXPECT_QTY4,SALES_MEAN_3WEEK,REGISTER_DAY'); 
  
   	        
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//³ì»ö

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
	 			GridObj.SetCellValue('SALES_SUM',j+1,0);
	 			GridObj.SetCellValue('REMAIN_STOCK',j+1,GridObj.GetCellValue('JGC_STOCK',j+1));
	 		}
	 		
	 		
	 	}
	 	else{
	 			for(var j =idx_s; j < idx_e; j++ ){
	 			
	 			GridObj.SetCellValue('SALES_PRE',j+1,0);
	 			GridObj.SetCellValue('SALES_CUR',j+1,0);
	 			GridObj.SetCellValue('SALES_SUM',j+1,0);
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
