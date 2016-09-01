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
public class ip_01170_inventoryPlanAnalysis_md_semi_list extends HttpServlet {                                                             
                                                                                                                             
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
	        
			String start_date  = gdReq.getParam("start_date");                                                            
			String end_date    = gdReq.getParam("end_date");          
			 
			//String in_act_type = gdReq.getParam("in_act_type");                                                            
			String search_item = gdReq.getParam("search_item"); 
			String sales_cat05 = gdReq.getParam("sales_cat05");
			String sales_cat03 = gdReq.getParam("sales_cat03");
			String user_id	   = gdReq.getParam("user_id"); 
			
		                                                                                                                 
			String paramKey   = "start_date!%!end_date!%!search_item!%!user_id!%!sales_cat05!%!sales_cat03";                                                                      
			String paramCode  = start_date+"!%!"+end_date+"!%!"+search_item+"!%!"+user_id+"!%!"+sales_cat05+"!%!"+sales_cat03;                                                                   
		
			                                                                 
			
			String query_id   = "ip_01170_inventoryPlanAnalysis_md_semi_list";                                                             
                                                                                                                             
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
				
				gdRes.getHeader("SALES_CAT05"       ).addValue(qResult.get(i).get(0), "");
				gdRes.getHeader("SALES_CAT03"       ).addValue(qResult.get(i).get(1), "");
				gdRes.getHeader("ITEM_ID" 	        ).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("ITEM_NAME"	        ).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("SPEC"        		).addValue(qResult.get(i).get(4), "");
				
				gdRes.getHeader("BASE_STOCK"        ).addValue(qResult.get(i).get(5), "");
				gdRes.getHeader("OUT_STOCK"        	).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("STOCK_DAY"         ).addValue(qResult.get(i).get(7), "");	
					
				gdRes.getHeader("PROD_TERM"			).addValue(qResult.get(i).get(8), "");
				gdRes.getHeader("STOCK_HIDDEN"		).addValue(qResult.get(i).get(9), "");
				gdRes.getHeader("TERM_HIDDEN"		).addValue(qResult.get(i).get(10), "");
				gdRes.getHeader("TERM_VAL"			).addValue(qResult.get(i).get(11), "");
				gdRes.getHeader("TERM_PER"			).addValue(qResult.get(i).get(12), "");
				
				gdRes.getHeader("SALES_PRE"	        ).addValue(qResult.get(i).get(13), "");                                     
				gdRes.getHeader("SALES_CUR"	        ).addValue(qResult.get(i).get(14), "");
				gdRes.getHeader("SALES_SUM"	        ).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("STOCK_EXPT"		).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("PRE_MONTH_SELL"	).addValue(qResult.get(i).get(17),"");
				
				
				gdRes.getHeader("RECEIPT_EXPT_SUM"		).addValue(qResult.get(i).get(18),"");		//당월매입누계
				gdRes.getHeader("RECEIPT_EXPT_PRE"		).addValue(qResult.get(i).get(19),"");		//전월매입
				gdRes.getHeader("RECEIPT_YEAR_SUM"		).addValue(qResult.get(i).get(20),"");		//금년매입누계
				gdRes.getHeader("RECEIPT_YEAR_SUM_PRE"	).addValue(qResult.get(i).get(21),"");		//전년매입누계
				
				gdRes.getHeader("SALES_MEAN_1MON"	).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("SALES_MEAN_1MON2"	).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("SALES_MEAN_3MON" 	).addValue(qResult.get(i).get(23),"");
				gdRes.getHeader("SALES_MEAN_3MON2" 	).addValue(qResult.get(i).get(23),"");
				gdRes.getHeader("SALES_MEAN_1WEEK"	).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("SALES_MEAN_3WEEK"	).addValue(qResult.get(i).get(25),"");
				
				gdRes.getHeader("SALES_SUM_PY"	    ).addValue(qResult.get(i).get(26),"");		//전년동월누계				
				gdRes.getHeader("THIS_YEAR_SUM"	    ).addValue(qResult.get(i).get(27),"");		//금년누계
				gdRes.getHeader("LAST_YEAR_SUM"		).addValue(qResult.get(i).get(28),"");		//전년누계
				gdRes.getHeader("SUB_PY_MON"	    ).addValue(qResult.get(i).get(29),"");		//전년동월대비
				gdRes.getHeader("SUB_PY_YEAR"		).addValue(qResult.get(i).get(30),"");		//전년누계대비
				
				gdRes.getHeader("NWGT_PER_BUOM" 			).addValue(qResult.get(i).get(31),"");		//기초재고중량
				gdRes.getHeader("RECEIPT_EXPT_SUM_BUOM"		).addValue(qResult.get(i).get(32),"");		//당월매입누계중량
				gdRes.getHeader("RECEIPT_YEAR_SUM_BUOM" 	).addValue(qResult.get(i).get(33),"");		//금년매입누계중량
				gdRes.getHeader("RECEIPT_YEAR_SUM_PRE_BUOM" ).addValue(qResult.get(i).get(34),"");		//전년매입누계중량
				
				gdRes.getHeader("MON_SALE_CUM_BUOM" 		).addValue(qResult.get(i).get(35),"");		//당월판매누계중량
				gdRes.getHeader("YEAR_SALE_CUM_BUOM"		).addValue(qResult.get(i).get(36),"");		//년판매누계중량	
				gdRes.getHeader("YEAR_SALE_PRE_CUM_BUOM"	).addValue(qResult.get(i).get(37),"");		//전년판매누계중량
				
				gdRes.getHeader("BOX_PER_WORK_COST"			).addValue(qResult.get(i).get(38),"");		//박스당 작업비
				gdRes.getHeader("ISSUE_BOX_CUM"				).addValue(qResult.get(i).get(39),"");		//박스작업비
				gdRes.getHeader("ISSUE_CUM"					).addValue(qResult.get(i).get(40),"");		//매출액 누계
				gdRes.getHeader("DEV_WORK_COST"				).addValue(qResult.get(i).get(41),"");		//매출액대비 작업비 비율	
				
				gdRes.getHeader("ROWNUM" 					).addValue(qResult.get(i).get(42),"");
		                                                                                                          
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