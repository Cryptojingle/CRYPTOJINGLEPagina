import Link from "next/link";
const News = () => {
  return (
    <section id="news">
      <div className="container">
        <h3
          className="fn__maintitle big"
          data-text="Jinglers News"
          data-align="center"
        >
          Jinglers News
        </h3>
        {/* News Shotcode */}
        <div className="fn_cs_news">
          <div className="news_part">
            <div className="left_items">
              <div className="blog__item">
                <div className="counter">
                  <span className="cc">
                    <span>01</span>
                  </span>
                </div>
                <div className="meta">
                  <p>Q4 2023 / CryptojingleNews / 4 Comments</p>
                </div>
                <div className="title">
                  <h3>
                    <Link href="/blog-single">
                      <a>games, dynamics and contests to win mixes</a>
                    </Link>
                  </h3>
                </div>
                <div className="image">
                  <Link href="/blog-single">
                    <a>
                      <img src="/img/blog/1.jpg" alt="" />
                    </a>
                  </Link>
                </div>
                <div className="read_more">
                  <Link href="/blog-single">
                    <a>
                      <span>Read More</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="right_items">
              <div className="blog__item">
                <div className="counter">
                  <span className="cc">
                    <span>02</span>
                  </span>
                </div>
                <div className="meta">
                  <p>Q4 2023 / CryptojingleNews / 6 Comments</p>
                </div>
                <div className="title">
                  <h3>
                    <Link href="/blog-single">
                      <a>shib creator beta</a>
                    </Link>
                  </h3>
                </div>
                <div className="read_more">
                  <Link href="/blog-single">
                    <a>
                      <span>Read More</span>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="blog__item">
                <div className="counter">
                  <span className="cc">
                    <span>03</span>
                  </span>
                </div>
                <div className="meta">
                  <p>Q1 2024 / CryptojingleNews / 5 Comments</p>
                </div>
                <div className="title">
                  <h3>
                    <Link href="/blog-single">
                      <a>chat with the creators</a>
                    </Link>
                  </h3>
                </div>
                <div className="read_more">
                  <Link href="/blog-single">
                    <a>
                      <span>Read More</span>
                    </a>
                  </Link>
                </div>
              
              </div>
            </div>
          </div>
          <div className="bottom_part">
            <div className="left_bot">
              <Link href="/blog">
                <a className="metaportal_fn_button full">
                  <span>Read All Articles</span>
                </a>
              </Link>
            </div>
            <div className="right_bot">
              <p>
              We are a team of composers and creators
               who are excited about unique audiovisual ideas on the blockchain.
              </p>
            </div>
          </div>
        </div>
        {/* !News Shotcode */}
      </div>
    </section>
  );
};
export default News;
