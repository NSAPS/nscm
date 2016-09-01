// Á¶È¸ ½Ã waiting ÀÌ¹ÌÁö º¸¿©ÁÖ±â
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

// Ç°¸ñ POPUP
function openItemPopup() { 	
	
	var in_sel_gubn = document.frm.in_sel_gubn.value;
	
	if(in_sel_gubn == "01"){
		var	in_item_status = "01"; 	//Á¶È¸Ç°¸ñ »óÅÂ : '01'ÆÇ¸ÅÁß	
	
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
			else {// popup ¶ç¿î´Ù! 
				openItemPopup();
			}
		}
	});
}


// enter check ¿ë 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// ÀÚ±âÈ­¸é °»½Å
	//		GoSearch();
		}
	} 
}



/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid ¿ÀºêÁ§Æ®°¡ »ý¼ºµÇ°í ÃÊ±âÈ­µÈ ÈÄ ¹ß»ýÇÏ´Â 
  ¦¢JavaScript EventÀÎ Initialize()¸¦ ¹Þ¾Æ ±×¸®µåÀÇ Çì´õ¸¦ ¼ÂÆÃÇÑ´Ù.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function init() {

	var GridObj = document.WiseGrid;

	GridObj.ClearGrid(); 
	setProperty(GridObj);//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	setDefault();        //È­¸é ±âº» ¼³Á¤ 
	setHeader(GridObj);  //ÇØ´õ»ý¼º 

}
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() {

	var GridObj = document.WiseGrid;

    GridObj.nHDLines         = 2; //Header LINE¼ö
    GridObj.nHDLineSize      = 14; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
}
   	
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {		

	var in_sel_type		= document.frm.in_sel_type.value;
	
	if(in_sel_type == "00") { // Ç°¸ñ 
		GridObj.AddHeader("ITEM_ID"			,"ÄÚµå"       		,"t_text" ,10	,60  ,false); //0   
		GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"       		,"t_text" ,200	,200  ,false); //1   
	}
	else if(in_sel_type == "01") { // ¹è¼ÛÁöÁ¡-Ç°¸ñ 
		GridObj.AddHeader("DC_ID"			,"ÄÚµå"       	,"t_text" ,10	,40  ,false); //0   
		GridObj.AddHeader("DC_NAME"			,"¹è¼ÛÁöÁ¡¸í"		,"t_text" ,200	,100 ,false); //1   
		GridObj.AddHeader("ITEM_ID"			,"ÄÚµå"       	,"t_text" ,10	,60  ,false); //2   
		GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"       	,"t_text" ,200	,200  ,false); //3   
	}
	else { // Ç°¸ñ-¹è¼ÛÁöÁ¡		
		GridObj.AddHeader("ITEM_ID"			,"ÄÚµå"       	,"t_text" ,10	,60  ,false); //0   
		GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"       	,"t_text" ,200	,200  ,false); //1  
		GridObj.AddHeader("DC_ID"			,"ÄÚµå"       	,"t_text" ,10	,40  ,false); //2   
		GridObj.AddHeader("DC_NAME"			,"¹è¼ÛÁöÁ¡¸í"		,"t_text" ,200	,100 ,false); //3   
	}
	GridObj.AddHeader("TERM_VAL"		,"À¯Åë¿ù¼ö"       	,"t_number" ,5 ,60 ,false); //4   
	GridObj.AddHeader("GYR_RATE"		,"GYRºñÀ²"       	,"t_text" ,30 ,80 ,false); //3   
	GridObj.AddHeader("Y"				,"Y"       			,"t_number" ,20 ,60 ,false); //4   
	GridObj.AddHeader("R"				,"R"       			,"t_number" ,20 ,60 ,false); //5   
	GridObj.AddHeader("Y_REMN"			,"Y_ÀÜ·®"        	,"t_number" ,20  ,60  ,false); //6   
	GridObj.AddHeader("R_REMN"			,"R_ÀÜ·®"        	,"t_number" ,20  ,60  ,false); //7   
	GridObj.AddHeader("USE_QTY"			,"¼ÒÁø·®"        	,"t_number" ,20  ,60  ,false); //8   
	GridObj.AddHeader("USE_RATE"		,"¼ÒÁøÀ²\n(%)"		,"t_number" ,20.1  ,60  ,false); //9   

	GridObj.BoundHeader();	
}
   	

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSearch(service) {

	// Á¶È¸½Ã WAITING ÀÌ¹ÌÁö º¸¿©ÁÖ±â
//	viewWait();
	
	doQuery();

    // Waiting image ÁßÁö!
//	viewWait();

}

  
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave  (service) {
    	
}
      
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() {

	var GridObj 		= document.WiseGrid;
	var in_work_date	= document.frm.in_work_date.value ;   
	var in_item_id		= document.frm.in_item_id.value;    
	var in_item_name	= document.frm.in_item_name.value;
	var in_dc_id		= document.frm.in_dc_id.value;    
	var in_sel_gubn		= document.frm.in_sel_gubn.value;    
	var in_sel_type		= document.frm.in_sel_type.value;    
	       
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.ip_04050_GYR_Analysis_list";

	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("in_work_date", in_work_date);
	GridObj.SetParam("in_item_id", in_item_id);
	GridObj.SetParam("in_item_name", in_item_name);
	GridObj.SetParam("in_dc_id", in_dc_id);
	GridObj.SetParam("in_sel_gubn", in_sel_gubn);
	GridObj.SetParam("in_sel_type", in_sel_type);
	GridObj.DoQuery(servlet_url);
   
	GridObj.ClearGrid(); 
	setHeader(GridObj);  //ÇØ´õ»ý¼º 

}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() {
    
	var GridObj = document.WiseGrid;
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
	var in_sel_type		= document.frm.in_sel_type.value;    

    if(mode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
    {
        if(GridObj.GetStatus() == "true") 
        {                                                    
			if(in_sel_type == "00") {

			    //ÄÃ·³Á¤·Ä
			    GridObj.SetColCellAlign('ITEM_ID','center'); 
			}
			else {

			    //ÄÃ·³Á¤·Ä
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
    
    
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ µ¥ÀÌÅÍ°¡ º¯°æ µÇ¾úÀ» °æ¿ì Ã³¸®µÇ´Â Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
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

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ´õºí Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function handler(strColumnKey, nRow) {

	var GridObj = document.WiseGrid;

	var service_url 	= "service.do?_moon_service=ip_04050_GYR_Item_Detail_popup";
	var in_work_date	= document.frm.in_work_date.value ;   
	var in_item_id		= GridObj.GetCellValue("ITEM_ID",nRow); // wiseGrid¿¡¼­ ¼±ÅÃÇÑ Ç°¸ñ   
	var in_item_name	= GridObj.GetCellValue("ITEM_NAME",nRow); // wiseGrid¿¡¼­ ¼±ÅÃÇÑ Ç°¸ñ   
	
	service_url += "&in_work_date=" + in_work_date + "&in_item_id=" + in_item_id  + "&in_item_name=" + in_item_name;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=840, height=500, top=0, left=0";
	var newWin = window.open(service_url, "ip_04050_GYR_Item_Detail_popup", pop_win_style);
	newWin.focus();	
}		
 
   
  
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {

}		
   		


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
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
	
	// È­¸é size Ãà¼Ò ½Ã È­¸éÀÌ ³Ê¹« ÀÛ¾Æ ±×¸®µå Å©±â°¡ À½¼ö°¡ µÇ¸é ¿¡·¯°¡ ³ª¹Ç·Î ±× °æ¿ì ¹«Á¶°Ç 1·Î ¼¼ÆÃ 
	// ==> È­¸éÀÌ ´õÀÌ»ó Ãà¼ÒµÇÁö ¾ÊÀ½ 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 
	
} 	

