//## Щ煎斜極ID		:	op_02070_event_plan_Info.vm
//## Щ煎斜極貲		:	嶸鱔獄睡 っ襠啗�� 薑爾  Excel 機煎萄
//## 偃嫦濠          :	辦謙敕 
//## 偃嫦橾濠       	:	2013-07-11
//##
//## 婦溼 job file   : job_sinc_30_orderPlanning_03.xml
//## 婦溼 query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-07-11  辦謙敕      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id				= 'op_02070_event_plan_info';
var GridObj ; 													// WiseGrid 偌羹
											// WiseGrid 偌羹

var color_tot			= '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col		= '255|253|208';
var color_sp			= '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row	= '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01 			= '224|255|224';			//255|255|153
var colBg02 			= '255|255|255';


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

	/* 
    GridObj.nHDLineSize         	= 36; //Header Size
       
 	GridObj.strActiveRowBgColor		= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor	= '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor	= '0|0|0'; 
	GridObj.strMouseWheelAction		= 'page'; // page 欽嬪 scroll ->晦獄擎 'default'   
	// Header Font Setting
	GridObj.strHDClickAction    = "sortsingle";
	GridObj.strHDFontName			= '蜈擎 堅蛐';
	GridObj.nHDFontSize				= 10;				  	// Font Size 9
	GridObj.bHDFontBold				= true;
*/
/////////////////////////////////////////

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
 	
 	GridObj.AddHeader("CUST_NAME"		,"剪楚籀貲"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("GUBN"			,"掘碟"				,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("ITEM_ID"			,"薯ヶ囀萄"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("ITEM_NAME"		,"薯ヶ貲"				,"t_text" 		,100	,180	,false); //0
 	GridObj.AddHeader("EVEN_METHOD"		,"ч餌 寞徹"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("FRT_CHGO_DATE"	,"譆蟾 轎堅橾"			,"t_text" 		,100	,80		,false); //0
 	GridObj.AddHeader("EVEN_S_DATE"		,"衛濛橾"				,"t_text" 		,100	,90		,false); //0
 	GridObj.AddHeader("EVEN_E_DATE"		,"謙猿橾"				,"t_text" 		,100	,90		,false); //0
 	
 	GridObj.AddHeader("CHDO_QTY"		,"蟾紫僭榆"			,"t_number" 	,-1		,90		,true); //0   
 	GridObj.AddHeader("PLAN_QTY"		,"啗�匱鷊�"   		,"t_number" 	,-1		,90  	,true); //0   
 	
 	GridObj.AddHeader("SUPT_METHOD"		,"雖錳 寞徹"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("CHGO_STD"		,"轎堅 晦遽"			,"t_text" 		,100	,70		,false); //0
 	
 	GridObj.AddHeader("ETC"				,"雖錳薯ヶ \n/ 衛衝ヶ"	,"t_text" 		,100	,70		,false); //0

 	GridObj.AddHeader("REAL_CHGO_DATE"	,"譆蟾 轎堅橾"			,"t_text" 		,100	,0		,false); //0
 	GridObj.AddHeader("REAL_S_DATE"		,"衛濛橾"				,"t_text" 		,100	,0		,false); //0
 	GridObj.AddHeader("REAL_E_DATE"		,"謙猿橾"				,"t_text" 		,100	,0		,false); //0

 	
 	/* 檜醞 п渦 蹺陛 */
	GridObj.AddGroup("HD1",      	"ч餌晦除");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
	GridObj.AppendHeader("HD1", 	 "EVEN_S_DATE");
	GridObj.AppendHeader("HD1",      "EVEN_E_DATE");
   
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID',		  	  'left');
    GridObj.SetColCellAlign('ITEM_NAME',		  'left');
    GridObj.SetColCellAlign('CUST_NAME',		'center');
    GridObj.SetColCellAlign('GUBN',				'center');
    
    
    GridObj.SetColCellAlign('EVEN_METHOD',		'center');
    GridObj.SetColCellAlign('FRT_CHGO_DATE',	'center');
    GridObj.SetColCellAlign('EVEN_S_DATE',		'center');
    GridObj.SetColCellAlign('EVEN_E_DATE',		'center');
    GridObj.SetColCellAlign('CHDO_QTY',			 'right');
    GridObj.SetColCellAlign('PLAN_QTY',			 'right');
    GridObj.SetColCellAlign('SUPT_METHOD',		'center');
    GridObj.SetColCellAlign('CHGO_STD',			'center');
    GridObj.SetColCellAlign('ETC',				'center');

    GridObj.SetColCellAlign('FRT_CHGO_DATE',	'center');
    GridObj.SetColCellAlign('EVEN_S_DATE',		'center');
    GridObj.SetColCellAlign('EVEN_E_DATE',		'center');
	
	GridObj.SetNumberFormat("CHDO_QTY",		"#,##0.###");
	GridObj.SetNumberFormat("PLAN_QTY",		"#,##0.###");

}

   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
       
       
       
       doQuery();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;	
	
	var in_fr_date	    = document.frm.in_fr_date.value;
	var in_to_date	    = document.frm.in_to_date.value;
		in_fr_date 		= in_fr_date.replace(/-/g,"");
		in_to_date 		= in_to_date.replace(/-/g,"");
	
	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",		"search");
	GridObj.SetParam("in_fr_date",   in_fr_date);
	GridObj.SetParam("in_to_date",   in_to_date);
	
	
	GridObj.SetParam("user_id",		document.frm._user_id.value);
	GridObj.DoQuery(servlet_url,	"WISEGRIDDATA_ALL");
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
	

    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode",		"doSave");
	GridObj.SetParam("user_id",		document.frm._user_id.value);
	
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
				
				GridObj.SetCellBgColor('GUBN',			i, 	color_edit_col);
				
				GridObj.SetCellBgColor('EVEN_METHOD',	i, 	color_edit_col);
				GridObj.SetCellBgColor('FRT_CHGO_DATE', i, 	color_edit_col);
				
				GridObj.SetCellBgColor('CHDO_QTY',		i, 	color_edit_col);
				GridObj.SetCellBgColor('PLAN_QTY',		i, 	color_edit_col);
				
				GridObj.SetCellBgColor('SUPT_METHOD',	i, 	color_edit_col);
				GridObj.SetCellBgColor('CHGO_STD',		i, 	color_edit_col);
				GridObj.SetCellBgColor('ETC',			i, 	color_edit_col);

			}         	                           
                 
        } else{ 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
    
		    else if(endMode == "doSave"){
		    	var service_url = "service.do?_moon_service=op_02070_event_plan_info";
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
	
	

	GridObj.ExcelImport('', 'importall','row', false, false); 
   

}

