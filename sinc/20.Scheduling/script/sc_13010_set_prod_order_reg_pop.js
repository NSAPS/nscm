//## Щ煎斜極ID		:	sc_13010_set_prod_order_reg_pop.js
//## Щ煎斜極貲		:	嶸鱔陛奢 儅骯螃渦 蛔煙 pop_up
//## 偃嫦濠          :	掏辨雙 
//## 偃嫦橾濠       	:	2009-07-16
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  掏辨雙      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_13010_set_prod_order_reg_pop';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2 ; 													// WiseGrid 偌羹
var GridObj3 ; 													// WiseGrid 偌羹

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
 
}
     
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100    ,60  ,false);
 	GridObj.AddHeader("SEQ"				,"SEQ"       		,"t_text" 	,400	,50  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_ID"	,"濠營廓��"       	,"t_text" 	,400	,80  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_NAME"	,"濠營貲"       		,"t_text" 	,400		,180 ,false); //0   
 	GridObj.AddHeader("CONS_QTY_UOM"	,"欽嬪"     		  	,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("CONS_QTY"		,"熱榆"     			,"t_number" ,20.6	,80  ,true); //0   
	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	GridObj.SetNumberFormat("CONS_QTY"  , "#,##0.###");  
	

	//Hidden 鏽歲  
	GridObj.SetColHide("CRUD",true);
	
	
	var idu_mode	= document.frm.idu_mode.value;
	if(idu_mode == 'MOD'){
		doQuery2();	
	}

}

   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
       doQuery();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var qty			= document.frm.qty.value;
	var prod_ver	=document.frm.prod_ver.value;

	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("prod_ver", prod_ver);
	GridObj.SetParam("qty", qty);
	   
	GridObj.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id_sel.value;
	var qty			= document.frm.qty.value;
	var prod_ver	=document.frm.prod_ver.value;
	var wo_id		=document.frm.wo_id.value;

	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "search2");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("prod_ver", prod_ver);
	GridObj.SetParam("qty", qty);
	GridObj.SetParam("wo_id", wo_id);
	   
	GridObj.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
var chk_GoReg = 'N';
function GoReg() {
	
	chk_GoReg = 'Y';
	getBom();
	
}

function ActReg() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "doReg");
	var wo_id;
	var plant_id	= document.frm.plant_id.value;
	var proc_id		= document.frm.proc_id.value;
	var start_date	= document.frm.start_date.value;
	
	GridObj.SetParam("plant_id", 	document.frm.plant_id.value);
	GridObj.SetParam("prod_item_id",document.frm.item_id.value);
	GridObj.SetParam("prod_ver", 	document.frm.prod_ver.value);
	GridObj.SetParam("proc_id", 	document.frm.proc_id.value);
	GridObj.SetParam("oper_id",		document.frm.oper_id.value);
	GridObj.SetParam("loc_id", 		document.frm.loc_id.value);
	GridObj.SetParam("qty", 		document.frm.qty.value);
	GridObj.SetParam("qty_uom", 	document.frm.qty_uom.value);
	GridObj.SetParam("start_date", 	document.frm.start_date.value);
	GridObj.SetParam("start_time", 	document.frm.start_time.value);
	GridObj.SetParam("end_date", 	document.frm.end_date.value);
	GridObj.SetParam("end_time", 	document.frm.end_time.value);
	GridObj.SetParam("user_id", 	document.frm._user_id.value);
	
	var in_paramKey = "plant_id!%!proc_id!%!start_date";
	var in_paramCode = plant_id+"!%!"+proc_id+"!%!"+start_date;

	commonUtil.getCodeInfo(in_paramKey,in_paramCode,"sc_13010_set_prod_order_get_max_wo_id", { 
		callback:function(arrList){
			if( arrList.length == 1 ) {

				wo_id = arrList[0][0];		
				GridObj.SetParam("wo_id", 		wo_id);
				//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
				GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
					
			}
		chk_GoReg = 'N';
		}
	});	
}
      

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoMod  (service) {
	
	var if_flag		= document.frm.if_flag.value;
	if( if_flag == "" || if_flag == null) {
	}else{
		alert("檜嘐  ERP 瞪歎 諫猿脹 о跡殮棲棻!!!");
		return;
	}	
	

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "doMod");
	var wo_id		= document.frm.wo_id.value;
	var plant_id	= document.frm.plant_id.value;
	var proc_id		= document.frm.proc_id.value;
	var start_date	= document.frm.start_date.value;
	
	GridObj.SetParam("plant_id", 	document.frm.plant_id.value);
	GridObj.SetParam("prod_item_id",document.frm.item_id.value);
	GridObj.SetParam("prod_ver", 	document.frm.prod_ver.value);
	GridObj.SetParam("proc_id", 	document.frm.proc_id.value);
	GridObj.SetParam("oper_id",		document.frm.oper_id.value);
	GridObj.SetParam("loc_id", 		document.frm.loc_id.value);
	GridObj.SetParam("qty", 		document.frm.qty.value);
	GridObj.SetParam("qty_uom", 	document.frm.qty_uom.value);
	GridObj.SetParam("start_date", 	document.frm.start_date.value);
	GridObj.SetParam("start_time", 	document.frm.start_time.value);
	GridObj.SetParam("end_date", 	document.frm.end_date.value);
	GridObj.SetParam("end_time", 	document.frm.end_time.value);
	GridObj.SetParam("user_id", 	document.frm._user_id.value);
	
	GridObj.SetParam("wo_id", 		wo_id);
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}
      
      

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoDelete() 
{
	var if_flag		= document.frm.if_flag.value;
	if( if_flag == "" || if_flag == null) {
	}else{
		alert("檜嘐 ERP 瞪歎 諫猿脹 о跡殮棲棻!!!");
		return;
	}

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id_sel.value;
	var wo_id		= document.frm.wo_id.value;

	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "doDelete");
	GridObj.SetParam("prod_item_id", item_id);
	GridObj.SetParam("wo_id", wo_id);
	   
	GridObj.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoDeleteIf(){
	
	var if_flag		= document.frm.if_flag.value;
	
	if( confirm("ERP曖 啗�嘛� 餉薯 衛酈啊蝗棲梱.") ) {
		
	}else{
		return;	
	}	
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id_sel.value;
	var wo_id		= document.frm.wo_id.value;
	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "doDeleteIf");
	GridObj.SetParam("prod_item_id", item_id);
	GridObj.SetParam("wo_id", wo_id);
	   
	GridObj.DoQuery(servlet_url);
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
		    	GridObj.SetCellBgColor('CONS_QTY', i, '255|255|0'); 
	        }
	        
	        if(chk_GoReg == 'Y') {
	        	ActReg();
	        }
                 
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "doReg"){
    	//alert("service_url="+service_url);
    	var	idu_mode	='REG';
    	var service_url = "service.do?_moon_service=sc_13010_set_prod_order_reg_pop";
    	service_url += "&idu_mode=" + idu_mode;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("盪濰檜 諫猿腎歷蝗棲棻");
		window.close();  
		var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		newWin.focus();
		//window.opener.document.location.reload();
		window.opener.GoSearch();
    }else if(endMode == "doDelete"){
    	//alert("service_url="+service_url);
    	var service_url = "service.do?_moon_service=sc_13010_set_prod_order_reg_pop";
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("啗�嘛� 餉薯 腎歷蝗棲棻.");
		window.close();  
		window.opener.GoSearch();
    }else if(endMode == "doMod"){
    	//alert("service_url="+service_url);
    	var service_url = "service.do?_moon_service=sc_13010_set_prod_order_reg_pop";
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("啗�嘛� 滲唳腎歷蝗棲棻.");
		window.close();  
		window.opener.GoSearch();
    }else if(endMode == "doDeleteIf"){
    	//alert("service_url="+service_url);
    	var service_url = "service.do?_moon_service=sc_13010_set_prod_order_reg_pop";
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=700, height=330, top=200, left=200";
		//var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		alert("ERP啗�� 餉薯 I/F蒂 褒衛м棲棻.");
		window.close();  
		window.opener.GoSearch();
    }else{
    	window.opener.GoSearch();
    }
	
}

function GridCellClick(strColumnKey, nRow){

}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
}

function getBom(){

	doQuery();		
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
	getProdVer();
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

function getProdVer(){
	var item_id = document.frm.item_id.value;
	var in_div;
	alloc_comment_cnt = new Array();
	
	commonUtil.getSelQeury("item_id",item_id,"sc_13010_set_prod_order_get_prod_ver", { 
	callback:function(arrList){
		in_div = "<select name=\"prod_ver\" OnChange=\"doChange3(this);\"  >";
		//in_div = "<select name=\"prod_ver\" OnChange=\"doChange3(this);\"  #if($!{idu_mode} == \"MOD\") readonly #end>";
		//
		var selected_row = 0;
		for(var i=0 ; i < arrList.length ; i++){
			in_div +=	"<option value="+arrList[i][0];

			
			in_div += ">"+arrList[i][0]+"</option>";
			
			if(document.frm.inpt_prod_ver.value == arrList[i][0]) {
				in_div += " selected";
				selected_row = i;
			}			
			
		}	
			in_div += "</select> \n";
			in_div +=	"<option value=\"摹鷗\">";
		
		for(var i=0 ; i < arrList.length ; i++){  // hidden
			in_div +=	"<input type=\"hidden\" name=\"prod_ver_hidden\"	value="+arrList[i][0]+">";
			in_div +=	"<input type=\"hidden\" name=\"proc_id_hidden\"		value="+arrList[i][1]+">";
			in_div +=	"<input type=\"hidden\" name=\"hid_name_hidden\"	value="+arrList[i][2]+">";
			in_div +=	"<input type=\"hidden\" name=\"oper_id_hidden\"		value="+arrList[i][3]+">";
			in_div +=	"<input type=\"hidden\" name=\"loc_id_hidden\"		value="+arrList[i][4]+">";
			in_div +=	"<input type=\"hidden\" name=\"dc_name_hidden\"		value="+arrList[i][5]+">";
		}	

		divProdVerCombo.innerHTML = in_div;
		// ヶ跡cnt薑爾蒂 撢たи棻.
		document.frm.prod_ver.value	= arrList[selected_row][0];
		document.frm.proc_id.value	= arrList[selected_row][1];
		document.frm.hid_name.value	= arrList[selected_row][2];
		document.frm.oper_id.value	= arrList[selected_row][3];
		document.frm.loc_id.value	= arrList[selected_row][4];
		document.frm.dc_name.value	= arrList[selected_row][5];
		
	}
	});

}


function doChange3(obj){
	//alert("selectedIndex"+obj.options.selectedIndex);
	document.frm.prod_ver.value 	= document.frm.prod_ver_hidden[obj.options.selectedIndex].value;	
	document.frm.proc_id.value	= document.frm.proc_id_hidden[obj.options.selectedIndex].value;	
	document.frm.hid_name.value 	= document.frm.hid_name_hidden[obj.options.selectedIndex].value;	
	document.frm.oper_id.value 	= document.frm.oper_id_hidden[obj.options.selectedIndex].value;	
	document.frm.loc_id.value 	= document.frm.loc_id_hidden[obj.options.selectedIndex].value;	
	document.frm.dc_name.value 	= document.frm.dc_name_hidden[obj.options.selectedIndex].value;	
	
	doQuery();
}

// 璋濠諼 殮溘寞雖
function checkForNumber(obj) {
	var key = event.keyCode;
	if(!(key==8||key==9||key==13||key==46||key==144||
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}
  
	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {

		if(obj == document.frm.confirm_qty) {
			Do_DC_Allocate(obj);
		}
	}
}
