/*┌───────────────────────────────────────────┐
  │각 버튼의 JOB_ID를 설정.
  └───────────────────────────────────────────┘*/    
    var job_id  = 'sc_01010_capaAssignMaterialCompare_list01'; //메뉴 최초 클릭시 JOB_ID
    var job_id1 = 'sc_01010_capaAssignMaterialCompare_list01'; //A버튼 클릭시 JOB_ID1
    var job_id1_1 = 'sc_01010_capaAssignMaterialCompare_list01_1'; //A버튼 클릭시 JOB_ID1_1
    var job_id2 = 'sc_01010_capaAssignMaterialCompare_list02'; //B버튼 클릭시 JOB_ID2
    var job_id2_1 = 'sc_01010_capaAssignMaterialCompare_list02_1'; //B버튼 클릭시 JOB_ID2_1
    
    //document.cookie = "webfxtab_tabPane1=1";    

/*┌────────────────────────────────────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생함. 
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.
  └────────────────────────────────────────────────────────────────┘*/
   function init() {
   	
       setProperty(GridObj);//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
       setHeader(GridObj);  //해더생성
       //setDefault();
   }

   function init2() {
   	
       setProperty(GridObj2);//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
       setHeader2(GridObj2);  //해더생성
       //setDefault2();
   }


/*┌──────────────────────────────────┐
  │버튼 클릭에 따른 함수 호출
  └──────────────────────────────────┘*/   
   function btn_div(btn){
   	//alert(btn+"버튼클릭!");
   	
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


/*┌──────────────────────────────────┐
  │버튼 활성화 비활성화 제어.
  └──────────────────────────────────┘*/
  
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
    
    
   
   
/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
   function setDefault()
   { 
        //그리드의 헤더 클릭시 쇼팅기능 활성화. 단, 그룹병합모드에서는 사용하면 안됨.
    	//GridObj.strHDClickAction    = "sortsingle";
   }
       
       
       
/*┌──────────────────────────────────┐
  │version 콤보박스 연동,,,품목..
  └──────────────────────────────────┘*/
  //계획버전 콤보박스 선택에 따라 품목명의 콤보박스 변화. 1
   function versionCombo()
   { 
   		//alert("versionCombo 펑션안!!");
   		var version1 = document.all.version1.value;
   		var version2 = document.all.version2.value;
   		var res_code = document.all.res_code.value;
   		
   		//alert("version1 : "+version1+"  version2 : "+version2+"   res_code : "+res_code);
   		//alert("version : "+version);
  	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("version1!%!version2!%!res_code", version1+"!%!"+version2+"!%!"+res_code , "sc_01010_capaAssignMaterialCompare_list_combo_item_list",versionComboResult);
   }   

/*┌──────────────────────────────────┐
  │version 콤보박스 연동,,,결과값! 품목.
  └──────────────────────────────────┘*/
  ////계획버전 콤보박스 선택에 따라 품목명의 콤보박스 변화. 2
   function versionComboResult(result)
   {
       var comboRs = '';
       
       //alert("result : "+ result);
       //alert("result length : " + result.length);
       
       //콤보박스에 기본으로 보일 옵션 값. All
	   document.all.item_list.options[0] = new Option("All","");
	   
	   //콤보박의 옵션 값들을 초기화! 단, ALL은 보이게 하기위해 1.
	   document.all.item_list.options.length = 1;
	   
       for( var i=1 ;i<result.length+1 ;i++) //전체 Row만큼 반복 한다.
       {
           //             0         1
           //comboRs [item_id, item_name] 값이 저장됨.
           comboRs = result[i-1].split('!%!');
           //alert("comboRS : "+comboRs);
           
           document.all.item_list.options[i] = null; // option 초기화
           
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
   		//콤보박스 비활성화..
   		document.all.item_list.disabled = true;
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
   }


   function setHeader2(GridObj2) 
   {
   	
   		//메뉴클릭시 기본으로 타는 곳.
   		if(B_Value == "Z"){
   		//콤보박스 비활성화..
   		//document.all.item_list.disabled = true;
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id1_1 , "gird_header_list",defaultHeader2);
   		}   	
		//버튼에 클릭에 따른 헤더 생성 호출!   	
   	    if(B_Value == "A"){
	   	   GridObj2.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id1_1 , "gird_header_list",defaultHeader2);
   	    }
   	    if(B_Value == "B"){
	   	   GridObj2.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id2_1 , "gird_header_list",defaultHeader2);
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
       
		
		if(B_Value == "A"){
			GridObj.AddGroup("CAPA1", "무한 CAPA");		//그리드에 그룹을 등록한다. 
			GridObj.AppendHeader("CAPA1", "NC_QTY");	//무한 CAPA 수량
			GridObj.AppendHeader("CAPA1", "NC_RATE");	//무한 CAPA 비율
			GridObj.AppendHeader("CAPA1", "NC_AMOUNT");	//무한 CAPA 금액
			
			GridObj.AddGroup("CAPA2", "CAPA 제약");		//그리드에 그룹을 등록한다.
			GridObj.AppendHeader("CAPA2", "CA_QTY");	//CAPA 제약 수량
			GridObj.AppendHeader("CAPA2", "CA_RATE");	//CAPA 제약 비율
			GridObj.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 제약 금액
		}
		
		if(B_Value == "B"){
			GridObj.AddGroup("CAPA1", "무한 CAPA");		//그리드에 그룹을 등록한다. 
			GridObj.AppendHeader("CAPA1", "NC_QTY");	//무한 CAPA 수량
			GridObj.AppendHeader("CAPA1", "NC_EA");		//무한 CAPA 식수
			GridObj.AppendHeader("CAPA1", "NC_RATE");	//무한 CAPA 비율
			GridObj.AppendHeader("CAPA1", "NC_AMOUNT");	//무한 CAPA 금액
			
			GridObj.AddGroup("CAPA2", "CAPA 제약");		//그리드에 그룹을 등록한다.
			GridObj.AppendHeader("CAPA2", "CA_QTY");	//CAPA 제약 수량
			GridObj.AppendHeader("CAPA2", "CA_EA");		//CAPA 제약 식수
			GridObj.AppendHeader("CAPA2", "CA_RATE");	//CAPA 제약 비율
			GridObj.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 제약 금액
		}

		//메뉴클릭시 디폴트 헤더 그룹 구성.
		if(B_Value == "Z"){
			GridObj.AddGroup("CAPA1", "무한 CAPA");		//그리드에 그룹을 등록한다. 
			GridObj.AppendHeader("CAPA1", "NC_QTY");	//무한 CAPA 수량
			GridObj.AppendHeader("CAPA1", "NC_RATE");	//무한 CAPA 비율
			GridObj.AppendHeader("CAPA1", "NC_AMOUNT");	//무한 CAPA 금액
			
			GridObj.AddGroup("CAPA2", "CAPA 제약");		//그리드에 그룹을 등록한다.
			GridObj.AppendHeader("CAPA2", "CA_QTY");	//CAPA 제약 수량
			GridObj.AppendHeader("CAPA2", "CA_RATE");	//CAPA 제약 비율
			GridObj.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 제약 금액
		}
		


	   //alert("GRidObj.....바운드 전!");
	   GridObj.BoundHeader();

         //Hidden 컬럼
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery();
   }



   function defaultHeader2(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //전체 Row만큼 반복 한다.
       {
           arrHeader = result[i].split('!%!');
           GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])        
       }
       
		
		if(B_Value == "A"){
			GridObj2.AddGroup("CAPA1", "무한 CAPA");		//그리드에 그룹을 등록한다. 
			GridObj2.AppendHeader("CAPA1", "NC_QTY");	//무한 CAPA 수량
			GridObj2.AppendHeader("CAPA1", "NC_RATE");	//무한 CAPA 비율
			GridObj2.AppendHeader("CAPA1", "NC_AMOUNT");	//무한 CAPA 금액
			
			GridObj2.AddGroup("CAPA2", "CAPA 제약");		//그리드에 그룹을 등록한다.
			GridObj2.AppendHeader("CAPA2", "CA_QTY");	//CAPA 제약 수량
			GridObj2.AppendHeader("CAPA2", "CA_RATE");	//CAPA 제약 비율
			GridObj2.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 제약 금액
		}
		
		if(B_Value == "B"){
			GridObj2.AddGroup("CAPA1", "무한 CAPA");		//그리드에 그룹을 등록한다. 
			GridObj2.AppendHeader("CAPA1", "NC_QTY");	//무한 CAPA 수량
			GridObj2.AppendHeader("CAPA1", "NC_EA");		//무한 CAPA 식수
			GridObj2.AppendHeader("CAPA1", "NC_RATE");	//무한 CAPA 비율
			GridObj2.AppendHeader("CAPA1", "NC_AMOUNT");	//무한 CAPA 금액
			
			GridObj2.AddGroup("CAPA2", "CAPA 제약");		//그리드에 그룹을 등록한다.
			GridObj2.AppendHeader("CAPA2", "CA_QTY");	//CAPA 제약 수량
			GridObj2.AppendHeader("CAPA2", "CA_EA");		//CAPA 제약 식수
			GridObj2.AppendHeader("CAPA2", "CA_RATE");	//CAPA 제약 비율
			GridObj2.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 제약 금액
		}

		//메뉴클릭시 디폴트 헤더 그룹 구성.
		if(B_Value == "Z"){
			GridObj2.AddGroup("CAPA1", "무한 CAPA");		//그리드에 그룹을 등록한다. 
			GridObj2.AppendHeader("CAPA1", "NC_QTY");	//무한 CAPA 수량
			GridObj2.AppendHeader("CAPA1", "NC_RATE");	//무한 CAPA 비율
			GridObj2.AppendHeader("CAPA1", "NC_AMOUNT");	//무한 CAPA 금액
			
			GridObj2.AddGroup("CAPA2", "CAPA 제약");		//그리드에 그룹을 등록한다.
			GridObj2.AppendHeader("CAPA2", "CA_QTY");	//CAPA 제약 수량
			GridObj2.AppendHeader("CAPA2", "CA_RATE");	//CAPA 제약 비율
			GridObj2.AppendHeader("CAPA2", "CA_AMOUNT");	//CAPA 제약 금액
		}
		


	   //alert("GRidObj.....바운드 전!");
	   GridObj2.BoundHeader();

         //Hidden 컬럼
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery2();
   }


             
/*┌──────────────────────────────────┐
  │화면에 '조회'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
   function GoSearch(service) 
   {
       doQuery();
       doQuery2();
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
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
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
   	   //메뉴 클릭시 기본 실행
       if(B_Value == "Z"){
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1_1;
       }
       
       //버튼에 따라 JOB ID 변경.
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
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
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
	                GridObj.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                
	                //summary  bar!!
					GridObj.AddSummaryBar('SUMMARY1', '소계', 'CAT06_NAME', 'sum', 'NC_QTY,NC_RATE,NC_AMOUNT,CA_QTY,CA_RATE,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY2', '총계', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '200|250|200'); 
					GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '255|239|213'); 
					
					GridObj.SetSummaryBarFont('SUMMARY1', '굴림', '10', true, false, false, false); 
					GridObj.SetSummaryBarFont('SUMMARY2', '굴림', '10', true, false, false, false);  
	                
	                
	                
	                //셀의 정렬을 설정
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
	                
	                //number포맷 설정!
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
	                
	                

	                
	                //그리드 컬러 설정 함수 호출.
                	//gridColSet(GridObj);
                	
            	}
            	//B버튼 클릭시 실행되는 GridEndQuery
            	if(B_Value == "B"){
            		
            		//그리드의 헤더 클릭시 쇼팅기능 비활성화 및 선택컬럼의 모든 셀들이 선택된게 한다.
	                GridObj.strHDClickAction    = "select";
            		
            		//데이터를 그룹핑 한다.
	                GridObj.SetGroupMerge("CAT06,CAT06_NAME,ITEM_ID,ITEM_NAME");
	                
	                //summary  bar!!
					GridObj.AddSummaryBar('SUMMARY1', '소계', 'ITEM_NAME', 'sum', 'NC_QTY,NC_EA,NC_RATE,NC_AMOUNT,CA_QTY,CA_EA,CA_RATE,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY2', '합계', 'CAT06_NAME', 'sum', 'NC_QTY,NC_EA,NC_AMOUNT,CA_QTY,CA_EA,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY3', '총계', 'summaryall', 'sum', 'NC_QTY,NC_EA,NC_AMOUNT,CA_QTY,CA_EA,CA_AMOUNT'); 
					
					GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '200|250|200'); 
					GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '109|214|109');
					GridObj.SetSummaryBarColor('SUMMARY3', '0|0|0', '255|239|213'); 
					
					GridObj.SetSummaryBarFont('SUMMARY1', '굴림', '10', true, false, false, false); 
					GridObj.SetSummaryBarFont('SUMMARY2', '굴림', '10', true, false, false, false);
					GridObj.SetSummaryBarFont('SUMMARY3', '굴림', '10', true, false, false, false);  	                
	                
	                
	                //셀의 정렬을 설정
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
	                
	                //number포맷 설정!
	                
	                GridObj.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('NC_EA','#################,##0.##');
	                GridObj.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('CA_EA','#################,##0.##');
	                GridObj.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                //그리드 컬러 설정 함수 호출.
                	//gridColSet(GridObj);
	                
            	}
            	
            	//메뉴 클릭시 기본 실행.
            	if(B_Value == "Z"){

	           		//그리드의 헤더 클릭시 쇼팅기능 비활성화 및 선택컬럼의 모든 셀들이 선택된게 한다.
	                GridObj.strHDClickAction    = "select";
	            		
	                //데이터를 그룹핑 한다.
	                GridObj.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                //summary  bar!!
					GridObj.AddSummaryBar('SUMMARY1', '소계', 'CAT06_NAME', 'sum', 'NC_QTY,NC_RATE,NC_AMOUNT,CA_QTY,CA_RATE,CA_AMOUNT');
					GridObj.AddSummaryBar('SUMMARY2', '총계', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '200|250|200'); 
					GridObj.SetSummaryBarColor('SUMMARY2', '0|0|0', '255|239|213'); 
					
					GridObj.SetSummaryBarFont('SUMMARY1', '굴림', '10', true, false, false, false); 
					GridObj.SetSummaryBarFont('SUMMARY2', '굴림', '10', true, false, false, false);                
                
                
                //셀의 정렬을 설정
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
	                
	                //number포맷 설정!
	                GridObj.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
                
                //그리드 컬러 설정 함수 호출.
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
        
        if(mode == "search") //조회가 완료된 경우
        {
            if(GridObj2.GetStatus() == "true") 
            {
            	//A버튼 클릭시 실행되는 GridEndQuery
            	if(B_Value == "A"){
            		
            		//그리드의 헤더 클릭시 쇼팅기능 비활성화 및 선택컬럼의 모든 셀들이 선택된게 한다.
	                GridObj2.strHDClickAction    = "select";
            		
            		//데이터를 그룹핑 한다.
	                GridObj2.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                
	                //summary  bar!!
					GridObj2.AddSummaryBar('SUMMARY1', '총계', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|239|213'); 
					
					GridObj2.SetSummaryBarFont('SUMMARY1', '굴림', '10', true, false, false, false);  
	                
	                
	                
	                //셀의 정렬을 설정
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
	                
	                //number포맷 설정!
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
	                
	                

	                
	                //그리드 컬러 설정 함수 호출.
                	//gridColSet(GridObj);
                	
            	}
            	//B버튼 클릭시 실행되는 GridEndQuery
            	if(B_Value == "B"){
            		
            		//그리드의 헤더 클릭시 쇼팅기능 비활성화 및 선택컬럼의 모든 셀들이 선택된게 한다.
	                GridObj2.strHDClickAction    = "select";
            		
            		//데이터를 그룹핑 한다.
	                GridObj2.SetGroupMerge("CAT06,CAT06_NAME,ITEM_ID,ITEM_NAME");
	                
	                //summary  bar!!
					GridObj2.AddSummaryBar('SUMMARY1', '총계', 'summaryall', 'sum', 'NC_QTY,NC_EA,NC_AMOUNT,CA_QTY,CA_EA,CA_AMOUNT'); 
					
					GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|239|213'); 
					
					GridObj2.SetSummaryBarFont('SUMMARY1', '굴림', '10', true, false, false, false);  	                
	                
	                
	                //셀의 정렬을 설정
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
	                
	                //number포맷 설정!
	                
	                GridObj2.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_EA','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_EA','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
	                
	                //그리드 컬러 설정 함수 호출.
                	//gridColSet(GridObj);
	                
            	}
            	
            	//메뉴 클릭시 기본 실행.
            	if(B_Value == "Z"){

	           		//그리드의 헤더 클릭시 쇼팅기능 비활성화 및 선택컬럼의 모든 셀들이 선택된게 한다.
	                GridObj2.strHDClickAction    = "select";
	            		
	                //데이터를 그룹핑 한다.
	                GridObj2.SetGroupMerge("CAT06,CAT06_NAME");
	                
	                
	                //summary  bar!!
					GridObj2.AddSummaryBar('SUMMARY1', '총계', 'summaryall', 'sum', 'NC_QTY,NC_AMOUNT,CA_QTY,CA_AMOUNT'); 
					
					GridObj2.SetSummaryBarColor('SUMMARY1', '0|0|0', '255|239|213'); 
					
					GridObj2.SetSummaryBarFont('SUMMARY1', '굴림', '10', true, false, false, false);               
                
                
                //셀의 정렬을 설정
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
	                
	                //number포맷 설정!
	                GridObj2.SetNumberFormat('NC_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('NC_AMOUNT','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_QTY','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_RATE','#################,##0.##');
	                GridObj2.SetNumberFormat('CA_AMOUNT','#################,##0.##');
	                //GridObj.SetNumberFormat('PO_QTY1','####################.##');	                
	                
                
                //그리드 컬러 설정 함수 호출.
                //gridColSet(GridObj);
            	}
            } else    
            { 
                error_msg = GridObj2.GetMessage(); 
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
	doQuery2();
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
  │MOUSE OVER 시, ROW 색상 변환
  └──────────────────────────────────┘*/
function GridMouseOver(strType, strColumnKey, nRow){
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
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
}




 /*┌──────────────────────────────────┐
   │그리드 컬럼 Set 컬러 설정하기!!
   └──────────────────────────────────┘*/
    function gridColSet(obj)
    {
    	//현재 그리드의 총 로우 갯수.
        var rowLeng = obj.GetRowCount();
        var colBGColor='255|255|255';
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





/*┌──────────────────────────────────┐
  │그리드의 사이즈 조절 Fnc
  └──────────────────────────────────┘*/
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
    
    // 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
    // ==> 화면이 더이상 축소되지 않음 
    if( tabHeightValue < 1 ) 
        tabHeightValue = 1; 
    if( tableHeightValue < 1 ) 
        tableHeightValue = 1; 
    
    //tabPage1.style.height = tabHeightValue + "px"; 
    //tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = (tableHeightValue/3*2) + "px"; 
	document.WiseGrid2.height = (tableHeightValue/3*1) + "px"; 
}     


