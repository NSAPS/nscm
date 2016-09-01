//## ÇÁ·Î±×·¥ID		:	sc_13010_set_prod_order_reg_pop.js
//## ÇÁ·Î±×·¥¸í		:	À¯Åë°¡°ø »ý»ê¿À´õ µî·Ï pop_up
//## °³¹ßÀÚ          :	±Ç¿ëÂù 
//## °³¹ßÀÏÀÚ       	:	2009-07-16
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  ±Ç¿ëÂù      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'sc_13010_set_prod_order_reg_pop';
var GridObj ; 													// WiseGrid °´Ã¼
var GridObj2 ; 													// WiseGrid °´Ã¼
var GridObj3 ; 													// WiseGrid °´Ã¼

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
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

    GridObj.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '¸¼Àº °íµñ';
	GridObj.nHDFontSize = 10;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 1; 
 
}
     
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100    ,60  ,false);
 	GridObj.AddHeader("SEQ"				,"SEQ"       		,"t_text" 	,400	,50  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_ID"	,"ÀÚÀç¹øÈ£"       	,"t_text" 	,400	,80  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_NAME"	,"ÀÚÀç¸í"       		,"t_text" 	,400		,180 ,false); //0   
 	GridObj.AddHeader("CONS_QTY_UOM"	,"´ÜÀ§"     		  	,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("CONS_QTY"		,"¼ö·®"     			,"t_number" ,20.6	,80  ,true); //0   
	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD");  // AD¿Í DE°¡ ¼ÂÆÃ µÉ °æ¿ì´Â ¾ø´Ù.
	GridObj.SetNumberFormat("CONS_QTY"  , "#,##0.###");  
	

	//Hidden ÄÃ·³  
	GridObj.SetColHide("CRUD",true);
	
	
	var idu_mode	= document.frm.idu_mode.value;
	if(idu_mode == 'MOD'){
		doQuery2();	
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
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var qty			= document.frm.qty.value;
	var prod_ver	=document.frm.prod_ver.value;

	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("prod_ver", prod_ver);
	GridObj.SetParam("qty", qty);
	   
	GridObj.DoQuery(servlet_url);
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery2() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id_sel.value;
	var qty			= document.frm.qty.value;
	var prod_ver	=document.frm.prod_ver.value;
	var wo_id		=document.frm.wo_id.value;

	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "search2");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("prod_ver", prod_ver);
	GridObj.SetParam("qty", qty);
	GridObj.SetParam("wo_id", wo_id);
	   
	GridObj.DoQuery(servlet_url);
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
var chk_GoReg = 'N';
function GoReg() {
	
	chk_GoReg = 'Y';
	getBom();
	
}

function ActReg() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "doReg");
	var wo_id;
	var plant_id	= document.frm.plant_id.value;
	var proc_id		= document.frm.proc_id.value;
	var start_date	= document.frm.start_date.value;
	
	GridObj.SetParam("plant_id", 	document.frm.plant_id.value);
	GridObj.SetParam("prod_item_id",document.frm.item_id.value);
	GridObj.SetParam("prod_ver", 	document.frm.prod_ver.value);
	GridObj.SetParam("proc_id", 	document.frm.proc_id.value);
	GridObj.SetParam("oper_id",		document.frm.oper_id.value);
	GridObj.SetParam("loc_id", 		document.frm.loc_id.value);
	GridObj.SetParam("qty", 		document.frm.qty.value);
	GridObj.SetParam("qty_uom", 	document.frm.qty_uom.value);
	GridObj.SetParam("start_date", 	document.frm.start_date.value);
	GridObj.SetParam("start_time", 	document.frm.start_time.value);
	GridObj.SetParam("end_date", 	document.frm.end_date.value);
	GridObj.SetParam("end_time", 	document.frm.end_time.value);
	GridObj.SetParam("user_id", 	document.frm._user_id.value);
	
	var in_paramKey = "plant_id!%!proc_id!%!start_date";
	var in_paramCode = plant_id+"!%!"+proc_id+"!%!"+start_date;

	commonUtil.getCodeInfo(in_paramKey,in_paramCode,"sc_13010_set_prod_order_get_max_wo_id", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {

				wo_id = arrList[0][0];		
				GridObj.SetParam("wo_id", 		wo_id);
				//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
				GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
					
			}
		chk_GoReg = 'N';
		}
	});	
}
      

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoMod  (service) {
	
	var if_flag		= document.frm.if_flag.value;
	if( if_flag == "" || if_flag == null) {
	}else{
		alert("ÀÌ¹Ì  ERP Àü¼Û ¿Ï·áµÈ Ç×¸ñÀÔ´Ï´Ù!!!");
		return;
	}	
	

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "doMod");
	var wo_id		= document.frm.wo_id.value;
	var plant_id	= document.frm.plant_id.value;
	var proc_id		= document.frm.proc_id.value;
	var start_date	= document.frm.start_date.value;
	
	GridObj.SetParam("plant_id", 	document.frm.plant_id.value);
	GridObj.SetParam("prod_item_id",document.frm.item_id.value);
	GridObj.SetParam("prod_ver", 	document.frm.prod_ver.value);
	GridObj.SetParam("proc_id", 	document.frm.proc_id.value);
	GridObj.SetParam("oper_id",		document.frm.oper_id.value);
	GridObj.SetParam("loc_id", 		document.frm.loc_id.value);
	GridObj.SetParam("qty", 		document.frm.qty.value);
	GridObj.SetParam("qty_uom", 	document.frm.qty_uom.value);
	GridObj.SetParam("start_date", 	document.frm.start_date.value);
	GridObj.SetParam("start_time", 	document.frm.start_time.value);
	GridObj.SetParam("end_date", 	document.frm.end_date.value);
	GridObj.SetParam("end_time", 	document.frm.end_time.value);
	GridObj.SetParam("user_id", 	document.frm._user_id.value);
	
	GridObj.SetParam("wo_id", 		wo_id);
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}
      
      

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoDelete() 
{
	var if_flag		= document.frm.if_flag.value;
	if( if_flag == "" || if_flag == null) {
	}else{
		alert("ÀÌ¹Ì ERP Àü¼Û ¿Ï·áµÈ Ç×¸ñÀÔ´Ï´Ù!!!");
		return;
	}

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id_sel.value;
	var wo_id		= document.frm.wo_id.value;

	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "doDelete");
	GridObj.SetParam("prod_item_id", item_id);
	GridObj.SetParam("wo_id", wo_id);
	   
	GridObj.DoQuery(servlet_url);
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoDeleteIf(){
	
	var if_flag		= document.frm.if_flag.value;
	
	if( confirm("ERPÀÇ °èÈ¹À» »èÁ¦ ½ÃÅ°°Ú½À´Ï±î.") ) {
		
	}else{
		return;	
	}	
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id_sel.value;
	var wo_id		= document.frm.wo_id.value;
	   
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "doDeleteIf");
	GridObj.SetParam("prod_item_id", item_id);
	GridObj.SetParam("wo_id", wo_id);
	   
	GridObj.DoQuery(servlet_url);
}




/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search"||endMode == "search2") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
    {
        if(GridObj.GetStatus() == "true") 
        {                           
        	var row_cnt = GridObj.GetRowCount();
			var colBGColor='232|245|213';
			
			for( var i=0 ;i<row_cnt ;i++) //ÀüÃ¼ Row¸¸Å­ ¹Ýº¹ ÇÑ´Ù.
	        {
		    	GridObj.SetCellBgColor('CONS_QTY', i, '255|255|0'); 
	        }
	        
	        if(chk_GoReg == 'Y') {
	        	ActReg();
	        }
                 
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "doReg"){
    	//alert("service_url="+service_url);
    	var	idu_mode	='REG';
    	var service_url = "service.do?_moon_service=sc_13010_set_prod_order_reg_pop";
    	service_url += "&idu_mode=" + idu_mode;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("ÀúÀåÀÌ ¿Ï·áµÇ¾ú½À´Ï´Ù");
		window.close();  
		var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		newWin.focus();
		//window.opener.document.location.reload();
		window.opener.GoSearch();
    }else if(endMode == "doDelete"){
    	//alert("service_url="+service_url);
    	var service_url = "service.do?_moon_service=sc_13010_set_prod_order_reg_pop";
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("°èÈ¹ÀÌ »èÁ¦ µÇ¾ú½À´Ï´Ù.");
		window.close();  
		window.opener.GoSearch();
    }else if(endMode == "doMod"){
    	//alert("service_url="+service_url);
    	var service_url = "service.do?_moon_service=sc_13010_set_prod_order_reg_pop";
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("°èÈ¹ÀÌ º¯°æµÇ¾ú½À´Ï´Ù.");
		window.close();  
		window.opener.GoSearch();
    }else if(endMode == "doDeleteIf"){
    	//alert("service_url="+service_url);
    	var service_url = "service.do?_moon_service=sc_13010_set_prod_order_reg_pop";
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("ERP°èÈ¹ »èÁ¦ I/F¸¦ ½Ç½ÃÇÕ´Ï´Ù.");
		window.close();  
		window.opener.GoSearch();
    }else{
    	window.opener.GoSearch();
    }
	
}

function GridCellClick(strColumnKey, nRow){

}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
}

function getBom(){

	doQuery();		
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
	getProdVer();
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
	
	var service_url = "service.do?_moon_service=sc_13010_item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
	
}

function getProdVer(){
	var item_id = document.frm.item_id.value;
	var in_div;
	alloc_comment_cnt = new Array();
	
	commonUtil.getSelQeury("item_id",item_id,"sc_13010_set_prod_order_get_prod_ver", { 
	callback:function(arrList){
		in_div = "<select name=\"prod_ver\" OnChange=\"doChange3(this);\"  >";
		//in_div = "<select name=\"prod_ver\" OnChange=\"doChange3(this);\"  #if($!{idu_mode} == \"MOD\") readonly #end>";
		//
		var selected_row = 0;
		for(var i=0 ; i < arrList.length ; i++){
			in_div +=	"<option value="+arrList[i][0];

			
			in_div += ">"+arrList[i][0]+"</option>";
			
			if(document.frm.inpt_prod_ver.value == arrList[i][0]) {
				in_div += " selected";
				selected_row = i;
			}			
			
		}	
			in_div += "</select> \n";
			in_div +=	"<option value=\"¼±ÅÃ\">";
		
		for(var i=0 ; i < arrList.length ; i++){  // hidden
			in_div +=	"<input type=\"hidden\" name=\"prod_ver_hidden\"	value="+arrList[i][0]+">";
			in_div +=	"<input type=\"hidden\" name=\"proc_id_hidden\"		value="+arrList[i][1]+">";
			in_div +=	"<input type=\"hidden\" name=\"hid_name_hidden\"	value="+arrList[i][2]+">";
			in_div +=	"<input type=\"hidden\" name=\"oper_id_hidden\"		value="+arrList[i][3]+">";
			in_div +=	"<input type=\"hidden\" name=\"loc_id_hidden\"		value="+arrList[i][4]+">";
			in_div +=	"<input type=\"hidden\" name=\"dc_name_hidden\"		value="+arrList[i][5]+">";
		}	

		divProdVerCombo.innerHTML = in_div;
		// Ç°¸ñcntÁ¤º¸¸¦ ¼ÂÆÃÇÑ´Ù.
		document.frm.prod_ver.value	= arrList[selected_row][0];
		document.frm.proc_id.value	= arrList[selected_row][1];
		document.frm.hid_name.value	= arrList[selected_row][2];
		document.frm.oper_id.value	= arrList[selected_row][3];
		document.frm.loc_id.value	= arrList[selected_row][4];
		document.frm.dc_name.value	= arrList[selected_row][5];
		
	}
	});

}


function doChange3(obj){
	//alert("selectedIndex"+obj.options.selectedIndex);
	document.frm.prod_ver.value 	= document.frm.prod_ver_hidden[obj.options.selectedIndex].value;	
	document.frm.proc_id.value	= document.frm.proc_id_hidden[obj.options.selectedIndex].value;	
	document.frm.hid_name.value 	= document.frm.hid_name_hidden[obj.options.selectedIndex].value;	
	document.frm.oper_id.value 	= document.frm.oper_id_hidden[obj.options.selectedIndex].value;	
	document.frm.loc_id.value 	= document.frm.loc_id_hidden[obj.options.selectedIndex].value;	
	document.frm.dc_name.value 	= document.frm.dc_name_hidden[obj.options.selectedIndex].value;	
	
	doQuery();
}

// ¼ýÀÚ¿Ü ÀÔ·Â¹æÁö
function checkForNumber(obj) {
	var key = event.keyCode;
	if(!(key==8||key==9||key==13||key==46||key==144||
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}
  
	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {

		if(obj == document.frm.confirm_qty) {
			Do_DC_Allocate(obj);
		}
	}
}
