/*
React Imports
 */
import React from 'react';
import { Grid } from 'react-loader-spinner';

//Returning Loading Component
export const PageLoader = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '50vh',
				background: '#fff',
			}}
		>
			<Grid
				color="#2a6049"
				height={45}
				width={45}
				ariaLabel="grid-loading"
				radius="12.5"
				visible={true}
				//timeout={3000} //3 secs
			/>
		</div>
	);
};
