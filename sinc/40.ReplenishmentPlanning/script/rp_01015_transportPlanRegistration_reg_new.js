//############################################################
//## ÇÁ·Î±×·¥ID      : rp_01015_transportPlanRegistration_reg_new.vm
//## ÇÁ·Î±×·¥¸í      : SCMÁÖ¹®ÃßÀûÁ¶È¸
//## °³¹ßÀÚ          : ³²¿õ¿ë
//## °³¹ßÀÏÀÚ        : 2009-10-13
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_04.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-10-13  ³²¿õ¿ë      create
//##
//############################################################
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
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
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


/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'rp_01015_transportPlanRegistration_reg_new';
var GridObj ; 													// WiseGrid °´Ã¼

var color_tot = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
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

	GridObj.bUserContextMenu = true;				//»ç¿ëÀÚ ÄÁÅØ½ºÆ® ¸Þ´ºÀÇ »ç¿ë ¿©ºÎ¸¦ °áÁ¤ÇÑ´Ù. 
	GridObj.bRowSelectorVisible = true;        	//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù. 	


    GridObj.nHDLineSize         = 18; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'    
	
	
	
	// Header Font Setting
	GridObj.strHDFontName = '¸¼Àº °íµñ';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2; 	
	
    /* Context Menu »ç¿ëÀÚ MENU Ãß°¡ */
    GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row Ãß°¡");
    GridObj.AddUserContextMenuItem("MENU_CELL","MENU02","Row »èÁ¦");
//    GridObj.AddUserContextMenuItem("MENU_CELL","MENU03","»èÁ¦ Ãë¼Ò");

	
}

       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        

 	GridObj.AddHeader("ITEM_ID"			,"Á¦Ç°ÄÚµå"     	,"t_text" 	,100	,99  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"Á¦Ç°¸í"       	,"t_text" 	,500	,220  ,false); //0   
 	GridObj.AddHeader("PLT_QTY"			,"PLT"   		,"t_number"	,20.3	,99  ,false); //0   
 	GridObj.AddHeader("BOX_QTY"			,"BOX"    		,"t_number"	,20.3	,99  ,false); //0   
 	GridObj.AddHeader("EA_QTY"			,"EA"   		,"t_number"	,20.3	,99  ,false); //0   
 	GridObj.AddHeader("TRUCK_SEQ"		,"Â÷·®¼ø¹ø"		,"t_text" 	,500	,70 ,false); //0   
 	GridObj.AddHeader("BRAND_NO"		,"ÀüÇ¥¹øÈ£"       ,"t_text"	,20		,99  ,false); //0   

	GridObj.AddGroup("CUM_TOT", "»óÂ÷Áý°è");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj.AppendHeader("CUM_TOT", "PLT_QTY");
	GridObj.AppendHeader("CUM_TOT", "BOX_QTY");
	GridObj.AppendHeader("CUM_TOT", "EA_QTY");



	GridObj.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "»ý¼º", "¼öÁ¤", "»èÁ¦");

	
	
	GridObj.SetNumberFormat('PLT_QTY','#,##0.##'); 
	GridObj.SetNumberFormat('BOX_QTY','#,##0.##'); 
	GridObj.SetNumberFormat('EA_QTY','#,##0.##');
	
	GridObj.SetColCellAlign('TRUCK_SEQ','center'); 
	GridObj.SetColCellAlign('ITEM_ID','center'); 
	GridObj.SetColCellAlign('BRAND_NO','center'); 
	

	//Hidden ÄÃ·³
	//GridObj.SetColHide("CRUD",true);
       
}
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
       doQuery();
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

       var version		= document.all.version.value;
       var seq   		= document.all.seq.value;
       var src_loc_sel  = document.all.src_loc_sel.value;
       var tgt_loc_sel  = document.all.tgt_loc_sel.value;
       var trans_start  = document.all.trans_start.value;
       var trans_end   	= document.all.trans_end.value;
       var truck_seq_sel= document.all.truck_seq_sel.value;
       var item_id		= document.all.item_id.value;
       var item_name	= document.all.item_name.value;
       
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("version", version);
       GridObj.SetParam("seq", seq);
       GridObj.SetParam("src_loc_sel", src_loc_sel);
       GridObj.SetParam("tgt_loc_sel", tgt_loc_sel);
       GridObj.SetParam("trans_start", trans_start);
       GridObj.SetParam("trans_end", trans_end);
       GridObj.SetParam("truck_seq_sel", truck_seq_sel);
       GridObj.SetParam("item_id", item_id);
       GridObj.SetParam("item_name", item_name);
 
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

			    //GridObj.SetColCellAlign('CNFM_DATE','center'); 

//			    GridObj.SetNumberFormat('REQT_BOX','#,##0.#'); 
			    
				// ÇÕ°è
				GridObj.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', 'QTY,EA_QTY,PLT_CUM'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
				/* 
				for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell»ö±ò º¯°æ
					if(GridObj.GetCellValue('SLIP_GUBN',i) == "Å¸°èÁ¤" ){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '0|255|0');
					}
					// ÀÇ·Ú¹Ú½ºº¸´Ù ¸¶°¨¹Ú½º°¡ Å©¸é »ö±ò·Î Ç¥½ÃÇÑ´Ù.
					if(strToNum(GridObj.GetCellValue('REQT_BOX',i)) > strToNum(GridObj.GetCellValue('SELL_BOX',i))) {
						GridObj.SetCellBgColor('SELL_BOX', i, '253|228|229');
						GridObj.SetCellFontBold('SELL_BOX', i, 'true'); // font ±½±â  
					}
				}
				*/
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

function GridCellDblClick(strColumnKey, nRow){
	var urlStr = "service.do?_moon_service=rp_01015_transportPlanRegistration_mod";
	//alert(data);
	var list = data.split("!%!");
	
	var brand_no = list[13];
	
	if( brand_no == "" || brand_no == null ) {  
	}else{
		//alert("È®Á¤µÈ ÀüÇ¥´Â ¼öÁ¤ÀÌ ºÒ°¡´É ÇÕ´Ï´Ù.");
		//return;		
	}
		
	var version	= document.frm.version.value;
	var seq		= document.frm.seq.value;
	
	urlStr += "&version=" 	+ version; // ¾ÆÀÌÅÛ ÄÚµå
	urlStr += "&seq=" 	+ seq; // ¾ÆÀÌÅÛ ÄÚµå

	urlStr += "&plan_type=" 	+ list[0]; // ÇÃ·£Å¸ÀÔ
	urlStr += "&trans_date=" 	+ list[2]; // ¼ö¼ÛÀÏÀÚ
	urlStr += "&truck_seq=" 	+ list[7]; // Â÷·®¼ø¹ø
	urlStr += "&src_loc=" 		+ list[3]; // Ãâ°íÀå
	urlStr += "&tgt_loc=" 		+ list[5]; // ÀÔ°íÀå
	urlStr += "&brand_no_temp="	+ list[13]; // ÀÔ°íÀå


	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;	
	
}



function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
}



/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Çà Ãß°¡/»èÁ¦ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function rowInsDel(obj){
	var str = obj.value;
	var nRow = GridObj.GetActiveRowIndex();
	
	if( str == "Ãß°¡" ){		// ROW Ãß°¡
		if( nRow == "" || nRow == null) nRow = 0;
		insertRow( nRow );	
		// Ãâ°íÀå ±¸ºÐ ¹è°æ»ö ´Ù½Ã ÁöÁ¤
		setSrcLocBgColor();		
		// ´©Àû °è»ê ´Ù½Ã ÇÔ.
		calAllCum();
		// ¹øÈ£ set
		setNo();
	}
	else if( str == "»èÁ¦" ){	// ROW »èÁ¦
		
//		if( nRow != 0 && (nRow == "" || nRow == null) ) {
//			alert("»èÁ¦ÇÒ ÇàÀ» ¼±ÅÃÇØ ÁÖ½Ê½Ã¿À.");
//			return;
//		}
		if(confirm("»èÁ¦ ÇÏ½Ã°Ú½À´Ï±î?") == true){
			for( i = 0 ; i < GridObj.GetRowCount() ; i++ ){
				if( GridObj.GetCellValue("SELECTED", i) == "1" ){
					if(GridObj.GetCellValue("NO", i) != ""){
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
						//GridObj.DeleteRow(nRow, false); 		
					}else{
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
					}
					
					if( delRowList == "" ){// »èÁ¦ ¸®½ºÆ®¿¡ Row Index Ãß°¡
						delRowList += "" + i;
					}else{
						delRowList += "!%!" + i;
					}					
				}
			}
			// Ãâ°íÀå ±¸ºÐ ¹è°æ»ö ´Ù½Ã ÁöÁ¤
			setSrcLocBgColor();	
			// ´©Àû °è»ê ´Ù½Ã ÇÔ.
			calAllCum();
			// ¹øÈ£ set
			setNo()
		}
	}
	
	saved = false;

};

function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	
	if(rowCnt == null){
		rowCnt = 0;
	}
	//alert("rowCnt : " + rowCnt + " , nRow : " + nRow);//1,0
	if( (rowCnt > 1) && (rowCnt-1 == nRow) ){ // ¸¶ÀÚ¸· ¶óÀÎÀÏ °æ¿ì 
		GridObj.InsertRow(-1);
	}else if(rowCnt <= 1){// 
		GridObj.InsertRow(0);
		nRow = -1;
	}
	else{
		GridObj.InsertRow(nRow+1);
	}
	
	// ±âº» µ¥ÀÌÅÍ ¼ÂÆÃ
	if(nRow == -1){
		GridObj.SetCellValue("RTE", 0, "");
		GridObj.SetCellValue("TRANS_DATE", 0, "");
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", 0, "");
		GridObj.SetCellValue("TRUCK_SEQ", 0, "");
		GridObj.SetCellValue("PLAN_TYPE", 0, "");	
	}else{
		GridObj.SetCellValue("RTE", nRow+1, GridObj.GetCellValue("RTE", nRow));
		GridObj.SetCellValue("TRANS_DATE", nRow+1, GridObj.GetCellValue("TRANS_DATE", nRow));
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", nRow+1, GridObj.GetCellHiddenValue("SRC_LOC", nRow));
		GridObj.SetCellValue("TRUCK_SEQ", nRow+1, GridObj.GetCellValue("TRUCK_SEQ", nRow));
		GridObj.SetCellValue("PLAN_TYPE", nRow+1, GridObj.GetCellValue("PLAN_TYPE", nRow));
	}
	
	var	cnt = nRow+1;
	if( nRow == -1 ) nRow = 0;
	var pltSum = Number(GridObj.GetCellValue("CUM_PLT", nRow));
	var boxSum = Number(GridObj.GetCellValue("CUM_BOX", nRow));
	do{
		pltSum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
		boxSum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
		GridObj.SetCellValue("CUM_PLT", cnt, pltSum);
		GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxSum));
	}
	while( (GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < rowCnt));
};
