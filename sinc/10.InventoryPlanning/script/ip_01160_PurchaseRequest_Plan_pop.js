//## Щ煎斜極ID      : ip_01160_PurchaseRequest_Plan_pop.js
//## Щ煎斜極貲      : 嫦輿啗�� 盪濰頂羲 褻�� で機
//## 滲唳濠濠        : 檜鬼遵
//## 偃嫦橾濠        : 2015-06-22
//##
//## 婦溼 job file   : job_sinc_10_inventoryPlanning_07.xml
//## 婦溼 query file : query_sinc_10_inventoryPlanning_07.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-06-22  檜鬼遵      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'ip_01160_PurchaseRequest_Plan_pop';

var GridObj ; 													// WiseGrid 偌羹
var color_tot 		 = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';			//塭檣 摹鷗 寡唳儀 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';
var flag;


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

	//GridObj.bRowSelectorVisible = false;        		//煎辦 撚滓攪蒂 WiseGrid縑憮 獗曹棻,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector 艙羲縑 Row Index蒂 爾罹遽棻.

    GridObj.nHDLineSize         = 10; //Header Size
     
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;   
    
    
    
   
    //摹鷗脹 撚曖 旋濠儀 雖薑и棻.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag煎 摹鷗脹 撚曖 寡唳儀鼻擊 滲唳й 熱 氈棻
	GridObj.strActiveRowBgColor    = "232|245|213";    //摹鷗脹 ч曖 寡唳儀鼻擊 撲薑и棻.	
    GridObj.strHDClickAction 	   = "select";        	//贗葛и 鏽歲曖 撚擊 摹鷗陛棟ж啪 и棻.
    GridObj.strMouseWheelAction='page';
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        
	
	var cnfm_date = document.frm.cnfm_date.value;
	var item_id = document.frm.item_id.value;		
	
	
	commonUtil.getSelQeury( "cnfm_date!%!item_id", cnfm_date+"!%!"+item_id, "ip_01160_PurchaseRequest_Plan_pop_header",{
	callback:function(result){
			
			flag = result[0][2];
			GridObj.AddHeader("GUBN"	       	   ,"掘碟"			,"t_text"	   	,100	    ,80      	,false); //0
	
			for(var i=0 ; i < 31 ; i++){  
				if(i <= flag) {
					GridObj.AddHeader(result[i][1]	,result[i][0]       	,"t_number" ,100.3	,90  	,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 31) { //11
						GridObj.AddHeader(result[i][1]	,result[i][0]     	,"t_number" ,100.3	,0  	,false);
					}
					else {
						GridObj.AddHeader(result[i][1]	,result[i][0]       ,"t_number" ,100.3	,0 	,false);
					}
				}
			}
			
			
			GridObj.AddHeader("TOT"	       	,"啗"	    	,"t_number"    	,100.3		,50     	,false); //0
 			GridObj.AddHeader("GAP"	        ,"螃離徽"   		,"t_text"     	,100		,60     	,false); //0
 			GridObj.AddHeader("TERM"	    ,"晦除"   		,"t_text"     	,100		,0     	,false); //0
			
			GridObj.BoundHeader();	
			
			doQuery(); 
		   
		    GridObj.SetColCellAlign('GAP',          'right');		
		    GridObj.SetColCellAlign('GUBN',          'left');		    
			
			GridObj.SetColFix('GUBN'); 
		}
		
	});   
	


//    GridObj.SetNumberFormat("WEEK_0",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_1",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_2",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_3",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_4",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_5",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_6",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_7",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_8",  	"###,###.#");
//    GridObj.SetNumberFormat("WEEK_9",  	"###,###.#");
//    GridObj.SetNumberFormat("TOT",  	"###,###.#");
//    GridObj.SetNumberFormat("GAP",      "###,###.#");    
    
	

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
            	            
           		GridObj.SetGroupMerge('GAP');
           		SetGap();
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
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
   function GoSearch(service) 
   {
    	
    	doQuery();
    
   }

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛ж睡 斜葬萄 褻�� WD1 渦綰贗葛
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
	function GoSave(service) {	
	
	};


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DW 1 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
   	   var cnfm_date	    = document.frm.cnfm_date.value;
       var item_id	    	= document.frm.item_id.value; 
	   var user_id			= document.frm._user_id.value;
       
              	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
      //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("item_id",   		item_id);
       GridObj.SetParam("cnfm_date",       cnfm_date);
      
	   GridObj.SetParam("user_id", 			user_id);	   
	   GridObj.DoQuery(servlet_url);       
   }


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

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
	function GridCellClick(strColumnKey, nRow) {
	
	}		

	


	function SetGap(){
		
		var tot   = 0;
		var tot_1 = 0;
		var tot_2 = 0;
		var term = GridObj.GetCellValue('TERM',0);
		var array = new Array();
		var array_sub = new Array();
		
		/* っ衙榆 牖憮 纂�� - I */
		for(var i =0; i <term; i++){
			
			var hd_name = 'WEEK_'+i;
			array[i] = GridObj.GetCellValue(hd_name,1);
			array_sub[term-i-1] = array[i];
			
						
		}
		
		/* っ衙榆 牖憮 纂�� - II*/		
		for(var i =0;i <term; i++){
			
			var hd_name = 'WEEK_'+i;
			
			GridObj.SetCellValue(hd_name,1,array_sub[i]);
						
		}
		
		/* 離檜榆 啗骯 */		
		for(var i =0;i <term; i++){
			
			var hd_name = 'WEEK_'+i;
			var expt    = GridObj.GetCellValue(hd_name,0);
			var sale    = GridObj.GetCellValue(hd_name,1);		
			
			GridObj.SetCellValue(hd_name,2,expt-sale);
						
		}
		
		/* 啗 啗骯 */
		for(var i =0; i < term; i++){
			
			var hd_name = 'WEEK_'+i;
			tot   += Number(GridObj.GetCellValue(hd_name,0));
			tot_1 += Number(GridObj.GetCellValue(hd_name,1));
			tot_2 += Number(GridObj.GetCellValue(hd_name,2));
			
		}
		GridObj.SetCellValue('TOT',0,tot  );
		GridObj.SetCellValue('TOT',1,tot_1);
		GridObj.SetCellValue('TOT',2,tot_2);
		
		var gap_expect 	= GridObj.GetCellValue('TOT',0);
		var gap_real 	= GridObj.GetCellValue('TOT',2);
		var result		= Math.round((gap_real /gap_expect)*1000/10);
		result += '%';
		
		GridObj.SetCellValue('GAP',0,result);
		GridObj.SetCellValue('GAP',1,result);
		GridObj.SetCellValue('GAP',2,result);
		
	}


