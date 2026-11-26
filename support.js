const form = document.getElementById('support-form');
if (form) form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = 'Phantom support: ' + data.get('topic');
  const body = 'Topic: ' + data.get('topic') + '\nDevice / Android: ' + (data.get('device') || 'Not provided') + '\nApp version: ' + (data.get('appVersion') || 'Not provided') + '\n\n' + data.get('message');
  const url = 'mailto:beason.shu@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  const status = document.getElementById('form-status');
  status.textContent = 'Review and send the draft in your email app. If it does not open, email beason.shu@gmail.com directly.';
  const link = document.createElement('a');
  link.href = url; link.textContent = 'Open the email draft again';
  status.append(document.createTextNode(' '), link);
  window.location.href = url;
});
