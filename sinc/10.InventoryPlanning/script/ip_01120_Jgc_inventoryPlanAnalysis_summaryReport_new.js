//## ÇÁ·Î±×·¥ID      : ip_01120_Jgc_inventoryPlanAnalysis_summaryReport_new.js
//## ÇÁ·Î±×·¥¸í      : Àå±âÃ¼È­ Ç°¸ñ ¿ä¾à ·¹Æ÷Æ®(½Å±Ô)
//## °³¹ßÀÚ          : ÀÌ°­¿í
//## °³¹ßÀÏÀÚ        : 2015-01-30 È­¿äÀÏ
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_03.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-01-30	ÀÌ°­¿í		CREATE
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_01120_Jgc_inventoryPlanAnalysis_summaryReport_new';

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
	doQuery();
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

	
	GridObj.AddHeader("DIVISION"	       ,"ÆÀ±¸ºÐ"	    			,"t_text"      ,100	    ,100    ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"ÀÚÀç±×·ì"				,"t_text"	   ,100	    ,90     ,false); //0
 	GridObj.AddHeader("STOCK"	           ,"Àå±âÃ¼È­\n¹ß»ýÀç°í"		,"t_number"    ,100.3	,80     ,false); //0   
 	GridObj.AddHeader("SALES_PRE"	       ,"ÀüÀÏ°è"	       			,"t_number"    ,100.3	,80   	,false); //0
 	GridObj.AddHeader("ISSUE"	    	   ,"ÀÏ°è"	    			,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("SELL_BOX_CUM"	   ,"´©°è"	    			,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("REMAIN_STOCK"	   ,"Àå±âÃ¼È­\nÀÜ¿©Àç°í" 	 	,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("SELL_RATE"  		   ,"Àç°í¼ÒÁøÀ²"				,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("EXPECT_STOCK"  	   ,"À¯Åë±âÇÑ\n°æ°ú¿¹»ó¼ö·®"	,"t_number"    ,100.3	,90     ,false); //0
 	

	GridObj.BoundHeader();	

	GridObj.SetColCellAlign('DIVISION',       'center'); //Ãß°¡ : 2014-05-14
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
            	
            		GridSetMerge();
             
            } else    
            { 
            	;
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

   function doQuery(){
   		
   		var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
   	
  		
  	    var start_date = document.frm.start_date.value.replace(/-/g,"");  	    
  	    var gubn		= document.frm.gubn.value;
  	   
  	   
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("gubn",   gubn);
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


function GridSetMerge(){
		
		var rowCount = GridObj.GetRowCount();		
		if (rowCount == 0) return;
				
		GridObj.SetGroupMerge('DIVISION');
        GridObj.AddSummaryBar('SUMMARY1', '¼Ò°è', 'DIVISION', 'custom', 'STOCK,SALES_PRE,ISSUE,SELL_BOX_CUM,REMAIN_STOCK,SELL_RATE,EXPECT_STOCK'); 
         	   
         	   /* custom ¼Ò°è¿¡ ´ëÇØ °¢ ÄÃ·³º°·Î ÁöÁ¤ - SUMMARY1 */
         	   
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','STOCK');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SALES_PRE');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','ISSUE');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SELL_BOX_CUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','REMAIN_STOCK');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','EXPECT_STOCK');
         	   
         	    
         	    //GridObj.SetSummaryBarFunction('SUMMARY1','average','SELL_RATE');   
         	    //GridObj.SetSummaryBarFunction('SUMMARY1','average','TERM_VAL');   
         	    
         	    var rowcount = GridObj.GetMergeCount('DIVISION');   //¼Ò°è ÀÎµ¦½º ±¸ÇÏ±â
         	    for (var i=0; i<rowcount; i++){
         	    	
         	   	var SELL_BOX_CUM 		 = GridObj.GetSummaryBarValue('SUMMARY1','SELL_BOX_CUM',i,true).replace(/,/g,"");
         	    var STOCK = GridObj.GetSummaryBarValue('SUMMARY1','STOCK',i,true).replace(/,/g,"");         	    	
         	    	
         	    	/* »ç¿ëÀÚ ÁöÁ¤ °è»ê½Ä Ãß°¡ - Àç°í¼ÒÁøÀ² = ´©°è/¹ß»ýÀç°í */
         	    	GridObj.SetSummaryBarValue('SUMMARY1','SELL_RATE',i, Math.round((SELL_BOX_CUM/STOCK)*1000)/10 );
         	    	
          	    }
         	     
         	  	      	 	
	      	 	/* custom ¼Ò°è¿¡ ´ëÇØ °¢ ÄÃ·³º°·Î ÁöÁ¤ - SUMMARY3 */
	      	 	
	      	 	GridObj.AddSummaryBar('SUMMARY3', 'ÇÕ°è', 'summaryall','custom','STOCK,SALES_PRE,ISSUE,SELL_BOX_CUM,REMAIN_STOCK,SELL_RATE,EXPECT_STOCK');
    	        
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

