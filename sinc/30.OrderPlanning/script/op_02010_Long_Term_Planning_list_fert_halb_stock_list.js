//## Щ煎斜極ID		:	ip_02050_Inventory_production_analysis_list_pop_new.js
//## Щ煎斜極貲		:	奢晝瞳м撩 餌瞪碟戮 pop_up
//## 偃嫦濠          :	掏辨雙 
//## 偃嫦橾濠       	:	2009-07-16
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  陴錠辨      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'op_02010_Long_Term_Planning_list_fert_halb_stock_list';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2 ; 													// WiseGrid 偌羹
var GridObj3 ; 													// WiseGrid 偌羹

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
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

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 							弛
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.			弛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader(GridObj);  	//п渦儅撩 
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj.nHDLineSize         = 10; //Header Size 
    GridObj.strHDClickAction    = "sortsingle";
 	//GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '蜈擎 堅蛐';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
    
    GridObj.bStatusbarVisible = true;				// status bar visible 鼻鷓夥 撲薑 
 
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        
       
	GridObj.AddHeader("CONS_ITEM_ID"	,"掘撩ヶ ヶ跡廓��"	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_NAME"	,"掘撩ヶ ヶ跡貲"  	,"t_text" 	,100	,0 ,false); //0    
 	GridObj.AddHeader("PROD_ITEM_TYPE"	,"ヶ跡嶸⑽"     	,"t_text" ,100.3	,60  ,false); //0   
 	GridObj.AddHeader("PROD_ITEM_ID"	,"薯ヶ廓��"     	,"t_text" ,100.3	,80  ,false); //0
 	GridObj.AddHeader("PROD_ITEM_NAME"	,"ヶ跡貲"     	,"t_text" ,100.3	,150  ,false); //0
 	GridObj.AddHeader("QTY_UOM"			,"晦獄\n欽嬪"    	,"t_text" 	,100	,60  ,false); //0
 	GridObj.AddHeader("STOCK_QTY"		,"輿蟾營堅"      	,"t_number" ,100.3	,70  ,false); //0   
 	GridObj.AddHeader("SALES_3WEEK"		,"3輿ゎ敕\nっ衙"  ,"t_number" ,100.3	,70  ,false); //0   
 	GridObj.AddHeader("STOCK_DAY"		,"營堅橾熱"      	,"t_number" ,100.3	,70  ,false); //0
 	GridObj.AddHeader("PROD_3MONTH"		,"3偃錯ゎ敕\n儅骯"	,"t_number"	,100.3	,70  ,true); //0	
 	GridObj.AddHeader("PROD_1YEAR"		,"瞪喇翕錯\n儅骯" 	,"t_number" ,100.3	,70  ,true); //0   
 	GridObj.AddHeader("PROD_PLAN"		,"渡輿儅骯\n啗��(EA)" 	,"t_number" ,100.3	,70  ,true); //0   


	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('PROD_ITEM_TYPE','center'); 
    GridObj.SetColCellAlign('PROD_ITEM_ID','center'); 
    GridObj.SetColCellAlign('QTY_UOM','center'); 

    GridObj.SetNumberFormat("STOCK_QTY"  , "#,##0.##");
    GridObj.SetNumberFormat("SALES_3WEEK"  , "#,##0.##");
    GridObj.SetNumberFormat("STOCK_DAY"  , "#,##0.##");
    GridObj.SetNumberFormat("PROD_3MONTH"  , "#,##0.##");
    GridObj.SetNumberFormat("PROD_1YEAR"  , "#,##0.##");
    GridObj.SetNumberFormat("PROD_PLAN"  , "#,##0.##");


	setDefault();        	//�飛� 晦獄 撲薑 
	 
	GoSearch(); //pop up 璽縑憮 諦檜鍔 斜葬萄 譆蟾 撲薑擊 嬪п GoSearch 蒂 init �醴� 褒ч  %醞蹂%

	
}

   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       doQuery();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc  
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;

	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("item_name", item_name);
	   
	GridObj.DoQuery(servlet_url);
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

			// cell儀梃 滲唳  : 殮堅蕨薑橾檜 嘐楚檣 о跡菟 cell儀梃 = BLUE!!
			for(var i=0;i<GridObj.GetRowCount();i++) {
				if(GridObj.GetCellValue('PROD_ITEM_TYPE',i) == 'FERT' ){  // GREEN
					GridObj.SetCellBgColor('PROD_ITEM_TYPE'	, i, color_edit_col); //0-191-255
					GridObj.SetCellBgColor('PROD_ITEM_ID'	, i, color_edit_col); //0-191-255
					GridObj.SetCellBgColor('PROD_ITEM_NAME'	, i, color_edit_col); //0-191-255
				}
			}	        	               


                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }

	
}



function GridCellClick(strColumnKey, nRow){
	
	

	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	if(nRow == '0' || nRow == '1'|| nRow == '4'|| nRow == '5'|| nRow == '6' ){
		//alert("晦蟾營堅朝 熱薑檜 碳陛棟м棲棻");
		alert("п渡 蠔歲擎 熱薑й熱 橈蝗棲棻.");
		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	
	cal_dw1()	
	
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 瞪偃薯堅 翱骯
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function cal_dw1() {
	
		
	var	hd_name;
	var start_idx	= 0;
	var last_idx	= 6;
	
	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var stock_dqy	= 0;
	var next_stock;
	
	var gy_base_stock	= 0; // 陛辨晦蟾營堅
	var gy_stock_day	= 0; // 陛辨 營堅橾熱
	var gy_ipgo_qty		= 0; // 陛辨 儅骯榆
	var gy_next_stock;
	
	var start_hd_name = 'DAY_00';
	
	hd_name = start_hd_name;
	hd_name_1 = start_hd_name.substr(0,5);
	hd_name_2 = start_hd_name.substr(5,6);

//alert(1000/14);
//alert(Math.round((1000/14)*10)/10);

//return;

		base_stock	= Number(GridObj.GetCellValue(start_hd_name, 0));
		chgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 2));
		ipgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 3));
		gy_ipgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 4));
		stock_dqy	= Math.round((base_stock/chgo_qty)*10)/10;
		next_stock	= Math.round(base_stock - chgo_qty + ipgo_qty);
		
		//陛辨營堅 瞪偃..
		gy_base_stock = Number(GridObj.GetCellValue(start_hd_name, 0));
		GridObj.SetCellValue(hd_name, 5,  gy_base_stock); 
		
		gy_stock_dqy		= Math.round((gy_base_stock/chgo_qty)*10)/10;
		gy_next_stock	= Math.round(gy_base_stock - chgo_qty + gy_ipgo_qty);
		

	for (i=0; i < 21 ; i++) {

		GridObj.SetCellValue(hd_name, 1,  stock_dqy);
		GridObj.SetCellValue(hd_name, 6,  gy_stock_dqy);
		
		hd_name_2 = Number(hd_name_2)+Number(1);

		if(i == 9){
			hd_name_1 =hd_name_1.substr(0,4);
		}else{

		}
		
		hd_name = hd_name_1+hd_name_2;

		if(i == 20){  // 葆雖虞 10 翮擎 棻擊 陳檜 橈戲棲 瑞Щ蒂 謙猿 衛鑑棻. 
			return; 
		}
		GridObj.SetCellValue(hd_name, 0,  next_stock);
		GridObj.SetCellValue(hd_name, 5,  gy_next_stock); //陛辨營堅榆

		base_stock	= Number(GridObj.GetCellValue(hd_name, 0));
		chgo_qty	= Number(GridObj.GetCellValue(hd_name, 2));
		ipgo_qty	= Number(GridObj.GetCellValue(hd_name, 3));
		
		gy_base_stock	= Number(GridObj.GetCellValue(hd_name, 5));
		gy_ipgo_qty		= Number(GridObj.GetCellValue(hd_name, 4));
		
		
		if(chgo_qty == 0){
			stock_dqy	= 0;
			gy_stock_dqy= 0;			
		}else{
			stock_dqy	= Math.round((base_stock/chgo_qty)*10)/10;
			gy_stock_dqy= Math.round((gy_base_stock/chgo_qty)*10)/10;
		}
		
		next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
		gy_next_stock	= Math.round(gy_base_stock - chgo_qty + gy_ipgo_qty);
		
 
	}


}		

function enterCheck(){
	
	var key = event.keyCode;
	// TAB(9) or ENTER(13)
	if(event.keyCode == "13" ) {
		refresh("simul");		
	}else{
		
	}

}


// 渦綰 贗葛 : 鼻撮 で機 營褻�� - 3輿ゎ敕,1輿ゎ敕,3+1輿ゎ敕/2
function refresh(week_flag) {
	
	var item_id = document.frm.item_id.value;
	var	item_name = document.frm.item_name.value;
	var simul_data = document.frm.simul_data.value;
	var week_flag	= week_flag;

	//Simulation 橾 唳辦 simul_data в熱
	if(week_flag == "simul") {
		if( simul_data == "" || simul_data == null || simul_data == "0") {
			alert("Simulation曖 高擊 殮溘п輿褊衛蹂!"); 
			document.frm.simul_data.select();
			return;
		}
	}
	
	var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_new";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag + "&simul_data=" + simul_data;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=350, top=200, left=200";
	//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}