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
public class ip_04020_GYR_information_list extends HttpServlet {                                                             
                                                                                                                             
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
			System.out.println("Test :: mode = " + mode);                                                                    
			System.out.println("Test :: mode = " + mode);                                                                    
			System.out.println("Test :: mode = " + mode);                                                                    
                                                                                                                             
			if (mode.equals("search")) //                                                                                    
				gdRes = doQuery(gdReq);                                                                                      
			else if (mode.equals("insert")) //                                                                               
				gdRes = doInsert(gdReq);                                                                                     
			else if (mode.equals("update")) //                                                                               
				gdRes = doUpdata(gdReq);				                                                                     
			else if (mode.equals("delete")) //                                                                               
				gdRes = doDelete(gdReq);                                                                                     
			else if (mode.equals("save"))                                                                                    
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
			                                                                                                                 
			String in_work_date = gdReq.getParam("in_work_date");                                                            
			String sel_dw = gdReq.getParam("sel_dw");                                                                        
			                                                                                                                 
			String paramKey   ="in_work_date!%!sel_dw";                                                                      
			String paramCode  = in_work_date+"!%!"+sel_dw;                                                                   
                                                                                                                             
			String query_id   = "ip_04020_GYR_information_list";                                                             
                                                                                                                             
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
				//gdRes.getHeader("CRUD").addValue("", "");  //추가,삭제,보정 을 구분하기 위한 부분.C(추가) ,U(보정) ,D(삭제)
                                                                                                                             
				gdRes.getHeader("ITEM_ID"        ).addValue(qResult.get(i).get(0 ),"");                                      
				gdRes.getHeader("ITEM_NAME"      ).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("TERM_VAL"       ).addValue(qResult.get(i).get(2  ),"");                                     
				gdRes.getHeader("GYR_RATE"       ).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("GYR"        	 ).addValue(qResult.get(i).get(4  ),"");                                     
				gdRes.getHeader("PERIOD_DATE"    ).addValue(qResult.get(i).get(5  ),"");                                     
				gdRes.getHeader("PERIOD_RATE"    ).addValue(qResult.get(i).get(6  ),"");                                     
				gdRes.getHeader("BOX7100"        ).addValue(qResult.get(i).get(7  ),"");                                     
				gdRes.getHeader("BOX7200"        ).addValue(qResult.get(i).get(8  ),"");                                     
				gdRes.getHeader("BOX7300"        ).addValue(qResult.get(i).get(9  ),"");                                     
				gdRes.getHeader("BOX7400"        ).addValue(qResult.get(i).get(10 ),"");                                     
				gdRes.getHeader("BOX7500"        ).addValue(qResult.get(i).get(11 ),"");                                     
				gdRes.getHeader("BOX7600"        ).addValue(qResult.get(i).get(12 ),"");                                     
				gdRes.getHeader("BOX7700"        ).addValue(qResult.get(i).get(13 ),"");                                     
				gdRes.getHeader("BOX7800"        ).addValue(qResult.get(i).get(14 ),"");                                     
				gdRes.getHeader("BOX8000"        ).addValue(qResult.get(i).get(15 ),"");                                     
				gdRes.getHeader("BOX8110"        ).addValue(qResult.get(i).get(16 ),"");                                     
				gdRes.getHeader("BOX8120"        ).addValue(qResult.get(i).get(17 ),"");                                     
				gdRes.getHeader("BOX8121"        ).addValue(qResult.get(i).get(18 ),"");                                     
				gdRes.getHeader("BOX8122"        ).addValue(qResult.get(i).get(19 ),"");                                     
				gdRes.getHeader("BOX8123"        ).addValue(qResult.get(i).get(20 ),"");                                     
				gdRes.getHeader("BOX8130"        ).addValue(qResult.get(i).get(21 ),"");                                     
				gdRes.getHeader("BOX8140"        ).addValue(qResult.get(i).get(22 ),"");                                     
				gdRes.getHeader("BOX8150"        ).addValue(qResult.get(i).get(23 ),"");                                     
				gdRes.getHeader("BOX8160"        ).addValue(qResult.get(i).get(24 ),"");                                     
				gdRes.getHeader("BOX8170"        ).addValue(qResult.get(i).get(25 ),"");                                     
				gdRes.getHeader("BOX8310"        ).addValue(qResult.get(i).get(26 ),"");                                     
				gdRes.getHeader("BOX8320"        ).addValue(qResult.get(i).get(27 ),"");                                     
				gdRes.getHeader("BOX8330"        ).addValue(qResult.get(i).get(28 ),"");                                     
				gdRes.getHeader("BOX8340"        ).addValue(qResult.get(i).get(29 ),"");                                     
				gdRes.getHeader("BOX8350"        ).addValue(qResult.get(i).get(30 ),"");                                     
				gdRes.getHeader("BOX8410"        ).addValue(qResult.get(i).get(31 ),"");                                     
				gdRes.getHeader("BOX8420"        ).addValue(qResult.get(i).get(32 ),"");                                     
				gdRes.getHeader("BOX8430"        ).addValue(qResult.get(i).get(33 ),"");                                     
				gdRes.getHeader("BOX8440"        ).addValue(qResult.get(i).get(34 ),"");                                     
				gdRes.getHeader("BOX8510"        ).addValue(qResult.get(i).get(35 ),"");                                     
				gdRes.getHeader("BOX8511"        ).addValue(qResult.get(i).get(36 ),"");                                     
				gdRes.getHeader("BOX8520"        ).addValue(qResult.get(i).get(37 ),"");                                     
				gdRes.getHeader("BOX8530"        ).addValue(qResult.get(i).get(38 ),"");                                     
				gdRes.getHeader("BOX8540"        ).addValue(qResult.get(i).get(39 ),"");                                     
				gdRes.getHeader("BOX8610"        ).addValue(qResult.get(i).get(40 ),"");                                     
				gdRes.getHeader("BOX8620"        ).addValue(qResult.get(i).get(41 ),"");                                     
				gdRes.getHeader("BOX8630"        ).addValue(qResult.get(i).get(42 ),"");                                     
				gdRes.getHeader("BOX8710"        ).addValue(qResult.get(i).get(43 ),"");                                     
				gdRes.getHeader("BOX8720"        ).addValue(qResult.get(i).get(44 ),"");                                     
				gdRes.getHeader("BOX8730"        ).addValue(qResult.get(i).get(45 ),"");                                     
				gdRes.getHeader("BOX8740"        ).addValue(qResult.get(i).get(46 ),"");                                     
				gdRes.getHeader("BOX8750"        ).addValue(qResult.get(i).get(47 ),"");                                     
				gdRes.getHeader("BOX8760"        ).addValue(qResult.get(i).get(48 ),"");                                     
				gdRes.getHeader("BOX1811"        ).addValue(qResult.get(i).get(49 ),"");                                     
				gdRes.getHeader("BOX1816"        ).addValue(qResult.get(i).get(50 ),"");                                     
				gdRes.getHeader("BOX1841"        ).addValue(qResult.get(i).get(51 ),"");                                     
				gdRes.getHeader("BOX8901"        ).addValue(qResult.get(i).get(52 ),"");                                     
				gdRes.getHeader("BOX8902"        ).addValue(qResult.get(i).get(53 ),"");                                     
				gdRes.getHeader("BOX8903"        ).addValue(qResult.get(i).get(54 ),"");                                     
				gdRes.getHeader("BOX8904"        ).addValue(qResult.get(i).get(55 ),"");                                     
				gdRes.getHeader("BOX8905"        ).addValue(qResult.get(i).get(56 ),"");                                     
				gdRes.getHeader("BOX8906"        ).addValue(qResult.get(i).get(57 ),"");                                     
				gdRes.getHeader("BOX8907"        ).addValue(qResult.get(i).get(58 ),"");                                     
				gdRes.getHeader("BOX8908"        ).addValue(qResult.get(i).get(59 ),"");                                     
				gdRes.getHeader("BOX8910"        ).addValue(qResult.get(i).get(60 ),"");                                     
				gdRes.getHeader("BOX8911"        ).addValue(qResult.get(i).get(61 ),"");                                     
				gdRes.getHeader("BOX8912"        ).addValue(qResult.get(i).get(62 ),"");                                     
				gdRes.getHeader("BOX8913"        ).addValue(qResult.get(i).get(63 ),"");                                     
				gdRes.getHeader("BOX8914"        ).addValue(qResult.get(i).get(64 ),"");                                     
				gdRes.getHeader("BOX8915"        ).addValue(qResult.get(i).get(65 ),"");                                     
				gdRes.getHeader("BOX8916"        ).addValue(qResult.get(i).get(66 ),"");                                     
                                                                                                                             
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        
                                                                                                                             
	/* */                                                                                                                    
	private GridData doInsert(GridData gdReq) throws Exception {                                                             
		                                                                                                                     
		GridData gdRes = new GridData();                                                                                     
		int rowCount = 0;                                                                                                    
		                                                                                                                     
		// append StringBuffer insert_data                                                                                   
		String insertData = "";                                                                                              
                                                                                                                             
		try {                                                                                                                
			//                                                                                                               
			                                                                                                                 
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
		                                                                                                                     
		return gdRes;                                                                                                        
	}                                                                                                                        
                                                                                                                             
	/**/                                                                                                                     
	private GridData doUpdata(GridData gdReq) throws Exception {		                                                     
                                                                                                                             
		GridData gdRes = new GridData();                                                                                     
		int rowCount = 0;                                                                                                    
				                                                                                                             
		//                                                                                                                   
		String updatedata = "";                                                                                              
                                                                                                                             
		try {                                                                                                                
			//                                                                                                               
			                                                                                                                 
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
		                                                                                                                     
		return gdRes;                                                                                                        
	}                                                                                                                        
                                                                                                                             
	/* */                                                                                                                    
	private GridData doDelete(GridData gdReq) throws Exception {                                                             
		                                                                                                                     
		GridData gdRes = new GridData();                                                                                     
		int rowCount = 0;                                                                                                    
		                                                                                                                     
		//                                                                                                                   
		String deleteData = "";                                                                                              
		                                                                                                                     
		try {                                                                                                                
			                                                                                                                 
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        
	                                                                                                                         
	private String getSendData(String[][] sendData, String flag) {                                                           
		                                                                                                                     
		StringBuffer sbData = new StringBuffer();                                                                            
					                                                                                                         
		for(int i = 0; i < sendData.length; i++) {                                                                           
			String[] rowData = (String[])sendData[i];                                                                        
			for(int j = 0; j < rowData.length; j++)                                                                          
				sbData.append("[" + rowData[j] + "]");                                                                       
			sbData.append("\n");                                                                                             
		}                                                                                                                    
		                                                                                                                     
		if(flag.equals("C"))                                                                                                 
			sbData.append(sendData.length + "\n");                                                                           
		else if(flag.equals("U"))                                                                                            
			sbData.append(sendData.length + "\n");                                                                           
			                                                                                                                 
		return sbData.toString();                                                                                            
	}                                                                                                                        
	                                                                                                                         
	private String getSendData2(String[] sendData) {                                                                         
		                                                                                                                     
		StringBuffer sbData = new StringBuffer();                                                                            
		                                                                                                                     
		sbData.append(sendData.length + "\n");                                                                               
			                                                                                                                 
		return sbData.toString();                                                                                            
	}                                                                                                                        
	                                                                                                                         
	                                                                                                                         
	public GridData doSave(GridData gdReq) throws Exception {                                                                
		                                                                                                                     
		conn = databaseUtility.getConnection("t3sinc");                                                                      
	    stmt = conn.createStatement();                                                                                       
	    String message = null;                                                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		                                                                                                                     
		                                                                                                                     
		                                                                                                                     
		try {                                                                                                                
			                                                                                                                 
			                                                                                                                 
			                                                                                                                 
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
		                                                                                                                     
		return gdRes;                                                                                                        
	}	                                                                                                                     
	                                                                                                                         
}                                                                                                                            