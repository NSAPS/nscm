//## Щ煎斜極ID		:	ip_01130_import_md_PlanAnalysis_list_pop.js
//## Щ煎斜極貲		:	熱殮鼻ヶ 營堅婦葬 ヶ跡滌 で機璽
//## 偃嫦濠          :	檜鬼遵 
//## 偃嫦橾濠       	:	2015-04-06
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_07.xml.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_07.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0       2015-04-06    檜鬼遵      create
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01130_import_md_PlanAnalysis_list_pop';

var GridObj ; 
var GridObj2 ;													// WiseGrid 偌羹
var GridObj3 ;

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
	setDefault();
	
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

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        
       
    
	var cnfm_date = document.frm.cnfm_date.value;	
	cnfm_date = cnfm_date.replace(/-/g,"");
	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "ip_01130_import_md_PlanAnalysis_list_header_pop",{
	callback:function(result){
			
			//GridObj.AddHeader("CRUD"			  ,"CRUD"       		,"t_text" 	   ,100    ,0  		,false);  
		  	GridObj.AddHeader("GUBN"  		      ,"掘碟"				,"t_text"      ,100		,90     ,false); //0
	 		GridObj.AddHeader("GUBN_IDX"  		  ,"掘碟牖憮"			,"t_text"      ,100		,0      ,false); //0 
	 		GridObj.AddHeader("AVG"  		  	  ,"ゎ敕"			,"t_number"    ,100		,40      ,false); //0 

			for(var i=0 ; i < 30 ; i++){  
				if(i < result.length) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" ,100.3	,0  	,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 30) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" ,100.3	,0  	,false);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" ,100.3	,0 	,false);
					}
				}
			}
			
			//GridObj.AddHeader("CNT_AVG"	       	  ,"晦除ゎ敕"   			,"t_number"    ,100.3	,60     ,false); //0
			
			for(var i=30 ; i < 61 ; i++){  
				if(i < result.length) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" ,100.3	,60  	,true);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 61) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" ,100.3	,60  	,true);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" ,100.3	,60 	,true);
					}
				}
			}
			
			GridObj.AddHeader("TP_FLAG"	       	  ,"顫歜も蝶"   			,"t_number"    ,100.3	,0     ,false); //0	
			
			GridObj.BoundHeader();	
			//GridObj.SetCRUDMode("CRUD"); 
			GoSearch(); 
		    
		    GridObj.SetNumberFormat("WEEK_0",       	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_1",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_2",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_3",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_4",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_5",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_6",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_7",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_8",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_9",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_10",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_11",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_12",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_13",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_14",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_15",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_16",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_17",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_18",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_19",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_20",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_21",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_22",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_23",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_24",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_25",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_26",        	"###,###.#");		    
		    GridObj.SetNumberFormat("WEEK_27",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_28",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_29",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_30",        	"###,###.#");
		 
		    
		    GridObj.SetNumberFormat("WEEK_31",       	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_32",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_33",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_34",        	"###,###.#");		    
		    GridObj.SetNumberFormat("WEEK_35",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_36",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_37",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_38",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_39",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_40",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_41",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_42",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_43",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_44",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_45",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_46",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_47",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_48",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_49",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_50",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_51",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_52",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_53",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_54",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_55",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_56",        	"###,###.#");		    
		    GridObj.SetNumberFormat("WEEK_57",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_58",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_59",        	"###,###.#");
		    GridObj.SetNumberFormat("WEEK_60",        	"###,###.#");
		    
		    GridObj.SetNumberFormat("AVG",        		"###,###.#");
		  
		    //GridObj.SetColCellBgColor('MONTH_5','255|253|208');
		    //GridObj.SetColCellBgColor('MONTH_4','255|253|208');
		    //GridObj.SetColCellBgColor('MONTH_3','255|253|208');
		    //GridObj.SetColCellBgColor('MONTH_2','255|253|208');
		    //GridObj.SetColCellBgColor('MONTH_1','255|253|208');
		    
		    GridObj.SetColCellAlign('GUBN',          'left');		    
			
			GridObj.SetColFix('GUBN'); 
		}
		
	});   
	}


function setHeader2(GridObj2) {
	// 營堅 塽 儅骯 瞳м撩 碟戮 pop_up hearder (DW2 婁剪 30橾 褒瞳)       
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	var cnfm_date = document.frm.cnfm_date.value;	
	cnfm_date = cnfm_date.replace(/-/g,"");
	
	commonUtil.getSelQeury( "item_id!%!cnfm_date", item_id+"!%!"+cnfm_date, "ip_01130_import_md_PlanAnalysis_list_header_pop_dw2",{
		callback:function(result){

		  	GridObj2.AddHeader("GUBN"	,"掘碟"      	,"t_text" 	,100.3	,60  ,false); //0
		  	GridObj2.AddHeader("AVG"	,"晦除ゎ敕"      	,"t_number" ,100.3	,60  ,false); //0

			for(var i=0 ; i < 30 ; i++){  //11
				if(i < result.length) {
					GridObj2.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 30) { //11
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

			GridObj2.SetNumberFormat("WEEK_0"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_1"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_2"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_3"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_4"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_5"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_6"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_7"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_8"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_9"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_10"  , "#,##0");

			GridObj2.SetNumberFormat("WEEK_11"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_12"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_13"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_14"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_15"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_16"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_17"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_18"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_19"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_20"  , "#,##0"); 

			GridObj2.SetNumberFormat("WEEK_21"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_22"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_23"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_24"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_25"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_26"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_27"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_28"  , "#,##0");
			GridObj2.SetNumberFormat("WEEK_29"  , "#,##0");
			

			GridObj2.SetColFix('AVG'); 
 
		}
		
	});   
}


function setHeader3(GridObj3) {        
      //營堅 塽 儅骯 瞳м撩 碟戮 pop_up hearder (DW3 瞪喇 翕橾) -->  
      
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	var cnfm_date = document.frm.cnfm_date.value;	
	cnfm_date = cnfm_date.replace(/-/g,"");
	
	commonUtil.getSelQeury( "item_id!%!cnfm_date", item_id+"!%!"+cnfm_date, "ip_01130_import_md_PlanAnalysis_list_header_pop",{
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
			GridObj3.SetNumberFormat("WEEK_0"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_1"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_2"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_3"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_4"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_5"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_6"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_7"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_8"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_9"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_10"  , "#,##0"); 			
 			
 			GridObj3.SetNumberFormat("WEEK_11"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_12"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_13"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_14"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_15"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_16"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_17"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_18"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_19"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_20"  , "#,##0");
			
			GridObj3.SetNumberFormat("WEEK_21"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_22"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_23"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_24"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_25"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_26"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_27"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_28"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_29"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_30"  , "#,##0");
			
			GridObj3.SetNumberFormat("WEEK_31"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_32"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_33"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_34"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_35"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_36"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_37"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_38"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_39"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_40"  , "#,##0");
			
			GridObj3.SetNumberFormat("WEEK_41"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_42"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_43"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_44"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_45"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_46"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_47"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_48"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_49"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_50"  , "#,##0");
			
			GridObj3.SetNumberFormat("WEEK_51"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_52"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_53"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_54"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_55"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_56"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_57"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_58"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_59"  , "#,##0");
			GridObj3.SetNumberFormat("WEEK_60"  , "#,##0");
			
			GridObj3.SetColFix('AVG'); 			 			
		}
		
	});  
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service)  {   	
       doQuery();     
}
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave  (service) {
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	doSave();
}     

function doSave(){	
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var	cnfm_date	= document.frm.cnfm_date.value;
	cnfm_date = cnfm_date.replace(/-/g,"");
	var item_id		= document.frm.item_id.value;
	var reason		= document.frm.reason.value;
	var user_id		= document.frm.user_id.value;  
	var tp_flag		= GridObj.GetCellValue('TP_FLAG',2)
	
	var week_idx    = Number(tp_flag) + 30;	
	var hd_name 	='WEEK_'+Number(week_idx);	
	var order_qty   = GridObj.GetCellValue(hd_name,1);
	  
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");	
	GridObj.SetParam("cnfm_date", cnfm_date);
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("user_id", user_id);
	GridObj.SetParam("tp_flag", tp_flag);
	GridObj.SetParam("reason", 	reason);
	GridObj.SetParam("order_qty", order_qty);
	
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
	
	
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var cnfm_date  	= document.frm.cnfm_date.value;
	cnfm_date 		= cnfm_date.replace(/-/g,"");
	var simul_data  = document.frm.simul_data.value;
	var no_flag		= document.frm.no_flag.value;
	var three_mon	= document.frm.three_mon.value;
	
	var checked_button ;
	
	if(document.frm.checked_button[0].checked){

		checked_button = document.frm.checked_button[0].value;

	}else if(document.frm.checked_button[1].checked){
		
		checked_button = document.frm.checked_button[1].value;
		
	}else if(document.frm.checked_button[2].checked){
		
		checked_button = document.frm.checked_button[2].value;
		
	}
	GridObj.SetParam("mode",           	"search");	
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("cnfm_date", cnfm_date);
	GridObj.SetParam("simul_data", simul_data);
	GridObj.SetParam("no_flag", no_flag);
	GridObj.SetParam("three_mon", three_mon);
	GridObj.SetParam("checked_button", checked_button);
	
	GridObj.DoQuery(servlet_url);
}

//婁剪 30輿
function doQuery2() 
{

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var	cnfm_date	= document.frm.cnfm_date.value;
	cnfm_date = cnfm_date.replace(/-/g,"");		   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("cnfm_date", cnfm_date);
	
	   
	GridObj2.DoQuery(servlet_url);
}
// 瞪喇翕輿 60輿
function doQuery3() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var	cnfm_date	= document.frm.cnfm_date.value.replace(/-/g,"");	

	commonUtil.getSelQeury( "item_id!%!cnfm_date", item_id+"!%!"+cnfm_date, "ip_01130_import_md_PlanAnalysis_list_reason",{
		callback:function(result){

		  	document.frm.reason.value = result;
 
		}
		
	});   
	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("cnfm_date", cnfm_date);
	
	   
	GridObj3.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() 
{
	
    var endMode  = GridObj.GetParam("mode");
    
    var error_msg = '';
      
    if(endMode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {          
        	  
       	            	              
			  doQuery2();
			  gridSetStock();
			  setTimeFence();
			  //Add_Row(); 
			  
	            
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
    else if(endMode == "doSave") {
		if(GridObj.GetStatus() == "true") 
		{// 
			doQuery();     
		} else 
		{
			var error_msg = GridObj.GetMessage();// 
			alert(error_msg);			
		}
		
    }	
  
	
}


function GridEndQuery2() 
{
	
    var endMode  = GridObj2.GetParam("mode");
    
    var error_msg = '';
      
    if(endMode == "search2") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj2.GetStatus() == "true") 
        {                           
			   setColoring();
			   doQuery3();
                 
        } else    
        { 
            error_msg = GridObj2.GetMessage(); 
            alert(error_msg);            
		}
    }
    	
	
}

function GridEndQuery3() 
{
	
    var endMode  = GridObj3.GetParam("mode");
    
    var error_msg = '';
      
    if(endMode == "search3") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj3.GetStatus() == "true") 
        {               
        	       
			   paintLineGraph2();
                 
        } else    
        { 
            error_msg = GridObj3.GetMessage(); 
            alert(error_msg);            
		}
    }
	
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
//	if(strColumnKey == 'MONTH_5' || strColumnKey == 'MONTH_4'|| strColumnKey == 'MONTH_3'|| strColumnKey == 'MONTH_2' || strColumnKey == 'MONTH_1' || strColumnKey == 'GUBN' ){
//		
//		alert("п渡 蠔歲擎 熱薑й熱 橈蝗棲棻.");
//		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
//	}
	
//	if(strColumnKey == 'WEEK_30'){
//		
//		
//		var start_hd_name	= 'WEEK_30';
//		var hd_name 		= start_hd_name;
//		var hd_name_1 		= start_hd_name.substr(0,5);
//		var hd_name_2 		= start_hd_name.substr(5,6);
//		
//		for(var i=0; i < 30; i++){
//			
//			hd_name_2 = Number(hd_name_2)+Number(1);						
//			hd_name = hd_name_1+hd_name_2;
//			
//			GridObj.SetCellValue(hd_name, nRow,  nNewValue);
//		}
//		
//	}
	
	gridSetStock();
	paintLineGraph2();	
	
	
}

function GridCellClick(strColumnKey, nRow) {
	
}



/*營堅 �撣尾�偃 餌辨濠 蕨難 Default*/
function gridSetStock(){
		
		var cur_stock;
		var reciept_expt;
		var sales_expt;
		var next_stock;	
		
		var start_hd_name	= 'WEEK_30';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,5);
		var hd_name_2 		= start_hd_name.substr(5,6);
		
		for(var j =0; j < 30; j++){
			
			cur_stock 		= GridObj.GetCellValue(hd_name,0);	//晦蟾營堅
			reciept_expt 	= GridObj.GetCellValue(hd_name,1);	//殮堅榆
			sales_expt		= GridObj.GetCellValue(hd_name,2);	//餌辨濠 蕨難
			
			next_stock		= Number(cur_stock) + Number(reciept_expt) - Number(sales_expt);
			
			hd_name_2 		= Number(hd_name_2)+Number(1);	
							
			hd_name = hd_name_1+hd_name_2;			
			GridObj.SetCellValue(hd_name, 0,  next_stock);
			
		}
		
		GridObj.SetRowBgColor(2,'178|235|244');	
		
		//GridObj.SetRowActivation(2,'edit');	2015-05-13 js 螃盟薯奢濠	
		
		
			
}


/*顫歜も蝶 瞪偃*/
function setTimeFence(){		
	
	
	
	var hd_name ;
	var fence ;
	var rowcount	= GridObj.GetRowCount();
	
	for(var i =0; i < rowcount; i++){
		fence		= Number(GridObj.GetCellValue('TP_FLAG',i));
		
		fence = fence+Number(30);
		
		
	
		for(var j=fence; j<61; j++){
			
			hd_name		= 'WEEK_'+j;				
			GridObj.SetCellBgColor(hd_name,i,'255|255|0');
		}
					
	}
	
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
			if(header_day == '橾') continue;			
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
			//alert(dataCol_G1);
			

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
	
		
	
	var dataCol_3 = "";
	var gubnName_3 = GridObj.GetCellValueIndex(0,2);
	var rowCnt_3 = GridObj.GetRowCount();
	var first_3 = 0;
	if(rowCnt_3 > 0){
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj.GetCellValueIndex(Number(i+3),2));			
			header_day = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+3)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			
			// 橾蹂橾, 0 橾濠 薯剪
			if( header_day == '橾') continue;			
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			first_3++;
			if(first_3==1){
				if(rowCnt == 0) headerCol = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+3)));
				dataCol_3 = GridObj.GetCellValueIndex(Number(i+3),2);
			}
			else {
				if(rowCnt == 0) headerCol = headerCol + ','+ GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+3)));
				dataCol_3 = dataCol_3 + ','+ GridObj.GetCellValueIndex(Number(i+3),2);
			}				
		}
			
		if(rowCnt == 0) { // 1廓 斜楚Щ陛 橈朝 唳辦!!!!
				so.addVariable("line_dot","2,#CC3399," + gubnName_3 + ",12,5");
				valuesId = "values";
				so.addVariable(valuesId,dataCol_3);
				
				
		}else if(rowCnt_2 == 0) {
			so.addVariable("line_dot_3", "2,#468024," + gubnName_3 + ",12,5");			
			valuesId_3 = "values_3";
			so.addVariable(valuesId_3,dataCol_3);
			
		}
		else {
			
			so.addVariable("line_dot_2", "2,#0054FF," + gubnName_3 + ",12,5");			
			valuesId_2 = "values_2";
			so.addVariable(valuesId_2,dataCol_3);
			
			
		}	
				
	}	
	
	
	var dataCol_2 = "";
	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();
	var first_2 = 0;
	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 30 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(6,10);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 橾蹂橾, 0 橾濠 薯剪
			if( header_day == '橾') continue;			
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
		else{
			so.addVariable("line_dot_3", "2,#468024," + gubnName_2 + ",12,5");			
			valuesId_3 = "values_3";
			so.addVariable(valuesId_3,dataCol_2);
			
		}
		
	}
	
	
	// X高擊 譆渠高戲煎 纂�納媮奡�.
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_3", "20,#00BBFF,"+"錯掘碟"+",12");			
	var valuesId_7 = "values_6";	
	so.addVariable(valuesId_7,dataCol_G1);

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
	var rowCnt = GridObj3.GetRowCount();   //瞪喇翕輿
	if(rowCnt > 0){
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj3.GetCellValueIndex(Number(i+2),0));
		
			header_day = GridObj3.GetColHDText(GridObj3.GetColHDKey(Number(i+2)));
			cmp_month = header_day.substr(0,2);
			header_day = header_day.substr(4,6);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");
			
			// 輿除欽嬪 ゎ敕 斜楚Щ 掘ж晦 嬪и 睡碟
			// 錯蹂橾睡攪 橾濠蒂 渦п除棻. 橾蹂橾擊 虜釭賊 蟾晦��, っ衙熱榆 < 0檜賊 薯諼
			// 輿ゎ敕= っ衙熱榆/陳瞼偎熱
			// dataCol_W1 = 輿ゎ敕,輿ゎ敕,輿ゎ敕,輿ゎ敕,... --> 陳瞼偎熱虜躑 虜萇棻
			
			if( i == 4||i == 8 || i == 12 || i == 16 || i ==20 || i ==24 || i == 28 || i==32 || i ==36 || i ==40 || i ==44 || i ==48 || i== 52|| i==56 || i==60){
				if (i == 60 ){
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
					sum_W1 = sum_W1 + colValue;
				
			}
	
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
		
		
		}	//61 for 僥 謙猿
	}
	
	var dataCol_W2 = "";
	var dayCnt_W2 = 0;
	var mean_W2 = 0;
	var sum_W2 = 0;
	var first_W2 = 0;

	var gubnName_2 = GridObj2.GetCellValueIndex(0,0);
	var rowCnt_2 = GridObj2.GetRowCount();
	
	if(rowCnt_2 > 0){		
		for(var i=0 ; i < 30 ; i++){  
			
			colValue = Number(GridObj2.GetCellValueIndex(Number(i+2),0));			
			header_day = GridObj2.GetColHDText(GridObj2.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(4,6);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");

			// 輿除欽嬪 ゎ敕 斜楚Щ 掘ж晦 嬪и 睡碟
			// 錯蹂橾睡攪 橾濠蒂 渦п除棻. 橾蹂橾擊 虜釭賊 蟾晦��, っ衙熱榆 < 0檜賊 薯諼
			// 輿ゎ敕= っ衙熱榆/陳瞼偎熱
			// dataCol_W2 = 輿ゎ敕,輿ゎ敕,輿ゎ敕,輿ゎ敕,... --> 陳瞼偎熱虜躑 虜萇棻
			if(i == 4|| i ==8 || i ==12 || i ==16 || i== 20 || i == 24 || i==28 || i==30 ){
				
				if (i == 30 ){
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
				
					sum_W2 = sum_W2 + colValue;
					
				
			}
				
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			
			dayCnt_W2++;
		}
	}
	
	var dataCol_W3 = "";
	var dayCnt_W3 = 0;
	var mean_W3 = 0;
	var sum_W3 = 0;
	var first_W3 = 0;

	var gubnName_3 = GridObj.GetCellValueIndex(0,0);
	var rowCnt_3 = GridObj.GetRowCount();
	
	if(rowCnt_3 > 0){		
		for(var i=0 ; i < 61 ; i++){  
			
			colValue = Number(GridObj.GetCellValueIndex(Number(i+2),2));			
			header_day = GridObj.GetColHDText(GridObj.GetColHDKey(Number(i+2)));
			header_day = header_day.substr(4,6);
			header_day = header_day.replace(/\(/g,"");
			header_day = header_day.replace(/\)/g,"");

			// 輿除欽嬪 ゎ敕 斜楚Щ 掘ж晦 嬪и 睡碟
			// 錯蹂橾睡攪 橾濠蒂 渦п除棻. 橾蹂橾擊 虜釭賊 蟾晦��, っ衙熱榆 < 0檜賊 薯諼
			// 輿ゎ敕= っ衙熱榆/陳瞼偎熱
			// dataCol_W2 = 輿ゎ敕,輿ゎ敕,輿ゎ敕,輿ゎ敕,... --> 陳瞼偎熱虜躑 虜萇棻
			if(i == 4||i == 8 || i == 12 || i == 16 || i ==20 || i ==24 || i == 28 || i==32 || i ==36 || i ==40 || i ==44 || i ==48 || i== 52|| i==56 || i==60){
				
				if (i == 60 ){
					sum_W3 = sum_W3 + colValue;
					dayCnt_W3++;
				}
				if(dayCnt_W3 > 0) {			
					mean_W3 = Math.round(sum_W3 / dayCnt_W3,0);
					for(var s=0; s<dayCnt_W3; s++) {
						if(first_W3 == 0) {
							dataCol_W3 = mean_W3;
							first_W3 = 1;
						}
						else {
							dataCol_W3 = dataCol_W3 + ',' + mean_W3;
						}
					}
				}
				dayCnt_W3 = 0;
				mean_W3 = 0;
				sum_W3 = 0;
			}
			else {
				
					sum_W3 = sum_W3 + colValue;
					
				
			}
				
			if (maxValue < colValue) {
				maxValue = colValue;
			}	
			
			dayCnt_W3++;
		}
	}
	
	
	so.addVariable("line", "2,#CC3399," + "瞪喇翕輿 錯ゎ敕" + ",12,5");			
	var valuesId_1 = "values";
	so.addVariable(valuesId_1,dataCol_W1);

	so.addVariable("line_2", "2,#468024," + "婁剪30輿 錯ゎ敕" + ",12,5");			
	var valuesId_2 = "values_2";
	so.addVariable(valuesId_2,dataCol_W2);
	
	so.addVariable("line_3", "2,#0054FF," + "餌辨濠蕨難  錯ゎ敕" + ",12,5");			
	var valuesId_3 = "values_3";
	so.addVariable(valuesId_3,dataCol_W3);
	
	// X高擊 譆渠高戲煎 纂�納媮奡�.
	dataCol_G1 = dataCol_G1.replace(/X/g,maxValue);
	so.addVariable("bar_4", "20,#00BBFF,"+"錯掘碟"+",12");			
	var valuesId_6 = "values_4";
	so.addVariable(valuesId_6,dataCol_G1);

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

function refresh(week_flag) {	
	
	var item_id 	= document.frm.item_id.value;
	var	item_name 	= document.frm.item_name.value;
	var simul_data  = document.frm.simul_data.value;
	var cnfm_date   = document.frm.cnfm_date.value;
	var no_flag   = document.frm.no_flag.value;	
	var three_mon   = document.frm.three_mon.value;		
	
	var week_flag	= week_flag;	
	
	var checked_button ;
	
	if(document.frm.checked_button[0].checked){

		checked_button = document.frm.checked_button[0].value;

	}else if(document.frm.checked_button[1].checked){
		
		checked_button = document.frm.checked_button[1].value;
		
	}else if(document.frm.checked_button[2].checked){
		
		checked_button = document.frm.checked_button[2].value;
		
	}
	//Simulation 橾 唳辦 simul_data в熱
	if(week_flag == "simul") {
		if( simul_data == "" || simul_data == null || simul_data == "0" ) {
			alert("Simulation曖 高擊 殮溘п輿褊衛蹂!"); 
			
			return;
		}
	if(checked_button ==null) {
			alert("晦遽喇紫 高擊 殮溘п輿褊衛蹂!"); 
			
			return;
		}
	}
	
	var service_url = "service.do?_moon_service=ip_01130_import_md_PlanAnalysis_list_pop";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag + "&simul_data_org=" + simul_data + "&cnfm_date=" + cnfm_date ;
	service_url += "&checked_button=" + checked_button + "&no_flag=" + no_flag + "&three_mon=" + three_mon;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1135, height=740, top=200, left=200";	
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();
	
}

function setExpectData(){
	
	var expect_data = document.frm.expect_data.value;
	
	if(expect_data =="") {
		
		alert("餌辨濠 蕨難高檜 綠歷蝗棲棻.");
		return;
	}
	
	var start_hd_name	= 'WEEK_30';
	var hd_name 		= start_hd_name;
	var hd_name_1 		= start_hd_name.substr(0,5);
	var hd_name_2 		= start_hd_name.substr(5,6);
	
	for(var j =0; j < 31; j++){
		
		GridObj.SetCellValue(hd_name, 2,  expect_data);
		hd_name_2 = Number(hd_name_2)+Number(1);	
						
		hd_name = hd_name_1+hd_name_2;			
		
		
	}
	
	gridSetStock();
		paintLineGraph2();
		
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
		    	    
				
				document.frm.totalSum.value = sum + value;    
				
		}
		i++;
	}	
	

}


function sel_data_avg(obj){
	
	var totalAvg =  0;
	var totalAvg_r = 0;	
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
		    			    
			    var sum     = Number(totalAvg) ;
			    var value   = Number(GridObj.GetCellValue(hd_name, rowNo));
		    	
				totalAvg = sum + value;
				
				
				document.frm.totalAvg.value = Math.round(totalAvg / (i+1)) ; 
				 
				
				
		}
		i++;
	}	
	
	 
}

function Add_Row(){
		
	GridObj.AddRow();
	GridObj.AddRow();
		
	var start_hd_name	= 'WEEK_30';
	var hd_name 		= start_hd_name;
	var hd_name_1 		= start_hd_name.substr(0,5);
	var hd_name_2 		= start_hd_name.substr(5,6);
	
	var yyyy_f = GridObj.GetCellValue('GUBN',3);
	var yyyy_s = GridObj.GetCellValue('GUBN',4); 
	
	GridObj.SetCellValue('GUBN', 6,  yyyy_f + ' ' + '隸馬');
	GridObj.SetCellValue('GUBN', 7,  yyyy_s + ' ' + '隸馬');
	
	for(var i=0; i < 31; i++ ){

		var val_2013 = (GridObj.GetCellvalue(hd_name,3)/GridObj.GetCellvalue(hd_name,4))-Number(1);
		var val_2012 = (GridObj.GetCellvalue(hd_name,4)/GridObj.GetCellvalue(hd_name,5))-Number(1);
		
		GridObj.SetCellValue(hd_name, 6, Math.round(val_2013*1000)/10 );
		GridObj.SetCellValue(hd_name, 7, Math.round(val_2012*1000)/10 );
		
		hd_name_2 = Number(hd_name_2)+Number(1);						
		hd_name = hd_name_1+hd_name_2;		
		
	}
	
}

function HeaderClick(strColumnKey){
	
	for(var i=30; i<61; i++){
			
			hd_name		= 'WEEK_'+i;				
			GridObj.SetColHDBgColor(hd_name,'243|243|243');
		}
	
	
	var cur_hd_idx	=	GridObj.GetColHDVisibleIndex(strColumnKey);	
	
	var time_fence  = 	GridObj.GetCellValue("TP_FLAG",2);
	
	var ip_hd_idx	=	Number(cur_hd_idx) - Number(time_fence) ;
	
	
	GridObj.SetColHDBgColor(GridObj.GetColHDVisibleKey(ip_hd_idx),'250|224|212');
	
	

}

function setColoring(){
	
	var item_id		= document.frm.item_id.value;
	var cnfm_date = document.frm.cnfm_date.value;	
	cnfm_date = cnfm_date.replace(/-/g,"");
	
	commonUtil.getSelQeury( "item_id!%!cnfm_date", item_id+"!%!"+cnfm_date, "ip_01130_import_md_PlanAnalysis_list_pop_coloring",{
		callback:function(result){
			
			
			for(var i=0; i<30; i++){
				
				var hd_name = 'WEEK_' + i;
				if(result[0][i] == 'Y') {
					
					GridObj2.SetColHDBgColor(hd_name,  '255|216|216');
				}
				
			}
			
		
 
		}
		
	});   
}
