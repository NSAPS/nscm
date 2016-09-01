//## ���α׷�ID		:	op_02010_Long_Term_Planning_list_PR_PO_term_pop_up.js
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
var job_id = 'op_02010_Long_Term_Planning_list_PR_PO_term_pop_up';
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
    //GridObj.strHDClickAction    = "sortsingle";
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
       
	GridObj.AddHeader("ITEM_ID"		,"ǰ��\n��ȣ"	,"t_text" 	,20		,0  	,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	,"ǰ���"  	,"t_text" 	,100	,0 		,false); //0    
 	GridObj.AddHeader("PR_DAY"		,"PR����"    ,"t_text" 	,100.3	,80  	,false); //0   
 	GridObj.AddHeader("PR_TERM"		,"PR\n�ֱ�"  ,"t_number" ,100.3	,0  	,false); //0
 	GridObj.AddHeader("PR_QTY"		,"PR\n����"  ,"t_number" ,100.3	,60  	,false); //0
 	GridObj.AddHeader("PO_DAY"		,"PO����"    ,"t_text" 	,100	,80  	,false); //0
 	GridObj.AddHeader("PO_TERM"		,"PO\n�ֱ�"  ,"t_number" ,100.3	,0  	,false); //0
 	GridObj.AddHeader("PO_QTY"		,"PO\n����"  ,"t_number" ,100.3	,80  	,false); //0
 	GridObj.AddHeader("LFDAT"		,"�԰��û��" ,"t_text" 	,100	,70  	,false); //0	SCM�� �ڰ濭 ����� ��û : 2013-07-05 �߰�
 	GridObj.AddHeader("IPGO_DAY"	,"�԰���"  	,"t_text" 	,100	,70  	,false); //0   
 	GridObj.AddHeader("IPGO_TERM"	,"�԰�\n�ֱ�"	,"t_number"	,100.3	,0  	,true); //0	
 	GridObj.AddHeader("IPGO_QTY"	,"�԰�" 	,"t_number" ,100.3	,70  	,true); //0   
 	GridObj.AddHeader("STATUS"		,"����" 		,"t_text" 	,100	,70  	,true); //0   
 	GridObj.AddHeader("PR_PO"		,"PR_PO" 	,"t_number" ,100.3	,70  	,true); //0   
 	GridObj.AddHeader("PO_IPGO"		,"PO_�԰�" 	,"t_number" ,100.3	,70  	,true); //0   
 	GridObj.AddHeader("TOTAL"		,"�Ѽҿ�" 	,"t_number" ,100.3	,70  	,true); //0   

	
	GridObj.BoundHeader();	

	 
    GridObj.SetColCellAlign('PR_DAY',	'center'); 
    GridObj.SetColCellAlign('PO_DAY',	'center'); 
    GridObj.SetColCellAlign('IPGO_DAY',	'center');
    GridObj.SetColCellAlign('LFDAT',	'center');  

    GridObj.SetNumberFormat("PR_QTY", 	"#,##0.##");
    GridObj.SetNumberFormat("PO_QTY", 	"#,##0.##");
    GridObj.SetNumberFormat("IPGO_QTY", "#,##0.##");
	

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
			
			cal_dw();
			var i = GridObj.GetRowCount()-1;
			GridObj.SetCellBgColor('ITEM_ID', 	i, color_tot);
		 	GridObj.SetCellBgColor('ITEM_NAME', i, color_tot);
		 	GridObj.SetCellBgColor('PR_DAY', 	i, color_tot);
		 	GridObj.SetCellBgColor('PR_TERM', 	i, color_tot);
		 	GridObj.SetCellBgColor('PR_QTY', 	i, color_tot);
		 	GridObj.SetCellBgColor('PO_DAY', 	i, color_tot);
		 	GridObj.SetCellBgColor('PO_TERM', 	i, color_tot);
		 	GridObj.SetCellBgColor('PO_QTY', 	i, color_tot);
		 	GridObj.SetCellBgColor('LFDAT', 	i, color_tot);
		 	GridObj.SetCellBgColor('IPGO_DAY', 	i, color_tot);
		 	GridObj.SetCellBgColor('IPGO_TERM', i, color_tot);
		 	GridObj.SetCellBgColor('IPGO_QTY', 	i, color_tot);
		 	GridObj.SetCellBgColor('STATUS', 	i, color_tot);
		 	GridObj.SetCellBgColor('PR_PO', 	i, color_tot);
		 	GridObj.SetCellBgColor('PO_IPGO', 	i, color_tot);
		 	GridObj.SetCellBgColor('TOTAL', 	i, color_tot);

                   
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
function cal_dw() {
	
	
	var i= 0; 
	 
	var pr_term		= 0;
	var pr_term_temp= 0; // ���ֱⰣ ����
	var pr_term_sum	= 0; // ���ֱⰣ ����
	var pr_term_sum_temp = 0;

	var po_term		= 0;
	var po_term_temp= 0; // ���ֱⰣ ����
	var po_term_sum	= 0; // ���ֱⰣ ����
	var po_term_sum_temp = 0;

	var ipgo_term		= 0;
	var ipgo_term_temp= 0; // ���ֱⰣ ����
	var ipgo_term_sum	= 0; // ���ֱⰣ ����
	var ipgo_term_sum_temp = 0;


	
	var pr_qty = 0;
	var po_qty = 0;
	var ipgo_qty = 0;
	var pr_qty_sum = 0;
	var po_qty_sum = 0;
	var ipgo_qty_sum = 0;
	
	var pr_po	= 0;
	var po_ipgo = 0;
	var total	= 0;
	var pr_po_sum	= 0;
	var po_ipgo_sum = 0;
	var total_sum	= 0;
	
		
		/* ���� */	
		pr_qty			= Number(GridObj.GetCellValue("PR_QTY", 0));
		pr_qty_sum		= pr_qty_sum + pr_qty;
		po_qty			= Number(GridObj.GetCellValue("PO_QTY", 0));
		po_qty_sum		= po_qty_sum + po_qty;
		
		/* �ҿ��ϼ� */	
		pr_po			= Number(GridObj.GetCellValue("PR_PO", 0));
		pr_po_sum		= pr_po_sum + pr_po;
		po_ipgo			= Number(GridObj.GetCellValue("PO_IPGO", 0));
		po_ipgo_sum		= po_ipgo_sum + po_ipgo;		
		total			= Number(GridObj.GetCellValue("TOTAL", 0));
		total_sum		= total_sum + total;		
	
		/* �Ⱓ */
		pr_term			= Number(GridObj.GetCellValue("PR_TERM", 0)); // 57
		pr_term_temp	= pr_term; 	// 57
		pr_term_sum_temp= pr_term_sum_temp + pr_term_sum; //0
		///////
		po_term			= Number(GridObj.GetCellValue("PO_TERM", 0)); // 57
		po_term_temp	= po_term; 	// 57
		po_term_sum_temp= po_term_sum_temp + po_term_sum; //0
		////////
		ipgo_term			= Number(GridObj.GetCellValue("IPGO_TERM", 0)); // 57
		ipgo_term_temp	= ipgo_term; 	// 57
		ipgo_term_sum_temp= ipgo_term_sum_temp + ipgo_term_sum; //0


		for(var i=1;i<GridObj.GetRowCount();i++){
			
			if(i == GridObj.GetRowCount()-1){ // ������ ��� row �� ���Ƿ� ������ row �̱� ������ ������ ����� �ѹ� ���ش�.
				
			}else{
				//alert("i="+i+", pr_term="+pr_term);
				pr_term		= Number(GridObj.GetCellValue("PR_TERM", i)); // �ι�° �ο�,, 22
				pr_term_sum		= pr_term_temp - pr_term;  // 57 - 22 = 35
				pr_term_temp	= pr_term; //22
				pr_term_sum_temp= pr_term_sum_temp + pr_term_sum;

				po_term		= Number(GridObj.GetCellValue("PR_TERM", i)); // �ι�° �ο�,, 22
				po_term_sum		= po_term_temp - po_term;  // 57 - 22 = 35
				po_term_temp	= po_term; //22
				po_term_sum_temp= po_term_sum_temp + po_term_sum;

				ipgo_term		= Number(GridObj.GetCellValue("IPGO_TERM", i)); // �ι�° �ο�,, 22
				ipgo_term_sum		= ipgo_term_temp - ipgo_term;  // 57 - 22 = 35
				ipgo_term_temp	= ipgo_term; //22
				ipgo_term_sum_temp= ipgo_term_sum_temp + ipgo_term_sum;
			}
	
			
			/* ���� */
			pr_qty			= Number(GridObj.GetCellValue("PR_QTY", i));
			pr_qty_sum		= pr_qty_sum + pr_qty;
			po_qty			= Number(GridObj.GetCellValue("PO_QTY", i));
			po_qty_sum		= po_qty_sum + po_qty;

			/* �ҿ��ϼ� */
			pr_po			= Number(GridObj.GetCellValue("PR_PO", i));
			pr_po_sum		= pr_po_sum + pr_po;
			po_ipgo			= Number(GridObj.GetCellValue("PO_IPGO", i));
			po_ipgo_sum		= po_ipgo_sum + po_ipgo;
			total			= Number(GridObj.GetCellValue("TOTAL", i));
			total_sum		= total_sum + total;		
	
		}
	
	//alert("count="+count);
	var row = GridObj.GetRowCount()-1 ;
	GridObj.SetCellValue("PR_DAY", row,  Math.round(pr_term_sum_temp/(row-1)));
	GridObj.SetCellValue("PO_DAY", row,  Math.round(po_term_sum_temp/(row-1)));
	//GridObj.SetCellValue("IPGO_DAY", row,  Math.round(ipgo_term_sum_temp/(row-1)));
	
	GridObj.SetCellValue("PR_QTY", row,  Math.round(pr_qty_sum/row));
	GridObj.SetCellValue("PO_QTY", row,  Math.round(po_qty_sum/row));
	
	GridObj.SetCellValue("PR_PO", row,  Math.round(pr_po_sum/row));
	GridObj.SetCellValue("PO_IPGO", row,  Math.round(po_ipgo_sum/row));
	GridObj.SetCellValue("TOTAL", row,  Math.round(total_sum/row));
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