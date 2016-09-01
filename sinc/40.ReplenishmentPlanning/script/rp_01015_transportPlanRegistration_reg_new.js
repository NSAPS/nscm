//############################################################
//## ���α׷�ID      : rp_01015_transportPlanRegistration_reg_new.vm
//## ���α׷���      : SCM�ֹ�������ȸ
//## ������          : ������
//## ��������        : 2009-10-13
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-10-13  ������      create
//##
//############################################################
// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
function getItemName(objBox) {
	
	if( objBox.value == "" || objBox.value == null ) {
		document.frm.item_name.value = "";
		return;
	}
	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 
		callback:function(arrList){
			// ��ġ�ϴ� ��ǰ ����
			if( arrList.length == 1 ) {
				objBox.value = arrList[0][0];
				document.frm.item_name.value = arrList[0][1];
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

// ��ǰ �˻� popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup â�� input box ǥ�� data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}
/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
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
        
        // ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
        // ==> ȭ���� ���̻� ��ҵ��� ���� 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = tableHeightValue + "px"; 
        
    }


/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'rp_01015_transportPlanRegistration_reg_new';
var GridObj ; 													// WiseGrid ��ü

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';

/*����������������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 							��
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.			��
  ����������������������������������������������������������������������������������������������������������������������������������������������*/
function init() { 
   
	GridObj = document.WiseGrid;
	
	setProperty(GridObj);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader(GridObj);  	//�ش����� 
	setDefault();        	//ȭ�� �⺻ ���� 

}
   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	GridObj.bUserContextMenu = true;				//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj.bRowSelectorVisible = true;        	//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�. 	


    GridObj.nHDLineSize         = 18; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'    
	
	
	
	// Header Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2; 	
	
    /* Context Menu ����� MENU �߰� */
    GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row �߰�");
    GridObj.AddUserContextMenuItem("MENU_CELL","MENU02","Row ����");
//    GridObj.AddUserContextMenuItem("MENU_CELL","MENU03","���� ���");

	
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

 	GridObj.AddHeader("ITEM_ID"			,"��ǰ�ڵ�"     	,"t_text" 	,100	,99  ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"��ǰ��"       	,"t_text" 	,500	,220  ,false); //0   
 	GridObj.AddHeader("PLT_QTY"			,"PLT"   		,"t_number"	,20.3	,99  ,false); //0   
 	GridObj.AddHeader("BOX_QTY"			,"BOX"    		,"t_number"	,20.3	,99  ,false); //0   
 	GridObj.AddHeader("EA_QTY"			,"EA"   		,"t_number"	,20.3	,99  ,false); //0   
 	GridObj.AddHeader("TRUCK_SEQ"		,"��������"		,"t_text" 	,500	,70 ,false); //0   
 	GridObj.AddHeader("BRAND_NO"		,"��ǥ��ȣ"       ,"t_text"	,20		,99  ,false); //0   

	GridObj.AddGroup("CUM_TOT", "��������");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("CUM_TOT", "PLT_QTY");
	GridObj.AppendHeader("CUM_TOT", "BOX_QTY");
	GridObj.AppendHeader("CUM_TOT", "EA_QTY");



	GridObj.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "����", "����", "����");

	
	
	GridObj.SetNumberFormat('PLT_QTY','#,##0.##'); 
	GridObj.SetNumberFormat('BOX_QTY','#,##0.##'); 
	GridObj.SetNumberFormat('EA_QTY','#,##0.##');
	
	GridObj.SetColCellAlign('TRUCK_SEQ','center'); 
	GridObj.SetColCellAlign('ITEM_ID','center'); 
	GridObj.SetColCellAlign('BRAND_NO','center'); 
	

	//Hidden �÷�
	//GridObj.SetColHide("CRUD",true);
       
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
       doQuery();
   }
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service) {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "CRUD");

}
      
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var version		= document.all.version.value;
       var seq   		= document.all.seq.value;
       var src_loc_sel  = document.all.src_loc_sel.value;
       var tgt_loc_sel  = document.all.tgt_loc_sel.value;
       var trans_start  = document.all.trans_start.value;
       var trans_end   	= document.all.trans_end.value;
       var truck_seq_sel= document.all.truck_seq_sel.value;
       var item_id		= document.all.item_id.value;
       var item_name	= document.all.item_name.value;
       
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("version", version);
       GridObj.SetParam("seq", seq);
       GridObj.SetParam("src_loc_sel", src_loc_sel);
       GridObj.SetParam("tgt_loc_sel", tgt_loc_sel);
       GridObj.SetParam("trans_start", trans_start);
       GridObj.SetParam("trans_end", trans_end);
       GridObj.SetParam("truck_seq_sel", truck_seq_sel);
       GridObj.SetParam("item_id", item_id);
       GridObj.SetParam("item_name", item_name);
 
       GridObj.DoQuery(servlet_url);
   }

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
    function GridEndQuery() 
    {
        var endMode = GridObj.GetParam("mode");
        var error_msg = '';
          
        if(endMode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {                           

			    //GridObj.SetColCellAlign('CNFM_DATE','center'); 

//			    GridObj.SetNumberFormat('REQT_BOX','#,##0.#'); 
			    
				// �հ�
				GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'QTY,EA_QTY,PLT_CUM'); 
				GridObj.SetSummaryBarColor('SUMMARY1', '0|0|0', '160|160|160'); 
				/* 
				for(var i=0;i<GridObj.GetRowCount();i++) {
				// cell���� ����
					if(GridObj.GetCellValue('SLIP_GUBN',i) == "Ÿ����" ){  // GREEN
						GridObj.SetCellBgColor('SLIP_GUBN', i, '0|255|0');
					}
					// �Ƿڹڽ����� �����ڽ��� ũ�� ����� ǥ���Ѵ�.
					if(strToNum(GridObj.GetCellValue('REQT_BOX',i)) > strToNum(GridObj.GetCellValue('SELL_BOX',i))) {
						GridObj.SetCellBgColor('SELL_BOX', i, '253|228|229');
						GridObj.SetCellFontBold('SELL_BOX', i, 'true'); // font ����  
					}
				}
				*/
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
			}
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

function GridCellDblClick(strColumnKey, nRow){
	var urlStr = "service.do?_moon_service=rp_01015_transportPlanRegistration_mod";
	//alert(data);
	var list = data.split("!%!");
	
	var brand_no = list[13];
	
	if( brand_no == "" || brand_no == null ) {  
	}else{
		//alert("Ȯ���� ��ǥ�� ������ �Ұ��� �մϴ�.");
		//return;		
	}
		
	var version	= document.frm.version.value;
	var seq		= document.frm.seq.value;
	
	urlStr += "&version=" 	+ version; // ������ �ڵ�
	urlStr += "&seq=" 	+ seq; // ������ �ڵ�

	urlStr += "&plan_type=" 	+ list[0]; // �÷�Ÿ��
	urlStr += "&trans_date=" 	+ list[2]; // ��������
	urlStr += "&truck_seq=" 	+ list[7]; // ��������
	urlStr += "&src_loc=" 		+ list[3]; // �����
	urlStr += "&tgt_loc=" 		+ list[5]; // �԰���
	urlStr += "&brand_no_temp="	+ list[13]; // �԰���


	urlStr += "&_moon_pagenumber=1&_moon_perpage=200"
	location.href = urlStr;	
	
}



function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
}



/*����������������������������������������������������������������������������������
  ���� �߰�/���� Fnc
  ����������������������������������������������������������������������������������*/
function rowInsDel(obj){
	var str = obj.value;
	var nRow = GridObj.GetActiveRowIndex();
	
	if( str == "�߰�" ){		// ROW �߰�
		if( nRow == "" || nRow == null) nRow = 0;
		insertRow( nRow );	
		// ����� ���� ���� �ٽ� ����
		setSrcLocBgColor();		
		// ���� ��� �ٽ� ��.
		calAllCum();
		// ��ȣ set
		setNo();
	}
	else if( str == "����" ){	// ROW ����
		
//		if( nRow != 0 && (nRow == "" || nRow == null) ) {
//			alert("������ ���� ������ �ֽʽÿ�.");
//			return;
//		}
		if(confirm("���� �Ͻðڽ��ϱ�?") == true){
			for( i = 0 ; i < GridObj.GetRowCount() ; i++ ){
				if( GridObj.GetCellValue("SELECTED", i) == "1" ){
					if(GridObj.GetCellValue("NO", i) != ""){
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
						//GridObj.DeleteRow(nRow, false); 		
					}else{
						//GridObj.DeleteRow(i);
						GridObj.SetCellValue("CRUD", i, "DE");
						GridObj.SetCellHiddenValue("CRUD", i, "D");
						GridObj.SetRowHide(i, true); 
					}
					
					if( delRowList == "" ){// ���� ����Ʈ�� Row Index �߰�
						delRowList += "" + i;
					}else{
						delRowList += "!%!" + i;
					}					
				}
			}
			// ����� ���� ���� �ٽ� ����
			setSrcLocBgColor();	
			// ���� ��� �ٽ� ��.
			calAllCum();
			// ��ȣ set
			setNo()
		}
	}
	
	saved = false;

};

function insertRow( nRow ){
	
	var rowCnt = GridObj.GetRowCount();
	
	if(rowCnt == null){
		rowCnt = 0;
	}
	//alert("rowCnt : " + rowCnt + " , nRow : " + nRow);//1,0
	if( (rowCnt > 1) && (rowCnt-1 == nRow) ){ // ���ڸ� ������ ��� 
		GridObj.InsertRow(-1);
	}else if(rowCnt <= 1){// 
		GridObj.InsertRow(0);
		nRow = -1;
	}
	else{
		GridObj.InsertRow(nRow+1);
	}
	
	// �⺻ ������ ����
	if(nRow == -1){
		GridObj.SetCellValue("RTE", 0, "");
		GridObj.SetCellValue("TRANS_DATE", 0, "");
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", 0, "");
		GridObj.SetCellValue("TRUCK_SEQ", 0, "");
		GridObj.SetCellValue("PLAN_TYPE", 0, "");	
	}else{
		GridObj.SetCellValue("RTE", nRow+1, GridObj.GetCellValue("RTE", nRow));
		GridObj.SetCellValue("TRANS_DATE", nRow+1, GridObj.GetCellValue("TRANS_DATE", nRow));
		GridObj.SetComboSelectedHiddenValue("SRC_LOC", nRow+1, GridObj.GetCellHiddenValue("SRC_LOC", nRow));
		GridObj.SetCellValue("TRUCK_SEQ", nRow+1, GridObj.GetCellValue("TRUCK_SEQ", nRow));
		GridObj.SetCellValue("PLAN_TYPE", nRow+1, GridObj.GetCellValue("PLAN_TYPE", nRow));
	}
	
	var	cnt = nRow+1;
	if( nRow == -1 ) nRow = 0;
	var pltSum = Number(GridObj.GetCellValue("CUM_PLT", nRow));
	var boxSum = Number(GridObj.GetCellValue("CUM_BOX", nRow));
	do{
		pltSum += Number(GridObj.GetCellValue("BASE_STK_PLT", cnt)) + Number(GridObj.GetCellValue("ADD_STK_PLT", cnt)) + Number(GridObj.GetCellValue("PROD_PLT", cnt))
		boxSum += Number(GridObj.GetCellValue("BASE_STK_BOX", cnt)) + Number(GridObj.GetCellValue("ADD_STK_BOX", cnt)) + Number(GridObj.GetCellValue("PROD_BOX", cnt))
		GridObj.SetCellValue("CUM_PLT", cnt, pltSum);
		GridObj.SetCellValue("CUM_BOX", cnt, Math.round(boxSum));
	}
	while( (GridObj.GetCellHiddenValue("CUM_PLT", cnt++) != "CUM") && (cnt < rowCnt));
};
