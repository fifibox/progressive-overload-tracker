import { createBrowserRouter } from 'react-router';
import WorkoutForm from './components/WorkoutForm.jsx';
import View from './components/View.jsx';
import History from './components/History.jsx'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <WorkoutForm />,
  },
  {
    path: "/view",
    element: <View />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "*",
    element: (
      <div className="text-center mt-20 text-slate-500">
        <div>Page not found</div>
        <div className="mt-4 flex flex-col items-center gap-2">
          <a href="/" className="text-blue-500 underline">Back to log workout</a>
          <a href="/view" className="text-blue-500 underline">Back to view exercise</a>
          <a href="/history" className="text-blue-500 underline">Back to view History</a>
        </div>
      </div>
    ),
  }
]);

export default router;