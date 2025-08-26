import { useNavigate } from "react-router-dom";

export const HeaderFrameTracker = () => {
  const navigate = useNavigate();

  return (
    <header className="w-screen h-[50px] shadow-2xl flex justify-center items-center
    md:justify-end
    ">
      <p
        onClick={() => navigate("/")}
        className="border-b-2 border-transparent hover:border-[var(--imob-color-one)]"
      >
        Início
      </p>
    </header>
  );
};
