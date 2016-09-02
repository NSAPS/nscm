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
public class op_02050_roh_expt_master extends HttpServlet {                                                             
                                                                                                                             
	private static final long serialVersionUID = -419201700278107216L;                                                       
	                                                                                                                         
	Connection 	conn 	= null;                                                                                              
	Statement 	stmt	= null;                                                                                              
	ResultSet	rs		= null;	                                                                                             
	String 		sql 	= null;                                                                                              
	String 		sql2 	= null;                                                                                              
	                                                                                     
	                                                                                                                         
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
			else if (mode.equals("search5")) //                                                                               
				gdRes = doQuery5(gdReq);
			else if (mode.equals("search7")) //                                                                               
				gdRes = doQuery7(gdReq);
			else if (mode.equals("save")) //                                                                               
				gdRes = doSave(gdReq);
			else if (mode.equals("save2")) // Ȯ����� �߰�                                                                               
				gdRes = doSave2(gdReq);
			else if (mode.equals("Std_Cal")) //                                                                               
				gdRes = doStd_Cal(gdReq);
		
		
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
			                                                                                                                 
			String com_code		=	gdReq.getParam("com_code");                                                            
			String mfs_flag		=	gdReq.getParam("mfs_flag");  
			String cnfm_date	=	gdReq.getParam("cnfm_date");

			String paramKey		=	"com_code!%!mfs_flag!%!cnfm_date";
			String paramCode	=	com_code+"!%!"+mfs_flag+"!%!"+cnfm_date;
			String query_id		=	"op_02050_roh_expt_master";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                

			/*���ñ��� ����Ʈ�� �����Ͽ� �޺�����Ʈ ���� */
			//String query_id2 = "sel_dmd_list"; 
			String query_id2 = "sel_dmd_list_3";
			ArrayList<ArrayList<String>> selDmdList = new CommonUtil().getSelQeury("", "", query_id2);
			
			int arrIdx = selDmdList.size();
			
			String[] selDmdIdList	= new String[arrIdx];
			String[] selDmdNameList = new String[arrIdx];
			
			System.out.println("��� ����� �޺�����Ʈ ����");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				selDmdIdList[i]		= selDmdList.get(i).get(0);   //���ñ��� ID �޺�����Ʈ ����
				selDmdNameList[i]	= selDmdList.get(i).get(1); // ���ñ��� �̸� �޺�����Ʈ ����
			}

			gdRes.getHeader("SEL_DMD").setComboValues(selDmdNameList, selDmdIdList );		//���ñ���   �޺�����Ʈ ��� ����� �÷��� set
			
			for (int i = 0; i < rowCount; i++) {                                                                             

				gdRes.getHeader("CRUD"					).addValue( "", "");
				gdRes.getHeader("ITEM_ID"			).addValue(qResult.get(i).get(0), "");                                      
				gdRes.getHeader("ITEM_NAME" 		).addValue(qResult.get(i).get(1), "");                                     
				gdRes.getHeader("BASE_UOM" 			).addValue(qResult.get(i).get(2), "");
				gdRes.getHeader("MFS_FLAG" 			).addValue(qResult.get(i).get(3), "");
				gdRes.getHeader("LEAD_TIME" 		).addValue(qResult.get(i).get(4), "");
				gdRes.getHeader("TERM_VAL" 			).addValue(qResult.get(i).get(5), ""); 
				gdRes.getHeader("STOCK" 			).addValue(qResult.get(i).get(6), "");
				gdRes.getHeader("COM_STOCK" 		).addValue(qResult.get(i).get(7), "");                                     
				gdRes.getHeader("CNFM_STOCK" 		).addValue(qResult.get(i).get(8), "");     //���� ������� = Ȯ�����                                
				gdRes.getHeader("SUB_TOT" 			).addValue(qResult.get(i).get(9), "");                                     
				gdRes.getHeader("ODER_QTY" 			).addValue(qResult.get(i).get(10),"");
				gdRes.getHeader("W1_STOCK" 			).addValue(qResult.get(i).get(11),"");
				gdRes.getHeader("SEL_DMD" 			).addSelectedHiddenValue(qResult.get(i).get(12));
				gdRes.getHeader("DMD_QTY" 			).addValue(qResult.get(i).get(13),"");
				gdRes.getHeader("DMD03" 			).addValue(qResult.get(i).get(14),"");
				gdRes.getHeader("DMD04" 			).addValue(qResult.get(i).get(15),"");
				gdRes.getHeader("DMD05" 			).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("DMD06" 			).addValue(qResult.get(i).get(17),"");
				gdRes.getHeader("DMD07" 			).addValue(qResult.get(i).get(18),"");				
				gdRes.getHeader("DMD08" 			).addValue(qResult.get(i).get(19),"");
				gdRes.getHeader("USE_DAY" 			).addValue(qResult.get(i).get(20),"");
				gdRes.getHeader("USE_QTY" 			).addValue(qResult.get(i).get(21),"");				
				gdRes.getHeader("MIN_LOT_SIZE" 		).addValue(qResult.get(i).get(22),"");
				gdRes.getHeader("FC_QTY" 			).addValue(qResult.get(i).get(23),"");  
				gdRes.getHeader("MSG"				).addValue(qResult.get(i).get(24),"");	
				
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
	/*public GridData doQuery2(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			                                                                                                                 
			String paramKey		=	"item_id";                                                                      
			String paramCode	=	item_id;                                                     
			String query_id		=	"op_02010_Long_Term_Planning_list_dw2";                                                             
                                                                                                                             
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

				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1),"");                                     
				gdRes.getHeader("PR_NO"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("PR_REL"	).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("PR_QTY"	).addValue(qResult.get(i).get(4),"");                                      
				gdRes.getHeader("PO_NO"		).addValue(qResult.get(i).get(5),"");                                      
				gdRes.getHeader("PO_SEQ"	).addValue(qResult.get(i).get(6),"");                                      
				gdRes.getHeader("PO_DATE"	).addValue(qResult.get(i).get(7),"");                                      
				gdRes.getHeader("PO_QTY"	).addValue(qResult.get(i).get(8),"");                                      
				gdRes.getHeader("CREDIT"	).addValue(qResult.get(i).get(9),"");                                      
				gdRes.getHeader("UNSHIP_QTY").addValue(qResult.get(i).get(10),"");                                      
				gdRes.getHeader("SHIP_QTY"	).addValue(qResult.get(i).get(11),"");                                      
				gdRes.getHeader("BL_NO"		).addValue(qResult.get(i).get(12),"");                                      
				gdRes.getHeader("PORT"		).addValue(qResult.get(i).get(13),"");                                      
				gdRes.getHeader("TONG"		).addValue(qResult.get(i).get(14),"");                                      
				gdRes.getHeader("IPGO"		).addValue(qResult.get(i).get(15),"");                                      
				gdRes.getHeader("DATE_FLAG"	).addValue(qResult.get(i).get(16),"");
				gdRes.getHeader("STATUS"	).addValue(qResult.get(i).get(17),"");
				
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search2");		                                                                         
			gdRes.setMessage("");                                                                                            
			gdRes.setStatus("true");                                                                                         
                                                                                                                             
		} catch (Exception e) {                                                                                              
			throw e;                                                                                                         
		}                                                                                                                    
				                                                                                                             
		return gdRes;                                                                                                        
	}*/                	
	
	
	//�ϴ� �׸��� WD3 ��ȸ ����
	public GridData doQuery3(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    

		System.out.println("search3() start!!!");
		
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String	item_id		=	gdReq.getParam("item_id");      
			String cnfm_date	=	gdReq.getParam("cnfm_date");
			                                                                                                                 
			String paramKey		=	"item_id!%!cnfm_date";                                                                      
			String paramCode	=	item_id+"!%!"+cnfm_date;                                                                 
			String query_id		=	"op_02050_MFS_STD_STOCK_dw3";   //dw3 ������� ���� ȣ�� �κ�                                                          
                                                                                                                             
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
				gdRes.getHeader("CONS_ITEM_ID"		).addValue(qResult.get(i).get(0),"");
				gdRes.getHeader("CONS_ITEM_NAME"	).addValue(qResult.get(i).get(1),"");
				gdRes.getHeader("UNIT"				).addValue(qResult.get(i).get(2),"");
				gdRes.getHeader("PRE_STD_STOCK"		).addValue(qResult.get(i).get(3),"");
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

	// DW 4 ��ȸ  ����
	public GridData doQuery4(GridData gdReq) throws Exception {                                                               
		                                                                                                                     
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			String itype		=	gdReq.getParam("itype");
			String query_id		=	gdReq.getParam("query_id");

			String paramKey		=	"item_id!%!itype";                                                                      
			String paramCode	=	item_id+"!%!"+itype;                                                                   

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
	
	// DW 5 ��ȸ  ����
	public GridData doQuery5(GridData gdReq) throws Exception {                                                               
        
		GridData gdRes = new GridData();		                                                                             
		int rowCount = 0;                                                                                                    
                                                                                                                             
		try {                                                                                                                
			gdRes = OperateGridData.cloneResponseGridData(gdReq);                                                            
			                                                                                                                 
			String item_id		=	gdReq.getParam("item_id");                                                            
			                                                                                                                 
			String paramKey		=	"item_id";                                                                      
			String paramCode	=	item_id;                                                                   
                                                                                                                             
			String query_id		=	"op_02010_Long_Term_Planning_list_dw5";                                                             
                                                                                                                             
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
				
				gdRes.getHeader("ITEM_ID"	).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("ITEM_NAME" ).addValue(qResult.get(i).get(1),"");                                     
				gdRes.getHeader("GUBN"		).addValue(qResult.get(i).get(2),"");                                      
				gdRes.getHeader("QTY"		).addValue(qResult.get(i).get(3),"");                                      
				gdRes.getHeader("YYYY_MM"	).addValue(qResult.get(i).get(4),"");                                      
			}                                                                                                                
                                                                                                                             
			gdRes.addParam("mode", "search5");		                                                                         
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
                                                            
			String cons_item_id		=	gdReq.getParam("cons_item_id");
			String cnfm_date		=	gdReq.getParam("cnfm_date");
			
			
			String paramKey			=	"cons_item_id!%!cnfm_date";                                                                      
			String paramCode		=	cons_item_id+"!%!"+cnfm_date;                                                                    
                                                                                                                             
			String query_id			=	"op_02050_even_item_list_dw7";                                                             
                                                                                                                             
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

	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��
		
		System.out.println("Total Row Count : " + gdReq.getHeader("CRUD").getRowCount());

		String fc_qty			=	gdReq.getParam("fc_qty");
		String cnfm_stock		=	gdReq.getParam("cnfm_stock");
		String cnfm_date		=	gdReq.getParam("cnfm_date");

		//System.out.println("*************cnfm_date : " + cnfm_date);
		
		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Save");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);
		
			String sql, 	inner_sql,	sql2,	sql3,	sql4, sql5	;//sql3, inner_sql3;
			
			String user_id = gdReq.getParam("user_id");
			
			// APS_PR_PLAN UPDATE �ش� ������ ������쿡�� (MERGE �� ������Ʈ�� �μ�Ʈ��) ����!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.ITEM_ID, T1.MINMPSQTY,																				\n";
			sql += "			T2.ITEM_ID,	T2.NEW_MIN_LOT_SIZE																			\n";
			sql += "	FROM	ITEM_MST	T1,                                                                                        	\n";
			sql += "			(                                                                                                      	\n";
			
			///////////////////////���ֿ��� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			sql2   = "merge into MFS_ORDER_FORECAST MF				       																\n";
			sql2  += "using (                                           																\n";
			///////////////////////���ֿ��� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////

			///////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			sql3   = "merge into MFS_STD_STOCK MS				       																	\n";
			sql3  += "using (                                           																\n";
			///////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			
			
			sql4  = "merge into USER_ITEM_MSG  UM                    		\n";	//����� �Է� �޼��� ���� ���̺� 	2013-07-18//
			sql4 += "using (                                           		\n";
			


			
			
			///////////////////////����ڰ� �׷캰 ������  ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			sql5   = "merge into APS_PR_PLAN_ROH AP				       																	\n";
			sql5  += "using (                                           																\n";
			///////////////////////����ڰ� �׷캰 ������  ���� SQL/////////////////////////////////////////////////////////////////////////////////////////			
			
			
			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				System.out.println("��𿡼� ���� !! 1 : ");
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				
				System.out.println("crud ="+crud);
				
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "	UNION	ALL \n"; 
						sql2 += "	UNION	ALL \n";
						sql3 += "	UNION	ALL \n";
						sql4 += "	UNION	ALL \n";
						sql5 += "	UNION	ALL \n";
					}
					flag = true;
					
					// �޺�����Ʈ ���� �Ҵ�
					//String sel_dmd = "";
					//�Ķ���͸� ������ ����!!  
					
					
					/******************************************************************************************************************/
					inner_sql  = "	SELECT		'" + gdReq.getHeader("ITEM_ID"		).getValue(i) 		+ "'	AS ITEM_ID, 			\n";
					inner_sql += "				'" + gdReq.getHeader("MIN_LOT_SIZE"	).getValue(i)		+ "'	AS NEW_MIN_LOT_SIZE		\n";
					inner_sql += "	FROM	DUAL			                                                  							\n";							
					/******************************************************************************************************************/
				
					
					///////////////////////���ֿ��� ���� SQL//////////////////////////////////////////////////////////////////////////////////
					sql2 	+=	"	SELECT		TO_DATE(REPLACE('"+ cnfm_date + "','-',''),'YYYY-MM-DD')			AS CNFM_DATE, 			\n";
					//sql2 	+=	"	SELECT		TRUNC(SYSDATE, 'D')+1											AS CNFM_DATE, 			\n";					
					sql2	+=	"			'" + gdReq.getHeader("ITEM_ID"		).getValue(i) 			+ "'	AS CONS_ITEM_ID, 		\n";		       			
					sql2	+=	"			'" + gdReq.getHeader("FC_QTY"		).getValue(i) 			+ "'	AS FC_QTY, 				\n";
					sql2	+=	"			'" + user_id   												+ "'	AS MADE_BY      		\n";
					sql2	+=	"	FROM   DUAL 																		          		\n";
					/////////////////////���ֿ��� ���� SQL////////////////////////////////////////////////////////////////////////////////////
					
					/////////////////////Ȯ����� ���� SQL//////////////////////////////////////////////////////////////////////////////////
					sql3 	+= "	SELECT		TO_DATE(REPLACE('"+ cnfm_date + "','-',''),'YYYY-MM-DD')			AS CNFM_DATE, 			\n";
					
					//sql3 	+= "	SELECT		TRUNC(SYSDATE, 'D')+1											AS CNFM_DATE, 			\n";					
					sql3	+=	"			'" + gdReq.getHeader("ITEM_ID"		).getValue(i) 			+ "'	AS CONS_ITEM_ID,		\n";		       			
					sql3	+=	"			'" + gdReq.getHeader("CNFM_STOCK"		).getValue(i) 		+ "'	AS CNFM_STOCK, 			\n";
					sql3	+=	"			'" + user_id   												+ "'  	AS MADE_BY      		\n";
					sql3	+=	"	FROM   DUAL 																		          		\n";
					/////////////////////Ȯ����� ���� SQL////////////////////////////////////////////////////////////////////////////////////

					/***********************************************����� �Է� �޼��� �Է� ***********************************************/
					sql4	+=	"	SELECT	'OP_02050'	AS WD_ID, \n";
					sql4	+=	"			'" + gdReq.getHeader("ITEM_ID"			).getValue(i)		+ "'	AS ITEM_ID, 			\n";
					sql4	+=	"			'" + cnfm_date   											+ "'	AS VERSION,      		\n";
					sql4	+=	"			SYSDATE	AS MADE_DTTM, 	\n";					
					sql4	+=	"			'" + gdReq.getHeader("MSG"				).getValue(i)		+ "'	AS MSG 					\n";
					sql4	+=	"	from   DUAL 																			    		\n";

					/***********************************************����� �Է� �޼��� �Է� ***********************************************/
					

					String sel_dmd = "";

					if(gdReq.getHeader("SEL_DMD").getSelectedIndex(i) > -1){							
						sel_dmd = gdReq.getHeader("SEL_DMD").getComboHiddenValues()[gdReq.getHeader("SEL_DMD").getSelectedIndex(i)];
					}
					
					///////////////////////����ڰ� �׷캰 ������  ���� SQL////////////////////////////////////////////////////////////////////////
					sql5 	+= "	SELECT	'" + gdReq.getHeader("ITEM_ID"		).getValue(i)			+ "'	AS ITEM_ID,				\n";		       			

					sql5	+=	"			'" + sel_dmd												+ "'	AS SEL_DMD,				\n";					
					sql5	+=	"			'" + gdReq.getHeader("DMD08"		).getValue(i)			+ "'	AS DMD08, 				\n";
					sql5	+=	"			'" + user_id   												+ "'  	AS MADE_BY		   		\n";
					sql5	+=	"	FROM   DUAL 																		          		\n";
					///////////////////////����ڰ� �׷캰 ������  ���� SQL////////////////////////////////////////////////////////////////////////

					sql += inner_sql;
					
					if(rowCount == 1){ // update�Ǽ��� 1���� ��� ora-01732������ �߻��Ѵ�. ������. ���� 1���� ��� ������ �ΰ����� �����.
						sql += "	UNION	ALL \n" + inner_sql;
						
					}
				}
									
			}//for�� ��.

			/******************************************************************************************************************/
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		MINMPSQTY = NEW_MIN_LOT_SIZE													                  	\n";
			/******************************************************************************************************************/

			///////////////////////���ֿ��� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			sql2 += ") MF1 											   	   															\n";
			sql2 += "ON (MF.CONS_ITEM_ID	= MF1.CONS_ITEM_ID    			   	   													\n";
			sql2 += "AND MF.CNFM_DATE 		= MF1.CNFM_DATE)							   											\n";
			sql2 += "when matched then update set            					  					 								\n";
			sql2 += " MF.FC_QTY 	 	= MF1.FC_QTY,         	   	   																\n";  	/* ���ֿ���  */
			
			sql2 += " MF.MADE_DTTM 	 		= SYSDATE,         	   	   																\n";  	
			sql2 += " MF.MADE_BY 	 		= MF1.MADE_BY         	   	   															\n";  	
			
			sql2 += "when not matched then insert(MF.CNFM_DATE,		MF.CONS_ITEM_ID,	MF.FC_QTY,	MF.MADE_DTTM,	MF.MADE_BY)		\n";
			sql2 += "values						 (MF1.CNFM_DATE,	MF1.CONS_ITEM_ID,	MF1.FC_QTY,	SYSDATE,		MF1.MADE_BY)	\n";			
			///////////////////////���ֿ��� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			
			///////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			sql3 += ") MS2 											   	   																	\n";
			sql3 += "ON (MS.CONS_ITEM_ID	= MS2.CONS_ITEM_ID    			   	   															\n";
			sql3 += "AND MS.CNFM_DATE 		= MS2.CNFM_DATE)							   													\n";
			sql3 += "when matched then update set            					  					 										\n";
			sql3 += " MS.CNFM_STOCK 	 	= MS2.CNFM_STOCK ,        	   	   																\n";  	/* Ȯ��(����)���  */
			sql3 += " MS.MADE_DTTM 	 		= SYSDATE,         	   	   																		\n";  	
			sql3 += " MS.MADE_BY 	 		= MS2.MADE_BY         	   	   																	\n";  	
			
			sql3 += "when not matched then insert(MS.CNFM_DATE,		MS.CONS_ITEM_ID,	MS.CNFM_STOCK,		MS.MADE_DTTM,	MS.MADE_BY)		\n";
			sql3 += "values						 (MS2.CNFM_DATE,	MS2.CONS_ITEM_ID,	MS2.CNFM_STOCK,		SYSDATE,		MS2.MADE_BY)	\n";			
			///////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////

			/****************************************����� �Է� �޼��� �Է� ***********************************************/
			sql4 += ") UM1 											   	   											\n";
			sql4 += "ON (UM.WD_ID			= UM1.WD_ID   			   	   											\n";
			sql4 += "AND UM.VERSION			= UM1.VERSION															\n";
			sql4 += "AND UM.ITEM_ID      	= UM1.ITEM_ID)    						   								\n";
			sql4 += "when matched then update set            					  					 				\n";
			sql4 += " MSG	 				= UM1.MSG           	   	   											\n";  	/* ���� �������  2013-02-13 */			
			sql4 += "when not matched then insert(WD_ID,	VERSION,		ITEM_ID		,MSG		,MADE_TYPE	,MADE_DTTM)		\n";
			sql4 += "values						 (UM1.WD_ID, UM1.VERSION,	UM1.ITEM_ID	,UM1.MSG	,'AD' 		,SYSDATE)		\n";
			
			/****************************************����� �Է� �޼��� �Է� ***********************************************/
			
			///////////////////////����ڰ� �׷캰 ������  ���� SQL////////////////////////////////////////////////////////////////////////
			sql5 += ") AP1 											   	   											\n";
			sql5 += "ON (AP.ITEM_ID		= AP1.ITEM_ID)    			   	   											\n";
			sql5 += "when matched then update set            					  					 				\n";
			
			sql5 += " AP.SEL_DMD 	 	= AP1.SEL_DMD,        	   	   												\n";
			sql5 += " AP.DMD08 	 		= AP1.DMD08,        	   	   												\n";  	/* ����� �׷캰 ������ ����  */
			sql5 += " AP.MADE_DTTM 	 	= SYSDATE,         	   	   													\n";  	
			sql5 += " AP.MADE_BY 	 	= AP1.MADE_BY         	   	   												\n";  	
			
			sql5 += "when not matched then insert(AP.ITEM_ID,	AP.SEL_DMD,		AP.DMD08,		AP.MADE_DTTM,	AP.MADE_BY)			\n";
			sql5 += "values						 (AP1.ITEM_ID,	AP1.SEL_DMD,	AP1.DMD08,		SYSDATE,		AP1.MADE_BY)		\n";			
			///////////////////////����ڰ� �׷캰 ������  ���� SQL////////////////////////////////////////////////////////////////////////			
			
			System.out.println("-----------------------------------------------QUERY_1: ITEM_MST MINMPSQTY UPDATE -----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY_1: ITEM_MST MINMPSQTY UPDATE -----------------------------------------------");

			System.out.println("-----------------------------------------------QUERY_2: MFS_ORDER_FORECAST FC_QTY UPDATE -----------------------------------------------");
			System.out.println(sql2);
			System.out.println("-----------------------------------------------QUERY_2: MFS_ORDER_FORECAST FC_QTY UPDATE -----------------------------------------------");
			
			System.out.println("-----------------------------------------------QUERY_3: MFS_STD_STOCK CNFM_STOCK UPDATE -----------------------------------------------");
			System.out.println(sql3);
			System.out.println("-----------------------------------------------QUERY_3: MFS_STD_STOCK CNFM_STOCK UPDATE -----------------------------------------------");
			
			System.out.println("-----------------------------------------------QUERY_4: USER_ITEM_MSG UPDATE -----------------------------------------------");
			System.out.println(sql4);
			System.out.println("-----------------------------------------------QUERY_4: USER_ITEM_MSG UPDATE -----------------------------------------------");

			System.out.println("-----------------------------------------------QUERY_5: DMD08 UPDATE -----------------------------------------------");
			System.out.println(sql5);
			System.out.println("-----------------------------------------------QUERY_5: DMD08 UPDATE -----------------------------------------------");
			
		
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);

			rs = databaseUtility.executeQuery(stmt, sql2);
			
			rs = databaseUtility.executeQuery(stmt, sql3);
			
			rs = databaseUtility.executeQuery(stmt, sql4);
			
			rs = databaseUtility.executeQuery(stmt, sql5);
			
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "save");
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

	//������� �ϰ� ���  ���� SP ȣ��
	public GridData doStd_Cal(GridData gdReq) throws Exception {
		System.out.println("doStd_Cal() start!!!");
		GridData gdRes = new GridData(); // WiseGrid ��ü����

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����
		//SP_OP_CR_APS_PR_PLAN_ROH('CRE_DATA',SYSDATE,1,1,'NA',SYSDATE);
		System.out.println("call SP_OP_CR_MFS_STD_PLAN() ����!!!");
		
		String mfs_flag		=	gdReq.getParam("mfs_flag");
		String com_code		=	gdReq.getParam("com_code");

		//String query_id		=	gdReq.getParam("query_id");

		String paramKey		=	"mfs_flag!%!com_code";                                                                      
		String paramCode	=	mfs_flag+"!%!"+com_code;
		
		
		String sql2 = "call SP_OP_CR_MFS_STD_PLAN('CRE_DATA',SYSDATE,1,1,'NA',SYSDATE,'"+mfs_flag+"', '"+com_code+"')";
		boolean result = stmt.execute(sql2);
		System.out.println("call SP_OP_CR_MFS_STD_PLAN() ����!!! - ��� : " + result);
		System.out.println("doStd_Cal() end!!!");

		gdRes.addParam("mode", "Std_Cal");
		gdRes.setMessage("���������� �۾��Ͽ����ϴ�.");
		gdRes.setStatus("true");
		
		
		return gdRes;		
	}	
	


	////////////Ȯ�� ��� ������ ���� ���� �߰�//
	public GridData doSave2(GridData gdReq) throws Exception {

		System.out.println("doSave2() start!!!");
		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement ��ü ����

		GridData gdRes = new GridData(); // WiseGrid ��ü����

		int rowCount = 0; // CRUD �÷� row ��

		String cnfm_stock		=	gdReq.getParam("cnfm_stock");
		String cnfm_date		=	gdReq.getParam("cnfm_date");

		//System.out.println("*************dosave2 --> cnfm_date : " + cnfm_date);			
		
		try {

			// ȭ�鿡�� ���޹��� "CRUD"�� row ���� �����´�.
			rowCount = gdReq.getHeader("CONS_ITEM_ID").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "Save2");
				gdRes.setMessage("���������� �۾��Ͽ����ϴ�._���嵥���� ����.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			String user_id = gdReq.getParam("user_id");
			String sql;
			

			///////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			sql   = "merge into MFS_STD_STOCK MS				       																\n";
			sql  += "using (                                           																\n";
			///////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			
			
			boolean flag = false;
			
			// ������ ����
			for (int i = 0; i < rowCount; i++) {
				System.out.println("��𿡼� ���� !! 1 : ");
				
				String crud = gdReq.getHeader("CONS_ITEM_ID").getValue(i);

					 
					if( flag){
						sql += "	UNION	ALL \n"; 
					}
					flag = true;
					
					//�Ķ���͸� ������ ����!!  

					///////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
					
					//sql 	+= "	SELECT		TRUNC(TO_DATE('$!{cnfm_date}'),'D')+1			AS CNFM_DATE, 		\n";
					sql 	+= "	SELECT		TRUNC(TO_DATE('" + cnfm_date + "','YYYY-MM-DD'),'D')+1			AS CNFM_DATE, 		\n";
					//sql += "	SELECT		TRUNC(SYSDATE, 'D')+1												AS CNFM_DATE, 		\n";					
					sql	+=	"			'" + gdReq.getHeader("CONS_ITEM_ID"		).getValue(i) 		+ "'		AS CONS_ITEM_ID, 	\n";		       			
					sql	+=	"			'" + gdReq.getHeader("UNIT"				).getValue(i) 		+ "'		AS UNIT, 			\n";		
					sql	+=	"			'" + gdReq.getHeader("CNFM_STOCK"		).getValue(i) 		+ "'		AS CNFM_STOCK, 		\n";
					sql	+=	"			'" + user_id   												+ "'  		AS MADE_BY      	\n";
					sql	+=	"	FROM   DUAL 																		          		\n";
					/////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
									
			}//for�� ��.
			
			
			///////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			sql += ") MS1 											   	   															\n";
			sql += "ON (MS.CONS_ITEM_ID	= MS1.CONS_ITEM_ID    			   	   														\n";
			sql += "AND MS.CNFM_DATE 		= MS1.CNFM_DATE)							   											\n";
			sql += "when matched then update set            					  					 								\n";
			sql += " MS.CNFM_STOCK 	 	= MS1.CNFM_STOCK         	   	   															\n";  	/* �������  */
			
			sql += "when not matched then insert(MS.CNFM_DATE,		MS.CONS_ITEM_ID,	MS.UNIT,	MS.CNFM_STOCK,		MS.MADE_DTTM,	MS.MADE_BY)	\n";
			sql += "values						 (MS1.CNFM_DATE,	MS1.CONS_ITEM_ID,	MS1.UNIT,	MS1.CNFM_STOCK,		SYSDATE,		MS1.MADE_BY)	\n";			
			///////////////////////Ȯ����� ���� SQL/////////////////////////////////////////////////////////////////////////////////////////
			

			System.out.println("-----------------------------------------------QUERY_1: MFS_STD_STOCK CNFM_STOCK UPDATE -----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY_1: MFS_STD_STOCK CNFM_STOCK UPDATE -----------------------------------------------");
			
			
			System.out.println("executeQuery ����!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);

			
			System.out.println("executeQuery ����!!!");
			
			/*
			 * ȭ�鿡 ������ �Ķ���͸� �����Ѵ�. �޼����� �����Ѵ�. Status�� �����Ѵ�
			 */
			gdRes.addParam("mode", "Save2");
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







}                     


                                                                                         