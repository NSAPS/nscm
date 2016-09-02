//############################################################
//## ���α׷�ID      : ip_03020_Gift_Set_list.vm
//## ���α׷���      	: ������Ʈ ��Ȳ
//## ������            	: �̰���
//## ��������        	: 2016-01-14 
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_08.xml
//## ���� query file : query_sinc_10_inventoryPlanning_08.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_03020_Gift_Set_list';

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

	//GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
	//GridObj.bHDMoving = true;		// �÷� ��� ��ġ �̵�

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

	GridObj.AddHeader("SALES_CAT02"	       	,"�Һз�"				,"t_text"	   	,100	    ,80     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	           	,"ǰ���ڵ�"			,"t_text" 	   	,100	    ,65     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	       	,"ǰ���"	        	,"t_text" 	   	,100	    ,220    ,false); //0
 	GridObj.AddHeader("SPEC"	    	   	,"�԰�"	    		,"t_text"  		,100		,90     ,false); //0
 	GridObj.AddHeader("GIFT_PLAN"	    	,"������Ʈ\n���ȹ"	,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("GIFT_PROD"	    	,"������Ʈ\n�����ȹ"	,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("PROD_CUM"	    	,"���ֻ���\n��������"	,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("PROD_REMN"	    	,"���ֻ���\n�ܷ�"	    ,"t_number"  	,100.3		,90     ,false); //0
 	GridObj.AddHeader("BASE_STOCK"	       	,"�������"			,"t_number"    	,100.3		,60     ,false); //0 	
 	GridObj.AddHeader("SALES_CUR"	       	,"�ϰ�"       		,"t_number" 	,100.3		,60     ,false); //0
    GridObj.AddHeader("SALES_SUM"	       	,"����"	    		,"t_number"    	,100.3		,60     ,false); //0
    GridObj.AddHeader("CHGO_CUM"	       	,"�����"			,"t_number"    	,100.3		,70     ,false); //0  
    GridObj.AddHeader("STOCK_EXPT"	       	,"�������"			,"t_number"    	,100.3		,70     ,false); //0  
    GridObj.AddHeader("CHGO_RATE"	   		,"�����"	    		,"t_text"    	,100		,60     ,false); //0
 	GridObj.AddHeader("CHGO_AMOUNT"       	,"��� ����"			,"t_number"    	,100.3   	,70     ,false); //0
 	GridObj.AddHeader("TOT_AMOUNT"   		,"�Ѱ�ȹ�ݾ�"			,"t_number"    	,100.3		,70     ,false); //0
 	GridObj.AddHeader("TOT_SALES"   		,"���Ǹűݾ�"			,"t_number"    	,100.3		,70     ,false); //0
 	GridObj.AddHeader("EXCEPT_SALES"   		,"��������\n�Ǹűݾ�"	,"t_number"    	,100.3		,70     ,false); //0
 	GridObj.AddHeader("COST_PER_BOX"   		,"�ڽ���\n�۾���"		,"t_number"    	,100.3		,70     ,false); //0
    GridObj.AddHeader("COST_PER_BOX_CUM"   	,"�ݳ� ��\n�۾���"		,"t_number"    	,100.3   	,70     ,false) //0
 	GridObj.AddHeader("SALES_CUM_YEAR"      ,"�ݳ�����\n����"	,"t_number"    	,100.3   	,70     ,false); //0	
	/* ������ ���� ���� �� */

	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 

	GridObj.SetColCellAlign('SALES_CAT02',        'left'); 
    GridObj.SetColCellAlign('ITEM_ID',            'left');
    GridObj.SetColCellAlign('ITEM_NAME',          'left');
    GridObj.SetColCellAlign('SPEC',               'left');
    GridObj.SetColCellAlign('CHGO_RATE',          'right');
    GridObj.SetNumberFormat("BASE_STOCK",       "###,###.#");
	GridObj.SetNumberFormat("SALES_CUR",       	"###,###.#");
	GridObj.SetNumberFormat("SALES_SUM",       	"###,###.#");
	GridObj.SetNumberFormat("GIFT_PLAN",       	"###,###.#");
	GridObj.SetNumberFormat("GIFT_PROD",       	"###,###.#");
	GridObj.SetNumberFormat("PROD_CUM",       	"###,###.#");
	GridObj.SetNumberFormat("PROD_REMN",       	"###,###.#");
	GridObj.SetNumberFormat("CHGO_CUM",       	"###,###.#");	
	GridObj.SetNumberFormat("STOCK_EXPT",       "###,###.#");	
	GridObj.SetNumberFormat("CHGO_AMOUNT",   	"###,###.#");
	GridObj.SetNumberFormat("TOT_AMOUNT",       "###,###.#");
	GridObj.SetNumberFormat("TOT_SALES",       	"###,###.#");
	GridObj.SetNumberFormat("EXCEPT_SALES",     "###,###.#");
	GridObj.SetNumberFormat("COST_PER_BOX",     "###,###.#");
	GridObj.SetNumberFormat("COST_PER_BOX_CUM", "###,###.#");
	GridObj.SetNumberFormat("SALES_CUM_YEAR",   "###,###.#");
	
	GridObj.SetColCellBgColor('GIFT_PLAN','255|253|208');
	
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
        else if( endMode =="doSave"){
            	
            	if(GridObj.GetStatus() == "true"){
            		GridSetMerge();
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
	
	//var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	
	var GridObj = document.WiseGrid;
	
	mode = "save";	

	doSave();	
	
};


      
// ����
function doSave() {
 
	var GridObj = document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode", "save");
	GridObj.SetParam("user_id", document.all._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	//GridObj.DoQuery(servlet_url, "CRUD");
	GridObj.DoQuery(servlet_url);
	
 	
 	return;
}    




/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var start_date	    = document.all.start_date.value;
       var end_date	        = document.all.end_date.value;
       start_date 			= start_date.replace(/-/g,"");
       end_date 			= end_date.replace(/-/g,"");
 
	   var user_id			= document.all._user_id.value;         	
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
     
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           "search");
       GridObj.SetParam("start_date",   start_date);
       GridObj.SetParam("end_date",       end_date);	 
	   GridObj.SetParam("user_id", 			user_id);

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

function GridCellDblClick(strColumnKey, nRow){

}


function GridSetMerge(){
	
	GridObj.SetGroupMerge('SALES_CAT02,ITEM_ID,ITEM_NAME,SPEC');	
	
    
    GridObj.AddSummaryBar('SUMMARY1', '�Ұ�', 'SALES_CAT02', 'sum', 'GIFT_PLAN,GIFT_PROD,PROD_CUM,PROD_REMN,BASE_STOCK,SALES_CUR,SALES_SUM,CHGO_CUM,STOCK_EXPT,CHGO_AMOUNT,'
    +'TOT_AMOUNT,TOT_SALES,EXCEPT_SALES,COST_PER_BOX,COST_PER_BOX_CUM,SALES_CUM_YEAR'); 
    GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'GIFT_PLAN,GIFT_PROD,PROD_CUM,PROD_REMN,BASE_STOCK,SALES_CUR,SALES_SUM,CHGO_CUM,STOCK_EXPT,CHGO_AMOUNT,'
    		+'TOT_AMOUNT,TOT_SALES,EXCEPT_SALES,COST_PER_BOX,COST_PER_BOX_CUM,SALES_CUM_YEAR'); 		
   
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', color_tot);    	 		
	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152'); 
}

