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
public class sc_03010_Nfos_Order_Prod_Reqt extends HttpServlet {                                                             
                                                                                                                             
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
                                                                                                                             
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String in_fr_date = gdReq.getParam("in_fr_date");                                                            
			String in_to_date = gdReq.getParam("in_to_date"); 
			String in_mto_mts = gdReq.getParam("in_mto_mts"); 
			                                                                                                                 
			String paramKey   ="in_fr_date!%!in_to_date!%!in_mto_mts";                                                                      
			String paramCode  = in_fr_date+"!%!"+in_to_date+"!%!"+in_mto_mts;                                                                   
                                                                                                                             
			String query_id   = "sc_03010_Nfos_Order_Prod_Reqt";                                                             
                                                                                                                             
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

				gdRes.getHeader("ORD_NO"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("ORD_ITEM_NO" 		).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("SOLD_PART"       ).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("CUST_NAME"       ).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("CAT06"		).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("ITEM_NAME"			).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("SPEC"			).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("MTO_MTS"	).addValue(qResult.get(i).get(8  ),"");                                      
				gdRes.getHeader("IPGO" 		).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("PROD_REQ_DATE"       ).addValue(qResult.get(i).get(10  ),"");                                     
				gdRes.getHeader("CRUD"       ).addValue(qResult.get(i).get(11  ),"");                                     
                                                                                                                             
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
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		int union_check = 0; // UNION ALL 포함여부 CHECK

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			String made_by = gdReq.getParam("user_id");

			String crud = "";
			String ord_no = "";
			String ord_item_no = "";
			String item_id = ""; 
			String prod_req_date = ""; 
			
			
			//보정할 건수가 없을때 오류안나게하기위해.
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("저장데이터가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			System.out.println("CRUD Row Count : " + rowCount);
			
			String sql = "";
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
				sql  = "merge into NFOS_ORDER_PROD_REQT PA \n";
				sql += "using ( \n";
			
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				
				if( union_check > 0){
					sql += "union all \n"; 
				}
				crud = gdReq.getHeader("CRUD").getValue(i);				
				ord_no = gdReq.getHeader("ORD_NO").getValue(i);				
				ord_item_no = gdReq.getHeader("ORD_ITEM_NO").getValue(i);				
				item_id = gdReq.getHeader("ITEM_ID").getValue(i);				
				prod_req_date = gdReq.getHeader("PROD_REQ_DATE").getValue(i);				
				
				System.out.println(crud);					 
				System.out.println(ord_no);					 
				System.out.println(ord_item_no);					 
				System.out.println(item_id);					 
				System.out.println(prod_req_date);					 
				
					
				//한개의 로우.
				//-------------------------------------------------------------------------------------------------------------------
				sql += "select '" + ord_no + "' AS ORD_NO, '" + ord_item_no + "' AS ORD_ITEM_NO, '" + item_id + "' AS ITEM_ID, '" + prod_req_date + "' AS PROD_REQ_DATE from DUAL \n";
				//-------------------------------------------------------------------------------------------------------------------					 
			 
				union_check++;
				 
									
			}//for문 끝.
			
			sql += ") PP \n";
			
			
			sql += "on (PA.ORD_NO = PP.ORD_NO                                                                                                  	\n";
			sql += "AND PA.ORD_ITEM_NO = PP.ORD_ITEM_NO                                                                                        	\n";
			sql += "AND PA.ITEM_ID = PP.ITEM_ID)                                                                                               	\n";
			sql += "when matched then update set                                                                                               	\n";
			sql += "     PA.PROD_REQ_DATE = PP.PROD_REQ_DATE,                                                                                	\n";
			sql += "     PA.MADE_TYPE = 'UP',                                                                                             		\n";
			sql += "     PA.MADE_DTTM = SYSDATE,                                                                                             	\n";
			sql += "     PA.MADE_BY = '"+ made_by + "'                                                                                        \n";
			sql += "when not matched then insert(PA.ORD_NO, PA.ORD_ITEM_NO, PA.ITEM_ID, PA.PROD_REQ_DATE, PA.MADE_TYPE, PA.MADE_DTTM, PA.MADE_BY)   \n";
			sql += "values(PP.ORD_NO, PP.ORD_ITEM_NO, PP.ITEM_ID, PP.PROD_REQ_DATE, 'AD', SYSDATE, '"+ made_by + "')                         \n";

			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("성공적으로 작업하였습니다.");
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