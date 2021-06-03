import React from "react";
import { Link } from 'react-router-dom';
import './home.css';
import man_with_tablet from "../../assets/images/man_with_tablet.png";
import listPreview from "../../assets/images/list-removebg-preview.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Home = () => {
    return (
        <div>
            <Header/>
            <div class="main_content">
                <div class="welcome_container">
                    <div class="man_with_tablet">
                        <img src={man_with_tablet} alt="Man with a tablet" />
                    </div>
                    <div class="description_block">
                        <div class="title_block">
                            <i class="fa fa-globe"></i>
                            <span>Borda</span>
                        </div>
                        <span>Welcome dear Friend</span>
                        <div class="btn_start">
                            <Link to="/auth">Start</Link>
                        </div>
                    </div>
                    <div class="progress_toolbar">
                        <img src={listPreview} alt="List of tasks" />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home
