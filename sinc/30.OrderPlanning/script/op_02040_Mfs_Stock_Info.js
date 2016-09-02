//## ���α׷�ID		:	op_02040_Mfs_Stock_Info.js
//## ���α׷���		:	�迭�� ������� ���
//## ������          :	�ǿ��� 
//## ��������       	:	2013-04-08
//##
//## ���� job file   : job_sinc_30_orderPlanning_03.xml
//## ���� query file : query_sinc_30_orderPlanning_03.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 1.0        2013-04-08  ������      create
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path			= "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id				= 'op_02040_Mfs_Stock_Info';
var GridObj ; 													// WiseGrid ��ü

var color_tot			= '234|234|234';			//�հ� ���� ����
var color_edit_col		= '255|253|208';
var color_sp			= '230|222|230'; 			//�÷� ���м� ����
var color_select_row	= '141|232|141';	//���� ���� ����



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
 	GridObj.AddHeader("CNFM_DATE"		,"��ȹ����"		,"t_text" 		,800	,70		,false); //0
 	GridObj.AddHeader("COM_CODE"		,"�迭���ڵ�"		,"t_text" 		,800	,0		,false); //0
 	GridObj.AddHeader("COM_NAME"		,"�迭���"		,"t_text" 		,800	,70		,false); //0   
 	GridObj.AddHeader("COM_MATR_CODE"	,"�迭�� �����ڵ�"	,"t_text" 		,800	,120	,false); //0   
 	GridObj.AddHeader("COM_MATR_NAME"	,"�迭�� �����"   ,"t_text" 		,800	,250  	,false); //0   
 	GridObj.AddHeader("NS_MATR_CODE"	,"��� �����ڵ�"   ,"t_text" 		,800	,90  	,false); //0   
 	GridObj.AddHeader("BASE_UOM"		,"����"     		,"t_text" 		,800	,80  	,false); //0
 	GridObj.AddHeader("BASE_STOCK"		,"�������"     	,"t_number" 	,-1		,80  	,true); //0   
	GridObj.BoundHeader();	

    GridObj.SetColCellAlign('COM_NAME',				'left'); 
    GridObj.SetColCellAlign('COM_MATR_CODE',		'left'); 
    GridObj.SetColCellAlign('COM_MATR_NAME',		'left');
    GridObj.SetColCellAlign('NS_MATR_CODE',			'left');
    
    
    GridObj.SetColCellAlign('BASE_STOCK',			'right'); 
    GridObj.SetColCellAlign('BASE_UOM',				'center');

	
	GridObj.SetNumberFormat("BASE_STOCK",		"#,##0.###");	

}

   
/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function GoSearch(service) 
   {
   	var cnfm_date		= document.frm.cnfm_date.value;
   	
       doQuery();
   }

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() 
{
	var servlet_url		= Project_name+"/servlet/com.wisegrid.admin."+job_id;	
	var com_code		= document.frm.com_code.value;
	var cnfm_date		= document.frm.cnfm_date.value;

	   
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",		"search");
	GridObj.SetParam("com_code",	com_code);
	GridObj.SetParam("cnfm_date",	cnfm_date);
	   
	GridObj.DoQuery(servlet_url, "WISEGRIDDATA_ALL");
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
	
	var com_code		= document.frm.com_code.value;

   	var rowCnt = GridObj.GetRowCount();
   	var src_com_matr, 	tgt_com_matr;
   	var src_ns_matr, 	tgt_ns_matr;
   
	// �ߺ�üũ
	for ( var i = 0 ; i < rowCnt - 1 ; i++ )
	{
		src_com_matr	= GridObj.GetCellvalue('COM_MATR_CODE',	i);
		src_ns_matr		= GridObj.GetCellvalue('NS_MATR_CODE',	i);
		
		for ( var j = i + 1 ; j < rowCnt ; j++ )
		{
			tgt_com_matr	= GridObj.GetCellvalue('COM_MATR_CODE',	j);
			
			tgt_ns_matr		= GridObj.GetCellvalue('NS_MATR_CODE',	j);
			if(src_com_matr==tgt_com_matr && src_ns_matr==tgt_ns_matr){
				alert(j-1+"��° �迭�� �����ڵ峪 ��� �����ڵ尡 �ߺ��� �����Ͱ� �ִ��� �ٽ� Ȯ���Ͻñ�  �ٶ��ϴ�");
				return;
			}
			
		}
		
	}  

    
	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	GridObj.SetParam("mode",		"doSave");
	GridObj.SetParam("com_code",	com_code);
	
	GridObj.SetParam("user_id",		document.frm._user_id.value);

		if(com_code=="0001000050"){
			alert("���� �����Ͱ� �°����� �½��ϱ�?");
		}else if(com_code=="0001000021"){
				alert("���� �����Ͱ� ����ȭ���� �½��ϱ�?");
		}
	
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
				
				GridObj.SetCellBgColor('BASE_STOCK', i, color_edit_col);
			}         	                           
                 
        } else
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
		}
    }
    
		    else if(endMode == "doSave"){
		    	
		    	var service_url = "service.do?_moon_service=op_02040_Mfs_Stock_Info";				
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

	GridObj.ExcelImport('', 'importall','row', true, true);
}

