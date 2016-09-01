/**
 * OS_PRSERVICEServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.Nongshim.pis.pu;

public class OS_PRSERVICEServiceLocator extends org.apache.axis.client.Service implements com.Nongshim.pis.pu.OS_PRSERVICEService {

    public OS_PRSERVICEServiceLocator() {
    }


    public OS_PRSERVICEServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public OS_PRSERVICEServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for OS_PRSERVICEPort
    // 개발XI서
    private java.lang.String OS_PRSERVICEPort_address = "http://172.25.1.137:50000/XISOAPAdapter/MessageServlet?channel=:PIS:Schannel_SOAP_PRSERVICE&version=3.0&Sender.Service=PIS&Interface=http%3A%2F%2FNongshim.com%2Fpis%2Fpu%5EOS_PRSERVICE";

    // 운영XI서버
    //private java.lang.String OS_PRSERVICEPort_address = "http://erpxi.nongshim.com:50000/XISOAPAdapter/MessageServlet?channel=:PIS:Schannel_SOAP_PRSERVICE&version=3.0&Sender.Service=PIS&Interface=http%3A%2F%2FNongshim.com%2Fpis%2Fpu%5EOS_PRSERVICE";

    public java.lang.String getOS_PRSERVICEPortAddress() {
        return OS_PRSERVICEPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String OS_PRSERVICEPortWSDDServiceName = "OS_PRSERVICEPort";

    public java.lang.String getOS_PRSERVICEPortWSDDServiceName() {
        return OS_PRSERVICEPortWSDDServiceName;
    }

    public void setOS_PRSERVICEPortWSDDServiceName(java.lang.String name) {
        OS_PRSERVICEPortWSDDServiceName = name;
    }

    public com.Nongshim.pis.pu.OS_PRSERVICE getOS_PRSERVICEPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(OS_PRSERVICEPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getOS_PRSERVICEPort(endpoint);
    }

    public com.Nongshim.pis.pu.OS_PRSERVICE getOS_PRSERVICEPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            com.Nongshim.pis.pu.OS_PRSERVICEBindingStub _stub = new com.Nongshim.pis.pu.OS_PRSERVICEBindingStub(portAddress, this);
            _stub.setPortName(getOS_PRSERVICEPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setOS_PRSERVICEPortEndpointAddress(java.lang.String address) {
        OS_PRSERVICEPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (com.Nongshim.pis.pu.OS_PRSERVICE.class.isAssignableFrom(serviceEndpointInterface)) {
                com.Nongshim.pis.pu.OS_PRSERVICEBindingStub _stub = new com.Nongshim.pis.pu.OS_PRSERVICEBindingStub(new java.net.URL(OS_PRSERVICEPort_address), this);
                _stub.setPortName(getOS_PRSERVICEPortWSDDServiceName());
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
        if ("OS_PRSERVICEPort".equals(inputPortName)) {
            return getOS_PRSERVICEPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://Nongshim.com/pis/pu", "OS_PRSERVICEService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://Nongshim.com/pis/pu", "OS_PRSERVICEPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("OS_PRSERVICEPort".equals(portName)) {
            setOS_PRSERVICEPortEndpointAddress(address);
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
