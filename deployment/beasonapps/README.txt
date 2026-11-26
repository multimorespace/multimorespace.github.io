beasonapps.com is served by the beasonapps-publisher Cloudflare Worker.
GET /ads.txt returns the AdSense publisher declaration; all other public GET/HEAD requests redirect to phantom.beasonapps.com, retaining the path and query. Browsers retain fragment anchors across the redirect.
The app origin remains on GitHub Pages, main branch, root directory. Existing app-ads.txt records are preserved.
Deploy root Worker: wrangler deploy --config deployment/beasonapps/wrangler.jsonc
Google AdSense publisher: ca-pub-9541172831129326
Actual advertising requires AdSense site approval and ad/consent settings in the publisher account.
