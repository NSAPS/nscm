//## ���α׷�ID		: ip_03040_Pos_Singlelist.js
//## ���α׷���		: ǰ�� POS DATA �м�
//## ������			: �̰���
//## ��������			: 2016-04-12
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
var job_id = 'ip_03040_Pos_Singlelist';

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
	
	GridObj.AddHeader("CNFM_DATE"	   	,"����"  		,"t_text"     	,100		,80     ,false); //0   
	GridObj.AddHeader("DAY"	   			,"����"  		,"t_text"     	,100		,40     ,false); //0   
	GridObj.AddHeader("EMART_EXPT"		,"�������"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("EMART_POS"	    ,"POS�Ǹŷ�"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("EMART_NS"		,"��ɰ��޷�"	    ,"t_number" 	,100.3	    ,90    	,false); //0
 	GridObj.AddHeader("HOME_EXPT"		,"�������"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("HOME_POS"	    ,"POS�Ǹŷ�"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("HOME_NS"			,"��ɰ��޷�"	    ,"t_number" 	,100.3	    ,90    	,false); //0
 	GridObj.AddHeader("LOTTE_EXPT"		,"�������"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("LOTTE_POS"	    ,"POS�Ǹŷ�"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("LOTTE_NS"		,"��ɰ��޷�"	    ,"t_number" 	,100.3	    ,90    	,false); //0
 	GridObj.AddHeader("TOT_EXPT"		,"�������"		,"t_number" 	,100.3	    ,90     ,true); //0   
 	GridObj.AddHeader("TOT_POS"	    	,"POS�Ǹŷ�"		,"t_number" 	,100.3	    ,90     ,false); //0   
 	GridObj.AddHeader("TOT_NS"			,"��ɰ��޷�"	    ,"t_number" 	,100.3	    ,90    	,false); //0
 	
 	GridObj.AddGroup	("EMART",	"�̸�Ʈ");
 	GridObj.AppendHeader("EMART", 	"EMART_EXPT");
 	GridObj.AppendHeader("EMART", 	"EMART_POS");
 	GridObj.AppendHeader("EMART", 	"EMART_NS");
 	
 	GridObj.AddGroup	("HOME",	"Ȩ�÷���");
 	GridObj.AppendHeader("HOME", 	"HOME_EXPT");
 	GridObj.AppendHeader("HOME", 	"HOME_POS");
 	GridObj.AppendHeader("HOME", 	"HOME_NS");
 	
 	GridObj.AddGroup	("LOTTE",	"�Ե���Ʈ");
 	GridObj.AppendHeader("LOTTE", 	"LOTTE_EXPT");
 	GridObj.AppendHeader("LOTTE", 	"LOTTE_POS");
 	GridObj.AppendHeader("LOTTE", 	"LOTTE_NS");
 	
 	GridObj.AddGroup	("TOT",		"��");
 	GridObj.AppendHeader("TOT", 	"TOT_EXPT");
 	GridObj.AppendHeader("TOT", 	"TOT_POS");
 	GridObj.AppendHeader("TOT", 	"TOT_NS");
 	
	GridObj.BoundHeader();	
	
	GridObj.SetColCellAlign('CNFM_DATE',  	'center'); 
	GridObj.SetColCellAlign('DAY',  		'center'); 
	GridObj.SetNumberFormat("EMART_EXPT",       "###,###.#");
    GridObj.SetNumberFormat("EMART_POS",       	"###,###.#");
    GridObj.SetNumberFormat("EMART_NS",     	"###,###.#");
    GridObj.SetNumberFormat("HOME_EXPT",       	"###,###.#");
    GridObj.SetNumberFormat("HOME_POS",       	"###,###.#");
    GridObj.SetNumberFormat("HOME_NS",       	"###,###.#");
    GridObj.SetNumberFormat("LOTTE_EXPT",       "###,###.#");
    GridObj.SetNumberFormat("LOTTE_POS",       	"###,###.#");
    GridObj.SetNumberFormat("LOTTE_NS",     	"###,###.#");
    GridObj.SetNumberFormat("TOT_EXPT",       	"###,###.#");
    GridObj.SetNumberFormat("TOT_POS",       	"###,###.#");
    GridObj.SetNumberFormat("TOT_NS",       	"###,###.#");
    
    GridObj.SetColCellBgColor('EMART_EXPT','255|255|200');
    GridObj.SetColCellBgColor('HOME_EXPT','255|255|200');
    GridObj.SetColCellBgColor('LOTTE_EXPT','255|255|200');
    GridObj.SetColCellBgColor('TOT_EXPT','255|255|200');
  
   
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
   var servlet_url      = Project_name+"/servlet/com.wisegrid.admin."+job_id;
   var gubn				= ""; 

   
   commonUtil.getSelQeury( "item_id", item_id, "ip_03040_trans_id",{
	callback:function(result){
			
		document.frm.pos_id.value 	= result[0][1];								
		
		}
				 
	});
	
   if(confirm("�ش� ǰ���� ��ȸ �Ͻðڽ��ϱ�?") == 1 ){
   	   		
	   if( start_date < "20160617") gubn = "1";			//gubn = 1  ���� POS ��ȸ ��� ����
	   else gubn = "2";   
	   
   		//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
	   GridObj.SetParam("mode",           		"search");
	   GridObj.SetParam("start_date",   		start_date);
	   GridObj.SetParam("end_date",   			end_date);
	   GridObj.SetParam("item_id",   			item_id);
	   GridObj.SetParam("pos_id",   			document.frm.pos_id.value);
	   GridObj.SetParam("gubn",					gubn);	
	   
	   GridObj.DoQuery(servlet_url);
   
   }else{
   	
	return ; 
	  	
   }
  
  	       
}


/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellDblClick(strColumnKey, nRow) {


}

function GridSetMerge(){	
	
	GridObj.AddSummaryBar('SUMMARY', '��'	, 'summaryall', 'sum', 'EMART_EXPT,EMART_POS,EMART_NS,HOME_EXPT,HOME_POS,HOME_NS,LOTTE_EXPT,LOTTE_POS,LOTTE_NS,TOT_EXPT,TOT_POS,TOT_NS');  
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



