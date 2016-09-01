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
public class sc_16010_dailyWorkTotalization_list01 extends HttpServlet {

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

		String job_id = "sc_16010_dailyWorkTotalization_list01";
		
		GridData gdRes = new GridData();		
		int colID = 0;
		String colIDs = "";
		
		try {
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
			
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			//String p_plant_name = gdReq.getParam("plant_name");
			String p_plant_id = gdReq.getParam("plant_id");
			String p_sDate = gdReq.getParam("sdate").replace("-", "");
			String p_eDate = gdReq.getParam("edate").replace("-", "");
			int p_weekCnt = Integer.parseInt(gdReq.getParam("weekCnt"));
			
			String s_delete = "";
			String s_insert = "";
			String s_query  = "";
			
            //조회조건 저장 공통//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			s_delete = "\n delete from GRID_SEARCH_PARAM where JOB_ID='"+job_id+"' ";
			System.out.println(s_delete);
			rs = databaseUtility.executeQuery(stmt, s_delete);

			s_insert = "\n insert into GRID_SEARCH_PARAM ( JOB_ID ,GRID_SEQ ,PARAM01 ,PARAM02 ,PARAM03 ,PARAM04) ";
            s_insert+= "\n select '"+job_id+"' ,1,'"+p_plant_id+"','"+p_sDate+"','"+p_eDate+"','"+p_weekCnt+"' from DUAL ";
			System.out.println(s_insert);
			rs = databaseUtility.executeQuery(stmt, s_insert);
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
			
			s_query +="\n select LST.PLANT_ID  ,PNT.PLANT_NAME                                                                                                                     ";
			s_query +="\n       ,LST.LINE_ID   ,LIN.LINE_NAME                                                                                                                      ";
			s_query +="\n       ,LST.WORK_TYPE||'교대' as WORK_TYPE                                                                                                                ";
			
			
			for( int i = 1 ; i <= p_weekCnt ; i++ ){
				s_query +="\n        --"+i+"주차-----------------------------------------------------------------------------------------------                                            ";

				for( int j=1 ;j<=7 ;j++) //월~일요일을 반복한다.
				{
					colID = ((i-1)*7)+j;
					if( colID < 10) colIDs="0"+colID ; else colIDs="" +colID;
					s_query +="\n       ,nvl(to_char(max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE=1 then LST.SHIFT_QTY end ),'FM999,999,999'),' ') as D"+colIDs+"A           ";
					s_query +="\n       ,nvl(to_char(max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE=3 then LST.SHIFT_QTY end ),'FM999,999,999'),' ') as D"+colIDs+"B           ";
					s_query +="\n       ,nvl(to_char(max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE=5 then LST.SHIFT_QTY end ),'FM999,999,999'),' ') as D"+colIDs+"C           ";

				}
				
				s_query +="\n       ,to_char(max(case when LST.WEEK_RANK="+i+" then LST.IDX_QTY else 0 end),'FM999,999,999')                            as IDX_QTY"+i+"     --기준물량 ";
				s_query +="\n       ,decode( max(case when LST.WEEK_RANK="+i+" then LST.PROD_METHOD end),1,'●',NULL)                                   as NORMAL"+i+"      --정상              ";
				s_query +="\n       ,decode( max(case when LST.WEEK_RANK="+i+" then case when LST.PROD_METHOD=2 then 2 end end),2,'●',NULL)                                   as EXTENSION"+i+"   --연장              ";
				s_query +="\n       ,decode( max(case when LST.WEEK_RANK="+i+" then case when LST.PROD_METHOD=3 then 3 end end),3,'●',NULL)                                   as DAY_OFF"+i+"     --휴동              ";

			for( int j=1 ;j<=7 ;j++) //월~일요일을 반복한다.
			{
				colID = ((i-1)*7)+j;
				if( colID < 10) colIDs="0"+colID ; else colIDs="" +colID;
					if(j==7)
					{
						s_query +="\n       ,max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE = '1' then NULL end )                      as DI"+colIDs+"A                           ";
						s_query +="\n       ,max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE = '3' then NULL end )                      as DI"+colIDs+"B                           ";
						s_query +="\n       ,max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE = '5' then NULL end )                      as DI"+colIDs+"C                           ";
					} else {
						s_query +="\n       ,max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE = '1' then LST.PROD_METHOD else NULL end ) as DI"+colIDs+"A                           ";
						s_query +="\n       ,max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE = '3' then LST.PROD_METHOD else NULL end ) as DI"+colIDs+"B                           ";
						s_query +="\n       ,max(case when LST.WEEK_RANK="+i+" and LST.DAY_RANK="+j+" and LST.SHIFT_TYPE = '5' then LST.PROD_METHOD else NULL end ) as DI"+colIDs+"C                           ";
					}
			}
			
			s_query +="\n        ------------------------------------------------------------------------------------------------------                                                ";
			}			
			s_query +="\n   from v_dailyWorkTotalization01 LST                                                                                                                     ";
			s_query +="\n        left outer join V_PLANT PNT                                                                                                                       ";
			s_query +="\n        on  PNT.PLANT_ID =LST.PLANT_ID                                                                                                                    ";
			s_query +="\n        left outer join V_LINE LIN                                                                                                                        ";
			s_query +="\n        on  LIN.PLANT_ID =LST.PLANT_ID                                                                                                                    ";
			s_query +="\n        and LIN.LINE_ID  =LST.LINE_ID                                                                                                                     ";
			s_query +="\n  group by LST.PLANT_ID ,PNT.PLANT_NAME ,LST.LINE_ID ,LIN.LINE_NAME ,LST.WORK_TYPE                                                                    ";
			s_query +="\n  order by LST.PLANT_ID ,LST.LINE_ID    ";
			System.out.println(s_query);
			rs = databaseUtility.executeQuery(stmt, s_query);
			
			for( int i = 0 ; rs.next() ; i++ ) {
				gdRes.getHeader("CRUD" 		 ).addValue("", ""); //CRUD
                gdRes.getHeader("PLANT_NAME" ).addValue(rs.getString(2), rs.getString(1)); //공장/코드 
                gdRes.getHeader("LINE_NAME"  ).addValue(rs.getString(4), rs.getString(3)); //라인/코드
                gdRes.getHeader("WORK_TYPE"  ).addValue(rs.getString(5), ""); //근무형태

                int dayCnt = 1;
                int colIdx = 6;
                for( int j = 0 ; j < p_weekCnt ; j++ ){
                	
                	for( int k = 1 ; k <= 7 ; k++ ){
                		String strDay = "";
                		
                		if( dayCnt < 10 ) strDay += "0" + dayCnt;
                		else strDay += dayCnt;      		 
                		gdRes.getHeader("D" + strDay + "A").addValue(rs.getString(colIdx), rs.getString(colIdx + 25)); colIdx++;
                		gdRes.getHeader("D" + strDay + "B").addValue(rs.getString(colIdx), rs.getString(colIdx + 25)); colIdx++;
                		gdRes.getHeader("D" + strDay + "C").addValue(rs.getString(colIdx), rs.getString(colIdx + 25)); colIdx++;
                		
                		dayCnt++;
                	}
	                gdRes.getHeader("IDX_QTY"   + (j +1)).addValue(rs.getString(27 + j * 46)==null?"":rs.getString(27 + j * 46),j+"");                                                   
	                gdRes.getHeader("NORMAL"    + (j +1)).addValue(rs.getString(28 + j * 46)==null?"":rs.getString(28 + j * 46),"");                                                   
	                gdRes.getHeader("EXTENSION" + (j +1)).addValue(rs.getString(29 + j * 46)==null?"":rs.getString(29 + j * 46),"");                                                   
	                gdRes.getHeader("DAY_OFF"   + (j +1)).addValue(rs.getString(30 + j * 46)==null?"":rs.getString(30 + j * 46),"");
	                
	                colIdx += 25;
                }
                
 			}

			gdRes.addParam("mode", "search");		
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }
				
		return gdRes;
	}
	
	
	
	
	
	public GridData doQueryX(GridData gdReq) throws Exception { //사용하지 않음.
		
		GridData gdRes = new GridData();		
		int rowCount = 0;
		
		try {
			conn = databaseUtility.getConnection("t3sinc"); // DB Connection
			stmt = conn.createStatement(); // statement 객체 생성
			
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			//String p_plant_name = gdReq.getParam("plant_name");
			String p_plant_id = gdReq.getParam("plant_id");
			String p_sDate = gdReq.getParam("sdate").replace("-", "");
			String p_eDate = gdReq.getParam("edate").replace("-", "");
			int p_weekCnt = Integer.parseInt(gdReq.getParam("weekCnt"));
			
			
			
			String in_sql = "";
			in_sql += "with V_LST																																																														 \n"
			+ "  as (                                                                                                                                                                                                                                                            \n"
			+ "      select --DEFAULT 공장-라인-3주구간 데이터를 기준으로                                                                                                                                                                                                        \n"
			+ "             --근무조, SHIFT, 휴무여부를 추가한다.                                                                                                                                                                                                                \n"
			+ "             LST.PLANT_ID ,LST.LINE_ID ,LST.YYYYMMDD ,LST.YYYYWW ,LST.WEEK53_NO                                                                                                                                                                                   \n"
			+ "            ,WKD.WORK_TYPE ,WKD.SHIFT_TYPE ,WKD.DAY_OFF                                                                                                                                                                                                           \n"
			+ "        from (                                                                                                                                                                                                                                                    \n"
			+ "              select LST.PLANT_ID ,LST.LINE_ID ,CAL.YYYYMMDD ,CAL.YYYYWW                                                                                                                                                                                          \n"
			+ "                    ,decode(CAL.WEEK_DAY,'월',1,'화',2,'수',3,'목',4,'금',5,'토',6,'일',7) as WEEK53_NO                                                                                                                                                           \n"
			+ "                from (                                                                                                                                                                                                                                            \n"
			+ "                      select /*+ INDEX(LST SCH_OPER_RANK_PK) */                                                                                                                                                                                                   \n"
			+ "                             distinct PLANT_ID ,LINE_ID                                                                                                                                                                                                           \n"
			+ "                        from SCH_OPER_RANK LST                                                                                                                                                                                                                    \n"
			+ "                       where PLANT_ID != 'X'                                                                                                                                                                                                                      \n"
			+ "                         and ITEM_ID  <> 'X'                                                                                                                                                                                                                      \n"
			+ "                         and PROD_VER <> 'X'                                                                                                                                                                                                                      \n"
			+ "                         and OPER_RANK=MAX_RANK                                                                                                                                                                                                                   \n"
			+ "                     )LST                                                                                                                                                                                                                                         \n"
			+ "                     inner join                                                                                                                                                                                                                                   \n"
			+ "                     (                                                                                                                                                                                                                                            \n"
			+ "                       -------------------------------------------                                                                                                                                                                                                \n"
			+ "                       --날짜구간을 가져온다.                                                                                                                                                                                                                     \n"
			+ "                       select CAL.YYYYMMDD ,CAL.YYYYWW ,CAL.WEEK_DAY                                                                                                                                                                                              \n"
			+ "                         from CAL_MST CAL                                                                                                                                                                                                                         \n"
			+ "                         inner join                                                                                                                                                                                                                               \n"
			+ "                         (                                                                                                                                                                                                                                        \n"
			+ "                           select --조회범위가 4주를 벗어나면 시작일 기준 4주로 조회한다.                                                                                                                                                                         \n"
			+ "                                  SDATE                                                                                                                                                                                                                           \n"
			+ "                                 ,case when to_date(EDATE,'YYYYMMDD')-to_date(SDATE,'YYYYMMDD') <= 27 then EDATE                                                                                                                                                  \n"
			+ "                                       else to_char(to_date(SDATE,'YYYYMMDD')+27,'YYYYMMDD') end as EDATE                                                                                                                                                         \n"
			+ "                             from (                                                                                                                                                                                                                               \n"
			+ "                                    select --시작일자의 월요일, 종료일자의 일요일을 가져온다.                                                                                                                                                                     \n"
			+ "                                           min(CAL.YYYYMMDD) as SDATE ,max(CAL.YYYYMMDD) as EDATE                                                                                                                                                                 \n"
			+ "                                      from CAL_MST CAL                                                                                                                                                                                                            \n"
			+ "                                           inner join                                                                                                                                                                                                             \n"
			+ "                                           (                                                                                                                                                                                                                      \n"
			+ "                                            select min(YYYYWW) as SWEEK ,max(YYYYWW) as EWEEK                                                                                                                                                                     \n"
			+ "                                              from CAL_MST CAL                                                                                                                                                                                                    \n"
			+ "                                             where YYYYMMDD ='" + p_sDate + "'                                                                                                                                                                                           \n"
			+ "                                                or YYYYMMDD ='" + p_eDate + "'                                                                                                                                                                                           \n"
			+ "                                           ) IDX                                                                                                                                                                                                                  \n"
			+ "                                           on  CAL.YYYYWW between IDX.SWEEK and IDX.EWEEK                                                                                                                                                                         \n"
			+ "                                  )                                                                                                                                                                                                                               \n"
			+ "                         ) IDX                                                                                                                                                                                                                                    \n"
			+ "                         on  CAL.YYYYMMDD between IDX.SDATE and IDX.EDATE                                                                                                                                                                                         \n"
			+ "                     ) CAL                                                                                                                                                                                                                                        \n"
			+ "                     on  1=1                                                                                                                                                                                                                                      \n"
			+ "             ) LST                                                                                                                                                                                                                                                \n"
			+ "             left outer join                                                                                                                                                                                                                                      \n"
			+ "             (                                                                                                                                                                                                                                                    \n"
			+ "              select --조운영정보에서 WORK_TYPE(근무조), SHIFT, DAY_OFF(휴무여부)를 가져온다.                                                                                                                                                                     \n"
			+ "                     distinct LST.PLANT_ID ,LST.LINE_ID                                                                                                                                                                                                           \n"
			+ "                    ,max(case when CAL.WEEK_DAY='화' then LST.WORK_TYPE end) over( partition by LST.PLANT_ID ,LST.LINE_ID ,LST.PROC_ID ,CAL.YYYYWW order by 1) as WORK_TYPE --조운영에서는 일요일~월요일로 관리되므로 화요일을 기준으로 교대근무는 화요일로 한다. \n"
			+ "                    ,LST.DUTY_DATE ,LST.SHIFT_TYPE                                                                                                                                                                                                                \n"
			+ "                    ,FN_GET_DAY_OFF_YN(LST.PLANT_ID ,LST.LINE_ID ,LST.PROC_ID ,LST.DUTY_DATE , LST.SHIFT_TYPE ,LST.START_TIME ,LST.END_TIME) as DAY_OFF                                                                                                           \n"
			+ "                from (                                                                                                                                                                                                                                            \n"
			+ "                      select  --IF받은 조운영 정보를 생성한다.                                                                                                                                                                                                    \n"
			+ "                              HRC.PLANT_ID ,HRC.LINE_ID ,HRC.PROC_ID                                                                                                                                                                                              \n"
			+ "                             ,substr(WD1.WORKTY_ID,1,1) WORK_TYPE                                                                                                                                                                                                 \n"
			+ "                             ,WD1.DUTY_DATE                                                                                                                                                                                                                       \n"
			+ "                             ,decode(substr(WD1.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5') as SHIFT_TYPE                                                                                                                          \n"
			+ "                             ,WD1.START_TIME ,WD1.END_TIME                                                                                                                                                                                                        \n"
			+ "                      from    WORK_DIARY WD1                                                                                                                                                                                                                      \n"
			+ "                             ,V_HRCHY_PROC HRC                                                                                                                                                                                                                    \n"
			+ "                             ,(                                                                                                                                                                                                                                   \n"
			+ "                               select --조회범위가 4주를 벗어나면 시작일 기준 4주로 조회한다.                                                                                                                                                                     \n"
			+ "                                      SDATE                                                                                                                                                                                                                       \n"
			+ "                                     ,case when to_date(EDATE,'YYYYMMDD')-to_date(SDATE,'YYYYMMDD') <= 27 then EDATE                                                                                                                                              \n"
			+ "                                           else to_char(to_date(SDATE,'YYYYMMDD')+27,'YYYYMMDD') end as EDATE                                                                                                                                                     \n"
			+ "                                 from (                                                                                                                                                                                                                           \n"
			+ "                                        select --시작일자의 월요일, 종료일자의 일요일을 가져온다.                                                                                                                                                                 \n"
			+ "                                               min(CAL.YYYYMMDD) as SDATE ,max(CAL.YYYYMMDD) as EDATE                                                                                                                                                             \n"
			+ "                                          from CAL_MST CAL                                                                                                                                                                                                        \n"
			+ "                                               inner join                                                                                                                                                                                                         \n"
			+ "                                               (                                                                                                                                                                                                                  \n"
			+ "                                                select min(YYYYWW) as SWEEK ,max(YYYYWW) as EWEEK                                                                                                                                                                 \n"
			+ "                                                  from CAL_MST CAL                                                                                                                                                                                                \n"
			+ "                                                 where YYYYMMDD ='" + p_sDate + "'                                                                                                                                                                                       \n"
			+ "                                                    or YYYYMMDD ='" + p_eDate + "'                                                                                                                                                                                       \n"
			+ "                                               ) IDX                                                                                                                                                                                                              \n"
			+ "                                               on  CAL.YYYYWW between IDX.SWEEK and IDX.EWEEK                                                                                                                                                                     \n"
			+ "                                      )                                                                                                                                                                                                                           \n"
			+ "                              ) IDX                                                                                                                                                                                                                               \n"
			+ "                      where   WD1.PLANT_ID  like '%'                                                                                                                                                                                                              \n"
			+ "                      and     WD1.DUTY_DATE between IDX.SDATE and IDX.EDATE                                                                                                                                                                                       \n"
			+ "                      and     HRC.PLANT_ID  = WD1.PLANT_ID                                                                                                                                                                                                        \n"
			+ "                      and     HRC.PROC_ID   = WD1.PROC_ID                                                                                                                                                                                                         \n"
			+ "                      and     HRC.LINE_ID   like '%'                                                                                                                                                                                                              \n"
			+ "                      and     HRC.CAT       = '포장'                                                                                                                                                                                                              \n"
			+ "                      and     not exists                                                                                                                                                                                                                          \n"
			+ "                              (                                                                                                                                                                                                                                   \n"
			+ "                               select  X.PLANT_ID                                                                                                                                                                                                                 \n"
			+ "                               from    WORK_DIARY_ADJ X                                                                                                                                                                                                           \n"
			+ "                               where   X.PLANT_ID  = WD1.PLANT_ID                                                                                                                                                                                                 \n"
			+ "                               and     X.DUTY_DATE = WD1.DUTY_DATE                                                                                                                                                                                                \n"
			+ "                               and     X.PROC_ID   = WD1.PROC_ID                                                                                                                                                                                                  \n"
			+ "                              )                                                                                                                                                                                                                                   \n"
			+ "                      AND     exists                                                                                                                                                                                                                              \n"
			+ "                              (                                                                                                                                                                                                                                   \n"
			+ "                               select  /*+INDEX(LST SCH_OPER_RANK_PK)*/                                                                                                                                                                                           \n"
			+ "                                       X.ITEM_ID                                                                                                                                                                                                                  \n"
			+ "                               from    SCH_OPER_RANK X                                                                                                                                                                                                            \n"
			+ "                               where   X.PLANT_ID  = WD1.PLANT_ID                                                                                                                                                                                                 \n"
			+ "                               and     X.LINE_ID   = HRC.LINE_ID                                                                                                                                                                                                  \n"
			+ "                               and     X.PROC_ID   = WD1.PROC_ID                                                                                                                                                                                                  \n"
			+ "                               and     X.OPER_RANK = X.MAX_RANK                                                                                                                                                                                                   \n"
			+ "                              )                                                                                                                                                                                                                                   \n"
			+ "                      union all                                                                                                                                                                                                                                   \n"
			+ "                      select  --변경된 조운영 정보 리스트를 생성한다.                                                                                                                                                                                             \n"
			+ "                              HRC.PLANT_ID ,HRC.LINE_ID ,HRC.PROC_ID                                                                                                                                                                                              \n"
			+ "                             ,substr(WD2.WORKTY_ID,1,1) WORK_TYPE                                                                                                                                                                                                 \n"
			+ "                             ,WD2.DUTY_DATE                                                                                                                                                                                                                       \n"
			+ "                             ,decode(substr(WD2.SHIFT_ID,1,3),'JOG','1','OTD','1','DAY','3','NIG','5','OTJ','1','OTN','5') as SHIFT_TYPE                                                                                                                          \n"
			+ "                             ,WD2.START_TIME ,WD2.END_TIME                                                                                                                                                                                                        \n"
			+ "                      FROM    WORK_DIARY_ADJ WD2,                                                                                                                                                                                                                 \n"
			+ "                              V_HRCHY_PROC HRC                                                                                                                                                                                                                    \n"
			+ "                             ,(                                                                                                                                                                                                                                   \n"
			+ "                               select --조회범위가 4주를 벗어나면 시작일 기준 4주로 조회한다.                                                                                                                                                                     \n"
			+ "                                      SDATE                                                                                                                                                                                                                       \n"
			+ "                                     ,case when to_date(EDATE,'YYYYMMDD')-to_date(SDATE,'YYYYMMDD') <= 27 then EDATE                                                                                                                                              \n"
			+ "                                           else to_char(to_date(SDATE,'YYYYMMDD')+27,'YYYYMMDD') end as EDATE                                                                                                                                                     \n"
			+ "                                 from (                                                                                                                                                                                                                           \n"
			+ "                                        select --시작일자의 월요일, 종료일자의 일요일을 가져온다.                                                                                                                                                                 \n"
			+ "                                               min(CAL.YYYYMMDD) as SDATE ,max(CAL.YYYYMMDD) as EDATE                                                                                                                                                             \n"
			+ "                                          from CAL_MST CAL                                                                                                                                                                                                        \n"
			+ "                                               inner join                                                                                                                                                                                                         \n"
			+ "                                               (                                                                                                                                                                                                                  \n"
			+ "                                                select min(YYYYWW) as SWEEK ,max(YYYYWW) as EWEEK                                                                                                                                                                 \n"
			+ "                                                  from CAL_MST CAL                                                                                                                                                                                                \n"
			+ "                                                 where YYYYMMDD ='" + p_sDate + "'                                                                                                                                                                                       \n"
			+ "                                                    or YYYYMMDD ='" + p_eDate + "'                                                                                                                                                                                       \n"
			+ "                                               ) IDX                                                                                                                                                                                                              \n"
			+ "                                               on  CAL.YYYYWW between IDX.SWEEK and IDX.EWEEK                                                                                                                                                                     \n"
			+ "                                      )                                                                                                                                                                                                                           \n"
			+ "                              ) IDX                                                                                                                                                                                                                               \n"
			+ "                      WHERE   WD2.PLANT_ID  like '%'                                                                                                                                                                                                              \n"
			+ "                      and     WD2.DUTY_DATE between IDX.SDATE and IDX.EDATE                                                                                                                                                                                       \n"
			+ "                      AND     HRC.PLANT_ID  = WD2.PLANT_ID                                                                                                                                                                                                        \n"
			+ "                      AND     HRC.PROC_ID   = WD2.PROC_ID                                                                                                                                                                                                         \n"
			+ "                      AND     HRC.LINE_ID   like '%'                                                                                                                                                                                                              \n"
			+ "                      AND     HRC.CAT       = '포장'                                                                                                                                                                                                              \n"
			+ "                      AND     EXISTS                                                                                                                                                                                                                              \n"
			+ "                              (                                                                                                                                                                                                                                   \n"
			+ "                               SELECT  /*+INDEX(LST SCH_OPER_RANK_PK)*/                                                                                                                                                                                           \n"
			+ "                                       X.ITEM_ID                                                                                                                                                                                                                  \n"
			+ "                               FROM    SCH_OPER_RANK X                                                                                                                                                                                                            \n"
			+ "                               WHERE   X.PLANT_ID  = WD2.PLANT_ID                                                                                                                                                                                                 \n"
			+ "                               AND     X.LINE_ID   = HRC.LINE_ID                                                                                                                                                                                                  \n"
			+ "                               AND     X.PROC_ID   = WD2.PROC_ID                                                                                                                                                                                                  \n"
			+ "                               AND     X.OPER_RANK = X.MAX_RANK                                                                                                                                                                                                   \n"
			+ "                              )                                                                                                                                                                                                                                   \n"
			+ "                     ) LST                                                                                                                                                                                                                                        \n"
			+ "                     left outer join CAL_MST CAL                                                                                                                                                                                                                  \n"
			+ "                     on  CAL.YYYYMMDD = LST.DUTY_DATE                                                                                                                                                                                                             \n"
			+ "             ) WKD                                                                                                                                                                                                                                                \n"
			+ "             on  WKD.PLANT_ID =LST.PLANT_ID                                                                                                                                                                                                                       \n"
			+ "             and WKD.LINE_ID  =LST.LINE_ID                                                                                                                                                                                                                        \n"
			+ "             and WKD.DUTY_DATE=LST.YYYYMMDD                                                                                                                                                                                                                       \n"
			+ "     )                                                                                                                                                                                                                                                            \n"
			+ "     select *                                                                                                                                                                                                                                                     \n"
			+ "       from (                                                                                                                                                                                                                                                     \n"
			+ "             select LST.PLANT_ID ,LST.LINE_ID ,LST.YYYYWW as WEEK53_NO ,LST.YYYYMMDD as PROD_DATES ,LST.WORK_TYPE ,LST.SHIFT_TYPE ,LST.SHIFT_QTY ,LST.IDX_QTY ,LST.DAY_OFF                                                                                        \n"
			+ "                   ,case                                                                                                                                                                                                                                          \n"
			+ "                         when LST.DAY_OFF||LST.SHIFT_QTY ='N0' then 3 --휴동기준  : 월~금요일사이에 휴무에 포함되지 않고, 물량기준이 있는데 계획수량이 0인것.                                                                                                     \n"
			+ "                         when LST.SHIFT_QTY>LST.IDX_QTY then        2 --연장기준  : SHIFT계획수량 >  기준물량                                                                                                                                                     \n"
			+ "                         else                                       1 --정상기준3 : 기준수량이 0인것                                                                                                                                                              \n"
			+ "                     end as PROD_METHOD                                                                                                                                                                                                                           \n"
			+ "               from (                                                                                                                                                                                                                                             \n"
			+ "                     select LST.PLANT_ID ,LST.LINE_ID ,LST.YYYYWW ,LST.YYYYMMDD ,LST.WEEK53_NO,LST.WORK_TYPE ,LST.SHIFT_TYPE                                                                                                                                      \n"
			+ "                           ,nvl(FN_GET_SHIFT_QTY(LST.PLANT_ID ,LST.LINE_ID ,LST.YYYYMMDD, LST.SHIFT_TYPE),0) as SHIFT_QTY                                                                                                                                         \n"
			+ "                           ,FN_GET_SPECIFY_QUANTITY(LST.PLANT_ID ,LST.LINE_ID ,LST.YYYYWW) as IDX_QTY                                                                                                                                                             \n"
			+ "                           ,LST.DAY_OFF                                                                                                                                                                                                                           \n"
			+ "                       from V_LST LST                                                                                                                                                                                                                             \n"
			+ "                    ) LST                                                                                                                                                                                                                                         \n"
			+ "                    left outer join V_PLANT PNT                                                                                                                                                                                                                   \n"
			+ "                    on  PNT.PLANT_ID = LST.PLANT_ID                                                                                                                                                                                                               \n"
			+ "             ) LST                                                                                                                                                                                                                                                \n"
			+ "       order by PROD_DATES                                                                                                                                                                                                                                        \n";
			
			
			String out_sql = "";
			out_sql += "            SELECT  DT.PLANT_ID,                        --0 공장 코드 \n"
            + "        HR.PLANT_NAME,                      --1 공장 \n"
            + "        DT.LINE_ID,                         --2 라인 코드 \n"
            + "        HR.LINE_NAME,                       --3 라인 \n"
            + "        MAX(DT.WORK_TYPE)||'교대' AS WORK_TYPE   --5 근무형태 \n"; 
			
			for( int i = 0 ; i < p_weekCnt ; i++ ){
				out_sql 
				+="                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (0 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D01A --6          \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (0 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D01B --7          \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (0 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D01C --8          \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (1 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D02A --9          \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (1 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D02B --10         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (1 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D02C --11         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (2 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D03A --12         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (2 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D03B --13         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (2 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D03C --14         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (3 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D04A --15         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (3 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D04B --16         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (3 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D04C --17         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (4 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D05A --18         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (4 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D05B --19         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (4 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D05C --20         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (5 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D06A --21         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (5 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D06B --22         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (5 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D06C --23         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (6 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D07A --24         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (6 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D07B --25         \n"
				+ "                    ,MAX(TO_CHAR(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (6 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.SHIFT_QTY ELSE 0 END ,'999,999')) D07C --26         \n"
				+ "                    --------------------------------------------------------------------------------------------------------------------------------                         \n"
				+ "                    ,NVL(MAX(CASE WHEN DT.WEEK53_NO = WEEK.FW+" + i + " THEN DT.IDX_QTY END),'') IDX_QTY                             --27 기준물량                                           \n"
				+ "                    ,DECODE(MAX(CASE WHEN DT.WEEK53_NO = WEEK.FW+" + i + " THEN DT.PROD_METHOD END),1,'●',NULL) NORMAL      --28 정상                                               \n"
				+ "                    ,DECODE(MAX(CASE WHEN DT.WEEK53_NO = WEEK.FW+" + i + " THEN DT.PROD_METHOD END),2,'●',NULL) EXTENSION   --29 연장                                               \n"
				+ "                    ,DECODE(MAX(CASE WHEN DT.WEEK53_NO = WEEK.FW+" + i + " THEN DT.PROD_METHOD END),3,'●',NULL) DAY_OFF     --30 휴동                                               \n"
				+ "                    /* SHIFT별 정상(1),연장(2),휴동(3) 정보 */                                                                                                               \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (0 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.PROD_METHOD ELSE NULL END ) DI01A --31                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (0 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.PROD_METHOD ELSE NULL END ) DI01B --32                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (0 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.PROD_METHOD ELSE NULL END ) DI01C --33                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (1 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.PROD_METHOD ELSE NULL END ) DI02A --34                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (1 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.PROD_METHOD ELSE NULL END ) DI02B --35                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (1 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.PROD_METHOD ELSE NULL END ) DI02C --36                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (2 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.PROD_METHOD ELSE NULL END ) DI03A --37                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (2 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.PROD_METHOD ELSE NULL END ) DI03B --38                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (2 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.PROD_METHOD ELSE NULL END ) DI03C --39                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (3 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.PROD_METHOD ELSE NULL END ) DI04A --40                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (3 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.PROD_METHOD ELSE NULL END ) DI04B --41                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (3 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.PROD_METHOD ELSE NULL END ) DI04C --42                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (4 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.PROD_METHOD ELSE NULL END ) DI05A --43                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (4 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.PROD_METHOD ELSE NULL END ) DI05B --44                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (4 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.PROD_METHOD ELSE NULL END ) DI05C --45                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (5 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN DT.PROD_METHOD ELSE NULL END ) DI06A --46                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (5 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN DT.PROD_METHOD ELSE NULL END ) DI06B --47                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (5 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN DT.PROD_METHOD ELSE NULL END ) DI06C --48                      \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (6 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '1' THEN NULL END ) DI07A --49                                          \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (6 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '3' THEN NULL END ) DI07B --50                                          \n"
				+ "                    ,MAX(CASE WHEN DT.PROD_DATES = TO_CHAR(DAY.MON+" + (6 + i * 7) + ",'YYYYMMDD') AND DT.SHIFT_TYPE = '5' THEN NULL END ) DI07C --51                                          \n"
				+ "                    --------------------------------------------------------------------------------------------------------------------------------                         \n";
			}
			out_sql += "            FROM    ( \n";
			out_sql += in_sql;
			out_sql += "                    ) DT,                                                                 \n"
			+ "                    ( -- 월요일                                                           \n"
			+ "                    SELECT NEXT_DAY(to_date('" + p_sDate + "','YYYYMMDD')-7,2) MON               \n"
			+ "                    FROM   DUAL                                                           \n"
			+ "                    ) DAY,                                                                \n"
			+ "                    ( -- 주차                                                             \n"
			+ "                    SELECT  YYYYWW FW                                                     \n"
			+ "                    FROM    CAL_MST                                                       \n"
			+ "                    WHERE   CAL_DATE = NEXT_DAY(to_date('" + p_sDate + "','YYYYMMDD')-7,2)       \n"
			+ "                    ) WEEK,                                                               \n"
			+ "                    (                                                                     \n"
			+ "                    /* 공장, 라인 리스트*/                                                \n"
			+ "                    SELECT  DISTINCT                                                      \n"
			+ "                            PLANT_ID, PLANT_NAME, LINE_ID, LINE_NAME                      \n"
			+ "                    FROM    V_HRCHY_PROC                                                  \n"
			+ "                    ) HR                                                                  \n"
			+ "            WHERE   DT.PLANT_ID  = HR.PLANT_ID                                            \n"
			+ "            AND     DT.LINE_ID   = HR.LINE_ID                                             \n"
			+ "            AND     DT.PLANT_ID LIKE '" + p_plant_id + "%'                                              \n"
			+ "            GROUP   BY DT.PLANT_ID, HR.PLANT_NAME, DT.LINE_ID, HR.LINE_NAME               \n"
			+ "            ORDER   BY DT.PLANT_ID, DT.LINE_ID                    						\n";
			
			System.out.println(out_sql);
			
			rs = databaseUtility.executeQuery(stmt, out_sql);
									
			//rowCount = "";
			

			// 
//			if (rowCount == 0) {
//				gdRes.addParam("mode", "search");	
//				gdRes.setMessage("...");
//				gdRes.setStatus("true");
//				return gdRes;
//			}
			//ArrayList<ArrayList<String>> qResult = rs.
			//System.out.println("weekCnt : " + p_weekCnt);
			
			for( int i = 0 ; rs.next() ; i++ ) {
				
				gdRes.getHeader("CRUD" 		 ).addValue("", ""); //CRUD
                gdRes.getHeader("PLANT_NAME" ).addValue(rs.getString(2), rs.getString(1)); //공장/코드 
                gdRes.getHeader("LINE_NAME"  ).addValue(rs.getString(4), rs.getString(3)); //라인/코드
                gdRes.getHeader("WORK_TYPE"  ).addValue(rs.getString(5), ""); //근무형태
                
                //------------------------------------------------------------------------------------//
                int dayCnt = 1;
                int colIdx = 6;
                for( int j = 0 ; j < p_weekCnt ; j++ ){
                	
                	for( int k = 1 ; k <= 7 ; k++ ){
                		String strDay = "";
                		
                		if( dayCnt < 10 ) strDay += "0" + dayCnt;
                		else strDay += dayCnt;      		 
                		//System.out.println(strDay);
                		//System.out.println(colIdx + ", " + (colIdx+25));
                		gdRes.getHeader("D" + strDay + "A").addValue(rs.getString(colIdx), rs.getString(colIdx + 25)); colIdx++;
                		gdRes.getHeader("D" + strDay + "B").addValue(rs.getString(colIdx), rs.getString(colIdx + 25)); colIdx++;
                		gdRes.getHeader("D" + strDay + "C").addValue(rs.getString(colIdx), rs.getString(colIdx + 25)); colIdx++;
                		
                		dayCnt++;
                	}
                                   
	                //System.out.println(rs.getString(28 + j * 46));                                                                                      
	                gdRes.getHeader("IDX_QTY"   + (j +1)).addValue(rs.getString(27 + j * 46)==null?"":rs.getString(27 + j * 46),j+"");                                                   
	                gdRes.getHeader("NORMAL"    + (j +1)).addValue(rs.getString(28 + j * 46)==null?"":rs.getString(28 + j * 46),"");                                                   
	                gdRes.getHeader("EXTENSION" + (j +1)).addValue(rs.getString(29 + j * 46)==null?"":rs.getString(29 + j * 46),"");                                                   
	                gdRes.getHeader("DAY_OFF"   + (j +1)).addValue(rs.getString(30 + j * 46)==null?"":rs.getString(30 + j * 46),"");
	                
	                colIdx += 25;
                }
                
 			}

			gdRes.addParam("mode", "search");		
			gdRes.setMessage("");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}finally {
            databaseUtility.close(conn, stmt, rs);              
        }
				
		return gdRes;
	}

	
	
	// 저장
	public GridData doSave(GridData gdReq) throws Exception {

		System.out.println("doSave() start!!!");

		conn = databaseUtility.getConnection("t3sinc"); // DB Connection
		stmt = conn.createStatement(); // statement 객체 생성

		GridData gdRes = new GridData(); // WiseGrid 객체생성

		int rowCount = 0; // CRUD 컬럼 row 수
		
		System.out.println("Total Row Count : " + gdReq.getHeader("PLANT_NAME").getRowCount());

		try {

			// 화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			
			if(rowCount == 0) {
				gdRes.addParam("mode", "save");
				gdRes.setMessage("성공적으로 작업하였습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			System.out.println("CRUD Row Count : " + rowCount);
			
			String sql = "";
			sql += "MERGE   INTO SHIFT_SPECIFY_QUANTITY SS \n"
				+  "USING   ( \n"
				+  "        SELECT  A.CAT_ID, A.PLANT_ID, A.LINE_ID, B.SWEEK + A.WEEK_SEQ WEEK53, A.SHIFT_QTY, A.MADE_DTTM, A.MADE_BY \n"
				+  "        FROM    ( \n";
			
			String made_by = gdReq.getParam("user_id");
			int p_weekCnt = Integer.parseInt(gdReq.getParam("weekCnt"));
			String p_sDate = gdReq.getParam("sdate").replace("-", "");
			
			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				
				String plant_id = gdReq.getHeader("PLANT_NAME").getHiddenValue(i);//공장코드
				String line_id = gdReq.getHeader("LINE_NAME").getHiddenValue(i);  //라인코드
				//String week53 = gdReq.getHeader("WORK_TYPE").getHiddenValue(i);	  //주차
				
				if( i > 0){
					sql += " UNION ALL \n"; 
				}
				
				for ( int j = 0 ; j < p_weekCnt ; j++ ){
					if( j > 0){
						sql += " UNION ALL \n"; 
					}					
					String shift_qty = gdReq.getHeader("IDX_QTY" + (j+1)).getValue(i);	  //기준 물량
					String week_seq = gdReq.getHeader("IDX_QTY" + (j+1)).getHiddenValue(i); // 주차 시퀀스
									
					sql += "		SELECT  'PS' CAT_ID, '" + plant_id + "' PLANT_ID, '" + line_id + "' LINE_ID, '" + week_seq + "' WEEK_SEQ, replace('" + shift_qty + "',',','') SHIFT_QTY, SYSDATE MADE_DTTM, '" + made_by + "' MADE_BY FROM DUAL ";
				}
								
			}
			
			sql +=  "                ) A,                            \n" 
				+ "                (                               \n" 
				+ "                SELECT  MIN(YYYYWW) AS SWEEK    \n" 
				+ "                FROM    CAL_MST CAL             \n" 
				+ "                WHERE   YYYYMMDD ='" + p_sDate + "'    \n" 
				+ "                ) B                             \n"
				+ "        ) TMP \n"
				+ "        ON      ( \n"
				+ "                    SS.CAT_ID   = TMP.CAT_ID \n"
				+ "                AND SS.PLANT_ID = TMP.PLANT_ID \n"
				+ "                AND SS.LINE_ID  = TMP.LINE_ID \n"
				+ "                AND SS.WEEK53   = TMP.WEEK53 \n"
				+ "                ) \n"
				+ "                WHEN MATCHED THEN \n"
				+ "                  UPDATE \n"
				+ "                  SET    SS.SHIFT_QTY = TMP.SHIFT_QTY \n"
				+ "                        ,SS.MADE_DTTM = TMP.MADE_DTTM \n"
				+ "                        ,SS.MADE_BY   = TMP.MADE_BY \n"
				+ "                WHEN NOT MATCHED THEN \n"
				+ "                INSERT \n"
				+ "                ( \n"
				+ "                 CAT_ID, PLANT_ID, LINE_ID, WEEK53, SHIFT_QTY, MADE_DTTM, MADE_BY \n"
				+ "                ) VALUES \n"
				+ "                ( \n"
				+ "                 TMP.CAT_ID, TMP.PLANT_ID, TMP.LINE_ID, TMP.WEEK53, TMP.SHIFT_QTY, TMP.MADE_DTTM, TMP.MADE_BY \n"
				+ "                ) ";		
			
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

		} catch (Exception e) {
			throw e;
		}  finally {
            databaseUtility.close(conn, stmt, rs);              
        }

		System.out.println("doSave() end!!!");

		return gdRes;
	}	
	
}
