//## ���α׷�ID       : ip_09010_intergrated_stock_manage.js
//## ���α׷���      	 : ����������
//## ������           : �̰���
//## ��������        	 : 2016-08-08 
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_08.xml
//## ���� query file : query_sinc_ip_09010_intergrated_stock_manage.xml.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION//## ---------  ----------  --------  ------------------------------------

//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//
//var mode;														// WiseGrid ��� �� ���� ���(search, save, ... etc)
var class_path = "com.wisegrid.admin.";							// ���� ��Ű��(class ���� ���)
var job_id = 'ip_09010_intergrated_stock_manage';

var GridObj ; 									// WiseGrid ��ü
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
    GridObj.strMouseWheelAction	   = 'page';

	// Cell Font Setting
	GridObj.nCellFontSize = 9;		
       
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/ 
function setHeader(GridObj) {        

	GridObj.AddHeader("CNFM_DATE"	,"����"			,"t_text" 	   	   ,100	    ,100     ,false); //0   
 	GridObj.AddHeader("CUR_STOCK"	,"�ݳ����"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO"	,"�ݳ����"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK2"	,"�ݳ����"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK2"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO2"	,"�ݳ����"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO2"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK3"	,"�ݳ����"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK3"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO3"	,"�ݳ����"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO3"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK4"	,"�ݳ����"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK4"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO4"	,"�ݳ����"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO4"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
 	
 	GridObj.AddHeader("CUR_STOCK5"	,"�ݳ����"	    ,"t_number" 	   ,100	    ,80    ,false); //0
 	GridObj.AddHeader("LAST_STOCK5"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("CUR_CHGO5"	,"�ݳ����"	    ,"t_number"  	   ,100		,80    ,false); //0
 	GridObj.AddHeader("LAST_CHGO5"	,"�������"	    ,"t_number"  	   ,100		,80    ,false); //0
	
	GridObj.AddGroup	("GUBN",    "��/����");			
	GridObj.AppendHeader("GUBN", 	"CUR_STOCK");
	GridObj.AppendHeader("GUBN", 	"LAST_STOCK");
	GridObj.AppendHeader("GUBN", 	"CUR_CHGO");
	GridObj.AppendHeader("GUBN",   	"LAST_CHGO");
	
	GridObj.AddGroup	("GUBN2",   "���Ի�ǰ");			
	GridObj.AppendHeader("GUBN2", 	"CUR_STOCK2");
	GridObj.AppendHeader("GUBN2", 	"LAST_STOCK2");
	GridObj.AppendHeader("GUBN2", 	"CUR_CHGO2");
	GridObj.AppendHeader("GUBN2",   "LAST_CHGO2");
	
	GridObj.AddGroup	("GUBN3",   "���Ի�ǰ");			
	GridObj.AppendHeader("GUBN3", 	"CUR_STOCK3");
	GridObj.AppendHeader("GUBN3", 	"LAST_STOCK3");
	GridObj.AppendHeader("GUBN3", 	"CUR_CHGO3");
	GridObj.AppendHeader("GUBN3",   "LAST_CHGO3");
	
	GridObj.AddGroup	("GUBN4",   "��Ÿ");			
	GridObj.AppendHeader("GUBN4", 	"CUR_STOCK4");
	GridObj.AppendHeader("GUBN4", 	"LAST_STOCK4");
	GridObj.AppendHeader("GUBN4", 	"CUR_CHGO4");
	GridObj.AppendHeader("GUBN4",   "LAST_CHGO4");
	
	GridObj.AddGroup	("GUBN5",   "��");			
	GridObj.AppendHeader("GUBN5", 	"CUR_STOCK5");
	GridObj.AppendHeader("GUBN5", 	"LAST_STOCK5");
	GridObj.AppendHeader("GUBN5", 	"CUR_CHGO5");
	GridObj.AppendHeader("GUBN5",   "LAST_CHGO5");
	
	GridObj.BoundHeader();	

	GridObj.SetColFix('CNFM_DATE'); 
	
	GridObj.SetColCellAlign('CNFM_DATE',        'center');
	
   	GridObj.SetNumberFormat("CUR_STOCK",       	"###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK",       "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO",       	"###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK2",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK2",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO2",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO2",       "###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK3",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK3",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO3",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO3",       "###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK4",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK4",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO4",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO4",       "###,###.#");
    GridObj.SetNumberFormat("CUR_STOCK5",       "###,###.#");
    GridObj.SetNumberFormat("LAST_STOCK5",      "###,###.#");
    GridObj.SetNumberFormat("CUR_CHGO5",     	"###,###.#");
    GridObj.SetNumberFormat("LAST_CHGO5",       "###,###.#");
   
 
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

	doSave();	
	
};

/*������������������������������������������������������������������������
  ��DW 1 ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() 
{
   var start_date	    = document.frm.start_date.value;
   var end_date	        = document.frm.end_date.value;
   //start_date 			= start_date.replace(/-/g,"");
   //end_date 			= end_date.replace(/-/g,"");
 
   var user_id			= document.frm._user_id.value;
   var selected_type	= document.frm.selected_type.value; 
	
       	
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("end_date",       	end_date);
   GridObj.SetParam("user_id",     		user_id);  
   GridObj.SetParam("selected_type", 	selected_type); 
  	
   GridObj.DoQuery(servlet_url);       
}


/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}

function GridSetMerge(){	
	
	GridObj.AddSummaryBar('SUMMARY', '���', 'summaryall', 'sum', 'CUR_STOCK,LAST_STOCK,CUR_CHGO,LAST_CHGO,CUR_STOCK2,LAST_STOCK2,CUR_CHGO2,LAST_CHGO2,' +
	      	 			'CUR_STOCK3,LAST_STOCK3,CUR_CHGO3,LAST_CHGO3,CUR_STOCK4,LAST_STOCK4,CUR_CHGO4,LAST_CHGO4,CUR_STOCK5,LAST_STOCK5,CUR_CHGO5,LAST_CHGO5');
	
	var rowcount = GridObj.GetRowCount();
	var cnt_cur_chgo 	= 0;
	var cnt_last_chgo	= 0;
	for (var i=0; i<rowcount; i++){
		if(GridObj.GetCellValue('CUR_CHGO',i) == '0') cnt_cur_chgo += Number(1) ;
		if(GridObj.GetCellValue('LAST_CHGO',i) == '0') cnt_last_chgo += Number(1) ;
	}	
	
	var result 	= rowcount - cnt_cur_chgo ;
	var result2	= rowcount - cnt_last_chgo;
	
    	        
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO2');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO3');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO4');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_STOCK5');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_STOCK5');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','CUR_CHGO5');
//    GridObj.SetSummaryBarFunction('SUMMARY','average','LAST_CHGO5');   	

   	
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK2',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK2',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO2',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO2',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO2',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK3',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK3',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO3',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO3',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO3',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK4',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK4',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO4',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO4',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO4',0).replace(/,/g,"")/result2));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_STOCK5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_STOCK5',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_STOCK5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_STOCK5',0).replace(/,/g,"")/rowcount));
   	GridObj.SetSummaryBarValue('SUMMARY','CUR_CHGO5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','CUR_CHGO5',0).replace(/,/g,"")/result));
   	GridObj.SetSummaryBarValue('SUMMARY','LAST_CHGO5',0, Math.round(GridObj.GetSummaryBarValue('SUMMARY','LAST_CHGO5',0).replace(/,/g,"")/result2));

	GridObj.SetSummaryBarColor('SUMMARY', '0|153|0', color_tot);
}
