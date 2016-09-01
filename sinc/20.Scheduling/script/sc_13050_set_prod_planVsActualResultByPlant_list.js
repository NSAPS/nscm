/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//
//var mode;														// WiseGrid Åë½Å ½Ã Àü¼Û ¸ðµå(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id 	   = 'sc_13050_set_prod_planVsActualResultByPlant_list';
var GridObj ; 													// WiseGrid °´Ã¼

var color_tot 	      = '255|234|0';		//ÇÕ°è ¶óÀÎ ¹è°æ»ö
var color_edit_col    = '204|204|204';			//Â÷ÀÌ·® »ö±ò Ç¥½Ã '255|253|208', '253|228|229'//

var color_sp 	      = '230|222|230'; 		//ÄÃ·³ ±¸ºÐ¼± ¹è°æ»ö
var color_select_row  = '141|232|141';		//¶óÀÎ ¼±ÅÃ ¹è°æ»ö


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

    GridObj.nHDLineSize				=	26; //Header Size
    GridObj.strHDClickAction		=	"sortsingle";
 	GridObj.strActiveRowBgColor		=	"232|245|213";    //¼±ÅÃµÈ ÇàÀÇ ¹è°æ»ö»óÀ» ¼³Á¤ÇÑ´Ù.
	GridObj.strSelectedCellBgColor	=	'232|232|255'; //Drag·Î ¼±ÅÃµÈ ¼¿ÀÇ ¹è°æ»ö»óÀ» º¯°æÇÒ ¼ö ÀÖ´Ù 	
	GridObj.strSelectedCellFgColor	=	'0|0|0'; 
	GridObj.strMouseWheelAction		=	'page'; // page ´ÜÀ§ scroll ->±âº»Àº 'default'    
	
	GridObj.strHDClickAction		=	"select";	
	
}

       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setHeader(GridObj) {        
		
	var selected_type	= document.all.selected_type.value;
	var checked_uom 	= document.frm.checked_uom.value;

	if(selected_type=="2"){
		GridObj.AddHeader("SALES_CAT03"		,"Ç°¸ñÄÚµå"    	 ,"t_text" 	    		,100	,90   ,false); // ÁßºÐ·ù// 
		GridObj.AddHeader("CD_NAME"			,"Ç°¸ñ¸í"    	 	 ,"t_text" 	    		,100    ,160  ,false);
		GridObj.AddHeader("GUBN"			,"±¸ºÐ"       	 ,"t_text" 	    		,100	,75   ,false);		
	 	GridObj.AddHeader("MTS_AN_QTY"	    ,"3SforU(¾È¾ç)"  ,"t_number" 			,100.3	,100  ,false);
	 	GridObj.AddHeader("AS_QTY"	    	,"¾È¼º"  		,"t_number" 			,100.3	,70   ,false);
		GridObj.AddHeader("MTS_PO_QTY"	    ,"3SforU(Æ÷½Â)"  ,"t_number" 			,100.3	,100  ,false);	  	
	  	GridObj.AddHeader("WINE_QTY"	    ,"¿ÍÀÎ³ª¶ó"       ,"t_number" 			,100.3	,100  ,false); 
	  	GridObj.AddHeader("DY_QTY"	        ,"µ¿¾ç¹°·ù"       ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("MIRE_QTY"	    ,"¹Ì·¡»ó»ç"       ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("TK_QTY"	        ,"´ë±¸°æºÏ´É±Ý"    ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("HS_QTY"	        ,"ÇÑ¼Ö"         	 ,"t_number" 			,100.3	,70   ,false);
	 	GridObj.AddHeader("TOT"			    ,"°è"       		 ,"t_number" 			,100.3	,120  ,false);   
	
	    /* ÀÌÁß ÇØ´õ Ãß°¡ */
		GridObj.AddGroup("HD1",    "ÀÛ¾÷Àåº°");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
		GridObj.AppendHeader("HD1",   "MTS_AN_QTY");
		GridObj.AppendHeader("HD1",		  "AS_QTY");
		GridObj.AppendHeader("HD1",   "MTS_PO_QTY");
		GridObj.AppendHeader("HD1",   	"WINE_QTY");
		GridObj.AppendHeader("HD1",   	  "DY_QTY");
		GridObj.AppendHeader("HD1",  	"MIRE_QTY");
		GridObj.AppendHeader("HD1",    	  "TK_QTY");
		GridObj.AppendHeader("HD1",    	  "HS_QTY");	
		
		GridObj.BoundHeader();	
		
	    GridObj.SetColCellAlign('SALES_CAT03',	  'left'); 
	    GridObj.SetColCellAlign('CD_NAME',	  	  'left');    
	    GridObj.SetColCellAlign('GUBN',			'center');
	    GridObj.SetColCellAlign('MTS_AN_QTY',	 'right'); 
	    GridObj.SetColCellAlign('AS_QTY',	 	 'right');
	    GridObj.SetColCellAlign('MTS_PO_QTY',	 'right');
	    GridObj.SetColCellAlign('WINE_QTY',	     'right');
	    GridObj.SetColCellAlign('DY_QTY',	     'right');
	    GridObj.SetColCellAlign('MIRE_QTY',	     'right');
	    GridObj.SetColCellAlign('TK_QTY',	     'right');
	    GridObj.SetColCellAlign('HS_QTY',	     'right');
	    GridObj.SetColCellAlign('TOT',	   	     'right');
	    
		GridObj.SetNumberFormat('MTS_AN_QTY',  '#,##0.#');
		GridObj.SetNumberFormat('AS_QTY',  	   '#,##0.#');
		GridObj.SetNumberFormat('MTS_PO_QTY',  '#,##0.#');
		GridObj.SetNumberFormat('WINE_QTY',    '#,##0.#');
		GridObj.SetNumberFormat('DY_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('MIRE_QTY',    '#,##0.#');
		GridObj.SetNumberFormat('TK_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('HS_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('TOT',     	   '#,##0.#');
	
	}else if(selected_type=="3"){
		
		GridObj.AddHeader("SALES_CAT01"		,"Ç°¸ñÄÚµå"    	 ,"t_text" 	    		,100	,90   ,false); // ´ëºÐ·ù // 
		GridObj.AddHeader("CD_NAME"			,"Ç°¸ñ¸í"    	 	 ,"t_text" 	    		,100    ,160  ,false);
		GridObj.AddHeader("GUBN"			,"±¸ºÐ"       	 ,"t_text" 	    		,100	,75   ,false);		
		GridObj.AddHeader("MTS_AN_QTY"	    ,"3SforU(¾È¾ç)"  ,"t_number" 			,100.3	,100  ,false);
		GridObj.AddHeader("AS_QTY"	    	,"¾È¼º"  		,"t_number" 			,100.3	,70  ,false);		    
		GridObj.AddHeader("MTS_PO_QTY"	    ,"3SforU(Æ÷½Â)"  ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("WINE_QTY"	    ,"¿ÍÀÎ³ª¶ó"       ,"t_number" 			,100.3	,100  ,false); 
	  	GridObj.AddHeader("DY_QTY"	        ,"µ¿¾ç¹°·ù"       ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("MIRE_QTY"	    ,"¹Ì·¡»ó»ç"       ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("TK_QTY"	        ,"´ë±¸°æºÏ´É±Ý"    ,"t_number" 			,100.3	,100  ,false);
	  	GridObj.AddHeader("HS_QTY"	        ,"ÇÑ¼Ö"         	 ,"t_number" 			,100.3	,70   ,false);
	 	GridObj.AddHeader("TOT"			    ,"°è"       		 ,"t_number" 			,100.3	,120  ,false);   
	
	    /* ÀÌÁß ÇØ´õ Ãß°¡ */
		GridObj.AddGroup("HD1",    "ÀÛ¾÷Àåº°");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
		GridObj.AppendHeader("HD1",   "MTS_AN_QTY");
		GridObj.AppendHeader("HD1",		  "AS_QTY");
		GridObj.AppendHeader("HD1",   "MTS_PO_QTY");
		GridObj.AppendHeader("HD1",     "WINE_QTY");
		GridObj.AppendHeader("HD1",       "DY_QTY");
		GridObj.AppendHeader("HD1",     "MIRE_QTY");
		GridObj.AppendHeader("HD1",       "TK_QTY");
		GridObj.AppendHeader("HD1",       "HS_QTY");	
		
		GridObj.BoundHeader();	
		     
	    GridObj.SetColCellAlign('SALES_CAT01',	  'left'); 
	    GridObj.SetColCellAlign('CD_NAME',		  'left');
	    GridObj.SetColCellAlign('GUBN',			'center');
	    GridObj.SetColCellAlign('MTS_AN_QTY',	 'right');
		GridObj.SetColCellAlign('AS_QTY',	 	 'right');
	    GridObj.SetColCellAlign('MTS_PO_QTY',	 'right');
	    GridObj.SetColCellAlign('WINE_QTY',	     'right');
	    GridObj.SetColCellAlign('DY_QTY',	     'right');
	    GridObj.SetColCellAlign('MIRE_QTY',	     'right');
	    GridObj.SetColCellAlign('TK_QTY',	     'right');
	    GridObj.SetColCellAlign('HS_QTY',	     'right');
	    GridObj.SetColCellAlign('TOT',	   	     'right');
	    
		GridObj.SetNumberFormat('MTS_AN_QTY',  '#,##0.#');
		GridObj.SetNumberFormat('AS_QTY',	   '#,##0.#');
		GridObj.SetNumberFormat('MTS_PO_QTY',  '#,##0.#');
		GridObj.SetNumberFormat('WINE_QTY',    '#,##0.#');
		GridObj.SetNumberFormat('DY_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('MIRE_QTY',    '#,##0.#');
		GridObj.SetNumberFormat('TK_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('HS_QTY',      '#,##0.#');
		GridObj.SetNumberFormat('TOT',     	   '#,##0.#');
	
	}else{
				GridObj.AddHeader("ITEM_ID"			,"Ç°¸ñÄÚµå"    	 ,"t_text" 	    		,100	,75   ,false); 
				GridObj.AddHeader("ITEM_NAME"		,"Ç°¸ñ¸í"    	 	,"t_text" 	    		,100    ,190  ,false);
				GridObj.AddHeader("SPEC"			,"±Ô°Ý"       	,"t_text" 	    		,100	,110  ,false);
				GridObj.AddHeader("GUBN"			,"±¸ºÐ"       	,"t_text" 	    		,100	,75   ,false);				
				GridObj.AddHeader("MTS_AN_QTY"	    ,"3SforU(¾È¾ç)" ,"t_number" 				,100.3	,100  ,false);    
				GridObj.AddHeader("AS_QTY"	    	,"¾È¼º"  		,"t_number" 			,100.3	,70   ,false);
				GridObj.AddHeader("MTS_PO_QTY"	    ,"3SforU(Æ÷½Â)" ,"t_number" 				,100.3	,100  ,false);
			  	GridObj.AddHeader("WINE_QTY"	    ,"¿ÍÀÎ³ª¶ó"      ,"t_number" 				,100.3	,95   ,false); 
			  	GridObj.AddHeader("DY_QTY"	        ,"µ¿¾ç¹°·ù"      ,"t_number" 				,100.3	,95   ,false);
			  	GridObj.AddHeader("MIRE_QTY"	    ,"¹Ì·¡»ó»ç"      ,"t_number" 				,100.3	,95   ,false);
			  	GridObj.AddHeader("TK_QTY"	        ,"´ë±¸°æºÏ´É±Ý"   ,"t_number" 				,100.3	,95   ,false);
			  	GridObj.AddHeader("HS_QTY"	        ,"ÇÑ¼Ö"         	,"t_number" 			,100.3	,70   ,false);
			 	GridObj.AddHeader("TOT"			    ,"°è"       		,"t_number" 			,100.3	,90   ,false); 
				
				 /* ÀÌÁß ÇØ´õ Ãß°¡ */
				GridObj.AddGroup("HD1",    "ÀÛ¾÷Àåº°");			//±×¸®µå¿¡ ±×·ìÀ» µî·ÏÇÑ´Ù. 
				GridObj.AppendHeader("HD1",   "MTS_AN_QTY");
				GridObj.AppendHeader("HD1",		  "AS_QTY");
				GridObj.AppendHeader("HD1",   "MTS_PO_QTY");
				GridObj.AppendHeader("HD1",     "WINE_QTY");
				GridObj.AppendHeader("HD1",       "DY_QTY");
				GridObj.AppendHeader("HD1",     "MIRE_QTY");
				GridObj.AppendHeader("HD1",       "TK_QTY");
				GridObj.AppendHeader("HD1",       "HS_QTY");	
				
				GridObj.BoundHeader();	
				
			    GridObj.SetColCellAlign('ITEM_ID',		  'left'); 
			    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
			    GridObj.SetColCellAlign('SPEC',			'center');
			    GridObj.SetColCellAlign('GUBN',			'center');
			    GridObj.SetColCellAlign('MTS_AN_QTY',	 'right');
			    GridObj.SetColCellAlign('AS_QTY',		 'right');
			    GridObj.SetColCellAlign('MTS_PO_QTY',	 'right');
			    GridObj.SetColCellAlign('WINE_QTY',	     'right');
			    GridObj.SetColCellAlign('DY_QTY',	     'right');
			    GridObj.SetColCellAlign('MIRE_QTY',	     'right');
			    GridObj.SetColCellAlign('TK_QTY',	     'right');
			    GridObj.SetColCellAlign('HS_QTY',	     'right');
			    GridObj.SetColCellAlign('TOT',	   	     'right');
			    
				GridObj.SetNumberFormat('MTS_AN_QTY',  '#,##0.#');
				GridObj.SetNumberFormat('AS_QTY',	   '#,##0.#');
				GridObj.SetNumberFormat('MTS_PO_QTY',  '#,##0.#');
				GridObj.SetNumberFormat('WINE_QTY',    '#,##0.#');
				GridObj.SetNumberFormat('DY_QTY',      '#,##0.#');
				GridObj.SetNumberFormat('MIRE_QTY',    '#,##0.#');
				GridObj.SetNumberFormat('TK_QTY',      '#,##0.#');
				GridObj.SetNumberFormat('HS_QTY',      '#,##0.#');
				GridObj.SetNumberFormat('TOT',     	   '#,##0.#');		
			
	}
   
}
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
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
  
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
	GridObj.SetParam("mode", "save");
	// user_id
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
       var in_fr_date     = document.all.in_fr_date.value;
	   var in_to_date     = document.all.in_to_date.value;
       var checked_uom 	  = document.frm.in_checked_uom.value;
       
       in_fr_date 		  = in_fr_date.replace(/-/g,"");
       in_to_date 		  = in_to_date.replace(/-/g,"");
       
       
       var selected_type  = document.all.selected_type.value;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", 	  	 in_fr_date);
       GridObj.SetParam("in_to_date", 	  	 in_to_date);
       GridObj.SetParam("selected_type",  selected_type);
       GridObj.SetParam("checked_uom",  	checked_uom);
       
       GridObj.DoQuery(servlet_url);
   } 
   
   /*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery2() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       var checked_uom 	  = document.frm.in_checked_uom.value;
       var in_fr_date     = document.all.in_fr_date.value;
       var in_to_date     = document.all.in_to_date.value;
       in_fr_date 		  = in_fr_date.replace(/-/g,"");
       in_to_date 		  = in_to_date.replace(/-/g,"");
       
       var selected_type  = document.all.selected_type.value;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search2");
       GridObj.SetParam("in_fr_date", 	  	 in_fr_date);
       GridObj.SetParam("in_to_date", 	  	 in_to_date);
       GridObj.SetParam("selected_type",  selected_type);
       GridObj.SetParam("checked_uom",  	checked_uom);
       GridObj.DoQuery(servlet_url);
   } 

 /*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery3() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var checked_uom 	  = document.frm.in_checked_uom.value;
       var in_fr_date     = document.all.in_fr_date.value;
       var in_to_date     = document.all.in_to_date.value;
              
       in_fr_date 		  = in_fr_date.replace(/-/g,"");
       in_to_date 		  = in_to_date.replace(/-/g,"");
       var selected_type  = document.all.selected_type.value;       

       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search3");
       GridObj.SetParam("in_fr_date", 	  	 in_fr_date);
       GridObj.SetParam("in_to_date", 	  	 in_to_date);
       GridObj.SetParam("selected_type",  selected_type);
       GridObj.SetParam("checked_uom",  	checked_uom);
       GridObj.DoQuery(servlet_url);
   } 
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
    function GridEndQuery() 
    {
        var endMode			= GridObj.GetParam("mode");
        var error_msg		= '';
        var selected_type	= document.all.selected_type.value;  
        var checked_uom 	= document.frm.checked_uom.value;  
        
        if(endMode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
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
					if(GridObj.GetCellValue('GUBN',i) == "Â÷ÀÌ"){
						GridObj.SetCellBgColor('GUBN',			i, 	color_edit_col);
						GridObj.SetCellBgColor('MTS_AN_QTY',	i,	color_edit_col);
						GridObj.SetCellBgColor('AS_QTY',		i,	color_edit_col);
						GridObj.SetCellBgColor('MTS_PO_QTY',  	i,	color_edit_col);
						GridObj.SetCellBgColor('WINE_QTY', 	  	i, 	color_edit_col);
						GridObj.SetCellBgColor('DY_QTY',      	i, 	color_edit_col);
						GridObj.SetCellBgColor('MIRE_QTY',    	i, 	color_edit_col);
						GridObj.SetCellBgColor('TK_QTY',      	i, 	color_edit_col);
						GridObj.SetCellBgColor('HS_QTY',      	i, 	color_edit_col);
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

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
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
        
        // È­¸é size Ãà¼Ò ½Ã È­¸éÀÌ ³Ê¹« ÀÛ¾Æ ±×¸®µå Å©±â°¡ À½¼ö°¡ µÇ¸é ¿¡·¯°¡ ³ª¹Ç·Î ±× °æ¿ì ¹«Á¶°Ç 1·Î ¼¼ÆÃ 
        // ==> È­¸éÀÌ ´õÀÌ»ó Ãà¼ÒµÇÁö ¾ÊÀ½ 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }