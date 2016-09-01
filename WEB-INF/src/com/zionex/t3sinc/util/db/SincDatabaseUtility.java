/*
 * Created on 2004. 6. 22.
 *
 * Copyright 1999-2004 ZIONEX, Inc. All Rights Reserved.
 * This software is the proprietary information of ZIONEX, Inc.
 * Use is subject to license terms.
 */
package com.zionex.t3sinc.util.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.dbutils.DbUtils;

import com.zionex.t3sinc.tsc.SincComponentExecutionException;
import com.zionex.t3sinc.tsc.db.dbaccess.DatabaseSetterImpl;
import com.zionex.t3sinc.tsc.db.query.QueryInformation;
import com.zionex.t3sinc.tsc.db.query.QueryInterface;
import com.zionex.t3sinc.tsc.db.query.organizer.QueryOrganizerImplSelect;
import com.zionex.t3sinc.tsc.db.query.organizer.QueryOrganizerImplUpdate;
import com.zionex.t3sinc.tsc.db.query.organizer.QueryOrganizerInterface;

/**
 * @version 1.0
 * @author blueist
 * @since JDK 1.4
 */
public class SincDatabaseUtility implements SincDatabaseInterface {

	/**
	 *  
	 */
	public SincDatabaseUtility() {
		super();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#getConnection(java.lang.String)
	 */
	public Connection getConnection(String datasource) throws SQLException {
		Connection connection = null;
		DataSource datasourceObject = (new DatabaseSetterImpl())
				.setupDataSource(datasource).getDatasource();
		if (datasourceObject != null) {
			connection = datasourceObject.getConnection();
		}
		return connection;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#getQueryString(java.lang.String,
	 *      java.util.Map)
	 */
	public String getQueryString(String queryID, Map queryParameter)
			throws SQLException {
		String queryString = "";
		QueryOrganizerInterface queryOrgernizer = new QueryOrganizerImplUpdate();
		List queryList = getOrganizedQueryList(queryOrgernizer, queryID,
				queryParameter);
		if (queryList != null && queryList.size() > 0) {
			queryString = ((QueryInterface) queryList.get(0)).getQuery();
		}

		return queryString;
	}

	//	public void testQuery(Statement statement, String sqlKey, Map
	// queryItemMap) {
	//		QueryOrganizerInterface queryOrgernizer = new QueryOrganizerImplUpdate();
	//		List queryList = getOrganizedQueryList(queryOrgernizer, sqlKey,
	//				queryItemMap);
	//		for (Iterator iteratorQuery = queryList.iterator(); iteratorQuery
	//				.hasNext();) {
	//			System.out.println(((QueryInterface) iteratorQuery.next())
	//					.getQuery());
	//		}
	//
	//	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#executeQuery(java.lang.String,
	 *      java.lang.String)
	 */
	public ResultSet executeQuery(Statement statement, String sqlString)
			throws SQLException {
		return statement.executeQuery(sqlString);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#executeQuery(java.lang.String,
	 *      java.lang.String, java.util.Map)
	 */
	public ResultSet executeQuery(Statement statement, String sqlKey,
			Map queryItemMap) throws SQLException {
		ResultSet resultSet = null;
		QueryOrganizerInterface queryOrgernizer = new QueryOrganizerImplSelect();

		List queryList = getOrganizedQueryList(queryOrgernizer, sqlKey,
				queryItemMap);

		if (queryList != null && queryList.size() > 0) {
			QueryInterface queryInterface = (QueryInterface) queryList.get(0);
			resultSet = statement.executeQuery(queryInterface.getQuery());
		}
		return resultSet;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#executeUpdate(java.lang.String,
	 *      java.lang.String)
	 */
	public int executeUpdate(Statement statement, String sqlString)
			throws SQLException {
		return statement.executeUpdate(sqlString);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#executeUpdate(java.lang.String,
	 *      java.lang.String, java.util.Map)
	 */
	public int executeUpdate(Statement statement, String sqlKey,
			Map queryItemMap) throws SQLException {
		int result = 0;
		QueryOrganizerInterface queryOrgernizer = new QueryOrganizerImplUpdate();

		List queryList = getOrganizedQueryList(queryOrgernizer, sqlKey,
				queryItemMap);
		if (queryList != null && queryList.size() > 0) {
			if (queryList.size() == 1) {
				QueryInterface queryInterface = (QueryInterface) queryList
						.get(0);
				result = statement.executeUpdate(queryInterface.getQuery());
			} else {
				List queryStringList = new ArrayList();
				for (int i = 0, s = queryList.size(); i < s; i++) {
					queryStringList.add(((QueryInterface) queryList.get(i))
							.getQuery());
				}
				result = executeBatch(statement, queryStringList)[0];
			}
		}
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#executeBatch(java.lang.String,
	 *      java.util.List)
	 */
	public int[] executeBatch(Statement statement, List sqlStrings)
			throws SQLException {
		for (Iterator iterator = sqlStrings.iterator(); iterator.hasNext();) {
			statement.addBatch(iterator.next().toString());
		}
		return statement.executeBatch();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#executeBatch(java.lang.String,
	 *      java.util.List, java.util.Map)
	 */
	public int[] executeBatch(Statement statement, List sqlKeys,
			Map queryItemMap) throws SQLException {
		QueryOrganizerInterface queryOrgernizer = new QueryOrganizerImplUpdate();
		List queryList = getOrganizedQueryList(queryOrgernizer, sqlKeys,
				queryItemMap);
		for (Iterator iteratorQuery = queryList.iterator(); iteratorQuery
				.hasNext();) {
			statement.addBatch(((QueryInterface) iteratorQuery.next())
					.getQuery());
		}
		return statement.executeBatch();
	}

	private List getOrganizedQueryList(QueryOrganizerInterface queryOrgernizer,
			List sqlKeys, Map queryItemMap) {

		List queryList = new ArrayList();

		for (Iterator iteratorKey = sqlKeys.iterator(); iteratorKey.hasNext();) {
			queryList.addAll(getOrganizedQueryList(queryOrgernizer, iteratorKey
					.next().toString(), queryItemMap));
		}
		return queryList;
	}

	private List getOrganizedQueryList(QueryOrganizerInterface queryOrgernizer,
			String sqlKey, Map queryItemMap) {
		List result = new ArrayList();

		QueryInformation queryInformation;
		queryInformation = new QueryInformation(sqlKey, "");
		try {
			result.addAll(queryOrgernizer.getQuery(queryInformation,
					queryItemMap));
		} catch (SincComponentExecutionException e) {
			e.printStackTrace();
		}
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#close(java.sql.Statement)
	 */

	public void close(Statement statement) {
		DbUtils.closeQuietly(statement);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#close(java.sql.Connection)
	 */
	public void close(Connection connection) {
		DbUtils.closeQuietly(connection);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#close(java.sql.ResultSet)
	 */
	public void close(ResultSet resultSet) {
		DbUtils.closeQuietly(resultSet);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#close(java.sql.Connection,
	 *      java.sql.Statement)
	 */
	public void close(Connection connection, Statement statement) {
		this.close(statement);
		this.close(connection);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.zionex.t3sinc.util.db.SincDatabaseInterface#close(java.sql.Connection,
	 *      java.sql.Statement, java.sql.ResultSet)
	 */
	public void close(Connection connection, Statement statement,
			ResultSet resultSet) {
		DbUtils.closeQuietly(connection, statement, resultSet);
	}

}