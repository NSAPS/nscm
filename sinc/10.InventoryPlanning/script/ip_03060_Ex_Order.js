//## Щ煎斜極ID		: ip_03060_Ex_Order.js
//## Щ煎斜極貲		: 薑晦嫦輿啗��
//## 滲唳濠			: 檜鬼遵
//## 偃嫦橾濠			: 2016-04-22
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
var job_id = 'ip_03060_Ex_Order';

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
	
	
	GridObj.AddHeader("SELECTED"		,""   			,"t_checkbox"	,2			,30  ,true); //0
	GridObj.AddHeader("SALES_CAT03"	    ,"ヶ謙"			,"t_text" 	   	,100	    ,70     ,false); //0   
	GridObj.AddHeader("SALES_CAT032"	,"ヶ謙"			,"t_text" 	   	,100		,0      ,false); //0   
 	GridObj.AddHeader("ITEM_ID"	    	,"薯ヶ囀萄"		,"t_text" 	   	,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"薯ヶ貲"	        ,"t_text" 	   	,100	    ,200    ,false); //0
 	GridObj.AddHeader("GUBN"			,"掘碟"			,"t_text"  		,100		,60    	,false); //0
 	GridObj.AddHeader("LEADTIME"		,"葬萄顫歜"		,"t_text"  		,100		,60    	,false); //0 	
 	GridObj.AddHeader("PM_4"			,"M-1"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("PM_3"			,"M-2"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("PM_2"			,"M-3"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("PM_1"			,"M-4"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("PM_AVG"			,"錯ゎ敕"	    	,"t_number"  	,100.3		,60    ,false); //0 	
 	GridObj.AddHeader("M_0"				,"M"	    	,"t_number"  	,100.3		,60    ,false); //0
 	GridObj.AddHeader("M_REMAIN"		,"M 濤罹"	    ,"t_number"  	,100.3		,60    ,true); //0
 	GridObj.AddHeader("M_1"				,"M+1"	    	,"t_number"  	,100.3		,60    ,true); //0
 	GridObj.AddHeader("M_2"				,"M+2"	    	,"t_number"  	,100.3		,60    ,true); //0
 	GridObj.AddHeader("M_3"				,"M+3"	    	,"t_number"  	,100.3		,60    ,true); //0 	
 	GridObj.AddHeader("M_4"				,"M+4"	    	,"t_number"  	,100.3		,60    ,true); //0 	
 	GridObj.AddHeader("SAFE_QTY"		,"寰瞪營堅"	    ,"t_number"  	,100.3		,70    ,true); //0
 	GridObj.AddHeader("TOTAL_NEED"		,"識в蹂榆"	    ,"t_number"  	,100.3		,70    ,false); //0
 	GridObj.AddHeader("AVL_MONTH"	   	,"っ衙陛棟\n錯熱"	,"t_number"  	,100.3		,70    ,false); //0
 	GridObj.AddHeader("EVENT_QTY"	   	,"Event僭榆"		,"t_number"  	,100.3		,70    ,true); //0
 	GridObj.AddHeader("BASE_STOCK"	   	,"晦蟾營堅"		,"t_number"  	,100.3		,70    ,false); //0	
	GridObj.AddHeader("RECEIPT_EXPT"	,"M"			,"t_number"  	,100.3		,60    ,false); //0
	GridObj.AddHeader("RECEIPT_EXPT2"	,"M+1"			,"t_number"  	,100.3		,60    ,false); //0
	GridObj.AddHeader("RECEIPT_EXPT3"	,"M+2"			,"t_number"  	,100.3		,60    ,false); //0
	GridObj.AddHeader("RECEIPT_EXPT4"	,"M+3"			,"t_number"  	,100.3		,60    ,false); //0	
	GridObj.AddHeader("RECEIPT_EXPT5"	,"M+4"			,"t_number"  	,100.3		,60    ,false); //0	
	GridObj.AddHeader("TOTAL_QTY"		,"識 營堅榆"		,"t_number"  	,100.3		,70   ,false); //0
 	GridObj.AddHeader("NEED_QTY"		,"в蹂 嫦輿榆"		,"t_number"  	,100.3		,70   ,false); //0
 	GridObj.AddHeader("ORDER_QTY"		,"譆謙 嫦輿榆"		,"t_number"  	,100.3		,70   ,true); //0
 	
	GridObj.AddGroup	("SALES_ACT",	"錯滌っ衙");
 	GridObj.AppendHeader("SALES_ACT", 	"M_0");
 	GridObj.AppendHeader("SALES_ACT",	"M_REMAIN");
 	GridObj.AppendHeader("SALES_ACT", 	"M_1");
 	GridObj.AppendHeader("SALES_ACT", 	"M_2");
 	GridObj.AppendHeader("SALES_ACT", 	"M_3");
 	GridObj.AppendHeader("SALES_ACT", 	"M_4");
 	
 	GridObj.AddGroup	("RECEIPT",		"熱殮蕨薑");
 	GridObj.AppendHeader("RECEIPT", 	"RECEIPT_EXPT");
 	GridObj.AppendHeader("RECEIPT",		"RECEIPT_EXPT2");
 	GridObj.AppendHeader("RECEIPT", 	"RECEIPT_EXPT3");
 	GridObj.AppendHeader("RECEIPT", 	"RECEIPT_EXPT4");
 	GridObj.AppendHeader("RECEIPT", 	"RECEIPT_EXPT5");
	
	GridObj.BoundHeader();	

	GridObj.SetColFix('ITEM_NAME'); 	
	
	GridObj.SetColCellAlign('ITEM_ID',  		'center');
	GridObj.SetColCellAlign('GUBN',  			'center');
	GridObj.SetColCellAlign('LEADTIME',  		'center');
	//GridObj.SetColCellAlign('ROWNUM',        	 'center');
	GridObj.SetNumberFormat("PM_4",       	"###,###.#");
	GridObj.SetNumberFormat("PM_3",       	"###,###.#");
	GridObj.SetNumberFormat("PM_2",       	"###,###.#");
	GridObj.SetNumberFormat("PM_1",       	"###,###.#");
	GridObj.SetNumberFormat("PM_AVG",       "###,###.#");
	GridObj.SetNumberFormat("M_0",       	"###,###.#");
	GridObj.SetNumberFormat("M_REMAIN",     "###,###.#");
	GridObj.SetNumberFormat("M_1",       	"###,###.#");
	GridObj.SetNumberFormat("M_2",       	"###,###.#");
	GridObj.SetNumberFormat("M_3",       	"###,###.#");	
	GridObj.SetNumberFormat("M_4",       	"###,###.#");	
	GridObj.SetNumberFormat("SAFE_QTY",     "###,###.#");
	GridObj.SetNumberFormat("TOTAL_NEED",   "###,###.#");
	GridObj.SetNumberFormat("AVL_MONTH",    "###,###.#");
	GridObj.SetNumberFormat("EVENT_QTY",    "###,###.#");
	GridObj.SetNumberFormat("BASE_STOCK",   "###,###.#");	
	GridObj.SetNumberFormat("RECEIPT_EXPT", "###,###.#");
	GridObj.SetNumberFormat("RECEIPT_EXPT2","###,###.#");	
	GridObj.SetNumberFormat("RECEIPT_EXPT3","###,###.#");
	GridObj.SetNumberFormat("RECEIPT_EXPT4","###,###.#");
	GridObj.SetNumberFormat("RECEIPT_EXPT5","###,###.#");
	GridObj.SetNumberFormat("TOTAL_QTY",    "###,###.#");
	GridObj.SetNumberFormat("NEED_QTY",     "###,###.#");
	GridObj.SetNumberFormat("ORDER_QTY",    "###,###.#");
    
    //GridObj.SetColCellBgColor('ROWNUM','255|255|200');
    GridObj.SetColCellBgColor('ORDER_QTY','255|255|200');
  
	
	
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
        	GridSetQty();
        	GridSetMerge();        
        	 
         
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save"){
    	
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
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
   var cnfm_date	    = document.frm.cnfm_date.value;
   cnfm_date 			= cnfm_date.replace(/-/g,"");
   var search_type	    = document.frm.search_type.value;		//粽楠萄 嶸⑽
   var sales_cat05		= document.frm.sales_cat05.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
 
   //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   GridObj.SetParam("mode",           			"search");
   GridObj.SetParam("cnfm_date",   				cnfm_date);
   GridObj.SetParam("search_type",   			search_type);
   GridObj.SetParam("sales_cat05",   			sales_cat05);

   GridObj.DoQuery(servlet_url);       
}


function GoSave(service) {
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	doSave();	
	
};

      
// 盪濰
function doSave() {
 
	var GridObj 	= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var version		= document.frm.cnfm_date.value.replace(/-/g,"");
	version = version.substr(0,6);
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	GridObj.SetParam("version", version);
	
	var mergecount 	= GridObj.GetMergeCount('ITEM_ID');	
	
	for(var i =0; i < mergecount ; i++){
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		GridObj.SetCellValue("SELECTED",idx,1);		

	}
	
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.	
	GridObj.DoQuery(servlet_url, "SELECTED");	
 	
 	return;
}    


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 渦綰 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow) {


}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  
	
	
	/* 錯滌っ衙榆 塽 寰瞪營堅 滲唳衛 識в蹂榆 熱薑 */
	var	a = Number(nNewValue);
	var c = Number(nOldValue);
	var b = Number(GridObj.GetCellValue('TOTAL_NEED',nRow)) + a - c;	
	GridObj.SetCellValue('TOTAL_NEED',nRow,b);	
	
	
	/*っ衙陛棟錯熱 啗骯 */
	var	val  = (Number(GridObj.GetCellValue('M_1',nRow)) + Number(GridObj.GetCellValue('M_2',nRow)) + Number(GridObj.GetCellValue('M_3',nRow)) + 
				Number(GridObj.GetCellValue('M_4',nRow)) + Number(GridObj.GetCellValue('M_REMAIN',nRow)))/5;	   
	var result =  Math.round(Number(GridObj.GetCellValue('TOTAL_NEED',nRow))/Number(val));	
	GridObj.SetCellValue('AVL_MONTH',nRow, result);	
	
	
	/* в蹂 嫦輿榆 啗骯 */
	
	var need_qty = Number(GridObj.GetCellValue('TOTAL_QTY',nRow)) - Number(GridObj.GetCellValue('TOTAL_NEED',nRow));	
	if (need_qty > 0) need_qty = 0;
	GridObj.SetCellValue('NEED_QTY',nRow, need_qty );
	
	
}


function GridSetQty(){
	
	var rowcount = GridObj.GetRowCount();
	var a = 0;
	var b = 0;
	var c = 0;
	var d = 0;
	
	var avl_month = 0;
	
	for(var i =0; i < rowcount; i++){
		
		a = GridObj.GetCellValue('M_REMAIN',i);
		b = GridObj.GetCellValue('M_1',i);
		c = GridObj.GetCellValue('M_2',i);
		d = GridObj.GetCellValue('M_3',i);
		f = GridObj.GetCellValue('M_4',i);
		e = GridObj.GetCellValue('SAFE_QTY',i);
		
		var qty 	= Number(a) + Number(b) + Number(c) + Number(d) + Number(f);
		var mon		= qty /5 ;
		
		if (mon === 0) mon = 1;
		var stock	= Number(GridObj.GetCellValue('RECEIPT_EXPT',i)) 	+ Number(GridObj.GetCellValue('RECEIPT_EXPT2',i)) + Number(GridObj.GetCellValue('RECEIPT_EXPT5',i)) +
				      Number(GridObj.GetCellValue('RECEIPT_EXPT3',i))	+ Number(GridObj.GetCellValue('RECEIPT_EXPT4',i)) + Number(GridObj.GetCellValue('BASE_STOCK',i));
		
		if(i%2 !== 0){
			
			 GridObj.SetCellValue('TOTAL_NEED',i,qty);
			 GridObj.SetCellValue('TOTAL_QTY',i,stock);
			 
			 var need = GridObj.GetCellValue('TOTAL_QTY',i) - GridObj.GetCellValue('TOTAL_NEED',i);
			 if (need > 0) need = 0;
			 GridObj.SetCellValue('NEED_QTY',i, need );
			 GridObj.SetCellValue('AVL_MONTH',i,GridObj.GetCellValue('TOTAL_NEED',i)/mon);
		}
		
		
		
	}
}

function GridSetColor(){
	
	var rowcount = GridObj.GetRowCount();
	
	for(var i =0; i < rowcount; i++){
		
		if(i%2 !== 0) {
			
			GridObj.SetCellBgColor('M_1', i , '255|255|200');
			GridObj.SetCellBgColor('M_2', i , '255|255|200');
			GridObj.SetCellBgColor('M_3', i , '255|255|200');
			GridObj.SetCellBgColor('M_4', i , '255|255|200');
			GridObj.SetCellBgColor('M_REMAIN', i , '255|255|200');
			GridObj.SetCellBgColor('EVENT_QTY', i , '255|255|200');
			
		}			
	}
}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME,LEADTIME');
    GridObj.AddSummaryBar('SUMMARY1', 'ヶ謙滌 啗', 'SALES_CAT03', 'sum', 'PM_4,PM_3,PM_2,PM_1,PM_AVG,M_0,M_REMAIN,M_1,M_2,M_3,M_4,SAFE_QTY,TOTAL_NEED,AVL_MONTH,'
    +'EVENT_QTY,BASE_STOCK,RECEIPT_EXPT,RECEIPT_EXPT2,RECEIPT_EXPT3,RECEIPT_EXPT4,RECEIPT_EXPT5,TOTAL_QTY,NEED_QTY,ORDER_QTY');
    
    GridObj.AddSummaryBar('SUMMARY2', '瞪羹 啗'	, 'summaryall', 'sum', 'PM_4,PM_3,PM_2,PM_1,PM_AVG,M_0,M_REMAIN,M_1,M_2,M_3,M_4,SAFE_QTY,TOTAL_NEED,AVL_MONTH,'
    +'EVENT_QTY,BASE_STOCK,RECEIPT_EXPT,RECEIPT_EXPT2,RECEIPT_EXPT3,RECEIPT_EXPT4,RECEIPT_EXPT5,TOTAL_QTY,NEED_QTY,ORDER_QTY');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 

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

