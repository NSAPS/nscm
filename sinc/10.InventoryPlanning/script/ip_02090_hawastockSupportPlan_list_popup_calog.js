//############################################################
//## ÇÁ·Î±×·¥ID		: ip_02090_hawastockSupportPlan_list_popup.js
//## ÇÁ·Î±×·¥¸í		: »óÇ° Àç°íº¸Ãæ °èÈ¹ »ý¼º ÆË¾÷Ã¢
//## °³¹ßÀÚ			: ÀÌ°­¿í
//## °³¹ßÀÏÀÚ		: 2014-09-29
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_03.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2014-10-01  ÀÌ°­¿í      create
//##
//############################################################



/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_02090_hawastockSupportPlan_list_popup_calog';
var GridObj ; 													// WiseGrid °´Ã¼

var color_tot			= '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col		= '255|253|208';
var color_edit_col2		= '250|224|212';
var color_edit_col3		= '250|236|197';

var color_sp			= '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row	= '141|232|141';			//¶óÀÎ ¼±ÅÃ ¹è°æ»ö
var colBg01				= '224|255|224';			//255|255|153
var colBg02				= '255|255|255';


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid ¿ÀºêÁ§Æ®°¡ »ý¼ºµÇ°í ÃÊ±âÈ­µÈ ÈÄ ¹ß»ýÇÏ´Â 							¦¢
  ¦¢JavaScript EventÀÎ Initialize()¸¦ ¹Þ¾Æ ±×¸®µåÀÇ Çì´õ¸¦ ¼ÂÆÃÇÑ´Ù.			¦¢
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function init() { 
  	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj);	//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	
	setDefault();        	//È­¸é ±âº» ¼³Á¤
	
	setHeader(GridObj);  	//ÇØ´õ»ý¼º 
	
	callGridData();
	
	
	
}
   
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 
	
	GridObj.bRowSelectorIndex = true;
	GridObj.bUserContextMenu 	= true;
	GridObj.bHDMoving = false ;
	GridObj.bHDSwapping = false; 
	GridObj.bRowSelectorVisible = false ;
	GridObj.strRowBorderStyle = 'none' ;
	GridObj.nRowSpacing = 0 ;
	GridObj.strHDClickAction = 'select' ;
	
 
    GridObj.nHDLineSize         	= 26; //Header Size 
    //GridObj.strHDClickAction    	= "sortsingle";
 	
 	GridObj.strActiveRowBgColor		= "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor	= '232|232|255'; 	//Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor	= '0|0|0'; 
	GridObj.strMouseWheelAction		= 'page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'    

	GridObj.nHDLines				= 2;  
	
	GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row Ãß°¡"); 
	
}

       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) { 
	       
	      
//ERP Å×ÀÌºí ³Ñ±æ °ªµé°ú ¸ÅÄª ÇÊ¿ä
	GridObj.AddHeader("SELECTED"			,""   					,"t_checkbox"	,2		,30  ,true); //0
	GridObj.AddHeader("ITEM_ID"				,"Á¦Ç°ÄÚµå"   			,"t_text" 		,100	,70  ,false); //0
	GridObj.AddHeader("ITEM_NAME"			,"Á¦Ç°¸í"   				,"t_text" 		,100	,170 ,false); //0
	GridObj.AddHeader("BASE_STOCK"			,"´çÀÏÀç°í"   			,"t_number" 	,100.3	,60  ,false); //0 
	GridObj.AddHeader("DC_ALLOC"			,"¹ßÁÖ·®\n(BOX)"   		,"t_number" 	,100.3	,60  ,true); //0 
	GridObj.AddHeader("DC_ALLOC_PLT"		,"¹ßÁÖ·®\n(PLT)"   		,"t_number" 	,100.3	,60  ,false); //0
	
	GridObj.AddHeader("TGT_LOC"				,"ÀÔ°íÀå"    			,"t_combo" 		,100	,70  ,true);
 	
 	GridObj.AddHeader("PAL_QTY"				,"Ç°¸ñº° PLT ´ÜÀ§"   		,"t_text" 		,100	,0   ,false); //0
	GridObj.AddHeader("SEQ"					,"Â÷¼ö"   				,"t_number" 	,100.3	,50  ,true); //0

	
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID'			  ,'left');
    GridObj.SetColCellAlign('ITEM_NAME'			  ,'left');
 
     
    //GridObj.SetColCellAlign('RE_ORDER_FLAG'		 ,'center');  
   
  	GridObj.SetNumberFormat('BASE_STOCK'		,'#,##0.#');
    GridObj.SetNumberFormat('DC_ALLOC'			,'#,##0.#');
    GridObj.SetNumberFormat('DC_ALLOC_PLT'		,'#,##0.00');
  

     GridObj.SetNumberFormat('SEQ'				,'#,##0.#');
    


	//Hidden ÄÃ·³
	//GridObj.SetColHide("CRUD",true);
    GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);    
}
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   
   
function callGridData(){
	
	doQuery();
}
	
  
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave(service) {
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";

	
	doSave();	
	
	
	//GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	//GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");

};
      
      
// ÀúÀå
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	//var in_trans_unit = "";
	
	//if(document.frm.in_trans_unit[0].checked 	  == true) in_trans_unit = "pal";
	//if(document.frm.in_trans_unit[1].checked == true) in_trans_unit = "box";

    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//GridObj.SetParam("trans_unit",in_trans_unit);
	
	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
	
 	
 return;
}    
      
      
      
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
		
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode",  "search");
     
       

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
				
					
				GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,BASE_STOCK');
//				GridObj.AddSummaryBar('SUMMARY1', '¼Ò°è', 'ITEM_ID', 'sum', 'DC_ALLOC,DC_ALLOC_PLT');
				GridObj.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', 'DC_ALLOC,DC_ALLOC_PLT');
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);				
//				GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot);
				
				
			for(var i=0;i<GridObj.GetRowCount();i++) {				
					
					var item_id		= GridObj.GetCellValue('ITEM_ID',i);
				
					
					
//					var flag = GridObj.GetCellValue("IF_FLAG", 	i);
//					if(flag ==""){
//						GridObj.SetCellValue("IF_FLAG", i, "Àü¼Û´ë±â");
//					}else if(flag =="Z"){
//						GridObj.SetCellValue("IF_FLAG", i, "Àü¼ÛÁß");
//						GridObj.SetRowBgColor(i,'255|255|126');
//					}else if(flag =="C"){
//						GridObj.SetCellValue("IF_FLAG", i, "Àü¼Û¿Ï·á");
//						
//					}
					
					GridObj.SetCellBgColor('BASE_STOCK',			i,  color_edit_col2);				
					GridObj.SetCellBgColor('DC_ALLOC_PLT',			i,  color_edit_col2);
				

				
			}  
			 
				}                  
            } 	else if(endMode == "doSave"){
            	
            	doQuery();            	
            }	else if(endMode == "doIf"){
            	
            	doQuery();            	
            }	
            	else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
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

function HeaderClick(strColumnKey){
	
}

function GridCellDblClick (strColumnKey, nRow){
	
	var dc_alloc	= GridObj.GetCellValue('DC_ALLOC',nRow);
	
	
}



function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
	if( strColumnKey == "SELECTED"){		
		return;
	}
	if( strColumnKey == "DC_ALLOC"){
		var boxQty 		= Number(GridObj.GetCellValue("DC_ALLOC", nRow));
		var boxPerPalet = Number(GridObj.GetCellValue("PAL_QTY",  nRow));
		var resultQty   = Math.round(boxQty*100 / boxPerPalet)/100;
		GridObj.SetCellValue("DC_ALLOC_PLT", nRow, resultQty	);

	}
		
	
	
}

function ChangeBoxToPlt(){
	
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
    

// Á¦Ç° ÀÔ·ÂÃ¢¿¡ ÀÔ·ÂÇÑ °ª°ú ÀÏÄ¡ÇÏ´Â Á¦Ç° °Ë»ç ÈÄ, ÀÏÄ¡ÇÏ´Â Á¦Ç°ÀÌ ÀÖÀ¸¸é Á¦Ç° ÄÚµå, Á¦Ç° ¸í Ç¥½Ã
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ÀÏÄ¡ÇÏ´Â Á¦Ç° ¾øÀ½
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
			}
			else if( arrList.length > 1){							
				document.frm.item_name.value = "";
			}
			else {
				return;
			}
		}
	});
	
}

// Á¦Ç° °Ë»ö popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup Ã¢ÀÇ input box Ç¥½Ã data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}


// ¼ýÀÚ¿Ü ÀÔ·Â¹æÁö
function (obj) {
	var key = event.keyCode;
	if(!(key==8||key==9||key==13||key==46||key==144||
		(key>=48&&key<=57)||key==110||key==190)) {
		event.returnValue = false;
	}
  
	// TAB(9) or ENTER(13)
	if( event.keyCode == "9" || event.keyCode == "13" ) {

		if(obj == document.frm.stock_day) {
			Do_DC_Allocate(obj);
		}
	}
}    
 


function GoIf(){	
	
	
	
		
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "doIf");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("trans_date", document.frm.trans_date.value); 
	GridObj.SetParam("plan_type", document.frm.plan_type.value);
	
	
	// Â÷·®¼ø¹ø µû´Â DWR

	var version		= document.frm.version.value;

	var src_loc 	= "8907"

	
	var truck_seq	= document.frm.truck_seq.value;

	var trans_date 	= document.frm.trans_date.value;

	
	
	var in_paramKey = "version!%!trans_date!%!src_loc";

	var in_paramCode = version+"!%!"+trans_date+"!%!"+src_loc;


 
 	
 	
 		commonUtil.getCodeInfo(in_paramKey, in_paramCode, "rp_01015_get_truck_seq", { 
		callback:function(arrList){
			// ÀÏÄ¡ÇÏ´Â Á¦Ç° ¾øÀ½
			if( arrList.length == 1 ) {
			
					truck_seq = arrList[0][0];		

					document.frm.truck_seq.value = truck_seq;
					GridObj.SetParam("truck_seq", document.frm.truck_seq.value);
					GridObj.DoQuery(servlet_url, "SELECTED");
			}
			
			
			else {
				return;
			}
		}
	});
	

	//WiseGridÀÌ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÏ´Â ¸Þ¼­µåÀÔ´Ï´Ù. Åë½ÅÀÌ ¼º°øÇÏ¸é true¸¦ ¹ÝÈ¯ÇÕ´Ï´Ù.
	

	
}

function GridUserContextMenuClickHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
	
		
	if( strMenuKey == "MENU_CELL" ){// CELL Å¬¸¯½Ã ¸Þ´º
		
		if( strMenuItemKey == "MENU01" ){		// ROW Ãß°¡
		
			insertRow( nRow );	
			
		}
		else {
			alert("Á¸Àç ÇÏÁö ¾ÊÀº ¸Þ´ºÀÔ´Ï´Ù.");
		}		
	}

}

function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	
	if( rowCnt-1 == nRow ){ // ¸¶ÀÚ¸· ¶óÀÎÀÏ °æ¿ì 
		GridObj.InsertRow(-1);
	}else{
		GridObj.InsertRow(nRow+1);
	}

// ¼ø¹øÃ¼¹ø ·ÎÁ÷Ãß°¡
	var this_item_id = GridObj.GetCellValue("ITEM_ID", nRow);
	var new_seq = 1;
	
	for(var i=0;i<GridObj.GetRowCount();i++) {
		tmp_item_id	= GridObj.GetCellValue("ITEM_ID", i);

		if(this_item_id == tmp_item_id){
			new_seq ++;
		}
	}
	
	GridObj.SetCellValue("SELECTED"				, nRow+1, "1");
	GridObj.SetCellValue("ITEM_ID"              , nRow+1, GridObj.GetCellValue("ITEM_ID"             	 , nRow));
	GridObj.SetCellValue("ITEM_NAME"            , nRow+1, GridObj.GetCellValue("ITEM_NAME"           	 , nRow));
	GridObj.SetCellValue("BASE_STOCK"    		, nRow+1, GridObj.GetCellValue("BASE_STOCK"      	 	 , nRow));
	GridObj.SetCellValue("DC_ALLOC"   			, nRow+1, GridObj.GetCellValue("DC_ALLOC"      			 , nRow));
	GridObj.SetCellValue("DC_ALLOC_PLT"   		, nRow+1, GridObj.GetCellValue("DC_ALLOC_PLT"      		 , nRow));
	//GridObj.SetCellValue("TGT_LOC"   			, nRow+1, GridObj.GetCellValue("TGT_LOC"        		 , nRow));
	GridObj.SetCellValue("PAL_QTY"          	, nRow+1, GridObj.GetCellValue("PAL_QTY"          		 , nRow));
	GridObj.SetCellValue("SEQ"					, nRow+1, Number(GridObj.GetCellValue("SEQ"         	 , nRow)));

//	GridObj.SetCellValue ("IF_FLAG"				, nRow+1, "½Å±Ô»ý¼º" );
//	GridObj.SetCellValue ("RE_ORDER_FLAG"		, nRow+1, "Y" );


}
//SEQ Â÷¼ö ÀÚµ¿ Á¤·Ä
//function Order(){
//	

//	for(var i=0;i<GridObj.GetRowCount();i++) {				
//					
//					var item_id		= GridObj.GetCellValue('ITEM_ID',i);
//					
//						//Â÷¼ö ÀÚµ¿ ³»¸²Â÷¼ø Á¤·Ä ±â	
//					if(i>0){
//					var item_id2	= GridObj.GetCellValue('ITEM_ID',i-1);
//					var seq2		= Number(GridObj.GetCellValue("SEQ", i-1));
//						
//						if( item_id == item_id2){
//							
//							GridObj.SetCellValue("SEQ", i, seq2+1 );
//						
//						}
//					}
//	}
//}	


