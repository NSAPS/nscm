//## Щ煎斜極ID      : ip_07090_EDI_eCvan_Analysis_pop.js
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
var job_id = 'ip_07090_EDI_eCvan_Analysis_pop';

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
	
	
	GridObj.AddHeader("CNFM_DATE"		,"橾濠"			,"t_text"	,100	,0  ,false); //0   	
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

	GridObj.SetColCellBgColor('DEFAULT_CODE_NS',color_edit_col);
	

	doQuery();
	

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


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
    	
    	
    
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
   	   var gubn = document.frm.gubn.value;   		
       var cnfm_date	= document.frm.cnfm_date.value;       
       cnfm_date 		= cnfm_date.replace(/-/g,"");
       var itype		= document.frm.itype.value;
         	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("cnfm_date",   cnfm_date);
       GridObj.SetParam("gubn",   	gubn);
       GridObj.SetParam("itype",   itype);
	  
	   GridObj.DoQuery(servlet_url);       
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



function GridSetMerge(){
		
		var rowCount = GridObj.GetRowCount();		
		if (rowCount == 0) return;
				
		
		//GridObj.SetGroupMerge('CNFM_DATE');
        GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'EDI_BOX,SELL_BOX,DEFAULT_BOX'); 
        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '152|251|152');
         	   
        
				 
}