import React from 'react';

function Background() {
  return (
    <div width="100%">
        <div style = {{
        content: '',
        position: "absolute",
        top: "-200px",
        left:" -200px",
        width: "400px",
        height: "400px",
        background: "#c989e8",
        opacity: 0.7,
        filter: "blur(150px)",
            }}></div>
        <div style = {{
        content: '',
        position: "absolute",
        top: "-200px",
        right:" 0px",
        width: "400px",
        height: "400px",
        background: "#b3d4ff",
        opacity: 0.7,
        filter: "blur(150px)",
        }} ></div>

    </div>
  );
}

export default Background;