/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */
const usersRoot = '/users';
const productsRoot = '/products';
const tasksRoot = '/tasks';
export const routesV1 = {
  version: 'v1',
  user: {
    root: usersRoot,
    delete: `${usersRoot}/:id`,
  },
  product: {
    root: productsRoot,
    delete: `${productsRoot}/:id`,
  },
  task: {
    root: tasksRoot,
    delete: `${tasksRoot}/:id`,
  },
};
