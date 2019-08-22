import React from "react";
import { connect } from "react-redux";

import "./SafUnitCardCondensed.css";

import { Accordion, Icon } from "semantic-ui-react";
import {
  composeUnitFeatures,
  calculateUnitCost,
  extractStat
} from "../../unitmaker/store/unitmakerUtils";
import { ReactComponent as CornerArrow } from "./cornerArrow.svg";

import TypeFlag from "./TypeFlag";
import RaceFlag from "./RaceFlag";
import { UNITMAKER } from "../../../reducer";
import { UNITMAKER_ACTIVE } from "../../unitmaker/store/unitmakerReducer";
import { filterByField } from "../../common/utils/array/filterByField";
import { Feature } from "../../units/unitTypes";

import { flatten } from "lodash";

const DEFAULT_RACE_SRC =
  "https://firebasestorage.googleapis.com/v0/b/pikaoku-tools.appspot.com/o/warfare%2Fcards%2Fsaf%2Fancestry%2Fgeneric.png?alt=media&token=f45643ef-0cab-4dd1-8c49-dfe4b1fa7d23";
const DEAFULT_TYPE_SRC =
  "https://firebasestorage.googleapis.com/v0/b/pikaoku-tools.appspot.com/o/warfare%2Fcards%2Fsaf%2Ftype%2Fgeneric%20type.png?alt=media&token=db4561f8-6767-43b8-9d82-fe069991ec70";

interface StatLineProps {
  ll: string;
  ld: number | string;
  rl: string;
  rd: number | string;
}

const StatLine: React.FC<StatLineProps> = ({ ll, ld, rl, rd }) => (
  <>
    <div className={"safc-stat-line-label"}>{ll}</div>
    <div className={"safc-stat-line-data"}>{`${ld >= 0 ? "+" : ""}${ld}`}</div>
    <div />
    <div className={"safc-stat-line-label"}>{rl}</div>
    <div className={"safc-stat-line-data"}>{`${rd >= 0 ? "+" : ""}${rd}`}</div>
  </>
);

interface OwnProps {
  unit: any;
  borderColor?: string;
  showCredit: boolean;
}

interface StateProps {
  features: Feature[];
  cost: number;
  baseToughness: number;
  baseDefense: number;
  labelFeatureGroups: boolean;
}

const SafUnitCardCondensed: React.FC<OwnProps & StateProps> = ({
  unit,
  features,
  cost,
  borderColor,
  baseToughness,
  baseDefense,
  labelFeatureGroups,
  showCredit = true
}) => {
  const panels = ["trait", "action", "attachment"].map(type => {
    let featuresOfType = features.filter(filterByField("type", type));

    if (featuresOfType.length === 0) {
      return [];
    }

    if (labelFeatureGroups) {
      const SubAccordion = (
        <Accordion.Accordion
          exclusive={false}
          style={{ marginTop: 0, paddingLeft: 20 }}
          panels={featuresOfType.map(({ name, effect, id }) => ({
            key: id,
            title: name,
            content: effect
          }))}
        />
      );

      return [
        {
          key: type,
          title: `${type.toUpperCase()}S`,
          content: { content: SubAccordion }
        }
      ];
    }

    const panelsInType = featuresOfType.map(({ name, effect, id }) => ({
      key: id,
      title: name,
      content: effect
    }));

    return panelsInType;
  });

  // @ts-ignore
  const flattened = flatten(panels); // this seems to be a typing that is wrong

  return (
    <>
      <div id={"UnitCard"} className={"safc-card"}>
        <div className={"safc-upper"}>
          <CornerArrow className={"safc-corner-arrow-tr"} fill={borderColor} />
          <CornerArrow className={"safc-corner-arrow-br"} fill={borderColor} />
          <CornerArrow className={"safc-corner-arrow-bl"} fill={borderColor} />
          <RaceFlag
            expSrc={unit.experience.media ? unit.experience.media.saf : ""}
            raceSrc={
              unit.ancestry.media
                ? unit.ancestry.media.saf || DEFAULT_RACE_SRC
                : DEFAULT_RACE_SRC
            }
          />
          <TypeFlag
            typeSrc={
              unit.type.media
                ? unit.type.media.saf || DEAFULT_TYPE_SRC
                : DEAFULT_TYPE_SRC
            }
          />
          <div className={"safc-unit-name"}>{unit.name || "unit name"}</div>
          <div className={"safc-unit-aspects-wrapper"}>
            <div className={"safc-unit-aspects"}>
              {`${unit.ancestry.name} ${unit.experience.name} ${
                unit.equipment.name
              } ${unit.type.name}`}
            </div>
          </div>
        </div>
        <div className={"safc-cost"}>
          <span>COST: </span>
          <span>{cost}</span>
          <span>{unit.currency}</span>
        </div>
        <div className={"safc-stats"}>
          <StatLine
            ll={"Attack"}
            ld={extractStat(unit, "attack")}
            rl={"Defense"}
            rd={baseDefense + extractStat(unit, "defense")}
          />
          <StatLine
            ll={"Power"}
            ld={extractStat(unit, "power")}
            rl={"Toughness"}
            rd={baseToughness + extractStat(unit, "toughness")}
          />
          <StatLine
            ll={"Morale"}
            ld={extractStat(unit, "morale")}
            rl={"Size"}
            rd={"d" + unit.size}
          />
        </div>
        <div className={"safc-extras"}>
          <Accordion fluid exclusive={false} panels={flattened} />
        </div>
        {!!unit.commander && (
          <div className={"safc-buc-commander"}>
            Commanded by {unit.commander}
          </div>
        )}
      </div>
      {showCredit && (
        <>
          <div style={{ marginTop: "40px" }}>
            S&F Unit Card by{" "}
            <a href="https://github.com/freddybushboy/">FreddyBushBoy</a>
          </div>
          <div>Iconography by Dan Connolly.</div>
        </>
      )}
    </>
  );
};

export default connect<StateProps, {}, OwnProps, any>(
  (state, { unit: propUnit }) => {
    const unit = propUnit || state[UNITMAKER][UNITMAKER_ACTIVE],
      features = composeUnitFeatures(unit),
      cost = calculateUnitCost(unit, features),
      baseDefense = state.auth.settings.baseDefense,
      baseToughness = state.auth.settings.baseToughness,
      labelFeatureGroups = state.auth.settings.labelFeatureGroups;
    return {
      unit,
      features,
      cost,
      labelFeatureGroups,
      baseDefense,
      baseToughness
    };
  }
)(SafUnitCardCondensed);
