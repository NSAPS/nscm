//## ÇÁ·Î±×·¥ID      : sc_01110_realStockReg_list_new.js
//## ÇÁ·Î±×·¥¸í      : ÀÚÀç Àç°í µî·Ï ¹× Á¶Á¤
//## º¯°æÀÚÀÚ        : ¿ìÁ¾±Õ
//## °³¹ßÀÏÀÚ        : 2011-11-01 È­¿äÀÏ
//##
//## °ü·Ã job file   : job_sinc_20_scheduling_03.xml
//## °ü·Ã query file : query_sinc_20_scheduling_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-11-01  ¿ìÁ¾±Õ      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'sc_01110_realStockReg_list_new';

var GridObj ; 													// WiseGrid °´Ã¼
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
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj.strHDClickAction = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
      
       
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {        

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	//GridObj.SetColHide("CRUD", true); 
 	GridObj.AddHeader("PLANT_ID"	  ,"°øÀå¹øÈ£"	         ,"t_text"     ,100	    ,0    ,false); //0
	GridObj.AddHeader("PLANT_NAME"	  ,"°øÀå"		     ,"t_text"	   ,100	    ,100  ,false); //0
 	GridObj.AddHeader("ITEM_ID"	      ,"ÀÚÀçÄÚµå"		     ,"t_text" 	   ,100	    ,90   ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	  ,"ÀÚÀç¸í"	         ,"t_text" 	   ,100	    ,210  ,false); //0
 	GridObj.AddHeader("SPEC"		  ,"±Ô°Ý"	         ,"t_text" 	   ,100	    ,110  ,false); //0
 	GridObj.AddHeader("ERP_QTY"		  ,"ERP  Àç°í(EA)"    ,"t_number"   ,100.3	,90   ,false); //0
 	GridObj.AddHeader("REAL_QTY"	  ,"½ÇÀç°í ¼ö·®(EA)"	 ,"t_number"   ,100.3	,110   ,true); //0
 	GridObj.AddHeader("BASE_UOM"	  ,"BASE_UOM"        ,"t_text" 	   ,100	    ,0    ,false); //0
    GridObj.AddHeader("CONV_QTY"	  ,"È¯»ê ´ÜÀ§"	     ,"t_number"   ,100	    ,70    ,true); //0
 	GridObj.AddHeader("CONV_UOM"	  ,"CONV_UOM"	     ,"t_text"     ,100.3   ,0    ,false); //0
 	GridObj.AddHeader("ITYPE"	      ,"ÀÚÀç±¸ºÐ"	         ,"t_text" 	   ,100	    ,0    ,false); //0
 	GridObj.AddHeader("MOD_FLAG"	  ,"Ç°¸ñ±¸ºÐ"	         ,"t_text" 	   ,100	    ,0    ,false); //0
    GridObj.AddHeader("BOX_QTY"	      ,"È¯»ê ¼ö·®(BOX)"	 ,"t_number"   ,100.3   ,110   ,true) //0
 	GridObj.AddHeader("SAFETY_STOCK"  ,"¾ÈÀü Àç°í(EA)"	 ,"t_number"   ,100.3   ,100   ,true); //0

	/* ÀúÀåÀ» À§ÇÑ È÷µç °ª */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('PLANT_NAME','center');
    GridObj.SetColCellAlign('ITEM_ID','left'); 
    GridObj.SetColCellAlign('ITEM_NAME','left');
    GridObj.SetColCellAlign('SPEC','left');
    GridObj.SetColCellAlign('ERP_QTY','right');
    GridObj.SetColCellAlign('REAL_QTY','right'); 
    GridObj.SetColCellAlign('CONV_UOM','right');
    GridObj.SetColCellAlign('CONV_QTY','right');
    GridObj.SetColCellAlign('BOX_QTY','right');
    GridObj.SetColCellAlign('SAFETY_STOCK','right');

    
    GridObj.SetNumberFormat("ERP_QTY",      "###,###.#");
    GridObj.SetNumberFormat("REAL_QTY",     "###,###.#");
    GridObj.SetNumberFormat("CONV_QTY",     "###,###.#");
    GridObj.SetNumberFormat("BOX_QTY",      "###,###.#");
    GridObj.SetNumberFormat("SAFETY_STOCK", "###,###.#");

	
	GridObj.SetCRUDMode("CRUD");  // AD¿Í DE°¡ ¼ÂÆÃ µÉ °æ¿ì´Â ¾ø´Ù.
	//Hidden ÄÃ·³
	GridObj.SetColHide("CRUD",true);

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
		  	GridObj.AddSummaryBar('SUMMARY', 'ÀüÃ¼ÇÕ°è', 'summaryall', 'sum', 'ERP_QTY,REAL_QTY,BOX_QTY');
		  	GridObj.SetSummaryBarColor('SUMMARY', '0|153|0', color_tot); 
				for(var i=0;i<GridObj.GetRowCount();i++) { 
						GridObj.SetCellBgColor('REAL_QTY', i, color_edit_col);
						GridObj.SetCellBgColor('CONV_QTY', i, color_edit_col);
						GridObj.SetCellBgColor('BOX_QTY', i, color_edit_col);
						GridObj.SetCellBgColor('SAFETY_STOCK', i, color_edit_col);
				}    
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
function GridCellClick(strColumnKey, nRow) {
	
}	
               
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
 
   
// µ¥ÀÌÅÍ ÀúÀå
function GoSave  (service) {

    var in_cnfm_date	    = document.all.in_cnfm_date.value;
    var sel_plant	        = document.all.sel_plant.value;   
    var sel_halb_type	    = document.all.sel_halb_type.value;
   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
    GridObj.SetParam("in_cnfm_date",  in_cnfm_date);
    GridObj.SetParam("sel_plant",     sel_plant);
	GridObj.SetParam("sel_halb_type", sel_halb_type);
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

	if(sel_plant == 'SUM'){
	   alert("°øÀåº°·Î Á¶È¸ÈÄ ÀÛ¾÷ÇÏ½Ê½Ã¿ä.");
	   return;
	}
	GridObj.DoQuery(servlet_url, "CRUD");
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	// user_id
	
//	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.

}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var in_cnfm_date	        = document.all.in_cnfm_date.value;
       var sel_plant	        = document.all.sel_plant.value;   
       var sel_halb_type	    = document.all.sel_halb_type.value;
       var servlet_url          = Project_name+"/servlet/com.wisegrid.admin."+job_id;       
  
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_cnfm_date",  in_cnfm_date);
       GridObj.SetParam("sel_plant",     sel_plant);
	   GridObj.SetParam("sel_halb_type", sel_halb_type);
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
//--------------------------------------   main_template ¿¡ Á¤ÀÇµÈ Event ---------------------------------------------------//
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid Cell Change Event
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/

//
function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	var sel_plant	        = document.all.sel_plant.value;
	
	/* 1 */
	if(sel_plant == 'SUM'){
	   alert("°øÀåº°·Î Á¶È¸ÈÄ ÀÛ¾÷ÇÏ½Ê½Ã¿ä.");
	   GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	   return;
	}
	if(strColumnKey == 'REAL_QTY'){
		cal_box_qty(nRow, strColumnKey)
	}else if(strColumnKey == 'CONV_QTY'){
		cal_ea_qty(nRow, strColumnKey)
	}else if(strColumnKey == 'BOX_QTY'){
		cal_box_qty(nRow, strColumnKey)
	}
		
 	
}

/* EA¼ö·®À» ¹Þ¾Æ¼­ BOX ¼ö·®À¸·Î È¯»ê*/
function cal_box_qty(nRow, strColumnKey) {


	var real_qty = 0; //500
	var conv_qty = 0 ;
	var box_qty	 = 0;
	
		real_qty	= Number(GridObj.GetCellValue("REAL_QTY", nRow));
		conv_qty	= Number(GridObj.GetCellValue("CONV_QTY", nRow));
		box_qty	    = Number(GridObj.GetCellValue("BOX_QTY",  nRow));
		
	if( conv_qty == null || conv_qty == "" || conv_qty == "0" ) {
		var conv_qty = 1;
	}

	box_qty = Math.round(real_qty / conv_qty);
	GridObj.SetCellValue("BOX_QTY", nRow,  box_qty);
			
}

/* BOX¼ö·®À» ¹Þ¾Æ¼­  EA¼ö·®À¸·Î È¯»ê*/
function cal_ea_qty(nRow, strColumnKey) {

	var real_qty = 0; //500
	var conv_qty = 0 ;
	var box_qty	 = 0;
		real_qty	= Number(GridObj.GetCellValue("REAL_QTY", nRow));
		conv_qty	= Number(GridObj.GetCellValue("CONV_QTY", nRow));
		box_qty	    = Number(GridObj.GetCellValue("BOX_QTY",  nRow));
		
	if( conv_qty == null || conv_qty == "" || conv_qty == "0" ) {
		var conv_qty = 1;
	}

	real_qty = Math.round(conv_qty * box_qty);
	GridObj.SetCellValue("REAL_QTY", nRow,  real_qty);	
}