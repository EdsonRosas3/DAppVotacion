import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ListUsers from './ListUsers';

const OrganizationOne = () => {

  return (
    <div>
        <Link to="/auth/organizations">Volver a organizaciones</Link>
        <ListUsers/>
    </div>
  )
}

export default OrganizationOne