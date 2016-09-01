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
public class rp_01015_transportPlanRegistration_mod_new extends HttpServlet {                                                             
                                                                                                                             
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
			

			                                                                                                                 
			String version = gdReq.getParam("version");                                                            
			String seq = gdReq.getParam("seq");                                                            
			String src_loc_sel = gdReq.getParam("src_loc_sel");                                                            
			String tgt_loc_sel = gdReq.getParam("tgt_loc_sel");                                                            
			String trans_start = gdReq.getParam("trans_start");                                                            
			String trans_end = gdReq.getParam("trans_end");                                                            
			String truck_seq_sel = gdReq.getParam("truck_seq_sel");                                                            
			String item_id = gdReq.getParam("item_id");                                                            
			String item_name = gdReq.getParam("item_name");                                                            
                                                         
			                                                                                                                 
			String paramKey   ="version!%!seq!%!src_loc_sel!%!tgt_loc_sel!%!trans_start!%!trans_end!%!truck_seq_sel!%!item_id!%!item_name";                                                                      
			String paramCode  = version+"!%!"+seq+"!%!"+src_loc_sel+"!%!"+tgt_loc_sel+"!%!"+trans_start+"!%!"+trans_end+"!%!"+truck_seq_sel+"!%!"+item_id+"!%!"+item_name;                                                                   
                                                                                                                             
			String query_id   = "rp_01015_transportPlanRegistration_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("PLAN_TYPE"		).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("CD_NAME"		).addValue(qResult.get(i).get(1  ),"");                                      
				gdRes.getHeader("TRANS_DATE"	).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("SRC_LOC"		).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("SRC_LOC_NAME"	).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("TGT_LOC"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("TGT_LOC_NAME"	).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("TRUCK_SEQ"		).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(8  ),"");                                      
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(9  ),"");                                      
				gdRes.getHeader("QTY"			).addValue(qResult.get(i).get(10 ),"");                                      
				gdRes.getHeader("EA_QTY"		).addValue(qResult.get(i).get(11 ),"");                                      
				gdRes.getHeader("PLT_CUM"		).addValue(qResult.get(i).get(12 ),"");                                      
				gdRes.getHeader("BRAND_NO"		).addValue(qResult.get(i).get(13 ),"");                                      
				gdRes.getHeader("BRAND_LINE_NO"	).addValue(qResult.get(i).get(14 ),"");                                      
				gdRes.getHeader("IF_FLAG"		).addValue(qResult.get(i).get(15 ),"");                                      
                                                                                                                             
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