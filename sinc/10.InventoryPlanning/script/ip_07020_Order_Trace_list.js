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

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_07020_Order_Trace_list';
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
    GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'    
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	GridObj.AddHeader("CNFM_DATE"		,"橾濠"       		,"t_text" 	,100    ,100  ,false);
	GridObj.AddHeader("DC_NAME"			,"寡歎雖薄"       	,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("DOMAIN"			,"掘碟"       		,"t_text" 	,100	,40  ,false); //0   
 	GridObj.AddHeader("SLIP_GUBN"		,"瞪ル掘碟"       	,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("DEPT_NAME"		,"艙機雖薄"       	,"t_text" 	,500	,120 ,false); //0   
 	GridObj.AddHeader("HAN_NAME"		,"殮溘濠"       		,"t_text" 	,100	,60  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"剪楚籀貲"       	,"t_text" 	,500	,100  ,false); //0   
 	GridObj.AddHeader("SLIP_NO"			,"瞪ル廓��"       	,"t_text" 	,200	,50  ,false); //0   
 	GridObj.AddHeader("SEQ_NO"			,"ヶ廓"       		,"t_text" 	,200	,0  ,false); //0   
 	GridObj.AddHeader("REQT_BOX"		,"曖煆夢蝶"       	,"t_number" ,20.1	,60  ,false); //0   
 	GridObj.AddHeader("SELL_BOX"		,"葆馬夢蝶"       	,"t_number" ,20.1	,60  ,false); //0   
 	GridObj.AddHeader("IPUT_DTTM"		,"殮溘衛除"       	,"t_text" 	,200	,140 ,false); //0   
 	GridObj.AddHeader("CHGO_GUBN"		,"瞪ル鼻鷓"       	,"t_text" 	,100	,60  ,false); //0   
 	GridObj.AddHeader("SHORTAGE_GUBN"	,"唸ヶ餌嶸"       	,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("CLOS_DTTM"		,"葆馬衛除"       	,"t_text" 	,200	,140  ,false); //0   

	GridObj.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");

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

       var in_fr_date		= document.all.in_fr_date.value;
       var in_to_date   	= document.all.in_to_date.value;
       var in_item_id   	= document.all.in_item_id.value;
       var in_input_gubn	= document.all.in_input_gubn.value;
       var tgt_loc_sel		= document.all.tgt_loc_sel.value;
       
       var sales_list		= document.all.sales_list.value;	//2013-03-13 寡歎雖薄 蹺陛//
       
       var in_slip_gubn		= document.all.in_slip_gubn.value;
       var in_clos_gubn		= document.all.in_clos_gubn.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date",		in_fr_date);
       GridObj.SetParam("in_to_date",		in_to_date);
       GridObj.SetParam("in_item_id",		in_item_id);
       GridObj.SetParam("in_input_gubn",	in_input_gubn);
       GridObj.SetParam("tgt_loc_sel",		tgt_loc_sel);
       
       GridObj.SetParam("sales_list",		sales_list);		//2013-03-13 寡歎雖薄 蹺陛//
       
       
       GridObj.SetParam("in_slip_gubn",		in_slip_gubn);
       GridObj.SetParam("in_clos_gubn",		in_clos_gubn);
 
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

			    GridObj.SetColCellAlign('CNFM_DATE','center'); 
			    GridObj.SetColCellAlign('DC_NAME','left'); 
			    GridObj.SetColCellAlign('DOMAIN','center'); 
			    GridObj.SetColCellAlign('SLIP_GUBN','center'); 
			    GridObj.SetColCellAlign('DEPT_NAME','left'); 
			    GridObj.SetColCellAlign('HAN_NAME','center'); 
			    GridObj.SetColCellAlign('CUST_NAME','left'); 
			    GridObj.SetColCellAlign('SLIP_NO','center'); 
			    GridObj.SetColCellAlign('SEQ_NO','center'); 
			    GridObj.SetColCellAlign('REQT_BOX','right'); 
			    GridObj.SetColCellAlign('SELL_BOX','right'); 
			    GridObj.SetColCellAlign('IPUT_DTTM','center'); 
			    GridObj.SetColCellAlign('CHGO_GUBN','center'); 
			    GridObj.SetColCellAlign('SHORTAGE_GUBN','left'); 
			    GridObj.SetColCellAlign('CLOS_DTTM','center'); 

			    GridObj.SetNumberFormat('REQT_BOX','#,##0.#'); 
			    GridObj.SetNumberFormat('SELL_BOX','#,##0.#'); 

				// м啗
				GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'REQT_BOX,SELL_BOX'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 

				for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell儀梃 滲唳
					if(GridObj.GetCellValue('SLIP_GUBN',i) == "顫啗薑" ){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '0|255|0');
					}
					else if(GridObj.GetCellValue('SLIP_GUBN',i) == "睡憮顫啗薑"){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '170|219|110');
					}
					else if(GridObj.GetCellValue('SLIP_GUBN',i) == "唸營鼻褐"){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '200|255|110');
					}
					else if(GridObj.GetCellValue('SLIP_GUBN',i) == "�蜈�"){ // YELLOW
						GridObj.SetCellBgColor('SLIP_GUBN', i, '255|255|0'); 
					}
					
					// 曖煆夢蝶爾棻 葆馬夢蝶陛 觼賊 儀梃煎 ル衛и棻.
					if(strToNum(GridObj.GetCellValue('REQT_BOX',i)) > strToNum(GridObj.GetCellValue('SELL_BOX',i))) {
						GridObj.SetCellBgColor('REQT_BOX', i, '253|228|229');
						GridObj.SetCellBgColor('SELL_BOX', i, '253|228|229');
				    	
				    	GridObj.SetCellFontBold('REQT_BOX', i, 'true'); // font 掃晦  
						GridObj.SetCellFontBold('SELL_BOX', i, 'true'); // font 掃晦  

					}
					
					
				}
                     
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

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
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
    