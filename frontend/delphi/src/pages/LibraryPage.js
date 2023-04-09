import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieLibrary from '../components/MovieLibrary';
import ButtonNav from '../components/common/ButtonNav';
import ShowLibrary from '../components/ShowLibrary';


const LibraryPage = () => {
    const [selectedTab, setSelectedTab] = useState("Movies");

    const handlerLibraryNav = (selectedBtn) => {
        console.log(selectedBtn);
        setSelectedTab(selectedBtn);
    }

    return (
        <div>
            <Navbar />
            
            <div className='w-100 d-flex justify-content-center mt-4'>
                <ButtonNav buttons={["Movies", "Shows"]} onClick={handlerLibraryNav} />
            </div>
                
            {selectedTab === 'Movies' ? <MovieLibrary /> : <ShowLibrary />}
            <Footer />
        </div>
    );
};

export default LibraryPage;
