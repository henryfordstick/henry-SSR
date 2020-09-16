import * as React from "react";
import {RouteProps,Switch,Route,Redirect} from "react-router-dom";
import Loading from "@components/Loading";
import NotFound from "@components/NotFound";
import Header from "@components/Header";
import Footer from "@components/Footer";


const {Suspense,lazy} = React;

interface Props extends RouteProps{
  auth?: boolean
}

const routes:Props[] = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@pages/Index')),
    auth: true
  },
  {
    path: '/about',
    exact: true,
    component: lazy(() => import('@pages/About'))
  },
];

const Routes = () => (
  <>
    <Header/>
    <Suspense fallback={<Loading/>}>
      <Switch>
        {
          routes.map((r,i) => {
            const {path,exact,component} = r;
            const LazyCom = component;

            return (
              <Route
                key={i}
                path={path}
                exact={exact}
                // @ts-ignore
                render={props => <LazyCom {...props}/>}
              />
            );
          })
        }
        <Route component={NotFound} />
      </Switch>

    </Suspense>
    {/*<Footer/>*/}
  </>

);

export default Routes;
