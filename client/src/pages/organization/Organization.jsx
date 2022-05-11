import { Button } from 'antd';
import React from 'react';
import { useParams,Link } from 'react-router-dom';
import ListUsers from './ListUsers';

const OrganizationOne = () => {
    const { idOrganization } = useParams();
  return (
    <div> Ingegrantes de la organizacion {idOrganization} 
        <Link to="/auth/organizations">Volver</Link>
        <ListUsers/>
    </div>
  )
}

export default OrganizationOne