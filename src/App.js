import "./App.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import i18next from "i18next";
import i18n from "./i18n";
import { generateUsers } from "./randomUser";
import Table from "./Table";

function App() {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(0);
  const [activeLang, setActiveLang] = useState("en");
  const [userList, setUserList] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [customValue, setCustomValue] = useState(0);

  const loadMoreUsers = useCallback(
    (size = 10) => {
      const newUsers = generateUsers({
        page: pageSize,
        lang: activeLang,
        size,
        errorProbability: inputValue,
        customValue: +customValue,
      });
      setUserList((prevList) => prevList.concat(newUsers));
      setPageSize(pageSize + size);
    },
    [pageSize, activeLang, inputValue]
  );

  useEffect(() => {
    if (!pageSize && !userList.length) {
      loadMoreUsers(20);
    }
  }, [pageSize, userList, loadMoreUsers]);

  useEffect(() => {
    setUserList([]);
    setPageSize(0);
  }, [activeLang, inputValue, customValue]);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setActiveLang(e.target.value);
  };

  const handleInput = (ev) => {
    setInputValue(ev.target.value);
  };

  return (
    <div className="px-8 pt-8 bg-white sm:px-6 lg:px-8">
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium leading-6 text-gray-900"
        ></label>
        <select
          id="location"
          onChange={handleLangChange}
          value={localStorage.getItem("i18nextLng")?? "en"}
          name="location"
          className="mt-2 block absolute top-0 mb-2 right-8 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">France</option>
        </select>
      </div>
      <div className="w-full justify-center sm:flex  ml-10 pb-5 my-10 sm:items-center ">
        <div className="flex ">
          <h1 className="flex text-3xl self-center font-semibold leading-6 text-gray-900">
            {t("Task_5_fake_users")}
          </h1>
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex w-full justify-around  sm:mt-0 sm:flex-none">
          <div className="">
            <label
              htmlFor="customRange3"
              className="mb-2 inline-block text-black-700 dark:text-black-200"
            >
              {t("rangeOfMistake")}
            </label>
            <input
              type="range"
              className=" h-1.5 w-2/3 cursor-pointer appearance-none rounded-lg border-transparent bg-gray-200"
              min="0"
              max="10"
              step="0.5"
              id="customRange3"
              value={inputValue}
              onChange={handleInput}
            />

            <input
              type="text"
              value={inputValue}
              onChange={handleInput}
              className="h-8 rounded-md  my-5"
            />
            <p>{t("max mistakes")}</p>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 inline-block text-black-700 dark:text-black-200">
              {t("pageNumber")}{" "}
            </label>

            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="h-8 rounded-md mr-2"
            />
          </div>
        </div>
      </div>
      <Table loadMoreUsers={loadMoreUsers} userList={userList} />
    </div>
  );
}

export default App;
