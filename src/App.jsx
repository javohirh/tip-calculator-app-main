import { useState, useEffect, useRef } from "react";
import "./App.css";
import person from "./assets/images/icon-person.svg";
import dollar from "./assets/images/icon-dollar.svg";

function App() {
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [numPeople, setNumPeople] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const ref = useRef("");

  useEffect(() => {
    calculateAmounts();
  }, [bill, tipPercentage, numPeople]);

  const handleTipClick = (percentage) => {
    setTipPercentage(percentage);
  };

  const calculateAmounts = () => {
    if (bill > 0 && numPeople > 0) {
      const tipPerPerson = (bill * (tipPercentage / 100)) / numPeople;
      const totalPerPerson = bill / numPeople + tipPerPerson;
      setTipAmount(tipPerPerson.toFixed(2));
      setTotalAmount(totalPerPerson.toFixed(2));
    } else {
      setTipAmount(0);
      setTotalAmount(0);
    }
  };

  const handleReset = () => {
    setBill("");
    setTipPercentage(0);
    setNumPeople("");
    setTipAmount(0);
    setTotalAmount(0);
    ref.current.value = "";
  };

  return (
    <>
      <h1 className="text-center text-gray-700 text-4xl mt-4">Splitter</h1>
      <div className="App flex mobile:flex-col justify-between max-w-[700px] mx-auto mt-40 p-5 rounded-xl">
        <div className="left max-w-[45%] mobile:max-w-full">
          <h2>Bill</h2>
          <div className="relative mt-2 mb-7">
            <input
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full text-right px-2 py-1 bg-[#f3f8fb] outline-[#78beb8] rounded-sm"
              type="number"
              placeholder="0"
            />
            <span className="absolute top-2 left-2">
              <img src={dollar} alt="dollar" />
            </span>
          </div>
          <h2 className="mb-2">Select a tip %</h2>
          <div className="flex flex-wrap justify-between gap-2 mobile:justify-center">
            {[5, 10, 15, 25, 50].map((percent) => (
              <button
                key={percent}
                onClick={() => handleTipClick(percent)}
                className={`w-20 h-8 mobile:w-28 rounded-md text-white ${
                  tipPercentage === percent ? "bg-[#28c5af]" : "bg-[#00474b]"
                }`}
              >
                {percent} %
              </button>
            ))}
            <input
              onChange={(e) => {
                handleTipClick(Number(e.target.value));
              }}
              ref={ref}
              className="w-20 custom h-8 mobile:w-28 rounded-md text-white bg-[#00474b] text-center focus:bg-[#f3f8fb] focus:outline-[#78beb8] focus:text-[#004642]"
              placeholder="Custom"
              type="number"
            />
          </div>
          <h2 className="mt-4">Number of people</h2>
          <div className="relative mt-2 mb-7">
            <input
              value={numPeople}
              onChange={(e) => setNumPeople(Number(e.target.value))}
              className="w-full text-right px-2 py-1 bg-[#f3f8fb] outline-[#78beb8] rounded-sm"
              type="number"
              placeholder="1"
            />
            <span className="absolute top-2 left-2">
              <img src={person} alt="person" />
            </span>
          </div>
        </div>

        <div className="right bg-[#00474b] rounded-xl p-5 max-w-[45%] w-full relative mobile:max-w-full h-72">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-white">Tip Amount</h2>
              <h3 className="text-slate-400">{tipAmount} $ / person</h3>
            </div>
            <h2 className="text-4xl text-[#28c5af]">
              $ {Math.round(+tipAmount * numPeople)}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white">Total</h2>
              <h3 className="text-slate-400">{totalAmount} $ / person</h3>
            </div>
            <h2 className="text-4xl text-[#28c5af]">
              $ {+totalAmount * numPeople}
            </h2>
          </div>
          <button
            onClick={handleReset}
            className="w-[85%] mx-auto block rounded-md uppercase text-[#034b46] absolute bottom-10 py-1 bg-[#9fe8df]"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
