//############################################################
//## Щ煎斜極ID      : sc_13020_set_prod_mst.vm
//## Щ煎斜極貲      : 嶸鱔陛奢 儅骯螃渦 婦葬
//## 偃嫦濠          : 掏辨雙
//## 偃嫦橾濠        : 2009-07-20
//##
//## 婦溼 job file   : job_sinc_20_scheduling_04.xml
//## 婦溼 query file : query_sinc_20_scheduling_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-20  陴錠辨      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/


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


//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//
//var mode;														// WiseGrid 鱔褐 衛 瞪歎 賅萄(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 憮綰葩 ぬ酈雖(class だ橾 唳煎)
var job_id = 'sc_13060_set_bom_mst';
var GridObj ; 													// WiseGrid 偌羹
var GridObj2;
var GridObj3;

var color_tot = '234|234|234';			//м啗 塭檣 寡唳儀
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//鏽歲 掘碟摹 寡唳儀
var color_select_row = '141|232|141';	//塭檣 摹鷗 寡唳儀
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

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

    GridObj.nHDLineSize         = 16; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
    
    //④渦曖 塭檣熱蒂 撲薑и棻. 
    GridObj.nHDLines = 2;       
    
    /* SetGroupMerge */
	//GridObj.bHDMoving = false 
	//GridObj.bHDSwapping = false 
	GridObj.bRowSelectorVisible = false 
	GridObj.strRowBorderStyle = 'none' 
	GridObj.nRowSpacing = 0 
	GridObj.strHDClickAction = 'select' 
	
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'
    
    
    
}

       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("CRUD"			,"CRUD"       	,"t_text" 	,100    ,0  ,false);
 	GridObj.AddHeader("ITYPE"			,"艙機識婪"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("DIVISION"		,"CM"   		,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("SALES_CAT01"		,"艙機ヶ謙1"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("SALES_CAT02"		,"艙機ヶ謙2"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("ITEM_ID"			,"ヶ跡囀萄"   	,"t_text" 	,20		,70  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"ヶ跡貲"   		,"t_text" 	,500	,180 ,false); //0   
 	GridObj.AddHeader("SPEC"			,"敘問"   		,"t_text" 	,20		,90  ,false); //0   

 	GridObj.AddHeader("SEQ"				,"SEQ"   		,"t_text" 	,20		,40  ,false); //0   
 	GridObj.AddHeader("SEQ_GUBN"		,"掘撩ヶ貲"   	,"t_text" 	,20		,110   ,false); //0   
 	GridObj.AddHeader("BASE_UOM"		,"晦獄欽嬪"   	,"t_text" 	,20		,70 ,false); //0   
 	GridObj.AddHeader("UNIT_COST"		,"欽陛"   		,"t_number" ,20.3	,80  ,true); //0   
 	
 	GridObj.AddHeader("REQ_QTY"			,"模蹂榆"   		,"t_number" ,20.4	,100  ,true); //0   
 	//GridObj.AddHeader("REQ_QTY"			,"模蹂榆"   		,"t_text" 	,20	,100  ,false); //0
 	
 	GridObj.AddHeader("MIN_LOT_SIZE"	,"譆模嫦輿榆"   	,"t_number" ,20.3	,90  ,true); //0
 	GridObj.AddHeader("LOT_SIZE"		,"嫦輿欽嬪"   	,"t_number" ,20.3	,60  ,true); //0   
 	GridObj.AddHeader("LEAD_TIME"		,"葬萄顫歜"   	,"t_number" ,20.3	,60  ,true); //0   
 	GridObj.AddHeader("CUST_CODE"		,"奢晝機羹"   	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"奢晝機羹"   	,"t_text" 	,20		,80  ,false); //0
 	GridObj.AddHeader("SAFETY_STOCK"	,"寰瞪營堅"   	,"t_number" ,20.3	,70  ,true); //0   
	



	
	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD");  // AD諦 DE陛 撢た 腆 唳辦朝 橈棻.
	
	//GridObj.SetColFix('SPEC');
	GridObj.SetColFix('SEQ_GUBN');

	GridObj.SetNumberFormat("UNIT_COST", "###,###,##");
	GridObj.SetNumberFormat("REQ_QTY", "###,###,####0");
	GridObj.SetNumberFormat("UNIT_COST", "###,###,######");

	
	GridObj.SetColCellAlign('ITEM_ID','center');
	
	
	

	//Hidden 鏽歲  
	GridObj.SetColHide("CRUD",true);
       
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch() 
   {
       doQuery();
   }
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSave  (service) {
	
	//alert("GoSave")
	//return;

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "CRUD");

}



      
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       
       var scm_charge	= document.all.scm_charge.value;
       var cm_gubn	= document.all.cm_gubn.value;
       var item_type	= document.all.item_type.value;
       
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("scm_charge", scm_charge);
       GridObj.SetParam("cm_gubn", cm_gubn);
       GridObj.SetParam("item_type", item_type);
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
	        	var row_cnt = GridObj.GetRowCount();
				var colBGColor='232|245|213';
				
				for( var i=0 ;i<row_cnt ;i++) //瞪羹 Row虜躑 奩犒 и棻.
		        {
		          // GridObj.SetCellBgColor("PROD_REQ_DATE", i, colBGColor); 
		        }
		        
				for(var i=0;i<GridObj.GetRowCount();i++) {
					// cell儀梃 滲唳
					GridObj.SetCellBgColor('REQ_QTY', i, '255|255|0'); 
					GridObj.SetCellBgColor('UNIT_COST', i, '255|255|0'); 
					GridObj.SetCellBgColor('MIN_LOT_SIZE', i, '255|255|0'); 
					GridObj.SetCellBgColor('LOT_SIZE', i, '255|255|0'); 
					GridObj.SetCellBgColor('LEAD_TIME', i, '255|255|0'); 

					GridObj.SetCellBgColor('SAFETY_STOCK', i, '255|255|0');
				}		        
				
				//GridObj.SetGroupMerge(	'ITEM_ID,ITEM_NAME,SPEC'); 
				GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,SPEC');
				
                                            
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
}
        }
        else if(endMode == "save") {
			if(GridObj.GetStatus() == "true") {// 
				GridObj.focus();		
			} else {
				var error_msg = GridObj.GetMessage();// 
				alert(error_msg);			
			}
			
			doQuery()   // 盪濰 諫猿�� 給嬴螢陽朝 �飛橉� 營褻�� и棻. 
        }
		
    }


function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  //pr_qty

//alert("strColumnKey+"+strColumnKey);
	//var oper_type	= GridObj.GetCellHiddenValue("OPER_TYPE", nRow); //GetCellHiddenValue  GetCellValue



}


function GoIf(){

	
	/*
	//EDIT_FLAG	        	               
	for(var i=0;i<GridObj.GetRowCount();i++) {
		if(GridObj.GetCellValue('EDIT_FLAG',i) == 'Y' ){  // GREEN
			alert("item_id"+GridObj.GetCellValue('EDIT_FLAG',i));
				
		}else{
			
		}  
	}	

	return;
	*/ 


	if(confirm("摹鷗 ж褐 ヶ跡曖 ERP 瞪歎擊 �挨匹牮簸睍懂炱�?") == 1 ) {
		
	}
	else{
		return;
	}	


	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	//var version		= document.all.version.value;
    
	//剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
	GridObj.SetParam("mode", "doIf");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	//GridObj.SetParam("version", version);
	
	//WiseGrid檜 憮幗諦 鱔褐衛縑 等檜攪蒂 瞪殖ж朝 詭憮萄殮棲棻. 鱔褐檜 撩奢ж賊 true蒂 奩�納桭炴�.
	GridObj.DoQuery(servlet_url, "SELECTED");


}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '蛔煙'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoReg  (service) {

		var item_id		= '';
		var item_name	= '';
		var wo_id		= '';
		var	idu_mode	='REG';
		//var week_flag	= document.frm.week_flag.value;


		//alert(document.frm.week_flag.value);

		var service_url = "service.do?_moon_service=sc_13060_set_bom_mst_reg_pop";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&wo_id=" + wo_id + "&idu_mode=" + idu_mode;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=790, height=430, top=200, left=200";
//	var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();

}
  


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� ヶ跡 廓�� 渦綰贗葛衛 ��轎(熱薑�飛�)
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function BomPopUp  (nRow) {
	
		var item_id		= GridObj.GetCellValue("ITEM_ID", nRow);
		var item_name	= GridObj.GetCellValue("ITEM_NAME", nRow);
		var qty			= '1';
		
        var prod_ver	= '';

//		var	idu_flag	= GridObj.GetCellValue("IDU_FLAG", nRow);
//		var	idu_mode	='MOD';
		//var week_flag	= document.frm.week_flag.value;  
	
		//alert(item_id);
		//alert(item_name);
	
		//alert(document.frm.week_flag.value);   
		
		var service_url = "service.do?_moon_service=sc_13020_set_prod_mst_bom_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name +"&prod_ver=" + prod_ver+ "&qty=" + qty;
		//service_url += "&if_flag=" + if_flag + "&if_msgs=" + if_msgs + "&prod_po=" + prod_po + "&idu_flag=" + idu_flag;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=430, top=200, left=200";
	//	var newWin = window.open(service_url, "sc_13010_set_prod_order_reg_pop", pop_win_style);
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();				
		  
		//alert("で機擊 嗨錶爾濠");
	
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 渦綰贗葛  檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellDblClick(strColumnKey, nRow) {

	if(strColumnKey =='ITEM_ID'||strColumnKey =='ITEM_NAME'){
		BomPopUp(nRow);
	}

}	


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow) {


}	


// 鏽歲 蹴模 & �挫�
function colExtension(obj){
	var GridObj = document.WiseGrid;
	
	if(GridObj.GetColWidth('ITYPE')== 8){// true => 獗梯 鼻鷓
		obj.value = "蹴模";
		// 獗梯 賅萄 п薯
		GridObj.SetColWidth("ITYPE", 60);
		GridObj.SetColWidth("DIVISION", 60);
		GridObj.SetColWidth("SALES_CAT01", 60);
		GridObj.SetColWidth("SALES_CAT02", 60);
		GridObj.ClearGroupMerge();
		GridObj.SetColFix('ITEM_NAME');
		GridObj.SetGroupMerge('ITYPE,DIVISION,SALES_CAT01,SALES_CAT02');
		
	}
	else{
		obj.value = "�捎�";
		//獗梯賅萄
		GridObj.SetColWidth("ITYPE", 8);
		GridObj.SetColWidth("DIVISION", 8);
		GridObj.SetColWidth("SALES_CAT01", 8);
		GridObj.SetColWidth("SALES_CAT02", 8);
		GridObj.ClearGroupMerge();
		GridObj.SetColFix('ITEM_NAME');
		GridObj.SetGroupMerge('ITYPE,DIVISION,SALES_CAT01,SALES_CAT02');


	}


}

    