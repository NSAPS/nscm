/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//

var job_id = 'md_01020_masterDataCheckItem_list';
var job_id2= 'md_01020_masterDataCheckItem_list02';
 
var GridObj;
var GridObj2;
var GridHeaderString = "";

/******************************************          Action Function         **********************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch() {
	
	doQuery2();
	
}

/*******************************************   WiseGrid 蟾晦�� 塽 撲薑  *****************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() { 
	
	GridObj = document.WiseGrid;
    setProperty(GridObj);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setDefault(GridObj);        //�飛� 晦獄 撲薑 
    setHeader();  //п渦儅撩 
}
   
function init2() {
	
	GridObj2= document.WiseGrid2;   		
    setProperty(GridObj2);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setDefault(GridObj2);        //�飛� 晦獄 撲薑 
    setHeader2();  //п渦儅撩 
}   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault(GridObj){ 

	//Hearder 堪檜
	GridObj.nHDLineSize   = 10;
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2; 		
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(){   
	     
    commonUtil.getCodeList("job_id", job_id , "gird_header_list", defaultHeader); 
       
}
   
function setHeader2(){  
	      
    commonUtil.getCodeList("job_id", job_id2 , "gird_header_list", defaultHeader2); 
       
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function defaultHeader(result){
	
	var test = '';
	var arrHeader = '';
	for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	//п渦 斜瑜儅撩
	//GridObj.AddGroup("GR_REASON","爾薑");  //陳瞼 斜瑜
	
	GridObj.BoundHeader();
	
	//Hidden 鏽歲 
	//GridObj.SetColHide("REASON01",true);
	
	//鏽歲 薑溺
	GridObj.SetColCellAlign('DATA_TYPE','center');
	GridObj.SetColCellAlign('ITEM_TYPE','center');
	GridObj.SetColCellAlign('ITEM_DETAIL_FLAG','center');
	GridObj.SetColCellAlign('LINE_SETTING_FLAG','center');
	GridObj.SetColCellAlign('BOM_MASTER_FLAG','center');	
	
	doQuery();              
}
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function defaultHeader2(result){
	
   	var test = '';
   	var arrHeader = '';
   	for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
   	{
       arrHeader = result[i].split('!%!');
       GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
   	}
   	//п渦 斜瑜儅撩
  	//GridObj2.AddGroup("GR_QTY","熱榆");  //瞪/�� 斜瑜
  	
  	GridObj2.BoundHeader();

   	////Hidden 鏽歲 
   	//GridObj2.SetColHide("R02_NAME",true); 
    
	//鏽歲 薑溺
	GridObj2.SetColCellAlign('DATA_EXISTS','center');
              
}

/***********************************************   WiseGrid 鱔褐  **********************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() {
	
   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

   	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   	GridObj.SetParam("mode", "search");
   	GridObj.SetParam("query_id", job_id);
   	
   	GridObj.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛舒廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2() {
	
    var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

   	var item_id = document.all.item_id.value;
   	
   	if( item_id == "" || item_id == null) {
   		alert("試盪 薯ヶ擊 摹鷗ж褊衛螃.");
   		return;
   	}
   	      
   	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
   	GridObj2.SetParam("mode", "search2");
   	GridObj2.SetParam("item_id", item_id);
   	GridObj2.SetParam("query_id", job_id2);
   	
	GridObj2.DoQuery(servlet_url);
}
   
/*******************************************   WiseGrid 鱔褐 ��  撲薑  ******************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery(){
	
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
      
    if(mode == "search"){ //褻�萼� 諫猿脹 唳辦
        if(GridObj.GetStatus() == "true"){ 
			for( i = 0 ; i < GridObj.GetRowCount() ; i++) {
				if( GridObj.GetCellValue("DATA_TYPE", i) == "DATA 援塊 勒"){
					GridObj.SetRowBgColor(i, "255|255|160");
				}
			}                                               
        } else {
         
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
}
    

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery2(){
    
    var mode = GridObj2.GetParam("mode");
    var error_msg = '';
      
    if(mode == "search2"){ //褻�萼� 諫猿脹 唳辦
        if(GridObj.GetStatus() == "true"){ 

        } else {     
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }

}

/*********************************************   WiseGrid Event   *********************************************************/
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 等檜攪陛 滲唳 腎歷擊 唳辦 籀葬腎朝 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeCell(strColumnKey, nRow) {

}    
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow){     

}        

/*********************************************   晦顫 Function   **********************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setGridAutoResize2( tab_h, table_h ){
    
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
			else {
				document.frm.item_name.value = "";
				var itemid = objBox.value;
				openCodeSearchPop('item_id', 'item_name', '400', '300');
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