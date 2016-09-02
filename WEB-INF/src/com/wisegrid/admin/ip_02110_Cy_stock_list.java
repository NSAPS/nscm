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
public class ip_02110_Cy_stock_list extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String start_date  	= gdReq.getParam("start_date"); 			
			String mto_gubn    	= gdReq.getParam("mto_gubn"); 
			String nation_gubn 	= gdReq.getParam("nation_gubn");
			String prod_term 	= gdReq.getParam("prod_term"); 
			String search_type	= gdReq.getParam("search_type");
			String user_id 		= gdReq.getParam("user_id"); 
		                                                                                                                 
			String paramKey   = "start_date!%!mto_gubn!%!nation_gubn!%!prod_term!%!user_id!%!search_type";                                                                      
			String paramCode  = start_date+"!%!"+mto_gubn+"!%!"+nation_gubn+"!%!"+prod_term+"!%!"+user_id+"!%!"+search_type; 
			
			String query_id   = "ip_02110_Cy_stock_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("SALES_CAT03"       ).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("ITEM_ID" 	        ).addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("ITEM_NAME"	        ).addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("SPEC"        		).addValue(qResult.get(i).get(3),"");                                     
				gdRes.getHeader("BASE_STOCK"        ).addValue(qResult.get(i).get(4),"");
				gdRes.getHeader("BASE_STOCK2"       ).addValue(qResult.get(i).get(4),"");
				gdRes.getHeader("DONGU_STOCK"       ).addValue(qResult.get(i).get(5),"");
				gdRes.getHeader("DONGU_STOCK_NEW"   ).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("DSJ_STOCK"	        ).addValue(qResult.get(i).get(7),""); 
				gdRes.getHeader("PS_STOCK"	        ).addValue(qResult.get(i).get(8),""); 
				gdRes.getHeader("GITA_STOCK"        ).addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("SALES_CUR"	        ).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("SALES_SUM"	        ).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("STOCK_EXPT"      	).addValue(qResult.get(i).get(12),"");
				
				gdRes.getHeader("CHGO_PLAN"      	).addValue(qResult.get(i).get(13),"");			//W출고계획량
				gdRes.getHeader("PROD_PLAN"      	).addValue(qResult.get(i).get(14),"");			//W생산계획량
				gdRes.getHeader("AVL_STOCK"      	).addValue(qResult.get(i).get(15),"");			//W+1가용재고
				
				gdRes.getHeader("CHGO_PLAN2"      	).addValue(qResult.get(i).get(16),"");			//W+1출고계획량
				gdRes.getHeader("PROD_PLAN2"      	).addValue(qResult.get(i).get(17),"");			//W+1생산계획량
				gdRes.getHeader("AVL_STOCK2"      	).addValue(qResult.get(i).get(18),"");			//W+2가용재고
				
				gdRes.getHeader("CHGO_PLAN3"      	).addValue(qResult.get(i).get(19),"");			//W+2출고계획량				
			
				gdRes.getHeader("CY_STOCK"      	).addValue(qResult.get(i).get(20),"");			//CY재고
				gdRes.getHeader("RECEIPT_EXPT"	    ).addValue(qResult.get(i).get(21),"");			//금일 생산계획
				gdRes.getHeader("RECEIPT_EXPT_SUM"	).addValue(qResult.get(i).get(22),"");			//생산누계
				
				gdRes.getHeader("M_1"				).addValue(qResult.get(i).get(23),"");			
				gdRes.getHeader("M_2"				).addValue(qResult.get(i).get(24),"");			
				gdRes.getHeader("M_3"				).addValue(qResult.get(i).get(25),"");			
				gdRes.getHeader("M_4"				).addValue(qResult.get(i).get(26),"");			
				gdRes.getHeader("M_5"				).addValue(qResult.get(i).get(27),"");			
				gdRes.getHeader("M_6"				).addValue(qResult.get(i).get(28),"");			
				gdRes.getHeader("TERM_VAL"			).addValue(qResult.get(i).get(29),"");
				gdRes.getHeader("DAY"				).addValue(qResult.get(i).get(30),"");
				gdRes.getHeader("PROD_TERM"			).addValue(qResult.get(i).get(31),"");       
				gdRes.getHeader("MTO_MTS"			).addValue(qResult.get(i).get(32),"");    
				gdRes.getHeader("EX_NATION"			).addValue(qResult.get(i).get(33),"");  
				gdRes.getHeader("GYR"				).addValue(qResult.get(i).get(34),"");
				gdRes.getHeader("PRE_CHGO"      	).addValue(qResult.get(i).get(35),"");
				gdRes.getHeader("MI_CHGO"      		).addValue(qResult.get(i).get(36),"");
				gdRes.getHeader("WEEK_STOCK"      	).addValue(qResult.get(i).get(37),"");
				gdRes.getHeader("MI_ORDER"      	).addValue(qResult.get(i).get(38),"");
				gdRes.getHeader("BK_ORDER"      	).addValue(qResult.get(i).get(39),"");
				gdRes.getHeader("BK2_ORDER"      	).addValue(qResult.get(i).get(40),"");
				gdRes.getHeader("ROWNUM"      		).addValue(qResult.get(i).get(41),"");
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