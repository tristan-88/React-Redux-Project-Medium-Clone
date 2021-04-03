import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
//import LoginFormPage from "./components/LoginFormModal";
import Navigation from './components/Navigation'
import MainPage from './components/MainPage'
import SplashPage from './components/SplashPage'
import CardPage from './components/CardPage'
import * as sessionActions from './store/session';


function App() {
  const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

  return (
		<>
			<Navigation isLoaded={isLoaded}></Navigation>
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<SplashPage />
					</Route>
					<Route exact path="/mainpage">
						<MainPage />
				  </Route>
				  <Route exact path='/card/:id'>
					  <CardPage/>
				  </Route>
				</Switch>
			)}
		</>
	);
}

export default App;
