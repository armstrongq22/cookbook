import React from 'react';
import { useHistory } from "react-router-dom";

import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import CreatePost from '../components/CreatePost';
import Footer from '../components/Footer';


function NewPost() {
    const history = useHistory();
    const goHome = () => history.push('/Home');

    return (
        <div>
            <PrimarySearchAppBar />
            <h1>Create Post</h1>
            <CreatePost refresh={goHome} />
            <Footer />
        </div>
    );
};

export default NewPost;