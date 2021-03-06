//## Щ煎斜極ID		: md_10020_fert_and_halb_bom_list.js
//## Щ煎斜極貲		: 薯ヶ/奩薯ヶ BOM 褻�裙飛�(褐敘) 
//## 偃嫦濠			:辦謙敕
//## 偃嫦橾濠			: 2013-10-24 錯蹂橾
//##
//## 婦溼 job file   : job_sinc_70_masterData.xml.xml
//## 婦溼 query file : query_sinc_70_masterData.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2013-10-24  辦謙敕      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'md_10020_fert_and_halb_bom_list';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2;

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue  = window.innerWidth;
            maxHeightValue = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue  = document.body.clientWidth;
            maxHeightValue = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
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

        document.WiseGrid.height = tableHeightValue + "px"; 
 
        
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
	setProperty(GridObj2);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader2(GridObj2);  	//п渦儅撩 
	setDefault2();        	//�飛� 晦獄 撲薑 
}     
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 1;   
    
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
   
         
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj2.bRowSelectorIndex   = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj2.nHDLineSize         = 18; //Header Size

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines = 1;        
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    GridObj2.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
 

}

//}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("PLANT_ID"		,"奢濰囀萄"		,"t_text"	    ,20			,80    ,false); //0   
 	GridObj.AddHeader("PLANT_NAME"	    ,"奢濰貲"			,"t_text" 	    ,100		,80    ,false); //0   
 	GridObj.AddHeader("PROD_VER"		,"儅骯幗瞪"		,"t_text" 	    ,100		,80    ,false); //0   
 	GridObj.AddHeader("UOM"				,"欽嬪"			,"t_text" 	    ,100		,60    ,false); //0
 	GridObj.AddHeader("QTY"		    	,"熱榆"	        ,"t_number" 	,100.3		,80    ,false); //0
 	GridObj.AddHeader("RECIPE_TYPE"		,"嶸⑽囀萄"		,"t_text" 		,100		,100    ,false); //0
 	GridObj.AddHeader("RECIPE_NAME"		,"嶸⑽貲"			,"t_text"	    ,100		,140    ,false); //0

	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('PLANT_ID',			'center');
    GridObj.SetColCellAlign('PLANT_NAME',		'center'); 
    GridObj.SetColCellAlign('PROD_VER',			'center');
    GridObj.SetColCellAlign('UOM',				'center');
    GridObj.SetColCellAlign('QTY',				'right');
    GridObj.SetColCellAlign('RECIPE_TYPE',		'center'); 
    GridObj.SetColCellAlign('RECIPE_NAME',		'center');
    
    GridObj.SetNumberFormat("QTY", "###,###.#0");


}

function setHeader2(GridObj2) { // 撮睡薑爾

  	GridObj2.AddHeader("CONS_ITEM_SEQ"		,"о跡廓��"		,"t_text"   	,100		,80    ,false); //0 
  	GridObj2.AddHeader("CONS_ITEM_ID"		,"掘撩蹂模"		,"t_text" 	 	,100		,100    ,false); //0  
  	GridObj2.AddHeader("ITEM_NAME"			,"掘撩蹂模貲"		,"t_text" 		,100		,140    ,false); //0   
  	GridObj2.AddHeader("CONS_ITEM_TYPE"		,"掘撩蹂模 顫殮"	,"t_text" 		,100		,90    ,false); //0
  	GridObj2.AddHeader("UOM"				,"欽嬪"			,"t_text" 		,100		,70    ,false); //0   
  	GridObj2.AddHeader("QTY"				,"熱榆"			,"t_number" 	,100.3		,100    ,false); //0

	    
	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('CONS_ITEM_SEQ',		'center'); 
    GridObj2.SetColCellAlign('CONS_ITEM_ID',		  'left');
    GridObj2.SetColCellAlign('ITEM_NAME',			'center');
    GridObj2.SetColCellAlign('CONS_ITEM_TYPE',		'center');
    GridObj2.SetColCellAlign('UOM',					'center');
    GridObj2.SetColCellAlign('QTY',					 'right');
   
    GridObj2.SetNumberFormat("QTY", 	"###,###.#0");

}
	// 鏽歲 堅薑

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery(){
	
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';

    if(endMode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {            
		  	
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			
		  	
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {
}	
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
    doQuery();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow){     
	
	var mode 			= GridObj.GetParam("mode");
	var prod_ver		= GridObj.GetCellValue("PROD_VER",			nRow); 
	var plant_id		= GridObj.GetCellValue("PLANT_ID",			nRow); 
	var item_id	    	= document.all.item_id.value;
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;   
		
		GridObj2.SetParam("mode", "search2");
		GridObj2.SetParam("item_id",					item_id);
		GridObj2.SetParam("prod_ver",				prod_ver);
		GridObj2.SetParam("plant_id",				plant_id);
		
		GridObj2.DoQuery(servlet_url); 
		
		

			
}        
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
		var item_id	    = document.all.item_id.value;
	    var item_name	= document.all.item_name.value;
		var servlet_url          = Project_name+"/servlet/com.wisegrid.admin."+job_id;       
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       
       GridObj.SetParam("item_id",					item_id);
       GridObj.SetParam("item_name",				item_name);
	   GridObj.DoQuery(servlet_url);       
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2() { //撮睡薑爾

	var item_id		= document.all.item_id.value;
	var prod_ver	= GridObj.GetCellValue("PROD_VER",			nRow); 
	var plant_id	= GridObj.GetCellValue("PLANT_ID",			nRow); 
    
	var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("item_id",				item_id);
    GridObj2.SetParam("prod_ver",				prod_ver);
    GridObj2.SetParam("plant_id",				plant_id);

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

/*function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' ヶ跡褻��

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
	//commonUtil.getCodeInfo(in_sel_name, in_sel_value, "search_item_id_and_item_name_by_item_input", {
		callback:function(arrList){
			if( arrList.length == 1 ) {
				document.frm.in_item_name.value = arrList[0][1];
			}
			else {// popup 嗥遴棻! 
				openItemPopup();
			}
		}
	});
}

// ヶ跡 POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//褻�裔偶� 鼻鷓 : '01'っ衙醞	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();		
		
}*/


// 薯ヶ 殮溘璽縑 殮溘и 高婁 橾纂ж朝 薯ヶ 匐餌 ��, 橾纂ж朝 薯ヶ檜 氈戲賊 薯ヶ 囀萄, 薯ヶ 貲 ル衛
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 橾纂ж朝 薯ヶ 橈擠
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}

// 薯ヶ 匐儀 popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup 璽曖 input box ル衛 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}


//--------------------------------------   main_template 縑 薑曖脹 Event ---------------------------------------------------//
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/


//