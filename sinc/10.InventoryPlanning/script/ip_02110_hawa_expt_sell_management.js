//############################################################
//## ÇÁ·Î±×·¥ID      : ip_02110_hawa_expt_sell_management.js
//## ÇÁ·Î±×·¥¸í      : ³×½½·¹ ÆÇ¸ÅÃßÀÌ °ü¸®
//## °³¹ßÀÚ          : ³²¿õ¿ë
//## °³¹ßÀÏÀÚ        : 2014-01-16
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_04.xml
//## °ü·Ã query file : query_ip_02110_hawa_expt_sell_management.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2014-01-16  ³²¿õ¿ë      create
//##
//############################################################

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_02110_hawa_expt_sell_management';
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
    //GridObj.strHDClickAction    = "sortsingle";
 	//GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'

	GridObj.bHDMoving = false; 
	GridObj.bHDSwapping = false 
	GridObj.bRowSelectorVisible = false 

	GridObj.strRowBorderStyle = 'none' 

	GridObj.nRowSpacing = 0 

	GridObj.strHDClickAction = 'select' 	// 
	// 
	//     
}

       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        

	var cnfm_date	= document.all.cnfm_date.value;
	var strColumnKey;
	
	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "ip_02110_hawa_expt_sell_management_header",{
		callback:function(result){

			GridObj.AddHeader("CRUD"		,"CRUD"       	,"t_text" 	,100 		,0  	,false);
		  	GridObj.AddHeader("ITEM_ID"		,"Ç°¸ñÄÚµå"      	,"t_text" 	,100.3		,65  	,false); //0   
		  	GridObj.AddHeader("ITEM_NAME"	,"Ç°¸ñ¸í"      	,"t_text" 	,100.3		,170  	,false); //0   
		  	GridObj.AddHeader("GUBN"		,"±¸ºÐÄÚµå"      	,"t_text" 	,100.3		,0  	,false); //0   
		  	GridObj.AddHeader("GUBN_NAME"	,"±¸ºÐ"      	,"t_text" 	,100.3		,100  	,false); //0   
		  	   

			for(var i=0 ; i < result.length ; i++){  
				if(i < 6) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100	,63  ,false);
				}
				else { // editable!
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100	,63  ,true);
				}
				    
			}
			
			GridObj.BoundHeader(); //AddHeader¸¦ ¿Ï·áÇÑ ÈÄ Çì´õ¸¦ ±×¸®µå¿¡ ¹ÙÀÎµùÇÑ´Ù. 
			
    		GridObj.SetColCellAlign('ITEM_ID','center'); 
    		GridObj.SetColCellAlign('ITEM_NAME','left'); 
    		GridObj.SetColCellAlign('GUBN_NAME','center'); 

			// °ú°Å 6ÁÖÂ÷
			for(var i = 1 ; i < 7 ; i++) {
				strColumnKey = 'W_P0'+i;
				GridObj.SetColCellAlign(strColumnKey,'right');
				GridObj.SetNumberFormat(strColumnKey, "#,##0");
			}
			
			GridObj.SetCRUDMode("CRUD", "»ý¼º", "¼öÁ¤", "»èÁ¦");
			
			//Hidden ÄÃ·³
			GridObj.SetColHide("CRUD",true);

			
			// ÇöÀçÀÌÈÄ 26ÁÖÂ÷
			for(var i=0 ; i < 27 ; i++) {
				if(i<10) {
					strColumnKey = 'W_N0' + i;
				}
				else {
					strColumnKey = 'W_N' + i;
				}
				GridObj.SetColCellAlign(strColumnKey,'right');
				GridObj.SetNumberFormat(strColumnKey, "#,##0");
			}

			GridObj.SetColFix('GUBN_NAME'); 
			
			GridObj.SetColHDBgColor('W_N00', '253|228|229'); 			
		}
		
	});   
       
}
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSearch(service) {
	doQuery();
}
  
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cnfm_date	= document.all.cnfm_date.value;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("cnfm_date", cnfm_date);
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}
      
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cnfm_date	= document.all.cnfm_date.value;
   
   //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("cnfm_date", cnfm_date);

	GridObj.DoQuery(servlet_url);
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';

	var color_02 = 		'242|242|242';		
	var color_03 = 		'232|232|232';		
	var color_04 = 		'217|242|255';		
	var color_06 = 		'221|221|221';	
	
	var strColumnKey;	
          
    if(endMode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
    {

	    var rowCnt = GridObj.GetRowCount();
	    for (var i = 0 ; i < rowCnt ; i++ ){

	    	var gubn = GridObj.GetCellValue("GUBN", i);
		    	
	    	// row ÀüÃ¼ ¹è°æ»ö
	    	if(gubn == "01") {
	    		GridObj.SetRowBgColor(i, colBg02);
	    	}	
	    	else if(gubn == "06") {
	    		GridObj.SetRowBgColor(i, color_06);
	    	}			

			for(var k = 1 ; k < 7 ; k++) {
				strColumnKey = 'W_P0'+k;
				
				if( gubn == "03") { // Àç°í(ÇÕ°è)
					GridObj.SetCellBgColor('GUBN_NAME', i, color_03);  
					GridObj.SetCellBgColor(strColumnKey, i, color_03);
				}
				else if( gubn == "02") { //Àç°í(³×½½·¹)
					GridObj.SetCellBgColor('GUBN_NAME', i, color_02);
					GridObj.SetCellBgColor(strColumnKey, i, color_02); 	
				}
				else if( gubn == "04") { //ÀÔ°í(³×½½·¹)
					GridObj.SetCellBgColor('GUBN_NAME', i, color_04);
					GridObj.SetCellBgColor(strColumnKey, i, color_04); 	
				}
				else if( gubn == "05") { //ÆÇ¸Å¿¹Ãø
					GridObj.SetCellBgColor('GUBN_NAME', i, color_edit_col);
					GridObj.SetCellBgColor(strColumnKey, i, color_edit_col); 	
				}
			}
		    // ÇöÀçÀÌÈÄ 26ÁÖÂ÷
			for(var j = 0 ; j < 27 ; j++) {
				
				if(j < 10) {
					strColumnKey = 'W_N0' + j;
				}
				else {
					strColumnKey = 'W_N' + j;
				}

				if( gubn == "01") { // Àç°í(³ó½É)
					GridObj.SetCellActivation(strColumnKey, i, 'disable'); //¼±ÅÃÇÒ ¼ö ¾ø°í ÆíÁýÇÒ ¼ö ¾ø´Ù.
			    }
			    else if( gubn == "02") { //Àç°í(³×½½·¹)
			    	GridObj.SetCellBgColor(strColumnKey, i, color_02); 
			    	if(j == 0) { // ´çÁÖ
			    		GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    	}
			    	else GridObj.SetCellActivation(strColumnKey, i, 'disable'); //¼±ÅÃÇÒ ¼ö ¾ø°í ÆíÁýÇÒ ¼ö ¾ø´Ù.
			    }
			    else if( gubn == "03") { //Àç°í(ÇÕ°è) {
			    	GridObj.SetCellBgColor(strColumnKey, i,color_03);
			    	GridObj.SetCellActivation(strColumnKey, i, 'disable'); //¼±ÅÃÇÒ ¼ö ¾ø°í ÆíÁýÇÒ ¼ö ¾ø´Ù.
			    	GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    }
			    else if( gubn == "04") { //ÀÔ°í(³×½½·¹)
			    	GridObj.SetCellBgColor(strColumnKey, i,color_04);  
			    	GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    }
			    else if( gubn == "05") { //ÆÇ¸Å¿¹Ãø
			    	GridObj.SetCellBgColor(strColumnKey, i, color_edit_col); 
			    	GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    }
			    else if( gubn == "06") { //ÆÇ¸Å½ÇÀû
			    	GridObj.SetCellActivation(strColumnKey, i, 'disable'); //¼±ÅÃÇÒ ¼ö ¾ø°í ÆíÁýÇÒ ¼ö ¾ø´Ù.
			    }				

			}
		    
		    
	    }        
    	GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME');
    	compute_field();
    }                     
    else    
    { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
    }
    
}

function excelDown() {

	var GridObj = document.WiseGrid;
	GridObj.ExcelExport("", "", true, true);
}

function GridCellClick(strColumnKey, nRow){
	
}

function GridCellDblClick(strColumnKey, nRow){
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	compute_field();
}

function compute_field() {
	
    var rowCnt = GridObj.GetRowCount();
	var strColumnKey, p_strColumnKey;
	var ns_stock = 0, reqt_ns_stock = 0, nestle_stoc = 0; stoc_tot = 0;
    for (var i = 0 ; i < rowCnt ; i++ )	{
		var gubn = GridObj.GetCellValue("GUBN", i);
		
		// ÇöÀçÀÌÈÄ 26ÁÖÂ÷
		for(var j = 0 ; j < 27 ; j++) {
			if(j < 10) {
				strColumnKey = 'W_N0' + j;
				if(j > 0) {p_strColumnKey = 'W_N0' + (j - 1);}
			}
			else {
				strColumnKey = 'W_N' + j;
				if(j == 10) {p_strColumnKey = 'W_N0' + (j - 1);}
				else {p_strColumnKey = 'W_N' + (j - 1);}
			}
			if(gubn == "01") { // Àç°í(³ó½É)
				if(j > 0) { // ´çÁÖ ÀÌÈÄ °è»ê : Àç°í(³ó½É) - ÀüÁÖ ÆÇ¸Å¿¹Ãø
					ns_stock = strToNum(GridObj.GetCellValue(p_strColumnKey, i)) 
								- strToNum(GridObj.GetCellValue(p_strColumnKey, i + 4)); 
					if(ns_stock < 0) { // Àç°í°¡ ºÎÁ·ÇÏ¸é
						ns_stock = 0;
					}
					GridObj.SetCellValue(strColumnKey, i, ns_stock);
				}
			}
			else if(gubn == "02") { // Àç°í(³×½½·¹)
				if(j > 0) { 
					// ³ó½É Àç°í ºÎÁ·ºÐ °è»ê : ÀüÁÖ Àç°í(³ó½É) - ÀüÁÖ ÆÇ¸Å¿¹Ãø
					reqt_ns_stock = strToNum(GridObj.GetCellValue(p_strColumnKey, i - 1))
								   - strToNum(GridObj.GetCellValue(p_strColumnKey, i + 3)) 
					if(reqt_ns_stock > 0) { // Àç°í°¡ ºÎÁ·ÇÏÁö ¾ÊÀ¸¸é
						reqt_ns_stock = 0;
					}
					// Àç°í(³×½½·¹) = ÀüÁÖ Àç°í(³×½½·¹) - ³ó½É Àç°í ºÎÁ·ºÐ  + ÀüÁÖ ÀÔ°í(³×½½·¹)
					nestle_stoc = strToNum(GridObj.GetCellValue(p_strColumnKey, i)) 
								  + reqt_ns_stock
								  + strToNum(GridObj.GetCellValue(p_strColumnKey, i + 2)); 
					GridObj.SetCellValue(strColumnKey, i, nestle_stoc);
				}
			}
			else if(gubn == "03") { // Àç°í(ÇÕ°è) = Àç°í(³ó½É) + Àç°í(³×½½·¹)
				stoc_tot = strToNum(GridObj.GetCellValue(strColumnKey, i - 2)) 
							+ strToNum(GridObj.GetCellValue(strColumnKey, i - 1)); 
				GridObj.SetCellValue(strColumnKey, i, stoc_tot);
 				if(stoc_tot < 0) {
 					GridObj.SetCellFgColor(strColumnKey, i ,'255|10|10');
 				}
 			}
	    }
	}
 
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
