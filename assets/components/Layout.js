import React from 'react';
import '../styles/layout.scss';

const Layout = ({ title, children, sidebarClass, backgroundImage }) => {
    const sidebarStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

    return (
        <div className='layout'>
            <div className={`layout-sidebar ${sidebarClass}`} style={sidebarStyle}>
                <div className="title-wrapper">
                    <h1>{title}</h1>
                </div>
            </div>
            <div className='layout-content'>
                {children}
            </div>
        </div>
    );
};

export default Layout;
