import React, { useState, useContext } from "react";
import uuid from "uuid/v4";
import { Button, Form, Header, Popup } from "semantic-ui-react";
import { WarfareBattleArmy } from "../../battleTypes";
import { InitiativeContext } from "../pages/WarfareInitiative";
import { initiativeActions } from "../store/initiativeReducer";

interface Props {}

const AddArmyPopup: React.FC<Props> = () => {
  const { dispatch } = useContext(InitiativeContext);

  const [open, setOpen] = useState<boolean>(false);

  const [commanderName, setCommanderName] = useState<string>("");
  const [commanderInitiative, setCommanderInitiative] = useState<number>(0);

  const reset = () => {
    setCommanderName("");
    setCommanderInitiative(0);
    setOpen(false);
  };

  const newArmy = ({
    name,
    initiative = 0
  }: Partial<Pick<WarfareBattleArmy, "name" | "initiative">>) => ({
    id: uuid(),
    initiative,
    name,
    units: {}
  });

  return (
    <Popup
      open={open}
      onClose={reset}
      hoverable
      position="bottom center"
      trigger={
        <Button
          content={"Add Army"}
          positive
          onClick={e => {
            dispatch(initiativeActions.addArmy(newArmy({})));
            setOpen(false);
          }}
          onMouseEnter={() => {
            setOpen(true);
          }}
        />
      }
    >
      <Header content={"Optional Details"} size={"large"} />
      <Form
        onSubmit={e => {
          e.preventDefault();
          dispatch(
            initiativeActions.addArmy(
              newArmy({
                initiative: commanderInitiative,
                name: commanderName
              })
            )
          );
          setOpen(false);
        }}
      >
        <Form.Input
          onChange={(e, { value }) => {
            setCommanderName(value);
          }}
          label="Commander Name"
          value={commanderName}
          placeholder={"Who's in Charge?"}
        />
        <Form.Input
          onChange={(e, { value }) => setCommanderInitiative(parseInt(value))}
          value={commanderInitiative}
          label="Initiative"
          type="number"
        />
        <Form.Button fluid positive content={"Add Army"} type="submit" />
      </Form>
    </Popup>
  );
};

export default AddArmyPopup;
