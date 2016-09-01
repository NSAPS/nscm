//############################################################
//## ÇÁ·Î±×·¥ID      : sc_13030_set_prod_inout_list.vm
//## ÇÁ·Î±×·¥¸í      : À¯Åë°¡°ø »ý»ê¿À´õ °ü¸®
//## °³¹ßÀÚ          : ±Ç¿ëÂù
//## °³¹ßÀÏÀÚ        : 2009-07-20
//##
//## °ü·Ã job file   : job_sinc_20_scheduling_04.xml
//## °ü·Ã query file : query_sinc_20_scheduling_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-20  ³²¿õ¿ë      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/


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


//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'sc_13030_set_prod_inout_list';
var GridObj ; 													// WiseGrid °´Ã¼
var GridObj2;
var GridObj3;

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
   
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;       
    
    /* SetGroupMerge */
	//GridObj.bHDMoving = false 
	//GridObj.bHDSwapping = false 
	GridObj.bRowSelectorVisible = false 
	GridObj.strRowBorderStyle = 'none' 
	GridObj.nRowSpacing = 0 
	GridObj.strHDClickAction = 'select' 
	
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'    
    
}


       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {        

	var start_date 	= document.frm.start_date.value;
	var end_date 	= document.frm.end_date.value;


 	GridObj.AddHeader("SALES_CAT02"		,"ÀÚÀç±×·ì2"   	,"t_text" 		,200	,70  ,false); //0   
 	GridObj.AddHeader("SALES_CAT03"		,"ÀÚÀç±×·ì3"   	,"t_text" 		,200	,70  ,false); //0   

 	GridObj.AddHeader("ITEM_ID"			,"Ç°¸ñÄÚµå"   	,"t_text" 		,20		,70  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"   		,"t_text" 		,200	,180 ,false); //0   
 	GridObj.AddHeader("SPEC"			,"±Ô°Ý"   		,"t_text" 		,20		,90  ,false); //0   
 	GridObj.AddHeader("BASE_STOCK"		,"±âÃÊÀç°í"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("PROD_PLAN"		,"ÀÛ¾÷°èÈ¹"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("SALES_PRE"		,"ÀüÀÏÆÇ¸Å"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("CHGO"			,"´çÀÏÃâ°í"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("STOCK_EXPT"		,"¿¹»óÀç°í"   	,"t_number" 	,20.3	,60  ,false); //0
 	GridObj.AddHeader("PROD_TERM"		,"»ý»ê\n°æ°úÀÏ"   ,"t_number" 	,20.3	,60  ,false); //0
 	//    
 	GridObj.AddHeader("OPER_QTY"		,"ÃÑÀâ¾÷\n¿äÃ»·®"	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("COMPL_QTY"		,"ÀÛ¾÷\n´©Àû·®"   ,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("REMAIN_QTY"		,"ÀÛ¾÷ÀÜ·®"   	,"t_number" 	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("COMPL_RATE"		,"ÁøµµÀ²(%)"   	,"t_number" 	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PRE_YEAR_SELL"	,start_date+" ~ "+end_date   	,"t_number" 	,20.3	,80  ,false); //0   
 	GridObj.AddHeader("PRE_MONTH_SELL"	,"Àü¿ùÆÇ¸Å"   	,"t_number" 	,20.3	,60  ,false); //0   
 	GridObj.AddHeader("SALES_PRE_CUM"	,"´ç¿ùÆÇ¸Å"   	,"t_number" 	,20.3	,60  ,false); //0   

	
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
	
	
	

	//Hidden ÄÃ·³  
       
}
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSearch(){
	GridObj = document.WiseGrid;
	GridObj.ClearGrid();
	setHeader(GridObj);
	  
	doQuery();
}
  
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave  (service) {
	
	//alert("GoSave")
	//return;

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url, "CRUD");

}



      
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       
       var scm_charge	= document.all.scm_charge.value;
       var start_date	= document.all.start_date.value;
       var end_date		= document.all.end_date.value;
       var cm_gubn		= document.all.cm_gubn.value;
       
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("scm_charge", scm_charge);
       GridObj.SetParam("start_date", start_date);
       GridObj.SetParam("end_date", end_date);
       GridObj.SetParam("cm_gubn", cm_gubn);
       GridObj.DoQuery(servlet_url);
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
    function GridEndQuery() {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
        {
            if(GridObj.GetStatus() == "true") 
            {                           
	        	//GridObj.ClearGroupMerge();
	        	
				// Merge ÈÄ SummaryBar Ãß°¡ 
				GridObj.SetGroupMerge("SALES_CAT02,SALES_CAT03");
				GridObj.AddSummaryBar('SUMMARY1', '¼Ò°è', 'SALES_CAT02', 'sum', 'BASE_STOCK,PROD_PLAN,SALES_PRE,CHGO,STOCK_EXPT,OPER_QTY,COMPL_QTY,REMAIN_QTY,COMPL_RATE,PRE_YEAR_SELL,PRE_MONTH_SELL,SALES_PRE_CUM'); 
         	    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot); 

                GridObj.AddSummaryBar('SUMMARY2', 'ÀüÃ¼ÇÕ°è', 'summaryall', 'sum', 'BASE_STOCK,PROD_PLAN,SALES_PRE,CHGO,STOCK_EXPT,OPER_QTY,COMPL_QTY,REMAIN_QTY,COMPL_RATE,PRE_YEAR_SELL,PRE_MONTH_SELL,SALES_PRE_CUM');
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
		// OPER_TYPE »ó½Ã ÀÏ°æ¿ì´Â ³¯Â¥¸¦ º¯°æÇÒ¼ö ¾ø´Ù.
		if( oper_type == "001" ) { //»ó½Ã
		}else{
			alert("»ó½Ã ¿î¿µ Ç°¸ñÀº ¿î¿µÀÏÀÚ¸¦ º¯°æÇÒ¼ö¾ø½À´Ï´Ù!!!");
			GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
			return;
		}		
	}else{
		
	}


}



/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ´õºíÅ¬¸¯  ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellDblClick(strColumnKey, nRow) {

	if(strColumnKey =='ITEM_ID'||strColumnKey =='ITEM_NAME'){
		
		 //GoMod(nRow);
		
	}

}	


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {


}	
    