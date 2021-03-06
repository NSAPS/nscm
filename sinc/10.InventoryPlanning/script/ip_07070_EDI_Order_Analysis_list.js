//## Щ煎斜極ID      : ip_07070_EDI_Order_Analysis_list.js
//## Щ煎斜極貲      : EDI嫦輿瞪�笑邾挨僅�
//## 滲唳濠濠        : 陴錠辨
//## 偃嫦橾濠        : 2014-02-14
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_07070_EDI_Order_Analysis_list';

var GridObj ; 
var GridObj2;													// WiseGrid 偌羹
var color_tot 		 = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';

var sum_gubn = '模啗氈擠';  // or '模啗橈擠'

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

function init2() {
	
	GridObj2 = document.WiseGrid2;

	setProperty(GridObj2); 	// 晦獄 property 撲薑
	setDefault2();  			// 蹺陛 property 撲薑
	setHeader2();   			// Header 撲薑
			
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
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj.strActiveRowBgColor    = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction 	   = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.strHDFontName = '蜈擎 堅蛐';
	GridObj.nCellFontSize = 9;					// Font Size 9
	GridObj.bHDFontBold = true;
	//GridObj.bHDFontULine=true;				// ④渦 壽還
       
}

function setDefault2(){
	
	GridObj2.bUserContextMenu = true;				//餌辨濠 鐘臢蝶お 詭景曖 餌辨 罹睡蒂 唸薑и棻. 
	GridObj2.bHDMoving = false;                  	//餌辨濠陛 ④渦蒂 萄楚斜п憮 鏽歲嬪纂蒂 檜翕й熱 橈棻.
	GridObj2.bHDSwapping = false;                	//④渦曖 鏽歲嬪纂檜翕 巍爾幗が擊 綠�側瘓� и棻.
	GridObj2.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj2.bRowSelectorIndex = false;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻. 
	GridObj2.strRowBorderStyle = "none";         	//煎辦曖 纔舒葬縑 嬴鼠匙紫 釭顫釭雖 彊朝棻.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing高擊 薑и棻. 
	GridObj2.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj2.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
    GridObj2.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName = '蜈擎 堅蛐';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	
	//Hearder 堪檜
	GridObj2.nHDLineSize   = 12;   //12
	
	// Grid ч 堪檜
    GridObj2.nRowHeight    = 12;    //22
    
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines = 2; 
 	GridObj2.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'       
 
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        

 	GridObj.AddHeader("CNFM_DATE"	    ,"橾 濠"	    ,"t_text"      ,100	    ,60     ,false); //0
	GridObj.AddHeader("PROD_CODE"	    ,"ヶ跡囀萄"	,"t_text"	   ,100	    ,60     ,false); //0
 	GridObj.AddHeader("ITEM_NAME"	    ,"ヶ跡貲"		,"t_text" 	   ,100	    ,150     ,false); //0   
 	GridObj.AddHeader("GUBN"	       	,"掘碟"	    ,"t_text" 	   ,100	    ,50    ,false); //0
 	GridObj.AddHeader("EDI32"	       	,"檜葆お"	    ,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI21"	       	,"�沔nЫ楝蝶"   ,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI23"	       	,"煜等\n葆お"	,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI03"	       	,"詭陛\n葆お"   ,"t_number"    ,100.3	,50     ,false); //0
    GridObj.AddHeader("EDI20"	       	,"GS\nCVS"	,"t_number"    ,100.3	,50     ,false); //0
    GridObj.AddHeader("EDI26"	       	,"煜等\n蓬ぷ"	,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI33"     	   	,"煜等\n煎雖"	,"t_number"    ,100.3	,50     ,false); //0 //蹺陛 : 2012-04-19//
 	GridObj.AddHeader("EDI27"       	,"夥煎\n囀餌"	,"t_number"    ,100.3   ,50     ,false); //0
 	GridObj.AddHeader("EDI29"   		,"憮錳\n嶸鱔"	,"t_number"    ,100.3	,50     ,false); //0
 	GridObj.AddHeader("EDI_TOT"   		,"啗"		,"t_number"    ,100.3	,60     ,false); //0
 	
 
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

//	GridObj.SetColFix('ITEM_NAME'); 

    GridObj.SetColCellAlign('CNFM_DATE',	'center');
    GridObj.SetColCellAlign('PROD_CODE',	'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	'left');
    GridObj.SetColCellAlign('GUBN',			'center'); 
    GridObj.SetColCellAlign('EDI32',		'right');
    GridObj.SetColCellAlign('EDI21',		'right'); 
    GridObj.SetColCellAlign('EDI23',		'right');
    GridObj.SetColCellAlign('EDI03',		'right');
    GridObj.SetColCellAlign('EDI20',		'right');
    GridObj.SetColCellAlign('EDI26',		'right');
    GridObj.SetColCellAlign('EDI33',		'right');
    GridObj.SetColCellAlign('EDI27',		'right');
    GridObj.SetColCellAlign('EDI29',		'right');
    GridObj.SetColCellAlign('EDI_TOT',		'right');
    
    GridObj.SetNumberFormat("EDI32",       "###,###");
    GridObj.SetNumberFormat("EDI21",       "###,###");
    GridObj.SetNumberFormat("EDI23",       "###,###");
    GridObj.SetNumberFormat("EDI03",       "###,###");
    GridObj.SetNumberFormat("EDI20",       "###,###");
    GridObj.SetNumberFormat("EDI26",       "###,###");
    GridObj.SetNumberFormat("EDI33",       "###,###");
    GridObj.SetNumberFormat("EDI27",       "###,###");
    GridObj.SetNumberFormat("EDI29",       "###,###");
    GridObj.SetNumberFormat("EDI_TOT",       "###,###");
	
}

function setHeader2() 
{        
	GridObj2.AddHeader("CUST_NAME"			,"薄ん貲"			,"t_text" 		,100	,150  ,false);   
	GridObj2.AddHeader("CUST_CODE"			,"薄ん囀萄"		,"t_text" 		,100	,5  ,false);   

	GridObj2.AddHeader("ITEM_NAME"			,"ヶ跡貲"			,"t_text" 		,100	,160  ,false);   
	GridObj2.AddHeader("PROD_CODE"			,"ヶ跡囀萄"		,"t_text" 		,100	,5  ,false);   
 	
 	GridObj2.AddHeader("ODER_BOX"			,"嫦輿榆"      	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("SELL_BOX"			,"陶ヶ榆"     	,"t_number" 	,100	,45  ,false);   
 	GridObj2.AddHeader("GAP"				,"嘐陶榆"     	,"t_number" 	,100	,45  ,false);   
 
	GridObj2.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 

    GridObj2.SetColCellAlign('CUST_CODE',	'center');
    GridObj2.SetColCellAlign('CUST_NAME',	'left'); 
    GridObj2.SetColCellAlign('PROD_CODE',	'center');
    GridObj2.SetColCellAlign('ITEM_NAME',	'left'); 
    GridObj2.SetColCellAlign('ODER_BOX',	'right');
    GridObj2.SetColCellAlign('SELL_BOX',	'right');
    GridObj2.SetColCellAlign('GAP',			'right');
	
	GridObj2.SetNumberFormat("ODER_BOX"		, "###,###,###");
	GridObj2.SetNumberFormat("SELL_BOX"	    , "###,###,###");
	GridObj2.SetNumberFormat("GAP"	     	, "###,###,###");
	
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
              
            	var rowCnt = GridObj.GetRowCount();
	    		for (var i = 0 ; i < rowCnt ; i++ ){
	    			var gubn = GridObj.GetCellValue("GUBN", i);
	    			if(gubn == "嘐陶榆") {
	    				GridObj.SetRowBgColor(i, '212|212|212');
	    			}
	    		}
              
              GridObj.SetGroupMerge('CNFM_DATE,PROD_CODE,ITEM_NAME');

            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
		
    }

function GridEndQuery2() {
		
	// wiseGrid縑憮 檜鼻詭撮雖 �挫怷�!
	if(GridObj2.GetStatus() != "true") {
		return;
	}

	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //褻��
		if(GridObj2.GetStatus() == "true") { // 
			GridObj2.SetGroupMerge('CUST_NAME,CUST_CODE');
			if(sum_gubn == '模啗氈擠') {
				GridObj2.AddSummaryBar('SUMMARY2', '模啗', 'CUST_NAME', 'sum', 'ODER_BOX,SELL_BOX,GAP'); 
				GridObj2.SetSummaryBarColor('SUMMARY2', '0|0|0', '212|212|212'); 
			}
			GridObj2.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'ODER_BOX,SELL_BOX,GAP'); 
			GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '252|252|192');			
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
   	var item_type	= document.all.item_type.value;	
	var	search_type = document.frm.search_type.value; 	//	褻�蛻納�
   	
 /*  	if(item_type == null || item_type == ""){
		//alert("褻�蛻納�擊 摹鷗ж褊衛蹂!");
   		//return
   	}
	if( search_type == "" || search_type == null || search_type == 00 ) {
		alert("褻�蛻納�擊 摹鷗ж褊衛蹂!");
		return;
	}   	
*/
	var grup_code1	    = document.all.grup_code1.value;
	
	if(grup_code1 == null || grup_code1 == "" ) {
	    GridObj.SetColHide('EDI32',		false);
	    GridObj.SetColHide('EDI21',		false); 
	    GridObj.SetColHide('EDI23',		false);
	    GridObj.SetColHide('EDI03',		false);
	    GridObj.SetColHide('EDI20',		false);
	    GridObj.SetColHide('EDI26',		false);
	    GridObj.SetColHide('EDI33',		false);
	    GridObj.SetColHide('EDI27',		false);
	    GridObj.SetColHide('EDI29',		false);
	    GridObj.SetColHide('EDI_TOT',	false);
	}
	else {
	    GridObj.SetColHide('EDI32',		true);
	    GridObj.SetColHide('EDI21',		true); 
	    GridObj.SetColHide('EDI23',		true);
	    GridObj.SetColHide('EDI03',		true);
	    GridObj.SetColHide('EDI20',		true);
	    GridObj.SetColHide('EDI26',		true);
	    GridObj.SetColHide('EDI33',		true);
	    GridObj.SetColHide('EDI27',		true);
	    GridObj.SetColHide('EDI29',		true);
	    GridObj.SetColHide('EDI_TOT',	true);

		GridObj.SetColHide('EDI'+ grup_code1,	false);	    
	}

	GridObj2.ClearGrid();
	setHeader2();
	sum_gubn = '模啗氈擠';
	
    doQuery();

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
      // alert(end_date);
     //  return;

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var search_item	    = document.all.search_item.value;
       var grup_code1	    = document.all.grup_code1.value;
 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);
	   GridObj.SetParam("item_type",     item_type);
	   GridObj.SetParam("search_type", search_type);
	   GridObj.SetParam("search_item", search_item);
	   GridObj.SetParam("grup_code1", grup_code1);

	   GridObj.DoQuery(servlet_url);       
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery2(grup_code1, search_item) 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");

       var item_type	    = document.all.item_type.value;   
       var search_type	    = document.all.search_type.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj2.SetParam("mode",           "search_DW2");
       GridObj2.SetParam("start_date",   start_date);
       GridObj2.SetParam("end_date",       end_date);
	   GridObj2.SetParam("item_type",     item_type);
	   GridObj2.SetParam("search_type", search_type);
	   GridObj2.SetParam("search_item", search_item);
	   GridObj2.SetParam("grup_code1", grup_code1);
	   GridObj2.DoQuery(servlet_url);       
   }
	
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
	
	var search_item	    = GridObj.GetCellValue('PROD_CODE',nRow);
	var	grup_code1;

	if(strColumnKey == 'CNFM_DATE' || strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'EDI_TOT') {
		grup_code1 = document.all.grup_code1.value;
	}
	else grup_code1	= strColumnKey.substring(3,6);
	
	sum_gubn = '模啗橈擠';
	doQuery2(grup_code1, search_item);

}

function HeaderClick_DW1(strColumnKey){

    GridObj.SetColCellAlign('CNFM_DATE',	'center');
    GridObj.SetColCellAlign('PROD_CODE',	'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	'left');
    GridObj.SetColCellAlign('GUBN',			'center'); 

	if(strColumnKey == 'CNFM_DATE' || strColumnKey == 'PROD_CODE' || strColumnKey == 'ITEM_NAME'
		|| strColumnKey == 'GUBN' || strColumnKey == 'EDI_TOT') return;
	
	var search_item	    = document.all.search_item.value;
	var	grup_code1		= strColumnKey.substring(3,6);

	sum_gubn = '模啗氈擠';
	doQuery2(grup_code1, search_item);
	
}

function setWiseGridAutoResize( tab_h, table_h ){
	
	var maxWidthValue;
	var maxHeightValue;
	
	if (document.layers) {
		//Nescape
		maxWidthValue = window.innerWidth;
		maxHeightValue = window.innerHeight;
	}
	if (document.all) {
		//explore
		maxWidthValue = document.body.clientWidth;
		maxHeightValue = document.body.clientHeight;
	} 
	
	var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ; 
	var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
	
	var search_h = document.frm.search_h.value; 
	if( search_menu.style.display == "none" ) 
	{ 
		tabHeightValue += Number(search_h); 
		tableHeightValue += Number(search_h); 
	} 
	
	// �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
	// ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	//tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 
	document.WiseGrid2.height = tableHeightValue + "px"; 
 
}	