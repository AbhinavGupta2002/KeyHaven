import React from "react";

export const Testimonial = () => {
    return (
        <div className="bg-gray-100 pb-20">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <section className="rounded-xl bg-gray-200 p-8 border border-default1 shadow-xl">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:items-center">
                    <img
                        alt="Man"
                        src="https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                        className="aspect-square w-full rounded-lg object-cover"
                    />

                    <blockquote className="sm:col-span-2 text-center sm:text-start">
                        <p className="text-xl font-medium sm:text-2xl">
                            KeyHaven has changed the game for password management. The level of security and ease of use is unparalleled. 
                            I never have to worry about losing track of my passwords or having them compromised. 
                            It's a must-have for anyone who values their online security.
                        </p>

                        <cite className="mt-8 inline-flex items-center not-italic">
                        <span className="hidden h-px w-6 bg-gray-400 sm:inline-block"></span>
                        <p className="text-sm uppercase text-gray-500 sm:ml-3">
                            <strong>Justin Harrison</strong>, Beatle Inc.
                        </p>
                        </cite>
                    </blockquote>
                    </div>
                </section>
            </div>
        </div>
    )
}