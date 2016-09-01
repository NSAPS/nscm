//md_01060_itemMasterManagement_list_new
package com.wisegrid.admin;                                                                                                  
                                                                                                                             
                                                                                                                             
import java.io.IOException;                                                                                                  
import java.io.PrintWriter;                                                                                                  
import java.sql.SQLException;                                                                                                
import java.util.ArrayList;                                                                                                  
                                                                                                                             
import javax.servlet.ServletException;                                                                                       
import javax.servlet.http.HttpServlet;                                                                                       
import javax.servlet.http.HttpServletRequest;                                                                                
import javax.servlet.http.HttpServletResponse;                                                                               
                                                                                                                             
import com.zionex.t3sinc.common.CommonUtil;                                                                                  
import xlib.cmc.GridData;                                                                                                    
import xlib.cmc.OperateGridData;                                                                                             
                                                                                                                             
                                                                                                                             
import java.sql.Connection;                                                                                                  
import java.sql.ResultSet;                                                                                                   
import java.sql.Statement;                                                                                                   
import java.util.HashMap;                                                                                                    
import java.util.Iterator;                                                                                                   
import java.util.LinkedList;                                                                                                 
import java.util.Map;                                                                                                        
                                                                                                                             
import com.zionex.t3sinc.util.db.SincDatabaseUtility;                                                                        
/**                                                                                                                          
 *                                                                                                                           
 * @author iCOMPIA CORP.                                                                                                     
 */                                                                                                                          
public class md_01060_itemMasterManagement_list_new extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;                                                                                              
	//Map sessionMap 	= new HashMap();                                                                                     
	                                                                                                                         
	SincDatabaseUtility databaseUtility = new SincDatabaseUtility();	                                                     
                                                                                                                             
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {               
		GridData gdReq = null;                                                                                               
		GridData gdRes = null;                                                                                               
                                                                                                                             
        System.out.println("START...");                                                                                      
                                                                                                                             
		// Encode Type; UTF-8                                                                                                
		req.setCharacterEncoding("UTF-8");                                                                                   
		res.setContentType("text/html;charset=UTF-8");                                                                       
		                                                                                                                     
		PrintWriter out = res.getWriter();                                                                                   
		try {                                                                                                                
			// WISEGRID_DATA Param WiseGridG                                                                                 
			String rawData = req.getParameter("WISEGRID_DATA");                                                              
			                                                                                                                 
			gdReq = OperateGridData.parse(rawData);                                                                          
                                                                                                                             
			String mode = gdReq.getParam("mode");                                                                            
			System.out.println("Test :: mode = " + mode);                                                                    
                                                                                                                             
			if (mode.equals("search")) //                                                                                    
				gdRes = doQuery(gdReq);                                                                                      
			else if (mode.equals("search2")) //                                                                               
				gdRes = doQuery2(gdReq);                                                                                     
			else if (mode.equals("save")) //                                                                               
				gdRes = doSave(gdReq);
			else if (mode.equals("save2")) //                                                                               
				gdRes = doSave2(gdReq);
			
			
			
		
		} catch (Exception e) {                                                                                              
			gdRes = new GridData();                                                                                          
			gdRes.setMessage("Error: " + e.getMessage());                                                                    
			gdRes.setStatus("false");                                                                                        
			e.printStackTrace();                                                                                             
		} finally {                                                                                                          
			try {                                                                                                            
				//                                                                                                           
				OperateGridData.write(gdRes, out);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	
	// DW 1 ��ȸ  ����
	public GridData doQuery(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;

		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            

			String domain		= gdReq.getParam("domain");                                                            
			String item_type	= gdReq.getParam("item_type");                                                            
			String serch_word	= gdReq.getParam("serch_word");                                                            
			String sell_stop_date	= gdReq.getParam("sell_stop_date");                                                            
			                                                                                                                 
			String paramKey   ="domain!%!item_type!%!serch_word!%!sell_stop_date";                                                                      
			String paramCode  = domain+"!%!"+item_type+"!%!"+serch_word+"!%!"+sell_stop_date;

			String query_id   = "md_01060_itemMasterManagement_list";

			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);

			rowCount = qResult.size();

			//
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}


			String query_id2;	
			String query_id5;
			ArrayList<ArrayList<String>> cdList; 
			int arrIdx;
			String[] cd;
			String[] cdName;
				
			/* CAT03 �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "REPL_PROD_GRP", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("CAT03 �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("CAT03 �÷��� �޺�����Ʈ set");
			gdRes.getHeader("CAT03").setComboValues(cdName, cd );
			
			/* CAT06 �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "CAT06", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("CAT06 �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("CAT06 �÷��� �޺�����Ʈ set");
			gdRes.getHeader("CAT06").setComboValues(cdName, cd );
			

			/* �����ڵ� �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id5 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id5);
			cdList = new CommonUtil().getSelQeury("cd_grp", "EX_NATION", query_id5);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("�����ڵ� �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("EX_NATION �÷��� �޺�����Ʈ set");
			gdRes.getHeader("EX_NATION").setComboValues(cdName, cd );

			/* SALES_PLAN_APPL_HIST �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "SALES_PLAN_APPL_CODE", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("SALES_PLAN_APPL_HIST �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("SALES_PLAN_APPL_HIST �÷��� �޺�����Ʈ set");
			gdRes.getHeader("SALES_PLAN_APPL_HIST").setComboValues(cdName, cd );

			/* CAT07 �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "TRANS_STOP", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("CAT07 �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("CAT07 �÷��� �޺�����Ʈ set");
			gdRes.getHeader("CAT07").setComboValues(cdName, cd );			

			/* MULTI_FLAG �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "MULTI_FLAG", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("MULTI_FLAG �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("MULTI_FLAG �÷��� �޺�����Ʈ set");
			gdRes.getHeader("MULTI_FLAG").setComboValues(cdName, cd );			
			
			/* CM_GUBN �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "CM_GUBN", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("CM_GUBN �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("CM_GUBN �÷��� �޺�����Ʈ set");
			gdRes.getHeader("CM_GUBN").setComboValues(cdName, cd );			

			/* TRANS_ALLOC_FLAG �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "YN", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("TRANS_ALLOC_FLAG �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("TRANS_ALLOC_FLAG �÷��� �޺�����Ʈ set");
			gdRes.getHeader("TRANS_ALLOC_FLAG").setComboValues(cdName, cd );					
			
			/* PROD_ALLOC_FLAG �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "YN", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("PROD_ALLOC_FLAG �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("PROD_ALLOC_FLAG �÷��� �޺�����Ʈ set");
			gdRes.getHeader("PROD_ALLOC_FLAG").setComboValues(cdName, cd );					
			
			/* CAT01 �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "SCH_PARAM", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("CAT01 �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("CAT01 �÷��� �޺�����Ʈ set");
			gdRes.getHeader("CAT01").setComboValues(cdName, cd );					

			/* CAT02 �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "SS_PARAM", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("CAT02 �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("CAT02 �÷��� �޺�����Ʈ set");
			gdRes.getHeader("CAT02").setComboValues(cdName, cd );
			
			/* SEARCH_FLAG �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "SEARCH_FLAG", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("SEARCH_FLAG �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("SEARCH_FLAG �÷��� �޺�����Ʈ set");
			gdRes.getHeader("SEARCH_FLAG").setComboValues(cdName, cd );			
			
			
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("CRUD"					).addValue( "", "");
				gdRes.getHeader("ITEM_ID"				).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("ITEM_NAME"				).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("SPEC"					).addValue(qResult.get(i).get(2  ),"");    
				gdRes.getHeader("MTO_FLAG"				).addValue(qResult.get(i).get(44  ),"");   //2015-08-27 ��äȯ ���� ��û MTO/MTS �߰�				
				gdRes.getHeader("SPEC_UOM"				).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("MULTI_FLAG"			).addSelectedHiddenValue(qResult.get(i).get(4));//MULTI_FLAG                                      
				gdRes.getHeader("QTY_PER_MULTI"			).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("QTY_PER_MULTI_UOM"		).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("ITEM_HIST"				).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("BOX_PER_PALET"			).addValue(qResult.get(i).get(8  ),"");                                      
				gdRes.getHeader("CAT03"			 		).addSelectedHiddenValue(qResult.get(i).get(9));//���۰�ȹ ��������
				gdRes.getHeader("CAT06"					).addSelectedHiddenValue(qResult.get(i).get(10));//�����Ҵ� ��������                                      
				gdRes.getHeader("SALES_PLAN_APPL_HIST"	).addSelectedHiddenValue(qResult.get(i).get(11));//�ǸŰ�ȹ ��������                                      
				gdRes.getHeader("CM_GUBN"				).addSelectedHiddenValue(qResult.get(i).get(12));//CM_GUBN                                      
				gdRes.getHeader("CAT07"					).addSelectedHiddenValue(qResult.get(i).get(13));//��������
				gdRes.getHeader("MIN_PICK_QTY"			).addValue(qResult.get(i).get(14 ),"");                                      
				gdRes.getHeader("PACK_PROC_FLAG"		).addValue(qResult.get(i).get(15 ),"");                                      
				gdRes.getHeader("CAT01"					).addSelectedHiddenValue(qResult.get(i).get(16));//CAT01
				gdRes.getHeader("CAT02"					).addSelectedHiddenValue(qResult.get(i).get(17));//CAT02
				gdRes.getHeader("CAT04"					).addValue(qResult.get(i).get(18 ),"");                                      
				gdRes.getHeader("CAT05"					).addValue(qResult.get(i).get(19 ),"");                                      
				gdRes.getHeader("TRANS_ALLOC_FLAG"		).addSelectedHiddenValue(qResult.get(i).get(20));//��������                                      
				gdRes.getHeader("PROD_ALLOC_FLAG"		).addSelectedHiddenValue(qResult.get(i).get(21));//��������                                      
				gdRes.getHeader("DIVISION"				).addValue(qResult.get(i).get(22 ),"");                                      
				gdRes.getHeader("RECIPE_TYPE"			).addValue(qResult.get(i).get(23 ),"");                                      
				gdRes.getHeader("MATERIAL_GROUP"		).addValue(qResult.get(i).get(24 ),"");                                      
				gdRes.getHeader("SALES_CAT01"			).addValue(qResult.get(i).get(25 ),"");                                      
				gdRes.getHeader("SALES_CAT02"			).addValue(qResult.get(i).get(26 ),"");                                      
				gdRes.getHeader("SALES_CAT03"			).addValue(qResult.get(i).get(27 ),"");                                      
				gdRes.getHeader("SALES_CAT04"			).addValue(qResult.get(i).get(28 ),"");                                      
				gdRes.getHeader("SALES_CAT05"			).addValue(qResult.get(i).get(29 ),"");                                      
				gdRes.getHeader("HR_TY1"				).addValue(qResult.get(i).get(30 ),"");                                      
				gdRes.getHeader("HR_TY2"				).addValue(qResult.get(i).get(31 ),"");                                      
				gdRes.getHeader("HR_TY3"				).addValue(qResult.get(i).get(32 ),"");                                      
				gdRes.getHeader("HR_TY4"				).addValue(qResult.get(i).get(33 ),"");                                      
				gdRes.getHeader("HR_TY5"				).addValue(qResult.get(i).get(34 ),"");                                      
				gdRes.getHeader("QTY"					).addValue(qResult.get(i).get(35 ),"");                                      
				gdRes.getHeader("BASE_UOM"				).addValue(qResult.get(i).get(36 ),"");                                      
				gdRes.getHeader("TWGT_PER_BUOM"			).addValue(qResult.get(i).get(37 ),"");                                      
				gdRes.getHeader("NWGT_PER_BUOM"			).addValue(qResult.get(i).get(38 ),"");                                      
				gdRes.getHeader("VOL_PER_BUOM"			).addValue(qResult.get(i).get(39 ),"");                                      
				gdRes.getHeader("VOL_UOM"				).addValue(qResult.get(i).get(40 ),"");
				gdRes.getHeader("REFE_ITEM1"			).addValue(qResult.get(i).get(41 ),"");
				gdRes.getHeader("REFE_ITEM1_NAME"		).addValue(qResult.get(i).get(42 ),"");
				gdRes.getHeader("SEARCH_FLAG"			).addSelectedHiddenValue(qResult.get(i).get(43));//��������
				gdRes.getHeader("EX_NATION"				).addSelectedHiddenValue(qResult.get(i).get(45));   //2015-10-16 �̽¿� �븮 ��û �����ڵ� �߰�
				//gdRes.getHeader("EX_NATION"				).addValue(qResult.get(i).get(45 ),"");  
				
				
				
				
				
				
				//gdRes.getHeader("CODE_NAME" 	).addSelectedHiddenValue(qResult.get(i).get(10));//�������
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	// DW 2 ��ȸ  ���� �ֹ�����
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");
			                                                                                                                 
			String paramKey   ="item_id";                                                                      
			String paramCode  = item_id;                                                               
                                                                                                                             
			String query_id   = "md_01070_itemMasterDetail_list";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search2");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}
			
			String query_id2;	
			ArrayList<ArrayList<String>> cdList; 
			int arrIdx;
			String[] cd;
			String[] cdName;
				
			/* DAYWEEK_PATTERN �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name"; 
			System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "DAYWEEK_PATTERN", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("DAYWEEK_PATTERN �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("DAYWEEK_PATTERN �÷��� �޺�����Ʈ set");
			gdRes.getHeader("DAYWEEK_PATTERN").setComboValues(cdName, cd );

			/* MC_TYPE �޺� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			query_id2 = "f_get_code_name"; 
			System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "MC_TYPE", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	cdName = new String[arrIdx];
			System.out.println("MC_TYPE �޺� ����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("MC_TYPE �÷��� �޺�����Ʈ set");
			gdRes.getHeader("MC_TYPE").setComboValues(cdName, cd );			

			
			for (int i = 0; i < rowCount; i++) {                                                                             
				
				gdRes.getHeader("CRUD"					).addValue( "", "");
				gdRes.getHeader("PLANT_ID"			).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("PLANT_NAME"		).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("PRIORITY"			).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("REP_ITEM_ID"		).addValue(qResult.get(i).get(3  ),"");
				gdRes.getHeader("REP_RATIO"			).addValue(qResult.get(i).get(4  ),"");
				gdRes.getHeader("BOX_PER_PALET"		).addValue(qResult.get(i).get(5  ),"");
				gdRes.getHeader("MIN_PICK_QTY"		).addValue(qResult.get(i).get(6  ),"");
				gdRes.getHeader("ALLOC_RATE"		).addValue(qResult.get(i).get(7  ),"");
				gdRes.getHeader("MIN_ALLOC_QTY"		).addValue(qResult.get(i).get(8  ),"");
				gdRes.getHeader("DAYWEEK_PATTERN"	).addSelectedHiddenValue(qResult.get(i).get(9));//DAYWEEK_PATTERN
				gdRes.getHeader("MC_TYPE"			).addSelectedHiddenValue(qResult.get(i).get(10));//DAYWEEK_PATTERN
				gdRes.getHeader("MIN_LOT_SIZE"		).addValue(qResult.get(i).get(11 ),"");
				gdRes.getHeader("MAX_LOT_SIZE"		).addValue(qResult.get(i).get(12 ),"");
				gdRes.getHeader("STD_FIX_COST"		).addValue(qResult.get(i).get(13 ),"");
				gdRes.getHeader("STD_CHG_COST"		).addValue(qResult.get(i).get(14 ),"");
				gdRes.getHeader("REAL_FIX_COST"		).addValue(qResult.get(i).get(15 ),"");
				gdRes.getHeader("REAL_CHG_COST"		).addValue(qResult.get(i).get(16 ),"");
				gdRes.getHeader("ITEM_ID"			).addValue(qResult.get(i).get(17 ),"");
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                	
	
	/* ITEM_MST ���� */
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql;

			//�ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!	
			sql  = "	/*	ITEM_MST SAVE	*/	 																				\n";
			sql += "	UPDATE  /*+ bypass_ujvc*/ 																				\n";
			sql += "	( 																										\n";
			sql += "	SELECT																									\n";
			sql += "			T1.MULTI_FLAG,										T1.QTY_PER_MULTI,                          	\n";
			sql += "			T1.QTY_PER_MULTI_UOM,								T1.BOX_PER_PALET,  							\n";
			sql += "			T1.MIN_PICK_QTY,       								T1.REFE_ITEM1,								\n";
			sql += " 			T1.CAT03,											T1.CAT06, 									\n";
			sql += " 			T1.CAT04,											T1.CAT05,			T1.SEARCH_FLAG,			\n";
			sql += "			T1.SALES_PLAN_APPL_HIST,							T1.CAT07,									\n";
			sql += " 			T1.CM_GUBN,       									T1.TRANS_ALLOC_FLAG,					    \n";
			sql += "			T1.CAT01,				T1.CAT02,					T1.PROD_ALLOC_FLAG,	 T1.PACK_PROC_FLAG,		\n";
			sql += "			T1.EX_NATION,																					\n";
			sql += "			T2.MULTI_FLAG			NEW_MULTI_FLAG, 			T2.QTY_PER_MULTI	NEW_QTY_PER_MULTI, 		\n";
			sql += "			T2.QTY_PER_MULTI_UOM	NEW_QTY_PER_MULTI_UOM,		T2.BOX_PER_PALET	NEW_BOX_PER_PALET,		\n";
			sql += "			T2.CAT03				NEW_CAT03,					T2.CAT06			NEW_CAT06,				\n";
			sql += "			T2.SALES_PLAN_APPL_HIST	NEW_SALES_PLAN_APPL_HIST,	T2.CAT07			NEW_CAT07,				\n";
			sql += "			T2.CM_GUBN				NEW_CM_GUBN,				T2.REFE_ITEM1 		NEW_REFE_ITEM1,			\n";
			sql += "			T2.MIN_PICK_QTY			NEW_MIN_PICK_QTY,			T2.PACK_PROC_FLAG 	NEW_PACK_PROC_FLAG,		\n";
			sql += "			T2.CAT01				NEW_CAT01,					T2.CAT02 			NEW_CAT02,				\n";
			sql += "			T2.CAT04				NEW_CAT04,					T2.CAT05 			NEW_CAT05,				\n";
			sql += "			T2.TRANS_ALLOC_FLAG		NEW_TRANS_ALLOC_FLAG,		T2.PROD_ALLOC_FLAG	NEW_PROD_ALLOC_FLAG,	\n";
			sql += "			T2.SEARCH_FLAG			NEW_SEARCH_FLAG,														\n";
			sql += "			T2.EX_NATION			NEW_EX_NATION															\n";
			sql += "	FROM	ITEM_MST	T1,                                                                                 \n";
			sql += "			(                                                                                               \n";

			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				//System.out.println("crud ="+crud);
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					String multi_flag = "";
					if(gdReq.getHeader("MULTI_FLAG").getSelectedIndex(i) > -1){							
						multi_flag = gdReq.getHeader("MULTI_FLAG").getComboHiddenValues()[gdReq.getHeader("MULTI_FLAG").getSelectedIndex(i)];
					}
					String cat01 = "";
					if(gdReq.getHeader("CAT01").getSelectedIndex(i) > -1){							
						cat01 = gdReq.getHeader("CAT01").getComboHiddenValues()[gdReq.getHeader("CAT01").getSelectedIndex(i)];
					}
					String cat02 = "";
					if(gdReq.getHeader("CAT02").getSelectedIndex(i) > -1){							
						cat02 = gdReq.getHeader("CAT02").getComboHiddenValues()[gdReq.getHeader("CAT02").getSelectedIndex(i)];
					}
					String cat03 = "";
					if(gdReq.getHeader("CAT03").getSelectedIndex(i) > -1){							
						cat03 = gdReq.getHeader("CAT03").getComboHiddenValues()[gdReq.getHeader("CAT03").getSelectedIndex(i)];
					}
					String cat06 = "";
					if(gdReq.getHeader("CAT06").getSelectedIndex(i) > -1){							
						cat06 = gdReq.getHeader("CAT06").getComboHiddenValues()[gdReq.getHeader("CAT06").getSelectedIndex(i)];
					}
					
					String ex_nation = "";
					if(gdReq.getHeader("EX_NATION").getSelectedIndex(i) > -1){							
						ex_nation = gdReq.getHeader("EX_NATION").getComboHiddenValues()[gdReq.getHeader("EX_NATION").getSelectedIndex(i)];
					}					
					
					String sales_plan_appl_hist = "";
					if(gdReq.getHeader("SALES_PLAN_APPL_HIST").getSelectedIndex(i) > -1){							
						sales_plan_appl_hist = gdReq.getHeader("SALES_PLAN_APPL_HIST").getComboHiddenValues()[gdReq.getHeader("SALES_PLAN_APPL_HIST").getSelectedIndex(i)];
					}
					String cm_gubn = "";
					if(gdReq.getHeader("CM_GUBN").getSelectedIndex(i) > -1){							
						cm_gubn = gdReq.getHeader("CM_GUBN").getComboHiddenValues()[gdReq.getHeader("CM_GUBN").getSelectedIndex(i)];
					}
					String cat07 = "";
					if(gdReq.getHeader("CAT07").getSelectedIndex(i) > -1){							
						cat07 = gdReq.getHeader("CAT07").getComboHiddenValues()[gdReq.getHeader("CAT07").getSelectedIndex(i)];
					}
					String trans_alloc_flag = "";
					if(gdReq.getHeader("TRANS_ALLOC_FLAG").getSelectedIndex(i) > -1){							
						trans_alloc_flag = gdReq.getHeader("TRANS_ALLOC_FLAG").getComboHiddenValues()[gdReq.getHeader("TRANS_ALLOC_FLAG").getSelectedIndex(i)];
					}
					String prod_alloc_flag = "";
					if(gdReq.getHeader("PROD_ALLOC_FLAG").getSelectedIndex(i) > -1){							
						prod_alloc_flag = gdReq.getHeader("PROD_ALLOC_FLAG").getComboHiddenValues()[gdReq.getHeader("PROD_ALLOC_FLAG").getSelectedIndex(i)];
					}
					
					String search_flag = "";
					if(gdReq.getHeader("SEARCH_FLAG").getSelectedIndex(i) > -1){							
						search_flag = gdReq.getHeader("SEARCH_FLAG").getComboHiddenValues()[gdReq.getHeader("SEARCH_FLAG").getSelectedIndex(i)];
					}
					
					
					//�Ķ���͸� ������ ����!!
					inner_sql  = "	SELECT	'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'		AS ITEM_ID, 					\n";
					inner_sql += "			'" + multi_flag										+ "'		AS MULTI_FLAG,                  \n";
					inner_sql += "			'" + gdReq.getHeader("QTY_PER_MULTI").getValue(i)	+ "'		AS QTY_PER_MULTI,               \n";
					inner_sql += "			'" + gdReq.getHeader("QTY_PER_MULTI_UOM").getValue(i)	+ "'	AS QTY_PER_MULTI_UOM,           \n";
					inner_sql += "			'" + gdReq.getHeader("BOX_PER_PALET").getValue(i)	+ "'		AS BOX_PER_PALET,               \n";
					inner_sql += "			'" + gdReq.getHeader("REFE_ITEM1").getValue(i)		+ "'		AS REFE_ITEM1,     		        \n";
					inner_sql += "			'" + gdReq.getHeader("MIN_PICK_QTY").getValue(i)	+ "'		AS MIN_PICK_QTY,     		    \n";
					inner_sql += "			'" + gdReq.getHeader("PACK_PROC_FLAG").getValue(i)	+ "'		AS PACK_PROC_FLAG,     		    \n";
					inner_sql += "			'" + cat01											+ "'		AS CAT01,                     	\n";
					inner_sql += "			'" + cat02											+ "'		AS CAT02,                     	\n";
					inner_sql += "			'" + cat03											+ "'		AS CAT03,                     	\n";
					inner_sql += "			'" + gdReq.getHeader("CAT04").getValue(i)			+ "'		AS CAT04,     		        	\n";
					inner_sql += "			'" + gdReq.getHeader("CAT05").getValue(i)			+ "'		AS CAT05,     		        	\n";
					inner_sql += "			'" + cat06											+ "'		AS CAT06,                  		\n";
					inner_sql += "			'" + ex_nation										+ "'		AS EX_NATION,                  	\n";
					inner_sql += "			'" + sales_plan_appl_hist							+ "'		AS SALES_PLAN_APPL_HIST,        \n";
					inner_sql += "			'" + cm_gubn										+ "'		AS CM_GUBN,    				    \n";
					inner_sql += "			'" + cat07											+ "'		AS CAT07,                  		\n";
					inner_sql += "			'" + trans_alloc_flag								+ "'		AS TRANS_ALLOC_FLAG,       		\n";
					inner_sql += "			'" + prod_alloc_flag								+ "'		AS PROD_ALLOC_FLAG,        		\n";
					inner_sql += "			DECODE( '" + search_flag + "' , NULL, 'Y', 'N')					AS SEARCH_FLAG        			\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";

					
					sql += inner_sql;
					
					if(rowCount == 1){ // update�Ǽ��� 1���� ��� ora-01732������ �߻��Ѵ�. ������. ���� 1���� ��� ������ �ΰ����� �����.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for�� ��.
			
			sql += "			)			T2                                                                                  \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                        \n";
			sql += "	)                                                                                                    	\n";
			sql += "	SET		MULTI_FLAG = NEW_MULTI_FLAG, 						QTY_PER_MULTI	= NEW_QTY_PER_MULTI,		\n";
			sql += "			QTY_PER_MULTI_UOM = NEW_QTY_PER_MULTI_UOM, 			BOX_PER_PALET	= NEW_BOX_PER_PALET,		\n";
			sql += "			CAT03 = NEW_CAT03, 									CAT06	= NEW_CAT06,						\n";	
			sql += "			EX_NATION = NEW_EX_NATION, 																		\n";
			sql += "			SALES_PLAN_APPL_HIST = NEW_SALES_PLAN_APPL_HIST, 	CM_GUBN	= NEW_CM_GUBN,						\n";
			sql += "			CAT07	= NEW_CAT07,								REFE_ITEM1 = NEW_REFE_ITEM1,				\n";
			sql += "			MIN_PICK_QTY	= NEW_MIN_PICK_QTY,					PACK_PROC_FLAG = NEW_PACK_PROC_FLAG,		\n";
			sql += "			CAT01	= NEW_CAT01,								CAT02 = NEW_CAT02,							\n";
			sql += "			CAT04	= NEW_CAT04,								CAT05 = NEW_CAT05,							\n";
			sql += "			TRANS_ALLOC_FLAG	= NEW_TRANS_ALLOC_FLAG,			PROD_ALLOC_FLAG = NEW_PROD_ALLOC_FLAG,		\n";
			sql += "			SEARCH_FLAG			= NEW_SEARCH_FLAG															\n";
			//sql += "			MADE_DTTM	= SYSDATE																               	\n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");


			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);   
        }

        System.out.println("doSave() end!!!");

		return gdRes;
	}	
	
	/* ITEM_DTL ���� */
	public GridData doSave2(GridData gdReq) throws Exception {

		System.out.println("doSave2() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save2");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql;

			//�ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!	
			sql  = "	/*	ITEM_DTL SAVE	*/	 																	\n";
			sql += "	UPDATE  /*+ bypass_ujvc*/ 																	\n";
			sql += "	( 																							\n";
			sql += "	SELECT																						\n";
			sql += "			T1.PRIORITY,										T1.REP_ITEM_ID,                 \n";
			sql += "			T1.REP_RATIO,										T1.BOX_PER_PALET,               \n";
			sql += "			T1.MIN_PICK_QTY,									T1.ALLOC_RATE,                  \n";
			sql += "			T1.MIN_ALLOC_QTY,									T1.DAYWEEK_PATTERN,            	\n";
			sql += "			T1.MC_TYPE,														                   	\n";
			sql += "			T2.PRIORITY			NEW_PRIORITY, 			T2.REP_ITEM_ID	NEW_REP_ITEM_ID, 		\n";
			sql += "			T2.REP_RATIO		NEW_REP_RATIO, 			T2.BOX_PER_PALET	NEW_BOX_PER_PALET, 	\n";
			sql += "			T2.MIN_PICK_QTY		NEW_MIN_PICK_QTY, 		T2.ALLOC_RATE	NEW_ALLOC_RATE, 		\n";
			sql += "			T2.MIN_ALLOC_QTY	NEW_MIN_ALLOC_QTY, 		T2.DAYWEEK_PATTERN	NEW_DAYWEEK_PATTERN, \n";
			sql += "			T2.MC_TYPE			NEW_MC_TYPE 													\n";
			sql += "	FROM	ITEM_DTL	T1,                                                                     \n";
			sql += "			(                                                                                   \n";
			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				//System.out.println("crud ="+crud);
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					String dayweek_pattern = "";
					if(gdReq.getHeader("DAYWEEK_PATTERN").getSelectedIndex(i) > -1){							
						dayweek_pattern = gdReq.getHeader("DAYWEEK_PATTERN").getComboHiddenValues()[gdReq.getHeader("DAYWEEK_PATTERN").getSelectedIndex(i)];
					}
					String mc_type = "";
					if(gdReq.getHeader("MC_TYPE").getSelectedIndex(i) > -1){							
						mc_type = gdReq.getHeader("MC_TYPE").getComboHiddenValues()[gdReq.getHeader("MC_TYPE").getSelectedIndex(i)];
					}
					
					//�Ķ���͸� ������ ����!!
					inner_sql  = "	SELECT	'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 					\n";
					inner_sql += "			'" + gdReq.getHeader("PLANT_ID").getValue(i)		+ "'	AS PLANT_ID,               \n";
					inner_sql += "			'" + gdReq.getHeader("PRIORITY").getValue(i)		+ "'	AS PRIORITY,           \n";
					inner_sql += "			'" + gdReq.getHeader("REP_ITEM_ID").getValue(i)		+ "'	AS REP_ITEM_ID,           \n";
					inner_sql += "			'" + gdReq.getHeader("REP_RATIO").getValue(i)		+ "'	AS REP_RATIO,           \n";
					inner_sql += "			'" + gdReq.getHeader("BOX_PER_PALET").getValue(i)	+ "'	AS BOX_PER_PALET,           \n";
					inner_sql += "			'" + gdReq.getHeader("MIN_PICK_QTY").getValue(i)	+ "'	AS MIN_PICK_QTY,           \n";
					inner_sql += "			'" + gdReq.getHeader("ALLOC_RATE").getValue(i)		+ "'	AS ALLOC_RATE,           \n";
					inner_sql += "			'" + gdReq.getHeader("MIN_ALLOC_QTY").getValue(i)	+ "'	AS MIN_ALLOC_QTY,           \n";
					inner_sql += "			'" + dayweek_pattern								+ "'	AS DAYWEEK_PATTERN,		        \n";
					inner_sql += "			'" + mc_type										+ "'	AS MC_TYPE                 		\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update�Ǽ��� 1���� ��� ora-01732������ �߻��Ѵ�. ������. ���� 1���� ��� ������ �ΰ����� �����.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for�� ��.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	AND		T1.PLANT_ID	= T2.PLANT_ID                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		PRIORITY = NEW_PRIORITY, 				REP_ITEM_ID	= NEW_REP_ITEM_ID,					\n";
			sql += "			REP_RATIO = NEW_REP_RATIO, 				BOX_PER_PALET	= NEW_BOX_PER_PALET,			\n";
			sql += "			MIN_PICK_QTY = NEW_MIN_PICK_QTY, 		ALLOC_RATE	= NEW_ALLOC_RATE,					\n";
			sql += "			MIN_ALLOC_QTY = NEW_MIN_ALLOC_QTY, 		DAYWEEK_PATTERN	= NEW_DAYWEEK_PATTERN,			\n";
			sql += "			MC_TYPE = NEW_MC_TYPE																	\n";
			//sql += "			MADE_DTTM	= SYSDATE																               	\n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");


			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "save2");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);   
        }

        System.out.println("doSave2() end!!!");

		return gdRes;
	}		
	
	
}                                                                                                                  