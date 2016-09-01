//############################################################
//## ÇÁ·Î±×·¥ID      : sc_01130_ProductionPlanChange_TimeFance_list.js
//## ÇÁ·Î±×·¥¸í      : SCMÁÖ¹®ÃßÀûÁ¶È¸
//## °³¹ßÀÚ          : ³²¿õ¿ë
//## °³¹ßÀÏÀÚ        : 2009-10-13
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_04.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-10-13  ³²¿õ¿ë      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'sc_01130_ProductionPlanChange_TimeFance_list';
var GridObj ; 													// WiseGrid °´Ã¼
var GridObj2;

var color_tot = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid ¿ÀºêÁ§Æ®°¡ »ý¼ºµÇ°í ÃÊ±âÈ­µÈ ÈÄ ¹ß»ýÇÏ´Â 							¦¢
  ¦¢JavaScript EventÀÎ Initialize()¸¦ ¹Þ¾Æ ±×¸®µåÀÇ Çì´õ¸¦ ¼ÂÆÃÇÑ´Ù.			¦¢
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function init() { 
   
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	setHeader(GridObj);  	//ÇØ´õ»ý¼º 
	setDefault();        	//È­¸é ±âº» ¼³Á¤ 

}

function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	setHeader2(GridObj2);  	//ÇØ´õ»ý¼º 
	setDefault2();        	//È­¸é ±âº» ¼³Á¤ 
}   
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'    
	
    GridObj.nHDLineSize   = 18; //15
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2; 
}

function setDefault2() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'    
	
    GridObj.nHDLineSize   = 18; //15
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2; 
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {
	
	GridObj.AddHeader("PLANT_ID"	,"±¸ºÐ"       			,"t_text" 	,100    ,0  ,false);
	GridObj.AddHeader("PLANT_NAME"	,"±¸ºÐ"       			,"t_text" 	,100    ,70  ,false);
	GridObj.AddHeader("WW"			,"¿ù"       				,"t_text" 	,100	,70  ,false); //0   
 	GridObj.AddHeader("OD_CNT"		,"ÃÑ ¿À´õ°Ç¼ö"     	  	,"t_number" ,100.3	,80  ,false); //0   
 	GridObj.AddHeader("CH_CNT"		,"º¯°æ°Ç¼ö"       		,"t_number" ,100.3	,80  ,false); //0   
 	GridObj.AddHeader("CH_RATE"		,"º¯°æÀ²(%)"       		,"t_text" 		,500	,80 ,false); //0   
 	GridObj.AddHeader("TP_CNT"		,"3ÀÏ TFÀÌ³» º¯°æ°Ç¼ö"		,"t_number" 	,100.3	,150  ,false); //0   
 	GridObj.AddHeader("CH_RATE_TP"	,"º¯°æÀ²(º¯°æ°Ç¼ö±âÁØ)"		,"t_text" 	,500	,150  ,false); //0   
 	GridObj.AddHeader("CH_RATE_OD"	,"º¯°æÀ²(ÃÑ ¿À´õ ±âÁØ)" 	,"t_text" 	,200	,150  ,false); //0   

 	GridObj.AddHeader("START_DATE"	,"½ÃÀÛÀÏÀÚ" 	,"t_text" ,200	,0  ,false); //0   
 	GridObj.AddHeader("END_DATE"	,"Á¾·áÀÏÀÚ" 	,"t_text" ,200	,0  ,false); //0   



	GridObj.AddGroup("HD1"	,"º¯°æ°Ç¼ö");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
	GridObj.AppendHeader("HD1", "CH_CNT");
	GridObj.AppendHeader("HD1", "CH_RATE");
	GridObj.AddGroup("HD2"	,"3ÀÏ TF °Ç¼ö");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
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

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader2(GridObj2) {
	
	GridObj2.AddHeader("PLANT_ID"	,"°øÀå¸í"    	,"t_text" 	,100    ,0  ,false);
	GridObj2.AddHeader("PLANT_NAME"	,"°øÀå¸í"    	,"t_text" 	,100    ,80  ,false);
	GridObj2.AddHeader("WW"			,"ÁÖÂ÷"      ,"t_text" 	,100    ,85  ,false);
	GridObj2.AddHeader("PROD_DATE"	,"»ý»êÀÏÀÚ"   ,"t_text" 	,100	,85  ,false); //0   
 	GridObj2.AddHeader("CH_DATE"	,"º¯°æÀÏÀÚ"   ,"t_text" 	,100	,85  ,false); //0   
 	GridObj2.AddHeader("TERM"		,"Â÷ÀÌ"      ,"t_text" 	,100	,60  ,false); //0   
 	GridObj2.AddHeader("ITEM_ID"	,"Ç°¸ñ¹øÈ£"   ,"t_text" 	,500	,80 ,false); //0   
 	GridObj2.AddHeader("ITEM_NAME"	,"Ç°¸ñ¸í"		,"t_text" 	,100	,170  ,false); //0   
 	GridObj2.AddHeader("BF_QTY"		,"º¯°æÀü"		,"t_number" ,500.3	,70  ,false); //0   
 	GridObj2.AddHeader("AF_QTY"		,"º¯°æÈÄ" 	,"t_number" ,200.3	,70  ,false); //0   
 	GridObj2.AddHeader("GUBN"		,"±¸ºÐ" 		,"t_text" 	,200	,70  ,false); //0   


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

   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
       doQuery();
   }
     
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var start_date	= document.all.start_date.value;
       var end_date		= document.all.end_date.value;
       var search_gubn	= document.all.search_gubn.value;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("start_date", start_date);
       GridObj.SetParam("end_date", end_date);
       GridObj.SetParam("search_gubn", search_gubn);
       
 
       GridObj.DoQuery(servlet_url);
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
    function GridEndQuery() 
    {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
        {
            if(GridObj.GetStatus() == "true") 
            {
				// ÇÕ°è
				GridObj.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', 'OD_CNT,CH_CNT,TP_CNT,CH_RATE,CH_RATE_TP,CH_RATE_OD'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160');
				
				var tot_od_cnt	= strToNum(GridObj.GetSummaryBarValue('SUMMARY1','OD_CNT',0,false));
				var tot_ch_cnt	= strToNum(GridObj.GetSummaryBarValue('SUMMARY1','CH_CNT',0,false));
				var tot_tp_cnt	= strToNum(GridObj.GetSummaryBarValue('SUMMARY1','TP_CNT',0,false));
				
				
				// »ý»ê°èÈ¹ º¯°æÀ² CH_RATE
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
          
        if(endMode == "search2") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
        {
            if(GridObj2.GetStatus() == "true") 
            {
				for(var i=0;i<GridObj2.GetRowCount();i++) {
					// ÀÇ·Ú¹Ú½ºº¸´Ù ¸¶°¨¹Ú½º°¡ Å©¸é »ö±ò·Î Ç¥½ÃÇÑ´Ù.
					if(strToNum(GridObj2.GetCellValue('TERM',i)) < strToNum(3)) {
						GridObj2.SetCellBgColor('TERM', i, '253|228|229');
				    	GridObj2.SetCellFontBold('TERM', i, 'true'); // font ±½±â  
					}					
				}
                     
            } else    
            { 
                error_msg = GridObj2.GetMessage(); 
                alert(error_msg);            
			}
        }
		
    }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {

}	

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇÏºÎ ±×¸®µå Á¶È¸ WD1 ´õºíÅ¬¸¯
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellDblClick(strColumnKey, nRow){     

    //var sel_plant_id = GridObj.GetCellValue("PLANT_ID", nRow);
	doQuery2(nRow);	
	
}  

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 2 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery2(nRow) { //ÁÖ¹®Á¤º¸

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var sel_plant_id 	= GridObj.GetCellValue("PLANT_ID", nRow);
	
	var sel_start_date 	= GridObj.GetCellValue("START_DATE", nRow);
	var sel_end_date 	= GridObj.GetCellValue("END_DATE", nRow);

    var start_date		= sel_start_date;
    var end_date		= sel_end_date;
    var search_gubn		= document.all.search_gubn.value;


	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("sel_plant_id", sel_plant_id);
	GridObj2.SetParam("start_date", start_date);
	GridObj2.SetParam("end_date", end_date);
	GridObj2.SetParam("search_gubn", search_gubn);
	

	GridObj2.DoQuery(servlet_url);
}


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
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
        
        // È­¸é size Ãà¼Ò ½Ã È­¸éÀÌ ³Ê¹« ÀÛ¾Æ ±×¸®µå Å©±â°¡ À½¼ö°¡ µÇ¸é ¿¡·¯°¡ ³ª¹Ç·Î ±× °æ¿ì ¹«Á¶°Ç 1·Î ¼¼ÆÃ 
        // ==> È­¸éÀÌ ´õÀÌ»ó Ãà¼ÒµÇÁö ¾ÊÀ½ 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }  
    