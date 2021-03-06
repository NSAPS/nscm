//## Щ煎斜極ID		:	op_02010_Long_Term_Planning_list_PR_PO_term_pop_up.js
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
var job_id = 'op_02010_Long_Term_Planning_list_PR_PO_term_pop_up';
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
    //GridObj.strHDClickAction    = "sortsingle";
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
       
	GridObj.AddHeader("ITEM_ID"		,"ヶ跡\n廓��"	,"t_text" 	,20		,0  	,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	,"ヶ跡貲"  	,"t_text" 	,100	,0 		,false); //0    
 	GridObj.AddHeader("PR_DAY"		,"PR橾濠"    ,"t_text" 	,100.3	,80  	,false); //0   
 	GridObj.AddHeader("PR_TERM"		,"PR\n輿晦"  ,"t_number" ,100.3	,0  	,false); //0
 	GridObj.AddHeader("PR_QTY"		,"PR\n熱榆"  ,"t_number" ,100.3	,60  	,false); //0
 	GridObj.AddHeader("PO_DAY"		,"PO橾濠"    ,"t_text" 	,100	,80  	,false); //0
 	GridObj.AddHeader("PO_TERM"		,"PO\n輿晦"  ,"t_number" ,100.3	,0  	,false); //0
 	GridObj.AddHeader("PO_QTY"		,"PO\n熱榆"  ,"t_number" ,100.3	,80  	,false); //0
 	GridObj.AddHeader("LFDAT"		,"殮堅蹂羶橾" ,"t_text" 	,100	,70  	,false); //0	SCMぜ 夢唳翮 睡濰椒 蹂羶 : 2013-07-05 蹺陛
 	GridObj.AddHeader("IPGO_DAY"	,"殮堅橾"  	,"t_text" 	,100	,70  	,false); //0   
 	GridObj.AddHeader("IPGO_TERM"	,"殮堅\n輿晦"	,"t_number"	,100.3	,0  	,true); //0	
 	GridObj.AddHeader("IPGO_QTY"	,"殮堅榆" 	,"t_number" ,100.3	,70  	,true); //0   
 	GridObj.AddHeader("STATUS"		,"鼻鷓" 		,"t_text" 	,100	,70  	,true); //0   
 	GridObj.AddHeader("PR_PO"		,"PR_PO" 	,"t_number" ,100.3	,70  	,true); //0   
 	GridObj.AddHeader("PO_IPGO"		,"PO_殮堅" 	,"t_number" ,100.3	,70  	,true); //0   
 	GridObj.AddHeader("TOTAL"		,"識模蹂" 	,"t_number" ,100.3	,70  	,true); //0   

	
	GridObj.BoundHeader();	

	 
    GridObj.SetColCellAlign('PR_DAY',	'center'); 
    GridObj.SetColCellAlign('PO_DAY',	'center'); 
    GridObj.SetColCellAlign('IPGO_DAY',	'center');
    GridObj.SetColCellAlign('LFDAT',	'center');  

    GridObj.SetNumberFormat("PR_QTY", 	"#,##0.##");
    GridObj.SetNumberFormat("PO_QTY", 	"#,##0.##");
    GridObj.SetNumberFormat("IPGO_QTY", "#,##0.##");
    GridObj.SetNumberFormat("PR_PO", 	"#,##0.##");
    GridObj.SetNumberFormat("PO_IPGO", 	"#,##0.##");
    GridObj.SetNumberFormat("TOTAL", "#,##0.##");
	

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
	var	gubn		= document.frm.gubn.value;

	
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("item_name", item_name);
	GridObj.SetParam("gubn", gubn);
	   
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
			GridSetMerge();
		//	cal_dw();
//			var i = GridObj.GetRowCount()-1;
//			GridObj.SetCellBgColor('ITEM_ID', 	i, color_tot);
//		 	GridObj.SetCellBgColor('ITEM_NAME', i, color_tot);
//		 	GridObj.SetCellBgColor('PR_DAY', 	i, color_tot);
//		 	GridObj.SetCellBgColor('PR_TERM', 	i, color_tot);
//		 	GridObj.SetCellBgColor('PR_QTY', 	i, color_tot);
//		 	GridObj.SetCellBgColor('PO_DAY', 	i, color_tot);
//		 	GridObj.SetCellBgColor('PO_TERM', 	i, color_tot);
//		 	GridObj.SetCellBgColor('PO_QTY', 	i, color_tot);
//		 	GridObj.SetCellBgColor('LFDAT', 	i, color_tot);
//		 	GridObj.SetCellBgColor('IPGO_DAY', 	i, color_tot);
//		 	GridObj.SetCellBgColor('IPGO_TERM', i, color_tot);
//		 	GridObj.SetCellBgColor('IPGO_QTY', 	i, color_tot);
//		 	GridObj.SetCellBgColor('STATUS', 	i, color_tot);
//		 	GridObj.SetCellBgColor('PR_PO', 	i, color_tot);
//		 	GridObj.SetCellBgColor('PO_IPGO', 	i, color_tot);
//		 	GridObj.SetCellBgColor('TOTAL', 	i, color_tot);

                   
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
function cal_dw() {
	
	
	var i= 0; 
	 
	var pr_term		= 0;
	var pr_term_temp= 0; // 嫦輿晦除 援瞳
	var pr_term_sum	= 0; // 嫦輿晦除 援瞳
	var pr_term_sum_temp = 0;

	var po_term		= 0;
	var po_term_temp= 0; // 嫦輿晦除 援瞳
	var po_term_sum	= 0; // 嫦輿晦除 援瞳
	var po_term_sum_temp = 0;

	var ipgo_term		= 0;
	var ipgo_term_temp= 0; // 嫦輿晦除 援瞳
	var ipgo_term_sum	= 0; // 嫦輿晦除 援瞳
	var ipgo_term_sum_temp = 0;


	
	var pr_qty = 0;
	var po_qty = 0;
	var ipgo_qty = 0;
	var pr_qty_sum = 0;
	var po_qty_sum = 0;
	var ipgo_qty_sum = 0;
	
	var pr_po	= 0;
	var po_ipgo = 0;
	var total	= 0;
	var pr_po_sum	= 0;
	var po_ipgo_sum = 0;
	var total_sum	= 0;
	
		
		/* 熱榆 */	
		pr_qty			= Number(GridObj.GetCellValue("PR_QTY", 0));
		pr_qty_sum		= pr_qty_sum + pr_qty;
		po_qty			= Number(GridObj.GetCellValue("PO_QTY", 0));
		po_qty_sum		= po_qty_sum + po_qty;
		
		/* 模蹂橾熱 */	
		pr_po			= Number(GridObj.GetCellValue("PR_PO", 0));
		pr_po_sum		= pr_po_sum + pr_po;
		po_ipgo			= Number(GridObj.GetCellValue("PO_IPGO", 0));
		po_ipgo_sum		= po_ipgo_sum + po_ipgo;		
		total			= Number(GridObj.GetCellValue("TOTAL", 0));
		total_sum		= total_sum + total;		
	
		/* 晦除 */
		pr_term			= Number(GridObj.GetCellValue("PR_TERM", 0)); // 57
		pr_term_temp	= pr_term; 	// 57
		pr_term_sum_temp= pr_term_sum_temp + pr_term_sum; //0
		///////
		po_term			= Number(GridObj.GetCellValue("PO_TERM", 0)); // 57
		po_term_temp	= po_term; 	// 57
		po_term_sum_temp= po_term_sum_temp + po_term_sum; //0
		////////
		ipgo_term			= Number(GridObj.GetCellValue("IPGO_TERM", 0)); // 57
		ipgo_term_temp	= ipgo_term; 	// 57
		ipgo_term_sum_temp= ipgo_term_sum_temp + ipgo_term_sum; //0


		for(var i=1;i<GridObj.GetRowCount();i++){
			
			if(i == GridObj.GetRowCount()-1){ // 葆雖虞 ゎ敕 row 擎 歜曖煎 陛螳螞 row 檜晦 陽僥縑 葆雖虞 褒ч衛 и廓 貍遽棻.
				
			}else{
				//alert("i="+i+", pr_term="+pr_term);
				pr_term		= Number(GridObj.GetCellValue("PR_TERM", i)); // 舒廓簞 煎辦,, 22
				pr_term_sum		= pr_term_temp - pr_term;  // 57 - 22 = 35
				pr_term_temp	= pr_term; //22
				pr_term_sum_temp= pr_term_sum_temp + pr_term_sum;

				po_term		= Number(GridObj.GetCellValue("PR_TERM", i)); // 舒廓簞 煎辦,, 22
				po_term_sum		= po_term_temp - po_term;  // 57 - 22 = 35
				po_term_temp	= po_term; //22
				po_term_sum_temp= po_term_sum_temp + po_term_sum;

				ipgo_term		= Number(GridObj.GetCellValue("IPGO_TERM", i)); // 舒廓簞 煎辦,, 22
				ipgo_term_sum		= ipgo_term_temp - ipgo_term;  // 57 - 22 = 35
				ipgo_term_temp	= ipgo_term; //22
				ipgo_term_sum_temp= ipgo_term_sum_temp + ipgo_term_sum;
			}
	
			
			/* 熱榆 */
			pr_qty			= Number(GridObj.GetCellValue("PR_QTY", i));
			pr_qty_sum		= pr_qty_sum + pr_qty;
			po_qty			= Number(GridObj.GetCellValue("PO_QTY", i));
			po_qty_sum		= po_qty_sum + po_qty;

			/* 模蹂橾熱 */
			pr_po			= Number(GridObj.GetCellValue("PR_PO", i));
			pr_po_sum		= pr_po_sum + pr_po;
			po_ipgo			= Number(GridObj.GetCellValue("PO_IPGO", i));
			po_ipgo_sum		= po_ipgo_sum + po_ipgo;
			total			= Number(GridObj.GetCellValue("TOTAL", i));
			total_sum		= total_sum + total;		
	
		}
	
	//alert("count="+count);
	var row = GridObj.GetRowCount()-1 ;
	GridObj.SetCellValue("PR_DAY", row,  Math.round(pr_term_sum_temp/(row-1)));
	GridObj.SetCellValue("PO_DAY", row,  Math.round(po_term_sum_temp/(row-1)));
	//GridObj.SetCellValue("IPGO_DAY", row,  Math.round(ipgo_term_sum_temp/(row-1)));
	
	GridObj.SetCellValue("PR_QTY", row,  Math.round(pr_qty_sum/row));
	GridObj.SetCellValue("PO_QTY", row,  Math.round(po_qty_sum/row));
	
	GridObj.SetCellValue("PR_PO", row,  Math.round(pr_po_sum/row));
	GridObj.SetCellValue("PO_IPGO", row,  Math.round(po_ipgo_sum/row));
	GridObj.SetCellValue("TOTAL", row,  Math.round(total_sum/row));
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


function GridSetMerge(){
	
	GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME');
    GridObj.AddSummaryBar('SUMMARY1', 'м啗', 'summaryall', 'custom', 'PR_QTY,PO_QTY,IPGO_QTY,PR_PO,PO_IPGO,TOTAL'); 
         	   
 	GridObj.SetSummaryBarFunction('SUMMARY1','sum','PR_QTY');
    GridObj.SetSummaryBarFunction('SUMMARY1','sum','PO_QTY'); 
    GridObj.SetSummaryBarFunction('SUMMARY1','sum','IPGO_QTY');
    GridObj.SetSummaryBarFunction('SUMMARY1','average','PR_PO');
    GridObj.SetSummaryBarFunction('SUMMARY1','average','PO_IPGO');
    GridObj.SetSummaryBarFunction('SUMMARY1','average','TOTAL');	 
    
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');  
         	   
         	   
         	   
         	   
         	   
         	   
         	   
         	   
         	   
}