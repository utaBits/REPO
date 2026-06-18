import { href  , Link, BrowserRouter  , Routes , Router, Route , useLocation} from "react-router-dom";
import style from './styles/dashboard.module.css' ;
import  officeComponent from './routes/office.jsx' ;
import stockComponent from './routes/stock.jsx' ;
import productsComponent from './routes/products.jsx' ;
import operationsComponent from './routes/operations.jsx' ;
import settingsComponent from './routes/settings.jsx' ;
import homeComponent from './routes/home.jsx' ;
import { Component } from "react";


function Dashboard() {
    const navLinks = [
        {
            label: 'Home', href: '/dashboard/home' , Component: homeComponent
        },
        {
            label: 'Stock', href: '/dashboard/stock' , Component: stockComponent
        },
        {
            label: 'in Office', href: '/dashboard/inOffice' , Component: officeComponent  
        },
        {
            label: 'products', href: '/dashboard/products' , Component: productsComponent
        },
        {
            label: 'Operations', href: '/dashboard/operations' ,  Component: operationsComponent
        },
        {
            label: 'Settings', href: '/dashboard/settings' , Component: settingsComponent
        },

    ]
    const location = useLocation() ;
    const username = localStorage.getItem('username');
  return (
    <div className={style.dashboard}>
        <aside className={style.asideNav}>
            <div className={style.navHeader}>
                <div className={style.logo}></div>
                <div className={style.companyName}>Inventory</div>             
            </div>
            <nav className={style.navLinks}>
                {navLinks.map((link , index ) =>(
                    <Link key={index} to={link.href} className={style.navLink + ' ' + (location.pathname === link.href ? style.active : '')}>{link.label}</Link>
                ))}
            </nav>
            <div className={style.navFooter}>
                <div className={style.profile}>
                    <div className={style.avatar}></div>
                    <span className={style.username}>{username}</span>
                </div>
            </div>
        </aside>
        <main className={style.main}>
            <Routes>
                {navLinks.map((link , index ) =>{
                    const Component = link.Component ;
                    return <Route path={`${link.href}`} element={< Component />} key={index} />
                })}
            </Routes>
        </main>
    </div>
  );
}

export default Dashboard;