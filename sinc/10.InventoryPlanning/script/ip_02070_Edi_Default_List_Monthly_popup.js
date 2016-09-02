//## ���α׷�ID		:	ip_02070_Edi_Default_List_excel_reg_pop.js
//## ���α׷���		:	���뺻�� �̳� �м� ���� ���ε� 
//## ������          :	�ǿ��� 
//## ��������       	:	2011-02-16
//##
//## ���� job file   : ip_02070_Edi_Default_List_excel_reg_pop.xml.xml
//## ���� query file : ip_02070_Edi_Default_List_excel_reg_pop.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2011-02-16  �ǿ���      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_02070_Edi_Default_List_Monthly_popup';
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
	setDefault(GridObj);
}


/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

    GridObj.nHDLineSize         = 20; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";   
 	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   

   //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   

	// Header Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nHDFontSize = 10;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

 
}
     
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
	
	GridObj.AddHeader("CNFM_DATE"			,"����"       	,"t_text" 	,100    ,99  ,false);
 	GridObj.AddHeader("EDI_AMOUNT"			,"���ֱݾ�"		,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("EDI_AMOUNT_SUM"		,"���ֱݾ�\n����"	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("DEFAULT_AMOUNT"		,"�̳��ݾ�"		,"t_number" ,20.3	,90 ,false); //0   
 	GridObj.AddHeader("CUST_DEFAULT"		,"�ŷ�ó����"     ,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("NS_DEFAULT"			,"��ɹ̳�"     	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("NS_DEFAULT_SUM"		,"��ɹ̳�\n����" 	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("PENALTY_AMOUNT_3"	,"���Ƽ�ݾ�\n(3%)"  ,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("PENALTY_AMOUNT_5"	,"�г�Ƽ�ݾ�\n(5%)"  ,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("DEFAULT_RATE"		,"�̳���"     	,"t_number" ,20.3	,60  ,false); //0   
 	GridObj.AddHeader("DEFAULT_RATE_SUM"	,"�̳���\n����"   ,"t_number" ,20.3	,60  ,false); //0   
 	GridObj.AddHeader("KAL_DEFAULT"			,"�̷α׻�\n����"	,"t_number" ,20.3	,90  ,false); //0   
 	GridObj.AddHeader("MJ_DEFAULT"			,"��å\n��Ȯ��"	,"t_number" ,20.3	,90  ,false); //0   
	GridObj.BoundHeader();	

	GridObj.SetColFix('CNFM_DATE');

    GridObj.SetColCellAlign('CNFM_DATE','center'); 
    //GridObj.SetColCellAlign('CUST_STORE_CODE','center'); 
    //GridObj.SetColCellAlign('CUST_STORE_NAME','center');
    //GridObj.SetColCellAlign('CUST_ITEM_ID','center'); 
    //GridObj.SetColCellAlign('EDI_GUBN','center'); 



	//GridObj.SetCRUDMode("CRUD");  // AD�� DE�� ���� �� ���� ����.
	GridObj.SetNumberFormat("EDI_AMOUNT"  		, "#,##0.###");  
	GridObj.SetNumberFormat("EDI_AMOUNT_SUM"  	, "#,##0.###");  
	GridObj.SetNumberFormat("DEFAULT_AMOUNT"  	, "#,##0.###");  
	GridObj.SetNumberFormat("CUST_DEFAULT"  	, "#,##0.###");  
	GridObj.SetNumberFormat("NS_DEFAULT"  		, "#,##0.###");  
	GridObj.SetNumberFormat("NS_DEFAULT_SUM"  	, "#,##0.###");  
	GridObj.SetNumberFormat("PENALTY_AMOUNT_3"  , "#,##0.###");  
	GridObj.SetNumberFormat("PENALTY_AMOUNT_5"	, "#,##0.###");
	GridObj.SetNumberFormat("DEFAULT_RATE", "#,##0.###");
	GridObj.SetNumberFormat("DEFAULT_RATE_SUM", "#,##0.###");  
	GridObj.SetNumberFormat("KAL_DEFAULT", "#,##0.###");  
	

	//Hidden �÷�  
	//GridObj.SetColHide("CRUD",true);
	
	GoSearch(); 
}

   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
    doQuery();
   }

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj = document.WiseGrid;
	
	var cnfm_date	=document.frm.cnfm_date.value;

	//alert(cnfm_date);

	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("cnfm_date", cnfm_date);
	   
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
}

// ����
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
};

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() 
{
    var endMode = GridObj.GetParam("mode");
    var cnfm_date		= GridObj.GetCellValue("CNFM_DATE", 1);	
    var error_msg = '';
      
    if(endMode == "search"||endMode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {                           
                 cal_dw()
			GridObj.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'EDI_AMOUNT,DEFAULT_AMOUNT,CUST_DEFAULT,NS_DEFAULT,KAL_DEFAULT,PENALTY_AMOUNT_3,PENALTY_AMOUNT_5');
		  	GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot);                  
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else{

    }	

	
}
/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}	


/*������������������������������������������������������������������������
  ��DW  ����
  ������������������������������������������������������������������������*/
function cal_dw() {
	
	var i= 0; 
	 
	var edi_amount		= 0;
	var edi_amount_sum	= 0;
	var default_amount	= 0;
	var ns_default		= 0;
	var ns_default_sum	= 0;
    var default_rate	=0;
    var default_rate_sum=0;
    
    var penalty_amount_3	=0;
	var penalty_amount_5	=0;    
	
	
		edi_amount		= Number(GridObj.GetCellValue("EDI_AMOUNT", 0));
		edi_amount_sum	= Number(GridObj.GetCellValue("EDI_AMOUNT_SUM", 0));
		
		ns_default		= Number(GridObj.GetCellValue("NS_DEFAULT", 0));
		ns_default_sum	= Number(GridObj.GetCellValue("NS_DEFAULT_SUM", 0));
		
		default_rate	= Number(GridObj.GetCellValue("DEFAULT_RATE", 0));
		default_rate_sum= Number(GridObj.GetCellValue("DEFAULT_RATE_SUM", 0));
		
		edi_amount_sum	= edi_amount_sum+edi_amount;
		GridObj.SetCellValue("EDI_AMOUNT_SUM", i,  edi_amount_sum);
		
		ns_default_sum	= ns_default_sum+ns_default;
		GridObj.SetCellValue("NS_DEFAULT_SUM", i,  ns_default_sum);
		
		default_rate_sum = Math.round(((ns_default_sum/edi_amount_sum)*100)*10)/10;
		GridObj.SetCellValue("DEFAULT_RATE_SUM", i,  default_rate_sum);
		
		penalty_amount_3 = Math.round(ns_default*0.03);
		GridObj.SetCellValue("PENALTY_AMOUNT_3", i,  penalty_amount_3);
		
		penalty_amount_5 = Math.round(ns_default*0.05);
		GridObj.SetCellValue("PENALTY_AMOUNT_5", i,  penalty_amount_5);

		
	for(var i=1;i<GridObj.GetRowCount();i++){
		
		edi_amount		= Number(GridObj.GetCellValue("EDI_AMOUNT", i));
		edi_amount_sum	= edi_amount_sum+edi_amount;
		GridObj.SetCellValue("EDI_AMOUNT_SUM", i,  edi_amount_sum);	

		ns_default		= Number(GridObj.GetCellValue("NS_DEFAULT", i));
		ns_default_sum	= ns_default_sum+ns_default;
		GridObj.SetCellValue("NS_DEFAULT_SUM", i,  ns_default_sum);	

		default_rate_sum = Math.round(((ns_default_sum/edi_amount_sum)*100)*10)/10;
		GridObj.SetCellValue("DEFAULT_RATE_SUM", i,  default_rate_sum);

		penalty_amount_3 = Math.round(ns_default*0.03);
		GridObj.SetCellValue("PENALTY_AMOUNT_3", i,  penalty_amount_3);
		
		penalty_amount_5 = Math.round(ns_default*0.05);
		GridObj.SetCellValue("PENALTY_AMOUNT_5", i,  penalty_amount_5);


		//next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
	}
}
	
