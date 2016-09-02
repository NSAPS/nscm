//##############################################################
//## Щ煎斜極ID     	: md_01060_itemMasterManagement_list_new.js
//## Щ煎斜極貲      	: ヶ跡葆蝶攪婦葬
//## 偃嫦濠          	: 掏辨雙
//## 偃嫦橾濠        	: 2011-11-01
//##
//## 婦溼 job file   : 
//## 婦溼 query file : 
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2011-11-01  掏辨雙      create
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
var job_id = 'md_01060_itemMasterManagement_list_new';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2;

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/* VER 2.0 滲唳餌о */
var rFirst = 0;							// 盪濰 濛機�� 營褻�蜇� �飛橉岌☆� 嶸雖ж晦 嬪и Row Index 盪濰 滲熱
var	save_nRow = '';

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
        //document.WiseGrid.height = tableHeightValue + "px"; 
        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
        //document.WiseGrid3.height = tableHeightValue - document.WiseGrid.height + "px"; 
        
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


   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
    
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	//GridObj.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.strCellFontName = '蜈擎 堅蛐'; 
    //GridObj.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 


    
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj2.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj2.nHDLineSize         = 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines = 2;        
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    GridObj2.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	//GridObj2.strCellFontName = '蜈擎 堅蛐'; 

}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        //  還夥翎 : \n

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
	//GridObj.SetColHide("CRUD", true); 

	
	GridObj.AddHeader("ITEM_ID"				,"ヶ跡廓��"				,"t_text"	,200	,66,false);//0
	GridObj.AddHeader("ITEM_NAME"			,"ヶ跡貲"					,"t_text"	,200	,174,false);//0
	GridObj.AddHeader("SPEC"				,"蝶ね"					,"t_text"	,200	,90,false);//0
	GridObj.AddHeader("MTO_FLAG"			,"MTO/\nMTS"			,"t_text"	,200	,0,false);//0
	GridObj.AddHeader("MTO_MTS_SCM"			,"MTO/\nMTS"			,"t_text"	,200	,50,true);//0
	GridObj.AddHeader("EX_NATION"			,"措陛囀萄"				,"t_combo"	,200	,91,true);//0
	GridObj.AddHeader("SPEC_UOM"			,"蝶ね\n欽嬪"				,"t_text"	,200	,35,false);//0
	
	
	GridObj.AddHeader("ITEM_HIST"			,"ヶ跡檜溘\n翱唸"			,"t_text"	,200	,61,false);//0
	GridObj.AddHeader("BOX_PER_PALET"		,"だ溯お渡\nBOX熱"		,"t_number"	,200	,61,true);//0
	GridObj.AddHeader("MOQ"					,"M.O.Q"				,"t_number"	,200	,61,true);//0
	GridObj.AddHeader("SAFETY_STOCK"		,"寰瞪營堅"				,"t_number"	,200	,61,true);//0
	GridObj.AddHeader("CAT03"				,"熱歎啗�鈾n晦遽薑爾"		,"t_combo"	,200	,91,true);//0
	GridObj.AddHeader("CAT06"				,"奢濰й渡\n晦遽薑爾"		,"t_combo"	,200	,91,true);//0

	GridObj.AddHeader("REFE_ITEM1"			,"っ衙跡ル\n霤褻ヶ跡"		,"t_text"	,200	,66,true);//0
	GridObj.AddHeader("REFE_ITEM1_NAME"		,"っ衙跡ル\n霤褻ヶ跡貲"		,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SEARCH_FLAG"			,"褻�蜂萴酅nFLAG"			,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("CAT07"				,"熱歎醞雖\nFLAG"			,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("SALES_PLAN_APPL_HIST","っ衙啗�鈾n薯ヶ碟盟"		,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("CM_GUBN"				,"CM掘碟"				,"t_combo"	,200	,74,true);//0

	GridObj.AddHeader("MULTI_FLAG"			,"詩じん濰\n罹睡"			,"t_combo"	,200	,65,true);//0
	GridObj.AddHeader("QTY_PER_MULTI"		,"詩じん濰\n熱榆"			,"t_number"	,200	,55,true);//0
	GridObj.AddHeader("QTY_PER_MULTI_UOM"	,"詩じん濰\n熱榆欽嬪"		,"t_text"	,200	,55,true);//0


	GridObj.AddHeader("MIN_PICK_QTY"		,"譆模Picking\n熱榆"		,"t_number"	,200	,74,true);//0
	GridObj.AddHeader("PACK_PROC_FLAG"		,"Package\nProcess罹睡"	,"t_text"	,200	,84,true);//0
	GridObj.AddHeader("CAT01"				,"薯ヶか癒1"				,"t_combo"	,200	,104,true);//0
	GridObj.AddHeader("CAT02"				,"薯ヶか癒2"				,"t_combo"	,200	,134,true);//0
	GridObj.AddHeader("CAT04"				,"薯ヶか癒4"				,"t_text"	,200	,74,true);//0
	GridObj.AddHeader("CAT05"				,"薯ヶか癒5"				,"t_text"	,200	,74,true);//0
	GridObj.AddHeader("TRANS_ALLOC_FLAG"	,"熱歎綠\nй渡"			,"t_combo"	,200	,74,true);//0
	GridObj.AddHeader("PROD_ALLOC_FLAG"		,"薯褻綠\nй渡"			,"t_combo"	,200	,74,true);//0
	
	GridObj.AddHeader("DIVISION"			,"薯ヶ捱"					,"t_text"	,200	,74,false);//0
	GridObj.AddHeader("RECIPE_TYPE"			,"寡м嶸⑽"				,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("MATERIAL_GROUP"		,"濠營斜瑜"				,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT01"			,"艙機ヶ謙\n斜瑜1"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT02"			,"艙機ヶ謙\n斜瑜2"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT03"			,"艙機ヶ謙\n斜瑜3"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT04"			,"艙機ヶ謙\n斜瑜4"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("SALES_CAT05"			,"艙機ヶ謙\n斜瑜5"			,"t_text"	,200	,124,false);//0
	GridObj.AddHeader("HR_TY1"				,"啗類顫殮1"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY2"				,"啗類顫殮2"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY3"				,"啗類顫殮3"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY4"				,"啗類顫殮4"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("HR_TY5"				,"啗類顫殮5"				,"t_text"	,200	,104,false);//0
	GridObj.AddHeader("QTY"					,"晦獄欽嬪頂\n熱榆"		,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("BASE_UOM"			,"晦獄欽嬪"				,"t_text"	,200	,74,false);//0
	GridObj.AddHeader("TWGT_PER_BUOM"		,"識醞榆"					,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("NWGT_PER_BUOM"		,"牖醞榆"					,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("VOL_PER_BUOM"		,"睡Я"					,"t_number"	,200.3	,74,false);//0
	GridObj.AddHeader("VOL_UOM"				,"睡Я欽嬪"				,"t_text"	,200	,74,false);//0

	/* 盪濰擊 嬪и �鰽� 高 */
 	//GridObj.AddHeader("CUST_ITEM_ID"	,"CUST_ITEM_ID"		,"t_text" 	,100	,0 	,false); //0
 	//GridObj.AddHeader("CUST_STORE_CODE"	,"CUST_STORE_CODE"	,"t_text" 	,100	,0 	,false); //0

	GridObj.BoundHeader();	



    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('SPEC','right'); 
    GridObj.SetColCellAlign('SPEC_UOM','center'); 
    GridObj.SetColCellAlign('MTO_FLAG','center'); 
    GridObj.SetColCellAlign('MTO_MTS_SCM','center'); 
    GridObj.SetColCellAlign('QTY_PER_MULTI_UOM','center'); 
    GridObj.SetColCellAlign('ITEM_HIST','center'); 
    GridObj.SetColCellAlign('PACK_PROC_FLAG','right'); 
    GridObj.SetColCellAlign('EX_NATION','center'); 
    GridObj.SetColCellAlign('REFE_ITEM1','center'); 


	GridObj.SetColFix('ITEM_NAME');

	//GridObj.SetColCellBgColor('SEL_DMD',color_edit_col);//晦遽營堅
    //GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
	//GridObj.SetColHDBgColor('TOT_STOCK','253|228|229');
    //GridObj.bCellFontBold = true; 
	
	GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	//Hidden 鏽歲
	GridObj.SetColHide("CRUD",true);

}

function setHeader2(GridObj2) { // 輿僥薑爾

	
	GridObj2.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100		,0   ,false);
  	GridObj2.AddHeader("ITEM_ID"		,"ITEM_ID"     		,"t_text" 	,100		,0   ,false); //0 
  	GridObj2.AddHeader("PLANT_ID"		,"Ы楠おID"      		,"t_text" 	,100		,60  ,false); //0 
  	GridObj2.AddHeader("PLANT_NAME"		,"Ы楠お貲"     		,"t_text" 	,500		,77  ,false); //0  
  	GridObj2.AddHeader("PRIORITY"		,"儅骯辦摹牖嬪"   		,"t_text" 	,500		,90  ,true); //0   
  	GridObj2.AddHeader("REP_ITEM_ID"	,"渠ル薑ヶ"			,"t_text" 	,100		,77  ,true); //0   
  	GridObj2.AddHeader("REP_RATIO"		,"渠ル薑ヶ\n綠徽"     	,"t_text" 	,100		,77  ,true); //0   
  	GridObj2.AddHeader("BOX_PER_PALET"	,"だ溯お渡\nBOX熱"    ,"t_number" ,100.3		,77  ,true); //0   
  	GridObj2.AddHeader("MIN_PICK_QTY"	,"譆模PICKING\n熱榆" 	,"t_number" ,100.3		,88  ,true); //0   
  	GridObj2.AddHeader("ALLOC_RATE"		,"寡碟徽"  			,"t_number" ,100.3		,77  ,true); //0   
  	GridObj2.AddHeader("MIN_ALLOC_QTY"	,"譆模寡碟徽"      	,"t_number" ,100.3		,77  ,true); //0    
  	GridObj2.AddHeader("DAYWEEK_PATTERN","儅骯摹�αn蹂橾"     	,"t_combo" 	,100		,70  ,true); //0   
  	GridObj2.AddHeader("MC_TYPE"		,"ん濰嶸⑽"     		,"t_combo" 	,100		,70  ,true); //0   
  	GridObj2.AddHeader("MIN_LOT_SIZE"	,"譆模儅骯\n欽嬪"		,"t_number" ,100.3		,70  ,false); //0   �飛� 馬辭
  	GridObj2.AddHeader("MAX_LOT_SIZE"	,"譆渠儅骯\n欽嬪"		,"t_number" ,100.3		,70  ,false); //0   �飛� 馬辭
  	GridObj2.AddHeader("STD_FIX_COST"	,"ル遽錳陛\n堅薑綠"	,"t_number" ,100.3		,70  ,false); //0   �飛� 馬辭
  	GridObj2.AddHeader("STD_CHG_COST"	,"ル遽錳陛\n滲翕綠"	,"t_number" ,100.3		,70  ,false); //0   �飛� 馬辭
  	GridObj2.AddHeader("REAL_FIX_COST"	,"褒薯褻錳陛\n堅薑綠"	,"t_number" ,100.3		,70  ,false); //0   �飛� 馬辭
  	GridObj2.AddHeader("REAL_CHG_COST"	,"褒薯褻錳陛\n滲翕綠"	,"t_number" ,100.3		,70  ,false); //0   �飛� 馬辭
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 

	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    
	GridObj2.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	//Hidden 鏽歲
	GridObj2.SetColHide("CRUD",true);
    
	GridObj2.SetColFix('PLANT_NAME');

}
   
	// 鏽歲 堅薑

function setGrid(){
	//GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT
	GridObj.SetColFix('ITEM_NAME');
}


function setGrid2(){
	GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT
	//GridObj2.SetGroupMerge('ITEM_ID,ITEM_NAME');	
	
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery(){
	
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';
    
    //alert("endMode="+endMode);  
    if(endMode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {            
			/*edit cell儀梃 滲唳*/         	
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell儀梃 滲唳
				GridObj.SetCellBgColor('ITEM_HIST', i, color_edit_col );
				GridObj.SetCellBgColor('BOX_PER_PALET', i, color_edit_col );
				GridObj.SetCellBgColor('CAT03', i, color_edit_col );
				GridObj.SetCellBgColor('CAT06', i, color_edit_col );
				GridObj.SetCellBgColor('EX_NATION', i, color_edit_col );
				GridObj.SetCellBgColor('CAT07', i, color_edit_col );
				GridObj.SetCellBgColor('CM_GUBN', i, color_edit_col );
				GridObj.SetCellBgColor('SALES_PLAN_APPL_HIST', i, color_edit_col );
				GridObj.SetCellBgColor('MULTI_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('QTY_PER_MULTI', i, color_edit_col );
				GridObj.SetCellBgColor('QTY_PER_MULTI_UOM', i, color_edit_col );
				GridObj.SetCellBgColor('MIN_PICK_QTY', i, color_edit_col );
				GridObj.SetCellBgColor('PACK_PROC_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('CAT01', i, color_edit_col );
				GridObj.SetCellBgColor('CAT02', i, color_edit_col );
				GridObj.SetCellBgColor('CAT04', i, color_edit_col );
				GridObj.SetCellBgColor('CAT05', i, color_edit_col );
				GridObj.SetCellBgColor('TRANS_ALLOC_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('PROD_ALLOC_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('REFE_ITEM1', i, color_edit_col );
				GridObj.SetCellBgColor('REFE_ITEM1_NAME', i, color_edit_col );
				GridObj.SetCellBgColor('SEARCH_FLAG', i, color_edit_col );
				GridObj.SetCellBgColor('MOQ', i, color_edit_col );
				GridObj.SetCellBgColor('SAFETY_STOCK', i, color_edit_col );
				GridObj.SetCellBgColor('MTO_MTS_SCM', i, color_edit_col );

				
				//GridObj.SetCellFontBold('TOT_STOCK', i, 'true'); // font 掃晦
				//GridObj.SetCellFontBold('PR_QTY', i, 'true'); // font 掃晦
				//GridObj.SetCellFontBold('STD_STOCK', i, 'true'); // font 掃晦
			}
		
		/* VER 2.0 滲唳餌о */
		if( (rFirst > -1) && (rFirst < GridObj.GetRowCount()) )
			GridObj.SetRowScroll(rFirst); 
		
/*			
	    var sel_item_id = GridObj.GetCellValue("ITEM_ID", 0);
	    document.all.sel_item_id.value	= sel_item_id;
	    
	    var sel_item_name = GridObj.GetCellValue("ITEM_NAME", 0);
	    document.all.sel_item_name.value	= sel_item_name;			
		doQuery2(0);	
*/		
		
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

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			//GridObj2.SetGroupMerge(	'ITEM_ID,ITEM_NAME,PR_NO,PR_REL,PR_QTY,PO_NO,PO_SEQ,PO_DATE,PO_QTY');
		  	//GridObj2.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'SHIP_QTY');
		  	//GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot);
		  	
			/*edit cell儀梃 滲唳*/         	
			for(var i=0;i<GridObj2.GetRowCount();i++) {
			// cell儀梃 滲唳
				GridObj2.SetCellBgColor('PRIORITY', i, color_edit_col );
				GridObj2.SetCellBgColor('REP_ITEM_ID', i, color_edit_col );
				GridObj2.SetCellBgColor('REP_RATIO', i, color_edit_col );
				GridObj2.SetCellBgColor('BOX_PER_PALET', i, color_edit_col );
				GridObj2.SetCellBgColor('MIN_PICK_QTY', i, color_edit_col );
				GridObj2.SetCellBgColor('ALLOC_RATE', i, color_edit_col );
				GridObj2.SetCellBgColor('MIN_ALLOC_QTY', i, color_edit_col );
				GridObj2.SetCellBgColor('DAYWEEK_PATTERN', i, color_edit_col );
				GridObj2.SetCellBgColor('MC_TYPE', i, color_edit_col );
				
				//GridObj.SetCellFontBold('TOT_STOCK', i, 'true'); // font 掃晦
				//GridObj.SetCellFontBold('PR_QTY', i, 'true'); // font 掃晦
				//GridObj.SetCellFontBold('STD_STOCK', i, 'true'); // font 掃晦
			}		  	  
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}else if(endMode == "save2") {

		if(GridObj2.GetStatus() == "true") {// 
			doQuery2(save_nRow);	
		} else {
			var error_msg = GridObj2.GetMessage();// 
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
	rFirst = 0; /* VER 2.0 滲唳餌о */

    doQuery();
    //init2();
    //init3()
    //doQuery2();	
	//doQuery3();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
	
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow){
	
	// 霤褻 囀萄 鏽歲檜賊 餉薯罹睡 �挫�
	if( strColumnKey == "REFE_ITEM1"||strColumnKey == "REFE_ITEM1_NAME" ){
		if(GridObj.GetCellValue("REFE_ITEM1", nRow) != "") {
			if(confirm("霤褻ヶ跡擊 餉薯ж衛啊蝗棲梱?") == 1 ) {
				GridObj.SetCellValue("REFE_ITEM1", nRow,"");
				GridObj.SetCellValue("REFE_ITEM1_NAME", nRow, "");
				alert("盪濰ж敷撿 奩艙腌棲棻!");
			}
		}
		//openItemSearchPop( strColumnKey, nRow );
	}else if(strColumnKey == "ITEM_HIST" ){
		/* ヶ跡檜溘 儅撩 */
		chk_item_hist(strColumnKey, nRow);
	} else{
	    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	    document.all.sel_item_id.value	= sel_item_id;
	    var sel_item_name = GridObj.GetCellValue("ITEM_NAME", nRow);
	    document.all.sel_item_name.value	= sel_item_name;
	    
	    save_nRow = nRow;
	    
		doQuery2(nRow);		
	}     
	
}       


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Change Combo Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	/*
	// if 霞ч醞檣 等檜攪朝 熱薑 碳陛!!
	var if_flag	= GridObj.GetCellValue("IF_FLAG", nRow);
	if( if_flag == "" || if_flag == null) {

	}else{
		alert("�挨今� о跡擎 熱薑ж褒熱 橈蝗棲棻!");
		GridObj.SetComboSelectedIndex(strColumnKey, nRow,  nOldIndex);
		return; 
	}	
	 
	
	var version		= document.all.version.value;	
    var sel_dmd	= GridObj.GetCellHiddenValue("SEL_DMD", nRow);
    var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
    document.all.sel_dmd.value = sel_dmd;
    document.all.sel_item_id.value = sel_item_id;
    */

    
    //doQuery3(nRow);
    
	//alert("calPrDateNo 衛濛");
    
	//calPrDateNo(nRow);
		
};


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

	// 薯ヶ 囀萄 滲唳衛 
	if( strColumnKey == "REFE_ITEM1" ){
		// 薯ヶ 貲 set
		if(nNewValue != "") // 霤褻囀萄 餉薯蒂 嬪п 綴蘊擊 虜菟賊 で機璽擊 嗥辦雖 彊朝棻
			getItemInfo( nRow, nNewValue );
	}	
}
function Grid2ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛餌辨濠 霜蕾 殮溘高戲煎睡攪 薯ヶ薑爾 褻��
  弛薯ヶ 囀萄, 薯ヶ 貲 萃 醞 ж釭塭紫 橾纂ж朝 等檜攪 匐儀 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function getItemInfo( nRow, nNewValue ) {
	
	var ItemId = nNewValue;
	// 薯ヶ囀萄 等檜攪陛 橈朝 唳辦 л熱蒂 緒螳釭除棻
	if( ItemId == null || ItemId == "" ) {
		openItemSearchPop("REFE_ITEM1", nRow);
		return;
	}
	
	replenishPlan.getItemInfo('', ItemId, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// 橾纂ж朝 唸婁 橈擠
			if( arrList.length == 0 ) {
				openItemSearchPop("REFE_ITEM1", nRow);
			}
			// 橾纂ж朝 唸婁 1偃
			else if( arrList.length == 1 ) {
				GridObj.SetCellValue("REFE_ITEM1", nRow, arrList[0][0]);
				GridObj.SetCellValue("REFE_ITEM1_NAME", nRow, arrList[0][1]);
			}
			else {
				openItemSearchPop("REFE_ITEM1", nRow);
			}
		}
	});
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛薯ヶ 匐儀 POPUP  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function openItemSearchPop( strColumnKey, nRow ) { 
	
	var rowIdx = nRow;
	var OpenWindow = "md_01060_itemMasterManagement_list_new";
	var code_input = GridObj.GetCellValue("REFE_ITEM1", nRow);
	
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans_wisegrid&code_input=" + code_input + "&rowIdx=" + rowIdx + "&OpenWindow=" + OpenWindow;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1";
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
}

    
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var domain		= document.all.domain.value;
       var item_type	= document.all.item_type.value;  
       var serch_word	= document.all.serch_word.value;  
       var sell_stop_date	= document.all.sell_stop_date.value;  
       
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("domain", domain);
       GridObj.SetParam("item_type", item_type);
       GridObj.SetParam("serch_word", serch_word);
       GridObj.SetParam("sell_stop_date", sell_stop_date);
       
       GridObj.DoQuery(servlet_url);
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2(nRow) { //輿僥薑爾

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);

	GridObj2.DoQuery(servlet_url);
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



//--------------------------------------   main_template 縑 薑曖脹 Event ---------------------------------------------------//
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Row Scroll Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridRowScrollHandler(nFirstVisibleRowIndex, nEndVisibleRowIndex){
	rFirst = nFirstVisibleRowIndex;
}

// 盪濰
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
	doSave2();
};

// 盪濰
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "CRUD");
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}
function doSave2() {
 
	var GridObj2 = document.WiseGrid2;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode", "save2");
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj2.DoQuery(servlet_url, "CRUD");
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}
 

/* ヶ跡 檜溘 蛔煙 */
function chk_item_hist(strColumnKey, nRow) {


    var item_id;
    var item_name;
    var hist_flag;
	var old_item_id;
	var old_item_name;
	var user_id = document.frm._user_id.value;
	var idx = nRow;

//alert(user_id);
		item_id 	= GridObj.GetCellValue("ITEM_ID", idx);
		item_name 	= GridObj.GetCellValue("ITEM_NAME", idx);
		hist_flag 	= GridObj.GetCellValue("ITEM_HIST", idx);
		

		
///////////////////////////////////
		if(hist_flag == "X" ){
			if(confirm(item_id+":"+item_name+" 擎 ヶ跡檜溘檜 翱唸腎橫 氈雖 彊蝗棲棻.\nヶ跡 檜溘擊 儅撩ж衛啊蝗棲棻?") == 1 ) {
				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
			}
		}else{

			commonUtil.getCodeInfo("item_id", item_id, "md_01060_get_old_item_id", 
			{ 
				callback:function(arrList)
				{
					if( arrList.length == 1 )
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					else
					{
						old_item_id = arrList[0][0];
						old_item_name = arrList[0][1];
					}
					
			if(confirm(item_id+"["+item_name+"] 擎 "+old_item_id+"["+old_item_name+"] ヶ跡檜溘檜 翱唸腎橫氈蝗棲棻.\nヶ跡 檜溘擊 棻衛 儅撩ж衛啊蝗棲棻?") == 1 ) {

				var service_url = "service.do?_moon_service=md_01060_itemHist_popup";
				service_url += "&new_item_id=" + item_id  + "&new_item_name=" + item_name + "&user_id=" + user_id + "&idx=" + idx;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=500, height=140, top=400, left=400";
				var newWin = window.open(service_url, "md_01060_itemHist_popup", pop_win_style);
				newWin.focus();						
				
			}
				}
			});//commonUtil.getCodeInfo end
		}

}

