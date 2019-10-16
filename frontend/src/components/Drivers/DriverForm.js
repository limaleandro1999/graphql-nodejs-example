import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../../pages/Drivers/driver.css';

export default function DriverForm(props) {
    const {
        name,
        dateCreation,
    } = props.driver

    return (    
        <div className="form-container">
            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input
                    label="Name"
                    value={name}
                    onChange={event => props.setDriver({ ...props.driver, name: event.target.value })}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                />
            </FormControl>
            <TextField
                id="date"
                label="Creation Date"
                type="date"
                value={dateCreation}
                onChange={event => props.setDriver({ ...props.driver, dateCreation: event.target.value })}
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
