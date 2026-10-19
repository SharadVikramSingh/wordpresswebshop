function Header(){
  return (
    <header className="header">
        <div className="wrapper">
          <div className="inner-part">
            {/* Logo */}
            <div className="logo">
              <a href="/">
                <img src="http://localhost/wordpresswebshop/wp-content/themes/wordpresswebshop/images/logo.svg" alt="wordpresswebshop" />
              </a>
            </div>
            <div className="right_part">
              {/* navigation */}
              <nav className="navigation">
                <ul id="menu-header-main-menu" className="menu"><li id="menu-item-66" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-66"><a href="/diensten">Diensten</a></li>
                  <li id="menu-item-30" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-30"><a href="http://localhost/wordpresswebshop/werkwijze/">Werkwijze</a></li>
                  <li id="menu-item-29" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29"><a href="http://localhost/wordpresswebshop/portfolio/">Portfolio</a></li>
                  <li id="menu-item-31" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-31"><a href="http://localhost/wordpresswebshop/blog/">Blog</a></li>
                  <li id="menu-item-27" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-27"><a href="http://localhost/wordpresswebshop/contact/">Contact</a></li>
                  <li id="menu-item-69" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-69"><a href="http://localhost/wordpresswebshop/about/">About</a></li>
                </ul>                  </nav>
              <a className="btn_one" href="http://localhost/wordpresswebshop/portfolio/" target="_self">Start Een Project</a>
              {/* menubar */}
              <div className="menubar">
                <span />
                <span />
                <span />
              </div>
            </div>            
          </div>
        </div>
      </header>
  )
}

export default Header;