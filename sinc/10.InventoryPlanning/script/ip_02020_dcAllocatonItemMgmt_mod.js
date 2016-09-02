function openPopUp(obj, rowIdx, colIdx) {
			
	var Idx = (parseInt(rowIdx)*12) + parseInt(colIdx);

	var sel_alloc_item		= document.frm.item_id[rowIdx].value;
	var sel_alloc_item_name	= document.frm.item_name[rowIdx].value;
	var sel_cnfm_date	= document.frm.cnfm_date[Idx].value;
//alert("sel_item_id="+sel_item_id);
//alert("sel_item_name="+sel_item_name);
//alert("sel_cnfm_date="+sel_cnfm_date);

	var service_url = "service.do?_moon_service=ip_02020_dcAllocatonItemMgmt_pop_up&_moon_perpage=200&_moon_pagenumber=1";
	service_url += "&sel_alloc_item=" + sel_alloc_item +"&sel_alloc_item_name=" + sel_alloc_item_name +"&sel_cnfm_date=" + sel_cnfm_date;
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=600, height=230, top=0, left=0";
	var newWin = window.open(service_url, "SC_DAILY_PROD_ANALYSIS_NEW_SELECT_PLANT_AND_VERSION_POPUP", pop_win_style); 
	newWin.focus();
}; 

// input box 를 Edit Mode 로 변환
function setEditMode( obj ) {
	
	//obj.childNodes(0).style.display = "block";
	obj.childNodes(0).select();
}

// input box 를 View Mode 로 변환
function setViewMode( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// input box 를 View Mode 로 변환
function setViewMode1( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"%"+"&nbsp;"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

GoSave = function(service) {
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	viewWait();// 조회시 WAITING 이미지 보여주기
	document.frm._moon_service.value = service;
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// setTimeout 에서 호출하여 시간 지연 후 setEditMode() 실행
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

//조회시 날짜를 YYYY-MM-DD ->  YYYYMMDD로 변환
GoSearch = function(service) {
	
	var	temp_in_cnfm_date = document.frm.in_cnfm_date.value;
	document.frm.in_cnfm_date.value = delDateDelimiter(document.frm.in_cnfm_date.value);
	document.frm.search_period.value = Number(document.frm.search_period.value); 		//조회기간
	var	search_type = document.frm.search_type.value; 	//	조회유형
	var	stock_day 	= Number(document.frm.stock_day.value); 	// 재고일수	
	var	search_item = document.frm.search_item.value; 	//품목명	
	var	week_flag = document.frm.week_flag.value; 	//검색 조건 (판매계획, 1주평균, 3주평균)
	
	var	week_name = document.frm.week_flag.options[document.frm.week_flag.selectedIndex].text; 	//검색 조건 (판매계획, 1주평균, 3주평균)
	
	document.frm.week_name.value = week_name;
	
	//alert(week_name);

	if( search_type == "" || search_type == null || search_type == 00 ) {
		alert("조회유형을 선택하십시요!");
		document.frm.search_type.select();
		return;
	}
	//아이템 명을 입력하면 재고일수 null 허용
	if(search_item == "" || search_item == null ) {
		if( stock_day == "" || stock_day == null ) {
			alert("재고일수를 선택하십시요!"); 
			document.frm.stock_day.select();
			return;
		} else{
			document.frm.alloc_item_flag.value = "Y";
			document.frm.alloc_item_chk.checked=true;
		}
	}else{
			document.frm.alloc_item_flag.value = "N";
			document.frm.alloc_item_chk.checked=false;
	}
	
	viewWait();// 조회시 WAITING 이미지 보여주기
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	//doChange1(this, 0, 0);

	document.frm.in_cnfm_date.value = temp_in_cnfm_date;
	
};

// 해당 플레그에대한 선택값 할당
function doCheckFlag(obj){
	
	// sale_plan_flag - 판매계획 0 이어도 조회
	if(obj.name == "sale_plan_chk" ){ 
		if(obj.checked){
				document.frm.sale_plan_flag.value = "Y";
		}
		else{
				document.frm.sale_plan_flag.value = "N";
		}
	} else

	// 재고일수 stock_day 이상인품목 조회
	if(obj.name == "stock_day_chk" ){ // sale_plan_flag - 판매계획 0 이어도 조회
		if(obj.checked){
				document.frm.stock_day_flag.value = "Y";
		}
		else{
				document.frm.stock_day_flag.value = "N";
		}
	}else 
	
	// 공급할당 대상품목 조회
	if(obj.name == "alloc_item_chk" ){ // alloc_item_flag - 
		if(obj.checked){
				document.frm.alloc_item_flag.value = "Y";
		}
		else{
				document.frm.alloc_item_flag.value = "N";
		}
	}
}

// 공급할당 설정  check박스 체크시에 set_flag를 '2'= 관리로 세팅한다. 1= 안전
function doSetAloc(obj, rowIdx, colIdx) {
	
	var Idx = (parseInt(rowIdx)*12) + parseInt(colIdx);
	if(obj.checked){
		
	//	if(confirm("해당 품목을 공급할당 품목으로 설정 하시겠습니까?") == 1 ) {
			if(document.frm.alloc_gubn[Idx]){
				document.frm.alloc_gubn[Idx].value = "2";
				document.frm.delete_flag[Idx].value = "2";
				//document.frm.tot_alloc_box[Idx].value = 0;//체크 해제시 할당률과 할당량을 0으로 세팅!
				document.frm.tot_alloc_rate[Idx].value = 100;
	//openPopUp(obj, rowIdx, colIdx);// 팝업창 
				doChange2(this, rowIdx, colIdx);
				
			}
			else{
				document.frm.alloc_gubn.value = "2";
				document.frm.delete_flag[Idx].value = "2";
				//document.frm.tot_alloc_box.value = 0;//체크 해제시 할당률과 할당량을 0으로 세팅!
				document.frm.tot_alloc_rate.value = 100;
	//openPopUp(obj, rowIdx, colIdx);// 팝업창 
				doChange2(this, rowIdx, colIdx);
			}
	//}
//		else{//
//			if(document.frm.alloc_gubn[Idx]){//
//				document.frm.alloc_chk[Idx].checked=false;//
//			}//
//			else{//
//				document.frm.alloc_chk.checked=false;//
//			}//
//		}
	}
	else{
		//if(confirm("해당 품목의 공급할당 설정을 취소하시겠습니까?") == 1 ) {
			if(document.frm.alloc_gubn[Idx]){
				document.frm.alloc_gubn[Idx].value = "0";
				document.frm.delete_flag[Idx].value = "0";
				document.frm.tot_alloc_box[Idx].value = 0;//체크 해제시 할당률과 할당량을 0으로 세팅!
				document.frm.tot_alloc_rate[Idx].value = 0;
				doChange1(this, rowIdx, colIdx);
			}
			else{
				document.frm.alloc_gubn.value = "0";
				document.frm.delete_flag[Idx].value = "0";
				doChange1(this, rowIdx, colIdx);
			}
		//}
		//else{
//			if(document.frm.alloc_gubn[Idx]){//
//				document.frm.alloc_chk[Idx].checked=true;//
//			}//
//			else{//
//				document.frm.alloc_chk.checked=true;//
//			}		
		//}		
	}
}



//할당량에 맞춰 기초재고량/할당률 변경
function doChange1(obj, rowIdx, colIdx){

	var Idx 			= (parseInt(rowIdx)*12) + parseInt(colIdx); //첫째열은1_12  둘째열은 13~24
	var orgIdx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var nextIdx			= "";
//alert("Idx="+Idx);	
//alert("rowIdx="+rowIdx);	
//alert("colIdx="+colIdx);	

	var date 			= "";//일자
	var stoc			= "";//재고량
	var inpt 			= "";//입고량
	var sale 			= "";//판매계획
	var prom 			= "";//판촉계획
	var plan			= "";//판매+판촉
	var stocDay			= "";//재고일수
	var canAlloc 		= "";
	var	delv			= "";//주문량
	
	var	stock_day 	= Number(document.frm.stock_day.value);//재고일수
	var	search_item = document.frm.search_item.value; 	//품목명/코드	

	var tot_alloc_rate 	= "";
	var tot_alloc_box	= obj.value;
	tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
	
	//할당량이 0일시 할당 구분 해제 -할당량 입력시 체크박스 벨류 = 2
	if(tot_alloc_box == 0){
		if(document.frm.alloc_gubn[Idx]){
			document.frm.alloc_gubn[Idx].value = "0";
			document.frm.delete_flag[Idx].value = "0";
			document.frm.alloc_chk[Idx].checked=false;
		}
		else{
			document.frm.alloc_gubn.value = "0";
			document.frm.delete_flag[Idx].value = "0";
			document.frm.alloc_chk[Idx].checked=false;
		}
	}
	else{
		if(document.frm.alloc_gubn[Idx]){
			document.frm.alloc_gubn[Idx].value = "2";//수치 입력시 저장을위해 밸류를 2로 세팅
			document.frm.delete_flag[Idx].value = "2";
			document.frm.alloc_chk[Idx].checked=true;
		}
		else{
			document.frm.alloc_gubn.value = "2";
			document.frm.delete_flag[Idx].value = "2";
			document.frm.alloc_chk.checked=true;
		}
	} 

	do{
		stoc	= parseInt(document.frm.stoc[Idx].value);//재고량
		inpt 	= parseInt(document.frm.inpt[Idx].value);//입고량
		sale 	= parseInt(document.frm.sale[Idx].value);//판매계획
		prom 	= parseInt(document.frm.prom[Idx].value);//판촉계획
		date 	= parseInt(document.frm.cnfm_date[Idx].value);//일자
		delv	= parseInt(document.frm.delv[Idx].value);//주문량
		plan	= sale + prom ; //판매+판촉



		
		//할당률 조정
		tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
		tot_alloc_rate		= (tot_alloc_box/plan)*100;
		
		document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
		tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);
	
		if(Idx%12== 0){
			plan = delv ;
		}

		//기초재고 조정
			nextIdx 	= Idx+1; 
			if(document.frm.alloc_gubn[Idx].value == "2"){
				
				//alert(Idx);
				//alert(delv);
				
				if(Idx%12== 0){ //공급할당 품목일경우 첫날은 주문량을 빼준다
					//alert(1);
				newStoc = 	(stoc+inpt)  - delv;//기초재고	
				}else{
					//alert(2);
				newStoc = 	(stoc+inpt)  - tot_alloc_box;//기초재고
				}
				if(newStoc < 0){
					newStoc = 0;
					//stocDay = 0;
				}				
				
				document.frm.stoc[nextIdx].value = newStoc;
				setViewMode( document.frm.stoc[nextIdx]);
				
				if(tot_alloc_box == 0){
					tot_alloc_box = 1;
					tot_alloc_rate = 0;
					document.frm.tot_alloc_rate[Idx].value = tot_alloc_rate;	
					stocDay = ((stoc) /tot_alloc_box);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율	
				}
				else{
					stocDay = ((stoc) /tot_alloc_box);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율
				
				}
			}
			else{

				newStoc = 	(stoc+inpt)  - plan;//기초재고
				if(newStoc < 0){
					newStoc = 0;
					//stocDay = 0;
				}				
				
				document.frm.stoc[nextIdx].value = newStoc;
				setViewMode( document.frm.stoc[nextIdx]);

		
				if(plan==0){
					plan = 1;
					tot_alloc_rate = 0;
					document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
					stocDay = ((stoc) /plan);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율
				}
				else{
					stocDay = ((stoc) /plan);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율

				}
			}

			if(stock_day == "" || stock_day == null){
				stock_day = 3;
			}
			
			if(Number(document.frm.stocDay[Idx].value) <= Number(stock_day)){
				divStocDay[Idx].style.color = "red";
			}
			else{
				divStocDay[Idx].style.color = "black";
			}

				Idx= Idx+1;//다음 Idx참조
		}while((Idx+1)%12!== 0 && (orgIdx+1)%12 !== 0 )
		
		
}		

//할당률에 맞춰 할당량 변경하기
function doChange2(obj, rowIdx, colIdx){

	var Idx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var orgIdx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var nextIdx			= "";
//alert("Idx="+Idx);	

	var date 			= "";//일자
	var stoc			= "";//재고량
	var inpt 			= "";//입고량
	var sale 			= "";//판매계획
	var prom 			= "";//판촉계획
	var plan			= "";
	var stocDay			= "";
	var canAlloc 		= "";
	var delv			= "";
	
	var	stock_day 	= Number(document.frm.stock_day.value);//재고일수
	var	search_item 	= document.frm.search_item.value; 	//품목명/코드	
	
	var tot_alloc_rate 	= obj.value;
	var tot_alloc_box	= "";
	
	//할당량이 0일시 할당 구분 해제 -할당량 입력시 체크박스 벨류 = 2
	if(tot_alloc_rate == 0){
		if(document.frm.alloc_gubn[Idx]){
			document.frm.alloc_gubn[Idx].value = "0";
			document.frm.delete_flag[Idx].value = "0";//삭제 플레그가 "0" 인것만 삭제 시도
			document.frm.alloc_chk[Idx].checked=false;
		}
		else{
			document.frm.alloc_gubn.value = "0";
			document.frm.delete_flag[Idx].value = "0";
			document.frm.alloc_chk[Idx].checked=false;
		}
	}
	else{
		if(document.frm.alloc_gubn[Idx]){
			document.frm.alloc_gubn[Idx].value = "2";//수치 입력시 저장을위해 밸류를 2로 세팅
			document.frm.delete_flag[Idx].value = "2";
			document.frm.alloc_chk[Idx].checked=true;
		}
		else{
			document.frm.alloc_gubn.value = "2";
			document.frm.delete_flag[Idx].value = "2";
			document.frm.alloc_chk.checked=true;
		}
	}

	do{
		stoc	= parseInt(document.frm.stoc[Idx].value);//재고량
		inpt 	= parseInt(document.frm.inpt[Idx].value);//입고량
		sale 	= parseInt(document.frm.sale[Idx].value);//판매계획
		prom 	= parseInt(document.frm.prom[Idx].value);//판촉계획
		date 	= parseInt(document.frm.cnfm_date[Idx].value);//일자
		delv	= parseInt(document.frm.delv[Idx].value);//출고실적
		plan	= sale + prom ;
		

		
		///////////////할당률 조정
		tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
		tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);
		tot_alloc_box 		= parseInt((plan*tot_alloc_rate)/100);
		document.frm.tot_alloc_box[Idx].value = tot_alloc_box;	
		
		if(Idx%12== 0){
			plan = delv ;
		}	

		//기초재고 조정
			nextIdx 	= Idx+1; 
			if(document.frm.alloc_gubn[Idx].value == "2"){

				newStoc = 	(stoc+inpt)  - tot_alloc_box;//기초재고
				if(newStoc < 0){
					newStoc = 0;
					//stocDay = 0;
				}					
				document.frm.stoc[nextIdx].value = newStoc;
				setViewMode( document.frm.stoc[nextIdx]);
				
				if(tot_alloc_rate == 0){
					tot_alloc_box = 1;
					tot_alloc_rate = 0;
					document.frm.tot_alloc_rate[Idx].value = tot_alloc_rate;	
					stocDay = ((stoc) /tot_alloc_box);
					document.frm.stocDay[Idx].value = stocDay;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율	
				}
				else{
					tot_alloc_rate		= (tot_alloc_box/plan)*100;
					document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
					tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);
					
					stocDay = ((stoc) /tot_alloc_box);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율
				
				}
			}
			else{

				newStoc = 	(stoc+inpt)  - plan;//기초재고
				if(newStoc < 0){
					newStoc = 0;
					//stocDay = 0;
				}					
				document.frm.stoc[nextIdx].value = newStoc;
				setViewMode( document.frm.stoc[nextIdx]);

		
				if(plan==0){
					plan = 1;
					tot_alloc_rate = 0;
					document.frm.tot_alloc_rate[Idx].value = tot_alloc_rate;	
					stocDay = ((stoc) /plan);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율
				}
				else{
					tot_alloc_rate		= (tot_alloc_box/plan)*100;
					document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
					tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);

					stocDay = ((stoc) /plan);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율

				}
			}
			
			if(stock_day == "" || stock_day == null){
				stock_day = 3;
			}
			
			if(Number(document.frm.stocDay[Idx].value) <= Number(stock_day)){
				divStocDay[Idx].style.color = "red";
			}
			else{
				divStocDay[Idx].style.color = "black";
			}
			
			Idx= Idx+1;//다음 Idx참조

		}while((Idx+1)%12!== 0 && (orgIdx+1)%12 !== 0 )	
}

// TAB key 로 다음 항목 이동
function moveNextBox(obj, rowIdx, colIdx){
	return;

	var Idx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var orgIdx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var nextIdx 	= Idx +1;
	var objName 	= obj.name;

//alert(Idx);   
	var rowNo_DW2 	= main_tbody.rows.length - 1;
	var next_row	= 0;

	// TAB(9) or ENTER(13)
	if( event.keyCode == "13") {
		// DW1 할당율
		if( objName == "tot_alloc_rate" ) {
			if(Idx == rowNo_DW2) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.tot_alloc_rate[nextIdx].select();
			return;
		}
		// DW2 할당량
		else if( objName == "tot_alloc_box" ) {
			if(Idx == rowNo_DW2) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.tot_alloc_box[nextIdx].select();
			return;
		}
		// 그 외의 box 에선 동작 없음
		else {
			return;
		}
	}
	
}


//화면로드시 재계산
function Reload(lastIdx){
	var Idx = 0;
	var lastIdx;
	var rowIdx = 0;
//alert("Idx="+Idx);	

	for(Idx ; Idx<lastIdx ; Idx++) {
		doChange1(document.frm.stoc[rowIdx], Idx, 0);
		rowIdx = Idx+12;
		colIdx = rowIdx+1
	}
	
}

// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#d0b8f1" &&
			left_tbody.rows[rowIdx].style.backgroundColor != "#8de88d" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
		//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx].style.backgroundColor != "#d0b8f1" &&
			left_tbody.rows[rowIdx].style.backgroundColor != "#8de88d" ) {
		left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
		//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
	}
	
}


// 3주평균 판매로 재고 추이 전개
function Reload2(lastIdx){
	var Idx = 0;
	var lastIdx;
	var rowIdx = 0;

	for(Idx ; Idx<lastIdx ; Idx++) {
		doChange3(document.frm.stoc[rowIdx], Idx, 0);
		rowIdx = Idx+12;
		colIdx = rowIdx+1
	}
	
}

//3주 평균 판매로 전개
function doChange3(obj, rowIdx, colIdx){

	var Idx 			= (parseInt(rowIdx)*12) + parseInt(colIdx); //첫째열은1_12  둘째열은 13~24
	var orgIdx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var nextIdx			= "";


	var date 			= "";//일자
	var stoc			= "";//재고량
	var inpt 			= "";//입고량
	var sale 			= "";//판매계획
	var prom 			= "";//판촉계획
	var plan			= ""; 
	var stocDay			= "";
	var canAlloc 		= "";
	var	delv			= "";
	
	var	stock_day 	= Number(document.frm.stock_day.value);//재고일수
	var	search_item 	= document.frm.search_item.value; 	//품목명/코드	

	var tot_alloc_rate 	= "";
	var tot_alloc_box	= obj.value;
	tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
	
	//할당량이 0일시 할당 구분 해제 -할당량 입력시 체크박스 벨류 = 2
	if(tot_alloc_box == 0){
		if(document.frm.alloc_gubn[Idx]){
			document.frm.alloc_gubn[Idx].value = "0";
			document.frm.delete_flag[Idx].value = "0";
			document.frm.alloc_chk[Idx].checked=false;
		}
		else{
			document.frm.alloc_gubn.value = "0";
			document.frm.delete_flag[Idx].value = "0";
			document.frm.alloc_chk[Idx].checked=false;
		}
	}
	else{
		if(document.frm.alloc_gubn[Idx]){
			document.frm.alloc_gubn[Idx].value = "2";//수치 입력시 저장을위해 밸류를 2로 세팅
			document.frm.delete_flag[Idx].value = "2";
			document.frm.alloc_chk[Idx].checked=true;
		}
		else{
			document.frm.alloc_gubn.value = "2";
			document.frm.delete_flag[Idx].value = "2";
			document.frm.alloc_chk.checked=true;
		}
	} 

	do{
		stoc	= parseInt(document.frm.stoc[Idx].value);//재고량
		inpt 	= parseInt(document.frm.inpt[Idx].value);//입고량
		sale 	= parseInt(document.frm.sale[Idx].value);//판매계획
		prom 	= parseInt(document.frm.prom[Idx].value);//판촉계획3mean_week
		date 	= parseInt(document.frm.cnfm_date[Idx].value);//일자
		delv	= parseInt(document.frm.delv[Idx].value);//일자
		plan	= parseInt(document.frm.sales3mean_week[Idx].value);//판촉계획



		
		//할당률 조정
		tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
		tot_alloc_rate		= (tot_alloc_box/plan)*100;
		
		document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
		tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);
	
		if(Idx%12== 0){
			plan = delv ;
		}

		//기초재고 조정
			nextIdx 	= Idx+1; 
			if(document.frm.alloc_gubn[Idx].value == "2"){

				newStoc = 	(stoc+inpt)  - tot_alloc_box;//기초재고
				if(newStoc < 0){
					newStoc = 0;
					//stocDay = 0;
				}				
				
				document.frm.stoc[nextIdx].value = newStoc;
				setViewMode( document.frm.stoc[nextIdx]);
				
				if(tot_alloc_box == 0){
					tot_alloc_box = 1;
					tot_alloc_rate = 0;
					document.frm.tot_alloc_rate[Idx].value = tot_alloc_rate;	
					stocDay = ((stoc) /tot_alloc_box);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율	
				}
				else{
					stocDay = ((stoc) /tot_alloc_box);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율
				
				}
			}
			else{

				newStoc = 	(stoc+inpt)  - plan;//기초재고
				if(newStoc < 0){
					newStoc = 0;
					//stocDay = 0;
				}				

				document.frm.stoc[nextIdx].value = newStoc;
				setViewMode( document.frm.stoc[nextIdx]);

		
				if(plan==0){
					plan = 1;
					tot_alloc_rate = 0;
					document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
					stocDay = ((stoc) /plan);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc + inpt) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율
				}
				else{
					stocDay = ((stoc) /plan);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//재고일수
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//할당가능율

				}
			}

			if(stock_day == "" || stock_day == null){
				stock_day = 3;
			}
			
			if(Number(document.frm.stocDay[Idx].value) <= Number(stock_day)){
				divStocDay[Idx].style.color = "red";
			}
			else{
				divStocDay[Idx].style.color = "black";
			}

				Idx= Idx+1;//다음 Idx참조
		}while((Idx+1)%12!== 0 && (orgIdx+1)%12 !== 0 )
		
		
}		
