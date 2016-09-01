//############################################################
//## ÇÁ·Î±×·¥ID      : md_10010_manugistics_master_management.vm
//## ÇÁ·Î±×·¥¸í      : manugistics ¸¶½ºÅÍ°ü¸®
//## °³¹ßÀÚ          : ³²¿õ¿ë
//## °³¹ßÀÏÀÚ        : 2010-01-27
//##
//## °ü·Ã job file   : job_md_10010_manugistics_master_management.xml
//## °ü·Ã query file : query_md_10010_manugistics_master_management.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2010-01-27  ³²¿õ¿ë      create
//## 2.0        2013-08-27  ³²¿õ¿ë      1.ÀúÀå½Ã ½ÇÆÐÇÏ´Â °æ¿ì·Î ÀÎÇØ endquery¿¡¼­ ÀúÀåÈÄ ÀçÁ¶È¸
//##                                   2.ÀúÀåÈÄ ÀçÁ¶È¸ ½Ã ±×¸®µå À§Ä¡ À¯Áö ÄÚµù Ãß°¡
//##
//############################################################

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'md_10010_manugistics_master_management';
var GridObj ; 													// WiseGrid °´Ã¼

var color_tot = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/* VER 2.0 º¯°æ»çÇ× */
var rFirst = 0;							// ÀúÀå ÀÛ¾÷ÈÄ ÀçÁ¶È¸½Ã È­¸éÀ§Ä¡¸¦ À¯ÁöÇÏ±â À§ÇÑ Row Index ÀúÀå º¯¼ö

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

	// Header Font Setting
	GridObj.strHDFontName = '¸¼Àº °íµñ';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2; 
 
}

       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        

	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 		,100    ,60  ,false);
	GridObj.AddHeader("ITEM_ID"			,"Ç°¸ñÄÚµå"       	,"t_text" 		,100    ,60  ,false);
	GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"       		,"t_text" 		,200	,200 ,false); //0
 	GridObj.AddHeader("MFS_FLAG"		,"¹ßÁÖ±×·ì"       	,"t_combo" 		,10		,90   ,true); //0	//2013-04-18 Ãß°¡
 	GridObj.AddHeader("USE_PR_PLAN"		,"¹ßÁÖ±×·ì"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("PR_FLAG"			,"¹ßÁÖ°ü¸®"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("ST_FLAG"			,"Àç°í°ü¸®"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("RC_FLAG"			,"±¹³»¸ÅÀÔ"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("SEMI_FLAG"		,"¼ÒºÐ\nÀ¯Åë"     	,"t_checkbox" 	,10		,40   ,true); //0
 	
 	GridObj.AddHeader("BS_FLAG1"		,"»óÇ°"       	,"t_checkbox" 	,10		,40   ,true); //0 
 	GridObj.AddHeader("BS_FLAG3"		,"º£ÀÌ½º"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("BS_FLAG2"		,"»óÇ°"     		,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("BS_FLAG4"		,"º£ÀÌ½º"     	,"t_checkbox" 	,10		,40   ,true); //0
 	   
 	GridObj.AddHeader("PR_TO_PO"		,"PR~PO"       		,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PO_TO_LC"		,"PO~¼±Àû"       	,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("LC_TO_PORT"		,"¼±Àû~ÀÔÇ×"       	,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PORT_TO_CUST"	,"ÀÔÇ×~Åë°ü"       	,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("STD_VAR_FR"		,"Ç¥ÁØÆíÂ÷\nFROM"    ,"t_number" 		,10.2	,60   ,true); //0   
 	GridObj.AddHeader("STD_VAR_TO"		,"Ç¥ÁØÆíÂ÷\nTO"      ,"t_number" 		,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PRE_MONTH_FR"	,"µ¿¿ùºñÀ²"    		,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PRE_MONTH_TO"	,"Æò±ÕºñÀ²"      		,"t_number" 	,10.2	,60   ,true); //0   


	GridObj.AddHeader("CONTAINER_BOX"	,"ÄÜÅ×ÀÌ³Ê¹Ú½º"      	,"t_number" 	,10.2	,50   ,true); //0                   				                              
 	GridObj.AddHeader("P1110"			,"¾È¾ç"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1120"			,"¾È¼º"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1130"			,"¾È¼º\nÀ½·á"      	,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1140"			,"¾Æ»ê"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1150"			,"Æ÷½Â"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1160"			,"±¸¹Ì"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1170"			,"ºÎ»ê"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1180"			,"³ì»ê"      		,"t_number" 	,10.2	,50   ,true); //0   


 	GridObj.AddHeader("USE_DP_FLAG"		,"DP"       		,"t_checkbox" 	,10		,30   ,true); //0   
 	GridObj.AddHeader("USE_DP_DATE"		,"DP»ç¿ë±âÇÑ"       	,"t_text" 		,100	,80  ,false); //0   
 	GridObj.AddHeader("DPCAL"			,"DP´Þ·Â"       		,"t_combo" 		,100	,60   ,true); //0   
 	GridObj.AddHeader("USE_TAGE_FLAG"	,"Å¸°èÁ¤"       		,"t_checkbox" 	,10		,30   ,true); //0   
 	GridObj.AddHeader("USE_FF_FLAG"		,"FF"       		,"t_checkbox" 	,10		,30   ,true); //0   
 	GridObj.AddHeader("USE_FF_DATE"		,"FF»ç¿ë±âÇÑ"       	,"t_text" 		,200	,80  ,false); //0   
 	GridObj.AddHeader("ORDER_FLAG"		,"¼öÁÖ"       		,"t_checkbox" 	,200	,30   ,true); //0   
 	GridObj.AddHeader("CUSTORDERDUR"	,"¼öÁÖ\n±â°£"       	,"t_number" 	,200	,40   ,true); //0   
 	GridObj.AddHeader("MPSRULE"			,"MPSRule"       	,"t_combo" 		,200	,60   ,true); //0   
 	GridObj.AddHeader("MPSCOVDUR"		,"Cover\n±â°£"      	,"t_number" 	,200	,50   ,true); //0   
 	GridObj.AddHeader("MAXOH"			,"ÃÖ´ëÀç°í"       	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("ALLOCCAL"		,"DRP´Þ·Â"       	,"t_combo" 		,200	,80   ,true); //0   
 	GridObj.AddHeader("PLANDUR"			,"DRP±â°£"       	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("TIMEFENSEDUR"	,"TP±â°£\n(WEEK)"   	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("CPPPRIORITY"		,"CPP\n¿ì¼±¼øÀ§"     	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("SSRULE"			,"SSRule"       	,"t_combo" 		,200	,60   ,true); //0   
 	GridObj.AddHeader("SSCOV"			,"SS\nÀÏ¼ö"       	,"t_number" 	,200	,40   ,true); //0   
 	GridObj.AddHeader("MINSS"			,"ÃÖ¼ÒSS\n¹Ú½º¼ö"    	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("MAXSS"			,"ÃÖ´ëSS\n¹Ú½º¼ö"    	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("SSTEMPLATE"		,"SS\nTemplate"     ,"t_text" 		,200	,60  ,false); //0   
 	GridObj.AddHeader("INCMPSQTY"		,"ÀÇ·Ú\nÁõ°¡·®"      	,"t_number" 	,200	,50   ,true); //0   
 	GridObj.AddHeader("MINMPSQTY"		,"ÃÖ¼Ò\nÀÇ·Ú·®"      	,"t_number" 	,200.6	,60   ,true); //0   
 	GridObj.AddHeader("MANU_DEL_DUR"	,"manu»èÁ¦\nº¸·ù±â°£" ,"t_number" 		,200	,70   ,true); //0   

 	GridObj.AddHeader("DOMAIN"			,"À¯Çü" 				,"t_combo" 		,200	,110  ,true); //0   
 	GridObj.AddHeader("MIN_PICK_QTY"	,"ÀÌ°í´ÜÀ§" 			,"t_number" 	,200	,70   ,true); //0   
 	

	GridObj.AddGroup("PRE_YEAR", "Àü³âµ¿¿ù");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj.AppendHeader("PRE_YEAR", "PRE_MONTH_FR");
	GridObj.AppendHeader("PRE_YEAR", "PRE_MONTH_TO");
	
	GridObj.AddGroup("SODA", "À£Ä¡¼Ò´Ù");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj.AppendHeader("SODA", "BS_FLAG1");
	GridObj.AppendHeader("SODA", "BS_FLAG3");
	
	GridObj.AddGroup("JUICE", "À£Ä¡ÁÖ½º");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj.AppendHeader("JUICE", "BS_FLAG2");
	GridObj.AppendHeader("JUICE", "BS_FLAG4");


	GridObj.BoundHeader();	
	
	GridObj.SetColFix('ITEM_NAME');	//2013-04-19 ¿ìÁ¾±Õ Ãß°¡

	GridObj.SetCRUDMode("CRUD");  // AD¿Í DE°¡ ¼ÂÆÃ µÉ °æ¿ì´Â ¾ø´Ù.

	//Hidden ÄÃ·³
	GridObj.SetColHide("CRUD",true);
	
	// ÀÚÀç Á¶È¸½Ã¿¡´Â °¨Ãá´Ù 
	if(document.frm.itype[3].checked == true) {
	
		GridObj.SetColHide("USE_DP_FLAG"		,true);
		GridObj.SetColHide("USE_DP_DATE"		,true);
		GridObj.SetColHide("DPCAL"			    ,true);
		GridObj.SetColHide("USE_TAGE_FLAG"	    ,true);
		GridObj.SetColHide("USE_FF_FLAG"		,true);
		GridObj.SetColHide("USE_FF_DATE"		,true);
		GridObj.SetColHide("ORDER_FLAG"			,true);
		GridObj.SetColHide("CUSTORDERDUR"	    ,true);
		GridObj.SetColHide("MPSRULE"			,true);
		GridObj.SetColHide("MPSCOVDUR"		    ,true);
		GridObj.SetColHide("MAXOH"			    ,true);
		GridObj.SetColHide("ALLOCCAL"		    ,true);
		GridObj.SetColHide("PLANDUR"			,true);
		GridObj.SetColHide("TIMEFENSEDUR"	    ,true);
		GridObj.SetColHide("CPPPRIORITY"		,true);
		GridObj.SetColHide("SSRULE"				,true);
		GridObj.SetColHide("SSCOV"			    ,true);
		GridObj.SetColHide("MINSS"			    ,true);
		GridObj.SetColHide("MAXSS"			    ,true);
		GridObj.SetColHide("SSTEMPLATE"			,true);
		GridObj.SetColHide("INCMPSQTY"		    ,true);
		GridObj.SetColHide("MINMPSQTY"		    ,true);
		GridObj.SetColHide("MANU_DEL_DUR"	    ,true);

		GridObj.SetColHide("CONTAINER_BOX"	    ,true);

	}
	else {
		GridObj.SetColHide("P1110"				,true);
		GridObj.SetColHide("P1120"			    ,true);
		GridObj.SetColHide("P1130"			    ,true);
		GridObj.SetColHide("P1140"			    ,true);
		GridObj.SetColHide("P1150"				,true);
		GridObj.SetColHide("P1160"		    	,true);
		GridObj.SetColHide("P1170"		    	,true);
		GridObj.SetColHide("P1180"	    		,true);
	}

	GridObj.SetColCellAlign('ITEM_ID',		'center');
	GridObj.SetColCellAlign('USE_DP_DATE',	'center');
	GridObj.SetColCellAlign('USE_FF_DATE',	'center');
	GridObj.SetColCellAlign('DOMAIN',		'center');
	GridObj.SetColCellAlign('MFS_FLAG',		'center');

	GridObj.SetColCellBgColor('USE_PR_PLAN',	color_edit_col);
	GridObj.SetColCellBgColor('PR_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('ST_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('RC_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('SEMI_FLAG',		color_edit_col);
	
	GridObj.SetColCellBgColor('BS_FLAG1',		color_edit_col);
	GridObj.SetColCellBgColor('BS_FLAG2',		color_edit_col);
	GridObj.SetColCellBgColor('BS_FLAG3',		color_edit_col);
	GridObj.SetColCellBgColor('BS_FLAG4',		color_edit_col);
	GridObj.SetColCellBgColor('PR_TO_PO',		color_edit_col);
	GridObj.SetColCellBgColor('PO_TO_LC',		color_edit_col);
	GridObj.SetColCellBgColor('LC_TO_PORT',		color_edit_col);
	GridObj.SetColCellBgColor('PORT_TO_CUST',	color_edit_col);
	GridObj.SetColCellBgColor('STD_VAR_FR',		color_edit_col);
	GridObj.SetColCellBgColor('STD_VAR_TO',		color_edit_col);
	GridObj.SetColCellBgColor('PRE_MONTH_FR',	color_edit_col);
	GridObj.SetColCellBgColor('PRE_MONTH_TO',	color_edit_col);

	GridObj.SetColCellBgColor('CONTAINER_BOX',	color_edit_col);

	GridObj.SetColCellBgColor('USE_DP_FLAG',	color_edit_col);
	GridObj.SetColCellBgColor('DPCAL',			color_edit_col);
	GridObj.SetColCellBgColor('USE_TAGE_FLAG',	color_edit_col);
	GridObj.SetColCellBgColor('USE_FF_FLAG',	color_edit_col);
	GridObj.SetColCellBgColor('ORDER_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('CUSTORDERDUR',	color_edit_col);
	GridObj.SetColCellBgColor('MPSRULE',		color_edit_col);
	GridObj.SetColCellBgColor('MPSCOVDUR',		color_edit_col);
	GridObj.SetColCellBgColor('MAXOH',			color_edit_col);
	GridObj.SetColCellBgColor('ALLOCCAL',		color_edit_col);
	GridObj.SetColCellBgColor('PLANDUR',		color_edit_col);
	GridObj.SetColCellBgColor('TIMEFENSEDUR',	color_edit_col);
	GridObj.SetColCellBgColor('CPPPRIORITY',	color_edit_col);
	GridObj.SetColCellBgColor('SSRULE',			color_edit_col);
	GridObj.SetColCellBgColor('SSCOV',			color_edit_col);
	GridObj.SetColCellBgColor('MINSS',			color_edit_col);
	GridObj.SetColCellBgColor('MAXSS',			color_edit_col);
	GridObj.SetColCellBgColor('INCMPSQTY',		color_edit_col);
	GridObj.SetColCellBgColor('MINMPSQTY',		color_edit_col);
	GridObj.SetColCellBgColor('MANU_DEL_DUR',	color_edit_col);
	GridObj.SetColCellBgColor('MFS_FLAG',		color_edit_col);
	
	GridObj.SetNumberFormat("CONTAINER_BOX",	"###,###,##0");
	GridObj.SetNumberFormat("MIN_PICK_QTY",		"###,###,##0");
	
       
}
   																																																																																																																																																																																																																																																																																																																																																																																																								
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
		
		rFirst = 0; /* VER 2.0 º¯°æ»çÇ× */

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
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}
      
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var in_input_gubn	= document.all.in_input_gubn.value;
	var sale_code		= document.all.sale_code.value;
	
	var com_code 		= document.all.com_code.value;

	var itype = "";
	if(document.frm.itype[0].checked == true) itype = "FERT";
	else if(document.frm.itype[1].checked == true) itype = "HAWA";
	else if(document.frm.itype[2].checked == true) itype = "EXPO";
	else itype = "ROH";
	
	
	//var com_code = "";
	//if(document.frm.com_code[0].checked == true) com_code = "0001000050";	//ÅÂ°æ
	//else if(document.frm.com_code[1].checked == true) com_code = "0001000021";	//À²ÃÌ
	//else com_code = "0001000021";	//À²ÃÌ

	GridObj.ClearGrid();
	setHeader(GridObj);
	   
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", 				"search");
	GridObj.SetParam("in_input_gubn",	in_input_gubn);
	GridObj.SetParam("com_code", 			com_code);
	GridObj.SetParam("sale_code", 			sale_code);
	
	GridObj.SetParam("itype", 					itype);
	
	   
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
			var rowCnt = GridObj.GetRowCount();
   			for ( i = 0 ; i < rowCnt ; i++ ){
   				if(!(GridObj.GetCellValue("P1110", i) == "" || GridObj.GetCellValue("P1110", i) == null)) {
   					GridObj.SetCellBgColor('P1110', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1120", i) == "" || GridObj.GetCellValue("P1120", i) == null)) {
   					GridObj.SetCellBgColor('P1120', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1130", i) == "" || GridObj.GetCellValue("P1130", i) == null)) {
   					GridObj.SetCellBgColor('P1130', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1140", i) == "" || GridObj.GetCellValue("P1140", i) == null)) {
   					GridObj.SetCellBgColor('P1140', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1150", i) == "" || GridObj.GetCellValue("P1150", i) == null)) {
   					GridObj.SetCellBgColor('P1150', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1160", i) == "" || GridObj.GetCellValue("P1160", i) == null)) {
   					GridObj.SetCellBgColor('P1160', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1170", i) == "" || GridObj.GetCellValue("P1170", i) == null)) {
   					GridObj.SetCellBgColor('P1170', i, color_edit_col);	
   				}
   				if(!(GridObj.GetCellValue("P1180", i) == "" || GridObj.GetCellValue("P1180", i) == null)) {
   					GridObj.SetCellBgColor('P1180', i, color_edit_col);	
   				}
   			}
            
            /* VER 2.0 º¯°æ»çÇ× */
            if( (rFirst > -1) && (rFirst < GridObj.GetRowCount()) )
				GridObj.SetRowScroll(rFirst); 
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save") {

		if(GridObj.GetStatus() == "true") {// 
			doQuery();
		} else {
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
	}
}


/* EXCEL ???? */
function excelDown() {
	var GridObj = document.WiseGrid;
	GridObj.ExcelExport("", "", true, true);
}

function GridCellClick(strColumnKey, nRow){
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	if( strColumnKey == "PRE_MONTH_FR") {
		// °ªÀÌ À½¼öÀÌ¸é 0·Î ¹Ù²Ù°í return
		if(nNewValue < 0) { 
			GridObj.SetCellValue(strColumnKey, nRow, 0);
			return;
		}
		// Æò±ÕºñÀ² = 100 - µ¿³âºñÀ²
		var pre_month_to = Math.round((100 - strToNum(nNewValue))*100)/100; 
		GridObj.SetCellValue("PRE_MONTH_TO", nRow, pre_month_to);
	}
	else if(strColumnKey == "PRE_MONTH_TO") {
		// °ªÀÌ À½¼öÀÌ¸é 0·Î ¹Ù²Ù°í return
		if(nNewValue < 0) { 
			GridObj.SetCellValue(strColumnKey, nRow, 0);
			return;
		}
		// µ¿³âºñÀ² = 100 - Æò±ÕºñÀ²
		var pre_month_fr = Math.round((100 - strToNum(nNewValue))*100)/100; 
		GridObj.SetCellValue("PRE_MONTH_FR", nRow, pre_month_fr);
	}
	
	if(strColumnKey == "P1110" || strColumnKey == "P1120" || strColumnKey == "P1130" || strColumnKey == "P1140" || strColumnKey == "P1150" 
		|| strColumnKey == "P1160" || strColumnKey == "P1170" || strColumnKey == "P1180") {
		// ITEM_DTL¿¡ ¾ø´Â °øÀåÀ» º¯°æÇÒ °æ¿ì
		if(nNewValue < 0) {
			alert("ºñÀ²Àº -°ªÀ» Çã¿ëÇÏÁö ¾Ê½À´Ï´Ù!");
			GridObj.SetCellValue(strColumnKey, nRow, nOldValue);
			return;
		}
		if(nOldValue == "" || nOldValue == null) {
			alert("ÇØ´ç °øÀå¿¡¼­´Â »ç¿ëÇÏÁö ¾Ê´Â ÀÚÀçÀÔ´Ï´Ù.");
			GridObj.SetCellValue(strColumnKey, nRow, nOldValue);
			return;
		}
		var tot_alloc_rate = 0;
		tot_alloc_rate =  strToNum(GridObj.GetCellValue("P1110", nRow))	+ strToNum(GridObj.GetCellValue("P1120", nRow))
						+ strToNum(GridObj.GetCellValue("P1130", nRow))	+ strToNum(GridObj.GetCellValue("P1140", nRow))
						+ strToNum(GridObj.GetCellValue("P1150", nRow))	+ strToNum(GridObj.GetCellValue("P1160", nRow))
						+ strToNum(GridObj.GetCellValue("P1170", nRow))	+ strToNum(GridObj.GetCellValue("P1180", nRow));
		if(tot_alloc_rate > 100) {
			alert("°øÀåº° ºñÀ²ÀÇ ÇÕÀÌ 100ÀÌ ³Ñ½À´Ï´Ù. Á¤Á¤ÇØÁÖ½Ê½Ã¿ä!");
			GridObj.SetCellValue(strColumnKey, nRow, nOldValue);
			return;
		}
		
	}

}
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid Row Scroll Event
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
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
    