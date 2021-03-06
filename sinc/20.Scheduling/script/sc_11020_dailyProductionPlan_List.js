/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//

var job_id = 'sc_11020_dailyProdectionPlan_List';
var GridObj;
var GridHeaderString = "";

var colorO = '188|210|238'; //翱濰
var colorF = '238|180|180'; //�瑑�
var color01 = '246|246|246'; // 掘碟摹, 模啗, 斬鼠ら撩檜 寰脹 shift 寡唳儀

/******************************************          Action Function         **********************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GoSearch(service){
   doQuery();
}

/*******************************************   WiseGrid 蟾晦�� 塽 撲薑  *****************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅ж朝 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function init(){
   GridObj = document.WiseGrid;
   setProperty(GridObj);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
   setDefault();        //�飛� 晦獄 撲薑 
   setHeader(GridObj);  //п渦儅撩 
   
}
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setDefault(){
	GridObj.strMouseWheelAction='page'; // page 欽嬪 scroll ->晦獄擎 'default'       

}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setHeader(GridObj){        
   commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader); 
       
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function defaultHeader(result){
   var test = '';
   var arrHeader = '';
   for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
   {
       arrHeader = result[i].split('!%!');
       GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,false);        
   }
   
   var param = "selected_date";
   var value = document.frm.selected_date.value;
   commonUtil.getCodeList(param, value, "daily_header_selected",dailyHeader); //陳瞼⑽ п渦蒂 虜菟橫 遽棻.
}
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛陳瞼 ⑽鷓曖 高擊 陛螳螃朝 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function dailyHeader(result){
   GridObj.AddHeader("SP00"			 ," "				 , "t_text"	  ,1   ,1  ,false);
   
   GridObj.AddHeader("D01A"          ,"褻"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D01B"          ,"輿"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D01C"          ,"撿"               , "t_number"   ,100.3  ,45 ,false);  
   
   GridObj.AddHeader("SP01"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
          
   GridObj.AddHeader("D02A"          ,"褻"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D02B"          ,"輿"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D02C"          ,"撿"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP02"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D03A"          ,"褻"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D03B"          ,"輿"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D03C"          ,"撿"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP03"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D04A"          ,"褻"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D04B"          ,"輿"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D04C"          ,"撿"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP04"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D05A"          ,"褻"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D05B"          ,"輿"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D05C"          ,"撿"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP05"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D06A"          ,"褻"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D06B"          ,"輿"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D06C"          ,"撿"               , "t_number"   ,100.3  ,45 ,false);         
   
   GridObj.AddHeader("SP06"			 ," "				 , "t_text"	  ,1   ,1  ,false); 
   
   GridObj.AddHeader("D07A"          ,"褻"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D07B"          ,"輿"               , "t_number"   ,100.3  ,45 ,false);         
   GridObj.AddHeader("D07C"          ,"撿"               , "t_number"   ,100.3  ,45 ,false);         
                                                               
   GridObj.AddHeader("CD01A"          ,"褻"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD01B"          ,"輿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD01C"          ,"撿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD02A"          ,"褻"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD02B"          ,"輿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD02C"          ,"撿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD03A"          ,"褻"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD03B"          ,"輿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD03C"          ,"撿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD04A"          ,"褻"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD04B"          ,"輿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD04C"          ,"撿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD05A"          ,"褻"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD05B"          ,"輿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD05C"          ,"撿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD06A"          ,"褻"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD06B"          ,"輿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD06C"          ,"撿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD07A"          ,"褻"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD07B"          ,"輿"               , "t_text"   ,100  ,45 ,true);         
   GridObj.AddHeader("CD07C"          ,"撿"               , "t_text"   ,100  ,45 ,true);         

   var dateArray = ''; //陳瞼Row蒂 '!%!'晦遽戲煎 寡翮擊 虜菟晦 嬪и 滲熱.
   var dayCount  = 1;  //陳瞼 牖嬪
      
   for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
   {       
        dateArray = '';
        dateArray = result[i].split('!%!'); //'!%!'煎 掘碟脹 等檜攪蒂 splitж罹 寡翮煎 盪濰и棻.
        
        //п渦 斜瑜儅撩
        GridObj.AddGroup("GRP_DATE"+dayCount,dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')');  //陳瞼 斜瑜
                        
        GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"A");
        GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"B");
        GridObj.AppendHeader("GRP_DATE"+dayCount,"D0"+dayCount+"C"); 
        dayCount++;
        
   }

      GridObj.BoundHeader()    
      
      //鏽歲 Format蒂 撲薑 и棻.
   GridObj.SetColCellAlign('ITEM_ID',  	'center');
   GridObj.SetNumberFormat("D01A",       "###,###");
   GridObj.SetNumberFormat("D01B",       "###,###");
   GridObj.SetNumberFormat("D01C",       "###,###");
   GridObj.SetNumberFormat("D02A",       "###,###");
   GridObj.SetNumberFormat("D02B",       "###,###");
   GridObj.SetNumberFormat("D02C",       "###,###");
   GridObj.SetNumberFormat("D03A",       "###,###");
   GridObj.SetNumberFormat("D03B",       "###,###");
   GridObj.SetNumberFormat("D03C",       "###,###");
   GridObj.SetNumberFormat("D04A",       "###,###");
   
   GridObj.SetNumberFormat("D04B",       "###,###");
   GridObj.SetNumberFormat("D04C",       "###,###");
   GridObj.SetNumberFormat("D05A",       "###,###");
   GridObj.SetNumberFormat("D05B",       "###,###");
   GridObj.SetNumberFormat("D05C",       "###,###");
   GridObj.SetNumberFormat("D06A",       "###,###");
   GridObj.SetNumberFormat("D06B",       "###,###");
   GridObj.SetNumberFormat("D06C",       "###,###");
   GridObj.SetNumberFormat("D07A",       "###,###");
   GridObj.SetNumberFormat("D07B",       "###,###");
   GridObj.SetNumberFormat("D07C",       "###,###");
   //п渦 Hidden
   GridObj.SetColHide("CRUD",true);
   GridObj.SetColHide("CD01A",true);
   GridObj.SetColHide("CD01B",true);
   GridObj.SetColHide("CD01C",true);
   GridObj.SetColHide("CD02A",true);
   GridObj.SetColHide("CD02B",true);
   GridObj.SetColHide("CD02C",true);
   GridObj.SetColHide("CD03A",true);
   GridObj.SetColHide("CD03B",true);
   GridObj.SetColHide("CD03C",true);
   GridObj.SetColHide("CD04A",true);
   GridObj.SetColHide("CD04B",true);
   GridObj.SetColHide("CD04C",true);
   GridObj.SetColHide("CD05A",true);
   GridObj.SetColHide("CD05B",true);
   GridObj.SetColHide("CD05C",true);
   GridObj.SetColHide("CD06A",true);
   GridObj.SetColHide("CD06B",true);
   GridObj.SetColHide("CD06C",true);
   GridObj.SetColHide("CD07A",true);
   GridObj.SetColHide("CD07B",true);
   GridObj.SetColHide("CD07C",true);
   

   GridObj.SetCRUDMode("CRUD", "蹺陛", "熱薑", "餉薯"); //熱薑,餉薯,蹺陛 掘碟 睡碟.
}               
               
/***********************************************   WiseGrid 鱔褐  **********************************************************/               
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function doQuery(){
    var servlet_url = Project_name+"/servlet/com.wisegrid.admin.sc_11020_dailyProductionPlan_List";
    
    //橾濠
    var selected_date = document.frm.selected_date.value;
    
    //橾奩/詩じ
//    var checked_multi = "";
//    if(document.all.checked_multi[0].checked) checked_multi='default';
//    if(document.all.checked_multi[1].checked) checked_multi='normal';
//    if(document.all.checked_multi[2].checked) checked_multi='visual';
//    if(document.all.checked_multi[3].checked) checked_multi='multi';
   
	//奢濰 囀萄
	var len = document.frm.selected_plant.length;
	var str = "";
	var cnt = 0;
	for( i = 0 ; i < len ; i++){
		if( document.frm.selected_plant[i].checked == true ){
			
			if( cnt > 0 ) str += "','";
			
			str += document.frm.selected_plant[i].value;		
			
			cnt++;	
		}
	}		
	if( cnt == 0 ){
		alert("摹鷗脹 奢濰檜 橈蝗棲棻!!");
		return;
	}		   
   
    //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
    GridObj.SetParam("mode", "search");
    GridObj.SetParam("selected_date", selected_date);
    GridObj.SetParam("checked_multi", "");
    GridObj.SetParam("plant_id", str);
    
    GridObj.DoQuery(servlet_url);

    //GridObj.ClearGrid() 
    //setHeader(GridObj);  //п渦儅撩 
}

/*******************************************   WiseGrid 鱔褐 ��  撲薑  ******************************************************/

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridEndQuery(){
	
	setGrid();
	
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
      
    var arrA = '';
    var arrB = '';
    var arrC = '';
    
    if(mode == "search") //褻�萼� 諫猿脹 唳辦
    {
        if(GridObj.GetStatus() == "true") 
        {                           
             GridObj.SetColCellAlign("D01A",'right');      
             GridObj.SetColCellAlign("D01B",'right');      
             GridObj.SetColCellAlign("D01C",'right');      
             GridObj.SetColCellAlign("D02A",'right');      
             GridObj.SetColCellAlign("D02B",'right');      
             GridObj.SetColCellAlign("D02C",'right');      
             GridObj.SetColCellAlign("D03A",'right');      
             GridObj.SetColCellAlign("D03B",'right');      
             GridObj.SetColCellAlign("D03C",'right');      
             GridObj.SetColCellAlign("D04A",'right');      
             GridObj.SetColCellAlign("D04B",'right');      
             GridObj.SetColCellAlign("D04C",'right');      
             GridObj.SetColCellAlign("D05A",'right');      
             GridObj.SetColCellAlign("D05B",'right');      
             GridObj.SetColCellAlign("D05C",'right');      
             GridObj.SetColCellAlign("D06A",'right');      
             GridObj.SetColCellAlign("D06B",'right');      
             GridObj.SetColCellAlign("D06C",'right');      
             GridObj.SetColCellAlign("D07A",'right');      
             GridObj.SetColCellAlign("D07B",'right');      
             GridObj.SetColCellAlign("D07C",'right');      
             
             // 橾濠 掘碟 醴歲 ら餵 彊腎啪 虞擠
            GridObj.SetColCellActivation('SP00','disable');
			GridObj.SetColCellActivation('SP01','disable');
			GridObj.SetColCellActivation('SP02','disable');
			GridObj.SetColCellActivation('SP03','disable');
			GridObj.SetColCellActivation('SP04','disable');
			GridObj.SetColCellActivation('SP05','disable');
			GridObj.SetColCellActivation('SP06','disable');			

			var rowLeng = GridObj.GetRowCount();
			if( rowLeng > 0 ){
				var proc_id = GridObj.GetCellHiddenValue("PROC_NAME", 0);
				
				var colBg01 = '255|252|192';
				var colBg02 = '255|255|255';
				var colBg = colBg01; //塭檣 掘碟 儀
				
				var onBg01 = '255|255|0';
				var onBg02 = '239|239|239';
				var onBg = onBg01; //翱濰 掘碟 儀
				
				var nonBg01 = '204|222|242';
				var nonBg02 = '239|239|239';
				var nonBg = nonBg01; // 斬鼠ら撩檜 寰脹 shift
				var colLen = GridObj.GetColCount();		
			
				var get_plant_id = '';
				var get_proc_id  = '';
				var get_item_id  = '';
				
				for( i = 0 ; i < rowLeng ; i++ ){
				    get_plant_id = GridObj.GetCellHiddenValue("PLANT_NAME",i);
			        get_proc_id  = GridObj.GetCellHiddenValue("PROC_NAME",i);
			        get_item_id  = GridObj.GetCellValue("ITEM_ID",i);

					//濛機濰滌 掘碟(row寡唳儀)
					if( proc_id != GridObj.GetCellHiddenValue("PROC_NAME", i) ){
						
						proc_id = GridObj.GetCellHiddenValue("PROC_NAME", i);
						if(colBg == colBg01) {
							colBg = colBg02;
							onBg = onBg02;
							nonBg = nonBg02;
						}
						else {
							colBg = colBg01;
							onBg = onBg01;
							nonBg = nonBg01;
						}
					}
					
					//var colLeng = GridObj.GetColCount();
					for( j = 0; j < 38; j++){ 
						// 鏽歲掘碟摹
						if(GridObj.GetColHDKey(j).substr(0,3) == "SP0"){
							GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, color01); 
						}
						else if(GridObj.GetColHDKey(j).substr(0,2) == "D0" && GridObj.GetCellHiddenValue("C"+GridObj.GetColHDKey(j),i) == "F"){
							GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colorF);							
						}
						// 翱濰 寡唳儀
						else if(GridObj.GetColHDKey(j).substr(0,2) == "D0" && GridObj.GetCellHiddenValue(GridObj.GetColHDKey(j),i) == "O"){
							GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, onBg);							
						}
						// 塭檣 掘碟 寡唳儀
						else{
							GridObj.SetCellBgColor(GridObj.GetColHDKey(j), i, colBg); 
						}
					}			
				} 
			}  
                                 
            //等檜攪蒂 斜瑜ё и棻.                                                     
            GridObj.SetGroupMerge("PLANT_NAME,PROC_NAME");                                                    
            
            for(var i=0 ;i<GridObj.GetRowCount() ;i++)
            {
                for(var j=1 ;j<=7 ;j++)
                {
                    arrA=GridObj.GetCellValue('CD0'+j+'A',i).split('_MSG_');
                    arrB=GridObj.GetCellValue('CD0'+j+'B',i).split('_MSG_');
                    arrC=GridObj.GetCellValue('CD0'+j+'C',i).split('_MSG_');
                    
                    //翱濰橾 唳辦 'O' 檜棻, 翱濰擎 鏽歲儀擊�蜓鶺虞� . �瑑螃� 唳辦 'F'
                    if(arrA[4]=='O') {
                    	GridObj.SetCellBgColor('D0'+j+'A',i,colorO) ; 
                    }else if(arrA[4]=='F'){
                    	GridObj.SetCellBgColor('D0'+j+'A',i,colorF) ; 
                    }
                    if(arrB[4]=='O') {
                    	GridObj.SetCellBgColor('D0'+j+'B',i,colorO) ;
                    }else if(arrB[4]=='F'){
                    	GridObj.SetCellBgColor('D0'+j+'B',i,colorF) ;
                    }
                    if(arrC[4]=='O') {
                    	GridObj.SetCellBgColor('D0'+j+'C',i,colorO) ;
                    }else if(arrC[4]=='F'){
                    	GridObj.SetCellBgColor('D0'+j+'C',i,colorF) ;
                    }
                    
                    var colorInfoBg = '64|255|64'
                    //詭衛雖陛 氈朝 鏽歲曖 熱榆擎 碩擎儀.
                    if(arrA[0]!='' || arrA[1]!='' || arrA[2]!='') {
						GridObj.SetCellFgColor('D0'+j+'A',i,'255|0|0');
						GridObj.SetCellBgColor('D0'+j+'A',i,colorInfoBg);
						GridObj.SetCellFgColor('ITEM_NAME',i,'255|0|0');
						GridObj.SetCellBgColor('ITEM_NAME',i,colorInfoBg);
					}
                    if(arrB[0]!='' || arrB[1]!='' || arrB[2]!='') {
						GridObj.SetCellFgColor('D0'+j+'B',i,'255|0|0');
						GridObj.SetCellBgColor('D0'+j+'B',i,colorInfoBg);
						GridObj.SetCellFgColor('ITEM_NAME',i,'255|0|0');
						GridObj.SetCellBgColor('ITEM_NAME',i,colorInfoBg);
					}
                    if(arrC[0]!='' || arrC[1]!='' || arrC[2]!='') {
						GridObj.SetCellFgColor('D0'+j+'C',i,'255|0|0');
						GridObj.SetCellBgColor('D0'+j+'C',i,colorInfoBg);
						GridObj.SetCellFgColor('ITEM_NAME',i,'255|0|0');
						GridObj.SetCellBgColor('ITEM_NAME',i,colorInfoBg);
					}
                    
                }
            }
            
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
}

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄 撢た Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setGrid(){
	// ④渦 斜瑜貲 滲唳
	//var weekNo    = ''; //�飛橦□� 褻�裔炴� 輿離陛 橫替 輿離檣棻. ( 渡輿=1, 離輿=2, 離離輿=3)
    var dateArray = ''; //陳瞼Row蒂 '!%!'晦遽戲煎 寡翮擊 虜菟晦 嬪и 滲熱.
    var dayCount  = 1;  //陳瞼 牖嬪
	//if(document.frm.checked_weekly[0].checked) weekNo=1;
    //if(document.frm.checked_weekly[1].checked) weekNo=2;
    //if(document.frm.checked_weekly[2].checked) weekNo=3;
    
    var param = "selected_date";
    var value = document.frm.selected_date.value;
    commonUtil.getCodeList(param, value, "daily_header_selected",{
			callback:function(result){
				for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
			    {
			         dateArray = '';
		             dateArray = result[i].split('!%!'); //'!%!'煎 掘碟脹 等檜攪蒂 splitж罹 寡翮煎 盪濰и棻.
		             
		             GridObj.SetGroupHDText("GRP_DATE"+dayCount, dateArray[1]+' '+dateArray[2]+'/'+dateArray[3]+'('+dateArray[4]+')'); 
		             
		             dayCount++;
			    }
			}
		}
    ); //陳瞼⑽ п渦蒂 虜菟橫 遽棻.
}
    
/*********************************************   WiseGrid Event   *********************************************************/    
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 等檜攪陛 滲唳 腎歷擊 唳辦 籀葬腎朝 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridChangeCell(strColumnKey, nRow){
	
}    
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 錳 贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridCellClick(strColumnKey, nRow){ 
  if(strColumnKey >= 'D01A' && strColumnKey <= 'D07C'){
      var msg=GridObj.GetCellValue('CD0'+strColumnKey.substr(2,2),nRow).split('_MSG_');
      
      document.all.msg_grp_code.value=msg[0];
	  document.all.msg_grp_detail.value=msg[1];
      document.all.msg_grp.value=msg[2];              
      document.all.msg.value=msg[3];
  }
}        
           
/*********************************************   晦顫 Function   **********************************************************/

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

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛Check Box 奢濰 : 瞪羹 Click  Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function checkSelectedPlantAll(obj){
	
	var len = document.frm.selected_plant.length;
	if( obj.checked == true ){
		//alert(document.frm.selected_plant.length);		
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = true;
		}
	}
	else{
		for( i = 0 ; i < len ; i++ ){
			document.frm.selected_plant[i].checked = false;
		}
	}
	
};


function open_ERP_IF_Check_popup() {

	var cnfm_date = document.frm.selected_date.value;
			
	//var service_url = "service.do?_moon_service=sc_11020_dailyProductPlan_ERP_IF_Check_popup&_moon_perpage=200&_moon_pagenumber=1&cnfm_date="+cnfm_date;
	var service_url = "service.do?_moon_service=sc_11020_dailyProductPlan_ERP_IF_Check_popup";
		service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
		service_url += "&cnfm_date=" + cnfm_date;
	 
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=730, height=400, top=200, left=200";
	var newWin = window.open(service_url, "sc_11020_dailyProductPlan_ERP_IF_Check_popup", pop_win_style); 
	newWin.focus();
};

