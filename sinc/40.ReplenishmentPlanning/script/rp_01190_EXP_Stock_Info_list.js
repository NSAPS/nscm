//############################################################
//## ÇÁ·Î±×·¥ID      : rp_01190_EXP_Stock_Info_list.js
//## ÇÁ·Î±×·¥¸í      : ¼öÃâÃâ°íÀå Àç°íºÐ¼®
//## °³¹ßÀÚ          : ³²¿õ¿ë
//## °³¹ßÀÏÀÚ        : 2016-08-09
//##
//## °ü·Ã job file   : job_sinc_40_replenishmentPlanning_03.xml
//## °ü·Ã query file : query_sinc_40_replenishmentPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2016-08-09  ³²¿õ¿ë          create
//##
//############################################################



/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'rp_01190_EXP_Stock_Info_list';
var GridObj ; 													// WiseGrid °´Ã¼
var GridObj2;

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

	setProperty(GridObj2); 	// ±âº» property ¼³Á¤
	setDefault2();  			// Ãß°¡ property ¼³Á¤
//	setHeader2();   			// Header ¼³Á¤
			
}
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2; 	
}

function setDefault2(){
	
	GridObj2.bUserContextMenu = true;				//»ç¿ëÀÚ ÄÁÅØ½ºÆ® ¸Þ´ºÀÇ »ç¿ë ¿©ºÎ¸¦ °áÁ¤ÇÑ´Ù. 
	GridObj2.bHDMoving = true;                  	//»ç¿ëÀÚ°¡ Çì´õ¸¦ µå·¡±×ÇØ¼­ ÄÃ·³À§Ä¡¸¦ ÀÌµ¿ÇÒ¼ö ¾ø´Ù.
	GridObj2.bHDSwapping = false;                	//Çì´õÀÇ ÄÃ·³À§Ä¡ÀÌµ¿ ÄÞº¸¹öÆ°À» ºñÈ°¼ºÈ­ ÇÑ´Ù.
	GridObj2.bRowSelectorVisible = false;        		//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	GridObj2.bRowSelectorIndex = false;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù. 
	GridObj2.strRowBorderStyle = "none";         	//·Î¿ìÀÇ Å×µÎ¸®¿¡ ¾Æ¹«°Íµµ ³ªÅ¸³ªÁö ¾Ê´Â´Ù.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing°ªÀ» Á¤ÇÑ´Ù. 
	GridObj2.strHDClickAction = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
	GridObj2.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
    GridObj2.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName = '¸¼Àº °íµñ';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	
	//Hearder ³ôÀÌ
	GridObj2.nHDLineSize   = 12;   //12
	
	// Grid Çà ³ôÀÌ
    GridObj2.nRowHeight    = 12;    //22
    
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj2.nHDLines = 2; 
 	GridObj2.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'       
 
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        

	GridObj.AddHeader("ITEM_ID"		,"Á¦Ç°ÄÚµå"   	,"t_text" 		,100	,70 ,false); //0
	GridObj.AddHeader("ITEM_NAME"	,"Á¦Ç°¸í"    		,"t_text" 		,100    ,300 ,false);
 	GridObj.AddHeader("STOCK_7700"		,"±âÃÊÀç°í"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("IPGO_7700"		,"ÀÔ°í¿¹Á¤·®"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("EXPT_STOC_7700"	,"¿¹»óÀç°í"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("CHGO_7700"		,"ÀÛ¾÷¿¹Á¤·®"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("GAP_7700"			,"Â÷ÀÌ·®"   		,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("STOCK_1842"		,"±âÃÊÀç°í"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("IPGO_1842"		,"ÀÔ°í¿¹Á¤·®"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("EXPT_STOC_1842"	,"¿¹»óÀç°í"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("CHGO_1842"		,"ÀÛ¾÷¿¹Á¤·®"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("GAP_1842"			,"Â÷ÀÌ·®"   		,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("STOCK_8938"		,"±âÃÊÀç°í"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("IPGO_8938"		,"ÀÔ°í¿¹Á¤·®"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("EXPT_STOC_8938"	,"¿¹»óÀç°í"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("CHGO_8938"		,"ÀÛ¾÷¿¹Á¤·®"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("GAP_8938"			,"Â÷ÀÌ·®"   		,"t_number" 	,100	,70 ,false); //0   


	GridObj.AddGroup("PUSAN", "ºÎ»êÁ¦Ç°°ü¸®ÁöÁ¡");			 
	GridObj.AppendHeader("PUSAN", "STOCK_7700");
	GridObj.AppendHeader("PUSAN", "IPGO_7700");
	GridObj.AppendHeader("PUSAN", "EXPT_STOC_7700");
	GridObj.AppendHeader("PUSAN", "CHGO_7700");
	GridObj.AppendHeader("PUSAN", "GAP_7700");
	GridObj.AddGroup("DONGWOO", "µ¿¿ì");			 
	GridObj.AppendHeader("DONGWOO", "STOCK_1842");
	GridObj.AppendHeader("DONGWOO", "IPGO_1842");
	GridObj.AppendHeader("DONGWOO", "EXPT_STOC_1842");
	GridObj.AppendHeader("DONGWOO", "CHGO_1842");
	GridObj.AppendHeader("DONGWOO", "GAP_1842");
	GridObj.AddGroup("DSJ", "DSJ");			 
	GridObj.AppendHeader("DSJ", "STOCK_8938");
	GridObj.AppendHeader("DSJ", "IPGO_8938");
	GridObj.AppendHeader("DSJ", "EXPT_STOC_8938");
	GridObj.AppendHeader("DSJ", "CHGO_8938");
	GridObj.AppendHeader("DSJ", "GAP_8938");

	GridObj.BoundHeader();	
	
    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('STOCK_7700','right'); 
    GridObj.SetColCellAlign('IPGO_7700','right'); 
    GridObj.SetColCellAlign('EXPT_STOC_7700','right'); 
    GridObj.SetColCellAlign('CHGO_7700','right'); 
    GridObj.SetColCellAlign('GAP_7700','right'); 
    GridObj.SetColCellAlign('STOCK_1842','right'); 
    GridObj.SetColCellAlign('IPGO_1842','right'); 
    GridObj.SetColCellAlign('EXPT_STOC_1842','right'); 
    GridObj.SetColCellAlign('CHGO_1842','right'); 
    GridObj.SetColCellAlign('GAP_1842','right'); 
    GridObj.SetColCellAlign('STOCK_8938','right'); 
    GridObj.SetColCellAlign('IPGO_8938','right'); 
    GridObj.SetColCellAlign('EXPT_STOC_8938','right'); 
    GridObj.SetColCellAlign('CHGO_8938','right'); 
    GridObj.SetColCellAlign('GAP_8938','right'); 
     
    GridObj.SetNumberFormat('STOCK_7700','#,##0');
    GridObj.SetNumberFormat('IPGO_7700','#,##0');
    GridObj.SetNumberFormat('EXPT_STOC_7700','#,##0');
    GridObj.SetNumberFormat('CHGO_7700','#,##0');
    GridObj.SetNumberFormat('GAP_7700','#,##0');
    GridObj.SetNumberFormat('STOCK_1842','#,##0');
    GridObj.SetNumberFormat('IPGO_1842','#,##0');
    GridObj.SetNumberFormat('EXPT_STOC_1842','#,##0');
    GridObj.SetNumberFormat('CHGO_1842','#,##0');
    GridObj.SetNumberFormat('GAP_1842','#,##0');
    GridObj.SetNumberFormat('STOCK_8938','#,##0');
    GridObj.SetNumberFormat('IPGO_8938','#,##0');
    GridObj.SetNumberFormat('EXPT_STOC_8938','#,##0');
    GridObj.SetNumberFormat('CHGO_8938','#,##0');
    GridObj.SetNumberFormat('GAP_8938','#,##0');

	GridObj.SetColHDBgColor('GAP_7700',					'253|228|229');
	GridObj.SetColHDBgColor('GAP_1842',					'253|228|229');
	GridObj.SetColHDBgColor('GAP_8938',					'253|228|229');

}

function setHeader2(item_id) 
{        
	
	GridObj2.AddHeader("DC_NAME"		,"CDC"		       	,"t_text" 		,100	,40  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA"		,"Àç°í(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_BOX"	,"Àç°í(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_PAL"	,"Àç°í(PAL)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("BASE_STOCK"		,"´çÀÏ\nÀç°í"      		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("CHGO_QTY"		,"Ãâ°í·®"	       		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_1"		,"Á¶°£"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_3"		,"ÁÖ°£"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("CONF_STOCK"		,"Ãâ°í\n°¡´É"       	,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("TRANS_QTY"		,"Ãâ°íÈ®Á¤"       	,"t_number" 	,500.3	,55   ,true); //0   
 	GridObj2.AddHeader("NEXT_CHGO_QTY"	,"ÀÍÀÏ\nÃâ°í"       	,"t_number" 	,500	,50  ,false); //0   
 	GridObj2.AddHeader("NEXT_TRANS_QTY"	,"ÀÍÀÏ\n°èÈ¹"       	,"t_number" 	,500.3	,50  ,false); //0   
	
	var trans_start   = document.frm.cnfm_date.value;
	var today 		= document.frm.cnfm_date.value;
	//var item_id 	  = document.frm.item_id.value;
	var itype		  = 'FERT' //document.frm.itype.value;
	var header_length = 0, j;
	
	commonUtil.getSelQeury( "trans_start!%!item_id!%!itype", today+"!%!"+item_id+"!%!"+itype, "rp_01160_replenishmentNiceLikePlan_DW2_HEADER",{
		callback:function(result){

			for(var i=0 ; i < 20 ; i++){
				if(i < result.length) {
					GridObj2.AddHeader("PROD"+result[i][1]	,result[i][0]       	,"t_number" 	,500.3	,result[i][2]  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 9) {
						GridObj2.AddHeader("PROD0"+j	,"-"     	,"t_number" 	,500.3	,0  ,false);
					}
					else {
						GridObj2.AddHeader("PROD"+j		,"-"       	,"t_number" 	,500.3	,0  ,false);
					}
				}
			}
		 	
		 	GridObj2.AddHeader("PROD_AVAILABLE"	,"»ý»ê°¡´É"       	,"t_text" 	,500	,30  ,false); //0   
		
			GridObj2.BoundHeader(); //AddHeader¸¦ ¿Ï·áÇÑ ÈÄ Çì´õ¸¦ ±×¸®µå¿¡ ¹ÙÀÎµùÇÑ´Ù. 
			
			GridObj2.SetColHide("PROD_AVAILABLE", true);
			
			GridObj2.SetNumberFormat("BASE_STOCK", 		 "###,###,###"); // ¼ýÀÚ Çü½Ä
			GridObj2.SetNumberFormat("CHGO_QTY", 		 "###,###,###"); // ¼ýÀÚ Çü½Ä
			GridObj2.SetNumberFormat("PROD01_1", 		 "###,###,###"); // ¼ýÀÚ Çü½Ä
			GridObj2.SetNumberFormat("PROD01_3", 		 "###,###,###"); // ¼ýÀÚ Çü½Ä
			GridObj2.SetNumberFormat("CONF_STOCK", 		 "###,###,###");
			GridObj2.SetNumberFormat("TRANS_QTY", 		 "###,###,###");
			GridObj2.SetNumberFormat("NEXT_CHGO_QTY", 	 "###,###,###");
			GridObj2.SetNumberFormat("NEXT_TRANS_QTY", "###,###,###.#");
			GridObj2.SetNumberFormat("USE_CAPA", 	 	 "###,###,###");
			GridObj2.SetNumberFormat("USE_CAPA_BOX", 	 "###,###,###");
			GridObj2.SetNumberFormat("USE_CAPA_PAL", 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD01", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD02", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD03", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD04", 			 "###,###,###");
			GridObj2.SetNumberFormat("PROD05", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD06", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD07", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD08", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD09", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD10", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD11", 			 "###,###,###");
			GridObj2.SetNumberFormat("PROD12", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD13", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD14", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD15", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD16", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD17", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD18", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD19", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD20", 		 	 "###,###,###");
			
			GridObj2.SetColCellAlign('DC_NAME','left');
			GridObj2.SetColCellFontName('DC_NAME','¸¼Àº °íµñ');
			GridObj2.SetColCellFontBold('DC_NAME','true');
			
			GridObj2.SetColHDBgColor('TRANS_QTY','253|228|229');

//			if(document.frm.itype.value == "HAWA") {
//				GridObj2.SetColHide("PROD01_1", true);
//				GridObj2.SetColHide("PROD01_3", true);
//			}
			
			GridObj2.SetColHide("USE_CAPA", true);
			GridObj2.SetColHide("USE_CAPA_BOX", true);
			GridObj2.SetColHide("USE_CAPA_PAL", true);
			// CAPAÃß°¡·Î ÇÑ°³ÄÃ·³ °¡¸°´Ù.
			//GridObj2.SetColHide("PROD12", true);
			
			doQuery2(item_id);			
		}
	});   
}


   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
	   	GridObj2.ClearGrid( ); 
    	doQuery();
   }
  
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave  (service) {

}
      
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var cnfm_date   = document.all.cnfm_date.value;
       var sel_gubn   = document.all.sel_gubn.value;

       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("cnfm_date", cnfm_date);
       GridObj.SetParam("sel_gubn", sel_gubn);
       GridObj.DoQuery(servlet_url);
   }


function doQuery2(item_id) {
		
	var servlet_url = Project_name+"/servlet/" + class_path + 'ip_02060_SalesAllocationNiceLikePlan';
	
	//WiseGrid°¡ ¼­¹ö¿¡ Àü¼ÛÇÒ mode¸¦ ¼ÂÆÃÇÑ´Ù.
	GridObj2.SetParam("mode", "search_DW3");
	
	//-- ¼­¹ö¿¡ Àü¼ÛÇÒ ÆÄ¶ó¸ÞÅÍ ¼³Á¤ --//
	//°øÀå ÄÚµå

	//var item_id = document.frm.item_id.value;
	var today = document.frm.cnfm_date.value;
	var version =  document.frm.cnfm_date.value.replace("-","").replace("-","");
	var seq = "";
	var itype = 'FERT'; //document.frm.itype.value;
	//rp_01160 Äõ¸®¸¦ »ç¿ëÇÏÁö¸¸ È­¸é¿¡¼­ ¹Þ¾Æ¿À´Â ¹öÀü µ¥ÀÌÅÍ´Â 'YYYYMMDD' ÇüÅÂÀÌ´Ù. 'YYYYMMDD.HH.MM' À» ¹Þ¾Æ¿Â´Ù.
	commonUtil.getSelQeury( "version", document.frm.cnfm_date.value, "rp_01160_replenishmentNiceLikePlan_DW2_Trans_Version",{
		callback:function(result){

		version = result;
		 			
		}});
	
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("trans_start", today);
	GridObj2.SetParam("version",version);
	GridObj2.SetParam("seq", seq);
	GridObj2.SetParam("itype", itype);
	GridObj2.SetParam("check_day", "TODAY"); // ´çÀÏ°èÈ¹
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW2");
				
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj2.DoQuery(servlet_url);
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
            	var rowLeng = GridObj.GetRowCount();
            	
            	for( var row=0 ; row<rowLeng ; row++ ){ //row¼ö¸¸Å­ ¹Ýº¹
	        		if(strToNum(GridObj.GetCellValue("GAP_7700", row)) < 0) {GridObj.SetCellFontBold("GAP_7700", row, 'true'); GridObj.SetCellFgColor("GAP_7700", row, '255|0|0');}
	        		if(strToNum(GridObj.GetCellValue("GAP_1842", row)) < 0) {GridObj.SetCellFontBold("GAP_1842", row, 'true'); GridObj.SetCellFgColor("GAP_1842", row, '255|0|0');}
	        		if(strToNum(GridObj.GetCellValue("GAP_8938", row)) < 0) {GridObj.SetCellFontBold("GAP_8938", row, 'true'); GridObj.SetCellFgColor("GAP_8938", row, '255|0|0');}
            	}
            	
            	GridObj.SetColCellBgColor('GAP_7700','232|232|255');
            	GridObj.SetColCellBgColor('GAP_1842','232|232|255');
            	GridObj.SetColCellBgColor('GAP_8938','232|232|255');

            	GridObj.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', 'STOCK_7700,IPGO_7700,EXPT_STOC_7700,CHGO_7700,GAP_7700,STOCK_1842,IPGO_1842,EXPT_STOC_1842,CHGO_1842,GAP_1842,STOCK_8938,IPGO_8938,EXPT_STOC_8938,CHGO_8938,GAP_8938'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '212|212|212'); 
            	
            
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
		
    }

function GridEndQuery2() {
		
	setGrid2(); //WiseGrid ¼³Á¤
			
	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //Á¶È¸
		if(GridObj2.GetStatus() == "true") { // 
			
		}
	}

}


   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }


function CellDblClick_DW1 (strColumnKey, nRow){

	if(GridObj.GetRowCount() < 1) return;
	
	var item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	
	GridObj2.ClearGrid( ); 
    setHeader2(item_id);  

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
    
    
    

