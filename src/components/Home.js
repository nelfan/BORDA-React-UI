import { Link } from 'react-router-dom';
import '../styles/Home/home.css';
import man_with_tablet from "../resources/images/man_with_tablet.png";
import listPreview from "../resources/images/list-removebg-preview.png";

const Home = () => {
    return (
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
    )
}

export default Home
