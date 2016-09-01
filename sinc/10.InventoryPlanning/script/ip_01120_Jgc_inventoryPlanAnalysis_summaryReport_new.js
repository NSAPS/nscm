//## ���α׷�ID      : ip_01120_Jgc_inventoryPlanAnalysis_summaryReport_new.js
//## ���α׷���      : ���üȭ ǰ�� ��� ����Ʈ(�ű�)
//## ������          : �̰���
//## ��������        : 2015-01-30 ȭ����
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_03.xml
//## ���� query file : query_sinc_10_inventoryPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2015-01-30	�̰���		CREATE
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_01120_Jgc_inventoryPlanAnalysis_summaryReport_new';

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
	doQuery();
}   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
	
//	GridObj.SetColCellMerge('SALES_CAT02', true);
//	GridObj.SetColCellMerge('SALES_CAT03', true);
	
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
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	
	GridObj.AddHeader("DIVISION"	       ,"������"	    			,"t_text"      ,100	    ,100    ,false); //0
	GridObj.AddHeader("SALES_CAT03"	       ,"����׷�"				,"t_text"	   ,100	    ,90     ,false); //0
 	GridObj.AddHeader("STOCK"	           ,"���üȭ\n�߻����"		,"t_number"    ,100.3	,80     ,false); //0   
 	GridObj.AddHeader("SALES_PRE"	       ,"���ϰ�"	       			,"t_number"    ,100.3	,80   	,false); //0
 	GridObj.AddHeader("ISSUE"	    	   ,"�ϰ�"	    			,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("SELL_BOX_CUM"	   ,"����"	    			,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("REMAIN_STOCK"	   ,"���üȭ\n�ܿ����" 	 	,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("SELL_RATE"  		   ,"��������"				,"t_number"    ,100.3	,80     ,false); //0
 	GridObj.AddHeader("EXPECT_STOCK"  	   ,"�������\n����������"	,"t_number"    ,100.3	,90     ,false); //0
 	

	GridObj.BoundHeader();	

	GridObj.SetColCellAlign('DIVISION',       'center'); //�߰� : 2014-05-14
    GridObj.SetColCellAlign('SALES_CAT03',    'left');
    GridObj.SetColCellAlign('STOCK',       	  'right'); 
    GridObj.SetColCellAlign('SALES_PRE',      'right');
    GridObj.SetColCellAlign('ISSUE',          'right');
    GridObj.SetColCellAlign('SELL_BOX_CUM',   'right');
    GridObj.SetColCellAlign('REMAIN_STOCK',   'right');
    GridObj.SetColCellAlign('SELL_RATE',      'right');
    GridObj.SetColCellAlign('EXPECT_STOCK',   'right');
  
    GridObj.SetNumberFormat("STOCK",       		"###,###.#");
	GridObj.SetNumberFormat("SALES_PRE",    	"###,###.#");
	GridObj.SetNumberFormat("ISSUE",       		"###,###.#");
	GridObj.SetNumberFormat("SELL_BOX_CUM",     "###,###.#");
	GridObj.SetNumberFormat("REMAIN_STOCK",     "###,###.#");
	GridObj.SetNumberFormat("EXPECT_STOCK",     "###,###.#");
	


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
            	;
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

   function doQuery(){
   		
   		var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
   	
  		
  	    var start_date = document.frm.start_date.value.replace(/-/g,"");  	    
  	    var gubn		= document.frm.gubn.value;
  	   
  	   
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("gubn",   gubn);
	   GridObj.DoQuery(servlet_url);       
   }

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )

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


function GridSetMerge(){
		
		var rowCount = GridObj.GetRowCount();		
		if (rowCount == 0) return;
				
		GridObj.SetGroupMerge('DIVISION');
        GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'DIVISION', 'custom', 'STOCK,SALES_PRE,ISSUE,SELL_BOX_CUM,REMAIN_STOCK,SELL_RATE,EXPECT_STOCK'); 
         	   
         	   /* custom �Ұ迡 ���� �� �÷����� ���� - SUMMARY1 */
         	   
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','STOCK');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SALES_PRE');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','ISSUE');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','SELL_BOX_CUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','REMAIN_STOCK');
         	    GridObj.SetSummaryBarFunction('SUMMARY1','sum','EXPECT_STOCK');
         	   
         	    
         	    //GridObj.SetSummaryBarFunction('SUMMARY1','average','SELL_RATE');   
         	    //GridObj.SetSummaryBarFunction('SUMMARY1','average','TERM_VAL');   
         	    
         	    var rowcount = GridObj.GetMergeCount('DIVISION');   //�Ұ� �ε��� ���ϱ�
         	    for (var i=0; i<rowcount; i++){
         	    	
         	   	var SELL_BOX_CUM 		 = GridObj.GetSummaryBarValue('SUMMARY1','SELL_BOX_CUM',i,true).replace(/,/g,"");
         	    var STOCK = GridObj.GetSummaryBarValue('SUMMARY1','STOCK',i,true).replace(/,/g,"");         	    	
         	    	
         	    	/* ����� ���� ���� �߰� - �������� = ����/�߻���� */
         	    	GridObj.SetSummaryBarValue('SUMMARY1','SELL_RATE',i, Math.round((SELL_BOX_CUM/STOCK)*1000)/10 );
         	    	
          	    }
         	     
         	  	      	 	
	      	 	/* custom �Ұ迡 ���� �� �÷����� ���� - SUMMARY3 */
	      	 	
	      	 	GridObj.AddSummaryBar('SUMMARY3', '�հ�', 'summaryall','custom','STOCK,SALES_PRE,ISSUE,SELL_BOX_CUM,REMAIN_STOCK,SELL_RATE,EXPECT_STOCK');
    	        
    	        GridObj.SetSummaryBarFunction('SUMMARY3','sum','STOCK');
    	        GridObj.SetSummaryBarFunction('SUMMARY3','sum','SALES_PRE');
    	        GridObj.SetSummaryBarFunction('SUMMARY3','sum','ISSUE');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','SELL_BOX_CUM');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','REMAIN_STOCK');
         	    GridObj.SetSummaryBarFunction('SUMMARY3','sum','EXPECT_STOCK');
         	
         	   	var SELL_BOX_CUM 		 = GridObj.GetSummaryBarValue('SUMMARY3','SELL_BOX_CUM',i,true).replace(/,/g,"");
         	    var STOCK = GridObj.GetSummaryBarValue('SUMMARY3','STOCK',i,true).replace(/,/g,"");
        	    	
        	   
         	    GridObj.SetSummaryBarValue('SUMMARY3','SELL_RATE',i, Math.round((SELL_BOX_CUM/STOCK)*1000)/10 );
    	        
    	        GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
				GridObj.SetSummaryBarColor('SUMMARY3', '0|153|0', '152|251|152');
				 
}

