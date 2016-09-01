//## Щ煎斜極ID		:	ip_01090_longTermSupplyCheck.js
//## Щ煎斜極貲		:	奢晝瞳м撩 餌瞪碟戮 pop_up
//## 偃嫦濠          :	掏辨雙 
//## 偃嫦橾濠       	:	2009-07-16
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  陴錠辨      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01090_longTermSupplyCheck';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2 ; 													// WiseGrid 偌羹
var GridObj3 ; 													// WiseGrid 偌羹
var GridObj4 ; 													// WiseGrid 偌羹
var GridObj5 ; 													// WiseGrid 偌羹
var GridObj6 ; 													// WiseGrid 偌羹

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
        document.WiseGrid.height = tableHeightValue + "px"; 
        
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
}


function init5() { 
	GridObj5 = document.WiseGrid5;
	setProperty(GridObj5);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader5(GridObj5);  	//п渦儅撩 
	setDefault5();        	//�飛� 晦獄 撲薑
}

function init6() { 
	GridObj6 = document.WiseGrid6;
	setProperty(GridObj6);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader6(GridObj6);  	//п渦儅撩 
	setDefault6();        	//�飛� 晦獄 撲薑
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

    GridObj.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '蜈擎 堅蛐';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 1; 
    
    GridObj.bStatusbarVisible = true;				// status bar visible 鼻鷓夥 撲薑 
 
}

function setDefault2() { 

    GridObj2.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj2.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj2.strSelectedCellFgColor = '0|0|0'; 
	GridObj2.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   

	// Header Font Setting
	GridObj2.strHDFontName = '蜈擎 堅蛐';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines = 1; 
    
    GridObj2.bStatusbarVisible = true;				// status bar visible 鼻鷓夥 撲薑 
 
}
function setDefault3() { 

    GridObj3.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj3.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj3.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj3.strSelectedCellFgColor = '0|0|0'; 
	GridObj3.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   

	// Header Font Setting
	GridObj3.strHDFontName = '蜈擎 堅蛐';
	GridObj3.nHDFontSize = 9;				  	// Font Size 9
	GridObj3.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj3.nHDLines = 1; 
    
    GridObj3.bStatusbarVisible = true;				// status bar visible 鼻鷓夥 撲薑 
 
}

function setDefault4() { 

	GridObj4.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj4.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj4.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj4.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj4.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj4.strSelectedCellFgColor = '0|0|0'; 
	GridObj4.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   
    GridObj4.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 

	// Header Font Setting
	GridObj4.strHDFontName = '蜈擎 堅蛐';
	GridObj4.nHDFontSize = 9;				  	// Font Size 9
	GridObj4.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj4.nHDLines = 1;
    
     
}

function setDefault5() { 

	GridObj5.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj5.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj5.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj5.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj5.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj5.strSelectedCellFgColor = '0|0|0'; 
	GridObj5.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   
    GridObj5.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 

	// Header Font Setting
	GridObj5.strHDFontName = '蜈擎 堅蛐';
	GridObj5.nHDFontSize = 9;				  	// Font Size 9
	GridObj5.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj5.nHDLines = 1; 
}


function setDefault6() { 

	GridObj6.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj6.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj6.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj6.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj6.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj6.strSelectedCellFgColor = '0|0|0'; 
	GridObj6.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   
    GridObj6.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 

	// Header Font Setting
	GridObj6.strHDFontName = '蜈擎 堅蛐';
	GridObj6.nHDFontSize = 9;				  	// Font Size 9
	GridObj6.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj6.nHDLines = 1; 
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

  	GridObj.AddHeader("CNFM_DATE"		,"CNFM_DATE"    ,"t_text" 	,10			,0  ,false); //0   
  	GridObj.AddHeader("DAY"				,"橾   除"       	,"t_text" 	,400		,70 ,false); //0   
  	GridObj.AddHeader("HOLIDAY_FLAG"	,"HOLIDAY_FLAG" ,"t_text" 	,100		,0  ,false); //0   
  	GridObj.AddHeader("BASE_STOCK"		,"晦蟾營堅"     ,"t_number" ,100.3		,65 ,false); //0   
  	GridObj.AddHeader("IPGO"			,"儅骯榆"       	,"t_number" ,100.3		,65 ,true); //0   
  	GridObj.AddHeader("CHGO"			,"っ衙榆"      	,"t_number" ,100.3		,65 ,true); //0
  	GridObj.AddHeader("LAST_MONTH"		,"瞪錯翕橾"      	,"t_number" ,100.3		,65 ,true); //0
  	GridObj.AddHeader("LAST_YEAR"		,"瞪喇翕橾"      	,"t_number" ,100.3		,65 ,true); //0
  	
  	GridObj.AddHeader("MM"				,"錯"      		,"t_number" ,100.3		,0 ,true); //0
  	GridObj.AddHeader("WEEK_NO"			,"輿離"      	,"t_number" ,100.3		,0 ,true); //0
  	    
	 	    
	GridObj.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj.SetColCellAlign('DAY','center'); 
    
    GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
    GridObj.SetNumberFormat("IPGO"  , "#,##0");
    GridObj.SetNumberFormat("CHGO"  , "#,##0");
    GridObj.SetNumberFormat("LAST_MONTH"  , "#,##0");
    GridObj.SetNumberFormat("LAST_YEAR"  , "#,##0");
			
	setDefault();        	//�飛� 晦獄 撲薑 
	GoSearch(); //pop up 璽縑憮 諦檜鍔 斜葬萄 譆蟾 撲薑擊 嬪п GoSearch 蒂 init �醴� 褒ч  %醞蹂%

}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader2(GridObj) {        

  	GridObj2.AddHeader("CNFM_DATE"		,"CNFM_DATE"    ,"t_text" 	,10			,0  ,false); //0   
  	GridObj2.AddHeader("DAY"			,"輿   除"       	,"t_text" 	,400		,68 ,false); //0   
  	GridObj2.AddHeader("HOLIDAY_FLAG"	,"HOLIDAY_FLAG" ,"t_text" 	,100		,0  ,false); //0   
  	GridObj2.AddHeader("BASE_STOCK"		,"晦蟾營堅"     ,"t_number" ,100.3		,68 ,false); //0   
  	GridObj2.AddHeader("IPGO"			,"儅骯榆"       	,"t_number" ,100.3		,68 ,true); //0   
  	GridObj2.AddHeader("CHGO"			,"っ衙榆"      	,"t_number" ,100.3		,68 ,true); //0
  	
  	GridObj2.AddHeader("CHGO_ORG"		,"っ衙榆"      	,"t_number" ,100.3		,0 ,true); //0
	GridObj2.AddHeader("COUNT"			,"COUNT"      	,"t_number" ,100.3		,0 ,true); //0
  	GridObj2.AddHeader("MM"				,"錯"      		,"t_number" ,100.3		,0 ,true); //0
  	GridObj2.AddHeader("WEEK_NO"		,"輿離"      	,"t_number" ,100.3		,0 ,true); //0
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj2.SetColCellAlign('DAY','center'); 
    
    GridObj2.SetNumberFormat("BASE_STOCK"  , "#,##0");
    GridObj2.SetNumberFormat("IPGO"  , "#,##0");
    GridObj2.SetNumberFormat("CHGO"  , "#,##0");
			
	setDefault2();        	//�飛� 晦獄 撲薑 
	//GoSearch2(); //pop up 璽縑憮 諦檜鍔 斜葬萄 譆蟾 撲薑擊 嬪п GoSearch 蒂 init �醴� 褒ч  %醞蹂%

}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader3(GridObj) {        

  	GridObj3.AddHeader("CNFM_DATE"		,"CNFM_DATE"    ,"t_text" 	,10			,0  ,false); //0   
  	GridObj3.AddHeader("DAY"			,"錯   除"       	,"t_text" 	,400		,68 ,false); //0   
  	GridObj3.AddHeader("HOLIDAY_FLAG"	,"HOLIDAY_FLAG" ,"t_text" 	,100		,0  ,false); //0   
  	GridObj3.AddHeader("BASE_STOCK"		,"晦蟾營堅"     ,"t_number" ,100.3		,68 ,false); //0   
  	GridObj3.AddHeader("IPGO"			,"儅骯榆"       	,"t_number" ,100.3		,68 ,true); //0   
  	GridObj3.AddHeader("CHGO"			,"っ衙榆"      	,"t_number" ,100.3		,68 ,true); //0     
  	
  	GridObj3.AddHeader("CHGO_ORG"		,"っ衙榆"      	,"t_number" ,100.3		,0 ,true); //0
	GridObj3.AddHeader("COUNT"			,"COUNT"      	,"t_number" ,100.3		,0 ,true); //0
  	GridObj3.AddHeader("MM"				,"錯"      		,"t_number" ,100.3		,0 ,true); //0
  	GridObj3.AddHeader("WEEK_NO"		,"輿離"      	,"t_number" ,100.3		,0 ,true); //0
	 	    
	GridObj3.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj3.SetColCellAlign('DAY','center'); 
    
    GridObj3.SetNumberFormat("BASE_STOCK"  , "#,##0");
    GridObj3.SetNumberFormat("IPGO"  , "#,##0");
    GridObj3.SetNumberFormat("CHGO"  , "#,##0");
			
	setDefault3();        	//�飛� 晦獄 撲薑 
	//GoSearch3(); //pop up 璽縑憮 諦檜鍔 斜葬萄 譆蟾 撲薑擊 嬪п GoSearch 蒂 init �醴� 褒ч  %醞蹂%

}


function setHeader4(GridObj4) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_header2",{
		callback:function(result){

		  	GridObj4.AddHeader("GUBN"	,"掘碟"      	,"t_text" 	,100.3		,70  ,false); //0   
		  	GridObj4.AddHeader("AVG"	,"晦除ゎ敕"      	,"t_number" ,100.3		,60  ,false); //0   

			for(var i=0 ; i < 31 ; i++){  //19
				if(i < result.length) {
					GridObj4.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 31) { //19
						GridObj4.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj4.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj4.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
 
    		//GridObj2.SetColCellAlign('GUBN','center'); 
    		
			GridObj4.SetNumberFormat("AVG"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_10"  , "#,##0");
			
			GridObj4.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_20"  , "#,##0");		

			GridObj4.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_30"  , "#,##0");
			
			GridObj4.SetColFix('AVG'); 
							
		}
		
	});   

}

function setHeader5(GridObj5) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_header3",{
		callback:function(result){

		  	GridObj5.AddHeader("GUBN"	,"掘碟"      	,"t_text" 	,100.3		,70  ,false); //0   
		  	GridObj5.AddHeader("AVG"	,"晦除ゎ敕"      	,"t_number" ,100.3		,60  ,false); //0   

			for(var i=0 ; i < 61 ; i++){  //19
				if(i < result.length) {
					GridObj5.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 61) { //19
						GridObj5.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj5.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj5.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
 
    		GridObj5.SetColCellAlign('GUBN','center');
    		 
			GridObj5.SetNumberFormat("AVG"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_10"  , "#,##0");
 			GridObj5.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_20"  , "#,##0"); 
			GridObj5.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_30"  , "#,##0"); 			
                               
			GridObj5.SetNumberFormat("DAY_31"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_32"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_33"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_34"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_35"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_36"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_37"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_38"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_39"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_40"  , "#,##0");
 			GridObj5.SetNumberFormat("DAY_41"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_42"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_43"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_44"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_45"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_46"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_47"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_48"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_49"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_50"  , "#,##0"); 
			GridObj5.SetNumberFormat("DAY_51"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_52"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_53"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_54"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_55"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_56"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_57"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_58"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_59"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_60"  , "#,##0");
			
 			GridObj5.SetColFix('AVG'); 
 
		}
	});   
}


function setHeader6(GridObj6) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_header4",{
		callback:function(result){

		  	GridObj6.AddHeader("GUBN"	,"掘碟"      	,"t_text" 	,100.3		,70  ,false); //0   

			for(var i=0 ; i < 21 ; i++){  //19
				if(i < result.length) {
					GridObj6.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 21) { //19
						GridObj6.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj6.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj6.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
 
    		GridObj6.SetColCellAlign('GUBN','center');
    		 
			GridObj6.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_10"  , "#,##0");

			GridObj6.SetNumberFormat("DAY_11"  , "#,##0");  
			GridObj6.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_20"  , "#,##0");
			
 
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
       //doQuery2();
       //doQuery3();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch2(service) 
   {
   	//alert(service);
       //doQuery();
   }
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch3(service) 
   {
   	//alert(service);
       //doQuery();
   }



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch4(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       //doQuery2();
   }
  

      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	//Simulation 橾 唳辦 simul_data в熱
	//if(week_flag == "plan") {
		//GridObj.SetParam("mode", "search_plan");
	//}else{
	GridObj.SetParam("mode", "search");
	//}     
	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("week_flag", week_flag);
	GridObj.SetParam("simul_data", simul_data);
	GridObj.SetParam("sel_gubn", sel_gubn);
	GridObj.SetParam("division", division);
	GridObj.SetParam("cat03", cat03);
	   
	GridObj.DoQuery(servlet_url);
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj2 = document.WiseGrid2;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;

	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	GridObj2.SetParam("mode", "search2");
	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	//GridObj.SetParam("mode", "search3");
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("week_flag", week_flag);
	GridObj2.SetParam("simul_data", simul_data);
	GridObj2.SetParam("sel_gubn", sel_gubn);
	GridObj2.SetParam("division", division);
	GridObj2.SetParam("cat03", cat03);	   
		   
	GridObj2.DoQuery(servlet_url);
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery3() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj3 = document.WiseGrid3;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;

	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	//Simulation 橾 唳辦 simul_data в熱
	GridObj3.SetParam("mode", "search3");
	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	//GridObj.SetParam("mode", "search3");
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("week_flag", week_flag);
	GridObj3.SetParam("simul_data", simul_data);
	GridObj3.SetParam("sel_gubn", sel_gubn);
	GridObj3.SetParam("division", division);
	GridObj3.SetParam("cat03", cat03);	   
	   
	GridObj3.DoQuery(servlet_url);
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery4() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj4 = document.WiseGrid4;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj4.SetParam("mode", "search4");
	GridObj4.SetParam("item_id", item_id);
	GridObj4.SetParam("week_flag", week_flag);
	GridObj4.SetParam("simul_data", simul_data);
	GridObj4.SetParam("sel_gubn", sel_gubn);
	GridObj4.SetParam("division", division);	   
	GridObj4.SetParam("cat03", cat03);	   
	GridObj4.DoQuery(servlet_url);
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery5() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj5 = document.WiseGrid5;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj5.SetParam("mode", "search5");
	GridObj5.SetParam("item_id", item_id);
	GridObj5.SetParam("week_flag", week_flag);
	GridObj5.SetParam("simul_data", simul_data);
	GridObj5.SetParam("sel_gubn", sel_gubn);
	GridObj5.SetParam("division", division);	   
	GridObj5.SetParam("cat03", cat03);	   
	GridObj5.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery6() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj6 = document.WiseGrid6;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj6.SetParam("mode", "search6");
	GridObj6.SetParam("item_id", item_id);
	GridObj6.SetParam("week_flag", week_flag);
	GridObj6.SetParam("simul_data", simul_data);
	GridObj6.SetParam("sel_gubn", sel_gubn);
	GridObj6.SetParam("division", division);	   
	GridObj6.SetParam("cat03", cat03);	   
	GridObj6.DoQuery(servlet_url);
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
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell儀梃 滲唳
				//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
				GridObj.SetCellBgColor('IPGO', i, color_edit_col);
				GridObj.SetCellBgColor('CHGO', i, color_edit_col);
			} 
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	cal_dw1()


	doQuery2()
	doQuery3()

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery2() 
{
    var endMode = GridObj2.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search2") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj2.GetStatus() == "true") 
        {                           
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj2.GetRowCount();i++) {
			// cell儀梃 滲唳
				//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
				GridObj2.SetCellBgColor('IPGO', i, color_edit_col);
				GridObj2.SetCellBgColor('CHGO', i, color_edit_col);
			} 
                 
        } else    
        { 
            error_msg = GridObj2.GetMessage(); 
            alert(error_msg);            
		}
    }
    cal_dw2()

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery3() 
{
    var endMode = GridObj3.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search3") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj3.GetStatus() == "true") 
        {                           
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj3.GetRowCount();i++) {
			// cell儀梃 滲唳
				//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
				GridObj3.SetCellBgColor('IPGO', i, color_edit_col);
				GridObj3.SetCellBgColor('CHGO', i, color_edit_col);
			} 
                 
        } else    
        { 
            error_msg = GridObj3.GetMessage(); 
            alert(error_msg);            
		}
    }
    cal_dw3()
    
    //doQuery4()
	//doQuery5()
	//doQuery6()	
	doQuery4()
	doQuery5()
    
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
	
	doQuery2()
	doQuery3()
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery4() 
{
//alert("GridEndQuery2");
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
	//doQuery3()

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery5() 
{
//alert("GridEndQuery2");
    var endMode = GridObj5.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search5") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj5.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj5.GetMessage(); 
            alert(error_msg);            
		}
    }
	//cal_dw1()
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery6() 
{
//alert("GridEndQuery2");
    var endMode = GridObj6.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search6") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj6.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj6.GetMessage(); 
            alert(error_msg);            
		}
    }
	//cal_dw1()
}


function GridCellClick(strColumnKey, nRow){
	
	

	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	//if(strColumnKey == 'BASE_STOCK'){
		//alert("晦蟾營堅朝 熱薑檜 碳陛棟м棲棻");
		//alert("п渡 蠔歲擎 熱薑й熱 橈蝗棲棻.");
		//GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	//}
	cal_dw1(nRow, strColumnKey)	
}

function Grid2ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	if(strColumnKey == 'BASE_STOCK'){
		//alert("晦蟾營堅朝 熱薑檜 碳陛棟м棲棻");
		alert("п渡 蠔歲擎 熱薑й熱 橈蝗棲棻.");
		GridObj2.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	cal_dw2(nRow, strColumnKey)	
}

function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	if(strColumnKey == 'BASE_STOCK'){
		//alert("晦蟾營堅朝 熱薑檜 碳陛棟м棲棻");
		alert("п渡 蠔歲擎 熱薑й熱 橈蝗棲棻.");
		GridObj3.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	cal_dw3(nRow, strColumnKey)	
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 瞪偃薯堅 翱骯 橾除 瞪偃
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function cal_dw1(nRow, strColumnKey) { /* 橾除 瞪偃 */
	
	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var next_stock	= 0;
	var week_flag	= document.frm.week_flag.value;
	var holiday_flag; 		
	
		base_stock	= Number(GridObj.GetCellValue("BASE_STOCK", 0));
		ipgo_qty	= Number(GridObj.GetCellValue("IPGO", 0));
		chgo_qty	= Number(GridObj.GetCellValue("CHGO", 0));
		next_stock	= Math.round(base_stock - chgo_qty + ipgo_qty);
		
	/* RowCount 熱 虜躑 瞪偃衝 啗骯 */
	for(var i=1;i<GridObj.GetRowCount();i++){
		
		holiday_flag	=	GridObj.GetCellValue("HOLIDAY_FLAG", i)
		GridObj.SetCellValue("BASE_STOCK", i,  next_stock);

		base_stock	= Number(GridObj.GetCellValue("BASE_STOCK", i));
		ipgo_qty	= Number(GridObj.GetCellValue("IPGO", i));
		chgo_qty	= Number(GridObj.GetCellValue("CHGO", i));
		
		/* 
		 * 蟾晦 chgo_qty 擎 羅陳虜 っ衙榆檜 菟橫氈堅
		 * 釭該雖 陳菟擎 0擊 陛螳螞�� �瓿炵轃� 馬寰и 煎霜擊 檜辨ж罹 瓣錶遽棻.
		 * 
		 * 1. holiday_flag =='Y' 檜賊 っ衙榆擎 0
		 * 2. �瓿狨� 嬴棲塭賊 羅陳曖 っ衙榆擊 翕橾ж啪 撮たп遽棻.
		 * */
		if(chgo_qty == 0 ){
					
			if(holiday_flag =='Y'){
				chgo_qty	= 0;
				GridObj.SetCellValue("CHGO", i,  chgo_qty);	
			}else{
				chgo_qty	= Number(GridObj.GetCellValue("CHGO", 0));
				GridObj.SetCellValue("CHGO", i,  chgo_qty);
			}
					
		}else{
			
		}
		next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
	}
	/* 橾除 grid 縑 殮溘脹 高擊 輿滌 識м戲煎 啗骯�� 輿除 �飛橦� 奩艙и棻 */
	get_week_value(nRow, strColumnKey);	
}

/* 橾除 grid 縑 殮溘脹 高擊 輿滌 識м戲煎 啗骯�� 輿除 �飛橦� 奩艙и棻 */
function get_week_value(nRow, strColumnKey){ 
	
	
	/* -�飛� 蟾晦 褒ч衛縑朝 nRow 陛 剩螃螃雖 彊戲棲 褒чж雖 彊朝棻  */
	if(nRow != null){
		var inpt_value	= Number(GridObj.GetCellValue(strColumnKey, nRow));
		var sum_value = 0;
		var inpt_week_no= Number(GridObj.GetCellValue("WEEK_NO", nRow));
		var week_no;
	}else{
	}
	
	/* 熱薑脹 塭檣曖 WEEK_NO 蒂 瓊嬴 п渡 蠔歲曖 識м擊 啗骯и棻 */
	for(var i=0;i<GridObj.GetRowCount();i++){
		dy_week_no= Number(GridObj.GetCellValue("WEEK_NO", i));
		
		if(dy_week_no == inpt_week_no ){ 
			sum_value = sum_value +  Number(GridObj.GetCellValue(strColumnKey, i));
		}else{
		}
	}

	if(nRow != null){
		//alert(inpt_week_no+"輿離曖 "+strColumnKey+ "曖 м啗朝 "+sum_value )

		/* 橾除 斜葬萄縑憮 殮溘脹 輿離諦 翕橾и 輿離蒂 輿除 斜葬萄縑憮 瓊朝棻. */
		var w_week_no= Number(GridObj2.GetCellValue("WEEK_NO", 0));
		w_week_no = (Number(inpt_week_no) - Number(w_week_no)); 
		//alert("輿除 斜葬萄 羅輿朝.. "+w_week_no)
		//alert("輿除 斜葬萄曖  "+inpt_week_no+ "輿離朝 "+w_week_no+"廓簞蘊!!")
		
		//alert(sum_value);
		GridObj2.SetCellValue(strColumnKey, w_week_no,  sum_value);
		cal_dw2(w_week_no, strColumnKey)
	}
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 4 瞪偃薯堅 翱骯 --輿除瞪偃
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function cal_dw2(nRow, strColumnKey) { //輿除
	
	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var next_stock	= 0;
	var holiday_flag;
	var count; 		
	
		base_stock	= Number(GridObj2.GetCellValue("BASE_STOCK", 0));
		ipgo_qty	= Number(GridObj2.GetCellValue("IPGO", 0));
		chgo_qty	= Number(GridObj2.GetCellValue("CHGO", 0));
		chgo_qty_org= Number(GridObj2.GetCellValue("CHGO_ORG", 0));
		count		= Number(GridObj2.GetCellValue("COUNT", 0));
		
		
	if(nRow == null){ /* 籀擠 褒ч衛縑虜 褒衛*/
		GridObj2.SetCellValue("CHGO", 0,  chgo_qty_org*count);
		next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
	}else{
		next_stock	= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			
	}
		
	for(var i=1;i<GridObj2.GetRowCount();i++){


		if(nRow == null){ /* 籀擠 褒ч衛縑虜 褒衛*/
			
			GridObj2.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj2.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj2.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
			
			if(chgo_qty == 0 ){
	
				chgo_qty	= Number(GridObj2.GetCellValue("CHGO", 0));
				count		= Number(GridObj2.GetCellValue("COUNT", i));
				
				GridObj2.SetCellValue("CHGO", i,  chgo_qty_org*count);
				next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
				
			}else{
				chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
				count		= Number(GridObj2.GetCellValue("COUNT", i));
				GridObj2.SetCellValue("CHGO", i,  chgo_qty);
				
				next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			}


		}else{

			GridObj2.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj2.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj2.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
			
			if(chgo_qty == 0 ){
	
				chgo_qty_org	= Number(GridObj2.GetCellValue("CHGO", 0));
				count			= Number(GridObj2.GetCellValue("COUNT", i));
				
				next_stock	= Math.round(base_stock - (chgo_qty) + ipgo_qty);	
				
			}else{
				chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
				count		= Number(GridObj2.GetCellValue("COUNT", i));
				GridObj2.SetCellValue("CHGO", i,  chgo_qty);
				
				next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			}
	
		}

	}
	get_month_value(nRow, strColumnKey);	
	
}

/* 輿除 grid 縑 殮溘脹 高擊 錯滌 識м戲煎 啗骯и棻 */
function get_month_value(nRow, strColumnKey){ 
	

	if(nRow != null){
		var inpt_value	= Number(GridObj2.GetCellValue(strColumnKey, nRow));
		var sum_value	= 0;
		var inpt_mm_no	= Number(GridObj2.GetCellValue("MM", nRow));
		var mm_no;
	}

	for(var i=0;i<GridObj2.GetRowCount();i++){

		w_mm_no= Number(GridObj2.GetCellValue("MM", i));
		if(w_mm_no == inpt_mm_no ){ 
			sum_value = sum_value +  Number(GridObj2.GetCellValue(strColumnKey, i));
		}else{
			
		}
	}

	if(nRow != null){
		//alert(inpt_week_no+"輿離曖 "+strColumnKey+ "曖 м啗朝 "+sum_value )

		/* 橾除 斜葬萄縑憮 殮溘脹 輿離諦 翕橾寰 輿離蒂 輿除 斜葬萄縑憮 瓊朝棻. */
		var w_mm_no= Number(GridObj3.GetCellValue("MM", 0));
		//alert("輿除 斜葬萄 羅輿朝.. "+w_week_no)
		
		w_mm_no = (Number(inpt_mm_no) - Number(w_mm_no)); 
		//alert("輿除 斜葬萄曖  "+inpt_week_no+ "輿離朝 "+w_week_no+"廓簞蘊!!")
		
		GridObj3.SetCellValue(strColumnKey, w_mm_no,  sum_value);
		
		cal_dw3(nRow, strColumnKey)
	}
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 瞪偃薯堅 翱骯
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function cal_dw3(nRow, strColumnKey) {

	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var next_stock	= 0;
	var holiday_flag;
	var count; 		
	
		base_stock	= Number(GridObj3.GetCellValue("BASE_STOCK", 0));
		ipgo_qty	= Number(GridObj3.GetCellValue("IPGO", 0));
		chgo_qty	= Number(GridObj3.GetCellValue("CHGO", 0));
		chgo_qty_org= Number(GridObj3.GetCellValue("CHGO_ORG", 0));
		count		= Number(GridObj3.GetCellValue("COUNT", 0));
		
	if(nRow == null){ /* 籀擠 褒ч衛縑虜 褒衛*/
		GridObj3.SetCellValue("CHGO", 0,  chgo_qty_org*count);
		next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
	}else{
		next_stock	= Math.round(base_stock - (chgo_qty) + ipgo_qty);
	}		

		
		
		
	for(var i=1;i<GridObj3.GetRowCount();i++){


		if(nRow == null){ /* 籀擠 褒ч衛縑虜 褒衛*/
			
			GridObj3.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj3.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj3.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
			
			if(chgo_qty == 0 ){
	
				chgo_qty	= Number(GridObj3.GetCellValue("CHGO", 0));
				count		= Number(GridObj3.GetCellValue("COUNT", i));
				
				GridObj3.SetCellValue("CHGO", i,  chgo_qty_org*count);
				next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
				
			}else{
				chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
				count		= Number(GridObj3.GetCellValue("COUNT", i));
				GridObj3.SetCellValue("CHGO", i,  chgo_qty);
				
				next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			}


		}else{

			GridObj3.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj3.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj3.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
			
			chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
			count		= Number(GridObj3.GetCellValue("COUNT", i));
			GridObj3.SetCellValue("CHGO", i,  chgo_qty);
			
			next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
	
		}

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
	var division	= document.frm.division.value;
	var cat03	= document.frm.cat03.value;
	var sel_gubn	= document.frm.sel_gubn.value;

	//Simulation 橾 唳辦 simul_data в熱
	if(week_flag == "simul") {
		alert("掘⑷ 蕨薑!!!")
		return
		if( simul_data == "" || simul_data == null || simul_data == "0") {
			alert("Simulation曖 高擊 殮溘п輿褊衛蹂!"); 
			document.frm.simul_data.select();
			return;
		}
	}

	var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
	service_url += "&selgubn=" + sel_gubn + "&division=" + division + "&week_flag=" + week_flag + "&item_id=" + item_id+ "&cat03=" + cat03;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=700, top=200, left=200";
	var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);
	//var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}


