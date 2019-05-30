export const enforceArrayUniqueness = arr => arr.filter((c, i, a) => a.map(e => e.id).indexOf(c.id) === i);
