//############################################################
//## Щ煎斜極ID      : expenseFactoryResult_list.vm
//## Щ煎斜極貲      : 綠辨晦奩 奢濰й渡唸婁 褻�� UI �飛�
//## 偃嫦濠          : 夢辨熱
//## 偃嫦橾濠        : 
//##
//## 婦溼 job file   : job_sc_16010_dailyWorkTotalization_list.xml
//## 婦溼 query file : query_sc_16010_dailyWorkTotalization_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             瞪羲 滲熱            ----------------------------------------------//



/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛陝 幗が曖 JOB_ID蒂 撲薑.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/    
    var job_id  = 'expenseFactoryResult_popup'; //詭景 譆堅 贗葛衛 JOB_ID
    
    //document.cookie = "webfxtab_tabPane1=1";    
    
    

/*忙式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式忖
  弛WiseGrid 螃粽薛お陛 儅撩腎堅 蟾晦�音� �� 嫦儅л. 
  弛JavaScript Event檣 Initialize()蒂 嫡嬴 斜葬萄曖 ④渦蒂 撢たи棻.
  戌式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式式戎*/
   function init() {
       setProperty(GridObj);//WiseGrid Default撲薑 睡碟 (WiseGrid_Property.jsだ橾 頂縑 摹樹腎橫 氈棻.)
       setHeader(GridObj);  //п渦儅撩 
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
       
       //var version = document.all.version.value;
       //var res_code = document.all.res_code.value;
       
       
       //睡賅 Щ溯歜縑憮 嫡嬴螞 だ塭嘐攪蒂 で機璽縑憮 餌辨.
       var p_st_item_id = opener.document.all.st_item_id.value;
       var p_st_tgt_loc = opener.document.all.st_tgt_loc.value;
       
       //alert("p_st_item_id : "+p_st_item_id);
       //alert("p_st_tgt_loc : "+p_st_tgt_loc);
       
       
       
       //alert("version : "+ version);
       //alert("res_code : "+res_code);

       //var startDate = document.all.start_date.value;
       //var endDate   = document.all.end_date.value;
       //var plant_id  = document.all.selected_plant.value;
       
       //剩啖還 高菟擊虜萇棻.( だ塭嘐攪 薑曖 睡碟 )
       GridObj.SetParam("mode", "search");
       //GridObj.SetParam("version", version);
       //GridObj.SetParam("res_code", res_code);
       
       GridObj.SetParam("s_item_id", s_item_id);
       GridObj.SetParam("s_dcpath5_4", s_dcpath5_4);
       
       //睡賅 Щ溯歜縑憮 嫡嬴螞 だ塭嘐攪蒂 で機璽縑憮 餌辨.
       GridObj.SetParam("p_st_item_id", p_st_item_id);
       GridObj.SetParam("p_st_tgt_loc", p_st_tgt_loc);              
              
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
            		//等檜攪蒂 斜瑜ё и棻.
	                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('cat06','center')
	                GridObj.SetColCellAlign('cat06_name','left')
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('item_name','left')
	                GridObj.SetColCellAlign('spec','left')
	                GridObj.SetColCellAlign('gubun','center')
	                GridObj.SetColCellAlign('anyang','right')
	                GridObj.SetColCellAlign('anseong','right')
	                GridObj.SetColCellAlign('anseong_u','right')
	                GridObj.SetColCellAlign('asan','right')
	                GridObj.SetColCellAlign('gumi','right')
	                GridObj.SetColCellAlign('busan','right')
	                GridObj.SetColCellAlign('noksan','right')
	                GridObj.SetColCellAlign('total','right')
            	}
            	//B幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "B"){
            		//等檜攪蒂 斜瑜ё и棻.
	                GridObj.SetGroupMerge("item_id,item_name");
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('item_name','left')
	                GridObj.SetColCellAlign('spec','left')
	                GridObj.SetColCellAlign('plant_id','left')
	                GridObj.SetColCellAlign('plant_name','left')
	                GridObj.SetColCellAlign('real_fix_cost','right')
	                GridObj.SetColCellAlign('real_chg_cost','right')
	                GridObj.SetColCellAlign('qty_by_rate','right')
	                GridObj.SetColCellAlign('plant_ratio_by_rate','right')
	                GridObj.SetColCellAlign('qty_by_cost','right')
	                GridObj.SetColCellAlign('plant_ratio_by_cost','right')
	                GridObj.SetColCellAlign('item_qty_gap','center')
            	}
            	//C幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "C"){
            		//等檜攪蒂 斜瑜ё и棻.
	                //GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('cat06','left')
	                GridObj.SetColCellAlign('cat06_name','left')
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('item_name','left')
	                GridObj.SetColCellAlign('spec','left')
	                GridObj.SetColCellAlign('dcpath1','left')
	                GridObj.SetColCellAlign('dcpath2','left')
	                GridObj.SetColCellAlign('dcpath3','left')
	                GridObj.SetColCellAlign('dcpath4','left')
	                GridObj.SetColCellAlign('dcpath5','left')
	                GridObj.SetColCellAlign('qty','right')
	                GridObj.SetColCellAlign('box_amt','right')
	                GridObj.SetColCellAlign('total_amt','right')
	                GridObj.SetColCellAlign('dcpath4_cd','left')
	                GridObj.SetColCellAlign('dcpath5_cd','left')
	                
	                //煎辦 撚滓攪 �側瘓�
	                //GridObj.bRowSelectorVisible = true;
            	}
            	//D幗が 贗葛衛 褒ч腎朝 GridEndQuery
            	if(B_Value == "D"){
            		
	                //撚曖 薑溺擊 撲薑
	                GridObj.SetColCellAlign('dc_type','left')
	                GridObj.SetColCellAlign('rdc','left')
	                GridObj.SetColCellAlign('item_id','left')
	                GridObj.SetColCellAlign('res_id','left')
	                GridObj.SetColCellAlign('pre_dctype','left')
	                GridObj.SetColCellAlign('pre_dc','left')
	                GridObj.SetColCellAlign('qty','left')
	                GridObj.SetColCellAlign('src_loc','left')
	                GridObj.SetColCellAlign('src_loc_name','left')
	                GridObj.SetColCellAlign('tgt_loc','left')
	                GridObj.SetColCellAlign('tgt_loc_name','left')
	                GridObj.SetColCellAlign('cost_amt','right')
	                GridObj.SetColCellAlign('box_per_palet','right')            		
            	}
            	
            	//詭景 贗葛衛 晦獄 褒ч. で機璽 晦獄 ④渦 儅撩!
            	if(B_Value == "Z"){
                //等檜攪蒂 斜瑜ё и棻.
                //GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
                //撚曖 薑溺擊 撲薑
                GridObj.SetColCellAlign('item_id','left')
                GridObj.SetColCellAlign('item_name','left')
                GridObj.SetColCellAlign('spec','left')
                GridObj.SetColCellAlign('src_loc','left')
                GridObj.SetColCellAlign('tgt_loc','left')
                GridObj.SetColCellAlign('src_loc_name','left')
                GridObj.SetColCellAlign('tgt_loc_name','left')
                GridObj.SetColCellAlign('cost','right')
                GridObj.SetColCellAlign('trans_cost','right')
                GridObj.SetColCellAlign('real_cost','right')
                
                //GridObj.SetNumberFormat("late_day", "#,##0.00");
				GridObj.SetNumberFormat("cost", "#,###");// # 檜賊 高檜 null檜賊 轎溘檜 寰脾, 0 檜賊 高檜 null檜橫紫 轎溘!
 				GridObj.SetNumberFormat("trans_cost", "#,###");// # 檜賊 高檜 null檜賊 轎溘檜 寰脾, 0 檜賊 高檜 null檜橫紫 轎溘!
 				GridObj.SetNumberFormat("real_cost", "#,###");// # 檜賊 高檜 null檜賊 轎溘檜 寰脾, 0 檜賊 高檜 null檜橫紫 轎溘!
                
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
		GridObj.SetRowBgColor(nRow, '230|230|230');		
	}
	if(B_Value == "D"){
		// ④渦朝 翕濛橈擠
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '230|230|230');
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
		GridObj.SetRowBgColor(nRow, '255|255|255');
	}
	if(B_Value == "D"){
		
		// ④渦朝 翕濛橈擠
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		GridObj.SetRowBgColor(nRow, '255|255|255');		
		
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

	alert("str1 : "+str1);
	alert("str2 : "+str2);
 
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

























// 薯ヶ 匐儀 POPUP
function openDCAllocationItemPopup( obj ) { 	
	
	var	in_work_date = delDateDelimiter(document.frm.in_work_date.value); 	//濛機橾濠		
	var	in_date_term = "3"; 					//褻�萵滶�	
	var	in_term_cnt	 = "0"; 												//褻�蛻狨�	

	if( in_work_date == "" || in_work_date == null ) {
		alert("濛機橾濠蒂 殮溘ж褊衛蹂!");
		document.frm.in_work_date.focus();
		return;
	} 

	var service_url = "service.do?_moon_service=ip_02030_dcAllocationItem_popup";
	service_url += "&_moon_perpage=-1&_moon_pagenumber=1";
	service_url += "&in_work_date=" + in_work_date +"&in_date_term=" + in_date_term+"&in_term_cnt=" + in_term_cnt;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=450, height=350, top=0, left=0";
	var newWin = window.open(service_url, "Item_Search", pop_win_style);
	newWin.focus();

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
				document.frm.in_alloc_item_name.value = arrList[0][1];
				document.frm.item_name.value = arrList[0][1];
				document.frm.in_alloc_reason_comment.value = "";
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





// 褻��
/*
GoEdit = function() {

	var in_work_date = document.frm.in_work_date.value;
	var in_alloc_item = document.frm.in_alloc_item.value;
	var in_alloc_item_name = document.frm.in_alloc_item_name.value;

	var urlStr = "service.do?_moon_service=ip_02040_SalesAllocation_mod";
	urlStr += "&in_work_date=" + in_work_date + "&in_alloc_item=" + in_alloc_item + "&item_name=" + in_alloc_item_name;

	// 褻�蜇� WAITING 檜嘐雖 爾罹輿晦
	viewWait();

	location.href = urlStr;
	
};
*/

// 褻�� 衛 waiting 檜嘐雖 爾罹輿晦
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			gridArea2.style.display = "none";
			waitArea.style.display = "block";
			waitArea2.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			gridArea2.style.display = "block";
			waitArea.style.display = "none";
			waitArea2.style.display = "none";
		}
	}
	
}



