import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../../pages/Drivers/driver.css';

export default function RideForm(props) {
    const {
        from,
        to,
        value
    } = props.ride

    return (    
        <div className="form-container">
            <FormControl>
                <InputLabel>From</InputLabel>
                <Input
                    label="from"
                    value={from}
                    onChange={event => props.setRide({ ...props.ride, from: event.target.value })}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                />
            </FormControl>
            <FormControl>
                <InputLabel>To</InputLabel>
                <Input
                    label="to"
                    value={to}
                    onChange={event => props.setRide({ ...props.ride, to: event.target.value })}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                />
            </FormControl>
            <TextField
                label="value"
                value={value}
                onChange={event => props.setRide({ ...props.ride, value: parseFloat(event.target.value) })}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button 
                variant="contained" 
                color="primary"
                onClick={props.onSubmit}
            >
                Save
            </Button> 
        </div>
    );
}
