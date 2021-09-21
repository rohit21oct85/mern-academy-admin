import AdminLogin from '../pages/admin/auth/Login'
import Dashboard from '../pages/admin/Dashboard';

export const webRoutes =  [
      { 
            path:'/',
            component: AdminLogin
      },
      { 
            path:'/admin/login',
            component: AdminLogin
      }
];

export const privateRoutes = [
      {
          path: '/:user_type?/dashboard',
          component: Dashboard
      },
      {
          path: '/admin',
          component: Dashboard
      }
]