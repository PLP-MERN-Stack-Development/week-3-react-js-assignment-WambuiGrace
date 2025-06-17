import React from "react"

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About InnovateHub</h1>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                InnovateHub is a platform designed to foster creativity, collaboration, and innovation among developers and tech enthusiasts. Our mission is to provide resources, tools, and a supportive community to help you turn your ideas into reality.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
                Have questions or suggestions? Reach out at <a href="mailto:info@innovatehub.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">info@innovatehub.com</a>
            </p>
        </div>
    );
}