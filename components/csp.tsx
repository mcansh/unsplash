import crypto from 'crypto';

import React from 'react';
import { NextScript, DocumentProps } from 'next/document';

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

const CSP = (props: DocumentProps) => {
  const hash = cspHashOf(NextScript.getInlineScriptSource(props));
  const cspSettings = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'connect-src': ["'self'"],
    'style-src': ["'unsafe-inline'"],
    'img-src': ["'self'", 'images.unsplash.com', 'data:'],
  };

  const csp = `${Object.entries(cspSettings)
    .map(([key, val]) => `${key} ${val.join(' ')}`)
    .join(';')} ${hash}`;

  return <meta httpEquiv="Content-Security-Policy" content={csp} />;
};

export default CSP;
