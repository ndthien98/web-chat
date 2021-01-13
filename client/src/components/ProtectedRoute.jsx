import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import Sidebar from '../components/Sidebar';
const ProtectRoute = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ display: 'flex', flex: 1, height: '100%' }}>
        <Sidebar></Sidebar>
      </div>
      <div style={{ display: 'flex', flex: 5 }}>
        <Route
          {...rest}
          render={(matchProps) =>
            Cookie.get('token') ? <Component {...matchProps} /> : <Redirect to="/login" />
          }
        />
      </div>
    </div>
  );
};

ProtectRoute.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default ProtectRoute;
