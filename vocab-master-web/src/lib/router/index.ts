import * as apiRoutes from "./apiRoutes";
import * as pageRoutes from "./pageRoutes";

export const pageRoutesArray = Array.from(Object.values(pageRoutes));
export const apiRoutesArray = Array.from(Object.values(apiRoutes));
export { apiRoutes, pageRoutes };
