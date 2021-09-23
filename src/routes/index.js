import AdminLogin from '../pages/admin/auth/Login'
import Dashboard from '../pages/admin/Dashboard';
import AppSettings from '../pages/admin/AppSettings';

export const webRoutes =  [
      { 
            path:'/',
            component: AdminLogin
      },
      { 
            path:'/:user_type?/login',
            component: AdminLogin
      }
];

export const privateRoutes = [
      {
          path: '/:user_type?/dashboard',
          component: Dashboard
      },
      {
          path: '/:user_type?/app-settings/:page_type?',
          component: AppSettings,
          title: 'App Settings'
      },
]