/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id 	   = 'sc_13050_set_prod_planVsActualResultByPlant_list';
var GridObj ; 													// WiseGrid 偌羹

var color_tot 	      = '255|234|0';		//м啗 塭檣 寡唳儀
var color_edit_col    = '204|204|204';			//離檜榆 儀梃 ル衛 '255|253|208', '253|228|229'//

var color_sp 	      = '230|222|230'; 		//鏽歲 掘碟摹 寡唳儀
var color_select_row  = '141|232|141';		//塭檣 摹鷗 寡唳儀


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

    GridObj.nHDLineSize				=	26; //Header Size
    GridObj.strHDClickAction		=	"sortsingle";
 	GridObj.strActiveRowBgColor		=	"232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor	=	'232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor	=	'0|0|0'; 
	GridObj.strMouseWheelAction		=	'page'; // page 欽嬪 scroll ->晦獄擎 'default'    
	
	GridObj.strHDClickAction		=	"select";	
	
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        
		
	var selected_type	= document.all.selected_type.value;
	var checked_uom 	= document.frm.checked_uom.value;

	if(selected_type=="2"){
		GridObj.AddHeader("SALES_CAT03"		,"ヶ跡囀萄"    	 ,"t_text" 	    		,100	,90   ,false); // 醞碟盟// 
		GridObj.AddHeader("CD_NAME"			,"ヶ跡貲"    	 	 ,"t_text" 	    		,100    ,160  ,false);
		GridObj.AddHeader("GUBN"			,"掘碟"       	 ,"t_text" 	    		,100	,75   ,false);		
	 	GridObj.AddHeader("MTS_AN_QTY"	    ,"3SforU(寰曄)"  ,"t_number" 			,100.3	,100  ,false);	 
		GridObj.AddHeader("MTS_PO_QTY"	    ,"3SforU(ん蝓)"  ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("DY_QTY"	        ,"翕曄僭盟"       ,"t_number" 			,100.3	,100  ,false);	  
	  	GridObj.AddHeader("TK_QTY"	        ,"渠掘唳磁棟旎"    ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("SAMBO_QTY"	    ,"鳴爾"         	 ,"t_number" 			,100.3	,100  ,false);
	 	GridObj.AddHeader("TOT"			    ,"啗"       		 ,"t_number" 			,100.3	,120  ,false);   
	
	    /* 檜醞 п渦 蹺陛 */
		GridObj.AddGroup("HD1",    "濛機濰滌");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		GridObj.AppendHeader("HD1",   "MTS_AN_QTY");		
		GridObj.AppendHeader("HD1",   "MTS_PO_QTY");		
		GridObj.AppendHeader("HD1",   	  "DY_QTY");
		GridObj.AppendHeader("HD1",  	  "TK_QTY");		
		GridObj.AppendHeader("HD1",    "SAMBO_QTY");	
		
		GridObj.BoundHeader();	
		
	    GridObj.SetColCellAlign('SALES_CAT03',	  'left'); 
	    GridObj.SetColCellAlign('CD_NAME',	  	  'left');    
	    GridObj.SetColCellAlign('GUBN',			'center');
	    GridObj.SetColCellAlign('MTS_AN_QTY',	 'right');	   
	    GridObj.SetColCellAlign('MTS_PO_QTY',	 'right');	 
	    GridObj.SetColCellAlign('DY_QTY',	     'right');	   
	    GridObj.SetColCellAlign('TK_QTY',	     'right');
	    GridObj.SetColCellAlign('SAMBO_QTY',	 'right');
	    GridObj.SetColCellAlign('TOT',	   	     'right');
	    
		GridObj.SetNumberFormat('MTS_AN_QTY',  '#,##0.#');		
		GridObj.SetNumberFormat('MTS_PO_QTY',  '#,##0.#');	
		GridObj.SetNumberFormat('DY_QTY',      '#,##0.#');		
		GridObj.SetNumberFormat('TK_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('SAMBO_QTY',   '#,##0.#');
		GridObj.SetNumberFormat('TOT',     	   '#,##0.#');
	
	}else if(selected_type=="3"){
		
		GridObj.AddHeader("SALES_CAT01"		,"ヶ跡囀萄"    	 ,"t_text" 	    		,100	,90   ,false); // 渠碟盟 // 
		GridObj.AddHeader("CD_NAME"			,"ヶ跡貲"    	 	 ,"t_text" 	    		,100    ,160  ,false);
		GridObj.AddHeader("GUBN"			,"掘碟"       	 ,"t_text" 	    		,100	,75   ,false);		
		GridObj.AddHeader("MTS_AN_QTY"	    ,"3SforU(寰曄)"  ,"t_number" 			,100.3	,100  ,false);			    
		GridObj.AddHeader("MTS_PO_QTY"	    ,"3SforU(ん蝓)"  ,"t_number" 			,100.3	,100  ,false);	  	
	  	GridObj.AddHeader("DY_QTY"	        ,"翕曄僭盟"       ,"t_number" 			,100.3	,100  ,false);	  	
	  	GridObj.AddHeader("TK_QTY"	        ,"渠掘唳磁棟旎"    ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("SAMBO_QTY"	    ,"鳴爾"         	 ,"t_number" 			,100.3	,100  ,false);
	 	GridObj.AddHeader("TOT"			    ,"啗"       		 ,"t_number" 			,100.3	,120  ,false);   
	
	    /* 檜醞 п渦 蹺陛 */
		GridObj.AddGroup("HD1",    "濛機濰滌");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		GridObj.AppendHeader("HD1",   "MTS_AN_QTY");

		GridObj.AppendHeader("HD1",   "MTS_PO_QTY");

		GridObj.AppendHeader("HD1",       "DY_QTY");
	
		GridObj.AppendHeader("HD1",       "TK_QTY");
		GridObj.AppendHeader("HD1",    "SAMBO_QTY");	
		
		GridObj.BoundHeader();	
		     
	    GridObj.SetColCellAlign('SALES_CAT01',	  'left'); 
	    GridObj.SetColCellAlign('CD_NAME',		  'left');
	    GridObj.SetColCellAlign('GUBN',			'center');
	    GridObj.SetColCellAlign('MTS_AN_QTY',	 'right');
	
	    GridObj.SetColCellAlign('MTS_PO_QTY',	 'right');
	    
	    GridObj.SetColCellAlign('DY_QTY',	     'right');
	  
	    GridObj.SetColCellAlign('TK_QTY',	     'right');
	    GridObj.SetColCellAlign('SAMBO_QTY',	 'right');
	    GridObj.SetColCellAlign('TOT',	   	     'right');
	    
		GridObj.SetNumberFormat('MTS_AN_QTY',  '#,##0.#');
		
		GridObj.SetNumberFormat('MTS_PO_QTY',  '#,##0.#');
	
		GridObj.SetNumberFormat('DY_QTY',      '#,##0.#');
		
		GridObj.SetNumberFormat('TK_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('SAMBO_QTY',   '#,##0.#');
		GridObj.SetNumberFormat('TOT',     	   '#,##0.#');
	
	}else{
				GridObj.AddHeader("ITEM_ID"			,"ヶ跡囀萄"    	 ,"t_text" 	    		,100	,75   ,false); 
				GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"    	 	,"t_text" 	    		,100    ,190  ,false);
				GridObj.AddHeader("SPEC"			,"敘問"       	,"t_text" 	    		,100	,110  ,false);
				GridObj.AddHeader("GUBN"			,"掘碟"       	,"t_text" 	    		,100	,75   ,false);				
				GridObj.AddHeader("MTS_AN_QTY"	    ,"3SforU(寰曄)" ,"t_number" 				,100.3	,100  ,false);    
				
				GridObj.AddHeader("MTS_PO_QTY"	    ,"3SforU(ん蝓)" ,"t_number" 				,100.3	,100  ,false);
			 
			  	GridObj.AddHeader("DY_QTY"	        ,"翕曄僭盟"      ,"t_number" 				,100.3	,95   ,false);
			
			  	GridObj.AddHeader("TK_QTY"	        ,"渠掘唳磁棟旎"   ,"t_number" 				,100.3	,95   ,false);
			  	GridObj.AddHeader("SAMBO_QTY"	    ,"鳴爾"         	,"t_number" 			,100.3	,90   ,false);
			 	GridObj.AddHeader("TOT"			    ,"啗"       		,"t_number" 			,100.3	,90   ,false); 
				
				 /* 檜醞 п渦 蹺陛 */
				GridObj.AddGroup("HD1",    "濛機濰滌");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
				GridObj.AppendHeader("HD1",   "MTS_AN_QTY");		
				GridObj.AppendHeader("HD1",   "MTS_PO_QTY");				
				GridObj.AppendHeader("HD1",       "DY_QTY");				
				GridObj.AppendHeader("HD1",       "TK_QTY");
				GridObj.AppendHeader("HD1",    "SAMBO_QTY");	
				
				GridObj.BoundHeader();	
				
			    GridObj.SetColCellAlign('ITEM_ID',		  'left'); 
			    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
			    GridObj.SetColCellAlign('SPEC',			'center');
			    GridObj.SetColCellAlign('GUBN',			'center');
			    GridObj.SetColCellAlign('MTS_AN_QTY',	 'right');
			   
			    GridObj.SetColCellAlign('MTS_PO_QTY',	 'right');
			
			    GridObj.SetColCellAlign('DY_QTY',	     'right');
			  
			    GridObj.SetColCellAlign('TK_QTY',	     'right');
			    GridObj.SetColCellAlign('SAMBO_QTY',	 'right');
			    GridObj.SetColCellAlign('TOT',	   	     'right');
			    
				GridObj.SetNumberFormat('MTS_AN_QTY',  '#,##0.#');
				
				GridObj.SetNumberFormat('MTS_PO_QTY',  '#,##0.#');
			
				GridObj.SetNumberFormat('DY_QTY',      '#,##0.#');
			
				GridObj.SetNumberFormat('TK_QTY',      '#,##0.#');
				GridObj.SetNumberFormat('SAMBO_QTY',   '#,##0.#');
				GridObj.SetNumberFormat('TOT',     	   '#,##0.#');		
			
	}
   
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
	    
     var in_fr_date     	= document.all.in_fr_date.value;
     var in_to_date     	= document.all.in_to_date.value;
     var selected_type	    = document.all.selected_type.value;
     var checked_uom 	    = document.frm.checked_uom.value;
     
     GridObj = document.WiseGrid;
	 GridObj.ClearGrid();
	 setHeader(GridObj);   
		
		if(selected_type=="2"){
			doQuery2();
			}else if(selected_type=="3"){
			doQuery3();
		}else{
			doQuery();
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
       var in_fr_date     = document.all.in_fr_date.value;
	   var in_to_date     = document.all.in_to_date.value;
       var checked_uom 	  = document.frm.in_checked_uom.value;
       
       in_fr_date 		  = in_fr_date.replace(/-/g,"");
       in_to_date 		  = in_to_date.replace(/-/g,"");
       
       
       var selected_type  = document.all.selected_type.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", 	  	 in_fr_date);
       GridObj.SetParam("in_to_date", 	  	 in_to_date);
       GridObj.SetParam("selected_type",  selected_type);
       GridObj.SetParam("checked_uom",  	checked_uom);
       
       GridObj.DoQuery(servlet_url);
   } 
   
   /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery2() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       var checked_uom 	  = document.frm.in_checked_uom.value;
       var in_fr_date     = document.all.in_fr_date.value;
       var in_to_date     = document.all.in_to_date.value;
       in_fr_date 		  = in_fr_date.replace(/-/g,"");
       in_to_date 		  = in_to_date.replace(/-/g,"");
       
       var selected_type  = document.all.selected_type.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search2");
       GridObj.SetParam("in_fr_date", 	  	 in_fr_date);
       GridObj.SetParam("in_to_date", 	  	 in_to_date);
       GridObj.SetParam("selected_type",  selected_type);
       GridObj.SetParam("checked_uom",  	checked_uom);
       GridObj.DoQuery(servlet_url);
   } 

 /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery3() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var checked_uom 	  = document.frm.in_checked_uom.value;
       var in_fr_date     = document.all.in_fr_date.value;
       var in_to_date     = document.all.in_to_date.value;
              
       in_fr_date 		  = in_fr_date.replace(/-/g,"");
       in_to_date 		  = in_to_date.replace(/-/g,"");
       var selected_type  = document.all.selected_type.value;       

       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search3");
       GridObj.SetParam("in_fr_date", 	  	 in_fr_date);
       GridObj.SetParam("in_to_date", 	  	 in_to_date);
       GridObj.SetParam("selected_type",  selected_type);
       GridObj.SetParam("checked_uom",  	checked_uom);
       GridObj.DoQuery(servlet_url);
   } 
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridEndQuery() 
    {
        var endMode			= GridObj.GetParam("mode");
        var error_msg		= '';
        var selected_type	= document.all.selected_type.value;  
        var checked_uom 	= document.frm.checked_uom.value;  
        
        if(endMode == "search") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj.GetStatus() == "true") 
            {                           

				if(selected_type=="2"){
					GridObj.SetGroupMerge('SALES_CAT03,CD_NAME');
				}else if(selected_type=="3"){
					GridObj.SetGroupMerge('SALES_CAT01,CD_NAME'); 
				}else{
					GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,SPEC');
				}								
				
				for(var i=0;i<GridObj.GetRowCount();i++) {
					if(GridObj.GetCellValue('GUBN',i) == "離檜"){
						GridObj.SetCellBgColor('GUBN',			i, 	color_edit_col);
						GridObj.SetCellBgColor('MTS_AN_QTY',	i,	color_edit_col);						
						GridObj.SetCellBgColor('MTS_PO_QTY',  	i,	color_edit_col);						
						GridObj.SetCellBgColor('DY_QTY',      	i, 	color_edit_col);						
						GridObj.SetCellBgColor('TK_QTY',      	i, 	color_edit_col);
						GridObj.SetCellBgColor('SAMBO_QTY',     i, 	color_edit_col);
						GridObj.SetCellBgColor('TOT',	      	i, 	color_edit_col);	
					}					
						
					}

				}    
		                    
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
        }

   
function excelDownload(){
	
 	 var selected_type  = document.all.selected_type.value;
		
	if(selected_type=="2"){
		GridObj.ClearGroupMerge();
	}else if(selected_type=="3"){
		GridObj.ClearGroupMerge(); 
	}else{
		GridObj.ClearGroupMerge();
	}	
	GridObj.ExcelExport('', '', true, true);
	
	if(selected_type=="2"){
		GridObj.SetGroupMerge('SALES_CAT03,CD_NAME');
	}else if(selected_type=="3"){
		GridObj.SetGroupMerge('SALES_CAT01,CD_NAME'); 
	}else{
		GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,,SPEC');
	}
			
}

// ......
function set_check_gubn(checked_uom) {
	
	document.frm.in_checked_uom.value = checked_uom;
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
            maxWidthValue  = window.innerWidth;
            maxHeightValue = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h); 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h); 
        
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
        
        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }