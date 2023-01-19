import { useState } from "react";
import Checkbox from "./Checkbox";

const TandC = () => {
  const [isCheckedA, setIsCheckedA] = useState(false);
  const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedA(e.target.checked);
  };

  const [isCheckedB, setIsCheckedB] = useState(false);
  const handleChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedB(e.target.checked);
  };

 

  return (
    <div className="tcCheckbox">
      <div style={{ display: "inline" }}>
        <Checkbox
          handleChange={handleChangeA}
          isChecked={isCheckedA}
          label={"Send me special offers."}
        />
      </div>
      <div>
        <Checkbox
          handleChange={handleChangeA}
          isChecked={isCheckedA}
          label={"I agree to the Terms and Policies of travel."}
        />
        
      </div>
    </div>
  );
};

export default TandC;
