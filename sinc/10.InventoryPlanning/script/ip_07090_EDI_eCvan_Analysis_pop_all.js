//## ÇÁ·Î±×·¥ID      : ip_07090_EDI_eCvan_Analysis_pop_all.js
//## ÇÁ·Î±×·¥¸í      : edi ecvan ÆË¾÷
//## º¯°æÀÚÀÚ        : ÀÌ°­¿í
//## °³¹ßÀÏÀÚ        : 2015-07-20
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_04.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-07-20  ÀÌ°­¿í      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_07090_EDI_eCvan_Analysis_pop_all';

var GridObj ; 	
var GridObj2 ;												// WiseGrid °´Ã¼
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

        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px"; 
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
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj.strActiveRowBgColor    = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj.strHDClickAction 	   = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}

function setDefault2() { 

	//GridObj.bRowSelectorVisible = false;        		//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	
	GridObj2.bRowSelectorIndex = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.

    GridObj2.nHDLineSize         = 10; //Header Size
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj2.nHDLines = 2;  
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
	GridObj2.strSelectedCellFgColor = '0|0|0';
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj2.strActiveRowBgColor    = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj2.strHDClickAction 	   = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj2.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
       
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {
	
	GridObj.AddHeader("CNFM_DATE"		,"ÀÏÀÚ"			,"t_text"	,100	,80  ,false); //0   
	
 	GridObj.AddHeader("ITEM_ID"			,"Ç°¸ñÄÚµå"		,"t_text"	,100	,65 ,false); //0
 	GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"		,"t_text" 	,100	,170 ,false); //0    
 	GridObj.AddHeader("CUST_CODE"		,"°Å·¡Ã³ÄÚµå"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"°Å·¡Ã³¸í"		,"t_text" 	,100	,190  ,false); //0
 	GridObj.AddHeader("EDI_BOX"			,"¹ßÁÖ·®"		,"t_number" ,100.3	,50  ,false); //0
 	GridObj.AddHeader("SELL_BOX"		,"ÆÇ¸Å·®"		,"t_number" ,100.3	,50  ,false); //0
 	GridObj.AddHeader("DEFAULT_BOX"		,"¹Ì³³·®"		,"t_number" ,100.3	,50  ,false); //0
 	GridObj.AddHeader("DEFAULT_CODE_NS"	,"»çÀ¯¸í"     	,"t_combo" 	,100	,120  ,true); //0   	
 	GridObj.AddHeader("DC_ID"			,"¹è¼ÛÁöÁ¡"		,"t_text" 	,100	,0  ,false); //0   
 	GridObj.AddHeader("DC_NAME"			,"¹è¼ÛÁöÁ¡"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("DEPT_CODE"		,"¿µ¾÷ÁöÁ¡ÄÚµå"	,"t_text" 	,100	,0  ,false); //0   
 	GridObj.AddHeader("DEPT_NAME"		,"¿µ¾÷ÁöÁ¡"		,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("HAN_NAME"		,"´ã´çÀÚ"		,"t_text" 	,100	,50  ,false); //0  
 	GridObj.AddHeader("BIGO"			,"ºñ°í"			,"t_text" 	,100	,140  ,false); //0   

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('CNFM_DATE','center'); 
    
    GridObj.SetColCellAlign('ITEM_ID','center'); 
    
    GridObj.SetColCellAlign('DC_NAME','center');
    GridObj.SetColCellAlign('CUST_CODE','center');
    GridObj.SetColCellAlign('DEPT_NAME','center');
    GridObj.SetColCellAlign('HAN_NAME','center');
    GridObj.SetColCellAlign('BIGO','left');
	
	GridObj.SetNumberFormat("EDI_BOX",       	"###,###.#");
	GridObj.SetNumberFormat("SELL_BOX",       	"###,###.#");
	GridObj.SetNumberFormat("DEFAULT_BOX",      "###,###.#");
	GridObj.SetColCellBgColor('DEFAULT_CODE_NS',color_edit_col);

}

function setHeader2(GridObj2) {
	
	GridObj2.AddHeader("CNFM_DATE"		,"ÀÏÀÚ"			,"t_text"	,100	,80  ,false); //0   
	
 	GridObj2.AddHeader("ITEM_ID"		,"Ç°¸ñÄÚµå"		,"t_text"	,100	,65 ,false); //0
 	GridObj2.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"			,"t_text" 	,100	,170 ,false); //0    
 	GridObj2.AddHeader("CUST_CODE"		,"°Å·¡Ã³ÄÚµå"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj2.AddHeader("CUST_NAME"		,"°Å·¡Ã³¸í"		,"t_text" 	,100	,190  ,false); //0
 	GridObj2.AddHeader("EDI_BOX"		,"¹ßÁÖ·®"			,"t_number" ,100.3	,50  ,false); //0
 	GridObj2.AddHeader("SELL_BOX"		,"ÆÇ¸Å·®"			,"t_number" ,100.3	,50  ,false); //0
 	GridObj2.AddHeader("DEFAULT_BOX"	,"¹Ì³³·®"			,"t_number" ,100.3	,50  ,false); //0
 	GridObj2.AddHeader("DEFAULT_CODE_NS","»çÀ¯¸í"     	,"t_combo" 	,100	,120  ,true); //0   	
 	GridObj2.AddHeader("DC_ID"			,"¹è¼ÛÁöÁ¡"		,"t_text" 	,100	,0  ,false); //0   
 	GridObj2.AddHeader("DC_NAME"		,"¹è¼ÛÁöÁ¡"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj2.AddHeader("DEPT_CODE"		,"¿µ¾÷ÁöÁ¡ÄÚµå"	,"t_text" 	,100	,0  ,false); //0   
 	GridObj2.AddHeader("DEPT_NAME"		,"¿µ¾÷ÁöÁ¡"		,"t_text" 	,100	,100  ,false); //0   
 	GridObj2.AddHeader("HAN_NAME"		,"´ã´çÀÚ"			,"t_text" 	,100	,50  ,false); //0  
 	GridObj2.AddHeader("BIGO"			,"ºñ°í"			,"t_text" 	,100	,140  ,false); //0   

	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('CNFM_DATE','center'); 
    
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    
    GridObj2.SetColCellAlign('DC_NAME','center');
    GridObj2.SetColCellAlign('CUST_CODE','center');
    GridObj2.SetColCellAlign('DEPT_NAME','center');
    GridObj2.SetColCellAlign('HAN_NAME','center');
    GridObj2.SetColCellAlign('BIGO','left');
	
	GridObj2.SetNumberFormat("EDI_BOX",       	"###,###.#");
	GridObj2.SetNumberFormat("SELL_BOX",       	"###,###.#");
	GridObj2.SetNumberFormat("DEFAULT_BOX",      "###,###.#");
	GridObj2.SetColCellBgColor('DEFAULT_CODE_NS',color_edit_col);

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
            	
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
    
     
		
    }
	
	function GridEndQuery2() 
    {
    	
        var endMode = GridObj2.GetParam("mode2");
        var error_msg = '';
          
        if(endMode == "search2") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
        {
            if(GridObj2.GetStatus() == "true") 
            {   
            	
            	GridSetMerge2();
             
            } else    
            { 
            	
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
   function GoSearch(service) 
   {
    	
    	   doQuery();  
    	   doQuery2();  
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇÏºÎ ±×¸®µå Á¶È¸ WD1 ´õºíÅ¬¸¯
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
	function GoSave(service) {	
	
	};


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {   		
   	   var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");     
       var end_date			= document.all.end_date.value.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");       
	   var user_id			= document.all._user_id.value;     
       var item_type		= document.all.item_type.value;
       var default_code_ns	= document.all.default_code_ns.value; 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
              	
      
      //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",   end_date);
       GridObj.SetParam("item_type",   item_type);
       GridObj.SetParam("default_code_ns", default_code_ns);
	 
	   GridObj.DoQuery(servlet_url);       
   }
	
 function doQuery2() 
   {   		
   	   var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");     
       var end_date			= document.all.end_date.value.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");       
	   var user_id			= document.all._user_id.value;     
       var item_type		= document.all.item_type.value;
       var default_code_ns	= document.all.default_code_ns.value; 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
              	
      
      //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj2.SetParam("mode",           "search2");
       GridObj2.SetParam("start_date",   start_date);
       GridObj2.SetParam("end_date",   end_date);
       GridObj2.SetParam("item_type",   item_type);
       GridObj2.SetParam("default_code_ns", default_code_ns);
	 
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

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
	function GridCellClick(strColumnKey, nRow) {
	
	}		

//	function GridCellDblClick(strColumnKey, nRow){	
//		
//		var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
//		var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
//		var cnfm_date	= document.frm.end_date.value;
//		
//		
//		if( strColumnKey == 'STOCK_EXPT'){
//			
//			var service_url = "service.do?_moon_service=ip_01140_inventoryPlanAnalysis_md_list_pop";
//			service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date;  
//			var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
//			var newWin = window.open(service_url, "", pop_win_style);
//			newWin.focus();		
//			
//		}	
//
//	}

function GridSetMerge(){
	
	var rowCount = GridObj.GetRowCount();		
		if (rowCount == 0) return;
     	 	
	   	GridObj.AddSummaryBar('SUMMARY2', 'ÇÕ°è', 'summaryall', 'sum', 'EDI_BOX,SELL_BOX,DEFAULT_BOX'); 
 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//³ì»ö
				 
}

function GridSetMerge2(){
	
	var rowCount = GridObj2.GetRowCount();		
		if (rowCount == 0) return;
     	 	
	   	GridObj2.AddSummaryBar('SUMMARY2', 'ÇÕ°è', 'summaryall', 'sum', 'EDI_BOX,SELL_BOX,DEFAULT_BOX'); 
 		GridObj2.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//³ì»ö
				 
}
