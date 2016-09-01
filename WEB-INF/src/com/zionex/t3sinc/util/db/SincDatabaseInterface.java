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
import java.util.List;
import java.util.Map;

/**
 * The object used for database operation with site-customized development.
 * 
 * @version 1.0
 * @author blueist
 * @since JDK 1.4
 */
public interface SincDatabaseInterface {

	/* For General */
	/**
	 * Attempts to establish a connection with the data source that this
	 * datasource name mirrors. datasource name have to be defined in
	 * database_config.xml
	 * 
	 * @param datasource
	 *            datasource name for connection. this have to be defined in
	 *            database_config.xml
	 * @return a connection to the datasource name
	 * @throws SQLException
	 *             if a database access error occurs
	 */
	Connection getConnection(String datasource) throws SQLException;

	/**
	 * return Query String from queryID, queryParameter Map given. only for
	 * SELECT Query.
	 * 
	 * @param queryID
	 *            query ID defined in database_queries.xml
	 * @return fullly generated query string
	 * @throws SQLException
	 *             if a database access error occurs
	 */
	String getQueryString(String queryID, Map queryParameter)
			throws SQLException;

	/* For Select Operation */
	/**
	 * Executes the given Statement Object and SQL String, which returns a
	 * single ResultSet object.
	 * 
	 * @param statement
	 *            a Statement object for execute SQL string
	 * @param sqlString
	 *            an SQL statement to be sent to the database, typically a
	 *            static SQL SELECT statement
	 * @return a ResultSet object that contains the data produced by the given
	 *         query; never null
	 * @throws SQLException
	 *             if a database access error occurs or the given SQL statement
	 *             produces anything other than a single ResultSet object
	 */
	ResultSet executeQuery(Statement statement, String sqlString)
			throws SQLException;

	/**
	 * Executes the SQL statement generated with given Statement Object,
	 * query-id and item map( where all items are for generate query), which
	 * returns a single ResultSet object. query-id have to be defined in
	 * database_queries.xml.
	 * 
	 * @param statement
	 *            a Statement object for execute SQL string
	 * @param sqlKey
	 *            a String object query-id to be executed
	 * @param queryItemMap
	 *            a Map object contains all items for generating query. each
	 *            item is formed in name-value pair, and is replaced with
	 *            predefined string format(${name}) in query string.
	 * @return a ResultSet object that contains the data produced by the given
	 *         query; never null
	 * @throws SQLException
	 *             if a database access error occurs or the given SQL statement
	 *             produces anything other than a single ResultSet object
	 */
	ResultSet executeQuery(Statement statement, String sqlKey, Map queryItemMap)
			throws SQLException;

	/* For Insert,update,delete Operation */
	/**
	 * Executes the given Statement Object and SQL statement, which may be an
	 * INSERT, UPDATE, or DELETE statement or an SQL statement that returns
	 * nothing, such as an SQL DDL statement.
	 * 
	 * @param statement
	 *            a Statement object for execute SQL string
	 * @param sqlString
	 *            an SQL INSERT, UPDATE or DELETE statement or an SQL statement
	 *            that returns nothing
	 * @return either the row count for INSERT, UPDATE or DELETE statements, or
	 *         0 for SQL statements that return nothing
	 * @throws SQLException
	 *             if a database access error occurs or the given SQL statement
	 *             produces a ResultSet object
	 */
	int executeUpdate(Statement statement, String sqlString)
			throws SQLException;

	/**
	 * Executes the SQL statement generated with given Statement Object,
	 * query-id and item map( where all items are for generate query), which may
	 * be an INSERT, UPDATE, or DELETE statement or an SQL statement that
	 * returns nothing, such as an SQL DDL statement.
	 * 
	 * @param statement
	 *            a Statement object for execute SQL string
	 * @param sqlKey
	 *            a String object query-id to be executed
	 * @param queryItemMap
	 *            a Map object contains all items for generating query. each
	 *            item is formed in name-value pair, and is replaced with
	 *            predefined string format(${name}) in query string.
	 * @return either the row count for INSERT, UPDATE or DELETE statements, or
	 *         0 for SQL statements that return nothing. if iterating query
	 *         would be executed with two or more contains-parameter, this
	 *         returns the result of only first generated query. (in iterating
	 *         case, we advise to use executeBatch(Statement statement, List
	 *         sqlKeys, Map queryItemMap))
	 * @throws SQLException
	 *             if a database access error occurs or the given SQL statement
	 *             produces a ResultSet object
	 */
	int executeUpdate(Statement statement, String sqlKey, Map queryItemMap)
			throws SQLException;

	/**
	 * Execute bundle of SQL Statements given sequentially. in detail, this adds
	 * all given SQL command in list to the current list of commmands for given
	 * Statement object and executs all the commands in this list as a batch.
	 * 
	 * @param statement
	 *            a Statement object for execute SQL string
	 * @param sqlStrings
	 *            a List object contains SQL statements executed
	 * @return an array of update counts containing one element for each command
	 *         in the batch. The elements of the array are ordered according to
	 *         the order in which commands were added to the batch.
	 * @throws SQLException
	 *             if a database access error occurs or the driver does not
	 *             support batch statements. Throws BatchUpdateException (a
	 *             subclass of SQLException) if one of the commands sent to the
	 *             database fails to execute properly or attempts to return a
	 *             result set.
	 *  
	 */
	int[] executeBatch(Statement statement, List sqlStrings)
			throws SQLException;

	/**
	 * Execute bundle of SQL Statements given sequentially. in detail, this adds
	 * all given SQL command generated with given query-ids and item map to the
	 * current list of commmands for given Statement object and executs all the
	 * commands in this list as a batch.
	 * 
	 * @param statement
	 *            a Statement object for execute SQL string
	 * @param sqlKeys
	 *            a List object contains all the query-ids to be executed
	 * @param queryItemMap
	 *            a Map object contains all items for generating query. each
	 *            item is formed in name-value pair, and is replaced with
	 *            predefined string format(${name}) in query string.
	 * @return an array of update counts containing one element for each command
	 *         in the batch. The elements of the array are ordered according to
	 *         the order in which commands were added to the batch.
	 * @throws SQLException
	 *             if a database access error occurs or the driver does not
	 *             support batch statements. Throws BatchUpdateException (a
	 *             subclass of SQLException) if one of the commands sent to the
	 *             database fails to execute properly or attempts to return a
	 *             result set.
	 */
	int[] executeBatch(Statement statement, List sqlKeys, Map queryItemMap)
			throws SQLException;

	/**
	 * Close a Statement, avoid closing if null and hide any SQLExceptions that
	 * occur.
	 * 
	 * @param statement
	 *            a Statement Object to be closed
	 */
	void close(Statement statement);

	/**
	 * Close a Connection, avoid closing if null and hide any SQLExceptions that
	 * occur.
	 * 
	 * @param connection
	 *            a Connection Object to be closed
	 */
	void close(Connection connection);

	/**
	 * Close a ResultSet, avoid closing if null and hide any SQLExceptions that
	 * occur.
	 * 
	 * @param resultSet
	 *            a ResultSet Object to be closed
	 */
	void close(ResultSet resultSet);

	/**
	 * Close a Connection and a Statement, avoid closing if null and hide any
	 * SQLExceptions that occur.
	 * 
	 * @param connection
	 *            a Connection Object to be closed
	 * @param statement
	 *            a Statement Object to be closed
	 */
	void close(Connection connection, Statement statement);

	/**
	 * Close a Connection ,a Statement and a ResultSet, avoid closing if null
	 * and hide any SQLExceptions that occur.
	 * 
	 * @param connection
	 *            a Connection Object to be closed
	 * @param statement
	 *            a Statement Object to be closed
	 * @param resultSet
	 *            a ResultSet Object to be closed
	 */
	void close(Connection connection, Statement statement, ResultSet resultSet);
}