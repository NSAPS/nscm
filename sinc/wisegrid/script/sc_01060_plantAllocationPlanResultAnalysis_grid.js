/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛陝 幗が曖 JOB_ID蒂 撲薑.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/    
    var job_id  = 'sc_01060_plantAllocationPlanResultAnalysis_grid'; //詭景 譆堅 贗葛衛 JOB_ID
    var class_path = "com.wisegrid.admin.";
    
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅л. 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function init() {
   	
       setProperty(GridObj);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
       setHeader(GridObj);  //п渦儅撩
       setDefault();        
   }


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function setDefault()
   {
   		//GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");
        //斜葬萄曖 ④渦 贗葛衛 澗た晦棟 �側瘓�. 欽, 斜瑜煽м賅萄縑憮朝 餌辨ж賊 寰脾.
    	GridObj.strHDClickAction    = "sortsingle";
   }
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   
   function setHeader(GridObj) 
   {
   		//詭景贗葛衛 晦獄戲煎 顫朝 夠.
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader);
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function defaultHeader(result)
   {
	   var result_cnt = result.length;
	   //alert("result_cnt : "+result_cnt); //36偃曖 鏽歲..
       var test = '';
       var arrHeader = '';
/*       for( var i=0 ;i<result.length ;i++) //瞪羹 鏽歲 熱 虜躑 奩犒 и棻.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])
       }
*/
			GridObj.AddHeader("CRUD"						,"CRUD"       				,"t_text" 	,100 ,50  ,false);
			GridObj.AddHeader("RES_TP"						,"撲綠嶸⑽"       			,"t_text" 	,100 ,40  ,false);
			GridObj.AddHeader("ITEM_ID"						,"薯ヶ囀萄"       			,"t_text" 	,100 ,80  ,false);
			GridObj.AddHeader("ITEM_NAME"					,"薯ヶ貲"       				,"t_text" 	,100 ,150 ,false);
			GridObj.AddHeader("W3_AVG_RATIO"				,"3輿ゎ敕\n蕾斬徽"       		,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("W1_AVG_RATIO"				,"1輿ゎ敕\n蕾斬徽"       		,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("SAFETY_STOCK"				,"寰瞪營堅"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("BASE_STOCK"					,"褻�蛻柦n晦蟾營堅"  			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("MI_CHGO"						,"熱轎\n嘐轎堅"  				,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("RECEIPT_EXPT"				,"旎輿\n儅骯啗��"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_PLAN"					,"旎輿\nっ衙啗��"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_ACT_VS_SALES_PLAN_1"	,"旎輿\nっ衙啗�鈾n渠綠褒瞳"    ,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("SALES_VS_WEEK1_AVG"			,"1輿ゎ敕\nっ衙渠綠"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("EXPERT_STOCK"				,"蕨鼻營堅\n(離輿蟾)"       	,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("N_PLAN_VS_STOCK_WORK"		,"啗�僑赮鎪n營堅橾熱"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("N_ACT_VS_STOCK_WORK"			,"褒瞳渠綠\n營堅橾熱"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("N_RECEIPT_EXPT"				,"儅骯蕨衛\(瞪輿啗�厭�)"		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("RP1_QTY"						,"爾醱蹂掘榆"       			,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("PO_QTY1"						,"儅骯в蹂榆"       			,"t_text" 	,100 ,70 ,true );
			GridObj.AddHeader("NWK_ADJ_QTY"					,"蹂掘/儅骯\n離檜"       		,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("W1_SALES_PLAN_DIFF"			,"っ衙啗�鈾n陛馬榆\n(1輿AVG)" ,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("W3_SALES_PLAN_DIFF"			,"っ衙啗�鈾n陛馬榆\n(3輿AVG)" ,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("N_SALES_PLAN"				,"っ衙啗��"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_ACT_VS_SALES_PLAN_2"	,"っ衙啗�鈾n渠綠褒瞳"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("EXPERT_STOCK2"				,"蕨鼻營堅"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("NN_PLAN_VS_STOCK_WORK"		,"啗�僑赮鎪n營堅橾熱"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("NN_ACT_VS_STOCK_WORK"		,"褒瞳渠綠\n營堅橾熱"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("RP2_QTY"						,"爾醱蹂掘榆"       			,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("PO_QTY2"						,"儅骯в蹂榆"       			,"t_text" 	,100 ,70 ,true );
			GridObj.AddHeader("NN_SALES_PLAN"				,"っ衙啗��"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_ACT_VS_SALES_PLAN_3"	,"っ衙啗�鈾n渠綠褒瞳"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("EXPERT_STOCK3"				,"蕨鼻營堅"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("NNN_ACT_VS_STOCK_WORK"		,"褒瞳渠綠\n營堅橾熱"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("RP0_QTY"						,"渡輿儅骯в蹂榆"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("W1"							,"W1_渡輿\n饜蹂橾"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("W2"							,"W2_離輿\n饜蹂橾"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("W3"							,"W3_離離輿\n饜蹂橾"       	,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("NNWK_WORK"					,"離離輿\n艙機橾熱"       	,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_MEAN_1WEEK"			,"1輿ゎ敕っ衙"       			,"t_text" 	,100 ,70  ,false);
			
			//④渦鏽歲薹 塭檣..餌檜鍔 塽 アお餌檜鍔 褻瞰.
			GridObj.nHDLines = 3; //④渦 睡碟 旋 轎溘擊 2還梱雖 餌辨л.
			GridObj.nHDLineSize = 22; //④渦 鏽歲曖 堪檜 餌檜鍔.
			GridObj.nHDFontSize = 8; //④渦 鏽歲曖 アお 餌檜鍔.
			
			//斜葬萄 牖憮 衙晦晦
			GridObj.bRowSelectorVisible = true;
			GridObj.bRowSelectorIndex = true;
		
			GridObj.AddGroup("WEEK", "渡輿(W)");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AppendHeader("WEEK", "W3_AVG_RATIO");	//3輿 ゎ敕 蕾斬徽
			GridObj.AppendHeader("WEEK", "W1_AVG_RATIO");	//1輿 ゎ敕蕾斬徽
			GridObj.AppendHeader("WEEK", "SAFETY_STOCK");	//寰瞪營堅
			GridObj.AppendHeader("WEEK", "BASE_STOCK");		//晦蟾營堅
			GridObj.AppendHeader("WEEK", "MI_CHGO");		//熱轎嘐轎堅
			GridObj.AppendHeader("WEEK", "RECEIPT_EXPT");	//儅骯啗��
			GridObj.AppendHeader("WEEK", "SALES_PLAN");		//っ衙啗��
			GridObj.AppendHeader("WEEK", "SALES_ACT_VS_SALES_PLAN_1");	//っ衙啗�僑赮鬅Ш�
			GridObj.AppendHeader("WEEK", "SALES_VS_WEEK1_AVG");			//1輿 ゎ敕 っ衙 渠
			
			GridObj.AddGroup("WEEK1", "離輿(W+1)");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AppendHeader("WEEK1", "EXPERT_STOCK");			//蕨鼻營堅(離輿蟾)
			GridObj.AppendHeader("WEEK1", "N_PLAN_VS_STOCK_WORK");	//啗�僑赮魊蝪簎�
			GridObj.AppendHeader("WEEK1", "N_ACT_VS_STOCK_WORK");	//褒瞳渠綠營堅橾熱
			GridObj.AppendHeader("WEEK1", "N_RECEIPT_EXPT");		//儅骯啗��
			GridObj.AppendHeader("WEEK1", "RP1_QTY");				//爾醱蹂掘榆
			GridObj.AppendHeader("WEEK1", "PO_QTY1");				//儅骯в蹂榆
			GridObj.AppendHeader("WEEK1", "NWK_ADJ_QTY");			//蹂掘/儅骯離檜
			GridObj.AppendHeader("WEEK1", "W1_SALES_PLAN_DIFF");	//っ衙啗�僭※邢�(1輿ゎ敕)
			GridObj.AppendHeader("WEEK1", "W3_SALES_PLAN_DIFF");	//っ衙啗�僭※邢�(3輿ゎ敕)
			GridObj.AppendHeader("WEEK1", "N_SALES_PLAN");			//っ衙啗��
			GridObj.AppendHeader("WEEK1", "SALES_ACT_VS_SALES_PLAN_2");	//っ衙啗�僑赮鬅Ш�
		
			GridObj.AddGroup("WEEK2", "離離輿(W+2)");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AppendHeader("WEEK2", "EXPERT_STOCK2");				//蕨鼻營堅
			GridObj.AppendHeader("WEEK2", "NN_PLAN_VS_STOCK_WORK");		//啗�僑赮魊蝪簎牳�
			GridObj.AppendHeader("WEEK2", "NN_ACT_VS_STOCK_WORK");		//褒瞳渠綠營堅橾熱
			GridObj.AppendHeader("WEEK2", "RP2_QTY");					//爾醱蹂掘榆
			GridObj.AppendHeader("WEEK2", "PO_QTY2");					//儅骯в蹂榆
			GridObj.AppendHeader("WEEK2", "NN_SALES_PLAN");				//っ衙啗��
			GridObj.AppendHeader("WEEK2", "SALES_ACT_VS_SALES_PLAN_3");	//っ衙啗�僑赮鬅Ш�
			GridObj.AppendHeader("WEEK2", "EXPERT_STOCK3");				//蕨鼻營堅
			GridObj.AppendHeader("WEEK2", "NNN_ACT_VS_STOCK_WORK");		//褒瞳渠綠營堅橾熱

	   //alert("GRidObj.....夥遴萄 瞪!");
	   GridObj.BoundHeader();
	   
	   GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");

       //Hidden 鏽歲
       GridObj.SetColHide("CRUD",true);
       GridObj.SetColHide("RP0_QTY",true);
       GridObj.SetColHide("W1",true);
       GridObj.SetColHide("W2",true);
       GridObj.SetColHide("W3",true);
       GridObj.SetColHide("NNWK_WORK",true);
       GridObj.SetColHide("SALES_MEAN_1WEEK",true);
       GridObj.SetColHide("MI_CHGO",true);
       
       //か薑鏽歲 堅薑!!
       GridObj.SetColFix('ITEM_NAME'); 
       
   }


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻�� 幗が 贗葛衛 褒ч.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
GoSearch = function() {

/*	if(document.frm.checked_domain[3].checked == true) {
		// 頂熱,熱轎 氬渡檜 翕衛縑 濛機й 唳辦 瞪羹鼻鷓縑憮 濛機й 唳辦朝 憮煎曖 濛機等檜攪蒂 餉薯衛鑒 嬪я檜 氈棻.
		if(confirm("瞪羹褻�蜇繫� 盪濰й 熱 橈蝗棲棻! \n 啗樓 褻�裔牮簸睍懂炱�?") != 1 ) {
			return;
		}
	}
*/
	doQuery();
};


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
GoSave = function() {
	
/*	if(document.frm.checked_domain[3].checked == true) {
		// 頂熱,熱轎 氬渡檜 翕衛縑 濛機й 唳辦 瞪羹鼻鷓縑憮 濛機й 唳辦朝 憮煎曖 濛機等檜攪蒂 餉薯衛鑒 嬪я檜 氈棻.
		alert("瞪羹褻�蜇繫� 盪濰й 熱 橈蝗棲棻! ");
		return;
	}
*/	
	doSave();
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
   	   //詭景 贗葛衛 晦獄 褒ч
       var servlet_url = Project_name+"/servlet/" + class_path + job_id;

       //塭蛤螃 幗が 掘碟 [頂熱, 熱轎MTS, 熱轎MTO, 繭羹]
/*       if(document.frm.checked_domain[0].checked == true){
       	checked_domain = "DO";       	
       }else if(document.frm.checked_domain[1].checked == true){
       	checked_domain = "EXMTS";
       }else if(document.frm.checked_domain[2].checked == true){
       	checked_domain = "EXMTO";
       }else if(document.frm.checked_domain[3].checked == true){
       	checked_domain = "";
       }
*/
      	checked_domain = "DO";  
      	       
       //塭蛤螃 幗が 掘碟 [儅骯в蹂榆, 儅骯啗�鉛
       if(document.frm.checked_pa_pr[0].checked == true){
       	checked_pa_pr = "";
       }else if(document.frm.checked_pa_pr[1].checked == true){
       	checked_pa_pr = "PR";
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
						GridObj.SetParam("checked_pa_pr", checked_pa_pr);
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
		
       //塭蛤螃 幗が 掘碟 [頂熱, 熱轎MTS, 熱轎MTO, 繭羹]
/*       if(document.frm.checked_domain[0].checked == true){
       	checked_domain = "DO";       	
       }else if(document.frm.checked_domain[1].checked == true){
       	checked_domain = "EXMTS";
       }else if(document.frm.checked_domain[2].checked == true){
       	checked_domain = "EXMTO";
       }else if(document.frm.checked_domain[3].checked == true){
       	checked_domain = "";
       }
*/       
       checked_domain = "DO";
       
       //塭蛤螃 幗が 掘碟 [儅骯в蹂榆, 儅骯啗�鉛
       if(document.frm.checked_pa_pr[0].checked == true){
       	checked_pa_pr = "";
       }else if(document.frm.checked_pa_pr[1].checked == true){
       	checked_pa_pr = "PR";
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

			       	GridObj.SetParam("p_in_up_chk", "p_update");
			        GridObj.SetParam("plant_alloc_version", plant_alloc_version);
			        GridObj.SetParam("sdate", sdate);
			        GridObj.SetParam("checked_domain", checked_domain);
			        GridObj.SetParam("checked_pa_pr", checked_pa_pr);
					
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
	                GridObj.SetColCellAlign('RES_TP','left'); //撲綠嶸⑽
	                GridObj.SetColCellAlign('ITEM_ID','left');
	                GridObj.SetColCellAlign('ITEM_NAME','left');
	                GridObj.SetColCellAlign('W3_AVG_RATIO','right');
	                GridObj.SetColCellAlign('W1_AVG_RATIO','right');
	                GridObj.SetColCellAlign('SAFETY_STOCK','right');
	                GridObj.SetColCellAlign('BASE_STOCK','right');
	                GridObj.SetColCellAlign('MI_CHGO','right');
	                GridObj.SetColCellAlign('RECEIPT_EXPT','right');
	                GridObj.SetColCellAlign('SALES_PLAN','right');
	                GridObj.SetColCellAlign('SALES_ACT_VS_SALES_PLAN_1','right');
	                GridObj.SetColCellAlign('SALES_VS_WEEK1_AVG','right');
	                GridObj.SetColCellAlign('EXPERT_STOCK','right');
	                GridObj.SetColCellAlign('N_PLAN_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('N_ACT_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('N_RECEIPT_EXPT','right');
	                GridObj.SetColCellAlign('RP1_QTY','right');
	                GridObj.SetColCellAlign('PO_QTY1','right');
	                GridObj.SetColCellAlign('NWK_ADJ_QTY','right');
	                GridObj.SetColCellAlign('W1_SALES_PLAN_DIFF','right');
	                GridObj.SetColCellAlign('W3_SALES_PLAN_DIFF','right');
	                GridObj.SetColCellAlign('N_SALES_PLAN','right');
	                GridObj.SetColCellAlign('SALES_ACT_VS_SALES_PLAN_2','right');
	                GridObj.SetColCellAlign('EXPERT_STOCK2','right');
	                GridObj.SetColCellAlign('NN_PLAN_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('NN_ACT_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('RP2_QTY','right');
	                GridObj.SetColCellAlign('PO_QTY2','right');
	                GridObj.SetColCellAlign('NN_SALES_PLAN','right');
	                GridObj.SetColCellAlign('SALES_ACT_VS_SALES_PLAN_3','right');
	                GridObj.SetColCellAlign('EXPERT_STOCK3','right');
	                GridObj.SetColCellAlign('NNN_ACT_VS_STOCK_WORK','right');
	                
	                //numberん裝 撲薑!
	                GridObj.SetNumberFormat('W3_AVG_RATIO','###,##0.##');
	                GridObj.SetNumberFormat('W1_AVG_RATIO','###,##0.##');
	                GridObj.SetNumberFormat('SALES_VS_WEEK1_AVG','###,##0.##');
	                GridObj.SetNumberFormat('W1_SALES_PLAN_DIFF','###,##0.##');
	                GridObj.SetNumberFormat('W3_SALES_PLAN_DIFF','###,##0.##');
	                
	                GridObj.SetNumberFormat('SALES_ACT_VS_SALES_PLAN_1','###,##0.##');
	                GridObj.SetNumberFormat('N_PLAN_VS_STOCK_WORK','###,##0.##');

	                GridObj.SetNumberFormat('SALES_ACT_VS_SALES_PLAN_2','###,##0.##');
	                GridObj.SetNumberFormat('SALES_ACT_VS_SALES_PLAN_3','###,##0.##');
	                GridObj.SetNumberFormat('NNN_ACT_VS_STOCK_WORK','###,##0.##');
	                GridObj.SetNumberFormat('NN_PLAN_VS_STOCK_WORK','###,##0.##');
	                GridObj.SetNumberFormat('NN_ACT_VS_STOCK_WORK','###,##0.##');

					//儅骯в蹂榆 鏽歲曖 模啗睡碟曖 Cell擎 熱薑й熱 橈紫煙 虞朝 睡碟!!
	                //⑷營 斜葬萄曖 識 煎辦 偎熱.
    				var row_cnt = GridObj.GetRowCount();
    				//alert("row_cnt : "+row_cnt);
			        for( var i=0 ;i<row_cnt ;i++) //瞪羹 Row虜躑 奩犒 и棻.
			        {
			            if(GridObj.GetCellValue('ITEM_ID',i) == "模啗"){
			             /*か薑 鏽歲曖 п渡煎辦曖 ら餵鼻鷓蒂 撲薑и棻. 
						 edit : 雖薑и 鏽歲縑 渠п ら餵陛棟ж啪 и棻. 
						 activateonly : 撚 寰曖 醴憮蒂 遺霜橾 熱 氈堅 摹鷗й 熱 氈雖虜 ら餵й 熱朝 橈棻. 
						 disable : 摹鷗й 熱 橈堅 ら餵й 熱 橈棻. 
						 activatenoedit : 欽牖�� 撚擊 摹鷗й 熱 氈啪 и棻. 
						 GridObj.SetCellActivation('ITEM_NAME', 0, 'disable')
						 */
			           	 GridObj.SetCellActivation('PO_QTY1', i, 'activatenoedit');
			           	 GridObj.SetCellActivation('PO_QTY2', i, 'activatenoedit');
			            }
			            
			             if(GridObj.GetCellValue('ITEM_NAME',i) == "識啗"){
			             /*か薑 鏽歲曖 п渡煎辦曖 ら餵鼻鷓蒂 撲薑и棻. 
						 edit : 雖薑и 鏽歲縑 渠п ら餵陛棟ж啪 и棻. 
						 activateonly : 撚 寰曖 醴憮蒂 遺霜橾 熱 氈堅 摹鷗й 熱 氈雖虜 ら餵й 熱朝 橈棻. 
						 disable : 摹鷗й 熱 橈堅 ら餵й 熱 橈棻. 
						 activatenoedit : 欽牖�� 撚擊 摹鷗й 熱 氈啪 и棻. 
						 GridObj.SetCellActivation('ITEM_NAME', 0, 'disable')
						 */
			           	 GridObj.SetCellActivation('PO_QTY1', i, 'activatenoedit');
			           	 GridObj.SetCellActivation('PO_QTY2', i, 'activatenoedit');
			            }
			        }
		
	                
	                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                	gridColSet(GridObj);
                	
                	//斜葬萄曖 瞪羹 煎辦熱蒂 氬擠.
                	gridRow = GridObj.GetRowCount();
                	
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
    	}else if(mode == "save"){
    		if(GridObj.GetStatus() == "true") {

    			alert("盪濰撩奢!");

			} else {
				var error_msg = GridObj.GetMessage();
				alert(error_msg);			
			}
    	}
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
        
        /*
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue += Number(search_h); 
            tableHeightValue += Number(search_h); 
        }
        */ 
        
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
    function gridColSet(obj)
    {
    	//⑷營 斜葬萄曖 識 煎辦 偎熱.
        var rowLeng = obj.GetRowCount();
        //alert("rowLeng : "+rowLeng);
            
        var colBGColor='255|255|255';
        
        
        for( var row=0 ; row<rowLeng ; row++ ){ //row熱虜躑 奩犒
        	colBGColor='232|245|213';
        	obj.SetCellBgColor("PO_QTY1", row, colBGColor);
        	obj.SetCellBgColor("PO_QTY2", row, colBGColor);
        	
			//Row 欽嬪煎鏽歲寡唳儀擊 掘碟и棻.
	        if(obj.GetCellValue('ITEM_ID',row) == "模啗")
	        {
	            
	            colBGColor='233|233|233';
	            
	            for( var col=1 ;col<=31 ;col++) 
	            {
	            	  //ROW掘碟 鏽歲 寡唳儀擊 雖薑и棻
	                obj.SetCellBgColor("RES_TP", row, colBGColor) ;
	                obj.SetCellBgColor("ITEM_ID", row, colBGColor);
	                obj.SetCellBgColor("ITEM_NAME", row, colBGColor);
	                obj.SetCellBgColor("W3_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("W1_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("SAFETY_STOCK", row, colBGColor);
	                obj.SetCellBgColor("BASE_STOCK", row, colBGColor);
	                obj.SetCellBgColor("MI_CHGO", row, colBGColor);
	                obj.SetCellBgColor("RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_1", row, colBGColor);
	                obj.SetCellBgColor("SALES_VS_WEEK1_AVG", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK", row, colBGColor);
	                obj.SetCellBgColor("N_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("RP1_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY1", row, colBGColor);
	                obj.SetCellBgColor("NWK_ADJ_QTY", row, colBGColor);
	                obj.SetCellBgColor("W1_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("W3_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("N_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_2", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK2", row, colBGColor);
	                obj.SetCellBgColor("NN_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("NN_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("RP2_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY2", row, colBGColor);
	                obj.SetCellBgColor("NN_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_3", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK3", row, colBGColor);
	                obj.SetCellBgColor("NNN_ACT_VS_STOCK_WORK", row, colBGColor);
	            }//鏽歲 儀艦ж朝 for僥 部.!!
	        }else if(obj.GetCellValue('ITEM_NAME',row) == "識啗"){
	        	colBGColor='222|222|222';
	            
	            for( var col=1 ;col<=31 ;col++) 
	            {
	            	//ROW掘碟 鏽歲 寡唳儀擊 雖薑и棻
	                obj.SetCellBgColor("RES_TP", row, colBGColor) ;
	                obj.SetCellBgColor("ITEM_ID", row, colBGColor);
	                obj.SetCellBgColor("ITEM_NAME", row, colBGColor);
	                obj.SetCellBgColor("W3_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("W1_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("SAFETY_STOCK", row, colBGColor);
	                obj.SetCellBgColor("BASE_STOCK", row, colBGColor);
	                obj.SetCellBgColor("MI_CHGO", row, colBGColor);
	                obj.SetCellBgColor("RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_1", row, colBGColor);
	                obj.SetCellBgColor("SALES_VS_WEEK1_AVG", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK", row, colBGColor);
	                obj.SetCellBgColor("N_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("RP1_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY1", row, colBGColor);
	                obj.SetCellBgColor("NWK_ADJ_QTY", row, colBGColor);
	                obj.SetCellBgColor("W1_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("W3_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("N_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_2", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK2", row, colBGColor);
	                obj.SetCellBgColor("NN_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("NN_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("RP2_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY2", row, colBGColor);
	                obj.SetCellBgColor("NN_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_3", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK3", row, colBGColor);
	                obj.SetCellBgColor("NNN_ACT_VS_STOCK_WORK", row, colBGColor);
	            }//鏽歲 儀艦ж朝 for僥 部.!!
	        }//if僥 部!
        }//row for僥 部!        
	}


 /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
   弛斜葬萄 鏽歲 熱薑衛 嫦儅ж朝 檜漸お!!
   戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
	function GridChangeCell(strColumnKey, nRow){

		chCellValue(strColumnKey, nRow);
	}
	
	
 /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
   弛斜葬萄 鏽歲 熱薑衛 翕晦��.
   戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/	
	function chCellValue(strColumnKey, nRow){
		
		var row_cnt = GridObj.GetRowCount();

		//離輿曖 儅骯в蹂榆擊 滲唳ц擊 唳辦 褒ч!!
		if(strColumnKey == "PO_QTY1"){
		
			//**************************************************
			//儅骯в蹂榆(離輿) 熱薑衛 蹂掘/儅骯離檜 濠翕啗骯 睡碟.
			//蹂掘/儅骯離檜 = 儅骯в蹂榆(離輿) - 爾醱蹂掘榆(離輿)
			//**************************************************
			var nProdQty = GridObj.GetCellValue("PO_QTY1", nRow);  	// 儅骯в蹂榆(離輿).
			var rp1_qty = GridObj.GetCellValue("RP1_QTY", nRow); 	// 爾醱蹂掘榆(離輿).
			var differ = numberFormat(strToNum(nProdQty) - strToNum(rp1_qty));

			GridObj.SetCellValue('NWK_ADJ_QTY',nRow,differ);
			
			//************************************************************************************
			//儅骯в蹂榆 熱薑衛 離離輿 蕨鼻營堅 濠翕啗骯 睡碟.
			//離離輿 蕨鼻營堅(離離輿) = 蕨鼻營堅(離輿蟾) + 儅骯в蹂榆(離輿) - っ衙啗��(離輿)
			//************************************************************************************
			var expert_stock = GridObj.GetCellValue("EXPERT_STOCK", nRow);	// 蕨鼻營堅(離輿蟾)
			var n_sales_plan = GridObj.GetCellValue("N_SALES_PLAN", nRow);	// っ衙啗��(離輿)
			var stock = numberFormat(strToNum(expert_stock) + strToNum(nProdQty) - strToNum(n_sales_plan));
	
			GridObj.SetCellValue('EXPERT_STOCK2',nRow,stock);
	
			//************************************************************************************
			//儅骯в蹂榆 熱薑衛 離離輿 啗�� 渠綠 營堅橾熱 濠翕啗骯 睡碟.
			//離離輿 啗�� 渠綠 營堅橾熱(離離輿) = 蕨鼻營堅(離離輿) * 艙機橾熱(離離輿) / っ衙啗��(離離輿)
			//************************************************************************************		
			var nnwk_work = GridObj.GetCellValue("NNWK_WORK", nRow); //離離輿 艙機橾熱
			var nnPlanVsStk;
			
			if(strToNum(n_sales_plan) == 0 ){ //っ衙啗�嘛� 0檜賊 999.
				nnPlanVsStk = 999;	
			}
			else if(strToNum(stock) <= 0){ // 蕨鼻營堅陛 0爾棻 濛剪釭 偽戲賊 0
				nnPlanVsStk = 0;	
			}
			else {
				nnPlanVsStk = strToNum(stock) * strToNum(nnwk_work) /  strToNum(n_sales_plan);
				nnPlanVsStk = Math.round(nnPlanVsStk*10)/10;
			}
	
			GridObj.SetCellValue('NN_PLAN_VS_STOCK_WORK',nRow,nnPlanVsStk);
			
			//************************************************************************************
			//儅骯в蹂榆 熱薑衛 離離輿 褒瞳渠綠營堅橾熱 濠翕啗骯 睡碟.
			//離離輿 褒瞳 渠綠 營堅 橾熱(離離輿) = 離離輿 蕨鼻營堅(new)(離離輿) / 1輿 ゎ敕 っ衙
			//************************************************************************************		
			var sales_mean_1week = GridObj.GetCellValue("SALES_MEAN_1WEEK", nRow); //1輿 ゎ敕っ衙
			
			var nnActVsStk;
			
			if(strToNum(sales_mean_1week) == 0 ){ //っ衙啗�嘛� 0檜賊 999.
				nnActVsStk = 999;	
			}
			else if(strToNum(stock) <= 0){ // 蕨鼻營堅陛 0爾棻 濛剪釭 偽戲賊 0
				nnActVsStk = 0;	
			}
			else {
				nnActVsStk = strToNum(stock) / strToNum(sales_mean_1week);
				nnActVsStk = Math.round(nnActVsStk*10)/10;
			}
			
			GridObj.SetCellValue('NN_ACT_VS_STOCK_WORK',nRow,nnActVsStk);
			
			//************************************************************************************
			//儅骯в蹂榆 熱薑衛 離離輿 晦蜓 蕨鼻營堅(離離輿) 濠翕啗骯 睡碟.
			//離離輿 晦蜓 蕨鼻營堅(離離輿) = [(蕨鼻營堅(離輿蟾) + 儅骯в蹂榆(離輿) - っ衙啗��(離輿))] + 離離輿 儅骯в蹂榆
			//							= 離離輿 蕨鼻營堅(離離輿) + 離離輿 儅骯в蹂榆
			//************************************************************************************
			var nProdQty2 = GridObj.GetCellValue("PO_QTY2", nRow); //離離輿 儅骯в蹂榆.
			var stock2 = numberFormat(strToNum(stock) + strToNum(nProdQty2));
			
			GridObj.SetCellValue('EXPERT_STOCK3',nRow,stock2);
	
			//************************************************************************************
			//儅骯в蹂榆 熱薑衛 離離輿 晦蜓 褒瞳渠綠營堅橾熱 濠翕啗骯 睡碟.
			//離離輿 晦蜓!! 褒瞳 渠綠 營堅 橾熱(離離輿) = [(離離輿 蕨鼻營堅(new)(離離輿)+ 離離輿 儅骯в蹂榆) / 1輿 ゎ敕 っ衙].
			//										= 離離輿 晦蜓蕨鼻營堅 / 1輿 ゎ敕っ衙
			//************************************************************************************		
			var nnActVsStk2;
			
			if(strToNum(sales_mean_1week) == 0 ){ //っ衙啗�嘛� 0檜賊 999.
				nnActVsStk2 = 999;	
			}
			else if(strToNum(stock2) <= 0){ // 蕨鼻營堅陛 0爾棻 濛剪釭 偽戲賊 0
				nnActVsStk2 = 0;	
			}
			else {
				nnActVsStk2 = strToNum(stock2) / strToNum(sales_mean_1week);
				nnActVsStk2 = Math.round(nnActVsStk2*10)/10;
			}
			
			GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',nRow,nnActVsStk2);		

		}//離輿曖 儅骯в蹂榆擊 滲唳ц擊 唳辦 if 僥 部!!!!!!!!!!!!!!!!!!!!!!!
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//離離輿曖 儅骯в蹂榆擊 滲唳ц擊唳辦 褒ч!!!
		if(strColumnKey == "PO_QTY2"){

			//************************************************************************************
			//離離輿!! 儅骯в蹂榆 熱薑衛 離離輿 晦蜓 蕨鼻營堅(離離輿) 濠翕啗骯 睡碟.
			//離離輿 晦蜓 蕨鼻營堅(離離輿) = [(蕨鼻營堅(離輿蟾) + 儅骯в蹂榆(離輿) - っ衙啗��(離輿))] + 離離輿 儅骯в蹂榆(離檜高)
			//************************************************************************************
			var expert_stock = GridObj.GetCellValue("EXPERT_STOCK", nRow);	// 蕨鼻營堅(離輿蟾)
			var nProdQty1 = GridObj.GetCellValue("PO_QTY1", nRow); 			// 儅骯в蹂榆(離輿)
			var n_sales_plan = GridObj.GetCellValue("N_SALES_PLAN", nRow);	// っ衙啗��(離輿)
			var nProdQty2 = GridObj.GetCellValue("PO_QTY2", nRow); 			// 儅骯в蹂榆(離離輿)
			
			var stock3 = strToNum(expert_stock) + strToNum(nProdQty1) - strToNum(n_sales_plan) + strToNum(nProdQty2);
			stock3 = numberFormat(stock3);

			GridObj.SetCellValue('EXPERT_STOCK3',nRow,stock3);

			//************************************************************************************
			//離離輿!! 儅骯в蹂榆 熱薑衛 離離輿 晦蜓 褒瞳渠綠營堅橾熱 濠翕啗骯 睡碟.
			//離離輿 晦蜓!! 褒瞳 渠綠 營堅 橾熱(離離輿) = [(離離輿 蕨鼻營堅(new)(離離輿) + 離離輿 儅骯в蹂榆(離檜高)) / 1輿 ゎ敕 っ衙]
			//************************************************************************************
			var sales_mean_1week = GridObj.GetCellValue("SALES_MEAN_1WEEK", nRow); //1輿 ゎ敕っ衙
			var nnActVsStk3;
			
			if(strToNum(sales_mean_1week) == 0 ){ //っ衙啗�嘛� 0檜賊 999.
				nnActVsStk3 = 999;	
			}
			else if(strToNum(stock3) <= 0){ // 蕨鼻營堅陛 0爾棻 濛剪釭 偽戲賊 0
				nnActVsStk3 = 0;	
			}
			else {
				nnActVsStk3 = strToNum(stock3) / strToNum(sales_mean_1week);
				nnActVsStk3 = Math.round(nnActVsStk3*10)/10;
			}

			GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',nRow,nnActVsStk3);					

		}//離離輿曖 儅骯в蹂榆擊 滲唳ц擊唳辦 if 僥 部!!!!!!!!!!


		////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////
		//**************************************************************************
		//模啗 塽 識啗睡碟 籀葬!!!!
		//**************************************************************************
		
		/***********************************/
		/*模啗 掘ж晦..滲熱 摹樹睡碟.
		/**********************************/
		//熱薑и 煎辦曖 撲綠嶸⑽高擊 盪濰!! 撲綠嶸⑽滌煎 模啗蒂 掘ж晦嬪п в蹂и 滲熱.
		var restpUp = GridObj.GetCellValue("RES_TP", nRow);
		
		var nTotPartProdQty = 0; //熱薑脹 離輿 儅骯в蹂榆曖 模啗蒂 盪濰ж朝 滲熱.
		var nTotPartProdQty_comma = 0;
		var nTotPartNwkAdjQty = 0; //熱薑脹 離輿 蹂掘 / 儅骯 離檜曖 模啗蒂 盪濰ж朝 滲熱.
		var nTotPartNwkAdjQty_comma = 0;
		var nEptStk2 = 0; //熱薑脹 離離輿 蕨鼻營堅 模啗蒂 盪濰ж朝 滲熱.
		var nEptStk2_comma = 0;
		var nNNPlanVsStk = 0; //熱薑脹 離離輿 啗�僑赮� 營堅橾熱 模啗蒂 盪濰ж朝 滲熱.
		var nNNPlanVsStk_comma = 0;
		var nNNActVsStk = 0; //熱薑脹 離離輿 褒瞳渠綠 營堅橾熱 模啗蒂 盪濰ж朝 滲熱
		var nNNActVsStk_comma = 0;
		
		var nTotPartProdQty2 = 0; //熱薑脹 離離輿 儅骯в蹂榆曖 模啗蒂 盪濰ж朝 滲熱.
		var nTotPartProdQty2_comma = 0;
		var nEptStk3 = 0; //熱薑脹 離離輿 晦蜓!! 蕨鼻營堅 模啗蒂 盪濰ж朝 滲熱.
		var nEptStk3_comma = 0;
		var nNNNActVsStk3 = 0; //熱薑脹 離離輿 晦蜓!! 褒瞳渠綠 營堅橾熱 模啗蒂 盪濰ж朝 滲熱.
		var nNNNActVsStk3_comma = 0;
		
		/***********************************/
		/*識啗 掘ж晦..滲熱 摹樹睡碟.
		/**********************************/
		var nTotProdQty = 0; //熱薑脹 離輿 儅骯в蹂榆曖 識啗蒂 盪濰ж朝 滲熱.
		var nTotProdQty_comma = 0;
		var nTotNwkAdjQty = 0; //熱薑脹 離輿 蹂掘 / 儅骯 離檜曖 識啗蒂 盪濰ж朝 滲熱.
		var nTotNwkAdjQty_comma = 0;
		var nTotEptStk2 = 0; //熱薑脹 離離輿 蕨鼻營堅 識啗蒂 盪濰ж朝 滲熱.
		var nTotEptStk2_comma = 0;
		var nTotNNPlanVsStk = 0; //熱薑脹 離離輿 啗�僑赮� 營堅橾熱 識啗蒂 盪濰ж朝 滲熱.
		var nTotNNPlanVsStk_comma = 0;
		var nTotNNActVsStk = 0; //熱薑脹 離離輿 褒瞳渠綠 營堅橾熱 識啗蒂 盪濰ж朝 滲熱
		var nTotNNActVsStk_comma = 0;
		
		var nTotProdQty2 = 0; //熱薑脹 離離輿 儅骯в蹂榆曖 識啗蒂 盪濰ж朝 滲熱.
		var nTotProdQty2_comma = 0;
		var nTotEptStk3 = 0; //熱薑脹 離離輿 晦蜓!! 蕨鼻營堅 識啗蒂 盪濰ж朝 滲熱.
		var nTotEptStk3_comma = 0;
		var nTotNNNActVsStk3 = 0; //熱薑脹 離離輿 晦蜓!! 褒瞳渠綠 營堅橾熱 識啗蒂 盪濰ж朝 滲熱.
		var nTotNNNActVsStk3_comma = 0;
	
// и偃曖 等檜攪陛 夥船賊... 陴錠辨
// 1. 斜 撲綠嶸⑽曖 賅萇 薯ヶ曖 薑爾蒂 鏃мп憮 渦и棻.
// 2. 模啗蒂 updateи棻.
// 3. 模啗菟擊 鏃мп憮 賅舒 渦и棻.
// 4. 識啗蒂 updateи棻.

		//1. 斜 撲綠嶸⑽曖 賅萇 薯ヶ曖 薑爾蒂 鏃мп憮 渦и棻.
		for(var i = 0 ; i < row_cnt ; i++){

			//撲綠嶸⑽滌煎 模啗蒂 衙晦晦嬪и 褻勒!
			if(GridObj.GetCellValue("RES_TP", i) == restpUp && GridObj.GetCellValue("ITEM_ID", i) != "模啗" ){

				nTotPartProdQty = strToNum(nTotPartProdQty) + strToNum(GridObj.GetCellValue("PO_QTY1", i)); //離輿 儅骯в蹂榆 模啗
				nTotPartNwkAdjQty = strToNum(nTotPartNwkAdjQty) + strToNum(GridObj.GetCellValue("NWK_ADJ_QTY", i)); //離輿 蹂掘/儅骯離檜 模啗
				nEptStk2 = strToNum(nEptStk2) + strToNum(GridObj.GetCellValue("EXPERT_STOCK2", i)); //離離輿 蕨鼻營堅 模啗
				//alert("nEptStk2 : "+nEptStk2);
				nNNPlanVsStk = strToNum(nNNPlanVsStk) + strToNum(GridObj.GetCellValue("NN_PLAN_VS_STOCK_WORK", i)); //離離輿 啗�僑赮� 營堅橾熱 模啗.
				nNNActVsStk = strToNum(nNNActVsStk) + strToNum(GridObj.GetCellValue("NN_ACT_VS_STOCK_WORK", i)); //離離輿 褒瞳渠綠 營堅橾熱 模啗.
				
				nTotPartProdQty2 = strToNum(nTotPartProdQty2) + strToNum(GridObj.GetCellValue("PO_QTY2", i)); //離離輿 儅骯в蹂榆 模啗.
				nEptStk3 = strToNum(nEptStk3) + strToNum(GridObj.GetCellValue("EXPERT_STOCK3", i)); //離離輿 晦蜓 蕨鼻營堅 模啗.
				nNNNActVsStk3 = strToNum(nNNNActVsStk3) + strToNum(GridObj.GetCellValue("NNN_ACT_VS_STOCK_WORK", i)); //離離輿 晦蜓!! 褒瞳渠綠 營堅橾熱 模啗.
			}
		}

		//2. 模啗蒂 updateи棻.
		for(var i = 0 ; i < row_cnt ; i++){

			//撲綠嶸⑽滌煎 模啗蒂 衙晦晦嬪и 褻勒!
			if(GridObj.GetCellValue("RES_TP", i) == restpUp && GridObj.GetCellValue("ITEM_ID", i) == "模啗" ){

				//離輿 儅骯в蹂榆 模啗 睡碟 轎溘!
				nTotPartProdQty_comma = numberFormat(nTotPartProdQty); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('PO_QTY1',i,nTotPartProdQty_comma);
				
				//離輿 蹂掘/儅骯 離檜曖 模啗 睡碟 轎溘!
				nTotPartNwkAdjQty_comma = numberFormat(nTotPartNwkAdjQty); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('NWK_ADJ_QTY',i,nTotPartNwkAdjQty_comma);
				
				//離離輿 蕨鼻營堅 模啗 睡碟 轎溘!
				nEptStk2_comma = numberFormat(nEptStk2); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('EXPERT_STOCK2',i,nEptStk2_comma);
				
				//離離輿 啗�僑赮� 營堅橾熱 模啗 睡碟 轎溘!
				nNNPlanVsStk_comma = Math.round(nNNPlanVsStk*10)/10; //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('NN_PLAN_VS_STOCK_WORK',i,nNNPlanVsStk_comma);
				
				//離離輿 褒瞳渠綠 營堅橾熱 模啗 睡碟 轎溘!
				nNNActVsStk_comma = Math.round(nNNActVsStk*10)/10; //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('NN_ACT_VS_STOCK_WORK',i,nNNActVsStk_comma);
				
				
				
				//離離輿 儅骯в蹂榆 模啗 睡碟 轎溘!
				nTotPartProdQty2_comma = numberFormat(nTotPartProdQty2); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('PO_QTY2',i,nTotPartProdQty2_comma);
				
				//離離輿 晦蜓!! 蕨鼻營堅 模啗 睡碟 轎溘!
				nEptStk3_comma = numberFormat(nEptStk3); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('EXPERT_STOCK3',i,nEptStk3_comma);
				
				//離離輿 晦蜓!! 褒瞳渠綠 營堅橾熱 模啗 睡碟 轎溘!
				nNNNActVsStk3_comma = Math.round(nNNNActVsStk3*10)/10; //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',i,nNNNActVsStk3_comma);
			}
		}
			
		//3. 模啗菟擊 鏃мп憮 賅舒 渦и棻.
		for(var i = 0 ; i < row_cnt ; i++){

			if(GridObj.GetCellValue("ITEM_ID", i) == "模啗"){
				nTotProdQty = strToNum(nTotProdQty) + strToNum(GridObj.GetCellValue("PO_QTY1", i)); //離輿 儅骯в蹂榆 識啗
				nTotNwkAdjQty = strToNum(nTotNwkAdjQty) + strToNum(GridObj.GetCellValue("NWK_ADJ_QTY", i)); //離輿 蹂掘/儅骯離檜 識啗
				nTotEptStk2 = strToNum(nTotEptStk2) + strToNum(GridObj.GetCellValue("EXPERT_STOCK2", i)); //離離輿 蕨鼻營堅 識啗
				nTotNNPlanVsStk = strToNum(nTotNNPlanVsStk) + strToNum(GridObj.GetCellValue("NN_PLAN_VS_STOCK_WORK", i)); //離離輿 啗�僑赮� 營堅橾熱 識啗.
				nTotNNActVsStk = strToNum(nTotNNActVsStk) + strToNum(GridObj.GetCellValue("NN_ACT_VS_STOCK_WORK", i)); //離離輿 褒瞳渠綠 營堅橾熱 識啗.
				
				nTotProdQty2 = strToNum(nTotProdQty2) + strToNum(GridObj.GetCellValue("PO_QTY2", i)); //離離輿 儅骯в蹂榆 識啗.
				nTotEptStk3 = strToNum(nTotEptStk3) + strToNum(GridObj.GetCellValue("EXPERT_STOCK3", i)); //離離輿 晦蜓 蕨鼻營堅 識啗.
				nTotNNNActVsStk3 = strToNum(nTotNNNActVsStk3) + strToNum(GridObj.GetCellValue("NNN_ACT_VS_STOCK_WORK", i)); //離離輿 晦蜓!! 褒瞳渠綠 營堅橾熱 識啗.
			}
		}

		// 4. 識啗蒂 updateи棻.
		for(var i = 0 ; i < row_cnt ; i++){

			//識啗蒂 掘ж晦嬪и 褻勒僥菟.
			if(GridObj.GetCellValue("ITEM_NAME", i) == "識啗"){
				//離輿 儅骯в蹂榆 識啗 睡碟 轎溘!
				//alert("nTotProdQty : "+nTotProdQty);
				nTotProdQty_comma = numberFormat(nTotProdQty); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('PO_QTY1',i,nTotProdQty_comma);
				
				//離輿 蹂掘/儅骯 離檜曖 識啗 睡碟 轎溘!
				nTotNwkAdjQty_comma = numberFormat(nTotNwkAdjQty); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('NWK_ADJ_QTY',i,nTotNwkAdjQty_comma);
				
				//離離輿 蕨鼻營堅 識啗 睡碟 轎溘!
				nTotEptStk2_comma = numberFormat(nTotEptStk2); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('EXPERT_STOCK2',i,nTotEptStk2_comma);
				
				//離離輿 啗�僑赮� 營堅橾熱 識啗 睡碟 轎溘!
				nTotNNPlanVsStk_comma = Math.round(nTotNNPlanVsStk*10)/10; //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('NN_PLAN_VS_STOCK_WORK',i,nTotNNPlanVsStk_comma);
				
				//離離輿 褒瞳渠綠 營堅橾熱 識啗 睡碟 轎溘!
				nTotNNActVsStk_comma = Math.round(nTotNNActVsStk*10)/10; //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('NN_ACT_VS_STOCK_WORK',i,nTotNNActVsStk_comma);
				
				//離離輿 儅骯в蹂榆 識啗 睡碟 轎溘!
				nTotProdQty2_comma = numberFormat(nTotProdQty2); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('PO_QTY2',i,nTotProdQty2_comma);
				
				//離離輿 晦蜓!! 蕨鼻營堅 識啗 睡碟 轎溘!
				nTotEptStk3_comma = numberFormat(nTotEptStk3); //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('EXPERT_STOCK3',i,nTotEptStk3_comma);
				
				//離離輿 晦蜓!! 褒瞳渠綠 營堅橾熱 識啗 睡碟 轎溘!
				nTotNNNActVsStk3_comma = Math.round(nTotNNNActVsStk3*10)/10; //巍葆 鎰橫輿晦.
				GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',i,nTotNNNActVsStk3_comma);				
			}
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
    	
    }  
	
	