//## ÇÁ·Î±×·¥ID      : ip_05040_WMS_CloseInfo_Scm_list_pop.js
//## ÇÁ·Î±×·¥¸í      : WMS Ãâ°í¸¶°¨º° »çÀ¯°ü¸® (ÆË¾÷)
//## º¯°æÀÚÀÚ        : ÀÌ°­¿í
//## °³¹ßÀÏÀÚ        : 2015-03-16
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_04.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0		2015-03-16	CREATOR		½Å±Ô
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_05040_WMS_CloseInfo_Scm_list_pop';

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
	
	var test = document.frm.col_flag.value;
	var test2 = document.frm.cnfm_date.value;	
	
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
	
	GridObj.AddHeader("CRUD"		   	   ,"CRUD"   		,"t_text"  	   ,100		,0  	,false); //0
	GridObj.AddHeader("DC_ID"	           ,"DCÄÚµå"			,"t_text" 	   ,100	    ,70     ,false); //0   
	GridObj.AddHeader("DC_NAME"	           ,"DC¸í"			,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_ID"	           ,"Ç°¸ñÄÚµå"		,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"Ç°¸ñ¸í"	        ,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("GUBN_IDX"	       ,"¸¶°¨±¸ºÐ"		,"t_text" 	   ,100	    ,0    	,false); //0 
 	GridObj.AddHeader("GUBN"	           ,"¸¶°¨±¸ºÐ"		,"t_text" 	   ,100	    ,140    ,false); //0   
 	GridObj.AddHeader("ODER_BOX"	       ,"ÁÖ¹®"			,"t_number"    ,100.3	,70     ,false); //0   
 	GridObj.AddHeader("SELL_BOX"	       ,"¸¶°¨"			,"t_number"    ,100.3	,70     ,false); //0   
 	GridObj.AddHeader("REMN_BOX"		   ,"Â÷ÀÌ"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("GUBN_SCM"	       ,"SCM ¸¶°¨±¸ºÐ"	,"t_combo"     ,100	    ,90     ,true); //0 	
 	GridObj.AddHeader("BIGO"		       ,"ºñ°í"			,"t_text" 	   ,100	    ,180    ,true); //0
 
	/* ÀúÀåÀ» À§ÇÑ È÷µç °ª */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('DC_ID',        'center'); 
    GridObj.SetColCellAlign('DC_NAME',      'left');
    GridObj.SetColCellAlign('ITEM_ID',      'center');
    GridObj.SetColCellAlign('ITEM_NAME',    'left');
    GridObj.SetColCellAlign('GUBN',       	'center');
    GridObj.SetColCellAlign('ODER_BOX',     'right'); 
    GridObj.SetColCellAlign('SELL_BOX',     'right');
    GridObj.SetColCellAlign('REMN_BOX',     'right'); 
    GridObj.SetColCellAlign('GUBN_SCM',     'right');
    GridObj.SetColCellAlign('BIGO',        	'center');
    
    
    GridObj.SetNumberFormat("ODER_BOX",     "###,###.#");
    GridObj.SetNumberFormat("SELL_BOX",     "###,###.#");
    GridObj.SetNumberFormat("REMN_BOX",     "###,###.#");

	GridObj.SetColCellBgColor('GUBN_SCM',color_edit_col);	

	GridObj.SetColHide("CRUD", true);

	GridObj.SetCRUDMode("CRUD");   
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
            	
            	//GridSetCombo();
            	GridSetMerge();
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }	
        else if(endMode == "doSave"){
            	
            	if(GridObj.GetStatus() == "true"){
            		doQuery();
            	}
            }
        
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
function GoSave(service) {
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	doSave();	
	
};


      
// ÀúÀå
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	 var cnfm_date	    = document.frm.cnfm_date.value;
     
    
  
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	GridObj.SetParam("cnfm_date",  cnfm_date);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	
	GridObj.DoQuery(servlet_url, "CRUD");
	
 	
 	return;
}    


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
   	   var itype			=   document.frm.itype.value;
       var cnfm_date	    = 	document.frm.cnfm_date.value;      
       var col_flag 		=	document.frm.col_flag.value; 
       var search_type		=	document.frm.search_type.value;
       
       var reason; 		
 	   if(col_flag =='5')		reason = '1';
 	   else if(col_flag =='6')		reason = '2';
 	   else if(col_flag =='7')		reason = '3';
 	   else if(col_flag =='8')		reason = '4';
 	   else if(col_flag =='9')		reason = '5';
 	   else							reason = '0';
	 	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
  		
       GridObj.SetParam("mode",           		"search");
       GridObj.SetParam("cnfm_date",  			cnfm_date);
       GridObj.SetParam("reason",  				reason);
       GridObj.SetParam("itype",  				itype);
       GridObj.SetParam("search_type",			search_type);
	 
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


/*Sort º¯¼ö ¼±¾ð */

	var flag_dc_id 		 = '1';	
	var flag_dc_name	 = '1';
	var flag_item_id	 = '1';	
	var flag_item_name 	 = '1';
	
	var flag_oder_box = '1';
	var flag_sell_box = '1';
	var flag_remn_box = '1';
	

function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('DC_ID'			,true);
	GridObj.SetColCellSortEnable('DC_NAME'			,true);
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('ODER_BOX'			,true);
	GridObj.SetColCellSortEnable('SELL_BOX'			,true);
	GridObj.SetColCellSortEnable('REMN_BOX'			,true);
	
	GridObj.ClearGroupMerge();
	
	if(strColumnKey == 'DC_ID') {
		
		if(flag_dc_id =='1'){
			
			GridObj.SetColCellSort('DC_ID','descending');
		
			flag_dc_id++;
		}
		else if(flag_dc_id =='2'){
			
			GridObj.SetColCellSort('DC_ID','asceding');
		
			flag_dc_id--;
		}
	}
	
	if(strColumnKey == 'DC_NAME') {
		
		if(flag_dc_name =='1'){
			
			GridObj.SetColCellSort('DC_NAME','descending');
		
			flag_dc_name++;
		}
		else if(flag_dc_name =='2'){
			
			GridObj.SetColCellSort('DC_NAME','asceding');
		
			flag_dc_name--;
		}
	}
	
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
	if(strColumnKey == 'ODER_BOX') {
		
		if(flag_oder_box =='1'){
		
			GridObj.SetColCellSort('ODER_BOX','descending');
			flag_oder_box++;
		}
		else if(flag_oder_box =='2'){
			
			GridObj.SetColCellSort('ODER_BOX','asceding');
			
			flag_oder_box--;	
			
		}
	}
	if(strColumnKey == 'SELL_BOX') {
		
		if(flag_sell_box =='1'){
		
			GridObj.SetColCellSort('SELL_BOX','descending');
			flag_sell_box++;
		}
		else if(flag_sell_box =='2'){
			
			GridObj.SetColCellSort('SELL_BOX','asceding');
			
			flag_sell_box--;	
			
		}
	}
	if(strColumnKey == 'REMN_BOX') {
		
		if(flag_remn_box =='1'){
		
			GridObj.SetColCellSort('REMN_BOX','descending');
			flag_remn_box++;
		}
		else if(flag_remn_box =='2'){
			
			GridObj.SetColCellSort('REMN_BOX','asceding');
			
			flag_remn_box--;	
			
		}
	}
	
	GridSetMerge();
		
}

function Synchronize() {
      var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
   
       GridObj.SetParam("mode",           		"Synchronize");      
	   GridObj.DoQuery(servlet_url);  
	
}

//function GridSetCombo(){
//	
//	var sel_gubn;
//
//	for(i=0; i<GridObj.GetRowCount(); i++){
//		
//		var gubn_val = GridObj.GetCellValue('GUBN_SCM', i);
//		GridObj.SetComboSelectedIndex('GUBN_SCM',i,gubn_val);
//	
//	}
//	
//
//	
//}

function GridSetMerge(){
	
				
		GridObj.SetGroupMerge('DC_ID');
        GridObj.AddSummaryBar('SUMMARY1', '¼Ò°è', 'DC_ID', 'sum', 'ODER_BOX,SELL_BOX,REMN_BOX'); 
   		GridObj.AddSummaryBar('SUMMARY2', 'ÇÕ°è', 'summaryall', 'sum', 'ODER_BOX,SELL_BOX,REMN_BOX');
  	       
    	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
				
			
}

