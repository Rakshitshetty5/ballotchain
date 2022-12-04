import React from "react";
import PageContainer from "../components/PageContainer";
import { MENU } from "../data/menu";
import { useNavigate } from "react-router-dom";
import DigitalCard from "../components/DigitalCard";
import { useDispatch, useSelector } from "react-redux";

const CURRENT_ACTIVE_PHASE = 1;

const Home = () => {
  const navigate = useNavigate();
  const isVerfied = useSelector((state) => state.auth?.isVerified);
  const userName = useSelector(state => state.auth?.voterDetails?.first_name)

  const goToPage = (isAccessAllowed, path) => {
    if (!isAccessAllowed) {
      return;
    }
    navigate(path);
  };

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-light">Welcome {userName}!</h1>
        <h1 className="text-2xl font-light">
          Current Active Phase:{" "}
          <span className="text-[green]">Registration</span>
        </h1>
      </div>
      {isVerfied && (
        <div className="flex my-10">
          <DigitalCard />
        </div>
      )}
      <div className="grid md:grid-cols-3 mt-5 gap-5">
        {MENU.map((item) => {
          let isAccessAllowed = true;

          if (item.id !== CURRENT_ACTIVE_PHASE) {
            isAccessAllowed = false;
          }

          if (CURRENT_ACTIVE_PHASE !== 1 && item.id !== 1 && !isVerfied) {
            isAccessAllowed = false;
          }

          return (
            <div
              key={item.id}
              onClick={() => goToPage(isAccessAllowed, item.path)}
              className="cursor-pointer h-[10rem] flex flex-col items-center justify-center rounded-xl shadow-xl relative group"
            >
              <h1 className="text-2xl">{item.title}</h1>
              <span className="text-[0.8rem] font-light">{item.subtitle}</span>
              {!isAccessAllowed && (
                <div className="items-center justify-center absolute h-full w-full rounded-xl top-0 left-0 z-10 bg-[red] opacity-[0.9] hidden group-hover:flex">
                  Closed
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Home;
