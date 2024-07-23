import PropTypes from "prop-types";


const Sidebar = ({ className = "" }) => {
  return (  
<div
      className={`!sticky overflow-y-auto top-[0.25rem] left-[0rem] box-border w-[15.25rem] flex flex-col items-center justify-start p-[1rem] gap-[0.5rem] text-left text-[0.875rem] text-black-100 font-semibold border-r-[1px] border-solid border-black-10 ${className}`}
    >
      <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-boundvariablesdata11 gap-[0.25rem] z-[0]">
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem]">
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-radius-8 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata17 relative rounded-boundvariablesdata18 h-boundvariablesdata17 overflow-hidden shrink-0 object-cover"
                alt=""
                src="/byewind@2x.png"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Client Name
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start py-[0.125rem] px-[0rem] opacity-[0]">
          <div className="self-stretch relative box-border h-[0.063rem] border-t-[1px] border-solid border-black-100" />
        </div>
        <div className="w-[11.25rem] rounded-boundvariablesdata4 hidden flex-row flex-wrap items-center justify-start gap-[0.5rem] text-center text-black-40">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center py-boundvariablesdata2 px-boundvariablesdata1">
            <div className="rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Favorites
              </div>
            </div>
          </div>
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center py-boundvariablesdata2 px-boundvariablesdata1 text-black-20">
            <div className="rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Recently
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem]">
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata13 relative h-boundvariablesdata13"
                alt=""
                src="/dot.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Overview
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem]">
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata13 relative h-boundvariablesdata13"
                alt=""
                src="/dot.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Events
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[11.25rem] hidden flex-col items-start justify-start pt-[0rem] px-[0rem] pb-boundvariablesdata11 box-border gap-[0.25rem] z-[1]">
        <div className="self-stretch rounded-boundvariablesdata4 flex flex-col items-start justify-center py-boundvariablesdata2 px-boundvariablesdata11 text-black-40">
          <div className="self-stretch relative leading-[1.25rem]">
            Dashboards
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 bg-black-5 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/chartpieslice.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center py-[0rem] px-boundvariablesdata2">
              <div className="self-stretch relative leading-[1.25rem]">
                Overview
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/shoppingbagopen.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                eCommerce
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/foldernotch.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Projects
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/bookopen.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Online Courses
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[27.5rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-boundvariablesdata11 box-border gap-[0.25rem] z-[2]">
        <div className="w-[11.25rem] rounded-boundvariablesdata4 h-[1.75rem] hidden flex-col items-start justify-center py-boundvariablesdata2 px-boundvariablesdata11 box-border text-black-40">
          <div className="w-[1.813rem] relative leading-[1.25rem] hidden">
            Pages
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/identificationbadge.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Event Name
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Overview
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Registrations
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Forms
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Designs
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Lunch/Dinner
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">Kit</div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center opacity-[0]">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Event Settings
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/identificationcard.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Account
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/usersthree.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Users
              </div>
            </div>
          </div>
        </div>
        <div className="w-[11.25rem] rounded-boundvariablesdata16 hidden flex-row flex-wrap items-center justify-start p-[0.5rem] box-border gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/notebook.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Blog
              </div>
            </div>
          </div>
        </div>
        <div className="w-[11.25rem] rounded-boundvariablesdata16 hidden flex-row flex-wrap items-center justify-start p-[0.5rem] box-border gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/chatsteardrop.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Social
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-[11.25rem] !m-[0] absolute bottom-[1.25rem] left-[calc(50%_-_90px)] [backdrop-filter:blur(40px)] rounded-boundvariablesdata4 hidden flex-col items-center justify-start p-[0.5rem] box-border z-[3]">
        <div className="w-[4.625rem] relative h-[1.25rem]">
          <img
            className="absolute h-[43%] w-[67.57%] top-[28.5%] right-[0%] bottom-[28.5%] left-[32.43%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/snowui-logo.svg"
          />
          <img
            className="absolute h-full w-[26.62%] top-[0%] right-[73.38%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/snowui.svg"
          />
        </div>
      </div> */}
      <div className="absolute top-[59.688rem] left-[2.688rem] flex flex-row items-center justify-center p-[0.625rem] text-center text-[0.625rem] text-darkgray">
        <div className="relative leading-[1.25rem]">
          <p className="m-0">Powered by</p>
          <p className="m-0 text-[0.875rem]">Anginat Events</p>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
