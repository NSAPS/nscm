//############################################################//## Щ煎斜極ID      : ip_02120_Edi_NS_Analysis.vm//## Щ煎斜極貲      : 嶸鱔獄睡 嘐陶蹺瞳 碟戮(堯褕)//## 偃嫦濠          : 陴錠辨//## 偃嫦橾濠        : 2015-01-30//##//## 婦溼 job file   : job_sinc_10_inventoryPlanning_07.xml//## 婦溼 query file : query_sinc_10_inventoryPlanning_07.xml//##        //## REVISIONS//## VER        DATE        AUTHOR    DESCRIPTION//## ---------  ----------  --------  ------------------------------------//## 1.0        2015-01-30  陴錠辨      create   //##//############################################################ /************************************************************************************************************************************//**********************************************  WiseGrid Java Script   *************************************************************//************************************************************************************************************************************///-----------------------------------------             瞪羲 滲熱            ----------------------------------------------////var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)var job_id = 'ip_02120_Edi_NS_Analysis';var GridObj ; 													// WiseGrid 偌羹var GridObj2;var GridObj3;var GridObj4;//var GridObj5;var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀var color_edit_col = '255|253|208';var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀var color_select_row = '232|232|255';	//塭檣 摹鷗 寡唳儀var colBg01 = '224|255|224';			//255|255|153var colBg02 = '255|255|255';/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/    function setGridAutoResize( tab_h, table_h ){                var maxWidthValue;        var maxHeightValue;                if (document.layers) {            //Nescape            maxWidthValue = window.innerWidth;            maxHeightValue = window.innerHeight;        }        if (document.all) {            //explore            maxWidthValue = document.body.clientWidth;            maxHeightValue = document.body.clientHeight;        }                 var tabHeightValue = Number(maxHeightValue) - Number(tab_h) ;         var tableHeightValue = Number(maxHeightValue) - Number(table_h) ;                 var search_h = document.frm.search_h.value;         if( search_menu.style.display == "none" )         {             tabHeightValue += Number(search_h);             tableHeightValue += Number(search_h);         }                 // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た         // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠         if( tabHeightValue < 1 )             tabHeightValue = 1;         if( tableHeightValue < 1 )             tableHeightValue = 1;                 //tabPage1.style.height = tabHeightValue + "px";         //tbMain.style.height = tableHeightValue + "px";         //document.WiseGrid.height = tableHeightValue + "px";         document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height - document.WiseGrid3.height - document.WiseGrid4.height + "px";        //document.WiseGrid3.height = tableHeightValue - document.WiseGrid.height - document.WiseGrid2.heigh + "px";             }  /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 							弛  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.			弛  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function init() { 	GridObj = document.WiseGrid;	setProperty(GridObj);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)	setHeader(GridObj);  	//п渦儅撩 	setDefault();        	//�飛� 晦獄 撲薑 }   function init2() {	GridObj2 = document.WiseGrid2;	setProperty(GridObj2);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)	setHeader2(GridObj2);  	//п渦儅撩 	setDefault2();        	//�飛� 晦獄 撲薑 }   function init3() {	GridObj3 = document.WiseGrid3;	setProperty(GridObj3);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)	setHeader3(GridObj3);  	//п渦儅撩 	setDefault3();        	//�飛� 晦獄 撲薑 }function init4() {	GridObj4 = document.WiseGrid4;	setProperty(GridObj4);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)	setHeader4(GridObj4);  	//п渦儅撩 	setDefault4();        	//�飛� 晦獄 撲薑 }         /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛�飛� 晦獄 撲薑 睡碟.  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function setDefault() { 	GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.    GridObj.nHDLineSize         = 10; //Header Size        //④渦曖 塭檣熱蒂 撲薑и棻.     GridObj.nHDLines = 2;              //摹鷗脹 撚曖 旋濠儀 雖薑и棻.    GridObj.strSelectedCellFgColor = '180|82|205';    GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.	GridObj.strActiveRowBgColor = color_select_row;    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.     GridObj.strHDClickAction    = "sortsingle";             GridObj.strMouseWheelAction='page';    	// Cell Font Setting	GridObj.nCellFontSize = 9;					// Font Size 9	//GridObj.strCellFontName = '蜈擎 堅蛐';     //GridObj.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑     }function setDefault2() { 	GridObj2.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 	GridObj2.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.    GridObj2.nHDLineSize         = 12; //Header Size    //GridObj2.strHDClickAction    = "sortsingle";    //④渦曖 塭檣熱蒂 撲薑и棻.     //GridObj2.nHDLines = 2;            //摹鷗脹 撚曖 旋濠儀 雖薑и棻.    GridObj2.strSelectedCellFgColor = '180|82|205';    GridObj2.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.	//GridObj2.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	// Cell Font Setting	GridObj2.nCellFontSize = 9;					// Font Size 9	//GridObj2.strCellFontName = '蜈擎 堅蛐'; }function setDefault3() { 	GridObj3.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 	GridObj3.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.    GridObj3.nHDLineSize         = 13; //Header Size    //GridObj2.strHDClickAction    = "sortsingle";    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.    GridObj3.nHDLines = 2;            GridObj3.strSelectedCellFgColor = '180|82|205';    GridObj3.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.	//GridObj3.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	GridObj3.nCellFontSize = 9;					// Font Size 9    //GridObj3.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑 }function setDefault4() {  	GridObj4.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 	GridObj4.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.    GridObj4.nHDLineSize         = 12; //Header Size    //GridObj2.strHDClickAction    = "sortsingle";     //GridObj4.bStatusbarVisible = false;				// status bar visible 鼻鷓夥 撲薑             //摹鷗脹 撚曖 旋濠儀 雖薑и棻.    GridObj4.strSelectedCellFgColor = '180|82|205';    GridObj4.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.	//GridObj4.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	GridObj4.nCellFontSize = 9;					// Font Size 9}       /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛п渦儅撩  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ function setHeader(GridObj) {        	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 		,100    ,60  ,false);  		GridObj.AddHeader("CNFM_DATE"		,"濛機橾"			,"t_text"	,20		,54  ,false); //0    	GridObj.AddHeader("SELL_STOP_FLAG"	,"っ衙\n醞雖"		,"t_text" 	,100	,33 ,false); //0    	GridObj.AddHeader("ALLOC_FLAG"		,"奢晝й渡\n罹睡"	,"t_text" 	,100	,33  ,false); //0 	GridObj.AddHeader("GUBN"			,"�蜈蛑征�"		,"t_text" 	,100	,33  ,false); //0 	GridObj.AddHeader("ITEM_ID"			,"ヶ跡囀萄"		,"t_text"	,100	,65 ,false); //0 	GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"			,"t_text" 	,100	,180 ,false); //0     	GridObj.AddHeader("SPEC"			,"SPEC"			,"t_text" 	,100	,0 ,false); //0    	GridObj.AddHeader("CUST_CODE"		,"剪楚籀囀萄"		,"t_text" 	,100	,0  ,false); //0    	GridObj.AddHeader("CUST_NAME"		,"剪楚籀貲"		,"t_text" 	,160	,140  ,false); //0 	GridObj.AddHeader("EDI_BOX"			,"嫦輿榆"			,"t_number" ,100.3	,50  ,false); //0 	GridObj.AddHeader("SELL_BOX"		,"っ衙榆"			,"t_number" ,100.3	,50  ,false); //0 	GridObj.AddHeader("HS_BOX"			,"�蜈蛪�"			,"t_number" ,100.3	,50  ,false); //0 	GridObj.AddHeader("DEFAULT_BOX"		,"嘐陶榆"			,"t_number" ,100.3	,50  ,false); //0 	GridObj.AddHeader("DEFAULT_CODE_NS"	,"餌嶸貲"     	,"t_combo" 	,100	,150  ,true); //0    	GridObj.AddHeader("DC_ID"			,"寡歎雖薄"		,"t_text" 	,100	,0  ,false); //0    	GridObj.AddHeader("DC_NAME"			,"寡歎雖薄"		,"t_text" 	,100	,100  ,false); //0    	GridObj.AddHeader("DEPT_CODE"		,"艙機雖薄囀萄"	,"t_text" 	,100	,0  ,false); //0    	GridObj.AddHeader("DEPT_NAME"		,"艙機雖薄"		,"t_text" 	,100	,100  ,false); //0    	GridObj.AddHeader("HAN_NAME"		,"氬渡濠"			,"t_text" 	,100	,50  ,false); //0 	GridObj.AddHeader("BIGO"			,"綠堅"			,"t_text" 	,100	,200  ,true); //0   	GridObj.BoundHeader();	    GridObj.SetColCellAlign('CNFM_DATE','center');     GridObj.SetColCellAlign('GUBN','center');     GridObj.SetColCellAlign('SELL_STOP_FLAG','center');     GridObj.SetColCellAlign('ALLOC_FLAG','center');     GridObj.SetColCellAlign('ITEM_ID','center');     GridObj.SetColCellAlign('SPEC','center');         GridObj.SetColCellAlign('DC_NAME','center');    GridObj.SetColCellAlign('DEPT_NAME','center');    GridObj.SetColCellAlign('HAN_NAME','center');     GridObj.SetColCellAlign('BIGO','left'); 	//GridObj.SetColFix('ITEM_NAME');	GridObj.SetColCellBgColor('DEFAULT_CODE_NS',color_edit_col);		GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.	//Hidden 鏽歲	GridObj.SetColHide("CRUD",true);}/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛WiseGrid Change Combo Event  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){	}function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  }function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {}   function setHeader2(GridObj2) { // 輿僥薑爾  	GridObj2.AddHeader("GUBN"		,"輿僥薑爾"      	,"t_text" 	,10			,70  ,false); //0   	GridObj2.AddHeader("CUST_CODE"	,"剪楚籀囀萄"     ,"t_text" 	,500		,0  ,false); //0    	GridObj2.AddHeader("CUST_NAME"	,"剪楚籀貲"      	,"t_text" 	,500		,0  ,false); //0     	GridObj2.AddHeader("SLIP_NO"	,"瞪ル廓��"       ,"t_text" 	,100		,80  ,false); //0     	GridObj2.AddHeader("SEQ_NO"		,"SEQ_NO"       ,"t_text" 	,100		,0  ,false); //0     	GridObj2.AddHeader("REQT_QTY"	,"輿僥熱榆"      	,"t_number" ,100.3		,80  ,false); //0     	GridObj2.AddHeader("SELL_QTY"	,"葆馬熱榆"      	,"t_number" ,100.3		,80  ,false); //0     	GridObj2.AddHeader("SHORTAGE_GUBN"	,"唸ヶ餌嶸"  ,"t_text" 	,100		,180  ,false); //0     	GridObj2.AddHeader("IPUT_DTTM"	,"殮溘衛除"      	,"t_text" 	,100		,140  ,false); //0      	GridObj2.AddHeader("CLOS_DTTM"	,"葆馬衛除"      ,"t_text" 	,100		,140  ,false); //0     	GridObj2.AddHeader("CHGO_GUBN"	,"瞪ル鼻鷓"		,"t_text" 	,100		,77  ,false); //0   �飛� 馬辭	 	    	GridObj2.BoundHeader();	    GridObj2.SetColCellAlign('GUBN','center');     GridObj2.SetColCellAlign('SLIP_NO','center');     GridObj2.SetColCellAlign('IPUT_DTTM','center');     GridObj2.SetColCellAlign('CHGO_GUBN','center');     GridObj2.SetColCellAlign('CLOS_DTTM','center');         GridObj2.SetNumberFormat("REQT_QTY"  , "#,##0");    GridObj2.SetNumberFormat("SELL_QTY"  , "#,##0");}   function setHeader3(GridObj3) { //熱歎薑爾                 	GridObj3.AddHeader("DC_NAME"		,"熱歎薑爾"		,"t_text" 	,10			,60  ,false); //0     	GridObj3.AddHeader("RECEIPT_PRE"	,"瞪橾\n殮堅"		,"t_number"	,100.3		,50  ,false); //0     	GridObj3.AddHeader("BASE_STOCK"		,"晦蟾\n營堅"		,"t_number"	,100.3		,50 ,false); //0     	GridObj3.AddHeader("IPGO"			,"殮堅"      	,"t_number" ,100.3		,50  ,false); //0     	GridObj3.AddHeader("CHGO"			,"轎堅"      	,"t_number" ,100.3		,50  ,false); //0     	GridObj3.AddHeader("REQT_QTY"		,"輿僥\n熱榆"  	,"t_number" ,100.3		,0  ,false); //0      	GridObj3.AddHeader("CONFIRM_QTY"	,"葆馬\n熱榆"		,"t_number" ,100.3		,0  ,false); //0    	GridObj3.AddHeader("SHORTAGE_QTY"	,"唸ヶ\n熱榆" 	,"t_number" ,100.3		,0  ,false); //0  	GridObj3.AddHeader("ORDER_CNT"		,"螃渦\n勒熱" 	,"t_number" ,100.3		,0  ,false); //0  	      	GridObj3.AddHeader("SRC_LOC"		,"轎堅濰"    		,"t_text" 	,100		,70  ,false); //0     	GridObj3.AddHeader("BRAND_NO"		,"瞪ル\n廓��"  	,"t_text" 	,100		,70  ,false); //0     	GridObj3.AddHeader("TRANS_STATE"	,"瞪ル\n鼻鷓"		,"t_text" 	,100		,70  ,false); //0     	GridObj3.AddHeader("SHORTAGE_GUBN"	,"唸ヶ\n餌嶸"		,"t_text" 	,100		,80  ,false); //0     	GridObj3.AddHeader("QTY"			,"熱歎\n啗��" 	,"t_number" ,100.3		,50  ,false); //0     	GridObj3.AddHeader("CHGO_QTY"		,"轎堅\n熱榆"		,"t_number" ,100.3		,0  ,false); //0     	GridObj3.AddHeader("CHGO_DTTM"		,"轎堅\n橾衛" 	,"t_text" 	,100		,120  ,false); //0     	GridObj3.AddHeader("IPGO_DTTM"		,"殮堅\n橾衛"  	,"t_text" 	,100		,120  ,false); //0     	GridObj3.AddHeader("IPGO_QTY"		,"殮堅\n熱榆"  	,"t_number" ,100.3		,50  ,false); //0   	 	      	GridObj3.AddHeader("MIN_CLOS_DTTM"	,"寡歎葆馬\n(from)" ,"t_text" ,100		,120  ,false); //0     	GridObj3.AddHeader("MAX_CLOS_DTTM"	,"寡歎葆馬\n(to)"   ,"t_text" ,100		,120  ,false); //0	GridObj3.BoundHeader();	    GridObj3.SetColCellAlign('DC_NAME','center');     GridObj3.SetColCellAlign('MIN_CLOS_DTTM','center');     GridObj3.SetColCellAlign('MAX_CLOS_DTTM','center');     GridObj3.SetColCellAlign('SRC_LOC','center');     GridObj3.SetColCellAlign('TRANS_STATE','center');     GridObj3.SetColCellAlign('CHGO_DTTM','center');     GridObj3.SetColCellAlign('IPGO_DTTM','center'); }function setHeader4(GridObj4) { // EDI 薑爾         	GridObj4.AddHeader("GUBN"			,"EDI 薑爾"		,"t_text" 	,10			,60  ,false); //0     	GridObj4.AddHeader("CNFM_DATE"		,"陶ヶ橾濠"		,"t_text"	,100		,90  ,false); //0     	GridObj4.AddHeader("CUST_CODE"		,"剪楚籀囀萄"		,"t_text"	,100		,0 ,false); //0     	GridObj4.AddHeader("OD_SLIP_NO"		,"EDI瞪ル廓��"	,"t_text" 	,100		,90  ,false); //0     	GridObj4.AddHeader("ODER_BOX"		,"EDI嫦輿熱榆"	,"t_number" ,100.3		,90  ,false); //0     	GridObj4.AddHeader("CONV_BOX"		,"輿僥瞪�紡鷊�"	,"t_number" ,100.3		,90  ,false); //0     	GridObj4.AddHeader("ODER_DATE"		,"輿僥橾濠"      	,"t_text" 	,100		,0  ,false); //0     	//GridObj4.AddHeader("IPUT_DATE"		,"殮溘橾濠"  		,"t_text" 	,100		,90  ,false); //0      	GridObj4.AddHeader("IPUT_TIME"		,"殮溘衛陝"		,"t_text" 	,100		,140  ,false); //0   �飛� 馬辭  	GridObj4.AddHeader("IPUT_EMP_NO"	,"殮溘濠" 		,"t_text" 	,100		,0  ,false); //0  	//GridObj4.AddHeader("CONV_DATE"		,"瞪�素狨�" 		,"t_text" 	,100		,90  ,false); //0  	GridObj4.AddHeader("CONV_TIME"		,"瞪�紗簸�"    	,"t_text" 	,100		,140  ,false); //0     	GridObj4.AddHeader("CONV_EMP_NO"	,"瞪�素�"  		,"t_text" 	,100		,70  ,false); //0     	GridObj4.AddHeader("SLIP_NO"		,"艙機瞪ル廓��"	,"t_text" 	,100		,90  ,false); //0   	GridObj4.BoundHeader();	    GridObj4.SetColCellAlign('GUBN','center');     GridObj4.SetColCellAlign('CNFM_DATE','center');     GridObj4.SetColCellAlign('OD_SLIP_NO','center');     GridObj4.SetColCellAlign('ODER_DATE','center');     //GridObj4.SetColCellAlign('IPUT_DATE','center');     GridObj4.SetColCellAlign('IPUT_TIME','center');     GridObj4.SetColCellAlign('IPUT_EMP_NO','center');     //GridObj4.SetColCellAlign('CONV_DATE','center');     GridObj4.SetColCellAlign('CONV_TIME','center');     GridObj4.SetColCellAlign('CONV_EMP_NO','center');     GridObj4.SetColCellAlign('SLIP_NO','center');     }/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function GridEndQuery(){	    var endMode = GridObj.GetParam("mode");    var error_msg = '';        //alert("endMode="+endMode);      if(endMode == "search") //褻�萼� 諫猿脹 唳辦    {        if(GridObj.GetStatus() == "true")         {                    	GridSetMerge();        	for(var i=0;i<GridObj.GetRowCount();i++){        		var flag = GridObj.GetCellValue('GUBN',i);        		if( flag == "�蜈�") GridObj.SetCellBgColor('GUBN', i, '255|255|200');        		        	}        	/*         				for(var i=0;i<GridObj.GetRowCount();i++) {			// cell儀梃 滲唳				if(GridObj.GetCellValue('PR_DATE_NO',i) > Number(2) ){  // GREEN					GridObj.SetCellBgColor('PR_DATE_NO', i, '200|255|110');				}else if(GridObj.GetCellValue('PR_DATE_NO',i) > Number(1) && GridObj.GetCellValue('PR_DATE_NO',i) <= Number(2)){  // YELLOW					GridObj.SetCellBgColor('PR_DATE_NO', i, '255|255|0');				}				else if(GridObj.GetCellValue('PR_DATE_NO',i) <= Number(1)){ // RED					GridObj.SetCellBgColor('PR_DATE_NO', i, '255|0|0'); 				}							GridObj.SetCellFontBold('TOT_STOCK', i, 'true'); // font 掃晦			GridObj.SetCellFontBold('PR_QTY', i, 'true'); // font 掃晦			GridObj.SetCellFontBold('STD_STOCK', i, 'true'); // font 掃晦			}*/			        } else            {             error_msg = GridObj.GetMessage();             alert(error_msg);            		}    }else if(endMode == "save"){    }else{ // 餉薯, 瞪歎 鼻鷓橾衛 詭檣斜葬萄 薯褻��       }    	}function GridEndQuery2() {		var mode = GridObj2.GetParam("mode");	var error_msg = '';	          	if(mode == "search2") {		if(GridObj2.GetStatus() == "true") {			//GridObj2.SetGroupMerge(	'ITEM_ID,ITEM_NAME,PR_NO,PR_REL,PR_QTY,PO_NO,PO_SEQ,PO_DATE,PO_QTY');		  	//GridObj2.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'SHIP_QTY');		  	//GridObj2.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 		}		else { 			error_msg = GridObj2.GetMessage(); 			alert(error_msg);            		}	}}function GridEndQuery3() {		var mode = GridObj3.GetParam("mode");	var error_msg = '';	          	if(mode == "search3") {		if(GridObj3.GetStatus() == "true") { 		}		else { 			error_msg = GridObj3.GetMessage(); 			alert(error_msg);            		}	}	var header_length = 0, j;	/* TP_FLAG �挫恛� 撮た */	var item_id = document.all.sel_item_id.value;	}function GridEndQuery4() {		var mode = GridObj4.GetParam("mode");	var error_msg = '';	          	if(mode == "search4") {		if(GridObj4.GetStatus() == "true") {                           		}		else { 			error_msg = GridObj4.GetMessage(); 			alert(error_msg);            		}	}}/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛斜葬萄曖 錳 贗葛 檜漸お  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function GridCellClick(strColumnKey, nRow) {}	               /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function GoSearch(service) {    doQuery();}/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function GridCellDblClick(strColumnKey, nRow){         var sel_item_id = GridObj.GetCellValue("ITEM_ID", nRow);    document.all.sel_item_id.value	= sel_item_id;        var sel_item_name = GridObj.GetCellValue("ITEM_NAME", nRow);    document.all.sel_item_name.value	= sel_item_name;	doQuery2(nRow);		doQuery3(nRow);		doQuery4(nRow);		}           /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/   function doQuery()    {       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;       var cnfm_date	= document.all.cnfm_date.value;          //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )       GridObj.SetParam("mode", "search");       GridObj.SetParam("cnfm_date", cnfm_date);              GridObj.DoQuery(servlet_url);   }/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function doQuery2(nRow) { //輿僥薑爾	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);	var cust_id	= GridObj.GetCellValue("CUST_CODE", nRow);	var dc_id	= GridObj.GetCellValue("DC_ID", nRow);	var cnfm_date = GridObj.GetCellValue("CNFM_DATE", nRow);	var edi_gubn = '1';		//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )	GridObj2.SetParam("mode", "search2");	GridObj2.SetParam("item_id", item_id);	GridObj2.SetParam("cust_id", cust_id);	GridObj2.SetParam("dc_id", dc_id);	GridObj2.SetParam("cnfm_date", cnfm_date);	GridObj2.SetParam("edi_gubn", edi_gubn);	GridObj2.DoQuery(servlet_url);}/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛DW 3 褻�� 蘭葬蒂 ��轎 Fnc  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function doQuery3(nRow) { //熱歎薑爾	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);	var cust_id	= GridObj.GetCellValue("CUST_CODE", nRow);	var dc_id	= GridObj.GetCellValue("DC_ID", nRow);	var cnfm_date = GridObj.GetCellValue("CNFM_DATE", nRow);		//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )	GridObj3.SetParam("mode", "search3");	GridObj3.SetParam("item_id", item_id);	GridObj3.SetParam("cust_id", cust_id);	GridObj3.SetParam("dc_id", dc_id);	GridObj3.SetParam("cnfm_date", cnfm_date);		GridObj3.DoQuery(servlet_url);}/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛DW 4 褻�� 蘭葬蒂 ��轎 Fnc  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/function doQuery4(nRow) { //EDI 薑爾	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;	var item_id	= GridObj.GetCellValue("ITEM_ID", nRow);	var cust_id	= GridObj.GetCellValue("CUST_CODE", nRow);	var dc_id	= GridObj.GetCellValue("DC_ID", nRow);	var cnfm_date = GridObj.GetCellValue("CNFM_DATE", nRow);	var edi_gubn = '1';			//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )	GridObj4.SetParam("mode", "search4");	GridObj4.SetParam("item_id", item_id);	GridObj4.SetParam("cust_id", cust_id);	GridObj4.SetParam("dc_id", dc_id);	GridObj4.SetParam("cnfm_date", cnfm_date);	GridObj4.SetParam("edi_gubn", edi_gubn);	GridObj4.DoQuery(servlet_url);}//--------------------------------------   main_template 縑 薑曖脹 Event ---------------------------------------------------///*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖  弛WiseGrid Cell Change Event  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/// 盪濰function GoSave(service) {	var GridObj = document.WiseGrid;	mode = "save";	doSave();	};// 盪濰function doSave() { 	var GridObj = document.WiseGrid;	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;    	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )	GridObj.SetParam("mode", "save");	GridObj.SetParam("user_id", document.frm._user_id.value);		//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");	//GridObj.DoQuery(servlet_url, "SELECTED"); }function GridSetMerge(){				var rowCount = GridObj.GetRowCount();				if (rowCount == 0) return;								//GridObj.SetGroupMerge('CNFM_DATE');        GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'EDI_BOX,SELL_BOX,HS_BOX,DEFAULT_BOX');         GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '152|251|152');         	           				 }function changeChecked(obj){ // 轎堅濰 晦棟 掘⑷ л熱//		var sel_data = GridObj.GetSelectedCells(); // 摹鷗и 睡碟曖 key諦 row蒂 陛螳螞棻		var i=0;	var rowNo=0;	/*  	 * 羅廓簞 ч廓�� 瓊晦	 * 羅廓簞 ч曖 轎堅濰曖 �鰽蝪� 瓊晦	 * 	 * 摹鷗腎橫霞 ч菟曖 轎堅濰擊 羅廓簞 轎堅濰 �鰽蝪社虞� 撮たж晦	 * */ 	var first_rowNo   = sel_data.split(",")[i*2+1];		var first_rowVal  = GridObj.GetCellValue("DEFAULT_CODE_NS",first_rowNo);	var first_row_idx = GridObj.GetCellHiddenValue("DEFAULT_CODE_NS", first_rowNo);		var first_row_new_idx = GridObj.GetComboSelectedIndex("DEFAULT_CODE_NS", first_rowNo); 		if(first_row_idx == "" ){		alert("羅 廓簞 轎堅濰擊 殮溘 ��, 橾婪滲唳擊 褒чж罹 輿褊衛蹂.");		return;	} 	while(1) {		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 渦檜鼻 等檜攪 橈棻			return;		else {						var rowNo = sel_data.split(",")[i*2+1];						var nOldIndex = GridObj.GetComboSelectedIndex("DEFAULT_CODE_NS", rowNo);						var nNewIndex = first_row_new_idx;						//GridObj.SetComboSelectedHiddenValue("DEFAULT_CODE_NS", rowNo,  first_src_loc);			GridObj.SetComboSelectedHiddenValue("DEFAULT_CODE_NS", rowNo,  first_row_idx);			GridObj.SetComboSelectedIndex("DEFAULT_CODE_NS", rowNo,  first_row_new_idx);												}		i++;	}		}