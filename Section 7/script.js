const myForm = document.querySelector('#signup');
const output = document.querySelector('.output');
output.style.display = 'none';
const url =
  'https://script.google.com/macros/s/AKfycbyx6aEdMl1Gsdm9kXzvLLZUbYG45KbOXt0WLCvmxuZkb1t_fMBlgjfmxgtjRzbyXdSzxQ/exec';

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const els = myForm.elements;
  console.log('Sending Message');
  const holder = {};
  const err = [];
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    let val = true;
    if (el.getAttribute('type') == 'submit') {
      val = false;
    }
    if (el.name == 'user') {
      if (el.value.length < 5) {
        val = false;
        err.push('Name needs to be 5 or more characters');
      }
    }
    if (el.name == 'email') {
      if (!validateEmail(el.value)) {
        val = false;
        err.push('Invalid email');
      }
    }
    if (val) {
      holder[el.name] = el.value;
    }
  }
  if (err.length > 0) {
    output.style.display = 'block';
    output.innerHTML = 'Sending...';
    err.forEach((error) => {
      output.innerHTML += `${error}<br>`;
    });
  } else {
    // submit form
    console.log(holder);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(holder),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    clearForm();
  }
});

function clearForm() {
  const els = myForm.elements;
  output.style.display = 'none';
  for (let i = 0; i < els.length; i++) {
    const element = els[i];
    if (element.type != 'submit') element.value = '';
  }
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
