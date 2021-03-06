//## Щ煎斜極ID      : ip_05040_WMS_CloseInfo_Scm_list_pop2.js
//## Щ煎斜極貲      : WMS 轎堅葆馬滌 餌嶸婦葬 (寡薑嘐陶 で機)
//## 滲唳濠濠        : 檜鬼遵
//## 偃嫦橾濠        : 2015-03-17
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0		2015-03-17	CREATOR		褐敘
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_05040_WMS_CloseInfo_Scm_list_pop2';

var GridObj ; 													// WiseGrid 偌羹
var color_tot 		 = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';			//塭檣 摹鷗 寡唳儀 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue   = window.innerWidth;
            maxHeightValue  = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue   += Number(search_h); 
            tableHeightValue += Number(search_h);   
        } 
        
        // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
        // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1;
          
        //tabPage1.style.height = tabHeightValue + "px"; 

        document.WiseGrid.height = tableHeightValue + "px"; 
        //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
    }  

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 							弛
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.			弛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() { 
	
	var test = document.frm.col_flag.value;
	var test2 = document.frm.cnfm_date.value;	
	
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader(GridObj);  	//п渦儅撩 
	setDefault();        	//�飛� 晦獄 撲薑 
	doQuery();
}   
 

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
    
    
    
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj.strActiveRowBgColor    = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction 	   = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        
	
	GridObj.AddHeader("CRUD"		   	   ,"CRUD"   			,"t_text"  	   ,100		,0  	,false); //0	  
 	GridObj.AddHeader("ITEM_ID"	           ,"ヶ跡囀萄"			,"t_text" 	   ,100	    ,90     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ヶ跡貲"	        	,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("SALES_1MONTH"	   ,"1偃錯 ゎ敕\nっ衙榆"	,"t_number"    ,100	    ,90    	,false); //0 
 	GridObj.AddHeader("MODI_BOX"	       ,"奢晝й渡榆"			,"t_number"    ,100	    ,90    ,false); //0
 	GridObj.AddHeader("QTY"	       		   ,"橾橾っ衙榆"			,"t_number"    ,100	    ,90    ,false); //0   
 	GridObj.AddHeader("MINAP"	       	   ,"嘐陶榆"				,"t_number"    ,100.3	,90     ,false); //0   
 
 
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID',      'center');
    GridObj.SetColCellAlign('ITEM_NAME',    'left');
    GridObj.SetColCellAlign('SALES_1MONTH', 'right');
    GridObj.SetColCellAlign('MODI_BOX',     'right'); 
    GridObj.SetColCellAlign('QTY',     		'right');
    GridObj.SetColCellAlign('MINAP',     	'right');
   
    
    
    GridObj.SetNumberFormat("SALES_1MONTH", "###,###.#");
    GridObj.SetNumberFormat("MODI_BOX",     "###,###.#");
    GridObj.SetNumberFormat("QTY",     		"###,###.#");
    GridObj.SetNumberFormat("MINAP",     	"###,###.#");

	

	GridObj.SetColHide("CRUD", true);

	GridObj.SetCRUDMode("CRUD");   
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
            	
            	var row = GridObj.GetRowCount();            	
            	if (row == 0) return;
            	
            	//GridSetCombo();
            	GridSetMerge();
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }	
		
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
   
   	
    doQuery();
   }




/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
   	   var itype			=	document.frm.itype.value;
       var cnfm_date	    = 	document.frm.cnfm_date.value;      
       var col_flag 		=	document.frm.col_flag.value;
       var search_type		=	document.frm.search_type.value;
	 	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
  		
       GridObj.SetParam("mode",           		"search");
       GridObj.SetParam("cnfm_date",  			cnfm_date);      
       GridObj.SetParam("itype",  				itype); 
       GridObj.SetParam("search_type",  		search_type);   
	 
	   GridObj.DoQuery(servlet_url);       
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )

// 撚 盪濰 瞪羲滲熱
var objTdG;


// 陳瞼 匐儀 POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;	
}

// 陳瞼 匐儀 POP BTN mouseOut
function outBtn( objBtn ) {
	clickedDateIdx = null;	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}		

function GridCellDblClick(strColumnKey, nRow){

}


/*Sort 滲熱 摹樹 */

	var flag_item_id	 = '1';	
	var flag_item_name 	 = '1';
	var flag_qty_box = '1';
	var flag_modi_box = '1';
	var flag_sales_1month_box = '1';
	var flag_minap_box = '1';
	

function HeaderClick(strColumnKey){
	
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('SALES_1MONTH'		,true);
	GridObj.SetColCellSortEnable('MODI_BOX'			,true);
	GridObj.SetColCellSortEnable('QTY'				,true);
	GridObj.SetColCellSortEnable('MINAP'			,true);
	
	GridObj.ClearGroupMerge();
	
	if(strColumnKey == 'ITEM_ID') {
		
		if(flag_item_id =='1'){
			
			GridObj.SetColCellSort('ITEM_ID','descending');
		
			flag_item_id++;
		}
		else if(flag_item_id =='2'){
			
			GridObj.SetColCellSort('ITEM_ID','asceding');
		
			flag_item_id--;
		}
	}
	if(strColumnKey == 'ITEM_NAME') {
		
		if(flag_item_name =='1'){
		
			GridObj.SetColCellSort('ITEM_NAME','descending');
			flag_item_name++;
		}
		else if(flag_item_name =='2'){
			
			GridObj.SetColCellSort('ITEM_NAME','asceding');
			
			flag_item_name--;	
			
		}
	}
	if(strColumnKey == 'MODI_BOX') {
		
		if(flag_modi_box =='1'){
		
			GridObj.SetColCellSort('MODI_BOX','descending');
			flag_modi_box++;
		}
		else if(flag_modi_box =='2'){
			
			GridObj.SetColCellSort('MODI_BOX','asceding');
			
			flag_modi_box--;	
			
		}
	}
	if(strColumnKey == 'QTY') {
		
		if(flag_qty_box =='1'){
		
			GridObj.SetColCellSort('QTY','descending');
			flag_qty_box++;
		}
		else if(flag_qty_box =='2'){
			
			GridObj.SetColCellSort('QTY','asceding');
			
			flag_qty_box--;	
			
		}
	}
	if(strColumnKey == 'SALES_1MONTH') {
		
		if(flag_sales_1month_box =='1'){
		
			GridObj.SetColCellSort('SALES_1MONTH','descending');
			flag_sales_1month_box++;
		}
		else if(flag_sales_1month_box =='2'){
			
			GridObj.SetColCellSort('SALES_1MONTH','asceding');
			
			flag_sales_1month_box--;	
			
		}
	}
	if(strColumnKey == 'MINAP') {
		
		if(flag_minap_box =='1'){
		
			GridObj.SetColCellSort('MINAP','descending');
			flag_minap_box++;
		}
		else if(flag_minap_box =='2'){
			
			GridObj.SetColCellSort('MINAP','asceding');
			
			flag_minap_box--;	
			
		}
	}
	
	GridSetMerge();
		
}

function Synchronize() {
      var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
   
       GridObj.SetParam("mode",           		"Synchronize");      
	   GridObj.DoQuery(servlet_url);  
	
}

//function GridSetCombo(){
//	
//	var sel_gubn;
//
//	for(i=0; i<GridObj.GetRowCount(); i++){
//		
//		var gubn_val = GridObj.GetCellValue('GUBN_SCM', i);
//		GridObj.SetComboSelectedIndex('GUBN_SCM',i,gubn_val);
//	
//	}
//	
//
//	
//}

function GridSetMerge(){
	
				
		//GridObj.SetGroupMerge('DC_ID');
        //GridObj.AddSummaryBar('SUMMARY1', '模啗', 'DC_ID', 'sum', 'ODER_BOX,SELL_BOX,REMN_BOX'); 
   		GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'SALES_1MONTH,MODI_BOX,QTY,MINAP');
  	       
    	//GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
				
			
}

