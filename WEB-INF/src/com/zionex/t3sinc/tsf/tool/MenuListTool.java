/*
 * Created on 2004. 3. 18.
 *
 * Copyright 1999-2004 ZIONEX, Inc. All Rights Reserved.
 * This software is the proprietary information of ZIONEX, Inc.
 * Use is subject to license terms.
 */
package com.zionex.t3sinc.tsf.tool;
 
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

/**
 * @version 1.0
 * @author blueist1
 * @since JDK 1.4
 */
public class MenuListTool {

	private final int KIND_OF_FIXED_MENU = 0;

	private final int KIND_OF_INITIAL_MENU = 1;

	private final static ArrayList emptyList = new ArrayList();

	SAXBuilder saxBuilder = new SAXBuilder();

	private String contextPath = new String();

	public String getScriptStringForFixedMenuAuthority(String menuXML)
			throws JDOMException, IOException {
		StringBuffer scriptStringBuffer = new StringBuffer();
		Document menuXMLDocument = saxBuilder.build(new StringReader(menuXML));

		Element rootElement = menuXMLDocument.getRootElement();

		String htmlString = getHtmlForChildrenElement(rootElement, -1,
				KIND_OF_FIXED_MENU, emptyList);

		//scriptStringBuffer.append("<br>");
		scriptStringBuffer
				.append("<table border='1' cellpadding='0' cellspacing='0' width='100%' >");
		scriptStringBuffer.append("<tr>");
		scriptStringBuffer.append("<td class='td1' width='40%'>");
		scriptStringBuffer.append("&nbsp; Select Menu");
		scriptStringBuffer.append("</td>");
		scriptStringBuffer.append("</tr>");
		scriptStringBuffer.append("<tr>");
		scriptStringBuffer.append("<td>");
		scriptStringBuffer.append("<div class='scroll'>");
		scriptStringBuffer.append(htmlString);
		scriptStringBuffer.append("</div>");
		scriptStringBuffer.append("</td></tr></table>");
		return scriptStringBuffer.toString();
	}

	public String getScriptStringForFixedMenuAuthority(String menuXML,
			String contextPath) throws JDOMException, IOException {
		this.contextPath = contextPath;
		return getScriptStringForFixedMenuAuthority(menuXML);
	}

	public String getScriptStringForMenuAuthority(String menuXML)
			throws JDOMException, IOException {
		return getScriptStringForMenuAuthorityInternal(menuXML, emptyList);
	}

	public String getScriptStringForMenuAuthority(String menuXML,
			String contextPath) throws JDOMException, IOException {
		this.contextPath = contextPath;
		return getScriptStringForMenuAuthorityInternal(menuXML, emptyList);
	}

	public String getScriptStringForMenuAuthority(String menuXML,
			List selectedMenus) throws JDOMException, IOException {
		StringBuffer scriptStringBuffer = new StringBuffer();

		List selectedMenuList = new ArrayList();
		if (selectedMenus == null) {
			selectedMenuList = MenuListTool.emptyList;
		} else {
			for (Iterator iterator = selectedMenus.iterator(); iterator
					.hasNext();) {
				List menuItemList = (List) iterator.next();
				if (menuItemList.size() > 0) {
					selectedMenuList.add(menuItemList.get(0));
				}
			}
		}

		return getScriptStringForMenuAuthorityInternal(menuXML,
				selectedMenuList);
	}

	public String getScriptStringForMenuAuthority(String menuXML,
			List selectedMenus, String contextPath) throws JDOMException,
			IOException {
		this.contextPath = contextPath;
		return getScriptStringForMenuAuthority(menuXML, selectedMenus);
	}

	public String getScriptStringForMenuAuthority(String menuXML,
			String[] selectedMenus) throws JDOMException, IOException {
		List selectList;
		if (selectedMenus == null || selectedMenus.length == 0) {
			selectList = emptyList;
		} else {
			selectList = Arrays.asList(selectedMenus);
		}
		return getScriptStringForMenuAuthorityInternal(menuXML, selectList);
	}

	private String getScriptStringForMenuAuthorityInternal(String menuXML,
			List selectedMenus) throws JDOMException, IOException {
		StringBuffer scriptStringBuffer = new StringBuffer();

		Document menuXMLDocument = saxBuilder.build(new StringReader(menuXML));

		Element rootElement = menuXMLDocument.getRootElement();

		String htmlString = getHtmlForChildrenElement(rootElement, -1,
				KIND_OF_INITIAL_MENU, selectedMenus);

		//scriptStringBuffer.append("<br>");
		scriptStringBuffer
				.append("<table border='1' cellpadding='0' cellspacing='0' width='100%'>");
		scriptStringBuffer.append("<tr>");
		scriptStringBuffer.append("<td class='td1' width='40%'>");
		scriptStringBuffer.append("&nbsp; Select Menu");
		scriptStringBuffer.append("</td>");
		scriptStringBuffer.append("</tr>");
		scriptStringBuffer.append("<tr>");
		scriptStringBuffer.append("<td>");
		scriptStringBuffer.append("<div class='scroll'>");
		scriptStringBuffer.append(htmlString);
		scriptStringBuffer.append("</div>");
		scriptStringBuffer.append("</td></tr></table>");
		return scriptStringBuffer.toString();
	}

	/**
	 * @param rootElement
	 * @param i
	 * @param kind_of_initial_menu2
	 * @param selectedMenuList
	 * @return
	 */
	private String getHtmlForChildrenElement(Element localRoot, int level,
			int kindOf, List selectedMenuList) {
		StringBuffer htmlString = new StringBuffer();

		String imgSrcForBlank = "<img src='" + contextPath
				+ "/sinc/template/basic/images/common/blank.png'>";
		String imgSrcForLMark = "<img src='" + contextPath
				+ "/sinc/template/basic/images/common/L.png'>";
		String imgSrcForOpenFolder = "<img src='" + contextPath
				+ "/sinc/template/basic/images/common/openfoldericon.png'>";

		String blankSpace = "&nbsp;";
		String arrowSign = "&nbsp;";
		String menuName = localRoot.getAttributeValue("name");
		String menuJob = localRoot.getAttributeValue("job");
		String menuDesc = localRoot.getAttributeValue("description");

		List children = localRoot.getChildren();
		String justBeforeIcon = imgSrcForOpenFolder;

		if (level >= 0) {
			htmlString.append("<div>");
			if (children.size() == 0) {
				if (kindOf == this.KIND_OF_FIXED_MENU) {
					justBeforeIcon = "<input type='checkbox' name='check_menu' value='"
							+ menuJob + "' checked disabled='true'>";
				} else {
					if (selectedMenuList.contains(menuJob)) {
						justBeforeIcon = "<input type='checkbox' name='check_menu' value='"
								+ menuJob + "' checked >";
					} else {
						justBeforeIcon = "<input type='checkbox' name='check_menu' value='"
								+ menuJob + "' >";
					}
				}
			}
			for (int i = 0; i < level; i++) {
				htmlString.append(imgSrcForBlank);
			}
			htmlString.append(imgSrcForLMark);
			htmlString.append(justBeforeIcon);
			htmlString.append(imgSrcForBlank);
			htmlString.append(menuName);
			if (menuDesc != null) {
				htmlString.append("(");
				htmlString.append(menuDesc);
				htmlString.append(")");
			}

			htmlString.append("</div>");
		}

		for (Iterator iterator = children.iterator(); iterator.hasNext();) {
			htmlString.append(getHtmlForChildrenElement((Element) iterator
					.next(), level + 1, kindOf, selectedMenuList));
		}

		return htmlString.toString();
	}

	public String getMenuList(String menuXML) throws JDOMException, IOException {

		Document menuXMLDocument = saxBuilder.build(new StringReader(menuXML));

		Element rootElement = menuXMLDocument.getRootElement();
		String htmlString = getHtmlForChildrenElement(rootElement, -1,
				KIND_OF_INITIAL_MENU);

		StringBuffer resultStringBuffer = new StringBuffer();
		resultStringBuffer.append("<br>");
		resultStringBuffer
				.append("<table border='1' cellspacing='0' width='100%'>");
		resultStringBuffer.append("<tr >");
		resultStringBuffer
				.append("<td class='td1' align='center' width='10%'>선택</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 1</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 2</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 3</td>");
		resultStringBuffer.append("</tr>");
		resultStringBuffer.append(htmlString);
		resultStringBuffer.append("</table>");
		return resultStringBuffer.toString();
	}

	public String getPersonMenuSelectedList(String menuXML, String[] checkedMenu)
			throws JDOMException, IOException {

		Document menuXMLDocument = saxBuilder.build(new StringReader(menuXML));

		List selectedMenuList = new ArrayList();
		String htmlString;
		if (checkedMenu == null) {

			Element rootElement = menuXMLDocument.getRootElement();
			htmlString = getHtmlForChildrenElement(rootElement, -1,
					KIND_OF_INITIAL_MENU);
		} else {
			List selectedMenuResultList = Arrays.asList(checkedMenu);

			Element rootElement = menuXMLDocument.getRootElement();
			htmlString = getHtmlForChildrenElement(rootElement, -1,
					KIND_OF_INITIAL_MENU, selectedMenuResultList);
		}

		StringBuffer resultStringBuffer = new StringBuffer();
		resultStringBuffer.append("<br>");
		resultStringBuffer
				.append("<table border='1' cellspacing='0' width='100%'>");
		resultStringBuffer.append("<tr >");
		resultStringBuffer
				.append("<td class='td1' align='center' width='10%'>선택</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 1</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 2</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 3</td>");
		resultStringBuffer.append("</tr>");
		resultStringBuffer.append(htmlString);
		resultStringBuffer.append("</table>");
		return resultStringBuffer.toString();
	}

	public String getPersonMenuSelectedList(String menuXML, List checkedMenuList)
			throws JDOMException, IOException {

		String htmlString;
		if (checkedMenuList == null) {
			htmlString = getMenuList(menuXML);
		} else {
			htmlString = getSelectedMenuList(menuXML, checkedMenuList);
		}
		return htmlString;
	}

	public String getFixedMenuList(String menuXML) throws JDOMException,
			IOException {

		Document menuXMLDocument = saxBuilder.build(new StringReader(menuXML));

		Element rootElement = menuXMLDocument.getRootElement();
		String htmlString = getHtmlForChildrenElement(rootElement, -1,
				KIND_OF_FIXED_MENU);

		StringBuffer resultStringBuffer = new StringBuffer();
		resultStringBuffer.append("<br>");
		resultStringBuffer
				.append("<table border='1' cellspacing='0' width='100%'>");
		resultStringBuffer.append("<tr >");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 1</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 2</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 3</td>");
		resultStringBuffer.append("</tr>");
		resultStringBuffer.append(htmlString);
		resultStringBuffer.append("</table>");
		return resultStringBuffer.toString();
	}

	public String getSelectedMenuList(String menuXML,
			List selectedMenuResultList) throws JDOMException, IOException {

		List selectedMenuList = new ArrayList();
		for (Iterator iterator = selectedMenuResultList.iterator(); iterator
				.hasNext();) {
			List menuItemList = (List) iterator.next();
			if (menuItemList.size() > 0) {
				selectedMenuList.add(menuItemList.get(0));
			}
		}

		Document menuXMLDocument = saxBuilder.build(new StringReader(menuXML));

		Element rootElement = menuXMLDocument.getRootElement();
		String htmlString = getHtmlForChildrenElement(rootElement, -1,
				KIND_OF_INITIAL_MENU, selectedMenuList);

		StringBuffer resultStringBuffer = new StringBuffer();
		resultStringBuffer.append("<br>");
		resultStringBuffer
				.append("<table border='1' cellspacing='0' width='100%'>");
		resultStringBuffer.append("<tr >");
		resultStringBuffer
				.append("<td class='td1' align='center' width='10%'>선택</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 1</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 2</td>");
		resultStringBuffer
				.append("<td class='td1' align='center' width='30%'>메뉴 3</td>");
		resultStringBuffer.append("</tr>");
		resultStringBuffer.append(htmlString);
		resultStringBuffer.append("</table>");
		return resultStringBuffer.toString();
	}

	private String getHtmlForChildrenElement(Element localRoot, int level,
			int kindOf) {
		StringBuffer htmlString = new StringBuffer();
		String blankSpace = "&nbsp;";
		String arrowSign = "&nbsp;";
		String menuName = localRoot.getAttributeValue("name");
		String menuJob = localRoot.getAttributeValue("job");

		List children = localRoot.getChildren();
		if (level >= 0) {
			htmlString.append("<tr>");
			if (kindOf == KIND_OF_INITIAL_MENU) {
				if (children.size() > 0) {
					htmlString.append("	<td align='center'>&nbsp;</td>");
				} else {
					htmlString
							.append("	<td align='center'><input type='checkbox' name='check_menu' value='");
					htmlString.append(menuJob);
					htmlString.append("'></td>");
				}
			} 
			for (int i = 0; i < 3; i++) {
				htmlString.append("	<td>");
				if (i == level) {
					htmlString.append(menuName);
				} else if (i == level - 1) {
					htmlString.append(arrowSign);
				} else {
					htmlString.append(blankSpace);
				}
				htmlString.append("</td> ");
			}
			htmlString.append("</tr>");
		}

		for (Iterator iterator = children.iterator(); iterator.hasNext();) {
			htmlString.append(getHtmlForChildrenElement((Element) iterator
					.next(), level + 1, kindOf));
		}

		return htmlString.toString();
	}
	
	public String getFixedMenu(){
		return null;
	}
	
}