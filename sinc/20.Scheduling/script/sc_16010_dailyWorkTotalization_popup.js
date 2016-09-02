//############################################################
//## ���α׷�ID      : sc_16010_dailyWorkTotalization_list.vm
//## ���α׷���      : �ϰ������ȹ �Ϻ� �ٹ� ����
//## ������          : ���米
//## ��������        : 
//##
//## ���� job file   : job_sc_16010_dailyWorkTotalization_list.xml
//## ���� query file : query_sc_16010_dailyWorkTotalization_list.xml
//##
//## REVISIONS
//## VER        DATE        AUTHOR    DESCRIPTION
//## ---------  ----------  --------  ------------------------------------
//## 
//##
//############################################################
/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//

var mode = '';
var hRowCount = 0; //�ݺ������� �����Ǵ� �ش��� Count ��.
var class_path = "com.wisegrid.admin.";						// ���� ��Ű��(class ���� ���)
var job_id = 'sc_16010_dailyWorkTotalization_popup';

var GridObj;

var GridHeaderString = "";

var color01 = '188|210|238'; // ���� ����
var color02 = '238|180|180'; // �޵� ����

var weekCnt = 1;

/******************************************          Action Function         **********************************************/

/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch(service) 
{
    doQuery();    
}
  
/*������������������������������������������������������������������������
  ��ȭ�鿡 '����'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSave  (service)
{
	//doSave();
}
 

/*******************************************   WiseGrid �ʱ�ȭ �� ����  *****************************************************/

/*����������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ����������������������������������������������������������������������������������������������������������������������������*/
function init() {
	
	GridObj = document.WiseGrid;
	
	setProperty(GridObj); //WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
    //setDefault();        //ȭ�� �⺻ ���� 
    setHeader();  //�ش����� 
    
}

/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault()
{
}
       
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader() 
{      
    var plant_id = opener.document.frm.selected_plant.value;
    commonUtil.getCodeList("plant_id", plant_id , "daily_header3",defaultHeader); 
}

/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
function defaultHeader(result){
	
    var arrHeader = '';
    var len = result.length;
    var plant_id = opener.document.frm.selected_plant.value;
    
	GridObj.AddHeader("WEEK" , "����" , "t_text" , 8 , 55 , false);	
	
	// ��� ����
    for( var i=0 ;i<len ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
    {
        arrHeader = result[i].split('!%!');
        GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
    }
    commonUtil.getCodeList("plant_id", plant_id , "daily_header3_name",headerResult);  
}


/*������������������������������������������������������������������������
  ���ش��� Text Name�� �����´�.
  ������������������������������������������������������������������������*/
   function headerResult(result)
   {
       var dateArray = ''; //��¥Row�� '!%!'�������� �迭�� ����� ���� ����.
       var headerCount  = 1;   
       hRowCount = result.length;
       for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
       {
            dateArray = '';
            dateArray = result[i].split('!%!'); //'!%!'�� ���е� �����͸� split�Ͽ� �迭�� �����Ѵ�.
            //�ش� �׷����
            GridObj.AddGroup("LINE_GRP"+headerCount,dateArray[0]);  //���� �׷�
            GridObj.AppendHeader("LINE_GRP"+headerCount,"CNT_SHIFT"+headerCount);
            GridObj.AppendHeader("LINE_GRP"+headerCount,"NORMAL"+headerCount);
            GridObj.AppendHeader("LINE_GRP"+headerCount,"EXTENSION"+headerCount);
            GridObj.AppendHeader("LINE_GRP"+headerCount,"DAY_OFF"+headerCount);
            GridObj.AppendHeader("LINE_GRP"+headerCount,"OFF_DAY_WORK"+headerCount);
            
            headerCount++;
       }
       GridObj.BoundHeader();
       
       GridObj.SetColFix('WEEK');
       
       
       doQuery();
    
   }

/***********************************************   WiseGrid ���  **********************************************************/

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() {
	
	mode = "search";
	
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;
	
	var plant_id = opener.document.frm.selected_plant.value;
	var sdate    = opener.document.frm.sdate.value;
	var edate    = opener.document.frm.edate.value;
	var weekCnt  = opener.document.frm.weekCnt.value;     
	
	GridObj.SetParam("mode", mode);
	
	//����
	GridObj.SetParam("plant_id", plant_id);
	//������
	GridObj.SetParam("sdate", sdate);
	//������
	GridObj.SetParam("edate", edate);
	//����
	GridObj.SetParam("weekCnt", weekCnt);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� ������
	GridObj.DoQuery(servlet_url);

}

/*������������������������������������������������������������������������
  ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/	
function doSave() {
 
	var servlet_url = Project_name+"/servlet/" + class_path + job_id;

	//WiseGrid�� ������ ������ mode�� �����Ѵ�.
	GridObj.SetParam("mode", "save");
    	
    // ����
    GridObj.SetParam("weekCnt", weekCnt);
    
    // ������
    GridObj.SetParam("sdate", document.frm.sdate.value);
    	
	// user_id
	GridObj.SetParam("user_id", document.frm._user_id.value);
	
	//WiseGrid�� ������ ��Žÿ� �����͸� ������
	GridObj.DoQuery(servlet_url, "CRUD");
 
}

/* INSERT */
function doInsert() {
    
    GridObj.SetParam("mode", "insert");

    GridObj.DoQuery(servlet_url, "SELECTED");
}

/* UPDATE */
function doUpdata() {
	
    GridObj.SetParam("mode", "update");

    GridObj.DoQuery(servlet_url, "SELECTED");
}

/* DELETE */
function doDelete() {
    
    GridObj.SetParam("mode", "delete");

    GridObj.DoQuery(servlet_url, "SELECTED");
}

/*******************************************   WiseGrid ��� ��  ����  ******************************************************/

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery() 
{
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
    
    if(mode == "search") //��ȸ�� �Ϸ�� ���
    {
        if(GridObj.GetStatus() == "true") 
        {                           
        	                                
            //�����͸� �׷��� �Ѵ�.                                                     
	        //GridObj.SetColCellAlign("IDX_QTY" + i,'right');      
	        var rowLeng = GridObj.GetRowCount();	            
	        
	        for(var i=1 ; i<=hRowCount ; i++)
	        {
	            GridObj.SetColCellAlign("CNT_SHIFT" + i,'right');      
	            GridObj.SetColCellAlign("NORMAL" + i,'right');      
	            GridObj.SetColCellAlign("EXTENSION" + i,'right');      
	            GridObj.SetColCellAlign("DAY_OFF" + i,'right');      
	            GridObj.SetColCellAlign("OFF_DAY_WORK" + i,'right');   
	            GridObj.SetColCellBgColor("LINE_DIV" + i,'242|242|242'); 
	            
	            
	            for( var row=0 ;row<rowLeng ;row++) //0�ΰ��� ȸ������ �Ѵ�.
	            {
    	            if(GridObj.GetCellValue("CNT_SHIFT"+i,row)=='0')
    	                GridObj.SetCellFgColor("CNT_SHIFT"+i, row, '230|230|230');
    
    	            if(GridObj.GetCellValue("NORMAL"+i,row)=='0')
    	                GridObj.SetCellFgColor("NORMAL"+i, row, '230|230|230');
    
    	            if(GridObj.GetCellValue("EXTENSION"+i,row)=='0')
    	                GridObj.SetCellFgColor("EXTENSION"+i, row, '230|230|230');
    	            else 
    	                GridObj.SetCellFontBold("EXTENSION"+i, row, 'true');  

    	            if(GridObj.GetCellValue("DAY_OFF"+i,row)=='0')
    	                GridObj.SetCellFgColor("DAY_OFF"+i, row, '230|230|230');
    	            else 
    	            {
    	                GridObj.SetCellFgColor("DAY_OFF"+i, row, '0|0|255');
    	                //GridObj.SetCellFontBold("DAY_OFF"+i, row, 'true');  
                    }
    
    	            if(GridObj.GetCellValue("OFF_DAY_WORK"+i,row)=='0')
    	                GridObj.SetCellFgColor("OFF_DAY_WORK"+i, row, '230|230|230');
    	            else 
    	                GridObj.SetCellFgColor("OFF_DAY_WORK"+i, row, '255|0|0');
	            }

	        }
        } else    
        { 
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
}


/*********************************************   WiseGrid Event   *********************************************************/

/*������������������������������������������������������������������������
  ���׸����� �����Ͱ� ���� �Ǿ��� ��� ó���Ǵ� Fnc
  ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow) 
{

} 

/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow){     

}        

/*������������������������������������������������������������������������
  ���׸����� ���� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/        
function GridCellDblClickHandler(strColumnKey, nRow){
	
}

/*********************************************   ��Ÿ Function   **********************************************************/

/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
function setWiseGridAutoResize( tab_h, table_h ){
    
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
    
    //tabPage1.style.height = tabHeightValue + "px"; 
    //tbMain.style.height = tableHeightValue + "px"; 
	document.WiseGrid.height = tableHeightValue + "px"; 	 
        
}     
 
/*������������������������������������������������������������������������
  ������ ���� Fnc
  ������������������������������������������������������������������������*/	
function onChangeDate(obj){
	alert("!!");
	GridObj.ClearGrid();
	setHeader(GridObj);
	//doQuery();
	//GridObj2.ClearGrid();
	//setHeader2(GridObj2);
	//doQuery2();
}

