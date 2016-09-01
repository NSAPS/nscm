/*
/*
 * Created on 2004. 7. 23.
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.zionex.t3sinc.tsf.tool;

import java.io.IOException;
import java.io.StringReader;
import java.util.List;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

/**
 * @author Administrator
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public class LeftMenuTool {

	final String DOCUMENT_TYPE = "db"; //or file (별도의

	final String TREE_MENU_NAME = "메뉴";

	final String TREE_MENU_TYPE = "classic";

	private SAXBuilder saxBuilder = new SAXBuilder();

	/**
	 *  
	 */
	public LeftMenuTool() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getMainMenuScriptString(String menuXmlString) {
		
		System.out.println("###############################################################");
		System.out.println("DepthTest" + menuXmlString);
		System.out.println("###############################################################");

		String menuString = "";
		try {
			Document menuXMLDocument = saxBuilder.build(new StringReader(
					menuXmlString));
			menuString = getMenuString(menuXMLDocument);
		} catch (JDOMException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menuString;
	}

	public String getFavoriteMenuScriptString(String favoriteXmlString) {
		String favoriteString = "";
		try {
			Document favoriteXMLDocument = saxBuilder.build(new StringReader(
					favoriteXmlString));
			favoriteString = getMenuString(favoriteXMLDocument);
		} catch (JDOMException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return favoriteString;
	}

	private String getMenuString(Document doc) {
		StringBuffer personalMenuScript = new StringBuffer();

		personalMenuScript.append("if (document.getElementById) { \r");
		personalMenuScript.append("	var tree = new WebFXTree('"
				+ TREE_MENU_NAME + "', null, '" + TREE_MENU_TYPE + "'); \r");
		personalMenuScript.append("	tree.target='mainFrame'; \r");
		//------------------------------------------------------------------
		Element root = doc.getRootElement();
		List childenList = root.getChildren();

		for (int i = 0; i < childenList.size(); i++) {
			Element child = (Element) childenList.get(i);
			String menuName = child.getAttributeValue("name");
			String url = scriptNullCheck(child.getAttributeValue("url"));

			personalMenuScript.append("	var a" + i + " = new WebFXTreeItem('"
					+ menuName + "', " + url + ", tree); \r");
			personalMenuScript.append("	a" + i + ".target = 'mainFrame'; \r");

			if (child.getChildren().size() > 0) {
				personalMenuScript.append(menu_sub1(child, "a" + i, 'b'));
			}
		}
		//-------------------------------------------------------------------

		personalMenuScript.append("	document.write(tree); \r");
		personalMenuScript.append("}");

		return personalMenuScript.toString();
	}

	private String menu_sub1(Element element, String parent_name, char prefix) {
		StringBuffer sub1MenuScript = new StringBuffer();

		List childenList = element.getChildren();

		for (int i = 0; i < childenList.size(); i++) {
			Element child = (Element) childenList.get(i);
			String menuName = child.getAttributeValue("name");

			String url = scriptNullCheck(child.getAttributeValue("url"));
			String icon = scriptNullCheck(child.getAttributeValue("icon"));
			String openicon = scriptNullCheck(child
					.getAttributeValue("openicon"));

			sub1MenuScript.append("	var "+ Character.toString(prefix) + i + " = new WebFXTreeItem('"
					+ menuName + "', " + url + ", " + parent_name + ", " + icon
					+ ", " + openicon + "); \r");
			sub1MenuScript.append(Character.toString(prefix) + i + ".target = 'mainFrame'; \r");

			if (child.getChildren().size() > 0) {

				sub1MenuScript.append(menu_sub1(child, Character.toString(prefix) + i , (char)(prefix+1)));

			}
		}

		return sub1MenuScript.toString();
	}

	private String menu_sub2(Element element, String parent_name) {
		StringBuffer sub2MenuScript = new StringBuffer();
		List childenList = element.getChildren();

		for (int i = 0; i < childenList.size(); i++) {
			Element child = (Element) childenList.get(i);
			String menuName = child.getAttributeValue("name");

			String url = scriptNullCheck(child.getAttributeValue("url"));
			String icon = scriptNullCheck(child.getAttributeValue("icon"));
			String openicon = scriptNullCheck(child
					.getAttributeValue("openicon"));

			sub2MenuScript.append("	var c" + i + " = new WebFXTreeItem('"
					+ menuName + "', " + url + ", " + parent_name + ", " + icon
					+ ", " + openicon + "); \r");
			sub2MenuScript.append("	c" + i + ".target = 'mainFrame'; \r");
		}

		return sub2MenuScript.toString();
	}

	private String scriptNullCheck(String param) {

		if (param == null || param.equals("")) {
			param = "null";
		} else {
			param = "'" + param + "'";
		}
		return param;
	}
}