//############################################################
//## Щ煎斜極ID      : sc_16010_dailyWorkTotalization_list.vm
//## Щ煎斜極貲      : 橾除儅骯啗�� 橾滌 斬鼠 餵啗
//## 偃嫦濠          : 薑營掖
//## 偃嫦橾濠        : 
//##
//## 婦溼 job file   : job_sc_16010_dailyWorkTotalization_list.xml
//## 婦溼 query file : query_sc_16010_dailyWorkTotalization_list.xml
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

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//

var mode = '';
var hRowCount = 0; //奩犒瞳戲煎 儅撩腎朝 п渦曖 Count 高.
var class_path = "com.wisegrid.admin.";						// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_16010_dailyWorkTotalization_popup';

var GridObj;

var GridHeaderString = "";

var color01 = '188|210|238'; // 翱濰 寡唳儀
var color02 = '238|180|180'; // �瑑� 寡唳儀

var weekCnt = 1;

/******************************************          Action Function         **********************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service) 
{
    doQuery();    
}
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave  (service)
{
	//doSave();
}
 

/*******************************************   WiseGrid 蟾晦�� 塽 撲薑  *****************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); //WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
    //setDefault();        //�飛� 晦獄 撲薑 
    setHeader();  //п渦儅撩 
    
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault()
{
}
       
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader() 
{      
    var plant_id = opener.document.frm.selected_plant.value;
    commonUtil.getCodeList("plant_id", plant_id , "daily_header3",defaultHeader); 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function defaultHeader(result){
	
    var arrHeader = '';
    var len = result.length;
    var plant_id = opener.document.frm.selected_plant.value;
    
	GridObj.AddHeader("WEEK" , "輿離" , "t_text" , 8 , 55 , false);	
	
	// ④渦 儅撩
    for( var i=0 ;i<len ;i++) //瞪羹 Row虜躑 奩犒 и棻.
    {
        arrHeader = result[i].split('!%!');
        GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
    }
    commonUtil.getCodeList("plant_id", plant_id , "daily_header3_name",headerResult);  
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦曖 Text Name蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function headerResult(result)
   {
       var dateArray = ''; //陳瞼Row蒂 '!%!'晦遽戲煎 寡翮擊 虜菟晦 嬪и 滲熱.
       var headerCount  = 1;   
       hRowCount = result.length;
       for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
       {
            dateArray = '';
            dateArray = result[i].split('!%!'); //'!%!'煎 掘碟脹 等檜攪蒂 splitж罹 寡翮煎 盪濰и棻.
            //п渦 斜瑜儅撩
            GridObj.AddGroup("LINE_GRP"+headerCount,dateArray[0]);  //塭檣 斜瑜
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

/***********************************************   WiseGrid 鱔褐  **********************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() {
	
	mode = "search";
	
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	var plant_id = opener.document.frm.selected_plant.value;
	var sdate    = opener.document.frm.sdate.value;
	var edate    = opener.document.frm.edate.value;
	var weekCnt  = opener.document.frm.weekCnt.value;     
	
	GridObj.SetParam("mode", mode);
	
	//奢濰
	GridObj.SetParam("plant_id", plant_id);
	//衛濛橾
	GridObj.SetParam("sdate", sdate);
	//謙猿橾
	GridObj.SetParam("edate", edate);
	//輿離
	GridObj.SetParam("weekCnt", weekCnt);
	
	//WiseGrid陛 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖и
	GridObj.DoQuery(servlet_url);

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛盪濰 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/	
function doSave() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid陛 憮幗縑 瞪歎й mode蒂 撢たи棻.
	GridObj.SetParam("mode", "save");
    	
    // 輿離
    GridObj.SetParam("weekCnt", weekCnt);
    
    // 衛濛橾
    GridObj.SetParam("sdate", document.frm.sdate.value);
    	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid陛 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖и
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

/*******************************************   WiseGrid 鱔褐 ��  撲薑  ******************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() 
{
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
    
    if(mode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {                           
        	                                
            //等檜攪蒂 斜瑜ё и棻.                                                     
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
	            
	            
	            for( var row=0 ;row<rowLeng ;row++) //0檣匙擎 �蜓鶺虞� и棻.
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

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 等檜攪陛 滲唳 腎歷擊 唳辦 籀葬腎朝 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeCell(strColumnKey, nRow) 
{

} 

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow){     

}        

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 渦綰 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/        
function GridCellDblClickHandler(strColumnKey, nRow){
	
}

/*********************************************   晦顫 Function   **********************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
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
    
    // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
    // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
    if( tabHeightValue < 1 ) 
        tabHeightValue = 1; 
    if( tableHeightValue < 1 ) 
        tableHeightValue = 1; 
    
    //tabPage1.style.height = tabHeightValue + "px"; 
    //tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 	 
        
}     
 
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛輿離 摹鷗 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/	
function onChangeDate(obj){
	alert("!!");
	GridObj.ClearGrid();
	setHeader(GridObj);
	//doQuery();
	//GridObj2.ClearGrid();
	//setHeader2(GridObj2);
	//doQuery2();
}

