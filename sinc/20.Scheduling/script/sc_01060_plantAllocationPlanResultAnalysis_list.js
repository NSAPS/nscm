
// HTML Grid 의
// onMouseOver event 에 따른 배경색 변환 
function bgOver( obj ) { 
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) {
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows[rowIdx].style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	} 
	else {
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
			main_tbody.rows.style.backgroundColor = "#eeeeee"; 
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#eeeeee";
		}
	}
	
}

// HTML Grid 의 
// onMouseOut event 에 따른 배경색 변환 
function bgOut( obj ) {
	
	var rowIdx = obj.rowIndex;
	if( left_tbody.rows[rowIdx] ) { 
		if( left_tbody.rows[rowIdx].style.backgroundColor != "#ccccff" ) {
			left_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//left_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows[rowIdx].style.backgroundColor = "#ffffff"; 
			//main_tbody.rows[rowIdx].childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	} 
	else { 
		if( left_tbody.rows.style.backgroundColor != "#ccccff" ) {
			left_tbody.rows.style.backgroundColor = "#ffffff";
			//left_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
			main_tbody.rows.style.backgroundColor = "#ffffff";
			//main_tbody.rows.childNodes(0).childNodes(0).style.backgroundColor = "#ffffff";
		}
	}
	
}

// 차주 생산필요량 변경전 값
var oldProdQty;
var oldNNPlanVsStk;
var oldNNActVsStk;


// 차주 생산필요량 변경전 값 저장
function saveValues(obj){
	
	oldProdQty = strToNum(obj.value); // 차주 생산필요량
	oldNNPlanVsStk = strToNum(obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value);
	oldNNActVsStk = strToNum(obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value);

}

// 차주 생산필요량 변경 시 차주 요구/생산 차이, 차주 예상재고, 소계, 총계 계산
function calculate(obj){
	//alert("!!");
	if(!checkNum(obj,'BLANK_INT')) return; // 숫자 체크
	
	var prodQty = strToNum(obj.value); //생산필요량(new)
	var repQty = strToNum(obj.parentNode.previousSibling.childNodes(1).value); //보충요구량
	var preStock = strToNum(obj.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.childNodes(1).value); //예상재고
	var salQty = strToNum(obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value); //판매계획	
	
	var nnSalQty = strToNum(obj.parentNode.parentNode.lastChild.previousSibling.previousSibling.previousSibling.childNodes(1).value);//차차주 판매계획
	var nnSalWork = strToNum(obj.parentNode.childNodes(2).value);//차차주 영업일수
	var week1AvgSal = strToNum(obj.parentNode.childNodes(3).value); //1주 평균 판매
	
	//var repQty = strToNum(document.frm.nwk_rep_plan[rowIdx].value); //보충요구량
	//var preStock = strToNum(document.frm.nwk_boh[rowIdx].value); //예상재고
	//var salQty = strToNum(document.frm.nwk_salplan[rowIdx].value); //판매계획	
	
	var differ = prodQty - repQty; //요구/생산 차이(new)	
	var stock = preStock + prodQty - salQty; // 차차주 예상재고(new)
	
	if(nnSalQty == 0) nnSalQty = 1;
	
	//차차주 계획 대비 재고일수
	var nnPlanVsStk = stock * nnSalWork  / nnSalQty;
	
	nnPlanVsStk = fixedPoint(nnPlanVsStk.toString(), 1);
	//차차주 실적 대비 재고 일수
	var nnActVsStk = stock / week1AvgSal;
	nnActVsStk = fixedPoint(nnActVsStk.toString(), 1);
	
	// 차차주 계획 대비 재고 일수, 실적 대비 재고 일수
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(nnPlanVsStk);
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(nnActVsStk);
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(nnPlanVsStk) + "&nbsp;";
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(nnActVsStk) + "&nbsp;";
	
	var rowIdx = obj.parentNode.parentNode.rowIndex;
	var cat = divCat[rowIdx].innerHTML; // 설비유형코드
	// 차주 생산필요량, 요구/생산 차이, 차주 예상재고 소계, 총계
	var totPartProdQty = strToNum(document.getElementById("divNwkLstProdQtyTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totProdQty = strToNum(document.getElementById("divNwkLstProdQtyTot").innerHTML.replace("&nbsp;",""));
	var totPartDiffer = strToNum(document.getElementById("divNwkAdjQtyTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totDiffer = strToNum(document.getElementById("divNwkAdjQtyTot").innerHTML.replace("&nbsp;",""));
	var totPartStock = strToNum(document.getElementById("divNwkEohTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totStock = strToNum(document.getElementById("divNwkEohTot").innerHTML.replace("&nbsp;",""));
	
	// 차차주 기말 예상재고, 소계, 총계
	var nnStock = strToNum(obj.parentNode.parentNode.lastChild.previousSibling.childNodes(1).value); //차차주 기말 예상재고
	var totPartNNStock = strToNum(document.getElementById("divNNwkEohTotPart" + cat).innerHTML.replace("&nbsp;","")); //차차주 기말 예상재고 소계
	var totNNStock = strToNum(document.getElementById("divNNwkEohTot").innerHTML.replace("&nbsp;","")); //차차주 기말 예상재고 총계
	var totPartNNPlanVsStk = strToNum(document.getElementById("divNNwkPlanVsStkTotPart" + cat).innerHTML.replace("&nbsp;",""));//차차주 계획 대비 재고 일수
	var totPartNNActVsStk = strToNum(document.getElementById("divNNwkActVsStkTotPart" + cat).innerHTML.replace("&nbsp;",""));//차차주 실적 대비 재고 일수
	
	
	// 변경 전 값과 변경 후 값의 차이
	var difProdQty = prodQty - oldProdQty; //차주 생산필요량  차이
	
	// 변경된 소계, 총계
	var nweTotPartProdQty = totPartProdQty + difProdQty; // 차주 생산필요량 소계
	var newTotProdQty = totProdQty + difProdQty; // 차주 생산필요량 총계
	var nweTotPartDiffer = totPartDiffer + difProdQty; // 요구/생산 차이 소계
	var nweTotDiffer = totDiffer + difProdQty; // 요구/생산 차이 총계
	var nweTotPartStock = totPartStock + difProdQty; // 차주 예상재고 소계
	var nweTotStock = totStock + difProdQty; // 차주 예상재고 총계
	
	// 변경된 차차주 기말 예상재고, 소계, 총계
	var newNnStock = nnStock + difProdQty; // 차차주 예상재고
	newNnStock = Math.round(newNnStock*10000 )/10000;
	
	//차차차주 실적 대비 재고 일수
	var nnnActVsStk = newNnStock / week1AvgSal;
	nnnActVsStk = fixedPoint(nnnActVsStk.toString(), 1);
	
	var newTotPartNNStock = totPartNNStock + difProdQty; // 차차주 예상재고 소계
	var newTotNNStock = totNNStock + difProdQty; // 차차주 예상재고 총계
	var newTotPartNNPlanVsStk = totPartNNPlanVsStk + (Number(nnPlanVsStk) - oldNNPlanVsStk);
	var newTotPartNNActVsStk = totPartNNActVsStk + (Number(nnActVsStk) - oldNNActVsStk);
	newTotPartNNPlanVsStk = fixedPoint(newTotPartNNPlanVsStk.toString(), 1);
	newTotPartNNActVsStk = fixedPoint(newTotPartNNActVsStk.toString(), 1);
	
	// 차차주 계획 대비 재고일수 소계, 실적 대비 재고일수 소계
	document.getElementById("divNNwkPlanVsStkTotPart" + cat).innerHTML = numberFormat(newTotPartNNPlanVsStk) + "&nbsp;";
	document.getElementById("divNNwkActVsStkTotPart" + cat).innerHTML = numberFormat(newTotPartNNActVsStk) + "&nbsp;";
	
	// 천단위 구분자 표시
	obj.value = numberFormat(prodQty);
	
	// 요구/생산 차이
	obj.parentNode.nextSibling.childNodes(1).value = numberFormat(differ);
	obj.parentNode.nextSibling.childNodes(0).innerHTML = numberFormat(differ) + "&nbsp;";
	//document.frm.nwk_adj_qty[rowIdx].value = numberFormat(differ);
	//divNwkAdjQty[rowIdx].innerHTML = numberFormat(differ) + "&nbsp;";
	
	// 예상재고	
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(stock);
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(stock) + "&nbsp;";
	//document.frm.nwk_eoh[rowIdx].value = numberFormat(stock);
	//divNwkEoh[rowIdx].innerHTML = numberFormat(stock) + "&nbsp;";	
	
	//차주
	document.getElementById("divNwkLstProdQtyTotPart" + cat).innerHTML = numberFormat(nweTotPartProdQty) + "&nbsp;";
	document.getElementById("divNwkLstProdQtyTot").innerHTML = numberFormat(newTotProdQty) + "&nbsp;";
	document.getElementById("divNwkAdjQtyTotPart" + cat).innerHTML = numberFormat(nweTotPartDiffer) + "&nbsp;";
	document.getElementById("divNwkAdjQtyTot").innerHTML = numberFormat(nweTotDiffer) + "&nbsp;";
	document.getElementById("divNwkEohTotPart" + cat).innerHTML = numberFormat(nweTotPartStock) + "&nbsp;";
	document.getElementById("divNwkEohTot").innerHTML = numberFormat(nweTotStock) + "&nbsp;";
	
	//차차주
	obj.parentNode.parentNode.lastChild.previousSibling.childNodes(1).value = numberFormat(newNnStock);
	obj.parentNode.parentNode.lastChild.previousSibling.childNodes(0).innerHTML = numberFormat(newNnStock) + "&nbsp;";
	document.getElementById("divNNwkEohTotPart" + cat).innerHTML = numberFormat(newTotPartNNStock) + "&nbsp;";
	document.getElementById("divNNwkEohTot").innerHTML = numberFormat(newTotNNStock) + "&nbsp;";
	
	// 차차차주 실적계획 대비 재고일수
	obj.parentNode.parentNode.lastChild.childNodes(1).value = numberFormat(nnnActVsStk);
	obj.parentNode.parentNode.lastChild.childNodes(0).innerHTML = numberFormat(nnnActVsStk) + "&nbsp;";
	
	// 수정 플래그 체크
	obj.nextSibling.value = "Y";
	
}

// 차차주 생산필요량 변경전 값
var oldProdQty2;
var oldNNNActVsStk;

// 차차주 생산필요량 변경전 값 저장
function saveValues2(obj){
	
	oldProdQty2 = strToNum(obj.value); // 차주 생산필요량
	oldNNNActVsStk = strToNum(obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value);

}

// 차차주 생산필요량 변경 시 차차주 예상재고, 소계, 총계 계산
function calculate2(obj){
	//alert("!!");
	if(!checkNum(obj,'BLANK_INT')) return; // 숫자 체크
	
	var prodQty = strToNum(obj.value); //생산필요량(new)
	var repQty = strToNum(obj.parentNode.previousSibling.childNodes(1).value); //보충요구량
	var preStock = strToNum(obj.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.childNodes(1).value); //예상재고
	var salQty = strToNum(obj.parentNode.nextSibling.childNodes(1).value); //판매계획	
	var week1AvgSal = strToNum(obj.parentNode.childNodes(2).value); //1주 평균 판매
	
	var stock = preStock + prodQty - salQty; // 차주 예상재고(new)
	
	//차차차주 실적 대비 재고 일수
	var nnnActVsStk = stock / week1AvgSal;
	nnnActVsStk = fixedPoint(nnnActVsStk.toString(), 1);
	
	// 차차주 계획 대비 재고 일수, 실적 대비 재고 일수
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(nnnActVsStk);
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(nnnActVsStk) + "&nbsp;";
	
	var rowIdx = obj.parentNode.parentNode.rowIndex;
	var cat = divCat[rowIdx].innerHTML; // 설비유형코드
	// 차주 생산필요량, 요구/생산 차이, 차주 예상재고 소계, 총계
	var totPartProdQty = strToNum(document.getElementById("divNNwkLstProdQtyTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totProdQty = strToNum(document.getElementById("divNNwkLstProdQtyTot").innerHTML.replace("&nbsp;",""));
	var totPartStock = strToNum(document.getElementById("divNNwkEohTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totStock = strToNum(document.getElementById("divNNwkEohTot").innerHTML.replace("&nbsp;",""));
	
	// 변경 전 값과 변경 후 값의 차이
	var difProdQty = prodQty - oldProdQty2; //차주 생산필요량  차이
	
	// 변경된 소계, 총계
	var nweTotPartProdQty = totPartProdQty + difProdQty; // 차주 생산필요량 소계
	var newTotProdQty = totProdQty + difProdQty; // 차주 생산필요량 총계
	var nweTotPartStock = totPartStock + difProdQty; // 차주 예상재고 소계
	var nweTotStock = totStock + difProdQty; // 차주 예상재고 총계
	
	// 천단위 구분자 표시
	obj.value = numberFormat(prodQty);
		
	// 예상재고	
	obj.parentNode.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(stock);
	obj.parentNode.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(stock) + "&nbsp;";
	
	document.getElementById("divNNwkLstProdQtyTotPart" + cat).innerHTML = numberFormat(nweTotPartProdQty) + "&nbsp;";
	document.getElementById("divNNwkLstProdQtyTot").innerHTML = numberFormat(newTotProdQty) + "&nbsp;";
	document.getElementById("divNNwkEohTotPart" + cat).innerHTML = numberFormat(nweTotPartStock) + "&nbsp;";
	document.getElementById("divNNwkEohTot").innerHTML = numberFormat(nweTotStock) + "&nbsp;";
	
	// 수정 플래그 체크
	obj.nextSibling.value = "Y";
	
}

GoSearch = function(service) {

	if(document.frm.checked_domain[3].checked == true) {
		// 내수,수출 담당이 동시에 작업할 경우 전체상태에서 작업할 경우는 서로의 작업데이터를 삭제시킬 위험이 있다.
		if(confirm("전체조회시는 저장할 수 없습니다! \n 계속 조회하시겠습니까?") != 1 ) {
			return;
		}
	}
	// 조회시 WAITING 이미지 보여주기
	viewWait();

	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// 저장
GoSave = function(service) {
	
	if(document.frm.checked_domain[3].checked == true) {
		// 내수,수출 담당이 동시에 작업할 경우 전체상태에서 작업할 경우는 서로의 작업데이터를 삭제시킬 위험이 있다.
		alert("전체조회시는 저장할 수 없습니다! ");
		return;
	}
	// 조회시 WAITING 이미지 보여주기
	viewWait();
	
	// service_id 저장
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

