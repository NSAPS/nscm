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
var job_id = 'rp_01170_transOrderChange_list';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2;
var GridObj3;
var GridObj4;
//var GridObj5;

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
        //document.WiseGrid.height = tableHeightValue + "px"; 
        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
        //document.WiseGrid3.height = tableHeightValue - document.WiseGrid.height + "px"; 
        
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

	GridObj.bRowSelectorVisible = true;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.


    GridObj.nHDLineSize         = 12; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj.strSelectedCellFgColor = '180|82|205';
    
    GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.

    
    
}
function setDefault2() { 

	GridObj2.bRowSelectorVisible = true;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj2.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj2.nHDLineSize         = 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";

    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj2.strSelectedCellFgColor = '180|82|205';
    
    GridObj2.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj2.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.


}
function setDefault3() { 

	GridObj3.bRowSelectorVisible = true;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj3.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj3.nHDLineSize         = 12; //Header Size
    //GridObj2.strHDClickAction    = "sortsingle";

    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj3.strSelectedCellFgColor = '180|82|205';
    
    GridObj3.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj3.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	GridObj.AddHeader("TRANS_DATE"		,"熱歎橾濠"       ,"t_text" 	,20		,100  ,false); //0   
 	GridObj.AddHeader("SRC_LOC"			,"SRC_LOC"      ,"t_text" 	,10		,0  ,false); //0   
 	GridObj.AddHeader("SRC_NAME"		,"轎堅濰"       	,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("TGT_LOC"			,"TGT_LOC"      ,"t_text" 	,10		,0  ,false); //0   
 	GridObj.AddHeader("TGT_NAME"		,"殮堅濰"       	,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("BRAND_NO"		,"瞪ル廓��"       ,"t_text" 	,20		,80  ,false); //0   
 	GridObj.AddHeader("BOX_QTY"			,"BOX 熱榆"      ,"t_number" ,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PLT_QTY"			,"PLT 熱榆"      ,"t_number" ,20.3	,80  ,false); //0   
 	GridObj.AddHeader("TRANS_STATE"		,"葆馬掘碟"       ,"t_text" 	,100	,80  ,false); //0  


	GridObj.BoundHeader();	

	//GridObj.SetNumberFormat("IPGO"  , "#,##0");

    GridObj.SetColCellAlign('TRANS_DATE','center'); 
    GridObj.SetColCellAlign('SRC_NAME','center'); 
    GridObj.SetColCellAlign('TGT_NAME','center'); 
    GridObj.SetColCellAlign('BRAND_NO','center'); 
    GridObj.SetColCellAlign('TRANS_STATE','center'); 
       
}
   
function setHeader2(GridObj2) {        
       



  	GridObj2.AddHeader("CRUD"			,"掘碟"       		,"t_text" 		,10		,0  ,false); //0   
  	//GridObj2.AddHeader("NO"				,"廓��"       		,"t_number" 	,5		,30  ,true); //0   
  	GridObj2.AddHeader("SELECTED"		,"餉薯辦摹牖嬪"       		,"t_checkbox" 	,2		,60  ,true); //0   

 	GridObj2.AddHeader("ITEM_ID"		,"薯ヶ囀萄"       	,"t_text" 		,100	,70  ,false); //0   
 	GridObj2.AddHeader("ITEM_NAME"		,"薯ヶ貲"       		,"t_text" 		,100	,150  ,false); //0   
 	GridObj2.AddHeader("BOX_QTY"		,"BOX"       		,"t_number" 	,20.3	,45  ,false); //0   
 	GridObj2.AddHeader("PLT_QTY"		,"PLT"       		,"t_number" 	,20.3	,45  ,false); //0   
 	GridObj2.AddHeader("DEL_PLT"		,"餉薯PLT"       	,"t_number" 	,20.3	,60  ,true); //0   
 	GridObj2.AddHeader("DEL_QTY"		,"餉薯QTY"       	,"t_number" 	,20.3	,0  ,true); //0   
 	//GridObj2.AddHeader("DEL_RANK"		,"餉薯辦摹牖嬪"       	,"t_text" 		,100	,80  ,false); //0   

 	GridObj2.AddHeader("TRANS_DATE"		,"熱歎橾濠"       	,"t_text" 		,20		,0  ,false); //0   
 	GridObj2.AddHeader("SRC_LOC"		,"轎堅濰"       		,"t_number" 	,20		,0  ,false); //0   
 	GridObj2.AddHeader("TGT_LOC"		,"殮堅濰"       		,"t_number" 	,20		,0  ,false); //0   
 	GridObj2.AddHeader("BRAND_NO"		,"瞪ル廓��"       	,"t_text" 		,20		,0  ,false); //0
 	GridObj2.AddHeader("BOX_PER_PALET"	,"BOX_PER_PALET"    ,"t_number" ,200	,0   ,false); //0 	
 	GridObj2.AddHeader("CRE_GUBN"		,"CRE_GUBN"      	,"t_text" ,200	,0   ,false); //0 	
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 

	
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);

    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    GridObj2.SetColCellAlign('SELECTED','center'); 
    
    GridObj2.SetNumberFormat("DEL_PLT"  , "#,##0");
    
	GridObj2.SetColHDBgColor('DEL_PLT','253|228|229');
    


}
   
function setHeader3(GridObj3) {        
       
  	GridObj3.AddHeader("CRUD"			,"掘碟"       		,"t_text" 		,10		,0  ,false); //0   
  	GridObj3.AddHeader("SELECTED"		,"蹺陛辦摹牖嬪"       		,"t_checkbox" 	,2		,60  ,true); //0   
	//GridObj3.AddHeader("NO"				,"廓��"       	,"t_number" 	,5		,30  ,true); //0
 	GridObj3.AddHeader("ITEM_ID"		,"薯ヶ囀萄"       ,"t_text" 	,100	,70  ,true); //0   
 	GridObj3.AddHeader("ITEM_NAME"		,"薯ヶ貲"       	,"t_text" 	,1000	,180 ,false); //0   
 	//GridObj3.AddHeader("STOCK_QTY"		,"營堅熱榆"       ,"t_text" 	,100	,80  ,false); //0   
 	GridObj3.AddHeader("BOX_QTY"		,"BOX"      	,"t_number" ,1000.3	,70  ,true); //0   
 	GridObj3.AddHeader("PLT_QTY"		,"PLT"      	,"t_number" ,1000.3	,70  ,true); //0   
 	GridObj3.AddHeader("BOX_PER_PALET"			,"BOX_PER_PALET"      	,"t_number" ,200	,0   ,false); //0 	

	GridObj3.BoundHeader();	

	//GridObj3.SetNumberFormat("CHGO"  , "#,##0");

    //GridObj3.SetColCellAlign('BRAND_CODE','center'); 
    GridObj3.SetColCellAlign('ITEM_ID','center'); 

    GridObj3.SetNumberFormat("BOX_QTY"  , "#,##0");
    GridObj3.SetNumberFormat("PLT_QTY"  , "#,##0");

	GridObj3.SetColHDBgColor('BOX_QTY','253|228|229');
	GridObj3.SetColHDBgColor('PLT_QTY','253|228|229');

}

function setGrid2(){
	GridObj2.SetColCellBgColor('DEL_PLT',color_edit_col);//PLT

	
}
function setGrid3(){
	GridObj3.SetColCellBgColor('BOX_QTY',color_edit_col);//PLT
	GridObj3.SetColCellBgColor('PLT_QTY',color_edit_col);//PLT
	
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() {
	
	var mode = GridObj.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {                           
		  
		  //GridObj.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'IPGO');
		  //GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		   
		}
		else { 
			error_msg = GridObj.GetMessage(); 
			alert(error_msg);            
		}
	}
}

function GridEndQuery2() {
	//alert("WD2");
	
	var mode = GridObj2.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj2.GetStatus() == "true") {                           

		  //GridObj2.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'IPGO'); 
		  //GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}
	else if(mode == "doOrderAddWd2") {
		if(GridObj2.GetStatus() == "true") {                           

		  GoTransOrderAddWd3(); 
		   
		}
	}
	setGrid2(); //WiseGrid 撲薑
	
}

function GridEndQuery3() {
	//alert("WD3");
	var mode = GridObj3.GetParam("mode");
	var error_msg = '';
	          
	if(mode == "search") {
		if(GridObj3.GetStatus() == "true") {                           

			//GridObj3.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'CHGO'); 
			//GridObj3.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 
		}
		else { 
			error_msg = GridObj3.GetMessage(); 
			alert(error_msg);            
		}
	}
	else if(mode == "doOrderAddWd3") {
		if(GridObj3.GetStatus() == "true") {                           

		  GoMakeBrandNo(); 
		   
		}
	}
	
	
	setGrid3(); //WiseGrid 撲薑
	
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
    //init2();
    //init3()
    //doQuery2();	
	//doQuery3();
	GridObj2.ClearGrid( ); 
	setHeader2(GridObj2);	
	GridObj3.ClearGrid( ); 
	setHeader3(GridObj3);	
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow){     

	var act_gubn	= document.all.act_gubn.value; // 10(蹺陛/薑薑), 20(螃熱歎)

	doQuery2(nRow);	
	if(act_gubn == '01'){// 10(蹺陛/薑薑), 20(螃熱歎)
		doQuery3(nRow);
	}
}        
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var trans_start 		= document.all.trans_start.value;
       var trans_end   		= document.all.trans_end.value;
       var selected_src_loc	= document.all.selected_src_loc.value;
       var selected_tgt_loc	= document.all.selected_tgt_loc.value;
       var brand_no		= document.all.brand_no.value;
       var act_gubn		= document.all.act_gubn.value;
       
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("trans_start", trans_start);
       GridObj.SetParam("trans_end"	, trans_end);
       GridObj.SetParam("selected_src_loc", selected_src_loc);
       GridObj.SetParam("selected_tgt_loc", selected_tgt_loc);
       GridObj.SetParam("brand_no", brand_no);
       GridObj.SetParam("act_gubn", act_gubn);
       GridObj.DoQuery(servlet_url);
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛舒廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2(nRow) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var trans_date	= GridObj.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj.GetCellValue("BRAND_NO", nRow);
	var act_gubn	= document.all.act_gubn.value; // 10(蹺陛/薑薑), 20(螃熱歎)
	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("trans_date", trans_date);
	GridObj2.SetParam("src_loc", src_loc);
	GridObj2.SetParam("tgt_loc", tgt_loc);
	GridObj2.SetParam("brand_no", brand_no);
	GridObj2.SetParam("act_gubn", act_gubn);



	GridObj2.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛舒廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery3(nRow) {


	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var trans_date	= GridObj.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj.GetCellValue("BRAND_NO", nRow);
	var act_gubn	= document.all.act_gubn.value; // 10(蹺陛/薑薑), 20(螃熱歎)



	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj3.SetParam("mode", "search3");
	GridObj3.SetParam("trans_date", trans_date);
	GridObj3.SetParam("src_loc", src_loc);
	GridObj3.SetParam("tgt_loc", tgt_loc);
	GridObj3.SetParam("brand_no", brand_no);
	GridObj3.SetParam("act_gubn", act_gubn);
	GridObj3.DoQuery(servlet_url);
}
   

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛熱歎螃渦 蹺陛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  function GoTransOrderAdd() { 	
	
	
	var act_gubn	= document.all.act_gubn.value; // 01(蹺陛/薑薑), 02(螃熱歎)
	//var cre_gubn	= document.all.cre_gubn.value;
	var chng_resn	= document.all.chng_resn.value;
	var plt_unit	= document.all.plt_unit.value;
	var rc 			= GridObj2.GetRowCount();
	if(rc == 0){
		alert("熱歎螃渦蒂 滲唳й  瞪ル蒂 褻�裙� 褒чж衛晦 夥奧棲棻");
		return;
	}	

	var trans_date	= GridObj2.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj2.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj2.GetCellValue("BRAND_NO", nRow);
	
	

	var tableLen = GridObj.GetRowCount();

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj2.SetParam("mode", "orderAddWd2");	
	
    GridObj2.SetParam("act_gubn", act_gubn);
    GridObj2.SetParam("chng_resn", chng_resn);
    GridObj2.SetParam("plt_unit", plt_unit);
	GridObj2.SetParam("trans_date",trans_date);
	GridObj2.SetParam("src_loc",src_loc);
	GridObj2.SetParam("tgt_loc",tgt_loc);
	GridObj2.SetParam("brand_no",brand_no);
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	


	if(act_gubn == "01"){
		if(confirm("ヶ跡 蹺陛/薑薑 擊 褒чж衛啊蝗棲梱?") == 1 ) {
		}else{
			return;
		}
	}else if(act_gubn == "02"){
		if(confirm("螃熱歎 薑薑 擊 褒чж衛啊蝗棲梱?") == 1 ) {
		}else{
			return;
		}
	}else if(act_gubn == "03"){
		if(confirm("睡褶熱榆 蹺陛蒂 褒чж衛啊蝗棲梱?") == 1 ) {
		}else{
			return;
		}
	}
	
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.

	GridObj2.DoQuery(servlet_url, "SELECTED");
		
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛熱歎螃渦 蹺陛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  function GoTransOrderAddWd3() { 	
	
	
	var act_gubn	= document.all.act_gubn.value; // 10(蹺陛/薑薑), 20(螃熱歎)
	//var cre_gubn	= document.all.cre_gubn.value;
	var chng_resn	= document.all.chng_resn.value;
	var plt_unit	= document.all.plt_unit.value;
	
	var trans_date	= GridObj2.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj2.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj2.GetCellValue("BRAND_NO", nRow);
	

	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	//GridObj3.SetParam("mode", "search3");

	var tableLen = GridObj.GetRowCount();

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj3.SetParam("mode", "orderAddWd3");	
	
    GridObj3.SetParam("act_gubn", act_gubn);
    GridObj3.SetParam("chng_resn", chng_resn);
    GridObj3.SetParam("plt_unit", plt_unit);
	GridObj3.SetParam("trans_date",trans_date);
	GridObj3.SetParam("src_loc",src_loc);
	GridObj3.SetParam("tgt_loc",tgt_loc);
	GridObj3.SetParam("brand_no",brand_no);
	GridObj3.SetParam("user_id", document.frm._user_id.value);

	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.

	GridObj3.DoQuery(servlet_url, "SELECTED");
		
}
function GoMakeBrandNo(){

	var act_gubn	= document.all.act_gubn.value; // 10(蹺陛/薑薑), 20(螃熱歎)
	var chng_resn	= document.all.chng_resn.value;
	var plt_unit	= document.all.plt_unit.value;
	
	var trans_date	= GridObj2.GetCellValue("TRANS_DATE", nRow);
	var src_loc		= GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc		= GridObj2.GetCellValue("TGT_LOC", nRow);
	var brand_no	= GridObj2.GetCellValue("BRAND_NO", nRow);
	

	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	//GridObj3.SetParam("mode", "search3");

	var tableLen = GridObj.GetRowCount();

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj3.SetParam("mode", "makeBrandNo");	
	
    GridObj3.SetParam("act_gubn", act_gubn);
    GridObj3.SetParam("chng_resn", chng_resn);
    GridObj3.SetParam("plt_unit", plt_unit);
	GridObj3.SetParam("trans_date",trans_date);
	GridObj3.SetParam("src_loc",src_loc);
	GridObj3.SetParam("tgt_loc",tgt_loc);
	GridObj3.SetParam("brand_no",brand_no);
	GridObj3.SetParam("user_id", document.frm._user_id.value);

	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj3.DoQuery(servlet_url);
	
}



// 撚 盪濰 瞪羲滲熱
var objTdG;

// setTimeout 縑憮 ��轎ж罹 衛除 雖翱 �� setEditMode() 褒ч
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}


// popup 褻�� 檜嘐雖 mouseOver
// popup 擊 嗥辦晦 嬪п 薯ヶ 囀萄 艙羲擊 慇橫陪 唳辦 viewMode 滲�� 寞雖蒂 嬪и flag 撲薑
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup 褻�� 檜嘐雖 mouseOut
// popup 擊 嗥辦晦 嬪п 薯ヶ 囀萄 艙羲擊 慇橫陪 唳辦 viewMode 滲�� 寞雖蒂 嬪и flag 撲薑
function outImg( objImg ) {
	
	popImgIdx = null;
	
}

// 陳瞼 匐儀 POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// 陳瞼 匐儀 POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
}

// 璋濠 input box 縑 僥濠 check 
// parameter : obj - inbox object , type - default value 傳朝 模熱薄 check 嶸嗽 蛔曖 type 薑曖 
// type - BLANK : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 奢寥戲煎 奩��, 模熱薄 ъ辨
//        ZERO : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 0 戲煎 奩��, 模熱薄 ъ辨 
//        BLANK_INT : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 奢寥戲煎 奩��, 模熱薄擎 error 籀葬( only integer ) 
//        ZERO_INT : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 0 戲煎 奩��, 模熱薄擎 error 籀葬( only integer ) 
//        BLANK_INT_UP : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 奢寥戲煎 奩��, 擠熱 & 模熱薄擎 error 籀葬( only plus integer ) 
//        ZERO_INT_UP : 餌辨濠陛 澀跤脹 高擊 殮溘ц擊 陽 default value 蒂 0 戲煎 奩��, 擠熱 & 模熱薄擎 error 籀葬( only plus integer ) 
//        ** type parameter 陛 橈戲賊 ZERO(default=0, 模璋薄 ъ辨) 諦 偽擠 
function checkNum(obj, type) {

	var i, ch;
	var pointCheck = 0;
	var defaultVal = "0"; 
	var alertMsg = "璋濠虜 殮溘ж罹 輿撮蹂.";
	var checkType = "POINT"; 
	
	// default value 朝 奢寥 
	if( type == "BLANK" || type == "BLANK_INT" || type == "BLANK_INT_UP" ) 
		defaultVal = ""; 
	
	// 模熱薄 ъ辨ж雖 彊擠 
	if( type == "BLANK_INT" || type == "ZERO_INT" || type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
	{ 
		if( type == "BLANK_INT_UP" || type == "ZERO_INT_UP" ) 
			alertMsg = "濠翱熱虜 殮溘ж罹 輿撮蹂."; 
		else 
			alertMsg = "薑熱虜 殮溘ж罹 輿撮蹂."; 
		checkType = "INT"; 
		pointCheck = 1; 
	} 
	
	var checkValue = delComma(obj.value).trim();

	if( defaultVal == "0" && ( checkValue == null || checkValue == "" ) )
	{
		//objSetting(obj, defaultVal, alertMsg);
		return false;
	}
	
	for (i=0; i < checkValue.length; i++) {
		
		ch = checkValue.charAt(i);
		
		// invalid value 
		if(ch==" ")
		{ 
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
		
		// valid value
		else if ( ( ch >= 0 && ch <= 9 ) ) 
		{ }
		
		// point check 
		else if ( ch == '.' ) 
		{
			pointCheck += 1;
			// invalid value 
			if ( pointCheck > 1 )
			{
				//objSetting(obj, defaultVal, alertMsg); 
				return false;
			} 
		} 
		
		// valid value : minus sign 
		else if ( i == 0 && ch == '-' && type != "BLANK_INT_UP" && type != "ZERO_INT_UP" ) 
		{ } 
		
		// invalid value 
		else 
		{
			//objSetting(obj, defaultVal, alertMsg); 
			return false;
		}
	}
	
	obj.value = checkValue; 
	return true;
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ч 蹺陛/餉薯 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function rowInsDel(obj){
	var str = obj.value;
	var nRow = GridObj3.GetActiveRowIndex();
	
	if( str == "蹺陛" ){		// ROW 蹺陛
		if( nRow == "" || nRow == null) nRow = 0;
		insertRow( nRow );	
		// 轎堅濰 掘碟 寡唳儀 棻衛 雖薑
		//setSrcLocBgColor();		
		// 援瞳 啗骯 棻衛 л.
		//calAllCum();
		// 廓�� set
		//setNo();
	}
	else if( str == "餉薯" ){	// ROW 餉薯
		
//		if( nRow != 0 && (nRow == "" || nRow == null) ) {
//			alert("餉薯й ч擊 摹鷗п 輿褊衛螃.");
//			return;
//		}
		if(confirm("餉薯 ж衛啊蝗棲梱?") == true){
			for( i = 0 ; i < GridObj3.GetRowCount() ; i++ ){
				if( GridObj3.GetCellValue("SELECTED", i) == "1" ){
						GridObj3.DeleteRow(nRow);
						GridObj3.SetRowHide(i, true); 
						//GridObj.DeleteRow(nRow, false); 		
					
				}
			}
			// 轎堅濰 掘碟 寡唳儀 棻衛 雖薑
			//setSrcLocBgColor();	
			// 援瞳 啗骯 棻衛 л.
			//calAllCum();
			// 廓�� set
			//setNo()
		}
	}
	
	saved = false;
};


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Insert Row Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function insertRow( nRow ){
	
	var rowCnt = GridObj3.GetRowCount();
	
	
	//alert("rowCnt : " + rowCnt + " , nRow : " + nRow);//1,0
	if( (rowCnt > 1) && (rowCnt-1 == nRow) ){ // 葆濠虞 塭檣橾 唳辦 
		GridObj3.InsertRow(-1);
	}else if(rowCnt <= 1){// 
		GridObj3.InsertRow(-1);//
		nRow = -1;
	}
	else{
		GridObj3.InsertRow(nRow+1);
	}
	
	// 晦獄 等檜攪 撢た
	if(nRow == -1){
		//GridObj3.SetCellValue("NO", 0, "");
		GridObj3.SetCellValue("ITEM_ID", 0, "");
		GridObj3.SetCellValue("ITEM_NAME", 0, "");
		//GridObj3.SetCellValue("STOCK_QTY", 0, "");
		GridObj3.SetCellValue("BOX_QTY", 0, "");
		GridObj3.SetCellValue("PLT_QTY", 0, "");	
		GridObj3.SetCellValue("BOX_PER_PALET", 0, "");	
	}else{
		//GridObj3.SetCellValue("NO", nRow+1, GridObj3.GetCellValue("ITEM_ID", nRow));
		GridObj3.SetCellValue("ITEM_ID", nRow+1, GridObj3.GetCellValue("ITEM_ID", nRow));
		GridObj3.SetCellValue("ITEM_NAME", nRow+1, GridObj3.GetCellValue("ITEM_NAME", nRow));
		//GridObj3.SetCellValue("STOCK_QTY", nRow+1, GridObj3.GetCellHiddenValue("STOCK_QTY", nRow));
		GridObj3.SetCellValue("BOX_QTY", nRow+1, GridObj3.GetCellValue("BOX_QTY", nRow));
		GridObj3.SetCellValue("PLT_QTY", nRow+1, GridObj3.GetCellValue("PLT_QTY", nRow));
		GridObj3.SetCellValue("BOX_PER_PALET", nRow+1, GridObj3.GetCellValue("BOX_PER_PALET", nRow));
	}
	
	var	cnt = nRow+1;
	if( nRow == -1 ) nRow = 0;

	
	

};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Duble Click Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClickHandler(strColumnKey, nRow){
	// 薯ヶ 囀萄 鏽歲檜賊 薯ヶ 匐儀 で機 褒ч
	
	if( strColumnKey == "ITEM_ID" ){
		openItemSearchPop( strColumnKey, nRow );
	}
	
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛薯ヶ 匐儀 POPUP  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function openItemSearchPop( strColumnKey, nRow ) { 
	
	var rowIdx = nRow
//	var tgt_loc = document.frm.tgt_loc.value;
	var code_input = GridObj3.GetCellValue("ITEM_ID", nRow);
	var src_loc = GridObj2.GetCellValue("SRC_LOC", nRow);
	var tgt_loc = GridObj2.GetCellValue("TGT_LOC", nRow);
	
	
	var service_url = "service.do?_moon_service=item_search_popup_for_trans_order_chng&code_input=" + code_input + "&rowIdx=" + rowIdx;
	service_url += "&_moon_perpage=200&_moon_pagenumber=1" + "&tgt_loc=" + tgt_loc + "&src_loc=" + src_loc;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Code_Search", pop_win_style);
	newWin.focus();
	
}

//--------------------------------------   main_template 縑 薑曖脹 Event ---------------------------------------------------//
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function Grid2ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	var del_plt = GridObj2.GetCellValue("PLT_QTY", nRow);

	if(strColumnKey == "DEL_PLT"){
		if(nNewValue > 0){
			GridObj2.SetCellValue("SELECTED", nRow, "1");
		}else{
			GridObj2.SetCellValue("SELECTED", nRow, "0");
		}
	}

	if(strColumnKey == "SELECTED"){
		if(nNewValue == "1"){
			GridObj2.SetCellValue("DEL_PLT", nRow, del_plt)			
		}else{
			GridObj2.SetCellValue("DEL_PLT", nRow, "0")			
		}
	}
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid Cell Change Event
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	
	// 晦獄營堅鼻離, 蹺陛營堅鼻離, 儅骯鼻離 PLT 塽 BOX 熱榆 滲唳衛
	// м啗 塽 援瞳 啗骯 塽 PLT, BOX 熱榆 滲唳
	if(strColumnKey.lastIndexOf("PLT_QTY") >= 0 || strColumnKey.lastIndexOf("BOX") >= 0){
		var col_name = "";
		if( strColumnKey.lastIndexOf("PLT_QTY") >= 0 ) {
			calBoxQty( strColumnKey, nRow );					 // BOX 熱榆 熱薑
			if(nNewValue == "0"){
				GridObj3.SetCellValue("SELECTED", nRow, "0");
			}else{
				GridObj3.SetCellValue("SELECTED", nRow, "1");
			}
		} // м啗 塽 援瞳м啗 啗骯 PLT
		else {
			calPltQty( strColumnKey, nRow );					 // BOX 熱榆 熱薑
			if(nNewValue == "0"){
				GridObj3.SetCellValue("SELECTED", nRow, "0");
			}else{
				GridObj3.SetCellValue("SELECTED", nRow, "1");
			}
		}
	}

	if(strColumnKey == "SELECTED"){
		if(nNewValue == "1"){
			GridObj3.SetCellValue("PLT_QTY", nRow, "1")			
			calBoxQty( strColumnKey, nRow );					 // BOX 熱榆 熱薑
		}else{
			GridObj3.SetCellValue("PLT_QTY", nRow, "0")			
			calBoxQty( strColumnKey, nRow );					 // BOX 熱榆 熱薑
		}		
	}



	
	
	// 薯ヶ 囀萄 滲唳衛 
	if( strColumnKey == "ITEM_ID" ){
		// box_per_palet 蹺轎
		getBoxPerPalet( nRow );
		// 薯ヶ 貲 set
		getItemInfo( nRow, nNewValue );
	}
	
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛Box 熱榆 啗骯  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function calBoxQty( strColumnKey, nRow ) {

	var boxPerPalet = GridObj3.GetCellValue("BOX_PER_PALET", nRow);
	var col_name = strColumnKey.replace("PLT_QTY","");

	
	// PALET 渡 BOX 熱榆檜 橈朝 唳辦 100 戲煎 啗骯
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var pltQty = Number(GridObj3.GetCellValue(strColumnKey, nRow));
	var boxQty = Math.round(pltQty * boxPerPalet*100)/100;
	boxQty = Math.round(boxQty);
	GridObj3.SetCellValue("BOX_QTY", nRow, boxQty);
	
	// 援瞳 鼻離 餵啗 塽 м啗 啗骯
	//changeBOX(col_name+"BOX", nRow, nOldValue, boxQty);
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛PLT 熱榆 啗骯  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function calPltQty( strColumnKey, nRow ) {

	var boxPerPalet = GridObj3.GetCellValue("BOX_PER_PALET", nRow);
	var col_name = strColumnKey.replace("BOX_QTY","");
	
	// PALET 渡 BOX 熱榆檜 橈朝 唳辦 100 戲煎 啗骯
	if( boxPerPalet == null || boxPerPalet == "" || boxPerPalet == 0) {
		boxPerPalet = 100;
	}
		
	var boxQty = Number(GridObj3.GetCellValue(strColumnKey, nRow));
	var pltQty = Math.round(boxQty*100 / boxPerPalet)/100;

	GridObj3.SetCellValue("PLT_QTY", nRow, pltQty);
	
	// 援瞳 鼻離 餵啗 塽 м啗 啗骯
	//changePLT(col_name+"PLT", nRow, nOldValue, pltQty);
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛box_per_palet 蹺轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function getBoxPerPalet( nRow ) {
	
	// 轎堅濰, 薯ヶ囀萄 蹺轎
	var dc_id = GridObj2.GetCellHiddenValue("SRC_LOC", nRow);
	var item_id = GridObj3.GetCellValue("ITEM_ID", nRow);
	
	
	// 轎堅濰 傳朝 薯ヶ囀萄 等檜攪陛 橈朝 唳辦 л熱蒂 緒螳釭除棻
	if( dc_id == null || dc_id == "" || item_id == null || item_id == "" ) {
		return;
	}
	
	replenishPlan.getBoxPerPalet(dc_id, item_id, "rp_01010_dailyTransportPlanSalesInfo_search_box_per_palet", { 
		callback:function(boxPerPalet){
			if( boxPerPalet == null || boxPerPalet == "" ) {
				GridObj3.SetCellValue("BOX_PER_PALET", nRow, 100);
			}
			else {
				GridObj3.SetCellValue("BOX_PER_PALET", nRow, boxPerPalet);
			}
		}
	});	
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛餌辨濠 霜蕾 殮溘高戲煎睡攪 薯ヶ薑爾 褻��
  弛薯ヶ 囀萄, 薯ヶ 貲 萃 醞 ж釭塭紫 橾纂ж朝 等檜攪 匐儀 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function getItemInfo( nRow, nNewValue ) {


	var dc_id = GridObj2.GetCellValue("SRC_LOC", nRow);
	var ItemId = nNewValue;
	
	
	// 轎堅濰 傳朝 薯ヶ囀萄 等檜攪陛 橈朝 唳辦 л熱蒂 緒螳釭除棻
	if( dc_id == "" || dc_id == null ) {
		alert("轎堅濰擊 試盪 摹鷗ж撮蹂.");
		return;
	}
	
	// 薯ヶ囀萄 等檜攪陛 橈朝 唳辦 л熱蒂 緒螳釭除棻
	if( ItemId == null || ItemId == "" ) {
		openItemSearchPop("ITEM_ID", nRow);
		return;
	}
	//alert(ItemId);
	
	replenishPlan.getItemInfo(dc_id, ItemId, "rp_01010_dailyTransportPlanSalesInfo_search_item_id", { 
		callback:function(arrList){
			// 橾纂ж朝 唸婁 橈擠
			if( arrList.length == 0 ) {
				openItemSearchPop("ITEM_ID", nRow);
			}
			// 橾纂ж朝 唸婁 1偃
			else if( arrList.length == 1 ) {
				GridObj3.SetCellValue("ITEM_ID", nRow, arrList[0][0]);
				GridObj3.SetCellValue("ITEM_NAME", nRow, arrList[0][1]);
				GridObj3.SetCellValue("BOX_PER_PALET", nRow, arrList[0][2]);

			}
			else {
				openItemSearchPop("ITEM_ID", nRow);
			}
		}
	});
	
}
