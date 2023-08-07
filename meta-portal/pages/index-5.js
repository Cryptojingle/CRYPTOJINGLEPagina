import { Swiper, SwiperSlide } from "swiper/react";
import { About2 } from "../src/components/About";
import Collection from "../src/components/Collection";
import Contact from "../src/components/Contact";
import Faq from "../src/components/Faq";
import News from "../src/components/News";
import RoadMapSlider from "../src/components/RoadMapStep";
import SectionDivider from "../src/components/SectionDivider";
import Layout from "../src/layout/Layout";
import ParticlesBackground from "../src/ParticlesBackground";
import { Hero4Slider } from "../src/sliderProps";
const Index5 = () => {
  return (
    <Layout pageTitle={"Home #5"}>
      <section id="hero4">
        <div
          className="fn_cs_hero_slider ripple"
          data-ratio="1.33"
          id="ripple"
          data-bg-img="/img/bg4.jpg"
        >
          <div className="bg_overlay"></div>
          <div className="left_part">
            <h3 className="fn__maintitle big" data-text="Cryptojingle">
              Cryptojingle
            </h3>
            <p>
            The audiovisual jingles called Jinglers, are inspired by the blockchain ecosystem, 
             this first edition seeks to unite the #ShibArmy community and artists from around the world through exclusive jingles 
             representing musical and visual rarities. We offer a friendly and accessible platform, with PayPal payments, 
             the creation of your soundbooks, as well as granting IP licenses and commercial rights to empower creators and foster 
            community growth.
            </p>
            <a
              href="https://opensea.io/"
              className="metaportal_fn_button"
              target="_blank"
              rel="noreferrer"
            >
              <span>Buy On Opensea</span>
            </a>
          </div>
          <div className="slider_part">
            <Swiper {...Hero4Slider} className="swiper-container">
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/1.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/2.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/3.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                      <a
                        className="popup-youtube metaportal_fn_videobutton"
                        href="https://www.youtube.com/embed/7e90gBu4pas"
                      >
                        <img src="/svg/play.svg" alt="" className="fn__svg" />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/4.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/5.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/6.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/7.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/8.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/9.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="/img/drops/10.jpg"
                        style={{}}
                      />
                      <img src="/img/1x1.jpg" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
          <ParticlesBackground />
        </div>
      </section>
      {/* !Home Section #2 */}
      {/* Section About #2 */}
      <About2 />
      {/* !Section About #2 */}
      {/* Section Divider */}
      <SectionDivider />
      {/* !Section Divider */}
      {/* Collection Section */}
      <Collection />
      {/* !Collection Section */}
      {/* Section Divider */}
      <SectionDivider />
      {/* !Section Divider */}
      {/* Section FAQ */}
      <Faq />
      {/* !Section FAQ */}
      {/* Section Divider */}
      <SectionDivider />
      {/* !Section Divider */}
      {/* Section RoadMap */}
      <RoadMapSlider />
      {/* !Section RoadMap */}
      {/* Section Divider */}
      <SectionDivider />
      {/* !Section Divider */}
      {/* Section News */}
      <News />
      {/* !Section News */}
      {/* Section Divider */}
      <SectionDivider />
      {/* !Section Divider */}
      {/* Section */}
      <Contact />
    </Layout>
  );
};
export default Index5;
