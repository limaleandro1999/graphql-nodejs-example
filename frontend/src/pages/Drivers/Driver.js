import React, { useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_DRIVER } from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DriverInfo from '../../components/Drivers/DriverInfo';
import RidesTable from '../../components/Rides/RidesTable';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import './driver.css';

const useStyles = makeStyles(theme => ({
	root: {
		width: '80%',
		marginTop: theme.spacing(10),
        overflowX: 'auto'
	},
}));

export default function Driver(props) {
    const classes = useStyles();
    const { loading, data, refetch } = useQuery(GET_DRIVER, { variables: { id: props.match.params.id } });

    useEffect(() => {
        refetch();
    }, [refetch])

    return (
        <div align="center">
            { 
                !loading ?
                    <Paper className={classes.root}>
                        <div align="left" className="list-header">
                            <Typography variant="h4" component="h1">
                                Driver Info
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => props.history.push('/ride/new', { driverId: data.driver.id })}
                            >
                                New Ride
                            </Button> 
                        </div>
                        <div align="left" className="info-container">
                            <DriverInfo 
                                driver={data.driver}
                            />
                        </div>
                        <div align="left" className="info-container">
                            <Typography variant="h5" component="h2">
                                Rides
                            </Typography>
                        </div>
                        {
                            data.driver.rides.length > 0 
                            ? 
                                <RidesTable 
                                    rides={data.driver.rides}
                                />
                            : <p>No rides found</p>
                        }
                        
                    </Paper>
                : <LinearProgress />
            }    
        </div>
    );
}