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
public class op_02030_Material_Refreshing_List extends HttpServlet {                                                             
                                                                                                                             
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
			else if (mode.equals("search2")) //                                                                                    
				gdRes = doQuery2(gdReq);     
			
			
			
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
		        
				String item_id		= gdReq.getParam("item_id");                                                            
				String item_name	= gdReq.getParam("item_name"); 
				
				String paramKey		= "item_id!%!item_name";                                                                      
				String paramCode	= item_id+"!%!"+item_name;
				String query_id		= "op_02030_Material_Refreshing_List";                                                             
	                                                                                                                             
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
				
				gdRes.getHeader("GUBN"  			).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("SELECTED"			).addValue("0", "");
				gdRes.getHeader("CONS_ITEM_ID"  	).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("CONS_ITEM_NAME"	).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("MEINS"		 		).addValue(qResult.get(i).get(3), "");				
				gdRes.getHeader("REQ_QTY"     		).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("TOT"     			).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("CONV_QTY"     		).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("PEINH"     		).addValue(qResult.get(i).get(7), "");
				gdRes.getHeader("NETPR"     		).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("WAERS"     		).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("PAY"     			).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("QTY1"     			).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("QTY2"     			).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("QTY3"     			).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("QTY4"     			).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("QTY5"     			).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("QTY6"     			).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("QTY7"     			).addValue(qResult.get(i).get(17),"");				
				gdRes.getHeader("COM_STOCK"			).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("PROD_CUST_NAME"	).addValue(qResult.get(i).get(19),"");
				
			}  	
    	                                                                
				gdRes.addParam("mode", "search");		                                                                         
				gdRes.setMessage("성공적으로 작업을 마쳤습니다");                                                                                            
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
	        
			String item_id			= gdReq.getParam("item_id");                                                            
			String cons_item_id     = gdReq.getParam("cons_item_id");
			String item_name		= gdReq.getParam("item_name"); 
		                                                                                                                 
			String paramKey			= "item_id!%!item_name!%!cons_item_id";                                                                      
			String paramCode		= item_id+"!%!"+item_name+"!%!"+cons_item_id;
			String query_id			= "op_02030_Material_Refreshing_List";                                                             
	                                                                                                                         
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                         
		//                                                                                                               
		if (rowCount == 0) {                                                                                             
			gdRes.addParam("mode", "search2");		                                                                     
			gdRes.setMessage("...");                                                                                     
			gdRes.setStatus("true");                                                                                     
			return gdRes;                                                                                                
							}                                                                                                                
				                                                                                                                 
//	                                                                        
		for (int i = 0; i < rowCount; i++) {    

			gdRes.getHeader("GUBN"  			).addValue(qResult.get(i).get(0), "");
			gdRes.getHeader("SELECTED"			).addValue("0", "");
			gdRes.getHeader("CONS_ITEM_ID"  	).addValue(qResult.get(i).get(1), "");
			gdRes.getHeader("CONS_ITEM_NAME"	).addValue(qResult.get(i).get(2), "");
			gdRes.getHeader("MEINS"		 		).addValue(qResult.get(i).get(3), "");			
			gdRes.getHeader("REQ_QTY"     		).addValue(qResult.get(i).get(4), "");
			gdRes.getHeader("TOT"     			).addValue(qResult.get(i).get(5), "");
			gdRes.getHeader("CONV_QTY"     		).addValue(qResult.get(i).get(6), "");			
			gdRes.getHeader("PEINH"     		).addValue(qResult.get(i).get(7), "");
			gdRes.getHeader("NETPR"     		).addValue(qResult.get(i).get(8), "");
			gdRes.getHeader("WAERS"     		).addValue(qResult.get(i).get(9), "");
			gdRes.getHeader("PAY"     			).addValue(qResult.get(i).get(10),"");
			gdRes.getHeader("QTY1"     			).addValue(qResult.get(i).get(11),"");
			gdRes.getHeader("QTY2"     			).addValue(qResult.get(i).get(12),"");
			gdRes.getHeader("QTY3"     			).addValue(qResult.get(i).get(13),"");
			gdRes.getHeader("QTY4"     			).addValue(qResult.get(i).get(14),"");
			gdRes.getHeader("QTY5"     			).addValue(qResult.get(i).get(15),"");
			gdRes.getHeader("QTY6"     			).addValue(qResult.get(i).get(16),"");
			gdRes.getHeader("QTY7"     			).addValue(qResult.get(i).get(17),"");
			gdRes.getHeader("COM_STOCK"			).addValue(qResult.get(i).get(18),"");
			gdRes.getHeader("PROD_CUST_NAME"	).addValue(qResult.get(i).get(19),"");

		}
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("성공적으로 작업을 마쳤습니다");                                                                                            
			gdRes.setStatus("true");                                                                                                                
	} catch (Exception e) {                                                                                              
		throw e;                                                                                                         
	}                                                                                                                    
			                                                                                                             
	return gdRes;                                                                                                        
}                                                                                                                       
}