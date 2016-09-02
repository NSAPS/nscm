//## ÇÁ·Î±×·¥ID      : ip_01180_import_md_PlanAnalysis_list_month.js
//## ÇÁ·Î±×·¥¸í       : ¼öÀÔ »óÇ° ¹ßÁÖ °ü¸®(¿ù)
//## º¯°æÀÚ           : ÀÌ°­¿í
//## °³¹ßÀÏÀÚ         : 2016-01-11 
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_07.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-03-18  ÀÌ°­¿í      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_01180_import_md_PlanAnalysis_list_month';

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
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.

    GridObj.nHDLineSize         = 10; //Header Size
    //GridObj.bHDMoving = true;		// ÄÃ·³ Çì´õ À§Ä¡ ÀÌµ¿
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;   
   
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; 	//Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj.strActiveRowBgColor    = "232|245|213";     //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj.strHDClickAction 	   = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {       
	
	
	var cnfm_date = document.all.cnfm_date.value;

	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "ip_01180_import_md_PlanAnalysis_list_header",{
	callback:function(result){

	  	//GridObj.AddHeader("CRUD"		   	  ,"CRUD"   			,"t_text"  	   ,100		,0  	,false); //0
	  	GridObj.AddHeader("SALES_CAT05"	      ,"´ëºÐ·ù"	    		,"t_text"      ,100	    ,0     ,false); //0
		GridObj.AddHeader("SALES_CAT03"	      ,"¼ÒºÐ·ù"	    		,"t_text"      ,100	    ,100     ,false); //0
		GridObj.AddHeader("ITEM_ID"	          ,"Ç°¸ñÄÚµå"			,"t_text" 	   ,100	    ,70     ,false); //0   
	 	GridObj.AddHeader("ITEM_NAME"	      ,"Ç°¸ñ¸í"	        	,"t_text" 	   ,100	    ,180    ,false); //0
	 	
	 	//GridObj.AddHeader("AVL_STOCK"	      ,"ÃÑ°¡¿ëÀç°í"		,"t_number"    ,100.3	,70     ,false); //0 	
	 	//GridObj.AddHeader("NS_STOCK"	      ,"±âÃÊÀç°í"	 	,"t_number"    ,100.3	,70     ,false); //0
	 	//GridObj.AddHeader("EXP_STOCK"	      ,"»ç¿ÜÀç°í"   		,"t_number"    ,100.3	,70     ,false); //0
	 	GridObj.AddHeader("GUBN"  		      ,"±¸ºÐ"				,"t_text"      ,100		,80     ,false); //0
	 	GridObj.AddHeader("GUBN_IDX"  		  ,"±¸ºÐ¼ø¼­"			,"t_text"      ,100		,0      ,false); //0
	 	GridObj.AddHeader("NO_FLAG"  		  ,"Á¦Ç°±¸ºÐ"			,"t_text"      ,100		,0      ,false); //0
	 	GridObj.AddHeader("THREE_MON"  		  ,"3°³¿ùÆò±Õ"			,"t_text"      ,100		,00      ,false); //0
	 	GridObj.AddHeader("BOX_CUM"  		  ,"´©°è"				,"t_number"    ,100.3	,60      ,false); //0		
 

			for(var i=0 ; i < 12 ; i++){  
				if(i < result.length) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" ,100.3	,60  	,true);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 12) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" ,100.3	,60  	,true);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" ,100.3	,60 	,true);
					}
				}
			}
		GridObj.AddHeader("TP_FLAG"	       	  ,"Å¸ÀÓÆæ½º"   			,"t_number"    ,100.3	,70     ,false); //0	
		GridObj.AddHeader("TIMEFANCE_SORT"	  ,"TIMEFANCE_SORT"   	,"t_number"    ,100.3	,70     ,false); //0
		GridObj.BoundHeader();
		
		//GridObj.SetNumberFormat("AVL_STOCK",       	"###,###.#");
	    //GridObj.SetNumberFormat("NS_STOCK",     	"###,###.#");
	    //GridObj.SetNumberFormat("EXP_STOCK",        "###,###.#");
	    GridObj.SetNumberFormat("BOX_CUM",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_12",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_11",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_10",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_9",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_8",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_7",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_6",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_5",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_4",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_3",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_2",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_1",       	"###,###.#");
	   
	    
	    GridObj.SetColFix('ITEM_NAME'); 
		GridObj.SetColCellAlign('SALES_CAT05',        'left');
		GridObj.SetColCellAlign('SALES_CAT03',        'left');
	    GridObj.SetColCellAlign('ITEM_ID',            'left');
	  	GridObj.SetColCellAlign('ITEM_NAME',          'left');
	    
	    //°ú°Å 6°³¿ù
	    GridObj.SetColCellBgColor('MONTH_12','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_11','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_10','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_9','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_8','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_7','255|253|208');
		//GridObj.SetColHide("CRUD", true); 
		//GridObj.SetCRUDMode("CRUD"); 			
		
		}
		
	});
 	
 	
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
//            	SetThreeMonth();            	
            	GridSetStock();
            	SetTimeFence();
            	CheckStock(); 
            	CalBoxCum();           	           	
             
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
   
   	var search_type = document.frm.search_type.value;
  
//	if( search_type == "" || search_type == null || search_type == 00 ) {
//		alert("ºê·£µå À¯ÇüÀ» ¼±ÅÃÇÏ½Ê½Ã¿ä!");
//		return;
//	}   	
   	
   	
    doQuery();
   }




/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var cnfm_date	    = document.all.cnfm_date.value;      
       cnfm_date 			= cnfm_date.replace(/-/g,"");
     
	   var user_id			= document.all._user_id.value;         
       var search_type	    = document.all.search_type.value;		//ºê·£µå À¯Çü
       var sales_cat05		= document.all.sales_cat05.value;
       //var search_item		= document.all.search_item.value;       //°Ë»ö¾î
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",           	"search");
       GridObj.SetParam("cnfm_date",  		cnfm_date);
       GridObj.SetParam("user_id",       	user_id);
       GridObj.SetParam("search_type",  	search_type);	
       GridObj.SetParam("sales_cat05",  	sales_cat05);	
	   //GridObj.SetParam("search_item",  	search_item);	   
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
	
	var user_id		= document.all._user_id.value; 
	var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
	var cnfm_date	= document.frm.cnfm_date.value;
	var no_flag		= GridObj.GetCellValue('NO_FLAG',nRow);	
	var three_mon   = GridObj.GetCellValue('THREE_MON',nRow);	
	
	var service_url = "service.do?_moon_service=ip_01130_import_md_PlanAnalysis_list_pop";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date + "&no_flag=" + no_flag + "&three_mon=" + three_mon + "&user_id=" + user_id;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=1135, height=740, top=50, left=200";
	var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();			
	
}

function HeaderClick(strColumnKey){
	
}

function GridChangeCell(strColumnKey, nRow, vtOldValue, vtNewValue){
	
//	if(strColumnKey == 'WEEK_0'){
//		
//		var start_hd_name	= 'WEEK_0';
//		var hd_name 		= start_hd_name;
//		var hd_name_1 		= start_hd_name.substr(0,5);
//		var hd_name_2 		= start_hd_name.substr(5,6);
//		
//			for(var i=0; i<26; i++){
//				
//				hd_name_2 = Number(hd_name_2)+Number(1);						
//				hd_name = hd_name_1+hd_name_2;
//			
//				GridObj.SetCellValue(hd_name, nRow,  vtNewValue);
//			}
//		
//	}
	
	GridSetStock();
	
	CheckStock();
}	

/*Àç°í Èå¸§Àü°³ Default*/
function GridSetStock(){
	
	var cur_stock;
	var reciept_expt;
	var sales_expt;
	var next_stock;	
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID');   //¼Ò°è ÀÎµ¦½º ±¸ÇÏ±â
	for (var i=0; i<rowcount; i++){
		
		var start_hd_name	= 'MONTH_6';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,6);
		var hd_name_2 		= start_hd_name.substr(6,7);		
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);	
		
		for(var j =0; j < 5; j++){
			
			cur_stock 		= GridObj.GetCellValue(hd_name,idx);
			reciept_expt 	= GridObj.GetCellValue(hd_name,idx+1);
			sales_expt		= GridObj.GetCellValue(hd_name,idx+2);
			
			
			next_stock		= Number(cur_stock) + Number(reciept_expt) - Number(sales_expt);
			
			hd_name_2 	= Number(hd_name_2)-Number(1);						
			hd_name 	= hd_name_1+hd_name_2;
			
			GridObj.SetCellValue(hd_name, idx,  next_stock);
			
		}			
	}		
}

/*½ÅÁ¦Ç° 3°³¿ù Æò±Õ Àü°³*/
function SetThreeMonth(){
	
	var rowcount = GridObj.GetRowCount();
	
	
	var date = new Date();	
	var remain_day = Number(8) - date.getDay();	
	
	for(var i=0; i<rowcount; i++){
		
		var flag = GridObj.GetCellValue('NO_FLAG',i);
		if(flag == "NEW") {
			
			GridObj.SetCellBgColor('GUBN', i , '212|244|250');
			GridObj.SetCellValue('GUBN',i,'3°³¿ù ÁÖÆò±Õ');
			for(var j=1; j<13; j++){
			
				hd_name = 'MONTH_' + j ;
				if(GridObj.GetCellValue(hd_name,i)==0){
					
					if(hd_name == 'MONTH_1') GridObj.SetCellValue(hd_name,i,Math.round(GridObj.GetCellValue('THREE_MON',i)/Number(7) * remain_day ,0));
					else GridObj.SetCellValue(hd_name,i,GridObj.GetCellValue('THREE_MON',i));
					
				}
			
			}
		}
	}
	
	var mergecount = GridObj.GetMergeCount('ITEM_ID');   //¼Ò°è ÀÎµ¦½º ±¸ÇÏ±â
	
    for (var i=0; i<mergecount; i++){
     	
     	var no_flag = GridObj.GetCellValue('NO_FLAG',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(2));		//°¢ Merge ´ÜÀÇ Ã¹ ¹øÂ° Row °ªÀ» ¹Þ¾Æ¿Â´Ù.
     	GridObj.SetCellValue('NO_FLAG',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false),no_flag);
     	GridObj.SetCellValue('NO_FLAG',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(1),no_flag);
     	
     	var no_flag = GridObj.GetCellValue('THREE_MON',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(2));		//°¢ Merge ´ÜÀÇ Ã¹ ¹øÂ° Row °ªÀ» ¹Þ¾Æ¿Â´Ù.
     	GridObj.SetCellValue('THREE_MON',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false),no_flag);
     	GridObj.SetCellValue('THREE_MON',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(1),no_flag);
     
      	   
     }
     
     
}

/*Å¸ÀÓÆæ½º Àü°³*/
/*Àü¿ù ÆÇ¸Å·® ±âÁØ Å¸ÀÓÆæ½º ¾Õ´ç±ä´Ù */
function SetTimeFence(){		
	
	var hd_name ;
	var fence ;
	var rowcount	= GridObj.GetRowCount();
	
	for(var i =0; i < rowcount; i++){
		fence		= GridObj.GetCellValue('TP_FLAG',i);
		
		
		for(var j=fence; j>0; j--){
			
			hd_name		= 'MONTH_'+j;				
			GridObj.SetCellBgColor(hd_name,i,'255|255|0');
		}
					
	}
	
}

function CheckStock(){
	
	var rowcount = GridObj.GetRowCount();
	
	
	for( var j =0; 3*j < rowcount; j++){
			
			for (var i =0; i < 6; i++){
				
					var hd_name = 'MONTH_'+ (Number(6) - Number(i)) ;
					var stock 	 = GridObj.GetCellValue(hd_name, j * 3);
					var tp_flag  = GridObj.GetCellValue('TP_FLAG',j * 3);
					if (stock < 0) {
						
							if ( i < tp_flag) {
								GridObj.SetCellBgColor(hd_name, j * 3 , '255|54|54');
								GridObj.SetCellBgColor('ITEM_ID', j * 3 , '255|54|54');
								
								GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 , tp_flag - i );
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 , tp_flag - i );	
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 , tp_flag - i );							
								
							}
							else{
								
								GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 ,  tp_flag - i );
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 ,  tp_flag - i );	
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 ,  tp_flag - i );	
							}		
						break;
								
					}
					GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 ,  -99 );
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 ,  -99 );	
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 ,  -99 );	
			}	
	}
	
	
	
}

function CheckStock2(){
	
	var rowcount = GridObj.GetRowCount();
	
	
	for( var j =0; 3*j < rowcount; j++){
			
			for (var i =0; i < 6; i++){
				
					var hd_name = 'MONTH_'+ (Number(6) - Number(i)) ;
					
					var stock 	 = GridObj.GetCellValue(hd_name, j * 3);
					var tp_flag  = GridObj.GetCellValue('TP_FLAG',j * 3);
					if (stock < 0) {
						
						
								GridObj.SetCellBgColor(hd_name, j * 3 , '255|54|54');
								GridObj.SetCellBgColor('ITEM_ID', j * 3 , '255|54|54');
						break;
								
					}
					GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 ,  -99 );
					GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 ,  -99 );	
					GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 ,  -99 );	
			}	
	}
	
	
	
}

function sort(){
	
	GridObj.ClearGroupMerge();
	GridObj.SetColCellSort('TIMEFANCE_SORT','descending');
	GridSetMerge();
}

function GridSetMerge(){

	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME');
    GridObj.AddSummaryBar('SUMMARY1', '¼Ò°è', 'ITEM_ID', 'sum', ''); 
    GridObj.AddSummaryBar('SUMMARY2', 'ÇÕ°è', 'summaryall', 'sum', '');      

       
	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
}


function CalBoxCum(){
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID'); 
	
	for (var i =0; i < rowcount; i ++){		
		
		var start_hd_name	= 'MONTH_12';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,6);
		var hd_name_2 		= start_hd_name.substr(6,7);
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		var box_cum			= 0;
		
		
		for(var j =0; j < 12; j++){
			
			cur_stock 		= GridObj.GetCellValue(hd_name,idx);
			reciept_expt 	= GridObj.GetCellValue(hd_name,idx+1);
			sales_expt		= GridObj.GetCellValue(hd_name,idx+2);
			
			box_cum	+= Number(sales_expt);
			
			hd_name_2 	= Number(hd_name_2)-Number(1);						
			hd_name 	= hd_name_1+hd_name_2;
			
			
			
		}			
		GridObj.SetCellValue('BOX_CUM', idx+2,  box_cum);
	}
	
}

function SafeStock(){	
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID');   //¼Ò°è ÀÎµ¦½º ±¸ÇÏ±â
	for (var i=0; i<rowcount; i++){
		
		var start_hd_name	= 'MONTH_6';
		var pre_hd_name		= 'MONTH_7';
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);	
		
	
			
			pre_sales		= GridObj.GetCellValue(pre_hd_name,idx+2);
			cur_stock 		= GridObj.GetCellValue(start_hd_name,idx);
			reciept_expt 	= GridObj.GetCellValue(start_hd_name,idx+1);
			sales_expt		= GridObj.GetCellValue(start_hd_name,idx+2);
			
			
			GridObj.SetCellValue(start_hd_name, idx,	cur_stock -   pre_sales);
			
			
	}
	
	GridSetStock();
	//SetTimeFence();
	CheckStock(); 
	
	
}

function changeValue(obj){
	
	var sales_cat05 = obj.value;
	var search_type = document.frm.search_type.options;
	

	
	
	commonUtil.getSelQeury( "sales_cat05", sales_cat05, "ip_01130_import_md_PlanAnalysis_list_combo",{
	callback:function(result){
			
			//¿É¼Ç Áö¿ì±â ÇöÀç select option °¹¼ö¸¸Å­
			for(var i = search_type.length-1 ; i >=1 ; i--){
		
		   		search_type.options[i] =null;
		  	}
			
			//¿É¼Ç Ã¤¿ì±â result °¹¼ö¸¸Å­¸¸
			for(var i=0; i<result.length ; i++) {
	 
	   		search_type.options[i+1] = new Option(result[i][1],result[i][0]);
	  		}
			
				
		
		}
		
	});
	
	
}

