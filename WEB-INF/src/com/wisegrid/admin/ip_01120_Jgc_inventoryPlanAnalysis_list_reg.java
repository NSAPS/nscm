package com.wisegrid.admin;

import java.io.IOException;                                                                                                  
import java.io.PrintWriter;                                                                                                  
//import java.sql.SQLException;                                                                                                
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

public class ip_01120_Jgc_inventoryPlanAnalysis_list_reg extends HttpServlet {                                                             
    
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
			                                                                                                                 
			//                                                                                                               
			gdReq = OperateGridData.parse(rawData);                                                                          
                                                                                                                             
			//                                                                                                               
			String mode = gdReq.getParam("mode");                                                                            
			                                                                                                                 
			System.out.println("Test :: mode = " + mode);                                                                    
                                                                                                                             
			if (mode.equals("set")) //                                                                                    
				gdRes = doQuery(gdReq);                                                                                      
			if (mode.equals("save")) //                                                                                    
				gdRes = doSave(gdReq);  
		
			
		
			
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
                                                                                                                             
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();                                                                                    
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                           


			/*��� ����� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */

			String query_id = "jgc_division_list"; 

			System.out.println("getSelQeury : " + query_id);

			ArrayList<ArrayList<String>> DivList = new CommonUtil().getSelQeury("", "", query_id);

			int arrIdx = DivList.size();

			String[] DivIdList = new String[arrIdx];
			String[] DivNameList = new String[arrIdx];
		

			for ( int i = 0 ; i < arrIdx ; i++ ){

				DivIdList[i]   = DivList.get(i).get(0);   // ��� ����� ID �޺�����Ʈ ����
				DivNameList[i] = DivList.get(i).get(1); // ��� ����� �̸� �޺�����Ʈ ����

			}

			System.out.println("���ü ��� ������ �÷��� �޺�����Ʈ set");

			gdRes.getHeader("DIVISION").setComboValues(DivNameList, DivIdList );	
			
                                                                                                                             
			gdRes.addParam("mode", "set");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");  
			
			                                                                                       
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                  
	
	
	

	//�����ʿ䷮ ����
	public GridData doSave(GridData gdReq) throws Exception {


		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // SELECTED �÷� row ��
		
		String cnfm_date	= gdReq.getParam("cnfm_date");	
		try {

			// ȭ�鿡�� ���޹��� "SELECTED"�� row ���� �����´�.
			rowCount = gdReq.getHeader("ITEM_ID").getRowCount();
			
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
								
			String user_id		= gdReq.getParam("user_id");
			//�ش� ������ ������쿡�� (MERGE INTO��  UPDATE�� INSERT��) ����!!	
			
			sql   = "merge into JGC_ITEM_STOCK JGC	           \n";
			sql  += "using (                                   \n";
		
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
					
					}
					flag = true;
					
					//�Ķ���͸� ������ ����!!					
				
						
					//-------------------------------------------------------------------------------------------------------------------
					sql += "			SELECT '" + cnfm_date   											+ "'	  AS REGISTER_DAY, 	\n"; 
					sql +="					        TO_CHAR(SYSDATE,'YYYYMMDD')   								   	  AS CNFM_DATE,   	\n";
					sql +="					   '" + gdReq.getHeader("DIVISION_HIDDEN").getValue(i)   		+ "'   	  AS DIVISION,   	\n";
					sql +="					   '" + gdReq.getHeader("ITEM_ID"		 ).getValue(i)   		+ "'   	  AS ITEM_ID,   	\n";					
					sql +="					   '" + gdReq.getHeader("ITEM_NAME"		 ).getValue(i)   		+ "'   	  AS ITEM_NAME,   	\n";
					sql +="	   TO_CHAR(TO_DATE('" + gdReq.getHeader("EXPIRY_VERSION" ).getValue(i)   		+ "'),'YYYY-MM-DD')     AS EXPIRY_VERSION,\n";
					sql +="					   '" + gdReq.getHeader("STOCK"			 ).getValue(i)   		+ "'   	  AS STOCK,  		\n";
					sql +="					   '" + gdReq.getHeader("PROD_TERM"		 ).getValue(i)   		+ "'   	  AS PROD_TERM, 	\n";
					sql +="					   '" + gdReq.getHeader("TERM_VAL"		 ).getValue(i)   		+ "'   	  AS TERM_VAL, 		\n";
					sql +="					   '" + gdReq.getHeader("DUE_DATE"		 ).getValue(i)   		+ "'   	  AS DUE_DATE, 		\n";
					sql +="					   '" + user_id  									    		+ "' 	  AS MADE_BY		\n";
					sql +="				FROM   DUAL 																		   			\n";						
	               //--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1-----------------------------	-----------------------------------------------------
			sql += ") JGC1 														   		\n";
			sql += "ON (JGC.CNFM_DATE    		= JGC1.CNFM_DATE    					\n";
			sql += "AND JGC.ITEM_ID     		= JGC1.ITEM_ID          				\n";
			sql += "AND JGC.EXPIRY_VERSION     	= JGC1.EXPIRY_VERSION)	          		\n";
			sql += "WHEN MATCHED THEN UPDATE SET            					   		\n";
			sql += "     JGC.REGISTER_DAY        = JGC1.REGISTER_DAY      				\n";
			sql += "WHEN NOT MATCHED THEN INSERT(JGC.CNFM_DATE, JGC.ITEM_ID,  JGC.ITEM_NAME, JGC.DIVISION, JGC.STOCK, JGC.EXPIRY_VERSION, JGC.DUE_DATE, JGC.PROD_TERM, JGC.TERM_VAL, JGC.MADE_BY, JGC.MADE_DTTM, JGC.REGISTER_DAY) \n";
			sql += "VALUES                      (TO_CHAR(SYSDATE,'YYYYMMDD'), JGC1.ITEM_ID, JGC1.ITEM_NAME, JGC1.DIVISION, JGC1.STOCK, JGC1.EXPIRY_VERSION, JGC1.DUE_DATE, JGC1.PROD_TERM, JGC1.TERM_VAL, JGC1.MADE_BY, SYSDATE, JGC1.REGISTER_DAY) \n";
	        //---------------------------------------------------------------------------------------------------------------------------		

			
			
			
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
	

	
	
	
	
	
}                                                                             