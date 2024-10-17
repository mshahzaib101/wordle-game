import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GameConfigStateContextProvider } from "@/contexts/gameConfigStateContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Play Wordle - Challenge Your Word Skills! - Wordler",
  description:
    "Enjoy the classic Wordle game where you guess a 5-letter word in a limited number of rounds. Can you solve the puzzle by deciphering the correct letter positions and their presence in the word? Play now and test your word-guessing skills with configurable settings and multiple chances to win!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <GameConfigStateContextProvider>
          <Header />
          {children}
          <ToastContainer />
        </GameConfigStateContextProvider>
      </body>
    </html>
  );
}
