// ���� Ŭ�� : ����ȭ������ �̵�
function onclickfunc(row, col, data) {
	

	var dw_sel = document.frm.sel_dw.value;

	if(dw_sel == "2" ){ // ǰ��GYR
	
		if(col == "3"){
			sel_gyr_gubn = "G";	
		}
		else if (col == "4"){
			sel_gyr_gubn = "Y";	
		}
		else if (col == "5"){
			sel_gyr_gubn = "R";	
		}
		else return; 
	
		var in_work_date	= document.frm.in_work_date.value;
		var item_id			= data.split("!%!")[0];
		var	item_name = "";
	//	var sel_gyr_gubn = document.frm.sel_gyr_gubn.value;
		
		commonUtil.getCodeInfo("input_value", item_id, "search_item_id_and_item_name_by_item_input", { 
			callback:function(arrList){
				// ��ġ�ϴ� ��ǰ ����
				if( arrList.length == 1 ) {
					item_name = arrList[0][1];
				}
				var service_url = "service.do?_moon_service=ip_04020_GYR_ItemList_popup";
				service_url += "&in_work_date=" + in_work_date + "&gyr_date=" + in_work_date + "&item_id=" + item_id + "&item_name=" + item_name + "&sel_gyr_gubn=" + sel_gyr_gubn;
				var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=900, height=600, top=0, left=0";
				var newWin = window.open(service_url, "ip_04020_GYR_ItemList_popup", pop_win_style);
				newWin.focus();		
	
			}
		});
	}
	else if(dw_sel == "3"){ // ���������GYR

		if(col == "3"){
			sel_gyr_gubn = "G";	
		}
		else if (col == "4"){
			sel_gyr_gubn = "Y";	
		}
		else if (col == "5"){
			sel_gyr_gubn = "R";	
		}
	
		var in_work_date	= document.frm.in_work_date.value;
		var dc_id			= data.split("!%!")[0];
		
		var service_url = "service.do?_moon_service=ip_04040_GYR_DC_Detail_list";
		service_url += "&in_work_date=" + in_work_date + "&insel_dc_id=" + dc_id + "&sel_gyr_gubn=" + sel_gyr_gubn;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=900, height=600, top=0, left=0";
		var newWin = window.open(service_url, "GYR_DC_Detail_list", pop_win_style);
		newWin.focus();		
	
	}
}

// ��ȸ �� waiting �̹��� �����ֱ�
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display	= "none";
			gridArea2.style.display = "none";
			gridArea3.style.display = "none";
			gridArea4.style.display = "none";
			waitArea.style.display	= "block";
			waitArea2.style.display = "block";
			waitArea3.style.display = "block";
			waitArea4.style.display = "block";
		}
		else {
			gridArea.style.display	= "block";
			gridArea2.style.display = "block";
			gridArea3.style.display = "block";
			gridArea4.style.display = "block";
			waitArea.style.display	= "none";
			waitArea2.style.display = "none";
			waitArea3.style.display = "none";
			waitArea4.style.display = "none";
		}
	}
	
}


// ������ tab�� Ŭ���ϸ� �߻��ϴ� event -> �̰����� ȭ��� ��� �Ѵ�.
WebFXTabPage.prototype.show = function () {
	var el	= this.tab;
	var s	= el.className + " selected";
	s = s.replace(/ +/g, " ");
	el.className = s;
	
	this.element.style.display = "block";
	
	var tabId = this.element.id;
	if(tabId == "tabPage1"){
		document.frm.sel_dw.value = "1";
	}else if(tabId == "tabPage2"){
		document.frm.sel_dw.value = "2";
	}else if(tabId == "tabPage3"){
		document.frm.sel_dw.value = "3";
	}else if(tabId == "tabPage4"){
		document.frm.sel_dw.value = "4";
	}
};

// ��ȸ
GoSearch = function() {

	var sel_dw		= document.frm.sel_dw.value;

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();

	if(sel_dw != "4") {
	document.frm._moon_service.value	= "ip_04020_GYR_information_list"; 
	document.frm.action					= "service.do";
	document.frm.target					= "_self";
	document.frm.submit();
	}
	else {
		doQuery4();
	    // Waiting image ����!
		viewWait();
	}	
	
};

/*������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ������������������������������������������������������������������������*/
function init4() {

	var GridObj4 = document.WiseGrid4;

	GridObj4.ClearGrid(); 
	setProperty(GridObj4);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setDefault4();        //ȭ�� �⺻ ���� 
	setHeader4(GridObj4);  //�ش����� 

}
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault4() {

	var GridObj4 = document.WiseGrid4;

    GridObj4.nHDLines         = 2; //Header LINE��
    GridObj4.nHDLineSize      = 14; //Header Size
    GridObj4.strHDClickAction    = "sortsingle";
}
   	
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader4(GridObj4) {		

	GridObj4.AddHeader("ITEM_ID"		,"�ڵ�"       		,"t_text"	,10		,60 	,false); //0   
	GridObj4.AddHeader("ITEM_NAME"		,"ǰ���"       		,"t_text"	,200	,200	,false); //1   
	GridObj4.AddHeader("TERM_VAL"		,"�������"       	,"t_number" ,5 		,40 	,false); //4   
	GridObj4.AddHeader("GYR_RATE"		,"GYR����"       	,"t_text"	,30 	,80 	,false); //3   
	GridObj4.AddHeader("GYR"			,"GYR"		       	,"t_text"	,5 		,40 	,false); //4   
	GridObj4.AddHeader("PERIOD_DATE"	,"��������"       	,"t_text"	,20 	,80 	,false); //4   
	GridObj4.AddHeader("PERIOD_RATE"	,"�����\n(%)"		,"t_number" ,20.3  ,60  	,false); //9   

	GridObj4.AddHeader("BOX7100"			,"�Ⱦ���ǰ"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7200"			,"�ƻ���ǰ"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7300"			,"�ȼ���ǰ"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7400"			,"�ȼ�����"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7500"			,"���¹��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7600"			,"������ǰ"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7700"			,"�λ���ǰ"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX7800"			,"�����ǰ"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8000"			,"������ȹ"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8110"			,"������"     	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8120"			,"�źϺι��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8121"			,"ȭ�����"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8122"			,"�����ι��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8123"			,"�Ϻι��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8130"			,"���ι��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8140"			,"���ι��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8150"			,"��õ���"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8160"			,"��õ���"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8170"			,"������"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8310"			,"���ֹ��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8320"			,"��õ���"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8330"			,"�������"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8340"			,"���ʹ��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8350"			,"�¹���"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8410"			,"�������"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8420"			,"û�ֹ��"     	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8430"			,"ȫ�����"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8440"			,"���ֹ��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8510"			,"���ֹ��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8511"			,"���־�����"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8520"			,"��õ���"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8530"			,"���ֹ��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8540"			,"�س����"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8610"			,"�뱸���"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8620"			,"���ֹ��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8630"			,"�ȵ����"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8710"			,"�λ���"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8720"			,"�������"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8730"			,"â�����"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8740"			,"���ֹ��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8750"			,"�����"     	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8760"			,"���ֹ��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX1811"			,"���繰��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX1816"			,"������ġ��"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX1841"			,"��ϴɱ�"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8901"			,"�λ� CY"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8902"			,"���� CY"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8903"			,"��õ CY"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8904"			,"���ζ�C/S"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8905"			,"�̷����"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8906"			,"�μ�P&P"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8907"			,"�̷αװ���"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8908"			,"�׽�������"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8910"			,"�°���"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8911"			,"û������"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8912"			,"�ϳ�����"     	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8913"			,"����LOGI"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8914"			,"(��)����"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8915"			,"�������"    	,"t_number" ,20.3  ,60  ,false); //6   
	GridObj4.AddHeader("BOX8916"			,"����õ�"    	,"t_number" ,20.3  ,60  ,false); //6   

	GridObj4.BoundHeader();	
}

/*������������������������������������������������������������������������
  ����ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery4() {

	var GridObj4 		= document.WiseGrid4;
	var in_work_date	= document.frm.in_work_date.value ; 
	var sel_dw			= document.frm.sel_dw.value;  
	       
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin.ip_04020_GYR_information_list";

	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj4.SetParam("mode", "search");
	GridObj4.SetParam("in_work_date", in_work_date);
	GridObj4.SetParam("sel_dw", sel_dw);
	GridObj4.DoQuery(servlet_url);
   
	GridObj4.ClearGrid(); 
	setHeader4(GridObj4);  //�ش����� 

}

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery4() {
    
	var GridObj4 = document.WiseGrid4;
    var mode = GridObj4.GetParam("mode");
    var error_msg = '';

    if(mode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj4.GetStatus() == "true") 
        {                                                    
			// �÷� Grouping
	    	//GridObj4.SetGroupMerge("ITEM_ID,ITEM_NAME,TERM_VAL,GYR_RATE,GYR");
			// �÷� ����
			GridObj4.SetColFix('PERIOD_RATE');

		    //�÷�����
		    GridObj4.SetColCellAlign('ITEM_ID','center'); 
		    GridObj4.SetColCellAlign('GYR_RATE','center'); 
		    GridObj4.SetColCellAlign('GYR','center'); 
		    GridObj4.SetColCellAlign('PERIOD_DATE','center'); 
		    
		    GridObj4.SetNumberFormat('BOX7100','#,###'); 
		    GridObj4.SetNumberFormat('BOX7200','#,###'); 
		    GridObj4.SetNumberFormat('BOX7300','#,###'); 
		    GridObj4.SetNumberFormat('BOX7400','#,###'); 
		    GridObj4.SetNumberFormat('BOX7500','#,###'); 
		    GridObj4.SetNumberFormat('BOX7600','#,###'); 
		    GridObj4.SetNumberFormat('BOX7700','#,###'); 
		    GridObj4.SetNumberFormat('BOX7800','#,###'); 
		    GridObj4.SetNumberFormat('BOX8000','#,###'); 
		    GridObj4.SetNumberFormat('BOX8110','#,###'); 
		    GridObj4.SetNumberFormat('BOX8120','#,###'); 
		    GridObj4.SetNumberFormat('BOX8121','#,###'); 
		    GridObj4.SetNumberFormat('BOX8122','#,###'); 
		    GridObj4.SetNumberFormat('BOX8123','#,###'); 
		    GridObj4.SetNumberFormat('BOX8130','#,###'); 
		    GridObj4.SetNumberFormat('BOX8140','#,###'); 
		    GridObj4.SetNumberFormat('BOX8150','#,###'); 
		    GridObj4.SetNumberFormat('BOX8160','#,###'); 
		    GridObj4.SetNumberFormat('BOX8170','#,###'); 
		    GridObj4.SetNumberFormat('BOX8310','#,###'); 
		    GridObj4.SetNumberFormat('BOX8320','#,###'); 
		    GridObj4.SetNumberFormat('BOX8330','#,###'); 
		    GridObj4.SetNumberFormat('BOX8340','#,###'); 
		    GridObj4.SetNumberFormat('BOX8350','#,###'); 
		    GridObj4.SetNumberFormat('BOX8410','#,###'); 
		    GridObj4.SetNumberFormat('BOX8420','#,###'); 
		    GridObj4.SetNumberFormat('BOX8430','#,###'); 
		    GridObj4.SetNumberFormat('BOX8440','#,###'); 
		    GridObj4.SetNumberFormat('BOX8510','#,###'); 
		    GridObj4.SetNumberFormat('BOX8511','#,###'); 
		    GridObj4.SetNumberFormat('BOX8520','#,###'); 
		    GridObj4.SetNumberFormat('BOX8530','#,###'); 
		    GridObj4.SetNumberFormat('BOX8540','#,###'); 
		    GridObj4.SetNumberFormat('BOX8610','#,###'); 
		    GridObj4.SetNumberFormat('BOX8620','#,###'); 
		    GridObj4.SetNumberFormat('BOX8630','#,###'); 
		    GridObj4.SetNumberFormat('BOX8710','#,###'); 
		    GridObj4.SetNumberFormat('BOX8720','#,###'); 
		    GridObj4.SetNumberFormat('BOX8730','#,###'); 
		    GridObj4.SetNumberFormat('BOX8740','#,###'); 
		    GridObj4.SetNumberFormat('BOX8750','#,###'); 
		    GridObj4.SetNumberFormat('BOX8760','#,###'); 
		    GridObj4.SetNumberFormat('BOX1811','#,###'); 
		    GridObj4.SetNumberFormat('BOX1816','#,###'); 
		    GridObj4.SetNumberFormat('BOX1841','#,###'); 
		    GridObj4.SetNumberFormat('BOX8901','#,###'); 
		    GridObj4.SetNumberFormat('BOX8902','#,###'); 
		    GridObj4.SetNumberFormat('BOX8903','#,###'); 
		    GridObj4.SetNumberFormat('BOX8904','#,###'); 
		    GridObj4.SetNumberFormat('BOX8905','#,###'); 
		    GridObj4.SetNumberFormat('BOX8906','#,###'); 
		    GridObj4.SetNumberFormat('BOX8907','#,###'); 
		    GridObj4.SetNumberFormat('BOX8908','#,###'); 
		    GridObj4.SetNumberFormat('BOX8910','#,###'); 
		    GridObj4.SetNumberFormat('BOX8911','#,###'); 
		    GridObj4.SetNumberFormat('BOX8912','#,###'); 
		    GridObj4.SetNumberFormat('BOX8913','#,###'); 
		    GridObj4.SetNumberFormat('BOX8914','#,###'); 
		    GridObj4.SetNumberFormat('BOX8915','#,###'); 
		    GridObj4.SetNumberFormat('BOX8916','#,###'); 

		for(var i=0;i<GridObj4.GetRowCount();i++) {
				if(GridObj4.GetCellValue('GYR',i) == "G" || GridObj4.GetCellValue('GYR',i) == "GtoY"){  // GREEN
					GridObj4.SetCellBgColor('GYR', i, '0|255|0');
				}
				else if(GridObj4.GetCellValue('GYR',i) == "Y"){ // YELLOW
					GridObj4.SetCellBgColor('GYR', i, '255|255|0'); 
				}
				else // RED
					GridObj4.SetCellBgColor('GYR', i, '255|0|0'); 
			}

        } else	
        { 
            error_msg = GridObj4.GetMessage(); 
            alert(error_msg);			
        }
    }
    
}
    
       
// Grid ȭ�� resizing 
// tab_h : tab height ( ���� tab �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� tab ���̰� Ŀ�� ) 
// table_h : table height ( ���� table �� ���̰� �ƴ϶� window ���̿��� ���� ����, ���� �� ���� �������� ���� table ���̰� Ŀ�� ) 
function setGridAutoResize2( tab_h, table_h ){
	
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
	
	// ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
	// ==> ȭ���� ���̻� ��ҵ��� ���� 
	if( tabHeightValue < 1 ) 
		tabHeightValue = 1; 
	if( tableHeightValue < 1 ) 
		tableHeightValue = 1; 
	
	tabPage1.style.height = tabHeightValue + "px"; 
	tabPage2.style.height = tabHeightValue + "px"; 
	tabPage3.style.height = tabHeightValue + "px"; 
	tabPage4.style.height = tabHeightValue + "px"; 
	//tbMain.style.height = tableHeightValue + "px"; 
	document.grid.height = tableHeightValue + "px"; 
	document.grid2.height = tableHeightValue + "px"; 
	document.grid3.height = tableHeightValue + "px"; 
	//document.grid4.height = tableHeightValue + "px"; 
	document.WiseGrid4.height = tableHeightValue + "px"; 
	
} 

