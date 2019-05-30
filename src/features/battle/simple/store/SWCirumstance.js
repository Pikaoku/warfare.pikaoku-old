export class SWCirumstance {
    constructor(label, modifier, active = false) {
        this.label = label;
        this.active = active;
        this.modifier = modifier;
    }

    setActive = () => this.active = true;
}