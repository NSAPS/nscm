/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_01100_monthly_Stock_Prod_Sales_analysis_list';
var GridObj ; 													// WiseGrid ��ü

var color_tot = '255|234|0';			//�հ� ���� ����
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

    GridObj.nHDLineSize         = 26; //Header Size
    GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'    
}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

   var search_flag  = document.all.search_flag.value;

if(search_flag=="DAILY"){
	GridObj.AddHeader("ITEM_ID"			,"ǰ���ڵ�"    	,"t_text" 	    ,100	,100  ,false); 
	GridObj.AddHeader("ITEM_NAME"		,"ǰ���"    		,"t_text" 	    ,100    ,130  ,false);
 	GridObj.AddHeader("SALE_DATE"		,"�Ǹ�����"       ,"t_text" 	    ,100	,150  ,false);    
 	GridObj.AddHeader("STOCK_QTY"		,"�������"       ,"t_number" 	,100	,120  ,false);    
 	GridObj.AddHeader("QTY1"	        ,"�Ϲ�"          ,"t_number" 	,100.3	,100  ,false);    
  	GridObj.AddHeader("QTY2"	        ,"Ÿ����"         ,"t_number" 	,100.3	,100  ,false); 
 	GridObj.AddHeader("PROD_QTY"		,"�������"       ,"t_number" 	,100	,120  ,false);   

    /* ���� �ش� �߰� */
	GridObj.AddGroup("HD1",    "�ǸŽ���");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD1",  "QTY1");
	GridObj.AppendHeader("HD1",  "QTY2");
	
	GridObj.BoundHeader();	
	
    GridObj.SetColCellAlign('ITEM_ID',		'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
    GridObj.SetColCellAlign('SALE_DATE',	'center'); 
    GridObj.SetColCellAlign('STOCK_QTY',	 'right'); 
    GridObj.SetColCellAlign('QTY1',	         'right');
    GridObj.SetColCellAlign('QTY2',	         'right');
    GridObj.SetColCellAlign('PROD_QTY',		 'right');     
     
    GridObj.SetNumberFormat('STOCK_QTY',   '#,##0.#');
    GridObj.SetNumberFormat('QTY1',        '#,##0.#');
    GridObj.SetNumberFormat('QTY2',        '#,##0.#');
    GridObj.SetNumberFormat('PROD_QTY',    '#,##0.#'); 
		
} else if(search_flag=="MONTH"){
	GridObj.AddHeader("ITEM_ID"			,"ǰ���ڵ�"    	,"t_text" 	    ,100	,100  ,false); 
	GridObj.AddHeader("ITEM_NAME"		,"ǰ���"    		,"t_text" 	    ,100    ,130  ,false);
 	GridObj.AddHeader("SALE_DATE"		,"�Ǹ�����"       ,"t_text" 	    ,100	,150  ,false);    
 	GridObj.AddHeader("QTY1"	        ,"�Ϲ�"          ,"t_number" 	,100.3	,100  ,false);    
  	GridObj.AddHeader("QTY2"	        ,"Ÿ����"         ,"t_number" 	,100.3	,100  ,false); 
 	GridObj.AddHeader("PROD_QTY"		,"�������"       ,"t_number" 	,100	,120  ,false);   

    /* ���� �ش� �߰� */
	GridObj.AddGroup("HD1",    "�ǸŽ���");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD1", "QTY1");
	GridObj.AppendHeader("HD1", "QTY2");
	
	GridObj.BoundHeader();	
	
    GridObj.SetColCellAlign('ITEM_ID',		'center'); 
    GridObj.SetColCellAlign('ITEM_NAME',	  'left'); 
    GridObj.SetColCellAlign('SALE_DATE',	'center'); 
 
    GridObj.SetColCellAlign('QTY1',	     'right');
    GridObj.SetColCellAlign('QTY2',	     'right');
    GridObj.SetColCellAlign('PROD_QTY',	 'right');     

    GridObj.SetNumberFormat('QTY1',     '#,##0.#');
    GridObj.SetNumberFormat('QTY2',     '#,##0.#');
    GridObj.SetNumberFormat('PROD_QTY', '#,##0.#'); 	
}

	//GridObj.SetCRUDMode("CRUD", "����", "����", "����");

	//Hidden �÷�
	//GridObj.SetColHide("CRUD",true);
       
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
    
     var search_flag  = document.all.search_flag.value;
     
     GridObj = document.WiseGrid;
	 GridObj.ClearGrid();
	 setHeader(GridObj);  
     
      if(search_flag=="DAILY"){
       doQuery();
   } else if(search_flag=="MONTH"){
   	   doQuery2();
   }
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

       var in_fr_date   = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var search_flag  = document.all.search_flag.value;
       var search_item  = document.frm.search_item.value;
       var itype  		= document.all.itype.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("in_fr_date", 	  in_fr_date);
       GridObj.SetParam("in_to_date", 	  in_to_date);
       GridObj.SetParam("search_flag", 	 search_flag);
       GridObj.SetParam("search_item",	 search_item);
       GridObj.SetParam("itype",	 	       itype);
       GridObj.DoQuery(servlet_url);
   }
   
   function doQuery2() 
   {
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

       var in_fr_date   = document.all.in_fr_date.value;
       var in_to_date   = document.all.in_to_date.value;
       var search_flag  = document.all.search_flag.value;
       var search_item  = document.frm.search_item.value;
       var itype  		= document.all.itype.value;

       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search2");
       GridObj.SetParam("in_fr_date", 	  in_fr_date);
       GridObj.SetParam("in_to_date", 	  in_to_date);
       GridObj.SetParam("search_flag", 	 search_flag);
       GridObj.SetParam("search_item",	 search_item);
       GridObj.SetParam("itype",	 	       itype);
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

				// �հ�
//	GridObj.AddSummaryBar('SUMMARY', '��ü�հ�', 'summaryall', 'sum', 'STOCK_QTY,SALE_QTY,PROD_QTY'); 
//	GridObj.SetSummaryBarColor('SUMMARY', '255|0|0', color_tot); 

                     
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

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	
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
    