//############################################################
//## ÇÁ·Î±×·¥ID      : ip_03020_Gift_Set_list.vm
//## ÇÁ·Î±×·¥¸í      	: ¼±¹°¼¼Æ® ÇöÈ²
//## º¯°æÀÚ            	: ÀÌ°­¿í
//## °³¹ßÀÏÀÚ        	: 2016-01-14 
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_08.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_08.xml
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
var job_id = 'ip_03020_Gift_Set_list';

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

	GridObj.AddHeader("SALES_CAT02"	       	,"¼ÒºÐ·ù"				,"t_text"	   	,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           	,"Ç°¸ñÄÚµå"			,"t_text" 	   	,100	    ,65     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       	,"Ç°¸ñ¸í"	        	,"t_text" 	   	,100	    ,220    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   	,"±Ô°Ý"	    		,"t_text"  		,100		,90     ,false); //0
 	GridObj.AddHeader("GIFT_PLAN"	    	,"¼±¹°¼¼Æ®\n¿î¿µ°èÈ¹"	,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("GIFT_PROD"	    	,"¼±¹°¼¼Æ®\n»ý»ê°èÈ¹"	,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("PROD_CUM"	    	,"±ÝÁÖ»ý»ê\n´©Àû½ÇÀû"	,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("PROD_REMN"	    	,"±ÝÁÖ»ý»ê\nÀÜ·®"	    ,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("BASE_STOCK"	       	,"±âÃÊÀç°í"			,"t_number"    	,100.3		,60     ,false); //0 	
 	GridObj.AddHeader("SALES_CUR"	       	,"ÀÏ°è"       		,"t_number" 	,100.3		,60     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       	,"´©°è"	    		,"t_number"    	,100.3		,60     ,false); //0
    GridObj.AddHeader("CHGO_CUM"	       	,"Ãâ°í´©°è"			,"t_number"    	,100.3		,70     ,false); //0  
    GridObj.AddHeader("STOCK_EXPT"	       	,"¿¹»óÀç°í"			,"t_number"    	,100.3		,70     ,false); //0  
    GridObj.AddHeader("CHGO_RATE"	   		,"Ãâ°íÀ²"	    		,"t_text"    	,100		,60     ,false); //0
 	GridObj.AddHeader("CHGO_AMOUNT"       	,"Ãâ°í °¡°Ý"			,"t_number"    	,100.3   	,70     ,false); //0
 	GridObj.AddHeader("TOT_AMOUNT"   		,"ÃÑ°èÈ¹±Ý¾×"			,"t_number"    	,100.3		,70     ,false); //0
 	GridObj.AddHeader("TOT_SALES"   		,"ÃÑÆÇ¸Å±Ý¾×"			,"t_number"    	,100.3		,70     ,false); //0
 	GridObj.AddHeader("EXCEPT_SALES"   		,"Áö¿øÁ¦¿Ü\nÆÇ¸Å±Ý¾×"	,"t_number"    	,100.3		,70     ,false); //0
 	GridObj.AddHeader("COST_PER_BOX"   		,"¹Ú½º´ç\nÀÛ¾÷ºñ"		,"t_number"    	,100.3		,70     ,false); //0
    GridObj.AddHeader("COST_PER_BOX_CUM"   	,"±Ý³â ÃÑ\nÀÛ¾÷ºñ"		,"t_number"    	,100.3   	,70     ,false) //0
 	GridObj.AddHeader("SALES_CUM_YEAR"      ,"±Ý³â¸ÅÃâ¾×\n´©°è"	,"t_number"    	,100.3   	,70     ,false); //0	
	/* ÀúÀåÀ» À§ÇÑ È÷µç °ª */

	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 

	GridObj.SetColCellAlign('SALES_CAT02',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('SPEC',               'left');
    GridObj.SetColCellAlign('CHGO_RATE',          'right');
    GridObj.SetNumberFormat("BASE_STOCK",       "###,###.#");
	GridObj.SetNumberFormat("SALES_CUR",       	"###,###.#");
	GridObj.SetNumberFormat("SALES_SUM",       	"###,###.#");
	GridObj.SetNumberFormat("GIFT_PLAN",       	"###,###.#");
	GridObj.SetNumberFormat("GIFT_PROD",       	"###,###.#");
	GridObj.SetNumberFormat("PROD_CUM",       	"###,###.#");
	GridObj.SetNumberFormat("PROD_REMN",       	"###,###.#");
	GridObj.SetNumberFormat("CHGO_CUM",       	"###,###.#");	
	GridObj.SetNumberFormat("STOCK_EXPT",       "###,###.#");	
	GridObj.SetNumberFormat("CHGO_AMOUNT",   	"###,###.#");
	GridObj.SetNumberFormat("TOT_AMOUNT",       "###,###.#");
	GridObj.SetNumberFormat("TOT_SALES",       	"###,###.#");
	GridObj.SetNumberFormat("EXCEPT_SALES",     "###,###.#");
	GridObj.SetNumberFormat("COST_PER_BOX",     "###,###.#");
	GridObj.SetNumberFormat("COST_PER_BOX_CUM", "###,###.#");
	GridObj.SetNumberFormat("SALES_CUM_YEAR",   "###,###.#");
	
	GridObj.SetColCellBgColor('GIFT_PLAN','255|253|208');
	
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
        else if( endMode =="doSave"){
            	
            	if(GridObj.GetStatus() == "true"){
            		GridSetMerge();
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


      
// ÀúÀå
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url);
	
 	
 	return;
}    




/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
 
	   var user_id			= document.all._user_id.value;         	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
     
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);	 
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

function GridCellDblClick(strColumnKey, nRow){

}


function GridSetMerge(){
	
	GridObj.SetGroupMerge('SALES_CAT02,ITEM_ID,ITEM_NAME,SPEC');	
	
    
    GridObj.AddSummaryBar('SUMMARY1', '¼Ò°è', 'SALES_CAT02', 'sum', 'GIFT_PLAN,GIFT_PROD,PROD_CUM,PROD_REMN,BASE_STOCK,SALES_CUR,SALES_SUM,CHGO_CUM,STOCK_EXPT,CHGO_AMOUNT,'
    +'TOT_AMOUNT,TOT_SALES,EXCEPT_SALES,COST_PER_BOX,COST_PER_BOX_CUM,SALES_CUM_YEAR'); 
    GridObj.AddSummaryBar('SUMMARY2', 'ÇÕ°è', 'summaryall', 'sum', 'GIFT_PLAN,GIFT_PROD,PROD_CUM,PROD_REMN,BASE_STOCK,SALES_CUR,SALES_SUM,CHGO_CUM,STOCK_EXPT,CHGO_AMOUNT,'
    		+'TOT_AMOUNT,TOT_SALES,EXCEPT_SALES,COST_PER_BOX,COST_PER_BOX_CUM,SALES_CUM_YEAR'); 		
   
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152'); 
}

