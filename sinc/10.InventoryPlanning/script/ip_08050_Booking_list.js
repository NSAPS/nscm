//## Щ煎斜極ID		: ip_08050_Booking_list.js
//## Щ煎斜極貲		: 睡韁葬蝶お
//## 滲唳濠			: 檜鬼遵
//## 偃嫦橾濠			: 2016-05-10
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
var job_id = 'ip_08050_Booking_list';

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
	
	GridObj.AddHeader("ROWNUM"	   		,"牖憮"  		,"t_number"     ,100.3		,40     ,false); //0 
	GridObj.AddHeader("ORDER_NO"		,"輿僥廓��"		,"t_text" 	    ,100	    ,70     ,false); //0  
	GridObj.AddHeader("BRAND_NO"		,"陶ヶ廓��"  		,"t_text"     	,100		,70     ,false); //0  
 	GridObj.AddHeader("BOOKING_NO"	    ,"BOOKING\n廓��"	,"t_text" 	   	,100	    ,70     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	    	,"薯ヶ囀萄"		,"t_text" 	   	,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"薯ヶ貲"	        ,"t_text" 	   	,100	    ,250    ,false); //0
 	GridObj.AddHeader("ORDER_QTY"		,"輿僥榆"			,"t_number"  	,100.3		,70    ,false); //0
 	
 	
 	GridObj.AddHeader("SHIPPLAN_DATE"	,"摹瞳橾"			,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("ETD_DATE"		,"ETD DATE"		,"t_text"  		,100		,0     ,false); //0
 	GridObj.AddHeader("EXPORT_DECLARE"	,"憮盟葆馬橾"		,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("CLOSING_DATE"	,"CLOSING DATE"	,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("ZPLDAT"			,"儅骯蹂羶橾"		,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("LOCAL_DIV"		,"熱轎/煎鏽"		,"t_text"  		,100		,60    ,false); //0
 	GridObj.AddHeader("CENTER_CD"		,"濛機濰(滲翕)"	,"t_text"  		,100		,90    ,false); //0
 	GridObj.AddHeader("DELIVERY_CD"		,"剪楚摹"			,"t_text"  		,100		,160    ,false); //0
 	
 	GridObj.AddHeader("BOOKING_DATE"	,"BOOKING\n殮溘橾"		,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("BOOKING_USER"	,"BOOKING\n殮溘濠"		,"t_text"  		,100		,0    ,false); //0
 	GridObj.AddHeader("BRAND_DATE"		,"陶ヶ 殮溘橾"				,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("BRAND_USER"		,"陶ヶ 殮溘濠"				,"t_text"  		,100		,0    ,false); //0
 	GridObj.AddHeader("FLAG"			,"FLAG"					,"t_text"  		,100		,0    ,false); //0
 	GridObj.AddHeader("CHGO_DATE"		,"睡舒 轎堅橾"				,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("GUBN"			,"葆馬掘碟"				,"t_text"  		,100		,70    ,false); //0

 	
	GridObj.BoundHeader();	
	
	GridObj.SetColCellAlign('ORDER_NO',  		'center'); 
	GridObj.SetColCellAlign('BRAND_NO',  		'center'); 
	GridObj.SetColCellAlign('BOOKING_NO',  		'center'); 
	GridObj.SetColCellAlign('ITEM_ID',  		'center'); 
	GridObj.SetColCellAlign('SHIPPLAN_DATE',  	'center'); 
	GridObj.SetColCellAlign('ETD_DATE',  		'center'); 
	GridObj.SetColCellAlign('EXPORT_DECLARE',  	'center'); 
	GridObj.SetColCellAlign('CLOSING_DATE',  	'center'); 
	GridObj.SetColCellAlign('ZPLDAT',  			'center');
	GridObj.SetColCellAlign('LOCAL_DIV',  		'center'); 
	GridObj.SetColCellAlign('CENTER_CD',  		'center'); 
	GridObj.SetColCellAlign('DELIVERY_CD',  	'center'); 
	GridObj.SetColCellAlign('BOOKING_DATE',  	'center'); 
	GridObj.SetColCellAlign('BOOKING_USER',  	'center'); 
	GridObj.SetColCellAlign('BRAND_DATE',  		'center'); 
	GridObj.SetColCellAlign('BRAND_USER',  		'center'); 
	GridObj.SetColCellAlign('GUBN',  			'center'); 
	GridObj.SetColCellAlign('CHGO_DATE',  		'center'); 
	GridObj.SetColCellAlign('ROWNUM',  			'center');
	
	GridObj.SetNumberFormat("ORDER_QTY",       	"###,###.#");
	
	GridObj.SetColCellBgColor('ROWNUM','255|255|200');

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
        	
        	GridSetFlag();
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

	
	
};



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
		
   var start_date	    = document.frm.start_date.value;
   start_date 			= start_date.replace(/-/g,"");
   var end_date	    	= document.frm.end_date.value;
   end_date 			= end_date.replace(/-/g,"");
   var domain			= document.frm.domain.value;   
   var search_item		= document.frm.search_item.value;
   var search_order		= document.frm.search_order.value;
   var search_napum		= document.frm.search_napum.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("end_date",   		end_date);
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("domain",   		domain);
   GridObj.SetParam("search_item",		search_item);		
   GridObj.SetParam("search_order",		search_order);
   GridObj.SetParam("search_napum",		search_napum);
   GridObj.DoQuery(servlet_url);       
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 渦綰 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow) {
	
	

}

function GridSetFlag(){
	
	var rowcount = GridObj.GetRowCount();
	for (var i =0; i <rowcount; i++){
		
		var flag = GridObj.GetCellValue('FLAG',i);
		var gubn = GridObj.GetCellValue('GUBN',i);
		if( flag === 'F') 		GridObj.SetCellBgColor('ITEM_ID', i , '255|54|54');
		if( gubn === '嘐轎堅') 	GridObj.SetCellBgColor('GUBN', i , '212|244|250');
		
	}
}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('ORDER_NO,BRAND_NO,BOOKING_NO,SHIPPLAN_DATE,ETD_DATE,EXPORT_DECLARE,CLOSING_DATE,ZPLDAT,LOCAL_DIV,CENTER_CD,'
	+'DELIVERY_CD,BOOKING_DATE,BOOKING_USER,BRAND_DATE,BRAND_USER,GUBN');
	
    GridObj.AddSummaryBar('SUMMARY1', '瞪ル滌 啗', 'ORDER_NO', 'sum', 'ORDER_QTY');
    GridObj.AddSummaryBar('SUMMARY2', '瞪羹 啗'	, 'summaryall', 'sum', 'ORDER_QTY');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 


}


