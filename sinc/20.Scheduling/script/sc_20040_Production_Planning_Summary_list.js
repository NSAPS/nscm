//## Щ煎斜極ID      : sc_20040_Production_Planning_Summary_list_new.js
//## Щ煎斜極貲      : 儅骯啗�嘀靘�
//## 滲唳濠濠        : 檜鬼遵
//## 偃嫦橾濠        : 2014-08-18 �倍靺�
//##
//## 婦溼 job file   : job_sinc_20_scheduling_03.xml
//## 婦溼 query file : query_sinc_20_scheduling_03.xml
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_20040_Production_Planning_Summary_list';

var GridObj ; 													// WiseGrid 偌羹
var color_tot 		 = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue   = window.innerWidth;
            maxHeightValue  = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue   += Number(search_h); 
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
	GridObj.strActiveRowBgColor    = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction 	   = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}

function setHeader(GridObj) {        
	
	var param = "work_date!%!job_id";

	var value = document.frm.work_date.value + "!%!"

			  			  + job_id;

	commonUtil.getCodeList(param, value , "sc_20040_Production_Planning_GetDate",defaultHeader); 


}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖

  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.

  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/

function defaultHeader(result){
	
	GridObj.ClearGrid();
	
	var len = result.length;
	
	
	GridObj.AddHeader("PLANT_ID"	      	  ,"奢濰廓��"	    ,"t_text"      ,100	    ,0     ,false); //0
	GridObj.AddHeader("HID_NAME"	      	  ,"儅骯奢濰"	    ,"t_text"      ,100	    ,80     ,false); //0
	GridObj.AddHeader("ITEM_ID"	     		  ,"薯ヶ囀萄"		,"t_text"	   ,80	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_NAME"	          ,"薯ヶ貲"			,"t_text" 	   ,100	    ,265    ,false); //0   
 	//GridObj.AddHeader("PROC_ID"	          	  ,"濛機濰囀萄"		,"t_text" 	   ,100	    ,0    ,false); //0 
 	//GridObj.AddHeader("PROC_NAME"	          ,"濛機濰貲"		,"t_text" 	   ,100	    ,0    ,false); //0 
 	GridObj.AddHeader("SPEC"	     	  	  ,"SPEC"	        ,"t_text" 	   ,100	    ,120    ,false); //0	
 	GridObj.AddHeader("GUBN"	    	   		,"掘碟"	    	,"t_text"  	   ,100		,50     ,false); //0
	
   // ④渦 儅撩
		
	   for( var i=0 ;i<len ;i++) //瞪羹 Row虜躑 奩犒 и棻.

   {

       GridObj.AddHeader("DAY"+i+"_1"	 	,"褻"	,"t_number"    ,100.3	,70     ,false); //0
       GridObj.AddHeader("DAY"+i+"_2"	 	,"輿"	,"t_number"    ,100.3	,70     ,false); //0
       GridObj.AddHeader("DAY"+i+"_3"	 	,"撿"	,"t_number"    ,100.3	,70     ,false); //0
      

    }
	  GridObj.AddHeader("WEEK_SUM"	  ,"輿除啗"	,"t_number"    ,100.3	,80     ,false); //0
	  
	 /* 檜醞 п渦 蹺陛 */
	GridObj.AddGroup	("MON",    	result[0]);			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("MON",	  	  "DAY0_1");
	GridObj.AppendHeader("MON",   	  "DAY0_2");
	GridObj.AppendHeader("MON",		  "DAY0_3");
	GridObj.AddGroup	("TUE",    	result[1]);			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("TUE",	  	  "DAY1_1");
	GridObj.AppendHeader("TUE",   	  "DAY1_2");
	GridObj.AppendHeader("TUE",		  "DAY1_3");
	GridObj.AddGroup	("WED",    	result[2]);			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("WED",	  	  "DAY2_1");
	GridObj.AppendHeader("WED",   	  "DAY2_2");
	GridObj.AppendHeader("WED",		  "DAY2_3");
	GridObj.AddGroup	("THR",    	result[3]);			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("THR",	  	  "DAY3_1");
	GridObj.AppendHeader("THR",   	  "DAY3_2");
	GridObj.AppendHeader("THR",		  "DAY3_3");
	GridObj.AddGroup	("FRI",    	result[4]);			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("FRI",	  	  "DAY4_1");
	GridObj.AppendHeader("FRI",   	  "DAY4_2");
	GridObj.AppendHeader("FRI",		  "DAY4_3");
	GridObj.AddGroup	("SAT",    	result[5]);			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("SAT",	  	  "DAY5_1");
	GridObj.AppendHeader("SAT",   	  "DAY5_2");
	GridObj.AppendHeader("SAT",		  "DAY5_3");
	GridObj.AddGroup	("SUN",    	result[6]);			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("SUN",	  	  "DAY6_1");
	GridObj.AppendHeader("SUN",   	  "DAY6_2");
	GridObj.AppendHeader("SUN",		  "DAY6_3");
	
	 
	 
      GridObj.BoundHeader();  
    
    GridObj.SetColCellAlign('PLANT_ID',              'center');  
    GridObj.SetColCellAlign('HID_NAME',              'center'); 
    GridObj.SetColCellAlign('ITEM_ID',               'center');
    GridObj.SetColCellAlign('ITEM_NAME',        	   'left');
    //GridObj.SetColCellAlign('PROC_NAME',        	   'left');
    GridObj.SetColCellAlign('SPEC',        	  		 'center');
    GridObj.SetColCellAlign('WEEK_SUM',        	      'right');
    GridObj.SetColCellAlign('GUBN',              'center');  
    
    	for( var i=0 ;i<len ;i++) {
    		 GridObj.SetColCellAlign("DAY"+i+"_1"	,         'right');
    		 GridObj.SetColCellAlign("DAY"+i+"_2"	,         'right');
    		 GridObj.SetColCellAlign("DAY"+i+"_3"	,         'right');
       		 GridObj.SetNumberFormat("DAY"+i+"_1"	,     	  "###,###.#");
       		 GridObj.SetNumberFormat("DAY"+i+"_2"	,     	  "###,###.#");
       		 GridObj.SetNumberFormat("DAY"+i+"_3"	,     	  "###,###.#");
    	}
   
    GridObj.SetNumberFormat("WEEK_SUM",     	  "###,###.#");
	
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
              	GridObj.SetGroupMerge('PLANT_ID,HID_NAME'); 
              	GridObj.AddSummaryBar('SUMMARY1', '奢濰滌 м啗', 'HID_NAME', 'sum', 'DAY0_1,DAY0_2,DAY0_3,DAY1_1,DAY1_2,DAY1_3,DAY2_1,DAY2_2,DAY2_3,DAY3_1,DAY3_2,DAY3_3,'
              	+'DAY4_1,DAY4_2,DAY4_3,DAY5_1,DAY5_2,DAY5_3,DAY6_1,DAY6_2,DAY6_3,WEEK_SUM');
	      	  	GridObj.AddSummaryBar('SUMMARY2', '瞪羹 м啗', 'summaryall', 'sum', 'DAY0_1,DAY0_2,DAY0_3,DAY1_1,DAY1_2,DAY1_3,DAY2_1,DAY2_2,DAY2_3,DAY3_1,DAY3_2,DAY3_3,'
	      	  	+'DAY4_1,DAY4_2,DAY4_3,DAY5_1,DAY5_2,DAY5_3,DAY6_1,DAY6_2,DAY6_3,WEEK_SUM');
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);

                     
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
        checkCellColor();   //褻�� �� Hidden高檜 Y檣, 闊 瞪輿 跡蹂橾 檜�� 滲唳脹 螃渦 CELL曖 唳辦 儀鼻滲唳
		
    }


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service) 
   {
   	var item_type	= document.all.item_type.value;	
	var	search_type = document.frm.search_type.value; 	//	褻�蛻納�
   	
   	if(item_type == null || item_type == ""){
		//alert("褻�蛻納�擊 摹鷗ж褊衛蹂!");
   		//return
   	}
	var param = "work_date!%!job_id";

	var value = document.frm.work_date.value + "!%!"

			  			  + job_id;

	commonUtil.getCodeList(param, value , "sc_20040_Production_Planning_GetDate",defaultHeader); 
   	
    doQuery();
   }


// 等檜攪 盪濰
function GoSave  (service) {

   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);  	// user_id

	GridObj.DoQuery(servlet_url, "CRUD");
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	// user_id
	
//	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var work_date	    = document.all.work_date.value;
       var item_type	    = document.all.item_type.value;   
       var domain			= document.all.domain.value;
       var search_type	    = document.all.search_type.value;
       var multi_flag		= document.all.multi_flag.value;
       var box_flag			= document.all.box_flag.value;
       var sum_type			= document.all.sum_type.value;   
       var search_item	    = document.all.search_item.value;
       var week				= document.all.week.value;
       var mto_gubn			= document.all.mto_gubn.value;			//MTO/MTS
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("work_date",   work_date);
       GridObj.SetParam("item_type",       item_type);
	   GridObj.SetParam("domain",     domain);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("multi_flag", multi_flag);
	   GridObj.SetParam("box_flag", box_flag);
	   GridObj.SetParam("sum_type", sum_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("week", week);
	   GridObj.SetParam("mto_gubn",		mto_gubn);	
	   GridObj.DoQuery(servlet_url);    
	   
	   
   }

function checkCellColor(){
	
	
	var len = GridObj.GetRowCount();

	
	for (var i=0; i<len; i++){
		
		var day0_1 =	GridObj.GetCellHiddenValue('DAY0_1',i);
		var day0_2 =	GridObj.GetCellHiddenValue('DAY0_2',i);
		var day0_3 =	GridObj.GetCellHiddenValue('DAY0_3',i);
		var day1_1 =	GridObj.GetCellHiddenValue('DAY1_1',i);
		var day1_2 =	GridObj.GetCellHiddenValue('DAY1_2',i);
		var day1_3 =	GridObj.GetCellHiddenValue('DAY1_3',i);
		var day2_1 =	GridObj.GetCellHiddenValue('DAY2_1',i);
		var day2_2 =	GridObj.GetCellHiddenValue('DAY2_2',i);
		var day2_3 =	GridObj.GetCellHiddenValue('DAY2_3',i);
		var day3_1 =	GridObj.GetCellHiddenValue('DAY3_1',i);
		var day3_2 =	GridObj.GetCellHiddenValue('DAY3_2',i);
		var day3_3 =	GridObj.GetCellHiddenValue('DAY3_3',i);
		var day4_1 =	GridObj.GetCellHiddenValue('DAY4_1',i);
		var day4_2 =	GridObj.GetCellHiddenValue('DAY4_2',i);
		var day4_3 =	GridObj.GetCellHiddenValue('DAY4_3',i);
		var day5_1 =	GridObj.GetCellHiddenValue('DAY5_1',i);
		var day5_2 =	GridObj.GetCellHiddenValue('DAY5_2',i);
		var day5_3 =	GridObj.GetCellHiddenValue('DAY5_3',i);
		var day6_1 =	GridObj.GetCellHiddenValue('DAY6_1',i);
		var day6_2 =	GridObj.GetCellHiddenValue('DAY6_2',i);
		var day6_3 =	GridObj.GetCellHiddenValue('DAY6_3',i);
	
		
		
		if( day0_1 == 'Y')
		GridObj.SetCellBgColor('DAY0_1',i,'255|228|0');
		if( day0_2 == 'Y')
		GridObj.SetCellBgColor('DAY0_2',i,'255|228|0');
		if( day0_3 == 'Y')
		GridObj.SetCellBgColor('DAY0_3',i,'255|228|0');
		if( day1_1 == 'Y')
		GridObj.SetCellBgColor('DAY1_1',i,'255|228|0');
		if( day1_2 == 'Y')
		GridObj.SetCellBgColor('DAY1_2',i,'255|228|0');
		if( day1_3 == 'Y')
		GridObj.SetCellBgColor('DAY1_3',i,'255|228|0');
		if( day2_1 == 'Y')
		GridObj.SetCellBgColor('DAY2_1',i,'255|228|0');
		if( day2_2 == 'Y')
		GridObj.SetCellBgColor('DAY2_2',i,'255|228|0');
		if( day2_3 == 'Y')
		GridObj.SetCellBgColor('DAY2_3',i,'255|228|0');
		if( day3_1 == 'Y')
		GridObj.SetCellBgColor('DAY3_1',i,'255|228|0');
		if( day3_2 == 'Y')
		GridObj.SetCellBgColor('DAY3_2',i,'255|228|0');
		if( day3_3 == 'Y')
		GridObj.SetCellBgColor('DAY3_3',i,'255|228|0');
		if( day4_1 == 'Y')
		GridObj.SetCellBgColor('DAY4_1',i,'255|228|0');
		if( day4_2 == 'Y')
		GridObj.SetCellBgColor('DAY4_2',i,'255|228|0');
		if( day4_3 == 'Y')
		GridObj.SetCellBgColor('DAY4_3',i,'255|228|0');
		if( day5_1 == 'Y')
		GridObj.SetCellBgColor('DAY5_1',i,'255|228|0');
		if( day5_2 == 'Y')
		GridObj.SetCellBgColor('DAY5_2',i,'255|228|0');
		if( day5_3 == 'Y')
		GridObj.SetCellBgColor('DAY5_3',i,'255|228|0');
		if( day6_1 == 'Y')
		GridObj.SetCellBgColor('DAY6_1',i,'255|228|0');
		if( day6_2 == 'Y')
		GridObj.SetCellBgColor('DAY6_2',i,'255|228|0');
		if( day6_3 == 'Y')
		GridObj.SetCellBgColor('DAY6_3',i,'255|228|0');

		
	}
	
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridCellDblClick(strColumnKey, nRow){

}

  