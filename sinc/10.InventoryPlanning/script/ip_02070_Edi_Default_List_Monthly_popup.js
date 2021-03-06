//## Щ煎斜極ID		:	ip_02070_Edi_Default_List_excel_reg_pop.js
//## Щ煎斜極貲		:	嶸鱔獄睡 嘐陶 碟戮 縈撚 機煎萄 
//## 偃嫦濠          :	掏辨雙 
//## 偃嫦橾濠       	:	2011-02-16
//##
//## 婦溼 job file   : ip_02070_Edi_Default_List_excel_reg_pop.xml.xml
//## 婦溼 query file : ip_02070_Edi_Default_List_excel_reg_pop.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2011-02-16  掏辨雙      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_02070_Edi_Default_List_Monthly_popup';
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
	setDefault(GridObj);
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault() { 

    GridObj.nHDLineSize         = 20; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";   
 	GridObj.strActiveRowBgColor = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'   

   //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   

	// Header Font Setting
	GridObj.strHDFontName = '蜈擎 堅蛐';
	GridObj.nHDFontSize = 10;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

 
}
     
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	GridObj.AddHeader("CNFM_DATE"			,"橾濠"       	,"t_text" 	,100    ,99  ,false);
 	GridObj.AddHeader("EDI_AMOUNT"			,"嫦輿旎擋"		,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("EDI_AMOUNT_SUM"		,"嫦輿旎擋\n援啗"	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("DEFAULT_AMOUNT"		,"嘐陶旎擋"		,"t_number" ,20.3	,90 ,false); //0   
 	GridObj.AddHeader("CUST_DEFAULT"		,"剪楚籀螃盟"     ,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("NS_DEFAULT"			,"堯褕嘐陶"     	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("NS_DEFAULT_SUM"		,"堯褕嘐陶\n援啗" 	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("PENALTY_AMOUNT_3"	,"む割じ旎擋\n(3%)"  ,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("PENALTY_AMOUNT_5"	,"ぬ割じ旎擋\n(5%)"  ,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("DEFAULT_RATE"		,"嘐陶徽"     	,"t_number" ,20.3	,60  ,false); //0   
 	GridObj.AddHeader("DEFAULT_RATE_SUM"	,"嘐陶徽\n援啗"   ,"t_number" ,20.3	,60  ,false); //0   
 	GridObj.AddHeader("KAL_DEFAULT"			,"騷煎斜餌\n螃盟"	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("MJ_DEFAULT"			,"敝疇\n嘐�挨�"	,"t_number" ,20.3	,90  ,false); //0   
	GridObj.BoundHeader();	

	GridObj.SetColFix('CNFM_DATE');

    GridObj.SetColCellAlign('CNFM_DATE','center'); 
    //GridObj.SetColCellAlign('CUST_STORE_CODE','center'); 
    //GridObj.SetColCellAlign('CUST_STORE_NAME','center');
    //GridObj.SetColCellAlign('CUST_ITEM_ID','center'); 
    //GridObj.SetColCellAlign('EDI_GUBN','center'); 



	//GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	GridObj.SetNumberFormat("EDI_AMOUNT"  		, "#,##0.###");  
	GridObj.SetNumberFormat("EDI_AMOUNT_SUM"  	, "#,##0.###");  
	GridObj.SetNumberFormat("DEFAULT_AMOUNT"  	, "#,##0.###");  
	GridObj.SetNumberFormat("CUST_DEFAULT"  	, "#,##0.###");  
	GridObj.SetNumberFormat("NS_DEFAULT"  		, "#,##0.###");  
	GridObj.SetNumberFormat("NS_DEFAULT_SUM"  	, "#,##0.###");  
	GridObj.SetNumberFormat("PENALTY_AMOUNT_3"  , "#,##0.###");  
	GridObj.SetNumberFormat("PENALTY_AMOUNT_5"	, "#,##0.###");
	GridObj.SetNumberFormat("DEFAULT_RATE", "#,##0.###");
	GridObj.SetNumberFormat("DEFAULT_RATE_SUM", "#,##0.###");  
	GridObj.SetNumberFormat("KAL_DEFAULT", "#,##0.###");  
	

	//Hidden 鏽歲  
	//GridObj.SetColHide("CRUD",true);
	
	GoSearch(); 
}

   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
    doQuery();
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var cnfm_date	=document.frm.cnfm_date.value;

	//alert(cnfm_date);

	   
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("cnfm_date", cnfm_date);
	   
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
}

// 盪濰
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
};

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");
    var cnfm_date		= GridObj.GetCellValue("CNFM_DATE", 1);	
    var error_msg = '';
      
    if(endMode == "search"||endMode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {                           
                 cal_dw()
			GridObj.AddSummaryBar('SUMMARY', 'м啗', 'summaryall', 'sum', 'EDI_AMOUNT,DEFAULT_AMOUNT,CUST_DEFAULT,NS_DEFAULT,KAL_DEFAULT,PENALTY_AMOUNT_3,PENALTY_AMOUNT_5');
		  	GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot);                  
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else{

    }	

	
}
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {

}	


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW  翱骯
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function cal_dw() {
	
	var i= 0; 
	 
	var edi_amount		= 0;
	var edi_amount_sum	= 0;
	var default_amount	= 0;
	var ns_default		= 0;
	var ns_default_sum	= 0;
    var default_rate	=0;
    var default_rate_sum=0;
    
    var penalty_amount_3	=0;
	var penalty_amount_5	=0;    
	
	
		edi_amount		= Number(GridObj.GetCellValue("EDI_AMOUNT", 0));
		edi_amount_sum	= Number(GridObj.GetCellValue("EDI_AMOUNT_SUM", 0));
		
		ns_default		= Number(GridObj.GetCellValue("NS_DEFAULT", 0));
		ns_default_sum	= Number(GridObj.GetCellValue("NS_DEFAULT_SUM", 0));
		
		default_rate	= Number(GridObj.GetCellValue("DEFAULT_RATE", 0));
		default_rate_sum= Number(GridObj.GetCellValue("DEFAULT_RATE_SUM", 0));
		
		edi_amount_sum	= edi_amount_sum+edi_amount;
		GridObj.SetCellValue("EDI_AMOUNT_SUM", i,  edi_amount_sum);
		
		ns_default_sum	= ns_default_sum+ns_default;
		GridObj.SetCellValue("NS_DEFAULT_SUM", i,  ns_default_sum);
		
		default_rate_sum = Math.round(((ns_default_sum/edi_amount_sum)*100)*10)/10;
		GridObj.SetCellValue("DEFAULT_RATE_SUM", i,  default_rate_sum);
		
		penalty_amount_3 = Math.round(ns_default*0.03);
		GridObj.SetCellValue("PENALTY_AMOUNT_3", i,  penalty_amount_3);
		
		penalty_amount_5 = Math.round(ns_default*0.05);
		GridObj.SetCellValue("PENALTY_AMOUNT_5", i,  penalty_amount_5);

		
	for(var i=1;i<GridObj.GetRowCount();i++){
		
		edi_amount		= Number(GridObj.GetCellValue("EDI_AMOUNT", i));
		edi_amount_sum	= edi_amount_sum+edi_amount;
		GridObj.SetCellValue("EDI_AMOUNT_SUM", i,  edi_amount_sum);	

		ns_default		= Number(GridObj.GetCellValue("NS_DEFAULT", i));
		ns_default_sum	= ns_default_sum+ns_default;
		GridObj.SetCellValue("NS_DEFAULT_SUM", i,  ns_default_sum);	

		default_rate_sum = Math.round(((ns_default_sum/edi_amount_sum)*100)*10)/10;
		GridObj.SetCellValue("DEFAULT_RATE_SUM", i,  default_rate_sum);

		penalty_amount_3 = Math.round(ns_default*0.03);
		GridObj.SetCellValue("PENALTY_AMOUNT_3", i,  penalty_amount_3);
		
		penalty_amount_5 = Math.round(ns_default*0.05);
		GridObj.SetCellValue("PENALTY_AMOUNT_5", i,  penalty_amount_5);


		//next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
	}
}
	
