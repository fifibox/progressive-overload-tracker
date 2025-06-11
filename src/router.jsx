import { createHashRouter } from 'react-router';
import Layout from './components/Layout.jsx';
import WorkoutForm from './components/WorkoutForm.jsx';
import View from './components/View.jsx';
import History from './components/History.jsx';

const router = createHashRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '', element: <WorkoutForm /> },
			{ path: 'view', element: <View /> },
			{ path: 'history', element: <History /> },
			{
				path: '*',
				element: (
					<div className="text-center mt-20 text-slate-500">
						<div>Page not found</div>
					</div>
				),
			},
		],
	},
]);

export default router;