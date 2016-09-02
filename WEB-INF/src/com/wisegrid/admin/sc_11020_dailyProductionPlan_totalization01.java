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
public class sc_11020_dailyProductionPlan_totalization01 extends HttpServlet {

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
		
		conn = databaseUtility.getConnection("t3sinc");
	    stmt = conn.createStatement();

	    GridData gdRes = new GridData();		
		int rowCount = 0;
		int loopNum = 0;
		String s_query = "";
		String sub_query = "";

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			//String p_plant_name = gdReq.getParam("plant_name");

			String p_startDate= gdReq.getParam("startDate");
			String p_endDate  = gdReq.getParam("endDate");
			String p_plant_id = gdReq.getParam("plant_id");
			

			s_query+="\n                          select --공장,주차별로 날짜 리스트를 가져온다.                                                          ";
			s_query+="\n                                 PNT.SUB_CAT                                                                                      ";
			s_query+="\n                                ,XXX.YYYYWW                                                                                       ";
			s_query+="\n                                ,FN_GET_VERSION('PS',PNT.PLANT_ID,XXX.YYYYMMDD) as MAX_VER                                        ";
			s_query+="\n                            from CAL_MST XXX                                                                                      ";
			s_query+="\n                                 inner join                                                                                       ";
			s_query+="\n                                 (                                                                                                ";
			s_query+="\n                                  select distinct YYYYWW                                                                          ";
			s_query+="\n                                    from CAL_MST CAL                                                                              ";
			s_query+="\n                                   where exists                                                                                   ";
			s_query+="\n                                         (                                                                                        ";
			s_query+="\n                                          select 'X'                                                                              ";
			s_query+="\n                                            from (                                                                                ";
			s_query+="\n                                                  select distinct to_char(HIS.PROD_DATES,'YYYYMMDD') as PROD_DATES                ";
			s_query+="\n                                                    from DAILY_SCH_PLAN_HISTORY HIS                                               ";
			s_query+="\n                                                         inner join                                                               ";
			s_query+="\n                                                         (                                                                        ";
			s_query+="\n                                                          select replace('"+p_startDate+"','-','') as SDATE                         ";
			s_query+="\n                                                                ,replace('"+p_endDate+"','-','') as EDATE                           ";
			s_query+="\n                                                            from DUAL                                                             ";
			s_query+="\n                                                         ) IDX                                                                    ";
			s_query+="\n                                                         on  HIS.MODIFY_DATE between IDX.SDATE and IDX.EDATE                      ";
			s_query+="\n                                                         and HIS.CAT_ID='PS'                                                      ";
			s_query+="\n                                                         and HIS.REASON01 is not null                                             ";
			s_query+="\n                                                         and HIS.REASON02 is not null                                             ";
			s_query+="\n                                                  ) IDX                                                                           ";
			s_query+="\n                                            where IDX.PROD_DATES =CAL.YYYYMMDD                                                    ";
			s_query+="\n                                         )                                                                                        ";
			s_query+="\n                                 ) YYY                                                                                            ";
			s_query+="\n                                 on  XXX.YYYYWW  =YYY.YYYYWW                                                                      ";
			s_query+="\n                                 and XXX.WEEK_DAY='월'                                                                            ";
			s_query+="\n                                 inner join V_PLANT PNT                                                                           ";
			s_query+="\n                                 on 1=1                                                                                           ";
			s_query+="\n                          union all select 'xxx' AS SUB_CAT ,'XXX' as YYYYWW ,'XXX' as MAX_VER from dual                               ";		    
			System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query); 
            
            s_query="";
            if(rs.next()){
                do{
                	   if(loopNum>0) sub_query+="\n union all";
                	   sub_query+="\n select '"+rs.getString("SUB_CAT")+"' as SUB_CAT ,'"+rs.getString("YYYYWW")+"' as YYYYWW ,'"+rs.getString("MAX_VER")+"' as MAX_VER from DUAL";
                       loopNum++;
                       
                }while(rs.next());
            }            
            System.out.println(sub_query);
			
			
            s_query+="\n with                                                                                                                             ";
            s_query+="\n      V_LST                                                                                                                       ";
            s_query+="\n   as (                                                                                                                           ";
            s_query+="\n     select R01.CD_NAME as R01_NAME                                                                                               ";
            s_query+="\n           ,R02.CD_NAME as R02_NAME                                                                                               ";
            s_query+="\n           ,LST.R02_COUNT                                                                                                         ";
            s_query+="\n           ,to_char( round( (LST.R02_COUNT/nvl(sum(LST.R02_COUNT) over( order by 1),0))*100 ,1) ,'FM990.0')||'%' as R02_PERCENT   ";
            s_query+="\n           ,LST.REASON01 ,LST.REASON02                                                                                            ";
            s_query+="\n       from (                                                                                                                     ";
            s_query+="\n                 select HIS.REASON01 ,HIS.REASON02                                                                                ";
            s_query+="\n                       ,count(HIS.REASON02) as R02_COUNT                                                                          ";
            s_query+="\n                   from (                                                                                                         ";
            s_query+=sub_query;
            s_query+="\n                        ) VER                                                                                                     ";
            s_query+="\n                        ---------------------------------------------------------                                                 ";
            s_query+="\n                        --공장 약칭코드에 대한 전체 코드명을 가져온다.                                                            ";
            s_query+="\n                        inner join CODE_MST MST                                                                                   ";
            s_query+="\n                        on  MST.CD_GRP = 'SUB_CAT'                                                                                ";
            s_query+="\n                        and MST.CD     = VER.SUB_CAT                                                                              ";
            s_query+="\n                        and MST.CAT01  is not null                                                                                ";
            s_query+="\n                        ---------------------------------------------------------                                                 ";
            s_query+="\n                        --이력 정보를 가져온다.                                                                                   ";
            s_query+="\n                        inner join DAILY_SCH_PLAN_HISTORY HIS                                                                     ";
            s_query+="\n                        on  HIS.MODIFY_DATE between replace('"+p_startDate+"','-','') and replace('"+p_endDate+"','-','')             ";
            s_query+="\n                        and HIS.CAT_ID      = 'PS'                                                                                ";
            s_query+="\n                        and HIS.PLANT_ID    = MST.CAT01                                                                           ";
            s_query+="\n                        and HIS.VERSION     = VER.MAX_VER                                                                         ";
            s_query+="\n                        and HIS.PLANT_ID    like '"+p_plant_id+"%'                                                                  ";
            s_query+="\n                        and HIS.REASON01 is not null                                                                              ";
            s_query+="\n                  group by HIS.REASON01 ,HIS.REASON02                                                                             ";
            s_query+="\n            ) LST                                                                                                                 ";
            s_query+="\n            ---------------------------------------------------------                                                             ";
            s_query+="\n            --내역 코드에 대한 TEXT명을 가져온다.                                                                                 ";
            s_query+="\n            left outer join CODE_MST R01                                                                                          ";
            s_query+="\n            on  R01.CD_GRP = 'MSG_GROUP'                                                                                          ";
            s_query+="\n            and R01.CD     = LST.REASON01                                                                                         ";
            s_query+="\n            left outer join CODE_MST R02                                                                                          ";
            s_query+="\n            on  R02.CD_GRP = R01.CD_NAME                                                                                          ";
            s_query+="\n            and R02.CD     = LST.REASON02                                                                                         ";
            s_query+="\n      order by REASON01 ,REASON02                                                                                                 ";
            s_query+="\n  )                                                                                                                               ";
            s_query+="\n  select R01_NAME, R02_NAME, R02_COUNT, R02_PERCENT, REASON01, REASON02                                                           ";
            s_query+="\n  from   v_lst                                                                                                                    ";
            s_query+="\n  UNION  ALL                                                                                                                      ";
            s_query+="\n  SELECT '전체' R01_NAME, ' ' R02_NAME, nvl(SUM(R02_COUNT),0) R02_COUNT, ' ' R02_PERCENT, ' ' REASON01, ' ' REASON02                         ";
            s_query+="\n  FROM   V_LST                                                                                                                    ";		
            System.out.println(s_query);
            rs = databaseUtility.executeQuery(stmt, s_query); 
			
            if(rs.next()){
                do{
                       gdRes.getHeader("R01_NAME"   ).addValue(rs.getString("R01_NAME"      ),"");  
                       gdRes.getHeader("R02_NAME"   ).addValue(rs.getString("R02_NAME"      ),"");  
                       gdRes.getHeader("R02_COUNT"  ).addValue(rs.getString("R02_COUNT"     ),"");  
                       gdRes.getHeader("R02_PERCENT").addValue(rs.getString("R02_PERCENT"   ),"");  
                       gdRes.getHeader("REASON01"   ).addValue(rs.getString("REASON01"      ),"");  
                       gdRes.getHeader("REASON02"   ).addValue(rs.getString("REASON02"      ),"");  
                }while(rs.next());
            }       
			
			gdRes.addParam("mode", "search");		
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		} finally {
            databaseUtility.close(conn, stmt, rs);              
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
        String merge = "";
        String sq = "";
        String delete = "";
		
        String plant      = "";   
        String line_id    = "";
        String proc_id    = "";
        String from_group = "";
        String to_group   = "";
        String jc_time    = "";          
        String box_qty    = "";          
        
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
			        box_qty    = gdReq.getHeader("BOX_QTY"   ).getValue(i);  
			        
					if(i>0)
						sq += "\n union all ";
					
					sq += "\n select                                   ";
					sq += "\n         '"+plant     +"' as PLANT        ";                                                                                                  
					sq += "\n        ,'"+line_id   +"' as LINE_ID      ";                                                                                                 
					sq += "\n        ,'"+proc_id   +"' as PROC_ID      ";                                                                                                 
					sq += "\n        ,'"+from_group+"' as FROM_GROUP   ";                                                                                                 
					sq += "\n        ,'"+to_group  +"' as TO_GROUP     ";                                                                                                 
					sq += "\n        ,'"+jc_time   +"' as JC_TIME      ";                                                                                                 
					sq += "\n        ,'"+box_qty   +"' as BOX_QTY      ";                                                                                                 
					sq += "\n   from dual 						       "; 
				}
			    
				merge += "\n merge into JC_TIME_TEST JCT                                                                                                                                                          ";
				merge += "\n using (                                                                                                                                                                              ";
				merge += "\n             select LST.PLANT                                                                                                                                                         ";
				merge += "\n                   ,LST.LINE_ID                                                                                                                                                       ";
				merge += "\n                   ,LST.PROC_ID                                                                                                                                                       ";
				merge += "\n                   ,LST.FROM_GROUP                                                                                                                                                    ";
			    merge += "\n                   ,LST.TO_GROUP                                                                                                                                                      ";
			    merge += "\n                   ,LST.JC_TIME                                                                                                                                                       ";
			    merge += "\n                   ,LST.BOX_QTY                                                                                                                                                       ";
			    merge += "\n                    ------------------------                                                                                                                                          ";
			    merge += "\n                   ,MST.PLANT_NM                                                                                                                                                      ";
			    merge += "\n                   ,MST.LINE_NM                                                                                                                                                       ";
			    merge += "\n                   ,MST.PROC_NM                                                                                                                                                       ";
			    merge += "\n                    ------------------------                                                                                                                                          ";
			    merge += "\n                   ,case when LST.FROM_GROUP='ALL' then '전체' else FITM.ITEM_NAME end as FROM_GROUP_NM                                                                               ";
			    merge += "\n                   ,case when LST.TO_GROUP='ALL' then '전체' else TITM.ITEM_NAME end as TO_GROUP_NM                                                                                   ";
			    merge += "\n               from (                                                                                                                                                                 ";
			    merge += sq;
			    merge += "\n                    ) LST                                                                                                                                                             ";
			    merge += "\n                    ------------------------------------------------------------------------                                                                                          ";
			    merge += "\n                    --공장명, 라인명, 라인명을 가져온다.                                                                                                                              ";
			    merge += "\n                    left outer join                                                                                                                                                   ";
			    merge += "\n                    (                                                                                                                                                                 ";
			    merge += "\n                         select distinct PLANT ,PLANT_NM ,LINE_ID ,LINE_NM ,PROC_ID ,PROC_NM                                                                                          ";
			    merge += "\n                           from JC_TIME_TEST_MST                                                                                                                                      ";
			    merge += "\n                    ) MST                                                                                                                                                             ";
			    merge += "\n                    on  MST.PLANT = LST.PLANT                                                                                                                                         ";
			    merge += "\n                    and MST.LINE_ID = LST.LINE_ID                                                                                                                                     ";
			    merge += "\n                    and MST.PROC_ID = LST.PROC_ID                                                                                                                                     ";
			    merge += "\n                    ------------------------------------------------------------------------                                                                                          ";
			    merge += "\n                    --From 아이템명                                                                                                                                                   ";
			    merge += "\n                    left outer join                                                                                                                                                   ";
			    merge += "\n                    (                                                                                                                                                                 ";
			    merge += "\n                        select distinct RECIPE_TYPE ,ITEM_NAME from JC_TIME_TEST_MST                                                                                                  ";
			    merge += "\n                    ) FITM                                                                                                                                                            ";
			    merge += "\n                    on  FITM.RECIPE_TYPE = LST.FROM_GROUP                                                                                                                             ";
			    merge += "\n                    ------------------------------------------------------------------------                                                                                          ";
			    merge += "\n                    --TO 아이템명                                                                                                                                                     ";
			    merge += "\n                    left outer join                                                                                                                                                   ";
			    merge += "\n                    (                                                                                                                                                                 ";
			    merge += "\n                        select distinct RECIPE_TYPE ,ITEM_NAME from JC_TIME_TEST_MST                                                                                                  ";
			    merge += "\n                    ) TITM                                                                                                                                                            ";
			    merge += "\n                    on  TITM.RECIPE_TYPE = LST.TO_GROUP                                                                                                                               ";
			    merge += "\n       ) LST                                                                                                                                                                          ";
			    merge += "\n   on  (                                                                                                                                                                              ";
			    merge += "\n                JCT.PLANT     = LST.PLANT                                                                                                                                             ";
			    merge += "\n           and JCT.LINE_ID    = LST.LINE_ID                                                                                                                                           ";
			    merge += "\n           and JCT.PROC_ID    = LST.PROC_ID                                                                                                                                           ";
			    merge += "\n           and JCT.FROM_GROUP = LST.FROM_GROUP                                                                                                                                        ";
			    merge += "\n           and JCT.TO_GROUP   = LST.TO_GROUP                                                                                                                                          ";
			    merge += "\n       ) when matched then                                                                                                                                                            ";
			    merge += "\n             update                                                                                                                                                                  ";
			    merge += "\n                set JCT.JC_TIME = LST.JC_TIME                                                                                                                                         ";
			    merge += "\n                   ,JCT.BOX_QTY = LST.BOX_QTY                                                                                                                                         ";
			    merge += "\n                   ,JCT.MADE_DTTM = SYSDATE                                                                                                                                           ";
			    merge += "\n                   ,JCT.MADE_BY = '"+user_id+"'                                                                                                                                       ";
			    merge += "\n         when not matched then                                                                                                                                                        ";
			    merge += "\n             insert                                                                                                                                                                   ";
			    merge += "\n             (JCT.PLANT, JCT.PLANT_NM, JCT.LINE_ID, JCT.LINE_NM, JCT.PROC_ID, JCT.PROC_NM, JCT.FROM_GROUP, JCT.FROM_GROUP_NM, JCT.TO_GROUP, JCT.TO_GROUP_NM, JCT.JC_TIME, JCT.BOX_QTY ,JCT.MADE_DTTM ,JCT.MADE_BY) ";
			    merge += "\n             values                                                                                                                                                                   ";
			    merge += "\n             (LST.PLANT, LST.PLANT_NM, LST.LINE_ID, LST.LINE_NM, LST.PROC_ID, LST.PROC_NM, LST.FROM_GROUP, LST.FROM_GROUP_NM, LST.TO_GROUP, LST.TO_GROUP_NM, LST.JC_TIME, LST.BOX_QTY ,SYSDATE ,'"+user_id+"')     ";			    
			    
			    
			    
	            System.out.println(merge);
				
                rs = databaseUtility.executeQuery(stmt, merge); 
                
                delete = "delete from JC_TIME_TEST where nvl(JC_TIME,0)=0 and nvl(BOX_QTY,0)=0";
	            System.out.println(delete);

	            rs = databaseUtility.executeQuery(stmt, delete); 
				
			
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