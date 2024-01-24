import React, { useReducer } from "react";
import "./App.css";

const initState = {
  input: "",
  res: "",
};

let operators = ["+", "-", "*", "/"];

function reducer(state = initState, { type, payload }) {
  switch (type) {
    case "ADDINP": {
      let addOps = true;

      if (
        operators.includes(payload) &&
        operators.includes(
          state.input.slice(state.input.length - 1, state.input.length)
        )
      ) {
        addOps = false;
      } else {
        addOps = true;
      }

      if (addOps) {
        return { ...state, input: state.input + payload };
      }
      return { ...state };
    }
    case "CALCULATE": {
      try {
        const result = eval(state.input);
        return { ...state, res: result.toString() };
      } catch (error) {
        return { ...state, res: "Error" };
      }
    }
    case "DELETE": {
      return {
        ...state,
        input: state.input.slice(0, state.input.length - 1),
      };
    }
    case "CLEAR": {
      return { ...state, input: "", res: "" };
    }
    default: {
      return state;
    }
  }
}

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  let handleClick = (val) => {
    dispatch({ type: "ADDINP", payload: val });
  };

  let handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  let handleDel = () => {
    dispatch({ type: "DELETE" });
  };

  let handleCalc = () => {
    dispatch({ type: "CALCULATE" });
  };

  return (
    <>
      <div className="outerContainer">
        <div className="calculatorContainer">
          <div className="calc" id="resultBox">
            {state.res || state.input}
          </div>
          <div className="SymbolContainer">
            <button onClick={() => handleClick("1")} className="symbol">
              1
            </button>            <button onClick={() => handleClick("2")} className="symbol">
              2
            </button>
            <button onClick={() => handleClick("3")} className="symbol">
              3
            </button>
            <button onClick={() => handleClick("+")} className="symbol">
              +
            </button>
            <button onClick={() => handleClick("4")} className="symbol">
              4
            </button>
            <button onClick={() => handleClick("5")} className="symbol">
              5
            </button>
            <button onClick={() => handleClick("6")} className="symbol">
              6
            </button>
            <button onClick={() => handleClick("-")} className="symbol">
              -
            </button>
            <button onClick={() => handleClick("7")} className="symbol">
              7
            </button>
            <button onClick={() => handleClick("8")} className="symbol">
              8
            </button>
            <button onClick={() => handleClick("9")} className="symbol">
              9
            </button>
            <button onClick={() => handleClick("/")} className="symbol">
              /
            </button>
            <button onClick={() => handleClick(".")} className="symbol">
              .
            </button>
            <button onClick={() => handleClick("0")} className="symbol">
              0
            </button>
            <button onClick={() => handleClick("*")} className="symbol">
              *
            </button>
            <button onClick={() => handleClear("AC")} className="symbol">
              AC
            </button>
            <button onClick={() => handleDel("DEL")} className="symbol">
              DEL
            </button>
            <button onClick={() => handleCalc("=")} className="symbol">
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
