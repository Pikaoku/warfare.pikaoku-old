import { useContext } from "react";
import { InitiativeContext } from "../pages/WarfareInitiative";
import { initiativeActions } from "./initiativeReducer";
import { WarfareBattleArmy, BattleUnit } from "../../battleTypes";
import { fsAdd } from "../../../common/utils/firebase/fsAdd";
import { FS_COL_ARMIES, fsUpdate } from "../../../../firebase";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

export const useSaveArmy = () => {
  const { dispatch } = useContext(InitiativeContext);
  const armies = useSelector<any, WarfareBattleArmy[]>(
    state => state.armies.userArmies
  );
  const username = useSelector<any, string>(state => state.auth.username);

  return (army: WarfareBattleArmy) => {
    const noIdArmy = { ...army };
    delete noIdArmy.id;
    try {
      if (army.created) {
        try {
          fsUpdate(FS_COL_ARMIES, army.id, noIdArmy);
        } catch (e) {
          throw e;
        }
      } else {
        if (isEmpty(army.units)) {
          throw "Your army needs units before you can upload it.";
        }
        if (!army.name) {
          throw "Your army needs a commander name before you can upload it.";
        }
        try {
          fsAdd(FS_COL_ARMIES, noIdArmy, username).then(
            ({ id: idFromServer }) => {
              const relevantArmy = armies.find(
                ({ id: armyId }) => idFromServer === armyId
              );

              dispatch(initiativeActions.removeArmy(army.id));

              if (!relevantArmy) {
                // FIXME this is always the case because redux hasn't updated yet
                // Remap current army's units to the new id from the server
                const remappedUnits = Object.values(army.units).reduce<
                  Record<string, BattleUnit>
                >(
                  (acc, unit) => ({
                    ...acc,
                    [unit.id]: {
                      ...unit,
                      armyId: idFromServer
                    }
                  }),
                  {}
                );

                dispatch(
                  initiativeActions.addArmy({
                    ...army,
                    id: idFromServer,
                    units: remappedUnits
                  })
                );
              } else {
                dispatch(initiativeActions.addArmy(relevantArmy));
              }
            }
          );
        } catch (e) {
          throw e;
        }
      }
    } catch (e) {
      alert("There was an error trying to upload your army. " + e);
    }
  };
};
