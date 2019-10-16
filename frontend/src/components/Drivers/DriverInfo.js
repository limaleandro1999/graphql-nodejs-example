import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function DriverInfo(props) {
    const {
        name,
        dateCreation
    } = props.driver;

    return (
        <>
            <Typography variant="h5" component="h3">
                Name: {name}
            </Typography>
            <Typography component="p">
                Creation date: {new Date(dateCreation).toLocaleDateString()}
            </Typography>
        </>
    );
}
