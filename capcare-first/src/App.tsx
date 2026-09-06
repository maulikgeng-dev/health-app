import { useCallback, useState } from "react";
import SplashScreen from "./SplashScreen";
import OnboardingScreen from "./OnboardingScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";

type Screen = "splash" | "onboarding" | "login" | "signup";

// Single-screen-at-a-time router: fade out → unmount → mount new → fade in.
// Never mounts two screens simultaneously, so SplashScreen cannot double-play.
export default function App() {
  const [screen,  setScreen ] = useState<Screen>("splash");
  const [fading,  setFading ] = useState(false);

  const navigate = useCallback((to: Screen) => {
    setFading(true);
    setTimeout(() => {
      setScreen(to);
      // tiny delay lets the new component mount at opacity 0 before fading in
      requestAnimationFrame(() => requestAnimationFrame(() => setFading(false)));
    }, 700);
  }, []);

  return (
    <div className="size-full relative overflow-hidden bg-black">
      <div style={{
        position: "absolute", inset: 0,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease",
        willChange: "opacity",
      }}>
        {screen === "splash"     && <SplashScreen onComplete={() => navigate("onboarding")}/>}
        {screen === "onboarding" && <OnboardingScreen onNavigate={navigate}/>}
        {screen === "login"      && <LoginScreen onBack={() => navigate("onboarding")}/>}
        {screen === "signup"     && <SignupScreen onBack={() => navigate("onboarding")}/>}
      </div>
    </div>
  );
}
