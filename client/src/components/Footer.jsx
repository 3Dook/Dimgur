import React from "react";

import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoInstagram,
  IoIosMailUnread,
} from "react-icons/io";

const Footer = (props) => {
  return (
    <div className="bg-[#f6f6f6] mt-8 pb-4">
      <div className="w-full h-full mt-8 mb-8 pl-8 pr-8 sm:flex sm:justify-center sm:items-center">
        <div className="sm:order-2 sm:w-[45%] sm:self-start sm:pt-8 flex flex-col">
          <h1 className="font-bold text-2xl tracking-[0.35em] uppercase leading-normal pb-4">
            Follow
          </h1>
          <div className="flex flex-wrap sm:flex-1">
            <ul className="w-full flex flex-wrap justify-around">
              <li>
                <a href="#">
                  <IoLogoFacebook size={40} />
                </a>
              </li>
              <li>
                <a href="#">
                  <IoLogoTwitter size={40} />
                </a>
              </li>
              <li>
                <a href="#">
                  <IoLogoGithub size={40} />
                </a>
              </li>
              <li>
                <a href="#">
                  <IoLogoInstagram size={40} />
                </a>
              </li>
              <li>
                <a href="#">
                  <IoIosMailUnread size={40} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 pb-8 sm:w-[90%]" id="contactMe">
          <h1 className="font-bold text-2xl tracking-[0.15em] uppercase leading-normal">
            GET IN TOUCH
          </h1>
          <form>
            <div className="fields flex flex-wrap justify-between">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="w-[48%] bg-[transparent] border-b-2 border-[#c9c9c9] block h-14 my-4"
              ></input>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-[48%] bg-[transparent] border-b-2 border-[#c9c9c9] block h-14 my-4"
              ></input>
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                className="w-full bg-[transparent] border-b-2 border-[#c9c9c9] block mb-8"
              ></textarea>
            </div>
            <div>
              <input
                type="submit"
                name="submitContact"
                id="submitContact"
                placeholder="Submit"
                className="bg-[#585858] text-[#ffffff] rounded cursor-pointer text-bg h-14 tracking-[0.35em] uppercase font-bold text-center px-[1.25em] mb-8"
              ></input>
            </div>
          </form>
          <div>
            <p className="text-1xl font-small">
              Untitled. All rights reversed || design: DDD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
