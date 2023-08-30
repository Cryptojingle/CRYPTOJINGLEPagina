import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { navigationToggle, walletToggle } from "../redux/actions/siteSettings";
import { stickyNav } from "../utilits";

const Header = ({ walletToggle, navigationToggle }) => {
  useEffect(() => {
    stickyNav();
  }, []);

  return (
    <header id="header">
      <div className="header">
        <div className="header_in">
          <div className="trigger_logo">
            <div className="trigger" onClick={() => navigationToggle(true)}>
              <span />
            </div>
            <div className="logo">
              <Link href="/">
                <a>
                  <img src="/img/logochico.png" alt="" />
                </a>
              </Link>
            </div>
          </div>
          <div className="nav" style={{ opacity: 1 }}>
            <ul>
              <li>
                <Link href="/#home">
                  <a className="creative_link">PLAY</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="creative_link">INFO</a>
                </Link>
              </li>
              <li>
                <Link href="/#collection">
                  <a className="creative_link">COLLECTIBLE SHIBS</a>
                </Link>
              </li>
              <li>
                <Link href="/#roadmap">
                  <a className="creative_link">GOALS</a>
                </Link>
              </li>
              <li>
                <Link href="/#news">
                  <a className="creative_link">NEWS</a>
                </Link>
              </li>
              <li>
                <Link href="/#contact">
                  <a className="creative_link">CONTACT</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="wallet">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                walletToggle(true);
              }}
              className="metaportal_fn_button wallet_opener"
            >
              <span>SIGN IN</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { walletToggle, navigationToggle })(
  Header
);
