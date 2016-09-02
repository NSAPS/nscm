//## ���α׷�ID		: ip_08050_Booking_list.js
//## ���α׷���		: ��ŷ����Ʈ
//## ������			: �̰���
//## ��������			: 2016-05-10
//##
//## ���� job file   : job_sinc_10_inventoryPlanning_08.xml
//## ���� query file : query_sinc_10_inventoryPlanning_08.xml
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
var job_id = 'ip_08050_Booking_list';

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
	
	GridObj.AddHeader("ROWNUM"	   		,"����"  		,"t_number"     ,100.3		,40     ,false); //0 
	GridObj.AddHeader("ORDER_NO"		,"�ֹ���ȣ"		,"t_text" 	    ,100	    ,70     ,false); //0  
	GridObj.AddHeader("BRAND_NO"		,"��ǰ��ȣ"  		,"t_text"     	,100		,70     ,false); //0  
 	GridObj.AddHeader("BOOKING_NO"	    ,"BOOKING\n��ȣ"	,"t_text" 	   	,100	    ,70     ,false); //0
 	GridObj.AddHeader("ITEM_ID"	    	,"��ǰ�ڵ�"		,"t_text" 	   	,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"		,"��ǰ��"	        ,"t_text" 	   	,100	    ,250    ,false); //0
 	GridObj.AddHeader("ORDER_QTY"		,"�ֹ���"			,"t_number"  	,100.3		,70    ,false); //0
 	
 	
 	GridObj.AddHeader("SHIPPLAN_DATE"	,"������"			,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("ETD_DATE"		,"ETD DATE"		,"t_text"  		,100		,0     ,false); //0
 	GridObj.AddHeader("EXPORT_DECLARE"	,"����������"		,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("CLOSING_DATE"	,"CLOSING DATE"	,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("ZPLDAT"			,"�����û��"		,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("LOCAL_DIV"		,"����/����"		,"t_text"  		,100		,60    ,false); //0
 	GridObj.AddHeader("CENTER_CD"		,"�۾���(����)"	,"t_text"  		,100		,90    ,false); //0
 	GridObj.AddHeader("DELIVERY_CD"		,"�ŷ���"			,"t_text"  		,100		,160    ,false); //0
 	
 	GridObj.AddHeader("BOOKING_DATE"	,"BOOKING\n�Է���"		,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("BOOKING_USER"	,"BOOKING\n�Է���"		,"t_text"  		,100		,0    ,false); //0
 	GridObj.AddHeader("BRAND_DATE"		,"��ǰ �Է���"				,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("BRAND_USER"		,"��ǰ �Է���"				,"t_text"  		,100		,0    ,false); //0
 	GridObj.AddHeader("FLAG"			,"FLAG"					,"t_text"  		,100		,0    ,false); //0
 	GridObj.AddHeader("CHGO_DATE"		,"�ε� �����"				,"t_text"  		,100		,80    ,false); //0
 	GridObj.AddHeader("GUBN"			,"��������"				,"t_text"  		,100		,70    ,false); //0

 	
	GridObj.BoundHeader();	
	
	GridObj.SetColCellAlign('ORDER_NO',  		'center'); 
	GridObj.SetColCellAlign('BRAND_NO',  		'center'); 
	GridObj.SetColCellAlign('BOOKING_NO',  		'center'); 
	GridObj.SetColCellAlign('ITEM_ID',  		'center'); 
	GridObj.SetColCellAlign('SHIPPLAN_DATE',  	'center'); 
	GridObj.SetColCellAlign('ETD_DATE',  		'center'); 
	GridObj.SetColCellAlign('EXPORT_DECLARE',  	'center'); 
	GridObj.SetColCellAlign('CLOSING_DATE',  	'center'); 
	GridObj.SetColCellAlign('ZPLDAT',  			'center');
	GridObj.SetColCellAlign('LOCAL_DIV',  		'center'); 
	GridObj.SetColCellAlign('CENTER_CD',  		'center'); 
	GridObj.SetColCellAlign('DELIVERY_CD',  	'center'); 
	GridObj.SetColCellAlign('BOOKING_DATE',  	'center'); 
	GridObj.SetColCellAlign('BOOKING_USER',  	'center'); 
	GridObj.SetColCellAlign('BRAND_DATE',  		'center'); 
	GridObj.SetColCellAlign('BRAND_USER',  		'center'); 
	GridObj.SetColCellAlign('GUBN',  			'center'); 
	GridObj.SetColCellAlign('CHGO_DATE',  		'center'); 
	GridObj.SetColCellAlign('ROWNUM',  			'center');
	
	GridObj.SetNumberFormat("ORDER_QTY",       	"###,###.#");
	
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
        	
        	GridSetFlag();
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
		
   var start_date	    = document.frm.start_date.value;
   start_date 			= start_date.replace(/-/g,"");
   var end_date	    	= document.frm.end_date.value;
   end_date 			= end_date.replace(/-/g,"");
   var domain			= document.frm.domain.value;   
   var search_item		= document.frm.search_item.value;
   var search_order		= document.frm.search_order.value;
   var search_napum		= document.frm.search_napum.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("end_date",   		end_date);
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("domain",   		domain);
   GridObj.SetParam("search_item",		search_item);		
   GridObj.SetParam("search_order",		search_order);
   GridObj.SetParam("search_napum",		search_napum);
   GridObj.DoQuery(servlet_url);       
}


/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow) {
	
	

}

function GridSetFlag(){
	
	var rowcount = GridObj.GetRowCount();
	for (var i =0; i <rowcount; i++){
		
		var flag = GridObj.GetCellValue('FLAG',i);
		var gubn = GridObj.GetCellValue('GUBN',i);
		if( flag === 'F') 		GridObj.SetCellBgColor('ITEM_ID', i , '255|54|54');
		if( gubn === '�����') 	GridObj.SetCellBgColor('GUBN', i , '212|244|250');
		
	}
}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('ORDER_NO,BRAND_NO,BOOKING_NO,SHIPPLAN_DATE,ETD_DATE,EXPORT_DECLARE,CLOSING_DATE,ZPLDAT,LOCAL_DIV,CENTER_CD,'
	+'DELIVERY_CD,BOOKING_DATE,BOOKING_USER,BRAND_DATE,BRAND_USER,GUBN');
	
    GridObj.AddSummaryBar('SUMMARY1', '��ǥ�� ��', 'ORDER_NO', 'sum', 'ORDER_QTY');
    GridObj.AddSummaryBar('SUMMARY2', '��ü ��'	, 'summaryall', 'sum', 'ORDER_QTY');
    GridObj.SetSummaryBarColor('SUMMARY1', '0|153|0', '230|230|250');
 	GridObj.SetSummaryBarColor('SUMMARY2', '0|153|0', color_tot); 


}


