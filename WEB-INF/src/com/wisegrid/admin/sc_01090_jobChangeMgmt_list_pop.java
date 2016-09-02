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
public class sc_01090_jobChangeMgmt_list_pop extends HttpServlet {

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
			
			String p_plant_id = gdReq.getParam("plant_id");
			String p_line_id  = gdReq.getParam("line_id");
			String p_proc_id  = gdReq.getParam("proc_id");

			String paramKey   ="p_plant_id!%!p_line_id!%!p_proc_id";
			String paramCode  = p_plant_id+"!%!"+p_line_id+"!%!"+p_proc_id;
			String query_id   = "sc_01090_jobChangeMgmt_list_pop";

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
				gdRes.getHeader("CRUD").addValue("", "");  //추가,삭제,보정 을 구분하기 위한 부분.C(추가) ,U(보정) ,D(삭제)
                gdRes.getHeader("PLANT"        ).addValue(qResult.get(i).get(0 ),""); 
                gdRes.getHeader("PLANT_NM"     ).addValue(qResult.get(i).get(1 ),""); 
                gdRes.getHeader("LINE_ID"      ).addValue(qResult.get(i).get(2 ),"");
                gdRes.getHeader("LINE_NM"      ).addValue(qResult.get(i).get(3 ),"");
                gdRes.getHeader("PROC_ID"      ).addValue(qResult.get(i).get(4 ),"");
                gdRes.getHeader("PROC_NM"      ).addValue(qResult.get(i).get(5 ),"");
                gdRes.getHeader("FROM_GROUP"   ).addValue(qResult.get(i).get(6 ),"");
                gdRes.getHeader("FROM_GROUP_NM").addValue(qResult.get(i).get(7 ),"");
                gdRes.getHeader("TO_GROUP"     ).addValue(qResult.get(i).get(8 ),"");
                gdRes.getHeader("TO_GROUP_NM"  ).addValue(qResult.get(i).get(9 ),"");
                gdRes.getHeader("JC_TIME"      ).addValue(qResult.get(i).get(10),"");       
                gdRes.getHeader("BOX_QTY"      ).addValue(qResult.get(i).get(11),"");       
				
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
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();
			
			//
			String inData[][] = new String[rowCount][];

			//
			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}
			
			/*
			 *
			 */
			
			//
			//
			insertData = getSendData(inData, "C");	
			
			/*
			 *
			 *
			 */	
			gdRes.addParam("mode", "insert");
			gdRes.addParam("insert_data", insertData);
			gdRes.setMessage("");
			gdRes.setStatus("true");

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
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();

			//
			String inData[][] = new String[rowCount][];

			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}

			/*
			 *
			 */
			
			//
			//
			updatedata = getSendData(inData, "U");
			
			/*
			 *
			 *
			 */	
			gdRes.addParam("mode", "update");
			gdRes.addParam("update_data", updatedata);
			gdRes.setMessage("");
			gdRes.setStatus("true");
			
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
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();
			String inData[] = new String[rowCount];
			
			/*
			 *
			 */
			
			// 
			// 
			deleteData = getSendData2(inData);
			
			/*
			 *
			 *
			 */	
			gdRes.addParam("mode", "delete");
			gdRes.addParam("delete_data", deleteData);
			gdRes.setMessage("");
			gdRes.setStatus("true");

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
		
		int rowCount = 0;
        String update = "";
        String sq = "";
        String sp = "";
		
        String plant      = "";   
        String line_id    = "";
        String proc_id    = "";
        String from_group = "";
        String to_group   = "";
        String jc_time    = "";          
        
		String rsget = null;
		String user_id = gdReq.getParam("_user_id");
		
		try {
			
			//화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();

			System.out.println("---------------------------------------------------------");
			System.out.println("rowCount:"+rowCount);
		 		 						
			if( rowCount >= 1)
			{
				
				for (int i=0; i<rowCount ;i++)
				{
					
			        plant      = gdReq.getHeader("PLANT"     ).getValue(i);   
			        line_id    = gdReq.getHeader("LINE_ID"   ).getValue(i);   
			        proc_id    = gdReq.getHeader("PROC_ID"   ).getValue(i);   
			        from_group = gdReq.getHeader("FROM_GROUP").getValue(i);   
			        to_group   = gdReq.getHeader("TO_GROUP"  ).getValue(i);   
			        jc_time    = gdReq.getHeader("JC_TIME"   ).getValue(i);  
			        
					if(i>0)
						sq += "\n union all ";
					
					sq += "\n select                                   ";
					sq += "\n         '"+plant     +"' as PLANT        ";                                                                                                  
					sq += "\n        ,'"+line_id   +"' as LINE_ID      ";                                                                                                 
					sq += "\n        ,'"+proc_id   +"' as PROC_ID      ";                                                                                                 
					sq += "\n        ,'"+from_group+"' as FROM_GROUP   ";                                                                                                 
					sq += "\n        ,'"+to_group  +"' as TO_GROUP     ";                                                                                                 
					sq += "\n        ,'"+jc_time   +"' as JC_TIME      ";                                                                                                 
					sq += "\n   from dual 						       "; 
				}
			    
			    update += "\n merge into JC_TIME_TEST JCT                                                                                                                                                          ";
			    update += "\n using (                                                                                                                                                                              ";
			    update += "\n             select LST.PLANT                                                                                                                                                         ";
			    update += "\n                   ,LST.LINE_ID                                                                                                                                                       ";
			    update += "\n                   ,LST.PROC_ID                                                                                                                                                       ";
			    update += "\n                   ,LST.FROM_GROUP                                                                                                                                                    ";
			    update += "\n                   ,LST.TO_GROUP                                                                                                                                                      ";
			    update += "\n                   ,LST.JC_TIME                                                                                                                                                       ";
			    update += "\n                    ------------------------                                                                                                                                          ";
			    update += "\n                   ,MST.PLANT_NM                                                                                                                                                      ";
			    update += "\n                   ,MST.LINE_NM                                                                                                                                                       ";
			    update += "\n                   ,MST.PROC_NM                                                                                                                                                       ";
			    update += "\n                    ------------------------                                                                                                                                          ";
			    update += "\n                   ,case when LST.FROM_GROUP='ALL' then '전체' else FITM.ITEM_NAME end as FROM_GROUP_NM                                                                               ";
			    update += "\n                   ,case when LST.TO_GROUP='ALL' then '전체' else TITM.ITEM_NAME end as TO_GROUP_NM                                                                                   ";
			    update += "\n               from (                                                                                                                                                                 ";
			    update += sq;
			    update += "\n                    ) LST                                                                                                                                                             ";
			    update += "\n                    ------------------------------------------------------------------------                                                                                          ";
			    update += "\n                    --공장명, 라인명, 라인명을 가져온다.                                                                                                                              ";
			    update += "\n                    left outer join                                                                                                                                                   ";
			    update += "\n                    (                                                                                                                                                                 ";
			    update += "\n                         select distinct PLANT ,PLANT_NM ,LINE_ID ,LINE_NM ,PROC_ID ,PROC_NM                                                                                          ";
			    update += "\n                           from JC_TIME_TEST_MST                                                                                                                                      ";
			    update += "\n                    ) MST                                                                                                                                                             ";
			    update += "\n                    on  MST.PLANT = LST.PLANT                                                                                                                                         ";
			    update += "\n                    and MST.LINE_ID = LST.LINE_ID                                                                                                                                     ";
			    update += "\n                    and MST.PROC_ID = LST.PROC_ID                                                                                                                                     ";
			    update += "\n                    ------------------------------------------------------------------------                                                                                          ";
			    update += "\n                    --From 아이템명                                                                                                                                                   ";
			    update += "\n                    left outer join                                                                                                                                                   ";
			    update += "\n                    (                                                                                                                                                                 ";
			    update += "\n                        select distinct RECIPE_TYPE ,ITEM_NAME from JC_TIME_TEST_MST                                                                                                  ";
			    update += "\n                    ) FITM                                                                                                                                                            ";
			    update += "\n                    on  FITM.RECIPE_TYPE = LST.FROM_GROUP                                                                                                                             ";
			    update += "\n                    ------------------------------------------------------------------------                                                                                          ";
			    update += "\n                    --TO 아이템명                                                                                                                                                     ";
			    update += "\n                    left outer join                                                                                                                                                   ";
			    update += "\n                    (                                                                                                                                                                 ";
			    update += "\n                        select distinct RECIPE_TYPE ,ITEM_NAME from JC_TIME_TEST_MST                                                                                                  ";
			    update += "\n                    ) TITM                                                                                                                                                            ";
			    update += "\n                    on  TITM.RECIPE_TYPE = LST.TO_GROUP                                                                                                                               ";
			    update += "\n       ) LST                                                                                                                                                                          ";
			    update += "\n   on  (                                                                                                                                                                              ";
			    update += "\n                JCT.PLANT     = LST.PLANT                                                                                                                                             ";
			    update += "\n           and JCT.LINE_ID    = LST.LINE_ID                                                                                                                                           ";
			    update += "\n           and JCT.PROC_ID    = LST.PROC_ID                                                                                                                                           ";
			    update += "\n           and JCT.FROM_GROUP = LST.FROM_GROUP                                                                                                                                        ";
			    update += "\n           and JCT.TO_GROUP   = LST.TO_GROUP                                                                                                                                          ";
			    update += "\n       ) when matched then                                                                                                                                                            ";
			    update += "\n             update                                                                                                                                                                   ";
			    update += "\n                set JCT.JC_TIME = LST.JC_TIME                                                                                                                                         ";
			    update += "\n                   ,JCT.USER02 = 'U_UI'                                                                                                                                               ";
			    update += "\n         when not matched then                                                                                                                                                        ";
			    update += "\n             insert                                                                                                                                                                   ";
			    update += "\n             (JCT.PLANT, JCT.PLANT_NM, JCT.LINE_ID, JCT.LINE_NM, JCT.PROC_ID, JCT.PROC_NM, JCT.FROM_GROUP, JCT.FROM_GROUP_NM, JCT.TO_GROUP, JCT.TO_GROUP_NM, JCT.JC_TIME, JCT.USER02) ";
			    update += "\n             values                                                                                                                                                                   ";
			    update += "\n             (LST.PLANT, LST.PLANT_NM, LST.LINE_ID, LST.LINE_NM, LST.PROC_ID, LST.PROC_NM, LST.FROM_GROUP, LST.FROM_GROUP_NM, LST.TO_GROUP, LST.TO_GROUP_NM, LST.JC_TIME, 'I_UI')     ";			    
			    
			    
			    
	            System.out.println(update);
				
                //rs = databaseUtility.executeQuery(stmt, update); 
				
			
			}
						
			/* 화면에 전달할  파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */			
			gdRes.addParam("mode", "save");
			//gdRes.addParam("saveData", returnData);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		} catch (Exception e) {
			throw e;
		} finally {
            databaseUtility.close(conn, stmt, rs);              
        }
		
		return gdRes;
	}	
	
}