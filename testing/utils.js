export function noop() {}
export async function asyncNoop() {}

export function flushPromises() {
  return new Promise(process.nextTick);
}
