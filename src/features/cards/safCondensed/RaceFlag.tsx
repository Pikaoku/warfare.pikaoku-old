import React from "react";

interface Props {
  expSrc: string;
  raceSrc: string;
}

const RaceFlag: React.FC<Props> = ({ expSrc, raceSrc }) => (
  <div className={"safc-race-flag"}>
    <img className={"safc-w-40"} src={raceSrc} alt={"loading..."} />
    {!!expSrc && (
      <img className={"safc-experience safc-w-40"} src={expSrc} alt={""} />
    )}
  </div>
);

export default RaceFlag;
