//## Щ煎斜極ID		: ip_03040_Pos_Singlelist.js
//## Щ煎斜極貲		: ヶ跡滌 POS DATA 碟戮
//## 滲唳濠			: 檜鬼遵
//## 偃嫦橾濠			: 2016-04-12
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_08.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_08.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_03040_Pos_Singlelist';

var GridObj ; 									// WiseGrid 偌羹
var color_tot 		 = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';			//塭檣 摹鷗 寡唳儀 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
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
    
    // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
    // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
    if( tabHeightValue < 1 ) 
        tabHeightValue = 1; 
    if( tableHeightValue < 1 ) 
        tableHeightValue = 1;
      
    //tabPage1.style.height = tabHeightValue + "px"; 

    document.WiseGrid.height = tableHeightValue + "px"; 
    //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
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

	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj.nHDLineSize         = 10; //Header Size
    //GridObj.bHDMoving = true;		// 鏽歲 ④渦 嬪纂 檜翕
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; 	//Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj.strActiveRowBgColor    = "232|245|213";     //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction 	   = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction	   = 'page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;		
       
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        
	
	GridObj.AddHeader("CNFM_DATE"	   	,"橾濠"  		,"t_text"     	,100		,80     ,false); //0   
	GridObj.AddHeader("DAY"	   			,"蹂橾"  		,"t_text"     	,100		,40     ,false); //0   
	GridObj.AddHeader("EMART_EXPT"		,"晦蟾營堅"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("EMART_POS"	    ,"POSっ衙榆"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("EMART_NS"		,"堯褕奢晝榆"	    ,"t_number" 	,100.3	    ,90    	,false); //0
 	GridObj.AddHeader("HOME_EXPT"		,"晦蟾營堅"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("HOME_POS"	    ,"POSっ衙榆"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("HOME_NS"			,"堯褕奢晝榆"	    ,"t_number" 	,100.3	    ,90    	,false); //0
 	GridObj.AddHeader("LOTTE_EXPT"		,"晦蟾營堅"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("LOTTE_POS"	    ,"POSっ衙榆"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("LOTTE_NS"		,"堯褕奢晝榆"	    ,"t_number" 	,100.3	    ,90    	,false); //0
 	GridObj.AddHeader("TOT_EXPT"		,"晦蟾營堅"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("TOT_POS"	    	,"POSっ衙榆"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("TOT_NS"			,"堯褕奢晝榆"	    ,"t_number" 	,100.3	    ,90    	,false); //0
 	
 	GridObj.AddGroup	("EMART",	"檜葆お");
 	GridObj.AppendHeader("EMART", 	"EMART_EXPT");
 	GridObj.AppendHeader("EMART", 	"EMART_POS");
 	GridObj.AppendHeader("EMART", 	"EMART_NS");
 	
 	GridObj.AddGroup	("HOME",	"�些繩紗�");
 	GridObj.AppendHeader("HOME", 	"HOME_EXPT");
 	GridObj.AppendHeader("HOME", 	"HOME_POS");
 	GridObj.AppendHeader("HOME", 	"HOME_NS");
 	
 	GridObj.AddGroup	("LOTTE",	"煜等葆お");
 	GridObj.AppendHeader("LOTTE", 	"LOTTE_EXPT");
 	GridObj.AppendHeader("LOTTE", 	"LOTTE_POS");
 	GridObj.AppendHeader("LOTTE", 	"LOTTE_NS");
 	
 	GridObj.AddGroup	("TOT",		"啗");
 	GridObj.AppendHeader("TOT", 	"TOT_EXPT");
 	GridObj.AppendHeader("TOT", 	"TOT_POS");
 	GridObj.AppendHeader("TOT", 	"TOT_NS");
 	
	GridObj.BoundHeader();	
	
	GridObj.SetColCellAlign('CNFM_DATE',  	'center'); 
	GridObj.SetColCellAlign('DAY',  		'center'); 
	GridObj.SetNumberFormat("EMART_EXPT",       "###,###.#");
    GridObj.SetNumberFormat("EMART_POS",       	"###,###.#");
    GridObj.SetNumberFormat("EMART_NS",     	"###,###.#");
    GridObj.SetNumberFormat("HOME_EXPT",       	"###,###.#");
    GridObj.SetNumberFormat("HOME_POS",       	"###,###.#");
    GridObj.SetNumberFormat("HOME_NS",       	"###,###.#");
    GridObj.SetNumberFormat("LOTTE_EXPT",       "###,###.#");
    GridObj.SetNumberFormat("LOTTE_POS",       	"###,###.#");
    GridObj.SetNumberFormat("LOTTE_NS",     	"###,###.#");
    GridObj.SetNumberFormat("TOT_EXPT",       	"###,###.#");
    GridObj.SetNumberFormat("TOT_POS",       	"###,###.#");
    GridObj.SetNumberFormat("TOT_NS",       	"###,###.#");
    
    GridObj.SetColCellBgColor('EMART_EXPT','255|255|200');
    GridObj.SetColCellBgColor('HOME_EXPT','255|255|200');
    GridObj.SetColCellBgColor('LOTTE_EXPT','255|255|200');
    GridObj.SetColCellBgColor('TOT_EXPT','255|255|200');
  
   
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() 
{
	
    var endMode = GridObj.GetParam("mode");
    var error_msg = '';
      
    if(endMode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {        
        	
        	var row = GridObj.GetRowCount();            	
        	if (row == 0) return;
        	
        	
        	GridSetMerge();        
        	 
         
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save"){
    	
    	doQuery();
    	
		
    }
	
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service) 
{
	
    doQuery();
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
   var start_date	    = document.frm.start_date.value;
   start_date 			= start_date.replace(/-/g,"");
   var end_date	    	= document.frm.end_date.value;
   end_date 			= end_date.replace(/-/g,"");
   var item_id			= document.frm.item_id.value; 
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
   var gubn				= ""; 

   
   commonUtil.getSelQeury( "item_id", item_id, "ip_03040_trans_id",{
	callback:function(result){
			
		document.frm.pos_id.value 	= result[0][1];								
		
		}
				 
	});
	
   if(confirm("п渡 ヶ跡擊 褻�� ж衛啊蝗棲梱?") == 1 ){
   	   		
	   if( start_date < "20160617") gubn = "1";			//gubn = 1  婁剪 POS 褻�� 營堅 鼠衛
	   else gubn = "2";   
	   
   		//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	   GridObj.SetParam("mode",           		"search");
	   GridObj.SetParam("start_date",   		start_date);
	   GridObj.SetParam("end_date",   			end_date);
	   GridObj.SetParam("item_id",   			item_id);
	   GridObj.SetParam("pos_id",   			document.frm.pos_id.value);
	   GridObj.SetParam("gubn",					gubn);	
	   
	   GridObj.DoQuery(servlet_url);
   
   }else{
   	
	return ; 
	  	
   }
  
  	       
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 渦綰 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow) {


}

function GridSetMerge(){	
	
	GridObj.AddSummaryBar('SUMMARY', '啗'	, 'summaryall', 'sum', 'EMART_EXPT,EMART_POS,EMART_NS,HOME_EXPT,HOME_POS,HOME_NS,LOTTE_EXPT,LOTTE_POS,LOTTE_NS,TOT_EXPT,TOT_POS,TOT_NS');  
 	GridObj.SetSummaryBarColor('SUMMARY', '0|153|0', color_tot); 


}

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {

		document.frm.item_name.value = "";

		return;

	}

	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 

		callback:function(arrList){

			// 橾纂ж朝 薯ヶ 橈擠

			if( arrList.length == 1 ) {

				objBox.value = arrList[0][0];

				document.frm.item_name.value = arrList[0][1];

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



