import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const menuRes = await fetch('http://localhost:8080/api/v1/menu');
	const menu = await menuRes.json();
	console.log(menu);

	const esRes = await fetch('http://localhost:8080/api/v1/es');
	const es = await esRes.json();
	console.log(es);

	if (menuRes.ok) {
		return {
			menu,
			es
		};
	}

	return {
		status: menuRes.status,
		error: new Error('Could not fetch the menus')
	};
};
