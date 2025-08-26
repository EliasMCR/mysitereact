import { FooterFrameTracker } from "../../components/FrameTracker/FooterFrameTracker";
import { Form } from "../../components/FrameTracker/Form";
import { HeaderFrameTracker } from "../../components/FrameTracker/HeaderFrameTracker";

export const FrameTrackerPage = () => {
  return (
    <div className="bg-[var(--imob-color-six)] min-h-screen text-[var(--imob-color-one)] flex flex-col items-center">
      <HeaderFrameTracker />
      <div>
        <p className="text-5xl">FrameTrackerPage</p>
      </div>
      <div>
        <Form />
      </div>
      <FooterFrameTracker />
    </div>
  );
};
