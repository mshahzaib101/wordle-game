import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animatedModal";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function InviteModal() {
  const params = useParams();
  const gameId = params.gameId;

  const getInviteLink = () => {
    if (typeof window !== "undefined") {
      const link = `${window.location.origin}/play/multi/${gameId}`;
      return link;
    }
    return "";
  };

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      const link = `${window.location.origin}/play/multi/${gameId}`;

      navigator.clipboard.writeText(link).then(() => {
        toast.success("Link copied!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger>
          <motion.span
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="mx-auto mt-3 mb-4 flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 py-2 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Invite Opponents
          </motion.span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-500  font-bold text-center mb-8">
              Invite Your{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 border border-gray-200">
                Friends
              </span>{" "}
              to Play!
            </h4>
            <div className="flex justify-center flex-col items-center">
              <p className="text-neutral-500 text-sm">
                Share this link and see who can guess the word first. Ready to
                compete? Copy the invite link below and let the game begin!
              </p>

              <button
                className="text-neutral-400 text-md mt-4"
                onClick={copyToClipboard}
              >
                Link: {getInviteLink()}
              </button>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
