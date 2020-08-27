import React, { Component } from 'react';
import classes from './Layout.module.css';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <div>Toolbar</div>
                <div>SideDrawer</div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;