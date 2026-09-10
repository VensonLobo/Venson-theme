import fs from 'fs';
import path from 'path';

const GTM_HEAD = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TVQRV69J');</script>
<!-- End Google Tag Manager -->`;

const GTM_BODY = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TVQRV69J"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // If already processed with comments right after <head>, skip
  if (content.includes('<!-- Google Tag Manager -->') && content.includes('<!-- Google Tag Manager (noscript) -->')) {
    return;
  }

  // Remove existing GTM script tag if already there to avoid duplicates
  content = content.replace(/<script[^>]*gtm\.start[\s\S]*?googletagmanager\.com\/gtm\.js\?id=GTM-TVQRV69J[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<noscript><iframe[^>]*googletagmanager\.com\/ns\.html\?id=GTM-TVQRV69J[^>]*><\/iframe><\/noscript>/gi, '');

  // Place GTM_HEAD right after <head>
  content = content.replace(/<head>/i, `<head>\n${GTM_HEAD}`);

  // Place GTM_BODY right after opening <body ...>
  content = content.replace(/(<body[^>]*>)/i, `$1\n${GTM_BODY}`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Injected GTM into: ${filePath}`);
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '_next') {
        walkDir(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      processHtmlFile(fullPath);
    }
  }
}

walkDir('out');
if (fs.existsSync('index.html')) {
  processHtmlFile('index.html');
}
console.log('GTM injection complete.');
