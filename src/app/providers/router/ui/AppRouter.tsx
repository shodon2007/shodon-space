import {memo, Suspense, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {
	globalRoute,
	privateRoutes,
	publicRoutes,
} from "src/shared/config/routeConfig";
import {renderRoutes} from "../model/renderRouter";
import {useUser} from "src/entities/user";

const AppRouter = memo(() => {
	const user = useUser();

	if (user.isUserDataLoading) {
		return <div>Loading</div>;
	}

	return (
		// <Suspense>
		<Routes>
			<Route path={globalRoute.path} element={globalRoute.element}>
				{user.isAuth ? renderRoutes(privateRoutes) : renderRoutes(publicRoutes)}
			</Route>
		</Routes>
		// </Suspense>
	);
});

export default AppRouter;
