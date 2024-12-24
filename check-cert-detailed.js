const tls = require('tls');

const options = {
  host: 'sarajevoexpats.com',
  port: 443,
  rejectUnauthorized: false // Temporarily disable verification to get certificate info
};

const socket = tls.connect(options, () => {
  const cert = socket.getPeerCertificate(true);
  console.log('\nCertificate Details:');
  console.log('Subject:', cert.subject);
  console.log('Issuer:', cert.issuer);
  console.log('Valid from:', cert.valid_from);
  console.log('Valid to:', cert.valid_to);
  console.log('Fingerprint:', cert.fingerprint);
  socket.end();
});

socket.on('error', (error) => {
  console.error('Error:', error);
});
