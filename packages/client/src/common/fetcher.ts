import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false
});

export default function (input: RequestInfo, init?: RequestInit) {
  NProgress.start();

  return fetch(`//localhost:3001${input}`, init)
    .finally(() => NProgress.done());
}
