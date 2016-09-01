/*┌───────────────────────────────────────────┐
  │각 버튼의 JOB_ID를 설정.
  └───────────────────────────────────────────┘*/    
    var job_id  = 'sc_01060_plantAllocationPlanResultAnalysis_grid'; //메뉴 최고 클릭시 JOB_ID
    var class_path = "com.wisegrid.admin.";
    
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
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
   function setDefault()
   {
   		//GridObj.SetCRUDMode("CRUD", "생성", "수정", "삭제");
        //그리드의 헤더 클릭시 쇼팅기능 활성화. 단, 그룹병합모드에서는 사용하면 안됨.
    	GridObj.strHDClickAction    = "sortsingle";
   }
       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
   
   function setHeader(GridObj) 
   {
   		//메뉴클릭시 기본으로 타는 곳.
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader);
   }

/*┌──────────────────────────────────┐
  │DB에 등록된 화면 해더 정보를 가져온다.
  └──────────────────────────────────┘*/
   function defaultHeader(result)
   {
	   var result_cnt = result.length;
	   //alert("result_cnt : "+result_cnt); //36개의 컬럼..
       var test = '';
       var arrHeader = '';
/*       for( var i=0 ;i<result.length ;i++) //전체 컬럼 수 만큼 반복 한다.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])
       }
*/
			GridObj.AddHeader("CRUD"						,"CRUD"       				,"t_text" 	,100 ,50  ,false);
			GridObj.AddHeader("RES_TP"						,"설비유형"       			,"t_text" 	,100 ,40  ,false);
			GridObj.AddHeader("ITEM_ID"						,"제품코드"       			,"t_text" 	,100 ,80  ,false);
			GridObj.AddHeader("ITEM_NAME"					,"제품명"       				,"t_text" 	,100 ,150 ,false);
			GridObj.AddHeader("W3_AVG_RATIO"				,"3주평균\n접근율"       		,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("W1_AVG_RATIO"				,"1주평균\n접근율"       		,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("SAFETY_STOCK"				,"안전재고"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("BASE_STOCK"					,"조회일\n기초재고"  			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("MI_CHGO"						,"수출\n미출고"  				,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("RECEIPT_EXPT"				,"금주\n생산계획"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_PLAN"					,"금주\n판매계획"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_ACT_VS_SALES_PLAN_1"	,"금주\n판매계획\n대비실적"    ,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("SALES_VS_WEEK1_AVG"			,"1주평균\n판매대비"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("EXPERT_STOCK"				,"예상재고\n(차주초)"       	,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("N_PLAN_VS_STOCK_WORK"		,"계획대비\n재고일수"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("N_ACT_VS_STOCK_WORK"			,"실적대비\n재고일수"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("N_RECEIPT_EXPT"				,"생산예시\(전주계획시)"		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("RP1_QTY"						,"보충요구량"       			,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("PO_QTY1"						,"생산필요량"       			,"t_text" 	,100 ,70 ,true );
			GridObj.AddHeader("NWK_ADJ_QTY"					,"요구/생산\n차이"       		,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("W1_SALES_PLAN_DIFF"			,"판매계획\n가감량\n(1주AVG)" ,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("W3_SALES_PLAN_DIFF"			,"판매계획\n가감량\n(3주AVG)" ,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("N_SALES_PLAN"				,"판매계획"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_ACT_VS_SALES_PLAN_2"	,"판매계획\n대비실적"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("EXPERT_STOCK2"				,"예상재고"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("NN_PLAN_VS_STOCK_WORK"		,"계획대비\n재고일수"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("NN_ACT_VS_STOCK_WORK"		,"실적대비\n재고일수"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("RP2_QTY"						,"보충요구량"       			,"t_text" 	,100 ,70 ,false);
			GridObj.AddHeader("PO_QTY2"						,"생산필요량"       			,"t_text" 	,100 ,70 ,true );
			GridObj.AddHeader("NN_SALES_PLAN"				,"판매계획"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_ACT_VS_SALES_PLAN_3"	,"판매계획\n대비실적"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("EXPERT_STOCK3"				,"예상재고"       			,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("NNN_ACT_VS_STOCK_WORK"		,"실적대비\n재고일수"       	,"t_number" ,12.2 ,70 ,false);
			GridObj.AddHeader("RP0_QTY"						,"당주생산필요량"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("W1"							,"W1_당주\n토요일"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("W2"							,"W2_차주\n토요일"       		,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("W3"							,"W3_차차주\n토요일"       	,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("NNWK_WORK"					,"차차주\n영업일수"       	,"t_text" 	,100 ,70  ,false);
			GridObj.AddHeader("SALES_MEAN_1WEEK"			,"1주평균판매"       			,"t_text" 	,100 ,70  ,false);
			
			//헤더컬럼쪽 라인..사이즈 및 폰트사이즈 조절.
			GridObj.nHDLines = 3; //헤더 부분 글 출력을 2줄까지 사용함.
			GridObj.nHDLineSize = 22; //헤더 컬럼의 높이 사이즈.
			GridObj.nHDFontSize = 8; //헤더 컬럼의 폰트 사이즈.
			
			//그리드 순서 매기기
			GridObj.bRowSelectorVisible = true;
			GridObj.bRowSelectorIndex = true;
		
			GridObj.AddGroup("WEEK", "당주(W)");			//그리드에 그룹을 등록한다. 
			GridObj.AppendHeader("WEEK", "W3_AVG_RATIO");	//3주 평균 접근율
			GridObj.AppendHeader("WEEK", "W1_AVG_RATIO");	//1주 평균접근율
			GridObj.AppendHeader("WEEK", "SAFETY_STOCK");	//안전재고
			GridObj.AppendHeader("WEEK", "BASE_STOCK");		//기초재고
			GridObj.AppendHeader("WEEK", "MI_CHGO");		//수출미출고
			GridObj.AppendHeader("WEEK", "RECEIPT_EXPT");	//생산계획
			GridObj.AppendHeader("WEEK", "SALES_PLAN");		//판매계획
			GridObj.AppendHeader("WEEK", "SALES_ACT_VS_SALES_PLAN_1");	//판매계획대비실적
			GridObj.AppendHeader("WEEK", "SALES_VS_WEEK1_AVG");			//1주 평균 판매 대
			
			GridObj.AddGroup("WEEK1", "차주(W+1)");			//그리드에 그룹을 등록한다. 
			GridObj.AppendHeader("WEEK1", "EXPERT_STOCK");			//예상재고(차주초)
			GridObj.AppendHeader("WEEK1", "N_PLAN_VS_STOCK_WORK");	//계획대비재고일
			GridObj.AppendHeader("WEEK1", "N_ACT_VS_STOCK_WORK");	//실적대비재고일수
			GridObj.AppendHeader("WEEK1", "N_RECEIPT_EXPT");		//생산계획
			GridObj.AppendHeader("WEEK1", "RP1_QTY");				//보충요구량
			GridObj.AppendHeader("WEEK1", "PO_QTY1");				//생산필요량
			GridObj.AppendHeader("WEEK1", "NWK_ADJ_QTY");			//요구/생산차이
			GridObj.AppendHeader("WEEK1", "W1_SALES_PLAN_DIFF");	//판매계획가감량(1주평균)
			GridObj.AppendHeader("WEEK1", "W3_SALES_PLAN_DIFF");	//판매계획가감량(3주평균)
			GridObj.AppendHeader("WEEK1", "N_SALES_PLAN");			//판매계획
			GridObj.AppendHeader("WEEK1", "SALES_ACT_VS_SALES_PLAN_2");	//판매계획대비실적
		
			GridObj.AddGroup("WEEK2", "차차주(W+2)");			//그리드에 그룹을 등록한다. 
			GridObj.AppendHeader("WEEK2", "EXPERT_STOCK2");				//예상재고
			GridObj.AppendHeader("WEEK2", "NN_PLAN_VS_STOCK_WORK");		//계획대비재고일수
			GridObj.AppendHeader("WEEK2", "NN_ACT_VS_STOCK_WORK");		//실적대비재고일수
			GridObj.AppendHeader("WEEK2", "RP2_QTY");					//보충요구량
			GridObj.AppendHeader("WEEK2", "PO_QTY2");					//생산필요량
			GridObj.AppendHeader("WEEK2", "NN_SALES_PLAN");				//판매계획
			GridObj.AppendHeader("WEEK2", "SALES_ACT_VS_SALES_PLAN_3");	//판매계획대비실적
			GridObj.AppendHeader("WEEK2", "EXPERT_STOCK3");				//예상재고
			GridObj.AppendHeader("WEEK2", "NNN_ACT_VS_STOCK_WORK");		//실적대비재고일수

	   //alert("GRidObj.....바운드 전!");
	   GridObj.BoundHeader();
	   
	   GridObj.SetCRUDMode("CRUD", "생성", "수정", "삭제");

       //Hidden 컬럼
       GridObj.SetColHide("CRUD",true);
       GridObj.SetColHide("RP0_QTY",true);
       GridObj.SetColHide("W1",true);
       GridObj.SetColHide("W2",true);
       GridObj.SetColHide("W3",true);
       GridObj.SetColHide("NNWK_WORK",true);
       GridObj.SetColHide("SALES_MEAN_1WEEK",true);
       GridObj.SetColHide("MI_CHGO",true);
       
       //특정컬럼 고정!!
       GridObj.SetColFix('ITEM_NAME'); 
       
   }


/*┌──────────────────────────────────┐
  │조회 버튼 클릭시 실행.
  └──────────────────────────────────┘*/
GoSearch = function() {

/*	if(document.frm.checked_domain[3].checked == true) {
		// 내수,수출 담당이 동시에 작업할 경우 전체상태에서 작업할 경우는 서로의 작업데이터를 삭제시킬 위험이 있다.
		if(confirm("전체조회시는 저장할 수 없습니다! \n 계속 조회하시겠습니까?") != 1 ) {
			return;
		}
	}
*/
	doQuery();
};


/*┌──────────────────────────────────┐
  │화면에 '저장'를 누르면 호출 Fnc
  └──────────────────────────────────┘*/
GoSave = function() {
	
/*	if(document.frm.checked_domain[3].checked == true) {
		// 내수,수출 담당이 동시에 작업할 경우 전체상태에서 작업할 경우는 서로의 작업데이터를 삭제시킬 위험이 있다.
		alert("전체조회시는 저장할 수 없습니다! ");
		return;
	}
*/	
	doSave();
};

/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
   	   //메뉴 클릭시 기본 실행
       var servlet_url = Project_name+"/servlet/" + class_path + job_id;

       //라디오 버튼 구분 [내수, 수출MTS, 수출MTO, 천체]
/*       if(document.frm.checked_domain[0].checked == true){
       	checked_domain = "DO";       	
       }else if(document.frm.checked_domain[1].checked == true){
       	checked_domain = "EXMTS";
       }else if(document.frm.checked_domain[2].checked == true){
       	checked_domain = "EXMTO";
       }else if(document.frm.checked_domain[3].checked == true){
       	checked_domain = "";
       }
*/
      	checked_domain = "DO";  
      	       
       //라디오 버튼 구분 [생산필요량, 생산계획]
       if(document.frm.checked_pa_pr[0].checked == true){
       	checked_pa_pr = "";
       }else if(document.frm.checked_pa_pr[1].checked == true){
       	checked_pa_pr = "PR";
       }

       var sdate = document.all.sdate.value;
       var plant_alloc_version;

		// 1차공장할당 정보를 가져온다.
		commonUtil.getCodeInfo("sdate", sdate, "plant_alloc_version2", { 
			callback:function(arrList){
				// 일치하는 CODE 없음
				if( arrList.length == 1 ) {
	       			
	       			plant_alloc_version = arrList[0][0];

					if(confirm("공장할당버젼 :"+ plant_alloc_version + " => "
								+ plant_alloc_version.substring(4,6)+"/"+plant_alloc_version.substring(6,8) + "일에 수행!"
								+"\n 조회하시겠습니까?") == true) {
						//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
						GridObj.SetParam("mode", "search");
						GridObj.SetParam("plant_alloc_version", plant_alloc_version);
						GridObj.SetParam("sdate", sdate);
						GridObj.SetParam("checked_domain", checked_domain);
						GridObj.SetParam("checked_pa_pr", checked_pa_pr);
						GridObj.DoQuery(servlet_url);
					}
				}
				else {
					alert("1차공장할당 버젼정보가 없습니다! 시스템관리자에게 문의하세요!");
				}
	 		}
		});
    
   }

/*┌──────────────────────────────────┐
  │저장
  └──────────────────────────────────┘*/
	function doSave() {
		
		var servlet_url = Project_name+"/servlet/" + class_path + job_id;
		
       //라디오 버튼 구분 [내수, 수출MTS, 수출MTO, 천체]
/*       if(document.frm.checked_domain[0].checked == true){
       	checked_domain = "DO";       	
       }else if(document.frm.checked_domain[1].checked == true){
       	checked_domain = "EXMTS";
       }else if(document.frm.checked_domain[2].checked == true){
       	checked_domain = "EXMTO";
       }else if(document.frm.checked_domain[3].checked == true){
       	checked_domain = "";
       }
*/       
       checked_domain = "DO";
       
       //라디오 버튼 구분 [생산필요량, 생산계획]
       if(document.frm.checked_pa_pr[0].checked == true){
       	checked_pa_pr = "";
       }else if(document.frm.checked_pa_pr[1].checked == true){
       	checked_pa_pr = "PR";
       }

       var sdate = document.all.sdate.value;
       var plant_alloc_version;

		// 1차공장할당 정보를 가져온다.
		commonUtil.getCodeInfo("sdate", sdate, "plant_alloc_version2", { 
			callback:function(arrList){
				// 일치하는 CODE 없음
				if( arrList.length == 1 ) {
	       			
	       			plant_alloc_version = arrList[0][0];
					//user_id
					GridObj.SetParam("user_id", document.frm._user_id.value);
			
			        //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
			   		//WiseGrid가 서버에 전송할 mode를 셋팅한다.
			        GridObj.SetParam("mode", "save");

			       	GridObj.SetParam("p_in_up_chk", "p_update");
			        GridObj.SetParam("plant_alloc_version", plant_alloc_version);
			        GridObj.SetParam("sdate", sdate);
			        GridObj.SetParam("checked_domain", checked_domain);
			        GridObj.SetParam("checked_pa_pr", checked_pa_pr);
					
					//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
					GridObj.DoQuery(servlet_url, "CRUD");

				}
				else {
					alert("1차공장할당 버젼정보가 없습니다! 시스템관리자에게 문의하세요!");
				}
	 		}
		});
	 
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

	                //셀의 정렬을 설정
	                GridObj.SetColCellAlign('RES_TP','left'); //설비유형
	                GridObj.SetColCellAlign('ITEM_ID','left');
	                GridObj.SetColCellAlign('ITEM_NAME','left');
	                GridObj.SetColCellAlign('W3_AVG_RATIO','right');
	                GridObj.SetColCellAlign('W1_AVG_RATIO','right');
	                GridObj.SetColCellAlign('SAFETY_STOCK','right');
	                GridObj.SetColCellAlign('BASE_STOCK','right');
	                GridObj.SetColCellAlign('MI_CHGO','right');
	                GridObj.SetColCellAlign('RECEIPT_EXPT','right');
	                GridObj.SetColCellAlign('SALES_PLAN','right');
	                GridObj.SetColCellAlign('SALES_ACT_VS_SALES_PLAN_1','right');
	                GridObj.SetColCellAlign('SALES_VS_WEEK1_AVG','right');
	                GridObj.SetColCellAlign('EXPERT_STOCK','right');
	                GridObj.SetColCellAlign('N_PLAN_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('N_ACT_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('N_RECEIPT_EXPT','right');
	                GridObj.SetColCellAlign('RP1_QTY','right');
	                GridObj.SetColCellAlign('PO_QTY1','right');
	                GridObj.SetColCellAlign('NWK_ADJ_QTY','right');
	                GridObj.SetColCellAlign('W1_SALES_PLAN_DIFF','right');
	                GridObj.SetColCellAlign('W3_SALES_PLAN_DIFF','right');
	                GridObj.SetColCellAlign('N_SALES_PLAN','right');
	                GridObj.SetColCellAlign('SALES_ACT_VS_SALES_PLAN_2','right');
	                GridObj.SetColCellAlign('EXPERT_STOCK2','right');
	                GridObj.SetColCellAlign('NN_PLAN_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('NN_ACT_VS_STOCK_WORK','right');
	                GridObj.SetColCellAlign('RP2_QTY','right');
	                GridObj.SetColCellAlign('PO_QTY2','right');
	                GridObj.SetColCellAlign('NN_SALES_PLAN','right');
	                GridObj.SetColCellAlign('SALES_ACT_VS_SALES_PLAN_3','right');
	                GridObj.SetColCellAlign('EXPERT_STOCK3','right');
	                GridObj.SetColCellAlign('NNN_ACT_VS_STOCK_WORK','right');
	                
	                //number포맷 설정!
	                GridObj.SetNumberFormat('W3_AVG_RATIO','###,##0.##');
	                GridObj.SetNumberFormat('W1_AVG_RATIO','###,##0.##');
	                GridObj.SetNumberFormat('SALES_VS_WEEK1_AVG','###,##0.##');
	                GridObj.SetNumberFormat('W1_SALES_PLAN_DIFF','###,##0.##');
	                GridObj.SetNumberFormat('W3_SALES_PLAN_DIFF','###,##0.##');
	                
	                GridObj.SetNumberFormat('SALES_ACT_VS_SALES_PLAN_1','###,##0.##');
	                GridObj.SetNumberFormat('N_PLAN_VS_STOCK_WORK','###,##0.##');

	                GridObj.SetNumberFormat('SALES_ACT_VS_SALES_PLAN_2','###,##0.##');
	                GridObj.SetNumberFormat('SALES_ACT_VS_SALES_PLAN_3','###,##0.##');
	                GridObj.SetNumberFormat('NNN_ACT_VS_STOCK_WORK','###,##0.##');
	                GridObj.SetNumberFormat('NN_PLAN_VS_STOCK_WORK','###,##0.##');
	                GridObj.SetNumberFormat('NN_ACT_VS_STOCK_WORK','###,##0.##');

					//생산필요량 컬럼의 소계부분의 Cell은 수정할수 없도록 막는 부분!!
	                //현재 그리드의 총 로우 갯수.
    				var row_cnt = GridObj.GetRowCount();
    				//alert("row_cnt : "+row_cnt);
			        for( var i=0 ;i<row_cnt ;i++) //전체 Row만큼 반복 한다.
			        {
			            if(GridObj.GetCellValue('ITEM_ID',i) == "소계"){
			             /*특정 컬럼의 해당로우의 편집상태를 설정한다. 
						 edit : 지정한 컬럼에 대해 편집가능하게 한다. 
						 activateonly : 셀 안의 커서를 움직일 수 있고 선택할 수 있지만 편집할 수는 없다. 
						 disable : 선택할 수 없고 편집할 수 없다. 
						 activatenoedit : 단순히 셀을 선택할 수 있게 한다. 
						 GridObj.SetCellActivation('ITEM_NAME', 0, 'disable')
						 */
			           	 GridObj.SetCellActivation('PO_QTY1', i, 'activatenoedit');
			           	 GridObj.SetCellActivation('PO_QTY2', i, 'activatenoedit');
			            }
			            
			             if(GridObj.GetCellValue('ITEM_NAME',i) == "총계"){
			             /*특정 컬럼의 해당로우의 편집상태를 설정한다. 
						 edit : 지정한 컬럼에 대해 편집가능하게 한다. 
						 activateonly : 셀 안의 커서를 움직일 수 있고 선택할 수 있지만 편집할 수는 없다. 
						 disable : 선택할 수 없고 편집할 수 없다. 
						 activatenoedit : 단순히 셀을 선택할 수 있게 한다. 
						 GridObj.SetCellActivation('ITEM_NAME', 0, 'disable')
						 */
			           	 GridObj.SetCellActivation('PO_QTY1', i, 'activatenoedit');
			           	 GridObj.SetCellActivation('PO_QTY2', i, 'activatenoedit');
			            }
			        }
		
	                
	                //그리드 컬러 설정 함수 호출.
                	gridColSet(GridObj);
                	
                	//그리드의 전체 로우수를 담음.
                	gridRow = GridObj.GetRowCount();
                	
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
    	}else if(mode == "save"){
    		if(GridObj.GetStatus() == "true") {

    			alert("저장성공!");

			} else {
				var error_msg = GridObj.GetMessage();
				alert(error_msg);			
			}
    	}
	}
   
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
	
		// 헤더는 동작없음
		if( nRow == -1 )
			return;
}

/*┌──────────────────────────────────┐
  │MOUSE OUT 시, ROW 색상 복구
  └──────────────────────────────────┘*/
function GridMouseOut(strType, strColumnKey, nRow){

		// 헤더는 동작없음
		if( nRow == -1 )
			return;
}

 /*┌──────────────────────────────────┐
   │그리드 컬럼 Set 컬러 설정하기!!
   └──────────────────────────────────┘*/
    function gridColSet(obj)
    {
    	//현재 그리드의 총 로우 갯수.
        var rowLeng = obj.GetRowCount();
        //alert("rowLeng : "+rowLeng);
            
        var colBGColor='255|255|255';
        
        
        for( var row=0 ; row<rowLeng ; row++ ){ //row수만큼 반복
        	colBGColor='232|245|213';
        	obj.SetCellBgColor("PO_QTY1", row, colBGColor);
        	obj.SetCellBgColor("PO_QTY2", row, colBGColor);
        	
			//Row 단위로컬럼배경색을 구분한다.
	        if(obj.GetCellValue('ITEM_ID',row) == "소계")
	        {
	            
	            colBGColor='233|233|233';
	            
	            for( var col=1 ;col<=31 ;col++) 
	            {
	            	  //ROW구분 컬럼 배경색을 지정한다
	                obj.SetCellBgColor("RES_TP", row, colBGColor) ;
	                obj.SetCellBgColor("ITEM_ID", row, colBGColor);
	                obj.SetCellBgColor("ITEM_NAME", row, colBGColor);
	                obj.SetCellBgColor("W3_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("W1_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("SAFETY_STOCK", row, colBGColor);
	                obj.SetCellBgColor("BASE_STOCK", row, colBGColor);
	                obj.SetCellBgColor("MI_CHGO", row, colBGColor);
	                obj.SetCellBgColor("RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_1", row, colBGColor);
	                obj.SetCellBgColor("SALES_VS_WEEK1_AVG", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK", row, colBGColor);
	                obj.SetCellBgColor("N_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("RP1_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY1", row, colBGColor);
	                obj.SetCellBgColor("NWK_ADJ_QTY", row, colBGColor);
	                obj.SetCellBgColor("W1_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("W3_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("N_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_2", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK2", row, colBGColor);
	                obj.SetCellBgColor("NN_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("NN_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("RP2_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY2", row, colBGColor);
	                obj.SetCellBgColor("NN_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_3", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK3", row, colBGColor);
	                obj.SetCellBgColor("NNN_ACT_VS_STOCK_WORK", row, colBGColor);
	            }//컬럼 색칠하는 for문 끝.!!
	        }else if(obj.GetCellValue('ITEM_NAME',row) == "총계"){
	        	colBGColor='222|222|222';
	            
	            for( var col=1 ;col<=31 ;col++) 
	            {
	            	//ROW구분 컬럼 배경색을 지정한다
	                obj.SetCellBgColor("RES_TP", row, colBGColor) ;
	                obj.SetCellBgColor("ITEM_ID", row, colBGColor);
	                obj.SetCellBgColor("ITEM_NAME", row, colBGColor);
	                obj.SetCellBgColor("W3_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("W1_AVG_RATIO", row, colBGColor);
	                obj.SetCellBgColor("SAFETY_STOCK", row, colBGColor);
	                obj.SetCellBgColor("BASE_STOCK", row, colBGColor);
	                obj.SetCellBgColor("MI_CHGO", row, colBGColor);
	                obj.SetCellBgColor("RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_1", row, colBGColor);
	                obj.SetCellBgColor("SALES_VS_WEEK1_AVG", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK", row, colBGColor);
	                obj.SetCellBgColor("N_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("N_RECEIPT_EXPT", row, colBGColor);
	                obj.SetCellBgColor("RP1_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY1", row, colBGColor);
	                obj.SetCellBgColor("NWK_ADJ_QTY", row, colBGColor);
	                obj.SetCellBgColor("W1_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("W3_SALES_PLAN_DIFF", row, colBGColor);
	                obj.SetCellBgColor("N_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_2", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK2", row, colBGColor);
	                obj.SetCellBgColor("NN_PLAN_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("NN_ACT_VS_STOCK_WORK", row, colBGColor);
	                obj.SetCellBgColor("RP2_QTY", row, colBGColor);
	                obj.SetCellBgColor("PO_QTY2", row, colBGColor);
	                obj.SetCellBgColor("NN_SALES_PLAN", row, colBGColor);
	                obj.SetCellBgColor("SALES_ACT_VS_SALES_PLAN_3", row, colBGColor);
	                obj.SetCellBgColor("EXPERT_STOCK3", row, colBGColor);
	                obj.SetCellBgColor("NNN_ACT_VS_STOCK_WORK", row, colBGColor);
	            }//컬럼 색칠하는 for문 끝.!!
	        }//if문 끝!
        }//row for문 끝!        
	}


 /*┌──────────────────────────────────┐
   │그리드 컬럼 수정시 발생하는 이벤트!!
   └──────────────────────────────────┘*/
	function GridChangeCell(strColumnKey, nRow){

		chCellValue(strColumnKey, nRow);
	}
	
	
 /*┌──────────────────────────────────┐
   │그리드 컬럼 수정시 동기화.
   └──────────────────────────────────┘*/	
	function chCellValue(strColumnKey, nRow){
		
		var row_cnt = GridObj.GetRowCount();

		//차주의 생산필요량을 변경했을 경우 실행!!
		if(strColumnKey == "PO_QTY1"){
		
			//**************************************************
			//생산필요량(차주) 수정시 요구/생산차이 자동계산 부분.
			//요구/생산차이 = 생산필요량(차주) - 보충요구량(차주)
			//**************************************************
			var nProdQty = GridObj.GetCellValue("PO_QTY1", nRow);  	// 생산필요량(차주).
			var rp1_qty = GridObj.GetCellValue("RP1_QTY", nRow); 	// 보충요구량(차주).
			var differ = numberFormat(strToNum(nProdQty) - strToNum(rp1_qty));

			GridObj.SetCellValue('NWK_ADJ_QTY',nRow,differ);
			
			//************************************************************************************
			//생산필요량 수정시 차차주 예상재고 자동계산 부분.
			//차차주 예상재고(차차주) = 예상재고(차주초) + 생산필요량(차주) - 판매계획(차주)
			//************************************************************************************
			var expert_stock = GridObj.GetCellValue("EXPERT_STOCK", nRow);	// 예상재고(차주초)
			var n_sales_plan = GridObj.GetCellValue("N_SALES_PLAN", nRow);	// 판매계획(차주)
			var stock = numberFormat(strToNum(expert_stock) + strToNum(nProdQty) - strToNum(n_sales_plan));
	
			GridObj.SetCellValue('EXPERT_STOCK2',nRow,stock);
	
			//************************************************************************************
			//생산필요량 수정시 차차주 계획 대비 재고일수 자동계산 부분.
			//차차주 계획 대비 재고일수(차차주) = 예상재고(차차주) * 영업일수(차차주) / 판매계획(차차주)
			//************************************************************************************		
			var nnwk_work = GridObj.GetCellValue("NNWK_WORK", nRow); //차차주 영업일수
			var nnPlanVsStk;
			
			if(strToNum(n_sales_plan) == 0 ){ //판매계획이 0이면 999.
				nnPlanVsStk = 999;	
			}
			else if(strToNum(stock) <= 0){ // 예상재고가 0보다 작거나 같으면 0
				nnPlanVsStk = 0;	
			}
			else {
				nnPlanVsStk = strToNum(stock) * strToNum(nnwk_work) /  strToNum(n_sales_plan);
				nnPlanVsStk = Math.round(nnPlanVsStk*10)/10;
			}
	
			GridObj.SetCellValue('NN_PLAN_VS_STOCK_WORK',nRow,nnPlanVsStk);
			
			//************************************************************************************
			//생산필요량 수정시 차차주 실적대비재고일수 자동계산 부분.
			//차차주 실적 대비 재고 일수(차차주) = 차차주 예상재고(new)(차차주) / 1주 평균 판매
			//************************************************************************************		
			var sales_mean_1week = GridObj.GetCellValue("SALES_MEAN_1WEEK", nRow); //1주 평균판매
			
			var nnActVsStk;
			
			if(strToNum(sales_mean_1week) == 0 ){ //판매계획이 0이면 999.
				nnActVsStk = 999;	
			}
			else if(strToNum(stock) <= 0){ // 예상재고가 0보다 작거나 같으면 0
				nnActVsStk = 0;	
			}
			else {
				nnActVsStk = strToNum(stock) / strToNum(sales_mean_1week);
				nnActVsStk = Math.round(nnActVsStk*10)/10;
			}
			
			GridObj.SetCellValue('NN_ACT_VS_STOCK_WORK',nRow,nnActVsStk);
			
			//************************************************************************************
			//생산필요량 수정시 차차주 기말 예상재고(차차주) 자동계산 부분.
			//차차주 기말 예상재고(차차주) = [(예상재고(차주초) + 생산필요량(차주) - 판매계획(차주))] + 차차주 생산필요량
			//							= 차차주 예상재고(차차주) + 차차주 생산필요량
			//************************************************************************************
			var nProdQty2 = GridObj.GetCellValue("PO_QTY2", nRow); //차차주 생산필요량.
			var stock2 = numberFormat(strToNum(stock) + strToNum(nProdQty2));
			
			GridObj.SetCellValue('EXPERT_STOCK3',nRow,stock2);
	
			//************************************************************************************
			//생산필요량 수정시 차차주 기말 실적대비재고일수 자동계산 부분.
			//차차주 기말!! 실적 대비 재고 일수(차차주) = [(차차주 예상재고(new)(차차주)+ 차차주 생산필요량) / 1주 평균 판매].
			//										= 차차주 기말예상재고 / 1주 평균판매
			//************************************************************************************		
			var nnActVsStk2;
			
			if(strToNum(sales_mean_1week) == 0 ){ //판매계획이 0이면 999.
				nnActVsStk2 = 999;	
			}
			else if(strToNum(stock2) <= 0){ // 예상재고가 0보다 작거나 같으면 0
				nnActVsStk2 = 0;	
			}
			else {
				nnActVsStk2 = strToNum(stock2) / strToNum(sales_mean_1week);
				nnActVsStk2 = Math.round(nnActVsStk2*10)/10;
			}
			
			GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',nRow,nnActVsStk2);		

		}//차주의 생산필요량을 변경했을 경우 if 문 끝!!!!!!!!!!!!!!!!!!!!!!!
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//차차주의 생산필요량을 변경했을경우 실행!!!
		if(strColumnKey == "PO_QTY2"){

			//************************************************************************************
			//차차주!! 생산필요량 수정시 차차주 기말 예상재고(차차주) 자동계산 부분.
			//차차주 기말 예상재고(차차주) = [(예상재고(차주초) + 생산필요량(차주) - 판매계획(차주))] + 차차주 생산필요량(차이값)
			//************************************************************************************
			var expert_stock = GridObj.GetCellValue("EXPERT_STOCK", nRow);	// 예상재고(차주초)
			var nProdQty1 = GridObj.GetCellValue("PO_QTY1", nRow); 			// 생산필요량(차주)
			var n_sales_plan = GridObj.GetCellValue("N_SALES_PLAN", nRow);	// 판매계획(차주)
			var nProdQty2 = GridObj.GetCellValue("PO_QTY2", nRow); 			// 생산필요량(차차주)
			
			var stock3 = strToNum(expert_stock) + strToNum(nProdQty1) - strToNum(n_sales_plan) + strToNum(nProdQty2);
			stock3 = numberFormat(stock3);

			GridObj.SetCellValue('EXPERT_STOCK3',nRow,stock3);

			//************************************************************************************
			//차차주!! 생산필요량 수정시 차차주 기말 실적대비재고일수 자동계산 부분.
			//차차주 기말!! 실적 대비 재고 일수(차차주) = [(차차주 예상재고(new)(차차주) + 차차주 생산필요량(차이값)) / 1주 평균 판매]
			//************************************************************************************
			var sales_mean_1week = GridObj.GetCellValue("SALES_MEAN_1WEEK", nRow); //1주 평균판매
			var nnActVsStk3;
			
			if(strToNum(sales_mean_1week) == 0 ){ //판매계획이 0이면 999.
				nnActVsStk3 = 999;	
			}
			else if(strToNum(stock3) <= 0){ // 예상재고가 0보다 작거나 같으면 0
				nnActVsStk3 = 0;	
			}
			else {
				nnActVsStk3 = strToNum(stock3) / strToNum(sales_mean_1week);
				nnActVsStk3 = Math.round(nnActVsStk3*10)/10;
			}

			GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',nRow,nnActVsStk3);					

		}//차차주의 생산필요량을 변경했을경우 if 문 끝!!!!!!!!!!


		////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////
		//**************************************************************************
		//소계 및 총계부분 처리!!!!
		//**************************************************************************
		
		/***********************************/
		/*소계 구하기..변수 선언부분.
		/**********************************/
		//수정한 로우의 설비유형값을 저장!! 설비유형별로 소계를 구하기위해 필요한 변수.
		var restpUp = GridObj.GetCellValue("RES_TP", nRow);
		
		var nTotPartProdQty = 0; //수정된 차주 생산필요량의 소계를 저장하는 변수.
		var nTotPartProdQty_comma = 0;
		var nTotPartNwkAdjQty = 0; //수정된 차주 요구 / 생산 차이의 소계를 저장하는 변수.
		var nTotPartNwkAdjQty_comma = 0;
		var nEptStk2 = 0; //수정된 차차주 예상재고 소계를 저장하는 변수.
		var nEptStk2_comma = 0;
		var nNNPlanVsStk = 0; //수정된 차차주 계획대비 재고일수 소계를 저장하는 변수.
		var nNNPlanVsStk_comma = 0;
		var nNNActVsStk = 0; //수정된 차차주 실적대비 재고일수 소계를 저장하는 변수
		var nNNActVsStk_comma = 0;
		
		var nTotPartProdQty2 = 0; //수정된 차차주 생산필요량의 소계를 저장하는 변수.
		var nTotPartProdQty2_comma = 0;
		var nEptStk3 = 0; //수정된 차차주 기말!! 예상재고 소계를 저장하는 변수.
		var nEptStk3_comma = 0;
		var nNNNActVsStk3 = 0; //수정된 차차주 기말!! 실적대비 재고일수 소계를 저장하는 변수.
		var nNNNActVsStk3_comma = 0;
		
		/***********************************/
		/*총계 구하기..변수 선언부분.
		/**********************************/
		var nTotProdQty = 0; //수정된 차주 생산필요량의 총계를 저장하는 변수.
		var nTotProdQty_comma = 0;
		var nTotNwkAdjQty = 0; //수정된 차주 요구 / 생산 차이의 총계를 저장하는 변수.
		var nTotNwkAdjQty_comma = 0;
		var nTotEptStk2 = 0; //수정된 차차주 예상재고 총계를 저장하는 변수.
		var nTotEptStk2_comma = 0;
		var nTotNNPlanVsStk = 0; //수정된 차차주 계획대비 재고일수 총계를 저장하는 변수.
		var nTotNNPlanVsStk_comma = 0;
		var nTotNNActVsStk = 0; //수정된 차차주 실적대비 재고일수 총계를 저장하는 변수
		var nTotNNActVsStk_comma = 0;
		
		var nTotProdQty2 = 0; //수정된 차차주 생산필요량의 총계를 저장하는 변수.
		var nTotProdQty2_comma = 0;
		var nTotEptStk3 = 0; //수정된 차차주 기말!! 예상재고 총계를 저장하는 변수.
		var nTotEptStk3_comma = 0;
		var nTotNNNActVsStk3 = 0; //수정된 차차주 기말!! 실적대비 재고일수 총계를 저장하는 변수.
		var nTotNNNActVsStk3_comma = 0;
	
// 한개의 데이터가 바뀌면... 남웅용
// 1. 그 설비유형의 모든 제품의 정보를 취합해서 더한다.
// 2. 소계를 update한다.
// 3. 소계들을 취합해서 모두 더한다.
// 4. 총계를 update한다.

		//1. 그 설비유형의 모든 제품의 정보를 취합해서 더한다.
		for(var i = 0 ; i < row_cnt ; i++){

			//설비유형별로 소계를 매기기위한 조건!
			if(GridObj.GetCellValue("RES_TP", i) == restpUp && GridObj.GetCellValue("ITEM_ID", i) != "소계" ){

				nTotPartProdQty = strToNum(nTotPartProdQty) + strToNum(GridObj.GetCellValue("PO_QTY1", i)); //차주 생산필요량 소계
				nTotPartNwkAdjQty = strToNum(nTotPartNwkAdjQty) + strToNum(GridObj.GetCellValue("NWK_ADJ_QTY", i)); //차주 요구/생산차이 소계
				nEptStk2 = strToNum(nEptStk2) + strToNum(GridObj.GetCellValue("EXPERT_STOCK2", i)); //차차주 예상재고 소계
				//alert("nEptStk2 : "+nEptStk2);
				nNNPlanVsStk = strToNum(nNNPlanVsStk) + strToNum(GridObj.GetCellValue("NN_PLAN_VS_STOCK_WORK", i)); //차차주 계획대비 재고일수 소계.
				nNNActVsStk = strToNum(nNNActVsStk) + strToNum(GridObj.GetCellValue("NN_ACT_VS_STOCK_WORK", i)); //차차주 실적대비 재고일수 소계.
				
				nTotPartProdQty2 = strToNum(nTotPartProdQty2) + strToNum(GridObj.GetCellValue("PO_QTY2", i)); //차차주 생산필요량 소계.
				nEptStk3 = strToNum(nEptStk3) + strToNum(GridObj.GetCellValue("EXPERT_STOCK3", i)); //차차주 기말 예상재고 소계.
				nNNNActVsStk3 = strToNum(nNNNActVsStk3) + strToNum(GridObj.GetCellValue("NNN_ACT_VS_STOCK_WORK", i)); //차차주 기말!! 실적대비 재고일수 소계.
			}
		}

		//2. 소계를 update한다.
		for(var i = 0 ; i < row_cnt ; i++){

			//설비유형별로 소계를 매기기위한 조건!
			if(GridObj.GetCellValue("RES_TP", i) == restpUp && GridObj.GetCellValue("ITEM_ID", i) == "소계" ){

				//차주 생산필요량 소계 부분 출력!
				nTotPartProdQty_comma = numberFormat(nTotPartProdQty); //콤마 찍어주기.
				GridObj.SetCellValue('PO_QTY1',i,nTotPartProdQty_comma);
				
				//차주 요구/생산 차이의 소계 부분 출력!
				nTotPartNwkAdjQty_comma = numberFormat(nTotPartNwkAdjQty); //콤마 찍어주기.
				GridObj.SetCellValue('NWK_ADJ_QTY',i,nTotPartNwkAdjQty_comma);
				
				//차차주 예상재고 소계 부분 출력!
				nEptStk2_comma = numberFormat(nEptStk2); //콤마 찍어주기.
				GridObj.SetCellValue('EXPERT_STOCK2',i,nEptStk2_comma);
				
				//차차주 계획대비 재고일수 소계 부분 출력!
				nNNPlanVsStk_comma = Math.round(nNNPlanVsStk*10)/10; //콤마 찍어주기.
				GridObj.SetCellValue('NN_PLAN_VS_STOCK_WORK',i,nNNPlanVsStk_comma);
				
				//차차주 실적대비 재고일수 소계 부분 출력!
				nNNActVsStk_comma = Math.round(nNNActVsStk*10)/10; //콤마 찍어주기.
				GridObj.SetCellValue('NN_ACT_VS_STOCK_WORK',i,nNNActVsStk_comma);
				
				
				
				//차차주 생산필요량 소계 부분 출력!
				nTotPartProdQty2_comma = numberFormat(nTotPartProdQty2); //콤마 찍어주기.
				GridObj.SetCellValue('PO_QTY2',i,nTotPartProdQty2_comma);
				
				//차차주 기말!! 예상재고 소계 부분 출력!
				nEptStk3_comma = numberFormat(nEptStk3); //콤마 찍어주기.
				GridObj.SetCellValue('EXPERT_STOCK3',i,nEptStk3_comma);
				
				//차차주 기말!! 실적대비 재고일수 소계 부분 출력!
				nNNNActVsStk3_comma = Math.round(nNNNActVsStk3*10)/10; //콤마 찍어주기.
				GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',i,nNNNActVsStk3_comma);
			}
		}
			
		//3. 소계들을 취합해서 모두 더한다.
		for(var i = 0 ; i < row_cnt ; i++){

			if(GridObj.GetCellValue("ITEM_ID", i) == "소계"){
				nTotProdQty = strToNum(nTotProdQty) + strToNum(GridObj.GetCellValue("PO_QTY1", i)); //차주 생산필요량 총계
				nTotNwkAdjQty = strToNum(nTotNwkAdjQty) + strToNum(GridObj.GetCellValue("NWK_ADJ_QTY", i)); //차주 요구/생산차이 총계
				nTotEptStk2 = strToNum(nTotEptStk2) + strToNum(GridObj.GetCellValue("EXPERT_STOCK2", i)); //차차주 예상재고 총계
				nTotNNPlanVsStk = strToNum(nTotNNPlanVsStk) + strToNum(GridObj.GetCellValue("NN_PLAN_VS_STOCK_WORK", i)); //차차주 계획대비 재고일수 총계.
				nTotNNActVsStk = strToNum(nTotNNActVsStk) + strToNum(GridObj.GetCellValue("NN_ACT_VS_STOCK_WORK", i)); //차차주 실적대비 재고일수 총계.
				
				nTotProdQty2 = strToNum(nTotProdQty2) + strToNum(GridObj.GetCellValue("PO_QTY2", i)); //차차주 생산필요량 총계.
				nTotEptStk3 = strToNum(nTotEptStk3) + strToNum(GridObj.GetCellValue("EXPERT_STOCK3", i)); //차차주 기말 예상재고 총계.
				nTotNNNActVsStk3 = strToNum(nTotNNNActVsStk3) + strToNum(GridObj.GetCellValue("NNN_ACT_VS_STOCK_WORK", i)); //차차주 기말!! 실적대비 재고일수 총계.
			}
		}

		// 4. 총계를 update한다.
		for(var i = 0 ; i < row_cnt ; i++){

			//총계를 구하기위한 조건문들.
			if(GridObj.GetCellValue("ITEM_NAME", i) == "총계"){
				//차주 생산필요량 총계 부분 출력!
				//alert("nTotProdQty : "+nTotProdQty);
				nTotProdQty_comma = numberFormat(nTotProdQty); //콤마 찍어주기.
				GridObj.SetCellValue('PO_QTY1',i,nTotProdQty_comma);
				
				//차주 요구/생산 차이의 총계 부분 출력!
				nTotNwkAdjQty_comma = numberFormat(nTotNwkAdjQty); //콤마 찍어주기.
				GridObj.SetCellValue('NWK_ADJ_QTY',i,nTotNwkAdjQty_comma);
				
				//차차주 예상재고 총계 부분 출력!
				nTotEptStk2_comma = numberFormat(nTotEptStk2); //콤마 찍어주기.
				GridObj.SetCellValue('EXPERT_STOCK2',i,nTotEptStk2_comma);
				
				//차차주 계획대비 재고일수 총계 부분 출력!
				nTotNNPlanVsStk_comma = Math.round(nTotNNPlanVsStk*10)/10; //콤마 찍어주기.
				GridObj.SetCellValue('NN_PLAN_VS_STOCK_WORK',i,nTotNNPlanVsStk_comma);
				
				//차차주 실적대비 재고일수 총계 부분 출력!
				nTotNNActVsStk_comma = Math.round(nTotNNActVsStk*10)/10; //콤마 찍어주기.
				GridObj.SetCellValue('NN_ACT_VS_STOCK_WORK',i,nTotNNActVsStk_comma);
				
				//차차주 생산필요량 총계 부분 출력!
				nTotProdQty2_comma = numberFormat(nTotProdQty2); //콤마 찍어주기.
				GridObj.SetCellValue('PO_QTY2',i,nTotProdQty2_comma);
				
				//차차주 기말!! 예상재고 총계 부분 출력!
				nTotEptStk3_comma = numberFormat(nTotEptStk3); //콤마 찍어주기.
				GridObj.SetCellValue('EXPERT_STOCK3',i,nTotEptStk3_comma);
				
				//차차주 기말!! 실적대비 재고일수 총계 부분 출력!
				nTotNNNActVsStk3_comma = Math.round(nTotNNNActVsStk3*10)/10; //콤마 찍어주기.
				GridObj.SetCellValue('NNN_ACT_VS_STOCK_WORK',i,nTotNNNActVsStk3_comma);				
			}
		}		

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
    	
    }  
	
	