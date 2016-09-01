//############################################################
//## 프로그램ID      : sc_17010_Production_base_list_new.vm
//## 프로그램명      : 수출오더 생산요청일 관리
//## 개발자          : 남웅용
//## 개발일자        : 2009-07-20
//##
//## 관련 job file   : job_sinc_20_scheduling_04.xml
//## 관련 query file : query_sinc_20_scheduling_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-20  남웅용      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             전역 변수            ----------------------------------------------//
//var mode;														// WiseGrid 통신 시 전송 모드(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// 서블릿 패키지(class 파일 경로)
var job_id = 'sc_17010_Production_base_list_new';
var GridObj ; 													// WiseGrid 객체
var GridObj2;
var GridObj3;

var color_tot = '234|234|234';			//합계 라인 배경색
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//컬럼 구분선 배경색
var color_select_row = '141|232|141';	//라인 선택 배경색
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/*┌─────────────────────────────────────────────────────────────────────┐
  │WiseGrid 오브젝트가 생성되고 초기화된 후 발생하는 							│
  │JavaScript Event인 Initialize()를 받아 그리드의 헤더를 셋팅한다.			│
  └─────────────────────────────────────────────────────────────────────┘*/
function init() { 
   
	GridObj = document.WiseGrid;
	
	setProperty(GridObj);	//WiseGrid Default설정 부분 (WiseGrid_Property.js파일 내에 선언되어 있다.)
	setHeader(GridObj);  	//해더생성 
	setDefault();        	//화면 기본 설정 

}
   
   
/*┌──────────────────────────────────┐
  │화면 기본 설정 부분.
  └──────────────────────────────────┘*/
function setDefault() { 

    GridObj.nHDLineSize         = 16; //Header Size
    //선택된 셀의 글자색 지정한다.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//클릭한 컬럼의 셀을 선택가능하게 한다.
	//GridObj.strActiveRowBgColor = "170|170|170";    //선택된 행의 배경색상을 설정한다.
    
    // 스크롤 속도 : page 단위 scroll ->기본은 'default'
    GridObj.strMouseWheelAction='page';   
    
    //헤더의 라인수를 설정한다. 
    GridObj.nHDLines = 2;       
    
    
    
}

       
/*┌──────────────────────────────────┐
  │해더생성
  └──────────────────────────────────┘*/
function setHeader(GridObj) {        

	var cnfm_date = document.all.cnfm_date.value;

	commonUtil.getSelQeury( "cnfm_date", cnfm_date, "sc_17010_W1_DAY",{
		callback:function(result){
		var sc_17010_W1_DAY = result[0][0];
		
	GridObj.AddHeader("CRUD"			,"CRUD"       		,"t_text" 	,100    ,50  ,false);
	GridObj.AddHeader("ITEM_ID"			,"품목코드"       	,"t_text" 	,20		,70  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"품목내역"       	,"t_text" 	,400	,170 ,false); //0   
 	GridObj.AddHeader("W0_BASE_STOCK"	,"기초재고"       	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W0_PROD_QTY"		,"당주\n생산계획"     	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W0_DEMEND"		,"수요예측"       	,"t_number" ,20.3	,71  ,false); //0   
//	GridObj.AddHeader("W0_SALES_PLAN"	,"판매계획"       	,"t_number" ,20.3	,71 ,false); //0   
 	GridObj.AddHeader("W0_SUPPLY_PLAN"	,"공급계획"       	,"t_number" ,20.3	,71  ,false); //0
 	// -------------------W+1-------------------------   
			
 	
 	GridObj.AddHeader("W1_EXPT_STOCK"	,"W+1주\n예상재고"	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W1_PLAN_PER_ACT"	,"예측대비\n계획비율"	,"t_number" ,20.3	,66  ,false); //0   

 	GridObj.AddHeader("WEEK_GUBN_NAME"	,"주초\n구분"       	,"t_text" ,20	,50 ,false); //0
 	GridObj.AddHeader("FRC_QTY"	,"사용자\n예측"       	,"t_number" ,20.3	,71 ,false); //0
 	//  	
 	GridObj.AddHeader("W1_PROD_QTY"		,"생산계획"       	,"t_number" ,20.3	,71  ,true); //0  
 	GridObj.AddHeader("W1_DEMEND"		,"수요예측"    		,"t_number" ,20.3	,71  ,false); //0
 	GridObj.AddHeader("W1_SALES_PLAN"	,"판매계획"    		,"t_number" ,20.3	,71  ,false); //0
 	GridObj.AddHeader("W1_SUPPLY_PLAN"	,"공급계획"    		,"t_number" ,20.3	,71  ,false); //0
 	// -------------------W+2-------------------------   
 	GridObj.AddHeader("W2_EXPT_STOCK"	,"W+2주\n예상재고"   	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W2_BASE_STOCK"	,"W+2주\n기준재고"	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("BASE_DAY"		,"기준일수"    		,"t_number" ,20.3	,71  ,true); //0
 	GridObj.AddHeader("SALES_MEAN_3WEEK","3주평균판매"    	,"t_number" ,20.3	,71  ,false); //0
 	GridObj.AddHeader("SALES_MEAN_1WEEK","1주평균판매"    	,"t_number" ,20.3	,71  ,false); //0
 	// -------------------W+3-------------------------   
 	GridObj.AddHeader("W3_DEMEND"		,"수요예측"    		,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W3_SALES_PLAN"	,"W+3주\n판매계획"	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W3_SUPPLY_PLAN"	,"공급계획"    		,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W3_PLAN_PER_ACT"	,"예측대비\n계획비율"	,"t_number" ,20.3	,66  ,false); //0   
 	GridObj.AddHeader("W3_PROD_QTY"		,"생산계획"    		,"t_number" ,20.3	,71  ,true); //0   
 	GridObj.AddHeader("W4_EXPT_STOCK"	,"W+3주\n예상재고"   	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("W4_BASE_STOCK"	,"W+3주\n기준재고"   	,"t_number" ,20.3	,71  ,false); //0   
 	GridObj.AddHeader("DATA_FLAG"		,"DATA_FLAG"   		,"t_text"	,20		,0  ,false); //0

	GridObj.BoundHeader();	

	GridObj.SetCRUDMode("CRUD");  // AD와 DE가 셋팅 될 경우는 없다.
	
	GridObj.SetColFix('ITEM_NAME');
	
	GridObj.SetNumberFormat("W0_BASE_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W0_PROD_QTY"  	,"#,##0.#");
	GridObj.SetNumberFormat("W0_DEMEND"  	,"#,##0.#");
//	GridObj.SetNumberFormat("W0_SALES_PLAN" ,"#,##0.#");
	GridObj.SetNumberFormat("W0_SUPPLY_PLAN","#,##0.#");
	GridObj.SetNumberFormat("W1_EXPT_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W1_PLAN_PER_ACT"  , "#,##0.##");
	
	GridObj.SetNumberFormat("FRC_QTY"  	,"#,##0");
	
	GridObj.SetNumberFormat("W1_PROD_QTY"  	,"#,##0.#");
	GridObj.SetNumberFormat("W1_DEMEND"  	,"#,##0.#");
	GridObj.SetNumberFormat("W1_SALES_PLAN" ,"#,##0.#");
	GridObj.SetNumberFormat("W1_SUPPLY_PLAN","#,##0.#");
	GridObj.SetNumberFormat("W2_EXPT_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W2_BASE_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("BASE_DAY"  	,"#,##0.#");
	GridObj.SetNumberFormat("SALES_MEAN_3WEEK"  ,"#,##0.#");
	GridObj.SetNumberFormat("SALES_MEAN_1WEEK"  ,"#,##0.#");
	GridObj.SetNumberFormat("W3_DEMEND"  	,"#,##0.#");
	GridObj.SetNumberFormat("W3_SALES_PLAN" ,"#,##0.#");
	GridObj.SetNumberFormat("W3_SUPPLY_PLAN","#,##0.#");
	GridObj.SetNumberFormat("W3_PLAN_PER_ACT"  ,"#,##0.##");
	GridObj.SetNumberFormat("W3_PROD_QTY"  	,"#,##0.#");
	GridObj.SetNumberFormat("W4_EXPT_STOCK" ,"#,##0.#");
	GridObj.SetNumberFormat("W4_BASE_STOCK" ,"#,##0.#");

  
	GridObj.SetColCellAlign('ITEM_ID','center');
	GridObj.SetColCellAlign('WEEK_GUBN_NAME','center');
	//Hidden 컬럼  
	GridObj.SetColHide("CRUD",true);		
		
		
		
		
		
		
		}
	});   



       
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
function GoSave  (service) {
	
	//alert("GoSave")
	//return;

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//넘겨줄 값들을만든다.( 파라미터 정의 부분 )
	GridObj.SetParam("user_id", document.frm._user_id.value);
	var cnfm_date = document.frm.cnfm_date.value;
	GridObj.SetParam("cnfm_date", cnfm_date);
	
	var data_flag = GridObj.GetCellValue("DATA_FLAG", 1);
	
	//if(data_flag == 'Y'){
		//alert("업데이트 할때")
		//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
		//GridObj.SetParam("mode", "save");
		//GridObj.DoQuery(servlet_url, "CRUD");		
	//}else{
		//alert("초기 저장")
		
			var in_paramKey = "cnfm_date";
			var in_paramCode = cnfm_date;
			commonUtil.getCodeInfo(in_paramKey,in_paramCode,"sc_17010_GET_PLANT_ALLOC_VERSION", { 
				callback:function(arrList){
					if( arrList.length == 1 ) {
					//if( arrList[0][0] == '') {
					plant_alloc_version = arrList[0][0];
						if(plant_alloc_version == null || plant_alloc_version == '' ){
							"계획 수립일이 아닙니다. 계획수립일로  설정하고 다시 작업해주시기 바랍니다."
							return;
						}else{
							//alert(plant_alloc_version)
							//return;
							GridObj.SetParam("plant_alloc_version", 		plant_alloc_version);
							GridObj.SetParam("mode", "save");  //cre_data
							//WiseGrid이 서버와 통신시에 데이터를 전달하는 메서드입니다. 통신이 성공하면 true를 반환합니다.
							GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
						}		
					}else {
						
					}
				}
			});			
	//}
	

}


      
   
/*┌──────────────────────────────────┐
  │첫번째 그리드의 조회 쿼리를 호출 Fnc
  └──────────────────────────────────┘*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var cnfm_date = document.all.cnfm_date.value;
       //var in_to_date   = document.all.in_to_date.value;
       //var in_mto_mts   = document.all.mto_mts.value;
       
       //넘겨줄 값들을만든다.( 파라미터 정의 부분 )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("cnfm_date", cnfm_date);
       //GridObj.SetParam("in_to_date", in_to_date);
       //GridObj.SetParam("in_mto_mts", in_mto_mts);
       GridObj.DoQuery(servlet_url);
   }

/*┌──────────────────────────────────┐
  │데이터 조회가 정상적으로 완료되면 발생되는 Event에 대한 Fnc
  └──────────────────────────────────┘*/
    function GridEndQuery() 
    {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search") //조회가 완료된 경우
        {
            if(GridObj.GetStatus() == "true") 
            {                           

			     //
			    //GridObj.SetColCellAlign('PROD_REQ_DATE','center'); 

			    //GridObj.SetNumberFormat('IPGO','#,##0');
			    // 

	        	var row_cnt = GridObj.GetRowCount();
				var colBGColor='232|245|213';
				
				for( var i=0 ;i<row_cnt ;i++) //전체 Row만큼 반복 한다.
		        {
		          // GridObj.SetCellBgColor("PROD_REQ_DATE", i, colBGColor); 
			    GridObj.SetCellBgColor('W1_PROD_QTY', i, '255|255|0'); 
			    GridObj.SetCellBgColor('BASE_DAY', i, '255|255|0'); 
			    GridObj.SetCellBgColor('W3_PROD_QTY', i, '255|255|0'); 
		            
		        }
                                             
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
			
			doQuery()   // 저장 완료후 돌아올때는 화면을 재조회 한다. 
        }
		
    }

// 선택한 row에 생산요청일 일괄적용
function applyProdReq(){
	
	var sel_data = GridObj.GetSelectedCells(); // 선택한 부분의 key와 row를 가져온다
	var i=0;
	var rowNo;
	
	var in_appl_date = delDateDelimiter(document.all.in_appl_date.value);

	while(1) {
		if (sel_data.split(",")[i*2+1] == null || sel_data.split(",")[i*2+1] == "")  // 더이상 데이터 없다
			return;
		else {
			var rowNo = sel_data.split(",")[i*2+1];
			//해당 row에 check를 한다
			GridObj.SetCellValue("PROD_REQ_DATE", rowNo, in_appl_date);
		}
		i++;
	}
}


   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

function GridCellClick(strColumnKey, nRow){
	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
    //alert("strColumnKey="+strColumnKey);
	// 크게 기준재고 변경시 와 생산필요량 수정시 로직이 틀려야함..
	if(strColumnKey == 'BASE_DAY'){
		cal_base_stock(nRow)
	}else if(strColumnKey == 'W1_PROD_QTY'){
		cal_change_prod_qty1(nRow);
	}else if(strColumnKey == 'W3_PROD_QTY'){
		cal_change_prod_qty2(nRow);
	}
}

function cal_base_stock(nRow){
	var base_day		 = Number(GridObj.GetCellValue("BASE_DAY", nRow));
	var sales_mean_1week = Number(GridObj.GetCellValue("SALES_MEAN_1WEEK", nRow));
	var sales_mean_3week = Number(GridObj.GetCellValue("SALES_MEAN_3WEEK", nRow));
	
	var sales_mean_13week = (sales_mean_1week+sales_mean_3week)/2;
	
	sales_mean_13week = Math.round(sales_mean_13week * 1)/1;
	
	var base_stock = sales_mean_13week *base_day;
	
	GridObj.SetCellValue("W2_BASE_STOCK", nRow, base_stock);
	GridObj.SetCellValue("W4_BASE_STOCK", nRow, base_stock);
	
	
	cal_change_base_day(nRow)
}

function cal_change_base_day(nRow){
	//1 기준재고 변경 -> 2 생산계획 변경-> 3예상재고변경
    var w2_base_stock	= Number(GridObj.GetCellValue("W2_BASE_STOCK", nRow)); //차차주 기준재고 W+2 
    var w0_supply_plan	= Number(GridObj.GetCellValue("W0_SUPPLY_PLAN", nRow)); //공급계획
    var w1_expt_stock	= Number(GridObj.GetCellValue("W1_EXPT_STOCK", nRow)); //차주예상재고 W+1 
	var w1_prod_qty		= Number(GridObj.GetCellValue("W1_PROD_QTY", nRow)); // 차차주 예상재고 W+2
	var w2_expt_stock	= Number(GridObj.GetCellValue("W2_EXPT_STOCK", nRow)); // 차차주 예상재고 W+2
	var w3_prod_qty		= Number(GridObj.GetCellValue("W3_PROD_QTY", nRow)); // 차차주 예상재고 W+2
	var w3_supply_plan	= Number(GridObj.GetCellValue("W3_SUPPLY_PLAN", nRow)); //공급계획
	var w4_expt_stock	= Number(GridObj.GetCellValue("W4_EXPT_STOCK", nRow)); // 차차주 예상재고 W+2

	// 1. W+1 기준재고 변경시 - > W+1 생산 필요량 변경 
	// 차주 생산 필요 물량 = 공급계획 + 차차주 기준재고 - 차주예상재고 
	w1_prod_qty = w0_supply_plan +  w2_base_stock - w1_expt_stock;
	GridObj.SetCellValue("W1_PROD_QTY", nRow, w1_prod_qty);

	//2. 생산계획 변경후 차차주 예상재고 변경..
	//--차주주초예상재고 + 생산계획 - 공급계획
	w2_expt_stock = w1_expt_stock + w1_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W2_EXPT_STOCK", nRow, w2_expt_stock); 
	
	//3. 차차주 생산 필요량 변경.
	//W3_PROD_QTY = 공급계획 + 차차주 기준재고 - 차주예상재고(W2_EXPT_STOCK)
	w3_prod_qty = w3_supply_plan +  w2_base_stock - w2_expt_stock;
	GridObj.SetCellValue("W3_PROD_QTY", nRow, w3_prod_qty);
	
	//4. 차차차주 예상재고 변경.
	w4_expt_stock = w2_expt_stock + w3_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W4_EXPT_STOCK", nRow, w4_expt_stock);	
	
}

function cal_change_prod_qty1(nRow){
	//1 기준재고 변경 -> 2 생산계획 변경-> 3예상재고변경
    var w2_base_stock	= Number(GridObj.GetCellValue("W2_BASE_STOCK", nRow)); //차차주 기준재고 W+2 
    var w0_supply_plan	= Number(GridObj.GetCellValue("W0_SUPPLY_PLAN", nRow)); //공급계획
    var w1_expt_stock	= Number(GridObj.GetCellValue("W1_EXPT_STOCK", nRow)); //차주예상재고 W+1 
	var w1_prod_qty		= Number(GridObj.GetCellValue("W1_PROD_QTY", nRow)); // 차차주 예상재고 W+2
	var w2_expt_stock	= Number(GridObj.GetCellValue("W2_EXPT_STOCK", nRow)); // 차차주 예상재고 W+2
	var w3_prod_qty		= Number(GridObj.GetCellValue("W3_PROD_QTY", nRow)); // 차차주 예상재고 W+2
	var w3_supply_plan	= Number(GridObj.GetCellValue("W3_SUPPLY_PLAN", nRow)); //공급계획
	var w4_expt_stock	= Number(GridObj.GetCellValue("W4_EXPT_STOCK", nRow)); // 차차주 예상재고 W+2

	// 1. W+1 기준재고 변경시 - > W+1 생산 필요량 변경 
	// 차주 생산 필요 물량 = 공급계획 + 차차주 기준재고 - 차주예상재고 
	//w1_prod_qty = w0_supply_plan +  w2_base_stock - w1_expt_stock;
	//GridObj.SetCellValue("W1_PROD_QTY", nRow, w1_prod_qty);

	//2. 생산계획 변경후 차차주 예상재고 변경..
	//--차주주초예상재고 + 생산계획 - 공급계획
	w2_expt_stock = w1_expt_stock + w1_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W2_EXPT_STOCK", nRow, w2_expt_stock); 
	
	//3. 차차주 생산 필요량 변경.
	//W3_PROD_QTY = 공급계획 + 차차주 기준재고 - 차주예상재고(W2_EXPT_STOCK)
	w3_prod_qty = w3_supply_plan +  w2_base_stock - w2_expt_stock;
	GridObj.SetCellValue("W3_PROD_QTY", nRow, w3_prod_qty);
	
	//4. 차차차주 예상재고 변경.
	w4_expt_stock = w2_expt_stock + w3_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W4_EXPT_STOCK", nRow, w4_expt_stock);	

	
}

function cal_change_prod_qty2(nRow){
	//1 기준재고 변경 -> 2 생산계획 변경-> 3예상재고변경
    var w2_base_stock	= Number(GridObj.GetCellValue("W2_BASE_STOCK", nRow)); //차차주 기준재고 W+2 
    var w0_supply_plan	= Number(GridObj.GetCellValue("W0_SUPPLY_PLAN", nRow)); //공급계획
    var w1_expt_stock	= Number(GridObj.GetCellValue("W1_EXPT_STOCK", nRow)); //차주예상재고 W+1 
	var w1_prod_qty		= Number(GridObj.GetCellValue("W1_PROD_QTY", nRow)); // 차차주 예상재고 W+2
	var w2_expt_stock	= Number(GridObj.GetCellValue("W2_EXPT_STOCK", nRow)); // 차차주 예상재고 W+2
	var w3_prod_qty		= Number(GridObj.GetCellValue("W3_PROD_QTY", nRow)); // 차차주 예상재고 W+2
	var w3_supply_plan	= Number(GridObj.GetCellValue("W3_SUPPLY_PLAN", nRow)); //공급계획
	var w4_expt_stock	= Number(GridObj.GetCellValue("W4_EXPT_STOCK", nRow)); // 차차주 예상재고 W+2

	// 1. W+1 기준재고 변경시 - > W+1 생산 필요량 변경 
	// 차주 생산 필요 물량 = 공급계획 + 차차주 기준재고 - 차주예상재고 
	//w1_prod_qty = w0_supply_plan +  w2_base_stock - w1_expt_stock;
	//GridObj.SetCellValue("W1_PROD_QTY", nRow, w1_prod_qty);

	//2. 생산계획 변경후 차차주 예상재고 변경..
	//--차주주초예상재고 + 생산계획 - 공급계획
	//w2_expt_stock = w1_expt_stock + w1_prod_qty - w0_supply_plan;  
	//GridObj.SetCellValue("W2_EXPT_STOCK", nRow, w2_expt_stock); 
	
	//3. 차차주 생산 필요량 변경.
	//W3_PROD_QTY = 공급계획 + 차차주 기준재고 - 차주예상재고(W2_EXPT_STOCK)
	//w3_prod_qty = w3_supply_plan +  w2_base_stock - w2_expt_stock;
	//GridObj.SetCellValue("W3_PROD_QTY", nRow, w3_prod_qty);
	
	//4. 차차차주 예상재고 변경.
	w4_expt_stock = w2_expt_stock + w3_prod_qty - w0_supply_plan;  
	GridObj.SetCellValue("W4_EXPT_STOCK", nRow, w4_expt_stock);	

	
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
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue += Number(search_h); 
            tableHeightValue += Number(search_h); 
        } 
        
        // 화면 size 축소 시 화면이 너무 작아 그리드 크기가 음수가 되면 에러가 나므로 그 경우 무조건 1로 세팅 
        // ==> 화면이 더이상 축소되지 않음 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }  
    