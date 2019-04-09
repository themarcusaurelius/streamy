import React from 'react';
import Image from '../assets/images/placeholder.png';
import { connect } from 'react-redux';
import {signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    //state initialization without Redux
    //state = { isSignedIn: null }
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '125876482500-iujasrhld1k62nf58vn3afvgkat77f53.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    //Allows asynchronous login/logout anytime authentication changes
    onAuthChange = (isSignedIn) => {
        //Code without Redux
        //this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        if (isSignedIn) {
            //Gets users unique UserId as well with arguement
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        //if (this.state.isSignedIn === null) {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn === true) { 
            //else if (this.state.isSignedIn === true) {
            return (
                <div>
                    <img className="ui avatar image" alt="User" src={this.auth.currentUser.Ab.w3.Paa} />
                    <button onClick={this.onSignOutClick} className="mini circular ui animated red button google" tabindex="0">
                        <div className="visible content">
                            <i className="google icon" />
                            <i className="right arrow icon"></i>
                        </div>
                        <div className="hidden content">
                            Sign Out
                        </div>
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <img className="ui avatar image" alt="User" src={Image} />
                    <button onClick={this.onSignInClick} className="mini ui circular animated inverted red button">
                        <div className="visible content">
                            <i className="google icon" />
                            <i className="left arrow icon"></i>
                        </div>
                        <div className="hidden content">
                            Sign In
                        </div>
                    </button>
                </div>
            );    
        }
    };

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    } 
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth); 