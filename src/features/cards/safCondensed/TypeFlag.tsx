import React, { useState } from "react";

interface Props {
  typeSrc: string;
}

const TypeFlag: React.FC<Props> = ({ typeSrc }) => (
  <div className={"type-flag"}>
    <img className={"saf-w-40"} src={typeSrc} alt={""} />
  </div>
);

export default TypeFlag;
