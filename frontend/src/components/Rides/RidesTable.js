import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	table: {
		minWidth: 350,
	},
}));

export default function RidesTable(props) {
	const {
		rides
	} = props;

	const classes = useStyles();

  return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Value</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rides.map((rides, index) => (
						<TableRow key={index}>
							<TableCell>{rides.from}</TableCell>
                            <TableCell>{rides.to}</TableCell>
                            <TableCell>{rides.value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
  );
}