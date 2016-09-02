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

// input box �� Edit Mode �� ��ȯ
function setEditMode( obj ) {
	
	//obj.childNodes(0).style.display = "block";
	obj.childNodes(0).select();
}

// input box �� View Mode �� ��ȯ
function setViewMode( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"&nbsp;"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

// input box �� View Mode �� ��ȯ
function setViewMode1( obj ) {
	var strVal = obj.value;
	obj.parentNode.childNodes(0).innerHTML = numberFormat(strVal)+"%"+"&nbsp;"+"&nbsp;";
	obj.parentNode.childNodes(0).style.display = "block";
	obj.style.display = "none";
}

GoSave = function(service) {
	// service_id ����
	frameSetService.location = "service.do?_moon_service=set_service_id&amp;user_service=" + service;
	
	viewWait();// ��ȸ�� WAITING �̹��� �����ֱ�
	document.frm._moon_service.value = service;
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	
};

// setTimeout ���� ȣ���Ͽ� �ð� ���� �� setEditMode() ����
function setEditModeTime() {
	
	setEditMode( objTdG );
	
}

//��ȸ�� ��¥�� YYYY-MM-DD ->  YYYYMMDD�� ��ȯ
GoSearch = function(service) {
	
	var	temp_in_cnfm_date = document.frm.in_cnfm_date.value;
	document.frm.in_cnfm_date.value = delDateDelimiter(document.frm.in_cnfm_date.value);
	document.frm.search_period.value = Number(document.frm.search_period.value); 		//��ȸ�Ⱓ
	var	search_type = document.frm.search_type.value; 	//	��ȸ����
	var	stock_day 	= Number(document.frm.stock_day.value); 	// ����ϼ�	
	var	search_item = document.frm.search_item.value; 	//ǰ���	
	var	week_flag = document.frm.week_flag.value; 	//�˻� ���� (�ǸŰ�ȹ, 1�����, 3�����)
	
	var	week_name = document.frm.week_flag.options[document.frm.week_flag.selectedIndex].text; 	//�˻� ���� (�ǸŰ�ȹ, 1�����, 3�����)
	
	document.frm.week_name.value = week_name;
	
	//alert(week_name);

	if( search_type == "" || search_type == null || search_type == 00 ) {
		alert("��ȸ������ �����Ͻʽÿ�!");
		document.frm.search_type.select();
		return;
	}
	//������ ���� �Է��ϸ� ����ϼ� null ���
	if(search_item == "" || search_item == null ) {
		if( stock_day == "" || stock_day == null ) {
			alert("����ϼ��� �����Ͻʽÿ�!"); 
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
	
	viewWait();// ��ȸ�� WAITING �̹��� �����ֱ�
	document.frm._moon_service.value = service; 
	document.frm._moon_pagenumber.value = "1"; 
	document.frm.action = "service.do";
	document.frm.target = "_self";
	document.frm.submit();
	//doChange1(this, 0, 0);

	document.frm.in_cnfm_date.value = temp_in_cnfm_date;
	
};

// �ش� �÷��׿����� ���ð� �Ҵ�
function doCheckFlag(obj){
	
	// sale_plan_flag - �ǸŰ�ȹ 0 �̾ ��ȸ
	if(obj.name == "sale_plan_chk" ){ 
		if(obj.checked){
				document.frm.sale_plan_flag.value = "Y";
		}
		else{
				document.frm.sale_plan_flag.value = "N";
		}
	} else

	// ����ϼ� stock_day �̻���ǰ�� ��ȸ
	if(obj.name == "stock_day_chk" ){ // sale_plan_flag - �ǸŰ�ȹ 0 �̾ ��ȸ
		if(obj.checked){
				document.frm.stock_day_flag.value = "Y";
		}
		else{
				document.frm.stock_day_flag.value = "N";
		}
	}else 
	
	// �����Ҵ� ���ǰ�� ��ȸ
	if(obj.name == "alloc_item_chk" ){ // alloc_item_flag - 
		if(obj.checked){
				document.frm.alloc_item_flag.value = "Y";
		}
		else{
				document.frm.alloc_item_flag.value = "N";
		}
	}
}

// �����Ҵ� ����  check�ڽ� üũ�ÿ� set_flag�� '2'= ������ �����Ѵ�. 1= ����
function doSetAloc(obj, rowIdx, colIdx) {
	
	var Idx = (parseInt(rowIdx)*12) + parseInt(colIdx);
	if(obj.checked){
		
	//	if(confirm("�ش� ǰ���� �����Ҵ� ǰ������ ���� �Ͻðڽ��ϱ�?") == 1 ) {
			if(document.frm.alloc_gubn[Idx]){
				document.frm.alloc_gubn[Idx].value = "2";
				document.frm.delete_flag[Idx].value = "2";
				//document.frm.tot_alloc_box[Idx].value = 0;//üũ ������ �Ҵ���� �Ҵ緮�� 0���� ����!
				document.frm.tot_alloc_rate[Idx].value = 100;
	//openPopUp(obj, rowIdx, colIdx);// �˾�â 
				doChange2(this, rowIdx, colIdx);
				
			}
			else{
				document.frm.alloc_gubn.value = "2";
				document.frm.delete_flag[Idx].value = "2";
				//document.frm.tot_alloc_box.value = 0;//üũ ������ �Ҵ���� �Ҵ緮�� 0���� ����!
				document.frm.tot_alloc_rate.value = 100;
	//openPopUp(obj, rowIdx, colIdx);// �˾�â 
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
		//if(confirm("�ش� ǰ���� �����Ҵ� ������ ����Ͻðڽ��ϱ�?") == 1 ) {
			if(document.frm.alloc_gubn[Idx]){
				document.frm.alloc_gubn[Idx].value = "0";
				document.frm.delete_flag[Idx].value = "0";
				document.frm.tot_alloc_box[Idx].value = 0;//üũ ������ �Ҵ���� �Ҵ緮�� 0���� ����!
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



//�Ҵ緮�� ���� �������/�Ҵ�� ����
function doChange1(obj, rowIdx, colIdx){

	var Idx 			= (parseInt(rowIdx)*12) + parseInt(colIdx); //ù°����1_12  ��°���� 13~24
	var orgIdx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var nextIdx			= "";
//alert("Idx="+Idx);	
//alert("rowIdx="+rowIdx);	
//alert("colIdx="+colIdx);	

	var date 			= "";//����
	var stoc			= "";//���
	var inpt 			= "";//�԰�
	var sale 			= "";//�ǸŰ�ȹ
	var prom 			= "";//���˰�ȹ
	var plan			= "";//�Ǹ�+����
	var stocDay			= "";//����ϼ�
	var canAlloc 		= "";
	var	delv			= "";//�ֹ���
	
	var	stock_day 	= Number(document.frm.stock_day.value);//����ϼ�
	var	search_item = document.frm.search_item.value; 	//ǰ���/�ڵ�	

	var tot_alloc_rate 	= "";
	var tot_alloc_box	= obj.value;
	tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
	
	//�Ҵ緮�� 0�Ͻ� �Ҵ� ���� ���� -�Ҵ緮 �Է½� üũ�ڽ� ���� = 2
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
			document.frm.alloc_gubn[Idx].value = "2";//��ġ �Է½� ���������� ����� 2�� ����
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
		stoc	= parseInt(document.frm.stoc[Idx].value);//���
		inpt 	= parseInt(document.frm.inpt[Idx].value);//�԰�
		sale 	= parseInt(document.frm.sale[Idx].value);//�ǸŰ�ȹ
		prom 	= parseInt(document.frm.prom[Idx].value);//���˰�ȹ
		date 	= parseInt(document.frm.cnfm_date[Idx].value);//����
		delv	= parseInt(document.frm.delv[Idx].value);//�ֹ���
		plan	= sale + prom ; //�Ǹ�+����



		
		//�Ҵ�� ����
		tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
		tot_alloc_rate		= (tot_alloc_box/plan)*100;
		
		document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
		tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);
	
		if(Idx%12== 0){
			plan = delv ;
		}

		//������� ����
			nextIdx 	= Idx+1; 
			if(document.frm.alloc_gubn[Idx].value == "2"){
				
				//alert(Idx);
				//alert(delv);
				
				if(Idx%12== 0){ //�����Ҵ� ǰ���ϰ�� ù���� �ֹ����� ���ش�
					//alert(1);
				newStoc = 	(stoc+inpt)  - delv;//�������	
				}else{
					//alert(2);
				newStoc = 	(stoc+inpt)  - tot_alloc_box;//�������
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
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����	
				}
				else{
					stocDay = ((stoc) /tot_alloc_box);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����
				
				}
			}
			else{

				newStoc = 	(stoc+inpt)  - plan;//�������
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
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����
				}
				else{
					stocDay = ((stoc) /plan);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����

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

				Idx= Idx+1;//���� Idx����
		}while((Idx+1)%12!== 0 && (orgIdx+1)%12 !== 0 )
		
		
}		

//�Ҵ���� ���� �Ҵ緮 �����ϱ�
function doChange2(obj, rowIdx, colIdx){

	var Idx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var orgIdx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var nextIdx			= "";
//alert("Idx="+Idx);	

	var date 			= "";//����
	var stoc			= "";//���
	var inpt 			= "";//�԰�
	var sale 			= "";//�ǸŰ�ȹ
	var prom 			= "";//���˰�ȹ
	var plan			= "";
	var stocDay			= "";
	var canAlloc 		= "";
	var delv			= "";
	
	var	stock_day 	= Number(document.frm.stock_day.value);//����ϼ�
	var	search_item 	= document.frm.search_item.value; 	//ǰ���/�ڵ�	
	
	var tot_alloc_rate 	= obj.value;
	var tot_alloc_box	= "";
	
	//�Ҵ緮�� 0�Ͻ� �Ҵ� ���� ���� -�Ҵ緮 �Է½� üũ�ڽ� ���� = 2
	if(tot_alloc_rate == 0){
		if(document.frm.alloc_gubn[Idx]){
			document.frm.alloc_gubn[Idx].value = "0";
			document.frm.delete_flag[Idx].value = "0";//���� �÷��װ� "0" �ΰ͸� ���� �õ�
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
			document.frm.alloc_gubn[Idx].value = "2";//��ġ �Է½� ���������� ����� 2�� ����
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
		stoc	= parseInt(document.frm.stoc[Idx].value);//���
		inpt 	= parseInt(document.frm.inpt[Idx].value);//�԰�
		sale 	= parseInt(document.frm.sale[Idx].value);//�ǸŰ�ȹ
		prom 	= parseInt(document.frm.prom[Idx].value);//���˰�ȹ
		date 	= parseInt(document.frm.cnfm_date[Idx].value);//����
		delv	= parseInt(document.frm.delv[Idx].value);//������
		plan	= sale + prom ;
		

		
		///////////////�Ҵ�� ����
		tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
		tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);
		tot_alloc_box 		= parseInt((plan*tot_alloc_rate)/100);
		document.frm.tot_alloc_box[Idx].value = tot_alloc_box;	
		
		if(Idx%12== 0){
			plan = delv ;
		}	

		//������� ����
			nextIdx 	= Idx+1; 
			if(document.frm.alloc_gubn[Idx].value == "2"){

				newStoc = 	(stoc+inpt)  - tot_alloc_box;//�������
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
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����	
				}
				else{
					tot_alloc_rate		= (tot_alloc_box/plan)*100;
					document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
					tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);
					
					stocDay = ((stoc) /tot_alloc_box);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����
				
				}
			}
			else{

				newStoc = 	(stoc+inpt)  - plan;//�������
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
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����
				}
				else{
					tot_alloc_rate		= (tot_alloc_box/plan)*100;
					document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
					tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);

					stocDay = ((stoc) /plan);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����

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
			
			Idx= Idx+1;//���� Idx����

		}while((Idx+1)%12!== 0 && (orgIdx+1)%12 !== 0 )	
}

// TAB key �� ���� �׸� �̵�
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
		// DW1 �Ҵ���
		if( objName == "tot_alloc_rate" ) {
			if(Idx == rowNo_DW2) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.tot_alloc_rate[nextIdx].select();
			return;
		}
		// DW2 �Ҵ緮
		else if( objName == "tot_alloc_box" ) {
			if(Idx == rowNo_DW2) next_row = col_no; else next_row = day_cnt*(row+1)+col_no;
			document.frm.tot_alloc_box[nextIdx].select();
			return;
		}
		// �� ���� box ���� ���� ����
		else {
			return;
		}
	}
	
}


//ȭ��ε�� ����
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

// HTML Grid ��
// onMouseOver event �� ���� ���� ��ȯ 
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

// HTML Grid �� 
// onMouseOut event �� ���� ���� ��ȯ 
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


// 3����� �Ǹŷ� ��� ���� ����
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

//3�� ��� �Ǹŷ� ����
function doChange3(obj, rowIdx, colIdx){

	var Idx 			= (parseInt(rowIdx)*12) + parseInt(colIdx); //ù°����1_12  ��°���� 13~24
	var orgIdx 			= (parseInt(rowIdx)*12) + parseInt(colIdx);
	var nextIdx			= "";


	var date 			= "";//����
	var stoc			= "";//���
	var inpt 			= "";//�԰�
	var sale 			= "";//�ǸŰ�ȹ
	var prom 			= "";//���˰�ȹ
	var plan			= ""; 
	var stocDay			= "";
	var canAlloc 		= "";
	var	delv			= "";
	
	var	stock_day 	= Number(document.frm.stock_day.value);//����ϼ�
	var	search_item 	= document.frm.search_item.value; 	//ǰ���/�ڵ�	

	var tot_alloc_rate 	= "";
	var tot_alloc_box	= obj.value;
	tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
	
	//�Ҵ緮�� 0�Ͻ� �Ҵ� ���� ���� -�Ҵ緮 �Է½� üũ�ڽ� ���� = 2
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
			document.frm.alloc_gubn[Idx].value = "2";//��ġ �Է½� ���������� ����� 2�� ����
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
		stoc	= parseInt(document.frm.stoc[Idx].value);//���
		inpt 	= parseInt(document.frm.inpt[Idx].value);//�԰�
		sale 	= parseInt(document.frm.sale[Idx].value);//�ǸŰ�ȹ
		prom 	= parseInt(document.frm.prom[Idx].value);//���˰�ȹ3mean_week
		date 	= parseInt(document.frm.cnfm_date[Idx].value);//����
		delv	= parseInt(document.frm.delv[Idx].value);//����
		plan	= parseInt(document.frm.sales3mean_week[Idx].value);//���˰�ȹ



		
		//�Ҵ�� ����
		tot_alloc_box 		= parseInt(document.frm.tot_alloc_box[Idx].value);
		tot_alloc_rate		= (tot_alloc_box/plan)*100;
		
		document.frm.tot_alloc_rate[Idx].value = Math.round(tot_alloc_rate*10)/10;	
		tot_alloc_rate 		= parseInt(document.frm.tot_alloc_rate[Idx].value);
	
		if(Idx%12== 0){
			plan = delv ;
		}

		//������� ����
			nextIdx 	= Idx+1; 
			if(document.frm.alloc_gubn[Idx].value == "2"){

				newStoc = 	(stoc+inpt)  - tot_alloc_box;//�������
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
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����	
				}
				else{
					stocDay = ((stoc) /tot_alloc_box);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /tot_alloc_box)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����
				
				}
			}
			else{

				newStoc = 	(stoc+inpt)  - plan;//�������
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
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc + inpt) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����
				}
				else{
					stocDay = ((stoc) /plan);
					document.frm.stocDay[Idx].value = Math.round(stocDay*10)/10;
					setViewMode( document.frm.stocDay[Idx]);//����ϼ�
					canAlloc = (((stoc) /plan)*100);
					document.frm.canAlloc[Idx].value = Math.round(canAlloc*10)/10;
					setViewMode1( document.frm.canAlloc[Idx]);//�Ҵ簡����

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

				Idx= Idx+1;//���� Idx����
		}while((Idx+1)%12!== 0 && (orgIdx+1)%12 !== 0 )
		
		
}		
