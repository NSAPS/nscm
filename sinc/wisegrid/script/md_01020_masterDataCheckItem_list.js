/************************************************************************************************************************************/
/**********************************************  WiseGrid Java Script   *************************************************************/
/************************************************************************************************************************************/

//-----------------------------------------             ���� ����            ----------------------------------------------//

var job_id = 'md_01020_masterDataCheckItem_list';
var job_id2= 'md_01020_masterDataCheckItem_list02';
 
var GridObj;
var GridObj2;
var GridHeaderString = "";

/******************************************          Action Function         **********************************************/

/*������������������������������������������������������������������������
  ��ȭ�鿡 '��ȸ'�� ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function GoSearch() {
	
	doQuery2();
	
}

/*******************************************   WiseGrid �ʱ�ȭ �� ����  *****************************************************/

/*������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻��ϴ� 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ������������������������������������������������������������������������*/
function init() { 
	
	GridObj = document.WiseGrid;
    setProperty(GridObj);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setDefault(GridObj);        //ȭ�� �⺻ ���� 
    setHeader();  //�ش����� 
}
   
function init2() {
	
	GridObj2= document.WiseGrid2;   		
    setProperty(GridObj2);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
	setDefault(GridObj2);        //ȭ�� �⺻ ���� 
    setHeader2();  //�ش����� 
}   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
function setDefault(GridObj){ 

	//Hearder ����
	GridObj.nHDLineSize   = 10;
    
    //����� ���μ��� �����Ѵ�. 
    GridObj.nHDLines = 2; 		
}
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
function setHeader(){   
	     
    commonUtil.getCodeList("job_id", job_id , "gird_header_list", defaultHeader); 
       
}
   
function setHeader2(){  
	      
    commonUtil.getCodeList("job_id", job_id2 , "gird_header_list", defaultHeader2); 
       
}

/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
function defaultHeader(result){
	
	var test = '';
	var arrHeader = '';
	for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
	{
	    arrHeader = result[i].split('!%!');
	    GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
	}
	//�ش� �׷����
	//GridObj.AddGroup("GR_REASON","����");  //��¥ �׷�
	
	GridObj.BoundHeader();
	
	//Hidden �÷� 
	//GridObj.SetColHide("REASON01",true);
	
	//�÷� ����
	GridObj.SetColCellAlign('DATA_TYPE','center');
	GridObj.SetColCellAlign('ITEM_TYPE','center');
	GridObj.SetColCellAlign('ITEM_DETAIL_FLAG','center');
	GridObj.SetColCellAlign('LINE_SETTING_FLAG','center');
	GridObj.SetColCellAlign('BOM_MASTER_FLAG','center');	
	
	doQuery();              
}
               
/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/
function defaultHeader2(result){
	
   	var test = '';
   	var arrHeader = '';
   	for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
   	{
       arrHeader = result[i].split('!%!');
       GridObj2.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6]);        
   	}
   	//�ش� �׷����
  	//GridObj2.AddGroup("GR_QTY","����");  //��/�� �׷�
  	
  	GridObj2.BoundHeader();

   	////Hidden �÷� 
   	//GridObj2.SetColHide("R02_NAME",true); 
    
	//�÷� ����
	GridObj2.SetColCellAlign('DATA_EXISTS','center');
              
}

/***********************************************   WiseGrid ���  **********************************************************/

/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery() {
	
   	var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

   	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   	GridObj.SetParam("mode", "search");
   	GridObj.SetParam("query_id", job_id);
   	
   	GridObj.DoQuery(servlet_url);
}

/*������������������������������������������������������������������������
  ���ι�° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
function doQuery2() {
	
    var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;

   	var item_id = document.all.item_id.value;
   	
   	if( item_id == "" || item_id == null) {
   		alert("���� ��ǰ�� �����Ͻʽÿ�.");
   		return;
   	}
   	      
   	//�Ѱ��� �����������.( �Ķ���� ���� �κ� )
   	GridObj2.SetParam("mode", "search2");
   	GridObj2.SetParam("item_id", item_id);
   	GridObj2.SetParam("query_id", job_id2);
   	
	GridObj2.DoQuery(servlet_url);
}
   
/*******************************************   WiseGrid ��� ��  ����  ******************************************************/

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery(){
	
    var mode = GridObj.GetParam("mode");
    var error_msg = '';
      
    if(mode == "search"){ //��ȸ�� �Ϸ�� ���
        if(GridObj.GetStatus() == "true"){ 
			for( i = 0 ; i < GridObj.GetRowCount() ; i++) {
				if( GridObj.GetCellValue("DATA_TYPE", i) == "DATA ���� ��"){
					GridObj.SetRowBgColor(i, "255|255|160");
				}
			}                                               
        } else {
         
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }
}
    

/*������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ������������������������������������������������������������������������*/
function GridEndQuery2(){
    
    var mode = GridObj2.GetParam("mode");
    var error_msg = '';
      
    if(mode == "search2"){ //��ȸ�� �Ϸ�� ���
        if(GridObj.GetStatus() == "true"){ 

        } else {     
            error_msg = GridObj.GetMessage(); 
            alert(error_msg);            
        }
    }

}

/*********************************************   WiseGrid Event   *********************************************************/
  
/*������������������������������������������������������������������������
  ���׸����� �����Ͱ� ���� �Ǿ��� ��� ó���Ǵ� Fnc
  ������������������������������������������������������������������������*/
function GridChangeCell(strColumnKey, nRow) {

}    
  
/*������������������������������������������������������������������������
  ���׸����� �� Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
function GridCellClick(strColumnKey, nRow){     

}        

/*********************************************   ��Ÿ Function   **********************************************************/

/*������������������������������������������������������������������������
  ���׸����� ������ ���� Fnc
  ������������������������������������������������������������������������*/
function setGridAutoResize2( tab_h, table_h ){
    
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
    document.WiseGrid2.height = tableHeightValue + "px"; 
    
}  

// ��ǰ �Է�â�� �Է��� ���� ��ġ�ϴ� ��ǰ �˻� ��, ��ġ�ϴ� ��ǰ�� ������ ��ǰ �ڵ�, ��ǰ �� ǥ��
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
			else {
				document.frm.item_name.value = "";
				var itemid = objBox.value;
				openCodeSearchPop('item_id', 'item_name', '400', '300');
				return;
			}
		}
	});
	
}

// ��ǰ �˻� popup
// create pop-up : search item
// code_input : code input(search value) input-box name 
// w_size : size of popup window width, h_size : size of popup window height ==> optional parameter 
function openItemSearchPop( code_input, w_size, h_size ) { 

	// popup â�� input box ǥ�� data : search code 
	var code_input = document.getElementById(code_input).value; 

	if( !(w_size) ) { 
		var w_size = 400; 
		var h_size = 400; 
	} 
	
	var service_url = "service.do?_moon_service=item_search_popup&code_input=" + code_input; 
	service_url += "&_moon_perpage=200&_moon_pagenumber=1"; 
	
	var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=" + w_size + ", height=" + h_size + ", top=0, left=0"; 
	var newWin = window.open(service_url, "Code_Search", pop_win_style); 
	newWin.focus(); 
	
}