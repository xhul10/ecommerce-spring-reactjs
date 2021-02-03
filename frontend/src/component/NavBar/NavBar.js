import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faSignOutAlt, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import {logout} from "../../actions/auth-actions";
import "./NavBar.css";

class NavBar extends Component {

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        let links;
        let signOut;

        if (localStorage.getItem("isLoggedIn") || this.props.isLoggedIn) {
            links = (
                <li className="nav-item">
                    <Link to={"/account"}><span className="nav-link pl-5 pr-5">
                         <FontAwesomeIcon className="mr-2" icon={faUser}/>MY ACCOUNT</span></Link>
                </li>
            );
            signOut = (
                <Link to={"/"} onClick={this.handleLogout}>
                    <button className="btn btn-dark mr-3" style={{color: "white"}}>
                        <FontAwesomeIcon className="mr-2" icon={faSignOutAlt}/>Exit
                    </button>
                </Link>
            );
        } else {
            links = (
                <>
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link pl-5 pr-3">
                            <FontAwesomeIcon className="mr-2" icon={faSignInAlt}/>SIGN IN</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/registration"} className="nav-link">
                            <FontAwesomeIcon className="mr-2" icon={faUserPlus}/>SIGN UP</Link>
                    </li>
                </>
            );
            signOut = null;
        }

        return (
            <div>
                <div id="header" className="container-fluid header-top d-none d-md-block pb-5 pt-5">
                    <img src="https://i.ibb.co/fqYvrL8/LOGO4.jpg" className="rounded mx-auto d-block"/>
                </div>
                <div className="container-fluid bg-black">
                    <nav id="navbar-main" className={`container navbar navbar-expand-lg bg-black text-white `}
                         style={{fontSize: "18px"}}>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto ">
                                <li className="nav-item">
                                    <Link to={"/"}><span className="nav-link pl-5 pr-5">HOME</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{pathname: "/menu", state: {id: "all"}}}>
                                        <span className="nav-link pl-5 pr-5">PERFUMES</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/contacts"}><span className="nav-link pl-5 pr-5">CONTACTS</span></Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/cart"}>
                                        <i className="fas fa-shopping-cart fa-lg pl-5" style={{color: "white"}}></i>
                                        <h5 className="d-inline" style={{position: "relative", right: "15px", bottom: "8px"}}>
                                            <span className="badge badge-success">{this.props.perfumes.length}</span>
                                        </h5>
                                    </Link>
                                </li>
                                {links}
                            </ul>
                            {signOut}
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    perfumes: PropTypes.array.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.cart.perfumes,
    isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps, {logout})(NavBar);
