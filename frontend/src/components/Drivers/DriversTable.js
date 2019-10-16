import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	table: {
		minWidth: 408,
	},
}));

export default function DriversTable(props) {
	const classes = useStyles();
	const {
		drivers,
		deleteAction,
		editAction
	} = props;

  return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Rides Count</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{drivers.map(driver => (
						<TableRow key={driver.name}>
							<TableCell>{driver.name}</TableCell>
							<TableCell>{driver.countRides}</TableCell>
							<TableCell>
								<Link component={RouterLink} to={`/drivers/${driver.id}`}>
									<IconButton>
										<FindInPageIcon/>
									</IconButton>
								</Link>
								<IconButton
									onClick={() => editAction(driver.id, driver)}
								>
									<EditIcon/>
								</IconButton>
								<IconButton
									onClick={() => deleteAction(driver.id)}
								>
									<DeleteIcon/>
								</IconButton>									
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
  );
}