//## Щ煎斜極ID      : ip_01160_PurchaseRequest_Plan.js
//## Щ煎斜極貲      : 嫦輿啗�� 盪濰頂羲 褻��
//## 滲唳濠濠        : 檜鬼遵
//## 偃嫦橾濠        : 2015-06-22
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_07.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-06-22  檜鬼遵      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01160_PurchaseRequest_Plan';

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

	//GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

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
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        
	
	
	GridObj.AddHeader("SALES_CAT03"	       ,"模碟盟"				,"t_text"	   	,100	    ,80     	,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ヶ跡囀萄"			,"t_text" 	   	,100	    ,70     	,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ヶ跡貲"	        	,"t_text" 	   	,100	    ,140    	,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"敘問"	    		,"t_text"  	   	,100		,90     	,false); //0 	
 	GridObj.AddHeader("GUBN"	    	   ,"掘碟"	    		,"t_text"  	   	,100		,80     	,false); //0
 	GridObj.AddHeader("GUBN_IDX"	       ,"掘碟牖憮"	    	,"t_number"  	,100.3		,0      	,false); //0
 	
 	GridObj.AddHeader("WEEK_0"	       	   ,"WEEK"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_1"	       	   ,"W+1"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_2"	       	   ,"W+2"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_3"	       	   ,"W+3"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_4"	       	   ,"W+4"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_5"	       	   ,"W+5"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_6"	       	   ,"W+6"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_7"	       	   ,"W+7"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_8"	       	   ,"W+8"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_9"	       	   ,"W+9"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_10"	       	   ,"W+10"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_11"	       	   ,"W+11"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_12"	       	   ,"W+12"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_13"	       	   ,"W+13"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_14"	       	   ,"W+14"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_15"	       	   ,"W+15"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_16"	       	   ,"W+16"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_17"	       	   ,"W+17"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_18"	       	   ,"W+18"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_19"	       	   ,"W+19"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_20"	       	   ,"W+20"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_21"	       	   ,"W+21"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_22"	       	   ,"W+22"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_23"	       	   ,"W+23"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("WEEK_24"	       	   ,"W+24"   			,"t_number"     ,100.3		,60     	,false); //0
 //	GridObj.AddHeader("WEEK_25"	       	   ,"W+25"   			,"t_number"     ,100.3		,60     	,false); //0
 	GridObj.AddHeader("GAP"	       	   	   ,"っ衙蕨鼻\n螃離徽"   	,"t_number"     ,100.3		,60     	,false); //0	
 	GridObj.AddHeader("TERM"	       	   ,"TERM"   			,"t_number"     ,100.3		,0     		,false); //0
 	GridObj.AddHeader("TP_FLAG"	       	   ,"顫歜も蝶"   		,"t_number"     ,100.3		,0     	,false); //0
 	GridObj.AddHeader("REASON"	       	   ,"盪濰詭撮雖"   		,"t_text"     	,100		,0     	,false); //0
 	GridObj.AddHeader("CNFM_DATE"	       ,"橾濠"				,"t_text"	   	,100	    ,90      	,false); //0	
 	
 
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

	GridObj.SetColFix('GUBN'); 
	
	GridObj.SetColCellAlign('SALES_CAT03',  'left'); 
	GridObj.SetColCellAlign('CNFM_DATE',  	'center');
    GridObj.SetColCellAlign('ITEM_ID',      'left');
    GridObj.SetColCellAlign('ITEM_NAME',    'left');
    GridObj.SetColCellAlign('SPEC',         'left');    
    GridObj.SetColCellAlign('REASON',        'left');  
    
    GridObj.SetNumberFormat("WEEK_0",  		"###,###.#");
    GridObj.SetNumberFormat("WEEK_1",       "###,###.#");  
    GridObj.SetNumberFormat("WEEK_2",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_3",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_4",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_5",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_6",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_7",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_8",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_9",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_10",       "###,###.#");   
    GridObj.SetNumberFormat("WEEK_11",       "###,###.#");  
    GridObj.SetNumberFormat("WEEK_12",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_13",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_14",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_15",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_16",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_17",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_18",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_19",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_20",       "###,###.#");  
    GridObj.SetNumberFormat("WEEK_21",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_22",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_23",       "###,###.#"); 
    GridObj.SetNumberFormat("WEEK_24",       "###,###.#");  
 //   GridObj.SetNumberFormat("WEEK_25",       "###,###.#");  
 
 	GridObj.SetColCellBgColor('WEEK_12',	'178|235|244');
	

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
            	SetGap();
            	SetTimeFence();
            	GridSetGap();
             
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
    	
    	doQuery();
    
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
	function GoSave(service) {	
	
	};


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
   	
   	   SetHeader_grid1();	
       var start_date	    = document.all.start_date.value;
      
       start_date 			= start_date.replace(/-/g,"");
       
       var sales_cat05		= document.all.sales_cat05.value;
 	   var sales_cat03		= document.all.sales_cat03.value;	
	   var user_id			= document.all._user_id.value;
       
       var search_item	    = document.all.search_item.value;              	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
      
       GridObj.SetParam("sales_cat05", sales_cat05);	   
	   GridObj.SetParam("sales_cat03", sales_cat03);	 
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("user_id", 			user_id);	   
	   GridObj.DoQuery(servlet_url);       
   }

function SetHeader_grid1(){
	
	
	var start_date = document.frm.start_date.value;
	var hd_text = new Array();
	var hd_name = 'WEEK_';
	
	commonUtil.getSelQeury( "cnfm_date", start_date  , "ip_01160_PurchaseRequest_Plan_dw1_header",{
	callback:function(result){
		
		for(i=0; i < 25; i++){
			
			var hd_text_name = hd_name + i;			
			GridObj.SetColHDText(hd_text_name,result[i][0]);			
			
		}
			 
		}
	}); 	

}

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
		
		var item_id		= GridObj.GetCellValue('ITEM_ID',nRow);
		var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow);
		var cnfm_date	= GridObj.GetCellValue('CNFM_DATE',nRow);
		var start_date	= document.frm.start_date.value;
		cnfm_date 			= cnfm_date.replace(/-/g,"");	
		start_date			= start_date.replace(/-/g,"");		
			
						
			var service_url = "service.do?_moon_service=ip_01130_import_md_PlanAnalysis_list_pop_check";
			service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + start_date;  
			var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1135, height=790, top=20, left=200";
			var newWin = window.open(service_url, "", pop_win_style);
			newWin.focus();		
			
		

	}

/*Sort 滲熱 摹樹 */

	var flag_item_id = '1';	
	var flag_item_name = '1';
	var flag_po_plan_qty = '1';
	var gap = '1';
	
function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	
	
	GridObj.ClearGroupMerge();
	
	if(strColumnKey == 'ITEM_ID') {
		
		if(flag_item_id =='1'){
			
			GridObj.SetColCellSort('ITEM_ID','descending');
		
			flag_item_id++;
		}
		else if(flag_item_id =='2'){
			
			GridObj.SetColCellSort('ITEM_ID','asceding');
		
			flag_item_id--;
		}
	}
	if(strColumnKey == 'ITEM_NAME') {
		
		if(flag_item_name =='1'){
		
			GridObj.SetColCellSort('ITEM_NAME','descending');
			flag_item_name++;
		}
		else if(flag_item_name =='2'){
			
			GridObj.SetColCellSort('ITEM_NAME','asceding');
			
			flag_item_name--;	
			
		}
	}

	
	//GridSetMerge();
	
		
}



function GridSetMerge(){		
		
		GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME,SPEC,GAP,REASON');
      	GridObj.AddSummaryBar('SUMMARY1', '模啗', 'ITEM_ID', 'sum', '');
 
 	   
 	  	GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'SALES_CAT03', 'sum', 'WEEK_0,WEEK_1,WEEK_2,WEEK_3,WEEK_4,WEEK_5,WEEK_6,WEEK_7,WEEK_8,WEEK_9,WEEK_10,WEEK_11,' +
 	 	'WEEK_12,WEEK_13,WEEK_14,WEEK_15,WEEK_16,WEEK_17,WEEK_18,WEEK_19,WEEK_20,WEEK_21,WEEK_22,WEEK_23,WEEK_24'); 
         
        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//喬儀
 		
 	
}

function GridSetGap(){

	var rowcount = GridObj.GetRowCount();
	var mergecount 	= GridObj.GetMergeCount('ITEM_ID');
	
	for(var y =0 ; y < mergecount ; y++){
		
		var idx		= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',y,false);			//陝 merge欽曖 羅廓簞 row	
		
		for(var j=0; j < 12; j++){
			
			var hd_name = 'WEEK_'+j;
			var expt	= GridObj.GetCellValue(hd_name,idx+2);
			var sale	= GridObj.GetCellValue(hd_name,idx+3);
			var result ;
			if(sale == 0) result 	= 0;
			else		  result	= Math.round(Math.abs(Number(expt)-Number(sale))/Number(expt)*100)/100;
			
			//alert(result);
			
		}
		
	}
	
}

function SetGap(){		
		
		var array = new Array();
		var array_sub = new Array();
		var array_expect = new Array();
		var array_ipgo	 = new Array();
		var mergecount 	= GridObj.GetMergeCount('ITEM_ID');
		
		for(var y =0 ; y < mergecount ; y++){
		
		
		var idx		= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',y,false);			//陝 merge欽曖 羅廓簞 row	
		var term 	= Number(GridObj.GetCellValue('TERM',idx));	
		
		
		/*	WEEK_12陛 渡輿檜棻.WEEK_0擎 婁剪 12輿瞪 */
		/*  殮堅榆 塽 餌辨濠 蕨難榆 撢た  */
		for(var i =0; i <25; i++){
		
			var hd_name = 'WEEK_'+i;			
			array_ipgo[i] 	= GridObj.GetCellValue(hd_name,idx+1);	//殮堅榆 寡翮縑 氬朝棻.
			array_expect[i] = GridObj.GetCellValue(hd_name,idx+2);	//餌辨濠 蕨難榆擊 寡翮縑 氬朝棻.
			
			GridObj.SetCellValue(hd_name,idx+1,0);
			GridObj.SetCellValue(hd_name,idx+2,0);
		
					}
		
		
		if(term > 12) term = 12;
		for(var i =0 ; i <13+Number(term); i++){
			
			var week_idx = 12- term + i ;				
						
			var hd_name = 'WEEK_'+week_idx;		
			
			
			GridObj.SetCellValue(hd_name,idx+1,array_ipgo[i]);
			GridObj.SetCellValue(hd_name,idx+2,array_expect[i]);
			
		}		

		/* 	っ衙榆 牖憮 纂�� - I */
		for(var i =0; i <13; i++){
			
			var hd_name = 'WEEK_'+i;			
			array[i] = GridObj.GetCellValue(hd_name,idx+3);
		
		
			array_sub[12-i] = array[i];
		}		
		
		/* っ衙榆 牖憮 纂�� - II*/		
		for(var j =0; j <13; j++){
			
			var hd_name = 'WEEK_'+j;
			
			GridObj.SetCellValue(hd_name,idx+3,array_sub[j]);
						
		}
		
		/* 離檜榆 啗骯 */		
		for(var k =0 ; k <13 ; k++){
			
			var hd_name = 'WEEK_'+k;
			var expt    = GridObj.GetCellValue(hd_name,idx+2);	//餌辨濠 蕨難
			var sale    = GridObj.GetCellValue(hd_name,idx+3);	//っ衙榆
			
			GridObj.SetCellValue(hd_name,idx+4,sale-expt);
						
		}
		
		/* 晦蟾營堅 �撣� 撢た */var cur = 12;
		
		for(var i = cur; i<24; i++){
			
			var hd_name  = 'WEEK_' + i ;			
			var hd_name1 = 'WEEK_' + (i + Number(1)) ;			
			var cur_stock 	= Number(GridObj.GetCellValue(hd_name,idx));
			var ipgo		= Number(GridObj.GetCellValue(hd_name,idx+1));
			var expt		= Number(GridObj.GetCellValue(hd_name,idx+2));			
			GridObj.SetCellValue(hd_name1,idx,cur_stock + ipgo - expt);
			
			if(cur_stock + ipgo - expt < 0)
			GridObj.SetCellBgColor(hd_name1, idx, '255|54|54');
			
		}
		
		var sum_expt = 0;
		var sum_sale = 0;
		
		/* 螃離徽 啗骯擊 嬪п SUM高 掘ж晦 */
		for(var i =0 ; i <12 ; i++){
			
			var hd_name  = 'WEEK_' + i ;
			var expt    = GridObj.GetCellValue(hd_name,idx+2);	//餌辨濠 蕨難
			var sale    = GridObj.GetCellValue(hd_name,idx+3);	//っ衙榆
			
			sum_expt += Number(expt) ;
			sum_sale += Number(sale) ;			
			
		}		
		
		var gap = Math.round(((sum_expt-sum_sale)/sum_expt)*1000/10) ;
		GridObj.SetCellValue('GAP',idx,gap);
		
	}
	
	
}
/*顫歜も蝶 瞪偃*/
function SetTimeFence(){
	
	
	var hd_name ;
	var fence ;
	var rowcount	= GridObj.GetRowCount();
	
	for(var i =0; i < rowcount; i++){
		fence		= GridObj.GetCellValue('TP_FLAG',i);
		var st 		= Number(fence) + 12;
		
		if(st<25){
			for(var j=st; j<25; j++){
			
			hd_name		= 'WEEK_'+j;				
			GridObj.SetCellBgColor(hd_name,i,'255|255|0');
			}
		}
				
	}
	
}
	
function changeValue(obj){
	
	var sales_cat05 = obj.value;
	var search_type = document.frm.sales_cat03.options;
	

	
	
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

function ExcelImport(){
	
	GridObj.ExcelImport('', 'importall','row', true, true); 
}
