// Header.js
import { useMemo } from "react";
import PropTypes from "prop-types";

const Header = ({
  className = "",
  propWidth,
  propRight,
  button,
  button1,
  button2,
  text,
}) => {
  const headerStyle = useMemo(() => {
    return {
      width: propWidth,
      right: propRight,
      zIndex: 1000, // Ensure the header is above other content
    };
  }, [propWidth, propRight]);

  return (
    <div
      className={`fixed h-[68px] z-40 bg-white w-full flex flex-row items-center justify-between py-boundvariablesdata10 px-boundvariablesdata5 text-left text-[0.75rem] text-white font-semibold border-b-[1px] border-solid border-black-10 ${className}`}
      style={headerStyle}
    >
      <div className="flex flex-row items-center justify-start gap-[0.5rem]">
        <div className="rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center p-[0.25rem] relative gap-[0.25rem]">
            <div className="rounded-radius-8 flex flex-row items-center justify-center z-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/sidebar.svg"
              />
            </div>
            <div className="!m-[0] absolute top-[calc(50%_+_18px)] left-[calc(50%_-_46px)] [backdrop-filter:blur(40px)] rounded-boundvariablesdata4 bg-black-80 flex flex-row items-center justify-start py-boundvariablesdata2 px-boundvariablesdata1 opacity-[0] z-[1]">
              <div className="rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
                <div className="relative leading-[1.125rem]">Sidebar</div>
                <div className="relative text-[0.875rem] leading-[1.25rem] text-white-40">
                  ⌘S
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center p-[0.25rem] relative gap-[0.25rem]">
            <div className="rounded-radius-8 flex flex-row items-center justify-center z-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/star.svg"
              />
            </div>
            <div className="!m-[0] absolute top-[calc(50%_+_18px)] left-[calc(50%_-_50px)] [backdrop-filter:blur(40px)] rounded-boundvariablesdata4 bg-black-80 flex flex-row items-center justify-start py-boundvariablesdata2 px-boundvariablesdata1 opacity-[0] z-[1]">
              <div className="rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
                <div className="relative leading-[1.125rem]">Favorites</div>
                <div className="relative text-[0.875rem] leading-[1.25rem] text-white-40">
                  ⌘F
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem] text-center text-[0.875rem] text-black-40">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center py-boundvariablesdata2 px-boundvariablesdata1">
            <div className="rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Dashboards
              </div>
            </div>
          </div>
          <div className="rounded-boundvariablesdata4 hidden flex-col items-start justify-center text-left text-black-20">
            <div className="self-stretch relative leading-[1.25rem]">/</div>
          </div>
          <div className="rounded-boundvariablesdata4 hidden flex-row items-center justify-center py-boundvariablesdata2 px-boundvariablesdata1 text-black-100">
            <div className="rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Default
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-[1.25rem] text-[0.875rem] text-black-20">
        <div className="w-[10rem] rounded-boundvariablesdata4 bg-black-5 overflow-hidden shrink-0 flex flex-row flex-wrap items-center justify-between py-boundvariablesdata2 px-[0.5rem] box-border">
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.25rem]">
            <div className="rounded-radius-8 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata13 relative h-boundvariablesdata13"
                alt=""
                src="/search1.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Search
              </div>
            </div>
          </div>
          <div className="rounded-boundvariablesdata4 flex flex-col items-start justify-center">
            <div className="self-stretch relative leading-[1.25rem]">⌘/</div>
          </div>
        </div>
        <div className="rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem] text-[0.75rem] text-white">
          <div className="rounded-boundvariablesdata4 hidden flex-row items-center justify-center p-[0.25rem] relative gap-[0.25rem]">
            <div className="rounded-radius-8 flex flex-row items-center justify-center z-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/sun.svg"
              />
            </div>
            <div className="!m-[0] absolute top-[calc(50%_+_18px)] left-[calc(50%_-_62.5px)] [backdrop-filter:blur(40px)] rounded-boundvariablesdata4 bg-black-80 flex flex-row items-center justify-start py-boundvariablesdata2 px-boundvariablesdata1 opacity-[0] z-[1]">
              <div className="rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
                <div className="relative leading-[1.125rem]">Toggle theme</div>
                <div className="relative text-[0.875rem] leading-[1.25rem] text-white-40">
                  ⌘T
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-boundvariablesdata4 hidden flex-row items-center justify-center p-[0.25rem] relative gap-[0.25rem]">
            <div className="rounded-radius-8 flex flex-row items-center justify-center z-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/clockcounterclockwise.svg"
              />
            </div>
            <div className="!m-[0] absolute top-[calc(50%_+_18px)] left-[calc(50%_-_50.5px)] [backdrop-filter:blur(40px)] rounded-boundvariablesdata4 bg-black-80 flex flex-row items-center justify-start py-boundvariablesdata2 px-boundvariablesdata1 opacity-[0] z-[1]">
              <div className="rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
                <div className="relative leading-[1.125rem]">Activities</div>
                <div className="relative text-[0.875rem] leading-[1.25rem] text-white-40">
                  ⌘A
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center p-[0.25rem] relative gap-[0.25rem]">
            <div className="rounded-radius-8 flex flex-row items-center justify-center z-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/bell1.svg"
              />
            </div>
            <div className="!m-[0] absolute top-[calc(50%_+_18px)] left-[calc(50%_-_62px)] [backdrop-filter:blur(40px)] rounded-boundvariablesdata4 bg-black-80 flex flex-row items-center justify-start py-boundvariablesdata2 px-boundvariablesdata1 opacity-[0] z-[1]">
              <div className="rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
                <div className="relative leading-[1.125rem]">Notifications</div>
                <div className="relative text-[0.875rem] leading-[1.25rem] text-white-40">
                  ⌘N
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  propWidth: PropTypes.string,
  propRight: PropTypes.string,
  button: PropTypes.bool,
  button1: PropTypes.bool,
  button2: PropTypes.bool,
  text: PropTypes.bool,
};

export default Header;
