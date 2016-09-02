//## ���α׷�ID		:	op_02090_Long_Term_Planning_list_mat_move_pop_up.js
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
var job_id = 'op_02090_Long_Term_Planning_list_mat_move_pop_up';
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
	
	
	var version = document.frm.version.value;
	
	var hd_text = new Array();
	var hd_name = 'MONTH_';
	  
    GridObj.AddHeader("GUBN"		,"����������"	,"t_text" 		,100	,100  	,false); //0   
	GridObj.AddHeader("MONTH_0"		,"MONTH_0"		,"t_number" 	,100.3	,80  	,false); //0   
 	GridObj.AddHeader("MONTH_1"		,"MONTH_1"  	,"t_number" 	,100.3	,80 	,false); //0    
 	GridObj.AddHeader("MONTH_2"		,"MONTH_2"    	,"t_number" 	,100.3	,80  	,false); //0   
 	GridObj.AddHeader("MONTH_3"		,"MONTH_3"  	,"t_number" 	,100.3	,80  	,false); //0
 	GridObj.AddHeader("MONTH_4"		,"MONTH_4"  	,"t_number" 	,100.3	,80  	,false); //0
 	GridObj.AddHeader("MONTH_5"		,"MONTH_5"    	,"t_number" 	,100.3	,80  	,false); //0
 	GridObj.AddHeader("MONTH_6"		,"MONTH_6"  	,"t_number" 	,100.3	,80  	,false); //0
 	GridObj.AddHeader("MONTH_7"		,"MONTH_7"  	,"t_number" 	,100.3	,80  	,false); //0
 	GridObj.AddHeader("MONTH_8"		,"MONTH_8" 		,"t_number" 	,100.3	,80  	,false); //0	
 	GridObj.AddHeader("MONTH_9"		,"MONTH_9"  	,"t_number" 	,100.3	,80  	,false); //0   
 	GridObj.AddHeader("MONTH_10"	,"MONTH_10"		,"t_number"		,100.3	,80  	,false); //0	
 	GridObj.AddHeader("MONTH_11"	,"MONTH_11" 	,"t_number" 	,100.3	,80  	,false); //0   


	
	GridObj.BoundHeader();	
	
	commonUtil.getSelQeury( "cnfm_date", version  , "op_02090_Long_Term_Planning_list_semi_dw4_header",{
	callback:function(result){
		
		for(i=0; i < 12; i++){
			
			var hd_text_name = hd_name + i;			
			GridObj.SetColHDText(hd_text_name,result[i][0]);
			
		}
			 
		}
	});  

	GridObj.SetColCellBgColor('GUBN',		color_edit_col);//�������
	
	GridObj.SetColCellAlign('GUBN',  'center');
	
	GridObj.SetNumberFormat("MONTH_0",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_1",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_2",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_3",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_4",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_5",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_6",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_7",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_8",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_9",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_10",			"###,###.#");
	GridObj.SetNumberFormat("MONTH_11",			"###,###.#");
	

	setDefault();        	//ȭ�� �⺻ ���� 
	 
	GoSearch(); //pop up â���� ������ �׸��� ���� ������ ���� GoSearch �� init �Ŀ� ����  %�߿�%

	
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
	var cnfm_date	= document.frm.version.value;
	

	
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
			//GridSetMerge();


                   
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
}







function GridSetMerge(){
	
	GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME');
    GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'custom', 'PR_QTY,PO_QTY,IPGO_QTY,PR_PO,PO_IPGO,TOTAL'); 
         	   
 	GridObj.SetSummaryBarFunction('SUMMARY1','sum','PR_QTY');
    GridObj.SetSummaryBarFunction('SUMMARY1','sum','PO_QTY'); 
    GridObj.SetSummaryBarFunction('SUMMARY1','sum','IPGO_QTY');
    GridObj.SetSummaryBarFunction('SUMMARY1','average','PR_PO');
    GridObj.SetSummaryBarFunction('SUMMARY1','average','PO_IPGO');
    GridObj.SetSummaryBarFunction('SUMMARY1','average','TOTAL');	 
    
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');  
         	   
         	   
         	   
         	   
         	   
         	   
         	   
         	   
         	   
}