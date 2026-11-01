// Drafted text that goes in an attribute rather than on the page, such as a meta description.
// Dev uses it; production leaves it out, the same as an unwritten description.
// Alex replaces `draft('…')` with the plain string when it's his. `grep -rn "draft('" src`
// lists what's left.
export const draft = (text: string): string | undefined => (import.meta.env.DEV ? text : undefined);
