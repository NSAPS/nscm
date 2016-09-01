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
public class ip_02110_hawa_expt_sell_management extends HttpServlet {                                                             
                                                                                                                             
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
			else if (mode.equals("save")) //                                                                               
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

	
	// DW 1 ��ȸ  ����
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String cnfm_date		= gdReq.getParam("cnfm_date");                                                            
		
			String paramKey   ="cnfm_date";                                                                      
			String paramCode  = cnfm_date;
                                                                                                                             
			String query_id   = "ip_02110_hawa_expt_sell_management";                                                             
                                                                                                                             
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

				gdRes.getHeader("CRUD").addValue("", "");  //�߰�,����,���� �� �����ϱ� ���� �κ�.C(�߰�) ,U(����) ,D(����)
				gdRes.getHeader("ITEM_ID" 		).addValue(qResult.get(i).get(0  ),"");
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("GUBN" 			).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("GUBN_NAME"		).addValue(qResult.get(i).get(3  ),"");
				
				// ���� 6����
				for(int j = 1 ; j < 7 ; j++) {
					gdRes.getHeader("W_P0" + (7 - j)).addValue(qResult.get(i).get(3 + j),"");
				}
				
				// �������� 26����
				for(int k = 0 ; k < 27 ; k++) {
					if(k < 10) {
						gdRes.getHeader("W_N0" + k).addValue(qResult.get(i).get(10 + k),"");
					}
					else {
						gdRes.getHeader("W_N" + k).addValue(qResult.get(i).get(10 + k),"");
					}
				}

			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	/*
	 * insert, update, delete
	 */
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		int union_check = 0; // UNION ALL ���Կ��� CHECK
		int union_check2 = 0; // UNION ALL ���Կ��� CHECK

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			String mode = gdReq.getParam("mode");
			
			String cnfm_date = gdReq.getParam("cnfm_date");
			String made_by = gdReq.getParam("user_id");

			String item_id = "";
			
			String gubn = "";
			String cust_stoc = "0";
			String cust_ipgo = "0";
			String expt_sell = "0";
			
			String crud = "";
			
			System.out.println("cnfm_date : "+cnfm_date);
			System.out.println("made_by : "+made_by);
			
			//������ �Ǽ��� ������ �����ȳ����ϱ�����.
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			System.out.println("CRUD Row Count : " + rowCount);
			
			String sql = "";
			
			// HAWA_EXPT_SELL ���� query	
			sql  = "merge into HAWA_EXPT_SELL	PA 	\n";
			sql += "using ( 						\n";
			sql += "	SELECT	CNFM_DATE,                	\n";
			sql += "			ITEM_ID,                  	\n";
			sql += "	        SUM(CUST_STOC)	CUST_STOC,	\n";
			sql += "	        SUM(CUST_IPGO)	CUST_IPGO,	\n";
			sql += "	        SUM(EXPT_SELL)	EXPT_SELL 	\n";
			sql += "	FROM   (                         	\n";
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				
				if(gdReq.getHeader("GUBN").getValue(i).equals("01") || gdReq.getHeader("GUBN").getValue(i).equals("03")
						|| gdReq.getHeader("GUBN").getValue(i).equals("06")){
					//System.out.println("GUBN�� ���(���), ���(�հ�), �ǸŽ����϶���  �������!!!!");
				}
				else {
					 
					if( union_check > 0){
						sql += "union all \n"; 
					}
					crud = gdReq.getHeader("CRUD").getValue(i);
					//System.out.println(gdReq.getHeader("ITEM_ID").getValue(i));	
					//System.out.println(crud);					 
					
					gubn = gdReq.getHeader("GUBN").getValue(i);
					item_id = gdReq.getHeader("ITEM_ID").getValue(i);

					cust_stoc = "0";
					cust_ipgo = "0";
					expt_sell = "0";
					
					union_check2 = 0;
					// �������� 26����
					for(int k = 0 ; k < 27 ; k++) {
						if( union_check2 > 0){
							sql += "union all \n"; 
						}
						
						if(gubn.equals("02") && k == 0 ) {

							cust_stoc = gdReq.getHeader("W_N0" + k).getValue(i);
							// ���� ----------------------------------------------------------------------------------------------------------------
							sql +=	"select TO_CHAR(TRUNC(TO_DATE(replace('" + cnfm_date + "','-',''),'YYYY-MM-DD'),'D') + 7 * " + k + " + 1,'YYYYMMDD') AS CNFM_DATE, 	\n"; 
							sql +=	"	  '" + item_id + "' AS ITEM_ID, 															\n"; 
							sql +=	"	  " + cust_stoc + " AS CUST_STOC, 															\n"; 
							sql +=	"	  " + cust_ipgo + " AS CUST_IPGO, 															\n"; 
							sql +=	"	  " + expt_sell + " AS EXPT_SELL 															\n"; 
							sql +=	"FROM	DUAL																					\n"; 
							//-------------------------------------------------------------------------------------------------------------------					 
							union_check2++;
							break;
						}
						else if(gubn.equals("04")){
							
							if(k < 10) {
								cust_ipgo = gdReq.getHeader("W_N0" + k).getValue(i);
							}
							else {
								cust_ipgo = gdReq.getHeader("W_N" + k).getValue(i);
							}
							// ���� ----------------------------------------------------------------------------------------------------------------
							sql +=	"select TO_CHAR(TRUNC(TO_DATE(replace('" + cnfm_date + "','-',''),'YYYY-MM-DD'),'D') + 7 * " + k + " + 1,'YYYYMMDD') AS CNFM_DATE, 	\n"; 
							sql +=	"	  '" + item_id + "' AS ITEM_ID, 															\n"; 
							sql +=	"	  " + cust_stoc + " AS CUST_STOC, 															\n"; 
							sql +=	"	  " + cust_ipgo + " AS CUST_IPGO, 															\n"; 
							sql +=	"	  " + expt_sell + " AS EXPT_SELL 															\n"; 
							sql +=	"FROM	DUAL																					\n"; 
							//-------------------------------------------------------------------------------------------------------------------
							union_check2++;
						}
						else if(gubn.equals("05")){
						
							if(k < 10) {
								expt_sell = gdReq.getHeader("W_N0" + k).getValue(i);
							}
							else {
								expt_sell = gdReq.getHeader("W_N" + k).getValue(i);
							}
							// ���� ----------------------------------------------------------------------------------------------------------------
							sql +=	"select TO_CHAR(TRUNC(TO_DATE(replace('" + cnfm_date + "','-',''),'YYYY-MM-DD'),'D') + 7 * " + k + " + 1,'YYYYMMDD') AS CNFM_DATE, 	\n"; 
							sql +=	"	  '" + item_id + "' AS ITEM_ID, 															\n"; 
							sql +=	"	  " + cust_stoc + " AS CUST_STOC, 															\n"; 
							sql +=	"	  " + cust_ipgo + " AS CUST_IPGO, 															\n"; 
							sql +=	"	  " + expt_sell + " AS EXPT_SELL 															\n"; 
							sql +=	"FROM	DUAL																					\n"; 
							//-------------------------------------------------------------------------------------------------------------------
							union_check2++;
						}
					}					
					if(rowCount == 1){ // update�Ǽ��� 1���� ��� ora-01732������ �߻��Ѵ�. ������. ���� 1���� ��� ������ �ΰ����� �����.
						sql += "UNION	ALL \n" + sql;
					}
					union_check++;
				}

			}//for�� ��.
			
			sql += "	        )                         	\n";
			sql += "	GROUP              	\n";
			sql += "	BY		CNFM_DATE, 	\n";
			sql += "			ITEM_ID    	\n";
			sql += ") PP \n";
			
			sql += "on (PA.CNFM_DATE = PP.CNFM_DATE                                                                                                  \n";
			sql += "AND PA.ITEM_ID = PP.ITEM_ID)                                                                                                  \n";
			sql += "when matched then update set                                                                                                 \n";
			sql += "     PA.CUST_STOC = PP.CUST_STOC,                                                                                        \n";
			sql += "     PA.CUST_IPGO = PP.CUST_IPGO,                                                                                        \n";
			sql += "     PA.EXPT_SELL = PP.EXPT_SELL,                                                                                        \n";
			sql += "     PA.MADE_TYPE = 'UP',                                                                                             \n";
			sql += "     PA.MADE_DTTM = SYSDATE,                                                                                             \n";
			sql += "     PA.MADE_BY = '"+   made_by  +"'                                                                                             \n";
			sql += "when not matched then insert(PA.CNFM_DATE, PA.ITEM_ID, PA.CUST_STOC, PA.CUST_IPGO, PA.EXPT_SELL, PA.MADE_TYPE, PA.MADE_DTTM, PA.MADE_BY)    \n";
			sql += "values(PP.CNFM_DATE, PP.ITEM_ID, PP.CUST_STOC, PP.CUST_IPGO, PP.EXPT_SELL, 'AD', SYSDATE, '"+   made_by  +"')                                 \n";

			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("sql executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("sql executeQuery ����!!!");

			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		} finally {
	        databaseUtility.close(conn, stmt, rs);              
	    }
		System.out.println("doSave() end!!!");

		return gdRes;
	}	
	
}                                                                                                                  