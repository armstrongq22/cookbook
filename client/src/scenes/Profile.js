import React, {useEffect} from 'react';
import axios from 'axios';
import {CirclePicker} from 'react-color';
import {useHistory} from 'react-router-dom';

// Custom Components
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import Footer from '../components/Footer';

function Profile() {
    const [color, setColor] = React.useState();
    const [display, setDisplay] = React.useState(false);
    
    const history = useHistory();

    useEffect(() => {
        axios.get('/auth/authenticate')
          .then((res) => {
              setDisplay(true);
              console.log('User authenticated');
          })
          .catch((error) => {
              if(error.response.status === 500) {
                console.log(error.response.data.message);
                history.push('/');
              }
              else console.log(error);
          });
      }, [history]);

    function handleChangeComplete(color) {
        setColor(color.hex);
    };

    function handleSumbit(event) {
        event.preventDefault();

        axios.post('/api/avatarColor', {newColor: color})
            .then(() => {
                console.log('Data has been sent to server');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if(!display) return null;
    return (
        <div>
            <PrimarySearchAppBar />
            <h1>Profile page</h1>
            <form onSubmit={handleSumbit}>
                <CirclePicker 
                    color={color}
                    onChangeComplete={handleChangeComplete}
                />
                <button>Submit</button>
            </form>
            <Footer />
        </div>
    )
};

export default Profile;
