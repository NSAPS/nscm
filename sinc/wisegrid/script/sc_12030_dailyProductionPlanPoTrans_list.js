//############################################################
//## ÇÁ·Î±×·¥ID 	: sc_12030_dailyProductionPlanPoTrans_list.vm
//## ÇÁ·Î±×·¥¸í 	: ÀÏ°£»ý»ê°èÈ¹ º¯°æ(PO¹ßÇà)
//## °³¹ßÀÚ  	: Á¤Àç±³
//## °³¹ßÀÏÀÚ 	: 2009-03-19 ¸ñ¿äÀÏ
//##
//## °ü·Ã job file 	 : job_sc_12030_dailyProductionPlanPoTrans_list.xml
//##
//## °ü·Ã query file : query_sc_12030_dailyProductionPlanPoTrans_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-03-19  Á¤Àç±³     sc_12030_dailyProductionPlanPoTrans_list.js °³¹ß
//##
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
var mode;													// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";						// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'sc_12030_dailyProductionPlanPoTrans_list';	// job id(¼­ºí¸´ ¸í, WiseGrid Header key)
var GridObj ; 												// WiseGrid °´Ã¼

/******************************************          Action Function         **********************************************/
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Á¶È¸
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSearch(service) {
	mode = "search";
	doQuery();
};

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÀúÀå
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave() {
	mode = "save";
	doSave();	
};

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Àü¼Û
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoTrans() {
	mode = "trans";
	
	commonUtil.getCodeList("job_id", job_id , "init_trans_status_check",getTransStatus); 
};

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Àü¼Û »óÅÂ°ª Ã¼Å©.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function getTransStatus(result)
   {
        var len = document.frm.selected_plant.length;
        var str = "";
        var cnt = 0;
        for( i = 0 ; i < len ; i++){
            if( document.frm.selected_plant[i].checked == true ){
                if( cnt > 0 ) str += "','";
                str += document.frm.selected_plant[i].value;		
                cnt++;	
            }
        }		

        if( cnt == 0 ){
            alert("¼±ÅÃµÈ °øÀåÀÌ ¾ø½À´Ï´Ù!!");
            return;
        }    
        
        if(result=='Y') //»óÅÂ°ª'Y'=Àü¼Û°¡´É, 'N'=Àü¼ÛºÒ°¡´É
        {
            if(confirm("Àü¼ÛÀ» ÁøÇà ÇÏ½Ã°Ú½À´Ï±î?"))
            {
                doTrans();
            } else {
                alert('Àü¼Û Ãë¼Ò');
            }
        } else {
            alert('Àü¼Û ÁøÇà ÁßÀÔ´Ï´Ù.');
        }
   }



/*******************************************   WiseGrid ÃÊ±âÈ­ ¹× ¼³Á¤  *****************************************************/

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid ÃÊ±âÈ­
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); 	// ±âº» property ¼³Á¤
	setDefault();  			// Ãß°¡ property ¼³Á¤
	setHeader();   			// Header ¼³Á¤
			
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Property ¼³Á¤
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault(){
	
	GridObj.bUserContextMenu = true;				//»ç¿ëÀÚ ÄÁÅØ½ºÆ® ¸Þ´ºÀÇ »ç¿ë ¿©ºÎ¸¦ °áÁ¤ÇÑ´Ù. 
	GridObj.bHDMoving = false;                  	//»ç¿ëÀÚ°¡ Çì´õ¸¦ µå·¡±×ÇØ¼­ ÄÃ·³À§Ä¡¸¦ ÀÌµ¿ÇÒ¼ö ¾ø´Ù.
	GridObj.bHDSwapping = false;                	//Çì´õÀÇ ÄÃ·³À§Ä¡ÀÌµ¿ ÄÞº¸¹öÆ°À» ºñÈ°¼ºÈ­ ÇÑ´Ù.
	GridObj.bRowSelectorVisible = false;        	//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	GridObj.strRowBorderStyle = "none";         	//·Î¿ìÀÇ Å×µÎ¸®¿¡ ¾Æ¹«°Íµµ ³ªÅ¸³ªÁö ¾Ê´Â´Ù.
	GridObj.nRowSpacing = 0;                    	//RowSpacing°ªÀ» Á¤ÇÑ´Ù. 
	GridObj.strHDClickAction = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
	GridObj.strActiveRowBgColor = "180|238|180";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	//GridObj.strSelectedCellBgColor = '238|0|238'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	
	// Header Font Setting
	GridObj.nHDFontSize = 9;				  	// Font Size
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size
	
	// Grid Çà ³ôÀÌ
    GridObj.nRowHeight    = 20;
    
    GridObj.strSelectedCellFgColor = '180|82|205'; //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
   
    /* Context Menu »ç¿ëÀÚ MENU Ãß°¡ */
        
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader() 
{        
    commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DB¿¡ µî·ÏµÈ È­¸é ÇØ´õ Á¤º¸¸¦ °¡Á®¿Â´Ù.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function defaultHeader(result)
{
	var arrHeader = '';
	
	for( var i=0 ;i<result.length ;i++) //ÀüÃ¼ Row¸¸Å­ ¹Ýº¹ ÇÑ´Ù.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	
	GridObj.AddGroup("SHIFT_QTY", "º¯°æ");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj.AppendHeader("SHIFT_QTY", "FROM_QTY");
	GridObj.AppendHeader("SHIFT_QTY", "TO_QTY");
	GridObj.AppendHeader("SHIFT_QTY", "MADE_TYPE");
	
	GridObj.AddGroup("REASON_MSG", "º¸Á¤");			
	GridObj.AppendHeader("REASON_MSG", "REASON01");
	GridObj.AppendHeader("REASON_MSG", "REASON02");
	
	GridObj.BoundHeader(); //AddHeader¸¦ ¿Ï·áÇÑ ÈÄ Çì´õ¸¦ ±×¸®µå¿¡ ¹ÙÀÎµùÇÑ´Ù. 

    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('PROD_DATES','center'); 
    GridObj.SetColCellAlign('ORD_NO','center'); 
    GridObj.SetColCellAlign('ORD_ITEM_NO','center'); 
    GridObj.SetColCellAlign('TRANS_TYPE','center'); 
    GridObj.SetColCellAlign('MADE_DTTM','center'); 
    GridObj.SetColCellAlign('MADE_BY','center'); 
    GridObj.SetColCellAlign('PO_NO','center'); 
    GridObj.SetColCellAlign('REL_STAT','center'); 
	
	GridObj.SetNumberFormat("FROM_QTY", "###,###,###"); // ¼ýÀÚ Çü½Ä
	GridObj.SetNumberFormat("TO_QTY"  , "###,###,###");
	
	GridObj.nHDLines = 2; 
	GridObj.nHDLineSize  = 15;

	           
}

/***********************************************   WiseGrid Åë½Å  **********************************************************/

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Á¶È¸
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//WiseGrid°¡ ¼­¹ö¿¡ Àü¼ÛÇÒ mode¸¦ ¼ÂÆÃÇÑ´Ù.
	GridObj.SetParam("mode", mode);
	
	//-- ¼­¹ö¿¡ Àü¼ÛÇÒ ÆÄ¶ó¸ÞÅÍ ¼³Á¤ --//
	//°øÀå ÄÚµå
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("¼±ÅÃµÈ °øÀåÀÌ ¾ø½À´Ï´Ù!!");
		return;
	}
	GridObj.SetParam("plant_id", str);

	//ÁÖÂ÷
	var sdate = document.frm.start_date.value;
	var edate = document.frm.end_date.value;
	if( sdate == "" || edate == "" ){
		alert( "ÁÖÂ÷ ¼±ÅÃÀÌ Àß¸ø µÇ¾ú½À´Ï´Ù!!");
		return;
	}
	GridObj.SetParam("sdate", sdate);
	GridObj.SetParam("edate", edate);
	
	//±¸ºÐ
	var checked_po_type;
	if( document.frm.checked_po_type[0].checked == true ){
		checked_po_type = document.frm.checked_po_type[0].value;
	}else if( document.frm.checked_po_type[1].checked == true ){
		checked_po_type = document.frm.checked_po_type[1].value;
	}else if( document.frm.checked_po_type[2].checked == true ){
		checked_po_type = document.frm.checked_po_type[2].value;
	}
	
	
	GridObj.SetParam("checked_po_type",checked_po_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
				
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url);
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÀúÀå
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doSave() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid°¡ ¼­¹ö¿¡ Àü¼ÛÇÒ mode¸¦ ¼ÂÆÃÇÑ´Ù.
	GridObj.SetParam("mode", mode);
	
	//-- ¼­¹ö¿¡ Àü¼ÛÇÒ ÆÄ¶ó¸ÞÅÍ ¼³Á¤ --//
	//°øÀå ÄÚµå
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("¼±ÅÃµÈ °øÀåÀÌ ¾ø½À´Ï´Ù!!");
		return;
	}
	GridObj.SetParam("plant_id", str);

	//ÁÖÂ÷
	var sdate = document.frm.start_date.value;
	var edate = document.frm.end_date.value;
	if( sdate == "" || edate == "" ){
		alert( "ÁÖÂ÷ ¼±ÅÃÀÌ Àß¸ø µÇ¾ú½À´Ï´Ù!!");
		return;
	}
	GridObj.SetParam("sdate", sdate);
	GridObj.SetParam("edate", edate);
	
	//±¸ºÐ
	var checked_po_type;
	if( document.frm.checked_po_type[0].checked == true ){
		checked_po_type = document.frm.checked_po_type[0].value;
	}else if( document.frm.checked_po_type[1].checked == true ){
		checked_po_type = document.frm.checked_po_type[1].value;
	}else if( document.frm.checked_po_type[2].checked == true ){
		checked_po_type = document.frm.checked_po_type[2].value;
	}
	GridObj.SetParam("checked_po_type",checked_po_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Àü¼Û
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doTrans() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid°¡ ¼­¹ö¿¡ Àü¼ÛÇÒ mode¸¦ ¼ÂÆÃÇÑ´Ù.
	GridObj.SetParam("mode", mode);
	
	//-- ¼­¹ö¿¡ Àü¼ÛÇÒ ÆÄ¶ó¸ÞÅÍ ¼³Á¤ --//
	//°øÀå ÄÚµå
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("¼±ÅÃµÈ °øÀåÀÌ ¾ø½À´Ï´Ù!!");
		return;
	}
	GridObj.SetParam("plant_id", str);

	//ÁÖÂ÷
	var sdate = document.frm.start_date.value;
	var edate = document.frm.end_date.value;
	if( sdate == "" || edate == "" ){
		alert( "ÁÖÂ÷ ¼±ÅÃÀÌ Àß¸ø µÇ¾ú½À´Ï´Ù!!");
		return;
	}
	GridObj.SetParam("sdate", sdate);
	GridObj.SetParam("edate", edate);
	
	//±¸ºÐ
	var checked_po_type;
	
	checked_po_type = document.frm.checked_po_type[1].value; //Àü¼Û°á°ú
	
	GridObj.SetParam("checked_po_type",checked_po_type);
	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url);
 
}

/* INSERT */
function doInsert() {

}

/* UPDATE */
function doUpdata() {

}

/* DELET */
function doDelete() {

}

/* CHECK SELECTED */
function chkSelected() {

}

/* LINE INSERT */
function doLineInsert() {

}

/* EXCEL DWON */
function excelDown() {

}

/*******************************************   WiseGrid Åë½Å ÈÄ  ¼³Á¤  ******************************************************/

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢	WiseGrid Åë½Å ÈÄ Grid ¼³Á¤ ¹× ½ÇÇà Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() {
    var checked_po_type ='';
    
	setGrid(GridObj); //WiseGrid ¼³Á¤
			
	//
	var mode = GridObj.GetParam("mode");

	if(mode == "search") { //Á¶È¸
		if(GridObj.GetStatus() == "true") { // 
						
		} else	{ 
			var error_msg = GridObj.GetMessage(); // 
			alert(error_msg);			
		}
		
		
    	if( document.frm.checked_po_type[0].checked == true ){
    		checked_po_type = document.frm.checked_po_type[0].value;
    	}else if( document.frm.checked_po_type[1].checked == true ){
    		checked_po_type = document.frm.checked_po_type[1].value;
    	}else if( document.frm.checked_po_type[2].checked == true ){
    		checked_po_type = document.frm.checked_po_type[2].value;
    	}		
		
		if(checked_po_type=='03')
		{
		    GridObj.SetColHide('REASON01', true) 
		    GridObj.SetColHide('REASON02', true) 
		    GridObj.SetColHide('MADE_BY' , true)
		} else {
		    GridObj.SetColHide('REASON01', false) 
		    GridObj.SetColHide('REASON02', false) 
		    GridObj.SetColHide('MADE_BY' , false) 
	    }
	    GridObj.SetColHide('TRANS_MSG' , true) 
	    
	} else if(mode == "insert") {
		
	} else if(mode == "update") {
		
	} else if(mode == "delete") {
		
	}else if(mode == "save") {
		if(GridObj.GetStatus() == "true") {// 
			//GoSearch("");
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}else if(mode == "trans"){ //Àü¼Û
		if(GridObj.GetStatus() == "true") {// 
			//document.frm.checked_po_type[1].checked = true;
			document.frm.btnSelect.disabled = true;
		} else {
			var error_msg = GridObj.GetMessage();// 
//			alert(error_msg);			
		}
	}
	
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid ¼³Á¤
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setGrid(){
	
	// ÄÃ·³ ±×·ì
	GridObj.SetGroupMerge('PLANT_NAME,PROC_NAME,ITEM_NAME'); 
	
	// ÄÃ·³ °íÁ¤
	//GridObj.SetColFix('C14');
	
	// ÆíÁý ¿©ºÎ ¼³Á¤
	//GridObj.SetColCellActivation('SP01','disable');
	
	//ÄÃ·³ ±ÛÀÚ»ö
	//GridObj.SetCellFgColor('C38', i, '255|10|10');
	
	// ¼¿ ¹è°æ
	//GridObj.SetCellBgColor('C02', 1, '10|10|255');
	
	// Get Hidden Value 
	//GridObj.GetCellHiddenValue('ITEM_NAME',0) 
	
	// ÇÕ°è
	//GridObj.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', 'D01A,D01B,D01C,D02A,D02B,D02C,D03A,D03B,D03C,D04A,D05B,D05C,D06A,D06B,D06C,D07A,D07B,D07C,C36'); 
	//GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
			
	// ÄÃ·³ ¹è°æ»ö
	//GridObj.SetColCellBgColor('C36','160|160|160');//ÇÕ°è
    
    // ¸¶Áö¸· º¯°æÇÑ Row·Î ÀÌµ¿
    //GridObj.MoveRow(rowIndex);
}



/*********************************************   WiseGrid Event   *********************************************************/ 
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid Mouse Over Event
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridMouseOverHandler(strType, strColumnKey, nRow){ 

};

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid User Context Menu Click Event
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
		
//	if( strMenuKey == "MENU_CELL" ){// CELL Å¬¸¯½Ã ¸Þ´º
//		
//		if( strMenuItemKey == "MENU01" ){		// ROW Ãß°¡
//			
//		}
//		else if( strMenuItemKey == "MENU02" ){	// ROW »èÁ¦
//
//		}
//		else {
//			alert("Á¸Àç ÇÏÁö ¾ÊÀº ¸Þ´ºÀÔ´Ï´Ù.");
//		}		
//	}

};

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid Change Combo Event
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){

};

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid Cell Change Event
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridChangeCell(strColumnKey, nRow) {

}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid Cell Click Event
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow){

}

/*********************************************   ±âÅ¸ Function   **********************************************************/
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setWiseGridAutoResize( tab_h, table_h ){
	
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

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÁÖÂ÷ ¼±ÅÃ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/	
function checkedWeekly(obj){

	obj.checked;
	
	if( obj.value == "01" ){
		document.frm.btnSelect.disabled = false;
	}
	else{
		document.frm.btnSelect.disabled = true;
	}

}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇöÀç ³¯Â¥(yyyymmdd) ÃßÃâ  Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function getdatetime() {
	var today = new Date();
	var year = today.getYear();
	var month = today.getMonth() + 1;
	var day = today.getDate();
	
	if(month < 10)
		month = "0" + month;
		
	if(day < 10)
		day = "0" + day;

	document.frm.to_date.value = year + "" + month + "" + day;
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Check Box °øÀå : ÀüÃ¼ Click  Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function checkSelectedPlantAll(obj){
	
	var len = document.frm.selected_plant.length;
	if( obj.checked == true ){
		//alert(document.frm.selected_plant.length);		
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = true;
		}
	}
	else{
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = false;
		}
	}
	
};	
