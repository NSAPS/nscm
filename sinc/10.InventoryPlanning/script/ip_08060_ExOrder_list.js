//## ÇÁ·Î±×·¥ID		: ip_08060_ExOrder_list.js
//## ÇÁ·Î±×·¥¸í		: ÇØ¿Ü¿µ¾÷ ÁÖ¹®¸®½ºÆ®
//## º¯°æÀÚ			: ÀÌ°­¿í
//## °³¹ßÀÏÀÚ			: 2016-05-10
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_08.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_08.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_08060_ExOrder_list';

var GridObj ; 									// WiseGrid °´Ã¼
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
    GridObj.strMouseWheelAction	   = 'page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;		
       
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) { 
	
	GridObj.AddHeader("ROWNUM"	   	,"¼ø¼­"  		,"t_number"     ,100.3		,40     ,false); //0 
	GridObj.AddHeader("ORDER_NO"	,"ÁÖ¹®¹øÈ£"		,"t_text" 	    ,100	    ,80     ,false); //0  
	GridObj.AddHeader("ORDER_USER"	,"ÁÖ¹® ÀÔ·ÂÀÚ"  	,"t_text"     	,100		,80     ,false); //0  
 	GridObj.AddHeader("ORDER_DAY"	,"ÁÖ¹® ÀÔ·ÂÀÏ"		,"t_text" 	   	,100	    ,80     ,false); //0
 	GridObj.AddHeader("ORDER_TIME"	,"ÁÖ¹® ÀÔ·Â½Ã°¢"	,"t_text" 	   	,100	    ,90     ,false); //0   
 	GridObj.AddHeader("BRAND_NO"	,"³³Ç°¹øÈ£"	    ,"t_text" 	   	,100	    ,80    ,false); //0
 	GridObj.AddHeader("BRAND_DAY"	,"³³Ç° ÀÔ·ÂÀÏ"		,"t_text"  		,100		,80    	,false); //0
 	GridObj.AddHeader("BRAND_TIME"	,"³³Ç° ÀÔ·Â½Ã°¢"	,"t_text"  		,100		,90    	,false); //0
 	
 	
 	GridObj.AddHeader("ORDER_QTY"	,"¼ö·®"			,"t_number"  	,100.3		,70    	,false); //0
 	GridObj.AddHeader("ITEM_ID"		,"Ç°¸ñÄÚµå"		,"t_text"  		,100		,80     ,false); //0
 	GridObj.AddHeader("ITEM_NAME"	,"Ç°¸ñ¸í"			,"t_text"  		,100		,260    ,false); //0
 	GridObj.AddHeader("CUST_CODE"	,"°Å·¡¼± ÄÚµå"		,"t_text"  		,100		,0    	,false); //0
 	GridObj.AddHeader("CUST_NAME"	,"°Å·¡¼±"			,"t_text"  		,100		,220    ,false); //0
 	GridObj.AddHeader("ZPLDAT"		,"»ý»ê¿äÃ»ÀÏ"		,"t_text"  		,100		,80    	,false); //0
 	

 	
	GridObj.BoundHeader();	
	
	GridObj.SetColCellAlign('ROWNUM',  		'center'); 
	GridObj.SetColCellAlign('ORDER_NO',  		'center'); 
	GridObj.SetColCellAlign('ORDER_USER',  		'center'); 
	GridObj.SetColCellAlign('ORDER_DAY',  		'center'); 
	GridObj.SetColCellAlign('ORDER_TIME',  		'center'); 
	GridObj.SetColCellAlign('BRAND_NO',  		'center'); 
	GridObj.SetColCellAlign('BRAND_DAY',  		'center'); 
	GridObj.SetColCellAlign('BRAND_TIME',  		'center'); 
	GridObj.SetColCellAlign('ITEM_ID',  		'center'); 
	GridObj.SetColCellAlign('ITEM_NAME',  		'left');
	GridObj.SetColCellAlign('CUST_CODE',  		'center'); 
	GridObj.SetColCellAlign('CUST_NAME',  		'left'); 
	GridObj.SetColCellAlign('ZPLDAT',  			'center'); 
	
	
	GridObj.SetNumberFormat("ORDER_QTY",       	"###,###.#");
	
	GridObj.SetColCellBgColor('ROWNUM','255|255|200');

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
    doQuery();
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
   var start_date	    = document.frm.start_date.value;
   start_date 			= start_date.replace(/-/g,"");
   var end_date	    	= document.frm.end_date.value;
   end_date 			= end_date.replace(/-/g,"");
   var domain			= document.frm.domain.value;   
   var search_item		= document.frm.search_item.value;
   var order_no			= document.frm.order_no.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("end_date",   		end_date);
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("domain",   		domain);
   GridObj.SetParam("search_item",		search_item);		
   GridObj.SetParam("order_no",			order_no);
   GridObj.DoQuery(servlet_url);       
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ´õºí Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellDblClick(strColumnKey, nRow) {
	
	

}



function GridSetMerge(){	
	
	GridObj.SetGroupMerge('ORDER_NO,ORDER_USER,ORDER_DAY,ORDER_TIME,BRAND_NO,BRAND_DAY,BRAND_TIME,CUST_CODE,CUST_NAME,ZPLDAT');
	
    GridObj.AddSummaryBar('SUMMARY1', 'ÀüÇ¥º° °è', 'ORDER_NO', 'sum', 'ORDER_QTY');
    GridObj.AddSummaryBar('SUMMARY2', 'ÀüÃ¼ °è'	, 'summaryall', 'sum', 'ORDER_QTY');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 


}


