import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'
import Customer from './components/customer/Dashboard'
import Request from './components/customer/Request'
import Evaluation from './components/customer/Evaluation'
import CancelRequest from './components/customer/CancelRequest'
import OrderRequest from './components/customer/OrderRequest'
import Order from './components/customer/Order'
import Employee from './components/employee/Dashboard'
import Payment from './components/employee/Payment'
import Repairman from './components/employee/Repairman'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '*',
            redirect: '/notfound'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/notfound',
            component: NotFound
        },
        {
            path: '/customer/:user',
            component: Customer,
            children: [
                {
                    path: '',
                    redirect: 'order'
                },
                {
                    path: 'request',
                    component: Request
                },
                {
                    path: 'evaluation',
                    component: Evaluation
                },
                {
                    path: 'cancel',
                    component: CancelRequest
                },
                {
                    path: 'order',
                    component: OrderRequest
                },
                {
                    path: ':req',
                    component: Order
                }
            ],
        },
        {
            path: '/employee/:user',
            component: Employee,
            children: [
                {
                    path: '',
                    redirect: 'payment'
                },
                {
                    path: 'payment',
                    component: Payment
                },
                {
                    path: 'repairman',
                    component: Repairman
                }
            ],
        }
    ]
})

export default router