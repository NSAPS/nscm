//## Щ煎斜極ID      : ip_07090_EDI_eCvan_Analysis_pop_all.js
//## Щ煎斜極貲      : edi ecvan で機
//## 滲唳濠濠        : 檜鬼遵
//## 偃嫦橾濠        : 2015-07-20
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-07-20  檜鬼遵      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_07090_EDI_eCvan_Analysis_pop_all';

var GridObj ; 	
var GridObj2 ;												// WiseGrid 偌羹
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

        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px"; 
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

function setDefault2() { 

	//GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	
	GridObj2.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj2.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines = 2;  
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj2.strSelectedCellFgColor = '0|0|0';
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj2.strActiveRowBgColor    = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj2.strHDClickAction 	   = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj2.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
       
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {
	
	GridObj.AddHeader("CNFM_DATE"		,"橾濠"			,"t_text"	,100	,80  ,false); //0   
	
 	GridObj.AddHeader("ITEM_ID"			,"ヶ跡囀萄"		,"t_text"	,100	,65 ,false); //0
 	GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"		,"t_text" 	,100	,170 ,false); //0    
 	GridObj.AddHeader("CUST_CODE"		,"剪楚籀囀萄"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"剪楚籀貲"		,"t_text" 	,100	,190  ,false); //0
 	GridObj.AddHeader("EDI_BOX"			,"嫦輿榆"		,"t_number" ,100.3	,50  ,false); //0
 	GridObj.AddHeader("SELL_BOX"		,"っ衙榆"		,"t_number" ,100.3	,50  ,false); //0
 	GridObj.AddHeader("DEFAULT_BOX"		,"嘐陶榆"		,"t_number" ,100.3	,50  ,false); //0
 	GridObj.AddHeader("DEFAULT_CODE_NS"	,"餌嶸貲"     	,"t_combo" 	,100	,120  ,true); //0   	
 	GridObj.AddHeader("DC_ID"			,"寡歎雖薄"		,"t_text" 	,100	,0  ,false); //0   
 	GridObj.AddHeader("DC_NAME"			,"寡歎雖薄"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("DEPT_CODE"		,"艙機雖薄囀萄"	,"t_text" 	,100	,0  ,false); //0   
 	GridObj.AddHeader("DEPT_NAME"		,"艙機雖薄"		,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("HAN_NAME"		,"氬渡濠"		,"t_text" 	,100	,50  ,false); //0  
 	GridObj.AddHeader("BIGO"			,"綠堅"			,"t_text" 	,100	,140  ,false); //0   

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('CNFM_DATE','center'); 
    
    GridObj.SetColCellAlign('ITEM_ID','center'); 
    
    GridObj.SetColCellAlign('DC_NAME','center');
    GridObj.SetColCellAlign('CUST_CODE','center');
    GridObj.SetColCellAlign('DEPT_NAME','center');
    GridObj.SetColCellAlign('HAN_NAME','center');
    GridObj.SetColCellAlign('BIGO','left');
	
	GridObj.SetNumberFormat("EDI_BOX",       	"###,###.#");
	GridObj.SetNumberFormat("SELL_BOX",       	"###,###.#");
	GridObj.SetNumberFormat("DEFAULT_BOX",      "###,###.#");
	GridObj.SetColCellBgColor('DEFAULT_CODE_NS',color_edit_col);

}

function setHeader2(GridObj2) {
	
	GridObj2.AddHeader("CNFM_DATE"		,"橾濠"			,"t_text"	,100	,80  ,false); //0   
	
 	GridObj2.AddHeader("ITEM_ID"		,"ヶ跡囀萄"		,"t_text"	,100	,65 ,false); //0
 	GridObj2.AddHeader("ITEM_NAME"		,"ヶ跡貲"			,"t_text" 	,100	,170 ,false); //0    
 	GridObj2.AddHeader("CUST_CODE"		,"剪楚籀囀萄"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj2.AddHeader("CUST_NAME"		,"剪楚籀貲"		,"t_text" 	,100	,190  ,false); //0
 	GridObj2.AddHeader("EDI_BOX"		,"嫦輿榆"			,"t_number" ,100.3	,50  ,false); //0
 	GridObj2.AddHeader("SELL_BOX"		,"っ衙榆"			,"t_number" ,100.3	,50  ,false); //0
 	GridObj2.AddHeader("DEFAULT_BOX"	,"嘐陶榆"			,"t_number" ,100.3	,50  ,false); //0
 	GridObj2.AddHeader("DEFAULT_CODE_NS","餌嶸貲"     	,"t_combo" 	,100	,120  ,true); //0   	
 	GridObj2.AddHeader("DC_ID"			,"寡歎雖薄"		,"t_text" 	,100	,0  ,false); //0   
 	GridObj2.AddHeader("DC_NAME"		,"寡歎雖薄"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj2.AddHeader("DEPT_CODE"		,"艙機雖薄囀萄"	,"t_text" 	,100	,0  ,false); //0   
 	GridObj2.AddHeader("DEPT_NAME"		,"艙機雖薄"		,"t_text" 	,100	,100  ,false); //0   
 	GridObj2.AddHeader("HAN_NAME"		,"氬渡濠"			,"t_text" 	,100	,50  ,false); //0  
 	GridObj2.AddHeader("BIGO"			,"綠堅"			,"t_text" 	,100	,140  ,false); //0   

	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('CNFM_DATE','center'); 
    
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    
    GridObj2.SetColCellAlign('DC_NAME','center');
    GridObj2.SetColCellAlign('CUST_CODE','center');
    GridObj2.SetColCellAlign('DEPT_NAME','center');
    GridObj2.SetColCellAlign('HAN_NAME','center');
    GridObj2.SetColCellAlign('BIGO','left');
	
	GridObj2.SetNumberFormat("EDI_BOX",       	"###,###.#");
	GridObj2.SetNumberFormat("SELL_BOX",       	"###,###.#");
	GridObj2.SetNumberFormat("DEFAULT_BOX",      "###,###.#");
	GridObj2.SetColCellBgColor('DEFAULT_CODE_NS',color_edit_col);

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
            	
            	GridSetMerge();
             
            } else    
            { 
            	
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
    
     
		
    }
	
	function GridEndQuery2() 
    {
    	
        var endMode = GridObj2.GetParam("mode2");
        var error_msg = '';
          
        if(endMode == "search2") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj2.GetStatus() == "true") 
            {   
            	
            	GridSetMerge2();
             
            } else    
            { 
            	
                error_msg = GridObj2.GetMessage(); 
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
    	   doQuery2();  
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
   	   var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");     
       var end_date			= document.all.end_date.value.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");       
	   var user_id			= document.all._user_id.value;     
       var item_type		= document.all.item_type.value;
       var default_code_ns	= document.all.default_code_ns.value; 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
              	
      
      //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",   end_date);
       GridObj.SetParam("item_type",   item_type);
       GridObj.SetParam("default_code_ns", default_code_ns);
	 
	   GridObj.DoQuery(servlet_url);       
   }
	
 function doQuery2() 
   {   		
   	   var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");     
       var end_date			= document.all.end_date.value.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");       
	   var user_id			= document.all._user_id.value;     
       var item_type		= document.all.item_type.value;
       var default_code_ns	= document.all.default_code_ns.value; 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
              	
      
      //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj2.SetParam("mode",           "search2");
       GridObj2.SetParam("start_date",   start_date);
       GridObj2.SetParam("end_date",   end_date);
       GridObj2.SetParam("item_type",   item_type);
       GridObj2.SetParam("default_code_ns", default_code_ns);
	 
	   GridObj2.DoQuery(servlet_url);       
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

//	function GridCellDblClick(strColumnKey, nRow){	
//		
//		var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
//		var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
//		var cnfm_date	= document.frm.end_date.value;
//		
//		
//		if( strColumnKey == 'STOCK_EXPT'){
//			
//			var service_url = "service.do?_moon_service=ip_01140_inventoryPlanAnalysis_md_list_pop";
//			service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date;  
//			var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
//			var newWin = window.open(service_url, "", pop_win_style);
//			newWin.focus();		
//			
//		}	
//
//	}

function GridSetMerge(){
	
	var rowCount = GridObj.GetRowCount();		
		if (rowCount == 0) return;
     	 	
	   	GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'EDI_BOX,SELL_BOX,DEFAULT_BOX'); 
 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//喬儀
				 
}

function GridSetMerge2(){
	
	var rowCount = GridObj2.GetRowCount();		
		if (rowCount == 0) return;
     	 	
	   	GridObj2.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'EDI_BOX,SELL_BOX,DEFAULT_BOX'); 
 		GridObj2.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//喬儀
				 
}
