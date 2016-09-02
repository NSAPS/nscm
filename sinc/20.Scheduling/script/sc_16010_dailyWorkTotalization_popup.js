//############################################################
//## ÇÁ·Î±×·¥ID      : sc_16010_dailyWorkTotalization_list.vm
//## ÇÁ·Î±×·¥¸í      : ÀÏ°£»ý»ê°èÈ¹ ÀÏº° ±Ù¹« Áý°è
//## °³¹ßÀÚ          : Á¤Àç±³
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

var mode = '';
var hRowCount = 0; //¹Ýº¹ÀûÀ¸·Î »ý¼ºµÇ´Â ÇØ´õÀÇ Count °ª.
var class_path = "com.wisegrid.admin.";						// ¼­ºí¸´ ÆÐÅ°Áö(class ÆÄÀÏ °æ·Î)
var job_id = 'sc_16010_dailyWorkTotalization_popup';

var GridObj;

var GridHeaderString = "";

var color01 = '188|210|238'; // ¿¬Àå ¹è°æ»ö
var color02 = '238|180|180'; // ÈÞµ¿ ¹è°æ»ö

var weekCnt = 1;

/******************************************          Action Function         **********************************************/

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
	//doSave();
}
 

/*******************************************   WiseGrid ÃÊ±âÈ­ ¹× ¼³Á¤  *****************************************************/

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢WiseGrid ¿ÀºêÁ§Æ®°¡ »ý¼ºµÇ°í ÃÊ±âÈ­µÈ ÈÄ ¹ß»ýÇÏ´Â 
  ¦¢JavaScript EventÀÎ Initialize()¸¦ ¹Þ¾Æ ±×¸®µåÀÇ Çì´õ¸¦ ¼ÂÆÃÇÑ´Ù.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); //WiseGrid Default¼³Á¤ ºÎºÐ (WiseGrid_Property.jsÆÄÀÏ ³»¿¡ ¼±¾ðµÇ¾î ÀÖ´Ù.)
    //setDefault();        //È­¸é ±âº» ¼³Á¤ 
    setHeader();  //ÇØ´õ»ý¼º 
    
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
function setHeader() 
{      
    var plant_id = opener.document.frm.selected_plant.value;
    commonUtil.getCodeList("plant_id", plant_id , "daily_header3",defaultHeader); 
}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢DB¿¡ µî·ÏµÈ È­¸é ÇØ´õ Á¤º¸¸¦ °¡Á®¿Â´Ù.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function defaultHeader(result){
	
    var arrHeader = '';
    var len = result.length;
    var plant_id = opener.document.frm.selected_plant.value;
    
	GridObj.AddHeader("WEEK" , "ÁÖÂ÷" , "t_text" , 8 , 55 , false);	
	
	// Çì´õ »ý¼º
    for( var i=0 ;i<len ;i++) //ÀüÃ¼ Row¸¸Å­ ¹Ýº¹ ÇÑ´Ù.
    {
        arrHeader = result[i].split('!%!');
        GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
    }
    commonUtil.getCodeList("plant_id", plant_id , "daily_header3_name",headerResult);  
}


/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÇØ´õÀÇ Text Name¸¦ °¡Á®¿Â´Ù.
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
   function headerResult(result)
   {
       var dateArray = ''; //³¯Â¥Row¸¦ '!%!'±âÁØÀ¸·Î ¹è¿­À» ¸¸µé±â À§ÇÑ º¯¼ö.
       var headerCount  = 1;   
       hRowCount = result.length;
       for( var i=0 ;i<result.length ;i++) //ÀüÃ¼ Row¸¸Å­ ¹Ýº¹ ÇÑ´Ù.
       {
            dateArray = '';
            dateArray = result[i].split('!%!'); //'!%!'·Î ±¸ºÐµÈ µ¥ÀÌÅÍ¸¦ splitÇÏ¿© ¹è¿­·Î ÀúÀåÇÑ´Ù.
            //ÇØ´õ ±×·ì»ý¼º
            GridObj.AddGroup("LINE_GRP"+headerCount,dateArray[0]);  //¶óÀÎ ±×·ì
            GridObj.AppendHeader("LINE_GRP"+headerCount,"CNT_SHIFT"+headerCount);
            GridObj.AppendHeader("LINE_GRP"+headerCount,"NORMAL"+headerCount);
            GridObj.AppendHeader("LINE_GRP"+headerCount,"EXTENSION"+headerCount);
            GridObj.AppendHeader("LINE_GRP"+headerCount,"DAY_OFF"+headerCount);
            GridObj.AppendHeader("LINE_GRP"+headerCount,"OFF_DAY_WORK"+headerCount);
            
            headerCount++;
       }
       GridObj.BoundHeader();
       
       GridObj.SetColFix('WEEK');
       
       
       doQuery();
    
   }

/***********************************************   WiseGrid Åë½Å  **********************************************************/

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢Ã¹¹øÂ° ±×¸®µåÀÇ Á¶È¸ Äõ¸®¸¦ È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function doQuery() {
	
	mode = "search";
	
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	var plant_id = opener.document.frm.selected_plant.value;
	var sdate    = opener.document.frm.sdate.value;
	var edate    = opener.document.frm.edate.value;
	var weekCnt  = opener.document.frm.weekCnt.value;     
	
	GridObj.SetParam("mode", mode);
	
	//°øÀå
	GridObj.SetParam("plant_id", plant_id);
	//½ÃÀÛÀÏ
	GridObj.SetParam("sdate", sdate);
	//Á¾·áÀÏ
	GridObj.SetParam("edate", edate);
	//ÁÖÂ÷
	GridObj.SetParam("weekCnt", weekCnt);
	
	//WiseGrid°¡ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÑ
	GridObj.DoQuery(servlet_url);

}

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÀúÀå È£Ãâ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/	
function doSave() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid°¡ ¼­¹ö¿¡ Àü¼ÛÇÒ mode¸¦ ¼ÂÆÃÇÑ´Ù.
	GridObj.SetParam("mode", "save");
    	
    // ÁÖÂ÷
    GridObj.SetParam("weekCnt", weekCnt);
    
    // ½ÃÀÛÀÏ
    GridObj.SetParam("sdate", document.frm.sdate.value);
    	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid°¡ ¼­¹ö¿Í Åë½Å½Ã¿¡ µ¥ÀÌÅÍ¸¦ Àü´ÞÇÑ
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/* INSERT */
function doInsert() {
    
    GridObj.SetParam("mode", "insert");

    GridObj.DoQuery(servlet_url, "SELECTED");
}

/* UPDATE */
function doUpdata() {
	
    GridObj.SetParam("mode", "update");

    GridObj.DoQuery(servlet_url, "SELECTED");
}

/* DELETE */
function doDelete() {
    
    GridObj.SetParam("mode", "delete");

    GridObj.DoQuery(servlet_url, "SELECTED");
}

/*******************************************   WiseGrid Åë½Å ÈÄ  ¼³Á¤  ******************************************************/

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢µ¥ÀÌÅÍ Á¶È¸°¡ Á¤»óÀûÀ¸·Î ¿Ï·áµÇ¸é ¹ß»ýµÇ´Â Event¿¡ ´ëÇÑ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridEndQuery() 
{
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
    
    if(mode == "search") //Á¶È¸°¡ ¿Ï·áµÈ °æ¿ì
    {
        if(GridObj.GetStatus() == "true") 
        {                           
        	                                
            //µ¥ÀÌÅÍ¸¦ ±×·ìÇÎ ÇÑ´Ù.                                                     
	        //GridObj.SetColCellAlign("IDX_QTY" + i,'right');      
	        var rowLeng = GridObj.GetRowCount();	            
	        
	        for(var i=1 ; i<=hRowCount ; i++)
	        {
	            GridObj.SetColCellAlign("CNT_SHIFT" + i,'right');      
	            GridObj.SetColCellAlign("NORMAL" + i,'right');      
	            GridObj.SetColCellAlign("EXTENSION" + i,'right');      
	            GridObj.SetColCellAlign("DAY_OFF" + i,'right');      
	            GridObj.SetColCellAlign("OFF_DAY_WORK" + i,'right');   
	            GridObj.SetColCellBgColor("LINE_DIV" + i,'242|242|242'); 
	            
	            
	            for( var row=0 ;row<rowLeng ;row++) //0ÀÎ°ÍÀº È¸»öÀ¸·Î ÇÑ´Ù.
	            {
    	            if(GridObj.GetCellValue("CNT_SHIFT"+i,row)=='0')
    	                GridObj.SetCellFgColor("CNT_SHIFT"+i, row, '230|230|230');
    
    	            if(GridObj.GetCellValue("NORMAL"+i,row)=='0')
    	                GridObj.SetCellFgColor("NORMAL"+i, row, '230|230|230');
    
    	            if(GridObj.GetCellValue("EXTENSION"+i,row)=='0')
    	                GridObj.SetCellFgColor("EXTENSION"+i, row, '230|230|230');
    	            else 
    	                GridObj.SetCellFontBold("EXTENSION"+i, row, 'true');  

    	            if(GridObj.GetCellValue("DAY_OFF"+i,row)=='0')
    	                GridObj.SetCellFgColor("DAY_OFF"+i, row, '230|230|230');
    	            else 
    	            {
    	                GridObj.SetCellFgColor("DAY_OFF"+i, row, '0|0|255');
    	                //GridObj.SetCellFontBold("DAY_OFF"+i, row, 'true');  
                    }
    
    	            if(GridObj.GetCellValue("OFF_DAY_WORK"+i,row)=='0')
    	                GridObj.SetCellFgColor("OFF_DAY_WORK"+i, row, '230|230|230');
    	            else 
    	                GridObj.SetCellFgColor("OFF_DAY_WORK"+i, row, '255|0|0');
	            }

	        }
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
}


/*********************************************   WiseGrid Event   *********************************************************/

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ µ¥ÀÌÅÍ°¡ º¯°æ µÇ¾úÀ» °æ¿ì Ã³¸®µÇ´Â Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridChangeCell(strColumnKey, nRow) 
{

} 

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ¿ø Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function GridCellClick(strColumnKey, nRow){     

}        

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ ´õºí Å¬¸¯ ÀÌº¥Æ®
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/        
function GridCellDblClickHandler(strColumnKey, nRow){
	
}

/*********************************************   ±âÅ¸ Function   **********************************************************/

/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢±×¸®µåÀÇ »çÀÌÁî Á¶Àý Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/
function setWiseGridAutoResize( tab_h, table_h ){
    
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
 
/*¦£¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¤
  ¦¢ÁÖÂ÷ ¼±ÅÃ Fnc
  ¦¦¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¡¦¥*/	
function onChangeDate(obj){
	alert("!!");
	GridObj.ClearGrid();
	setHeader(GridObj);
	//doQuery();
	//GridObj2.ClearGrid();
	//setHeader2(GridObj2);
	//doQuery2();
}

