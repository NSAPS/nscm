//############################################################
//## Щ煎斜極ID      : sc_01120_plantAllocationPlanResult_export.vm
//## Щ煎斜極貲      : 離輿 熱轎っ衙啗�� 蛔煙
//## 偃嫦濠          : 陴錠辨
//## 偃嫦橾濠        : 2009-10-15
//##
//## 婦溼 job file   : job_sinc_20_scheduling_04.xml
//## 婦溼 query file : query_sinc_20_scheduling_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-10-15  陴錠辨      create
//##
//############################################################

var job_id  = 'sc_01120_plantAllocationPlanResult_export'; //詭景 譆堅 贗葛衛 JOB_ID
var class_path = "com.wisegrid.admin.";
//斜葬萄 偌羹 瞪羲滲熱 摹樹! 賅萇夠縑憮 GridObj 偌羹蒂 餌辨 л.
var GridObj;

	    
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅л. 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() {
	
	GridObj	 = document.WiseGrid;

	setProperty(GridObj);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader(GridObj);  //п渦儅撩
	setDefault();        
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() {

	//④渦鏽歲薹 塭檣..餌檜鍔 塽 アお餌檜鍔 褻瞰.
	GridObj.nHDLines = 2; //④渦 睡碟 旋 轎溘擊 2還梱雖 餌辨л.
	GridObj.nHDLineSize = 16; //④渦 鏽歲曖 堪檜 餌檜鍔.
//	GridObj.nHDFontSize = 8; //④渦 鏽歲曖 アお 餌檜鍔.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strActiveRowBgColor = "255|255|0";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
 	GridObj.strSelectedCellFgColor = '0|0|0'; 

	//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 �側瘓�. 欽, 斜瑜煽м賅萄縑憮朝 餌辨ж賊 寰脾.
	GridObj.strHDClickAction    = "select";
	GridObj.strHDFontName = '蜈擎 堅蛐';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
	//GridObj.bCellFontBold = true;
	//Hearder 堪檜
	GridObj.nHDLineSize   = 9;   //12
	// Grid ч 堪檜
    GridObj.nRowHeight    = 9;    //22
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'       
	
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   
function setHeader(GridObj) {

	GridObj.AddHeader("CRUD"					,"CRUD"       			,"t_text" 	,100 ,30  ,false);
	GridObj.AddHeader("GUBN"					,"GUBN"       			,"t_text" 	,100 ,40  ,false);
	GridObj.AddHeader("DIVISION"				,"DIV"       		,"t_text" 	,100 ,50  ,false);
	GridObj.AddHeader("SALES_CAT03"				,"濠營\n斜瑜3"       		,"t_text" 	,100 ,70  ,false);
	GridObj.AddHeader("ITEM_ID"					,"薯ヶ囀萄"       		,"t_text" 	,100 ,60  ,false);
	GridObj.AddHeader("ITEM_NAME"				,"薯ヶ貲"       			,"t_text" 	,500 ,230 ,false);
	GridObj.AddHeader("SPEC"					,"SPEC"       			,"t_text" 	,500 ,90 ,false);

	GridObj.AddHeader("STOCK"				,"⑷營堅"       			,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("STOCK_8901"			,"睡骯CY"       			,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("MI_ORDER"			,"嘐轎螃渦"      		,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W0_ORDER"			,"艙機螃渦"      	,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W0_REQT_QTY"			,"儅骯曖煆"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("W0_PROD_PLAN"		,"儅骯啗��"       	,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("REMN_PROD_PLAN"		,"濤罹儅骯"       	,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W0_CLOS_STOCK"		,"晦蜓營堅"  		,"t_number" ,100.6 ,60 ,false);

//	GridObj.AddHeader("SP01",	" ",		"t_text",		1,		1, 		false); 

	GridObj.AddHeader("W1_ORDER"			,"艙機螃渦"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("W1_REQT_QTY"			,"儅骯曖煆"       	,"t_number" ,100.6 ,60  ,true);
	GridObj.AddHeader("W1_PROD_PLAN"		,"儅骯啗��"     	,"t_number" ,100.6 ,60,	false );
	GridObj.AddHeader("W1_CLOS_STOCK"		,"晦蜓營堅"       	,"t_number" ,100.6 ,60 ,false);

//	GridObj.AddHeader("SP02",	" ",		"t_text",		1,		1, 		false); 

	GridObj.AddHeader("W2_ORDER"			,"艙機螃渦"       ,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W2_REQT_QTY"			,"儅骯曖煆"       	,"t_number" ,100.6 ,60  ,true);
	GridObj.AddHeader("W2_PROD_PLAN"		,"儅骯啗��"     	,"t_number" ,100.6 ,60,	false );
	GridObj.AddHeader("W2_CLOS_STOCK"		,"晦蜓營堅"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("W3_ORDER"			,"艙機螃渦"       ,"t_number" ,100.6 ,60  ,false);
	GridObj.AddHeader("W3_CLOS_STOCK"		,"晦蜓營堅"       	,"t_number" ,100.6 ,60 ,false);
	GridObj.AddHeader("MINSS"				,"寰瞪營堅"      			,"t_number" ,100.6 ,60  ,true);
	GridObj.AddHeader("PROD_PLAN_YN"		,"儅骯啗�嗷挨�"      		,"t_text" ,100.6 ,10  ,false);


	GridObj.AddGroup("W0", "渡輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("W0", "MI_ORDER");
	GridObj.AppendHeader("W0", "W0_ORDER");
	GridObj.AppendHeader("W0", "W0_REQT_QTY");
	GridObj.AppendHeader("W0", "W0_PROD_PLAN");
	GridObj.AppendHeader("W0", "REMN_PROD_PLAN");
	GridObj.AppendHeader("W0", "W0_CLOS_STOCK");

	GridObj.AddGroup("W1", "離輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("W1", "W1_ORDER");
	GridObj.AppendHeader("W1", "W1_REQT_QTY");
	GridObj.AppendHeader("W1", "W1_PROD_PLAN");
	GridObj.AppendHeader("W1", "W1_CLOS_STOCK");

	GridObj.AddGroup("W2", "2輿離");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("W2", "W2_ORDER");
	GridObj.AppendHeader("W2", "W2_REQT_QTY");
	GridObj.AppendHeader("W2", "W2_PROD_PLAN");
	GridObj.AppendHeader("W2", "W2_CLOS_STOCK");

	GridObj.AddGroup("W3", "3輿離");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("W3", "W3_ORDER");
	GridObj.AppendHeader("W3", "W3_CLOS_STOCK");

	GridObj.BoundHeader();	
	
	//斜葬萄 牖憮 衙晦晦
//	GridObj.bRowSelectorVisible = true;
//	GridObj.bRowSelectorIndex = true;
	
	GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");
	
	//Hidden 鏽歲
	GridObj.SetColHide("CRUD",true);
	GridObj.SetColHide("GUBN",true);
	GridObj.SetColHide("DIVISION",true);
	GridObj.SetColHide("PROD_PLAN_YN",true);
	
	//か薑鏽歲 堅薑!!
	GridObj.SetColFix('SPEC'); 
	
    GridObj.SetColCellAlign('ITEM_ID','center');
    GridObj.SetColCellAlign('ITEM_NAME','left');
    GridObj.SetColCellAlign('SPEC','center');
    
    //numberん裝 撲薑!
    GridObj.SetNumberFormat('STOCK','###,##0');
    GridObj.SetNumberFormat('STOCK_8901','###,##0');
    GridObj.SetNumberFormat('W0_REQT_QTY','###,##0');
    GridObj.SetNumberFormat('W0_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('REMN_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('MI_ORDER','###,##0');
    GridObj.SetNumberFormat('W0_ORDER','###,##0');
    GridObj.SetNumberFormat('W0_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('W1_REQT_QTY','###,##0');
    GridObj.SetNumberFormat('W1_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('W1_ORDER','###,##0');
    GridObj.SetNumberFormat('W1_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('W2_ORDER','###,##0');
    GridObj.SetNumberFormat('W2_REQT_QTY','###,##0');
    GridObj.SetNumberFormat('W2_PROD_PLAN','###,##0');
    GridObj.SetNumberFormat('W2_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('W3_ORDER','###,##0');
    GridObj.SetNumberFormat('W3_CLOS_STOCK','###,##0');
    GridObj.SetNumberFormat('MINSS','###,##0');

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻�� 幗が 贗葛衛 褒ч.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
GoSearch = function() {

	doQuery();
};


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
GoSave = function() {
	
	doSave();
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() {

	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//塭蛤螃 幗が 掘碟 [頂熱, 熱轎MTS, 熱轎MTO]
	if(document.frm.checked_domain[0].checked == true) {
		checked_domain = "DO";       	
	}
	else if(document.frm.checked_domain[1].checked == true) {
		checked_domain = "EXMTS";
	}
	else if(document.frm.checked_domain[2].checked == true) {
		checked_domain = "EXMTO";
	}
	else {
		checked_domain = "EXHAWA";
	}
	
	var sdate = document.all.sdate.value;
	var plant_alloc_version;
	
	// 1離奢濰й渡 薑爾蒂 陛螳螞棻.
	commonUtil.getCodeInfo("sdate", sdate, "plant_alloc_version2", { 
		callback:function(arrList){
			// 橾纂ж朝 CODE 橈擠
			if( arrList.length == 1 ) {
	   			
	   			plant_alloc_version = arrList[0][0];
	
				if(confirm("奢濰й渡幗蟒 :"+ plant_alloc_version + " => "
							+ plant_alloc_version.substring(4,6)+"/"+plant_alloc_version.substring(6,8) + "橾縑 熱ч!"
							+"\n 褻�裔牮簸睍懂炱�?") == true) {
					//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
					GridObj.SetParam("mode", "search");
					GridObj.SetParam("plant_alloc_version", plant_alloc_version);
					GridObj.SetParam("sdate", sdate);
					GridObj.SetParam("checked_domain", checked_domain);
					GridObj.DoQuery(servlet_url);
				}
			}
			else {
				alert("1離奢濰й渡 幗蟒薑爾陛 橈蝗棲棻! 衛蝶蠱婦葬濠縑啪 僥曖ж撮蹂!");
			}
		}
	});

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛盪濰
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doSave() {
		
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	//塭蛤螃 幗が 掘碟 [頂熱, 熱轎MTS]
	if(document.frm.checked_domain[0].checked == true) {
		checked_domain = "DO";       	
	}
	else if(document.frm.checked_domain[1].checked == true) {
		checked_domain = "EXMTS";
	}
	else if(document.frm.checked_domain[2].checked == true) {
		checked_domain = "EXMTO";
	}
	else {
		checked_domain = "EXHAWA";
	}
  
   var sdate = document.all.sdate.value;
   var plant_alloc_version;

	// 1離奢濰й渡 薑爾蒂 陛螳螞棻.
	commonUtil.getCodeInfo("sdate", sdate, "plant_alloc_version2", { 
		callback:function(arrList){
			// 橾纂ж朝 CODE 橈擠
			if( arrList.length == 1 ) {
       			
       			plant_alloc_version = arrList[0][0];
				//user_id
				GridObj.SetParam("user_id", document.frm._user_id.value);
		
		        //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
		   		//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
		        GridObj.SetParam("mode", "save");

		        GridObj.SetParam("plant_alloc_version", plant_alloc_version);
		        GridObj.SetParam("sdate", sdate);
		        GridObj.SetParam("checked_domain", checked_domain);
				
				//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
				GridObj.DoQuery(servlet_url, "CRUD");

			}
			else {
				alert("1離奢濰й渡 幗蟒薑爾陛 橈蝗棲棻! 衛蝶蠱婦葬濠縑啪 僥曖ж撮蹂!");
			}
 		}
	});
	 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() 
{
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
      
    var arrA = '';
    var arrB = '';
    var arrC = '';
    
    if(mode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {
            //撚曖 薑溺擊 撲薑

			var colBGColor='232|245|213';
			var rowLeng = GridObj.GetRowCount();
			var w1_clos_stock = 0, w2_clos_stock = 0, w3_clos_stock = 0;
			
			for( var row=0 ; row<rowLeng ; row++ ){ //row熱虜躑 奩犒
        		if(strToNum(GridObj.GetCellValue("W1_REQT_QTY", row)) > 0) GridObj.SetCellFontBold("W1_REQT_QTY", row, 'true');
        		if(strToNum(GridObj.GetCellValue("W2_REQT_QTY", row)) > 0) GridObj.SetCellFontBold("W2_REQT_QTY", row, 'true');
        		if(strToNum(GridObj.GetCellValue("W1_PROD_PLAN", row)) > 0) GridObj.SetCellFontBold("W1_PROD_PLAN", row, 'true');
        		if(strToNum(GridObj.GetCellValue("W2_PROD_PLAN", row)) > 0) GridObj.SetCellFontBold("W2_PROD_PLAN", row, 'true');
        		
        		// 儅骯啗�嘛� 諫猿腎歷戲賊 離輿 晦蜓營堅 = 渡輿 晦蜓營堅 - 離輿 艙機螃渦 + 儅骯啗��
        		// 諫猿嬴棲賊 離輿 晦蜓營堅 = 渡輿 晦蜓營堅 - 離輿 艙機螃渦 + 儅骯曖煆
        		// 離離輿 晦蜓營堅 = 離輿 晦蜓營堅 - 離離輿 艙機螃渦
        		if(GridObj.GetCellValue("PROD_PLAN_YN", row) == "Y") {
        			w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W1_ORDER", row))
        							+ strToNum(GridObj.GetCellValue("W1_PROD_PLAN", row));
        			
        			GridObj.SetCellValue("W1_CLOS_STOCK",row,Math.round(w1_clos_stock));

	    			w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W2_ORDER", row))
	    							+ strToNum(GridObj.GetCellValue("W2_PROD_PLAN", row));
	    			
	    			GridObj.SetCellValue("W2_CLOS_STOCK",row,Math.round(w2_clos_stock));

        		}
        		else {
        			w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W1_ORDER", row))
        							+ strToNum(GridObj.GetCellValue("W1_REQT_QTY", row));
        			
        			GridObj.SetCellValue("W1_CLOS_STOCK",row,Math.round(w1_clos_stock));

	    			w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W2_ORDER", row))
	    							+ strToNum(GridObj.GetCellValue("W2_REQT_QTY", row));
	    			
	    			GridObj.SetCellValue("W2_CLOS_STOCK",row,Math.round(w2_clos_stock));
        		}
				
				/*僥薯睡碟*/
    			w3_clos_stock = strToNum(GridObj.GetCellValue("W2_CLOS_STOCK", row)) - strToNum(GridObj.GetCellValue("W3_ORDER", row));
    			
    			GridObj.SetCellValue("W3_CLOS_STOCK",row,Math.round(w3_clos_stock));
				
				
				
        		// ⑷營堅爾棻 渡輿 螃渦+嘐轎堅螃渦陛 號擎 唳辦 儀梃ル衛
        		if(strToNum(GridObj.GetCellValue("STOCK", row)) 
        			< (strToNum(GridObj.GetCellValue("MI_ORDER", row))+strToNum(GridObj.GetCellValue("W0_ORDER", row))) ){
        			GridObj.SetCellBgColor('STOCK', row, '255|173|143');
        		}
        		        		
        		// 渡輿 晦遽營堅爾棻 離輿 螃渦陛 號擎 唳辦 營堅 儀梃ル衛
        		if(strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", row)) < strToNum(GridObj.GetCellValue("W1_ORDER", row)) ){
        			GridObj.SetCellBgColor('W0_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		// 離輿 晦遽營堅爾棻 離離輿 螃渦陛 號擎 唳辦 儀梃ル衛
        		if(strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", row)) < strToNum(GridObj.GetCellValue("W2_ORDER", row)) ){
        			GridObj.SetCellBgColor('W1_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		// 離離輿 晦遽營堅陛 0爾棻 濛擎唳辦 儀梃ル衛
        		if(strToNum(GridObj.GetCellValue("W2_CLOS_STOCK", row)) < strToNum(GridObj.GetCellValue("W3_ORDER", row)) ){
        			GridObj.SetCellBgColor('W2_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		// 離離輿 晦遽營堅陛 0爾棻 濛擎唳辦 儀梃ル衛
        		if(strToNum(GridObj.GetCellValue("W3_CLOS_STOCK", row)) < 0 ){
        			GridObj.SetCellBgColor('W3_CLOS_STOCK', row, '255|173|143');
        		}
        		
        		
        	}  
        	
        	
        	GridObj.SetColCellBgColor('W1_REQT_QTY',colBGColor);//離輿儅骯曖煆榆
        	GridObj.SetColCellBgColor('W2_REQT_QTY',colBGColor);//2輿離儅骯曖煆榆
        	GridObj.SetColCellBgColor('STOCK','232|232|255');//營堅
        	GridObj.SetColCellBgColor('W0_CLOS_STOCK','232|232|255');//渡輿 晦蜓營堅
        	GridObj.SetColCellBgColor('W1_CLOS_STOCK','232|232|255');//離輿 晦蜓營堅
        	GridObj.SetColCellBgColor('W2_CLOS_STOCK','232|232|255');//離離輿 晦蜓營堅
        	GridObj.SetColCellBgColor('W3_CLOS_STOCK','232|232|255');//離離輿 晦蜓營堅
        	GridObj.SetColCellBgColor('MINSS','120|255|255');//寰瞪營堅
       
        	DW1_grouping();
        	  
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
	}else if(mode == "save"){
		if(GridObj.GetStatus() == "true") {

			alert("盪濰ж艘蝗棲棻!");
			DW1_grouping();

		} else {
			var error_msg = GridObj.GetMessage();
			alert(error_msg);			
		}
	}
}

function DW1_grouping() {
	GridObj.SetGroupMerge('GUBN,DIVISION,SALES_CAT03'); 
	
	GridObj.AddSummaryBar('SUMMARY4', '模啗', 'SALES_CAT03', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_REQT_QTY,W2_PROD_PLAN,W2_CLOS_STOCK,W3_ORDER,W3_CLOS_STOCK,MINSS'); 
	//GridObj.AddSummaryBar('SUMMARY3', '模啗', 'DIVISION', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_CLOS_STOCK,W3_ORDER,MINSS'); 
	//GridObj.AddSummaryBar('SUMMARY2', '模啗', 'GUBN', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_CLOS_STOCK,W3_ORDER,MINSS'); 
	GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'STOCK,STOCK_8901,W0_REQT_QTY,W0_PROD_PLAN,REMN_PROD_PLAN,MI_ORDER,W0_ORDER,W0_CLOS_STOCK,W1_REQT_QTY,W1_PROD_PLAN,W1_ORDER,W1_CLOS_STOCK,W2_ORDER,W2_REQT_QTY,W2_PROD_PLAN,W2_CLOS_STOCK,W3_ORDER,W3_CLOS_STOCK,MINSS'); 
	GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|181|106'); 
	//GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '190|125|255'); 
	//GridObj.SetSummaryBarColor('SUMMARY3', '0|0|0', '145|200|200'); 
	GridObj.SetSummaryBarColor('SUMMARY4', '0|0|0', '212|212|212'); 
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛EXCEL
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
/* EXCEL ???? */
function excelDown() {
   var GridObj = document.WiseGrid;
   //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
   GridObj.ExcelExport("", "", true, true);
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
    
    // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
    // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
    if( tabHeightValue < 1 ) 
        tabHeightValue = 1; 
    if( tableHeightValue < 1 ) 
        tableHeightValue = 1; 
    
    //tabPage1.style.height = tabHeightValue + "px"; 
    //tbMain.style.height = tableHeightValue + "px"; 
    document.WiseGrid.height = tableHeightValue + "px"; 
//        document.WiseGrid2.height = tableHeightValue + "px"; 
    
}  
           


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛MOUSE OVER 衛, ROW 儀鼻 滲��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridMouseOver(strType, strColumnKey, nRow){
	
		// ④渦朝 翕濛橈擠
		if( nRow == -1 )
			return;
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛MOUSE OUT 衛, ROW 儀鼻 犒掘
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridMouseOut(strType, strColumnKey, nRow){

		// ④渦朝 翕濛橈擠
		if( nRow == -1 )
			return;
}

 /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
   弛斜葬萄 鏽歲 Set 鏽楝 撲薑ж晦!!
   戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function gridColSet(obj){
 
}


 /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
   弛斜葬萄 鏽歲 熱薑衛 嫦儅ж朝 檜漸お!!
   戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeCell(strColumnKey, nRow){

	if(strColumnKey == "W1_REQT_QTY" || strColumnKey == "W2_REQT_QTY") {
		// 儅骯啗�嘛� 諫猿腎歷戲賊 離輿 晦蜓營堅 = 渡輿 晦蜓營堅 - 離輿 艙機螃渦 + 儅骯啗��
		if(GridObj.GetCellValue("PROD_PLAN_YN", nRow) == "Y") {
			var w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W1_ORDER", nRow))
							+ strToNum(GridObj.GetCellValue("W1_PROD_PLAN", nRow));
		
			GridObj.SetCellValue("W1_CLOS_STOCK",nRow,w1_clos_stock);
		
			var w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W2_ORDER", nRow))
								+ strToNum(GridObj.GetCellValue("W2_REQT_QTY", nRow));

			// 離離輿 晦蜓營堅 啗骯 = 離輿晦蜓營堅 - 離離輿 艙機螃渦
			GridObj.SetCellValue("W2_CLOS_STOCK",nRow,w2_clos_stock);

//			var w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W2_ORDER", nRow))
//								+ strToNum(GridObj.GetCellValue("W2_PROD_PLAN", nRow));
//			GridObj.SetCellValue("W2_CLOS_STOCK",nRow,w2_clos_stock);
		}
		else {
			var w1_clos_stock = strToNum(GridObj.GetCellValue("W0_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W1_ORDER", nRow))
							+ strToNum(GridObj.GetCellValue("W1_REQT_QTY", nRow));
		
			GridObj.SetCellValue("W1_CLOS_STOCK",nRow,w1_clos_stock);
		
			// 離離輿 晦蜓營堅 啗骯 = 離輿晦蜓營堅 - 離離輿 艙機螃渦
			var w2_clos_stock = strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W2_ORDER", nRow))
								+ strToNum(GridObj.GetCellValue("W2_REQT_QTY", nRow));
			GridObj.SetCellValue("W2_CLOS_STOCK",nRow,w2_clos_stock);
		}	
		
		// 離輿 晦遽營堅爾棻 離離輿 螃渦陛 號擎 唳辦 儀梃ル衛
		if(strToNum(GridObj.GetCellValue("W1_CLOS_STOCK", nRow)) < strToNum(GridObj.GetCellValue("W2_ORDER", nRow)) ){
			GridObj.SetCellBgColor('W1_CLOS_STOCK', nRow, '255|173|143');
		}
		
		// 離離輿 晦蜓營堅陛 0爾棻 濛戲賊 儀梃ル衛
		if(w2_clos_stock < 0){
			GridObj.SetCellBgColor('W2_CLOS_STOCK', nRow, '255|173|143');
		}
		
		// 離離離輿 晦蜓營堅 啗骯 = 離離輿晦蜓營堅 - 離離離輿 艙機螃渦
		var w3_clos_stock = strToNum(GridObj.GetCellValue("W2_CLOS_STOCK", nRow)) - strToNum(GridObj.GetCellValue("W3_ORDER", nRow));
		GridObj.SetCellValue("W3_CLOS_STOCK",nRow,w3_clos_stock);
		// 離離輿 晦蜓營堅陛 0爾棻 濛戲賊 儀梃ル衛
		if(w3_clos_stock < 0){
			GridObj.SetCellBgColor('W3_CLOS_STOCK', nRow, '255|173|143');
		}
		
		// 熱榆檜 0檜鼻檜賊 BOLD
		if(strToNum(GridObj.GetCellValue("W1_REQT_QTY", nRow)) > 0) GridObj.SetCellFontBold("W1_REQT_QTY", nRow, 'true');
        if(strToNum(GridObj.GetCellValue("W2_REQT_QTY", nRow)) > 0) GridObj.SetCellFontBold("W2_REQT_QTY", nRow, 'true');		
	}
 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 撚 錳贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow){
	//alert(strColumnKey+''+nRow);
}
    
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 撚 渦綰贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow){

	var sdate = document.all.sdate.value;

	if(strColumnKey == "MI_ORDER" || strColumnKey == "W0_ORDER") { // 渡輿
		var sel_week = "W0";
	}
	else if(strColumnKey == "W1_ORDER") { // 離輿
		var sel_week = "W1";
	}
	else if(strColumnKey == "W2_ORDER") { // 離離輿
		var sel_week = "W2";
	}
	else if(strColumnKey == "W3_ORDER") { // 離離輿
		var sel_week = "W3";
	}
	else return;

	var item_id	= GridObj.GetCellValue("ITEM_ID",nRow);
	var service_url = "service.do?_moon_service=sc_01120_Export_Order_List_Popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&item_id=" + item_id + "&sel_week=" + sel_week + "&sdate=" + sdate;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Export_Order_List", pop_win_style);
	newWin.focus();
	
}  
	
	