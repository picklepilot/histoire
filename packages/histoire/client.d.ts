/**
 * @deprecated
 */
export function hstEvent(name: string, argument): void

/**
 * Logs an event to the 'Events' sidepane.
 * @param name Event name
 * @param argument Additional log data displayed when inspecting the event.
 */
export function logEvent(name: string, argument): void

/**
 * Registers a custom component to be appended to the tabbed nav on the right.
 * @param id
 * @param slug
 * @param title
 * @param component
 */
export function registerPanel(id: string | number, slug: string, title: string, component: any): void

/**
 * Returns `true` when in the NodeJS server while collecting stories.
 */
export function isCollecting(): boolean

export function toggleDark(value?: boolean): boolean
export function isDark(): boolean
