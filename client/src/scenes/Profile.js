import React from 'react';
import axios from 'axios';
import {CirclePicker} from 'react-color';

// Custom Components
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import Footer from '../components/Footer';

function Profile() {

    const [color, setColor] = React.useState();

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
