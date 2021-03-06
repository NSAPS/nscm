//############################################################
//## Щ煎斜極ID      : ip_07010_Item_Trace_list.vm
//## Щ煎斜極貲      : SCMヶ跡蹺瞳褻��
//## 偃嫦濠          : 陴錠辨
//## 偃嫦橾濠        : 2009-07-16
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
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
var job_id = 'ip_07010_Item_Trace_list';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2;
var GridObj3;

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
   
function init2() {
   		
	GridObj2 = document.WiseGrid2;
	
	setProperty(GridObj2);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader2(GridObj2);  	//п渦儅撩 
	setDefault2();        	//�飛� 晦獄 撲薑 
	
}   

function init3() {
   		
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader3(GridObj3);  	//п渦儅撩 
	setDefault3();        	//�飛� 晦獄 撲薑 
	
}   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

    GridObj.nHDLineSize         = 12; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
}
function setDefault2() { 

    GridObj2.nHDLineSize         = 12; //Header Size
    GridObj2.strHDClickAction    = "sortsingle";
}
function setDefault3() { 

    GridObj3.nHDLineSize         = 12; //Header Size
    GridObj3.strHDClickAction    = "sortsingle";
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	GridObj.AddHeader("INBOUND_DATE"	,"儅骯/衙殮橾"       	,"t_text" 	,20		,120  ,false); //0   
 	GridObj.AddHeader("DC_ID"			,"CODE"       		,"t_text" 	,10		,60  ,false); //0   
 	GridObj.AddHeader("DC_NAME"			,"CDC/RDC"       	,"t_text" 	,100	,120  ,false); //0   
 	GridObj.AddHeader("ITEM_CD"			,"ヶ跡囀萄"       	,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("ITEM_NM"			,"ヶ跡貲"       		,"t_text" 	,200	,200  ,false); //0   
 	GridObj.AddHeader("IPGO"			,"熱榆"       		,"t_number" ,20.3	,80  ,false); //0   

 	// 褻�萵蛹釔� 熱殮鼻ヶ橾陽虜 ル衛
 	GridObj.AddHeader("BL_NO"				,"B/L"       		,"t_text" 	,100	,200  ,false); //0   

	GridObj.BoundHeader();	

	GridObj.SetNumberFormat("IPGO"  , "#,##0");

    GridObj.SetColCellAlign('INBOUND_DATE','center'); 
    GridObj.SetColCellAlign('DC_ID','center'); 
    GridObj.SetColCellAlign('ITEM_CD','center'); 
       
}
   
function setHeader2(GridObj2) {        
       
  	GridObj2.AddHeader("DC_ID"			,"CODE"       		,"t_text" 	,10		,60  ,false); //0   
 	GridObj2.AddHeader("DC_NAME"		,"CDC/RDC"       	,"t_text" 	,100	,120  ,false); //0   
 	GridObj2.AddHeader("IPGO"			,"營堅"       		,"t_number" ,20.3	,80  ,false); //0   

	GridObj2.BoundHeader();	

	GridObj2.SetNumberFormat("IPGO"  , "#,##0");

    GridObj2.SetColCellAlign('DC_ID','center'); 

}
   
function setHeader3(GridObj3) {        
       
 	GridObj3.AddHeader("OUTBOUND_DATE"	,"轎堅橾"       		,"t_text" 	,20		,80  ,false); //0   
 	GridObj3.AddHeader("CUST_ID"		,"CODE"       		,"t_text" 	,20		,0  ,false); //0   
 	GridObj3.AddHeader("CUST_NAME"		,"剪楚籀貲"       	,"t_text" 	,200	,180  ,false); //0   
 	GridObj3.AddHeader("ADDR"			,"輿模"       		,"t_text" 	,1000	,250  ,false); //0   
 	GridObj3.AddHeader("TEL_NO"			,"瞪�食醽�"       	,"t_text" 	,200	,100  ,false); //0   
 	GridObj3.AddHeader("CHGO"			,"熱榆"       		,"t_number" ,20.3	,80  ,false); //0   

	GridObj3.BoundHeader();	

	GridObj3.SetNumberFormat("CHGO"  , "#,##0");

    GridObj3.SetColCellAlign('OUTBOUND_DATE','center'); 
    GridObj3.SetColCellAlign('CUST_ID','center'); 
    GridObj3.SetColCellAlign('TEL_NO','center'); 

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

       var in_fr_date = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var in_item_id  = document.all.in_item_id.value;
       var in_bl_no  = document.all.in_bl_no.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", in_fr_date);
       GridObj.SetParam("in_to_date", in_to_date);
       GridObj.SetParam("in_item_id", in_item_id);
       GridObj.SetParam("in_bl_no", in_bl_no);
       GridObj.DoQuery(servlet_url);
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛舒廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var sel_date = GridObj.GetCellValue("INBOUND_DATE", nRow);
	var sel_dc_id = GridObj.GetCellValue("DC_ID", nRow);
	var sel_item_id = GridObj.GetCellValue("ITEM_CD", nRow);
	var sel_bl_no = GridObj.GetCellValue("BL_NO", nRow);
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("sel_date", sel_date);
	GridObj2.SetParam("sel_dc_id", sel_dc_id);
	GridObj2.SetParam("sel_item_id", sel_item_id);
	GridObj2.SetParam("sel_bl_no", sel_bl_no);
	GridObj2.DoQuery(servlet_url);
}
   

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛撮廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery3(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var sel_date = GridObj.GetCellValue("INBOUND_DATE", nRow);
	var sel_dc_id = GridObj.GetCellValue("DC_ID", nRow);
	var sel_item_id = GridObj.GetCellValue("ITEM_CD", nRow);
	var sel_bl_no = GridObj.GetCellValue("BL_NO", nRow);
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("sel_date", sel_date);
	GridObj3.SetParam("sel_dc_id", sel_dc_id);
	GridObj3.SetParam("sel_item_id", sel_item_id);
	GridObj3.SetParam("sel_bl_no", sel_bl_no);
	GridObj3.DoQuery(servlet_url);
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() {
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {                           
		  
		  GridObj.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'IPGO');
		  GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		   
		}
		else { 
			error_msg = GridObj.GetMessage(); 
			alert(error_msg);            
		}
	}
}

function GridEndQuery2() {
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj2.GetStatus() == "true") {                           

		  GridObj2.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'IPGO'); 
		  GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
}

function GridEndQuery3() {
	
	var mode = GridObj3.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj3.GetStatus() == "true") {                           

			GridObj3.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'CHGO'); 
			GridObj3.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridChangeCell(strColumnKey, nRow,nOldValue,nNewValue) {

}	
   	
function GridCellDblClick(strColumnKey, nRow){     

		doQuery2(nRow);	
		doQuery3(nRow);
}        

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' ヶ跡褻��

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

// ヶ跡 POPUP
function openItemPopup() { 	
	
		var	in_item_status = "01"; 	//褻�裔偶� 鼻鷓 : '01'っ衙醞	
	
		var service_url = "service.do?_moon_service=ip_06010_Item_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_item_status=" + in_item_status;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
		var newWin = window.open(service_url, "Item_Search", pop_win_style);
		newWin.focus();
}

// BL POPUP
function openBLPopup() { 	
	
		var service_url = "service.do?_moon_service=ip_07010_BL_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&in_fr_date=" + document.frm.in_fr_date.value;
		service_url += "&in_to_date=" + document.frm.in_to_date.value;
		service_url += "&in_item_id=" + document.frm.in_item_id.value;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=400, height=350, top=0, left=0";
		var newWin = window.open(service_url, "BL_Search", pop_win_style);
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
       // document.WiseGrid.height = tableHeightValue + "px"; 
        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
        document.WiseGrid3.height = tableHeightValue - document.WiseGrid.height + "px"; 
        
    }  
    