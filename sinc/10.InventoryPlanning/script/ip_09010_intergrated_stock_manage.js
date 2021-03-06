//## Щ煎斜極ID       : ip_09010_intergrated_stock_manage.js
//## Щ煎斜極貲      	 : 鱔м營堅婦葬
//## 滲唳濠           : 檜鬼遵
//## 偃嫦橾濠        	 : 2016-08-08 
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_08.xml
//## 婦溼 query file : query_sinc_ip_09010_intergrated_stock_manage.xml.xml
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
var job_id = 'ip_09010_intergrated_stock_manage';

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

	GridObj.AddHeader("CNFM_DATE"	,"橾濠"			,"t_text" 	   	   ,100	    ,100     ,false); //0   
 	GridObj.AddHeader("CUR_STOCK"	,"旎喇營堅"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK"	,"瞪喇營堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO"	,"旎喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO"	,"瞪喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK2"	,"旎喇營堅"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK2"	,"瞪喇營堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO2"	,"旎喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO2"	,"瞪喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK3"	,"旎喇營堅"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK3"	,"瞪喇營堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO3"	,"旎喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO3"	,"瞪喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK4"	,"旎喇營堅"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK4"	,"瞪喇營堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO4"	,"旎喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO4"	,"瞪喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK5"	,"旎喇營堅"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK5"	,"瞪喇營堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO5"	,"旎喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO5"	,"瞪喇轎堅"	    ,"t_number"  	   ,100		,80    ,false); //0
	
	GridObj.AddGroup	("GUBN",    "賊/蝶頃");			
	GridObj.AppendHeader("GUBN", 	"CUR_STOCK");
	GridObj.AppendHeader("GUBN", 	"LAST_STOCK");
	GridObj.AppendHeader("GUBN", 	"CUR_CHGO");
	GridObj.AppendHeader("GUBN",   	"LAST_CHGO");
	
	GridObj.AddGroup	("GUBN2",   "衙殮鼻ヶ");			
	GridObj.AppendHeader("GUBN2", 	"CUR_STOCK2");
	GridObj.AppendHeader("GUBN2", 	"LAST_STOCK2");
	GridObj.AppendHeader("GUBN2", 	"CUR_CHGO2");
	GridObj.AppendHeader("GUBN2",   "LAST_CHGO2");
	
	GridObj.AddGroup	("GUBN3",   "熱殮鼻ヶ");			
	GridObj.AppendHeader("GUBN3", 	"CUR_STOCK3");
	GridObj.AppendHeader("GUBN3", 	"LAST_STOCK3");
	GridObj.AppendHeader("GUBN3", 	"CUR_CHGO3");
	GridObj.AppendHeader("GUBN3",   "LAST_CHGO3");
	
	GridObj.AddGroup	("GUBN4",   "晦顫");			
	GridObj.AppendHeader("GUBN4", 	"CUR_STOCK4");
	GridObj.AppendHeader("GUBN4", 	"LAST_STOCK4");
	GridObj.AppendHeader("GUBN4", 	"CUR_CHGO4");
	GridObj.AppendHeader("GUBN4",   "LAST_CHGO4");
	
	GridObj.AddGroup	("GUBN5",   "啗");			
	GridObj.AppendHeader("GUBN5", 	"CUR_STOCK5");
	GridObj.AppendHeader("GUBN5", 	"LAST_STOCK5");
	GridObj.AppendHeader("GUBN5", 	"CUR_CHGO5");
	GridObj.AppendHeader("GUBN5",   "LAST_CHGO5");
	
	GridObj.BoundHeader();	

	GridObj.SetColFix('CNFM_DATE'); 
	
	GridObj.SetColCellAlign('CNFM_DATE',        'center');
	
   	GridObj.SetNumberFormat("CUR_STOCK",       	"###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO",       	"###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK2",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK2",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO2",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO2",       "###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK3",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK3",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO3",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO3",       "###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK4",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK4",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO4",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO4",       "###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK5",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK5",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO5",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO5",       "###,###.#");
   
 
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
   var start_date	    = document.frm.start_date.value;
   var end_date	        = document.frm.end_date.value;
   //start_date 			= start_date.replace(/-/g,"");
   //end_date 			= end_date.replace(/-/g,"");
 
   var user_id			= document.frm._user_id.value;
   var selected_type	= document.frm.selected_type.value; 
	
       	
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("end_date",       	end_date);
   GridObj.SetParam("user_id",     		user_id);  
   GridObj.SetParam("selected_type", 	selected_type); 
  	
   GridObj.DoQuery(servlet_url);       
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}

function GridSetMerge(){	
	
	GridObj.AddSummaryBar('SUMMARY', 'ゎ敕', 'summaryall', 'sum', 'CUR_STOCK,LAST_STOCK,CUR_CHGO,LAST_CHGO,CUR_STOCK2,LAST_STOCK2,CUR_CHGO2,LAST_CHGO2,' +
	      	 			'CUR_STOCK3,LAST_STOCK3,CUR_CHGO3,LAST_CHGO3,CUR_STOCK4,LAST_STOCK4,CUR_CHGO4,LAST_CHGO4,CUR_STOCK5,LAST_STOCK5,CUR_CHGO5,LAST_CHGO5');
	
	var rowcount = GridObj.GetRowCount();
	var cnt_cur_chgo 	= 0;
	var cnt_last_chgo	= 0;
	for (var i=0; i<rowcount; i++){
		if(GridObj.GetCellValue('CUR_CHGO',i) == '0') cnt_cur_chgo += Number(1) ;
		if(GridObj.GetCellValue('LAST_CHGO',i) == '0') cnt_last_chgo += Number(1) ;
	}	
	
	var result 	= rowcount - cnt_cur_chgo ;
	var result2	= rowcount - cnt_last_chgo;
	
    	        
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK5');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK5');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO5');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO5');   	

   	
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK2',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK2',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO2',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO2',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK3',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK3',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO3',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO3',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK4',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK4',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO4',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO4',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK5',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK5',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO5',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO5',0).replace(/,/g,"")/result2));

	GridObj.SetSummaryBarColor('SUMMARY', '0|153|0', color_tot);
}
