/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛陝 幗が曖 JOB_ID蒂 撲薑.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/    
    var job_id  = 'expenseFactoryResult_list01'; //詭景 譆堅 贗葛衛 JOB_ID
    var job_id1 = 'expenseFactoryResult_list01'; //A幗が 贗葛衛 JOB_ID
    var job_id2 = 'expenseFactoryResult_list02'; //B幗が 贗葛衛 JOB_ID
    var job_id3 = 'expenseFactoryResult_list03'; //C幗が 贗葛衛 JOB_ID
    var job_id4 = 'expenseFactoryResult_list04'; //D幗が 贗葛衛 JOB_ID
    
    //document.cookie = "webfxtab_tabPane1=1";    

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅л. 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function init() {
   	
       setProperty(GridObj);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
       setHeader(GridObj);  //п渦儅撩
       setDefault();        
   }


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛幗が 贗葛縑 評艇 л熱 ��轎
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/   
   function btn_div(btn){
   	//alert(btn+"幗が贗葛!");
   	
   	B_Value = btn;
   	
   	if(btn == "A"){
   		setHeader(GridObj);
   	}
   	if(btn == "B"){
   		setHeader(GridObj);
   	}
   	if(btn == "C"){
   		setHeader(GridObj);
   	}
   	if(btn == "D"){
   		setHeader(GridObj);
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
	        form.btn3.disabled  = false;
	        form.btn4.disabled  = false;
	    }if(str=="B"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = true;
             form.btn3.disabled  = false;
             form.btn4.disabled  = false;
	    }
	    if(str=="C"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = false;
             form.btn3.disabled  = true;
             form.btn4.disabled  = false;
	    }
	    if(str=="D"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = false;
             form.btn3.disabled  = false;
             form.btn4.disabled  = true;
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
  弛version 巍爾夢蝶 翱翕,,,
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  //啗�凳鶺� 巍爾夢蝶 摹鷗縑 評塭 ヶ跡貲曖 巍爾夢蝶 滲��. 1
   function versionCombo()
   { 
   		//alert("versionCombo み暮寰!!");
   		var version = document.all.version.value;
   		//alert("version : "+version);
  	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("version", version , "expenseFactoryResult_list_combo_item_list",versionComboResult);
   }   

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛version 巍爾夢蝶 翱翕,,,唸婁高!
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
  ////啗�凳鶺� 巍爾夢蝶 摹鷗縑 評塭 ヶ跡貲曖 巍爾夢蝶 滲��. 2
   function versionComboResult(result)
   {
       var comboRs = '';
       
       //alert("result : "+ result);
       //alert("result length : " + result.length);
       
       //巍爾夢蝶縑 晦獄戲煎 爾橾 褫暮 高. All
	   document.all.item_list.options[0] = new Option("All","");       
       
       for( var i=1 ;i<result.length+1 ;i++) //瞪羹 Row虜躑 奩犒 и棻.
       {
           //             0         1
           //comboRs [item_id, item_name] 高檜 盪濰脾.
           comboRs = result[i-1].split('!%!');
           //alert("comboRS : "+comboRs);
           
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
   	    if(B_Value == "C"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id3 , "gird_header_list",defaultHeader);
   	    }   	    
   	    if(B_Value == "D"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id4 , "gird_header_list",defaultHeader);
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
       
         //п渦 斜瑜儅撩
//       GridObj.AddGroup("GR_REASON","爾薑");  //陳瞼 斜瑜
//       GridObj.AppendHeader("GR_REASON","R01_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_COUNT");
//       GridObj.AppendHeader("GR_REASON","R02_PERCENT");

	   //alert("GRidObj.....夥遴萄 瞪!");
	   GridObj.BoundHeader();

         //Hidden 鏽歲
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery();
   }






             
/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛�飛橦� '褻��'蒂 援腦賊 ��轎 Fnc
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function GoSearch(service) 
   {
       doQuery();
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
    	else if(B_Value == "C"){
    		//斜葬萄曖 п渡 煎辦 渦綰贗葛衛 item_id 鏽歲婁 dcpath5 鏽歲曖 撚 高擊 だ塭嘐攪煎 剩梯.
    		//欽, dcpath5 鏽歲曖 撚高檜 null橾 唳辦縑朝 dcpath4 鏽歲曖 撚高擊 だ塭嘐攪煎 剩梯.
    		
    		//alert("撚 渦綰贗葛!!");
    		s_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("s_item_id : "+s_item_id);
    		
    		s_dcpath5_4 = GridObj.GetCellValue('dcpath5_cd',nRow);
    		//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		
    		if(s_dcpath5_4 == " "){
    			s_dcpath5_4 = GridObj.GetCellValue('dcpath4_cd',nRow);
    			//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		}
    		//alert("撚 渦綰贗葛 部!");
    		
    		//渦綰贗葛衛 だ塭嘐攪蒂 陛雖堅憮 �飛橉��素� ж晦嬪и 撲薑菟.
    		B_Value = "D";
    		display(B_Value);
			setHeader(GridObj);
    	}
    	else if(B_Value == "D"){
    		//斜葬萄曖 п渡 煎辦 渦綰贗葛衛 item_id 鏽歲婁 tgt_loc 鏽歲曖 撚 高擊 だ塭嘐攪煎 剩梯.
    		
    		
    		
    		//alert("D 撚 渦綰贗葛!!");
    		st_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("st_item_id : "+st_item_id);
    		
    		st_tgt_loc = GridObj.GetCellValue('tgt_loc',nRow);
    		//alert("st_tgt_loc : "+st_tgt_loc);
    		
    		document.all.st_item_id.value = st_item_id;
    		document.all.st_tgt_loc.value = st_tgt_loc;
    		
    		popup(st_item_id, st_tgt_loc);
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
       if(B_Value == "C"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id3;
       }
       if(B_Value == "D"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id4;
       }
       
       var version = document.all.version.value;
       var res_code = document.all.res_code.value;
       var item_list = document.all.item_list.value;
       var path2 = document.all.path2.value;
       var path4 = document.all.path4.value;
       
       //alert("version : "+ version);
       //alert("res_code : "+res_code);
       //alert("item_list : "+item_list);
       //alert("path2 : "+path2);
       //alert("path4 : "+path4);

       //var startDate = document.all.start_date.value;
       //var endDate   = document.all.end_date.value;
       //var plant_id  = document.all.selected_plant.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("version", version);
       GridObj.SetParam("res_code", res_code);
       GridObj.SetParam("item_list", item_list);
       GridObj.SetParam("path2", path2);
       GridObj.SetParam("path4", path4);
       
       GridObj.SetParam("s_item_id", s_item_id);
       GridObj.SetParam("s_dcpath5_4", s_dcpath5_4);
              
       //GridObj.SetParam("startDate", startDate);
       //GridObj.SetParam("endDate", endDate);
       //GridObj.SetParam("plant_id", plant_id);
       GridObj.DoQuery(servlet_url);
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
	                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('cat06','left');
	                GridObj.SetColCellAlign('cat06_name','left');
	                GridObj.SetColCellAlign('item_id','left');
	                GridObj.SetColCellAlign('item_name','left');
	                GridObj.SetColCellAlign('spec','left');
	                GridObj.SetColCellAlign('gubun','center');
	                GridObj.SetColCellAlign('anyang','right');
	                GridObj.SetColCellAlign('anseong','right');
	                GridObj.SetColCellAlign('anseong_u','right');
	                GridObj.SetColCellAlign('asan','right');
	                GridObj.SetColCellAlign('gumi','right');
	                GridObj.SetColCellAlign('busan','right');
	                GridObj.SetColCellAlign('noksan','right');
	                GridObj.SetColCellAlign('total','right');
	                
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
                	gridColSet(GridObj);
                	
            	}
            	//B幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "B"){
            		
            		//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 綠�側瘓� 塽 摹鷗鏽歲曖 賅萇 撚菟檜 摹鷗脹啪 и棻.
	                GridObj.strHDClickAction    = "select";
            		
            		//等檜攪蒂 斜瑜ё и棻.
	                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name");
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('cat06','left');
	                GridObj.SetColCellAlign('cat06_name','left');
	                GridObj.SetColCellAlign('item_id','left');
	                GridObj.SetColCellAlign('item_name','left');
	                GridObj.SetColCellAlign('spec','left');
	                GridObj.SetColCellAlign('plant_id','left');
	                GridObj.SetColCellAlign('plant_name','left');
	                GridObj.SetColCellAlign('real_fix_cost','right');
	                GridObj.SetColCellAlign('real_chg_cost','right');
	                GridObj.SetColCellAlign('qty_by_rate','right');
	                GridObj.SetColCellAlign('plant_ratio_by_rate','right');
	                GridObj.SetColCellAlign('qty_by_cost','right');
	                GridObj.SetColCellAlign('plant_ratio_by_cost','right');
	                GridObj.SetColCellAlign('item_qty_gap','center');
	                
	                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                	gridColSet(GridObj);
	                
            	}
            	//C幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "C"){
            		//等檜攪蒂 斜瑜ё и棻.
	                //GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                //斜葬萄曖 ④渦 贗葛衛 澗た晦棟 �側瘓�.
	                GridObj.strHDClickAction    = "sortsingle";
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('cat06','left');
	                GridObj.SetColCellAlign('cat06_name','left');
	                GridObj.SetColCellAlign('item_id','left');
	                GridObj.SetColCellAlign('item_name','left');
	                GridObj.SetColCellAlign('spec','left');
	                GridObj.SetColCellAlign('dcpath1','left');
	                GridObj.SetColCellAlign('dcpath2','left');
	                GridObj.SetColCellAlign('dcpath3','left');
	                GridObj.SetColCellAlign('dcpath4','left');
	                GridObj.SetColCellAlign('dcpath5','left');
	                GridObj.SetColCellAlign('qty','right');
	                GridObj.SetColCellAlign('box_amt','right');
	                GridObj.SetColCellAlign('total_amt','right');
	                GridObj.SetColCellAlign('dcpath4_cd','left');
	                GridObj.SetColCellAlign('dcpath5_cd','left');
	                
	                //煎辦 撚滓攪 �側瘓�
	                //GridObj.bRowSelectorVisible = true;
            	}
            	//D幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "D"){
            		
            		//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 綠�側瘓� 塽 摹鷗鏽歲曖 賅萇 撚菟檜 摹鷗脹啪 и棻.
	                GridObj.strHDClickAction    = "select";            		
            		
            		//等檜攪蒂 斜瑜ё и棻.
	                GridObj.SetGroupMerge("so_id,dc_type,rdc,item_id");
            		
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('so_id','right');
	                GridObj.SetColCellAlign('dc_type','left');
	                GridObj.SetColCellAlign('rdc','left');
	                GridObj.SetColCellAlign('item_id','left');
	                GridObj.SetColCellAlign('res_id','left');
	                GridObj.SetColCellAlign('pre_dctype','left');
	                GridObj.SetColCellAlign('pre_dc','left');
	                GridObj.SetColCellAlign('qty','left');
	                GridObj.SetColCellAlign('src_loc','left');
	                GridObj.SetColCellAlign('src_loc_name','left');
	                GridObj.SetColCellAlign('tgt_loc','left');
	                GridObj.SetColCellAlign('tgt_loc_name','left');
	                GridObj.SetColCellAlign('cost_amt','right');
	                GridObj.SetColCellAlign('box_per_palet','right');
	                
	                
	                //п渡 鏽歲擊 獗梯.
	                GridObj.SetColHide('so_id', true);
	                
	                //alert("鏽楝 撲薑 瞪!");
	                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                	gridColSet(GridObj);
            	}
            	
            	//詭景 贗葛衛 晦獄 褒ч.
            	if(B_Value == "Z"){

           		//斜葬萄曖 ④渦 贗葛衛 澗た晦棟 綠�側瘓� 塽 摹鷗鏽歲曖 賅萇 撚菟檜 摹鷗脹啪 и棻.
                GridObj.strHDClickAction    = "select";
            		
                //等檜攪蒂 斜瑜ё и棻.
                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
                //撚曖 薑溺擊 撲薑
                GridObj.SetColCellAlign('cat06','center');
                GridObj.SetColCellAlign('cat06_name','left');
                GridObj.SetColCellAlign('item_id','left');
                GridObj.SetColCellAlign('item_name','left');
                GridObj.SetColCellAlign('spec','left');
                GridObj.SetColCellAlign('gubun','center');
                GridObj.SetColCellAlign('anyang','right');
                GridObj.SetColCellAlign('anseong','right');
                GridObj.SetColCellAlign('anseong_u','right');
                GridObj.SetColCellAlign('asan','right');
                GridObj.SetColCellAlign('gumi','right');
                GridObj.SetColCellAlign('busan','right');
                GridObj.SetColCellAlign('noksan','right');
                GridObj.SetColCellAlign('total','right');
                
                //斜葬萄 鏽楝 撲薑 л熱 ��轎.
                gridColSet(GridObj);
            	}
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
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
        document.WiseGrid.height = tableHeightValue + "px"; 
//        document.WiseGrid2.height = tableHeightValue + "px"; 
        
    }  
           


/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛MOUSE OVER 衛, ROW 儀鼻 滲��
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function GridMouseOver(strType, strColumnKey, nRow){
	
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
	if(B_Value == "C"){
		// ④渦朝 翕濛橈擠
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '230|230|230');		
	}
	if(B_Value == "D"){
		// ④渦朝 翕濛橈擠
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '230|230|230');
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
	if(B_Value == "C"){	
	
		// ④渦朝 翕濛橈擠
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '255|255|255');
	}
	if(B_Value == "D"){
		
		// ④渦朝 翕濛橈擠
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '255|255|255');		
		
	}
}



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛で機 嗨辦啪 ж晦!!
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
function popup(str1, str2){
//	var plant_id   = document.frm.selected_plant.value ;
//    var sdate = document.frm.sdate.value;
//    var edate = document.frm.edate.value;
    
//    document.frm.weekCnt.value = weekCnt;

	//alert("str1 : "+str1);
	//alert("str2 : "+str2);

	//褒韓瞳戲煎 �飛橦□� 餌辨腎朝 斜葬萄 高曖 だ塭嘐攪朝 doQuery() 睡碟縑憮 剩啖鄹棲棻.
	//壽曖 だ塭嘐攪朝 �飛暺騔� 輿模薹縑 轎溘腆陽 餌辨腎朝 高菟殮棲棻. 
    var paramString  = "";
        paramString  = "&st_item_id=" + str1;
        paramString += "&st_tgt_loc=" + str2;
        
//    paramString = "&plant_id=" + plant_id;
//    paramString+= "&sdate="    + sdate;
//    paramString+= "&edate="    + edate;
//    paramString+= "&weekCnt="  + weekCnt;
       
    
    var fileName = "expenseFactoryResult_popup";
    var service_url = "service.do?_moon_service="+fileName+"&_moon_perpage=200&_moon_pagenumber=1" + paramString;
    //var newWin = window.showModalDialog(service_url, self, "dialogLeft:0px; dialogTop:0px; dialogWidth:800px; dialogHeight:480px ; dialogScrollbars=no");
    
    var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1000, height=400, top=0, left=0";
	var newWin = window.open(service_url, "expenseFactoryResult_popup", pop_win_style);
	newWin.focus();
    
//    if(newWin == -1)
//    {
//        GoSearch('xx');
//    }
}


 /*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
   弛斜葬萄 鏽歲 Set 鏽楝 撲薑ж晦!!
   戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
    function gridColSet(obj)
    {
    	//⑷營 斜葬萄曖 識 煎辦 偎熱.
        var rowLeng = obj.GetRowCount();
            
        var colBGColor='255|255|255';
            
		if(B_Value == "Z" || B_Value == "A"){//晦獄 Z 釭 A 幗が 贗葛衛 褒ч.
			
	        for( var row=0 ; row<rowLeng ; row++ ) //row熱虜躑 奩犒
	        {
	            
	            if(obj.GetCellValue('anyang',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun鏽歲曖 Portion 煎辦陛 0% 嬴棲賊 旋噢蒂 掃啪 и棻.
	                {
	                    obj.SetCellFontBold("anyang", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('anseong',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun鏽歲曖 Portion 煎辦陛 0% 嬴棲賊 旋噢蒂 掃啪 и棻.
	                {
	                    obj.SetCellFontBold("anseong", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('anseong_u',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun鏽歲曖 Portion 煎辦陛 0% 嬴棲賊 旋噢蒂 掃啪 и棻.
	                {
	                    obj.SetCellFontBold("anseong_u", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('asan',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun鏽歲曖 Portion 煎辦陛 0% 嬴棲賊 旋噢蒂 掃啪 и棻.
	                {
	                    obj.SetCellFontBold("asan", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('gumi',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun鏽歲曖 Portion 煎辦陛 0% 嬴棲賊 旋噢蒂 掃啪 и棻.
	                {
	                    obj.SetCellFontBold("gumi", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('busan',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun鏽歲曖 Portion 煎辦陛 0% 嬴棲賊 旋噢蒂 掃啪 и棻.
	                {
	                    obj.SetCellFontBold("busan", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('noksan',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun鏽歲曖 Portion 煎辦陛 0% 嬴棲賊 旋噢蒂 掃啪 и棻.
	                {
	                    obj.SetCellFontBold("noksan", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('total',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun鏽歲曖 Portion 煎辦陛 0% 嬴棲賊 旋噢蒂 掃啪 и棻.
	                {
	                    obj.SetCellFontBold("total", row, 'true');
	                }
	            }
	            
	            
	            
	            //Row 欽嬪煎鏽歲寡唳儀擊 掘碟и棻.
	            if(obj.GetCellValue('gubun',row) == "Portion")
	            {
	                
	                colBGColor='233|233|233';
	                
	                for( var col=6 ;col<=14 ;col++) 
	                {
	                	  //ROW掘碟 鏽歲 寡唳儀擊 雖薑и棻
	                    obj.SetCellBgColor("gubun", row, colBGColor) ;
	                    obj.SetCellBgColor("anyang", row, colBGColor);
	                    obj.SetCellBgColor("anseong", row, colBGColor);
	                    obj.SetCellBgColor("anseong_u", row, colBGColor);
	                    obj.SetCellBgColor("asan", row, colBGColor);
	                    obj.SetCellBgColor("gumi", row, colBGColor);
	                    obj.SetCellBgColor("busan", row, colBGColor);
	                    obj.SetCellBgColor("noksan", row, colBGColor);
	                    obj.SetCellBgColor("total", row, colBGColor);
	                }
	            }
	        }        
		}// 晦獄 "Z", "A"幗が 贗葛衛 if 僥 部!!!!!!!!!!!!!!!!!!!!.
		if(B_Value == "B"){		//"B"幗が 贗葛衛 褒ч!
			for( var row=0 ; row<rowLeng ; row++ ) //row熱虜躑 奩犒
	        {
	        	if(obj.GetCellValue('item_qty_gap',row) != ' ' && obj.GetCellValue('plant_id',row) == " "){//item_qty_gap鏽歲檜 ' '啪 嬴棲賊 旋噢蒂 掃啪 и棻.
	            	for(var col=1 ;col<=14 ;col++) 
	                {
	                	obj.SetCellFontBold("cat06", row, 'true');
	                	obj.SetCellFontBold("cat06_name", row, 'true');
	                	obj.SetCellFontBold("item_id", row, 'true');
	                	obj.SetCellFontBold("item_name", row, 'true');
	                	obj.SetCellFontBold("spec", row, 'true');
	                    obj.SetCellFontBold("qty_by_rate", row, 'true');
	                    obj.SetCellFontBold("qty_by_cost", row, 'true');
	                    obj.SetCellFontBold("item_qty_gap", row, 'true');
	                }
	            }
	        	
	            //Row 欽嬪煎鏽歲寡唳儀擊 掘碟и棻.
	            if(obj.GetCellValue('plant_id',row) == " ")
	            {
	                colBGColor='233|233|233';
	                
	                for( var col=1 ;col<=14 ;col++) 
	                {
	                	//ROW掘碟 鏽歲 寡唳儀擊 雖薑и棻
	                	obj.SetCellBgColor("cat06", row, colBGColor) ;
	                	obj.SetCellBgColor("cat06_name", row, colBGColor) ;
	                    obj.SetCellBgColor("item_id", row, colBGColor) ;
	                    obj.SetCellBgColor("item_name", row, colBGColor);
	                    obj.SetCellBgColor("spec", row, colBGColor);
	                    obj.SetCellBgColor("plant_id", row, colBGColor);
	                    obj.SetCellBgColor("plant_name", row, colBGColor);
	                    obj.SetCellBgColor("real_fix_cost", row, colBGColor);
	                    obj.SetCellBgColor("real_chg_cost", row, colBGColor);
	                    obj.SetCellBgColor("qty_by_rate", row, colBGColor);
	                    obj.SetCellBgColor("plant_ratio_by_rate", row, colBGColor);
	                    obj.SetCellBgColor("qty_by_cost", row, colBGColor);
	                    obj.SetCellBgColor("plant_ratio_by_cost", row, colBGColor);
	                    obj.SetCellBgColor("item_qty_gap", row, colBGColor);
	                }
	            }
	        } 
		}//"B"幗が 贗葛衛 if僥 褒ч 部!!!!!!!!!!!!!!!!!!!!!!
		if(B_Value == "D"){		//"D"幗が 贗葛衛 褒ч!
		
			var rowLeng_D = obj.GetRowCount();
		
			if(rowLeng_D >= 1){ //D幗が 贗葛衛 煎辦 蘋遴お陛 1檜鼻橾陽虜 儀擊 撲薑!
			
				//so_id 鏽歲曖 蟾晦高擊 撲薑.
				var so_id = obj.GetCellValue('so_id',1);
				
				for( var row=0 ; row<rowLeng ; row++ ) //row熱虜躑 奩犒
		        {
					
		            //Row 欽嬪煎鏽歲寡唳儀擊 掘碟и棻.
		            //蟾晦 撲薑脹 so_id高婁 ⑷營 so_id曖 煎辦 高擊綠掖п 偽戲賊 儀擊 艦л. 
		            if(obj.GetCellValue('so_id',row) == so_id)
		            {
		            	//譆蟾 艦п雖朝 高擎 �羃�. 偽擎 so_id高擎 偽擎 儀戲煎 艦п颶.
		            	//so_id陛 殖塭雖賊 斜�� 艦п雖朝 高擎 �蜓鶺� 脾.
		            	if(colBGColor != '255|255|255'){
		            		colBGColor='233|233|233';
		            	}else{
		            		colBGColor='255|255|255';
		            	}
		                
		                //鏽歲縑 儀擊 撢たж朝 睡碟.
		                for( var col=1 ; col<=14 ;col++) 
		                {
		                	//ROW掘碟 鏽歲 寡唳儀擊 雖薑и棻
		                    obj.SetCellBgColor("dc_type", row, colBGColor) ;
		                    obj.SetCellBgColor("rdc", row, colBGColor);
		                    obj.SetCellBgColor("item_id", row, colBGColor);
		                    obj.SetCellBgColor("res_id", row, colBGColor);
		                    obj.SetCellBgColor("pre_dctype", row, colBGColor);
		                    obj.SetCellBgColor("pre_dc", row, colBGColor);
		                    obj.SetCellBgColor("qty", row, colBGColor);
		                    obj.SetCellBgColor("src_loc", row, colBGColor);
		                    obj.SetCellBgColor("src_loc_name", row, colBGColor);
		                    obj.SetCellBgColor("tgt_loc", row, colBGColor);
		                    obj.SetCellBgColor("tgt_loc_name", row, colBGColor);
		                    obj.SetCellBgColor("cost_amt", row, colBGColor);
		                    obj.SetCellBgColor("box_per_palet", row, colBGColor);
		                    obj.SetCellBgColor("so_id", row, colBGColor);
		                }
		            }else if(obj.GetCellValue('so_id',row) != so_id){ //so_id高檜 殖塭雖賊 儀擊 夥紱晦嬪и 褻勒. 檜睡碟擎 so_id高渡 и廓虜 顫啪 腎橫 氈擠.
		            	
		            	//譆蟾 撢た脹 儀檜 �羃鶺拊Й� so_id陛 夥船賊憮 棻擠儀, �蜓鶺� 撢たж朝 睡碟.
		            	if(colBGColor != '233|233|233'){
		            		colBGColor='233|233|233';	
		            	}else{
		            		colBGColor='255|255|255';
		            	}
		            	
		            	for( var col=1 ;col<=14 ;col++) 
		                {
		                	//ROW掘碟 鏽歲 寡唳儀擊 雖薑и棻
		                    obj.SetCellBgColor("dc_type", row, colBGColor) ;
		                    obj.SetCellBgColor("rdc", row, colBGColor);
		                    obj.SetCellBgColor("item_id", row, colBGColor);
		                    obj.SetCellBgColor("res_id", row, colBGColor);
		                    obj.SetCellBgColor("pre_dctype", row, colBGColor);
		                    obj.SetCellBgColor("pre_dc", row, colBGColor);
		                    obj.SetCellBgColor("qty", row, colBGColor);
		                    obj.SetCellBgColor("src_loc", row, colBGColor);
		                    obj.SetCellBgColor("src_loc_name", row, colBGColor);
		                    obj.SetCellBgColor("tgt_loc", row, colBGColor);
		                    obj.SetCellBgColor("tgt_loc_name", row, colBGColor);
		                    obj.SetCellBgColor("cost_amt", row, colBGColor);
		                    obj.SetCellBgColor("box_per_palet", row, colBGColor);
		                    obj.SetCellBgColor("so_id", row, colBGColor);
		                    
		                    so_id = obj.GetCellValue('so_id',row);//so_id曖 蟾晦高擊 營薑曖.
		                }
		            }
		        }
			} //煎辦蘋遴お 1檜鼻橾 if僥 部.
		}//"D"幗が 贗葛衛 if僥 褒ч 部!!!!!!!!!!!!!!!!!!!!!!
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



