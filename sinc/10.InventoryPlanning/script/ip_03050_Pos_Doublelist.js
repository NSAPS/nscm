//## ���α׷�ID		: ip_03050_Pos_Doublelist.js
//## ���α׷���		: POS DATA �񱳺м�
//## ������			: �̰���
//## ��������			: 2016-04-14
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
var job_id = 'ip_03050_Pos_Doublelist';

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
	
	GridObj.AddHeader("CNFM_DATE"	   	,"����"  			,"t_text"     	,100		,80     ,false); //0   
	GridObj.AddHeader("EMART_I"			,"ǰ��-I POS"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("EMART_II"	    ,"ǰ��-II POS"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("EMART_GAP"		,"���̷�"	    		,"t_number" 	,100.3	    ,90    	,false); //0
 	GridObj.AddHeader("HOME_I"			,"ǰ��-I POS"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("HOME_II"	    	,"ǰ��-II POS"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("HOME_GAP"		,"���̷�"	    		,"t_number" 	,100.3	    ,90    	,false); //0
 	GridObj.AddHeader("LOTTE_I"			,"ǰ��-I POS"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("LOTTE_II"	    ,"ǰ��-II POS"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("LOTTE_GAP"		,"���̷�"	    		,"t_number" 	,100.3	    ,90    	,false); //0
 	GridObj.AddHeader("TOT_I"			,"ǰ��-I POS"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("TOT_II"	    	,"ǰ��-II POS"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("TOT_GAP"			,"���̷�"	    		,"t_number" 	,100.3	    ,90    	,false); //0
 	
 	GridObj.AddGroup	("EMART",	"�̸�Ʈ");
 	GridObj.AppendHeader("EMART", 	"EMART_I");
 	GridObj.AppendHeader("EMART", 	"EMART_II");
 	GridObj.AppendHeader("EMART", 	"EMART_GAP");
 	
 	GridObj.AddGroup	("HOME",	"Ȩ�÷���");
 	GridObj.AppendHeader("HOME", 	"HOME_I");
 	GridObj.AppendHeader("HOME", 	"HOME_II");
 	GridObj.AppendHeader("HOME", 	"HOME_GAP");
 	
 	GridObj.AddGroup	("LOTTE",	"�Ե���Ʈ");
 	GridObj.AppendHeader("LOTTE", 	"LOTTE_I");
 	GridObj.AppendHeader("LOTTE", 	"LOTTE_II");
 	GridObj.AppendHeader("LOTTE", 	"LOTTE_GAP");
 	
 	GridObj.AddGroup	("TOT",		"��");
 	GridObj.AppendHeader("TOT", 	"TOT_I");
 	GridObj.AppendHeader("TOT", 	"TOT_II");
 	GridObj.AppendHeader("TOT", 	"TOT_GAP");
 	
	GridObj.BoundHeader();	
	
	GridObj.SetColCellAlign('CNFM_DATE',  	'center'); 

	GridObj.SetNumberFormat("EMART_I",       	"###,###.#");
    GridObj.SetNumberFormat("EMART_II",       	"###,###.#");
    GridObj.SetNumberFormat("EMART_GAP",     	"###,###.#");
    GridObj.SetNumberFormat("HOME_I",       	"###,###.#");
    GridObj.SetNumberFormat("HOME_II",       	"###,###.#");
    GridObj.SetNumberFormat("HOME_GAP",       	"###,###.#");
    GridObj.SetNumberFormat("LOTTE_I",       	"###,###.#");
    GridObj.SetNumberFormat("LOTTE_II",       	"###,###.#");
    GridObj.SetNumberFormat("LOTTE_GAP",     	"###,###.#");
    GridObj.SetNumberFormat("TOT_I",       		"###,###.#");
    GridObj.SetNumberFormat("TOT_II",       	"###,###.#");
    GridObj.SetNumberFormat("TOT_GAP",       	"###,###.#");
    
    
   
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
    }else if(endMode == "save"){
    	
    	doQuery();
    	
		
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
   var start_date	    = document.frm.start_date.value;
   start_date 			= start_date.replace(/-/g,"");
   var end_date	    	= document.frm.end_date.value;
   end_date 			= end_date.replace(/-/g,"");
   var item_id			= document.frm.item_id.value;
   var item_id2			= document.frm.item_id2.value;
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
 
   //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   GridObj.SetParam("mode",           		"search");
   GridObj.SetParam("start_date",   		start_date);
   GridObj.SetParam("end_date",   			end_date);
   GridObj.SetParam("item_id",   			item_id);
   GridObj.SetParam("item_id2",   			item_id2);
   GridObj.DoQuery(servlet_url);       
}


/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow) {


}

function GridSetMerge(){	
	
	GridObj.AddSummaryBar('SUMMARY', '��'	, 'summaryall', 'sum', 'EMART_I,EMART_II,EMART_GAP,HOME_I,HOME_II,HOME_GAP,LOTTE_I,LOTTE_II,LOTTE_GAP,TOT_I,TOT_II,TOT_GAP');  
 	GridObj.SetSummaryBarColor('SUMMARY', '0|153|0', color_tot); 


}

function getItemName(objBox) {

	if( objBox.value == "" || objBox.value == null ) {

		document.frm.item_name.value = "";

		return;

	}

	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 

		callback:function(arrList){

			// ��ġ�ϴ� ��ǰ ����

			if( arrList.length == 1 ) {

				objBox.value = arrList[0][0];

				document.frm.item_name.value = arrList[0][1];

			}

			else if( arrList.length > 1){							

				document.frm.item_name.value = "";

			}

			else {

				return;

			}

		}

	});

}


function getItemName2(objBox) {

	if( objBox.value == "" || objBox.value == null ) {

		document.frm.item_name2.value = "";

		return;

	}

	commonUtil.getCodeInfo("input_value", objBox.value, "search_item_id_and_item_name_by_item_input", { 

		callback:function(arrList){

			// ��ġ�ϴ� ��ǰ ����

			if( arrList.length == 1 ) {

				objBox.value = arrList[0][0];

				document.frm.item_name2.value = arrList[0][1];

			}

			else if( arrList.length > 1){							

				document.frm.item_name2.value = "";

			}

			else {

				return;

			}

		}

	});

}



