import { Application } from 'express';

const logRoutes = (app: Application) => {
  app._router.stack.forEach((middleware:any) => {
    if (middleware.route) { // Routes registered directly on the app
      console.log(middleware.route);
    } else if (middleware.name === 'router') { // Router middleware
      middleware.handle.stack.forEach((handler:any) => {
        if (handler.route) {
          const route = handler.route;
          const methods = Object.keys(route.methods).join(', ').toUpperCase();
          console.log(`${methods} ${route.path}`);
        }
      });
    }
  });
};

export default logRoutes;
