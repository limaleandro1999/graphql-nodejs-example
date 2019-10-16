import React from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_DRIVERS, DELETE_DRIVER } from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import DriversTable from '../../components/Drivers/DriversTable';
  
const useStyles = makeStyles(theme => ({
	root: {
		width: '80%',
		marginTop: theme.spacing(10),
        overflowX: 'auto'
	},
}));

function DriversList(props) {
    const classes = useStyles();
    const { loading: queryLoading, data, refetch } = useQuery(GET_DRIVERS);
    const [deleteDriver,  { loading: mutationLoading }] = useMutation(DELETE_DRIVER);  
    
    const deleteAction = driverId => deleteDriver({ variables: { id: driverId } });
    const editAction = (driverId, driver) => props.history.push(`/drivers/edit/${driverId}`, driver);
    
    if(!mutationLoading){
        refetch();
    }
  
    return (
      	<div align="center">
		{
            !queryLoading ?
                <Paper className={classes.root}>
                    <div align="left" className="list-header">
                        <Typography variant="h5" component="h2">
                            Drivers
                        </Typography>
                        <Link component={RouterLink} to={`/drivers/new`}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                New Driver
                            </Button> 
                        </Link>
                    </div>                    
                    <DriversTable 
                        drivers={data.drivers}
                        deleteAction={deleteAction}
                        editAction={editAction}
                    />
                </Paper>
			: <LinearProgress />
		}
      	</div>
    );
}
  
export default DriversList;
  