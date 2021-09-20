import React, { useState } from "react";
import CheckBox from "./CheckBox";

function App() {
  const [check, setCheck] = useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };
  return (
    <div>
      <CheckBox checked={check} onChange={onChange}>
        다음 약관에 모두 동의
      </CheckBox>
    </div>
  );
}

export default App;
