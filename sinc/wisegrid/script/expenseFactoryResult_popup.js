//############################################################
//## ÇÁ·Î±×·¥ID      : expenseFactoryResult_list.vm
//## ÇÁ·Î±×·¥¸í      : ºñ¿ë±â¹Ý °øÀåÇÒ´ç°á°ú Á¶È¸ UI È­¸é
//## °³¹ßÀÚ          : ¹Ú¿ë¼ö
//## °³¹ßÀÏÀÚ        : 
//##
//## °ü·Ã job file   : job_sc_16010_dailyWorkTotalization_list.xml
//## °ü·Ã query file : query_sc_16010_dailyWorkTotalization_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             Àü¿ª º¯¼ö            ----------------------------------------------//



/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢°¢ ¹öÆ°ÀÇ JOB_ID¸¦ ¼³Á¤.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/    
    var job_id  = 'expenseFactoryResult_popup'; //¸Þ´º ÃÖ°í Å¬¸¯½Ã JOB_ID
    
    //document.cookie = "webfxtab_tabPane1=1";    
    
    

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid ¿ÀºêÁ§Æ®°¡ »ý¼ºµÇ°í ÃÊ±âÈ­µÈ ÈÄ ¹ß»ýÇÔ. 
  ¦¢JavaScript EventÀÎ Initialize()¸¦ ¹Þ¾Æ ±×¸®µåÀÇ Çì´õ¸¦ ¼ÂÆÃÇÑ´Ù.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function init() {
       setProperty(GridObj);//WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
       setHeader(GridObj);  //ÇØ´õ»ý¼º 
   }


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢¹öÆ° Å¬¸¯¿¡ µû¸¥ ÇÔ¼ö È£Ãâ
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/   
   function btn_div(btn){
   	//alert(btn+"¹öÆ°Å¬¸¯!");
   	
   	B_Value = btn;
   	
   	if(btn == "A"){
   		setHeader(GridObj);
   	}
   	if(btn == "B"){
   		setHeader(GridObj);
   	}
   	if(btn == "C"){
   		setHeader(GridObj);
   	}
   	if(btn == "D"){
   		setHeader(GridObj);
   	}
   	
   }


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢¹öÆ° È°¼ºÈ­ ºñÈ°¼ºÈ­ Á¦¾î.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/      
	function display(str){
	    var form = document.all;
	    if(str=="A"){
	        form.btn1.disabled  = true;
	        form.btn2.disabled  = false;
	        form.btn3.disabled  = false;
	        form.btn4.disabled  = false;
	    }if(str=="B"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = true;
             form.btn3.disabled  = false;
             form.btn4.disabled  = false;
	    }
	    if(str=="C"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = false;
             form.btn3.disabled  = true;
             form.btn4.disabled  = false;
	    }
	    if(str=="D"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = false;
             form.btn3.disabled  = false;
             form.btn4.disabled  = true;
	    }
    }
   
   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é ±âº» ¼³Á¤ ºÎºÐ.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function setDefault()
   { 
		
   }
       
       
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õ»ý¼º
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   
   function setHeader(GridObj) 
   {
   	
   		//¸Þ´ºÅ¬¸¯½Ã ±âº»À¸·Î Å¸´Â °÷.
   		if(B_Value == "Z"){
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader);
   		}   	
		//¹öÆ°¿¡ Å¬¸¯¿¡ µû¸¥ Çì´õ »ý¼º È£Ãâ!   	
   	    if(B_Value == "A"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id1 , "gird_header_list",defaultHeader);
   	    }
   	    if(B_Value == "B"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id2 , "gird_header_list",defaultHeader);
   	    }
   	    if(B_Value == "C"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id3 , "gird_header_list",defaultHeader);
   	    }   	    
   	    if(B_Value == "D"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id4 , "gird_header_list",defaultHeader);
   	    }  
   }




/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DB¿¡ µî·ÏµÈ È­¸é ÇØ´õ Á¤º¸¸¦ °¡Á®¿Â´Ù.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/

   function defaultHeader(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //ÀüÃ¼ Row¸¸Å­ ¹Ýº¹ ÇÑ´Ù.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])        
       }
       
         //ÇØ´õ ±×·ì»ý¼º
//       GridObj.AddGroup("GR_REASON","º¸Á¤");  //³¯Â¥ ±×·ì
//       GridObj.AppendHeader("GR_REASON","R01_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_COUNT");
//       GridObj.AppendHeader("GR_REASON","R02_PERCENT");

	   //alert("GRidObj.....¹Ù¿îµå Àü!");
	   GridObj.BoundHeader();

         //Hidden ÄÃ·³
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery();
   }






             
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'Á¶È¸'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSearch(service) 
   {
       doQuery();
   }
  
  
  
  
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢È­¸é¿¡ 'ÀúÀå'¸¦ ´©¸£¸é È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function GoSave  (service)
   {
   }
      


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¼¿ ¿øÅ¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
    function GridCellClick(strColumnKey, nRow){
		//alert(strColumnKey+''+nRow);
    }
    
    
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¼¿ ´õºíÅ¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
    function GridCellDblClick(strColumnKey, nRow){
    	if(B_Value == "A"){
    		
    	}
    	else if(B_Value == "B"){
    		
    	}
    	else if(B_Value == "C"){
    		//±×¸®µåÀÇ ÇØ´ç ·Î¿ì ´õºíÅ¬¸¯½Ã item_id ÄÃ·³°ú dcpath5 ÄÃ·³ÀÇ ¼¿ °ªÀ» ÆÄ¶ó¹ÌÅÍ·Î ³Ñ±è.
    		//´Ü, dcpath5 ÄÃ·³ÀÇ ¼¿°ªÀÌ nullÀÏ °æ¿ì¿¡´Â dcpath4 ÄÃ·³ÀÇ ¼¿°ªÀ» ÆÄ¶ó¹ÌÅÍ·Î ³Ñ±è.
    		
    		//alert("¼¿ ´õºíÅ¬¸¯!!");
    		s_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("s_item_id : "+s_item_id);
    		
    		s_dcpath5_4 = GridObj.GetCellValue('dcpath5_cd',nRow);
    		//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		
    		if(s_dcpath5_4 == " "){
    			s_dcpath5_4 = GridObj.GetCellValue('dcpath4_cd',nRow);
    			//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		}
    		//alert("¼¿ ´õºíÅ¬¸¯ ³¡!");
    		
    		//´õºíÅ¬¸¯½Ã ÆÄ¶ó¹ÌÅÍ¸¦ °¡Áö°í¼­ È­¸éÀüÈ¯À» ÇÏ±âÀ§ÇÑ ¼³Á¤µé.
    		B_Value = "D";
    		display(B_Value);
			setHeader(GridObj);
    	}
    	else if(B_Value == "D"){
    		//±×¸®µåÀÇ ÇØ´ç ·Î¿ì ´õºíÅ¬¸¯½Ã item_id ÄÃ·³°ú tgt_loc ÄÃ·³ÀÇ ¼¿ °ªÀ» ÆÄ¶ó¹ÌÅÍ·Î ³Ñ±è.
    		
    		//alert("D ¼¿ ´õºíÅ¬¸¯!!");
    		st_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("st_item_id : "+st_item_id);
    		
    		st_tgt_loc = GridObj.GetCellValue('tgt_loc',nRow);
    		//alert("st_tgt_loc : "+st_tgt_loc);
    		
    		popup(st_item_id, st_tgt_loc);
    	}

    	
    }  

   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function doQuery() 
   {
   	   //¸Þ´º Å¬¸¯½Ã ±âº» ½ÇÇà
       if(B_Value == "Z"){
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       }
       
       //¹öÆ°¿¡ µû¶ó JOB ID º¯°æ.
       if(B_Value == "A"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1;
       }
       if(B_Value == "B"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id2;
       }
       if(B_Value == "C"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id3;
       }
       if(B_Value == "D"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id4;
       }
       
       //var version = document.all.version.value;
       //var res_code = document.all.res_code.value;
       
       
       //ºÎ¸ð ÇÁ·¹ÀÓ¿¡¼­ ¹Þ¾Æ¿Â ÆÄ¶ó¹ÌÅÍ¸¦ ÆË¾÷Ã¢¿¡¼­ »ç¿ë.
       var p_st_item_id = opener.document.all.st_item_id.value;
       var p_st_tgt_loc = opener.document.all.st_tgt_loc.value;
       
       //alert("p_st_item_id : "+p_st_item_id);
       //alert("p_st_tgt_loc : "+p_st_tgt_loc);
       
       
       
       //alert("version : "+ version);
       //alert("res_code : "+res_code);

       //var startDate = document.all.start_date.value;
       //var endDate   = document.all.end_date.value;
       //var plant_id  = document.all.selected_plant.value;
       
       //³Ñ°ÜÁÙ °ªµéÀ»¸¸µç´Ù.( ÆÄ¶ó¹ÌÅÍ Á¤ÀÇ ºÎºÐ )
       GridObj.SetParam("mode", "search");
       //GridObj.SetParam("version", version);
       //GridObj.SetParam("res_code", res_code);
       
       GridObj.SetParam("s_item_id", s_item_id);
       GridObj.SetParam("s_dcpath5_4", s_dcpath5_4);
       
       //ºÎ¸ð ÇÁ·¹ÀÓ¿¡¼­ ¹Þ¾Æ¿Â ÆÄ¶ó¹ÌÅÍ¸¦ ÆË¾÷Ã¢¿¡¼­ »ç¿ë.
       GridObj.SetParam("p_st_item_id", p_st_item_id);
       GridObj.SetParam("p_st_tgt_loc", p_st_tgt_loc);              
              
       //GridObj.SetParam("startDate", startDate);
       //GridObj.SetParam("endDate", endDate);
       //GridObj.SetParam("plant_id", plant_id);
       GridObj.DoQuery(servlet_url);
   }

   
   

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
    function GridEndQuery() 
    {
        var mode = GridObj.GetParam("mode");
        var error_msg = '';
          
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
        {
            if(GridObj.GetStatus() == "true") 
            {
            	//A¹öÆ° Å¬¸¯½Ã ½ÇÇàµÇ´Â GridEndQuery
            	if(B_Value == "A"){
            		//µ¥ÀÌÅÍ¸¦ ±×·ìÇÎ ÇÑ´Ù.
	                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                //¼¿ÀÇ Á¤·ÄÀ» ¼³Á¤
	                GridObj.SetColCellAlign('cat06','center')
	                GridObj.SetColCellAlign('cat06_name','left')
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('item_name','left')
	                GridObj.SetColCellAlign('spec','left')
	                GridObj.SetColCellAlign('gubun','center')
	                GridObj.SetColCellAlign('anyang','right')
	                GridObj.SetColCellAlign('anseong','right')
	                GridObj.SetColCellAlign('anseong_u','right')
	                GridObj.SetColCellAlign('asan','right')
	                GridObj.SetColCellAlign('gumi','right')
	                GridObj.SetColCellAlign('busan','right')
	                GridObj.SetColCellAlign('noksan','right')
	                GridObj.SetColCellAlign('total','right')
            	}
            	//B¹öÆ° Å¬¸¯½Ã ½ÇÇàµÇ´Â GridEndQuery
            	if(B_Value == "B"){
            		//µ¥ÀÌÅÍ¸¦ ±×·ìÇÎ ÇÑ´Ù.
	                GridObj.SetGroupMerge("item_id,item_name");
	                
	                //¼¿ÀÇ Á¤·ÄÀ» ¼³Á¤
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('item_name','left')
	                GridObj.SetColCellAlign('spec','left')
	                GridObj.SetColCellAlign('plant_id','left')
	                GridObj.SetColCellAlign('plant_name','left')
	                GridObj.SetColCellAlign('real_fix_cost','right')
	                GridObj.SetColCellAlign('real_chg_cost','right')
	                GridObj.SetColCellAlign('qty_by_rate','right')
	                GridObj.SetColCellAlign('plant_ratio_by_rate','right')
	                GridObj.SetColCellAlign('qty_by_cost','right')
	                GridObj.SetColCellAlign('plant_ratio_by_cost','right')
	                GridObj.SetColCellAlign('item_qty_gap','center')
            	}
            	//C¹öÆ° Å¬¸¯½Ã ½ÇÇàµÇ´Â GridEndQuery
            	if(B_Value == "C"){
            		//µ¥ÀÌÅÍ¸¦ ±×·ìÇÎ ÇÑ´Ù.
	                //GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                //¼¿ÀÇ Á¤·ÄÀ» ¼³Á¤
	                GridObj.SetColCellAlign('cat06','left')
	                GridObj.SetColCellAlign('cat06_name','left')
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('item_name','left')
	                GridObj.SetColCellAlign('spec','left')
	                GridObj.SetColCellAlign('dcpath1','left')
	                GridObj.SetColCellAlign('dcpath2','left')
	                GridObj.SetColCellAlign('dcpath3','left')
	                GridObj.SetColCellAlign('dcpath4','left')
	                GridObj.SetColCellAlign('dcpath5','left')
	                GridObj.SetColCellAlign('qty','right')
	                GridObj.SetColCellAlign('box_amt','right')
	                GridObj.SetColCellAlign('total_amt','right')
	                GridObj.SetColCellAlign('dcpath4_cd','left')
	                GridObj.SetColCellAlign('dcpath5_cd','left')
	                
	                //·Î¿ì ¼¿·ºÅÍ È°¼ºÈ­
	                //GridObj.bRowSelectorVisible = true;
            	}
            	//D¹öÆ° Å¬¸¯½Ã ½ÇÇàµÇ´Â GridEndQuery
            	if(B_Value == "D"){
            		
	                //¼¿ÀÇ Á¤·ÄÀ» ¼³Á¤
	                GridObj.SetColCellAlign('dc_type','left')
	                GridObj.SetColCellAlign('rdc','left')
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('res_id','left')
	                GridObj.SetColCellAlign('pre_dctype','left')
	                GridObj.SetColCellAlign('pre_dc','left')
	                GridObj.SetColCellAlign('qty','left')
	                GridObj.SetColCellAlign('src_loc','left')
	                GridObj.SetColCellAlign('src_loc_name','left')
	                GridObj.SetColCellAlign('tgt_loc','left')
	                GridObj.SetColCellAlign('tgt_loc_name','left')
	                GridObj.SetColCellAlign('cost_amt','right')
	                GridObj.SetColCellAlign('box_per_palet','right')            		
            	}
            	
            	//¸Þ´º Å¬¸¯½Ã ±âº» ½ÇÇà. ÆË¾÷Ã¢ ±âº» Çì´õ »ý¼º!
            	if(B_Value == "Z"){
                //µ¥ÀÌÅÍ¸¦ ±×·ìÇÎ ÇÑ´Ù.
                //GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
                //¼¿ÀÇ Á¤·ÄÀ» ¼³Á¤
                GridObj.SetColCellAlign('item_id','left')
                GridObj.SetColCellAlign('item_name','left')
                GridObj.SetColCellAlign('spec','left')
                GridObj.SetColCellAlign('src_loc','left')
                GridObj.SetColCellAlign('tgt_loc','left')
                GridObj.SetColCellAlign('src_loc_name','left')
                GridObj.SetColCellAlign('tgt_loc_name','left')
                GridObj.SetColCellAlign('cost','right')
                GridObj.SetColCellAlign('trans_cost','right')
                GridObj.SetColCellAlign('real_cost','right')
                
                //GridObj.SetNumberFormat("late_day", "#,##0.00");
				GridObj.SetNumberFormat("cost", "#,###");// # ÀÌ¸é °ªÀÌ nullÀÌ¸é Ãâ·ÂÀÌ ¾ÈµÊ, 0 ÀÌ¸é °ªÀÌ nullÀÌ¾îµµ Ãâ·Â!
 				GridObj.SetNumberFormat("trans_cost", "#,###");// # ÀÌ¸é °ªÀÌ nullÀÌ¸é Ãâ·ÂÀÌ ¾ÈµÊ, 0 ÀÌ¸é °ªÀÌ nullÀÌ¾îµµ Ãâ·Â!
 				GridObj.SetNumberFormat("real_cost", "#,###");// # ÀÌ¸é °ªÀÌ nullÀÌ¸é Ãâ·ÂÀÌ ¾ÈµÊ, 0 ÀÌ¸é °ªÀÌ nullÀÌ¾îµµ Ãâ·Â!
                
            	}                                     
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
        }
    }
    
    
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Á¶È¸ ¹öÆ° Å¬¸¯½Ã ½ÇÇà.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
GoSearch = function() {

	// Á¶È¸½Ã WAITING ÀÌ¹ÌÁö º¸¿©ÁÖ±â
	viewWait();
	
	//alert("hllo");
	doQuery();
};



   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ µ¥ÀÌÅÍ°¡ º¯°æ µÇ¾úÀ» °æ¿ì Ã³¸®µÇ´Â Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   
//   function GridChangeCell(strColumnKey, nRow) 
//   {
       /*
       if(strColumnKey != "SELECTED") {
           //??? ? SELECTED ?? ??? ??? ?? ???. 
           GridObj.SetCellValue("SELECTED", nRow, "1");
       }
       */
 //  }    
    

   
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢EXCEL
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

   

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢getdatetime
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function getdatetime() {
       var today = new Date();
       var year = today.getYear();
       var month = today.getMonth() + 1;
       var day = today.getDate();
       
       if(month < 10)
           month = "0" + month;
           
       if(day < 10)
           day = "0" + day;
   
       document.frm.to_date.value = year + "" + month + "" + day;
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
        
        /*
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue += Number(search_h); 
            tableHeightValue += Number(search_h); 
        }
        */ 
        
        // È­¸é size Ãà¼Ò ½Ã È­¸éÀÌ ³Ê¹« ÀÛ¾Æ ±×¸®µå Å©±â°¡ À½¼ö°¡ µÇ¸é ¿¡·¯°¡ ³ª¹Ç·Î ±× °æ¿ì ¹«Á¶°Ç 1·Î ¼¼ÆÃ 
        // ==> È­¸éÀÌ ´õÀÌ»ó Ãà¼ÒµÇÁö ¾ÊÀ½ 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = tableHeightValue + "px"; 
//        document.WiseGrid2.height = tableHeightValue + "px"; 
        
    }  
           


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢MOUSE OVER ½Ã, ROW »ö»ó º¯È¯
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridMouseOver(strType, strColumnKey, nRow){
	
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
	if(B_Value == "C"){
		// Çì´õ´Â µ¿ÀÛ¾øÀ½
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '230|230|230');		
	}
	if(B_Value == "D"){
		// Çì´õ´Â µ¿ÀÛ¾øÀ½
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '230|230|230');
	}

	 
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢MOUSE OUT ½Ã, ROW »ö»ó º¹±¸
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridMouseOut(strType, strColumnKey, nRow){
	
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
	if(B_Value == "C"){	
	
		// Çì´õ´Â µ¿ÀÛ¾øÀ½
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '255|255|255');
	}
	if(B_Value == "D"){
		
		// Çì´õ´Â µ¿ÀÛ¾øÀ½
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '255|255|255');		
		
	}
}




/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÆË¾÷ ¶Ù¿ì°Ô ÇÏ±â!!
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function popup(str1, str2){
//	var plant_id   = document.frm.selected_plant.value ;
//    var sdate = document.frm.sdate.value;
//    var edate = document.frm.edate.value;
    
//    document.frm.weekCnt.value = weekCnt;

	alert("str1 : "+str1);
	alert("str2 : "+str2);
 
    var paramString  = "";
        paramString  = "&st_item_id=" + str1;
        paramString += "&st_tgt_loc=" + str2;
        
//    paramString = "&plant_id=" + plant_id;
//    paramString+= "&sdate="    + sdate;
//    paramString+= "&edate="    + edate;
//    paramString+= "&weekCnt="  + weekCnt;
       
    
    var fileName = "expenseFactoryResult_popup";
    var service_url = "service.do?_moon_service="+fileName+"&_moon_perpage=200&_moon_pagenumber=1" + paramString;
    //var newWin = window.showModalDialog(service_url, self, "dialogLeft:0px; dialogTop:0px; dialogWidth:800px; dialogHeight:480px ; dialogScrollbars=no");
    
    var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1000, height=400, top=0, left=0";
	var newWin = window.open(service_url, "expenseFactoryResult_popup", pop_win_style);
	newWin.focus();
    
//    if(newWin == -1)
//    {
//        GoSearch('xx');
//    }
}

























// Á¦Ç° °Ë»ö POPUP
function openDCAllocationItemPopup( obj ) { 	
	
	var	in_work_date = delDateDelimiter(document.frm.in_work_date.value); 	//ÀÛ¾÷ÀÏÀÚ		
	var	in_date_term = "3"; 					//Á¶È¸±â°£	
	var	in_term_cnt	 = "0"; 												//Á¶È¸ÀÏÀÚ	

	if( in_work_date == "" || in_work_date == null ) {
		alert("ÀÛ¾÷ÀÏÀÚ¸¦ ÀÔ·ÂÇÏ½Ê½Ã¿ä!");
		document.frm.in_work_date.focus();
		return;
	} 

	var service_url = "service.do?_moon_service=ip_02030_dcAllocationItem_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_work_date=" + in_work_date +"&in_date_term=" + in_date_term+"&in_term_cnt=" + in_term_cnt;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Item_Search", pop_win_style);
	newWin.focus();

}

// Á¶È¸ ½Ã waiting ÀÌ¹ÌÁö º¸¿©ÁÖ±â
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}

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
				document.frm.in_alloc_item_name.value = arrList[0][1];
				document.frm.item_name.value = arrList[0][1];
				document.frm.in_alloc_reason_comment.value = "";
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

// enter check ¿ë 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// ÀÚ±âÈ­¸é °»½Å
	//		GoSearch();
		}
	} 
}





// Á¶È¸
/*
GoEdit = function() {

	var in_work_date = document.frm.in_work_date.value;
	var in_alloc_item = document.frm.in_alloc_item.value;
	var in_alloc_item_name = document.frm.in_alloc_item_name.value;

	var urlStr = "service.do?_moon_service=ip_02040_SalesAllocation_mod";
	urlStr += "&in_work_date=" + in_work_date + "&in_alloc_item=" + in_alloc_item + "&item_name=" + in_alloc_item_name;

	// Á¶È¸½Ã WAITING ÀÌ¹ÌÁö º¸¿©ÁÖ±â
	viewWait();

	location.href = urlStr;
	
};
*/

// Á¶È¸ ½Ã waiting ÀÌ¹ÌÁö º¸¿©ÁÖ±â
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			gridArea2.style.display = "none";
			waitArea.style.display = "block";
			waitArea2.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			gridArea2.style.display = "block";
			waitArea.style.display = "none";
			waitArea2.style.display = "none";
		}
	}
	
}



