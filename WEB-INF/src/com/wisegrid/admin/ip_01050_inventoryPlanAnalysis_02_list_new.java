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
public class ip_01050_inventoryPlanAnalysis_02_list_new extends HttpServlet {                                                             
                                                                                                                             
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
			if (mode.equals("delete")) //                                                                                    
				gdRes = doDelete(gdReq); 
			                                                                                                                 
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
	        
			String start_date  = gdReq.getParam("start_date");                                                            
			String end_date    = gdReq.getParam("end_date"); 
			String item_type   = gdReq.getParam("item_type");                                                            
			String search_type = gdReq.getParam("search_type"); 
			String in_act_type = gdReq.getParam("in_act_type");                                                            
			String search_item = gdReq.getParam("search_item"); 
			String user_id	   = gdReq.getParam("user_id"); 
			String in_qty_gubn = gdReq.getParam("in_qty_gubn");
			String checked_button_mt	= gdReq.getParam("checked_button_mt");
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!item_type!%!search_type!%!in_act_type!%!search_item!%!user_id!%!in_qty_gubn!%!checked_button_mt";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+item_type+"!%!"+search_type+"!%!"+in_act_type+"!%!"+search_item+"!%!"+user_id+"!%!"+in_qty_gubn+"!%!"+checked_button_mt;                                                                   
		
			System.out.println("search_type = " + search_type);                                                                    
			
			String query_id   = "ip_01050_inventoryPlanAnalysis_02_list";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("SELECTED"			) .addValue("0", ""); 
				gdRes.getHeader("SALES_CAT01"       ).addValue(qResult.get(i).get(0), "");
			  //gdRes.getHeader("SALES_CAT02"       ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("SALES_CAT03"       ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ITEM_ID" 	        ).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("ITEM_NAME"	        ).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("SPEC"        		).addValue(qResult.get(i).get(4), "");                                     
				gdRes.getHeader("BASE_STOCK"        ).addValue(qResult.get(i).get(5), "");                               
				gdRes.getHeader("STOCK_DAY"         ).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("PROD_TERM"			).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("PROD_TERM_AVG"		).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("STOCK_HIDDEN"		).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("TERM_HIDDEN"		).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("TERM_VAL"			).addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("TERM_PER"			).addValue(qResult.get(i).get(12), "");
				
				gdRes.getHeader("SALES_PRE"	        ).addValue(qResult.get(i).get(13), "");                                     
				gdRes.getHeader("SALES_CUR"	        ).addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("SALES_SUM"	        ).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("PRE_MONTH_SELL"	).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("STOCK_EXPT"		).addValue(qResult.get(i).get(17),"");				
				
				
				gdRes.getHeader("RECEIPT_EXPT"	    ).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("RECEIPT_EXPT_REM"	).addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("RECEIPT_EXPT_NEXT"	).addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("RECEIPT_EXPT_SUM"	).addValue(qResult.get(i).get(21),"");
			
				gdRes.getHeader("SALES_MEAN_1WEEK"	).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("SALES_MEAN_3WEEK"	).addValue(qResult.get(i).get(23),"");
				gdRes.getHeader("WEEK_DEV_1_3"	    ).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("DEV_PER"	        ).addValue(qResult.get(i).get(25),"");
				gdRes.getHeader("SALES_SUM_PY"	    ).addValue(qResult.get(i).get(26),"");
				gdRes.getHeader("SUB_PY_MON"	    ).addValue(qResult.get(i).get(27),"");
				gdRes.getHeader("THIS_YEAR_SUM"	    ).addValue(qResult.get(i).get(28),"");
				gdRes.getHeader("LAST_YEAR_SUM"		).addValue(qResult.get(i).get(29),"");				
				gdRes.getHeader("SUB_PY_YEAR"		).addValue(qResult.get(i).get(30),"");				
				gdRes.getHeader("GOALS_BOX"	        ).addValue(qResult.get(i).get(31),"");
				gdRes.getHeader("GOALS_BOX_RATE"  	).addValue(qResult.get(i).get(32),"");	
				gdRes.getHeader("BASE_STOCK_PALLET" ).addValue(qResult.get(i).get(33),"");
				gdRes.getHeader("STOCK_EXPT_PALLET" ).addValue(qResult.get(i).get(34),"");
				gdRes.getHeader("STOCK_USE_EXPT_RATE" ).addValue(qResult.get(i).get(35),"");
				gdRes.getHeader("JGC_DUE_DATE" 		  ).addValue(qResult.get(i).get(36),"");				
				gdRes.getHeader("BASE_STOCK_2"		  ).addValue(qResult.get(i).get(37),"");
				gdRes.getHeader("REQT_QTY"		  	  ).addValue(qResult.get(i).get(38),"");
				//gdRes.getHeader("PROD_TERM"		  	).addValue(qResult.get(i).get(15),"");
		                                                                                                          
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	} 
	
	//����ǰ�� ����
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("ITEM_ID").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}
					
			String checked_button = gdReq.getParam("checked_button");						
			String user_id		= gdReq.getParam("user_id");
			//�ش� ������ ������쿡�� (MERGE INTO��  UPDATE�� INSERT��) ����!!	
			
			System.out.println("test :" + checked_button);
			//����ǰ�� ����
			if (checked_button.equals("00") ){
			
			sql   = "MERGE INTO ITEM_MST IM	 /*+ bypass_ujvc*/       	 \n";
			sql  += "USING(							                     \n";
			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
	
					}
					flag = true;
					
					//�Ķ���͸� ������ ����!!					
					
			
					//---------------------------------------------------------------------------------------------	----------------------
					sql += "	SELECT	ITEM_ID,  																												\n"; 
					sql += "		'"	+			gdReq.getHeader("JGC_DUE_DATE"	).getValue(i) +	 						"'	AS JGC_DUE_DATE,				\n";
					sql += "	SUBSTR(AT_FLAG,0,F_GET_AT_FLAG('" + user_id + "')-1)||'Y'||SUBSTR(AT_FLAG,F_GET_AT_FLAG('" + user_id + "')+1,9) AS AT_FLAG		\n";
					sql +="		FROM   ITEM_MST 																		   										\n";	
					sql +="		WHERE  ITEM_ID ='"	+	gdReq.getHeader("ITEM_ID"		).getValue(i) +	"' 							 							\n";
	               //--------------------------------------------------------------------------------------------------------------------
				} 
						
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") IM1 														   	\n";
			sql += "ON (IM.ITEM_ID    = IM1.ITEM_ID)    						   	\n";
			sql += "when matched then update set            					   	\n";
			sql += "     IM.AT_FLAG      = IM1.AT_FLAG,   					   		\n";
			sql += "     IM.JGC_DUE_DATE      = IM1.JGC_DUE_DATE   					\n";
			 //---------------------------------------------------------------------------------------------------------------------------		

			
			}
			//���üȭ ����
			else if(checked_button != "00"){
				
				sql   = "MERGE INTO ITEM_MST IM	 /*+ bypass_ujvc*/       	 \n";
				sql  += "USING(							                     \n";
				
				boolean flag = false;
				
				// ������ ����
				for (int i = 0; i < rowCount; i++) {

					if( flag){
							sql  += "union all \n";
					
						}
						flag = true;
						
						//�Ķ���͸� ������ ����!!					
						
				
						//-------------------------------------------------------------------------------------------------------------------
						sql += "	SELECT	"		+	gdReq.getHeader("ITEM_ID"		).getValue(i) +		"	AS ITEM_ID,						\n"; 
						sql += 							checked_button								  +		"	AS JGC_DIVISION,'				\n";
						sql += 							gdReq.getHeader("JGC_DUE_DATE"	).getValue(i) +	 	"'	AS JGC_DUE_DATE					\n";
						sql +="		FROM   DUAL																	   								\n";	
						
		               //--------------------------------------------------------------------------------------------------------------------
					} 
							
				//-----------------------------Merge Into 1----------------------------------------------------------------------------------
				sql += ") IM1 														   	\n";
				sql += "ON (IM.ITEM_ID    = IM1.ITEM_ID)    						   	\n";
				sql += "when matched then update set            					   	\n";
				sql += "     IM.JGC_DIVISION      = IM1.JGC_DIVISION,   				\n";
				sql += "     IM.JGC_DUE_DATE      = IM1.JGC_DUE_DATE   					\n";	
				 //---------------------------------------------------------------------------------------------------------------------------	
				
				
			}
				
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
	

	
	public GridData doDelete(GridData gdReq) throws Exception {

		System.out.println("doDelete() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("ITEM_ID").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Delete");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}
			

			String sql;
			
			String user_id		= gdReq.getParam("user_id");		
			//�ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!	
			sql   = "merge into ITEM_MST IM	          	   							\n";
			sql  += "using (                                         	    		\n";
			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				System.out.println("��𿡼� ���� !! 1 : ");
			
				if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					
					//�Ķ���͸� ������ ����!!  
					//-------------------------------------------------------------------------------------------------------------------
					sql += "	SELECT	ITEM_ID,																												\n"; 
					sql += "	SUBSTR(AT_FLAG,0,F_GET_AT_FLAG('" + user_id + "')-1)||'N'||SUBSTR(AT_FLAG,F_GET_AT_FLAG('" + user_id + "')+1,9) AS AT_FLAG		\n";
					sql +="		FROM   ITEM_MST 																		   										\n";	
					sql +="		WHERE  ITEM_ID ='"	+	gdReq.getHeader("ITEM_ID"		).getValue(i) +	"' 							 							\n";
	               //--------------------------------------------------------------------------------------------------------------------
					} 
							
				//-----------------------------Merge Into 1----------------------------------------------------------------------------------		
					
			sql += ") IM1 														   	\n";
			sql += "ON (IM.ITEM_ID    = IM1.ITEM_ID)    						   	\n";
			sql += "when matched then update set            					   	\n";
			sql += "     IM.AT_FLAG      	= IM1.AT_FLAG,   					   	\n";
			sql += "     IM.JGC_DIVISION    = ''   					   				\n";	
			
			
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "Delete");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);   
        }

        System.out.println("doDelete() end!!!");

		return gdRes;
	}			
	
}                                                                                                                            