//## ���α׷�ID       	: rp_03010_supply_suitability_pop.js
//## ���α׷���       	: ���� ���ռ� ����(�˾�)
//## ������           	: �̰���
//## ��������         	: 2016-08-24 
//## ���� job file   	: job_sinc_40_replenishmentPlanning_05.xml.xml
//## ���� query file 	: query_sinc_40_replenishmentPlanning_05.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.1        2016-08-24   �̰���      CREATE  
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'rp_03010_supply_suitability_pop';

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
	
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj.nHDLineSize         = 10; //Header Size
    //GridObj.bHDMoving = true;		// �÷� ��� ��ġ �̵�
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
   
    //���õ� ���� ���ڻ� �����Ѵ�.
	GridObj.strSelectedCellFgColor = '0|0|0';
	GridObj.strSelectedCellBgColor = '232|232|255'; 	//Drag�� ���õ� ���� �������� ������ �� �ִ�
	GridObj.strActiveRowBgColor    = "232|245|213";     //���õ� ���� �������� �����Ѵ�.	
    GridObj.strHDClickAction 	   = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
    GridObj.strMouseWheelAction='page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
       
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {  
	  	
	  	GridObj.AddHeader("SALES_CAT03"	          	,"ǰ��"			,"t_text" 	   	,100	    ,80     ,false); //0   
		GridObj.AddHeader("ITEM_ID"	          		,"ǰ���ڵ�"		,"t_text" 	   	,100	    ,80     ,false); //0   
	 	GridObj.AddHeader("ITEM_NAME"	      		,"ǰ���"	        ,"t_text" 	   	,100	    ,180    ,false); //0
		GridObj.AddHeader("SALE_DATE"  				,"����"			,"t_text"    	,100		,80     ,false); //0
		GridObj.AddHeader("QTY"  					,"�Ǹŷ�"			,"t_number"    	,100.3		,80     ,false); //0
		GridObj.AddHeader("EVENT_GUBN"  			,"�̺�Ʈ ����"		,"t_text"    	,100		,80     ,false); //0
		GridObj.AddHeader("TXT"  					,"���� ä��"		,"t_text"    	,100		,100     ,false); //0
	
		GridObj.BoundHeader();
		
		GridObj.SetColCellAlign('ITEM_NAME',        	  		'left');
		GridObj.SetColCellAlign('EVENT_GUBN',        	  		'center');
	    GridObj.SetColCellAlign('SALE_DATE',        	  		'center');	
	    GridObj.SetColCellAlign('TXT',        	  				'left');	
	 	GridObj.SetNumberFormat("QTY",       					"###,###.#");
	 	
 		doQuery();
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
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
       var cnfm_date	    = document.frm.cnfm_date.value; 
	   var user_id			= document.frm._user_id.value;         
       var item_id	    	= document.frm.item_id.value;
       var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode",           	"search");
       GridObj.SetParam("cnfm_date",  		cnfm_date);
       GridObj.SetParam("item_id",       	item_id);
       GridObj.SetParam("user_id",  		user_id);	
         
	   GridObj.DoQuery(servlet_url);       
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

function GridCellDblClick(strColumnKey, nRow){
	
}

function HeaderClick(strColumnKey){
	
}

function GridChangeCell(strColumnKey, nRow, vtOldValue, vtNewValue){

}	


function GridSetMerge(){

	
	GridObj.SetGroupMerge('SALES_CAT03,ITEM_ID,ITEM_NAME,SALE_DATE,QTY,EVENT_GUBN');
    
    GridObj.AddSummaryBar('SUMMARY2', '�հ�', 'summaryall', 'sum', 'QTY' );
    	 		
	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', '152|251|152');
}

