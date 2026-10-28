import { getTHemeOption , getMenus} from "@/lib/api/options";
import Button from "../ui/Button";
import {getInternalPath} from "../../../helper/helperFunction"
import Link from "next/link";

async function Header(){

  const {footer_logo,footer_left_text,title_diensten,title_bedrijf,title_volgons,linkedin_url,facebook_url,instagram_url,copyright_text} = await getTHemeOption()
  const data = await getMenus();
   const { diensten,bedrijf,privacy } = data;

  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="inner-part">
          <div className="top-footer">
            <div className="left-part">
              <div className="logo">
                <a href="/">
                  <img src={footer_logo ? footer_logo : "/logo.svg"} alt="wordpresswebshop" />
                </a>
              </div>
              {footer_left_text && <p>{footer_left_text}</p>}

            </div>
            <div className="right-part">
               {diensten.items.length > 0  &&
              <div className="footer-card link1">
                {title_diensten && <h2>{title_diensten}</h2>}
                <ul>
                  {diensten?.items?.map((item) => (
                    <li
                      key={item.id}
                      id={`menu-item-${item.id}`}
                      className={`menu-item menu-item-${item.id}`}
                    >
                      <a href={getInternalPath(item.url)}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
               }
              {bedrijf.items.length > 0  &&
              <div className="footer-card link2">
                {title_bedrijf && <h2>{title_bedrijf}</h2>}
                <ul>
                  {bedrijf?.items?.map((item) => (
                    <li
                      key={item.id}
                      id={`menu-item-${item.id}`}
                      className={`menu-item menu-item-${item.id}`}
                    >
                      <a href={getInternalPath(item.url)}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              }
             
              <div className="footer-card social-link">
                {title_volgons && <h2>{title_volgons}</h2>}
                <ul>
                  {linkedin_url && (
                    <li>
                      <a href={linkedin_url} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </li>
                  )}
                  {facebook_url && (
                    <li>
                      <a href={facebook_url} target="_blank" rel="noopener noreferrer">
                        Facebook
                      </a>
                    </li>
                  )}
                  {instagram_url && (
                    <li>
                      <a href={instagram_url} target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                    </li>
                  )}
                </ul>
              </div>
      
            </div>
          </div>
          <div className="bottop-footer">
            <div className="left-text">
              {copyright_text && <p>{copyright_text}</p>}
            </div>
            {privacy.items.length > 0 &&
            <div className="right-menu">
              <ul>
                {privacy?.items?.map((item) => (
                  <li
                    key={item.id}
                    id={`menu-item-${item.id}`}
                    className={`menu-item menu-item-${item.id}`}
                  >
                    <a href={getInternalPath(item.url)}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
             }
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Header;