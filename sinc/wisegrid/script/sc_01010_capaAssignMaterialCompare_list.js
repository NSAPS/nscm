/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛陝 幗が曖 JOB_ID蒂 撲薑.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/    
    var job_id  = 'sc_01010_capaAssignMaterialCompare_list01'; //詭景 譆蟾 贗葛衛 JOB_ID
    var job_id1 = 'sc_01010_capaAssignMaterialCompare_list01'; //A幗が 贗葛衛 JOB_ID1
    var job_id1_1 = 'sc_01010_capaAssignMaterialCompare_list01_1'; //A幗が 贗葛衛 JOB_ID1_1
    var job_id2 = 'sc_01010_capaAssignMaterialCompare_list02'; //B幗が 贗葛衛 JOB_ID2
    var job_id2_1 = 'sc_01010_capaAssignMaterialCompare_list02_1'; //B幗が 贗葛衛 JOB_ID2_1
    
    //document.cookie = "webfxtab_tabPane1=1";    

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅л. 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function init() {
   	
       setProperty(GridObj);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
       setHeader(GridObj);  //п渦儅撩
       //setDefault();
   }

   function init2() {
   	
       setProperty(GridObj2);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
       setHeader2(GridObj2);  //п渦儅撩
       //setDefault2();
   }


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛幗が 贗葛縑 評艇 л熱 ��轎
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/   
   function btn_div(btn){
   	//alert(btn+"幗が贗葛!");
   	
   	B_Value = btn;
   	
   	if(btn == "A"){
   		setHeader(GridObj);
   		setHeader2(GridObj2);
   	}
   	if(btn == "B"){
   		setHeader(GridObj);
   		setHeader2(GridObj2);
   	}
   }


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛幗が �側瘓� 綠�側瘓� 薯橫.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  
	function display(str){
	    var form = document.all;
	    if(str=="A"){
	        form.btn1.disabled  = true;
	        form.btn2.disabled  = false;
	        form.item_list.disabled = true;
	    }if(str=="B"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = true;
             form.item_list.disabled = false;
	    }
    }
    
    
   
   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛� 晦獄 撲薑 睡碟.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function setDefault()
   { 
        //斜葬萄曖 ④渦 贗葛衛 澗た晦棟 �側瘓�. 欽, 斜瑜煽м賅萄縑憮朝 餌辨ж賊 寰脾.
    	//GridObj.strHDClickAction    = "sortsingle";
   }
       
       
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛version 巍爾夢蝶 翱翕,,,ヶ跡..
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  //啗�凳鶺� 巍爾夢蝶 摹鷗縑 評塭 ヶ跡貲曖 巍爾夢蝶 滲��. 1
   function versionCombo()
   { 
   		//alert("versionCombo み暮寰!!");
   		var version1 = document.all.version1.value;
   		var version2 = document.all.version2.value;
   		var res_code = document.all.res_code.value;
   		
   		//alert("version1 : "+version1+"  version2 : "+version2+"   res_code : "+res_code);
   		//alert("version : "+version);
  	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("version1!%!version2!%!res_code", version1+"!%!"+version2+"!%!"+res_code , "sc_01010_capaAssignMaterialCompare_list_combo_item_list",versionComboResult);
   }   

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛version 巍爾夢蝶 翱翕,,,唸婁高! ヶ跡.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  ////啗�凳鶺� 巍爾夢蝶 摹鷗縑 評塭 ヶ跡貲曖 巍爾夢蝶 滲��. 2
   function versionComboResult(result)
   {
       var comboRs = '';
       
       //alert("result : "+ result);
       //alert("result length : " + result.length);
       
       //巍爾夢蝶縑 晦獄戲煎 爾橾 褫暮 高. All
	   document.all.item_list.options[0] = new Option("All","");
	   
	   //巍爾夢曖 褫暮 高菟擊 蟾晦��! 欽, ALL擎 爾檜啪 ж晦嬪п 1.
	   document.all.item_list.options.length = 1;
	   
       for( var i=1 ;i<result.length+1 ;i++) //瞪羹 Row虜躑 奩犒 и棻.
       {
           //             0         1
           //comboRs [item_id, item_name] 高檜 盪濰脾.
           comboRs = result[i-1].split('!%!');
           //alert("comboRS : "+comboRs);
           
           document.all.item_list.options[i] = null; // option 蟾晦��
           
           //                                                item_name , item_id
           //                                                  text高,     value高
           //document.all.item_list.options[i] = new Option(result[i],result[i-1]);
           document.all.item_list.options[i] = new Option(comboRs[1],comboRs[0]);           
       }       	
   }

  
  
       
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛п渦儅撩
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   
   function setHeader(GridObj) 
   {
   	
   		//詭景贗葛衛 晦獄戲煎 顫朝 夠.
   		if(B_Value == "Z"){
   		//巍爾夢蝶 綠�側瘓�..
   		document.all.item_list.disabled = true;
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader);
   		}   	
		//幗が縑 贗葛縑 評艇 ④渦 儅撩 ��轎!   	
   	    if(B_Value == "A"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id1 , "gird_header_list",defaultHeader);
   	    }
   	    if(B_Value == "B"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id2 , "gird_header_list",defaultHeader);
   	    }
   }


   function setHeader2(GridObj2) 
   {
   	
   		//詭景贗葛衛 晦獄戲煎 顫朝 夠.
   		if(B_Value == "Z"){
   		//巍爾夢蝶 綠�側瘓�..
   		//document.all.item_list.disabled = true;
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id1_1 , "gird_header_list",defaultHeader2);
   		}   	
		//幗が縑 贗葛縑 評艇 ④渦 儅撩 ��轎!   	
   	    if(B_Value == "A"){
	   	   GridObj2.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id1_1 , "gird_header_list",defaultHeader2);
   	    }
   	    if(B_Value == "B"){
	   	   GridObj2.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id2_1 , "gird_header_list",defaultHeader2);
   	    }
   }



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛DB縑 蛔煙脹 �飛� п渦 薑爾蒂 陛螳螞棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/

   function defaultHeader(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])        
       }
       
		
		if(B_Value == "A"){
			GridObj.AddGroup("CAPA1", "鼠и CAPA");		//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AppendHeader("CAPA1", "NC_QTY");	//鼠и CAPA 熱榆
			GridObj.AppendHeader("CAPA1", "NC_RATE");	//鼠и CAPA 綠徽
			GridObj.AppendHeader("CAPA1", "NC_AMOUNT");	//鼠и CAPA 旎擋
			
			GridObj.AddGroup("CAPA2", "CAPA 薯擒");		//斜葬萄縑 斜瑜擊 蛔煙и棻.
			GridObj.AppendHeader("CAPA2", "CA_QTY");	//CAPA 薯擒 熱榆
			GridObj.AppendHeader("CAPA2", "CA_RATE");	//CAPA 薯擒 綠徽
			GridObj.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 薯擒 旎擋
		}
		
		if(B_Value == "B"){
			GridObj.AddGroup("CAPA1", "鼠и CAPA");		//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AppendHeader("CAPA1", "NC_QTY");	//鼠и CAPA 熱榆
			GridObj.AppendHeader("CAPA1", "NC_EA");		//鼠и CAPA 衝熱
			GridObj.AppendHeader("CAPA1", "NC_RATE");	//鼠и CAPA 綠徽
			GridObj.AppendHeader("CAPA1", "NC_AMOUNT");	//鼠и CAPA 旎擋
			
			GridObj.AddGroup("CAPA2", "CAPA 薯擒");		//斜葬萄縑 斜瑜擊 蛔煙и棻.
			GridObj.AppendHeader("CAPA2", "CA_QTY");	//CAPA 薯擒 熱榆
			GridObj.AppendHeader("CAPA2", "CA_EA");		//CAPA 薯擒 衝熱
			GridObj.AppendHeader("CAPA2", "CA_RATE");	//CAPA 薯擒 綠徽
			GridObj.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 薯擒 旎擋
		}

		//詭景贗葛衛 蛤ィお ④渦 斜瑜 掘撩.
		if(B_Value == "Z"){
			GridObj.AddGroup("CAPA1", "鼠и CAPA");		//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj.AppendHeader("CAPA1", "NC_QTY");	//鼠и CAPA 熱榆
			GridObj.AppendHeader("CAPA1", "NC_RATE");	//鼠и CAPA 綠徽
			GridObj.AppendHeader("CAPA1", "NC_AMOUNT");	//鼠и CAPA 旎擋
			
			GridObj.AddGroup("CAPA2", "CAPA 薯擒");		//斜葬萄縑 斜瑜擊 蛔煙и棻.
			GridObj.AppendHeader("CAPA2", "CA_QTY");	//CAPA 薯擒 熱榆
			GridObj.AppendHeader("CAPA2", "CA_RATE");	//CAPA 薯擒 綠徽
			GridObj.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 薯擒 旎擋
		}
		


	   //alert("GRidObj.....夥遴萄 瞪!");
	   GridObj.BoundHeader();

         //Hidden 鏽歲
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery();
   }



   function defaultHeader2(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //瞪羹 Row虜躑 奩犒 и棻.
       {
           arrHeader = result[i].split('!%!');
           GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])        
       }
       
		
		if(B_Value == "A"){
			GridObj2.AddGroup("CAPA1", "鼠и CAPA");		//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj2.AppendHeader("CAPA1", "NC_QTY");	//鼠и CAPA 熱榆
			GridObj2.AppendHeader("CAPA1", "NC_RATE");	//鼠и CAPA 綠徽
			GridObj2.AppendHeader("CAPA1", "NC_AMOUNT");	//鼠и CAPA 旎擋
			
			GridObj2.AddGroup("CAPA2", "CAPA 薯擒");		//斜葬萄縑 斜瑜擊 蛔煙и棻.
			GridObj2.AppendHeader("CAPA2", "CA_QTY");	//CAPA 薯擒 熱榆
			GridObj2.AppendHeader("CAPA2", "CA_RATE");	//CAPA 薯擒 綠徽
			GridObj2.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 薯擒 旎擋
		}
		
		if(B_Value == "B"){
			GridObj2.AddGroup("CAPA1", "鼠и CAPA");		//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj2.AppendHeader("CAPA1", "NC_QTY");	//鼠и CAPA 熱榆
			GridObj2.AppendHeader("CAPA1", "NC_EA");		//鼠и CAPA 衝熱
			GridObj2.AppendHeader("CAPA1", "NC_RATE");	//鼠и CAPA 綠徽
			GridObj2.AppendHeader("CAPA1", "NC_AMOUNT");	//鼠и CAPA 旎擋
			
			GridObj2.AddGroup("CAPA2", "CAPA 薯擒");		//斜葬萄縑 斜瑜擊 蛔煙и棻.
			GridObj2.AppendHeader("CAPA2", "CA_QTY");	//CAPA 薯擒 熱榆
			GridObj2.AppendHeader("CAPA2", "CA_EA");		//CAPA 薯擒 衝熱
			GridObj2.AppendHeader("CAPA2", "CA_RATE");	//CAPA 薯擒 綠徽
			GridObj2.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 薯擒 旎擋
		}

		//詭景贗葛衛 蛤ィお ④渦 斜瑜 掘撩.
		if(B_Value == "Z"){
			GridObj2.AddGroup("CAPA1", "鼠и CAPA");		//斜葬萄縑 斜瑜擊 蛔煙и棻. 
			GridObj2.AppendHeader("CAPA1", "NC_QTY");	//鼠и CAPA 熱榆
			GridObj2.AppendHeader("CAPA1", "NC_RATE");	//鼠и CAPA 綠徽
			GridObj2.AppendHeader("CAPA1", "NC_AMOUNT");	//鼠и CAPA 旎擋
			
			GridObj2.AddGroup("CAPA2", "CAPA 薯擒");		//斜葬萄縑 斜瑜擊 蛔煙и棻.
			GridObj2.AppendHeader("CAPA2", "CA_QTY");	//CAPA 薯擒 熱榆
			GridObj2.AppendHeader("CAPA2", "CA_RATE");	//CAPA 薯擒 綠徽
			GridObj2.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 薯擒 旎擋
		}
		


	   //alert("GRidObj.....夥遴萄 瞪!");
	   GridObj2.BoundHeader();

         //Hidden 鏽歲
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery2();
   }


             
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
       doQuery();
       doQuery2();
   }
  
  
  
  
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '盪濰'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSave  (service)
   {
   }
      


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 撚 錳贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridCellClick(strColumnKey, nRow){
		//alert(strColumnKey+''+nRow);
    }
    
    
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 撚 渦綰贗葛 檜漸お
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridCellDblClick(strColumnKey, nRow){
    	if(B_Value == "A"){
    		
    	}
    	else if(B_Value == "B"){
    		
    	}
    }


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛羅廓簞 斜葬萄曖 褻�� 蘭葬蒂 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function doQuery() 
   {
   	   //詭景 贗葛衛 晦獄 褒ч
       if(B_Value == "Z"){
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       }
       
       //幗が縑 評塭 JOB ID 滲唳.
       if(B_Value == "A"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1;
       }
       if(B_Value == "B"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id2;
       }
       
       var version1 = document.all.version1.value;
       var version2 = document.all.version2.value;
       var res_code = document.all.res_code.value;
       var item_list = document.all.item_list.value;
       var factory = document.all.factory.value;
       
       //alert("version : "+ version);
       //alert("res_code : "+res_code);
       //alert("item_list : "+item_list);

       //var startDate = document.all.start_date.value;
       //var endDate   = document.all.end_date.value;
       //var plant_id  = document.all.selected_plant.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("version1", version1);
       GridObj.SetParam("version2", version2);
       GridObj.SetParam("res_code", res_code);
       GridObj.SetParam("item_list", item_list);
       GridObj.SetParam("factory", factory);
       
       //GridObj.SetParam("startDate", startDate);
       //GridObj.SetParam("endDate", endDate);
       //GridObj.SetParam("plant_id", plant_id);
       GridObj.DoQuery(servlet_url);
   }





   function doQuery2() 
   {
   	   //詭景 贗葛衛 晦獄 褒ч
       if(B_Value == "Z"){
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1_1;
       }
       
       //幗が縑 評塭 JOB ID 滲唳.
       if(B_Value == "A"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1_1;
       }
       if(B_Value == "B"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id2_1;
       }
       
       var version1 = document.all.version1.value;
       var version2 = document.all.version2.value;
       var res_code = document.all.res_code.value;
       var item_list = document.all.item_list.value;
       var factory = document.all.factory.value;
       
       //alert("version : "+ version);
       //alert("res_code : "+res_code);
       //alert("item_list : "+item_list);

       //var startDate = document.all.start_date.value;
       //var endDate   = document.all.end_date.value;
       //var plant_id  = document.all.selected_plant.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj2.SetParam("mode", "search");
       GridObj2.SetParam("version1", version1);
       GridObj2.SetParam("version2", version2);
       GridObj2.SetParam("res_code", res_code);
       GridObj2.SetParam("item_list", item_list);
       GridObj2.SetParam("factory", factory);
       
       //GridObj.SetParam("startDate", startDate);
       //GridObj.SetParam("endDate", endDate);
       //GridObj.SetParam("plant_id", plant_id);
       GridObj2.DoQuery(servlet_url);
   }


   
   

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛等檜攪 褻�萼� 薑鼻瞳戲煎 諫猿腎賊 嫦儅腎朝 Event縑 渠и Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function GridEndQuery() 
    {
        var mode = GridObj.GetParam("mode");
        var error_msg = '';
          
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj.GetStatus() == "true") 
            {
            	//A幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "A"){
            		
            		//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 綠�側瘓� 塽 摹鷗鏽歲曖 賅萇 撚菟檜 摹鷗脹啪 и棻.
	                GridObj.strHDClickAction    = "select";
            		
            		//等檜攪蒂 斜瑜ё и棻.
	                GridObj.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                
	                //summary  bar!!
					GridObj.AddSummaryBar('SUMMARY1', '模啗', 'CAT06_NAME', 'sum', 'NC_QTY,NC_RATE,NC_AMOUNT,CA_QTY,CA_RATE,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY2', '識啗', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '200|250|200'); 
					GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '255|239|213'); 
					
					GridObj.SetSummaryBarFont('SUMMARY1', '掉葡', '10', true, false, false, false); 
					GridObj.SetSummaryBarFont('SUMMARY2', '掉葡', '10', true, false, false, false);  
	                
	                
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('CAT06','center');
	                GridObj.SetColCellAlign('CAT06_NAME','left');
	                GridObj.SetColCellAlign('PLANT_ID','center');
	                GridObj.SetColCellAlign('PLANT_NAME','center');
	                GridObj.SetColCellAlign('NC_QTY','right');
	                GridObj.SetColCellAlign('NC_RATE','right');
	                GridObj.SetColCellAlign('NC_AMOUNT','right');
	                GridObj.SetColCellAlign('CA_QTY','right');
	                GridObj.SetColCellAlign('CA_RATE','right');
	                GridObj.SetColCellAlign('CA_AMOUNT','right');
	                
	                //numberん裝 撲薑!
	                GridObj.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                /*
	                GridObj.SetColCellSortEnable('cat06',true)
	                GridObj.SetColCellSortEnable('cat06_name',true)
	                GridObj.SetColCellSortEnable('item_id',true)
	                GridObj.SetColCellSortEnable('item_name',true)
	                GridObj.SetColCellSortEnable('spec',true)
	                GridObj.SetColCellSortEnable('gubun',true)
	                GridObj.SetColCellSortEnable('anyang',true)
	                GridObj.SetColCellSortEnable('anseong',true)
	                GridObj.SetColCellSortEnable('anseong_u',true)
	                GridObj.SetColCellSortEnable('asan',true)
	                GridObj.SetColCellSortEnable('gumi',true)
	                GridObj.SetColCellSortEnable('busan',true)
	                GridObj.SetColCellSortEnable('noksan',true)
	                GridObj.SetColCellSortEnable('total',true)
	                */
	                
	                

	                
	                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                	//gridColSet(GridObj);
                	
            	}
            	//B幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "B"){
            		
            		//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 綠�側瘓� 塽 摹鷗鏽歲曖 賅萇 撚菟檜 摹鷗脹啪 и棻.
	                GridObj.strHDClickAction    = "select";
            		
            		//等檜攪蒂 斜瑜ё и棻.
	                GridObj.SetGroupMerge("CAT06,CAT06_NAME,ITEM_ID,ITEM_NAME");
	                
	                //summary  bar!!
					GridObj.AddSummaryBar('SUMMARY1', '模啗', 'ITEM_NAME', 'sum', 'NC_QTY,NC_EA,NC_RATE,NC_AMOUNT,CA_QTY,CA_EA,CA_RATE,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY2', 'м啗', 'CAT06_NAME', 'sum', 'NC_QTY,NC_EA,NC_AMOUNT,CA_QTY,CA_EA,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY3', '識啗', 'summaryall', 'sum', 'NC_QTY,NC_EA,NC_AMOUNT,CA_QTY,CA_EA,CA_AMOUNT'); 
					
					GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '200|250|200'); 
					GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '109|214|109');
					GridObj.SetSummaryBarColor('SUMMARY3', '0|0|0', '255|239|213'); 
					
					GridObj.SetSummaryBarFont('SUMMARY1', '掉葡', '10', true, false, false, false); 
					GridObj.SetSummaryBarFont('SUMMARY2', '掉葡', '10', true, false, false, false);
					GridObj.SetSummaryBarFont('SUMMARY3', '掉葡', '10', true, false, false, false);  	                
	                
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('CAT06','center');
	                GridObj.SetColCellAlign('CAT06_NAME','left');
	                GridObj.SetColCellAlign('ITEM_ID','left');
	                GridObj.SetColCellAlign('ITEM_NAME','left');
	                GridObj.SetColCellAlign('SPEC','left');
	                GridObj.SetColCellAlign('PLANT_ID','center');
	                GridObj.SetColCellAlign('PLANT_NAME','center');
	                GridObj.SetColCellAlign('NC_QTY','right');
	                GridObj.SetColCellAlign('NC_EA','right');
	                GridObj.SetColCellAlign('NC_RATE','right');
	                GridObj.SetColCellAlign('NC_AMOUNT','right');
	                GridObj.SetColCellAlign('CA_QTY','right');
	                GridObj.SetColCellAlign('CA_EA','right');
	                GridObj.SetColCellAlign('CA_RATE','right');
	                GridObj.SetColCellAlign('CA_AMOUNT','right');
	                
	                //numberん裝 撲薑!
	                
	                GridObj.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('NC_EA','#################,##0.##');
	                GridObj.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('CA_EA','#################,##0.##');
	                GridObj.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                	//gridColSet(GridObj);
	                
            	}
            	
            	//詭景 贗葛衛 晦獄 褒ч.
            	if(B_Value == "Z"){

	           		//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 綠�側瘓� 塽 摹鷗鏽歲曖 賅萇 撚菟檜 摹鷗脹啪 и棻.
	                GridObj.strHDClickAction    = "select";
	            		
	                //等檜攪蒂 斜瑜ё и棻.
	                GridObj.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                //summary  bar!!
					GridObj.AddSummaryBar('SUMMARY1', '模啗', 'CAT06_NAME', 'sum', 'NC_QTY,NC_RATE,NC_AMOUNT,CA_QTY,CA_RATE,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY2', '識啗', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '200|250|200'); 
					GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '255|239|213'); 
					
					GridObj.SetSummaryBarFont('SUMMARY1', '掉葡', '10', true, false, false, false); 
					GridObj.SetSummaryBarFont('SUMMARY2', '掉葡', '10', true, false, false, false);                
                
                
                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('CAT06','center');
	                GridObj.SetColCellAlign('CAT06_NAME','left');
	                GridObj.SetColCellAlign('PLANT_ID','center');
	                GridObj.SetColCellAlign('PLANT_NAME','center');
	                GridObj.SetColCellAlign('NC_QTY','right');
	                GridObj.SetColCellAlign('NC_RATE','right');
	                GridObj.SetColCellAlign('NC_AMOUNT','right');
	                GridObj.SetColCellAlign('CA_QTY','right');
	                GridObj.SetColCellAlign('CA_RATE','right');
	                GridObj.SetColCellAlign('CA_AMOUNT','right');
	                
	                //numberん裝 撲薑!
	                GridObj.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
                
                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                //gridColSet(GridObj);
            	}
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
        }
    }





    function GridEndQuery2()
    {
        var mode = GridObj2.GetParam("mode");
        var error_msg = '';
          
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search") //褻�萼� 諫猿脹 唳辦
        {
            if(GridObj2.GetStatus() == "true") 
            {
            	//A幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "A"){
            		
            		//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 綠�側瘓� 塽 摹鷗鏽歲曖 賅萇 撚菟檜 摹鷗脹啪 и棻.
	                GridObj2.strHDClickAction    = "select";
            		
            		//等檜攪蒂 斜瑜ё и棻.
	                GridObj2.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                
	                //summary  bar!!
					GridObj2.AddSummaryBar('SUMMARY1', '識啗', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|239|213'); 
					
					GridObj2.SetSummaryBarFont('SUMMARY1', '掉葡', '10', true, false, false, false);  
	                
	                
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj2.SetColCellAlign('CAT06','center');
	                GridObj2.SetColCellAlign('CAT06_NAME','left');
	                GridObj2.SetColCellAlign('PLANT_ID','center');
	                GridObj2.SetColCellAlign('PLANT_NAME','center');
	                GridObj2.SetColCellAlign('NC_QTY','right');
	                GridObj2.SetColCellAlign('NC_RATE','right');
	                GridObj2.SetColCellAlign('NC_AMOUNT','right');
	                GridObj2.SetColCellAlign('CA_QTY','right');
	                GridObj2.SetColCellAlign('CA_RATE','right');
	                GridObj2.SetColCellAlign('CA_AMOUNT','right');
	                
	                //numberん裝 撲薑!
	                GridObj2.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                /*
	                GridObj.SetColCellSortEnable('cat06',true)
	                GridObj.SetColCellSortEnable('cat06_name',true)
	                GridObj.SetColCellSortEnable('item_id',true)
	                GridObj.SetColCellSortEnable('item_name',true)
	                GridObj.SetColCellSortEnable('spec',true)
	                GridObj.SetColCellSortEnable('gubun',true)
	                GridObj.SetColCellSortEnable('anyang',true)
	                GridObj.SetColCellSortEnable('anseong',true)
	                GridObj.SetColCellSortEnable('anseong_u',true)
	                GridObj.SetColCellSortEnable('asan',true)
	                GridObj.SetColCellSortEnable('gumi',true)
	                GridObj.SetColCellSortEnable('busan',true)
	                GridObj.SetColCellSortEnable('noksan',true)
	                GridObj.SetColCellSortEnable('total',true)
	                */
	                
	                

	                
	                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                	//gridColSet(GridObj);
                	
            	}
            	//B幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "B"){
            		
            		//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 綠�側瘓� 塽 摹鷗鏽歲曖 賅萇 撚菟檜 摹鷗脹啪 и棻.
	                GridObj2.strHDClickAction    = "select";
            		
            		//等檜攪蒂 斜瑜ё и棻.
	                GridObj2.SetGroupMerge("CAT06,CAT06_NAME,ITEM_ID,ITEM_NAME");
	                
	                //summary  bar!!
					GridObj2.AddSummaryBar('SUMMARY1', '識啗', 'summaryall', 'sum', 'NC_QTY,NC_EA,NC_AMOUNT,CA_QTY,CA_EA,CA_AMOUNT'); 
					
					GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|239|213'); 
					
					GridObj2.SetSummaryBarFont('SUMMARY1', '掉葡', '10', true, false, false, false);  	                
	                
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj2.SetColCellAlign('CAT06','center');
	                GridObj2.SetColCellAlign('CAT06_NAME','left');
	                GridObj2.SetColCellAlign('ITEM_ID','left');
	                GridObj2.SetColCellAlign('ITEM_NAME','left');
	                GridObj2.SetColCellAlign('SPEC','left');
	                GridObj2.SetColCellAlign('PLANT_ID','center');
	                GridObj2.SetColCellAlign('PLANT_NAME','center');
	                GridObj2.SetColCellAlign('NC_QTY','right');
	                GridObj2.SetColCellAlign('NC_EA','right');
	                GridObj2.SetColCellAlign('NC_RATE','right');
	                GridObj2.SetColCellAlign('NC_AMOUNT','right');
	                GridObj2.SetColCellAlign('CA_QTY','right');
	                GridObj2.SetColCellAlign('CA_EA','right');
	                GridObj2.SetColCellAlign('CA_RATE','right');
	                GridObj2.SetColCellAlign('CA_AMOUNT','right');
	                
	                //numberん裝 撲薑!
	                
	                GridObj2.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_EA','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_EA','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                	//gridColSet(GridObj);
	                
            	}
            	
            	//詭景 贗葛衛 晦獄 褒ч.
            	if(B_Value == "Z"){

	           		//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 綠�側瘓� 塽 摹鷗鏽歲曖 賅萇 撚菟檜 摹鷗脹啪 и棻.
	                GridObj2.strHDClickAction    = "select";
	            		
	                //等檜攪蒂 斜瑜ё и棻.
	                GridObj2.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                //summary  bar!!
					GridObj2.AddSummaryBar('SUMMARY1', '識啗', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|239|213'); 
					
					GridObj2.SetSummaryBarFont('SUMMARY1', '掉葡', '10', true, false, false, false);               
                
                
                //撚曖 薑溺擊 撲薑
	                GridObj2.SetColCellAlign('CAT06','center');
	                GridObj2.SetColCellAlign('CAT06_NAME','left');
	                GridObj2.SetColCellAlign('PLANT_ID','center');
	                GridObj2.SetColCellAlign('PLANT_NAME','center');
	                GridObj2.SetColCellAlign('NC_QTY','right');
	                GridObj2.SetColCellAlign('NC_RATE','right');
	                GridObj2.SetColCellAlign('NC_AMOUNT','right');
	                GridObj2.SetColCellAlign('CA_QTY','right');
	                GridObj2.SetColCellAlign('CA_RATE','right');
	                GridObj2.SetColCellAlign('CA_AMOUNT','right');
	                
	                //numberん裝 撲薑!
	                GridObj2.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
                
                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                //gridColSet(GridObj);
            	}
            } else    
            { 
                error_msg = GridObj2.GetMessage(); 
                alert(error_msg);            
            }
        }
    }
    
    


    
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛褻�� 幗が 贗葛衛 褒ч.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
GoSearch = function() {

	// 褻�蜇� WAITING 檜嘐雖 爾罹輿晦
	viewWait();
	
	//alert("hllo");
	doQuery();
	doQuery2();
};



   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 等檜攪陛 滲唳 腎歷擊 唳辦 籀葬腎朝 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   
//   function GridChangeCell(strColumnKey, nRow) 
//   {
       /*
       if(strColumnKey != "SELECTED") {
           //??? ? SELECTED ?? ??? ??? ?? ???. 
           GridObj.SetCellValue("SELECTED", nRow, "1");
       }
       */
 //  }    
    

   
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛EXCEL
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛getdatetime
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function getdatetime() {
       var today = new Date();
       var year = today.getYear();
       var month = today.getMonth() + 1;
       var day = today.getDate();
       
       if(month < 10)
           month = "0" + month;
           
       if(day < 10)
           day = "0" + day;
   
       document.frm.to_date.value = year + "" + month + "" + day;
   }
   

  
  

           


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛MOUSE OVER 衛, ROW 儀鼻 滲��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridMouseOver(strType, strColumnKey, nRow){
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
}


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛MOUSE OUT 衛, ROW 儀鼻 犒掘
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridMouseOut(strType, strColumnKey, nRow){
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
}




 /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
   弛斜葬萄 鏽歲 Set 鏽楝 撲薑ж晦!!
   戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function gridColSet(obj)
    {
    	//⑷營 斜葬萄曖 識 煎辦 偎熱.
        var rowLeng = obj.GetRowCount();
        var colBGColor='255|255|255';
	}






// 褻�� 衛 waiting 檜嘐雖 爾罹輿晦
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}


// enter check 辨 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// 濠晦�飛� 偵褐
	//		GoSearch();
		}
	} 
}





/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛斜葬萄曖 餌檜鍔 褻瞰 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function setWiseGridAutoResize( tab_h, table_h ){
    
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
    
    /*
    if( search_menu.style.display == "none" ) 
    { 
        tabHeightValue += Number(search_h); 
        tableHeightValue += Number(search_h); 
    }
    */ 
    
    // �飛� size 蹴模 衛 �飛橉� 傘鼠 濛嬴 斜葬萄 觼晦陛 擠熱陛 腎賊 縑楝陛 釭嘎煎 斜 唳辦 鼠褻勒 1煎 撮た 
    // ==> �飛橉� 渦檜鼻 蹴模腎雖 彊擠 
    if( tabHeightValue < 1 ) 
        tabHeightValue = 1; 
    if( tableHeightValue < 1 ) 
        tableHeightValue = 1; 
    
    //tabPage1.style.height = tabHeightValue + "px"; 
    //tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = (tableHeightValue/3*2) + "px"; 
	document.WiseGrid2.height = (tableHeightValue/3*1) + "px"; 
}     


