import { PUBLIC_POCKETBASE_URL } from "$env/static/public";	


export const navLinks = [
	{
		name: 'Home',
		href: '/',
		icon: 'material-symbols:home',
		new: false
	},

	{
		name: 'Forums',
		href: '/forums',
		icon: 'material-symbols:forum',
		new: false
	},

	{
		name: 'Characters',
		href: '/characters',
		icon: 'material-symbols:person',
		new: false
	},

	{
		name: 'Wanted Ads',
		href: '/wanted-ads',
		icon: 'material-symbols:money',
		new: false
	},

	{
		name: 'Threads',
		href: '/threads',
		icon: 'material-symbols:forum',
		new: false
	},

	{
		name: 'Guestbook',
		href: '/guestbook',
		icon: 'fluent-emoji-high-contrast:ledger',
		new: true
	},

	{
		name: 'AI',
		href: '/ai/chat',
		icon: 'simple-icons:openai',
		new: true
	},

	{
		name: 'Profile',
		href: '/my/settings/profile',
		icon: 'mdi-user',
		new: false
	},


	{
		name: 'Security',
		href: '/my/settings/security',
		icon: 'mdi-gear',
		new: false
	},

	{
		name: 'PB Admin',
		href: `${PUBLIC_POCKETBASE_URL}/_/`,
		icon: 'simple-icons:pocketbase',
		new: false
	},

]