import { getTHemeOption , getMenus} from "@/lib/api/options";
import Button from "../ui/Button";
import {getInternalPath} from "../../../helper/helperFunction"
import Link from "next/link";
import Image from "next/image";

async function Header(){

  const {site_logo,project_link} = await getTHemeOption()
  const data = await getMenus();
   const { primary } = data;
   console.log(primary)

  return (
    <header className="header">
        <div className="wrapper">
          <div className="inner-part">
            {/* Logo */}
            <div className="logo">
         
               <Link href="/" >
                  <Image
                  src={site_logo}
                  alt="wordpresswebshop"
                  fill
                  />
                {/* <img src={site_logo ? site_logo : "/logo.svg"} alt="wordpresswebshop" /> */}
              </Link>
            </div>
            <div className="right_part">
              {/* navigation */}
                  <nav className="navigation">
                    <ul id="menu-header-main-menu" className="menu">
                      {primary?.items?.map((item) => (
                        <li
                          key={item.id}
                          id={`menu-item-${item.id}`}
                          className={`menu-item menu-item-${item.id}`}
                        >
                          <a href={getInternalPath(item.url)}>{item.title}</a>

                          {item.children?.length > 0 && (
                            <ul className="sub-menu">
                              {item.children.map((child) => (
                                <li
                                  key={child.id}
                                  id={`menu-item-${child.id}`}
                                  className={`menu-item menu-item-${child.id}`}
                                >
                                  <a href={getInternalPath(child.url)}>{child.title}</a>

                                  {child.children?.length > 0 && (
                                    <ul className="sub-menu">
                                      {child.children.map((nested) => (
                                        <li key={nested.id}>
                                          <a href={getInternalPath(nested.url)}>{nested.title}</a>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
         
              {project_link && <Link className="btn_one" href={getInternalPath(project_link.url)} target={project_link.target ? project_link.target : "_self"} >{project_link.title}</Link> }
            
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