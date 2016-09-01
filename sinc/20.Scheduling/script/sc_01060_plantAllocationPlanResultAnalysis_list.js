
// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
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

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ 
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

// ���� �����ʿ䷮ ������ ��
var oldProdQty;
var oldNNPlanVsStk;
var oldNNActVsStk;


// ���� �����ʿ䷮ ������ �� ����
function saveValues(obj){
	
	oldProdQty = strToNum(obj.value); // ���� �����ʿ䷮
	oldNNPlanVsStk = strToNum(obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value);
	oldNNActVsStk = strToNum(obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value);

}

// ���� �����ʿ䷮ ���� �� ���� �䱸/���� ����, ���� �������, �Ұ�, �Ѱ� ���
function calculate(obj){
	//alert("!!");
	if(!checkNum(obj,'BLANK_INT')) return; // ���� üũ
	
	var prodQty = strToNum(obj.value); //�����ʿ䷮(new)
	var repQty = strToNum(obj.parentNode.previousSibling.childNodes(1).value); //����䱸��
	var preStock = strToNum(obj.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.childNodes(1).value); //�������
	var salQty = strToNum(obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value); //�ǸŰ�ȹ	
	
	var nnSalQty = strToNum(obj.parentNode.parentNode.lastChild.previousSibling.previousSibling.previousSibling.childNodes(1).value);//������ �ǸŰ�ȹ
	var nnSalWork = strToNum(obj.parentNode.childNodes(2).value);//������ �����ϼ�
	var week1AvgSal = strToNum(obj.parentNode.childNodes(3).value); //1�� ��� �Ǹ�
	
	//var repQty = strToNum(document.frm.nwk_rep_plan[rowIdx].value); //����䱸��
	//var preStock = strToNum(document.frm.nwk_boh[rowIdx].value); //�������
	//var salQty = strToNum(document.frm.nwk_salplan[rowIdx].value); //�ǸŰ�ȹ	
	
	var differ = prodQty - repQty; //�䱸/���� ����(new)	
	var stock = preStock + prodQty - salQty; // ������ �������(new)
	
	if(nnSalQty == 0) nnSalQty = 1;
	
	//������ ��ȹ ��� ����ϼ�
	var nnPlanVsStk = stock * nnSalWork  / nnSalQty;
	
	nnPlanVsStk = fixedPoint(nnPlanVsStk.toString(), 1);
	//������ ���� ��� ��� �ϼ�
	var nnActVsStk = stock / week1AvgSal;
	nnActVsStk = fixedPoint(nnActVsStk.toString(), 1);
	
	// ������ ��ȹ ��� ��� �ϼ�, ���� ��� ��� �ϼ�
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(nnPlanVsStk);
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(nnActVsStk);
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(nnPlanVsStk) + "&nbsp;";
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(nnActVsStk) + "&nbsp;";
	
	var rowIdx = obj.parentNode.parentNode.rowIndex;
	var cat = divCat[rowIdx].innerHTML; // ���������ڵ�
	// ���� �����ʿ䷮, �䱸/���� ����, ���� ������� �Ұ�, �Ѱ�
	var totPartProdQty = strToNum(document.getElementById("divNwkLstProdQtyTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totProdQty = strToNum(document.getElementById("divNwkLstProdQtyTot").innerHTML.replace("&nbsp;",""));
	var totPartDiffer = strToNum(document.getElementById("divNwkAdjQtyTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totDiffer = strToNum(document.getElementById("divNwkAdjQtyTot").innerHTML.replace("&nbsp;",""));
	var totPartStock = strToNum(document.getElementById("divNwkEohTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totStock = strToNum(document.getElementById("divNwkEohTot").innerHTML.replace("&nbsp;",""));
	
	// ������ �⸻ �������, �Ұ�, �Ѱ�
	var nnStock = strToNum(obj.parentNode.parentNode.lastChild.previousSibling.childNodes(1).value); //������ �⸻ �������
	var totPartNNStock = strToNum(document.getElementById("divNNwkEohTotPart" + cat).innerHTML.replace("&nbsp;","")); //������ �⸻ ������� �Ұ�
	var totNNStock = strToNum(document.getElementById("divNNwkEohTot").innerHTML.replace("&nbsp;","")); //������ �⸻ ������� �Ѱ�
	var totPartNNPlanVsStk = strToNum(document.getElementById("divNNwkPlanVsStkTotPart" + cat).innerHTML.replace("&nbsp;",""));//������ ��ȹ ��� ��� �ϼ�
	var totPartNNActVsStk = strToNum(document.getElementById("divNNwkActVsStkTotPart" + cat).innerHTML.replace("&nbsp;",""));//������ ���� ��� ��� �ϼ�
	
	
	// ���� �� ���� ���� �� ���� ����
	var difProdQty = prodQty - oldProdQty; //���� �����ʿ䷮  ����
	
	// ����� �Ұ�, �Ѱ�
	var nweTotPartProdQty = totPartProdQty + difProdQty; // ���� �����ʿ䷮ �Ұ�
	var newTotProdQty = totProdQty + difProdQty; // ���� �����ʿ䷮ �Ѱ�
	var nweTotPartDiffer = totPartDiffer + difProdQty; // �䱸/���� ���� �Ұ�
	var nweTotDiffer = totDiffer + difProdQty; // �䱸/���� ���� �Ѱ�
	var nweTotPartStock = totPartStock + difProdQty; // ���� ������� �Ұ�
	var nweTotStock = totStock + difProdQty; // ���� ������� �Ѱ�
	
	// ����� ������ �⸻ �������, �Ұ�, �Ѱ�
	var newNnStock = nnStock + difProdQty; // ������ �������
	newNnStock = Math.round(newNnStock*10000 )/10000;
	
	//�������� ���� ��� ��� �ϼ�
	var nnnActVsStk = newNnStock / week1AvgSal;
	nnnActVsStk = fixedPoint(nnnActVsStk.toString(), 1);
	
	var newTotPartNNStock = totPartNNStock + difProdQty; // ������ ������� �Ұ�
	var newTotNNStock = totNNStock + difProdQty; // ������ ������� �Ѱ�
	var newTotPartNNPlanVsStk = totPartNNPlanVsStk + (Number(nnPlanVsStk) - oldNNPlanVsStk);
	var newTotPartNNActVsStk = totPartNNActVsStk + (Number(nnActVsStk) - oldNNActVsStk);
	newTotPartNNPlanVsStk = fixedPoint(newTotPartNNPlanVsStk.toString(), 1);
	newTotPartNNActVsStk = fixedPoint(newTotPartNNActVsStk.toString(), 1);
	
	// ������ ��ȹ ��� ����ϼ� �Ұ�, ���� ��� ����ϼ� �Ұ�
	document.getElementById("divNNwkPlanVsStkTotPart" + cat).innerHTML = numberFormat(newTotPartNNPlanVsStk) + "&nbsp;";
	document.getElementById("divNNwkActVsStkTotPart" + cat).innerHTML = numberFormat(newTotPartNNActVsStk) + "&nbsp;";
	
	// õ���� ������ ǥ��
	obj.value = numberFormat(prodQty);
	
	// �䱸/���� ����
	obj.parentNode.nextSibling.childNodes(1).value = numberFormat(differ);
	obj.parentNode.nextSibling.childNodes(0).innerHTML = numberFormat(differ) + "&nbsp;";
	//document.frm.nwk_adj_qty[rowIdx].value = numberFormat(differ);
	//divNwkAdjQty[rowIdx].innerHTML = numberFormat(differ) + "&nbsp;";
	
	// �������	
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(stock);
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(stock) + "&nbsp;";
	//document.frm.nwk_eoh[rowIdx].value = numberFormat(stock);
	//divNwkEoh[rowIdx].innerHTML = numberFormat(stock) + "&nbsp;";	
	
	//����
	document.getElementById("divNwkLstProdQtyTotPart" + cat).innerHTML = numberFormat(nweTotPartProdQty) + "&nbsp;";
	document.getElementById("divNwkLstProdQtyTot").innerHTML = numberFormat(newTotProdQty) + "&nbsp;";
	document.getElementById("divNwkAdjQtyTotPart" + cat).innerHTML = numberFormat(nweTotPartDiffer) + "&nbsp;";
	document.getElementById("divNwkAdjQtyTot").innerHTML = numberFormat(nweTotDiffer) + "&nbsp;";
	document.getElementById("divNwkEohTotPart" + cat).innerHTML = numberFormat(nweTotPartStock) + "&nbsp;";
	document.getElementById("divNwkEohTot").innerHTML = numberFormat(nweTotStock) + "&nbsp;";
	
	//������
	obj.parentNode.parentNode.lastChild.previousSibling.childNodes(1).value = numberFormat(newNnStock);
	obj.parentNode.parentNode.lastChild.previousSibling.childNodes(0).innerHTML = numberFormat(newNnStock) + "&nbsp;";
	document.getElementById("divNNwkEohTotPart" + cat).innerHTML = numberFormat(newTotPartNNStock) + "&nbsp;";
	document.getElementById("divNNwkEohTot").innerHTML = numberFormat(newTotNNStock) + "&nbsp;";
	
	// �������� ������ȹ ��� ����ϼ�
	obj.parentNode.parentNode.lastChild.childNodes(1).value = numberFormat(nnnActVsStk);
	obj.parentNode.parentNode.lastChild.childNodes(0).innerHTML = numberFormat(nnnActVsStk) + "&nbsp;";
	
	// ���� �÷��� üũ
	obj.nextSibling.value = "Y";
	
}

// ������ �����ʿ䷮ ������ ��
var oldProdQty2;
var oldNNNActVsStk;

// ������ �����ʿ䷮ ������ �� ����
function saveValues2(obj){
	
	oldProdQty2 = strToNum(obj.value); // ���� �����ʿ䷮
	oldNNNActVsStk = strToNum(obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value);

}

// ������ �����ʿ䷮ ���� �� ������ �������, �Ұ�, �Ѱ� ���
function calculate2(obj){
	//alert("!!");
	if(!checkNum(obj,'BLANK_INT')) return; // ���� üũ
	
	var prodQty = strToNum(obj.value); //�����ʿ䷮(new)
	var repQty = strToNum(obj.parentNode.previousSibling.childNodes(1).value); //����䱸��
	var preStock = strToNum(obj.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.childNodes(1).value); //�������
	var salQty = strToNum(obj.parentNode.nextSibling.childNodes(1).value); //�ǸŰ�ȹ	
	var week1AvgSal = strToNum(obj.parentNode.childNodes(2).value); //1�� ��� �Ǹ�
	
	var stock = preStock + prodQty - salQty; // ���� �������(new)
	
	//�������� ���� ��� ��� �ϼ�
	var nnnActVsStk = stock / week1AvgSal;
	nnnActVsStk = fixedPoint(nnnActVsStk.toString(), 1);
	
	// ������ ��ȹ ��� ��� �ϼ�, ���� ��� ��� �ϼ�
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(nnnActVsStk);
	obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(nnnActVsStk) + "&nbsp;";
	
	var rowIdx = obj.parentNode.parentNode.rowIndex;
	var cat = divCat[rowIdx].innerHTML; // ���������ڵ�
	// ���� �����ʿ䷮, �䱸/���� ����, ���� ������� �Ұ�, �Ѱ�
	var totPartProdQty = strToNum(document.getElementById("divNNwkLstProdQtyTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totProdQty = strToNum(document.getElementById("divNNwkLstProdQtyTot").innerHTML.replace("&nbsp;",""));
	var totPartStock = strToNum(document.getElementById("divNNwkEohTotPart" + cat).innerHTML.replace("&nbsp;",""));
	var totStock = strToNum(document.getElementById("divNNwkEohTot").innerHTML.replace("&nbsp;",""));
	
	// ���� �� ���� ���� �� ���� ����
	var difProdQty = prodQty - oldProdQty2; //���� �����ʿ䷮  ����
	
	// ����� �Ұ�, �Ѱ�
	var nweTotPartProdQty = totPartProdQty + difProdQty; // ���� �����ʿ䷮ �Ұ�
	var newTotProdQty = totProdQty + difProdQty; // ���� �����ʿ䷮ �Ѱ�
	var nweTotPartStock = totPartStock + difProdQty; // ���� ������� �Ұ�
	var nweTotStock = totStock + difProdQty; // ���� ������� �Ѱ�
	
	// õ���� ������ ǥ��
	obj.value = numberFormat(prodQty);
		
	// �������	
	obj.parentNode.nextSibling.nextSibling.nextSibling.childNodes(1).value = numberFormat(stock);
	obj.parentNode.nextSibling.nextSibling.nextSibling.childNodes(0).innerHTML = numberFormat(stock) + "&nbsp;";
	
	document.getElementById("divNNwkLstProdQtyTotPart" + cat).innerHTML = numberFormat(nweTotPartProdQty) + "&nbsp;";
	document.getElementById("divNNwkLstProdQtyTot").innerHTML = numberFormat(newTotProdQty) + "&nbsp;";
	document.getElementById("divNNwkEohTotPart" + cat).innerHTML = numberFormat(nweTotPartStock) + "&nbsp;";
	document.getElementById("divNNwkEohTot").innerHTML = numberFormat(nweTotStock) + "&nbsp;";
	
	// ���� �÷��� üũ
	obj.nextSibling.value = "Y";
	
}

GoSearch = function(service) {

	if(document.frm.checked_domain[3].checked == true) {
		// ����,���� ����� ���ÿ� �۾��� ��� ��ü���¿��� �۾��� ���� ������ �۾������͸� ������ų ������ �ִ�.
		if(confirm("��ü��ȸ�ô� ������ �� �����ϴ�! \n ��� ��ȸ�Ͻðڽ��ϱ�?") != 1 ) {
			return;
		}
	}
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();

	document.frm._moon_service.value = service; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// ����
GoSave = function(service) {
	
	if(document.frm.checked_domain[3].checked == true) {
		// ����,���� ����� ���ÿ� �۾��� ��� ��ü���¿��� �۾��� ���� ������ �۾������͸� ������ų ������ �ִ�.
		alert("��ü��ȸ�ô� ������ �� �����ϴ�! ");
		return;
	}
	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	document.frm._moon_service.value = service;
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
}

