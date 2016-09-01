/*┌───────────────────────────────────────────┐
  │각 버튼의 JOB_ID를 설정.
  └───────────────────────────────────────────┘*/    
    var job_id  = 'expenseFactoryResult_list01'; //메뉴 최고 클릭시 JOB_ID
    var job_id1 = 'expenseFactoryResult_list01'; //A버튼 클릭시 JOB_ID
    var job_id2 = 'expenseFactoryResult_list02'; //B버튼 클릭시 JOB_ID
    var job_id3 = 'expenseFactoryResult_list03'; //C버튼 클릭시 JOB_ID
    var job_id4 = 'expenseFactoryResult_list04'; //D버튼 클릭시 JOB_ID
    
    //document.cookie = "webfxtab_tabPane1=1";    

/*┌────────────────────────────────────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생함. 
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.
  └────────────────────────────────────────────────────────────────┘*/
   function init() {
   	
       setProperty(GridObj);//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
       setHeader(GridObj);  //해더생성
       setDefault();        
   }


/*┌──────────────────────────────────┐
  │버튼 클릭에 따른 함수 호출
  └──────────────────────────────────┘*/   
   function btn_div(btn){
   	//alert(btn+"버튼클릭!");
   	
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


/*┌──────────────────────────────────┐
  │버튼 활성화 비활성화 제어.
  └──────────────────────────────────┘*/      
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
   
   
/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
   function setDefault()
   { 
        //그리드의 헤더 클릭시 쇼팅기능 활성화. 단, 그룹병합모드에서는 사용하면 안됨.
    	//GridObj.strHDClickAction    = "sortsingle";
   }
       
       
       
/*┌──────────────────────────────────┐
  │version 콤보박스 연동,,,
  └──────────────────────────────────┘*/
  //계획버전 콤보박스 선택에 따라 품목명의 콤보박스 변화. 1
   function versionCombo()
   { 
   		//alert("versionCombo 펑션안!!");
   		var version = document.all.version.value;
   		//alert("version : "+version);
  	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("version", version , "expenseFactoryResult_list_combo_item_list",versionComboResult);
   }   

/*┌──────────────────────────────────┐
  │version 콤보박스 연동,,,결과값!
  └──────────────────────────────────┘*/
  ////계획버전 콤보박스 선택에 따라 품목명의 콤보박스 변화. 2
   function versionComboResult(result)
   {
       var comboRs = '';
       
       //alert("result : "+ result);
       //alert("result length : " + result.length);
       
       //콤보박스에 기본으로 보일 옵션 값. All
	   document.all.item_list.options[0] = new Option("All","");       
       
       for( var i=1 ;i<result.length+1 ;i++) //전체 Row만큼 반복 한다.
       {
           //             0         1
           //comboRs [item_id, item_name] 값이 저장됨.
           comboRs = result[i-1].split('!%!');
           //alert("comboRS : "+comboRs);
           
           //                                                item_name , item_id
           //                                                  text값,     value값
           //document.all.item_list.options[i] = new Option(result[i],result[i-1]);
           document.all.item_list.options[i] = new Option(comboRs[1],comboRs[0]);
       }
   }

  
  
       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
   
   function setHeader(GridObj) 
   {
   	
   		//메뉴클릭시 기본으로 타는 곳.
   		if(B_Value == "Z"){
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader);
   		}   	
		//버튼에 클릭에 따른 헤더 생성 호출!   	
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




/*┌──────────────────────────────────┐
  │DB에 등록된 화면 해더 정보를 가져온다.
  └──────────────────────────────────┘*/

   function defaultHeader(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])        
       }
       
         //해더 그룹생성
//       GridObj.AddGroup("GR_REASON","보정");  //날짜 그룹
//       GridObj.AppendHeader("GR_REASON","R01_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_COUNT");
//       GridObj.AppendHeader("GR_REASON","R02_PERCENT");

	   //alert("GRidObj.....바운드 전!");
	   GridObj.BoundHeader();

         //Hidden 컬럼
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery();
   }






             
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch(service) 
   {
       doQuery();
   }
  
  
  
  
/*┌──────────────────────────────────┐
  │화면에 '저장'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSave  (service)
   {
   }
      


/*┌──────────────────────────────────┐
  │그리드의 셀 원클릭 이벤트
  └──────────────────────────────────┘*/
    function GridCellClick(strColumnKey, nRow){
		//alert(strColumnKey+''+nRow);
    }
    
    
/*┌──────────────────────────────────┐
  │그리드의 셀 더블클릭 이벤트
  └──────────────────────────────────┘*/
    function GridCellDblClick(strColumnKey, nRow){
    	if(B_Value == "A"){
    		
    	}
    	else if(B_Value == "B"){
    		
    	}
    	else if(B_Value == "C"){
    		//그리드의 해당 로우 더블클릭시 item_id 컬럼과 dcpath5 컬럼의 셀 값을 파라미터로 넘김.
    		//단, dcpath5 컬럼의 셀값이 null일 경우에는 dcpath4 컬럼의 셀값을 파라미터로 넘김.
    		
    		//alert("셀 더블클릭!!");
    		s_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("s_item_id : "+s_item_id);
    		
    		s_dcpath5_4 = GridObj.GetCellValue('dcpath5_cd',nRow);
    		//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		
    		if(s_dcpath5_4 == " "){
    			s_dcpath5_4 = GridObj.GetCellValue('dcpath4_cd',nRow);
    			//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		}
    		//alert("셀 더블클릭 끝!");
    		
    		//더블클릭시 파라미터를 가지고서 화면전환을 하기위한 설정들.
    		B_Value = "D";
    		display(B_Value);
			setHeader(GridObj);
    	}
    	else if(B_Value == "D"){
    		//그리드의 해당 로우 더블클릭시 item_id 컬럼과 tgt_loc 컬럼의 셀 값을 파라미터로 넘김.
    		
    		
    		
    		//alert("D 셀 더블클릭!!");
    		st_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("st_item_id : "+st_item_id);
    		
    		st_tgt_loc = GridObj.GetCellValue('tgt_loc',nRow);
    		//alert("st_tgt_loc : "+st_tgt_loc);
    		
    		document.all.st_item_id.value = st_item_id;
    		document.all.st_tgt_loc.value = st_tgt_loc;
    		
    		popup(st_item_id, st_tgt_loc);
    	}

    	
    }  

   
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
   	   //메뉴 클릭시 기본 실행
       if(B_Value == "Z"){
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       }
       
       //버튼에 따라 JOB ID 변경.
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
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
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

   
   

/*┌──────────────────────────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────────────────────────┘*/
    function GridEndQuery() 
    {
        var mode = GridObj.GetParam("mode");
        var error_msg = '';
          
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search") //조회가 완료된 경우
        {
            if(GridObj.GetStatus() == "true") 
            {
            	//A버튼 클릭시 실행되는 GridEndQuery
            	if(B_Value == "A"){
            		
            		//그리드의 헤더 클릭시 쇼팅기능 비활성화 및 선택컬럼의 모든 셀들이 선택된게 한다.
	                GridObj.strHDClickAction    = "select";
            		
            		//데이터를 그룹핑 한다.
	                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                
	                //셀의 정렬을 설정
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
	                
	                
	                //그리드 컬러 설정 함수 호출.
                	gridColSet(GridObj);
                	
            	}
            	//B버튼 클릭시 실행되는 GridEndQuery
            	if(B_Value == "B"){
            		
            		//그리드의 헤더 클릭시 쇼팅기능 비활성화 및 선택컬럼의 모든 셀들이 선택된게 한다.
	                GridObj.strHDClickAction    = "select";
            		
            		//데이터를 그룹핑 한다.
	                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name");
	                
	                //셀의 정렬을 설정
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
	                
	                //그리드 컬러 설정 함수 호출.
                	gridColSet(GridObj);
	                
            	}
            	//C버튼 클릭시 실행되는 GridEndQuery
            	if(B_Value == "C"){
            		//데이터를 그룹핑 한다.
	                //GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                //그리드의 헤더 클릭시 쇼팅기능 활성화.
	                GridObj.strHDClickAction    = "sortsingle";
	                
	                //셀의 정렬을 설정
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
	                
	                //로우 셀렉터 활성화
	                //GridObj.bRowSelectorVisible = true;
            	}
            	//D버튼 클릭시 실행되는 GridEndQuery
            	if(B_Value == "D"){
            		
            		//그리드의 헤더 클릭시 쇼팅기능 비활성화 및 선택컬럼의 모든 셀들이 선택된게 한다.
	                GridObj.strHDClickAction    = "select";            		
            		
            		//데이터를 그룹핑 한다.
	                GridObj.SetGroupMerge("so_id,dc_type,rdc,item_id");
            		
	                //셀의 정렬을 설정
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
	                
	                
	                //해당 컬럼을 숨김.
	                GridObj.SetColHide('so_id', true);
	                
	                //alert("컬러 설정 전!");
	                //그리드 컬러 설정 함수 호출.
                	gridColSet(GridObj);
            	}
            	
            	//메뉴 클릭시 기본 실행.
            	if(B_Value == "Z"){

           		//그리드의 헤더 클릭시 쇼팅기능 비활성화 및 선택컬럼의 모든 셀들이 선택된게 한다.
                GridObj.strHDClickAction    = "select";
            		
                //데이터를 그룹핑 한다.
                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
                //셀의 정렬을 설정
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
                
                //그리드 컬러 설정 함수 호출.
                gridColSet(GridObj);
            	}
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
        }
    }
    
    
/*┌──────────────────────────────────┐
  │조회 버튼 클릭시 실행.
  └──────────────────────────────────┘*/
GoSearch = function() {

	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	//alert("hllo");
	doQuery();
};



   
/*┌──────────────────────────────────────────────┐
  │그리드의 데이터가 변경 되었을 경우 처리되는 Fnc
  └──────────────────────────────────────────────┘*/
   
//   function GridChangeCell(strColumnKey, nRow) 
//   {
       /*
       if(strColumnKey != "SELECTED") {
           //??? ? SELECTED ?? ??? ??? ?? ???. 
           GridObj.SetCellValue("SELECTED", nRow, "1");
       }
       */
 //  }    
    

   
/*┌──────────────────────────────────┐
  │EXCEL
  └──────────────────────────────────┘*/
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

   

/*┌──────────────────────────────────┐
  │getdatetime
  └──────────────────────────────────┘*/
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
   

  
  


/*┌──────────────────────────────────┐
  │그리드의 사이즈 조절 Fnc
  └──────────────────────────────────┘*/
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
        
        // 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
        // ==> 화면이 더이상 축소되지 않음 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = tableHeightValue + "px"; 
//        document.WiseGrid2.height = tableHeightValue + "px"; 
        
    }  
           


/*┌──────────────────────────────────┐
  │MOUSE OVER 시, ROW 색상 변환
  └──────────────────────────────────┘*/
function GridMouseOver(strType, strColumnKey, nRow){
	
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
	if(B_Value == "C"){
		// 헤더는 동작없음
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '230|230|230');		
	}
	if(B_Value == "D"){
		// 헤더는 동작없음
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '230|230|230');
	}

	 
}

/*┌──────────────────────────────────┐
  │MOUSE OUT 시, ROW 색상 복구
  └──────────────────────────────────┘*/
function GridMouseOut(strType, strColumnKey, nRow){
	
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
	if(B_Value == "C"){	
	
		// 헤더는 동작없음
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '255|255|255');
	}
	if(B_Value == "D"){
		
		// 헤더는 동작없음
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '255|255|255');		
		
	}
}



/*┌──────────────────────────────────┐
  │팝업 뛰우게 하기!!
  └──────────────────────────────────┘*/
function popup(str1, str2){
//	var plant_id   = document.frm.selected_plant.value ;
//    var sdate = document.frm.sdate.value;
//    var edate = document.frm.edate.value;
    
//    document.frm.weekCnt.value = weekCnt;

	//alert("str1 : "+str1);
	//alert("str2 : "+str2);

	//실질적으로 화면에서 사용되는 그리드 값의 파라미터는 doQuery() 부분에서 넘겨줍니다.
	//밑의 파라미터는 화면상의 주소쪽에 출력될때 사용되는 값들입니다. 
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


 /*┌──────────────────────────────────┐
   │그리드 컬럼 Set 컬러 설정하기!!
   └──────────────────────────────────┘*/
    function gridColSet(obj)
    {
    	//현재 그리드의 총 로우 갯수.
        var rowLeng = obj.GetRowCount();
            
        var colBGColor='255|255|255';
            
		if(B_Value == "Z" || B_Value == "A"){//기본 Z 나 A 버튼 클릭시 실행.
			
	        for( var row=0 ; row<rowLeng ; row++ ) //row수만큼 반복
	        {
	            
	            if(obj.GetCellValue('anyang',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun컬럼의 Portion 로우가 0% 아니면 글씨를 굵게 한다.
	                {
	                    obj.SetCellFontBold("anyang", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('anseong',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun컬럼의 Portion 로우가 0% 아니면 글씨를 굵게 한다.
	                {
	                    obj.SetCellFontBold("anseong", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('anseong_u',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun컬럼의 Portion 로우가 0% 아니면 글씨를 굵게 한다.
	                {
	                    obj.SetCellFontBold("anseong_u", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('asan',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun컬럼의 Portion 로우가 0% 아니면 글씨를 굵게 한다.
	                {
	                    obj.SetCellFontBold("asan", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('gumi',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun컬럼의 Portion 로우가 0% 아니면 글씨를 굵게 한다.
	                {
	                    obj.SetCellFontBold("gumi", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('busan',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun컬럼의 Portion 로우가 0% 아니면 글씨를 굵게 한다.
	                {
	                    obj.SetCellFontBold("busan", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('noksan',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun컬럼의 Portion 로우가 0% 아니면 글씨를 굵게 한다.
	                {
	                    obj.SetCellFontBold("noksan", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('total',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun컬럼의 Portion 로우가 0% 아니면 글씨를 굵게 한다.
	                {
	                    obj.SetCellFontBold("total", row, 'true');
	                }
	            }
	            
	            
	            
	            //Row 단위로컬럼배경색을 구분한다.
	            if(obj.GetCellValue('gubun',row) == "Portion")
	            {
	                
	                colBGColor='233|233|233';
	                
	                for( var col=6 ;col<=14 ;col++) 
	                {
	                	  //ROW구분 컬럼 배경색을 지정한다
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
		}// 기본 "Z", "A"버튼 클릭시 if 문 끝!!!!!!!!!!!!!!!!!!!!.
		if(B_Value == "B"){		//"B"버튼 클릭시 실행!
			for( var row=0 ; row<rowLeng ; row++ ) //row수만큼 반복
	        {
	        	if(obj.GetCellValue('item_qty_gap',row) != ' ' && obj.GetCellValue('plant_id',row) == " "){//item_qty_gap컬럼이 ' '게 아니면 글씨를 굵게 한다.
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
	        	
	            //Row 단위로컬럼배경색을 구분한다.
	            if(obj.GetCellValue('plant_id',row) == " ")
	            {
	                colBGColor='233|233|233';
	                
	                for( var col=1 ;col<=14 ;col++) 
	                {
	                	//ROW구분 컬럼 배경색을 지정한다
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
		}//"B"버튼 클릭시 if문 실행 끝!!!!!!!!!!!!!!!!!!!!!!
		if(B_Value == "D"){		//"D"버튼 클릭시 실행!
		
			var rowLeng_D = obj.GetRowCount();
		
			if(rowLeng_D >= 1){ //D버튼 클릭시 로우 카운트가 1이상일때만 색을 설정!
			
				//so_id 컬럼의 초기값을 설정.
				var so_id = obj.GetCellValue('so_id',1);
				
				for( var row=0 ; row<rowLeng ; row++ ) //row수만큼 반복
		        {
					
		            //Row 단위로컬럼배경색을 구분한다.
		            //초기 설정된 so_id값과 현재 so_id의 로우 값을비교해 같으면 색을 칠함. 
		            if(obj.GetCellValue('so_id',row) == so_id)
		            {
		            	//최초 칠해지는 값은 흰색. 같은 so_id값은 같은 색으로 칠해짐.
		            	//so_id가 달라지면 그후 칠해지는 값은 회색이 됨.
		            	if(colBGColor != '255|255|255'){
		            		colBGColor='233|233|233';
		            	}else{
		            		colBGColor='255|255|255';
		            	}
		                
		                //컬럼에 색을 셋팅하는 부분.
		                for( var col=1 ; col<=14 ;col++) 
		                {
		                	//ROW구분 컬럼 배경색을 지정한다
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
		            }else if(obj.GetCellValue('so_id',row) != so_id){ //so_id값이 달라지면 색을 바꾸기위한 조건. 이부분은 so_id값당 한번만 타게 되어 있음.
		            	
		            	//최초 셋팅된 색이 흰색이므로 so_id가 바뀌면서 다음색, 회색을 셋팅하는 부분.
		            	if(colBGColor != '233|233|233'){
		            		colBGColor='233|233|233';	
		            	}else{
		            		colBGColor='255|255|255';
		            	}
		            	
		            	for( var col=1 ;col<=14 ;col++) 
		                {
		                	//ROW구분 컬럼 배경색을 지정한다
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
		                    
		                    so_id = obj.GetCellValue('so_id',row);//so_id의 초기값을 재정의.
		                }
		            }
		        }
			} //로우카운트 1이상일 if문 끝.
		}//"D"버튼 클릭시 if문 실행 끝!!!!!!!!!!!!!!!!!!!!!!
	}






// 조회 시 waiting 이미지 보여주기
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


// enter check 용 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// 자기화면 갱신
	//		GoSearch();
		}
	} 
}



