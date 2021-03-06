//############################################################
//## Щ煎斜極ID      : op_02080_fc_planVsActual_list.js
//## Щ煎斜極貲      : 嫦輿啗�� 渠綠 褒瞳 褻��
//## 偃嫦濠          : 辦謙敕
//## 偃嫦橾濠        : 2013-09-25
//##
//## 婦溼 job file	: job_sinc_30_orderPlanning_03.xml
//## 婦溼 query file	: query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-09-25  辦謙敕      create
//############################################################

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id				= 'op_02080_fc_planVsActual_list';
var GridObj ; 													// WiseGrid 偌羹

var color_tot 			= '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col		= '255|253|208';
var color_sp			= '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row	= '141|232|141';	//塭檣 摹鷗 寡唳儀


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

    GridObj.nHDLineSize				= 16; //Header Size
    GridObj.nHDLines				= 2;
 	GridObj.strActiveRowBgColor		= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor	= '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor	= '0|0|0'; 
	GridObj.strMouseWheelAction		='page'; // page 欽嬪 scroll ->晦獄擎 'default'  
	//GridObj.strHDClickAction    	= "sortsingle";	//header sort晦棟 蹺陛   //2013-11-04
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	var mfs_flag	    = document.all.mfs_flag.value;
    var selgubn			= document.frm.sel_gubn.value;
    var in_item_id		= document.frm.in_item_id.value;
    var in_item_name	= document.frm.in_item_name.value;


//if(selgubn == "MFS_FLAG"){
	//if(mfs_flag == "A"){
		GridObj.AddHeader("COM_NAME"		,"啗翮餌"   		,"t_text" 		,100	,80 	,false); //0
		//GridObj.AddHeader("ITEM_ID"	    	,"薯ヶ囀萄"    	,"t_text" 		,100    ,0 		,false);	//0	60->0戲煎 滲唳 2013-11-14 SCMぜ 薑蝓辨 餌錳 蹂羶
	 	//GridObj.AddHeader("ITEM_NAME"		,"薯ヶ貲"   		,"t_text" 		,100	,0 		,false); 	//0   100->0戲煎 滲唳 2013-11-14 SCMぜ 薑蝓辨 餌錳 蹂羶   
	 	GridObj.AddHeader("MATR_CODE"		,"濠營囀萄"   	,"t_text" 		,100	,60 	,false); 
	 	GridObj.AddHeader("MATR_NAME"		,"濠營貲"      	,"t_text" 		,500	,100 	,false); //0   
	 	GridObj.AddHeader("BASE_UOM"		,"晦獄\n欽嬪"     ,"t_text" 		,500	,40 	,false); //0
	
		GridObj.AddHeader("W8_FC_QTY"		,"嫦輿榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W8_PROD_QTY"		,"褒瞳榆"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W8_DIV_QTY"		,"離檜榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W8_PROD_AMT"		,"褒瞳睦(%)"     	,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W7_FC_QTY"		,"嫦輿榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W7_PROD_QTY"		,"褒瞳榆"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W7_DIV_QTY"		,"離檜榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W7_PROD_AMT"		,"褒瞳睦(%)"     	,"t_number"     ,100.3 	,55		,false); //0
		
		GridObj.AddHeader("W6_FC_QTY"		,"嫦輿榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W6_PROD_QTY"		,"褒瞳榆"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W6_DIV_QTY"		,"離檜榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W6_PROD_AMT"		,"褒瞳睦(%)"		,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W5_FC_QTY"		,"嫦輿榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W5_PROD_QTY"		,"褒瞳榆"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W5_DIV_QTY"		,"離檜榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W5_PROD_AMT"		,"褒瞳睦(%)"     	,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W4_FC_QTY"		,"嫦輿榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W4_PROD_QTY"		,"褒瞳榆"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W4_DIV_QTY"		,"離檜榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W4_PROD_AMT"		,"褒瞳睦(%)"		,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W3_FC_QTY"		,"嫦輿榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W3_PROD_QTY"		,"褒瞳榆"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W3_DIV_QTY"		,"離檜榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W3_PROD_AMT"		,"褒瞳睦(%)"		,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W2_FC_QTY"		,"嫦輿榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W2_PROD_QTY"		,"褒瞳榆"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W2_DIV_QTY"		,"離檜榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W2_PROD_AMT"		,"褒瞳睦(%)"		,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("W1_FC_QTY"		,"嫦輿榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W1_PROD_QTY"		,"褒瞳榆"      	,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("W1_DIV_QTY"		,"離檜榆"      	,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("W1_PROD_AMT"		,"褒瞳睦(%)"     ,"t_number"     ,100.3 	,55		,false); //0

		GridObj.AddHeader("FC_QTY_TOT"		,"嫦輿榆"			,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("PROD_QTY_TOT"	,"褒瞳榆"			,"t_number"     ,100.3	,60		,false); //0
		GridObj.AddHeader("DIV_QTY_TOT"		,"離檜榆"			,"t_number"     ,100.3 	,60		,false); //0
		GridObj.AddHeader("PROD_AMT_TOT"	,"褒瞳睦(%)"		,"t_number"     ,100.3 	,55		,false); //0
		

		var header_length = 0, j;
		var header_id = "op_02080_fc_planVsActual_list_header";	
		var cnfm_date		= document.all.cnfm_date.value;
		
		
	commonUtil.getSelQeury( "cnfm_date", cnfm_date, header_id,{
		callback:function(result){
			if(result.length > 0) {
				for(var i=0 ; i < 8 ; i++){
					j = i+1;
					GridObj.AddGroup("HD"+j,      		result[0][i]+"輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					//alert("HD"+j+" : "+result[0][i]);
				}
			}
					/* 檜醞 п渦 蹺陛 */
					//GridObj.AddGroup("HD1",      		"W-8輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					GridObj.AppendHeader("HD1",		  "W8_FC_QTY");
					GridObj.AppendHeader("HD1",		"W8_PROD_QTY");
					GridObj.AppendHeader("HD1",		 "W8_DIV_QTY");
					GridObj.AppendHeader("HD1",		"W8_PROD_AMT");	
					
					//GridObj.AddGroup("HD2",    		  "W-7輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					GridObj.AppendHeader("HD2",		  "W7_FC_QTY");
					GridObj.AppendHeader("HD2",		"W7_PROD_QTY");
					GridObj.AppendHeader("HD2",		 "W7_DIV_QTY");
					GridObj.AppendHeader("HD2",		"W7_PROD_AMT");	
			
					
					//GridObj.AddGroup("HD3",      		"W-6輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					GridObj.AppendHeader("HD3",		  "W6_FC_QTY");
					GridObj.AppendHeader("HD3",		"W6_PROD_QTY");
					GridObj.AppendHeader("HD3",		 "W6_DIV_QTY");
					GridObj.AppendHeader("HD3",		"W6_PROD_AMT");	
				
					//GridObj.AddGroup("HD4",    		  "W-5輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					GridObj.AppendHeader("HD4",		  "W5_FC_QTY");
					GridObj.AppendHeader("HD4",		"W5_PROD_QTY");
					GridObj.AppendHeader("HD4",		 "W5_DIV_QTY");
					GridObj.AppendHeader("HD4",		"W5_PROD_AMT");	
			
					//GridObj.AddGroup("HD5",    		  "W-4輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					GridObj.AppendHeader("HD5",		  "W4_FC_QTY");
					GridObj.AppendHeader("HD5",		"W4_PROD_QTY");
					GridObj.AppendHeader("HD5",		 "W4_DIV_QTY");
					GridObj.AppendHeader("HD5",		"W4_PROD_AMT");	
			
					//GridObj.AddGroup("HD6",    		  "W-3輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					GridObj.AppendHeader("HD6",		  "W3_FC_QTY");
					GridObj.AppendHeader("HD6",		"W3_PROD_QTY");
					GridObj.AppendHeader("HD6",		 "W3_DIV_QTY");
					GridObj.AppendHeader("HD6",		"W3_PROD_AMT");	
			
					//GridObj.AddGroup("HD7",    		  "W-2輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					GridObj.AppendHeader("HD7",		  "W2_FC_QTY");
					GridObj.AppendHeader("HD7",		"W2_PROD_QTY");
					GridObj.AppendHeader("HD7",		 "W2_DIV_QTY");
					GridObj.AppendHeader("HD7",		"W2_PROD_AMT");	
			
					//GridObj.AddGroup("HD8",    		  "W-1輿");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					GridObj.AppendHeader("HD8",		  "W1_FC_QTY");
					GridObj.AppendHeader("HD8",		"W1_PROD_QTY");
					GridObj.AppendHeader("HD8",		 "W1_DIV_QTY");
					GridObj.AppendHeader("HD8",		"W1_PROD_AMT");	
			
					GridObj.AddGroup("HD9",    		  "晦除 啗");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
					GridObj.AppendHeader("HD9",		  "FC_QTY_TOT");
					GridObj.AppendHeader("HD9",		"PROD_QTY_TOT");
					GridObj.AppendHeader("HD9",		 "DIV_QTY_TOT");
					GridObj.AppendHeader("HD9",		"PROD_AMT_TOT");	
			
					GridObj.BoundHeader();
					
					GridObj.SetColCellAlign('COM_NAME',			 'center');
					//GridObj.SetColCellAlign('ITEM_ID',           'center');
					//GridObj.SetColCellAlign('ITEM_NAME',		   'left');
					
					GridObj.SetColCellAlign('MATR_CODE',         'center'); 
					GridObj.SetColCellAlign('MATR_NAME',		   'left');
					GridObj.SetColCellAlign('BASE_UOM',   		 'center');		
					
					GridObj.SetColCellAlign('W8_FC_QTY',			'right');
					GridObj.SetColCellAlign('W8_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W8_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W8_PROD_AMT',			'right');		
					
					GridObj.SetColCellAlign('W7_FC_QTY',			'right');
					GridObj.SetColCellAlign('W7_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W7_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W7_PROD_AMT',			'right');		
					
					GridObj.SetColCellAlign('W6_FC_QTY',			'right');
					GridObj.SetColCellAlign('W6_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W6_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W6_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W5_FC_QTY',			'right');
					GridObj.SetColCellAlign('W5_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W5_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W5_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W4_FC_QTY',			'right');
					GridObj.SetColCellAlign('W4_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W4_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W4_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W3_FC_QTY',			'right');
					GridObj.SetColCellAlign('W3_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W3_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W3_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W2_FC_QTY',			'right');
					GridObj.SetColCellAlign('W2_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W2_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W2_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('W1_FC_QTY',			'right');
					GridObj.SetColCellAlign('W1_PROD_QTY',			'right'); 
					GridObj.SetColCellAlign('W1_DIV_QTY',			'right');
					GridObj.SetColCellAlign('W1_PROD_AMT',			'right');		
			
					GridObj.SetColCellAlign('FC_QTY_TOT',			'right');
					GridObj.SetColCellAlign('PROD_QTY_TOT',			'right'); 
					GridObj.SetColCellAlign('DIV_QTY_TOT',			'right');
					GridObj.SetColCellAlign('PROD_AMT_TOT',			'right');		
			
					GridObj.SetNumberFormat("W8_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W8_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W8_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W8_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W7_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W7_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W7_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W7_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W6_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W6_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W6_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W6_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W5_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W5_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W5_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W5_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W4_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W4_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W4_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W4_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W3_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W3_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W3_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W3_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W2_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W2_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W2_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W2_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("W1_FC_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W1_PROD_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W1_DIV_QTY",		"###,###.#");
					GridObj.SetNumberFormat("W1_PROD_AMT",		"###,###.#");
			
					GridObj.SetNumberFormat("FC_QTY_TOT",		"###,###.#");
					GridObj.SetNumberFormat("PROD_QTY_TOT",		"###,###.#");
					GridObj.SetNumberFormat("DIV_QTY_TOT",		"###,###.#");
					GridObj.SetNumberFormat("PROD_AMT_TOT",		"###,###.#");			
		
		
		}
			
	});	


}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
		var mfs_flag	    = document.all.mfs_flag.value;
	    var in_item_id	    = document.all.in_item_id.value;
	    var in_item_name	= document.all.in_item_name.value;
	    var sel_gubn 	    = document.frm.sel_gubn.value;
	    var cnfm_date 	    = document.frm.cnfm_date.value;
	    var com_code 	    = document.frm.com_code.value;
       
	    		
	    	
	    	doQuery();
	    	
	    	
	    	GridObj.ClearGrid(); 
			setHeader(GridObj);
   }    	

  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {

	var in_item_id	    = document.all.in_item_id.value;   
	var in_item_name	= document.all.in_item_name.value;
	var sel_gubn	    = document.frm.sel_gubn.value;   
	var mfs_flag	    = document.all.mfs_flag.value;
	var com_code	    = document.all.com_code.value;
	var cnfm_date	    = document.all.cnfm_date.value;
	
	var servlet_url	= Project_name+"/servlet/com.wisegrid.admin."+job_id;

       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",			"search");
       
       GridObj.SetParam("sel_gubn",			sel_gubn);
	   GridObj.SetParam("mfs_flag",			mfs_flag);
       GridObj.SetParam("com_code",			com_code);
       GridObj.SetParam("cnfm_date",		cnfm_date);
       GridObj.SetParam("in_item_id",	  in_item_id);
       GridObj.SetParam("in_item_name",	in_item_name);
       
       
       GridObj.DoQuery(servlet_url);
   }



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridEndQuery() 
    {
        var endMode			= GridObj.GetParam("mode");
        var error_msg		= '';
        
		var in_item_id	    = document.all.in_item_id.value;   
		var in_item_name	= document.all.in_item_name.value;

        var selgubn			= document.frm.sel_gubn.value;   
		var mfs_flag		= document.all.mfs_flag.value;
		var com_code		= document.all.com_code.value;
		var cnfm_date		= document.all.cnfm_date.value;
          
        if(endMode == "search") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj.GetStatus() == "true") 
            {  
				
				if(com_code=="0001000050" && com_code=="0001000021" ){
						//alert(123+"123");
					if(mfs_flag=="A"){
							//alert(123+"123");
							GridObj.SetGroupMerge('COM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME,MATR_CODE,MATR_NAME');
					} else if(mfs_flag=="B"){
						GridObj.SetGroupMerge('COM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME,MATR_CODE,MATR_NAME');
					} else {
						GridObj.SetGroupMerge('COM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME,MATR_CODE,MATR_NAME');
					}
			}	else {
						GridObj.SetGroupMerge('COM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME');
						//GridObj.SetGroupMerge('COM_NAME,ITEM_ID,ITEM_NAME,MATR_CODE,MATR_NAME');
					}	
					
				
				if(selgubn=="MFS_FLAG"){
					for(var i=0;i<GridObj.GetRowCount();i++) {
						if(mfs_flag=="A"){
							
								GridObj.SetCellBgColor('COM_NAME',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_ID',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_NAME',     i, color_edit_col);
								GridObj.SetCellBgColor('MATR_CODE', 	i, color_edit_col);
								GridObj.SetCellBgColor('MATR_NAME', 	i, color_edit_col);
								GridObj.SetCellBgColor('BASE_UOM', 		i, color_edit_col);
									
								GridObj.SetCellBgColor('W8_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W7_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W6_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W5_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W4_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W3_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W2_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W1_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_AMT', 	i, color_edit_col);
									
								GridObj.SetCellBgColor('FC_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('DIV_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_AMT_TOT', 	i, color_edit_col);
	
							
							
						} else if(mfs_flag=="B"){

								GridObj.SetCellBgColor('COM_NAME',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_ID',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_NAME',     i, color_edit_col);
								GridObj.SetCellBgColor('MATR_CODE', 	i, color_edit_col);
								GridObj.SetCellBgColor('MATR_NAME', 	i, color_edit_col);
								GridObj.SetCellBgColor('BASE_UOM', 		i, color_edit_col);
									
								GridObj.SetCellBgColor('W8_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W7_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W6_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W5_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W4_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W3_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W2_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W1_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_AMT', 	i, color_edit_col);
									
								GridObj.SetCellBgColor('FC_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('DIV_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_AMT_TOT', 	i, color_edit_col);
	
							
						}else{
								GridObj.SetCellBgColor('COM_NAME',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_ID',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_NAME',     i, color_edit_col);
								GridObj.SetCellBgColor('MATR_CODE', 	i, color_edit_col);
								GridObj.SetCellBgColor('MATR_NAME', 	i, color_edit_col);
								GridObj.SetCellBgColor('BASE_UOM', 		i, color_edit_col);
									
								GridObj.SetCellBgColor('W8_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W7_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W6_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W5_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W4_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W3_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W2_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W1_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_AMT', 	i, color_edit_col);
									
								GridObj.SetCellBgColor('FC_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('DIV_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_AMT_TOT', 	i, color_edit_col);
							
						}
					
					}
				}
				else if(selgubn=="PROD"){
			 		for(var i=0;i<GridObj.GetRowCount();i++) {
								GridObj.SetCellBgColor('COM_NAME',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_ID',    	i, color_edit_col);
								//GridObj.SetCellBgColor('ITEM_NAME',     i, color_edit_col);
								GridObj.SetCellBgColor('MATR_CODE', 	i, color_edit_col);
								GridObj.SetCellBgColor('MATR_NAME', 	i, color_edit_col);
								GridObj.SetCellBgColor('BASE_UOM', 		i, color_edit_col);
									
								GridObj.SetCellBgColor('W8_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W8_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W7_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W7_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W6_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W6_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W5_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W5_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W4_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W4_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W3_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W3_PROD_AMT', 	i, color_edit_col);	

								GridObj.SetCellBgColor('W2_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W2_PROD_AMT', 	i, color_edit_col);	
								
								GridObj.SetCellBgColor('W1_FC_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_DIV_QTY', 	i, color_edit_col);
								GridObj.SetCellBgColor('W1_PROD_AMT', 	i, color_edit_col);

								GridObj.SetCellBgColor('FC_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('DIV_QTY_TOT', 	i, color_edit_col);
								GridObj.SetCellBgColor('PROD_AMT_TOT', 	i, color_edit_col);
									

				  		}
					} 
				

				
				}
            		//GridObj.ClearGroupMerge();	
            
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
            maxWidthValue		= window.innerWidth;
            maxHeightValue		= window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue		= document.body.clientWidth;
            maxHeightValue		= document.body.clientHeight;
        } 
        
        var tabHeightValue		= Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue	= Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h			= document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue		+= Number(search_h); 
            tableHeightValue	+= Number(search_h); 
        } 
        
        // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
        // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
      

        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }  
    
    
function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {
		document.frm.in_item_name.value = "";
		return;
	}
	var in_sel_name = "in_item_id"+"!%!"+"in_sel_gubn";
	var in_sel_value = document.frm.in_item_id.value +"!%!"+"01"; // in_sel_gubn='01' ヶ跡褻��

	commonUtil.getCodeInfo(in_sel_name, in_sel_value, "ip_06010_GetItemName", { 
	//commonUtil.getCodeInfo(in_sel_name, in_sel_value, "search_item_id_and_item_name_by_item_input", {
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





// ヶ謙/ヶ跡 radio 摹鷗ж賊, sel_gubn 縑 陝陝 蜃朝 褻�� 褻勒 高擊 厥橫遽棻
function set_sel_gubn(sel_gubn) {
	
	document.frm.sel_gubn.value = sel_gubn;
	if(sel_gubn == "PROD") {
		document.frm.mfs_flag.style.display = "none";
		prod.style.display = "block";
	}
	else {
		prod.style.display = "none";
		document.frm.mfs_flag.style.display = "block";
	}

}

function GridCellClick(){ //偃羹陛 橈棻朝 螃盟 п唸 掘僥(Service.do)
	
}

// 渦綰 贗葛 : 鼻撮 で機  //醞濰晦 僭榆 薄匐  偃嫦醞
function ltsc_pop_up(row, col, data) {
	
	var selgubn = document.frm.sel_gubn.value;

	if(selgubn == "MFS_FLAG"){ // 嫦輿斜瑜

		var division	= document.frm.insel_prty.value;
		//var week_flag	= '31week';

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&selgubn=" + selgubn + "&division=" + division + "&week_flag=" + week_flag + "&item_id=" + item_id;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=999, height=700, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);
		newWin.focus();			
					
	}else{ // ヶ跡
		alert("ヶ跡戲煎 摹鷗�� 褻�� ж罹 輿衛晦 夥奧棲棻. ");
		return

		var item_id		= data.split("!%!")[2];
		var	item_name	= data.split("!%!")[3];
		//var week_flag	= '31week';
		var selgubn		= document.frm.sel_gubn.value;

		var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;    
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=800, top=200, left=200";
		var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);    // height=70,  
		newWin.focus();		  
	}
}       

