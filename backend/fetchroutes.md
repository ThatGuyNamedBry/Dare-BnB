
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

## Create Spot *Make sure to login first!*

const data = {
  address: "123 Test Address",
  city: "Test City",
  state: "Test State",
  country: "United States of America",
  lat: 30.25,
  lng: -120.25,
  name: "test spot",
  description: "Place where web developers are created",
  price: 123
};

fetch('/api/spots', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<inset token here>`
  },
  body: JSON.stringify(data)
}).then(res => res.json()).then(data => console.log(data));
