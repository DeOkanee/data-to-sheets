const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = form.file.files[0];
  const fr = new FileReader();
  fr.readAsArrayBuffer(file);
  fr.onload = (f) => {
    const url =
      "https://script.google.com/macros/s/AKfycbw386X45Y6zeTb7bK-grs1vFvOjthDWQfxOpvv4fbGnWonDmXPNZlLXUczh5LTZxFP4lw/exec"; // <--- Please set the URL of Web Apps.

    const qs = new URLSearchParams({
      filename: form.filename.value || file.name,
      mimeType: file.type,
    });
    fetch(`${url}?${qs}`, {
      method: "POST",
      body: JSON.stringify([...new Int8Array(f.target.result)]),
    })
      .then((res) => res.json())
      .then((e) => console.log(e)) // response appscript
      .catch((err) => console.log(err));
  };
});
