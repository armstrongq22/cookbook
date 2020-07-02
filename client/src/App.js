import React from 'react';
import axios from 'axios';


function App() {

  const [state, setState] = React.useState({
    title: '',
    body: ''
  });

  function handleChange(event) {
    const target = event.target;
    const {name, value} = target;

    setState((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };

  function submit(event) {
    event.preventDefault();

    const payload = {
      title: state.title,
      body: state.body
    };

    axios({
      url: '/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Data has been sent to server');
      resetInput();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function resetInput() {
    setState({
      title: "",
      body: ''
    });
  };

  return (
    <div>
      <h2>Welcome</h2>
      <form onSubmit={submit}>
        <div className='form-input'>
          <input 
            type='text'
            name='title'
            placeholder='title'
            value={state.title}
            onChange={handleChange}
          />
        </div>
        <div className='form-input'>
          <textarea 
            name='body'
            placeholder='body'
            cols='30'
            rows='10'
            value={state.body}
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App;