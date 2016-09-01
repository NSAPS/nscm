//## ÇÁ·Î±×·¥ID      : rp_01140_transProgressTransBill_list.js
//## ÇÁ·Î±×·¥¸í      : ¼ö¼Û ÀüÇ¥º° ¼ö¼ÛÁøÇà »óÈ²
//## °³¹ßÀÚ          : ÇãÁØ¼º
//## °³¹ßÀÏÀÚ        : 2008-09-08 ¿ù¿äÀÏ
//##
//## °ü·Ã job file   : job_sinc_40_replenishmentPlanning_00.xml
//## °ü·Ã query file : query_sinc_40_replenishmentPlanning_00.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2010-10-26  ¿ìÁ¾±Õ      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'rp_01140_transProgressTransBill_list';
var GridObj ; 													// WiseGrid °´Ã¼
var GridObj2;

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
   
function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	setHeader2(GridObj2);  	//ÇØ´õ»ý¼º 
	setDefault2();        	//È­¸é ±âº» ¼³Á¤ 
}     
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;   
    
   
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
	GridObj.strActiveRowBgColor = "170|170|170";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.strCellFontName = '¸¼Àº °íµñ'; 
    //GridObj.bStatusbarVisible = false;				// status bar visible »óÅÂ¹Ù ¼³Á¤ 
    
    //GridObj.bRowSelectorVisible = true   
         
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	GridObj2.bRowSelectorIndex   = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.
    GridObj2.nHDLineSize         = 18; //Header Size
    //GridObj2.strHDClickAction  = "sortsingle";
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj2.nHDLines = 2;        
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    GridObj2.strHDClickAction = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
	//GridObj2.strActiveRowBgColor = "170|170|170";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	//GridObj2.strCellFontName = '¸¼Àº °íµñ'; 

}
	// status bar visible »óÅÂ¹Ù ¼³Á¤ 
    
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
//    GridObj4.strSelectedCellFgColor = '180|82|205';
//    GridObj4.strHDClickAction = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
	//GridObj4.strActiveRowBgColor = "170|170|170";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
//	GridObj4.nCellFontSize = 9;					// Font Size 9
//}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {        

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
//	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,60  ,false);
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0   
	
	//GridObj.SetColHide("CRUD", true); 
	GridObj.AddHeader("TRANS_DATE"		,"¼ö¼ÛÀÏÀÚ"		    ,"t_text"	    ,20		  ,80    ,false); //0   
 	GridObj.AddHeader("SRC_LOC_ID"	    ,"SRC_LOC_ID"		,"t_text" 	    ,100	   ,0    ,false); //0   
 	GridObj.AddHeader("SRC_LOC"	        ,"Ãâ°íÀå¸í"		    ,"t_text" 	    ,100	  ,65    ,false); //0   
 	GridObj.AddHeader("TGT_LOC_ID"		,"TGT_LOC_ID"	    ,"t_text" 	    ,100	   ,0    ,false); //0
 	GridObj.AddHeader("TGT_LOC"		    ,"ÀÔ°íÀå¸í"	        ,"t_text" 	    ,100	  ,80    ,false); //0
 	GridObj.AddHeader("TRUCK_SEQ"		,"Â÷·®¹øÈ£"	        ,"t_number" 	,100	  ,65    ,false); //0
 	GridObj.AddHeader("BRAND_NO"		,"ÀüÇ¥¹øÈ£"		    ,"t_text"	    ,100	  ,75    ,false); //0
 	GridObj.AddHeader("PLT_QTY"		    ,"PLT¼ö·®"		    ,"t_number" 	,100.3	  ,65    ,false); //0    
 	GridObj.AddHeader("BOX_QTY"			,"BOX¼ö·®"		    ,"t_number" 	,100.3	  ,65    ,false); //0
 	GridObj.AddHeader("PLAN_TYPE"		,"¼ö¼Û"		        ,"t_text" 	    ,100	   ,0    ,false); //0
	GridObj.AddHeader("PLAN_TYPE_NAME"	,"¼ö¼ÛÀ¯Çü"	        ,"t_text" 	    ,100	 ,100    ,false); //0 	   
 	GridObj.AddHeader("MADE_TIME"		,"¹ßÇà½Ã°£"		    ,"t_text" 	    ,160	  ,90    ,false); //0
 	GridObj.AddHeader("CHGO_TIME"		,"Ãâ°í½Ã°£"		    ,"t_text" 	    ,160	  ,90    ,false); //0
 	GridObj.AddHeader("IPGO_TIME"		,"ÀÔ°í½Ã°£"		    ,"t_text" 	    ,160	  ,90    ,false); //0
 	GridObj.AddHeader("LOAD_TIME"		,"»óÂ÷½Ã°£"		    ,"t_text" 	    ,160	  ,65    ,false); //0
 	GridObj.AddHeader("TRANS_TIME"		,"¼ö¼Û½Ã°£"		    ,"t_text" 	    ,160	  ,65    ,false); //0
 	GridObj.AddHeader("TOT_TIME"		,"ÃÑ¼Ò¿ä½Ã°£"		    ,"t_text" 	    ,160	  ,75    ,false); //0
 	GridObj.AddHeader("TRANS_STATE"		,"¸¶°¨±¸ºÐ"		    ,"t_text" 	    ,160	  ,70    ,false); //0
 	GridObj.AddHeader("MICHGO"		    ,"¹ÌÃâ°í¼ö·®"		    ,"t_number"     ,100.3	  ,70    ,false); //0

	/* ÀúÀåÀ» À§ÇÑ È÷µç °ª */

	GridObj.BoundHeader();	

//    GridObj.SetColCellAlign('DEFAULT_GUBN','center'); 
    GridObj.SetColCellAlign('TRANS_DATE','center');
    GridObj.SetColCellAlign('SRC_LOC','center'); 
    GridObj.SetColCellAlign('TGT_LOC','center');
    GridObj.SetColCellAlign('TRUCK_SEQ','center');
    GridObj.SetColCellAlign('BRAND_NO','center');
    GridObj.SetColCellAlign('PLT_QTY','right'); 
    GridObj.SetColCellAlign('BOX_QTY','right');
    GridObj.SetColCellAlign('PLAN_TYPE_NAME','center');
    GridObj.SetColCellAlign('MADE_TIME','center');
    GridObj.SetColCellAlign('CHGO_TIME','center');
    GridObj.SetColCellAlign('IPGO_TIME','center');
    GridObj.SetColCellAlign('LOAD_TIME','center');
    GridObj.SetColCellAlign('TRANS_TIME','center');
    GridObj.SetColCellAlign('TOT_TIME','center');
    GridObj.SetColCellAlign('TRANS_STATE','center');
    GridObj.SetColCellAlign('MICHGO','right');
    
    GridObj.SetNumberFormat("PLT_QTY", "##,##0.#");
    GridObj.SetNumberFormat("BOX_QTY", "##,##0.#");
    GridObj.SetNumberFormat("MICHGO",  "##,##0.#");
    
//    GridObj.SetColCellAlign('ALLOC_FLAG','center'); 
//	  GridObj.SetColFix('ITEM_NAME');

	//GridObj.SetColCellBgColor('SEL_DMD',color_edit_col);//±âÁØÀç°í
    //GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
	//GridObj.SetColHDBgColor('TOT_STOCK','253|228|229');
    //GridObj.bCellFontBold = true; 
	
	//GridObj.SetCRUDMode("CRUD");  // AD¿Í DE°¡ ¼ÂÆÃ µÉ °æ¿ì´Â ¾ø´Ù.
	//Hidden ÄÃ·³
	//GridObj.SetColHide("CRUD",true);

}




function setHeader2(GridObj2) { // ¼¼ºÎÁ¤º¸

  	GridObj2.AddHeader("PROD_CODE"		,"Á¦Ç°ÄÚµå"    ,"t_text"   	,100	 ,100    ,false); //0 
  	GridObj2.AddHeader("PROD_NAME"	    ,"Á¦Ç°¸í"      ,"t_text" 	 	,100	 ,180    ,false); //0  
  	GridObj2.AddHeader("TP_BOX"	        ,"PLT¼ö·®"     ,"t_number" 	,100.3	  ,70    ,false); //0   
  	GridObj2.AddHeader("TP_PLT"	        ,"BOX¼ö·®"     ,"t_number" 	,100.3	  ,70    ,false); //0
  	GridObj2.AddHeader("TA_BOX"	        ,"PLT¼ö·®"     ,"t_number" 	,100.3	  ,70    ,false); //0   
  	GridObj2.AddHeader("TA_PLT"	        ,"BOX¼ö·®"     ,"t_number" 	,100.3	  ,70    ,false); //0
   	GridObj2.AddHeader("TRANS_STATE"	,"¸¶°¨±¸ºÐ"     ,"t_text" 	,100     ,100    ,false); //0
  	GridObj2.AddHeader("MICHGO"	        ,"¹ÌÃâ°íºÐ·®"   ,"t_number"  	,100.3	 ,100    ,false); //0

	/* ÀÌÁß ÇØ´õ Ãß°¡ */
	GridObj2.AddGroup("HD1"	,"¼ö¼Û°èÈ¹");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj2.AppendHeader("HD1", "TP_PLT");
	GridObj2.AppendHeader("HD1", "TP_BOX");
	GridObj2.AddGroup("HD2"	,"¼ö¼Û½ÇÀû");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj2.AppendHeader("HD2", "TA_PLT");
	GridObj2.AppendHeader("HD2", "TA_BOX");
	 	    
	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('PROD_CODE','center'); 
    GridObj2.SetColCellAlign('PROD_NAME',  'left');
    GridObj2.SetColCellAlign('TP_PLT',    'right');
    GridObj2.SetColCellAlign('TP_BOX',	  'right');
    GridObj2.SetColCellAlign('TA_PLT',	  'right');
    GridObj2.SetColCellAlign('TA_BOX',	  'right');
    GridObj2.SetColCellAlign('TRANS_STATE','center');
    GridObj2.SetColCellAlign('MICHGO',	  'right');
   
    GridObj2.SetNumberFormat("TP_PLT", "##,##0.#");
    GridObj2.SetNumberFormat("TP_BOX", "##,##0.#");
    GridObj2.SetNumberFormat("TA_PLT", "##,##0.#");
    GridObj2.SetNumberFormat("TA_BOX", "##,##0.#");
    GridObj2.SetNumberFormat("MICHGO", "##,##0.#");

}
	// ÄÃ·³ °íÁ¤

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery(){
	
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';
    
    //alert("endMode="+endMode);  
    if(endMode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
    {
        if(GridObj.GetStatus() == "true") 
        {            
		  	GridObj.AddSummaryBar('SUMMARY', 'ÀüÃ¼ÇÕ°è', 'summaryall', 'sum', 'PLT_QTY,BOX_QTY,MICHGO');
		  	GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 

        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			GridObj2.SetGroupMerge(	'PROD_CODE,PROD_NAME');
		  	GridObj2.AddSummaryBar('SUMMARY', 'ÀüÃ¼ÇÕ°è', 'summaryall', 'sum', 'TP_PLT,TP_BOX,TA_PLT,TA_BOX,MICHGO');
		  	GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {
}	
               
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
    doQuery();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇÏºÎ ±×¸®µå Á¶È¸ WD1 ´õºíÅ¬¸¯
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellDblClick(strColumnKey, nRow){     
	doQuery2(nRow);		
}        
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var trans_start	        = document.all.trans_start.value;
       var trans_end	        = document.all.trans_end.value;   
       
       var search_item	    	= document.all.search_item.value;
       
       //var item_id				= document.all.item_id.value;
       var selected_src_loc	    = document.all.selected_src_loc.value;
       var selected_tgt_loc	    = document.all.selected_tgt_loc.value;
       var selected_plan_type	= document.all.selected_plan_type.value;
       var servlet_url          = Project_name+"/servlet/com.wisegrid.admin."+job_id;       
//       var sort_flag	= document.all.sort_flag.value;  
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("trans_start",        		  trans_start);
       GridObj.SetParam("trans_end",          		    trans_end);
       
       
       GridObj.SetParam("search_item", 				   search_item);
       
       //GridObj.SetParam("item_id",						  item_id);
	   GridObj.SetParam("selected_src_loc",   	selected_src_loc);
	   GridObj.SetParam("selected_tgt_loc",   	selected_tgt_loc);
	   GridObj.SetParam("selected_plan_type", selected_plan_type);
	   GridObj.DoQuery(servlet_url);       
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 2 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery2(nRow) { //¼¼ºÎÁ¤º¸

       var trans_date	    = GridObj.GetCellValue("TRANS_DATE", nRow);
       var src_loc	        = GridObj.GetCellValue("SRC_LOC_ID", nRow);
       var tgt_loc	        = GridObj.GetCellValue("TGT_LOC_ID", nRow);
       var truck_seq	    = GridObj.GetCellValue("TRUCK_SEQ",  nRow);
       var brand_no	        = GridObj.GetCellValue("BRAND_NO",  nRow);
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("trans_date", trans_date);
	GridObj2.SetParam("src_loc", 	src_loc);
	GridObj2.SetParam("tgt_loc", 	tgt_loc);
	GridObj2.SetParam("truck_seq",  truck_seq);
	GridObj2.SetParam("brand_no", 	brand_no);
	GridObj2.DoQuery(servlet_url);
}
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

















//--------------------------------------   main_template ¿¡ Á¤ÀÇµÈ Event ---------------------------------------------------//
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid Cell Change Event
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/


//