/**
 * DT_PRSERVICE.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.Nongshim.pis.pu;

public class DT_PRSERVICE  implements java.io.Serializable {
    private com.Nongshim.pis.pu.DT_PRSERVICERow[] row;

    private com.Nongshim.pis.pu.DT_PRSERVICEStr str;

    public DT_PRSERVICE() {
    }

    public DT_PRSERVICE(
           com.Nongshim.pis.pu.DT_PRSERVICERow[] row,
           com.Nongshim.pis.pu.DT_PRSERVICEStr str) {
           this.row = row;
           this.str = str;
    }


    /**
     * Gets the row value for this DT_PRSERVICE.
     * 
     * @return row
     */
    public com.Nongshim.pis.pu.DT_PRSERVICERow[] getRow() {
        return row;
    }


    /**
     * Sets the row value for this DT_PRSERVICE.
     * 
     * @param row
     */
    public void setRow(com.Nongshim.pis.pu.DT_PRSERVICERow[] row) {
        this.row = row;
    }

    public com.Nongshim.pis.pu.DT_PRSERVICERow getRow(int i) {
        return this.row[i];
    }

    public void setRow(int i, com.Nongshim.pis.pu.DT_PRSERVICERow _value) {
        this.row[i] = _value;
    }


    /**
     * Gets the str value for this DT_PRSERVICE.
     * 
     * @return str
     */
    public com.Nongshim.pis.pu.DT_PRSERVICEStr getStr() {
        return str;
    }


    /**
     * Sets the str value for this DT_PRSERVICE.
     * 
     * @param str
     */
    public void setStr(com.Nongshim.pis.pu.DT_PRSERVICEStr str) {
        this.str = str;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof DT_PRSERVICE)) return false;
        DT_PRSERVICE other = (DT_PRSERVICE) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.row==null && other.getRow()==null) || 
             (this.row!=null &&
              java.util.Arrays.equals(this.row, other.getRow()))) &&
            ((this.str==null && other.getStr()==null) || 
             (this.str!=null &&
              this.str.equals(other.getStr())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getRow() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getRow());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRow(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getStr() != null) {
            _hashCode += getStr().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DT_PRSERVICE.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://Nongshim.com/pis/pu", "DT_PRSERVICE"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("row");
        elemField.setXmlName(new javax.xml.namespace.QName("", "row"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://Nongshim.com/pis/pu", ">DT_PRSERVICE>row"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("str");
        elemField.setXmlName(new javax.xml.namespace.QName("", "str"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://Nongshim.com/pis/pu", ">DT_PRSERVICE>str"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
