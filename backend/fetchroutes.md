
## Sign Up User
fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<inset token here>`
  },
  body: JSON.stringify({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  })
}).then(res => res.json()).then(data => console.log(data));

## Sign In User
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: '', password: '' })
}).then(res => res.json()).then(data => console.log(data));
