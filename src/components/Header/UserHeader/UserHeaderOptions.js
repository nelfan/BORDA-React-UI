import React, {Component} from 'react';
import "./user_header_options.css"

class UserHeaderOptions extends Component{
    state={
        showMenu: false,
        menuNotification: false
    }

    clickUserMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    clickNotificationIcon = () => {
        this.setState({
            menuNotification: !this.state.menuNotification
        })
    }

    render() {
        return <div className="right-side">
            <div className="alignment_of_items">
                <div className="empty_block"/>
                <div className="general-info">
                    <a href="#" className="user_icon">
                        <i className="far fa-user-circle" onClick={this.clickUserMenu}>

                        </i>
                    </a>
                    <a className="notification_icon">
                        <div className="alignment">
                            <i className="fa fa-envelope" onClick={this.clickNotificationIcon}>
                              
                            </i>
                        </div>
                    </a>
                    <a href="#"><i className="far fa-map"/></a>
                </div>
            </div>
        </div>
    }
}

export default UserHeaderOptions