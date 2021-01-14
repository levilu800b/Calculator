import React from 'react';
import './App.css';
import { buttons } from "./Keypads";
import Screen from './Screen'
import Button from "react-bootstrap/Button";
import  { useState } from "react";

const buttonMap = buttons || [];
function App() {
  const [val1, cPrint] = useState("");
  const [store, cStore] = useState({ v1: "", v2: "", f: " " });
  const [loop, cLoop] = useState(false);
  const [mem, cMem] = useState(0);
 

  const onclick = (e, func, trigger) => {
    const value = e.target.value;
    

    
    let toggle = typeof store.f === "function";
    
    let toggleVar = toggle ? store.v2 : store.v1;
   
    let writeFunc = (x, y) => {
      
      toggle
        ? cStore({ ...store, v2: x, f: y ? y : store.f })
        : cStore({ ...store, v1: x, f: y ? y : store.f });
      return toggle ? store.v2 : store.v1;
    };

    if (value === ".") {
      if (toggleVar.includes(".")) return;
      writeFunc(!toggleVar ? "0." : toggleVar + ".");
      cPrint(!toggleVar ? "0." : toggleVar + ".");
      return;
    }

    
    switch (!isNaN(value)) {
      
      case true:
        
        if (loop) {
          cStore({ ...store, v1: value, v2: 0, f: " " });
          cPrint(value);
          
          cLoop(false);
          
        } else if (toggleVar === 0 || store.f === "clear") {
         
          writeFunc(value, store.f === "clear" ? " " : func);
          cPrint(value);
        } else {
         
          writeFunc(toggleVar + value);
          cPrint(toggleVar + value);
        }
        break;

     
      case false:
        
        switch (value) {
         
          case "DEL":
            
            if (loop) {
              cStore({
                ...store,
                v1: 0,
              });
              return;
            }

            let pr = writeFunc(
              
              !toggle || loop
                ? 
                  store.v1.length > 1
                  ? store.v1.slice(0, -1)
                  : 0
                :
                store.v2.length > 1
                ? store.v2.slice(0, -1)
                : 0
            );
            cPrint(pr > 0 ? pr.slice(0, -1) : 0);

            break;

         
          case "MC":
            cMem(0);
            break;
          case "MS":
            cPrint(" ");
            cMem(store.v1);
            cStore({ ...store, v1: "", f: " " });
            break;
          case "M-":
            cPrint(mem - store.v1);
            cStore({ ...store, v1: mem - store.v1 });
            cLoop(true);
            break;
          case "M+":
            cPrint(mem + store.v1);
            cStore({ ...store, v1: mem + store.v1 });
            cLoop(true);
            break;
          case "MR":
            cPrint(mem);
            cStore({ ...store, v1: mem, v2: 0 });
            break;

         
          case "C":
            cPrint(0);
            cStore({ v1: "", v2: "", f: " " });
            cMem(0);
            break;
          case "CE":
            cPrint("");
            if (loop) {
              cStore({ ...store, v1: 0, v2: 0 });
            } else {
              writeFunc("");
            }
            
            break;
        
          case "=":
            
            if (typeof store.f !== "function") return;
            else {
               cPrint(() => store.f(store.v1, store.v2));
             
              cStore({ ...store, v1: store.f(store.v1, store.v2) });
             
              cLoop(true);
            }
            break;

          default:
           
            if (func && trigger) {
              if (!store.v1) return;
             
              cStore({ v1: func(store.v1), v2: 0, f: "clear" });
              cPrint(func(store.v1));
              cLoop(false);
            } else if (store.f && !trigger) {
             
              cStore({
                ...store,
                
                v1:
                  store.v1 && store.v2 && func && !loop
                    ? store.f(store.v1, store.v2)
                    : store.v1,
                v2: store.v1 && store.v2 && func ? 0 : store.v2,
                
                f: func,
              });
              cLoop(false);
              if (store.v1 && store.v2 && func && !loop)
                cPrint(store.f(store.v1, store.v2));
            }

            break;
        }
        break;
      default:
        break;
    }
  };
  

  return (
    <div className="outerbody">
    <div className="calculatorBody">
   <Screen/>
          {val1 || 0}
          {buttonMap.map((v, i) => {
            return (
              <div className="btn-toolbar" key={i}>
                {v.map((val, i) => {
                  return (
                    <Button
                      onClick={(e) => {
                        onclick(e, val.func, val.trigger);
                      }}
                      key={val.name}
                      value={val.name}
                      style={{
                        display: "inline-block",
                        width: val.name[0] === "M" ? "87px" : "109px",
                      }}
                    >
                      {val.name}
                    </Button>
                  );
                })}
              </div>
            );
          })}
    </div>
    </div>
  );
 
}

export default App;