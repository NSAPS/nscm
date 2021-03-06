//############################################################
//## Щ煎斜極ID		: ip_02090_hawastockSupportPlan_list.js
//## Щ煎斜極貲		: 鼻ヶ 營堅爾醱 啗�� 儅撩
//## 偃嫦濠			: 辦謙敕
//## 偃嫦橾濠			: 2011-11-28
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2011-11-28  辦謙敕      update
//##
//############################################################



/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_02090_hawastockSupportPlan_list';
var GridObj ; 													// WiseGrid 偌羹

var color_tot			= '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col		= '255|253|208';

var color_sp			= '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row	= '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01				= '224|255|224';			//255|255|153
var colBg02				= '255|255|255';


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

    GridObj.nHDLineSize         	= 26; //Header Size
    GridObj.strHDClickAction    	= "sortsingle";
 	
 	GridObj.strActiveRowBgColor		= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor	= '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor	= '0|0|0'; 
	GridObj.strMouseWheelAction		= 'page'; // page 欽嬪 scroll ->晦獄擎 'default'    

	GridObj.nHDLines				= 2;  
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	GridObj.AddHeader("ITEM_ID"				,"薯ヶ囀萄"   			,"t_text" 		,100	,60  ,false); //0
	GridObj.AddHeader("ITEM_NAME"			,"薯ヶ貲"   				,"t_text" 		,100	,165 ,false); //0
	GridObj.AddHeader("DC_ID"				,"DC_ID"    			,"t_text" 		,100    ,40  ,false);
 	GridObj.AddHeader("DC_NAME"				,"DC貲"   				,"t_text" 		,100	,60  ,false); //0   
 	
 	GridObj.AddHeader("CD_SRC_LOC"			,"輿轎堅濰"  				,"t_text" 		,100	,0  ,false); //0	//輿轎堅濰//
 	
 	//GridObj.AddHeader("CD_FLAG1"			,"C/D"  				,"t_text" 		,100	,50  ,false); //0	//輿轎堅濰//
 	GridObj.AddHeader("SAFETY_STOCK"		,"寰瞪營堅"   			,"t_number" 	,100.3	,40  ,true); //0   
 	GridObj.AddHeader("SAFETY_STOCK_FLAG"	,"SAFETY_STOCK_FLAG"   	,"t_text" 		,100	,0  ,false); //0
 	
 	GridObj.AddHeader("CD_FLAG"				,"C/D罹睡"   			,"t_checkbox" 	,2		,30  ,true); //0
 	GridObj.AddHeader("SALES_MEAN_3MONTH"	,"3偃錯 錯 ゎ敕"   		,"t_number" 	,100.3	,50 ,false); //0
 	
 	GridObj.AddHeader("PRE_MONTH_SELL"		,"瞪錯っ衙"   			,"t_number" 	,100.3	,40 ,false); //0   
 	GridObj.AddHeader("SALES_PRE_CUM"		,"っ衙援啗"      			,"t_number" 	,100.3	,40 ,false); //0
 	
 	GridObj.AddHeader("SALES_MEAN_1WEEK"	,"1輿 ゎ敕"   			,"t_number" 	,100.3	,35 ,false); //0   
 	GridObj.AddHeader("SALES_MEAN_3WEEK"	,"3輿 ゎ敕"      			,"t_number" 	,100.3	,35 ,false); //0
 	
 	GridObj.AddHeader("BASE_STOCK"			,"渡橾\n營堅"   			,"t_number" 	,100.3	,40 ,false); //0   
 	GridObj.AddHeader("IPGO_EXPT"			,"殮堅\n蕨薑"     		,"t_number" 	,100.3	,40 ,false); //0
 	
 	GridObj.AddHeader("CHGO_EXPT"			,"轎堅\n蕨薑"   			,"t_number" 	,100.3	,40 ,false); //0   
 	GridObj.AddHeader("FINISH_STOCK"		,"葆馬\n營堅"     		,"t_number" 	,100.3	,40 ,false); //0
 	
 	GridObj.AddHeader("STOCK_DAY_1W"		,"營堅橾熱\n(1輿)"  		,"t_number" 	,100.3	,60	,false); //0   
 	GridObj.AddHeader("STOCK_DAY_3W"		,"營堅橾熱\n(3輿)"  		,"t_number" 	,100.3	,60 ,false); //0
 	
 	GridObj.AddHeader("STOCK_TERM"			,"營堅\n晦除"   			,"t_number" 	,100.3	,0  ,false); //0
 	GridObj.AddHeader("DC_ALLOC"			,"蕨鼻\n嫦輿榆"   		,"t_number" 	,100.3	,50 ,false); //0

    GridObj.AddHeader("PAL_QTY"			    ,"PALET\n熱榆"   		,"t_number" 	,100.3	,0 ,false); //0
    
    GridObj.AddHeader("D1_QTY"				,"D+1\n�挨仄�"   			,"t_number" 	,100.3	,45  ,true); //0		//D+1	嫦輿榆//
    GridObj.AddHeader("D2_QTY"				,"D+2\n�挨仄�"   			,"t_number" 	,100.3	,45  ,true); //0		//D+2	嫦輿榆//
    GridObj.AddHeader("D3_QTY"				,"D+3\n�挨仄�"   			,"t_number" 	,100.3	,45  ,true); //0		//D+3	嫦輿榆//
    GridObj.AddHeader("D4_QTY"				,"D+4\n�挨仄�"   			,"t_number" 	,100.3	,45  ,true); //0		//D+4	嫦輿榆//
    GridObj.AddHeader("D5_QTY"				,"D+5\n�挨仄�"   			,"t_number" 	,100.3	,45  ,true); //0		//D+5	嫦輿榆//
    GridObj.AddHeader("D6_QTY"				,"D+6\n�挨仄�"   			,"t_number" 	,100.3	,45  ,true); //0		//D+6	嫦輿榆//
    GridObj.AddHeader("TOT"					,"м啗"   				,"t_number" 	,100.3	,40 ,false); //0	//TOT	//м啗//
    
    /* 檜醞 п渦 蹺陛 */
	GridObj.AddGroup("HD1",    "渡橾");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("HD1",	  	  "BASE_STOCK");
	GridObj.AppendHeader("HD1",   	   "IPGO_EXPT");
	GridObj.AppendHeader("HD1",		   "CHGO_EXPT");
	GridObj.AppendHeader("HD1",		"FINISH_STOCK");
	GridObj.AppendHeader("HD1",		"STOCK_DAY_1W");
	GridObj.AppendHeader("HD1",		"STOCK_DAY_3W");
	GridObj.AppendHeader("HD1",		  "STOCK_TERM");		
	
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID'			  ,'left');
    GridObj.SetColCellAlign('DC_ID'				,'center'); 
    GridObj.SetColCellAlign('DC_NAME'			,'center'); 
    
    //GridObj.SetColCellAlign('CD_SRC_LOC'		,'center');
     
    //GridObj.SetColCellAlign('CD_FLAG1'			,'center');
    
    GridObj.SetColCellAlign('SAFETY_STOCK'		 ,'right'); 
    
    GridObj.SetColCellAlign('CD_FLAG'			,'center');
    GridObj.SetColCellAlign('SALES_MEAN_3MONTH'	 ,'right'); 
    
    GridObj.SetColCellAlign('PRE_MONTH_SELL'	 ,'right'); 
    GridObj.SetColCellAlign('SALES_PRE_CUM'		 ,'right'); 
    
    GridObj.SetColCellAlign('SALES_MEAN_1WEEK'	 ,'right'); 
    GridObj.SetColCellAlign('SALES_MEAN_3WEEK'	 ,'right');
     
    GridObj.SetColCellAlign('BASE_STOCK'		 ,'right');    
    GridObj.SetColCellAlign('IPGO_EXPT'			 ,'right'); 
    GridObj.SetColCellAlign('CHGO_EXPT'			 ,'right');     
    GridObj.SetColCellAlign('FINISH_STOCK'		 ,'right');
     
    GridObj.SetColCellAlign('STOCK_DAY_1W'		 ,'right'); 
    GridObj.SetColCellAlign('STOCK_DAY_3W'		 ,'right');
    GridObj.SetColCellAlign('STOCK_TERM'		 ,'right');
    GridObj.SetColCellAlign('DC_ALLOC'			 ,'right');
    
    GridObj.SetColCellAlign('PAL_QTY'			 ,'right');
     
    GridObj.SetColCellAlign('D1_QTY'			 ,'right');	//D+1	嫦輿榆//
    GridObj.SetColCellAlign('D2_QTY'			 ,'right');	//D+2	嫦輿榆//
    GridObj.SetColCellAlign('D3_QTY'			 ,'right');	//D+3	嫦輿榆//
    GridObj.SetColCellAlign('D4_QTY'			 ,'right');	//D+4	嫦輿榆//
    GridObj.SetColCellAlign('D5_QTY'			 ,'right');	//D+5	嫦輿榆//
    GridObj.SetColCellAlign('D6_QTY'			 ,'right');	//D+6	嫦輿榆//
    GridObj.SetColCellAlign('TOT'				 ,'right');	//D+6	嫦輿榆//
    
    GridObj.SetNumberFormat('SAFETY_STOCK'		,'#,##0.#');
    GridObj.SetNumberFormat('SALES_MEAN_3MONTH'	,'#,##0.#');
    GridObj.SetNumberFormat('PRE_MONTH_SELL'	,'#,##0.#');
    GridObj.SetNumberFormat('SALES_PRE_CUM'		,'#,##0.#');
    GridObj.SetNumberFormat('SALES_MEAN_1WEEK'	,'#,##0.#');
    GridObj.SetNumberFormat('SALES_MEAN_3WEEK'	,'#,##0.#');
    GridObj.SetNumberFormat('BASE_STOCK'		,'#,##0.#');
    GridObj.SetNumberFormat('IPGO_EXPT'			,'#,##0.#');
    GridObj.SetNumberFormat('CHGO_EXPT'			,'#,##0.#');
    GridObj.SetNumberFormat('FINISH_STOCK'		,'#,##0.#');
    GridObj.SetNumberFormat('STOCK_DAY_1W'		,'#,##0.#');
    GridObj.SetNumberFormat('STOCK_DAY_3W'		,'#,##0.#');
    GridObj.SetNumberFormat('STOCK_TERM'		,'#,##0.#');
    GridObj.SetNumberFormat('DC_ALLOC'			,'#,##0.#');
    
    GridObj.SetNumberFormat('PAL_QTY'			,'#,##0.#');
    
    GridObj.SetNumberFormat('D1_QTY'			,'#,##0.#');	//D+1	嫦輿榆//
    GridObj.SetNumberFormat('D2_QTY'			,'#,##0.#');	//D+2	嫦輿榆//
    GridObj.SetNumberFormat('D3_QTY'			,'#,##0.#');	//D+3	嫦輿榆//
    GridObj.SetNumberFormat('D4_QTY'			,'#,##0.#');	//D+4	嫦輿榆//
    GridObj.SetNumberFormat('D5_QTY'			,'#,##0.#');	//D+5	嫦輿榆//
    GridObj.SetNumberFormat('D6_QTY'			,'#,##0.#');	//D+6	嫦輿榆//
    GridObj.SetNumberFormat('TOT'				,'#,##0.#');	//D+6	嫦輿榆//

	//GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");

	//Hidden 鏽歲
	//GridObj.SetColHide("CRUD",true);
       
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
		var dc_id			= document.frm.dc_id.value;
		var item_id			= document.frm.item_id.value;
		var sales_cat_02	= document.frm.sales_cat_02.value;
		var scm_charge		= document.frm.scm_charge.value;
	

	//var versions_seq = document.frm.plan_version.value;
	//if( versions_seq == "" || versions_seq == null ) {
		//alert("幗瞪擊 摹鷗ж撮蹂.");
		//return;
	//}

	// 螢 塭檜觼 匐儀 寞雖
	if( dc_id == null || dc_id == "") {
		if( item_id == null || item_id == "" ) {
			if(sales_cat_02 == null || sales_cat_02 == "" ) {
				if(scm_charge == null || scm_charge == "" ) {
				alert("ж釭檜鼻曖 匐儀褻勒檜 в蹂м棲棻.");
				return;
			}
		}
	}
}    
       
       doQuery();
   }
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave(service) {

	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";
	
	//GridObj.SetParam("mode", "save");
	// user_id

	doSave();	
	
	
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

};
      
      
// 盪濰
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	//var in_trans_unit = "";
	
	//if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "pal";
	//if(document.frm.in_trans_unit[1].checked == true) in_trans_unit = "box";

    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//GridObj.SetParam("trans_unit",in_trans_unit);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
 return;
}    
      
      
      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

		var item_id			= document.all.item_id.value;
		var dc_id			= document.all.dc_id.value;		
		var sales_cat_02	= document.all.sales_cat_02.value;	
		var scm_charge		= document.all.scm_charge.value;
		var d_day   		= document.all.d_day.value;
		
		var in_trans_unit = "";
	
		
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", 		   		 "search");
       GridObj.SetParam("item_id", 				  item_id);
       GridObj.SetParam("dc_id", 			  		dc_id);
       GridObj.SetParam("sales_cat_02",		 sales_cat_02);
       GridObj.SetParam("scm_charge",	 	   scm_charge);
       GridObj.SetParam("d_day",	 		  		d_day);
       GridObj.SetParam("in_trans_unit",	in_trans_unit);
       
       //alert(sales_cat_02);

       GridObj.DoQuery(servlet_url);
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridEndQuery() 
    {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
        
        
        
        
        var sales_mean_1week	=	0;	//1輿 ゎ敕
		var sales_mean_3week	=	0;	//3輿 ゎ敕
		
		var pre_month_sell		=	0;	//瞪錯 っ衙
		var sales_mean_3month	=	0;	//3偃錯 錯 ゎ敕
        
          
        if(endMode == "search") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj.GetStatus() == "true") 
            {  
		
					//EDIT_FLAG	        	               
			
			for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell儀梃 滲唳
				
				//GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,DC_ID,DC_NAME');
				
				GridObj.SetCellBgColor('SAFETY_STOCK',		i,  color_edit_col);
				GridObj.SetCellBgColor('CD_FLAG',			i,  color_edit_col);
				
				GridObj.SetCellBgColor('D1_QTY',			i,  color_edit_col);
				GridObj.SetCellBgColor('D2_QTY',			i,  color_edit_col);
				GridObj.SetCellBgColor('D3_QTY',			i,  color_edit_col);
				GridObj.SetCellBgColor('D4_QTY',			i,  color_edit_col);
				GridObj.SetCellBgColor('D5_QTY',			i,  color_edit_col);
				GridObj.SetCellBgColor('D6_QTY',			i,  color_edit_col);
					
			}      

			 	GridObj.AddSummaryBar('SUMMARY1', '瞪羹м啗', 'summaryall', 'sum', 'SALES_MEAN_3MONTH,PRE_MONTH_SELL,SALES_PRE_CUM,SALES_MEAN_1WEEK,SALES_MEAN_3WEEK,BASE_STOCK,IPGO_EXPT,CHGO_EXPT,FINISH_STOCK,DC_ALLOC,PAL_QTY,D1_QTY,D2_QTY,D3_QTY,D4_QTY,D5_QTY,D6_QTY,TOT');
         	    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);
				
				
				//GridObj.SetCellFontBold('SUMMARY1', 'true');
				
				}                  
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
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
	
	if( strColumnKey == "SELECTED"){
		return;
	}
	
	Tot_Cal();
	
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
    

// 薯ヶ 殮溘璽縑 殮溘и 高婁 橾纂ж朝 薯ヶ 匐餌 ��, 橾纂ж朝 薯ヶ檜 氈戲賊 薯ヶ 囀萄, 薯ヶ 貲 ル衛
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// 橾纂ж朝 薯ヶ 橈擠
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}

// 薯ヶ 匐儀 popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup 璽曖 input box ル衛 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}


// 璋濠諼 殮溘寞雖
function (obj) {
	var key = event.keyCode;
	if(!(key==8||key==9||key==13||key==46||key==144||
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}
  
	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {

		if(obj == document.frm.stock_day) {
			Do_DC_Allocate(obj);
		}
	}
}    
    

function GoAlloc(){
	
	var stock_day			=	document.frm.stock_day.value;
	
	var in_mean_sell 		=	document.frm.in_mean_sell.value;
	
	var dc_alloc			=	0;	//嫦輿榆
	
	var pal_qty				=	0;	//嫦輿榆
	
	var	tot					=	0;
	
	var	d1_qty				=	0;
	var	d2_qty				=	0;
	var	d3_qty				=	0;
	var	d4_qty				=	0;
	var	d5_qty				=	0;
	var	d6_qty				=	0;

	var sales_mean			=	0;	//1輿 ゎ敕

	var sales_mean_1week	=	0;	//1輿 ゎ敕
	var sales_mean_3week	=	0;	//3輿 ゎ敕
	var pre_month_sell		=	0;	//瞪錯 っ衙
	var sales_mean_3month	=	0;	//3偃錯 錯 ゎ敕
	
	var finish_stock		=	0;	//葆馬營堅
	
	var d_day   			= document.all.d_day.value;
	
	var dc_alloc			=	0;	//蕨鼻 嫦輿榆
	
	var	fix_qty				=	0;
	
		for(var i=0;i<GridObj.GetRowCount();i++ ) {

			for(var i=0;i<GridObj.GetRowCount();i++ ) {

				dc_alloc	=	GridObj.SetCellValue("DC_ALLOC", i,0);

				var cd_flag	= GridObj.GetCellValue("CD_FLAG", i);
					
			if(cd_flag == 1){
				
				if(document.frm.chk_sel_20.checked == true){
					
					finish_stock		=	GridObj.GetCellValue("FINISH_STOCK", 		i);		//葆馬營堅
					sales_mean			=	GridObj.GetCellValue("SALES_MEAN_1WEEK", 	i);		//1輿 ゎ敕
					
					d1_qty				=	GridObj.GetCellValue("D1_QTY", 	i);
					d2_qty				=	GridObj.GetCellValue("D2_QTY", 	i);
					d3_qty				=	GridObj.GetCellValue("D3_QTY", 	i);
					d4_qty				=	GridObj.GetCellValue("D4_QTY", 	i);
					d5_qty				=	GridObj.GetCellValue("D5_QTY", 	i);
					d6_qty				=	GridObj.GetCellValue("D6_QTY", 	i);
					
					pal_qty				=	GridObj.GetCellValue("PAL_QTY", 	i);
	
					if(in_mean_sell=="01"){
						sales_mean	= GridObj.GetCellValue("SALES_MEAN_1WEEK", 	i);		//1輿 ゎ敕
					}else if(in_mean_sell=="02"){
						sales_mean	= GridObj.GetCellValue("SALES_MEAN_3WEEK", 	i);		//3輿 ゎ敕
						
					}else if(in_mean_sell=="03"){
						sales_mean	= GridObj.GetCellValue("PRE_MONTH_SELL", 	i);		//瞪錯 褒瞳
						sales_mean	= sales_mean/24;
					}else if(in_mean_sell=="04"){
						sales_mean	= GridObj.GetCellValue("SALES_MEAN_3MONTH", i);		//3偃錯 錯 ゎ敕
						sales_mean	= sales_mean/24;
					}
					
					if(strToNum(stock_day)*sales_mean >= finish_stock){
						dc_alloc	= strToNum(sales_mean) * strToNum(stock_day) - strToNum(finish_stock)
						GridObj.SetCellValue("DC_ALLOC", i, dc_alloc);
						}	
				}			
			}else{
				
				finish_stock		=	GridObj.GetCellValue("FINISH_STOCK", 		i);		//葆馬營堅
				sales_mean			=	GridObj.GetCellValue("SALES_MEAN_1WEEK", 	i);		//1輿 ゎ敕
				
				d1_qty				=	GridObj.GetCellValue("D1_QTY", 	i);
				d2_qty				=	GridObj.GetCellValue("D2_QTY", 	i);
				d3_qty				=	GridObj.GetCellValue("D3_QTY", 	i);
				d4_qty				=	GridObj.GetCellValue("D4_QTY", 	i);
				d5_qty				=	GridObj.GetCellValue("D5_QTY", 	i);
				d6_qty				=	GridObj.GetCellValue("D6_QTY", 	i);
				
				pal_qty				=	GridObj.GetCellValue("PAL_QTY", 	i);
	
				if(in_mean_sell=="01"){
					sales_mean	= GridObj.GetCellValue("SALES_MEAN_1WEEK", 	i);		//1輿 ゎ敕
				}else if(in_mean_sell=="02"){
					sales_mean	= GridObj.GetCellValue("SALES_MEAN_3WEEK", 	i);		//3輿 ゎ敕
					
				}else if(in_mean_sell=="03"){
					sales_mean	= GridObj.GetCellValue("PRE_MONTH_SELL", 	i);		//瞪錯 褒瞳
					sales_mean	= sales_mean/30;
				}else if(in_mean_sell=="04"){
					sales_mean	= GridObj.GetCellValue("SALES_MEAN_3MONTH", i);		//3偃錯 錯 ゎ敕
					sales_mean	= sales_mean/30;
				}
				
				if(strToNum(stock_day)*sales_mean >= finish_stock){
					dc_alloc	= strToNum(sales_mean) * strToNum(stock_day) - strToNum(finish_stock)
					GridObj.SetCellValue("DC_ALLOC", i, dc_alloc);
				}

						

			}
		
	}
	
	
}	
	
	
	CD_Cal();
	GoAlloc2();
	
}


function GoAlloc2(){ //	嫦輿榆 寡薑
	
	var d_day   			= document.all.d_day.value;
	
	var dc_alloc			=	0;	//蕨鼻 嫦輿榆
	var	tot					=	0;
	
	var	d1_qty				=	0;
	var	d2_qty				=	0;
	var	d3_qty				=	0;
	var	d4_qty				=	0;
	var	d5_qty				=	0;
	var	d6_qty				=	0;
	
	var in_trans_unit = "";
	
	var pal_qty			=	0;	//嫦輿榆	
	
	var finish_stock	=	0;	//葆馬營堅
	
	var	fix_qty			=	0;					//嫦輿 �挨仄� 啗骯擊 嬪и 滲熱
	
	var pal_cal			=	0;					//Palet 熱榆 啗骯擊 嬪и 滲熱
	
	if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "box";
	else in_trans_unit = "pal";


		for(var i=0;i<GridObj.GetRowCount();i++ ) {
		
			
				dc_alloc	=	GridObj.GetCellValue("DC_ALLOC", i);
			
				d1_qty		=	GridObj.GetCellValue("D1_QTY", 	i);
				d2_qty		=	GridObj.GetCellValue("D2_QTY", 	i);
				d3_qty		=	GridObj.GetCellValue("D3_QTY", 	i);
				d4_qty		=	GridObj.GetCellValue("D4_QTY", 	i);
				d5_qty		=	GridObj.GetCellValue("D5_QTY", 	i);
				d6_qty		=	GridObj.GetCellValue("D6_QTY", 	i);
			
				pal_qty		=	GridObj.GetCellValue("PAL_QTY", i);
			
			if(dc_alloc==0){
			}
			else{
					
					if(d_day==1){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else
						{
							
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}
						}

						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, 0);
						GridObj.SetCellValue("D3_QTY", i, 0);
						GridObj.SetCellValue("D4_QTY", i, 0);
						GridObj.SetCellValue("D5_QTY", i, 0);
						GridObj.SetCellValue("D6_QTY", i, 0);
					


					}else if(d_day==2){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else{
							 
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}
							 
						}
							GridObj.SetCellValue("D1_QTY", i, fix_qty);
							GridObj.SetCellValue("D2_QTY", i, fix_qty);
							
							GridObj.SetCellValue("D3_QTY", i, 0);
							GridObj.SetCellValue("D4_QTY", i, 0);
							GridObj.SetCellValue("D5_QTY", i, 0);
							GridObj.SetCellValue("D6_QTY", i, 0);
						
					}else if(d_day==3){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
							
						}
						else{
							 
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){
									
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));
										
								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}
							  
							 							  		
						}
						
						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, fix_qty);
						GridObj.SetCellValue("D3_QTY", i, fix_qty);
						
						GridObj.SetCellValue("D4_QTY", i, 0);
						GridObj.SetCellValue("D5_QTY", i, 0);
						GridObj.SetCellValue("D6_QTY", i, 0);
						
					}else if(d_day==4){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else{

							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){

										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}

							 							 		
						}
						
						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, fix_qty);
						GridObj.SetCellValue("D3_QTY", i, fix_qty);
						GridObj.SetCellValue("D4_QTY", i, fix_qty);
						
						GridObj.SetCellValue("D5_QTY", i, 0);
						GridObj.SetCellValue("D6_QTY", i, 0);
						
					}else if(d_day==5){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else{
							 
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){
									
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}
							 							 		
						}
						
						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, fix_qty);
						GridObj.SetCellValue("D3_QTY", i, fix_qty);
						GridObj.SetCellValue("D4_QTY", i, fix_qty);
						GridObj.SetCellValue("D5_QTY", i, fix_qty);
						GridObj.SetCellValue("D6_QTY", i, 0);					
						
					}else if(d_day==6){
						if(in_trans_unit=="box"){
							fix_qty	=	Math.round(dc_alloc / d_day);
						}
						else{
							 
							pal_cal	=	strToNum(dc_alloc%pal_qty);
							
								if(pal_cal<=(pal_qty/2)){

										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+0.5));

								} else {
										
										fix_qty	=	Math.round(pal_qty*(Math.round(strToNum(Math.round(dc_alloc / d_day)/pal_qty))+1));
								}

							 						
						}
						
						GridObj.SetCellValue("D1_QTY", i, fix_qty);
						GridObj.SetCellValue("D2_QTY", i, fix_qty);
						GridObj.SetCellValue("D3_QTY", i, fix_qty);
						GridObj.SetCellValue("D4_QTY", i, fix_qty);
						GridObj.SetCellValue("D5_QTY", i, fix_qty);
						GridObj.SetCellValue("D6_QTY", i, fix_qty);
						
						
					}

					}	
				
	Tot_Cal();		
		
	}
	
	
}

function Tot_Cal(){ //	嫦輿榆 寡薑
	
	var d_day   				= document.all.d_day.value;
	var	tot						=	0;
	
	var	d1_qty					=	0;
	var	d2_qty					=	0;
	var	d3_qty					=	0;
	var	d4_qty					=	0;
	var	d5_qty					=	0;
	var	d6_qty					=	0;	
	
		for(var i=0;i<GridObj.GetRowCount();i++ ) {
		
		

				d1_qty		=	GridObj.GetCellValue("D1_QTY", 	i);
				d2_qty		=	GridObj.GetCellValue("D2_QTY", 	i);
				d3_qty		=	GridObj.GetCellValue("D3_QTY", 	i);
				d4_qty		=	GridObj.GetCellValue("D4_QTY", 	i);
				d5_qty		=	GridObj.GetCellValue("D5_QTY", 	i);
				d6_qty		=	GridObj.GetCellValue("D6_QTY", 	i);

				tot			=	GridObj.GetCellValue("TOT", i);
	
				tot			=	strToNum(d1_qty) +strToNum(d2_qty)+strToNum(d3_qty)+strToNum(d4_qty)+strToNum(d5_qty)+strToNum(d6_qty);
					GridObj.SetCellValue("TOT", i, tot);
				}
	
}


function CD_Cal(){ //	C/D 馬寰 罹睡 煎霜 掘⑷
	
	
	var dc_id	=0;
	var cd_src_loc	=0;
	
	var	ay_row	=	0;
	var	ps_row	=	0;
	var	ku_row	=	0;
	
	
	var dc_alloc			=	0;	//蕨鼻 嫦輿榆
	
	var	fix_qty	=	0;
	
	
	/* 觼煎蝶 紫韁 輿轎堅濰 row 瓊晦, 寰曄, ん蝓, 掘嘐*/
	
	for(var i=0;i<GridObj.GetRowCount();i++ ){
		
		dc_id	=	GridObj.GetCellValue("DC_ID", i);
		
		if(dc_id=='7100'){
			
			ay_row = i;
		}
		else if(dc_id=='7500'){
			
			ps_row = i;
			
		}
		else if(dc_id=='7600'){
			
			ku_row = i;
			
		}
	}
	
	
	/* 瞪羹 斜葬萄 渠鼻 瑞Щ 給賊憮 觼煎蝶紫韁 雖羲檜賊 輿轎堅濰 爾醞榆縑 渦ж晦*/
	
	
	for(var i=0;i<GridObj.GetRowCount();i++ ) {
		
		dc_alloc	=	GridObj.GetCellValue("DC_ALLOC", i);
		dc_id		=	GridObj.GetCellValue("DC_ID", i);
		
		var cd_flag	= GridObj.GetCellValue("CD_FLAG", i);
		if(cd_flag==1){
			
			cd_src_loc	=	GridObj.GetCellValue("CD_SRC_LOC", i);
			
			if(cd_src_loc=='7100'){
				
				var temp = GridObj.GetCellValue("DC_ALLOC", i);
				var temp2 = GridObj.GetCellValue("DC_ALLOC", ay_row);
				
				GridObj.SetCellValue("DC_ALLOC", ay_row,strToNum(temp)+strToNum(temp2));
				GridObj.SetCellValue("DC_ALLOC", i,0);

				
			}else if(cd_src_loc=='7500'){

				var temp = GridObj.GetCellValue("DC_ALLOC", i);
				var temp2 = GridObj.GetCellValue("DC_ALLOC", ps_row);
				
				GridObj.SetCellValue("DC_ALLOC", ps_row,strToNum(temp)+strToNum(temp2));
				GridObj.SetCellValue("DC_ALLOC", i,0);


			}else if(cd_src_loc=='7600'){

				var temp = GridObj.GetCellValue("DC_ALLOC", i);
				var temp2 = GridObj.GetCellValue("DC_ALLOC", ku_row);
				
				GridObj.SetCellValue("DC_ALLOC", ku_row,strToNum(temp)+strToNum(temp2));
				GridObj.SetCellValue("DC_ALLOC", i,0);

			}
			
		}
		
		
	}
	
	

}



