import React from 'react';
import { Layout } from 'react-admin';
import Menu from './CustomMenu';

const CustomLayout = (props) => <Layout {...props} menu={Menu} />;

export default CustomLayout;