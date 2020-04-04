export default function (input: RequestInfo, init?: RequestInit) {
  return fetch(`//localhost:3001${input}`, init);
}
