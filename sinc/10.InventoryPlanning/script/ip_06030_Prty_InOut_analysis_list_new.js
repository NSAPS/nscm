//## Щ煎斜極ID      : ip_06030_Prty_InOut_analysis_list_new.js
//## Щ煎斜極貲      : ヶ謙捱 橾濠滌 蹺檜⑷�� (褐敘)
//## 滲唳濠濠        : 辦謙敕
//## 偃嫦橾濠        : 2011-12-06 �倍靺�
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-12-06  辦謙敕      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_06030_Prty_InOut_analysis_list_new';

var GridObj ; 													// WiseGrid 偌羹
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
            maxWidthValue  = window.innerWidth;
            maxHeightValue = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue  = document.body.clientWidth;
            maxHeightValue = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
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

        document.WiseGrid.height = tableHeightValue + "px"; 
        //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
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
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
    GridObj.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	
//  	GridObj.AddHeader("SELECTED"		," "       		,"t_checkbox" 	,2		,21  ,true); //0

	 
//	var trans_start = document.frm.trans_start.value;
//	var item_id     = document.frm.item_id.value;
	var insel_prty	= document.all.insel_prty.value;
    var selgubn 	= document.frm.sel_gubn.value;
    var in_item_id 	= document.frm.in_item_id.value;
    var in_item_name= document.frm.in_item_name.value;

if(selgubn == "PRTY"){
	if(insel_prty == "01"){
     //alert("if(insel_prty == 01 && selgubn != PROD)");
		GridObj.AddHeader("CNFM_DATE"	,"橾濠"		   ,"t_text" 	   ,100	    ,60     ,false); //0   
		GridObj.AddHeader("DAY"	        ,"蹂橾"	       ,"t_text" 	   ,100	    ,40     ,false); //0
		GridObj.AddHeader("CURR_FLAG"	,"CURR_FLAG"   ,"t_number" 	   ,100	    ,0      ,false); //0
		 
		GridObj.AddHeader("PROD_1"	    ,"儅骯"	       ,"t_number"     ,100.3	,70     ,false); //0
		GridObj.AddHeader("SELL_1"	    ,"っ衙"	       ,"t_number"	   ,100.3	,70     ,false); //0
		GridObj.AddHeader("STOCK_1"     ,"營堅"	       ,"t_number"     ,100.3   ,70     ,false); //0
		GridObj.AddHeader("STOCK_DAY_1" ,"營堅橾熱"	   ,"t_text"       ,100     ,70     ,false) //0
		
		GridObj.AddHeader("PROD_2"	    ,"儅骯"	       ,"t_number"     ,100.3	,70     ,false); //0
		GridObj.AddHeader("SELL_2"	    ,"っ衙"	       ,"t_number"	   ,100.3	,70     ,false); //0
		GridObj.AddHeader("STOCK_2"     ,"營堅"	       ,"t_number"     ,100.3   ,70     ,false); //0
		GridObj.AddHeader("STOCK_DAY_2" ,"營堅橾熱"	   ,"t_text"       ,100     ,70     ,false) //0
		
		GridObj.AddHeader("PROD_3"	    ,"儅骯"	       ,"t_number"     ,100.3	,70     ,false); //0
		GridObj.AddHeader("SELL_3"	    ,"っ衙"	       ,"t_number"	   ,100.3	,70     ,false); //0
		GridObj.AddHeader("STOCK_3"     ,"營堅"	       ,"t_number"     ,100.3   ,70     ,false); //0
		GridObj.AddHeader("STOCK_DAY_3" ,"營堅橾熱"	   ,"t_text"       ,100     ,70     ,false) //0
		
		GridObj.AddHeader("SELL_PLAN_1" ,"っ衙啗��"	   ,"t_number"     ,100.3   ,70     ,false); //0
		
			/* 檜醞 п渦 蹺陛 */
		GridObj.AddGroup("HD1",      		"賊盟");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		GridObj.AppendHeader("HD1", 	 "PROD_1");
		GridObj.AppendHeader("HD1",      "SELL_1");
		GridObj.AppendHeader("HD1",     "STOCK_1");
		GridObj.AppendHeader("HD1", "STOCK_DAY_1");	
		
		GridObj.AddGroup("HD2",    		  "蝶頃盟");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		GridObj.AppendHeader("HD2", 	 "PROD_2");
		GridObj.AppendHeader("HD2", 	 "SELL_2");
		GridObj.AppendHeader("HD2", 	"STOCK_2");
		GridObj.AppendHeader("HD2", "STOCK_DAY_2");	
		
		GridObj.AddGroup("HD3",      		"м啗");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		GridObj.AppendHeader("HD3", 	 "PROD_3");
		GridObj.AppendHeader("HD3", 	 "SELL_3");
		GridObj.AppendHeader("HD3", 	"STOCK_3");
		GridObj.AppendHeader("HD3", "STOCK_DAY_3");
		GridObj.AppendHeader("HD3", "SELL_PLAN_1");
		
		/* 盪濰擊 嬪и �鰽� 高 */
		
		GridObj.BoundHeader();	
		
		GridObj.SetColCellAlign('CNFM_DATE',     'center');
		GridObj.SetColCellAlign('DAY',           'center');
		GridObj.SetColCellAlign('PROD_1',         'right');
		GridObj.SetColCellAlign('SELL_1',         'right'); 
		GridObj.SetColCellAlign('STOCK_1',        'right');
		GridObj.SetColCellAlign('STOCK_DAY_1',    'right'); 
		
		GridObj.SetColCellAlign('PROD_2',         'right');
		GridObj.SetColCellAlign('SELL_2',         'right'); 
		GridObj.SetColCellAlign('STOCK_2',        'right');
		GridObj.SetColCellAlign('STOCK_DAY_2',    'right'); 
		
		GridObj.SetColCellAlign('PROD_3',         'right');
		GridObj.SetColCellAlign('SELL_3',         'right'); 
		GridObj.SetColCellAlign('STOCK_3',        'right');
		GridObj.SetColCellAlign('STOCK_DAY_3',    'right'); 
		   
		GridObj.SetColCellAlign('SELL_PLAN_1',    'right');   
		  
		GridObj.SetNumberFormat("PROD_1",      "###,###.#");
		GridObj.SetNumberFormat("SELL_1",      "###,###.#");
		GridObj.SetNumberFormat("STOCK_1",     "###,###.#");
		
		GridObj.SetNumberFormat("PROD_2",      "###,###.#");
		GridObj.SetNumberFormat("SELL_2",      "###,###.#");
		GridObj.SetNumberFormat("STOCK_2",     "###,###.#");
		
		GridObj.SetNumberFormat("PROD_3",      "###,###.#");
		GridObj.SetNumberFormat("SELL_3",      "###,###.#");
		GridObj.SetNumberFormat("STOCK_3",     "###,###.#");
		    
		GridObj.SetNumberFormat("SELL_PLAN_1", "###,###.#");   			
	}else{
		 	GridObj.AddHeader("CNFM_DATE"	  ,"橾濠"		   ,"t_text" 	   ,100	    ,80     ,false); //0   
		 	GridObj.AddHeader("DAY"	          ,"蹂橾"	       ,"t_text" 	   ,100	    ,80     ,false); //0
		 	GridObj.AddHeader("CURR_FLAG"	  ,"CURR_FLAG"     ,"t_number" 	   ,100	    ,0      ,false); //0
		 	
		 	GridObj.AddHeader("PROD_1"	      ,"儅骯/衙殮"	   ,"t_number"     ,100.3	,100    ,false); //0
			GridObj.AddHeader("SELL_1"	      ,"っ衙"	       ,"t_number"	   ,100.3	,100    ,false); //0
		 	GridObj.AddHeader("STOCK_1"       ,"營堅"	       ,"t_number"     ,100.3   ,100    ,false); //0
		    GridObj.AddHeader("STOCK_DAY_1"   ,"營堅橾熱"	       ,"t_text"       ,100     ,80     ,false) //0
		    GridObj.AddHeader("SELL_PLAN_1"   ,"っ衙啗��"	       ,"t_number"     ,100.3   ,100    ,false); //0
		/* 檜醞 п渦 蹺陛 */
		if(insel_prty=="02"){
			GridObj.AddGroup("HD1",      "賊");							//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
		else if(insel_prty=="03"){
			GridObj.AddGroup("HD1",      "蝶頃");						//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
		else if(insel_prty=="04"){
			GridObj.AddGroup("HD1",      "晦顫薯ヶ");						//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
		else if(insel_prty=="05"){
			//GridObj.AddGroup("HD1",      "鼻ヶ(鳴棻熱, 傢翕 薯諼)");		//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AddGroup("HD1",      "鼻ヶ(寥骯熱, 傢翕 薯諼)");		//SCMぜ 檜蝓辨 渠葬 蹂羶 : 2013-07-04
		}
		else if(insel_prty=="06"){
			//GridObj.AddGroup("HD1",      "鳴棻熱 2L");					//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AddGroup("HD1",      "寥骯熱 2L");					//SCMぜ 檜蝓辨 渠葬 蹂羶 : 2013-07-04
		}
		else if(insel_prty=="061"){
			//GridObj.AddGroup("HD1",      "鳴棻熱 0.5L");				//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AddGroup("HD1",      "寥骯熱 0.6L");					//SCMぜ 檜蝓辨 渠葬 蹂羶 : 2013-07-04
		}
		else if(insel_prty=="07"){
			GridObj.AddGroup("HD1",      "熱轎");						//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
		else if(insel_prty=="08"){
			GridObj.AddGroup("HD1",      "嶸鱔陛奢ヶ(薯ヶ)");						//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
		else if(insel_prty=="09"){
			GridObj.AddGroup("HD1",      "嶸鱔陛奢ヶ(鼻ヶ)");						//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
			GridObj.AppendHeader("HD1", 	 "PROD_1");
			GridObj.AppendHeader("HD1", 	 "SELL_1");
			GridObj.AppendHeader("HD1", 	"STOCK_1");
			GridObj.AppendHeader("HD1", "STOCK_DAY_1");	
			GridObj.AppendHeader("HD1", "SELL_PLAN_1");
		
		
	/* 盪濰擊 嬪и �鰽� 高 */

			GridObj.BoundHeader();	
		
		    GridObj.SetColCellAlign('CNFM_DATE',     'center');
		    GridObj.SetColCellAlign('DAY',           'center');
		    GridObj.SetColCellAlign('PROD_1',         'right');
		    GridObj.SetColCellAlign('SELL_1',         'right'); 
		    GridObj.SetColCellAlign('STOCK_1',        'right');
		    GridObj.SetColCellAlign('STOCK_DAY_1',    'right'); 
		    GridObj.SetColCellAlign('SELL_PLAN_1',    'right');
		    
		    GridObj.SetNumberFormat("PROD_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_1", 		"###,###.#")
		    GridObj.SetNumberFormat("STOCK_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_PLAN_1", "###,###.#");    
		}	
} else {
	 		GridObj.AddHeader("CNFM_DATE"	  ,"橾濠"		   ,"t_text" 	   ,100	    ,80     ,false); //0   
		 	GridObj.AddHeader("DAY"	          ,"蹂橾"	       ,"t_text" 	   ,100	    ,80     ,false); //0
		 	GridObj.AddHeader("CURR_FLAG"	  ,"CURR_FLAG"     ,"t_number" 	   ,100	    ,0      ,false); //0
		 	
		 	GridObj.AddHeader("PROD_1"	      ,"儅骯/衙殮"	   ,"t_number"     ,100.3	,100    ,false); //0
			GridObj.AddHeader("SELL_1"	      ,"っ衙"	       ,"t_number"	   ,100.3	,100    ,false); //0
		 	GridObj.AddHeader("STOCK_1"       ,"營堅"	       ,"t_number"     ,100.3   ,100    ,false); //0
		    GridObj.AddHeader("STOCK_DAY_1"   ,"營堅橾熱"	       ,"t_text"       ,100     ,80     ,false) //0
		    GridObj.AddHeader("SELL_PLAN_1"   ,"っ衙啗��"	       ,"t_number"     ,100.3   ,100    ,false); //0
	   
		/* 檜醞 п渦 蹺陛 */
		
		if(selgubn == "PROD"){
			GridObj.AddGroup("HD1",      in_item_id+" - "+in_item_name);	//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}else if(insel_prty=="02"){
			GridObj.AddGroup("HD1",      "賊");								//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
		else if(insel_prty=="03"){
			GridObj.AddGroup("HD1",      "蝶頃");							//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
		else if(insel_prty=="04"){
			GridObj.AddGroup("HD1",      "晦顫薯ヶ");							//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
		else if(insel_prty=="05"){
			//GridObj.AddGroup("HD1",      "鼻ヶ(鳴棻熱, 傢翕 薯諼)");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AddGroup("HD1",      "鼻ヶ(寥骯熱, 傢翕 薯諼)");			//SCMぜ 檜蝓辨 渠葬 蹂羶 : 2013-07-04
		}
		else if(insel_prty=="06"){
			//GridObj.AddGroup("HD1",      "鳴棻熱 2L");						//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AddGroup("HD1",      "寥骯熱 2L");						//SCMぜ 檜蝓辨 渠葬 蹂羶 : 2013-07-04
		}
		else if(insel_prty=="061"){
			//GridObj.AddGroup("HD1",      "鳴棻熱 0.5L");					//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AddGroup("HD1",      "寥骯熱 0.6L");						//SCMぜ 檜蝓辨 渠葬 蹂羶 : 2013-07-04
		}
		else if(insel_prty=="07"){
			GridObj.AddGroup("HD1",      "熱轎");							//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		}
			GridObj.AppendHeader("HD1", 	 "PROD_1");
			GridObj.AppendHeader("HD1", 	 "SELL_1");
			GridObj.AppendHeader("HD1", 	"STOCK_1");
			GridObj.AppendHeader("HD1", "STOCK_DAY_1");	
			GridObj.AppendHeader("HD1", "SELL_PLAN_1");
		
		
	/* 盪濰擊 嬪и �鰽� 高 */

			GridObj.BoundHeader();	
		
		    GridObj.SetColCellAlign('CNFM_DATE',     'center');
		    GridObj.SetColCellAlign('DAY',           'center');
		    GridObj.SetColCellAlign('PROD_1',         'right');
		    GridObj.SetColCellAlign('SELL_1',         'right'); 
		    GridObj.SetColCellAlign('STOCK_1',        'right');
		    GridObj.SetColCellAlign('STOCK_DAY_1',    'right'); 
		    GridObj.SetColCellAlign('SELL_PLAN_1',    'right');
		    
		    GridObj.SetNumberFormat("PROD_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_1", 		"###,###.#")
		    GridObj.SetNumberFormat("STOCK_1", 		"###,###.#")
		    GridObj.SetNumberFormat("SELL_PLAN_1", "###,###.#");  
}	
}
		//GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
		//Hidden 鏽歲
	//GridObj.SetColHide("CRUD",true);


	// 鏽歲 堅薑

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() {
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';

  	  // var sel_gubn	        = document.frm.sel_gubn.value;
  	   var selgubn 	= document.frm.sel_gubn.value;   
       var insel_prty	    = document.all.insel_prty.value;
	          
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {
	  		 if(selgubn=="PRTY"){
					for(var i=0;i<GridObj.GetRowCount();i++) {
						if(GridObj.GetCellValue('CURR_FLAG',i) == "1" ){  // yellow		GridObj.SetCellBgColor('CNFM_DATE', 	i, '255|255|0');
								if(insel_prty=="01"){
								GridObj.SetCellBgColor('CNFM_DATE',    	i, '255|255|0');
								GridObj.SetCellBgColor('DAY',       	i, '255|255|0');
								GridObj.SetCellBgColor('PROD_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_1', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_1', 	i, '255|255|0');
								GridObj.SetCellBgColor('PROD_2', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_2', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_2', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_2', 	i, '255|255|0');
								
								GridObj.SetCellBgColor('PROD_3', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_3', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_3', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_3', 	i, '255|255|0');	
				  				
				  				GridObj.SetCellBgColor('SELL_PLAN_1', 	i, '255|255|0');
				  				
								GridObj.AddSummaryBar('SUMMARY','м啗','summaryall','sum','PROD_1,SELL_1,STOCK_1,PROD_2,SELL_2,STOCK_2,PROD_3,SELL_3,STOCK_3,SELL_PLAN_1');
				 				GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
				  				
							 } else {
							 	GridObj.SetCellBgColor('CNFM_DATE',    	i, '255|255|0');
								GridObj.SetCellBgColor('DAY',       	i, '255|255|0');
								GridObj.SetCellBgColor('PROD_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('SELL_1', 		i, '255|255|0');
								GridObj.SetCellBgColor('STOCK_1', 		i, '255|255|0');	
								GridObj.SetCellBgColor('STOCK_DAY_1', 	i, '255|255|0');
								GridObj.SetCellBgColor('SELL_PLAN_1', 	i, '255|255|0');
								
				        		GridObj.AddSummaryBar('SUMMARY','м啗','summaryall','sum','PROD_1,SELL_1,STOCK_1,SELL_PLAN_1');
				 				GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
							 }
				  		}
				  	} 
			} else if(selgubn=="PROD"){
			 		for(var i=0;i<GridObj.GetRowCount();i++) {
						if(GridObj.GetCellValue('CURR_FLAG',i) == "1" ){  // yellow		
						// GridObj.SetCellBgColor('CNFM_DATE', 	i, '255|255|0');
					
						GridObj.SetCellBgColor('CNFM_DATE',    	i, '255|255|0');
						GridObj.SetCellBgColor('DAY',       	i, '255|255|0');
						GridObj.SetCellBgColor('PROD_1', 		i, '255|255|0');
						GridObj.SetCellBgColor('SELL_1', 		i, '255|255|0');
						GridObj.SetCellBgColor('STOCK_1', 		i, '255|255|0');	
						GridObj.SetCellBgColor('STOCK_DAY_1', 	i, '255|255|0');
		  				GridObj.SetCellBgColor('SELL_PLAN_1', 	i, '255|255|0');

		           		GridObj.AddSummaryBar('SUMMARY','м啗','summaryall','sum','PROD_1,SELL_1,STOCK_1,SELL_PLAN_1');
		 				GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 

				  		}
					} 
				}
					
		} else { 
					error_msg = GridObj.GetMessage(); 
					alert(error_msg);            
			   }
	}
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  function GoSearch(service){
    var insel_prty	    = document.all.insel_prty.value;
    var in_item_id	    = document.all.in_item_id.value;
    var in_item_name	= document.all.in_item_name.value;
    var sel_gubn 	    = document.frm.sel_gubn.value;

	GridObj = document.WiseGrid;
	GridObj.ClearGrid();
	setHeader(GridObj);    

	
    if(sel_gubn=="PRTY"){
	    if(insel_prty=="01"){
	    	doQuery();
	    }else{
	    	doQuery2();
	    }
	} 
	else if(sel_gubn=="PROD"){
		  doQuery2();
	}
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
 
   
// 等檜攪 盪濰
function GoSave  (service) {

   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

	GridObj.DoQuery(servlet_url, "CRUD");
//	GridObj.DoQuery(servlet_url, "CRUD");
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	// user_id
	
//	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var in_fr_date	    = document.all.in_fr_date.value;   
       var in_to_date	    = document.all.in_to_date.value;
       var in_item_id	    = document.all.in_item_id.value;   
       var in_item_name	    = document.all.in_item_name.value;
       var sel_gubn	        = document.frm.sel_gubn.value;   
       var insel_prty	    = document.all.insel_prty.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",              "search");
       GridObj.SetParam("in_fr_date",      in_fr_date);
       GridObj.SetParam("in_to_date",      in_to_date);
	   GridObj.SetParam("in_item_id",      in_item_id);
       GridObj.SetParam("in_item_name",  in_item_name);
       GridObj.SetParam("sel_gubn",          sel_gubn);
	   GridObj.SetParam("insel_prty",      insel_prty);
	   GridObj.DoQuery(servlet_url);       
   }
   
   function doQuery2() 
   {

       var in_fr_date	    = document.all.in_fr_date.value;   
       var in_to_date	    = document.all.in_to_date.value;
       var in_item_id	    = document.all.in_item_id.value;   
       var in_item_name	    = document.all.in_item_name.value;
       var sel_gubn	        = document.frm.sel_gubn.value;   
       var insel_prty	    = document.all.insel_prty.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",             "search2");
       GridObj.SetParam("in_fr_date",      in_fr_date);
       GridObj.SetParam("in_to_date",      in_to_date);
	   GridObj.SetParam("in_item_id",      in_item_id);
       GridObj.SetParam("in_item_name",  in_item_name);
	   GridObj.SetParam("sel_gubn",          sel_gubn);
	   GridObj.SetParam("insel_prty",      insel_prty);
	   GridObj.DoQuery(servlet_url);       
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )

// 撚 盪濰 瞪羲滲熱
var objTdG;


// 陳瞼 匐儀 POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;	
}

// 陳瞼 匐儀 POP BTN mouseOut
function outBtn( objBtn ) {
	clickedDateIdx = null;	
}

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' ヶ跡褻��

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {
				document.frm.in_item_name.value = arrList[0][1];
			}
			else {// popup 嗥遴棻! 
				openItemPopup();
			}
		}
	});
}

// ヶ跡 POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//褻�裔偶� 鼻鷓 : '01'っ衙醞	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}

// ヶ謙/ヶ跡 radio 摹鷗ж賊, sel_gubn 縑 陝陝 蜃朝 褻�� 褻勒 高擊 厥橫遽棻
function set_sel_gubn(sel_gubn) {
	
	document.frm.sel_gubn.value = sel_gubn;
	if(sel_gubn == "PROD") {
		document.frm.insel_prty.style.display = "none";
		prod.style.display = "block";
	}
	else {
		prod.style.display = "none";
		document.frm.insel_prty.style.display = "block";
	}

}

function GridCellClick(){ //偃羹陛 橈棻朝 螃盟 п唸 掘僥(Service.do)
	
}

// 渦綰 贗葛 : 鼻撮 で機  //醞濰晦 僭榆 薄匐  偃嫦醞
function ltsc_pop_up(row, col, data) {
	
	var selgubn = document.frm.sel_gubn.value;
	//var item_id = '101000105';


	if(selgubn == "PRTY"){ // ヶ謙

		var division	= document.frm.insel_prty.value;
		var week_flag	= '31week';

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&selgubn=" + selgubn + "&division=" + division + "&week_flag=" + week_flag + "&item_id=" + item_id;
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=999, height=700, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);
		//var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();			
					
	}else{ // ヶ跡
		alert("ヶ謙戲煎 摹鷗�� 褻�� ж罹 輿衛晦 夥奧棲棻. ");
		return

		var item_id		= data.split("!%!")[2];
		var	item_name	= data.split("!%!")[3];
		var week_flag	= '31week';
		var selgubn		= document.frm.sel_gubn.value;

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;    
		//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=800, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);    // height=70,  
		//var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();		  
	}
}   