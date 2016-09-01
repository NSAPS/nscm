//## ���α׷�ID		:	op_02070_event_plan_Info.vm
//## ���α׷���		:	���뺻�� ���˰�ȹ ����  Excel ���ε�
//## ������          :	������ 
//## ��������       	:	2013-07-11
//##
//## ���� job file   : job_sinc_30_orderPlanning_03.xml
//## ���� query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-07-11  ������      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id				= 'op_02070_event_plan_info';
var GridObj ; 													// WiseGrid ��ü
											// WiseGrid ��ü

var color_tot			= '234|234|234';			//�հ� ���� ����
var color_edit_col		= '255|253|208';
var color_sp			= '230|222|230'; 			//�÷� ���м� ����
var color_select_row	= '141|232|141';	//���� ���� ����
var colBg01 			= '224|255|224';			//255|255|153
var colBg02 			= '255|255|255';


/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
    function setGridAutoResize( tab_h, table_h ){
        
        var maxWidthValue;
        var maxHeightValue;
        
        if (document.layers) {
            //Nescape
            maxWidthValue		= window.innerWidth;
            maxHeightValue		= window.innerHeight;
        }
        if (document.all) {
            //explore
            maxWidthValue		= document.body.clientWidth;
            maxHeightValue		= document.body.clientHeight;
        } 
        
        var tabHeightValue		= Number(maxHeightValue) - Number(tab_h) ; 
        var tableHeightValue	= Number(maxHeightValue) - Number(table_h) ; 
        
        var search_h 			= document.frm.search_h.value; 
        
        // ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
        // ==> ȭ���� ���̻� ��ҵ��� ���� 
        if(tabHeightValue < 1 ) 
           tabHeightValue = 1; 
        if(tableHeightValue < 1 ) 
           tableHeightValue = 1; 
        
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
	setDefault();        	//ȭ�� �⺻ ���� 
}


/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault() { 

	/* 
    GridObj.nHDLineSize         	= 36; //Header Size
       
 	GridObj.strActiveRowBgColor		= "232|245|213";    //���õ� ���� �������� �����Ѵ�.
	GridObj.strSelectedCellBgColor	= '232|232|255'; //Drag�� ���õ� ���� �������� ������ �� �ִ� 	
	GridObj.strSelectedCellFgColor	= '0|0|0'; 
	GridObj.strMouseWheelAction		= 'page'; // page ���� scroll ->�⺻�� 'default'   
	// Header Font Setting
	GridObj.strHDClickAction    = "sortsingle";
	GridObj.strHDFontName			= '���� ���';
	GridObj.nHDFontSize				= 10;				  	// Font Size 9
	GridObj.bHDFontBold				= true;
*/
/////////////////////////////////////////

	GridObj.bRowSelectorVisible = false;        		//�ο� �����͸� WiseGrid���� �����,. 
	GridObj.bRowSelectorIndex = true;				//Row Selector ������ Row Index�� �����ش�.
    GridObj.nHDLineSize         = 10; //Header Size
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2;   
    
   
    //���õ� ���� ���ڻ� �����Ѵ�.
    GridObj.strSelectedCellFgColor = '180|82|205';
    GridObj.strHDClickAction = "select";        	//Ŭ���� �÷��� ���� ���ð����ϰ� �Ѵ�.
	GridObj.strActiveRowBgColor = "232|245|213";    //���õ� ���� �������� �����Ѵ�.

     GridObj.strHDClickAction    = "sortsingle";   
     
     GridObj.strMouseWheelAction='page';
    
	// Cell Font Setting
	GridObj.nCellFontSize = 9;					// Font Size 9
   
}
     
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(GridObj) {        
       
	var header_length = 0, j;
 	
 	GridObj.AddHeader("CUST_NAME"		,"�ŷ�ó��"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("GUBN"			,"����"				,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("ITEM_ID"			,"��ǰ�ڵ�"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("ITEM_NAME"		,"��ǰ��"				,"t_text" 		,100	,180	,false); //0
 	GridObj.AddHeader("EVEN_METHOD"		,"��� ���"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("FRT_CHGO_DATE"	,"���� �����"			,"t_text" 		,100	,80		,false); //0
 	GridObj.AddHeader("EVEN_S_DATE"		,"������"				,"t_text" 		,100	,90		,false); //0
 	GridObj.AddHeader("EVEN_E_DATE"		,"������"				,"t_text" 		,100	,90		,false); //0
 	
 	GridObj.AddHeader("CHDO_QTY"		,"�ʵ�����"			,"t_number" 	,-1		,90		,true); //0   
 	GridObj.AddHeader("PLAN_QTY"		,"��ȹ����"   		,"t_number" 	,-1		,90  	,true); //0   
 	
 	GridObj.AddHeader("SUPT_METHOD"		,"���� ���"			,"t_text" 		,100	,70		,false); //0
 	GridObj.AddHeader("CHGO_STD"		,"��� ����"			,"t_text" 		,100	,70		,false); //0
 	
 	GridObj.AddHeader("ETC"				,"������ǰ \n/ �ý�ǰ"	,"t_text" 		,100	,70		,false); //0

 	GridObj.AddHeader("REAL_CHGO_DATE"	,"���� �����"			,"t_text" 		,100	,0		,false); //0
 	GridObj.AddHeader("REAL_S_DATE"		,"������"				,"t_text" 		,100	,0		,false); //0
 	GridObj.AddHeader("REAL_E_DATE"		,"������"				,"t_text" 		,100	,0		,false); //0

 	
 	/* ���� �ش� �߰� */
	GridObj.AddGroup("HD1",      	"���Ⱓ");			//�׸��忡 �׷��� ����Ѵ�. 
	GridObj.AppendHeader("HD1", 	 "EVEN_S_DATE");
	GridObj.AppendHeader("HD1",      "EVEN_E_DATE");
   
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('ITEM_ID',		  	  'left');
    GridObj.SetColCellAlign('ITEM_NAME',		  'left');
    GridObj.SetColCellAlign('CUST_NAME',		'center');
    GridObj.SetColCellAlign('GUBN',				'center');
    
    
    GridObj.SetColCellAlign('EVEN_METHOD',		'center');
    GridObj.SetColCellAlign('FRT_CHGO_DATE',	'center');
    GridObj.SetColCellAlign('EVEN_S_DATE',		'center');
    GridObj.SetColCellAlign('EVEN_E_DATE',		'center');
    GridObj.SetColCellAlign('CHDO_QTY',			 'right');
    GridObj.SetColCellAlign('PLAN_QTY',			 'right');
    GridObj.SetColCellAlign('SUPT_METHOD',		'center');
    GridObj.SetColCellAlign('CHGO_STD',			'center');
    GridObj.SetColCellAlign('ETC',				'center');

    GridObj.SetColCellAlign('FRT_CHGO_DATE',	'center');
    GridObj.SetColCellAlign('EVEN_S_DATE',		'center');
    GridObj.SetColCellAlign('EVEN_E_DATE',		'center');
	
	GridObj.SetNumberFormat("CHDO_QTY",		"#,##0.###");
	GridObj.SetNumberFormat("PLAN_QTY",		"#,##0.###");

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
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;	
	
	var in_fr_date	    = document.frm.in_fr_date.value;
	var in_to_date	    = document.frm.in_to_date.value;
		in_fr_date 		= in_fr_date.replace(/-/g,"");
		in_to_date 		= in_to_date.replace(/-/g,"");
	
	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",		"search");
	GridObj.SetParam("in_fr_date",   in_fr_date);
	GridObj.SetParam("in_to_date",   in_to_date);
	
	
	GridObj.SetParam("user_id",		document.frm._user_id.value);
	GridObj.DoQuery(servlet_url,	"WISEGRIDDATA_ALL");
}

// ����
function GoSave(service) {
	var GridObj = document.WiseGrid;

	mode = "save";
	doSave();	
};

// ����
function doSave() {
 
	var GridObj			= document.WiseGrid;
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;
	

    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",		"doSave");
	GridObj.SetParam("user_id",		document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� �����ϴ� �޼����Դϴ�. ����� �����ϸ� true�� ��ȯ�մϴ�.
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");	

 
}


/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() 
{
    var endMode			= GridObj.GetParam("mode");    
    
    var error_msg		= '';
      
    if(endMode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {
        	
			//EDIT_FLAG	        	               
			for(var i=0;i<GridObj.GetRowCount();i++) {
			// cell���� ����
				
				GridObj.SetCellBgColor('GUBN',			i, 	color_edit_col);
				
				GridObj.SetCellBgColor('EVEN_METHOD',	i, 	color_edit_col);
				GridObj.SetCellBgColor('FRT_CHGO_DATE', i, 	color_edit_col);
				
				GridObj.SetCellBgColor('CHDO_QTY',		i, 	color_edit_col);
				GridObj.SetCellBgColor('PLAN_QTY',		i, 	color_edit_col);
				
				GridObj.SetCellBgColor('SUPT_METHOD',	i, 	color_edit_col);
				GridObj.SetCellBgColor('CHGO_STD',		i, 	color_edit_col);
				GridObj.SetCellBgColor('ETC',			i, 	color_edit_col);

			}         	                           
                 
        } else{ 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
    
		    else if(endMode == "doSave"){
		    	var service_url = "service.do?_moon_service=op_02070_event_plan_info";
				alert("������ �Ϸ� �Ǿ����ϴ�.");
		
    }
    
    else{

    }	


	
}
function GridChangeCell(){ //��ü�� ���ٴ� ���� �ذ� ����(Service.do)
	
}

function GridCellClick(){ //��ü�� ���ٴ� ���� �ذ� ����(Service.do)
	
}

function excelUpload(){
	       
   //���� ������ ���ε� �� Grid ����
	
	
	
	document.WiseGrid.ClearGrid();
				
	init();
	
	

	GridObj.ExcelImport('', 'importall','row', false, false); 
   

}

/* EXCEL DWON */
function excelDown() {

}