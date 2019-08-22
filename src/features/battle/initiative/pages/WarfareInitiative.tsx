import React from "react";
import { Grid, GridColumn, Container, Header, Dimmer } from "semantic-ui-react";
import BattleView from "../components/BattleView";
import {
  initialState,
  initiativeReducer,
  InitiativeState,
  InitiativeAction
} from "../store/initiativeReducer";
import BattleArmyManagement from "../components/BattleArmyManagement";
import BattleCombatantView from "../components/BattleCombatantView";
import {
  useLocalStorageReducer,
  useLocalStorageState
} from "react-storage-hooks";
import { AUTH } from "../../../../reducer";
import { AUTH_USER } from "../../../auth/store/authReducer";
import { connect } from "react-redux";

interface StateProps {
  user: any;
}

export const InitiativeContext = React.createContext<{
  state: InitiativeState;
  dispatch: React.Dispatch<InitiativeAction>;
}>({
  state: initialState,
  dispatch: () => {}
});

const WarfareInitiative: React.FC<StateProps> = ({ user }) => {
  const [state, dispatch] = useLocalStorageReducer(
    "initiative",
    initiativeReducer,
    initialState
  );

  const [managementCollapsed, setManagementCollapsed] = useLocalStorageState<
    boolean
  >("managementCollapsed", false);

  return (
    <InitiativeContext.Provider value={{ state, dispatch }}>
      <Dimmer.Dimmable
        as={Container}
        dimmed={!user}
        fluid
        style={{ height: "85vh" }}
      >
        <Grid
          columns="equal"
          divided
          style={{
            backgroundColor: "rgb(244, 242, 230)",
            flexWrap: "nowrap",
            height: "100%",
            margin: 0
          }}
        >
          <GridColumn
            style={{
              flexBasis: managementCollapsed
                ? "calc(1rem + 1.6rem + 2rem)"
                : "18.75%",
              flexGrow: managementCollapsed ? 0 : 3,
              flexShrink: 0,
              minWidth: managementCollapsed ? "auto" : 280,
              overflow: "hidden",
              padding: 0,
              width: managementCollapsed ? "calc(1rem + 1.6rem + 2rem)" : "auto"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                float: "right",
                height: "100%",
                minWidth: 280,
                padding: 0,
                width: "100%"
              }}
            >
              <BattleArmyManagement
                collapsed={managementCollapsed}
                setCollapsed={setManagementCollapsed}
              />
            </div>
          </GridColumn>
          <GridColumn
            style={{
              display: "flex",
              flex: "10 1 62.5%",
              flexDirection: "column",
              padding: "0 0 0 1rem"
            }}
          >
            <BattleView setManagementCollapsed={setManagementCollapsed} />
          </GridColumn>
          <GridColumn
            style={{
              display: "flex",
              flex: "3 0 18.75%",
              flexDirection: "column",
              maxWidth: "calc(290px + 2rem)",
              minWidth: 280
            }}
          >
            <BattleCombatantView />
          </GridColumn>
        </Grid>

        <Dimmer active={!user}>
          <Header as="h2" inverted>
            The Warfare Initiative Module only works if you log in and have
            units saved or created.
          </Header>
        </Dimmer>
      </Dimmer.Dimmable>
    </InitiativeContext.Provider>
  );
};

// export default WarfareInitiative;

export default connect<StateProps, {}, {}, any>(state => ({
  user: state[AUTH][AUTH_USER] || false
}))(WarfareInitiative);
