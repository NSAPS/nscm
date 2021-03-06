//## Щ煎斜極ID		: ip_08020_Expert_Order_list.js
//## Щ煎斜極貲		: 輿僥蕾熱 塽 1離匐隸
//## 滲唳濠			: 檜鬼遵
//## 偃嫦橾濠			: 2016-03-23
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
var job_id = 'ip_08020_Expert_Order_list';

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
	
	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 		,100    ,60  ,false);
	
	GridObj.AddHeader("ROWNUM"	   		,"牖憮"  			,"t_number"     ,100.3		,40     ,false); //0 
	GridObj.AddHeader("SALES_CAT03"		,"ヶ謙"				,"t_text" 	    ,100	    ,120     ,false); //0  
	GridObj.AddHeader("MTO_MTS_GUBN"	,"掘碟"  			,"t_text"     	,100		,60     ,false); //0  
 	//GridObj.AddHeader("ORDER_NO"	    ,"輿僥廓��"			,"t_text" 	   	,100	    ,80     ,false); //0
 	//GridObj.AddHeader("DELIVERY_NO"	,"陶ヶ廓��"			,"t_text" 	   	,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	    	,"薯ヶ囀萄"			,"t_text" 	   	,100	    ,80     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"薯ヶ貲"	        	,"t_text" 	   	,100	    ,250    ,false); //0
 	GridObj.AddHeader("SPEC"			,"敘問"	        	,"t_text" 	   	,100	    ,100    ,false); //0
 	GridObj.AddHeader("PRE_MONTH_SELL"	,"瞪錯啗"	    		,"t_number"  	,100.3		,80    ,false); //0 	
 	GridObj.AddHeader("ORDER_QTY"		,"輿僥榆"	    		,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("AVL_STOCK"		,"離輿\n陛辨營堅"		,"t_number"  	,100.3		,80    ,false); //0
 	GridObj.AddHeader("BOOKING_QTY_W2"	,"離輿 BOOKING\n轎堅榆"	,"t_number"  	,80		,100   ,false); //0
 	GridObj.AddHeader("AVL_STOCK2"		,"離離輿\n陛辨營堅"		,"t_number"  	,100.3	,80    ,false); //0
 	GridObj.AddHeader("BOOKING_QTY_W3"	,"W+2 BOOKING\n轎堅榆"	,"t_number"  	,80		,100   ,false); //0
 	GridObj.AddHeader("BOOKING_QTY_W4"	,"W+3 BOOKING\n轎堅榆"	,"t_number"  	,80		,100   ,false); //0
 	GridObj.AddHeader("BOOKING_QTY_W5"	,"W+4 BOOKING\n轎堅榆"	,"t_number"  	,80		,100   ,false); //0
 	
 	GridObj.AddHeader("SAFE_QTY"		,"寰瞪營堅"	    ,"t_number"  	,100.3		,100    ,false); //0
 	GridObj.AddHeader("NEED_QTY"		,"儅骯в蹂榆"	    ,"t_number"  	,100.3		,100    ,false); //0
 	GridObj.AddHeader("MOQ"	   			,"M.O.Q"	    ,"t_number"  	,100.3		,100    ,false); //0
	GridObj.AddHeader("MOQ_GAP"	   		,"M.O.Q 離檜榆"	,"t_number"    	,100.3		,100    ,false); //0
	GridObj.AddHeader("PLAN_QTY"		,"離輿 儅骯啗�僩�"	,"t_number"  	,100.3		,100    ,false); //0
	GridObj.AddHeader("PLAN_QTY2"		,"離輿 儅骯啗�鈾n�挨仄�"	,"t_number"  	,100.3		,100    ,true); //0
	GridObj.AddHeader("FLAG"			,"FLAG"	,"t_text"  	,100		,0    ,true); //0
 	
	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 
	
	
	GridObj.SetColCellAlign('SALES_CAT03',  	'left'); 
	GridObj.SetColCellAlign('SPEC',  	'left'); 
	GridObj.SetColCellAlign('MTO_MTS_GUBN',  	'center');
	GridObj.SetColCellAlign('ITEM_ID',  		'center');
	GridObj.SetColCellAlign('ROWNUM',        	 'center');
	GridObj.SetNumberFormat("ORDER_QTY",       	"###,###.#");
    GridObj.SetNumberFormat("MOQ",       		"###,###.#");
    GridObj.SetNumberFormat("MOQ_GAP",     		"###,###.#");
    GridObj.SetNumberFormat("AVL_STOCK",       	"###,###.#");
    GridObj.SetNumberFormat("BOOKING_QTY_W2",   "###,###.#");
    GridObj.SetNumberFormat("BOOKING_QTY_W3",   "###,###.#");
    GridObj.SetNumberFormat("BOOKING_QTY_W4",   "###,###.#");
    GridObj.SetNumberFormat("BOOKING_QTY_W5",   "###,###.#");
    GridObj.SetNumberFormat("AVL_STOCK2",       "###,###.#");
    GridObj.SetNumberFormat("NEED_QTY",       	"###,###.#");
    GridObj.SetNumberFormat("PLAN_QTY",       	"###,###.#");
    GridObj.SetNumberFormat("PLAN_QTY2",       	"###,###.#");
    GridObj.SetNumberFormat("PRE_MONTH_SELL",   "###,###.#");
    GridObj.SetColCellBgColor('ROWNUM','255|255|200');
    GridObj.SetColCellBgColor('PLAN_QTY2','255|255|200');
    
    GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	//Hidden 鏽歲
	GridObj.SetColHide("CRUD",true);
   
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
        	GridCheckMoq(); 
         
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save"){
    	
    	doQuery();
		
    }else if(endMode == "save2"){
    
    	doQuery();	
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

	var domain			= document.frm.domain.value;
	if (domain =="EX") doSave();	
	if (domain =="DO") doSave2();	
	
	
};

function doSave() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var cnfm_date	    = document.frm.cnfm_date.value;
    cnfm_date 			= cnfm_date.replace(/-/g,"");
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("cnfm_date",				  cnfm_date);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}

function doSave2() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var cnfm_date	    = document.frm.cnfm_date.value;
    cnfm_date 			= cnfm_date.replace(/-/g,"");
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",						 "save2");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("cnfm_date",				  cnfm_date);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
   var cnfm_date	    = document.frm.cnfm_date.value;
   cnfm_date 			= cnfm_date.replace(/-/g,"");
   var domain			= document.frm.domain.value;
   var mto_gubn	    	= document.frm.mto_gubn.value;
   //var search_item		= document.frm.search_item.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("cnfm_date",   		cnfm_date);
   GridObj.SetParam("mto_gubn",   		mto_gubn);
   GridObj.SetParam("domain",   		domain);
  // GridObj.SetParam("search_item",		search_item);	
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

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME');
    GridObj.AddSummaryBar('SUMMARY1', 'ヶ謙滌 啗', 'SALES_CAT03', 'sum', 'PRE_MONTH_SELL,AVL_STOCK,BOOKING_QTY_W2,BOOKING_QTY_W3,BOOKING_QTY_W4,BOOKING_QTY_W5,AVL_STOCK2,ORDER_QTY,SAFE_QTY,NEED_QTY,MOQ,MOQ_GAP,PLAN_QTY,PLAN_QTY2');
    GridObj.AddSummaryBar('SUMMARY2', '瞪羹 啗'	, 'summaryall', 'sum', 'PRE_MONTH_SELL,AVL_STOCK,BOOKING_QTY_W2,BOOKING_QTY_W3,BOOKING_QTY_W4,BOOKING_QTY_W5,AVL_STOCK2,ORDER_QTY,SAFE_QTY,NEED_QTY,MOQ,MOQ_GAP,PLAN_QTY,PLAN_QTY2');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 


}

function GridCheckMoq(){
	
	var rowcount = GridObj.GetRowCount();
	for (var i =0; i < rowcount; i++){
		
		var flag = GridObj.GetCellValue('FLAG',i);
		
		if(GridObj.GetCellValue('MOQ_GAP',i) < 0){
			
			GridObj.SetCellBgColor('MOQ_GAP', i , '255|54|54');
		}
		
		if( flag === 'N') {
			
			var s1 = GridObj.GetCellValue('PLAN_QTY',i);
			//var s2 = GridObj.GetCellValue('PLAN_QTY2',i);
			GridObj.SetCellValue('PLAN_QTY2',i,s1);
			
		}
	}
}

function CreatePlan(){

	if(confirm("離輿 輿僥啗�嘛� 儅撩м棲棻. 儅撩ж衛啊蝗棲梱?") == 1 ) {
		
	}
	else{
		return;
	}	
	
	

	var GridObj		    = document.WiseGrid;
	var max_date	    = document.frm.max_date.value;
    max_date 			= max_date.replace(/-/g,"");
    
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	GridObj.SetParam("mode", "CreatePlan");
	GridObj.SetParam("max_date",				  max_date);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.doQuery(servlet_url);

	
}

