"use client";

import { useState, useContext } from "react";
import GameConfigStateContext from "@/contexts/gameConfigStateContext";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { updateGameConfig } from "@/services/game"; // Import the function
import Spinner from "@/components/common/spinner";

export default function Config() {
  const { maxRounds, setMaxRounds, setWordsList } = useContext(
    GameConfigStateContext
  );

  const [maxRoundsField, setMaxRoundsField] = useState(maxRounds);
  const [wordsListField, setWordsListField] = useState([]);
  const [adminPasswords, setAdminPasswords] = useState("null");
  const [updatingConfig, setUpdatingConfig] = useState(false);

  const handleUpdateConfig = async (e) => {
    e.preventDefault();
    if (wordsListField.length < 3) {
      toast.error("Please enter at least 3 words", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      setUpdatingConfig(true);

      await updateGameConfig(
        adminPasswords,
        Number(maxRoundsField),
        wordsListField.map((word) => word.label)
      );

      toast.success("Game configuration updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setMaxRounds(maxRoundsField);
      setWordsList(wordsListField.map((word) => word.label));
    } catch (error) {
      toast.error(error.message || "Failed to update game configuration", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setUpdatingConfig(false);
    }
  };
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Game Configuration
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Customize the Wordle game settings
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="max-rounds"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Max Rounds
            </label>
            <div className="mt-2.5">
              <input
                id="max-rounds"
                name="max-rounds"
                type="number"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                min={1}
                value={maxRoundsField}
                onChange={(e) => setMaxRoundsField(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="words-list"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Words List
            </label>
            <div className="mt-2.5">
              <CreatableSelect
                isMulti
                onChange={(e, value) => {
                  if (value?.option?.label) {
                    if (value?.option?.label.length !== 5) {
                      toast.warn("Word must be 5 characters long", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
                      return;
                    }
                  }
                  setWordsListField(
                    e.map((ele) => ({
                      label: ele.label.toUpperCase(),
                      value: ele.value.toUpperCase(),
                    }))
                  );
                }}
                value={wordsListField}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="admin-passwords"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Admin Password
            </label>
            <div className="mt-2.5">
              <input
                id="admin-passwords"
                name="admin-passwords"
                type="password"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                minLength={6}
                value={adminPasswords}
                onChange={(e) => setAdminPasswords(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="button"
            className="flex justify-center gap-2 items-center w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleUpdateConfig}
            disabled={updatingConfig}
          >
            {updatingConfig && <Spinner />}
            Update
          </button>
        </div>
      </div>
      <Spinner />
    </div>
  );
}
