//## ÇÁ·Î±×·¥ID		:	op_02070_event_plan_Info.vm
//## ÇÁ·Î±×·¥¸í		:	À¯Åëº»ºÎ ÆÇÃË°èÈ¹ Á¤º¸  Excel ¾÷·Îµå
//## °³¹ßÀÚ          :	¿ìÁ¾±Õ 
//## °³¹ßÀÏÀÚ       	:	2013-07-11
//##
//## °ü·Ã job file   : job_sinc_30_orderPlanning_03.xml
//## °ü·Ã query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-07-11  ¿ìÁ¾±Õ      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id				= 'op_02070_event_plan_info';
var GridObj ; 													// WiseGrid °´Ã¼
											// WiseGrid °´Ã¼

var color_tot			= '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col		= '255|253|208';
var color_sp			= '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row	= '141|232|141';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö
var colBg01 			= '224|255|224';			//255|255|153
var colBg02 			= '255|255|255';


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue		= window.innerWidth;
            maxHeightValue		= window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue		= document.body.clientWidth;
            maxHeightValue		= document.body.clientHeight;
        } 
        
        var tabHeightValue		= Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue	= Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h 			= document.frm.search_h.value; 
        
        // È­¸é size Ãà¼Ò ½Ã È­¸éÀÌ ³Ê¹« ÀÛ¾Æ ±×¸®µå Å©±â°¡ À½¼ö°¡ µÇ¸é ¿¡·¯°¡ ³ª¹Ç·Î ±× °æ¿ì ¹«Á¶°Ç 1·Î ¼¼ÆÃ 
        // ==> È­¸éÀÌ ´õÀÌ»ó Ãà¼ÒµÇÁö ¾ÊÀ½ 
        if(tabHeightValue < 1 ) 
           tabHeightValue = 1; 
        if(tableHeightValue < 1 ) 
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


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

	/* 
    GridObj.nHDLineSize         	= 36; //Header Size
       
 	GridObj.strActiveRowBgColor		= "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor	= '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor	= '0|0|0'; 
	GridObj.strMouseWheelAction		= 'page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'   
	// Header Font Setting
	GridObj.strHDClickAction    = "sortsingle";
	GridObj.strHDFontName			= '¸¼Àº °íµñ';
	GridObj.nHDFontSize				= 10;				  	// Font Size 9
	GridObj.bHDFontBold				= true;
*/
/////////////////////////////////////////

	GridObj.bRowSelectorVisible = false;        		//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;   
    
   
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
   
}
     
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
 	
 	GridObj.AddHeader("CUST_NAME"		,"°Å·¡Ã³¸í"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("GUBN"			,"±¸ºÐ"				,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("ITEM_ID"			,"Á¦Ç°ÄÚµå"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("ITEM_NAME"		,"Á¦Ç°¸í"				,"t_text" 		,100	,180	,false); //0
 	GridObj.AddHeader("EVEN_METHOD"		,"Çà»ç ¹æ¹ý"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("FRT_CHGO_DATE"	,"ÃÖÃÊ Ãâ°íÀÏ"			,"t_text" 		,100	,80		,false); //0
 	GridObj.AddHeader("EVEN_S_DATE"		,"½ÃÀÛÀÏ"				,"t_text" 		,100	,90		,false); //0
 	GridObj.AddHeader("EVEN_E_DATE"		,"Á¾·áÀÏ"				,"t_text" 		,100	,90		,false); //0
 	
 	GridObj.AddHeader("CHDO_QTY"		,"ÃÊµµ¹°·®"			,"t_number" 	,-1		,90		,true); //0   
 	GridObj.AddHeader("PLAN_QTY"		,"°èÈ¹¼ö·®"   		,"t_number" 	,-1		,90  	,true); //0   
 	
 	GridObj.AddHeader("SUPT_METHOD"		,"Áö¿ø ¹æ¹ý"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("CHGO_STD"		,"Ãâ°í ±âÁØ"			,"t_text" 		,100	,70		,false); //0
 	
 	GridObj.AddHeader("ETC"				,"Áö¿øÁ¦Ç° \n/ ½Ã½ÄÇ°"	,"t_text" 		,100	,70		,false); //0

 	GridObj.AddHeader("REAL_CHGO_DATE"	,"ÃÖÃÊ Ãâ°íÀÏ"			,"t_text" 		,100	,0		,false); //0
 	GridObj.AddHeader("REAL_S_DATE"		,"½ÃÀÛÀÏ"				,"t_text" 		,100	,0		,false); //0
 	GridObj.AddHeader("REAL_E_DATE"		,"Á¾·áÀÏ"				,"t_text" 		,100	,0		,false); //0

 	
 	/* ÀÌÁß ÇØ´õ Ãß°¡ */
	GridObj.AddGroup("HD1",      	"Çà»ç±â°£");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj.AppendHeader("HD1", 	 "EVEN_S_DATE");
	GridObj.AppendHeader("HD1",      "EVEN_E_DATE");
   
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID',		  	  'left');
    GridObj.SetColCellAlign('ITEM_NAME',		  'left');
    GridObj.SetColCellAlign('CUST_NAME',		'center');
    GridObj.SetColCellAlign('GUBN',				'center');
    
    
    GridObj.SetColCellAlign('EVEN_METHOD',		'center');
    GridObj.SetColCellAlign('FRT_CHGO_DATE',	'center');
    GridObj.SetColCellAlign('EVEN_S_DATE',		'center');
    GridObj.SetColCellAlign('EVEN_E_DATE',		'center');
    GridObj.SetColCellAlign('CHDO_QTY',			 'right');
    GridObj.SetColCellAlign('PLAN_QTY',			 'right');
    GridObj.SetColCellAlign('SUPT_METHOD',		'center');
    GridObj.SetColCellAlign('CHGO_STD',			'center');
    GridObj.SetColCellAlign('ETC',				'center');

    GridObj.SetColCellAlign('FRT_CHGO_DATE',	'center');
    GridObj.SetColCellAlign('EVEN_S_DATE',		'center');
    GridObj.SetColCellAlign('EVEN_E_DATE',		'center');
	
	GridObj.SetNumberFormat("CHDO_QTY",		"#,##0.###");
	GridObj.SetNumberFormat("PLAN_QTY",		"#,##0.###");

}

   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
       
       
       
       doQuery();
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() 
{
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;	
	
	var in_fr_date	    = document.frm.in_fr_date.value;
	var in_to_date	    = document.frm.in_to_date.value;
		in_fr_date 		= in_fr_date.replace(/-/g,"");
		in_to_date 		= in_to_date.replace(/-/g,"");
	
	   
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode",		"search");
	GridObj.SetParam("in_fr_date",   in_fr_date);
	GridObj.SetParam("in_to_date",   in_to_date);
	
	
	GridObj.SetParam("user_id",		document.frm._user_id.value);
	GridObj.DoQuery(servlet_url,	"WISEGRIDDATA_ALL");
}

// ÀúÀå
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
};

// ÀúÀå
function doSave() {
 
	var GridObj			= document.WiseGrid;
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;
	

    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode",		"doSave");
	GridObj.SetParam("user_id",		document.frm._user_id.value);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");	

 
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() 
{
    var endMode			= GridObj.GetParam("mode");    
    
    var error_msg		= '';
      
    if(endMode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
    {
        if(GridObj.GetStatus() == "true") 
        {
        	
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell»ö±ò º¯°æ
				
				GridObj.SetCellBgColor('GUBN',			i, 	color_edit_col);
				
				GridObj.SetCellBgColor('EVEN_METHOD',	i, 	color_edit_col);
				GridObj.SetCellBgColor('FRT_CHGO_DATE', i, 	color_edit_col);
				
				GridObj.SetCellBgColor('CHDO_QTY',		i, 	color_edit_col);
				GridObj.SetCellBgColor('PLAN_QTY',		i, 	color_edit_col);
				
				GridObj.SetCellBgColor('SUPT_METHOD',	i, 	color_edit_col);
				GridObj.SetCellBgColor('CHGO_STD',		i, 	color_edit_col);
				GridObj.SetCellBgColor('ETC',			i, 	color_edit_col);

			}         	                           
                 
        } else{ 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
    
		    else if(endMode == "doSave"){
		    	var service_url = "service.do?_moon_service=op_02070_event_plan_info";
				alert("ÀúÀåÀÌ ¿Ï·á µÇ¾ú½À´Ï´Ù.");
		
    }
    
    else{

    }	


	
}
function GridChangeCell(){ //°³Ã¼°¡ ¾ø´Ù´Â ¿À·ù ÇØ°á ±¸¹®(Service.do)
	
}

function GridCellClick(){ //°³Ã¼°¡ ¾ø´Ù´Â ¿À·ù ÇØ°á ±¸¹®(Service.do)
	
}

function excelUpload(){
	       
   //À²ÃÌ µ¥ÀÌÅÍ ¾÷·Îµå ÈÄ Grid »èÁ¦
	
	
	
	document.WiseGrid.ClearGrid();
				
	init();
	
	

	GridObj.ExcelImport('', 'importall','row', false, false); 
   

}

/* EXCEL DWON */
function excelDown() {

}