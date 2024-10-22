import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animatedModal";
import { Radio, RadioGroup } from "@headlessui/react";
import Spinner from "@/components/common/spinner";
import { playNowSound } from "@/lib/sounds";
import { startNewGame } from "@/services/game";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const settings = [
  {
    name: "Single Player",
    description:
      "Play solo and test your skills by guessing the word on your own",
    id: "single",
  },
  {
    name: "Multiplayer",
    description: "Challenge your friends in a competitive word guessing game",
    id: "multiple",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChooseGameMode() {
  const router = useRouter();

  const [selected, setSelected] = useState(settings[0]);
  const [isLoading, setIsLoading] = useState(false);

  const startNewGameHandler = async () => {
    try {
      setIsLoading(true);
      playNowSound();
 
      const { gameId } = await startNewGame(selected.id);

      router.push(
        selected.id === "single" ? `/play/${gameId}` : `/play/multi/${gameId}`
      );
    } catch (err) {
      toast.error("Failed to start a new game.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="flex justify-center group/modal-btn">
          <span className="mt-6 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex gap-5 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-2 text-xl font-medium text-white backdrop-blur-3xl">
              Play Now
            </span>
          </span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="">
            <h4 className="text-lg md:text-2xl text-neutral-600 font-bold text-center mb-8">
              Choose{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 border border-gray-200">
                Game Mode
              </span>{" "}
            </h4>
            <div className=" mt-10">
              <fieldset aria-label="Game Mode setting">
                <RadioGroup
                  value={selected}
                  onChange={setSelected}
                  className=""
                >
                  {settings.map((setting, settingIdx) => (
                    <Radio
                      key={setting.name}
                      value={setting}
                      aria-label={setting.name}
                      aria-description={setting.description}
                      className={classNames(
                        settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                        settingIdx === settings.length - 1
                          ? "rounded-bl-md rounded-br-md"
                          : "",
                        "group relative flex cursor-pointer p-4 py-5 focus:outline-none data-[checked]:z-10 data-[checked]:border-indigo-200 data-[checked]:bg-indigo-50"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white group-data-[checked]:border-transparent group-data-[checked]:bg-indigo-600 group-data-[focus]:ring-2 group-data-[focus]:ring-indigo-600 group-data-[focus]:ring-offset-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      <span className="ml-3 flex flex-col">
                        <span className="block text-sm font-medium text-gray-100 group-data-[checked]:text-gray-900">
                          {setting.name}
                        </span>
                        <span className="block text-sm text-gray-500 group-data-[checked]:text-gray-600">
                          {setting.description}
                        </span>
                      </span>
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4 ">
            <button
              onClick={startNewGameHandler}
              className="px-2 py-1 flex justify-center gap-3 items-center bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
            >
              {isLoading && <Spinner className="border-black" />}
              Start
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
