//############################################################
//## ÇÁ·Î±×·¥ID      : sc_13020_set_prod_mst.vm
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
var job_id = 'sc_13060_set_bom_mst';
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

	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 	,100    ,0  ,false);
 	GridObj.AddHeader("ITYPE"			,"¿µ¾÷ÃÑ°ý"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("DIVISION"		,"CM"   		,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("SALES_CAT01"		,"¿µ¾÷Ç°Á¾1"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("SALES_CAT02"		,"¿µ¾÷Ç°Á¾2"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("ITEM_ID"			,"Ç°¸ñÄÚµå"   	,"t_text" 	,20		,70  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"   		,"t_text" 	,500	,180 ,false); //0   
 	GridObj.AddHeader("SPEC"			,"±Ô°Ý"   		,"t_text" 	,20		,90  ,false); //0   

 	GridObj.AddHeader("SEQ"				,"SEQ"   		,"t_text" 	,20		,40  ,false); //0   
 	GridObj.AddHeader("SEQ_GUBN"		,"±¸¼ºÇ°¸í"   	,"t_text" 	,20		,110   ,false); //0   
 	GridObj.AddHeader("BASE_UOM"		,"±âº»´ÜÀ§"   	,"t_text" 	,20		,70 ,false); //0   
 	GridObj.AddHeader("UNIT_COST"		,"´Ü°¡"   		,"t_number" ,20.3	,80  ,true); //0   
 	
 	GridObj.AddHeader("REQ_QTY"			,"¼Ò¿ä·®"   		,"t_number" ,20.4	,100  ,true); //0   
 	//GridObj.AddHeader("REQ_QTY"			,"¼Ò¿ä·®"   		,"t_text" 	,20	,100  ,false); //0
 	
 	GridObj.AddHeader("MIN_LOT_SIZE"	,"ÃÖ¼Ò¹ßÁÖ·®"   	,"t_number" ,20.3	,90  ,true); //0
 	GridObj.AddHeader("LOT_SIZE"		,"¹ßÁÖ´ÜÀ§"   	,"t_number" ,20.3	,60  ,true); //0   
 	GridObj.AddHeader("LEAD_TIME"		,"¸®µåÅ¸ÀÓ"   	,"t_number" ,20.3	,60  ,true); //0   
 	GridObj.AddHeader("CUST_CODE"		,"°ø±Þ¾÷Ã¼"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"°ø±Þ¾÷Ã¼"   	,"t_text" 	,20		,80  ,false); //0
 	GridObj.AddHeader("SAFETY_STOCK"	,"¾ÈÀüÀç°í"   	,"t_number" ,20.3	,70  ,true); //0   
	



	
	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD");  // AD¿Í DE°¡ ¼ÂÆÃ µÉ °æ¿ì´Â ¾ø´Ù.
	
	//GridObj.SetColFix('SPEC');
	GridObj.SetColFix('SEQ_GUBN');

	GridObj.SetNumberFormat("UNIT_COST", "###,###,##");
	GridObj.SetNumberFormat("REQ_QTY", "###,###,####0");
	GridObj.SetNumberFormat("UNIT_COST", "###,###,######");

	
	GridObj.SetColCellAlign('ITEM_ID','center');
	
	
	

	//Hidden ÄÃ·³  
	GridObj.SetColHide("CRUD",true);
       
}
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch() 
   {
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
       var cm_gubn	= document.all.cm_gubn.value;
       var item_type	= document.all.item_type.value;
       
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("scm_charge", scm_charge);
       GridObj.SetParam("cm_gubn", cm_gubn);
       GridObj.SetParam("item_type", item_type);
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
	        	var row_cnt = GridObj.GetRowCount();
				var colBGColor='232|245|213';
				
				for( var i=0 ;i<row_cnt ;i++) //ÀüÃ¼ Row¸¸Å­ ¹Ýº¹ ÇÑ´Ù.
		        {
		          // GridObj.SetCellBgColor("PROD_REQ_DATE", i, colBGColor); 
		        }
		        
				for(var i=0;i<GridObj.GetRowCount();i++) {
					// cell»ö±ò º¯°æ
					GridObj.SetCellBgColor('REQ_QTY', i, '255|255|0'); 
					GridObj.SetCellBgColor('UNIT_COST', i, '255|255|0'); 
					GridObj.SetCellBgColor('MIN_LOT_SIZE', i, '255|255|0'); 
					GridObj.SetCellBgColor('LOT_SIZE', i, '255|255|0'); 
					GridObj.SetCellBgColor('LEAD_TIME', i, '255|255|0'); 

					GridObj.SetCellBgColor('SAFETY_STOCK', i, '255|255|0');
				}		        
				
				//GridObj.SetGroupMerge(	'ITEM_ID,ITEM_NAME,SPEC'); 
				GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,SPEC');
				
                                            
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
}
        }
        else if(endMode == "save") {
			if(GridObj.GetStatus() == "true") {// 
				GridObj.focus();		
			} else {
				var error_msg = GridObj.GetMessage();// 
				alert(error_msg);			
			}
			
			doQuery()   // ÀúÀå ¿Ï·áÈÄ µ¹¾Æ¿Ã¶§´Â È­¸éÀ» ÀçÁ¶È¸ ÇÑ´Ù. 
        }
		
    }


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

//alert("strColumnKey+"+strColumnKey);
	//var oper_type	= GridObj.GetCellHiddenValue("OPER_TYPE", nRow); //GetCellHiddenValue  GetCellValue



}


function GoIf(){

	
	/*
	//EDIT_FLAG	        	               
	for(var i=0;i<GridObj.GetRowCount();i++) {
		if(GridObj.GetCellValue('EDIT_FLAG',i) == 'Y' ){  // GREEN
			alert("item_id"+GridObj.GetCellValue('EDIT_FLAG',i));
				
		}else{
			
		}  
	}	

	return;
	*/ 


	if(confirm("¼±ÅÃ ÇÏ½Å Ç°¸ñÀÇ ERP Àü¼ÛÀ» È®Á¤ÇÏ½Ã°Ú½À´Ï±î?") == 1 ) {
		
	}
	else{
		return;
	}	


	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	//var version		= document.all.version.value;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "doIf");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//GridObj.SetParam("version", version);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	GridObj.DoQuery(servlet_url, "SELECTED");


}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'µî·Ï'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoReg  (service) {

		var item_id		= '';
		var item_name	= '';
		var wo_id		= '';
		var	idu_mode	='REG';
		//var week_flag	= document.frm.week_flag.value;


		//alert(document.frm.week_flag.value);

		var service_url = "service.do?_moon_service=sc_13060_set_bom_mst_reg_pop";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&wo_id=" + wo_id + "&idu_mode=" + idu_mode;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=790, height=430, top=200, left=200";
//	var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();

}
  


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ Ç°¸ñ ¹øÈ£ ´õºíÅ¬¸¯½Ã È£Ãâ(¼öÁ¤È­¸é)
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function BomPopUp  (nRow) {
	
		var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
		var item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);
		var qty			= '1';
		
        var prod_ver	= '';

//		var	idu_flag	= GridObj.GetCellValue("IDU_FLAG", nRow);
//		var	idu_mode	='MOD';
		//var week_flag	= document.frm.week_flag.value;  
	
		//alert(item_id);
		//alert(item_name);
	
		//alert(document.frm.week_flag.value);   
		
		var service_url = "service.do?_moon_service=sc_13020_set_prod_mst_bom_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name +"&prod_ver=" + prod_ver+ "&qty=" + qty;
		//service_url += "&if_flag=" + if_flag + "&if_msgs=" + if_msgs + "&prod_po=" + prod_po + "&idu_flag=" + idu_flag;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=430, top=200, left=200";
	//	var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();				
		  
		//alert("ÆË¾÷À» ¶Ù¿öº¸ÀÚ");
	
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ´õºíÅ¬¸¯  ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellDblClick(strColumnKey, nRow) {

	if(strColumnKey =='ITEM_ID'||strColumnKey =='ITEM_NAME'){
		BomPopUp(nRow);
	}

}	


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {


}	


// ÄÃ·³ Ãà¼Ò & È®Àå
function colExtension(obj){
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetColWidth('ITYPE')== 8){// true => ¼û±è »óÅÂ
		obj.value = "Ãà¼Ò";
		// ¼û±è ¸ðµå ÇØÁ¦
		GridObj.SetColWidth("ITYPE", 60);
		GridObj.SetColWidth("DIVISION", 60);
		GridObj.SetColWidth("SALES_CAT01", 60);
		GridObj.SetColWidth("SALES_CAT02", 60);
		GridObj.ClearGroupMerge();
		GridObj.SetColFix('ITEM_NAME');
		GridObj.SetGroupMerge('ITYPE,DIVISION,SALES_CAT01,SALES_CAT02');
		
	}
	else{
		obj.value = "È®´ë";
		//¼û±è¸ðµå
		GridObj.SetColWidth("ITYPE", 8);
		GridObj.SetColWidth("DIVISION", 8);
		GridObj.SetColWidth("SALES_CAT01", 8);
		GridObj.SetColWidth("SALES_CAT02", 8);
		GridObj.ClearGroupMerge();
		GridObj.SetColFix('ITEM_NAME');
		GridObj.SetGroupMerge('ITYPE,DIVISION,SALES_CAT01,SALES_CAT02');


	}


}

    