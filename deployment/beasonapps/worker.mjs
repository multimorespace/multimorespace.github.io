const ADS_TXT = 'google.com, pub-9541172831129326, DIRECT, f08c47fec0942fa0\n';
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/ads.txt') {
      if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405,headers:{Allow:'GET, HEAD'}});
      return new Response(request.method === 'HEAD' ? null : ADS_TXT, {
        headers: {'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=300','X-Content-Type-Options':'nosniff'}
      });
    }
    // App content has a single canonical home on the app subdomain.
    // Browsers preserve an incoming fragment when Location has no fragment.
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405,headers:{Allow:'GET, HEAD'}});
    url.hostname = 'phantom.beasonapps.com';
    url.protocol = 'https:';
    return new Response(null, {status:301, headers:{Location:url.toString(), 'Cache-Control':'public, max-age=300'}});
  }
};
