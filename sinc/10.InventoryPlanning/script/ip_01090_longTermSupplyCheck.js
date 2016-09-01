//## ���α׷�ID		:	ip_01090_longTermSupplyCheck.js
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
var job_id = 'ip_01090_longTermSupplyCheck';
var GridObj ; 													// WiseGrid ��ü
var GridObj2 ; 													// WiseGrid ��ü
var GridObj3 ; 													// WiseGrid ��ü
var GridObj4 ; 													// WiseGrid ��ü
var GridObj5 ; 													// WiseGrid ��ü
var GridObj6 ; 													// WiseGrid ��ü

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

function init2() {
	GridObj2 = document.WiseGrid2;
	setProperty(GridObj2);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader2(GridObj2);  	//�ش����� 
	setDefault2();        	//ȭ�� �⺻ ����
	//  
}   
function init3() {
	GridObj3 = document.WiseGrid3;
	setProperty(GridObj3);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader3(GridObj3);  	//�ش����� 
	setDefault3();        	//ȭ�� �⺻ ����
	//  
}      

function init4() { 
	GridObj4 = document.WiseGrid4;
	setProperty(GridObj4);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader4(GridObj4);  	//�ش�����
	setDefault4();        	//ȭ�� �⺻ ����
}


function init5() { 
	GridObj5 = document.WiseGrid5;
	setProperty(GridObj5);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader5(GridObj5);  	//�ش����� 
	setDefault5();        	//ȭ�� �⺻ ����
}

function init6() { 
	GridObj6 = document.WiseGrid6;
	setProperty(GridObj6);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader6(GridObj6);  	//�ش����� 
	setDefault6();        	//ȭ�� �⺻ ����
}


/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

    GridObj.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor = '0|0|0'; 
	GridObj.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   

	// Header Font Setting
	GridObj.strHDFontName = '���� ���';
	GridObj.nHDFontSize = 9;				  	// Font Size 9
	GridObj.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 1; 
    
    GridObj.bStatusbarVisible = true;				// status bar visible ���¹� ���� 
 
}

function setDefault2() { 

    GridObj2.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj2.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj2.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj2.strSelectedCellFgColor = '0|0|0'; 
	GridObj2.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   

	// Header Font Setting
	GridObj2.strHDFontName = '���� ���';
	GridObj2.nHDFontSize = 9;				  	// Font Size 9
	GridObj2.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines = 1; 
    
    GridObj2.bStatusbarVisible = true;				// status bar visible ���¹� ���� 
 
}
function setDefault3() { 

    GridObj3.nHDLineSize         = 26; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj3.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj3.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj3.strSelectedCellFgColor = '0|0|0'; 
	GridObj3.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   

	// Header Font Setting
	GridObj3.strHDFontName = '���� ���';
	GridObj3.nHDFontSize = 9;				  	// Font Size 9
	GridObj3.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj3.nHDLines = 1; 
    
    GridObj3.bStatusbarVisible = true;				// status bar visible ���¹� ���� 
 
}

function setDefault4() { 

	GridObj4.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj4.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj4.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj4.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj4.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj4.strSelectedCellFgColor = '0|0|0'; 
	GridObj4.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   
    GridObj4.bStatusbarVisible = false;				// status bar visible ���¹� ���� 

	// Header Font Setting
	GridObj4.strHDFontName = '���� ���';
	GridObj4.nHDFontSize = 9;				  	// Font Size 9
	GridObj4.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj4.nHDLines = 1;
    
     
}

function setDefault5() { 

	GridObj5.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj5.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj5.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj5.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj5.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj5.strSelectedCellFgColor = '0|0|0'; 
	GridObj5.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   
    GridObj5.bStatusbarVisible = false;				// status bar visible ���¹� ���� 

	// Header Font Setting
	GridObj5.strHDFontName = '���� ���';
	GridObj5.nHDFontSize = 9;				  	// Font Size 9
	GridObj5.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj5.nHDLines = 1; 
}


function setDefault6() { 

	GridObj6.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj6.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.

    GridObj6.nHDLineSize         = 19; //Header Size
    //GridObj.strHDClickAction    = "sortsingle";
 	GridObj6.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj6.strSelectedCellBgColor = '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj6.strSelectedCellFgColor = '0|0|0'; 
	GridObj6.strMouseWheelAction='page'; // page ���� scroll ->�⺻�� 'default'   
    GridObj6.bStatusbarVisible = false;				// status bar visible ���¹� ���� 

	// Header Font Setting
	GridObj6.strHDFontName = '���� ���';
	GridObj6.nHDFontSize = 9;				  	// Font Size 9
	GridObj6.bHDFontBold = true; 

    //����� ���μ��� �����Ѵ�. 
    GridObj6.nHDLines = 1; 
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        

  	GridObj.AddHeader("CNFM_DATE"		,"CNFM_DATE"    ,"t_text" 	,10			,0  ,false); //0   
  	GridObj.AddHeader("DAY"				,"��   ��"       	,"t_text" 	,400		,70 ,false); //0   
  	GridObj.AddHeader("HOLIDAY_FLAG"	,"HOLIDAY_FLAG" ,"t_text" 	,100		,0  ,false); //0   
  	GridObj.AddHeader("BASE_STOCK"		,"�������"     ,"t_number" ,100.3		,65 ,false); //0   
  	GridObj.AddHeader("IPGO"			,"���귮"       	,"t_number" ,100.3		,65 ,true); //0   
  	GridObj.AddHeader("CHGO"			,"�Ǹŷ�"      	,"t_number" ,100.3		,65 ,true); //0
  	GridObj.AddHeader("LAST_MONTH"		,"��������"      	,"t_number" ,100.3		,65 ,true); //0
  	GridObj.AddHeader("LAST_YEAR"		,"���⵿��"      	,"t_number" ,100.3		,65 ,true); //0
  	
  	GridObj.AddHeader("MM"				,"��"      		,"t_number" ,100.3		,0 ,true); //0
  	GridObj.AddHeader("WEEK_NO"			,"����"      	,"t_number" ,100.3		,0 ,true); //0
  	    
	 	    
	GridObj.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj.SetColCellAlign('DAY','center'); 
    
    GridObj.SetNumberFormat("BASE_STOCK"  , "#,##0");
    GridObj.SetNumberFormat("IPGO"  , "#,##0");
    GridObj.SetNumberFormat("CHGO"  , "#,##0");
    GridObj.SetNumberFormat("LAST_MONTH"  , "#,##0");
    GridObj.SetNumberFormat("LAST_YEAR"  , "#,##0");
			
	setDefault();        	//ȭ�� �⺻ ���� 
	GoSearch(); //pop up â���� ������ �׸��� ���� ������ ���� GoSearch �� init �Ŀ� ����  %�߿�%

}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader2(GridObj) {        

  	GridObj2.AddHeader("CNFM_DATE"		,"CNFM_DATE"    ,"t_text" 	,10			,0  ,false); //0   
  	GridObj2.AddHeader("DAY"			,"��   ��"       	,"t_text" 	,400		,68 ,false); //0   
  	GridObj2.AddHeader("HOLIDAY_FLAG"	,"HOLIDAY_FLAG" ,"t_text" 	,100		,0  ,false); //0   
  	GridObj2.AddHeader("BASE_STOCK"		,"�������"     ,"t_number" ,100.3		,68 ,false); //0   
  	GridObj2.AddHeader("IPGO"			,"���귮"       	,"t_number" ,100.3		,68 ,true); //0   
  	GridObj2.AddHeader("CHGO"			,"�Ǹŷ�"      	,"t_number" ,100.3		,68 ,true); //0
  	
  	GridObj2.AddHeader("CHGO_ORG"		,"�Ǹŷ�"      	,"t_number" ,100.3		,0 ,true); //0
	GridObj2.AddHeader("COUNT"			,"COUNT"      	,"t_number" ,100.3		,0 ,true); //0
  	GridObj2.AddHeader("MM"				,"��"      		,"t_number" ,100.3		,0 ,true); //0
  	GridObj2.AddHeader("WEEK_NO"		,"����"      	,"t_number" ,100.3		,0 ,true); //0
	 	    
	GridObj2.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj2.SetColCellAlign('DAY','center'); 
    
    GridObj2.SetNumberFormat("BASE_STOCK"  , "#,##0");
    GridObj2.SetNumberFormat("IPGO"  , "#,##0");
    GridObj2.SetNumberFormat("CHGO"  , "#,##0");
			
	setDefault2();        	//ȭ�� �⺻ ���� 
	//GoSearch2(); //pop up â���� ������ �׸��� ���� ������ ���� GoSearch �� init �Ŀ� ����  %�߿�%

}

       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader3(GridObj) {        

  	GridObj3.AddHeader("CNFM_DATE"		,"CNFM_DATE"    ,"t_text" 	,10			,0  ,false); //0   
  	GridObj3.AddHeader("DAY"			,"��   ��"       	,"t_text" 	,400		,68 ,false); //0   
  	GridObj3.AddHeader("HOLIDAY_FLAG"	,"HOLIDAY_FLAG" ,"t_text" 	,100		,0  ,false); //0   
  	GridObj3.AddHeader("BASE_STOCK"		,"�������"     ,"t_number" ,100.3		,68 ,false); //0   
  	GridObj3.AddHeader("IPGO"			,"���귮"       	,"t_number" ,100.3		,68 ,true); //0   
  	GridObj3.AddHeader("CHGO"			,"�Ǹŷ�"      	,"t_number" ,100.3		,68 ,true); //0     
  	
  	GridObj3.AddHeader("CHGO_ORG"		,"�Ǹŷ�"      	,"t_number" ,100.3		,0 ,true); //0
	GridObj3.AddHeader("COUNT"			,"COUNT"      	,"t_number" ,100.3		,0 ,true); //0
  	GridObj3.AddHeader("MM"				,"��"      		,"t_number" ,100.3		,0 ,true); //0
  	GridObj3.AddHeader("WEEK_NO"		,"����"      	,"t_number" ,100.3		,0 ,true); //0
	 	    
	GridObj3.BoundHeader();	

	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
	//GridObj.SetCRUDMode("CRUD", "AD", "UP", "DE");
	//GridObj.SetColHide("CRUD", true); 
	//GridObj.SetColHDCheckBoxVisible('SELECTED',true,true);
    //GridObj2.SetColCellAlign('DEL_RANK','right'); 
    GridObj3.SetColCellAlign('DAY','center'); 
    
    GridObj3.SetNumberFormat("BASE_STOCK"  , "#,##0");
    GridObj3.SetNumberFormat("IPGO"  , "#,##0");
    GridObj3.SetNumberFormat("CHGO"  , "#,##0");
			
	setDefault3();        	//ȭ�� �⺻ ���� 
	//GoSearch3(); //pop up â���� ������ �׸��� ���� ������ ���� GoSearch �� init �Ŀ� ����  %�߿�%

}


function setHeader4(GridObj4) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_header2",{
		callback:function(result){

		  	GridObj4.AddHeader("GUBN"	,"����"      	,"t_text" 	,100.3		,70  ,false); //0   
		  	GridObj4.AddHeader("AVG"	,"�Ⱓ���"      	,"t_number" ,100.3		,60  ,false); //0   

			for(var i=0 ; i < 31 ; i++){  //19
				if(i < result.length) {
					GridObj4.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 31) { //19
						GridObj4.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj4.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj4.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
 
    		//GridObj2.SetColCellAlign('GUBN','center'); 
    		
			GridObj4.SetNumberFormat("AVG"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_10"  , "#,##0");
			
			GridObj4.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_20"  , "#,##0");		

			GridObj4.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj4.SetNumberFormat("DAY_30"  , "#,##0");
			
			GridObj4.SetColFix('AVG'); 
							
		}
		
	});   

}

function setHeader5(GridObj5) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_header3",{
		callback:function(result){

		  	GridObj5.AddHeader("GUBN"	,"����"      	,"t_text" 	,100.3		,70  ,false); //0   
		  	GridObj5.AddHeader("AVG"	,"�Ⱓ���"      	,"t_number" ,100.3		,60  ,false); //0   

			for(var i=0 ; i < 61 ; i++){  //19
				if(i < result.length) {
					GridObj5.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 61) { //19
						GridObj5.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj5.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj5.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
 
    		GridObj5.SetColCellAlign('GUBN','center');
    		 
			GridObj5.SetNumberFormat("AVG"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_10"  , "#,##0");
 			GridObj5.SetNumberFormat("DAY_11"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_20"  , "#,##0"); 
			GridObj5.SetNumberFormat("DAY_21"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_22"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_23"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_24"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_25"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_26"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_27"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_28"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_29"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_30"  , "#,##0"); 			
                               
			GridObj5.SetNumberFormat("DAY_31"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_32"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_33"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_34"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_35"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_36"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_37"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_38"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_39"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_40"  , "#,##0");
 			GridObj5.SetNumberFormat("DAY_41"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_42"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_43"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_44"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_45"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_46"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_47"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_48"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_49"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_50"  , "#,##0"); 
			GridObj5.SetNumberFormat("DAY_51"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_52"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_53"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_54"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_55"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_56"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_57"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_58"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_59"  , "#,##0");
			GridObj5.SetNumberFormat("DAY_60"  , "#,##0");
			
 			GridObj5.SetColFix('AVG'); 
 
		}
	});   
}


function setHeader6(GridObj6) {        
       
	var header_length = 0, j;
	
	var item_id		= document.frm.item_id.value;
	
	commonUtil.getSelQeury( "item_id", item_id, "ip_02050_Inventory_production_analysis_list_pop_up_header4",{
		callback:function(result){

		  	GridObj6.AddHeader("GUBN"	,"����"      	,"t_text" 	,100.3		,70  ,false); //0   

			for(var i=0 ; i < 21 ; i++){  //19
				if(i < result.length) {
					GridObj6.AddHeader(result[i][1]	,result[i][0]       	,"t_number" 	,100.3	,71  ,false);    
				} 	
				else {
					j = strToNum(i)+strToNum(1);
					if(i < 21) { //19
						GridObj6.AddHeader(result[i][1]	,result[i][0]     	,"t_number" 	,100.3	,71  ,false);
					}
					else {
						GridObj6.AddHeader(result[i][1]	,result[i][0]       ,"t_number" 	,100.3	,71  ,false);
					}
				}
			}
			
			GridObj6.BoundHeader(); //AddHeader�� �Ϸ��� �� ����� �׸��忡 ���ε��Ѵ�. 
			
 
    		GridObj6.SetColCellAlign('GUBN','center');
    		 
			GridObj6.SetNumberFormat("DAY_00"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_01"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_02"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_03"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_04"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_05"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_06"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_07"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_08"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_09"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_10"  , "#,##0");

			GridObj6.SetNumberFormat("DAY_11"  , "#,##0");  
			GridObj6.SetNumberFormat("DAY_12"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_13"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_14"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_15"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_16"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_17"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_18"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_19"  , "#,##0");
			GridObj6.SetNumberFormat("DAY_20"  , "#,##0");
			
 
		}
	});   
}
   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       doQuery();
       //doQuery2();
       //doQuery3();
   }

/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch2(service) 
   {
   	//alert(service);
       //doQuery();
   }
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch3(service) 
   {
   	//alert(service);
       //doQuery();
   }



/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch4(service) 
   {
   	//alert("GoSearch");
   	//alert(service);
       //doQuery2();
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
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	//Simulation �� ��� simul_data �ʼ�
	//if(week_flag == "plan") {
		//GridObj.SetParam("mode", "search_plan");
	//}else{
	GridObj.SetParam("mode", "search");
	//}     
	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("item_id", item_id);
	GridObj.SetParam("week_flag", week_flag);
	GridObj.SetParam("simul_data", simul_data);
	GridObj.SetParam("sel_gubn", sel_gubn);
	GridObj.SetParam("division", division);
	GridObj.SetParam("cat03", cat03);
	   
	GridObj.DoQuery(servlet_url);
}
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj2 = document.WiseGrid2;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;

	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	GridObj2.SetParam("mode", "search2");
	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	//GridObj.SetParam("mode", "search3");
	GridObj2.SetParam("item_id", item_id);
	GridObj2.SetParam("week_flag", week_flag);
	GridObj2.SetParam("simul_data", simul_data);
	GridObj2.SetParam("sel_gubn", sel_gubn);
	GridObj2.SetParam("division", division);
	GridObj2.SetParam("cat03", cat03);	   
		   
	GridObj2.DoQuery(servlet_url);
}
   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery3() 
{
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj3 = document.WiseGrid3;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;

	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	//Simulation �� ��� simul_data �ʼ�
	GridObj3.SetParam("mode", "search3");
	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	//GridObj.SetParam("mode", "search3");
	GridObj3.SetParam("item_id", item_id);
	GridObj3.SetParam("week_flag", week_flag);
	GridObj3.SetParam("simul_data", simul_data);
	GridObj3.SetParam("sel_gubn", sel_gubn);
	GridObj3.SetParam("division", division);
	GridObj3.SetParam("cat03", cat03);	   
	   
	GridObj3.DoQuery(servlet_url);
}


/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery4() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj4 = document.WiseGrid4;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj4.SetParam("mode", "search4");
	GridObj4.SetParam("item_id", item_id);
	GridObj4.SetParam("week_flag", week_flag);
	GridObj4.SetParam("simul_data", simul_data);
	GridObj4.SetParam("sel_gubn", sel_gubn);
	GridObj4.SetParam("division", division);	   
	GridObj4.SetParam("cat03", cat03);	   
	GridObj4.DoQuery(servlet_url);
}
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery5() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj5 = document.WiseGrid5;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj5.SetParam("mode", "search5");
	GridObj5.SetParam("item_id", item_id);
	GridObj5.SetParam("week_flag", week_flag);
	GridObj5.SetParam("simul_data", simul_data);
	GridObj5.SetParam("sel_gubn", sel_gubn);
	GridObj5.SetParam("division", division);	   
	GridObj5.SetParam("cat03", cat03);	   
	GridObj5.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery6() 
{
	//alert(11);
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	GridObj6 = document.WiseGrid6;
	
	var item_id		= document.frm.item_id.value;
	var item_name	= document.frm.item_name.value;
	var week_flag	= document.frm.week_flag.value;
	var simul_data	= document.frm.simul_data.value;
	var sel_gubn	= document.frm.sel_gubn.value;
	var division	= document.frm.division.value;
	var cat03		= document.frm.cat03.value;

	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj6.SetParam("mode", "search6");
	GridObj6.SetParam("item_id", item_id);
	GridObj6.SetParam("week_flag", week_flag);
	GridObj6.SetParam("simul_data", simul_data);
	GridObj6.SetParam("sel_gubn", sel_gubn);
	GridObj6.SetParam("division", division);	   
	GridObj6.SetParam("cat03", cat03);	   
	GridObj6.DoQuery(servlet_url);
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
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell���� ����
				//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
				GridObj.SetCellBgColor('IPGO', i, color_edit_col);
				GridObj.SetCellBgColor('CHGO', i, color_edit_col);
			} 
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	cal_dw1()


	doQuery2()
	doQuery3()

}

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery2() 
{
    var endMode = GridObj2.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search2") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj2.GetStatus() == "true") 
        {                           
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj2.GetRowCount();i++) {
			// cell���� ����
				//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
				GridObj2.SetCellBgColor('IPGO', i, color_edit_col);
				GridObj2.SetCellBgColor('CHGO', i, color_edit_col);
			} 
                 
        } else    
        { 
            error_msg = GridObj2.GetMessage(); 
            alert(error_msg);            
		}
    }
    cal_dw2()

}

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery3() 
{
    var endMode = GridObj3.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search3") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj3.GetStatus() == "true") 
        {                           
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj3.GetRowCount();i++) {
			// cell���� ����
				//GridObj6.SetCellBgColor('PLANT	', i, '253|228|229');
				GridObj3.SetCellBgColor('IPGO', i, color_edit_col);
				GridObj3.SetCellBgColor('CHGO', i, color_edit_col);
			} 
                 
        } else    
        { 
            error_msg = GridObj3.GetMessage(); 
            alert(error_msg);            
		}
    }
    cal_dw3()
    
    //doQuery4()
	//doQuery5()
	//doQuery6()	
	doQuery4()
	doQuery5()
    
}



/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery_plan()  //�ǸŰ�ȹ ��ȸ�� main grid 
{
    var endMode = GridObj.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search_plan") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	cal_dw1()
	GridObj.SetCellBgColor('DAY_00', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_01', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_02', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_03', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_04', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_05', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_06', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_07', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_08', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_09', 2, color_edit_col);
	GridObj.SetCellBgColor('DAY_10', 2, color_edit_col);
	
	doQuery2()
	doQuery3()
}



/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery4() 
{
//alert("GridEndQuery2");
    var endMode = GridObj4.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search4") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj4.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj4.GetMessage(); 
            alert(error_msg);            
		}
    }
	//doQuery3()

}

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery5() 
{
//alert("GridEndQuery2");
    var endMode = GridObj5.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search5") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj5.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj5.GetMessage(); 
            alert(error_msg);            
		}
    }
	//cal_dw1()
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery6() 
{
//alert("GridEndQuery2");
    var endMode = GridObj6.GetParam("mode");	
    var error_msg = '';
      
    if(endMode == "search6") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj6.GetStatus() == "true") 
        {                           

                 
        } else    
        { 
            error_msg = GridObj6.GetMessage(); 
            alert(error_msg);            
		}
    }
	//cal_dw1()
}


function GridCellClick(strColumnKey, nRow){
	
	

	
}

function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	//if(strColumnKey == 'BASE_STOCK'){
		//alert("�������� ������ �Ұ����մϴ�");
		//alert("�ش� Į���� �����Ҽ� �����ϴ�.");
		//GridObj.SetCellValue(strColumnKey, nRow,  nOldValue);
	//}
	cal_dw1(nRow, strColumnKey)	
}

function Grid2ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	if(strColumnKey == 'BASE_STOCK'){
		//alert("�������� ������ �Ұ����մϴ�");
		alert("�ش� Į���� �����Ҽ� �����ϴ�.");
		GridObj2.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	cal_dw2(nRow, strColumnKey)	
}

function Grid3ChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {
	if(strColumnKey == 'BASE_STOCK'){
		//alert("�������� ������ �Ұ����մϴ�");
		alert("�ش� Į���� �����Ҽ� �����ϴ�.");
		GridObj3.SetCellValue(strColumnKey, nRow,  nOldValue);
	}
	cal_dw3(nRow, strColumnKey)	
}



/*������������������������������������������������������������������������
  ��DW 1 �������� ���� �ϰ� ����
  ������������������������������������������������������������������������*/
function cal_dw1(nRow, strColumnKey) { /* �ϰ� ���� */
	
	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var next_stock	= 0;
	var week_flag	= document.frm.week_flag.value;
	var holiday_flag; 		
	
		base_stock	= Number(GridObj.GetCellValue("BASE_STOCK", 0));
		ipgo_qty	= Number(GridObj.GetCellValue("IPGO", 0));
		chgo_qty	= Number(GridObj.GetCellValue("CHGO", 0));
		next_stock	= Math.round(base_stock - chgo_qty + ipgo_qty);
		
	/* RowCount �� ��ŭ ������ ��� */
	for(var i=1;i<GridObj.GetRowCount();i++){
		
		holiday_flag	=	GridObj.GetCellValue("HOLIDAY_FLAG", i)
		GridObj.SetCellValue("BASE_STOCK", i,  next_stock);

		base_stock	= Number(GridObj.GetCellValue("BASE_STOCK", i));
		ipgo_qty	= Number(GridObj.GetCellValue("IPGO", i));
		chgo_qty	= Number(GridObj.GetCellValue("CHGO", i));
		
		/* 
		 * �ʱ� chgo_qty �� ù���� �Ǹŷ��� ����ְ�
		 * ������ ������ 0�� �������� ���ϵ��� ������ ������ �̿��Ͽ� ä���ش�.
		 * 
		 * 1. holiday_flag =='Y' �̸� �Ǹŷ��� 0
		 * 2. ������ �ƴ϶�� ù���� �Ǹŷ��� �����ϰ� �������ش�.
		 * */
		if(chgo_qty == 0 ){
					
			if(holiday_flag =='Y'){
				chgo_qty	= 0;
				GridObj.SetCellValue("CHGO", i,  chgo_qty);	
			}else{
				chgo_qty	= Number(GridObj.GetCellValue("CHGO", 0));
				GridObj.SetCellValue("CHGO", i,  chgo_qty);
			}
					
		}else{
			
		}
		next_stock		= Math.round(base_stock - chgo_qty + ipgo_qty);
	}
	/* �ϰ� grid �� �Էµ� ���� �ֺ� �������� ����� �ְ� ȭ�鿡 �ݿ��Ѵ� */
	get_week_value(nRow, strColumnKey);	
}

/* �ϰ� grid �� �Էµ� ���� �ֺ� �������� ����� �ְ� ȭ�鿡 �ݿ��Ѵ� */
function get_week_value(nRow, strColumnKey){ 
	
	
	/* -ȭ�� �ʱ� ����ÿ��� nRow �� �ѿ����� ������ �������� �ʴ´�  */
	if(nRow != null){
		var inpt_value	= Number(GridObj.GetCellValue(strColumnKey, nRow));
		var sum_value = 0;
		var inpt_week_no= Number(GridObj.GetCellValue("WEEK_NO", nRow));
		var week_no;
	}else{
	}
	
	/* ������ ������ WEEK_NO �� ã�� �ش� Į���� ������ ����Ѵ� */
	for(var i=0;i<GridObj.GetRowCount();i++){
		dy_week_no= Number(GridObj.GetCellValue("WEEK_NO", i));
		
		if(dy_week_no == inpt_week_no ){ 
			sum_value = sum_value +  Number(GridObj.GetCellValue(strColumnKey, i));
		}else{
		}
	}

	if(nRow != null){
		//alert(inpt_week_no+"������ "+strColumnKey+ "�� �հ�� "+sum_value )

		/* �ϰ� �׸��忡�� �Էµ� ������ ������ ������ �ְ� �׸��忡�� ã�´�. */
		var w_week_no= Number(GridObj2.GetCellValue("WEEK_NO", 0));
		w_week_no = (Number(inpt_week_no) - Number(w_week_no)); 
		//alert("�ְ� �׸��� ù�ִ�.. "+w_week_no)
		//alert("�ְ� �׸�����  "+inpt_week_no+ "������ "+w_week_no+"��°ĭ!!")
		
		//alert(sum_value);
		GridObj2.SetCellValue(strColumnKey, w_week_no,  sum_value);
		cal_dw2(w_week_no, strColumnKey)
	}
}


/*������������������������������������������������������������������������
  ��DW 4 �������� ���� --�ְ�����
  ������������������������������������������������������������������������*/
function cal_dw2(nRow, strColumnKey) { //�ְ�
	
	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var next_stock	= 0;
	var holiday_flag;
	var count; 		
	
		base_stock	= Number(GridObj2.GetCellValue("BASE_STOCK", 0));
		ipgo_qty	= Number(GridObj2.GetCellValue("IPGO", 0));
		chgo_qty	= Number(GridObj2.GetCellValue("CHGO", 0));
		chgo_qty_org= Number(GridObj2.GetCellValue("CHGO_ORG", 0));
		count		= Number(GridObj2.GetCellValue("COUNT", 0));
		
		
	if(nRow == null){ /* ó�� ����ÿ��� �ǽ�*/
		GridObj2.SetCellValue("CHGO", 0,  chgo_qty_org*count);
		next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
	}else{
		next_stock	= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			
	}
		
	for(var i=1;i<GridObj2.GetRowCount();i++){


		if(nRow == null){ /* ó�� ����ÿ��� �ǽ�*/
			
			GridObj2.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj2.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj2.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
			
			if(chgo_qty == 0 ){
	
				chgo_qty	= Number(GridObj2.GetCellValue("CHGO", 0));
				count		= Number(GridObj2.GetCellValue("COUNT", i));
				
				GridObj2.SetCellValue("CHGO", i,  chgo_qty_org*count);
				next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
				
			}else{
				chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
				count		= Number(GridObj2.GetCellValue("COUNT", i));
				GridObj2.SetCellValue("CHGO", i,  chgo_qty);
				
				next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			}


		}else{

			GridObj2.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj2.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj2.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
			
			if(chgo_qty == 0 ){
	
				chgo_qty_org	= Number(GridObj2.GetCellValue("CHGO", 0));
				count			= Number(GridObj2.GetCellValue("COUNT", i));
				
				next_stock	= Math.round(base_stock - (chgo_qty) + ipgo_qty);	
				
			}else{
				chgo_qty	= Number(GridObj2.GetCellValue("CHGO", i));
				count		= Number(GridObj2.GetCellValue("COUNT", i));
				GridObj2.SetCellValue("CHGO", i,  chgo_qty);
				
				next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			}
	
		}

	}
	get_month_value(nRow, strColumnKey);	
	
}

/* �ְ� grid �� �Էµ� ���� ���� �������� ����Ѵ� */
function get_month_value(nRow, strColumnKey){ 
	

	if(nRow != null){
		var inpt_value	= Number(GridObj2.GetCellValue(strColumnKey, nRow));
		var sum_value	= 0;
		var inpt_mm_no	= Number(GridObj2.GetCellValue("MM", nRow));
		var mm_no;
	}

	for(var i=0;i<GridObj2.GetRowCount();i++){

		w_mm_no= Number(GridObj2.GetCellValue("MM", i));
		if(w_mm_no == inpt_mm_no ){ 
			sum_value = sum_value +  Number(GridObj2.GetCellValue(strColumnKey, i));
		}else{
			
		}
	}

	if(nRow != null){
		//alert(inpt_week_no+"������ "+strColumnKey+ "�� �հ�� "+sum_value )

		/* �ϰ� �׸��忡�� �Էµ� ������ ���Ͼ� ������ �ְ� �׸��忡�� ã�´�. */
		var w_mm_no= Number(GridObj3.GetCellValue("MM", 0));
		//alert("�ְ� �׸��� ù�ִ�.. "+w_week_no)
		
		w_mm_no = (Number(inpt_mm_no) - Number(w_mm_no)); 
		//alert("�ְ� �׸�����  "+inpt_week_no+ "������ "+w_week_no+"��°ĭ!!")
		
		GridObj3.SetCellValue(strColumnKey, w_mm_no,  sum_value);
		
		cal_dw3(nRow, strColumnKey)
	}
}



/*������������������������������������������������������������������������
  ��DW 1 �������� ����
  ������������������������������������������������������������������������*/
function cal_dw3(nRow, strColumnKey) {

	var base_stock	= 0;
	var chgo_qty	= 0;
	var ipgo_qty	= 0;
	var next_stock	= 0;
	var holiday_flag;
	var count; 		
	
		base_stock	= Number(GridObj3.GetCellValue("BASE_STOCK", 0));
		ipgo_qty	= Number(GridObj3.GetCellValue("IPGO", 0));
		chgo_qty	= Number(GridObj3.GetCellValue("CHGO", 0));
		chgo_qty_org= Number(GridObj3.GetCellValue("CHGO_ORG", 0));
		count		= Number(GridObj3.GetCellValue("COUNT", 0));
		
	if(nRow == null){ /* ó�� ����ÿ��� �ǽ�*/
		GridObj3.SetCellValue("CHGO", 0,  chgo_qty_org*count);
		next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
	}else{
		next_stock	= Math.round(base_stock - (chgo_qty) + ipgo_qty);
	}		

		
		
		
	for(var i=1;i<GridObj3.GetRowCount();i++){


		if(nRow == null){ /* ó�� ����ÿ��� �ǽ�*/
			
			GridObj3.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj3.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj3.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
			
			if(chgo_qty == 0 ){
	
				chgo_qty	= Number(GridObj3.GetCellValue("CHGO", 0));
				count		= Number(GridObj3.GetCellValue("COUNT", i));
				
				GridObj3.SetCellValue("CHGO", i,  chgo_qty_org*count);
				next_stock	= Math.round(base_stock - (chgo_qty_org*count) + ipgo_qty);
				
			}else{
				chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
				count		= Number(GridObj3.GetCellValue("COUNT", i));
				GridObj3.SetCellValue("CHGO", i,  chgo_qty);
				
				next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
			}


		}else{

			GridObj3.SetCellValue("BASE_STOCK", i,  next_stock);
	
			base_stock	= Number(GridObj3.GetCellValue("BASE_STOCK", i));
			ipgo_qty	= Number(GridObj3.GetCellValue("IPGO", i));
			chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
			
			chgo_qty	= Number(GridObj3.GetCellValue("CHGO", i));
			count		= Number(GridObj3.GetCellValue("COUNT", i));
			GridObj3.SetCellValue("CHGO", i,  chgo_qty);
			
			next_stock		= Math.round(base_stock - (chgo_qty) + ipgo_qty);
	
		}

	}
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
	var division	= document.frm.division.value;
	var cat03	= document.frm.cat03.value;
	var sel_gubn	= document.frm.sel_gubn.value;

	//Simulation �� ��� simul_data �ʼ�
	if(week_flag == "simul") {
		alert("���� ����!!!")
		return
		if( simul_data == "" || simul_data == null || simul_data == "0") {
			alert("Simulation�� ���� �Է����ֽʽÿ�!"); 
			document.frm.simul_data.select();
			return;
		}
	}

	var service_url = "service.do?_moon_service=ip_01090_longTermSupplyCheck";  
	service_url += "&selgubn=" + sel_gubn + "&division=" + division + "&week_flag=" + week_flag + "&item_id=" + item_id+ "&cat03=" + cat03;
	//service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&trans_start=" + trans_start + "&version=" + version + "&seq=" + seq;
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=700, top=200, left=200";
	var newWin = window.open(service_url, "ip_01090_longTermSupplyCheck", pop_win_style);
	//var newWin = window.open(service_url, "", pop_win_style);
	newWin.focus();		
	
}


