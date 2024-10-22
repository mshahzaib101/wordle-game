"use client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { joinMultiplayerGame } from "@/services/game";
import { useParams } from "next/navigation";
import Spinner from "@/components/common/spinner";
import { useRouter } from "next/navigation";

export default function UserJoiningForm() {
  const params = useParams();
  const router = useRouter();

  const gameId = params.gameId; // Access gameId from dynamic route

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = `${firstname} ${lastname}`; // Construct display name

    try {
      setLoading(true);

      const { playerId } = await joinMultiplayerGame(gameId, displayName); // Call the join function
      router.push(`/play/multi/${gameId}/${playerId}`); // Navigate to the play page with the playerId
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to join the game.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
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
      className="max-w-md mt-14 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black"
    >
      <h2 className="font-bold text-xltext-neutral-200">Join the Game!</h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        Register now to enter the challenge!
      </p>
      <form className="my-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="firstname">First name</Label>
          <Input
            id="firstname"
            placeholder="Tyler"
            type="text"
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="lastname">Last name</Label>
          <Input
            id="lastname"
            placeholder="Durden"
            type="text"
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="flex items-center justify-center gap-3 bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {loading && <Spinner />}
          Join &rarr;
          <BottomGradient />
        </button>
      </form>
    </motion.div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
