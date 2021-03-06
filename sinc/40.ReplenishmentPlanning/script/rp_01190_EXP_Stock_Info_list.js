//############################################################
//## Щ煎斜極ID      : rp_01190_EXP_Stock_Info_list.js
//## Щ煎斜極貲      : 熱轎轎堅濰 營堅碟戮
//## 偃嫦濠          : 陴錠辨
//## 偃嫦橾濠        : 2016-08-09
//##
//## 婦溼 job file   : job_sinc_40_replenishmentPlanning_03.xml
//## 婦溼 query file : query_sinc_40_replenishmentPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2016-08-09  陴錠辨          create
//##
//############################################################



/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'rp_01190_EXP_Stock_Info_list';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2;

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

	setProperty(GridObj2); 	// 晦獄 property 撲薑
	setDefault2();  			// 蹺陛 property 撲薑
//	setHeader2();   			// Header 撲薑
			
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
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2; 	
}

function setDefault2(){
	
	GridObj2.bUserContextMenu = true;				//餌辨濠 鐘臢蝶お 詭景曖 餌辨 罹睡蒂 唸薑и棻. 
	GridObj2.bHDMoving = true;                  	//餌辨濠陛 ④渦蒂 萄楚斜п憮 鏽歲嬪纂蒂 檜翕й熱 橈棻.
	GridObj2.bHDSwapping = false;                	//④渦曖 鏽歲嬪纂檜翕 巍爾幗が擊 綠�側瘓� и棻.
	GridObj2.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj2.bRowSelectorIndex = false;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻. 
	GridObj2.strRowBorderStyle = "none";         	//煎辦曖 纔舒葬縑 嬴鼠匙紫 釭顫釭雖 彊朝棻.
	GridObj2.nRowSpacing = 0;                    	//RowSpacing高擊 薑и棻. 
	GridObj2.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	GridObj2.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
    GridObj2.bStatusbarVisible = true;				// status bar visible
	// Header Font Setting
	GridObj2.strHDFontName = '蜈擎 堅蛐';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 
	
	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
	
	//Hearder 堪檜
	GridObj2.nHDLineSize   = 12;   //12
	
	// Grid ч 堪檜
    GridObj2.nRowHeight    = 12;    //22
    
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj2.strSelectedCellFgColor = '180|82|205'; 
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines = 2; 
 	GridObj2.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'       
 
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	GridObj.AddHeader("ITEM_ID"		,"薯ヶ囀萄"   	,"t_text" 		,100	,70 ,false); //0
	GridObj.AddHeader("ITEM_NAME"	,"薯ヶ貲"    		,"t_text" 		,100    ,300 ,false);
 	GridObj.AddHeader("STOCK_7700"		,"晦蟾營堅"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("IPGO_7700"		,"殮堅蕨薑榆"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("EXPT_STOC_7700"	,"蕨鼻營堅"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("CHGO_7700"		,"濛機蕨薑榆"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("GAP_7700"			,"離檜榆"   		,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("STOCK_1842"		,"晦蟾營堅"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("IPGO_1842"		,"殮堅蕨薑榆"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("EXPT_STOC_1842"	,"蕨鼻營堅"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("CHGO_1842"		,"濛機蕨薑榆"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("GAP_1842"			,"離檜榆"   		,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("STOCK_8938"		,"晦蟾營堅"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("IPGO_8938"		,"殮堅蕨薑榆"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("EXPT_STOC_8938"	,"蕨鼻營堅"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("CHGO_8938"		,"濛機蕨薑榆"   	,"t_number" 	,100	,70 ,false); //0   
 	GridObj.AddHeader("GAP_8938"			,"離檜榆"   		,"t_number" 	,100	,70 ,false); //0   


	GridObj.AddGroup("PUSAN", "睡骯薯ヶ婦葬雖薄");			 
	GridObj.AppendHeader("PUSAN", "STOCK_7700");
	GridObj.AppendHeader("PUSAN", "IPGO_7700");
	GridObj.AppendHeader("PUSAN", "EXPT_STOC_7700");
	GridObj.AppendHeader("PUSAN", "CHGO_7700");
	GridObj.AppendHeader("PUSAN", "GAP_7700");
	GridObj.AddGroup("DONGWOO", "翕辦");			 
	GridObj.AppendHeader("DONGWOO", "STOCK_1842");
	GridObj.AppendHeader("DONGWOO", "IPGO_1842");
	GridObj.AppendHeader("DONGWOO", "EXPT_STOC_1842");
	GridObj.AppendHeader("DONGWOO", "CHGO_1842");
	GridObj.AppendHeader("DONGWOO", "GAP_1842");
	GridObj.AddGroup("DSJ", "DSJ");			 
	GridObj.AppendHeader("DSJ", "STOCK_8938");
	GridObj.AppendHeader("DSJ", "IPGO_8938");
	GridObj.AppendHeader("DSJ", "EXPT_STOC_8938");
	GridObj.AppendHeader("DSJ", "CHGO_8938");
	GridObj.AppendHeader("DSJ", "GAP_8938");

	GridObj.BoundHeader();	
	
    GridObj.SetColCellAlign('ITEM_ID','center'); 
    GridObj.SetColCellAlign('STOCK_7700','right'); 
    GridObj.SetColCellAlign('IPGO_7700','right'); 
    GridObj.SetColCellAlign('EXPT_STOC_7700','right'); 
    GridObj.SetColCellAlign('CHGO_7700','right'); 
    GridObj.SetColCellAlign('GAP_7700','right'); 
    GridObj.SetColCellAlign('STOCK_1842','right'); 
    GridObj.SetColCellAlign('IPGO_1842','right'); 
    GridObj.SetColCellAlign('EXPT_STOC_1842','right'); 
    GridObj.SetColCellAlign('CHGO_1842','right'); 
    GridObj.SetColCellAlign('GAP_1842','right'); 
    GridObj.SetColCellAlign('STOCK_8938','right'); 
    GridObj.SetColCellAlign('IPGO_8938','right'); 
    GridObj.SetColCellAlign('EXPT_STOC_8938','right'); 
    GridObj.SetColCellAlign('CHGO_8938','right'); 
    GridObj.SetColCellAlign('GAP_8938','right'); 
     
    GridObj.SetNumberFormat('STOCK_7700','#,##0');
    GridObj.SetNumberFormat('IPGO_7700','#,##0');
    GridObj.SetNumberFormat('EXPT_STOC_7700','#,##0');
    GridObj.SetNumberFormat('CHGO_7700','#,##0');
    GridObj.SetNumberFormat('GAP_7700','#,##0');
    GridObj.SetNumberFormat('STOCK_1842','#,##0');
    GridObj.SetNumberFormat('IPGO_1842','#,##0');
    GridObj.SetNumberFormat('EXPT_STOC_1842','#,##0');
    GridObj.SetNumberFormat('CHGO_1842','#,##0');
    GridObj.SetNumberFormat('GAP_1842','#,##0');
    GridObj.SetNumberFormat('STOCK_8938','#,##0');
    GridObj.SetNumberFormat('IPGO_8938','#,##0');
    GridObj.SetNumberFormat('EXPT_STOC_8938','#,##0');
    GridObj.SetNumberFormat('CHGO_8938','#,##0');
    GridObj.SetNumberFormat('GAP_8938','#,##0');

	GridObj.SetColHDBgColor('GAP_7700',					'253|228|229');
	GridObj.SetColHDBgColor('GAP_1842',					'253|228|229');
	GridObj.SetColHDBgColor('GAP_8938',					'253|228|229');

}

function setHeader2(item_id) 
{        
	
	GridObj2.AddHeader("DC_NAME"		,"CDC"		       	,"t_text" 		,100	,40  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA"		,"營堅(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_BOX"	,"營堅(BOX)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("USE_CAPA_PAL"	,"營堅(PAL)"       	,"t_number" 	,500	,60  ,false); //0   
 	GridObj2.AddHeader("BASE_STOCK"		,"渡橾\n營堅"      		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("CHGO_QTY"		,"轎堅榆"	       		,"t_number" 	,100	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_1"		,"褻除"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("PROD01_3"		,"輿除"       		,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("CONF_STOCK"		,"轎堅\n陛棟"       	,"t_number" 	,500.3	,50  ,false); //0   
 	GridObj2.AddHeader("TRANS_QTY"		,"轎堅�挨�"       	,"t_number" 	,500.3	,55   ,true); //0   
 	GridObj2.AddHeader("NEXT_CHGO_QTY"	,"櫛橾\n轎堅"       	,"t_number" 	,500	,50  ,false); //0   
 	GridObj2.AddHeader("NEXT_TRANS_QTY"	,"櫛橾\n啗��"       	,"t_number" 	,500.3	,50  ,false); //0   
	
	var trans_start   = document.frm.cnfm_date.value;
	var today 		= document.frm.cnfm_date.value;
	//var item_id 	  = document.frm.item_id.value;
	var itype		  = 'FERT' //document.frm.itype.value;
	var header_length = 0, j;
	
	commonUtil.getSelQeury( "trans_start!%!item_id!%!itype", today+"!%!"+item_id+"!%!"+itype, "rp_01160_replenishmentNiceLikePlan_DW2_HEADER",{
		callback:function(result){

			for(var i=0 ; i < 20 ; i++){
				if(i < result.length) {
					GridObj2.AddHeader("PROD"+result[i][1]	,result[i][0]       	,"t_number" 	,500.3	,result[i][2]  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 9) {
						GridObj2.AddHeader("PROD0"+j	,"-"     	,"t_number" 	,500.3	,0  ,false);
					}
					else {
						GridObj2.AddHeader("PROD"+j		,"-"       	,"t_number" 	,500.3	,0  ,false);
					}
				}
			}
		 	
		 	GridObj2.AddHeader("PROD_AVAILABLE"	,"儅骯陛棟"       	,"t_text" 	,500	,30  ,false); //0   
		
			GridObj2.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
			GridObj2.SetColHide("PROD_AVAILABLE", true);
			
			GridObj2.SetNumberFormat("BASE_STOCK", 		 "###,###,###"); // 璋濠 ⑽衝
			GridObj2.SetNumberFormat("CHGO_QTY", 		 "###,###,###"); // 璋濠 ⑽衝
			GridObj2.SetNumberFormat("PROD01_1", 		 "###,###,###"); // 璋濠 ⑽衝
			GridObj2.SetNumberFormat("PROD01_3", 		 "###,###,###"); // 璋濠 ⑽衝
			GridObj2.SetNumberFormat("CONF_STOCK", 		 "###,###,###");
			GridObj2.SetNumberFormat("TRANS_QTY", 		 "###,###,###");
			GridObj2.SetNumberFormat("NEXT_CHGO_QTY", 	 "###,###,###");
			GridObj2.SetNumberFormat("NEXT_TRANS_QTY", "###,###,###.#");
			GridObj2.SetNumberFormat("USE_CAPA", 	 	 "###,###,###");
			GridObj2.SetNumberFormat("USE_CAPA_BOX", 	 "###,###,###");
			GridObj2.SetNumberFormat("USE_CAPA_PAL", 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD01", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD02", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD03", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD04", 			 "###,###,###");
			GridObj2.SetNumberFormat("PROD05", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD06", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD07", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD08", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD09", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD10", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD11", 			 "###,###,###");
			GridObj2.SetNumberFormat("PROD12", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD13", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD14", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD15", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD16", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD17", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD18", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD19", 		 	 "###,###,###");
			GridObj2.SetNumberFormat("PROD20", 		 	 "###,###,###");
			
			GridObj2.SetColCellAlign('DC_NAME','left');
			GridObj2.SetColCellFontName('DC_NAME','蜈擎 堅蛐');
			GridObj2.SetColCellFontBold('DC_NAME','true');
			
			GridObj2.SetColHDBgColor('TRANS_QTY','253|228|229');

//			if(document.frm.itype.value == "HAWA") {
//				GridObj2.SetColHide("PROD01_1", true);
//				GridObj2.SetColHide("PROD01_3", true);
//			}
			
			GridObj2.SetColHide("USE_CAPA", true);
			GridObj2.SetColHide("USE_CAPA_BOX", true);
			GridObj2.SetColHide("USE_CAPA_PAL", true);
			// CAPA蹺陛煎 и偃鏽歲 陛萼棻.
			//GridObj2.SetColHide("PROD12", true);
			
			doQuery2(item_id);			
		}
	});   
}


   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
	   	GridObj2.ClearGrid( ); 
    	doQuery();
   }
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var cnfm_date   = document.all.cnfm_date.value;
       var sel_gubn   = document.all.sel_gubn.value;

       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("cnfm_date", cnfm_date);
       GridObj.SetParam("sel_gubn", sel_gubn);
       GridObj.DoQuery(servlet_url);
   }


function doQuery2(item_id) {
		
	var servlet_url = Project_name+"/servlet/" + class_path + 'ip_02060_SalesAllocationNiceLikePlan';
	
	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj2.SetParam("mode", "search_DW3");
	
	//-- 憮幗縑 瞪歎й だ塭詭攪 撲薑 --//
	//奢濰 囀萄

	//var item_id = document.frm.item_id.value;
	var today = document.frm.cnfm_date.value;
	var version =  document.frm.cnfm_date.value.replace("-","").replace("-","");
	var seq = "";
	var itype = 'FERT'; //document.frm.itype.value;
	//rp_01160 蘭葬蒂 餌辨ж雖虜 �飛橦□� 嫡嬴螃朝 幗瞪 等檜攪朝 'YYYYMMDD' ⑽鷓檜棻. 'YYYYMMDD.HH.MM' 擊 嫡嬴螞棻.
	commonUtil.getSelQeury( "version", document.frm.cnfm_date.value, "rp_01160_replenishmentNiceLikePlan_DW2_Trans_Version",{
		callback:function(result){

		version = result;
		 			
		}});
	
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("trans_start", today);
	GridObj2.SetParam("version",version);
	GridObj2.SetParam("seq", seq);
	GridObj2.SetParam("itype", itype);
	GridObj2.SetParam("check_day", "TODAY"); // 渡橾啗��
	
	// user_id
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	// query_id
	GridObj2.SetParam("query_id", "rp_01160_replenishmentNiceLikePlan_DW2");
				
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj2.DoQuery(servlet_url);
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
            	var rowLeng = GridObj.GetRowCount();
            	
            	for( var row=0 ; row<rowLeng ; row++ ){ //row熱虜躑 奩犒
	        		if(strToNum(GridObj.GetCellValue("GAP_7700", row)) < 0) {GridObj.SetCellFontBold("GAP_7700", row, 'true'); GridObj.SetCellFgColor("GAP_7700", row, '255|0|0');}
	        		if(strToNum(GridObj.GetCellValue("GAP_1842", row)) < 0) {GridObj.SetCellFontBold("GAP_1842", row, 'true'); GridObj.SetCellFgColor("GAP_1842", row, '255|0|0');}
	        		if(strToNum(GridObj.GetCellValue("GAP_8938", row)) < 0) {GridObj.SetCellFontBold("GAP_8938", row, 'true'); GridObj.SetCellFgColor("GAP_8938", row, '255|0|0');}
            	}
            	
            	GridObj.SetColCellBgColor('GAP_7700','232|232|255');
            	GridObj.SetColCellBgColor('GAP_1842','232|232|255');
            	GridObj.SetColCellBgColor('GAP_8938','232|232|255');

            	GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'STOCK_7700,IPGO_7700,EXPT_STOC_7700,CHGO_7700,GAP_7700,STOCK_1842,IPGO_1842,EXPT_STOC_1842,CHGO_1842,GAP_1842,STOCK_8938,IPGO_8938,EXPT_STOC_8938,CHGO_8938,GAP_8938'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '212|212|212'); 
            	
            
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
		
    }

function GridEndQuery2() {
		
	setGrid2(); //WiseGrid 撲薑
			
	var end_mode = GridObj2.GetParam("mode");

	if(end_mode == "search_DW2") { //褻��
		if(GridObj2.GetStatus() == "true") { // 
			
		}
	}

}


   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }


function CellDblClick_DW1 (strColumnKey, nRow){

	if(GridObj.GetRowCount() < 1) return;
	
	var item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	
	GridObj2.ClearGrid( ); 
    setHeader2(item_id);  

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
    
    
    

