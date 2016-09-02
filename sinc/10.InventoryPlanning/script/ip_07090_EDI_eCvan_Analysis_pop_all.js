//## ���α׷�ID      : ip_07090_EDI_eCvan_Analysis_pop_all.js
//## ���α׷���      : edi ecvan �˾�
//## ��������        : �̰���
//## ��������        : 2015-07-20
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_04.xml
//## ���� query file : query_sinc_10_inventoryPlanning_04.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-07-20  �̰���      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_07090_EDI_eCvan_Analysis_pop_all';

var GridObj ; 	
var GridObj2 ;												// WiseGrid ��ü
var color_tot 		 = '234|234|234';			//�հ� ���� ����
var color_edit_col   = '255|253|208';
var color_sp 		 = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';			//���� ���� ���� 
var colBg01 		 = '224|255|224';			//255|255|153
var colBg02 	     = '255|255|255';


/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue   = window.innerWidth;
            maxHeightValue  = window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue    = document.body.clientWidth;
            maxHeightValue   = document.body.clientHeight;
        } 
        
        var tabHeightValue   = Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue = Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h = document.frm.search_h.value; 
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue   += Number(search_h); 
            tableHeightValue += Number(search_h);   
        } 
        
        // ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
        // ==> ȭ���� ���̻� ��ҵ��� ���� 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1;
          
        //tabPage1.style.height = tabHeightValue + "px"; 

        document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px"; 
        //document.WiseGrid2.height = tableHeightValue - document.WiseGrid.height + "px";
    }  

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

function init2() { 
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader2(GridObj2);  	//�ش����� 
	setDefault2();        	//ȭ�� �⺻ ���� 
	
}
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;  
   
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj.strActiveRowBgColor    = "232|245|213";    //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction 	   = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}

function setDefault2() { 

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj2.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj2.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines = 2;  
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj2.strSelectedCellFgColor = '0|0|0';
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj2.strActiveRowBgColor    = "232|245|213";    //���õ� ���� �������� �����Ѵ�.	
    GridObj2.strHDClickAction 	   = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj2.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj2.nCellFontSize = 9;					// Font Size 9
       
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {
	
	GridObj.AddHeader("CNFM_DATE"		,"����"			,"t_text"	,100	,80  ,false); //0   
	
 	GridObj.AddHeader("ITEM_ID"			,"ǰ���ڵ�"		,"t_text"	,100	,65 ,false); //0
 	GridObj.AddHeader("ITEM_NAME"		,"ǰ���"		,"t_text" 	,100	,170 ,false); //0    
 	GridObj.AddHeader("CUST_CODE"		,"�ŷ�ó�ڵ�"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("CUST_NAME"		,"�ŷ�ó��"		,"t_text" 	,100	,190  ,false); //0
 	GridObj.AddHeader("EDI_BOX"			,"���ַ�"		,"t_number" ,100.3	,50  ,false); //0
 	GridObj.AddHeader("SELL_BOX"		,"�Ǹŷ�"		,"t_number" ,100.3	,50  ,false); //0
 	GridObj.AddHeader("DEFAULT_BOX"		,"�̳���"		,"t_number" ,100.3	,50  ,false); //0
 	GridObj.AddHeader("DEFAULT_CODE_NS"	,"������"     	,"t_combo" 	,100	,120  ,true); //0   	
 	GridObj.AddHeader("DC_ID"			,"�������"		,"t_text" 	,100	,0  ,false); //0   
 	GridObj.AddHeader("DC_NAME"			,"�������"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj.AddHeader("DEPT_CODE"		,"���������ڵ�"	,"t_text" 	,100	,0  ,false); //0   
 	GridObj.AddHeader("DEPT_NAME"		,"��������"		,"t_text" 	,100	,100  ,false); //0   
 	GridObj.AddHeader("HAN_NAME"		,"�����"		,"t_text" 	,100	,50  ,false); //0  
 	GridObj.AddHeader("BIGO"			,"���"			,"t_text" 	,100	,140  ,false); //0   

	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('CNFM_DATE','center'); 
    
    GridObj.SetColCellAlign('ITEM_ID','center'); 
    
    GridObj.SetColCellAlign('DC_NAME','center');
    GridObj.SetColCellAlign('CUST_CODE','center');
    GridObj.SetColCellAlign('DEPT_NAME','center');
    GridObj.SetColCellAlign('HAN_NAME','center');
    GridObj.SetColCellAlign('BIGO','left');
	
	GridObj.SetNumberFormat("EDI_BOX",       	"###,###.#");
	GridObj.SetNumberFormat("SELL_BOX",       	"###,###.#");
	GridObj.SetNumberFormat("DEFAULT_BOX",      "###,###.#");
	GridObj.SetColCellBgColor('DEFAULT_CODE_NS',color_edit_col);

}

function setHeader2(GridObj2) {
	
	GridObj2.AddHeader("CNFM_DATE"		,"����"			,"t_text"	,100	,80  ,false); //0   
	
 	GridObj2.AddHeader("ITEM_ID"		,"ǰ���ڵ�"		,"t_text"	,100	,65 ,false); //0
 	GridObj2.AddHeader("ITEM_NAME"		,"ǰ���"			,"t_text" 	,100	,170 ,false); //0    
 	GridObj2.AddHeader("CUST_CODE"		,"�ŷ�ó�ڵ�"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj2.AddHeader("CUST_NAME"		,"�ŷ�ó��"		,"t_text" 	,100	,190  ,false); //0
 	GridObj2.AddHeader("EDI_BOX"		,"���ַ�"			,"t_number" ,100.3	,50  ,false); //0
 	GridObj2.AddHeader("SELL_BOX"		,"�Ǹŷ�"			,"t_number" ,100.3	,50  ,false); //0
 	GridObj2.AddHeader("DEFAULT_BOX"	,"�̳���"			,"t_number" ,100.3	,50  ,false); //0
 	GridObj2.AddHeader("DEFAULT_CODE_NS","������"     	,"t_combo" 	,100	,120  ,true); //0   	
 	GridObj2.AddHeader("DC_ID"			,"�������"		,"t_text" 	,100	,0  ,false); //0   
 	GridObj2.AddHeader("DC_NAME"		,"�������"		,"t_text" 	,100	,80  ,false); //0   
 	GridObj2.AddHeader("DEPT_CODE"		,"���������ڵ�"	,"t_text" 	,100	,0  ,false); //0   
 	GridObj2.AddHeader("DEPT_NAME"		,"��������"		,"t_text" 	,100	,100  ,false); //0   
 	GridObj2.AddHeader("HAN_NAME"		,"�����"			,"t_text" 	,100	,50  ,false); //0  
 	GridObj2.AddHeader("BIGO"			,"���"			,"t_text" 	,100	,140  ,false); //0   

	GridObj2.BoundHeader();	

    GridObj2.SetColCellAlign('CNFM_DATE','center'); 
    
    GridObj2.SetColCellAlign('ITEM_ID','center'); 
    
    GridObj2.SetColCellAlign('DC_NAME','center');
    GridObj2.SetColCellAlign('CUST_CODE','center');
    GridObj2.SetColCellAlign('DEPT_NAME','center');
    GridObj2.SetColCellAlign('HAN_NAME','center');
    GridObj2.SetColCellAlign('BIGO','left');
	
	GridObj2.SetNumberFormat("EDI_BOX",       	"###,###.#");
	GridObj2.SetNumberFormat("SELL_BOX",       	"###,###.#");
	GridObj2.SetNumberFormat("DEFAULT_BOX",      "###,###.#");
	GridObj2.SetColCellBgColor('DEFAULT_CODE_NS',color_edit_col);

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
	
	function GridEndQuery2() 
    {
    	
        var endMode = GridObj2.GetParam("mode2");
        var error_msg = '';
          
        if(endMode == "search2") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj2.GetStatus() == "true") 
            {   
            	
            	GridSetMerge2();
             
            } else    
            { 
            	
                error_msg = GridObj2.GetMessage(); 
                alert(error_msg);            
			}
        }
    
     
		
    }

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
    	
    	   doQuery();  
    	   doQuery2();  
   }

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ WD1 ����Ŭ��
  ������������������������������������������������������������������������*/
	function GoSave(service) {	
	
	};


/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {   		
   	   var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");     
       var end_date			= document.all.end_date.value.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");       
	   var user_id			= document.all._user_id.value;     
       var item_type		= document.all.item_type.value;
       var default_code_ns	= document.all.default_code_ns.value; 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
              	
      
      //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",   end_date);
       GridObj.SetParam("item_type",   item_type);
       GridObj.SetParam("default_code_ns", default_code_ns);
	 
	   GridObj.DoQuery(servlet_url);       
   }
	
 function doQuery2() 
   {   		
   	   var start_date	    = document.all.start_date.value;     
       start_date 			= start_date.replace(/-/g,"");     
       var end_date			= document.all.end_date.value.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");       
	   var user_id			= document.all._user_id.value;     
       var item_type		= document.all.item_type.value;
       var default_code_ns	= document.all.default_code_ns.value; 
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
              	
      
      //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj2.SetParam("mode",           "search2");
       GridObj2.SetParam("start_date",   start_date);
       GridObj2.SetParam("end_date",   end_date);
       GridObj2.SetParam("item_type",   item_type);
       GridObj2.SetParam("default_code_ns", default_code_ns);
	 
	   GridObj2.DoQuery(servlet_url);       
   }
	

	// �� ���� ��������
	var objTdG;


	// ��¥ �˻� POP BTN mouseOver
	function overBtn( objBtn ) {
		clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;	
	}

	// ��¥ �˻� POP BTN mouseOut
	function outBtn( objBtn ) {
		clickedDateIdx = null;	
	}

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
	function GridCellClick(strColumnKey, nRow) {
	
	}		

//	function GridCellDblClick(strColumnKey, nRow){	
//		
//		var item_id		= GridObj.GetCellValue('ITEM_ID',nRow)
//		var	item_name	= GridObj.GetCellValue('ITEM_NAME',nRow)
//		var cnfm_date	= document.frm.end_date.value;
//		
//		
//		if( strColumnKey == 'STOCK_EXPT'){
//			
//			var service_url = "service.do?_moon_service=ip_01140_inventoryPlanAnalysis_md_list_pop";
//			service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&cnfm_date=" + cnfm_date;  
//			var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=740, top=200, left=200";
//			var newWin = window.open(service_url, "", pop_win_style);
//			newWin.focus();		
//			
//		}	
//
//	}

function GridSetMerge(){
	
	var rowCount = GridObj.GetRowCount();		
		if (rowCount == 0) return;
     	 	
	   	GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'EDI_BOX,SELL_BOX,DEFAULT_BOX'); 
 		GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//���
				 
}

function GridSetMerge2(){
	
	var rowCount = GridObj2.GetRowCount();		
		if (rowCount == 0) return;
     	 	
	   	GridObj2.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'EDI_BOX,SELL_BOX,DEFAULT_BOX'); 
 		GridObj2.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');		//���
				 
}
