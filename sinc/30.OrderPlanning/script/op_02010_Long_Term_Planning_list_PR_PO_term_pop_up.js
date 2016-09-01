//## ÇÁ·Î±×·¥ID		:	op_02010_Long_Term_Planning_list_PR_PO_term_pop_up.js
//## ÇÁ·Î±×·¥¸í		:	°ø±ÞÀûÇÕ¼º »çÀüºÐ¼® pop_up
//## °³¹ßÀÚ          :	±Ç¿ëÂù 
//## °³¹ßÀÏÀÚ       	:	2009-07-16
//##
//## °ü·Ã job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## °ü·Ã query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  ³²¿õ¿ë      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'op_02010_Long_Term_Planning_list_PR_PO_term_pop_up';
var GridObj ; 													// WiseGrid °´Ã¼
var GridObj2 ; 													// WiseGrid °´Ã¼
var GridObj3 ; 													// WiseGrid °´Ã¼

var color_tot = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';	//¶óÀÎ ¼±ÅÃ ¹è°æ»ö
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


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
        //if( search_menu.style.display == "none" ) 
        //{ 
            //tabHeightValue += Number(search_h); 
            //tableHeightValue += Number(search_h); 
        //} 
        
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

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid ¿ÀºêÁ§Æ®°¡ »ý¼ºµÇ°í ÃÊ±âÈ­µÈ ÈÄ ¹ß»ýÇÏ´Â 							¦¢
  ¦¢JavaScript EventÀÎ Initialize()¸¦ ¹Þ¾Æ ±×¸®µåÀÇ Çì´õ¸¦ ¼ÂÆÃÇÑ´Ù.			¦¢
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
	setHeader(GridObj);  	//ÇØ´õ»ý¼º 
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//·Î¿ì ¼¿·ºÅÍ¸¦ WiseGrid¿¡¼­ ¼û±ä´Ù,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.
    GridObj.nHDLineSize         = 10; //Header Size 
    //GridObj.strHDClickAction    = "sortsingle";
 	//GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '¸¼Àº °íµñ';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;   
    
    GridObj.bStatusbarVisible = true;				// status bar visible »óÅÂ¹Ù ¼³Á¤ 
 
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        
       
	GridObj.AddHeader("ITEM_ID"		,"Ç°¸ñ\n¹øÈ£"	,"t_text" 	,20		,0  	,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	,"Ç°¸ñ¸í"  	,"t_text" 	,100	,0 		,false); //0    
 	GridObj.AddHeader("PR_DAY"		,"PRÀÏÀÚ"    ,"t_text" 	,100.3	,80  	,false); //0   
 	GridObj.AddHeader("PR_TERM"		,"PR\nÁÖ±â"  ,"t_number" ,100.3	,0  	,false); //0
 	GridObj.AddHeader("PR_QTY"		,"PR\n¼ö·®"  ,"t_number" ,100.3	,60  	,false); //0
 	GridObj.AddHeader("PO_DAY"		,"POÀÏÀÚ"    ,"t_text" 	,100	,80  	,false); //0
 	GridObj.AddHeader("PO_TERM"		,"PO\nÁÖ±â"  ,"t_number" ,100.3	,0  	,false); //0
 	GridObj.AddHeader("PO_QTY"		,"PO\n¼ö·®"  ,"t_number" ,100.3	,80  	,false); //0
 	GridObj.AddHeader("LFDAT"		,"ÀÔ°í¿äÃ»ÀÏ" ,"t_text" 	,100	,70  	,false); //0	SCMÆÀ ¹Ú°æ¿­ ºÎÀå´Ô ¿äÃ» : 2013-07-05 Ãß°¡
 	GridObj.AddHeader("IPGO_DAY"	,"ÀÔ°íÀÏ"  	,"t_text" 	,100	,70  	,false); //0   
 	GridObj.AddHeader("IPGO_TERM"	,"ÀÔ°í\nÁÖ±â"	,"t_number"	,100.3	,0  	,true); //0	
 	GridObj.AddHeader("IPGO_QTY"	,"ÀÔ°í·®" 	,"t_number" ,100.3	,70  	,true); //0   
 	GridObj.AddHeader("STATUS"		,"»óÅÂ" 		,"t_text" 	,100	,70  	,true); //0   
 	GridObj.AddHeader("PR_PO"		,"PR_PO" 	,"t_number" ,100.3	,70  	,true); //0   
 	GridObj.AddHeader("PO_IPGO"		,"PO_ÀÔ°í" 	,"t_number" ,100.3	,70  	,true); //0   
 	GridObj.AddHeader("TOTAL"		,"ÃÑ¼Ò¿ä" 	,"t_number" ,100.3	,70  	,true); //0   

	
	GridObj.BoundHeader();	

	 
    GridObj.SetColCellAlign('PR_DAY',	'center'); 
    GridObj.SetColCellAlign('PO_DAY',	'center'); 
    GridObj.SetColCellAlign('IPGO_DAY',	'center');
    GridObj.SetColCellAlign('LFDAT',	'center');  

    GridObj.SetNumberFormat("PR_QTY", 	"#,##0.##");
    GridObj.SetNumberFormat("PO_QTY", 	"#,##0.##");
    GridObj.SetNumberFormat("IPGO_QTY", "#,##0.##");
	

	setDefault();        	//È­¸é ±âº» ¼³Á¤ 
	 
	GoSearch(); //pop up Ã¢¿¡¼­ ¿ÍÀÌÁî ±×¸®µå ÃÖÃÊ ¼³Á¤À» À§ÇØ GoSearch ¸¦ init ÈÄ¿¡ ½ÇÇà  %Áß¿ä%

	
}

   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       doQuery();
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc  
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;

	   
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("item_name", item_name);
	   
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
			
			cal_dw();
			var i = GridObj.GetRowCount()-1;
			GridObj.SetCellBgColor('ITEM_ID', 	i, color_tot);
		 	GridObj.SetCellBgColor('ITEM_NAME', i, color_tot);
		 	GridObj.SetCellBgColor('PR_DAY', 	i, color_tot);
		 	GridObj.SetCellBgColor('PR_TERM', 	i, color_tot);
		 	GridObj.SetCellBgColor('PR_QTY', 	i, color_tot);
		 	GridObj.SetCellBgColor('PO_DAY', 	i, color_tot);
		 	GridObj.SetCellBgColor('PO_TERM', 	i, color_tot);
		 	GridObj.SetCellBgColor('PO_QTY', 	i, color_tot);
		 	GridObj.SetCellBgColor('LFDAT', 	i, color_tot);
		 	GridObj.SetCellBgColor('IPGO_DAY', 	i, color_tot);
		 	GridObj.SetCellBgColor('IPGO_TERM', i, color_tot);
		 	GridObj.SetCellBgColor('IPGO_QTY', 	i, color_tot);
		 	GridObj.SetCellBgColor('STATUS', 	i, color_tot);
		 	GridObj.SetCellBgColor('PR_PO', 	i, color_tot);
		 	GridObj.SetCellBgColor('PO_IPGO', 	i, color_tot);
		 	GridObj.SetCellBgColor('TOTAL', 	i, color_tot);

                   
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}



function GridCellClick(strColumnKey, nRow){
	
	

	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	if(nRow == '0' || nRow == '1'|| nRow == '4'|| nRow == '5'|| nRow == '6' ){
		//alert("±âÃÊÀç°í´Â ¼öÁ¤ÀÌ ºÒ°¡´ÉÇÕ´Ï´Ù");
		alert("ÇØ´ç Ä®·³Àº ¼öÁ¤ÇÒ¼ö ¾ø½À´Ï´Ù.");
		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	
	cal_dw1()	
	
}



/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Àü°³Á¦°í ¿¬»ê
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function cal_dw() {
	
	
	var i= 0; 
	 
	var pr_term		= 0;
	var pr_term_temp= 0; // ¹ßÁÖ±â°£ ´©Àû
	var pr_term_sum	= 0; // ¹ßÁÖ±â°£ ´©Àû
	var pr_term_sum_temp = 0;

	var po_term		= 0;
	var po_term_temp= 0; // ¹ßÁÖ±â°£ ´©Àû
	var po_term_sum	= 0; // ¹ßÁÖ±â°£ ´©Àû
	var po_term_sum_temp = 0;

	var ipgo_term		= 0;
	var ipgo_term_temp= 0; // ¹ßÁÖ±â°£ ´©Àû
	var ipgo_term_sum	= 0; // ¹ßÁÖ±â°£ ´©Àû
	var ipgo_term_sum_temp = 0;


	
	var pr_qty = 0;
	var po_qty = 0;
	var ipgo_qty = 0;
	var pr_qty_sum = 0;
	var po_qty_sum = 0;
	var ipgo_qty_sum = 0;
	
	var pr_po	= 0;
	var po_ipgo = 0;
	var total	= 0;
	var pr_po_sum	= 0;
	var po_ipgo_sum = 0;
	var total_sum	= 0;
	
		
		/* ¼ö·® */	
		pr_qty			= Number(GridObj.GetCellValue("PR_QTY", 0));
		pr_qty_sum		= pr_qty_sum + pr_qty;
		po_qty			= Number(GridObj.GetCellValue("PO_QTY", 0));
		po_qty_sum		= po_qty_sum + po_qty;
		
		/* ¼Ò¿äÀÏ¼ö */	
		pr_po			= Number(GridObj.GetCellValue("PR_PO", 0));
		pr_po_sum		= pr_po_sum + pr_po;
		po_ipgo			= Number(GridObj.GetCellValue("PO_IPGO", 0));
		po_ipgo_sum		= po_ipgo_sum + po_ipgo;		
		total			= Number(GridObj.GetCellValue("TOTAL", 0));
		total_sum		= total_sum + total;		
	
		/* ±â°£ */
		pr_term			= Number(GridObj.GetCellValue("PR_TERM", 0)); // 57
		pr_term_temp	= pr_term; 	// 57
		pr_term_sum_temp= pr_term_sum_temp + pr_term_sum; //0
		///////
		po_term			= Number(GridObj.GetCellValue("PO_TERM", 0)); // 57
		po_term_temp	= po_term; 	// 57
		po_term_sum_temp= po_term_sum_temp + po_term_sum; //0
		////////
		ipgo_term			= Number(GridObj.GetCellValue("IPGO_TERM", 0)); // 57
		ipgo_term_temp	= ipgo_term; 	// 57
		ipgo_term_sum_temp= ipgo_term_sum_temp + ipgo_term_sum; //0


		for(var i=1;i<GridObj.GetRowCount();i++){
			
			if(i == GridObj.GetRowCount()-1){ // ¸¶Áö¸· Æò±Õ row Àº ÀÓÀÇ·Î °¡Á®¿Â row ÀÌ±â ¶§¹®¿¡ ¸¶Áö¸· ½ÇÇà½Ã ÇÑ¹ø »©ÁØ´Ù.
				
			}else{
				//alert("i="+i+", pr_term="+pr_term);
				pr_term		= Number(GridObj.GetCellValue("PR_TERM", i)); // µÎ¹øÂ° ·Î¿ì,, 22
				pr_term_sum		= pr_term_temp - pr_term;  // 57 - 22 = 35
				pr_term_temp	= pr_term; //22
				pr_term_sum_temp= pr_term_sum_temp + pr_term_sum;

				po_term		= Number(GridObj.GetCellValue("PR_TERM", i)); // µÎ¹øÂ° ·Î¿ì,, 22
				po_term_sum		= po_term_temp - po_term;  // 57 - 22 = 35
				po_term_temp	= po_term; //22
				po_term_sum_temp= po_term_sum_temp + po_term_sum;

				ipgo_term		= Number(GridObj.GetCellValue("IPGO_TERM", i)); // µÎ¹øÂ° ·Î¿ì,, 22
				ipgo_term_sum		= ipgo_term_temp - ipgo_term;  // 57 - 22 = 35
				ipgo_term_temp	= ipgo_term; //22
				ipgo_term_sum_temp= ipgo_term_sum_temp + ipgo_term_sum;
			}
	
			
			/* ¼ö·® */
			pr_qty			= Number(GridObj.GetCellValue("PR_QTY", i));
			pr_qty_sum		= pr_qty_sum + pr_qty;
			po_qty			= Number(GridObj.GetCellValue("PO_QTY", i));
			po_qty_sum		= po_qty_sum + po_qty;

			/* ¼Ò¿äÀÏ¼ö */
			pr_po			= Number(GridObj.GetCellValue("PR_PO", i));
			pr_po_sum		= pr_po_sum + pr_po;
			po_ipgo			= Number(GridObj.GetCellValue("PO_IPGO", i));
			po_ipgo_sum		= po_ipgo_sum + po_ipgo;
			total			= Number(GridObj.GetCellValue("TOTAL", i));
			total_sum		= total_sum + total;		
	
		}
	
	//alert("count="+count);
	var row = GridObj.GetRowCount()-1 ;
	GridObj.SetCellValue("PR_DAY", row,  Math.round(pr_term_sum_temp/(row-1)));
	GridObj.SetCellValue("PO_DAY", row,  Math.round(po_term_sum_temp/(row-1)));
	//GridObj.SetCellValue("IPGO_DAY", row,  Math.round(ipgo_term_sum_temp/(row-1)));
	
	GridObj.SetCellValue("PR_QTY", row,  Math.round(pr_qty_sum/row));
	GridObj.SetCellValue("PO_QTY", row,  Math.round(po_qty_sum/row));
	
	GridObj.SetCellValue("PR_PO", row,  Math.round(pr_po_sum/row));
	GridObj.SetCellValue("PO_IPGO", row,  Math.round(po_ipgo_sum/row));
	GridObj.SetCellValue("TOTAL", row,  Math.round(total_sum/row));
}

function enterCheck(){
	
	var key = event.keyCode;
	// TAB(9) or ENTER(13)
	if(event.keyCode == "13" ) {
		refresh("simul");		
	}else{
		
	}

}


// ´õºí Å¬¸¯ : »ó¼¼ ÆË¾÷ ÀçÁ¶È¸ - 3ÁÖÆò±Õ,1ÁÖÆò±Õ,3+1ÁÖÆò±Õ/2
function refresh(week_flag) {
	
	var item_id = document.frm.item_id.value;
	var	item_name = document.frm.item_name.value;
	var simul_data = document.frm.simul_data.value;
	var week_flag	= week_flag;

	//Simulation ÀÏ °æ¿ì simul_data ÇÊ¼ö
	if(week_flag == "simul") {
		if( simul_data == "" || simul_data == null || simul_data == "0") {
			alert("SimulationÀÇ °ªÀ» ÀÔ·ÂÇØÁÖ½Ê½Ã¿ä!"); 
			document.frm.simul_data.select();
			return;
		}
	}
	
	var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_new";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag + "&simul_data=" + simul_data;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=350, top=200, left=200";
	//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}