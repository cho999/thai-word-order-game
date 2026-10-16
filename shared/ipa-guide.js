document.getElementById('ipa-search')?.addEventListener('input', event => {
  const query = event.target.value.normalize('NFC').toLowerCase().trim();
  document.querySelectorAll('#ipa-dictionary tbody tr').forEach(row => {
    row.hidden = !row.textContent.normalize('NFC').toLowerCase().includes(query);
  });
});
