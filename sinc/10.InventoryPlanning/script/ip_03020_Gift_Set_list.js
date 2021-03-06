//############################################################
//## Щ煎斜極ID      : ip_03020_Gift_Set_list.vm
//## Щ煎斜極貲      	: 摹僭撮お ⑷��
//## 滲唳濠            	: 檜鬼遵
//## 偃嫦橾濠        	: 2016-01-14 
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_08.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_08.xml
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
var job_id = 'ip_03020_Gift_Set_list';

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

	GridObj.AddHeader("SALES_CAT02"	       	,"模碟盟"				,"t_text"	   	,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           	,"ヶ跡囀萄"			,"t_text" 	   	,100	    ,65     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       	,"ヶ跡貲"	        	,"t_text" 	   	,100	    ,220    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   	,"敘問"	    		,"t_text"  		,100		,90     ,false); //0
 	GridObj.AddHeader("GIFT_PLAN"	    	,"摹僭撮お\n遴艙啗��"	,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("GIFT_PROD"	    	,"摹僭撮お\n儅骯啗��"	,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("PROD_CUM"	    	,"旎輿儅骯\n援瞳褒瞳"	,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("PROD_REMN"	    	,"旎輿儅骯\n濤榆"	    ,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("BASE_STOCK"	       	,"晦蟾營堅"			,"t_number"    	,100.3		,60     ,false); //0 	
 	GridObj.AddHeader("SALES_CUR"	       	,"橾啗"       		,"t_number" 	,100.3		,60     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       	,"援啗"	    		,"t_number"    	,100.3		,60     ,false); //0
    GridObj.AddHeader("CHGO_CUM"	       	,"轎堅援啗"			,"t_number"    	,100.3		,70     ,false); //0  
    GridObj.AddHeader("STOCK_EXPT"	       	,"蕨鼻營堅"			,"t_number"    	,100.3		,70     ,false); //0  
    GridObj.AddHeader("CHGO_RATE"	   		,"轎堅徽"	    		,"t_text"    	,100		,60     ,false); //0
 	GridObj.AddHeader("CHGO_AMOUNT"       	,"轎堅 陛問"			,"t_number"    	,100.3   	,70     ,false); //0
 	GridObj.AddHeader("TOT_AMOUNT"   		,"識啗�僚旓�"			,"t_number"    	,100.3		,70     ,false); //0
 	GridObj.AddHeader("TOT_SALES"   		,"識っ衙旎擋"			,"t_number"    	,100.3		,70     ,false); //0
 	GridObj.AddHeader("EXCEPT_SALES"   		,"雖錳薯諼\nっ衙旎擋"	,"t_number"    	,100.3		,70     ,false); //0
 	GridObj.AddHeader("COST_PER_BOX"   		,"夢蝶渡\n濛機綠"		,"t_number"    	,100.3		,70     ,false); //0
    GridObj.AddHeader("COST_PER_BOX_CUM"   	,"旎喇 識\n濛機綠"		,"t_number"    	,100.3   	,70     ,false) //0
 	GridObj.AddHeader("SALES_CUM_YEAR"      ,"旎喇衙轎擋\n援啗"	,"t_number"    	,100.3   	,70     ,false); //0	
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 

	GridObj.SetColCellAlign('SALES_CAT02',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('SPEC',               'left');
    GridObj.SetColCellAlign('CHGO_RATE',          'right');
    GridObj.SetNumberFormat("BASE_STOCK",       "###,###.#");
	GridObj.SetNumberFormat("SALES_CUR",       	"###,###.#");
	GridObj.SetNumberFormat("SALES_SUM",       	"###,###.#");
	GridObj.SetNumberFormat("GIFT_PLAN",       	"###,###.#");
	GridObj.SetNumberFormat("GIFT_PROD",       	"###,###.#");
	GridObj.SetNumberFormat("PROD_CUM",       	"###,###.#");
	GridObj.SetNumberFormat("PROD_REMN",       	"###,###.#");
	GridObj.SetNumberFormat("CHGO_CUM",       	"###,###.#");	
	GridObj.SetNumberFormat("STOCK_EXPT",       "###,###.#");	
	GridObj.SetNumberFormat("CHGO_AMOUNT",   	"###,###.#");
	GridObj.SetNumberFormat("TOT_AMOUNT",       "###,###.#");
	GridObj.SetNumberFormat("TOT_SALES",       	"###,###.#");
	GridObj.SetNumberFormat("EXCEPT_SALES",     "###,###.#");
	GridObj.SetNumberFormat("COST_PER_BOX",     "###,###.#");
	GridObj.SetNumberFormat("COST_PER_BOX_CUM", "###,###.#");
	GridObj.SetNumberFormat("SALES_CUM_YEAR",   "###,###.#");
	
	GridObj.SetColCellBgColor('GIFT_PLAN','255|253|208');
	
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
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }	
        else if( endMode =="doSave"){
            	
            	if(GridObj.GetStatus() == "true"){
            		GridSetMerge();
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

	doSave();	
	
};


      
// 盪濰
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url);
	
 	
 	return;
}    




/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
 
	   var user_id			= document.all._user_id.value;         	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
     
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);	 
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

function GridCellDblClick(strColumnKey, nRow){

}


function GridSetMerge(){
	
	GridObj.SetGroupMerge('SALES_CAT02,ITEM_ID,ITEM_NAME,SPEC');	
	
    
    GridObj.AddSummaryBar('SUMMARY1', '模啗', 'SALES_CAT02', 'sum', 'GIFT_PLAN,GIFT_PROD,PROD_CUM,PROD_REMN,BASE_STOCK,SALES_CUR,SALES_SUM,CHGO_CUM,STOCK_EXPT,CHGO_AMOUNT,'
    +'TOT_AMOUNT,TOT_SALES,EXCEPT_SALES,COST_PER_BOX,COST_PER_BOX_CUM,SALES_CUM_YEAR'); 
    GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'GIFT_PLAN,GIFT_PROD,PROD_CUM,PROD_REMN,BASE_STOCK,SALES_CUR,SALES_SUM,CHGO_CUM,STOCK_EXPT,CHGO_AMOUNT,'
    		+'TOT_AMOUNT,TOT_SALES,EXCEPT_SALES,COST_PER_BOX,COST_PER_BOX_CUM,SALES_CUM_YEAR'); 		
   
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152'); 
}

