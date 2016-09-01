//############################################################
//## ÇÁ·Î±×·¥ID      : ip_07010_Item_Trace_list.vm
//## ÇÁ·Î±×·¥¸í      : SCMÇ°¸ñÃßÀûÁ¶È¸
//## °³¹ßÀÚ          : ³²¿õ¿ë
//## °³¹ßÀÏÀÚ        : 2009-07-16
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_04.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  ³²¿õ¿ë      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_07010_Item_Trace_list';
var GridObj ; 													// WiseGrid °´Ã¼
var GridObj2;
var GridObj3;

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
   
function init2() {
   		
	GridObj2 = document.WiseGrid2;
	
	setProperty(GridObj2);	//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	setHeader2(GridObj2);  	//ÇØ´õ»ý¼º 
	setDefault2();        	//È­¸é ±âº» ¼³Á¤ 
	
}   

function init3() {
   		
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3);	//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	setHeader3(GridObj3);  	//ÇØ´õ»ý¼º 
	setDefault3();        	//È­¸é ±âº» ¼³Á¤ 
	
}   
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

    GridObj.nHDLineSize         = 12; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
}
function setDefault2() { 

    GridObj2.nHDLineSize         = 12; //Header Size
    GridObj2.strHDClickAction    = "sortsingle";
}
function setDefault3() { 

    GridObj3.nHDLineSize         = 12; //Header Size
    GridObj3.strHDClickAction    = "sortsingle";
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        

	GridObj.AddHeader("INBOUND_DATE"	,"»ý»ê/¸ÅÀÔÀÏ"       	,"t_text" 	,20		,120  ,false); //0   
 	GridObj.AddHeader("DC_ID"			,"CODE"       		,"t_text" 	,10		,60  ,false); //0   
 	GridObj.AddHeader("DC_NAME"			,"CDC/RDC"       	,"t_text" 	,100	,120  ,false); //0   
 	GridObj.AddHeader("ITEM_CD"			,"Ç°¸ñÄÚµå"       	,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("ITEM_NM"			,"Ç°¸ñ¸í"       		,"t_text" 	,200	,200  ,false); //0   
 	GridObj.AddHeader("IPGO"			,"¼ö·®"       		,"t_number" ,20.3	,80  ,false); //0   

 	// Á¶È¸±¸ºÐÀÌ ¼öÀÔ»óÇ°ÀÏ¶§¸¸ Ç¥½Ã
 	GridObj.AddHeader("BL_NO"				,"B/L"       		,"t_text" 	,100	,200  ,false); //0   

	GridObj.BoundHeader();	

	GridObj.SetNumberFormat("IPGO"  , "#,##0");

    GridObj.SetColCellAlign('INBOUND_DATE','center'); 
    GridObj.SetColCellAlign('DC_ID','center'); 
    GridObj.SetColCellAlign('ITEM_CD','center'); 
       
}
   
function setHeader2(GridObj2) {        
       
  	GridObj2.AddHeader("DC_ID"			,"CODE"       		,"t_text" 	,10		,60  ,false); //0   
 	GridObj2.AddHeader("DC_NAME"		,"CDC/RDC"       	,"t_text" 	,100	,120  ,false); //0   
 	GridObj2.AddHeader("IPGO"			,"Àç°í"       		,"t_number" ,20.3	,80  ,false); //0   

	GridObj2.BoundHeader();	

	GridObj2.SetNumberFormat("IPGO"  , "#,##0");

    GridObj2.SetColCellAlign('DC_ID','center'); 

}
   
function setHeader3(GridObj3) {        
       
 	GridObj3.AddHeader("OUTBOUND_DATE"	,"Ãâ°íÀÏ"       		,"t_text" 	,20		,80  ,false); //0   
 	GridObj3.AddHeader("CUST_ID"		,"CODE"       		,"t_text" 	,20		,0  ,false); //0   
 	GridObj3.AddHeader("CUST_NAME"		,"°Å·¡Ã³¸í"       	,"t_text" 	,200	,180  ,false); //0   
 	GridObj3.AddHeader("ADDR"			,"ÁÖ¼Ò"       		,"t_text" 	,1000	,250  ,false); //0   
 	GridObj3.AddHeader("TEL_NO"			,"ÀüÈ­¹øÈ£"       	,"t_text" 	,200	,100  ,false); //0   
 	GridObj3.AddHeader("CHGO"			,"¼ö·®"       		,"t_number" ,20.3	,80  ,false); //0   

	GridObj3.BoundHeader();	

	GridObj3.SetNumberFormat("CHGO"  , "#,##0");

    GridObj3.SetColCellAlign('OUTBOUND_DATE','center'); 
    GridObj3.SetColCellAlign('CUST_ID','center'); 
    GridObj3.SetColCellAlign('TEL_NO','center'); 

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

       var in_fr_date = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var in_item_id  = document.all.in_item_id.value;
       var in_bl_no  = document.all.in_bl_no.value;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", in_fr_date);
       GridObj.SetParam("in_to_date", in_to_date);
       GridObj.SetParam("in_item_id", in_item_id);
       GridObj.SetParam("in_bl_no", in_bl_no);
       GridObj.DoQuery(servlet_url);
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µÎ¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery2(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var sel_date = GridObj.GetCellValue("INBOUND_DATE", nRow);
	var sel_dc_id = GridObj.GetCellValue("DC_ID", nRow);
	var sel_item_id = GridObj.GetCellValue("ITEM_CD", nRow);
	var sel_bl_no = GridObj.GetCellValue("BL_NO", nRow);
	
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("sel_date", sel_date);
	GridObj2.SetParam("sel_dc_id", sel_dc_id);
	GridObj2.SetParam("sel_item_id", sel_item_id);
	GridObj2.SetParam("sel_bl_no", sel_bl_no);
	GridObj2.DoQuery(servlet_url);
}
   

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢¼¼¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery3(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var sel_date = GridObj.GetCellValue("INBOUND_DATE", nRow);
	var sel_dc_id = GridObj.GetCellValue("DC_ID", nRow);
	var sel_item_id = GridObj.GetCellValue("ITEM_CD", nRow);
	var sel_bl_no = GridObj.GetCellValue("BL_NO", nRow);
	
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("sel_date", sel_date);
	GridObj3.SetParam("sel_dc_id", sel_dc_id);
	GridObj3.SetParam("sel_item_id", sel_item_id);
	GridObj3.SetParam("sel_bl_no", sel_bl_no);
	GridObj3.DoQuery(servlet_url);
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() {
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {                           
		  
		  GridObj.AddSummaryBar('SUMMARY', 'ÇÕ°è', 'summaryall', 'sum', 'IPGO');
		  GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		   
		}
		else { 
			error_msg = GridObj.GetMessage(); 
			alert(error_msg);            
		}
	}
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj2.GetStatus() == "true") {                           

		  GridObj2.AddSummaryBar('SUMMARY', 'ÇÕ°è', 'summaryall', 'sum', 'IPGO'); 
		  GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
}

function GridEndQuery3() {
	
	var mode = GridObj3.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj3.GetStatus() == "true") {                           

			GridObj3.AddSummaryBar('SUMMARY', 'ÇÕ°è', 'summaryall', 'sum', 'CHGO'); 
			GridObj3.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridChangeCell(strColumnKey, nRow,nOldValue,nNewValue) {

}	
   	
function GridCellDblClick(strColumnKey, nRow){     

		doQuery2(nRow);	
		doQuery3(nRow);
}        

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

// BL POPUP
function openBLPopup() { 	
	
		var service_url = "service.do?_moon_service=ip_07010_BL_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_fr_date=" + document.frm.in_fr_date.value;
		service_url += "&in_to_date=" + document.frm.in_to_date.value;
		service_url += "&in_item_id=" + document.frm.in_item_id.value;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=400, height=350, top=0, left=0";
		var newWin = window.open(service_url, "BL_Search", pop_win_style);
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
       // document.WiseGrid.height = tableHeightValue + "px"; 
        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
        document.WiseGrid3.height = tableHeightValue - document.WiseGrid.height + "px"; 
        
    }  
    