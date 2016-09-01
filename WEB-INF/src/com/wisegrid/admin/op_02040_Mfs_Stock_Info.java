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
public class op_02040_Mfs_Stock_Info extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;                                                                                              
	                                                                                                                         
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
			else if (mode.equals("doSave")) //                                                                               
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

	
	// DW 1 조회  쿼리
	public GridData doQuery(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;

		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String com_code		= gdReq.getParam("com_code");                                                            
			String cnfm_date	= gdReq.getParam("cnfm_date");			                                                            			                                                                                                                 
			String paramKey   	=	"com_code!%!cnfm_date";                                                                      
			String paramCode  	= com_code+"!%!"+cnfm_date;                                                                                                                             
			String query_id   	= "op_02040_Mfs_Stock_Info";                                                             
                                                                                                                             
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
				
				gdRes.getHeader("CNFM_DATE"			).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("COM_CODE"			).addValue(qResult.get(i).get(1),"");                                      
				gdRes.getHeader("COM_NAME"			).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("COM_MATR_CODE"		).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("COM_MATR_NAME"		).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("NS_MATR_CODE"		).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("BASE_UOM"			).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("BASE_STOCK"		).addValue(qResult.get(i).get(7),"");       
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        


	
	// doReg // 등록화면 저장
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");



		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // SEQ 컬럼 row 수
		
		
			rowCount = gdReq.getHeader("COM_NAME").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("doSave : 저장할 DATA가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}

			
			String sql 
			= "INSERT  INTO Mfs_Stock_Info (CNFM_DATE, COM_CODE, COM_NAME, COM_MATR_CODE, COM_MATR_NAME, 	\n"
			+ "                         	NS_MATR_CODE, BASE_STOCK, MADE_TYPE, MADE_DTTM, MADE_BY)		\n";
					
			System.out.println("getParam");
			String com_code		= gdReq.getParam("com_code");	
			String user_id		= gdReq.getParam("user_id");				
			
			// 데이터 셋팅
			System.out.println("sql 쿼리 생성");
			for (int i = 0; i < rowCount; i++)  {  
				
					if( i > 0){
						sql += " union all \n"; 
					} 
						
						sql += "	SELECT	TO_CHAR(NEXT_DAY(TRUNC(SYSDATE,'D')-5,2),'YYYYMMDD') 		AS CNFM_DATE,   	\n";
						sql += "			'" + com_code									   	 + "'	AS COM_CODE,   		\n";
						
						sql += "			'" + gdReq.getHeader("COM_NAME"			).getValue(i)+ "'   AS COM_NAME, 		\n";
						sql += "			'" + gdReq.getHeader("COM_MATR_CODE"	).getValue(i)+ "'   AS COM_MATR_CODE,   \n";
						sql += "			'" + gdReq.getHeader("COM_MATR_NAME"	).getValue(i)+ "'   AS COM_MATR_NAME,	\n";
						sql += "			'" + gdReq.getHeader("NS_MATR_CODE"		).getValue(i)+ "'   AS NS_MATR_CODE,   	\n";
						
						sql += "	  		TRUNC('" + gdReq.getHeader("BASE_STOCK"	).getValue(i)+ "')  AS BASE_STOCK,   	\n";
						sql += "			'AD'														AS MADE_TYPE,      	\n";
						sql += "			SYSDATE														AS MADE_DTTM,      	\n";
						sql += "			'" + user_id									   	+ "'	AS MADE_BY 	    	\n";
						sql += "	FROM	DUAL			                                                  				\n";						
																									
			}
			
		try{
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
			
			String sql2 = "DELETE	 FROM	Mfs_Stock_Info WHERE CNFM_DATE =  NEXT_DAY(TRUNC(SYSDATE,'D')-5,2)	AND	COM_CODE = '" + com_code + "'\n";
			
			System.out.println("-----------------------------------------------QUERY-DELETE-----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY-DELETE-----------------------------------------------");
			boolean result = stmt.execute(sql2);
			
			System.out.println("-----------------------------------------------QUERY_INSERT-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY_INSERT-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			rs = databaseUtility.executeQuery(stmt, sql);
			System.out.println("executeQuery 종료!!!");			

			gdRes.addParam("mode", "doSave");
			gdRes.setMessage("성공적으로 작업하였습니다.");
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