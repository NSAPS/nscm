//## Щ煎斜極ID      : ip_01120_Jgc_inventoryPlanAnalysis_list_expert.js
//## Щ煎斜極貲       :  濰晦羹�� ヶ跡碟戮
//## 滲唳濠            : 檜鬼遵
//## 偃嫦橾濠        :  2015-09-22 
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01120_Jgc_inventoryPlanAnalysis_list_expert';

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
	//GridObj.bHDMoving = true;		// 鏽歲 ④渦 嬪纂 檜翕

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

	
	
 	GridObj.AddHeader("SALES_CAT03"	       ,"濠營斜瑜"	    ,"t_text"      ,100	    ,70     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           ,"ヶ跡囀萄"		,"t_text" 	   ,100	    ,60     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ヶ跡貲"	        ,"t_text" 	   ,100	    ,260    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   ,"敘問"	    	,"t_text"  	   ,100		,90     ,false); //0
 	GridObj.AddHeader("GUBN"	    	   ,"樓撩"	    	,"t_text"  	   ,100		,50     ,false); //0
 	GridObj.AddHeader("JGC_OCCUR"	       ,"濰晦羹�苒n嫦儅營堅"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("SALES_PRE"	       ,"瞪橾啗"	    		,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("SALES_CUR"	       ,"橾啗"       		,"t_number"    ,100.3	,70     ,false); //0
    GridObj.AddHeader("BUDU_QTY"	   	   ,"援啗"				,"t_number"    ,100.3	,70     ,false); //0 	
 	GridObj.AddHeader("JGC_STOCK"	       ,"濰晦羹�苒n濤罹營堅"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("JGC_START_DATE"	   ,"濰晦羹�苒n嫦儅橾"	,"t_text"      ,100		,70     ,false); //0
 	GridObj.AddHeader("PROD_TERM"     	   ,"儅骯\n唳婁橾熱"		,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("TERM_VAL_REMAIN"    ,"嶸鱔晦и\n濤罹橾"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("TERM_VAL"  		   ,"嶸鱔晦и"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("TERM_PER"  		   ,"嶸鱔晦и\n唳婁徽"	,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("JGC_PROD_DATE"	   ,"濰晦羹�苒n儅骯橾"	,"t_text"      ,100		,70     ,false); //0
 	GridObj.AddHeader("STOCK_DAY"  		   ,"營堅橾熱"			,"t_number"    ,100.3	,0     ,false); //0	
    GridObj.AddHeader("SALES_MEAN_1WEEK"    ,"1輿ゎ敕"			,"t_number"    ,100.3	,0     ,false); //0
    GridObj.AddHeader("SALES_MEAN_3WEEK"    ,"3輿ゎ敕"			,"t_number"    ,100.3	,0     ,false); //0
 	GridObj.AddHeader("GYR"    				,"GYR"				,"t_text"      ,100		,0     ,false); //0
 	//GridObj.AddHeader("REAL_STOCK"    		,"REAL_STOCK"				,"t_number"      ,100.3		,70     ,false); //0
  
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 
	
	
    GridObj.SetColCellAlign('SALES_CAT03',        	'left');
    GridObj.SetColCellAlign('TERM_PER',     		'right'); 
	GridObj.SetColCellAlign('GUBN',     			'center'); 
	GridObj.SetColCellAlign('JGC_PROD_DATE',     	'center'); 
	GridObj.SetColCellAlign('JGC_START_DATE',     	'center'); 
    GridObj.SetNumberFormat("JGC_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("JGC_OCCUR",       "###,###.#");
    GridObj.SetNumberFormat("BUDU_QTY",        "###,###.#");    
    GridObj.SetNumberFormat("SALES_PRE",       "###,###.#");
    GridObj.SetNumberFormat("SALES_CUR",       "###,###.#");   
    GridObj.SetNumberFormat("PROD_TERM",       "###,###.#");
    

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
            	GridGYR();
             
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
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	
};





/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");
       var end_date			= document.frm.end_date.value.replace(/-/g,"");;
       var mto_gubn			= document.all.mto_gubn.value;
	   var user_id			= document.all._user_id.value;     
       var search_type	    = document.all.search_type.value;       
       var search_item	    = document.all.search_item.value;     	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
      
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);  
       GridObj.SetParam("end_date",		  end_date); 
       GridObj.SetParam("mto_gubn",		mto_gubn);	 
	   GridObj.SetParam("search_type", search_type);	   
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("user_id", 			user_id);
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


/*Sort 滲熱 摹樹 */

	var flag_item_id = '1';	
	var flag_item_name = '1';
	var flag_jgc_stock = '1';	
	var flag_sales_pre = '1';
	var flag_sales_cur = '1';	
	
	var flag_jgc_occur = '1';
	var flag_budu_qty = '1';
	var flag_jgc_start_date = '1';
	var flag_jgc_prod_date = '1';
	var flag_term_val_Remain = '1';
	var flag_gubn	= '1';
	
	
	var flag_prod_term = '1';	
	var flag_term_per = '1';
	var flag_term_val = '1';
	var flag_stock_day = '1';
	var flag_sales_mean_3week = '1';
	var flag_sales_mean_1week = '1';



function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('GUBN'				,true);
	GridObj.SetColCellSortEnable('JGC_OCCUR'		,true);
	GridObj.SetColCellSortEnable('SALES_PRE'		,true);
	GridObj.SetColCellSortEnable('SALES_CUR'		,true);
	GridObj.SetColCellSortEnable('BUDU_QTY'			,true);
	GridObj.SetColCellSortEnable('JGC_STOCK'		,true);
	GridObj.SetColCellSortEnable('JGC_START_DATE'		,true);
	GridObj.SetColCellSortEnable('TERM_VAL_REMAIN'		,true);
	GridObj.SetColCellSortEnable('JGC_PROD_DATE'		,true);	
	GridObj.SetColCellSortEnable('STOCK_DAY'		,true);
	GridObj.SetColCellSortEnable('PROD_TERM'		,true);
	GridObj.SetColCellSortEnable('TERM_VAL'			,true);
	GridObj.SetColCellSortEnable('TERM_PER'			,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_1WEEK'	,true);
	GridObj.SetColCellSortEnable('SALES_MEAN_3WEEK'	,true);

	
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
	if(strColumnKey == 'JGC_STOCK') {
		
		if(flag_jgc_stock =='1'){
		
			GridObj.SetColCellSort('JGC_STOCK','descending');
			flag_jgc_stock++;
		}
		else if(flag_jgc_stock =='2'){
			
			GridObj.SetColCellSort('JGC_STOCK','asceding');
			
			flag_jgc_stock--;	
			
		}
	}
	if(strColumnKey == 'STOCK_DAY') {
		
		if(flag_stock_day =='1'){
		
			GridObj.SetColCellSort('STOCK_DAY','descending');
			flag_stock_day++;
		}
		else if(flag_stock_day =='2'){
			
			GridObj.SetColCellSort('STOCK_DAY','asceding');
			
			flag_stock_day--;	
			
		}
	}
	if(strColumnKey == 'PROD_TERM') {
		
		if(flag_prod_term =='1'){
		
			GridObj.SetColCellSort('PROD_TERM','descending');
			flag_prod_term++;
		}
		else if(flag_prod_term =='2'){
			
			GridObj.SetColCellSort('PROD_TERM','asceding');
			
			flag_prod_term--;	
			
		}
	}
	if(strColumnKey == 'TERM_VAL') {
		
		if(flag_term_val =='1'){
		
			GridObj.SetColCellSort('TERM_VAL','descending');
			flag_term_val++;
		}
		else if(flag_term_val =='2'){
			
			GridObj.SetColCellSort('TERM_VAL','asceding');
			
			flag_term_val--;	
			
		}
	}
	if(strColumnKey == 'TERM_PER') {
		
		if(flag_term_per =='1'){
		
			GridObj.SetColCellSort('TERM_PER','descending');
			flag_term_per++;
		}
		else if(flag_term_per =='2'){
			
			GridObj.SetColCellSort('TERM_PER','asceding');
			
			flag_term_per--;	
			
		}
	}
	if(strColumnKey == 'SALES_PRE') {
		
		if(flag_sales_pre =='1'){
		
			GridObj.SetColCellSort('SALES_PRE','descending');
			flag_sales_pre++;
		}
		else if(flag_sales_pre =='2'){
			
			GridObj.SetColCellSort('SALES_PRE','asceding');
			
			flag_sales_pre--;	
			
		}
	}
	if(strColumnKey == 'SALES_CUR') {
		
		if(flag_sales_cur =='1'){
		
			GridObj.SetColCellSort('SALES_CUR','descending');
			flag_sales_cur++;
		}
		else if(flag_sales_cur =='2'){
			
			GridObj.SetColCellSort('SALES_CUR','asceding');
			
			flag_sales_cur--;	
			
		}
	}
	if(strColumnKey == 'SALES_MEAN_1WEEK') {
		
		if(flag_sales_mean_1week =='1'){
		
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','descending');
			flag_sales_mean_1week++;
		}
		else if(flag_sales_mean_1week =='2'){
			
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','asceding');
			
			flag_sales_mean_1week--;	
			
		}
	}
	if(strColumnKey == 'SALES_MEAN_3WEEK') {
		
		if(flag_sales_mean_3week =='1'){
		
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','descending');
			flag_sales_mean_3week++;
		}
		else if(flag_sales_mean_3week =='2'){
			
			GridObj.SetColCellSort('SALES_MEAN_3WEEK','asceding');
			
			flag_sales_mean_3week--;	
			
		}
	}
	
	
	if(strColumnKey == 'GUBN') {
		
		if(flag_gubn =='1'){
		
			GridObj.SetColCellSort('GUBN','descending');
			flag_gubn++;
		}
		else if(flag_gubn =='2'){
			
			GridObj.SetColCellSort('GUBN','asceding');
			
			flag_gubn--;	
			
		}
	}
	if(strColumnKey == 'JGC_OCCUR') {
		
		if(flag_jgc_occur =='1'){
		
			GridObj.SetColCellSort('JGC_OCCUR','descending');
			flag_jgc_occur++;
		}
		else if(flag_jgc_occur =='2'){
			
			GridObj.SetColCellSort('JGC_OCCUR','asceding');
			
			flag_jgc_occur--;	
			
		}
	}
	if(strColumnKey == 'BUDU_QTY') {
		
		if(flag_budu_qty =='1'){
		
			GridObj.SetColCellSort('BUDU_QTY','descending');
			flag_budu_qty++;
		}
		else if(flag_budu_qty =='2'){
			
			GridObj.SetColCellSort('BUDU_QTY','asceding');
			
			flag_budu_qty--;	
			
		}
	}
	if(strColumnKey == 'JGC_START_DATE') {
		
		if(flag_jgc_start_date =='1'){
		
			GridObj.SetColCellSort('JGC_START_DATE','descending');
			flag_jgc_start_date++;
		}
		else if(flag_jgc_start_date =='2'){
			
			GridObj.SetColCellSort('JGC_START_DATE','asceding');
			
			flag_jgc_start_date--;	
			
		}
	}
	if(strColumnKey == 'JGC_PROD_DATE') {
		
		if(flag_jgc_prod_Date =='1'){
		
			GridObj.SetColCellSort('JGC_PROD_DATE','descending');
			flag_jgc_prod_Date++;
		}
		else if(flag_jgc_prod_Date =='2'){
			
			GridObj.SetColCellSort('JGC_PROD_DATE','asceding');
			
			flag_jgc_prod_Date--;	
			
		}
	}
		GridSetMerge();
		
}

function GridGYR(){
	
	var rowcount = GridObj.GetRowCount();
	
	for (var i =0; i < rowcount; i ++){
		
		var gyr 		= GridObj.GetCellValue('GYR',i);
		var term_per 	= GridObj.GetCellValue('TERM_PER',i);
		
		if (gyr == "G") GridObj.SetRowBgColor(i,'207|255|36');
		if (gyr == "R") GridObj.SetRowBgColor(i,'255|216|216');
		if (gyr == "Y") {
			
			 GridObj.SetRowBgColor(i,'255|255|144');
			 
		}
		if (term_per == "20") {
		
			 GridObj.SetRowBgColor(i,'255|255|144');
			 
		}
		
	}
}

function GridSetMerge(){
	
				
		GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME,SPEC');
      	GridObj.AddSummaryBar('SUMMARY1', '模啗', 'SALES_CAT03', 'sum', 'JGC_STOCK,STOCK_DAY,PROD_TERM,SALES_PRE,SALES_CUR,' +
      			'SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,JGC_OCCUR,BUDU_QTY'); 
     	 	
	   	GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'JGC_STOCK,STOCK_DAY,PROD_TERM,SALES_PRE,SALES_CUR,' +
      			'SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,JGC_OCCUR,BUDU_QTY'); 
        
    	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//喬儀

}


