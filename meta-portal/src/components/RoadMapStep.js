import { Swiper, SwiperSlide } from "swiper/react";
import { roadMapProps } from "../sliderProps";
const RoadMapSlider = () => {
  return (
    <section id="roadmap">
      <div className="container">
        <h3
          className="fn__maintitle big"
          data-text="GOALS"
          data-align="center"
        >
          GOALS
        </h3>
        <div className="fn_cs_roadmap">
          <div className="step_holder">
            <div className="step_in" />
          </div>
          <div className="slider_holder">
            <Swiper {...roadMapProps} className="swiper-container">
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 01</span>
                    <div className="item_in">
                      <p className="date">START!</p>
                      <h3 className="title">Get your mixes</h3>
                      <p className="desc">
                      We started with an intense advertising campaign 
                      The Jinglers community on Discord is growing! 
                      First dynamics, airdrops, contests, invitations and more.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 02</span>
                    <div className="item_in">
                      <p className="date">Q3 2023</p>
                      <h3 className="title">We are already 1000!</h3>
                      <p className="desc">
                      We are already 1000 Meet the representative Jingle of the first collection! 
                      youtube channel opens and most of the capital earned on youtube is burned in shiba inu, get your mix
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 03</span>
                    <div className="item_in">
                      <p className="date">Q4 2023</p>
                      <h3 className="title">Presale date</h3>
                      <p className="desc">
                      The official Cryptojingle website opens. audiovisual sneak peeks. 
                      AI generation contests to get special mixes
                      The mixes obtained are delivered and the official 
                      date for the first pre-sale is released
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 04</span>
                    <div className="item_in">
                      <p className="date">Q1 2024</p>
                      <h3 className="title">let's start, good luck</h3>
                      <p className="desc">
                      The first private sale for the winners of the Mixes tokens begins, 
                      good luck! check your jingle, you probably have a prize waiting. 
                      dates and dynamics for the second private sale. We will create +
                      special editions of Jingles with a collaborative and voting approach
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 05</span>
                    <div className="item_in">
                      <p className="date">Q2 2024</p>
                      <h3 className="title">be part of something big and enjoy</h3>
                      <p className="desc">
                      the second pre-sale and its random gifts are launched. 
                      We integrated the Create your shib option on the page. 
                      it's time to vote and shape your own collection. 
                      AI Integration for tools is done
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 06</span>
                    <div className="item_in">
                      <p className="date">Q2 2024</p>
                      <h3 className="title">The community expands and we open the doors to the world</h3>
                      <p className="desc">
                      If you were part of the start this is just the beginning! And if you are new, 
                      don't miss the news, the contests, the gifts, participate and enjoy while you 
                      become part of the innovation in the audiovisual industry.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 07</span>
                    <div className="item_in">
                      <p className="date">Q3 2024</p>
                      <h3 className="title">You are not customers, you are collectors and partners.</h3>
                      <p className="desc">
                      That's right, all jinglers are partners, collectors and have different percentages 
                      of profit throughout the growth of the project! Earnings for musical, youtube, CASINO royalties! 
                      and the different ways that the team will implement. 
                      Your rarity, the number of Jingles you have and your participation in the community will define your earnings.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RoadMapSlider;
