//## ÇÁ·Î±×·¥ID      : ip_07080_Daily_EDI_Order_Analysis_list.js
//## ÇÁ·Î±×·¥¸í      : ±â°£º°EDI¹ßÁÖÀüÈ¯ºÐ¼®Á¶È¸
//## º¯°æÀÚÀÚ        : ³²¿õ¿ë
//## °³¹ßÀÏÀÚ        : 2014-04-03
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_04.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## VER1.0		2014-10-29			  ´ã´ç¿µ¾÷»ç¿ø ¹× ¹è¼ÛÁöÁ¡ Ãß°¡
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_07080_Daily_EDI_Order_Analysis_list';

var GridObj ; 
var GridObj2;													// WiseGrid °´Ã¼
var color_tot 		 = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';

var flag_cust_code	 = '1';				//Header Á¤·Ä±â´É
var flag_cust_name	 = '1';
var flag_cnfm_date	 = '1';
var flag_order_box	 = '1';
var flag_reqt_box	 = '1';
var flag_sell_box	 = '1';
var flag_gap	 	 = '1';
var flag_dc_name	 = '1';
var flag_sales_name	 = '1';

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
//	setHeader(GridObj);  	//ÇØ´õ»ý¼º 
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

	var start_date	    = document.all.start_date.value;
	var end_date	    = document.all.end_date.value;
	start_date 			= start_date.replace(/-/g,"");
	end_date 			= end_date.replace(/-/g,"");


	var in_sel_name = "in_fr_date"+"!%!"+"in_to_date"+"!%!"+"chk_sel_term";
	var in_sel_value = start_date +"!%!"+end_date+"!%!"	+"D";

	// ³¯Â¥±â°£ ¹«°á¼º check
	commonUtil.getCodeInfo(in_sel_name,in_sel_value,"ip_06010_TERM_CHECK", { 
		callback:function(arrList){
			var check_return = -9;
			if( arrList.length == 1 ) {
				var check_return = arrList[0][0];
			}

			if (check_return == -1){
				alert("Á¾·áÀÏÀÌ ½ÃÀÛÀÏº¸´Ù ºü¸¨´Ï´Ù!");
				return;
			}
			else if (check_return == -2){
				alert("Á¶È¸±â°£Àº 31ÀÏ ÀÔ´Ï´Ù.");
				return;
			}
			else if (check_return == -9){
				alert("³¯Â¥ ¿À·ùÀÔ´Ï´Ù");
				return;
			}
		
			commonUtil.getSelQeury( "start_date!%!end_date", start_date+"!%!"+end_date, "ip_07080_Daily_EDI_Order_Analysis_list_DW1_HEADER",{
				callback:function(result){
		
					GridObj.AddHeader("PROD_CODE"	    ,"Ç°¸ñÄÚµå"	,"t_text"	   ,100	    ,60     ,false); //0
				 	GridObj.AddHeader("ITEM_NAME"	    ,"Ç°¸ñ¸í"		,"t_text" 	   ,100	    ,150     ,false); //0   
				 	GridObj.AddHeader("GUBN"	       	,"±¸ºÐ"	    ,"t_text" 	   ,100	    ,50    ,false); //0
					if(result.length > 0){		
						for(var i=0 ; i < result.length ; i++){  
							GridObj.AddHeader(result[i][0]	,result[i][1]	,"t_number"	,100.3	,result[i][2]  ,false);    
						}
					
				 	GridObj.AddHeader("TOT"   		,"°è"		,"t_number"    ,100.3	,60     ,false); //0
				 	
					GridObj.BoundHeader(); //AddHeader¸¦ ¿Ï·áÇÑ ÈÄ Çì´õ¸¦ ±×¸®µå¿¡ ¹ÙÀÎµùÇÑ´Ù. 
					
				    GridObj.SetColCellAlign('PROD_CODE',	'center'); 
				    GridObj.SetColCellAlign('ITEM_NAME',	'left');
				    GridObj.SetColCellAlign('GUBN',			'center'); 
				    GridObj.SetColCellAlign('D00',		'right');
				    GridObj.SetColCellAlign('D01',		'right');
				    GridObj.SetColCellAlign('D02',		'right');
				    GridObj.SetColCellAlign('D03',		'right');
				    GridObj.SetColCellAlign('D04',		'right');
				    GridObj.SetColCellAlign('D05',		'right');
				    GridObj.SetColCellAlign('D06',		'right');
				    GridObj.SetColCellAlign('D07',		'right');
				    GridObj.SetColCellAlign('D08',		'right');
				    GridObj.SetColCellAlign('D09',		'right');
				    GridObj.SetColCellAlign('D10',		'right');
				    GridObj.SetColCellAlign('D11',		'right');
				    GridObj.SetColCellAlign('D12',		'right');
				    GridObj.SetColCellAlign('D13',		'right');
				    GridObj.SetColCellAlign('D14',		'right');
				    GridObj.SetColCellAlign('D15',		'right');
				    GridObj.SetColCellAlign('D16',		'right');
				    GridObj.SetColCellAlign('D17',		'right');
				    GridObj.SetColCellAlign('D18',		'right');
				    GridObj.SetColCellAlign('D19',		'right');
				    GridObj.SetColCellAlign('D20',		'right');
				    GridObj.SetColCellAlign('D21',		'right');
				    GridObj.SetColCellAlign('D22',		'right');
				    GridObj.SetColCellAlign('D23',		'right');
				    GridObj.SetColCellAlign('D24',		'right');
				    GridObj.SetColCellAlign('D25',		'right');
				    GridObj.SetColCellAlign('D26',		'right');
				    GridObj.SetColCellAlign('D27',		'right');
				    GridObj.SetColCellAlign('D28',		'right');
				    GridObj.SetColCellAlign('D29',		'right');
				    GridObj.SetColCellAlign('D30',		'right');
				    GridObj.SetColCellAlign('TOT',		'right');
		
				    GridObj.SetNumberFormat("D00",       "###,###");
				    GridObj.SetNumberFormat("D01",       "###,###");
				    GridObj.SetNumberFormat("D02",       "###,###");
				    GridObj.SetNumberFormat("D03",       "###,###");
				    GridObj.SetNumberFormat("D04",       "###,###");
				    GridObj.SetNumberFormat("D05",       "###,###");
				    GridObj.SetNumberFormat("D06",       "###,###");
				    GridObj.SetNumberFormat("D07",       "###,###");
				    GridObj.SetNumberFormat("D08",       "###,###");
				    GridObj.SetNumberFormat("D09",       "###,###");
				    GridObj.SetNumberFormat("D10",       "###,###");
				    GridObj.SetNumberFormat("D11",       "###,###");
				    GridObj.SetNumberFormat("D12",       "###,###");
				    GridObj.SetNumberFormat("D13",       "###,###");
				    GridObj.SetNumberFormat("D14",       "###,###");
				    GridObj.SetNumberFormat("D15",       "###,###");
				    GridObj.SetNumberFormat("D16",       "###,###");
				    GridObj.SetNumberFormat("D17",       "###,###");
				    GridObj.SetNumberFormat("D18",       "###,###");
				    GridObj.SetNumberFormat("D19",       "###,###");
				    GridObj.SetNumberFormat("D20",       "###,###");
				    GridObj.SetNumberFormat("D21",       "###,###");
				    GridObj.SetNumberFormat("D22",       "###,###");
				    GridObj.SetNumberFormat("D23",       "###,###");
				    GridObj.SetNumberFormat("D24",       "###,###");
				    GridObj.SetNumberFormat("D25",       "###,###");
				    GridObj.SetNumberFormat("D26",       "###,###");
				    GridObj.SetNumberFormat("D27",       "###,###");
				    GridObj.SetNumberFormat("D28",       "###,###");
				    GridObj.SetNumberFormat("D29",       "###,###");
				    GridObj.SetNumberFormat("D30",       "###,###");
				    GridObj.SetNumberFormat("TOT",       "###,###");
					}
		
					doQuery();	
				}
			});   

		}
	});

}

function setHeader2() 
{        
	GridObj2.AddHeader("CUST_NAME"			,"Á¡Æ÷¸í"		,"t_text" 		,100	,150  ,false);   
	GridObj2.AddHeader("CUST_CODE"			,"Á¡Æ÷ÄÚµå"		,"t_text" 		,100	,5  ,false);   

	GridObj2.AddHeader("ITEM_NAME"			,"Ç°¸ñ¸í"		,"t_text" 		,100	,160  ,false);   
	GridObj2.AddHeader("PROD_CODE"			,"Ç°¸ñÄÚµå"		,"t_text" 		,100	,5  ,false);   
	GridObj2.AddHeader("CNFM_DATE"			,"ÀÏÀÚ"			,"t_text" 		,100	,70  ,false);   
 	
 	GridObj2.AddHeader("ODER_BOX"			,"¹ßÁÖ·®"      	,"t_number" 	,100	,50  ,false);   
 	GridObj2.AddHeader("REQT_BOX"			,"ÁÖ¹®·®"      	,"t_number" 	,100	,50  ,false);   
 	GridObj2.AddHeader("SELL_BOX"			,"³³Ç°·®"     	,"t_number" 	,100	,50  ,false); 
 	GridObj2.AddHeader("GAP"				,"¹Ì³³·®"     	,"t_number" 		,100	,50  ,false);  
 	GridObj2.AddHeader("DC_NAME"			,"¹è¼ÛÁöÁ¡"     	,"t_text" 		,100	,65  ,false);  
 	GridObj2.AddHeader("SALES_NAME"			,"´ã´çÀÚ"     	,"t_text" 	,100	,50  ,false);     
 	
 
	GridObj2.BoundHeader(); //AddHeader¸¦ ¿Ï·áÇÑ ÈÄ Çì´õ¸¦ ±×¸®µå¿¡ ¹ÙÀÎµùÇÑ´Ù. 
	
	
    GridObj2.SetColCellAlign('CUST_CODE',	'center');
    GridObj2.SetColCellAlign('CUST_NAME',	'left'); 
    GridObj2.SetColCellAlign('PROD_CODE',	'center');
    GridObj2.SetColCellAlign('ITEM_NAME',	'left'); 
    GridObj2.SetColCellAlign('CNFM_DATE',	'center');
    GridObj2.SetColCellAlign('ODER_BOX',	'right');
    GridObj2.SetColCellAlign('REQT_BOX',	'right');
    GridObj2.SetColCellAlign('SELL_BOX',	'right');
    GridObj2.SetColCellAlign('DC_NAME',		'left'); 
    GridObj2.SetColCellAlign('SALES_NAME',	'left'); 
    GridObj2.SetColCellAlign('GAP',			'right');
	
	GridObj2.SetNumberFormat("ODER_BOX"		, "###,###,###");
	GridObj2.SetNumberFormat("REQT_BOX"		, "###,###,###");
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
              
              GridObj.SetColFix("GUBN");
              GridObj.SetGroupMerge('PROD_CODE,ITEM_NAME');

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
				GridObj2.AddSummaryBar('SUMMARY2', '¼Ò°è', 'CUST_NAME', 'sum', 'ODER_BOX,REQT_BOX,SELL_BOX,GAP'); 
				GridObj2.SetSummaryBarColor('SUMMARY2', '0|0|0', '212|212|212'); 
			}
			GridObj2.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', 'ODER_BOX,REQT_BOX,SELL_BOX,GAP'); 
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
   	
	var grup_code1	    = document.all.grup_code1.value;

	GridObj.ClearGrid();
    setHeader(GridObj);

   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       //start_date 			= start_date.replace(/-/g,"");
       //end_date 			= end_date.replace(/-/g,"");
      // alert(end_date);
     //  return;
		
	   var chk_edi_reason	= document.frm.chk_edi_reason.value;
	
       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var search_item	    = document.all.search_item.value;
       var grup_code1	    = document.all.grup_code1.value;
       var in_qty_gubn		= document.all.in_qty_gubn.value;
 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
		if(document.frm.chk_edi_reason.checked) {
		GridObj.SetParam("chk_edi_reason",     "Y");
		}
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type",     item_type);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("grup_code1", grup_code1);
	   GridObj.SetParam("in_qty_gubn", in_qty_gubn);
	   
	   

	GridObj2.ClearGrid();
	setHeader2();
	sum_gubn = '¼Ò°èÀÖÀ½';


	   GridObj.DoQuery(servlet_url);       
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 2 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery2(grup_code1, search_item, start_date, end_date) 
   {

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       var in_qty_gubn		= document.all.in_qty_gubn.value;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj2.SetParam("mode",           "search_DW2");
       GridObj2.SetParam("start_date",   start_date);
       GridObj2.SetParam("end_date",       end_date);
	   GridObj2.SetParam("item_type",     item_type);
	   GridObj2.SetParam("search_type", search_type);
	   GridObj2.SetParam("search_item", search_item);
	   GridObj2.SetParam("grup_code1", grup_code1);
	   GridObj2.SetParam("in_qty_gubn", in_qty_gubn);
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
	var	grup_code1		= document.all.grup_code1.value;

	var start_date	    = document.all.start_date.value;
	var end_date	    = document.all.end_date.value;
	
	start_date 			= start_date.replace(/-/g,"");
	end_date 			= end_date.replace(/-/g,"");

	sum_gubn = '¼Ò°è¾øÀ½';

	if(strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'TOT') {

		doQuery2(grup_code1, search_item, start_date, end_date);
	}
	else {
		var sel_date_no = strToNum(strColumnKey.substring(1,3));
		var sel_date	= addDate("d", sel_date_no, start_date, "");
	
		doQuery2(grup_code1, search_item, sel_date, sel_date);

	}


}

function HeaderClick_DW1(strColumnKey){

	if(strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'TOT') return;
	
	var search_item	    = document.all.search_item.value;
	var	grup_code1		= document.all.grup_code1.value;

	var start_date	    = document.all.start_date.value;
	var end_date	    = document.all.end_date.value;
	start_date 			= start_date.replace(/-/g,"");
	end_date 			= end_date.replace(/-/g,"");

	var sel_date_no = strToNum(strColumnKey.substring(1,3));
	var sel_date	= addDate("d", sel_date_no, start_date, "");

	sum_gubn = '¼Ò°èÀÖÀ½';
	doQuery2(grup_code1, search_item, sel_date, sel_date);
	
}

function HeaderClick_DW2(strColumnKey){
	//2014-11-04 Á¤·Ä±â´É Ãß°¡
	GridObj2.SetColCellSortEnable('CUST_NAME'	,true);
	GridObj2.SetColCellSortEnable('CUST_CODE'	,true);
	GridObj2.SetColCellSortEnable('CNFM_DATE'	,true);
	GridObj2.SetColCellSortEnable('ODER_BOX'	,true);
	GridObj2.SetColCellSortEnable('REQT_BOX'	,true);
	GridObj2.SetColCellSortEnable('SELL_BOX'	,true);
	GridObj2.SetColCellSortEnable('GAP'			,true);
	GridObj2.SetColCellSortEnable('DC_NAME'		,true);
	GridObj2.SetColCellSortEnable('SALES_NAME'	,true);
	
	GridObj2.ClearGroupMerge();
	
	if(strColumnKey == 'CUST_NAME') {
		
		if(flag_cust_name =='1'){
			
			GridObj2.SetColCellSort('CUST_NAME','descending');
		
			flag_cust_name++;
		}
		else if(flag_cust_name =='2'){
			
			GridObj2.SetColCellSort('CUST_NAME','asceding');
		
			flag_cust_name--;
		}
	}
	if(strColumnKey == 'CUST_CODE') {
		
		if(flag_cust_code =='1'){
		
			GridObj2.SetColCellSort('CUST_CODE','descending');
			flag_cust_code++;
		}
		else if(flag_cust_code =='2'){
			
			GridObj2.SetColCellSort('CUST_CODE','asceding');
			
			flag_cust_code--;	
			
		}
	}
	if(strColumnKey == 'CNFM_DATE') {
		
		if(flag_cnfm_date =='1'){
		
			GridObj2.SetColCellSort('CNFM_DATE','descending');
			flag_cnfm_date++;
		}
		else if(flag_cnfm_date =='2'){
			
			GridObj2.SetColCellSort('CNFM_DATE','asceding');
			
			flag_cnfm_date--;	
			
		}
	}
	if(strColumnKey == 'ODER_BOX') {
		
		if(flag_order_box =='1'){
		
			GridObj2.SetColCellSort('ODER_BOX','descending');
			flag_order_box++;
		}
		else if(flag_order_box =='2'){
			
			GridObj2.SetColCellSort('ODER_BOX','asceding');
			
			flag_order_box--;	
			
		}
	}
	if(strColumnKey == 'REQT_BOX') {
		
		if(flag_reqt_box =='1'){
		
			GridObj2.SetColCellSort('REQT_BOX','descending');
			flag_reqt_box++;
		}
		else if(flag_reqt_box =='2'){
			
			GridObj2.SetColCellSort('REQT_BOX','asceding');
			
			flag_reqt_box--;	
			
		}
	}
	if(strColumnKey == 'SELL_BOX') {
		
		if(flag_sell_box =='1'){
		
			GridObj2.SetColCellSort('SELL_BOX','descending');
			flag_sell_box++;
		}
		else if(flag_sell_box =='2'){
			
			GridObj2.SetColCellSort('SELL_BOX','asceding');
			
			flag_sell_box--;	
			
		}
	}
	if(strColumnKey == 'GAP') {
		
		if(flag_gap =='1'){
		
			GridObj2.SetColCellSort('GAP','descending');
			flag_gap++;
		}
		else if(flag_gap =='2'){
			
			GridObj2.SetColCellSort('GAP','asceding');
			
			flag_gap--;	
			
		}
	}
	if(strColumnKey == 'DC_NAME') {
		
		if(flag_dc_name =='1'){
		
			GridObj2.SetColCellSort('DC_NAME','descending');
			flag_dc_name++;
		}
		else if(flag_dc_name =='2'){
			
			GridObj2.SetColCellSort('DC_NAME','asceding');
			
			flag_dc_name--;	
			
		}
	}
	if(strColumnKey == 'SALES_NAME') {
		
		if(flag_sales_name =='1'){
		
			GridObj2.SetColCellSort('SALES_NAME','descending');
			flag_sales_name++;
		}
		else if(flag_sales_name =='2'){
			
			GridObj2.SetColCellSort('SALES_NAME','asceding');
			
			flag_sales_name--;	
			
		}
	}
	
		//GridObj2.SetGroupMerge('CUST_NAME,CUST_CODE');
		GridObj2.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', 'ODER_BOX,REQT_BOX,SELL_BOX,GAP'); 
		GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '252|252|192');
		
}
/* ----------------------------------------------------------------------------
 * Æ¯Á¤ ³¯Â¥¿¡ ´ëÇØ ÁöÁ¤ÇÑ °ª¸¸Å­ °¡°¨(+-)ÇÑ ³¯Â¥¸¦ ¹ÝÈ¯

 * 

 * ÀÔ·Â ÆÄ¶ó¹ÌÅÍ -----
 * pInterval : "yyyy" ´Â ¿¬µµ °¡°¨, "m" Àº ¿ù °¡°¨, "d" ´Â ÀÏ °¡°¨
 * pAddVal  : °¡°¨ ÇÏ°íÀÚ ÇÏ´Â °ª (Á¤¼öÇü)
 * pYyyymmdd : °¡°¨ÀÇ ±âÁØÀÌ µÇ´Â ³¯Â¥
 * pDelimiter : pYyyymmdd °ª¿¡ »ç¿ëµÈ ±¸ºÐÀÚ¸¦ ¼³Á¤ (¾øÀ¸¸é "" ÀÔ·Â)

 * 

 * ¹ÝÈ¯°ª ----

 * yyyymmdd ¶Ç´Â ÇÔ¼ö ÀÔ·Â½Ã ÁöÁ¤µÈ ±¸ºÐÀÚ¸¦ °¡Áö´Â yyyy?mm?dd °ª
 *

 * »ç¿ë¿¹ ---

 * 2008-01-01 ¿¡ 3 ÀÏ ´õÇÏ±â ==> addDate("d", 3, "2008-08-01", "-");

 * 20080301 ¿¡ 8 °³¿ù ´õÇÏ±â ==> addDate("m", 8, "20080301", "");
 --------------------------------------------------------------------------- */
function addDate(pInterval, pAddVal, pYyyymmdd, pDelimiter)
{
	 var yyyy;
	 var mm;
	 var dd;
	 var cDate;
	 var oDate;
	 var cYear, cMonth, cDay;
	 
	 if (pDelimiter != "") {
	  pYyyymmdd = pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
	 }
	 
	
	 yyyy = pYyyymmdd.substr(0, 4);
	 mm  = pYyyymmdd.substr(4, 2);
	 dd  = pYyyymmdd.substr(6, 2);
	 
	 if (pInterval == "yyyy") {
	  yyyy = (yyyy * 1) + (pAddVal * 1); 
	 } else if (pInterval == "m") {
	  mm  = (mm * 1) + (pAddVal * 1);
	 } else if (pInterval == "d") {
	  dd  = (dd * 1) + (pAddVal * 1);
	 }
	 
	
	 cDate = new Date(yyyy, mm - 1, dd) // 12¿ù, 31ÀÏÀ» ÃÊ°úÇÏ´Â ÀÔ·Â°ª¿¡ ´ëÇØ ÀÚµ¿À¸·Î °è»êµÈ ³¯Â¥°¡ ¸¸µé¾îÁü.
	 cYear = cDate.getFullYear();
	 cMonth = cDate.getMonth() + 1;
	 cDay = cDate.getDate();
	 
	 cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
	 cDay = cDay < 10 ? "0" + cDay : cDay;
	
	 
	
	 if (pDelimiter != "") {
	  return cYear + pDelimiter + cMonth + pDelimiter + cDay;
	 } else {
	  return cYear + cMonth + cDay;
	 }
 
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