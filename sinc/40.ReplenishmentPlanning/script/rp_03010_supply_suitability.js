//## Щ煎斜極ID       	: rp_03010_supply_suitability.js
//## Щ煎斜極貲       	: 僭榆 瞳м撩 婦葬
//## 滲唳濠           	: 檜鬼遵
//## 偃嫦橾濠         	: 2016-08-24 
//## 婦溼 job file   	: job_sinc_40_replenishmentPlanning_05.xml.xml
//## 婦溼 query file 	: query_sinc_40_replenishmentPlanning_05.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2016-08-24   檜鬼遵      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'rp_03010_supply_suitability';

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
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {       
	
	
	var cnfm_date = document.frm.cnfm_date.value;

	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "rp_03010_supply_suitability_header",{
	callback:function(result){
	  	
	  	GridObj.AddHeader("SALES_CAT03"	          	,"ヶ謙"			,"t_text" 	   ,100	    ,70     ,false); //0   
		GridObj.AddHeader("ITEM_ID"	          		,"ヶ跡囀萄"		,"t_text" 	   ,100	    ,70     ,false); //0   
	 	GridObj.AddHeader("ITEM_NAME"	      		,"ヶ跡貲"	        ,"t_text" 	   ,100	    ,180    ,false); //0	 	
	 	GridObj.AddHeader("SALES_MEAN_1WEEK_ETC"  	,"1輿 ゎ敕"		,"t_number"    ,100.3	,60     ,false); //0
	 	GridObj.AddHeader("SALES_MEAN_3WEEK_ETC"  	,"3輿 ゎ敕"		,"t_number"    ,100.3	,60     ,false); //0
	 	GridObj.AddHeader("SALES_MEAN_13WEEK_ETC"  	,"1/3輿\nゎ敕"	,"t_number"    ,100.3	,0     ,false); //0 		
 		
		for(var i=0 ; i < 21 ; i++){
			  
			if(i < result.length) {
				GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,60  	,false);    
			} 	
			else {
				j = strToNum(i)+strToNum(1);
				if(i < 21) { //11
					GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,60  	,false);
				}
				else {
					GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,60 	,false);
				}
			}
		}
		
		GridObj.AddHeader("STDDEV_POP"  			,"っ衙ら離"		,"t_number"    ,100.3	,60    ,false); //0		
		GridObj.AddHeader("DAY_GUBN_0"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_1"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_2"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_3"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_4"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_5"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_7"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_8"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_9"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_10"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_11"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_12"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_14"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_15"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_16"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_17"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_18"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
		GridObj.AddHeader("DAY_GUBN_19"	      		,"掘碟"	        ,"t_text" 	   ,100	    ,0    ,false); //0
	
		GridObj.BoundHeader();
		
		GridObj.SetColFix('ITEM_NAME'); 
		
		GridObj.SetColCellAlign('ITEM_NAME',        	  		'left');
	    GridObj.SetNumberFormat("SALES_MEAN_1WEEK_ETC",       	"###,###.#");
	 	GridObj.SetNumberFormat("SALES_MEAN_3WEEK_ETC",       	"###,###.#");
	 	GridObj.SetNumberFormat("SALES_MEAN_13WEEK_ETC",       	"###,###.#");	
	 	GridObj.SetNumberFormat("DAY_0",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_1",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_2",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_3",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_4",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_5",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_6",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_7",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_8",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_9",       					"###,###.#");
	 	GridObj.SetNumberFormat("DAY_10",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_11",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_12",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_13",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_14",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_15",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_16",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_17",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_18",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_19",       				"###,###.#");
	 	GridObj.SetNumberFormat("DAY_20",       				"###,###.#");
	 	GridObj.SetNumberFormat("STDDEV_POP",       			"###,###.#");
	 	
	 	GridObj.SetColCellBgColor('DAY_6','255|217|250');
	 	GridObj.SetColCellBgColor('DAY_13','255|217|250');
	 	GridObj.SetColCellBgColor('DAY_20','255|217|250');
		
		}
		
	});
 	
 	
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
            	
            	GridSetEventGubn();
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
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var cnfm_date	    = document.frm.cnfm_date.value;      
       cnfm_date 			= cnfm_date.replace(/-/g,"");
     
	   var user_id			= document.frm._user_id.value;         
       var gubn	    		= document.frm.gubn.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           	"search");
       GridObj.SetParam("cnfm_date",  		cnfm_date);
       GridObj.SetParam("user_id",       	user_id);
       GridObj.SetParam("gubn",  			gubn);	
         
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

function GridCellDblClick(strColumnKey, nRow){
	
	if(strColumnKey == 'ITEM_NAME') {
	
	
	var item_id			= GridObj.GetCellValue('ITEM_ID',nRow);
	var cnfm_date	    = document.frm.cnfm_date.value;      
       cnfm_date 		= cnfm_date.replace(/-/g,"");		
	
	var service_url = "service.do?_moon_service=rp_03010_supply_suitability_pop";
		service_url += "&item_id=" + item_id  + "&cnfm_date=" + cnfm_date ;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=yes, resizable=yes, width=975, height=640, top=50, left=200";
	var newWin = window.open(service_url, "", pop_win_style);
		newWin.focus();		
	}	
	
}

function HeaderClick(strColumnKey){
	
}

function GridChangeCell(strColumnKey, nRow, vtOldValue, vtNewValue){

}	


function GridSetMerge(){

	
	GridObj.SetGroupMerge('SALES_CAT03');
    GridObj.AddSummaryBar('SUMMARY1', '模啗', 'SALES_CAT03', 'sum', 'SALES_MEAN_1WEEK_ETC,SALES_MEAN_3WEEK_ETC,SALES_MEAN_13WEEK_ETC,DAY_0,DAY_1,DAY_2,DAY_3,DAY_4,DAY_5,'
    + 'DAY_6,DAY_7,DAY_8,DAY_9,DAY_10,DAY_11,DAY_12,DAY_13,DAY_14,DAY_15,DAY_16,DAY_17,DAY_18,DAY_19,DAY_20' ); 
    GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'SALES_MEAN_1WEEK_ETC,SALES_MEAN_3WEEK_ETC,SALES_MEAN_13WEEK_ETC,DAY_0,DAY_1,DAY_2,DAY_3,DAY_4,DAY_5,'
    + 'DAY_6,DAY_7,DAY_8,DAY_9,DAY_10,DAY_11,DAY_12,DAY_13,DAY_14,DAY_15,DAY_16,DAY_17,DAY_18,DAY_19,DAY_20' );
   

       
	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
}

function GridSetEventGubn(){
	
	var rowcount = GridObj.GetRowCount();
	for( var i =0; i < rowcount; i++){
		/* W-1 */
		var day_0 = GridObj.GetCellValue('DAY_GUBN_0',i);
		if (day_0 == 'O') GridObj.SetCellBgColor('DAY_0',i,'255|255|200');
		var day_1 = GridObj.GetCellValue('DAY_GUBN_1',i);
		if (day_1 == 'O') GridObj.SetCellBgColor('DAY_1',i,'255|255|200');
		var day_2 = GridObj.GetCellValue('DAY_GUBN_2',i);
		if (day_2 == 'O') GridObj.SetCellBgColor('DAY_2',i,'255|255|200');
		var day_3 = GridObj.GetCellValue('DAY_GUBN_3',i);
		if (day_3 == 'O') GridObj.SetCellBgColor('DAY_3',i,'255|255|200');
		var day_4 = GridObj.GetCellValue('DAY_GUBN_4',i);
		if (day_4 == 'O') GridObj.SetCellBgColor('DAY_4',i,'255|255|200');
		var day_5 = GridObj.GetCellValue('DAY_GUBN_5',i);
		if (day_5 == 'O') GridObj.SetCellBgColor('DAY_5',i,'255|255|200');
		/* W */
		var day_7 = GridObj.GetCellValue('DAY_GUBN_7',i);
		if (day_7 == 'O') GridObj.SetCellBgColor('DAY_7',i,'255|255|200');
		var day_8 = GridObj.GetCellValue('DAY_GUBN_8',i);
		if (day_8 == 'O') GridObj.SetCellBgColor('DAY_8',i,'255|255|200');
		var day_9 = GridObj.GetCellValue('DAY_GUBN_9',i);
		if (day_9 == 'O') GridObj.SetCellBgColor('DAY_9',i,'255|255|200');
		var day_10 = GridObj.GetCellValue('DAY_GUBN_10',i);
		if (day_10 == 'O') GridObj.SetCellBgColor('DAY_10',i,'255|255|200');
		var day_11 = GridObj.GetCellValue('DAY_GUBN_11',i);
		if (day_11 == 'O') GridObj.SetCellBgColor('DAY_11',i,'255|255|200');
		var day_12 = GridObj.GetCellValue('DAY_GUBN_12',i);
		if (day_12 == 'O') GridObj.SetCellBgColor('DAY_12',i,'255|255|200');
		/* W+1 */
		var day_14 = GridObj.GetCellValue('DAY_GUBN_14',i);
		if (day_14 == 'O') GridObj.SetCellBgColor('DAY_14',i,'255|255|200');
		var day_15 = GridObj.GetCellValue('DAY_GUBN_15',i);
		if (day_15 == 'O') GridObj.SetCellBgColor('DAY_15',i,'255|255|200');
		var day_16 = GridObj.GetCellValue('DAY_GUBN_16',i);
		if (day_16 == 'O') GridObj.SetCellBgColor('DAY_16',i,'255|255|200');
		var day_17 = GridObj.GetCellValue('DAY_GUBN_17',i);
		if (day_17 == 'O') GridObj.SetCellBgColor('DAY_17',i,'255|255|200');
		var day_18 = GridObj.GetCellValue('DAY_GUBN_18',i);
		if (day_18 == 'O') GridObj.SetCellBgColor('DAY_18',i,'255|255|200');
		var day_19 = GridObj.GetCellValue('DAY_GUBN_19',i);
		if (day_19 == 'O') GridObj.SetCellBgColor('DAY_19',i,'255|255|200');
		
	}
	
}

