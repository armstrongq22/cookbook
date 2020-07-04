import React from 'react';
import CopyRight from '../components/Copyright';

const footerStyle = {
    fontSize: "20px",
    color: "white",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "20px",
    width: "100%"
  };
  
  const phantomStyle = {
    display: "block",
    height: "20px",
    width: "100%"
  };

function Footer() {

    return (
        <div style={footerStyle}>
          <div style={phantomStyle} />
          <div style={footerStyle}>
            <CopyRight />
          </div>
        </div>
      );
}

export default Footer;