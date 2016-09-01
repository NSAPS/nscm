//## ÇÁ·Î±×·¥ID      : ip_07070_EDI_Order_Analysis_list.js
//## ÇÁ·Î±×·¥¸í      : EDI¹ßÁÖÀüÈ¯ºÐ¼®Á¶È¸
//## º¯°æÀÚÀÚ        : ³²¿õ¿ë
//## °³¹ßÀÏÀÚ        : 2014-02-14
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_04.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_07070_EDI_Order_Analysis_list';

var GridObj ; 
var GridObj2;													// WiseGrid °´Ã¼
var color_tot 		 = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';

var sum_gubn = '¼Ò°èÀÖÀ½';  // or '¼Ò°è¾øÀ½'

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

function init2() {
	
	GridObj2 = document.WiseGrid2;

	setProperty(GridObj2); 	// ±âº» property ¼³Á¤
	setDefault2();  			// Ãß°¡ property ¼³Á¤
	setHeader2();   			// Header ¼³Á¤
			
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
	GridObj.strHDFontName = '¸¼Àº °íµñ';
	GridObj.nCellFontSize = 9;					// Font Size 9
	GridObj.bHDFontBold = true;
	//GridObj.bHDFontULine=true;				// Çì´õ ¹ØÁÙ
       
}

function setDefault2(){
	
	GridObj2.bUserContextMenu = true;				//»ç¿ëÀÚ ÄÁÅØ½ºÆ® ¸Þ´ºÀÇ »ç¿ë ¿©ºÎ¸¦ °áÁ¤ÇÑ´Ù. 
	GridObj2.bHDMoving = false;                  	//»ç¿ëÀÚ°¡ Çì´õ¸¦ µå·¡±×ÇØ¼­ ÄÃ·³À§Ä¡¸¦ ÀÌµ¿ÇÒ¼ö ¾ø´Ù.
	GridObj2.bHDSwapping = false;                	//Çì´õÀÇ ÄÃ·³À§Ä¡ÀÌµ¿ ÄÞº¸¹öÆ°À» ºñÈ°¼ºÈ­ ÇÑ´Ù.
	GridObj2.bRowSelectorVisible = false;        		//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	GridObj2.bRowSelectorIndex = false;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù. 
	GridObj2.strRowBorderStyle = "none";         	//·Î¿ìÀÇ Å×µÎ¸®¿¡ ¾Æ¹«°Íµµ ³ªÅ¸³ªÁö ¾Ê´Â´Ù.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing°ªÀ» Á¤ÇÑ´Ù. 
	GridObj2.strHDClickAction = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
	GridObj2.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
    GridObj2.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName = '¸¼Àº °íµñ';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	
	//Hearder ³ôÀÌ
	GridObj2.nHDLineSize   = 12;   //12
	
	// Grid Çà ³ôÀÌ
    GridObj2.nRowHeight    = 12;    //22
    
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj2.nHDLines = 2; 
 	GridObj2.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'       
 
}

       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {        

 	GridObj.AddHeader("CNFM_DATE"	    ,"ÀÏ ÀÚ"	    ,"t_text"      ,100	    ,60     ,false); //0
	GridObj.AddHeader("PROD_CODE"	    ,"Ç°¸ñÄÚµå"	,"t_text"	   ,100	    ,60     ,false); //0
 	GridObj.AddHeader("ITEM_NAME"	    ,"Ç°¸ñ¸í"		,"t_text" 	   ,100	    ,150     ,false); //0   
 	GridObj.AddHeader("GUBN"	       	,"±¸ºÐ"	    ,"t_text" 	   ,100	    ,50    ,false); //0
 	GridObj.AddHeader("EDI32"	       	,"ÀÌ¸¶Æ®"	    ,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI21"	       	,"È¨\nÇÃ·¯½º"   ,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI23"	       	,"·Ôµ¥\n¸¶Æ®"	,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI03"	       	,"¸Þ°¡\n¸¶Æ®"   ,"t_number"    ,100.3	,50     ,false); //0
    GridObj.AddHeader("EDI20"	       	,"GS\nCVS"	,"t_number"    ,100.3	,50     ,false); //0
    GridObj.AddHeader("EDI26"	       	,"·Ôµ¥\n½´ÆÛ"	,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI33"     	   	,"·Ôµ¥\n·ÎÁö"	,"t_number"    ,100.3	,50     ,false); //0 //Ãß°¡ : 2012-04-19//
 	GridObj.AddHeader("EDI27"       	,"¹Ù·Î\nÄÚ»ç"	,"t_number"    ,100.3   ,50     ,false); //0
 	GridObj.AddHeader("EDI29"   		,"¼­¿ø\nÀ¯Åë"	,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI_TOT"   		,"°è"		,"t_number"    ,100.3	,60     ,false); //0
 	
 
	/* ÀúÀåÀ» À§ÇÑ È÷µç °ª */

	GridObj.BoundHeader();	

//	GridObj.SetColFix('ITEM_NAME'); 

    GridObj.SetColCellAlign('CNFM_DATE',	'center');
    GridObj.SetColCellAlign('PROD_CODE',	'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	'left');
    GridObj.SetColCellAlign('GUBN',			'center'); 
    GridObj.SetColCellAlign('EDI32',		'right');
    GridObj.SetColCellAlign('EDI21',		'right'); 
    GridObj.SetColCellAlign('EDI23',		'right');
    GridObj.SetColCellAlign('EDI03',		'right');
    GridObj.SetColCellAlign('EDI20',		'right');
    GridObj.SetColCellAlign('EDI26',		'right');
    GridObj.SetColCellAlign('EDI33',		'right');
    GridObj.SetColCellAlign('EDI27',		'right');
    GridObj.SetColCellAlign('EDI29',		'right');
    GridObj.SetColCellAlign('EDI_TOT',		'right');
    
    GridObj.SetNumberFormat("EDI32",       "###,###");
    GridObj.SetNumberFormat("EDI21",       "###,###");
    GridObj.SetNumberFormat("EDI23",       "###,###");
    GridObj.SetNumberFormat("EDI03",       "###,###");
    GridObj.SetNumberFormat("EDI20",       "###,###");
    GridObj.SetNumberFormat("EDI26",       "###,###");
    GridObj.SetNumberFormat("EDI33",       "###,###");
    GridObj.SetNumberFormat("EDI27",       "###,###");
    GridObj.SetNumberFormat("EDI29",       "###,###");
    GridObj.SetNumberFormat("EDI_TOT",       "###,###");
	
}

function setHeader2() 
{        
	GridObj2.AddHeader("CUST_NAME"			,"Á¡Æ÷¸í"			,"t_text" 		,100	,150  ,false);   
	GridObj2.AddHeader("CUST_CODE"			,"Á¡Æ÷ÄÚµå"		,"t_text" 		,100	,5  ,false);   

	GridObj2.AddHeader("ITEM_NAME"			,"Ç°¸ñ¸í"			,"t_text" 		,100	,160  ,false);   
	GridObj2.AddHeader("PROD_CODE"			,"Ç°¸ñÄÚµå"		,"t_text" 		,100	,5  ,false);   
 	
 	GridObj2.AddHeader("ODER_BOX"			,"¹ßÁÖ·®"      	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("SELL_BOX"			,"³³Ç°·®"     	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("GAP"				,"¹Ì³³·®"     	,"t_number" 	,100	,45  ,false);   
 
	GridObj2.BoundHeader(); //AddHeader¸¦ ¿Ï·áÇÑ ÈÄ Çì´õ¸¦ ±×¸®µå¿¡ ¹ÙÀÎµùÇÑ´Ù. 

    GridObj2.SetColCellAlign('CUST_CODE',	'center');
    GridObj2.SetColCellAlign('CUST_NAME',	'left'); 
    GridObj2.SetColCellAlign('PROD_CODE',	'center');
    GridObj2.SetColCellAlign('ITEM_NAME',	'left'); 
    GridObj2.SetColCellAlign('ODER_BOX',	'right');
    GridObj2.SetColCellAlign('SELL_BOX',	'right');
    GridObj2.SetColCellAlign('GAP',			'right');
	
	GridObj2.SetNumberFormat("ODER_BOX"		, "###,###,###");
	GridObj2.SetNumberFormat("SELL_BOX"	    , "###,###,###");
	GridObj2.SetNumberFormat("GAP"	     	, "###,###,###");
	
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
              
            	var rowCnt = GridObj.GetRowCount();
	    		for (var i = 0 ; i < rowCnt ; i++ ){
	    			var gubn = GridObj.GetCellValue("GUBN", i);
	    			if(gubn == "¹Ì³³·®") {
	    				GridObj.SetRowBgColor(i, '212|212|212');
	    			}
	    		}
              
              GridObj.SetGroupMerge('CNFM_DATE,PROD_CODE,ITEM_NAME');

            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
		
    }

function GridEndQuery2() {
		
	// wiseGrid¿¡¼­ ÀÌ»ó¸Þ¼¼Áö È®ÀÎ¿ë!
	if(GridObj2.GetStatus() != "true") {
		return;
	}

	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //Á¶È¸
		if(GridObj2.GetStatus() == "true") { // 
			GridObj2.SetGroupMerge('CUST_NAME,CUST_CODE');
			if(sum_gubn == '¼Ò°èÀÖÀ½') {
				GridObj2.AddSummaryBar('SUMMARY2', '¼Ò°è', 'CUST_NAME', 'sum', 'ODER_BOX,SELL_BOX,GAP'); 
				GridObj2.SetSummaryBarColor('SUMMARY2', '0|0|0', '212|212|212'); 
			}
			GridObj2.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', 'ODER_BOX,SELL_BOX,GAP'); 
			GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '252|252|192');			
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
   	var item_type	= document.all.item_type.value;	
	var	search_type = document.frm.search_type.value; 	//	Á¶È¸À¯Çü
   	
 /*  	if(item_type == null || item_type == ""){
		//alert("Á¶È¸À¯ÇüÀ» ¼±ÅÃÇÏ½Ê½Ã¿ä!");
   		//return
   	}
	if( search_type == "" || search_type == null || search_type == 00 ) {
		alert("Á¶È¸À¯ÇüÀ» ¼±ÅÃÇÏ½Ê½Ã¿ä!");
		return;
	}   	
*/
	var grup_code1	    = document.all.grup_code1.value;
	
	if(grup_code1 == null || grup_code1 == "" ) {
	    GridObj.SetColHide('EDI32',		false);
	    GridObj.SetColHide('EDI21',		false); 
	    GridObj.SetColHide('EDI23',		false);
	    GridObj.SetColHide('EDI03',		false);
	    GridObj.SetColHide('EDI20',		false);
	    GridObj.SetColHide('EDI26',		false);
	    GridObj.SetColHide('EDI33',		false);
	    GridObj.SetColHide('EDI27',		false);
	    GridObj.SetColHide('EDI29',		false);
	    GridObj.SetColHide('EDI_TOT',	false);
	}
	else {
	    GridObj.SetColHide('EDI32',		true);
	    GridObj.SetColHide('EDI21',		true); 
	    GridObj.SetColHide('EDI23',		true);
	    GridObj.SetColHide('EDI03',		true);
	    GridObj.SetColHide('EDI20',		true);
	    GridObj.SetColHide('EDI26',		true);
	    GridObj.SetColHide('EDI33',		true);
	    GridObj.SetColHide('EDI27',		true);
	    GridObj.SetColHide('EDI29',		true);
	    GridObj.SetColHide('EDI_TOT',	true);

		GridObj.SetColHide('EDI'+ grup_code1,	false);	    
	}

	GridObj2.ClearGrid();
	setHeader2();
	sum_gubn = '¼Ò°èÀÖÀ½';
	
    doQuery();

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
      // alert(end_date);
     //  return;

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var search_item	    = document.all.search_item.value;
       var grup_code1	    = document.all.grup_code1.value;
 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type",     item_type);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("grup_code1", grup_code1);

	   GridObj.DoQuery(servlet_url);       
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 2 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery2(grup_code1, search_item) 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj2.SetParam("mode",           "search_DW2");
       GridObj2.SetParam("start_date",   start_date);
       GridObj2.SetParam("end_date",       end_date);
	   GridObj2.SetParam("item_type",     item_type);
	   GridObj2.SetParam("search_type", search_type);
	   GridObj2.SetParam("search_item", search_item);
	   GridObj2.SetParam("grup_code1", grup_code1);
	   GridObj2.DoQuery(servlet_url);       
   }
	
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
	
	var search_item	    = GridObj.GetCellValue('PROD_CODE',nRow);
	var	grup_code1;

	if(strColumnKey == 'CNFM_DATE' || strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'EDI_TOT') {
		grup_code1 = document.all.grup_code1.value;
	}
	else grup_code1	= strColumnKey.substring(3,6);
	
	sum_gubn = '¼Ò°è¾øÀ½';
	doQuery2(grup_code1, search_item);

}

function HeaderClick_DW1(strColumnKey){

    GridObj.SetColCellAlign('CNFM_DATE',	'center');
    GridObj.SetColCellAlign('PROD_CODE',	'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	'left');
    GridObj.SetColCellAlign('GUBN',			'center'); 

	if(strColumnKey == 'CNFM_DATE' || strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'EDI_TOT') return;
	
	var search_item	    = document.all.search_item.value;
	var	grup_code1		= strColumnKey.substring(3,6);

	sum_gubn = '¼Ò°èÀÖÀ½';
	doQuery2(grup_code1, search_item);
	
}

function setWiseGridAutoResize( tab_h, table_h ){
	
	var maxWidthValue;
	var maxHeightValue;
	
	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
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
	//tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 
	document.WiseGrid2.height = tableHeightValue + "px"; 
 
}	