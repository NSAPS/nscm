//## ÇÁ·Î±×·¥ID		:	ip_02070_Edi_Default_List_excel_reg_pop.js
//## ÇÁ·Î±×·¥¸í		:	À¯Åëº»ºÎ ¹Ì³³ ºÐ¼® ¿¢¼¿ ¾÷·Îµå 
//## °³¹ßÀÚ          :	±Ç¿ëÂù 
//## °³¹ßÀÏÀÚ       	:	2011-02-16
//##
//## °ü·Ã job file   : ip_02070_Edi_Default_List_excel_reg_pop.xml.xml
//## °ü·Ã query file : ip_02070_Edi_Default_List_excel_reg_pop.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2011-02-16  ±Ç¿ëÂù      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'ip_02070_Edi_Default_List_Monthly_popup';
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
	setDefault(GridObj);
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setDefault() { 

    GridObj.nHDLineSize         = 20; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";   
 	GridObj.strActiveRowBgColor = "232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'   

   //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;   

	// Header Font Setting
	GridObj.strHDFontName = '¸¼Àº °íµñ';
	GridObj.nHDFontSize = 10;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

 
}
     
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	GridObj.AddHeader("CNFM_DATE"			,"ÀÏÀÚ"       	,"t_text" 	,100    ,99  ,false);
 	GridObj.AddHeader("EDI_AMOUNT"			,"¹ßÁÖ±Ý¾×"		,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("EDI_AMOUNT_SUM"		,"¹ßÁÖ±Ý¾×\n´©°è"	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("DEFAULT_AMOUNT"		,"¹Ì³³±Ý¾×"		,"t_number" ,20.3	,90 ,false); //0   
 	GridObj.AddHeader("CUST_DEFAULT"		,"°Å·¡Ã³¿À·ù"     ,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("NS_DEFAULT"			,"³ó½É¹Ì³³"     	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("NS_DEFAULT_SUM"		,"³ó½É¹Ì³³\n´©°è" 	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("PENALTY_AMOUNT_3"	,"Æä³ÎÆ¼±Ý¾×\n(3%)"  ,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("PENALTY_AMOUNT_5"	,"ÆÐ³ÎÆ¼±Ý¾×\n(5%)"  ,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("DEFAULT_RATE"		,"¹Ì³³À²"     	,"t_number" ,20.3	,60  ,false); //0   
 	GridObj.AddHeader("DEFAULT_RATE_SUM"	,"¹Ì³³À²\n´©°è"   ,"t_number" ,20.3	,60  ,false); //0   
 	GridObj.AddHeader("KAL_DEFAULT"			,"ÄÌ·Î±×»ç\n¿À·ù"	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("MJ_DEFAULT"			,"±ÍÃ¥\n¹ÌÈ®Á¤"	,"t_number" ,20.3	,90  ,false); //0   
	GridObj.BoundHeader();	

	GridObj.SetColFix('CNFM_DATE');

    GridObj.SetColCellAlign('CNFM_DATE','center'); 
    //GridObj.SetColCellAlign('CUST_STORE_CODE','center'); 
    //GridObj.SetColCellAlign('CUST_STORE_NAME','center');
    //GridObj.SetColCellAlign('CUST_ITEM_ID','center'); 
    //GridObj.SetColCellAlign('EDI_GUBN','center'); 



	//GridObj.SetCRUDMode("CRUD");  // AD¿Í DE°¡ ¼ÂÆÃ µÉ °æ¿ì´Â ¾ø´Ù.
	GridObj.SetNumberFormat("EDI_AMOUNT"  		, "#,##0.###");  
	GridObj.SetNumberFormat("EDI_AMOUNT_SUM"  	, "#,##0.###");  
	GridObj.SetNumberFormat("DEFAULT_AMOUNT"  	, "#,##0.###");  
	GridObj.SetNumberFormat("CUST_DEFAULT"  	, "#,##0.###");  
	GridObj.SetNumberFormat("NS_DEFAULT"  		, "#,##0.###");  
	GridObj.SetNumberFormat("NS_DEFAULT_SUM"  	, "#,##0.###");  
	GridObj.SetNumberFormat("PENALTY_AMOUNT_3"  , "#,##0.###");  
	GridObj.SetNumberFormat("PENALTY_AMOUNT_5"	, "#,##0.###");
	GridObj.SetNumberFormat("DEFAULT_RATE", "#,##0.###");
	GridObj.SetNumberFormat("DEFAULT_RATE_SUM", "#,##0.###");  
	GridObj.SetNumberFormat("KAL_DEFAULT", "#,##0.###");  
	

	//Hidden ÄÃ·³  
	//GridObj.SetColHide("CRUD",true);
	
	GoSearch(); 
}

   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
    doQuery();
   }

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var cnfm_date	=document.frm.cnfm_date.value;

	//alert(cnfm_date);

	   
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("cnfm_date", cnfm_date);
	   
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
}

// ÀúÀå
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
};

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");
    var cnfm_date		= GridObj.GetCellValue("CNFM_DATE", 1);	
    var error_msg = '';
      
    if(endMode == "search"||endMode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
    {
        if(GridObj.GetStatus() == "true") 
        {                           
                 cal_dw()
			GridObj.AddSummaryBar('SUMMARY', 'ÇÕ°è', 'summaryall', 'sum', 'EDI_AMOUNT,DEFAULT_AMOUNT,CUST_DEFAULT,NS_DEFAULT,KAL_DEFAULT,PENALTY_AMOUNT_3,PENALTY_AMOUNT_5');
		  	GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot);                  
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else{

    }	

	
}
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {

}	


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW  ¿¬»ê
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function cal_dw() {
	
	var i= 0; 
	 
	var edi_amount		= 0;
	var edi_amount_sum	= 0;
	var default_amount	= 0;
	var ns_default		= 0;
	var ns_default_sum	= 0;
    var default_rate	=0;
    var default_rate_sum=0;
    
    var penalty_amount_3	=0;
	var penalty_amount_5	=0;    
	
	
		edi_amount		= Number(GridObj.GetCellValue("EDI_AMOUNT", 0));
		edi_amount_sum	= Number(GridObj.GetCellValue("EDI_AMOUNT_SUM", 0));
		
		ns_default		= Number(GridObj.GetCellValue("NS_DEFAULT", 0));
		ns_default_sum	= Number(GridObj.GetCellValue("NS_DEFAULT_SUM", 0));
		
		default_rate	= Number(GridObj.GetCellValue("DEFAULT_RATE", 0));
		default_rate_sum= Number(GridObj.GetCellValue("DEFAULT_RATE_SUM", 0));
		
		edi_amount_sum	= edi_amount_sum+edi_amount;
		GridObj.SetCellValue("EDI_AMOUNT_SUM", i,  edi_amount_sum);
		
		ns_default_sum	= ns_default_sum+ns_default;
		GridObj.SetCellValue("NS_DEFAULT_SUM", i,  ns_default_sum);
		
		default_rate_sum = Math.round(((ns_default_sum/edi_amount_sum)*100)*10)/10;
		GridObj.SetCellValue("DEFAULT_RATE_SUM", i,  default_rate_sum);
		
		penalty_amount_3 = Math.round(ns_default*0.03);
		GridObj.SetCellValue("PENALTY_AMOUNT_3", i,  penalty_amount_3);
		
		penalty_amount_5 = Math.round(ns_default*0.05);
		GridObj.SetCellValue("PENALTY_AMOUNT_5", i,  penalty_amount_5);

		
	for(var i=1;i<GridObj.GetRowCount();i++){
		
		edi_amount		= Number(GridObj.GetCellValue("EDI_AMOUNT", i));
		edi_amount_sum	= edi_amount_sum+edi_amount;
		GridObj.SetCellValue("EDI_AMOUNT_SUM", i,  edi_amount_sum);	

		ns_default		= Number(GridObj.GetCellValue("NS_DEFAULT", i));
		ns_default_sum	= ns_default_sum+ns_default;
		GridObj.SetCellValue("NS_DEFAULT_SUM", i,  ns_default_sum);	

		default_rate_sum = Math.round(((ns_default_sum/edi_amount_sum)*100)*10)/10;
		GridObj.SetCellValue("DEFAULT_RATE_SUM", i,  default_rate_sum);

		penalty_amount_3 = Math.round(ns_default*0.03);
		GridObj.SetCellValue("PENALTY_AMOUNT_3", i,  penalty_amount_3);
		
		penalty_amount_5 = Math.round(ns_default*0.05);
		GridObj.SetCellValue("PENALTY_AMOUNT_5", i,  penalty_amount_5);


		//next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
	}
}
	
