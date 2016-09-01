/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_01100_monthly_Stock_Prod_Sales_analysis_list';
var GridObj ; 													// WiseGrid °´Ã¼

var color_tot = '255|234|0';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


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

    GridObj.nHDLineSize         = 26; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'    
}

       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        

   var search_flag  = document.all.search_flag.value;

if(search_flag=="DAILY"){
	GridObj.AddHeader("ITEM_ID"			,"Ç°¸ñÄÚµå"    	,"t_text" 	    ,100	,100  ,false); 
	GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"    		,"t_text" 	    ,100    ,130  ,false);
 	GridObj.AddHeader("SALE_DATE"		,"ÆÇ¸ÅÀÏÀÚ"       ,"t_text" 	    ,100	,150  ,false);    
 	GridObj.AddHeader("STOCK_QTY"		,"±âÃÊÀç°í"       ,"t_number" 	,100	,120  ,false);    
 	GridObj.AddHeader("QTY1"	        ,"ÀÏ¹Ý"          ,"t_number" 	,100.3	,100  ,false);    
  	GridObj.AddHeader("QTY2"	        ,"Å¸°èÁ¤"         ,"t_number" 	,100.3	,100  ,false); 
 	GridObj.AddHeader("PROD_QTY"		,"»ý»ê½ÇÀû"       ,"t_number" 	,100	,120  ,false);   

    /* ÀÌÁß ÇØ´õ Ãß°¡ */
	GridObj.AddGroup("HD1",    "ÆÇ¸Å½ÇÀû");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj.AppendHeader("HD1",  "QTY1");
	GridObj.AppendHeader("HD1",  "QTY2");
	
	GridObj.BoundHeader();	
	
    GridObj.SetColCellAlign('ITEM_ID',		'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
    GridObj.SetColCellAlign('SALE_DATE',	'center'); 
    GridObj.SetColCellAlign('STOCK_QTY',	 'right'); 
    GridObj.SetColCellAlign('QTY1',	         'right');
    GridObj.SetColCellAlign('QTY2',	         'right');
    GridObj.SetColCellAlign('PROD_QTY',		 'right');     
     
    GridObj.SetNumberFormat('STOCK_QTY',   '#,##0.#');
    GridObj.SetNumberFormat('QTY1',        '#,##0.#');
    GridObj.SetNumberFormat('QTY2',        '#,##0.#');
    GridObj.SetNumberFormat('PROD_QTY',    '#,##0.#'); 
		
} else if(search_flag=="MONTH"){
	GridObj.AddHeader("ITEM_ID"			,"Ç°¸ñÄÚµå"    	,"t_text" 	    ,100	,100  ,false); 
	GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"    		,"t_text" 	    ,100    ,130  ,false);
 	GridObj.AddHeader("SALE_DATE"		,"ÆÇ¸ÅÀÏÀÚ"       ,"t_text" 	    ,100	,150  ,false);    
 	GridObj.AddHeader("QTY1"	        ,"ÀÏ¹Ý"          ,"t_number" 	,100.3	,100  ,false);    
  	GridObj.AddHeader("QTY2"	        ,"Å¸°èÁ¤"         ,"t_number" 	,100.3	,100  ,false); 
 	GridObj.AddHeader("PROD_QTY"		,"»ý»ê½ÇÀû"       ,"t_number" 	,100	,120  ,false);   

    /* ÀÌÁß ÇØ´õ Ãß°¡ */
	GridObj.AddGroup("HD1",    "ÆÇ¸Å½ÇÀû");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj.AppendHeader("HD1", "QTY1");
	GridObj.AppendHeader("HD1", "QTY2");
	
	GridObj.BoundHeader();	
	
    GridObj.SetColCellAlign('ITEM_ID',		'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
    GridObj.SetColCellAlign('SALE_DATE',	'center'); 
 
    GridObj.SetColCellAlign('QTY1',	     'right');
    GridObj.SetColCellAlign('QTY2',	     'right');
    GridObj.SetColCellAlign('PROD_QTY',	 'right');     

    GridObj.SetNumberFormat('QTY1',     '#,##0.#');
    GridObj.SetNumberFormat('QTY2',     '#,##0.#');
    GridObj.SetNumberFormat('PROD_QTY', '#,##0.#'); 	
}

	//GridObj.SetCRUDMode("CRUD", "»ý¼º", "¼öÁ¤", "»èÁ¦");

	//Hidden ÄÃ·³
	//GridObj.SetColHide("CRUD",true);
       
}
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
    
     var search_flag  = document.all.search_flag.value;
     
     GridObj = document.WiseGrid;
	 GridObj.ClearGrid();
	 setHeader(GridObj);  
     
      if(search_flag=="DAILY"){
       doQuery();
   } else if(search_flag=="MONTH"){
   	   doQuery2();
   }
   	}
  
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "save");
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url, "CRUD");

}
      
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var in_fr_date   = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var search_flag  = document.all.search_flag.value;
       var search_item  = document.frm.search_item.value;
       var itype  		= document.all.itype.value;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", 	  in_fr_date);
       GridObj.SetParam("in_to_date", 	  in_to_date);
       GridObj.SetParam("search_flag", 	 search_flag);
       GridObj.SetParam("search_item",	 search_item);
       GridObj.SetParam("itype",	 	       itype);
       GridObj.DoQuery(servlet_url);
   }
   
   function doQuery2() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var in_fr_date   = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var search_flag  = document.all.search_flag.value;
       var search_item  = document.frm.search_item.value;
       var itype  		= document.all.itype.value;

       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search2");
       GridObj.SetParam("in_fr_date", 	  in_fr_date);
       GridObj.SetParam("in_to_date", 	  in_to_date);
       GridObj.SetParam("search_flag", 	 search_flag);
       GridObj.SetParam("search_item",	 search_item);
       GridObj.SetParam("itype",	 	       itype);
       GridObj.DoQuery(servlet_url);
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

				// ÇÕ°è
//	GridObj.AddSummaryBar('SUMMARY', 'ÀüÃ¼ÇÕ°è', 'summaryall', 'sum', 'STOCK_QTY,SALE_QTY,PROD_QTY'); 
//	GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 

                     
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
		
    }


   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

function GridCellClick(strColumnKey, nRow){
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
    function setGridAutoResize( tab_h, table_h ){
        
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
        
    }  
    