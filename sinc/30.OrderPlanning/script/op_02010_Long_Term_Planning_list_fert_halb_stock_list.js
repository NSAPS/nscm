//## ���α׷�ID		:	ip_02050_Inventory_production_analysis_list_pop_new.js
//## ���α׷���		:	�������ռ� �����м� pop_up
//## ������          :	�ǿ��� 
//## ��������       	:	2009-07-16
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_03.xml.xml
//## ���� query file : query_sinc_10_inventoryPlanning_03.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2009-07-16  ������      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'op_02010_Long_Term_Planning_list_fert_halb_stock_list';
var GridObj ; 													// WiseGrid ��ü
var GridObj2 ; 													// WiseGrid ��ü
var GridObj3 ; 													// WiseGrid ��ü

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����
var colBg01 = '224|255|224';			//255|255|153
var colBg02 = '255|255|255';


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
        //if( search_menu.style.display == "none" ) 
        //{ 
            //tabHeightValue += Number(search_h); 
            //tableHeightValue += Number(search_h); 
        //} 
        
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

/*����������������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 							��
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.			��
  ����������������������������������������������������������������������������������������������������������������������������������������������*/
function init() { 
	GridObj = document.WiseGrid;
	setProperty(GridObj);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader(GridObj);  	//�ش����� 
}


/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex = false;				//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize         = 10; //Header Size 
    GridObj.strHDClickAction    = "sortsingle";
 	//GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
    
    GridObj.bStatusbarVisible = true;				// status bar visible ���¹� ���� 
 
}

/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        
       
	GridObj.AddHeader("CONS_ITEM_ID"	,"����ǰ ǰ���ȣ"	,"t_text" 	,20		,0  ,false); //0   
 	GridObj.AddHeader("CONS_ITEM_NAME"	,"����ǰ ǰ���"  	,"t_text" 	,100	,0 ,false); //0    
 	GridObj.AddHeader("PROD_ITEM_TYPE"	,"ǰ������"     	,"t_text" ,100.3	,60  ,false); //0   
 	GridObj.AddHeader("PROD_ITEM_ID"	,"��ǰ��ȣ"     	,"t_text" ,100.3	,80  ,false); //0
 	GridObj.AddHeader("PROD_ITEM_NAME"	,"ǰ���"     	,"t_text" ,100.3	,150  ,false); //0
 	GridObj.AddHeader("QTY_UOM"			,"�⺻\n����"    	,"t_text" 	,100	,60  ,false); //0
 	GridObj.AddHeader("STOCK_QTY"		,"�������"      	,"t_number" ,100.3	,70  ,false); //0   
 	GridObj.AddHeader("SALES_3WEEK"		,"3�����\n�Ǹ�"  ,"t_number" ,100.3	,70  ,false); //0   
 	GridObj.AddHeader("STOCK_DAY"		,"����ϼ�"      	,"t_number" ,100.3	,70  ,false); //0
 	GridObj.AddHeader("PROD_3MONTH"		,"3�������\n����"	,"t_number"	,100.3	,70  ,true); //0	
 	GridObj.AddHeader("PROD_1YEAR"		,"���⵿��\n����" 	,"t_number" ,100.3	,70  ,true); //0   
 	GridObj.AddHeader("PROD_PLAN"		,"���ֻ���\n��ȹ(EA)" 	,"t_number" ,100.3	,70  ,true); //0   


	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('PROD_ITEM_TYPE','center'); 
    GridObj.SetColCellAlign('PROD_ITEM_ID','center'); 
    GridObj.SetColCellAlign('QTY_UOM','center'); 

    GridObj.SetNumberFormat("STOCK_QTY"  , "#,##0.##");
    GridObj.SetNumberFormat("SALES_3WEEK"  , "#,##0.##");
    GridObj.SetNumberFormat("STOCK_DAY"  , "#,##0.##");
    GridObj.SetNumberFormat("PROD_3MONTH"  , "#,##0.##");
    GridObj.SetNumberFormat("PROD_1YEAR"  , "#,##0.##");
    GridObj.SetNumberFormat("PROD_PLAN"  , "#,##0.##");


	setDefault();        	//ȭ�� �⺻ ���� 
	 
	GoSearch(); //pop up â���� ������ �׸��� ���� ������ ���� GoSearch �� init �Ŀ� ����  %�߿�%

	
}

   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       doQuery();
   }

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc  
  ������������������������������������������������������������������������*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;

	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "search");
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

			// cell���� ����  : �԰������� �̷��� �׸�� cell���� = BLUE!!
			for(var i=0;i<GridObj.GetRowCount();i++) {
				if(GridObj.GetCellValue('PROD_ITEM_TYPE',i) == 'FERT' ){  // GREEN
					GridObj.SetCellBgColor('PROD_ITEM_TYPE'	, i, color_edit_col); //0-191-255
					GridObj.SetCellBgColor('PROD_ITEM_ID'	, i, color_edit_col); //0-191-255
					GridObj.SetCellBgColor('PROD_ITEM_NAME'	, i, color_edit_col); //0-191-255
				}
			}	        	               


                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }

	
}



function GridCellClick(strColumnKey, nRow){
	
	

	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {

	if(nRow == '0' || nRow == '1'|| nRow == '4'|| nRow == '5'|| nRow == '6' ){
		//alert("�������� ������ �Ұ����մϴ�");
		alert("�ش� Į���� �����Ҽ� �����ϴ�.");
		GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	
	cal_dw1()	
	
}



/*������������������������������������������������������������������������
  ��DW 1 �������� ����
  ������������������������������������������������������������������������*/
function cal_dw1() {
	
		
	var	hd_name;
	var start_idx	= 0;
	var last_idx	= 6;
	
	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var stock_dqy	= 0;
	var next_stock;
	
	var gy_base_stock	= 0; // ����������
	var gy_stock_day	= 0; // ���� ����ϼ�
	var gy_ipgo_qty		= 0; // ���� ���귮
	var gy_next_stock;
	
	var start_hd_name = 'DAY_00';
	
	hd_name = start_hd_name;
	hd_name_1 = start_hd_name.substr(0,5);
	hd_name_2 = start_hd_name.substr(5,6);

//alert(1000/14);
//alert(Math.round((1000/14)*10)/10);

//return;

		base_stock	= Number(GridObj.GetCellValue(start_hd_name, 0));
		chgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 2));
		ipgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 3));
		gy_ipgo_qty	= Number(GridObj.GetCellValue(start_hd_name, 4));
		stock_dqy	= Math.round((base_stock/chgo_qty)*10)/10;
		next_stock	= Math.round(base_stock - chgo_qty + ipgo_qty);
		
		//������� ����..
		gy_base_stock = Number(GridObj.GetCellValue(start_hd_name, 0));
		GridObj.SetCellValue(hd_name, 5,  gy_base_stock); 
		
		gy_stock_dqy		= Math.round((gy_base_stock/chgo_qty)*10)/10;
		gy_next_stock	= Math.round(gy_base_stock - chgo_qty + gy_ipgo_qty);
		

	for (i=0; i < 21 ; i++) {

		GridObj.SetCellValue(hd_name, 1,  stock_dqy);
		GridObj.SetCellValue(hd_name, 6,  gy_stock_dqy);
		
		hd_name_2 = Number(hd_name_2)+Number(1);

		if(i == 9){
			hd_name_1 =hd_name_1.substr(0,4);
		}else{

		}
		
		hd_name = hd_name_1+hd_name_2;

		if(i == 20){  // ������ 10 ���� ���� ���� ������ ������ ���� ��Ų��. 
			return; 
		}
		GridObj.SetCellValue(hd_name, 0,  next_stock);
		GridObj.SetCellValue(hd_name, 5,  gy_next_stock); //�������

		base_stock	= Number(GridObj.GetCellValue(hd_name, 0));
		chgo_qty	= Number(GridObj.GetCellValue(hd_name, 2));
		ipgo_qty	= Number(GridObj.GetCellValue(hd_name, 3));
		
		gy_base_stock	= Number(GridObj.GetCellValue(hd_name, 5));
		gy_ipgo_qty		= Number(GridObj.GetCellValue(hd_name, 4));
		
		
		if(chgo_qty == 0){
			stock_dqy	= 0;
			gy_stock_dqy= 0;			
		}else{
			stock_dqy	= Math.round((base_stock/chgo_qty)*10)/10;
			gy_stock_dqy= Math.round((gy_base_stock/chgo_qty)*10)/10;
		}
		
		next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
		gy_next_stock	= Math.round(gy_base_stock - chgo_qty + gy_ipgo_qty);
		
 
	}


}		

function enterCheck(){
	
	var key = event.keyCode;
	// TAB(9) or ENTER(13)
	if(event.keyCode == "13" ) {
		refresh("simul");		
	}else{
		
	}

}


// ���� Ŭ�� : �� �˾� ����ȸ - 3�����,1�����,3+1�����/2
function refresh(week_flag) {
	
	var item_id = document.frm.item_id.value;
	var	item_name = document.frm.item_name.value;
	var simul_data = document.frm.simul_data.value;
	var week_flag	= week_flag;

	//Simulation �� ��� simul_data �ʼ�
	if(week_flag == "simul") {
		if( simul_data == "" || simul_data == null || simul_data == "0") {
			alert("Simulation�� ���� �Է����ֽʽÿ�!"); 
			document.frm.simul_data.select();
			return;
		}
	}
	
	var service_url = "service.do?_moon_service=ip_02050_Inventory_production_analysis_list_pop_new";
	service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&week_flag=" + week_flag + "&simul_data=" + simul_data;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=350, top=200, left=200";
	//var newWin = window.open(service_url, "ip_02050_Inventory_production_analysis_list_pop", pop_win_style);
	var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}