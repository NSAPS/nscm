//## Щ煎斜極ID		:	sc_13020_set_bom_mst_reg_pop.js
//## Щ煎斜極貲		:	奢晝瞳м撩 餌瞪碟戮 pop_up
//## 偃嫦濠          :	掏辨雙 
//## 偃嫦橾濠       	:	2009-07-16
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  陴錠辨      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_13060_set_bom_mst_reg_pop';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2 ; 													// WiseGrid 偌羹

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


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
        //if( search_menu.style.display == "none" ) 
        //{ 
            //tabHeightValue += Number(search_h); 
            //tableHeightValue += Number(search_h); 
        //} 
        
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

    GridObj.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '蜈擎 堅蛐';
	GridObj.nHDFontSize = 10;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 1; 
    GridObj.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 
    
 
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;

	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 	,100    ,0  ,false);
 	GridObj.AddHeader("ITEM_ID"			,"ITEM_ID"      ,"t_text" 	,400	,0  ,false); //0   
 	GridObj.AddHeader("SEQ"	,			"SEQ"       	,"t_text" 	,400	,40  ,false); //0   
 	GridObj.AddHeader("SEQ_GUBN"		,"掘撩ヶ貲"      ,"t_text" 	,400	,90  ,false); //0   
 	GridObj.AddHeader("BASE_UOM"		,"晦獄欽嬪"      ,"t_combo" 	,400	,70  ,true); //0   
 	GridObj.AddHeader("UNIT_COST"		,"欽陛"       	,"t_number" ,400.3	,70  ,true); //0   
 	GridObj.AddHeader("REQ_QTY"			,"模蹂榆"       	,"t_number" ,400.3	,70  ,true); //0   
 	GridObj.AddHeader("MIN_LOT_SIZE"	,"譆模嫦輿欽嬪"   	,"t_number" ,400.3	,70  ,true); //0   
 	GridObj.AddHeader("LEAD_TIME"		,"葬萄顫歜"	    ,"t_number" ,400.3	,70  ,true); //0   
 	GridObj.AddHeader("CUST_CODE"		,"剪楚籀囀萄"     ,"t_combo" 	,400	,140  ,true); //0   
 	GridObj.AddHeader("CUST_NAME"		,"剪楚籀貲"       ,"t_combo" 	,400	,0  ,true); //0   
 	GridObj.AddHeader("SAFETY_STOCK"	,"寰瞪營堅"       ,"t_number"	,400.3	,70  ,true); //0   





	GridObj.BoundHeader();	


	GridObj.SetColFix('SEQ_GUBN');

	GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	GridObj.SetNumberFormat("UNIT_COST"  , "#,##0.###");  
	GridObj.SetNumberFormat("REQ_QTY" , "#,##0.###");  
	GridObj.SetNumberFormat("MIN_LOT_SIZE" , "#,##0.###");  
	GridObj.SetNumberFormat("SAFETY_STOCK" , "#,##0.###");  


	GridObj.SetColCellAlign('SEQ','center');
	

	//Hidden 鏽歲  
	GridObj.SetColHide("CRUD",true);  
	

}

   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       doQuery();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var item_id		= document.frm.item_id.value;


	//alert(item_id);

	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("item_id", item_id);
	   
	GridObj.DoQuery(servlet_url);
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoReg  (service) {
	GoRegDW1(service);
	//GoRegDW2(service);
}  
  
  
function GoRegDW1  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "doReg");
	//GridObj.SetParam("item_id",		document.frm.item_id.value);
	//GridObj.SetParam("bm", 			document.frm.bm.value);
	//GridObj.SetParam("oper_type",	document.frm.oper_type.value);
	//GridObj.SetParam("oper_qty", 	document.frm.oper_qty.value);
	//GridObj.SetParam("cust_type", 	document.frm.cust_type.value);
	//GridObj.SetParam("qty_uom", 	document.frm.qty_uom.value);
	//GridObj.SetParam("start_date", 	document.frm.start_date.value);
	//GridObj.SetParam("end_date", 	document.frm.end_date.value);
	//GridObj.SetParam("user_id", 	document.frm._user_id.value);

	GridObj.DoQuery(servlet_url, "CRUD");
}
 


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search"||endMode == "search2") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {                           
        	var row_cnt = GridObj.GetRowCount();
			var colBGColor='232|245|213';
			
			for( var i=0 ;i<row_cnt ;i++) //瞪羹 Row虜躑 奩犒 и棻.
	        {
		    //	GridObj.SetCellBgColor('BOX_COST', i, '255|255|0'); 
//		    	GridObj.SetCellBgColor('WORK_CAPA', i, '255|255|0'); 
	        }
                 
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "doReg"){
    	//alert("service_url="+service_url);
    	//var	idu_mode	='REG';
    	//var service_url = "service.do?_moon_service=sc_13020_set_prod_mst_reg_pop";
    	//service_url += "&idu_mode=" + idu_mode;
		//var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("盪濰檜 諫猿腎歷蝗棲棻");
		window.close();  
		//var newWin = window.open(service_url, "sc_13060_set_prod_mst_reg_pop", pop_win_style);
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		//newWin.focus();
		//window.opener.document.location.reload();
		window.opener.GoSearch();
    }else{
    	window.opener.GoSearch();
    }
	//GridObj.SetCellBgColor('QTY', 2, color_edit_col);
	
	 //doQuery2();
}




/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/

function GridCellClick(strColumnKey, nRow){

	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	
}



function getList(){
	var key = event.keyCode;
	// TAB(9) or ENTER(13)
	if(event.keyCode == "13" ) {
		doQuery();		
	}else{
		doQuery();
	}
}

// 薯ヶ 殮溘璽縑 殮溘и 高婁 橾纂ж朝 薯ヶ 匐餌 ��, 橾纂ж朝 薯ヶ檜 氈戲賊 薯ヶ 囀萄, 薯ヶ 貲 ル衛
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getSelQeury("input_value", objBox.value, "get_set_prod_item_code", {    //getCodeList  getCodeInfo getSelQeury
		callback:function(arrList){
			
			// 橾纂ж朝 薯ヶ 橈擠
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
				document.frm.spec.value = arrList[0][2];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
				document.frm.spec.value = "";
			}
			else {
				return;
			}
		}
	});
	/* 薯ヶ囀萄 殮溘衛 ж欽 斜葬萄 褻�� */
	getList();
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
	
	var service_url = "service.do?_moon_service=sc_13010_item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
	
}

