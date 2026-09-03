import type CspDev from 'csp-dev';

export function jfinWorker(): CspDev.DirectiveDescriptor {
  return {
    'connect-src': [
      '*.jfin.workers.dev',
      '*.jfinchain.com',
    ],
  };
}
