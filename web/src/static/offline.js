import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles, history } from '../main/Helper';
import Page, { SEO } from '../widget/page';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function Offline() {
	let reason = useQuery().get('reason');
	let uri = useQuery().get('uri').replace(/\?.+/, '');
	let message = reason.includes('fetch') ? 'Sorry, we can\'t reach to server. Please check your connection.' :
		reason.includes('Unexpected') ? 'Sorry, we have problems in our server. Try again later.' :
		'Sorry, there\'s an unexpected error. Please try again later.';
	let classes = useStyles();
	return (
		<Page maxWidth="xs">
			<SEO title="Offline :(" />
			<div className={classes.paper}>
				<Typography variant="h2" gutterBottom>Error :(</Typography>
				<Typography variant="body1">{message}</Typography>
				<Button variant="contained" className={classes.blockButton} onClick={() => history().goBack()}>Go Back</Button>
				<Typography variant="overline" color="textSecondary">{reason}</Typography>
				<Typography variant="overline" color="textSecondary">{uri}</Typography>
			</div>
		</Page>)
}