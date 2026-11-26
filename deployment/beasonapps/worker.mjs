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
    // The root domain serves the existing public app website; its GitHub Pages origin stays intact.
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405,headers:{Allow:'GET, HEAD'}});
    url.hostname = 'phantom.beasonapps.com';
    url.protocol = 'https:';
    const response = await fetch(new Request(url, request), {redirect:'follow'});
    return new Response(response.body, response);
  }
};
