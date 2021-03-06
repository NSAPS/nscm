//## Щ煎斜極ID		:	op_02040_Mfs_Stock_Info.js
//## Щ煎斜極貲		:	啗翮餌 營堅薑爾 蛔煙
//## 偃嫦濠          :	掏辨雙 
//## 偃嫦橾濠       	:	2013-04-08
//##
//## 婦溼 job file   : job_sinc_30_orderPlanning_03.xml
//## 婦溼 query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-04-08  辦謙敕      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id				= 'op_02040_Mfs_Stock_Info';
var GridObj ; 													// WiseGrid 偌羹

var color_tot			= '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col		= '255|253|208';
var color_sp			= '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row	= '141|232|141';	//塭檣 摹鷗 寡唳儀



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue		= window.innerWidth;
            maxHeightValue		= window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue		= document.body.clientWidth;
            maxHeightValue		= document.body.clientHeight;
        } 
        
        var tabHeightValue		= Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue	= Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h 			= document.frm.search_h.value; 
        
        
        // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
        // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
        if(tabHeightValue < 1 ) 
           tabHeightValue = 1; 
        if(tableHeightValue < 1 ) 
           tableHeightValue = 1;         
         
        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }  

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 							弛
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.			弛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader(GridObj);  	//п渦儅撩 
	setDefault();        	//�飛� 晦獄 撲薑 
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
    
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
	
	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.

	GridObj.strHDClickAction    = "sortsingle";   
	GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
 
   
}
     
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
 	GridObj.AddHeader("CNFM_DATE"		,"啗�嘛狨�"		,"t_text" 		,800	,70		,false); //0
 	GridObj.AddHeader("COM_CODE"		,"啗翮餌囀萄"		,"t_text" 		,800	,0		,false); //0
 	GridObj.AddHeader("COM_NAME"		,"啗翮餌貲"		,"t_text" 		,800	,70		,false); //0   
 	GridObj.AddHeader("COM_MATR_CODE"	,"啗翮餌 濠營囀萄"	,"t_text" 		,800	,120	,false); //0   
 	GridObj.AddHeader("COM_MATR_NAME"	,"啗翮餌 濠營貲"   ,"t_text" 		,800	,250  	,false); //0   
 	GridObj.AddHeader("NS_MATR_CODE"	,"堯褕 濠營囀萄"   ,"t_text" 		,800	,90  	,false); //0   
 	GridObj.AddHeader("BASE_UOM"		,"欽嬪"     		,"t_text" 		,800	,80  	,false); //0
 	GridObj.AddHeader("BASE_STOCK"		,"晦蟾營堅"     	,"t_number" 	,-1		,80  	,true); //0   
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('COM_NAME',				'left'); 
    GridObj.SetColCellAlign('COM_MATR_CODE',		'left'); 
    GridObj.SetColCellAlign('COM_MATR_NAME',		'left');
    GridObj.SetColCellAlign('NS_MATR_CODE',			'left');
    
    
    GridObj.SetColCellAlign('BASE_STOCK',			'right'); 
    GridObj.SetColCellAlign('BASE_UOM',				'center');

	
	GridObj.SetNumberFormat("BASE_STOCK",		"#,##0.###");	

}

   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
   	var cnfm_date		= document.frm.cnfm_date.value;
   	
       doQuery();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;	
	var com_code		= document.frm.com_code.value;
	var cnfm_date		= document.frm.cnfm_date.value;

	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",		"search");
	GridObj.SetParam("com_code",	com_code);
	GridObj.SetParam("cnfm_date",	cnfm_date);
	   
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
}

// 盪濰
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
};

// 盪濰
function doSave() {
 
	var GridObj			= document.WiseGrid;
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var com_code		= document.frm.com_code.value;

   	var rowCnt = GridObj.GetRowCount();
   	var src_com_matr, 	tgt_com_matr;
   	var src_ns_matr, 	tgt_ns_matr;
   
	// 醞犒羹觼
	for ( var i = 0 ; i < rowCnt - 1 ; i++ )
	{
		src_com_matr	= GridObj.GetCellvalue('COM_MATR_CODE',	i);
		src_ns_matr		= GridObj.GetCellvalue('NS_MATR_CODE',	i);
		
		for ( var j = i + 1 ; j < rowCnt ; j++ )
		{
			tgt_com_matr	= GridObj.GetCellvalue('COM_MATR_CODE',	j);
			
			tgt_ns_matr		= GridObj.GetCellvalue('NS_MATR_CODE',	j);
			if(src_com_matr==tgt_com_matr && src_ns_matr==tgt_ns_matr){
				alert(j-1+"廓簞 啗翮餌 濠營囀萄釭 堯褕 濠營囀萄陛 醞犒脹 等檜攪陛 氈替棲 棻衛 �挫恉牮簽�  夥奧棲棻");
				return;
			}
			
		}
		
	}  

    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",		"doSave");
	GridObj.SetParam("com_code",	com_code);
	
	GridObj.SetParam("user_id",		document.frm._user_id.value);

		if(com_code=="0001000050"){
			alert("盪濰 等檜攪陛 鷓唳堯骯檜 蜃蝗棲梱?");
		}else if(com_code=="0001000021"){
				alert("盪濰 等檜攪陛 轎襟�倆釔� 蜃蝗棲梱?");
		}
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");	

 
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() 
{
    var endMode			= GridObj.GetParam("mode");    
    
    var error_msg		= '';
      
    if(endMode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {
        	
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell儀梃 滲唳
				
				GridObj.SetCellBgColor('BASE_STOCK', i, color_edit_col);
			}         	                           
                 
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
    
		    else if(endMode == "doSave"){
		    	
		    	var service_url = "service.do?_moon_service=op_02040_Mfs_Stock_Info";				
				alert("盪濰檜 諫猿 腎歷蝗棲棻.");		
		
    }
    
    else{

    }	
	
}
function GridChangeCell(){ //偃羹陛 橈棻朝 螃盟 п唸 掘僥(Service.do)
	
}

function GridCellClick(){ //偃羹陛 橈棻朝 螃盟 п唸 掘僥(Service.do)
	
}

function excelUpload(){
	       
   //徽襟 等檜攪 機煎萄 �� Grid 餉薯
	document.WiseGrid.ClearGrid();
				
	init();

	GridObj.ExcelImport('', 'importall','row', true, true);
}

