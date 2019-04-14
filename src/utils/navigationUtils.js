import {Link} from "react-router-dom";

export const
    NAV_LOGO = {
        as: Link,
        to: '/',
        key: 'home',
        content: 'warfare.pikaoku'
    },
    TOP_NAV_LEFT_ITEMS = [
        {as: Link, content: "Unit Maker", to: "/unit-maker", key: 'unit-maker'},
        {as: Link, content: "Browse", to: "/browse", key: 'browse'},
        {as: Link, content: "Settings", to: "/settings", key: 'settings'}
    ];