/*������������������������������������������������������������������������������������������
  ���� ��ư�� JOB_ID�� ����.
  ������������������������������������������������������������������������������������������*/    
    var job_id  = 'expenseFactoryResult_list01'; //�޴� �ְ� Ŭ���� JOB_ID
    var job_id1 = 'expenseFactoryResult_list01'; //A��ư Ŭ���� JOB_ID
    var job_id2 = 'expenseFactoryResult_list02'; //B��ư Ŭ���� JOB_ID
    var job_id3 = 'expenseFactoryResult_list03'; //C��ư Ŭ���� JOB_ID
    var job_id4 = 'expenseFactoryResult_list04'; //D��ư Ŭ���� JOB_ID
    
    //document.cookie = "webfxtab_tabPane1=1";    

/*������������������������������������������������������������������������������������������������������������������������������������
  ��WiseGrid ������Ʈ�� �����ǰ� �ʱ�ȭ�� �� �߻���. 
  ��JavaScript Event�� Initialize()�� �޾� �׸����� ����� �����Ѵ�.
  ������������������������������������������������������������������������������������������������������������������������������������*/
   function init() {
   	
       setProperty(GridObj);//WiseGrid Default���� �κ� (WiseGrid_Property.js���� ���� ����Ǿ� �ִ�.)
       setHeader(GridObj);  //�ش�����
       setDefault();        
   }


/*������������������������������������������������������������������������
  ����ư Ŭ���� ���� �Լ� ȣ��
  ������������������������������������������������������������������������*/   
   function btn_div(btn){
   	//alert(btn+"��ưŬ��!");
   	
   	B_Value = btn;
   	
   	if(btn == "A"){
   		setHeader(GridObj);
   	}
   	if(btn == "B"){
   		setHeader(GridObj);
   	}
   	if(btn == "C"){
   		setHeader(GridObj);
   	}
   	if(btn == "D"){
   		setHeader(GridObj);
   	}
   	
   }


/*������������������������������������������������������������������������
  ����ư Ȱ��ȭ ��Ȱ��ȭ ����.
  ������������������������������������������������������������������������*/      
	function display(str){
	    var form = document.all;
	    if(str=="A"){
	        form.btn1.disabled  = true;
	        form.btn2.disabled  = false;
	        form.btn3.disabled  = false;
	        form.btn4.disabled  = false;
	    }if(str=="B"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = true;
             form.btn3.disabled  = false;
             form.btn4.disabled  = false;
	    }
	    if(str=="C"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = false;
             form.btn3.disabled  = true;
             form.btn4.disabled  = false;
	    }
	    if(str=="D"){
             form.btn1.disabled  = false;
             form.btn2.disabled  = false;
             form.btn3.disabled  = false;
             form.btn4.disabled  = true;
	    }
    }
   
   
/*������������������������������������������������������������������������
  ��ȭ�� �⺻ ���� �κ�.
  ������������������������������������������������������������������������*/
   function setDefault()
   { 
        //�׸����� ��� Ŭ���� ���ñ�� Ȱ��ȭ. ��, �׷캴�ո�忡���� ����ϸ� �ȵ�.
    	//GridObj.strHDClickAction    = "sortsingle";
   }
       
       
       
/*������������������������������������������������������������������������
  ��version �޺��ڽ� ����,,,
  ������������������������������������������������������������������������*/
  //��ȹ���� �޺��ڽ� ���ÿ� ���� ǰ����� �޺��ڽ� ��ȭ. 1
   function versionCombo()
   { 
   		//alert("versionCombo ��Ǿ�!!");
   		var version = document.all.version.value;
   		//alert("version : "+version);
  	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("version", version , "expenseFactoryResult_list_combo_item_list",versionComboResult);
   }   

/*������������������������������������������������������������������������
  ��version �޺��ڽ� ����,,,�����!
  ������������������������������������������������������������������������*/
  ////��ȹ���� �޺��ڽ� ���ÿ� ���� ǰ����� �޺��ڽ� ��ȭ. 2
   function versionComboResult(result)
   {
       var comboRs = '';
       
       //alert("result : "+ result);
       //alert("result length : " + result.length);
       
       //�޺��ڽ��� �⺻���� ���� �ɼ� ��. All
	   document.all.item_list.options[0] = new Option("All","");       
       
       for( var i=1 ;i<result.length+1 ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
       {
           //             0         1
           //comboRs [item_id, item_name] ���� �����.
           comboRs = result[i-1].split('!%!');
           //alert("comboRS : "+comboRs);
           
           //                                                item_name , item_id
           //                                                  text��,     value��
           //document.all.item_list.options[i] = new Option(result[i],result[i-1]);
           document.all.item_list.options[i] = new Option(comboRs[1],comboRs[0]);
       }
   }

  
  
       
/*������������������������������������������������������������������������
  ���ش�����
  ������������������������������������������������������������������������*/
   
   function setHeader(GridObj) 
   {
   	
   		//�޴�Ŭ���� �⺻���� Ÿ�� ��.
   		if(B_Value == "Z"){
   	    //public static ArrayList<String> getCodeList(String paramKey, String paramCode, String queryId)
       	commonUtil.getCodeList("job_id", job_id , "gird_header_list",defaultHeader);
   		}   	
		//��ư�� Ŭ���� ���� ��� ���� ȣ��!   	
   	    if(B_Value == "A"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id1 , "gird_header_list",defaultHeader);
   	    }
   	    if(B_Value == "B"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id2 , "gird_header_list",defaultHeader);
   	    }
   	    if(B_Value == "C"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id3 , "gird_header_list",defaultHeader);
   	    }   	    
   	    if(B_Value == "D"){
	   	   GridObj.ClearGrid();
	       commonUtil.getCodeList("job_id", job_id4 , "gird_header_list",defaultHeader);
   	    }  
   }




/*������������������������������������������������������������������������
  ��DB�� ��ϵ� ȭ�� �ش� ������ �����´�.
  ������������������������������������������������������������������������*/

   function defaultHeader(result)
   {
       var test = '';
       var arrHeader = '';
       for( var i=0 ;i<result.length ;i++) //��ü Row��ŭ �ݺ� �Ѵ�.
       {
           arrHeader = result[i].split('!%!');
           GridObj.AddHeader(arrHeader[1]  ,arrHeader[2]  ,arrHeader[3]  ,arrHeader[4]  ,arrHeader[5]  ,arrHeader[6])        
       }
       
         //�ش� �׷����
//       GridObj.AddGroup("GR_REASON","����");  //��¥ �׷�
//       GridObj.AppendHeader("GR_REASON","R01_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_NAME");
//       GridObj.AppendHeader("GR_REASON","R02_COUNT");
//       GridObj.AppendHeader("GR_REASON","R02_PERCENT");

	   //alert("GRidObj.....�ٿ�� ��!");
	   GridObj.BoundHeader();

         //Hidden �÷�
//       GridObj.SetColHide("REASON01",true);
//       GridObj.SetColHide("REASON02",true);
       doQuery();
   }






             
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
   }
      


/*������������������������������������������������������������������������
  ���׸����� �� ��Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
    function GridCellClick(strColumnKey, nRow){
		//alert(strColumnKey+''+nRow);
    }
    
    
/*������������������������������������������������������������������������
  ���׸����� �� ����Ŭ�� �̺�Ʈ
  ������������������������������������������������������������������������*/
    function GridCellDblClick(strColumnKey, nRow){
    	if(B_Value == "A"){
    		
    	}
    	else if(B_Value == "B"){
    		
    	}
    	else if(B_Value == "C"){
    		//�׸����� �ش� �ο� ����Ŭ���� item_id �÷��� dcpath5 �÷��� �� ���� �Ķ���ͷ� �ѱ�.
    		//��, dcpath5 �÷��� ������ null�� ��쿡�� dcpath4 �÷��� ������ �Ķ���ͷ� �ѱ�.
    		
    		//alert("�� ����Ŭ��!!");
    		s_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("s_item_id : "+s_item_id);
    		
    		s_dcpath5_4 = GridObj.GetCellValue('dcpath5_cd',nRow);
    		//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		
    		if(s_dcpath5_4 == " "){
    			s_dcpath5_4 = GridObj.GetCellValue('dcpath4_cd',nRow);
    			//alert("s_dcpath5_4 : "+s_dcpath5_4);
    		}
    		//alert("�� ����Ŭ�� ��!");
    		
    		//����Ŭ���� �Ķ���͸� ������ ȭ����ȯ�� �ϱ����� ������.
    		B_Value = "D";
    		display(B_Value);
			setHeader(GridObj);
    	}
    	else if(B_Value == "D"){
    		//�׸����� �ش� �ο� ����Ŭ���� item_id �÷��� tgt_loc �÷��� �� ���� �Ķ���ͷ� �ѱ�.
    		
    		
    		
    		//alert("D �� ����Ŭ��!!");
    		st_item_id = GridObj.GetCellValue('item_id',nRow);
    		//alert("st_item_id : "+st_item_id);
    		
    		st_tgt_loc = GridObj.GetCellValue('tgt_loc',nRow);
    		//alert("st_tgt_loc : "+st_tgt_loc);
    		
    		document.all.st_item_id.value = st_item_id;
    		document.all.st_tgt_loc.value = st_tgt_loc;
    		
    		popup(st_item_id, st_tgt_loc);
    	}

    	
    }  

   
/*������������������������������������������������������������������������
  ��ù��° �׸����� ��ȸ ������ ȣ�� Fnc
  ������������������������������������������������������������������������*/
   function doQuery() 
   {
   	   //�޴� Ŭ���� �⺻ ����
       if(B_Value == "Z"){
       var servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id;
       }
       
       //��ư�� ���� JOB ID ����.
       if(B_Value == "A"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id1;
       }
       if(B_Value == "B"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id2;
       }
       if(B_Value == "C"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id3;
       }
       if(B_Value == "D"){
       	servlet_url = Project_name+"/servlet/com.wisegrid.admin."+job_id4;
       }
       
       var version = document.all.version.value;
       var res_code = document.all.res_code.value;
       var item_list = document.all.item_list.value;
       var path2 = document.all.path2.value;
       var path4 = document.all.path4.value;
       
       //alert("version : "+ version);
       //alert("res_code : "+res_code);
       //alert("item_list : "+item_list);
       //alert("path2 : "+path2);
       //alert("path4 : "+path4);

       //var startDate = document.all.start_date.value;
       //var endDate   = document.all.end_date.value;
       //var plant_id  = document.all.selected_plant.value;
       
       //�Ѱ��� �����������.( �Ķ���� ���� �κ� )
       GridObj.SetParam("mode", "search");
       GridObj.SetParam("version", version);
       GridObj.SetParam("res_code", res_code);
       GridObj.SetParam("item_list", item_list);
       GridObj.SetParam("path2", path2);
       GridObj.SetParam("path4", path4);
       
       GridObj.SetParam("s_item_id", s_item_id);
       GridObj.SetParam("s_dcpath5_4", s_dcpath5_4);
              
       //GridObj.SetParam("startDate", startDate);
       //GridObj.SetParam("endDate", endDate);
       //GridObj.SetParam("plant_id", plant_id);
       GridObj.DoQuery(servlet_url);
   }

   
   

/*����������������������������������������������������������������������������������������������������������������
  �������� ��ȸ�� ���������� �Ϸ�Ǹ� �߻��Ǵ� Event�� ���� Fnc
  ����������������������������������������������������������������������������������������������������������������*/
    function GridEndQuery() 
    {
        var mode = GridObj.GetParam("mode");
        var error_msg = '';
          
        var arrA = '';
        var arrB = '';
        var arrC = '';
        
        if(mode == "search") //��ȸ�� �Ϸ�� ���
        {
            if(GridObj.GetStatus() == "true") 
            {
            	//A��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "A"){
            		
            		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
	                GridObj.strHDClickAction    = "select";
            		
            		//�����͸� �׷��� �Ѵ�.
	                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                
	                //���� ������ ����
	                GridObj.SetColCellAlign('cat06','left');
	                GridObj.SetColCellAlign('cat06_name','left');
	                GridObj.SetColCellAlign('item_id','left');
	                GridObj.SetColCellAlign('item_name','left');
	                GridObj.SetColCellAlign('spec','left');
	                GridObj.SetColCellAlign('gubun','center');
	                GridObj.SetColCellAlign('anyang','right');
	                GridObj.SetColCellAlign('anseong','right');
	                GridObj.SetColCellAlign('anseong_u','right');
	                GridObj.SetColCellAlign('asan','right');
	                GridObj.SetColCellAlign('gumi','right');
	                GridObj.SetColCellAlign('busan','right');
	                GridObj.SetColCellAlign('noksan','right');
	                GridObj.SetColCellAlign('total','right');
	                
	                /*
	                GridObj.SetColCellSortEnable('cat06',true)
	                GridObj.SetColCellSortEnable('cat06_name',true)
	                GridObj.SetColCellSortEnable('item_id',true)
	                GridObj.SetColCellSortEnable('item_name',true)
	                GridObj.SetColCellSortEnable('spec',true)
	                GridObj.SetColCellSortEnable('gubun',true)
	                GridObj.SetColCellSortEnable('anyang',true)
	                GridObj.SetColCellSortEnable('anseong',true)
	                GridObj.SetColCellSortEnable('anseong_u',true)
	                GridObj.SetColCellSortEnable('asan',true)
	                GridObj.SetColCellSortEnable('gumi',true)
	                GridObj.SetColCellSortEnable('busan',true)
	                GridObj.SetColCellSortEnable('noksan',true)
	                GridObj.SetColCellSortEnable('total',true)
	                */
	                
	                
	                //�׸��� �÷� ���� �Լ� ȣ��.
                	gridColSet(GridObj);
                	
            	}
            	//B��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "B"){
            		
            		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
	                GridObj.strHDClickAction    = "select";
            		
            		//�����͸� �׷��� �Ѵ�.
	                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name");
	                
	                //���� ������ ����
	                GridObj.SetColCellAlign('cat06','left');
	                GridObj.SetColCellAlign('cat06_name','left');
	                GridObj.SetColCellAlign('item_id','left');
	                GridObj.SetColCellAlign('item_name','left');
	                GridObj.SetColCellAlign('spec','left');
	                GridObj.SetColCellAlign('plant_id','left');
	                GridObj.SetColCellAlign('plant_name','left');
	                GridObj.SetColCellAlign('real_fix_cost','right');
	                GridObj.SetColCellAlign('real_chg_cost','right');
	                GridObj.SetColCellAlign('qty_by_rate','right');
	                GridObj.SetColCellAlign('plant_ratio_by_rate','right');
	                GridObj.SetColCellAlign('qty_by_cost','right');
	                GridObj.SetColCellAlign('plant_ratio_by_cost','right');
	                GridObj.SetColCellAlign('item_qty_gap','center');
	                
	                //�׸��� �÷� ���� �Լ� ȣ��.
                	gridColSet(GridObj);
	                
            	}
            	//C��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "C"){
            		//�����͸� �׷��� �Ѵ�.
	                //GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
	                
	                //�׸����� ��� Ŭ���� ���ñ�� Ȱ��ȭ.
	                GridObj.strHDClickAction    = "sortsingle";
	                
	                //���� ������ ����
	                GridObj.SetColCellAlign('cat06','left');
	                GridObj.SetColCellAlign('cat06_name','left');
	                GridObj.SetColCellAlign('item_id','left');
	                GridObj.SetColCellAlign('item_name','left');
	                GridObj.SetColCellAlign('spec','left');
	                GridObj.SetColCellAlign('dcpath1','left');
	                GridObj.SetColCellAlign('dcpath2','left');
	                GridObj.SetColCellAlign('dcpath3','left');
	                GridObj.SetColCellAlign('dcpath4','left');
	                GridObj.SetColCellAlign('dcpath5','left');
	                GridObj.SetColCellAlign('qty','right');
	                GridObj.SetColCellAlign('box_amt','right');
	                GridObj.SetColCellAlign('total_amt','right');
	                GridObj.SetColCellAlign('dcpath4_cd','left');
	                GridObj.SetColCellAlign('dcpath5_cd','left');
	                
	                //�ο� ������ Ȱ��ȭ
	                //GridObj.bRowSelectorVisible = true;
            	}
            	//D��ư Ŭ���� ����Ǵ� GridEndQuery
            	if(B_Value == "D"){
            		
            		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
	                GridObj.strHDClickAction    = "select";            		
            		
            		//�����͸� �׷��� �Ѵ�.
	                GridObj.SetGroupMerge("so_id,dc_type,rdc,item_id");
            		
	                //���� ������ ����
	                GridObj.SetColCellAlign('so_id','right');
	                GridObj.SetColCellAlign('dc_type','left');
	                GridObj.SetColCellAlign('rdc','left');
	                GridObj.SetColCellAlign('item_id','left');
	                GridObj.SetColCellAlign('res_id','left');
	                GridObj.SetColCellAlign('pre_dctype','left');
	                GridObj.SetColCellAlign('pre_dc','left');
	                GridObj.SetColCellAlign('qty','left');
	                GridObj.SetColCellAlign('src_loc','left');
	                GridObj.SetColCellAlign('src_loc_name','left');
	                GridObj.SetColCellAlign('tgt_loc','left');
	                GridObj.SetColCellAlign('tgt_loc_name','left');
	                GridObj.SetColCellAlign('cost_amt','right');
	                GridObj.SetColCellAlign('box_per_palet','right');
	                
	                
	                //�ش� �÷��� ����.
	                GridObj.SetColHide('so_id', true);
	                
	                //alert("�÷� ���� ��!");
	                //�׸��� �÷� ���� �Լ� ȣ��.
                	gridColSet(GridObj);
            	}
            	
            	//�޴� Ŭ���� �⺻ ����.
            	if(B_Value == "Z"){

           		//�׸����� ��� Ŭ���� ���ñ�� ��Ȱ��ȭ �� �����÷��� ��� ������ ���õȰ� �Ѵ�.
                GridObj.strHDClickAction    = "select";
            		
                //�����͸� �׷��� �Ѵ�.
                GridObj.SetGroupMerge("cat06,cat06_name,item_id,item_name,spec");
                //���� ������ ����
                GridObj.SetColCellAlign('cat06','center');
                GridObj.SetColCellAlign('cat06_name','left');
                GridObj.SetColCellAlign('item_id','left');
                GridObj.SetColCellAlign('item_name','left');
                GridObj.SetColCellAlign('spec','left');
                GridObj.SetColCellAlign('gubun','center');
                GridObj.SetColCellAlign('anyang','right');
                GridObj.SetColCellAlign('anseong','right');
                GridObj.SetColCellAlign('anseong_u','right');
                GridObj.SetColCellAlign('asan','right');
                GridObj.SetColCellAlign('gumi','right');
                GridObj.SetColCellAlign('busan','right');
                GridObj.SetColCellAlign('noksan','right');
                GridObj.SetColCellAlign('total','right');
                
                //�׸��� �÷� ���� �Լ� ȣ��.
                gridColSet(GridObj);
            	}
            } else    
            { 
                error_msg = GridObj.GetMessage(); 
                alert(error_msg);            
            }
        }
    }
    
    
/*������������������������������������������������������������������������
  ����ȸ ��ư Ŭ���� ����.
  ������������������������������������������������������������������������*/
GoSearch = function() {

	// ��ȸ�� WAITING �̹��� �����ֱ�
	viewWait();
	
	//alert("hllo");
	doQuery();
};



   
/*������������������������������������������������������������������������������������������������
  ���׸����� �����Ͱ� ���� �Ǿ��� ��� ó���Ǵ� Fnc
  ������������������������������������������������������������������������������������������������*/
   
//   function GridChangeCell(strColumnKey, nRow) 
//   {
       /*
       if(strColumnKey != "SELECTED") {
           //??? ? SELECTED ?? ??? ??? ?? ???. 
           GridObj.SetCellValue("SELECTED", nRow, "1");
       }
       */
 //  }    
    

   
/*������������������������������������������������������������������������
  ��EXCEL
  ������������������������������������������������������������������������*/
   /* EXCEL ???? */
   function excelDown() {
       var GridObj = document.WiseGrid;
       //???? ???? ???? PC? ??? ????. SetColHide()? ??? ??? ???? ???. 
       GridObj.ExcelExport("", "", true, true);
   }

   

/*������������������������������������������������������������������������
  ��getdatetime
  ������������������������������������������������������������������������*/
   function getdatetime() {
       var today = new Date();
       var year = today.getYear();
       var month = today.getMonth() + 1;
       var day = today.getDate();
       
       if(month < 10)
           month = "0" + month;
           
       if(day < 10)
           day = "0" + day;
   
       document.frm.to_date.value = year + "" + month + "" + day;
   }
   

  
  


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
        
        /*
        if( search_menu.style.display == "none" ) 
        { 
            tabHeightValue += Number(search_h); 
            tableHeightValue += Number(search_h); 
        }
        */ 
        
        // ȭ�� size ��� �� ȭ���� �ʹ� �۾� �׸��� ũ�Ⱑ ������ �Ǹ� ������ ���Ƿ� �� ��� ������ 1�� ���� 
        // ==> ȭ���� ���̻� ��ҵ��� ���� 
        if( tabHeightValue < 1 ) 
            tabHeightValue = 1; 
        if( tableHeightValue < 1 ) 
            tableHeightValue = 1; 
        
        //tabPage1.style.height = tabHeightValue + "px"; 
        //tbMain.style.height = tableHeightValue + "px"; 
        document.WiseGrid.height = tableHeightValue + "px"; 
//        document.WiseGrid2.height = tableHeightValue + "px"; 
        
    }  
           


/*������������������������������������������������������������������������
  ��MOUSE OVER ��, ROW ���� ��ȯ
  ������������������������������������������������������������������������*/
function GridMouseOver(strType, strColumnKey, nRow){
	
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
	if(B_Value == "C"){
		// ����� ���۾���
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '230|230|230');		
	}
	if(B_Value == "D"){
		// ����� ���۾���
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '230|230|230');
	}

	 
}

/*������������������������������������������������������������������������
  ��MOUSE OUT ��, ROW ���� ����
  ������������������������������������������������������������������������*/
function GridMouseOut(strType, strColumnKey, nRow){
	
	if(B_Value == "A"){
		
	}
	if(B_Value == "B"){
		
	}
	if(B_Value == "C"){	
	
		// ����� ���۾���
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '255|255|255');
	}
	if(B_Value == "D"){
		
		// ����� ���۾���
		if( nRow == -1 )
			return;
		
		//var GridObj = document.WiseGrid;
		//GridObj.SetRowBgColor(nRow, '255|255|255');		
		
	}
}



/*������������������������������������������������������������������������
  ���˾� �ٿ�� �ϱ�!!
  ������������������������������������������������������������������������*/
function popup(str1, str2){
//	var plant_id   = document.frm.selected_plant.value ;
//    var sdate = document.frm.sdate.value;
//    var edate = document.frm.edate.value;
    
//    document.frm.weekCnt.value = weekCnt;

	//alert("str1 : "+str1);
	//alert("str2 : "+str2);

	//���������� ȭ�鿡�� ���Ǵ� �׸��� ���� �Ķ���ʹ� doQuery() �κп��� �Ѱ��ݴϴ�.
	//���� �Ķ���ʹ� ȭ����� �ּ��ʿ� ��µɶ� ���Ǵ� �����Դϴ�. 
    var paramString  = "";
        paramString  = "&st_item_id=" + str1;
        paramString += "&st_tgt_loc=" + str2;
        
//    paramString = "&plant_id=" + plant_id;
//    paramString+= "&sdate="    + sdate;
//    paramString+= "&edate="    + edate;
//    paramString+= "&weekCnt="  + weekCnt;
       
    
    var fileName = "expenseFactoryResult_popup";
    var service_url = "service.do?_moon_service="+fileName+"&_moon_perpage=200&_moon_pagenumber=1" + paramString;
    //var newWin = window.showModalDialog(service_url, self, "dialogLeft:0px; dialogTop:0px; dialogWidth:800px; dialogHeight:480px ; dialogScrollbars=no");
    
    var pop_win_style = "titlebar=no, menubar=no, toolbar=no, status=yes, scrollbars=no, resizable=yes, width=1000, height=400, top=0, left=0";
	var newWin = window.open(service_url, "expenseFactoryResult_popup", pop_win_style);
	newWin.focus();
    
//    if(newWin == -1)
//    {
//        GoSearch('xx');
//    }
}


 /*������������������������������������������������������������������������
   ���׸��� �÷� Set �÷� �����ϱ�!!
   ������������������������������������������������������������������������*/
    function gridColSet(obj)
    {
    	//���� �׸����� �� �ο� ����.
        var rowLeng = obj.GetRowCount();
            
        var colBGColor='255|255|255';
            
		if(B_Value == "Z" || B_Value == "A"){//�⺻ Z �� A ��ư Ŭ���� ����.
			
	        for( var row=0 ; row<rowLeng ; row++ ) //row����ŭ �ݺ�
	        {
	            
	            if(obj.GetCellValue('anyang',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun�÷��� Portion �ο찡 0% �ƴϸ� �۾��� ���� �Ѵ�.
	                {
	                    obj.SetCellFontBold("anyang", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('anseong',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun�÷��� Portion �ο찡 0% �ƴϸ� �۾��� ���� �Ѵ�.
	                {
	                    obj.SetCellFontBold("anseong", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('anseong_u',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun�÷��� Portion �ο찡 0% �ƴϸ� �۾��� ���� �Ѵ�.
	                {
	                    obj.SetCellFontBold("anseong_u", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('asan',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun�÷��� Portion �ο찡 0% �ƴϸ� �۾��� ���� �Ѵ�.
	                {
	                    obj.SetCellFontBold("asan", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('gumi',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun�÷��� Portion �ο찡 0% �ƴϸ� �۾��� ���� �Ѵ�.
	                {
	                    obj.SetCellFontBold("gumi", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('busan',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun�÷��� Portion �ο찡 0% �ƴϸ� �۾��� ���� �Ѵ�.
	                {
	                    obj.SetCellFontBold("busan", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('noksan',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun�÷��� Portion �ο찡 0% �ƴϸ� �۾��� ���� �Ѵ�.
	                {
	                    obj.SetCellFontBold("noksan", row, 'true');
	                }
	            }
	            if(obj.GetCellValue('total',row) != '0%' && obj.GetCellValue('gubun',row) == "Portion"){
	            	for(var col=7 ;col<=14 ;col++) //gubun�÷��� Portion �ο찡 0% �ƴϸ� �۾��� ���� �Ѵ�.
	                {
	                    obj.SetCellFontBold("total", row, 'true');
	                }
	            }
	            
	            
	            
	            //Row �������÷������� �����Ѵ�.
	            if(obj.GetCellValue('gubun',row) == "Portion")
	            {
	                
	                colBGColor='233|233|233';
	                
	                for( var col=6 ;col<=14 ;col++) 
	                {
	                	  //ROW���� �÷� ������ �����Ѵ�
	                    obj.SetCellBgColor("gubun", row, colBGColor) ;
	                    obj.SetCellBgColor("anyang", row, colBGColor);
	                    obj.SetCellBgColor("anseong", row, colBGColor);
	                    obj.SetCellBgColor("anseong_u", row, colBGColor);
	                    obj.SetCellBgColor("asan", row, colBGColor);
	                    obj.SetCellBgColor("gumi", row, colBGColor);
	                    obj.SetCellBgColor("busan", row, colBGColor);
	                    obj.SetCellBgColor("noksan", row, colBGColor);
	                    obj.SetCellBgColor("total", row, colBGColor);
	                }
	            }
	        }        
		}// �⺻ "Z", "A"��ư Ŭ���� if �� ��!!!!!!!!!!!!!!!!!!!!.
		if(B_Value == "B"){		//"B"��ư Ŭ���� ����!
			for( var row=0 ; row<rowLeng ; row++ ) //row����ŭ �ݺ�
	        {
	        	if(obj.GetCellValue('item_qty_gap',row) != ' ' && obj.GetCellValue('plant_id',row) == " "){//item_qty_gap�÷��� ' '�� �ƴϸ� �۾��� ���� �Ѵ�.
	            	for(var col=1 ;col<=14 ;col++) 
	                {
	                	obj.SetCellFontBold("cat06", row, 'true');
	                	obj.SetCellFontBold("cat06_name", row, 'true');
	                	obj.SetCellFontBold("item_id", row, 'true');
	                	obj.SetCellFontBold("item_name", row, 'true');
	                	obj.SetCellFontBold("spec", row, 'true');
	                    obj.SetCellFontBold("qty_by_rate", row, 'true');
	                    obj.SetCellFontBold("qty_by_cost", row, 'true');
	                    obj.SetCellFontBold("item_qty_gap", row, 'true');
	                }
	            }
	        	
	            //Row �������÷������� �����Ѵ�.
	            if(obj.GetCellValue('plant_id',row) == " ")
	            {
	                colBGColor='233|233|233';
	                
	                for( var col=1 ;col<=14 ;col++) 
	                {
	                	//ROW���� �÷� ������ �����Ѵ�
	                	obj.SetCellBgColor("cat06", row, colBGColor) ;
	                	obj.SetCellBgColor("cat06_name", row, colBGColor) ;
	                    obj.SetCellBgColor("item_id", row, colBGColor) ;
	                    obj.SetCellBgColor("item_name", row, colBGColor);
	                    obj.SetCellBgColor("spec", row, colBGColor);
	                    obj.SetCellBgColor("plant_id", row, colBGColor);
	                    obj.SetCellBgColor("plant_name", row, colBGColor);
	                    obj.SetCellBgColor("real_fix_cost", row, colBGColor);
	                    obj.SetCellBgColor("real_chg_cost", row, colBGColor);
	                    obj.SetCellBgColor("qty_by_rate", row, colBGColor);
	                    obj.SetCellBgColor("plant_ratio_by_rate", row, colBGColor);
	                    obj.SetCellBgColor("qty_by_cost", row, colBGColor);
	                    obj.SetCellBgColor("plant_ratio_by_cost", row, colBGColor);
	                    obj.SetCellBgColor("item_qty_gap", row, colBGColor);
	                }
	            }
	        } 
		}//"B"��ư Ŭ���� if�� ���� ��!!!!!!!!!!!!!!!!!!!!!!
		if(B_Value == "D"){		//"D"��ư Ŭ���� ����!
		
			var rowLeng_D = obj.GetRowCount();
		
			if(rowLeng_D >= 1){ //D��ư Ŭ���� �ο� ī��Ʈ�� 1�̻��϶��� ���� ����!
			
				//so_id �÷��� �ʱⰪ�� ����.
				var so_id = obj.GetCellValue('so_id',1);
				
				for( var row=0 ; row<rowLeng ; row++ ) //row����ŭ �ݺ�
		        {
					
		            //Row �������÷������� �����Ѵ�.
		            //�ʱ� ������ so_id���� ���� so_id�� �ο� �������� ������ ���� ĥ��. 
		            if(obj.GetCellValue('so_id',row) == so_id)
		            {
		            	//���� ĥ������ ���� ���. ���� so_id���� ���� ������ ĥ����.
		            	//so_id�� �޶����� ���� ĥ������ ���� ȸ���� ��.
		            	if(colBGColor != '255|255|255'){
		            		colBGColor='233|233|233';
		            	}else{
		            		colBGColor='255|255|255';
		            	}
		                
		                //�÷��� ���� �����ϴ� �κ�.
		                for( var col=1 ; col<=14 ;col++) 
		                {
		                	//ROW���� �÷� ������ �����Ѵ�
		                    obj.SetCellBgColor("dc_type", row, colBGColor) ;
		                    obj.SetCellBgColor("rdc", row, colBGColor);
		                    obj.SetCellBgColor("item_id", row, colBGColor);
		                    obj.SetCellBgColor("res_id", row, colBGColor);
		                    obj.SetCellBgColor("pre_dctype", row, colBGColor);
		                    obj.SetCellBgColor("pre_dc", row, colBGColor);
		                    obj.SetCellBgColor("qty", row, colBGColor);
		                    obj.SetCellBgColor("src_loc", row, colBGColor);
		                    obj.SetCellBgColor("src_loc_name", row, colBGColor);
		                    obj.SetCellBgColor("tgt_loc", row, colBGColor);
		                    obj.SetCellBgColor("tgt_loc_name", row, colBGColor);
		                    obj.SetCellBgColor("cost_amt", row, colBGColor);
		                    obj.SetCellBgColor("box_per_palet", row, colBGColor);
		                    obj.SetCellBgColor("so_id", row, colBGColor);
		                }
		            }else if(obj.GetCellValue('so_id',row) != so_id){ //so_id���� �޶����� ���� �ٲٱ����� ����. �̺κ��� so_id���� �ѹ��� Ÿ�� �Ǿ� ����.
		            	
		            	//���� ���õ� ���� ����̹Ƿ� so_id�� �ٲ�鼭 ������, ȸ���� �����ϴ� �κ�.
		            	if(colBGColor != '233|233|233'){
		            		colBGColor='233|233|233';	
		            	}else{
		            		colBGColor='255|255|255';
		            	}
		            	
		            	for( var col=1 ;col<=14 ;col++) 
		                {
		                	//ROW���� �÷� ������ �����Ѵ�
		                    obj.SetCellBgColor("dc_type", row, colBGColor) ;
		                    obj.SetCellBgColor("rdc", row, colBGColor);
		                    obj.SetCellBgColor("item_id", row, colBGColor);
		                    obj.SetCellBgColor("res_id", row, colBGColor);
		                    obj.SetCellBgColor("pre_dctype", row, colBGColor);
		                    obj.SetCellBgColor("pre_dc", row, colBGColor);
		                    obj.SetCellBgColor("qty", row, colBGColor);
		                    obj.SetCellBgColor("src_loc", row, colBGColor);
		                    obj.SetCellBgColor("src_loc_name", row, colBGColor);
		                    obj.SetCellBgColor("tgt_loc", row, colBGColor);
		                    obj.SetCellBgColor("tgt_loc_name", row, colBGColor);
		                    obj.SetCellBgColor("cost_amt", row, colBGColor);
		                    obj.SetCellBgColor("box_per_palet", row, colBGColor);
		                    obj.SetCellBgColor("so_id", row, colBGColor);
		                    
		                    so_id = obj.GetCellValue('so_id',row);//so_id�� �ʱⰪ�� ������.
		                }
		            }
		        }
			} //�ο�ī��Ʈ 1�̻��� if�� ��.
		}//"D"��ư Ŭ���� if�� ���� ��!!!!!!!!!!!!!!!!!!!!!!
	}






// ��ȸ �� waiting �̹��� �����ֱ�
function viewWait() { 
	
	if( document.all.waitArea ) {
		if( waitArea.style.display.toUpperCase() == "NONE" ) {
			gridArea.style.display = "none";
			waitArea.style.display = "block";
		}
		else {
			gridArea.style.display = "block";
			waitArea.style.display = "none";
		}
	}
	
}


// enter check �� 
function enterCheck(obj, frm_name){
	
	if( pressedStrCheck() != false ) { 
		if(event.keyCode =='13'){
			getItemName(obj);
	// �ڱ�ȭ�� ����
	//		GoSearch();
		}
	} 
}



