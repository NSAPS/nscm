//############################################################
//## Щ煎斜極ID      : sc_01130_ProductionPlanChange_TimeFance_list.js
//## Щ煎斜極貲      : SCM輿僥蹺瞳褻��
//## 偃嫦濠          : 陴錠辨
//## 偃嫦橾濠        : 2009-10-13
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_04.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-10-13  陴錠辨      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_01130_ProductionPlanChange_TimeFance_list';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2;

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

function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader2(GridObj2);  	//п渦儅撩 
	setDefault2();        	//�飛� 晦獄 撲薑 
}   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'    
	
    GridObj.nHDLineSize   = 18; //15
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2; 
}

function setDefault2() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'    
	
    GridObj.nHDLineSize   = 18; //15
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2; 
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {
	
	GridObj.AddHeader("PLANT_ID"	,"掘碟"       			,"t_text" 	,100    ,0  ,false);
	GridObj.AddHeader("PLANT_NAME"	,"掘碟"       			,"t_text" 	,100    ,70  ,false);
	GridObj.AddHeader("WW"			,"錯"       				,"t_text" 	,100	,70  ,false); //0   
 	GridObj.AddHeader("OD_CNT"		,"識 螃渦勒熱"     	  	,"t_number" ,100.3	,80  ,false); //0   
 	GridObj.AddHeader("CH_CNT"		,"滲唳勒熱"       		,"t_number" ,100.3	,80  ,false); //0   
 	GridObj.AddHeader("CH_RATE"		,"滲唳徽(%)"       		,"t_text" 		,500	,80 ,false); //0   
 	GridObj.AddHeader("TP_CNT"		,"3橾 TF檜頂 滲唳勒熱"		,"t_number" 	,100.3	,150  ,false); //0   
 	GridObj.AddHeader("CH_RATE_TP"	,"滲唳徽(滲唳勒熱晦遽)"		,"t_text" 	,500	,150  ,false); //0   
 	GridObj.AddHeader("CH_RATE_OD"	,"滲唳徽(識 螃渦 晦遽)" 	,"t_text" 	,200	,150  ,false); //0   

 	GridObj.AddHeader("START_DATE"	,"衛濛橾濠" 	,"t_text" ,200	,0  ,false); //0   
 	GridObj.AddHeader("END_DATE"	,"謙猿橾濠" 	,"t_text" ,200	,0  ,false); //0   



	GridObj.AddGroup("HD1"	,"滲唳勒熱");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("HD1", "CH_CNT");
	GridObj.AppendHeader("HD1", "CH_RATE");
	GridObj.AddGroup("HD2"	,"3橾 TF 勒熱");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("HD2", "TP_CNT");
	GridObj.AppendHeader("HD2", "CH_RATE_TP");
	GridObj.AppendHeader("HD2", "CH_RATE_OD");


	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('PLANT_NAME','center'); 
    GridObj.SetColCellAlign('WW','center'); 

    GridObj.SetColCellAlign('CH_RATE','right'); 
    GridObj.SetColCellAlign('CH_RATE_TP','right'); 
    GridObj.SetColCellAlign('CH_RATE_OD','right'); 



    GridObj.SetNumberFormat('OD_CNT','#,##0.#'); 
    GridObj.SetNumberFormat('CH_CNT','#,##0.#'); 
    GridObj.SetNumberFormat('TP_CNT','#,##0.#'); 
       
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader2(GridObj2) {
	
	GridObj2.AddHeader("PLANT_ID"	,"奢濰貲"    	,"t_text" 	,100    ,0  ,false);
	GridObj2.AddHeader("PLANT_NAME"	,"奢濰貲"    	,"t_text" 	,100    ,80  ,false);
	GridObj2.AddHeader("WW"			,"輿離"      ,"t_text" 	,100    ,85  ,false);
	GridObj2.AddHeader("PROD_DATE"	,"儅骯橾濠"   ,"t_text" 	,100	,85  ,false); //0   
 	GridObj2.AddHeader("CH_DATE"	,"滲唳橾濠"   ,"t_text" 	,100	,85  ,false); //0   
 	GridObj2.AddHeader("TERM"		,"離檜"      ,"t_text" 	,100	,60  ,false); //0   
 	GridObj2.AddHeader("ITEM_ID"	,"ヶ跡廓��"   ,"t_text" 	,500	,80 ,false); //0   
 	GridObj2.AddHeader("ITEM_NAME"	,"ヶ跡貲"		,"t_text" 	,100	,170  ,false); //0   
 	GridObj2.AddHeader("BF_QTY"		,"滲唳瞪"		,"t_number" ,500.3	,70  ,false); //0   
 	GridObj2.AddHeader("AF_QTY"		,"滲唳��" 	,"t_number" ,200.3	,70  ,false); //0   
 	GridObj2.AddHeader("GUBN"		,"掘碟" 		,"t_text" 	,200	,70  ,false); //0   


	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('PLANT_NAME','center'); 
    GridObj2.SetColCellAlign('WW','center'); 
    GridObj2.SetColCellAlign('PROD_DATE','center'); 
    GridObj2.SetColCellAlign('CH_DATE','center'); 
    
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    GridObj2.SetColCellAlign('TERM','center'); 
    GridObj2.SetColCellAlign('GUBN','center'); 

    GridObj2.SetNumberFormat('BF_QTY','#,##0.#'); 
    GridObj2.SetNumberFormat('AF_QTY','#,##0.#'); 
       
}

   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
       doQuery();
   }
     
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var start_date	= document.all.start_date.value;
       var end_date		= document.all.end_date.value;
       var search_gubn	= document.all.search_gubn.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("start_date", start_date);
       GridObj.SetParam("end_date", end_date);
       GridObj.SetParam("search_gubn", search_gubn);
       
 
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
				GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'sum', 'OD_CNT,CH_CNT,TP_CNT,CH_RATE,CH_RATE_TP,CH_RATE_OD'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160');
				
				var tot_od_cnt	= strToNum(GridObj.GetSummaryBarValue('SUMMARY1','OD_CNT',0,false));
				var tot_ch_cnt	= strToNum(GridObj.GetSummaryBarValue('SUMMARY1','CH_CNT',0,false));
				var tot_tp_cnt	= strToNum(GridObj.GetSummaryBarValue('SUMMARY1','TP_CNT',0,false));
				
				
				// 儅骯啗�� 滲唳徽 CH_RATE
				if(tot_od_cnt != 0) {
					GridObj.SetSummaryBarValue('SUMMARY1','CH_RATE',0,Math.round(tot_ch_cnt/tot_od_cnt*100*10)/10);
				}
				// CH_RATE_TP
				if(tot_ch_cnt != 0) {
					GridObj.SetSummaryBarValue('SUMMARY1','CH_RATE_TP',0,Math.round(tot_tp_cnt/tot_ch_cnt*100*10)/10);
				}
				// CH_RATE_OD
				if(tot_od_cnt != 0) {
					GridObj.SetSummaryBarValue('SUMMARY1','CH_RATE_OD',0,Math.round(tot_tp_cnt/tot_od_cnt*100*10)/10);
				}

				 

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

    function GridEndQuery2() 
    {
        var endMode = GridObj2.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search2") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj2.GetStatus() == "true") 
            {
				for(var i=0;i<GridObj2.GetRowCount();i++) {
					// 曖煆夢蝶爾棻 葆馬夢蝶陛 觼賊 儀梃煎 ル衛и棻.
					if(strToNum(GridObj2.GetCellValue('TERM',i)) < strToNum(3)) {
						GridObj2.SetCellBgColor('TERM', i, '253|228|229');
				    	GridObj2.SetCellFontBold('TERM', i, 'true'); // font 掃晦  
					}					
				}
                     
            } else    
            { 
                error_msg = GridObj2.GetMessage(); 
                alert(error_msg);            
			}
        }
		
    }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}	

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow){     

    //var sel_plant_id = GridObj.GetCellValue("PLANT_ID", nRow);
	doQuery2(nRow);	
	
}  

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2(nRow) { //輿僥薑爾

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var sel_plant_id 	= GridObj.GetCellValue("PLANT_ID", nRow);
	
	var sel_start_date 	= GridObj.GetCellValue("START_DATE", nRow);
	var sel_end_date 	= GridObj.GetCellValue("END_DATE", nRow);

    var start_date		= sel_start_date;
    var end_date		= sel_end_date;
    var search_gubn		= document.all.search_gubn.value;


	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("sel_plant_id", sel_plant_id);
	GridObj2.SetParam("start_date", start_date);
	GridObj2.SetParam("end_date", end_date);
	GridObj2.SetParam("search_gubn", search_gubn);
	

	GridObj2.DoQuery(servlet_url);
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
    