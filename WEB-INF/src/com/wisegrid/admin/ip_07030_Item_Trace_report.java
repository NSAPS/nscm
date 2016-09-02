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
public class ip_07030_Item_Trace_report extends HttpServlet {                                                             
                                                                                                                             
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
			else if (mode.equals("search3")) //                                                                               
				gdRes = doQuery3(gdReq);				                                                                     
			                                                                                                                 
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
			String in_item_id = gdReq.getParam("in_item_id");
			String in_bl_no = gdReq.getParam("in_bl_no");
			                                                                                                                 
			String paramKey   ="in_fr_date!%!in_to_date!%!in_item_id!%!in_bl_no";                                                                      
			String paramCode  = in_fr_date+"!%!"+in_to_date+"!%!"+in_item_id+"!%!"+in_bl_no;                                                                   
                                                                                                                             
			String query_id   = "ip_07030_Item_Trace_report_DW1";                                                             
                                                                                                                             
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
				
				gdRes.getHeader("INBOUND_DATE"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("DC_ID" 		).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("DC_NAME"       ).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("ITEM_CD"       ).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("ITEM_NM"		).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("IPGO"			).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("BL_NO"			).addValue(qResult.get(i).get(6  ),"");                                     
                                                                                                                             
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            

			String sel_date = gdReq.getParam("sel_date");                                                            
			String sel_dc_id = gdReq.getParam("sel_dc_id"); 
			String sel_item_id = gdReq.getParam("sel_item_id");
			String sel_bl_no = gdReq.getParam("sel_bl_no");                                                            
			                                                                                                                 
			String paramKey   ="sel_date!%!sel_dc_id!%!sel_item_id!%!sel_bl_no";                                                                      
			String paramCode  = sel_date+"!%!"+sel_dc_id+"!%!"+sel_item_id+"!%!"+sel_bl_no;                                                                   
                                                                                                                             
			String query_id   = "ip_07030_Item_Trace_report_DW2";                                                             
                                                                                                                             
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

				gdRes.getHeader("DC_ID"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("DC_NAME" 		).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("IPGO"       ).addValue(qResult.get(i).get(2  ),"");                                     
				                                                                                                             
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}  	
	
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String sel_date = gdReq.getParam("sel_date");                                                            
			String sel_dc_id = gdReq.getParam("sel_dc_id"); 
			String sel_item_id = gdReq.getParam("sel_item_id");
			String sel_bl_no = gdReq.getParam("sel_bl_no");                                                            
			                                                                                                                 
			String paramKey   ="sel_date!%!sel_dc_id!%!sel_item_id!%!sel_bl_no";                                                                      
			String paramCode  = sel_date+"!%!"+sel_dc_id+"!%!"+sel_item_id+"!%!"+sel_bl_no;                                                                   
                                                                                                                             
			String query_id   = "ip_07030_Item_Trace_report_DW3";                                                             
                                                                                                                             
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
				
				gdRes.getHeader("OUTBOUND_DATE"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("CUST_ID" 		).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("CUST_NAME"       ).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("ADDR"       ).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("TEL_NO"		).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("CHGO"			).addValue(qResult.get(i).get(5  ),"");                                     
                                                                                                                             
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