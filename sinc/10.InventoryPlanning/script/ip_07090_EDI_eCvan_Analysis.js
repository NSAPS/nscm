//## Щ煎斜極ID      : ip_07090_EDI_eCvan_Analysis.js
//## Щ煎斜極貲      : EDI eCvan 碟戮 褻��
//## 偃嫦濠	        : 檜鬼遵
//## 偃嫦橾濠        : 2015-01-29 
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-01-29	檜鬼遵		CREATE
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;															// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path 	 = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id		 = 'ip_07090_EDI_eCvan_Analysis';

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

	//GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
    GridObj.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
    
    //斜葬萄 撚 舒移 褻薑
    GridObj.strCellBorderStyle='raisedsoft';
    GridObj.strHDBorderStyle='raisedsoft';
   
   
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

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,0  ,false);
  	//GridObj.SetColHide("CRUD", true); 
  	
	GridObj.AddHeader("CNFM_DATE"	       ,"橾濠"	    	,"t_text"      	,100	    ,80     ,false); //0
	GridObj.AddHeader("ODER_BOX_NS"	       ,"嫦輿榆"		,"t_number"	   	,100.3	    ,90     ,false); //0
	GridObj.AddHeader("ODER_BOX_NS_2"	   ,"嫦輿榆"		,"t_number"	   	,100.3	    ,90     ,false); //0

	GridObj.AddHeader("ODER_AMT_NS"	       ,"嫦輿擋"		,"t_number"	   	,100.3	    ,90     ,false); //0

 	
 	// EDI 葆馬晦遽
 	GridObj.AddHeader("EDI_SELL_BOX"	   ,"陶ヶ榆"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_SELL_BOX_2"	   ,"陶ヶ榆"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_SELL_AMT"	   ,"陶ヶ擋"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_MN_BOX"	       ,"嘐陶榆"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_MN_BOX_2"	   ,"嘐陶榆"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_MN_AMT"	       ,"嘐陶擋"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	
 	GridObj.AddHeader("EDI_NS_MN"	       ,"堯褕嘐陶"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_NS_MN_2"	       ,"堯褕嘐陶"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_NS_MN_AMT"	   ,"堯褕嘐陶擋"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_EMART_MN"	   ,"檜葆お嘐陶"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_EMART_MN_2"	   ,"檜葆お嘐陶"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_EMART_MN_AMT"   ,"檜葆お嘐陶擋"	,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("EDI_MN_RATE"	   	   ,"嘐陶徽"	  		,"t_text" 		,100   		,80    ,false); //0
 	// eCvan 晦遽
 	GridObj.AddHeader("ECV_SELL_BOX"	   ,"陶ヶ榆"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_SELL_BOX_2"	   ,"陶ヶ榆"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_SELL_AMT"	   ,"陶ヶ擋"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_MN_BOX"	       ,"嘐陶榆"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_MN_BOX_2"	   ,"嘐陶榆"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_MN_AMT"	       ,"嘐陶擋"	   		,"t_number" 	,100.3	    ,80    ,false); //0
 	
 	GridObj.AddHeader("ECV_NS_MN"	       ,"堯褕嘐陶"	    ,"t_number" 	,100.3	    ,80    ,false); //0 	
 	
 	GridObj.AddHeader("ECV_EMART_MN"	   ,"檜葆お嘐陶"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_MN_RATE"	   	   ,"嘐陶徽"	  		,"t_text" 		,100   		,80    ,false); //0
 	
 	GridObj.AddHeader("MN_GAP"	      	   ,"嘐陶離檜榆"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("MN_GAP_AMT"	       ,"嘐陶離檜擋"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("MN_GAP_2"	       ,"嘐陶離檜榆"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	// む割じ 旎擋
 	GridObj.AddHeader("EDI_PANALTY"	       ,"EDI 晦遽"	    ,"t_number" 	,100.3	    ,80    ,false); //0
 	GridObj.AddHeader("ECV_PANALTY"	       ,"eCvan 晦遽"	    ,"t_number" 	,100.3	    ,80    ,false); //0
	
	/* 檜醞④渦 蹺陛 */
	GridObj.AddGroup	("EDI",     "EDI 葆馬晦遽");			
	GridObj.AppendHeader("EDI", 	"EDI_SELL_BOX");
	GridObj.AppendHeader("EDI", 	"EDI_SELL_BOX_2");
	GridObj.AppendHeader("EDI", 	"EDI_SELL_AMT");
	GridObj.AppendHeader("EDI",     "EDI_MN_BOX");
	GridObj.AppendHeader("EDI",     "EDI_MN_BOX_2");
	GridObj.AppendHeader("EDI",     "EDI_MN_AMT");
	GridObj.AppendHeader("EDI",     "EDI_NS_MN");
	GridObj.AppendHeader("EDI",     "EDI_NS_MN_2");
	GridObj.AppendHeader("EDI",     "EDI_NS_MN_AMT");
	GridObj.AppendHeader("EDI",     "EDI_EMART_MN");	
	GridObj.AppendHeader("EDI",     "EDI_EMART_MN_2");
	GridObj.AppendHeader("EDI",     "EDI_EMART_MN_AMT");	
	GridObj.AppendHeader("EDI",     "EDI_MN_RATE");
	
	GridObj.AddGroup	("ECV",     "ECV 葆馬晦遽");			
	GridObj.AppendHeader("ECV", 	"ECV_SELL_BOX");
	GridObj.AppendHeader("ECV", 	"ECV_SELL_BOX_2");
	GridObj.AppendHeader("ECV", 	"ECV_SELL_AMT");
	GridObj.AppendHeader("ECV",     "ECV_MN_BOX");
	GridObj.AppendHeader("ECV",     "ECV_MN_BOX_2");
	GridObj.AppendHeader("ECV",     "ECV_MN_AMT");	
	GridObj.AppendHeader("ECV",     "ECV_NS_MN");
	GridObj.AppendHeader("ECV",     "ECV_EMART_MN");		
	GridObj.AppendHeader("ECV",     "ECV_MN_RATE");
	
	GridObj.AddGroup	("PANALTY", "む割じ 旎擋");			
	GridObj.AppendHeader("PANALTY", "EDI_PANALTY");
	GridObj.AppendHeader("PANALTY", "ECV_PANALTY");
	
	GridObj.BoundHeader();	
	
	GridObj.SetColHide("ODER_BOX_NS_2", 	true);
	
	GridObj.SetColHide("ODER_AMT_NS", 		true);
	
	GridObj.SetColHide("EDI_SELL_BOX_2", 	true);
	GridObj.SetColHide("EDI_SELL_AMT", 		true);
	GridObj.SetColHide("EDI_MN_BOX_2", 		true);
	GridObj.SetColHide("EDI_MN_AMT", 		true);	
	GridObj.SetColHide("ECV_SELL_BOX_2", 	true);	
	GridObj.SetColHide("ECV_SELL_AMT", 		true);
	GridObj.SetColHide("ECV_MN_BOX_2", 		true);
	GridObj.SetColHide("ECV_MN_AMT", 		true);
	GridObj.SetColHide("MN_GAP_2", 			true);
	GridObj.SetColHide("MN_GAP_AMT", 		true);
	
	GridObj.SetColHide("EDI_NS_MN_2", 		true);
	GridObj.SetColHide("EDI_NS_MN_AMT", 	true);
	GridObj.SetColHide("EDI_EMART_MN_2", 	true);
	GridObj.SetColHide("EDI_EMART_MN_AMT", 	true);
	
	
	GridObj.SetColCellAlign('CNFM_DATE',  	'center');
	GridObj.SetColCellAlign('ODER_BOX_NS', 	'right');
	
	GridObj.SetColCellAlign('EDI_SELL_BOX', 'right');	
	GridObj.SetColCellAlign('EDI_SELL_AMT', 'right');
	GridObj.SetColCellAlign('EDI_MN_BOX',   'right');
	GridObj.SetColCellAlign('EDI_MN_AMT',   'right');
	GridObj.SetColCellAlign('EDI_NS_MN',  	'right');	
	GridObj.SetColCellAlign('EDI_EMART_MN', 'right');
	GridObj.SetColCellAlign('EDI_MN_RATE',  'right');
	GridObj.SetColCellAlign('ECV_SELL_BOX', 'right');
	GridObj.SetColCellAlign('ECV_SELL_AMT', 'right');
	GridObj.SetColCellAlign('ECV_MN_BOX',   'right');
	GridObj.SetColCellAlign('ECV_MN_AMT',   'right');
	GridObj.SetColCellAlign('ECV_NS_MN',  	'right');	
	GridObj.SetColCellAlign('ECV_EMART_MN', 'right');
	GridObj.SetColCellAlign('ECV_MN_RATE',  'right');
	GridObj.SetColCellAlign('MN_GAP',  		'right');
	GridObj.SetColCellAlign('MN_GAP_AMT',  	'right');
	GridObj.SetColCellAlign('EDI_PANALTY',  'right');
	GridObj.SetColCellAlign('ECV_PANALTY',  'right');
	
	GridObj.SetNumberFormat("ODER_BOX_NS",    	"###,###.#");
	
	GridObj.SetNumberFormat("EDI_SELL_BOX",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_SELL_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_MN_BOX",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_MN_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_NS_MN",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_EMART_MN",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_SELL_BOX",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_SELL_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_MN_BOX",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_MN_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_NS_MN",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_EMART_MN",    	"###,###.#");
	GridObj.SetNumberFormat("MN_GAP",    		"###,###.#");
	GridObj.SetNumberFormat("MN_GAP_AMT",    	"###,###.#");
	GridObj.SetNumberFormat("EDI_PANALTY",    	"###,###.#");
	GridObj.SetNumberFormat("ECV_PANALTY",    	"###,###.#");
	
	GridObj.SetColHDBgColor('ODER_BOX_NS',		'253|228|229');
	
	GridObj.SetColHDBgColor('EDI_SELL_BOX',		'253|228|229');
    GridObj.SetColHDBgColor('EDI_MN_BOX',		'253|228|229');
    GridObj.SetColHDBgColor('ECV_SELL_BOX',		'253|228|229');
    GridObj.SetColHDBgColor('ECV_MN_BOX',		'253|228|229');
    GridObj.SetColHDBgColor('MN_GAP',			'253|228|229');
    
    GridObj.SetColHDBgColor('EDI_NS_MN',		'253|228|229');
    GridObj.SetColHDBgColor('EDI_EMART_MN',		'253|228|229');
	
	
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
            if(GridObj.GetStatus() == "true")  {     
            	
            	GridSetMerge();
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }	    
       
		
    }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service){
   	
    doQuery();
}

function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       var item_type		= document.all.item_type.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
 
	   var user_id			= document.all._user_id.value;      
      // var in_act_type	    = document.all.in_act_type.value;   
     
      // var in_qty_gubn		= document.all.in_qty_gubn.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
        
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type", 	 item_type);

	   GridObj.SetParam("user_id", 			user_id);
	   //GridObj.SetParam("in_qty_gubn",  in_qty_gubn);	
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

function CallPop(){
	
	var start_date = document.frm.start_date.value;
	var end_date   = document.frm.end_date.value;
	var itype	   = document.frm.item_type.value;

	
	var service_url = "service.do?_moon_service=ip_07090_EDI_eCvan_Analysis_pop_all";
		service_url += "&start_date=" + start_date + "&end_date=" + end_date + "&itype=" + itype ;  
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1335, height=740, top=50, left=150";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
}		

function GridCellDblClick(strColumnKey, nRow){	
	
	var cnfm_date = GridObj.GetCellValue("CNFM_DATE", nRow);
	var itype	  = document.frm.item_type.value;
	var gubn;
	
	if(strColumnKey == "EDI_NS_MN"){
		
		gubn	= 1;
		var service_url = "service.do?_moon_service=ip_07090_EDI_eCvan_Analysis_pop";
		service_url += "&cnfm_date=" + cnfm_date + "&itype=" + itype + "&gubn=" + gubn  ;  
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1285, height=740, top=50, left=150";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
	}
	else if(strColumnKey == "EDI_EMART_MN"){
		
		gubn	= 2;
		var service_url = "service.do?_moon_service=ip_07090_EDI_eCvan_Analysis_pop";
		service_url += "&cnfm_date=" + cnfm_date + "&itype=" + itype + "&gubn=" + gubn  ;  
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1285, height=740, top=50, left=150";
		var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();	
		
	}else{
		
//		gubn	= 3;
//		var service_url = "service.do?_moon_service=ip_07090_EDI_eCvan_Analysis_pop_ecv";
//		service_url += "&cnfm_date=" + cnfm_date + "&itype=" + itype + "&gubn=" + gubn  ;  
//		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1285, height=740, top=50, left=150";
//		var newWin = window.open(service_url, "", pop_win_style);
//		newWin.focus();	
	}
	
	
	
}

/* ④渦 滲�� 瞪羲滲熱 摹樹 */
	var ODER_BOX_NS_IDX		= 0;
	
	var EDI_SELL_BOX_IDX 	= 0;
	var EDI_MN_BOX_IDX	 	= 0;
	var ECV_SELL_BOX_IDX	= 0;
	var ECV_MN_BOX_IDX	 	= 0;
	var MN_GAP_IDX	   		= 0;
	
	var EDI_NS_MN_IDX		= 0;
	var EDI_EMART_MN_IDX	= 0;	
	

function HeaderClick(strColumnKey){
	
	var GridObj = document.WiseGrid;
	
	/* EDI 嫦輿榆*/
	if(strColumnKey == "ODER_BOX_NS"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(ODER_BOX_NS_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("ODER_BOX_NS",GridObj.GetColHDText("ODER_AMT_NS"));
				GridObj.SetCellValue('ODER_BOX_NS',i,GridObj.GetCellValue("ODER_AMT_NS", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("ODER_BOX_NS",GridObj.GetColHDText("ODER_BOX_NS_2"));
				GridObj.SetCellValue('ODER_BOX_NS',i,GridObj.GetCellValue("ODER_BOX_NS_2", i));
			}			
							
		}
		if(ODER_BOX_NS_IDX == '1') {
			ODER_BOX_NS_IDX =0; 
			
		}else {
			ODER_BOX_NS_IDX =1;
			
		}
	}

	
	/* EDI 陶ヶ榆*/
	if(strColumnKey == "EDI_SELL_BOX"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(EDI_SELL_BOX_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("EDI_SELL_BOX",GridObj.GetColHDText("EDI_SELL_AMT"));
				GridObj.SetCellValue('EDI_SELL_BOX',i,GridObj.GetCellValue("EDI_SELL_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("EDI_SELL_BOX",GridObj.GetColHDText("EDI_SELL_BOX_2"));
				GridObj.SetCellValue('EDI_SELL_BOX',i,GridObj.GetCellValue("EDI_SELL_BOX_2", i));
			}			
							
		}
		if(EDI_SELL_BOX_IDX == '1') {
			EDI_SELL_BOX_IDX =0; 
			
		}else {
			EDI_SELL_BOX_IDX =1;
			
		}
	}
	
	/* EDI 嘐陶榆 */
	if(strColumnKey == "EDI_MN_BOX"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(EDI_MN_BOX_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("EDI_MN_BOX",GridObj.GetColHDText("EDI_MN_AMT"));
				GridObj.SetCellValue('EDI_MN_BOX',i,GridObj.GetCellValue("EDI_MN_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("EDI_MN_BOX",GridObj.GetColHDText("EDI_MN_BOX_2"));
				GridObj.SetCellValue('EDI_MN_BOX',i,GridObj.GetCellValue("EDI_MN_BOX_2", i));
			}			
							
		}
		if(EDI_MN_BOX_IDX == '1') {
			EDI_MN_BOX_IDX =0; 
			
		}else {
			EDI_MN_BOX_IDX =1;
			
		}
	}
	
	if(strColumnKey == "EDI_NS_MN"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(EDI_NS_MN_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("EDI_NS_MN",GridObj.GetColHDText("EDI_NS_MN_AMT"));
				GridObj.SetCellValue('EDI_NS_MN',i,GridObj.GetCellValue("EDI_NS_MN_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("EDI_NS_MN",GridObj.GetColHDText("EDI_NS_MN_2"));
				GridObj.SetCellValue('EDI_NS_MN',i,GridObj.GetCellValue("EDI_NS_MN_2", i));
			}			
							
		}
		if(EDI_NS_MN_IDX == '1') {
			EDI_NS_MN_IDX =0; 
			
		}else {
			EDI_NS_MN_IDX =1;
			
		}
	}
	
		if(strColumnKey == "EDI_EMART_MN"){
		
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(EDI_EMART_MN_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("EDI_EMART_MN",GridObj.GetColHDText("EDI_EMART_MN_AMT"));
				GridObj.SetCellValue('EDI_EMART_MN',i,GridObj.GetCellValue("EDI_EMART_MN_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("EDI_EMART_MN",GridObj.GetColHDText("EDI_EMART_MN_2"));
				GridObj.SetCellValue('EDI_EMART_MN',i,GridObj.GetCellValue("EDI_EMART_MN_2", i));
			}			
							
		}
		if(EDI_EMART_MN_IDX == '1') {
			EDI_EMART_MN_IDX =0; 
			
		}else {
			EDI_EMART_MN_IDX =1;
			
		}
	}
	
	/* eCvan 陶ヶ榆 */
	if(strColumnKey == "ECV_SELL_BOX"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(ECV_SELL_BOX_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("ECV_SELL_BOX",GridObj.GetColHDText("ECV_SELL_AMT"));
				GridObj.SetCellValue('ECV_SELL_BOX',i,GridObj.GetCellValue("ECV_SELL_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("ECV_SELL_BOX",GridObj.GetColHDText("ECV_SELL_BOX_2"));
				GridObj.SetCellValue('ECV_SELL_BOX',i,GridObj.GetCellValue("ECV_SELL_BOX_2", i));
			}			
							
		}
		if(ECV_SELL_BOX_IDX == '1') {
			ECV_SELL_BOX_IDX =0; 
			
		}else {
			ECV_SELL_BOX_IDX =1;
			
		}
	}
	
	/* eCvan 嘐陶榆 */
	if(strColumnKey == "ECV_MN_BOX"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(ECV_MN_BOX_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("ECV_MN_BOX",GridObj.GetColHDText("ECV_MN_AMT"));
				GridObj.SetCellValue('ECV_MN_BOX',i,GridObj.GetCellValue("ECV_MN_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("ECV_MN_BOX",GridObj.GetColHDText("ECV_MN_BOX_2"));
				GridObj.SetCellValue('ECV_MN_BOX',i,GridObj.GetCellValue("ECV_MN_BOX_2", i));
			}			
							
		}
		if(ECV_MN_BOX_IDX == '1') {
			ECV_MN_BOX_IDX =0; 
			
		}else {
			ECV_MN_BOX_IDX =1;
			
		}
	}
	
	/* 嘐陶離檜榆 */
	if(strColumnKey == "MN_GAP"){
		for(var i=0; i < GridObj.GetRowCount();i++ ) {
			
			if(MN_GAP_IDX == 0) {
				
				if(i==0) GridObj.SetColHDText("MN_GAP",GridObj.GetColHDText("MN_GAP_AMT"));
				GridObj.SetCellValue('MN_GAP',i,GridObj.GetCellValue("MN_GAP_AMT", i));
				
			}else{
				
				if(i==0) GridObj.SetColHDText("MN_GAP",GridObj.GetColHDText("MN_GAP_2"));
				GridObj.SetCellValue('MN_GAP',i,GridObj.GetCellValue("MN_GAP_2", i));
			}			
							
		}
		if(MN_GAP_IDX == '1') {
			MN_GAP_IDX =0; 
			
		}else {
			MN_GAP_IDX =1;
			
		}
	}
}


function GridSetMerge(){
	
				

   GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'ODER_BOX_NS,ODER_AMT_NS,EDI_SELL_BOX,EDI_SELL_AMT,'
   						+'EDI_MN_BOX,,EDI_MN_AMT,EDI_NS_MN,EDI_EMART_MN,EDI_MN_RATE,ECV_SELL_BOX,,ECV_SELL_AMT,'
   						+'ECV_MN_BOX,,ECV_MN_AMT,ECV_NS_MN,ECV_EMART_MN,MN_GAP,EDI_PANALTY,ECV_PANALTY'); 
         	   
       	  
    	        
   GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
    	 	
}


