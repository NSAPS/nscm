//## ���α׷�ID   : ip_08010_EDI_iput.js
//## ���α׷���       : EDI ���� �� �Է³��� ��ȸ
//## ������             : �̰���
//## ��������         : 2016-03-07
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_08.xml
//## ���� query file : query_sinc_10_inventoryPlanning_08.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-04-23  �̰���      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_08010_EDI_iput_list';

var GridObj ; 													// WiseGrid ��ü
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

        document.WiseGrid.height = tableHeightValue + "px"; 
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
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        	 //�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex 	= true;				 //Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize         = 10; 				 //Header Size
    GridObj.nHDLines 			= 2; 				 //����� ���μ��� �����Ѵ�.   
  
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; 	//Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj.strActiveRowBgColor    = "232|245|213";     //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction 	   = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction	   = 'page';
	
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("ROWNUM"	   		   ,"����"  			,"t_number"    	,100.3		,40     	,false); 
	GridObj.AddHeader("CNFM_DATE"	       ,"����"			,"t_text"	   	,100	    ,100      	,false); 
	GridObj.AddHeader("CUST_CODE"	       ,"�ŷ����ڵ�"		,"t_text"	   	,100	    ,0     		,false); 
 	GridObj.AddHeader("CUST_NAME"	       ,"�ŷ�����"		,"t_text" 	   	,100	    ,200     	,false);  
 	GridObj.AddHeader("PROD_CODE"	       ,"��ǰ�ڵ�"	    ,"t_text" 	   	,100	    ,80    	 	,false); 
 	GridObj.AddHeader("PROD_NAME"	       ,"��ǰ��"	    	,"t_text"  	   	,100		,200     	,false); 
 	GridObj.AddHeader("ODER_BOX"	       ,"����(BOX)"	    ,"t_number"  	,100.3		,80      	,false);
 	GridObj.AddHeader("IPUT_TIME"	       ,"�Է½ð�"	    ,"t_text"    	,100		,200     	,false); 
 	
 	 
	/* ������ ���� ���� �� */

	GridObj.BoundHeader();
	
	//GridObj.SetColFix('CUST_CODE'); 
	
	GridObj.SetColCellAlign('ROWNUM',       'center');
	GridObj.SetColCellAlign('CNFM_DATE',    'center');
	GridObj.SetColCellAlign('CUST_CODE',    'center'); 
    GridObj.SetColCellAlign('CUST_NAME',    'left');
    GridObj.SetColCellAlign('PROD_CODE',    'center');
    GridObj.SetColCellAlign('PROD_NAME',    'left');
    GridObj.SetColCellAlign('IPUT_TIME', 	'center');
    
    GridObj.SetNumberFormat("ODER_BOX",      "###,###.#");
	
	GridObj.SetColCellBgColor('ROWNUM','255|255|200');

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
            	
            	var row = GridObj.GetRowCount();            	
            	if (row == 0) return;
            		GridSetMerge();
            		
            	
            
             
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
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
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");      
       var search_item	    = document.all.search_item.value;              	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       var user_id			= document.all._user_id.value;
       
      //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",         "search"	);
       GridObj.SetParam("start_date",   start_date	);
       GridObj.SetParam("end_date",     end_date	);  
	   GridObj.SetParam("search_item", 	search_item	);
	   GridObj.SetParam("user_id", 		user_id		);	   
	   GridObj.DoQuery(servlet_url);       
   }


/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {
	
	}		

function GridCellDblClick(strColumnKey, nRow){


	}

/*Sort ���� ���� */

	var flag_item_id = '1';	
	var flag_item_name = '1';

	function HeaderClick(strColumnKey){
	
	GridObj.SetColCellSortEnable('ITEM_ID'			,true);
	GridObj.SetColCellSortEnable('ITEM_NAME'		,true);	
	


	
	GridObj.ClearGroupMerge();
	
	if(strColumnKey == 'ITEM_ID') {
		
		if(flag_item_id =='1'){
			
			GridObj.SetColCellSort('ITEM_ID','descending');
		
			flag_item_id++;
		}
		else if(flag_item_id =='2'){
			
			GridObj.SetColCellSort('ITEM_ID','asceding');
		
			flag_item_id--;
		}
	}
	
	GridObj.GridSetMerge();
	
		
}




function GridSetMerge(){	
				
}



