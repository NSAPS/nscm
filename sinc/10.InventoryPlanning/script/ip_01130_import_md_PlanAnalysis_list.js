//## Щ煎斜極ID      : ip_01130_import_md_PlanAnalysis_list.js
//## Щ煎斜極貲       : 熱殮 鼻ヶ 嫦輿 婦葬
//## 滲唳濠           : 檜鬼遵
//## 偃嫦橾濠         : 2015-03-18 
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_07.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-03-18  檜鬼遵      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01130_import_md_PlanAnalysis_list';

var GridObj ; 													// WiseGrid 偌羹
var color_tot 		 = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';			//塭檣 摹鷗 寡唳儀 
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
	
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj.nHDLineSize         = 10; //Header Size
    //GridObj.bHDMoving = true;		// 鏽歲 ④渦 嬪纂 檜翕
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; 	//Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj.strActiveRowBgColor    = "232|245|213";     //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction 	   = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {       
	
	
	var cnfm_date = document.all.cnfm_date.value;

	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "ip_01130_import_md_PlanAnalysis_list_header",{
	callback:function(result){

	  	//GridObj.AddHeader("CRUD"		   	  ,"CRUD"   			,"t_text"  	   ,100		,0  	,false); //0
	  	GridObj.AddHeader("SALES_CAT05"	      ,"渠碟盟"	    		,"t_text"      ,100	    ,0     ,false); //0
		GridObj.AddHeader("SALES_CAT03"	      ,"模碟盟"	    		,"t_text"      ,100	    ,70     ,false); //0
		GridObj.AddHeader("ITEM_ID"	          ,"ヶ跡囀萄"			,"t_text" 	   ,100	    ,70     ,false); //0   
	 	GridObj.AddHeader("ITEM_NAME"	      ,"ヶ跡貲"	        	,"t_text" 	   ,100	    ,180    ,false); //0
	 	
	 	//GridObj.AddHeader("AVL_STOCK"	      ,"識陛辨營堅"		,"t_number"    ,100.3	,70     ,false); //0 	
	 	//GridObj.AddHeader("NS_STOCK"	      ,"晦蟾營堅"	 	,"t_number"    ,100.3	,70     ,false); //0
	 	//GridObj.AddHeader("EXP_STOCK"	      ,"餌諼營堅"   		,"t_number"    ,100.3	,70     ,false); //0
	 	GridObj.AddHeader("GUBN"  		      ,"掘碟"				,"t_text"      ,100		,80     ,false); //0
	 	GridObj.AddHeader("GUBN_IDX"  		  ,"掘碟牖憮"			,"t_text"      ,100		,0      ,false); //0
	 	GridObj.AddHeader("NO_FLAG"  		  ,"薯ヶ掘碟"			,"t_text"      ,100		,0      ,false); //0
	 	GridObj.AddHeader("THREE_MON"  		  ,"3偃錯ゎ敕"			,"t_text"      ,100		,0      ,false); //0
	 	GridObj.AddHeader("BOX_CUM"  		  ,"援啗"				,"t_number"    ,100.3	,60      ,false); //0		
 

			for(var i=0 ; i < 32 ; i++){  
				if(i < result.length) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" ,100.3	,60  	,true);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 32) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" ,100.3	,60  	,true);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" ,100.3	,60 	,true);
					}
				}
			}
		GridObj.AddHeader("TP_FLAG"	       	  ,"顫歜も蝶"   			,"t_number"    ,100.3	,0     ,false); //0	
		GridObj.AddHeader("TIMEFANCE_SORT"	  ,"TIMEFANCE_SORT"   	,"t_number"    ,100.3	,0     ,false); //0
		GridObj.BoundHeader();
		
		//GridObj.SetNumberFormat("AVL_STOCK",       	"###,###.#");
	    //GridObj.SetNumberFormat("NS_STOCK",     	"###,###.#");
	    //GridObj.SetNumberFormat("EXP_STOCK",        "###,###.#");
	    GridObj.SetNumberFormat("BOX_CUM",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_5",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_4",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_3",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_2",       	"###,###.#");
	    GridObj.SetNumberFormat("MONTH_1",       	"###,###.#");
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
	    
	    GridObj.SetColFix('ITEM_NAME'); 
		GridObj.SetColCellAlign('SALES_CAT05',        'left');
		GridObj.SetColCellAlign('SALES_CAT03',        'left');
	    GridObj.SetColCellAlign('ITEM_ID',            'left');
	  	GridObj.SetColCellAlign('ITEM_NAME',          'left');
	    
	    GridObj.SetColCellBgColor('MONTH_5','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_4','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_3','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_2','255|253|208');
	    GridObj.SetColCellBgColor('MONTH_1','255|253|208');
	   
		//GridObj.SetColHide("CRUD", true); 
		//GridObj.SetCRUDMode("CRUD"); 			
		
		}
		
	});
 	
 	
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
            	
            	var row = GridObj.GetRowCount();            	
            	if (row == 0) return;
            	
            	GridSetMerge(); 
            	SetThreeMonth();            	
            	GridSetStock();
            	SetTimeFence();
            	CheckStock(); 
            	CalBoxCum();           	           	
             
            } else    
            { 
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
   function GoSearch(service) 
   {
   
   	var search_type = document.frm.search_type.value;
  
//	if( search_type == "" || search_type == null || search_type == 00 ) {
//		alert("粽楠萄 嶸⑽擊 摹鷗ж褊衛蹂!");
//		return;
//	}   	
   	
   
    doQuery();
   }




/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var cnfm_date	    = document.all.cnfm_date.value;      
       cnfm_date 			= cnfm_date.replace(/-/g,"");
     
	   var user_id			= document.all._user_id.value;         
       var search_type	    = document.all.search_type.value;		//粽楠萄 嶸⑽
       var sales_cat05		= document.all.sales_cat05.value;
       //var search_item		= document.all.search_item.value;       //匐儀橫
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           	"search");
       GridObj.SetParam("cnfm_date",  		cnfm_date);
       GridObj.SetParam("user_id",       	user_id);
       GridObj.SetParam("search_type",  	search_type);	
       GridObj.SetParam("sales_cat05",  	sales_cat05);	
	   //GridObj.SetParam("search_item",  	search_item);	   
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

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridCellDblClick(strColumnKey, nRow){
	
	var user_id		= document.all._user_id.value; 
	var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
	var cnfm_date	= document.frm.cnfm_date.value;
	var no_flag		= GridObj.GetCellValue('NO_FLAG',nRow);	
	var three_mon   = GridObj.GetCellValue('THREE_MON',nRow);	
	
	var service_url = "service.do?_moon_service=ip_01130_import_md_PlanAnalysis_list_pop";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date + "&no_flag=" + no_flag + "&three_mon=" + three_mon + "&user_id=" + user_id;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=1135, height=740, top=50, left=200";
	var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();			
	
}

function HeaderClick(strColumnKey){
	
}

function GridChangeCell(strColumnKey, nRow, vtOldValue, vtNewValue){
	
//	if(strColumnKey == 'WEEK_0'){
//		
//		var start_hd_name	= 'WEEK_0';
//		var hd_name 		= start_hd_name;
//		var hd_name_1 		= start_hd_name.substr(0,5);
//		var hd_name_2 		= start_hd_name.substr(5,6);
//		
//			for(var i=0; i<26; i++){
//				
//				hd_name_2 = Number(hd_name_2)+Number(1);						
//				hd_name = hd_name_1+hd_name_2;
//			
//				GridObj.SetCellValue(hd_name, nRow,  vtNewValue);
//			}
//		
//	}
	
	GridSetStock();
	
	CheckStock();
}	

/*營堅 �撣尾�偃 Default*/
function GridSetStock(){
	
	var cur_stock;
	var reciept_expt;
	var sales_expt;
	var next_stock;	
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID');   //模啗 檣策蝶 掘ж晦
	for (var i=0; i<rowcount; i++){
		
		var start_hd_name	= 'WEEK_0';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,5);
		var hd_name_2 		= start_hd_name.substr(5,6);
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		
		
		for(var j =0; j < 26; j++){
			
			cur_stock 		= GridObj.GetCellValue(hd_name,idx);
			reciept_expt 	= GridObj.GetCellValue(hd_name,idx+1);
			sales_expt		= GridObj.GetCellValue(hd_name,idx+2);
			
			next_stock		= Number(cur_stock) + Number(reciept_expt) - Number(sales_expt);
			
			hd_name_2 	= Number(hd_name_2)+Number(1);						
			hd_name 	= hd_name_1+hd_name_2;
			
			GridObj.SetCellValue(hd_name, idx,  next_stock);
			
		}			
	}		
}

/*褐薯ヶ 3偃錯 ゎ敕 瞪偃*/
function SetThreeMonth(){
	
	var rowcount = GridObj.GetRowCount();
	
	
	var date = new Date();	
	var remain_day = Number(8) - date.getDay();	
	
	for(var i=0; i<rowcount; i++){
		
		var flag = GridObj.GetCellValue('NO_FLAG',i);
		if(flag == "NEW") {
			
			GridObj.SetCellBgColor('GUBN', i , '212|244|250');
			GridObj.SetCellValue('GUBN',i,'3偃錯 輿ゎ敕');
			for(var j=0; j<27; j++){
			
				hd_name = 'WEEK_' + j ;
				if(GridObj.GetCellValue(hd_name,i)==0){
					
					if(hd_name == 'WEEK_0') GridObj.SetCellValue(hd_name,i,Math.round(GridObj.GetCellValue('THREE_MON',i)/Number(7) * remain_day ,0));
					else GridObj.SetCellValue(hd_name,i,GridObj.GetCellValue('THREE_MON',i));
					
				}
			
			}
		}
	}
	
	var mergecount = GridObj.GetMergeCount('ITEM_ID');   //模啗 檣策蝶 掘ж晦
	
    for (var i=0; i<mergecount; i++){
     	
     	var no_flag = GridObj.GetCellValue('NO_FLAG',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(2));		//陝 Merge 欽曖 羅 廓簞 Row 高擊 嫡嬴螞棻.
     	GridObj.SetCellValue('NO_FLAG',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false),no_flag);
     	GridObj.SetCellValue('NO_FLAG',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(1),no_flag);
     	
     	var no_flag = GridObj.GetCellValue('THREE_MON',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(2));		//陝 Merge 欽曖 羅 廓簞 Row 高擊 嫡嬴螞棻.
     	GridObj.SetCellValue('THREE_MON',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false),no_flag);
     	GridObj.SetCellValue('THREE_MON',GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false)+Number(1),no_flag);
     
      	   
     }
     
     
}

/*顫歜も蝶 瞪偃*/
function SetTimeFence(){		
	
	var hd_name ;
	var fence ;
	var rowcount	= GridObj.GetRowCount();
	
	for(var i =0; i < rowcount; i++){
		fence		= GridObj.GetCellValue('TP_FLAG',i);
		
		
		for(var j=fence; j<27; j++){
			
			hd_name		= 'WEEK_'+j;				
			GridObj.SetCellBgColor(hd_name,i,'255|255|0');
		}
					
	}
	
}

function CheckStock(){
	
	var rowcount = GridObj.GetRowCount();
	
	
	for( var j =0; 3*j < rowcount; j++){
			
			for (var i =0; i < 27; i++){
				
					var hd_name = 'WEEK_'+ i ;
					var stock 	 = GridObj.GetCellValue(hd_name, j * 3);
					var tp_flag  = GridObj.GetCellValue('TP_FLAG',j * 3);
					if (stock < 0) {
						
							if ( i < tp_flag) {
								GridObj.SetCellBgColor(hd_name, j * 3 , '255|54|54');
								GridObj.SetCellBgColor('ITEM_ID', j * 3 , '255|54|54');
								
								GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 , tp_flag - i );
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 , tp_flag - i );	
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 , tp_flag - i );							
								
							}
							else{
								
								GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 ,  tp_flag - i );
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 ,  tp_flag - i );	
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 ,  tp_flag - i );	
							}		
						break;
								
					}
					GridObj.SetCellValue('TIMEFANCE_SORT', j * 3 ,  -99 );
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+1 ,  -99 );	
								GridObj.SetCellValue('TIMEFANCE_SORT', (j * 3)+2 ,  -99 );	
			}	
	}
	
	
	
}

function sort(){
	
	GridObj.ClearGroupMerge();
	GridObj.SetColCellSort('TIMEFANCE_SORT','descending');
	GridSetMerge();
}

function GridSetMerge(){

	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME');
    GridObj.AddSummaryBar('SUMMARY1', '模啗', 'ITEM_ID', 'sum', ''); 
    GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', '');      
    
    
//        GridObj.SetSummaryBarFunction('SUMMARY1','sum','WEEK_0');
    
//    var summary_avl = 0;
//    var summary_ns 	= 0;
//    var summary_exp = 0;
//    
//    var rowcount = GridObj.GetMergeCount('ITEM_ID');   //模啗 檣策蝶 掘ж晦
//    for (var i=0; i<rowcount; i++){
//     	
//     	var AVL_STOCK = GridObj.GetCellValue('AVL_STOCK',GridObj.GetRowIndexFromMergeIndex('AVL_STOCK',i,false));		//陝 Merge 欽曖 羅 廓簞 Row 高擊 嫡嬴螞棻.
//     	var NS_STOCK  = GridObj.GetCellValue('NS_STOCK',GridObj.GetRowIndexFromMergeIndex('NS_STOCK',i,false));
//     	var EXP_STOCK = GridObj.GetCellValue('EXP_STOCK',GridObj.GetRowIndexFromMergeIndex('EXP_STOCK',i,false));
//     	    	
//       	GridObj.SetSummaryBarValue('SUMMARY1','AVL_STOCK'	,i, AVL_STOCK );
//       	GridObj.SetSummaryBarValue('SUMMARY1','NS_STOCK'	,i, NS_STOCK );
//       	GridObj.SetSummaryBarValue('SUMMARY1','EXP_STOCK'	,i, EXP_STOCK );
//     	    
//      	summary_avl += Number(GridObj.GetSummaryBarValue('SUMMARY1','AVL_STOCK',i,false));   
//      	summary_ns 	+= Number(GridObj.GetSummaryBarValue('SUMMARY1','NS_STOCK',i,false)); 
//      	summary_exp += Number(GridObj.GetSummaryBarValue('SUMMARY1','EXP_STOCK',i,false));  
//      	   
//     }
//    
//	GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'custom', 'AVL_STOCK,NS_STOCK,EXP_STOCK,MONTH_5,MONTH_4,MONTH_3,MONTH_2,MONTH_1,WEEK_1,WEEK_2,WEEK_3,' +
//	'WEEK_4,WEEK_5,WEEK_6,WEEK_7,WEEK_8,WEEK_9,WEEK_10,WEEK_11,WEEK_12,WEEK_13');
//	
////   		GridObj.SetSummaryBarFunction('SUMMARY2','sum','WEEK_0');
//	
//	GridObj.SetSummaryBarValue('SUMMARY2','AVL_STOCK'	,0, summary_avl );
//	GridObj.SetSummaryBarValue('SUMMARY2','NS_STOCK'	,0, summary_ns );
//	GridObj.SetSummaryBarValue('SUMMARY2','EXP_STOCK'	,0, summary_exp );
       
	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
}


function CalBoxCum(){
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID'); 
	
	for (var i =0; i < rowcount; i ++){		
		
		var start_hd_name	= 'WEEK_0';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,5);
		var hd_name_2 		= start_hd_name.substr(5,6);
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		var box_cum			= 0;
		
		
		for(var j =0; j < 27; j++){
			
			cur_stock 		= GridObj.GetCellValue(hd_name,idx);
			reciept_expt 	= GridObj.GetCellValue(hd_name,idx+1);
			sales_expt		= GridObj.GetCellValue(hd_name,idx+2);
			
			box_cum	+= Number(sales_expt);
			
			hd_name_2 	= Number(hd_name_2)+Number(1);						
			hd_name 	= hd_name_1+hd_name_2;
			
			
			
		}			
		GridObj.SetCellValue('BOX_CUM', idx+2,  box_cum);
	}
	
}

function changeValue(obj){
	
	var sales_cat05 = obj.value;
	var search_type = document.frm.search_type.options;
	

	
	
	commonUtil.getSelQeury( "sales_cat05", sales_cat05, "ip_01130_import_md_PlanAnalysis_list_combo",{
	callback:function(result){
			
			//褫暮 雖辦晦 ⑷營 select option 偎熱虜躑
			for(var i = search_type.length-1 ; i >=1 ; i--){
		
		   		search_type.options[i] =null;
		  	}
			
			//褫暮 瓣辦晦 result 偎熱虜躑虜
			for(var i=0; i<result.length ; i++) {
	 
	   		search_type.options[i+1] = new Option(result[i][1],result[i][0]);
	  		}
			
				
		
		}
		
	});
	
	
}

