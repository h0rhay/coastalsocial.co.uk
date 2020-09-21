import React from 'react';
import { Link as GatsbyLink } from "gatsby"

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
export default function Link({ children, to, activeClassName, partiallyActive, ...other }) {
    // Tailor the following test to your environment.
    // This example assumes that any internal link (intended for Gatsby)
    // will start with exactly one slash, and that anything else is external.
    // const mailTo = /\/(mailto:)/.test(to)
    const mailTo = to.includes('/mailto:')
    const internal = /^\/(?!\/)/.test(to)

    // Strip url gubbins if link is a mailto:
    if (mailTo) {
        to = to.substring(to.lastIndexOf("/") + 1)
        return (
            <a href={to} {...other}>
                {children}
            </a>
        )
    }
    // Use Gatsby Link for internal links, and <a> for others
    if (internal) {
        return (
            <GatsbyLink
                to={to}
                activeClassName={activeClassName}
                partiallyActive={partiallyActive}
                {...other}
            >
                {children}
            </GatsbyLink>
        )
    }
    return (
        <a href={to} {...other}>
            {children}
        </a>
    )
}
