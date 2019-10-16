import React, {
    useState
} from 'react';

import { useMutation } from '@apollo/react-hooks';
import { CREATE_DRIVER } from '../../services/api';
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

export default function DriverNew(props) {
    const classes = useStyles();
    const [createDriver, { loading, data }] = useMutation(CREATE_DRIVER);
    const [driver, setDriver] = useState({
       name: '',
       dateCreation: moment(new Date()).format('YYYY-MM-DD')
    });

    const onSubmit = () => {
        createDriver({ variables: { input: driver } });
    };

    if(!loading && data){
        props.history.push(`/drivers/${data.createDriver.id}`);
    }

    return (
        <div align="center">
            {loading ? <LinearProgress /> : null}
            <Paper className={classes.root}>
                <div align="left" className="list-header">
                    <Typography variant="h5" component="h2">
                        New Driver
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
