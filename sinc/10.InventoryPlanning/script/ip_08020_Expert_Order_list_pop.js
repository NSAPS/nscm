//## ���α׷�ID		:	ip_08020_Expert_Order_list_pop.js
//## ���α׷���      	 : �ֹ����� �� 1������
//## ������            	 : �̰���
//## ��������        	 : 2016-03-23
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_08.xml
//## ���� query file : query_sinc_10_inventoryPlanning_08.xml
//##        
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//

/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_08020_Expert_Order_list_pop';
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
	
	   
    GridObj.AddHeader("ORDER_NO"		,"��ǥ��ȣ"		,"t_text" 	,100	,60  	,false); //0   
 	GridObj.AddHeader("CUST_CODE"		,"�ŷ�ó�ڵ�"  	,"t_text" 	,100	,70 	,false); //0    
 	GridObj.AddHeader("CUST_NAME"		,"�ŷ�ó��"    	,"t_text" 	,100	,180  	,false); //0   
 	GridObj.AddHeader("ITEM_ID"			,"��ǰ�ڵ�"  		,"t_text" 	,100	,70  	,false); //0
 	GridObj.AddHeader("ITEM_NAME"		,"��ǰ��"  		,"t_text" 	,100	,200  	,false); //0
 	GridObj.AddHeader("ORDER_QTY"		,"�ֹ���"    		,"t_number" ,100.3	,70  	,false); //0
 	GridObj.AddHeader("SHIP_DATE"		,"����������"  	,"t_text" 	,100	,70  	,false); //0
 	GridObj.AddHeader("SHIP_DATE2"		,"����Ȯ����"  	,"t_text" 	,100	,70  	,false); //0
 	GridObj.AddHeader("HAN_NAME"		,"�����"  		,"t_text" 	,100	,70  	,false); //0
	GridObj.AddHeader("GUBN"			,"��ŷ����\n��������"	,"t_text" 	,100	,70  	,false); //0  
	GridObj.AddHeader("ERDAT"			,"�Է�����"	,"t_text" 	,100	,70  	,false); //0 
	GridObj.AddHeader("ERZET"			,"�Է½ð�"	,"t_text" 	,100	,70  	,false); //0 
	GridObj.BoundHeader();		
	
	GridObj.SetColCellAlign('ORDER_NO',  	'center'); 
	GridObj.SetColCellAlign('HAN_NAME',  	'center'); 
	GridObj.SetColCellAlign('CUST_CODE',  	'center'); 
	GridObj.SetColCellAlign('ITEM_ID',  	'center'); 
	GridObj.SetColCellAlign('GUBN',  		'center');
	GridObj.SetColCellAlign('SHIP_DATE',  	'center');
	GridObj.SetColCellAlign('SHIP_DATE2',  	'center');
	GridObj.SetColCellAlign('ERDAT',  		'center');
	GridObj.SetColCellAlign('ERZET',  		'center');
	GridObj.SetNumberFormat("ORDER_QTY",			"###,###.#");
	
	GridObj.SetColCellBgColor('SHIP_DATE2','255|255|200');

	setDefault();        	//ȭ�� �⺻ ���� 	 
	GoSearch(); 			//pop up â���� ������ �׸��� ���� ������ ���� GoSearch �� init �Ŀ� ����  %�߿�%

	
}

   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
 
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
	var cnfm_date	= document.frm.cnfm_date.value;
	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "search");
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("item_name", item_name);
	GridObj.SetParam("cnfm_date", cnfm_date);
	   
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
			GridSetMerge();		

                   
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}







function GridSetMerge(){
	
	GridObj.SetGroupMerge('ORDER_NO,CUST_CODE,CUST_NAME');
    GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', 'ORDER_QTY'); 
         	   
 
    
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');  
         	   
}