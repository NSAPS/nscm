//############################################################
//## Щ煎斜極ID      : sc_17010_Production_base_list_new.vm
//## Щ煎斜極貲      : 熱轎螃渦 儅骯蹂羶橾 婦葬
//## 偃嫦濠          : 陴錠辨
//## 偃嫦橾濠        : 2009-07-20
//##
//## 婦溼 job file   : job_sinc_20_scheduling_04.xml
//## 婦溼 query file : query_sinc_20_scheduling_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-20  陴錠辨      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_17010_Production_base_list_new';
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
   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	//GridObj.strActiveRowBgColor = "170|170|170";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
    
    // 蝶觼煤 樓紫 : page 欽嬪 scroll ->晦獄擎 'default'
    GridObj.strMouseWheelAction='page';   
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;       
    
    
    
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	var cnfm_date = document.all.cnfm_date.value;

	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "sc_17010_W1_DAY",{
		callback:function(result){
		var sc_17010_W1_DAY = result[0][0];
		
	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100    ,50  ,false);
	GridObj.AddHeader("ITEM_ID"			,"ヶ跡囀萄"       	,"t_text" 	,20		,70  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"ヶ跡頂羲"       	,"t_text" 	,400	,170 ,false); //0   
 	GridObj.AddHeader("W0_BASE_STOCK"	,"晦蟾營堅"       	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W0_PROD_QTY"		,"渡輿\n儅骯啗��"     	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W0_DEMEND"		,"熱蹂蕨難"       	,"t_number" ,20.3	,71  ,false); //0   
//	GridObj.AddHeader("W0_SALES_PLAN"	,"っ衙啗��"       	,"t_number" ,20.3	,71 ,false); //0   
 	GridObj.AddHeader("W0_SUPPLY_PLAN"	,"奢晝啗��"       	,"t_number" ,20.3	,71  ,false); //0
 	// -------------------W+1-------------------------   
			
 	
 	GridObj.AddHeader("W1_EXPT_STOCK"	,"W+1輿\n蕨鼻營堅"	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W1_PLAN_PER_ACT"	,"蕨難渠綠\n啗�劃魊�"	,"t_number" ,20.3	,66  ,false); //0   

 	GridObj.AddHeader("WEEK_GUBN_NAME"	,"輿蟾\n掘碟"       	,"t_text" ,20	,50 ,false); //0
 	GridObj.AddHeader("FRC_QTY"	,"餌辨濠\n蕨難"       	,"t_number" ,20.3	,71 ,false); //0
 	//  	
 	GridObj.AddHeader("W1_PROD_QTY"		,"儅骯啗��"       	,"t_number" ,20.3	,71  ,true); //0  
 	GridObj.AddHeader("W1_DEMEND"		,"熱蹂蕨難"    		,"t_number" ,20.3	,71  ,false); //0
 	GridObj.AddHeader("W1_SALES_PLAN"	,"っ衙啗��"    		,"t_number" ,20.3	,71  ,false); //0
 	GridObj.AddHeader("W1_SUPPLY_PLAN"	,"奢晝啗��"    		,"t_number" ,20.3	,71  ,false); //0
 	// -------------------W+2-------------------------   
 	GridObj.AddHeader("W2_EXPT_STOCK"	,"W+2輿\n蕨鼻營堅"   	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W2_BASE_STOCK"	,"W+2輿\n晦遽營堅"	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("BASE_DAY"		,"晦遽橾熱"    		,"t_number" ,20.3	,71  ,true); //0
 	GridObj.AddHeader("SALES_MEAN_3WEEK","3輿ゎ敕っ衙"    	,"t_number" ,20.3	,71  ,false); //0
 	GridObj.AddHeader("SALES_MEAN_1WEEK","1輿ゎ敕っ衙"    	,"t_number" ,20.3	,71  ,false); //0
 	// -------------------W+3-------------------------   
 	GridObj.AddHeader("W3_DEMEND"		,"熱蹂蕨難"    		,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W3_SALES_PLAN"	,"W+3輿\nっ衙啗��"	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W3_SUPPLY_PLAN"	,"奢晝啗��"    		,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W3_PLAN_PER_ACT"	,"蕨難渠綠\n啗�劃魊�"	,"t_number" ,20.3	,66  ,false); //0   
 	GridObj.AddHeader("W3_PROD_QTY"		,"儅骯啗��"    		,"t_number" ,20.3	,71  ,true); //0   
 	GridObj.AddHeader("W4_EXPT_STOCK"	,"W+3輿\n蕨鼻營堅"   	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W4_BASE_STOCK"	,"W+3輿\n晦遽營堅"   	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("DATA_FLAG"		,"DATA_FLAG"   		,"t_text"	,20		,0  ,false); //0

	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	
	GridObj.SetColFix('ITEM_NAME');
	
	GridObj.SetNumberFormat("W0_BASE_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W0_PROD_QTY"  	,"#,##0.#");
	GridObj.SetNumberFormat("W0_DEMEND"  	,"#,##0.#");
//	GridObj.SetNumberFormat("W0_SALES_PLAN" ,"#,##0.#");
	GridObj.SetNumberFormat("W0_SUPPLY_PLAN","#,##0.#");
	GridObj.SetNumberFormat("W1_EXPT_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W1_PLAN_PER_ACT"  , "#,##0.##");
	
	GridObj.SetNumberFormat("FRC_QTY"  	,"#,##0");
	
	GridObj.SetNumberFormat("W1_PROD_QTY"  	,"#,##0.#");
	GridObj.SetNumberFormat("W1_DEMEND"  	,"#,##0.#");
	GridObj.SetNumberFormat("W1_SALES_PLAN" ,"#,##0.#");
	GridObj.SetNumberFormat("W1_SUPPLY_PLAN","#,##0.#");
	GridObj.SetNumberFormat("W2_EXPT_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W2_BASE_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("BASE_DAY"  	,"#,##0.#");
	GridObj.SetNumberFormat("SALES_MEAN_3WEEK"  ,"#,##0.#");
	GridObj.SetNumberFormat("SALES_MEAN_1WEEK"  ,"#,##0.#");
	GridObj.SetNumberFormat("W3_DEMEND"  	,"#,##0.#");
	GridObj.SetNumberFormat("W3_SALES_PLAN" ,"#,##0.#");
	GridObj.SetNumberFormat("W3_SUPPLY_PLAN","#,##0.#");
	GridObj.SetNumberFormat("W3_PLAN_PER_ACT"  ,"#,##0.##");
	GridObj.SetNumberFormat("W3_PROD_QTY"  	,"#,##0.#");
	GridObj.SetNumberFormat("W4_EXPT_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W4_BASE_STOCK" ,"#,##0.#");

  
	GridObj.SetColCellAlign('ITEM_ID','center');
	GridObj.SetColCellAlign('WEEK_GUBN_NAME','center');
	//Hidden 鏽歲  
	GridObj.SetColHide("CRUD",true);		
		
		
		
		
		
		
		}
	});   



       
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
	
	//alert("GoSave")
	//return;

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("user_id", document.frm._user_id.value);
	var cnfm_date = document.frm.cnfm_date.value;
	GridObj.SetParam("cnfm_date", cnfm_date);
	
	var data_flag = GridObj.GetCellValue("DATA_FLAG", 1);
	
	//if(data_flag == 'Y'){
		//alert("機等檜お й陽")
		//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
		//GridObj.SetParam("mode", "save");
		//GridObj.DoQuery(servlet_url, "CRUD");		
	//}else{
		//alert("蟾晦 盪濰")
		
			var in_paramKey = "cnfm_date";
			var in_paramCode = cnfm_date;
			commonUtil.getCodeInfo(in_paramKey,in_paramCode,"sc_17010_GET_PLANT_ALLOC_VERSION", { 
				callback:function(arrList){
					if( arrList.length == 1 ) {
					//if( arrList[0][0] == '') {
					plant_alloc_version = arrList[0][0];
						if(plant_alloc_version == null || plant_alloc_version == '' ){
							"啗�� 熱董橾檜 嬴椎棲棻. 啗�匱鷏鹿牁�  撲薑ж堅 棻衛 濛機п輿衛晦 夥奧棲棻."
							return;
						}else{
							//alert(plant_alloc_version)
							//return;
							GridObj.SetParam("plant_alloc_version", 		plant_alloc_version);
							GridObj.SetParam("mode", "save");  //cre_data
							//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
							GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
						}		
					}else {
						
					}
				}
			});			
	//}
	

}


      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var cnfm_date = document.all.cnfm_date.value;
       //var in_to_date   = document.all.in_to_date.value;
       //var in_mto_mts   = document.all.mto_mts.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("cnfm_date", cnfm_date);
       //GridObj.SetParam("in_to_date", in_to_date);
       //GridObj.SetParam("in_mto_mts", in_mto_mts);
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

			     //
			    //GridObj.SetColCellAlign('PROD_REQ_DATE','center'); 

			    //GridObj.SetNumberFormat('IPGO','#,##0');
			    // 

	        	var row_cnt = GridObj.GetRowCount();
				var colBGColor='232|245|213';
				
				for( var i=0 ;i<row_cnt ;i++) //瞪羹 Row虜躑 奩犒 и棻.
		        {
		          // GridObj.SetCellBgColor("PROD_REQ_DATE", i, colBGColor); 
			    GridObj.SetCellBgColor('W1_PROD_QTY', i, '255|255|0'); 
			    GridObj.SetCellBgColor('BASE_DAY', i, '255|255|0'); 
			    GridObj.SetCellBgColor('W3_PROD_QTY', i, '255|255|0'); 
		            
		        }
                                             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
}
        }
        else if(endMode == "save") {
			if(GridObj.GetStatus() == "true") {// 
				GridObj.focus();		
			} else {
				var error_msg = GridObj.GetMessage();// 
				alert(error_msg);			
			}
			
			doQuery()   // 盪濰 諫猿�� 給嬴螢陽朝 �飛橉� 營褻�� и棻. 
        }
		
    }

// 摹鷗и row縑 儅骯蹂羶橾 橾婪瞳辨
function applyProdReq(){
	
	var sel_data = GridObj.GetSelectedCells(); // 摹鷗и 睡碟曖 key諦 row蒂 陛螳螞棻
	var i=0;
	var rowNo;
	
	var in_appl_date = delDateDelimiter(document.all.in_appl_date.value);

	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 渦檜鼻 等檜攪 橈棻
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//п渡 row縑 check蒂 и棻
			GridObj.SetCellValue("PROD_REQ_DATE", rowNo, in_appl_date);
		}
		i++;
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
	
    //alert("strColumnKey="+strColumnKey);
	// 觼啪 晦遽營堅 滲唳衛 諦 儅骯в蹂榆 熱薑衛 煎霜檜 ぎ溥撿л..
	if(strColumnKey == 'BASE_DAY'){
		cal_base_stock(nRow)
	}else if(strColumnKey == 'W1_PROD_QTY'){
		cal_change_prod_qty1(nRow);
	}else if(strColumnKey == 'W3_PROD_QTY'){
		cal_change_prod_qty2(nRow);
	}
}

function cal_base_stock(nRow){
	var base_day		 = Number(GridObj.GetCellValue("BASE_DAY", nRow));
	var sales_mean_1week = Number(GridObj.GetCellValue("SALES_MEAN_1WEEK", nRow));
	var sales_mean_3week = Number(GridObj.GetCellValue("SALES_MEAN_3WEEK", nRow));
	
	var sales_mean_13week = (sales_mean_1week+sales_mean_3week)/2;
	
	sales_mean_13week = Math.round(sales_mean_13week * 1)/1;
	
	var base_stock = sales_mean_13week *base_day;
	
	GridObj.SetCellValue("W2_BASE_STOCK", nRow, base_stock);
	GridObj.SetCellValue("W4_BASE_STOCK", nRow, base_stock);
	
	
	cal_change_base_day(nRow)
}

function cal_change_base_day(nRow){
	//1 晦遽營堅 滲唳 -> 2 儅骯啗�� 滲唳-> 3蕨鼻營堅滲唳
    var w2_base_stock	= Number(GridObj.GetCellValue("W2_BASE_STOCK", nRow)); //離離輿 晦遽營堅 W+2 
    var w0_supply_plan	= Number(GridObj.GetCellValue("W0_SUPPLY_PLAN", nRow)); //奢晝啗��
    var w1_expt_stock	= Number(GridObj.GetCellValue("W1_EXPT_STOCK", nRow)); //離輿蕨鼻營堅 W+1 
	var w1_prod_qty		= Number(GridObj.GetCellValue("W1_PROD_QTY", nRow)); // 離離輿 蕨鼻營堅 W+2
	var w2_expt_stock	= Number(GridObj.GetCellValue("W2_EXPT_STOCK", nRow)); // 離離輿 蕨鼻營堅 W+2
	var w3_prod_qty		= Number(GridObj.GetCellValue("W3_PROD_QTY", nRow)); // 離離輿 蕨鼻營堅 W+2
	var w3_supply_plan	= Number(GridObj.GetCellValue("W3_SUPPLY_PLAN", nRow)); //奢晝啗��
	var w4_expt_stock	= Number(GridObj.GetCellValue("W4_EXPT_STOCK", nRow)); // 離離輿 蕨鼻營堅 W+2

	// 1. W+1 晦遽營堅 滲唳衛 - > W+1 儅骯 в蹂榆 滲唳 
	// 離輿 儅骯 в蹂 僭榆 = 奢晝啗�� + 離離輿 晦遽營堅 - 離輿蕨鼻營堅 
	w1_prod_qty = w0_supply_plan +  w2_base_stock - w1_expt_stock;
	GridObj.SetCellValue("W1_PROD_QTY", nRow, w1_prod_qty);

	//2. 儅骯啗�� 滲唳�� 離離輿 蕨鼻營堅 滲唳..
	//--離輿輿蟾蕨鼻營堅 + 儅骯啗�� - 奢晝啗��
	w2_expt_stock = w1_expt_stock + w1_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W2_EXPT_STOCK", nRow, w2_expt_stock); 
	
	//3. 離離輿 儅骯 в蹂榆 滲唳.
	//W3_PROD_QTY = 奢晝啗�� + 離離輿 晦遽營堅 - 離輿蕨鼻營堅(W2_EXPT_STOCK)
	w3_prod_qty = w3_supply_plan +  w2_base_stock - w2_expt_stock;
	GridObj.SetCellValue("W3_PROD_QTY", nRow, w3_prod_qty);
	
	//4. 離離離輿 蕨鼻營堅 滲唳.
	w4_expt_stock = w2_expt_stock + w3_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W4_EXPT_STOCK", nRow, w4_expt_stock);	
	
}

function cal_change_prod_qty1(nRow){
	//1 晦遽營堅 滲唳 -> 2 儅骯啗�� 滲唳-> 3蕨鼻營堅滲唳
    var w2_base_stock	= Number(GridObj.GetCellValue("W2_BASE_STOCK", nRow)); //離離輿 晦遽營堅 W+2 
    var w0_supply_plan	= Number(GridObj.GetCellValue("W0_SUPPLY_PLAN", nRow)); //奢晝啗��
    var w1_expt_stock	= Number(GridObj.GetCellValue("W1_EXPT_STOCK", nRow)); //離輿蕨鼻營堅 W+1 
	var w1_prod_qty		= Number(GridObj.GetCellValue("W1_PROD_QTY", nRow)); // 離離輿 蕨鼻營堅 W+2
	var w2_expt_stock	= Number(GridObj.GetCellValue("W2_EXPT_STOCK", nRow)); // 離離輿 蕨鼻營堅 W+2
	var w3_prod_qty		= Number(GridObj.GetCellValue("W3_PROD_QTY", nRow)); // 離離輿 蕨鼻營堅 W+2
	var w3_supply_plan	= Number(GridObj.GetCellValue("W3_SUPPLY_PLAN", nRow)); //奢晝啗��
	var w4_expt_stock	= Number(GridObj.GetCellValue("W4_EXPT_STOCK", nRow)); // 離離輿 蕨鼻營堅 W+2

	// 1. W+1 晦遽營堅 滲唳衛 - > W+1 儅骯 в蹂榆 滲唳 
	// 離輿 儅骯 в蹂 僭榆 = 奢晝啗�� + 離離輿 晦遽營堅 - 離輿蕨鼻營堅 
	//w1_prod_qty = w0_supply_plan +  w2_base_stock - w1_expt_stock;
	//GridObj.SetCellValue("W1_PROD_QTY", nRow, w1_prod_qty);

	//2. 儅骯啗�� 滲唳�� 離離輿 蕨鼻營堅 滲唳..
	//--離輿輿蟾蕨鼻營堅 + 儅骯啗�� - 奢晝啗��
	w2_expt_stock = w1_expt_stock + w1_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W2_EXPT_STOCK", nRow, w2_expt_stock); 
	
	//3. 離離輿 儅骯 в蹂榆 滲唳.
	//W3_PROD_QTY = 奢晝啗�� + 離離輿 晦遽營堅 - 離輿蕨鼻營堅(W2_EXPT_STOCK)
	w3_prod_qty = w3_supply_plan +  w2_base_stock - w2_expt_stock;
	GridObj.SetCellValue("W3_PROD_QTY", nRow, w3_prod_qty);
	
	//4. 離離離輿 蕨鼻營堅 滲唳.
	w4_expt_stock = w2_expt_stock + w3_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W4_EXPT_STOCK", nRow, w4_expt_stock);	

	
}

function cal_change_prod_qty2(nRow){
	//1 晦遽營堅 滲唳 -> 2 儅骯啗�� 滲唳-> 3蕨鼻營堅滲唳
    var w2_base_stock	= Number(GridObj.GetCellValue("W2_BASE_STOCK", nRow)); //離離輿 晦遽營堅 W+2 
    var w0_supply_plan	= Number(GridObj.GetCellValue("W0_SUPPLY_PLAN", nRow)); //奢晝啗��
    var w1_expt_stock	= Number(GridObj.GetCellValue("W1_EXPT_STOCK", nRow)); //離輿蕨鼻營堅 W+1 
	var w1_prod_qty		= Number(GridObj.GetCellValue("W1_PROD_QTY", nRow)); // 離離輿 蕨鼻營堅 W+2
	var w2_expt_stock	= Number(GridObj.GetCellValue("W2_EXPT_STOCK", nRow)); // 離離輿 蕨鼻營堅 W+2
	var w3_prod_qty		= Number(GridObj.GetCellValue("W3_PROD_QTY", nRow)); // 離離輿 蕨鼻營堅 W+2
	var w3_supply_plan	= Number(GridObj.GetCellValue("W3_SUPPLY_PLAN", nRow)); //奢晝啗��
	var w4_expt_stock	= Number(GridObj.GetCellValue("W4_EXPT_STOCK", nRow)); // 離離輿 蕨鼻營堅 W+2

	// 1. W+1 晦遽營堅 滲唳衛 - > W+1 儅骯 в蹂榆 滲唳 
	// 離輿 儅骯 в蹂 僭榆 = 奢晝啗�� + 離離輿 晦遽營堅 - 離輿蕨鼻營堅 
	//w1_prod_qty = w0_supply_plan +  w2_base_stock - w1_expt_stock;
	//GridObj.SetCellValue("W1_PROD_QTY", nRow, w1_prod_qty);

	//2. 儅骯啗�� 滲唳�� 離離輿 蕨鼻營堅 滲唳..
	//--離輿輿蟾蕨鼻營堅 + 儅骯啗�� - 奢晝啗��
	//w2_expt_stock = w1_expt_stock + w1_prod_qty - w0_supply_plan;  
	//GridObj.SetCellValue("W2_EXPT_STOCK", nRow, w2_expt_stock); 
	
	//3. 離離輿 儅骯 в蹂榆 滲唳.
	//W3_PROD_QTY = 奢晝啗�� + 離離輿 晦遽營堅 - 離輿蕨鼻營堅(W2_EXPT_STOCK)
	//w3_prod_qty = w3_supply_plan +  w2_base_stock - w2_expt_stock;
	//GridObj.SetCellValue("W3_PROD_QTY", nRow, w3_prod_qty);
	
	//4. 離離離輿 蕨鼻營堅 滲唳.
	w4_expt_stock = w2_expt_stock + w3_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W4_EXPT_STOCK", nRow, w4_expt_stock);	

	
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
    