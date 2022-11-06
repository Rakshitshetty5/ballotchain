import React from 'react'

const VoteCandidateCard = () => {
    return (
        <div className="shadow-lg mt-16 rounded-2xl w-72 sm:w-80 bg-white dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center p-4 -mt-16">
                <a href="#" className="block relative">
                    <img alt="profil" src="https://pbs.twimg.com/profile_images/1565985672501927936/d-r-h241_400x400.jpg" className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white dark:border-gray-800" />
                </a>
                <p className="text-gray-800 dark:text-white text-xl font-medium mt-2">
                    Narendra Modi
                </p>
                <p className="text-gray-400 text-xs mb-4">
                    Bharatiya Janata Party (BJP)
                </p>
                <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Vote
                </button>
            </div>
        </div>
    )
}

export default VoteCandidateCard