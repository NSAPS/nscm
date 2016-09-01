//## ÇÁ·Î±×·¥ID      : op_02030_Material_Refreshing_List.js
//## ÇÁ·Î±×·¥¸í      : Á¦Ç°º° ÀÚÀçÇöÈ² Á¶È¸ (½Å±Ô)
//## º¯°æÀÚÀÚ        : ¿ìÁ¾±Õ
//## °³¹ßÀÏÀÚ        : 2013-01-24 È­¿äÀÏ
//##
//## °ü·Ã job file   : job_sinc_30_orderPlanning_03.xml
//## °ü·Ã query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2013-01-24  ¿ìÁ¾±Õ      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id 				= 'op_02030_Material_Refreshing_List';

var GridObj ; 													// WiseGrid °´Ã¼
var GridObj2 ;

var color_tot			= '234|234|234';	//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col		= '255|253|208';


var color_sp			= '230|222|230'; 	//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row	= '255|253|208';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö 



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
          
        document.WiseGrid.height = tableHeightValue + "px"; 
        
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
	setProperty(GridObj2);	//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	setHeader(GridObj2);  	//ÇØ´õ»ý¼º 
	setDefault2();        	//È­¸é ±âº» ¼³Á¤ 
}   


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 
	
	GridObj.bRowSelectorIndex		= true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.
    GridObj.nHDLineSize				= 10; //Header Size
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines				= 2;   
   
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
	GridObj.strSelectedCellFgColor	= '0|0|0';
	GridObj.strSelectedCellBgColor	= '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj.strActiveRowBgColor		= "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj.strHDClickAction		= "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj.strMouseWheelAction		='page';

	// Cell Font Setting
	GridObj.nCellFontSize			= 9;					// Font Size 9
       
}
       
function setDefault2() { 

	GridObj2.bRowSelectorIndex		= true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.
    GridObj2.nHDLineSize			= 10; //Header Size
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj2.nHDLines				= 2;   
   
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
	GridObj2.strSelectedCellFgColor = '0|0|0';
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj2.strActiveRowBgColor	= "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj2.strHDClickAction		= "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj2.strMouseWheelAction	='page';

	// Cell Font Setting
	GridObj2.nCellFontSize			= 9;					// Font Size 9
       
}       
       
       
       
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {        

    var item_id 	= document.frm.item_id.value;
    var item_name	= document.frm.item_name.value;

 		GridObj.AddHeader("GUBN"			,"´Üµ¶"   			,"t_text" 		,2			,30  	,false); //0
 		GridObj.AddHeader("SELECTED"		,""   				,"t_checkbox" 	,2			,30  	,true); //0
		GridObj.AddHeader("CONS_ITEM_ID"	,"ÀÚÀçÄÚµå"		    ,"t_text"		,100	    ,60     ,false); //0   
		GridObj.AddHeader("CONS_ITEM_NAME"	,"ÀÚÀç¸í"	       		,"t_text"		,100	    ,190    ,false); //0
		GridObj.AddHeader("MEINS"			,"´ÜÀ§"   			,"t_text"		,100	    ,35     ,false); //0		 	
		GridObj.AddHeader("REQ_QTY"	    	,"Ãµ\n¼Ò¿ä·®"	        ,"t_number"    ,100.3		,70     ,false); //0
		GridObj.AddHeader("TOT"	    		,"Àç°í\n¼ö·®"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("CONV_QTY"	    ,"¹Ú½º\nÈ¯»ê"	        ,"t_number"	   ,100.3		,70     ,false); //0		
		GridObj.AddHeader("PEINH"	    	,"°¡°Ý\n´ÜÀ§"	        ,"t_number"	   ,100.3		,50     ,false); //0
		GridObj.AddHeader("NETPR"	    	,"´Ü°¡"	       	    ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("WAERS"	    	,"ÅëÈ­Å°"		        ,"t_text"	   ,100			,50     ,false); //0
		GridObj.AddHeader("PAY"				,"±Ý¾×"				,"t_number"	   ,100.3		,70     ,false); //0		
		GridObj.AddHeader("QTY1"	    	,"¾È¾ç"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY2"	    	,"¾È¼º"	   		    ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY3"	    	,"¾È¼º(À½·á)"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY4"	    	,"¾Æ»ê"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY5"	    	,"±¸¹Ì"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY6"	    	,"ºÎ»ê"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY7"	    	,"³ì»ê"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("COM_STOCK"	    ,"°è¿­»ç\nÀç°í"	   ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("PROD_CUST_NAME"	,"°ø±Þ¾÷Ã¼"	       	,"t_text"		,1000	    ,190    ,false); //0		
		
		/* ÀÌÁß ÇØ´õ Ãß°¡ */
		GridObj.AddGroup("HD1",      		"°øÀåº° Àç°í");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
		GridObj.AppendHeader("HD1", 	 "QTY1");
		GridObj.AppendHeader("HD1",      "QTY2");
		GridObj.AppendHeader("HD1",      "QTY3");
		GridObj.AppendHeader("HD1", 	 "QTY4");	
		GridObj.AppendHeader("HD1", 	 "QTY5");
		GridObj.AppendHeader("HD1",      "QTY6");
		GridObj.AppendHeader("HD1",      "QTY7");		
		
		/* ÀúÀåÀ» À§ÇÑ È÷µç °ª */
		
		GridObj.BoundHeader();	
		
		GridObj.SetColFix('CONS_ITEM_NAME');
		
		GridObj.SetColCellAlign('GUBN',					'center');
		GridObj.SetColCellAlign('CONS_ITEM_ID',			'left');
		GridObj.SetColCellAlign('CONS_ITEM_NAME',		'left');		
		GridObj.SetColCellAlign('MEINS',				'center');
		GridObj.SetColCellAlign('REQ_QTY',				'right'); 
		GridObj.SetColCellAlign('TOT',					'right');
		GridObj.SetColCellAlign('CONV_QTY',				'right');		
		GridObj.SetColCellAlign('WAERS',				'center');
		GridObj.SetColCellAlign('PEINH',				'right');
		GridObj.SetColCellAlign('NETPR',				'right');
		GridObj.SetColCellAlign('PAY',					'right');		
		GridObj.SetColCellAlign('QTY1',					'right');
		GridObj.SetColCellAlign('QTY2',					'right');
		GridObj.SetColCellAlign('QTY3',					'right');
		GridObj.SetColCellAlign('QTY4',					'right');
		GridObj.SetColCellAlign('QTY5',					'right');
		GridObj.SetColCellAlign('QTY6',					'right');
		GridObj.SetColCellAlign('QTY7',					'right');		
		GridObj.SetColCellAlign('COM_STOCK',			'right');		
		GridObj.SetColCellAlign('PROD_CUST_NAME',		'left');				 
		  
		GridObj.SetNumberFormat("REQ_QTY",      "###,###.###");
		GridObj.SetNumberFormat("TOT",      	"###,###.###");
		GridObj.SetNumberFormat("CONV_QTY",    	"###,###.###");		
		GridObj.SetNumberFormat("PEINH",      	    "###,###");
		GridObj.SetNumberFormat("NETPR",      	    "###,###");
		GridObj.SetNumberFormat("PAY",    		"###,###.###");		
		GridObj.SetNumberFormat("QTY1",      	"###,###.###");
		GridObj.SetNumberFormat("QTY2",      	"###,###.###");
		GridObj.SetNumberFormat("QTY3",      	"###,###.###");
		GridObj.SetNumberFormat("QTY4",      	"###,###.###");
		GridObj.SetNumberFormat("QTY5",      	"###,###.###");
		GridObj.SetNumberFormat("QTY6",      	"###,###.###");
		GridObj.SetNumberFormat("QTY7",      	"###,###.###");		    
		GridObj.SetNumberFormat("COM_STOCK",	"###,###.###");	
		
}
		
	
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader2(GridObj2) {        

	var item_id 	= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;

		GridObj2.AddHeader("GUBN"			,"´Üµ¶"   			,"t_text" 		,2			,30  	,false); //0
		GridObj2.AddHeader("SELECTED"		,""   				,"t_checkbox" 	,2			,30  	,true); //0
		GridObj2.AddHeader("CONS_ITEM_ID"	,"ÀÚÀçÄÚµå"		    ,"t_text"		,100	    ,60     ,false); //0   
		GridObj2.AddHeader("CONS_ITEM_NAME"	,"ÀÚÀç¸í"	       		,"t_text"		,100	    ,190    ,false); //0
		GridObj2.AddHeader("MEINS"			,"´ÜÀ§"   			,"t_text"		,100	    ,35     ,false); //0		 	
		GridObj2.AddHeader("REQ_QTY"	    ,"Ãµ¼Ò¿ä·®"	        ,"t_number"    ,100.3		,70     ,false); //0
		GridObj2.AddHeader("TOT"	    	,"Àç°í¼ö·®"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("CONV_QTY"	    ,"¹Ú½ºÈ¯»ê"	        ,"t_number"	   ,100.3		,70     ,false); //0		
		GridObj2.AddHeader("PEINH"	    	,"°¡°Ý\n´ÜÀ§"	        ,"t_number"	   ,100.3		,50     ,false); //0
		GridObj2.AddHeader("NETPR"	    	,"´Ü°¡"	       	    ,"t_number"	   ,100.3		,55     ,false); //0
		GridObj2.AddHeader("WAERS"	    	,"ÅëÈ­Å°"		        ,"t_text"	   ,100			,50     ,false); //0
		GridObj2.AddHeader("PAY"			,"±Ý¾×"				,"t_number"	   ,100.3		,85     ,false); //0				
		GridObj2.AddHeader("QTY1"	    	,"¾È¾ç"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY2"	    	,"¾È¼º"	   		    ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY3"	    	,"¾È¼º(À½·á)"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY4"	    	,"¾Æ»ê"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY5"	    	,"±¸¹Ì"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY6"	    	,"ºÎ»ê"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY7"	    	,"³ì»ê"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("COM_STOCK"	    ,"°è¿­»ç\nÀç°í"	   ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("PROD_CUST_NAME"	,"°ø±Þ¾÷Ã¼"	       	,"t_text"		,1000	    ,190    ,false); //0		
		
		/* ÀúÀåÀ» À§ÇÑ È÷µç °ª */
		
		GridObj2.BoundHeader();	
		
		GridObj2.SetColFix('CONS_ITEM_NAME');
		
		GridObj2.SetColCellAlign('GUBN',			  'center');
		GridObj2.SetColCellAlign('CONS_ITEM_ID',		'left');
		GridObj2.SetColCellAlign('CONS_ITEM_NAME',	    'left');
		GridObj2.SetColCellAlign('MEINS',			  'center');
		GridObj2.SetColCellAlign('REQ_QTY',			   'right'); 
		GridObj2.SetColCellAlign('TOT',			       'right');
		GridObj2.SetColCellAlign('CONV_QTY',		   'right');
		GridObj2.SetColCellAlign('WAERS',			  'center');
		GridObj2.SetColCellAlign('PEINH',			   'right');
		GridObj2.SetColCellAlign('NETPR',       	   'right');
		GridObj2.SetColCellAlign('PAY',        		   'right');		
		GridObj2.SetColCellAlign('QTY1',        	   'right');
		GridObj2.SetColCellAlign('QTY2',        	   'right');
		GridObj2.SetColCellAlign('QTY3',        	   'right');
		GridObj2.SetColCellAlign('QTY4',        	   'right');
		GridObj2.SetColCellAlign('QTY5',        	   'right');
		GridObj2.SetColCellAlign('QTY6',        	   'right');
		GridObj2.SetColCellAlign('QTY7',        	   'right');
		GridObj2.SetColCellAlign('PROD_CUST_NAME',	    'left');		
		GridObj2.SetColCellAlign('COM_STOCK',          'right');
		  
		
		GridObj2.SetNumberFormat("REQ_QTY",				"###,###.###");
		GridObj2.SetNumberFormat("TOT",					"###,###.###");
		GridObj2.SetNumberFormat("CONV_QTY",			"###,###.###");		
		GridObj2.SetNumberFormat("PEINH",					"###,###");
		GridObj2.SetNumberFormat("NETPR",					"###,###");
		GridObj2.SetNumberFormat("PAY",				"###,###,###.###");		
		GridObj2.SetNumberFormat("QTY1",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY2",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY3",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY4",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY5",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY6",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY7",			"###,###,###.###");		    
		GridObj2.SetNumberFormat("COM_STOCK",		"###,###,###.###");
}
	

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() {
	
	var mode		= GridObj.GetParam("mode");
	var error_msg	= '';
	
	
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {
					
					for(var i=0;i<GridObj.GetRowCount();i++) {
								
								GridObj.SetCellBgColor('GUBN',    			i, '255|253|208');
								GridObj.SetCellBgColor('CONS_ITEM_ID',    	i, '255|253|208');	
								GridObj.SetCellBgColor('CONS_ITEM_NAME',    i, '255|253|208');
								GridObj.SetCellBgColor('MEINS', 			i, '255|253|208');
								GridObj.SetCellBgColor('REQ_QTY', 			i, '255|253|208');
								GridObj.SetCellBgColor('TOT', 				i, '255|253|208');								
								GridObj.SetCellBgColor('CONV_QTY', 			i, '255|253|208');								
								GridObj.SetCellBgColor('PEINH', 			i, '255|253|208');
								GridObj.SetCellBgColor('NETPR', 			i, '255|253|208');
								GridObj.SetCellBgColor('WAERS', 			i, '255|253|208');
								GridObj.SetCellBgColor('PAY', 				i, '255|253|208');								
								GridObj.SetCellBgColor('QTY1', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY2', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY3', 				i, '255|253|208');								
								GridObj.SetCellBgColor('QTY4', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY5', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY6', 				i, '255|253|208');								
								GridObj.SetCellBgColor('QTY7', 				i, '255|253|208');								
								GridObj.SetCellBgColor('COM_STOCK',    		i, '255|253|208');
								GridObj.SetCellBgColor('PROD_CUST_NAME',    i, '255|253|208');
								
					}

                GridObj.AddSummaryBar('SUMMARY1', 'ÀüÃ¼ÇÕ°è', 'summaryall', 'sum', 'PAY,QTY1,QTY2,QTY3,QTY4,QTY5,QTY6,QTY7,COM_STOCK');
         	    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot); 
					
		} else { 
					error_msg = GridObj.GetMessage(); 
					alert(error_msg);            
			   }
	
	}
}

function GridEndQuery2() {
	
	var mode		= GridObj2.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {

					for(var i=0;i<GridObj2.GetRowCount();i++) {

								GridObj2.SetCellBgColor('GUBN',    			i, '255|253|208');
								GridObj2.SetCellBgColor('CONS_ITEM_ID',    	i, '255|253|208');	
								GridObj2.SetCellBgColor('CONS_ITEM_NAME',   i, '255|253|208');
								GridObj2.SetCellBgColor('MEINS', 			i, '255|253|208');
								GridObj2.SetCellBgColor('REQ_QTY', 			i, '255|253|208');
								GridObj2.SetCellBgColor('TOT', 				i, '255|253|208');
								GridObj2.SetCellBgColor('CONV_QTY', 		i, '255|253|208');									
								GridObj2.SetCellBgColor('PEINH', 			i, '255|253|208');
								GridObj2.SetCellBgColor('NETPR', 			i, '255|253|208');
								GridObj2.SetCellBgColor('WAERS', 			i, '255|253|208');
								GridObj2.SetCellBgColor('PAY', 				i, '255|253|208');
								GridObj2.SetCellBgColor('QTY1', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY2', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY3', 			i, '255|253|208');	
								GridObj2.SetCellBgColor('QTY4', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY5', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY6', 			i, '255|253|208');	
								GridObj2.SetCellBgColor('QTY7', 			i, '255|253|208');
								GridObj2.SetCellBgColor('COM_STOCK',    	i, '255|253|208');
								GridObj2.SetCellBgColor('PROD_CUST_NAME',   i, '255|253|208');
								
					}

			                GridObj2.AddSummaryBar('SUMMARY2', 'ÀüÃ¼ÇÕ°è', 'summaryall', 'sum', 'PAY,QTY1,QTY2,QTY3,QTY4,QTY5,QTY6,QTY7,COM_STOCK');
			         	    GridObj2.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 
 
		} else { 
					error_msg = GridObj2.GetMessage(); 
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
    
	GridObj = document.WiseGrid;
	GridObj.ClearGrid();	
	setHeader(GridObj);    
	
	GridObj2.ClearGrid();	
	setHeader(GridObj2)
	
	doQuery();
	
	
    
}
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇÏºÎ ±×¸®µå Á¶È¸ WD1 ´õºíÅ¬¸¯
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
 
   

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var item_id	    	= document.all.item_id.value;   
       var item_name	    = document.all.item_name.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
		GridObj.SetParam("mode",			 "search");
		GridObj.SetParam("item_id",        item_id);
		GridObj.SetParam("item_name",	item_name);
		
       
	   GridObj.DoQuery(servlet_url);       
   }
   
   function doQuery2(cons_item_id) 
   {
	
       var item_id	    	= document.all.item_id.value;   
       var item_name	    = document.all.item_name.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj2.SetParam("mode",				 "search2");
	   GridObj2.SetParam("item_id",      		   item_id);
	   GridObj2.SetParam("item_name",  			 item_name);
	   GridObj2.SetParam("cons_item_id",      cons_item_id);
	   GridObj2.DoQuery(servlet_url);       
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

// Á¦Ç° ÀÔ·ÂÃ¢¿¡ ÀÔ·ÂÇÑ °ª°ú ÀÏÄ¡ÇÏ´Â Á¦Ç° °Ë»ç ÈÄ, ÀÏÄ¡ÇÏ´Â Á¦Ç°ÀÌ ÀÖÀ¸¸é Á¦Ç° ÄÚµå, Á¦Ç° ¸í Ç¥½Ã
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ÀÏÄ¡ÇÏ´Â Á¦Ç° ¾øÀ½
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}

// Á¦Ç° °Ë»ö popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup Ã¢ÀÇ input box Ç¥½Ã data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}


function excelUpload(){
	
	var service_url = "service.do?_moon_service=op_02030_Material_Refreshing_List_excel_reg_pop";  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=450, top=200, left=200";
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}

function GridChangeCell(){ //°³Ã¼°¡ ¾ø´Ù´Â ¿À·ù ÇØ°á ±¸¹®(Service.do)
	
}

function GridCellClick(){ //°³Ã¼°¡ ¾ø´Ù´Â ¿À·ù ÇØ°á ±¸¹®(Service.do)
	
}


function Dtl_Search(){ //	»ó¼¼Á¶È¸
	
	var cons_item_id="";
	var check_cnt = 0;
	
	for(var i=0;i<GridObj.GetRowCount();i++ ) {
		var chk_idx = GridObj.GetCellValue("SELECTED", i);
	
		if(chk_idx=="1"){
			check_cnt ++;
			if(check_cnt == 1){  // ÃÖÃÊ·Î ¼±ÅÃµÈ ·Î¿ì¸¦ ¸¸³µÀ» ¶§
				cons_item_id		= GridObj.GetCellvalue('CONS_ITEM_ID',    	i);
			}
			else {
				cons_item_id	+=	','+GridObj.GetCellvalue('CONS_ITEM_ID',    i);
			}
					
		}else{
			
		}
	}
doQuery2(cons_item_id);					

}

					
// ÄÃ·³ Ãà¼Ò & È®Àå
function colExtension(obj){
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetColWidth('QTY1')== 40){// true => ¼û±è »óÅÂ
		obj.value = "Ãà¼Ò";
		// ¼û±è ¸ðµå ÇØÁ¦
		
		GridObj.SetColWidth("QTY1", 		70);
		GridObj.SetColWidth("QTY2", 		70);		
		GridObj.SetColWidth("QTY3", 		70);
		GridObj.SetColWidth("QTY4", 		70);
		GridObj.SetColWidth("QTY5", 		70);		
		GridObj.SetColWidth("QTY6", 		70);
		GridObj.SetColWidth("QTY7", 		70);
		GridObj.SetColWidth("COM_STOCK",	70);
		
		GridObj.ClearSummaryBar();
		GridObj.ClearGroupMerge();

	}
	else{
		obj.value = "È®´ë";
		//¼û±è¸ðµå
		
		GridObj.SetColWidth("QTY1", 		40);
		GridObj.SetColWidth("QTY2", 		40);		
		GridObj.SetColWidth("QTY3", 		40);
		GridObj.SetColWidth("QTY4", 		40);
		GridObj.SetColWidth("QTY5", 		40);		
		GridObj.SetColWidth("QTY6", 		40);
		GridObj.SetColWidth("QTY7", 		40);
		GridObj.SetColWidth("COM_STOCK",	40);
		
	}

	if(GridObj2.GetColWidth('QTY1')== 40){// true => ¼û±è »óÅÂ
		obj.value = "Ãà¼Ò";
		// ¼û±è ¸ðµå ÇØÁ¦
		
		GridObj2.SetColWidth("QTY1",		70);
		GridObj2.SetColWidth("QTY2",		70);		
		GridObj2.SetColWidth("QTY3",		70);
		GridObj2.SetColWidth("QTY4",		70);
		GridObj2.SetColWidth("QTY5",		70);		
		GridObj2.SetColWidth("QTY6",		70);
		GridObj2.SetColWidth("QTY7",		70);
		GridObj2.SetColWidth("COM_STOCK",	70);
		
		GridObj2.ClearSummaryBar();
		GridObj2.ClearGroupMerge();
		
	}
	else{
		obj.value = "È®´ë";
		//¼û±è¸ðµå
		
		GridObj2.SetColWidth("QTY1", 		40);
		GridObj2.SetColWidth("QTY2", 		40);		
		GridObj2.SetColWidth("QTY3", 		40);
		GridObj2.SetColWidth("QTY4", 		40);
		GridObj2.SetColWidth("QTY5", 		40);		
		GridObj2.SetColWidth("QTY6", 		40);
		GridObj2.SetColWidth("QTY7", 		40);
		GridObj2.SetColWidth("COM_STOCK",	40);
	}


}
					
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid; 
       GridObj.ExcelExport("", "", true, true);
   }					
					
