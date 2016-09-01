/*
 * Created on 2004. 6. 4.
 *
 * Copyright 1999-2004 ZIONEX, Inc. All Rights Reserved.
 * This software is the proprietary information of ZIONEX, Inc.
 * Use is subject to license terms.
 */
package com.zionex.t3sinc.tsf.tool;

import java.io.IOException; 
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.xpath.XPath;

/**
 * @version 1.0
 * @author blueist
 * @since JDK 1.4
 */
public class TopDownMenuTool {

	/**
	 *  
	 */
	SAXBuilder saxBuilder = new SAXBuilder();

	public TopDownMenuTool() {
		super();
	}

	public List getHeaderMenu(String menuXML) throws JDOMException, IOException {
		List headerMenuList = new ArrayList();
		Document menuXMLDocument = saxBuilder.build(new StringReader(menuXML));
		XPath xpath = XPath.newInstance("menus/menu");
		List menus = xpath.selectNodes(menuXMLDocument);
		for (Iterator iterator = menus.iterator(); iterator.hasNext();) {
			System.out.println(((Element) iterator.next())
					.getAttributeValue("name"));
		}

		return headerMenuList;
	}

	public static void main(String arg[]) throws JDOMException, IOException {
		TopDownMenuTool a = new TopDownMenuTool();
		String xml = "<menus> <menu name='����ڰ���(ADMIN)'> <menu job='super_company_list' name='COMPANY INFO' /> <menu job='super_group_list' name='GROUP INFO' /> <menu job='super_user_list' name='USER INFO' /> </menu> <menu name='�Խ��ǰ���'> <menu job='moon_board_admin' name='�Խ��ǰ�����' /> </menu> <menu name='Ŀ�´�Ƽ'> <menu job='main' name='�⺻���̺�' /> <menu job='moon_board_list' name='�Խ����׽�Ʈ' /> </menu> <menu name='UI ���輭 (DF)'> <menu job='manage_so' name='���ְ���' /> <menu job='mng_so_list' name='���ְ�������Ʈ' /> </menu> <menu name='SAMPLE'> <menu job='sample_list' name='���ø���Ʈ' /> <menu job='sample_reg' name='���õ��' /> <menu job='sample_mssql' name='����_MSSQL_LIST_condition' /> <menu job='sample_mssql2' name='����_MSSQL_LIST' /> <menu job='grid_list1' name='�׸��帮��Ʈ1' /> <menu job='grid_list2' name='�׸��帮��Ʈ2' /> <menu job='grid_list3' name='�׸��帮��Ʈ3' /> <menu job='ui_samle1' name='ȭ�� ����1' /> <menu job='ui_samle2' name='ȭ�� ����2' /> <menu job='ui_samle3' name='Chart ����' /> <menu job='ui_samle4' name='�������Ʈ1' /> <menu job='ui_samle5' name='�������Ʈ2' /> <menu job='ui_samle6' name='�������Ʈ3' /> </menu> <menu name='planUI'> <menu job='planned_order' name='Planned Order' /> </menu> </menus>";
		a.getHeaderMenu(xml);
	}
}