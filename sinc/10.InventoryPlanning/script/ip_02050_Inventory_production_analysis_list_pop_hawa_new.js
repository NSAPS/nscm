//## Щ煎斜極ID		:	ip_02050_Inventory_production_analysis_list_pop_hawa_new.js
//## Щ煎斜極貲		:	奢晝瞳м撩 餌瞪碟戮 pop_up -輿離滌
//## 偃嫦濠          :	檜鬼遵 
//## 偃嫦橾濠       	:	2014-10-12
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  陴錠辨      create
//## 2.0 		2013-10-14  陴錠辨		褻�蜈虃� 滲唳
//## 3.0 		2014-07-28  陴錠辨		斜楚Щ 褻�萵漺� 蹺陛
//## 4.0		2014-11-24	檜鬼遵		輿離滌 で機璽 褐敘 蹺陛
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_02050_Inventory_production_analysis_list_pop_hawa_new';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2 ; 													// WiseGrid 偌羹
var GridObj3 ; 													// WiseGrid 偌羹
var GridObj4 ; 													// WiseGrid 偌羹  

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


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
        //alert("tableHeightValue="+tableHeightValue); 
        
        var search_h = document.frm.search_h.value; 
        //if( search_menu.style.display == "none" ) 
        //{ 
            //tabHeightValue += Number(search_h); 
            //tableHeightValue += Number(search_h); 
        //} 
        
        // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
        // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
//        document.WiseGrid.height = tableHeightValue + "px"; 
        document.getElementById('my_chart').style.height = tableHeightValue + "px";
    }  

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 							弛
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.			弛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader(GridObj);  	//п渦儅撩 
	
}

function init2() {
	GridObj2 = document.WiseGrid2;
	
	setProperty(GridObj2);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader2(GridObj2);  	//п渦儅撩 
	setDefault2();        	//�飛� 晦獄 撲薑
	//  
}   
function init3() {
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader3(GridObj3);  	//п渦儅撩 
	setDefault3();        	//�飛� 晦獄 撲薑
	//  
}      
function init4() {
	GridObj4 = document.WiseGrid4;
	
	setProperty(GridObj4);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader4(GridObj4);  	//п渦儅撩 
	setDefault4();        	//�飛� 晦獄 撲薑
	//  
}      

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='default'; // page 欽嬪 scroll ->晦獄擎 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '蜈擎 堅蛐';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 1; 
    
    GridObj.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 
 
}

function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj2.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj2.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj2.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj2.strSelectedCellFgColor = '0|0|0'; 
	GridObj2.strMouseWheelAction='default'; // page 欽嬪 scroll ->晦獄擎 'default'   
    GridObj2.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 

	// Header Font Setting
	GridObj2.strHDFontName = '蜈擎 堅蛐';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines = 1; 
}

function setDefault3() { 

	GridObj3.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj3.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj3.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj3.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj3.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj3.strSelectedCellFgColor = '0|0|0'; 
	GridObj3.strMouseWheelAction='default'; // page 欽嬪 scroll ->晦獄擎 'default'   
    GridObj3.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 

	// Header Font Setting
	GridObj3.strHDFontName = '蜈擎 堅蛐';
	GridObj3.nHDFontSize = 9;				  	// Font Size 9
	GridObj3.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj3.nHDLines = 1; 
}       


function setDefault4() { 

	GridObj4.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj4.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj4.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj4.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj4.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj4.strSelectedCellFgColor = '0|0|0'; 
	GridObj4.strMouseWheelAction='default'; // page 欽嬪 scroll ->晦獄擎 'default'   
    GridObj4.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 

	// Header Font Setting
	GridObj4.strHDFontName = '蜈擎 堅蛐';
	GridObj4.nHDFontSize = 9;				  	// Font Size 9
	GridObj4.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj4.nHDLines = 1; 
}   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	var term_gubn	= "Week"; //輿離滌 で機璽檜嘎煎 Default煎 摹樹
	
	
	commonUtil.getSelQeury( "item_id!%!term_gubn", item_id+"!%!"+term_gubn, "ip_02050_Inventory_production_analysis_list_pop_up_hawa_header",{
	callback:function(result){

		  	GridObj.AddHeader("GUBN"	,"掘碟"      	,"t_text" 	,100.3		,90  ,false); //0   
		  	   

			for(var i=0 ; i < 61 ; i++){  //11 for(var i=0 ; i < 31 ; i++){  //11
				if(i < result.length) {
					if(i<21){
						GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,true); 
					}else{
						GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,0  ,true); 	
					}
					   
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 61) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,true);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,true);
					}
				}
			}
			
		GridObj.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
		setDefault();        	//�飛� 晦獄 撲薑 
	 
		/*pop up 璽縑憮 諦檜鍔 斜葬萄 譆蟾 撲薑擊 嬪п 
		 * GoSearch 蒂 init �醴� 褒ч  %醞蹂% */
		GoSearch(); 
	// 
    		GridObj.SetColCellAlign('GUBN','center'); 

			GridObj.SetNumberFormat("DAY_00"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_01"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_02"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_03"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_04"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_05"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_06"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_07"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_08"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_09"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_10"  , "#,##0.#"); 
			GridObj.SetNumberFormat("DAY_11"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_12"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_13"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_14"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_15"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_16"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_17"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_18"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_19"  , "#,##0.#");
			GridObj.SetNumberFormat("DAY_20"  , "#,##0.#"); 
			
			GridObj.SetColFix('GUBN'); 
		}
		
	});   

}

function setHeader2(GridObj2) {
	// 營堅 塽 儅骯 瞳м撩 碟戮 pop_up hearder (DW2 婁剪 30橾 褒瞳)        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_hawa_header2",{
		callback:function(result){

		  	GridObj2.AddHeader("GUBN"	,"掘碟"      	,"t_text" 	,100.3	,60  ,false); //0
		  	GridObj2.AddHeader("AVG"	,"晦除ゎ敕"      	,"t_number" ,100.3	,60  ,false); //0

			for(var i=0 ; i < 31 ; i++){  //11
				if(i < result.length) {
					GridObj2.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 31) { //11
						GridObj2.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj2.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj2.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
 
    		GridObj2.SetColCellAlign('GUBN','center'); 
    		GridObj2.SetColCellAlign('AVG','center'); 
    		
			GridObj2.SetNumberFormat("AVG"  , "#,##0");

			GridObj2.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_10"  , "#,##0");

			GridObj2.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_20"  , "#,##0"); 

			GridObj2.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj2.SetNumberFormat("DAY_30"  , "#,##0"); 

			GridObj2.SetColFix('AVG'); 
 
		}
		
	});   

}

function setHeader3(GridObj3) {        
      //營堅 塽 儅骯 瞳м撩 碟戮 pop_up hearder (DW3 瞪喇 翕橾) -->  
      
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_hawa_header3",{
		callback:function(result){

		  	GridObj3.AddHeader("GUBN"	,"掘碟"      	,"t_text" 	,100.3		,60  ,false); //0
		  	GridObj3.AddHeader("AVG"	,"晦除ゎ敕"      	,"t_number" ,100.3		,60  ,false); //0   

			for(var i=0 ; i < 61 ; i++){  //31
				if(i < result.length) {
					GridObj3.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 61) { //31
						GridObj3.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj3.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj3.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
 
    		GridObj3.SetColCellAlign('GUBN','center');
    		GridObj3.SetColCellAlign('AVG','center');
    		 
			GridObj3.SetNumberFormat("AVG"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_10"  , "#,##0");
 			GridObj3.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_20"  , "#,##0"); 
			GridObj3.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_30"  , "#,##0"); 			
 
			GridObj3.SetNumberFormat("DAY_31"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_32"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_33"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_34"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_35"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_36"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_37"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_38"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_39"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_40"  , "#,##0");
 			GridObj3.SetNumberFormat("DAY_41"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_42"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_43"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_44"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_45"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_46"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_47"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_48"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_49"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_50"  , "#,##0"); 
			GridObj3.SetNumberFormat("DAY_51"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_52"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_53"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_54"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_55"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_56"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_57"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_58"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_59"  , "#,##0");
			GridObj3.SetNumberFormat("DAY_60"  , "#,##0");
			
			GridObj3.SetColFix('AVG'); 
			 			
		}
		
	});   

}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       doQuery();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch2(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       //doQuery2();
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

}
      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
	//alert("00");
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var export_flag = document.frm.export_flag.value;
	

	//Simulation 橾 唳辦 simul_data в熱
	if(week_flag == "plan") {
		GridObj.SetParam("mode", "search_plan");
	}else{
		GridObj.SetParam("mode", "search");
	}
	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	//GridObj.SetParam("mode", "search3");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("week_flag", week_flag);
	GridObj.SetParam("simul_data", simul_data);
	GridObj.SetParam("export_flag", export_flag);
	   
	GridObj.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2() 
{
	//alert("11");
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//	GridObj2 = document.WiseGrid2;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;


	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("week_flag", week_flag);
	GridObj2.SetParam("simul_data", simul_data);
	   
	GridObj2.DoQuery(servlet_url);
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery3() 
{
	//alert(22);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//	GridObj2 = document.WiseGrid2;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;


	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("week_flag", week_flag);
	GridObj3.SetParam("simul_data", simul_data);
	   
	GridObj3.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery4() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//	GridObj2 = document.WiseGrid2;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value; 
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;


	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 ) 
	GridObj4.SetParam("mode", "search4");
	GridObj4.SetParam("item_id", item_id);
	GridObj4.SetParam("week_flag", week_flag); 
	GridObj4.SetParam("simul_data", simul_data);
	   
	GridObj4.DoQuery(servlet_url);
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

                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	cal_dw1()
	GridObj.SetCellBgColor('GUBN',   2, color_edit_col);
	GridObj.SetCellBgColor('DAY_00', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_01', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_02', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_03', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_04', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_05', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_06', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_07', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_08', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_09', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_10', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_11', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_12', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_13', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_14', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_15', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_16', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_17', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_18', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_19', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_20', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_21', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_22', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_23', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_24', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_25', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_26', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_27', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_28', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_29', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_30', 2, color_edit_col);

	GridObj.SetCellBgColor('DAY_31', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_32', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_33', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_34', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_35', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_36', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_37', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_38', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_39', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_40', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_41', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_42', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_43', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_44', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_45', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_46', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_47', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_48', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_49', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_50', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_51', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_52', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_53', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_54', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_55', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_56', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_57', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_58', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_59', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_60', 2, color_edit_col);

	
	GridObj.SetCellBgColor('GUBN',   3, color_edit_col);
	GridObj.SetCellBgColor('DAY_00', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_01', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_02', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_03', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_04', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_05', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_06', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_07', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_08', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_09', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_10', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_11', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_12', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_13', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_14', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_15', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_16', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_17', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_18', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_19', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_20', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_21', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_22', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_23', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_24', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_25', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_26', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_27', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_28', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_29', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_30', 3, color_edit_col);
	
	GridObj.SetCellBgColor('DAY_31', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_32', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_33', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_34', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_35', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_36', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_37', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_38', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_39', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_40', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_41', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_42', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_43', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_44', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_45', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_46', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_47', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_48', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_49', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_50', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_51', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_52', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_53', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_54', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_55', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_56', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_57', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_58', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_59', 3, color_edit_col);
	GridObj.SetCellBgColor('DAY_60', 3, color_edit_col);	
	

		
	doQuery2();
	doQuery3();
	//doQuery4();  
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery_plan()  //っ衙啗�� 褻�蜇� main grid 
{
    var endMode = GridObj.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search_plan") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	cal_dw1()
	GridObj.SetCellBgColor('DAY_00', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_01', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_02', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_03', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_04', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_05', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_06', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_07', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_08', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_09', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_10', 2, color_edit_col);
	
	doQuery2();
	doQuery3();
	//doQuery4();
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery2() 
{
//alert("GridEndQuery2");
    var endMode = GridObj2.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search2") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj2.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj2.GetMessage(); 
            alert(error_msg);            
		}
    }
	paintLineGraph2();

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery3() 
{
//alert("GridEndQuery2");
    var endMode = GridObj3.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search3") //褻�萼� 諫猿脹 唳辦
    {

        if(GridObj3.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj3.GetMessage(); 
            alert(error_msg);            
		}
    }

	if(GridObj3.GetRowCount() > 0) GridObj3.SetCellFocus('DAY_30', 0, false);

	paintLineGraph2();

}


function test111(){
	GridObj3.SetRowScroll(0);
	GridObj3.MoveRow(0);
	GridObj3.SetCellFocus('DAY_55', 0, true);
	GridObj3.SetCellFocus('DAY_30', 0, true);
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery4() 
{
//alert("GridEndQuery4");
    var endMode = GridObj4.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search4") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj4.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj4.GetMessage(); 
            alert(error_msg);            
		}
    }
	//cal_dw1()
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	if(nRow == '0' || nRow == '1'|| nRow == '5'|| nRow == '6' ){
		//alert("晦蟾營堅朝 熱薑檜 碳陛棟м棲棻");
		alert("п渡 蠔歲擎 熱薑й熱 橈蝗棲棻.");
		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	
	cal_dw1()	
	
}

function GridCellClick(strColumnKey, nRow) {
/*
	var item_id = document.frm.item_id.value;
	var item_name = document.frm.item_name.value;

	var gubnName = GridObj.GetCellValueIndex(0,nRow);
	var y_legend = 'BOX'
	if(gubnName =="陛辨橾熱" || gubnName =="營堅橾熱") {
		y_legend = 'DAY'
	}
		
	gubnName = gubnName.replace(/\+/g,"" + 'ㄚ'); // 橾奩瞳檣 + 晦�ㄣ� ル衛腎雖 彊戲嘎煎 晦�ˋ□� 'ㄚ' 陛螳褥

	var title = '('+gubnName+') '+item_id + ' / ' + item_name;	

	var x_legend = 'DATE'
	
	var headerCol = "";
	var dataCol = "";
	var maxValue = 0;
	var rowCnt = GridObj.GetRowCount();
	if(rowCnt > 0){		
		for(var i=0 ; i < 21 ; i++){  
			
			if(i==0){
				headerCol = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+1)));
				dataCol = GridObj.GetCellValueIndex(Number(i+1),nRow);
			}
			else {
				headerCol = headerCol + ','+ GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+1)));
				dataCol = dataCol + ','+ GridObj.GetCellValueIndex(Number(i+1),nRow);
			}				
			var colValue = Number(GridObj.GetCellValueIndex(Number(i+1),nRow));			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
		}
		paintLineGraph(gubnName, title, y_legend, x_legend, headerCol, dataCol, maxValue);
	}
*/ 
}

function CellClick_DW2(strColumnKey, nRow) {

	paintLineGraph2();
}

function CellClick_DW3(strColumnKey, nRow) {

	paintLineGraph2();
}

function paintLineGraph(gubnName, title, y_legend, x_legend, headerCol, dataCol, maxValue) {
	
	var project = document.frm.project.value;
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "300", "9", "#FFFFFF");                 
    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 14;}");
    so.addVariable("bg_colour","#FFFFFF");
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY謝ル 頂 寥斜塭遴萄 儀梃
	so.addVariable("y_legend",y_legend+",12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");

	//so.addVariable("line_dot","2,#CC3399," + "瞪喇翕橾 ▽1Month" + ",12,5");			
	so.addVariable("line_dot","2,#CC3399," + gubnName + ",12,5");

	valuesId = "values";
//	linksId = "links";
	so.addVariable(valuesId,dataCol);
//	so.addVariable(linksId,linkString);	


	headerCol = headerCol.replace(/錯/g,"Mon");
	headerCol = headerCol.replace(/��/g,"Tue");
	headerCol = headerCol.replace(/熱/g,"Wed");
	headerCol = headerCol.replace(/跡/g,"Thu");
	headerCol = headerCol.replace(/旎/g,"Fri");
	headerCol = headerCol.replace(/饜/g,"Sat");
	headerCol = headerCol.replace(/橾/g,"Sun");

    so.addVariable("x_labels",headerCol);
	so.addVariable("x_label_style","9,#000000,2"); 
	so.addVariable("x_legend",x_legend+",12,0x736AFF");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(maxValue));                              
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );						 
    so.write(document.getElementById('my_chart'));
    
}

function paintLineGraph2_All() {
	
	var item_id = document.frm.item_id.value;
	var item_name = document.frm.item_name.value;

	var project = document.frm.project.value;
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "300", "9", "#FFFFFF");                 
	var title = item_id + ' / ' + item_name;	
	var y_legend = 'BOX'
	var x_legend = 'DATE'

	var colValue = 0;
	var header_day = "";
	var headerCol = "";
	var headerCol_tmp = "";
	var dataCol = "";
	
	var dataCol_W1 = "";
	var dayCnt_W1 = 0;
	var mean_W1 = 0;
	var sum_W1 = 0;
	var first_W1 = 0;

	var dataCol_G1 = "";
	var first_G1 = 0;
	var save_month = "";
	var cmp_month = "";
	
	var maxValue = 0;
	var rowCnt = GridObj3.GetRowCount();
	if(rowCnt > 0) var gubnName = GridObj3.GetCellValueIndex(0,0)+' ▽1Month';
	var first = 0;
	if(rowCnt > 0){
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj3.GetCellValueIndex(Number(i+2),0));
		
			header_day = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
			cmp_month = header_day.substr(0,2);
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 輿除欽嬪 ゎ敕 斜楚Щ 掘ж晦 嬪и 睡碟
			// 錯蹂橾睡攪 橾濠蒂 渦п除棻. 橾蹂橾擊 虜釭賊 蟾晦��, っ衙熱榆 < 0檜賊 薯諼
			// 輿ゎ敕= っ衙熱榆/陳瞼偎熱
			// dataCol_W1 = 輿ゎ敕,輿ゎ敕,輿ゎ敕,輿ゎ敕,... --> 陳瞼偎熱虜躑 虜萇棻
			if(header_day == '橾' || i == 60){
				if (i == 60 && colValue > 0){
					sum_W1 = sum_W1 + colValue;
					dayCnt_W1++;
				}
				if(dayCnt_W1 > 0) {			
					mean_W1 = Math.round(sum_W1 / dayCnt_W1,0);
					for(var s=0; s<dayCnt_W1; s++) {
						if(first_W1 == 0) {
							dataCol_W1 = mean_W1;
							first_W1 = 1;
						}
						else {
							dataCol_W1 = dataCol_W1 + ',' + mean_W1;
						}
					}
				}
				dayCnt_W1 = 0;
				mean_W1 = 0;
				sum_W1 = 0;
			}
			else {
				if(colValue > 0) {
					sum_W1 = sum_W1 + colValue;
				}
			}

			// 橾蹂橾, 0 橾濠 薯剪
			if(colValue <= 0 || header_day == '橾') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}
			
			dayCnt_W1++;

			// 檜ж朝 錯 掘碟 虞渠蒂 ル衛ж晦 嬪и 睡碟檜棻.
			if(first_G1 == 0) { 
				first_G1 = 1;
				dataCol_G1 = '0';
				save_month = cmp_month;
			}
			else if(cmp_month != save_month){
				dataCol_G1 = dataCol_G1 + ',X';
				save_month = cmp_month;
			}
			else {
				dataCol_G1 = dataCol_G1 + ',0';			
			}
			
			first++; 
			if(first==1){
				headerCol = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
				dataCol = GridObj3.GetCellValueIndex(Number(i+2),0);
				//dataCol = dataCol_temp;
			}
			else {
				headerCol = headerCol + ','+ GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
				dataCol = dataCol + ','+ GridObj3.GetCellValueIndex(Number(i+2),0);
				//dataCol = dataCol + ','+ dataCol_temp;
			}		
		}
	
		so.addVariable("line_dot","2,#CC3399," + gubnName + ",12,5");
		valuesId = "values";
		so.addVariable(valuesId,dataCol);
	}
	
	var dataCol_W2 = "";
	var dayCnt_W2 = 0;
	var mean_W2 = 0;
	var sum_W2 = 0;
	var first_W2 = 0;

	var dataCol_2 = "";
	var dataCol_W2 = "";
	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();
	var first_2 = 0;
	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 31 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");

			// 輿除欽嬪 ゎ敕 斜楚Щ 掘ж晦 嬪и 睡碟
			// 錯蹂橾睡攪 橾濠蒂 渦п除棻. 橾蹂橾擊 虜釭賊 蟾晦��, っ衙熱榆 < 0檜賊 薯諼
			// 輿ゎ敕= っ衙熱榆/陳瞼偎熱
			// dataCol_W2 = 輿ゎ敕,輿ゎ敕,輿ゎ敕,輿ゎ敕,... --> 陳瞼偎熱虜躑 虜萇棻
			if(header_day == '橾' || i == 30){
				
				if (i == 30 && colValue > 0){
					sum_W2 = sum_W2 + colValue;
					dayCnt_W2++;
				}
				if(dayCnt_W2 > 0) {			
					mean_W2 = Math.round(sum_W2 / dayCnt_W2,0);
					for(var s=0; s<dayCnt_W2; s++) {
						if(first_W2 == 0) {
							dataCol_W2 = mean_W2;
							first_W2 = 1;
						}
						else {
							dataCol_W2 = dataCol_W2 + ',' + mean_W2;
						}
					}
				}
				dayCnt_W2 = 0;
				mean_W2 = 0;
				sum_W2 = 0;
			}
			else {
				if(colValue > 0) {
					sum_W2 = sum_W2 + colValue;
					
				}
			}
			
			// 橾蹂橾, 0 橾濠 薯剪
			if(colValue <= 0 || header_day == '橾') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			
			dayCnt_W2++;
			first_2++;
			if(first_2==1){
				if(rowCnt == 0) headerCol = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
				dataCol_2 = GridObj2.GetCellValueIndex(Number(i+2),0);
			}
			else {
				if(rowCnt == 0) headerCol = headerCol + ','+ GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
				dataCol_2 = dataCol_2 + ','+ GridObj2.GetCellValueIndex(Number(i+2),0);
			}				
		}

		if(rowCnt == 0) { // 1廓 斜楚Щ陛 橈朝 唳辦!!!!
				so.addVariable("line_dot","2,#CC3399," + gubnName_2 + ",12,5");
				valuesId = "values";
				so.addVariable(valuesId,dataCol_2);
		}
		else {
			so.addVariable("line_dot_2", "2,#468024," + gubnName_2 + ",12,5");			
			valuesId_2 = "values_2";
			so.addVariable(valuesId_2,dataCol_2);
		}		
	}

	so.addVariable("line_3", "2,#EE82EE," + "瞪喇翕橾 輿ゎ敕" + ",12,5");			
	var valuesId_3 = "values_3";
	so.addVariable(valuesId_3,dataCol_W1);

	so.addVariable("line_4", "2,#6DD66D," + "婁剪30橾 輿ゎ敕" + ",12,5");			
	var valuesId_4 = "values_4";
	so.addVariable(valuesId_4,dataCol_W2);

	// X高擊 譆渠高戲煎 纂�納媮奡�.
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_5", "20,#00BBFF,"+"錯掘碟"+",12");			
	var valuesId_5 = "values_5";
	so.addVariable(valuesId_5,dataCol_G1);

    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 14;}");
    so.addVariable("bg_colour","#FFFFFF");
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY謝ル 頂 寥斜塭遴萄 儀梃
	so.addVariable("y_legend",y_legend+",12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");

	headerCol = headerCol.replace(/錯/g,"Mon");
	headerCol = headerCol.replace(/��/g,"Tue");
	headerCol = headerCol.replace(/熱/g,"Wed");
	headerCol = headerCol.replace(/跡/g,"Thu");
	headerCol = headerCol.replace(/旎/g,"Fri");
	headerCol = headerCol.replace(/饜/g,"Sat");
	headerCol = headerCol.replace(/橾/g,"Sun");

	headerCol = headerCol.replace(/\(/g,"");
	headerCol = headerCol.replace(/\)/g,"");
	headerCol = headerCol.replace(/Mon/g,"");
	headerCol = headerCol.replace(/Tue/g,"");
	headerCol = headerCol.replace(/Wed/g,"");
	headerCol = headerCol.replace(/Thu/g,"");
	headerCol = headerCol.replace(/Fri/g,"");
	headerCol = headerCol.replace(/Sat/g,"");
	headerCol = headerCol.replace(/Sun/g,"");

    so.addVariable("x_labels",headerCol);
	so.addVariable("x_label_style","9,#000000,2"); 
	so.addVariable("x_legend",x_legend+",12,0x736AFF");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(maxValue));                              
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );						 
    so.write(document.getElementById('my_chart'));
    
}

function paintLineGraph2() {
	
	var item_id = document.frm.item_id.value;
	var item_name = document.frm.item_name.value;
	
	var project = document.frm.project.value;
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "300", "9", "#FFFFFF");                 
	var title = item_id + ' / ' + item_name;	
	var y_legend = 'BOX'
	var x_legend = 'DATE'

	var colValue = 0;
	var header_day = "";
	var headerCol = "";
	var headerCol_tmp = "";
	var dataCol = "";
	var dataCol_temp = "";
	var maxValue = 0;
	
	var dataCol_G1 = "";
	var first_G1 = 0;
	var save_month = "";
	var cmp_month = "";
	
	var rowCnt = GridObj3.GetRowCount();
	if(rowCnt > 0) var gubnName = GridObj3.GetCellValueIndex(0,0)+' ▽1Month';
	var first = 0;
	if(rowCnt > 0){
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj3.GetCellValueIndex(Number(i+2),0));
		
			header_day = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
			cmp_month = header_day.substr(0,2);
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 橾蹂橾, 0 橾濠 薯剪
			//if(colValue <= 0 || header_day == '橾') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}
			
			// 檜ж朝 錯 掘碟 虞渠蒂 ル衛ж晦 嬪и 睡碟檜棻.
			if(first_G1 == 0) { 
				first_G1 = 1;
				dataCol_G1 = '0';
				save_month = cmp_month;
			}
			else if(cmp_month != save_month){
				dataCol_G1 = dataCol_G1 + ',X';
				save_month = cmp_month;
			}
			else {
				dataCol_G1 = dataCol_G1 + ',0';			
			}
		
			first++; 
			if(first==1){
				headerCol = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
				dataCol = GridObj3.GetCellValueIndex(Number(i+2),0);
				//dataCol = dataCol_temp;
			}
			else {
				headerCol = headerCol + ','+ GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
				dataCol = dataCol + ','+ GridObj3.GetCellValueIndex(Number(i+2),0);
				//dataCol = dataCol + ','+ dataCol_temp;
			}		
		}
	
		so.addVariable("line_dot","2,#CC3399," + gubnName + ",12,5");
		valuesId = "values";
		so.addVariable(valuesId,dataCol);
	}
	var dataCol_2 = "";
	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();
	var first_2 = 0;
	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 31 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 橾蹂橾, 0 橾濠 薯剪
			//if(colValue <= 0 || header_day == '橾') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			first_2++;
			if(first_2==1){
				if(rowCnt == 0) headerCol = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
				dataCol_2 = GridObj2.GetCellValueIndex(Number(i+2),0);
			}
			else {
				if(rowCnt == 0) headerCol = headerCol + ','+ GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
				dataCol_2 = dataCol_2 + ','+ GridObj2.GetCellValueIndex(Number(i+2),0);
			}				
		}

		if(rowCnt == 0) { // 1廓 斜楚Щ陛 橈朝 唳辦!!!!
				so.addVariable("line_dot","2,#CC3399," + gubnName_2 + ",12,5");
				valuesId = "values";
				so.addVariable(valuesId,dataCol_2);
		}
		else {
			so.addVariable("line_dot_2", "2,#468024," + gubnName_2 + ",12,5");			
			valuesId_2 = "values_2";
			so.addVariable(valuesId_2,dataCol_2);
		}		
	}
	// X高擊 譆渠高戲煎 纂�納媮奡�.
	
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_3", "20,#00BBFF,"+"錯掘碟"+",12");			
	var valuesId_5 = "values_3";	
	so.addVariable(valuesId_5,dataCol_G1);

    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 14;}");
    so.addVariable("bg_colour","#FFFFFF");
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY謝ル 頂 寥斜塭遴萄 儀梃
	so.addVariable("y_legend",y_legend+",12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");

	headerCol = headerCol.replace(/錯/g,"Mon");
	headerCol = headerCol.replace(/��/g,"Tue");
	headerCol = headerCol.replace(/熱/g,"Wed");
	headerCol = headerCol.replace(/跡/g,"Thu");
	headerCol = headerCol.replace(/旎/g,"Fri");
	headerCol = headerCol.replace(/饜/g,"Sat");
	headerCol = headerCol.replace(/橾/g,"Sun");

	headerCol = headerCol.replace(/\(/g,"");
	headerCol = headerCol.replace(/\)/g,"");
	headerCol = headerCol.replace(/Mon/g,"");
	headerCol = headerCol.replace(/Tue/g,"");
	headerCol = headerCol.replace(/Wed/g,"");
	headerCol = headerCol.replace(/Thu/g,"");
	headerCol = headerCol.replace(/Fri/g,"");
	headerCol = headerCol.replace(/Sat/g,"");
	headerCol = headerCol.replace(/Sun/g,"");

    so.addVariable("x_labels",headerCol);
	so.addVariable("x_label_style","9,#000000,2"); 
	so.addVariable("x_legend",x_legend+",12,0x736AFF");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(maxValue));                              
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );						 
    so.write(document.getElementById('my_chart'));
    
}

function paintLineGraph2_Week() {
	
	var item_id = document.frm.item_id.value;
	var item_name = document.frm.item_name.value;

	var project = document.frm.project.value;
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "300", "9", "#FFFFFF");                 
	var title = item_id + ' / ' + item_name;	
	var y_legend = 'BOX'
	var x_legend = 'DATE'

	var colValue = 0;
	var header_day = "";
	var headerCol = "";
	var dataCol = "";
	
	var dataCol_W1 = "";
	var dayCnt_W1 = 0;
	var mean_W1 = 0;
	var sum_W1 = 0;
	var first_W1 = 0;

	var dataCol_G1 = "";
	var first_G1 = 0;
	var save_month = "";
	var cmp_month = "";
	
	var maxValue = 0;
	var rowCnt = GridObj3.GetRowCount();
	if(rowCnt > 0){
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj3.GetCellValueIndex(Number(i+2),0));
		
			header_day = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
			cmp_month = header_day.substr(0,2);
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 輿除欽嬪 ゎ敕 斜楚Щ 掘ж晦 嬪и 睡碟
			// 錯蹂橾睡攪 橾濠蒂 渦п除棻. 橾蹂橾擊 虜釭賊 蟾晦��, っ衙熱榆 < 0檜賊 薯諼
			// 輿ゎ敕= っ衙熱榆/陳瞼偎熱
			// dataCol_W1 = 輿ゎ敕,輿ゎ敕,輿ゎ敕,輿ゎ敕,... --> 陳瞼偎熱虜躑 虜萇棻
			if(header_day == '橾' || i == 60){
				if (i == 60 && colValue > 0){
					sum_W1 = sum_W1 + colValue;
					dayCnt_W1++;
				}
				if(dayCnt_W1 > 0) {			
					mean_W1 = Math.round(sum_W1 / dayCnt_W1,0);
					for(var s=0; s<dayCnt_W1; s++) {
						if(first_W1 == 0) {
							dataCol_W1 = mean_W1;
							first_W1 = 1;
						}
						else {
							dataCol_W1 = dataCol_W1 + ',' + mean_W1;
						}
					}
				}
				dayCnt_W1 = 0;
				mean_W1 = 0;
				sum_W1 = 0;
			}
			else {
				if(colValue > 0) {
					sum_W1 = sum_W1 + colValue;
				}
			}

			// 橾蹂橾, 0 橾濠 薯剪
			if(colValue <= 0 || header_day == '橾') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}
			
			dayCnt_W1++;

			// 檜ж朝 錯 掘碟 虞渠蒂 ル衛ж晦 嬪и 睡碟檜棻.
			if(first_G1 == 0) { 
				first_G1 = 1;
				dataCol_G1 = '0';
				headerCol = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
				save_month = cmp_month;
			}
			else if(cmp_month != save_month){
				dataCol_G1 = dataCol_G1 + ',X';
				headerCol = headerCol + ','+ GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
				save_month = cmp_month;
			}
			else {
				dataCol_G1 = dataCol_G1 + ',0';			
				headerCol = headerCol + ','+ GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
			}
		}
	}
	
	var dataCol_W2 = "";
	var dayCnt_W2 = 0;
	var mean_W2 = 0;
	var sum_W2 = 0;
	var first_W2 = 0;

	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();

	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 31 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");

			// 輿除欽嬪 ゎ敕 斜楚Щ 掘ж晦 嬪и 睡碟
			// 錯蹂橾睡攪 橾濠蒂 渦п除棻. 橾蹂橾擊 虜釭賊 蟾晦��, っ衙熱榆 < 0檜賊 薯諼
			// 輿ゎ敕= っ衙熱榆/陳瞼偎熱
			// dataCol_W2 = 輿ゎ敕,輿ゎ敕,輿ゎ敕,輿ゎ敕,... --> 陳瞼偎熱虜躑 虜萇棻
			if(header_day == '橾' || i == 30){
				
				if (i == 30 && colValue > 0){
					sum_W2 = sum_W2 + colValue;
					dayCnt_W2++;
				}
				if(dayCnt_W2 > 0) {			
					mean_W2 = Math.round(sum_W2 / dayCnt_W2,0);
					for(var s=0; s<dayCnt_W2; s++) {
						if(first_W2 == 0) {
							dataCol_W2 = mean_W2;
							first_W2 = 1;
						}
						else {
							dataCol_W2 = dataCol_W2 + ',' + mean_W2;
						}
					}
				}
				dayCnt_W2 = 0;
				mean_W2 = 0;
				sum_W2 = 0;
			}
			else {
				if(colValue > 0) {
					sum_W2 = sum_W2 + colValue;
					
				}
			}
			
			// 橾蹂橾, 0 橾濠 薯剪
			if(colValue <= 0 || header_day == '橾') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			
			dayCnt_W2++;
		}
	}

	so.addVariable("line", "2,#CC3399," + "瞪喇翕橾 輿ゎ敕" + ",12,5");			
	var valuesId_3 = "values";
	so.addVariable(valuesId_3,dataCol_W1);

	so.addVariable("line_2", "2,#468024," + "婁剪30橾 輿ゎ敕" + ",12,5");			
	var valuesId_4 = "values_2";
	so.addVariable(valuesId_4,dataCol_W2);

	// X高擊 譆渠高戲煎 纂�納媮奡�.
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_3", "20,#00BBFF,"+"錯掘碟"+",12");			
	var valuesId_5 = "values_3";
	so.addVariable(valuesId_5,dataCol_G1);

    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 14;}");
    so.addVariable("bg_colour","#FFFFFF");
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY謝ル 頂 寥斜塭遴萄 儀梃
	so.addVariable("y_legend",y_legend+",12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");

	headerCol = headerCol.replace(/錯/g,"Mon");
	headerCol = headerCol.replace(/��/g,"Tue");
	headerCol = headerCol.replace(/熱/g,"Wed");
	headerCol = headerCol.replace(/跡/g,"Thu");
	headerCol = headerCol.replace(/旎/g,"Fri");
	headerCol = headerCol.replace(/饜/g,"Sat");
	headerCol = headerCol.replace(/橾/g,"Sun");

	headerCol = headerCol.replace(/\(/g,"");
	headerCol = headerCol.replace(/\)/g,"");
	headerCol = headerCol.replace(/Mon/g,"");
	headerCol = headerCol.replace(/Tue/g,"");
	headerCol = headerCol.replace(/Wed/g,"");
	headerCol = headerCol.replace(/Thu/g,"");
	headerCol = headerCol.replace(/Fri/g,"");
	headerCol = headerCol.replace(/Sat/g,"");
	headerCol = headerCol.replace(/Sun/g,"");

    so.addVariable("x_labels",headerCol);
	so.addVariable("x_label_style","9,#000000,2"); 
	so.addVariable("x_legend",x_legend+",12,0x736AFF");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(maxValue));                              
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );						 
    so.write(document.getElementById('my_chart'));
    
}

function paintLineGraph3() {
	
	var item_id = document.frm.item_id.value;
	var item_name = document.frm.item_name.value;

	var project = document.frm.project.value;
	var so = new SWFObject(project+"/sinc/template/basic/swf/actionscript/open-flash-chart.swf", "ofc", "100%", "300", "9", "#FFFFFF");                 
	
	var title = item_id + ' / ' + item_name;	
	var y_legend = 'BOX'
	var x_legend = 'DATE'
	
	var headerCol = "";
	var dataCol = "";
	var maxValue = 0;
	var nRow = 0;
	var vColor = "";
	
	for(var k=0 ; k < 5 ; k++){  	
		if(k == 0) {
			nRow = 0;
			vColor = '#CC3399';
			valuesId = "values";
		}
		else if(k == 1) {
			nRow = 2;
			vColor = '#468024';
			valuesId = "values_2";
		}
		else if(k == 2) {
			nRow = 3;
			vColor = '#00BBFF';
			valuesId = "values_3";
		}
		else if(k == 3) {
			nRow = 4;
			vColor = '#0000FF';
			valuesId = "values_4";
		}
		else {
			nRow = 5;
			vColor = '#FFFF00';
			valuesId = "values_5";
		}

		for(var i=0 ; i < 21 ; i++){  
			
			if(i==0){
				headerCol = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+1)));
				dataCol = GridObj.GetCellValueIndex(Number(i+1),nRow);
			}
			else {
				headerCol = headerCol + ','+ GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+1)));
				dataCol = dataCol + ','+ GridObj.GetCellValueIndex(Number(i+1),nRow);
			}				
			var colValue = Number(GridObj.GetCellValueIndex(Number(i+1),nRow));			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
		}
		var gubnName = GridObj.GetCellValueIndex(0,nRow);
		gubnName = gubnName.replace(/\+/g,"" + 'ㄚ'); // 橾奩瞳檣 + 晦�ㄣ� ル衛腎雖 彊戲嘎煎 晦�ˋ□� 'ㄚ' 陛螳褥
		if(k==0)	so.addVariable("line_dot","2,"+ vColor+"," + gubnName + ",12,5");
		else {
			so.addVariable("line_dot_"+Number(k+1),"2,"+ vColor+"," + gubnName + ",12,5");
		}
		so.addVariable(valuesId,dataCol);

	}
	
    so.addVariable("variables","true");
    so.addVariable("title",title+",{font-size: 14;}");
    so.addVariable("bg_colour","#FFFFFF");
    so.addVariable("inner_background","#E3F0FD,#FFFFFF,90");      //XY謝ル 頂 寥斜塭遴萄 儀梃
	so.addVariable("y_legend",y_legend+",12,0x736AFF");
    so.addVariable("y_ticks","5,10,4");

	headerCol = headerCol.replace(/錯/g,"Mon");
	headerCol = headerCol.replace(/��/g,"Tue");
	headerCol = headerCol.replace(/熱/g,"Wed");
	headerCol = headerCol.replace(/跡/g,"Thu");
	headerCol = headerCol.replace(/旎/g,"Fri");
	headerCol = headerCol.replace(/饜/g,"Sat");
	headerCol = headerCol.replace(/橾/g,"Sun");

    so.addVariable("x_labels",headerCol);
	so.addVariable("x_label_style","9,#000000,2"); 
	so.addVariable("x_legend",x_legend+",12,0x736AFF");
	so.addVariable("x_axis_steps","1");
    so.addVariable("y_max",String(maxValue));                              
    so.addParam("allowScriptAccess", "always" );//"sameDomain"); 
    //  so.addParam("onmouseout", "onrollout();" );						 
    so.write(document.getElementById('my_chart'));
    
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 瞪偃薯堅 翱骯
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function cal_dw1() {
	
		
	var	hd_name;
	var start_idx	= 0;
	var last_idx	= 6;
	
	var base_stock	= 0; //晦蟾營堅
	var chgo_qty	= 0; //っ衙ゎ敕
	var ipgo_qty	= 0; //輿除殮堅榆
	
	var stock_dqy	= 0; //營堅橾熱
	var next_stock;
	
	//var gy_base_stock	= 0; // 陛辨晦蟾營堅
	//var gy_stock_day	= 0; // 陛辨 營堅橾熱	
	//var gy_next_stock;
	
	var start_hd_name = 'DAY_00';
	
	hd_name = start_hd_name;
	hd_name_1 = start_hd_name.substr(0,5);
	hd_name_2 = start_hd_name.substr(5,6);

// 婪�ㄣ� 蘭葬熱ч衛 牖憮
// 1 晦蟾營堅 -> 1 晦蟾營堅
// 2 營堅輿熱 -> 2 營堅橾熱
// 3 っ衙ゎ敕 -> 3 3輿+1輿
// 4 輿除殮堅榆 -> 4 輿除殮堅榆



		base_stock	= Number(GridObj.GetCellValue(start_hd_name, 0)); // 錳楚 0
		chgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 2)); // 錳楚 2
		ipgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 3)); // 錳楚 3
		//gy_ipgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 1)); // 錳楚 4
		
		if(chgo_qty == 0){
			stock_dqy	= 99999;
		}else{
			stock_dqy	= Math.round((base_stock/chgo_qty)*10)/10;
		}
		
		
		next_stock	= Math.round(base_stock - chgo_qty + ipgo_qty);
		
		//陛辨營堅 瞪偃..
		//gy_base_stock = Number(GridObj.GetCellValue(start_hd_name, 4)); // 錳楚 0
		//GridObj.SetCellValue(hd_name, 0,  gy_base_stock); // 錳楚 5
		
//		if(chgo_qty == 0){
//			gy_stock_dqy	= 99999;
//		}else{
//			gy_stock_dqy	= Math.round((gy_base_stock/chgo_qty)*10)/10;
//		}
//		
//		gy_next_stock	= Math.round(gy_base_stock - chgo_qty + ipgo_qty);
//		

	for (i=0; i < 61 ; i++) {

		GridObj.SetCellValue(hd_name, 1,  stock_dqy); // 錳楚 1
		//GridObj.SetCellValue(hd_name, 1,  gy_stock_dqy); // 錳楚 6
		
		hd_name_2 = Number(hd_name_2)+Number(1);

		if(i == 9){
			hd_name_1 =hd_name_1.substr(0,4);
		}else{

		}
		
		hd_name = hd_name_1+hd_name_2;

		if(i == 60){  // 葆雖虞  翮擎 棻擊 陳檜 橈戲棲 瑞Щ蒂 謙猿 衛鑑棻. 
			return; 
		}
		GridObj.SetCellValue(hd_name, 0,  next_stock);					// 錳楚 0
		//GridObj.SetCellValue(hd_name, 0,  gy_next_stock); //陛辨營堅榆	// 錳楚 5

		base_stock	= Number(GridObj.GetCellValue(hd_name, 0));	// 錳楚 0
		chgo_qty	= Number(GridObj.GetCellValue(hd_name, 2));	// 錳楚 2
		ipgo_qty	= Number(GridObj.GetCellValue(hd_name, 3));	// 錳楚 3
		
		//gy_base_stock	= Number(GridObj.GetCellValue(hd_name, 0)); // 錳楚 5
		//gy_ipgo_qty		= Number(GridObj.GetCellValue(hd_name, 3)); // 錳楚 4
		
		


		
		if(chgo_qty == 0){  // 轎堅 熱榆檜 0 橾檣 陳瞼朝 �瓿狨抴�!!!
			stock_dqy	= 0;
			//gy_stock_dqy= 0;			
		}else{
			stock_dqy	= Math.round((base_stock/chgo_qty)*10)/10;
			//gy_stock_dqy= Math.round((gy_base_stock/chgo_qty)*10)/10;
		}
		
		//alert("base_stock="+base_stock);
		//alert("chgo_qty="+chgo_qty);

		next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
		//gy_next_stock	= Math.round(gy_base_stock - chgo_qty + ipgo_qty);
		
 
	}


}		

function enterCheck(){
	
	var key = event.keyCode;
	// TAB(9) or ENTER(13)
	if(event.keyCode == "13" ) {
		refresh("simul");		
	}else{
		
	}

}




// 渦綰 贗葛 : 鼻撮 で機 營褻�� - 3輿ゎ敕,1輿ゎ敕,3+1輿ゎ敕/2
function refresh(week_flag) {
	
	var item_id = document.frm.item_id.value;
	var	item_name = document.frm.item_name.value;
	var simul_data = document.frm.simul_data.value;
	var week_flag	= week_flag;

	//Simulation 橾 唳辦 simul_data в熱
	if(week_flag == "simul") {
		if( simul_data == "" || simul_data == null || simul_data == "0") {
			alert("Simulation曖 高擊 殮溘п輿褊衛蹂!"); 
			document.frm.simul_data.select();
			return;
		}
	}
	
	var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_hawa_new";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag + "&simul_data=" + simul_data;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
	//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();
	
}


function sel_data_sum(obj){
	
	document.frm.totalSum.value = "0";
	
	var sel_data = GridObj.GetSelectedCells(); //
	var i=0;
	var rowNo=0;
	

	var gubn;

	/*  */
	var hd_name	= sel_data.split(",")[i*2+0];
	var rowNo   = sel_data.split(",")[i*2+1];
    

	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 
			return;
		else {
				var hd_name	= sel_data.split(",")[i*2+0];
				var rowNo   = sel_data.split(",")[i*2+1];
		    			    
			    var sum     = Number(document.frm.totalSum.value);
			    var value   = Number(GridObj.GetCellValue(hd_name, rowNo));
		    	    
				if(GridObj.GetCellValue(hd_name, rowNo)=="GUBN"){	
					alert(" ");
					return;
				}
				else{
				document.frm.totalSum.value = sum + value;    
				}
		}
		i++;
	}	
	

}