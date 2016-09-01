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
public class op_02010_Long_Term_Planning_list_fert_halb_stock_list extends HttpServlet {                                                             
                                                                                                                             
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

	
	// DW 1 Á¶È¸  Äõ¸®
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			//service_url += "&=" + item_id + "&=" + item_name + "&=" + week_flag;
			
			
			String item_id		= gdReq.getParam("item_id");                                                            
			String item_name	= gdReq.getParam("item_name");                                                            
			                                                                                                                 
			String paramKey   ="item_id!%!item_name";                                                                      
			String paramCode  = item_id+"!%!"+item_name;
                                                                                                                             
			String query_id   = "op_02010_Long_Term_Planning_list_fert_halb_stock_list";                                                             
                                                                                                                             
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

				
				//gdRes.getHeader("CRUD"			).addValue( "", "");
				//gdRes.getHeader("SELECTED"		).addValue("0", "");                    
				gdRes.getHeader("CONS_ITEM_ID" 		).addValue(qResult.get(i).get(0  ),"");                                     
				gdRes.getHeader("CONS_ITEM_NAME" 	).addValue(qResult.get(i).get(1  ),"");
				gdRes.getHeader("PROD_ITEM_TYPE" 	).addValue(qResult.get(i).get(2  ),"");
				gdRes.getHeader("PROD_ITEM_ID" 		).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("PROD_ITEM_NAME" 	).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("QTY_UOM" 			).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("STOCK_QTY" 		).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("SALES_3WEEK" 		).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("STOCK_DAY" 		).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("PROD_3MONTH" 		).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("PROD_1YEAR" 		).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("PROD_PLAN" 		).addValue(qResult.get(i).get(11 ),"");                                     
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        




	
	
	
}                                                                                                                  