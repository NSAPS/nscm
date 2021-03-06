//############################################################
//## Щ煎斜極ID      : sc_13030_set_prod_inout_list.vm
//## Щ煎斜極貲      : 嶸鱔陛奢 儅骯螃渦 婦葬
//## 偃嫦濠          : 掏辨雙
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


//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_13030_set_prod_inout_list';
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
    //GridObj.strHDClickAction    = "sortsingle";
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;       
    
    /* SetGroupMerge */
	//GridObj.bHDMoving = false 
	//GridObj.bHDSwapping = false 
	GridObj.bRowSelectorVisible = false 
	GridObj.strRowBorderStyle = 'none' 
	GridObj.nRowSpacing = 0 
	GridObj.strHDClickAction = 'select' 
	
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'    
    
}


       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        

	var start_date 	= document.frm.start_date.value;
	var end_date 	= document.frm.end_date.value;


 	GridObj.AddHeader("SALES_CAT02"		,"濠營斜瑜2"   	,"t_text" 		,200	,70  ,false); //0   
 	GridObj.AddHeader("SALES_CAT03"		,"濠營斜瑜3"   	,"t_text" 		,200	,70  ,false); //0   

 	GridObj.AddHeader("ITEM_ID"			,"ヶ跡囀萄"   	,"t_text" 		,20		,70  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"   		,"t_text" 		,200	,180 ,false); //0   
 	GridObj.AddHeader("SPEC"			,"敘問"   		,"t_text" 		,20		,90  ,false); //0   
 	GridObj.AddHeader("BASE_STOCK"		,"晦蟾營堅"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("PROD_PLAN"		,"濛機啗��"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("SALES_PRE"		,"瞪橾っ衙"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("CHGO"			,"渡橾轎堅"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("STOCK_EXPT"		,"蕨鼻營堅"   	,"t_number" 	,20.3	,60  ,false); //0
 	GridObj.AddHeader("PROD_TERM"		,"儅骯\n唳婁橾"   ,"t_number" 	,20.3	,60  ,false); //0
 	//    
 	GridObj.AddHeader("OPER_QTY"		,"識濩機\n蹂羶榆"	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("COMPL_QTY"		,"濛機\n援瞳榆"   ,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("REMAIN_QTY"		,"濛機濤榆"   	,"t_number" 	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("COMPL_RATE"		,"霞紫徽(%)"   	,"t_number" 	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PRE_YEAR_SELL"	,start_date+" ~ "+end_date   	,"t_number" 	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PRE_MONTH_SELL"	,"瞪錯っ衙"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("SALES_PRE_CUM"	,"渡錯っ衙"   	,"t_number" 	,20.3	,60  ,false); //0   

	
	GridObj.BoundHeader();	

	
	GridObj.SetColFix('SPEC');
	

	GridObj.SetNumberFormat("BASE_STOCK", "###,###,##0");
	GridObj.SetNumberFormat("PROD_PLAN", "###,###,##0");
	GridObj.SetNumberFormat("SALES_PRE", "###,###,##0");
	GridObj.SetNumberFormat("CHGO", "###,###,##0");
	GridObj.SetNumberFormat("STOCK_EXPT", "###,###,##0");
	GridObj.SetNumberFormat("OPER_QTY", "###,###,##0");
	GridObj.SetNumberFormat("COMPL_QTY", "###,###,##0");
	GridObj.SetNumberFormat("REMAIN_QTY", "###,###,##0");
	GridObj.SetNumberFormat("COMPL_RATE", "###,###,##0");
	GridObj.SetNumberFormat("PRE_YEAR_SELL", "###,###,##0");
	GridObj.SetNumberFormat("PRE_MONTH_SELL", "###,###,##0");
	GridObj.SetNumberFormat("SALES_PRE_CUM", "###,###,##0");
	
	GridObj.SetColCellAlign('ITEM_ID','center');
	
	
	

	//Hidden 鏽歲  
       
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(){
	GridObj = document.WiseGrid;
	GridObj.ClearGrid();
	setHeader(GridObj);
	  
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
	GridObj.SetParam("mode", "save");
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

       
       var scm_charge	= document.all.scm_charge.value;
       var start_date	= document.all.start_date.value;
       var end_date		= document.all.end_date.value;
       var cm_gubn		= document.all.cm_gubn.value;
       
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("scm_charge", scm_charge);
       GridObj.SetParam("start_date", start_date);
       GridObj.SetParam("end_date", end_date);
       GridObj.SetParam("cm_gubn", cm_gubn);
       GridObj.DoQuery(servlet_url);
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridEndQuery() {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj.GetStatus() == "true") 
            {                           
	        	//GridObj.ClearGroupMerge();
	        	
				// Merge �� SummaryBar 蹺陛 
				GridObj.SetGroupMerge("SALES_CAT02,SALES_CAT03");
				GridObj.AddSummaryBar('SUMMARY1', '模啗', 'SALES_CAT02', 'sum', 'BASE_STOCK,PROD_PLAN,SALES_PRE,CHGO,STOCK_EXPT,OPER_QTY,COMPL_QTY,REMAIN_QTY,COMPL_RATE,PRE_YEAR_SELL,PRE_MONTH_SELL,SALES_PRE_CUM'); 
         	    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot); 

                GridObj.AddSummaryBar('SUMMARY2', '瞪羹м啗', 'summaryall', 'sum', 'BASE_STOCK,PROD_PLAN,SALES_PRE,CHGO,STOCK_EXPT,OPER_QTY,COMPL_QTY,REMAIN_QTY,COMPL_RATE,PRE_YEAR_SELL,PRE_MONTH_SELL,SALES_PRE_CUM');
         	    GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 
	        	
				//GridObj.SetColFix('ITEM_NAME');
                                             
            } else { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }
    }


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

//alert("strColumnKey+"+strColumnKey);
	var oper_type	= GridObj.GetCellValue("OPER_TYPE", nRow);

	if(strColumnKey == "START_DATE" || strColumnKey == "END_DATE" ){
		// OPER_TYPE 鼻衛 橾唳辦朝 陳瞼蒂 滲唳й熱 橈棻.
		if( oper_type == "001" ) { //鼻衛
		}else{
			alert("鼻衛 遴艙 ヶ跡擎 遴艙橾濠蒂 滲唳й熱橈蝗棲棻!!!");
			GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
			return;
		}		
	}else{
		
	}


}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 渦綰贗葛  檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow) {

	if(strColumnKey =='ITEM_ID'||strColumnKey =='ITEM_NAME'){
		
		 //GoMod(nRow);
		
	}

}	


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {


}	
    