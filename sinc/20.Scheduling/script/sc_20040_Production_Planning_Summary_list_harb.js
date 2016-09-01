//## ÇÁ·Î±×·¥ID      : sc_20040_Production_Planning_Summary_list_harb.js
//## ÇÁ·Î±×·¥¸í      : »ý»ê°èÈ¹¿ä¾à
//## º¯°æÀÚÀÚ        : ÀÌ°­¿í
//## °³¹ßÀÏÀÚ        : 2014-08-18 È­¿äÀÏ
//##
//## °ü·Ã job file   : job_sinc_20_scheduling_03.xml
//## °ü·Ã query file : query_sinc_20_scheduling_03.xml
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'sc_20040_Production_Planning_Summary_list_harb';

var GridObj ; 													// WiseGrid °´Ã¼
var color_tot 		 = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö 
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

function setHeader(GridObj) {        
	
	var param = "work_date!%!job_id";

	var value = document.frm.work_date.value + "!%!"

			  			  + job_id;

	commonUtil.getCodeList(param, value , "sc_20040_Production_Planning_GetDate",defaultHeader); 


}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤

  ¦¢DB¿¡ µî·ÏµÈ È­¸é ÇØ´õ Á¤º¸¸¦ °¡Á®¿Â´Ù.

  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/

function defaultHeader(result){
	
	GridObj.ClearGrid();
	
	var len = result.length;
	
	GridObj.AddHeader("PLANT_ID"	      	  ,"°øÀå¹øÈ£"	    ,"t_text"      ,100	    ,0     ,false); //0
	GridObj.AddHeader("HID_NAME"	      	  ,"»ý»ê°øÀå"	    ,"t_text"      ,100	    ,80     ,false); //0
	GridObj.AddHeader("ITEM_ID"	     		  ,"Á¦Ç°¹øÈ£"		,"t_text"	   ,80	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_NAME"	          ,"Á¦Ç°¸í"			,"t_text" 	   ,100	    ,265    ,false); //0   
 	GridObj.AddHeader("SPEC"	     	  ,"SPEC"	        ,"t_text" 	   ,100	    ,120    ,false); //0

   // Çì´õ »ý¼º
		
	   for( var i=0 ;i<len ;i++) //ÀüÃ¼ Row¸¸Å­ ¹Ýº¹ ÇÑ´Ù.

   {

       GridObj.AddHeader("DAY"+i	 	,result[i]	,"t_number"    ,100.3	,70     ,false); //0
      

    }
	  GridObj.AddHeader("WEEK_SUM"	  ,"ÁÖ°£°è"	,"t_number"    ,100.3	,80     ,false); //0
	 
	 
      GridObj.BoundHeader();  
    
    GridObj.SetColCellAlign('PLANT_ID',              'center');  
    GridObj.SetColCellAlign('HID_NAME',              'center'); 
    GridObj.SetColCellAlign('ITEM_ID',               'center');
    GridObj.SetColCellAlign('ITEM_NAME',        	   'left');
    GridObj.SetColCellAlign('SPEC',        	  		 'center');
    GridObj.SetColCellAlign("WEEK_SUM",        	      'right');
    
    	for( var i=0 ;i<len ;i++) {
    		 GridObj.SetColCellAlign("DAY"+i	,         'right');
       		 GridObj.SetNumberFormat("DAY"+i	,     	  "###,###.#");
    	}
   
    GridObj.SetNumberFormat("WEEK_SUM",     	  "###,###.#");
	
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
              	GridObj.SetGroupMerge('PLANT_ID,HID_NAME'); 
              	GridObj.AddSummaryBar('SUMMARY1', '°øÀåº° ÇÕ°è', 'HID_NAME', 'sum', 'DAY0,DAY1,DAY2,DAY3,DAY4,DAY5,DAY6,WEEK_SUM');
	      	  	GridObj.AddSummaryBar('SUMMARY2', 'ÀüÃ¼ ÇÕ°è', 'summaryall', 'sum', 'DAY0,DAY1,DAY2,DAY3,DAY4,DAY5,DAY6,WEEK_SUM');
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);

                     
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
        checkCellColor();   //Á¶È¸ ÈÄ Hidden°ªÀÌ YÀÎ, Áï ÀüÁÖ ¸ñ¿äÀÏ ÀÌÈÄ º¯°æµÈ ¿À´õ CELLÀÇ °æ¿ì »ö»óº¯°æ
		
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
   	
   	if(item_type == null || item_type == ""){
		//alert("Á¶È¸À¯ÇüÀ» ¼±ÅÃÇÏ½Ê½Ã¿ä!");
   		//return
   	}
	var param = "work_date!%!job_id";

	var value = document.frm.work_date.value + "!%!"

			  			  + job_id;

	commonUtil.getCodeList(param, value , "sc_20040_Production_Planning_GetDate",defaultHeader); 
   	
    doQuery();
   }


// µ¥ÀÌÅÍ ÀúÀå
function GoSave  (service) {

   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

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
       var work_date	    = document.all.work_date.value;
       var item_type	    = document.all.item_type.value;   
       var domain			= document.all.domain.value;
       var search_type	    = document.all.search_type.value;
       var multi_flag		= document.all.multi_flag.value;
       var box_flag			= document.all.box_flag.value;
       var sum_type			= document.all.sum_type.value;   
       var search_item	    = document.all.search_item.value;
       var week				= document.all.week.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("work_date",   work_date);
       GridObj.SetParam("item_type",       item_type);
	   GridObj.SetParam("domain",     domain);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("multi_flag", multi_flag);
	   GridObj.SetParam("box_flag", box_flag);
	   GridObj.SetParam("sum_type", sum_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("week", week);
	   GridObj.DoQuery(servlet_url);    
	   
	   
   }

function checkCellColor(){
	
	
	var len = GridObj.GetRowCount();
	
	for (var i=0; i<len; i++){
		
		var day0 =	GridObj.GetCellHiddenValue('DAY0',i);
		var day1 =	GridObj.GetCellHiddenValue('DAY1',i);
		var day2 =	GridObj.GetCellHiddenValue('DAY2',i);
		var day3 =	GridObj.GetCellHiddenValue('DAY3',i);
		var day4 =	GridObj.GetCellHiddenValue('DAY4',i);
		var day5 =	GridObj.GetCellHiddenValue('DAY5',i);
		var day6 =	GridObj.GetCellHiddenValue('DAY6',i);
		
		if( day0 == 'Y')
		GridObj.SetCellBgColor('DAY0',i,'255|228|0');
		if( day1 == 'Y')
		GridObj.SetCellBgColor('DAY1',i,'255|228|0');
		if( day2 == 'Y')
		GridObj.SetCellBgColor('DAY2',i,'255|228|0');
		if( day3 == 'Y')
		GridObj.SetCellBgColor('DAY3',i,'255|228|0');
		if( day4 == 'Y')
		GridObj.SetCellBgColor('DAY4',i,'255|228|0');
		if( day5 == 'Y')
		GridObj.SetCellBgColor('DAY5',i,'255|228|0');
		if( day6 == 'Y')
		GridObj.SetCellBgColor('DAY6',i,'255|228|0');
		
	}
	
}
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridCellDblClick(strColumnKey, nRow){

}

  