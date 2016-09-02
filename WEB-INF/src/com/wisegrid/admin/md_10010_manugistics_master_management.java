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
public class md_10010_manugistics_master_management extends HttpServlet {                                                             
                                                                                                                             
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
			                                                                                                                 
			String in_input_gubn	= gdReq.getParam("in_input_gubn");                                                            
			String itype 			= gdReq.getParam("itype"); 
			String com_code			= gdReq.getParam("com_code");	//2013-05-13 SCM팀 박경열 부장 요청으로 추가
			String sale_code		= gdReq.getParam("sale_code");	
			                                                                                                                 
			String paramKey   		=	"in_input_gubn!%!itype!%!com_code!%!sale_code";                                                                      
			String paramCode  		= in_input_gubn+"!%!"+itype+"!%!"+com_code+"!%!"+sale_code;                                                                   
                                                                                                                             
			String query_id   		= "md_10010_manugistics_master_management";                                                             
                                                                                                                             
			ArrayList<ArrayList<String>> qResult = new CommonUtil().getSelQeury(paramKey, paramCode, query_id);              
			                                                                                                                 
			rowCount = qResult.size();                                                                                       
                                                                                                                             
			//                                                                                                               
			if (rowCount == 0) {                                                                                             
				gdRes.addParam("mode", "search");		                                                                     
				gdRes.setMessage("...");                                                                                     
				gdRes.setStatus("true");                                                                                     
				return gdRes;                                                                                                
			}                                                                                                                
			
			String query_id2;	
			ArrayList<ArrayList<String>> cdList; 
			int arrIdx;
			String[] cd;
			String[] cdName;
				
			/* DPCAL 콤보 리스트를 추출하여 콤보리스트 생성 */
			query_id2 = "md_10010_DPCAL_list"; 
			System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("", "", query_id2);
			
			/* MFS_FLAG 콤보 리스트를 추출하여 콤보리스트 생성 */	//2013-04-19 MFS_FLAG COMBO LIST 생성 쿼리 우종균
			query_id2 = "f_get_code_name";  System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("cd_grp", "MFS_FLAG", query_id2);
			arrIdx = cdList.size();
			cd = new String[arrIdx];	
			cdName = new String[arrIdx];
			System.out.println("MFS_FLAG 콤보 리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("MFS_FLAG 컬럼에 콤보리스트 set");
			gdRes.getHeader("MFS_FLAG").setComboValues(cdName, cd);		
			
			arrIdx = cdList.size();
			cd = new String[arrIdx];
			cdName = new String[arrIdx];
			System.out.println("DPCAL 콤보 리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("DPCAL 컬럼에 콤보리스트 set");
			gdRes.getHeader("DPCAL").setComboValues(cdName, cd );

			/* MPSRULE 콤보 리스트를 추출하여 콤보리스트 생성 */
			query_id2 = "md_10010_MPSRULE_list"; 
			System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("", "", query_id2);
			
			arrIdx = cdList.size();
			cd = new String[arrIdx];
			cdName = new String[arrIdx];
			System.out.println("MPSRULE 콤보 리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("MPSRULE 컬럼에 콤보리스트 set");
			gdRes.getHeader("MPSRULE").setComboValues(cdName, cd );

			/* ALLOCCAL 콤보 리스트를 추출하여 콤보리스트 생성 */
			query_id2 = "md_10010_ALLOCCAL_list"; 
			System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("", "", query_id2);
			
			arrIdx = cdList.size();
			cd = new String[arrIdx];
			cdName = new String[arrIdx];
			System.out.println("ALLOCCAL 콤보 리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("ALLOCCAL 컬럼에 콤보리스트 set");
			gdRes.getHeader("ALLOCCAL").setComboValues(cdName, cd );
			
			/* SSRULE 콤보 리스트를 추출하여 콤보리스트 생성 */
			query_id2 = "md_10010_SSRULE_list"; 
			System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("", "", query_id2);
			
			arrIdx = cdList.size();
			cd = new String[arrIdx];
			cdName = new String[arrIdx];
			System.out.println("SSRULE 콤보 리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("SSRULE 컬럼에 콤보리스트 set");
			gdRes.getHeader("SSRULE").setComboValues(cdName, cd );

			
			/* DOMAIN 콤보 리스트를 추출하여 콤보리스트 생성 */
			query_id2 = "md_10010_DOMAIN_list"; 
			System.out.println("getSelQeury : " + query_id2);
			cdList = new CommonUtil().getSelQeury("", "", query_id2);
			
			arrIdx = cdList.size();
			cd = new String[arrIdx];
			cdName = new String[arrIdx];
			System.out.println("DOMAIN 콤보 리스트 생성");
			for ( int i = 0 ; i < arrIdx ; i++ ){
				cd[i] = cdList.get(i).get(0);   
				cdName[i] = cdList.get(i).get(1); 
			}
			System.out.println("DOMAIN 컬럼에 콤보리스트 set");
			gdRes.getHeader("DOMAIN").setComboValues(cdName, cd );		
			
			for (int i = 0; i < rowCount; i++) {                                                                             
				gdRes.getHeader("CRUD"			 	).addValue("","");
				gdRes.getHeader("ITEM_ID"			).addValue(qResult.get(i).get(0),"");                                      
				gdRes.getHeader("ITEM_NAME" 		).addValue(qResult.get(i).get(1),"");                                     
				gdRes.getHeader("USE_PR_PLAN" 		).addValue(qResult.get(i).get(2),""); 
				gdRes.getHeader("PR_FLAG" 			).addValue(qResult.get(i).get(52),"");
				gdRes.getHeader("ST_FLAG" 			).addValue(qResult.get(i).get(53),"");
				gdRes.getHeader("RC_FLAG" 			).addValue(qResult.get(i).get(3),"");
				gdRes.getHeader("SEMI_FLAG" 		).addValue(qResult.get(i).get(4),"");
				
				gdRes.getHeader("BS_FLAG1" 			).addValue(qResult.get(i).get(48),"");
				gdRes.getHeader("BS_FLAG2" 			).addValue(qResult.get(i).get(49),"");
				gdRes.getHeader("BS_FLAG3" 			).addValue(qResult.get(i).get(50),"");				
				gdRes.getHeader("BS_FLAG4" 			).addValue(qResult.get(i).get(51),"");
				
				gdRes.getHeader("PR_TO_PO" 			).addValue(qResult.get(i).get(5),"");                                     
				gdRes.getHeader("PO_TO_LC" 			).addValue(qResult.get(i).get(6),"");                                     
				gdRes.getHeader("LC_TO_PORT" 		).addValue(qResult.get(i).get(7),"");                                     
				gdRes.getHeader("PORT_TO_CUST" 		).addValue(qResult.get(i).get(8),"");                                     
				gdRes.getHeader("STD_VAR_FR" 		).addValue(qResult.get(i).get(9),"");                                     
				gdRes.getHeader("STD_VAR_TO" 		).addValue(qResult.get(i).get(10),"");                                     
				gdRes.getHeader("PRE_MONTH_FR" 		).addValue(qResult.get(i).get(11),"");                                     
				gdRes.getHeader("PRE_MONTH_TO" 		).addValue(qResult.get(i).get(12),"");                       
				gdRes.getHeader("USE_DP_FLAG"   	).addValue(qResult.get(i).get(13),"");                                     
				gdRes.getHeader("USE_DP_DATE"     	).addValue(qResult.get(i).get(14),"");                                     
				gdRes.getHeader("DPCAL"		 		).addSelectedHiddenValue(qResult.get(i).get(15));				
				gdRes.getHeader("USE_TAGE_FLAG"		).addValue(qResult.get(i).get(16),"");                                     
				gdRes.getHeader("USE_FF_FLAG"		).addValue(qResult.get(i).get(17),"");                                     
				gdRes.getHeader("USE_FF_DATE"		).addValue(qResult.get(i).get(18),"");                                     
				gdRes.getHeader("ORDER_FLAG"		).addValue(qResult.get(i).get(19),"");                                     
				gdRes.getHeader("CUSTORDERDUR"		).addValue(qResult.get(i).get(20),"");                                      
				gdRes.getHeader("MPSRULE"	 		).addSelectedHiddenValue(qResult.get(i).get(21));				
				gdRes.getHeader("MPSCOVDUR" 		).addValue(qResult.get(i).get(22),"");                                     
				gdRes.getHeader("MAXOH" 			).addValue(qResult.get(i).get(23),"");                                     
				gdRes.getHeader("ALLOCCAL"	 		).addSelectedHiddenValue(qResult.get(i).get(24));				
				gdRes.getHeader("PLANDUR" 			).addValue(qResult.get(i).get(25),"");                                     
				gdRes.getHeader("TIMEFENSEDUR" 		).addValue(qResult.get(i).get(26),"");                                     
				gdRes.getHeader("CPPPRIORITY" 		).addValue(qResult.get(i).get(27),"");                                     
				gdRes.getHeader("SSRULE"	 		).addSelectedHiddenValue(qResult.get(i).get(28));				
				gdRes.getHeader("SSCOV" 			).addValue(qResult.get(i).get(29),"");                                     
				gdRes.getHeader("MINSS" 			).addValue(qResult.get(i).get(30),"");                                     
				gdRes.getHeader("MAXSS" 			).addValue(qResult.get(i).get(31),"");                                     
				gdRes.getHeader("SSTEMPLATE" 		).addValue(qResult.get(i).get(32),"");                                     
				gdRes.getHeader("INCMPSQTY" 		).addValue(qResult.get(i).get(33),"");                                     
				gdRes.getHeader("MINMPSQTY" 		).addValue(qResult.get(i).get(34),"");                                     
				gdRes.getHeader("MANU_DEL_DUR" 		).addValue(qResult.get(i).get(35),"");                                     

				gdRes.getHeader("CONTAINER_BOX" 	).addValue(qResult.get(i).get(36),""); 
				gdRes.getHeader("P1110" 			).addValue(qResult.get(i).get(37),"");         
				gdRes.getHeader("P1120" 			).addValue(qResult.get(i).get(38),"");         
				gdRes.getHeader("P1130" 			).addValue(qResult.get(i).get(39),"");         
				gdRes.getHeader("P1140" 			).addValue(qResult.get(i).get(40),"");         
				gdRes.getHeader("P1150" 			).addValue(qResult.get(i).get(41),"");         
				gdRes.getHeader("P1160" 			).addValue(qResult.get(i).get(42),"");         
				gdRes.getHeader("P1170" 			).addValue(qResult.get(i).get(43),"");         
				gdRes.getHeader("P1180" 			).addValue(qResult.get(i).get(44),"");         

				gdRes.getHeader("DOMAIN"	 		).addSelectedHiddenValue(qResult.get(i).get(45));				
				gdRes.getHeader("MIN_PICK_QTY"		).addValue(qResult.get(i).get(46),"");
				
				gdRes.getHeader("MFS_FLAG"	 		).addSelectedHiddenValue(qResult.get(i).get(47));
				gdRes.getHeader("SW_FLAG" 			).addValue(qResult.get(i).get(54),"");	
				gdRes.getHeader("MHDHB" 			).addValue(qResult.get(i).get(55),"");
				gdRes.getHeader("SB_FLAG" 			).addValue(qResult.get(i).get(56),"");

			}                                                                                                                  
                                                                                                                             
			gdRes.addParam("mode", "search");		                                                                         
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
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("ITEM_ID").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "doSave");
				gdRes.setMessage("성공적으로 작업하였습니다._저장데이터 없음.");
				gdRes.setStatus("true");
				return gdRes;
			}

			System.out.println("CRUD Row Count : " + rowCount);

			//String user_id = gdReq.getParam("user_id");
			String sql, inner_sql;

			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.USE_PR_PLAN, T1.RC_FLAG, T1.SEMI_FLAG, T1.PR_TO_PO, T1.PO_TO_LC, T1.LC_TO_PORT, T1.PORT_TO_CUST, 	\n";
			sql += " 			T1.BS_FLAG,T1.PR_FLAG,T1.ST_FLAG,T1.STD_VAR_FR,T1.STD_VAR_TO, T1.PRE_MONTH_FR, T1.PRE_MONTH_TO, 		\n";
			sql += "			T1.USE_DP_DATE, T1.USE_FF_DATE, T1.USE_TAGE_FLAG, T1.SW_FLAG, T1.SB_FLAG,                               \n";
			sql += "			T1.ORDER_FLAG, T1.CUSTORDERDUR, T1.DPCAL,                                                              	\n";
			sql += "			T1.ALLOCCAL, T1.MPSRULE, T1.MPSCOVDUR,                                                                 	\n";
			sql += "			T1.MAXOH, T1.PLANDUR, T1.TIMEFENSEDUR,                                                                 	\n";
			sql += "			T1.CPPPRIORITY, T1.INCMPSQTY, T1.MINMPSQTY,                                                            	\n";
			sql += "			T1.SSRULE, T1.SSCOV, T1.MINSS,                                                                         	\n";
			sql += "			T1.MAXSS, T1.SSTEMPLATE, T1.MANU_DEL_DUR,                                                              	\n";
			sql += "			T1.MADE_DTTM, T1.CONTAINER_BOX,			                                                              	\n";
			sql += "			T1.DOMAIN, T1.MIN_PICK_QTY,	T1.MFS_FLAG,			                                                    \n";
			sql += "			T2.USE_PR_PLAN	NEW_USE_PR_PLAN, T2.PR_TO_PO	NEW_PR_TO_PO, T2.PO_TO_LC	NEW_PO_TO_LC, 				\n";
			sql += "			T2.RC_FLAG	NEW_RC_FLAG, T2.SEMI_FLAG NEW_SEMI_FLAG, T2.BS_FLAG NEW_BS_FLAG, T2.PR_FLAG NEW_PR_FLAG, T2.ST_FLAG NEW_ST_FLAG,	\n";
			sql += "			T2.LC_TO_PORT	NEW_LC_TO_PORT, T2.PORT_TO_CUST	NEW_PORT_TO_CUST, T2.STD_VAR_FR	NEW_STD_VAR_FR,			\n";
			sql += " 			T2.STD_VAR_TO	NEW_STD_VAR_TO, T2.PRE_MONTH_FR	NEW_PRE_MONTH_FR, T2.PRE_MONTH_TO	NEW_PRE_MONTH_TO,	\n";
			sql += "			T2.USE_DP_DATE	NEW_USE_DP_DATE, T2.USE_FF_DATE	NEW_USE_FF_DATE, T2.USE_TAGE_FLAG	NEW_USE_TAGE_FLAG, 	\n";
			sql += "			T2.SW_FLAG NEW_SW_FLAG, T2.SB_FLAG NEW_SB_FLAG, T2.ORDER_FLAG	NEW_ORDER_FLAG, T2.CUSTORDERDUR	NEW_CUSTORDERDUR, T2.DPCAL	NEW_DPCAL,                 	\n";
			sql += "			T2.ALLOCCAL	NEW_ALLOCCAL, T2.MPSRULE	NEW_MPSRULE, T2.MPSCOVDUR	NEW_MPSCOVDUR,                     	\n";
			sql += "			T2.MAXOH	NEW_MAXOH, T2.PLANDUR	NEW_PLANDUR, T2.TIMEFENSEDUR	NEW_TIMEFENSEDUR,                  	\n";
			sql += "			T2.CPPPRIORITY	NEW_CPPPRIORITY, T2.INCMPSQTY	NEW_INCMPSQTY, T2.MINMPSQTY	NEW_MINMPSQTY,             	\n";
			sql += "			T2.SSRULE	NEW_SSRULE, T2.SSCOV	NEW_SSCOV, T2.MINSS	NEW_MINSS,                                     	\n";
			sql += "			T2.MAXSS	NEW_MAXSS, T2.SSTEMPLATE	NEW_SSTEMPLATE, T2.MANU_DEL_DUR	NEW_MANU_DEL_DUR,		       	\n";
			sql += "			T2.CONTAINER_BOX	NEW_CONTAINER_BOX,															       	\n";
			sql += "			T2.DOMAIN	NEW_DOMAIN, T2.MIN_PICK_QTY	NEW_MIN_PICK_QTY, T2.MFS_FLAG NEW_MFS_FLAG				       	\n";
			sql += "	FROM	ITEM_MST	T1,                                                                                        	\n";
			sql += "			(                                                                                                      	\n";
			
			boolean flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				//System.out.println("crud ="+crud);
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					String dpcal = "";
					if(gdReq.getHeader("DPCAL").getSelectedIndex(i) > -1){							
						dpcal = gdReq.getHeader("DPCAL").getComboHiddenValues()[gdReq.getHeader("DPCAL").getSelectedIndex(i)];
					}

					String mfs_flag = "";
					if(gdReq.getHeader("MFS_FLAG").getSelectedIndex(i) > -1){							
						mfs_flag = gdReq.getHeader("MFS_FLAG").getComboHiddenValues()[gdReq.getHeader("MFS_FLAG").getSelectedIndex(i)];
					}					
					
					String alloccal = "";
					if(gdReq.getHeader("ALLOCCAL").getSelectedIndex(i) > -1){							
						alloccal = gdReq.getHeader("ALLOCCAL").getComboHiddenValues()[gdReq.getHeader("ALLOCCAL").getSelectedIndex(i)];
					}
					String mpsrule = "";
					if(gdReq.getHeader("MPSRULE").getSelectedIndex(i) > -1){							
						mpsrule = gdReq.getHeader("MPSRULE").getComboHiddenValues()[gdReq.getHeader("MPSRULE").getSelectedIndex(i)];
					}
					String ssrule = "";
					if(gdReq.getHeader("SSRULE").getSelectedIndex(i) > -1){							
						ssrule = gdReq.getHeader("SSRULE").getComboHiddenValues()[gdReq.getHeader("SSRULE").getSelectedIndex(i)];
					}
					String domain = "";
					if(gdReq.getHeader("DOMAIN").getSelectedIndex(i) > -1){							
						domain = gdReq.getHeader("DOMAIN").getComboHiddenValues()[gdReq.getHeader("DOMAIN").getSelectedIndex(i)];
					}
					
					//파라미터를 변수에 적용!!
					inner_sql  = "	SELECT				'" + gdReq.getHeader("ITEM_ID"			).getValue(i) 		+ "'				AS ITEM_ID, 					\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("USE_PR_PLAN"		).getValue(i)		+ ",1,'Y','N')	 	AS USE_PR_PLAN,             	\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("PR_FLAG"			).getValue(i)		+ ",1,'Y','N')	 	AS PR_FLAG,             		\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("ST_FLAG"			).getValue(i)		+ ",1,'Y','N')	 	AS ST_FLAG,             		\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("RC_FLAG"			).getValue(i)		+ ",1,'Y','N')	 	AS RC_FLAG,             		\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("SEMI_FLAG"		).getValue(i)		+ ",1,'Y','N')	 	AS SEMI_FLAG,             		\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("SW_FLAG"			).getValue(i)		+ ",1,'Y','N')	 	AS SW_FLAG,             		\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("SB_FLAG"			).getValue(i)		+ ",1,'Y','N')	 	AS SB_FLAG,             		\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("BS_FLAG1"			).getValue(i)		+ ",1,'1', 							\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("BS_FLAG2"			).getValue(i)		+ ",1,'2', 							\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("BS_FLAG3"			).getValue(i)		+ ",1,'3', 							\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("BS_FLAG4"			).getValue(i)		+ ",1,'4',''))))	AS BS_FLAG, 	\n";
					inner_sql += "						'" + gdReq.getHeader("PR_TO_PO"			).getValue(i)		+ "'				AS PR_TO_PO,                  	\n";
					inner_sql += "						'" + gdReq.getHeader("PO_TO_LC"			).getValue(i)		+ "'				AS PO_TO_LC,                  	\n";
					inner_sql += "						'" + gdReq.getHeader("LC_TO_PORT"		).getValue(i)		+ "'				AS LC_TO_PORT,                	\n";
					inner_sql += "						'" + gdReq.getHeader("PORT_TO_CUST"		).getValue(i)		+ "'				AS PORT_TO_CUST,                \n";
					inner_sql += "						'" + gdReq.getHeader("STD_VAR_FR"		).getValue(i)		+ "'				AS STD_VAR_FR,                  \n";
					inner_sql += "						'" + gdReq.getHeader("STD_VAR_TO"		).getValue(i)		+ "'				AS STD_VAR_TO,                  \n";
					inner_sql += "						'" + gdReq.getHeader("PRE_MONTH_FR"		).getValue(i)		+ "'				AS PRE_MONTH_FR,                \n";
					inner_sql += "						'" + gdReq.getHeader("PRE_MONTH_TO"		).getValue(i)		+ "'				AS PRE_MONTH_TO,                \n";
					inner_sql += "			CASE                                                              													\n";
					inner_sql += "				WHEN 	'" + gdReq.getHeader("USE_DP_FLAG").getValue(i) 	+ "' = '1' THEN '99991231'     						\n";
					inner_sql += "				WHEN 	REPLACE('" + gdReq.getHeader("USE_DP_DATE").getValue(i) 	+ "','-','') = '99991231' THEN TO_CHAR(SYSDATE,'YYYYMMDD')	\n";
					inner_sql += "				ELSE 	REPLACE('" + gdReq.getHeader("USE_DP_DATE").getValue(i) 	+ "','-','') 												\n";
					inner_sql += "			END			AS USE_DP_DATE,                                        													\n";
					inner_sql += "			CASE                                                              													\n";
					inner_sql += "				WHEN 	'" + gdReq.getHeader("USE_FF_FLAG"			).getValue(i) 	+ "' = '1' THEN '99991231'        					\n";
					inner_sql += "				WHEN 	REPLACE('" + gdReq.getHeader("USE_FF_DATE"	).getValue(i) 	+ "','-','') = '99991231' THEN TO_CHAR(SYSDATE,'YYYYMMDD')	\n";
					inner_sql += "				ELSE 	REPLACE('" + gdReq.getHeader("USE_FF_DATE"	).getValue(i) 	+ "','-','') 												\n";
					inner_sql += "			END			AS USE_FF_DATE,                                       													\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("USE_TAGE_FLAG").getValue(i)	+ ",1,'Y','N')	 	AS USE_TAGE_FLAG,             	\n";
					inner_sql += "			DECODE(		 " + gdReq.getHeader("ORDER_FLAG"	).getValue(i)	+ ",1,'Y','N')		AS ORDER_FLAG,                	\n";
					inner_sql += "						 " + gdReq.getHeader("CUSTORDERDUR"	).getValue(i)	+ "*1440			AS CUSTORDERDUR,              	\n";
					inner_sql += "						'" + dpcal											+ "'				AS DPCAL,                     	\n";
					inner_sql += "						'" + alloccal										+ "'				AS ALLOCCAL,                  	\n";
					inner_sql += "						'" + mpsrule										+ "'				AS MPSRULE,                   	\n";
					inner_sql += "						 " + gdReq.getHeader("MPSCOVDUR"	).getValue(i)	+ "*1440			AS MPSCOVDUR,                 	\n";
					inner_sql += "						 " + gdReq.getHeader("MAXOH"		).getValue(i)	+ "					AS MAXOH,                     	\n";
					inner_sql += "						 " + gdReq.getHeader("PLANDUR"		).getValue(i)	+ "*1440			AS PLANDUR,                   	\n";
					inner_sql += "						 " + gdReq.getHeader("TIMEFENSEDUR"	).getValue(i)	+ "*1440*7			AS TIMEFENSEDUR,              	\n";
					inner_sql += "						'" + gdReq.getHeader("CPPPRIORITY"	).getValue(i)	+ "'				AS CPPPRIORITY,               	\n";
					inner_sql += "						 " + gdReq.getHeader("INCMPSQTY"	).getValue(i)	+ "					AS INCMPSQTY,                 	\n";
					inner_sql += "						 " + gdReq.getHeader("MINMPSQTY"	).getValue(i)	+ "					AS MINMPSQTY,                 	\n";
					inner_sql += "						'" + ssrule											+ "'				AS SSRULE,                    	\n";
					inner_sql += "						 " + gdReq.getHeader("SSCOV"		).getValue(i)	+ "					AS SSCOV,                     	\n";
					inner_sql += "						 " + gdReq.getHeader("MINSS"		).getValue(i)	+ "					AS MINSS,                     	\n";
					inner_sql += "						 " + gdReq.getHeader("MAXSS"		).getValue(i)	+ "					AS MAXSS,                     	\n";
					inner_sql += "						'" + gdReq.getHeader("SSTEMPLATE"	).getValue(i)	+ "'				AS SSTEMPLATE,                	\n";
					inner_sql += "						 " + gdReq.getHeader("MANU_DEL_DUR"	).getValue(i)	+ "*1440			AS MANU_DEL_DUR,               	\n";
					inner_sql += "						 " + gdReq.getHeader("CONTAINER_BOX").getValue(i)	+ "					AS CONTAINER_BOX,             	\n";
					inner_sql += "						'" + domain											+ "'				AS DOMAIN,          			\n";
					inner_sql += "						 " + gdReq.getHeader("MIN_PICK_QTY"	).getValue(i)	+ "					AS MIN_PICK_QTY,              	\n";
					inner_sql += "						'" + mfs_flag										+ "'				AS MFS_FLAG              		\n";
					inner_sql += "	FROM	DUAL			                                                  													\n";
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for문 끝.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		USE_PR_PLAN = NEW_USE_PR_PLAN, RC_FLAG = NEW_RC_FLAG, SEMI_FLAG = NEW_SEMI_FLAG,  					\n";
			sql += "			BS_FLAG	= NEW_BS_FLAG, PR_FLAG = NEW_PR_FLAG, ST_FLAG = NEW_ST_FLAG, PR_TO_PO = NEW_PR_TO_PO, PO_TO_LC = NEW_PO_TO_LC,		\n";	
			sql += "			LC_TO_PORT = NEW_LC_TO_PORT, PORT_TO_CUST = NEW_PORT_TO_CUST, STD_VAR_FR = NEW_STD_VAR_FR,			\n";
			sql += "			STD_VAR_TO = NEW_STD_VAR_TO, PRE_MONTH_FR = NEW_PRE_MONTH_FR, PRE_MONTH_TO = NEW_PRE_MONTH_TO,		\n";
			sql += "			USE_DP_DATE	= NEW_USE_DP_DATE, USE_FF_DATE = NEW_USE_FF_DATE, USE_TAGE_FLAG = NEW_USE_TAGE_FLAG, SW_FLAG = NEW_SW_FLAG,	\n";
			sql += "			SB_FLAG = NEW_SB_FLAG, ORDER_FLAG = NEW_ORDER_FLAG, CUSTORDERDUR = NEW_CUSTORDERDUR, DPCAL = NEW_DPCAL,                 	\n";
			sql += "			ALLOCCAL = NEW_ALLOCCAL, MPSRULE = NEW_MPSRULE, MPSCOVDUR = NEW_MPSCOVDUR,                       	\n";
			sql += "			MAXOH = NEW_MAXOH, PLANDUR = NEW_PLANDUR, TIMEFENSEDUR = NEW_TIMEFENSEDUR,                       	\n";
			sql += "			CPPPRIORITY = NEW_CPPPRIORITY, INCMPSQTY = NEW_INCMPSQTY, MINMPSQTY = NEW_MINMPSQTY,             	\n";
			sql += "			SSRULE = NEW_SSRULE, SSCOV = NEW_SSCOV, MINSS = NEW_MINSS,                                       	\n";
			sql += "			MAXSS = NEW_MAXSS, SSTEMPLATE = NEW_SSTEMPLATE, MANU_DEL_DUR = NEW_MANU_DEL_DUR,                  	\n";
			sql += "			CONTAINER_BOX = NEW_CONTAINER_BOX, DOMAIN = NEW_DOMAIN, MIN_PICK_QTY = NEW_MIN_PICK_QTY, MFS_FLAG = NEW_MFS_FLAG, \n";
			sql += "			MADE_DTTM	= SYSDATE																               	\n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");

			
			// ITEM_DTL 저장
			sql = "";
			inner_sql = "";
			
			//해당 버젼이 있을경우에는 (MERGE 문 업데이트나 인설트를) 실행!!	
			sql  = "	UPDATE  /*+ bypass_ujvc*/ 																						\n";
			sql += "	( 																												\n";
			sql += "	SELECT																											\n";
			sql += "			T1.ALLOC_RATE, T1.MADE_DTTM, T2.ALLOC_RATE	NEW_ALLOC_RATE												\n";
			sql += "	FROM	ITEM_DTL	T1,                                                                                        	\n";
			sql += "			(                                                                                                      	\n";
			
			flag = false;
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				
				String crud = gdReq.getHeader("CRUD").getValue(i);
				//System.out.println("crud ="+crud);
				if(crud.equals("U")) {
					 
					if( flag){
						sql += "UNION	ALL \n"; 
					}
					flag = true;
					
					//파라미터를 변수에 적용!!
					inner_sql  = "	SELECT				'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'				AS ITEM_ID, 	\n";
					inner_sql += "											  '1110'											AS PLANT_ID, 	\n";
					inner_sql += "						'" + gdReq.getHeader("P1110").getValue(i) 			+ "'				AS ALLOC_RATE 	\n";
					inner_sql += "	FROM	DUAL			                                                  									\n";
					inner_sql += "	UNION	ALL				                                                  									\n";
					inner_sql += "	SELECT				'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'				AS ITEM_ID, 	\n";
					inner_sql += "											  '1120'											AS PLANT_ID, 	\n";
					inner_sql += "						'" + gdReq.getHeader("P1120").getValue(i) 			+ "'				AS ALLOC_RATE 	\n";
					inner_sql += "	FROM	DUAL			                                                  									\n";
					inner_sql += "	UNION	ALL				                                                  									\n";
					inner_sql += "	SELECT				'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'				AS ITEM_ID, 	\n";
					inner_sql += "											  '1130'											AS PLANT_ID, 	\n";
					inner_sql += "						'" + gdReq.getHeader("P1130").getValue(i) 			+ "'				AS ALLOC_RATE 	\n";
					inner_sql += "	FROM	DUAL			                                                  									\n";
					inner_sql += "	UNION	ALL				                                                  									\n";
					inner_sql += "	SELECT				'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'				AS ITEM_ID, 	\n";
					inner_sql += "											  '1140'											AS PLANT_ID, 	\n";
					inner_sql += "						'" + gdReq.getHeader("P1140").getValue(i) 			+ "'				AS ALLOC_RATE 	\n";
					inner_sql += "	FROM	DUAL			                                                  									\n";
					inner_sql += "	UNION	ALL				                                                  									\n";
					inner_sql += "	SELECT				'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'				AS ITEM_ID, 	\n";
					inner_sql += "											  '1150'											AS PLANT_ID, 	\n";
					inner_sql += "						'" + gdReq.getHeader("P1150").getValue(i) 			+ "'				AS ALLOC_RATE 	\n";
					inner_sql += "	FROM	DUAL			                                                  									\n";
					inner_sql += "	UNION	ALL				                                                  									\n";
					inner_sql += "	SELECT				'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'				AS ITEM_ID, 	\n";
					inner_sql += "											  '1160'											AS PLANT_ID, 	\n";
					inner_sql += "						'" + gdReq.getHeader("P1160").getValue(i) 			+ "'				AS ALLOC_RATE 	\n";
					inner_sql += "	FROM	DUAL			                                                  									\n";
					inner_sql += "	UNION	ALL				                                                  									\n";
					inner_sql += "	SELECT				'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'				AS ITEM_ID, 	\n";
					inner_sql += "											  '1170'											AS PLANT_ID, 	\n";
					inner_sql += "						'" + gdReq.getHeader("P1170").getValue(i) 			+ "'				AS ALLOC_RATE 	\n";
					inner_sql += "	FROM	DUAL			                                                  									\n";
					inner_sql += "	UNION	ALL				                                                  									\n";
					inner_sql += "	SELECT				'" + gdReq.getHeader("ITEM_ID").getValue(i) 		+ "'				AS ITEM_ID, 	\n";
					inner_sql += "											  '1180'											AS PLANT_ID, 	\n";
					inner_sql += "						'" + gdReq.getHeader("P1180").getValue(i) 			+ "'				AS ALLOC_RATE 	\n";
					inner_sql += "	FROM	DUAL			                                                  									\n";
					
					sql += inner_sql;
					
					if(rowCount == 1){ // update건수가 1건인 경우 ora-01732에러가 발생한다. 이유모름. 따라서 1건인 경우 강제로 두건으로 만든다.
						sql += "UNION	ALL \n" + inner_sql;
					}
				}
									
			}//for문 끝.
			
			sql += "			)			T2                                                                                      \n";
			sql += "	WHERE	T1.ITEM_ID	= T2.ITEM_ID                                                                            \n";
			sql += "	AND		T1.PLANT_ID	= T2.PLANT_ID                                                                          	\n";
			sql += "	)                                                                                                        	\n";
			sql += "	SET		ALLOC_RATE = NEW_ALLOC_RATE,													 					\n";
			sql += "			MADE_DTTM	= SYSDATE																                \n";

			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			System.out.println(sql);
			System.out.println("-----------------------------------------------QUERY-----------------------------------------------");
			
			System.out.println("executeQuery 실행!!!");
			
			rs = databaseUtility.executeQuery(stmt, sql);
			
			System.out.println("executeQuery 종료!!!");
			
			/*
			 * 화면에 전달할 파라미터를 설정한다. 메세지를 셋팅한다. Status를 설정한다
			 */
			gdRes.addParam("mode", "save");
			gdRes.setMessage("성공적으로 작업하였습니다.");
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