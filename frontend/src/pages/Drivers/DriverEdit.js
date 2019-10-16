import React, {
    useState,
    useEffect
} from 'react';

import { useMutation } from '@apollo/react-hooks';
import { UPDATE_DRIVER } from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DriverForm from '../../components/Drivers/DriverForm';
import LinearProgress from '@material-ui/core/LinearProgress';

import moment from 'moment';

import './driver.css';

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

export default function DriverEdit(props) {
    const classes = useStyles();
    const [updateDriver, { loading, data }] = useMutation(UPDATE_DRIVER);
    const [driver, setDriver] = useState({
        id: null, 
        name: '',
        dateCreation: moment(new Date()).format('YYYY-MM-DD')
    });
        
    const onSubmit = () => {
        updateDriver({ variables: { id: driver.id, input: { ...driver, id: undefined } } });
    };

    useEffect(() => {
        const {
            name,
            dateCreation,
            id,
        } = props.history.location.state;

        const driverInfo = { name, dateCreation, id };

        setDriver(driverInfo);
    }, [props.history.location.state]);

    if(!loading && data){
        props.history.push(`/drivers/${driver.id}`);
    }

    return (
        <div align="center">
            {loading ? <LinearProgress /> : null}
            <Paper className={classes.root}>
                <div align="left" className="list-header">
                    <Typography variant="h5" component="h2">
                        Edit Driver
                    </Typography>
                </div>
                <DriverForm 
                    driver={driver}
                    setDriver={setDriver}
                    onSubmit={onSubmit}
                />
            </Paper>
        </div>
    );
}
