export function noop() {}
export async function asyncNoop() {}

// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#why-would-that-be-allowed
export function flushPromises() {
  return new Promise(process.nextTick);
}
