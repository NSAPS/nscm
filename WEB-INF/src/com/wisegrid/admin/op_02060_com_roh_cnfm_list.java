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
public class op_02060_com_roh_cnfm_list extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;                                                                                              
	String 		sql2 	= null;                                                                                              
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
                                                                                  
			else if (mode.equals("search3")) //                                                                               
				gdRes = doQuery3(gdReq);
			else if (mode.equals("search4")) //                                                                               
				gdRes = doQuery4(gdReq);
			else if (mode.equals("search7")) //                                                                               
				gdRes = doQuery7(gdReq);

		
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
			                                                            
			
			String cnfm_date	= gdReq.getParam("cnfm_date");
			String mfs_flag		=	gdReq.getParam("mfs_flag");  
			String user_id		=	gdReq.getParam("user_id");			                                                                                                                 
			String com_code		=	gdReq.getParam("com_code");

			String paramKey		=	"cnfm_date!%!mfs_flag!%!user_id!%!com_code";
			String paramCode	=	cnfm_date+"!%!"+mfs_flag+"!%!"+user_id+"!%!"+com_code;
                                                                                                                             
			String query_id		=	"op_02060_com_roh_cnfm_list";                                                             
                                                                                                                             
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

				gdRes.getHeader("CRUD"				).addValue( "", "");
                   
				gdRes.getHeader("ITEM_ID"			).addValue(qResult.get(i).get(0) ,"");                                      
				gdRes.getHeader("COM_MATR_CODE"		).addValue(qResult.get(i).get(1) ,"");
				gdRes.getHeader("ITEM_NAME" 		).addValue(qResult.get(i).get(2) ,"");                                     
				gdRes.getHeader("BASE_UOM" 			).addValue(qResult.get(i).get(3) ,"");                          
				
				gdRes.getHeader("STOCK" 			).addValue(qResult.get(i).get(4) ,"");
				gdRes.getHeader("COM_STOCK" 		).addValue(qResult.get(i).get(5) ,"");                                     
				gdRes.getHeader("CNFM_STOCK" 		).addValue(qResult.get(i).get(6) ,"");                                     
				gdRes.getHeader("SUB_TOT" 			).addValue(qResult.get(i).get(7) ,"");                                     

				gdRes.getHeader("ODER_QTY" 			).addValue(qResult.get(i).get(8) ,"");
				gdRes.getHeader("W1_STOCK" 			).addValue(qResult.get(i).get(9) ,"");

				gdRes.getHeader("FC_QTY" 			).addValue(qResult.get(i).get(10),"");  
				gdRes.getHeader("MSG"				).addValue(qResult.get(i).get(11),"");
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                            
	
	
	//하단 그리드 WD3 조회 쿼리
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		System.out.println("search3() start!!!");
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String	com_matr_code	=	gdReq.getParam("com_matr_code");                                                                                                                 
			String cnfm_date		=	gdReq.getParam("cnfm_date");
			String paramKey			=	"cnfm_date!%!com_matr_code";
			String paramCode		=	cnfm_date+"!%!"+com_matr_code;                                                                       
			String query_id			=	"op_02060_MFS_STD_STOCK_dw3";   //dw3 재고전개 뭐리 호출 부분                                                          
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search3");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			System.out.println("search3() rowCount!!!"+rowCount);
			System.out.println(rowCount);
			
			for (int i = 0; i < rowCount; i++) {                                                                             
				gdRes.getHeader("COM_MATR_CODE"		).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("COM_MATR_NAME"		).addValue(qResult.get(i).get(1),"");
				
				gdRes.getHeader("UNIT"				).addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("PRE_STD)STOCK"		).addValue(qResult.get(i).get(3),"");
				gdRes.getHeader("PRE_FC_QTY"		).addValue(qResult.get(i).get(4),"");
				gdRes.getHeader("PRE_IPGO"			).addValue(qResult.get(i).get(5),"");
				gdRes.getHeader("NOW_EXPT"			).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("SIL_STOCK"			).addValue(qResult.get(i).get(7),"");
				gdRes.getHeader("DIFF_QTY"			).addValue(qResult.get(i).get(8),"");
				gdRes.getHeader("CNFM_STOCK"		).addValue(qResult.get(i).get(9),"");
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search3");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}     

	// DW 4 조회  쿼리
	public GridData doQuery4(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			String itype		=	gdReq.getParam("itype");
			String query_id		=	gdReq.getParam("query_id");	
			String com_code		=	gdReq.getParam("com_code");	

			String paramKey		=	"item_id!%!itype!%!query_id!%!com_code";                                                                      
			String paramCode	=	item_id+"!%!"+itype+"!%!"+query_id+"!%!"+com_code;                                                                   

			System.out.println("query_id"+query_id);				                                                             
			                                                                                     
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search4");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             
				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(0),"");
				
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(1),"");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(2),"");                                     
				gdRes.getHeader("MM_0_QTY"	).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("MM_1_QTY"	).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("MM_2_QTY"	).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("MM_3_QTY"	).addValue(qResult.get(i).get(6),"");                                      
				gdRes.getHeader("MM_4_QTY"	).addValue(qResult.get(i).get(7),"");                                      
				gdRes.getHeader("MM_5_QTY"	).addValue(qResult.get(i).get(8),"");                                     
				gdRes.getHeader("MM_6_QTY"	).addValue(qResult.get(i).get(9),"");                                     
				gdRes.getHeader("MM_7_QTY"	).addValue(qResult.get(i).get(10),"");                                      
				gdRes.getHeader("MM_8_QTY"	).addValue(qResult.get(i).get(11),"");                                      
				                                     
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search4");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}            
	
	
	// DW 7 조회  쿼리
	public GridData doQuery7(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                       
			                                                            
			String cons_item_id		=	gdReq.getParam("cons_item_id");
			String cnfm_date		= gdReq.getParam("cnfm_date");
			
			String paramKey		=	"cons_item_id!%!cnfm_date";                                                                      
			String paramCode	=	cons_item_id+"!%!"+cnfm_date;                                                                    
			String query_id		=	"op_02050_even_item_list_dw7";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search7");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("EVEN_DATE"	).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("PROD_CODE"	).addValue(qResult.get(i).get(1),"");                                      
				gdRes.getHeader("ITEM_NAME"	).addValue(qResult.get(i).get(2),"");                                     
				gdRes.getHeader("E_QTY"		).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("H_QTY" 	).addValue(qResult.get(i).get(4),"");                                     
				gdRes.getHeader("L_QTY"		).addValue(qResult.get(i).get(5),"");                                      
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search7");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}









}                     


                                                                                         