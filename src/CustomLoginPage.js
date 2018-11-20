import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';

import defaultTheme from './defaultTheme';
import Notification from './Notification';
import DefaultLoginForm from './LoginForm';
//import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";


const styles = theme => ({
    
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '10px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'url(https://s3.us-east-2.amazonaws.com/industrility-app-image/factory-1536102864354-9078.png)',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
        backgroundColor: '#D5D8DC'
       //backgroundColor: '#17202A'
       // opacity: 0.7,
        
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: 300,
      //  background: 'url(https://s3.us-east-2.amazonaws.com/industrility-app-image/logo.png)',
       backgroundColor: '#17202A'
    },
    icon: {
      //  display: 'flex',
        backgroundColor: theme.palette.secondary[500],
        width: 200,
        height: 60,
       // backgroundColor: '#5D6D7E'
    },
});

const sanitizeRestProps = ({
    classes,
    className,
    location,
    title,
    array,
    theme,
    staticContext,
    ...rest
}) => rest;

/**
 * A standalone login page, to serve as authentication gate to the admin
 *
 * Expects the user to enter a login and a password, which will be checked
 * by the `authProvider` using the AUTH_LOGIN verb. Redirects to the root page
 * (/) upon success, otherwise displays an authentication error message.
 *
 * Copy and adapt this component to implement your own login logic
 * (e.g. to authenticate via email or facebook or anything else).
 *
 * @example
 *     import MyLoginPage from './MyLoginPage';
 *     const App = () => (
 *         <Admin loginPage={MyLoginPage} authProvider={authProvider}>
 *             ...
 *        </Admin>
 *     );
 */
const Login = ({ classes, className, loginForm, ...rest }) => (
    
    <div
        className={classnames(classes.main, className)}
        {...sanitizeRestProps(rest)}
    >
        <Card className={classes.card}>
      
        <CardMedia
          className={classes.media}
          image="img/logo.png"
          
        />
      
            <div className={classes.avatar}>
                <Avatar className={classes.icon} src="img/logo.png" style={{ borderRadius: 0 }}>
                    {/* <LockIcon /> */}
                </Avatar>
               
            </div>
            {loginForm}
        </Card>
        <Notification />
        {/* {loginForm} */}
    </div>
);

Login.propTypes = {
    className: PropTypes.string,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    input: PropTypes.object,
    meta: PropTypes.object,
    previousRoute: PropTypes.string,
    loginForm: PropTypes.element,
};

Login.defaultProps = {
    theme: defaultTheme,
    loginForm: <DefaultLoginForm />,
};

export default withStyles(styles)(Login);
