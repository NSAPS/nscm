//############################################################
//## Щ煎斜極ID      : ip_02110_hawa_expt_sell_management.js
//## Щ煎斜極貲      : 啻蝸溯 っ衙蹺檜 婦葬
//## 偃嫦濠          : 陴錠辨
//## 偃嫦橾濠        : 2014-01-16
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_ip_02110_hawa_expt_sell_management.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2014-01-16  陴錠辨      create
//##
//############################################################

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_02110_hawa_expt_sell_management';
var GridObj ; 													// WiseGrid 偌羹

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
 	//GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'

	GridObj.bHDMoving = false; 
	GridObj.bHDSwapping = false 
	GridObj.bRowSelectorVisible = false 

	GridObj.strRowBorderStyle = 'none' 

	GridObj.nRowSpacing = 0 

	GridObj.strHDClickAction = 'select' 	// 
	// 
	//     
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        

	var cnfm_date	= document.all.cnfm_date.value;
	var strColumnKey;
	
	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "ip_02110_hawa_expt_sell_management_header",{
		callback:function(result){

			GridObj.AddHeader("CRUD"		,"CRUD"       	,"t_text" 	,100 		,0  	,false);
		  	GridObj.AddHeader("ITEM_ID"		,"ヶ跡囀萄"      	,"t_text" 	,100.3		,65  	,false); //0   
		  	GridObj.AddHeader("ITEM_NAME"	,"ヶ跡貲"      	,"t_text" 	,100.3		,170  	,false); //0   
		  	GridObj.AddHeader("GUBN"		,"掘碟囀萄"      	,"t_text" 	,100.3		,0  	,false); //0   
		  	GridObj.AddHeader("GUBN_NAME"	,"掘碟"      	,"t_text" 	,100.3		,100  	,false); //0   
		  	   

			for(var i=0 ; i < result.length ; i++){  
				if(i < 6) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100	,63  ,false);
				}
				else { // editable!
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100	,63  ,true);
				}
				    
			}
			
			GridObj.BoundHeader(); //AddHeader蒂 諫猿и �� ④渦蒂 斜葬萄縑 夥檣註и棻. 
			
    		GridObj.SetColCellAlign('ITEM_ID','center'); 
    		GridObj.SetColCellAlign('ITEM_NAME','left'); 
    		GridObj.SetColCellAlign('GUBN_NAME','center'); 

			// 婁剪 6輿離
			for(var i = 1 ; i < 7 ; i++) {
				strColumnKey = 'W_P0'+i;
				GridObj.SetColCellAlign(strColumnKey,'right');
				GridObj.SetNumberFormat(strColumnKey, "#,##0");
			}
			
			GridObj.SetCRUDMode("CRUD", "儅撩", "熱薑", "餉薯");
			
			//Hidden 鏽歲
			GridObj.SetColHide("CRUD",true);

			
			// ⑷營檜�� 26輿離
			for(var i=0 ; i < 27 ; i++) {
				if(i<10) {
					strColumnKey = 'W_N0' + i;
				}
				else {
					strColumnKey = 'W_N' + i;
				}
				GridObj.SetColCellAlign(strColumnKey,'right');
				GridObj.SetNumberFormat(strColumnKey, "#,##0");
			}

			GridObj.SetColFix('GUBN_NAME'); 
			
			GridObj.SetColHDBgColor('W_N00', '253|228|229'); 			
		}
		
	});   
       
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service) {
	doQuery();
}
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cnfm_date	= document.all.cnfm_date.value;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("cnfm_date", cnfm_date);
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

}
      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var cnfm_date	= document.all.cnfm_date.value;
   
   //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("cnfm_date", cnfm_date);

	GridObj.DoQuery(servlet_url);
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';

	var color_02 = 		'242|242|242';		
	var color_03 = 		'232|232|232';		
	var color_04 = 		'217|242|255';		
	var color_06 = 		'221|221|221';	
	
	var strColumnKey;	
          
    if(endMode == "search") //褻�萼� 諫猿脹 唳辦
    {

	    var rowCnt = GridObj.GetRowCount();
	    for (var i = 0 ; i < rowCnt ; i++ ){

	    	var gubn = GridObj.GetCellValue("GUBN", i);
		    	
	    	// row 瞪羹 寡唳儀
	    	if(gubn == "01") {
	    		GridObj.SetRowBgColor(i, colBg02);
	    	}	
	    	else if(gubn == "06") {
	    		GridObj.SetRowBgColor(i, color_06);
	    	}			

			for(var k = 1 ; k < 7 ; k++) {
				strColumnKey = 'W_P0'+k;
				
				if( gubn == "03") { // 營堅(м啗)
					GridObj.SetCellBgColor('GUBN_NAME', i, color_03);  
					GridObj.SetCellBgColor(strColumnKey, i, color_03);
				}
				else if( gubn == "02") { //營堅(啻蝸溯)
					GridObj.SetCellBgColor('GUBN_NAME', i, color_02);
					GridObj.SetCellBgColor(strColumnKey, i, color_02); 	
				}
				else if( gubn == "04") { //殮堅(啻蝸溯)
					GridObj.SetCellBgColor('GUBN_NAME', i, color_04);
					GridObj.SetCellBgColor(strColumnKey, i, color_04); 	
				}
				else if( gubn == "05") { //っ衙蕨難
					GridObj.SetCellBgColor('GUBN_NAME', i, color_edit_col);
					GridObj.SetCellBgColor(strColumnKey, i, color_edit_col); 	
				}
			}
		    // ⑷營檜�� 26輿離
			for(var j = 0 ; j < 27 ; j++) {
				
				if(j < 10) {
					strColumnKey = 'W_N0' + j;
				}
				else {
					strColumnKey = 'W_N' + j;
				}

				if( gubn == "01") { // 營堅(堯褕)
					GridObj.SetCellActivation(strColumnKey, i, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻.
			    }
			    else if( gubn == "02") { //營堅(啻蝸溯)
			    	GridObj.SetCellBgColor(strColumnKey, i, color_02); 
			    	if(j == 0) { // 渡輿
			    		GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    	}
			    	else GridObj.SetCellActivation(strColumnKey, i, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻.
			    }
			    else if( gubn == "03") { //營堅(м啗) {
			    	GridObj.SetCellBgColor(strColumnKey, i,color_03);
			    	GridObj.SetCellActivation(strColumnKey, i, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻.
			    	GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    }
			    else if( gubn == "04") { //殮堅(啻蝸溯)
			    	GridObj.SetCellBgColor(strColumnKey, i,color_04);  
			    	GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    }
			    else if( gubn == "05") { //っ衙蕨難
			    	GridObj.SetCellBgColor(strColumnKey, i, color_edit_col); 
			    	GridObj.SetCellFontBold(strColumnKey, i,'true');  // bold
			    }
			    else if( gubn == "06") { //っ衙褒瞳
			    	GridObj.SetCellActivation(strColumnKey, i, 'disable'); //摹鷗й 熱 橈堅 ら餵й 熱 橈棻.
			    }				

			}
		    
		    
	    }        
    	GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME');
    	compute_field();
    }                     
    else    
    { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
    }
    
}

function excelDown() {

	var GridObj = document.WiseGrid;
	GridObj.ExcelExport("", "", true, true);
}

function GridCellClick(strColumnKey, nRow){
	
}

function GridCellDblClick(strColumnKey, nRow){
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	compute_field();
}

function compute_field() {
	
    var rowCnt = GridObj.GetRowCount();
	var strColumnKey, p_strColumnKey;
	var ns_stock = 0, reqt_ns_stock = 0, nestle_stoc = 0; stoc_tot = 0;
    for (var i = 0 ; i < rowCnt ; i++ )	{
		var gubn = GridObj.GetCellValue("GUBN", i);
		
		// ⑷營檜�� 26輿離
		for(var j = 0 ; j < 27 ; j++) {
			if(j < 10) {
				strColumnKey = 'W_N0' + j;
				if(j > 0) {p_strColumnKey = 'W_N0' + (j - 1);}
			}
			else {
				strColumnKey = 'W_N' + j;
				if(j == 10) {p_strColumnKey = 'W_N0' + (j - 1);}
				else {p_strColumnKey = 'W_N' + (j - 1);}
			}
			if(gubn == "01") { // 營堅(堯褕)
				if(j > 0) { // 渡輿 檜�� 啗骯 : 營堅(堯褕) - 瞪輿 っ衙蕨難
					ns_stock = strToNum(GridObj.GetCellValue(p_strColumnKey, i)) 
								- strToNum(GridObj.GetCellValue(p_strColumnKey, i + 4)); 
					if(ns_stock < 0) { // 營堅陛 睡褶ж賊
						ns_stock = 0;
					}
					GridObj.SetCellValue(strColumnKey, i, ns_stock);
				}
			}
			else if(gubn == "02") { // 營堅(啻蝸溯)
				if(j > 0) { 
					// 堯褕 營堅 睡褶碟 啗骯 : 瞪輿 營堅(堯褕) - 瞪輿 っ衙蕨難
					reqt_ns_stock = strToNum(GridObj.GetCellValue(p_strColumnKey, i - 1))
								   - strToNum(GridObj.GetCellValue(p_strColumnKey, i + 3)) 
					if(reqt_ns_stock > 0) { // 營堅陛 睡褶ж雖 彊戲賊
						reqt_ns_stock = 0;
					}
					// 營堅(啻蝸溯) = 瞪輿 營堅(啻蝸溯) - 堯褕 營堅 睡褶碟  + 瞪輿 殮堅(啻蝸溯)
					nestle_stoc = strToNum(GridObj.GetCellValue(p_strColumnKey, i)) 
								  + reqt_ns_stock
								  + strToNum(GridObj.GetCellValue(p_strColumnKey, i + 2)); 
					GridObj.SetCellValue(strColumnKey, i, nestle_stoc);
				}
			}
			else if(gubn == "03") { // 營堅(м啗) = 營堅(堯褕) + 營堅(啻蝸溯)
				stoc_tot = strToNum(GridObj.GetCellValue(strColumnKey, i - 2)) 
							+ strToNum(GridObj.GetCellValue(strColumnKey, i - 1)); 
				GridObj.SetCellValue(strColumnKey, i, stoc_tot);
 				if(stoc_tot < 0) {
 					GridObj.SetCellFgColor(strColumnKey, i ,'255|10|10');
 				}
 			}
	    }
	}
 
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
