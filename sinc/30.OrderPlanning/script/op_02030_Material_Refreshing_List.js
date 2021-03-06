//## Щ煎斜極ID      : op_02030_Material_Refreshing_List.js
//## Щ煎斜極貲      : 薯ヶ滌 濠營⑷�� 褻�� (褐敘)
//## 滲唳濠濠        : 辦謙敕
//## 偃嫦橾濠        : 2013-01-24 �倍靺�
//##
//## 婦溼 job file   : job_sinc_30_orderPlanning_03.xml
//## 婦溼 query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2013-01-24  辦謙敕      update
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id 				= 'op_02030_Material_Refreshing_List';

var GridObj ; 													// WiseGrid 偌羹
var GridObj2 ;

var color_tot			= '234|234|234';	//м啗 塭檣 寡唳儀
var color_edit_col		= '255|253|208';


var color_sp			= '230|222|230'; 	//鏽歲 掘碟摹 寡唳儀
var color_select_row	= '255|253|208';	//塭檣 摹鷗 寡唳儀 



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
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
            maxWidthValue  = document.body.clientWidth;
            maxHeightValue = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
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

function init2() { 
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
	setHeader(GridObj2);  	//п渦儅撩 
	setDefault2();        	//�飛� 晦獄 撲薑 
}   


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 
	
	GridObj.bRowSelectorIndex		= true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj.nHDLineSize				= 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines				= 2;   
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj.strSelectedCellFgColor	= '0|0|0';
	GridObj.strSelectedCellBgColor	= '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj.strActiveRowBgColor		= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction		= "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction		='page';

	// Cell Font Setting
	GridObj.nCellFontSize			= 9;					// Font Size 9
       
}
       
function setDefault2() { 

	GridObj2.bRowSelectorIndex		= true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.
    GridObj2.nHDLineSize			= 10; //Header Size
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj2.nHDLines				= 2;   
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj2.strSelectedCellFgColor = '0|0|0';
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj2.strActiveRowBgColor	= "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj2.strHDClickAction		= "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj2.strMouseWheelAction	='page';

	// Cell Font Setting
	GridObj2.nCellFontSize			= 9;					// Font Size 9
       
}       
       
       
       
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        

    var item_id 	= document.frm.item_id.value;
    var item_name	= document.frm.item_name.value;

 		GridObj.AddHeader("GUBN"			,"欽絮"   			,"t_text" 		,2			,30  	,false); //0
 		GridObj.AddHeader("SELECTED"		,""   				,"t_checkbox" 	,2			,30  	,true); //0
		GridObj.AddHeader("CONS_ITEM_ID"	,"濠營囀萄"		    ,"t_text"		,100	    ,60     ,false); //0   
		GridObj.AddHeader("CONS_ITEM_NAME"	,"濠營貲"	       		,"t_text"		,100	    ,190    ,false); //0
		GridObj.AddHeader("MEINS"			,"欽嬪"   			,"t_text"		,100	    ,35     ,false); //0		 	
		GridObj.AddHeader("REQ_QTY"	    	,"繭\n模蹂榆"	        ,"t_number"    ,100.3		,70     ,false); //0
		GridObj.AddHeader("TOT"	    		,"營堅\n熱榆"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("CONV_QTY"	    ,"夢蝶\n�粉�"	        ,"t_number"	   ,100.3		,70     ,false); //0		
		GridObj.AddHeader("PEINH"	    	,"陛問\n欽嬪"	        ,"t_number"	   ,100.3		,50     ,false); //0
		GridObj.AddHeader("NETPR"	    	,"欽陛"	       	    ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("WAERS"	    	,"鱔�倩�"		        ,"t_text"	   ,100			,50     ,false); //0
		GridObj.AddHeader("PAY"				,"旎擋"				,"t_number"	   ,100.3		,70     ,false); //0		
		GridObj.AddHeader("QTY1"	    	,"寰曄"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY2"	    	,"寰撩"	   		    ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY3"	    	,"寰撩(擠猿)"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY4"	    	,"嬴骯"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY5"	    	,"掘嘐"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY6"	    	,"睡骯"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("QTY7"	    	,"喬骯"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("COM_STOCK"	    ,"啗翮餌\n營堅"	   ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj.AddHeader("PROD_CUST_NAME"	,"奢晝機羹"	       	,"t_text"		,1000	    ,190    ,false); //0		
		
		/* 檜醞 п渦 蹺陛 */
		GridObj.AddGroup("HD1",      		"奢濰滌 營堅");			//斜葬萄縑 斜瑜擊 蛔煙и棻. 
		GridObj.AppendHeader("HD1", 	 "QTY1");
		GridObj.AppendHeader("HD1",      "QTY2");
		GridObj.AppendHeader("HD1",      "QTY3");
		GridObj.AppendHeader("HD1", 	 "QTY4");	
		GridObj.AppendHeader("HD1", 	 "QTY5");
		GridObj.AppendHeader("HD1",      "QTY6");
		GridObj.AppendHeader("HD1",      "QTY7");		
		
		/* 盪濰擊 嬪и �鰽� 高 */
		
		GridObj.BoundHeader();	
		
		GridObj.SetColFix('CONS_ITEM_NAME');
		
		GridObj.SetColCellAlign('GUBN',					'center');
		GridObj.SetColCellAlign('CONS_ITEM_ID',			'left');
		GridObj.SetColCellAlign('CONS_ITEM_NAME',		'left');		
		GridObj.SetColCellAlign('MEINS',				'center');
		GridObj.SetColCellAlign('REQ_QTY',				'right'); 
		GridObj.SetColCellAlign('TOT',					'right');
		GridObj.SetColCellAlign('CONV_QTY',				'right');		
		GridObj.SetColCellAlign('WAERS',				'center');
		GridObj.SetColCellAlign('PEINH',				'right');
		GridObj.SetColCellAlign('NETPR',				'right');
		GridObj.SetColCellAlign('PAY',					'right');		
		GridObj.SetColCellAlign('QTY1',					'right');
		GridObj.SetColCellAlign('QTY2',					'right');
		GridObj.SetColCellAlign('QTY3',					'right');
		GridObj.SetColCellAlign('QTY4',					'right');
		GridObj.SetColCellAlign('QTY5',					'right');
		GridObj.SetColCellAlign('QTY6',					'right');
		GridObj.SetColCellAlign('QTY7',					'right');		
		GridObj.SetColCellAlign('COM_STOCK',			'right');		
		GridObj.SetColCellAlign('PROD_CUST_NAME',		'left');				 
		  
		GridObj.SetNumberFormat("REQ_QTY",      "###,###.###");
		GridObj.SetNumberFormat("TOT",      	"###,###.###");
		GridObj.SetNumberFormat("CONV_QTY",    	"###,###.###");		
		GridObj.SetNumberFormat("PEINH",      	    "###,###");
		GridObj.SetNumberFormat("NETPR",      	    "###,###");
		GridObj.SetNumberFormat("PAY",    		"###,###.###");		
		GridObj.SetNumberFormat("QTY1",      	"###,###.###");
		GridObj.SetNumberFormat("QTY2",      	"###,###.###");
		GridObj.SetNumberFormat("QTY3",      	"###,###.###");
		GridObj.SetNumberFormat("QTY4",      	"###,###.###");
		GridObj.SetNumberFormat("QTY5",      	"###,###.###");
		GridObj.SetNumberFormat("QTY6",      	"###,###.###");
		GridObj.SetNumberFormat("QTY7",      	"###,###.###");		    
		GridObj.SetNumberFormat("COM_STOCK",	"###,###.###");	
		
}
		
	
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader2(GridObj2) {        

	var item_id 	= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;

		GridObj2.AddHeader("GUBN"			,"欽絮"   			,"t_text" 		,2			,30  	,false); //0
		GridObj2.AddHeader("SELECTED"		,""   				,"t_checkbox" 	,2			,30  	,true); //0
		GridObj2.AddHeader("CONS_ITEM_ID"	,"濠營囀萄"		    ,"t_text"		,100	    ,60     ,false); //0   
		GridObj2.AddHeader("CONS_ITEM_NAME"	,"濠營貲"	       		,"t_text"		,100	    ,190    ,false); //0
		GridObj2.AddHeader("MEINS"			,"欽嬪"   			,"t_text"		,100	    ,35     ,false); //0		 	
		GridObj2.AddHeader("REQ_QTY"	    ,"繭模蹂榆"	        ,"t_number"    ,100.3		,70     ,false); //0
		GridObj2.AddHeader("TOT"	    	,"營堅熱榆"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("CONV_QTY"	    ,"夢蝶�粉�"	        ,"t_number"	   ,100.3		,70     ,false); //0		
		GridObj2.AddHeader("PEINH"	    	,"陛問\n欽嬪"	        ,"t_number"	   ,100.3		,50     ,false); //0
		GridObj2.AddHeader("NETPR"	    	,"欽陛"	       	    ,"t_number"	   ,100.3		,55     ,false); //0
		GridObj2.AddHeader("WAERS"	    	,"鱔�倩�"		        ,"t_text"	   ,100			,50     ,false); //0
		GridObj2.AddHeader("PAY"			,"旎擋"				,"t_number"	   ,100.3		,85     ,false); //0				
		GridObj2.AddHeader("QTY1"	    	,"寰曄"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY2"	    	,"寰撩"	   		    ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY3"	    	,"寰撩(擠猿)"	        ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY4"	    	,"嬴骯"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY5"	    	,"掘嘐"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY6"	    	,"睡骯"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("QTY7"	    	,"喬骯"	       		,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("COM_STOCK"	    ,"啗翮餌\n營堅"	   ,"t_number"	   ,100.3		,70     ,false); //0
		GridObj2.AddHeader("PROD_CUST_NAME"	,"奢晝機羹"	       	,"t_text"		,1000	    ,190    ,false); //0		
		
		/* 盪濰擊 嬪и �鰽� 高 */
		
		GridObj2.BoundHeader();	
		
		GridObj2.SetColFix('CONS_ITEM_NAME');
		
		GridObj2.SetColCellAlign('GUBN',			  'center');
		GridObj2.SetColCellAlign('CONS_ITEM_ID',		'left');
		GridObj2.SetColCellAlign('CONS_ITEM_NAME',	    'left');
		GridObj2.SetColCellAlign('MEINS',			  'center');
		GridObj2.SetColCellAlign('REQ_QTY',			   'right'); 
		GridObj2.SetColCellAlign('TOT',			       'right');
		GridObj2.SetColCellAlign('CONV_QTY',		   'right');
		GridObj2.SetColCellAlign('WAERS',			  'center');
		GridObj2.SetColCellAlign('PEINH',			   'right');
		GridObj2.SetColCellAlign('NETPR',       	   'right');
		GridObj2.SetColCellAlign('PAY',        		   'right');		
		GridObj2.SetColCellAlign('QTY1',        	   'right');
		GridObj2.SetColCellAlign('QTY2',        	   'right');
		GridObj2.SetColCellAlign('QTY3',        	   'right');
		GridObj2.SetColCellAlign('QTY4',        	   'right');
		GridObj2.SetColCellAlign('QTY5',        	   'right');
		GridObj2.SetColCellAlign('QTY6',        	   'right');
		GridObj2.SetColCellAlign('QTY7',        	   'right');
		GridObj2.SetColCellAlign('PROD_CUST_NAME',	    'left');		
		GridObj2.SetColCellAlign('COM_STOCK',          'right');
		  
		
		GridObj2.SetNumberFormat("REQ_QTY",				"###,###.###");
		GridObj2.SetNumberFormat("TOT",					"###,###.###");
		GridObj2.SetNumberFormat("CONV_QTY",			"###,###.###");		
		GridObj2.SetNumberFormat("PEINH",					"###,###");
		GridObj2.SetNumberFormat("NETPR",					"###,###");
		GridObj2.SetNumberFormat("PAY",				"###,###,###.###");		
		GridObj2.SetNumberFormat("QTY1",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY2",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY3",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY4",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY5",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY6",			"###,###,###.###");
		GridObj2.SetNumberFormat("QTY7",			"###,###,###.###");		    
		GridObj2.SetNumberFormat("COM_STOCK",		"###,###,###.###");
}
	

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() {
	
	var mode		= GridObj.GetParam("mode");
	var error_msg	= '';
	
	
	if(mode == "search") {
		if(GridObj.GetStatus() == "true") {
					
					for(var i=0;i<GridObj.GetRowCount();i++) {
								
								GridObj.SetCellBgColor('GUBN',    			i, '255|253|208');
								GridObj.SetCellBgColor('CONS_ITEM_ID',    	i, '255|253|208');	
								GridObj.SetCellBgColor('CONS_ITEM_NAME',    i, '255|253|208');
								GridObj.SetCellBgColor('MEINS', 			i, '255|253|208');
								GridObj.SetCellBgColor('REQ_QTY', 			i, '255|253|208');
								GridObj.SetCellBgColor('TOT', 				i, '255|253|208');								
								GridObj.SetCellBgColor('CONV_QTY', 			i, '255|253|208');								
								GridObj.SetCellBgColor('PEINH', 			i, '255|253|208');
								GridObj.SetCellBgColor('NETPR', 			i, '255|253|208');
								GridObj.SetCellBgColor('WAERS', 			i, '255|253|208');
								GridObj.SetCellBgColor('PAY', 				i, '255|253|208');								
								GridObj.SetCellBgColor('QTY1', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY2', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY3', 				i, '255|253|208');								
								GridObj.SetCellBgColor('QTY4', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY5', 				i, '255|253|208');
								GridObj.SetCellBgColor('QTY6', 				i, '255|253|208');								
								GridObj.SetCellBgColor('QTY7', 				i, '255|253|208');								
								GridObj.SetCellBgColor('COM_STOCK',    		i, '255|253|208');
								GridObj.SetCellBgColor('PROD_CUST_NAME',    i, '255|253|208');
								
					}

                GridObj.AddSummaryBar('SUMMARY1', '瞪羹м啗', 'summaryall', 'sum', 'PAY,QTY1,QTY2,QTY3,QTY4,QTY5,QTY6,QTY7,COM_STOCK');
         	    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot); 
					
		} else { 
					error_msg = GridObj.GetMessage(); 
					alert(error_msg);            
			   }
	
	}
}

function GridEndQuery2() {
	
	var mode		= GridObj2.GetParam("mode");
	var error_msg	= '';
	          
	if(mode == "search2") {
		if(GridObj2.GetStatus() == "true") {

					for(var i=0;i<GridObj2.GetRowCount();i++) {

								GridObj2.SetCellBgColor('GUBN',    			i, '255|253|208');
								GridObj2.SetCellBgColor('CONS_ITEM_ID',    	i, '255|253|208');	
								GridObj2.SetCellBgColor('CONS_ITEM_NAME',   i, '255|253|208');
								GridObj2.SetCellBgColor('MEINS', 			i, '255|253|208');
								GridObj2.SetCellBgColor('REQ_QTY', 			i, '255|253|208');
								GridObj2.SetCellBgColor('TOT', 				i, '255|253|208');
								GridObj2.SetCellBgColor('CONV_QTY', 		i, '255|253|208');									
								GridObj2.SetCellBgColor('PEINH', 			i, '255|253|208');
								GridObj2.SetCellBgColor('NETPR', 			i, '255|253|208');
								GridObj2.SetCellBgColor('WAERS', 			i, '255|253|208');
								GridObj2.SetCellBgColor('PAY', 				i, '255|253|208');
								GridObj2.SetCellBgColor('QTY1', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY2', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY3', 			i, '255|253|208');	
								GridObj2.SetCellBgColor('QTY4', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY5', 			i, '255|253|208');
								GridObj2.SetCellBgColor('QTY6', 			i, '255|253|208');	
								GridObj2.SetCellBgColor('QTY7', 			i, '255|253|208');
								GridObj2.SetCellBgColor('COM_STOCK',    	i, '255|253|208');
								GridObj2.SetCellBgColor('PROD_CUST_NAME',   i, '255|253|208');
								
					}

			                GridObj2.AddSummaryBar('SUMMARY2', '瞪羹м啗', 'summaryall', 'sum', 'PAY,QTY1,QTY2,QTY3,QTY4,QTY5,QTY6,QTY7,COM_STOCK');
			         	    GridObj2.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 
 
		} else { 
					error_msg = GridObj2.GetMessage(); 
					alert(error_msg);            
			   }
	}
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
               
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  function GoSearch(service){
    
	GridObj = document.WiseGrid;
	GridObj.ClearGrid();	
	setHeader(GridObj);    
	
	GridObj2.ClearGrid();	
	setHeader(GridObj2)
	
	doQuery();
	
	
    
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
 
   

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var item_id	    	= document.all.item_id.value;   
       var item_name	    = document.all.item_name.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
		GridObj.SetParam("mode",			 "search");
		GridObj.SetParam("item_id",        item_id);
		GridObj.SetParam("item_name",	item_name);
		
       
	   GridObj.DoQuery(servlet_url);       
   }
   
   function doQuery2(cons_item_id) 
   {
	
       var item_id	    	= document.all.item_id.value;   
       var item_name	    = document.all.item_name.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj2.SetParam("mode",				 "search2");
	   GridObj2.SetParam("item_id",      		   item_id);
	   GridObj2.SetParam("item_name",  			 item_name);
	   GridObj2.SetParam("cons_item_id",      cons_item_id);
	   GridObj2.DoQuery(servlet_url);       
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 2 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )

// 撚 盪濰 瞪羲滲熱
var objTdG;


// 陳瞼 匐儀 POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;	
}

// 陳瞼 匐儀 POP BTN mouseOut
function outBtn( objBtn ) {
	clickedDateIdx = null;	
}

// 薯ヶ 殮溘璽縑 殮溘и 高婁 橾纂ж朝 薯ヶ 匐餌 ��, 橾纂ж朝 薯ヶ檜 氈戲賊 薯ヶ 囀萄, 薯ヶ 貲 ル衛
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

// 薯ヶ 匐儀 popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup 璽曖 input box ル衛 data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}


function excelUpload(){
	
	var service_url = "service.do?_moon_service=op_02030_Material_Refreshing_List_excel_reg_pop";  
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=450, top=200, left=200";
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}

function GridChangeCell(){ //偃羹陛 橈棻朝 螃盟 п唸 掘僥(Service.do)
	
}

function GridCellClick(){ //偃羹陛 橈棻朝 螃盟 п唸 掘僥(Service.do)
	
}


function Dtl_Search(){ //	鼻撮褻��
	
	var cons_item_id="";
	var check_cnt = 0;
	
	for(var i=0;i<GridObj.GetRowCount();i++ ) {
		var chk_idx = GridObj.GetCellValue("SELECTED", i);
	
		if(chk_idx=="1"){
			check_cnt ++;
			if(check_cnt == 1){  // 譆蟾煎 摹鷗脹 煎辦蒂 虜陬擊 陽
				cons_item_id		= GridObj.GetCellvalue('CONS_ITEM_ID',    	i);
			}
			else {
				cons_item_id	+=	','+GridObj.GetCellvalue('CONS_ITEM_ID',    i);
			}
					
		}else{
			
		}
	}
doQuery2(cons_item_id);					

}

					
// 鏽歲 蹴模 & �挫�
function colExtension(obj){
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetColWidth('QTY1')== 40){// true => 獗梯 鼻鷓
		obj.value = "蹴模";
		// 獗梯 賅萄 п薯
		
		GridObj.SetColWidth("QTY1", 		70);
		GridObj.SetColWidth("QTY2", 		70);		
		GridObj.SetColWidth("QTY3", 		70);
		GridObj.SetColWidth("QTY4", 		70);
		GridObj.SetColWidth("QTY5", 		70);		
		GridObj.SetColWidth("QTY6", 		70);
		GridObj.SetColWidth("QTY7", 		70);
		GridObj.SetColWidth("COM_STOCK",	70);
		
		GridObj.ClearSummaryBar();
		GridObj.ClearGroupMerge();

	}
	else{
		obj.value = "�捎�";
		//獗梯賅萄
		
		GridObj.SetColWidth("QTY1", 		40);
		GridObj.SetColWidth("QTY2", 		40);		
		GridObj.SetColWidth("QTY3", 		40);
		GridObj.SetColWidth("QTY4", 		40);
		GridObj.SetColWidth("QTY5", 		40);		
		GridObj.SetColWidth("QTY6", 		40);
		GridObj.SetColWidth("QTY7", 		40);
		GridObj.SetColWidth("COM_STOCK",	40);
		
	}

	if(GridObj2.GetColWidth('QTY1')== 40){// true => 獗梯 鼻鷓
		obj.value = "蹴模";
		// 獗梯 賅萄 п薯
		
		GridObj2.SetColWidth("QTY1",		70);
		GridObj2.SetColWidth("QTY2",		70);		
		GridObj2.SetColWidth("QTY3",		70);
		GridObj2.SetColWidth("QTY4",		70);
		GridObj2.SetColWidth("QTY5",		70);		
		GridObj2.SetColWidth("QTY6",		70);
		GridObj2.SetColWidth("QTY7",		70);
		GridObj2.SetColWidth("COM_STOCK",	70);
		
		GridObj2.ClearSummaryBar();
		GridObj2.ClearGroupMerge();
		
	}
	else{
		obj.value = "�捎�";
		//獗梯賅萄
		
		GridObj2.SetColWidth("QTY1", 		40);
		GridObj2.SetColWidth("QTY2", 		40);		
		GridObj2.SetColWidth("QTY3", 		40);
		GridObj2.SetColWidth("QTY4", 		40);
		GridObj2.SetColWidth("QTY5", 		40);		
		GridObj2.SetColWidth("QTY6", 		40);
		GridObj2.SetColWidth("QTY7", 		40);
		GridObj2.SetColWidth("COM_STOCK",	40);
	}


}
					
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid; 
       GridObj.ExcelExport("", "", true, true);
   }					
					
