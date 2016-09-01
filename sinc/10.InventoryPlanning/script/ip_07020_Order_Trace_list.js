//############################################################
//## ÇÁ·Î±×·¥ID      : ip_07020_Order_Trace_list.vm
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
function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' Ç°¸ñÁ¶È¸

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {
				document.frm.in_item_name.value = arrList[0][1];
			}
			else {// popup ¶ç¿î´Ù! 
				openItemPopup();
			}
		}
	});
}

// Ç°¸ñ POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//Á¶È¸Ç°¸ñ »óÅÂ : '01'ÆÇ¸ÅÁß	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_07020_Order_Trace_list';
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

    GridObj.nHDLineSize         = 16; //Header Size
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

	GridObj.AddHeader("CNFM_DATE"		,"ÀÏÀÚ"       		,"t_text" 	,100    ,100  ,false);
	GridObj.AddHeader("DC_NAME"			,"¹è¼ÛÁöÁ¡"       	,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("DOMAIN"			,"±¸ºÐ"       		,"t_text" 	,100	,40  ,false); //0   
 	GridObj.AddHeader("SLIP_GUBN"		,"ÀüÇ¥±¸ºÐ"       	,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("DEPT_NAME"		,"¿µ¾÷ÁöÁ¡"       	,"t_text" 	,500	,120 ,false); //0   
 	GridObj.AddHeader("HAN_NAME"		,"ÀÔ·ÂÀÚ"       		,"t_text" 	,100	,60  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"°Å·¡Ã³¸í"       	,"t_text" 	,500	,100  ,false); //0   
 	GridObj.AddHeader("SLIP_NO"			,"ÀüÇ¥¹øÈ£"       	,"t_text" 	,200	,50  ,false); //0   
 	GridObj.AddHeader("SEQ_NO"			,"Ç°¹ø"       		,"t_text" 	,200	,0  ,false); //0   
 	GridObj.AddHeader("REQT_BOX"		,"ÀÇ·Ú¹Ú½º"       	,"t_number" ,20.1	,60  ,false); //0   
 	GridObj.AddHeader("SELL_BOX"		,"¸¶°¨¹Ú½º"       	,"t_number" ,20.1	,60  ,false); //0   
 	GridObj.AddHeader("IPUT_DTTM"		,"ÀÔ·Â½Ã°£"       	,"t_text" 	,200	,140 ,false); //0   
 	GridObj.AddHeader("CHGO_GUBN"		,"ÀüÇ¥»óÅÂ"       	,"t_text" 	,100	,60  ,false); //0   
 	GridObj.AddHeader("SHORTAGE_GUBN"	,"°áÇ°»çÀ¯"       	,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("CLOS_DTTM"		,"¸¶°¨½Ã°£"       	,"t_text" 	,200	,140  ,false); //0   

	GridObj.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "»ý¼º", "¼öÁ¤", "»èÁ¦");

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

       var in_fr_date		= document.all.in_fr_date.value;
       var in_to_date   	= document.all.in_to_date.value;
       var in_item_id   	= document.all.in_item_id.value;
       var in_input_gubn	= document.all.in_input_gubn.value;
       var tgt_loc_sel		= document.all.tgt_loc_sel.value;
       
       var sales_list		= document.all.sales_list.value;	//2013-03-13 ¹è¼ÛÁöÁ¡ Ãß°¡//
       
       var in_slip_gubn		= document.all.in_slip_gubn.value;
       var in_clos_gubn		= document.all.in_clos_gubn.value;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date",		in_fr_date);
       GridObj.SetParam("in_to_date",		in_to_date);
       GridObj.SetParam("in_item_id",		in_item_id);
       GridObj.SetParam("in_input_gubn",	in_input_gubn);
       GridObj.SetParam("tgt_loc_sel",		tgt_loc_sel);
       
       GridObj.SetParam("sales_list",		sales_list);		//2013-03-13 ¹è¼ÛÁöÁ¡ Ãß°¡//
       
       
       GridObj.SetParam("in_slip_gubn",		in_slip_gubn);
       GridObj.SetParam("in_clos_gubn",		in_clos_gubn);
 
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

			    GridObj.SetColCellAlign('CNFM_DATE','center'); 
			    GridObj.SetColCellAlign('DC_NAME','left'); 
			    GridObj.SetColCellAlign('DOMAIN','center'); 
			    GridObj.SetColCellAlign('SLIP_GUBN','center'); 
			    GridObj.SetColCellAlign('DEPT_NAME','left'); 
			    GridObj.SetColCellAlign('HAN_NAME','center'); 
			    GridObj.SetColCellAlign('CUST_NAME','left'); 
			    GridObj.SetColCellAlign('SLIP_NO','center'); 
			    GridObj.SetColCellAlign('SEQ_NO','center'); 
			    GridObj.SetColCellAlign('REQT_BOX','right'); 
			    GridObj.SetColCellAlign('SELL_BOX','right'); 
			    GridObj.SetColCellAlign('IPUT_DTTM','center'); 
			    GridObj.SetColCellAlign('CHGO_GUBN','center'); 
			    GridObj.SetColCellAlign('SHORTAGE_GUBN','left'); 
			    GridObj.SetColCellAlign('CLOS_DTTM','center'); 

			    GridObj.SetNumberFormat('REQT_BOX','#,##0.#'); 
			    GridObj.SetNumberFormat('SELL_BOX','#,##0.#'); 

				// ÇÕ°è
				GridObj.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', 'REQT_BOX,SELL_BOX'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 

				for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell»ö±ò º¯°æ
					if(GridObj.GetCellValue('SLIP_GUBN',i) == "Å¸°èÁ¤" ){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '0|255|0');
					}
					else if(GridObj.GetCellValue('SLIP_GUBN',i) == "ºÎ¼­Å¸°èÁ¤"){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '170|219|110');
					}
					else if(GridObj.GetCellValue('SLIP_GUBN',i) == "°áÀç»ó½Å"){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '200|255|110');
					}
					else if(GridObj.GetCellValue('SLIP_GUBN',i) == "È¸¼Û"){ // YELLOW
						GridObj.SetCellBgColor('SLIP_GUBN', i, '255|255|0'); 
					}
					
					// ÀÇ·Ú¹Ú½ºº¸´Ù ¸¶°¨¹Ú½º°¡ Å©¸é »ö±ò·Î Ç¥½ÃÇÑ´Ù.
					if(strToNum(GridObj.GetCellValue('REQT_BOX',i)) > strToNum(GridObj.GetCellValue('SELL_BOX',i))) {
						GridObj.SetCellBgColor('REQT_BOX', i, '253|228|229');
						GridObj.SetCellBgColor('SELL_BOX', i, '253|228|229');
				    	
				    	GridObj.SetCellFontBold('REQT_BOX', i, 'true'); // font ±½±â  
						GridObj.SetCellFontBold('SELL_BOX', i, 'true'); // font ±½±â  

					}
					
					
				}
                     
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
    