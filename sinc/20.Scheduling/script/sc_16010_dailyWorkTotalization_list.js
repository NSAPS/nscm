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
var class_path = "com.wisegrid.admin.";						// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_16010_dailyWorkTotalization_list01';
var job_id2= 'sc_16010_dailyWorkTotalization_list02';
var job_id3= 'sc_16010_dailyWorkTotalization_list03';

var GridObj;
var GridObj2;
var GridObj3;
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
    doQuery2()
}
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave  (service)
{
	doSave();
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

function init2() {
	
	GridObj2 = document.WiseGrid2;
	
	setProperty(GridObj2); //WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
    //setDefault();        //�飛� 晦獄 撲薑 
    setHeader2();  //п渦儅撩 
}	

function init3() {
	
	GridObj3 = document.WiseGrid3;
	
	setProperty(GridObj3); //WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
    //setDefault();        //�飛� 晦獄 撲薑 
    setHeader3();  //п渦儅撩 
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
	//sc_16010_dailyWorkTotalization_list_header
	var param = "sdate!%!edate!%!job_id";
	var value = document.frm.sdate.value + "!%!"
			  + document.frm.edate.value + "!%!"
			  + job_id;
 
	commonUtil.getCodeList(param, value , "sc_16010_dailyWorkTotalization_list_header",defaultHeader); 
    //commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
    
}

function setHeader2() 
{        
    
	defaultHeader2();
    
}   

function setHeader3() 
{        
    
	commonUtil.getCodeList("job_id", job_id3 , "gird_header_list",defaultHeader3); 
    
} 

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function defaultHeader(result){
	
    var arrHeader = '';
    var len = result.length;
    
	GridObj.AddHeader("CRUD",	"掘碟",		"t_text", 		8, 		40,		false);	
	
	// ④渦 儅撩
    for( var i=0 ;i<len ;i++) //瞪羹 Row虜躑 奩犒 и棻.
    {
        arrHeader = result[i].split('!%!');
        GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
    }
         
	var param = "sdate!%!edate";
	var value = document.frm.sdate.value + "!%!"
			  + document.frm.edate.value;
    commonUtil.getCodeList( param, value, "daily_header2", dailyHeader);// 陳瞼⑽ п渦斜瑜擊 虜菟橫 遽棻.
	    
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛陳瞼 ⑽鷓曖 高擊 陛螳螃朝 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function dailyHeader(result){
	
	weekCnt = result.length/7;
	
   	var dateArray = ''; //陳瞼Row蒂 '!%!'晦遽戲煎 寡翮擊 虜菟晦 嬪и 滲熱.
   	var dayCount  = 1;  //陳瞼 牖嬪
   	
   	for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
	{			    
		dateArray = '';
		dateArray = result[i].split('!%!'); //'!%!'煎 掘碟脹 等檜攪蒂 splitж罹 寡翮煎 盪濰и棻.
		
		//п渦 斜瑜儅撩
		GridObj.AddGroup("GRP_DATE"+dayCount, dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //陳瞼 斜瑜
		
		var str = '';
		if( dayCount < 10) str = "D0";
		else str = "D";		                
		GridObj.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"A");
		GridObj.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"B");
		GridObj.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"C"); 
		dayCount++;			    
	}	
	
	var cnt = result.length/7;
	for( i = 1 ; i <= cnt ; i++){
		GridObj.AddGroup("PROD_TYPE" + i, "儅骯⑽鷓");
	   	GridObj.AppendHeader("PROD_TYPE" + i, "NORMAL" + i);
	   	GridObj.AppendHeader("PROD_TYPE" + i, "EXTENSION" + i);
	   	GridObj.AppendHeader("PROD_TYPE" + i, "DAY_OFF" + i);
	}
	
	GridObj.BoundHeader();		
	GridObj.SetColFix('WORK_TYPE');
	
	//п渦 Hidden
   	GridObj.SetColHide("CRUD",true);    

   	GridObj.SetCRUDMode("CRUD", "蹺陛", "熱薑", "餉薯"); //熱薑,餉薯,蹺陛 掘碟 睡碟.
   	
   	if( mode == "search"){
	   	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
		var plant_id  = document.all.selected_plant.value;
		var sdate = document.frm.sdate.value;
		var edate = document.frm.edate.value;
	    
	    //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	    GridObj.SetParam("mode", mode);
	    GridObj.SetParam("plant_id", plant_id);
		GridObj.SetParam("sdate", sdate);
		GridObj.SetParam("edate", edate);
		GridObj.SetParam("weekCnt", weekCnt);
		
	    GridObj.DoQuery(servlet_url);
		
		//doQuery2();
   	}
   
}               

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function defaultHeader2(){
	var param = "sdate!%!edate";
	var value = document.frm.sdate.value + "!%!"
			  + document.frm.edate.value;
	commonUtil.getCodeList( param, value, "daily_header2",{
		callback:function(result){
			weekCnt = result.length/7;
			
			GridObj2.AddHeader("DIVISION",	"識啗",		"t_text", 		8, 		220,		false);	  
    
		    var dayCnt = 1;
		    for( i = 0 ; i < weekCnt*7 ; i++ ){
		    	var strDay = "";
		    	if( dayCnt < 10 ) strDay += "0" + dayCnt;
		    	else strDay += dayCnt;
		    	GridObj2.AddHeader("D" + strDay + "A",	"褻",		"t_text", 		8, 		50,		false);
		    	GridObj2.AddHeader("D" + strDay + "B",	"輿",		"t_text", 		8, 		50,		false);
		    	GridObj2.AddHeader("D" + strDay + "C",	"撿",		"t_text", 		8, 		50,		false);
		    	
		    	dayCnt++;
		    }    
		    
		    var param = "sdate!%!edate";
			var value = document.frm.sdate.value + "!%!"
					  + document.frm.edate.value;
		    commonUtil.getCodeList( param, value, "daily_header2", dailyHeader2);// 陳瞼⑽ п渦斜瑜擊 虜菟橫 遽棻.
		}
	});
	
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function defaultHeader3(result)
{
    var arrHeader = '';
	for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
    {
        arrHeader = result[i].split('!%!');
        GridObj3.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
    }
    
    GridObj3.BoundHeader();   
    //鏽歲 Format蒂 撲薑 и棻.

    //п渦 Hidden
    //GridObj3.SetColHide("CRUD",true);    

    GridObj3.SetCRUDMode("CRUD", "蹺陛", "熱薑", "餉薯"); //熱薑,餉薯,蹺陛 掘碟 睡碟.
}
     
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛陳瞼 ⑽鷓曖 高擊 陛螳螃朝 睡碟. 
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function dailyHeader2(result)
{
	
   	var dateArray = ''; //陳瞼Row蒂 '!%!'晦遽戲煎 寡翮擊 虜菟晦 嬪и 滲熱.
   	var dayCount  = 1;  //陳瞼 牖嬪
   	for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
	{			    
		dateArray = '';
		dateArray = result[i].split('!%!'); //'!%!'煎 掘碟脹 等檜攪蒂 splitж罹 寡翮煎 盪濰и棻.
		
		//п渦 斜瑜儅撩
		GridObj2.AddGroup("GRP_DATE"+dayCount, dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //陳瞼 斜瑜
		
		var str = '';
		if( dayCount < 10) str = "D0";
		else str = "D";		   
		             
		GridObj2.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"A");
		GridObj2.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"B");
		GridObj2.AppendHeader("GRP_DATE"+dayCount, str+dayCount+"C"); 
		
		dayCount++;			    
	}	
	
	GridObj2.BoundHeader();		
    GridObj2.SetColFix('DIVISION');  
    	//п渦 Hidden
   	   	
   	if( mode == "search"){
	   	var servlet_url = Project_name+"/servlet/" + class_path + job_id2;
	
		var plant_id  = document.all.selected_plant.value;
		var sdate = document.frm.sdate.value;
		var edate = document.frm.edate.value;
	    
	    //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	    GridObj2.SetParam("mode", mode);
	    GridObj2.SetParam("plant_id", plant_id);
		GridObj2.SetParam("sdate", sdate);
		GridObj2.SetParam("edate", edate);
		GridObj2.SetParam("weekCnt", weekCnt);
		
	    GridObj2.DoQuery(servlet_url);
				
   	}
             
} 

/***********************************************   WiseGrid 鱔褐  **********************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() {
	
	mode = "search";
	
	GridObj.ClearGrid();
	setHeader(GridObj);
	

}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛舒廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery2() 
{
	mode = "search";
	
	GridObj2.ClearGrid();
	setHeader2(GridObj2);
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
        	var dayCnt = 1;
        	for( i = 1 ; i <= weekCnt ; i++ ){
        		for( j = 0 ; j < 7 ; j++ ){
        			var strDay = "";
        			if( dayCnt < 10 ) strDay += "0" + dayCnt;
        			else strDay += dayCnt;
        			
		            GridObj.SetColCellAlign("D" + strDay + "A",'right');
		            GridObj.SetColCellAlign("D" + strDay + "B",'right');
		            GridObj.SetColCellAlign("D" + strDay + "C",'right');
		            
		            dayCnt++;
        		}
	            
	            GridObj.SetColCellAlign("IDX_QTY" + i,'right');      
				
				GridObj.SetColCellAlign("NORMAL" + i,'center');
				GridObj.SetColCellAlign("EXTENSION" + i,'center');
				GridObj.SetColCellAlign("DAY_OFF" + i,'center');
				
				GridObj.SetColCellBgColor("IDX_QTY" + i,'238|238|0');
        	}

                                
            //等檜攪蒂 斜瑜ё и棻.                                                     
            GridObj.SetGroupMerge("PLANT_NAME");             
			
			//�瑑� 翱濰 儀 雖薑
			var rowLeng = GridObj.GetRowCount();
        	for( i = 0 ; i < rowLeng ; i++ ){
        		for( j = 1 ; j <= weekCnt*7 ; j++ ){
        			for( m = 0 ; m < 3; m++ ){
        				var shift;
        				if(m == 0) shift = "A";
        				if(m == 1) shift = "B";
        				if(m == 2) shift = "C";
						
						var strDay = "";
						if( j < 10 ) strDay += "0" + j
						else strDay += j;
						var value = GridObj.GetCellHiddenValue("D" + strDay + shift,i);
        				// 翱濰
        				if(value == "2" ){
        					GridObj.SetCellBgColor("D" + strDay + shift, i, color01);
        				}
						// �瑑�
						else if(value == "3" ){
        					GridObj.SetCellBgColor("D" + strDay + shift, i, color02);
        				}
        			}
        		}
        	}
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
    if(mode == "save") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {                           
            doQuery(); doQuery2();
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery2() 
{
    var mode = GridObj2.GetParam("mode");
    var error_msg = 'Grid2縑楝';
      
    if(mode == "search") //褻�萼� 諫猿脹 唳辦
    {			
        if(GridObj2.GetStatus() == "true") 
        {                           
            GridObj2.SetColCellAlign("D01A",'right');
            GridObj2.SetColCellAlign("D01B",'right');
            GridObj2.SetColCellAlign("D01C",'right');
            GridObj2.SetColCellAlign("D02A",'right');
            GridObj2.SetColCellAlign("D02B",'right');
            GridObj2.SetColCellAlign("D02C",'right');
            GridObj2.SetColCellAlign("D03A",'right');
            GridObj2.SetColCellAlign("D03B",'right');
            GridObj2.SetColCellAlign("D03C",'right');
            GridObj2.SetColCellAlign("D04A",'right');
            GridObj2.SetColCellAlign("D04B",'right');
            GridObj2.SetColCellAlign("D04C",'right');
            GridObj2.SetColCellAlign("D05A",'right');
            GridObj2.SetColCellAlign("D05B",'right');
            GridObj2.SetColCellAlign("D05C",'right');
            GridObj2.SetColCellAlign("D06A",'right');
            GridObj2.SetColCellAlign("D06B",'right');
            GridObj2.SetColCellAlign("D06C",'right');
            GridObj2.SetColCellAlign("D07A",'right');
            GridObj2.SetColCellAlign("D07B",'right');
            GridObj2.SetColCellAlign("D07C",'right');               
        } else    
        { 
            error_msg = GridObj2.GetMessage(); 
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
	//alert(GridObj.GetCellHiddenValue(strColumnKey, nRow));
	if ((strColumnKey.substr(0,1)!='D' && strColumnKey.substr(-1)!='A')||(strColumnKey.substr(0,1)!='D' && strColumnKey.substr(-1)!='B')||(strColumnKey.substr(0,1)!='D' && strColumnKey.substr(-1)!='C'))
	{
		return false;
	}
	
	if( strToNum(GridObj.GetCellValue(strColumnKey, nRow)) > 0 || GridObj.GetCellHiddenValue(strColumnKey, nRow) == "null") return;
	
	var plant_id = GridObj.GetCellHiddenValue("PLANT_NAME", nRow);
	var line_id = GridObj.GetCellHiddenValue("LINE_NAME", nRow);
	var sdate = document.frm.sdate.value;
	var edate = document.frm.edate.value;
	var date_seq = Number(strColumnKey.substr(1,2))-1;
	var shift_type;
	if( strColumnKey.substr(3,1) == "A") shift_type = '1'
	else if( strColumnKey.substr(3,1) == "B") shift_type = '3'
	else if( strColumnKey.substr(3,1) == "C") shift_type = '5'
	var day_off = "";
	var user_id = document.frm._user_id.value;
	
	var param = "plant_id!%!line_id!%!sdate!%!date_seq!%!shift_type!%!day_off!%!user_id!%!edate";
	
	if( GridObj.GetCellHiddenValue(strColumnKey, nRow) == "3"){
		
		if(confirm("�瑑� 撲薑擊 п薯 ж衛啊蝗棲梱?")){
		
			day_off = "N";
			var value = plant_id + "!%!" + line_id + "!%!" + sdate + "!%!" + date_seq + "!%!"
						+ shift_type + "!%!" + day_off + "!%!" + user_id + "!%!" + edate;
			
			commonUtil.executeQuery(param, value, "daily_shift_day_off_update",{
				callback:function(result){
					if(result == "SUCCESS"){
						//alert(" 撩奢");
						GridObj.SetCellBgColor(strColumnKey, nRow, '255|255|255');
						GridObj.SetCellHiddenValue( strColumnKey, nRow, "1" );
					}
					else{
						alert(" 褒ぬ");
					}
				}
			});
		}
	}
	else{
		if(confirm("�瑑螃虞� 撲薑 ж衛啊蝗棲梱?")){
			
			/*
			GridObj3.InsertRow(-1); // Hidden Gride縑 Row 蹺陛
			var rowIdx = GridObj3.GetRowCount()-1;
			var date_seq = Number(strColumnKey.substr(1,2))-1;
			var shift_type;
			if( strColumnKey.substr(3,1) == "A") shift_type = '1'
			else if( strColumnKey.substr(3,1) == "B") shift_type = '3'
			else if( strColumnKey.substr(3,1) == "C") shift_type = '5'
			//alert(date_seq);
			
			// Set Value 
			GridObj3.SetCellValue("CRUD", rowIdx, "C" );
			GridObj3.SetCellValue("CAT_ID", rowIdx, "PS" );
			GridObj3.SetCellValue("PLANT_ID", rowIdx, GridObj.GetCellHiddenValue("PLANT_NAME", nRow) );
			GridObj3.SetCellValue("LINE_ID", rowIdx, GridObj.GetCellHiddenValue("LINE_NAME", nRow) );
			GridObj3.SetCellValue("WEEK53_NO", 0, "C" );
			GridObj3.SetCellValue("PROD_DATES", rowIdx, date_seq );
			GridObj3.SetCellValue("SHIFT_TYPE", rowIdx, shift_type ); 
			GridObj3.SetCellValue("DAY_OFF", rowIdx, "Y" ); 
			*/
			
			day_off = "Y";
			var value = plant_id + "!%!" + line_id + "!%!" + sdate + "!%!" + date_seq + "!%!"
						+ shift_type + "!%!" + day_off + "!%!" + user_id;
			
			commonUtil.executeQuery(param, value, "daily_shift_day_off_update",{
				callback:function(result){
					if(result == "SUCCESS"){
						alert(" 撩奢");
						GridObj.SetCellBgColor(strColumnKey, nRow, color02);
						GridObj.SetCellHiddenValue( strColumnKey, nRow, "3" );
					}
					else{
						alert(" 褒ぬ");
					}
				}
			});
			
		}
	}
	
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
	document.WiseGrid.height = (tableHeightValue/3*2) + "px"; 
	document.WiseGrid2.height = (tableHeightValue/3*1) + "px"; 
        
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

function weeklyCount(){
//	var plant_id   = document.frm.selected_plant.value ;
//    var sdate = document.frm.sdate.value;
//    var edate = document.frm.edate.value;
    
    document.frm.weekCnt.value = weekCnt;
 
    var paramString = "";
//    paramString = "&plant_id=" + plant_id;
//    paramString+= "&sdate="    + sdate;
//    paramString+= "&edate="    + edate;
//    paramString+= "&weekCnt="  + weekCnt;
       
    
    var fileName = "sc_16010_dailyWorkTotalization_popup";
    var service_url = "service.do?_moon_service="+fileName+"&_moon_perpage=200&_moon_pagenumber=1" + paramString;
    //var newWin = window.showModalDialog(service_url, self, "dialogLeft:0px; dialogTop:0px; dialogWidth:800px; dialogHeight:480px ; dialogScrollbars=no");
    
    var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=800, height=400, top=0, left=0";
	var newWin = window.open(service_url, "sc_16010_dailyWorkTotalization_popup", pop_win_style); 
	newWin.focus();
    
//    if(newWin == -1)
//    {
//        GoSearch('xx');
//    }
}

