/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01100_monthly_Stock_Prod_Sales_analysis_list';
var GridObj ; 													// WiseGrid 偌羹

var color_tot = '255|234|0';			//м啗 塭檣 寡唳儀
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

    GridObj.nHDLineSize         = 26; //Header Size
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

   var search_flag  = document.all.search_flag.value;

if(search_flag=="DAILY"){
	GridObj.AddHeader("ITEM_ID"			,"ヶ跡囀萄"    	,"t_text" 	    ,100	,100  ,false); 
	GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"    		,"t_text" 	    ,100    ,130  ,false);
 	GridObj.AddHeader("SALE_DATE"		,"っ衙橾濠"       ,"t_text" 	    ,100	,150  ,false);    
 	GridObj.AddHeader("STOCK_QTY"		,"晦蟾營堅"       ,"t_number" 	,100	,120  ,false);    
 	GridObj.AddHeader("QTY1"	        ,"橾奩"          ,"t_number" 	,100.3	,100  ,false);    
  	GridObj.AddHeader("QTY2"	        ,"顫啗薑"         ,"t_number" 	,100.3	,100  ,false); 
 	GridObj.AddHeader("PROD_QTY"		,"儅骯褒瞳"       ,"t_number" 	,100	,120  ,false);   

    /* 檜醞 п渦 蹺陛 */
	GridObj.AddGroup("HD1",    "っ衙褒瞳");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("HD1",  "QTY1");
	GridObj.AppendHeader("HD1",  "QTY2");
	
	GridObj.BoundHeader();	
	
    GridObj.SetColCellAlign('ITEM_ID',		'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
    GridObj.SetColCellAlign('SALE_DATE',	'center'); 
    GridObj.SetColCellAlign('STOCK_QTY',	 'right'); 
    GridObj.SetColCellAlign('QTY1',	         'right');
    GridObj.SetColCellAlign('QTY2',	         'right');
    GridObj.SetColCellAlign('PROD_QTY',		 'right');     
     
    GridObj.SetNumberFormat('STOCK_QTY',   '#,##0.#');
    GridObj.SetNumberFormat('QTY1',        '#,##0.#');
    GridObj.SetNumberFormat('QTY2',        '#,##0.#');
    GridObj.SetNumberFormat('PROD_QTY',    '#,##0.#'); 
		
} else if(search_flag=="MONTH"){
	GridObj.AddHeader("ITEM_ID"			,"ヶ跡囀萄"    	,"t_text" 	    ,100	,100  ,false); 
	GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"    		,"t_text" 	    ,100    ,130  ,false);
 	GridObj.AddHeader("SALE_DATE"		,"っ衙橾濠"       ,"t_text" 	    ,100	,150  ,false);    
 	GridObj.AddHeader("QTY1"	        ,"橾奩"          ,"t_number" 	,100.3	,100  ,false);    
  	GridObj.AddHeader("QTY2"	        ,"顫啗薑"         ,"t_number" 	,100.3	,100  ,false); 
 	GridObj.AddHeader("PROD_QTY"		,"儅骯褒瞳"       ,"t_number" 	,100	,120  ,false);   

    /* 檜醞 п渦 蹺陛 */
	GridObj.AddGroup("HD1",    "っ衙褒瞳");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("HD1", "QTY1");
	GridObj.AppendHeader("HD1", "QTY2");
	
	GridObj.BoundHeader();	
	
    GridObj.SetColCellAlign('ITEM_ID',		'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
    GridObj.SetColCellAlign('SALE_DATE',	'center'); 
 
    GridObj.SetColCellAlign('QTY1',	     'right');
    GridObj.SetColCellAlign('QTY2',	     'right');
    GridObj.SetColCellAlign('PROD_QTY',	 'right');     

    GridObj.SetNumberFormat('QTY1',     '#,##0.#');
    GridObj.SetNumberFormat('QTY2',     '#,##0.#');
    GridObj.SetNumberFormat('PROD_QTY', '#,##0.#'); 	
}

	//GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");

	//Hidden 鏽歲
	//GridObj.SetColHide("CRUD",true);
       
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
    
     var search_flag  = document.all.search_flag.value;
     
     GridObj = document.WiseGrid;
	 GridObj.ClearGrid();
	 setHeader(GridObj);  
     
      if(search_flag=="DAILY"){
       doQuery();
   } else if(search_flag=="MONTH"){
   	   doQuery2();
   }
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

       var in_fr_date   = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var search_flag  = document.all.search_flag.value;
       var search_item  = document.frm.search_item.value;
       var itype  		= document.all.itype.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", 	  in_fr_date);
       GridObj.SetParam("in_to_date", 	  in_to_date);
       GridObj.SetParam("search_flag", 	 search_flag);
       GridObj.SetParam("search_item",	 search_item);
       GridObj.SetParam("itype",	 	       itype);
       GridObj.DoQuery(servlet_url);
   }
   
   function doQuery2() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var in_fr_date   = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var search_flag  = document.all.search_flag.value;
       var search_item  = document.frm.search_item.value;
       var itype  		= document.all.itype.value;

       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search2");
       GridObj.SetParam("in_fr_date", 	  in_fr_date);
       GridObj.SetParam("in_to_date", 	  in_to_date);
       GridObj.SetParam("search_flag", 	 search_flag);
       GridObj.SetParam("search_item",	 search_item);
       GridObj.SetParam("itype",	 	       itype);
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

				// м啗
//	GridObj.AddSummaryBar('SUMMARY', '瞪羹м啗', 'summaryall', 'sum', 'STOCK_QTY,SALE_QTY,PROD_QTY'); 
//	GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 

                     
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
    