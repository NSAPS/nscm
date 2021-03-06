//############################################################
//## Щ煎斜極ID      : md_10010_manugistics_master_management.vm
//## Щ煎斜極貲      : manugistics 葆蝶攪婦葬
//## 偃嫦濠          : 陴錠辨
//## 偃嫦橾濠        : 2010-01-27
//##
//## 婦溼 job file   : job_md_10010_manugistics_master_management.xml
//## 婦溼 query file : query_md_10010_manugistics_master_management.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2010-01-27  陴錠辨      create
//## 2.0        2013-08-27  陴錠辨      1.盪濰衛 褒ぬж朝 唳辦煎 檣п endquery縑憮 盪濰�� 營褻��
//##                                   2.盪濰�� 營褻�� 衛 斜葬萄 嬪纂 嶸雖 囀註 蹺陛
//##
//############################################################

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'md_10010_manugistics_master_management';
var GridObj ; 													// WiseGrid 偌羹

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/* VER 2.0 滲唳餌о */
var rFirst = 0;							// 盪濰 濛機�� 營褻�蜇� �飛橉岌☆� 嶸雖ж晦 嬪и Row Index 盪濰 滲熱

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 							弛
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.			弛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() { 
   
	GridObj = document.WiseGrid;
	
	setProperty(GridObj);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader(GridObj);  	//п渦儅撩 
	setDefault();        	//�飛� 晦獄 撲薑 

}
   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

    GridObj.nHDLineSize         = 16; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '蜈擎 堅蛐';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2; 
 
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 		,100    ,60  ,false);
	GridObj.AddHeader("ITEM_ID"			,"ヶ跡囀萄"       	,"t_text" 		,100    ,60  ,false);
	GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"       		,"t_text" 		,200	,200 ,false); //0
	GridObj.AddHeader("MHDHB"			,"識盪濰熱貲"       	,"t_text" 		,100	,70   ,true); //0
 	GridObj.AddHeader("MFS_FLAG"		,"嫦輿斜瑜"       	,"t_combo" 		,10		,90   ,true); //0	//2013-04-18 蹺陛
 	GridObj.AddHeader("USE_PR_PLAN"		,"嫦輿斜瑜"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("PR_FLAG"			,"嫦輿婦葬"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("ST_FLAG"			,"營堅婦葬"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("RC_FLAG"			,"措頂衙殮"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("SEMI_FLAG"		,"模碟\n嶸鱔"     	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("SB_FLAG"			,"營堅(模碟)"     	,"t_checkbox" 	,10		,40   ,true); //0
 	
 	GridObj.AddHeader("BS_FLAG1"		,"鼻ヶ"       	,"t_checkbox" 	,10		,40   ,true); //0 
 	GridObj.AddHeader("BS_FLAG3"		,"漆檜蝶"       	,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("BS_FLAG2"		,"鼻ヶ"     		,"t_checkbox" 	,10		,40   ,true); //0
 	GridObj.AddHeader("BS_FLAG4"		,"漆檜蝶"     	,"t_checkbox" 	,10		,40   ,true); //0
 	
 	GridObj.AddHeader("SW_FLAG"			,"撮辦奢鱔"       	,"t_checkbox" 	,10		,40   ,true); //0   
 	GridObj.AddHeader("PR_TO_PO"		,"PR~PO"       		,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PO_TO_LC"		,"PO~摹瞳"       	,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("LC_TO_PORT"		,"摹瞳~殮о"       	,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PORT_TO_CUST"	,"殮о~鱔婦"       	,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("STD_VAR_FR"		,"ル遽ら離\nFROM"    ,"t_number" 		,10.2	,60   ,true); //0   
 	GridObj.AddHeader("STD_VAR_TO"		,"ル遽ら離\nTO"      ,"t_number" 		,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PRE_MONTH_FR"	,"翕錯綠徽"    		,"t_number" 	,10.2	,60   ,true); //0   
 	GridObj.AddHeader("PRE_MONTH_TO"	,"ゎ敕綠徽"      		,"t_number" 	,10.2	,60   ,true); //0   


	GridObj.AddHeader("CONTAINER_BOX"	,"夔纔檜傘夢蝶"      	,"t_number" 	,10.2	,50   ,true); //0                   				                              
 	GridObj.AddHeader("P1110"			,"寰曄"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1120"			,"寰撩"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1130"			,"寰撩\n擠猿"      	,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1140"			,"嬴骯"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1150"			,"ん蝓"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1160"			,"掘嘐"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1170"			,"睡骯"      		,"t_number" 	,10.2	,50   ,true); //0   
 	GridObj.AddHeader("P1180"			,"喬骯"      		,"t_number" 	,10.2	,50   ,true); //0   


 	GridObj.AddHeader("USE_DP_FLAG"		,"DP"       		,"t_checkbox" 	,10		,30   ,true); //0   
 	GridObj.AddHeader("USE_DP_DATE"		,"DP餌辨晦и"       	,"t_text" 		,100	,80  ,false); //0   
 	GridObj.AddHeader("DPCAL"			,"DP殖溘"       		,"t_combo" 		,100	,60   ,true); //0   
 	GridObj.AddHeader("USE_TAGE_FLAG"	,"顫啗薑"       		,"t_checkbox" 	,10		,30   ,true); //0   
 	GridObj.AddHeader("USE_FF_FLAG"		,"FF"       		,"t_checkbox" 	,10		,30   ,true); //0   
 	GridObj.AddHeader("USE_FF_DATE"		,"FF餌辨晦и"       	,"t_text" 		,200	,80  ,false); //0   
 	GridObj.AddHeader("ORDER_FLAG"		,"熱輿"       		,"t_checkbox" 	,200	,30   ,true); //0   
 	GridObj.AddHeader("CUSTORDERDUR"	,"熱輿\n晦除"       	,"t_number" 	,200	,40   ,true); //0   
 	GridObj.AddHeader("MPSRULE"			,"MPSRule"       	,"t_combo" 		,200	,60   ,true); //0   
 	GridObj.AddHeader("MPSCOVDUR"		,"Cover\n晦除"      	,"t_number" 	,200	,50   ,true); //0   
 	GridObj.AddHeader("MAXOH"			,"譆渠營堅"       	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("ALLOCCAL"		,"DRP殖溘"       	,"t_combo" 		,200	,80   ,true); //0   
 	GridObj.AddHeader("PLANDUR"			,"DRP晦除"       	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("TIMEFENSEDUR"	,"TP晦除\n(WEEK)"   	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("CPPPRIORITY"		,"CPP\n辦摹牖嬪"     	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("SSRULE"			,"SSRule"       	,"t_combo" 		,200	,60   ,true); //0   
 	GridObj.AddHeader("SSCOV"			,"SS\n橾熱"       	,"t_number" 	,200	,40   ,true); //0   
 	GridObj.AddHeader("MINSS"			,"譆模SS\n夢蝶熱"    	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("MAXSS"			,"譆渠SS\n夢蝶熱"    	,"t_number" 	,200	,60   ,true); //0   
 	GridObj.AddHeader("SSTEMPLATE"		,"SS\nTemplate"     ,"t_text" 		,200	,60  ,false); //0   
 	GridObj.AddHeader("INCMPSQTY"		,"曖煆\n隸陛榆"      	,"t_number" 	,200	,50   ,true); //0   
 	GridObj.AddHeader("MINMPSQTY"		,"譆模\n曖煆榆"      	,"t_number" 	,200.6	,60   ,true); //0   
 	GridObj.AddHeader("MANU_DEL_DUR"	,"manu餉薯\n爾盟晦除" ,"t_number" 		,200	,70   ,true); //0   

 	GridObj.AddHeader("DOMAIN"			,"嶸⑽" 				,"t_combo" 		,200	,110  ,true); //0   
 	GridObj.AddHeader("MIN_PICK_QTY"	,"檜堅欽嬪" 			,"t_number" 	,200	,70   ,true); //0   
 	

	GridObj.AddGroup("PRE_YEAR", "瞪喇翕錯");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("PRE_YEAR", "PRE_MONTH_FR");
	GridObj.AppendHeader("PRE_YEAR", "PRE_MONTH_TO");
	
	GridObj.AddGroup("SODA", "壓纂模棻");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("SODA", "BS_FLAG1");
	GridObj.AppendHeader("SODA", "BS_FLAG3");
	
	GridObj.AddGroup("JUICE", "壓纂輿蝶");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("JUICE", "BS_FLAG2");
	GridObj.AppendHeader("JUICE", "BS_FLAG4");


	GridObj.BoundHeader();	
	
	GridObj.SetColFix('ITEM_NAME');	//2013-04-19 辦謙敕 蹺陛

	GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.

	//Hidden 鏽歲
	GridObj.SetColHide("CRUD",true);
	
	// 濠營 褻�蜇藩●� 馬轔棻 
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
	GridObj.SetColCellAlign('MHDHB',		'right');

	GridObj.SetColCellBgColor('USE_PR_PLAN',	color_edit_col);
	GridObj.SetColCellBgColor('PR_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('ST_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('RC_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('SEMI_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('SB_FLAG',		color_edit_col);
	GridObj.SetColCellBgColor('SW_FLAG',		color_edit_col);
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
   																																																																																																																																																																																																																																																																																																																																																																																																								
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
		
		rFirst = 0; /* VER 2.0 滲唳餌о */

		doQuery();
   }
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	
	GridObj.DoQuery(servlet_url, "CRUD");
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}
      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
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
	//if(document.frm.com_code[0].checked == true) com_code = "0001000050";	//鷓唳
	//else if(document.frm.com_code[1].checked == true) com_code = "0001000021";	//徽襟
	//else com_code = "0001000021";	//徽襟

	GridObj.ClearGrid();
	setHeader(GridObj);
	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", 				"search");
	GridObj.SetParam("in_input_gubn",	in_input_gubn);
	GridObj.SetParam("com_code", 			com_code);
	GridObj.SetParam("sale_code", 			sale_code);
	
	GridObj.SetParam("itype", 					itype);
	
	   
	GridObj.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';
      
    if(endMode == "search") //褻�萼� 諫猿脹 唳辦
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
            
            /* VER 2.0 滲唳餌о */
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
		// 高檜 擠熱檜賊 0煎 夥紱堅 return
		if(nNewValue < 0) { 
			GridObj.SetCellValue(strColumnKey, nRow, 0);
			return;
		}
		// ゎ敕綠徽 = 100 - 翕喇綠徽
		var pre_month_to = Math.round((100 - strToNum(nNewValue))*100)/100; 
		GridObj.SetCellValue("PRE_MONTH_TO", nRow, pre_month_to);
	}
	else if(strColumnKey == "PRE_MONTH_TO") {
		// 高檜 擠熱檜賊 0煎 夥紱堅 return
		if(nNewValue < 0) { 
			GridObj.SetCellValue(strColumnKey, nRow, 0);
			return;
		}
		// 翕喇綠徽 = 100 - ゎ敕綠徽
		var pre_month_fr = Math.round((100 - strToNum(nNewValue))*100)/100; 
		GridObj.SetCellValue("PRE_MONTH_FR", nRow, pre_month_fr);
	}
	
	if(strColumnKey == "P1110" || strColumnKey == "P1120" || strColumnKey == "P1130" || strColumnKey == "P1140" || strColumnKey == "P1150" 
		|| strColumnKey == "P1160" || strColumnKey == "P1170" || strColumnKey == "P1180") {
		// ITEM_DTL縑 橈朝 奢濰擊 滲唳й 唳辦
		if(nNewValue < 0) {
			alert("綠徽擎 -高擊 ъ辨ж雖 彊蝗棲棻!");
			GridObj.SetCellValue(strColumnKey, nRow, nOldValue);
			return;
		}
		if(nOldValue == "" || nOldValue == null) {
			alert("п渡 奢濰縑憮朝 餌辨ж雖 彊朝 濠營殮棲棻.");
			GridObj.SetCellValue(strColumnKey, nRow, nOldValue);
			return;
		}
		var tot_alloc_rate = 0;
		tot_alloc_rate =  strToNum(GridObj.GetCellValue("P1110", nRow))	+ strToNum(GridObj.GetCellValue("P1120", nRow))
						+ strToNum(GridObj.GetCellValue("P1130", nRow))	+ strToNum(GridObj.GetCellValue("P1140", nRow))
						+ strToNum(GridObj.GetCellValue("P1150", nRow))	+ strToNum(GridObj.GetCellValue("P1160", nRow))
						+ strToNum(GridObj.GetCellValue("P1170", nRow))	+ strToNum(GridObj.GetCellValue("P1180", nRow));
		if(tot_alloc_rate > 100) {
			alert("奢濰滌 綠徽曖 м檜 100檜 剩蝗棲棻. 薑薑п輿褊衛蹂!");
			GridObj.SetCellValue(strColumnKey, nRow, nOldValue);
			return;
		}
		
	}

}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Row Scroll Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
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
        
        // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
        // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }  
    