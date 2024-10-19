import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const ConfettiComponent = () => {
  const { width, height } = useWindowSize();

  const [numberOfPieces, setNumberOfPieces] = useState(400); // Start with 200 confetti pieces
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    // Start fading out the confetti after 5 seconds
    const timer = setTimeout(() => {
      const fadeInterval = setInterval(() => {
        setNumberOfPieces((prev) => {
          if (prev > 0) {
            return prev - 50; // Decrease the number of pieces by 10 every interval
          } else {
            clearInterval(fadeInterval);
            return 0;
          }
        });
      }, 200); // Adjust the interval for smoother reduction
    }, 3000); // Confetti stays for 5 seconds before starting to reduce

    const winSound = new Audio("/audios/win-sound.mp3");
    winSound.play();
    return () => clearTimeout(timer);
  }, []);

  if (pageLoaded) {
    return (
      <div className="h-screen w-screen fixed top-0 left-0">
        {numberOfPieces > 0 && (
          <Confetti
            numberOfPieces={numberOfPieces}
            width={width}
            height={height}
          />
        )}
      </div>
    );
  }
};

export default ConfettiComponent;
