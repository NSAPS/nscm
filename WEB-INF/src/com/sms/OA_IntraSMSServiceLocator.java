/**
 * OA_IntraSMSServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.sms;

public class OA_IntraSMSServiceLocator extends org.apache.axis.client.Service implements com.sms.OA_IntraSMSService {

    public OA_IntraSMSServiceLocator() {
    }


    public OA_IntraSMSServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public OA_IntraSMSServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for OA_IntraSMSPort
    private java.lang.String OA_IntraSMSPort_address = "http://erpxi.nongshim.com:50000/XISOAPAdapter/MessageServlet?channel=:NFOS:Schannel_SOAP_IntraSMS&version=3.0&Sender.Service=NFOS&Interface=http%3A%2F%2FNongshim.com%2Fnfos%2Fnf%5EOA_IntraSMS";

    public java.lang.String getOA_IntraSMSPortAddress() {
        return OA_IntraSMSPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String OA_IntraSMSPortWSDDServiceName = "OA_IntraSMSPort";

    public java.lang.String getOA_IntraSMSPortWSDDServiceName() {
        return OA_IntraSMSPortWSDDServiceName;
    }

    public void setOA_IntraSMSPortWSDDServiceName(java.lang.String name) {
        OA_IntraSMSPortWSDDServiceName = name;
    }

    public com.sms.OA_IntraSMS getOA_IntraSMSPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(OA_IntraSMSPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getOA_IntraSMSPort(endpoint);
    }

    public com.sms.OA_IntraSMS getOA_IntraSMSPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            com.sms.OA_IntraSMSBindingStub _stub = new com.sms.OA_IntraSMSBindingStub(portAddress, this);
            _stub.setPortName(getOA_IntraSMSPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setOA_IntraSMSPortEndpointAddress(java.lang.String address) {
        OA_IntraSMSPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (com.sms.OA_IntraSMS.class.isAssignableFrom(serviceEndpointInterface)) {
                com.sms.OA_IntraSMSBindingStub _stub = new com.sms.OA_IntraSMSBindingStub(new java.net.URL(OA_IntraSMSPort_address), this);
                _stub.setPortName(getOA_IntraSMSPortWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("OA_IntraSMSPort".equals(inputPortName)) {
            return getOA_IntraSMSPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://Nongshim.com/nfos/nf", "OA_IntraSMSService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://Nongshim.com/nfos/nf", "OA_IntraSMSPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("OA_IntraSMSPort".equals(portName)) {
            setOA_IntraSMSPortEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
