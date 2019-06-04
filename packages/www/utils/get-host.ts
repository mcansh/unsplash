function getProtocol(req) {
  if (req) {
    return req.connection.encrypted ? 'https://' : 'http://';
  }

  return `${window.location.protocol}//`;
}

function getHost(req) {
  const protocol = getProtocol(req);

  const host = req ? req.headers.host : window.location.host;

  return `${protocol}${host}`;
}

export default getHost;
