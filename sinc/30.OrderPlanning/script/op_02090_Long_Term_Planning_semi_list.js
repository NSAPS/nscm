//## Щ煎斜極ID      : op_02090_Long_Term_Planning_semi_list.vm
//## Щ煎斜極貲      : 醞濰晦 漆檜蝶 熱晝 啗��
//## 偃嫦濠          : 檜鬼遵
//## 偃嫦橾濠        : 2015-07-28
//##
//## 婦溼 job file   : job_sinc_30_orderPlanning_03.xml
//## 婦溼 query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2015-07-28  檜鬼遵      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'op_02090_Long_Term_Planning_semi_list';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2;
var GridObj3;

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀


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
        
        
        document.WiseGrid2.height = tabHeightValue - document.WiseGrid.height+ "px";
        
    }  


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
   
function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader2(GridObj2);  	//п渦儅撩 
	setDefault2();        	//�飛� 晦獄 撲薑 
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

   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	//GridObj.bUserContextMenu 	= true;					//餌辨濠 鐘臢蝶お 詭景曖 餌辨 罹睡蒂 唸薑и棻. 
	GridObj.bRowSelectorVisible	= false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.bRowSelectorIndex	= true;					//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
    
   
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj.strSelectedCellFgColor	= '0|0|0';
    GridObj.strHDClickAction		= "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj.strActiveRowBgColor		= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strHDClickAction		= "sortsingle";   	//濠翕 sort 晦棟
    
	// Cell Font Setting
	GridObj.nCellFontSize			= 9;					// Font Size 9
	
	///* Context Menu 餌辨濠 MENU 蹺陛 */
    //GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row 蹺陛");   
	
    
}
function setDefault2() { 	
 
	GridObj2.bRowSelectorVisible	= false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj2.bRowSelectorIndex		= true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj2.nHDLineSize			= 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines				= 2;        
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj2.strSelectedCellFgColor	= '0|0|0';
    GridObj2.strHDClickAction		= "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj2.strActiveRowBgColor	= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	//GridObj2.strHDClickAction		= "sortsingle";   	//濠翕 sort 晦棟
    

	
	GridObj2.nCellFontSize			= 9;					// Font Size 9
	//GridObj2.bStatusbarVisible		= true;				// status bar visible 鼻鷓夥 撲薑 

}

function setDefault3() { 

	//GridObj.bUserContextMenu 	= true;					//餌辨濠 鐘臢蝶お 詭景曖 餌辨 罹睡蒂 唸薑и棻. 
	GridObj3.bRowSelectorVisible	= false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj3.bRowSelectorIndex	= true;					//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj3.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj3.nHDLines = 2;   
    
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj3.strSelectedCellFgColor	= '0|0|0';
    GridObj3.strHDClickAction		= "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj3.strActiveRowBgColor	= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj3.strHDClickAction		= "sortsingle";   	//濠翕 sort 晦棟
    
	// Cell Font Setting
	GridObj3.nCellFontSize			= 9;					// Font Size 9
	
	///* Context Menu 餌辨濠 MENU 蹺陛 */
    //GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row 蹺陛");   
	
}   
function setDefault4() { 

	GridObj4.bRowSelectorVisible	= false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj4.bRowSelectorIndex		= true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj4.nHDLineSize			= 12; //Header Size
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj4.strActiveRowBgColor	= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj4.nCellFontSize			= 9;					// Font Size 9
	GridObj4.bStatusbarVisible		= true;				// status bar visible 鼻鷓夥 撲薑
	GridObj4.strHDClickAction		= "sortsingle";
}
    
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) { 
		
	  	GridObj.AddHeader("ITEM_ID"				,"ヶ跡廓��"       	,"t_text" 		,20		,80  ,false); //0   
	 	GridObj.AddHeader("ITEM_NAME"			,"ヶ跡貲"      		,"t_text" 		,100	,200 ,false); //0 
	 	GridObj.AddHeader("SPEC"				,"敘問"      		,"t_text" 		,100	,100 ,false); //0 
	 	
	 	GridObj.AddHeader("PROD_0"				,"M"      			,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_1"				,"M+1"      		,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_2"				,"M+2"      		,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_3"				,"M+3"      		,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_4"				,"M+4"      		,"t_number" 	,100.3	,80 ,true);  
	 	GridObj.AddHeader("PROD_5"				,"M+5"      		,"t_number" 	,100.3	,80 ,true);  

	 	GridObj.AddGroup	("PROD_PLAN",   "儅骯啗��");			
		GridObj.AppendHeader("PROD_PLAN", 	"PROD_0");
		GridObj.AppendHeader("PROD_PLAN", 	"PROD_1");
		GridObj.AppendHeader("PROD_PLAN", 	"PROD_2");
		GridObj.AppendHeader("PROD_PLAN",   "PROD_3");
		GridObj.AppendHeader("PROD_PLAN",   "PROD_4");
		GridObj.AppendHeader("PROD_PLAN",   "PROD_5");
	 	
	
		GridObj.BoundHeader();	
	
	    
	    GridObj.SetColCellAlign('ITEM_ID',  'center'); 
	    GridObj.SetColCellAlign('ITEM_NAME',  'left'); 
	    GridObj.SetColCellAlign('SPEC',   'left');
	
		GridObj.SetColFix('SPEC');
	
		//GridObj.SetColCellBgColor('SEL_DMD',		color_edit_col);//晦遽營堅
	
	    GridObj.SetNumberFormat("PROD_0",			"#,##0");
	    GridObj.SetNumberFormat("PROD_1",			"#,##0");
	    GridObj.SetNumberFormat("PROD_2",			"#,##0");
	    GridObj.SetNumberFormat("PROD_3",			"#,##0");
	    GridObj.SetNumberFormat("PROD_4",			"#,##0");
	    GridObj.SetNumberFormat("PROD_5",			"#,##0");
	
	

}

function setHeader2(GridObj2) { 
		
		GridObj2.AddHeader("SELECTED"	,""   		,"t_checkbox"	,2			,30  ,true); //0
		GridObj2.AddHeader("ITEM_ID"	,"ヶ跡廓��"  	,"t_text" 		,10			,80  ,false); //0   
	  	GridObj2.AddHeader("ITEM_NAME"	,"ヶ跡貲"    	,"t_text" 		,100		,200  ,false); //0 
	  	GridObj2.AddHeader("IDX"		,"牖憮"      ,"t_number" 	,100.3		,0  ,false); //0    
	  	GridObj2.AddHeader("GUBN"		,"掘碟"      ,"t_text" 		,100		,60  ,false); //0
	  	
	  	GridObj2.AddHeader("PROD_0"				,"M"      			,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_1"				,"M+1"      		,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_2"				,"M+2"      		,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_3"				,"M+3"      		,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_4"				,"M+4"      		,"t_number" 	,100.3	,70 ,true);  
	 	GridObj2.AddHeader("PROD_5"				,"M+5"      		,"t_number" 	,100.3	,70 ,true);  

	  	GridObj2.AddHeader("MINMPSQTY"	,"MOQ"			,"t_number" ,100.3		,50  ,true); //0 
	  	GridObj2.AddHeader("NTGEW"		,"欽嬪渡KG"		,"t_number" ,100.3		,60  ,true); //0
	  	GridObj2.AddHeader("READ_TIME"	,"葬萄顫歜" 		,"t_number" ,100.3		,60  ,true); //0 
	  	GridObj2.AddHeader("MEINS"		,"嫦輿欽嬪"      ,"t_text" 	,100		,0  ,false); //0 
	  	GridObj2.AddHeader("QTY"		,"蹂掘榆"			,"t_number" ,100.3		,60  ,true); //0 
	  	GridObj2.AddHeader("IPGO_QTY"	,"PR榆"			,"t_number" ,100.3		,60   ,true); //0 
	  	GridObj2.AddHeader("IPGO_DATE"	,"殮堅蹂羶橾" 	,"t_date"   ,100		,80  ,true); //0
	  	GridObj2.AddHeader("TEXT"		,"か檜餌о"      ,"t_text"   ,100		,120  ,true); //0
		GridObj2.AddHeader("PR_NO"		,"PR廓��"     	,"t_text" 		,100	,70   ,true); //0   
 		GridObj2.AddHeader("IF_MSGS"	,"IF 詭撮雖"     	,"t_text" 		,100	,100   ,true); //0    
 		GridObj2.AddHeader("BASE_STOCK"	,"營堅榆"     	,"t_number" 		,100.3	,70   ,true); //0    	    
		GridObj2.BoundHeader();	
	 	
	 	GridObj2.SetColCellAlign('ITEM_ID',		'center'); 
	    GridObj2.SetColCellAlign('ITEM_NAME',	'left'); 
	    GridObj2.SetColCellAlign('GUBN',		'center');
	    GridObj2.SetColCellAlign('TEXT',		'left'); 
	    GridObj2.SetColCellAlign('MEINS',		'center'); 
	    GridObj2.SetColCellAlign('IPGO_DATE',	'center');	   
	    
	    GridObj2.SetNumberFormat("PROD_0",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_1",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_2",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_3",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_4",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_5",	"#,##0");
	    
	    GridObj2.SetDateFormat("IPGO_DATE",'yyyy-MM-dd');
	    
	    
	    GridObj2.SetNumberFormat("MINMPSQTY",	"###,###.##");
	    GridObj2.SetNumberFormat("QTY","###,###.##");
	    GridObj2.SetNumberFormat("IPGO_QTY",	"###,###.##");
	

}

function setHeader3(GridObj3) {     
	
			
	  	GridObj3.AddHeader("ITEM_ID"			,"ヶ跡廓��"       	,"t_text" 		,20		,80  ,false); //0   
	 	GridObj3.AddHeader("ITEM_NAME"			,"ヶ跡貲"      		,"t_text" 		,100	,0 ,false); //0 
	 	
	 	
	 	GridObj3.AddHeader("MONTH_0"				,"M-3"      	,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_1"				,"M-2"      	,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_2"				,"M-1"      	,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_3"				,"LM"      		,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_4"				,"LM+1"      	,"t_number" 	,100.3	,80 ,false);  
	 	GridObj3.AddHeader("MONTH_5"				,"LM+2"      	,"t_number" 	,100.3	,80 ,false);  
	 	
	 

	 	
	 	GridObj3.AddGroup	 ("SALES_MONTH", "っ衙褒瞳");			
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_0");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_1");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_2");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_3");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_4");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_5");
	 	
	
		GridObj3.BoundHeader();	
	
	    
	    GridObj3.SetColCellAlign('ITEM_ID',  'center'); 
	    GridObj3.SetColCellAlign('ITEM_NAME',  'left'); 

	
	    GridObj3.SetNumberFormat("MONTH_0",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_1",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_2",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_3",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_4",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_5",			"#,##0");
		
 
}

function setHeader4(GridObj4) {        
       
  	GridObj4.AddHeader("ITEM_ID"		,"ヶ跡廓��"  	,"t_text" 	,10		,60		,false); //0   
  	GridObj4.AddHeader("ITEM_NAME"		,"ヶ跡貲"  	,"t_text" 	,100	,200	,false); //0 
  	GridObj4.AddHeader("DEMAND"			,"模蹂榆"  	,"t_number" ,100.3	,78		,false); //0    
 	GridObj4.AddHeader("PROD_QTY"		,"衙殮榆"		,"t_number" ,100.3	,68 	,false); //0   
 	GridObj4.AddHeader("USE_QTY"		,"檜煩餌辨榆"	,"t_number" ,100.3	,68		,false); //0   

	GridObj4.BoundHeader();	
 
    GridObj4.SetColCellAlign('ITEM_ID',		'center'); 

    GridObj4.SetNumberFormat("PROD_QTY",	"###,###.##");
    GridObj4.SetNumberFormat("USE_QTY",		"###,###.##");
	GridObj4.SetNumberFormat("DEMAND",		"###,###.##");

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Change Combo Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	
		
};



function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  

}




/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery(){
	
    var endMode		= GridObj.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {            
        	
			GridSetMerge_dw1();
			doQuery2();
			doQuery3();
			
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save"){
    	
    	doSave2();
    	
		
    }else{ // 餉薯, 瞪歎 鼻鷓橾衛 詭檣斜葬萄 薯褻��   
    	
    }
    
	
}

function GridEndQuery2() {
	
	var endMode		= GridObj2.GetParam("mode");
	var error_msg	= '';
	          
	if(endMode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			
			
			GridSetMerge_dw2();
			GridCal_dw2();
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}else if(endMode == "save2"){
    
		alert("盪濰ж艘蝗棲棻");
		doQuery();
		doQuery2();
    }	
	
}

function GridEndQuery3(){
		
    var endMode		= GridObj3.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search3") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj3.GetStatus() == "true") 
        {            
        	
			GridSetMerge_dw3();		
			
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	
}

function GridEndQuery4(){
		
    var endMode		= GridObj4.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search4") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj4.GetStatus() == "true") 
        {            
        	
			GridSetMerge_dw4();		
			
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛GRID2 啗骯衝
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCal_dw2(){	
	
	var cur_stock;
	var req_qty;
	var ipgo_qty;
	var next_stock;	
	
	var rowcount = GridObj2.GetMergeCount('ITEM_ID');   //模啗 檣策蝶 掘ж晦
	
	
	
	for (var i=0; i < rowcount; i++){
		
		var start_hd_name	= 'PROD_0';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,5);
		var hd_name_2 		= start_hd_name.substr(5,6);
		
		
		var idx				= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		
		for(var j =0; j < 5; j++){
			
			cur_stock 		= Math.round(GridObj2.GetCellValue(hd_name,idx),0);
			req_qty 		= Math.round(GridObj2.GetCellValue(hd_name,idx+1),0);
			ipgo_qty		= Math.round(GridObj2.GetCellValue(hd_name,idx+2),0);
			
			next_stock		= Math.round(Number(cur_stock),0) - Math.round(Number(req_qty),0) + Math.round(Number(ipgo_qty),0);
			
			hd_name_2 	= Number(hd_name_2)+Number(1);						
			hd_name 	= hd_name_1+hd_name_2;
			
			GridObj2.SetCellValue(hd_name, idx,  next_stock);
			
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
function GoSearch(service){
	
    doQuery();
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� DW2 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function Grid2CellDblClick(strColumnKey, nRow){ 
	
	
	var item_id		= GridObj2.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj2.GetCellValue('ITEM_NAME',nRow)
	var version		= document.frm.version.value;
	var gubn		= 'wel';
	
	
	if(strColumnKey == 'ITEM_NAME' ){
		
		var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_PR_PO_term_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&gubn=" + gubn;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=380, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();		
	}else if(strColumnKey == 'GUBN' ){
		
		var service_url = "service.do?_moon_service=op_02090_Long_Term_Planning_list_mat_move_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&gubn=" + gubn + "&version=" + version;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1095, height=280, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();
	}
	
	
	
	document.frm.item_id.value = item_id;
	
	doQuery4();	
	
}   


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery()  {
	
   SetHeader_grid1();		
   var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
   var version		= document.all.version.value;
   var item_type	= document.all.item_type.value;
  
  		
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   GridObj.SetParam("mode", 		 "search");
   GridObj.SetParam("version", 		  version);
   GridObj.SetParam("item_type",    item_type);
  
       
   GridObj.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2() {
	
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var version		= document.all.version.value;
	var item_type	= document.all.item_type.value;	
	
	if(item_type == "1") item_type = '3';
	if(item_type == "2") item_type = '4';
	

	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	//GridObj2.SetParam("itype", itype);
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("version", 		  version);
	GridObj2.SetParam("item_type",    item_type);

	GridObj2.DoQuery(servlet_url);
}
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 3 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery3()  {
	
   SetHeader_grid3();	
   var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
   var version		= document.all.version.value;
   var item_type	= document.all.item_type.value;
  
  		
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   GridObj3.SetParam("mode", 		 "search3");
   GridObj3.SetParam("version", 	 version);
   GridObj3.SetParam("item_type",    item_type);
  
       
   GridObj3.DoQuery(servlet_url);
}

function doQuery4() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var item_id		= document.frm.item_id.value;
	var version		= document.all.version.value;	
	var from_mm		= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	
	
	
	GridObj4.SetParam("mode",		  "search4");
	GridObj4.SetParam("item_id",  		item_id);
	GridObj4.SetParam("from_mm",  	   from_mm);
	GridObj4.SetParam("to_mm",			 to_mm);
	GridObj4.SetParam("version", 		version);


	GridObj4.DoQuery(servlet_url);
}

// 撚 盪濰 瞪羲滲熱
var objTdG;



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



//--------------------------------------   main_template 縑 薑曖脹 Event ---------------------------------------------------//
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/

// 盪濰
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode		= "save";
	doSave();	
};

// 盪濰
function doSave() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var version		= document.all.version.value;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("version",						version);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}

function doSave2() {
 
	var GridObj2	= document.WiseGrid2;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var version		= document.all.version.value;
	var Rows 		= new Array();
	var rowcount 	= GridObj2.GetRowCount();
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');
	
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');

		for(var i =0; i < mergecount ; i++){
	
		var idx		= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,true);
		
		var idx_2	= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		
		var txt		= GridObj2.GetCellValue('TEXT',idx_2);
		var req		= GridObj2.GetCellValue('QTY',idx_2);
		var pr_qty	= GridObj2.GetCellValue('IPGO_QTY',idx_2);
		var ipgo_date = GridObj2.GetCellValue('IPGO_DATE',idx_2);
		var base_stock	= GridObj2.GetCellValue('PROD_0',idx_2);		
		
		GridObj2.SetCellValue("TEXT",idx,txt);		
		GridObj2.SetCellValue("QTY",idx,req);
		GridObj2.SetCellValue("IPGO_QTY",idx,pr_qty);
		GridObj2.SetCellValue("IPGO_DATE",idx,ipgo_date);
		GridObj2.SetCellValue("BASE_STOCK",idx,base_stock);
		
			

	}
	
	for(var i =0; i < mergecount ; i++){
		
		var idx				= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,true);
		GridObj2.SetCellValue("SELECTED",idx,1);		

	}
	
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode",						 "save2");
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	GridObj2.SetParam("version",					 version);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	//GridObj2.DoQuery(servlet_url, Rows);		cab だ橾 幗瞪 碳橾纂煎 餌辨旎
	
	GridObj2.DoQuery(servlet_url, "SELECTED");
 
}





function GoIf(){

	if(confirm("摹鷗 ж褐 ヶ跡曖 ERP 瞪歎擊 �挨匹牮簸睍懂炱�?") == 1 ) {
		
	}
	else{
		return;
	}	


	var GridObj2		= document.WiseGrid2;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var version		= document.all.version.value;
	 
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode",						 "doIf");
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	GridObj2.SetParam("version",						version);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj2.DoQuery(servlet_url, "SELECTED");

	
}



function doChange2(obj){
	
	var version = document.frm.version.value;
	var in_div;
	
	commonUtil.getSelQeury("version",version,"Aps_Pr_version_Semi_list", { 
	callback:function(arrList){
		var selected_row = 0;
		
		in_div = "<select name=\"version\" OnChange=\"doChange3(this);\"  >";
		for(var i=0 ; i < arrList.length ; i++){
			
			in_div +=	"<option value="+arrList[i][0];
		
			
			// 盪濰衛 combo-list陛 refresh腎賊憮 盪濰ц湍 ヶ跡擊 棻衛 摹鷗ж紫煙 и棻.
			if(document.frm.version.value == arrList[i][0]) {
				in_div += " selected";
				selected_row = i;
			}
			
			in_div += ">"+arrList[i][0]+"</option>";
			
		}	
		in_div += "</select> \n";
		for(var i=0 ; i < arrList.length ; i++){
		}	

		divVersionCombo.innerHTML = in_div;
		

	}
	});
}

function Grid2ChangeCell(strColumnKey, nRow,nOldValue,nNewValue){
	
	
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');	
	var version		= document.frm.version.value;
	for (var i=0; i<mergecount; i++){
		
		var idx	= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);   //merge group曖 羅廓簞 row index	
		if(nRow == idx || nRow == idx +1 || nRow == idx+2){
			if(strColumnKey == "QTY"){
				
				var minqty 		= GridObj2.GetCellValue('NTGEW',nRow);
				var cur_date 	= GridObj2.GetCellValue('IPGO_DATE',nRow);
				var read_time	= GridObj2.GetCellValue('READ_TIME',nRow);
				commonUtil.getSelQeury( "version!%!read_time", version +"!%!" + read_time, "op_02090_get_ipgo_date",{
				callback:function(result){
				
				
						GridObj2.SetCellValue('IPGO_DATE',nRow,result);
					}
					
				});	
				
		
				GridObj2.SetCellValue('IPGO_QTY',nRow,minqty *nNewValue );
			}
			
		}	
		
	}
	
	GridCal_dw2();
	
}



function GridSetMerge_dw1(){
	
	
	GridObj.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'PROD_0,PROD_1,PROD_2,PROD_3,PROD_4,PROD_5'); 
	GridObj.SetSummaryBarColor('SUMMARY','0|153|0', color_tot); 
 	   
}

function GridSetMerge_dw2(){	
	
	GridObj2.SetGroupMerge('ITEM_ID,ITEM_NAME');	
	
	var rowcount	= GridObj2.GetRowCount();
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');		
	var bgidx		= 0 ;
	
	for (var i=0; i < mergecount; i++){
		
		var idx_start	= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);   //merge group曖 羅廓簞 row index
		var idx_end		= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,true);   //merge group曖 葆雖虞 row index
		var gap			= idx_end - idx_start;
		//GridObj2.SetRowBgColor(idx_start,'178|235|244');
		
		if(bgidx == '1') {
			for(j=idx_start; j < idx_end+1; j++){
			
				GridObj2.SetRowBgColor(j,'255|253|208');
			}
			
			bgidx = 0 ;
			
		}else		bgidx = 1;
		
		
		//營堅榆,模蹂榆,殮堅榆 撮 row陛 棻 橈擊 熱紫 氈晦 ��僥縑 營堅榆 row蒂 薯諼ж堅朝 ら餵碳陛煎 撲薑п遽棻.
//		if(gap == '2') {
//			
//			GridObj2.SetCellActivation('QTY',idx_start+1,'activatenoedit');
//			GridObj2.SetCellActivation('QTY',idx_start+2,'activatenoedit');
//		}else{
//			GridObj2.SetCellActivation('QTY',idx_start+1,'activatenoedit');
//		}
	
	}
	
}

function GridSetMerge_dw3(){
	

	GridObj3.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'MONTH_0,MONTH_1,MONTH_2,MONTH_3,MONTH_4,MONTH_5'); 
	GridObj3.SetSummaryBarColor('SUMMARY','0|153|0', color_tot); 
	

 	   
}

function GridSetMerge_dw4(){
	
	
	GridObj4.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'PROD_QTY,USE_QTY'); 
	GridObj4.SetSummaryBarColor('SUMMARY','0|153|0', color_tot);  
	

 	   
}

function SetHeader_grid1(){
	
	
	var version = document.frm.version.value;
	var hd_text = new Array();
	var hd_name = 'PROD_';
	
	commonUtil.getSelQeury( "cnfm_date", version  , "op_02090_Long_Term_Planning_list_semi_dw1_header",{
	callback:function(result){
		
		for(i=0; i < 6; i++){
			
			var hd_text_name = hd_name + i;			
			GridObj.SetColHDText(hd_text_name,result[i][0]);
			GridObj2.SetColHDText(hd_text_name,result[i][0]);
			
		}
			 
		}
	}); 	

}

function SetHeader_grid3(){
	
	
	var version = document.frm.version.value;
	var hd_text = new Array();
	var hd_name = 'MONTH_';
	
	commonUtil.getSelQeury( "cnfm_date", version  , "op_02090_Long_Term_Planning_list_semi_dw3_header",{
	callback:function(result){
		
		for(i=0; i < 6; i++){
			
			var hd_text_name = hd_name + i;			
			GridObj3.SetColHDText(hd_text_name,result[i][0]);
		
			
		}
			 
		}
	}); 	

}


function doChange_mm(obj){
	
	var from_mm 	= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	var from_mm_1	= from_mm.substr(0,4);
	var from_mm_2	= from_mm.substr(5,6);
	var to_mm_1		= to_mm.substr(0,4);
	var to_mm_2		= to_mm.substr(5,6);
	
	
	//Number(hd_name_2)+Number(1);
	
	if(obj.name == 'pre_mm'){ // 檜瞪殖
		from_mm_2	= Number(from_mm_2) - Number(1);
		to_mm_2		= Number(to_mm_2) - Number(1);
		
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

function CreateVersion(){
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",						 "trans");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url);
}
	