//## Щ煎斜極ID		: op_02060_com_roh_cnfm_list.js
//## Щ煎斜極貲		: 啗翮餌 嫦輿蕨堅榆 褻�� 
//## 偃嫦濠			: 辦謙敕
//## 偃嫦橾濠			: 2013-07-08s
//##
//## 婦溼 job file	: job_sinc_30_orderPlanning_03.xml
//## 婦溼 query file	: query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-07-08  辦謙敕      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'op_02060_com_roh_cnfm_list';
var GridObj ; 													// WiseGrid 偌羹

var GridObj3;
var GridObj4;
var GridObj7;

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀

var rFirst = 0;							// 盪濰, м離 蛔曖 濛機�� �飛� 嬪纂蒂 嶸雖ж晦 嬪и Row Index 盪濰 滲熱
var rEnd = 0;

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
        
    }  


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 							弛
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.			弛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	var user_id = document.frm._user_id.value ;
	if(user_id == "oo2604735" || user_id == "oo9444461" || user_id == "oo7898127" || user_id == "oo5491704" ){
		
		setHeader_Ex(GridObj);  	//п渦儅撩 
	}
	else setHeader(GridObj);  	//п渦儅撩
	setDefault();        	//�飛� 晦獄 撲薑 
}

function init3() {
	GridObj3 = document.WiseGrid3;
	setProperty(GridObj3);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader3(GridObj3);  	//п渦儅撩 
	setDefault3();        	//�飛� 晦獄 撲薑 
}

function init4() {
	GridObj4 = document.WiseGrid4;
	setProperty(GridObj4);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader4(GridObj4);  	//п渦儅撩 
	setDefault4();        	//�飛� 晦獄 撲薑 
}   

function init7() {
	GridObj7 = document.WiseGrid7;
	setProperty(GridObj7);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader7(GridObj7);  	//п渦儅撩 
	setDefault7();        	//�飛� 晦獄 撲薑 
}


   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	GridObj.bRowSelectorVisible		= false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.bRowSelectorIndex		= true;					//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj.nHDLineSize				= 10;					//Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines				= 2;   
    
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj.strSelectedCellFgColor	= '180|82|205';
    GridObj.strHDClickAction		= "select";        		//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj.strActiveRowBgColor		= "232|245|213";		//摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.

     GridObj.strHDClickAction		= "sortsingle";   
    
	// Cell Font Setting
	GridObj.nCellFontSize			= 9;					// Font Size 9
    
}


function setDefault3() { 

	GridObj3.bRowSelectorVisible	= false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj3.bRowSelectorIndex		= true;					//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj3.nHDLineSize			= 13;					//Header Size
    GridObj3.strActiveRowBgColor		= "232|245|213";		//摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
    
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    GridObj3.strHDClickAction		= "select";        		//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.	
	GridObj3.nCellFontSize			= 9;					// Font Size 9
    GridObj3.bStatusbarVisible		= false;				// status bar visible 鼻鷓夥 撲薑 
    GridObj3.nHDLines				= 2;

}
function setDefault4() { 
 
	GridObj4.bRowSelectorVisible	= false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj4.bRowSelectorIndex		= true;					//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj4.nHDLineSize			= 12;					//Header Size
        
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strActiveRowBgColor		= "232|245|213";		//摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
    GridObj4.strHDClickAction		= "select";        		//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	
	GridObj4.nCellFontSize			= 9;					// Font Size 9
}

function setDefault7() { 

	GridObj7.bRowSelectorVisible	= false;        			//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj7.bRowSelectorIndex		= true;						//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj7.nHDLineSize			= 12;						//Header Size
    
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj7.strSelectedCellFgColor = '180|82|205';
    GridObj7.strHDClickAction		= "select";        			//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj7.strActiveRowBgColor		= "232|245|213";		//摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj7.nCellFontSize			= 9;							// Font Size 9
	GridObj7.bStatusbarVisible		= true;						// status bar visible 鼻鷓夥 撲薑
	
	GridObj7.strHDClickAction		= "sortsingle";
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {
	
	GridObj.AddHeader("CRUD"				,"CRUD"       		,"t_text" 		,100    ,60		,false);		 
	GridObj.AddHeader("ITEM_ID"				,"堯褕 ヶ跡廓��"      	,"t_text" 		,20		,90		,false); //0   
	GridObj.AddHeader("COM_MATR_CODE"		,"渡餌 ヶ跡廓��"      	,"t_text" 		,20		,0		,false); //0
 	GridObj.AddHeader("ITEM_NAME"			,"ヶ跡貲"      		,"t_text" 		,100	,240	,false); //0    
 	GridObj.AddHeader("BASE_UOM"			,"晦獄\n欽嬪"     	,"t_text" 		,100	,40		,false); //0  	
 	GridObj.AddHeader("STOCK"				,"堯褕"      		,"t_number" 	,100.3	,80		,false); //0   
 	GridObj.AddHeader("COM_STOCK"			,"機羹"   			,"t_number" 	,100.3	,80		,false); //0   
 	GridObj.AddHeader("CNFM_STOCK"			,"晦遽"     			,"t_number" 	,100.3	,80		,false); //0 渡輿 晦遽營堅
 	GridObj.AddHeader("SUB_TOT"				,"模啗"     			,"t_number" 	,100.3	,80		,false); //0 	
	GridObj.AddHeader("ODER_QTY"			,"旎輿 模蹂榆"     	,"t_number" 	,100.3	,80		,false); //0
	GridObj.AddHeader("W1_STOCK"			,"離輿蟾 營堅"     	,"t_number" 	,100.3	,80		,false); //0  	
 	GridObj.AddHeader("FC_QTY"				,"嫦輿 蕨堅榆"     	,"t_number"		,100.3	,80		,false); //0 	
 	GridObj.AddHeader("MSG"					,"綠堅"				,"t_text" 		,100	,120	,false); //0   盪濰擊 嬪л


	/* 檜醞 п渦 蹺陛 */
	GridObj.AddGroup("HD1",				   "⑷營堅榆");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("HD1", 			"STOCK");
	GridObj.AppendHeader("HD1", 		"COM_STOCK");
	GridObj.AppendHeader("HD1", 	   "CNFM_STOCK");
	GridObj.AppendHeader("HD1",			  "SUB_TOT");

	GridObj.BoundHeader();
     
    GridObj.SetColCellAlign('ITEM_ID',			'center'); 
    GridObj.SetColCellAlign('COM_MATR_CODE',	'center');
    GridObj.SetColCellAlign('ITEM_NAME',	  	  'left'); 
    GridObj.SetColCellAlign('BASE_UOM',			'center');
    
    GridObj.SetColCellAlign('STOCK',		 'right');
    GridObj.SetColCellAlign('COM_STOCK',	 'right');
    GridObj.SetColCellAlign('CNFM_STOCK',	 'right');	//渡輿 晦遽營堅
	GridObj.SetColCellAlign('SUB_TOT',		 'right');     
     
	GridObj.SetColCellAlign('ODER_QTY',		 'right');
	GridObj.SetColCellAlign('W1_STOCK',		 'right');     
    
	GridObj.SetColCellAlign('FC_QTY',		 'right');	//嫦輿蕨堅榆
	GridObj.SetColCellAlign('MSG',		 	  'left');	//2013-09-09 蹺陛
    
	GridObj.SetColFix('ITEM_NAME');

    GridObj.SetNumberFormat("STOCK", 				"###,###,##0");
    GridObj.SetNumberFormat("COM_STOCK", 			"###,###,##0");
    GridObj.SetNumberFormat("CNFM_STOCK", 			"###,###,##0");	//渡輿 晦遽營堅
    GridObj.SetNumberFormat("SUB_TOT", 				"###,###,##0");
    GridObj.SetNumberFormat("W1_STOCK", 			"###,###,##0");

    GridObj.SetNumberFormat("ODER_QTY", 			"###,###,##0");
    GridObj.SetNumberFormat("FC_QTY", 				"###,###,##0");
	
	GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	//Hidden 鏽歲
	GridObj.SetColHide("CRUD",true);	

}

      
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader_Ex(GridObj) {
	
	GridObj.AddHeader("CRUD"				,"CRUD"       		,"t_text" 		,100    ,60		,false);		 
	GridObj.AddHeader("ITEM_ID"				,"堯褕 ヶ跡廓��"      	,"t_text" 		,20		,90		,false); //0   
	GridObj.AddHeader("COM_MATR_CODE"		,"渡餌 ヶ跡廓��"      	,"t_text" 		,20		,0		,false); //0
 	GridObj.AddHeader("ITEM_NAME"			,"ヶ跡貲"      		,"t_text" 		,100	,240	,false); //0    
 	GridObj.AddHeader("BASE_UOM"			,"晦獄\n欽嬪"     	,"t_text" 		,100	,40		,false); //0  	
 	GridObj.AddHeader("STOCK"				,"堯褕"      		,"t_number" 	,100.3	,80		,false); //0   
 	GridObj.AddHeader("COM_STOCK"			,"機羹"   			,"t_number" 	,100.3	,80		,false); //0   
 	GridObj.AddHeader("CNFM_STOCK"			,"晦遽"     			,"t_number" 	,100.3	,80		,false); //0 渡輿 晦遽營堅
 	GridObj.AddHeader("SUB_TOT"				,"模啗"     			,"t_number" 	,100.3	,80		,false); //0 	
	GridObj.AddHeader("ODER_QTY"			,"旎輿 模蹂榆"     	,"t_number" 	,100.3	,80		,false); //0
	GridObj.AddHeader("W1_STOCK"			,"離輿蟾 營堅"     	,"t_number" 	,100.3	,80		,false); //0  	
 	GridObj.AddHeader("FC_QTY"				,"嫦輿 蕨堅榆"     	,"t_number"		,100.3	,80		,false); //0 	
 	
 	GridObj.AddHeader("MSG"					,"綠堅"				,"t_text" 		,100	,120	,false); //0   盪濰擊 嬪л


	/* 檜醞 п渦 蹺陛 */
	GridObj.AddGroup("HD1",				   "⑷營堅榆");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("HD1", 			"STOCK");
	GridObj.AppendHeader("HD1", 		"COM_STOCK");
	GridObj.AppendHeader("HD1", 	   "CNFM_STOCK");
	GridObj.AppendHeader("HD1",			  "SUB_TOT");

	GridObj.BoundHeader();
     
    GridObj.SetColCellAlign('ITEM_ID',			'center'); 
    GridObj.SetColCellAlign('COM_MATR_CODE',	'center');
    GridObj.SetColCellAlign('ITEM_NAME',	  	  'left'); 
    GridObj.SetColCellAlign('BASE_UOM',			'center');
    
    GridObj.SetColCellAlign('STOCK',		 'right');
    GridObj.SetColCellAlign('COM_STOCK',	 'right');
    GridObj.SetColCellAlign('CNFM_STOCK',	 'right');	//渡輿 晦遽營堅
	GridObj.SetColCellAlign('SUB_TOT',		 'right');     
     
	GridObj.SetColCellAlign('ODER_QTY',		 'right');
	GridObj.SetColCellAlign('W1_STOCK',		 'right');     
    
	GridObj.SetColCellAlign('FC_QTY',		 'right');	//嫦輿蕨堅榆
	GridObj.SetColCellAlign('MSG',		 	  'left');	//2013-09-09 蹺陛
    
	GridObj.SetColFix('ITEM_NAME');

    GridObj.SetNumberFormat("STOCK", 				"###,###,##0");
    GridObj.SetNumberFormat("COM_STOCK", 			"###,###,##0");
    GridObj.SetNumberFormat("CNFM_STOCK", 			"###,###,##0");	//渡輿 晦遽營堅
    GridObj.SetNumberFormat("SUB_TOT", 				"###,###,##0");
    GridObj.SetNumberFormat("W1_STOCK", 			"###,###,##0");

    GridObj.SetNumberFormat("ODER_QTY", 			"###,###,##0");
    GridObj.SetNumberFormat("FC_QTY", 				"###,###,##0");
	
	GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	//Hidden 鏽歲
	GridObj.SetColHide("CRUD",true);	

}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

}

function setHeader3(GridObj3) {        

  	GridObj3.AddHeader("COM_MATR_CODE"	,"濠營囀萄"      	,"t_text" 		,40			,80		,false); //0
  	GridObj3.AddHeader("COM_MATR_NAME"	,"濠營貲"      	,"t_text" 		,40			,140	,false); //0
  	   
  	GridObj3.AddHeader("UNIT"			,"欽嬪"       	,"t_text" 		,100		,60  	,false); //0   
  	GridObj3.AddHeader("PRE_STOCK"		,"晦遽營堅"      	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_FC_QTY"		,"嫦輿蕨堅"       ,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("PRE_IPGO"		,"殮堅"      	,"t_number" 	,100.3		,80  	,false); //0    
  	GridObj3.AddHeader("NOW_EXPT"		,"旎輿蕨鼻"		,"t_number" 	,100.3		,80  	,false); //0   �飛� 馬辭
  	GridObj3.AddHeader("SIL_STOCK"		,"褒營堅"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("DIFF_QTY"		,"蕨褒離"       	,"t_number" 	,100.3		,80  	,false); //0   
  	GridObj3.AddHeader("CNFM_STOCK"		,"�挨分蝪�" 		,"t_number" 	,100.3		,80  	,false); //0   
	 	    
	
	/* 檜醞 п渦 蹺陛 */
	GridObj3.AddGroup("HD1"	,"瞪輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj3.AppendHeader("HD1",   "PRE_STOCK");
	GridObj3.AppendHeader("HD1",  "PRE_FC_QTY");
	GridObj3.AppendHeader("HD1", 	"PRE_IPGO");
	
	GridObj3.BoundHeader();	
    
    GridObj3.SetColCellAlign('COM_MATR_CODE',	'center'); 
    GridObj3.SetColCellAlign('COM_MATR_NAME',	  'left'); 
	GridObj3.SetColCellAlign('UNIT',			'center');
    GridObj3.SetColCellAlign('PRE_STOCK',		 'right'); 
    GridObj3.SetColCellAlign('PRE_FC_QTY',		 'right'); 
    GridObj3.SetColCellAlign('PRE_IPGO',		 'right'); 
    GridObj3.SetColCellAlign('NOW_EXPT',		 'right'); 
    GridObj3.SetColCellAlign('SIL_STOCK',		 'right');
    GridObj3.SetColCellAlign('DIFF_QTY',		 'right'); 
    GridObj3.SetColCellAlign('CNFM_STOCK',		 'right');    
    
    GridObj3.SetNumberFormat("PRE_STOCK", 	"#,##0");
    GridObj3.SetNumberFormat("PRE_FC_QTY", 	"#,##0");
    GridObj3.SetNumberFormat("PRE_IPGO",	"#,##0");
    GridObj3.SetNumberFormat("NOW_EXPT",	"#,##0");
    
	GridObj3.SetNumberFormat("SIL_STOCK", 	"#,##0");
    GridObj3.SetNumberFormat("DIFF_QTY",	"#,##0");
    GridObj3.SetNumberFormat("CNFM_STOCK",	"#,##0");    

}   

function setHeader4(GridObj4) {        
       
	var week_flag	= document.all.week_flag.value;

  	
	if(week_flag =="M"){ //錯除
	  	GridObj4.AddHeader("GUBN"		,"錯除 褒瞳"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"ヶ跡廓��"      		,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"濠營貲"   			,"t_text" 	,100	,60 	,false); //0	
	}else {//W 輿除 
  		GridObj4.AddHeader("GUBN"		,"輿除 褒瞳"      	,"t_text" 	,10		,60  	,false); //0
	  	GridObj4.AddHeader("ITEM_ID"	,"ヶ跡廓��"      		,"t_text" 	,10		,0  	,false); //0   
		GridObj4.AddHeader("ITEM_NAME"	,"濠營貲"   			,"t_text" 	,100	,60 	,false); //0	
	}

  	    
  	
	var header_length = 0, j;
	
	
	if(week_flag =="M"){ //錯除
	
		var header_id = "op_02060_com_roh_cnfm_list_dw4_monthly_header";	
		
	}else {//W 輿除 
			
			var header_id = "op_02060_com_roh_cnfm_list_dw4_weekly_header";	
			
		}	
	
	commonUtil.getSelQeury( "", "", header_id,{
		callback:function(result){
			
			for(var i=0 ; i < 9 ; i++){
				if(i < result.length) {
					GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       	,"t_number" 	,500.3	,80  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 19) {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       ,"t_number" 	,500.3	,80  ,false);
					}
					else {
						GridObj4.AddHeader("MM_"+i+"_QTY"	,result[0][i]       ,"t_number" 	,500.3	,80  ,false);
					}
				}
			}
		 	
			GridObj4.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
		    
		    GridObj4.SetColCellAlign('ITEM_ID','center'); 
		
			if(week_flag =="M"){ //錯除
				GridObj4.SetColHDBgColor('MM_8_QTY','253|228|229');	
			}else {//W 輿除 
				GridObj4.SetColHDBgColor('MM_8_QTY','253|228|229');	
			}	

			
			
			GridObj4.SetNumberFormat("MM_0_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_1_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_2_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_3_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_4_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_5_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_6_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_7_QTY"  , "#,##0");
			GridObj4.SetNumberFormat("MM_8_QTY"  , "#,##0");
			
			doQuery4();  
				
		}
			
	});
			 
}


function setHeader7(GridObj7) {        
       
  	GridObj7.AddHeader("EVEN_DATE"	,"ч餌橾濠"  	,"t_text" 		,20		,70   ,false); //0
  	GridObj7.AddHeader("PROD_CODE"	,"ヶ跡囀萄"  	,"t_text" 		,10		,30    ,false); //0   
  	GridObj7.AddHeader("ITEM_NAME"	,"ヶ跡貲"  	,"t_text" 		,100	,90   ,false); //0   
  	GridObj7.AddHeader("E_QTY"		,"檜葆お"  	,"t_number" 	,100.3	,60   ,false); //0   
  	GridObj7.AddHeader("H_QTY"		,"�些繩紗�"  	,"t_number" 	,100.3	,60   ,false); //0   
 	GridObj7.AddHeader("L_QTY"		,"煜等葆お"	,"t_number" 	,100.3	,60   ,false); //0    	   

	GridObj7.BoundHeader();	
    
    GridObj7.SetColCellAlign('EVEN_DATE',	'center');
    GridObj7.SetColCellAlign('PROD_CODE',	  'left');
    GridObj7.SetColCellAlign('ITEM_NAME',	  'right');

	GridObj7.SetColCellAlign('E_QTY',		 'right');
    GridObj7.SetColCellAlign('H_QTY',		 'right');
    GridObj7.SetColCellAlign('L_QTY',		 'right');

    GridObj7.SetNumberFormat("E_QTY",	"#,##0");
    GridObj7.SetNumberFormat("H_QTY", 	"#,##0");
	GridObj7.SetNumberFormat("L_QTY",	"#,##0");

}

	// 鏽歲 堅薑

function setGrid(){	
	GridObj.SetColFix('ITEM_NAME');
}

  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Row Scroll Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
	rEnd = nEndVisibleRowIndex;
}  
  
function GridEndQuery(){
	
    var mode		= GridObj.GetParam("mode");
    var error_msg	= '';    
      
    if(mode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {   		
        
        }
         else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}

    } 
}



function GridEndQuery3() {
	
	var mode		= GridObj3.GetParam("mode");
	var error_msg	= '';

	
		          
	if(mode == "search3") {
		if(GridObj3.GetStatus() == "true") {						        	               

		}
		
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}else{
		
		doQuery();
	}
	
	
} 

function GridEndQuery4() {
	
	var mode		= GridObj4.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search4") {
		if(GridObj4.GetStatus() == "true") {                           
		}
		else { 
			error_msg = GridObj4.GetMessage(); 
			alert(error_msg);            
		}
	}
	
	}


function GridEndQuery7() {
	
	var mode		= GridObj7.GetParam("mode");
	var error_msg	= '';
		          
	if(mode == "search7") {
		if(GridObj7.GetStatus() == "true") {                           
		  //GridObj7.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum','E_QTY,H_QTY,L_QTY');
		  //GridObj7.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj7.GetMessage(); 
			alert(error_msg);            
		}
	}
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}	


               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {

    var cnfm_date		= document.frm.cnfm_date.value;
    
    doQuery();
	
	GridObj3.ClearGrid(); 
	setHeader3(GridObj3);	
	
	GridObj4.ClearGrid(); 
	setHeader4(GridObj4);	

	GridObj7.ClearGrid(); 
	setHeader7(GridObj7);	

	
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow){     
	
	if( strColumnKey == "SELECTED"){
		return;
	}else if(strColumnKey == "BASE_STOCK" || strColumnKey == "PROG_STOCK" ||strColumnKey == "TOT_STOCK" ){
		
		var item_id			= GridObj.GetCellValue("ITEM_ID", 			nRow);		
		var	item_name		= GridObj.GetCellValue("ITEM_NAME", 		nRow);
		var com_matr_code	= GridObj.GetCellValue("COM_MATR_CODE", 	nRow);		
		
		var service_url = "service.do?_moon_service=op_02050_even_item_list_dw7";
		
		service_url += "&item_id=" + item_id +"&com_matr_code=" + com_matr_code + "&item_name=" + item_name;
		
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=320, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();
		
		return;		
	}

	
	document.all.week_flag.value	= 'M'
	
    
    var sel_item_id			= GridObj.GetCellValue("ITEM_ID", 				nRow);
    var sel_com_matr_code	= GridObj.GetCellValue("COM_MATR_CODE", 		nRow);        
    var sel_item_name		= GridObj.GetCellValue("ITEM_NAME", 			nRow);	

	// doQuery3 擎 棻檜釭嗶 п渦 陽僥縑 DW5 廓 謙猿�� 褒ч
	
	doQuery3(nRow);	//褒ч 薑雖
	
	doQuery4(nRow);		
	
	doQuery7(nRow);	//褒ч 薑雖 
	
}        
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;       
       
       var cnfm_date	= document.frm.cnfm_date.value;
       var mfs_flag		= document.frm.mfs_flag.value;       
       var com_code		= document.frm.com_code.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",						"search");       
       GridObj.SetParam("cnfm_date",				cnfm_date);
       GridObj.SetParam("mfs_flag",					mfs_flag);
       GridObj.SetParam("com_code",					com_code);       
       GridObj.SetParam("user_id", 	document.frm._user_id.value);      
        
       GridObj.DoQuery(servlet_url);
   }



function doQuery3(nRow) {

	var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;	
	var com_matr_code	= GridObj.GetCellValue("COM_MATR_CODE",	nRow);	
	var cnfm_date		= document.frm.cnfm_date.value;
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	
	GridObj3.SetParam("mode", 	"search3");	
	GridObj3.SetParam("cnfm_date",  		cnfm_date);
	GridObj3.SetParam("com_matr_code",  com_matr_code);
	GridObj3.DoQuery(servlet_url);
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 4 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery4() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var nRow		= GridObj.GetActiveRowIndex( );
	if (nRow < 0) return; 
	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;	
	var week_flag	= document.all.week_flag.value;
	var com_code	= document.all.com_code.value;
	
	
	
	if(week_flag =="M"){ //錯除
		GridObj4.SetParam("query_id", "op_02060_com_roh_cnfm_list_dw4_monthly");	
		
	}else{//W 輿除 
		GridObj4.SetParam("query_id", "op_02060_com_roh_cnfm_list_dw4_weekly");	
	}	
	
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj4.SetParam("itype", 	   		itype);
	GridObj4.SetParam("mode",  		"search4");
	GridObj4.SetParam("item_id", 	  item_id);
	GridObj4.SetParam("com_code", 	  com_code);
	GridObj4.SetParam("week_flag", 	week_flag);
	GridObj4.DoQuery(servlet_url);
}





/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 5 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
/*function doQuery5(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
	var itype		= document.all.sel_itype.value;
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj5.SetParam("itype", 		itype);
	GridObj5.SetParam("mode",	"search5");
	GridObj5.SetParam("item_id", item_id);
	GridObj5.DoQuery(servlet_url);
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 7 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery7(nRow) {

	var servlet_url 	= Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cons_item_id	= GridObj.GetCellValue("ITEM_ID", 		nRow);
	var cnfm_date		= document.frm.cnfm_date.value;
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	
	GridObj7.SetParam("mode", 		 		"search7");
	GridObj7.SetParam("cons_item_id",	 cons_item_id);
	GridObj7.SetParam("cnfm_date",	 		cnfm_date);
	
	GridObj7.DoQuery(servlet_url);
}

// 撚 盪濰 瞪羲滲熱
var objTdG;

// setTimeout 縑憮 ��轎ж罹 衛除 雖翱 �� setEditMode() 褒ч
function setEditModeTime() {
	
	//setEditMode( objTdG );
	
}


// popup 褻�� 檜嘐雖 mouseOver
// popup 擊 嗥辦晦 嬪п 薯ヶ 囀萄 艙羲擊 慇橫陪 唳辦 viewMode 滲�� 寞雖蒂 嬪и flag 撲薑
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup 褻�� 檜嘐雖 mouseOut
// popup 擊 嗥辦晦 嬪п 薯ヶ 囀萄 艙羲擊 慇橫陪 唳辦 viewMode 滲�� 寞雖蒂 嬪и flag 撲薑
function outImg( objImg ) {
	
	popImgIdx = null;
	
}

// 陳瞼 匐儀 POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// 陳瞼 匐儀 POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
}




function DW4_DblClick(strColumnKey, nRow){
	
	yyyy_mm 		= GridObj4.getColHDText(strColumnKey);	

	var week_flag	= document.all.week_flag.value;


	if(yyyy_mm == "錯除 褒瞳" ||yyyy_mm == "輿除 褒瞳"){  // DW 4曖 羅蘊曖 薯ヶ囀萄 摹鷗衛 week_flag 撲薑 滲唳戲煎 輿除/錯除 褒瞳  褻��
		if(week_flag == 'M'){
			document.all.week_flag.value = 'W';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
			
		}else{			
			document.all.week_flag.value = 'M';
			GridObj4.ClearGrid();
			setHeader4(GridObj4);
		}
		
	} else{
		if(week_flag == 'M'){
		}else{
			alert("濠營 餌辨頂羲擊 輿除戲煎 滲唳ж堅 褻�裔媮祧宒藩�.");
			return;
		}
	}
	
}



function DW5_DblClick(strColumnKey, nRow){
	
	var yyyy_mm = GridObj5.GetCellValue("YYYY_MM", nRow);

	if(yyyy_mm == null || yyyy_mm == ""){
		return;
		
	} else{
		document.all.from_mm.value	= yyyy_mm;
		document.all.to_mm.value	= yyyy_mm;
		doQuery7();
	}
	
}

function doChange_mm(obj){
	
	var from_mm		= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	
	var from_mm_1	= from_mm.substr(0,4);
	var from_mm_2	= from_mm.substr(5,6);
	var to_mm_1		= to_mm.substr(0,4);
	var to_mm_2		= to_mm.substr(5,6);
	
	
	//Number(hd_name_2)+Number(1);
	
	if(obj.name == 'pre_mm'){ // 檜瞪殖
		from_mm_2	= Number(from_mm_2) - Number(1);
		to_mm_2		= Number(to_mm_2)	- Number(1);
		
			// п陛 剩橫除棻賊...
			if(from_mm_2 == 0){
				from_mm_1 = Number(from_mm_1) - Number(1);
				from_mm_2 = 12;
			}else{
				
			}
			if(to_mm_2 == 0){
				to_mm_1 = Number(to_mm_1) - Number(1);
				to_mm_2 = 12;
			}else{
				
			}
		
		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}else{ //棻擠殖
		from_mm_2	= Number(from_mm_2) + Number(1);
		to_mm_2		= Number(to_mm_2) + Number(1);

			// п陛 剩橫除棻賊...
			if(from_mm_2 == 13){
				from_mm_1 = Number(from_mm_1) + Number(1);
				from_mm_2 = 1;
			}else{
				
			}
			if(to_mm_2 == 13){
				to_mm_1 = Number(to_mm_1) + Number(1);
				to_mm_2 = 1;
			}else{
				
			}


		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}
	
	document.all.from_mm.value = from_mm; 
	document.all.to_mm.value = to_mm; 
	
	
}

//--------------------------------------   main_template 縑 薑曖脹 Event ---------------------------------------------------//
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {	

	var cnfm_stock		= GridObj3.GetCellValue("CNFM_STOCK", 		nRow)
	
	if(strColumnKey == "CNFM_STOCK"){
		doSave2();
		
	}
		else{
			}

}




// п渡 Ы溯斜縑渠и 摹鷗高 й渡
/*function doCheckFlag(obj){
	// sale_plan_flag - っ衙啗�� 0 檜橫紫 褻��
	if(obj.name == "serch_flag_chk" ){ 
		if(obj.checked){
				document.frm.serch_flag.value = "Y";
		}
		else{
				document.frm.serch_flag.value = "N";
		}
	}
	var serch_flag = document.frm.serch_flag.value;
	
	doQuery7(nRow);
}*/


function doChange3(obj){

	
}


var flag = "N";

var timer;



function test(){  
  if(flag == "Y"){
   try{     
     test2();      

     clearInterval(timer);
   }
   catch(e){

     timer();

   }
  }
 }

function HeaderClick_DW2(strColumnKey){ /* HeaderClick_DW2 */


	var item_id		= document.all.sel_item_id.value;
	var	item_name	= document.all.sel_item_name.value;
	
	if(item_id == null||item_id == ''){
		alert("ヶ跡擊 摹鷗�� 棻衛 褻�� ж衛晦 夥奧棲棻");
		return;
	}			
	
	var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_PR_PO_term_pop_up";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=380, top=320, left=200";
	var newWin = window.open(service_url, "", pop_win_style);  
	newWin.focus();


}
 

