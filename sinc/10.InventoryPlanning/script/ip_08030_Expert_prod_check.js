//## Щ煎斜極ID		: ip_08030_Expert_prod_check.js
//## Щ煎斜極貲		: 儅骯啗�� 匐隸
//## 滲唳濠			: 檜鬼遵
//## 偃嫦橾濠			: 2016-03-25
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_08.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_08.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_08030_Expert_prod_check';

var GridObj ; 									// WiseGrid 偌羹
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
    GridObj.strMouseWheelAction	   = 'page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;		
       
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        
	
	GridObj.AddHeader("ROWNUM"	   		,"牖憮"  			,"t_number"     ,100.3		,40     ,false); //0   
	GridObj.AddHeader("SALES_CAT03"		,"ヶ謙"				,"t_text" 	    ,100	    ,100     ,false); //0	
 	GridObj.AddHeader("ITEM_ID"	    	,"薯ヶ囀萄"			,"t_text" 	   	,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"薯ヶ貲"	        	,"t_text" 	   	,100	    ,220    ,false); //0 
 	GridObj.AddHeader("MTO_MTS"			,"掘碟"	        	,"t_text" 	   	,100	    ,70    ,false); //0 
 	GridObj.AddHeader("AVL_STOCK"		,"離輿 陛辨營堅"	    ,"t_number"  	,100.3		,100    ,false); //0	
 	GridObj.AddHeader("ORDER_BOX"		,"輿僥榆"	    		,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("SAFE_QTY"		,"寰瞪營堅"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("NEED_QTY"		,"儅骯в蹂榆"	    	,"t_number"  	,100.3		,80    ,false); //0  	
 	GridObj.AddHeader("PLAN_QTY"		,"離輿 儅骯啗�鈾n�挨仄�"	,"t_number"  	,100.3		,100    ,true); //0
 	GridObj.AddHeader("TOT_PLAN"		,"儅骯啗�僩�"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TOT_PROD"		,"儅骯褒瞳"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TOT_GAP"			,"離檜榆"				,"t_number"  	,100.3		,80    ,false); //0	
 	GridObj.AddHeader("MON_PLAN"		,"儅骯啗�僩�"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("MON_PROD"		,"儅骯褒瞳"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("MON_GAP"			,"離檜榆"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TUE_PLAN"		,"儅骯啗�僩�"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TUE_PROD"		,"儅骯褒瞳"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("TUE_GAP"			,"離檜榆"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("WED_PLAN"		,"儅骯啗�僩�"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("WED_PROD"		,"儅骯褒瞳"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("WED_GAP"			,"離檜榆"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("THR_PLAN"		,"儅骯啗�僩�"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("THR_PROD"		,"儅骯褒瞳"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("THR_GAP"			,"離檜榆"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("FRI_PLAN"		,"儅骯啗�僩�"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("FRI_PROD"		,"儅骯褒瞳"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("FRI_GAP"			,"離檜榆"				,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("SAT_PLAN"		,"儅骯啗�僩�"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("SAT_PROD"		,"儅骯褒瞳"	    	,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("SAT_GAP"			,"離檜榆"				,"t_number"  	,100.3		,80    ,false); //0
 
	
	GridObj.AddGroup	("MON",		"錯蹂橾");
 	GridObj.AppendHeader("MON", 	"MON_PLAN");
 	GridObj.AppendHeader("MON", 	"MON_PROD");
	GridObj.AppendHeader("MON", 	"MON_GAP");
	GridObj.AddGroup	("TUE",		"�倍靺�");
 	GridObj.AppendHeader("TUE", 	"TUE_PLAN");
 	GridObj.AppendHeader("TUE", 	"TUE_PROD");
	GridObj.AppendHeader("TUE", 	"TUE_GAP");
	GridObj.AddGroup	("WED",		"熱蹂橾");
 	GridObj.AppendHeader("WED", 	"WED_PLAN");
 	GridObj.AppendHeader("WED", 	"WED_PROD");
	GridObj.AppendHeader("WED", 	"WED_GAP");
	GridObj.AddGroup	("THR",		"跡蹂橾");
 	GridObj.AppendHeader("THR", 	"THR_PLAN");
 	GridObj.AppendHeader("THR", 	"THR_PROD");
	GridObj.AppendHeader("THR", 	"THR_GAP");
	GridObj.AddGroup	("FRI",		"旎蹂橾");
 	GridObj.AppendHeader("FRI", 	"FRI_PLAN");
 	GridObj.AppendHeader("FRI", 	"FRI_PROD");
	GridObj.AppendHeader("FRI", 	"FRI_GAP");
	GridObj.AddGroup	("SAT",		"饜蹂橾");
 	GridObj.AppendHeader("SAT", 	"SAT_PLAN");
 	GridObj.AppendHeader("SAT", 	"SAT_PROD");
	GridObj.AppendHeader("SAT", 	"SAT_GAP");
	GridObj.AddGroup	("TOT",		"啗");
 	GridObj.AppendHeader("TOT", 	"TOT_PLAN");
 	GridObj.AppendHeader("TOT", 	"TOT_PROD");
	GridObj.AppendHeader("TOT", 	"TOT_GAP");
	
	GridObj.BoundHeader();	

	GridObj.SetColFix('MTO_MTS'); 	
	
	GridObj.SetColCellAlign('SALES_CAT03',  	'left'); 
	GridObj.SetColCellAlign('ITEM_ID',  		'center');
	GridObj.SetColCellAlign('MTO_MTS',        	 'center');
	GridObj.SetColCellAlign('ROWNUM',        	 'center');
	GridObj.SetColCellBgColor('ROWNUM','255|255|200');
	GridObj.SetNumberFormat("ORDER_BOX",       		"###,###.#");
    GridObj.SetNumberFormat("AVL_STOCK",       		"###,###.#");
    GridObj.SetNumberFormat("SAFE_QTY",     		"###,###.#");
    GridObj.SetNumberFormat("NEED_QTY",     		"###,###.#");
    GridObj.SetNumberFormat("MON_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("MON_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("MON_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("TUE_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("TUE_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("TUE_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("WED_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("WED_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("WED_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("THR_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("THR_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("THR_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("FRI_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("FRI_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("FRI_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("SAT_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("SAT_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("SAT_GAP",     			"###,###.#");
    GridObj.SetNumberFormat("TOT_PLAN",     		"###,###.#");
    GridObj.SetNumberFormat("TOT_PROD",     		"###,###.#");
    GridObj.SetNumberFormat("TOT_GAP",     			"###,###.#");
 	GridObj.SetNumberFormat("PLAN_QTY",     		"###,###.#");
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
        	
        	GridSetColor();
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
    doQuery();
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave(service) {	

	doSave();	
	
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
   var cnfm_date	    = document.frm.cnfm_date.value;
   cnfm_date 			= cnfm_date.replace(/-/g,"");
   var mto_gubn	    	= document.frm.mto_gubn.value;
   var domain			= document.frm.domain.value;    
   var search_item		= document.frm.search_item.value;	
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;

   //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("cnfm_date",   		cnfm_date);
   GridObj.SetParam("mto_gubn",   		mto_gubn);
   GridObj.SetParam("domain",   		domain);	
   GridObj.SetParam("search_item",		search_item);	
   GridObj.DoQuery(servlet_url);       
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 渦綰 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow) {
	
	var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
	var cnfm_date	= document.frm.cnfm_date.value;
	cnfm_date 			= cnfm_date.replace(/-/g,"");
	
	if(strColumnKey == 'ITEM_NAME'){		
		
		var service_url = "service.do?_moon_service=ip_08020_Expert_Order_list_pop";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date ;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=1135, height=440, top=50, left=200";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
	}

}

function GridSetColor(){
	
	var rowcount = GridObj.GetRowCount();
	for (var i =0; i <rowcount; i++){
		
		var plan_qty = GridObj.GetCellValue('PLAN_QTY',i);
		var tot_plan = GridObj.GetCellValue('TOT_PLAN',i);
		if( plan_qty !== tot_plan) GridObj.SetCellBgColor('ITEM_ID', i , '255|54|54');
	
		var mon_qty	 = GridObj.GetCellValue('MON_GAP',i);
		var tue_qty	 = GridObj.GetCellValue('TUE_GAP',i);
		var wed_qty	 = GridObj.GetCellValue('WED_GAP',i);
		var thr_qty	 = GridObj.GetCellValue('THR_GAP',i);
		var fri_qty	 = GridObj.GetCellValue('FRI_GAP',i);
		var sat_qty	 = GridObj.GetCellValue('SAT_GAP',i);
		var tot_qty	 = GridObj.GetCellValue('TOT_GAP',i);
		
		if( mon_qty < 0) GridObj.SetCellFgColor('MON_GAP', i , '255|54|54');
		if( tue_qty < 0) GridObj.SetCellFgColor('TUE_GAP', i , '255|54|54');
		if( wed_qty < 0) GridObj.SetCellFgColor('WED_GAP', i , '255|54|54');
		if( thr_qty < 0) GridObj.SetCellFgColor('THR_GAP', i , '255|54|54');
		if( fri_qty < 0) GridObj.SetCellFgColor('FRI_GAP', i , '255|54|54');
		if( sat_qty < 0) GridObj.SetCellFgColor('SAT_GAP', i , '255|54|54');
		if( tot_qty < 0){
			 GridObj.SetCellFgColor('TOT_GAP', i , '255|54|54');
			 
			
		}
	}
}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME');
    GridObj.AddSummaryBar('SUMMARY1', 'ヶ謙滌 啗', 'SALES_CAT03', 'sum', 'ORDER_BOX,AVL_STOCK,SAFE_QTY,NEED_QTY,PLAN_QTY,MON_PLAN,MON_PROD,MON_GAP,TUE_PLAN,TUE_PROD,TUE_GAP,'
    +'WED_PLAN,WED_PROD,WED_GAP,THR_PLAN,THR_PROD,THR_GAP,FRI_PLAN,FRI_PROD,FRI_GAP,SAT_PLAN,SAT_PROD,SAT_GAP,TOT_PLAN,TOT_PROD,TOT_GAP');
    GridObj.AddSummaryBar('SUMMARY2', '瞪羹 啗'	, 'summaryall', 'sum', 'ORDER_BOX,AVL_STOCK,SAFE_QTY,NEED_QTY,PLAN_QTY,MON_PLAN,MON_PROD,MON_GAP,TUE_PLAN,TUE_PROD,TUE_GAP,'
    +'WED_PLAN,WED_PROD,WED_GAP,THR_PLAN,THR_PROD,THR_GAP,FRI_PLAN,FRI_PROD,FRI_GAP,SAT_PLAN,SAT_PROD,SAT_GAP,TOT_PLAN,TOT_PROD,TOT_GAP');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 


}


