import "./Keyboard.scss";
import React, { useRef } from "react";
import { keyboardConfig } from "#config";
import { Key } from "components";
import { useEventListener } from "#hooks";

function Keyboard({ setText, handleBackspace, handleEnter }) {
  const { keyCode, keyMap } = keyboardConfig;
  const keyRefs = {};
  for (const keyRef in keyMap) {
    keyRefs[keyRef] = useRef(null);
  }

  useEventListener("keydown", (event) => {
    event.preventDefault();
    // console.log("event key", event.key);
    if (event.key === "Enter") {
      handleEnter();
    }
    if (event.key === "Backspace") {
      handleBackspace();
    }
    if (keyMap[event.keyCode] && !keyMap[event.keyCode].noText) {
      keyRefs[event.keyCode].current.pressKey();
      setText(event.key);
    }
  });
  return (
    <div className="keyboard">
      <div className="keyrow-1">
        <Key
          keyMap={keyMap[keyCode.keyQ]}
          ref={keyRefs[keyCode.keyQ]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyW]}
          ref={keyRefs[keyCode.keyW]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyE]}
          ref={keyRefs[keyCode.keyE]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyR]}
          ref={keyRefs[keyCode.keyR]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyT]}
          ref={keyRefs[keyCode.keyT]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyY]}
          ref={keyRefs[keyCode.keyY]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyU]}
          ref={keyRefs[keyCode.keyU]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyI]}
          ref={keyRefs[keyCode.keyI]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyO]}
          ref={keyRefs[keyCode.keyO]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyP]}
          ref={keyRefs[keyCode.keyP]}
          setText={setText}
        />
      </div>
      <div className="keyrow-2">
        <Key
          keyMap={keyMap[keyCode.keyA]}
          ref={keyRefs[keyCode.keyA]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyS]}
          ref={keyRefs[keyCode.keyS]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyD]}
          ref={keyRefs[keyCode.keyD]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyF]}
          ref={keyRefs[keyCode.keyF]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyG]}
          ref={keyRefs[keyCode.keyG]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyH]}
          ref={keyRefs[keyCode.keyH]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyJ]}
          ref={keyRefs[keyCode.keyJ]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyK]}
          ref={keyRefs[keyCode.keyK]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyL]}
          ref={keyRefs[keyCode.keyL]}
          setText={setText}
        />
      </div>
      <div className="keyrow-3">
        <Key
          keyMap={keyMap[keyCode.keyZ]}
          ref={keyRefs[keyCode.keyZ]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyX]}
          ref={keyRefs[keyCode.keyX]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyC]}
          ref={keyRefs[keyCode.keyC]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyV]}
          ref={keyRefs[keyCode.keyV]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyB]}
          ref={keyRefs[keyCode.keyB]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyN]}
          ref={keyRefs[keyCode.keyN]}
          setText={setText}
        />
        <Key
          keyMap={keyMap[keyCode.keyM]}
          ref={keyRefs[keyCode.keyM]}
          setText={setText}
        />
      </div>
      <div className="keyrow-4">
        <Key
          keyMap={keyMap[keyCode.space]}
          ref={keyRefs[keyCode.space]}
          setText={setText}
        />
      </div>
    </div>
  );
}

export default Keyboard;
