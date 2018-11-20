import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { AssetList, showAsset } from '././AssetSPA/Assets';
import { DeviceList, showDevice } from '././DevicesSPA/Devices';
import { Alerts } from '././AlertsSPA/Alerts';
import { MaintenancePlanList, MaintenancePlanShow, MaintenancePlanEdit, MaintenancePlanCreate } from '././MaintenanceSPA/MaintenancePlan';
import { Maintenance, MaintenanceShow } from '././MaintenanceSPA/Maintenance';
import { MaintenanceHistory, MaintenanceHistoryDetails } from '././MaintenanceSPA/MaintenanceHistory';
import { AlertsHistory } from '././AlertsSPA/AlertHistory';
import { AlertConfiguration, createAlertConfiguration, showAlertConfiguration, editAlertConfiguration } from '././AlertsSPA/AlertConfiguration'
import { MapView } from '././MapSPA/MapView'
//import {MaintenancePlanCreate} from './CreateMaintenancePlan';
import { AnalyticsView, ShowReport } from '././AnalyticsSPA/Analytics'

import UserIcon from '@material-ui/icons/People';
import Dashboard from '././DashboardSPA/Dashboard';

import authProvider from './authProvider';
import simpleRestProvider from 'ra-data-simple-rest';
import { func } from 'prop-types';
//import MaintenanceDashboardIcon from '@material-ui/icons/BuildOutlined';
import MaintenanceHistoryIcon from '@material-ui/icons/Build';
import LocationIcon from '@material-ui/icons/LocationOn';
import AssetIcon from '@material-ui/icons/CastConnected';
import AnalytcisIcon from '@material-ui/icons/PieChart';
import AlertConfigIcon from '@material-ui/icons/AddCircleOutline';
import AlertDashboard from '@material-ui/icons/ErrorOutline';
import HistoryAlertIcon from '@material-ui/icons/Error';
import DeviceIcon from '@material-ui/icons/Router';
import AlertIcon from '@material-ui/icons/Warning';
import NotFound from './NotFound';
//import AssetIcon from '@material-ui/icons/web_asset'
import Login from './CustomLoginPage';

import dataProvider from './dataProvider';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CustomLoginPage from './CustomLoginPage';
//import {FaultAnalytics} from '././AnalyticsSPA/FaultReports';
//import{FaultAnalyticsView, ShowFaultReport} from '././AnalyticsSPA/FaultAnalytics'
import CustomLayout from './CustomLayout'
//import {SensorGroupList,ShowSensorList} from '././Assets/SensorGroup'
import {PartsCustomerView,ShowCustomerAssets} from '././PartsSPA/Customers'
import {PartsDashboard} from '././PartsSPA/PartsDashboard'




  class App extends React.Component {

    render(){
      console.log(this.props)
      return(

        <Admin 
        title="Fleet-Admin"
        catchAll={NotFound}
        dashboard={Dashboard}
        authProvider={authProvider}
        dataProvider={dataProvider}
        loginPage={Login}
        appLayout={CustomLayout}
      >
        
        <Resource
          name="getMapViewData"
          options={{ label: 'Map' }}
          list={MapView}
          icon={LocationIcon}
        /> 
  
  
        {/* <Resource
          name="getListOfSensorGroups"
          options={{ label: 'Sensor Groups' }}
          list={SensorGroupList}
          show={ShowSensorList}
         // icon={AssetIcon}
        /> */}
  
  
        <Resource
          name="getAssetList"
          options={{ label: 'Assets' }}
          list={AssetList}
          show={showAsset}
          icon={AssetIcon}
        />
  
        <Resource
          name="getDeviceList"
          options={{ label: 'Devices' }}
          list={DeviceList}
          show={showDevice}
          icon={DeviceIcon}
        />
  
        <Resource
          name="getAlerts"
          options={{ label: 'Alerts Dashboard' }}
          list={Alerts}
          icon={AlertDashboard}
        />
  
        <Resource
          name="getAlerstHistory"
          options={{ label: 'Historical Alerts' }}
          list={AlertsHistory}
          icon={HistoryAlertIcon}
        />
  
  
        <Resource name="getListOfAlertConfiguration"
          options={{ label: 'Alert Configuration' }}
          list={AlertConfiguration} icon={AlertIcon}
          create={createAlertConfiguration}
          show={showAlertConfiguration}
          edit={editAlertConfiguration}
          icon={AlertConfigIcon}
        />
  
  
        <Resource
          name="getMaintenance"
          options={{ label: 'Maintenance Dashboard' }}
          list={Maintenance}
          icon={MaintenanceHistoryIcon} />
  
        <Resource
          name="getListOfMaintenancePlan"
          options={{ label: 'Maintenance Plan' }}
          show={MaintenancePlanShow}
          list={MaintenancePlanList}
          edit={MaintenancePlanEdit}
          create={MaintenancePlanCreate}
        />
  
  
        <Resource
          name="getMaintenanceHistory"
          options={{ label: 'Maintenance History' }}
          list={MaintenanceHistory}
          show={MaintenanceHistoryDetails}
          icon={MaintenanceHistoryIcon} />
  
  
  
        <Resource name="getListOfAnalyticsReports"
          options={{ label: 'Analytics' }}
          list={AnalyticsView}
          show={ShowReport}
          icon={AnalytcisIcon}
        />

        <Resource name="getListOfCustomers"
          options={{ label: 'Parts' }}
          list={PartsCustomerView}
          show={ShowCustomerAssets}
          //icon={AnalytcisIcon}
        />
  
       <Resource name="getPartsStatus"
          options={{ label: 'Parts Dashboard' }}
          list={PartsDashboard}
        //  show={ShowCustomerAssets}
          //icon={AnalytcisIcon}
        />
  
   
  
  
  
        <Resource name="AlertPriorityStatistics" />
        <Resource name="getAssetListForReference" />
  
        <Resource name="getListOfDataPoints" />
        <Resource name="getAssetAlerts" />
        <Resource name="getAssetMaintenance" />
  
        <Resource name="getListOfAttributes" />
        <Resource name="getAssetCurrentData" />
  
      </Admin>
  

      )
    }

  }

export default App;

// authProvider ={authProvider} 
//<Resource name="getListOfMaintenancePlan" options={{ label: 'MaintenancePlan' }} list={MaintenancePlanList} />
//  <Resource name="posts" list={PostList} />
//<Resource name="getDataPoints" list={DataPoints} />
// <Resource name="getDataPoints" options={{ label: 'Assets' }} list={AssetList} />
//     <Resource name="users" options={{ label: 'Users' }} dataProvider={dataProvider2} icon={UserIcon} list={UserList} />
//<Resource name="users" options={{ label: 'Users' }} icon={UserIcon} list={UserList} />
//<Resource name="getListOfMaintenancePlan" options={{ label: 'Assets' }} list={PostList} edit={PostEdit} create={PostCreate} />