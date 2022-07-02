import React from "react";
import { useState } from "react";
import Result from "./Result";
import { useRatesData } from "./useRatesData";

const Converter = () => {
  const [result, setResult] = useState();
  const ratesData = useRatesData();

  const calculateResult = (currency, amount) => {
    const rate = ratesData.rates[currency];

    setResult({
      sourceAmount: +amount,
      targetAmount: amount * rate,
      currency,
    });
  };

  const [currency, setCurrency] = useState("EUR");
  const [currencyTwo, setCurrencyTwo] = useState("UAH");
  const [amount, setAmount] = useState("");

  function swapConversion() {
    setCurrency(currencyTwo);
    setCurrencyTwo(currency);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    calculateResult(currency, amount);
  };

  const onReset = (event) => {
    event.preventDefault();
    setAmount("");
    setResult();
    // setCurrency("EUR");
  };

  return (
    <section className="pt-14 bg-white pb-14 px-6 shadow">
      <h1 className="text-black text-2xl mb-10 font-semibold">
        Currency Exchange Rate
      </h1>
      <form onSubmit={onSubmit}>
        {ratesData.state === "loading" ? (
          <div className="flex items-center justify-center">
            <div
              className=" animate-bounce size-5xl inline-block w-60 h-60 border-4  border-green-600 rounded-full"
              role="status"
            >
              <span className=" absolute  text-5xl mt-20 ml-2 font-semibold">
                Loading...
              </span>
            </div>
          </div>
        ) : ratesData.state === "error" ? (
          "error"
        ) : (
          <div className="flex flex-row mb-9 gap-9 items-center">
            <div className="flex-1">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                htmlFor="text"
              >
                Amount
              </label>
              <input
                type="number"
                className=" pr-3 focus:outline-none focus:ring-1 focus:ring-green-500 
                         focus:border-green-500 w-full 
                           border-2 rounded-sm min-h-50 pl-3 py-2
                           z-10 mt-1  bg-white shadow-lg max-h-56 text-base 
                           ring-1ring-black ring-opacity-5 overflow-auto sm:text-sm"
                value={amount}
                onChange={({ target }) => setAmount(target.value)}
                step="any"
                min="1"
                max="10000000"
                size="lg"
                placeholder="Enter amount USD"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Сonversion currency
              </label>
              <select
                id="countries"
                className="border-2 focus:ring-1 focus:ring-green-500 
                         focus:border-green-500 z-10 mt-1 w-full bg-white
                           shadow-lg max-h-56 rounded-md py-3 text-base ring-1 
                         ring-black ring-opacity-5 overflow-auto focus:outline-none
                           sm:text-sm"
                value={currency}
                onChange={({ target }) => setCurrency(target.value)}
              >
                {Object.keys(ratesData.rates).map((currency) => (
                  <option key={currency} value={currency.base}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div
              onClick={() => swapConversion()}
              className="border-2 border-blue-100 rounded-full mt-8 p-4 
                         cursor-pointer hover:border-green-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 17"
                aria-hidden="true"
                className="w-4 h-4 text-green-500 miscellany___StyledIconSwap-sc-1r08bla-1 fZJuOo"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>

            <div className="flex-1">
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium 
                         text-gray-900 dark:text-gray-400"
              >
                Сonversion currency
              </label>
              <select
                id="countries"
                className="border-2 focus:ring-1 focus:ring-green-500 
                         focus:border-green-500 z-10 mt-1 w-full 
                         bg-white shadow-lg max-h-56 rounded-md py-3 
                           text-base ring-1 ring-black ring-opacity-5 
                           overflow-auto focus:outline-none sm:text-sm"
                value={currencyTwo}
                onChange={({ target }) => setCurrencyTwo(target.value)}
              >
                {Object.keys(ratesData.rates).map((currencyTwo) => (
                  <option key={currencyTwo} value={currencyTwo}>
                    {currencyTwo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="">
          <button
            type="submit"
            className="mr-6 inline-flex justify-center py-3 px-5 border border-transparent
                       shadow-sm text-md font-bold rounded-md text-white
                       bg-green-300 hover:bg-green-500"
          >
            Convert
          </button>
          <button
            type="reset"
            onClick={onReset}
            className="mr-6 inline-flex justify-center py-3 px-5 border border-transparent
                       shadow-sm text-md font-bold rounded-md text-white bg-red-300
                       hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="flex justify-between mt-10 items-center">
        <div>
          <p className="flex items-center text-xs font-regular text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            &nbsp;Be careful keep your money under your pillow.
          </p>
        </div>
        <div>
          <h1
            className="border-2 border-green-500 w-full 
         rounded-sm min-h-50 pl-3 pr-10 py-2"
          >
            You receive:{" "}
            {<Result result={result} calculateResult={calculateResult} />}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Converter;
