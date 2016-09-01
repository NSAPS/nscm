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
public class ip_05040_WMS_CloseInfo_Scm_list_pop extends HttpServlet {                                                             
                                                                                                                             
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
                                                                                                                             
			if (mode.equals("search")) //                                                                                    
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
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
	        
			String cnfm_date  	= gdReq.getParam("cnfm_date");                                                            
			String reason   	= gdReq.getParam("reason"); 
			String itype		= gdReq.getParam("itype");
			String search_type	= gdReq.getParam("search_type");
				
		                                                                                                                 
			String paramKey   = "cnfm_date!%!reason!%!itype!%!search_type";                                                                      
			String paramCode  = cnfm_date+"!%!"+reason+"!%!"+itype+"!%!"+search_type;                                                                   
		
		                                                                 
			
			String query_id   = "ip_05040_WMS_CloseInfo_Scm_list_pop";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			            
			/*���ñ��� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			String query_id2 = "ip_05040_WMS_CloseInfo_Scm_list_combo"; 
			System.out.println("getSelQeury : " + query_id2);
			ArrayList<ArrayList<String>> comboList = new CommonUtil().getSelQeury("", "", query_id2);
			
			int arrIdx = comboList.size();
			
			String[] codeIdList = new String[arrIdx];
			String[] codeNameList = new String[arrIdx];
			
			System.out.println("�޺�����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				codeIdList[i] = comboList.get(i).get(0);   //���ñ��� ID �޺�����Ʈ ����
				codeNameList[i] = comboList.get(i).get(1); // ���ñ��� �̸� �޺�����Ʈ ����
			}
			
			System.out.println("�޺�����Ʈ set");
			gdRes.getHeader("GUBN_SCM").setComboValues(codeNameList, codeIdList );		
			
			for (int i = 0; i < rowCount; i++) {                                                                             
				
				gdRes.getHeader("CRUD"			).addValue("","");
				gdRes.getHeader("DC_ID"       	).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("DC_NAME"       ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ITEM_ID" 	    ).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("ITEM_NAME"	    ).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("GUBN_IDX"      ).addValue(qResult.get(i).get(4), ""); 
				gdRes.getHeader("GUBN"        	).addValue(qResult.get(i).get(5), "");                                     
				gdRes.getHeader("ODER_BOX"      ).addValue(qResult.get(i).get(6), "");                               
				gdRes.getHeader("SELL_BOX"      ).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("REMN_BOX"		).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("GUBN_SCM"		).addSelectedHiddenValue(qResult.get(i).get(9));			 
				gdRes.getHeader("BIGO"			).addValue(qResult.get(i).get(10), "");
	                   
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	} 
	
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}
				
			String user_id		= gdReq.getParam("user_id");
			String cnfm_date    = gdReq.getParam("cnfm_date");
			//�ش� ������ ������쿡�� (MERGE INTO��  UPDATE�� INSERT��) ����!!	
		
			//����ǰ�� ����
			
			
			sql   = "MERGE INTO WMS_DEFAULT_REASON WMS	 /*+ bypass_ujvc*/       	 \n";
			sql  += "USING(							                     			 \n";
			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
	
					}
					flag = true;
					
					//�Ķ���͸� ������ ����!!					
					
			
					//---------------------------------------------------------------------------------------------	----------------------
					sql +="	SELECT 		    '" +		cnfm_date												+ "' 	AS CNFM_DATE, 		\n";
					sql +="				    '" + gdReq.getHeader("DC_ID"			).getValue(i)				+ "' 	AS DC_ID,			\n"; 
					sql +="					'" + gdReq.getHeader("ITEM_ID"			).getValue(i)   			+ "' 	AS ITEM_ID,   		\n";
					sql +="				    '" + gdReq.getHeader("ODER_BOX"			).getValue(i)				+ "' 	AS ODER_BOX,		\n"; 
					sql +="					'" + gdReq.getHeader("SELL_BOX"			).getValue(i)   			+ "' 	AS CONFIRM_BOX,   	\n";	
					sql +="					'" + gdReq.getHeader("GUBN_IDX"			).getValue(i)   			+ "'   	AS WMS_REASON,      \n";
					sql +="					'" + gdReq.getHeader("GUBN_SCM"			).getSelectedIndex(i)   	+ "'   	AS SCM_REASON,  	\n";
					sql +="					'" + gdReq.getHeader("BIGO"				).getValue(i)   			+ "'   	AS BIGO, 			\n";
					sql +="					'" + user_id  									    				+ "'    AS MADE_BY			\n";
					sql +="					from   DUAL 																		   		\n";	
	               //--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") WMS1 														   		\n";
			sql += "ON (WMS.CNFM_DATE    	= WMS1.CNFM_DATE    						\n";
			sql += "AND WMS.DC_ID     		= WMS1.DC_ID          				 	  	\n";
			sql += "AND WMS.WMS_rEASON     	= WMS1.WMS_REASON          				 	\n";
			sql += "AND WMS.ITEM_ID     	= WMS1.ITEM_ID)	          				   	\n";			
			sql += "when matched then update set            					   		\n";
			sql += "     WMS.ODER_BOX      	= WMS1.ODER_BOX,      					   	\n";
			sql += "     WMS.CONFIRM_BOX  	= WMS1.CONFIRM_BOX,  					   	\n";
			//sql += "     WMS.WMS_REASON     = WMS1.WMS_REASON,      					\n";
			sql += "     WMS.SCM_REASON  	= WMS1.SCM_REASON,  					   	\n";
			sql += "     WMS.BIGO     		= WMS1.BIGO,      							\n";
			sql += "     WMS.MADE_DTTM     	= SYSDATE,      							\n";
			sql += "     WMS.MADE_BY  		= WMS1.MADE_BY  					   		\n";
			
			sql += "when not matched then insert(WMS.CNFM_DATE, WMS.DC_ID, WMS.ITEM_ID, WMS.ODER_BOX, WMS.CONFIRM_BOX, WMS.WMS_REASON, WMS.SCM_REASON, WMS.BIGO, WMS.MADE_BY) \n";
			sql += "values                      (WMS1.CNFM_DATE, WMS1.DC_ID, WMS1.ITEM_ID, WMS1.ODER_BOX, WMS1.CONFIRM_BOX, WMS1.WMS_REASON, WMS1.SCM_REASON, WMS1.BIGO, WMS1.MADE_BY) \n";
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
			gdRes.addParam("mode", "doSave");
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