//############################################################
//## Щ煎斜極ID      : ip_07020_Order_Trace_list.vm
//## Щ煎斜極貲      : SCM輿僥蹺瞳褻��
//## 偃嫦濠          : 陴錠辨
//## 偃嫦橾濠        : 2009-10-13
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-10-13  陴錠辨      create
//##
//############################################################
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


/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'rp_01015_transportPlanRegistration_list_new';
var GridObj ; 													// WiseGrid 偌羹

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

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

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'    
	
	// Header Font Setting
	GridObj.strHDFontName = '蜈擎 堅蛐';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2; 	
	
	
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	GridObj.AddHeader("PLAN_TYPE"		,"熱歎掘碟"      	,"t_text" 	,100    ,0  ,false);
	GridObj.AddHeader("CD_NAME"			,"熱歎掘碟"      	,"t_text" 	,100    ,80  ,false);
	GridObj.AddHeader("TRANS_DATE"		,"熱歎橾"       	,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("SRC_LOC"			,"轎堅濰"       	,"t_text" 	,100	,0  ,false); //0   
 	GridObj.AddHeader("SRC_LOC_NAME"	,"轎堅濰"       	,"t_text" 	,100	,88  ,false); //0   
 	GridObj.AddHeader("TGT_LOC"			,"殮堅濰"       	,"t_text" 	,100	,0  ,false); //0   
 	GridObj.AddHeader("TGT_LOC_NAME"	,"殮堅濰"       	,"t_text" 	,100	,88 ,false); //0   
 	GridObj.AddHeader("TRUCK_SEQ"		,"離榆牖廓"		,"t_text" 	,500	,70 ,false); //0   
 	GridObj.AddHeader("ITEM_ID"			,"薯ヶ囀萄"     	,"t_text" 	,100	,88  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"薯ヶ貲"       	,"t_text" 	,500	,190  ,false); //0   
 	GridObj.AddHeader("QTY"				,"熱榆\n(BOX)"   ,"t_number"	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("EA_QTY"			,"熱榆\n(EA)"    ,"t_number"	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PLT_CUM"			,"援瞳\n(PLT)"   ,"t_number"	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("BRAND_NO"		,"瞪ル廓��"       ,"t_text"	,20		,90  ,false); //0   
 	GridObj.AddHeader("BRAND_LINE_NO"	,"瞪ル牖廓"       ,"t_text" 	,200	,55 ,false); //0   
 	GridObj.AddHeader("IF_FLAG"			,"WMS\n瞪歎罹睡"  ,"t_text" 	,100	,70  ,false); //0   

	GridObj.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");
	
	
	GridObj.SetNumberFormat('QTY','#,##0.##'); 
	GridObj.SetNumberFormat('EA_QTY','#,##0.##'); 
	GridObj.SetNumberFormat('PLT_CUM','#,##0.##');
	
	GridObj.SetColCellAlign('CD_NAME','center'); 
	GridObj.SetColCellAlign('TRUCK_SEQ','center'); 
	GridObj.SetColCellAlign('ITEM_ID','center'); 
	GridObj.SetColCellAlign('BRAND_NO','center'); 
	GridObj.SetColCellAlign('BRAND_LINE_NO','center'); 
	GridObj.SetColCellAlign('IF_FLAG','center'); 
	

	//Hidden 鏽歲
	//GridObj.SetColHide("CRUD",true);
       
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
       doQuery();
   }
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "CRUD");

}
      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var version		= document.all.version.value;
       var seq   		= document.all.seq.value;
       var src_loc_sel  = document.all.src_loc_sel.value;
       var tgt_loc_sel  = document.all.tgt_loc_sel.value;
       var trans_start  = document.all.trans_start.value;
       var trans_end   	= document.all.trans_end.value;
       var truck_seq_sel= document.all.truck_seq_sel.value;
       var item_id		= document.all.item_id.value;
       var item_name	= document.all.item_name.value;
       
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("version", version);
       GridObj.SetParam("seq", seq);
       GridObj.SetParam("src_loc_sel", src_loc_sel);
       GridObj.SetParam("tgt_loc_sel", tgt_loc_sel);
       GridObj.SetParam("trans_start", trans_start);
       GridObj.SetParam("trans_end", trans_end);
       GridObj.SetParam("truck_seq_sel", truck_seq_sel);
       GridObj.SetParam("item_id", item_id);
       GridObj.SetParam("item_name", item_name);
 
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

			    //GridObj.SetColCellAlign('CNFM_DATE','center'); 

//			    GridObj.SetNumberFormat('REQT_BOX','#,##0.#'); 
			    
				// м啗
				GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'QTY,EA_QTY,PLT_CUM'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
				/* 
				for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell儀梃 滲唳
					if(GridObj.GetCellValue('SLIP_GUBN',i) == "顫啗薑" ){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '0|255|0');
					}
					// 曖煆夢蝶爾棻 葆馬夢蝶陛 觼賊 儀梃煎 ル衛и棻.
					if(strToNum(GridObj.GetCellValue('REQT_BOX',i)) > strToNum(GridObj.GetCellValue('SELL_BOX',i))) {
						GridObj.SetCellBgColor('SELL_BOX', i, '253|228|229');
						GridObj.SetCellFontBold('SELL_BOX', i, 'true'); // font 掃晦  
					}
				}
				*/
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
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

function GridCellDblClick(strColumnKey, nRow){
	var urlStr = "service.do?_moon_service=rp_01015_transportPlanRegistration_mod_new";
	//alert(data);
	//var list = data.split("!%!");
	
	var brand_no = GridObj.GetCellValue("BRAND_NO", nRow) 
	
	if( brand_no == "" || brand_no == null ) {  
	}else{
		//alert("�挨今� 瞪ル朝 熱薑檜 碳陛棟 м棲棻.");
		//return;		
	}
		
	var version	= document.frm.version.value;
	var seq		= document.frm.seq.value;
	
	urlStr += "&version=" 	+ version; // 嬴檜蠱 囀萄
	urlStr += "&seq=" 	+ seq; // 嬴檜蠱 囀萄

	urlStr += "&plan_type=" 	+ GridObj.GetCellValue("PLAN_TYPE", nRow); // Ы楠顫殮
	urlStr += "&trans_date=" 	+ GridObj.GetCellValue("TRANS_DATE", nRow); // 熱歎橾濠
	urlStr += "&truck_seq=" 	+ GridObj.GetCellValue("TRUCK_SEQ", nRow); // 離榆牖廓
	urlStr += "&src_loc=" 		+ GridObj.GetCellValue("SRC_LOC", nRow); // 轎堅濰
	urlStr += "&tgt_loc=" 		+ GridObj.GetCellValue("TGT_LOC", nRow); // 殮堅濰
	urlStr += "&brand_no_temp="	+ GridObj.GetCellValue("BRAND_NO", nRow); // 殮堅濰


	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;	
	
}



function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
}


function mass_plan_reg(){

	var urlStr = "service.do?_moon_service=rp_01015_mass_trans_plan_reg";
	//urlStr += "&cd_grp=" + cd_grp_pre + "&_moon_perpage=" + perpage_pre + "&_moon_pagenumber=" + pagenumber_pre;
	location.href = urlStr;
}

  
// 瞪ル 嫦ч
function makeBrand(service) {
	
	var version 	= document.frm.version.value;
	var seq 		= document.frm.seq.value;
	var trans_start = document.frm.trans_start.value;
	var trans_end 	= document.frm.trans_end.value;
	
	var user_id 	= document.frm._user_id.value;
	var src_loc 	= document.frm.src_loc_sel.value;
	
	//alert(src_loc);   // �票值� 婁濰 9311957
	if( user_id == "9311957" ) { // 睡骯薯ヶ婦葬雖薄 �票值� 婁濰 : 轎堅濰檜 睡骯薯ヶ 瞪ル奩 嫦ч 陛棟
		//alert(11);
		if( src_loc == "7700" || src_loc == "8913" || src_loc == "8914" ) {
			//alert(22)
			//鱔婁
		}else{
			alert("睡骯薯ヶ婦葬雖薄 檜諼曖 瞪ル 嫦ч擎 婦葬濠縑啪 僥曖 ж褊衛蹂.");
			return;
		}
	}
	



	// 殮堅濰擊 摹鷗ж雖 彊擎 唳辦
	if( version == null || version == "" || seq == null || seq == "" ) {
		alert("幗瞪擊 試盪 摹鷗ж堅 等檜攪 褻�� ��, 嫦ч檜 陛棟м棲棻.");
		return;
	}
	// 幗瞪, 離熱蒂 摹鷗ж雖 彊擎 唳辦
	if( trans_start == null || trans_start == "" || trans_end == null || trans_end == "" ) {
		alert("熱歎橾濠蒂 試盪 摹鷗ж堅 等檜攪 褻�� ��, 盪濰檜 陛棟м棲棻.");
		return;
	}
	
	if(checkConfirm())
		return;
	
	
	// WAITING 檜嘐雖 爾罹輿晦
	viewWait();
	
	// service_id 盪濰
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
}