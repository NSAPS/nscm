//## ���α׷�ID      : sc_02190_planVsActualResultByPlant_list_new.js
//## ���α׷���      	 : ���庰 �����ȹ ��� ������ȸ(�ű�)
//## ������            	 : �̰���
//## ��������        	 : 2016-03-15 
//##
//## ���� job file   : job_sinc_20_scheduling.xml
//## ���� query file : query_sinc_20_scheduling_08.xml
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
var job_id = 'sc_02190_planVsActualResultByPlant_list_new';

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

	GridObj.AddHeader("ITEM_ID"	    ,"��ǰ�ڵ�"		,"t_text" 	   ,100	    ,70     ,false); //0   
 	GridObj.AddHeader("ITEM_NAME"	,"��ǰ��"	        ,"t_text" 	   ,100	    ,200    ,false); //0
 	GridObj.AddHeader("SPEC"	   	,"�԰�"	    	,"t_text"  	   ,100		,100    ,false); //0
 	GridObj.AddHeader("GUBN"	   	,"����"	    	,"t_text"  	   ,100		,50    ,false); //0
	GridObj.AddHeader("ANYANG"	   	,"�Ⱦ�"	    	,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("ANSUNG"	    ,"�ȼ�"       	,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("ANSUNG_B"   	,"�ȼ�����"		,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("ASAN"  	   	,"�ƻ�"			,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("KUMI"  	   	,"����"			,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("PUSAN"  	   	,"�λ�"			,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("NOKSAN"  	,"���"			,"t_number"    ,100.3	,90     ,false); //0
 	GridObj.AddHeader("TOTAL"  		,"�հ�"			,"t_number"    ,100.3	,90     ,false); //0
	
	GridObj.AddGroup	("PROD_PLAN",   "���庰");			
	GridObj.AppendHeader("PROD_PLAN", 	"ANYANG");
	GridObj.AppendHeader("PROD_PLAN", 	"ANSUNG");
	GridObj.AppendHeader("PROD_PLAN", 	"ANSUNG_B");
	GridObj.AppendHeader("PROD_PLAN",   "ASAN");
	GridObj.AppendHeader("PROD_PLAN",   "KUMI");
	GridObj.AppendHeader("PROD_PLAN",   "PUSAN");
	GridObj.AppendHeader("PROD_PLAN",   "NOKSAN");
	GridObj.BoundHeader();	

	GridObj.SetColFix('SPEC'); 
	
	GridObj.SetColCellAlign('SPEC',  	'left'); 
	GridObj.SetColCellAlign('GUBN',  	'center'); 
	GridObj.SetColCellAlign('ITEM_ID',  'center');
   	GridObj.SetNumberFormat("ANYANG",       "###,###.#");
    GridObj.SetNumberFormat("ANSUNG",       "###,###.#");
    GridObj.SetNumberFormat("ANSUNG_B",     "###,###.#");
    GridObj.SetNumberFormat("ASAN",       	"###,###.#");
    GridObj.SetNumberFormat("KUMI",       	"###,###.#");
    GridObj.SetNumberFormat("PUSAN",       	"###,###.#");
    GridObj.SetNumberFormat("NOKSAN",       "###,###.#");
	GridObj.SetNumberFormat("TOTAL",       	"###,###.#");
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
        	GridSetTotal();
        	GridSetColor();
        	
         
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
   start_date 			= start_date.replace(/-/g,"");
   end_date 			= end_date.replace(/-/g,"");
 
   var user_id			= document.frm._user_id.value;
   var ex_gubn	    	= document.frm.ex_gubn.value;   
   var mto_gubn	    	= document.frm.mto_gubn.value;
   var selected_type	= document.frm.selected_type.value;
   
   var checked_uom;
       
   if(document.frm.checked_uom[0].checked){

		checked_uom = document.frm.checked_uom[0].value;
		
	}else if(document.frm.checked_uom[1].checked){
			
		checked_uom = document.frm.checked_uom[1].value;
		
	}
	
	
       	
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj.SetParam("mode",           	"search");
   GridObj.SetParam("start_date",   	start_date);
   GridObj.SetParam("end_date",       	end_date);
   GridObj.SetParam("user_id",     		user_id);
   GridObj.SetParam("ex_gubn", 			ex_gubn);
   GridObj.SetParam("mto_gubn", 		mto_gubn);
   GridObj.SetParam("selected_type", 	selected_type);
   GridObj.SetParam("checked_uom", 		checked_uom);
  	
   GridObj.DoQuery(servlet_url);       
}


/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow) {

}

function GridSetMerge(){	
	
	GridObj.SetGroupMerge('ITEM_ID,ITEM_NAME,SPEC');
    //GridObj.AddSummaryBar('SUMMARY1', '�հ�', 'summaryall', 'sum', ''); 


}

function GridSetColor(){
	
	var rowcount = GridObj.GetMergeCount('ITEM_ID');   //�Ұ� �ε��� ���ϱ�
	
	for (var i=0; i < rowcount; i++){
		
		var idx				= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,true);
		GridObj.SetCellBgColor('GUBN', 		idx, color_tot);
		GridObj.SetCellBgColor('ANYANG', 	idx, color_tot);
		GridObj.SetCellBgColor('ANSUNG', 	idx, color_tot);
		GridObj.SetCellBgColor('ANSUNG_B', 	idx, color_tot);
		GridObj.SetCellBgColor('ASAN', 		idx, color_tot);
		GridObj.SetCellBgColor('KUMI', 		idx, color_tot);
		GridObj.SetCellBgColor('PUSAN', 	idx, color_tot);
		GridObj.SetCellBgColor('NOKSAN', 	idx, color_tot);
		GridObj.SetCellBgColor('TOTAL', 	idx, color_tot);
		
	}
}

function GridSetTotal(){
	
	GridObj.AddRow();
	GridObj.AddRow();
	GridObj.AddRow();
	GridObj.AddRow();
	
	var rowcount 	= GridObj.GetRowCount();
	var mergecount 	= GridObj.GetMergeCount('ITEM_ID'); 
	var plan_anyang 	= 0 ;
	var plan_ansung 	= 0 ;
	var plan_ansung_b 	= 0 ;
	var plan_asan 		= 0 ;
	var plan_kumi 		= 0 ;
	var plan_pusan 		= 0 ;
	var plan_noksan 	= 0 ;
	var plan_total 		= 0 ;
	var prod_anyang 	= 0 ;
	var prod_ansung 	= 0 ;
	var prod_ansung_b 	= 0 ;
	var prod_asan 		= 0 ;
	var prod_kumi 		= 0 ;
	var prod_pusan 		= 0 ;
	var prod_noksan 	= 0 ;
	var prod_total		= 0 ;
	var gap_anyang 		= 0 ;
	var gap_ansung 		= 0 ;
	var gap_ansung_b 	= 0 ;
	var gap_asan 		= 0 ;
	var gap_kumi 		= 0 ;
	var gap_pusan 		= 0 ;
	var gap_noksan 		= 0 ;
	var gap_total		= 0 ;
	
	
	for (var i =0; i < mergecount-4; i ++){
		
		var idx_start	= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,false);   //merge group�� ù��° row index
		var idx_end		= GridObj.GetRowIndexFromMergeIndex('ITEM_ID',i,true);    //merge group�� ������ row index
		
		var idx_plan_anyang		= GridObj.GetCellValue('ANYANG'		,idx_start);
		var idx_plan_ansung		= GridObj.GetCellValue('ANSUNG'		,idx_start);
		var idx_plan_ansung_b	= GridObj.GetCellValue('ANSUNG_B'	,idx_start);
		var idx_plan_asan		= GridObj.GetCellValue('ASAN'		,idx_start);
		var idx_plan_kumi		= GridObj.GetCellValue('KUMI'		,idx_start);
		var idx_plan_pusan		= GridObj.GetCellValue('PUSAN'		,idx_start);
		var idx_plan_noksan		= GridObj.GetCellValue('NOKSAN'		,idx_start);
		var idx_plan_total		= GridObj.GetCellValue('TOTAL'		,idx_start);
		var idx_prod_anyang		= GridObj.GetCellValue('ANYANG'		,idx_start + 1);
		var idx_prod_ansung		= GridObj.GetCellValue('ANSUNG'		,idx_start + 1);
		var idx_prod_ansung_b	= GridObj.GetCellValue('ANSUNG_B'	,idx_start + 1);
		var idx_prod_asan		= GridObj.GetCellValue('ASAN'		,idx_start + 1);
		var idx_prod_kumi		= GridObj.GetCellValue('KUMI'		,idx_start + 1);
		var idx_prod_pusan		= GridObj.GetCellValue('PUSAN'		,idx_start + 1);
		var idx_prod_noksan		= GridObj.GetCellValue('NOKSAN'		,idx_start + 1);
		var idx_prod_total		= GridObj.GetCellValue('TOTAL'		,idx_start + 1);
		var idx_gap_anyang		= GridObj.GetCellValue('ANYANG'		,idx_start + 2);
		var idx_gap_ansung		= GridObj.GetCellValue('ANSUNG'		,idx_start + 2);
		var idx_gap_ansung_b	= GridObj.GetCellValue('ANSUNG_B'	,idx_start + 2);
		var idx_gap_asan		= GridObj.GetCellValue('ASAN'		,idx_start + 2);
		var idx_gap_kumi		= GridObj.GetCellValue('KUMI'		,idx_start + 2);
		var idx_gap_pusan		= GridObj.GetCellValue('PUSAN'		,idx_start + 2);
		var idx_gap_noksan		= GridObj.GetCellValue('NOKSAN'		,idx_start + 2);
		var idx_gap_total		= GridObj.GetCellValue('TOTAL'		,idx_start + 2);
		
		plan_anyang 	+= Number(idx_plan_anyang);
		plan_ansung 	+= Number(idx_plan_ansung);
		plan_ansung_b 	+= Number(idx_plan_ansung_b);
		plan_asan 		+= Number(idx_plan_asan);
		plan_kumi 		+= Number(idx_plan_kumi);
		plan_pusan 		+= Number(idx_plan_pusan);
		plan_noksan 	+= Number(idx_plan_noksan);
		plan_total 		+= Number(idx_plan_total);
		prod_anyang 	+= Number(idx_prod_anyang);
		prod_ansung 	+= Number(idx_prod_ansung);
		prod_ansung_b 	+= Number(idx_prod_ansung_b);
		prod_asan 		+= Number(idx_prod_asan);
		prod_kumi 		+= Number(idx_prod_kumi);
		prod_pusan 		+= Number(idx_prod_pusan);
		prod_noksan 	+= Number(idx_prod_noksan);
		prod_total 		+= Number(idx_prod_total);
		gap_anyang 		+= Number(idx_gap_anyang);
		gap_ansung 		+= Number(idx_gap_ansung);
		gap_ansung_b 	+= Number(idx_gap_ansung_b);
		gap_asan 		+= Number(idx_gap_asan);
		gap_kumi 		+= Number(idx_gap_kumi);
		gap_pusan 		+= Number(idx_gap_pusan);
		gap_noksan 		+= Number(idx_gap_noksan);
		gap_total 		+= Number(idx_gap_total);
		
	}	
		
	GridObj.SetCellValue('ITEM_NAME', rowcount - 4,	'�հ�');
//	GridObj.SetCellValue('ITEM_NAME', rowcount - 3, '�հ�');
//	GridObj.SetCellValue('ITEM_NAME', rowcount - 2, '�հ�');
	GridObj.SetCellValue('ITEM_NAME', rowcount - 1, '�޼���(%)');
	
	GridObj.SetCellValue('GUBN', rowcount -	4, '��ȹ');
	GridObj.SetCellValue('GUBN', rowcount - 3, '����');
	GridObj.SetCellValue('GUBN', rowcount - 2, '����');
	
	
	GridObj.SetCellValue('ANYANG', rowcount - 4, plan_anyang);
	GridObj.SetCellValue('ANYANG', rowcount - 3, prod_anyang);
	GridObj.SetCellValue('ANYANG', rowcount - 2, gap_anyang);
	GridObj.SetCellValue('ANSUNG', rowcount - 4, plan_ansung);
	GridObj.SetCellValue('ANSUNG', rowcount - 3, prod_ansung);
	GridObj.SetCellValue('ANSUNG', rowcount - 2, gap_ansung);
	GridObj.SetCellValue('ANSUNG_B', rowcount - 4, plan_ansung_b);
	GridObj.SetCellValue('ANSUNG_B', rowcount - 3, prod_ansung_b);
	GridObj.SetCellValue('ANSUNG_B', rowcount - 2, gap_ansung_b);
	GridObj.SetCellValue('ASAN', rowcount - 4, plan_asan);
	GridObj.SetCellValue('ASAN', rowcount - 3, prod_asan);
	GridObj.SetCellValue('ASAN', rowcount - 2, gap_asan);
	GridObj.SetCellValue('KUMI', rowcount - 4, plan_kumi);
	GridObj.SetCellValue('KUMI', rowcount - 3, prod_kumi);
	GridObj.SetCellValue('KUMI', rowcount - 2, gap_kumi);
	GridObj.SetCellValue('PUSAN', rowcount - 4, plan_pusan);
	GridObj.SetCellValue('PUSAN', rowcount - 3, prod_pusan);
	GridObj.SetCellValue('PUSAN', rowcount - 2, gap_pusan);
	GridObj.SetCellValue('NOKSAN', rowcount - 4, plan_noksan);
	GridObj.SetCellValue('NOKSAN', rowcount - 3, prod_noksan);
	GridObj.SetCellValue('NOKSAN', rowcount - 2, gap_noksan);
	GridObj.SetCellValue('TOTAL', rowcount - 4, plan_total);
	GridObj.SetCellValue('TOTAL', rowcount - 3, prod_total);
	GridObj.SetCellValue('TOTAL', rowcount - 2, gap_total);
	
	GridSetGoal();
	
}


function GridSetGoal(){
	
	var rowcount 	= GridObj.GetRowCount();
	var anyang = 0;
	var ansung = 0;
	var ansung_b = 0;
	var asan = 0;
	var kumi = 0;
	var pusan = 0;
	var noksan = 0;
	var total = 0;
	if(GridObj.GetCellValue('ANYANG',rowcount-4)!="0") anyang	+= Math.round(Number(GridObj.GetCellValue('ANYANG',rowcount-3)/GridObj.GetCellValue('ANYANG',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('ANSUNG',rowcount-4)!="0") ansung	+= Math.round(Number(GridObj.GetCellValue('ANSUNG',rowcount-3)/GridObj.GetCellValue('ANSUNG',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('ANSUNG_B',rowcount-4)!="0") ansung_b	+= Math.round(Number(GridObj.GetCellValue('ANSUNG_B',rowcount-3)/GridObj.GetCellValue('ANSUNG_B',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('ASAN',rowcount-4)!="0") asan		+= Math.round(Number(GridObj.GetCellValue('ASAN',rowcount-3)/GridObj.GetCellValue('ASAN',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('KUMI',rowcount-4)!="0") kumi		+= Math.round(Number(GridObj.GetCellValue('KUMI',rowcount-3)/GridObj.GetCellValue('KUMI',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('PUSAN',rowcount-4)!="0") pusan		+= Math.round(Number(GridObj.GetCellValue('PUSAN',rowcount-3)/GridObj.GetCellValue('PUSAN',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('NOKSAN',rowcount-4)!="0") noksan	+= Math.round(Number(GridObj.GetCellValue('NOKSAN',rowcount-3)/GridObj.GetCellValue('NOKSAN',rowcount-4))/0.0001) * 0.01;
	if(GridObj.GetCellValue('TOTAL',rowcount-4)!="0") total		+= Math.round(Number(GridObj.GetCellValue('TOTAL',rowcount-3)/GridObj.GetCellValue('TOTAL',rowcount-4))/0.0001) * 0.01;
	
	
	GridObj.SetCellValue('ANYANG',rowcount-1,anyang);
	GridObj.SetCellValue('ANSUNG',rowcount-1,ansung);
	GridObj.SetCellValue('ANSUNG_B',rowcount-1,ansung_b);
	GridObj.SetCellValue('ASAN',rowcount-1,asan);
	GridObj.SetCellValue('KUMI',rowcount-1,kumi);
	GridObj.SetCellValue('PUSAN',rowcount-1,pusan);
	GridObj.SetCellValue('NOKSAN',rowcount-1,noksan);
	GridObj.SetCellValue('TOTAL',rowcount-1,total);
	
}



