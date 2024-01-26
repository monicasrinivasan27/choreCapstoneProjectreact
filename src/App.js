import logo from './logo.svg';
import './App.css';
import RewardManagement from './components/RewardManagement';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import AddReward from './components/AddReward';


const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
  {
    path: "/allrewards",
    element: <>
    <HeaderComponent />
    <RewardManagement />
    </>
  },
  {
    path: "/addRewards",
    element: <>
    <AddReward />
    </>
  }
]);

  const App = () => {
    return (
      <RouterProvider router={router} />
    );
  };


export default App;
