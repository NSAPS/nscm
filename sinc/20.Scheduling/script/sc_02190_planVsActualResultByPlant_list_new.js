//## ÇÁ·Î±×·¥ID      : sc_02190_planVsActualResultByPlant_list_new.js
//## ÇÁ·Î±×·¥¸í      	 : °øÀåº° »ý»ê°èÈ¹ ´ëºñ ½ÇÀûÁ¶È¸(½Å±Ô)
//## º¯°æÀÚ            	 : ÀÌ°­¿í
//## °³¹ßÀÏÀÚ        	 : 2016-03-15 
//##
//## °ü·Ã job file   : job_sinc_20_scheduling.xml
//## °ü·Ã query file : query_sinc_20_scheduling_08.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'sc_02190_planVsActualResultByPlant_list_new';

var GridObj ; 									// WiseGrid °´Ã¼
var color_tot 		 = '234|234|234';			//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row = '141|232|141';			//¶óÀÎ ¼±ÅÃ ¹è°æ»ö 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
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
    
    // È­¸é size Ãà¼Ò ½Ã È­¸éÀÌ ³Ê¹« ÀÛ¾Æ ±×¸®µå Å©±â°¡ À½¼ö°¡ µÇ¸é ¿¡·¯°¡ ³ª¹Ç·Î ±× °æ¿ì ¹«Á¶°Ç 1·Î ¼¼ÆÃ 
    // ==> È­¸éÀÌ ´õÀÌ»ó Ãà¼ÒµÇÁö ¾ÊÀ½ 
    if( tabHeightValue < 1 ) 
        tabHeightValue = 1; 
    if( tableHeightValue < 1 ) 
        tableHeightValue = 1;
      
    //tabPage1.style.height = tabHeightValue + "px"; 

    document.WiseGrid.height = tableHeightValue + "px"; 
    //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
}  

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

	GridObj.bRowSelectorIndex = true;				//Row Selector ¿µ¿ª¿¡ Row Index¸¦ º¸¿©ÁØ´Ù.

    GridObj.nHDLineSize         = 10; //Header Size
    //GridObj.bHDMoving = true;		// ÄÃ·³ Çì´õ À§Ä¡ ÀÌµ¿
    
    //Çì´õÀÇ ¶óÀÎ¼ö¸¦ ¼³Á¤ÇÑ´Ù. 
    GridObj.nHDLines = 2;   
   
    //¼±ÅÃµÈ ¼¿ÀÇ ±ÛÀÚ»ö ÁöÁ¤ÇÑ´Ù.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; 	//Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù
	GridObj.strActiveRowBgColor    = "232|245|213";     //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.	
    GridObj.strHDClickAction 	   = "select";        	//Å¬¸¯ÇÑ ÄÃ·³ÀÇ ¼¿À» ¼±ÅÃ°¡´ÉÇÏ°Ô ÇÑ´Ù.
    GridObj.strMouseWheelAction	   = 'page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;		
       
}
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("ITEM_ID"	    ,"Á¦Ç°ÄÚµå"		,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	,"Á¦Ç°¸í"	        ,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("SPEC"	   	,"±Ô°Ý"	    	,"t_text"  	   ,100		,100    ,false); //0
 	GridObj.AddHeader("GUBN"	   	,"±¸ºÐ"	    	,"t_text"  	   ,100		,50    ,false); //0
	GridObj.AddHeader("ANYANG"	   	,"¾È¾ç"	    	,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("ANSUNG"	    ,"¾È¼º"       	,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("ANSUNG_B"   	,"¾È¼ºÀ½·á"		,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("ASAN"  	   	,"¾Æ»ê"			,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("KUMI"  	   	,"±¸¹Ì"			,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("PUSAN"  	   	,"ºÎ»ê"			,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("NOKSAN"  	,"³ì»ê"			,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("TOTAL"  		,"ÇÕ°è"			,"t_number"    ,100.3	,90     ,false); //0
	
	GridObj.AddGroup	("PROD_PLAN",   "°øÀåº°");			
	GridObj.AppendHeader("PROD_PLAN", 	"ANYANG");
	GridObj.AppendHeader("PROD_PLAN", 	"ANSUNG");
	GridObj.AppendHeader("PROD_PLAN", 	"ANSUNG_B");
	GridObj.AppendHeader("PROD_PLAN",   "ASAN");
	GridObj.AppendHeader("PROD_PLAN",   "KUMI");
	GridObj.AppendHeader("PROD_PLAN",   "PUSAN");
	GridObj.AppendHeader("PROD_PLAN",   "NOKSAN");
	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 
	
	GridObj.SetColCellAlign('SPEC',  	'left'); 
	GridObj.SetColCellAlign('GUBN',  	'center'); 
	GridObj.SetColCellAlign('ITEM_ID',  'center');
   	GridObj.SetNumberFormat("ANYANG",       "###,###.#");
    GridObj.SetNumberFormat("ANSUNG",       "###,###.#");
    GridObj.SetNumberFormat("ANSUNG_B",     "###,###.#");
    GridObj.SetNumberFormat("ASAN",       	"###,###.#");
    GridObj.SetNumberFormat("KUMI",       	"###,###.#");
    GridObj.SetNumberFormat("PUSAN",       	"###,###.#");
    GridObj.SetNumberFormat("NOKSAN",       "###,###.#");
	GridObj.SetNumberFormat("TOTAL",       	"###,###.#");
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
        	
        	var row = GridObj.GetRowCount();            	
        	if (row == 0) return;
        	
        	
        	GridSetMerge();
        	GridSetTotal();
        	GridSetColor();
        	
         
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSearch(service) 
{
    doQuery();
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇÏºÎ ±×¸®µå Á¶È¸ WD1 ´õºíÅ¬¸¯
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave(service) {	

	doSave();	
	
};

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DW 1 Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() 
{
   var start_date	    = document.frm.start_date.value;
   var end_date	        = document.frm.end_date.value;
   start_date 			= start_date.replace(/-/g,"");
   end_date 			= end_date.replace(/-/g,"");
 
   var user_id			= document.frm._user_id.value;
   var ex_gubn	    	= document.frm.ex_gubn.value;   
   var mto_gubn	    	= document.frm.mto_gubn.value;
   var selected_type	= document.frm.selected_type.value;
   
   var checked_uom;
       
   if(document.frm.checked_uom[0].checked){

		checked_uom = document.frm.checked_uom[0].value;
		
	}else if(document.frm.checked_uom[1].checked){
			
		checked_uom = document.frm.checked_uom[1].value;
		
	}
	
	
       	
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("end_date",       	end_date);
   GridObj.SetParam("user_id",     		user_id);
   GridObj.SetParam("ex_gubn", 			ex_gubn);
   GridObj.SetParam("mto_gubn", 		mto_gubn);
   GridObj.SetParam("selected_type", 	selected_type);
   GridObj.SetParam("checked_uom", 		checked_uom);
  	
   GridObj.DoQuery(servlet_url);       
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow) {

}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,SPEC');
    //GridObj.AddSummaryBar('SUMMARY1', 'ÇÕ°è', 'summaryall', 'sum', ''); 


}

function GridSetColor(){
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID');   //¼Ò°è ÀÎµ¦½º ±¸ÇÏ±â
	
	for (var i=0; i < rowcount; i++){
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,true);
		GridObj.SetCellBgColor('GUBN', 		idx, color_tot);
		GridObj.SetCellBgColor('ANYANG', 	idx, color_tot);
		GridObj.SetCellBgColor('ANSUNG', 	idx, color_tot);
		GridObj.SetCellBgColor('ANSUNG_B', 	idx, color_tot);
		GridObj.SetCellBgColor('ASAN', 		idx, color_tot);
		GridObj.SetCellBgColor('KUMI', 		idx, color_tot);
		GridObj.SetCellBgColor('PUSAN', 	idx, color_tot);
		GridObj.SetCellBgColor('NOKSAN', 	idx, color_tot);
		GridObj.SetCellBgColor('TOTAL', 	idx, color_tot);
		
	}
}

function GridSetTotal(){
	
	GridObj.AddRow();
	GridObj.AddRow();
	GridObj.AddRow();
	GridObj.AddRow();
	
	var rowcount 	= GridObj.GetRowCount();
	var mergecount 	= GridObj.GetMergeCount('ITEM_ID'); 
	var plan_anyang 	= 0 ;
	var plan_ansung 	= 0 ;
	var plan_ansung_b 	= 0 ;
	var plan_asan 		= 0 ;
	var plan_kumi 		= 0 ;
	var plan_pusan 		= 0 ;
	var plan_noksan 	= 0 ;
	var plan_total 		= 0 ;
	var prod_anyang 	= 0 ;
	var prod_ansung 	= 0 ;
	var prod_ansung_b 	= 0 ;
	var prod_asan 		= 0 ;
	var prod_kumi 		= 0 ;
	var prod_pusan 		= 0 ;
	var prod_noksan 	= 0 ;
	var prod_total		= 0 ;
	var gap_anyang 		= 0 ;
	var gap_ansung 		= 0 ;
	var gap_ansung_b 	= 0 ;
	var gap_asan 		= 0 ;
	var gap_kumi 		= 0 ;
	var gap_pusan 		= 0 ;
	var gap_noksan 		= 0 ;
	var gap_total		= 0 ;
	
	
	for (var i =0; i < mergecount-4; i ++){
		
		var idx_start	= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);   //merge groupÀÇ Ã¹¹øÂ° row index
		var idx_end		= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,true);    //merge groupÀÇ ¸¶Áö¸· row index
		
		var idx_plan_anyang		= GridObj.GetCellValue('ANYANG'		,idx_start);
		var idx_plan_ansung		= GridObj.GetCellValue('ANSUNG'		,idx_start);
		var idx_plan_ansung_b	= GridObj.GetCellValue('ANSUNG_B'	,idx_start);
		var idx_plan_asan		= GridObj.GetCellValue('ASAN'		,idx_start);
		var idx_plan_kumi		= GridObj.GetCellValue('KUMI'		,idx_start);
		var idx_plan_pusan		= GridObj.GetCellValue('PUSAN'		,idx_start);
		var idx_plan_noksan		= GridObj.GetCellValue('NOKSAN'		,idx_start);
		var idx_plan_total		= GridObj.GetCellValue('TOTAL'		,idx_start);
		var idx_prod_anyang		= GridObj.GetCellValue('ANYANG'		,idx_start + 1);
		var idx_prod_ansung		= GridObj.GetCellValue('ANSUNG'		,idx_start + 1);
		var idx_prod_ansung_b	= GridObj.GetCellValue('ANSUNG_B'	,idx_start + 1);
		var idx_prod_asan		= GridObj.GetCellValue('ASAN'		,idx_start + 1);
		var idx_prod_kumi		= GridObj.GetCellValue('KUMI'		,idx_start + 1);
		var idx_prod_pusan		= GridObj.GetCellValue('PUSAN'		,idx_start + 1);
		var idx_prod_noksan		= GridObj.GetCellValue('NOKSAN'		,idx_start + 1);
		var idx_prod_total		= GridObj.GetCellValue('TOTAL'		,idx_start + 1);
		var idx_gap_anyang		= GridObj.GetCellValue('ANYANG'		,idx_start + 2);
		var idx_gap_ansung		= GridObj.GetCellValue('ANSUNG'		,idx_start + 2);
		var idx_gap_ansung_b	= GridObj.GetCellValue('ANSUNG_B'	,idx_start + 2);
		var idx_gap_asan		= GridObj.GetCellValue('ASAN'		,idx_start + 2);
		var idx_gap_kumi		= GridObj.GetCellValue('KUMI'		,idx_start + 2);
		var idx_gap_pusan		= GridObj.GetCellValue('PUSAN'		,idx_start + 2);
		var idx_gap_noksan		= GridObj.GetCellValue('NOKSAN'		,idx_start + 2);
		var idx_gap_total		= GridObj.GetCellValue('TOTAL'		,idx_start + 2);
		
		plan_anyang 	+= Number(idx_plan_anyang);
		plan_ansung 	+= Number(idx_plan_ansung);
		plan_ansung_b 	+= Number(idx_plan_ansung_b);
		plan_asan 		+= Number(idx_plan_asan);
		plan_kumi 		+= Number(idx_plan_kumi);
		plan_pusan 		+= Number(idx_plan_pusan);
		plan_noksan 	+= Number(idx_plan_noksan);
		plan_total 		+= Number(idx_plan_total);
		prod_anyang 	+= Number(idx_prod_anyang);
		prod_ansung 	+= Number(idx_prod_ansung);
		prod_ansung_b 	+= Number(idx_prod_ansung_b);
		prod_asan 		+= Number(idx_prod_asan);
		prod_kumi 		+= Number(idx_prod_kumi);
		prod_pusan 		+= Number(idx_prod_pusan);
		prod_noksan 	+= Number(idx_prod_noksan);
		prod_total 		+= Number(idx_prod_total);
		gap_anyang 		+= Number(idx_gap_anyang);
		gap_ansung 		+= Number(idx_gap_ansung);
		gap_ansung_b 	+= Number(idx_gap_ansung_b);
		gap_asan 		+= Number(idx_gap_asan);
		gap_kumi 		+= Number(idx_gap_kumi);
		gap_pusan 		+= Number(idx_gap_pusan);
		gap_noksan 		+= Number(idx_gap_noksan);
		gap_total 		+= Number(idx_gap_total);
		
	}	
		
	GridObj.SetCellValue('ITEM_NAME', rowcount - 4,	'ÇÕ°è');
//	GridObj.SetCellValue('ITEM_NAME', rowcount - 3, 'ÇÕ°è');
//	GridObj.SetCellValue('ITEM_NAME', rowcount - 2, 'ÇÕ°è');
	GridObj.SetCellValue('ITEM_NAME', rowcount - 1, '´Þ¼º·ü(%)');
	
	GridObj.SetCellValue('GUBN', rowcount -	4, '°èÈ¹');
	GridObj.SetCellValue('GUBN', rowcount - 3, '½ÇÀû');
	GridObj.SetCellValue('GUBN', rowcount - 2, 'Â÷ÀÌ');
	
	
	GridObj.SetCellValue('ANYANG', rowcount - 4, plan_anyang);
	GridObj.SetCellValue('ANYANG', rowcount - 3, prod_anyang);
	GridObj.SetCellValue('ANYANG', rowcount - 2, gap_anyang);
	GridObj.SetCellValue('ANSUNG', rowcount - 4, plan_ansung);
	GridObj.SetCellValue('ANSUNG', rowcount - 3, prod_ansung);
	GridObj.SetCellValue('ANSUNG', rowcount - 2, gap_ansung);
	GridObj.SetCellValue('ANSUNG_B', rowcount - 4, plan_ansung_b);
	GridObj.SetCellValue('ANSUNG_B', rowcount - 3, prod_ansung_b);
	GridObj.SetCellValue('ANSUNG_B', rowcount - 2, gap_ansung_b);
	GridObj.SetCellValue('ASAN', rowcount - 4, plan_asan);
	GridObj.SetCellValue('ASAN', rowcount - 3, prod_asan);
	GridObj.SetCellValue('ASAN', rowcount - 2, gap_asan);
	GridObj.SetCellValue('KUMI', rowcount - 4, plan_kumi);
	GridObj.SetCellValue('KUMI', rowcount - 3, prod_kumi);
	GridObj.SetCellValue('KUMI', rowcount - 2, gap_kumi);
	GridObj.SetCellValue('PUSAN', rowcount - 4, plan_pusan);
	GridObj.SetCellValue('PUSAN', rowcount - 3, prod_pusan);
	GridObj.SetCellValue('PUSAN', rowcount - 2, gap_pusan);
	GridObj.SetCellValue('NOKSAN', rowcount - 4, plan_noksan);
	GridObj.SetCellValue('NOKSAN', rowcount - 3, prod_noksan);
	GridObj.SetCellValue('NOKSAN', rowcount - 2, gap_noksan);
	GridObj.SetCellValue('TOTAL', rowcount - 4, plan_total);
	GridObj.SetCellValue('TOTAL', rowcount - 3, prod_total);
	GridObj.SetCellValue('TOTAL', rowcount - 2, gap_total);
	
	GridSetGoal();
	
}


function GridSetGoal(){
	
	var rowcount 	= GridObj.GetRowCount();
	var anyang = 0;
	var ansung = 0;
	var ansung_b = 0;
	var asan = 0;
	var kumi = 0;
	var pusan = 0;
	var noksan = 0;
	var total = 0;
	if(GridObj.GetCellValue('ANYANG',rowcount-4)!="0") anyang	+= Math.round(Number(GridObj.GetCellValue('ANYANG',rowcount-3)/GridObj.GetCellValue('ANYANG',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('ANSUNG',rowcount-4)!="0") ansung	+= Math.round(Number(GridObj.GetCellValue('ANSUNG',rowcount-3)/GridObj.GetCellValue('ANSUNG',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('ANSUNG_B',rowcount-4)!="0") ansung_b	+= Math.round(Number(GridObj.GetCellValue('ANSUNG_B',rowcount-3)/GridObj.GetCellValue('ANSUNG_B',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('ASAN',rowcount-4)!="0") asan		+= Math.round(Number(GridObj.GetCellValue('ASAN',rowcount-3)/GridObj.GetCellValue('ASAN',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('KUMI',rowcount-4)!="0") kumi		+= Math.round(Number(GridObj.GetCellValue('KUMI',rowcount-3)/GridObj.GetCellValue('KUMI',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('PUSAN',rowcount-4)!="0") pusan		+= Math.round(Number(GridObj.GetCellValue('PUSAN',rowcount-3)/GridObj.GetCellValue('PUSAN',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('NOKSAN',rowcount-4)!="0") noksan	+= Math.round(Number(GridObj.GetCellValue('NOKSAN',rowcount-3)/GridObj.GetCellValue('NOKSAN',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('TOTAL',rowcount-4)!="0") total		+= Math.round(Number(GridObj.GetCellValue('TOTAL',rowcount-3)/GridObj.GetCellValue('TOTAL',rowcount-4))/0.0001) * 0.01;
	
	
	GridObj.SetCellValue('ANYANG',rowcount-1,anyang);
	GridObj.SetCellValue('ANSUNG',rowcount-1,ansung);
	GridObj.SetCellValue('ANSUNG_B',rowcount-1,ansung_b);
	GridObj.SetCellValue('ASAN',rowcount-1,asan);
	GridObj.SetCellValue('KUMI',rowcount-1,kumi);
	GridObj.SetCellValue('PUSAN',rowcount-1,pusan);
	GridObj.SetCellValue('NOKSAN',rowcount-1,noksan);
	GridObj.SetCellValue('TOTAL',rowcount-1,total);
	
}



