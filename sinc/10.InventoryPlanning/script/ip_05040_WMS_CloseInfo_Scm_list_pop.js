//## Щ煎斜極ID      : ip_05040_WMS_CloseInfo_Scm_list_pop.js
//## Щ煎斜極貲      : WMS 轎堅葆馬滌 餌嶸婦葬 (で機)
//## 滲唳濠濠        : 檜鬼遵
//## 偃嫦橾濠        : 2015-03-16
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0		2015-03-16	CREATOR		褐敘
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_05040_WMS_CloseInfo_Scm_list_pop';

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
	
	GridObj.AddHeader("CRUD"		   	   ,"CRUD"   		,"t_text"  	   ,100		,0  	,false); //0
	GridObj.AddHeader("DC_ID"	           ,"DC囀萄"			,"t_text" 	   ,100	    ,70     ,false); //0   
	GridObj.AddHeader("DC_NAME"	           ,"DC貲"			,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_ID"	           ,"ヶ跡囀萄"		,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       ,"ヶ跡貲"	        ,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("GUBN_IDX"	       ,"葆馬掘碟"		,"t_text" 	   ,100	    ,0    	,false); //0 
 	GridObj.AddHeader("GUBN"	           ,"葆馬掘碟"		,"t_text" 	   ,100	    ,140    ,false); //0   
 	GridObj.AddHeader("ODER_BOX"	       ,"輿僥"			,"t_number"    ,100.3	,70     ,false); //0   
 	GridObj.AddHeader("SELL_BOX"	       ,"葆馬"			,"t_number"    ,100.3	,70     ,false); //0   
 	GridObj.AddHeader("REMN_BOX"		   ,"離檜"			,"t_number"    ,100.3	,70     ,false); //0
 	GridObj.AddHeader("GUBN_SCM"	       ,"SCM 葆馬掘碟"	,"t_combo"     ,100	    ,90     ,true); //0 	
 	GridObj.AddHeader("BIGO"		       ,"綠堅"			,"t_text" 	   ,100	    ,180    ,true); //0
 
	/* 盪濰擊 嬪и �鰽� 高 */

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('DC_ID',        'center'); 
    GridObj.SetColCellAlign('DC_NAME',      'left');
    GridObj.SetColCellAlign('ITEM_ID',      'center');
    GridObj.SetColCellAlign('ITEM_NAME',    'left');
    GridObj.SetColCellAlign('GUBN',       	'center');
    GridObj.SetColCellAlign('ODER_BOX',     'right'); 
    GridObj.SetColCellAlign('SELL_BOX',     'right');
    GridObj.SetColCellAlign('REMN_BOX',     'right'); 
    GridObj.SetColCellAlign('GUBN_SCM',     'right');
    GridObj.SetColCellAlign('BIGO',        	'center');
    
    
    GridObj.SetNumberFormat("ODER_BOX",     "###,###.#");
    GridObj.SetNumberFormat("SELL_BOX",     "###,###.#");
    GridObj.SetNumberFormat("REMN_BOX",     "###,###.#");

	GridObj.SetColCellBgColor('GUBN_SCM',color_edit_col);	

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
        else if(endMode == "doSave"){
            	
            	if(GridObj.GetStatus() == "true"){
            		doQuery();
            	}
            }
        
}
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
   
   	
    doQuery();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave(service) {
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	doSave();	
	
};


      
// 盪濰
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	 var cnfm_date	    = document.frm.cnfm_date.value;
     
    
  
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	GridObj.SetParam("cnfm_date",  cnfm_date);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	
	GridObj.DoQuery(servlet_url, "CRUD");
	
 	
 	return;
}    


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
   	   var itype			=   document.frm.itype.value;
       var cnfm_date	    = 	document.frm.cnfm_date.value;      
       var col_flag 		=	document.frm.col_flag.value; 
       var search_type		=	document.frm.search_type.value;
       
       var reason; 		
 	   if(col_flag =='5')		reason = '1';
 	   else if(col_flag =='6')		reason = '2';
 	   else if(col_flag =='7')		reason = '3';
 	   else if(col_flag =='8')		reason = '4';
 	   else if(col_flag =='9')		reason = '5';
 	   else							reason = '0';
	 	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
  		
       GridObj.SetParam("mode",           		"search");
       GridObj.SetParam("cnfm_date",  			cnfm_date);
       GridObj.SetParam("reason",  				reason);
       GridObj.SetParam("itype",  				itype);
       GridObj.SetParam("search_type",			search_type);
	 
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

	var flag_dc_id 		 = '1';	
	var flag_dc_name	 = '1';
	var flag_item_id	 = '1';	
	var flag_item_name 	 = '1';
	
	var flag_oder_box = '1';
	var flag_sell_box = '1';
	var flag_remn_box = '1';
	

function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('DC_ID'			,true);
	GridObj.SetColCellSortEnable('DC_NAME'			,true);
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);
	GridObj.SetColCellSortEnable('ODER_BOX'			,true);
	GridObj.SetColCellSortEnable('SELL_BOX'			,true);
	GridObj.SetColCellSortEnable('REMN_BOX'			,true);
	
	GridObj.ClearGroupMerge();
	
	if(strColumnKey == 'DC_ID') {
		
		if(flag_dc_id =='1'){
			
			GridObj.SetColCellSort('DC_ID','descending');
		
			flag_dc_id++;
		}
		else if(flag_dc_id =='2'){
			
			GridObj.SetColCellSort('DC_ID','asceding');
		
			flag_dc_id--;
		}
	}
	
	if(strColumnKey == 'DC_NAME') {
		
		if(flag_dc_name =='1'){
			
			GridObj.SetColCellSort('DC_NAME','descending');
		
			flag_dc_name++;
		}
		else if(flag_dc_name =='2'){
			
			GridObj.SetColCellSort('DC_NAME','asceding');
		
			flag_dc_name--;
		}
	}
	
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
	if(strColumnKey == 'ODER_BOX') {
		
		if(flag_oder_box =='1'){
		
			GridObj.SetColCellSort('ODER_BOX','descending');
			flag_oder_box++;
		}
		else if(flag_oder_box =='2'){
			
			GridObj.SetColCellSort('ODER_BOX','asceding');
			
			flag_oder_box--;	
			
		}
	}
	if(strColumnKey == 'SELL_BOX') {
		
		if(flag_sell_box =='1'){
		
			GridObj.SetColCellSort('SELL_BOX','descending');
			flag_sell_box++;
		}
		else if(flag_sell_box =='2'){
			
			GridObj.SetColCellSort('SELL_BOX','asceding');
			
			flag_sell_box--;	
			
		}
	}
	if(strColumnKey == 'REMN_BOX') {
		
		if(flag_remn_box =='1'){
		
			GridObj.SetColCellSort('REMN_BOX','descending');
			flag_remn_box++;
		}
		else if(flag_remn_box =='2'){
			
			GridObj.SetColCellSort('REMN_BOX','asceding');
			
			flag_remn_box--;	
			
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
	
				
		GridObj.SetGroupMerge('DC_ID');
        GridObj.AddSummaryBar('SUMMARY1', '模啗', 'DC_ID', 'sum', 'ODER_BOX,SELL_BOX,REMN_BOX'); 
   		GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'summaryall', 'sum', 'ODER_BOX,SELL_BOX,REMN_BOX');
  	       
    	GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
				
			
}

