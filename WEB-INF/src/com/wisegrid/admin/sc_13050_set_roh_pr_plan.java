package com.wisegrid.admin;                                                                                                  

import com.Nongshim.pis.pu.*;
import com.Nongshim.servicePrReqt.model.Purchase;
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
public class sc_13050_set_roh_pr_plan extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;   
	String 		sql3 	= null;
	String 		sql4 	= null;
	
	String 		sql5 	= null;
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
			else if (mode.equals("search4")) //                                                                               
				gdRes = doQuery4(gdReq);
			else if (mode.equals("search5")) //                                                                               
				gdRes = doQuery5(gdReq);
			else if (mode.equals("search6")) //                                                                               
				gdRes = doQuery6(gdReq);
			else if (mode.equals("search7")) //                                                                               
				gdRes = doQuery7(gdReq);
			else if (mode.equals("save")) //                                                                               
				gdRes = doSave(gdReq);
			else if (mode.equals("delete")) //                                                                               
				gdRes = doDelete(gdReq);
			else if (mode.equals("doIf")) //                                                                               
				gdRes = doIf(gdReq);			
		
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

	
	// DW 1 ��ȸ  ����
	public GridData doQuery(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String cust_code		= gdReq.getParam("cust_code");
			String loc_id			= gdReq.getParam("loc_id");
			String item_type		= gdReq.getParam("item_type");                                                            
			//String version			= gdReq.getParam("version"); 
			//String sales_cat02		= gdReq.getParam("sales_cat02");
			
			//String paramKey   		= "version!%!item_type!%!sales_cat02";                                                                      
			//String paramCode  		= version+"!%!"+item_type+"!%!"+sales_cat02;                                                                   
                                                                                                                             
			String paramKey   		= "cust_code!%!loc_id!%!item_type";
			String paramCode  		= cust_code+"!%!"+loc_id+"!%!"+item_type; 
			String query_id   		= "sc_13050_set_roh_pr_plan_list";
			
			

                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                

			/*��� ����� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */

			String query_id2 = "sc_13050_set_roh_pr_plan_dc_list"; 

			System.out.println("getSelQeury : " + query_id2);

			ArrayList<ArrayList<String>> locList = new CommonUtil().getSelQeury("loc_id", loc_id, query_id2);

			int arrIdx = locList.size();

			String[] locIdList = new String[arrIdx];
			String[] locNameList = new String[arrIdx];

			System.out.println("��� ����� �޺�����Ʈ ����");

			for ( int i = 0 ; i < arrIdx ; i++ ){

				locIdList[i]   = locList.get(i).get(0);   // ��� ����� ID �޺�����Ʈ ����
				locNameList[i] = locList.get(i).get(1); // ��� ����� �̸� �޺�����Ʈ ����

			}

			System.out.println("�԰�������ġ �÷��� �޺�����Ʈ set");

			gdRes.getHeader("TGT_LOC").setComboValues(locNameList, locIdList );		//��� ����� �޺�����Ʈ ��� ����� �÷��� set
			
			
			
			/*���ñ��� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� 
			String query_id2 = "sel_dmd_list"; 
			System.out.println("getSelQeury : " + query_id2);
			ArrayList<ArrayList<String>> selDmdList = new CommonUtil().getSelQeury("", "", query_id2);
			
			int arrIdx = selDmdList.size();
			
			String[] selDmdIdList = new String[arrIdx];
			String[] selDmdNameList = new String[arrIdx];
			/* 
			System.out.println("��� ����� �޺�����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				selDmdIdList[i] = selDmdList.get(i).get(0);   //���ñ��� ID �޺�����Ʈ ����
				selDmdNameList[i] = selDmdList.get(i).get(1); // ���ñ��� �̸� �޺�����Ʈ ����
			}
			
			System.out.println("��� ����� �÷��� �޺�����Ʈ set");
			gdRes.getHeader("SEL_DMD").setComboValues(selDmdNameList, selDmdIdList );		//���ñ���   �޺�����Ʈ ��� ����� �÷��� set
			*/
			
			
			
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("CRUD"			).addValue("", "");
				gdRes.getHeader("SELECTED"		).addValue("0", "");     
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("ITEM_NAME"		).addValue(qResult.get(i).get(1),"");                                      
				gdRes.getHeader("SEQ"			).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("CONS_ITEM_NAME").addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("BASE_UOM"		).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("STOCK_QTY"		).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("PROD_QTY"		).addValue(qResult.get(i).get(6),"");                                      
				
				gdRes.getHeader("SIL_IPGO"		).addValue(qResult.get(i).get(7),"");		//2013-02-12	���԰� ����� ���� ���� //
				gdRes.getHeader("IPGO"			).addValue(qResult.get(i).get(8),"");
				
                                      
				gdRes.getHeader("W1_STOCK"		).addValue(qResult.get(i).get(9),"");                                      
				gdRes.getHeader("W1_PROD_QTY"	).addValue(qResult.get(i).get(10),"");                                      
				
				gdRes.getHeader("W1_IPGO"		).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("W1_SIL_IPGO"	).addValue(qResult.get(i).get(12),"");		//2013-02-12	���԰� ����� ���� ���� //

				
				gdRes.getHeader("W2_STOCK"		).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("REQ_QTY"		).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("PR_QTY"		).addValue(qResult.get(i).get(15),"");	
				gdRes.getHeader("PR_DATE"		).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("MIN_LOT_SIZE"	).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("LOT_SIZE"		).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("SAFETY_STOCK"	).addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("UNIT_COST"		).addValue(qResult.get(i).get(20),"");
				//gdRes.getHeader("TGT_LOC"		).addValue(qResult.get(i).get(21),"");
				
				gdRes.getHeader("TGT_LOC"		).addSelectedHiddenValue(qResult.get(i).get(21));//�������				
				
				
				gdRes.getHeader("CUST_CODE"		).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("CUST_NAME"		).addValue(qResult.get(i).get(23),"");
				
				gdRes.getHeader("PR_NO"			).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("IF_MSGS"		).addValue(qResult.get(i).get(25),"");
				gdRes.getHeader("IF_FLAG"		).addValue(qResult.get(i).get(26),"");
				
				
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                                                                                                                        

	// DW 2 ��ȸ  ����
	public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");                                                            
			String seq	= gdReq.getParam("seq");                                                            
			                                                                                                                 
			String paramKey   ="item_id!%!seq";                                                                      
			String paramCode  = item_id+"!%!"+seq;                                                                 
                                                                                                                             
			String query_id   = "sc_13050_set_roh_pr_plan_list_dw2";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search2");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {                                                                             
				
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("SEQ" 		).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("TXZ01"		).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("BANFN"		).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("BADAT"		).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("LFDAT"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("MENGE"		).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("EBELN"		).addValue(qResult.get(i).get(7  ),"");                                      
				gdRes.getHeader("BEDAT"		).addValue(qResult.get(i).get(8  ),"");                                      
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                	
	
	
	//�ϴ� �׸��� WD3 ��ȸ ����
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		System.out.println("search3() start!!!");
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");                                                            
			String version	= gdReq.getParam("version");                                                            
			String sel_dmd	= gdReq.getParam("sel_dmd");
			String std_stock= gdReq.getParam("std_stock");
			
			//String week_flag= gdReq.getParam("week_flag");
			                                                                                                                 
			String paramKey   ="version!%!item_id!%!sel_dmd!%!std_stock";                                                                      
			String paramCode  = version+"!%!"+item_id+"!%!"+sel_dmd+"!%!"+std_stock;                                                                  
                                                                                                                             
			//String query_id   = "op_02010_Long_Term_Planning_list_dw3";                                                             
			String query_id  = "op_02010_Long_Term_Planning_daily_list_dw3";
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
						                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search3");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			System.out.println(rowCount);
			
			for (int i = 0; i < rowCount; i++) {                                                                             
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("SEL_GUBN"	).addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("SEL_NAME"	).addValue(qResult.get(i).get(3),"");
				gdRes.getHeader("DAY_P15"	).addValue(qResult.get(i).get(4),"");
				gdRes.getHeader("DAY_P14"	).addValue(qResult.get(i).get(5),"");
				gdRes.getHeader("DAY_P13"	).addValue(qResult.get(i).get(6),"");
				gdRes.getHeader("DAY_P12"	).addValue(qResult.get(i).get(7),"");
				gdRes.getHeader("DAY_P11"	).addValue(qResult.get(i).get(8),"");
				gdRes.getHeader("DAY_P10"	).addValue(qResult.get(i).get(9),"");
				gdRes.getHeader("DAY_P09"	).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("DAY_P08"	).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("DAY_P07"	).addValue(qResult.get(i).get(12),"");
				gdRes.getHeader("DAY_P06"	).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("DAY_P05"	).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("DAY_P04"	).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("DAY_P03"	).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("DAY_P02"	).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("DAY_P01"	).addValue(qResult.get(i).get(18),"");
				gdRes.getHeader("DAY_D00"	).addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("DAY_D01"	).addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("DAY_D02"	).addValue(qResult.get(i).get(21),"");
				gdRes.getHeader("DAY_D03"	).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("DAY_D04"	).addValue(qResult.get(i).get(23),"");
				gdRes.getHeader("DAY_D05"	).addValue(qResult.get(i).get(24),"");
				gdRes.getHeader("DAY_D06"	).addValue(qResult.get(i).get(25),"");
				gdRes.getHeader("TP_FLAG"	).addValue(qResult.get(i).get(26),"");
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search3");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}     

	// DW 4 ��ȸ  ����
	public GridData doQuery4(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		= gdReq.getParam("item_id"); 
			
			String itype		= gdReq.getParam("itype");
			String query_id		= gdReq.getParam("query_id");
			
			                                                                                                                 
			String paramKey   ="item_id!%!itype";                                                                      
			String paramCode  = item_id+"!%!"+itype;                                                                   

			System.out.println("query_id"+query_id);
				//String query_id   = "op_02010_Long_Term_Planning_list_dw4";                                                             
                                                                                                                             
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
					gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0),"");                                      
					gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1),"");                                     
					gdRes.getHeader("MM_0_QTY"	).addValue(qResult.get(i).get(2),"");                                      
					gdRes.getHeader("MM_1_QTY"	).addValue(qResult.get(i).get(3),"");                                      
					gdRes.getHeader("MM_2_QTY"	).addValue(qResult.get(i).get(4),"");                                      
					gdRes.getHeader("MM_3_QTY"	).addValue(qResult.get(i).get(5),"");                                      
					gdRes.getHeader("MM_4_QTY"	).addValue(qResult.get(i).get(6),"");                                      
					gdRes.getHeader("MM_5_QTY"	).addValue(qResult.get(i).get(7),"");                                      
					gdRes.getHeader("MM_6_QTY"	).addValue(qResult.get(i).get(8),"");                                      
					gdRes.getHeader("MM_7_QTY"	).addValue(qResult.get(i).get(9),"");                                      
					gdRes.getHeader("MM_8_QTY"	).addValue(qResult.get(i).get(10),"");                                      
					gdRes.getHeader("MM_9_QTY"	).addValue(qResult.get(i).get(11),"");                                      
				}            
			
			                                                                                                                  
			gdRes.addParam("mode", "search4");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}                      
	
	// DW 5 ��ȸ  ����
	public GridData doQuery5(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");                                                            
			                                                                                                                 
			String paramKey   ="item_id";                                                                      
			String paramCode  = item_id;                                                                   
                                                                                                                             
			String query_id   = "sc_13050_set_roh_pr_plan_list_dw5";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search5");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("QTY"		).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("YYYY_MM"		).addValue(qResult.get(i).get(4  ),"");                                      
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search5");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}             

	// DW 6 ��ȸ  ����
	public GridData doQuery6(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");                                                            
			String itype	= gdReq.getParam("itype");                                                            
            
			String paramKey   ="item_id!%!itype";                                                                      
			String paramCode  = item_id+"!%!"+itype;                                                                   
                                                               
                                                                                                                             
			String query_id   = "op_02010_Long_Term_Planning_list_dw6";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search6");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			                                                                                                                 
			for (int i = 0; i < rowCount; i++) {
				
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("PLANT"		).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("MADE_DATE"	).addValue(qResult.get(i).get(3  ),"");                                      
				gdRes.getHeader("END_DATE"	).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("TERM"		).addValue(qResult.get(i).get(5  ),"");                                      
				gdRes.getHeader("QTY"		).addValue(qResult.get(i).get(6  ),"");                                      
				gdRes.getHeader("FLAG"		).addValue(qResult.get(i).get(8  ),"");                                      
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search6");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}        
	
	// DW 7 ��ȸ  ����
	public GridData doQuery7(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id	= gdReq.getParam("item_id");                                                            
			String from_mm	= gdReq.getParam("from_mm");                                                            
			String to_mm	= gdReq.getParam("to_mm");                                                            
			String serch_flag	= gdReq.getParam("serch_flag");                                                            
			                                                                                                                 
			String paramKey   ="item_id!%!from_mm!%!to_mm!%!serch_flag";                                                                      
			String paramCode  = item_id+"!%!"+from_mm+"!%!"+to_mm+"!%!"+serch_flag;                                                                    
                                                                                                                             
			String query_id   = "op_02010_Long_Term_Planning_list_dw7";                                                             
                                                                                                                             
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
				gdRes.getHeader("CONS_ITEM_ID"	).addValue(qResult.get(i).get(0  ),"");                                      
				gdRes.getHeader("CONS_ITEM_NAME").addValue(qResult.get(i).get(1  ),"");                                     
				gdRes.getHeader("ITEM_ID"		).addValue(qResult.get(i).get(2  ),"");                                      
				gdRes.getHeader("ITEM_NAME" 	).addValue(qResult.get(i).get(3  ),"");                                     
				gdRes.getHeader("PROD_QTY"		).addValue(qResult.get(i).get(4  ),"");                                      
				gdRes.getHeader("USE_QTY"		).addValue(qResult.get(i).get(5  ),"");                                      
                                     
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search7");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}


	/* WD 1 ���� */
	public GridData doSave(GridData gdReq) throws Exception {

//		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doReg");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("getParam");
			
			String user_id			=	gdReq.getParam("user_id");	
			
			String cust_code		=	gdReq.getParam("cust_code");
			
			String item_id			=	gdReq.getParam("item_id"); 		
			String stock_qty		=	gdReq.getParam("stock_qty");		// ���� ��� ������ ���� �Ķ���� ����//
			
			String w1_stock			=	gdReq.getParam("w1_stock");	// ���� ������� ������ ���� �Ķ���� ����//
			
			String min_lot_size		=	gdReq.getParam("min_lot_size");	// �ּ� ���ַ� ������ ���� �Ķ���� ����//
			String unit_cost		=	gdReq.getParam("unit_cost");		// �ܰ� ������ ���� �Ķ���� ����//
			
			String sil_ipgo			=	gdReq.getParam("sil_ipgo");		// ���� �԰� ������ ���� �Ķ���� ����//
			
			String lot_size			=	gdReq.getParam("lot_size");			// ���ִ��� ������ ���� �Ķ���� ����//
			String safety_stock		=	gdReq.getParam("safety_stock");		// ������� ������ ���� �Ķ���� ����//
			
			
			
			String inner_sql4;
			
			String inner_sql5;
			
			
					
			//�ش� ������ ������쿡�� (MERGE INTO��  UPDATE�� INSERT��) ����!!	
			sql   = "merge into SET_PR_PLAN_IF SM							\n";
			sql  += "using (                                           		\n";
			
			sql   = "merge into SET_PR_PLAN_IF SM				       		\n";
			sql  += "using (                                           		\n";
			
			sql3  = "merge into REAL_STOCK_TEST  RT                    		\n";	//���� ��� �� ���� �԰� ���� //
			sql3 += "using (                                           		\n";		

			sql4  = "	UPDATE  /*+ bypass_ujvc*/				        	\n";	//�ּ� ���ַ� //
			sql4 += "	( 													\n";
			sql4 += "	SELECT	SB.MIN_LOT_SIZE,	SB1.MIN_LOT_SIZE	NEW_SIZE,	\n";
			sql4 += "			SB.UNIT_COST,  		SB1.UNIT_COST		NEW_COST,	\n";
			sql4 += "			SB.LOT_SIZE,  		SB1.LOT_SIZE		NEW_SIZE2,	\n";
			sql4 += "			SB.SAFETY_STOCK,  	SB1.SAFETY_STOCK	NEW_STOCK	\n";
			sql4 += "	FROM	SET_BOM	SB,                             	\n";
			sql4 += "			(                                       	\n";
			
			sql5  = "merge into REAL_STOCK_TEST  RT                    		\n";	//���� ���� ��� 	2013-02-05//
			sql5 += "using (                                           		\n";		

			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {

				if( flag){
						sql  += "union all \n";
						sql3	+= "union all \n";
						sql4	+= "union all \n";						
						sql5	+= "union all \n";
					}
					flag = true;
					
					String tgt_loc      = "";

					if(gdReq.getHeader("TGT_LOC").getSelectedIndex(i) > -1){							

						tgt_loc = gdReq.getHeader("TGT_LOC").getComboHiddenValues()[gdReq.getHeader("TGT_LOC").getSelectedIndex(i)];

					}		
					
					//-------------------------------------------------------------------------------------------------------------------
					//�Ķ���͸� ������ ����!!  
					sql += "	SELECT		TO_CHAR(SYSDATE, 'YYYYMMDD')									AS CNFM_DATE, 			\n";
					sql += "				'" + gdReq.getHeader("ITEM_ID"			).getValue(i) 	+ "'	AS ITEM_ID, 			\n";
					sql += "				'" + gdReq.getHeader("ITEM_NAME"		).getValue(i)	+ "'	AS ITEM_NAME,	    	\n";
					sql += "				'" + gdReq.getHeader("SEQ"				).getValue(i)	+ "'	AS SEQ,	    			\n";
					sql += "				'" + gdReq.getHeader("CONS_ITEM_NAME"	).getValue(i)	+ "'	AS CONS_ITEM_NAME,	   	\n";
					sql += "				'" + gdReq.getHeader("PR_QTY"			).getValue(i)	+ "'	AS NEW_PR_QTY,	    	\n";
					sql += "				'" + gdReq.getHeader("BASE_UOM"			).getValue(i)	+ "'	AS NEW_PR_QTY_UOM,	    \n";
					sql += "				'" + gdReq.getHeader("PR_DATE"			).getValue(i)	+ "'	AS NEW_PR_DATE,	    	\n";
					//sql += "				'" + gdReq.getHeader("TGT_LOC"			).getValue(i)	+ "'	AS NEW_TGT_LOC,	    	\n";
					sql += "				'" + tgt_loc											+ "'	AS NEW_TGT_LOC,	    	\n";
					sql += "				'" + gdReq.getHeader("CUST_CODE"		).getValue(i)	+ "'	AS NEW_CUST_CODE,	 	\n";
					sql += "				'" + gdReq.getHeader("UNIT_COST"		).getValue(i)	+ "'	AS NEW_UNIT_COST,	 	\n";
					sql += "				'" + user_id											+ "'	AS NEW_MADE_BY		    \n";
					sql += "	FROM		DUAL			                                                  					\n";

					//-------------------------------------���� ��� �� ���� �԰� ����-------------------------------------------------------------------------------
					sql3	+=	"	select	'" + gdReq.getHeader("ITEM_ID"			).getValue(i) 		+ "'	AS ITEM_ID, 			\n";		       			
					sql3	+=	"			'" + gdReq.getHeader("SEQ"				).getValue(i) 		+ "'	AS ITYPE, 				\n";
					sql3	+=	"			'" + gdReq.getHeader("STOCK_QTY"		).getValue(i) 		+ "'	AS STOCK_QTY, 			\n";		
					sql3	+=	"			'" + gdReq.getHeader("SIL_IPGO"			).getValue(i) 		+ "'	AS SIL_IPGO, 			\n";					
					sql3	+=	"			TRUNC(SYSDATE, 'D')+1 		  										AS USABLE_DATE, 		\n";
					sql3	+=	"			'"  + user_id   											+ "'  	AS MADE_BY      		\n";
					sql3	+=	"	from   DUAL 																		          		\n";
					//-------------------------------------���� ��� �� ���� �԰� ����-------------------------------------------------------------------------------			

					//-------------------------------------���� ���� ���-------------------------------------------------------------------------------
					sql5	+=	"	select	'" + gdReq.getHeader("ITEM_ID"			).getValue(i) 		+ "'	AS ITEM_ID, 			\n";		       			
					sql5	+=	"			'" + gdReq.getHeader("SEQ"				).getValue(i) 		+ "'	AS ITYPE, 				\n";
					sql5	+=	"			'" + gdReq.getHeader("W1_STOCK"			).getValue(i) 		+ "'	AS W1_STOCK, 			\n";
					sql5	+=	"			'" + gdReq.getHeader("SIL_IPGO"			).getValue(i) 		+ "'	AS SIL_IPGO, 			\n"; //���� �����԰�//
					sql5	+=	"			TRUNC(SYSDATE+7, 'D')+1 		  									AS USABLE_DATE, 		\n";
					sql5	+=	"			'"  + user_id   											+ "'  	AS MADE_BY      		\n";
					sql5	+=	"	from   DUAL 																		          		\n";

					//-------------------------------------���� ���� ���-------------------------------------------------------------------------------			

					
					//-------------------------------------�ּ� ���ַ� -------------------------------------------------------------------------------
					inner_sql4	=	"	select	'" + gdReq.getHeader("ITEM_ID"			).getValue(i) 			+ "'	AS ITEM_ID, 			\n";		       			
					inner_sql4	+=	"			'" + gdReq.getHeader("SEQ"				).getValue(i) 			+ "'	AS SEQ, 				\n";
					inner_sql4	+=	"			'" + gdReq.getHeader("MIN_LOT_SIZE"		).getValue(i) 			+ "'	AS MIN_LOT_SIZE, 		\n";			    
					inner_sql4	+=	"			'" + gdReq.getHeader("UNIT_COST"		).getValue(i) 			+ "'	AS UNIT_COST, 			\n";
					inner_sql4	+=	"			'" + gdReq.getHeader("LOT_SIZE"			).getValue(i) 			+ "'	AS LOT_SIZE, 			\n";			    
					inner_sql4	+=	"			'" + gdReq.getHeader("SAFETY_STOCK"		).getValue(i) 			+ "'	AS SAFETY_STOCK, 		\n";
					inner_sql4	+=	"			'" + user_id   													+ "'  	AS MADE_BY      		\n";
					inner_sql4	+=	"	from   DUAL 																			          		\n";
					//-------------------------------------�ּ� ���ַ�-------------------------------------------------------------------------------			

					
					sql4 += inner_sql4;
					
					
					if(rowCount == 1){ // update�Ǽ��� 1���� ��� ora-01732������ �߻��Ѵ�. ������. ���� 1���� ��� ������ �ΰ����� �����.
						sql4 += "UNION	ALL \n" + inner_sql4;	
						
						
					}
			} 
									
		//	}//for�� ��.
			//-----------------------------Merge Into 1----------------------------------------------------------------------------------
			sql += ") SM1 														   	\n";
			sql += "ON (SM.CNFM_DATE	= SM1.CNFM_DATE    						   	\n";
			sql += "AND SM.ITEM_ID		= SM1.ITEM_ID            				   	\n";
			sql += "AND SM.SEQ			= SM1.SEQ		)							\n";
			sql += "when matched then update set            					   	\n";
			sql += "	SM.PR_QTY		= SM1.NEW_PR_QTY,			SM.PR_DATE		= TO_CHAR(TO_DATE(NEW_PR_DATE),'YYYYMMDD'),			        \n";
			sql += "	SM.TGT_LOC		= SM1.NEW_TGT_LOC,			SM.CUST_CODE	= SM1.NEW_CUST_CODE			       		\n";
			////////////////////
			sql += "when not matched then insert" +
				   "(CNFM_DATE, PLANT_ID,ITEM_ID,ITEM_NAME,SEQ,CONS_ITEM_NAME,PR_QTY,PR_QTY_UOM, UNIT_COST," +
				   " PR_DATE,TGT_LOC,CUST_CODE,MADE_TYPE,MADE_DTTM,MADE_BY) \n";   
			sql += "values                      " +
				   "(SM1.CNFM_DATE, '1300', SM1.ITEM_ID, SM1.ITEM_NAME, SM1.SEQ, SM1.ITEM_NAME||' '||SM1.CONS_ITEM_NAME, " +
				   " NEW_PR_QTY, NEW_PR_QTY_UOM, NEW_UNIT_COST, TO_CHAR(TO_DATE(NEW_PR_DATE),'YYYYMMDD'), NEW_TGT_LOC, NEW_CUST_CODE, 'AD', SYSDATE, NEW_MADE_BY) \n"; 
			
			//---------------------------------------------------------------------------------------------------------------------------		

			//-----------------------------Merge Into 3 ���� ��� �� ���� �԰� ����---------------------------------------------------------------------------------------------------------------------------------------
			sql3 += ") RT1 											   	   															\n";
			sql3 += "ON (RT.ITEM_ID			= RT1.ITEM_ID    			   	   														\n";
			sql3 += "AND RT.ITYPE      		= RT1.ITYPE    						   													\n";
			sql3 += "AND RT.USABLE_DATE 	= RT1.USABLE_DATE)							   											\n";
			sql3 += "when matched then update set            					  					 								\n";
			sql3 += " RT.QTY 	 			= RT1.STOCK_QTY,         	   	   														\n";  	/* �������  */
			sql3 += " RT.SIL_IPGO 	 		= RT1.SIL_IPGO           	   	   														\n";  	/* �����԰�  */
			
			sql3 += "when not matched then insert(RT.ITEM_ID	,RT.USABLE_DATE		,RT.ITYPE	,RT.QTY			,RT.QTY_UOM	,RT.MADE_TYPE	,RT.MADE_DTTM	,RT.MADE_BY,	RT.SIL_IPGO)	\n";
			sql3 += "values						 (RT1.ITEM_ID	,RT1.USABLE_DATE	,RT1.ITYPE	,RT1.STOCK_QTY	,'EA' 		,'AD' 			,SYSDATE		,RT1.MADE_BY,	RT1.SIL_IPGO)	\n";
			//-----------------------------Merge Into 3 ���� ��� �� ���� �԰� ����----------------------------------------------------------------------------------------------------------------------------------------

			//-----------------------------Merge Into 5 ���� ���� ���---------------------------------------------------------------------------------------------------------------------------------------
			sql5 += ") RT1 											   	   															\n";
			sql5 += "ON (RT.ITEM_ID			= RT1.ITEM_ID    			   	   														\n";
			sql5 += "AND RT.ITYPE      		= RT1.ITYPE    						   													\n";
			sql5 += "AND RT.USABLE_DATE 	= RT1.USABLE_DATE)							   											\n";
			sql5 += "when matched then update set            					  					 								\n";
			sql5 += " RT.QTY	 			= RT1.W1_STOCK,           	   	   														\n";  	/* ���� �������  2013-02-13 */			
			sql5 += " RT.SIL_IPGO	 		= RT1.SIL_IPGO          	   	   														\n";  	/* ���� ���� �԰�  2013-02-13 */			
			sql5 += "when not matched then insert(RT.ITEM_ID	,RT.USABLE_DATE		,RT.ITYPE	,RT.QTY			,RT.QTY_UOM	,RT.MADE_TYPE	,RT.MADE_DTTM	,RT.MADE_BY,	RT.SIL_IPGO)	\n";
			sql5 += "values						 (RT1.ITEM_ID	,RT1.USABLE_DATE	,RT1.ITYPE	,RT1.W1_STOCK	,'EA' 		,'AD' 			,SYSDATE		,RT1.MADE_BY,	RT1.SIL_IPGO)	\n";
			//-----------------------------Merge Into 5 ���� ���� ���---------------------------------------------------------------------------------------------------------------------------------------
			
			//-----------------------------Merge Into 2----�ּ� ���ַ�----------------------------------------------------------------------------		
			sql4 += ") SB1 														   	\n";
			sql4 += " WHERE SB.ITEM_ID 	 = SB1.ITEM_ID                        		\n";
			sql4 += " AND   SB.SEQ  	 = SB1.SEQ	                         		\n";
			sql4 += " )							                                   	\n";
			sql4 += " SET	MIN_LOT_SIZE	= NEW_SIZE,								\n";
			sql4 += " 		UNIT_COST 		= NEW_COST,								\n";
			sql4 += " 		LOT_SIZE 		= NEW_SIZE2,							\n";
			sql4 += " 		SAFETY_STOCK 	= NEW_STOCK								\n";
	        //--------------------------------------------�ּ� ���ַ�-------------------------------------------------------------------------------------	
			
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			

			System.out.println("-----------------------------------------------QUERY3-----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY3-----------------------------------------------");
			
			System.out.println("-----------------------------------------------QUERY4-----------------------------------------------");
			System.out.println(sql4);
			System.out.println("-----------------------------------------------QUERY4-----------------------------------------------");
			
			System.out.println("-----------------------------------------------QUERY5-----------------------------------------------");
			System.out.println(sql5);
			System.out.println("-----------------------------------------------QUERY5-----------------------------------------------");

			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			rs = databaseUtility.executeQuery(stmt, sql3);
			rs = databaseUtility.executeQuery(stmt, sql4);
			
			rs = databaseUtility.executeQuery(stmt, sql5);
			
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "doReg");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
	        databaseUtility.close(conn, stmt, rs);              
	    	}

		System.out.println("doSave() end!!!");

		return gdRes;
		}			
	

	
	public GridData doDelete(GridData gdReq) throws Exception {

		System.out.println("doDelete() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Delete");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql;
			
			//�ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.ITEM_ID, T1.VERSION, T1.SAFETY_FACTOR,												\n";
			sql += "			T1.PR_DATE_NO, T1.PR_QTY, T1.ENTR_DATE,	T1.MADE_DTTM, T1.EDIT_FLAG,						\n";
			sql += "			T2.NEW_SAFETY_FACTOR,	T2.NEW_PR_DATE_NO,												\n";
			sql += "			T2.NEW_PR_QTY,	T2.NEW_ENTR_DATE, T2.NEW_EDIT_FLAG										\n";
			sql += "	FROM	APS_PR_PLAN	T1,                                                                                        	\n";
			sql += "			(                                                                                                      	\n";
			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				System.out.println("��𿡼� ���� !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				String version	= gdReq.getParam("version");
				System.out.println("crud ="+crud);
				//System.out.println("SEL_DMD : " + gdReq.getHeader("SEL_DMD").getHiddenValue(i));
				
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					
					//�Ķ���͸� ������ ����!!  
					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				'" + version										+ "'	AS VERSION,     		\n";
					inner_sql += "				0														AS NEW_SAFETY_FACTOR,   \n";
					inner_sql += "				0														AS NEW_PR_DATE_NO,  	\n";
					inner_sql += "				0														AS NEW_PR_QTY,			\n";
					inner_sql += "				NULL													AS NEW_ENTR_DATE,   \n";
					inner_sql += "				NULL													AS NEW_EDIT_FLAG		\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update�Ǽ��� 1���� ��� ora-01732������ �߻��Ѵ�. ������. ���� 1���� ��� ������ �ΰ����� �����.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for�� ��.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	AND		T1.VERSION	= T2.VERSION                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		PR_DATE_NO = NEW_PR_DATE_NO,	PR_QTY	= NEW_PR_QTY,												\n";
			//sql += "			STD_STOCK = NEW_STD_STOCK,		SAFETY_STOCK	= NEW_SAFETY_STOCK,					                \n";			
			sql += "			ENTR_DATE = NEW_ENTR_DATE,		SAFETY_FACTOR	= NEW_SAFETY_FACTOR,								\n";
			sql += "			EDIT_FLAG = NEW_EDIT_FLAG,																			\n";
			sql += "			MADE_DTTM	= SYSDATE															                  	\n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "Delete");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);   
        }

        System.out.println("doDelete() end!!!");

		return gdRes;
	}			
	
	public GridData doIf(GridData gdReq) throws Exception {

		System.out.println("doIf() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doIf");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql;
			
			//�ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.ITEM_ID, T1.CNFM_DATE,  T1.IF_FLAG, T2.NEW_IF_FLAG							\n";
			sql += "	FROM	SET_PR_PLAN_IF	T1,                                                                                        	\n";
			sql += "			(                                                                                                      	\n";
			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				System.out.println("��𿡼� ���� !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				String version	= gdReq.getParam("version");
				System.out.println("crud ="+crud);
				//System.out.println("SEL_DMD : " + gdReq.getHeader("SEL_DMD").getHiddenValue(i));
				
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					
					//�Ķ���͸� ������ ����!!  
					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				TO_CHAR(SYSDATE, 'YYYYMMDD')								AS CNFM_DATE, 			\n";
					inner_sql += "				'I'															AS NEW_IF_FLAG			\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update�Ǽ��� 1���� ��� ora-01732������ �߻��Ѵ�. ������. ���� 1���� ��� ������ �ΰ����� �����.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for�� ��.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	AND		T1.CNFM_DATE	= T2.CNFM_DATE                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		IF_FLAG = NEW_IF_FLAG														\n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			
			/* mmort100 data ���� ���ν��� ȣ�� */
            //---------------------SP_SET_ROH_PR_IF() ����-------------------------//
            System.out.println("call SP_SET_ROH_PR_IF() ����!!!");
            String sql2 = "call SP_SET_ROH_PR_IF  ('CRE_DATA' , SYSDATE, 1, 1, 'NA', SYSDATE)" ;
            boolean resultSp = stmt.execute(sql2);
            System.out.println("call SP_SET_ROH_PR_IF() ���� ��� : " + resultSp);
            //------------------------------���� ���� üũ----------------------------------//
			
			
			gdRes.addParam("mode", "doIf");
			gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
			gdRes.setStatus("true");
			
		}catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);   
        }

        System.out.println("doIf() end!!!");

		return gdRes;
	}		
	
}                                                                                                                                                                                                       