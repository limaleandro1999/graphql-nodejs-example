import React, {
    useState
} from 'react';

import { useMutation } from '@apollo/react-hooks';
import { CREATE_RIDE } from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RideForm from '../../components/Rides/RideForm';
import LinearProgress from '@material-ui/core/LinearProgress';

import '../Drivers/driver.css';

const useStyles = makeStyles(theme => ({
	root: {
		width: '80%',
		marginTop: theme.spacing(10),
        overflowX: 'auto'
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    }
}));

export default function RideNew(props) {
    const classes = useStyles();
    const [createRide, { loading, data }] = useMutation(CREATE_RIDE);
    const [ride, setRide] = useState({
       from: '',
       to: '',
       value: 0,
       driverId: props.history.location.state.driverId
    });
        
    const onSubmit = () => {        
        createRide({ variables: { input: ride } });
    };

    if(!loading && data){
        props.history.push(`/drivers/${ride.driverId}`);
    }

    return (
        <div align="center">
            {loading ? <LinearProgress /> : null}
            <Paper className={classes.root}>
                <div align="left" className="list-header">
                    <Typography variant="h5" component="h2">
                        New Ride
                    </Typography>
                </div>
                <RideForm 
                    ride={ride}
                    setRide={setRide}
                    onSubmit={onSubmit}
                />
            </Paper>
        </div>
    );
}
