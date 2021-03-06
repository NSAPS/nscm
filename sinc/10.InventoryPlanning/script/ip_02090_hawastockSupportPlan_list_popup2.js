//############################################################
//## Щ煎斜極ID		: ip_02090_hawastockSupportPlan_list_popup.js
//## Щ煎斜極貲		: 鼻ヶ 營堅爾醱 啗�� 儅撩 で機璽
//## 偃嫦濠			: 檜鬼遵
//## 偃嫦橾濠		: 2014-09-29
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2014-10-01  檜鬼遵      create
//##
//############################################################



/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_02090_hawastockSupportPlan_list_popup2';
var GridObj ; 													// WiseGrid 偌羹

var color_tot			= '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col		= '255|253|208';
var color_edit_col2		= '250|224|212';
var color_edit_col3		= '250|236|197';

var color_sp			= '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row	= '141|232|141';			//塭檣 摹鷗 寡唳儀
var colBg01				= '224|255|224';			//255|255|153
var colBg02				= '255|255|255';


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 							弛
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.			弛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() { 
  	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	
	setDefault();        	//�飛� 晦獄 撲薑
	
	setHeader(GridObj);  	//п渦儅撩 
	
	callGridData();
	
	
	
}
   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 
	
	GridObj.bRowSelectorIndex = true;
	GridObj.bUserContextMenu 	= true;
	GridObj.bHDMoving = false ;
	GridObj.bHDSwapping = false; 
	GridObj.bRowSelectorVisible = false ;
	GridObj.strRowBorderStyle = 'none' ;
	GridObj.nRowSpacing = 0 ;
	GridObj.strHDClickAction = 'select' ;
	
 
    GridObj.nHDLineSize         	= 26; //Header Size 
    //GridObj.strHDClickAction    	= "sortsingle";
 	
 	GridObj.strActiveRowBgColor		= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor	= '232|232|255'; 	//Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor	= '0|0|0'; 
	GridObj.strMouseWheelAction		= 'page'; // page 欽嬪 scroll ->晦獄擎 'default'    

	GridObj.nHDLines				= 2;  
	
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row 蹺陛"); 
	
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) { 
	       
	       
//ERP 纔檜綰 剩望 高菟婁 衙蘆 в蹂
	GridObj.AddHeader("SELECTED"			,""   					,"t_checkbox"	,2		,30  ,true); //0
	GridObj.AddHeader("DC_ID"				,"DC_ID"    			,"t_text" 		,100    ,0  ,false);
 	GridObj.AddHeader("DC_NAME"				,"DC貲"   				,"t_text" 		,100	,130 ,false); //0   
	GridObj.AddHeader("CALOG_BOX_STOCK"		,"譯煎斜\nBOX營堅"   		,"t_number" 	,100.3	,60  ,false); //0
	GridObj.AddHeader("CALOG_PLT_STOCK"		,"譯煎斜\nPLT營堅"   		,"t_number" 	,100.3	,60  ,false); //0
	GridObj.AddHeader("DC_ALLOC"			,"嫦輿榆\n(BOX)"   		,"t_number" 	,100.3	,60  ,true); //0 
	GridObj.AddHeader("DC_ALLOC_PLT"		,"嫦輿榆\n(PLT)"   		,"t_number" 	,100.3	,60  ,false); //0
	GridObj.AddHeader("ITEM_ID"				,"薯ヶ囀萄"   			,"t_text" 		,100	,70  ,false); //0
	GridObj.AddHeader("ITEM_NAME"			,"薯ヶ貲"   				,"t_text" 		,100	,170 ,false); //0
	
 	GridObj.AddHeader("PAL_QTY"				,"ヶ跡滌 PLT 欽嬪"   		,"t_text" 		,100	,0   ,false); //0
	GridObj.AddHeader("SEQ"					,"離熱"   				,"t_number" 	,100.3	,60  ,true); //0
	GridObj.AddHeader("IF_FLAG"				,"鼻鷓"   				,"t_text" 		,100	,100 ,false); //0
	GridObj.AddHeader("RE_ORDER_FLAG"		,"醞犒罹睡"   			,"t_text" 		,100	,0   ,false); //0
	
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID'			  ,'left');
    GridObj.SetColCellAlign('ITEM_NAME'			  ,'left');
    GridObj.SetColCellAlign('CALOG_BOX_STOCK'	 ,'right'); 
    GridObj.SetColCellAlign('CALOG_PLT_STOCK'	 ,'right');
    GridObj.SetColCellAlign('IF_FLAG'			 ,'center');  
    GridObj.SetColCellAlign('RE_ORDER_FLAG'		 ,'center');  
   
    GridObj.SetColCellAlign('DC_ID'				,'center'); 
    GridObj.SetColCellAlign('DC_NAME'			,'center'); 
    GridObj.SetNumberFormat('DC_ALLOC'			,'#,##0.#');
    GridObj.SetNumberFormat('DC_ALLOC_PLT'		,'#,##0.00');
    GridObj.SetNumberFormat('CALOG_BOX_STOCK'	,'#,##0.#');
    GridObj.SetNumberFormat('CALOG_PLT_STOCK'	,'#,##0.#');

    GridObj.SetNumberFormat('SEQ'				,'#,##0.#');
    
   // GridObj.SetNumberFormat('SAFETY_STOCK'		,'#,##0.#');
   // GridObj.SetNumberFormat('CALOG_BOX_STOCK'	,'#,##0.#');
   // GridObj.SetNumberFormat('CALOG_PLT_STOCK'	,'#,##0.#');


	//GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");

	//Hidden 鏽歲
	//GridObj.SetColHide("CRUD",true);
    GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);    
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   
   
function callGridData(){
	
	doQuery();
}
	
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave(service) {
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";
	
	//GridObj.SetParam("mode", "save");
	// user_id

	doSave();	
	
	
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

};
      
      
// 盪濰
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	//var in_trans_unit = "";
	
	//if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "pal";
	//if(document.frm.in_trans_unit[1].checked == true) in_trans_unit = "box";

    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//GridObj.SetParam("trans_unit",in_trans_unit);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
	
 	
 return;
}    
      
      
      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

		
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",  "search");
     
       

       GridObj.DoQuery(servlet_url);
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
				
				GridObj.SetGroupMerge('DC_ID,DC_NAME,CALOG_BOX_STOCK,CALOG_PLT_STOCK');
				GridObj.AddSummaryBar('SUMMARY1', '模啗', 'DC_ID', 'sum', 'DC_ALLOC,DC_ALLOC_PLT');
				GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'DC_ALLOC,DC_ALLOC_PLT');
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '255|255|198');				
				GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot);
				
				
			for(var i=0;i<GridObj.GetRowCount();i++) {				
					
					var item_id		= GridObj.GetCellValue('ITEM_ID',i);
				
					
					
					var flag = GridObj.GetCellValue("IF_FLAG", 	i);
					if(flag ==""){
						GridObj.SetCellValue("IF_FLAG", i, "瞪歎渠晦");
					}else if(flag =="Z"){
						GridObj.SetCellValue("IF_FLAG", i, "瞪歎醞");
						GridObj.SetRowBgColor(i,'255|255|126');
					}else if(flag =="C"){
						GridObj.SetCellValue("IF_FLAG", i, "瞪歎諫猿");
						
					}
					
					GridObj.SetCellBgColor('CALOG_BOX_STOCK',	i,  color_edit_col2);				
					GridObj.SetCellBgColor('DC_ALLOC',			i,  color_edit_col2);
				

				
			}  
			 
				}                  
            } 	else if(endMode == "doSave"){
            	
            	doQuery();            	
            }	else if(endMode == "doIf"){
            	
            	doQuery();            	
            }	else if(endMode == "Delete"){
            	
            	doQuery();            	
            }	
            	else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}


        }


   /* EXCEL ???? */
function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

function GridCellClick(strColumnKey, nRow){
	
}

function HeaderClick(strColumnKey){
	
}

function GridCellDblClick (strColumnKey, nRow){
	
	var dc_alloc	= GridObj.GetCellValue('DC_ALLOC',nRow);
	
	
}



function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	if( strColumnKey == "SELECTED"){		
		return;
	}
	if( strColumnKey == "DC_ALLOC"){
		var boxQty 		= Number(GridObj.GetCellValue("DC_ALLOC", nRow));
		var boxPerPalet = Number(GridObj.GetCellValue("PAL_QTY",  nRow));
		var resultQty   = Math.round(boxQty*100 / boxPerPalet)/100;
		GridObj.SetCellValue("DC_ALLOC_PLT", nRow, resultQty	);
		
		var calogQty_box 	= Number(GridObj.GetCellValue("CALOG_BOX_STOCK", 	nRow));		
		var calogQty_plt 	= Number(GridObj.GetCellValue("CALOG_PLT_STOCK",	nRow));
		var calogQty_plt2	= Number(GridObj.GetCellValue("DC_ALLOC_PLT",	    nRow));
		
		GridObj.SetCellValue("CALOG_BOX_CAL", nRow, calogQty_box - boxQty);
		GridObj.SetCellValue("CALOG_PLT_CAL", nRow, calogQty_plt - calogQty_plt2);
	}
		
	Tot_Cal();
	
}

function ChangeBoxToPlt(){
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function setGridAutoResize( tab_h, table_h ){
        
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
        
    }  
    

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


// 璋濠諼 殮溘寞雖
function (obj) {
	var key = event.keyCode;
	if(!(key==8||key==9||key==13||key==46||key==144||
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}
  
	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {

		if(obj == document.frm.stock_day) {
			Do_DC_Allocate(obj);
		}
	}
}    
 

function GoDelete(){
	
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var rowCount = GridObj.GetRowCount();
	
	
	
		if(confirm("摹鷗 ж褐 ヶ跡擊 餉薯ж衛啊蝗棲梱?") == 1 ) {
			
		}
		else{
			return;
		}		

	for(var i=0;i<GridObj.GetRowCount();i++){
		
		if( GridObj.GetCellValue("SELECTED",i)=="1") {
			if( GridObj.GetCellValue("IF_FLAG", i)=="瞪歎醞" || GridObj.GetCellValue("IF_FLAG", i)=="瞪歎諫猿" ){
			alert("ERP 瞪歎諫猿 傳朝 瞪歎醞檣 螃渦朝 餉薯й 熱 橈蝗棲棻.");
			return;
			}
		}
		
	}

    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",						"delete");
	GridObj.SetParam("user_id",	 document.frm._user_id.value);
	
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "SELECTED");

	
}

//function GoIf(){
//	
//	
//		if(confirm("摹鷗 ж褐 鼻ヶ曖 ERP 瞪歎擊 �挨匹牮簸睍懂炱�?") == 1 ) {
//			
//		}
//		else{
//			
//			return;
//		}	
//
//
//	var GridObj = document.WiseGrid;
//	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
//
//
//    
//	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
//	GridObj.SetParam("mode", "doIf");
//	GridObj.SetParam("user_id", document.frm._user_id.value);
//	GridObj.SetParam("cnfm_date", document.frm.in_cnfm_date.value);
//
//	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
//	GridObj.DoQuery(servlet_url, "SELECTED");
//
//	
//}

function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
	
		
	if( strMenuKey == "MENU_CELL" ){// CELL 贗葛衛 詭景
		
		if( strMenuItemKey == "MENU01" ){		// ROW 蹺陛
		
			insertRow( nRow );	
			
		}
		else {
			alert("襄營 ж雖 彊擎 詭景殮棲棻.");
		}		
	}

}

function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	
	if( rowCnt-1 == nRow ){ // 葆濠虞 塭檣橾 唳辦 
		GridObj.InsertRow(-1);
	}else{
		GridObj.InsertRow(nRow+1);
	}

// 牖廓羹廓 煎霜蹺陛
	var this_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	var new_seq = 1;
	
	for(var i=0;i<GridObj.GetRowCount();i++) {
		tmp_item_id	= GridObj.GetCellValue("ITEM_ID", i);

		if(this_item_id == tmp_item_id){
			new_seq ++;
		}
	}

	GridObj.SetCellValue("SELECTED"				, nRow+1, "1");
	GridObj.SetCellValue("ITEM_ID"              , nRow+1, GridObj.GetCellValue("ITEM_ID"              , nRow));
	GridObj.SetCellValue("ITEM_NAME"            , nRow+1, GridObj.GetCellValue("ITEM_NAME"            , nRow));
	GridObj.SetCellValue("CALOG_BOX_STOCK"      , nRow+1, GridObj.GetCellValue("CALOG_BOX_STOCK"      , nRow));
	GridObj.SetCellValue("CALOG_PLT_STOCK"   	, nRow+1, GridObj.GetCellValue("CALOG_PLT_STOCK"      , nRow));
	GridObj.SetCellValue("DC_ALLOC"   			, nRow+1, GridObj.GetCellValue("DC_ALLOC"      		  , nRow));
	GridObj.SetCellValue("DC_ALLOC_PLT"   		, nRow+1, GridObj.GetCellValue("DC_ALLOC_PLT"         , nRow));
	GridObj.SetCellValue("DC_ID"          		, nRow+1, GridObj.GetCellValue("DC_ID"          	  , nRow));
	GridObj.SetCellValue("DC_NAME"        		, nRow+1, GridObj.GetCellValue("DC_NAME"         	  , nRow));
	GridObj.SetCellValue("PAL_QTY"        		, nRow+1, GridObj.GetCellValue("PAL_QTY"          	  , nRow));

	GridObj.SetCellValue ("SEQ"					, nRow+1, Number(GridObj.GetCellValue("SEQ"          , nRow))+1 );
	GridObj.SetCellValue ("IF_FLAG"				, nRow+1, "褐敘儅撩" );
	GridObj.SetCellValue ("RE_ORDER_FLAG"		, nRow+1, "Y" );


}
//SEQ 離熱 濠翕 薑溺
//function Order(){
//	
//	for(var i=0;i<GridObj.GetRowCount();i++) {				
//					
//					var dc_id		= GridObj.GetCellValue('DC_ID',i);
//					
//						//離熱 濠翕 頂葡離牖 薑溺 晦	
//					if(i>0){
//					var dc_id2	= GridObj.GetCellValue('DC_ID',i-1);
//					var seq2		= Number(GridObj.GetCellValue("SEQ", i-1));
//						
//						if( dc_id == dc_id2){
//							
//							GridObj.SetCellValue("SEQ", i, seq2+1 );
//						
//						}
//					}
//	}
//}	


