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
public class op_02080_fc_planVsActual_list extends HttpServlet {                                                             
                                                                                                                             
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
			                                                                                                                 
			                                                            
			String sel_gubn		= gdReq.getParam("sel_gubn"); 
			String com_code		= gdReq.getParam("com_code");                                                            
			String mfs_flag		= gdReq.getParam("mfs_flag"); 
			String cnfm_date	= gdReq.getParam("cnfm_date");
			String in_item_id	= gdReq.getParam("in_item_id"); 
			String in_item_name	= gdReq.getParam("in_item_name");

			
			String paramKey   	=	"sel_gubn!%!com_code!%!mfs_flag!%!cnfm_date!%!in_item_id!%!in_item_name";                                                                      
			String paramCode  	=	sel_gubn+"!%!"+com_code+"!%!"+mfs_flag+"!%!"+cnfm_date+"!%!"+in_item_id+"!%!"+in_item_name;                                                                   

			
			String query_id   = "op_02080_fc_planVsActual_list";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       

			System.out.println("SDFSDFS!!!"+rowCount);
			System.out.println(rowCount);
			
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("COM_NAME" 		) .addValue(qResult.get(i).get(0),"");
				//gdRes.getHeader("ITEM_ID" 		) .addValue(qResult.get(i).get(1),"");
				//gdRes.getHeader("ITEM_NAME"	    ) .addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("MATR_CODE" 	) .addValue(qResult.get(i).get(1),"");                                     
				gdRes.getHeader("MATR_NAME"   	) .addValue(qResult.get(i).get(2),"");                                     
				gdRes.getHeader("BASE_UOM"	    ) .addValue(qResult.get(i).get(3),"");  
				
				gdRes.getHeader("W8_FC_QTY" 	) .addValue(qResult.get(i).get(4),"");
				gdRes.getHeader("W8_PROD_QTY"	) .addValue(qResult.get(i).get(5),"");
				gdRes.getHeader("W8_DIV_QTY" 	) .addValue(qResult.get(i).get(6),"");                                     
				gdRes.getHeader("W8_PROD_AMT"   ) .addValue(qResult.get(i).get(7),"");                                     
				
				gdRes.getHeader("W7_FC_QTY" 	) .addValue(qResult.get(i).get(8),"");
				gdRes.getHeader("W7_PROD_QTY"	) .addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("W7_DIV_QTY" 	) .addValue(qResult.get(i).get(10),"");                                     
				gdRes.getHeader("W7_PROD_AMT"   ) .addValue(qResult.get(i).get(11),"");                                     
				
				gdRes.getHeader("W6_FC_QTY" 	) .addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("W6_PROD_QTY"	) .addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("W6_DIV_QTY" 	) .addValue(qResult.get(i).get(14),"");                                     
				gdRes.getHeader("W6_PROD_AMT"   ) .addValue(qResult.get(i).get(15),"");                                     
				
				gdRes.getHeader("W5_FC_QTY" 	) .addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("W5_PROD_QTY"	) .addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("W5_DIV_QTY" 	) .addValue(qResult.get(i).get(18),"");                                     
				gdRes.getHeader("W5_PROD_AMT"   ) .addValue(qResult.get(i).get(19),"");                                     
				
				gdRes.getHeader("W4_FC_QTY" 	) .addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("W4_PROD_QTY"	) .addValue(qResult.get(i).get(21),"");
				gdRes.getHeader("W4_DIV_QTY" 	) .addValue(qResult.get(i).get(22),"");                                     
				gdRes.getHeader("W4_PROD_AMT"   ) .addValue(qResult.get(i).get(23),"");                                     
				
				gdRes.getHeader("W3_FC_QTY" 	) .addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("W3_PROD_QTY"	) .addValue(qResult.get(i).get(25),"");
				gdRes.getHeader("W3_DIV_QTY" 	) .addValue(qResult.get(i).get(26),"");                                     
				gdRes.getHeader("W3_PROD_AMT"   ) .addValue(qResult.get(i).get(27),"");                                     

				gdRes.getHeader("W2_FC_QTY" 	) .addValue(qResult.get(i).get(28),"");
				gdRes.getHeader("W2_PROD_QTY"	) .addValue(qResult.get(i).get(29),"");
				gdRes.getHeader("W2_DIV_QTY" 	) .addValue(qResult.get(i).get(30),"");                                     
				gdRes.getHeader("W2_PROD_AMT"   ) .addValue(qResult.get(i).get(31),"");                                     

				gdRes.getHeader("W1_FC_QTY" 	) .addValue(qResult.get(i).get(32),"");
				gdRes.getHeader("W1_PROD_QTY"	) .addValue(qResult.get(i).get(33),"");
				gdRes.getHeader("W1_DIV_QTY" 	) .addValue(qResult.get(i).get(34),"");                                     
				gdRes.getHeader("W1_PROD_AMT"   ) .addValue(qResult.get(i).get(35),"");                                     

				gdRes.getHeader("FC_QTY_TOT"	) .addValue(qResult.get(i).get(36),"");
				gdRes.getHeader("PROD_QTY_TOT"	) .addValue(qResult.get(i).get(37),"");                                     
				gdRes.getHeader("DIV_QTY_TOT"   ) .addValue(qResult.get(i).get(38),"");                                     
				gdRes.getHeader("PROD_AMT_TOT"	) .addValue(qResult.get(i).get(39),"");
                                                                                                                            
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