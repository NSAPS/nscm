//## ���α׷�ID      : op_02090_Long_Term_Planning_semi_list.vm
//## ���α׷���      : ����� ���̽� ���� ��ȹ
//## ������          : �̰���
//## ��������        : 2015-07-28
//##
//## ���� job file   : job_sinc_30_orderPlanning_03.xml
//## ���� query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2015-07-28  �̰���      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'op_02090_Long_Term_Planning_semi_list';
var GridObj ; 													// WiseGrid ��ü
var GridObj2;
var GridObj3;

var color_tot = '234|234|234';			//�հ� ���� ����
var color_edit_col = '255|253|208';
var color_sp = '230|222|230'; 			//�÷� ���м� ����
var color_select_row = '141|232|141';	//���� ���� ����


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
        
        
        document.WiseGrid2.height = tabHeightValue - document.WiseGrid.height+ "px";
        
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

function init3() {
	GridObj3 = document.WiseGrid3;
	setProperty(GridObj3);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader3(GridObj3);  	//�ش����� 
	setDefault3();        	//ȭ�� �⺻ ���� 
} 
function init4() {
	GridObj4 = document.WiseGrid4;
	setProperty(GridObj4);	//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setHeader4(GridObj4);  	//�ش����� 
	setDefault4();        	//ȭ�� �⺻ ���� 
}

   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	//GridObj.bUserContextMenu 	= true;					//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex	= true;					//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
    
   
   
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor	= '0|0|0';
    GridObj.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor		= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strHDClickAction		= "sortsingle";   	//�ڵ� sort ���
    
	// Cell Font Setting
	GridObj.nCellFontSize			= 9;					// Font Size 9
	
	///* Context Menu ����� MENU �߰� */
    //GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row �߰�");   
	
    
}
function setDefault2() { 	
 
	GridObj2.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj2.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj2.nHDLineSize			= 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj2.nHDLines				= 2;        
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj2.strSelectedCellFgColor	= '0|0|0';
    GridObj2.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj2.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	//GridObj2.strHDClickAction		= "sortsingle";   	//�ڵ� sort ���
    

	
	GridObj2.nCellFontSize			= 9;					// Font Size 9
	//GridObj2.bStatusbarVisible		= true;				// status bar visible ���¹� ���� 

}

function setDefault3() { 

	//GridObj.bUserContextMenu 	= true;					//����� ���ؽ�Ʈ �޴��� ��� ���θ� �����Ѵ�. 
	GridObj3.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj3.bRowSelectorIndex	= true;					//Row Selector ������ Row Index�� �����ش�.
    GridObj3.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj3.nHDLines = 2;   
    
   
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj3.strSelectedCellFgColor	= '0|0|0';
    GridObj3.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj3.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj3.strHDClickAction		= "sortsingle";   	//�ڵ� sort ���
    
	// Cell Font Setting
	GridObj3.nCellFontSize			= 9;					// Font Size 9
	
	///* Context Menu ����� MENU �߰� */
    //GridObj.AddUserContextMenuItem("MENU_CELL","MENU01","Row �߰�");   
	
}   
function setDefault4() { 

	GridObj4.bRowSelectorVisible	= false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj4.bRowSelectorIndex		= true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj4.nHDLineSize			= 12; //Header Size
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj4.strSelectedCellFgColor = '180|82|205';
    GridObj4.strHDClickAction		= "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj4.strActiveRowBgColor	= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj4.nCellFontSize			= 9;					// Font Size 9
	GridObj4.bStatusbarVisible		= true;				// status bar visible ���¹� ����
	GridObj4.strHDClickAction		= "sortsingle";
}
    
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) { 
		
	  	GridObj.AddHeader("ITEM_ID"				,"ǰ���ȣ"       	,"t_text" 		,20		,80  ,false); //0   
	 	GridObj.AddHeader("ITEM_NAME"			,"ǰ���"      		,"t_text" 		,100	,200 ,false); //0 
	 	GridObj.AddHeader("SPEC"				,"�԰�"      		,"t_text" 		,100	,100 ,false); //0 
	 	
	 	GridObj.AddHeader("PROD_0"				,"M"      			,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_1"				,"M+1"      		,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_2"				,"M+2"      		,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_3"				,"M+3"      		,"t_number" 	,100.3	,80 ,true); 
	 	GridObj.AddHeader("PROD_4"				,"M+4"      		,"t_number" 	,100.3	,80 ,true);  
	 	GridObj.AddHeader("PROD_5"				,"M+5"      		,"t_number" 	,100.3	,80 ,true);  

	 	GridObj.AddGroup	("PROD_PLAN",   "�����ȹ");			
		GridObj.AppendHeader("PROD_PLAN", 	"PROD_0");
		GridObj.AppendHeader("PROD_PLAN", 	"PROD_1");
		GridObj.AppendHeader("PROD_PLAN", 	"PROD_2");
		GridObj.AppendHeader("PROD_PLAN",   "PROD_3");
		GridObj.AppendHeader("PROD_PLAN",   "PROD_4");
		GridObj.AppendHeader("PROD_PLAN",   "PROD_5");
	 	
	
		GridObj.BoundHeader();	
	
	    
	    GridObj.SetColCellAlign('ITEM_ID',  'center'); 
	    GridObj.SetColCellAlign('ITEM_NAME',  'left'); 
	    GridObj.SetColCellAlign('SPEC',   'left');
	
		GridObj.SetColFix('SPEC');
	
		//GridObj.SetColCellBgColor('SEL_DMD',		color_edit_col);//�������
	
	    GridObj.SetNumberFormat("PROD_0",			"#,##0");
	    GridObj.SetNumberFormat("PROD_1",			"#,##0");
	    GridObj.SetNumberFormat("PROD_2",			"#,##0");
	    GridObj.SetNumberFormat("PROD_3",			"#,##0");
	    GridObj.SetNumberFormat("PROD_4",			"#,##0");
	    GridObj.SetNumberFormat("PROD_5",			"#,##0");
	
	

}

function setHeader2(GridObj2) { 
		
		GridObj2.AddHeader("SELECTED"	,""   		,"t_checkbox"	,2			,30  ,true); //0
		GridObj2.AddHeader("ITEM_ID"	,"ǰ���ȣ"  	,"t_text" 		,10			,80  ,false); //0   
	  	GridObj2.AddHeader("ITEM_NAME"	,"ǰ���"    	,"t_text" 		,100		,200  ,false); //0 
	  	GridObj2.AddHeader("IDX"		,"����"      ,"t_number" 	,100.3		,0  ,false); //0    
	  	GridObj2.AddHeader("GUBN"		,"����"      ,"t_text" 		,100		,60  ,false); //0
	  	
	  	GridObj2.AddHeader("PROD_0"				,"M"      			,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_1"				,"M+1"      		,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_2"				,"M+2"      		,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_3"				,"M+3"      		,"t_number" 	,100.3	,70 ,true); 
	 	GridObj2.AddHeader("PROD_4"				,"M+4"      		,"t_number" 	,100.3	,70 ,true);  
	 	GridObj2.AddHeader("PROD_5"				,"M+5"      		,"t_number" 	,100.3	,70 ,true);  

	  	GridObj2.AddHeader("MINMPSQTY"	,"MOQ"			,"t_number" ,100.3		,50  ,true); //0 
	  	GridObj2.AddHeader("NTGEW"		,"������KG"		,"t_number" ,100.3		,60  ,true); //0
	  	GridObj2.AddHeader("READ_TIME"	,"����Ÿ��" 		,"t_number" ,100.3		,60  ,true); //0 
	  	GridObj2.AddHeader("MEINS"		,"���ִ���"      ,"t_text" 	,100		,0  ,false); //0 
	  	GridObj2.AddHeader("QTY"		,"�䱸��"			,"t_number" ,100.3		,60  ,true); //0 
	  	GridObj2.AddHeader("IPGO_QTY"	,"PR��"			,"t_number" ,100.3		,60   ,true); //0 
	  	GridObj2.AddHeader("IPGO_DATE"	,"�԰��û��" 	,"t_date"   ,100		,80  ,true); //0
	  	GridObj2.AddHeader("TEXT"		,"Ư�̻���"      ,"t_text"   ,100		,120  ,true); //0
		GridObj2.AddHeader("PR_NO"		,"PR��ȣ"     	,"t_text" 		,100	,70   ,true); //0   
 		GridObj2.AddHeader("IF_MSGS"	,"IF �޼���"     	,"t_text" 		,100	,100   ,true); //0    
 		GridObj2.AddHeader("BASE_STOCK"	,"���"     	,"t_number" 		,100.3	,70   ,true); //0    	    
		GridObj2.BoundHeader();	
	 	
	 	GridObj2.SetColCellAlign('ITEM_ID',		'center'); 
	    GridObj2.SetColCellAlign('ITEM_NAME',	'left'); 
	    GridObj2.SetColCellAlign('GUBN',		'center');
	    GridObj2.SetColCellAlign('TEXT',		'left'); 
	    GridObj2.SetColCellAlign('MEINS',		'center'); 
	    GridObj2.SetColCellAlign('IPGO_DATE',	'center');	   
	    
	    GridObj2.SetNumberFormat("PROD_0",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_1",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_2",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_3",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_4",	"#,##0");
	    GridObj2.SetNumberFormat("PROD_5",	"#,##0");
	    
	    GridObj2.SetDateFormat("IPGO_DATE",'yyyy-MM-dd');
	    
	    
	    GridObj2.SetNumberFormat("MINMPSQTY",	"###,###.##");
	    GridObj2.SetNumberFormat("QTY","###,###.##");
	    GridObj2.SetNumberFormat("IPGO_QTY",	"###,###.##");
	

}

function setHeader3(GridObj3) {     
	
			
	  	GridObj3.AddHeader("ITEM_ID"			,"ǰ���ȣ"       	,"t_text" 		,20		,80  ,false); //0   
	 	GridObj3.AddHeader("ITEM_NAME"			,"ǰ���"      		,"t_text" 		,100	,0 ,false); //0 
	 	
	 	
	 	GridObj3.AddHeader("MONTH_0"				,"M-3"      	,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_1"				,"M-2"      	,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_2"				,"M-1"      	,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_3"				,"LM"      		,"t_number" 	,100.3	,80 ,false); 
	 	GridObj3.AddHeader("MONTH_4"				,"LM+1"      	,"t_number" 	,100.3	,80 ,false);  
	 	GridObj3.AddHeader("MONTH_5"				,"LM+2"      	,"t_number" 	,100.3	,80 ,false);  
	 	
	 

	 	
	 	GridObj3.AddGroup	 ("SALES_MONTH", "�ǸŽ���");			
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_0");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_1");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_2");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_3");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_4");
		GridObj3.AppendHeader("SALES_MONTH", "MONTH_5");
	 	
	
		GridObj3.BoundHeader();	
	
	    
	    GridObj3.SetColCellAlign('ITEM_ID',  'center'); 
	    GridObj3.SetColCellAlign('ITEM_NAME',  'left'); 

	
	    GridObj3.SetNumberFormat("MONTH_0",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_1",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_2",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_3",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_4",			"#,##0");
	    GridObj3.SetNumberFormat("MONTH_5",			"#,##0");
		
 
}

function setHeader4(GridObj4) {        
       
  	GridObj4.AddHeader("ITEM_ID"		,"ǰ���ȣ"  	,"t_text" 	,10		,60		,false); //0   
  	GridObj4.AddHeader("ITEM_NAME"		,"ǰ���"  	,"t_text" 	,100	,200	,false); //0 
  	GridObj4.AddHeader("DEMAND"			,"�ҿ䷮"  	,"t_number" ,100.3	,78		,false); //0    
 	GridObj4.AddHeader("PROD_QTY"		,"���Է�"		,"t_number" ,100.3	,68 	,false); //0   
 	GridObj4.AddHeader("USE_QTY"		,"�̷л�뷮"	,"t_number" ,100.3	,68		,false); //0   

	GridObj4.BoundHeader();	
 
    GridObj4.SetColCellAlign('ITEM_ID',		'center'); 

    GridObj4.SetNumberFormat("PROD_QTY",	"###,###.##");
    GridObj4.SetNumberFormat("USE_QTY",		"###,###.##");
	GridObj4.SetNumberFormat("DEMAND",		"###,###.##");

}

/*������������������������������������������������������������������������
  ��WiseGrid Change Combo Event
  ������������������������������������������������������������������������*/
function GridChangeComboHandler(strColumnKey, nRow, nOldIndex, nNewIndex){
	
	
		
};



function GridChangeCell(strColumnKey, nRow, nOldValue, nNewValue) {  

}




/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery(){
	
    var endMode		= GridObj.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {            
        	
			GridSetMerge_dw1();
			doQuery2();
			doQuery3();
			
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }else if(endMode == "save"){
    	
    	doSave2();
    	
		
    }else{ // ����, ���� �����Ͻ� ���α׸��� ����ȸ   
    	
    }
    
	
}

function GridEndQuery2() {
	
	var endMode		= GridObj2.GetParam("mode");
	var error_msg	= '';
	          
	if(endMode == "search2") {
		if(GridObj2.GetStatus() == "true") {
			
			
			GridSetMerge_dw2();
			GridCal_dw2();
		}
		else { 
			error_msg = GridObj2.GetMessage(); 
			alert(error_msg);            
		}
	}else if(endMode == "save2"){
    
		alert("�����Ͽ����ϴ�");
		doQuery();
		doQuery2();
    }	
	
}

function GridEndQuery3(){
		
    var endMode		= GridObj3.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search3") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj3.GetStatus() == "true") 
        {            
        	
			GridSetMerge_dw3();		
			
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	
}

function GridEndQuery4(){
		
    var endMode		= GridObj4.GetParam("mode");
    var error_msg	= '';
 
    if(endMode == "search4") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj4.GetStatus() == "true") 
        {            
        	
			GridSetMerge_dw4();		
			
                 
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
	
}

/*������������������������������������������������������������������������
  ��GRID2 ����
  ������������������������������������������������������������������������*/
function GridCal_dw2(){	
	
	var cur_stock;
	var req_qty;
	var ipgo_qty;
	var next_stock;	
	
	var rowcount = GridObj2.GetMergeCount('ITEM_ID');   //�Ұ� �ε��� ���ϱ�
	
	
	
	for (var i=0; i < rowcount; i++){
		
		var start_hd_name	= 'PROD_0';
		var hd_name 		= start_hd_name;
		var hd_name_1 		= start_hd_name.substr(0,5);
		var hd_name_2 		= start_hd_name.substr(5,6);
		
		
		var idx				= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		
		for(var j =0; j < 5; j++){
			
			cur_stock 		= Math.round(GridObj2.GetCellValue(hd_name,idx),0);
			req_qty 		= Math.round(GridObj2.GetCellValue(hd_name,idx+1),0);
			ipgo_qty		= Math.round(GridObj2.GetCellValue(hd_name,idx+2),0);
			
			next_stock		= Math.round(Number(cur_stock),0) - Math.round(Number(req_qty),0) + Math.round(Number(ipgo_qty),0);
			
			hd_name_2 	= Number(hd_name_2)+Number(1);						
			hd_name 	= hd_name_1+hd_name_2;
			
			GridObj2.SetCellValue(hd_name, idx,  next_stock);
			
		}			
	}		
	
	
}


/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}	



               
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch(service){
	
    doQuery();
	
}

/*������������������������������������������������������������������������
  ���Ϻ� �׸��� ��ȸ DW2 ����Ŭ��
  ������������������������������������������������������������������������*/
function Grid2CellDblClick(strColumnKey, nRow){ 
	
	
	var item_id		= GridObj2.GetCellValue('ITEM_ID',nRow)
	var	item_name	= GridObj2.GetCellValue('ITEM_NAME',nRow)
	var version		= document.frm.version.value;
	var gubn		= 'wel';
	
	
	if(strColumnKey == 'ITEM_NAME' ){
		
		var service_url = "service.do?_moon_service=op_02010_Long_Term_Planning_list_PR_PO_term_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&gubn=" + gubn;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=895, height=380, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();		
	}else if(strColumnKey == 'GUBN' ){
		
		var service_url = "service.do?_moon_service=op_02090_Long_Term_Planning_list_mat_move_pop_up";
		service_url += "&item_id=" + item_id + "&item_name=" + item_name + "&gubn=" + gubn + "&version=" + version;
		var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1095, height=280, top=320, left=200";
		var newWin = window.open(service_url, "", pop_win_style);  
		newWin.focus();
	}
	
	
	
	document.frm.item_id.value = item_id;
	
	doQuery4();	
	
}   


/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery()  {
	
   SetHeader_grid1();		
   var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
   var version		= document.all.version.value;
   var item_type	= document.all.item_type.value;
  
  		
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj.SetParam("mode", 		 "search");
   GridObj.SetParam("version", 		  version);
   GridObj.SetParam("item_type",    item_type);
  
       
   GridObj.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ��DW 2 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2() {
	
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var version		= document.all.version.value;
	var item_type	= document.all.item_type.value;	
	
	if(item_type == "1") item_type = '3';
	if(item_type == "2") item_type = '4';
	

	
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	//GridObj2.SetParam("itype", itype);
	GridObj2.SetParam("mode", "search2");
	GridObj2.SetParam("version", 		  version);
	GridObj2.SetParam("item_type",    item_type);

	GridObj2.DoQuery(servlet_url);
}
  
/*������������������������������������������������������������������������
  ��DW 3 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery3()  {
	
   SetHeader_grid3();	
   var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
		
   var version		= document.all.version.value;
   var item_type	= document.all.item_type.value;
  
  		
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj3.SetParam("mode", 		 "search3");
   GridObj3.SetParam("version", 	 version);
   GridObj3.SetParam("item_type",    item_type);
  
       
   GridObj3.DoQuery(servlet_url);
}

function doQuery4() {

	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	
	var item_id		= document.frm.item_id.value;
	var version		= document.all.version.value;	
	var from_mm		= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	
	
	
	GridObj4.SetParam("mode",		  "search4");
	GridObj4.SetParam("item_id",  		item_id);
	GridObj4.SetParam("from_mm",  	   from_mm);
	GridObj4.SetParam("to_mm",			 to_mm);
	GridObj4.SetParam("version", 		version);


	GridObj4.DoQuery(servlet_url);
}

// �� ���� ��������
var objTdG;



// popup ��ȸ �̹��� mouseOver
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function overImg( objImg ) {
	
	popImgIdx = objImg.parentNode.parentNode.parentNode.rowIndex;
	
}

// popup ��ȸ �̹��� mouseOut
// popup �� ���� ���� ��ǰ �ڵ� ������ ��� ��� viewMode ��ȯ ������ ���� flag ����
function outImg( objImg ) {
	
	popImgIdx = null;
	
}

// ��¥ �˻� POP BTN mouseOver
function overBtn( objBtn ) {
	clickedDateIdx = objBtn.parentNode.parentNode.parentNode.rowIndex;
	
}

// ��¥ �˻� POP BTN mouseOut
function outBtn( objBtn ) {
	
	clickedDateIdx = null;
	
}



//--------------------------------------   main_template �� ���ǵ� Event ---------------------------------------------------//
/*������������������������������������������������������������������������
  ��WiseGrid Cell Change Event
  ������������������������������������������������������������������������*/

// ����
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode		= "save";
	doSave();	
};

// ����
function doSave() {
 
	var GridObj		= document.WiseGrid;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

	var version		= document.all.version.value;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",						 "save");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	GridObj.SetParam("version",						version);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
 
}

function doSave2() {
 
	var GridObj2	= document.WiseGrid2;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
	var version		= document.all.version.value;
	var Rows 		= new Array();
	var rowcount 	= GridObj2.GetRowCount();
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');
	
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');

		for(var i =0; i < mergecount ; i++){
	
		var idx		= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,true);
		
		var idx_2	= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);
		
		var txt		= GridObj2.GetCellValue('TEXT',idx_2);
		var req		= GridObj2.GetCellValue('QTY',idx_2);
		var pr_qty	= GridObj2.GetCellValue('IPGO_QTY',idx_2);
		var ipgo_date = GridObj2.GetCellValue('IPGO_DATE',idx_2);
		var base_stock	= GridObj2.GetCellValue('PROD_0',idx_2);		
		
		GridObj2.SetCellValue("TEXT",idx,txt);		
		GridObj2.SetCellValue("QTY",idx,req);
		GridObj2.SetCellValue("IPGO_QTY",idx,pr_qty);
		GridObj2.SetCellValue("IPGO_DATE",idx,ipgo_date);
		GridObj2.SetCellValue("BASE_STOCK",idx,base_stock);
		
			

	}
	
	for(var i =0; i < mergecount ; i++){
		
		var idx				= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,true);
		GridObj2.SetCellValue("SELECTED",idx,1);		

	}
	
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode",						 "save2");
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	GridObj2.SetParam("version",					 version);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	//GridObj2.DoQuery(servlet_url, Rows);		cab ���� ���� ����ġ�� ����
	
	GridObj2.DoQuery(servlet_url, "SELECTED");
 
}





function GoIf(){

	if(confirm("���� �Ͻ� ǰ���� ERP ������ Ȯ���Ͻðڽ��ϱ�?") == 1 ) {
		
	}
	else{
		return;
	}	


	var GridObj2		= document.WiseGrid2;
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;


	var version		= document.all.version.value;
	 
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj2.SetParam("mode",						 "doIf");
	GridObj2.SetParam("user_id", document.frm._user_id.value);
	GridObj2.SetParam("version",						version);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj2.DoQuery(servlet_url, "SELECTED");

	
}



function doChange2(obj){
	
	var version = document.frm.version.value;
	var in_div;
	
	commonUtil.getSelQeury("version",version,"Aps_Pr_version_Semi_list", { 
	callback:function(arrList){
		var selected_row = 0;
		
		in_div = "<select name=\"version\" OnChange=\"doChange3(this);\"  >";
		for(var i=0 ; i < arrList.length ; i++){
			
			in_div +=	"<option value="+arrList[i][0];
		
			
			// ����� combo-list�� refresh�Ǹ鼭 �����ߴ� ǰ���� �ٽ� �����ϵ��� �Ѵ�.
			if(document.frm.version.value == arrList[i][0]) {
				in_div += " selected";
				selected_row = i;
			}
			
			in_div += ">"+arrList[i][0]+"</option>";
			
		}	
		in_div += "</select> \n";
		for(var i=0 ; i < arrList.length ; i++){
		}	

		divVersionCombo.innerHTML = in_div;
		

	}
	});
}

function Grid2ChangeCell(strColumnKey, nRow,nOldValue,nNewValue){
	
	
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');	
	var version		= document.frm.version.value;
	for (var i=0; i<mergecount; i++){
		
		var idx	= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);   //merge group�� ù��° row index	
		if(nRow == idx || nRow == idx +1 || nRow == idx+2){
			if(strColumnKey == "QTY"){
				
				var minqty 		= GridObj2.GetCellValue('NTGEW',nRow);
				var cur_date 	= GridObj2.GetCellValue('IPGO_DATE',nRow);
				var read_time	= GridObj2.GetCellValue('READ_TIME',nRow);
				commonUtil.getSelQeury( "version!%!read_time", version +"!%!" + read_time, "op_02090_get_ipgo_date",{
				callback:function(result){
				
				
						GridObj2.SetCellValue('IPGO_DATE',nRow,result);
					}
					
				});	
				
		
				GridObj2.SetCellValue('IPGO_QTY',nRow,minqty *nNewValue );
			}
			
		}	
		
	}
	
	GridCal_dw2();
	
}



function GridSetMerge_dw1(){
	
	
	GridObj.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'PROD_0,PROD_1,PROD_2,PROD_3,PROD_4,PROD_5'); 
	GridObj.SetSummaryBarColor('SUMMARY','0|153|0', color_tot); 
 	   
}

function GridSetMerge_dw2(){	
	
	GridObj2.SetGroupMerge('ITEM_ID,ITEM_NAME');	
	
	var rowcount	= GridObj2.GetRowCount();
	var mergecount 	= GridObj2.GetMergeCount('ITEM_ID');		
	var bgidx		= 0 ;
	
	for (var i=0; i < mergecount; i++){
		
		var idx_start	= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,false);   //merge group�� ù��° row index
		var idx_end		= GridObj2.GetRowIndexFromMergeIndex('ITEM_ID',i,true);   //merge group�� ������ row index
		var gap			= idx_end - idx_start;
		//GridObj2.SetRowBgColor(idx_start,'178|235|244');
		
		if(bgidx == '1') {
			for(j=idx_start; j < idx_end+1; j++){
			
				GridObj2.SetRowBgColor(j,'255|253|208');
			}
			
			bgidx = 0 ;
			
		}else		bgidx = 1;
		
		
		//���,�ҿ䷮,�԰� �� row�� �� ���� ���� �ֱ� ������ ��� row�� �����ϰ�� �����Ұ��� �������ش�.
//		if(gap == '2') {
//			
//			GridObj2.SetCellActivation('QTY',idx_start+1,'activatenoedit');
//			GridObj2.SetCellActivation('QTY',idx_start+2,'activatenoedit');
//		}else{
//			GridObj2.SetCellActivation('QTY',idx_start+1,'activatenoedit');
//		}
	
	}
	
}

function GridSetMerge_dw3(){
	

	GridObj3.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'MONTH_0,MONTH_1,MONTH_2,MONTH_3,MONTH_4,MONTH_5'); 
	GridObj3.SetSummaryBarColor('SUMMARY','0|153|0', color_tot); 
	

 	   
}

function GridSetMerge_dw4(){
	
	
	GridObj4.AddSummaryBar('SUMMARY', '�հ�', 'summaryall', 'sum', 'PROD_QTY,USE_QTY'); 
	GridObj4.SetSummaryBarColor('SUMMARY','0|153|0', color_tot);  
	

 	   
}

function SetHeader_grid1(){
	
	
	var version = document.frm.version.value;
	var hd_text = new Array();
	var hd_name = 'PROD_';
	
	commonUtil.getSelQeury( "cnfm_date", version  , "op_02090_Long_Term_Planning_list_semi_dw1_header",{
	callback:function(result){
		
		for(i=0; i < 6; i++){
			
			var hd_text_name = hd_name + i;			
			GridObj.SetColHDText(hd_text_name,result[i][0]);
			GridObj2.SetColHDText(hd_text_name,result[i][0]);
			
		}
			 
		}
	}); 	

}

function SetHeader_grid3(){
	
	
	var version = document.frm.version.value;
	var hd_text = new Array();
	var hd_name = 'MONTH_';
	
	commonUtil.getSelQeury( "cnfm_date", version  , "op_02090_Long_Term_Planning_list_semi_dw3_header",{
	callback:function(result){
		
		for(i=0; i < 6; i++){
			
			var hd_text_name = hd_name + i;			
			GridObj3.SetColHDText(hd_text_name,result[i][0]);
		
			
		}
			 
		}
	}); 	

}


function doChange_mm(obj){
	
	var from_mm 	= document.all.from_mm.value;
	var to_mm		= document.all.to_mm.value;
	var from_mm_1	= from_mm.substr(0,4);
	var from_mm_2	= from_mm.substr(5,6);
	var to_mm_1		= to_mm.substr(0,4);
	var to_mm_2		= to_mm.substr(5,6);
	
	
	//Number(hd_name_2)+Number(1);
	
	if(obj.name == 'pre_mm'){ // ������
		from_mm_2	= Number(from_mm_2) - Number(1);
		to_mm_2		= Number(to_mm_2) - Number(1);
		
			// �ذ� �Ѿ�ٸ�...
			if(from_mm_2 == 0){
				from_mm_1 = Number(from_mm_1) - Number(1);
				from_mm_2 = 12;
			}else{
				
			}
			if(to_mm_2 == 0){
				to_mm_1 = Number(to_mm_1) - Number(1);
				to_mm_2 = 12;
			}else{
				
			}
		
		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}else{ //������
		from_mm_2	= Number(from_mm_2) + Number(1);
		to_mm_2		= Number(to_mm_2) + Number(1);

			// �ذ� �Ѿ�ٸ�...
			if(from_mm_2 == 13){
				from_mm_1 = Number(from_mm_1) + Number(1);
				from_mm_2 = 1;
			}else{
				
			}
			if(to_mm_2 == 13){
				to_mm_1 = Number(to_mm_1) + Number(1);
				to_mm_2 = 1;
			}else{
				
			}


		if(from_mm_2 < 10){
			from_mm = from_mm_1 +'-0'+ from_mm_2;
		}else{
			from_mm = from_mm_1 +'-'+  from_mm_2;
		}
		
		if(to_mm_2 < 10){
			to_mm = to_mm_1 +'-0'+ to_mm_2;
		}else{
			to_mm = to_mm_1  +'-'+  to_mm_2;
		}
		
	}
	
	document.all.from_mm.value = from_mm; 
	document.all.to_mm.value = to_mm; 
	
	
}

function CreateVersion(){
	
	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",						 "trans");
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url);
}
	