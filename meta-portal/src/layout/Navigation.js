import Link from "next/link";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { navigationToggle } from "../redux/actions/siteSettings";
const Navigation = ({ navigation, navigationToggle }) => {
  const [subMenu, setSubMenu] = useState(null);
  return (
    <Fragment>
      <div
        onClick={() => navigationToggle(false)}
        className={`metaportal_fn_leftnav_closer ${navigation ? "active" : ""}`}
      />
      <div className={`metaportal_fn_leftnav ${navigation ? "active" : ""}`}>
        <a
          href="#"
          className="fn__closer"
          onClick={() => navigationToggle(false)}
        >
          <span />
        </a>
        <div className="navbox">
          <div className="list_holder">
            <ul className="metaportal_fn_items">
              <li>
                <div className="item">
                  <a
                    href="https://opensea.io/"
                    target="_blank"
                    rel="noreferrer"
                  />
                  <span className="icon">
                    <img src="/img/market/opensea.png" alt="" />
                  </span>
                  <span className="text">Opensea</span>
                </div>
              </li>
              <li>
                <div className="item">
                  <a
                    href="https://discord.com/invite/hEExQyqPd9"
                    target="_blank"
                    rel="noreferrer"
                  />
                  <span className="icon">
                    <img src="/img/market/discord.png" alt="" />
                  </span>
                  <span className="text">Discord</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="nav_holder">
            {/* For JS */}
            <span className="icon">
              <img src="/svg/down.svg" alt="" className="fn__svg" />
            </span>
            {/* For JS */}
            <ul
              style={{
                transform: `translateX(${subMenu !== null ? "-100" : "0"}%)`,
              }}
            >
<li>
                <Link href="/nft/1">
                  <a onClick={() => navigationToggle(false)}>
                    <span className="creative_link">Home</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/nft/1">
                  <a onClick={() => navigationToggle(false)}>
                    <span className="creative_link">Galery</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/Galery">
                  <a onClick={() => navigationToggle(false)}>
                    <span className="creative_link">Get Mixes</span>
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSubMenu("TOOLS");
                  }}
                  className={`${subMenu == "TOOLS" ? "active" : ""}`}
                >
                  <span className="creative_link">
                    Tools
                    <img src="/svg/down.svg" alt="" className="fn__svg" />
                  </span>
                </a>
                <ul className="sub-menu">
                  <li>
                    <a
                      href="#"
                      className="prev"
                      onClick={() => setSubMenu(null)}
                    >
                      <span className="creative_link">
                        <img src="/svg/down.svg" alt="" className="fn__svg" />
                        TOOLS
                      </span>
                    </a>
                  </li>

                  <li>
                    <Link href="/coming-soon">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">Create your Shib (comming soon)</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/404">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">Vote for best Shib</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/protected">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">Afinity</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/no-results">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">Shasino</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">Artist? Collaborate with us</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/policy">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">Privacy Policy</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-conditions">
                      <a onClick={() => navigationToggle(false)}>
                        <span className="creative_link">
                          Terms &amp; Conditions
                        </span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/blog">
                  <a onClick={() => navigationToggle(false)}>
                    <span className="creative_link">Licenses and Copyright</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog-single">
                  <a onClick={() => navigationToggle(false)}>
                    <span className="creative_link">Terms &amp; Conditions</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="info_holder">
            <div className="copyright">
              <p>
                Copyright 2022 - Designed &amp; Developed by{" "}
                <a
                  href="https://themeforest.net/user/codeefly/portfolio"
                  target="_blank"
                  rel="noreferrer"
                >
                  CodeeFly
                </a>
              </p>
            </div>
            <div className="social_icons">
              <ul>
                <li>
                  <a href="#">
                    <img
                      src="/svg/social/twitter-1.svg"
                      alt=""
                      className="fn__svg"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="/svg/social/facebook-1.svg"
                      alt=""
                      className="fn__svg"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="/svg/social/instagram-1.svg"
                      alt=""
                      className="fn__svg"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="/svg/social/pinterest-1.svg"
                      alt=""
                      className="fn__svg"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="/svg/social/behance-1.svg"
                      alt=""
                      className="fn__svg"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  navigation: state.site.navigation,
});
export default connect(mapStateToProps, { navigationToggle })(Navigation);
