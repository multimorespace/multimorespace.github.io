const SUPPORT_EMAIL = 'beason.shu@gmail.com';
const form = document.getElementById('support-form');
function prepareSupportReport(form) {
  const data = new FormData(form);
  return {
    subject: 'Phantom support: ' + data.get('topic'),
    body: [
      'Topic: ' + data.get('topic'),
      'Device / Android: ' + (data.get('device') || 'Not provided'),
      'App version: ' + (data.get('appVersion') || 'Not provided'),
      '',
      data.get('message'),
    ].join('\n'),
  };
}
function showReportStatus(message) {
  const status = document.getElementById('form-status');
  status.hidden = false;
  status.textContent = message;
  return status;
}
async function copyReportText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const fallback = document.createElement('textarea');
    fallback.value = text;
    fallback.setAttribute('readonly', '');
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    const copied = document.execCommand('copy');
    fallback.remove();
    return copied;
  }
}
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const report = prepareSupportReport(form);
    const url = 'mailto:' + SUPPORT_EMAIL + '?subject=' + encodeURIComponent(report.subject) + '&body=' + encodeURIComponent(report.body);
    const status = showReportStatus('Your draft is ready. No email has been sent yet. Review it in your email app, then press Send. If the app does not open, use Copy message and email ' + SUPPORT_EMAIL + '.');
    const link = document.createElement('a');
    link.href = url;
    link.textContent = 'Open the draft again';
    status.append(document.createTextNode(' '), link);
    window.location.href = url;
  });
  document.getElementById('copy-report').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const report = prepareSupportReport(form);
    const text = ['To: ' + SUPPORT_EMAIL, 'Subject: ' + report.subject, '', report.body].join('\n');
    const copied = await copyReportText(text);
    showReportStatus(copied ? 'Message copied. Paste it into your email service and send it to ' + SUPPORT_EMAIL + '.' : 'Could not copy automatically. Please select your message and email it to ' + SUPPORT_EMAIL + '.');
  });
}
