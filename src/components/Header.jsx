import classes from './Header.module.css'

const Header=()=>{
    return(
        <header className={classes.header}>
            <h1 className={classes.title}>CustomerManagement</h1>
        </header>
    );
}

export default Header;