// 褻�� 衛 waiting 檜嘐雖 爾罹輿晦
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}

function	doChange_sel_gubn(obj) {
	
	document.frm.in_item_id.value = "";
	document.frm.in_item_name.value = "";
}

// ヶ跡 POPUP
function openItemPopup() { 	
	
	var in_sel_gubn = document.frm.in_sel_gubn.value;
	
	if(in_sel_gubn == "01"){
		var	in_item_status = "01"; 	//褻�裔偶� 鼻鷓 : '01'っ衙醞	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
	}
	else{
		var service_url = "service.do?_moon_service=ip_06010_Prty_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_sel_gubn=" + in_sel_gubn;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();		
	}
}

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+document.frm.in_sel_gubn.value;

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
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


// enter check 辨 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// 濠晦�飛� 偵褐
	//		GoSearch();
		}
	} 
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() {

	var GridObj = document.WiseGrid;

	GridObj.ClearGrid(); 
	setProperty(GridObj);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setDefault();        //�飛� 晦獄 撲薑 
	setHeader(GridObj);  //п渦儅撩 

}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() {

	var GridObj = document.WiseGrid;

    GridObj.nHDLines         = 2; //Header LINE熱
    GridObj.nHDLineSize      = 14; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
}
   	
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {		

	var in_sel_type		= document.frm.in_sel_type.value;
	
	if(in_sel_type == "00") { // ヶ跡 
		GridObj.AddHeader("ITEM_ID"			,"囀萄"       		,"t_text" ,10	,60  ,false); //0   
		GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"       		,"t_text" ,200	,200  ,false); //1   
	}
	else if(in_sel_type == "01") { // 寡歎雖薄-ヶ跡 
		GridObj.AddHeader("DC_ID"			,"囀萄"       	,"t_text" ,10	,40  ,false); //0   
		GridObj.AddHeader("DC_NAME"			,"寡歎雖薄貲"		,"t_text" ,200	,100 ,false); //1   
		GridObj.AddHeader("ITEM_ID"			,"囀萄"       	,"t_text" ,10	,60  ,false); //2   
		GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"       	,"t_text" ,200	,200  ,false); //3   
	}
	else { // ヶ跡-寡歎雖薄		
		GridObj.AddHeader("ITEM_ID"			,"囀萄"       	,"t_text" ,10	,60  ,false); //0   
		GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"       	,"t_text" ,200	,200  ,false); //1  
		GridObj.AddHeader("DC_ID"			,"囀萄"       	,"t_text" ,10	,40  ,false); //2   
		GridObj.AddHeader("DC_NAME"			,"寡歎雖薄貲"		,"t_text" ,200	,100 ,false); //3   
	}
	GridObj.AddHeader("TERM_VAL"		,"嶸鱔錯熱"       	,"t_number" ,5 ,60 ,false); //4   
	GridObj.AddHeader("GYR_RATE"		,"GYR綠徽"       	,"t_text" ,30 ,80 ,false); //3   
	GridObj.AddHeader("Y"				,"Y"       			,"t_number" ,20 ,60 ,false); //4   
	GridObj.AddHeader("R"				,"R"       			,"t_number" ,20 ,60 ,false); //5   
	GridObj.AddHeader("Y_REMN"			,"Y_濤榆"        	,"t_number" ,20  ,60  ,false); //6   
	GridObj.AddHeader("R_REMN"			,"R_濤榆"        	,"t_number" ,20  ,60  ,false); //7   
	GridObj.AddHeader("USE_QTY"			,"模霞榆"        	,"t_number" ,20  ,60  ,false); //8   
	GridObj.AddHeader("USE_RATE"		,"模霞徽\n(%)"		,"t_number" ,20.1  ,60  ,false); //9   

	GridObj.BoundHeader();	
}
   	

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service) {

	// 褻�蜇� WAITING 檜嘐雖 爾罹輿晦
//	viewWait();
	
	doQuery();

    // Waiting image 醞雖!
//	viewWait();

}

  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave  (service) {
    	
}
      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() {

	var GridObj 		= document.WiseGrid;
	var in_work_date	= document.frm.in_work_date.value ;   
	var in_item_id		= document.frm.in_item_id.value;    
	var in_item_name	= document.frm.in_item_name.value;
	var in_dc_id		= document.frm.in_dc_id.value;    
	var in_sel_gubn		= document.frm.in_sel_gubn.value;    
	var in_sel_type		= document.frm.in_sel_type.value;    
	       
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.ip_04050_GYR_Analysis_list";

	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("in_work_date", in_work_date);
	GridObj.SetParam("in_item_id", in_item_id);
	GridObj.SetParam("in_item_name", in_item_name);
	GridObj.SetParam("in_dc_id", in_dc_id);
	GridObj.SetParam("in_sel_gubn", in_sel_gubn);
	GridObj.SetParam("in_sel_type", in_sel_type);
	GridObj.DoQuery(servlet_url);
   
	GridObj.ClearGrid(); 
	setHeader(GridObj);  //п渦儅撩 

}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() {
    
	var GridObj = document.WiseGrid;
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
	var in_sel_type		= document.frm.in_sel_type.value;    

    if(mode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {                                                    
			if(in_sel_type == "00") {

			    //鏽歲薑溺
			    GridObj.SetColCellAlign('ITEM_ID','center'); 
			}
			else {

			    //鏽歲薑溺
			    GridObj.SetColCellAlign('DC_ID','center'); 
			    GridObj.SetColCellAlign('ITEM_ID','center'); 
			}

		    GridObj.SetColCellAlign('TERM_VAL','center'); 
		    GridObj.SetColCellAlign('GYR_RATE','center'); 
		    GridObj.SetColCellAlign('Y','right'); 
		    GridObj.SetColCellAlign('R','right'); 
		    GridObj.SetColCellAlign('Y_REMN','right'); 
		    GridObj.SetColCellAlign('R_REMN','right'); 
		    GridObj.SetColCellAlign('USE_QTY','right'); 
		    GridObj.SetColCellAlign('USE_RATE','right'); 

		    GridObj.SetNumberFormat('Y','#,###'); 
		    GridObj.SetNumberFormat('R','#,###'); 
		    GridObj.SetNumberFormat('Y_REMN','#,###'); 
		    GridObj.SetNumberFormat('R_REMN','#,###'); 
		    GridObj.SetNumberFormat('USE_QTY','#,###'); 
		    GridObj.SetNumberFormat('USE_RATE','#,##0.#'); 

        } else	
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);			
        }
    }
    
}
    
    
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 等檜攪陛 滲唳 腎歷擊 唳辦 籀葬腎朝 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeCell(strColumnKey, nRow) {
   	/*
if(strColumnKey != "SELECTED") {
	//??? ? SELECTED ?? ??? ??? ?? ???. 
	GridObj.SetCellValue("SELECTED", nRow, "1");
}
*/
}    
    
   /* ?? */
function doInsert() {

/*	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.user_list";
   
   	if(!chkSelected()) {
   		alert("??? ?? ????.");
   		return;	
   	}
   
	   	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "insert");
	   
	   	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
*/
}
   
   /* ?? */
function doUpdata() {
/*
   	var GridObj = document.WiseGrid;
   	var servlet_url = Project_name+"/servlet/com.wisegrid.sample.basic_example_select";
   
   	if(!chkSelected()) {
   		alert("??? ?? ????.");
   		return;	
   	}
   
   	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "update");
   
   	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
*/
}
   
   /* ?? */
function doDelete() {
/*
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/wisegrid.sample.basic_example_select";
   
   	if(!chkSelected()) {
   		alert("??? ?? ????.");
   		return;	
   	}
   
   	//WiseGrid? ??? ??? mode? ????.
	GridObj.SetParam("mode", "delete");
   
   	//WiseGrid? ??? ???? ???? ????. ????? ??? ??? ???? ??.
	GridObj.DoQuery(servlet_url, "SELECTED");
*/
}
   
   /* ??? ?????? ????. */
function chkSelected() {

}
   
   /* EXCEL ???? */
function excelDown() {
	var GridObj = document.WiseGrid;
   	//???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
	GridObj.ExcelExport("", "", true, true);
}

   

   
function getdatetime() {
   	var today = new Date();
   	var year = today.getYear();
   	var month = today.getMonth() + 1;
   	var day = today.getDate();
   	
   	if(month < 10)
   		month = "0" + month;
	
	if(day < 10)
		day = "0" + day;
   
   	document.frm.to_date.value = year + "" + month + "" + day;
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 渦綰 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function handler(strColumnKey, nRow) {

	var GridObj = document.WiseGrid;

	var service_url 	= "service.do?_moon_service=ip_04050_GYR_Item_Detail_popup";
	var in_work_date	= document.frm.in_work_date.value ;   
	var in_item_id		= GridObj.GetCellValue("ITEM_ID",nRow); // wiseGrid縑憮 摹鷗и ヶ跡   
	var in_item_name	= GridObj.GetCellValue("ITEM_NAME",nRow); // wiseGrid縑憮 摹鷗и ヶ跡   
	
	service_url += "&in_work_date=" + in_work_date + "&in_item_id=" + in_item_id  + "&in_item_name=" + in_item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=840, height=500, top=0, left=0";
	var newWin = window.open(service_url, "ip_04050_GYR_Item_Detail_popup", pop_win_style);
	newWin.focus();	
}		
 
   
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

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
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 
	
} 	

